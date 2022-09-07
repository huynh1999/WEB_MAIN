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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/outboundmanagement/script/LoadingPlanWavePopup.js?ver=<%=CLT_JS_VER%>"></script>
<%

	String wave_no = "";
	String consol_no = "";
	String wh_cd = "";
	try {
		wave_no = request.getParameter("wave_no") == null ? "" : request.getParameter("wave_no");
		consol_no = request.getParameter("consol_no") == null ? "" : request.getParameter("consol_no");
		wh_cd = request.getParameter("wh_cd") == null ? "" : request.getParameter("wh_cd");
		
	} catch (Exception e) {
		out.println(e.toString());
	}
%>
</head>

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
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>">
<input type="hidden" name="org_cd"  value="<%=userInfo.getOfc_cd()%>">
<%-- <input type="hidden" name="paper_size" id="paper_size" value="<%=userInfo.getPaper_size()%>" /> --%>
<input type="hidden" name="consol_no" id="consol_no" value="<%=consol_no%>"/>
<input type="hidden" name="wh_cd" id="wh_cd" value="<%=wh_cd%>"/>
<input type="hidden" name="f_cmd" id="f_cmd" value="" />
<input type="hidden" name="eq_tp_cd" id="eq_tp_cd" />
<input name="lp_id_cnt" type="hidden" id="cntr_qty" />
<div class="page_title_area clear">
		<h2 class="page_title">
			<span><bean:message key="Loading_Plan"/></span>
		</h2>
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnDelete" id="btnDelete" onClick="doWork('DELETE');"><bean:message key="Delete"/></button><!--
			 --><button type="button" class="btn_normal" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');" style="display: none"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
</div>
<div id="showseal" style="left: 415px;top: 242px;position: absolute;display: none;z-index: 9999;height: 131px;width: 220px;border: 4px solid #aacef4;visibility: visible;color: black;background-color: white;padding: 5px;">
	<div>
		<h3><bean:message key="Seal_No"/></h3>
		<table class = "grid_2">
			<tr>
				<td>
					<input name="seal_no1" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no1" maxlength="30" dataformat="excepthan" onblur="strToUpper(this);" />
				</td>
			</tr>
			<tr>
				<td>
					<input name="seal_no2" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no2" maxlength="30" dataformat="excepthan" onblur="strToUpper(this);" />
				</td>
			</tr>
			<tr>
				<td>
					<input name="seal_no3" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100%" id="seal_no3" maxlength="30" dataformat="excepthan" onblur="strToUpper(this);" />
				</td>
			</tr>
		</table>
	</div>
	<div align="center">
          <button align="center" class="btn_etc" type="button" onclick="btn_seal_OK();"><bean:message key="OK"/></button><!-- 
		--><button align="center" class="btn_etc" type="button" onclick="btn_seal_Close();"><bean:message key="Close"/></button>
	</div>
