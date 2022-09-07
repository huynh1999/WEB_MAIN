<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInList.jsp
*@FileTitle  : Inbound Search
*@author     : Tien.Duong - DOU Network
*@version    : 1.0
*@since      : 2016/08/31
=========================================================--%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/outboundmanagement/script/WaveSmpMgmt.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String req_wave_no   = "";
	String req_wob_bk_no   = "";

	String DEF_WH_CTRT_NO = "";
	String DEF_WH_CTRT_NM = "";
	String DEF_WH_CD = "";
	String DEF_WH_NM = "";
	try {
		DEF_WH_CTRT_NO  = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
		DEF_WH_CTRT_NM  = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
		DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
		DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
		
		req_wave_no   = request.getParameter("req_wave_no")== null?"":request.getParameter("req_wave_no");
		req_wob_bk_no   = request.getParameter("req_wob_bk_no")== null?"":request.getParameter("req_wob_bk_no");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>

<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="warehouse" name="cdMap" property="warehouse"/>
<bean:define id="ord_tp_cd" name="cdMap" property="ord_tp_cd"/>
<bean:define id="rtn_bk_sts_cd" name="cdMap" property="rtn_bk_sts_cd"/>
<bean:define id="whallcstrglist" name="cdMap" property="whallcstrglist"/>
<script language="javascript">    
	var rtn_bk_sts_cdCode = "";
	var rtn_bk_sts_cdText = "";
	var combo_all = "ALL";
    <logic:iterate id="codeVO" name="rtn_bk_sts_cd">
   		rtn_bk_sts_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
   		rtn_bk_sts_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
   	</logic:iterate>
   	
   	var ord_tp_cdCode = "";
	var ord_tp_cdText = "";
    <logic:iterate id="codeVO" name="ord_tp_cd">
    	ord_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
    	ord_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
   	</logic:iterate>
   	
	var whallcstrglistCode = "";
	var whallcstrglistText = "";
    <logic:iterate id="codeVO" name="whallcstrglist">
    	whallcstrglistCode+= '<bean:write name="codeVO" property="code"/>' + '|';
    	whallcstrglistText+= '<bean:write name="codeVO" property="name"/>' + '|';
   	</logic:iterate>
</script>
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage();
	}
</script>
<form id="form" name="form">
<input type="hidden" name="req_wave_no" id="req_wave_no" value="<%=req_wave_no%>" />
<input type="hidden" name="req_wob_bk_no" id="req_wob_bk_no" value="<%=req_wob_bk_no%>" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="sel_tab" id="sel_tab" value="01"/>
<input type="hidden" name="mode" id="mode" value="SEARCH_NEW"/>
<input type="hidden" name="issu_cnt_tot" id="issu_cnt_tot" />
<input type="hidden" name="lp_cnt_tot" id="lp_cnt_tot" />
<input type="hidden" name="allc_cnt_tot" id="allc_cnt_tot" />
<input type="hidden" name="pickd_cnt_tot" id="pickd_cnt_tot" />
<input type="hidden" id="tro_no" name="tro_no" />
<input type="hidden" id="src_cd" name="src_cd" />
<input type="hidden" id="f_cmd"/>
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WaveSmpMgmt.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><span id="bigtitle"><%=LEV3_NM%></span></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> class="btn_accent" name="btnSearch" id="btnSearch" onClick="doWork('SEARCHLIST');" ><bean:message key="Search"/></button><!-- 
		 --><button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %>  class="btn_normal" name="btnNew" id="btnNew" onClick="doWork('NEW');" ><bean:message key="New"/></button><!--
		 --><button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %>  class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');" ><bean:message key="Save"/></button><!--
		 --><button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr4() + "'"  : "" %>  class="btn_normal" name="btnDelete" id="btnDelete" onClick="doWork('DELETE');" ><bean:message key="Delete"/></button><!--
		 --><button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr5() + "'"  : "" %>  class="btn_normal" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');" ><bean:message key="Print"/></button>
 --%>	</div>
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
<div class="over_wrap" height="100%">
<div class= "wrap_search_tab">
</div>
<div class= "wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="List"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Wave"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Allocated_List"/></span></a></li>
        <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Unallocated_List"/></span></a></li>
    </ul>
