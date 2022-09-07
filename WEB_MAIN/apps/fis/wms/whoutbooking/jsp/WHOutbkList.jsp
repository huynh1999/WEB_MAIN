<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutbkList.jsp
*@FileTitle  : Outbound Booking Search
*@author     : Khoa.Nguyen
*@version    : 1.0
*@since      : 2015/07/16
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
    <script type="text/javascript" src="./apps/fis/wms/whoutbooking/script/WHOutbkList.js?ver=<%=CLT_JS_VER%>"></script>
    
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
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<script> 
	var WHCDLIST1 = '';
	var WHCDLIST2 = '';
	<%boolean isBegin = false; %>
    <bean:define id="WhList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="WhList">
        <% if(isBegin){ %>
        WHCDLIST1+= '|';
        WHCDLIST2+= '|';
        <% }else{
              isBegin = true;
           } %>
           WHCDLIST1+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHCDLIST2+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
</script>
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

<input type="hidden" id="f_cmd" value=""/>
<input type="hidden" name="out_cnt" value="0" />
<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
<input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="out_cnt" value="0">
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<input type="hidden" name="pageurl" id="pageurl" value="WHOutbkList.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr1() : ""%>" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr6() : ""%>" class="btn_normal" name="btn_excel" id="btn_excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button><!-- 
	 	 --><button type="button" style="display:none;" btnAuth="ALLOCATION" class="btn_normal" name="lnk_allocation" id="lnk_allocation"	onclick="doWork('lnk_allocation')">Allocation</button>
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
<div class= "wrap_search">
<div class="opus_design_inquiry ">
	<table>
    	<colgroup>
		<col width="60" />
		<col width="250" />
		<col width="110" />
		<col width="200" />
		<col width="150" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>					
					<bean:define id="MsList" name="cdMap" property="warehouse"/>
					<select name="wh_cd" id="wh_cd" class="search_form" style="width: 216px;" onchange="check_authority_wh();">
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td>
					<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 						
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
				</td>
  				<th><bean:message key="Consignee"/></th>
				<td>
					<input name="buyer_cd" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('CUSTUMER',form.buyer_cd,'onBlur');" id="buyer_cd" maxlength="10" OnKeyPress="if(event.keyCode==13){codeNameAction('CUSTUMER',form.buyer_cd,'onKeyDown');}"/><!-- 
					 --><button type="button" name="btn_buyer_cd" id="btn_buyer_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_buyer_cd');"></button><!-- 
					 --><input name="buyer_nm" type="text" class="L_input" id="buyer_nm" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CustPopup();}"/>
				</td>
			</tr>				
      		<tr>
				<!-- <th><script type="text/javascript">ComComboObject('cond_flag', 1, 120, 1);</script></th> -->
				<th>
					<select name="cond_flag" id="cond_flag" style="width: 120px;" class="search_form">
						<option value='WOB_BK_NO'>Booking No.</option>
						<option value='CUST_ORD_NO'>Cust Order No.</option>
					</select>
				</th>
				<td><input name="cond_no" type="text" class="L_input" id="cond_no" style="width:216px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="100"/></td>
				<th><bean:message key="Booking_Date"/></th>
				<td><input name="fm_bk_date" id="fm_bk_date" type="text" class="L_input"  maxlength="10" style="width:95px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" required="required"/><span class="dash">~</span><!--
						--><input name="to_bk_date" id="to_bk_date" type="text" class="L_input"  maxlength="10" style="width:94px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.fm_bk_date, this);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"  required="required"/><!--
						--><button class="calendar" tabindex="-1" type="button" name="btn_to_bk_date" id="btn_to_bk_date" onClick="doWork('btn_to_bk_date');"></button>
						</td>
  				<th><bean:message key="Order_Type"/></th>
			<!-- 	<td><script type="text/javascript">ComComboObject('ord_tp_cd', 1, 235, 1);</script></td> -->
				<td>
					<bean:define id="MsList" name="cdMap" property="ord_tp_cd"/>
					<select name="ord_tp_cd" style="width: 235px;" id="ord_tp_cd" class="search_form">
						<option value='ALL'>ALL</option>
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
						</logic:iterate>
					</select>
				</td>
			</tr>
    		<tr>
				<th><bean:message key="Item"/></th>
				<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:216px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
				<th><bean:message key="Item_Lot"/></th>
				<td><input name="lot_no" id = "lot_no" type="text" class="L_input"  maxlength="20" style="width:233px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
  				<th><bean:message key="Status"/></th>
				<!-- <td><script type="text/javascript">ComComboObject('bk_sts_cd', 1, 235, 1);</script></td> -->
				<td>
					<bean:define id="MsList" name="cdMap" property="bk_sts_cd"/>
					<select name="bk_sts_cd" style="width: 235px;" id="bk_sts_cd" class="search_form">
						<option value='ALL'>ALL</option>
						<option value='N'>Booked</option>
						<option value='I'>Issued</option>
						<option value='A'>Allocated</option>
						<option value='P'>Planned</option>
						<option value='X'>Completed</option>
						<option value='C'>Cancel</option>
						<%-- <logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
						</logic:iterate> --%>
					</select>
				</td>
			</tr>
			<tr>
                        <th><bean:message key="Reference_No"/></th>
                        <td>
                            <input name="ref_no" id = "ref_no" type="text" class="L_input" style="width:216px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
                        </td>
                        <th></th>
                        <td></td>
                        <th></th>
                        <td></td>
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
</form>
<script type="text/javascript">
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	doBtnAuthority(attr_extension);
</script>