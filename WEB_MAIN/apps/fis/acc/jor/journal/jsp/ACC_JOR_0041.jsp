<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0041.jsp
*@FileTitle  : Check Journal List Manager
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/15
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>

	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0041.js?ver=<%=CLT_JS_VER%>"></script>

	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm 	 = userInfo.getUser_name();
		String email 	 = userInfo.getEml();
		String cnt_cd 	 = userInfo.getOfc_cnt_cd();

		/* LHK, 20140421, #27585, Print 권한 제어 */
		String prn_flg		= userInfo.getPrn_flg();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>


	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="btnRole"  name="valMap" property="btnRole"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>

	<script>
	
	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var edoa_flg = "<%= userInfo.getEdoa_flg() %>";
	
		function setSelection(){
			//Japan에서는 선택없음
			//if('<%=cnt_cd%>' != "JP"){
				frm1.s_bank_cd.value = '<bean:write name="bankSel"/>';
			//}
			//frm1.s_ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
		}

		var btn_role = '<bean:write name="btnRole" property="attr4"/>';
	</script>
	
	<script>
	function setupPage(){
		setSelection();
		loadPage();
	}
	</script>

	<form name="frm1" method="POST" action="./ACC_JOR_0041.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>

	<input id="file_name" name="file_name" value="" type="hidden" />
	<input id="rd_param" name="rd_param" value="" type="hidden" />
	<input id="title" name="title" value="" type="hidden" />
	<input id="f_jnr_no" name="f_jnr_no" value="" type="hidden" />
	<input id="rider_yn" name="rider_yn" value="" type="hidden" />

	<input type="hidden" id="slip_post" name ="slip_post" value="<bean:write name="slip_post"/>"/>
	<input id="f_attr3" name="f_attr3" value="<%=roleBtnVO.getAttr3()%>" type="hidden" />
	<input id="f_attr4" name="f_attr4" value="<%=roleBtnVO.getAttr4()%>" type="hidden" />

	<!-- GridSetting Value -->
	<input id="role_cd" name="role_cd" value="<%=userInfo.getRole_cd()%>" type="hidden" />
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	<input id="ofc_nm" name="ofc_nm" value="<%=userInfo.getOfc_locl_nm()%>" type="hidden" />
	<input id="ofc_cd" name="ofc_cd" value="<%=userInfo.getOfc_cd()%>" type="hidden" />
	<input id="apo_flg" name="apo_flg" value="<%=userInfo.getApo_flg()%>" type="hidden" />
	<input type="hidden" name="pst_dt_flg"  id="pst_dt_flg" value="<%= userInfo.getPst_dt_flg() %>"/> <!--    #6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023) -->
	
	
	<input id="deposit_level" name="deposit_level" type="hidden"  value="<bean:write name="valMap" property="deposit_level"/>"/>
	<input id="payment_level" name="payment_level" type="hidden"  value="<bean:write name="valMap" property="payment_level"/>"/>
		
	<input name="pageurl" id="pageurl" value="ACC_JOR_0041.clt" type="hidden" />

	<input id="f_chk_form" name="f_chk_form" value="" type="hidden" />

	<!-- LHK, 20140422, #27585, Print 권한 제어  -->
	<input id="prn_flg" name="prn_flg" value="<%= prn_flg %>" type="hidden" />
	
	<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq"value=""/>
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />		
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	  		 <%-- 
		    <button type="button" class="btn_accent" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  onclick="doWork('NEW')"><bean:message key="New"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>" id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>" id="btnDelete" onclick="doWork('DELETE')"><bean:message key="Delete"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="JNR_HISTORY"  onclick="doWork('JNR_HIS')"><bean:message key="History"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')" id="btnPrint"><bean:message key="Print"/></button> 
			<button type="button" class="btn_normal" onclick="doWork('RIDERPRINT')" style="display:none;" id="riderprintBtn02" name="riderprintBtn02"><bean:message key="Rider_Print"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="B_ACCOUNT_SLIP" onclick="doWork('SLIP')"><bean:message key="B.Account_Slip"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="MESSENGER_SLIP"  onclick="doWork('MESSENGER_SLIP')"><bean:message key="Messenger_Slip"/></button> 
			<button type="button" class="btn_normal" style="display: none;" btnAuth="CLEAR" onclick="clearAll();"><bean:message key="Clear"/></button>
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
	
