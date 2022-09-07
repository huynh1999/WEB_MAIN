<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ItemInvList.jsp
*@FileTitle  : Item Inventory
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
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
    
    <script type="text/javascript" src="./apps/fis/wms/whinventory/js/ItemInvList.js?ver=<%=CLT_JS_VER%>"></script>  
	
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<%

String loc_cd 		= "";
String loc_nm 		= "";
String ctrt_no   = "";
String ctrt_nm   = "";
String wh_cd	 = ""; //wh_cd
String wh_nm	 = ""; //wh_nm
String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
}catch(Exception e) {
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
	<%boolean isBegin = false; %>
	var WHCDLIST = "";
	var WHNMLIST = "";
	<bean:define id="MsList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="MsList">
    	    <% if(isBegin){ %>
    	    WHCDLIST+= '|';
    	    WHNMLIST+= '|';
	    <% }else{
	          isBegin = true;
 	       } %> 
           WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
	</script>

<form id="form" name="form">

<input type="hidden" id="f_cmd"/>
<input type="hidden" name="f_CurPage"> 
<input type="hidden" name="out_cnt" value="0" /> 
<input type="hidden" name="user_id" value="ADMIN" />
<input type="hidden" name="org_cd" value="HJLK CORPORATION" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="ItemInvList.clt"/>

<div class="page_title_area clear">
		<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button>
 --%>		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
		<!-- page_location(E) -->
	</div>

<!-- opus_design_inquiry(S) -->

<div class= "over_wrap">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Warehouse"/></th>
						<td>	
								<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="wh_cd" id="wh_cd" class="search_form" style="width: 190px;" required>
									<option value=""></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>
						</td>
						<th><bean:message key="Contract_No"/></th>
						<td><input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:78px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10" OnKeyDown="if(event.keyCode==13){searchTlCtrtInfo();}"/><!--
						--><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!--						
						--><input name="ctrt_nm" id="ctrt_nm" type="text"  class="L_input" style="width:89px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){get_ctrt_no('EnterK');}"/>
							</td>
						<th><bean:message key="Inventory_by"/></th>
						<td>
							<!-- <script type="text/javascript">ComComboObject('inv_by_tp', 1, 215, 1);</script>-->
							<select id="inv_by_tp" name="inv_by_tp" onchange="inv_by_tp_OnChange(this,this,this,this,this,this,form.inv_by_tp.value);" style="width:186px;">
								<option value="ITEM">By Item</option>
								<option value="LOT">By Lot</option>
								<option value="LOC">By Location</option>
							</select>
						</td>
						<th><label for="lic_plat_no" id="lp_label" name="lp_label" style="display: none"><bean:message key="LP#"/></label></th>
						<td>
						<!-- OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS [More-request] -->
							<input name="lic_plat_no" id="lic_plat_no" type="text"  class="L_input" style="width:190px;ime-mode:disabled;text-transform:uppercase;  display:none" dataformat="engup" otherchar="<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);" onKeyDown=""/>
						</td>
					</tr>
					<tr>
<!-- 						//#5899 [OceanBlue-WMS] WMS inventory by Item Name -->
						<th>
							<select id="item_type" name="item_type">
								<option value="ITEM_CD"><bean:message key="Item_Code"/></option>
								<option value="ITEM_NM"><bean:message key="Item_Name"/></option>
						</select>
						</th>
						<td>
							<input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:190px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
						</td>
						<th>
							<!-- script type="text/javascript">ComComboObject('prop_no_tp', 1, 105, 1);</script>-->
							<select id="prop_no_tp" name="prop_no_tp">
								<option value="LOT_NO">Item Lot No.</option>
								<option value="LOT_ID">Lot ID</option>
								<option value="LOT_04">Lot 04</option>
								<option value="LOT_05">Lot 05</option>
							</select>
						</th>
						<td>	
							<input name="prop_no" otherchar="<%=WMS_OTHER_CHAR%>" type="text" class="L_input" id="prop_no" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20" />
						</td>
						<th>
							<select id="prop_date_tp" name="prop_date_tp">
								<option value="INBOUND_DT">Inbound Date</option>
								<option value="EXP_DT">Expiration Date</option>
							</select>
						</th>
						<td>
							<input name="prop_date_fm" id="prop_date_fm" type="text" class="L_input" maxlength="10" style="width:71px;"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this,this,form.prop_date_to);firCalFlag=false;"/><!-- 
							 --><!-- --><span class="dash">~</span><!--  
							  --><input name="prop_date_to" id="prop_date_to" type="text" class="L_input" maxlength="10" style="width:71px;"
							  onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_fm,this);firCalFlag=false;"/><!-- 
							 --><button class="calendar" type="button" name="btn_prop_date_to" id="btn_prop_date_to" style="ime-mode:disabled;" onClick="doWork('btn_prop_date_to');"></button>
						</td>
						<!-- #5893 [JNA] WMS Inventory report -->
						<th><label for="show_zero_volume">Show Zero Volume Item</label></th>
						<td><input type="checkbox" name="show_zero_volume" id="show_zero_volume" onclick = "flgChange(this);"></td>               
					</tr>
					<tr>
						<th><bean:message key="Location"/></th>
						<td><input name="wh_loc_nm" id="wh_loc_nm" type="text" class="L_input" style="width:161px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo('c')" OnKeyDown="if(event.keyCode==13){doWork('btn_wh_loc_cd');}" onChange="getLocationInfo('c')"/><!--
							--><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_wh_loc_cd');"></button><!--
							--><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" />
						</td>
						<th>
							<select id="prop_bk_tp" name="prop_bk_tp">
								<option value="CUST_NO">In Customer Order No.</option>
								<option value="IB_NO">In Booking No.</option>
							</select>	
						</th>
						<td>
							<input name="prop_bk_no" id="prop_bk_no" otherchar="()_\-,.& " type="text" class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="100"/>
						</td>
						<th><bean:message key="Reference_No"/></th>
						<td>
							<input name="ref_no" otherchar="()_\-,.& " id = "ref_no" type="text" class="L_input" style="width:186px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"  maxlength="100"/>
						</td>
						<!-- OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS -->
						<th><label hidden="hidden" id="barcode_label" name="barcode_label"><bean:message key="Barcode_No"/></label></th>
						<td><input name="barcode_no" type="text" id="barcode_no"  dataformat="excepthan" style="width:190px;ime-mode:disabled;text-transform:uppercase; display:none"  maxlength="400"/></td>
