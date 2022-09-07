<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvAging.jsp
*@FileTitle  : Inventory Aging
*@author     : Long.Le
*@version    : 1.0
*@since      : 2015/04/14
=========================================================--*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whinventory/js/InvAging.js?ver=<%=CLT_JS_VER%>"></script>
	
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

// UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
// String CLT_PATH = ".";

/* String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm(); */
String wh_nm = "";
String ctrt_nm = "";

%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			comShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>

<form id="form" name="form">

	<input type="hidden" id="f_cmd"/> 
	<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
	<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
	<input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
	<input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="f_CurPage"> 
	<input type="hidden" name="pageurl" id="pageurl" value="InvAging.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="form.f_CurPage.value=1;doWork('SEARCHLIST');"style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');"btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Excel"/></button><!-- 
	 -->
 --%>	 </div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
		</div>
	<!-- page_location(E) -->
</div>
<!-- opus_design_inquiry(S) -->

<div class= "over_wrap">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
		<colgroup>
			<col width="70" />
			<col width="240" />
			<col width="110" />
            <col width="240" />
			<col width="160" />
			<col width="*" />
		</colgroup>		
		<tbody>		
		<tr>
			<th><bean:message key="Warehouse"/></th>
			<td>
				<bean:define id="MsList" name="cdMap" property="warehouse"/>
				<select name="wh_cd" id="wh_cd" class="search_form" style="width: 180px;" required>
					<option value=""></option>
					<logic:iterate id="codeVO" name="MsList">
						<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
					</logic:iterate>
				</select>
			</td>
			<th><bean:message key="Contract_No"/></th>
			<td>
				<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" required style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 
				 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" class="input_seach_btn" tabindex="-1" onclick=""></button><!-- 						
				 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input"  required style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
			</td>
                     <th><bean:message key="Mgmt_Period"/></th>
			<td>
					<!-- <script language="javascript" type="text/javascript">ComComboObject('period', 1, 50, 1);</script> -->
					<select name="period" id="period" onchange="period_OnChange(this)" style="width: 50px; font-weight: bold;"> 
 							<option value='1' >1</option> 
 							<option value='2' >2</option>
 							<option value='3' >3</option>
 							<option value='4' >4</option>
 							<option value='5' >5</option>
 							<option value='6' >6</option>
 							<option value='7' >7</option>
 							<option value='8' >8</option>
 							<option value='9' >9</option>
 							<option value='10' >10</option>
 							<option value='11' >11</option>
 							<option value='12' >12</option>
 					</select>
				<b><bean:message key="Month"/></b>						
			</td>
		</tr>				
                 <tr>
<!--                  //#5899 [OceanBlue-WMS] WMS inventory by Item Name -->
			<th>
				<select id="item_type" name="item_type">
					<option value="ITEM_CD"><bean:message key="Item_Code"/></option>
					<option value="ITEM_NM"><bean:message key="Item_Name"/></option>
				</select>
			</th>
			<td>
				<input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:180px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
			</td>
			<th><bean:message key="Item_Lot"/></th>
			<td>
				<input name="lot_no" otherchar = "<%=WMS_OTHER_CHAR%>" id = "lot_no" type="text" class="L_input" style="width:223px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
			</td>
                     <th><bean:message key="Term"/></th>
			<td>
				<!-- <script language="javascript" type="text/javascript">ComComboObject('term', 1, 100, 1);</script> -->
				<select name="term" id="term" style="width: 100px; font-weight: bold; disabled="true""> 
 							<option value='7' ><bean:message key="1_Week"/></option> 
 							<option value='15' ><bean:message key="Half_Month"/></option>
 							<option value='30' ><bean:message key="Month"/></option>
 					</select>
			</td>
		</tr>	
		</tbody>				
	</table>
</div>
</div>
<!-- opus_design_inquiry(E) -->

<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_inquiry">
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_inquiry">
	        <table border="0" width="720">
			<tr>
				<td width="100">
					<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
					<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
					<paging:options name="pagingVal" defaultval="200"/>
				</td>
				<td align="center" width="700">
					<table width="700">
						<tr>
							<td width="700" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
							</td>
						</tr>
					</table>		
				</td>
				<td width="100"></td>
			</tr>
			</table>
		</div>
	</div>
</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>