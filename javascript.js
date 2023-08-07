const display = document.querySelector('.calculator-input');  //This line selects the first HTML element on the page with the "calculator-input" class and assigns this element to a display.
const keys = document.querySelector('.calculator-keys'); //This line selects the first HTML element on the page with the "calculator-keys" class and assigns this element to a display.

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() { //This function, when called, assigns the value of the variable named displayValue to the value of the display form element.
    display.value = displayValue;
}

keys.addEventListener('click', function(e) { //when clicked this function will be called.
    const element = e.target;       //e.target: This represents the HTML element where the event occurred. That is, it specifies the element that was clicked or that caused the event.
    const value = element.value;  //the number or operator(value) which selected assigned as the value.

    if (!element.matches('button')) return; //element.matches('button'):Here the "button" selector specifies whether the element is a <button> element. This expression will return true if the element is a <button>; otherwise it will return false.
                                             //!element.matches('button'): This reverses the value of element.matches('button') . That is, if the element is not a <button> (ie false), this expression is true; otherwise, ie if the element is a <button> (ie true), this expression will be false.

    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            clear();
            break;
        default:
            inputNumber(element.value);        //If the input value does not match any value, the value to be displayed will be equal to the entered element.
    }
    updateDisplay();  //updateDisplay();: Finally, after all operations are done, it will update the calculator display by calling a function called updateDisplay.
});

function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);   //parseFloat(): This is a JavaScript function to convert a text to a decimal number. The parseFloat() function converts the current part to a numeric value and ignores non-numeric parts

    if(operator && waitingForSecondValue) {  //operator && waitingForSecondValue: This is the logical operator "and" where the two conditions are evaluated together. That is, both conditions must be true so that the expression is true.
        operator = nextOperator;    //operator = nextOperator;: If the operator and waitingForSecondValue conditions together are true, i.e. the previous operator has already been selected and is waiting to get the second value (in this case waitingForSecondValue is true), it assigns the newly selected nextOperator (i.e. new operator) value to the current operator variable. 
                                   //This is used to replace the previous selected operator in case the user selects a new operator.
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`; //result.toFixed(7): This expression converts the value of the result variable to a decimal number by rounding (correction) and setting the number of decimal places to 7.
                      //parseFloat(result.toFixed(7)): Converts the text (string) value obtained in the above step back to a decimal number. This conversion converts the result back to a numeric value.
                      //
        firstValue = result;   //firstValue = result;: The result value, which is the result of the calculations, is saved as the new firstValue. So, when the user wants to do the next calculation, he can use this result as firstValue and perform sequential operations.
    } 

    waitingForSecondValue = true;
    operator = nextOperator;

    console.log(displayValue, firstValue, operator, waitingForSecondValue); //console.log(displayValue, firstValue, operator, waitingForSecondValue);: This line prints the current values of the variables to the console, using the console.log() function. This can be used to understand and debug the values of variables within the application.
}

function calculate(first, second, operator) {
    if(operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

function inputNumber(num) {     //This structure allows the user to enter consecutive numbers into the calculator and perform operations. When the user enters a number, the inputNumber function runs, updating the screen and checking the necessary conditions. 
                                //For example, after the user enters "5", "6" and "+", the value on the display will be "56" and waitingForSecondValue will be true. Later, when the user enters "3", the value on the screen will be "3" and waitingForSecondValue will be false. This allows the user to sequentially perform calculations by entering the numbers they want.
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {                                              //eğer displayValue "0" ise, displayValue değişkenini num değeriyle değiştirir ve kullanıcının girdiği rakamı ekranda gösterir. Eğer displayValue "0" değilse, displayValue ve num değerlerini birleştirerek ekrandaki değeri günceller ve kullanıcının ardışık rakamları girdiği durumda ekranı düzenli bir şekilde gösterir.
        displayValue = displayValue === '0'? num: displayValue + num;    //displayValue = displayValue === '0'? num : displayValue + num;: This line updates the value of the variable named displayValue. 
                                                                        //If displayValue is currently "0" (initial value), the value of the num parameter is set to displayValue; otherwise, the value of the num parameter is appended to the variable displayValue. This allows the display to update when the user enters consecutive digits.
    }                                                                    //?: This denotes the beginning of the "if" part in the ternary operator. That is, it determines the action to be taken based on the result of the previous condition.
                                                                         //displayValue + num: Eğer displayValue değişkeni "0" ile eşleşmezse, displayValue ve num değişkenlerini birleştirerek yeni bir değer elde ederiz. Bu, kullanıcının ardışık rakamları girdiğinde ekranın güncellenmesini sağlar.
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function inputDecimal() {                 
    if (!displayValue.includes('.')) {
        displayValue += '.';  //Bu yapı, hesap makinesi ekranına sadece bir kez ondalık nokta eklenmesini sağlar. Kullanıcı ondalık sayı girişi yapmak istediğinde, ondalık noktanın yalnızca bir kez eklenmesi için kontrol yapar. Örneğin, eğer ekran başlangıçta "0" ise ve kullanıcı "0.5" girmek isterse, inputDecimal() fonksiyonu çağrıldığında ekran "0.5" olacak. 
                             //Daha sonra, eğer kullanıcı bir daha ondalık nokta girmeye çalışırsa, inputDecimal() fonksiyonu çalışmayacak ve ekran aynı şekilde "0.5" olarak kalacaktır. Bu, hesap makinesi uygulamasının doğru ve düzenli ondalık sayı girişi yapabilmesini sağlar.
    }
}

function clear() {
    displayValue = '0';
}
