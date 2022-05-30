const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

const updateDisplay = () => {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
};

const clearCalculator = () => {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
};

const inputDigit = (digit) => {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
};

const inverseNumber = () => {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
};

const handleOperator = (operator) => {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    calculator.displayNumber = "0";
  } else {
    alert("Operator Sudah Dipilih!");
  }
};

const performCalculation = () => {
  if (
    calculator.firstNumber == null &&
    calculator.waitingForSecondNumber == false
  ) {
    alert("Operator Belum Dipilih");
  }

  let result = 0;

  if (calculator.operator == "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // object utk argument putHIstory()
  const history = {
    firstNumber: calculator.firstNumber,
    operator: calculator.operator,
    secondNumber: calculator.displayNumber,
    result: result,
  };

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
};

const buttons = document.querySelectorAll(".button");
for (const button of buttons) {
  button.addEventListener("click", function (event) {
    const target = event.target;

    // Handle klik button clear
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    //   Handle Klik button negative
    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    //   Handle Klik button equals
    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    //   Handle Klik button operator
    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}
