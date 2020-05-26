const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://192.168.0.240:27017';

// Database Name
const dbName = 'Opdracht_4_LES';

// Create a new MongoClient
const client = new MongoClient(url);

(async ()=>{

    try{
        //throw "this is an error";
        await client.connect();

        console.log("Connected successfully to server");

        const db=client.db(dbName);

        result=await insertDocuments(db);
        console.log(result);

        docs=await findDocuments(db);
        console.log(docs);

        client.close();

    }
    catch(error) {
        console.log(error);
    }

})();

const insertDocuments = (async (db) => {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    result= await collection.insertMany([
      {a : 1}, {a : 2}, {a : 3}
    ]);

    assert.equal(3, result.result.n);
    return result;
    
    /*, function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });*/
  });


  const findDocuments = (async (db) => {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    docs= await collection.find({'a': 3}).toArray();
    return docs;

  });