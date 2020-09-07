

const jwt = require('jsonwebtoken');

let generarToken = (usuario)=>{

    let token = jwt.sign(
                            { usuario: usuario }, //payload
                            'seed-de-desarrollo', // seed
                            { expiresIn: 60*60*24*2 } // expirated
                        );

    return token;
};


module.exports = {
    generarToken
};
