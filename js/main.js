'use strict'

document.addEventListener('DOMContentLoaded', function() {
  let area = document.getElementById('area');
  let meters = document.getElementById('meters');
  let object = document.getElementById('object');

  let areaPoint = document.querySelector('.calculator__content-area__points');
  let labels = document.querySelectorAll('label');
  let inputs = document.querySelectorAll('input[type="radio"]');

  let packPoint = document.querySelector('.calculator__content-pack__points');
  let buttons = document.querySelectorAll('.button_calсulator');
  let tabs = document.querySelectorAll('.tabs__item');
  let tabImgs = document.querySelectorAll('.works > .container > .row:last-child > div');

  let range = document.getElementById('range');
  let rangeList = document.querySelector('.range__slider-list');

  let tab = document.getElementById('tabs');

  let burger = document.getElementById('burger');
  let nav = document.getElementById('nav');
  let header = document.getElementById('header');
  let home = document.getElementById('home');

  let widthOfWindow = document.documentElement.clientWidth;
  let homeHeight = home.offsetHeight;

  //Resize
  window.addEventListener('resize', () => {
    let homeHeight = home.offsetHeight;
    let scrollOfTop = window.pageYOffset;
    widthOfWindow = document.documentElement.clientWidth;
  })

  //Инпуты
  areaPoint.addEventListener('click', (e) => {
    let currentTarget = e.target;
    if (currentTarget.tagName == 'LABEL') {
      let znach = currentTarget.previousElementSibling.previousElementSibling.textContent;

      area.innerHTML = znach.replace('м2', "") + 'м' + '<sup>2</sup>';

      //просчет средней стоимости
      for (let k = 0; k < buttons.length; k++) {
        if (buttons[k].style.backgroundColor == 'rgb(48, 163, 228)') {
          let objZena = parseInt(buttons[k].dataset.koef.replace(' ', ""));

          meters.innerHTML = objZena / parseInt(znach.replace(' ', "")) + 'тг';
        }

      }
    }
  });

  //Работа с кнопками
  packPoint.addEventListener('click', (e) => {
    let currentButton = e.target.closest('.calculator__content-pack__point').firstElementChild;
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i] == currentButton) {
        //подстветка кнопок
        buttons[i].style.backgroundColor = '#30a3e4';

        buttons[i].style.borderColor = '#30a3e4';

        //просчет цены за объект
        let objZena = buttons[i].dataset.koef;
        object.innerHTML = objZena + 'тг';

        let zenaMeter;

        for (let j = 0; j < inputs.length; j++) {
          if (inputs[j].checked) {
            let textUnderInput = inputs[j].previousElementSibling.textContent.replace(' ', "");
            //просчет средней стоимости
            zenaMeter = (parseInt(objZena.replace(' ', ""))) / parseInt(textUnderInput);

            meters.innerHTML = zenaMeter + 'тг';
          }
        }

      } else {
        //окрашивание в неактивный элемент
        buttons[i].style.backgroundColor = 'transparent';

        buttons[i].style.borderColor = 'white';
      }
    }
  });

  //Табы
  tab.addEventListener('click', (e) => {
    let currentTab = e.target;
    currentTab.classList.add('tabs__item_active');

    for (let n = 0; n < tabs.length; n++) {
      if (tabs[n] != currentTab) {
        tabs[n].classList.remove('tabs__item_active');
      }
    }

    if (e.target.dataset.tab != 'all') {
      for (let m = 0; m < tabImgs.length; m++) {
        if (tabImgs[m].dataset.img != e.target.dataset.tab) {
          tabImgs[m].style.display = 'none';
        } else if (tabImgs[m].dataset.img == e.target.dataset.tab) {
          tabImgs[m].style.display = 'block';
        }
      }
    } else {
      for (let a = 0; a < tabImgs.length; a++) {
        tabImgs[a].style.display = 'block';   
      }
    }
  });
  
  //Ползунок
  range.addEventListener('input', () => {
    let value = parseInt(range.value) / -1;
    rangeList.style.left = value +'%';
  });

  //Слайдер 
   $('.team__slider').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: false,
     dots: false
   });

   //Бургер
   burger.addEventListener('click', () => {
      burger.classList.toggle('burger_active');
      nav.classList.toggle('nav_show');
   })

   //Скролл
   nav.addEventListener('click', (e) => {
     if (e.target.tagName == 'A') {
        let currentLink = e.target;
        let currentTop = document.getElementById(currentLink.dataset.scroll).offsetTop;

        if (widthOfWindow > 576) {
          $('html, body').animate({
            scrollTop: currentTop - 97
          }, 1000)
        } else {
          $('html, body').animate({
            scrollTop: currentTop - 177
          }, 1000)
        } 
     }
   })

  //Шапка
  window.addEventListener('scroll', () => {
    let scrollOfTop = window.pageYOffset;
    
    if (scrollOfTop >= homeHeight) {
      header.classList.add('header_fixed');
    } else {
      header.classList.remove('header_fixed');
    }
  })
});

