const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const User = require('./mongoose/scheme/user.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

const indexHtml = fs.readFileSync(__dirname + './../public/index.html').toString();

app.use('/', express.static(__dirname + './../public'));


app.post('/login', async (req, res) => {

  const user = req.body.user;

  const { vk_token }  = user;
  
  try{
    const _user = await  User.findOne({ vk_token }).exec();

    if(_user){
      
      res.json( {status: true, data: user } )

    }
    else{

      const newUser = await User.create({ ...user });

      if(newUser){
        res.json( {status: true, data: newUser } )
      } else{

        res.json( {status: false, data: {commnet: "Неизвестная ошибка. Повторите попытку позже."} } )

      }

    }
  }
  catch(e){
    console.log(e);
  }


});

app.use('*', (req, res) => {
  var indexFile = path.resolve(__dirname,'/../public/index.html');
  res.sendFile(indexFile);
})

/*app.get('/*', function(req, res){
  res.status(404);
  res.send('Такой страницы не существует')
});*/
 

app.listen(process.env.PORT || 5000), () => {
  console.log("Server is runing..")
};