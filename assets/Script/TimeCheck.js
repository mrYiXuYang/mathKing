
cc.Class({
    extends:cc.Component,

    properties: {
        time:0,
        count:0,
        cns:{
            default:null,
            type:cc.Canvas,
        },
        cnt:{
            default:null,
            type:cc.Label,
        },
    },
    start:function(){
        this.count=this.time;
    },

    DoCunt:function(){
        if(this.count==0){    
            this.unschedule(this.DoCunt); 
            //this.cns.getComponent("Control").FlushOnce();
            this.cnt.getComponent("RankNb").CutCount(2);
            this.cns.getComponent("Control").note.getComponent(cc.RichText).string="<color=#ff0000>时间到</color>";
             this.cns.getComponent("Control").FlushOnce();
            return;
        }
        this.count--;
    },
    OnStart:function(){
        this.count=this.time;
        this.schedule(this.DoCunt,1);
    },
    update:function(dt){
        var lb=this.getComponent(cc.Label);
        lb.string="时间:"+this.count+"s";
    },
    ShutSchedule:function(){
        this.unschedule(this.DoCunt);
    },
});
