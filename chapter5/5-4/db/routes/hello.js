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
                res.render('hello/index',data);//ejsの中身を見にいっている
            }else{
                var resu = results;
                console.log(error);
                console.log('エラーです。');
            }
        });

        //接続を解除
        connection.end();
});

//新規作成ページへのアクセス
router.get('/add',(req,res,next) => {
    var data = {
        title : 'Hello/Add',
        content:'新しいレコード入力:'
    }
    res.render('hello/add',data);
});

//新規作成フォーム送信の処理
router.post('/add',(req,res,next) =>{
    var nm = req.body.name;
    var ml = req.body.mail;
    var ag = req.body.age;
    var data = {'name':nm,'mail':ml,'age':ag};

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('insert into mydata set ?',data,
        function(error,results,fields){
            res.redirect('/hello');
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
                    mydata:results[0]
                }
                res.render('hello/show',data);
            }
        });
        //接続を解除
        connection.end();
});

//指定レコードを編集
router.get('/edit',(req,res,next) => {
    var id = req.query.id;

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('SELECT * FROM mydata where id =?',id,
        function(error,results,fields){
            //データベースアクセス完了時の処理
            if(error == null){
                var data = {
                    title:'Hello/edit',
                    content:'id=' + id + 'のレコード:',
                    mydata:results[0]
                }
                res.render('hello/edit',data);
            }
        });
    //接続を解除
    connection.end();
});

//編集フォーム送信の処理
router.post('/edit',(req,res,next)=>{
    var id = req.body.id;
    var nm = req.body.name;
    var ml = req.body.mail;
    var ag = req.body.age;
    var data = {'name':nm,'mail':ml,'age':ag};

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('update mydata set ? where id = ?',[data,id],
    function(error,results,fields){
        res.redirect('/hello');
    });
    //接続を解除
    connection.end();
});


//指定レコードを削除
router.get('/delete',(req,res,next)=>{
    var id = req.query.id;

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('Select * from mydata where id = ?',id,
    function(error,results,fields){
        //データベースアクセス完了時の処理
        if(error == null){
            var data = {
                title:'Hello/delete',
                content:'id=' + id + 'のレコード',
                mydata:results[0]
            }
            res.render('hello/delete',data);
        }
    });
    
    //接続を解除
    connection.end();

});

//削除フォームの送信処理
router.post('/delete',(req,res,next)=>{
    var id = req.body.id;

    //データベースの設定情報
    var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
    connection.connect();

    //データを取り出す
    connection.query('delete from mydata where id=?',id,
    function(error,results,fields){
        res.redirect('/hello');
    });

    //接続を解除
    connection.end();
});

module.exports = router;