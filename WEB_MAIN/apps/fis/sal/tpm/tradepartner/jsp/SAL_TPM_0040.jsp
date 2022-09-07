<%--
=========================================================
*@FileName   : SAL_TPM_0040.jsp
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
	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0040.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	
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
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TPM_0040.clt"/>

<!-- Button -->
<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
   <%-- 
	   	<button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')" style="display:none;"><bean:message key="Search"/></button>
	   	<button type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')" style="display: none;"><bean:message key="Save"/></button> 
		<button type="button" btnAuth="<%= roleBtnVO.getAttr6() %>" 	class="btn_normal" onclick="doWork('EXCEL')" style="display:none;" name="btn_DownExcel"><bean:message key="Excel"/></button>
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
				<col width="80px"></col>
				<col width="200px"></col>
				<col width="100px"></col>
				<col width="120px"></col>
				<col width="100px"></col>
				<col width="*"></col>
			</colgroup>
            <tr>
				<th><bean:message key="Alias"/>/<bean:message key="Name"/></th>
				<td><input name="s_eng_nm" type="text"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:195px;" maxlength="50" onkeydown="entSearch();"></td>
				<th><bean:message key="TP_Code"/></th>
				<td><input name="s_trdp_cd" type="text" maxlength="20"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;" onkeydown="entSearch();"></td>
				<th><bean:message key="Country"/></th>
				<td> 
					<input name="s_cnt_cd" type="text"   value="" maxlength="2" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase; width:40px;" onKeyUp="codeNameAction('country',this, 'onKeyUp');" onBlur="codeNameAction('country',this, 'onBlur')"><!--
					--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('COUNTRY_POPLIST')"></button><!--
					--><input name="s_cnt_nm" type="text" class="search_form-disable" style="width:77px;" readOnly>
				</td>
				<th><bean:message key="Account_Group_ID"/></th>
				<td><input name="s_acct_cd" type="text" maxlength="20"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onkeydown="entSearch();"></td>
			</tr>
			<tr>
                <th><bean:message key="TP_Type"/></th>
                <td class="table_search_body2"> 
                    <logic:notEmpty name="EventResponse">
	             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	             	<bean:define id="cdList" name="cdMap" property="tpType"/>
             		<select name="s_trdp_tp_cd" required  style="width:195px;">
             			<option value="">ALL</option>
           				<logic:iterate id="codeVO" name="cdList">
            			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
           				</logic:iterate>
           				</select>
            		</logic:notEmpty>
				</td>
				<th><bean:message key="Annual_Bond_No"/></th>
				<td align="left" ><input type="text" name="an_bond_no" value='' dataformat="excepthan" style="ime-mode:disabled;width:160px;text-align:left" maxlength="9" onKeyPress="onlyNumberCheck();" onkeydown="entSearch();" >
				<th><bean:message key="Entered_By"/></th>
				<td><input type="text" name="an_bond_entr_usrid" value='' dataformat="excepthan" style="width:80px;ime-mode:disabled;" maxlength="12" onKeyDown="codeNameAction('user', this , 'onKeyDown')" onBlur="codeNameAction('user', this , 'onBlur')"><!--
						--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('ENTR_USR_POPLIST')"></button><!--
						--><input type="text" name="an_bond_entr_usrnm" value='' class="search_form-disable" dataformat="excepthan" style="min-width:120px; ime-mode:disabled;width:110px;text-align:left" readOnly>
				</td>
				<th><bean:message key="Purchased_By"/></th>
				<td><input type="text" name="an_bond_pur_cd" maxlength="20" value='' onKeyDown="codeNameAction('trdpcode',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpcode',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
					--><button type="button" name="partner" id="partner" class="input_seach_btn" tabindex="-1" onClick="doWork('LINER_POPLIST2',this)"></button><!-- 
					--><input type="text"   name="an_bond_pur_nm" maxlength="50" value='' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" readOnly onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST2', document.getElementById('partner'), frm1.an_bond_pur_nm.value);}"> 
				</td>
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
</div>
</div>
</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
			
</body>
</html>

