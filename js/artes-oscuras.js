let track = document.querySelector('track');
let pantalla = document.querySelector('.pantalla');
let input = document.getElementById('add-texto');
let sub = document.querySelector('.agregar');
let audio = document.querySelector('audio');







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
        span.onclick = () => audio.currentTime = cue.startTime
        
        let p = document.createElement("SPAN");
        p.textContent=" ";
        frag.appendChild(span)
        frag.appendChild(p)

    }

resultado.appendChild(frag)

    resultado.addEventListener('dblclick', function (e) {
        let {tagName, id , textContent} = e.target;
        (tagName == "SPAN" && textContent.length > 1 )? e.target.style.textDecoration = "underline 2px" : null ;
        (tagName == "SPAN" && input.value.length > 0)? input.value = input.value+" "+textContent : (tagName == "SPAN")? input.value = textContent : null;
        });

});



const remarcar = (id , state , texto) => {

let span = document.getElementById(id);
span.classList.toggle("activo");
(state)? (span.style.color = "#fde047" , 
    pantalla.textContent = texto.replace('.', '').replace(',','')  ) : span.style.color ='';  



}




const Agregar = (texto,id=null) => {

    texto = texto.replace('.',"").replace(",","").trim();
    if(localStorage.length > 0 ){

        let palabras,state;
        palabras = localStorage.getItem('palabras');
        state = palabras.split(";").indexOf(texto);
        
        console.log(state);
        if( state == -1 && texto ){
            localStorage.setItem('palabras' , `${palabras};${texto}`) 
            return true;
            }else return false;
       

    }else { localStorage.setItem('palabras' , texto );  return true};

} 



    

sub.onsubmit = (event)=> {

    event.preventDefault()
    let texto = input.value
    let result = Agregar(texto)


    if(result){
        Swal.fire({
            title: 'success!',
            text: 'Agregado : '+texto,
            icon: 'success',
            confirmButtonText: 'Perfect!'
            })
    }else {
        Swal.fire({
            title: 'Error!',
            text: 'Ya existe : '+texto,
            icon: 'error',
            confirmButtonText: 'Sad!!'
            })
    }


input.value = ""

};


