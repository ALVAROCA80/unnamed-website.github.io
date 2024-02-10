let promotions = [];
fetch("javascript/promociones.json").then((res)=> {
    res.json().then((res)=> {
        for (let dict of res) {
            let date = new Date(dict["until"]);
            if (date > new Date()) {
                dict["until"] = date;
                promotions.push(dict);
            }
        }
        shuffle(0)
        
    })
})

let current_Promotion = 0;
let current_Date;
function shuffle(move) {
    var invalid_Date = true;
    var next_Date;
    while (promotions.length > 0 && invalid_Date) {
        current_Promotion = (current_Promotion+move)%promotions.length;
        if (current_Promotion < 0)
            current_Promotion = promotions.length+current_Promotion;
        next_Date = promotions[current_Promotion]["until"];
        invalid_Date = next_Date < new Date();
        if (invalid_Date) {
            promotions.splice(current_Promotion, 1);
            current_Promotion--;
        }
    }
    var div = document.querySelector(".carrousel");
    div.classList.add("fade-out");
    for (let button of document.getElementsByClassName("car-button"))
        button.disabled = true;
    setTimeout(function(div, date) {
        if (current_Promotion.length>0) {
            document.querySelector(".carrousel-img").src = promotions[current_Promotion]["img"];
            document.querySelector(".carrousel-name").innerText = promotions[current_Promotion]["name"];
            current_Date = date;
            updateText()
        }
        div.classList.remove("fade-out");
        for (let button of document.getElementsByClassName("car-button"))
            button.disabled = false;
    },500, div, next_Date);
}

function addLeadingZeros(numDigits, number) {
    var ret = "" + number;
    while (ret.length < numDigits) ret = "0" + ret;
    return ret;
}

function millisToStr(millis) {
    var sec = millis/1000;
    var min = sec/60;
    var hour = min/60;
    sec = addLeadingZeros(2,Math.floor(sec%60));
    min = addLeadingZeros(2,Math.floor(min%60));
    hour = addLeadingZeros(2,Math.floor(hour));
    return hour+":"+min+":"+sec
}
window.addEventListener("load", function () {
    setInterval(updateText, 1000);
})

function updateText() {
    const txt = document.querySelector(".carrousel-time");
    var now = new Date();
    var dist = current_Date - now;
    txt.innerText = millisToStr(dist);
}    