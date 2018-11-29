window.onload = function () {

    //Menu button
    // if(window.matchMedia('(min-width: 870px)').matches) {
    function classToggle() {
        this.classList.toggle('active');
    }
    document.querySelector('.menu_btn').addEventListener('click', classToggle, false);

    function visibilityToggle() {
        console.log(this.parentNode);
        this.parentNode.classList.toggle('disabled');
    }
    document.querySelector('.speech-bubble button').addEventListener('click', visibilityToggle, false);
    // }

    //Modal transition
    //cache some jQuery objects
    if (document.querySelector('.modal')) {
        var modalTrigger = document.querySelectorAll('.open-modal'),
            transitionLayer = document.querySelector('.transition-layer'),
            transitionBackground = transitionLayer.querySelector('div'),
            modalWindow = document.querySelectorAll('.modal');

        var frameProportion = 1.78, //png frame aspect ratio
            frames = transitionLayer.getAttribute('data-frame'), //number of png frames
            resize = false,
            delay = 800;

        //open modal window
        for (var i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].addEventListener("click", openModalWindow, false);
        }

        //modalTrigger.addEventListener('click', openModalWindow, false);
        function openModalWindow(event) {
            event.preventDefault();
            var modalId = event.target.getAttribute('data-target'), modalCurrent;
            transitionLayer.classList.add('visible');
            transitionLayer.classList.add('opening');
            for (var i = 0; i < modalWindow.length; i++) {
                if (modalWindow[i].getAttribute('id') == modalId) {
                    modalCurrent = modalWindow[i];
                }
            }
            setTimeout(function () {
                modalCurrent.classList.add('visible');
                transitionLayer.classList.remove('opening');
            }, delay);
            modalCurrent.querySelector('.close-modal').addEventListener('click', closeModalWindow, false);
        }

        //close modal window
        function closeModalWindow(event) {
            event.preventDefault();
            transitionLayer.classList.add('closing');
            event.target.parentNode.parentNode.classList.remove('visible');
            setTimeout(
                function () {
                    transitionLayer.classList.remove('closing');
                    transitionLayer.classList.remove('opening');
                    transitionLayer.classList.remove('visible');
                }, delay);
        }

        function setLayerDimensions() {
            var windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                layerHeight, layerWidth;

            if (windowWidth / windowHeight > frameProportion) {
                layerWidth = windowWidth;
                layerHeight = layerWidth / frameProportion;
            } else {
                layerHeight = windowHeight * 1.2;
                layerWidth = layerHeight * frameProportion;
            }

            transitionBackground.css({
                'width': layerWidth * frames + 'px',
                'height': layerHeight + 'px',
            });

            resize = false;
        }
    }
};

