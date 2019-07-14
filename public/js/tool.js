function animate(dom , option ,callback){
    clearInterval(dom.timer)
    dom.timer = setInterval(function(){
        var isChange = true;
        for(var k in option ){
                var speed = ((parseInt(option[k]) - parseInt(getComputedStyle(dom,null)[k])))/10;
                speed = speed < 0 ? Math.floor(speed) :Math.ceil(speed);
                if((parseInt(option[k]) !=parseInt(getComputedStyle(dom,null)[k]))){
                    isChange = false;
                }
                dom.style[k] = parseInt(getComputedStyle(dom,null)[k])+speed+"px";
        }
        if(isChange){
            clearInterval(dom.timer);
            if(callback){ callback()}
            return ;
        }
    } ,30)
}
/*

 轻触事件逻辑

*/
function tap(dom,callback){
    dom.time = 0 ;
    dom.start = 0;
    dom.addEventListener('touchstart',function(){
        dom.start= new Date().getTime();
    })
    dom.addEventListener('touchend',function(){
        dom.time = new Date().getTime() - dom.start ;
        if(dom.time < 300){
            callback && callback();
        }
    })
}
// 格式化时间
function formatime(){
    var dt = new Date();
    var yy = dt.getFullYear();
    var mm = dt.getMonth()+1;
    var dd = dt.getDate();
    var h = dt.getHours() ;
    var dh = h<10?"0"+h:h;
    var m = dt.getMinutes();
    var dm = m<10?"0"+m:m;
    var s = dt.getSeconds();
    var ds = s<10?"0"+s:s;
    var time = yy+"-"+mm+"-"+dd+"/"+dh+":"+dm+":"+ds;
    return time;
}
