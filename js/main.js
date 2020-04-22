'use strict'

document.addEventListener('DOMContentLoaded', function() {
  //Inputs
  const area = document.getElementById('area');
  const meters = document.getElementById('meters');
  const object = document.getElementById('object');
  const areaPoints = document.getElementById('areaPoints');
  const collectionOfInputs = document.querySelectorAll('input[type="radio"]');
  const packPoints = document.getElementById('packPoints');
  const collectionOfButtons = document.querySelectorAll('.button_calсulator');
  //Tabs   
  const collectionOfTabs = document.querySelectorAll('.tabs__item');
  const tabImages = document.querySelectorAll('.works > .container > .row:last-child > div');
  //Range
  const range = document.getElementById('range');
  const rangeList = document.getElementById('rangeList');
  //Tabs
  const lineTab = document.getElementById('lineTab');
  //Burger
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const header = document.getElementById('header');
  const home = document.getElementById('home');
  //MouseDown
  const mouseDown = document.getElementById('mouseDown');
  //Resize
  let widthOfWindow = document.documentElement.clientWidth;
  let homeHeight = home.offsetHeight;

  //Inputs
  areaPoints.addEventListener('click', (e) => {
    let currentTarget = e.target;
    if (currentTarget.tagName == 'LABEL') {
      let znach = currentTarget.previousElementSibling.previousElementSibling.textContent;

      area.innerHTML = znach.replace('м2', "") + 'м' + '<sup>2</sup>';

      //calculation of average cost
      for (let k = 0; k < collectionOfButtons.length; k++) {
        if (collectionOfButtons[k].style.backgroundColor == 'rgb(48, 163, 228)') {
          let objZena = parseInt(collectionOfButtons[k].dataset.koef.replace(' ', ""));

          meters.innerHTML = objZena / parseInt(znach.replace(' ', "")) + 'тг';
        }

      }
    }
  });

  //Work with buttons
  packPoints.addEventListener('click', (e) => {
    let currentButton = e.target.closest('.calculator__content-pack__point').firstElementChild;
    for (let i = 0; i < collectionOfButtons.length; i++) {
      if (collectionOfButtons[i] == currentButton) {
        //button illumination
        collectionOfButtons[i].style.backgroundColor = '#30a3e4';

        collectionOfButtons[i].style.borderColor = '#30a3e4';

        //pricing per object
        let objZena = collectionOfButtons[i].dataset.koef;
        object.innerHTML = objZena + 'тг';

        let zenaMeter;

        for (let j = 0; j < collectionOfInputs.length; j++) {
          if (collectionOfInputs[j].checked) {
            let textUnderInput = collectionOfInputs[j].previousElementSibling.textContent.replace(' ', "");
            //calculation of average cost
            zenaMeter = (parseInt(objZena.replace(' ', ""))) / parseInt(textUnderInput);

            meters.innerHTML = zenaMeter + 'тг';
          }
        }

      } else {
        //inactive staining
        collectionOfButtons[i].style.backgroundColor = 'transparent';

        collectionOfButtons[i].style.borderColor = 'white';
      }
    }
  });

  //Tabs
  lineTab.addEventListener('click', (e) => {
    let currentTab = e.target;
    currentTab.classList.add('tabs__item_active');

    for (let n = 0; n < collectionOfTabs.length; n++) {
      if (collectionOfTabs[n] != currentTab) {
        collectionOfTabs[n].classList.remove('tabs__item_active');
      }
    }

    if (e.target.dataset.tab != 'all') {
      for (let m = 0; m < tabImages.length; m++) {
        if (tabImages[m].dataset.img != e.target.dataset.tab) {
          tabImages[m].style.display = 'none';
        } else if (tabImages[m].dataset.img == e.target.dataset.tab) {
          tabImages[m].style.display = 'block';
        }
      }
    } else {
      for (let a = 0; a < tabImages.length; a++) {
        tabImages[a].style.display = 'block';
      }
    }
  });
  
  //Range
  range.addEventListener('input', () => {
    let value = parseInt(range.value) / -1;
    rangeList.style.left = value +'%';
  });

  //Slider 
   $('.team__slider').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: false,
     dots: false
   });

   //Burger
   burger.addEventListener('click', () => {
      burger.classList.toggle('burger_active');
      nav.classList.toggle('nav_show');
   })

   //Scroll
   nav.addEventListener('click', (e) => {
     if (e.target.tagName == 'A') {
        let currentLink = e.target;
        let currentTop = document.getElementById(currentLink.dataset.scroll).offsetTop;

        if (widthOfWindow > 576) {
          $('html, body').animate({
            scrollTop: currentTop - 97
          }, 2000)
        } else {
          $('html, body').animate({
            scrollTop: currentTop - 177
          }, 2000)
        } 
     }
   })

  //Fixed Header
  window.addEventListener('scroll', () => {
    let scrollOfTop = window.pageYOffset;
    
    if (scrollOfTop >= homeHeight) {
      header.classList.add('header_fixed');
    } else {
      header.classList.remove('header_fixed');
    }
  })

  //MouseDown
  mouseDown.addEventListener('click', () => {
    $('html, body').animate({
      scrollTop: homeHeight
    }, 1000)
  })

  //Animation by animate.css and WOW.js 
  new WOW().init();

  //Resize
  window.addEventListener('resize', () => {
    homeHeight = home.offsetHeight;
    widthOfWindow = document.documentElement.clientWidth;
  })
});