<!-- Tab1 - LIST (S)  -->
<div id="tabLayer" name="tabLayer" style="display:inline">  
	<div class= "opus_design_inquiry">
		<table>
			<colgroup>
				<col width="100">
				<col width="230">
				<col width="130">
             	<col width="250">
				<col width="100">
				<col width="*">
			</colgroup>
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<bean:define id="warehouse" name="cdMap" property="warehouse"/>
					<select name="list_wh_cd" id="list_wh_cd" style="width: 190px;" required>
						<logic:iterate id="WhVO" name="warehouse">
							<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="list_ctrt_no" id="list_ctrt_no" type="text" style="ime-mode:disabled;text-transform:uppercase;width:80px;" dataformat="excepthan" onBlur="strToUpper(this);getCtrtInfo2(this,document.form.list_ctrt_nm);" maxlength="10"/><!-- 						
			  	 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_list_ctrt_no')"></button><!-- 
				 --><input name="list_ctrt_nm" id="list_ctrt_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:150px;" dataformat="excepthan" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup('listEnter');}"/><!-- 
				 --><input name="list_rtp_no" id="list_rtp_no" type="hidden" /><!-- 	
				 --><input name="list_owner_cd" id="list_owner_cd" type="hidden" />
				</td>
                <th><bean:message key="Ship_To"/></th>
				<td>
					<input name="list_ship_to" id = "list_ship_to" type="text" style="width: 190px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/>
				</td>
			</tr>
          	<tr>
				<td><select style="width:100px;" name="list_in_search_tp" id="list_in_search_tp" class="search_form">
					<option value='WAVE_NO'>Wave No</option>
					<option value='CUST_ORD_NO'>Order No</option>
					<option value='WOB_BK_NO'>Booking No</option>
					</select>
				</td>
				<td><input name="list_in_no" id = "list_in_no" type="text" dataformat="excepthan" onblur="strToUpper(this)" style="width: 190px;ime-mode:disabled;text-transform:uppercase;" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/></td>
				<td>
					<select style="width: 130px;" name="list_in_date_tp" id="list_in_date_tp" class="search_form" onchange="" >
						<option value='WAVE_DT'>Wave Date</option>
					</select>
				</td>
				<td>
					<input name="list_fm_date" id="list_fm_date" type="text" style="width:80px;" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.list_to_date);firCalFlag=false;" onkeypress="onlyNumberCheck();"/><!--
				 --><span class="dash">~</span><!--  
				 --><input name="list_to_date" id="list_to_date" type="text" style="width:80px;" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.list_fm_date, this);firCalFlag=false;" onkeypress="onlyNumberCheck();"/><!--
				 --><button class="calendar" type="button" id="btn_in_loc_dt" name="btn_list_date" onclick="doWork('btn_list_date');" ></button>
				</td>
				<th><bean:message key="Status"/></th>
				<td>
					<select name="list_bk_sts_cd" id="list_bk_sts_cd" class="search_form" >
					</select>
			    </td>
			</tr>
		</table>
	</div>
	<div class= "opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
