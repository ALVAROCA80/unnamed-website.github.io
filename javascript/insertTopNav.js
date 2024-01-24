fetch("topNav.html")
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);
})

document.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    const topNav = document.querySelector(".topNav");
    const height_offset = header.offsetHeight;
    const scrolled_Distance = Math.abs(document.body.getBoundingClientRect().top);
    if (scrolled_Distance >= height_offset) {
        topNav.classList.add("fixed");
        header.style.marginBottom = `${header.offsetHeight}px`;
    } else {
        topNav.classList.remove("fixed");
        header.style.marginBottom = "0";
    }
})