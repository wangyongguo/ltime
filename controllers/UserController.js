var userModel = require('../models/user');
var db = require('../config/db');
module.exports = {
    get_index: function (req, res) {
        var uname = req.query.uname;
        var upass = req.query.upass;
        var uname = "tom";
        var password = "liqiong0923";
        if (uname === uname) {
            if (upass === password) {
                userModel.showUser(req, res,function (err, result) {
                    if(err){
                        res.send({"message": "服务器异常！" });
                        return;
                    }
                    var data = JSON.parse(result);
                    res.render('user', { data: data});
                });
            } else {
                res.send({ "message": "密码错误！" });
            }
        } else {
            res.send({ "message": "账号错误！" });
        }
    },
    post_login:function(req,res){
        userModel.loginUser(req,res,function(err,result){
            
            res.send(result);
        });
    },
    post_register:function(req,res){
        userModel.registerUser(req,res,function(err,result){
            if(err){
                res.send({"message": "服务器异常！" });
            }else {
                res.send(result);
            }
        });
    }
}