var socket = io();
//BUSCAMOS DATOS POR URL
var params = new URLSearchParams(window.location.search);
// SI NO ENCONTRAMOS DATOS POR URL, LO REEDIRIGIMOS AL INDEX
if (!params.has('nombre')) {
    window.location = 'index.html'
    throw new Error('El nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(res) {
        console.log('Usuarios conectados', res);

    });

});

// escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información del servidor
socket.on('crearMensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});

//ESUCHAMOS CAMBIOS DE LOS USUARIOS
//CUANDO UN USUARIO ENTRA O SALE DEL CHAT
socket.on('listaPersona', function(personas) {
    console.log('Personas:', personas);
});

//MENSAJE PRIVADO
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado', mensaje);

});