var cstr=require("C_Str");

var ctl=cc.Class({
    extends: cc.Component,

    properties: {
    	nbbt:{
    		default:[],
    		type:cc.Button//数字按钮
    	},
    	opbt:{
    		default:[],
    		type:cc.Button//元算符号按钮
    	},
    	vewnb:{
    		default:[],
    		type:cc.Label,//数字标签
    	},
    	vewoper:{
    		default:[],
    		type:cc.Label,//运算符标签
    	},
    	nb:{
    		default:[],
    		type:cc.Integer,//可运算数字数组
    	},
    	op:{
    		default:[],
    		type:cc.Integer,//可运算运算符数组
    	},
    	nbarr:{//数字数组
    		default:[],
    		type:cc.Integer,
    	},
    	note:{
    		default:null,
    		type:cc.RichText,
    	},
    	tm:{
    		default:null,
    		type:cc.Label,
    	},
    	cnt:{
    		default:null,
    		type:cc.Label,
    	},
        vibgm:{
            default:null,
            type:cc.Component,
        },
        dtbgm:{
            default:null,
            type:cc.Component,
        },
    	nbcount:0,
    	opercount:0,
    	result:0,
    },
    onLoad:function(){
    	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onKeyDown:function(event){
    	 switch(event.keyCode) {
            case cc.KEY.back:cc.director.end();
                break;
            }
    },
    start:function(){
    	//this.note.getComponent(cc.RichText).string=cstr.ToRichStr("#ff0000","提示:")+cstr.ToRichStr("#0000ff",this.nb[0]+"");
    	this.FlushOnce();
    },
    CreateEnd:function(){
    	var i=this.RandNumber(0, 3);
    	var j=this.RandNumber(9, 100);
    	var k=this.RandNumber(9, 100);
    	var result=0;
    	switch (i) {
    		case 1:{result=j+k;this.op[2]=1;};break;
    		case 2:{result=j*k;this.op[2]=3;};break;
    		default:
    			// statements_def
    			break;
    	}
    	this.nb[3]=j;
    	this.nb[4]=k;
    	return result;
    },

    OperatorNb:function(nb1,nb2,oper){
    	var result=-1;
    	switch (oper) {
    		case 1:result=nb1+nb2;break;
    		case 2:result=nb1-nb2;break;
    		case 3:result=nb1*nb2;break;
    		case 4:
    		{
    			if(nb1%nb2!=0){
    				result=-1;
    			}else{
    				result=nb1/nb2;
    			}
    		};break;
    		default:
    			// statements_def
    			break;
    	}
    	return result;
    },

    NbOper:function(nb1,nb2){
    	if((nb1-Math.floor(nb1)!=0)){
    		return -1;
    	}
    	var nb=0;
    	if(nb2%nb1==0){
    		nb=nb2/nb1;
    		if(nb>=10&&nb<=99){
    			return 3;
    		}
       	}
       	nb=nb2*nb1;
       	if(nb>=10&&nb<=99){
       		return 4;
       	}
       	nb=nb2-nb1;
       	if(nb>=10&&nb<=99){
       		return 1;
       	}
       	nb=nb1-nb2;
       	if(nb>=10&&nb<=99){
       		return 2;
       	}
       	return -1;
    },
    CanAddOrCut:function(temp1,temp2){//temp2 to temp1
    	var temp=0;
    	temp=temp1-temp2;
    	if(temp>9&&temp<100){
    		this.op[1]=1;
    		this.nb[2]=temp;
    		return true;
    	}
    	temp=temp2-temp1;
    	if(temp>9&&temp<100){
    		this.op[1]=2;
    		this.nb[2]=temp;
    		return true;
    	}
    	return false;
    },

    CutAddOperator:function(nb1,nb2,oper1){
    	var result=0;
    	switch (oper1) {
    		case 1:result=nb1+nb2;break;
    		case 2:result=nb1-nb2;break;
    	}
    	return result;
    },

    RandCutAddEnd:function(){

    	var op1=this.RandNumber(0,3);
    	var nb1=this.RandNumber(9, 100);
    	var nb2=this.RandNumber(9, 100);

    	this.nb[3]=nb1;
    	this.nb[4]=nb2;
    	this.op[2]=op1;

    	return this.CutAddOperator(nb1,nb2,op1);
    },
    SetNbOp:function(){

    	var nb1=0,nb2=0,nb3=0;
    	var op1=0;
    	var temp1=0;
    	var temp2=0;
    	var flag=true;

    	while(flag){
    		temp1=this.RandCutAddEnd();
    		op1=this.RandNumber(0, 3);
    		nb1=this.RandNumber(9, 100);
    		nb2=this.RandNumber(9, 100);
    		temp2=this.CutAddOperator(nb1,nb2,op1);
    		if(this.CanAddOrCut(temp1, temp2)){
    			flag=false;
    			this.nb[0]=nb1;
    			this.nb[1]=nb2;
    			this.op[0]=op1;
    			this.result=temp1;
    		}
    	}

    },
    ResetNbOp:function(){
    	var result=0;
    	var eqnb=0;
    	var nb1=0;
    	var nb2=0;
    	var nb3=0;
    	var oper1=0;
    	var oper2=0;
    	var flag=true;
 		while(flag){
    		result=this.CreateEnd();
    		nb1=this.RandNumber(9, 100);
    		nb2=this.RandNumber(9, 100);
    		oper1=this.RandNumber(0, 5);
    		eqnb=this.OperatorNb(nb1,nb2,oper1);
    		if(eqnb==-1){
    			continue;
    		}

    		oper2=this.NbOper(eqnb,result);
    		if(oper2>=0){
    			if(oper2>=3&&oper1<=2){
    				flag=true;//四则运算法则
    			}else{
    				 switch (oper2) {
	    				case 1:nb3=result-eqnb;break;
	  					case 2:nb3=result+eqnb;break;
	  					case 3:nb3=result/eqnb;break;
	  					case 4:nb3=result*eqnb;break;
	    				default:break;
    				}
    				if(nb3>9&&nb3<100){
    					flag=false;
	    				this.nb[0]=nb1;
		    			this.nb[1]=nb2;
		    			this.nb[2]=nb3;
		    			this.op[0]=oper1;
		    			this.op[1]=oper2;
    				}
	    		}
    		}
    	}
    	return result;
    },
    RandNumber:function(sm,bg){
    	var i=0;
    	i=Math.floor(Math.random()*bg);
    	while(i<=sm||i>=bg){
    		i=Math.floor(Math.random()*bg);	
    	}
    	return i;
    },
    
    RandOper:function(){
    	var i=this.RandNumber(0, 5);
    	switch (i) {
    		case 1:
    			return "+";break;
    		case 2:
    			return "-";break;
    		case 3:
    			return "*";break;
    		case 4:
    			return "/";break;
    		default:
    			return "+";
    	break;
    	}
    },
    IsInNb:function(a){
    	for(var i=0;i<this.nb.length;i++){
    		if(a==this.nb[i]){
    			return false;
    		}
    	}
    	return true;
    },
    FilNbArr:function(){

    	for(var i=0;i<this.nbarr.length;i++){
    		this.nbarr[i]=this.RandNumber(9,100);
    	}

    	var i=0,j=0,k=0;
    	i=this.RandNumber(0,9);
    	while((j=this.RandNumber(0, 9))==i){;}
    	k=this.RandNumber(0,9);
    	while(k==j||k==i){
    		k=this.RandNumber(0, 9);
    	}

    	this.nbarr[i]=this.nb[0];
    	this.nbarr[j]=this.nb[1];
    	this.nbarr[k]=this.nb[2];
    },
    FlushOnce:function(){
    	this.nbcount=0;
    	this.opercount=0;

    	this.SetNbOp();

    	this.FilNbArr();

    	var i=0,j=0,k=0;
    	i=this.RandNumber(0, 4)-1;
    	while((j=this.RandNumber(0, 4)-1)==i){;}
    	while(k==i||k==j){
    		k=this.RandNumber(0,4)-1;
    	}
    	this.note.getComponent(cc.RichText).string=cstr.ToRichStr("#ff00ff","提示:")+
    	cstr.ToRichStr("#ff0000",this.nb[i]+",")+cstr.ToRichStr("#00ff00",this.nb[j]+",")+
    	cstr.ToRichStr("#0000ff",this.nb[k]+"");
    	for(var i=0;i<this.nbbt.length;i++){
    		this.nbbt[i].getComponent("NumberBt").number=this.nbarr[i];
    	}
    	this.vewnb[0].getComponent("NumberLb").number=0;
    	this.vewnb[1].getComponent("NumberLb").number=0;
    	this.vewnb[2].getComponent("NumberLb").number=0;
    	this.vewoper[0].getComponent("OperLb").oper=0;
    	this.vewoper[1].getComponent("OperLb").oper=0;
    	this.vewoper[2].getComponent("OperLb").oper=this.op[2];
    	this.vewnb[3].getComponent("NumberLb").number=this.nb[3];
    	this.vewnb[4].getComponent("NumberLb").number=this.nb[4];
    	this.tm.getComponent("TimeCheck").OnStart();
    	this.SetAble();
    	this.unschedule(this.FlushOnce);
    },

    OnCheck:function(){
    	if(this.nbcount==3&&this.opercount==2){// 输入完毕
    		var result1=this.CutAddOperator(this.vewnb[0].getComponent("NumberLb").number,this.vewnb[1].getComponent("NumberLb").number,this.vewoper[0].getComponent("OperLb").oper);
    		var result2=this.CutAddOperator(result1,this.vewnb[2].getComponent("NumberLb").number,this.vewoper[1].getComponent("OperLb").oper);
    		if(this.result==result2){
    			this.note.getComponent(cc.RichText).string=cstr.ToRichStr("#ff00ff","回答正确");
    			this.cnt.getComponent("RankNb").AddCount(5);
    			this.tm.getComponent("TimeCheck").ShutSchedule();
    			this.SetDisable();
                this.vibgm.getComponent("Bgm").OnPlay();
    			this.schedule(this.FlushOnce,1,1,2);

    		}else{
    			this.note.getComponent(cc.RichText).string=cstr.ToRichStr("#ff00ff","回答错误");
    			this.cnt.getComponent("RankNb").CutCount(3);
    			this.tm.getComponent("TimeCheck").ShutSchedule();
    			this.SetDisable();
                this.dtbgm.getComponent("Bgm").OnPlay();
    			this.schedule(this.FlushOnce,1,1,2);
    		}
    	}
    },
    OnNbBtClick:function(data){
    	this.nbcount++;
    	var arg=data.target.getComponent("NumberBt").number;
    	if(this.nbcount>0&&this.nbcount<=3){
    		this.vewnb[this.nbcount-1].getComponent("NumberLb").number=arg;
    	}
    	if(this.nbcount>3){
    		this.nbcount=3;
    	}
    	this.OnCheck();
    },
    OnOper:function(data){
    	this.opercount++;
    	var arg=data.target.getComponent("OperBt").oper;
    	if(this.opercount>0&&this.opercount<=2){
    		this.vewoper[this.opercount-1].getComponent("OperLb").oper=arg;
    	}
    	if(this.opercount>2){
    		this.opercount=2;
    	}
    	this.OnCheck();
    },
    OnDtNbClick:function(){
    	this.nbcount--;
    	if(this.nbcount<0){
    		this.nbcount=0;
    	}else{
    		this.vewnb[this.nbcount].getComponent("NumberLb").number=0;
    	}
    },
    OnDtOperClick:function(){
    	this.opercount--;
    	if(this.opercount<0){
    		this.opercount=0;
    	}else{
    		this.vewoper[this.opercount].getComponent("OperLb").oper=0;
    	}
    },
    SetDisable:function(){
    	for(var i=0;i<this.nbbt.length;i++){
    		this.nbbt[i].getComponent(cc.Button).interactable=false;
    	}
    	for(var i=0;i<this.opbt.length;i++){
    		this.opbt[i].getComponent(cc.Button).interactable=false;
    	}
    },
    SetAble:function(){
    	for(var i=0;i<this.nbbt.length;i++){
    		this.nbbt[i].getComponent(cc.Button).interactable=true;
    	}
    	for(var i=0;i<this.opbt.length;i++){
    		this.opbt[i].getComponent(cc.Button).interactable=true;
    	}
    },
});

module.exports=ctl;
