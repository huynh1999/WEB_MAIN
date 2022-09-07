<%--
=========================================================
*@FileName   : EDI_MBL_0020.jsp
*@FileTitle  : MASTER BL SEND
*@Description: MASTER BL SEND
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
	<script language="javascript" src="./apps/fis/edi/bkg/script/EDI_BKG_0020.js?ver=<%=CLT_JS_VER%>"></script>
	
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
<form name="frm1" method="POST" action="./EDI_BKG_0020.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	
	<bean:parameter name="f_intg_bl_seq" id="f_intg_bl_seq"/>
	<input type="hidden" name="f_intg_bl_seq"  value="<bean:write name="f_intg_bl_seq"/>">
	<input type="hidden" name="f_rcvr_id"  value="<bean:write name="valMap" property="RCVR_ID"/>"> 	<!-- 20161027 hjw 추가 -->             
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="BKG"/> <bean:message key="EDI"/></span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="doWork('SEND_EDI')" ><bean:message key="Send_EDI"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CANCEL_EDI')"><bean:message key="Cancel_EDI"/></button>
			<button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
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
								<input type="text"   name="f_lnr_trdp_nm" maxlength="50" value='<bean:write name="f_lnr_trdp_nm"/>'  onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px;" readonly="readonly">
							</td>
						</tr>
	                    <tr>
	                        <th><bean:message key="Vessel_Voyage"/></th>
	                        <td>
	                        	<bean:parameter name="f_trnk_vsl_nm" id="f_trnk_vsl_nm"/>
	                        	<bean:parameter name="f_trnk_voy" id="f_trnk_voy"/>
	                            <input type="text"   name="f_trnk_vsl_nm" value="<bean:write name="f_trnk_vsl_nm"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:300px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" readonly="readonly"><!-- 
	                         --><input type="text"   name="f_trnk_voy"    value="<bean:write name="f_trnk_voy"/>"   class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" maxlength="8" onblur="strToUpper(this)" readonly="readonly">
	                        </td>
	                    </tr>
                    </tbody>
                </table>
			</div>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
			
			<div style="width:80%;;float:left!important;">
				<div class="layout_flex_fixed" style="width:770px;float:left!important">
			   		<h3 class="title_design"><bean:message key="Error"/> <bean:message key="Message"/></h3>
				</div>
			
				<table>
		 			<tr>
		 				<td>
		 					<textarea rows="2" cols="200" id="f_msg_err_cd" name="f_msg_err_cd" readonly="readonly"></textarea>
		 				</td>
		 			</tr>
		 		</table>
			</div>
			
			
			
			<div id="disp_val_msg" style="width:80%;;float:left!important;">
				<div class="layout_flex_fixed" style="width:770px;float:left!important">
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


