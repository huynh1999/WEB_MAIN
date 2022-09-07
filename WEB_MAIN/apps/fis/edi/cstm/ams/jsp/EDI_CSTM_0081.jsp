<%--
=========================================================
*@FileName   : EDI_CSTM_0081.jsp
*@FileTitle  : 해운 수출 AMS 생성 대상 선택
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 07/23/2009
*@since      : 07/23/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/ams/script/EDI_CSTM_0081.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    
 <script type="text/javascript">
<!--
function setupPage() {
	initFinish();loadPage();doWork('SEARCH');
}
//-->
</script>
<form name="frm1" method="POST" action="./EDI_CSTM_0021.clt">

    <input type="hidden" name="f_cmd">
    <div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><span><bean:message key="Ocean_AMS_Creation"/></span></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('SEARCH')">조회</button><!-- 
		 --><button type="button" class="btn_normal" onclick="addEdiCstmInfo();">적용</button><!--
		 --><button type="button" class="btn_normal" onclick="ComClosePopup();"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<!-- wrap search(S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table id="tpObj">
                <tr>
                    <th width="80">출항일자</th>
                    <td width="200">
                        <input type="text" name="f_obdt_bgn_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"/> ~ 
						<input type="text" name="f_obdt_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"/>
						<%-- <img id="f_obdt_dt_cal" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE1', frm1);" style="cursor:hand;" width="19" height="21" border="0" align="absmiddle"> --%> 
						<button type="button" id="f_obdt__dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
                    </td>
                    <th width="70">선박명</th>
                    <td>
                        <input type="text" name="f_vsl_nm" value='' class="search_form" style="width:150px;" maxlength="50">
                    </td>
                </tr>
            </table>
            
            <table id="tpObj">
                 <tr>
                     <th width="80">출항일자</th>
                     <td width="90">
                         <input type="text" name="s_workday" value='' class="search_form-disable" readonly style="width:74px;"> 
                     </td>
                     <th width="70">선박명</th>
                     <td width="120">
                         <input type="text"   name="s_vsl_nm" value='' class="search_form-disable" readonly style="width:110px;">
                         <input type="hidden" name="s_vsl_cd" value=''>
                     </td>
                     <th width="50">항차</th>
                     <td width="70">
                         <input type="text"   name="s_flt_no" value='' class="search_form-disable" readonly style="width:50px;"> 
                     </td>
                     <th width="70">선적항</th>
                     <td>
                         <input type="text"   name="s_pol_nm" value='' class="search_form-disable" readonly style="width:100px;">
                         <input type="hidden" name="s_pol_cd" value=''>
                     </td>
                 </tr>
				<tr>
					<td colspan="8">
						<script language="javascript">comSheetObject('sheet1');</script>
					</td>
				</tr>
			  </table>
		</div>
	</div>
	</div>
</div>
</form>
