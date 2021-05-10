const mongoose = require('mongoose');

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Conexión exitosa a la base de datos.');
  } catch (error) {
    console.log(error);
    throw new Error('Ha ocurrido un error al iniciar la base de datos.');
  }
};

module.exports = {
  connectionDB
};
