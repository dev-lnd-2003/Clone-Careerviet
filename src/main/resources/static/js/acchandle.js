function changeLink(e, link) {
    var tabs = document.getElementsByClassName("tabdv");
    for (i = 0; i < tabs.length; i++) {
        document.getElementsByClassName("tabdv")[i].classList.remove("activetabdv");
    }
    e.classList.add('activetabdv')

    var tabb = document.getElementsByClassName("tab-pane");
    for (i = 0; i < tabb.length; i++) {
        document.getElementsByClassName("tab-pane")[i].classList.remove("active");
    }
    document.getElementById(link).classList.add('active')
}

var hash = location.hash.substr(1);
if (hash != "") {
    var tabb = document.getElementsByClassName("tab-pane");
    for (i = 0; i < tabb.length; i++) {
        document.getElementsByClassName("tab-pane")[i].classList.remove("active");
    }
    var tabs = document.getElementsByClassName("tabdv");
    for (i = 0; i < tabs.length; i++) {
        document.getElementsByClassName("tabdv")[i].classList.remove("activetabdv");
    }
    document.getElementById(hash).classList.add('active')
}