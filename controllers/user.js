const { response } = require('express');

const userGet = (req, res = response) => {
    const querys = req.query;
    res.json({
        'ok': true,
        'mensaje':'GET API - Controlador',
        'querys': querys
    })
};

const userPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        'ok': true,
        'mensaje':'POST API - Controlador',
        'nombre': nombre,
        'edad': edad 
    })
}; 
const userPut = (req, res = response) => {
    const aidi = req.params.aidi;
    res.json({
        'ok': true,
        'mensaje':'PUT API - Controlador',
        'aidi': aidi
    })
}; 
const userPatch = (req, res = response) => {
    res.json({
        'ok': true,
        'mensaje':'PATCH API - Controlador'
    })
}; 
const userDelete = (req, res = response) => {
    res.json({
        'ok': true,
        'mensaje':'DELETE API - Controlador'
    })
}; 

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
};