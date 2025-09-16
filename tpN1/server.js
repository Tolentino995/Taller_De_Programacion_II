const http = require ('http');
const url = require ('url');
const fs = require ('fs');

let listaMaterias= [
    1, "TallerDeProgramacion2"
];

const servidor = http.createServer((req, res) =>{
    const parsedUrl = url.parse(req.url, true);

    // API REST GET
    if (req.method === 'GET' && req.url === '/api/materias') {
        return getMaterias(res);
    }
    // Función para obtener las materias
    function getMaterias(res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(listaMaterias));
    }


    //API POST
    if (req.method === 'POST' && req.url === '/api/materias') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const nuevaMateria = JSON.parse(body);
            // listaMaterias.add()
            console.log(nuevaMateria);
            // Resto de código para guardar materia
            res.writeHead(201, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Materia agregada', materia: nuevaMateria }));
        });
        return;
    }

   

//     if (req.method === 'POST' && parsedUrl.pathname === '/agregar-registros'){
// // Recibir datos del formulario
//         let body = '';
//         req.on('data', chunk => {
//         body += chunk.toString();
//         });
//         req.on('end', () => {
//             const nombre = new URLSearchParams(body).get('nombre');
//             // Resto de código para tratar la información, por ejemplo guardarla
//             res.writeHead(302, { 'Location': '/mostrar-registros' });
//             res.end();
//         });
//     }   

    if(req.method == "GET" && parsedUrl.pathname == "/agregar-registros"){
        //Podemos ver todos los datos que se envia-> console.log(req);
        // Mostrar formulario para agregar registro
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error cargando el formulario.');
            }
            res.end(data);
        });
        return;
    }else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('404sss.html', (err, data) => {
            return res.end(data);
        });
    }
});

servidor.listen(3000, () => {
    console.log("Servidor ejecutandose");
});

// 200 -> ok
// 500 -> Internal Server Error
// 404 -> Not found