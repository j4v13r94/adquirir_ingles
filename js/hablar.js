let sub = document.querySelector('.agregar');
let input = document.getElementById('add-texto');
const db = localStorage
const mic = document.getElementById('mic');
const micro = document.getElementById('micro');

const Agregar = (texto, id = null) => {

    texto = texto.replace('.', "").replace(",", "").trim();
    if (localStorage.length > 0) {

        let palabras, state;
        palabras = localStorage.getItem('palabras');
        state = palabras.split(";").indexOf(texto);

        console.log(state);
        if (state == -1 && texto) {
            localStorage.setItem('palabras', `${palabras};${texto}`)
            return true;
        } else return false;


    } else { localStorage.setItem('palabras', texto); return true };

}
sub.onsubmit = (event) => {

    event.preventDefault()
    let texto = input.value
    let result = Agregar(texto)


    if (result) {
        Swal.fire({
            title: 'success!',
            text: 'Agregado : ' + texto,
            icon: 'success',
            confirmButtonText: 'Perfect!'
        })
        loadTexto()
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Ya existe : ' + texto,
            icon: 'error',
            confirmButtonText: 'Sad!!'
        })
    }


    input.value = ""

};



//console.log(db.getItem('palabras'));



const voz = new webkitSpeechRecognition();
voz.lang = 'en-US';
voz.continuous = false;

mic.onclick = () => voz.start();

mic.onchange = (e) => console.log(e);


voz.onresult = event => {
    for (const result of event.results) {
        let rec = result[0].transcript;
        let palabras = db.getItem('palabras').toLocaleLowerCase().split(";")
        let id = palabras.indexOf(rec);

        if (id != -1) {
            let contenedor = document.getElementById(id);
            contenedor.classList.add("exito");
            Swal.fire({
                title: 'Wow!, Suenas como nativo 😀',
                text: 'Entendimos : ' + rec,
                icon: 'success',
                confirmButtonText: 'lets go!'
            })

        } else {
            Swal.fire({
                title: 'Sigue intentando! 👓',
                text: 'Escuche : ' + rec,
                icon: 'info',
                confirmButtonText: 'Tu Puedes!!'
            })
        }

    }
}


const loadTexto = () => {

    if (db.length > 0 ) {

        let btn = document.querySelector('.tracker');
        let texto = document.getElementById('texto');
        let frag = document.createDocumentFragment();
        let contenido = db.getItem('palabras').split(";")

        for (const [key, result] of Object.entries(contenido)) {
            let div = document.createElement("DIV");

            div.setAttribute("id", key);

            let estuctuta = `
        <input   type="checkbox" name="" >
        <label for="${key}" class="w-full">${result}</label>
        <button class="text-3xl" data-id="${key}">🗑</button>      
        `

            div.setAttribute("class", "card justify-between")
            div.innerHTML = estuctuta
            frag.appendChild(div)

        }
        texto.textContent = ""
        
        texto.appendChild(frag) 

        btn.onclick = (e) => {

            if (e.target.tagName === "BUTTON") {
                let id = e.target.attributes["data-id"].value;
                (id) ? deleteTexto(id) : null;
                loadTexto()
            }
        }
    }else document.getElementById('texto').innerText = "";
}


loadTexto()

const deleteTexto = (id) => {
    console.log(id);
    let items = db.getItem("palabras").split(";")
    let newitem = items.filter(item => item != items[id])

    if(newitem.length > 0) 
    db.setItem('palabras', newitem.toString().replace(/,/g, ';'))

    else
        db.removeItem('palabras') 
           
}



voz.onaudiostart = function (event) {
    //Fired when the user agent has started to capture audio.
    console.log('00 SpeechRecognition.onaudiostart');
    mic.disabled = true;
    micro.classList.toggle("rec");
}

voz.onaudioend = function (event) {
    //Fired when the user agent has finished capturing audio.
    console.log('SpeechRecognition.onaudioend');
}

voz.onend = function (event) {
    //Fired when the speech recognition service has disconnected.
    console.log('SpeechRecognition.onend');
    mic.disabled = false;
    micro.classList.toggle("rec");
}

voz.onnomatch = function (event) {
    //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
    console.log('SpeechRecognition.onnomatch');
}

voz.onsoundstart = function (event) {
    //Fired when any sound — recognisable speech or not — has been detected.
    console.log('SpeechRecognition.onsoundstart');
}