var Caipin = window.Caipin = function(){}
Caipin.prototype.init = function(){
  
}
Caipin.prototype.move = function(dom){
    this.x=0;
    this.y =0; 
    this.isMove = false;
    this.dom = dom;
    var bgcolor = this.addColor();
    this.dom.parentNode.style.backgroundColor=bgcolor;
    this.dom.parentNode.querySelector("input[type='submit']").style.backgroundColor=bgcolor;
    var x = 0;
    var y = 0;
    var _this = this;
    this.dom.onmousedown = function(evt){
        _this.isMove = true;
        x = evt.pageX - _this.dom.parentNode.offsetLeft;
        y = evt.pageY - _this.dom.parentNode.offsetTop;
    }
    document.onmousemove = function(evt){
        if(_this.isMove){
            _this.x = evt.pageX - x ;
            _this.y= evt.pageY - y;
            _this.dom.parentNode.style.left = `${_this.x}px`;
            _this.dom.parentNode.style.top = `${_this.y}px`;    
        }
    }
    document.onmouseup = function(){
        _this.isMove = false;
    }
}

Caipin.prototype.formatime = function(){
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
    var currentTime = yy+"-"+mm+"-"+dd+"/"+dh+":"+dm+":"+ds;
    return currentTime;
}
Caipin.prototype.tapEvent = function(dom,callback){
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
Caipin.prototype.animate = function(dom,option,callback){
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

Caipin.prototype.addColor = function(){
    var r = this.randomf(256,0);
    var b = this.randomf(256,0);
    var g = this.randomf(256,0);
    var color =`rgba(${r},${b},${g},1)`;
    return color;
}
Caipin.prototype.randomf = function(max , min){
    return Math.floor(Math.random()*(max - min)+min);
}