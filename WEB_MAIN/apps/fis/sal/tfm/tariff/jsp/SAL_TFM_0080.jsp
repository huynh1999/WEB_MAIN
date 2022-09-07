<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  SAL_TFM_0080.jsp
*@FileTitle  :  Rate Management
*@author     : CLT
*@version    : 1.0
*@since      : 2017/05/23
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/sal/tfm/tariff/script/SAL_TFM_0080.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		    
	function setupPage(){
		loadPage();
	}

	<!-- TP/SZ -->
	var TPCD1 = '';
    var TPCD2 = '';
    var TPCD3 = '';
    <% boolean isBegin = false; %>    
    <logic:notEmpty name="valMap" property="UNITCD">
	<% isBegin = false; %>
	    <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
	    <logic:iterate id="codeVO" name="tpszList">
	        <% if(isBegin){ %>
	            TPCD1+= '|';
	            TPCD2+= '|';
	            TPCD3+= '|';
	        <% }else{
	              isBegin = true;
	           } %>
	        TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
	        TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
	        TPCD3+= '<bean:write name="codeVO" property="cntr_grp_cd"/>';
	    </logic:iterate>
    </logic:notEmpty>
    <!-- Term -->
	var TERMCD1 = ' |';
	var TERMCD2 = ' |';	    
	<logic:notEmpty name="valMap" property="UNITCD">
	<% isBegin = false; %>
	    <bean:define id="frtList" name="valMap" property="frtCdList"/>
	    <logic:iterate id="codeVO" name="frtList">
	        <% if(isBegin){ %>
	        	TERMCD1+= '|';
	        	TERMCD2+= '|';
	        <% }else{
	              isBegin = true;
	           } %>
	          TERMCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
	          TERMCD2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>
    </logic:notEmpty>
        
    <!-- Service 단위 -->
	var SVCCD1 = ' |';
	var SVCCD2 = ' |';	   
	<logic:notEmpty name="valMap" property="UNITCD">
	<% isBegin = false; %>
	    <bean:define id="svcList" name="valMap" property="serviceList"/>
	    <logic:iterate id="codeVO" name="svcList">
	        <% if(isBegin){ %>
	        	SVCCD1+= '|';
	        	SVCCD2+= '|';
	        <% }else{
	              isBegin = true;
	           } %>
	        SVCCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        SVCCD2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>
    </logic:notEmpty>
    
    <!-- Cargo Type -->
	var CARGOCD1 = ' |';
	var CARGOCD2 = ' |';	
	<logic:notEmpty name="valMap" property="UNITCD">
	<% isBegin = false; %>
    <bean:define id="cargoList" name="valMap" property="cargoTpCdList"/>
	    <logic:iterate id="codeVO" name="cargoList">
	        <% if(isBegin){ %>
	        	CARGOCD1+= '|';
	        	CARGOCD2+= '|';
	        <% }else{
	              isBegin = true;
	           } %>
	           CARGOCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
	           CARGOCD2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>
    </logic:notEmpty>
    
    <!-- CURRENCY -->
	var CURRCD1 = ' |';
	var CURRCD2 = ' |';	    
	<logic:notEmpty name="valMap" property="UNITCD">
	<% isBegin = false; %>
	    <bean:define id="currList" name="valMap" property="currCdList"/>
	    <logic:iterate id="codeVO" name="currList">
	        <% if(isBegin){ %>
	        	CURRCD1+= '|';
	        	CURRCD2+= '|';
	        <% }else{
	              isBegin = true;
	           } %>
	           CURRCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
	           CURRCD2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>
	</logic:notEmpty>
	
    <!-- Unit 단위 -->
    var UNITCD1 = ' |';
	var UNITCD2 = ' |';	  
    <logic:notEmpty name="valMap" property="UNITCD">
		<% isBegin = false; %>
        <bean:define id="unitList" name="valMap" property="UNITCD"/>
        <logic:iterate id="codeVO" name="unitList">
            <% if(isBegin){ %>
                UNITCD1+= '|';
                UNITCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
    </logic:notEmpty>
    
	</script>
 <form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="rt_no" id="rt_no">
	
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
				<col width="75">
				<col width="90">
				<col width="75">
				<col width="190">
  				<col width="75">
				<col width="120">
				<col width="75">
				<col width="90">
				<col width="75">
				<col width="120">
				<col width="75">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Rate_No"/></th>
					<td >
						<input type="text" name="f_rt_no" id="f_rt_no" maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="fncSearch('uppernum')" />
						</td>
					<td align="right"><!-- 
                                --><select name="f_etd_eta_cd" id="f_etd_eta_cd"  style="width:60px; font-weight: bold;" onChange="searchValueClear(this);"><!--
								    --><option value='ETD'><bean:message key="ETD"/></option><!--
								    --><option value='ETA'><bean:message key="ETA"/></option><!--
								--></select>
					</td>	
					<td><!-- 
				    --><input style="width:75px;" type="text" id="etd_strdt" name="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!--
					--><input style="width:75px;" type="text" id="etd_enddt" name="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
					--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
					</td>
					<th><bean:message key="Cntr_No"/></th>
					<td>
						<input type="text" name="f_cntr_no" id="f_cntr_no" maxlength="14" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="fncSearch('uppernum')">
					</td>
					<th><bean:message key="Sales_Office"/></th>
					<td>
						<input type="text" name="f_sls_ofc_cd"  maxlength="10" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;">
					</td>	
					<th><bean:message key="REF_No"/></th>
					<td>
						<input type="text" name="f_ref_no"  maxlength="100" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;">
					</td>				
				  <td></td>
				  <td></td>
				</tr>
				<tr>
					<th><bean:message key="Mode"/></th>
					<td><!-- 
                    --><select name="f_mode_cd" id="f_mode_cd"  style="width:100px; font-weight: bold;" onChange="searchValueClear(this);"><!--
					--><option value=''></option><!--
					--><option value='O'><bean:message key="Ocean"/></option><!--
					--></select>
					</td>
					<td align="right"><!-- 
                    --><select name="f_pol_pod_cd" id="f_pol_pod_cd"  style="width:60px; font-weight: bold;" onChange="searchValueClear(this);"><!--
					--><option value='POL'><bean:message key="POL"/></option><!--
					--><option value='POD'><bean:message key="POD"/></option><!--
					--></select>
					</td>	
					<td><!--
                    --><input type="text"   name="f_pod_cd" id="f_pod_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                    --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                    --><input type="text"   name="f_pod_nm" id="f_pod_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:105px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/></td>
					</td>
					<th><bean:message key="Carrier"/></th>
					<td><input type="text" name="lnr_trdp_cd" id="lnr_trdp_cd" maxlength="20" onKeyDown="codeNameAction('trdpCode_sea_liner',this, 'onKeyDown');" onBlur="codeNameAction('trdpCode_sea_liner',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
					--><button type="button" id="liner" name="liner" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST_MS',this);"></button><!--
					--><input type="text" name="lnr_trdp_nm" id="lnr_trdp_nm" maxlength="50"  onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST_MS', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
					</td>
					<th><bean:message key="Sales_PIC"/></th>
					<td>
						<input type="text" name="f_sls_usr_id"  maxlength="10" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;">
					</td>	
					<th><bean:message key="Status"/></th>
					<td><!-- 
                    --><select name="f_rt_sts_cd" id="f_rt_sts_cd"  style="width:100px; font-weight: bold;" onChange="searchValueClear(this);"><!--
					--><option value=''></option><!--
					--><option value='CR'><bean:message key="Created"/></option><!--
					--><option value='CF'><bean:message key="Confirmed"/></option><!--
					--></select>
					</td>				
				  <td></td>
				  <td></td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- opus_design_inquiry(E) -->
	</div>
	
	<div>
		<table>
			<tr height="10px"></tr>			
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


