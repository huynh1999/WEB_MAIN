<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : TransloadingMgmt.jsp
*@FileTitle  : Transloading Management
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/07/21
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
    <script type="text/javascript" src="./apps/fis/wms/transloading/script/TransloadingMgmt.js?ver=<%=CLT_JS_VER%>"></script>  
<%
	String form_mode 		= "";
	try {
		form_mode  	= request.getParameter("form_mode")== null?"":request.getParameter("form_mode");
	}catch(Exception e) {
		out.println(e.toString());
	}


%>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="trans_tp_cd" name="cdMap" property="trans_tp_cd"/>
	<bean:define id="trade_tp_cd" name="cdMap" property="trade_tp_cd"/>
	<bean:define id="fwd_tp_cd" name="cdMap" property="fwd_tp_cd"/>
	<bean:define id="fr_node_tp_cd" name="cdMap" property="fr_node_tp_cd"/>
	<bean:define id="to_node_tp_cd" name="cdMap" property="to_node_tp_cd"/>
	<bean:define id="trucker_tp_cd" name="cdMap" property="trucker_tp_cd"/>
	
	<bean:define id="GRP1" name="cdMap" property="GRP1"/>
	<bean:define id="GRP2" name="cdMap" property="GRP2"/>
	<bean:define id="GRP3" name="cdMap" property="GRP3"/>
	<bean:define id="GRP4" name="cdMap" property="GRP4"/>
	
	<bean:define id="tlo_sts_cd" name="cdMap" property="tlo_sts_cd"/>
	<bean:define id="bkg_sts_cd" name="cdMap" property="bkg_sts_cd"/>
	
	<script language="javascript" type="text/javascript">
	
	var GRP1_CD = "";
	var GRP1_NM = "";
	
	var GRP2_CD = "";
	var GRP2_NM = "";
	
	var GRP3_CD = "";
	var GRP3_NM = "";
	
	var GRP4_CD = "";
	var GRP4_NM = "";
	
	<!-- GRP1 -->
	<% boolean isBegin_GRP1 = false; %>
    <logic:iterate id="codeVO" name="GRP1">
        <% if(isBegin_GRP1){ %>
        GRP1_NM+= '|';
        GRP1_CD+= '|';
        <% }else{
        	isBegin_GRP1 = true;
           } %>
           GRP1_CD+= '<bean:write name="codeVO" property="code"/>' + '|';
           GRP1_NM+= '<bean:write name="codeVO" property="name"/>' + '|';
    </logic:iterate>
    
    <!-- GRP2 -->
	<% boolean isBegin_GRP2 = false; %>
    <logic:iterate id="codeVO" name="GRP2">
        <% if(isBegin_GRP2){ %>
        GRP2_NM+= '|';
        GRP2_CD+= '|';
        <% }else{
        	isBegin_GRP2 = true;
           } %>
           GRP2_CD+= '<bean:write name="codeVO" property="code"/>' + '|';
           GRP2_NM+= '<bean:write name="codeVO" property="name"/>' + '|';
    </logic:iterate>
    
    <!-- GRP3 -->
	<% boolean isBegin_GRP3 = false; %>
    <logic:iterate id="codeVO" name="GRP3">
        <% if(isBegin_GRP3){ %>
        GRP3_NM+= '|';
        GRP3_CD+= '|';
        <% }else{
        	isBegin_GRP3 = true;
           } %>
           GRP3_CD+= '<bean:write name="codeVO" property="code"/>' + '|';
           GRP3_NM+= '<bean:write name="codeVO" property="name"/>' + '|';
    </logic:iterate>
    
    <!-- GRP4 -->
	<% boolean isBegin_GRP4 = false; %>
    <logic:iterate id="codeVO" name="GRP4">
        <% if(isBegin_GRP3){ %>
        GRP4_NM+= '|';
        GRP4_CD+= '|';
        <% }else{
        	isBegin_GRP4 = true;
           } %>
           GRP4_CD+= '<bean:write name="codeVO" property="code"/>' + '|';
           GRP4_NM+= '<bean:write name="codeVO" property="name"/>' + '|';
    </logic:iterate>
	
	</script>  
	
	<script type="text/javascript">
		function setupPage(){
			var errMessage = "";
			if (errMessage.length >= 1) {
				ComShowMessage(errMessage);
			} // end if
			loadPage(true);
		}
	</script>

<form id="form" name="form">

<input type="hidden" id="f_cmd" value="0"/>
<input type="hidden" name="out_cnt" value="0" /> 
<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
<input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<button type="button"><span id="title">Transloading Management</span></button>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_search" id="btn_search">Search</button><!-- 
		 --><button type="button" class="btn_normal" name="btn_print" id="btn_print">Print</button><!-- 
		 --><button type="button" class="btn_normal" name="btn_excel" id="btn_excel">Excel</button><!-- 
	 --></div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span id='navigation'></span>
		</div>
	<!-- page_location(E) -->
</div>

