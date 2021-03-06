// /helloにアクセスした際の処理
var express = require('express');
var router = express.Router();

var http = require('https');//★追加
var parseString = require('xml2js').parseString;//★追加

router.get('/',(req,res,next)=>{
    var opt = {
        host:'news.google.com',
        port:443,
        path:'/news?h1=ja&ned=us&ie=UTF-8&oe=UTF-8&output=rss'
    };

    http.get(opt,(res2)=>{
        var body = '';
        res2.on('data',(data)=>{
            body += data;
        });
        res2.on('end',()=>{
            parseString(body.trim(),(err,result)=>{
                var data = {
                    title:'Hello!',
                    content:result.rss.channel[0].item
                };
                res.render('hello',data);//これがなかったため何も動かなかった
            });
        });
    });
});

module.exports = router;