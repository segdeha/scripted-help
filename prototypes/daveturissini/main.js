'use strict';

function getOffset(prop, elem, accumulated = 0) {
    var val = elem[prop] + accumulated;

    if (elem.offsetParent) {
        return getOffset(prop, elem.offsetParent, val);
    }

    return val;
}

const getOffsetTop = getOffset.bind(null, 'offsetTop');
const getOffsetLeft = getOffset.bind(null, 'offsetLeft');


function createOnboardingOverlay () {
    let currentIndex = -1;
    const items = [];
    const el = document.createElement('div');
    el.classList.add('onboarding-overlay');

    return {

        add (item) {
            items.push(item);
            item.appendTo(el);
        },

        appendTo(elem) {
            elem.appendChild(el);
        },

        remove () {
            el.parentNode.removeChild(el);
        },

        next () {
            const nextIndex = currentIndex + 1;
            const current = items[currentIndex];
            const next = items[nextIndex];

            if (current) {
                current.hide();
            }

            if (next) {
                next.show();
            } else {
                this.remove();
            }

            currentIndex = nextIndex;

        }

    };
}

function createOnboardingMessage (elem, position, message) {
    const div = document.createElement('div');
    const clone = elem.cloneNode(true);

    clone.classList.add('onboarding-content-clone');
    clone.style.left = getOffsetLeft(elem) + 'px';
    clone.style.top = getOffsetTop(elem) + 'px';
    clone.style.width = elem.offsetWidth + 'px';
    clone.style.height = elem.offsetHeight + 'px';

    div.classList.add('onboarding-message');
    div.innerHTML = message;
    div.style.top = position.top + 'px';
    div.style.left = position.left + 'px';

    return {

        appendTo (el) {
            el.appendChild(div);
            el.appendChild(clone);
        },

        show () {
            div.classList.add('current');
            clone.classList.add('onboarding-content');
        },

        hide () {
            div.classList.remove('current');
            clone.classList.remove('onboarding-content');
        }
    };
}


const firstElem = document.getElementById('onboard-1');
const secondElem = document.getElementById('onboard-2');


const onboardingOverlay = createOnboardingOverlay();
const firstOnboardingMessage = createOnboardingMessage(firstElem, {
    left:getOffsetLeft(firstElem) + firstElem.offsetWidth + 20,
    top:getOffsetTop(firstElem)
}, 'This is the first onboarding message. Press any key to get the next one.');

const secondOnboardingMessage = createOnboardingMessage(secondElem, {
    left:getOffsetLeft(secondElem),
    top:getOffsetTop(secondElem) + secondElem.offsetHeight + 20
}, 'This is the second and last onboarding message. Press any key to access the content.');

onboardingOverlay.add(firstOnboardingMessage);
onboardingOverlay.add(secondOnboardingMessage);
onboardingOverlay.appendTo(document.body);
onboardingOverlay.next();

document.addEventListener('keyup', onboardingOverlay.next.bind(onboardingOverlay));


export let __hotReload = function () {
    onboardingOverlay.remove();
    return true;

};


