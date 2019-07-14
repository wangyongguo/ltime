module.exports = {
    random:function(max,min){
        return Math.round(Math.random()*(max-min)+min);
    },
    params:function(){
        var letter = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','UV','W','X','Y','Z'];
        var timestamp = new Date().getTime();
        var rstr = "";
        for(var i = 0 ; i < 14 ;i++){
            rstr += letter[this.random(letter.length,0)];
        }
        var num ='==='+timestamp + rstr+'==';
        return num;
    }
}