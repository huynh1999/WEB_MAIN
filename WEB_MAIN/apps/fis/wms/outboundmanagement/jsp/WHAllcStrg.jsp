<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInList.jsp
*@FileTitle  : Inbound Search
*@author     : Tien.Duong - DOU Network
*@version    : 1.0
*@since      : 2016/08/31
=========================================================--%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/outboundmanagement/script/WHAllcStrg.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String DEF_WH_CTRT_NO = "";
	String DEF_WH_CTRT_NM = "";
	String DEF_WH_CD = "";
	String DEF_WH_NM = "";
	try {
		DEF_WH_CTRT_NO  = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
		DEF_WH_CTRT_NM  = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
		DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
		DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
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
		loadPage();
	}
</script>
<form id="form" name="form">
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="space_tp_cd" name="cdMap" property="space_tp_cd"/>
<bean:define id="lot_pri" name="cdMap" property="lot_pri"/>
<bean:define id="loc_pri" name="cdMap" property="loc_pri"/>
<bean:define id="put_tp_cd" name="cdMap" property="put_tp_cd"/>
<bean:define id="use_flg_cd" name="cdMap" property="use_flg_cd"/>
<script language="javascript">    
	var cmbData_sort= "ASC|DESC";
	var cmbData_space_tp_cd = "";
	var cmbData_space_tp_cd_nm = "";
	var cmbData_lot_pri = "";
	var cmbData_lot_pri_nm = "";
	var cmbData_loc_pri = "";
	var cmbData_loc_pri_nm = "";
	var cmbData_put_tp_cd = "";
	var cmbData_put_tp_cd_nm = "";
	var cmbData_use_flg_cd = "";
	var cmbData_use_flg_cd_nm = "";
   	<logic:iterate id="codeVO" name="space_tp_cd">
   		cmbData_space_tp_cd += '<bean:write name="codeVO" property="code"/>'+'|' ;
   		cmbData_space_tp_cd_nm += '<bean:write name="codeVO" property="name"/>'+'|';
   	</logic:iterate>
   	<logic:iterate id="codeVO" name="lot_pri">
   		cmbData_lot_pri += '<bean:write name="codeVO" property="code"/>' + '|';
   		cmbData_lot_pri_nm += '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
	<logic:iterate id="codeVO" name="loc_pri">
		cmbData_loc_pri += '<bean:write name="codeVO" property="code"/>' + '|';
		cmbData_loc_pri_nm += '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
	<logic:iterate id="codeVO" name="put_tp_cd">
		cmbData_put_tp_cd += '<bean:write name="codeVO" property="code"/>' + '|';
		cmbData_put_tp_cd_nm += '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
	<logic:iterate id="codeVO" name="use_flg_cd">
		cmbData_use_flg_cd += '<bean:write name="codeVO" property="code"/>' + '|';
		cmbData_use_flg_cd_nm += '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
</script>
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" id="f_cmd"/>

<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WHAllcStrg.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><span id="bigtitle"><%=LEV3_NM%></span></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> class="btn_accent" name="btnSearch" id="btnSearch" onClick="doWork('SEARCHLIST');" ><bean:message key="Search"/></button><!-- 
		 --><button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %>  class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');" ><bean:message key="Save"/></button>
 --%>	</div>
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
		<div class="opus_design_inquiry entry_pannel">
			<table>
	        	<colgroup>
	            	<col width="50" />
	                <col width="150" />
	                <col width="50" />
	                <col width="150" />
	                <col width="*" />
	            </colgroup>
	            <tr>
					<th><bean:message key="Strategy_Key"/></th>
					<td><input name="strg_cd" type="text" id="strg_cd" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" maxlength="10" onkeydown="if(event.keyCode==13){doWork('SEARCHLIST');}" onKeyPress="ComKeyOnlyAlphabet('uppernum');"/>						
					<th><bean:message key="Use"/></th>
					<td>
						<select name="use_flg" id="use_flg" style="width:80px">
							<option value="ALL" selected>ALL</option>
	                        <option value="Y">Y</option>
	                        <option value="N">N</option>
	                	</select>
					</td>
					<td></td>
				</tr>
	    	</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
	<div class="wrap_result">
		<!-- #2324 [WMS4.0] SHIPPING STRATEGY IMPROVEMENT(S) -->
		<div style="width: 80%; float: left;">
			<table>
				<tr height="12px">
					<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;* When selected, this strategy would apply to all your outbound inventory allocation as default and cannot be changed per outbound file.</th>
				</tr>
			</table>
		</div>
		<!-- #2324 [WMS4.0] SHIPPING STRATEGY IMPROVEMENT(E) -->
		<div class="opus_design_grid" id="mainTable">
			<div class="opus_design_btn">
			   <button type="button" class="btn_normal" onclick="btnAdd();" id="gridAdd" ><bean:message key="Add"/></button>			
			   <!-- <button type="button" class="btn_normal" onclick="btnDel();" id="gridDel"><bean:message key="Del"/></button> -->
			</div>
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>	
</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>	