<!-- 						<th>In Booking No</th> -->
<!-- 						<td>  -->
<!-- 							<input name="wib_bk_no" id = "wib_bk_no" type="text" class="L_input"   maxlength="100" style="width:200px;text-transform:uppercase;" /> -->
<!-- 						</td> -->
<!-- 						<th>Customer Order No</th> -->
<!-- 						<td> -->
<!-- 							<input name="cust_ord_no" id = "cust_ord_no" type="text" class="L_input"   maxlength="100" style="width:215px;text-transform:uppercase;"/> -->
<!-- 						</td> -->
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->

	<div class="wrap_result">
		<div class="opus_design_grid clear" id="div_sheet_item">
			<script type="text/javascript">	comSheetObject('sheet1');
			</script>
		</div>
		<div class="opus_design_grid clear" id="div_sheet_lot" style="display: none;">
			<script type="text/javascript"> comSheetObject('sheet2');
			</script>
		</div>
		<div class="opus_design_grid clear" id="div_sheet_loc" style="display: none;">
			<script type="text/javascript">	comSheetObject('sheet3');
			</script>
		</div>
		<div> 
			  <table>
			           <tr>
							<td width="100">
								<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
								<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
								<paging:options name="pagingVal" defaultval="200"/>
							</td>
							<td align="center" width="900">
								<table width="900">
									<tr>
										<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
										</td>
									</tr>
								</table>		
							</td>
						<td width="100"></td>
					</tr>
			   </table>
		 </div>
	</div>
</div>	
</form>

  
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>	
