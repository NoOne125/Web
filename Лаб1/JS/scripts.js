function Swap(){
    t = document.getElementById("4").innerHTML;
    document.getElementById("4").innerHTML = document.getElementById("5").innerHTML;
    document.getElementById("5").innerHTML = t;
}
function Oval(){
    a = 4;
    b = 3;
    S = Math.PI * a * b;
    document.getElementById("3").appendChild(document.createElement("br"));
    document.getElementById("3").appendChild(document.createElement("p").appendChild(document.createTextNode(S)))
}