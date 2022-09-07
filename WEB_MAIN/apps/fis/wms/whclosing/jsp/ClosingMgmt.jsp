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
    <script type="text/javascript" src="./apps/fis/wms/whclosing/script/ClosingMgmt.js?ver=<%=CLT_JS_VER%>"></script>
<%

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();


String req_search_no   = "";
String req_search_tp   = "";
String req_cls_no 	   = "";
String req_so_no 	   = "";
String cls_agr_no 	   = "";

//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
String wmsRuPoint = (String)application.getAttribute("FRT_RATE_POINT_EIGHT_YN");
if(wmsRuPoint == null){wmsRuPoint = "N";} 

try {
	req_search_no   = request.getParameter("search_no")== null?"":request.getParameter("search_no");
	req_search_tp   = request.getParameter("search_tp")== null?"":request.getParameter("search_tp");
	
	req_cls_no   = request.getParameter("cls_no")== null?"":request.getParameter("cls_no");
	req_so_no    = request.getParameter("so_no")== null?"":request.getParameter("so_no");
	cls_agr_no   = request.getParameter("cls_agr_no")== null?"":request.getParameter("cls_agr_no");
	
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
		
		<logic:notEmpty name="valMap" property="UNITCD">
			<bean:define id="UNITCD" name="valMap" property="UNITCD"/>
		</logic:notEmpty>
		
	</logic:notEmpty>
</logic:notEmpty>

<script type="text/javascript">
	var order_relCode = '';
	var order_relText = '';
    <% boolean isBegin = false; %>
    <bean:define id="order_relList"  name="valMap" property="order_rel"/>
    <logic:iterate id="codeVO" name="order_relList">
        <% if(isBegin){ %>
        	order_relCode+= '|';
        	order_relText+= '|';
        <% }else{
              isBegin = true;
           } 
        %>
        order_relCode+= '<bean:write name="codeVO" property="cd_val"/>';
        order_relText+= '<bean:write name="codeVO" property="cd_nm"/>';
    </logic:iterate>
    
	var sts_cdCode = '';
	var sts_cdText = '';
    <% isBegin = false; %>
    <bean:define id="sts_cdList"  name="valMap" property="sts_cd"/>
    <logic:iterate id="codeVO1" name="sts_cdList">
        <% if(isBegin){ %>
        	sts_cdCode+= '|';
        	sts_cdText+= '|';
        <% }else{
              isBegin = true;
           } 
        %>
        sts_cdCode+= '<bean:write name="codeVO1" property="cd_val"/>';
        sts_cdText+= '<bean:write name="codeVO1" property="cd_nm"/>';
    </logic:iterate>
    
    var rate_tp_cdCode = '';
	var rate_tp_cdText = '';
    <% isBegin = false; %>
    <bean:define id="rate_tp_cdList"  name="valMap" property="rate_tp_cd"/>
    <logic:iterate id="codeVO2" name="rate_tp_cdList">
        <% if(isBegin){ %>
        	rate_tp_cdCode+= '|';
        	rate_tp_cdText+= '|';
        <% }else{
              isBegin = true;
           } 
        %>
        rate_tp_cdCode+= '<bean:write name="codeVO2" property="cd_val"/>';
        rate_tp_cdText+= '<bean:write name="codeVO2" property="cd_nm"/>';
    </logic:iterate>
    
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
</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd" name="f_cmd" value="-1"/>
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="req_cls_no" id="req_cls_no"  value="<%=req_cls_no%>" />
<input type="hidden" name="req_so_no"  id="req_so_no"   value="<%=req_so_no%>" />
<input type="hidden" name="cls_agr_no"  id="cls_agr_no"   value="<%=cls_agr_no%>" />

<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table -->
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="ClosingMgmt.clt"/>
<input type="hidden" id="org_cd" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" id="def_ofc_curr_cd" name="def_ofc_curr_cd" value="<%=userInfo.getOfc_curr_cd()%>" />
<input type="hidden" id="auth_lvl" name="auth_lvl" value="" />
<input type="hidden" id="mode" name="mode" />
<input type="hidden" name="cls_no" id="cls_no" />
<input type="hidden" name="so_no"  id="so_no" />
<input type="hidden" name="sts_s_cnt" id="sts_s_cnt" />
<input type="hidden" name="sts_c_cnt" id="sts_c_cnt" />
<input type="hidden" name="sts_i_cnt" id="sts_i_cnt" />
<input type="hidden" name="cls_cnt" id="cls_cnt" />
<input type="hidden" name="h_cls_no" id="h_cls_no" />
<input type="hidden" name="s_use_rate" id="s_use_rate" />
<input type="hidden" name="ctrt_unit" id="ctrt_unit" />
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" btnAuth="<%=roleBtnVO.getAttr1()%>" class="btn_accent" name="btn_Search" id="btn_Search" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" btnAuth="<%=roleBtnVO.getAttr3()%>" class="btn_normal" name="btnSave" id="btnSave" onclick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
		 --><button type="button" btnAuth="<%=roleBtnVO.getAttr4()%>" class="btn_normal" name="btnDelete" id="btnDelete" onclick="doWork('DELETE');"><bean:message key="Delete"/></button><!-- 
		 --><button type="button" btnAuth="CONFIRM" class="btn_normal" name="btn_confirm" id="btn_confirm" onclick="doWork('CONFIRM');"><bean:message key="Confirm"/></button><!-- 
		 --><button type="button" btnAuth="CF_CANCEL" class="btn_normal" name="btn_cfcancel" id="btn_cfcancel" onclick="doWork('CF_CANCEL');"><bean:message key="CF_Cancel"/></button><!-- 
		 --><button type="button" btnAuth="<%=roleBtnVO.getAttr6()%>" class="btn_normal" name="btn_excel" id="btn_excel" onclick="doWork('EXCEL');"><bean:message key="Excel"/></button><!-- 
		 --><button type="button" btnAuth="<%=roleBtnVO.getAttr2()%>" class="btn_normal" name="btn_new" id="btn_new" onclick="doWork('NEW');"><bean:message key="New"/></button><!-- 
		 --><button type="button" btnAuth="AR_CREATE" class="btn_normal" name="bt_ar_create" id="bt_ar_create" onclick="doWork('AR_CREATE');"><bean:message key="AR_Create"/></button><!-- 
		 --><button type="button" btnAuth="AP_CREATE" class="btn_normal" name="bt_ap_create" id="bt_ap_create" onclick="doWork('AP_CREATE')"><bean:message key="AP_Create"/></button><!-- 
		 --><button type="button" btnAuth="CLOSING_BACKGROUND_SEARCH" class="btn_normal" name="link_ClosingSearch" id="link_ClosingSearch" onclick="doWork('CLOSING_SEARCH')"><bean:message key="Closing_Search"/></button><!-- 
 	 -->--%>
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
<!-- opus_design_inquiry(S) -->
<div class="over_wrap" style="height:100%">
<div class= "wrap_search">
<div class="opus_design_inquiry ">
		<table>
			<tr>
				<th style="width:90px;"><bean:message key="Closing_No"/></th>
				<td><input name="in_cls_no" id="in_cls_no" type="text" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14"/></td>
				<th style="width: 175px;"><bean:message key="Doc_ref_no"/></th>
				<td style="width:1300px;"><input name="in_so_no" id="in_so_no" type="text" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="15"/></td>
	   		</tr>
	   </table>
</div>
</div>	
<!-- opus_design_inquiry(E) -->
<div class="wrap_result">	
<div class="opus_design_inquiry">
	<table>
		<colgroup>
			<col width="90" />
			<col width="150" />
			<col width="150" />
			<col width="150" />
			<col width="150" />
			<col width="150" />
			<col width="150" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="Closing_Date"/></th>
				<td>
				<input name="cls_dt" id="cls_dt" type="text" class="L_input" style="width:75px;" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" required="required"/><!-- 
								 --><button type="button" name="btn_cls_dt" id="btn_cls_dt" onClick="doWork('btn_cls_dt');" class="calendar ir" tabindex="-1">	
				
<!-- 				<input name="cls_dt" id="cls_dt" type="text"  dataformat="ymd" maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this); setSetPeriod(this);" OnBeforeActivate="ComClearSeparator(this)"   />
					<button type="button" name="btn_cls_dt" id="btn_cls_dt" onclick="doWork('btn_cls_dt')" class="calendar ir" tabindex="-1"></button> -->
				</td>
				<th><bean:message key="Settlement_Period"/></th>
				<td>
				<input style="width:78px" type="text" name="set_fr_dt" id="set_fr_dt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.set_to_dt);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
						
							  --><span class="dash">~</span><!--  
							  
							  --><input style="width:78px" type="text" name="set_to_dt" id="set_to_dt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.set_fr_dt, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE11', form);"></button>
							 
