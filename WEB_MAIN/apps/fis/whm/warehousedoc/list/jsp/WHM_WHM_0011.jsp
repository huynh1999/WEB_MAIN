<%
/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0008.jsp
*@FileTitle  : Shipping List
*@author     : Vinh.Vo
*@version    : 1.0
*@since      : 2014/12/31
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.component.util.JSPUtil"%></html>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<title><bean:message key="system.title"/></title>
	<script language="javascript" src="./apps/fis/whm/warehousedoc/list/script/WHM_WHM_0011.js?ver=<%=CLT_JS_VER%>"></script>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= userInfo.getEml() %>";
	</script>
	
   <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    
<script>
function setupPage(){
	loadPage();
	//setSelect();
// 	doWork('SEARCHLIST');
}
</script>
  <body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="post" action="./WHM_WHM_0008.clt" style="margin:0px">
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="pageurl" id="pageurl" value="WHM_WHM_0011.clt"/>
	<!-- #738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영 -->
	<!-- GridSetting Value -->
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	
	<input type="hidden" name="rd_cust_name" 	id="rd_cust_name">
	<input type="hidden" name="rd_cust_addr" 	id="rd_cust_addr">
	<input type="hidden" name="rd_cust_email" 	id="rd_cust_email">
	<input type="hidden" name="rd_cust_phone" 	id="rd_cust_phone">
	<input type="hidden" name="rd_cust_fax" 	id="rd_cust_fax">
	
	<input type="hidden" name="rd_ship_name" 	id="rd_ship_name">
	<input type="hidden" name="rd_ship_addr" 	id="rd_ship_addr">
	<input type="hidden" name="rd_ship_email" 	id="rd_ship_email">
	<input type="hidden" name="rd_ship_phone" 	id="rd_ship_phone">
	<input type="hidden" name="rd_ship_fax" 	id="rd_ship_fax">
	
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			 <%-- 
			 <button type="button"  class="btn_accent" onclick="doWork('SEARCH')"><bean:message key="Search"/></button> 
			 <button type="button"  class="btn_normal" onclick="doWork('NEW')"><bean:message key="New"/></button> 
			 <button type="button"  class="btn_normal" btnAuth="CLEAR" onclick="doWork('btn_Clear');"><bean:message key="Clear"/></button> 
	         <button style="cursor:hand;" type="button" btnAuth="PROFIT_REPORT" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('PROFIT_REPORT')"><bean:message key="Profit_Report"/></button>
	         <button id="btnAccounting" style="cursor:hand; " type="button" btnAuth="ACCOUNTING" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('GOTOACCT')"><bean:message key="Accounting"/></button>  
			 <button type="button" btnAuth="EXCEL" class="btn_normal" onclick="doWork('EXCEL');"><bean:message key="Excel"/></button>
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
<!-- opus_design_inquiry(S) -->	
<div class= "over_wrap">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel ">
	<table>
		<colgroup>
			<col width="80">
			<col width="250">
			<col width="70">
			<col width="230">
			<col width="70">
			<col width="200">
			<col width="70">
			<col width="*">
		</colgroup>
		<tbody>
			
	        <tr>
				<th><bean:message key="Warehouse"/></th>
				<td nowrap><bean:define id="warehouseCdList" name="valMap" property="whCdList"/>
					<select required name="wh_cd" id="wh_cd" style="width:242px;"/>
					 <option value=''></option>
					 <bean:size id="len" name="warehouseCdList" />
					
<%-- 						<logic:greaterThan name="len" value="1"> --%>
<!-- 					        		<option value='A'>ALL</option> -->
<%-- 					    </logic:greaterThan> --%>
			        	<logic:iterate id="InventoryVO" name="warehouseCdList">
			        		<option value='<bean:write name="InventoryVO" property="wh_cd"/>'><bean:write name="InventoryVO" property="wh_nm"/></option>
			        	</logic:iterate>
		        	</select>
					</td>
				<th ><bean:message key="Post_Date"/></th>
	        	<td><!-- 
<!-- 	        	 --><input type="text" name="post_dt_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, frm1.post_dt_strdt);firCalFlag=false;" style="width:76px;" maxlength="10"><!--	        	 
                 --><span class="dash">~</span><!--
                 --><input type="text" name="post_dt_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, frm1.post_dt_enddt);firCalFlag=false;" style="width:76px;" maxlength="10"><!--
                 --><button type="button" id="btn_cal" name="btn_cal" class="calendar ir" onclick="doDisplay('DATE11', form);"></button>
                 </td>
                <td></td>
	        	<td><select name="tp_nm_ld" id="tp_nm_ld" style="width:130px;" onchange="document.frm1.txt_nm.value='';">
	        			<option value="DOC_REF_NO">Doc Filing No.</option>
	        			<option value="CUST_REF_NO">Customer Ref. No.</option>
	        			<option value="PLT_NO">Pallet No.</option>
						<option value="PO_NO">P/O No.</option>
						<option value="ITM_CD">Item Code</optiom>						
						<option value="CNTR_NO">Container No.</optiom>
						<option value="MBL_NO">MB/L No.</optiom>
						<option value="HBL_NO">HB/L No.</optiom>
	        		</select><!-- 
	        	 --><input type="text" name="txt_nm" id="txt_nm" value="" class="search" maxlength="12" onkeypress="if(document.frm1.tp_nm_ld.value=='P'){onlyNumberCheck();}"  onKeyDown="codeNameAction('TP_COM_NO',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('TP_COM_NO',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" >
	        	</td>
	        	
	        	
	   		</tr>
	   		<tr>
	   			<th><bean:message key="Customer"/></th>
           		<td ><input type="text" name="cust_cd" id="cust_cd" value="" class="search" maxlength="20" onKeyDown="codeNameAction('CUSTUMER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTUMER',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" ><!-- 
           		 --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('btn_Search_Cust')"></button><!-- 
           		 --><input type="text" name="cust_nm" id="cust_nm" value="" style="width:140px;" class="search" readOnly>
           		</td>
                <td></td>
				<td></td>
				<td></td>
				<td></td>				    
	   		</tr>
        </tbody>
    </table>
</div>
<!-- opus_design_inquiry(E) -->
</div>

<!-- opus_design_result(S) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
   	 	
		<script type="text/javascript">comSheetObject('sheet1');</script>
   	</div>
   	<!-- opus_design_grid(E) -->	

</div>
<!-- opus_design_result(E) -->
</div>
</form>

