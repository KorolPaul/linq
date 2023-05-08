const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const thresholdSteps = [...Array(10).keys()].map(i => i / 10);
const isMobile = window.innerWidth <= 768
const isDesktop = window.innerWidth >= 1070

// sliders
const ticketsSlider = document.querySelectorAll('.js-tickets-slider');
ticketsSlider.forEach(el => {
    tns({
        container: el,
        autoWidth: true,
        items: 1.1,
        gutter: 16,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controls: false,
        loop: false,
        responsive: {
            1070: {
                disable: true
            }
        }
    });
})

const agendaSlider = document.querySelectorAll('.agenda_grid');
agendaSlider.forEach(el => {
    const totalSlidesElement = el.parentElement.parentElement.querySelector('.agenda_slider-counter-total');
    const activeSlideElemwent = el.parentElement.parentElement.querySelector('.agenda_slider-counter-active');

    const slider = tns({
        container: el,
        items: 1,
        gutter: 8,
        autoWidth: false,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controls: true,
        controlsPosition: 'bottom',
        loop: false,
        responsive: {
            1024: {
                disable: true
            }
        },
        onInit: (info) => {
            if (totalSlidesElement) {
                totalSlidesElement.innerText = info.slideCount;
            }
        }
    });

    slider.events.on('transitionEnd', (info) => {
        if (activeSlideElemwent) {
            activeSlideElemwent.innerText = info.displayIndex;
        }
    });
})

const commentsSlider = document.querySelectorAll('.comments_slider');
commentsSlider.forEach(el => {
    const totalSlidesElement = el.parentElement.parentElement.querySelector('.comments_slider-counter-total');
    const activeSlideElemwent = el.parentElement.parentElement.querySelector('.comments_slider-counter-active');

    const slider = tns({
        container: el,
        items: 1,
        gutter: 24,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controlsPosition: 'bottom',
        controls: true,
        loop: true,
        responsive: {
            1070: {
                gutter: 74,
            }
        },
        onInit: (info) => {
            if (totalSlidesElement) {
                totalSlidesElement.innerText = info.slideCount;
            }
        }
    });

    slider.events.on('transitionEnd', (info) => {
        if (activeSlideElemwent) {
            activeSlideElemwent.innerText = info.displayIndex;
        }
    });
});

const speakersGridSlider = document.querySelectorAll('.js-speakers-slider');
speakersGridSlider.forEach(el => {
    const totalSlidesElement = el.parentElement.parentElement.querySelector('.speakers_slider-counter-total');
    const activeSlideElemwent = el.parentElement.parentElement.querySelector('.speakers_slider-counter-active');

    const slider = tns({
        container: el,
        items: 1.1,
        gutter: 16,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controlsPosition: 'bottom',
        controls: true,
        loop: false,
        responsive: {
            1070: {
                disable: true
            },
        },
        onInit: (info) => {
            if (totalSlidesElement) {
                totalSlidesElement.innerText = info.slideCount;
            }
        }
    });

    slider.events.on('transitionEnd', (info) => {
        if (activeSlideElemwent) {
            activeSlideElemwent.innerText = info.displayIndex;
        }
    });
});

const aboutSlider = document.querySelectorAll('.about_slides');
aboutSlider.forEach(el => {

    var isAnimated = false;

    function handleCarouselScroll(isForward) {
        if (isAnimated) {
            return
        }

        isAnimated = true
        setTimeout(() => {
            isAnimated = false
        }, 200);

        const { slideCount, index } = slider.getInfo();
        if (isForward) {
            if (index >= slideCount / 2) {
                document.removeEventListener(wheelEvent, preventScroll, { passive: false });
                return;
            }

            slider.goTo('next');
        } else {
            if (index === 0) {
                document.removeEventListener(wheelEvent, preventScroll, { passive: false });
                return;
            }
            slider.goTo('prev');
        }
    }

    function preventScroll(e) {
        handleCarouselScroll(e.deltaY > 0)
    }

    const observerCallback = function (e) {
        const { intersectionRatio } = e[0];

        if (intersectionRatio > 0.9) {
            document.addEventListener(wheelEvent, preventScroll, { passive: false })
        } else {
            document.removeEventListener(wheelEvent, preventScroll, { passive: false })
        }
    };

    const observer = new IntersectionObserver(observerCallback, {
        rootMargin: '0px 0px 0px 0px',
        threshold: thresholdSteps,
        root: null
    });

    const slider = tns({
        container: el,
        items: 2.2,
        gutter: 8,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controls: false,
        loop: false,
        responsive: {
            1070: {
                autoWidth: true,
                gutter: 20,
                items: 3.1
            },
            1440: {
                autoWidth: true,
            }
        },
        onInit: () => {
            observer.observe(el.parentElement.parentElement.parentElement);
        }
    });
    
});


