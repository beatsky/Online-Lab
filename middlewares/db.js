var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/lab';

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("lab");
    dbo.collection("Account").find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result[0].admin);
        db.close();
    });
});