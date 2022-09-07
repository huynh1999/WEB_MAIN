
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CycleCountMgmt.jsp
*@FileTitle  : Cycle Count Management
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/20
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
<script type="text/javascript" src="./apps/fis/wms/cyclecount/script/CycleCountMgmt.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="js/common/CoMessage.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>

<%

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

String cycle_cnt_no  = "";

String req_wave_wh_cd  = "";
String req_wave_wh_nm  = "";
String req_wave_ctrt_no  = "";
String req_wave_ctrt_nm  = "";

try {
	cycle_cnt_no   = request.getParameter("cycle_cnt_no")== null?"":request.getParameter("cycle_cnt_no");
	
	req_wave_wh_cd		= request.getParameter("wave_wh_cd")== null?"":request.getParameter("wave_wh_cd");
	req_wave_wh_nm		= request.getParameter("wave_wh_nm")== null?"":request.getParameter("wave_wh_nm");
	req_wave_ctrt_no	= request.getParameter("wave_ctrt_no")== null?"":request.getParameter("wave_ctrt_no");
	req_wave_ctrt_nm	= request.getParameter("wave_ctrt_nm")== null?"":request.getParameter("wave_ctrt_nm");
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>
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

	<%boolean isBegin = false; %>
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

<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="CycleCountMgmt.clt"/>

<input type="hidden" name="mode" id="mode" />
<input type="hidden" name="plan_cnt" id="plan_cnt" />
<input type="hidden" name="wh_cd_org" id="wh_cd_org" />
<input type="hidden" name="wh_nm_org" id="wh_nm_org" />
<input type="hidden" name="ctrt_no_org" id="ctrt_no_org" />
<input type="hidden" name="ctrt_nm_org" id="ctrt_nm_org" />

<input type="hidden" id="paper_size" name="paper_size" value="A4" />
<input type="hidden" id="com_mrdBodyTitle" name="com_mrdBodyTitle" value="Inventory Movement Work Sheet Print" />
<input type="hidden" id="com_mrdArguments" name="com_mrdArguments"/>
<input type="hidden" id="com_mrdPath" name="com_mrdPath" />
<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
		<button type="button"><%=LEV3_NM%></button>
	</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%--  		<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
		  --><button type="button" btnAuth="CANCEL"  class="btn_normal" name="btn_cancel" id="btn_cancel" onClick="doWork('btn_cancel');"><bean:message key="Cancel"/></button><!-- 
		  --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btnExcel" id="btnExcel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button><!-- 
		  --><button type="button" style="display:none;"  class="btn_normal"  name="btnPrint" id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
	 --> --%>
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

<div class= "over_wrap">
<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
				<col width="105" />
				<col width="*"/>						
			</colgroup>
			<tbody>
				<tr>					
					<th><bean:message key="Cycle_Count_Key"/></th>
					<td><input name="cycle_cnt_no" id="cycle_cnt_no" dataformat="engup" value="<%=cycle_cnt_no%>" required="required" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" onBlur="strToUpper(this);" maxlength="14"/></td>
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
				<col width="250" />
				<col width="120" />
	            <col width="230" />
				<col width="150" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>					
						<select name="wh_cd" id="wh_cd" class="search_form" style="width: 207px;">
							<option value=""></option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
							</logic:iterate>
						</select>
					</td>
					<th><a style="color:#0000FF" href="javascript:btn_link_ctrt();" id="btn_link_ctrt"><span class="point_B"><bean:message key="Contract_No"/></span></a></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" class="L_input_R" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" readOnly tabindex="-1" /><!-- 
						 --><input name="ctrt_nm" id="ctrt_nm" dataformat="engup" otherchar = " ()-_" type="text" class="L_input_R" id="user_nm" style="width:136px;text-transform:uppercase;" readOnly tabindex="-1" />
					</td>
					<th></th>
					<td></td>
				</tr>
				<tr>
					<th><bean:message key="Cycle_Count_Type"/></th>
					<td>				
						<!-- <script language="javascript" type="text/javascript">comComboObject('cycle_cnt_tp_cd', 1, 215, 1);</script> -->
						<input name=cycle_cnt_tp_nm id="cycle_cnt_tp_nm" type="text"   class="L_input_R" style="width:207px;" readOnly tabindex="-1"/><!-- 	
						 --><input name=cycle_cnt_tp_cd id="cycle_cnt_tp_cd" type="hidden" class="L_input_R" style="width:207px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readOnly tabindex="-1"/>	
					</td>
					<th><bean:message key="Worker"/></th>
					<td>
						<input name="worker_nm" id="worker_nm" type="text" class="L_input" style="width:215px;text-transform:uppercase;" maxlength="100"/><!-- 
					 --></td>
		            <th><bean:message key="Cycle_Count_Date"/></th>
					<td>
						<input name="cycle_cnt_dt" id="cycle_cnt_dt" type="text" class="L_input" style="width:80px;" maxlength="10" 
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_cycle_cnt_dt" id="btn_cycle_cnt_dt" onclick="doWork('btn_cycle_cnt_dt');"></button><!-- 
						 --><input name="cycle_cnt_hm_fr"  id="cycle_cnt_hm_fr" type="text" class="L_input" style="width:41px;" dataformat="hm" onblur="timeCheck(this, form.cycle_cnt_hm_fr, form.cycle_cnt_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');" maxlength="5"  /><!-- 
						 --><input name="cycle_cnt_hm_to"  id="cycle_cnt_hm_to" type="text" class="L_input" style="width:41px;" dataformat="hm" onblur="timeCheck(this, form.cycle_cnt_hm_fr, form.cycle_cnt_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');" maxlength="5"  /><!-- 
					 --></td>
				</tr>
				<tr>
					<th><bean:message key="Remark"/></th>
					<td colspan="5"><textarea name="rmk" id="rmk" class="L_textarea" style="width:949px;;" maxlength="400"></textarea></td>
				</tr>
			</tbody>
		</table>
	</div>
	<div class="opus_design_grid clear">
	<h3 class="title_design"><bean:message key="Cycle_Count_List"/></h3>
	<!-- opus_design_grid(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_add" id="btn_add" onclick="doWork('btn_add');"><bean:message key="Add"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_del" id="btn_del" onclick="doWork('btn_del');"><bean:message key="Del"/></button><!-- 
	 --></div>
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
