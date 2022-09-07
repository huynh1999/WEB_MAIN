
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ServiceOrderPopup.jsp
*@FileTitle  : Service Order
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/03/17
=========================================================--%>
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/ServiceOrderPopup.js?ver=<%=CLT_JS_VER%>"></script>
	
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String so_no = "";
	String main_ord_tp_lvl1_cd = "";
	String main_ord_tp_lvl2_cd = "";
	
	try {
		so_no = request.getParameter("so_no")== null?"":request.getParameter("so_no");
		main_ord_tp_lvl1_cd = request.getParameter("main_ord_tp_lvl1_cd")== null?"":request.getParameter("main_ord_tp_lvl1_cd");
		main_ord_tp_lvl2_cd = request.getParameter("main_ord_tp_lvl2_cd")== null?"":request.getParameter("main_ord_tp_lvl2_cd");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="ord_tp_lvl1_cd" name="cdMap" property="ord_tp_lvl1_cd"/>
	<bean:define id="ord_tp_lvl2_cd" name="cdMap" property="ord_tp_lvl2_cd"/>
	<bean:define id="pnl_svc_tp_cd" name="cdMap" property="pnl_svc_tp_cd"/>
	<script>
		var ord_tp_lvl1_cdText = '';
		var ord_tp_lvl1_cdCode = '';
		<!-- Freight Unit 단위 -->
			<% boolean isBegin_ord_tp_lvl1_cd = false; %>
            <logic:iterate id="codeVO" name="ord_tp_lvl1_cd">
                <% if(isBegin_ord_tp_lvl1_cd){ %>
                ord_tp_lvl1_cdText+= '|';
                ord_tp_lvl1_cdCode+= '|';
                <% }else{
                	isBegin_ord_tp_lvl1_cd = true;
                   } %>
                   ord_tp_lvl1_cdCode+= '<bean:write name="codeVO" property="code"/>';
                   ord_tp_lvl1_cdText+= '<bean:write name="codeVO" property="name"/>';
            </logic:iterate>
            
            var ord_tp_lvl2_cdText = '';
    		var ord_tp_lvl2_cdCode = '';
    		<!-- Freight Unit 단위 -->
    			<% boolean isBegin_ord_tp_lvl2_cd = false; %>
                <logic:iterate id="codeVO" name="ord_tp_lvl2_cd">
                    <% if(isBegin_ord_tp_lvl2_cd){ %>
                    ord_tp_lvl2_cdText+= '|';
                    ord_tp_lvl2_cdCode+= '|';
                    <% }else{
                    	isBegin_ord_tp_lvl2_cd = true;
                       } %>
                       ord_tp_lvl2_cdCode+= '<bean:write name="codeVO" property="code"/>';
                       ord_tp_lvl2_cdText+= '<bean:write name="codeVO" property="name"/>';
                </logic:iterate>
                
                var pnl_svc_tp_cdText = '';
        		var pnl_svc_tp_cdCode = '';
        		<!-- Freight Unit 단위 -->
        			<% boolean isBegin_pnl_svc_tp_cd = false; %>
                    <logic:iterate id="codeVO" name="pnl_svc_tp_cd">
                        <% if(isBegin_pnl_svc_tp_cd){ %>
                        ord_tp_lvl2_cdText+= '|';
                        ord_tp_lvl2_cdCode+= '|';
                        <% }else{
                        	isBegin_pnl_svc_tp_cd = true;
                           } %>
                           pnl_svc_tp_cdCode+= '<bean:write name="codeVO" property="code"/>';
                           pnl_svc_tp_cdText+= '<bean:write name="codeVO" property="name"/>';
                    </logic:iterate>
	</script>
	<script type="text/javascript">
	<%-- <%=JSPUtil.getIBCodeCombo("ord_tp_lvl1_cd", "", "L1", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("ord_tp_lvl2_cd", "", "L2", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("pnl_svc_tp_cd", "", "FG", "0", "")%> --%>
	</script>
	<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<form id="form" name="form">
<input type="hidden" name="f_cmd">
<input type="hidden" name="main_ord_tp_lvl1_cd" value="<%=main_ord_tp_lvl1_cd%>" >
<input type="hidden" name="main_ord_tp_lvl2_cd" value="<%=main_ord_tp_lvl2_cd%>" >
<input type="hidden" name="org_cd" value="KRSELLB" />
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="Service_Order"/></span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
		  --></div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
	</div>
<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
			    <colgroup>
                    <col width="12" />
                    <col width="50" />
                    <col width="50" />
                    <col width="50" />
                    <col width=50 />
                    <col width="*"/>
                </colgroup>
                <tbody>
                	<tr>
			        	<th><bean:message key="Service_Order_No"/></th>
						<td><input name="so_no" type="text" class="L_input" id="so_no" value="<%=so_no%>" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="15"/>
						</td>
			        	<th><bean:message key="Contract_No1"/></th>
			        	<td>
						<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:85px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10"/><!--
					 	--><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" class="input_seach_btn" tabindex="-1"></button><!-- 
			         	--><input name="ctrt_nm" id="ctrt_nm" type="text" dataformat="engup" otherchar = " ()-_" class="L_input_R" style="width:118px;" readonly/><!-- 
					 	--></td>
<!--  		        <th></th>
			        <td></td>			        
		        </tr>
                <tr>
			        <th>Order Category</th>
					<td>
						<script type="text/javascript">comComboObject('ord_tp_lvl1_cd', 1, 188, 1);</script>
					</td>
			        <th>Trans Mode</th>
			        <td>
			        	<script type="text/javascript">comComboObject('ord_tp_lvl2_cd', 1, 188, 1);</script>
			        </td>
-->			        
			        <th><bean:message key="Main_Service_Type"/></th>
			        	<td>
			        		<!-- <script type="text/javascript">ComComboObject('pnl_svc_tp_cd', 1, 215, 1);</script> -->
			        		<select name="pnl_svc_tp_cd" id="pnl_svc_tp_cd" class="search_form">
			        			<option value=''>All</option>
             					<logic:iterate id="codeVO" name="pnl_svc_tp_cd">
             						<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
             					</logic:iterate>
             				</select>
		            	</td>
		        	</tr>
                	<tr>
			        	<th><bean:message key="Main_Customer"/></th>
						<td colspan="3"> 
						<input name="ctrt_cust_cd" id="ctrt_cust_cd" type="text" class="L_input" style="width:60px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);searchTlCustInfo();" maxlength="10"/><!-- 
						 --><button type="button" name="btn_ctrt_cust_cd" id="btn_ctrt_cust_cd" onClick="doWork('btn_ctrt_cust_cd');" class="input_seach_btn" tabindex="-1"></button><!-- 
			        	 --><input name="ctrt_cust_nm" id="ctrt_cust_nm" type="text" class="L_input_R" style="width:122px;" readonly/><!-- 
						 --></td>
			       		<th></th>
			        	<td></td>
		        	</tr>

                	<tr>
			        	<th><bean:message key="Work_Order_No1"/></th>
						<td><input name="work_no" type="text" class="L_input" id="work_no" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20"/></td>
			        	<th><bean:message key="House_BL_No"/></th>
			        	<td><input name="hbl_no" type="text" class="L_input" id="hbl_no"  style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20"/></td>
			        	<th><bean:message key="Master_BL_No"/></th>
			        	<td><input name="mbl_no" type="text" class="L_input" id="mbl_no"  style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20" /></td>
		        	</tr>
			
                	<tr>
			        	<th><bean:message key="HAWB_No"/></th>
						<td><input name="hawb_no" type="text" class="L_input" id="hawb_no"  maxlength="20" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/></td>
			        	<th><bean:message key="MAWB_No1"/></th>
			        	<td><input name="mawb_no" type="text" class="L_input" id="mawb_no"  maxlength="20" style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/></td>
			        	<th><bean:message key="Performance_Date"/></th>
			        	<td>
							<input name="per_fr_dt" id="per_fr_dt"  type="text" class="L_input" style="width:71px;" dataformat="ymd" maxlength="10"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
							 --><span class="dash">~</span><!-- 
						 	--><input name="per_to_dt" id="per_to_dt" type="text" class="L_input" style="width:71px;" dataformat="ymd" maxlength="10" 
						 	onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
						 	--><button type="button" class="calendar ir" name="btn_per_to_dt" id="btn_per_to_dt" onClick="doWork('btn_per_to_dt');"></button><!-- 
		             	--></td>
		        	</tr>
                	<tr>
			        	<th><bean:message key="ETD"/></th>
						<td>
							<input name="etd_fr_dt" id="etd_fr_dt"  type="text" class="L_input" style="width:71px;" dataformat="ymd" maxlength="10"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
						 	--><span class="dash">~</span><!-- 
						 	--><input name="etd_to_dt" id="etd_to_dt" type="text" class="L_input" style="width:71px;" dataformat="ymd" maxlength="10"
						 	onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
						 	--><button type="button" class="calendar ir" name="btn_etd_to_dt" id="btn_etd_to_dt" onClick="doWork('btn_etd_to_dt');"></button><!-- 
					 	--></td>
			        	<th><bean:message key="ETA"/></th>
			        	<td>
							<input name="eta_from_dt" id="eta_from_dt"  type="text" class="L_input" style="width:71px;" dataformat="ymd" maxlength="10"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
						 	--><span class="dash">~</span><!-- 
						 	--><input name="eta_to_dt" id="eta_to_dt"  type="text" class="L_input" style="width:71px;" dataformat="ymd" maxlength="10"
						 	onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
						 	--><button type="button" class="calendar ir" name="btn_eta_to_dt" id="btn_eta_to_dt" onClick="doWork('btn_eta_to_dt');"></button><!-- 
			         	--></td>
			        	<th><bean:message key="Service_Order_Create_Date"/></th>
			        	<td>
							<input name="rgst_sys_fr_dt" id="rgst_sys_fr_dt"  type="text" class="L_input" style="width:71px;" dataformat="ymd" maxlength="10"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
						 	--><span class="dash">~</span><!-- 
						 	--><input name="rgst_sys_to_dt" id="rgst_sys_to_dt"  type="text" class="L_input" style="width:71px;" dataformat="ymd" maxlength="10" 
						 	onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
						 	--><button type="button" class="calendar ir" name="btn_rgst_sys_to_dt" id="btn_rgst_sys_to_dt"  onClick="doWork('btn_rgst_sys_to_dt');"></button><!-- 
		             	--></td>
		        	</tr>
		        </tbody>
			</table>
	</div>
	</div>
	<!-- opus_design_inquiry(E) -->
	<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
