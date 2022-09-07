<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0140.jsp
*@FileTitle  :  Vessel Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/05
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sal/tfm/tariff/script/SAL_TFM_0070.js?ver=<%=CLT_JS_VER%>"></script>
</head>
	<script>
	<%
	String usrId 		= userInfo.getUsrid();
	String ofcCd 		= userInfo.getOfc_cd();
    %>
	function setupPage(){
        loadPage();
	}
    </script>

<form name="frm1">
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="clss_val" id="clss_val" />
<input type="hidden" name="usr_id" value="<%= usrId %>"/>
<input type="hidden" name="ofc_cd" value="<%= ofcCd %>"/>

<div class="page_title_area clear ">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<div class="opus_design_btn TOP">
	   <%--  <button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!--
		--><button type="button" class="btn_normal" name="btnSave"    id="btnSave"    onClick="doWork('SAVE');"><bean:message key="Save"/></button><!--
		--><button type="button" class="btn_normal" name="btn_excel"  id="btn_excel"  onClick="doWork('btn_excel');"><bean:message key="Excel"/></button> --%>								
	</div>
	<div class="location">
		<span><%=LEV1_NM%></span> &gt;
	 	<span><%=LEV2_NM%></span> &gt;
	  	<span><%=LEV3_NM%></span>
   		<a href="" class="ir">URL Copy</a>
	</div>
</div>
<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
<div class="wrap_search">
	<div class="opus_design_inquiry entry_pannel" >		
		<table>
			<colgroup>
				<col width="60">
				<col width="200">
				<col width="80">
				<col width="200">
				<col width="90">
				<col width="200">
				<col width="60">
				<col width="*">
			</colgroup> 
			<tr>
				<th><bean:message key="IATA_Code"/></th>
				<td>
					<input name="iata_cd" id="iata_cd" maxlength="3"  value="" type="text" dataformat="excepthan"  style="width:80px;text-transform:uppercase;ime-mode:disabled;" onKeyDown="codeNameAction('trdpprefixcode',this, 'onKeyDown')" onBlur="codeNameAction('trdpprefixcode',this, 'onBlur')" ><!--
					--><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onclick="doWork('btn_iata_cd');"></button><!--
					--><input type="text" id="iata_cd_nm" name="iata_cd_nm" onkeypress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST_IATA', document.getElementById('liner'), frm1.iata_cd_nm.value);}" dataformat="excepthan"  style="width:120px;text-transform:uppercase;ime-mode:disabled;"/>
				</td>
				<th><bean:message key="Departure"/></th>
				<td>
					<input name="pol_cd" id="pol_cd" maxlength="4"  value="" type="text" dataformat="excepthan"  style="width:80px;text-transform:uppercase;ime-mode:disabled;" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');"><!--
					--><button type="button" class="input_seach_btn" tabindex="-1" id="pol" onclick="openAieMasterPopUp('LOCATION_POPLIST_BLANK',this);"></button><!--
					--><input type="text" id="pol_nm" name="pol_nm" dataformat="excepthan" style="width:120px;text-transform:uppercase;ime-mode:disabled;" onkeypress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}"/>
				</td>
				<th><bean:message key="Destination"/></th>
				<td>
					<input name="pod_cd" id="pod_cd" maxlength="4"  value="" type="text" dataformat="excepthan"  style="width:80px;text-transform:uppercase;ime-mode:disabled;" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');"><!--
					--><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" onclick="openAieMasterPopUp('LOCATION_POPLIST_BLANK',this);"></button><!--
					--><input type="text" id=pod_nm name="pod_nm" dataformat="excepthan" style="width:120px;text-transform:uppercase;ime-mode:disabled;" onkeypress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}"/>
				</td>
				<th><bean:message key="Class"/></th>
				<td>
					<select id="search_sel" style="width: 120px;" onchange="onOptionSelect()">
						<option value="">ALL<s:message code="select"/></option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="Q">Q</option>
                        <option value="U">U</option>
                        <option value="E">E</option>
					</select>
				</td>
			</tr>
		</table> 
	</div>
</div>
<div class="wrap_result">
	<div class="opus_design_grid">
		<div class="opus_design_btn">
		    <button type="button" class="btn_normal" id="btn_normal" name="upload_excel" onclick="doWork('upload_excel');" class="btn_etc"><bean:message key="Excel_Upload"/></button>
		    <button type="button" class="btn_normal" name="btn_Add_Grid" id="btn_Add_Grid" onclick="doWork('btn_Add_Grid');"><bean:message key="ADD"/></button>
		    <!-- <button type="button" class="btn_normal" name="btn_Del_Grid" id="btn_Del_Grid" onclick="doWork('btn_Del_Grid');"><bean:message key="DEL"/></button> -->
		</div>
   		<script language="javascript">comSheetObject('sheet1');</script>
   	</div>
   	<div class="opus_design_inquiry wFit" >
		<table>
			<tbody>
				<tr>
					<td>
					    <span style="color: red;">※<bean:message key="Excel"/> [ Excel 97 - 2003 Workbook (*.xls) ]</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</div>
</form>


