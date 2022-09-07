<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0020.jsp
*@FileTitle  : Deposit Journal List
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/20
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm 	 = userInfo.getUser_name();
		String email 	 = userInfo.getEml();
		String cnt_cd 	 = userInfo.getOfc_cnt_cd();
	%>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>
	<script>
	
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edoa_flg = "<%= userInfo.getEdoa_flg() %>";
	
		function setupPage(){
			setSelection();
			loadPage();
		}
		function setSelection(){
			//Japan에서는 선택없음
			//if('<%=cnt_cd%>' != "JP"){
				frm1.s_bank_cd.value = '<bean:write name="bankSel"/>';
			//}
		}
		  
		
	</script>
	<form name="frm1" method="POST" action="./ACC_JOR_0020.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="file_name" id="file_name" value=""/>
	<input type="hidden" name="rd_param" id="rd_param"  value=""/>
	<input type="hidden" name="title" id="title"  value=""/>
	<input type="hidden" name="f_jnr_no" id="f_jnr_no" value=""/>
	<input type="hidden" name="f_attr3"  id="f_attr3" value="<%=roleBtnVO.getAttr3()%>"/>
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd" id="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id"  id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  id="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  id="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pst_dt_flg"  id="pst_dt_flg" value="<%= userInfo.getPst_dt_flg() %>"/> <!--    #6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023) -->
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_JOR_0020.clt"/>
	<input type="hidden" name="slip_post" id="slip_post" value="<bean:write name="slip_post"/>"/>
	<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq"value=""/>
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />	
	
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP"> 
				<%-- 
				<button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')" name="btnNew"><bean:message key="New"/></button> 
				<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button> 
				<button type="button" class="btn_normal" style="display:none;"  btnAuth="<%= roleBtnVO.getAttr4() %>" onclick="doWork('DELETE')"><bean:message key="Delete"/></button> 
				<button type="button" class="btn_normal" style="display:none;"  btnAuth="JNR_HISTORY" onclick="doWork('JNR_HIS')"><bean:message key="History"/></button> 
				<span style="display:none;" id="printBtn02"><button type="button" class="btn_normal" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button></span> 
				<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button> 
				<button type="button" class="btn_normal" style="display:none;" btnAuth="B_ACCOUNT_SLIP" onclick="doWork('SLIP')"><bean:message key="B.Account_Slip"/></button> 
				<button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onclick="clearAll();"><bean:message key="Clear"/></button>
				--%>
			</div>
			<!-- opus_design_btn(E) -->
    
  			<!-- page_location(S) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
	
	<!-- inquiry_area(S) -->	
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry src_pannel ">
			<table>	
					<colgroup>
			        	<col width="115">
			        	<col width="195">
			        	<col width="92">
			        	<col width="195">
			        	<col width="50">
			        	<col width="198">
			        	<col width="57">
			        	<col width="170">
			        	<col width="55">
			        	<col width="100">
			        	<col width="80">			        	
			        	<col width="*">
				   </colgroup>
			        <tbody>
						<tr>
								<th><bean:message key="Post_Date"/></th>
								<td><!-- 
									--><input type="text" id="s_post_strdt" name="s_post_strdt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_post_enddt);mkDateFormatType(this,event,true,1);" onFocus="select();"><span class="dash">~</span><!--
									--><input type="text" id="s_post_enddt" name="s_post_enddt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_post_strdt, this);mkDateFormatType(this,event,true,1);" onFocus="select();"><!-- 
									--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="s_post_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
								</td>
								
								<th>
									<select name="s_search_rcv_type" id="s_search_rcv_type"  style="width:150px; font-weight: bold;">
									    <option value='RCV'>Received From</option>
									    <option value='RCV_CD'>Received From Code</option>
									    <option value='RCV_NM' selected='selected'>Received From Name</option>
									</select>
								</th>
		                        <td><!-- 
						            --><input type="text" name="s_rcv_from_cd" id="s_rcv_from_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" onKeyDown="codeNameAction('BILLTO',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('BILLTO',this, 'onBlur')" class="search_form"><!-- 
						            --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="doWork('CUSTOMER_POPLIST')"></button><!-- <!-- 
						            --><input type="text" name="s_rcv_from_nm" id="s_rcv_from_nm" maxlength="100" value="" onblur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:120px" onKeyDown="custEnterAction(this,'CUSTOMER_NAME')" class="search_form">
		                        </td>
								<th><bean:message key="Branch"/></th>
		                        <td>
		                            <bean:define id="oficeList" name="valMap" property="ofcList"/>
		                            <select required name="s_ofc_cd" id="s_ofc_cd" style="width:90px;">
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
		                        
								<th><bean:message key="HBL_No"/></th>
		                        <td>
		                        	<input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" type="text" name="s_hbl_no" id="s_hbl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;"/>
		                        </td>
		                        <th><bean:message key="Issued_By"/></th>
								<td>
		                             <input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" type="text" name="s_issued_by" id="s_issued_by" maxlength="12" value="" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:120px" class="search_form">
		                        </td>    		                        
		                        <th><bean:message key="Remark"></bean:message> </th>
								<td>
		                             <input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" id="s_rmk" name="s_rmk" maxlength="12" value="" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:120px;" class="search_form" type="text" />
		                        </td> 
					</tr>
					</tbody>
			</table>
		</div>
		<div class="opus_design_inquiry tbl_pannel ">
			<table>	
					<colgroup>
				        <col width="120">
			        	<col width="195">
			        	<col width="92">
			        	<col width="195">
			        	<col width="50">
			        	<col width="195">
			        	<col width="54">
			        	<col width="195">
			        	<col width="55">			        	
			        	<col width="*">
				   </colgroup>
			        <tbody>
							<tr>
								<th><bean:message key="Deposit_Date"/></th>
								<td><!-- 
		                            --><input type="text" name="s_deposit_strdt" id="s_deposit_strdt" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_deposit_enddt);firCalFlag=false;" onFocus="select();" size='11' class="search_form"><span class="dash">~</span><!-- 
		                            --><input type="text" name="s_deposit_enddt" id="s_deposit_enddt" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_deposit_strdt, this);firCalFlag=false;" onFocus="select();" size='11' class="search_form"><!-- 
									--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="s_deposit_dt_cal" onclick="doDisplay('DATE2', frm1);"></button>
								</td>
								<th><bean:message key="Check_No"/></th>
		                        <td>
						            <input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" type="text" name="s_chk_no" id="s_chk_no" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:203px" class="search_form">
		                        </td>
								<th><bean:message key="Bank"/></th>
		                        <td>
		                            <select name="s_bank_cd" id="s_bank_cd" style="width:180px;">
		                            	<option value="">ALL</option>
		                           		<bean:define id="paramBankList"  name="valMap" property="bankList"/>
										<logic:iterate id="BankVO" name="paramBankList">
		                           			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
		                           		</logic:iterate>
		                           	</select>
		                        </td>
		                        <th><bean:message key="MBL_No"/></th>
		                        <td>
		                        	<input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" type="text" name="s_mbl_no" id="s_mbl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;"/>
		                        </td>     
		                        <!--#598 [BNX] Payment List, Deposit List to have Remark Search Box added    
		                        <th><bean:message key="Remark"/></th>
								<td>
		                            <input type="text" name="s_rmk"  maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onBlur="strToUpper(this);" onkeydown="entSearch();">
		                        </td>  
		                         -->  
		                         <th></th>
		                         <td></td>  
		                        
    
						</tr>
				</tbody>
			</table>
		</div>
		<div class="opus_design_inquiry tbl_pannel ">
			<table>	
				<colgroup>
			        	<col width="120">
			        	<col width="223">
			        	<col width="90">
			        	<col width="100">			        	
			        	<col width="35">
			        	<col width="195">
			        	<col width="33">
			        	<col width="100">
			        	<col width="200">
			        	<col width="60">			        	
			        	<col width="*">
				</colgroup>
			        <tbody>
						<tr>
							<th><bean:message key="Received_Amount"/></th>
							<td><!-- 
								--><input type="text" name="s_amt_fr" id="s_amt_fr" onkeyPress="onlyNumberCheck('-.');" 
																	onKeyUp="if(event.keyCode==13){firAmtFlag=true;};if(event.keyCode==9){chkCmprAmt(firAmtFlag, false, this, this, frm1.s_amt_to)};" 
																	onBlur="chkCmprAmt(firAmtFlag, false, this, this, frm1.s_amt_to);firAmtFlag=false;" 
																	onchange="addComma(this);setAmount();" maxlength="16" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;"><span class="dash">~</span><!-- 
								--><input type="text" name="s_amt_to" id="s_amt_to" onkeyPress="onlyNumberCheck('-.');if(event.keyCode==13){doWork('SEARCHLIST');}" onKeyUp="if(event.keyCode==13){firAmtFlag=true;};" onBlur="chkCmprAmt(firAmtFlag, false, this, frm1.s_amt_fr, this);firAmtFlag=false;" onchange="addComma(this);" maxlength="16" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;"> 
							</td>
	                        <th><bean:message key="Void"/></th>
							<td>
								<bean:define id="ynLst" name="valMap" property="yesNoCdList"/>
	                             <html:select name="valMap" property="s_void_yn" style="width:60px;">
	                                 <option value="">All</option>
	                                 <html:options collection="ynLst" property="cd_val" labelProperty="cd_nm"/>
	                             </html:select>
	                        </td>     
							<th><bean:message key="Void_Date"/></th>
							<td><!-- 
	                            --><input type="text" name="s_void_strdt" id="s_void_strdt" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_void_enddt);firCalFlag=false;" onFocus="select();" size='11' class="search_form"><span class="dash">~</span><!-- 
	                            --><input type="text" name="s_void_enddt" id="s_void_enddt" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_void_strdt, this);firCalFlag=false;" onFocus="select();" size='11' class="search_form"><!-- 
								--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="s_void_dt_cal" onclick="doDisplay('DATE3', frm1);"></button>
	                        </td>
							<td></td>
                        	<th><bean:message key="Other_Reference_No"/></th>
	                        <td>
	                        	<input onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}" type="text" name="s_oth_ref_no" id="s_oth_ref_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;"/>
	                        </td>
	                        <th></th>
	                        <td></td>
					</tr>
				</tbody>
			</table>
		</div>	
	</div>
	<!-- inquiry_area(E) -->
	
	<!-- grid_area(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable" style="padding-top:5px">
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
		<div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>		
	</div>
	<!-- grid_area(E) -->	  
</div>
	</form>
	
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

