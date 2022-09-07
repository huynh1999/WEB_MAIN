<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInLotSelectPopup.jsp
*@FileTitle  : Lot ID Selection Popup
*@author     : TanPham - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================
--*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging" prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 	
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/common/js/WHInLotSelectPopup.js?ver=<%=CLT_JS_VER%>"></script>

<%

    String wh_cd = "";
    String wh_nm = "";
	String ctrt_no = "";
	String ctrt_nm = "";
	String item_cd = "";
	String fix_lot_id = "";
	String inbound_dt = "";
	String exp_dt = "";

	try {
		wh_cd = request.getParameter("wh_cd") == null ? "" : request.getParameter("wh_cd");		
		wh_nm = request.getParameter("wh_nm") == null ? "" : request.getParameter("wh_nm");		
		ctrt_no = request.getParameter("ctrt_no") == null ? "" : request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm") == null ? "" : request.getParameter("ctrt_nm");
		item_cd = request.getParameter("item_cd") == null ? "" : request.getParameter("item_cd");
		fix_lot_id = request.getParameter("fix_lot_id") == null ? "" : request.getParameter("fix_lot_id");
		inbound_dt = request.getParameter("inbound_dt") == null ? "" : request.getParameter("inbound_dt");
		exp_dt = request.getParameter("exp_dt") == null ? "" : request.getParameter("exp_dt");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>

<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd"/>
<input type="hidden" id="exp_dt" value= "<%=exp_dt%>"/>
<input type="hidden" id="inbound_dt" value= "<%=inbound_dt%>"/>
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Lot_ID_Selection"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_ok" id="btn_ok" onClick="doWork('btn_ok');"><bean:message key="OK"/></button><!-- 
		  --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!--
	 --></div>
	<!-- opus_design_btn(E) -->
</div>

<div class= "wrap_search">
<div class="opus_design_inquiry ">
	<table>
    	<colgroup>
  			   <col width="100" />
               <col width="320" />
               <col width="130" />
               <col width="320" />
               <col width="100" />
               <col width="*"/>
		</colgroup>    
		<tbody>        	
                <tr>		        
			        <th><bean:message key="Warehouse"/></th>
					<td>
						<input name="wh_cd" type="text" class="L_input_R" id="wh_cd" value="<%=wh_cd%>" style="width:80px;" readonly/><!-- 
						 --><input name="wh_nm" type="text" class="L_input_R" id="wh_nm" value="<%=wh_nm%>" style="width:110px;" readonly/>
					</td>
			        
			        <th><bean:message key="Contract_No"/></th>
					<td>
						<input name="ctrt_no" dataformat="engup" otherchar="-_" type="text" class="L_input_R" id="ctrt_no" value="<%=ctrt_no%>" style="width:80px;" readonly/><!-- 
						 --><input name="ctrt_nm" type="text" dataformat="engup" otherchar = " ()-_" class="L_input_R" id="ctrt_nm" value="<%=ctrt_nm%>" style="width:151px;" readonly/>
					</td>
					<th><bean:message key="Item"/></th>
                    <td>
						<input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" type="text" class="L_input_R" id="item_cd" value="<%=item_cd%>" style="width:140px;" readonly/>
                    </td>   
			       
		        </tr>
		        <tr>
		       		 <th><bean:message key="Lot_ID"/></th>
					<td>
						<input name="fix_lot_id" type="text" class="L_input" id="fix_lot_id" style="width:195px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="16" value="<%=fix_lot_id%>" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/>
					</td>
					
		        	<th>
		        		<select id="prop_date_tp" name="prop_date_tp" style="width: 115px">
		        			<option value = "INBOUND_DT"><bean:message key="Inbound_Date"/></option>
		        			<option value = "EXP_DT"><bean:message key="Expiration_Date"/></option>
		        		</select>
		        	</th>
		        	
					<td>
					    <input name="prop_date_fm" type="text" class="L_input" id="prop_date_fm" maxlength="10" style="width:80px;" value="<%=inbound_dt%>" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
					      maxlength="10" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.prop_date_to);firCalFlag=false;"/><!-- 
					     --><!-- 
					     --><span class="dash">~</span><!--  
                         --><input name="prop_date_to" type="text" class="L_input" id="prop_date_to" maxlength="10" style="width:80px;" value="<%=inbound_dt%>" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
                           maxlength="10" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_fm, this);firCalFlag=false;"/><!-- 
                         --><button class="calendar" type="button" id="btn_prop_date_to" name="btn_prop_date_to" onClick="doWork('btn_prop_date_to');"></button>
                       						
					</td>
					<th>
						<select id="prop_no_tp" name="prop_no_tp" style="width: 105px">
		        			<option value = "LOT_NO"><bean:message key="Item_Lot_No"/></option>
		        			<option value = "LOT_04"><bean:message key="Lot_04"/></option>
		        			<option value = "LOT_05"><bean:message key="Lot_05"/></option>
		        		</select>
					</th>
					<td>
						<input name="prop_no" type="text" class="L_input" id="prop_no" style="width:140px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20"/>
					</td>
		        </tr>
			</tbody>
	</table>
</div>
</div>
<div class="wrap_result">
		<div class= "opus_design_grid" style="margin-bottom:8px;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
</div>
</form>

<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>