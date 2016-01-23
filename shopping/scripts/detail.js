/*点击左侧产品小图片切换大图*/
$(function(){
	$(".pro_detail_left ul li img").livequery("click",function(){
		var imgSrc = $(this).attr("src");
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0,i);
		var imgSrc_small = imgSrc + "_small" + unit;
		var imgSrc_big = imgSrc + "_big" + unit;
		$("#bigImg").attr({"src":imgSrc_small, "jqimg":imgSrc_big});
		$("#thickImg").attr("href",imgSrc_big);
	});



	
	/********************产品属性介绍**************************/
	var $div_li = $("div.tab_menu ul li");
	$div_li.click(function(){
		$(this).addClass("selected")
				.siblings().removeClass("selected");

		var index = $div_li.index(this);
		$("div.tab_box >div").eq(index).show()
							.siblings().hide();
	}).hover(function(){
		$(this).addClass("hover");
	},function(){
		$(this).removeClass("hover");
	});



	/**********************颜色选择************************/
	$(".color_change ul li img").click(function(){           
		  var imgSrc = $(this).attr("src");
		  var i = imgSrc.lastIndexOf(".");
		  var unit = imgSrc.substring(i);
		  imgSrc = imgSrc.substring(0,i);
		  var imgSrc_small = imgSrc + "_one_small"+ unit;
		  var imgSrc_big = imgSrc + "_one_big"+ unit;
		  $("#bigImg").attr({"src": imgSrc_small ,"jqimg": imgSrc_big });
		  $("#thickImg").attr("href", imgSrc_big);
		  var alt = $(this).attr("alt");
		  $(".color_change strong").text(alt);
		  var url = imgSrc+".html";
		  $(".pro_detail_left ul.imgList")
				.empty()
				.load(url);
	});
});


/*衣服尺寸选择*/
$(function(){
	$(".pro_size li span").click(function(){
		$(this).parents("ul").siblings("strong").text(  $(this).text() );
	})
})
/*数量和价格联动*/
$(function(){
    var $span = $("div.pro_price span");
	var price = $span.text();	
	$("#num_sort").change(function(){
	    var num = $(this).val();
		var amount = num * price;
		$span.text( amount );
	}).change();
})


/*商品评分效果*/
$(function(){
	//通过修改样式来显示不同的星级
    $("ul.rating li a").click(function(){
	     var title = $(this).attr("title");
	     alert("您给此商品的评分是："+title);
		 var cl = $(this).parent().attr("class");
		 $(this).parent().parent().removeClass().addClass("rating "+cl+"star");
		 $(this).blur();//去掉超链接的虚线框
		 return false;
	})
})



/*最终购买输出*/
$(function(){
    var $product = $(".pro_detail_right");
	$("#cart a").click(function(){
        var pro_name = $product.find("h4:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color =  $(".color_change strong").text();
		var pro_num = $product.find("#num_sort").val();
	    var pro_price = $product.find(".pro_price span").text();
		var dialog = " 感谢您的购买。\n您购买的\n"+
		        "产品是："+pro_name+"；\n"+
				"尺寸是："+pro_size+"；\n"+
				"颜色是："+pro_color+"；\n"+
				"数量是："+pro_num+"；\n"+
				"总价是："+pro_price +"元。";
		if( confirm(dialog) ){
			alert("您已经下单!");
		}
		return false;//避免页面跳转
	})
})