<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ClosingMgmt.jsp
*@FileTitle  : W/H Closing Management
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/04/13
=========================================================--%>
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
    <script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whclosing/script/ClosingOtherMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>  <!-- #1333 [Closing Other Entry] Cannot auto suggestion -->
<%

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();


String req_cls_no 	   = "";

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
String wmsRuPoint = (String)application.getAttribute("FRT_RATE_POINT_EIGHT_YN");
if(wmsRuPoint == null){wmsRuPoint = "N";} 

try {
	req_cls_no   = request.getParameter("cls_no")== null?"":request.getParameter("cls_no");
	
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>
<!-- <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<bean:define id="MsList" name="valMap" property="warehouse"/> -->

<logic:notEmpty name="EventResponse">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<logic:notEmpty name="valMap" property="warehouse">
			<bean:define id="MsList" name="valMap" property="warehouse"/>
		</logic:notEmpty>
		<logic:notEmpty name="valMap" property="ord_tp_cd">
			<bean:define id="MsList_tpcd" name="valMap" property="ord_tp_cd"/>
		</logic:notEmpty>
		<logic:notEmpty name="valMap" property="currCdList">
			<bean:define id="currCdList" name="valMap" property="currCdList"/>
		</logic:notEmpty>
		<logic:notEmpty name="valMap" property="UNITCD">
			<bean:define id="UNITCD" name="valMap" property="UNITCD"/>
		</logic:notEmpty>
		<logic:notEmpty name="valMap" property="lic_plat_ut_list">
			<bean:define id="lic_plat_ut_list" name="valMap" property="lic_plat_ut_list"/>
		</logic:notEmpty>
		
	</logic:notEmpty>
</logic:notEmpty>

<script type="text/javascript">
	<% boolean isBegin = false; %>
    var CURRCD = '';
	<% isBegin = false; %>
    <bean:define id="currCdList" name="valMap" property="currCdList"/>
    <logic:iterate id="codeVO" name="currCdList">
        <% if(isBegin){ %>
               CURRCD += '|';
        <% }else{
        	isBegin = true;
           } %>
        CURRCD += '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>
    
    var ARFRTCD1 = ' |';
	var ARFRTCD2 = ' |';
	<% isBegin = false; %>
    <bean:define id="arFrtCdList" name="valMap" property="arFrtCdList"/>
	<logic:iterate id="FrtCdVO" name="arFrtCdList">
		<% if(isBegin){ %>
			ARFRTCD1+= '|';
			ARFRTCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   ARFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
		   ARFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
	</logic:iterate>
	
    var APFRTCD1 = ' |';
	var APFRTCD2 = ' |';
	<% isBegin = false; %>
    <bean:define id="apFrtCdList" name="valMap" property="apFrtCdList"/>
	<logic:iterate id="FrtCdVO" name="apFrtCdList">
		<% if(isBegin){ %>
			APFRTCD1+= '|';
			APFRTCD2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   APFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
		   APFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
	</logic:iterate>
	
	var WHCD = ' |';
	var WHNM = ' |';
	<% isBegin = false; %>
	<logic:iterate id="WHCdVO" name="MsList">
		<% if(isBegin){ %>
			WHCD+= '|';
			WHNM+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		   WHCD+= '<bean:write name="WHCdVO" property="wh_cd" filter="false"/>';
		   WHNM+= '<bean:write name="WHCdVO" property="wh_nm" filter="false"/>';
	</logic:iterate>
	
	
	var UNITCDText = "";
	var UNITCDCode = "";
	
	<logic:notEmpty name="UNITCD">
		<logic:iterate id="codeVO3" name="valMap" property="UNITCD">
			UNITCDCode+="|"+'<bean:write name="codeVO3" property="cd_val"/>';
			UNITCDText+="|"+'<bean:write name="codeVO3" property="cd_nm"/>';
		</logic:iterate>
		
		UNITCDCode = UNITCDCode.substring(1);
		UNITCDText = UNITCDText.substring(1);
	</logic:notEmpty>
	
	var load_tp_cdCode = "";
	var load_tp_cdText = "";
	'<logic:notEmpty name="MsList_tpcd">'
		'<logic:iterate id="codeVO" name="MsList_tpcd">'
			load_tp_cdCode+="|"+'<bean:write name="codeVO" property="cd_val"/>';
			load_tp_cdText+="|"+'<bean:write name="codeVO" property="cd_nm"/>';
		'</logic:iterate>'
		
		load_tp_cdCode = load_tp_cdCode.substring(1);
		load_tp_cdText = load_tp_cdText.substring(1);
	'</logic:notEmpty>'
	
	// License Plate No
	var LIC_PLATE_CD = "";
	var LIC_PLATE_TEXT = "";
	'<logic:notEmpty name="lic_plat_ut_list">'
		'<logic:iterate id="LICVO" name="lic_plat_ut_list">'
			LIC_PLATE_CD+="|"+'<bean:write name="LICVO" property="lic_plat_ut_cd"/>';
			LIC_PLATE_TEXT+="|"+'<bean:write name="LICVO" property="lic_plat_ut_cd"/>';
		'</logic:iterate>'
		
		LIC_PLATE_CD = LIC_PLATE_CD.substring(1);
		LIC_PLATE_TEXT = LIC_PLATE_TEXT.substring(1);
	'</logic:notEmpty>'
    
    
	// Truck Code List
    var TRUCK_CD = '';
    var TRUCK_TEXT = '';
    <% isBegin = false; %>
    <bean:define id="trkTpszList" name="valMap" property="trkTpszList"/>
    <logic:iterate id="TRKVO" name="trkTpszList">
    <% if(isBegin){ %>
	    TRUCK_CD+= '|';
	    TRUCK_TEXT+= '|';
    <% }else{
          isBegin = true;
       } %>
       TRUCK_CD+= '<bean:write name="TRKVO" property="trk_tp_ct"/>';
       TRUCK_TEXT+= '<bean:write name="TRKVO" property="descr"/>';
    </logic:iterate>
    
    var TPCD1 = '';
    var TPCD2 = '';
    var TPCD3 = '';
    <% isBegin = false; %>
    <!--Role 코드조회-->
    <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
    <logic:iterate id="codeVO" name="tpszList">
        <% if(isBegin){ %>
            TPCD1+= '|';
            TPCD2+= '|';
            TPCD3+= '|';
        <% }else{
              isBegin = true;
           } %>
        TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD3+= '<bean:write name="codeVO" property="cntr_grp_cd"/>';
    </logic:iterate>
    
	
</script>

<script type="text/javascript">
	var firCalFlag;
	function setupPage(){
		//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
		gJsWmsRuPoint = '<%=wmsRuPoint%>';
		
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	var AUTOCOMPLETE_YN = 'Y';
	<logic:notEmpty name="valMap" property="autocompleteYn">
	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
</logic:notEmpty> 
</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd" name="f_cmd" value="-1"/>
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="def_cust_cd" id="def_cust_cd" 	value='<bean:write name="valMap" property="cust_cd"/>'> 
<input type="hidden" name="def_cust_nm" id="def_cust_nm" 	value='<bean:write name="valMap" property="cust_nm"/>'> 



<input type="hidden" name="req_cls_no"  id="req_cls_no"   value="<%=req_cls_no %>" /> <!-- 타 화면으로로 부터 넘어온 Closing No -->
<input type="hidden" name="req_wh_cd"  id="req_wh_cd"   value="" />
<input type="hidden" name="req_ctrt_no"  id="req_ctrt_no"   value="" />
<input type="hidden" name="req_ctrt_nm"  id="req_ctrt_nm"   value="" />
<input type="hidden" name="req_cust_cd"  id="req_cust_cd"   value="" />
<input type="hidden" name="req_cust_nm"  id="req_cust_nm"   value="" />
<input type="hidden" name="wh_ofc_cd"  id="wh_ofc_cd"   value="" />


<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table -->

<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" id="org_cd" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" id="def_ofc_curr_cd" name="def_ofc_curr_cd" value="<%=userInfo.getOfc_curr_cd()%>" />
<input type="hidden" id="auth_lvl" name="auth_lvl" value="" />
<input type="hidden" id="mode" name="mode" />

<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="ClosingOtherMgmt.clt"/>


<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
		<!--
 		<button type="button" btnAuth="" class="btn_normal" name="btn_Search" id="btn_Search" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button>
		<button type="button" btnAuth="" class="btn_normal" name="btn_new" id="btn_new" onclick="doWork('NEW');"><bean:message key="New"/></button>
		<button type="button" btnAuth="" class="btn_normal" name="btn_save" id="btn_save" onclick="doWork('SAVE');"><bean:message key="Save"/></button>
		<button type="button" btnAuth="" class="btn_normal" name="btn_delete" id="btn_delete" onclick="doWork('DELETE');"><bean:message key="Delete"/></button>
		<button type="button" btnAuth="" class="btn_normal" name="btn_confirm" id="btn_confirm" onclick="doWork('CONFIRM');"><bean:message key="Confirm"/></button>
		<button type="button" btnAuth="" class="btn_normal" name="btn_cancel" id="btn_cancel" onclick="doWork('CF_CANCEL');"><bean:message key="CFM_Cancel"/></button>
		 -->
	 </div>
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
<!-- opus_design_inquiry(S) -->
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
					<col width="150" />
					<col width="300" />
					<col width="*" />
			</colgroup>
			<tbody>
			
			</tbody>
			<tr>
				<th><bean:message key="Closing_No"/></th>
				<td>
					<input name="s_cls_no" id="s_cls_no" type="text" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onblur="strToUpper(this);" maxlength="14" required="required">
				</td>
				<td></td>
	   		</tr>
	   </table>
</div>
</div>	
<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
<!-- 	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btnSave" id="btnSave" onclick="doWork('btnSave')"><bean:message key="Save"/></button>
		<button type="button" class="btn_accent" name="btnDelete" id="btnDelete"  onclick="doWork('DELETE')"><bean:message key="Delete"/></button>
		<button type="button" class="btn_accent" name="btn_confirm" id="btn_confirm"  onclick="doWork('CONFIRM')"><bean:message key="Confirm"/></button>
	 	<button type="button" class="btn_normal" name="btn_cfcancel" id="btn_cfcancel"  onclick="doWork('CF_CANCEL')"><bean:message key="CFM_Cancel"/></button>
	</div>	 -->
<div class="opus_design_inquiry">
	<table>
		<colgroup>
			<col width="90" />
			<col width="150" />
			<col width="120" />
			<col width="200" />
			<col width="80" />
			<col width="150" />
			<col width="80" />
			<col width="150" />
			<col width="80" />
			<col width="100" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
	   			<th><bean:message key="Contract_No1"/></th>
				<td><input name="f_ctrt_no" id="f_ctrt_no" type="text" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this, '')" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this,'');}" required="required"/><!-- 
					 --><button type="button" class="input_seach_btn" name="btn_ctrt_no" id="btn_ctrt_no" onclick="doWork('btn_ctrt_no')" alt="search"></button><!-- 						
					 --><input name="f_ctrt_nm" id="f_ctrt_nm" type="text" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required="required"/><!-- 
					 --><input name="rtp_no" id="rtp_no" type="hidden" /><!-- 
					 --><input name="cust_cd" id="cust_cd" type="hidden" />
				</td>
				<th><bean:message key="Vendor_Customer"/></th>
				<td>
					<input name="f_cust_cd" id="f_cust_cd" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);searchTlCustInfo(this,form.f_cust_nm);" maxlength="10" required/><!-- 						
					 --><button type="button" name="btn_cust_cd" id="btn_cust_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_cust_cd')"></button><!-- 
					--><input required id="f_cust_nm" name="f_cust_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:110px;" maxlength="50" dataformat="excepthan" onblur="strToUpper(this);" onkeydown="if(event.keyCode==13){CustPopup();}"/>
				</td>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<select name="f_wh_cd" id="f_wh_cd" class="search_form" style="width: 120px;" required="required" onchange="fn_SetCurrencyOfc(this.value)">
						<option value=""></option>
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>				
				<th><bean:message key="Curr"/></th>
				<td>
					<select name="f_curr_cd" id="f_curr_cd" class="search_form" style="width: 60px;" required="required" onchange="">
					<option value=""></option>
						<logic:iterate id="codeVO" name="currCdList">
							<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Type"/></th>
				<td>
					<select name="f_sell_buy_tp_cd" style="width: 60px;" id="f_sell_buy_tp_cd" required="required" onchange="fnSetComboType(this.value)">
						<option value=""></option>
						<option value="S">A/R</option>
						<option value="B">A/P</option>
					</select>	
				</td>				
				<td></td>
				
			</tr>
			<tr>
				<th><bean:message key="Closing_No"/></th>
				<td>
					<input name="f_cls_no" id="f_cls_no" type="text" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onblur="strToUpper(this);" maxlength="14" readonly="readonly">
				</td>			
  				<th><bean:message key="Closing_Date"/></th>
				<td>
				<input name="f_cls_dt" id="f_cls_dt" type="text" class="L_input" style="width:80px;" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" readonly="readonly"/><!-- 
								 --><button type="button" name="btn_cls_dt" id="btn_cls_dt" onClick="doWork('btn_cls_dt');" class="calendar ir" tabindex="-1" >	
				
				</td>
				<th><bean:message key="Ref_No"/></th>
				<td>
					<input type="text" name="f_ref_no" id="f_ref_no" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:120px" maxlength="20" value="" onchange="checkDupFilingNo(this);" required="required"> 
					<input type="hidden" name="f_wm_doc_seq" id="f_wm_doc_seq" > 
				</td>
				<th><bean:message key="Status"/></th>
				<td>
					<input name="f_status_nm" id="f_status_nm" type="text" style="width:120px;ime-mode:disabled;" dataformat="engup" onblur="strToUpper(this);" maxlength="14" readonly="readonly">
					<input name="f_status_cd" id="f_status_cd" type="hidden" value="">
				</td>
				<th><bean:message key="Amount"/></th>
				<td>
					<input name="f_inv_ttl_amt" id="f_inv_ttl_amt" type="text" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onblur="strToUpper(this);" maxlength="14" readonly="readonly">
				</td>				
				<td></td>
								
			</tr> 
			<tr>
			 <th><bean:message key="Remark"/></th>
                 <td colspan="3"><textarea name="f_remark" id="f_remark" onblur="setLimitText(this,200);" dataformat="excepthan" style="width:510px; height:50px;"></textarea></td>
			</tr>
		</tbody>
	</table>
</div>
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_add" id="btn_add"  onclick="doWork('btn_add')" disabled="disabled"><bean:message key="Add"/></button><!-- 
			 --><!-- <button type="button" class="btn_normal" name="btn_del" id="btn_del"  onclick="doWork('btn_del')"><bean:message key="Del"/></button> -->
		</div>
		<!-- opus_design_btn(E) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>

<script>
function setLimitText(obj, maxLength){
    if(obj.value.length > maxLength){
    	alert(getLabel2('FMS_COM_ALT030', new Array("200")));
        obj.value = obj.value.substring(0,maxLength);
        obj.focus();
        return;
     }
 }
 </script>	