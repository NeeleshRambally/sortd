export class Calculator {

    public eval(expression: string): number {
        expression = expression.replace(/\s+/g, '');
        return this.evalExpression(expression);
    }

    private evalExpression(expression: string): number {
        const ops: string[] = [];
        const values: number[] = [];

        let i = 0;
        while (i < expression.length) {
            const char = expression[i];

            if (/\d/.test(char) || char === '.') {

                let numString = '';
                while (i < expression.length && (/\d/.test(expression[i]) || expression[i] === '.')) {
                    numString += expression[i];
                    i++;
                }
                values.push(parseFloat(numString));
            } else if (expression.slice(i, i + 4) === 'sqrt') {
                i += 4
                const num = this.evalExpression(this.extractSubExp(expression, i));
                values.push(Math.sqrt(num));

            } else if (expression.slice(i, i + 3) === "sqr") {
                i += 3
                const num = this.evalExpression(this.extractSubExp(expression, i));
                values.push(Math.pow(num, 2))
            } else if (char === '(') {
                const subExpr = this.extractSubExp(expression, i + 1);
                values.push(this.evalExpression(subExpr))
                i += subExpr.length + 2;
            } else if ('+-*/'.includes(char)) {
                while (ops.length > 0 && this.precedence(ops[ops.length - 1]) >= this.precedence(char)) {
                    this.applyOperator(ops, values);
                }
                ops.push(char);
                i++

            } else if (char === ')') {
                throw new Error("Invalid character expression")

            } else {
                throw new Error("Invalid character expression")
            }
        }
        while (ops.length > 0) {
            this.applyOperator(ops, values);
        }
        if (values.length !== 1) {
            throw new Error("Invalid character expression")

        }
        return values[0];
    }


    private extractSubExp(expression: string, startIndex: number): string {
        let openBrackets = 1
        let i = startIndex;
        while (i < expression.length && openBrackets > 0) {
            if (expression[i] === '(') openBrackets++;
            if (expression[i] === ')') openBrackets--;
            i++
        }
        return expression.slice(startIndex, i - 1);
    }

    private applyOperator(operators: string[], values: number[]): void {
        const operator = operators.pop();
        const b = values.pop();
        const a = values.pop();

        if (a === undefined || b === undefined) {
            throw new Error("Invalid operator expression")
        }
        let result: number;

        switch (operator) {
            case'+':
                result = a + b;
                break;
            case'-':
                result = a - b;
                break;
            case'*':
                result = a * b;
                break;
            case'/':
                if (b === 0) throw new Error("Division by zero");
                result = a / b;
                break;
            default:
                throw new Error("Unknown operator");

        }
        values.push(result);
    }

    private precedence(operator: string): number {
        if (operator === '+' || operator === '-') return 1;
        if (operator === '*' || operator === '/') return 2;
        return 0;
    }

}