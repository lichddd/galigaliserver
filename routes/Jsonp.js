/**
 * Created by admin on 2015/4/30.
 */
var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/getBiliBili/:av', function(req, res, next) {


    var data = JSON.stringify(req.body);

    var postheaders = {
        'Content-Type' : 'application/json',
        'Content-Length' : data.length
    };

    // the post options
    var optionspost = {
        host : 'www.bilibili.com',
        port : '80',
        path : '/m/html5?aid='+req.params.av,
        method : 'GET'
        //,
        //headers : postheaders
    };

    // do the POST call
    // 服务器端发送REST请求
    var reqPost = http.request(optionspost, function(resPost) {
        var body='';
        resPost.on('data', function (data) { console.log(data);body += data; })
            .on('end', function () {
                console.log(JSON.parse(body));
                res.send(req.query.callback+"("+body+")");
            });
    });
    reqPost.write(data+'\n');

    reqPost.end();

    reqPost.on('error', function(e) {
        console.error(e);
        res.send(req.query.callback+"({ res: '0' })");
    });




    //res.render('login', { title: '登入' });
});

module.exports = router;
