<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WaveMgmt.jsp
*@FileTitle  : Wave
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
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
    <script type="text/javascript" src="./apps/fis/wms/whoutwave/script/WaveMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<%

String req_wave_no   = "";

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
/* String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm(); */

try 
{
	req_wave_no   = request.getParameter("wave_no")== null?"":request.getParameter("wave_no");
}
catch(Exception e)
{
	out.println(e.toString());
}	
%>
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
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="req_wave_no" id="req_wave_no" value="<%=req_wave_no%>" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="wh_cd_org" id="wh_cd_org" />
<input type="hidden" name="wh_nm_org" id="wh_nm_org" />
<input type="hidden" name="ctrt_no_org" id="ctrt_no_org" />
<input type="hidden" name="ctrt_nm_org" id="ctrt_nm_org" />

<input type="hidden" name="mode" id="mode" />

<input type="hidden" name="issu_cnt_tot" id="issu_cnt_tot" />
<input type="hidden" name="lp_cnt_tot" id="lp_cnt_tot" />
<input type="hidden" name="allc_cnt_tot" id="allc_cnt_tot" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
<%-- 			 <button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onclick="doWork('SEARCHLIST')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button>  --%>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
		<!-- page_location(E) -->
	</div>

<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search_tab">
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Warehouse"/></th>
						 <td><bean:define id="MsList" name="cdMap" property="warehouse"/>
					        <select name="wh_cd" id="wh_cd" class="search_form" style="width: 190px;" required onchange="check_authority_wh();">
					         <logic:iterate id="codeVO" name="MsList">
					          <option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
					         </logic:iterate>
					        </select></td>
						<th><bean:message key="Contract_Name"/></th>
						<td>
							<input name="ctrt_no" id="ctrt_no"  type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onChange="getCtrtInfo(this)" required="required"/><!-- 
							 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" onclick="doWork('btn_ctrt_no')" tabindex="-1"></button><!-- 
							 --><input name="ctrt_nm" id="ctrt_nm"  type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);""  onKeyDown="if(event.keyCode==13){CtrtPopup();}" required="required"/>
						</td>
						<th><bean:message key="Consignee"/></th>
						<td>	
							<input name="buyer_cd" type="text" class="L_input" id="buyer_cd" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getConsigneeInfo(this);" OnKeyDown="if(event.keyCode==13){getConsigneeInfo(this);}" onChange="getConsigneeInfo(this);"/><!-- 
							 --><button type="button" name="btn_buyer_cd" id="btn_buyer_cd"  class="input_seach_btn" onclick="doWork('btn_buyer_cd')" tabindex="-1"></button><!-- 
							 --><input name="buyer_nm" type="text" class="L_input" id="buyer_nm" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){ConsigneePopup();}"/>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Booking_No"/></th>
						<td><input name="in_wob_bk_no" id = "in_wob_bk_no" type="text" class="L_input" style="width:250px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
						<th><bean:message key="Booking_Date"/></th>
						<td>
							<input name="fm_bk_date" id="fm_bk_date" type="text" class="L_input"  maxlength="10" style="width:95px;" 
							onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;" 
							  onKeyPress="onlyNumberCheck();" required="required" /><!-- 
							 --><!-- 
							  --><span class="dash">~</span><!--  
							  --><input name="to_bk_date" id="to_bk_date" type="text" class="L_input"  maxlength="10" style="width:94px;" 
							  	onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
								onblur="chkCmprPrd(firCalFlag, false, this, form.fm_bk_date, this);firCalFlag=false;"
								onKeyPress="onlyNumberCheck();" required="required" /><!-- 
							 --><button class="calendar" type="button" name="btn_to_bk_date" id="btn_to_bk_date" onclick="doWork('btn_to_bk_date')"></button>
						</td>
						<th><bean:message key="Wave_Key"/></th>
						<td>	
							<input name="in_wave_no" id = "in_wave_no" type="text" class="L_input" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="18"/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->	

