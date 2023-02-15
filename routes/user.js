const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { roleValido, emailValido, existeUsuarioPorId } = require('../helpers/db-validators');
const { userGet,
        userPost,
        userPut,
        userPatch,
        userDelete 
    } = require('../controllers/user');


const router = Router();

router.get('/', userGet );
router.post('/',[ 
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            check('password','El password es obligatorio y mayor a 6 caracteres').isLength({min:6}),
            check('correo','Correo invalido').isEmail(),
            check('correo').custom(emailValido),
            // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
            check('rol').custom(roleValido),
            validarCampos
        ], userPost );
router.put('/:id', 
            check('id', 'No es un Id valido').isMongoId(),
            check('id').custom(existeUsuarioPorId),
            check('rol').custom(roleValido),
            validarCampos,
            userPut );
router.delete('/:id', 
            check('id', 'No es un Id valido').isMongoId(),
            check('id').custom(existeUsuarioPorId),
            validarCampos,
            userDelete );
router.patch('/', userPatch );





module.exports = router;