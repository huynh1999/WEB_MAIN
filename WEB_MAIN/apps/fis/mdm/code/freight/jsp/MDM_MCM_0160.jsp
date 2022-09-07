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
	<script type="text/javascript" src="./apps/fis/mdm/code/freight/script/MDM_MCM_0160.js?ver=<%=CLT_JS_VER%>"></script>
	

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
		var PARAM3_1 = ' |';
		var PARAM3_2 = ' |';
		var PARAM4_1 = ' |';
		var PARAM4_2 = ' |';
		var PARAM5_1 = ' |';
		var PARAM5_2 = ' |';
		var PARAM6_1 = ' |';
		var PARAM6_2 = ' |';
		var PARAM7_1 = ' |';
		var PARAM7_2 = ' |';
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
	    <bean:define id="param3List"  name="rtnMap" property="PARAM3"/>
		<logic:iterate id="codeVO" name="param3List">
			<% if(isBegin){ %>
				PARAM3_1+= '|';
				PARAM3_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM3_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM3_2+= '<bean:write name="codeVO" property="cd_val"/>';
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
	    <% isBegin = false; %>
	    <bean:define id="param6List"  name="rtnMap" property="PARAM5"/>
		<logic:iterate id="codeVO" name="param6List">
			<% if(isBegin){ %>
				PARAM6_1+= '|';
				PARAM6_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM6_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM6_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>	  
	    <% isBegin = false; %>
	    <bean:define id="param8List"  name="rtnMap" property="PARAM6"/>
		<logic:iterate id="codeVO" name="param8List">
			<% if(isBegin){ %>
				PARAM7_1+= '|';
				PARAM7_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM7_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM7_2+= '<bean:write name="codeVO" property="cd_val"/>';
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
				<col width="120">
				<col width="140">
				<col width="210">
  				<col width="100">
				<col width="160">
				<col width="130">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Code"/></th>
					<td >
						<input type="text" name="s_bill_cd" maxlength="10" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" onKeyPress="fncSearch('uppernum','45|47')" id="s_bill_cd" />
						</td>
					<th><bean:message key="Name_English_Local" /></th>	
					<td>
						<input type="text" name="s_bill_nm" maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onKeyPress="fncSearch()" id="s_bill_nm" />
						</td>
					<th><bean:message key="GL_Code"/></th>
					<td >
							<input type="text" name="s_gl_cd" maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="fncSearch('uppernum')">
							</td>
					<th><bean:message key="GL_Description"/></th>
					<td>
							<input type="text" name="s_gl_nm"  maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onKeyPress="fncSearch()">
							</td>
				</tr>
			</table>
			<table id="table_ofc_frt" style="display: none">
				<colgroup>
					<col width="60">
					<col width="120">
					<col width="140">
					<col width="210">
	  				<col width="100">
					<col width="160">
					<col width="130">
					<col width="*">
				</colgroup>
				<tr>	
					<!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
					<th><bean:message key="Office"/></th>	
					<td>
					<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
					<bean:define id="oficeList" name="valMap" property="ofcList"/>
					<input type="hidden" name="s_ofc_cd" id="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/> 
                             <select name="f_ofc_cd" id="f_ofc_cd" style="width:105px" onchange="doWork('SEARCHLIST')">
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
				   <!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
				   <th><span id ="s_frt_unit" style="display:none"><bean:message key="Sea_Freight_Unit" /></span></th>
				   <td>
				   	   <span id ="s_frt_unit_sel" style="display:none">
				       <bean:define id="s_aply_list" name="valMap" property="PARAM5"/>
					   <select name="f_sea_dflt_aply_ut_cd" id="f_sea_dflt_aply_ut_cd" style="width:105px">
					   <option value=''>ALL</option>
					   <logic:iterate id="codeVO" name="s_aply_list">
		                    <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
		               </logic:iterate>
					   </select>
					   </span>
				   </td>
				   <th><span id="a_frt_unit" style="display:none"><bean:message key="Air_Freight_Unit" /></span></th>
				   <td>
				   	   <span id="a_frt_unit_sel" style="display:none">
				       <bean:define id="a_aply_list" name="valMap" property="PARAM6"/>
					   <select name="f_air_dflt_aply_ut_cd" id="f_air_dflt_aply_ut_cd" style="width:105px">
					   <option value=''>ALL</option>
					   <logic:iterate id="codeVO" name="a_aply_list">
		                    <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
		               </logic:iterate>					   
					   </select>
					   </span>
				   </td>							
				  <td></td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- opus_design_inquiry(E) -->
	</div>
	
	<div>
		<table>
			<tr height="12px"></tr>
			<tr>
				<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;* Modifying current Billing Codes and G/L Codes in the system may cause discrepancies in accounting figures.</th>
			</tr>
			<tr>
				<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please contact an OPUS Forwarding consultant before making this change at Logistics.helpdesk@cyberlogitec.com, support.us@cyberlogitec.com, support.cn@cyberlogitec.com.</th>
			</tr>
		</table>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_grid "id="mainTable">
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
	<div class="wrap_result">
	    <h3 class="title_design"><bean:message key="History"/></h3>
		<div class="opus_design_grid "id="mainTable">
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
</div>
</form>	
<script type="text/javascript">

		doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");

</script>

