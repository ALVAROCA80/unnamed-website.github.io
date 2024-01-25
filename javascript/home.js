let promociones;
fetch("../javascript/promociones.json").then((res)=> {
    res.json().then((res)=> {
        promociones = res;
        shuffle("promo", 0)
    })
})

let current_Promotion = 0;
function shuffle(name, move) {
    current_Promotion = (current_Promotion+move)%promociones.length;
    if (current_Promotion < 0)
        current_Promotion = promociones.length+current_Promotion;
    let div = document.getElementsByName(name)[0];
    for (let child of div.children) {
        let name = child.tagName.toUpperCase();
        if (name == "IMG") {
            child.src = promociones[current_Promotion]["img"];
        } else if (name == "P") {
            child.innerText = promociones[current_Promotion]["name"];
        }
    }
}
