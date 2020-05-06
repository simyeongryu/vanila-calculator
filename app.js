const result = document.querySelector("#result");
const equals = document.querySelector("#equals");
const reset = document.querySelector("#reset");
const numbers = Array.from(document.querySelectorAll(".numbers"));
const operations = Array.from(document.querySelectorAll(".operations"));

let prevValue = "";
let prevDone = false;
let nextValue = "";
let nextDone = false;
let currentOperation = "";
const operators = ["+", "-", "*", "/"];

const calculate = () => {
  const parsedPrevValue = +prevValue;
  const parsedNextValue = +nextValue;
  let calculatedResult = 0;

  if (currentOperation !== "") {
    if (currentOperation === operators[0]) {
      calculatedResult = parsedPrevValue + parsedNextValue;
    }
    if (currentOperation === operators[1]) {
      calculatedResult = parsedPrevValue - parsedNextValue;
    }
    if (currentOperation === operators[2]) {
      calculatedResult = parsedPrevValue * parsedNextValue;
    }
    if (currentOperation === operators[3]) {
      calculatedResult = parsedPrevValue / parsedNextValue;
    }
  }

  result.innerText = calculatedResult;
  prevValue = calculatedResult;
  nextDone = false;
  nextValue = "";
};

const handleOperations = text => {
  const clickedOperation = text;
  if (!prevDone) {
    prevDone = true;
  }
  if (prevDone && nextDone) {
    calculate();
  }
  currentOperation = clickedOperation;
};

const handleNumbers = text => {
  const clickedNumber = text;
  if (!prevDone) {
    prevValue += clickedNumber;
    result.innerText = prevValue;
  } else {
    nextValue += clickedNumber;
    result.innerText = nextValue;
    nextDone = true;
  }
};

const handleClick = e => {
  const text = e.target.innerText;
  // 숫자
  if (!isNaN(text)) {
    handleNumbers(text);
    return;
  }
  // 연산자
  if (operators.includes(text)) {
    handleOperations(text);
    return;
  }
  // equal
  if (text === "=") {
    handleEquals();
    return;
  }
  // reset
  if (text === "C") {
    handleReset();
    return;
  }
};

const handleEquals = () => {
  if (prevDone && nextDone) {
    calculate();
  }
};

const handleReset = () => {
  prevValue = "";
  prevDone = false;
  nextValue = "";
  nextDone = false;
  currentOperation = "";
  result.innerText = "0";
};

const handleKeyup = e => {
  const input = e.key;
  // Enter
  if (input === "Enter") {
    handleEquals();
  }
  // 숫자
  if (!isNaN(input)) {
    handleNumbers(input);
  }
  // 연산자
  if (operators.includes(input)) {
    handleOperations(input);
  }
  // ESC
  if (input === "Escape") {
    handleReset();
  }
};

const init = () => {
  reset.addEventListener("click", handleClick);
  equals.addEventListener("click", handleClick);
  document.addEventListener("keyup", handleKeyup);
  numbers.forEach(number => number.addEventListener("click", handleClick));
  operations.forEach(operation =>
    operation.addEventListener("click", handleClick)
  );
};

init();
