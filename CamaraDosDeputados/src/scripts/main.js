pageDep = () => {
    var a = document.createElement("a");
    a.href = "deputados.html";
    a.click();
}

pagePar = () => {
    var a = document.createElement("a");
    a.href = "partidos.html";
    a.click();
    salvarDeputado(deputados[pos]);
}

init = () => {
    var btnDep = document.getElementById("btnDep");
    var btnPar = document.getElementById("btnPar");

    btnDep.onclick = pageDep;
    btnPar.onclick = pagePar;
}

init();