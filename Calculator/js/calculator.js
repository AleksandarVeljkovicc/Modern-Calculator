class Calculator {
    constructor(displaySelector, buttonContainerSelector) {
        this.display = $(displaySelector);
        this.buttonContainer = $(buttonContainerSelector);
        this.currentValue = '';
        this.addButtonListeners();
    }

    addButtonListeners() {
        this.buttonContainer.on('click', 'button', (event) => {
            const value = $(event.target).data('value');
            this.handleButtonClick(value);
        });

        $('#first-row').on('click', 'button', (event) => {
            const value = $(event.target).data('value');
            this.handleButtonClick(value);
        });
    }

    handleButtonClick(value) {
        if (value === 'C') {
            this.clearLastInput();
        } else if (value === '=') {
            this.calculateResult();
        } else {
            this.updateDisplay(value);
        }
    }

    clearLastInput() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
        this.updateDisplayOnScreen();
    }

    calculateResult() {
        try {
            const sanitizedExpression = this.currentValue.replace(/(\d+\.?\d*)\/(0(?!\d))/g, '0');
            const result = Function(`return ${sanitizedExpression.replace('×', '*').replace('÷', '/')}`)();
            this.currentValue = result.toString();
        } catch (e) {
            this.currentValue = 'Error';
        }
        this.updateDisplayOnScreen();
    }

    updateDisplay(value) {
        this.currentValue += value;
        this.updateDisplayOnScreen();
    }

    updateDisplayOnScreen() {
        this.display.text(this.currentValue);
    }

    static createNumberButtons() {
        let buttonsHtml = '';
        for (let i = 9; i >= 0; i--) {
            buttonsHtml += `<button data-value="${i}">${i}</button>`;
        }
        return buttonsHtml;
    }

    static createDotButton() {
        return '<button data-value=".">.</button>';
    }

    static createEqButton() {
        return '<button data-value="=">=</button>';
    }
}

export default Calculator;