<!-- Tab1 - LIST (E)  -->
<!-- Tab2 - Wave (S)  -->
<div id="tabLayer" name="tabLayer" style="display:none"> 
	<div class="layout_wrap" style="width:100%">
		<div class="layout_vertical_2" style="width:49%">
			<div class="opus_design_inquiry sm" style="height:180px;">
				<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
				<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tr>
						<th><bean:message key="Warehouse"/></th>
						<td>
							<bean:define id="warehouse" name="cdMap" property="warehouse"/>
							<select name="wave_wh_cd" id="wave_wh_cd" style="width: 190px;" required>
								<logic:iterate id="WhVO" name="warehouse">
									<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
								</logic:iterate>
							</select>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Contract_No"/></th>
						<td><input name="wave_ctrt_no" id="wave_ctrt_no" type="text" style="ime-mode:disabled;text-transform:uppercase;width:80px;" dataformat="excepthan" onBlur="strToUpper(this);getCtrtInfo2(this,document.form.wave_ctrt_nm);" maxlength="10"/><!-- 						
					  	 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_wave_ctrt_no')"></button><!-- 
						 --><input name="wave_ctrt_nm" id="wave_ctrt_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:250px;" dataformat="excepthan" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup('waveenter');}"/>
						</td>
					</tr>
					<tr>
						<td>
							<select name="wave_in_search_tp" id="wave_in_search_tp" class="search_form" style="width:100px;">
								<option value='CUST_ORD_NO'>Order No</option>
								<option value='WOB_BK_NO'>Booking No</option>
							</select>
						</td>
						<td><input name="wave_in_no" id = "wave_in_no" type="text" dataformat="excepthan" style="width:363px;ime-mode:disabled;text-transform:uppercase;" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/></td>
					</tr>
					<tr>
						<td>
							<select name="wave_in_date_tp" id="wave_in_date_tp" class="search_form" style="width:100px;">
								<option value='EST_OUT_DT'>Estimated Date</option>
								<option value='BK_DATE'>Booking Date</option>
							</select>
						</td>
						<td>
							<input name="wave_fm_date" id="wave_fm_date" type="text" style="width:80px;" maxlength="10"  onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, this, form.wave_to_date);firCalFlag=false;" /><!-- 
				 			--><span class="dash">~</span><!--
				 			--><input name="wave_to_date" id="wave_to_date" type="text" style="width:80px;" maxlength="10" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, form.wave_fm_date, this);firCalFlag=false;"/><!--
				 			--><button class="calendar" type="button" id="btn_wave_dt" name="btn_wave_dt" onclick="doWork('btn_wave_dt');" ></button>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Order_Type"/></th>
						<td>
							<select name="wave_ord_tp_cd" id="wave_ord_tp_cd" class="search_form"></select>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="layout_vertical_2" style="width:49%;padding-left:8px;" id="divForm1">
			<div class="opus_design_inquiry sm" style="height:180px;">
			<h3 class="title_design"><bean:message key="Wave_Information"/></h3>
				<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tr>
						<th><bean:message key="Wave_No"/></th>
						<td>
							<input name="wave_no" id = "wave_no" type="text"  dataformat="etc" maxlength="18" readonly tabindex="-1" style="width:150px"/>
							<input type="hidden" id="wh_cd" name="wh_cd" />					
							<input type="hidden" id="ctrt_no" name="ctrt_no" /> 
							<input type="hidden" id="consol_no" name="consol_no" />
							<input type="hidden" id="pick_sht_yn" name="pick_sht_yn" />
						</td>
					</tr>
					<tr>
						<th><bean:message key="Wave_Date"/></th>
						<td>
							<input name="wave_rgst_dt" id="wave_rgst_dt" type="text"  style="width:80px;" readonly tabindex="-1"/>
						</td>
					</tr>
					<tr>
				    	<th><bean:message key="Remark"/></th>
						<td><textarea name="rmk" id="rmk" style="height:80px;width:96%;ime-mode:disabled;text-transform:uppercase;" maxlength="100" onblur="strToUpper(this);"></textarea></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
	<div class="layout_wrap" style="width:100%">
		<div class="layout_vertical_2" style="width:37%">
			<div class="opus_design_inquiry" style="height:450px;">
				<div class="opus_design_grid" id="mainTable">
					<h3 class="title_design"><bean:message key="Order_List"/></h3>
					<div class="opus_design_btn">
			   			<button type="button" class="btn_normal" onclick="btnAddSheet2();" id="btn_add_sheet2" disabled><bean:message key="Add"/></button> 			
					</div>
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
		</div>
		<div class="layout_vertical_2" style="width:61%;padding-left:20px;">
			<div class="opus_design_inquiry" style="height:450px;">
				<div class="opus_design_grid" id="mainTable">
					<h3 class="title_design"><bean:message key="SKU_List"/></h3>
					<div class="opus_design_btn">
			   			<button type="button" class="btn_normal" onclick="btn_Allocation('wave');" id="btn_allocation_wave" disabled><bean:message key="Allocation"/></button><!-- 			
			   			 --><button type="button" class="btn_normal" onclick="btn_ManualAlloc('wave');" id="btn_manualalloc_wave" disabled><bean:message key="Manual_Allocation"/></button><!-- 			
			   			 --><button type="button" class="btn_normal" onclick="btn_Cancel_Wave();" id="btn_cancel_wave" disabled><bean:message key="Cancel"/></button>			
					</div>
					<script type="text/javascript">comSheetObject('sheet3');</script>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- Tab2 - Wave (E)  -->
