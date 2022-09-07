<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInbkMgmt.jsp
*@FileTitle  : Inbound Booking Management
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================--*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	   <title><bean:message key="system.title"/></title>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whinbooking/script/WHInbkMgmt.js?ver=<%=CLT_JS_VER%>"></script>
     <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>

     <bean:define id="currCdList" name="cdMap" property="currCdList"/>
	<bean:define id="UNITCD" name="cdMap" property="UNITCD"/>
	
	<script type="text/javascript">
	
	var currCdListText = "";
	var currCdListCode = "";
	
	'<logic:notEmpty name="currCdList">'
		'<logic:iterate id="item" name="currCdList">'
			currCdListCode+="|"+'<bean:write name="item" property="cd_val"/>';
			currCdListText+="|"+'<bean:write name="item" property="cd_nm"/>';
		'</logic:iterate>'
		
		currCdListCode = currCdListCode.substring(1);
		currCdListText = currCdListText.substring(1);
	'</logic:notEmpty>'
	
	var UNITCDText = "";
	var UNITCDCode = "";
	
	'<logic:notEmpty name="UNITCD">'
		'<logic:iterate id="item" name="UNITCD">'
			UNITCDCode+="|"+'<bean:write name="item" property="cd_val"/>';
			UNITCDText+="|"+'<bean:write name="item" property="cd_nm"/>';
		'</logic:iterate>'
		
		UNITCDCode = UNITCDCode.substring(1);
		UNITCDText = UNITCDText.substring(1);
	'</logic:notEmpty>'
	
	</script>
