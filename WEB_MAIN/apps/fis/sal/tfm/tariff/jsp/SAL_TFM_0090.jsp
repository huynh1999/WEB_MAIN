<%
/*=========================================================
*Copyright(c) 2017 CyberLogitec. All Rights Reserved.
*@FileName   : SAL_TFM_0090.jsp
*@FileTitle  : Rate Management - Ocean
*@author     : CLT
*@version    : 1.0
*@since      : 2017/07/26
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<!-- 일자 및 달력팝업 호출 -->
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/sal/tfm/tariff/script/SAL_TFM_0090.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String ofc_cd = userInfo.getOfc_cd();
	String ofc_curr_cd = userInfo.getOfc_cnt_cd();
%>

<script>
	var ofcCd = '<%=ofc_cd%>';
	var ofcCurrCd = '<%=ofc_curr_cd%>';
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);

	function setupPage(){
		loadPage();
	}

	<!-- Mode -->
	var MODE_CD = '';
	var MODE_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="modeTpList"  name="valMap" property="modeTpList"/>
		<logic:iterate id="codeVO" name="modeTpList">
			MODE_CD  += '<bean:write name="codeVO" property="cd_val"/>';
			MODE_VAL += '<bean:write name="codeVO" property="cd_nm"/>';
		</logic:iterate>
	</logic:notEmpty>

	<!-- Rate Type -->
	var RATE_TP_CD = '';
	var RATE_TP_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="rateTpList"  name="valMap" property="rateTpList"/>
		<logic:iterate id="codeVO" name="rateTpList">
			RATE_TP_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			RATE_TP_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	RATE_TP_CD  = RATE_TP_CD.substring(0, RATE_TP_CD.length - 1);
	RATE_TP_VAL = RATE_TP_VAL.substring(0, RATE_TP_VAL.length - 1);

	<!-- Standard Flag / Named Account Flag -->
	var YN_CD = '';
	var YN_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="yesNoFlagList"  name="valMap" property="yesNoFlagList"/>
		<logic:iterate id="codeVO" name="yesNoFlagList">
			YN_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			YN_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	YN_CD  = YN_CD.substring(0, YN_CD.length - 1);
	YN_VAL = YN_VAL.substring(0, YN_VAL.length - 1);

	<!-- Office Code -->
	var OFFICE_CD = '';
	var OFFICE_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="officeList"  name="valMap" property="officeList"/>
		<logic:iterate id="codeVO" name="officeList">
			OFFICE_CD  += '<bean:write name="codeVO" property="ofc_cd"/>' + '|';
			OFFICE_VAL += '<bean:write name="codeVO" property="ofc_eng_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	OFFICE_CD  = OFFICE_CD.substring(0, OFFICE_CD.length - 1);
	OFFICE_VAL = OFFICE_VAL.substring(0, OFFICE_VAL.length - 1);

	<!-- Selling / Buying Code -->
	var S_B_CD = '';
	var S_B_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="sellBuyList"  name="valMap" property="sellBuyList"/>
		<logic:iterate id="codeVO" name="sellBuyList">
			S_B_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			S_B_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	S_B_CD  = S_B_CD.substring(0, S_B_CD.length - 1);
	S_B_VAL = S_B_VAL.substring(0, S_B_VAL.length - 1);

	<!-- Customer/Vendor Type Code -->
	var CUST_VNDR_CD = '';
	var CUST_VNDR_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="custVndrTpList"  name="valMap" property="custVndrTpList"/>
		<logic:iterate id="codeVO" name="custVndrTpList">
			CUST_VNDR_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			CUST_VNDR_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	CUST_VNDR_CD  = CUST_VNDR_CD.substring(0, CUST_VNDR_CD.length - 1);
	CUST_VNDR_VAL = CUST_VNDR_VAL.substring(0, CUST_VNDR_VAL.length - 1);

	<!-- Country / Location Type Code -->
	var CNTR_LOC_CD = '';
	var CNTR_LOC_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="cntryLocTpList"  name="valMap" property="cntryLocTpList"/>
		<logic:iterate id="codeVO" name="cntryLocTpList">
			CNTR_LOC_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			CNTR_LOC_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	CNTR_LOC_CD  = CNTR_LOC_CD.substring(0, CNTR_LOC_CD.length - 1);
	CNTR_LOC_VAL = CNTR_LOC_VAL.substring(0, CNTR_LOC_VAL.length - 1);

	<!-- Term -->
	var SVC_TERM_CD = '';
	var SVC_TERM_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="serviceList" name="valMap" property="serviceList"/>
		<logic:iterate id="codeVO" name="serviceList">
			SVC_TERM_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			SVC_TERM_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	SVC_TERM_CD  = SVC_TERM_CD.substring(0, SVC_TERM_CD.length - 1);
	SVC_TERM_VAL = SVC_TERM_VAL.substring(0, SVC_TERM_VAL.length - 1);

	<!-- Criteria for Effective Date -->
	var CRIT_TP_CD = '';
	var CRIT_TP_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="critEffDtTpList" name="valMap" property="critEffDtTpList"/>
		<logic:iterate id="codeVO" name="critEffDtTpList">
			CRIT_TP_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			CRIT_TP_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	CRIT_TP_CD  = CRIT_TP_CD.substring(0, CRIT_TP_CD.length - 1);
	CRIT_TP_VAL = CRIT_TP_VAL.substring(0, CRIT_TP_VAL.length - 1);

	<!-- TP/SZ -->
	var TPSZ_CD = '';
	var TPSZ_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
		<logic:iterate id="codeVO" name="tpszList">
			TPSZ_CD  += '<bean:write name="codeVO" property="cntr_tpsz_cd"/>' + '|';
			TPSZ_VAL += '<bean:write name="codeVO" property="cntr_tpsz_cd"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	TPSZ_CD  = TPSZ_CD.substring(0, TPSZ_CD.length - 1);
	TPSZ_VAL = TPSZ_VAL.substring(0, TPSZ_VAL.length - 1);

	<!-- CURRENCY -->
	var CURR_CD = '';
	var CURR_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="currList" name="valMap" property="currCdList"/>
		<logic:iterate id="codeVO" name="currList">
			CURR_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			CURR_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	CURR_CD  = CURR_CD.substring(0, CURR_CD.length - 1);
	CURR_VAL = CURR_VAL.substring(0, CURR_VAL.length - 1);

	<!-- Unit 단위 -->
	var UNIT_CD = '';
	var UNIT_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="unitList" name="valMap" property="UNITCD"/>
		<logic:iterate id="codeVO" name="unitList">
			UNIT_CD  += '<bean:write name="codeVO" property="cd_val"/>' + '|';
			UNIT_VAL += '<bean:write name="codeVO" property="cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	UNIT_CD  = UNIT_CD.substring(0, UNIT_CD.length - 1);
	UNIT_VAL = UNIT_VAL.substring(0, UNIT_VAL.length - 1);

	<!-- AR Freight Code -->
	var AR_FRT_CD = '';
	var AR_FRT_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="arFrtCdList" name="valMap" property="arFrtCdList"/>
		<logic:iterate id="frtCdVO" name="arFrtCdList">
			AR_FRT_VAL += '<bean:write name="frtCdVO" property="frt_cd"/>' + '|';
			AR_FRT_CD  += '<bean:write name="frtCdVO" property="frt_cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	AR_FRT_CD  = AR_FRT_CD.substring(0, AR_FRT_CD.length - 1);
	AR_FRT_VAL = AR_FRT_VAL.substring(0, AR_FRT_VAL.length - 1);

	<!-- AP Freight Code -->
	var AP_FRT_CD = '';
	var AP_FRT_VAL = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="apFrtCdList" name="valMap" property="apFrtCdList"/>
		<logic:iterate id="frtCdVO" name="apFrtCdList">
			AP_FRT_CD  += '<bean:write name="frtCdVO" property="frt_cd"/>' + '|';
			AP_FRT_VAL += '<bean:write name="frtCdVO" property="frt_cd_nm"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	AP_FRT_CD  = AP_FRT_CD.substring(0, AP_FRT_CD.length - 1);
	AP_FRT_VAL = AP_FRT_VAL.substring(0, AP_FRT_VAL.length - 1);

	<!-- Account Code -->
	var ACCT_CD = '';
	<logic:notEmpty name="valMap" property="UNITCD">
		<bean:define id="acctCdList" name="valMap" property="acctCdList"/>
		<logic:iterate id="acct_cd" name="acctCdList">
			ACCT_CD  += '<bean:write name="acct_cd"/>' + '|';
		</logic:iterate>
	</logic:notEmpty>
	ACCT_CD  = ACCT_CD.substring(0, ACCT_CD.length - 1);

</script>

 <form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="rt_no" id="rt_no">
	<input type="hidden" name="prefix_str" id="prefix_str" value="RNY"> <!-- RATE_NO Prefix -->

	<!-- GridSetting Value -->
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TFM_0090.clt"/>

	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
		<%--
			<button style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr1()%>" type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" ><bean:message key="Search" /></button>
			<button style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr3()%>" type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
			<button id="btnModify" style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr3()%>" type="button" class="btn_normal" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
			<button id="btnExcel" style="cursor:hand;display:none;"  btnAuth="<%= roleBtnVO.getAttr6() %>"  type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
		--%>
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
	<!-- page_title_area(E) -->

	<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="75">
				<col width="110">
				<col width="65">
				<col width="195">
  				<col width="75">
				<col width="110">
				<col width="55">
				<col width="110">
				<col width="110">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Rate_No"/></th>
					<td>
						<input type="text" name="f_rt_no" id="f_rt_no" maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="fncSearch('uppernum')" />
					</td>
					<th><bean:message key="Office"/></th>
					<td>
						<select id="f_rt_ofc_cd" name="f_rt_ofc_cd" style="width: 180px;">
							<option value=''></option>
							<logic:notEmpty name="valMap" property="UNITCD">
								<bean:define id="officeList"  name="valMap" property="officeList"/>
								<logic:iterate id="codeVO" name="officeList">
									<option value='<bean:write name="codeVO" property="ofc_cd"/>'><bean:write name="codeVO" property="ofc_eng_nm"/></option>
								</logic:iterate>
							</logic:notEmpty>
						</select>
					</td>
					<th><bean:message key="REF_No"/></th>
					<td>
						<input type="text" name="f_ref_no" maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:100px;">
					</td>
					<th>S/B</th>
					<td>
						<select id="f_sell_buy_tp_cd" name="f_sell_buy_tp_cd" style="width: 70px;">
							<option value=''></option>
							<logic:notEmpty name="valMap" property="UNITCD">
								<bean:define id="sellBuyList"  name="valMap" property="sellBuyList"/>
								<logic:iterate id="codeVO" name="sellBuyList">
									<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
								</logic:iterate>
							</logic:notEmpty>
						</select>
					</td>
					<th>Customer/Vendor</th>
					<td>
						<select id="f_cust_vndr_tp_cd" name="f_cust_vndr_tp_cd" style="width: 130px;">
							<option value=''></option>
							<logic:notEmpty name="valMap" property="UNITCD">
								<bean:define id="custVndrTpList"  name="valMap" property="custVndrTpList"/>
								<logic:iterate id="codeVO" name="custVndrTpList">
									<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
								</logic:iterate>
							</logic:notEmpty>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- opus_design_inquiry(E) -->
	</div>

	<div>
		<table>
			<tr height="10px"></tr>
		</table>
	</div>

	<div class="wrap_result">
		<div style="float:left;">
			<h3 class="title_design"><bean:message key="Header"/></h3>
		</div>
		<div class="opus_design_grid "id="mainTable">
			<div class="opus_design_btn">
				<div class="grid_option_left">
					<button type="button" class="btn_normal" onClick="addRow('Master');"><bean:message key="Add"/></button>
					<%-- <button type="button" class="btn_normal"  onClick="delRow('Master');"><bean:message key="Del"/></button> --%>
					<button type="button" class="btn_normal"  onClick="saveMaster()"><bean:message key="Save"/></button>
				</div>
			</div>
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<table>
			<tr>
				<td width="55px">
					<!--- Display option Begin --->
					<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
					<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
					<paging:options name="pagingVal" defaultval="50"/>
					<!--- Display option End --->
				</td>
				<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
				</td>
			</tr>
		</table>
	</div>

	<div class="wrap_result">
		<div style="float:left;">
			<h3 class="title_design"><bean:message key="Detail"/></h3>
		</div>
		<div class="opus_design_grid "id="mainTable">
			<div class="opus_design_btn">
				<div class="grid_option_left">
					<button type="button" class="btn_normal" onClick="addRow('Detail');"><bean:message key="Add"/></button>
					<%-- <button type="button" class="btn_normal"  onClick="delRow('Detail');"><bean:message key="Del"/></button> --%>
					<button type="button" class="btn_normal"  onClick="saveDetail();"><bean:message key="Save"/></button>
				</div>
			</div>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
	</div>

</div>
</form>

