function replace_Tag_HTML (object, html_Name) {
    fetch(html_Name)
    .then(res => res.text())
    .then(text => {
        let newelem = document.createElement("div");
        newelem.innerHTML = text;
        object.parentNode.replaceChild(newelem, object);
    })
}
