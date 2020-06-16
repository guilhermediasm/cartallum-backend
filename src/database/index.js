const mongoose = require('mongoose');
//wbJFqLvWeZ5YrFKD
//user_db_cartallum
mongoose.connect('mongodb://familiasalegre:aZDT8vKRQaQA0k2P@cluster0-shard-00-00-okv13.mongodb.net:27017,cluster0-shard-00-01-okv13.mongodb.net:27017,cluster0-shard-00-02-okv13.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  

.then(success => {
        console.log('Conectado')
    })
    .catch(erro => {
        console.log('Conexao com o banco erro', erro)
    })

//mongoose.Promise = global.Promise;

module.exports = mongoose;