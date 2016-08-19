$(document).ready(function() {
	//ua
	var pattern = new RegExp(/iPad|iPod|iPhone/i);
	var iosUserAgent = pattern.test(navigator.userAgent);
	if(iosUserAgent){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger"){
			$("#appstore").val("App Store");
			$(".appAndBox").hide();
		}else{
			$("#appstore").val("App Store");
			$(".appAndBox").hide();
		}
	}else if(navigator.userAgent.match(/Android/i)) {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger"){
		}else{	
		}
	}
	else {
	}
	//格式化
	$(".inputBoxDiv1").show();
	$(".inputBoxDiv").css("background","#e0e0e0").css("box-shadow","0px 4px 0px #989898");

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
	
	$(".bannerSpanDLink").attr("href","list.html?userId="+userId+"");
	
	//赋值
	$("#token").val(userId);
	
	//上传图片
	$('#filesInputz').change(function(){
		var file = this.files[0]; //选择上传的文件
		var r = new FileReader();
		r.readAsDataURL(file); //Base64
		$(r).load(function(){
			$("#imageBoxz").html('<li class="pList">'+'<img src="'+ this.result +'" alt="评论截图" />'
			+'<input type="hidden" name="screenshot" id="screenshot" value="'+ this.result +'" />'+'</li>');
		});
		$(".zheng").css("opacity","0");
		$(".zheng").attr("title","点击更换");
		$(".zhengImg").css("display","none");
		$(".loading").show();
		$("#mask").show();
		ajax1();
		
		//$(function(){setInterval(ajax1,1000);});
	});
	
	function ajax1()
	{
		setTimeout(function () {
			if(!$("#screenshot").val()==''){
				//申明变量
				var screenshot = $("#screenshot").val();
				$.ajax({
					url : "http://webapi.30mifi.com/webapi/upload/img.json",
					data: {
						"callback":"callback",
						"screenshot":""+screenshot+""
					},		
					dataType : "json",
					type : "post",
					async : true,
					success : function(json) {
						console.log(json);
						if(json.returnCode == 200){
							var banner = json.data;
							$(".loading").hide();
							$("#mask").hide();
							$(".inputBoxDiv1").hide();
							$(".inputBoxDiv").css("background","#fc8e1b").css("box-shadow","0px 4px 0px #ba7023");
							var inputindex = $(".inputBoxDiv").attr("index",banner);
						}else if(json.returnCode == 412){
							alert("上传失败，图片过大");
							$(".loading").hide();
							$("#mask").hide();
						}else if(json.returnCode == 500){
							alert("上传失败，请刷新页面");
							$(".loading").hide();
							$("#mask").hide();
						}
					}
				});
			}else{
			}
		}, 1000);
	}


	//提交表单
	$(".inputBoxDiv").click(function(){
		
		if($("#appstore").val() == ''){
			alert("请输入应用市场名称");
			return false;
		}else if($("#nickname").val() == ''){
			alert("请输入评论人昵称");
			return false;
		}else if($("#screenshot").val() == ''){
			alert("请上传评论截图");
			return false;
		}else{
			//申明变量
			var appstore = $("#appstore").val();
			var nickname = $("#nickname").val();
			var banner 	 = $(this).attr("index");
			//$("#inputBoxDiv").attr("type","submit");
			$(".inputBoxDiv1").show();
			$(".inputBoxDiv").css("background","#e0e0e0").css("box-shadow","0px 4px 0px #989898");
			$.ajax({
				type : "get",
				//http://webapi.30mifi.com/webapi/bargain/endpriceAndPeoples?inviteCode="+inviteCodeTxt+"
				url : "http://webapi.30mifi.com/webapi/userPositiveComment/upload?token="+userId+"&appstore="+appstore+"&nickname="+nickname+"&banner="+banner+"",
				dataType: "jsonp", 
				async : false,
				jsonp: "callback", //服务端用于接收callback调用的function名的参数  
				jsonpCallback: "callback", //callback的function名称,服务端会把名称和data一起传递回来  
				success : function(json){
					console.log(json);
					if(json.ReturnCode == 200){
						document.location.href = "list.html?userId="+userId+"";
					}else if(json.ReturnCode == 412){
						alert("参数错误。")
					}else{
						alert(json.message);
					}
				},
				error:function(json){
					//console.log(json);
				}
			});
			

		}
	});
	
});
