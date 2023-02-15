const mongoose = require('mongoose');

const dbconection = async() =>{
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            // useCreateIndex:true,
            // useFindAndModify: false
        });

        console.log('Base de datos online');
        
    }catch(error){
        console.log(error);
        throw new Error('Error al momento de iniciar la BD');
    }
};

module.exports = {
    dbconection
}