<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0040.js
*@FileTitle  : Option
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage()
		{
			
		}
	</script>
<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST">
	<input type="hidden" id="open_type" name="open_type" value="<bean:write name="tmpMap" property="open_type"/>"/>
	<input type="hidden" id="inv_no" name="inv_no" value="<bean:write name="tmpMap" property="inv_no"/>"/> 
	<input type="hidden" id="air_sea_clss_cd" name="air_sea_clss_cd" value="<bean:write name="tmpMap" property="air_sea_clss_cd"/>"/>
	<input type="hidden" id="sell_buy_tp_cd" name="sell_buy_tp_cd" value="<bean:write name="tmpMap" property="sell_buy_tp_cd"/>"/>
	<input type="hidden" id="frt_ask_clss_cd"  name="frt_ask_clss_cd" value="<bean:write name="tmpMap" property="frt_ask_clss_cd"/>"/>
	<logic:equal name="tmpMap" property="open_type" value="L">
		<input type="hidden" id="s_inv_sts_cd" name="s_inv_sts_cd" value="<bean:write name="tmpMap" property="s_inv_sts_cd"/>"/>
		<input type="hidden" id="sel_strdt" name="sel_strdt" value="<bean:write name="tmpMap" property="sel_strdt"/>"/>
		<input type="hidden" id="sel_enddt" name="sel_enddt" value="<bean:write name="tmpMap" property="sel_enddt"/>"/>
		<input type="hidden" id="usr_cd" name="usr_cd" value="<bean:write name="tmpMap" property="usr_cd"/>"/>
		<input type="hidden" id="dept_cd" name="dept_cd" value="<bean:write name="tmpMap" property="dept_cd"/>"/>
		<input type="hidden" id="trdp_cd" name="trdp_cd" value="<bean:write name="tmpMap" property="trdp_cd"/>"/>
		<input type="hidden" id="date_cd" name="date_cd" value="<bean:write name="tmpMap" property="date_cd"/>"/>
	</logic:equal>
	<logic:equal name="tmpMap" property="open_type" value="S">
		<input type="hidden" id="hid_air_sea_clss_cd" name="hid_air_sea_clss_cd" value="<bean:write name="tmpMap" property="hid_air_sea_clss_cd"/>"/>
		<input type="hidden" id="hid_bnd_clss_cd" name="hid_bnd_clss_cd" value="<bean:write name="tmpMap" property="hid_bnd_clss_cd"/>"/>
		<input type="hidden" id="hid_trdp_cd" name="hid_trdp_cd" value="<bean:write name="tmpMap" property="hid_trdp_cd"/>"/>
		<input type="hidden" id="hid_curr_cd" name="hid_curr_cd" value="<bean:write name="tmpMap" property="hid_curr_cd"/>"/>
		<input type="hidden" id="clt_cmpl_flg" name="clt_cmpl_flg" value="<bean:write name="tmpMap" property="clt_cmpl_flg"/>"/>
		<input type="hidden" id="fm_et_dt" name="fm_et_dt" value="<bean:write name="tmpMap" property="fm_et_dt"/>"/>
		<input type="hidden" id="to_et_dt" name="to_et_dt" value="<bean:write name="tmpMap" property="to_et_dt"/>"/>
		<input type="hidden" id="inv_sts_cd" name="inv_sts_cd" value="<bean:write name="tmpMap" property="inv_sts_cd"/>"/>
		<input type="hidden" id="dept_cd" name="dept_cd" value="<bean:write name="tmpMap" property="dept_cd"/>"/>
		<input type="hidden" id="date_cd" name="date_cd" value="<bean:write name="tmpMap" property="date_cd"/>"/>
	</logic:equal>
	<logic:equal name="tmpMap" property="open_type" value="GL">
		<input type="hidden" id="date_cd" name="date_cd" value="<bean:write name="tmpMap" property="date_cd"/>"/>
		<input type="hidden" id="fm_rgst_dt" name="fm_rgst_dt" value="<bean:write name="tmpMap" property="fm_rgst_dt"/>"/>
		<input type="hidden" id="to_rgst_dt" name="to_rgst_dt" value="<bean:write name="tmpMap" property="to_rgst_dt"/>"/>
		<input type="hidden" id="bkg_no" name="bkg_no" value="<bean:write name="tmpMap" property="bkg_no"/>"/>
		<input type="hidden" id="inv_no" name="inv_no" value="<bean:write name="tmpMap" property="inv_no"/>"/>
		<input type="hidden" id="slip_no" name="slip_no" value="<bean:write name="tmpMap" property="slip_no"/>"/>
		<input type="hidden" id="cs_trdp_cd" name="cs_trdp_cd" value="<bean:write name="tmpMap" property="cs_trdp_cd"/>"/>
		<input type="hidden" id="lr_trdp_cd" name="lr_trdp_cd" value="<bean:write name="tmpMap" property="lr_trdp_cd"/>"/>
		<input type="hidden" id="inv_sts_cd" name="inv_sts_cd" value="<bean:write name="tmpMap" property="inv_sts_cd"/>"/>
		<input type="hidden" id="cntr_no" name="cntr_no" value="<bean:write name="tmpMap" property="cntr_no"/>"/>
	</logic:equal>
	
	<input type="hidden" name="title" id="title"/>
	<input type="hidden" name="cmd_type" id="cmd_type"/>
	<input type="hidden" name="stamp" id="stamp"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title"><bean:message key="Option"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>		
		<!-- opus_design_btn(E) -->
		</div>
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation">
			<%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span>
			</span>
		</div>
		<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
  		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<tbody>
					<colgroup>
						<col width="150" />
						<col width="*" />
					</colgroup>
	            	<tr>
		                <td><b><bean:message key="Document_Type"/></b></td>
		                <td></td>
		            </tr>
		            <tr>
		                <td><input type="radio" name="doc_type" id="doc_type"  value="Y" checked="checked"><label for="doc_type1"><bean:message key="Internal"/></label></td>
		                <td><input name="doc_type"  id="doc_type2" type="radio" value="N"><label for="doc_type2"><bean:message key="External"/></label></td>
	              	</tr>
	            	<tr>
		                <td><b><bean:message key="Approval_Stamp"/></b></td>
		                <td></td>
		            </tr>
		            <tr>
		            	<td><input name="app_stamp" id="app_stamp" type="radio" value="Y" checked="checked"><label for="app_stamp">YES</label></td>
		                <td><input name="app_stamp" id="app_stamp2" type="radio" value="N"><label for="app_stamp2">NO</label></td>
		            </tr>
	            	<tr>
		                <td><b><bean:message key="Remark"/></b></td>
		                <td></td>
		            </tr>
		            <tr>
		            	<td colspan="2">
		            	<textarea name="remark" class="search_form" style="width:280px;height:100px" ><bean:write name="tmpMap" property="remark"/></textarea>
		                </td>
		            </tr>
				</tbody>	
			</table>
		</div>	
	</div>		
</div>
</form>





