<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCMgmt.jsp
*@FileTitle  : Outbound Complete Management
*@author     : TanPham - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================--*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whoutboundcomplete/script/WHOCMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    
    <%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<%

String req_search_no   = "";
String req_search_tp   = "";
String req_search_div  = ""; //bk, lp, wave

/* String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm(); */


try {
	req_search_no   = request.getParameter("search_no") == null?"":request.getParameter("search_no");
	req_search_tp   = request.getParameter("search_tp") == null?"":request.getParameter("search_tp");
	req_search_div  = request.getParameter("search_div")== null?"":request.getParameter("search_div");
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>

<script>
	var f_put_tp_cdText = '';
	var f_put_tp_cdCode = '';
</script>

<logic:notEmpty name="cdMap" property="ord_tp_cd">
 	<bean:define id="MsList" name="cdMap" property="ord_tp_cd"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              f_put_tp_cdText+= '|';
              f_put_tp_cdCode+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 f_put_tp_cdText+= '<bean:write name="codeVO" property="name"/>';
                 f_put_tp_cdCode+= '<bean:write name="codeVO" property="code"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

	<script  type="text/javascript">
	<%-- <%=JSPUtil.getIBCodeCombo("ord_tp_cd", "", "WB3", "0", "")%> --%>
	</script> 
	
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	var TPCD1 = '';
    var TPCD2 = '';
    <% boolean isBegin = false; %>
    <!--Role 코드조회-->
    <bean:define id="tpszList"  name="cdMap" property="cntrTpszList"/>
    <logic:iterate id="codeVO" name="tpszList">
        <% if(isBegin){ %>
            TPCD1+= '|';
            TPCD2+= '|';
        <% }else{
              isBegin = true;
           } %>
        TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
    </logic:iterate>
    
    
	var WHCDLIST = "";
	var WHNMLIST = "";
	<bean:define id="MsList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="MsList">
           WHCDLIST+= '|';
           WHNMLIST+= '|';
           WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd">

<input type="hidden" name="req_search_no" id="req_search_no"	value="<%=req_search_no%>" />
<input type="hidden" name="req_search_tp" id="req_search_tp"	value="<%=req_search_tp%>" />
<input type="hidden" name="req_search_div" id="req_search_div"	value="<%=req_search_div %>" />

<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>"/>

<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />

<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 

<%-- <input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" /> --%>

<div class="page_title_area clear">

		<!-- page_title(S) -->
		<h2 class="page_title">
			<button type="button"><%= LEV3_NM %></button>
		</h2>
		<!-- page_title(E) -->
	 	
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span><%= LEV1_NM %></span> &gt; <span><%= LEV2_NM %></span> &gt; <span><%= LEV3_NM %></span>
		</div>
		<!-- page_location(E) -->
</div>

<!-- opus_design_inquiry(S) -->
<div class= "wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="By_Booking"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="By_Load_Plan"/></span></a></li>
        
    </ul>
<!--     By Booking (S) -->
<div id="tabLayer" name="tabLayer" style="display:inline">  

<div id="headLayer_bk" style="display:none">
		<div class="opus_design_btn TOP">
			<%-- <button type="button" class="btn_accent" name="btn_Search_Bk" id="btn_Search_Bk" onClick="doWork('SEARCHLIST');"  style="display: none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr1() : ""%>"  style="margin-right:0px;" ><bean:message key="Search"/></button> --%>
		</div>
		<div class= "opus_design_inquiry sm" > 	
			<table>
				<colgroup>
					<col width="100" />
					<col width="330" />
					<col width="100" />
                    <col width="330" />
					<col width="100" />
					<col width="330" />
				</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>					
								<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="bk_wh_cd" id="bk_wh_cd" class="search_form" style="width: 263px;" required>
									<option value=''></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>
					</td>
					<th><bean:message key="Contract_Name"/></th>
					<td>
						<input name="bk_ctrt_no" id="bk_ctrt_no" type="text" class="L_input" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onchange="getCtrtInfo(this)"/><!-- 
						 --><button class="input_seach_btn" type="button" id="btn_bk_ctrt_no" name="btn_bk_ctrt_no" onClick="doWork('btn_bk_ctrt_no');" tabindex="-1"></button><!-- 						
						 --><input name="bk_ctrt_nm" id="bk_ctrt_nm" type="text" class="L_input" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup('bk');}"/>
					</td>
		            <th><bean:message key="Booking_Type"/></th>
					<td>
						<select name="bk_ord_tp_cd" id="bk_ord_tp_cd" style="width:200px">
						</select>
					</td>
				</tr>
		        <tr>
					<th>
						<select name="bk_search_tp" id="bk_search_tp" style="width:100px">
						</select>
					</th>
					<td colspan="3">
					<input name="wob_bk_no" id = "wob_bk_no" type="text" class="L_input" style="width:263px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
					<th><bean:message key="Booking_Date"/></th>
					<td>
					<input style="width:78px" type="text" name="bk_fm_bk_date" id="bk_fm_bk_date" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.bk_to_bk_date);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
						
							  --><span class="dash">~</span><!--  
							  
							  --><input style="width:78px" type="text" name="bk_to_bk_date" id="bk_to_bk_date" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.bk_fm_bk_date, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE11', form);"></button>
					</td>
				</tr>
				<tr>
					<th><bean:message key="Consignee"/></th>
					<td><input name="bk_buyer_cd" type="text" class="L_input" id="bk_buyer_cd" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getConsigneeInfo(this);" OnKeyDown="if(event.keyCode==13){getConsigneeInfo(this);}" onchange="getConsigneeInfo(this);"/><!-- 	
					 --><button class="input_seach_btn" type="button" id="btn_bk_buyer_cd" name="btn_bk_buyer_cd" onClick="doWork('btn_bk_buyer_cd');" tabindex="-1"></button><!-- 					
					 --><input name="bk_buyer_nm" type="text" class="L_input" id="bk_buyer_nm" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){ConsigneePopup('bk');}"/>
					</td>
					<th><bean:message key="Estimate_Date"/></th>
					<td colspan="3">
					<input style="width:110px" type="text" name="bk_fm_est_out_dt" id="bk_fm_est_out_dt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.bk_to_est_out_dt);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
						
							  --><span class="dash">~</span><!--  
							  
							  --><input style="width:110px" type="text" name="bk_to_est_out_dt" id="bk_to_est_out_dt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.bk_fm_est_out_dt, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE12', form);"></button>
					</td>
				</tr>
			</tbody>
			</table>
		</div>
			
	<div class= "opus_design_grid" style="margin-bottom:8px;">
	<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>	
					<table>
						<colgroup>
							
								<col width="600" />
								<col width="600" />
								<col width="70" />
								<col width="130" />
								<col width="65" />
								<col width="130" />
						</colgroup>
						<tbody>
							<tr>
									<td colspan="4" align="center">
										<button type="button" class="btn_down_list" id="btn_down_bk" name="btn_down_bk" onClick="doWork('btn_down_bk');"></button><!-- 
									 --><button  type="button" class="btn_up_list" id="btn_up_bk" name="btn_up_bk" onClick="doWork('btn_up_bk');"></button>
									</td>
									<th>
										<button type="button" class="btn_normal" id="btn_complete_bk" name="btn_complete_bk" onClick="doWork('btn_complete_bk');" style="display:none;" btnAuth="COMPLETE" ><bean:message key="Complete"/></button>
									</th>
									<td>
								       <button type="button" class="btn_normal" id="btn_equpdate_bk" name="btn_equpdate_bk" onClick="doWork('btn_equpdate_bk');" style="display:none;" btnAuth="CNTR_TR_UPDATE"><bean:message key="CNTR_TR_Update"/></button> 			
									</td>	  
									<td>
										<span id="btn_show_nm_bk" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/icon_show.gif" style="cursor:hand" onClick="btn_show('bk','O')"></img></span><!-- 
										--><span id="btn_hide_nm_bk" style="display:block"><img src="<%=CLT_PATH%>/web/img/main/icon_hide.gif" style="cursor:hand" onClick="btn_show('bk','H')"></img></span>
									</td>
							</tr>				
 						</tbody>
 					</table>
				            		

	<div class="opus_design_inquiry sm" >				
				<table>
					<colgroup>
							<col width="100" />
	                        <col width="200" />
	                        <col width="100" />
	                        <col width="200" />
	                        <col width="100" />
	                        <col width="200" />
							<col width="100" />
							<col width="*" />
						</colgroup>
						<tr>
							<th><bean:message key="Complete_Date"/></th>
							<td>
								<input name="bk_outbound_dt" id="bk_outbound_dt" type="text" class="L_input" style="width:75px;" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" /><!-- 
								 --><button type="button" name="btn_bk_outbound_dt" id="btn_bk_outbound_dt" onClick="doWork('btn_bk_outbound_dt');" class="calendar ir" tabindex="-1">										
							</td>
	                        <th><bean:message key="Loading_Start_Finish"/></th>
							<td>
							    <input name="bk_load_hm_fr" id="bk_load_hm_fr" type="text" class="L_input" style="width:50px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.bk_load_hm_fr, form.bk_load_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 
							     --><input name="bk_load_hm_to" id="bk_load_hm_to" type="text" class="L_input" style="width:50px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.bk_load_hm_fr, form.bk_load_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/>
							</td>
							<th><bean:message key="Customs_Ref"/></th>
							<td>
							    <input name="bk_custms_ref_no" type="text" class="L_input" id="bk_custms_ref_no" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
							</td>
							<th><bean:message key="Remark"/></th>
							<td>
							    <input name="bk_rmk" type="text" class="L_input" id="bk_rmk" style="text-transform:uppercase;"/><!-- 
							     --><input name="bk_wh_cd_selected" id="bk_wh_cd_selected" type="hidden"/>
							</td>
						</tr>
					</table>
			</div>
		<div class= "opus_design_grid" style="margin-bottom:8px;">
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>

