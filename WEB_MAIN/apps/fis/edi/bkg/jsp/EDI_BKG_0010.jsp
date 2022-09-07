<%--
=========================================================
*@FileName   : EDI_BKG_0010.jsp
*@FileTitle  : BKG BL SEND
*@Description: BKG BL SEND
*@author     : OJG - Cyberlogitec
*@version    : 1.0 - 2014/5/27
*@since      : 2014/5/27

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
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
	<script language="javascript" src="./apps/fis/edi/bkg/script/EDI_BKG_0010.js?ver=<%=CLT_JS_VER%>"></script>
	
	<%
		String usrId	= userInfo.getUsrid();
		String ofc_cd	= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm	= userInfo.getUser_name();
		String phn 		= userInfo.getPhn();
		String fax 		= userInfo.getFax();
		String email 	= userInfo.getEml();
	%>
	
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
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" id="frm1" method="POST">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_bkg_seq"/>
	<input type="hidden" name="f_bkg_cancel"/>
	<input type="hidden" name="user_id" id="user_id"  value="<%=usrId%>" />
	<input type="hidden" name="user_name" id="user_name"  value="<%=usrNm%>" />
	<input type="hidden" name="user_phn" id="user_phn"  value="<%=phn%>" />
	<input type="hidden" name="user_fax" id="user_fax"  value="<%=fax%>" />
	<input type="hidden" name="user_email" id="user_email"  value="<%=email%>" />
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="BKG_EDI"/></span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_accent"  id="btn_edi" name="btn_edi" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
				<button type="button" class="btn_normal" id="btn_edi" name="btn_edi" onclick="doWork('SEND_BOOKING_EDI')"><bean:message key="Send_EDI"/></button>
				<button type="button" class="btn_normal" id="btn_cancel_edi" name="btn_cancel_edi" onclick="doWork('SEND_CANCEL_EDI')"><bean:message key="Cancel_EDI"/></button>
				<button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<h3 class="title_design"><bean:message key="Booking_Item"/></h3>
				<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tbody>
					
						<tr>
							<th><bean:message key="Liner"/></th>
							<td>
								<bean:parameter name="lnr_trdp_nm" id="lnr_trdp_nm"/>
								<bean:parameter name="lnr_trdp_cd" id="lnr_trdp_cd"/>
								<input type="text" id="f_lnr_trdp_nm" name="f_lnr_trdp_nm" maxlength="50" readonly="readonly" value='<bean:write name="lnr_trdp_nm"/>'  onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px;">
	                         	<input type="hidden" id="f_lnr_trdp_cd" name="f_lnr_trdp_cd" value="<bean:write name="lnr_trdp_cd"/>" />
							</td>
						</tr>
	                    <tr>
	                        <th><bean:message key="Vessel_Voyage"/></th>
	                        <td>
	                        	<bean:parameter name="trnk_vsl_nm" id="trnk_vsl_nm"/>
	                        	<bean:parameter name="trnk_voy" id="trnk_voy"/>
	                            <input type="text"  id="f_trnk_vsl_nm" name="f_trnk_vsl_nm" value="<bean:write name="trnk_vsl_nm"/>" readonly="readonly" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:300px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)"><!-- 
	                         --><input type="text"  id="f_trnk_voy" name="f_trnk_voy"    value="<bean:write name="trnk_voy"/>" readonly="readonly" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" maxlength="8" onblur="strToUpper(this)">
	                        </td>
	                    </tr>
                    </tbody>
                </table>
			</div>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
			
			<div id="disp_val_msg" style="width:80%;;float:left!important;">
				<div class="layout_flex_fixed" style="width:570px;float:left!important">
			   		<h3 class="title_design"><bean:message key="Validation_Message"/></h3>
				</div>
			
				<table>
		 			<tr>
		 				<td>
		 					<textarea name="val_msg" cols="200" rows="7"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
		 				</td>
		 				<td valign="top"" style="padding: 5px;">
		 					<button onClick="disp_val_msg.style.display='none';" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Close"/></button>		
		 				</td>
		 			</tr>
		 		</table>
			</div>
			
		</div>
	</div>
</form>


