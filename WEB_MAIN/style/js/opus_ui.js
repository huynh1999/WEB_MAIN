// 이벤트 타입 분기 (모바일.태블릿 / PC)
var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'Windows CE;', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson', 'Mobile', 'Symbian', 'Opera Mobi', 'Opera Mini', 'IEmobile');
for (var word in mobileKeyWords){
	
	if (navigator.appVersion.indexOf("MSIE 8")) {
		//IE8 
		eventType_mounseEnter	= "mouseenter";
		eventType_click			= "click";
		eventType_mouseUp		= "mouseup";
		eventType_mouseDown		= "mousedown";
		
	} else if (navigator.userAgent.match(mobileKeyWords[word]) == null){
		eventType_mounseEnter	= "mouseenter";
		eventType_click			= "click";
		eventType_mouseUp		= "mouseup";
		eventType_mouseDown		= "mousedown";		
	} else {
		//Tablet PC
		eventType_click ,
		eventType_mounseEnter,
		eventType_mouseUp		= "touchend";
		eventType_mouseDown		= "touchstart";
	}
}


//절대좌표 영역(TOP/GNB)등 수치정보 전역변수 처리, [ W = width , H = height ]
var utilBar_H			= 26;	// (div class="util_bar") 상단 logo, util btns 영역
var location_H			= 24;	// (div class="location") page_title_area 현재 메뉴 navi 출력영역
var gnbHideShowBtn_W	= 36;	// (button class="btn_gnb_hide") GNB Show / Hide 버튼 
var menuInterval = null; /*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
function hideMenuError(){
	try {
			var el = $(document).find('.gnb_wrap');
			if (el.offset().left !== 0 && el.find(".gnb_now").length > 0) {
				el.stop().animate({
					width: el.find(".gnb_list").outerWidth() + 2,
					left:parseInt("-" + (el.find(".gnb_list").outerWidth() + 2))
				}, 0);
				el.find(".gnb_now").removeClass("gnb_now");
				
			}
	} catch (e) {}
}
function openAndCloseMenu (isShow ,isSetWidth, event){
	$(".gnb_wrap").css('z-index',990);
	$("#cIBTabMainDiv").css('z-index',-99);
	$(".gnb_wrap").css({ paddingTop: $(".page_title_area").outerHeight() + utilBar_H -1});
	$(".btn_gnb_hide").attr("disabled", true);
	var objAnimate = {
			left: 0
	}

	if (!isShow){
		$(".gnb_wrap").find(".gnb_now").removeClass("gnb_now");
		objAnimate.left = parseInt("-" + ($(".gnb_wrap").outerWidth() + 2));
	}	
	if (isSetWidth){
		objAnimate.width = $(".gnb_list").outerWidth() + 2;
	}
	$(".gnb_wrap").stop().animate(objAnimate, 250);
	$(".btn_gnb_hide").attr("disabled", false);

}
$(window).on('load', function(){
/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
//	if(window.name !== ''){
//		return false;
//	}
	var userId = $("#userId").val();
	
	/******************** INITIALIZE ********************/
	//select & wrap Top padding 
	/*
	setTimeout(function(){
		$(".wrap").css("padding-top", utilBar_H + $(".page_title_area").outerHeight());
		
		if(navigator.appVersion.indexOf("MSIE 9.0") != -1) {
			$("select").each(function(){
				$(this).addClass("ie9");
			});
		}
		//layer popup design
		$(".layer_popup_contents").css("padding-top",$(".layer_popup_title").outerHeight()-7);

	},10);
	*/
	
	/************** [GNB] INITIALIZE **************/
	// GNB positioning 
	$(".gnb_wrap").css("padding-top",utilBar_H + $(".page_title_area").outerHeight());
	// GNB SHOW,HIDE
	$(".gnb_2dpeth").css("visibility","visible");
	
	//메뉴 IE Scroll bug 
	//$(".gnb_wrap").css("left",parseInt("-" + ($(".gnb_list").outerWidth() + 2)));
	var browser = navigator.userAgent.toLowerCase();
	var isChrome = false;
	//console.log($(".gnb_list").outerWidth());
	if ( -1 != browser.indexOf('chrome') ){
		isChrome = true;
	}
	if(isChrome){//Chrome 
		$(".gnb_wrap").css("left",parseInt("-" + ($(".gnb_list").outerWidth() + 2)));
	}else{//ie 이면 
		var gnb_list_outerWidth = $(".gnb_list").outerWidth();
		if (gnb_list_outerWidth <=161){
			gnb_list_outerWidth =  177;
		}
		
		$(".gnb_wrap").css("left",parseInt("-" + (gnb_list_outerWidth + 7)));
	}
	
	$(".gnb_list > li").each(function(index){
			// var iIndex = $(this).context.children[0].getAttribute("index");
			var iIndex = this.children[0].getAttribute("index");
			$(this).addClass("menu_"+iIndex);
	});
	
	// GNB hide/show button (로고 하단 3선버튼) 
	$(".btn_gnb_hide").on(eventType_mounseEnter , function(event){
		$(".btn_gnb_hide > span").stop().fadeIn(150);
	}).mouseleave(function(event){
		$(".btn_gnb_hide > span").stop().fadeOut(150);
	});
	
	// GNB Show,Hide
	$(".btn_gnb_hide").on(eventType_click, function(event){
//		$(".gnb_wrap").css({ paddingTop: $(".page_title_area").outerHeight() + utilBar_H});
//		
//		if($(".gnb_wrap").offset().left == 0) {
//			$(".gnb_wrap").stop().animate({
//				left:parseInt("-" + $(".gnb_wrap").outerWidth())
//			},250);
//		} else {
//			$(".gnb_wrap").stop().animate({
//				left:0
//			},250);
//		}
		/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
		var isShow = false;
		if($(".gnb_wrap").offset().left != 0){
			isShow = true;
		}
		openAndCloseMenu(isShow ,false, event);
	});
	menuInterval = setInterval (function(){
		hideMenuError();	
	},200);
	// has child addClass
	$(".gnb_list > li").each(function(index) {
		// UL(sub depth) 가지고있는 li 에 has_chlid CLASS 추가 (디자인요소)
		$(this).has("ul").addClass("has_child");
		
	}).on(eventType_mounseEnter,function(event){
		if(!event.relatedTarget) {
			return;
		}
		if($(".gnb_wrap").is(":animated")) {
			$(".gnb_wrap").stop(true,true);
		} 
		
		$(this).addClass("gnb_now")
			   .siblings("li").removeClass("gnb_now")
			   .find(".gnb_now").removeClass("gnb_now");
		
		if(event.relatedTarget.tagName == "UL") {
			return;
		}
		
		// [2dpeth LIST]outer-width (GNB 최소 넓이) (border 두께 2)
		var min_width = $(".gnb_list").outerWidth() + 2;
		
		// 다른 하위 DEPTH 메뉴 display none
		$(this).siblings("li").find("div").stop().css("display","none");
			
		/************ GNB 펼침 **************/
		//if($(this).hasClass("has_child")){
		
		// 보여줄 하위 DEPTH 메뉴 left 좌표 지정
		//메뉴 IE Scroll bug  
		//$(this).children("div").css("display","inline-block").css("left",$(this).parent("ul").outerWidth());
		//console.log($(this).parent("ul").outerWidth());
		if(isChrome){//Chrome 
			$(this).children("div").css("display","inline-block").css("left",$(this).parent("ul").outerWidth());
		}else{//ie 이면 
			var ul_outerWidth = $(this).parent("ul").outerWidth();
			if (ul_outerWidth <=161){
				ul_outerWidth =  176;
			}
			
			$(this).children("div").css("display","inline-block").css("left",ul_outerWidth);
		}

		// 합쳐진 width 선언
		var widthMAX = $(this).children("div").width() + min_width;
		
		$(".gnb_wrap").css("max-width",widthMAX+30);
		$(".gnb_wrap").css("width",widthMAX);
			
		// 첫번째 sub menu 펼침
		$(this).find("div li > div").each(function(){
			if($(this).parent().index() == 0) {
				$(this).parent().addClass("sub_open");
				$(this).css({
					height:$(this).children("ul").height(),
					paddingTop:5,
					paddingBottom:15
				});
			} else {
				// $(this).parent().removeClass("sub_open");
				$(this).parent().addClass("sub_open");
				$(this).css({
					height:0,
					paddingTop:0,
					paddingBottom:0
				});
			}
		});
		
	});
	
	$(".gnb_list > li > div > ul > li > a").bind(eventType_click ,function(){
		$(this).parent().addClass("sub_open").siblings().removeClass("sub_open");
		
		$(this).next("div").stop(true,true).animate({
			height:$(this).next("div").children("ul").height(),
			paddingTop:5,
			paddingBottom:15
		},250);
		
		$(this).parent().siblings().children("div").each(function(){
			$(this).stop(true,true).animate({
				height:0,
				paddingTop:0,
				paddingBottom:0
			},250);
		});
	});
	
	
	//레이어팝업일때 (DIV)
	if(parent.document.getElementById(window.name) != null) {
		$(".pop_html").each(function(){
			// Layer POPUP CLOSE BTN (레이어팝업에서만 노출됨. window.open 의 경우 보이지않음) 
			$(this).addClass("layer_popup_document").children("body").after("<button type='button' class='pop_close ir' onclick='ComClosePopup();'>Close</button>");
			
		});

		// Layer POPUP contents 높이조절
		$(".layer_popup_contents").css("height",parseInt($(window).height() - 92));	//border + padding-top 55px SUM
		
	//window.open 팝업일때(Method)
	} else {
		// Layer POPUP contents 높이조절
		$(".layer_popup_contents").css("height",parseInt($(window).height() - 67));	//border + padding-top 55px SUM
		$("body").css("border-top-width","0px");
	}
	
	//Title area initialize
	$(".page_title_area .opus_design_btn").css("padding-left",$(".page_title").outerWidth()+20)
	$(".btn_gnb_hide").css("height",$(".page_title_area").outerHeight()-1);
	
	/***************************** Layout *****************************/
	//layout_change 버튼 now_layout class 제어
	$(".layout_change > button").bind(eventType_click,function(){
		$(this).addClass("now_layout").siblings().removeClass("now_layout");
	});
	
	//location show
	function location_show() {
		$(".page_title > button").addClass("toggle");
		$(".location").stop().animate({ height:location_H },250);
		$(".btn_gnb_hide").stop().animate({ height:$(".page_title_area").outerHeight() + location_H -1 },250);
		$(".gnb_wrap").stop().animate({ paddingTop: $(".page_title_area").outerHeight() + location_H + utilBar_H -1},250);
		$(".wrap").animate({paddingTop : utilBar_H + $(".page_title_area").outerHeight() + location_H},250);
	}

	//location hide
	function location_hide() {
		if($(".location").height() == 0 ) {
			return;
		}
		$(".page_title > button").removeClass("toggle");
		$(".location").stop(true,true).animate({ height:0 },250);
		$(".btn_gnb_hide").removeClass("toggle").stop(true,true).animate({ height:$(".page_title_area").outerHeight() - location_H -1 },250);
		$(".gnb_wrap").stop().animate({ paddingTop :$(".page_title_area").outerHeight() - location_H + utilBar_H -1},250);
		$(".wrap").animate({paddingTop : utilBar_H + $(".page_title_area").outerHeight() - location_H},250);
	}
	//location show/hide
	$(".page_title > button").click(function(){
		var max_height = 0;
		
		if ($(".location").is(":hidden")) {
			max_height = parseInt($('.over_wrap').css("max-height")) - $(".location").height();
			$('.over_wrap').css({"max-height":max_height+"px"}); 
			//$(".over_wrap").css("margin-top", $(".page_title_area").outerHeight()+ location_H);	

		} else {
			max_height = parseInt($('.over_wrap').css("max-height")) + $(".location").height();
			$('.over_wrap').css({"max-height":max_height+"px"});  
			//$(".over_wrap").css("margin-top", $(".page_title_area").outerHeight() - location_H);
		}			

		$(".location").toggle();
	});
	/*
	$(".page_title > button").click(function(){
		if(parseInt($(".location").css("height").replace("px","")) == 0) {
			location_show();
		} else if (parseInt($(".location").outerHeight()) >= location_H) {
			location_hide();
		}
	});
	*/
	
	//inquiry DIV(wrap_search) show/hide
	//inquiry_hide
	function inquiry_hide() {
		//wrap element find
		if ($(".wrap_search").length == 1) {
			var wrapElement = ".wrap_search";
		} else if ($(".wrap_search_tab").length == 1){
			var wrapElement = ".wrap_search_tab";
		} else {
			return;
		}
		
		$(wrapElement)
		.addClass("hideBorder")
		.stop(true,true)
		.animate({ 
			top:"-"+$(wrapElement).innerHeight(),
			marginBottom:"-"+$(wrapElement).innerHeight()
		},250);
	}
	//inquiry_show
	function inquiry_show() {
		//wrap element find
		if ($(".wrap_search").length == 1) {
			var wrapElement = ".wrap_search";
		} else if ($(".wrap_search_tab").length == 1){
			var wrapElement = ".wrap_search_tab";
		} else {
			return;
		}
		
		var vMarginBottom = 0;
		
		if(wrapElement == ".wrap_search_tab"){
			vMarginBottom = -37;
		}
		
		$(wrapElement)
		.removeClass("hideBorder")
		.slideDown()
		.animate({ 
			top:0,
			marginBottom:vMarginBottom,
			borderBottomWidth:1
		},250);
	}
	
	
	
	//layout_change 버튼클릭시 각 함수호출
	$(".layout_default").bind(eventType_click, function(){
		if(location.href.indexOf("/UserLogin") != -1) {
			return;
		}
		location_hide();
		inquiry_show();
	});
	$(".layout_hide").bind(eventType_click, function(){
		if(location.href.indexOf("/UserLogin") != -1) {
			return;
		}
		location_hide();
		inquiry_hide();
	});
	
	/******************** util_bar ********************/
	// preferences
	$(".util_setting").bind(eventType_click, function(){
		$(".preferences").animate({right:0}, 250);
		$(".favorite_links").animate({right:-414}, 250);
		$(".shortcut").animate({right:-642}, 250);
	});
	$("#prefer_save").bind(eventType_click, function(){
		$(".preferences").stop(true,true).animate({right:-320}, 250);
	});
	
	//favorite_links
	$(".util_fav").bind(eventType_click, function(){
		$(".favorite_links").stop(true,true).animate({right:0}, 250);
		$(".preferences").animate({right:-320}, 250);
		$(".shortcut").animate({right:-642}, 250);
	});
	
	//shortcut key
	$(".util_keyboard").bind(eventType_click, function(){
		$(".shortcut").stop(true,true).animate({right:0}, 250);
		$(".preferences").animate({right:-320}, 250);
		$(".favorite_links").animate({right:-414}, 250);
	});
	
	// 다른영역 클릭시 닫히는 부분
	$(this).on(eventType_click ,function(event){
		
		// popup일 경우 return
		if( location.href.indexOf("pop_mode") != -1 ) {
			return;
		}
		
		if( $(event.target).parents(".gnb_wrap").length == 0 ||
			$(event.target).parents(".preferences").length == 0 ||
			$(event.target).parents(".favorite_links").length == 0 ||
			$(event.target).parents(".shortcut").length == 0) {
			
			if( parseInt($(".preferences").css("right")) == 0 &&
				$(event.target).parents(".preferences").length == 0) {
				$(".preferences").stop(true,true).animate({right:-320}, 250);
			}
			
			
			if( parseInt($(".favorite_links").css("right")) == 0 &&
				$(event.target).parents(".favorite_links").length == 0) {
				
				$(".favorite_links").stop(true,true).animate({right:-414}, 250);
			}
			
			if( parseInt($(".shortcut").css("right")) == 0 &&
				$(event.target).parents(".shortcut").length == 0) {
				$(".shortcut").stop(true,true).animate({right:-650}, 250);
			}
			
			/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
			// GNB CLOSE
			if( $(event.target).attr("data-gnbbtn") != "on" && $(event.target).parents(".gnb_wrap").length == 0 && parseInt($(".gnb_wrap").css("left")) == 0) {
				openAndCloseMenu(false, true, event);
			}
		}
	});
	
	//calendar compnent
	$(".calendar_apply input").bind("load focusout",function(){
		if(this.value != "") {
			$(this).addClass("val");
		} else {
			$(this).removeClass("val");
		}
	});
