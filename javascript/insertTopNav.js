replace_Tag_HTML(
    document.querySelector("script#replace_with_navbar"),
    "es/topNav.html",
    setBeforeNavHeight
)

function setBeforeNavHeight() {
    const before = document.querySelector(".beforeNav");
    if (before) {
        const topNav = document.querySelector(".topNav");
        topNav.style.setProperty("--beforeNav-height", `${before.offsetHeight}px`);
    }
}
window.addEventListener("resize", setBeforeNavHeight);

document.addEventListener("scroll", function () {
    const before = document.querySelector(".beforeNav");
    const after = document.querySelector(".afterNav");
    const topNav = document.querySelector(".topNav");
    const height_offset = before?before.offsetHeight:0;
    const scrolled_Distance = Math.abs(document.body.getBoundingClientRect().top);
    if (scrolled_Distance > height_offset) {
        topNav.classList.add("fixed");
        after.style.marginTop = `${topNav.offsetHeight}px`;
    } else {
        topNav.classList.remove("fixed");
        after.style.marginTop = "0";
    }
})