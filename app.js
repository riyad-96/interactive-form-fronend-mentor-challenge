const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault()
});

const nameInput = document.getElementById('name');
const cardNumInput = document.getElementById('number');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const cvcInput = document.getElementById('cvc')

const allInput = document.querySelectorAll('input');
const submitBtn = document.querySelector('.submit-btn');
const continueBtn = document.querySelector('.continue-btn')

let hasError = false;
//! Submit button 
submitBtn.addEventListener('click', () => {
  allInput.forEach(input => {
    if (!input.value) {
      addErr(input, "can't be empty");
      hasError = true
      return;
    }
    else {
      removeErr(input);
      hasError = false
    }
  });

  if (!monthInput.value.trim()) {
    addErr(monthInput)
    return;
  }

  if(cardNumInput.value.length < 19) {
    addErr(cardNumInput, "Card number must be 16 digits")
    hasError = true
  } else{
    removeErr(cardNumInput)
    hasError = false
  }

  if(!hasError) {
    form.style.display = 'none'
    document.querySelector('.thanks-dialogue').style.display = 'grid'
  }

});

//! Continue Button
continueBtn.addEventListener('click', () => {
  location.reload();
})

//! Remove error while typing
allInput.forEach(input => {
  input.addEventListener('input', () => {
    removeErr(input)
  })
})

//! Card number format
cardNumInput.addEventListener('input', () => {
  if (/[^\d ]/.test(cardNumInput.value)) {
    addErr(cardNumInput, "Wrong format, numbers only");
    return;
  }

  cardNumInput.value = cardNumInput.value
  .replace(/ /g, '')
  .replace(/(\d{4})/g, '$1 ')
  .trim();

  removeErr(cardNumInput);
});

//! showing details on card
const cardNum = document.querySelector('.card-number')
const userName = document.querySelector('.user-name')
const expMonth = document.querySelector('.exp-month')
const expYear = document.querySelector('.exp-year')
const cvc = document.querySelector('.cvc')

const cardNumDef = cardNum.textContent
const userNameDef = userName.textContent
const expMonthDef = expMonth.textContent
const expYearDef = expYear.textContent
const cvcDef = cvc.textContent

cardNumInput.addEventListener('input', () => {
  showInCard(cardNumInput, cardNum, cardNumDef)
})

nameInput.addEventListener('input', () => {
  showInCard(nameInput, userName, userNameDef)
})

monthInput.addEventListener('input', () => {
  showInCard(monthInput, expMonth, expMonthDef)
})

yearInput.addEventListener('input', () => {
  showInCard(yearInput, expYear, expYearDef)
})

cvcInput.addEventListener('input', () => {
  showInCard(cvcInput, cvc, cvcDef)
})

//! Helper functions 
function showInCard(input, display, defaultValue) {
  if(input.value.trim() === '') {
    display.textContent = defaultValue
  }
  else{
    display.textContent = input.value
  }
}

function addErr(input, message = "can't be empty") {
  const errTxt = input.closest('.input-group').querySelector('.error-message');
  input.style.border = '1px solid #ff5252';
  errTxt.textContent = message;
};

function removeErr(input) {
  const errTxt = input.closest('.input-group').querySelector('.error-message');
  input.style.border = '';
  errTxt.textContent = '';
};