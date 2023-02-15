const Role = require('../models/roles');
const Usuario = require('../models/usuario');

const roleValido = async(rol = '') =>{
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El Rol ${rol} no esta registrado en la BD`)
    }
};

const emailValido = async(correo = '') =>{
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`El Email ${correo} ya fue registrado en la BD`)
    }
};

const existeUsuarioPorId = async(id) =>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El Id ${id} no existe`)
    }
};

module.exports = {
    roleValido,
    emailValido,
    existeUsuarioPorId
}