<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICUpdate.jsp
*@FileTitle  : Inbound Complete Update
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
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
    <script type="text/javascript" src="./apps/fis/wms/whinboundcomplete/script/WHICUpdate.js?ver=<%=CLT_JS_VER%>"></script>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="warehouse" name="cdMap" property="warehouse"/>
<%

String req_search_no   = "";
String req_search_tp   = "";
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();

try {
	req_search_no   = request.getParameter("search_no")== null?"":request.getParameter("search_no");
	req_search_tp   = request.getParameter("search_tp")== null?"WIB_BK_NO":request.getParameter("search_tp");
	
}catch(Exception e) {
	out.println(e.toString());
}	


%>

<%-- <script type="text/javascript">
	<%=JSPUtil.getIBCodeCombo("in_sts_cd", "", "WI1", "0", "")%>
</script>  --%>

<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>	

<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0"/>
<input type="hidden" name="form_mode" 	value="NEW" />
<input type="hidden" name="req_search_no" id="req_search_no"	value="<%=req_search_no%>" />
<input type="hidden" name="req_search_tp" id="req_search_tp"	value="<%=req_search_tp %>" />
<input type="hidden" name="log_org_cd" />
<input type="hidden" name="in_cnt" id="in_cnt" value="0" />
<input type="hidden" name="ob_cnt" id="ob_cnt" value="0" />
<input type="hidden" name="putaway_cnt" id="putaway_cnt" value="0" />
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WHICUpdate.clt"/>
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr1() : ""%>" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr3() : ""%>" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
			 --><button type="button" style="display:none;" btnAuth="REINSTATE" class="btn_normal" name="btn_reinstate" id="btn_reinstate" onClick="doWork('btn_reinstate');"><bean:message key="Reinstate"/></button><!-- 
			 --><button type="button" style="display:none;" btnAuth="CANCEL_NOT_USE" class="btn_normal" name="btn_cancel" id="btn_cancel" onClick="doWork('btn_cancel');"><bean:message key="Cancel"/></button><!-- 
			 --><button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr5() : ""%>" class="btn_normal" id="link_Print" name="link_Print" onClick="doWork('link_Print');"><bean:message key="Print"/></button><!-- 
			  --><button type="button" style="display:none;" btnAuth="TRUCK_FEE"  class="btn_normal" id="link_TruckFee" name="link_TruckFee" onClick="doWork('link_TruckFee');"><bean:message key="Truck_Fee"/></button><!-- 
   			 --><button type="button" style="display:none;" btnAuth="OTHER_COSTS"  class="btn_normal" id="link_OthCost" name="link_OthCost" onClick="doWork('link_OthCost');"><bean:message key="Other_Costs"/></button><!--  
   		 	 --><button type="button" style="display:none;" btnAuth="PUTAWAY_UPDATE"  class="btn_normal" id="link_Putaway" name="link_Putaway" onClick="doWork('link_Putaway');"><bean:message key="Putaway_Update"/></button><!-- 
   		 	 --><button type="button" style="display:none;" btnAuth="HISTORY" class="btn_normal" id="link_History" name="link_History" onClick="doWork('link_History');"><bean:message key="History"/></button>
 --%>	</div>
<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		</div>
</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="50" />
				<col width="150"/>
				<col width="110" />
				<col width="*"/>						
			</colgroup>
			<tbody>
				<tr>					
					<th><bean:message key="IB_Complete_No"/></th>
					<td><input name="in_wib_in_no" id="in_wib_in_no" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
					<th><bean:message key="IN_Booking_No"/></th>
					<td><input name="in_wib_bk_no" id="in_wib_bk_no" value="" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
				</tr>
			</tbody>
		</table>
		</div>
</div>

