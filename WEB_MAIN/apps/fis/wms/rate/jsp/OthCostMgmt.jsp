
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : OthCostMgmt.jsp
*@FileTitle  : Other Costs Management
*@author     : Khoa.Nguyen
*@version    : 1.0
*@since      : 2015/07/17
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
    <script type="text/javascript" src="./apps/fis/wms/rate/script/OthCostMgmt.js?ver=<%=CLT_JS_VER%>"></script>
<%

String req_bk_cls_cd   = ""; //입출고 구분 : IN/OUT
String req_search_tp   = ""; //T : Truck Fee    O : Other Costs
String req_search_no   = ""; //입고, 출고번호
try {
	req_bk_cls_cd   = request.getParameter("bk_cls_cd")== null?"":request.getParameter("bk_cls_cd");
	req_search_tp   = request.getParameter("search_tp")== null?"":request.getParameter("search_tp");
	req_search_no   = request.getParameter("search_no")== null?"":request.getParameter("search_no");
	
}catch(Exception e) {
	out.println(e.toString());
}	


%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
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
        order_relCode+= '<bean:write name="codeVO" property="code"/>';
        order_relText+= '<bean:write name="codeVO" property="name"/>';
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
        sts_cdCode+= '<bean:write name="codeVO1" property="code"/>';
        sts_cdText+= '<bean:write name="codeVO1" property="name"/>';
    </logic:iterate>
    /*Warehouse code  */
	var WHCDLIST1 = " |";
	var WHCDLIST2 = " |";
	var map1 ={};
	<% isBegin = false; %>
	<bean:define id="WhList" name="cdMap" property="warehouse"/>
	<logic:iterate id="WhVO" name="WhList">
	    <% if(isBegin){ %>
	    WHCDLIST1+= '|';
	    WHCDLIST2+= '|';
	    <% }else{
	          isBegin = true;
	       } %>
	       WHCDLIST1+= '<bean:write name="WhVO" property="wh_cd"/>';
	       WHCDLIST2+= '<bean:write name="WhVO" property="wh_cd"/>'+' : '+ '<bean:write name="WhVO" property="wh_nm"/>';
	       map1['<bean:write name="WhVO" property="wh_cd"/>'] = '<bean:write name="WhVO" property="wh_nm"/>';
	</logic:iterate>
	/*Freight code  */
	var FreightText = ' |';
	var FreightCode = ' |';
	var map2 ={};
	<%boolean isBegin_Freight = false; %>
	<bean:define id="FrtList" name="cdMap" property="Freight"/>
	<logic:iterate id="FrtVO" name="FrtList">
	    <% if(isBegin_Freight){ %>
	    FreightCode+= '|';
	    FreightText+= '|';
	    <% }else{
	          isBegin_Freight = true;
	       } %>
	       FreightCode+= '<bean:write name="FrtVO" property="frt_cd" filter="false"/>';
	       FreightText+= '<bean:write name="FrtVO" property="frt_cd" filter="false"/>'+'\t '+'<bean:write name="FrtVO" property="frt_cd_nm" filter="false"/>';
	       map2['<bean:write name="FrtVO" property="frt_cd" filter="false"/>'] = '<bean:write name="FrtVO" property="frt_cd_nm" filter="false"/>';
	</logic:iterate>
	/*Curr code  */
	var CurrCode = "";
	<%boolean isBegin_Curr = false; %>
	<bean:define id="CurrList" name="cdMap" property="Curr"/>
	<logic:iterate id="CurrVO" name="CurrList">
	    <% if(isBegin_Curr){ %>
	    CurrCode+= '|';
	    <% }else{
	    		isBegin_Curr = true;
	       } %>
	       CurrCode+= '<bean:write name="CurrVO" property="cd_val"/>';
	</logic:iterate>
