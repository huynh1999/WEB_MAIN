<%--
=========================================================
*@FileName   : ACC_SLP_0010.jsp
*@FileTitle  : SLIP CREATION
*@Description: SLIP CREATION
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/01/13
*@since      : 2012/01/13

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
		<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0010.js?ver=<%=CLT_JS_VER%>"></script>
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
	%>
	
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		function setupPage(){
			loadPage();
		}
	</script>
	
</head>
<form name="frm1" method="POST" action="./ACC_SLP_0010.clt">
<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="f_CurPage" id="f_CurPage" />
<input type="hidden" name="f_range_flg" id="f_range_flg" />
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn">
	   <button id="btnPrint" type="button" style="display:none;" btnAuth="VERIFY" class="btn_accent" onclick="doWork('COMMAND02')"><bean:message key="Verify"/></button><!-- 
	--><button type="button" style="display:none;" btnAuth="APPLY_RANGE"class="btn_normal" onclick="doWork('COMMAND11')"><bean:message key="Apply"/></button><!-- 
	--><button type="button" style="display:none;" btnAuth="REFRESH" class="btn_normal" onclick="doWork('REFRESH')"><bean:message key="Refresh"/></button>
   </div>
   <!-- btn_div -->
   <div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
</div>
<!-- page_title_area(E) -->
<!-- wrap_search(S) -->
<div class="over_wrap" height="100%">
<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
<div class="opus_design_inquiry entry_pannel ">
	<table>
		<tbody>
			<colgroup>
				<col width="100" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Period"/></th>
	            <td>
	            <input type="text" required name="s_strdt" id="s_strdt" value="<bean:write name="valMap" property="FROM_DT"/>" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_enddt);firCalFlag=false;" style="width:70px" size='11' maxlength="10" class="search_form"><span class="dash">~</span><input type="text" name="s_enddt" id="s_enddt" required value="" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_strdt, this);firCalFlag=false;" style="width:70px" size='11' class="search_form"><!--
	            --><button type="button" name="s_dt_cal" id="s_dt_cal" onclick="doDisplay('DATE', frm1);" class="calendar ir"></button><!--
	            --><input type="hidden" name="f_slip_tp" id="f_slip_tp" value="A"/>
	            </td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="100" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Last_Slip_Date"/></th>
                <td>
		            <input type="text" value="<bean:write name="valMap" property="ACCT_DT"/>" name="f_lst_close_dt" id="f_lst_close_dt" style="width:70px"  size='11' maxlength="10" class="search_form-disable" readOnly><input type="text" value="<bean:write name="valMap" property="RGST_INFO"/>" name="f_lst_close_usr" id="f_lst_close_usr" style="width:300px" class="search_form-disable" readOnly>
                </td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="*" />
			</colgroup>
			<tr>
				<td id="blank">&nbsp;</td>
				<td id="progress" style="display:none" class="label_text"><font size="3"><B><bean:message key="Status"/> : <font color="red"><bean:message key="Processing_Wait_Please"/></font></B></font></td>
				<td id="success"  style="display:none" class="label_text"><font size="3"><B><bean:message key="Status"/> : <font color="blue"><bean:message key="Success"/>.</font></B></font></td>
				<td id="error"    style="display:none" class="label_text"><font size="3"><B><bean:message key="Status"/> : <font color="red"><bean:message key="Error"/>.</font></B></font></td>
			</tr>
		</tbody>
	</table>
	<table class="grid2" style="width:600px">
		<tbody>
			<colgroup>
				<col width="150px" />
				<col width="150px" />
				<col width="150px" />
				<col width="150px" />
			</colgroup>
			<tr>
       			<th>&nbsp;</tdh>
       			<th style="text-align:center"><bean:message key="Created"/></tdh>
       			<th style="text-align:center"><bean:message key="Deposited"/><br>(<bean:message key="Cleared"/>)</th>
       			<th style="text-align:center"><bean:message key="Voided"/></th>
       		</tr>
       		<tr>
       			<th><bean:message key="Invoice"/></th>
       			<td>
       				<input type="text" value="" name="f_inv_crt" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_inv_dept" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_inv_void" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       		</tr>
       		<tr>
       			<th><bean:message key="AP"/></th>
       			<td>
       				<input type="text" value="" name="f_ap_crt" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_ap_dept" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_ap_void" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       		</tr>
       		<tr>
       			<th><bean:message key="CR_DB"/></th>
       			<td>
       				<input type="text" value="" name="f_cd_crt" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_cd_dept" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_cd_void" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       		</tr>
       		<tr>
       			<th><bean:message key="DepositCheck_journal"/></th>
       			<td>
       				<input type="text" value="" name="f_dept_crt" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_dept_dept" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_dept_void" style="width:150px;text-align:right" class="search_form-disable" readOnly>
       			</td>
       		</tr>
       		<tr>
       			<th><b><bean:message key="Total"/></b></th>
       			<td>
       				<input type="text" value="" name="f_tot_crt" style="width:150px;text-align:right;font-weight:bold;" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_tot_dept" style="width:150px;text-align:right;font-weight:bold;" class="search_form-disable" readOnly>
       			</td>
       			<td>
       				<input type="text" value="" name="f_tot_void" style="width:150px;text-align:right;font-weight:bold;" class="search_form-disable" readOnly>
       			</td>
       		</tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
<!-- wrap_search(E) -->

<!-- wrap_result(S) -->
<div class="wrap_result">
	<h3 class="title_design"><bean:message key="Error_List"/></h3>
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	<!-- opus_design_grid(E) -->
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid">
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
	<!-- opus_design_grid(E) -->
</div>
<!-- wrap_result(E) -->
</div>
</form>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	


