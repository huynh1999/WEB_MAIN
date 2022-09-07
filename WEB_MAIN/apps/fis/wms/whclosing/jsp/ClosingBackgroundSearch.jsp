
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ClosingBackgroundSearch.jsp
*@FileTitle  : W/H Closing Background Search
*@author     : Tuan.Chau - DOU Network
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
<script type="text/javascript" src="./apps/fis/wms/whclosing/script/ClosingBackgroundSearch.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
String DEF_ORG_CD		= userInfo.getOfc_cd()== null?"":userInfo.getOfc_cd();
String DEF_ORG_NM		= userInfo.getOfc_eng_nm()== null?"":userInfo.getOfc_eng_nm();

try {
	
}catch(Exception e) {
	out.println(e.toString());
}	


%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<script> 
	var WHCDLIST1 = '';
	var WHCDLIST2 = '';
	<%boolean isBegin = false; %>
    <bean:define id="WhList" name="cdMap" property="WH_LIST"/>
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
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd">
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd() %>" />
<input type="hidden" name="auth_lvl" 		value="LB" />
<input type="hidden" name="def_wh_cd" 		value="<%=DEF_WH_CD %>" />
<input type="hidden" name="f_CurPage" value='1'> 
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="ClosingBground.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
		<%-- <button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button> --%>
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

<div class="over_wrap" style="height:100%">
<div class= "wrap_search">
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="50" />
				<col width="220" />
				<col width="220" />
	            <col width="220" />
				<col width="220" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
		        <th><bean:message key="Office"/></th>
				<td>
					<input name="ofc_cd" id="ofc_cd" type="text" value="<%=DEF_ORG_CD%>" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);codeNameAction('office','onBlur');" maxlength="10" OnKeyDown="if(event.keyCode==13){codeNameAction('office', 'onKeyDown');}" onkeypress="if(event.keyCode==13){codeNameAction('office', 'onKeyDown');}"/><!-- 
					 --><button type="button" name="btn_ofc_cd" id="btn_ofc_cd" onClick="doWork('btn_ofc_cd');" class="input_seach_btn" tabindex="-1"></button><!-- 
					 --><input name="ofc_nm" id="ofc_nm" type="text" value="<%=DEF_ORG_NM%>" class="L_input_R" style="width:185px;" readonly /><!-- 
					 --></td>
					<th><bean:message key="Warehouse"/></th>
					<td>
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="WhList" name="cdMap" property="WH_LIST"/>
						<select name="wh_cd" id="wh_cd" class="search_form">
							<option value="ALL"><bean:message key="All"/></option>
							<logic:iterate id="WhVO" name="WhList">
								<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
							</logic:iterate>
						</select>
					</td>
					<th><bean:message key="Contract_No"/></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" value="<%=DEF_WH_CTRT_NO%>" class="L_input" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" class="input_seach_btn" tabindex="-1"></button><!-- 						
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" value="<%=DEF_WH_CTRT_NM%>" class="L_input" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/><!-- 
					 --></td>
				</tr>  
				<tr>
					<th><bean:message key="Closing_Date"/></th>
					<td>
						<input name="fm_cls_date" id="fm_cls_date" type="text" class="L_input" maxlength="10" style="width:80px;" 
						onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"  OnBeforeDeactivate="ComAddSeparator(this)" 
						OnBeforeActivate="ComClearSeparator(this)" 
						 onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_cls_date);firCalFlag=false;" onkeypress="onlyNumberCheck();" required/><!--  
						  --><span class="dash">~</span><!-- 
						  --><input name="to_cls_date" id="to_cls_date" type="text" class="L_input" maxlength="10" style="width:80px;" 
						  onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						  OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" 
						  onblur="chkCmprPrd(firCalFlag, false, this, form.fm_cls_date, this);firCalFlag=false;"onkeypress="onlyNumberCheck();" required/><!-- 
						 --><button type="button" class="calendar ir" name="btn_to_cls_date" id="btn_to_cls_date" onClick="doWork('btn_to_cls_date');"></button><!-- 
					 --></td>
					<th><bean:message key="Status"/></th>
					<td>
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="MsList" name="cdMap" property="sts_cd"/>
						<select name="sts_cd" id="sts_cd" class="search_form">
							<option value='ALL'>All</option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
							</logic:iterate>
						</select>
					</td>					
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
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>