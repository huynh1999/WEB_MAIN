<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICMgmt.jsp
*@FileTitle  : Inbound Complete Management
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/20
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
<script type="text/javascript" src="./apps/fis/wms/whinboundcomplete/script/WHICMgmt.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript" src="./js/common/message/EN/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

String req_search_no   = "";
String req_search_tp   = "";

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

try {
	req_search_no   = request.getParameter("search_no")== null?"":request.getParameter("search_no");
	req_search_tp   = request.getParameter("search_tp")== null?"":request.getParameter("search_tp");
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>

<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="ord_tp_cd" name="cdMap" property="ord_tp_cd"/>
<bean:define id="warehouse" name="cdMap" property="warehouse"/>

<script language="javascript">    
	var ord_tp_cdCode = "";
	var ord_tp_cdText = "";
   <logic:iterate id="codeVO" name="ord_tp_cd">
	    ord_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
	    ord_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
   </logic:iterate>
   
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	var warehouseCode = "";
	var warehouseText = "";
    <logic:iterate id="WhVO" name="warehouse">
	    warehouseCode+= '<bean:write name="WhVO" property="wh_cd"/>' + '|';
	    warehouseText+= '<bean:write name="WhVO" property="wh_nm"/>' + '|';
    </logic:iterate>
	</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd">
<input type="hidden" name="form_mode" 	value="NEW" />
<input type="hidden" name="req_search_no" id="req_search_no"	value="<%=req_search_no%>" />
<input type="hidden" name="req_search_tp" id="req_search_tp"	value="<%=req_search_tp %>" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>"/>
<input type="hidden" name="pageurl" id="pageurl" value="WHICMgmt.clt"/>
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" id="paper_size" name="paper_size" value="A4" />
<input type="hidden" id="com_mrdBodyTitle" name="com_mrdBodyTitle" value="Unloading Sheet Print" />
<input type="hidden" id="com_mrdArguments" name="com_mrdArguments"/>
<input type="hidden" id="com_mrdPath" name="com_mrdPath" />
<input type="hidden" name="rd_param" id="rd_param" />
<input type="hidden" name="file_name" id="file_name" />
<input type="hidden" name="title" id="title" />
<div class="page_title_area clear" >
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
			<%-- <button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr1() : ""%>" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button> --%> 
	 </div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span><%=LEV1_NM %></span>&gt;
			<span><%=LEV2_NM %></span>&gt;
			<span><%=LEV3_NM %></span>
		</div>
	<!-- page_location(E) -->
</div>
<div id="headLayer" style="display:none">
<div class="wrap_search" >
    <!-- opus_design_inquiry(S) -->
    <div class="opus_design_inquiry ">
    	<table>
			<colgroup>
				<col width="100" />
				<col width="270" />
				<col width="100" />
       			<col width="270" />
				<col width="100" />
				<col width="" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>	
								<select name="wh_cd" id="wh_cd" style="width: 160px;" required>
									
								</select>
					</td>
					<th><bean:message key="Contract_No"/></th>
					<td><input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:84px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 
						 --><button class="input_seach_btn" type="button" id="btn_ctrt_no" name="btn_ctrt_no" onclick="doWork('btn_ctrt_no');"></button><!-- 
							 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:126px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
					</td>
                       <th><bean:message key="Order_Type"/></th>
					<td>
						<!-- <script type="text/javascript">ComComboObject('ord_tp_cd', 1, 100, 1);</script> -->
						<select name="ord_tp_cd" id="ord_tp_cd" style="width: 120px;">
			        			
             			</select>
					</td>
				</tr>
                  	<tr>
					<th>
						<!-- <script type="text/javascript">ComComboObject('search_tp', 1, 100, 1);</script> -->
						<select id="search_tp" name="search_tp">
							<option value="WIB_BK_NO">Booking No.</option>
							<option value="CUST_ORD_NO">Customer Ref No.</option>
							<option value="COMMC_INV_NO">Commercial Invoice No.</option>
							<option value="DLV_ORD_NO">Delivery Order No.</option>
						</select>
					</th>
					<td><input name="search_no" id = "search_no"  type="text" class="L_input" style="width:160px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"  maxlength="18"/></td>
					<th><bean:message key="Booking_Date"/></th>
					<td><input name="fm_bk_date" type="text" required onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" maxlength="10" style="width:100px;" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" id="fm_bk_date" onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;"/><!-- 
						 --><!--  
						 --><span class="dash">~</span><!--
						 --><input name="to_bk_date" type="text" required onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" maxlength="10" style="width:99px;" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" id="to_bk_date" onblur="chkCmprPrd(firCalFlag, false, this, form.fm_bk_date, this);firCalFlag=false;" /><!-- 
						 --><button class="calendar" type="button" id="btn_to_bk_date" name="btn_to_bk_date" onclick="doWork('btn_to_bk_date');"></button>
					</td>
               		<th><p><bean:message key="Status"/></p></th>
					<td>
						<!-- <script type="text/javascript">ComComboObject('search_status', 1, 100, 1);</script> -->
						<select id="search_status" name="search_status" style="width: 120px;">
							<option value="ALL">ALL</option>
							<option value="1">BKG Issued</option>
							<option value="2">Partial Complete</option>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>	

<div class="wrap_result" > 
    <!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
        <script type="text/javascript">comSheetObject('sheet1');</script>
    </div>
</div>
</div>
<div class="wrap_result" >
	<div class="opus_design_btn sm">      
		<table>
       	<colgroup>
			<col width="600" />
			<col width="600" />
			<col width="70" />
			<col width="130" />
			<col width="130" />
			<col width="*" />
		</colgroup>
		<tbody>
		<tr>
			<td colspan="4" align="center"><button type="button" class="btn_down_list" id="btn_Down" name="btn_Down" onclick="doWork('btn_Down');"></button><!-- 
					--><button type="button" class="btn_up_list" id="btn_Up" name="btn_Up" onclick="doWork('btn_Up');"></button>
			</td>
       		<td><button class="btn_etc" type="button" id ="btn_save" name ="btn_save" onclick="doWork('btn_save');"><bean:message key="Save"/></button></td>
  			<td><span id="btn_show_nm" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/icon_show.gif" style="cursor:hand" onClick="btn_show('O')"></img></span><!-- 
			 --><span id="btn_hide_nm"><img src="<%=CLT_PATH%>/web/img/main/icon_hide.gif" style="cursor:hand" onClick="btn_show('H')"></img></span>
     		</td>
  		</tr>
		</tbody>
	   </table>	
  	</div>	
	<div class="opus_design_inquiry sm" >
    	<table>
			<colgroup>
				<col width="80" />
				<col width="220" />
				<col width="100" />
  				<col width="220" />
				<col width="100" />
				<col width="220" />
				<col width="100" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>
							<bean:define id="MsList" name="cdMap" property="warehouse"/>
							<select name="in_wh_cd" id="in_wh_cd" class="search_form" style="width: 190px;" disabled="disabled">
								<option value=""></option>
								<logic:iterate id="codeVO" name="MsList">
									<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
								</logic:iterate>
							</select>
					<!-- <input name="in_wh_cd" type="text" class="L_input_R" id="in_wh_cd" style="width:50px;" readonly tabindex="-1"/>		-->					
					<input name="in_wh_nm" type="text" class="L_input_R" id="in_wh_nm" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" hidden="hidden" readonly tabindex="-1"/> 
					</td>
					<th><bean:message key="Inbound_Date"/></th>
					<td>
						<input name="in_loc_dt" id="in_loc_dt" type="text" class="L_input" style="width:75px;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" /><!-- 
						 --><button class="calendar" type="button" id="btn_in_loc_dt" name="btn_in_loc_dt" onclick="doWork('btn_in_loc_dt');" ></button><!-- 
						  --><input name="in_loc_hm" id="in_loc_hm" type="text" class="L_input" style="width:45px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');setHm(this);" OnBeforeActivate="ComClearSeparator(this, 'hm');" onchange="checktime();"/>
					</td>
                       <th><bean:message key="Total_PE"/></th>
					<td>
					<input name="tot_in_item_pe_qty" type="text" class="L_input_R" id="tot_in_item_pe_qty" dataformat="float" style="width:80px;text-align:right;" readonly tabindex="-1"/>
					</td>
                       <th><bean:message key="Customs_Ref"/></th>
                       <td><input name="in_cust_ref_no" type="text" class="L_input" id="in_cust_ref_no" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/> </td>
                       
                       <th><input type="checkbox" id="checkClose" name="checkClose" /><label for="checkClose"><bean:message key="Complete"/></th>
				</tr>
                   <tr>
					<th><bean:message key="Remark"/></th>
					<td colspan="7">
					    <textarea name="remark" id="remark"  class="L_textarea"   style=" text-transform: none;"></textarea>
				    </td>
					<th><bean:message key="FreeDays"/></th>
					<td>
				        <input name="in_freetime_day" type="text" class="L_input T_Right" id="in_freetime_day" dataformat="num" style="width:80px; text-align : Right;" value="0" maxlength="5"/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div class="wrap_result" > 
    <!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
        <script type="text/javascript">comSheetObject('sheet2');</script>
    </div>
    <div class="opus_design_grid" style = "display: none">
        <script type="text/javascript">comSheetObject('sheet3');</script>
    </div>
</div>
</form>         		
 <script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>