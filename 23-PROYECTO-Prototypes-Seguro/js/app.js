// Constructores

function Seguros(marca, year, tipo) {

    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// Realiza la cotizacion con los datos....

Seguros.prototype.cotizarSeguro = function() {
    /*
    1 = america 1.15
    2 = asito 1.05
    3 = europero 1.35

    */

    let cantidad;

    const base = 2000;

    switch (this.marca) {

        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;

    }

    // Leer el año

    const diferencia = new Date().getFullYear() - this.year;

    // Cada año que la diferencia sea mayor, costo va a reducirce un 3 %

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
    Si el seguro es basico se multiplica por un 30% mas
    si el seguro es completo se multica por 50% mas
    */

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }


    return cantidad;
}


function UI() {}



// LLenar las opciones de los años 

UI.prototype.llenarOpciones = () => {

    const max = new Date().getFullYear();
    min = max - 20;

    console.log(max);

    const selectYear = document.querySelector("#year");

    for (i = max; i > min; i--) {

        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);

    }

}


//  Muestra alertas en pantalla

UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('error');
    } else {

        div.classList.add('correcto')
    }

    div.classList.add('mensaje', 'mt-10')

    div.textContent = mensaje;

    // Insertar en el HTML

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => { div.remove() }, 3000)

}



UI.prototype.mostrarResultado = (seguro, total) => {

    const { marca, year, tipo } = seguro;

    let txtMarca;
    switch (marca) {

        case '1':
            txtMarca = 'Americano';
            break;
        case '2':
            txtMarca = 'Asiatico';
            break;
        case '3':
            txtMarca = 'Europeo';
            break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
<p class="header"> Tu Resumen</p>
<p class="font-bold">Marca:<span class="font-normal"> ${txtMarca}</span></p>
<p class="font-bold">Año:<span class="font-normal"> ${year}</span></p>
<p class="font-bold">Tipo:<span class="font-normal">${tipo}</span></p>
<p class="font-bold">Total:<span class="font-normal"> $ ${total}</span></p>

`;

    const resultadoDiv = document.querySelector('#resultado');



    // Mostrar el spinner

    const spinner = document.querySelector('#cargando');

    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; // Se borra el spinner
        resultadoDiv.appendChild(div); // Se muesrtra el resultado

    }, 3000)

}

// Instanciar UI

const ui = new UI();
//console.log(ui);


document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones(); //LLena el select con los años

})



eventListeners()

function eventListeners() {

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);


}


function cotizarSeguro(e) {

    e.preventDefault();

    // Leer la marca 

    const marca = document.querySelector('#marca').value;


    // Leer el año
    const year = document.querySelector('#year').value;


    // Leer el tipo de cobertura 
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if (marca === '' || year === '' || tipo === '') {

        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');

        return;

    }

    ui.mostrarMensaje('Cotizando', 'exito');


    // Ocultar cotizaciones previas

    const resultados = document.querySelector('#resultado div');

    if (resultados != null) {
        resultados.remove();
    }

    // Instanciando el seguro

    const seguro = new Seguros(marca, year, tipo);

    const total = seguro.cotizarSeguro();

    // Utilizar el prototype que va a cotizar

    ui.mostrarResultado(seguro, total);

}