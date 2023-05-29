function checkCode() {
    let d = $('#promo').val()
    if (d == "") {
        $('#promo').parent().addClass('error')
        $('#promoerror').html('Empty code')
    } else {
        $.post("/api/coupon/check", { code: d, api: 'd' })
            .done(function (data) {
                let res = JSON.parse(data);
                let dt = $("#data")[0]
                if (res['status'] == 1) {
                    dt.dataset['codeval'] = res['value']
                    dt.dataset['codetype'] = res['type']
                    dt.dataset['code'] = d
                    $('#promo').parent().removeClass('error')
                    $('#promoerror').text()
                    $('#promosuccess').addClass('active')
                } else {
                    dt.dataset['codeval'] = 0
                    dt.dataset['codetype'] = 'sum'
                    dt.dataset['code'] = ''
                    $('#promo').parent().addClass('error')
                    $('#promoerror').html(res['mes'])
                    $('#promosuccess').removeClass('active')
                }

                //let num = parseInt(dt.dataset['num'])
                recountPrice()

            });
    }
}

// function showCodeField(){
//     $("#promolink").hide()
//     $("#promoField").show()
// }

function recountPrice() {
    setTimeout(function () {
        let c = parseInt($('#ticketnum').text());
        if (c < 1) {
            c = 1;
            $('#ticketnum').text(c)
        }
        let data = $("#data")[0]
        data.dataset['num'] = c
        let discount = 0;
        let ticketID = data.dataset['tid']
        let price = parseFloat(data.dataset['price'])
        let vat = parseFloat(data.dataset['vat'])
        let codeval = parseFloat(data.dataset['codeval'])
        let codetype = data.dataset['codetype']
        let subtotal = price * c;
        let nVat = subtotal * vat;
        let total = subtotal + nVat;
        if (codetype == 'sum') {
            total = (price - codeval) * c * (1 + vat);
            discount = codeval * c;
            nVat = (price - codeval) * c * vat
        } else {
            total = total * ((100 - codeval) / 100)
            discount = (subtotal - subtotal * (100 - codeval) / 100)
            nVat = (subtotal - discount) * vat
        }
        if (codeval > 0) {
            $("#promosum").text(discount.toFixed(2))
            $("#promocode").show()
        } else {
            $("#promocode").hide()
        }
        $("#subtotal").text(subtotal.toFixed(2))
        $("#vat").text(nVat.toFixed(2))
        $(".totalsum").text(total.toFixed(2))
    }, 50);
}

function sendTicketForm1(id) {
    let ds = $('#' + id)[0].dataset
    let form = $('#' + id)[0].parentElement;
    for (const [key, value] of Object.entries(ds)) {
        inp = document.createElement('input');
        inp.type = 'hidden';
        inp.name = key;
        inp.value = value;
        form.appendChild(inp);
    }
    form.submit();
}

function sendTicketForm2() {
    // TODO validation form
    let form = $("#checkoutform");
    let x = formChekRequired(form[0], 0)

    if (x == 0) {
        form[0].method = 'post';
        form[0].submit()
    }

}

function formatNum(n) {
    let n2 = n.toFixed(2);
    let nI = parseInt(n);
    if (nI - n2 == 0) {
        return nI
    } else {
        return n2
    }
}

