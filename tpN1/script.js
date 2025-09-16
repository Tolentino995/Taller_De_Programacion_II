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