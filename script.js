let a = ''; // first number
let b = ''; // second number
let sign = ''; // знак операции 
let finish = false;

const digit = ['0','1','2','3','4','5','6','7','8','9','.'];
const action = ['-','+','X','/'];

// экран 
const out = document.querySelector('.calc-screen p');
function clearAll(){
    a = ''; // first number
    b = ''; // second number
    sign = ''; // знак операции 
    finish = false;
    out.textContent = '0';
}

document.querySelector('.ac').onclick = clearAll;
document.querySelector('.buttons').onclick = (event) =>{
    //  нажата не кнопка 
    if(!event.target.classList.contains('btn')) return;
    //  нажата кнопка ac
    if(event.target.classList.contains('ac')) return;

    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;
    // если нажата кнопка 0-9 или .
    if (digit.includes(key)) {
        if (b ==='' && sign === ''){
            // добавляем в первую переменную
            a+=key;
            console.log(a,b,sign);
            out.textContent = a;
        } else if (a!=="" && b!== '' && finish) {
            b = key;
            finish = false;
            out.textContent = b;

        }else {
            //  добавляем во вторую переменную
            b+=key;
            out.textContent = b;
        }
        console.log(a,b,sign);
        return
    }

    // если нажата клавиша  + - * /
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(a,b,sign);
        return;
    }
    //  нажата = 
    if ( key === '='){
        
        if (b === '') b = a;
        switch(sign){
            case "+":
                a = (+a) + (+b);
                break;
            case '-':
                a = a - b;
                break
            case "X":
                a = a * b;
                break
            case "/":
                if( b === '0'){
                    out.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a / b;
                break
            
        }
    
        finish = true;
        out.textContent = a;
        console.log(a,b,sign);
    }
    // нажали на процент
    if (key === '%'){
        try{
            // добавил eval, чтоб не идти через switch case
            a = eval((+a) + sign +((a * b)/100));
            b = '';
        }catch {
            a = 'Error'
        }
    }
    out.textContent = a;
    // нажали +/-
    if (key === '+/-'){
        if (a==='' && b ===''){
            a = '-'
        }else if(b==='' && sign ===''){
            // первое значение добовляет и убирает минус
            if (!a.indexOf('-')){
                console.log('+');
                let arr = a.split('-');
                console.log(arr);
                let str = arr.join('')
                console.log(str);
                a = str
            }else {
                a = '-'+a
            }
            
        }else {
            // второе значение и после равно, добавляет и убирает минус
            if (!out.textContent.indexOf('-')){
                console.log('+');
                let arr = a.split('-');
                console.log(arr);
                let str = arr.join('')
                console.log(str);
                a = str
            }else {
                a = '-'+ out.textContent
            }
           
        }
    }
    out.textContent = a
}