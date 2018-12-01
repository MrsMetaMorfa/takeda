window.onload = function () {

    // Menu button
    function classToggle() {
        this.classList.toggle('active');
    }
    document.querySelector('.menu_btn').addEventListener('click', classToggle, false);

    // Close speech bubble
    function visibilityToggle() {
        console.log(this.parentNode);
        this.parentNode.classList.toggle('disabled');
    }
    if (document.querySelector('.speech-bubble .close')) {
        document.querySelector('.speech-bubble .close').addEventListener('click', visibilityToggle, false);
    }

    if (document.querySelector('.custom-select')) {

        var x, i, j, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        for (i = 0; i < x.length; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV");
            a.setAttribute("class", "select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV");
            b.setAttribute("class", "select-items select-hide");
            for (j = 1; j < selElmnt.length; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function (e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    var y, i, k, s, h;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < s.length; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("same-as-selected");
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function (e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }

        function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            var x, y, i, arrNo = [];
            x = document.getElementsByClassName("select-items");
            y = document.getElementsByClassName("select-selected");
            for (i = 0; i < y.length; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < x.length; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("select-hide");
                }
            }
        }
    }
    /*if the user clicks anywhere outside the select box,
    then close all select boxes:*/
    document.addEventListener("click", closeAllSelect);

    // init Masonry
    if (document.querySelector('.mansonry .container')) {
        var grid = document.querySelector('.page_content--tiles .container');

        var msnry = new Masonry(grid, {
            itemSelector: '.tile',
            columnWidth: '.tile-width',
            percentPosition: true
        });
    }

    function changeSize() {
        this.previousElementSibling.querySelector('.photo_sizes').classList.toggle('disabled');
        this.classList.toggle('disabled');
    }
    if (document.querySelector('.change-size')) {
        var buttons = document.querySelectorAll('.change-size');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", changeSize, false);
        }
    }

    // Modal
    var modalTrigger = document.querySelectorAll('.open-modal'),
        transitionLayer = document.querySelector('.modal_wrapper'),
        modalWindow = document.querySelectorAll('.modal');

    //open modal window
    for (var i = 0; i < modalTrigger.length; i++) {
        modalTrigger[i].addEventListener("click", openModalWindow, false);
    }

    //modalTrigger.addEventListener('click', openModalWindow, false);
    function openModalWindow(event) {
        event.preventDefault();
        var modalId = event.target.getAttribute('data-target'), modalCurrent;
        transitionLayer.classList.add('visible');
        transitionLayer.classList.add('open');
        var modalCurrent;
        for (var i = 0; i < modalWindow.length; i++) {
            modalWindow[i].classList.remove('visible');
            modalWindow[i].classList.remove('open');
            if (modalWindow[i].getAttribute('id') == modalId) {
                modalCurrent = modalWindow[i];
            }
        }
        modalCurrent.classList.add('visible');
        modalCurrent.classList.add('open');

        modalCurrent.querySelector('.close-popup').addEventListener('click', closeModalWindow, false);
    }


    //close modal window
    function closeModalWindow(event) {
        event.preventDefault();
        event.target.parentNode.parentNode.classList.remove('open');
        transitionLayer.classList.remove('open');
        setTimeout(function () {
            event.target.parentNode.parentNode.classList.remove('visible');
            transitionLayer.classList.remove('visible');
        }, 200);
    }

    document.querySelector('.modal.visible').querySelector('.close-popup').addEventListener('click', closeModalWindow, false);

};

