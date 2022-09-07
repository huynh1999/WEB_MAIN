<%--
=========================================================
*@FileName   : CMM_POP_0190.jsp
*@FileTitle  : CMM
*@Description: srno search pop
*@author     : 이광훈 - srno search pop
*@version    : 1.0 - 01/28/2009
*@since      : 01/28/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/cmm/pop/srno/script/CMM_POP_0190.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>

	<script type="text/javascript">
		function setupPage(){
			initFinish();
	    	loadPage();
	    	doWork('SEARCHLIST');
	    }
	</script>

	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="air_sea_clss_cd"/>
		<input	type="hidden" name="bnd_clss_cd"/>
		<input	type="hidden" name="f_CurPage"/>
	<div class="layer_popup_title">	
		<!-- page_title_area(S) -->
		<div class="page_title_area">
		   <h2 class="page_title"><bean:message key="SR_No_Search"/></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" style="display:none;"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnPrint" style="display:none;" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">	
		<div class="wrap_search">	
			<div class="opus_design_inquiry ">
				<table>
						<colgroup>
							<col width="70">
							<col width="100">
							<col width="70">
							<col width="100">
							<col width="110">
							<col width="120">
							<col width="70">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="SR_No"/></th>
	                            <td><input name="f_sr_no" type="text" maxlength="15" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:90;" onblur="strToUpper(this);" onKeyPress="fncTpCodeSearch()"/></td>
	                            <th><bean:message key="Liner"/></th>
	                            <td><input name="f_lnr_nm" type="text" class="search_form" style="width:90;" onKeyPress="fncTpCodeSearch()"/></td>
	                            <th><bean:message key="Liner_Bkg"/></th>
								<td><input type="text" name="f_lnr_bkg_no" class="search_form" style="width:115;" onKeyPress="fncTpCodeSearch()"/></td>
	                            <th><bean:message key="Office"/></th>
								<td><div id="div_subcode">
	                                     <bean:define id="oficeList" name="valMap" property="ofcList"/> 
										 <select name="f_ofc_cd" style="width:115;">
											 <logic:iterate id="ofcVO" name="oficeList">
													 <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_eng_nm"/></option>
											 </logic:iterate>
										 </select>
					            	</div>
								</td>
							</tr>
						</tbody>
				</table>
				<table>
						<colgroup>
							<col width="70">
							<col width="100">
							<col width="70">
							<col width="200">
							<col width="70">
							<col width="100">
							<col width="70">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
	                           <th><span id = "mbl" style="display:none"><bean:message key="MBL_No"/></span><span id = "mawb" style="display:none"><bean:message key="MAWB_No"/></span></th>
	                           <td><input type="text" name="f_mbl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:90;" onKeyPress="fncTpCodeSearch()"/></td>
	                          	<th><bean:message key="ETD"/></th>
								<td><input type="text" name="etd_strdt" class="search_form" dataformat="excepthan" style="width:70px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)"><!-- 
						 			-->~ <!-- 
						 			--><input type="text" name="etd_enddt" class="search_form" dataformat="excepthan" style="width:70px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)"><!-- 
						 			--><button type="button" id="etd_dt_cal" onclick="doDisplay('DATE11', form);" class="calendar" tabindex="-1"></button> 
								</td>
	                            <th><bean:message key="Dept"/></th>
	                            <td><bean:define id="dptLst" name="valMap" property="deptList"/>
	                                <html:select name="valMap" property="f_dpt_cd" style="width:115px;">
	                                    <option value="">All</option>
	                                    <html:options collection="dptLst" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select>
	                            </td>
	                            <th><bean:message key="Operator"/></th>
	                            <td><input type="text" name="f_pic_id" value='<bean:write name="valMap" property="curPic"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70;"></td>     
							</tr>
						</tbody>
				</table>
			</div>
		</div>	 	
		<div class="wrap_result">
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet1');</script>
				<table border="0" width="100%">
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