<div class="wrap_result">
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="50" />
				<col width="220" />
				<col width="160" />
                <col width="220" />
				<col width="160" />
				<col width="*" />
			</colgroup>
			<tbody>
			<tr>
				<th><a style="color:#0000FF" href="javascript:btn_link_inbk();" id="btn_link_inbk"><span class="point_B"><bean:message key="IN_Booking_No"/></span></a></th>
				<td><input name="wib_bk_no" type="text" class="L_input_R" id="wib_bk_no" style="width:214px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1"/></td>
				<th><bean:message key="Cust_Order_No"/></th>
				<td><input name="cust_ord_no" type="text" class="L_input_R" id="cust_ord_no" style="width:214px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1"/></td>		
				<td></td>
				<td></td>				
			</tr>		
			<tr>
				<th><bean:message key="IB_Complete_No"/></th>
				<td><input name="wib_in_no" type="text" class="L_input_R" id="wib_in_no" style="width:214px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1"/></td>
				<th><bean:message key="Status"/></th>
				<td colspan="3">
					<input name="in_sts_cd_combo" type="hidden" class="L_input_R" id="in_sts_cd_combo" />
					<!-- <script type="text/javascript">comComboObject('in_sts_cd', 1, 80, 1);</script> -->
					<bean:define id="MsList" name="cdMap" property="in_sts_cd"/>
						<select name="in_sts_cd" id="in_sts_cd" class="search_form">
						<option value=''></option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
							</logic:iterate>
						</select><!-- 
					 --><input type="checkbox" id="checkClose" name="checkClose" /><label for="checkClose"><bean:message key="Complete"/></label>
				</td>						
			</tr>
			<tr>
             	<th><p><bean:message key="Inbound_Date"/></p></th>
				<td><input name="inbound_dt" id="inbound_dt" type="text" class="L_input_R" style="width:75px;" maxlength="10" readOnly tabindex="-1" /><!-- 
					 --><input name="inbound_hm" id="inbound_hm" type="text" class="L_input_R" style="width:50px;" dataformat="hm" maxlength="5" readOnly tabindex="-1" />
				</td>
				<th><bean:message key="Owner"/></th>
				<td><input name="owner_cd" id="owner_cd" type="text" class="L_input_R" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
					 --><input name="owner_nm" id="owner_nm" type="text" class="L_input_R" style="width:135px;" readOnly tabindex="-1" />
				</td>
				<th><a style="color:#0000FF" href="javascript:btn_link_ctrt();" id="btn_link_ctrt"><span class="point_B"><bean:message key="Contract_No"/></span></a></th>
				<td><input name="ctrt_no" id="ctrt_no" type="text" class="L_input_R" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input_R" id="user_nm" dataformat="engup" otherchar = " ()-_" style="width:135px;" readOnly tabindex="-1" />
				</td>
			</tr>
          	<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>
						<bean:define id="MsList" name="cdMap" property="warehouse"/>
							<select name="wh_cd" id="wh_cd" class="search_form" style="width: 213px;" disabled="disabled">
								<option value=""></option>
								<logic:iterate id="codeVO" name="MsList">
									<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
								</logic:iterate>
							</select>
				</td>
				<th><bean:message key="Free_days"/></th>
				<td><input name="freetime_day" id="freetime_day" type="text" class="L_input" dataformat="num" data style="text-align:right; width:75px;" maxlength="5" onChange="calLastFreeDate();"/><!-- 
				     --><input name="lastfree_dt" id="lastfree_dt" type="text" class="L_input" style="width:75px;"  maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
				      --><button type="button" name="btn_lastfree_dt" id="btn_lastfree_dt" class="calendar ir" tabindex="-1" onClick="doWork('btn_lastfree_dt');"></button>
				</td>
				<th><bean:message key="Total_PE"/></th>
				<td><input name="tot_in_item_pe_qty" type="text" class="L_input_R" id="tot_in_item_pe_qty" dataformat="float" style="text-align:right; width:214px" readonly tabindex="-1"/></td>
			</tr>
        	<tr>
				<th><bean:message key="Updated_Date"/></th>
				<td><input name="modi_loc_dt" id="modi_loc_dt" type="text" class="L_input_R" style="width:75px;" maxlength="10" readOnly tabindex="-1" /></td>
                <th><bean:message key="Updated_User"/></th>
				<td><input name="modi_ofc_cd" id="modi_ofc_cd" type="text" class="L_input_R" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="10" readOnly tabindex="-1" /><!-- 
					 --><input name="modi_nm" id="modi_nm" type="text" class="L_input_R"  style="width:135px;" readOnly tabindex="-1" />
				</td>
				<th><bean:message key="Customs_Ref"/></th>
				<td><input name="custms_ref_no" id="custms_ref_no" type="text" class="L_input" style="width:214px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/></td>
			</tr>
			<tr>
				<th><bean:message key="Remark"/></th>
				<td colspan="5"><textarea name="rmk" id="rmk" class="L_textarea" style="height:50px; width:977px;"></textarea></td>
			</tr>
		</table>
	</div>
<!-- opus_design_grid(S) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>

<form name="form1" method="POST" action="./GateServlet.gsl">
 <input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/> 
    <input type="hidden" name="docType" value="" id="docType" />
</form>
 <script type="text/javascript">
//OFVFOUR-8041 [PQC][Putaway Entry] The system shows error when clicking the IB Complete No. hyperlink
var attr_extension = "<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>";
doBtnAuthority(attr_extension);
</script>
