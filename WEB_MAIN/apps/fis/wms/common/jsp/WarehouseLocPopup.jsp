<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WarehouseLocPopup.jsp
*@FileTitle  : Location
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================
--%>

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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WarehouseLocPopup.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
    <%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<%
	
	//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
	
	String loc_cd 			= "";
	String wh_loc_nm 			= "";
	String f_wh_loc_nm 		= "";
	String loc_prop 		= "";
	String not_loc_prop 	= "";
	
	String putaway_flg 		= "";
	String alloc_flg 		= "";
	String move_flg 		= "";
	String replenish_flg 	= "";
	String adjust_flg 		= "";
	
	String put_tp_cd 		= "";
	
	String fix_wh_loc_cd 	= "";
	String fix_wh_loc_nm 	= "";
	
	try {
		loc_cd = request.getParameter("f_loc_cd");
		if(loc_cd==null){
			loc_cd = "";
		}
		wh_loc_nm = request.getParameter("wh_loc_nm");
		if(wh_loc_nm==null){
			wh_loc_nm = "";
		} 
		f_wh_loc_nm = request.getParameter("f_wh_loc_nm");
		if(f_wh_loc_nm==null){
			f_wh_loc_nm = "";
		} 
		loc_prop = request.getParameter("f_loc_prop");
		if(loc_prop==null){
			loc_prop = "";
		} 
		not_loc_prop = request.getParameter("f_not_loc_prop");
		if(not_loc_prop==null){
			not_loc_prop = "";
		} 
		putaway_flg = request.getParameter("f_putaway_flg");
		if(putaway_flg==null){
			putaway_flg = "";
		} 
		alloc_flg = request.getParameter("f_alloc_flg");
		if(alloc_flg==null){
			alloc_flg = "";
		} 
		move_flg = request.getParameter("f_move_flg");
		if(move_flg==null){
			move_flg = "";
		}
		replenish_flg = request.getParameter("f_replenish_flg");
		if(replenish_flg==null){
			replenish_flg = "";
		}
		adjust_flg = request.getParameter("f_adjust_flg");
		if(adjust_flg==null){
			adjust_flg = "";
		}
		put_tp_cd = request.getParameter("f_put_tp_cd");
		if(put_tp_cd==null){
			put_tp_cd = "N";
		}
		fix_wh_loc_cd = request.getParameter("f_fix_wh_loc_cd");
		if(fix_wh_loc_cd==null){
			fix_wh_loc_cd = "";
		}
		fix_wh_loc_nm = request.getParameter("f_fix_wh_loc_nm");
		if(fix_wh_loc_nm==null){
			fix_wh_loc_nm = "";
		}
	System.out.println("f_wh_loc_nm" + f_wh_loc_nm);		
		
	}catch(Exception e) {
		out.println(e.toString());
	}	
	
	String zone_cdText = "";
	

%>

<script>
	var zone_cdTexts = '';
	var f_put_tp_cdText = '';
	var f_put_tp_cdCode = '';
</script>

<logic:notEmpty name="cdMap" property="zone_cdText">
 	<bean:define id="MsList" name="cdMap" property="zone_cdText"/>
	<script>
	
	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              zone_cdTexts+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 zone_cdTexts += '<bean:write name="codeVO" property="zone_cd"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

<logic:notEmpty name="cdMap" property="f_put_tp_cd">
 	<bean:define id="MsList" name="cdMap" property="f_put_tp_cd"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              f_put_tp_cdText+= '|';
              f_put_tp_cdCode+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 f_put_tp_cdText+= '<bean:write name="codeVO" property="name"/>';
                 f_put_tp_cdCode+= '<bean:write name="codeVO" property="code"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

<script type="text/javascript">

</script> 
  
<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>	
<form id="form" name="form">
<input type="hidden" name="f_cmd">

