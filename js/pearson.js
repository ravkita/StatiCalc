window.addEventListener("DOMContentLoaded", () =>{
    const pearson = document.querySelector("#pearson");

    pearson.addEventListener("click", () => {
        document.querySelector(".pearsonSection").style.left = 0;
    });
    dataInput();
});

const pearsonBox = document.querySelector(".pearsonBox");
const pearsonN = document.querySelector(".pearsonN");
const pearsonBtn = document.querySelector("#pearsonBtn");
const pearsonTable = document.querySelector(".pearsonTable");
const pearsonY = document.querySelector(".pearsonY");
const pearsonX = document.querySelector(".pearsonX");
let l = 0;
let tabY = [];
let tabX = [];
function dataInput(){
    pearsonBtn.addEventListener("click", () =>{
        if(parseFloat(pearsonN.value) != ""){
            l = parseFloat(pearsonN.value);
            for(let i = 0; i<l; i++){
                const pearsonInput = document.createElement("input");
                const pearsonInput2 = document.createElement("input");
                pearsonY.appendChild(pearsonInput);
                pearsonX.appendChild(pearsonInput2);
                pearsonInput.className = "pearsonYValue";
                pearsonInput2.className = "pearsonXValue";
            }
        }else{
            alert("Wariacie wprowadź jakąś wartość");
        }
        valueInput();
    });
}
let currentPosition = 0;
function valueInput(){
    const pearsonYTab = document.querySelectorAll(".pearsonYValue");
    const pearsonXTab = document.querySelectorAll(".pearsonXValue");
    pearsonYTab.forEach((i) => {
        i.addEventListener("focusout", (e) =>{
            if(e.target.value != ''){
                currentPosition++;
                tabY.push(parseFloat(e.target.value));
                e.target.style.border = 0;
            }else{
                currentPosition--;
                e.target.style.border = "1px solid #000";
            }
            avgValue();
        });
    });
    pearsonXTab.forEach((i) => {
        i.addEventListener("focusout", (e) =>{
            if(e.target.value != ''){
                currentPosition++;
                tabX.push(parseFloat(e.target.value));
                e.target.style.border = 0;
            }else{
                currentPosition--;
                e.target.style.border = "1px solid #000";
            }
        });
    });

}
let avgx = 0;
let avgy = 0;
let sumX = 0;
let sumY = 0;
function avgValue(){
    if(currentPosition == (l*2)){
        for(let i = 0; i < l; i++){
            sumX = sumX + tabX[i];
            sumY = sumY + tabY[i];
        }
        avgx = Math.ceil(parseFloat(sumX)/l);
        avgy = Math.ceil(parseFloat(sumY)/l);
        const resultTxt = document.createElement("p");
        pearsonBox.appendChild(resultTxt);
        resultTxt.className = "resultText";
        resultTxt.innerHTML = `Średnia X wynosi <strong>${parseFloat(avgx)}</strong>, a średnia Y wynosi <strong>${parseFloat(avgy)}</strong>`;

        const sum = document.createElement("p");
        document.querySelector('.pearsonY').appendChild(sum);
        sum.innerHTML = sumY;
        sum.style.fontWeight = 700;

        const sum2 = document.createElement("p");
        document.querySelector('.pearsonX').appendChild(sum2);
        sum2.innerHTML = sumX;
        sum2.style.fontWeight = 700;
        minusAvg();
        minusAvgProduction();
        minusAvgPow();
        }
    }