//	if(navigator.appName.indexOf("Microsoft") != -1) {
//		//	return; -- Tu.Nguyen Dou comment: if have this row all function from line 412 not working in IE
//	} else {
	/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
		if(navigator.vendor.indexOf("Apple") != -1) {
			$("select").each(function(){ $(this).addClass("safari_select"); });
			$(".calendar_wrap").addClass("safari_calendar");
		}
//	}
	// float CLEAR element
	$(".opus_design_btn").each(function(){
		$(this).after("<span class='clear'></span>");
	});

	// FWD tab UI
	$(".opus_design_tab > li > a").bind("click", function(event){
        event.preventDefault();
        $(this).parent().addClass("nowTab").siblings().removeClass("nowTab");
    });
	
	// Select 3 Menu Level
	$("#menu_horz").click(function(){
		//checked TRUE (Default value)
		if($(this).prop("checked") == true){
			//Preference에서 체크되는 MENE LEVEL로 DB Update
			ajaxSendPost(setMenuLevel, 'reqVal', '&goWhere=aj&bcKey=setMenuLevel&f_menu_level=H&f_userId=' + userId, './GateServlet.gsl');
			
			$(".gnb_list > li > div").addClass("menu_horz");
		}
	});
	// Select 2 Menu Level
	$("#menu_arco").click(function(){
		
		//checked TRUE (Default value)
		if($(this).prop("checked") == true){
			
			//Preference에서 체크되는 MENE LEVEL로 DB Update
			ajaxSendPost(setMenuLevel, 'reqVal', '&goWhere=aj&bcKey=setMenuLevel&f_menu_level=A&f_userId=' + userId, './GateServlet.gsl');
			
			$(".gnb_list > li > div").removeClass("menu_horz");
		} 
	});
	
	// Select Bold Y
	$("#bold_yes").click(function(){
		//checked TRUE (Default value)
		if($(this).prop("checked") == true){
			//Preference에서 체크되는 MENE LEVEL로 DB Update
			ajaxSendPost(setBoldYn, 'reqVal', '&goWhere=aj&bcKey=setBoldYn&f_boldYn=Y&f_userId=' + userId, './GateServlet.gsl');
			
			$(".gnb_list > li > a").css("font-weight","bold");
		}
	});
	// Select Bold N
	$("#bold_no").click(function(){
		//checked TRUE (Default value)
		if($(this).prop("checked") == true){
			//Preference에서 체크되는 MENE LEVEL로 DB Update
			ajaxSendPost(setBoldYn, 'reqVal', '&goWhere=aj&bcKey=setBoldYn&f_boldYn=N&f_userId=' + userId, './GateServlet.gsl');
			
			$(".gnb_list > li > a").css("font-weight","normal");
		} 
	});
	
	// Select Theme White
	/*$("#theme_default").click(function(){
		//checked TRUE (Default value)
		if($(this).prop("checked") == true){
			//Preference에서 체크되는 MENE LEVEL로 DB Update
			ajaxSendPost(setUserTheme, 'reqVal', '&goWhere=aj&bcKey=setUserTheme&f_userTheme=1&f_userId=' + userId, './GateServlet.gsl');
			
			//$("#menu_level2_view").css("display","none");
			//$("#menu_level3_view").css("display","block");
		}
	});
	// Select Theme Blue - 현재 CSS 불안정. 추후 안정화되면 추가z 
	$("#theme_blue").click(function(){
		
		//checked TRUE (Default value)
		if($(this).prop("checked") == true){
			
			//Preference에서 체크되는 MENE LEVEL로 DB Update
			ajaxSendPost(setUserTheme, 'reqVal', '&goWhere=aj&bcKey=setUserTheme&f_userTheme=2&f_userId=' + userId, './GateServlet.gsl');
			
			//$("#menu_level3_view").css("display","none");
			//$("#menu_level2_view").css("display","block");
		} 
	});*/
	/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
	if (! /Android|webOs|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		$(".gnb_wrap").hover(null, function(){
			openAndCloseMenu(false, true);
		});
	}
	//OFVFOUR-7109 : Chrome v.89 issue - AR invoice with pop-up: 'Select TP has the [Cash on Delivery] status. Do you want to proceed? 
	var focusEle='';
	$('input').each(function(){
		$(this).attr('blur',$(this).attr('onblur'));
		$(this).removeAttr('onblur');
	})
	$('input').on('blur',function(){
		if(focusEle!=this){
			var opusUIEventOnBlur=$(this).attr('blur');
			focusEle=this;
			$(this).blur();
			focusEle='';
			eval(opusUIEventOnBlur);
		}else{
			focusEle='';
		}
	})
});


