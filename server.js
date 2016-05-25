var express = require('express');
var compression = require('compression');
var app = express();
var staticAsset = require('static-asset');

/* Port set by grunt config */
var port = process.env.PORT;

/* Enables gzip compression for returned files */
app.use(compression());

app.use(staticAsset(__dirname + "/public/") );
app.use(express.static(__dirname + "/public/") );

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Project is running on port: ' + port);