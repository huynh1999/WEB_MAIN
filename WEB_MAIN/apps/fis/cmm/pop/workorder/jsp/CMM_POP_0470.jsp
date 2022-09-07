<%--
=========================================================
*@FileName   : CMM_POP_0470.jsp
*@FileTitle  : CMM
*@Description: WAREHOUSE Work Order Search Pop
*@author     : Kang,Jung-Gu - work order search pop
*@version    : 1.0 - 09/14/2017
*@since      : 09/14/2017

=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/cmm/pop/workorder/script/CMM_POP_0470.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
<script>
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
		
		<input	type="hidden" name="f_CurPage"/> 	
	<div class="layer_popup_title">	
		<!-- Button -->
		<div class="page_title_area clear">
		   <h2 class="page_title"><bean:message key="Work_Order_Search"/></h2>
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')">Search</button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- Search option -->
	    <div class="wrap_search">	
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
			        	<col width="70">
			        	<col width="120">
			        	<col width="50">
			        	<col width="120">
			        	<col width="80">
			        	<col width="120">
			        	<col width="50">
			        	<col width="120">
			        	
				   </colgroup>
				   <tbody>
					<tr>
						<th><bean:message key="Work_Order_No"/></th>
	                    <td><!-- 
	                    	 --><input name="f_wo_no" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onblur="strToUpper(this);" onKeyPress="fncTpCodeSearch()"/>
	                    </td>
	                    
	                    <th><bean:message key="Pick_Up_At"/></th>
	                    <td><input type="text"   name="f_org_rout_trdp_nm" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onblur="strToUpper(this);" /><!-- 
							 --><input type="hidden" name="f_org_rout_trdp_cd" class="search_form" style="width:50px;" maxlength="6" onKeyPress="fncTpCodeSearch()"/><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" name='pic' id="pic" onclick="doWork('PARTNER_POPLIST',this)"></button></td>
	                    </td>
	                    
	                    <th><bean:message key="Deliver_to"/></th>
	                    <td><input type="text"   name="f_dest_rout_trdp_nm" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onblur="strToUpper(this);" /><!-- 
							 --><input type="hidden" name="f_dest_rout_trdp_cd" class="search_form" style="width:50px;" maxlength="6" onKeyPress="fncTpCodeSearch()"/><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" name="del" id="del" onclick="doWork('PARTNER_POPLIST',this)"></button></td>
	                    </td>
						<th><bean:message key="Trucker"/></th>
	                    <td><!-- 				                                	
							 --><input type="text"   name="f_trsp_trdp_nm" class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onblur="strToUpper(this);" /><!-- 
							 --><input type="hidden" name="f_trsp_trdp_cd" class="search_form" style="width:50px;" maxlength="6" onKeyPress="fncTpCodeSearch()"/><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" name="trk" id="trk" onclick="doWork('PARTNER_POPLIST',this)"></button>
						</td>
	               </tr>
					<tr>
						<th><bean:message key="Office"/></th>
						<td><!-- 
							 --><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
							 --><select name="f_ofc_cd" style="width:105px;"/><!--
	
	                             --><bean:size id="len" name="oficeList" /><!--
	                             --><logic:greaterThan name="len" value="1"><!--
	                             --><option value=''>ALL</option><!--
	                             --></logic:greaterThan><!--
	
								 --><logic:iterate id="ofcVO" name="oficeList"><!--
										 --><logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:equal>
				                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:notEqual><!--
								 --></logic:iterate><!--
							 --></select>
						</td> 
	                    
						<th><bean:message key="Pick_Up_Date"/></th>
						<td><!-- 
							 --><input type="text" name="f_pkup_strdt" id="f_pkup_strdt" class="search_form" style="width:75px;" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!--
							 -->~ <!--
							 --><input type="text" name="f_pkup_enddt" id="f_pkup_enddt" class="search_form" dataformat="excepthan" style="width:75px;ime-mode:disabled" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!--
							 --><button id="pkup_dt_cal" type="button" onclick="doDisplay('DATE11', form);" class="calendar" tabindex="-1">
						</td>
			            <th><bean:message key="Delivery_Date"/></th>
						<td><!-- 
							 --><input type="text" name="f_del_strdt" id="f_del_strdt" class="search_form" style="width:75px;" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!--
							 -->~ <!--
							 --><input type="text" name="f_del_enddt" id="f_del_enddt" class="search_form" dataformat="excepthan" style="width:75px;ime-mode:disabled" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!--
							 --><button id="del_dt_cal" type="button" onclick="doDisplay('DATE12', form);" class="calendar" tabindex="-1">
						</td>     
					</tr>
					<tbody>
				</table>
			</div>
		</div>
		
		<div class="wrap_result">
	    	<div class="opus_design_grid">
	    		<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<table border="0" width="100%">
			   <tr>
			     	<td width="55">
			<!-------------------- Display option Begin -------------------->
						<bean:define id="pagingVal" name="valMap" property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
			<!-------------------- Display option End -------------------->					
					</td>							
					<td align="center">
						<table>
							<tr>
								<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'/>
							</tr>
						</table>		
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>


