const mongoose = require('mongoose');
// wbJFqLvWeZ5YrFKD
// user_db_cartallum
mongoose
  .connect(
    'mongodb://guilherme:wbJFqLvWeZ5YrFKD@cluster0-shard-00-00-7c8dc.azure.mongodb.net:27017,cluster0-shard-00-01-7c8dc.azure.mongodb.net:27017,cluster0-shard-00-02-7c8dc.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  )
  .then(() => {
    console.log('Conectado');
  })
  .catch((erro) => {
    console.log('Conexao com o banco erro', erro);
  });

// mongoose.Promise = global.Promise;

module.exports = mongoose;
