<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHLocMgmt.js
*@FileTitle  : Location Management
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/17
=========================================================--*/
%>

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
    <script type="text/javascript" src="./apps/fis/wms/whloc/script/WHLocMgmt.js?ver=<%=CLT_JS_VER%>"></script>  
	
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String in_loc_cd 		= "";
	String in_loc_nm 		= "";
	try {
		/* in_loc_cd  	= request.getParameter("loc_cd")== null?userInfo.getDef_wh_cd():request.getParameter("loc_cd");
		in_loc_nm  	= request.getParameter("loc_nm")== null?userInfo.getDef_wh_nm():request.getParameter("loc_nm"); */
		in_loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
		in_loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
	}catch(Exception e) {
		out.println(e.toString());
	}
	

%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="space_tp_cd" name="cdMap" property="space_tp_cd"/>
<bean:define id="put_tp_cd" name="cdMap" property="put_tp_cd"/>
<bean:define id="abc_cd" name="cdMap" property="abc_cd"/>
<bean:define id="use_flg_cd" name="cdMap" property="use_flg_cd"/>
<bean:define id="prop_cd" name="cdMap" property="prop_cd"/>

 <script language="javascript">    
	
	var space_tp_cdCode = "";
	var space_tp_cdText = "";
	
	var put_tp_cdText = "";
	var put_tp_cdCode = "";
	
	var abc_cdText = "";
	var abc_cdCode = "";
	
	var use_flg_cdText = "";
	var use_flg_cdCode = "";
	
	var prop_cdText = "";
	var prop_cdCode = "";
	
	var code = "";
	var name = "";
	
	
    <logic:iterate id="codeVO" name="space_tp_cd">
           space_tp_cdCode+= '|' + '<bean:write name="codeVO" property="code"/>';
           space_tp_cdText+= '|' + '<bean:write name="codeVO" property="name"/>';
    </logic:iterate>
    space_tp_cdCode = space_tp_cdCode.substring(1);
    space_tp_cdText = space_tp_cdText.substring(1);
    <logic:iterate id="codeVO" name="put_tp_cd">
               put_tp_cdCode+= '|' +  '<bean:write name="codeVO" property="code"/>';
               put_tp_cdText+= '|' + '<bean:write name="codeVO" property="name"/>';
    </logic:iterate>
    put_tp_cdCode = put_tp_cdCode.substring(1);
    put_tp_cdText = put_tp_cdText.substring(1);
    <logic:iterate id="codeVO" name="abc_cd">
               abc_cdCode+=  '|' + '<bean:write name="codeVO" property="code"/>';
               abc_cdText+=  '|' + '<bean:write name="codeVO" property="name"/>';
    </logic:iterate>
    abc_cdCode = abc_cdCode.substring(1);
    abc_cdText = abc_cdText.substring(1);
   
    <logic:iterate id="codeVO" name="use_flg_cd">
            
               use_flg_cdCode+=  '|' + '<bean:write name="codeVO" property="code"/>';
               use_flg_cdText+=  '|' + '<bean:write name="codeVO" property="name"/>';
    </logic:iterate>
    use_flg_cdCode = use_flg_cdCode.substring(1);
    use_flg_cdText = use_flg_cdText.substring(1);
  
    <logic:iterate id="codeVO" name="prop_cd">
            
               prop_cdCode+=  '|' + '<bean:write name="codeVO" property="code"/>';
               prop_cdText+=  '|' + '<bean:write name="codeVO" property="name"/>';
    </logic:iterate>
    prop_cdCode = prop_cdCode.substring(1);
    prop_cdText = prop_cdText.substring(1);
   
</script>
	  	
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>	                                                                                                                                      
                                                                                                                                                                                                                              
<form id="form" name="form" action="./searchESOPTmpDow.clt" method="post">  
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="form_mode" 	    value="NEW" />
 
<%--  <input type="hidden" name="curr_date" 		value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), "-")%>" />
 <input type="hidden" name="user_id" 		value="<%=userInfo.getUser_id()%>" /> 
 <input type="hidden" name="user_nm" 		value="<%=userInfo.getUser_nm()%>" />
 <input type="hidden" name="org_cd" 		value="<%=userInfo.getOrg_cd()%>" />
 <input type="hidden" name="org_nm" 		value="<%=userInfo.getOrg_nm()%>" /> 
 <input type="hidden" name="rol_id"			value="<%=userInfo.getRol_id()%>" /> --%>
<%--  <input type="hidden" name="curr_date" 	value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), "-")%>" /> --%>
 <input type="hidden" name="user_id" 		value="<%=userInfo.getUsrid() %>" /> 
 <input type="hidden" name="user_nm" 		value="<%=userInfo.getUser_name() %>" />
 <input type="hidden" name="org_cd" 		value="<%=userInfo.getOfc_cd() %>" />
 <input type="hidden" name="org_nm" 		value="<%=userInfo.getOfc_eng_nm() %>" /> 
 <input type="hidden" name="rol_id"			value="1,4,6,7,9,10" />
 <input type="hidden" name="in_loc_cd_send"			value="<%=in_loc_cd %>" />
 
 <div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			
			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button>
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

