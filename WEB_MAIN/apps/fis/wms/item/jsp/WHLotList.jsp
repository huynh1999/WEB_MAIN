<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHLotList.jsp
*@FileTitle  : LOT Search
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
    <script type="text/javascript" src="./apps/fis/wms/item/script/WHLotList.js?ver=<%=CLT_JS_VER%>"></script>
     
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="wh_combo" name="cdMap" property="wh_combo"/>
<%
	String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
	String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
	String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
	String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
	
	String loc_cd 		= "";
	String loc_nm 		= "";
	
	String wh_cd		= "";
	String wh_nm		= "";
	String ctrt_no		= "";
	String ctrt_nm		= "";
	String lot_id		= "";
	try {
		loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
		loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
		
		wh_cd  		= request.getParameter("wh_cd")== null?"":request.getParameter("wh_cd");
		wh_nm  		= request.getParameter("wh_nm")== null?"":request.getParameter("wh_nm");
		ctrt_no  	= request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		ctrt_nm  	= request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
		lot_id  	= request.getParameter("lot_id")== null?"":request.getParameter("lot_id");
	}catch(Exception e) {
		out.println(e.toString());
	}
	
	if(!"".equals(wh_cd)){
		DEF_WH_CD = wh_cd;
	}
	if(!"".equals(wh_nm)){
		DEF_WH_NM = wh_nm;
	}
	if(!"".equals(ctrt_no)){
		DEF_WH_CTRT_NO = ctrt_no;
	}
	if(!"".equals(ctrt_nm)){
		DEF_WH_CTRT_NM = ctrt_nm;
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
	
	var wh_comboCode = "";
	var wh_comboText = "";
	
	<logic:iterate id="WHLotListVO" name="wh_combo">
		wh_comboCode+= '<bean:write name="WHLotListVO" property="wh_cd"/>' + '|';
		wh_comboText+= '<bean:write name="WHLotListVO" property="wh_nm"/>' + '|';
	</logic:iterate>
</script>
<form id="form" name="form">

<input type="hidden" id="f_cmd" value="0"/> 
<%-- <input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUser_id()%>" />
<input type="hidden" name="org_cd" id="org_cd" value="<%=userInfo.getOrg_cd()%>" /> 
<input type="hidden" name="f_lot_id" id="f_lot_id" value="<%=lot_id%>" />--%>
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WHLotList.clt"/>
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="f_lot_id" id="f_lot_id" value="<%=lot_id%>" />
<input type="hidden" name="wh_cd_temp" id="wh_cd_temp" value="<%=DEF_WH_CD%>" />
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search"  onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button><!-- 
	 --> --%></div>
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
		<col width="60" />
		<col width="260" />
		<col width="90" />
		<col width="180" />
		<col width="150" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
			<tr>
				<th><bean:message key="Warehouse"/></th>
					<td>
						<select name="wh_combo" id="wh_combo" required style="width: 213px;">
	             		</select> 
					</td>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="ctrt_no" id="ctrt_no" value="<%=DEF_WH_CTRT_NO %>" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onblur="getCtrtInfo(this)" required/><!--
				 --><button type="button" class="input_seach_btn" name="btn_ctrt_no" id="btn_ctrt_no" alt="search" onClick="doWork('btn_ctrt_no');"></button><!-- 						
				 --><input name="ctrt_nm" id="ctrt_nm" value="<%=DEF_WH_CTRT_NM %>" type="text" class="L_input" style="width:118px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required/>
				</td>
<!-- 				//#5899 [OceanBlue-WMS] WMS inventory by Item Name -->
         		<th>
         			<select id="item_type" name="item_type">
							<option value="ITEM_CD"><bean:message key="Item_Code"/></option>
							<option value="ITEM_NM"><bean:message key="Item_Name"/></option>
					</select>
         		</th>
				<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" type="text" class="L_input" id="item_cd" style="width:213px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="100"></td>
			</tr>				
      		<tr>
				<th><bean:message key="Lot_ID"/></th>
				<td><input name="lot_id" type="text" value="<%=lot_id%>" class="L_input" id="lot_id"  dataformat="engup" style="width:213px;ime-mode:disabled;text-transform:uppercase;"  maxlength="16"/></td>
				<th><select id="prop_date_tp">
					<option value="INBOUND_DT">Inbound Date</option>
					<option value="EXP_DT">Expiration Date</option>
					</select>
				</th>
				<td><input name="prop_date_fm" id="prop_date_fm" type="text" class="L_input" maxlength="10" style="width:80px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" onblur="chkCmprPrd(firCalFlag, false, this, this, form.prop_date_to);firCalFlag=false;" onkeypress="onlyNumberCheck();"
        				   onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
					 --><span class="dash">~</span><!-- 
					 --><input name="prop_date_to" id="prop_date_to" type="text" class="L_input" maxlength="10" style="width:74px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_fm, this);firCalFlag=false;" onkeypress="onlyNumberCheck();"
        					   onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
					 --><button type="button" name="btn_prop_date_to" id="btn_prop_date_to" class="calendar ir" tabindex="-1" onClick="doWork('btn_prop_date_to');"></button>
				</td>
				<th><select id="prop_no_tp">
					<option value="LOT_NO">Item Lot No.</option>
					<option value="LOT_04">Lot 04</option>
					<option value="LOT_05">Lot 05</option>
					</select>
				</th>
				<td><input name="prop_no" type="text" class="L_input" id="prop_no" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" style="width:213px;ime-mode:disabled;text-transform:uppercase;"  maxlength="20"/></td>
			</tr>
		</tbody>
	</table>
</div>
</div>
<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>