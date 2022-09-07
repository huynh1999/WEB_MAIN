<%--
=========================================================
*@FileName   : CMM_POP_0170.jsp
*@FileTitle  : HBL 조회 팝업
*@Description: 
*@author     : Kang,Jung-Gu
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
    <base target="_self"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<% String from_hbl_tp_cd = "";%>
    <logic:notEmpty name="EventResponse">
        <logic:notEmpty name="valMap" property="from_hbl_tp_cd">
			<bean:define id="tmpTp"  name="valMap" property="from_hbl_tp_cd"/>
			<% from_hbl_tp_cd = (String)tmpTp; %>
		</logic:notEmpty>
    </logic:notEmpty>	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/cmm/pop/housebl/script/CMM_POP_0170.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<script language="javascript">
		var ofc_cd = '<%=userInfo.getOfc_cd()%>';
		var uod_flg ="<%= userInfo.getUod_flg()%>"
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrDept = "<%=userInfo.getDept_cd()%>";
		function setupPage(){
	       	loadPage();
	       	initFinish();
	    }
	</script>
<form name="form" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="air_sea_clss_cd"/>
	<input	type="hidden" name="bnd_clss_cd"/>
	<input	type="hidden" name="f_CurPage"/>
	<!-- #342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21 -->
	<input	type="hidden" name="f_MultiSelect"/>
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span id = "hblHrdTx"  style="display:none"><bean:message key="HBL"/> <bean:message key="Search"/></span>
	            <span id = "hawbHrdTx" style="display:none"><bean:message key="HAWB"/> <bean:message key="Search"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
		   		<!-- #342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21 -->
		   		<button type="button" style="display:none" id="btnApply" class="btn_normal" onclick="doWork('APPLY')" ><bean:message key="Apply"/></button><!-- 
			    --><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
		   		<table>
					<tr>
						<th width="117px"> 
						 <span id = "hblTx"  style="display:none"><bean:message key="HBL_No"/></span> 
						 <span id = "hawbTx" style="display:none"><bean:message key="HAWB_No"/></span></th>
		                <td width="115px"><input type="text" name="s_house_bl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115px;" onKeyPress="fncTpCodeSearch()"/></td>
	                    <%-- <th width="90px"><bean:message key="BL_Type"/></th>
	                    <td width="250px"> 
	                     <bean:define id="blTypeList" name="valMap" property="blTypeList"/> 
	                     <select required name="s_hbl_tp_cd" style="width:160px;"/> 
	                     	<logic:iterate id="bltypeVO" name="blTypeList"> 
	                     		<option value='<bean:write name="bltypeVO" property="cd_val"/>'><bean:write name="bltypeVO" property="cd_nm"/></option> 
	                     	</logic:iterate> 
	                     </select> 
	                     </td> --%>
	                    <th width="90px"><bean:message key="BL_Type"/></th>
	                    <td width="250px"> 
	                        <bean:define id="blTypeList" name="valMap" property="blTypeList"/>
                        	    <select name="s_hbl_tp_cd" style="width:160px;"/> 
                                    <option value="">ALL</option>
	                        	    <logic:iterate id="bltypeVO" name="blTypeList">
	                        	        <option value='<bean:write name="bltypeVO" property="cd_val"/>' <logic:equal name="bltypeVO" property="cd_val" value="<%=from_hbl_tp_cd%>">selected</logic:equal>><bean:write name="bltypeVO" property="cd_nm"/></option>
	                        	    </logic:iterate>
                        	    </select>
	                    </td>
		                <th width="70px"><bean:message key="Office"/></th>
						<td> 
	                     <bean:define id="oficeList" name="valMap" property="ofcList"/> 
	                     <select name="f_ofc_cd" style="width:82;" required/> 
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
					<tr>
	                    <th> 
	                     <span id = "ashpTx" style="display:none"><bean:message key="A_Shipper"/></span> 
	                     <span id = "acusTx" style="display:none"><bean:message key="Actual_Customer"/></span> 
	                     </th>
	                     <td><input type="text" name="f_act_shpr_nm" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115px;" onKeyPress="fncTpCodeSearch()"/></td>
						 <td colspan="2"> 
	                     <div id = "div_obrd" style="display:none"> 
	                         <table> 
	                     		<tr> 
	                     			<th width="90px">
	                     			    <!-- #2031 [CARGOZONE] OEH COMMERCIAL INVOICE, PACKING LIST ON BOARD 검색 조건 BLANK -->
	                     				<select id="f_etd_onboard" style="width:80px; font-weight: bold;" >
	                     					<option value='etd' selected="selected"><bean:message key="ETD"/></option>
	                     					<option value='onboard'><bean:message key="Onboard_Date"/></option>
	                     				</select>
	                     			</th> 
	                     			<td> 
	                     				<input type="text" name="obrd_strdt" id="obrd_strdt" class="search_form" dataformat="excepthan" style="width:73px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			-->~&nbsp;<!-- 
	                     			--><input type="text" name="obrd_enddt" id="obrd_enddt" class="search_form" dataformat="excepthan" style="width:73px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			--><button type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE11', form);"></button> 
	                     			</td> 
	                     		</tr> 
	                     	</table> 
	                     </div> 
	                     <div id="div_eta" style="display:none"> 
	                          <table> 
	                     		<tr> 
	                     			<th width="90px"> 
	                     				<span id = "etaTx" style="display:none"><bean:message key="ETA"/></span> 
	                     				<span id = "arTx"  style="display:none"><bean:message key="Arrival"/></span> 
	                     			</th> 
	                     			<td> 
	                     				<input type="text" name="eta_strdt" id="eta_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			-->~&nbsp;<!-- 
	                     			--><input type="text" name="eta_enddt" id="eta_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			--><button type="button" id="eta_dt_cal" class="calendar" tabindex="-1" onclick="doDisplay('DATE13', form);"></button> 
	                     			</td> 
	                     		</tr> 
	                     	</table> 
	                     </div> 
	                     <div id="div_etd_eta" style="display:none"> 
	                         <table> 
	                     		<tr> 
	                     			<th width="90px"><span id = "etdEtaTx" style="display:none"><bean:message key="ETD_ETA"/></span></th> 
	                     			<td> 
	                     				<input type="text" name="etd_eta_strdt" id="etd_eta_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			-->~&nbsp;<!-- 
	                     			--><input type="text" name="etd_eta_enddt" id="etd_eta_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			--><button type="button" id="eta_dt_cal" class="calendar" tabindex="-1" onclick="doDisplay('DATE13', form);"></button> 
	                     			</td> 
	                     		</tr> 
	                     	</table> 
	                      </div> 
	                      <div id="div_air_etd" style="display:none"> 
	                         <table> 
	                     		<tr> 
	                     			<th width="90px"><bean:message key="Flight_Date"/></th> 
	                     			<td> 
	                     				<input type="text" name="etd_strdt" id="etd_strdt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			-->~&nbsp;<!-- 
	                     			--><input type="text" name="etd_enddt" id="etd_enddt" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
	                     			--><button type="button" id="eta_dt_cal" class="calendar" tabindex="-1" onclick="doDisplay('DATE12', form);"></button> 
	                     			</td>
									</tr>
								</table>
	                         </div>
						 </td>
	                    <!--  <th width="70px"><bean:message key="Issued_By"/></th>
	                     <td><input type="text" name="f_pic_id" value="" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:81px;"></td>--> 
	                     <td align="right"><!-- 
	                               --><select name="f_isb_pic_sel_cd" id="f_isb_pic_sel_cd"  style="width:100px; font-weight: bold;" onChange="searchValueClear(this);"><!--
								    --><option value='OR'><bean:message key="Issued_By"/> Or <bean:message key="Sales_PIC"/></option><!--
								    --><option value='ISB'><bean:message key="Issued_By"/></option><!--
								    --><option value='PIC'><bean:message key="Sales_PIC"/></option><!--
								--></select>
						</td>                                
						<td>
								    <input type="text" name="opr_usrid" style="width:100px;"><!-- 
									--><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button>
	                                <input type="hidden" name="proc_usrnm" class="search_form-disable" readOnly>
	                                <input type="hidden" name="opr_usrnm">
									<input type="hidden" name="opr_ofc_cd">
									<input type="hidden" name="opr_dept_cd">
									<input type="hidden" name="sls_tp_cd">
			            </td>     
					</tr>
				</table>
		   	</div>
		</div>
		<!-- wrap_result (S) -->
	    <div class="wrap_result">
	    	<div class="opus_design_inquiry">
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
				<table border="0" width="100%">
					<tr>
						<td width="55px"> 
						 <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
						 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
						 <paging:options name="pagingVal" defaultval="200"/>
						</td>								
						<td align="center"> 
						 <table> 
						 	<tr> 
						 		<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td> 
						 	</tr> 
						 </table> 
						 </td>
						<td width="55px"></td>
					</tr>
				</table>
			</div>
		</div>
	</div>	
</form>

