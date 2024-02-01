function replace_Tag_HTML (object, html_Name, run_after) {
    fetch(html_Name)
    .then(res => res.text())
    .then(text => {
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        object.parentNode.replaceChild(newelem, object);
        run_after();
    })
}
