<%--
=========================================================
*@FileName   : SAL_TPM_0020.jsp
*@FileTitle  : Trade Partner ManagementList
*@Description: Trade Partner ManagementList
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

*@Change history:
*@author	: Tuan.Chau
*@version	: 2.0 - 14/07/2014
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0020.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>
	
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>
<script>
function setupPage(){
	loadPage();
}
</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>

	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofcLoclNm %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TPM_0020.clt"/>
	
	<input type="hidden" name="trdp_cd">
	<!-- #52472 [CLT] 안정성: Excel 다운로드 건수 제한 -->
	<input type="hidden" name="endMaxIdx" value = "10000" />

	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<bean:define id="sale_flg" value="<%= userInfo.getSale_flg() %>"/>
	
	<input	type="hidden" name="sale_flg" value="<%= userInfo.getSale_flg() %>"/>
	
<!-- Button -->
<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
   <%-- 
	   	<button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')" style="display:none;"><bean:message key="Search"/></button>
	   	<button type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" 	class="btn_normal" onclick="doWork('NEW')" style="display:none;"><bean:message key="New"/></button>
	   	<button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onClick="clearAll();"><bean:message key="Clear"/></button>
	   	<button id="btnCopy" type="button" btnAuth="COPY" 	class="btn_normal" onclick="doWork('COPY')" style="display:none;"><bean:message key="Copy"/></button>
	   	<button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" 	class="btn_normal" onclick="doWork('PRINT')" style="display:none;"><bean:message key="Print"/></button>
	   	<button id="btnPrint" type="button" btnAuth="PRE_WO" 	class="btn_normal" onclick="doWork('PREWO')" style="display:none;"><bean:message key="Pre_WO"/></button>
	   	<button type="button" btnAuth="<%= roleBtnVO.getAttr6() %>" 	class="btn_normal" onclick="doWork('EXCEL')" style="display:none;" name="btn_DownExcel"><bean:message key="Excel"/></button>
	   	<button type="button" btnAuth="<%= roleBtnVO.getAttr6() %>" 	class="btn_normal" onclick="doWork('EXCEL_ALL')" style="display:none;" name="btn_DownExcel"><bean:message key="Excel"/> (ALL)</button>
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

