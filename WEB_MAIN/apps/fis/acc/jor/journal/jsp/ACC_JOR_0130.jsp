<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_JOR_0130.jsp
 *@FileTitle : Bank Book Balance Report
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
<script language="javascript" src="<%=CLT_PATH%>/apps/fis/acc/jor/journal/script/ACC_JOR_0130.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
<!-- 일자 및 달력팝업 호출 -->
<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>

<%
	String ofc_cd		= userInfo.getOfc_cd();
	String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String email 		= userInfo.getEml();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
%>

<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<script type="text/javascript">
	var ofcCd = "<%= userInfo.getOfc_cd() %>";
	function setupPage(){
		loadPage();
	}
</script>
<form name="frm1" method="POST" action="./">
<!-- Report Value -->
<input type="hidden" name="file_name" id="file_name" />
<input type="hidden" name="title" id="title" />
<input type="hidden" name="rd_param" id="rd_param" />

<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
<input type="hidden" name="f_email" value="<%= email %>"/>
<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
<input type="hidden" name="f_ofc_nm" value="<%= ofcLoclNm %>"/>
<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>

<input type="hidden" name="f_bank_seq" id="f_bank_seq" />
<input type="hidden" name="f_bank_nm" id="f_bank_nm" />

<input id="deposit_level" name="deposit_level" type="hidden"  value="<bean:write name="valMap" property="deposit_level"/>"/>
<input id="payment_level" name="payment_level" type="hidden"  value="<bean:write name="valMap" property="payment_level"/>"/>
<input id="ofc_cd" name="ofc_cd" value="<%=userInfo.getOfc_cd()%>" type="hidden" />
<input id="apo_flg" name="apo_flg" value="<%=userInfo.getApo_flg()%>" type="hidden" />	

<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="f_CurPage" id="f_CurPage" />
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%-- 
		   <button id="btnPrint" type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="doWork('Print')"><bean:message key="Print"/></button>
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
<!-- page_title_area(E) -->
<!-- wrap_search(S) -->
<div class="over_wrap" height="100%">
<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
<div class="opus_design_inquiry entry_pannel ">
	<table>
		<colgroup>
			<col width="100" />
			<col width="120" />
			<col width="120" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
                <th><bean:message key="Period"/></th>
				<td>
					<input style="width:75px" required type="text" name="s_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
				--><span class="dash">~</span><!-- 
				--><input style="width:75px" required type="text" name="s_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
				--><button type="button" name="s_dt_cal" id="s_dt_cal"  class="calendar ir" onclick="doDisplay('DATE1', frm1);"></button>
				</td>
				<td>
					<input type="checkbox" name="by_stat_dt" id="by_stat_dt"><label for="by_stat_dt">By Statement Date</label>
				</td> 
				<td>
					<span id="chk_layer" style="display:none"><input type="checkbox" name="by_check_no" id="by_check_no" ><label for="by_check_no"><bean:message key="By_Check_No"/></label></span>
				</td>           
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="100" />
			<col width="150" />
			<col width="150" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="SummaryDetail"/></th>
   				<td><input type="radio" name="bank_check" id="bank_check1" value="1" checked onClick="showLayer();"><label for="bank_check1"><bean:message key="Summary_All_Bank"/></label></td>
   				<td><input type="radio" name="bank_check" id="bank_check2" value="2" onClick="showLayer();"><label for="bank_check2"><bean:message key="Summary_Bank"/></label></td>
         		<td><input type="radio" name="bank_check" id="bank_check3" value="3" onClick="showLayer();"><label for="bank_check3"><bean:message key="Detail_Bank"/></label></td>
   			</tr>
			<tr>
				<th></th>
   				<td>
					<span id="list_layer1">
       					<select name="s_bank_list1" style="width:150px;">
               			<option value="1">List Bank</option>
               			<option value="2">Active Bank</option>
               			</select>
               		</span>
				</td>
				<td>
					<span id="list_layer2" style="display:none">
          				<select name="s_bank_list2" style="width:150px;">
                  		<bean:define id="paramBankList"  name="valMap" property="bankList"/>
							<logic:iterate id="BankVO" name="paramBankList">
                  			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
                  		</logic:iterate>
                  		</select>
                  	</span>
					
				</td>
				<td>
					<span id="list_layer3" style="display:none">
       					<select name="s_bank_list3" style="width:150px;">
               			<bean:define id="paramBankList"  name="valMap" property="bankList"/>
						<logic:iterate id="BankVO" name="paramBankList">
               			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
               			</logic:iterate>
               			</select>
               		</span>
				</td>
   			</tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
<!-- wrap_search(E) -->
</div>
</form>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>

