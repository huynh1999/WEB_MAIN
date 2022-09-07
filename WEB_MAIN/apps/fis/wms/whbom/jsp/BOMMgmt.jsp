<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec
*@FileName : BOMMgmt.jsp
*@FileTitle  : Bill of Material
*@author     : kiet.tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
* 
* History
=========================================================
*/
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

<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/whbom/script/BOMMgmt.js?ver=<%=CLT_JS_VER%>"></script> 
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="wh_combo" name="cdMap" property="wh_combo"/>
<%

String req_kit_no   = "";
String req_search_div   = ""; //kit, dekit

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

try 
{
	req_kit_no   = request.getParameter("kit_no")== null?"":request.getParameter("kit_no");
	req_search_div   = request.getParameter("search_div")== null?"":request.getParameter("search_div");
}
catch(Exception e)
{
	out.println(e.toString());
}	
%>

<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	
	var wh_comboCode = "";
	var wh_comboText = "";
	
	<logic:iterate id="BOMListVO" name="wh_combo">
		wh_comboCode+= '<bean:write name="BOMListVO" property="wh_cd"/>' + '|';
		wh_comboText+= '<bean:write name="BOMListVO" property="wh_nm"/>' + '|';
	</logic:iterate>
</script>

<form id="form" name="form">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	
<!-- 	<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="KRACYW01" /> -->
<!-- 	<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="ANSAN US LOGISTICS WAREHOUSE" /> -->
<!-- 	<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="CTSZP14039" /> -->
<!-- 	<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="LINE PLUS" /> -->

	<input type="hidden" name="req_kit_no" id="req_kit_no" value="<%=req_kit_no%>" />
	<input type="hidden" name="req_search_div" id="req_search_div"  value="<%=req_search_div %>" />
	<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
	<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
	<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
	<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
	
	<input type="hidden" name="kit_wh_cd_org" id="kit_wh_cd_org" />
	<input type="hidden" name="kit_wh_nm_org" id="kit_wh_nm_org" />
	<input type="hidden" name="kit_ctrt_no_org" id="kit_ctrt_no_org" />
	<input type="hidden" name="kit_ctrt_nm_org" id="kit_ctrt_nm_org" />
	
	
	<input type="hidden" name="kit_lv1_cbm" id="kit_lv1_cbm" value="0" />
	<input type="hidden" name="kit_lv1_cbf" id="kit_lv1_cbf" value="0" />
	<input type="hidden" name="kit_lv1_grs_kgs" id="kit_lv1_grs_kgs" value="0" />
	<input type="hidden" name="kit_lv1_grs_lbs" id="kit_lv1_grs_lbs" value="0" />
	<input type="hidden" name="kit_lv1_net_kgs" id="kit_lv1_net_kgs" value="0" />
	<input type="hidden" name="kit_lv1_net_lbs" id="kit_lv1_net_lbs" value="0" />
	
	<input type="hidden" name="kit_mode" id="kit_mode" />
	
	<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
	<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
	
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	
	<div class="location">
		<span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
	</div>
</div>
<!-- Tab -->
<div class= "wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Kitting"/></span></a></li>
        <li id=Tab02>				<a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Dekitting"/></span></a></li>
    </ul>
<!--Tab 1 -->
    <div id="tabLayer" name="tabLayer" style="display:inline">  
		<div class="opus_design_btn TOP">
<%-- 			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_search_kit" id="btn_search_kit" onClick="doWork('SEARCHLIST');"><span><bean:message key="Search"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  class="btn_normal" name="btn_new_kit" id="btn_new_kit" onClick="doWork('NEW');"><span><bean:message key="New"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  class="btn_normal" name="btn_save_kit" id="btn_save_kit" onClick="doWork('ADD');"><span><bean:message key="Save"/></button><!-- 
		 --><button type="button" btnAuth="ITEM_MASTER"  class="btn_normal" name="link_item" id="link_item" onClick="doWork('link_item');"><span><bean:message key="Item_Master"/></button><!-- 
		 --><button type="button" btnAuth="INVENTORY_MOVEMENT"  class="btn_normal" name="link_invmove" id="link_invmove" onClick="doWork('link_invmove');"><span><bean:message key="Inventory_Movement"/></button><!-- 
 --%>	 --></div>