const speakersSlider = document.querySelectorAll('.speakers_slider');
speakersSlider.forEach(el => {
    const totalSlidesElement = el.parentElement.parentElement.querySelector('.speakers_slider-counter-total');
    const activeSlideElemwent = el.parentElement.parentElement.querySelector('.speakers_slider-counter-active');

    const slider = tns({
        container: el,
        items: 1.1,
        gutter: 16,
        mouseDrag: true,
        autoplay: false,
        nav: false,
        controlsPosition: 'bottom',
        controls: true,
        loop: false,
        responsive: {
            1070: {
                autoWidth: true,
                gutter: 20,
                items: 3.2
            },
            1440: {
                autoWidth: true,
            }
        },
        onInit: (info) => {
            if (totalSlidesElement) {
                totalSlidesElement.innerText = info.items - 1;
            }
        }
    });

    slider.events.on('transitionEnd', (info) => {
        if (activeSlideElemwent) {
            activeSlideElemwent.innerText = info.displayIndex;
        }
    });
});


const eventsGalleryElements = document.querySelectorAll('.events_gallery');
eventsGalleryElements.forEach(el => {
    const gallery = tns({
        container: el,
        mode: 'gallery',
        items: 1,
        animateIn: "jello",
        autoplay: false,
        nav: false,
        controls: false,
        loop: false,
        navContainer: '.events_slider',
    });

    const eventsSliderElement = el.parentElement.parentElement.parentElement.querySelector('.events_slider');
    if (eventsSliderElement) {
        const slider = tns({
            container: eventsSliderElement,
            autoWidth: true,
            items: 1.1,
            gutter: 24,
            mouseDrag: true,
            autoplay: false,
            nav: false,
            controls: false,
            loop: true,
            responsive: {
                1024: {
                    gutter: 100,
                }
            },
            onInit: () => {
                eventsSliderElement.querySelector('.tns-slide-active .events_slider-tab[data-tab="1"]').classList.add('active');
            }
        });

        const slides = eventsSliderElement.querySelectorAll('.events_slider-tab');
        slides.forEach((slide) => {
            slide.addEventListener('click', function (e) {
                const index = parseInt(e.target.dataset.tab);
                gallery.goTo(index - 1);
                slider.goTo(index - 1);

                slides.forEach(el => el.classList.remove('active'))
                const { displayIndex } = gallery.getInfo();
                eventsSliderElement.querySelector(`.tns-slide-active .events_slider-tab[data-tab="${displayIndex}"]`).classList.add('active');
            })
        });
    }
})

// menu
const menuToggleElement = document.querySelector('.menu-toggle');
if (menuToggleElement) {
    menuToggleElement.addEventListener('click', () => {
        if (!document.body.classList.contains('menu-opened') ) {
            document.body.classList.toggle('menu-opened');
        } else if (document.body.classList.contains('menu-opened')) {
            document.body.classList.remove('menu-opened');
        }
    });
}


function closeAllOpened() {
    document.querySelectorAll('.opened').forEach(el => el.classList.remove('opened'));
    document.body.classList.remove('menu-opened');
    document.querySelectorAll('.popup-opened').forEach(el => el.classList.remove('popup-opened'));
    document.querySelectorAll('.js-form-popup').forEach(el => el.classList.remove('opened'));
    document.querySelectorAll('.filters_content').forEach(el => el.classList.remove('opened'));
}

const fadeElement = document.querySelector('.fade');
if (fadeElement) {
    fadeElement.addEventListener('click', closeAllOpened);
}

const menuLinkElements = document.querySelectorAll('.menu_link');
menuLinkElements.forEach(el => el.addEventListener('click', () => {
    if (isMobile) {
        document.body.classList.toggle('menu-opened')
    }
}));

/* Popup */
const popupToggleElements = document.querySelectorAll('.js-popup-toggle');