let tabYAvg = [];
let tabXAvg = [];
function minusAvg(){
    for(let i = 0; i < l; i++){
        tabYAvg.push(tabY[i]-avgy);
        tabXAvg.push(tabX[i]-avgx);
        const pearsonYAvg = document.createElement("p");
        const pearsonXAvg = document.createElement("p");
        document.querySelector('.pearsonYAvg').appendChild(pearsonYAvg);
        document.querySelector('.pearsonXAvg').appendChild(pearsonXAvg);
        pearsonXAvg.innerHTML = tabXAvg[i].toFixed(2);
        pearsonYAvg.innerHTML = tabYAvg[i].toFixed(2);
    }
    const blank = document.createElement("p");
    document.querySelector('.pearsonYAvg').appendChild(blank);
    blank.innerHTML = "---";
    blank.style.fontWeight = 700;

    const blank2 = document.createElement("p");
    document.querySelector('.pearsonXAvg').appendChild(blank2);
    blank2.innerHTML = "---";
    blank2.style.fontWeight = 700;
}
let tabXYAvgProd = [];
let sumYXAvgProd = 0;
function minusAvgProduction(){
    for(let i = 0; i < l; i++){
        tabXYAvgProd.push(tabYAvg[i]*tabXAvg[i]);
        const pearsonXYAvgProd = document.createElement("p");
        document.querySelector('.pearsonYXAvgProd').appendChild(pearsonXYAvgProd);
        pearsonXYAvgProd.innerHTML = tabXYAvgProd[i].toFixed(2);
        sumYXAvgProd += tabXYAvgProd[i];
    }
    const pearsonXYAvgProd = document.createElement("p");
    document.querySelector('.pearsonYXAvgProd').appendChild(pearsonXYAvgProd);
    pearsonXYAvgProd.innerHTML = sumYXAvgProd.toFixed(2);
    pearsonXYAvgProd.style.fontWeight = 700;
}
let tabYAvgPow = [];
let tabXAvgPow = [];
let sumXAvgPow = 0;
let sumYAvgPow = 0;
function minusAvgPow(){
    for(let i = 0; i < l; i++){
        tabYAvgPow.push(Math.pow((tabY[i] - avgy), 2));
        tabXAvgPow.push(Math.pow((tabX[i] - avgx), 2));
        const pearsonYAvg = document.createElement("p");
        const pearsonXAvg = document.createElement("p");
        document.querySelector('.pearsonYAvgPow').appendChild(pearsonYAvg);
        document.querySelector('.pearsonXAvgPow').appendChild(pearsonXAvg);
        pearsonXAvg.innerHTML = tabXAvgPow[i].toFixed(2);
        pearsonYAvg.innerHTML = tabYAvgPow[i].toFixed(2);
        sumYAvgPow += parseFloat(tabYAvgPow[i]);
        sumXAvgPow += parseFloat(tabXAvgPow[i]);
    }
    const pearsonYAvgPow = document.createElement("p");
    document.querySelector('.pearsonYAvgPow').appendChild(pearsonYAvgPow);
    pearsonYAvgPow.innerHTML = sumYAvgPow.toFixed(2);
    pearsonYAvgPow.style.fontWeight = 700;

    const pearsonXAvgPow = document.createElement("p");
    document.querySelector('.pearsonXAvgPow').appendChild(pearsonXAvgPow);
    pearsonXAvgPow.innerHTML = sumXAvgPow.toFixed(2);
    pearsonXAvgPow.style.fontWeight = 700;
    factorPearson();
}

let r = 0;
let covxy = 0;
let sx = 0;
let sy = 0;
function factorPearson(){

    r = (sumYXAvgProd)/(Math.sqrt(sumXAvgPow*sumYAvgPow));
    covxy = sumYXAvgProd/l;
    sx = Math.sqrt(sumXAvgPow/l);
    sy = Math.sqrt(sumYAvgPow/l);
    const resultTxt = document.createElement("p");
    pearsonBox.appendChild(resultTxt);
    resultTxt.className = "resultText";
    resultTxt.innerHTML = `Współczynnik korelacji liniowej Pearsona <strong>r=${r.toFixed(3)}</strong><br />Kowariancja <strong>covxy=${covxy.toFixed(2)}</strong><br />Wariancja X <strong>S(x)=${sx.toFixed(2)}</strong>, wariancja Y <strong>S(y)=${sy.toFixed(2)}</strong><br /> `;
    regressionFunction();
}

let ax = 0;
let ay = 0;
let bx = 0;
let by = 0;
function regressionFunction(){
    ax = covxy/(Math.pow(sx, 2));
    ay = covxy/(Math.pow(sy, 2));
    bx = avgx-(ax*avgy);
    by = avgy-(ay*avgx);
    const resultTxt = document.createElement("p");
    pearsonBox.appendChild(resultTxt);
    resultTxt.className = "resultText";
    resultTxt.innerHTML = `Zmienna <strong>ax=${ax.toFixed(4)}</strong><br />Zmienna <strong>ay=${ay.toFixed(4)}</strong><br />Zmienna <strong>bx=${bx.toFixed(4)}</strong><br /> Zmienna <strong>by=${by.toFixed(4)}</strong><br /> Funkcja regresji zmiennej zależnej X: <strong>x=${ax.toFixed(4)}Y+${bx.toFixed(4)}</strong><br /> Funkcja regresji zmiennej zależnej Y: <strong>y=${ay.toFixed(4)}X+${by.toFixed(4)}</strong>`;

}