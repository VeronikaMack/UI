/*skaicuotuvo klase*/
class Skaiciuotuvas {
    /*constructor settina kad saugot situs duomenis skaiciuotuve kai jie bus priskirti*/
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()/*kad sukurus/paleidus skaiciuotuva default butu clear*/
    }
/*AC funkcija*/
    clear(){
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    }
/*DEL funkcija*/
    delete(){
this.currentOperand = this.currentOperand.toString().slice(0, -1)/*paima visus simbolius is current operand isskyrus paskutini ir iraso i current operand*/
    }
/*skaiciaus rodymo ekrane funkcija*/
    appendNumber(number){
    if(number==='.'&&this.currentOperand.includes('.')) return /*tikrina, kad taska padeti butu galima tik viena karta*/
    this.currentOperand = this.currentOperand.toString() + number.toString()/*prideda skaiciu prie dabartinio galo kad rasyt 11 pvz. toString() tam kad sudetu simbolius o ne skaicius*/
    }
/*operacijos pasirinkimo funkcija kai useris paspaudzia ant operacijos*/
    chooseOperation(operation){
        if (operation === '-' && this.currentOperand === '') {
            this.currentOperand = '-';
            this.updateDisplay();
            return;
        }

        if (this.currentOperand === '' && operation !== 'x^2' && operation !== 'sqrt' && operation !== 'sin' && operation !== 'cos') {
            if (operation === '-') {
                this.operation = '-';
                this.previousOperand = this.currentOperand;
                this.currentOperand = '';
                this.updateDisplay();
            }
            return;
        }

        if (operation === 'x^2' || operation === 'sqrt' || operation === 'sin' || operation === 'cos') {
            this.specialOperation(operation);
        } else {
            if (this.previousOperand !== '') {
                this.compute();
            }
            this.operation = operation;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
    
    }
    specialOperation(operation)
    {
        const current = parseFloat(this.currentOperand)
        let result

        switch (operation) {
            case 'x^2':
                result = current * current
                break
            case 'sqrt':
                if (current < 0) {
                    this.currentOperand = 'Undefined'
                    this.operation = "Error: sqrt of negative number"
                    this.updateDisplay()
                    return
                }
                result = Math.sqrt(current)
                break
            case 'sin':
                result = Math.sin(current)
                break
            case 'cos':
                result = Math.cos(current)
                break
            default:
                return
        }

        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
        this.updateDisplay()
    }
/*skaiciavimas*/
    compute(){
    let computation /*rezultatas*/
    const prev = parseFloat(this.previousOperand)/*previous kintamasis, skaiciaus formoje*/
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev)||isNaN(current)) return /*isNaN tikrina ar skaicius, jei kazkuris nera skaicius tuomet nevykdom kodo*/
    switch(this.operation)/*switch leidzia naudot daug if'u paprasciau*/
    {
        case '+':
            computation = prev + current
            break /*kad toliau neeit i kitus cases*/
        case '-':
            computation = prev - current
            break /*kad toliau neeit i kitus cases*/
        case '*':
            computation = prev * current
            break /*kad toliau neeit i kitus cases*/
        case '÷':
            if(current===0)
            {
                this.currentOperand = 'Undefined'
                this.operation = "Error: division by zero"
                this.previousOperand = ''
                this.updateDisplay()
                return;
                return
            }
            computation = prev / current
            break /*kad toliau neeit i kitus cases*/
        case 'x^y':
            computation = Math.pow(prev, current)
            break
        default:
            return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''

    }
/*raso skaiciu taisiklingai su kableliais*/
    getDisplayNumber(number)
    {
        const stringNumber = number.toString()
        if(stringNumber ==='Undefined') return
        const integerDigits = parseFloat(stringNumber.split('.')[0])/*paima pirma dali splito*/
        const decimalDigits = stringNumber.split('.')[1]/*paima antra dali splito*/
        
        let integerDisplay
        if(isNaN(integerDigits))
        {
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0} )
        }
        if(decimalDigits != null)
        {
            return integerDisplay.toString()+'.'+decimalDigits.toString()
        }
        else return integerDisplay.toString()
    }

/*atnaujint ekrana*/
    updateDisplay(){
     /*inner text paima teksta uzrasyta buttone, cia dabartinio operando tekstas pakeiciamas i tika ivesta*/
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    /*sujungia teksta kad rodyt pvz.: 6 +*/
    if(this.operation != null)
    {
        this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) +' '+ this.operation
    }else{
        this.previousOperandTextElement.innerText = ''
    }
    }
}



/*SelectorALL nes daug mygtuku*/
const numberButtons = document.querySelectorAll('[data-number]')/*atributas priskirtas visiems data-number mygtukams dokumente*/
const operationButtons = document.querySelectorAll('[data-operation]')/*tas pats operacijoms*/
/*selector nes vienas mygtukas*/
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


/*define skaiciuotuva priskiriant klasei reiksmes*/
const skaiciuotuvas = new Skaiciuotuvas(previousOperandTextElement, currentOperandTextElement)

/*funkcija kurie paspaudus kiekviena mygtuka paema to mygtuko reiksme ir paraso ja i ekrana*/
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        skaiciuotuvas.appendNumber(button.innerText)
        skaiciuotuvas.updateDisplay()
    })
})

/*funkcija kuri raso operacijas*/
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        skaiciuotuvas.chooseOperation(button.innerText)
        skaiciuotuvas.updateDisplay()
    })
})

/*skaiciavimo funkcija*/
equalsButton.addEventListener('click', button => {
    skaiciuotuvas.compute()
    skaiciuotuvas.updateDisplay()
})

/*allclear funkcija*/
allClearButton.addEventListener('click', button => {
    skaiciuotuvas.clear()
    skaiciuotuvas.updateDisplay()
})

/*DEL funkcija*/
deleteButton.addEventListener('click', button => {
    skaiciuotuvas.delete()
    skaiciuotuvas.updateDisplay()
})

