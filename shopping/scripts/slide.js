$(function(){
		/*****************模块展开和关闭****************/
		 $(".module_up_down").toggle(function(){
					var $self = $(this);
					$self.prev().slideToggle(600,function(){
						  $("img",$self).attr("src","images/up.gif");
					});
			 },function(){
					var $self = $(this);
					$self.prev().slideToggle(600,function(){
						  $("img",$self).attr("src","images/down.gif");
					});
		 });



		 /********************自动滚动功能**************************/ 

		 var $this = $(".scrollNews");
		 var scrollTmer;
		 $this.hover(function(){
		 	clearInterval(scrollTmer);
		 },function(){
		 	scrollTmer = setInterval(function(){
		 		scrollNews($this);
		 	},3000);
		 }).trigger("mouseleave");

		 /*************************展开收回功能*****************************/
		 $(".m-treeview >li >span").click(function(){
		 	var $ul = $(this).siblings("ul");
		 	if($ul.is(":visible")){
		 		$(this).parent().attr("class","m-collapsed");
		 		$ul.hide();
		 	}
		 	else{
		 		$(this).parent().attr("class","m-expanded");
		 		$ul.show();
		 	}
		 	return false;
		 });



		 /*************************广告滚动效果****************************/
		 var len = $(".num >li").length;
		 var index = 0;
		 var adTimer;
		 $(".num >li").mouseover(function(){
		 	index = $(".num li").index(this);
		 	showImg(index);
		 }).eq(0).mouseover();           //初始化 页面默认显示第一个

		 //滑入停止动画，滑出开始动画
		 $(".ad").hover(function(){
		 	clearInterval(adTimer);
		 },function(){
		 	adTimer = setInterval(function(){
		 		showImg(index);
		 		index++;
		 		if(index == len)
		 			index = 0;
		 	},3000);
		 }).trigger("mouseleave");


		 /***********************产品列表横向滚动**************************/
		 var page = 1;
		 var i = 4;
		 var leng = $(".prolist_content ul li").length;
		 var page_count = Math.ceil(leng / i);
		 var none_unit_width = $(".prolist").width();
		 var $parent = $(".prolist_content");
		 //向右
		 $(".goRight").click(function(){
		 	if(!$parent.is(":animated")){
		 		if(page == page_count){         //最后一部分，跳至首部
		 			$parent.animate({left:0},800);
		 			page = 1;
		 		}
		 		else{
		 			$parent.animate({left:'-=' + none_unit_width},800);
		 			page++;
		 		}
		 	}
		 });
		 //向左
		 $(".goLeft").click(function(){
		 	if(!$parent.is(":animated")){
		 		if(page == 1){
		 			$parent.animate({left:'-=' + none_unit_width*(page_count-1)},800);
		 			page = page_count;
		 		}
		 		else{
		 			$parent.animate({left:'+=' + none_unit_width},800);
		 			page--;
		 		}
		 	}
		 });



		 /**************************产品列表的放大镜效果***************************/
		  $(".content_right .prolist ul li").each(function(index){
			  var position = $(this).position();
			  var li_left = position.left;
			  var li_top = position.top;
			  var img_width = $(this).find("img").width();
			  var img_height = $(this).find("img").height();
              var spanHtml = '<span style="position: absolute; top: '+li_top+'px; left: '+li_left+'px; width:'+img_width+'px; height: '+img_height+'px; cursor: pointer;" class="imageMask"></span>';
			  $(spanHtml).hover(function(){
						$(this).addClass("imageOver");
				    },function(){
						$(this).removeClass("imageOver");
				 }).appendTo( $(this).find("a") );
		 });
});

function scrollNews(obj){
	var $self = obj.find("ul:first");
	var lineHight = $self.find("li:first").height();
	$self.animate({"marginTop":-lineHight + "px"}, 600,function(){
		$self.css({marginTop:0}).find("li:first").appendTo($self);
	});
}

function showImg(index){
	var adHeight = $(".content_right .ad").height();
	$(".slider").stop(true,false).animate({top:-adHeight*index},1000);
	$(".num li").removeClass("on")
				.eq(index).addClass("on");
}