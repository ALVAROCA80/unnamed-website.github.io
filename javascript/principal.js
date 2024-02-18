let promotions;

function cleanse_Old_Dates() {
    var index = 0;
    var remove = [];
    for (let data of promotions) {
        if (data["until"] < new Date()) 
            remove.push(index);
        index++;
    }
    for (let index of remove) {
        promotions.splice(index, 1);
    }
}

fetch("javascript/promociones.json").then((res)=> {
    res.json().then((res)=> {
        for(let data of res) {
            data["until"] = new Date(data["until"]);
        }
        promotions = res;
        cleanse_Old_Dates();
        shuffle(0);
        setInterval(updateText, 1000);
    })
})

let current_Promotion = 0;
let current_Date;
function shuffle(move) {
    var next_Date; //to update date when div has faded out
    cleanse_Old_Dates();
    
    //next promotion with wrap around
    current_Promotion = (current_Promotion+move)%promotions.length;
    if (current_Promotion < 0)
        current_Promotion = promotions.length+current_Promotion;
    next_Date = promotions[current_Promotion]["until"];

    var div = document.querySelector(".carrousel");
    div.classList.add("fade-out"); //start fade out animation

    //disable buttons
    for (let button of document.getElementsByClassName("car-button"))
        button.disabled = true;

    //in half a second change and fade in content
    setTimeout(function(div, date) {
        //update img, text, and time
        if (promotions.length > 0) {
            document.querySelector(".carrousel-img").src = promotions[current_Promotion]["img"];
            document.querySelector(".carrousel-name").innerText = promotions[current_Promotion]["name"];
            current_Date = date;
            updateText()
        }
        div.classList.remove("fade-out"); //start fade in
        //enable buttons
        for (let button of document.getElementsByClassName("car-button"))
            button.disabled = false;
    },500, div, next_Date);
}

function addLeadingZeros(numDigits, number) {
    //function to keep time numbers with always two digits
    if (!(typeof number === "number") || isNaN(number)) 
        number = 0;
    var ret = "" + number;
    while (ret.length < numDigits) ret = "0" + ret;
    return ret;
}

function millis_To_Time_Str(millis) {
    var sec = millis/1000;
    var min = sec/60;
    var hour = min/60;
    var days = hour/24;
    sec = addLeadingZeros(2,Math.floor(sec%60));
    min = addLeadingZeros(2,Math.floor(min%60));
    hour = addLeadingZeros(2,Math.floor(hour%24));
    days = addLeadingZeros(2,Math.floor(days));
    return days+":"+hour+":"+min+":"+sec;
}

function updateText() {
    const txt = document.querySelector(".carrousel-time");
    var now = new Date();
    var dist = current_Date - now;
    txt.innerText = millis_To_Time_Str(dist);
}

let second_Div;

function set_Second_Div() {
    second_Div = document.getElementById("second")
}

function change_First_Grow_Size(new_Size) {
    second_Div.style.setProperty("--first-box-size", new_Size);
}
