
<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0120.jsp
*@FileTitle  : Bank Reconcilication
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/14
========================================================= */
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/acc/jor/journal/script/ACC_JOR_0120.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
		
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
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
	</script>
	
	<script>
	function setupPage(){
		loadPage();
	}
	</script>
	
	<form name="frm1" method="POST" action="./">
	<!-- Report Value -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email" value="<%= email %>"/>
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_nm" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input type="hidden" name="f_bank_seq">
	<input type="hidden" name="f_bank_nm">
	
	<input type="hidden" name="dft_rvn_bank" value='<bean:write name="valMap" property="bankSel"/>'/>
	
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
			<button type="button" class="btn_accent" style="display: none;" btnAuth="CALCULATE" onclick="doWork('SEARCHLIST')"><bean:message key="B.Calculate"/></button> 
			<button type="button" class="btn_normal" id="btnPrint" style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><bean:message key="Print"/></button> 
			<button type="button" class="btn_normal"  style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="displayClear()"><bean:message key="New"/></button>
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
		<div class="opus_design_inquiry entry_pannel" style="width:100%">
			<table >
				<colgroup>
		        	<col width="60">
		        	<col width="150">
		        	<col width="90">
		        	<col width="*">
				</colgroup>
			    <tbody>
			    	<tr>
						<th><bean:message key="Bank"></bean:message></th>
                        <td >
                            <select name="s_bank_cd" style="width:150px;" onChange="SEARCH_YN='N';">
                           		<bean:define id="paramBankList"  name="valMap" property="bankList"/>
								<logic:iterate id="BankVO" name="paramBankList">
                           			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
                           		</logic:iterate>
                           	</select>
                        </td>
                        <th><bean:message key="Period"></bean:message></th>
						<td >
							<input id="s_strdt" name="s_strdt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_strdt);firCalFlag=false;SEARCH_YN='N';" size="11" maxlength="10" class="search_form" type="text" /><span class="dash">~</span><!-- 
							--><input id="s_enddt" name="s_enddt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, frm1.s_enddt, this);firCalFlag=false;SEARCH_YN='N';" size="11" maxlength="10" class="search_form" type="text" /><!-- 
							--><button class="calendar ir" onclick="SEARCH_YN='N';doDisplay('DATE1', frm1);" name="s_dt_cal" id="s_dt_cal" type="button"></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>	
		</div>
