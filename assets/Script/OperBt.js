// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       oper:0,
    },
    SetLbStr:function() {
        var str="";
        switch (this.oper) {
            case 1:str="+";break;
            case 2:str="-";break;
            case 3:str="×";break;
            case 4:str="÷";break;
            default:str="--";break;
        }
        this.node.children[0].getComponent(cc.Label).string=str;
    },
    start () {
        this.SetLbStr();
    },
});