<!-- Search option -->
<div class="over_wrap" height="100%">
<div class="wrap_search">	
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="70px"></col>
				<col width="200px"></col>
				<col width="100px"></col>
				<col width="150px"></col>
				<col width="100px"></col>
				<col width="170px"></col>
				<col width="100px"></col>
				<col width="120px"></col>
				<col width="100px"></col>				
				<col width="*"></col>
			</colgroup>
            <tr>
				<th><bean:message key="Alias"/>/<bean:message key="Name"/></th>
				<td><input name="s_eng_nm" type="text"  dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:195px;" maxlength="50" onkeydown="entSearch();"></td>
				<th><bean:message key="TP_Code"/></th>
				<td><input name="s_trdp_cd" type="text" maxlength="20"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onkeydown="entSearch();"></td>
				<th><bean:message key="Country"/></th>
				<td> 
					<input name="s_cnt_cd" type="text"   value="" maxlength="2" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:40px;" onKeyUp="codeNameAction('country',this, 'onKeyUp');" onBlur="codeNameAction('country',this, 'onBlur')"><!--
					--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('COUNTRY_POPLIST')"></button><!--
					--><input name="s_cnt_nm" type="text" class="search_form-disable" style="width:77px;" readOnly>
				</td>
				<th><bean:message key="State"/></th>
				<td><input name="s_state_cd" type="text" dataformat="excepthan" style="width:40px;text-align:left;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('state', this, 'onKeyUp')" onBlur="strToUpper(this);codeNameAction('state', this, 'onBlur');"><!-- 
					--><button id="state" type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('STATE_POPLIST')""></button><!-- #3148[BNX] county와 동일하게 state name 반영
					--><input name="s_state_nm" type="text" class="search_form-disable" style="width:67px;" readOnly>
				</td>
				<th><bean:message key="City"/></th>
				<td><input type="text" name="s_city_nm" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;text-align:left;" onBlur="strToUpper(this);" maxlength="50" onkeydown="entSearch();"></td>
			</tr>
			<tr>
                <th><bean:message key="TP_Type"/></th>
                <td class="table_search_body2"> 
                    <logic:notEmpty name="EventResponse">
	             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	             	<bean:define id="cdList" name="cdMap" property="tpType"/>
             		<select name="s_trdp_tp_cd" required  style="width:195px;" onchange="searchList();">
             			<option value="">ALL</option>
           				<logic:iterate id="codeVO" name="cdList">
           					<logic:match name="codeVO" property="use_flg" value="Y">
            				<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
           					</logic:match>
           				</logic:iterate>
           				</select>
            		</logic:notEmpty>
				</td>
				<th><bean:message key="Tax_ID_No"/></th>
				<td><input name="s_biz_no" type="text"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" maxlength="50" onkeydown="entSearch();"></td>
				<th><bean:message key="Contact_Person"/></th>
				<td><input name="s_pic_nm" type="text"  style="width:150px;" maxlength="50" onkeydown="entSearch();"></td>
				<th><bean:message key="Name_Local"/></th>
				<td><input name="s_locl_nm" type="text"  dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:140px;" maxlength="50" onkeydown="entSearch();"></td>
				<th><bean:message key="Account_Group_ID"/></th>
				<td><input name="s_acct_cd" type="text" maxlength="20"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onkeydown="entSearch();"></td>
             </tr>
             <tr>
                <th><bean:message key="Created_On"/></th>
				<td>
					<input type="text" style="width: 76px;" name="s_strdt" id="s_strdt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" ><!--
					--><span class="dash">~</span><!--
					--><input type="text" style="width: 76px;" name="s_enddt" id="s_enddt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" ><!--
					--><button type="button" id="s_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button> 
				</td>
				<th><bean:message key="Phone_Cell"/></th>
				<td><input name="s_pic_phn" type="text"  id="s_pic_phn" dataformat="excepthan" style="ime-mode:disabled; width:140px;" maxlength="20" onchange='validFaxPhone(this)' ></td>
				<th><bean:message key="Email"/></th>
				<td><input name="s_pic_eml" type="text"  style="width:150px;" maxlength="50" onkeydown="entSearch();"></td>
				<th><bean:message key="Use_Flag"/></th>
				<td>
					<logic:notEmpty name="EventResponse">
			            <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
		             	<bean:define id="cdList" name="cdMap" property="useFlg"/>
	             		<select name="s_delt_flg"  style="width:140px;">
	             			<logic:iterate id="codeVO" name="cdList">
	            					 <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	           					 </logic:iterate>
	           					 <option value="">ALL</option>
	           				 </select>
	            	 </logic:notEmpty>
            	</td>
            	<th><bean:message key="Prefix"/></th>
				<td><input name="s_prefix" type="text"  dataformat="excepthan" style="ime-mode:disabled; width:120px;" maxlength="20" onkeydown="entSearch();"></td>
             </tr>
             <tr>
             <!-- #5126 [Best Ocean] #4709 Sales PIC field hide system option to be managed by Role Control Option -->
		       <logic:equal name="sale_flg" value="Y">
	             	<th id="sales_person_lb"><bean:message key="Sales_Person"/></th>
					<td id="sales_person">
						<input type="text" name="s_sls_usrid" dataformat="excepthan" style="width:60px;ime-mode:disabled;" maxlength="12" onKeyDown="codeNameAction('user', this, 'onKeyUp')" onBlur="codeNameAction('user', this, 'onBlur')"><!--
						--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('USER_POPLIST')"></button><!--
						--><input type="text" name="s_sls_usrnm" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:103px;text-align:left" onKeyPress="if(event.keyCode == 13){doWork('USER_POPLIST_NAME');}">
					</td>
				</logic:equal>
				<th><select name="s_addr_zip" style="width:95px; font-weight: bold;"><option value="LOCALADDR"><bean:message key="Local_Address"/></option><option value="ADDR"><bean:message key="BL_Address"/></option><option value="ZIP"><bean:message key="Zip"/></option></select></th>					
				<td><input name="s_addr" type="text"  dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase; width:140px;" maxlength="400" onkeydown="entSearch();"></td>
				<th><bean:message key="IATA_Firm"/></th>	
				<td><input type="text" name="s_iata_nm" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px" onkeypress="if(event.keyCode==13){return false;}"/></td>		
				<th><bean:message key="Firm_Code"/></th>
				<td><input type="checkBox" id="s_iata_cd" name="s_iata_cd" /></td>		
				<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
				<logic:notEmpty name="cdMap" property="tpZone">
				
				<!-- C.W Park.
					#336[ZEN] TRADE PARTNER GROUP CODE SEARCH FUNCTION ON TP LIST SCREEN  -->
				<th>TP Group</th>
				<td>
					 <input type="text" name="s_tp_grp" value='' style="width:90px" readonly="readonly" /><!--  
					  --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('TRDP_GROUP_POPLIST')"></button>
				</td>
				
				<!--  <th><bean:message key="Group"/></th>
                <td class="table_search_body2"> 
                    <logic:notEmpty name="EventResponse">
	             	<bean:define id="cdList" name="cdMap" property="tpZone"/>
             		<select name="s_tp_grp"  style="width:120px;">
             			<option value="">ALL</option>
           				<logic:iterate id="codeVO" name="cdList">
            			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
           				</logic:iterate>
           				</select>
            		</logic:notEmpty>
				</td>-->
				</logic:notEmpty>	
				<logic:empty name="cdMap" property="tpZone">
					<input type="hidden" name="s_tp_grp" value='' /> 
				</logic:empty>				
            </tr>
		</table>
	</div>
</div>
<div class="wrap_result">
    <div class="opus_design_grid">
    	<script language="javascript">comSheetObject('sheet1');</script>
    </div>
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="40px">
				 <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
				 <paging:options name="pagingVal" defaultval="200"/></td>
			<td align="center">
				 <table>
					 <tr>
						 <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
						 </td>
					 </tr>
				 </table></td>
			<td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
		</tr>
	</table>
	<div class="opus_design_grid"  style="width:57%">
		<h3 class="title_design"><bean:message key="Contact_Information"/>&nbsp;<bean:message key="List"/></h3>
		<div class="opus_design_btn">
			<button id="btnSave" onClick="doWork('REMOVE')" type="button" class="btn_normal"><bean:message key="Save"/></button><!--
			--><button type="button" class="btn_normal" id="fileUpObj" onClick="doWork('ROWADD1')" ><bean:message key="Add" /></button>
		</div>
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
</div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="paFileDown"/>
    <input type="hidden" name="trdp_cd" value=""/>
    <input type="hidden" name="cntc_seq" value=""/>
</form>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
			
</body>
</html>

