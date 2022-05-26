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
            1344: {
                disable: true
            }
        }
    });
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
