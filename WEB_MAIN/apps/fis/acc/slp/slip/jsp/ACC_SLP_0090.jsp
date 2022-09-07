<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0090.jsp
 *@FileTitle : Year-End Processing
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
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0090.js?ver=<%=CLT_JS_VER%>" ></script>
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		function setupPage(){
			loadPage();
		}
	</script>

<base target="_self"/>
<form name="frm1" method="POST" action="./ACC_SLP_0090.clt">
<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="f_CurPage" id="f_CurPage" />
<input type="hidden" name="f_range_flg" id="f_range_flg" />

<input type="hidden" name="s_ye_action" id="s_ye_action" />
<input type="hidden" name="action" id="action" />

<!--  #21735  [COMMON]Invoice Edit 권한 Processing Year(YYYY)가 없는 경우 대체  -->
<input type="hidden" name="sys_beg_ym" id="sys_beg_ym" value="<bean:write name="valMap" property="sysBegYM"/>"/>

<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
   		<%-- 
    	<button id="btnPrint" type="button" class="btn_accent" onclick="doWork('COMMAND01')"><bean:message key="Apply"/></button> 
		<button type="button"  class="btn_normal" onclick="doWork('REFRESH')"><bean:message key="Refresh"/></button>
		 --%>
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
<!-- opus_design_inquiry(S) -->
<div class="wrap_search"
<div class="opus_design_inquiry entry_pannel" style="width:100%">	
	<table>
		<colgroup>
			<col width="180" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<td style="text-align:right"><b><bean:message key="Year_End_Process_Type"/></b>&nbsp;&nbsp;&nbsp;</td>
				<td><input type="radio" name="year_end_chk" id="year_end_chk" onClick="setDateForm();" checked><label for="year_end_chk"><bean:message key="Year_End_Processing"/></label>
				<input type="radio" name="year_end_chk" id="year_end_chk2" onClick="setDateForm();" ><label for="year_end_chk2"><bean:message key="Cancel_Year_End_Processing"/></label>
				</td>
			</tr>
			<tr>
				<td style="text-align:right"><br><B><bean:message key="Last_Processed_End_Year"/></b>&nbsp;&nbsp;&nbsp;</td>
				<td><br><input type="text" name="s_last_ye_dt" id="s_last_ye_dt" value="<bean:write name="valMap" property="lastYearEnd"/>" style="width:80px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form-disable" readonly></td>
			</tr>
			<tr>
				<td style="text-align:right"><br><B><bean:message key="Processing_Year_MM_YYYY"/></b>&nbsp;&nbsp;&nbsp;</td>
				<td><br><input type="text" name="s_year_end_mm" id="s_year_end_mm"  value="<bean:write name="valMap" property="yearClsMM"/>" style="width:30px" maxlength="2" class="search_form-disable" readonly>
              		<select id="sel_year_end_yyyy" name="s_year_end_yyyy" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:left">
      				</select>
      			</td>
			</tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
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