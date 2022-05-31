const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
const thresholdSteps = [...Array(10).keys()].map(i => i / 10);
const isMobile = screen.width <= 768

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

const commentsSlider = document.querySelectorAll('.comments_slider');
commentsSlider.forEach(el => {
    tns({
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
        }
    });
});

const speakersSlider = document.querySelectorAll('.speakers_slider');
speakersSlider.forEach(el => {
    tns({
        autoWidth: true,
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
                gutter: 20,
                items: 3,
            }
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
menuToggleElement.addEventListener('click', () => document.body.classList.toggle('menu-opened'));


const fadeElement = document.querySelector('.fade');
const fadeMobileElement = document.querySelector('.fade__mobile');

function closeAllOpened() {
    document.querySelectorAll('.opened').forEach(el => el.classList.remove('opened'));
    document.querySelectorAll('.popup-opened').forEach(el => el.classList.remove('popup-opened'));
    document.querySelectorAll('.mobile-menu-opened').forEach(el => el.classList.remove('mobile-menu-opened'));
}

if (fadeElement) {
    fadeElement.addEventListener('click', closeAllOpened);
}
if (fadeMobileElement) {
    fadeMobileElement.addEventListener('click', closeAllOpened);
}

const menuLinkElements = document.querySelectorAll('.menu_link');
menuLinkElements.forEach(el => el.addEventListener('click', () => document.body.classList.toggle('menu-opened')));

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
console.log(!isMobile);
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

/* filters collapse */
const filtersSectionTitleElements = document.querySelectorAll('.filters_section-title');
filtersSectionTitleElements.forEach((el) => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.classList.toggle('inactive');
    })
});

/* Tabs */
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