//브라우저 리사이즈시 - POPUP / GNB 등 절대좌표 요소들 Redesign
$(window).on("resize", function(event){
	var max_height = $(window).outerHeight() - 40;
	
	if ($("#wo_rePort")) {
		$("#wo_rePort").height(max_height - 10 + "px");
	}	
	
	if (max_height < 600) {
		max_height = max_height - ((600-max_height) * 0.04);	
	}
	
	// Location이 출력된 경우
	if ($(".location").is(":hidden") == false) {
		max_height = max_height - $(".location").height();
	}
	
	// button 이 2줄인 경우
	if ($(".opus_design_btn").height() > 50) {
		max_height = max_height - 30;
	}
	//#5690 [Impex] BUTTONS NOT RESIZING CORRECTLY BASED ON BROWSER SCREEN SIZE
	/*if ($(".opus_design_btn").height() > 80) {
		max_height = max_height - 30;
	}
	
	if ($(".opus_design_btn").height() > 100) {
		max_height = max_height - 30;
	}*/
	
	if ($("div").hasClass("wrap_search_tab")) {
		max_height = max_height - 5;
	}
	$('.over_wrap').css({"max-height":max_height+"px"});      

	
	$(".gnb_wrap").css({
		paddingTop : utilBar_H + $(".page_title_area").outerHeight()
	});
		
	
	/**** (GNB) REDESIGN ****/
	$(".gnb_2depth").css("max-width",$(window).width() - 225);
	$(".btn_gnb_hide").css("height",$(".page_title_area").outerHeight()-1);
	$(".gnb_2depth,.gnb_2depth ul").css("height",$(window).height() - ($(".header_fixed").outerHeight() + $(".page_title_area").outerHeight()));
	$(".wrap").stop().css("padding-top",$(".header_fixed").outerHeight() + $(".page_title_area").outerHeight());
	
	
	/**** (POPUP) REDESIGN ****/
	$(".layer_popup:eq(0)").css({
		marginTop:parseInt( "-"+ $(".layer_popup:eq(0)").outerHeight() /2),
		marginLeft:parseInt( "-"+ $(".layer_popup:eq(0)").outerWidth() /2)
	});
	
	//레이어팝업일때 (DIV)
	if(parent.document.getElementById(window.name) != null) {
		$(".layer_popup_contents").css("height",parseInt($(".layer_popup_contents").height() + window.innerHeight - $(".layer_popup_contents").height() - 92));
	//window.open 팝업일때(Method)
	} else {
		$(".layer_popup_contents").css("height",parseInt($(".layer_popup_contents").height() + window.innerHeight - $(".layer_popup_contents").height() - 67));
	}
	
	
	//popup resizeable
	$(".ui-resizable-e").on(eventType_mouseDown ,function(event){
		$(this).css({
			width:"1000px",
			right: "-500px"
		});
	}).on(eventType_mouseUp, function(){
		$(this).css({
			width:"9px",
			right: 0
		});
	});
	
	
	// 메뉴선택 (아코디언형 / 가로펼침형)
	$("[data-menu='arco']").click(function(){
		$(".gnb_list > li > div").removeClass("menu_horz");
	});
	$("[data-menu='horz']").click(function(){
		$(".gnb_list > li > div").addClass("menu_horz");
	});
	
});

