// Haein
var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess;

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,'views'))); // something that we provide to user

router.get('/',function(req, res){
    res.render('index');
})

router.get('/get/html', function(req, res) { // we change this from '/'

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('ApplebookStore.xml', 'utf8');
    var xsl = fs.readFileSync('ApplebookStore.xsl', 'utf8');
    console.log(xml);
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet);

    res.end(result.toString());


});

server.listen(process.env.PORT || 3000, process.env.IP, function(){
var addr = server.address();
console.log("Server is listening at", addr.address + ":" + addr.port)
});