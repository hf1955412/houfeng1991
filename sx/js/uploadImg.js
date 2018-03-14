window.onload=function(){ 
	var imgNum = 0;
	//定义获取对象的方法
	function $(id) {
		return document.getElementById(id);
	}
	var filesInput = $("filesInput"),
		info = $("info"),
		imageBox = $("bg");
	//定义存放图片对象的数组
	var uploadImgArr = [];
	//防止图片上传完成后，再点击上传按钮的时候重复上传图片
	var isUpload = false;
	//定义获取图片信息的函数
	function getFiles(e) {
		isUpload = false;
		e = e || window.event;
		//获取file input中的图片信息列表
		var files = e.target.files,
		//验证是否是图片文件的正则
		reg = /image\/.*/i;
		//console.log(files);
		for (var i = 0,f; f = files[i]; i++) {
			//console.log(f);
			uploadImgArr.push(f);
			var reader = new FileReader();
			//类似于原生JS实现tab一样（闭包的方法），参见http://www.css119.com/archives/1418
			reader.onload = (function(file) {
				//获取图片相关的信息
				var fileSize = (file.size / 1024).toFixed(2) + "K",
				fileName = file.name,
				fileType = file.type;
				//console.log(fileName)
				return function(e) {
					//console.log(e.target)
					//获取图片的宽高
					var img = new Image();
					img.addEventListener("load", imgLoaded, false);
					img.src = e.target.result;
					function imgLoaded() {
						imgWidth = img.width;
						imgHeight = img.height;
						//图片加载完成后才能获取imgWidth和imgHeight
						imageBox.innerHTML += "<li class='pList' id='pList"+imgNum+"'><img src='" + e.target.result + "' alt='" + fileName + "' title='" + fileName + "' /><p class='close'>关闭</p><span class='sizeBox' id='sizeBox"+imgNum+"'></span><input type='hidden' name='screenshot' value='" + e.target.result + "' /></li>";
						imgNum++;
					}
				}
			})(f);
			//读取文件内容
			reader.readAsDataURL(f);
		}
		//console.log(uploadImgArr);
	}
	if (window.File && window.FileList && window.FileReader && window.Blob) {
		filesInput.addEventListener("change", getFiles, false);
	} else {
		info.innerHTML = "您的浏览器不支持HTML5长传";
		info.className="tips";
	}
}