</div>
<div class="wrap_search">
	<div class="opus_design_inquiry sm ">			
		<table border = "0">
		    <colgroup>
                   <col width="11%" />
                   <col width="" />
                   <col width="13%" />
                   <col width="24%"/>
               </colgroup>
			<tr>
				<th><bean:message key="Wave_No"/></th>
				<td>
					<input name="wave_no" id = "wave_no" value ="<%=wave_no%>" type="text" dataformat="etc" maxlength="18" readOnly tabindex="-1" style="width:125px"/>
				</td>
				<th><bean:message key="Loading_Date"/></th>
				<td>
					<input name="load_dt" id="load_dt" type="text" dataformat="mdy" maxlength="10" style="width:80px;"  onkeypress="onlyNumberCheck();" 
					onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
					onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;"/><!-- 
					 --><button type="button" class="calendar" tabindex="-1" name="btn_load_dt" id="btn_load_dt" onclick="doDisplay('DATE1', form);"></button><!-- 
					 --><input name="load_hm_fr" id="load_hm_fr" type="text" style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this,form.load_hm_fr, form.load_hm_to)"/><!-- 
					 --><span class="dash">~</span><!--   --><input name="load_hm_to" id="load_hm_to" type="text" style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this,form.load_hm_fr, form.load_hm_to)"/>
				</td>
			</tr>
		</table>
	</div>
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	<div class="opus_design_inquiry sm">			
		<table border = "0">
		    <colgroup>
                   <col width="13%" />
                   <col width="" />
                   <col width="7%" />
                   <col width="13%" />
                   <col width="7%" />
                   <col width="13%" />
                   <col width="7%" />
                   <col width="13%" />
                   <col width="7%" />
                   <col width="13%" />
               </colgroup>
			<tr>
				<th><bean:message key="Total_Volume"/></th>
				<td>
				</td>
				<th><bean:message key="Qty"/></th>
				<td>
					<input name="ttl_qty" type="text" id="ttl_qty" style="width:60px;text-align:right;" readonly/>
				</td>
				<th><bean:message key="CBM"/></th>
				<td>
					<input name="ttl_cbm" type="text" id="ttl_cbm" style="width:60px;text-align:right;" readonly/>
				</td>
				<th><bean:message key="GWT"/></th>
				<td>
					<input name="ttl_grs_kgs" type="text" id="ttl_grs_kgs" style="width:60px;text-align:right;" readonly/>
				</td>
				<th><bean:message key="NWT"/></th>
				<td>
					<input name="ttl_net_kgs" type="text" id="ttl_net_kgs" style="width:60px;text-align:right;" readonly/>
				</td>
			</tr>
		</table>
	</div>
	<div class="opus_design_grid">
		<div class="grid_option_left">
	  				<div class= "opus_design_inquiry">
				 	<table width="100%" border="0">
			           	<colgroup>
			           		<col width="12" />
			           		<col width="16" />
			           		<col width="10" />
			           		<col width="11" />
			           		<col width="8" />
							<col width="" />
						</colgroup>
						<tr>
							<td>
						 	<button  type="button" class="btn_down_list" id="btn_Down" name="btn_Down" onClick="doWork('btn_Down');"></button><!-- 
						 --><button type="button" class="btn_up_list" id="btn_Up" name="btn_Up" onClick="doWork('btn_Up');"></button>
							</td>
							<th><bean:message key="CNTRTR_Type"/></th>
							<td><input name="lp_id" type="text" dataformat="excepthan" id="cntr_tp" style="ime-mode:disabled;text-transform:uppercase;width:70px;" maxlength="4" onChange="getEq_tp_cd(this)" onKeyDown="if(event.keyCode==13){getEq_tp_cd(this);}" onblur="strToUpper(this);"/><!-- 
	                             --><button type="button" name="btn_cntr_tp" id="btn_cntr_tp" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_cntr_tp')"></button><!--    
	                      		 --><th><bean:message key="CNTR_TR_NO"/></th><!-- 
	                      		 --><td><input name="eq_no" id="eq_no" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100px;" dataformat="excepthan" onblur="strToUpper(this);" maxlength="20" readonly /></td>
	                      	<th><bean:message key="Seal_No"/></th><!-- 
							 --><td>
								<input name="seal_no" id="seal_no" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100px;" dataformat="excepthan" onblur="strToUpper(this);" readonly /><!-- 
								 --><button type="button" class="multiple_inq" tabindex="-1" name="btn_seal_no" id="btn_seal_no" onclick="doWork('btn_seal_no')"></button>
								<input type="hidden" id="eq_no_edit" name="eq_no_edit" />
								<input type="hidden" id="seal_no_edit" name="seal_no_edit" />
								<input type="hidden" id="eq_tpsz_cd_edit" name="eq_tpsz_cd_edit" />
								<input type="hidden" id="sel_lp_id" name="sel_lp_id" />
								<input type="hidden" id="sel_lp_seq" name="sel_lp_seq" />
							</td>
	                      </tr>
					</table>
				</div>	
		</div>
    			<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
		 	<button type="button" class="btn_normal" name="btn_Add" id="btn_Add" onClick="doWork('btn_Add');"><bean:message key="Add"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Del" id="btn_Del" onClick="doWork('btn_Del');"><bean:message key="Del"/></button><!-- 
		 --><button type="button" class="btn_normal" name="" id="" onClick="doWork('btn_Save');"><bean:message key="Save"/></button>
		 </div>
		<!-- opus_design_btn(E) -->
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
	<div class="opus_design_inquiry sm">			
			<table border = "0">
			    <colgroup>
                    <col width="13%" />
                    <col width="" />
                    <col width="7%" />
                    <col width="13%" />
                    <col width="7%" />
                    <col width="13%" />
                    <col width="7%" />
                    <col width="13%" />
                    <col width="7%" />
                    <col width="13%" />
                </colgroup>
				<tr>
					<th><bean:message key="Loading_Volume"/></th>
					<td>
					</td>
					<th><bean:message key="Qty"/></th>
					<td>
						<input name="loading_qty" type="text" id="loading_qty" style="width:60px;text-align:right;" readonly/>
					</td>
					<th><bean:message key="CBM"/></th>
					<td>
						<input name="loading_cbm" type="text" id="loading_cbm" style="width:60px;text-align:right;" readonly/>
					</td>
					<th><bean:message key="GWT"/></th>
					<td>
						<input name="loading_grs_kgs" type="text" id="loading_grs_kgs" style="width:60px;text-align:right;" readonly/>
					</td>
					<th><bean:message key="NWT"/></th>
					<td>
						<input name="loading_net_kgs" type="text" id="loading_net_kgs" style="width:60px;text-align:right;" readonly/>
					</td>
				</tr>
			</table>
		</div>
</div>
<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>
</form>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>