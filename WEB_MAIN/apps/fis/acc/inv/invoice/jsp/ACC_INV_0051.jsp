<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_INV_0051.jsp
*@FileTitle  : Invoice Batch Print
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/acc/inv/invoice/script/ACC_INV_0051.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage(){
			loadPage();
		}
	</script>
	
<%
	String ofc_cd		= userInfo.getOfc_cd();
	String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String ofcEngNm 	= userInfo.getOfc_eng_nm();
	String usrId		= userInfo.getUsrid();
	String usrPhn		= userInfo.getPhn();
	String usrFax		= userInfo.getFax();
	String email 		= userInfo.getEml();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
	String oa_flg 		= userInfo.getOa_flg();
%>

<style> body { border-top-width: 6px!important; } </style>
<form name="form" method="POST" action="./">
	<!-- Report Value -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="f_ofc_cd" id="f_ofc_cd"  value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_usrId" id="f_usrId" value="<%= usrId %>" />
	<input type="hidden" name="f_usrPhn" id="f_usrPhn" value="<%= usrPhn %>" />
	<input type="hidden" name="f_usrFax" id="f_usrFax" value="<%= usrFax %>"  />
	<input type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>" />
	<input type="hidden" name="f_email" id="f_email" value="<%= email %>" />
	<input type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>" />
	<input type="hidden" name="f_to_type" id="f_to_type" />
	<input type="hidden" name="cmd_type" id="cmd_type" />
	<input type="hidden" name="title" id="title" />

	<input type="hidden" name="f_search_type" id="f_search_type" />
	<input type="hidden" name="f_order_type" id="f_order_type" />

	<input type="hidden" name="f_ofc_locl_nm" id="f_ofc_locl_nm"  value="<%= ofcLoclNm %>" />
	
	<input type="hidden" name="oa_flg" id="oa_flg" value="<%= oa_flg %>"/>
	<input type="hidden" name="role_ofc_cd" id="role_ofc_cd" value=""/>
	
	<!-- 소타이틀, 대버튼 -->
	<div class="layer_popup_title">
    	<div class="page_title_area clear">
	
			<!-- page_title(S) -->
			<h2 class="page_title"><span><bean:message key="Invoice_Batch_Print"/></span></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn (S) -->
			<div class="opus_design_btn">
				<button class="btn_accent" id="btnPrint" type="button" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!--
				--><button class="btn_normal"  type="button" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
				</div>
			<!-- opus_design_btn (E) -->
		
			<!-- page_location(S) -->
			<div class="location">	
				
			</div>
			<!-- page_location(E) -->
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- page_title_area(E) -->
	    <div class="wrap_result">
		    <div class="layout_wrap">
				<!-- opus_design_inquiry(S) -->
				<div class="opus_design_inquiry wFit">
					<table>
						<colgroup>
							<col width="25" />	
							<col width="108" />				
							<col width="*" />				
					   </colgroup> 
					   <tbody>
					   		<tr>
					   			<td><input type="radio" name="prn_radio" id="prn_radio1" value="NO" checked onclick="rario_onchange()">&nbsp;&nbsp;</td>
					   			<th><label for="prn_radio1"><bean:message key="Invoice_No"/></label></th>
					   			<td>
					            	<input name="f_inv_no" type="text" maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:105px"><!-- 
					            	 -->~&nbsp;<!-- 
					             --><input name="t_inv_no" type="text" maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:105px">
					            </td>      
					   		</tr>
					   		<tr>
					   			<td colspan="2"></td>
					   			<td>
		                    		<input type="checkbox" name="f_ap_yn" id="f_ap_yn" value="Y"><label for="f_ap_yn"><bean:message key="AP"/></label>
		                    	</td> 
					   		</tr>
					   	</tbody>
					</table>
				</div>
				<div class="opus_design_inquiry wFit">
					<table>
						<colgroup>
							<col width="25" />	
							<col width="108" />				
							<col width="*" />				
					   </colgroup> 
					   <tbody>
					   		<tr>
					   			<td><input type="radio" name="prn_radio" id="prn_radio2" value="DT" onclick="rario_onchange()">&nbsp;&nbsp;</td>
					            <th>
					            	<select name="date_clss_cd" id="date_clss_cd" style="font-weight: bold;">
		                                <option value="P"><bean:message key="Post_Date"/></option>
		                                <option value="I"><bean:message key="Invoice_Date"/></option>
	                               </select>
					            </th>
					            <td>
					            	<input name="f_strdt" id="f_strdt" type="text" value='' class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" style="width:70px">~&nbsp;<!-- 
					             --><input name="f_enddt" id="f_enddt" type="text" value='' class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" style="width:70px"><!-- 
					             --><button type="button" class="calendar ir" name="f_dt_cal" id="f_dt_cal" onclick="doDisplay('DATE1', form);"></button>
					            </td> 
					        </tr>
					        <tr>
					        	<td colspan="2"></td>
					        	<td>
					        		<table>
					        			<tr>
					        				<td nowrap class="table_search_body">
			                      				<input type="checkbox" name="sell_yn" id="sell_yn" value="Y" checked><label for="sell_yn"><bean:message key="AR"/></label>
			                      			</td>
			                      			<td nowrap class="table_search_body">
												<input type="checkbox" name="buy_yn" id="buy_yn" value="Y" checked><label for="buy_yn"><bean:message key="AP"/></label>
			                      			</td>
			                      			<td nowrap class="table_search_body">
			                      				<input type="checkbox" name="dc_yn" id="dc_yn" value="Y" checked><label for="dc_yn"><bean:message key="Debit_Credit"/></label>
			                      			</td>
			                      			<td nowrap class="table_search_body">
			                      				<input type="checkbox" name="ap_not_ar_yn" id="ap_not_ar_yn" value="Y" onclick="chk_onchange()"><label for="ap_not_ar_yn"><bean:message key="Files_With_AP_But_No_AR"/></label>
			                      			</td>
					        			</tr>
					        		</table>
					        	</td>
					        </tr>
					   </tbody>
					</table>
				</div>
				<div class="opus_design_inquiry">
					<table>
						<colgroup>
							<col width="133" />				
							<col width="*" />					
					   </colgroup> 
					   <tbody>
					        <tr>
		          				<th><label for="list_by"><bean:message key="List_By"/></label></th>
		          				<td>
		          					<table>
					        			<tr>
					        				<td>
					          					<input type="radio" name="sort_radio" id="sort_radio1" value="D"><label for="sort_radio1"><bean:message key="Date"/></label>
					             			</td>
					             			<td>
												<input type="radio" name="sort_radio" id="sort_radio2" value="N" checked><label for="sort_radio2"><bean:message key="Number"/></label>
					          				</td>
					          			</tr>
					          		</table>
					          	</td>
		                   </tr>
					   </tbody>
					</table>
				</div>
			</div>
			<!-- opus_design_inquiry(E) -->
		</div>
	    
	    <div class="wrap_result">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid" id="mainTable">
				<script type="text/javascript">comSheetObject('sheet1');</script>		
			</div>
			<!-- opus_design_grid(E) -->
		</div>
	</div>
</form>




