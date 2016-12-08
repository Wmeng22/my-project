
$(function(){
	
//导航轮播图

	var index=0;
	show();
	function show(){
		
		if(index==$('.carousel').find('li').length){
					index =0;//显示第一张图片
					
				}else if(index<0){
					
					index=2;
					
				}
		
   	$('.carousel').find('li').eq(index).stop().animate({
   		'opacity':1
   	},200).siblings().stop().animate({'opacity':0},500);
   	
   $('.cricle').find('li').eq(index).css('background','#FF5482').siblings().css('background','#868686');
   }
   var timer = setInterval(fAnimate,3000)
   function fAnimate(){
	index++;
	show();
   }
   $('.cricle').find('li').mouseenter(function(){
	
	index = $(this).index();
	show();
  })	
	
	
 //  固定在右侧的菜单
   $('.side-pansel').find('li').hover(function(){
   	
   	$('.car').hide();
   	$(this).find('.car').show();
   },function(){
   	$(this).find('.car').hide();
   })
	
	
 //购物车数量
	
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
   
   
   
	
	
	
	
	
	
	
	

//轮播图
$('#over').cxSlide({
	btn:false,
	speed:1000,
	time:2000,
	type:'x'
});	

//懒加载
 var num=0;
 $.ajax({
		type:"get",
		url:"index.txt",
		
		success:function(res){
			
			num++;//表示刷新一次
			update(res);
		}
	});
	
   function update(obj){
		
		obj = JSON.parse(obj);
		console.log(typeof obj);
		var data = obj.data;
		$.each(data,function(){
		 var $li=$('<li/>');
		 $li.append($('<div class="img"><img src="'+this.Img+'" alt="" /></div>'));
		 $li.append($('<div class="message"><div class="time"><i class="fa fa-clock-o"></i><span>剩余：</span><span class="djs2"></span></div><div class="description"><h3>'+this.message+'</h3><p>'+this.content+'</p></div><div class="youhui">'+this.shangping+'</div><div class="temai"><span class="enter-btn">'+this.price+'</span><span>折起特卖>></span></div></div>'));	

		 $('.contain .contain-left .aa').append($li);
		 
		 
		})
		
		
		$('.contain-left .aa').find('li').hover(function(){
	  	$(this).find('.temai').css('background','#ff4965');
	  	$(this).find('.temai span').css('color','#fff');

        },function(){
        $(this).find('.temai').css('background','#fff');
        $(this).find('.temai span').css('color','#ff4965');
        })
		
		//倒计时
		$('.djs2').daojishi({endTime:'2016/12/16'});
		
	}
	//滚动事件
	$(window).scroll(function(){

		var current = $(document).scrollTop();
		var winHeight = $(window).height();  //得到了屏幕的高度；
		var documHeight = $(document).height(); //当前页面的高度
		

		//当滚动距离 距离底部100px的时候会进入判断
		//加上刷新次数
		if(current +winHeight >= documHeight-100  && num< 10){
			console.log('进来了');
			console.log(num);
			//应该使用ajax 刷新界面
			$.ajax({
				type:"get",
				url:"index.txt",
				
				success:function(res){
					num++;//又刷新了一次
					update(res);
				}
			});
		}
		
		
//		显示隐藏在顶部的菜单
		if(current>200){
			$('.wrap-fixed').show();
		}else{
			$('.wrap-fixed').hide();
		}
		
		
	})
	

    //点击回到顶部
    $('.totop').click(function(){
    $('html,body').animate({
		scrollTop:0
	},1000)	

    })


	
	
	
})
