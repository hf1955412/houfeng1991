$(document).ready(function() {

	//获取链接地址里的参数
	var userId = getQueryString("userId");

	function getQueryString(name) { 
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	}

	//定义列表
	var listBoxMoreUlBox = $(".listBoxMoreUlBox");
	
	//页面打开开始请求数据
	$.ajax({
		type : "get",
		//http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"
		url : "http://weixin.30mifi.com/voting/voteList?callback=callback&userId="+userId+"&voteId=1",
		dataType: "jsonp", 
		jsonp: "callback", //服务端用于接收callback调用的function名的参数  
		jsonpCallback: "callback", //callback的function名称,服务端会把名称和data一起传递回来  
		success : function(json){
			console.log(json);
			if(json.ReturnCode=200){
				for (var attr in json.data) {
					//转化为数字
					var pictureUrl = json.data[attr].pictureUrl;	//活动图片
					var subject = json.data[attr].subject;      	//昵称
					var votenum = json.data[attr].votenum;  		//获得票数
					var gender 	= json.data[attr].gender;	  		//性别
					var judge 	= json.data[attr].judge;	  	  	//投票的状态
					var id 		= json.data[attr].id;				//被投票用户id

					//判断性别
					if(json.data[attr].gender==0){
						//女
						var gender = 'bgColorGirl';
						var xing   = 'colorBgNameGirl'
						var xingbei = '公主';
					}else if(json.data[attr].gender==1){
						//男
						var gender = 'bgColorBoy';
						var xing   = 'colorBgNameBoy'
						var xingbei = '王子';
					}

					//判断投票状态
					if(json.data[attr].judge==0){
						//可投票
						var judge = '<div class="inputBox Upload">投一票</div>'
					}else if(json.data[attr].judge==1){
						//不可投票
						var judge = '<div class="inputBox noUpload">今日已投</div>'
					}
					console.log(json);
					
					//列表
					var str = ''
					str += 
						'<li name='+id+' index='+votenum+'>' +
							'<div class="porBoxList">' +
								'<div class="txtBoxList">' +
									'<img src='+pictureUrl+'>' +
									'<ul class="listBoxMoreUlListBox '+gender+'">' +
										'<li>' +
											'<span class="floatL">'+subject+'</span>' +
											'<span class="floatR '+xing+'">'+xingbei+'</span>' +
										'</li>' +
										'<li>' +
											'<span class="floatL">当前票数</span>' +
											'<span class="floatR colorOr numTxt">'+votenum+'</span>' +
										'</li>'+
										'<div class="clear"></div>'+
									'</ul>'+
								'</div>'+
								'<img class="imgPicPa" src="images/liPicBg.jpg" alt="图片背景">'+
							'</div>'+
							judge+
						'</li>';
						
					listBoxMoreUlBox.append(str);
				};
			}else{
			};


			$(".Upload").click(function(){
				var voteTaskDetailId = $(this).parents().attr("name");
				var numTxt = $(this).parents().attr("index");
				var numTxtMore =  parseInt(numTxt)+1;
				var thisBox = $(this);
				$(this).prev().find(".numTxt").html(numTxtMore);
				$(this).addClass("noUpload").removeClass("Upload").html("今日已投");
				
				//提交数据
				$.ajax({
					type : "get",
					//http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"
					url : "http://weixin.30mifi.com/voting/conductVote?callback=callback&userId="+userId+"&voteTaskDetailId="+voteTaskDetailId+"",
					dataType: "jsonp", 
					jsonp: "callback", //服务端用于接收callback调用的function名的参数  
					jsonpCallback: "callback", //callback的function名称,服务端会把名称和data一起传递回来  
					success : function(json){
						console.log(json);
						if(json.returnCode==200){
							alert(json.message);
						}else if(json.returnCode==412){
							alert(json.message);
							$(thisBox).addClass("Upload").removeClass("noUpload").html("投一票");
						}else{
							alert(json.message);
						};
					},
					error:function(json){
						//console.log(json);
					}
				});


			});
		},
		error:function(json){
			//console.log(json);
		}
	});

	//分享
	if (isClient()) {
		$(".fxBox").click(function(){
			$(".yindaoTu").show();
		});
		$(".yindaoTu").click(function(){
			$(".yindaoTu").hide();
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
			$(".fxBox").click(function(){
				$(".yindaoTu").show();
			});
			$(".yindaoTu").click(function(){
				$(".yindaoTu").hide();
			});
		}else{
			//你用的是IOS客户端
			//appShowHide.style.display="none";
		}
	}else if(navigator.userAgent.match(/Android/i)) {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger"){
			//你用的是安卓的微信客户端
			$(".fxBox").click(function(){
				$(".yindaoTu").show();
			});
			$(".yindaoTu").click(function(){
				$(".yindaoTu").hide();
			});
		}else{	
			//你用的是安卓客户端
		}
	}
	else {
	}
});