<!-- Tab3 - Allocation List (E)  -->
<div id="tabLayer" name="tabLayer" style="display:none"> 
	<div class= "layout_wrap">
		<div class="layout_vertical_2" style="width:40%" >
			<div class="opus_design_inquiry sm" style="height:176px;" id="divForm2">
				<table>
					<colgroup>
						<col width="100" />
						<col width="270" />
						<col width="100" />
						<col width="*" />
					</colgroup>
					<tr>
						<th><bean:message key="Wave_No"/></th>
						<td colspan="3">
							<input name="allc_wave_no" id = "allc_wave_no" type="text"  dataformat="etc" maxlength="18" readOnly tabindex="-1" style="width:125px"/>					
						</td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<th><bean:message key="Picking_Date"/></th>
						<td>
							<input name="pick_dt" id="pick_dt" type="text" style="width:80px;" dataformat="mdy" maxlength="10" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, this, form.wave_to_date);firCalFlag=false;"/><!--
				 			--><button class="calendar" type="button" id="btn_wave_dt" name="btn_wave_dt" onclick="doWork('btn_pick_dt');" ></button><!-- 
				 			--><input name="pick_hm_fr" id="pick_hm_fr" type="text" style="width:50px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');setHm(this);" OnBeforeActivate="ComClearSeparator(this, 'hm');" onchange="timeCheck(this,document.form.pick_hm_fr,document.form.pick_hm_to);"/><!--
				 			--><span class="dash">~</span><!--  --><input name="pick_hm_to" id="pick_hm_to" type="text" style="width:50px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');setHm(this);" OnBeforeActivate="ComClearSeparator(this, 'hm');" onchange="timeCheck(this,document.form.pick_hm_fr,document.form.pick_hm_to);"/>
						</td>
						<th><bean:message key="Work_Sheet"/></th>
						<td><button type="button" class="btn_etc" onclick="doWork('btn_pick_sht_view')" id="btn_pick_sht_create" name="btn_pick_sht_create"><span>Create</span></button><!-- 
						--><img src="<%=CLT_PATH%>/web/img/main/icon_doc_g.gif" style="cursor:hand;" name="btn_pick_sht_view" id="btn_pick_sht_view" onclick="doWork('btn_pick_sht_view')"; /><!--
							 --><input type="hidden" name="work_sht_yn" id="work_sht_yn" />
						</td>
					</tr>
					<tr>
						<th><bean:message key="Outbound_Date"/></th>
						<td>
							<input name="outbound_dt" id="outbound_dt" type="text" style="width:80px;" dataformat="mdy" required maxlength="10" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, this, form.wave_to_date);firCalFlag=false;"/><!--
				 			--><button class="calendar" type="button" id="btn_wave_dt" name="btn_wave_dt" onclick="doWork('btn_outbound_dt');" ></button><!-- 
				 			--><input name="outbound_hm_fr" id="outbound_hm_fr" type="text" style="width:50px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');setHm(this);" OnBeforeActivate="ComClearSeparator(this, 'hm');" onchange="timeCheck(this,document.form.outbound_hm_fr,document.form.outbound_hm_to);"/><!--
				 			--><span class="dash">~</span><input name="outbound_hm_to" id="outbound_hm_to" type="text" style="width:50px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');setHm(this);" OnBeforeActivate="ComClearSeparator(this, 'hm');" onchange="timeCheck(this,document.form.outbound_hm_fr,document.form.outbound_hm_to);"/>
						</td>
						<th><bean:message key="Loading_Plan"/></th>
						<td><button type="button" class="btn_etc" onclick="doWork('btn_loading_plan_view')" id="btn_loading_plan_create" name="btn_loading_plan_create"><span>Create</span></button><!-- 
							 --><img src="<%=CLT_PATH%>/web/img/main/icon_doc_g.gif" style="cursor:hand;" name="btn_loading_plan_view" id="btn_loading_plan_view" onclick="doWork('btn_loading_plan_view2')" disabled="true"/><!--
							 --><input type="hidden" name="work_sht_yn" id="work_sht_yn" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="layout_vertical_2" style="width:59%;padding-left:20px;">
			<div class="opus_design_inquiry" style="height:170px;">
				<h3 class="title_design"><bean:message key="Outbound_Summary"/></h3>
				<div class="opus_design_grid" id="mainTable">
					<script type="text/javascript">comSheetObject('sheet6');</script>
				</div>
			</div>
		</div>
	</div>
	<div class= "layout_wrap">
		<div class="opus_design_inquiry" style="height:300px;">
			<div class="opus_design_grid" id="mainTable">
				<h3 class="title_design"><bean:message key="Allocated_Item_List"/></h3>
				<div class="opus_design_btn">
			   		<button type="button" class="btn_normal" onclick="btn_Picking();" id="btn_picking" disabled><bean:message key="Picking"/></button><!-- 			
			   		--><button type="button" class="btn_normal" onclick="btn_Shipping();" id="btn_shipping" disabled><bean:message key="Shipping"/></button><!-- 			
			   		--><button type="button" class="btn_normal" onclick="btn_Cancel_Allc();" id="btn_cancel_allc" disabled><bean:message key="Cancel"/></button><!-- 		
			   		--><button type="button" class="btn_normal" onclick="btn_Excel(sheet4,'Allocated List');" id="btn_excel_allc" disabled><bean:message key="Excel"/></button> 			
				</div>
				<script type="text/javascript">comSheetObject('sheet4');</script>
			</div>
		</div>
	</div>
