$(document).ready(function(){
	//获取链接地址里的参数
	var token = getQueryString("userId");
	var inviteCodeTxt = getQueryString("code");
	
	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	} 
	
	if (isClient()) {
		//appShowHide.style.display="block";
		$(".appLinkHref").attr('href','#'); 
		$(".tzBox").click(function(){
			$(".yindaoTu").show();
		});
		$(".yindaoTu").click(function(){
			$(".yindaoTu").hide();
		});
	}
	
	//在客户端里请求已覆盖跳转地址
	if(token != null && token != undefined && token != "" ){
		$.ajax({
			type : "get",
			url : "http://webapi.30mifi.com/webapi/addTraffic/index?token="+token+"",
			dataType: "jsonp", 
			jsonp: "callback", //服务端用于接收callback调用的function名的参数  
			jsonpCallback: "callback", //callback的function名称,服务端会把名称和data一起传递回来  
			success : function(json){
				var message = json.message;
				//alert(json.ReturnCode);
				console.log(json);
				if(json.ReturnCode == 200){
					
					
					//页面打开开始请求数据
					$.ajax({
						type : "get",
						//http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"
						url : "http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+json.message+"",
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
									console.log(json);
									//最新价格和总人数
									var endPriceN = json.data2.end_price;
									var endPriceNS =endPriceN;
									$("#end_price").html(endPriceNS);
									$("#sum").html(json.data2.sum);
									//人数列表
									var str = ''
									str += '<li>' +
										'<span id="phoneTxt" class="colorFont1" >' + phoneTxtHtml1 +'</span>'+
										'<span id="numTxtK" class="colorFont2" >' + bargainTxtHtml1 +'</span>'+
										'<span id="numTxtK" class="colorFont3" >' + endPrice1 +'</span>'+
										'<div class="clear"></div>' +
										' </li>';
									listBoxMoreUlBox.append(str);
								};
								
							}else if(json.ReturnCode=500){
								
							};
						},
						error:function(json){
							//console.log(json);
						}
					});
					
					
				}else{
					//alert(message);
				}
			},
			error:function(json){
				//console.log(json);
			}
		});
	}
	
	//获取初始化
	var appShowHide = document.getElementById('appShowHide');
	if(inviteCodeTxt != null && inviteCodeTxt != undefined && inviteCodeTxt != ""){
		
		//页面打开开始请求数据
		$.ajax({
			type : "get",
			//http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"
			url : "http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"",
			dataType: "jsonp", 
			jsonp: "callback", //服务端用于接收callback调用的function名的参数  
			jsonpCallback: "callback", //callback的function名称,服务端会把名称和data一起传递回来  
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
						console.log(json);
						//最新价格和总人数
						var endPriceN = json.data2.end_price;
						var endPriceNS =endPriceN;
						$("#end_price").html(endPriceNS);
						$("#sum").html(json.data2.sum);
						//人数列表
						var str = ''
						str += '<li>' +
							'<span id="phoneTxt" class="colorFont1" >' + phoneTxtHtml1 +'</span>'+
							'<span id="numTxtK" class="colorFont2" >' + bargainTxtHtml1 +'</span>'+
							'<span id="numTxtK" class="colorFont3" >' + endPrice1 +'</span>'+
							'<div class="clear"></div>' +
							' </li>';
						listBoxMoreUlBox.append(str);
					};
					
				}else if(json.ReturnCode=500){
					
				};
			},
			error:function(json){
				//console.log(json);
			}
		});
		
		
		
		$.ajax({
			type : "get",
			url : "http://webapi.30mifi.com/webapi/bargain/initialPrice?inviteCode="+inviteCodeTxt+"",
			dataType: "jsonp", 
			jsonp: "callback", //服务端用于接收callback调用的function名的参数  
			jsonpCallback: "callbackdata", //callback的function名称,服务端会把名称和data一起传递回来  
			success : function(json){
				$.ajax({
				type : "get",
				url : "http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"",
				dataType: "jsonp", 
				jsonp: "callback", //服务端用于接收callback调用的function名的参数  
				jsonpCallback: "callbackdata", //callback的function名称,服务端会把名称和data一起传递回来  
				success : function(json){
					//alert(json.ReturnCode);
					console.log(json);
					// 判断是不是客户端
					if (isClient()) {
					}else{
						//修改显示内容
						var str = ''
						str += '<p class="appLinkTxt">' + '参加活动'+
							'<span>'+
							'<img src="images/inputRight.png" alt="告诉好友帮忙砍价">'+
							'</span>'+
							' </p>';
						$(".appLinkHref").html(str);
						//数据请求
						$.ajax({
							type : "get",
							url : "http://webapi.30mifi.com/webapi/bargain/initialPrice?inviteCode="+inviteCodeTxt+"",
							dataType: "jsonp", 
							jsonp: "callback", //服务端用于接收callback调用的function名的参数  
							jsonpCallback: "callbackdata", //callback的function名称,服务端会把名称和data一起传递回来  
							success : function(json){
								//alert(json.ReturnCode);
								console.log(json);
								if(json.ReturnCode == 200){
									$(".appLinkHref").attr('href','https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdb37069355d53549&redirect_uri=http%3a%2f%2fwebapi.30mifi.com%2fwebapi%2fbargain%2fwxunionid&response_type=code&scope=snsapi_userinfo&state='+inviteCodeTxt+'#wechat_redirect'); /*https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3346b8701347ed4e&redirect_uri=http%3a%2f%2f192.168.0.135%3a8080%2fwap%2fbargain%2fwxunionid&response_type=code&scope=snsapi_userinfo&state='+inviteCodetxt+'#wechat_redirect*/
								}else{
								}
							},
							error:function(json){
								//console.log(json);
							}
						});
					}
					
				},
				error:function(json){
					//console.log(json);
				}
			});
				
			},
			error:function(json){
				//console.log(json);
			}
		});
	}
	
	// 判断是不是客户端
	function isClient() {
		var isClient = false;
		var ua = navigator.userAgent.toLowerCase();
		if ((ua.indexOf('liuliangjiabrowser')) != -1) {
			isClient = true;
		}
		return isClient;
	}
	
	//判断是ios还是And
	var pattern = new RegExp(/iPad|iPod|iPhone/i);
	var iosUserAgent = pattern.test(navigator.userAgent);
	if(iosUserAgent){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger"){
			//你用的是IOS的微信客户端
			//appShowHide.style.display="none";
		}else{
			//你用的是IOS客户端
			//appShowHide.style.display="none";
		}
	}else if(navigator.userAgent.match(/Android/i)) {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger"){
			//你用的是安卓的微信客户端
		}else{	
			//你用的是安卓客户端
		}
	}
	else {
	}
});

