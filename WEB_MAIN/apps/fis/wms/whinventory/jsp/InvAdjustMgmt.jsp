
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvAdjustMgmt.jsp
*@FileTitle  : Inventory Adjustment
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whinventory/script/InvAdjustMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
 	
<%
String loc_cd 		= "";
String loc_nm 		= "";
String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
}catch(Exception e) {
	out.println(e.toString());
}


%>
<!-- 	<script type="text/javascript" type="text/javascript"> -->
<%-- 	<%=JSPUtil.getIBCodeCombo("ord_tp_cd", "", "WB3", "0", "")%> --%>
<!-- 	</script>   -->
	 	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	 	
	 	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	var WHCDLIST = "";
	var WHNMLIST = "";
	<bean:define id="MsList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="MsList">
           WHCDLIST+= '|';
           WHNMLIST+= '|';
           WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
</script>

<form id="form" name="form">

<input type="hidden" id="f_cmd" value="0"/>
<input type="hidden" name="f_CurPage"/>
<input type="hidden" name="form_mode" value="" />

<input type="hidden" name="wib_bk_no" value="" />
<input type="hidden" name="po_sys_no" value="" />
<input type="hidden" name="item_sys_no" value="" />
<input type="hidden" name="lot_id" value="" />
<input type="hidden" name="wh_loc_cd" value="" />
 
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="user_id" id="user_id" value="<%= userInfo.getUsrid() %>" />
<input type="hidden" name="org_cd" id="org_cd" value="<%= userInfo.getOfc_cd() %>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<input type="hidden" name="pageurl" id="pageurl" value="InvAdjustMgmt.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button><!-- 
 --%>	 --></div>
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

<div class="over_wrap">
<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
				<col width="70">
				<col width="220">
				<col width="150">
		        <col width="220">
				<col width="210">
				<col width="*">
			</colgroup>	
			<tbody>	
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>
						<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="wh_cd" id="wh_cd" class="search_form" style="width: 170px;" required>
								<option value=''></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>						
					</td>
					<th><bean:message key="Contract_No"/></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onChange="getCtrtInfo(this)" required/><!-- 
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" class="input_seach_btn" tabindex="-1"></button><!-- 						
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input"  style="width:103px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required />
					</td>
			        <th>
						<select id="cond_no_tp" name="cond_no_tp" style="width: 115px;">
				        	<option value="WIB_BK_NO"><bean:message key="In_Booking_No"/></option>
				        	<option value="CUST_ORD_NO"><bean:message key="Cust_Order_No"/></option>
				       </select>
			        </th>
					<td><input name="cond_no" otherchar = "<%=WMS_OTHER_CHAR%>" type="text" class="L_input" id="cond_no" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14"/></td>
				</tr>				
			    <tr>
					<th><bean:message key="Item_No"/></th>
					<td>
						<input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:170px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/><!-- 
					 --></td>
					<th>
<!-- 					<script language="javascript" type="text/javascript">comComboObject('prop_no_tp', 1, 105, 1);</script> -->
						<select name="prop_no_tp" id="prop_no_tp" style="width: 100px;">
					        <option value="LOT_NO"><bean:message key="Item_Lot_No"/></option>
					        <option value="LOT_ID"><bean:message key="Lot_ID"/></option>
					        <option value="LOT_04"><bean:message key="Lot_04"/></option>
					        <option value="LOT_05"><bean:message key="Lot_05"/></option>
					    </select>
					</th>
			       	<td>
						<input name="prop_no" otherchar = "<%=WMS_OTHER_CHAR%>" type="text" class="L_input" id="prop_no" style="width:216px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/><!-- 
					 --></td>
					<th>
<!-- 					<script language="javascript" type="text/javascript">comComboObject('prop_date_tp', 1, 115, 1);</script> -->
						<select name="prop_date_tp" id="prop_date_tp" style="width: 115px;">
					        <option value="INBOUND_DT"><bean:message key="Inbound_Date"/></option>
					        <option value="EXP_DT"><bean:message key="Expiration_Date"/></option>
					    </select>					
					</th>

					<td>
					<input style="width:78px" type="text" name="prop_date_fm" id="prop_date_fm" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.prop_date_to);firCalFlag=false;" size="10" maxlength="10" class="search_form"><!-- 
						
							  --><span class="dash">~</span><!--  
							  
							  --><input style="width:78px" type="text" name="prop_date_to" id="prop_date_to" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_fm, this);firCalFlag=false;" size="10" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE11', form);"></button>
							 
					   <!--  <input name="prop_date_fm" id="prop_date_fm" type="text" class="L_input"  maxlength="10" style="width:80px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
					     onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_to,this);firCalFlag=false;"/>
					    <span class="dash">~</span>
						<input name="prop_date_to" id="prop_date_to" type="text" class="L_input"  maxlength="10" style="width:80px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						  onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_fm,this);firCalFlag=false;"/>
						<button type="button" class="calendar ir" name="btn_prop_date_to" id="btn_prop_date_to" onClick="doWork('btn_prop_date_to');"></button> --><!-- 
					 --></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div class="wrap_result">
	<div class="opus_design_grid clear">
	<!-- opus_design_grid(S) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	
	<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <td width="60">
                  <!--- Display option Begin --->
                          <bean:define id="pagingVal" name="valMap"     property="paging"/>
                          <paging:options name="pagingVal" defaultval="200"/>
                  <!--- Display option End --->                 
                      </td>
                      <td align="center">
                          <table  border="0" width="100%">
                              <tr>
                                  <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
                                  <td width="60"></td>
                              </tr>
                          </table>
                      </td>
                  </tr>
               </table>
        </div>
        
</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>