<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  MDM_MCM_0160.jsp
*@FileTitle  :  Freight Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/06
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/freight/script/MDM_MCM_0160_NW.js?ver=<%=CLT_JS_VER%>"></script>
	

	<%
		String ofc_cd		= userInfo.getOfc_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		<!-- 처리시 메시지 -->
		var CNF_MSG1 = '<bean:message key="Do_you_want_to_run"/>';
		var PARAM1_1 = ' |';
		var PARAM1_2 = ' |';
		var PARAM2_1 = ' |';
		var PARAM2_2 = ' |';		
		var PARAM4_1 = ' |';
		var PARAM4_2 = ' |';
		var PARAM5_1 = ' |';
		var PARAM5_2 = ' |';
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
		<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
		<logic:iterate id="codeVO" name="param1List">
			<% if(isBegin){ %>
				PARAM1_1+= '|';
				PARAM1_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>

		<% isBegin = false; %>
		<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
		<logic:iterate id="codeVO" name="param2List">
			<% if(isBegin){ %>
				PARAM2_1+= '|';
				PARAM2_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM2_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>

	    <% isBegin = false; %>
	    <bean:define id="param4List"  name="rtnMap" property="GL_CODE"/>
		<logic:iterate id="glVO" name="param4List">
			<% if(isBegin){ %>
				PARAM4_1+= '|';
				PARAM4_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM4_1+= '<bean:write name="glVO" property="gl_cd"/>' + ' [' + '<bean:write name="glVO" property="rmk"/>' + ']';
	        PARAM4_2+= '<bean:write name="glVO" property="gl_cd"/>';
	    </logic:iterate>


	    <% isBegin = false; %>
	    <bean:define id="param5List"  name="rtnMap" property="PARAM4"/>
		<logic:iterate id="codeVO" name="param5List">
			<% if(isBegin){ %>
				PARAM5_1+= '|';
				PARAM5_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM5_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM5_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>	    
	  //#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
	var ofc_cd = "<%=ofc_cd%>";
	var vat_rt_dp_cnt = "0";
	var xch_rt_dp_cnt = "4";
	    
	function setupPage(){
		loadPage();
	}

	</script>
 <form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="trdp_cd" id="trdp_cd" />
	<input type="hidden" name="frt_cd_s" id="frt_cd_s" />
	<input type="hidden" name="s_cd_tp_cd" id="s_cd_tp_cd" value="BL" />
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
		<%-- 
			<button style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr1()%>" type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" ><bean:message key="Search" /></button> 
			<button style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr3()%>" type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button> 
			<button id="btnModify" style="cursor:hand;display:none;" btnAuth="<%= roleBtnVO.getAttr3()%>" type="button" class="btn_normal" onclick="doWork('MODIFY')"><bean:message key="Save"/></button> 
			<button id="btnExcel" style="cursor:hand;display:none;"  btnAuth="<%= roleBtnVO.getAttr6() %>"  type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
					 --%>
		</div>
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
	<!-- page_title_area(E) -->
	
	<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="60">
				<col width="60">
				<col width="140">
				<col width="210">
  				<col width="100">
				<col width="60">
				<col width="130">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Code"/></th>
					<td >
						<input type="text" name="s_bill_cd" maxlength="10" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" onKeyPress="fncSearch('uppernum','45|47')" id="s_bill_cd" />
						</td>
					<th><bean:message key="Name" /></th>	
					<td>
						<input type="text" name="s_bill_nm" maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onKeyPress="fncSearch()" id="s_bill_nm" />
						</td>
					<th><bean:message key="GL_Code"/></th>
					<td >
							<input type="text" name="s_gl_cd" maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="fncSearch('uppernum')">
							</td>
					<th><%-- <bean:message key="Office"/> --%></th>
					<td>
							<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
							<bean:define id="oficeList" name="valMap" property="ofcList"/>
							<input type="hidden" name="s_ofc_cd" id="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/> 
                            <select style="display:none;" name="f_ofc_cd" id="f_ofc_cd" style="width:105px" onchange="doWork('SEARCHLIST')">
	                         <bean:size id="len" name="oficeList" />
	                         <logic:greaterThan name="len" value="1">
	                         <option value=''>ALL</option>
	                         </logic:greaterThan>
	                         <logic:iterate id="ofcVO" name="oficeList">
	                         <logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                         <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         </logic:equal>
	                         <logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                         <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         </logic:notEqual>
	                         </logic:iterate>
                 			</select>
					</td>
				</tr>
			</table>
	</div>
	<!-- opus_design_inquiry(E) -->
	</div>
	<div class="wrap_result">
	<div class="layout_wrap">
		<div class="layout_vertical_3 mar_left_4" style="width:69%;">							
			<div class="opus_design_grid">
				<div>
					<table>												
							<tr>
								<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;* Modifying current Billing Codes and G/L Codes in the system may cause discrepancies in accounting figures.</th>
								<td></td>
							</tr>
							<tr>
								<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please contact an OPUS Forwarding consultant before making this change at Logistics.helpdesk@cyberlogitec.com, support.us@cyberlogitec.com, support.cn@cyberlogitec.com.</th>
								<td>
									<div class="opus_design_btn">
							     		<button type="button"  class="btn_normal" name="btnAdd" id="btnAdd" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
							     		<button type="button"  class="btn_normal" name="btnSave" id="btnSave" onclick="doWork('SAVE')"><bean:message key="Save"/></button>
					     			</div>
								</td>
							</tr>														
					</table>
				</div>				
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
	        <table>
		        <tr>
			        <td width="55px">
			            <!--- Display option Begin --->
			            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
			            <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
			            <paging:options name="pagingVal" defaultval="200"/>
			            <!--- Display option End --->                 
			        </td>
		            <td>
		            <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
		            </td>
		        </tr>
	        </table>
		</div>		
		<div class="layout_vertical_3 mar_left_8" style="width:30%;">
			<table><tr style="height:20px;"><td></td></tr></table>
			<h3 class="title_design">Local Setting</h3>
			<div class="opus_design_inquiry">
				<table class="grid_2">
					<colgroup>
						<col width="90">				
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Billing_Code"/></th>
							<td><input type="text" name="f_bill_cd" maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100%;" onKeyPress="fncSearch()" id="f_bill_cd" readonly /></td>
						</tr>
						<tr>
							<th><bean:message key="Description"/></th>
							<td><input type="text" name="f_bill_des" maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; width:100%;" onKeyPress="fncSearch()" id="f_bill_des" readonly /></td>
						</tr>
					</tbody>
				</table>
			</div>			
			<div class="opus_design_grid "id="mainTable">
				<div class="opus_design_btn">
		     		<button type="button"  class="btn_normal" name="btnAddSub" id="btnAdd2" onclick="doWork('ROWADD2')"><bean:message key="Add"/></button>		     	
		     		<button type="button"  class="btn_normal" name="btnSaveSub" id="btnSave2" onclick="doWork('MODIFY01')"><bean:message key="Save"/></button>
	     		</div>
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
		<div class="layout_vertical_3" style="min-width:0%;">
		</div>
	<%-- </div class="opus_design_grid clear" style="display:none;">
	    <h3 class="title_design"><bean:message key="History"/></h3>
		<div class="opus_design_grid clear"id="mainTable">
			<script type="text/javascript">comSheetObject('sheet3');</script>
		</div>
	</div> --%>
</div>
</form>	
<script type="text/javascript">

		doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");

</script>

