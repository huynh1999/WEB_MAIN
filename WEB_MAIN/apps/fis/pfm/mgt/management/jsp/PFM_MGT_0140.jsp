<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0140.jsp
*@FileTitle  : Vendor Performance Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/25
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
 <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <bean:define id="valMap"    name="EventResponse" 	property="mapVal"/>
	<bean:define id="oficeList" name="valMap" 			property="ofcList"/>
	<bean:define id="currList"  name="valMap" 			property="currList"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
    
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/pfm/mgt/management/script/PFM_MGT_0140.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript">
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		var user_id = "<%=userInfo.getUsrid()%>";
		var user_eml = "<%=userInfo.getEml()%>";
		var user_phn = "<%=userInfo.getPhn()%>";
		var user_fax = "<%=userInfo.getFax()%>";
		var rpt_file_path = "<%=userInfo.getRpt_file_path().replaceAll("\\\\","\\\\\\\\")%>";
		
		function setupPage()
        {
			loadPage();
			doHideProcess();
        }
	</script>

<form name="frm1" method="post" onSubmit="return false;" enctype="multipart/form-data">

    <input type="hidden" name="f_cmd">
    <input type="hidden" name="rd_search_flg" value="N">
    <input type="hidden" name="vndr_tp_opt" value="">
    <input type="hidden" name="dptm_tp_opt" value="">
    <input type="hidden" name="dptm_tp_ot_opt" value="">
    <input type="hidden" name="f_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/>
    <div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
		<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
	</div>
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onClick="doWork('SEARCH')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" onClick="doWork('TOP_CLEAR')" style="display:none;" btnAuth="CLEAR"><bean:message key="Clear"/></button><!-- 
		--><button type="button" class="btn_normal" onClick="doWork('EXCEL')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btn_DownExcel"><bean:message key="Excel"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
<div class="over_wrap" height="100%">
	<div class="wrap_search_tab">	
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="40">
					<col width="110">
					<col width="60">
					<col width="280">
					<col width="50">
					<col width="*">
				</colgroup>
               <tr>
                  <th><bean:message key="Office"/></th>
                  <td>
                  	<select name="s_ofc_cd" style="width:100px;"/>
                  		<bean:size id="len" name="oficeList" />
                  		<logic:greaterThan name="len" value="1">
                  			<option value=''>ALL</option><
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
                   <th><bean:message key="Period"/></th>
                   <td>
                   		<select required name="s_dt_clss_cd">
                   		    <option value="P">Post Date</option>
                   		    <option value="I">Invoice Date</option>
                   		</select><!-- 
                    --><input required style="width: 70px;" type="text" name="s_prd_strdt" id="s_prd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_prd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!-- 
                    --><span class="dash">~</span><!-- 
                    --><input required style="width: 70px;" type="text" name="s_prd_enddt" id="s_prd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_prd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!-- 
                    --><button type="button" class="calendar" tabindex="-1" id="s_prd_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
                   </td>
                   <th><bean:message key="Curr"/></th>
                   <td>
                   		<select name="s_curr_cd" style="width:100px;"/>
                   			<option value="">ALL</option>
	                   		<logic:iterate id="currVO" name="currList">
	                   			<option value='<bean:write name="currVO"/>'><bean:write name="currVO"/></option>
	                   		</logic:iterate>
                   		</select>
                   	</td>
               </tr>
            </table>
            <table class="mar_top_8">
            	<colgroup>
					<col width="120">
					<col width="100">
					<col width="150">
					<col width="130">
					<col width="110">
					<col width="*">
				</colgroup>
                    <tr>
	            		<td colspan="3"><label style="background-color:#d4f6ff;"><b><bean:message key="Department"/></b></label></td>
	            		<td colspan="3"><b><bean:message key="Vendor_Type"/></b></td>
                	</tr>
                	<tr>
                 		<td><input name="s_oe_flg" id="s_oe_flg" type="checkbox" value="SO" ><label for="s_oe_flg"><bean:message key="Ocean_Export"/></label></td>
		                <td><input name="s_ae_flg" id="s_ae_flg" type="checkbox" value="AO" ><label for="s_ae_flg"><bean:message key="Air_Export"/></label></td>
		                <td><!-- 
		                 --><button type="button" class="btn_etc" onclick="doWork('ALL')"><bean:message key="All"/></button><!-- 
		                 --><button type="button" class="btn_etc" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button>
		                </td>
						<td><input type="radio" name="s_vndr_tp_opt" id="s_vndr_tp_cd1" value="LN" checked ><label for="s_vndr_tp_cd1"><bean:message key="Ocean_Carrier"/></label></td>
                     	<td><input type="radio" name="s_vndr_tp_opt" id="s_vndr_tp_cd2" value="AC" ><label for="s_vndr_tp_cd2"><bean:message key="Air_Carrier"/></label></td>
                     	<td><input type="radio" name="s_vndr_tp_opt" id="s_vndr_tp_cd3" value="TK" ><label for="s_vndr_tp_cd3"><bean:message key="Trucker"/></label></td>
                	</tr>
                	<tr>
                		<td><input name="s_oi_flg" id="s_oi_flg" type="checkbox" value="SI" ><label for="s_oi_flg"><bean:message key="Ocean_Import"/></label></td>
		                <td><input name="s_ai_flg" id="s_ai_flg" type="checkbox" value="AI" ><label for="s_ai_flg"><bean:message key="Air_Import"/></label></td>
		                <td><input name="s_ot_flg" id="s_ot_flg" type="checkbox" value="OT" ><label for="s_ot_flg"><bean:message key="Other_Operation"/></label></td>
		                <td><input type="radio" name="s_vndr_tp_opt" id="s_vndr_tp_cd4" value="CB"><label for="s_vndr_tp_cd4"><bean:message key="Customs_Broker"/></label></td>
                     	<td colspan="2"><input type="radio" name="s_vndr_tp_opt" id="s_vndr_tp_cd5" value="OT" ><label for="s_vndr_tp_cd5"><bean:message key="Other"/></label></td>
                	</tr>
            	</table>
		</div>
	</div>
	<div class="wrap_result_tab">
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Chart"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Detail"/></span></a></li>
	    </ul>
	
		<!-- tabLayer1 (S) -->
		<div name="tabLayer" id="tabLayer" style="display: inline;">
			<div class="opus_design_inquiry" id="mainRdTable" style="width: 1000px; height: 500px;">
				<script language="javascript">comRdObject('wo_rePort');</script>
			</div>
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<div class="opus_design_inquiry" style="width: 940px;">
				 <script language="javascript">comSheetObject('sheet');</script>
			</div>
		</div>
	</div>
</div>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>
