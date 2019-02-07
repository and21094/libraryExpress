const express = require ('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/auth', auth);

app.use( (req,res,next) =>{
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.header("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Acces-Control-Request-Method");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header("Allow", "GET, POST, PUT, DELETE");
    next();
})

app.listen(port, function () {
    console.log(`sever running on ${port} port`);
});
