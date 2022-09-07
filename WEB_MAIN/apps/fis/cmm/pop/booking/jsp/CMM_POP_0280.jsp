<%--
=========================================================
*@FileName   : CMM_POP_0280.jsp
*@FileTitle  : CMM
*@Description: booking search pop
*@author     : 이광훈 - booking search pop
*@version    : 1.0 - 01/28/2009
*@since      : 01/28/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/cmm/pop/booking/script/CMM_POP_0280.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>
	
	<script type="text/javascript">
	
		function setupPage(){
			loadPage();
			initFinish();
	    	doWork('SEARCHLIST');
	    }
	</script>
	
	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="f_mbl_entry_yn"/>
		<input	type="hidden" name="f_CurPage"/> 	
		<div class="layer_popup_title">	
	<!-- page_title_area(S) -->
		<div class="page_title_area">
		   <h2 class="page_title"><bean:message key="Carrier_Booking_Search"/></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <div class="opus_design_btn">
			   <button type="button" class="btn_accent"   onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnPrint" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		   </div>
		</div>
		</div>
		<div class="layer_popup_contents">
			<div class="wrap_search">	
			<div class="opus_design_inquiry ">
				<table>
						<colgroup>
							<col width="90">
							<col width="223">
							<col width="70">
							<col width="140">
							<col width="70">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="System_Bkg_No"/></th>
								<td><input type="text" name="f_bkg_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115;" onKeyPress="fncSearch()"/></td>
	                            <th><bean:message key="Liner_Bkg"/></th>
								<td><input type="text" name="f_lnr_bkg_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115;" onKeyPress="fncSearch()"/></td>
	                            <th><bean:message key="Office"/></th>
	                            <td><bean:define id="valMap"  name="EventResponse" property="mapVal"/>
									 <bean:define id="oficeList" name="valMap" property="ofcList"/> 
									 <select name="f_ofc_cd" style="width:82;"/>
		
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
								<th><bean:message key="Bkg_Date"/></th>
	                            <td><input type="text" name="f_bkg_strdt" class="search_form" dataformat="excepthan" style="width:77px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.f_bkg_enddt);firCalFlag=false;" >
									~
									<input type="text" name="f_bkg_enddt" class="search_form" dataformat="excepthan" style="width:77px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.f_bkg_strdt, this);firCalFlag=false;">
									<button type="button" id="f_bkg_dt_cal" onclick="doDisplay('DATE11', form);" class="calendar" tabindex="-1"></button>
	                            <th><bean:message key="Liner"/></a></th>
								<td><input type="text" name="f_lnr_trdp_cd" id="f_lnr_trdp_cd" maxlength="20" onKeyDown="codeNameAction('LINER', this, 'onKeyDown');" onBlur="strToUpper(this);codeNameAction('LINER',this, 'onBlur');" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
									--><button type="button" id="liner" name="liner" class="input_seach_btn" tabindex="-1" onClick="doWork('LINER_POPLIST');"></button><!--
									--><input type="text" name="f_lnr_trdp_nm" id="f_lnr_trdp_nm" maxlength="50" onblur="strToUpper(this);" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('LINER_POPLIST');}">
								</td>
							</tr>
						</tbody>
				</table>
			</div>
		</div>	 
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<div class="opus_design_grid">
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
				<table>
					<tr>
						<td width="55">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>								
						<td align="center">
							<table>
								<tr>
									<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>		
						</td>
						<td width="55"></td>
					</tr>
				</table>
			</div>
		</div>	
	</div>
	</form>


