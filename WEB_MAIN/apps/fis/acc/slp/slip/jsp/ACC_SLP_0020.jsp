<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0070.jsp
 *@FileTitle : SLIP CANCEL
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0020.js?ver=<%=CLT_JS_VER%>"></script>
	
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
<form name="frm1" method="POST" action="./ACC_SLP_0020.clt">
<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="f_CurPage" id="f_CurPage" />
<input type="hidden" name="f_oneDay" id="f_oneDay" />
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn">
	   <button id="btnPrint" type="button" style="display:none;"  btnAuth="APPLY" class="btn_accent" onclick="doWork('COMMAND01')"><bean:message key="Apply"/></button><!-- 
	--><button id="btnPrint" type="button" style="display:none;" btnAuth="REFRESH" class="btn_normal" onclick="doWork('REFRESH')"><bean:message key="Refresh"/></button>
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
<div class="wrap_result">
<!-- opus_design_inquiry(S) -->
<div class="opus_design_inquiry wFit">
	<table>
		<tbody>
			<colgroup>
				<col width="10" />
				<col width="100" />
				<col width="100" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Processing_Date"/></th>
	            <td colspan="3">
	            <input type="text" required name="f_proc_dt" id="f_proc_dt" value="" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" maxlength="10" onBlur="mkDateFormatType(this, event, true,1)" dataformat="excepthan" style="ime-mode:disabled;width:77px;"><!-- 
	           --><button type="button" name="f_proc_dt_cal" id="f_proc_dt_cal"  class="calendar ir" onclick="doDisplay('DATE1' ,frm1);"></button>
	            </td>
	            <td><input type="hidden" name="f_slip_tp" id="f_slip_tp" value="J"/></td>
			</tr>
			<tr>
				<td colspan="4"><strong><font color="red">*This action will delete the slip data<br></font></strong></td>
			</tr>
			<tr>
				<th><bean:message key="Last_Slip_Date"/></th>
                <td>
       			 <input type="text" value="<bean:write name="valMap" property="ACCT_DT"/>" name="f_lst_close_dt" id="f_lst_close_dt" size='11' maxlength="10" class="search_form-disable" readOnly>
                </td>
                <td>
       			 <input type="text" value="<bean:write name="valMap" property="RGST_INFO"/>" name="f_lst_close_usr" id="f_lst_close_usr"  style="width:300px" class="search_form-disable" readOnly>
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
</div>
<!-- opus_design_inquiry(E) -->
</div>
<!-- wrap_search(E) -->

<!-- wrap_result(S) -->
<div class="wrap_result">
<!-- opus_design_grid(S) -->
<div class="opus_design_grid">
	<script type="text/javascript">comSheetObject('sheet1');</script>
</div>
<!-- opus_design_grid(E) -->
</div>
<!-- wrap_result(E) -->
</form>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>