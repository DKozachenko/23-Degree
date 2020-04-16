'use strict'

let area = document.getElementById('area');
let meters = document.getElementById('meters');
let object = document.getElementById('object');

let areaPoint = document.querySelector('.calculator__content-area__points');
let labels = document.querySelectorAll('label');
let inputs = document.querySelectorAll('input[type="radio"]');

let packPoint = document.querySelector('.calculator__content-pack__points');
let buttons = document.querySelectorAll('.button_calсulator');

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