<!-- 				<input name="set_fr_dt" id="set_fr_dt" type="text"  dataformat="ymd" maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"  />
					<span class="dash">~</span>
					<input name="set_to_dt" id="set_to_dt" type="text"  dataformat="ymd" maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"  />
					<button type="button" name="btn_set_to_dt" id="btn_set_to_dt" class="calendar ir" tabindex="-1"></button> -->
				</td></th>
				<th>
				<td>
					<button type="button" class="btn_etc" name="btn_change_date1" id="btn_change_date1"  onclick="doWork('btn_change_date1')">1<bean:message key="Week"/></button><!-- 
					 --><button type="button" class="btn_etc" name="btn_change_date2" id="btn_change_date2" onclick="doWork('btn_change_date2')"><bean:message key="HMonth"/></button><!-- 
					 --><button type="button" class="btn_etc" name="btn_change_date3" id="btn_change_date3" onclick="doWork('btn_change_date3')">1<bean:message key="Month"/></button>
				</td>
				<th><bean:message key="Contract_No1"/></th>
				<td><input name="ctrt_no" id="ctrt_no" type="text" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this, '')" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this,'');}" required="required"/><!-- 
					 --><button type="button" class="input_seach_btn" name="btn_ctrt_no" id="btn_ctrt_no" onclick="doWork('btn_ctrt_no')" alt="search"></button><!-- 						
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required="required"/><!-- 
					 --><input name="rtp_no" id="rtp_no" type="hidden" /><!-- 
					 --><input name="cust_cd" id="cust_cd" type="hidden" />
				</td>
			</tr>
			<tr>
  				<th><p><bean:message key="SELL"/>/<bean:message key="BUY"/></p></th>
				<td>
					<select name="sb_cls_cd" id="sb_cls_cd">
						<option value="S">SELL</option>
						<option value="B">BUY</option>
						<option value="ALL">ALL</option>
					</select>
				<th><p><bean:message key="Type"/></p>
                </th>
				<td>
					<select name="rate_tp_cd" id="rate_tp_cd">
						<option value="ALL">ALL</option>
						<option value="IN">INBOUND</option>
						<option value="OUT">OUTBOUND</option>
						<option value="STR">STORAGE</option>
						<option value="OTH">OTHER</option>
					</select>
				</td>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<select name="wh_cd" id="wh_cd" class="search_form" style="width: 200px;" required="required" onchange="check_authority_wh();">
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<!-- LKH 2016.07.21 :: Closing Create 시 Storage 로직 수정 -->
				<th>Use Rate</th>
				<td><input name="use_rate" id="use_rate" type="checkbox" Disabled></td> 
				</td>
			</tr> 
		</tbody>
	</table>
