const express = require('express')
const app = express();



app.use('/', express.static(__dirname + './../public'));



app.get('/*', function(req, res){
  res.status(404);
  res.send('Такой страницы не существует')
});
 

app.listen(process.env.PORT || 5000), () => {
  console.log("Server is runing..")
};