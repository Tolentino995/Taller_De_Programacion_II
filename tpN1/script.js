document.getElementById('materiaForm').addEventListener('submit', function(e) {

    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const nombreMateria = document.getElementById('nombreMateria').value;

    const data = {
        name: nombreMateria
    };
    fetch('/api/materias', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {alert('Materia agregada exitosamente.');})
    .catch(error => {  console.error('Error:', error);
        alert('Hubo un error al agregar la materia.');
    });
});

// Arreglos para Nombre del concepto y el desarrollo
const nombresDeConceptos = [];
const desarrollosDeConceptos = [];

// Obtener el formulario y el área donde se mostrarán los datos
const formulario = document.getElementById('formularioConceptos');
const listaConceptosDiv = document.getElementById('listaConceptos');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    //Se obtenie los valores de los campos de texto
    const nombreConcepto = document.getElementById('nombreConcepto').value;
    const desarrolloConcepto = document.getElementById('desarrolloConcepto').value;

    //Se valida que los campos no estén vacíos
    if (nombreConcepto.trim() === '' || desarrolloConcepto.trim() === '') {
        alert('Por favor, completa ambos campos.');
        return; // Detiene la función si los campos están vacíos
    }

    // Guarda los valores en los arreglos
    nombresDeConceptos.push(nombreConcepto);
    desarrollosDeConceptos.push(desarrolloConcepto);

    //Limpiar el formulario para un nuevo ingreso
    formulario.reset();

    //Actualizar la vista para mostrar los conceptos
    actualizarVista();
});

// Función para mostrar los conceptos en la página
function actualizarVista() {
    // Limpiar el contenido actual para evitar duplicados
    listaConceptosDiv.innerHTML = '';

    // Recorrer los arreglos y crear los elementos HTML
    nombresDeConceptos.forEach((nombre, index) => {
        const desarrollo = desarrollosDeConceptos[index];

        // Crear un div para cada concepto
        const itemConcepto = document.createElement('div');
        itemConcepto.classList.add('concepto-item');

        // Agregar el nombre del concepto
        const titulo = document.createElement('h4');
        titulo.textContent = nombre;

        // Agregar el desarrollo del concepto
        const parrafo = document.createElement('p');
        parrafo.textContent = desarrollo;

        // Añadir el título y el párrafo al div del concepto
        itemConcepto.appendChild(titulo);
        itemConcepto.appendChild(parrafo);

        // Añadir el div del concepto al contenedor principal
        listaConceptosDiv.appendChild(itemConcepto);
    });
}