<div class="wrap_result">	
	<!-- layout_wrap (S) -->
	<div class="layout_wrap">
        <!-- opus_design_grid(S) -->
	        <div class="layout_vertical_3" style="height:600px;width:400px;">
		    	<div style="height:513px""" class="opus_design_inquiry sm">
				    	<h3 class="title_design">Balance Summary</h3>
	                	<table>
	                	<colgroup>
				        	<col width="180">
				        	<col width="*">
						</colgroup>
						<tbody>
	                        <tr>
	                            <td colspan="2"><b>&nbsp;&nbsp;&nbsp;<bean:message key="STATEMENT_BALANCE"></bean:message></b></td>
	                        </tr>
	                        <tr>
	                            <th style="color: #5D5D5D"><b><bean:message key="BEGINNING_BALANCE"></bean:message> :</b></th>
	                            <td style="padding-left: 20px;"><input id="begin_stat_bal" name="begin_stat_bal" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
	                        </tr>
	                        <tr>
	                            <th style="color: #5D5D5D"><b><bean:message key="DEPOSIT_AND_CREDIT"></bean:message> :</b></th>
	                            <td style="padding-left: 20px;"><input id="begin_tot_deposit_credit" name="begin_tot_deposit_credit" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
	                        </tr>
	                        <tr>
	                            <th style="color: #5D5D5D"><b><bean:message key="CHECKS_AND_DEBIT"></bean:message> :</b></th>
	                            <td style="padding-left: 20px;"><input id="begin_tot_check_debit" name="begin_tot_check_debit" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
	                        </tr>
	                        <tr>
	                            <th style="color: #5D5D5D"><b><bean:message key="ENDING_BALANCE"></bean:message> :</b></th>
	                            <td style="padding-left: 20px;"><input id="ending_stat_bal" name="ending_stat_bal" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
	                        </tr>
	                        </tbody>
	                    </table>
	
					    <table>
						    <colgroup>
					        	<col width="180">
					        	<col width="*">
							</colgroup>
							<tbody>
		                        <tr>
		                            <td colspan="2"><b>&nbsp;&nbsp;&nbsp;<bean:message key="OUTSTANDING"></bean:message></b></td>
		                        </tr>
		                    
		                        <tr>
		                            <th style="color: #5D5D5D"><b><bean:message key="DEPOSIT_AND_CREDIT"></bean:message> :</b></th>
		                            <td style="padding-left: 20px;">
							            <input id="ending_deposit_credit" name="ending_deposit_credit" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" />
		                            </td>
		                        </tr>
		                    
		                        <tr>
		                            <th style="color: #5D5D5D"><b><bean:message key="CHECKS_AND_DEBIT"></bean:message> :</b></th>
		                            <td style="padding-left: 20px;"><input id="ending_chk_debit" name="ending_chk_debit" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
		                        </tr>
		                        <tr>
		                            <th style="text-decoration: underline;"><b><bean:message key="ACTUAL_ENDING_BALANCE"></bean:message> :</b></th>
		                            <td style="padding-left: 20px;"><input id="actual_ending_bal" name="actual_ending_bal" value="" style="width:180px;text-align:right;text-decoration:underline;color:#000000; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
		                        </tr>
	<!--                        <tr>-->
	<!--                            <td class="line" colspan="2" style="vertical-align:top;" >&nbsp;</td>-->
	<!--                        </tr>-->
							</tbody>
	                    </table>
	
					    <table>
						    <colgroup>
					        	<col width="180">
					        	<col width="*">
							</colgroup>
							<tbody>
		                        <tr>
		                            <td  colspan="2"><b>&nbsp;&nbsp;&nbsp;<bean:message key="BOOK_BALANCE"></bean:message></b></td>
		                        </tr>
		                        <tr>
		                            <th style="color: #5D5D5D"><b><bean:message key="BEGINNING_BALANCE"></bean:message> :</b></th>
		                            <td style="padding-left: 20px;"><input id="actual_begin_book_bal" name="actual_begin_book_bal" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
		                        </tr>
		                        <tr>
		                            <th style="color: #5D5D5D"><b><bean:message key="DEPOSIT_AND_CREDIT"></bean:message> :</b></th>
		                            <td style="padding-left: 20px;"><input id="actual_tot_deposit_credit" name="actual_tot_deposit_credit" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
		                        </tr>
		                        <tr>
		                            <th style="color: #5D5D5D"><b><bean:message key="CHECKS_AND_DEBIT"></bean:message> :</b></th>
		                            <td style="padding-left: 20px;"><input id="actual_tot_chk_debit" name="actual_tot_chk_debit" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
		                        </tr>
		                        <tr>
		                            <th style="color: #5D5D5D; text-decoration: underline;"><b><bean:message key="ENDING_BALANCE"></bean:message> :</b></th>
		                            <td style="padding-left: 20px;"><input id="ending_book_bal" name="ending_book_bal" value="" style="width:180px;text-align:right; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
		                        </tr>
		                        </tbody>
	                    </table>
	
	                    <table>
		                    <colgroup>
					        	<col width="180">
					        	<col width="*">
							</colgroup>
							<tbody>
		                        <tr>
		                            <th><bean:message key="BANK_BOOK_DIFFERENCE"></bean:message> :</th>
		                            <td style="padding-left: 20px;"><input id="diff_amt" name="diff_amt" value="" style="width:180px;text-align:right;text-decoration:underline;color:#000000; color: #737373; border: 0 solid; border-bottom: 1px solid #c0bfbd; font-weight: bold" class="search_form-none" readonly="" type="text" /></td>
		                        </tr>
		                        </tbody>
	                    </table>
	
	                </td>
	                <td>
                	<table >
						<tr>
							<td>
								<table id="mainTable">
									<tr>
										<td>
											<script type="text/javascript">comSheetObject('sheet1');</script>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
	        </div>
	        </div>
        <!-- opus_design_grid(e) -->
    
    
    <div class="layout_vertical_2 pad_left_8">
    <h3 class="title_design"><bean:message key="OUTSTANDING_DETAILS"></bean:message></h3>
	   <div class="opus_design_grid">
	   <h3><bean:message key="DEPOSIT_AND_CREDIT"></bean:message></h3>
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('EXCEL01')" name="btn_DownExcel"><bean:message key="Excel"/></button>
	   </div>
	   <div class="">
            <script type="text/javascript">comSheetObject('sheet2');</script>
            <!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry">
				<table>
					<tbody>
						<colgroup>
							<col width="300" />
							<col width="50" />
							<col width="50" />
							<col width="150" />
							<col width="80" />
							<col width="*" />
						</colgroup>
						<tr>
							<td></td>
      						<td><bean:message key="Total"></bean:message></td>
      						<td><input id="sheet2_total_cnt" name="sheet2_total_cnt" value="" style="width:50px;text-align:right" class="search_form-disable" readonly type="text" /></td>
      						<td><bean:message key="Transactions"></bean:message></td>
      						<td><bean:message key="Total_Amount"></bean:message></td>
      						<td><input id="sheet2_total_amt" name="sheet2_total_amt" value="" style="width:100px;text-align:right" class="search_form-disable" readonly type="text" /></td>
                 		</tr>
					</tbody>
				</table>
			</div>
        
	  		 <div class="opus_design_grid">
		  		<h3><bean:message key="CHECKS_AND_DEBIT"></bean:message></h3>
	         	<div class="opus_design_btn">
			   		<button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('EXCEL02')" name="btn_DownExcel"><bean:message key="Excel"/></button>
		   		</div>
            	<script type="text/javascript">comSheetObject('sheet3');</script>
            	<!-- opus_design_inquiry(S) -->
				<div class="opus_design_inquiry">
					<table>
						<tbody>
							<colgroup>
							<col width="300" />
							<col width="50" />
							<col width="50" />
							<col width="150" />
							<col width="80" />
							<col width="*" />
						</colgroup>
							<tr>
								<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
	        					<td><bean:message key="Total"></bean:message></td>
	        					<td><input id="sheet3_total_cnt" name="sheet3_total_cnt" value="" style="width:50px;text-align:right" class="search_form-disable" readonly type="text" /></td>
	        					<td><bean:message key="Transactions"></bean:message></td>
	        					<td><bean:message key="Total_Amount"></bean:message></td>
	        					<td><input id="sheet3_total_amt" name="sheet3_total_amt" value="" style="width:100px;text-align:right" class="search_form-disable" readonly type="text" /></td>
	                		</tr>
						</tbody>
					</table>
				</div>
        	</div>
			
        <!-- opus_design_grid(e) -->
    </div>
    </div>
</div>    
<!-- layout_wrap (e) -->
</div>
</div>

</form>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	



<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>