</div>
<!-- Tab3 - Allocation List (E)  -->

<!-- Tab4 - Unallocation List (E)  -->
<div id="tabLayer" name="tabLayer" style="display:none"> 
		<div class="opus_design_grid" id="mainTable">
			<b><bean:message key="Wave_No"/></b>
			<input name="un_wave_no" id="un_wave_no" type="text"  style="width:150px;"  tabindex="-1" readonly />
			<div class="opus_design_btn">
		   		<button type="button" class="btn_normal" onclick="btn_Allocation('un');" id="btn_allocation_un" disabled><bean:message key="Allocation"/></button><!-- 			
		   		--><button type="button" class="btn_normal" onclick="btn_ManualAlloc('un');" id="btn_manualalloc_un" disabled><bean:message key="ManualAlloc"/></button><!-- 			
		   		--><button type="button" class="btn_normal" onclick="btn_Excel(sheet5,'Unallocated List');" id="btn_excel_un" disabled><bean:message key="Excel"/></button> 			
			</div>
			<script type="text/javascript">comSheetObject('sheet5');</script>
		</div>
</div>
<!-- Tab4 - Unallocation List (E)  -->
	<div id="hiddenSheet" style="display:none">         
		<script language="javascript">comSheetObject('sheet7');</script>                 
	</div>
</div>
</div>
</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>	
