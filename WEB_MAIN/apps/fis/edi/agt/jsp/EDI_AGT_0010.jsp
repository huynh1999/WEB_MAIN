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
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
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
	<script language="javascript" src="./apps/fis/edi/agt/script/EDI_AGT_0010.js?ver=<%=CLT_JS_VER%>"></script>

    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<script>
		//Agent EDI Spec 추가 사항 2018.12.10
		var ofc_cd = '<%=userInfo.getOfc_cd()%>';
	
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		function setupPage(){
			loadPage();
		}
	</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./EDI_AGT_0010.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>

	<bean:parameter name="f_intg_bl_seq" id="f_intg_bl_seq"/>
	<input type="hidden" name="f_intg_bl_seq"  value="<bean:write name="f_intg_bl_seq"/>">             
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span>Agent EDI</span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_normal" onclick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button>
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
					<tbody>


						<!-- tr>
							<th><bean:message key="Agent"/></th>
							<td>
								<bean:define id="AgentCodeList" name="valMap" property="AgentCodeList"/>
								<select name="f_agent_cd">
									<logic:iterate id="comVO" name="AgentCodeList">
										<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>
									</logic:iterate>
								</select>
							</td>
						</tr--> 
					
						<tr>
							<th width="100"><bean:message key="Liner"/></th>
							<td colspan="5">
								<bean:parameter name="f_lnr_trdp_nm" id="f_lnr_trdp_nm"/>
								<input type="text"   name="f_lnr_trdp_nm" maxlength="50" value='<bean:write name="f_lnr_trdp_nm"/>'  onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:300px;">
							</td>
						</tr>
						
	                    <tr>
	                        <th width="100"><bean:message key="Vessel_Voyage"/></th>
	                        <td colspan="5">
	                        	<bean:parameter name="f_trnk_vsl_nm" id="f_trnk_vsl_nm"/>
	                        	<bean:parameter name="f_trnk_voy" id="f_trnk_voy"/>
	                            <input type="text"   name="f_trnk_vsl_nm" value="<bean:write name="f_trnk_vsl_nm"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:300px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)"><!-- 
	                         --><input type="text"   name="f_trnk_voy"    value="<bean:write name="f_trnk_voy"/>"   class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" maxlength="8" onblur="strToUpper(this)">
	                        </td>
	                    </tr>
 	                    <!--#3704 [JAPT] Mbl, Hbl 조회 조건 추가 -->
	                    <tr>
							<th width="100"><bean:message key="MBL_No"/></th>
							<td width="160">
								<bean:parameter name="f_mbl_no" id="f_mbl_no"/>
								<input type="text"   name="f_mbl_no" maxlength="20" value='<bean:write name="f_mbl_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;">
							
							<th width="100"><bean:message key="HBL_No"/></th>
							<td width="160">
								<input type="text"   name="f_hbl_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;">
							</td>
							
							<th width="90"><bean:message key="EDI_Send"/></th>
	                    	<td>
								<table align="right" >
									<colgroup>
										<col width="*">
										<col width="10">
										<col width="80">
									</colgroup>
									<tbody>
										<tr>
											<td>
						                    	<select name="f_send_yn" id="f_send_yn" onChange="sendChange();">
						                    		<option value="">ALL</option>
						                    		<option value="Y">Y</option>
						                    		<option value="N">N</option>
						                    	</select>
											
											</td>
											<!-- td><input name="f_chk_dc" type="checkbox" value="Y"></td>
											<th><bean:message key="Attach_DC"/></th-->
										</tr>
									</tbody>
								</table>
	                    	</td>
						</tr>
						
                    </tbody>
                </table>
                </table>
                <h3 class="title_design"><bean:message key="Agent_EDI_Setup"/></h3>
				<table>
					<tbody>
						<!-- Agent EDI Spec 추가 사항 2018.12.10 -->
						<tr>
							<th width="100"><bean:message key="Receiver"/> <bean:message key="Office"/></th>
							<td colspan="5">
								<div id="div_subcode"><!--
	                                --><input  type="hidden" name="f_sndr_brnc_ofc_cd" value=""/><!--  
									--><input  type="text" name="f_rcvr_brnc_ofc_cd" value="" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
	                            </div>
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


