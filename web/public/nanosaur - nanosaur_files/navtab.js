function navtabClick(evt, navName, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].id.includes(navName)) {
            tabcontent[i].style.display = "none";
        }
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].id.includes(navName)) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }
    document.getElementById(navName + "-" + tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
default_open = document.getElementsByClassName("defaultOpen");
for (i = 0; i < default_open.length; i++) {
    default_open[i].click();
}