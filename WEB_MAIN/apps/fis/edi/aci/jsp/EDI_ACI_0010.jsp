<%--
=========================================================
*@FileName   : EDI_ACI_0010.jsp
*@FileTitle  : 캐나다세관 화물적화목록 EDI 처리
*@Description: 캐나다세관 화물적화목록 EDI 처리
 *@author  : OJG - CyberLogitec
 *@version : 1.0 - 09/28/2016
 *@since   : 09/28/2016

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/aci/script/EDI_ACI_0010.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript">
		var cstmCd = ''; 
		var cstmNm = '';
		var cstmDptCd = ''; 
		var cstmDptNm = '';
		
		var MSG_STS_CD = '';
        var MSG_STS_NM = '';
        <% boolean isBegin = false; %>
		<logic:notEmpty name="valMap" property="stsList">
			<% isBegin = false; %>
			<bean:define id="msgStsLst"  name="valMap" property="stsList"/>
			<logic:iterate id="msgStsVO" name="msgStsLst">
				<% if(isBegin){ %>
					MSG_STS_CD+= '|';
					MSG_STS_NM+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				MSG_STS_CD+= '<bean:write name="msgStsVO" property="cd_val"/>';
				MSG_STS_NM+= '<bean:write name="msgStsVO" property="cd_nm"/>';
			</logic:iterate>		
		</logic:notEmpty>
		
		var DSPO_CD = '';
        var DSPO_NM = '';
        <% isBegin = false; %>
		<logic:notEmpty name="valMap" property="dspoCdLst">
			<% isBegin = false; %>
			<bean:define id="dspoCdLst"  name="valMap" property="dspoCdLst"/>
			<logic:iterate id="dspoVO" name="dspoCdLst">
				<% if(isBegin){ %>
						DSPO_CD+= '|';
						DSPO_NM+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				DSPO_CD+= '<bean:write name="dspoVO" property="cd_val"/>';
				DSPO_NM+= '<bean:write name="dspoVO" property="cd_nm"/>';
			</logic:iterate>		
		</logic:notEmpty>
		
		
	</script>
<script type="text/javascript">
<!--
function setupPage() {
	initFinish();
	loadPage();
	doWork('SEARCHLIST01');
}
//-->
</script>
<form name="frm1" method="POST" action="./">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd">
	<input type="hidden" name="f_edi_sts">
    <input type="hidden" name="f_edi_cre_seq">
	<input type="hidden" name="f_edi_msg_seq">
    <input type="hidden" name="f_edi_msg_no">
    <input type="hidden" name="f_intg_bl_seq">
	<input type="hidden" name="obdt_fltno">
	<input type="hidden" name="cntr_cnt">
	<input type="hidden" name="cntr_cgo">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"   id="btnSearch" name="btnSearch"><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('COMMAND01')"  style="display:none;" btnAuth="SEND_HBL_EDI"  id="btnSndHblEdi" name="btnSndHblEdi"><bean:message key="Send_HBL_EDI"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('COMMAND04')"  style="display:none;" btnAuth="SEND_HBL_EDI_DEL"  id="btnSndHblDelEdi" name="btnSndHblDelEdi"><bean:message key="Send_HBL_EDI_Delete"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('COMMAND03')"  style="display:none;" btnAuth="SEND_CLZ_EDI"   id="btnSndHblClzEdi" name="btnSndHblClzEdi"><bean:message key="Send_Close_EDI"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('COMMAND02')"  style="display:none;" btnAuth="SEND_SUPP_EDI"  id="btnSndHblSplEdi" name="btnSndHblSplEdi"><bean:message key="Send_Supp_EDI"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('COMMAND05')"  style="display:none;" btnAuth="SEND_SUPP_EDI_DEL"  id="btnSndHblSplDelEdi" name="btnSndHblSplDelEdi"><bean:message key="Send_Supp_EDI_Delete"/></button>
		   <button type="button" class="btn_normal" onClick="doWork('COMMAND10');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btn_DownExcel"><bean:message key="Excel"/></button>
		   <!-- button type="button" class="btn_normal" onClick="clearAll();" style="display:none;" btnAuth="CLEAR" ><bean:message key="Clear"/></button-->
		    --%>
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
					<col width="80"></col>
					<col width="190"></col>
					<col width="100"></col>
					<col width="150"></col>
					<col width="80"></col>
					<col width="120"></col>
					<col width="80"></col>
					<col width="120"></col>
					<col width="80"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="ETD"/></th>
						<td><!--
						--><input type="text" name="f_etd_str_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_etd_end_dt);firCalFlag=false;"/>~ <!--
						--><input type="text" name="f_etd_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_etd_str_dt, this);firCalFlag=false;"/><!--
						--><button type="button" id="f_etd_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
						</td>
						<th><bean:message key="MBL_No"/></th>
						<td>
							<input type="text" name="f_mbl_no" maxlength="20" value=""  onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onBlur="strToUpper(this);" >
						</td>
						
						<th><bean:message key="Liner"/></th>
						<td>
							<input type="text"   name="lnr_trdp_cd" maxlength="20" value='' onKeyDown="codeNameAction('trdpCode_sea_liner',this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('trdpCode_sea_liner',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" ><!-- 
                         --><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST_MS',this)"></button><!-- 
                         --><input type="text"   name="lnr_trdp_nm" maxlength="50" value='' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST_MS', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}" >
						</td>
						
						<th><bean:message key="Status"/></th>
		              	<td>
							<select name="f_sts_cd" class="search_form" style="width:120px;text-align:left" >
						       	<option value=""></option>
	                   		<bean:define id="stsList"  name="valMap" property="stsList"/>
					    	<logic:iterate id="sts" name="stsList">
		                   		<option value='<bean:write name="sts" property="cd_val"/>'><bean:write name="sts" property="cd_nm"/></option>
		                   	</logic:iterate>
							</select>
		                </td>
		                <th><bean:message key="EDI"/> <bean:message key="Kind"/></th>
		              	<td>
							<select disabled name="f_mf_sub_tp_cd" class="search_form" style="width:150px;text-align:left" onChange="ediClssChg();">
						       	<option value="HouseBill"><bean:message key="House_Bill"/></option>
						       	<option value="Supplementary" selected><bean:message key="Supplementary"/></option>
							</select>
		                </td>
					</tr>
		            <tr>
		            	
		            	<th><bean:message key="ETA"/></th>
						<td><!--
						--><input type="text" name="f_eta_str_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_eta_end_dt);firCalFlag=false;"/>~ <!--
						--><input type="text" name="f_eta_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_eta_str_dt, this);firCalFlag=false;"/><!--
						--><button type="button" id="f_eta_dt_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1"></button>
						</td>
						<th><bean:message key="HBL_No"/></th>
						<td >
							<input type="text" name="f_bl_no" maxlength="20" value=""  onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onBlur="strToUpper(this);" >
						</td>
						<th><bean:message key="VSL_VOY"/></th>
		                <td><!--
                           --><input type="hidden" name="f_trnk_vsl_cd" value='' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;" readonly><!--
                           --><input type="hidden" name="trnk_vsl_nm" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:173px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){vslPopup(frm1.trnk_vsl_nm.value.toUpperCase());}" ><!--
                           --><input type="text" name="f_trnk_vsl_nm" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:173px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this);checkChangeTrnkVslNm();" onKeyPress="if(event.keyCode==13){vslPopup(frm1.f_trnk_vsl_nm.value.toUpperCase());}" ><!-- 
                           --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="vslPopup('')"></button><!-- 
                           --><input type="text" name="f_trnk_voy_no" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="10" onblur="strToUpper(this)" />
						</td>
						<th><bean:message key="Department_Type"/></th>
		              	<td>
		              		<select name="f_dept_cd" class="search_form" style="width:120px;text-align:left" onChange="chgDept()">
						       	<option value="SI" selected><bean:message key="Ocean_Import"/></option>
						       	<option value="SO"><bean:message key="Ocean_Export"/></option>
						       	<option value="AI"><bean:message key="Air_Import"/></option>
						       	<option value="AO"><bean:message key="Air_Export"/></option>
							</select>
							<input type="hidden" name="f_air_sea_clss_cd" >
							<input type="hidden" name="f_bnd_clss_cd" >
		                </td>
		              </tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
    	<div class="opus_design_grid">
   			<h3 class="title_design"><bean:message key="HBL_List"/></h3>
				<div class="opus_design_btn">
					 <button type="button" class="btn_accent" onClick="doWork('EDI_BL_SAVE')"><bean:message key="Save"/></button>
				</div>
			</div>
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
    	
    	<div id="disp_val_msg" style="width:80%;;float:left!important;">
				<div class="layout_flex_fixed" style="width:770px;float:left!important">
			   		<h3 class="title_design"><bean:message key="Validation_Message"/></h3>
				</div>
			
				<table>
		 			<tr>
		 				<td>
		 					<textarea name="val_msg" cols="200" rows="7"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
		 				</td>
		 				<td valign="top"" style="padding: 5px;">
		 					<button onClick="disp_val_msg.style.display='none';" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Close"/></button>		
		 				</td>
		 			</tr>
		 		</table>
			</div>
			
    </div>
</div>
</form>
  
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
    doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