<!-- 	 	<div class="opus_design_btn"> -->
<!-- 			<button id="link_item" name="link_item">Item Master</button> -->
<!-- 			<button id="link_invmove" name="link_invmove">Inventory Movement</button> -->
<!-- 		</div> -->
		<div class="opus_design_inquiry sm">
			<table>
		    	<colgroup>
				<col width="70" />
		 		<col width="*" />
				</colgroup>    
				<tbody>        	
					<tr>
						<th><span><bean:message key="Kitting_No"/></th>
					    <td><input name="in_kit_no" id="in_kit_no" type="text" class="L_input" style="width:220px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20" required/></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="opus_design_inquiry sm">
			<h3 class="title_design"><span><bean:message key="New_Item_Master_Information"/></h3>
			<table>
				<colgroup>
					<col width="100" /> <!-- 12 -->
					<col width="80" /> <!-- 24 -->
					<col width="150" /> <!-- 11 -->
	            	<col width="250" /> <!-- 23 -->
					<col width="150" /> <!-- 12 -->
					<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><span><bean:message key="Kitting_No"/></th>
						<td colspan="5">					
							<input name="kit_no" type="text" class="L_input_R" id="kit_no" style="width:220px;" readonly />						
						</td>
					</tr>
					<tr>
						<th><span><bean:message key="Warehouse"/></th>
						<td>					
							<select name="kit_wh_combo" id="kit_wh_combo" class="search_form" required style="width: 220px;">
	             			</select>
						</td>
						<th><span><bean:message key="Contract_Name"/></th>
							<td>
								<input name="kit_ctrt_no" id="kit_ctrt_no" type="text" class="L_input" required style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup"  maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onchange="getCtrtInfo(this)"/><!-- 						
								 --><button type="button" name="btn_kit_ctrt_no" id="btn_kit_ctrt_no" onClick="doWork('btn_kit_ctrt_no');" class="input_seach_btn" tabindex="-1"></button><!--
								 --><input name="kit_ctrt_nm" id="kit_ctrt_nm" type="text" class="L_input_R" required readonly style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" />	
							</td>
		                      <th><span><bean:message key="Kitting_Date"/></th>
						<td>
							<input name="kit_dt" id="kit_dt" type="text" class="L_input" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" maxlength="10" required style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
							onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
							 --><button type="button" name="btn_kit_dt" id="btn_kit_dt" onClick="doWork('btn_kit_dt');" class="calendar ir" tabindex="-1"></button><!-- 
							 --><input name="kit_hm_fr" id="kit_hm_fr" type="text" class="L_input"  style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"
							 	onchange="timeCheck(this, form.kit_hm_fr, form.kit_hm_to);"  onkeyup="formatTime(this);"/><!-- 
							 --><input name="kit_hm_to" id="kit_hm_to" type="text" class="L_input"  style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"
							 	onchange="timeCheck(this, form.kit_hm_fr, form.kit_hm_to);"  onkeyup="formatTime(this);"/>
						</td>
					</tr>
		            <tr>
						<th><span><bean:message key="New_Item_Code"/></th>
						<td>
							<input name="kit_item_cd" id="kit_item_cd" type="text" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);getItemInfo(this, 'kit');" required OnKeyDown="if(event.keyCode==13){getItemInfo(this, 'kit');}" onChange="getItemInfo(this, 'kit')"/><!-- 					
						 --><button type="button" name="btn_kit_item_cd" id="btn_kit_item_cd" onClick="doWork('btn_kit_item_cd');" class="input_seach_btn" tabindex="-1"></button><!--  
						 --><input name="kit_item_nm" id="kit_item_nm" type="text" class="L_input_R" required readonly style="width:116px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/><!-- 
						 --><input id="kit_item_sys_no" name="kit_item_sys_no" 	type="hidden" />
						</td>
						<th><span><bean:message key="Group_Code"/></th>
						<td>
							<input name="kit_item_grp_cd" id="kit_item_grp_cd" type="text" class="L_input_R" readOnly tabindex="-1" style="width:253px" />
						</td>
						<th><span><bean:message key="New_Item_Qty_EA"/></th>
						<td>
							<input name="kit_item_ea_qty" id="kit_item_ea_qty" type="text" class="L_input" required dataformat="num" value="0" maxlength="5" OnKeyDown="if(event.keyCode==13){changeNewItemQty();}" onchange="changeNewItemQty()"  style="text-align:right;width:190px"/>
						</td>
					</tr>
					<tr>
						<th><span><bean:message key="Putaway_Location"/></th>
						<td>
							<input name="kit_wh_loc_nm" id="kit_wh_loc_nm" type="text" class="L_input" style="width:190px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo('c', 'kit')" required OnKeyDown="if(event.keyCode==13){getLocationInfo('e', 'kit');}"/><!-- 
						 --><button type="button" name="btn_kit_wh_loc_cd" id="btn_kit_wh_loc_cd" onClick="doWork('btn_kit_wh_loc_cd');" class="input_seach_btn" tabindex="-1"></button><!-- 
						 --><input type="hidden" id="kit_wh_loc_cd" name="kit_wh_loc_cd" /><!--
						 --><input type="hidden" id="kit_wh_loc_nm_org" name="kit_wh_loc_nm_org" />
						</td>
						<th><span><bean:message key="New_Item_Lot"/></th>
						<td>
							<input name="kit_lot_no" id = "kit_lot_no" type="text" class="L_input" style="width:253px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
						</td>
						<th><span><bean:message key="LOT_ID"/></th>
						<td>
							<input name="kit_lot_id" id = "kit_lot_id" type="text" class="L_input_R" readonly style="width:190px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" />
						</td>
					</tr>
					<tr>
						<th><span><bean:message key="Expiration_Date"/></th>
						<td><input name="kit_exp_dt" id="kit_exp_dt" type="text" class="L_input" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" maxlength="10" style="width:70px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
							onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!--
							--><button type="button" name="btn_kit_exp_dt" id="btn_kit_exp_dt" onClick="doWork('btn_kit_exp_dt');" class="calendar ir" tabindex="-1"></button>
						</td>
						<th><span><bean:message key="Lot_04"/></th>
						<td>
							<input name="kit_lot_04" id="kit_lot_04" type="text" class="L_input" style="width:253px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
						</td>
						<th><span><bean:message key="Lot_05"/></th>
						<td>
							<input name="kit_lot_05" id="kit_lot_05" type="text" class="L_input" style="width:190px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" />
						</td>
					</tr>
					<tr>
						<th><span><bean:message key="Contract_PIC"/></th>
						<td><input name="kit_ctrt_pic_nm" type="text" class="L_input" id="kit_ctrt_pic_nm" maxlength="100" style="width:220px"/>
						</td>
						<th><span><bean:message key="Supervisor"/></th>
						<td>
							<input name="kit_supv_nm" type="text" class="L_input" id="kit_supv_nm" maxlength="100"style="width:253px;" dataformat="excepthan" />
						</td>
						<th><span><bean:message key="Worker"/></th>
						<td>
							<input name="kit_worker_nm" type="text" class="L_input" id="kit_worker_nm" maxlength="100" style="width:190px"/>
						</td>
					</tr>
					<tr>
						<th><span><bean:message key="Measure"/></th>
						<td colspan="5">
							   <input name="kit_item_cbm"     id="kit_item_cbm"     type="text" class="L_input" value="0.000" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');chkComma(this,10,3);"/><label>CBM</label><!--
							--><input name="kit_item_cbf"     id="kit_item_cbf"     type="text" class="L_input" value="0.000" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');chkComma(this,10,3);"/><label>CFT</label><!--
		 					--><input name="kit_item_grs_kgs" id="kit_item_grs_kgs" type="text" class="L_input" value="0.000" style="width:70px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');chkComma(this,10,3);"/><label>G.KG</label><!--
		 					--><input name="kit_item_grs_lbs" id="kit_item_grs_lbs" type="text" class="L_input" value="0.000" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');chkComma(this,10,3);"/><label>G.LB</label><!--
		 					--><input name="kit_item_net_kgs" id="kit_item_net_kgs" type="text" class="L_input" value="0.000" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');chkComma(this,10,3);"/><label>N.KG</label><!--
		 					--><input name="kit_item_net_lbs" id="kit_item_net_lbs" type="text" class="L_input" value="0.000" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');chkComma(this,10,3);"/><label>N.LB</label>
						</td>
					</tr>
					<tr>
						<th><span><bean:message key="Remark"/></th>
						<td colspan="5">
							<textarea name="kit_rmk" id="kit_rmk" class="L_textarea"></textarea>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- layout_wrap(S) -->
		<div class="opus_design_inquiry" style="padding-right: 1px">
		    <div class="layout_wrap">
				<div class="layout_flex_fixed" style="width:500px;">
			    	<h3 class="title_design"><bean:message key="Composition_of_New_Item_per_one_Item"/></h3>	
	 		    	<!-- opus_design_grid(S) -->
					<div class="opus_design_grid clear">
						<!-- opus_design_btn(S) -->
						<div class="opus_design_btn">
						 	<button type="button" class="btn_normal" name="kit_row_add1" id="kit_row_add1" onClick="doWork('kit_row_add1');"><bean:message key="Add"/></button>
						<button type="button" class="btn_normal" name="kit_row_del1" id="kit_row_del1" onClick="doWork('kit_row_del1');"><bean:message key="Del"/></button>
						</div>
						<!-- opus_design_btn(E) -->
						<script type="text/javascript">comSheetObject('sheet1');</script>
					</div>
				</div>
		    	<div class="layout_flex_flex" style="padding-left:508px">	
		    		<h3 class="title_design"><bean:message key="Kitting_items_selection"/></h3>	
		    		<!-- opus_design_grid(S) -->
					<div class="opus_design_grid clear" style="padding-right: 1px">
					<!-- opus_design_btn(S) -->
						<div class="opus_design_btn">
						 	<button type="button" class="btn_normal" name="kit_row_add2" id="kit_row_add2" onClick="doWork('kit_row_add2');"><bean:message key="Add"/></button><!-- 
						 --><button type="button" class="btn_normal" name="kit_row_del2" id="kit_row_del2" onClick="doWork('kit_row_del2');"><bean:message key="Del"/></button>
						</div>
					<!-- opus_design_btn(E) -->
						<script type="text/javascript">comSheetObject('sheet2');</script>
					</div>
		    	</div>
		    </div>
		</div>
	</div><!--     End Tab 1 -->
