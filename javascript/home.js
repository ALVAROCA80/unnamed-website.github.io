window.addEventListener("resize", function () {
    const width = document.body.clientWidth;
    const panels = document.querySelectorAll(".grow-panels");
    for (const panel of panels) {
        panel.style.setProperty("--x-margin",`${Math.floor((width%panel.offsetWidth)/(2*Math.floor(width/panel.offsetWidth)))}px`)
    }
}, true)