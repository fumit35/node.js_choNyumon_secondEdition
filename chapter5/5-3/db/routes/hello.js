// /helloにアクセスした際の処理
var express = require('express');
var router = express.Router();
var mysql = require('mysql');//★追加

//mysqlの設定情報
var mysql_setting = {
    host:'localhost',
    user:'root',
    password:'',
    database:'my-nodeapp-db'
};

//var http = require('https');//★追加
//var parseString = require('xml2js').parseString;//★追加

router.get('/',(req,res,next)=>{
    //コネクションの用意
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('SELECT * FROM mydata',
        function(error,results,fields){
            //データベースアクセス完了時の処理
            if(error == null){
                var data = {title:'mysql',content:results};
                res.render('hello',data);
            }else{
                var resu = results;
                console.log(error);
                console.log('エラーです。');
            }
        });

        //接続を解除
        connection.end();
});

//指定IDのレコードを表示する
router.get('/show',(req,res,next)=>{
    var id = req.query.id;

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('Select * from mydata where id = ?',id,
        function(error,results,fields){
            //データベースアクセス完了の処理
            if(error == null){
                var data = {
                    title : 'Hello/show',
                    content:'id=' + id + 'のレコード',
                    mydata:result[0]
                }
                res.render('hello/show',data);
            }
        });
        //接続を解除
        connection.end();
});

module.exports = router;