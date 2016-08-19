$(document).ready(function() {
	//获取url里的参数并判断登录
	var url = location.search; 
	var inviteCodeTxt = url.split("?inviteCode=");
	alert(inviteCodeTxt);

	//页面打开开始请求数据
	$.ajax({
		type : "get",
		//http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"
		url : "http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"",
		dataType: "jsonp", 
		jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		jsonpCallback: "callbackdata", //callback的function名称,服务端会把名称和data一起传递回来  
		success : function(json){
			console.log(json);
			
			var uuidTxtJs = json.uuid;   //用户id
			var inviteCodeTxtJs = inviteCodeTxt;  //邀请码
			var listBoxMoreUlBox = $("#listBoxMoreUlBox");
			
			if(json.ReturnCode=200){
				for (var attr in json.data) {
					//转化为数字
					var phoneTxtHtml = json.data[attr].phone;
					var bargainTxtHtml = parseFloat(json.data[attr].bargain);
					var endPrice = parseFloat(json.data[attr].endPrice);
					
					//手机号加星
					var phoneTxtHtml1 = phoneTxtHtml.replace(/(.{3}).*(.{4})/,"$1****$2");
					
					//金钱后面加小数点
					var bargainTxtHtml1 = bargainTxtHtml+"元";
					var endPrice1 = endPrice+"元";
					
					//最新价格和总人数
					var endPriceN = json.data2.end_price;
					var endPriceNS =endPriceN;
					$("#end_price").html(endPriceNS);
					$("#sum").html(json.data2.sum);
					alert(endPriceNS);
				};
			}else if(json.ReturnCode=500){
				
			};
		},
		error:function(json){
			//console.log(json);
		}
	});
});
