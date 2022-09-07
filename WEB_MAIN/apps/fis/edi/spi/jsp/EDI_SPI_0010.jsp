<%--
=========================================================
*@FileName   : EDI_AGT_0010.jsp
*@FileTitle  : AGENT BL SEND
*@Description: AGENT BL SEND
*@author     : OJG - Cyberlogitec
*@version    : 1.0 - 2014/5/27
*@since      : 2014/5/27

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/web/rpt/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/edi/spi/script/EDI_SPI_0010.js?ver=<%=CLT_JS_VER%>"></script>

	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		function setupPage(){
			loadPage();
		}
		
		<!-- Liner Code -->
		var LNRCD = '';
		 <% boolean isBegin = false; %>
        <logic:notEmpty name="valMap" property="LINER_LIST">
            <bean:define id="lnrcdList" name="valMap" property="LINER_LIST"/>
            <logic:iterate id="codeVO" name="lnrcdList">
                <% if(isBegin){ %>
                	LNRCD+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   LNRCD+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
	</script>
<form name="frm1" method="POST" action="./EDI_SPI_0010.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	
	<bean:parameter name="f_intg_bl_seq" id="f_intg_bl_seq"/>
	<input type="hidden" name="f_intg_bl_seq"  value="<bean:write name="f_intg_bl_seq"/>">             
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="SI"/> <bean:message key="EDI"/></span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="doWork('SEND_EDI')" ><bean:message key="Send_EDI"/></button><!-- 
			--><button type="button" class="btn_normal" style="display: none;" btnAuth="SEND_EDI" onclick="doWork('SEND_EDI')"><bean:message key="Print"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<h3 class="title_design"><bean:message key="Vessel_Information"/></h3>
				<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Liner"/></th>
							<td>
								<bean:parameter name="f_lnr_trdp_nm" id="f_lnr_trdp_nm"/>
								<input type="text"   name="f_lnr_trdp_nm" maxlength="50" value='<bean:write name="f_lnr_trdp_nm"/>' disabled="disabled" onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px;">
							</td>
						</tr>
	                    <tr>
	                        <th><bean:message key="Vessel_Voyage"/></th>
	                        <td>
	                        	<bean:parameter name="f_trnk_vsl_nm" id="f_trnk_vsl_nm"/>
	                        	<bean:parameter name="f_trnk_voy" id="f_trnk_voy"/>
	                            <input type="text"   name="f_trnk_vsl_nm" value="<bean:write name="f_trnk_vsl_nm"/>" disabled="disabled" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:300px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)"><!-- 
	                         --><input type="text"   name="f_trnk_voy"    value="<bean:write name="f_trnk_voy"/>"  disabled="disabled" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" maxlength="8" onblur="strToUpper(this)">
	                        </td>
	                    </tr>
                    </tbody>
                </table>
			</div>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>