<%--
=========================================================
*@FileName   : ACC_JOR_0300.jsp
*@FileTitle  : Tax Bill Deposit Journal List
*@Description: Tax Bill Deposit Journal List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/01/18
*@since      : 2012/01/18

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/25
*@since      : 2014/07/25
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0300.js?ver=<%=CLT_JS_VER%>" ></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
<%-- 	<bean:define id="btnRole"  name="valMap" property="btnRole"/> --%>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>
	
	<script>
		function setSelection(){
			//frm1.s_bank_cd.value = '<bean:write name="bankSel"/>';
			//frm1.s_ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
		}

		function setupPage() {
			setSelection();loadPage();
		}
	</script>
	
	
<form name="frm1" method="POST" action="./ACC_JOR_0300.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_JOR_0300.clt"/>
	
	<input type="hidden" name ="slip_post" value="<bean:write name="slip_post"/>"/>
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" onclick="doWork('NEW')"><bean:message key="New"/></button><!--
	   --><span id="saveBtn2" onclick="doWork('MODIFY')"><button id="btnModify" type="button" class="btn_normal" onclick="doWork('NEW')"><bean:message key="Save"/></button></span><!--
	   --><span id="deleteBtn2" style="display:none;" onclick="doWork('DELETE')"><button id="btnDelete" type="button" class="btn_normal" onclick="doWork('NEW')"><bean:message key="Delete"/></button></span><!--
	   --><button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
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
					<col  width="90"></col>
					<col  width="200"></col>
					<col  width="110"></col>
					<col  width="200"></col>
					<col  width="70"></col>
					<col  width="120"></col>
				</colgroup>
					<tr>
						<th><bean:message key="Post_Date"/></th>
						<td><!--
						--><input type="text" name="s_post_strdt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10"><!--
						-->~ <!--
						--><input type="text" name="s_post_enddt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10"><!--
						--><button type="button" id="s_post_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
						</td>
						
						<th><bean:message key="Received_From"/></th>
                        <td><!--
						--><input type="text" name="s_rcv_from_cd" value="" style="width:50px" onKeyDown="codeNameAction('BILLTO',this, 'onKeyDown')" onBlur="codeNameAction('BILLTO',this, 'onBlur')"><!--
						--><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="doWork('CUSTOMER_POPLIST')"></button><!--
						--><input type="text" name="s_rcv_from_nm" value="" style="width:120px" onKeyDown="custEnterAction(this,'CUSTOMER')">
                        </td>
                        
						<th><bean:message key="Branch"/></th>
                        <td><!--
						--><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
						--><select name="s_ofc_cd" style="width:150px;"/><!--
						--><bean:size id="len" name="oficeList" /><!--
						--><logic:greaterThan name="len" value="1"><!--
						--><option value=''>ALL</option><!--
						--></logic:greaterThan><!--
						--><logic:iterate id="ofcVO" name="oficeList"><!--
						--><option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option><!--
						--></logic:iterate><!--
						--></select>
                        </td>
                        <td></td>
					</tr>
					<tr>
						<th><bean:message key="Deposit_Date"/></th>
						<td><!--
						--><input type="text" name="s_deposit_strdt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10"><!--
						-->~ <!--
						--><input type="text" name="s_deposit_enddt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10"><!--
						--><button type="button" id="s_deposit_dt_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1"></button>
						</td>
						<th><bean:message key="Check_No"/></th>
                        <td>
				            <input type="text" name="s_chk_no" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:203px">
                        </td>
						<th><bean:message key="Bank"/></th>
                        <td><!--
						--><select name="s_bank_cd" style="width:150px;"><!--
						--><option value="">ALL</option><!--
						--><bean:define id="paramBankList"  name="valMap" property="bankList"/><!--
						--><logic:iterate id="BankVO" name="paramBankList"><!--
						--><option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option><!--
						--></logic:iterate><!--
						--></select>
                        </td>
					</tr>
					<tr>
						<th><bean:message key="Received_Amount"/></th>
						<td colspan="2"><!--
						--><input type="text" name="s_amt_fr" value="" onkeyPress="onlyNumberCheck();" onkeyDown="entSearch();" onchange="addComma(this);setAmount()" maxlength="13" dataformat="excepthan" style="ime-mode:disabled;width:90px;text-align:right;">~ <!--
						--><input type="text" name="s_amt_to" value="" onkeyPress="onlyNumberCheck();" onkeyDown="entSearch();" onchange="addComma(this)" maxlength="13" dataformat="excepthan" style="ime-mode:disabled;width:90px;text-align:right;">
						</td>
					</tr>
				</table>
		</div>
	</div>
	
	
	<div class="wrap_result">
    	<div class="opus_design_grid" id="mainTable">
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
    </div>
</div>
</form>


