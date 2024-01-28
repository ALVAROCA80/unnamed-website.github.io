replace_Tag_HTML(document.querySelector("script#replace_with_navbar"), "topNav.html")

document.addEventListener("scroll", function () {
    const header = document.querySelector(".beforeNav");
    const topNav = document.querySelector(".topNav");
    const height_offset = header.offsetHeight;
    const scrolled_Distance = Math.abs(document.body.getBoundingClientRect().top);
    if (scrolled_Distance >= height_offset) {
        topNav.classList.add("fixed");
        header.style.marginBottom = `${topNav.offsetHeight}px`;
    } else {
        topNav.classList.remove("fixed");
        header.style.marginBottom = "0";
    }
})