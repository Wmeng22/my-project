
function loadHtml(url,targetId,fn){
	$.ajax({
		url:url,
		dataType:'html',
		async:'false',
		success:function(res){
            $('#'+targetId).html(res);
            if(fn!=undefined){
                fn();
            }
		}

	})
}





	
	
	

