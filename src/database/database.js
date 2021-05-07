const mongodb = require('mongodb');
//const mClient = mongodb.MongoClient;

const cnxUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';

let db = null;

module.exports = {
    connect: async () => {
        return await mongodb.MongoClient.connect(cnxUrl, { 
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then((client) => {
            if (client.isConnected()) {
                db = client.db(dbName);
                return true;
            }
            console.log('Connection Failed!');
        }, (rej) => {
            console.log('Connection Refused!', rej);
            return false;
        })
        .catch((err) => {
            console.log('Connection Error!', err);
            return false;
        });
    },
    insert: async (collectionName, document) => {
        const table = db.collection(collectionName);
        const res = await table.insertOne(document);
        return { insertedCount: res.insertedCount, insertedId: res.insertedId };
    }
}