</div>
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btn_create" id="btn_create" onclick="doWork('btn_create')"><bean:message key="Create"/></button><!-- 
				 --><button type="button" class="btn_accent" name="btn_add" id="btn_add"  onclick="doWork('btn_add')"><bean:message key="Add"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_del" id="btn_del"  onclick="doWork('btn_del')"><bean:message key="Del"/></button>
		</div>
		<!-- opus_design_btn(E) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	<div id="create_popup" style="position:absolute; display: none;margin-top:0px;margin-left:735px;height:95px;width:180px;border-radius: 4px; border: solid 1 px #b7d6f8; background-color: #dceeff; right: 145px; top: 190px;">
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="20">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<td></td>
						<td style="height:5px;"></td>
					</tr> 
					<tr>
						<td></td>
						<td><input type="radio" name="create_popup_type" id="create_popup_type1" value="F" checked></input><label for="create_popup_type1">Foreground</label>
						</td>
					</tr>
					<tr>
						<td></td>	
						<td><input type="radio" name="create_popup_type" id="create_popup_type2" value="B"></input><label for="create_popup_type2">Background</label>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div style="height:5px;"></div>
		<div style="text-align:center;">
			 <button type="button" class="btn_normal" onClick="btn_Create_Popup_OK()"><bean:message key="OK"/></button><!-- 
		  --><button type="button" class="btn_normal" onClick="btn_Create_Popup_Close()"><bean:message key="Close"/></button>
		</div>
	</div>
</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>