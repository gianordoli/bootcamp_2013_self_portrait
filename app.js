/*-------------------- MODULES --------------------*/
var		express = require('express'),
	 bodyParser = require('body-parser')
	 		 fs = require('fs');

var app = express();

/*-------------------- SETUP --------------------*/
var app = express();
// .use is a middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
app.use(function(req, res, next) {
    // Setup a Cross Origin Resource sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('incoming request from ---> ' + ip);
    // Show the target URL that the user just hit
    var url = req.originalUrl;
    console.log('### requesting ---> ' + url);
    next();
});

app.use('/', express.static(__dirname + '/public'));


/*------------------- ROUTERS -------------------*/

/*----- PUBLIC -----*/
app.post('/public-start', function(req, res) {
    var names = fs.readdirSync('public/students/');
    console.log(names);
    res.json({
        students: names
    });
    
//     parse.findMany('projects', '', function (err, response) {
//         var projects = [];
//         var images = [];

//         response.results.forEach(function(item, index, array){
            
//             // Filter by published projects
//             if(item.publish){
//                 var project = {
//                     title: item.title,
//                     projectId: item.objectId,
//                     order: item.order
//                 }
//                 projects.push(project);

//                 // Filter by images with homepage == true
//                 item.images.forEach(function(obj, i){
//                     if(obj.homepage){
//                         var image = {
//                             url: obj.url,
//                             projectId: item.objectId,
//                             order: item.order
//                         }
//                         images.push(image);
//                     }
//                 });                
//             }
//         });
//         // console.log(projects);
//         // console.log(projects.length);        
//         // console.log(images);
//         // console.log(images.length);

//         projects = _.sortBy(projects, function(obj){
//             return obj.order;
//         });

//         images = _.sortBy(images, function(obj){
//             return obj.order;
//         });

//         projects = JSON.stringify(projects);
//         images = JSON.stringify(images);
//         res.json({
//             projects: projects,
//             images: images
//         });
//     });
});


/*----------------- INIT SERVER -----------------*/
var PORT = 3200; //the port you want to use
app.listen(PORT, function() {
    console.log('Server running at port ' + PORT + '. Ctrl+C to terminate.');
});