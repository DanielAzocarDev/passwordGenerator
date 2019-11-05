// DOM Elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Generator functions - www.net-comber.com/charset.html

const getRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getRandomNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getRandomSymbol = () => {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// generate event listener
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumbs = numbersEl.checked;
  const hasSymb = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbs, hasSymb, length);
});

// copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if(!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard');

});

// Generate password function
const generatePassword = (lower, upper, number, symbol, length) => {
  // 1. init pw var
  let generatedPassword = '';

  // 2. filter out unchecked types
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
    item => Object.values(item)[0]
  );

  // console.log(typesArr)
  // 3. Loop over the length, call generator func

  if(typesCount === 0){
    return ''; 
  }

  for(let i = 0; i < length; i += typesCount){
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      // console.log('funcName', funcName);
      generatedPassword += randomFunc[funcName]();
    });
  }

  // 4. add final pw to the var and return
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;

}
