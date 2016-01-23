$(function(){
	$("form :input.required").each(function(){

		var $required = $("<strong class='high'> *</strong>");
		$(this).parent().append($required);
	});

	$("form :input").blur(function(){
		var $parent = $(this).parent();
		$parent.find(".formtips").remove();
		//验证用户名
		if($(this).is('#username')){
			if(this.value == "" || this.value.length < 6){
				var errorMsg = '请输入至少6位的用户名。';
				$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
			}
			else{
				var okMsg = '输入正确。';
				$parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
			}
		}

		//验证邮箱
		if($(this).is("#email")){
			if(this.value == "" || (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value))){
				var errorMsg = '请输入正确的E-Mail地址。';
				$parent.append('<span class="formtips onError">' + errorMsg + '</span>');
			}
			else{
				var okMsg = '输入正确';
				$parent.append('<span class="formtips onSuccess">' + okMsg + '</span>');
			}
		}
	}).keyup(function(){
		$(this).triggerHandler("blur");
	}).focus(function(){
		$(this).triggerHandler("blur");
	});

	$("#send").click(function(){
		$("form .required:input").trigger('blur');
		var numError = $('form .onError').length;
		if(numError){
			return false;
		}
		alert("注册成功，密码已发到你的邮箱，请查收。");
	});
});