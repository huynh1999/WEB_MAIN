<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0160
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/housebl/script/SEE_BMD_0160.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<script type="text/javascript">
	function setupPage(){
		// [#1302][OEH Shipping Instruction] Cannot auto suggestion when name inputted
		fnSetAutocompleteCallBack('ntc_trdp_full_nm', 'PARTNER_POPLIST', 'LINER_POPLIST');
	}
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var userNm = "<%= userInfo.getUser_name() %>";
		var userTel = "<%= userInfo.getPhn() %>";
		var userFax = "<%= userInfo.getFax() %>";
		var userEml = "<%= userInfo.getEml() %>";
		
		// [#1302][OEH Shipping Instruction] Cannot auto suggestion when name inputted
		var AUTOCOMPLETE_YN = 'Y';
		<logic:notEmpty name="cdMap" property="autocompleteYn">
			AUTOCOMPLETE_YN = '<bean:write name="cdMap" property="autocompleteYn"/>';
		</logic:notEmpty> 
	</script>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<!-- Report Value -->
	<input type="hidden" name="cmd_type" id="cmd_type" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="rd_param" id="rd_param" />

	<input type="hidden" name="mailTitle" value="" id="mailTitle" />
	<input type="hidden" name="mailTo" value="" id="mailTo" />

	<input type="hidden" name="master_bl_no" id="master_bl_no" />
	<input type="hidden" name="s_intg_bl_seq" id="s_intg_bl_seq" />
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- <button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- --%> 
		<!-- opus_design_btn(E) -->
		</div>
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation">
			<%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span>
			</span>
		</div>
		<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">	
	<div class= "wrap_search">
  		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<tbody>
					<colgroup>
						<col width="50" />
						<col width="*" />
					</colgroup>
					<tr>
                           <th><bean:message key="HBL_No"/></th>
                              <td><!-- 
                              	 --><input name="house_bl_no" id="house_bl_no" type="text" maxlength="40" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:128px;" onKeyPress="if(event.keyCode==13){doPop('HBL_POPLIST');}"><!-- 
                               	 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('HBL_POPLIST')"></button>
                              </td>
					</tr>
				</tbody>	
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<!-- opus_design_inquiry(E) -->
		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry wFit">
			<table>
				<tbody>
					<colgroup>
						<col width="*" />
					</colgroup>
		                        <tr>	
		                          	<td>
		                          		<input type="radio" name="s_ship_to" id="s_ship_to1" value="B" onClick="fRadio(this.value);" checked ><label for="s_ship_to1"><bean:message key="Broker"/></label> <!-- 
		                            	 --><input type="radio" name="s_ship_to" id="s_ship_to2" value="S" onClick="fRadio(this.value);"><label for="s_ship_to2"><bean:message key="Shipper"/></label> <!-- 
		                            	 --><input type="radio" name="s_ship_to" id="s_ship_to3" value="C" onClick="fRadio(this.value);"><label for="s_ship_to3"><bean:message key="Consignee"/></label> <!-- 
		                            	 --><input type="radio" name="s_ship_to" id="s_ship_to4" value="N" onClick="fRadio(this.value);"><label for="s_ship_to4"><bean:message key="Notify"/></label>
		                      		</td>
		                        </tr>
		                        <tr>
		                      		<td>
		                            	<input type="radio" name="s_ship_to" id="s_ship_to5" value="O" onClick="fRadio(this.value);"><label for="s_ship_to5"><bean:message key="Other_Company"/></label> <!-- 
		                            	 --><input name="ntc_trdp_cd" id="ntc_trdp_cd" readonly type="text" maxlength="20" value='' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;" onKeyPress="if(event.keyCode==13){doPop('PARTNER_POPLIST');}"><!-- 
	                                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('PARTNER_POPLIST')"></button><!-- 
	                                    --><input name="ntc_trdp_full_nm" id="ntc_trdp_full_nm" readonly type="text" maxlength="50" value='' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:134px;" onKeyPress="if(event.keyCode==13){doPop('PARTNER_POPLIST');}">
		                            </td>    
		                        </tr>
				</tbody>	
			</table>
		</div>
		<!-- opus_design_inquiry(E) -->
	</div>	
</div>
</form>

