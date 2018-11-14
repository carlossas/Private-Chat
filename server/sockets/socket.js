const { io } = require('../server');

//CLASE USUARIOS
const { Usuarios } = require('../classes/usuario')
const usuarios = new Usuarios();
//UTILIDADES
const { crearMensaje } = require('../utilidades/utilidades')


io.on('connection', (client) => {

    console.log('Usuario conectado');

    //AGREGA LAS PERSONAS CONECTADAS AL CHAT
    client.on('entrarChat', (data, callback) => {

        if (!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        let personas = usuarios.agrearPersona(client.id, data.nombre);
        //DEVUELVE LA LISTA ACTUAL DE PERSONAS
        client.broadcast.emit('listaPersona', usuarios.getPersonas());
        callback(personas);

    });

    //SE ACTIVA AL ESUCHAR UN MENSAJE DESDE EL CLIENTE (PARA TODOS)
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersonaById(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje);
    });

    //SE ACTIVA CUANDO ALGUIEN SE DESCONECTA, LO BORRAMOS DEL CHAT
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id);
        //SE EMITE CUANDO ALGUIEN SE DESCONECTA
        client.broadcast.emit(
            'crearMensaje',
            crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`)
        );
        //DEVUELVE LA LISTA ACTUAL DE PERSONAS
        client.broadcast.emit('listaPersona', usuarios.getPersonas());
    });


    //MENSAJES PRIVADOS
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersonaById(client.id);
        client.broadcast.to(data.para).emit(
            'mensajePrivado',
            crearMensaje(persona.nombre, data.mensaje)
        )
    })




});