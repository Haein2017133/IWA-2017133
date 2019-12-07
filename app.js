// Haein
var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess;
    xml2js = require('xml2js'); // thing that i did for additon 

var router = express();
var server = http.createServer(router);
// helmet 
router.use(express.static(path.resolve(__dirname,'views'))); // something that we provide to user
router.use(express.urlencoded({extended: true}));// thing that i did for additon
router.use(express.json()); // thing that i did for additon //this causes the default setting  quest*****
// thing that i did for additon

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}
//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}

// Function to read in a JSON file, add to it & convert to XML
function create(newBook, cb) {
  // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
  xmlFileToJs('ApplebookStore.xml', function(err, result) {
    if (err) {
      throw (err);
    } else {
      result.bookList.entree.push({'isbn': newBook.isbn, 'author': newBook.author,'title': newBook.title, 'publisher': newBook.publisher, 'publishedyear' : newBook.publishedyear,'genre': newBook.sec_genre,'price': newBook.price});

      jsToXmlFile('ApplebookStore.xml', result, function(err) {
        if (err) {
          console.log("jsToXmlFile", err);
        } else{
          cb();
        }
      });
    }
  })
}

function read() {
  var xml = fs.readFileSync('ApplebookStore.xml', 'utf8');
  return xml.toString();
}

function update(){

}

function deleted(entreeArray, cb) {
 // Function to read in XML file, convert it to JSON, delete the required object and write back to XML file
  xmlFileToJs('ApplebookStore.xml', function(err, result) {
    if (err) {
      throw (err);
    } else {
      //This is where we delete the object based on the position of the section and position of the entree, as being passed on from index.html
      
      for (i = entreeArray.length - 1 ; i >= 0; i--) {
        var selectedIndex = entreeArray[i];
        delete result.bookList.entree[selectedIndex];
      }
      
      //This is where we convert from JSON and write back our XML file
      jsToXmlFile('ApplebookStore.xml', result, function(err) {
        if (err) {
          console.log(err);
        } else {
          cb();
        }
      });
    } 
  }); 
}

router.get('/',function(req, res){
    res.render('index');
})

router.get('/get/html', function(req, res) { // we change this from '/'

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('ApplebookStore.xml', 'utf8');
    var xsl = fs.readFileSync('ApplebookStore.xsl', 'utf8');
    console.log("/get/html", xml); //colsole
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);
//this
    var result = xsltProcess(doc, stylesheet);

    res.end(result.toString());


});

//add new record into the table
// '/book/addition'
router.post('/book/add', function(req,res){
  console.log('/book/add', req.body);
  create(req.body, function() {
    // console.log("file saved ")
    var result = read();
    res.end(result);
  });
  
});

router.get('/book/list', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var result = read();
  res.end(result);
})

//delete selected record
router.post('/book/delete', function(req, res){

  var entreeArray = req.body.entree;
  deleted(entreeArray, function() { // when it compelted, read the reasul again 
    var result = read();
    res.end(result);
  });

});


router.get('/book/search', function(req,res){
    console.log('/book/search');
});


server.listen(process.env.PORT || 3000, process.env.IP, function(){
var addr = server.address();
console.log("Server is listening at", addr.address + ":" + addr.port)
});

