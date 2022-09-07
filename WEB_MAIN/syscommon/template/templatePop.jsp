<!DOCTYPE html>
<html lang="en"  class="pop_html">
<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@include file="./../../../../../syscommon/header/CLTTemplateHeader.jsp"%>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- Mobile meta tag(S) -->
<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<script>
if(navigator.userAgent.toLowerCase().indexOf('android') > -1)
    document.getElementById('viewport').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi');
</script>
<meta name="format-detection" content="telephone=no" />
<!-- Mobile meta tag(E) -->
<title>OPUS Logistics</title>
<link rel="stylesheet" type="text/css" href="style/css/theme_default.css?ver=<%=CLT_JS_VER%>" />
<script src="./js/ibsheet/ibleaders.js?ver=<%=CLT_JS_VER%>" ></script>
<script src="./js/ibsheet/ibsheet.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/IBSheetConfig.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoMessage.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/ajax_util.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/jquery-3.2.1.min.js"></script>
<script src="./js/common/jquery-ui/jquery-ui.min.js"></script> <!-- #3873 [JAPT]  T/S popup , validation and sync. -->
<link href="./js/common/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css" /><!-- #3873 [JAPT]  T/S popup , validation and sync. -->
<script src="style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<script src="js/common/CoAxon.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoBizCommonOpus.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<link rel="shortcut icon" href="<%=CLT_PATH%>/favicon_fwd.ico" type="image/x-icon">
<% if(!"RPT_PRN_0010.clt".equals(pageUrl) && !"RPT_RD_0010.clt".equals(pageUrl) && !"RPT_RD_0020.clt".equals(pageUrl) && !"RPT_RD_0030.clt".equals(pageUrl)) { %>
	<script src="./js/common/IBSheetInfo.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<%} %>

<script type="text/javascript">
	/*$(function(){
        $("button").on("click",function(){
            if($(this).text() == "Down Excel" || $(this).attr("name") == "btn_DownExcel"){
                $(document).find(".opus_design_grid").addClass("excelCellColor");
                setTimeout(function(){
                    $(document).find(".opus_design_grid").removeClass("excelCellColor");
                },10);
            }
        });
    }); */
    $(document).ready(function() {
    	if(document.frm1!= undefined || document.frm1!= null){
			axon_event.addListenerFormat('keyup', 'ComEditFormating', document.frm1);	//for CNTR
		}
		if(document.form!= undefined || document.form!= null){
			axon_event.addListenerFormat('keyup', 'ComEditFormating', document.form);	//for CNTR
		}
		ajaxSendPost(getBoldYn, 'reqVal', '&goWhere=aj&bcKey=getBoldYn&f_userId=<%=userInfo.getUsrid()%>' , './GateServlet.gsl');
		// 버튼 생성에 필요한 데이터.
		ajaxSendPost(selectProgramButton, 'reqVal', '&goWhere=aj&bcKey=selectProgramButton&url='+location.pathname.split("/")[2]+'&role=<%=userInfo.getRole_cd()%>&search='+encodeURIComponent(location.search) , './GateServlet.gsl');
	});

	function setActionButton(arrData){
		makeDiv.makeHtml(arrData);
	}
	var makeDiv = {
			temp0 : $('<div class="buttonAear"></<div>'),
			temp1 : $('<div class="dropdown"></<div>'), 
			temp2 : $('<div onclick="myFunction();" class="dropbtn btn_normal"></<div>'), 
			temp3 : $('<div name="myDropdown" class="dropdown-content"></<div>'),
			makeHtml :function (data){
				var that = this;
				var groupButton=[];
				var groupButton1=[];
				var buttonAear = that.temp0.clone();
				var buttonGroupText;
				var dropdown;
				var buttonGroupObj;
				$.each(data,function(index, value){
					if(value.btn_grp){
						groupButton1.push(value.btn_grp.trim());
					}
				});
				
				$.each(data,function(index, value){
					if(index == 0){
						$("."+value.btn_pos).html("");
					}
					var btn_grp_nm = "";
					if(value.btn_grp){
						btn_grp_nm = value.btn_grp.trim();
					}
					var grp_cnt = groupButton1.filter(function(value){return (value == btn_grp_nm)}).length;

					// 초기 disp를 3가지로 구분 ( init_disp  'Y' , 'N', 'R' )					
					var display = "display : none";
					
					if(value.init_disp == 'Y' || (value.init_disp == 'R' && value.role_btn_yn == 'Y')){
						display = "display : ";
					} 

					//-----------------------------------------------------
					
					var cssClss;
					if(value.css_clss){
						cssClss = value.css_clss.toLowerCase();
					}else{
						if(value.pb_css_clss){
							cssClss = value.pb_css_clss.toLowerCase();
						}else{
							cssClss = "";
						}
					}
					var actionOnClick="";
					if(value.btn_actin != ""){
						actionOnClick = 'onclick="'+value.btn_actin+'"';
					}
					if(grp_cnt > 1 && btn_grp_nm != ""){
						if($.inArray(btn_grp_nm, groupButton) == -1){
							dropdown = that.temp1.clone();
							buttonGroupText = that.temp3.clone();
							buttonGroupText.addClass(value.css_clss.toLowerCase());
							
							buttonGroupObj = $('<button type="button" class="'+cssClss+'" '+ display +' id="'+value.btn_id+'"  '+actionOnClick+'>'+value.btn_key+'</button>'+'<span onclick="myFunction('+groupButton.length+');" class="dropbtn '+cssClss+' " style="position: relative;top: 5px;left: -3px;padding: 6px 1px 7px 1px;font-size: 8px;">▼</<span>');
							groupButton.push(btn_grp_nm);
							dropdown.append(buttonGroupObj);
						}else{
							var butonObj = '<a id="'+value.btn_id+'" '+actionOnClick+' href="javascript:void(0);">'+value.btn_key+'</a>';
							buttonGroupText.append(butonObj);
							dropdown.append(buttonGroupText);
							buttonAear.append(dropdown);
						}
					}else{
						var butonObj = '';
						
						// Must Be Button이 Role에 등록되지 않은 경우는 화면에 절대 출력이 안되도록 수정 
						if (value.init_disp == 'N' && value.role_btn_yn != 'Y') {
							butonObj = '<span style="display:none;"><button type="button" class="'+cssClss+'" style="'+ display +'"  id="'+value.btn_id+'" '+actionOnClick+'>'+value.btn_key+'</button></span>';	
						} else {
							butonObj = '<button type="button" class="'+cssClss+'" style="'+ display +'"  id="'+value.btn_id+'" '+actionOnClick+'>'+value.btn_key+'</button>';
						}

						buttonAear.append(butonObj)
					}
					$("."+value.btn_pos).append(buttonAear);
				});
				
			}
			
	}
    
	function selectProgramButton(rtnVal){
		var doc=getAjaxMsgXML(rtnVal);
		
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				if(doc[1] != "-1"){
					var arrData = JSON.parse(doc[1]);
					setActionButton(arrData);
				}
			}
		}
	}    
	var boldYn='';
	
	// Bold Y/N getting CallBack
	function getBoldYn(reqVal){
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			if(typeof(doc[1])!= 'undefined'){
				boldYn=doc[1];
			}
		}
	}
	//@ sourceURL=testfilename1.js
</script>

</head>
<body onload="setupPage()">
	<%
		//To get GNB Data.
		HttpSession httpSession = request.getSession();
		CommonEventResponse commonEventResponse = (CommonEventResponse) httpSession.getAttribute("menuResponse");
		Map<String, ArrayList<MenuTreeVO>> menuMap = commonEventResponse.getMapVal();

		ArrayList<MenuTreeVO> topMenuList = menuMap.get("TOPMENU");
		ArrayList<MenuTreeVO> subMenuList = menuMap.get("SUBMENU");
		ArrayList<MenuTreeVO> pgmMenuList = menuMap.get("PGMMENU");
		ArrayList<MenuTreeVO> myPgmList = menuMap.get("MYPGM");
	%>
	
	<template:insert parameter="body" />
</body>


<script>
	var Rpt_H = $(window).outerHeight() - 50; 
	if ($("#wo_rePort")) {
		$("#wo_rePort").height(Rpt_H + "px");
	}	
</script>

</html>
