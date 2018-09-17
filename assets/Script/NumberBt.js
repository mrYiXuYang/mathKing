cc.Class({
    extends: cc.Component,

    properties: {
        number:0,
    },
    start:function(){
		this.node.children[0].getComponent(cc.Label).string=this.number+"";
    },
    update:function(dt){
    	this.node.children[0].getComponent(cc.Label).string=this.number+"";
    },
});