function disableScroll(e) {
    const { target } = e
    let isInPopup = false;
    
    function findParentPopup(el) {
        if (!el.parentElement) {
            return
        }
        if (el.className.includes('popup_content')) {
            isInPopup = true
            return
        }

        findParentPopup(el.parentElement)
    }

    findParentPopup(target.parentElement)
    
    if (!isInPopup && !target.className.includes('contact-form')) {
        e.preventDefault();
    }
}

function openPopup(name) {
    const popup = document.querySelector(`.popup[data-popup="${name}"]`);
    if (popup) {
        popup.classList.add('opened');
        document.body.classList.add('popup-opened');
        window.addEventListener(wheelEvent, disableScroll, { passive: false });
    }
}
function closePopup(name) {
    document.querySelector('.popup.opened').classList.remove('opened');
    document.body.classList.remove('popup-opened');
    window.removeEventListener(wheelEvent, disableScroll, { passive: false });

}

popupToggleElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    openPopup(el.dataset.popup);
}));

const popupCloseElements = document.querySelectorAll('.popup_close');
popupCloseElements.forEach(el => el.addEventListener('click', (e) => {
    e.preventDefault();
    closePopup();
}));

/* desktop-only images */
const imagesWihoutSrc = document.querySelectorAll('img[data-src]');
if (!isMobile) {
    imagesWihoutSrc.forEach((img) => {
        img.src = img.dataset.src;
    });
}

/* Number input */
const inputNumberElements = document.querySelectorAll('.input-number');
inputNumberElements.forEach((el) => {
    const minusButton = el.querySelector('button:first-child');
    const plusButton = el.querySelector('button:last-child');
    const countElement = el.querySelector('span');

    minusButton.addEventListener('click', (e) => {
        e.preventDefault();
        const count = parseInt(countElement.innerText)
        countElement.innerText = count - 1;
    })
    plusButton.addEventListener('click', (e) => {
        e.preventDefault();
        const count = parseInt(countElement.innerText)
        countElement.innerText = count + 1;
    })
});

/* Cart */
/* checkout tickets collapse */
const checkoutTicketTitleElements = document.querySelectorAll('.checkout_position-title');
checkoutTicketTitleElements.forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.classList.toggle('active');
    })
});

/* filters toggle */
const filtersToggleElement = document.querySelector('.filters_toggle');
if (filtersToggleElement) {
    function toggleFiltersPopup(e) {
        e.preventDefault();
        document.querySelector('.filters_content').classList.toggle('opened');

        if (fadeElement) {
            fadeElement.classList.toggle('opened');
        }
    }

    filtersToggleElement.addEventListener('click', toggleFiltersPopup);
    document.querySelector('.filters_close').addEventListener('click', toggleFiltersPopup);
}

/* filters collapse */
const filtersSectionTitleElements = document.querySelectorAll('.filters_section-title');
filtersSectionTitleElements.forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.classList.toggle('inactive');
    })
});

/* Tabs */
function initTabs() {
    const tabsContainers = document.querySelectorAll('.tabs');
    
    tabsContainers.forEach(tabContainer => {
        const tabsButtons = tabContainer.querySelectorAll('.tabs_button');
        const tabsBlocks = tabContainer.querySelectorAll('.tabs_content');
    
        if (tabsButtons.length) {
            function switchTab(e) {
                e.preventDefault();
    
                const index = e.target.dataset.tab;
                tabsButtons.forEach(el => el.classList.remove('active'));
                tabsBlocks.forEach(el => el.classList.remove('active'));
    
                tabsButtons[index - 1].classList.add('active');
                tabsBlocks[index - 1].classList.add('active');
            }
    
            tabsButtons.forEach(el => el.addEventListener('click', switchTab));
        }
    });
}

initTabs()

/* showcase video */
const showcaseVideoSource = document.querySelectorAll('.showcase_video source')
let currentVideoUrl
function switchVideo(el) {
    function reloadVideo(url) {
        el.parentElement.pause()
        el.setAttribute('src', url);
        el.parentElement.load();
        el.parentElement.play();
        currentVideoUrl = url;
    }

    if (window.innerWidth > 1044) {
        if (currentVideoUrl !== el.dataset.url) {
            reloadVideo(el.dataset.url);
        }
        return
    }
    
    if (currentVideoUrl !== el.dataset.urlMobile) {
        reloadVideo(el.dataset.urlMobile);
    }
}
showcaseVideoSource.forEach(el => {
    switchVideo(el);
    currentVideoUrl = el.getAttribute('src');
    window.addEventListener('resize', () => switchVideo(el))
})



