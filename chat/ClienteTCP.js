// Cliente TCP
const net = require('net');

// variables servidor
const direccion = 'localhost';
const puerto = 9000;

iniciarCliente();

function iniciarCliente() {
    // creamos el socker cliente
    const client = new net.Socket();
    // creamos la variable de lectura
    var lectura = process.openStdin();
    // conectamos con el servidor
    client.connect(puerto, direccion, ()=> {
        // variables para obtener puerto y direccion del cliente
        const address = client.address();
        const port = address.port;
        const ipaddr = address.address;
        console.log(" - Cliente TCP INICIADO - ");
        console.log("   El cliente esta escuchando : " + ipaddr + ":" + port);
        console.log("CLIENTE : ");
    });

    lectura.on('data', function(d) {
        const datoEnviar = d.toString().trim();
        // enviamos el dato
        client.write(datoEnviar);
    });

    // recibimos dato del servidor
    client.on('data', data => {
        console.log('SERVIDOR : ' + data);
        console.log("CLIENTE : ");
        // client.destroy();
    });

    // cerramos la conexion con el servidor
    client.on('close', () => {
        console.log('Conexión cerrada');
        process.exit();
    });
}