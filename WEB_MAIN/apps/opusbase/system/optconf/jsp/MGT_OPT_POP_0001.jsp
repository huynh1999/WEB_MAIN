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
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/optconf/script/MGT_OPT_POP_0001.js?ver=<%=CLT_JS_VER%>"></script>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<script>
		function setupPage(){
		 	loadPage();
		}
	</script>

<form name="form" method="POST" action="./MGT_OPT_POP_0001.clt" enctype="multipart/form-data">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	
	 <div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Office"/></button></span></h2>
			
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btnSearch" id="btnSearch" onClick="doWork('SEARCH')"  ><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnSelect" id="btnSelect" onClick="doWork('SELECT')"  ><bean:message key="Select"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE')"  ><bean:message key="Close"/></button><!-- 
			 --></div>
			 		
		</div>
	</div>
	
	<div class="layer_popup_contents">
		<div class="wrap_search">
			<div class="opus_design_inquiry">
				<table>
				<colgroup>
				<col width="65">
				<col width="60">
				<col width="100">
				<col width="*">
				</colgroup>
				<body>
					<tr>
						<th  ><bean:message key="Office_Code"/></button></th>
						<td >
							<input type="text" name="ofc_cd" id="ofc_cd" style="width:60px;text-transform:uppercase;" onKeyUp="ofc_cd_OnKeyUp()" class="search_form" maxlength="20">
						</td>
						
						<th  ><bean:message key="Office_Name"/></button></th>
						<td  >
							<input type="text" name="ofc_nm" id="ofc_nm" style=" width:220px; text-transform:uppercase;" onKeyUp="ofc_nm_OnKeyUp()" class="search_form" maxlength="50">
						</td>
					</tr>
				</body>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>		
	</div>
	
</form>