<div class="over_wrap" height="100%">
<div class= "wrap_search_tab">
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="50" />
				<col width="*"/>
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
							<bean:define id="WhList" name="cdMap" property="WH_LIST"/>
							<select name="in_loc_cd" id="in_loc_cd" class="search_form" style="width: 213px;">
								<logic:iterate id="WhVO" name="WhList">
									<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
								</logic:iterate>
							</select>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div class= "wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Zone"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Block"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Location"/></span></a></li>
        <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Property"/></span></a></li>
    </ul>
    <!-- Tab1  -->
    <div id="tabLayer" name="tabLayer" >  
		<div class= "opus_design_grid clear" >
			<div class="opus_design_btn">  
				<button type="button" class="btn_normal" id="btn_Save1" onClick="doWork('btn_Save1');" name="btn_Save1""><bean:message key="Save"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_Add1" onClick="doWork('btn_Add1');" name="btn_Add1""><bean:message key="Add"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_Del1" onClick="doWork('btn_Del1');" name="btn_Del1""><bean:message key="Del"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- Tab2  -->
	<div id="tabLayer" name="tabLayer" style="display:none">  
		<div class= "opus_design_grid clear" >
			<!-- layout_wrap(S) -->
			<div class="layout_wrap">
			    <div class="layout_vertical_2 pad_rgt_4" style = "width:65%">
			        <!-- opus_design_grid(S) -->
			        <div class="opus_design_grid clear">
			            <table style="height:35px" >
			                    <tr>
			                     	<td><h3 class="title_design"><bean:message key="Block_Code_List"/></h3></td>
			                     	<td width="370"></td>
			                        <td align="right">
				                        <div class="opus_design_btn">  
											<button type="button" class="btn_normal" id="btn_Save2" onClick="doWork('btn_Save2');" name="btn_Save2""><bean:message key="Save"/></button><!-- 
											 --><button type="button" class="btn_normal" id="btn_Add2" onClick="doWork('btn_Add2');" name="btn_Add2""><bean:message key="Add"/></button><!-- 
											 --><button type="button" class="btn_normal" id="btn_Del2" onClick="doWork('btn_Del2');" name="btn_Del2""><bean:message key="Del"/></button>
										 </div>
			                		</td>
			                    </tr>
		                </table>  
	            		<script type="text/javascript">comSheetObject('sheet2');</script>
			        </div>
			        <!-- opus_design_grid(E) -->
			    </div>
			    <div class="layout_vertical_2" style = "width:35%">
			        <!-- opus_design_grid(S) -->
			        <div class="opus_design_grid clear">
			        	<table style="height:35px">
		        			<tr>
		        				<td><h3 class="title_design"><bean:message key="Sub_Location_in_Block"/></h3></td>
		        			</tr>
			        	</table>  
		                <script type="text/javascript">comSheetObject('sheet3');</script>
			        </div>
			        <!-- opus_design_grid(E) -->
			    </div>
			</div>
			<!-- layout_wrap(E) -->
		</div>
	</div>
	<!-- Tab4  -->
	<div id="tabLayer" name="tabLayer" style="display:none">  
		
		<div class= "opus_design_grid clear" >
			<div class="opus_design_btn">  
				<button type="button" class="btn_normal" id="btn_Save4" onClick="doWork('btn_Save4');" name="btn_Save4""><bean:message key="Save"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_Add4" onClick="doWork('btn_Add4');" name="btn_Add4""><bean:message key="Add"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_Del4" onClick="doWork('btn_Del4');" name="btn_Del4""><bean:message key="Del"/></button><!--
				 --><button type="button" class="btn_normal" id="btn_Excel4" onClick="doWork('btn_Excel4');" name="btn_Excel4""><bean:message key="Excel"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet5');</script>
		</div>
	</div>
	<!-- Tab3  -->
	<div id="tabLayer" name="tabLayer" style="display:none">  
		<div class= "opus_design_grid clear" >
			<div class="opus_design_btn">  
				<button type="button" class="btn_normal" id="btn_Save3" onClick="doWork('btn_Save3');" name="btn_Save3""><bean:message key="Save"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_Add3" onClick="doWork('btn_Add3');" name="btn_Add3""><bean:message key="Add"/></button><!-- 
				 --><button type="button" class="btn_normal" id="btn_Del3" onClick="doWork('btn_Del3');" name="btn_Del3""><bean:message key="Del"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet4');</script>
		</div>
	</div>
	
	
</div>	
<div class= "wrap_result" >
	<div class= "opus_design_inquiry">
		<table>
			<colgroup>
				<col width="50" />
				<col width="120" />
				<col width="130" />
				<col width="120" />
				<col width="50" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Warehouse_Code"/></th>
					<td>
						<input name="loc_cd" type="text" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" class="L_input_R" id="loc_cd" maxlength="10" readOnly tabindex="-1"/>
					</td>
					<th><bean:message key="Warehouse_Name"/></th>
					<td>
					    <input name="loc_nm" type="text" class="L_input_R" id="loc_nm" style="width:300px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="100" readOnly tabindex="-1"/>
					</td>
					<th><bean:message key="USE"/></th>
					<td>
					    <input name="use_yn" type="text" class="L_input_R" id="use_yn" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="100" readOnly tabindex="-1"/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
</div>
</form>

<iframe name="ifra_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>

