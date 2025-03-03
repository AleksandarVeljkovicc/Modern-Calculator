import jquery from 'jquery';
import { JSDOM } from 'jsdom';
import Calculator from '../../js/calculator';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="calculator"><div id="display"></div><div id="second-row-left"></div></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.$ = jquery(dom.window);

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator('#display', '#second-row-left');
    });

    test('should initialize with empty display', () => {
        expect(calculator.currentValue).toBe('');
    });

    test('should update display when a number is clicked', () => {
        calculator.handleButtonClick('5');
        expect(calculator.currentValue).toBe('5');
    });

    test('should clear last input when "C" is clicked', () => {
        calculator.handleButtonClick('5');
        calculator.handleButtonClick('C');
        expect(calculator.currentValue).toBe('');
    });

    test('should calculate result correctly', () => {
        calculator.handleButtonClick('5');
        calculator.handleButtonClick('+');
        calculator.handleButtonClick('3');
        calculator.handleButtonClick('=');
        expect(calculator.currentValue).toBe('8');
    });

    test('should handle division by zero', () => {
        calculator.handleButtonClick('5');
        calculator.handleButtonClick('/');
        calculator.handleButtonClick('0');
        calculator.handleButtonClick('=');
        expect(calculator.currentValue).toBe('0');
    });

    test('should return "Error" for invalid expressions', () => {
        calculator.handleButtonClick('/');
        calculator.handleButtonClick('=');
        expect(calculator.currentValue).toBe('Error');
    });
});