<%
	String fwd_bk_no = "";

	try {
		fwd_bk_no = request.getParameter("fwd_bk_no") == null ? "" : request.getParameter("fwd_bk_no");
	} catch (Exception e) {
		out.println(e.toString());
	}
	String uploadfile = "";

	try {
		uploadfile = request.getParameter("uploadfile") == null ? "" : request.getParameter("uploadfile");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>
<script type="text/javascript">
   <%-- 	<%=JSPUtil.getIBCodeCombo("fwd_dir"   , "", "WBD", "0", "")%>
   	<%=JSPUtil.getIBCodeCombo("bk_sts_cd" , "", "WBS", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("order_rel" , "", "WB1", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("wb_src_cd" , "", "WB2", "0", "")%>
   	<%=JSPUtil.getIBCodeCombo("ord_tp_cd" , "", "WB3", "0", "")%>   	
   	<%=JSPUtil.getIBCodeCombo("load_tp_cd", "", "WB4", "0", "")%>	 --%>
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

<form id="form" name="form" method="POST" action="./WHInbkMgmt.clt" enctype="multipart/form-data">
 <input type="hidden" name="form_mode" value="NEW" />
 <input type="hidden" id="f_cmd" value="0"/>
 <input type="hidden" name="curr_date" value=""/>
 <input type="hidden" name="uploadfile" value="<%=uploadfile%>"/>
 <input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
 <input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
 <input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
 <input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" /> 
 <input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
 <input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" />
 <input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
 <input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" />
 <input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" />
 <input type="hidden" name="bk_mode" value="R" />
 
 <input type="hidden" name="svc_tp_cd" value="WB" />
 <input type="hidden" name="doc_ref_tp_cd" value="WIB" />
 <input type="hidden" name="doc_tp_cd" value="WIB" />
 <input type="hidden" name="doc_ref_no" value="" />
 <input type="hidden" name="doc_ref_no2" value="" />
 
 <input type="hidden" name="in_sts_cd" value="" /> 
 <input type="hidden" name="unload_sht_cnt" value="" /> 
 
 <input type="hidden" name="old_fwd_dir" value=""/>
 <input type="hidden" name="temp_owner_cd"/>
 <input type="hidden" name="old_ctrt_no"/>
<bean:define id="MsList" name="cdMap" property="wb_src_cd"/>
<select name="wb_src_cd" id="wb_src_cd" class="search_form" style="display: none;">
	<logic:iterate id="codeVO" name="MsList">
		<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
	</logic:iterate>
</select>
 
 <div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btnCopy" id="btnCopy" onClick="doWork('COPY');" style="display:none;" btnAuth="COPY"><bean:message key="Copy"/></button><!--
		 --><button type="button" class="btn_normal" name="btn_reinstate" id="btn_reinstate" onClick="doWork('btn_reinstate');" style="display:none;" btnAuth="REINSTATE"><bean:message key="Reinstate"/></button><!--
		 --><button type="button" class="btn_normal" name="btn_new" id="btn_new" onClick="doWork('NEW');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button><!--
		 --><button type="button" class="btn_normal" name="btn_cancel" id="btn_cancel" onClick="doWork('btn_cancel');" style="display:none;" btnAuth="CANCEL"><bean:message key="Cancel"/></button><!-- 
		 --><button type="button" class="btn_normal" id="lnk_cargo" name="lnk_cargo" onClick="doWork('lnk_cargo');" style="display:none;" btnAuth="INBOUND_COMPLETE"><bean:message key="Inbound_Complete"/></button><!--
   		--><button type="button" class="btn_normal" id="lnk_print" name="lnk_print" onClick="doWork('lnk_print');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Print"/></button><!--
	 	--> --%>
	 </div>
	<!-- opus_design_btn(E) -->
	<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
</div>
<div class="over_wrap" height="100%">
<div class= "wrap_search_tab">
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="80" />
				<col width="*"/>
			</colgroup>
			<tbody>
				<tr>					
					<th><bean:message key="Booking_No"/></th>
					<td><input name="c_wib_bk_no" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20" value="<%=fwd_bk_no%>" /></td>
				</tr>
			</tbody>	
		</table>
	</div>
</div>
<div class= "wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Header"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Booking_Item"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Doc_Detail"/></span></a></li>
        <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Attachment"/></span></a></li>
    </ul>
    <!-- Tab1  -->
    <div id="tabLayer" name="tabLayer" style="display:inline">  
		<div class= "opus_design_inquiry">
			<table>
				<colgroup>
					<col width="80" />
					<col width="250" />
					<col width="190" />
					<col width="250" />
					<col width="200" />
					<col width="*" />
                </colgroup>
                <tbody>
                	<tr>
						<th><bean:message key="Booking_No"/></th>
						<td>
							<input name="wib_bk_no" type="text" class="L_input_R" tabindex="-1" readonly />
						</td>
						<th><bean:message key="Warehouse"/></th>
						<td>
							<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="warehouse" id="warehouse" class="search_form" onchange="check_authority_wh();" style="width: 190px;" required>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>						
						</td>
						<th><bean:message key="Booking_Date"/></th>
						<td>
							<input name="bk_date" type="text" class="L_input" style="width:119px;"  maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" 
							onkeypress="onlyNumberCheck();" 
							onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" /><!-- 
							 --><button type="button" class="calendar ir" name="btn_bk_date" id="btn_bk_date" onClick="on_btn_dt('bk_date');" ></button>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Order_Type"/></th>
						<td>
							<input name="ord_tp_cd_hidden" id="ord_tp_cd_hidden" type="hidden" class="L_input" style="width:75px;"/>
							<!-- <script language="javascript">ComComboObject('ord_tp_cd', 1, 207, 1, 1);</script> -->
							<bean:define id="MsList" name="cdMap" property="ord_tp_cd"/>
								<select name="ord_tp_cd" id="ord_tp_cd" class="search_form" required>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
									</logic:iterate>
								</select>
						</td>
						<th><bean:message key="Booking_Status"/></th>
						<td>
							<input name="bk_sts_cd_hidden" id="bk_sts_cd_hidden" type="hidden" class="L_input" style="width:75px;"/>
							<!-- <script language="javascript">ComComboObject('bk_sts_cd', 1, 150, 1);</script> -->
							<bean:define id="MsList" name="cdMap" property="bk_sts_cd"/>
								<select name="bk_sts_cd" id="bk_sts_cd" class="search_form">
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
									</logic:iterate>
								</select>
							<input name="issue" id="issue" type="checkbox" /><label for="issue"><bean:message key="Issue"/></label>
						</td>
						<th><bean:message key="Estimated_In_Date"/></th>
						<td>
							<input name="est_in_dt" type="text" class="L_input" style="width:119px;" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" 
							onkeypress="onlyNumberCheck();" 
							onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"
							 required/><!-- 
							 --><button type="button" class="calendar ir" name="btn_est_in_dt" id="btn_est_in_dt" onClick="on_btn_dt('est_in_dt');" ></button>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Loading_Type"/></th>
						<td>
							<input name="load_tp_cd_hidden" id="load_tp_cd_hidden" type="hidden" class="L_input" style="width:75px;"/>
							<!-- <script language="javascript">ComComboObject('load_tp_cd', 1, 207, 1);</script> -->
							<bean:define id="MsList" name="cdMap" property="load_tp_cd"/>
								<select name="load_tp_cd" id="load_tp_cd" class="search_form">
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
									</logic:iterate>
								</select>
						</td>
						<th><bean:message key="Forwarding_Direction"/></th>
						<td>
							<input name="fwd_dir_hidden" id="fwd_dir_hidden" type="hidden" class="L_input" style="width:75px;"/>
							<!-- <script language="javascript">ComComboObject('fwd_dir', 1, 209, 1, 1);</script> -->
							<bean:define id="MsList" name="cdMap" property="fwd_dir"/>
								<select name="fwd_dir" id="fwd_dir" class="search_form" onchange="fwd_dir_OnChange();" required>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
									</logic:iterate>
								</select>
						</td>
						<th><bean:message key="Order_Relation"/></th>
						<td>
							<input name="order_rel_hidden" id="order_rel_hidden" type="hidden" class="L_input" style="width:75px;"/>
							<!-- <script language="javascript">ComComboObject('order_rel', 1, 200, 1);</script> -->
							<bean:define id="MsList" name="cdMap" property="order_rel"/>
								<select name="order_rel" id="order_rel" class="search_form">
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
									</logic:iterate>
								</select>
						</td>
					</tr>
					<tr><td colspan="6"><p class="line_bluedot"></p></td></tr>
					
					<tr>
						<th><a href="javascript:btn_link_ctrt();" id="btn_link_ctrt"><span class="point_B"><bean:message key="Contract_No"/></span></a></th>
						<td>
							<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:178px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);" maxlength="10" required value=""/><!-- 
							 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="on_btn_ctrt_no()" ></button>
						</td>
						<!-- <th><a href="javascript:btn_link_rpt();" id="btn_link_rpt"><span class="point_B"><bean:message key="Route_Plan_No"/></span></a></th>
						<td>
							<input name="rtp_no" type="text" class="L_input_R"  maxlength="20" tabindex="-1" readonly style="width:209px;"/>
						</td> -->
						<!-- <th><a href="javascript:btn_link_so();" id="btn_link_so"><span class="point_B"><bean:message key="Service_Order_No"/></span></a></th>
						<td>
						<input name="so_no" type="text" class="L_input_R"  maxlength="15"   tabindex="-1" readonly style="width:200px;"/>
						</td> -->
						<th><bean:message key="Contract_Name"/></th>
						<td>
							<input name="ctrt_nm" type="text" dataformat="engup" otherchar = " ()-_" class="L_input_R"  tabindex="-1" readonly style="width:178px;"/>
						</td>
						
						<th><bean:message key="Sales_Office_Person"/></th>
						<td>
							<input name="sales_ofc_cd" type="text" class="L_input_R" style="width:70px;"  tabindex="-1" readonly /><!--  
							 --><input name="bk_stff_nm" type="text" class="L_input_R" style="width:126px;"  tabindex="-1" readonly />
							<input name="sales_pic_nm" type="hidden" class="L_input_R" />
						</td>
					</tr>
					<tr>
						<!-- <th><bean:message key="Main_Service_Type"/></th>
						<td>
							<input name="main_svc_type" type="hidden" class="L_input_R"  tabindex="-1" readonly />
							<input name="main_svc_nm" type="text" class="L_input_R"  tabindex="-1" readonly style="width:209px;"/>
						</td> -->
					</tr>
					<tr><td colspan="6"><p class="line_bluedot"></p></td></tr>
					
					<tr>
						<th rowspan="6"><bean:message key="Owner"/></th>
						<td><input type="hidden" name="owner_cd" type="text" class="L_input" style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="10">
							<input name="owner_nm" type="text" class="L_input" style="width:235px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){on_enter_customer('owner_cd', this.value);}" dataformat="excepthan" maxlength="500" required /><!-- 
							 --><button type="button" name="btn_owner_cd" id="btn_owner_cd" class="input_seach_btn" tabindex="-1" onclick="on_btn_customer('owner_cd')"></button>
							<!-- <p style="padding-top:2px;"></p>
							<input name="owner_addr1" type="text" class="L_input" maxlength="50" style="width:178px;" />
							<p style="padding-top:2px;"></p>
							<input name="owner_addr2" type="text" class="L_input" maxlength="50" style="width:178px;" />
							<p style="padding-top:2px;"></p>
							<input name="owner_addr3" type="text" class="L_input" maxlength="50" style="width:178px;" />
							<p style="padding-top:2px;"></p>
							<input name="owner_addr4" type="text" class="L_input" maxlength="50" style="width:178px;" />
							<p style="padding-top:2px;"></p>
							<input name="owner_addr5" type="text" class="L_input" maxlength="50" style="width:178px;" /> -->
							<p style="padding-top:2px;"></p>
							<textarea name="owner_addr1" id="owner_addr1" class="L_textarea" maxlength="1000" style="width:264px;height:100px; ime-mode:disabled; text-transform:uppercase;resize:none;" onblur="strToUpper(this);"></textarea>
						</td>
						<!-- th rowspan="6"><span id="show_shipper" style="display:none;">Shipper<img src="<%=CLT_PATH%>/web/images/common/icon_star.gif"></span><span id="hide_shipper">Shipper</span></th -->
						<th rowspan="6"><bean:message key="Vendor"/><br />(<bean:message key="Shipper"/>)</th>
						<td><input type="hidden" name="supp_cd" type="text" class="L_input" style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="10">
							<input name="supp_nm" type="text" class="L_input" style="width:235px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){on_enter_customer('supp_cd', this.value);}" dataformat="excepthan" maxlength="500" value="" /><!-- 
							 --><button type="button" name="btn_supp_cd" id="btn_supp_cd" class="input_seach_btn" tabindex="-1" onclick="on_btn_customer('supp_cd')"></button>
							<!-- <p style="padding-top:2px;"></p>
							<input name="supp_addr1" type="text" class="L_input"  maxlength="50" style="width:209px;"/>
							<p style="padding-top:2px;"></p>
							<input name="supp_addr2" type="text" class="L_input" maxlength="50" style="width:209px;"/>
							<p style="padding-top:2px;"></p>
							<input name="supp_addr3" type="text" class="L_input" maxlength="50" style="width:209px;"/>
							<p style="padding-top:2px;"></p>
							<input name="supp_addr4" type="text" class="L_input" maxlength="50" style="width:209px;"/>
							<p style="padding-top:2px;"></p>
							<input name="supp_addr5" type="text" class="L_input" maxlength="50" style="width:209px;"/> -->
							<p style="padding-top:2px;"></p>
							<textarea name="supp_addr1" id="supp_addr1" class="L_textarea" maxlength="1000" style="width:264px;height:100px; ime-mode:disabled; text-transform:uppercase;resize:none;" onblur="strToUpper(this);"></textarea>
						</td>
						<!-- th rowspan="6"><span id="show_consignee" style="display:none;">Consignee<img src="<%=CLT_PATH%>/web/images/common/icon_star.gif"></span><span id="hide_consignee">Consignee</span></th -->
						<th rowspan="6"><bean:message key="Consignee"/></th>
						<td><input type="hidden" name="buyer_cd" type="text" class="L_input" style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="10">
							<input name="buyer_nm" type="text" class="L_input" style="width:235px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){on_enter_customer('buyer_cd', this.value);}" dataformat="excepthan" maxlength="500"  /><!-- 
							 --><button type="button" name="btn_buyer_cd" id="btn_buyer_cd" class="input_seach_btn" tabindex="-1" onclick="on_btn_customer('buyer_cd')"></button>
							<!-- <p style="padding-top:2px;"></p>
							<input name="buyer_addr1" type="text" class="L_input" maxlength="50" style="width:200px;"/>
							<p style="padding-top:2px;"></p>
							<input name="buyer_addr2" type="text" class="L_input" maxlength="50" style="width:200px;"/>
							<p style="padding-top:2px;"></p>
							<input name="buyer_addr3" type="text" class="L_input" maxlength="50" style="width:200px;"/>
							<p style="padding-top:2px;"></p>
							<input name="buyer_addr4" type="text" class="L_input" maxlength="50" style="width:200px;"/>
							<p style="padding-top:2px;"></p>
							<input name="buyer_addr5" type="text" class="L_input" maxlength="50" style="width:200px;"/> -->
							<p style="padding-top:2px;"></p>
							<textarea name="buyer_addr1" id="buyer_addr1" class="L_textarea" maxlength="1000" style="width:264px;height:100px; ime-mode:disabled; text-transform:uppercase;resize:none;" onblur="strToUpper(this);"></textarea>
						</td>
					</tr>
					<tr></tr>
					<tr></tr>
					<tr></tr>
					<tr></tr>
					<tr></tr>
					<tr><td colspan="6"><p class="line_bluedot"></p></td></tr>
					
					<tr>
						<th><bean:message key="Cust_Order_No"/></th>
						<td>
							<input name="cust_ord_no" type="text" class="L_input" maxlength="100" style="width:178px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);"/>
						</td>
						<th><bean:message key="Commercial_Invoice_No"/></th>
						<td>
								<input name="commc_inv_no" type="text" class="L_input" maxlength="30" style="width:210px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
						</td>
						<th><bean:message key="Delivery_Order_No"/></th>
						<td>
							<input name="dlv_ord_no" type="text" class="L_input" maxlength="30" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Unloading_Sheet"/></th>
						<td>
				            <button type="button" class="btn_etc"  onClick="btn_uploading_sheet();" id="btn_create_uploading_sheet" name="btn_create_uploading_sheet"><bean:message key="Create"/></button><!-- 						
							 --><img src="<%=CLT_PATH%>/web/img/main/icon_doc.gif" style="cursor:hand;" name="btn_document_uploading_sheet" id="btn_document_uploading_sheet" onclick="btn_uploading_sheet2()" />
						</td>
						<!-- <th><bean:message key="Creation_Type"/></th>
						<td>
							<input name="src_tp_cd" type="text" class="L_input_R"  tabindex="-1" readonly style="width:209px;"/>
						</td> -->
						<th><bean:message key="Reference_No"/></th>
                        <td>
                            <input name="ref_no" type="text" class="L_input" maxlength="20" style="width:210px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
                        </td>
						<!-- <th>HJL Job No</th> 
						<td colspan="2">
							<input name="job_no" type="hidden" class="L_input"  maxlength="30" />
						</td>-->
						
					</tr>
					
					<tr>
						<th><span id="show_remark" style="display:none;"><bean:message key="Reason_for_ADJ"/><img src="<%=CLT_PATH%>/web/img/main/icon_star.gif"></span><span id="hide_remark"><bean:message key="Remark"/></span></th>
						<td colspan="5">
							<textarea name="rmk" id="rmk"  style="text-transform:none;" class="L_textarea"  maxlength="1000" onBlur="rmk_len_chk();"></textarea>&nbsp;
						</td>
					</tr>
                </tbody>
			</table>
		</div>
		
		<div style="padding:5px 0 5px 0;">
			<center><span id="btn_show_nm"><img src="<%=CLT_PATH%>/web/img/main/04_icon_show.gif" style="cursor:hand" onClick="btn_show_shipping(true);"></img></span><!-- 
			 --><span id="btn_hide_nm" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/04_icon_hide.gif" style="cursor:hand" onClick="btn_show_shipping(false);"></img></span></center>
		</div>
		
		<div style="margin-bottom:8px; display:none;"  id="show_shipping">
		<!-- layout_wrap(S) -->
		<div class="layout_wrap" >
		    <div class="layout_vertical_2" style="width:60%">
		    
		   	<div class= "opus_design_inquiry">
			<table>
				<colgroup>
					<col width="115" />
					<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Vessel_Voyage"/></th>
						<td colspan="3">
							<input name="vsl_cd" id="vsl_cd" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);vslCdSearch(this);" maxlength="10"/><!-- 
							 --><button type="button" name="btn_vsl_cd" id="btn_vsl_cd" class="input_seach_btn" tabindex="-1" onclick="on_btn_vsl()"  ></button><!-- 
							 --><input name="vsl_nm" type="text" class="L_input" style="width:140px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"  maxlength="140" readonly="readonly" /><!-- 
							 --><input name="voy" type="text" class="L_input" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="11" />
						</td>
					</tr>
				</tbody>
				</table>
			 	</div>
		        <!-- layout_wrap(S) -->
				<div class="layout_wrap">
				    <div class="layout_vertical_2">
				        <table>
							<colgroup>
								<col width="120" />
								<col width="*" />
							</colgroup>
							<tbody>
								<tr>
									<th><bean:message key="House_BL_No"/></th>
									<td>
										 <!-- opus_design_grid(S) -->
										 <div class="opus_design_grid">
								            <script type="text/javascript">comSheetObject('sheet1');</script>
								         </div>
								         <!-- opus_design_grid(E) -->
									</td>
								</tr>
								<tr></tr>
							</tbody>
						</table>
				    </div>
				    <div class="layout_vertical_2">
				        <table>
							<colgroup>
								<col width="120" />
								<col width="*" />
							</colgroup>
							<tbody>
								<tr>
									<th><bean:message key="Master_BL_No"/></th>
									<td>
										 <!-- opus_design_grid(S) -->
										 <div class="opus_design_grid">
								            <script type="text/javascript">comSheetObject('sheet2');</script>
								         </div>
								         <!-- opus_design_grid(E) -->
									</td>
								</tr>
								<tr></tr>
							</tbody>
						</table>
				    </div>
				</div>
				<!-- layout_wrap(E) -->
		    </div>
		    <div class="layout_vertical_2" style="width:40%">
		        <div class= "opus_design_inquiry">
				<table>
				<colgroup>
					<col width="80" />
					<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Carrier"/></th>
						<td>
							<input name="carrier_cd" id="carrier_cd"  type="text" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getInfo_Carrier(this)" maxlength="8"/><!-- 
							 --><button type="button" name="btn_carrier_cd" id="btn_carrier_cd" class="input_seach_btn" tabindex="-1" onclick="on_btn_carrier()" ></button><!-- 
							 --><input name="carrier_nm" id="carrier_nm" type="text" class="L_input_R" style="width:102px;"  tabindex="-1" readonly />
						</td>
					</tr>
					<tr>
						<th><bean:message key="POL_ETD"/></th>
						<td>
							<input name="pol" type="text" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);onblur_Pol(this.name)" maxlength="8"/><!-- 
							 --><button type="button" name="btn_pol" id="btn_pol" class="input_seach_btn" tabindex="-1" onclick="on_btn_pol()" ></button><!-- 
							 --><input name="pol_nm" type="text" class="L_input_R" style="width:102px;"  tabindex="-1" readonly /><span class='dash'>/</span><!--  
							 --><input name="etd" type="text" class="L_input" style="width:75px;" maxlength="10" 
							 	OnBeforeDeactivate="ComAddSeparator(this)" 
							 	OnBeforeActivate="ComClearSeparator(this)" 
							 	onkeypress="onlyNumberCheck();" 
								onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
								onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
							 --><button type="button" name="btn_etd" id="btn_etd" class="calendar ir" tabindex="-1" onclick="on_btn_dt('etd')"></button>
						</td>
					</tr>
					<tr>
						<th><bean:message key="POD_ETA"/></th>
						<td>
							<input name="pod" type="text" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);onblur_Pod(this.name);" maxlength="8"/><!-- 
							 --><button type="button" name="btn_pod" id="btn_pod" class="input_seach_btn" tabindex="-1" onclick="on_btn_pod()" ></button><!-- 
							 --><input name="pod_nm" type="text" class="L_input_R" style="width:102px;"  tabindex="-1" readonly /><span class='dash'>/</span><!-- 
							 --><input name="eta" type="text" class="L_input" style="width:75px;" maxlength="10" 
									 OnBeforeDeactivate="ComAddSeparator(this)" 
									 OnBeforeActivate="ComClearSeparator(this)" 
									 onkeypress="onlyNumberCheck();" 
									 onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
									 onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
							 --><button type="button" name="btn_eta" id="btn_eta" class="calendar ir" tabindex="-1" onclick="on_btn_dt('eta')"></button>
						</td>
					</tr>
					<tr>
						<th><bean:message key="DEL"/></th>
						<td>
							<input name="del" type="text" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);onblur_Del(this.name);" maxlength="8"/><!-- 
							 --><button type="button" name="btn_del" id="btn_del" class="input_seach_btn" tabindex="-1" onclick="on_btn_del()" ></button><!-- 
							 --><input name="del_nm" type="text" class="L_input_R" style="width:102px;"  tabindex="-1" readonly />
						</td>
					</tr>
					</tbody>
				</table>
				</div>
		    </div>
		</div>
		<!-- layout_wrap(E) -->
		</div>
	</div>
	
	<!-- Tab2  -->
    <div id="tabLayer" name="tabLayer" style="display:none">  
		<div class= "opus_design_grid clear" style="margin-bottom:8px;">
			 <div class="opus_design_btn">  
				<!-- <button type="button" class="btn_normal" id="btn_bl_load" name="btn_bl_load" onClick="doWork('btn_bl_load');"><bean:message key="BL_Load"/></button> -->
				 <button type="button" class="btn_normal" id="btn_upload" name="btn_upload" onClick="doWork('btn_upload');"><bean:message key="Excel_Upload"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_download" name="btn_download" onClick="doWork('btn_download');"><bean:message key="Template_Download"/></button><!--  
				 --><button type="button" class="btn_normal" id="btn_row_add" name="btn_row_add" onClick="doWork('btn_row_add');"><bean:message key="Add"/></button><!--
				 --><button type="button" class="btn_normal" id="btn_row_del" name="btn_row_del" onClick="doWork('btn_row_del');"><bean:message key="Del"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_row_copy" name="btn_row_copy" onClick="doWork('btn_row_copy');"><bean:message key="Row_Copy"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_excel" name="btn_excel" onClick="doWork('btn_excel');"><bean:message key="Excel"/></button>
			</div> 
			 <script type="text/javascript">comSheetObject('sheet3');</script> 
		</div>
	</div>
	
	<!-- Tab3  -->
    <div id="tabLayer" name="tabLayer" style="display:none">  
    	<div class= "opus_design_grid clear" style="margin-bottom:8px;">
			<script type="text/javascript">comSheetObject('sheet4');</script>
		</div> 
	</div>
	
	<!-- Tab4  -->
    <div id="tabLayer" name="tabLayer" style="display:none">  
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="50" />
						<col width="220" />
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="File_Path"/></th>
							<td>
							<div id="logo_rec_id" style="display: none;"><!--
			                --></div><!--
			                --><input tabindex = "-1" type="file" name="logo_rectangle"  size="25"/><!--
			                --><input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none">
							<button type="button" class="btn_etc" name="btn_file_upload" id="btn_file_upload" onClick="doWork('btn_file_upload');"><bean:message key="File_Upload"/></button> 
							</td>
							<td class="T_Right" style="float: right;">
							<button type="button" class="btn_etc" name="btn_file_delete" id="btn_file_delete" onClick="doWork('btn_file_delete');"><bean:message key="File_Delete"/></button> 
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<div class="opus_design_grid clear">
			<!-- opus_design_grid(S) -->
				<script type="text/javascript">comSheetObject('sheet5');</script>
				<%-- <script type="text/javascript">comUploadObject('upload1', '<%=session.getId()%>');</script> --%>
			</div>
			<div id="hiddenSheet" class="opus_design_grid clear" style="display: none;">
			<!-- opus_design_grid(S) -->
				<script type="text/javascript">comSheetObject('sheet6');</script>
			</div>
	</div>
</div>
</div>
</form>
<form name="frm1" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	
<iframe id="_iFrameWait_" src="<%=CLT_PATH%>/web/img/main/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;"></iframe>

<script type="text/javascript">
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	doBtnAuthority(attr_extension);
</script>