<!--     Tab 2 -->
	<div id="tabLayer" name="tabLayer" style="display:none">  
		<div class= "opus_design_inquiry">
			<div class="opus_design_btn">
				<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_search2" id="btn_search2" onClick="doWork('SEARCHLIST');"><span><bean:message key="Search"/></button><!-- 
			 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  class="btn_normal" name="btn_save_dekit" id="btn_save_dekit" onClick="doWork('ADD');"><span><bean:message key="Save"/></button><!-- 
			 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_excel_dekit" id="btn_excel_dekit" onClick="doWork('EXCEL');"><span><bean:message key="Excel"/></button>
			 </div>
			<div class="opus_design_inquiry sm">
				<table>
					<colgroup>
						<col width="70" /> <!-- 10 -->
						<col width="250" /> <!-- 24 -->
						<col width="100" /> <!-- 11 -->
                        <col width="200" /> <!-- 23 -->
						<col width="100" /> <!-- 12 -->
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
							<th><span><bean:message key="Warehouse"/></th>
							<td>					
								<select name="dekit_wh_combo" id="dekit_wh_combo" required style="width: 220px;">
	             				</select>
							</td>
							<th><span><bean:message key="Contract_Name"/></th>
							<td colspan="3">
								<input name="dekit_ctrt_no" id="dekit_ctrt_no" type="text" class="L_input" required style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup"  maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfoDekit(this);}" onchange="getCtrtInfoDekit(this)"/><!-- 
								 --><button type="button" name="btn_dekit_ctrt_no" id="btn_dekit_ctrt_no" onClick="doWork('btn_dekit_ctrt_no');" class="input_seach_btn" tabindex="-1"></button><!--  						
								 --><input name="dekit_ctrt_nm" id="dekit_ctrt_nm" type="text" class="L_input" required style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup('dekit');}"/>
								
							</td>
	
						</tr>
						<tr>
							<th><span><bean:message key="Kitting_No"/></th>
							<td><input name="in_dekit_no" id="in_dekit_no" type="text" class="L_input" style="width:220px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>				
							</td>
	                        <th><span><bean:message key="Kitting_Date"/></th>
							<td colspan="3"><input name="dekit_fm_kit_dt" id="dekit_fm_kit_dt" required type="text" class="L_input" maxlength="10" style="width:96px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
								onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, this, form.dekit_to_kit_dt);firCalFlag=false;"/><!--
								--><!--
								--><span class="dash">~</span><!-- 								
								--><input name="dekit_to_kit_dt" id="dekit_to_kit_dt" type="text" required class="L_input" maxlength="10" style="width:95px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
								onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this,form.dekit_fm_kit_dt ,this );firCalFlag=false;"/><!--
								--><button type="button" name="btn_dekit_to_kit_dt" id="btn_dekit_to_kit_dt" onClick="doWork('btn_dekit_to_kit_dt');" class="calendar ir" tabindex="-1"></button> 
							</td>
						</tr>
	                    <tr>
							<th><span><bean:message key="Item"/></th>
							<td>
							<input name="dekit_item_cd" id = "dekit_item_cd" type="text" class="L_input" style="width:220px;ime-mode:disabled;text-transform:uppercase;" otherchar = "<%=WMS_OTHER_CHAR%>" dataformat="engup" onBlur="strToUpper(this);"/></td>
							<th><span><bean:message key="Item_Lot"/></th>
							<td>
								<input name="dekit_lot_no" id = "dekit_lot_no" type="text" class="L_input" style="width:236px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
							</td>
							<th><span><bean:message key="Location"/></th>
							<td>
								<input name="dekit_wh_loc_nm" id="dekit_wh_loc_nm" type="text" class="L_input" style="width:180px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo('c', 'dekit')" OnKeyDown="if(event.keyCode==13){getLocationInfo('e', 'dekit');}" onChange="getLocationInfo('c', 'dekit')"/><!--
								--><button type="button" name="btn_dekit_wh_loc_cd" id="btn_dekit_wh_loc_cd" onClick="doWork('btn_dekit_wh_loc_cd');" class="input_seach_btn" tabindex="-1"></button> <!--
								--><input type="hidden" id="dekit_wh_loc_cd" name="dekit_wh_loc_cd" /><!--
								--><input type="hidden" id="dekit_wh_loc_nm_org" name="dekit_wh_loc_nm_org" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<h3 class="title_design"><span><bean:message key="Dekitting_items_selection"/></h3>
			<div class= "opus_design_grid" style="margin-bottom:8px;">
				<script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
			
			<h3 class="title_design"><span><bean:message key="Composition_of_Kitting_Item"/></h3>
			<div class= "opus_design_grid" style="margin-bottom:8px;">
				<script type="text/javascript">comSheetObject('sheet4');</script>
			</div>
			<div class= "opus_design_grid" style= "display: none">
				<script type="text/javascript">comSheetObject('sheet5');</script>
			</div>
		</div>
	</div><!--     End Tab 2 -->
</div><!-- End Tab -->
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
