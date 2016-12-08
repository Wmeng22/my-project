
$(function(){
	
	$.idcode.setCode();   //加载生成验证码方法
    
    
    
	$('.register').click(function(){
		var reg1=/\d{11}/;
		var result1=reg1.test($('#phnoe-number').val());
		//验证码
		var result2 = $.idcode.validateCode();
		
		var reg3=/\w{6,16}/;
		var result3 = reg3.test($('#password').val());
		if(!result1){
			$('.notice1').show();
			return;
		}
		if(!result2){
			$('.notice2').show();
			return;
		}
		if(!result3){
			$('.notice3').show();
			return;
		}
		
		
//		验证是否已经注册
		var newSuer = {user:$('#phnoe-number').val(),psw:$('#password').val()};
        var sCookie=$.cookie('user');
        if(sCookie==""||sCookie==undefined){
    	var aCookie=[];
    	aCookie.push(newSuer);
    	alert("用户注册成功")
        }else{
    	var aCookie=JSON.parse(sCookie);
    	var bRrg=false;
    	$.each(aCookie, function() {
    		if(this.user==$('#phnoe-number').val()){
									bRrg=true;
								}
    	});
    	if(bRrg){
			alert("该用户已注册，请重新注册");
			
		}else{
			//在用户信息数组中添加新的用户
			aCookie.push(newSuer);
			alert("用户注册成功")
		}
    	
    }

    $.cookie('user',JSON.stringify(aCookie),{expires:7 , path:"/"});

    
    console.log($.cookie('user'));
//	location.href = "index.html";
	
	}) 
		
		
		
		
	
	
	
	
	
	
	
	
	
	
	
	
	
})
