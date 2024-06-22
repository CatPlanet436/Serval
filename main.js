if (localStorage.money === undefined)
    localStorage.money = 0;
if (localStorage.moneyPerClick === undefined)
    localStorage.moneyPerClick = 1;
let clickDiv = 1; //0 - 8
let ids = ["div0", "div1", "div2", "div3", "div4", "div5", "div6", "div7", "div8"]

let typeClick = 1;
let date = Date.now();
let dateText = Date.now();
function Click(divID) {
    if (divID === clickDiv) {
        timeClick();

        if (typeClick === 1) {
            localStorage.money = Number(localStorage.money) + Number(localStorage.moneyPerClick);
            document.getElementById(ids[clickDiv]).style.background = "#ca0000";

            let typeDiv = random(1, 10);
            if (typeDiv >= 1 && typeDiv <= 9) {
                clickDiv = random(0, 8);
                if (clickDiv === divID) {
                    clickDiv -= 1;
                    if (clickDiv < 0) {
                        clickDiv = 8;
                    }
                }
                document.getElementById(ids[clickDiv]).style.background = "limegreen";
                typeClick = 1;
            }
            else if (typeDiv === 10) {
                clickDiv = random(0, 8);
                if (clickDiv === divID) {
                    clickDiv -= 1;
                    if (clickDiv < 0) {
                        clickDiv = 8;
                    }
                }
                document.getElementById(ids[clickDiv]).style.background = "#ff9f00";
                typeClick = 2;
            }
        }
        else {
            localStorage.money = Number(localStorage.money) + Number(localStorage.moneyPerClick);
            document.getElementById(ids[clickDiv]).style.background = "limegreen";
            typeClick = 1;
        }
    }
    else {
        localStorage.money = Number(localStorage.money) - Number(localStorage.moneyPerClick)
        if (Number(localStorage.money) < 0) {
            localStorage.money = 0;
        }
    }
    document.getElementById("div1").innerHTML = localStorage.money;
}

let lucky = random(1, 18);
let lvlUPID_S = ["up0", "up1", "up2", "up3", "up4", "up5", "up6", "up7", "up8", "up9",
    "up10", "up11", "up12", "up13", "up14", "up15", "up16", "up17"];

document.getElementById(lvlUPID_S[lucky - 1]).style.backgroundColor = "#FF0000";
document.getElementById(lvlUPID_S[lucky - 1]).innerHTML = (logorifm(25, lucky - 1)) + "x" + (logorifm(2, lucky - 1) * 1.5);

function lvlUP(divID) {

    if (Number(localStorage.money) >= logorifm(25, divID)) {
        if (divID === lucky) {
            localStorage.money = Number(localStorage.money) - logorifm(25, divID)
            localStorage.moneyPerClick = Number(localStorage.moneyPerClick) + logorifm(2, divID) * 1.5
            document.getElementById("div1").innerHTML = localStorage.money;
        }
        else {
            localStorage.money = Number(localStorage.money) - logorifm(25, divID)
            localStorage.moneyPerClick = Number(localStorage.moneyPerClick) + logorifm(2, divID)
            document.getElementById("div1").innerHTML = localStorage.money;
        }
        document.getElementById(lvlUPID_S[lucky - 1]).style.backgroundColor = "#d34d17";
        document.getElementById(lvlUPID_S[lucky - 1]).innerHTML = (logorifm(25, lucky - 1)) + "x" + (logorifm(2, lucky - 1));

        lucky = random(1, 18);
        document.getElementById(lvlUPID_S[lucky - 1]).style.backgroundColor = "#FF0000";
        document.getElementById(lvlUPID_S[lucky - 1]).innerHTML = (logorifm(25, lucky - 1)) + "x" + (logorifm(2, lucky - 1) * 1.5);
    }
    else {
        alert("Недостаточно монет");
    }
}

function timeClick() {
    date -= Date.now();
    if (date * -1 <= 2000) {
        buttonTimeS.push(date * -1)
        if (buttonTimeS.length > labelsTimeS.length) {
            labelsTimeS.push("мс")
        }
    }
    if (buttonTimeS.length > 50) {
        buttonTimeS.shift();
    }
    if (labelsTimeS.length > 50) {
        labelsTimeS.shift();
    }
    date = Date.now();
    dataTime()
}


let labelsTimeS = [];
let buttonTimeS = [];
let textTimeS = [];
let myChart = null;
function dataTime() {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (myChart != null) {
        myChart.destroy()
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labelsTimeS,
            datasets: [
                {
                    label: 'Кнопки',
                    data: buttonTimeS,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },{
                    label: 'Клавиши',
                    data: textTimeS,
                    backgroundColor: 'rgba(99,130,255,0.2)',
                    borderColor: 'rgb(99,135,255)',
                    borderWidth: 1,
                }
            ],
        },
        options: {
            layout: {
                padding: 100
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function logorifm(num, num2) {
    for (let i = num2; i > 0; i--)
        num *= 2;
    return num;
}

let key = "a";
const keys = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f",
    "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
addEventListener('keydown', listener => {
    if (key === listener.key) {
        localStorage.money = Number(localStorage.money) + Number(localStorage.moneyPerClick);
        document.getElementById("div1").innerHTML = localStorage.money;
        key = keys[random(0, keys.length - 1)]
        document.getElementById("div0").innerHTML = key;


        dateText -= Date.now();
        if (dateText * -1 <= 2000) {
            textTimeS.push(dateText * -1)
            if (textTimeS.length > labelsTimeS.length) {
                labelsTimeS.push("мс")
            }
        }
        if (labelsTimeS.length > 50) {
            labelsTimeS.shift();
        }
        if (textTimeS.length > 50) {
            textTimeS.shift();
        }
        dateText = Date.now();
        dataTime()
    }
});
