const express = require("express");
const app = express();
app.get('/', (request, response) =>{
    response.send("Hello Express");
});
app.use(express.static(__dirname + "/static"));
app.listen(8000, () => console.log("listening on port 8000"));

/// EJS 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/cats", (req, res) => {
    res.render('cats');
})

app.get("/cars", (req, res) => {
    
    res.render('cars');
})

/////////// FORM ////////////////
app.use(express.urlencoded({extended: true}));
app.post('/users', (req, res) => {
    console.log(req.body) 
    res.render('info', {users: req.body})
});
//////////////////////////////////

app.get('/cars/:id', (req, res) => {
    console.log(req.params.id);
});

const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.get('/cars', (req, res) => {
    console.log("Value of name in session: ", req.session.id);
    res.render('cars', {title: "my root route"});
});
app.post('/users', (req, res) => {
    req.session.name = req.body.name;
    res.redirect('/');
});





