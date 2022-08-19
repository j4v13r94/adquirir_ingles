let track = document.querySelector('track');
let pantalla = document.querySelector('.pantalla');
let config = {
    fondo : "#000",
    color : "#000",
    colorA : "#000",
    size : "24px",
}




track.addEventListener('load', function (e) {
let cues = track.track.cues;    
let frag = document.createDocumentFragment();
let resultado = document.querySelector('.tracker');

    for (const cue of cues) {
        cue.onenter = () => remarcar(cue.id , true , cue.text);
        cue.onexit = () => remarcar(cue.id , false , cue.text);

        let span = document.createElement("SPAN");
        span.innerHTML = (cue.text.indexOf('.') == -1)? cue.text : cue.text + "<br>" ;
        span.setAttribute("id",cue.id)
        let p = document.createElement("SPAN");
        p.textContent=" ";
        frag.appendChild(span)
        frag.appendChild(p)

    }

resultado.appendChild(frag)


});



const remarcar = (id , state , texto) => {

let span = document.getElementById(id);
span.classList.toggle("activo");
(state)? (span.style.color = config.color , 
    pantalla.textContent = texto.replace('.', '').replace(',','')  ) : span.style.color ='';  



}