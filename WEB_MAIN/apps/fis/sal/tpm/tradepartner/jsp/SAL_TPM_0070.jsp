<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SAL_TPM_0070.jsp
*@FileTitle  : Pre-Pickup Order Entry
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0070.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-12 자동완성 기능 추가 S -->	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- #4649 [BNX] Pre-Pickup Order to have Credit Validation (v461.14) 관련 추가 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 2016-12-12 자동완성 기능 추가 E -->
	<bean:define id="woPickDeliVO"  name="EventResponse" property="objVal"/>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="billCmmVO" name="valMap" property="bill"/>
	<bean:define id="deliveryCmmVO" name="valMap" property="delivery"/>
	
	<script type="text/javascript">
		var user_ofc_cd = "<%=userInfo.getOfc_cd()%>";
		var ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		var user_eml = "<%=userInfo.getEml()%>";
		var user_phn = "<%=userInfo.getPhn()%>";
		var user_fax = "<%=userInfo.getFax()%>";
		var usrid = "<%=userInfo.getUsrid()%>";
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>"
		
		var AUTOCOMPLETE_YN = 'N';
		 
		<logic:notEmpty name="valMap" property="autocompleteYn">
	     	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
		</logic:notEmpty>
		 
	</script>
	<script>
	function setupPage(){
     	loadPage();
     	//doWork('SEARCHLIST');
     }
	</script>
