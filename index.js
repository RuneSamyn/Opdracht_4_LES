const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var app = require('express')();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');

// Connection URL
const url = 'mongodb://192.168.0.240:27017';

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Database Name
const dbName = 'Opdracht_4_LES';

// Create a new MongoClient
// const client = new MongoClient(url);


// (async ()=>{

//     try{
//         //throw "this is an error";
//         await client.connect();

//         console.log("Connected successfully to server");

//         const db=client.db(dbName);

//         // result=await insertDocuments(db);
//         // console.log(result);

//         // docs=await findDocuments(db);
//         // console.log(docs);

//         // client.close();

//     }
//     catch(error) {
//         console.log(error);
//     }

// })();
  
const insertData = (async (data) => {
    try{
        const client = new MongoClient(url);
        //throw "this is an error";
        await client.connect();

        console.log("Connected successfully to server");

        const db = client.db(dbName);

        const collection = db.collection('data');
        
        var result = await collection.insertOne(data);
        client.close();
        return result;

    }
    catch(error) {
        console.log(error);
    }
})

const getData = (async () => {
    try{
        const client = new MongoClient(url);
        await client.connect();

        const db = client.db(dbName);

        const collection = await db.collection('data');

        var result = await collection.find({}).toArray();

        client.close();
        return result;
    } catch(error) {
        console.log(error);
    }
})

app.get('/', async(req, res) => {
    var data = await getData();
    console.log("all data");
    console.log(data);
    //res.sendDate(data);
    res.sendFile(__dirname + '/index.html');
});

app.post('/addDataForm', async(req,res) => {
    req.body.time = (new Date()).toUTCString();
    var result = await insertData(req.body);
    console.log("insert");
    console.log(result.result);
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});