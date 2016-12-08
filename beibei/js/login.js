$(function(){
	
	
    //登陆
    $('#login').click(function(){
	    if($('#username-dl').val()!="" && $('#password-dl').val()!=""){
	     
	     var sCookie = $.cookie('user');
		 if(sCookie==undefined || sCookie==""){
			
		  alert('用户没有注册');
		 }else{
				var bRegister = false;
				var flag=false;
				var aCookie=JSON.parse(sCookie);
				$.each(aCookie,function(){
					
					if(this.user==$('#username-dl').val()&&this.psw==$('#password-dl').val()){
						bRegister = true;
					}
					if(this.user==$('#username-dl').val()&&this.psw!=$('#password-dl').val()){
						flag = true;
						
					}
				})
				if(flag){
					$('.notice').show();
					return;
				}
				if(bRegister){
					console.log("登陆成功");
					var obj={type:true,name:$('#username-dl').val()}
					
					location.href="shopcar.html";
				}else{
					alert('用户没有注册');
				    var obj = {type:false};
				}
				
				$.cookie('login',JSON.stringify(obj),{expires:7 , path:"/"});
				console.log($.cookie('login'));
		    }
	     
	    }
    })
     











})