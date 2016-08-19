$(document).ready(function() {
	//弹出框
	$("#close,#mask1").click(function(){
		$("#msg-box,#mask1").css("display","none");
	});
	
	/* 验证码倒计时 */
	var count = 100;
	var myCountDown;
	
	//获取url里的参数并判断登录
	var url = location.search; 
	var codetxt = url.split('?')[1];
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) {
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	}
	if(codetxt==null){
	}else{
		var openidTxt = strs[0].split("openid=")[1];
		var inviteCodeTxt = strs[1].split("inviteCode=")[1];
	}
	//随机数
	 var a = {}, getNum = function(){
		var b;
		while(true){
			b = Math.random().toString().substr(2, 7)/100;
			if(b.toString().length === 8 && a[b] === undefined){
				return a[b] = b;
			}
		}
	};
	
	//图片验证码
	//http://webapi.30mifi.com/webapi/code/getAuthcode?time="+getNum()+""
	$("#picYZM").attr("src", "http://webapi.30mifi.com/webapi/code/getAuthcode?time="+getNum()+"");
	//修改图片验证码
	$("#picYZM").click(function(){
	  	var linkList = $("#picYZM").attr("src","http://webapi.30mifi.com/webapi/code/getAuthcode?time="+getNum()+"")
	});
	
	//页面打开开始请求数据
	$.ajax({
		type : "get",
		//http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"
		url : "http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"",
		dataType: "jsonp", 
		jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		jsonpCallback: "callbackdata", //callback的function名称,服务端会把名称和data一起传递回来  
		success : function(json){
			
			var uuidTxtJs = json.uuid;   //用户id
			var openIdtxtJs = openidTxt;  //微信用户id
			var inviteCodeTxtJs = inviteCodeTxt;  //邀请码
			var listBoxMoreUlBox = $("#listBoxMoreUlBox");
			
			if(json.ReturnCode=200){
				if(json.data2.end_price == 0){
					var linkTxtName = "http://m.30mifi.com/slhd/kanjia/js.html?"
					document.location.href = linkTxtName+"openid="+openIdtxtJs+"&inviteCode="+inviteCodeTxtJs+"";
				}else{
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
					
					//帮砍一刀获取验证码
					$(".codeImg").click(function(){
						//申明变量  //图片验证码
						var code  = $("#codeText").val(); 
						var codeTxt = code.toLocaleLowerCase();
						var strCodeTxt = $.trim(codeTxt);
						
						if ($("#phoneText").val() == '') {
								$("#msg-box,#mask1").css("display","block");
								$(".msg p").html("*请输入手机号，账号不能为空");
								return false;
						}else if (!(/^1[1|2|3|4|5|6|7|8|9][0-9]\d{4,8}$/.test($("#phoneText").val())) || $('#phoneText').val().length != 11) {
								$("#msg-box,#mask1").css("display","block");
								$(".msg p").html("*请输入正确的手机号码");
								return false;
						}else{
							$(".codeImgShowHide").css("display","block");
							$(".codeImg").css("background","#ccc");
							myCountDown = setInterval(countDown,1000);
							var phone = $('#phoneText').val();
							$.ajax({
								type : "get",
								//http://manage.30mifi.com/testCode/?phone="+phone+"
								//http://webapi.30mifi.com/webapi/getCode?phone=1581124524654
								url : "http://webapi.30mifi.com/webapi/getCode?phone="+phone+"&code="+strCodeTxt+"",
								dataType: "jsonp", 
								jsonp: "callback", //服务端用于接收callback调用的function名的参数  
								jsonpCallback: "callback", //callback的function名称,服务端会把名称和data一起传递回来  
								success : function(json){
									//alert(json.ReturnCode);
									console.log(json);
									if(json.ReturnCode == 200){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("发送成功，请您注意查收短信信息。");
										
									}else if(json.ReturnCode == 413){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("请输入正确答案");
										$(".codeImgShowHide").css("display","none");
										$(".codeImg").css("background","#32b476");
										count = 100;
										clearInterval(myCountDown);
									}else if(json.ReturnCode == 415){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("亲，短信验证码失效，请重新获取");
										$(".codeImgShowHide").css("display","none");
										$(".codeImg").css("background","#32b476");
										count = 100;
										clearInterval(myCountDown);
									}else if(json.ReturnCode == 500){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("亲，您已经提交过了，快去下载客户端体验吧。");
										$(".codeImgShowHide").css("display","none");
										$(".codeImg").css("background","#32b476");
										count = 100;
										clearInterval(myCountDown);
									}
								},
								error:function(){
									//alert('Error');
								}
							});
						}
					});
					
					//提交数据
					$(".goPhone").click(function(){
						//申明变量  //图片验证码
						var code  = $("#codeText").val(); 
						var codeTxt = code.toLocaleLowerCase();
						var strCodeTxt = $.trim(codeTxt);
	
						//获取验证码内容
						var numCodeText = $("#authCode").val();   //手机验证码
						
						if ($("#phoneText").val() == '') {
							alert("*请输入手机号，账号不能为空");
							return false;
						}else if (!(/^1[1|2|3|4|5|6|7|8|9][0-9]\d{4,8}$/.test($("#phoneText").val())) || $('#phoneText').val().length != 11) {
							alert("*请输入正确的手机号码");
							return false;
						}else if($("#authCode").val()==""){
							alert("*请输入验证码");
							return false;
						}else{
							//手机登录框取消
							$(".boxWrapInput,#mask").css("display","none");
							
							//判断数组是否为空
							if(json.data[attr]==null){
								//总人数
								var sumTxtR = 0
								var sumTxtRS = sumTxtR*1+1
							}else{
								//总人数
								var sumTxtR = json.data2.sum;
								var sumTxtRS = sumTxtR*1+1;
							}
							var phone = $('#phoneText').val();
							//手机号加星
							var phoneTxt1 = phone.replace(/(.{3}).*(.{4})/,"$1****$2");
							//数据请求
							$.ajax({
								type : "get",
								url : "http://webapi.30mifi.com/webapi/bargain/insertBargain?uuid="+uuidTxtJs+"&phone="+phone+"&openid="+openIdtxtJs+"&code="+strCodeTxt+"&authCode="+numCodeText+"&inviteCode="+inviteCodeTxtJs+"",
								dataType: "jsonp", 
								jsonp: "callback", //服务端用于接收callback调用的function名的参数  
								jsonpCallback: "callbackdata", //callback的function名称,服务端会把名称和data一起传递回来  
								success : function(json){
									
									//总金额
									var numTxtZS = json.endprice+"元";
									//砍掉价格
									var numTxtKS = json.bargain+"元";
									//最上总金额
									var numTxtZSS = json.endprice;
									//alert(json.ReturnCode);
									console.log(json);
									if(json.ReturnCode == 200){
										//最新价格
										$("#end_price").html(numTxtZSS);
										//总人数
										$("#sum").html(sumTxtRS);
										//新添加一条数据
										var str = ''
										str += '<li>' +
											'<span id="phoneTxt1" class="colorFont1" >' + phoneTxt1 +'</span>'+
											'<span id="numTxtK1" class="colorFont2" >' + numTxtKS +'</span>'+
											'<span id="numTxtK1" class="colorFont3" >' + numTxtZS +'</span>'+
											'<div class="clear"></div>' +
											' </li>';
										
										$("#coinlist").html(str);
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("砍价成功");
										$("#codeTextCopy").val(json.code);
									}else if(json.ReturnCode == 405){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("亲，您已经提交过了");
									}else if(json.ReturnCode == 411){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("亲，价钱已经到底啦，不要在砍啦，已经砍到大腿根啦");
									}else if(json.ReturnCode == 413){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("亲，自己不能给自己砍价");
									}else if(json.ReturnCode == 414){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("亲，您输入的手机验证码有误，请重新输入");
									}else if(json.ReturnCode == 500){
										$("#msg-box,#mask1").css("display","block");
										$(".msg p").html("亲，网络中断，请你刷新页面");
									}
								},
								error:function(json){
									//console.log(json);
								}
							});
						}
					});
					
				}
			}else if(json.ReturnCode=500){
				
			};
		},
		error:function(json){
			//console.log(json);
		}
	});
	
	//显示弹窗
	$(".fxBox").click(function(){
		$(".boxWrapInput").show();
		$("#mask").show();
	});
	
	//关闭弹窗
	$("#mask").click(function(){
		$(".boxWrapInput").hide();
		$("#mask,#mask1").hide();
		$("#msg-box").hide();
	});

	//时间控制器
	function countDown(){
	   $(".codeImg").html(count+"秒");
	   count--;
	   if(count==0){
		   $(".codeImg").html("发送到手机");
		   clearInterval(myCountDown);
		   count = 100;
		   $(".codeImgShowHide").css("display","none");
		   $(".codeImg").css("background","#32b476");
		}
	}
});
