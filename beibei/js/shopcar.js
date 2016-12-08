$(function(){
	
	
	updata();
	var totalnum=0;
    var totalmoney=0;
	
	var strCookie=$.cookie('good');
	
    if(strCookie==""||strCookie==undefined){
    	
    	
	}else{
        var oCookie=JSON.parse(strCookie);
        var html="";
        $.each(oCookie, function(){
        	html += '<tr class="item-entry view-ItemEntry ">';
        	html += '<td class="cart-td-check first-for-ie"><input class="J_itemCheck" type="checkbox" checked="checked"></td>';   
        	html += '<td class="cart-td-item-info clearfix">';
		    html += '<a class="image" href="#"><img src="'+this.data.Img+'"></a>';
		    html += '<a class="title" href="#">'+this.data.title+'</a></td>';
		    html += '<td class="cart-td-item-sku"><p>颜色 :'+this.data.color+'</p><p>尺寸 :<span class="size" style="color: #888">'+this.data.size+'</span></p></td>';
		    html += '<td class="cart-td-item-price"><p class="view-ItemEntryPrice">'+this.data.price+'</p>';
		    html += '<p class="strike">'+this.data.oldprice+'.00元</p></td>';
            html += '<td class="cart-td-number"><div><a href="javascript:;" class="number-op del-num disable view-ReductionItemNumBtn"><i class="fa fa-minus"></i></a>';   
            html += '<input class="view-ItemEntryNum" type="text" value="'+this.num+'">';
            html += '<a href="javascript:;" class="number-op add-num view-AdditionItemNumBtn"><i class="fa fa-plus"></i></a></div>';
            var total=this.num*this.data.price;
            html += '<div class="cart-td-tip"><p class="view-ItemEntryNumTipPurchase tip-purchase"><i class="fa fa-plus"></i>限购<span>5</span>件</p></div></td>';
            html += '<td class="cart-td-subtotal"><span class="price view-ItemSubtotal">'+this.num*this.data.price+'.00元</span></td>';
            html += '<td class="cart-td-ops last-for-ie"><a class="view-DelItemBtn">删除</a></td></tr>';
            
            totalnum += this.num;
    	    totalmoney += total;
            
        });
    
        $(html).insertBefore($('.footer-entry'));
	}
	
	$('#totalnum').html(oCookie.length);
	$('.cart-payment').html('<b class="u-yen-icon">¥</b>'+totalmoney+'.00元');
	$('.view-EventTotal').html(totalmoney+'.00元');
	
	
	
//	点击加减按钮
   
    $('.del-num').click(function(){
    	var num=$(this).closest('div').find('.view-ItemEntryNum').val();
    	num--;
    	if(num<=1){
    		num=1;
    	}
    	$(this).closest('div').find('.view-ItemEntryNum').val(num);
    	var $price=$(this).parent().parent().siblings(".cart-td-item-price").find('.view-ItemEntryPrice').html();
    	var $mintotal=$price * num;
    	$(this).parent().parent().siblings(".cart-td-subtotal").find('.price').html($mintotal+'.00元');
    	
    	var oldCookie=$.cookie("good");
  	    var changeCookie=JSON.parse(oldCookie);
  	    
  	    var title=$(this).parent().parent().siblings(".cart-td-item-info").find('.title').html();
  	    
  	    $.each(changeCookie, function(index) {
	  		if(this.data.title==title){
	  		changeCookie[index].num=num;
	  		
	  		}
  	    });
  	    
  	$.cookie("good",JSON.stringify(changeCookie),{expirce:7,path:"/"});	
  	
  	updata();
    })
    
    
    //点击加按钮
    $('.add-num').click(function(){
    	
    	var num=$(this).closest('div').find('.view-ItemEntryNum').val();    	
    	num++;
    	$(this).closest('div').find('.view-ItemEntryNum').val(num);
    	var $price=$(this).parent().parent().siblings(".cart-td-item-price").find('.view-ItemEntryPrice').html();
    	var $mintotal=$price * num;
    	$(this).parent().parent().siblings(".cart-td-subtotal").find('.price').html($mintotal+'.00元');
    	
    	var oldCookie=$.cookie("good");
  	    var changeCookie=JSON.parse(oldCookie);
  	    
  	    var title=$(this).parent().parent().siblings(".cart-td-item-info").find('.title').html();
  	    
  	    $.each(changeCookie, function(index) {
	  		if(this.data.title==title){
	  		changeCookie[index].num=num;
	  		
	  		}
  	    });
  	    
  	$.cookie("good",JSON.stringify(changeCookie),{expirce:7,path:"/"});	
  	updata();
    	
    })
    
    
    //删除
    $('.view-DelItemBtn').click(function(){
    	var oldCookie=$.cookie("good");
  	    var clearCookie=JSON.parse(oldCookie);
  	    var title=$(this).parent().siblings(".cart-td-item-info").find('.title').html();
  	    $(this).parent().parent().remove();
  	    $.each(clearCookie, function(index) {
  	    	if(this.title==title){
  			clearCookie.splice(index,1)
  			
  		    }
  	    });
  	//重置商品信息
  	$.cookie("good",JSON.stringify(clearCookie),{expirce:7,path:"/"});	
  	    updata();
  	    
    })
    
    
    
	function updata(){
		//获取商品数量
	  	var totalnum=0;
	  	var totalmoney=0
	    var stCookie=$.cookie('good');
	    if(stCookie==""||stCookie==undefined){
	    	
	     totalmoney=0;
	
	    }else{
	  	
	    var oCookie=JSON.parse(stCookie);
	    
	    $.each(oCookie, function() {
	      var total=this.num*this.data.price;
	    	
	    	totalmoney += total;
	    	
	    });
	
	    }
	   $('#totalnum').html(oCookie.length);
	   $('.cart-payment').html('<b class="u-yen-icon">¥</b>'+totalmoney+'.00元');
	   $('.view-EventTotal').html(totalmoney+'.00元');
	   
	   if(oCookie.length==0){
	   	$('.pure-table').remove();
  	    $('.cart-list').remove();
  	    
  	    $('.car-empty').show();
	   }
	}
	
	
	//点击清空
	$('#cartRemoveChecked').click(function(){
		var oldCookie=$.cookie("good");
	  	var clearCookie=JSON.parse(oldCookie);
	  	clearCookie.splice(0,clearCookie.length);
	  	
	  	//重置商品信息
	  	$.cookie("good",JSON.stringify(clearCookie),{expirce:7,path:"/"});
	    updata();
	})
	
	
	
	//点击单选框 
	$('.J_itemCheck').click(function(){
        var beforenum=0;
		$('.J_itemCheck').each(function(){
			
			if($(this).is(":checked")){
				var price=$(this).parent().siblings('.cart-td-item-price').find('.view-ItemEntryPrice').html();
		        var num=$(this).parent().siblings('.cart-td-number').find('.view-ItemEntryNum').val();
			    var mintotol=price*num;
			    beforenum += mintotol;
			}
		})
		var $totalnum=$('.J_itemCheck').filter(":checked").length;
		$('#totalnum').html($totalnum);
		$('.cart-payment').html('￥'+beforenum+'.00元');
		$('.J_checkAll').prop('checked',$('.J_itemCheck').length == $('.J_itemCheck').filter(":checked").length)
       
	})
	
	
	//点击全选
	$('.J_checkAll').click(function(){
		$('.J_itemCheck').prop('checked',this.checked);
		var beforenum=0;
		$('.J_itemCheck').each(function(){
			
			if($(this).is(":checked")){
				var price=$(this).parent().siblings('.cart-td-item-price').find('.view-ItemEntryPrice').html();
		        var num=$(this).parent().siblings('.cart-td-number').find('.view-ItemEntryNum').val();
			    var mintotol=price*num;
			    beforenum += mintotol;
			}
		})
		var $totalnum=$('.J_itemCheck').filter(":checked").length;
		$('#totalnum').html($totalnum);
		$('.cart-payment').html('￥'+beforenum+'.00元');
	})
	
	
	
	
	
	
})
