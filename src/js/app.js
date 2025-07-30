//Mortgage Calculator @By FredArt.dev #Frontend-Mentor #First-project
const type = document.querySelectorAll('.type input');
const Reset = document.querySelector('.Reset');
const BtnCalculate = document.querySelector('.BtnCalculate');
const Container = document.querySelector('.container');
let errMsg = [...document.querySelectorAll('.container .error')];
let mortgageAmount = document.getElementById('mortgageAmount');
let mortgageTerm = document.getElementById('mortgageTerm');
let mortgageInterest = document.getElementById('mortgageInterest');
let Repayment = document.querySelector('#Repayment');
let InterestOnly = document.querySelector('#InterestOnly');
let monthlyReplayment = document.querySelector('.monthlyReplayment');
let totalAmount = document.querySelector('.totalAmount');
let mortgageType = '';


type.forEach(e=> e.addEventListener('change',()=>{
    if(Repayment.checked)
    {
        mortgageType = 'Repayment';
        Repayment.parentElement.classList.add('onChecked');
        InterestOnly.parentElement.classList.remove('onChecked');
    }
    if(InterestOnly.checked)
    {
        mortgageType = 'InterestOnly';
        InterestOnly.parentElement.classList.add('onChecked');
        Repayment.parentElement.classList.remove('onChecked');
    }
}))


BtnCalculate.addEventListener('click', ()=>{
    let mA = mortgageAmount.value;
    let mT = mortgageTerm.value;
    let mI = mortgageInterest.value;
    let mR = 0;
    let mtP = 0;
    document.body.classList.add('errMode');
    if(mA === '' && mT === '' && mI === '' && mortgageType === '')
    {
       errMsg.forEach(e => {e.classList.add('Invalid'); e.innerHTML = 'This field is required !'});
       return;
    }
    if(mA && mT && mI && mortgageType === '')
    {
        errMsg.forEach(e => { e.classList.add('Invalid'); e.innerHTML = ''; errMsg[3].innerHTML = 'This field is required ';});   
        document.body.classList.remove('errMode');
        return;
    }
    if(mA < 1 || mT < 1 || mI < 1 && mortgageType != '')
    {
        errMsg.forEach(e => { e.classList.add('Invalid'); e.innerHTML = "Positive value !"; errMsg[3].innerHTML = ''});   
        return;
    }
    else
    {
        Container.classList.add('Valid');
        document.body.classList.remove('errMode');
        errMsg.forEach(e => e.classList.remove('Invalid'));
        if(mortgageType === 'Repayment')
        {
            mR = getMonthlyRepayments(mA, mI, mT);
            monthlyReplayment.textContent = `£ ${mR.toFixed(2)}`;
            mtP = getTotalRepayments(mR, mT);
            totalAmount.textContent = `£ ${mtP.toFixed(2)}`;
        }

        if(mortgageType === 'InterestOnly')
        {
            mR = getMonthlyRepayments(mA, mI, mT);
            monthlyReplayment.textContent = `£ ${mR.toFixed(2)}`;
            mtP = getTotalRepayments(mR, mT);
            let Mi = getTotalInterest(mtP, mA);
            totalAmount.textContent = `£ ${Mi.toFixed(2)}`;
        }
    }

});

const getMonthlyRepayments = (mAmount, AnInterest, years) => { 
    
    let r = (AnInterest / 100) / 12;
    
    let n = years * 12;
    
    let M = mAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    return M;
}


const getTotalRepayments = (M, years) => {
    let n = years * 12;
    return M * n;
}

const getTotalInterest = (M, n) => {
    return M - n;
}


Reset.addEventListener('click',() => clearAll());


const clearAll = ()=>{
    mortgageType = '';
    mortgageAmount.value = '';
    mortgageTerm.value = '';
    mortgageInterest.value = '';
    monthlyReplayment.textContent = `£ 0`;
    totalAmount.textContent = `£ 0`;
    Repayment.checked = false;
    Repayment.parentElement.classList.remove('onChecked');
    InterestOnly.checked = false;
    InterestOnly.parentElement.classList.remove('onChecked');
    Container.classList.remove('Valid');
}