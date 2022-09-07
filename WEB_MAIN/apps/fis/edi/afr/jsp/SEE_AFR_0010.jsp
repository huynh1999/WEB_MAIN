<%--
=========================================================
*@FileName   : SEE_AFR_0010.jsp
*@FileTitle  : 해운수출 일본세관 화물적화목록 EDI 처리
*@Description: 해운수출 일본세관 화물적화목록 EDI 처리
 *@author  : Park,Cheol-Woo - CyberLogitec
 *@version : 1.0 - 04/25/2016
 *@since   : 04/25/2016 (Park,Cheol-Woo - CyberLogitec)

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
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/afr/script/SEE_AFR_0010.js?ver=<%=CLT_JS_VER%>"></script>
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
		
		<!-- ###Package 코드## -->
		var PCKCD1 = '|';
		var PCKCD2 = '|';
		<logic:notEmpty name="valMap" property="pckCdList">
			<% isBegin = false; %>
	        <bean:define id="pckList" name="valMap" property="pckCdList"/>
			<logic:iterate id="pckVO" name="pckList">
				<% if(isBegin){ %>
					PCKCD1+= '|';
					PCKCD2+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				PCKCD1+= '<bean:write name="pckVO" property="pck_nm"/>';
				PCKCD2+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
			</logic:iterate>
		</logic:notEmpty>
		
		<!-- ###GMT 코드## -->
		var GMT_CD = '|';
        var GMT_NM = '|';
        <logic:notEmpty name="valMap" property="gmtList">
			<% isBegin = false; %>
			<bean:define id="gmtLst"  name="valMap" property="gmtList"/>
			<logic:iterate id="msgStsVO" name="gmtLst">
				<% if(isBegin){ %>
					GMT_CD+= '|';
					GMT_NM+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				   GMT_CD+= '<bean:write name="msgStsVO" property="cd_val"/>';
				   GMT_NM+= '<bean:write name="msgStsVO" property="cd_nm"/>';
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
	<input type="hidden" name="cntr_cnt">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%-- 
		   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  id="btnSearch" name="btnSearch"><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('COMMAND01')" style="display:none;" btnAuth="SEND_HBL_EDI"   id="btnSendEdi" name="btnSendEdi"><bean:message key="Send_EDI"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('COMMAND02')" style="display:none;" btnAuth="SEND_DEL_EDI"   id="btnSendDelEdi" name="btnSendDelEdi"><bean:message key="Send_Delete_EDI"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('COMMAND03')" style="display:none;" btnAuth="SEND_HBL_CMPL"   id="btnSendHblCmpl" name="btnSendHblCmpl"><bean:message key="Send_HBL_Completion"/></button>
		   <button type="button" class="btn_normal" style="cursor:hand;" onClick="doWork('COMMAND10');" name="btn_DownExcel"><bean:message key="Excel"/></button>
		   <!-- button type="button" class="btn_normal" style="cursor:hand;" btnAuth="CLEAR" onClick="clearAll();"><bean:message key="Clear"/></button-->
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
            		<col width="240"></col>
            		<col width="70"></col>
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
							<input type="text" name="f_mbl_no" maxlength="20" value=""  onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onBlur="strToUpper(this);" onkeydown="entSearch();">
						</td>
						
						<th><bean:message key="Liner"/></th>
						<td>
							<input type="text"   name="lnr_trdp_cd" maxlength="20" value='' onKeyDown="codeNameAction('trdpCode_sea_liner',this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('trdpCode_sea_liner',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" ><!-- 
                         --><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST_MS',this)"></button><!-- 
                         --><input type="text"   name="lnr_trdp_nm" maxlength="50" value='' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST_MS', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}" >
						</td>
						
						<th><bean:message key="Status"/></th>
		              	<td>
							<select name="f_msg_sts_cd" class="search_form" style="width:80px;text-align:left" >
						       	<option value="">ALL</option>
	                   		<bean:define id="stsList"  name="valMap" property="stsList"/>
					    	<logic:iterate id="sts" name="stsList">
		                   		<option value='<bean:write name="sts" property="cd_val"/>'><bean:write name="sts" property="cd_nm"/></option>
		                   	</logic:iterate>
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
                           --><input type="hidden" name="f_trnk_vsl_cd" value='' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;" ><!--
                           --><input type="text" name="f_trnk_vsl_nm" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:172px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this);checkChangeTrnkVslNm();" onKeyPress="if(event.keyCode==13){vslPopup(frm1.f_trnk_vsl_nm.value.toUpperCase());}" ><!-- 
                           --><input type="hidden" name="trnk_vsl_nm" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:172px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){vslPopup(frm1.trnk_vsl_nm.value.toUpperCase());}" ><!--  
                           --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="vslPopup('')"></button><!-- 
                           --><input type="text" name="f_trnk_voy_no" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="10" onblur="strToUpper(this)" />
						</td>
						
						<th><bean:message key="HBL_Completion"/></th>
		              	<td>
							<select name="f_hbl_cmpl_flg" class="search_form" style="width:80px;text-align:left" >
								<option value="" selected>ALL</option>
								<option value="Y" >Y</option>
								<option value="N" >N</option>
							</select>
		                </td>
		              </tr>
		              <tr>
						<th><bean:message key="POD"/></th>
                        <td><!-- 
                         	   --><input type="text" name="f_pod_cd"  id="pod" maxlength="5" value='' onKeyDown="codeNameAction2('location_pod',this, 'onKeyDown')" onBlur="codeNameAction2('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/><!--
                              --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('POD_LOCATION_POPLIST')" ></button><!--
                              --><input type="text" name="f_pod_nm" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                        </td>
						<!-- 
						<th><bean:message key="Action_Type"/></th>
		              	<td colspan="5">
							<select name="f_smt_tp_cd" class="search_form" style="width:120px;text-align:left" >
						       	<option value="">Auto</option>
						       	<option value="Original">Original</option>
						       	<option value="Correct">Correct</option>
						       	<option value="Add">Add</option>
						       	<option value="Delete">Delete</option>
							</select>
		                </td>
		                 -->
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
  
<script type="text/javascript">
<%-- doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>"); --%>
</script>	
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
    doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

