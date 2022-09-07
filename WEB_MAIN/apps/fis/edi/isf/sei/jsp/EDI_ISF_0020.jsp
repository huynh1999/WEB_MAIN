<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_ISF_0020.jsp
*@FileTitle  : ISF (Ocean) List
*@Description: ISF (Ocean) List
*@author     : Lee, HaeKyoung
*@version    : 1.0 - 09/10/2012
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/isf/sei/script/EDI_ISF_0020.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript">
		var ofc_cd = "<%=userInfo.getOfc_cd()%>";
		
		function setupPage(){
			initFinish();
			loadPage();
		}
		
	</script>
</head>
<body class="td" >
<form name="frm1" method="POST" action="./EDI_ISF_0020.clt">
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="EDI_ISF_0020.clt"/>
    
    <div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   
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
	<div class="wrap_search">
	    <div class="opus_design_inquiry entry_pannel ">
       		<table>
				<colgroup>
					<col width="110">
					<col width="150">
					<col width="100">
					<col width="180">
					<col width="120">
					<col width="210">
	  				<col width="80">
					<col width="*">
				</colgroup>
				<tbody>
	               <tr>
	                 <th><bean:message key="ISF_No"/></th>
	                 <td><input type="text" name="f_isf_no" maxlength="20" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"  onkeydown="entSearch();" /></td>
	                 <th><bean:message key="HBL_No"/></th>
	                 <td><input type="text"   name="f_hbl_no" value='' onblur="strToUpper(this)" style="width:195px;text-transform:uppercase;" onkeydown="entSearch();" ></td>
	                 <th><bean:message key="ETD"/></th>
	                 <td>
	                	<input style="width:75px;" type="text" name="f_etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_etd_strdt);firCalFlag=false;" size='11' maxlength="10" class="search_form">
	                 	<span class="dash">~</span>
	                 	<input style="width:75px;" type="text" name="f_etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_etd_enddt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form">
	                 	<button type="button" class="calendar ir" name="btn_calendar" id="f_etd_dt_cal" onclick="doDisplay('DATE11', frm1);"></button></td>
					 </td>
	                 <th><bean:message key="Importer"/></th>		
	                 <td><input type="text" name="f_im_entt_cd"  onBlur="codeNameActionEdi('trdpCode_importer',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" tabindex="35">
	                 <button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('IMPORTER_POPLIST');"></button>
	                 <input type="text"   name="f_im_entt_name" value='' onblur="strToUpper(this)" class="search_form" style="width:140;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUpEdi('IMPORTER_POPLIST', frm1.f_im_entt_name.value);}" tabindex="36">
	              </tr>
	               
	               <tr>
	                 <th><bean:message key="Status"/></th>
	                 <td width="80" nowrap="nowrap" class="table_search_body">
                       		<select name="f_msg_sts" class="search_form" style="width:80px;">
                       			   <option value="">ALL</option>
                                   <option value="A">Accepted</option>
                                   <option value="C"><bean:message key="Created"/></option>
                                   <option value="R">Rejected</option>
                                   <option value="S">Sent</option>
                            </select>
                     </td>
	                      
	                 <th><bean:message key="MBL_No"/></th>
	                 <td><input type="text" name="f_mbl_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:194px;"  onkeydown="entSearch();" /></td>
					 <th><bean:message key="ETA"/></th>
	                 <td>
	                	<input style="width:75px;" type="text" name="f_eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_eta_strdt);firCalFlag=false;" size='11' maxlength="10" class="search_form">
	                 	<span class="dash">~</span>
	                 	<input style="width:75px;" type="text" name="f_eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_eta_enddt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form">
	                 	<button type="button" class="calendar ir" name="btn_calendar" id="f_eta_dt_cal" onclick="doDisplay('DATE12', frm1);"></button></td>
					 </td>
					 <th><bean:message key="Consignee"/></th>
	                 <td><input type="text" name="f_cnee_cd"  onBlur="codeNameActionEdi('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" tabindex="35">
	                 <button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CONSIGNEE_POPLIST')"></button>
	                 <input type="text"   name="f_cnee_nm" value='' onblur="strToUpper(this)" class="search_form" style="width:140;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUpEdi('IMPORTER_POPLIST', frm1.f_im_entt_name.value);}" tabindex="36">
	              </tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
		
		<div class="layout_wrap">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid"  id="mainTable">
				<h3 class="title_design"><bean:message key="ISF_List"/></h3>
			    <script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<!-- opus_design_grid(E) -->
    	</div>
    	
	</div>                  
</div>
</form>
  
<script type="text/javascript">

</script>
