<%--
=========================================================
*@FileName   : WHM_POP_0007.jsp
*@FileTitle  : PO Item 조회 팝업
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
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/whm/shipping/shipping/script/WHM_POP_0007.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>
	
	<script language="javascript">
		var ofc_cd = '<%=userInfo.getOfc_cd()%>';
		function setupPage(){
	       	loadPage();
	       	doWork('SEARCHLIST');
      	
	    }
	</script>
<form name="form" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="f_CurPage"/>
	<input	type="hidden" name="wh_cd"/>
	<input	type="hidden" name="cust_cd"/>
	<input	type="hidden" name="ofc_cd"/>
	<input	type="hidden" name="s_ctrt_no"/>
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   	<h2 class="page_title">
				Load <bean:message key="Item"/>s <bean:message key="List"/></span>
		   </h2>

		   <!-- btn_div -->
		   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
			   <%-- <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> --%><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('APPLY')"><bean:message key="Apply"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
		</div>
	
	<div class="layer_popup_contents">
		<div class="wrap_search"> 
			<div class="opus_design_inquiry ">
				<table>
<!-- 						<colgroup>
				        	<col width="100">
				        	<col width="185">
				        	<col width="50">
				        	<col width="*">
					   </colgroup> -->
					   <tbody>
						<tr>
							<th align='left'><bean:message key="Item_Code"></bean:message></th>
							<td>
								<input type="text" name='itm_cd' id ='item_cd' class="search_form" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:200px;" onkeypress="entSearch()"/>
							</td>
							<th><bean:message key="Item_Name"></bean:message></th>
							<td>
								<input type="text" name="itm_nm" id ='item_nm' class="search_form" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:320px;" onkeypress="entSearch()" /> 
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		
<%-- 		<div class="wrap_search">	
		   	<div class="opus_design_inquiry">
		   		<table>
					<tr>
						<th>
	                    	<select name="f_dt_clss_cd" style="width: 140px; font-weight: bold;"> 
								<option value='ORD' ><bean:message key="Order_Date"/></option> 
								<option value='ARR' ><bean:message key="Arrival_Date"/></option> 
								<option value='CAR' ><bean:message key="Cargo_Ready_Date"/></option> 
								<option value='SHP' ><bean:message key="Ship_Window"/></option> 
							</select> 
	                 	</th>
		                <td> 
							<input style="width:75px;" type="text" id="f_prd_strdt" name="f_prd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.f_prd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span>
						 	<input style="width:75px;" type="text" id="f_prd_enddt" name="f_prd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.f_prd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form">
						 	<button type="button" class="calendar" tabindex="-1" name="f_prd_dt_cal" id="f_prd_dt_cal" onclick="doDisplay('DATE1', form);"></button>
						</td>
						
						<th> 
	 						<select name="f_no_clss_cd" onChange="searchValueClear();" style="width: 130px; font-weight: bold;"> 
								<option value='B' ><bean:message key="Customer_PO_No"/></option> 
								<option value='P' ><bean:message key="PO_Sys_No"/></option> 
								<option value='I' ><bean:message key="Item_Desc"/></option> 
	 						</select> 
	 					</th> 
						<td> 
	 	                	<input type="text" id="f_sel_no" name="f_sel_no" maxlength="40" value='<bean:write name="valMap" property="f_sel_no"/>' class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onkeydown="entSearch();"/> 
	 	              	</td> 
	 	              	<th><bean:message key="Customer"/></th>
			            <td>
			            <input type="text"   name="f_cust_trdp_cd" onKeyDown="codeNameAction('CUST', this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('CUST', this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"> 
		                   	<button type="button" name="cust" id="cust" class="input_seach_btn" tabindex="-1" onClick="doWork('CUST_POPLIST')"></button>
		                    <input type="text"   name="f_cust_trdp_nm" onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('CUST_POPLIST');}">
		                </td>
		                 	
		                <th><bean:message key="Vendor"/></th>
			            <td>
			              	<input type="text"   name="f_vndr_trdp_cd" onKeyDown="codeNameAction('VENDOR', this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('VENDOR', this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"> 
		                   	<button type="button" name="vendor" id="vendor" class="input_seach_btn" tabindex="-1" onClick="doWork('VENDOR_POPLIST')"></button>
		                    <input type="text"   name="f_vndr_trdp_nm" onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('VENDOR_POPLIST');}">
		                </td>
	 	        	</tr>
	 	            <!-- <tr>
		                <th><bean:message key="Origin"/></th>
		                <td>
		                 	<input type="text"  id="f_org_loc_cd" name="f_org_loc_cd"  maxlength="5"    class="search_form" onKeyDown="codeNameAction('ORGIN', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('ORGIN', this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/>
		                    <button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('ORGIN_LOCATION_POPLIST')"></button>
		                    <input type="text"  id="f_org_loc_nm" name="f_org_loc_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('ORGIN_LOCATION_POPLIST');}"/>
		                </td>
		                    
		                <th><bean:message key="Destination"/></th>
		                <td>
		                    <input type="text"    id="f_dest_loc_cd"  name="f_dest_loc_cd"  maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('DEST', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('DEST', this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/>
		                	<button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('DEST_LOCATION_POPLIST')"></button>
		                	<input type="text"  id="f_dest_loc_nm" name="f_dest_loc_nm" maxlength="50"   class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('DEST_LOCATION_POPLIST');}"/>
		                </td>                 
		         	</tr> -->
				</table>
		   	</div>
		</div> --%>
		<!-- wrap_result (S) -->
	    <div class="wrap_result">
	    	<div class="opus_design_inquiry">
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
				<table border="0" width="100%">
					<tr>
						<td width="55px"> 
						<%--  <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>  --%>
						 <%-- <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
						 <paging:options name="pagingVal" defaultval="200"/> --%>
						</td>								
						<!-- <td align="center"> 
						 <table> 
						 	<tr> 
						 		<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td> 
						 	</tr> 
						 </table> 
						 </td> -->
						<td width="55px"></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</form>