const http = require ('http');
const url = require ('url');
const fs = require ('fs');

Servidor = http.createServer((req, res) =>{
    // GET: acceder a los recursos 
    // REQ: va contener los datos controlador
    const parsedUrl = url.parse(req.url, true);

    if (req.method === 'POST' && parsedUrl.pathname === '/agregar-registros'){
// Recibir datos del formulario
        let body = '';
        req.on('data', chunk => {
        body += chunk.toString();
        });
        req.on('end', () => {
            const nombre = new URLSearchParams(body).get('nombre');
            // Resto de código para tratar la información, por ejemplo guardarla
            res.writeHead(302, { 'Location': '/mostrar-registros' });
            res.end();
        });
    }   

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
    }else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('404sss.html', (err, data) => {
            res.end(data);
        });
    }
});

Servidor.listen(3000, () => {
    console.log("Servidor ejecutandose");
});

// 200 -> ok
// 500 -> Internal Server Error
// 404 -> Not found
