<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AllcMgmt.jsp
*@FileTitle  : Allocation Management
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
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
    <script type="text/javascript" src="./apps/fis/wms/whoutallcation/js/AllcMgmt.js?ver=<%=CLT_JS_VER%>"></script>
<%



String req_wob_bk_no   = "";

try 
{
	req_wob_bk_no   = request.getParameter("wob_bk_no")== null?"":request.getParameter("wob_bk_no");
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
<input type="hidden" name="f_cmd" value="0">
<input type="hidden" name="req_wob_bk_no" id="req_wob_bk_no" value="<%=req_wob_bk_no%>" />
<input type="hidden" name="issu_cnt" id="issu_cnt" />
<input type="hidden" name="lp_cnt" id="lp_cnt" />
<input type="hidden" name="allc_cnt" id="allc_cnt" />
 <input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table -->
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="AllcMgmt.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<button type="button"><%= LEV3_NM %></button>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" name="btn_search" id="btn_search" style="display:none;" onclick="doWork('SEARCHLIST')" btnAuth="<%= roleBtnVO.getAttr1() %>">Search</button><!-- 
		 	--><button type="button" class="btn_normal" name="btn_allocation" id="btn_allocation"           onclick="doWork('ALLOCATION')" style="display:none;" btnAuth="ALLOCATION">Allocation</button><!-- 
		 	--><button type="button" class="btn_normal" name="btn_manualAlloc" id="btn_manualAlloc" 		 onclick="doWork('MANUALALLOC')" style="display:none;" btnAuth="MANUAL_ALLOC">Manual Alloc</button><!-- 
		 	--><button type="button" class="btn_normal" name="btn_cancel" id="btn_cancel" 				 onclick="doWork('CANCEL')" style="display:none;" btnAuth="ALLOC_CANCEL">Alloc Cancel</button><!-- 
		 	--><button type="button" class="btn_normal" name="btn_save" id="btn_save" 					 onclick="doWork('SAVE')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>">Save</button><!-- 
		 	--><button  type="button" class="btn_normal"  id="link_LoadPlan" name="link_LoadPlan"      	 onclick="doWork('LINK_LOADPLAN')" style="display:none;" btnAuth="LOAD_PLAN">Load Plan</button><!-- 
   			--><button  type="button" class="btn_normal" id="link_OutboundComplete" name="link_OutboundComplete" onclick="doWork('OUTBOUND_COMPLETE')" style="display:none;" btnAuth="OUTBOUND_COMPLETE">Outbound Complete</button><!-- 
   			--><button  type="button" class="btn_normal" id="link_Print" name="link_Print" 				       onclick="doWork('LINK_PRINT')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>">Print</button>
	 --%></div>
	<!-- opus_design_btn(E) -->
	 <!-- <div class="opus_design_btn">
   		<button  id="link_LoadPlan" name="link_LoadPlan">Load Plan</button>
   		<button  id="link_OutboundComplete" name="link_OutboundComplete">Outbound Complete</button>
   		<button  id="link_Print" name="link_Print">Print</button>
 	</div> -->
	<!-- page_location(S) -->
		<div class="location">
			<span><%= LEV1_NM %></span> &gt; <span><%= LEV2_NM %></span> &gt; <span><%= LEV3_NM %></span>
		</div>
	<!-- page_location(E) -->
</div>
<div class="over_wrap" height="100%">
<div class= "wrap_search_tab">
<div class="opus_design_inquiry wFit">
	<table>
		<colgroup>
			<col width="50" />
			<col width="*"/>						
		</colgroup>
		<tbody>
			<tr>					
				<th>Booking No.</th>
				<td><input name="in_wob_bk_no" id="in_wob_bk_no" type="text" class="L_input" style="width:160px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
			</tr>
		</tbody>
	</table>
</div>
</div>

<div class="wrap_result_tab">

	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="javascript:void()" style="cursor:hand;" onClick="goTabSelect('01');"><span>Allocation</span></a></li>
        <li id=Tab02><a href="javascript:void()" style="cursor:hand;" onClick="goTabSelect('02');"><span>Doc Detail</span></a></li>
    </ul>
    
	<div id="tabLayer" name="tabLayer" style="display:inline">  
			<div class="opus_design_inquiry"> 
				<table>
						<colgroup>
							<col width="50" />
							<col width="220" />
							<col width="150" />
	                        <col width="220" />
							<col width="110" />
							<col width="*" />
						</colgroup>
						<tr>
							<th>Booking No.</th>
							<td>					
								<input type="text" name="wob_bk_no" id="wob_bk_no" class="L_input_R" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1"/>
								<input type="hidden" name="wh_cd" id="wh_cd" />		
								<input type="hidden" name="walc_no" id="walc_no" />
							</td>
							<th>Allocation Criterion</th>
							<td>
								<select name="alloc_option" id="alloc_option">
									<option value="LOT_ATTRIB_01">Inbound Date</option>
									<option value="LOT_ATTRIB_02">Item Lot</option>
									<option value="LOT_ATTRIB_03">Expiration Date</option>
									<option value="LOT_ATTRIB_04">LOT 04</option>
									<option value="LOT_ATTRIB_05">LOT 05</option>
								</select>
							</td>
							<th>Alignment</th>
							<td>
								<select name="alloc_ord" id="alloc_ord">
									<option value="ASC">Ascending</option>
									<option value="DESC">Descending</option>
								</select>
								
							</td>					
						</tr>
					</table>
			</div>
			<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	
	<div id="tabLayer" name="tabLayer" style="display:none">  
			<div class= "opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>		
	</div>
	</div>
</div>
</div>
</div>
</form>
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
