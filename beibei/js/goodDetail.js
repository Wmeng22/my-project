
$(function(){
	



//加载评论
$.ajax({
    	url:'comment.json',
    	type:'get',
    	async:true,
    	success:function(res){
    		updata(res);
    	}
})

    function updata(obj){
    	var data=obj.data;
    	var html="";
    	$.each(data, function() {
    		html += '<div class="comment"><span class="comment-content">';
    		html += '<div class="comment-body">'+this.title+'</div>';
    		html += '<div class="comment-author-baby">'+this.age+'</div>';
    		html += '<div class="comment-view-pic-box" style="height: 49px; margin-top: 16px;">';
    	    html += '<div class="comment-view-pic" style="margin-left: 0;"><img src="'+this.Img+'"></div></div></span>'; 
    	    html += '<span class="comment-item-info"><div op-each="itemInfo"><div>颜色：'+this.color+'</div>';
    	    html += '<div>尺码：'+this.size+'</div></div><div class="comment-tag"></div></span>';
    	    html += '<span class="comment-author"><div class="comment-author-name">'+this.name+'</div>';
    	    html += '<div class="comment-author-score"><div class="iconfont rate-score-bg"></div>'
    	    html += '<div class="rate-score-value" style="width :68px"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></div>';
    	    html += '</div></span></div>';
    	
    	});
    	$('.comments-box').append(html);
    	
    }
    
    
    
    
    //加载数据

    var index = location.search.replace("?","");
    
    $.ajax({
	type:"get",
	url:"good.json",
	success:function(res){
		
	    $('<img class="jiatu" jqimg="'+res.data[index].Img+'" src="'+ res.data[index].Img+'" alt="" />').appendTo($('.jqzoom'));   
	    $('<li><a href="#"><img src="'+res.data[index].Img1+'" alt="" /></a></li>').appendTo($('.inner ul'));
	    $('<li><a href="#"><img src="'+res.data[index].Img2+'" alt="" /></a></li>').appendTo($('.inner ul'));
	    $('<span class="title">'+res.data[index].title+'</span>').appendTo($('.h3'));
	    $('<em class="num">'+res.data[index].price+'</em>').appendTo($('.pink'));
	    $('<span class="oldNum">'+res.data[index].oldPrice+'</span>').appendTo($('.price-info'));
	    $('<li><img src="'+res.data[index].Img1+'" alt="" /><span>黑色</span></li>').appendTo($('.color'));
	    $('<li><img src="'+res.data[index].Img2+'" alt="" /><span>黄色</span></li>').appendTo($('.color'));
	    
        datagrid();
	    
	    //图片放大镜效果	
       $(".jqzoom").jqueryzoom({xzoom:200,yzoom:200});	
	}
    
   })
    
    
    
    
    
    
    
    
    
    
    function datagrid(){
    
    //点击加减数量
    var num=$('#num').val();
    $('.detial-number .down').click(function(){
    	num--;
    	if(num<=1){
    		num=1;
    	}
    	$('#num').val(num);
    })
    
    $('.detial-number .up').click(function(){
    	num++;
    	$('#num').val(num);
    	
    })
    
    //点击选择颜色
    var color;
    var Img;
    $('.color').find('li').click(function(){
    	$(this).parent('.color').find('li').css({"border": "1px solid #b8b7bd"});
    	$(this).css({"border":"2px solid #fa0d66"});
    	color=$(this).find('span').html();
    	Img=$(this).find('img').attr('src')
    })
    
    //点击选择尺码
    var size;
    $('.size').find('li').click(function(){
    	$(this).parent('.size').find('li').css({"border": "2px solid #b8b7bd"});
    	$(this).css({"border":"2px solid #fa0d66"});
    	size=$(this).find('b').html();
    	console.log(size)
    })

   
 //加入购物车
    $('.addshopcar').click(function(){
    	var title=$('.center h3 .title').html();
    	var price=$('.price-info .num').html();
    	var oldprice=$('.price-info .oldNum').html();
    	
    	var obj={'title':title,'Img':Img,'color':color,'size':size,'price':price,'oldprice':oldprice}
   	    var strCookie=$.cookie('good');
   	    var bGood=false;
   	    
   	    if(strCookie==""||strCookie==undefined){
   	  
	   	  	var oCookie=[];
	   	  	var newGood={'title':title,data:obj,num:num}
	   	  	oCookie.push(newGood)
   	    }else{
	   	  	var oCookie=JSON.parse(strCookie);
	   	  	$.each(oCookie, function() {
	   	  		if(this.title==title){
	   	  			
	   	  		//	var num=parseInt(this.num)+parseInt($('#inputnum').val());
	   	  			
	   	  		//	this.num=num;
	   	  			bGood=true;
	   	  		}
	   	  	});
   	    
   	        if(bGood==false){
   	  		var newGood = {"title":title,data:obj,num:num}
   	  		oCookie.push(newGood);
   	  	    } 	  
   	    }
   	    $.cookie("good",JSON.stringify(oCookie),{expires:7,path:"/"});
   	   console.log($.cookie("good"));
   	   
   	   
   	   //移除换上 去结算
   	   $(this).hide();
   	   $('.addbuy').show();
   	   
   	   //右侧购物车数量
	
	  	var totalnum=0;
	  	var totalmoney=0
	    var stCookie=$.cookie('good');
	    if(stCookie==""||stCookie==undefined){
	    	
	     totalmoney=0;
	
	    }else{
	  	
	    var oCookie=JSON.parse(stCookie);
	    var html="";
	    $.each(oCookie, function() {
	      html += '<li class="clear"><a href=""><img src="'+this.data.Img+'" alt="" /></a>';
	      html += '<p class="ititle">'+this.data.title+'<br />';
	      html += '<span>颜色：'+this.data.color+'</span><span>尺码：'+this.data.size+'</span></p>';   
	      html += '<p class="iprice">￥'+this.data.price+'</p><br /><span>x'+this.num+'</span></li>';  
	      var total=this.num*this.data.price;
		    	
		    	totalmoney += total;
	    });
	      $('.carlist').append(html);
	      $('.carNum').html(oCookie.length);
	      $('.mun').html(oCookie.length+'件商品');
	      $('.car-left .price').html('￥'+totalmoney);
	    }
	    
   	   
    	
    })

    //点击跳转到购物车
    $('.addbuy').click(function(){
		var sCookie = $.cookie('login');
		if(sCookie=="" || sCookie==undefined){
			window.location.href="login.html";
		}else{
			var obj = JSON.parse(sCookie);
			if(obj.type==true){
				window.location.href="shopcar.html";
			}else{
				window.location.href="login.html";
			}
		}
    	
    })


    }  //function datagrid() 到此结束







   //  固定在右侧的菜单
   $('.side-pansel').find('li').hover(function(){
   	
   	$('.car').hide();
   	$(this).find('.car').show();
   },function(){
   	$(this).find('.car').hide();
   })
	
	
 
    

   //点击到评论
   $('.d-comment').click(function(){
   	  var top=$('.dd-comment').offset().top;
   	  $('html,body').animate({
			scrollTop:top
	  },1000);
   })
   
   
   $('.go-car').click(function(){
   	    console.log("kk")
   	    var sCookie = $.cookie('login');
		if(sCookie=="" || sCookie==undefined){
			window.location.href="login.html";
		}else{
			var obj = JSON.parse(sCookie);
			if(obj.type==true){
				window.location.href="shopcar.html";
			}else{
				window.location.href="login.html";
			}
		}
   })
   
   
   //点击回到顶部
    $('.totop').click(function(){
    $('html,body').animate({
		scrollTop:0
	},1000)	

    })
   




	
})
