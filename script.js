// Määritetään meidän piirtämisalue
const canvas = document.getElementById("sheet");
canvas.width;
canvas.height;

// Muuttuja, joka mahdollistaa sen, että voidaan piirtää jotakin alustalle ja alusta on valkoinen.
let context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

// Muuttujat, jolla pystytään määrittelemään piirtovärin, paksuuden ja niin edelleen.
let piirravari = "black";
let paksuus = 1;
let piirretaan = false;
let pyyhi = false;

// Värin vaihto
function vaihdavari(element) {
    piirravari = element.style.background;
}

// Tallennus piirretylle kuvalle
function tallenna() {
    context.fillStyle = "white";
    var latauslinkki = document.getElementById("lataa");
    var kuva = document.getElementById("sheet").toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
    latauslinkki.setAttribute("href", kuva);
}

canvas.addEventListener("mousedown", aloita, false);
canvas.addEventListener("mousemove", piirra, false);
canvas.addEventListener("mouseup", lopeta, false);
canvas.addEventListener("mouseout", lopeta, false);

function aloita(event) {
    piirretaan = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, 
                    event.clientY - canvas.offsetTop);
    event.preventDefault();
}

// Piirtaminen
function piirra(event) {
    if (piirretaan) {
        context.lineTo(event.clientX - canvas.offsetLeft, 
                        event.clientY - canvas.offsetTop);
        context.strokeStyle = piirravari;
        context.lineWidth = paksuus;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    event.preventDefault();
}

function lopeta(event) {
    if (piirretaan) {
        context.stroke();
        context.closePath();
        piirretaan = false;
    }
    event.preventDefault();
}