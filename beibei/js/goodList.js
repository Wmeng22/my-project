
$(function(){
	$(window).scroll(function(){
		var current = $(document).scrollTop();
		//		显示隐藏在顶部的菜单
		if(current>200){
			$('.wrap-fixed').show();
		}else{
			$('.wrap-fixed').hide();
		}

	})
	
	
	
 
//  动态加载数据
    $.ajax({
    	url:'good.json',
    	type:'get',
    	async:true,
    	success:function(res){
    	
    		
        var total=res.data.length;
    	console.log(total);
    	var pageSize=res.pageSize;
        var pageCount = total%pageSize == 0 ? total%pageSize : Math.ceil(total%pageSize);//总的页数
    	var lastPage=total%pageSize;
    	var index = 0;
        var start = 0;	
    	
    	var $html=$('.l-content ul');
    	function updata(){
    		$html.html("");
    		start = index * pageCount;
			console.log("start:" +start);
			var html = "";
			if(lastPage!=0){
				if(index < pageCount - 1){
					for(var i = start; i < start + pageSize; i++){
					    html += '<li><a target="_blank" href="goodDetail.html?' + i + '"><img src="'+res.data[i].Img+'" alt="" />';
				        html += '<p>'+res.data[i].title+'</p>';
				        html += '<span class="price-fo"><span class="symbol">￥</span><span class="int">'+res.data[i].price+'</span>';  
				        html += '<span class="account">'+res.data[i].account+'</span></span></a></li>';
				    } 
				    $html.append(html);
				}else{
					for(var i = start;i < start + lastPage;i++){
						html += '<li><a target="_blank" href="goodDetail.html?' + i + '"><img src="'+res.data[i].Img+'" alt="" />';
				        html += '<p>'+res.data[i].title+'</p>';
				        html += '<span class="price-fo"><span class="symbol">￥</span><span class="int">'+res.data[i].price+'</span>';  
				        html += '<span class="account">'+res.data[i].account+'</span></span></a></li>';
					}
					$html.append(html);
				}
				
			}else{
		        for(var i = start; i < start + pageSize; i ++){
				        html += '<li><a target="_blank" href="goodDetail.html?' + i + '"><img src="'+res.data[i].Img+'" alt="" />';
				        html += '<p>'+res.data[i].title+'</p>';
				        html += '<span class="price-fo"><span class="symbol">￥</span><span class="int">'+res.data[i].price+'</span>';  
				        html += '<span class="account">'+res.data[i].account+'</span></span></a></li>';
					}
					$html.append(html);
		            
			}
    		
    		
        };
    	
    	updata();
    	
//  	页数按扭
        var btns = $(".pagination");
        function pagebtn(){
			if(btns.find('a').length == 0){
				btns.append($('<span class="upage">上一页</span>'));
				for(var i = 0; i < pageCount; i++){
						var a = $('<a></a');
						a.html(i+1);
						btns.append(a);
						if(i == 0){
							a.css({"background":"#FF5482","color":"#fff"});
						}
				}
				btns.append($('<span class="next-page">下一页</span>'));
				
            }
        }
        
    	pagebtn();
    	
    	btns.on('click','a',function(){
			$(this).parent(".pagination").find('a').css({"background":"#fff","color":"#777"});    		
			$(this).css({"background":"#FF5482","color":"#fff"});
           	index = $(this).html() - 1;  //记录下标
			updata();
    		
    	})
    	
//  	点击上一页
    	$('.upage').click(function(){
    		index--;
   			if(index <= -1){
   				index = 0;
   			}
			$(".pagination").find('a').css({"background":"#fff","color":"#777"});    		
   			
           	$('a',btns).eq(index).css({"background":"#FF5482","color":"#fff"});
   			updata();
    	})
    	
//  	点击下一页
    	$('.next-page').click(function(){
    		index++;
   			if(index >= pageCount-1){
   				index = pageCount-1;
   			}
			$(".pagination").find('a').css({"background":"#fff","color":"#777"});    		
   			
           	$('a',btns).eq(index).css({"background":"#FF5482","color":"#fff"});
   			updata();
    	})
    	
    	
    	
    	
    	
    	
    	
    	}
    })   //ajax到此结束
    
   
    
 
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

 
 
 
 
 
 
 
 
 
 
 
 
	
	
})
