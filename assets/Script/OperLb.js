cc.Class({
    extends: cc.Component,

    properties: {
        oper:0,
    },

    SetLbStr:function(){
        var str="";
        switch (this.oper) {
            case 1:str="+";break;
            case 2:str="-";break;
            case 3:str="×";break;
            case 4:str="÷";break;
            default:str="--";break;
        }
        var lb=this.getComponent(cc.Label);
        lb.string=str;
    },

    update:function(dt){
        this.SetLbStr();
    },

    start () {
        this.SetLbStr();
    },

    // update (dt) {},
});
