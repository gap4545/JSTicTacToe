function animateOnce(animationClass, element, {deleteElementAfter = false, removeClassAfter = false} = {}) {

    element.classList.add(animationClass);
    element.addEventListener('animationend', e => {
        if (deleteElementAfter == true) {
            element.parentNode.removeChild(element);
        };
        if (removeClassAfter == true) {
            element.classList.remove(animationClass);
        };
    }, {once : true});

};

export default {animateOnce};