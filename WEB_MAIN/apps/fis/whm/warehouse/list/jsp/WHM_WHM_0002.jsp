<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.component.util.JSPUtil"%></html>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/whm/warehouse/list/script/WHM_WHM_0002.js?ver=<%=CLT_JS_VER%>"></script>
</head>
<script>
function setupPage(){
	loadPage();
}
</script>

<form name="frm1" method="post" action="./" style="margin:0px">
<!-- #738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영 -->
<!-- GridSetting Value -->
<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
<input type="hidden" name="pageurl" id="pageurl" value="WHM_WHM_0002.clt"/>
		
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- 
			 <button type="button" class="btn_accent" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" name="btn_Retrieve" id="btn_Retrieve" btnType="BTN_RETRIEVE" onclick="doWork('SEARCH')"><bean:message key="Search"/></button> 
			 <button type="button" class="btn_normal" name="btn_Clear" id="btn_Clear" btnType="BTN_CLEAR"><bean:message key="Clear"/></button> 
			 <button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>" name="btn_New" id="btn_New" btnType="BTN_NEW" onclick="doWork('NEW')"><bean:message key="New"/></button> 
			 <button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btn_Excel" id="btn_Excel" btnType="BTN_EXCEL"><bean:message key="Excel"/></button>
			 --%>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			  <span><%=LEV1_NM%></span> &gt;
			 	<span><%=LEV2_NM%></span> &gt;
			  	<span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
		</div>
	</div>

<div class= "over_wrap">	
	<div class= "wrap_search" id="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="300">
				<col width="90">
				<col width="*">
			</colgroup>
			<tbody>
	        <tr>
	           	<td>
	           		<select id = "cbxCond" name="cbxCond" onchange="cbxCond_OnChange();" class="search_form" style="width:100px;">
                         <option value="0"><bean:message key="Code"/></option>
                         <option value="1"><bean:message key="Name"/></option>
                         <option value="2"><bean:message key="Alias"/></option>
                    </select>
                    <!-- <input type="text" id="TxtCond" name="TxtCond" style = "text-transform:uppercase;" maxlength = "5" onKeyPress="ComKeyOnlyAlphabet()" class = "search_form" style = "width:220px" /> -->
                    <input type="text" id="TxtCond" name="TxtCond" onkeypress = 'validateCond(event)'style = "text-transform:uppercase;"  maxlength = "400" class = "search_form" style = "width:220px" />
	 			</td>
	 			
	 			<th><bean:message key="Use"/></th>
	           	<td>
	           		<select id="cbxUse" name="cbxUse" class="search_form" style="width:50px;">
                    	<option value="0">Y</option>
                    	<option value="1">N</option>
                    </select>
	 			</td>
	   		</tr>
	        </tbody>
	    </table>
		</div>
	</div>
	
	<div class = "wrap_result">
		<div class = opus_design_grid>
			<h3 class="title_design"></h3>	
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			</div>
			<!-- opus_design_btn(E) -->
			<script type="text/javascript"> comSheetObject("sheet1")</script>
		</div>
	</div>
</div>	
</form>
<script type="text/javascript">
	doBtnAuthority(attr_extension);
</script>	
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
