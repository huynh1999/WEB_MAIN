<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/web/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0130.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String ofcLoclNm = userInfo.getOfc_locl_nm();
	String ofcCd = userInfo.getOfc_cd();
	String roleCd = userInfo.getRole_cd();
%>
<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value="" />
<script>
	function setupPage()
	{
		loadPage();
	}
</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 

	<!-- Report Value -->
	<input	type="hidden" name="title"  id="title"/>
	<input	type="hidden" name="file_name" id="file_name"/>
	<input	type="hidden" name="rd_param" id="rd_param"/>
	<input	type="hidden" name="intg_bl_seq" id="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input	type="hidden" name="f_rpt_type" id="f_rpt_type" value=""/>
	<input	type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= ofcCd %>"/>
	<input	type="hidden" name="f_role_cd" id="f_role_cd" value="<%= roleCd %>"/>
	<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
	<input type="hidden" name="rpt_file_name_title"/>

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_tp" id="rpt_tp" />
	<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd" />
	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
	
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<div class="layer_popup_title">
		<!-- page_title_area(S) -->
		<div class="page_title_area">
			<!-- page_title(S) -->
			<h2 class="page_title"><bean:message key="Cargo_Manifest"/></h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>		
			<!-- opus_design_btn(E) -->
			</div>
		</div>
		<!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class= "wrap_search">
		 		<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry"  >
				<table>
					<tbody>
						<colgroup>
							<col width="70" />
							<col width="*" />
						</colgroup>
						<tr>
				            <th><bean:message key="BL_Number"/></th>
				            <td><bean:parameter name="bl_no" id="bl_no" value=""/><input name="f_bl_no" type="text" value='<bean:write name="bl_no"/>' style="width:180px;" class="search_form" readOnly></td>           
				        </tr>
					</tbody>	
				</table>
			</div>
		</div>
			<!-- opus_design_inquiry(E) -->
			<!-- opus_design_inquiry(S) -->
			<div class="wrap_search" style="padding-left:5px">
				<table>
						<tr>
							<td>
								<table>
									<tr>
						                <td width="300" colspan="2" class="table_search_head"><b><bean:message key="Company_Name_on_Report"/></b></td>
						            </tr>
						            <tr>
						            	<td width="5"></td>
						            	<td><input name="f_ofc_locl_nm" id="f_ofc_locl_nm" type="text" value="<bean:write name="rtnMap" property="ofc_locl_nm"/>" class="search_form" style="width:180;" maxlength="100"></td>
						            </tr>
								</table>
								<table>
									<tr>
						                <td width="350" colspan='2' nowrap class="table_search_head"><b><bean:message key="Master_Agent"/></b></td>
						            </tr>
						            <tr>
						            	<td width="5"></td>
						            	<td>
						            		<input type="hidden" name="f_agt_cd" id="f_agt_cd" value="<bean:write name="rtnMap" property="agtCd"/>"><!-- 
						            		 --><textarea name="f_rmk" id="f_rmk"  class="search_form" style="width:350px;height:50px" readonly><bean:write name="rtnMap" property="agentInfo"/></textarea>
						                </td>
						            </tr>
								</table>
							</td>						
						</tr>
				</table>
				<table>
					<tr>
						<td width="300" class="table_search_head" colspan="4"><b><bean:message key="To"/></b></td>
		            </tr>
	              	<tr>
	              		<td width="5"></td>
		                <td width="160"><input type="radio" name="f_rpt_type_radio" id="f_rpt_type_radio" value="1" onclick="changeRptType(this.value);" checked><label for="f_rpt_type_radio1"><bean:message key="Master_Agent_Shipper"/></label></td>
		                <td width="105"><input type="radio" name="f_rpt_type_radio" id="f_rpt_type_radio2" value="4" onclick="changeRptType(this.value);"><label for="f_rpt_type_radio2"><bean:message key="House_Agent"/></label></td>
		                <td><input type="radio" name="f_rpt_type_radio" id="f_rpt_type_radio3" value="6" onclick="changeRptType(this.value);"><label for="f_rpt_type_radio3"><bean:message key="Carrier"/></label></td>
		            </tr>
		            <tr>  
		            	<td width="5"></td>
		                <td><input type="radio" name="f_rpt_type_radio" id="f_rpt_type_radio4" value="2" onclick="changeRptType(this.value);"><label for="f_rpt_type_radio4"><bean:message key="Master_Agent_CoLoad"/></label></td>
		                <td><input type="radio" name="f_rpt_type_radio" id="f_rpt_type_radio7" value="7" onclick="changeRptType(this.value);"><label for="f_rpt_type_radio7"><bean:message key="Carrier_House_Agent"/></label></td>
		            	<td><input type="radio" name="f_rpt_type_radio" id="f_rpt_type_radio5" value="5"  onclick="changeRptType(this.value);"><label for="f_rpt_type_radio5"><bean:message key="Carrier_Sub"/></label></td>
		            </tr>
		            <tr>  
		            	<td width="5"></td>
		                <td><input type="radio" name="f_rpt_type_radio" id="f_rpt_type_radio6" value="3" onclick="changeRptType(this.value);"><label for="f_rpt_type_radio6"><bean:message key="Load_Plan"/></label></td>
		            	<td>&nbsp;</td>
		            	<td><input type="radio" name="f_rpt_type_radio" id="f_rpt_type_radio8" value="8" onclick="changeRptType(this.value);"><label for="f_rpt_type_radio8"><bean:message key="Carrier_New"/></label></td>
		            </tr>
				</table>
				<table>
					<tr>
						<td width="300" class="table_search_head" colspan="4"><b><bean:message key="Split"/></b></td>
		            </tr>
		            <tr>  
		            	<td width="5"></td>
		                <td width="160"><input type="radio" name="f_pck_rpt_opt" id="f_pck_rpt_opt1" value="1" checked><label for="f_pck_rpt_opt1"><bean:message key="By_BL"/></label></td>
		            	<td width="105"><input type="radio" name="f_pck_rpt_opt" id="f_pck_rpt_opt2" value="2" ><label for="f_pck_rpt_opt2"><bean:message key="By_Container"/></label></td>
		            	<td></td>
		            </tr>
		        </table>
				<table>
					<tr>
						<td width="150" nowrap class="table_search_head"><b><bean:message key="Select_House_Agents"/></b></td>
						<td>
							<div class="opus_design_btn">
								<button type="button" class="btn_etc" onclick="doWork('HOUSE_AGENT_ALL')"><bean:message key="All"/></button><!-- 
							 --><button type="button" class="btn_etc" onclick="doWork('HOUSE_AGENT_CLEAR')"><bean:message key="Clear"/></button>		
							</div>
						</td>
						<td width="5"></td>
					</tr>
				</table>			
				 <div style="overflow-x:hidden;overflow-y:auto;height:110px;display:inline;">
			        <logic:notEmpty name="rtnMap" property="houseAgent">
			        <bean:define id="agentList" name="rtnMap" property="houseAgent"/>
			        <table>
			        	<logic:iterate id="agent" name="rtnMap" property="houseAgent">
			            <tr>
			            	<td height="15" width="5"></td>
			            	<td>
			            		<input type="checkbox" name="s_trdp_chk"/>
			            		<bean:write name="agent" property="trdp_nm"/>
			            		<input type="hidden" name="s_trdp_nm" border="0" value="<bean:write name="agent" property="trdp_nm"/>"/>
			            		<input type="hidden" name="s_trdp_cd" value="<bean:write name="agent" property="trdp_cd"/>"/>
			                </td>
			            </tr>
			            </logic:iterate>
		            </table>
		            </logic:notEmpty>
		           </div>
				<table>
					<tr>
	                    <td colspan="2"><b><bean:message key="Remark"/></b></td>
			        </tr>
			        <tr>
			        	<td width="5"></td>
			            <td><textarea name="f_remark" id="f_remark" class="search_form" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>width:400px;height:40px"></textarea></td>
			        </tr>
			        <tr height="20px"></tr>
				</table>
			</div>
			<!-- opus_design_inquiry(E) -->
	</div>	
    <div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
</div>
</form>	
