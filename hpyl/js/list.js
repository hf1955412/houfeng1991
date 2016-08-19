$(document).ready(function() {
	
	//获取链接地址里的参数
	var url = location.search; 
	var urlTxt = url.split('?')[1];
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) {
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	}
	if(urlTxt==null){
	}else{
		var userId = strs[0].split("userId=")[1];
	}
	//定义列表
	var listBoxMoreUlBox = $("#listBoxMoreUlBox");
	
	//页面打开开始请求数据
	$.ajax({
		type : "get",
		//http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"
		url : "http://webapi.30mifi.com/webapi/userPositiveComment/lists?token="+userId+"",
		dataType: "jsonp", 
		jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		jsonpCallback: "callback", //callback的function名称,服务端会把名称和data一起传递回来  
		success : function(json){
			console.log(json);
			if(json.ReturnCode=200){
				for (var attr in json.data) {
					//转化为数字
					var createTime = json.data[attr].createTime;  //时间
					var appStore = json.data[attr].appStore;      //名称
					var nickName = json.data[attr].nickName;	  //昵称
					var figure 	 = json.data[attr].figure;	  	  //流量币
					var status = json.data[attr].status;	  	  //状态
					
					if(json.data[attr].status==1000){
						var status = '<span class="colorFont2" >审核中</span>'
					}else if(json.data[attr].status==2000){
						var status = '<span class="colorFont1" >审核失败</span>'
					}else if(json.data[attr].status==3000){
						var status = '<span class="colorFont3" >审核成功</span>'
					}
					console.log(json);
					
					//列表
					var str = ''
					str += '<li>' +
						'<span class="colorFont1" >' + createTime +'</span>'+
						'<span>' + appStore +'</span>'+
						'<span>' + figure +'</span>'+ 
						status+
						'<div class="clear"></div>' +
						' </li>';
						
					listBoxMoreUlBox.append(str);
				};
			}else{
				
			};
		},
		error:function(json){
			//console.log(json);
		}
	});
});