</div>
<!--     By Booking (E) -->

<!--     By Load Plan (S) -->
<div id="tabLayer" name="tabLayer" style="display:none">  
<div id="headLayer_lp" style="display:none">
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search_Lp" id="btn_Search_Lp" onClick="doWork('SEARCHLIST');" style="margin-right:0px;">Search</button><!-- 
			 --></div>
			 
	<div class= "opus_design_inquiry sm" >
				<table>
						<colgroup>
								<col width="100" />
								<col width="330" />
								<col width="100" />
		                        <col width="330" />
								<col width="100" />
								<col width="330" />
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Warehouse"/></th>
								<td>		
										<bean:define id="MsList" name="cdMap" property="warehouse"/>
											<select name="lp_wh_cd" id="lp_wh_cd" class="search_form" style="width: 263px;" required>
												<option value=''></option>
												<logic:iterate id="codeVO" name="MsList">
													<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
												</logic:iterate>
											</select>			
								</td>
								<th><bean:message key="Contract_Name"/></th>
									<td>
										<input name="lp_ctrt_no" id="lp_ctrt_no" type="text" class="L_input" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onChange="getCtrtInfo(this)"/><!-- 
										 --><button class="input_seach_btn" type="button" id="btn_lp_ctrt_no" name="btn_lp_ctrt_no" onClick="doWork('btn_lp_ctrt_no');"></button><!-- 						
										 --><input name="lp_ctrt_nm" id="lp_ctrt_nm" type="text" class="L_input" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup('bk');}"/>
									</td>
		                        <th><bean:message key="Booking_Type"/></th>
								<td>
									<select name="lp_ord_tp_cd" id="lp_ord_tp_cd" style="width:200px">
									</select>
								</td>
							</tr>
		                    <tr>
								<th>
									<select name="lp_search_tp" id="lp_search_tp" style="width:120px">
									</select>
								</th>
								<td colspan="3">
								<input name="lp_search_no" id = "lp_search_no" type="text" class="L_input" style="width:263px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
								<th><bean:message key="Booking_Date"/></th>
								<td>
								<input style="width:78px" type="text" name="lp_fm_bk_date" id="lp_fm_bk_date" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
								onblur="chkCmprPrd(firCalFlag, false, this, this, form.lp_to_bk_date);firCalFlag=false;" size="10" maxlength="10" class="search_form"><!-- 
						
							  --><span class="dash">~</span><!--  
							  
							  --><input style="width:78px" type="text" name="lp_to_bk_date" id="lp_to_bk_date" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.lp_fm_bk_date, this);firCalFlag=false;" size="10" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE13', form);"></button>

								</td>
							</tr>
							<tr>
								<th><bean:message key="Consignee"/></th>
								<td><input name="lp_buyer_cd" type="text" class="L_input" id="lp_buyer_cd" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getConsigneeInfo(this);" OnKeyDown="if(event.keyCode==13){getConsigneeInfo(this);}"/><!-- 	
								 --><button class="input_seach_btn" type="button" id="btn_lp_buyer_cd" name="btn_lp_buyer_cd" onClick="doWork('btn_lp_buyer_cd');"></button><!-- 					
								 --><input name="lp_buyer_nm" type="text" class="L_input" id="lp_buyer_nm" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){ConsigneePopup('bk');}"/>
								</td>
								<th><bean:message key="Load_Plan_Date"/></th>
								<td colspan="3">
								<input style="width:78px" type="text" name="lp_fm_plan_dt" id="lp_fm_plan_dt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
								onblur="chkCmprPrd(firCalFlag, false, this, this, form.lp_to_plan_dt);firCalFlag=false;" size="10" maxlength="10" class="search_form"><!-- 
						
							  --><span class="dash">~</span><!--  
							  
							  --><input style="width:78px" type="text" name="lp_to_plan_dt" id="lp_to_plan_dt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.lp_fm_plan_dt, this);firCalFlag=false;" size="10" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE14', form);"></button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
		<div class= "opus_design_grid" style="margin-bottom:8px;">
			<script type="text/javascript">comSheetObject('sheet3');</script>
		</div>