</script>
    <%-- <script type="text/javascript">
	<%=JSPUtil.getIBCodeCombo("order_rel" , "", "WB1", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("sts_cd" , "", "WR1", "0", "")%>
	/* var sts_cdText = "New|Saved|Closed";
	var sts_cdCode = "N|S|C"; */
	</script> --%>

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
	<input type="hidden" id="f_cmd">
	<input type="hidden" id="auth_lvl" name="auth_lvl" value="LB" />
	
	<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
	<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
	<input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
	<input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="req_bk_cls_cd" id="req_bk_cls_cd" value="<%=req_bk_cls_cd%>"/>
	<input type="hidden" name="req_search_tp" id="req_search_tp" value="<%=req_search_tp%>"/>
	<input type="hidden" name="req_search_no" id="req_search_no" value="<%=req_search_no%>"/>
	<input type="hidden" name="sel_oth_cost_no" id="sel_oth_cost_no"/>
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="OthCostMgmt.clt"/>
	
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
<%-- 			<button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr1() : ""%>" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr3() : ""%>" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr4() : ""%>" class="btn_normal" name="btnDelete" id="btnDelete" onClick="doWork('DELETE');"><bean:message key="Delete"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr6() : ""%>" class="btn_normal" name="btn_excel" id="btn_excel" onClick="doWork('btn_excel');"><bean:message key="Excel"/></button>
 --%>		 </div>
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
<div class="over_wrap" style="height:100%">	
	<div class= "wrap_search">
		<div class="opus_design_inquiry ">
			<table>
		    	<colgroup>
				<col width="80" />
				<col width="250" />
				<col width="110" />
				<col width="240" />
				<col width="190" />
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
						<td><input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 						
							 --><button type="button" class="input_seach_btn" name="btn_ctrt_no" id="btn_ctrt_no" alt="search" onClick="doWork('btn_ctrt_no');"></button><!-- 
							 --><input name="ctrt_nm" id="ctrt_nm" type="text"  class="L_input" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
						</td>
						<th><bean:message key="Billing_Customer"/></th>
						<td><input name="cust_cd" id="cust_cd" type="text" class="L_input" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getCustomerInfo(this)" maxlength="20" OnKeyDown="if(event.keyCode==13){getCustomerInfo(this);}"/><!-- 
							 --><button type="button" class="input_seach_btn" name="btn_cust_cd" id="btn_cust_cd" alt="search" onClick="doWork('btn_cust_cd');"></button><!-- 
							 --><input name="cust_nm" id="cust_nm" type="text" class="L_input" style="width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="50" onKeyDown="if(event.keyCode==13){doWork('btn_cust_cd');}" />
						</td>						
					</tr>
					<tr>
						<th><bean:message key="Status"/></th>
						<td>
							<bean:define id="MsList" name="valMap" property="sts_cd"/>
							<select name="sts_cd" style="width: 100px;" id="sts_cd" class="search_form">
							<option value='ALL'>ALL</option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
							</logic:iterate>
						</select>
						</td>
						<th><bean:message key="SELL_BUY"/></th>
						<td>
							<select name="sb_cls_cd" id="sb_cls_cd" style="width: 109px;" class="search_form">
								<option value='ALL'>ALL</option>
								<option value='S'>SELL</option>
								<option value='B'>BUY</option>
							</select>
						</td>
						<th><bean:message key="Transaction_Date"/></th>
						<td><input name="fm_trans_dt" id="fm_trans_dt" type="text" class="L_input"  maxlength="10" style="width:89px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_trans_dt);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><span class="dash">~</span><!--
						--><input name="to_trans_dt" id="to_trans_dt" type="text" class="L_input"  maxlength="10" style="width:90px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.fm_trans_dt, this);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!--
						--><button class="calendar" tabindex="-1" type="button" name="btn_to_bk_date" id="btn_to_bk_date" onClick="doWork('btn_to_bk_date');"></button>
						</td>
					</tr> 
				</tbody>                   
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
	<div class="wrap_result">
		<!-- opus_design_grid(S) -->
		<div class="opus_design_grid clear">
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_add" id="btn_add" onClick="doWork('btn_add');"><bean:message key="Add"/></button><!-- 
		 	--><button type="button" class="btn_normal" name="btn_del" id="btn_del" onClick="doWork('btn_del');"><bean:message key="Del"/></button>
		</div>
		<!-- opus_design_btn(E) -->
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>
</form>
 <script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>