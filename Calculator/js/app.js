import Calculator from './calculator.js';

$(document).ready(function() {
    const calculator = new Calculator('#display', '#second-row');

    $('#second-row-left').append(Calculator.createNumberButtons());
    $('#second-row-left').append(Calculator.createDotButton());
    $('#second-row-left').append(Calculator.createEqButton());
});