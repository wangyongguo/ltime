module.exports = {
    get_demo:function(req,res){
        res.render('test',{title:"猜猜我是谁!"})
    },
    post_login:function(req,res){
        var name = req.body.name;
        if(name == 'xiaohong'){
            res.send({"message":"yes , she is  ","code":"0"});
        }else {
            res.send({"message":"no ,she isn't","code":"-1"});
        }
    }
}