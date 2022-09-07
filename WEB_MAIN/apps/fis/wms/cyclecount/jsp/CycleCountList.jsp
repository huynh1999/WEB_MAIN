<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CycleCountList.jsp
*@FileTitle  : Cycle Count Search
*@author     : Kieu.Le - DOU Network
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
<script type="text/javascript" src="./apps/fis/wms/cyclecount/script/CycleCountList.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 
<%

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

//invmove search list에서 link
String req_plan_no  = "";

//wave에서 link
String wh_nm = "";
String req_wave_no  = "";
String req_wave_wh_cd  = "";
String req_wave_wh_nm  = "";
String req_wave_ctrt_no  = "";
String req_wave_ctrt_nm  = "";

// String cycle_cnt_tp_cd = "";

try {
	req_plan_no   = request.getParameter("plan_no")== null?"":request.getParameter("plan_no");
	
	req_wave_no			= request.getParameter("wave_no")== null?"":request.getParameter("wave_no");
	req_wave_wh_cd		= request.getParameter("wave_wh_cd")== null?"":request.getParameter("wave_wh_cd");
	req_wave_wh_nm		= request.getParameter("wave_wh_nm")== null?"":request.getParameter("wave_wh_nm");
	req_wave_ctrt_no	= request.getParameter("wave_ctrt_no")== null?"":request.getParameter("wave_ctrt_no");
	req_wave_ctrt_nm	= request.getParameter("wave_ctrt_nm")== null?"":request.getParameter("wave_ctrt_nm");
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>

<!-- <script> -->
<%-- 	<%=JSPUtil.getIBCodeCombo("cycle_cnt_tp_cd",   "", "WCC", "0", "")%> --%>
<!-- </script> -->

<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<bean:define id="cycle_cnt_tp_cd" name="cdMap" property="cycle_cnt_tp_cd"/>
<script>
var cycle_cnt_tp_cdCode = "";
var cycle_cnt_tp_cdText = "";
var accrual_cdText = "";
var accrual_cdCode = "";
<!-- Freight Unit 단위 -->
		<% boolean isBegin_cycle_cnt_tp_cd = false; %>
        <logic:iterate id="codeVO" name="cycle_cnt_tp_cd">
            <% if(isBegin_cycle_cnt_tp_cd){ %>
            accrual_cdText+= '|';
            accrual_cdCode+= '|';
            <% }else{
             	isBegin_cycle_cnt_tp_cd = true;
            } %>
            cycle_cnt_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
            cycle_cnt_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
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

	var WHCDLIST = "";
	var WHNMLIST = "";
	<bean:define id="MsList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="MsList">
          WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>'+ '|';
          WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>'+ '|';
    </logic:iterate>
</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="f_CurPage"/>

<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />

<input type="hidden" name="req_plan_no" id="req_plan_no" value="<%=req_plan_no%>" />
<input type="hidden" name="req_wave_no" id="req_wave_no" value="<%=req_wave_no%>" />
<input type="hidden" name="wave_no" id="wave_no" />
<input type="hidden" name="req_wave_wh_cd" id="req_wave_wh_cd" value="<%=req_wave_wh_cd%>" />
<input type="hidden" name="req_wave_wh_nm" id="req_wave_wh_nm" value="<%=req_wave_wh_nm%>" />
<input type="hidden" name="req_wave_ctrt_no" id="req_wave_ctrt_no" value="<%=req_wave_ctrt_no%>" />
<input type="hidden" name="req_wave_ctrt_nm" id="req_wave_ctrt_nm" value="<%=req_wave_ctrt_nm%>" />


<input type="hidden" name="mode" id="mode" />
<input type="hidden" name="plan_cnt" id="plan_cnt" />
<input type="hidden" name="wh_cd_org" id="wh_cd_org" />
<input type="hidden" name="wh_nm_org" id="wh_nm_org" />
<input type="hidden" name="ctrt_no_org" id="ctrt_no_org" />
<input type="hidden" name="ctrt_nm_org" id="ctrt_nm_org" />

<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="CycleCountList.clt"/>

<div class="page_title_area clear">

 <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
 
	 <div class="opus_design_btn TOP">
<%-- 	   		<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		  --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button>
 --%>	 </div>
		<!-- page_location(S) -->
			<div class="location">
				 <span><%=LEV1_NM%></span> &gt;
				 <span><%=LEV2_NM%></span> &gt;
				 <span><%=LEV3_NM%></span>
				 <a href="" class="ir">URL Copy</a>
			</div>
		<!-- page_location(E) -->
	</div>
<div class= "over_wrap">	
	<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
				<colgroup>
					<col width="50" />
					<col width="220" />
					<col width="130" />
	                <col width="220" />
					<col width="180" />
					<col width="*" />
				</colgroup>
				<tbody>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>					
						<bean:define id="MsList" name="cdMap" property="warehouse"/>
						<select name="wh_cd" id="wh_cd" class="search_form" style="width: 170px;" required>
							<option value=""></option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
							</logic:iterate>
						</select>
					</td>
					<th><a style="color:#0000FF" href="javascript:btn_link_ctrt();" id="btn_link_ctrt"><span class="point_B"><bean:message key="Contract_No"/></span></a></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onChange="getCtrtInfo(this)"/><!-- 
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" class="input_seach_btn" tabindex="-1" onclick=""></button><!-- 						
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
					</td>
					<th><bean:message key="Cycle_Count_Key"/></th>
					<td>					
						<input name="cycle_cnt_no" type="key" class="L_input" id="cycle_cnt_no" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
					</td>
				</tr>
	                  <tr>
					<th><bean:message key="Cycle_Count_Type"/></th>
					<td>
					<!-- <script language="javascript" type="text/javascript">ComComboObject('cycle_cnt_tp_cd', 1, 213, 1);</script> -->
						
		        		<select name="cycle_cnt_tp_cd" id="cycle_cnt_tp_cd" class="search_form" style="width: 170px;">
		        			<option value=''><bean:message key="All"/></option>
           					<logic:iterate id="codeVO" name="cycle_cnt_tp_cd">
           						<option value='<bean:write name="codeVO" property="code"/>'>
           							<bean:write name="codeVO" property="name"/>
           						</option>
           					</logic:iterate>
            			</select>
					</td>
					<th><bean:message key="Cycle_Count_Date"/></th>
					<td>
						<input name="cycle_cnt_dt_fm" id="cycle_cnt_dt_fm" type="text" class="L_input" maxlength="10" style="width:75px;" 
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.cycle_cnt_dt_to);firCalFlag=false;"/><!-- 
						 --><span class='dash'>~</span><!-- 
						 --><input name="cycle_cnt_dt_to" id="cycle_cnt_dt_to" type="text" class="L_input" maxlength="10" style="width:75px;" 
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.cycle_cnt_dt_fm,this);firCalFlag=false;"/><!-- 
						 --><button type="button" name="btn_cycle_cnt_dt_to" id="btn_cycle_cnt_dt_to" onClick="doWork('btn_cycle_cnt_dt_to');" class="calendar ir" tabindex="-1">
					</td>
					<th><bean:message key="Gap"/></th>
					<td>
<!-- 					<script language="javascript" type="text/javascript">ComComboObject('gap_tp', 1, 130, 1);</script> -->
						<select name="gap_tp" id="gap_tp" style="width: 130px">
							<option value="All"><bean:message key="ALL"/></option>
							<option value="Y"><bean:message key="Y"/></option>
							<option value="N"><bean:message key="N"/></option>
						</select>
					</td>
				</tr>
				</tbody>
			</table>
	</div>
	</div>
	
	<div class="wrap_result">
		<!-- opus_design_grid(S) -->
		<h3 class="title_design"><bean:message key="Cycle_Count_List"/></h3>
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
									<td width="700px;" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
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