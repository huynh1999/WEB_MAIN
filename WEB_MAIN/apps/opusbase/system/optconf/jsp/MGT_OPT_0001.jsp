<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page import="com.clt.apps.fis.mdm.mcm.office.dto.OfcVO"%>
<%@ page import="java.util.ArrayList"%>
	
	
	<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/optconf/script/MGT_OPT_0001.js?ver=<%=CLT_JS_VER%>"></script>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript">
	var comcd_type_cd = '<bean:write name="mapVal" property="type_cd"/>';
    var comcd_type_nm = '<bean:write name="mapVal" property="type_nm"/>';
    var comcd_case_cd = '<bean:write name="mapVal" property="case_cd"/>';
    var comcd_case_nm = '<bean:write name="mapVal" property="case_nm"/>';
    var comcd_attr_cd = '<bean:write name="mapVal" property="attr_cd"/>';
    var comcd_attr_nm = '<bean:write name="mapVal" property="attr_nm"/>';
   //var page_ui_id = document.URL.substring(document.URL.indexOf("opusfwd")+"opusfwd".length+1,document.URL.indexOf(".clt"));
	</script>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String usr_id = userInfo.getUsrid();
	%>
	
	
	
	
	<script>
		function setupPage(){
		 	loadPage();
		}
	</script>

<!--  <body class="td" onload="javascript:loadPage();">-->
<form name="form" method="post" action="./" style="margin:0px">
	<input type="hidden" name="ofc_cd" id="ofc_cd">
	<input type="hidden" name="fcmd" id="fcmd">
<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title">
			<button type="button"><span id="title"></span><bean:message key="Option_Configuration"/></button>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnRetrieve" id="btnRetrieve" onclick="doWork('SEARCH')" ><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnSave" id="btnSave" onclick="doWork('SAVE')" ><bean:message key="Save"/></button><!-- 
			 --></div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span><bean:message key="Option_Configuration_Path"/></span>
			
		</div>
	</div>
	
	<div class= "wrap_search" >
		<div class="opus_design_inquiry wFit ">
		<table>
			<colgroup>
				<col width="50">
				<col width="*">
			</colgroup>
			<tbody>
	        <tr>
				<th><bean:message key="Screen_Id"/></th>
	           	<td>
	           		<input type="text" name="TxtScreenId" id="TxtScreenId" value="" style="width:200px;text-transform:uppercase;" class="search" required maxlength = "50" onChange="ScreenId_OnChange()" onKeyPress='validateScreenId(event)'>
	 			</td>
	   		</tr>
	        </tbody>
	    </table>
		</div>
	</div>
	
	
	<div class="layout_wrap">
	   <div class="layout_flex_fixed" style="width:350px;float:left!important;">
	   		<div class="opus_design_inquiry sm">
		   		<h3 class="title_design"><bean:message key="Office_Code_List"/></h3>
		        <div class="opus_design_grid">
		           <iframe id='dispFr' src='./MGT_OPT_SUB_0001.clt?workLevel=4' marginwidth='0' marginheight='0' topmargin='0' width="100%" height="100%" scrolling='yes' frameborder='0' style="margin-top:0px;width:350px; height:600px;top:0px;border:none;display:block;border:1 solid #d2d9e1"></iframe>
		        </div>
	      	</div>
	    </div>
	     <div class="layout_flex_flex" style="padding-left:358px;padding-right:10px;padding-top:10px ">
	        <div class="opus_design_grid">
				<!-- <h3 class="title_design">Contact person information</h3> -->
		
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_normal" name="btn_sheet1Add" id="btn_sheet1Add" onclick="doWork('SHEET1ADD')" btnType="BTN_ADD"><bean:message key = "Add" /></button><!--
					--><button type="button" class="btn_normal" name="btn_sheet1Copy" id="btn_sheet1Copy" onclick="doWork('SHEET1COPYTO')" btnType="BTN_COPY"><bean:message key = "Copy_To" /></button><!--
					--><button type="button" class="btn_normal" name="btn_sheet1CopyFrom" id="btn_sheet1CopyFrom" onclick="doWork('SHEET1COPYFROM')" btnType="BTN_COPY"><bean:message key = "Copy_From" /></button>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
	    </div>
	</div>
	
</form>

<script type="text/javascript">
	/* function commonSearchOptionConfig(params){
		
		ajaxSendPost(commonSearchOptionConfigCallBack, 'reqVal', '&goWhere=aj&bcKey=commonSearchOptionConfig'+params, './GateServlet.gsl');
	}

	function commonSearchOptionConfigCallBack(rtnVal){
		var formObj=document.form;
		var doc=getAjaxMsgXML(rtnVal);
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				if(doc[1] != "-1"){
					var arrData = JSON.parse(doc[1]);
					
					for( i = 0 ; i < arrData.data.length; i++){
						
						 var key_cd = arrData.data[i].key_cd;
						 var tp_cd = arrData.data[i].tp_cd;
						 var cs_cd = arrData.data[i].cs_cd;
						 var dflt_val = arrData.data[i].dflt_val;
						 var attr = arrData.data[i].attr;
						 
				    	 $("#"+key_cd).val(dflt_val);
				    	 
				    	
				    	 
				    	 if(attr != ""){
				    		 if(attr == "RO"){
				    			 $("#"+key_cd). prop('disabled', true);
				    		 }else{
				    			 $("#"+key_cd).hide();
				    		 }
				    	 }
				     }
				}
			}
		}
	} */
	
	<%-- var params = "&ofc_cd=" + "<%=ofc_cd%>"
	+"&ui_id=" + page_ui_id
	+"&com_id="+"DOU";
	
	commonSearchOptionConfig(params); --%>
	
</script>


<!-- </body> -->