<div class= "wrap_search">
<div class="opus_design_inquiry sm">
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
		<colgroup>
			<col width="50" />
			<col width="150" />
			<col width="150" />
	        <col width="150" />
			<col width="150" />
			<col width="*" />
		</colgroup>			
		<tbody>
			<tr>
				<th>Warehouse</th>
				<td>
					<input name="wh_cd" type="text" class="L_input" id="wh_cd" style="width:85px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocInfo(this);" OnKeyDown="if(event.keyCode==13){getLocInfo(this);}" onChange="getLocInfo(this)" required/><!-- 						
					 --><button type="button" name="btn_wh_cd" id="btn_wh_cd"class="input_seach_btn" tabindex="-1"></button><!-- 
					 --><input name="wh_nm" type="text" class="L_input" id="wh_nm" style="width:103px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){locationPopup();}" required/>
				</td>
				<th>Contract No</th>
				<td>
					<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:85px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onChange="getCtrtInfo(this)"/><!-- 
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1"></button><!-- 						
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:103px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
				</td>
                <th>
	                <select name="sts_opt" style="width:115px" onChange="setStatus();">
	                	<option value="TL">T/L Status</option>
	                	<option value="BK">Booking Status</option>
	                </select>
                </th>
				<td>
					<span id="tlo_span">
						<select name="tlo_sts_cd" id="tlo_sts_cd" class="search_form" style="width:204px">
	        				<option value='ALL'>ALL</option>
	         				<logic:iterate id="codeVO" name="tlo_sts_cd">
	         					<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
	         				</logic:iterate>
        				</select>
					</span>	
					<span id="bkg_span" style="display:none">
						<select name="bkg_sts_cd" id="bkg_sts_cd" class="search_form" style="width:204px">
	        				<option value='ALL'>ALL</option>
	         				<logic:iterate id="codeVO" name="bkg_sts_cd">
	         					<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
	         				</logic:iterate>
        				</select>
					</span>						
				</td>
			</tr>				
		    <tr>
				<th>Trans Type</th>
				<td>
					<select name="trans_tp_cd" id="trans_tp_cd" class="search_form" style="width: 221px;">
        				<option value='ALL'>ALL</option>
         				<logic:iterate id="codeVO" name="trans_tp_cd">
         					<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
         				</logic:iterate>
        			</select>
				</td>
				<th>
					<select name="no_opt" style="width:115px">
		               	<option value="TL">T/L No.</option>
		               	<option value="CS">Customer Order No.</option>
		               	<option value="DO">D/O No.</option>
	                </select>
				</th>
				<td>
					<input name="tlo_no" type="text" class="L_input" id="tlo_no"  style="width:221px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20"/>
				</td>
				<th>
					<select name="dt_opt" style="width:115px">
		               	<option value="TL">T/L Order Date</option>
		               	<option value="AC">Act. Date</option>
		               	<option value="ES">Est. Date</option>
	                </select>
				</th>
				<td>
				    <input name="ord_dt_fm" id="ord_dt_fm" type="text" class="L_input"  maxlength="10" style="width:80px;" 
				    onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><span class="dash">~</span><!-- 
					 --><input name="ord_dt_to" id="ord_dt_to" type="text" class="L_input"  maxlength="10" style="width:80px;" 
					 onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
					 --><button type="button" class="calendar ir" name="btn_ord_dt" id="btn_ord_dt" ></button>
				</td>
			</tr>
		    <tr>
				<th>Service Provider</th>
				<td>
					<input name="trucker_cd" type="text" class="L_input" id="trucker_cd" style="width:85px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/><!-- 
					 --><button type="button" name="btn_trucker_cd" id="btn_trucker_cd"class="input_seach_btn" tabindex="-1"></button><!-- 
					 --><input name="trucker_nm" type="text" class="L_input" id="trucker_nm" style="width:103px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
				</td>
				<th>
					<select name="trk_opt" style="width:115px">
		                     	<option value="TK">Truck No.</option>
		                     	<option value="TA">Trailer No.</option>
		                     </select>
				</th>
				<td>
					<input name="truck_no" type="text" class="L_input" id="truck_no" style="width:221px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="14"/>
				</td>
				<th>
					<select name="cntr_opt" style="width:115px">
		                     	<option value="CN">Container No.</option>
		                     	<option value="SE">Seal No.</option>
		                     	<option value="LO">Load ID</option>
		                     </select></th>
				<td>
					<input name="cntr_no" id="cntr_no" type="text" class="L_input" style="width:204px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"  maxlength="100" />
				</td>
			</tr>	
			<tr>
				<th>Node</th>
				<td>
					<input name="node_loc_cd" type="text" class="L_input" id="node_loc_cd" style="width:85px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/><!-- 
					 --><button type="button" name="btn_node_loc_cd" id="btn_node_loc_cd"class="input_seach_btn" tabindex="-1"></button><!-- 						
					 --><input name="node_loc_nm" type="text" class="L_input" id="node_loc_nm" style="width:103px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
				</td>
				<th>M B/L</th>
				<td>
					<input name="mbl_no" type="text" class="L_input" id="mbl_no" style="width:221px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="14"/>
				</td>
				<th></th>
			</tr>	
		</tbody>				
	</table>
</div>
</div>

<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
	<div class="opus_design_grid clear">
	<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" name="btn_Create" id="btn_Create">Create</button><!-- 
			 --><button type="button" class="btn_normal" name="btn_BLLoad" id="btn_BLLoad">B/L Load</button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Save" id="btn_Save">Save</button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Delete" id="btn_Delete">Delete</button><!-- 
		 	 --><button type="button" class="btn_normal" name="btn_Dispatch" id="btn_Dispatch">Dispatch</button><!-- 
			 --><button type="button" class="btn_normal" name="btn_DCancel" id="btn_DCancel">D.Cancel</button><!-- 
			 --><button type="button" class="btn_normal" name="btn_BKGComplete" id="btn_BKGComplete">BKG Complete</button><!-- 
			 --><button type="button" class="btn_normal" name="btn_BKGCancel" id="btn_BKGCancel">BKG Cancel</button><!-- 
			 --><button type="button" class="btn_normal" name="btn_TLComplete" id="btn_TLComplete">T/L Complete</button><!-- 
			 --><button type="button" class="btn_normal" name="btn_TLCancel" id="btn_TLCancel">T/L Cancel</button><!-- 
		 --></div>
	<!-- opus_design_btn(E) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>
<!-- <iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe> -->