/* subscribe form */
const subscribeFormElement = document.querySelector('.footer_form');
if (subscribeFormElement) {
    subscribeFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.classList.add('hidden');
        subscribeFormElement.parentElement.querySelector('.footer_form-success').classList.add('shown');
    });
}

/* cookies */
if (Cookies) {
    const hasCookies = Cookies.get('CookieNotificationCookie');
    
    const cookiesBanner = document.querySelector('.cookies');
    const cookiesAcceptButton = document.querySelector('.cookies_button');
    
    if (cookiesAcceptButton) {
        cookiesAcceptButton.addEventListener('click', function (e) {
            e.preventDefault();
    
            cookiesBanner.style.display = 'none';
            Cookies.set('CookieNotificationCookie', 'true', { expires: 365 });
        });
    }
    
    if (cookiesBanner && !hasCookies) {
        cookiesBanner.style.display = 'block';
    }
}


/* Accordion */
const accordionElements = document.querySelectorAll('.accordion');

accordionElements.forEach(accordion => {
    const accordionButtons = accordion.querySelectorAll('.accordion_button:not(.accordion_button__inner)');
    const accordionContent = accordion.querySelectorAll('.accordion_content:not(.accordion_content__inner)');
    const accordionInnerButtons = accordion.querySelectorAll('.accordion_button__inner');


    if (accordionButtons.length) {
        function toggle(e) {
            e.preventDefault();

            if (isDesktop) {
                accordionButtons.forEach(el => el.classList.remove('active'))
                accordionContent.forEach(el => el.classList.remove('active'))
                e.currentTarget.classList.add('active');
                e.currentTarget.nextElementSibling.classList.add('active');
            } else {
                e.currentTarget.classList.toggle('active');
                e.currentTarget.nextElementSibling.classList.toggle('active');
            }
        }

        function toggleInner(e) {
            e.preventDefault();

            e.currentTarget.classList.toggle('active');
            e.currentTarget.nextElementSibling.classList.toggle('active');
        }

        accordionButtons.forEach(el => el.addEventListener('click', toggle));
        accordionInnerButtons.forEach(el => el.addEventListener('click', toggleInner));
    }
});

/* popup form */
const popupFormTriggers = document.querySelectorAll('.js-popup-form-trigger');

function toggleFormPopup(e) {
    e.preventDefault();

    document.querySelector('.js-form-popup').classList.toggle('opened');
    if (fadeElement) {
        fadeElement.classList.toggle('opened');
    }
}

popupFormTriggers.forEach((trigger) => {
    trigger.addEventListener('click', toggleFormPopup);
    document.querySelector('.form-popup_close').addEventListener('click', toggleFormPopup);
});


/* hide BUY button when tickets block is visible */
const fixedButtonEl = document.querySelector('.fixed-button')
const ticketsEl = document.querySelector('.solutions_cards')

if (fixedButtonEl && ticketsEl) {

    const observerCallback = function (e) {
        const { intersectionRatio } = e[0];
    
        if (intersectionRatio > 0.2) {
            fixedButtonEl.classList.add('hidden');
        } else {
            fixedButtonEl.classList.remove('hidden');
        }
    };
    
    const observer = new IntersectionObserver(observerCallback, {
        rootMargin: '0px 0px 0px 0px',
        threshold: thresholdSteps,
        root: null
    });
    observer.observe(ticketsEl)
}

/* unavailable ticketss form */
const unavailableFormLink = document.querySelector('.js-tickets-unavailable-link');
if (unavailableFormLink) {
    unavailableFormLink.addEventListener('click', function(e) {
        e.preventDefault();
        document.body.classList.remove('menu-opened');
        document.body.classList.add('special-menu-opened');
    });
}

const unavailableFormSubmit = document.querySelector('.js-unavailable-form-submit');
if (unavailableFormSubmit) {
    unavailableFormSubmit.addEventListener('click', function(e) {
        e.preventDefault();

        // form sending logic

        document.body.classList.remove('special-menu-opened');
    });
}
