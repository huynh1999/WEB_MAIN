function bindMenu(){
///////////// GNB start ///////////////
	var ulWidth = $(".gnbMenu").find("ul").innerWidth(); //ul 넓이 저장

	$(".gnbMenu.default  .menu_btn").on("click",function(){
		$(this).addClass("onClk");
		$(this).next().addClass("on");
	}); //페이지 로딩시 한번만 보이는 menu open 버튼

	// class 세팅 start //
	$(".gnbMenu .menu_area>ul>li").addClass("depth01"); //최상위 depth인 li 에 class 추가
	$(".gnbMenu li").each(function(){
		if($(this).children(".txt").next("ul").length > 0){$(this).children(".txt").addClass("parent");} //서브메뉴가 있는 li 에 class 추가 (노 링크 버튼)
		else{$(this).addClass("last");} //서브메뉴가  없는 li 에 class 추가 (링크 버튼)
	});
	// class 세팅 end //

	$(".gnbMenu ul li .txt").on("click",function(){
		if($(this).parent().hasClass("last") && !$(this).parent().hasClass("select") && !$(this).parent().hasClass("here")){ //링크 버튼 클릭 시(메뉴 네비 생성)
			if($(this).parents(".depth01").hasClass("select") && !$(this).parents(".depth_sub.selected").hasClass("here")){
				//alert ("클릭 된 메뉴가 select 에만 속할 때")
				$(".gnbMenu .here").remove();
				$(".gnbMenu li").removeClass("select");
			} else if($(this).parents(".depth01").hasClass("select") && $(this).parents(".depth_sub.selected").hasClass("here")) {
				//alert ("클릭 된 메뉴가 select 과 here 에 모두 속할 때")
				$(".gnbMenu .depth01.here").remove();
				$(this).parent().parents(".here.selected").prev(".select").remove();
				$(this).parent().parents(".select.depth_sub").next(".here.selected").remove();
				$(".gnbMenu li").removeClass("depth_sub");
				$(".gnbMenu li").removeClass("here selected");
			} else {
				//alert ("디폴트 - 클릭 된 메뉴가 here 에 속할 때")
				$(".gnbMenu .select").remove();
				$(".gnbMenu li").removeClass("here");
			}

			// 메뉴 네비 생성 start //
			if($(".gnbMenu").hasClass("default")){$(".gnbMenu").removeClass("default").addClass("route");}
			$(this).parents("li").each(function() {$(this).addClass("select depth_sub");});
			$(".gnbMenu .depth01").removeClass("selected depth_sub");
			$(".gnbMenu .last").removeClass("depth_sub");
			$(".gnbMenu .select").each(function(){
				$(this).after($(this).clone(true)).next().removeClass("select").addClass("here").find(".select").removeClass("select").addClass("here");
				$(this).parent("ul").css("left",$(this).parents(".select").width());
			});
			$(".gnbMenu .here").each(function() {$(this).addClass("selected");});
			$(".gnbMenu ul").each(function(){ // ul 넓이 세팅
				var liWidth = $(this).children("li.select").innerWidth();
				if(ulWidth >= liWidth){
					$(this).css("width",ulWidth);
				}else{
					$(this).css("width",liWidth);
				}
			});
			// 메뉴 네비 생성 end //

			reset_style();
		}else{ //메뉴 링크 외 버튼 클릭 시 (단순 하위메뉴 show,hide 기능)
			if($(this).parent().hasClass("select")){
				$(".gnbMenu .txt").removeClass("onClk");
				$(".gnbMenu ul").find(".txt").removeClass("over");
				$(".gnbMenu ul").removeClass("on hover");
			}
			$(this).parent(".select").each(function(){
				$(this).children(".txt").addClass("onClk");
				$(this).parent("ul").addClass("on");
			});
		}
		return false;
	});

	// 마우스 오버,아웃 start //
	$(".gnbMenu ul li").on("mouseenter focus",function(){
		$(this).parent("ul").find(".txt").removeClass("over");
		$(this).parent().find("ul").removeClass("on hover");

		if($(this).hasClass("select")){}
		else {
			$(this).children("ul").css("left",$(this).width());
			$(this).children(".txt").addClass("over");
			$(this).children(".txt").next().addClass("on hover");
		}
	});
	$(".gnbMenu").on("mouseleave",function(){
		setTimeout(function () {
			reset_style();
		}, 500);
	});
	// 마우스 오버,아웃 end //
	function reset_style (){ // GNB RESET STYLE
		$(".gnbMenu .menu_btn").removeClass("onClk");
		$(".gnbMenu .txt").removeClass("onClk");
		$(".gnbMenu ul").find(".txt").removeClass("over");
		$(".gnbMenu ul").removeClass("on hover");
	}
///////////// GNB end ///////////////
}

$(document).ready(function(){
	//라디오, 체크박스
	$("input[type=checkbox]").each(function(){
		if($(this).is(":checked")) {$(this).parent().find("label").addClass("checked");}
	});
	$("input[type=radio]").each(function(){
		if($(this).is(":checked")) {$(this).parent().find("label").addClass("checked");}
	});
	$("input[type=checkbox]").on("click",function(){
		if($(this).is(":checked")) {$(this).parent().find("label").addClass("checked");}
		else {$(this).parent().find("label").removeClass("checked")}
	});
	$("input[type=radio]").on("click",function(){
		name = $(this).attr("name");
		if($("input[name="+name+"]").is(":disabled")){return false}
		else {
			$("input[name="+name+"]").parent().find("label").removeClass("checked");
			$(this).parent().find("label").addClass("checked")

		}
	});
});