<div class="wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Wave"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Allocated_List"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Unallocated_List"/></span></a></li>
        <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Doc_Detail"/></span></a></li>
    </ul>
    
    <!-----Wave S ----->
    <div id="tabLayer" name="tabLayer" style="display:inline">  
		<div class="opus_design_btn">
			 <button type="button" class="btn_etc" name="btn_new_wave" id="btn_new_wave" onclick="doWork('btn_new_wave')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button><!-- 
			  --><button type="button" class="btn_etc" name="btn_save_wave" id="btn_save_wave" onclick="doWork('btn_save_wave')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button><!-- 
			  --><button type="button" class="btn_etc" name="btn_delete_wave" id="btn_delete_wave" onclick="doWork('btn_delete_wave')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><bean:message key="Delete"/></button><!-- 
			  --><button type="button" class="btn_etc" name="btn_print_wave" id="btn_print_wave" onclick="doWork('btn_print_wave')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><bean:message key="Print"/></button><!--  
			   --><button type="button" class="btn_etc" name="link_loadplan_wave" id="link_loadplan_wave" onclick="doWork('link_loadplan_wave')" style="display:none;" btnAuth="LOAD_PLAN">Load Plan</button><!-- 
			  --><button type="button" class="btn_etc" name="link_outboundcomplete_wave" id="link_outboundcomplete_wave" onclick="doWork('link_outboundcomplete_wave')" style="display:none;" btnAuth="OUTBOUND_COMPLETE"><bean:message key="Outbound_Complete"/></button><!-- 
			  --><button type="button" class="btn_etc" name="link_invreplenishment_wave" id="link_invreplenishment_wave" onclick="doWork('link_invreplenishment_wave')" style="display:none;" btnAuth="INVENTORY_REPLENISHMENT"><bean:message key="Inventory_Replenishment"/></button><!--  
		 --></div>
		<div class="opus_design_btn">
	  	</div>
		
		<div class= "opus_design_inquiry sm" style="margin-bottom:8px;">
		<h3 class="title_design"><bean:message key="Wave_Master"/></h3>
		<table>
				<colgroup>
						<col width="60" />
						<col width="250" />
						<col width="185" />
						<col width="250" />
						<col width="120" />
						<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Wave_Key"/></th>
						<td><input name="wave_no" id = "wave_no" type="text" class="L_input_R" style="width:125px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="18" readOnly tabindex="-1"/></td>
						<th><bean:message key="Allocation_Criterion"/></th>
						<td>
						<select name="alloc_option" id="alloc_option">
							<option value="LOT_ATTRIB_01"><bean:message key="Inbound_Date"/></option>
							<option value="LOT_ATTRIB_02"><bean:message key="Item_Lot"/></option>
							<option value="LOT_ATTRIB_03"><bean:message key="Expiration_Date"/></option>
							<option value="LOT_ATTRIB_04"><bean:message key="LOT"/>04</option>
							<option value="LOT_ATTRIB_05"><bean:message key="LOT"/>05</option>
						</select>
						</td>
						<th><bean:message key="Alignment"/></th>
						<td>	
							<select name="alloc_ord" id="alloc_ord">
							<option value="ASC"><bean:message key="Ascending"/></option>
							<option value="DESC"><bean:message key="Descending"/></option>
							
						</select>
							
						</td>
					</tr>
					<tr>
						<th><bean:message key="Picking_Date"/></th>
						<td><input name="pick_dt" id="pick_dt" type="text" class="L_input"  maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						onclick = "OmsFunFocusDel(this)" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
						 --><button class="calendar" type="button" name="btn_pick_date" id="btn_pick_date" onclick="doWork('btn_pick_date')"></button><!-- 
						  --><input name="pick_hm_fr" id="pick_hm_fr" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" onblur="valTime(this);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 
						--><input name="pick_hm_to" id="pick_hm_to" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" onblur="valTime(this);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/>
						</td>
						<th><bean:message key="Remark"/></th>
						<td colspan="3">
							<input name="rmk" type="text" class="L_input" id="rmk" dataformat="other" style="width:600px;text-transform:uppercase;"/>
							<input type="hidden" id="wave_wh_cd" name="wave_wh_cd" />
							<input type="hidden" id="wave_wh_nm" name="wave_wh_nm" />
							<input type="hidden" id="wave_ctrt_no" name="wave_ctrt_no" />
							<input type="hidden" id="wave_ctrt_nm" name="wave_ctrt_nm" />
						</td>
					</tr>
				</tbody>
		</table>
		</div>
		<div class="layout_wrap">
    <div class="layout_vertical_2">
        <!-- opus_design_grid(S) -->
        
        <div class="opus_design_grid">
        <h3 class="title_design"><bean:message key="Order_List"/></h3>
					<div class="opus_design_btn">
					 	<button type="button" class="btn_normal" name="row_add" id="row_add" onclick="doWork('row_add')" ><bean:message key="Add"/></button><!-- 
					 --><button type="button" class="btn_normal" name="row_del" id="row_del" onclick="doWork('row_del')" ><bean:message key="Del"/></button>
					</div>
				<!-- opus_design_btn(E) -->
            <script type="text/javascript">comSheetObject('sheet2');</script>
        </div>
        <!-- opus_design_grid(E) -->
    </div>
    <div class="layout_vertical_2 pad_left_4">
        <!-- opus_design_grid(S) -->
        
        <div class="opus_design_grid">
        <h3 class="title_design"><bean:message key="Allocation_List"/></h3>
					<div class="opus_design_btn">
						<button type="button" class="btn_normal" name="btn_allocation_wave" id="btn_allocation_wave" onclick="doWork('btn_allocation_wave')"><bean:message key="Allocation"/></button><!-- 
						 --><button type="button" class="btn_normal" name="btn_manualalloc_wave" id="btn_manualalloc_wave" onclick="doWork('btn_manualalloc_wave')"><bean:message key="Manual_Allocation"/></button><!-- 
						 --><button type="button" class="btn_normal" name="btn_cancel_wave" id="btn_cancel_wave" onclick="doWork('btn_cancel_wave')"><bean:message key="Alloc_Cancel"/></button>
					</div>
				<!-- opus_design_btn(E) -->
            <script type="text/javascript">comSheetObject('sheet1');</script>
        </div>
        <!-- opus_design_grid(E) -->
    </div>
