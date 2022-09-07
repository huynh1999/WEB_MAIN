<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FreightIndirectCostPopup.jsp
*@FileTitle  : Indirect Cost (Buying)
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/07/08
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/FreightIndirectCostPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>                                                                                                                                                                                                       
<%
	String frt_doc_no = "";
	String doc_cls_cd = "W";
	String ctry_cd = "";
	String buy_exrate_dt = "";
	String exrate_cls_cd = "";
	String buy_curr_cd = "";
	String buy_exrate = "";
	String buy_usd_conv_rate = "";
	String ex_in_cd = "";
	try {
		frt_doc_no = request.getParameter("frt_doc_no")== null?"":request.getParameter("frt_doc_no");
		/* doc_cls_cd = request.getParameter("doc_cls_cd")== null?"":request.getParameter("doc_cls_cd"); */
		ctry_cd = request.getParameter("ctry_cd")== null?"":request.getParameter("ctry_cd");
		buy_exrate_dt = request.getParameter("buy_exrate_dt")== null?"":request.getParameter("buy_exrate_dt");
		exrate_cls_cd = request.getParameter("buy_exrate_cls_cd")== null?"":request.getParameter("buy_exrate_cls_cd");
		buy_curr_cd = request.getParameter("buy_curr_cd")== null?"":request.getParameter("buy_curr_cd");
		buy_exrate = request.getParameter("buy_exrate")== null?"":request.getParameter("buy_exrate");
		buy_usd_conv_rate = request.getParameter("buy_usd_conv_rate")== null?"":request.getParameter("buy_usd_conv_rate");
		ex_in_cd = request.getParameter("ex_in_cd")== null?"":request.getParameter("ex_in_cd");
	}catch(Exception e) {
		out.println(e.toString());
	}
%>
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
<%-- <input type="hidden" name="curr_date" 	    value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), "-")%>" /> --%>
<input type="hidden" name="user_id" 		value="<%=userInfo.getUsrid()%>" /> 
<input type="hidden" name="user_nm" 		value="<%=userInfo.getUser_name()%>" />
<input type="hidden" name="org_cd" 			value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="org_nm" 			value="<%=userInfo.getOfc_locl_nm()%>" /> 
<input type="hidden" name="auth_lvl" 		value="LB" />
<input type="hidden" name="ctry_cd"    	    value="<%=ctry_cd%>" />
<input type="hidden" name="exrate_cls_cd"   value="<%=exrate_cls_cd%>" />
<input type="hidden" name="ex_in_cd"        value="<%=ex_in_cd%>" />
<input type="hidden" id="f_cmd" value="0" />
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Indirect_Cost_Buying"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			 <button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			  --><button type="button" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
			  --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
	</div>
</div>
<div class="layer_popup_contents">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
		<table>
		    <colgroup>
	            <col width="30" />
	            <col width="*" />                    
	        </colgroup>
	        <tbody>
				<tr>
	                	<%
	               	    if(doc_cls_cd.equals("W")){
	                	%>
						<th><bean:message key="Work_Order_No"/></th>
						<%
						}else if(doc_cls_cd.equals("S")){
						%>
						<th><bean:message key="Service_Order_No"/></th>
						<%
						}else if(doc_cls_cd.equals("F")){
						%>
						<th><bean:message key="FCR_No"/></th>
						<%
						}
						%>
						<td>
							<input name="doc_no" type="text" class="L_input_R" id="doc_no" style="width:150px" dataformat="engupnum"  value="<%=frt_doc_no%>" readOnly/>
							<input name="doc_cls_cd" type="hidden" value="<%=doc_cls_cd%>" />
						</td>
					</tr>
			</tbody>    
		</table>
	</div>
	</div>
	<div class= "wrap_search">
	<div class="opus_design_inquiry wFit">
		<table>
	    <colgroup>
	        <col width="97" />
	        <col width="150" />
	        <col width="150" />
	        <col width="150" />
	        <col width="151" />
	        <col width="*" />                    
	    </colgroup>		
	    <tbody>	
			<tr>
                    	<th ><bean:message key="Ex_Rate_Date"/></th>
                        <td >
                            <input name="buy_exrate_dt" type="text" class="L_input_R" id="buy_exrate_dt" value="<%=buy_exrate_dt%>" dataformat="ymd" style="width:85px;" maxlength="10" readOnly/>
                        	<%-- <img src="<%=CLT_PATH%>/web/images/common/icon_cal.gif" alt="search" name="btn_buy_exrate_dt" /> --%>
                        </td>
                        <th ><bean:message key="Ex_Class"/></th>
                        <td >
                        <!-- <script language="javascript">ComComboObject('buy_exrate_cls_cd', 1, 80, 1);</script> -->
                        <bean:define id="MsList" name="cdMap" property="buy_exrate_cls_cd"/>
							<select name="buy_exrate_cls_cd" id="buy_exrate_cls_cd" class="search_form" style="width: 120px;">
								<logic:iterate id="codeVO" name="MsList">
									<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
                        </td>
                        <th><bean:message key="Foreign_Curr"/></th>
                        <td >
                            <input name="buy_curr_cd" type="text" class="L_input_R" id="buy_curr_cd" value="<%=buy_curr_cd%>" style="width:50px;" dataformat="engup"  maxlength="3" readOnly />
                            <%-- <img src="<%=CLT_PATH%>/web/images/common/icon_search.gif" alt="search" name="btn_buy_curr_cd" /> --%>
                        </td>
                        <th><bean:message key="Ex_Rate"/></th>
                        <td><input name="buy_exrate" type="text" class="L_input_R" id="buy_exrate" value="<%=buy_exrate%>" style="width:100px;text-align:right;" dataformat="float" maxlength="15" readOnly/></td>
                        <th>1 USD=</th>
                        <td>
                            <input name="buy_usd_conv_rate" type="text" class="L_input_R" id="buy_usd_conv_rate" value="<%=buy_usd_conv_rate%>" style="width:95px;text-align:right;" dataformat="float" readOnly/>
                            <input name="buy_loc_curr_cd" type="text" class="L_input_R" id="buy_loc_curr_cd" value="KRW" style="width:50px;" readOnly/>
                        </td>   
                        <td width="200"></td>
                    </tr>   
		</tbody>	      
	</table>
	</div>
</div>
<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
	<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
		 	<button type="button" class="btn_normal" name="btn_buy_add" id="btn_buy_add" onClick="doWork('btn_buy_add');"><bean:message key="Add"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_buy_del" id="btn_buy_del" onClick="doWork('btn_buy_del');"><bean:message key="Del"/></button>
		</div>
	<!-- opus_design_btn(E) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>            
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
