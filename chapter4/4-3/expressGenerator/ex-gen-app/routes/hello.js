// /helloにアクセスした際の処理
var express = require('express');
var router = express.Router();

router.get('/',(req,res,next)=>{
    var data = {
        title:'Hello!',
        content:'これはサンプルコンテンツです。<br>this is sample content.'
    };
    res.render('hello',data);
});

module.exports = router;