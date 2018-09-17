cc.Class({
    extends: cc.Component,

    properties: {
        number:0,
    },
    update:function(dt) {
       this.SetLbStr();
    },
    start () {
       this.SetLbStr();
    },
    SetLbStr:function(){
        var str="";
        if(this.number<10){
            str="--";
        }else{
            str=this.number+"";
        }
        this.getComponent(cc.Label).string=str;
    },

});