<div class="over_wrap" style="height:100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry src_pannel">
			<table>
				<colgroup>
		        	<col width="90">
		        	<col width="200">
		        	<col width="90">
		        	<col width="220">
		        	<col width="90">
		        	<col width="170">
		        	<col width="100">
		        	<col width="100">
			        <col width="80">
		        	<col width="*">
				</colgroup>
			    <tbody>
			    	<tr>
						<th><bean:message key="Post_Date"></bean:message></th>
						<td><!-- 
							--><input type="text" id="s_post_strdt" name="s_post_strdt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_post_enddt);mkDateFormatType(this,event,true,1);" onFocus="select();"><span class="dash">~</span><!--
							--><input type="text" id="s_post_enddt" name="s_post_enddt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_post_strdt, this);mkDateFormatType(this,event,true,1);" onFocus="select();"><!-- 
							--><button class="calendar ir" onclick="doDisplay('DATE1', frm1);" name="s_post_dt_cal" id="s_post_dt_cal" type="button"></button>
						</td>
						<th><bean:message key="Vendor"></bean:message></th>
                        <td>
				            <input id="s_vendor_cd" name="s_vendor_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onkeydown="codeNameAction('BILLTO',this, 'onKeyDown')" onblur="codeNameAction('BILLTO',this, 'onBlur')" class="search_form" type="text" /><!--
				            --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('CUSTOMER_POPLIST')"></button><!--
				            --><input id="s_vendor_nm" name="s_vendor_nm" maxlength="50" value="" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:123px;" onkeydown="if(event.keyCode == 13){doWork('CUSTOMER_NAME')};" class="search_form" type="text" />
                        </td>
						<th><bean:message key="Branch"></bean:message></th>
                        <td>
                            <bean:define id="oficeList" name="valMap" property="ofcList"/>
                            <select name="s_ofc_cd" style="width:85px;">
                            <bean:size id="len" name="oficeList" />
                            <logic:greaterThan name="len" value="1">
                            	<option value=''>ALL</option>
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
                        <th><bean:message key="Issued_By"></bean:message> </th>
						<td>
                             <input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" id="s_issued_by" name="s_issued_by" maxlength="12" value="" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:120px;" class="search_form" type="text" />
                        </td>
                        <th><bean:message key="Remark"></bean:message> </th>
						<td>
                             <input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" id="s_rmk" name="s_rmk" maxlength="12" value="" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:120px;" class="search_form" type="text" />
                        </td> 
					</tr>
				</tbody>
			</table>
		</div>
		<div class="opus_design_inquiry tbl_pannel">		
			<table>
				<colgroup>
		        	<col width="95">
		        	<col width="200">
		        	<col width="90">
		        	<col width="220">
		        	<col width="90">
		        	<col width="*">
				</colgroup>
			    <tbody>
					<tr>
						<th><bean:message key="Clear_Date"></bean:message></th>
						<td><!-- 
							--><input style="width:75px;" id="s_deposit_strdt" name="s_deposit_strdt" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_deposit_enddt);firCalFlag=false;" onFocus="select();" size="11" class="search_form" type="text" /><span class="dash">~</span><!--
							--><input style="width:75px;" id="s_deposit_enddt" name="s_deposit_enddt" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, frm1.s_deposit_strdt, this);firCalFlag=false;" onFocus="select();" size="11" class="search_form" type="text" /><!--
							--><button class="calendar ir" onclick="doDisplay('DATE2', frm1);" name="s_deposit_dt_cal" id="s_deposit_dt_cal" type="button"></button>
						</td>
						<th><bean:message key="Check_No"></bean:message></th>
                        <td>
				            <input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" id="s_chk_no" name="s_chk_no" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:206px;" class="search_form" type="text" />
                        </td>
						<th><bean:message key="Bank"></bean:message></th>
                        <td>
                            <select name="s_bank_cd" style="width:180px;">
                            	<option value="">ALL</option>
                           		<bean:define id="paramBankList"  name="valMap" property="bankList"/>
								<logic:iterate id="BankVO" name="paramBankList">
                           			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
                           		</logic:iterate>
                           	</select>
                        </td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="opus_design_inquiry tbl_pannel">		
			<table>
				<colgroup>
		        	<col width="95">
		        	<col width="180">
		        	<col width="112">
		        	<col width="60">
		        	<col width="79">
		        	<col width="95">
		        	<col width="70">
		        	<col width="50">
		        	<col width="70">
		        	<col width="50">
		        	<col width="70">
		        	<col width="*">
				</colgroup>
			    <tbody>
			    	<tr>
						<th><bean:message key="Paid_Amount"></bean:message></th>
						<td>
							<input style="width:75px;" type="text" name="s_amt_fr" onkeyPress="onlyNumberCheck('-.');" onKeyUp="if(event.keyCode==13){firAmtFlag=true;};if(event.keyCode==9){chkCmprAmt(firAmtFlag, false, this, this, frm1.s_amt_to)};" onBlur="chkCmprAmt(firAmtFlag, false, this, this, frm1.s_amt_to);firAmtFlag=false;" onchange="addComma(this);setAmount();" maxlength="16" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right;"><span class="dash">~</span><!--
				            --><input style="width:75px;" id="s_amt_to" name="s_amt_to" onkeypress="onlyNumberCheck('-.');if(event.keyCode==13){doWork('SEARCHLIST');}" onkeyup="if(event.keyCode==13){firAmtFlag=true;};" onblur="chkCmprAmt(firAmtFlag, false, this, frm1.s_amt_fr, this);firAmtFlag=false;" onchange="addComma(this);" maxlength="16" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right;" type="text" />
						</td>
                        <th><bean:message key="Print"></bean:message></th>
						<td><bean:define id="ynLst" name="valMap" property="yesNoCdList"/>
                             <html:select name="valMap" property="s_print_yn" style="width:60px;">
                                 <option value="">All</option>
                                 <html:options collection="ynLst" property="cd_val" labelProperty="cd_nm"/>
                             </html:select>
                        </td>
                        <th><bean:message key="Void"></bean:message></th>
						<td><bean:define id="ynLst" name="valMap" property="yesNoCdList"/>
                             <html:select name="valMap" property="s_void_yn" style="width:60px;">
                                 <option value="">All</option>
                                 <html:options collection="ynLst" property="cd_val" labelProperty="cd_nm"/>
                             </html:select>
                        </td>     
						<th><bean:message key="Void_Date"/></th>
						<td><!-- 
							--><input style="width:75px;" id="s_void_strdt" name="s_void_strdt" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_void_enddt);firCalFlag=false;" onFocus="select();" size="11" class="search_form" type="text" /><span class="dash">~</span><!--
							--><input style="width:75px;" id="s_void_enddt" name="s_void_enddt" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, frm1.s_void_strdt, this);firCalFlag=false;" onFocus="select();" size="11" class="search_form" type="text" /><!--
							--><button class="calendar ir" onclick="doDisplay('DATE3', frm1);" name="s_void_dt_cal" id="s_void_dt_cal" type="button"></button>
                        </td>
                        <th><bean:message key="Block"></bean:message> </th>
						<td><bean:define id="ynLst" name="valMap" property="yesNoCdList"/>
                             <html:select name="valMap" property="s_block_yn" style="width:60px;">
                                 <option value="">All</option>
                                 <html:options collection="ynLst" property="cd_val" labelProperty="cd_nm"/>
                             </html:select>
                        </td>
                        <th></th>
                        <td></td>
					</tr>
				</tbody>
			</table>
			
		</div>
		</div>
		<div class="wrap_result">
    		<div class="opus_design_grid" style="padding-top:5px">
    			<script type="text/javascript">comSheetObject('sheet1');</script>
    		</div>
		<!-- #2341 [LBS] Deposit/Payment List 속도 개선을 위한 paging 처리 -->
		<table>
			<tr>
				<td width="55px"> 
				 <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
				 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
				 <paging:options name="pagingVal" defaultval="200"/> 
				 </td>								
				 <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td> 
			</tr>
		</table>	
			<!-- #2374 [LBS] Deposit/Payment List 에 Excel (All) 버튼 추가 -->	
		<div style="display:none;">
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>	
		<div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>      		
	</div>	    	
</div>
</form>
	
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>


