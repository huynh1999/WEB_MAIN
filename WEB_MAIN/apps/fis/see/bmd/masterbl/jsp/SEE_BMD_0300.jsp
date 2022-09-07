<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0300.jsp
*@FileTitle  : Ocean Quotation 등록
*@Description: Ocean Quotation 등록 및 조회
*@author     : You,Ji-Won
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
*@author     : Hoang.Pham
*@version    : 2.0 - 2014/12/25
*@since      : 2014/12/25
=========================================================
--%>
<%@page import="com.clt.apps.fis.mdm.mcm.office.dto.OfcVO"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<bean:define id="qttnVo"   name="EventResponse" property="objVal"/>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<title><bean:message key="system.title"/></title>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/masterbl/script/SEE_BMD_0300.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
<script>	
	function btnLoad(){
		if (frm1.qttn_no.value == "") {
			getBtnObj("btnAdd").style.display = 'inline';
			getBtnObj("btnModify").style.display  = 'none';
			getBtnObj("btnDelete").style.display  = 'none';
			getBtnObj("btnPrint").style.display = 'none';
		} else {
			getBtnObj("btnAdd").style.display = 'none';
			getBtnObj("btnModify").style.display  = 'inline';
			getBtnObj("btnDelete").style.display  = 'inline';
			getBtnObj("btnPrint").style.display = 'inline';
		}
	}
	
    <!-- ###Office Info## -->
    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
    var v_ofc_locl_nm = "<bean:write name="ofcVO" property="ofc_locl_nm"/>";
    var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
    
    //[20130926 OJG ]Booking Confirm 출력용 변수.
    var v_ofc_eng_nm = "<bean:write name="ofcVO" property="ofc_eng_nm"/>";	
    var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
    var v_eml = "<%=userInfo.getEml()%>";												
	var v_ofc_cd = "<%=userInfo.getOfc_cd()%>";
	var v_phn = "<%=userInfo.getPhn()%>";  
	var v_fax = "<%=userInfo.getFax()%>";
	
    /* jsjang 2013.08.27 office, ooh_bkg_rmk 정보 처리 변경 */
	var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
	
	<!-- ###Unit Code 항목### -->
	var UNITCD1 = ' |';
	var UNITCD2 = ' |';
	<% boolean isBegin = false; %>
	<!-- Freight Unit 단위 -->
    <logic:notEmpty name="valMap" property="UNITCD">
		<% isBegin = false; %>
        <bean:define id="unitList" name="valMap" property="UNITCD"/>
        <logic:iterate id="codeVO" name="unitList">
            <% if(isBegin){ %>
                UNITCD1+= '|';
                UNITCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
    </logic:notEmpty>
    
    <!-- ###Freight 항목### -->
	var CHG_DESC = '';
	<% isBegin = false; %>
	<!-- Freight Unit 단위 -->
    <logic:notEmpty name="valMap" property="chgDescList">
		<% isBegin = false; %>
        <bean:define id="chgDescList" name="valMap" property="chgDescList"/>
        <logic:iterate id="codeVO" name="chgDescList">
            <% if(isBegin){ %>
            	CHG_DESC+= '|';
            <% }else{
                  isBegin = true;
               } %>
            CHG_DESC+= '<bean:write name="codeVO" property="cd_nm"/>';
        </logic:iterate>
    </logic:notEmpty>
    
 </script>
 <script type="text/javascript">
	function setupPage() {
		btnLoad();loadPage();doHideProcess();loadData();
	}
	
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	
	// [#1269][OI Quotation Entry] Cannot auto suggestion when name inputted
	var AUTOCOMPLETE_YN = 'Y';
	<logic:notEmpty name="valMap" property="autocompleteYn">
		AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
 </script>
 <form name="frm1">
 	<input type="hidden" name="f_cmd" id="f_cmd">
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="file_name" id="file_name"/>
	<input type="hidden" name="rd_param" id="rd_param"/>
	<input type="hidden" name="mailTitle" id="mailTitle" value="">
	<input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>" />	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<input type="hidden" name="title_form" id="title_form" value="<%=LEV3_NM%>">
	<input type="hidden" name="autho" value="<%= roleBtnVO.getAttr5() %>">
	
	<input type="hidden" name="air_sea_clss_cd" id="air_sea_clss_cd" value="<bean:write name="valMap" property="air_sea_clss_cd"/>" />
	<!-- input type="hidden" name="bnd_clss_cd" id="bnd_clss_cd" value="O" /-->
	<input type="hidden" name="bnd_clss_cd"  value="<bean:write name="valMap" property="bnd_clss_cd"/>">
	
	<div class="page_title_area clear">
	   	<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		
	   <!-- btn_div...... -->
	   <div class="opus_design_btn TOP">
	   	   <%-- 
	   	   <button type="button" class="btn_accent" style="display:none;" onClick="doWork('SEARCHLIST')" btnAuth="<%= roleBtnVO.getAttr1() %>" id="btn_Retrieve" name="btn_Retrieve"><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" style="display:none;" onClick="doWork('NEW');" btnAuth="<%= roleBtnVO.getAttr2() %>" id="btn_New" name="btn_New"><bean:message key="New"/></button>
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onClick="doWork('ADD')" id="btnAdd" name="btnAdd"><bean:message key="Save"/></button>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('MODIFY')" id="btnModify" name="btnModify"><bean:message key="Save"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('PRINT');" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button></span>
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('REMOVE');" name="btnDelete" id="btnDelete"><bean:message key="Delete"/></button></span>
		    --%>
	   </div>
	   
	   <!-- btn_div -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
		</div>
	</div>
<div class="over_wrap" height="100%">	
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="100">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Quotation_No"/></th>
						<td>
							<input type="text" name="f_qttn_no" id="f_qttn_no" maxlength="20" required="required" value="<bean:write name="valMap" property="f_qttn_no"/>" onblur="strToUpper(this)" style="ime-mode:disabled;text-transform:uppercase;width:125px;" onkeydown="entSearch();">
							<input type="hidden" name="f_qttn_seq" id="f_qttn_seq" value="<bean:write name="valMap" property="f_qttn_seq"/>" /></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable" style="display: none;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="layout_wrap">
			<div class="layout_vertical_4" style="width: 470px">
				<div class="opus_design_inquiry sm" style="height: 510px;">
					<table>
						<colgroup>
							<col width="130">
							<col width="140">
							<col width="90">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Quotation_No"/></th>
								<td>
									<input type="text" name="qttn_no" id="qttn_no" maxlength="20" value='<bean:write name="qttnVo" property="qttn_no"/>' onblur="strToUpper(this)" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:125px;">
									<input type="hidden" name="qttn_seq" id="qttn_seq" value="<bean:write name="qttnVo" property="qttn_seq"/>" />
								</td>
								<th><bean:message key="Date"/></th>
								<td>
									<input required type="text" name="qttn_dt" id="qttn_dt" maxlength="10" value="<wrt:write name="qttnVo" property="qttn_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Date');" style="ime-mode:disabled;width:70px;"><!--
								--><button type="button" id="qttn_dt_cal" name="qttn_dt_cal" onclick="doDisplay('DATE1' ,frm1.qttn_dt);" class="calendar" tabindex="-1"></button>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Customer"/></th>
	                            <td colspan="3">
	                            	<input type="text" name="cust_cd" id="cust_cd" maxlength="20" value='<bean:write name="qttnVo" property="cust_cd"/>' class="search_form" onKeyDown="codeNameAction('CUST',this,'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUST',this,'onBlur');" style="ime-mode:disabled; text-transform:uppercase;width:60px;" onblur="strToUpper(this);"><!--
	                            	--><button type="button" id="cust" name="cust" class="input_seach_btn" tabindex="-1" onClick="doWork('CUST_POPLIST')"></button><!--
	                             	--><input type="text" name="cust_nm" id="cust_nm" maxlength="200" value='<bean:write name="qttnVo" property="cust_nm"/>' class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:238px;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){doWork('CUST_POPLIST');}">
	                      		</td>
							</tr>
							<tr>
								<th><bean:message key="Address"/></th>
								<td colspan="3">
                            		<textarea name="cust_addr" class="search_form" maxlength="400" dataformat="excepthan" style="width:331px;height:80px;" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" ><bean:write name="qttnVo" property="cust_addr" filter="false"/></textarea>
                            	</td>
                            </tr>
							<tr>
								<th><bean:message key="Contact"/></th>
	                            <td colspan="3"><input name="cust_pic_nm" id="cust_pic_nm" maxlength="50" value='<bean:write name="qttnVo" property="cust_pic_nm"/>' type="text" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:331px;" onblur="strToUpper(this);"></td>
							</tr>
							<tr>
								<th><bean:message key="Agent"/></th>
								<td colspan="3">
									<input type="text" name="agn_cd" id="agn_cd" maxlength="20" value='<bean:write name="qttnVo" property="agn_cd"/>' onKeyDown="codeNameAction('AGN',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('AGN',this,'onBlur')" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:60px;"><!--
									--><button type="button"  id="agn" name="agn" class="input_seach_btn" tabindex="-1" onClick="doWork('AGN_POPLIST')"></button><!--
									--><input type="text" name="agn_nm" id="agn_nm" maxlength="200" value='<bean:write name="qttnVo" property="agn_nm"/>' onblur="strToUpper(this)" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:238px;" onKeyPress="if(event.keyCode==13){doWork('AGN_POPLIST');}">
								</td>
				            </tr>
				            <tr>
                              	<th><bean:message key="Incoterms"/></th>
                              	<td><bean:define id="incotermsList" name="valMap" property="incotermsList"/>
		                            <html:select name="qttnVo" property="inco_cd" styleClass="search_form" style="width:90px;">
		                            	<option value=""></option>
		                                <html:options collection="incotermsList" property="cd_val" labelProperty="cd_nm"/>
		                            </html:select>
		                            <input type="hidden" name="h_inco_cd" value="<bean:write name="qttnVo" property="inco_cd"/>">
								</td>
								<th><bean:message key="Validity"/></th>
								<td>
									<input type="text" name="vty_dt" id="vty_dt" maxlength="20" value="<wrt:write name="qttnVo" property="vty_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:101px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);strToUpper(this);">
									<!--<button type="button" name="vty_dt_cal" id="vty_dt_cal" onclick="doDisplay('DATE1' ,frm1.vty_dt);" class="calendar" tabindex="-1"></button>-->
								</td>
	                       	</tr>
	                       	<tr>
								<th><bean:message key="Commodity"/></th>
								<td colspan="3">
									<input type="text" name="cmdt_cd" id="cmdt_cd" maxlength="10" value="<bean:write name="qttnVo" property="cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('CMDT',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CMDT',this, 'onBlur')" style="ime-mode:disabled; text-transform:uppercase;width:60px;"><!--
									--><button type="button"  id="commodity" name="commodity" class="input_seach_btn" tabindex="-1" onClick="doWork('COMMODITY_POPLIST')"></button><!--
									--><input type="text" name="cmdt_nm" id="cmdt_nm" maxlength="300" value="<bean:write name="qttnVo" property="cmdt_nm"/>" class="search_form" onBlur="strToUpper(this);" onchange="" onKeyPress="if(event.keyCode==13){doWork('COMMODITY_POPLIST');}" style="ime-mode:disabled; text-transform:uppercase;width:238px;">
								</td>
							</tr>
							<tr>
								<th><bean:message key="Package"/></th>
								<td colspan="3">
									<input type="text" name="pck_qty" id="pck_qty" value="<bean:write name="qttnVo" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,8,0)" maxlength="7"  class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right"><!--
									--><bean:define id="pckList" name="valMap" property="pckCdList"/><!--
									--><html:select name="qttnVo" property="pck_ut_cd" styleClass="search_form" style="width:150px;" >
										<option></option>
										<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
									</html:select> 
									<input type="hidden" name="h_pck_ut_cd" value="<bean:write name="qttnVo" property="pck_ut_cd"/>">
								</td>
							</tr>
							<tr>
								<th><bean:message key="GWeight"/></th>
								<td colspan="3">
									<input type="text" name="grs_wgt_kg" id="grs_wgt_kg" value="<bean:write name="qttnVo" property="grs_wgt_kg"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,9,2);chkComma(this,9,2);weightChange(this);" maxlength="13" class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right;"><!--
									--><input type="text" name="grs_wgt_kg_ut_cd" id="grs_wgt_kg_ut_cd" value="KG" style="width:86px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
									--><input type="text" name="grs_wgt_lbs" id="grs_wgt_lbs" value="<bean:write name="qttnVo" property="grs_wgt_lbs"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,9,2);chkComma(this,9,2);weightChange(this);" maxlength="13" class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right;"><!--
									--><input type="text" name="grs_wgt_lbs_ut_cd" id="grs_wgt_lbs_ut_cd" value="LB" style="width:86px;border:0;background-color:transparent;" tabindex="-1" readOnly>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Measurement"/></th>
								<td colspan="3"><input type="text" name="meas_cbm" id="meas_cbm" value="<bean:write name="qttnVo" property="meas_cbm"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,9,3);chkComma(this,9,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right;"><!--
									--><input type="text" name="meas_cbm_ut_cd" id="meas_cbm_ut_cd" value="CBM" style="width:86px;border:0;background-color:transparent;" tabindex="-1" readOnly><!--
									--><input type="text" name="meas_cft" id="meas_cft" value="<bean:write name="qttnVo" property="meas_cft"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,9,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" style="ime-mode:disabled;width:60px;text-align:right;"><!--
									--><input type="text" name="meas_cft_ut_cd" id="meas_cft_ut_cd" value="CFT" style="width:86px;border:0;background-color:transparent;" tabindex="-1" readOnly>
								</td>
							</tr>
						</tbody>
					</table>
					<!-- Begin ==> #1762 [IMPEX] OCEAN QUOTATION TO HAVE DIMENSION BOX -->
					<div class="opus_design_grid"  style="width:459px">
       					<table>
							<colgroup>
								<col width="120" />
								<col width="70" />
								<col width="70" />
								<col width="*" />
							</colgroup>
							<tbody>
							<tr>
						   		<th><bean:message key="Dimension"/></th>
						   		<td>
						   			<input type="hidden" name="size_ut_cd1" id="size_ut_cd1" value="<bean:write name="qttnVo" property="size_ut_cd"/>"/>
						   			<input type="radio" name="size_ut_cd" id="size_ut_cd_cm" value="CM" onClick="javascript:chkSizeType();"><label for="size_ut_cd_cm"><bean:message key="Cm"/></label>
						   		</td>
					   	   		<td>
					   	   			<input type="radio" name="size_ut_cd" id="size_ut_cd_in" value="INCH" onClick="javascript:chkSizeType();" checked><label for="size_ut_cd_in"><bean:message key="Inch"/></label>
					   	   		</td>
					   	   		<td>
					   	   			<div class="opus_design_btn">
					   	   				<button type="button" class="btn_normal" onClick="doWork('DIM_ADD')"><bean:message key="Add"/></button>
					   	   			</div>
					   	   		</td>
							</tr>
							</tbody>
						</table>
         				<script type="text/javascript">comSheetObject('sheet4');</script>
      				</div>
      				<!-- End ==> #1762 [IMPEX] OCEAN QUOTATION TO HAVE DIMENSION BOX -->
				</div>
			</div>
			<div class="layout_vertical_4 pad_left_8" style="width: calc(100% - 470px);">
				<div class="opus_design_inquiry sm" style="height: 510px;">
					<table>
						<colgroup>
							<col width="130">
							<col width="120">
							<col width="100">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="POR"/></th>
                                <td colspan="3"><input type="text" name="por_cd" id="por_cd" maxlength="5" value='<bean:write name="qttnVo" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('POR',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('POR',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:60px;"><!--
                                	--><button type="button"  id="por" name="por" class="input_seach_btn" tabindex="-1" onClick="locOpenPopUp(this,'S')"></button><!--
                                	--><input type="text" name="por_nm" id="por_nm" maxlength="50" value='<bean:write name="qttnVo" property="por_nm"/>' class="search_form" style="ime-mode:disabled;width:238px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){locOpenPopUp(document.getElementById('por'), 'S');}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="POL"/></th>
								<td colspan="3"><input type="text" name="pol_cd" id="pol_cd" maxlength="5" value='<bean:write name="qttnVo" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('POL',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('POL',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:60px;"><!--
									--><button type="button"  id="pol" name="pol" class="input_seach_btn" tabindex="-1" onClick="locOpenPopUp(this,'S')"></button><!--
									--><input type="text" name="pol_nm" id="pol_nm" maxlength="50"  value='<bean:write name="qttnVo" property="pol_nm"/>' class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:238px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){locOpenPopUp(document.getElementById('pol'), 'S');}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="POD"/></th>
								<td colspan="3"><input type="text" name="pod_cd" id="pod_cd" maxlength="5" value='<bean:write name="qttnVo" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('POD',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('POD',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:60px;"><!--
									--><button type="button"  id="pod" name="pod" class="input_seach_btn" tabindex="-1" onClick="locOpenPopUp(this,'S')"></button><!--
									--><input type="text" name="pod_nm" id="pod_nm" maxlength="50"  value='<bean:write name="qttnVo" property="pod_nm"/>' class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:238px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){locOpenPopUp(document.getElementById('pod'), 'S');}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="DEL"/></th>
								<td colspan="3"><input type="text" name="del_cd" id="del_cd" maxlength="5" value='<bean:write name="qttnVo" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('DEL',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('DEL',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:60px;"><!--
									--><button type="button"  id="del" name="del" class="input_seach_btn" tabindex="-1" onClick="locOpenPopUp(this,'S')"></button><!--
									--><input type="text" name="del_nm" id="del_nm" maxlength="50" value='<bean:write name="qttnVo" property="del_nm"/>' class="search_form" style="ime-mode:disabled;width:238px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){locOpenPopUp(document.getElementById('del'), 'S');}">
								</td>
							</tr>
							<tr>
								<th><bean:message key="F_Dest"/></th>
								<td colspan="3"><input type="text" name="fnl_dest_loc_cd" id="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="qttnVo" property="fnl_dest_loc_cd"/>' class="search_form" onKeyDown="codeNameAction('DEST',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('DEST',this, 'onBlur','S')" style="ime-mode:disabled; text-transform:uppercase;width:60px;"><!--
									--><button type="button"  id="dest" name="dest" class="input_seach_btn" tabindex="-1" onClick="locOpenPopUp(this,'S')"></button><!--
									--><input type="text" name="fnl_dest_loc_nm" id="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="qttnVo" property="fnl_dest_loc_nm"/>' class="search_form" style="ime-mode:disabled;width:238px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){locOpenPopUp(document.getElementById('dest'), 'S');}">
								</td>
							</tr>
							<tr>
								<!-- th><bean:message key="State_Of_Origin"/></th>
								<td><input type="text"   name="state_cd" maxlength="2" value="<bean:write name="qttnVo" property="state_cd"/>" onKeyDown="codeNameAction('STATE',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('STATE',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;">
		                           	<button type="button" name="state" id="state" class="input_seach_btn" tabindex="-1" onClick="doWork('STATE_POPLIST')"></button>
		                           	<input type="hidden" maxlength="50"  name="state_nm" onblur="strToUpper(this)" class="search_form" style="width:238px;text-transform:uppercase;" onblur="strToUpper(this)"  value="<bean:write name="qttnVo" property="state_nm"/>" onKeyPress="if(event.keyCode==13){doWork('STATE_POPLIST');}"></td>
									<input type="hidden" name="state_cnt_cd" value='<bean:write name="qttnVo" property="state_cnt_cd"/>'></td -->
								<th><bean:message key="Currency"/></th>
								<td>
									<bean:define id="currCdList" name="valMap" property="currCdList"/><!-- 
									--><html:select name="qttnVo" property="curr_cd" styleClass="search_form" style="width:80px;"><!--
									--><html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/><!--
									--></html:select><!--
			                		--><input type="hidden" name="h_curr_cd" value="<bean:write name="qttnVo" property="curr_cd"/>">
			                	</td>
				               	<th><bean:message key="Quoted_By"/></th>
				               	<td colspan="3"><input type="text"   name="opr_usr_id" id="opr_usr_id" value="<bean:write name="qttnVo" property="opr_usr_id"/>"  class="search_form-disable" style="width:80px;" readOnly><!--
				               		--><button type="button"  id="btn_opr_usr_id" name="btn_opr_usr_id" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button></td>
							</tr>
							<tr>
								<th><bean:message key="Equipment_Type"/></th>
                                <td colspan="3">
                                	<bean:define id="eqTypeCdList" name="valMap" property="eqTypeCdList"/><!-- 
									--><html:select name="qttnVo" property="eq_type_cd" styleClass="search_form" style="width:80px;"><!--
									--><option></option><!--
									--><html:options collection="eqTypeCdList" property="cntr_tpsz_cd" labelProperty="cntr_tpsz_cd"/><!--
									--></html:select><!--
			                		--><input type="text" name="eq_type" id="eq_type" maxlength="50" value='<bean:write name="qttnVo" property="eq_type"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:247px;" onblur="strToUpper(this)">
								</td>
							</tr>
							<tr>
								<th><bean:message key="Booking_No"/></th>
                                <td colspan="3"><input type="text" name="bkg_no" id="bkg_no" maxlength="30" value='<bean:write name="qttnVo" property="bkg_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:331px;" onblur="strToUpper(this)">
								</td>
							</tr>
							<tr>
								<th><bean:message key="Customer_Ref_No"/></th>
                				<td colspan="3"><input type="text" name="cust_ref_no" maxlength="200"  value="<bean:write name="qttnVo" property="cust_ref_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:331px;" onblur="strToUpper(this)">
                				</td>
							</tr>
							<tr>
                              	<th><bean:message key="Mode"/> / <bean:message key="TT"/></th>
                              	<td colspan="3">
                              		<input name="mode" id="mode" maxlength="15" value='<bean:write name="qttnVo" property="mode"/>' type="text" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:137px;" onblur="strToUpper(this);"> / 
									<input name="tt" id="tt" maxlength="5" value='<bean:write name="qttnVo" property="tt"/>' type="text" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:100px;" onblur="strToUpper(this);">
								</td>
	                       	</tr>
	                       	<tr>
								<th><bean:message key="Carrier"/></th>
	                            <td colspan="3"><input name="carr_nm" id="carr_nm" maxlength="50" value='<bean:write name="qttnVo" property="carr_nm"/>' type="text" class="search_form" style="ime-mode:disabled;text-transform:uppercase;width:331px;" onblur="strToUpper(this);"></td>
							</tr>
							<tr height="25px">
                            	<th><bean:message key="Free_Form_View"/></th>
                            	<td colspan="3">
								 	<input type="checkBox" name="free_form_chk" id="free_form_chk"  value="<bean:write name="qttnVo" property="free_form_chk"/>" onclick="freeFormViewChange(this);">
                            	</td>
                            </tr>
                            <tr height="25px">
                            	<th><bean:message key="Show_Total_Amount"/></th>
                            	<td colspan="3">
								 	<input type="checkBox" name="show_ttl_amt_chk" id="show_ttl_amt_chk" >
                            	</td>
                            </tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div id="FREE_FORM_N" style="display: inline">
			<div class="layout_wrap">
				<div class="layout_vertical_4" style="width: 665px">
					<div class="opus_design_inquiry sm">
						<div class="opus_design_grid" style="width: 652px">
						<table>
							<colgroup>
								<col width="170"></col>
								<col width="*"></col>
							</colgroup>
							<tbody>
								<tr>
									<td>
										<h3 class="title_design"><bean:message key="Charge"/></h3>
									</td>
									<td>
										<div class="opus_design_btn">
										<button type="button" class="btn_accent" onClick="setSizeUp(docObjects[1], 420)"><bean:message key="Plus"/></button><!--
										--><button type="button" class="btn_normal" onClick="setSizeDown(docObjects[1], 270)"><bean:message key="Minus"/></button><!--
										--><button type="button" class="btn_normal" onClick="doWork('CHG_ADD')"><bean:message key="Add"/></button>
										</div>	
									</td>
								</tr>
							</tbody>
						</table>
						<script type="text/javascript">comSheetObject('sheet2');</script>
						</div>
					</div>
				</div>
				<div class="layout_vertical_4 pad_left_8" style="width: calc(100% - 665px);">
					<div class="opus_design_inquiry sm">
						<div class="opus_design_grid" style="width: 400px">
							<table>
								<colgroup>
									<col width="170"></col>
									<col width="*"></col>
								</colgroup>
								<tbody>
									<tr>
										<td>
											<h3 class="title_design"><bean:message key="Other_Charge"/></h3>
										</td>
										<td>
											<div class="opus_design_btn">
											<button type="button" class="btn_accent" onClick="setSizeUp(docObjects[2], 420)"><bean:message key="Plus"/></button><!--
											--><button type="button" class="btn_normal" onClick="setSizeDown(docObjects[2], 270)"><bean:message key="Minus"/></button><!--
											--><button type="button" class="btn_normal" onClick="doWork('OTH_CHG_ADD')"><bean:message key="Add"/></button>
											</div>	
										</td>
									</tr>
								</tbody>
							</table>
							<script type="text/javascript">comSheetObject('sheet3');</script>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="FREE_FORM_Y" style="display: none">
			<div class="opus_design_inquiry sm" style="height: 323px;">
				<table>
					<tr>
			       		<td>
			           		<textarea name="free_form_txt" id="free_form_txt" cols="200" rows="22" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width: 970px">
<bean:write name="qttnVo" property="free_form_txt" filter="false"/></textarea>
			           </td>
			       </tr> 
				</table>
			</div>
		</div>
		<div class="opus_design_inquiry sm">
			<h3 class="title_design"><bean:message key="Memo"/></h3>
			<table>
				<tr>
		       		<td>
		           		<textarea name="rmk" id="rmk" cols="200" rows="4" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" style="width: 970px">
<bean:write name="qttnVo" property="rmk" filter="false"/></textarea>
		           </td>
		       </tr> 
			</table>
		</div>
	</div>
</div>	
 </form>
 <script type="text/javascript">
	doBtnAuthority(attr_extension);
</script>	

