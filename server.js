    // set up ========================
    var express  = require('express');
    var app      = express(); // create our app w/ express
    var mongoose = require('mongoose'); // mongoose for mongodb
    var morgan = require('morgan'); // log requests to the console (express4)
    var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect("mongodb://localhost:27017/school"); // connect to mongoDB database on escola

    //nós estamos criando um local para referenciar nossos arquivos
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());



    //a partir deste ponto criaremos nossos modelos
    var Student = mongoose.model("Student", {
        name : String,
        age : Number,
        occupation : String,
        score : [Number]
    })

    // routes ================================================================================


    // api
    app.get('/api/students', function(req, res) {

        // use mongoose to get all students in the database
        Student.find(function(err, docs) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(docs); // return all todos in JSON format
        });
    });

    // create student and send back only the create student
    app.post('/api/students', function(req, res) {

        // create a student, information comes from AJAX request from Angular
        Student.create({
            name : req.body.name,
            age : req.body.age,
            occupation : req.body.occupation,
            score : req.body.score
        }, function(err, student) {
            if (err)
                res.send(err);

            res.json(student);
        });

    });

    // delete a student
    app.delete('/api/students/:id', function(req, res) {
        
        Student.remove({
            _id : req.params.id
        }, function(err, todo) {
            if (err)
                res.send(err);
            
            //if we have sucess we send the ok message in result
            res.json({result:"ok"});
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });



    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080 ;)");
