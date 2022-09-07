<%
/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0009.jsp
*@FileTitle  : Item Entry
*@author     : Thoa.Dien
*@version    : 1.0
*@since      : 2014/12/22
=========================================================*/
%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../syscommon/header/CLTHeader.jsp"%>
	<script language="javascript" src="./apps/fis/whm/inventory/script/WHM_WHM_0009.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<title><bean:message key="system.title"/></title>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		
	%>
   <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    
<script>
function setupPage(){
	loadPage();
	//setSelect();
// 	doWork('SEARCHLIST');
}
</script>
<!--   <body class="td" onload="javascript:loadPage();">  -->
	<form name="frm1" method="post" action="./WHM_WHM_0009.clt" >
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_save_sts_flg" id="f_save_sts_flg"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="pageurl" id="pageurl" value="WHM_WHM_0009.clt"/>
	
	<input type="hidden" name="str_date" id="str_date"/>
	<input type="hidden" name="end_date" id="end_date"/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- 
			 <button type="button"  class="btn_accent" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')">Search</button> 
		     <button type="button" btnType="NEW"  class="btn_normal"  onclick="doWork('CLEAR')"><bean:message key="New"/></button> 
			 <button type="button" btnType="EXCEL" style="display: none;" btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" onclick="doWork('EXCEL');"><bean:message key="Excel"/></button>
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
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
		<div class="opus_design_inquiry entry_pannel">
			<table>
				<colgroup>
					<col width="80">
					<col width="220">
					<col width="90">
					<col width="330">
					<col width="50">
					<col width="*">
				</colgroup>
				<tbody>
			        <tr>
						<th><bean:message key="Warehouse"/></th>
						<td nowrap><bean:define id="warehouseCdList" name="valMap" property="whCdList"/>
							<select required name="wh_cd" id="wh_cd" style="width:200px;"/>
							<option value=''></option>
							 <bean:size id="len" name="warehouseCdList" />
					        	<logic:iterate id="InventoryVO" name="warehouseCdList">
					        		<option value='<bean:write name="InventoryVO" property="wh_cd"/>'><bean:write name="InventoryVO" property="wh_nm"/></option>
					        	</logic:iterate>
				        	</select>
						</td>
						<th><bean:message key="Contract_No"/></th>
						<td>
							<input name="ctrt_no" id="ctrt_no" type="text" class="search" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);getCtrtInfo(this);" maxlength="10" onChange="getCtrtInfo(this)"  /><!-- 
							 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onclick="doWork('btn_ctrt_no')" class="input_seach_btn" tabindex="-1"></button><!-- 						
							 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:137px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('btn_ctrt_no_name');}" readonly />
						</td>
			        	<th><bean:message key="Customer"/></th>
		           		<td ><input type="text" name="cust_cd" id="cust_cd" value="" class="search" onKeyDown="codeNameAction('CUSTUMER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTUMER',this, 'onBlur')" 
		           				dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px" maxlength="20" ><!-- 
		           		 --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('WH_POPLIST')"></button><!-- 
		           		 --><input type="text" name="cust_nm" id="cust_nm" value="" style="width:270px;" class="search" onKeyDown="if(event.keyCode==13){doWork('WH_POPLIST_NAME');}">
		           		</td>
			   		</tr>
			   		<tr>
			   			<%--<th><bean:message key="Period"/></th>
			   			<td><input style="width: 77px;" type="text" id="etd_strdt" name="etd_strdt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.etd_enddt);firCalFlag=false;" size="11" maxlength="10"><!-- 
							 --><span class="dash">~</span><!--
							 --><input style="width: 77px;" type="text" id="etd_enddt" name="etd_enddt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.etd_strdt, this);firCalFlag=false;" size="11" maxlength="10"><!--
							 --><button type="button" onclick="doDisplay('DATE11', form);" class="calendar" id="btn_cal" name="btn_cal" tabindex="-1"></button> 
							 </td>--%>
						<th><bean:message key="Item"/></th>
						<td><input type="text" name="itm_cd" id="itm_cd" value="" style="width:200px;" class="search"  onkeydown="entSearch();"></td>
						<th><bean:message key="Office"/></th>
			           	<td nowrap>
			           		<div id="div_subcode">
		                   	<bean:define id="oficeList" name="valMap" property="ofcList"/>
		                   	<input  type="hidden" name="s_ofc_cd" id="s_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/> 
		                   	<select name="f_ofc_cd" id="f_ofc_cd" style="width:100px">
						         <bean:size id="len" name="oficeList" />
						         <logic:greaterThan name="len" value="1">
						        		 <option value='' selected="selected">ALL</option>
						         </logic:greaterThan>
				                <logic:iterate id="ofcVO" name="oficeList">
				                   		  <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                </logic:iterate>
		                   	</select>
		               		</div>
		               	</td>
			   		</tr>
		        </tbody>
		    </table>
		</div>
	</div>


	<!-- opus_design_inquiry(E) -->
	<!-- opus_design_result(S) -->
		
	<div class="wrap_result">       
	    <h3 class="title_design">Item Inventory</h3>
		<!-- opus_design_grid(S) -->
	    <div class="opus_design_grid" id="layer" >   	 	
			<script type="text/javascript">comSheetObject('sheet1');</script>
	   	</div>
	   	<!-- opus_design_grid(E) -->
	</div>
	<!-- opus_design_result(E) -->
</div>
</form>
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
