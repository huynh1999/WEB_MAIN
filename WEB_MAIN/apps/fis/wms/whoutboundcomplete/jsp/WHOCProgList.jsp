<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCProgList.jsp
*@FileTitle  : Outbound Progress Search
*@author     : Kieu.Le - DOU Network
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
    <script type="text/javascript" src="./apps/fis/wms/whoutboundcomplete/script/WHOCProgList.js?ver=<%=CLT_JS_VER%>"></script>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

String loc_cd 		= "";
String loc_nm 		= "";
try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
}catch(Exception e) {
	out.println(e.toString());
}


%>

<script type="text/javascript">
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

<%-- <script type="text/javascript">
	<%=JSPUtil.getIBCodeCombo("ord_tp_cd", "", "WB3", "0", "")%>
</script> --%>  

<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0"/>
<input type="hidden" name="out_cnt" value="0" />
<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
<input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" /> 
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WHOCProgList.clt"/>

<div class="page_title_area clear">
	<!-- page_title(S) -->
	 <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2> 
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 	 --><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btn_excel" id="btn_excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button>
 --%>	</div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
	<!-- page_location(E) -->
</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry ">
		<table>
			<colgroup>
				<col width="100" />
				<col width="220" />
				<col width="170" />
                <col width="220" />
				<col width="100" />
				<col width="*" />
			</colgroup>				
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>
								<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="wh_cd" id="wh_cd" class="search_form" style="width: 238px;" required>
									<option value=""></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td>
					<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_ctrt_no');"></button><!-- 						
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
				</td>
                <th><bean:message key="Consignee"/></th>
				<td>
					<input name="buyer_cd" type="text" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('BILLTO',this, 'onBlur')" id="buyer_cd" maxlength="10" OnKeyDown="if(event.keyCode==13){codeNameAction('BILLTO',this, 'onKeyDown');}"/><!-- 
					 --><button type="button" name="btn_buyer_cd" id="btn_buyer_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_buyer_cd');"></button><!-- 
					 --><input name="buyer_nm" type="text" class="L_input" id="buyer_nm" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CustPopup();}"/>
				</td>
			</tr>				
            <tr>
				<th>
				<!-- <script type="text/javascript" type="text/javascript">ComComboObject('cond_tp_no', 1, 120, 1);</script> -->
				<select name="cond_tp_no" id="cond_tp_no" style="width: 140px">
							<option value='WOB_BK_NO' selected><bean:message key="Booking_No"/></option>
							<option value='WOB_OUT_NO'  ><bean:message key="Complete_LP__No"/></option>
				</th>
				<td>
					<input name="cond_no" type="text" class="L_input" id="cond_no" style="width:238px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14"/>
				</td>
				<th>
				<!-- <script type="text/javascript" type="text/javascript">ComComboObject('cond_tp_date', 1, 105, 1);</script> -->
				<select name="cond_tp_date" id="cond_tp_date" style="width: 140px">
							<option value='BK_DATE' selected><bean:message key="Booking_Date"/></option>
							<option value='OUTBOUND_DT'  ><bean:message key="Complete_Date"/></option>
				</th>
				<td>
				    <input name="cond_fm_date" id="cond_fm_date" type="text" class="L_input" required maxlength="10" style="width:89px;" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.cond_to_date);firCalFlag=false;" onkeypress="onlyNumberCheck();" /><!-- 
				    --><span class="dash">~</span><!--
					 --><input name="cond_to_date" id="cond_to_date" type="text" required class="L_input" maxlength="10" style="width:90px;" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.cond_fm_date, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" /><!-- 
					 --><button type="button" name="btn_cond_to_date" id="btn_cond_to_date" class="calendar ir" tabindex="-1" onClick="doWork('btn_cond_to_date');"></button>
				</td>
                      <th><bean:message key="Order_Type"/></th>
				<td>
					<!-- <script type="text/javascript" type="text/javascript">ComComboObject('ord_tp_cd', 1, 223, 1);</script>	 -->
					<bean:define id="MsList" name="cdMap" property="ord_tp_cd"/>
						<select name="ord_tp_cd" id="ord_tp_cd" class="search_form">
							<option value='ALL' selected ><bean:message key="ALL"/></option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
							</logic:iterate>
						</select>					
				</td>
			</tr>
                  <tr>
				<th><bean:message key="Item"/></th>
				<td>
					<input name="item_cd" otherchar = "-" id = "item_cd" type="text" class="L_input" style="width:238px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
				</td>
				<th><bean:message key="Item_Lot"/></th>
				<td>
					<input name="lot_no" id = "lot_no" type="text" class="L_input" style="width:223px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
				</td>
                      <th><bean:message key="Status"/></th>
				<td>
					<!-- <script type="text/javascript" type="text/javascript">ComComboObject('ob_status', 1, 223, 1);</script> -->	
					<select name="ob_status" id="ob_status" style="width: 223px">
							<option value='ALL' ><bean:message key="ALL"/></option>
							<option value='N' selected ><bean:message key="Booked"/></option>
							<option value='I'  ><bean:message key="Issued"/></option>
							<option value='A'  ><bean:message key="Allocated"/></option>
							<option value='P'  ><bean:message key="Planned"/></option>
							<option value='C'  ><bean:message key="Completed"/></option>					
				</td>
			</tr>					
		</table>
	</div>
</div>

<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>

<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>