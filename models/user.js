// 用户模型
let uuid = require('node-uuid');
var db = require('../config/db');
var util = require('../utils/util');
module.exports = {
    showUser:function(req,res,cb){
        // 定义查询语句
        var sql = "SELECT * FROM `tt_user`";
        db.query(sql,function(err,result){
            result = JSON.stringify(result);
            cb&&cb(err,result);
        });
    },
    loginUser:function(req,res,cb){
        var upass = req.body.pass;
        var code = req.body.code;
        var tel = req.body.tel;
        var sql = "select * from tt_user";
        if (tel) {
            sql += " where tel = '" + tel + "'";
            if (upass) {
                sql += " and pass = '" + upass + "'";
                if (code == req.session.captcha) {
                    sql.replace("and", "where");
                    db.query(sql, function (err, rows) {
                        if (err) {
                            res.send({"message":"服务器异常", "code": "500"});
                        } else {
                            if (rows.length == 0) {
                                res.send({"message":"有没数据", "code": "-1"});
                            } else {
                                var session_code = util.params();
                                var user_name = rows[0].name;
                                var status_text = {"message": "ok", "code": "0", "id": session_code,"name":user_name};
                                req.session.session_code = session_code;
                                req.session.session_uid = rows[0].id;
                                cb&&cb(status_text);
                            }
                        }
                    });
                } else {
                    res.send({"message":"验证码错误", "code": "-103"});
                }
            } else {
                res.send({"message":"请输入密码", "code": "-102"});
            }
        } else {
            res.send({"message":"请输入账号", "code": "-101"});
        }
    },
    registerUser:function(req,res,cb){
        var name = req.body.name;
        var pass = req.body.pass;
        var id = uuid.v1();
        var code = req.body.code;
        var tel = req.body.tel;
        var sql = "select * from tt_user where tel ='" + tel + "'";
        db.query(sql,function(err,rows){
            if(err){
                res.send({"message":"服务器异常", "code": "500"});
                return;
            }else {
                if(rows.length==0){
                    if (code == req.session.captcha) {
                        db.query("insert into user(name,pass,id,tel) values('" + name + "','" + pass + "','" + id + "','" + tel + "')",function(err,rows){
                            if(err){
                                res.send({"message":"服务器异常","code":"500"});
                            }else {
                                var session_code = util.params();
                                var status_text = {"message": "注册成功", "code": "0", "id": session_code };
                                req.session.session_uid = rows[0].id;
                                req.session.session_code = session_code;
                                cb && cb(status_text);
                            }
                        })
                    }
                }else {
                    res.send({"message":"用户已经存在", "code": "-202"});
                }
            }
        })
    }
}