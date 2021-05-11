//TILE EVENTS
var parser = new DOMParser();


window.addEventListener("DOMContentLoaded", () =>{
    const analyst = document.querySelector("#analyst");

    analyst.addEventListener("click", () => {
        document.querySelector(".analystSection").style.left = 0;
    });
});

const dataBtn = document.querySelector(".dataBtn");


dataBtn.addEventListener("click", ()=>{
    pobieranieDanych();
    iloscPrzedzialowKlasowych();
    wyznaczanieRozpietosciPrzedzialowych();
    liczbenośćWDanymPrzedziale();
    srodekPrzedzialuKlasowego();

});

let n = 0;
let xmax = 0;
let xmin = 0;
let k = 0;
let h = 0;
let s2 = 0;
let s = 0;
let vs = 0;
const results = document.querySelector(".results");
function tworzenieNaglowkow(naglowek, result){
    const header = document.createElement("p");
    results.appendChild(header);
    header.className = "resultHeader";
    header.innerHTML = naglowek;

    const resultTxt = document.createElement("p");
    results.appendChild(resultTxt);
    resultTxt.className = "resultText";
    resultTxt.innerHTML = result;
}
let tabel;
function tworzenieTabeli(){
    tabel = document.createElement("div");
    results.appendChild(tabel);
    tabel.className = "resultTable";
}

function pobieranieDanych(){
    n = document.querySelector('[name="n"]').value;
    xmax = document.querySelector('[name="xmax"]').value;
    xmin = document.querySelector('[name="xmin"]').value;
}

function iloscPrzedzialowKlasowych(){
    k = Math.round(Math.sqrt(n));
    tworzenieNaglowkow("Wyznaczanie ilości przedziałów klasowych", "k = <strong>√n</strong> = "+k);
}