<form name="frm1" method="POST" action="./SAL_TPM_0070.clt">
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="file_name" name="file_name" type="hidden" />
	<input id="title" name="title" type="hidden" />
	<input id="mailTitle" name="mailTitle" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />
	
	<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
	<input type="hidden" name="rpt_file_name_title"/>

	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
				<%-- 
			    <button type="button" class="btn_accent" onClick="doWork('SEARCH')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  id="btnSearch" name="btnSearch"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" onClick="doWork('NEW')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" id="btnNew" name="btnNew"><bean:message key="New"/></button>
				<button type="button" class="btn_normal" id="btnAdd" name="btnAdd" onClick="doWork('ADD')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button> 
				<button type="button" class="btn_normal" id="btnPrint" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onClick="doWork('PRINT')"><bean:message key="Print"/></button>
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="COPY" name="btnCopy" id="btnCopy" onClick="doWork('COPY')"><bean:message key="Copy"/></button>
				--%>
			</div>
			<!-- opus_design_btn(E) -->
    
  			<!-- page_location(S) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<logic:equal name="air_sea_clss_cd" value="S"><bean:message key="Sea"/></logic:equal>
			<logic:equal name="air_sea_clss_cd" value="A"><bean:message key="Air"/></logic:equal> 
			<logic:equal name="bnd_clss_cd" value="I"><bean:message key="Import"/></logic:equal>
			<logic:equal name="bnd_clss_cd" value="O"><bean:message key="Export"/></logic:equal> 
			<logic:equal name="bnd_clss_cd" value="G"><bean:message key="Other"/></logic:equal> <span class="navi_b"></span>
			<logic:equal name="biz_clss_cd" value="M"><bean:message key="Master_BL"/>> <span class="navi_b"></span></logic:equal>
			<logic:equal name="biz_clss_cd" value="H"><bean:message key="House_BL"/>> <span class="navi_b"></span></logic:equal> 
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
    
	<!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
		<!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
				        	<col width="120" />
				        	<col width="*" />
				</colgroup>
				<tbody>
						<tr>
							<th><bean:message key="Work_Order_No"/></th>
							<td>
								<input type="text" name="f_wo_no" maxlength="20" value="<bean:write name="woPickDeliVO" property="wo_no"/>" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:204px">
								<button type="button" class="input_seach_btn" tabindex="-1"  id="wolist" onclick="doWork('WHWO_POPLIST',this)"></button>
							</td>
						</tr>
				</tbody>
			</table>
		</div>
		<!-- inquiry_area(E) -->
	</div>
	<!-- wrap search (E) -->
		
	<div class="wrap_result">     
		<!-- layout_wrap(S) -->
		<div class="layout_wrap" style="min-width:1300px">
			<div class="layout_vertical_3 pad_left_8" style="width:400px">
				<div class="opus_design_inquiry sm" name="bg" style="width:100%;height:650px">
				<h3 class="title_design"> </h3>
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="To_Trucking_Co"/></th>
			                        <td><input type="text" name="trsp_trdp_cd" maxlength="20" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:55px;" value='<bean:write name="woPickDeliVO" property="trsp_trdp_cd"/>' onKeyDown="codeNameAction('partner_trsp',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trsp',this, 'onBlur')"><!-- 
				                         --><button type="button" class="input_seach_btn" tabindex="-1" onblur="strToUpper(this);" id="trn" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
				                         --><input type="text" name="trsp_trdp_nm" maxlength="50" value='<bean:write name="woPickDeliVO" property="trsp_trdp_nm"/>' class="search_form" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('trn'), frm1.trsp_trdp_nm.value);}">
				                    </td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea name="trsp_trdp_addr" maxlength="400" class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px"><bean:write name="woPickDeliVO" property="trsp_trdp_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="Pick_Up_At"/></th>
			                        <td><input type="text"   name="org_rout_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="org_rout_trdp_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_pickup',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_pickup',this, 'onBlur')"><!-- 
			                            --><button type="button" class="input_seach_btn" tabindex="-1" id="pic" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                            --><input type="text"   name="org_rout_trdp_nm" class="search_form" maxlength="50" onblur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="org_rout_trdp_nm"/>' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('pic'), frm1.org_rout_trdp_nm.value);}">
				                    </td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea name="org_rout_addr"  maxlength="400" class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:60px;"><bean:write name="woPickDeliVO" property="org_rout_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="Deliver_to"/></th>
			                        <td><input type="text"   name="dest_rout_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="dest_rout_trdp_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_delivery',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_delivery',this, 'onBlur')"><!-- 
			                            --><button type="button" class="input_seach_btn" tabindex="-1" id="del" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                            --><input type="text"   name="dest_rout_trdp_nm" maxlength="50" class="search_form" onblur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="dest_rout_trdp_nm"/>' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('del'), frm1.dest_rout_trdp_nm.value);}">
				                    </td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea name="dest_rout_addr"  maxlength="400" class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:65px;"><bean:write name="woPickDeliVO" property="dest_rout_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
				
					<div id="divBillTo">
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="Bill_To"/></th>
			                        <td><input type="text"   name="bill_to_trdp_cd" maxlength="20" value='<bean:write name="woPickDeliVO" property="bill_to_trdp_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"  onKeyDown="codeNameAction('partner_bill',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_bill',this, 'onBlur')"><!-- 
			                            --><button type="button" class="input_seach_btn" tabindex="-1"  id="bil" onclick="doWork('PARTNER_POPLIST',this)"></button><!-- 
			                            --><input type="text"   name="bill_to_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" value='<bean:write name="woPickDeliVO" property="bill_to_trdp_nm"/>' onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('bil'), frm1.bill_to_trdp_nm.value);}">
				                    </td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea name="bill_to_trdp_addr"  maxlength="400" class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:65px;"><bean:write name="woPickDeliVO" property="bill_to_trdp_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					</div>
			</div>
			<!-- inquiry_area(E) -->
			</div>
			
			<div class="layout_vertical_3 pad_left_8" style="width:500px;">
				<div class="opus_design_inquiry sm" name="bg" style="width:100%;height:650px">
					
					<h3 class="title_design" ><bean:message key="Detail_Info"/></h3>
					<table>	
						        <colgroup>
									<col width="140" />
									<col width="*" />
								</colgroup>
								<tbody>
									 <tr>
		                                    <th><bean:message key="Work_Order_No"/></th>
		                                    <td>
		                                        <input type="text" name="wo_no"  value='<bean:write name="woPickDeliVO" property="wo_no"/>' class="search_form" maxlength="20" onblur="strToUpper(this);" dataformat="eng" otherchar="-_" style="ime-mode:disabled; text-transform:uppercase;width:237px;" onclick="strAuto(this);">
		                                    </td>
		                                </tr>
									 <tr>
		                                    <th><bean:message key="Date"/></th>
		                                    <td>
		                                        <input type="text" name="iss_dt_tm"  value='<bean:write name="woPickDeliVO" property="iss_dt_tm"/>' onkeyPress="'return event.charCode >= 48 && event.charCode <= 57';onlyNumberCheck();mkDateFormatType(this, event, false,1);" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Date');"  class="search_form" maxlength="10" dataformat="excepthan" style="ime-mode:disabled;width:80px;"><!--
	                                        --><button type="button" id="iss_dt_tm_cal" name="iss_dt_tm_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1" ></button><!--#952-->
		                                    </td>
		                                </tr>
									 <tr>
		                                    <th><bean:message key="Requested_By"/></th>
		                                    <td>
		                                        <input type="text" name="iss_usrid"  value='<bean:write name="woPickDeliVO" property="iss_usrid"/>'  class="search_form-disable" tabindex="-1" readOnly style="width:80px;" maxlength="50"><!-- 
		                                         --><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button>
		                                    </td>
		                                </tr>
								</tbody>
					</table>
					
					<table>	
					        <colgroup>
								<col width="140" />
								<col width="90" />
								<col width="47" />
								<col width="*" />
							</colgroup>
							<tbody>
								 <tr>
	                                    <th><bean:message key="Pick_Up_Date"/></th>
	                                    <td style="width:80px">
	                                        <input type="text" name="org_rout_dt_tm"  value='<bean:write name="woPickDeliVO" property="org_rout_dt_tm"/>' class="search_form" maxlength="10" dataformat="excepthan" style="ime-mode:disabled;width:80px;"  onkeyPress="'return event.charCode >= 48 && event.charCode <= 57';onlyNumberCheck();mkDateFormatType(this, event, false,1);" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Pick Up Date');"  formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"><!--
	                                        --><button type="button" id="org_rout_dt_tm_cal" name="org_rout_dt_tm_cal" onclick="doDisplay('DATE3', frm1);" class="calendar" tabindex="-1" ></button><!--#952-->
	                                    </td>
	                                    <th><bean:message key="Time"/></th>
	                                    <td>
	                                        <input type="text" name="org2_rout_dt_tm"  value='<bean:write name="woPickDeliVO" property="org2_rout_dt_tm"/>' class="search_form" maxlength="20" dataformat="excepthan" style="ime-mode:disabled;width:74px;" >
	                                    </td>
	                                </tr>
							</tbody>
					</table>
					<table style="display:<%="DE".equals(userInfo.getOfc_cnt_cd()) ? "inline" : "none"%>"  >	
							<colgroup>
								<col width="140" />
								<col width="*" />
							</colgroup>
							<tbody >
								 <tr>
	                                    <th><bean:message key="Openning_Hours"/></th>
	                                    <td>
	                                        <!-- <input type="text" name="org_ofc_hr"  value='' class="search_form" maxlength="10" dataformat="excepthan"  onblur="strToUpper(this);" style="ime-mode:disabled; text-transform:uppercase;width:204px;" > -->
	                                    	<textarea name="org_ofc_hr" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="width:237px;height:45px;"><bean:write name="woPickDeliVO" property="org_ofc_hr"/></textarea>
	                                    </td>
	                                </tr>
							</tbody>
					</table>
					<table>	  
					        <colgroup>
								<col width="140" />
								<col width="*" />
							</colgroup>
							<tbody>
								 <tr>
	                                    <th><bean:message key="Pick_Up"/>&nbsp;<bean:message key="Reference_No"/></th>
	                                    <td>
	                                        <input type="text" name="rmk"  value='<bean:write name="woPickDeliVO" property="rmk"/>' class="search_form" maxlength="50" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:237px;">
	                                    </td>
	                                </tr>
							</tbody>
					</table>
					<table>	
					        <colgroup>
					        	<col width="140" />
					        	<col width="90" />
					        	<col width="47" />
								<col width="*" />
							</colgroup>
							<tbody>
								 <tr>
	                                    <th><bean:message key="Delivery_Date"/></th>
	                                    <td>
	                                        <input type="text" name="dest_rout_dt_tm"  value='<bean:write name="woPickDeliVO" property="dest_rout_dt_tm"/>' class="search_form" maxlength="10" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onkeyPress="'return event.charCode >= 48 && event.charCode <= 57';"  onkeyup="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onKeyUp="" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Delivery Date');"  formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"><!--
	                                        --><button type="button" id="dest_rout_dt_tm_cal" name="dest_rout_dt_tm_cal" onclick="doDisplay('DATE4', frm1);" class="calendar" tabindex="-1" ></button><!--#952-->
	                                    </td>
	                                    <th><bean:message key="Time"/></th>
	                                    <td>
	                                        <input type="text" name="via_rout_dt_tm"  value='<bean:write name="woPickDeliVO" property="via_rout_dt_tm"/>' class="search_form" maxlength="20" dataformat="excepthan" style="ime-mode:disabled;width:74px;" >
	                                    </td>
	                                </tr>
							</tbody>
					</table>
					<table style="display:<%="DE".equals(userInfo.getOfc_cnt_cd()) ? "inline" : "none"%>"  >	
							<colgroup>
								<col width="140" />
								<col width="*" />
							</colgroup>
							<tbody >
								 <tr>
	                                    <th><bean:message key="Openning_Hours"/></th>
	                                    <td>
	                                        <!-- <input type="text" name="via_ofc_hr"  value='' class="search_form" maxlength="10" dataformat="excepthan"  onblur="strToUpper(this);" style="ime-mode:disabled; text-transform:uppercase;width:204px;" > -->
	                                    	<textarea name="via_ofc_hr" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="width:237px;height:45px;"><bean:write name="woPickDeliVO" property="via_ofc_hr"/></textarea>
	                                    </td>
	                                </tr>
							</tbody>
					</table>
					<table id="tbCertiPkupAsCd" style="display: none" >	
						<colgroup>
							<col width="140" />
							<col width="*" />
						</colgroup>
						<tbody >
							 <tr>
                                 <th><bean:message key="Pick_Up_As"/></th>
                                 <td>
                                 	<bean:define id="certiPkupAsCdList" name="valMap" property="certiPkupAsCdList"/>
	                                <html:select name="woPickDeliVO" property="certi_pkup_as_cd" styleClass="search_form" style="width:237px;">
	                                    <option value=""></option>
	                                    <html:options collection="certiPkupAsCdList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select>
                                 </td>
                             </tr>
						</tbody>
					</table>
					
					<!-- opus_design_grid(S) -->
	        		<div class="opus_design_grid">
	            	<script type="text/javascript">comSheetObject('sheet1');</script>
	        		</div>
					<table>
						<tr height="20px"></tr>
					</table>	        		
	        		<h3 class="title_design"><bean:message key="Cargo_Detail"/></h3>
					<table>
							<colgroup>
								<col width="110" />
								<col width="*" />
							</colgroup>
							<tbody>
								<tr>
	                                    <th><bean:message key="Package"/></th>
	                                    <td> 
	                                         <input type="text" name="cgo_pck_qty" value="<wrt:write name="woPickDeliVO" property="cgo_pck_qty" formatType="MONEY" format="#,###"/>" onkeyPress="onlyNumberCheck();" onkeyup="pkgChange(this);numberCommaLen(this,7,0)" maxlength="13"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;text-align:right">
	                                     	 <bean:define id="pckList" name="valMap" property="pckCdList"/> 
	                                         <html:select name="woPickDeliVO" property="cgo_pck_ut_cd" styleClass="search_form" style="width:128px;">
	                                            <option></option>
	                                            <html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
	                                        </html:select>  
	                                    </td>
	                            </tr>
						</tbody>
					</table>
	        		<table>
							<colgroup>
								<col width="110" />
								<col width="70" />
								<col width="70" />
								<col width="*" />
							</colgroup>
							<tbody>
									<tr>
									   <th><bean:message key="Dimension"/></th>
									   <td><input type="hidden" name="size_ut_cd1" id="size_ut_cd1" value="<bean:write name="woPickDeliVO" property="size_ut_cd"/>"/>
									   <input type="radio" name="size_ut_cd" id="size_ut_cd2" value="CM" onClick="javascript:chkSizeType();"><label for="size_ut_cd1"><bean:message key="Cm"/></label></td>
								   	   <td><input type="radio" name="size_ut_cd" id="size_ut_cd3" value="INCH" onClick="javascript:chkSizeType();" checked><label for="size_ut_cd2"><bean:message key="Inch"/></label></td>
								   	   <td>
								   	   <div class="opus_design_grid" id="mainTable">
		            						<div class="opus_design_btn">
									   	   		<button  onClick="setHblSizeUp(docObjects[1])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Plus"/></button>
												<button onClick="setHblSizeDown(docObjects[1])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Minus"/></button>
									   	   		<button type="button" class="btn_normal" onClick="doWork('CAL_CBM_NEW')"><bean:message key="Add"/></button>
									   	   	</div>
	        							</div>
								   	   
								   	   	</td>
									</tr>
							</tbody>
					</table>
	            	<script type="text/javascript">comSheetObject('sheet2','-1');</script>
					<table>
							<colgroup>
								<col width="110" />
								<col width="*" />
							</colgroup>
							<tbody>
							<tr>
									<th><bean:message key="GWeight"/></th>
									<td> <!-- OFVFOUR-7817: [PQC][WH Pickup Order Entry] - The values of Package, Measurement, Volume Weight fields in existing WH Pickup Order Entry DOES NOT display comma for each 1,000 unit -->
										 <input type="text" name="act_wgt_k" value="<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="weightChange(this);numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);" maxlength="12" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:68px;text-align:right;">
										 <input type="text" name="grs_wgt_ut_cd" value="KG" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1">
										 <input type="text" name="act_wgt_l" value="<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="weightChange(this);numberCommaLen(this,10,obl_decimal_len);chkComma(this,10,obl_decimal_len);" maxlength="12" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:68px;text-align:right;">
										 <input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="2">
									</td>
								</tr>
							<tr>
									<th><bean:message key="Measurement"/></th>
									<td> <!-- OFVFOUR-7817: [PQC][WH Pickup Order Entry] - The values of Package, Measurement, Volume Weight fields in existing WH Pickup Order Entry DOES NOT display comma for each 1,000 unit -->
										 <input type="text" name="cgo_meas_m" value="<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="cbmChange(this);numberCommaLen(this,8,3);chkComma(this,8,3);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:68px;text-align:right;">
										 <input type="text" name="meas_ut_cd" value="CBM" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="5">
										 <input type="text" name="cgo_meas_f" value="<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="cbmChange(this);numberCommaLen(this,8,3);chkComma(this,8,3);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:68px;text-align:right;">
										 <input type="text" name="meas_ut_cd1" value="CFT" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="6">
									</td>
							</tr>
							<tr>
									<th><bean:message key="Volume_Weight"/></th> 
									<td> <!-- OFVFOUR-7817: [PQC][WH Pickup Order Entry] - The values of Package, Measurement, Volume Weight fields in existing WH Pickup Order Entry DOES NOT display comma for each 1,000 unit -->
										 <input type="text" name="chg_wgt" value="<wrt:write name="woPickDeliVO" property="chg_wgt" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="cbmChange(this);numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);" maxlength="12" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:68px;text-align:right;">
										 <input type="text" name="meas_ut_cd2" value="KG" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="5">
										 <input type="text" name="chg_wgt1" value="<wrt:write name="woPickDeliVO" property="chg_wgt1" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="cbmChange(this);numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);" maxlength="12" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:68px;text-align:right;">
										 <input type="text" name="meas_ut_cd3" value="LB" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="6">
									</td>
							</tr>							
						</tbody>
					</table>
					<table>
						<tr height="20px"></tr>
					</table>
					</div>
		        	<!-- opus_design_grid(E) -->
		    </div>
		
			<div class="layout_vertical_3 pad_left_8" style="width:400px;">
				<div class="opus_design_inquiry sm" name="bg" style="width:100%;height:650px">
				
				<h3 class="title_design"> </h3>	
					
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="To_Agent"/></th>
			                        <td><input type="text" name="prnr_trdp_cd" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;" value='<bean:write name="woPickDeliVO" property="prnr_trdp_cd"/>' onKeyDown="codeNameAction('partner_prnr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_prnr',this, 'onBlur')"><!-- 
			                            --><button type="button" class="input_seach_btn" tabindex="-1"  id="prnr" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                            --><input type="text" name="prnr_trdp_nm" maxlength="50" value='<bean:write name="woPickDeliVO" property="prnr_trdp_nm"/>' class="search_form" onblur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:145px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('prnr'), frm1.prnr_trdp_nm.value);}">
				                    </td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea name="prnr_trdp_addr"  maxlength="400" class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:360px;height:65px;"><bean:write name="woPickDeliVO" property="prnr_trdp_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="Shipper"/></th>
			                        <td><input type="text" name="shpr_trdp_cd" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;" value='<bean:write name="woPickDeliVO" property="shpr_trdp_cd"/>' onKeyDown="codeNameAction('partner_shpr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_shpr',this, 'onBlur')"><!-- 
			                            --><button type="button" class="input_seach_btn" tabindex="-1"  id="shpr" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                            --><input type="text" name="shpr_trdp_nm" maxlength="50" value='<bean:write name="woPickDeliVO" property="shpr_trdp_nm"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:145px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('shpr'), frm1.shpr_trdp_nm.value);}">
				                    </td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea name="shpr_trdp_addr"  maxlength="400" class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);"  dataformat="excepthan" style="ime-mode:disabled;width:360px;height:65px;"><bean:write name="woPickDeliVO" property="shpr_trdp_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>	
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr>
			                        <th style="text-align:left"><bean:message key="Consignee"/></th>
			                        <td><input type="text" name="cnee_trdp_cd" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;" value='<bean:write name="woPickDeliVO" property="cnee_trdp_cd"/>' onKeyDown="codeNameAction('partner_cnee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_cnee',this, 'onBlur')"><!-- 
			                            --><button type="button" class="input_seach_btn" tabindex="-1"  id="cnee" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
			                            --><input type="text" name="cnee_trdp_nm" maxlength="50" value='<bean:write name="woPickDeliVO" property="cnee_trdp_nm"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:145px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('cnee'), frm1.cnee_trdp_nm.value);}">
				                    </td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea name="cnee_trdp_addr" maxlength="400"  class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);"  dataformat="excepthan" style="ime-mode:disabled;width:360px;height:65px;"><bean:write name="woPickDeliVO" property="cnee_trdp_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>									

					<div id="divflightSchedule">
					<table>
						<colgroup>
							<col width="127">
							<col width="*">
						</colgroup>
							<tbody>
			                     <tr height="29">
			                        <th style="text-align:left"><bean:message key="Flight_Schedule"/></th>
			                        <td> </td>
			                    </tr>
			                    <tr>
			                    	<td colspan="2"><textarea name="org2_rout_addr"  maxlength="400" class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:360px;height:87px;"><bean:write name="woPickDeliVO" property="org2_rout_addr"/></textarea></td>
			                    </tr>
							</tbody>
					</table>
					<h3 class="title_design"><bean:message key="Remark"/></h3>
						<table>
								<colgroup>
									<col width="*" />
								</colgroup>
								<tbody>
								 <tr>
	                                    <td>
	                                        <textarea name="via_rout_addr"  maxlength="400" class="search_form" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat=multiLanguage style="<%=MULTI_IMEMODE%>width:360px;height:87px;"><bean:write name="woPickDeliVO" property="via_rout_addr"/></textarea>
										</td>
	                             </tr>
							</tbody>
						</table>
					</div>
				</div>
			<!-- inquiry_area(E) -->	
			</div>
			<!-- layout_wrap(E) -->
		</div>
	</div>
</div>
</form>
<script type="text/javascript">
	doBtnAuthority(attr_extension);
</script>	

