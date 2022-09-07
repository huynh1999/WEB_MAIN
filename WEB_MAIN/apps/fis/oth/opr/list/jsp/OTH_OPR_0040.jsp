<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : OTH_OPR_0040.jsp
*@FileTitle  : Purchase Order List
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/oth/opr/list/script/OTH_OPR_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
<script type="text/javascript">
	function setupPage(){
		loadPage();
	}
</script>

<form name="frm1" method="POST" action="./">
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />

	<input id="po_sys_no" name="po_sys_no" type="hidden" />
	
	<!-- <input id="file_name" name="file_name" type="hidden" />
	<input id="title" name="title" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />

	<input id="mailTitle" name="mailTitle" value="" type="hidden" />
	<input id="mailTo" name="mailTo" value="" type="hidden" />

	<input id="rpt_biz_tp" name="rpt_biz_tp" type="hidden" />
	<input id="rpt_biz_sub_tp" name="rpt_biz_sub_tp" type="hidden" />
	<input id="rpt_tp/" name="rpt_tp/" type="hidden" />
	 
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	<input type="hidden" name="pageurl" id="pageurl" value="OTH_OPR_0040.clt"/>
	 -->
	 
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- 
			<button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')" name="btnSearch"><bean:message key="Search"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')" name="btnNew"><bean:message key="New"/></button> 
			<button type="button" class="btn_normal" style="display:none;" btnAuth="COPY" onclick="doWork('COPY')" id="btnCopy" name="btnCopy"><bean:message key="Copy"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onClick="clearAll();"><bean:message key="Clear"/></button> 
			<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onclick="doWork('REMOVE')" name="btnDelete"><bean:message key="Delete"/></button>
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
	
	<!-- inquiry_area(S) -->	
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>	
				<colgroup>
			        <col width="150">
		        	<col width="230">
		        	<col width="160">
		        	<col width="230">
		        	<col width="100">
		        	<col width="*">
			   	</colgroup>
				<tbody>
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
						<input style="width:75px;" type="text" id="f_prd_strdt" name="f_prd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_prd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span>
					 	<input style="width:75px;" type="text" id="f_prd_enddt" name="f_prd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_prd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form">
					 	<button type="button" class="calendar" tabindex="-1" name="f_prd_dt_cal" id="f_prd_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
					</td>
					
					<th> 
 						<select name="f_no_clss_cd" onChange="searchValueClear();" style="width: 130px; font-weight: bold;"> 
							<option value='B' ><bean:message key="Customer_PO_No"/></option> 
							<option value='P' ><bean:message key="PO_Sys_No"/></option> 
							<option value='I' ><bean:message key="Item_Desc"/></option> 
							<option value='C' ><bean:message key="Contract_No"/></option> 
 						</select> 
 					</th> 
 					<td> 
 	                	<input type="text" id="f_sel_no" name="f_sel_no" maxlength="40" value='<bean:write name="valMap" property="f_sel_no"/>' class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onkeydown="entSearch();"/> 
 	              	</td> 
 	                                
                    <th><bean:message key="Trans_Mode"/></th>
			        <td>
						<select name="f_air_sea_clss_cd">
							<option value="">ALL</option>
							<option value="S"><bean:message key="Sea"/></option>
		                    <option value="A"><bean:message key="Air"/></option>
						</select>
					</td>
				</tr>
				
				<tr>
					<th><bean:message key="Customer"/></th>
	                <td>
	                	<input type="text"   name="f_cust_trdp_cd" maxlength="20" onKeyDown="codeNameAction('CUST', this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('CUST', this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"> 
                    	<button type="button" name="cust" id="cust" class="input_seach_btn" tabindex="-1" onClick="doWork('CUST_POPLIST')"></button>
                        <input type="text"   name="f_cust_trdp_nm" onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){doWork('CUST_POPLIST_NAME');}">
                 	</td>
                 	
					<th><bean:message key="Buyer"/></th>
	                <td>
	                	<input type="text"   name="f_buyr_trdp_cd" maxlength="20" onKeyDown="codeNameAction('BUYER', this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('BUYER', this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"> 
                    	<button type="button" name="buyr" id="buyr" class="input_seach_btn" tabindex="-1" onClick="doWork('BUYER_POPLIST')"></button>
                        <input type="text"   name="f_buyr_trdp_nm" onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){doWork('BUYER_POPLIST_NAME');}">
                 	</td>
                 	
                 	<th><bean:message key="Vendor"/></th>
	                <td>
	                	<input type="text"   name="f_vndr_trdp_cd" maxlength="20" onKeyDown="codeNameAction('VENDOR', this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('VENDOR', this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"> 
                    	<button type="button" name="vendor" id="vendor" class="input_seach_btn" tabindex="-1" onClick="doWork('VENDOR_POPLIST')"></button>
                        <input type="text"   name="f_vndr_trdp_nm" onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){doWork('VENDOR_POPLIST_NAME');}">
                 	</td>
                </tr>
                <tr>
                    <th><bean:message key="Origin"/></th>
                    <td>
                    	<input type="text"  id="f_org_loc_cd" name="f_org_loc_cd"  maxlength="5"    class="search_form" onKeyDown="codeNameAction('ORGIN', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('ORGIN', this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"/>
                        <button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('ORGIN_LOCATION_POPLIST')"></button>
                        <input type="text"  id="f_org_loc_nm" name="f_org_loc_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){doWork('ORGIN_LOCATION_POPLIST_NAME');}"/>
                    </td>
                    
                    <th><bean:message key="Destination"/></th>
                    <td>
                        <input type="text"    id="f_dest_loc_cd"  name="f_dest_loc_cd"  maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('DEST', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('DEST', this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"/>
                   		<button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('DEST_LOCATION_POPLIST')"></button>
                   		<input type="text"  id="f_dest_loc_nm" name="f_dest_loc_nm" maxlength="50"   class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){doWork('DEST_LOCATION_POPLIST_NAME');}"/>
                    </td>  
                    
                    <th><bean:message key="PO_Status"/></th>
                	<td>
                		<bean:define id="ordStsCdList" name="valMap" property="ordStsCdList"/> 
                    	<select name="f_ord_sts_cd" class="search_form" style="width:150px;">
                        	<option value="">ALL</option>
                            	<logic:iterate id="ordStsCdVO" name="ordStsCdList">
                                	<option value='<bean:write name="ordStsCdVO" property="cd_val"/>'><bean:write name="ordStsCdVO" property="cd_nm"/></option>
                                </logic:iterate>
                        </select>
                    </td>               
              	</tr>
				</tbody>
			</table>
		</div>	
	</div>
	<!-- inquiry_area(E) -->
	
	<!-- grid_area(S) -->
	<div class="wrap_result">
		<div class="opus_design_inquiry">				
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div> 
			<table border="0" width="1100">
				<tr>
					<td width="100">
						<bean:define id="pagingVal" name="valMap"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
					</td>
					<td align="center" width="900">
						<table width="900">
							<tr>
								<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
								</td>
							</tr>
						</table>		
					</td>
					<td width="100"></td>
				</tr>
			</table>
		</div>
		<!-- grid_area(E) -->
	</div>
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	

