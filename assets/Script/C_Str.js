var C_Str={
	c_red:"#ff0000",
	c_green:"#00ff00",
	c_blue:"#0000ff",
	c_white:"#ffffff",
	c_black:"#000000",
	ToRichStr:function(color,str){
		return "<color="+color+">"+str+"</color>";
	}
};
module.exports=C_Str;

