class Usuarios {

    constructor() {
        this.personas = [];
    }

    agrearPersona(id, nombre) {
        let persona = {
            id,
            nombre
        }
        this.personas.push(persona);
        return this.personas;
    }

    //OBTENER PERSONAS POR ID
    getPersonaById(id) {
        //BUSCO DENTRO DEL ARREGLO PERSONAS Y SI ENCUENTRA UNA
        //DEVUELVE ESA PERSONA, SI NO, DEVUELVE UNDEFINED
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0];

        return persona;
    }

    //OBTENER TODAS LAS PERSONAS
    getPersonas() {
        return this.personas;
    }

    //OBTENER PERSONAS POR SALA
    getPersonasPorSala(sala) {

    }

    //BUSCA LA PERSONA CON EL ID Y LA ELIMINA DEL ARRAY
    borrarPersona(id) {

        let personaBorrada = this.getPersonaById(id);

        this.personas = this.personas.filter(persona => {
            return persona.id != id
        });

        return personaBorrada;
    }

}

module.exports = {
    Usuarios
}