let xi = [];
function wyznaczanieRozpietosciPrzedzialowych(){
    h = Math.ceil(((xmax - xmin)/k)*10)/10;
    tworzenieNaglowkow("Wyznaczanie rozpiętości przedziału klasowego", "h = <strong>(xmax-xmin)/k</strong> = "+h);
    tworzenieTabeli();
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `xi`;
    xi.push(xmin);
    for(let i = 1; i<=k; i++){
        let temp = xi[i-1];
        xi.push(Math.ceil((temp = parseFloat(temp) + parseFloat(h))*10)/10);
        const cell = document.createElement("span");
        col.appendChild(cell);
        cell.innerHTML = `<${xi[i-1]} ; ${xi[i]})`;
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = "---";
}
let niTab = [];
function liczbenośćWDanymPrzedziale(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `ni`;
    const col2 = document.createElement("div");
    tabel.appendChild(col2);
    const cell2 = document.createElement("span");
    cell2.className = "tabHeader";
    col2.appendChild(cell2);
    cell2.innerHTML = `nsk`;
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        const ni = document.createElement("input");
        ni.classList = "tableInput"
        col.appendChild(cell);
        cell.appendChild(ni);
    }
    const tableInput = document.querySelectorAll(".tableInput");
    let currentPosition = 0;
        tableInput.forEach((i)=>{
            i.addEventListener("focusout", (e)=>{
                if(e.target.value != ''){
                    currentPosition++;
                    niTab.push(e.target.value);
                    e.target.style.border = 0;
                }else{
                    currentPosition--;
                    e.target.style.border = "1px solid #000";
                }

                if(currentPosition == k){
                    let tempN = 0;
                    let suma = 0;
                    for(let j = 1; j<=k; j++){
                        suma = suma + parseInt(niTab[j-1]);
                        const cell = document.createElement("span");
                        col2.appendChild(cell);
                        if(j == 1){
                            tempN = niTab[j-1];
                            cell.innerHTML = tempN;
                        }else{
                            tempN = parseInt(tempN) + parseInt(niTab[j-1]);
                            cell.innerHTML = tempN;
                        }
                    }
                        tabel.style.paddingLeft = "750px";
                        nieznaneRownania();
                        srednia();
                    const cell3 = document.createElement("span");
                    cell3.className = "tabSum";
                    col.appendChild(cell3);
                    cell3.innerHTML = Math.ceil(suma*100)/100;

                    const cell4 = document.createElement("span");
                    cell4.className = "tabSum";
                    col2.appendChild(cell4);
                    cell4.innerHTML = "---";
                }
        });
    });

}
let x0i = [];
function srodekPrzedzialuKlasowego(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `xoi`;
    xi.push(xmin);
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        x0i.push(Math.ceil(((parseFloat(xi[i-1])+parseFloat(xi[i]))/2)*100)/100);
        cell.innerHTML = x0i[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = "---";
}
let x0ini = [];
function nieznaneRownania(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `xoi*ni`;
    let suma = 0;
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        x0ini.push(Math.ceil((parseFloat(x0i[i-1])*parseFloat(niTab[i-1]))*100)/100);
        suma = suma + x0ini[i-1];
        cell.innerHTML = x0ini[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = Math.ceil(suma*100)/100;
}
let xsrednia = 0;
function srednia(){
    let sumnax0ini = 0;
    for(let i = 1; i<=k; i++){
        sumnax0ini =  sumnax0ini + x0ini[i-1];
    }
    xsrednia = (1/n)*(Math.ceil(sumnax0ini*100)/100);
    tworzenieNaglowkow("Średnia", "x = <strong>1/n*(xoi*ni)</strong> = "+xsrednia);
    odjemowanieSredniej();
    odjemowanieSredniejKwadrat();
    odjemowanieSredniejKwadratNi();
    odjemowanieSredniejSzescian();
    odjemowanieSredniejSzescianNi();
    odjemowanieSredniejDoCzwartej();
    odjemowanieSredniejDoCzwartejNi();
    odchylenieStandardowe();

}
let xisrednia = [];
function odjemowanieSredniej(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `xoi-srednia(x)`;
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        xisrednia.push(Math.ceil((parseFloat(x0i[i-1])-parseFloat(xsrednia))*100)/100);
        cell.innerHTML = xisrednia[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = "---";
}
let xisredniakwadrat = [];
function odjemowanieSredniejKwadrat(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `[xoi-srednia(x)]^2`;
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        xisredniakwadrat.push(Math.ceil(Math.pow(Math.ceil((parseFloat(x0i[i-1])-parseFloat(xsrednia))*100)/100, 2)*100)/100);
        cell.innerHTML = xisredniakwadrat[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = "---";
}

let xisredniakwadratni = [];
let sumasrednikwadratni = 0;
function odjemowanieSredniejKwadratNi(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `([xoi-srednia(x)]^2)*ni`;

    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        xisredniakwadratni.push(Math.ceil((Math.pow(Math.ceil((parseFloat(x0i[i-1])-parseFloat(xsrednia))*100)/100, 2)*niTab[i-1])*100)/100);
        cell.innerHTML = xisredniakwadratni[i-1];
        sumasrednikwadratni = sumasrednikwadratni + xisredniakwadratni[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = Math.ceil(sumasrednikwadratni*100)/100;
}

let xisredniaszescian = [];
function odjemowanieSredniejSzescian(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `[xoi-srednia(x)]^3`;
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        xisredniaszescian.push(Math.ceil(Math.pow(Math.ceil((parseFloat(x0i[i-1])-parseFloat(xsrednia))*100)/100, 3)*100)/100);
        cell.innerHTML = xisredniaszescian[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = "---";
}

let xisredniaszescianni = [];
function odjemowanieSredniejSzescianNi(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `([xoi-srednia(x)]^3)*ni`;
    let suma = 0;
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        xisredniaszescianni.push(Math.ceil((Math.pow(Math.ceil((parseFloat(x0i[i-1])-parseFloat(xsrednia))*100)/100, 3)*niTab[i-1])*100)/100);
        cell.innerHTML = xisredniaszescianni[i-1];
        suma = suma + xisredniaszescianni[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = Math.ceil(suma*100)/100;
}

let xisredniaszedoczwartej = [];
function odjemowanieSredniejDoCzwartej(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `[xoi-srednia(x)]^4`;
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        xisredniaszedoczwartej.push(Math.ceil(Math.pow(Math.ceil((parseFloat(x0i[i-1])-parseFloat(xsrednia))*100)/100, 4)*100)/100);
        cell.innerHTML = xisredniaszedoczwartej[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = "---";
}

let xisredniaszedoczwartejni = [];
function odjemowanieSredniejDoCzwartejNi(){
    const col = document.createElement("div");
    tabel.appendChild(col);
    const cell = document.createElement("span");
    cell.className = "tabHeader";
    col.appendChild(cell);
    cell.innerHTML = `([xoi-srednia(x)]^4)*ni`;
    let suma = 0;
    for(let i = 1; i<=k; i++){
        const cell = document.createElement("span");
        col.appendChild(cell);
        xisredniaszedoczwartejni.push(Math.ceil((Math.pow(Math.ceil((parseFloat(x0i[i-1])-parseFloat(xsrednia))*100)/100, 4)*niTab[i-1])*100)/100);
        cell.innerHTML = xisredniaszedoczwartejni[i-1];
        suma = suma + xisredniaszedoczwartejni[i-1];
    }
    const cell2 = document.createElement("span");
    cell2.className = "tabSum";
    col.appendChild(cell2);
    cell2.innerHTML = Math.ceil(suma*100)/100;
}

function odchylenieStandardowe(){
    s2 = Math.ceil((1/n)*sumasrednikwadratni*100)/100;
    s = Math.ceil(Math.sqrt(s2)*100)/100;
    tworzenieNaglowkow("Odchylenie standardowe", `S^2 = <strong>1/n*(xoi-srednia(x))^2*ni</strong> = ${s2}, <br />S = <strong>√S^2</strong> = ${s}`);
    wspolczynnikZmiennosci();
    typowyObszarZmiennosci();
}

function wspolczynnikZmiennosci(){
    vs = Math.ceil(((s/xsrednia)*100)*100)/100;
    tworzenieNaglowkow("Współczynnik zmienności", `Vs = <strong>s/x*100%</strong> = ${vs}%`);
}
function typowyObszarZmiennosci(){
    tworzenieNaglowkow("Typowy obszar zmienności", `${Math.floor((parseFloat(xsrednia) - parseFloat(s))*100)/100} < xtyp < ${Math.floor((parseFloat(xsrednia) + parseFloat(s))*100)/100}`);
}