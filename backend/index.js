const express = require('express')
const app = express();
const port = 3001;

var cors = require('cors')
app.use(cors());

app.get('/', (req, res) => {
  res.send('Test connection to backend!!')
});


app.post('/signup',function(req,res){
  console.log(req.body);
  console.log("sign up");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});