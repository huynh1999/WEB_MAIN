<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/masterbl/script/SEE_BMD_0071.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="officeInfo" name="tmpMap" property="officeInfo"/>
	<bean:define id="ofcVO" name="officeInfo"/>
	
	<script language="javascript">
	//memo 를 핸들링 하는 부분
	/* function chkText(){
		
		if(document.frm1.bl_type[0].checked) {
			document.frm1.bl_memo.value = "";
			document.frm1.bl_memo.disabled = true;
			document.frm1.stamp_type.disabled = false;
		}else if(document.frm1.bl_type[1].checked){
			document.frm1.bl_memo.value = "";
			document.frm1.bl_memo.disabled = true;
			document.frm1.stamp_type.disabled = true;
		}else{
			document.frm1.bl_memo.disabled = false;
			document.frm1.stamp_type.disabled = false;
		}

	}
	 */
	
	var usrid = "<%=userInfo.getUsrid()%>";
	var ofc_cnt_cd1 = "<%=userInfo.getOfc_cnt_cd()%>";
	</script>
	
	<script language="javascript">
		var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
		
		function setupPage(){
			loadPage();
		}
	</script>
		
<form name="form" method="POST" action="./">
		<input	type="hidden" name="f_CurPage"/>
		
		<input	type="hidden" name="f_cmd"/> 
		<input	type="hidden" name="intg_bl_seq" value="<bean:write name="tmpMap" property="intg_bl_seq"/>"/>
	
		<!-- Report Value -->
		<input	type="hidden" name="cmd_type"/>
		<input	type="hidden" name="title" value="B/L Print"/>
		<input	type="hidden" name="stamp"/>
		<input	type="hidden" name="all"/>
		<input	type="hidden" name="rider_flg" value="<bean:write name="tmpMap" property="rider_flg"/>"/>
		<input	type="hidden" name="h_agent_text" value="<bean:write name="tmpMap" property="agent_text"/>"/>
		<input	type="hidden" name="file_name"/>
		<input	type="hidden" name="rd_param"/>
		<input	type="hidden" name="mailTitle" value="<bean:write name="tmpMap" property="mailTitle"/>"/>
		<input	type="hidden" name="mailTo" value="<bean:write name="tmpMap" property="mailTo"/>"/>
		
		<!--  Report ==> OutLook연동 파라미터 (S) -->
		<input type="hidden" name="rpt_biz_tp"/>
		<input type="hidden" name="rpt_biz_sub_tp"/>
		<!--  Report ==> OutLook연동 파라미터 (E) -->
		
		<!--  OE HBL Form -->
		<input	type="hidden" name="oe_hbl_form" value="<bean:write name="tmpMap" property="oe_hbl_form"/>"/>
		
		<!--  Logo Yn Form -->
		<input	type="hidden" name="logoYn" value="<bean:write name="tmpMap" property="logoYn"/>"/>	
		
		<!-- /* #1739 [Patent] OEH B/L Print 의 Freight Arrange Default 설정 Option 처리 */ -->
		<%-- <input	type="hidden" name="frtArrFlg" value="<bean:write name="tmpMap" property="frtArrFlg"/>"/> --%>

		<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
		<!-- #5947 [JTC] print all HBL together -->
		<input type="hidden" id="oehBlPrintJaOpt" name="oehBlPrintJaOpt" value="<bean:write name="tmpMap" property="oehBlPrintJaOpt"/>"/>
		<input	type="hidden" name="cntr_info_flag" id="cntr_info_flag" value="<bean:write name='tmpMap' property='cntrInfoFlag'/>"/>
		
		<div class="layer_popup_title">
			<div class="page_title_area clear">
				<h2 class="page_title"><span><bean:message key="HBL_List"/></span></h2>
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" onclick="doWork('PRINT')" ><bean:message key="Print"/></button><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
				--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
				</div>
			</div>
		</div>
		<div class="layer_popup_contents">
			<div class="wrap_result">
				<div class="opus_design_grid" id="mainTable">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
				<div class="opus_design_inquiry">
					<table>
						<colgroup>
							<col width="*">
						</colgroup>
						<tbody>
					        <tr>
					            <td id="rule1">
					            	<input type="checkBox" name="clause_rule" id="clause_rule" onclick="flgChange(this);" value=""> <lable for="clause_rule">Show Rule Clause</lable>
					            </td>
					        </tr>
					    </tbody>
				    </table>
				    <table>
				    	<colgroup>
				    		<col width="70">
				    		<col width="*">
				    	</colgroup>
				    	<tbody>
					        <tr>
					            <th style="text-align: left;"><bean:message key="BL_Print_Option"/></th>
					        </tr>
					        <tr>
					        	<td>
					                <input type="radio" name="bl_type" id="bl_type1" value="1" onclick="javascript:chkText();" checked><label for="bl_type1"><bean:message key="Original"/></label>
					            </td>
					            <td>
					                <input type="radio" name="bl_type" id="bl_type2" value="2" onclick="javascript:chkText();" checked><label for="bl_type2"><bean:message key="Copy"/></label>
					            </td>
					        </tr>
				        </tbody>
				    </table>
				    <table>
				    	<colgroup>
				    		<col width="70">
				    		<col width="100">
				    		<col width="*">
				    	</colgroup>
				    	<tbody>
				    	<!-- // #473 [IMPEX] AIR EXPORT HAWB DRAFT VERSION OPTION -->
					        <tr height="3px"/>
					        <tr>
				                 <th colspan="3" style="text-align: left;"><bean:message key="Release_Type"/></th>
				            </tr>
				            <tr>
					            <td colspan="3">
					                <bean:define id="Ocean_Release_Type" name="tmpMap" property="Ocean_Release_Type"/>
									<select id="show_bl_type" name="show_bl_type" style= "width:310px;">								
										<logic:iterate id="comVO" name="Ocean_Release_Type">
											<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
										</logic:iterate>
									</select>
				                </td>
				               	
					        </tr>
					        <!-- #5947 [JTC] print all HBL together -->
					        <tr height="3px"/>
					        <tr  <logic:notEqual name="tmpMap" property="oehBlPrintJaOpt" value="Y" >style="display:none;"</logic:notEqual>>
					            <td colspan="4" ><!-- 
					            	 --><input type="checkBox" name="showVeslPol" id="showVeslPol"><label id="showVeslPol_lbl" for="showVeslPol"><bean:message key="Show_Vessel_POL"/></label>
					            	 <input type="checkBox" name="showExRate" id="showExRate"><label id="showExRate_lbl" for="showExRate"><bean:message key="Show_Exchange_Rate"/></label>
					            </td>  
					        </tr>	
					        <tr height="3px"/>
					        <tr  <logic:notEqual name="tmpMap" property="oehBlPrintJaOpt" value="Y" >style="display:none;"</logic:notEqual>>
					            <td colspan="4"><!-- 
					            	 --><input type="checkBox" name="showOnDt" id="showOnDt"><label id="showOnDt_lbl" for="showOnDt"><bean:message key="Show_onboard_date"/></label>
					            	 <input type="checkBox" name="showCont" id="showCont"><label id="showCont_lbl" for="showCont"><bean:message key="Show_for_Container"/></label>
					            </td>   
					        </tr>			        		        
					        <tr height="3px"/>
					        <tr  <logic:notEqual name="tmpMap" property="oehBlPrintJaOpt" value="Y" >style="display:none;"</logic:notEqual>>
					            <td colspan="4"><!-- 
					            	 --><input type="checkBox" name="showTelex" id="showTelex"><label id="showTelex_lbl" for="showTelex"><bean:message key="Show_Telex_Released"/></label><!-- 
					            	 --><%-- <input type="checkBox" name="showCntrBlMark" id="showCntrBlMark" value="Y"><label id="showCntrBlMark_lbl" for="showCntrBlMark"><bean:message key="Show_for_Cntr_Bl_Mark"/></label> --%>					     		
					            		<!-- #6714 [JAPT] REVENUE STAMP FUNCTION [ TARGET DEPLOY : July 1st ] -->
					            		<input type="checkBox" name="showReStamp" id="showReStamp" style="margin-left: -6px; display: none;"><label id="showReStamp_lbl" for="showReStamp" style="display: none;"><bean:message key="Show_RevenueStamp"/></label>
					            </td> 
					        </tr>
					        <!-- #6612 [JAPT] e-Signature on HBL Requirements -->
					        <tr height="3px"/>
					        <tr id="showEsig_tr" name="showESig_tr" style="display:none;">
					            <td colspan="4"> 
					            	 <input type="checkBox" name="showESigature" id="showESigature"><label id="showESigature_lbl" for="showESigature"><bean:message key="Show_eSignature"/></label>
					            	 <input type="checkBox" name="showRevESigature" id="showRevESigature" style="margin-left: 11px;"><label id="showRevESigature_lbl" for="showRevESigature"><bean:message key="Show_Rev_eSignature"/></label>
					            </td>           
					        </tr>
				    	<!-- 
				              	<tr>
					                <th colspan="3" style="text-align: left;"><bean:message key="Show_BL_Type"/></th>
					            </tr>
				              	<tr>
					                <td>
						                <input name="show_bl_type" id="show_bl_type1" type="radio" value="1" onclick="javascript:chkText();"><label for="show_bl_type1"><bean:message key="Original"/></label>
						            </td>
						            <td>
						                <input name="show_bl_type" id="show_bl_type2" type="radio" value="2" onclick="javascript:chkText();"><label for="show_bl_type2"><bean:message key="NonNegotiable"/></label>
						            </td>
						            <td>
						                <input name="show_bl_type" id="show_bl_type3" type="radio" value="3" onclick="javascript:chkText();"><label for="show_bl_type3"><bean:message key="Draft"/></label>
					                </td>
				              	</tr>
				              	<tr>
					                <td>
						                <input name="show_bl_type" id="show_bl_type4" type="radio" value="4" onclick="javascript:chkText();"><label for="show_bl_type4"><bean:message key="Copy"/></label>
						            </td>
						            <td>
						                <input name="show_bl_type" id="show_bl_type5" type="radio" value="5" onclick="javascript:chkText();"><label for="show_bl_type5"><bean:message key="Telex_Release"/></label>
						            </td>
						            <td>
						                <input name="show_bl_type" id="show_bl_type6" type="radio" value="6" onclick="javascript:chkText();" checked="checked"><label for="show_bl_type6"><bean:message key="None"/></label>
					                </td>
				              	</tr>	
			              	 -->
				              	<tr>
					                <th colspan="3" style="text-align: left;"><bean:message key="Freight_Arrange"/></th>
					            </tr>
				              	<tr>
					                <td>
						                <input name="frt_flg" id="frt_flg1" type="radio" value="Y" checked="checked"><label for="frt_flg1">YES</label>
						            </td>
						            <td colspan="2">
						                <input name="frt_flg" id="frt_flg2" type="radio" value="N"><label for="frt_flg2">NO</label>
					                </td>
				              	</tr>	              	
				            </tbody>              	
			            </table>
			            <table>
			            	<colgroup>
			            		<col width="140">
			            		<col width="*">
			            	</colgroup>
			            	<tbody>
				              	<tr>
					                <th colspan="2" style="text-align: left;"><bean:message key="Title_Name"/></th>
					            </tr>
				              	<tr>
					                <td colspan="2">
						                <input name="title_name" id="title_id1" type="radio" value="1" onclick="initSetting(1);" checked><label for="title_id1"><bean:message key="Bill_of_Lading"/></label>
						            </td>
				              	</tr>	 
				              	<tr>
						            <td colspan="2">
						                <input name="title_name" id="title_id2" type="radio" value="2" onclick="initSetting(2);"><label for="title_id2"><bean:message key="Forwarder_Cargo_Receipt"/></label>
					                </td>
				              	</tr>
				              	<!-- #5947 [JTC] print all HBL together -->
				              	<tr id="prepaid_at_tr" name ="prepaid_at_tr">
				              		<td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message key="Prepaid_At"/></td>
				              		<td><!-- 
					              		 --><input type="text" name="prepaid_at" style="width:150px;text-transform:uppercase;" value="<bean:write name='tmpMap' property='prepaid_at'/>">
				              		</td>
				              	</tr>	    
				              	<tr>
				              		<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message key="Received_By"/> :
				              		</td>
				              		<td>
					              		<select name="rcvd_by" styleClass="search_form" style="width:150px;">
											<option value="1"><%=userInfo.getOfc_locl_nm()%></option>
			<!--								<option value="2">Glovis America</option>-->
										</select>
				              		</td>
				              	</tr>
				              	<tr>
				              		<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message key="Received_Date_Time"/> :
				              		</td>
				              		<td>
					              		<input type="text" name="rcvd_dt_tm" style="width:150px;">
				              		</td>
				              	</tr>
				              	<tr>
				              		<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message key="Received_Person"/> :
				              		</td>
				              		<td>
					              		<input type="text" name="rcvd_pic" style="width:150px;">
				              		</td>
				              	</tr>
			              	</tbody>
			            </table> 
				</div>
			</div>
		</div>
</form>
