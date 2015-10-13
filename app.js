// vendor libraries
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// custom libraries
// routes
var route = require('./route');
// model
var Model = require('./model');

var app = express();

passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));


passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});

function requireRole(roles) {
    return function(req, res, next) {
        var total= 0;
        for (var role in roles){
            if(req.user && req.user.attributes.access_level === role){
                console.log('tickerr');
                total++;
            }
        }
        console.log(total);
        if(total>0) next();
        else res.sendStatus(403);
    };
}

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Defining middleware to serve static files
app.use('/static', express.static('public'));
//
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'secret strategic xxzzz code'}));
app.use(passport.initialize());
app.use(passport.session());

// Typeahead searches
// app.get('/search',function(req,res){
// connection.query('SELECT '+searchBy+' from '+searchTable+' where '+searchBy+' like "%'+req.query.key+'%"', function(err, rows, fields) {
// 	  if (err) throw err;
//     var data=[];
//     for(i=0;i<rows.length;i++)
//       {
//         data.push(rows[i].searchBy);
//       }
//       res.end(JSON.stringify(data));
// 	});
// });


// GET
app.get('/', route.index);

// signin
// GET
app.get('/signin', route.signIn);
// POST
app.post('/signin', route.signInPost);

// signup
// GET
app.get('/user-maintenance', requireRole(["Administrator"]),route.signUp);
// POST
app.post('/user-maintenance', requireRole(["Administrator"]), route.signUpPost);



// cases
app.get('/fetchusers', route.getUsers);
app.get('/fetchcaseworkers', route.getCaseWorkers);
//GET
app.get('/cases', route.casesPage);
//POST
app.post('/cases', route.newCasePost);

// save case logs
app.post('/cases/savecaselogs', route.saveCaseLogs);

// logout
// GET
app.get('/signout', route.signOut);

/********************************/

/********************************/
// 404 not found
app.use(route.notFound404);


var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;

   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});
