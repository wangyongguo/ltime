module.exports = {
    get_index:function(req,res){
        res.render('index',{title:"猜猜我是谁!"})
    }
}