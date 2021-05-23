window.addEventListener("DOMContentLoaded", () =>{
    const trend = document.querySelector("#trend");

    trend.addEventListener("click", () => {
        document.querySelector(".trendSection").style.left = 0;
    });
    tDataInput();
});

const trendBox = document.querySelector(".trendBox");
const trendN = document.querySelector(".trendN");
const trendBtn = document.querySelector("#trendBtn");
const trendTable = document.querySelector(".trendTable");
const trendY = document.querySelector(".trendY");
const trendX = document.querySelector(".trendX");
let m = 0;
let tTabY = [];
let tTabT = [];
function tDataInput(){
    trendBtn.addEventListener("click", () =>{
        if(parseFloat(trendN.value) != ""){
            m = parseFloat(trendN.value);
            for(let i = 0; i<m; i++){
                const trendInput = document.createElement("input");
                const trendInput2 = document.createElement("input");
                trendY.appendChild(trendInput);
                trendX.appendChild(trendInput2);
                trendInput.className = "trendYValue";
                trendInput2.className = "trendXValue";
            }
        }else{
            alert("Wariacie wprowadź jakąś wartość");
        }
        tValueInput();
    });
}
let tcurrentPosition = 0;
function tValueInput(){
    const trendYTab = document.querySelectorAll(".trendYValue");
    const trendXTab = document.querySelectorAll(".trendXValue");
    trendYTab.forEach((i) => {
        i.addEventListener("focusout", (e) =>{
            if(e.target.value != ''){
                tcurrentPosition++;
                tTabY.push(parseFloat(e.target.value));
                e.target.style.border = 0;
            }else{
                tcurrentPosition--;
                e.target.style.border = "1px solid #000";
            }
            prod();
            tPow();
        });
    });
    trendXTab.forEach((i) => {
        i.addEventListener("focusout", (e) =>{
            if(e.target.value != ''){
                tcurrentPosition++;
                tTabT.push(parseFloat(e.target.value));
                e.target.style.border = 0;
            }else{
                tcurrentPosition--;
                e.target.style.border = "1px solid #000";
            }
        });
    });

}

let prodTab = [];
let prodSum = 0;
let tSum = 0;
let ySum = 0;
function prod(){
    if(tcurrentPosition == m*2){
        for(let i = 0; i<m; i++){
            tSum += tTabT[i];
            ySum += tTabY[i];
            prodTab[i] = tTabT[i]*tTabY[i];
            prodSum += prodTab[i];
            const trendProd = document.createElement("p");
            document.querySelector('.trendProd').appendChild(trendProd);
            trendProd.innerHTML = prodTab[i].toFixed(2);
        }
        tMinusTAvg();
    }
}

let tPowTab = [];
let powSum = 0;
function tPow(){
    if(tcurrentPosition == m*2){
        for(let i = 0; i<m; i++){
            tPowTab[i] = Math.pow(tTabT[i], 2);
            powSum += tPowTab[i];
            const trendPow = document.createElement("p");
            document.querySelector('.trendPow').appendChild(trendPow);
            trendPow.innerHTML = tPowTab[i].toFixed(2);
        }
        trendFunction();
    }
}

let a0 = 0;
let a1 = 0;
let trendFTab = [];
function trendFunction(){
    a1 = ((m*prodSum)-(ySum*tSum))/((m*powSum)-Math.pow(tSum, 2));
    a0 = (ySum-(a1*tSum))/m;
    for(let i = 0; i<m; i++){
        trendFTab[i] = (a0+(a1*tTabT[i])).toFixed(2);
        const trendF = document.createElement("p");
        document.querySelector('.trendF').appendChild(trendF);
        trendF.innerHTML = trendFTab[i];
    }
    prodMinusF();
    const resultTxt = document.createElement("p");
    trendBox.appendChild(resultTxt);
    resultTxt.className = "resultText";
    resultTxt.innerHTML = `a1 = <strong>${a1.toFixed(4)}</strong><br />a0 = <strong>${a0.toFixed(4)}</strong>`
}
let prodFTab = [];
let powProdFTab = [];
let powProdFSum = 0;
function prodMinusF(){
    for(let i = 0; i<m; i++){
        prodFTab[i] = tTabY[i] - trendFTab[i];
        powProdFTab[i] = Math.pow((tTabY[i] - trendFTab[i]), 2);
        powProdFSum += powProdFTab[i];
        const prodF = document.createElement("p");
        document.querySelector('.prodF').appendChild(prodF);
        prodF.innerHTML = prodFTab[i].toFixed(2);
        const powProdF = document.createElement("p");
        document.querySelector('.powProdF').appendChild(powProdF);
        powProdF.innerHTML = powProdFTab[i].toFixed(4);
    }
}

let tMinusTab = [];
let tMinusSum = [];
let tAvg = 0;
function tMinusTAvg(){
    tAvg = tSum/m;
    for(let i = 0; i<m; i++){
        tMinusTab[i] = Math.pow((tTabT[i] - tAvg), 2);
        tMinusSum += tMinusTab[i];
        const tMinusT = document.createElement("p");
        document.querySelector('.tMinusTAvg').appendChild(tMinusT);
        tMinusT.innerHTML = tMinusTab[i].toFixed(4);
    }
}