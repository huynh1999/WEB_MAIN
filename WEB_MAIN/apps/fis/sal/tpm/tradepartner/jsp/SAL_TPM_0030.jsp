<%--
=========================================================
*@FileName   : SAL_TPM_0030.jsp
*@FileTitle  : Trade Partner ManagementList
*@Description: Trade Partner ManagementList
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0030.js?ver=<%=CLT_JS_VER%>"></script>
	
	
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
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

		var TPCD = '';
        var TPNM = '';
        
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="codeList"  name="valMap" property="payType"/>
        <logic:iterate id="codeVO" name="codeList">
            <% if(isBegin){ %>
                TPCD+= '|';
                TPNM+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TPCD+= '<bean:write name="codeVO" property="cd_val"/>';
            TPNM+= '<bean:write name="codeVO" property="cd_nm"/>';
        </logic:iterate>
        
        function setupPage(){
        	loadPage();
        }
	</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
		
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofcLoclNm %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input  type="hidden" name="f_trdp_cd" />
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TPM_0030.clt"/>
	 <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')" style="display: none;"><bean:message key="Search"/></button> 
		   <button type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')" style="display: none;"><bean:message key="Save"/></button>
		   <button type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" style="display: none;" name="btn_DownExcel"><bean:message key="Excel"/></button>
		   <button type="button" class="btn_normal" btnAuth="CLEAR" onclick="clearAll()" style="display: none;"><bean:message key="Clear"/></button>
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
	<!-- wrap_search (S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="80">
					<col width="100">
					<col width="100">
					<col width="150">
					<col width="150">
					<col width="*">
				</colgroup>
				<tbody>
               <tr>
                 <th><bean:message key="Trade_Partner"/></th>
                 <td>
                    <input type="text" name="s_e_trdp_cd" id="s_e_trdp_cd" maxlength="20" onKeyDown="codeNameAction('partner', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner',this, 'onBlur')" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:70px;"><!--  
                   --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LINER_POPLIST')"></button><!-- 
                   --><input name="s_e_trdp_nm" type="text" class="search_form" dataformat="multiLanguage"  style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:150px;" maxlength="20" onKeyPress="if(event.keyCode==13){doWork('LINER_POPLIST_NAME')}"><!-- 
                  --></td>
                <th><bean:message key="TP_Type"/></th>
                <td> 
                    <logic:notEmpty name="EventResponse">
	             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	             	<bean:define id="cdList" name="cdMap" property="tpType"/>
             		<select name="s_trdp_tp_cd" required  style="width:140px;" onchange="searchList();">
             			<option value="">All</option>
           				<logic:iterate id="codeVO" name="cdList">
            			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
           				</logic:iterate>
           				</select>
            		</logic:notEmpty>
				</td>  
                  <!-- 
				<th><bean:message key="TP_Code"/></th>
				<td><input name="s_trdp_cd" type="text" maxlength="20"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;" onkeydown="entSearch();"></td>
				 -->
				<th><bean:message key="Account_Group_ID"/></th>
				<td><input name="s_acct_no" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" maxlength="20"></td>
				
               </tr>
               <tr>
                  <th><bean:message key="Payment_Type"/></th>
                  <td> 
                   <logic:notEmpty name="EventResponse"> 
                   <bean:define id="cdMap"  name="EventResponse" property="mapVal"/> 
                   <bean:define id="cdList" name="cdMap" property="payType"/> 
                   <select name="s_sls_gp_cd" class="search_form" style="width:150px;"> 
                   <option value="">All</option> 
                   		<logic:iterate id="codeVO" name="cdList"> 
                   			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option> 
                   		</logic:iterate> 
                   	</select> 
                   </logic:notEmpty></td>
					<th><bean:message key="Over_Limit"/></th>
					<td> 
					 <select name="s_amt_over" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-align:left"> 
						 <option value="A">All</option> 
						 <option value="Y">Yes</option> 
						 <option value="N">No</option> 
					 </select></td>
					<td></td>
					<td></td>
		          </tr>
		      </tbody>
        </table> 
		</div>
	</div>
	<!-- wrap_search (E) -->
	<!-- wrap_result(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>

    	<div class="opus_design_inquiry">				
				<table border="0" width="1100">
					<tr>
						<td width="100">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
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
     </div>
     <!-- wrap_result(E) -->
     <!-- // #23 #52878 - [ZEN] TRADE PARTNER EDIT HISTORY MANAGEMENT -->
     <div class="wrap_result">
        <h3 class="title_design"><bean:message key="History"/></h3>
        <div class="opus_design_grid "id="mainTable">
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
</div>
	</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