// window focusout 되면 메뉴 닫힘
$(window).on("blur" ,function(event){
// $(window).on("click" ,function(event){
	// GNB CLOSE
	/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
	if (/Android|webOs|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			openAndCloseMenu(false, true, event);
	}
	$(".gnb_wrap").find(".gnb_now").removeClass("gnb_now");
    $(".btn_gnb_hide").triggerHandler(eventType_click);
	$(".gnb_wrap").stop().animate({
		  width:$(".gnb_list").outerWidth() + 2,
		  left:parseInt("-" + ($(".gnb_wrap").outerWidth() + 2))
	},250);
});

/*//#5690 [Impex] BUTTONS NOT RESIZING CORRECTLY BASED ON BROWSER SCREEN SIZE
$( window ).resize(function() {
	if ($("div").hasClass("buttonAear")&&$("div").hasClass("over_wrap")&&!$("div").hasClass("layer_popup_contents")) {
	  $(".buttonAear").width($(window).width() - $(".page_title").width() - 40);
	  $(".page_title_area").css("position","fixed");
	  $(".over_wrap").css("margin-top", $(".page_title_area").outerHeight());
	}else if($("div").hasClass("wrap_search")&&!$("div").hasClass("layer_popup_contents")){
		 $(".buttonAear").width($(window).width() - $(".page_title").width() - 40);
		 $(".page_title_area").css("position","fixed");
		 $(".wrap_search").css("margin-top", $(".page_title_area").outerHeight());
	}
	});
$(window).on('load', function() {
	if ($("div").hasClass("buttonAear")&&$("div").hasClass("over_wrap")&&!$("div").hasClass("layer_popup_contents")) {
		$(".buttonAear").width($(window).width() - $(".page_title").width() - 40);
		$(".page_title_area").css("position","fixed");
		$(".over_wrap").css("margin-top", $(".page_title_area").outerHeight());	
	}else if($("div").hasClass("wrap_search")&&!$("div").hasClass("layer_popup_contents")){
		 $(".buttonAear").width($(window).width() - $(".page_title").width() - 40);
		 $(".page_title_area").css("position","fixed");
		 $(".wrap_search").css("margin-top", $(".page_title_area").outerHeight());
	}
	});
//set margin when the page finished loading
function set_OvrWrp_margin(){
	$(".over_wrap").css("margin-top", $(".page_title_area").outerHeight());	
}*/