<%-- <input type="hidden" name="zone_cdText" 	value="<%=zone_cdText%>" id="zone_cdText" /> --%>
<input type="hidden" name="f_loc_prop" 		value="<%=loc_prop%>" id="f_loc_prop" />
<input type="hidden" name="f_not_loc_prop"  id="f_not_loc_prop" value="<%=not_loc_prop%>">
<input type="hidden" name="f_putaway_flg" 	value="<%=putaway_flg%>" id="f_putaway_flg" />
<input type="hidden" name="f_alloc_flg" 	value="<%=alloc_flg%>" id="f_alloc_flg" />
<input type="hidden" name="f_move_flg" 		value="<%=move_flg%>" id="f_move_flg" />
<input type="hidden" name="f_replenish_flg" value="<%=replenish_flg%>" id="f_replenish_flg" />
<input type="hidden" name="f_adjust_flg" 	value="<%=adjust_flg%>" id="f_adjust_flg" />
<input type="hidden" name="f_put_tp" 		value="<%=put_tp_cd%>" id="f_put_tp" />
<input type="hidden" name="f_fix_wh_loc_cd" value="<%=fix_wh_loc_cd%>" id="f_fix_wh_loc_cd" />
<input type="hidden" name="f_fix_wh_loc_nm" value="<%=fix_wh_loc_nm%>" id="f_fix_wh_loc_nm" />
<input type="hidden" name="loc_cd" value="<%=loc_cd%>" id="loc_cd" />
<input type="hidden" name="wh_loc_nm" value="<%=wh_loc_nm%>" id="wh_loc_nm" />

<input name="f_wh_loc_cd" type="hidden" class="L_input" id="wh_loc_cd"  dataformat="etc" style="width:70px;ime-mode:disabled;text-transform:uppercase;" onBlur="strToUpper(this)" maxlength="10"/>
	<div class="layer_popup_title">
	<div class="page_title_area clear">
		<h2 class="page_title"><span><bean:message key="Location"/></span></h2>
		<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btn_retrieve" id="btn_retrieve" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
		 --></div>
	</div>
	</div>
	<div class="layer_popup_contents">
		<div class= "wrap_search">
			<div class="opus_design_inquiry entry_pannel">
				<table>
			    	<colgroup>
					<col width="80" />
			   		<col width="260" />
					<col width="60" />
			 		<col width="*" />
					</colgroup>    
					<tbody>        	
			     		<tr>
							<th><bean:message key="Warehouse"/></th>
							<td>
								<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="f_loc_cd" id="f_loc_cd" class="search_form" style="width: 205px;">
									<option value=""></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>
							</td>
							<!-- #6421 : [Hanaro] WMS issue (Locatoin, Excel Upload, Inventory movement) -->
							<th>Only empty location</th>
							<td>
								<input type="checkbox" id="f_only_empty_location" name="f_only_empty_location">
							</td>
						<td colspan="2"><!-- <input type="checkbox" id="chkEmptyLoc" name="chkEmptyLoc" value="Y"/><label for='chkEmptyLoc'><bean:message key="Empty_Location"/></label> --></td>
					</tr>
					<tr>
						<th><bean:message key="Location"/></th>
						<td><input name="f_wh_loc_nm" type="text"  class="L_input" id="f_wh_loc_nm"  value="<%=f_wh_loc_nm %>" dataformat="etc" style="width:205px;ime-mode:disabled;text-transform:uppercase;" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}" onBlur="strToUpper(this)" maxlength="20"/></td>
						<th><bean:message key="Zone"/></th>
						<td>
							<select id="f_zone_cd" name="f_zone_cd" style="width:205px">
					        </select>
					    </td>
					</tr>
					<tr>
						<th><bean:message key="Loc_Prop"/></th>
						<td>
							<bean:define id="MsList" name="cdMap" property="f_prop_cd"/>
							<select name="f_prop_cd" id="f_prop_cd" style="width:205px">
							<option value='ALL'>ALL</option>
								<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
						</td>
						
						<th><bean:message key="Put_Type"/></th>
					 	<td>
							<select name="f_put_tp_cd" id="f_put_tp_cd" style="width:205px">
							</select>
						</td>
					</tr>  
				</tbody>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
