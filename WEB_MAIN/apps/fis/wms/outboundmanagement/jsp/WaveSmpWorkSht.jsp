<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutWorkSht.jsp
*@FileTitle  : Outbound Worksheet
*@author     : Khoa.Nguyen - DOU Network
*@version    : 1.0
*@since      : 2016/04/26
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
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/outboundmanagement/script/WaveSmpWorkSht.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String wave_no = "";
	String allc_cnt_tot = "";
	String lp_cnt_tot = "";
	
	try {
		wave_no = request.getParameter("wave_no") == null ? "" : request.getParameter("wave_no");
		allc_cnt_tot = request.getParameter("allc_cnt_tot") == null ? "0" : request.getParameter("allc_cnt_tot");
		lp_cnt_tot = request.getParameter("lp_cnt_tot") == null ? "0" : request.getParameter("lp_cnt_tot");
	} catch (Exception e) {
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
<input type="hidden" name="paper_size" id="paper_size" value="" />
<input type="hidden" name="f_cmd" id="f_cmd" value="" />
<input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="lp_cnt_tot" id="lp_cnt_tot" value="<%=lp_cnt_tot%>"/>
<input type="hidden" name="allc_cnt_tot" id="allc_cnt_tot" value="<%=allc_cnt_tot%>" />
<input type="hidden" id="title" name="title" value=""/>
<input type="hidden" id="file_name" name="file_name" value=""/>
<input type="hidden" id="rd_param" name="rd_param" value=""/>
<div class="page_title_area clear">
		<h2 class="page_title">
			<span><bean:message key="Outbound_Worksheet"/></span>
		</h2>
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!--
			 --><button type="button" class="btn_normal" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
</div>
<div class="wrap_search">
			<div class="opus_design_inquiry ">			
				<table>
				    <colgroup>
	                    <col width="100" />
	                    <col width="300" />
	                    <col width="50" />
	                    <col width="*" />
	                </colgroup>
	                <tr>
				        <th><bean:message key="Wave_No"/></th>
				        <td colspan="3">
				        	<input name="wave_no" id="wave_no" type="text" class="input" style="width:100px;" readonly tabindex="-1" value="<%=wave_no%>"/>
				        	<input type="hidden" name="pick_sht_yn" id="pick_sht_yn" />
				        	<input type="hidden" name="wh_cd" id="wh_cd" />		     
				        </td>   
			        </tr>                
					<tr>
						<th><bean:message key="Picking_Date"/></th>
						<td>
							<input name="pick_dt" id="pick_dt" type="text"  style="width:80px;" dataformat="mdy" maxlength="10" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" /><!-- 						
							 --><button type="button" class="calendar" tabindex="-1" name="btn_pick_dt" id="btn_pick_dt" onclick="doDisplay('DATE1', form);"></button><!-- 
							 --><input name="pick_hm_fr" id="pick_hm_fr" type="text"  style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this,form.pick_hm_fr, form.pick_hm_to)" /><!-- 
							 --><span class="dash">~</span><!-- 
							 --><input name="pick_hm_to" id="pick_hm_to" type="text"  style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this,form.pick_hm_fr, form.pick_hm_to)"  />
						</td>
						<th><bean:message key="Supervisor"/></th>
						<td>
							<input name="supv_nm" id="supv_nm" type="text" maxlength="100" style="width: 100%;ime-mode:disabled;text-transform:uppercase;" onblur="strToUpper(this);"/>
						</td>  					                                        
					</tr>
					<tr>
						<th><bean:message key="Loading_Date"/></th>
						<td>
							<input name="load_dt" id="load_dt" type="text"  style="width:80px;" dataformat="mdy" maxlength="10" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" /><!-- 						
							 --><button type="button" class="calendar" tabindex="-1" name="btn_load_dt" id="btn_load_dt" onclick="doDisplay('DATE2', form);"></button><!-- 
							 --><input name="load_hm_fr" id="load_hm_fr" type="text"  style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this,form.load_hm_fr, form.load_hm_to)"  /><!-- 
							 --><span class="dash">~</span><!-- 
							 --><input name="load_hm_to" id="load_hm_to" type="text"  style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this,form.load_hm_fr, form.load_hm_to)"  />				 
						
						</td>
						<th><bean:message key="Picking_PIC"/></th>
						<td>
							<input name="pick_by" id="pick_by" type="text"  maxlength="100" style="ime-mode:disabled;text-transform:uppercase;" onblur="strToUpper(this);"/>
						</td>
	                </tr>      
					<tr>
						<th><bean:message key="Gate_No"/></th>
						<td>
							<input name="gate_no" id="gate_no" type="text"  maxlength="10" style="width:170px;ime-mode:disabled;text-transform:uppercase;" onblur="strToUpper(this);"/>
						</td> 
						<th><bean:message key="To_Loc"/></th>
						<td>
							<input name="outbound_loc_nm" id="outbound_loc_nm" type="text"  maxlength="10" style="width:100px;ime-mode:disabled;text-transform:uppercase;" onkeyup="strToUpper(this);" onblur="strToUpper(this);getOutboundLocInfo(this);" dataformat="etc"  /><!-- 
							 --><button type="button" name="btn_outbound_loc_cd" id="btn_outbound_loc_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_outbound_loc_cd')"></button><!-- 
							 --><input type="hidden" name="outbound_loc_cd" id="outbound_loc_cd" />
						</td>
					</tr>
					<tr>
						<th><bean:message key="Working_Instruction"/></th>
						<td colspan="3">
							<textarea name="msg_to_pick" id="msg_to_pick" style="height:50px;ime-mode:disabled;text-transform:uppercase;" onblur="strToUpper(this);" class="L_textarea" maxlength="100"></textarea>				 
						</td>
	                </tr>
				</table>
				<table class="line_bluedot"><tr><td></td></tr></table>
				
				<div class='layout_wrap'>
					<div class="layout_flex_fixed" style="width:500px;">
						<div class="opus_design_inquiry">
							<table>
							    <colgroup>
				                    <col width="120" />
				                    <col width="180" />
				                    <col width="50" />
				                    <col width="*" />
				                </colgroup>  
				                <tr>
					                <th rowspan="4"><bean:message key="Print_Option"/></th>
					                <th><label for="chOptWorkSht"><bean:message key="Outbound_WorkSheet"/></label></th>
					                <td>
					                	<input type="checkbox" name="chOptWorkSht" id="chOptWorkSht" />
					                </td>
				                </tr>
				                <tr>
					                <th><bean:message key="Picking_Sheet"/></th>
					                <td>
					                	<span class="dash">[&nbsp;&nbsp;&nbsp;</span><input type="checkbox" name="chOptPickShtByOrder" id="chOptPickShtByOrder" onclick="pick_opt_change('ORDER');"/><label for="chOptPickShtByOrder"><bean:message key="Order"/></label>
					                </td>
					                <td>
										<input type="checkbox" name="chOptPickShtByWave" id="chOptPickShtByWave" onclick="pick_opt_change('SKU');pick_by_sku_onclick(this);" /><label for="chOptPickShtByWave"><bean:message key="Wave"/></label><span class="dash">&nbsp;&nbsp;&nbsp;]</span>
					                </td>
				                </tr>
				                
				                <tr>
					                <th><bean:message key="Sorting_Sheet"/></th>
					                <td>
					                	<span class="dash">[&nbsp;&nbsp;&nbsp;</span><input type="checkbox" name="chOptSortSht" id="chOptSortSht" /><label for="chOptSortSht"><bean:message key="Ship_To"/></label><span class="dash">&nbsp;&nbsp;&nbsp;]</span>
					                </td>
				                </tr>
				                <tr>
					                <th><bean:message key="Outbound_HO_Manifest"/></th>
					                <td>
					                	<span class="dash">[&nbsp;&nbsp;&nbsp;</span><input type="checkbox" name="chOptHOManifestShtByShipTo" id="chOptHOManifestShtByShipTo" onclick="complete_opt_change('SHIPTO');"/><label for="chOptHOManifestShtByShipTo"><bean:message key="Ship_To"/></label>
					                </td>
					                <td>
										<input type="checkbox" name="chOptHOManifestShtByOrder" id="chOptHOManifestShtByOrder" onclick="complete_opt_change('ORDER');"/><label for="chOptHOManifestShtByOrder"><bean:message key="Order"/></label><span class="dash">&nbsp;&nbsp;&nbsp;]</span>
					                </td>
				                </tr>
				                <tr>
				                	<th></th>
					                <th><label for="chOptGoodsIssue"><bean:message key="GOODS_ISSUE"/></label></th>
					                <td>
					                	<input type="checkbox" name="chOptGoodsIssue" id="chOptGoodsIssue" />
					                </td>
				                </tr>                                               
							</table>
						</div>
					</div>
					<div class="layout_flex_flex" style="padding-left:508px;" >
					<div class="opus_design_inquiry">
						<table>
							<colgroup>
								<col width="100">
								<col width="*">
							</colgroup>
							<tr>
								<th><bean:message key="Print_LOT_Type"/></th>
								<td>
									<select name="prn_lot_tp" id="prn_lot_tp" style="width:120px">
										<option value="LOT01">Inbound Date</option>
										<option value="LOT02" selected="selected">LOT NO</option>
										<option value="LOT03">Expiration Date</option>
										<option value="LOT03">LOT04</option>
										<option value="LOT04">LOT05</option>
									</select>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Picking_Unit"/></th>
								<td>
									<select name="pick_unit" id="pick_unit" style="width:120px">
										<option value="" selected></option>
										<option value="EA">Handling Unit</option>
										<option value="IN">Package Unit</option>
										<option value="BX">Palletization</option>
									</select>
								</td>
							</tr>
						</table>
					</div>
				</div>
				</div>
		</div>
		<div class="opus_design_grid clear"  style="display:none;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div id="printArea" name="printArea"></div>
	</div>
	<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>
</form>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>