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

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

app.get('/getData', async(req, res) => {
    var data = await getData();
    //covnert data to array with column names as the first element
    var chartData = [["Time", "Temperature inside", "temperature outside"]]
    for(var atribute in data){
        chartData[parseInt(atribute) + 1] = [data[atribute].time, parseInt(data[atribute].tempIn), parseInt(data[atribute].tempOut)];
    }
    //send data to script
    res.send(chartData);
})

app.post('/addDataForm', async(req,res) => {
    req.body.time = (new Date()).toUTCString();
    await insertData(req.body);
    //send html file to refresh te page
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});