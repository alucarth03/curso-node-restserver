const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const userGet = async(req = request, res = response) => {
    const { limite=5, desde = 0 } = req.query; 
    const where={estado:true};
    
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(where),
        Usuario.find(where)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
};
const userPost = async (req, res = response) => {
    
    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    // guardar en bd
    await usuario.save();

    res.json({
        'ok': true,
        usuario
    })
}; 
const userPut = async(req, res = response) => {
    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;
    
    // TODO VALIDAR CONTRA BD
    if( password ){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.json({
        'mensaje':'PUT API - Controlador',
        usuario
    })
}; 
const userDelete = async(req, res = response) => {
    const { id } = req.params;

    // Borrar literalmente de la base de datos
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Borrar figurativamente de la base de datos (cambiar el estatus)
    const borrar = {estado:false};
    const usuario = await Usuario.findByIdAndUpdate(id, borrar);

    res.json({
        usuario
    })
}; 
const userPatch = (req, res = response) => {
    res.json({
        'ok': true,
        'mensaje':'PATCH API - Controlador'
    })
}; 


module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
};