//#5715 [Binex-LA] mouse scrolling issue when two scroll bar in one screen (S)
if(navigator.userAgent.search("Chrome") >= 0 && parseFloat(navigator.userAgent.match(/(?:KHTML\D*|VERSION\D*)(\d[\d\.]+)/i)[1]) >= 73) {
	var EVENTS_TO_MODIFY = ['mousewheel'];
	
	var originalAddEventListener = document.addEventListener.bind();
	document.addEventListener = function(type, listener, options, wantsUntrusted){
	  var modOptions = options;
	  if (EVENTS_TO_MODIFY.indexOf(type) != -1) {
		  if (typeof options === 'boolean') {
		      modOptions = {
		        capture: options,
		        passive: false,
		      };
		  } 
	  }	
	  return originalAddEventListener(type, listener, modOptions, wantsUntrusted);
	};
	
	var originalRemoveEventListener = document.removeEventListener.bind();
	document.removeEventListener = function(type, listener, options) {
	  var modOptions = options;
	  if (EVENTS_TO_MODIFY.indexOf(type) != -1) {
		  if (typeof options === 'boolean') {
		      modOptions.passive = {
		        capture: options,
		        passive: false,
		      };
		  } 
	  }
	  return originalRemoveEventListener(type, listener, modOptions);
	};
}
//#5715 [Binex-LA] mouse scrolling issue when two scroll bar in one screen (E)

	