</div>							


					<table>
						<colgroup>
							
								<col width="600" />
								<col width="600" />
								<col width="70" />
								<col width="130" />
								<col width="65" />
								<col width="130" />
						</colgroup>
						<tbody>
							<tr>
									<td colspan="4" align="center">
										<button type = "button" class="btn_down_list" id="btn_down_lp" name="btn_down_lp" onClick="doWork('btn_down_lp');"></button><!-- 
									 --><button type = "button" class="btn_up_list" id="btn_up_lp" name="btn_up_lp" onClick="doWork('btn_up_lp');"></button>
									</td>
									<th>
										<button type = "button" class="btn_normal" id="btn_complete_lp" name="btn_complete_lp" onClick="doWork('btn_complete_lp');" style="display:none;" btnAuth="COMPLETE_LP"><span><bean:message key="Complete"/></span></button>
									</th>
									<td>
								       <button type = "button" class="btn_normal" id="btn_equpdate_lp" name="btn_equpdate_lp" onClick="doWork('btn_equpdate_lp');" style="display:none;" btnAuth="CNTR_TR_UPDATE_LP"><span><bean:message key="CNTR_TR_Update"/></span></button> 			
									</td>	  
									<td>
										<span id="btn_show_nm_lp" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/icon_show.gif" style="cursor:hand" onClick="btn_show('lp','O')"></img></span><!-- 
									 --><span id="btn_hide_nm_lp" style="display:block"><img src="<%=CLT_PATH%>/web/img/main/icon_hide.gif" style="cursor:hand" onClick="btn_show('lp','H')"></img></span>
									</td>
							</tr>				
 						</tbody>
 					</table>
							

	<div class="opus_design_inquiry sm">				
				<table>
					<colgroup>
							<col width="100" />
	                        <col width="200" />
	                        <col width="100" />
	                        <col width="200" />
	                        <col width="100" />
	                        <col width="200" />
							<col width="100" />
							<col width="*" />
						</colgroup>
						<tr>
							<th><bean:message key="Complete_Date"/></th>
							<td>
								<input name="lp_outbound_dt" id="lp_outbound_dt" type="text" class="L_input" style="width:75px;" dataformat="ymd" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" onclick = "OmsFunFocusDel(this)" onblur="chkCmprPrd(firCalFlag, false, this, this ,this );firCalFlag=false;" /><!-- 
								 --><button type="button" name="btn_lp_outbound_dt" id="btn_lp_outbound_dt" onClick="doWork('btn_lp_outbound_dt');" class="calendar ir" tabindex="-1">										
							</td>
	                        <th><bean:message key="Loading_Start_Finish"/></th>
							<td>
							    <input name="lp_load_hm_fr" id="lp_load_hm_fr" type="text" class="L_input" style="width:50px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.lp_load_hm_fr, form.lp_load_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 
							     --><input name="lp_load_hm_to" id="lp_load_hm_to" type="text" class="L_input" style="width:50px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.lp_load_hm_fr, form.lp_load_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/>
							</td>
							<th><bean:message key="Customs_Ref"/></th>
							<td>
							    <input name="lp_custms_ref_no" type="text" class="L_input" id="lp_custms_ref_no" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
							</td>
							<th><bean:message key="Remark"/></th>
							<td>
							    <input name="lp_rmk" type="text" class="L_input" id="lp_rmk" style="text-transform:uppercase;" /><!-- 
							     --><input name="lp_wh_cd_selected" id="lp_wh_cd_selected" type="hidden"/>
							</td>
						</tr>
					
					</table>
			</div>
		<div class= "opus_design_grid" style="margin-bottom:8px;">
			<script type="text/javascript">comSheetObject('sheet4');</script>
		</div>
	</div>
<!--     By Load Plan (E) -->
</div>
<!-- opus_design_inquiry(E) -->

</form>
<!-- <iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe> -->

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>