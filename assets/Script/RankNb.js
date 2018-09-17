
cc.Class({
    extends: cc.Component,

    properties: {
        ranknb:0,
    },
    start () {
    	var lb=this.getComponent(cc.Label);
    	lb.string=this.ranknb+"分";
    },

     update (dt) {
     	this.getComponent(cc.Label).string=this.ranknb+"分";
     },
     AddCount:function(argument) {
     	this.ranknb+=argument;
     	// body... 
     },
     CutCount:function(arg){
     	this.ranknb-=arg;
     },
     OnReset:function(){
     	this.ranknb-=2;
     },
     // AddRankNb:function(rnb){
     // 	this.ranknb=this.ranknb+rnd;
     // },
     // ResetRankNb:function(){
     // 	this.ranknb=0;
     // },
     // CutRankNb:function(dt){
     // 	this.ranknb=this.ranknb-dt;
     // },
     // OnResetClick:function(){
     // 	this.CutRankNb(5);
     // },
});