function subscribe(formindex = "") {
    let mailID = '#footer_mail' + formindex;
    let subscrdivID = '#subscrdiv' + formindex;
    let ftmail_errID = '#ftmail_err' + formindex;
    let acceptID = '#accept' + formindex;
    let successID = '#formSuccess' + formindex;

    let mail = $(mailID).val()
    if (!validateEmail(mail)) {
        $(subscrdivID).addClass('error')
        $(ftmail_errID).text('Please write correct email')
    } else if ($(acceptID)[0].checked == false) {
        $(subscrdivID).addClass('error')
        $(ftmail_errID).text('Please accept the rules')
    } else {
        $(subscrdivID).removeClass('error')
        $(ftmail_errID).text('')
        $.post("/api/subscribe/addmail", { mail: mail, api: 'd' })
            .done(function (data) {

                let res = JSON.parse(data);
                if (typeof (res.id) !== "undefined") {
                    $("#substext").text('You have successfully subscribed')
                    $(successID).addClass('success')
                    $(successID).show()
                    if (formindex == "") {
                        $(successID).css('display', 'block')
                    }
                    $(subscrdivID).hide()
                    if (formindex == 2) {
                        $("#acceptdiv2").hide();
                    }
                }
                if (typeof (res.message) !== "undefined") {
                    $(subscrdivID).addClass('error')
                    $(ftmail_errID).text(res.message)
                }
            });
    }
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function checkForm(btn) {
    let form = btn.closest('form');
    let x = formChekRequired(form, 0)
    x = 2
    if (x == 0) {
        form.submit()
    }

}

function formChekRequired(form, x) {
    //проверка всех input которые required
    form.querySelectorAll('input').forEach(function (el) {
        if (el.getAttribute('required') !== null && el.value == '') {
            el.parentElement.classList.add('error')
            if (x == 0) {
                let position = el.getBoundingClientRect();
                window.scrollTo(position.left, position.top + window.scrollY - 200);
                x++;
            }
        } else {
            el.parentElement.classList.remove('error')
        }
    })

    //проверка чекбоксов, которые обязательно д.б. отмечены
    form.querySelectorAll('.accept_checkbox').forEach(function (ch) {
        if (!ch.checked) {
            ch.parentElement.classList.add('error')
            x++;
        } else {
            ch.parentElement.classList.remove('error')
        }
    })

    //проверка чекбоксов, где должен быть отмечен хотя бы один
    let multCh = form.querySelectorAll('.mult_checkbox')
    if (multCh.length > 0) {
        let mult = 0
        form.querySelectorAll('.mult_checkbox').forEach(function (ch) {
            if (ch.checked) {
                mult++;
                return false
            }
        })
        if (mult == 0) {
            form.querySelectorAll('.mult_checkbox').forEach(function (ch) {
                if (!ch.checked) {
                    ch.parentElement.classList.add('error')
                } else {
                    ch.parentElement.classList.remove('error')
                }
            })
            x++;
        }
    }
    //проверка обязательного textarea
    form.querySelectorAll('.reqtxtarea').forEach(function (ch) {
        if (ch.value == "") {
            ch.parentElement.classList.add('error')
            x++;
        } else {
            ch.parentElement.classList.remove('error')
        }
    })
    //проверка мыла
    let mail = form.querySelector("#contact_mail")
    if (!validateEmail(mail.value)) {
        mail.parentElement.classList.add('error')
        x++;
    }



    return x;
}

function setSessNum(dayID) {
    let btn = $('#daybtn' + dayID)
    let btnData = btn[0].dataset
    let num = btnData.sessnum
    $('#sessionscount').text(num);

}

function filterClear() {

    let chbs = $(".filtercheckbox")
    chbs.each(function () {
        this.checked = false
    })
    filterLocations();
    filterTracks();
    filterTypes();
    filterKeynote($("input[type='checkbox'][name='keynote']"));
    filterApply();
}

function filterApply() {
    let istrack = $("#istrack")
    if (istrack[0].value == 0) {
        agendaFilter();
    }
    if (istrack[0].value == 1) {
        trackFilter();
    }


}

function agendaFilter() {
    let locsCh = $("input[type='checkbox'][name='location[]']")
    let tracksCh = $("input[type='checkbox'][name='tracks[]']")
    let typesCh = $("input[type='checkbox'][name='type[]']")
    let knCh = $("input[type='checkbox'][name='keynote']")
    let dBtn = $('.tabs_button.active')[0].dataset['tab'];


    let locs = [];
    let tracks = [];
    let types = [];
    let kn = 0;
    if (knCh.length != 0 && knCh[0].checked) {
        kn = 1
    }
    locsCh.each(function () {
        if (this.checked === true) {
            locs.push(this.value)
        }
    })
    tracksCh.each(function () {
        if (this.checked === true) {
            tracks.push(this.value)
        }
    })
    typesCh.each(function () {
        if (this.checked === true) {
            types.push(this.value)
        }
    })

    let jlocs = JSON.stringify(locs)
    let jtracks = JSON.stringify(tracks)
    let jtypes = JSON.stringify(types)

    $.post("/api/agenda/updlist", { locs: jlocs, tracks: jtracks, types: jtypes, dayActive: dBtn, knote: kn, api: 'd' })
        .done(function (data) {
            let res = JSON.parse(data);
            for (const [key, value] of Object.entries(res['sessCount'])) {
                tabId = key
                val = value
                tabBtn = document.querySelector('#daybtn' + tabId)
                tabBtn.dataset['sessnum'] = val
            }
            setSessNum(dBtn)
            $('#agendalist').html(res['html'])
            initTabs()
        });
}

function trackFilter() {
    let locsCh = $("input[type='checkbox'][name='location[]']")
    let typesCh = $("input[type='checkbox'][name='type[]']")
    let track = $("#track")[0].value
    let dBtn = $('.tabs_button.active')[0].dataset['tab'];


    let locs = [];
    let types = [];
    let kn = 0;
    locsCh.each(function () {
        if (this.checked === true) {
            locs.push(this.value)
        }
    })
    typesCh.each(function () {
        if (this.checked === true) {
            types.push(this.value)
        }
    })

    let jlocs = JSON.stringify(locs)
    let jtypes = JSON.stringify(types)

    $.post("/api/agenda/updTracklist", { locs: jlocs, track: track, types: jtypes, dayActive: dBtn, api: 'd' })
        .done(function (data) {
            let res = JSON.parse(data);
            for (const [key, value] of Object.entries(res['sessCount'])) {
                tabId = key
                val = value
                tabBtn = document.querySelector('#daybtn' + tabId)
                tabBtn.dataset['sessnum'] = val
            }
            setSessNum(dBtn)
            $('#agendalist').html(res['html'])
            initTabs()
        });
}

//фильтр, оставить только то, где есть выбранные локации
function filterLocations() {
    let typesCh = $("input[type='checkbox'][name='type[]']")
    let tracksCh = $("input[type='checkbox'][name='tracks[]']")
    let locsCh = $("input[type='checkbox'][name='location[]']")
    let knCh = $("input[type='checkbox'][name='keynote']")
    let locs = [];
    locsCh.each(function () {
        if (this.checked === true) {
            locs.push(this.value)
        }
    })
    if (locs.length == 0) {
        setCheckboxEnabled(tracksCh)
        setCheckboxEnabled(typesCh)
        setCheckboxEnabled(knCh)
    } else {
        let jlocs = JSON.stringify(locs)
        $.post("/api/agenda/updFilterLoc", { locs: jlocs, api: 'd', filter: 'loc' })
            .done(function (data) {
                let res = JSON.parse(data);
                updCheckboxes(typesCh, res['type']);
                updCheckboxes(tracksCh, res['track']);
                updKN(knCh, res['kn'])

            });
    }
    filterApply();
}

function filterTracks() {
    let typesCh = $("input[type='checkbox'][name='type[]']")
    let tracksCh = $("input[type='checkbox'][name='tracks[]']")
    let locsCh = $("input[type='checkbox'][name='location[]']")
    let knCh = $("input[type='checkbox'][name='keynote']")
    let tracks = [];
    tracksCh.each(function () {
        if (this.checked === true) {
            tracks.push(this.value)
        }
    })
    if (tracks.length == 0) {
        setCheckboxEnabled(locsCh)
        setCheckboxEnabled(typesCh)
        setCheckboxEnabled(knCh)
    } else {
        let jtracks = JSON.stringify(tracks)
        $.post("/api/agenda/updFilterLoc", { tracks: jtracks, api: 'd', filter: 'track' })
            .done(function (data) {
                let res = JSON.parse(data);
                updCheckboxes(typesCh, res['type']);
                updCheckboxes(locsCh, res['locs']);
                updKN(knCh, res['kn'])

            });
    }
    filterApply();
}

function filterTypes() {
    let typesCh = $("input[type='checkbox'][name='type[]']")
    let tracksCh = $("input[type='checkbox'][name='tracks[]']")
    let locsCh = $("input[type='checkbox'][name='location[]']")
    let knCh = $("input[type='checkbox'][name='keynote']")
    let types = [];
    typesCh.each(function () {
        if (this.checked === true) {
            types.push(this.value)
        }
    })
    if (types.length == 0) {
        setCheckboxEnabled(locsCh)
        setCheckboxEnabled(tracksCh)
        setCheckboxEnabled(knCh)
    } else {
        let jtypes = JSON.stringify(types)
        $.post("/api/agenda/updFilterLoc", { types: jtypes, api: 'd', filter: 'type' })
            .done(function (data) {
                let res = JSON.parse(data);
                updCheckboxes(tracksCh, res['track']);
                updCheckboxes(locsCh, res['locs']);
                updKN(knCh, res['kn'])

            });
    }
    filterApply();
}

function filterKeynote(k) {
    let typesCh = $("input[type='checkbox'][name='type[]']")
    let tracksCh = $("input[type='checkbox'][name='tracks[]']")
    let locsCh = $("input[type='checkbox'][name='location[]']")
    let isKN = 0
    if (k.checked) {
        isKN = 1
    }
    $.post("/api/agenda/updFilterLoc", { isKn: isKN, api: 'd', filter: 'kn' })
        .done(function (data) {
            let res = JSON.parse(data);
            updCheckboxes(typesCh, res['type']);
            updCheckboxes(tracksCh, res['track']);
            updCheckboxes(locsCh, res['locs']);
        })
    filterApply();
}

function updCheckboxes(ch, array) {
    ch.each(function () {
        if (typeof this.dataset['dsbl'] === 'undefined') {
            if (!inArray(this.value, array)) {
                this.setAttribute('disabled', true)
                this.checked = false
            } else {
                this.removeAttribute('disabled')
            }
        }
    })
}

function updKN(knCh, kn) {
    if (kn) {
        knCh.each(function () {
            this.removeAttribute('disabled')
        })
    } else {
        knCh.each(function () {
            this.setAttribute('disabled', true)
        })
    }
}

function setCheckboxEnabled(ch) {
    ch.each(function () {
        if (typeof this.dataset['dsbl'] === 'undefined') {
            this.removeAttribute('disabled')
        }
    })
}


function inArray(search, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == search) {
            return true;
        }
    }
    return false;
}

function checkPartnerForm() {
    partnerform
}