</div>
		</div>
		<!-----Wave E ----->
		
		<!-- Allocation List S -->
		<div id="tabLayer" name="tabLayer" style="display:none">  
<div class="layout_wrap">
		<div class="opus_design_grid clear" >
		<h3 class="title_design"><bean:message key="Allocated_Item_List"/></h3>
				<div class="opus_design_btn">
				<button type="button" class="btn_normal" name="btn_cancel_allc" id="btn_cancel_allc" onclick="doWork('btn_cancel_allc')"><bean:message key="Alloc_Cancel"/></button><!-- 
			 	--><button type="button" class="btn_normal" name="btn_print_allc" id="btn_print_allc" onclick="doWork('btn_print_allc')"><bean:message key="Print"/></button><!-- 
			 	--><button type="button" class="btn_normal" name="link_loadplan_allc" id="link_loadplan_allc" onclick="doWork('link_loadplan_allc')"><bean:message key="Load_Plan"/></button><!-- 
			 	--><button type="button" class="btn_normal" name="link_outboundcomplete_allc" id="link_outboundcomplete_allc" onclick="doWork('link_outboundcomplete_allc')"><bean:message key="Outbound_Complete"/></button><!-- 
				 --></div>
				
				<div class="opus_design_btn">
	  			</div>
				<script type="text/javascript">comSheetObject('sheet3');</script>
				</div>
</div>		</div>		
		<!-- Allocation List E -->
		
		<!-- Unallocated List S -->
		<zdiv id="tabLayer" name="tabLayer" style="display:none">  
<div class="layout_wrap">
		<div class="opus_design_grid clear" >
		<h3 class="title_design"><bean:message key="Un_Allocated_Item_List"/></h3>
				<div class="opus_design_btn">
				<button type="button" class="btn_normal" name="btn_allocation_un" id="btn_allocation_un" onclick="doWork('btn_allocation_un')"><bean:message key="Allocation"/></button><!-- 
			 	--><button type="button" class="btn_normal" name="btn_manualalloc_un" id="btn_manualalloc_un" onclick="doWork('btn_manualalloc_un')"><bean:message key="Manual_Allocation"/></button><!-- 
			 	 --><button type="button" class="btn_normal" name="btn_excel_un" id="btn_excel_un" onclick="doWork('btn_excel_un')"><bean:message key="Excel"/></button><!-- 
			 	 --><button type="button" class="btn_normal" name="btn_Print_un" id="btn_Print_un" onclick="doWork('btn_Print_un')"><bean:message key="Print"/></button><!-- 
			 	 --><button type="button" class="btn_normal" name="link_invreplenishment_un" id="link_invreplenishment_un" onclick="doWork('link_invreplenishment_un')"><bean:message key="Inventory_Replenishment"/></button><!-- 
				 --></div>
				<div class="opus_design_btn">
	  			</div>
				
				<script type="text/javascript">comSheetObject('sheet4');</script>
				</div>
		</div>
		</div>
		<!-- Unallocated List E -->
		
		<!----- Doc Detail S ----->
		<div id="tabLayer" name="tabLayer" style="display:none">  
		<div class="wrap_result">
		<div class="opus_design_inquiry clear" >
			<script language="javascript">comSheetObject('sheet5');</script>  

		</div>
		</div>
		</div>
		<!----- Doc Detail E ----->
	</div>
</div>
</div>
</form>
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
