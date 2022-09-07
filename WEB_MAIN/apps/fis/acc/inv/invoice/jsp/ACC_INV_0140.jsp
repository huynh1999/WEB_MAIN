<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0010.jsp
*@FileTitle  : Deposit Journal
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0140.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>  <!-- #2111 [PATENT] DEPOSIT/PAYMENT ENTRY FOR CN 화면 CUSTOMER 항목 명칭 변경 및 추천 항목 표시 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm 	 = userInfo.getUser_name();
		String email 	 = userInfo.getEml();
		String cnt_cd 	 = userInfo.getOfc_cnt_cd();
		/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
		String fb_flg 		= userInfo.getFb_flg();
		/* LHK, 20130116, #25248, Void 권한 제어 */
		String vc_flg		= userInfo.getVc_flg();
		String oa_flg 		= userInfo.getOa_flg();
		/* #1248 - Issued Office 수정 권한 (CHANGE OFFICE CODE OF DEPOSIT/PAYMENT) */
		String codp_flg 	= userInfo.getCodp_flg();
	%>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		function setupPage(){
			loadPage();
			 }
	</script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<script>
	
		var user_role_cd = "<%=userInfo.getRole_cd()%>";
		
		<!-- DEPT_CD -->
		var DEPT_CD = '';
		var DEPT_NM = '';
        <logic:notEmpty name="valMap" property="DEPT_CD">
			<% boolean isBegin = false; %>
            <bean:define id="dept_cd" name="valMap" property="DEPT_CD"/>
            <logic:iterate id="codeVO" name="dept_cd">
		        <% if(isBegin){ %>
		            DEPT_NM+= '|';
		        	DEPT_CD+= '|';
		        <% }else{ 
		              isBegin = true;
		           } %>
		        DEPT_NM+= '<bean:write name="codeVO" property="cd_nm"/>';
		        DEPT_CD+= '<bean:write name="codeVO" property="cd_val"/>';
		    </logic:iterate>
        </logic:notEmpty>
        
		<!-- PAID_CURR_CD -->
		var PAID_CURR_CD = '';
		var PAID_CURR_NM = '';
        <logic:notEmpty name="valMap" property="PAID_CURR_CD">
			<% boolean isBegin1 = false; %>
            <bean:define id="paid_curr_cd" name="valMap" property="PAID_CURR_CD"/>
            <logic:iterate id="codeVO" name="paid_curr_cd">
		        <% if(isBegin1){ %>
		        	PAID_CURR_NM+= '|';
		        	PAID_CURR_CD+= '|';
		        <% }else{
		              isBegin1 = true;
		           } %>
		        PAID_CURR_NM+= '<bean:write name="codeVO" property="cd_nm"/>';
		        PAID_CURR_CD+= '<bean:write name="codeVO" property="cd_val"/>';
		    </logic:iterate>
        </logic:notEmpty>
        
		<!-- TAX_INV_TYPE_CD -->
		var TAX_INV_TYPE_CD = '';
		var TAX_INV_TYPE_NM = '';
        <logic:notEmpty name="valMap" property="TAX_INV_TYPE_CD">
			<% boolean isBegin2 = false; %>
            <bean:define id="tax_inv_type_cd" name="valMap" property="TAX_INV_TYPE_CD"/>
            <logic:iterate id="codeVO" name="tax_inv_type_cd">
		        <% if(isBegin2){ %>
		        	TAX_INV_TYPE_NM+= '|';
		        	TAX_INV_TYPE_CD+= '|';
		        <% }else{
		              isBegin2 = true;
		           } %>
		           TAX_INV_TYPE_NM+= '<bean:write name="codeVO" property="cd_nm"/>';
		           TAX_INV_TYPE_CD+= '<bean:write name="codeVO" property="cd_val"/>';
		    </logic:iterate>
        </logic:notEmpty>
        
		<!-- TAX_INV_STS_CD -->
		var TAX_INV_STS_CD = '';
		var TAX_INV_STS_NM = '';
        <logic:notEmpty name="valMap" property="TAX_INV_STS_CD">
			<% boolean isBegin3 = false; %>
            <bean:define id="tax_inv_sts_cd" name="valMap" property="TAX_INV_STS_CD"/>
            <logic:iterate id="codeVO" name="tax_inv_sts_cd">
		        <% if(isBegin3){ %>
		        	TAX_INV_STS_NM+= '|';
		            TAX_INV_STS_CD+= '|';
		        <% }else{
		              isBegin3 = true;
		           } %>
		           TAX_INV_STS_NM+= '<bean:write name="codeVO" property="cd_nm"/>';
		           TAX_INV_STS_CD+= '<bean:write name="codeVO" property="cd_val"/>';
		    </logic:iterate>
        </logic:notEmpty>        

        
		
	</script>
	<form name="frm1" method="POST" action="./ACC_INV_0140.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_INV_0140.clt"/>
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />

	<input id="f_tax_inv_seq" name="f_tax_inv_seq" type="hidden"  value="<bean:write name='valMap' property='f_tax_inv_seq'/>" />
	<input id="f_re_iss" name="f_re_iss" type="hidden"  value="<bean:write name='valMap' property='f_re_iss'/>" />

	<input id="intg_bl_seq" name="intg_bl_seq" value="" type="hidden" />
	<input id="f_bl_no" name="f_bl_no" value="" type="hidden" />
	<input id="f_air_sea_clss_cd" name="f_air_sea_clss_cd" value="" type="hidden" />
	<input id="f_biz_clss_cd" name="f_biz_clss_cd" value="" type="hidden" />
	<input id="f_bnd_clss_cd" name="f_bnd_clss_cd" value="" type="hidden" />
	<input id="user_id" name="user_id" value="" type="hidden" />

	
	<input type="hidden" name="file_name" 			value=""/>
	<input type="hidden" name="rd_param"  			value=""/>
	<input type="hidden" name="title"    			value=""/>
	
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
				<%-- 
				<button type="button" class="btn_normal" style="display : " id="btnNew" onclick="doWork('NEW')">New</button>
				<button type="button" class="btn_normal" style="display : " id="btnSave" onclick="doWork('Save')">Save</button>
				<button type="button" class="btn_normal" style="display : " id="btnPrint" onclick="doWork('PRINT')">Print</button>
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
<div class="over_wrap" height="100%">	
	<!-- inquiry_area(S) -->	
	<div class="wrap_result" style="padding-bottom: 0px;">
		<div class="layout_wrap" style="width:100%">	 			
	   		 <div class="layout_vertical_2" style="width:420px">
				<div class="opus_design_inquiry sm" style="height:135px;"> <!-- #3291 [PBS] Tax Invoice 수정사항 처리 -->
					<table>
					    <colgroup>
						        	<col width="290">
						        	<col width="*">
						</colgroup>
						<tbody>
						<tr>
							<td><h3 class="title_design mar_top_4" id='searchInfo'><bean:message key="Invoice_Search"/></h3></td>
							<td align="right">
								<span id='rtrvBtn01'>
									<button type="button" id="billSearch" class="btn_etc" style="cursor:hand;"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
								</span>
							</td>
						</tr>
						</tbody>
					</table>
					<table>	
							<colgroup>
						        	<col width="80">
						        	<col width="80">
						        	<col width="80">
						        	<col width="*">
						   </colgroup>
					        <tbody>
								<tr>
									<th><bean:message key="Bill_To"/></th>
			                        <td colspan="3"><!--  
							            --><input Required type="text" name="s_cust_cd" id="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="fn_codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="strToUpper(this);fn_codeNameAction('CUSTOMER',this, 'onBlur')" class="search_form"><!--
							            --><button type="button" class="input_seach_btn" tabindex="-1" id="btnCustomer" onClick="doWork('CUSTOMER_POPLIST')"></button><!-- <!--
							            --><input Required type="text" name="s_cust_nm" id="s_cust_nm" maxlength="100" value="" onKeyPress="if(event.keyCode==13){custEnterAction(this,'CUSTOMER_NAME');}" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:168px" class="search_form"> 
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Department"/></th>
			                        <td>
	                                       <bean:define id="dept_cd" name="valMap" property="DEPT_CD"/>
	                                       <html:select name="valMap"  property="s_dept"  styleClass="search_form" style="background-color:#d4f6ff;;width:120px;">
	                                           <html:options collection="dept_cd" property="cd_val" labelProperty="cd_nm"/>
	                                       </html:select>							                
			                        </td>
									<th style="width:90px"><bean:message key="Paid_currency"/></th>
			                        <td>  
	                                       <bean:define id="paid_curr_cd" name="valMap" property="PAID_CURR_CD"/>
	                                       <html:select name="valMap"  property="s_paid_currency"  styleClass="search_form" style="background-color:#d4f6ff;">
	                                           <html:options collection="paid_curr_cd" property="cd_val" labelProperty="cd_nm"/>
	                                       </html:select>	
			                        </td>
								</tr>
								<tr>
									<th>
										<select name="s_type" style="font-weight: bold;" class="search_form">
											<option value="REF_NO" selected><bean:message key="Ref_No"/></option>
											<option value="MBL_NO"><bean:message key="MBL_No"/></option>
											<option value="HBL_NO"><bean:message key="HBL_No"/></option>
										</select>								
									</th>
			                        <td colspan="3"><!--
							            --><input type="text" name="s_type_no" id="s_type_no" maxlength="50" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:241px" class="search_form"  class="search_form"><!--
							            --><button type="button" class="input_seach_btn" tabindex="-1" id="btnType" onClick="searchTypeNo()"></button>
			                        </td>

								</tr>
						</tbody>
					</table>
					
				</div>
			</div>
			
			<div class="layout_vertical_2" style="padding-left:8px;width:calc(100% - 420px)">
				<div class="opus_design_inquiry sm" style="height:135px;"> <!-- #3291 [PBS] Tax Invoice 수정사항 처리 -->
					<table>
						<tr>
							<td><h3 class="title_design mar_top_4"><bean:message key="Tax_Invoice_Information"/></h3></td>
						</tr>
					</table>
					
					<table>	
						<colgroup>
					        	<col width="120">
					        	<col width="200">
					        	<col width="120">
					        	<col width="200">
					        	<col width="*">
					   </colgroup>
					        <tbody>
								<tr>
									<th><bean:message key="Tax_invoice_no"/></th>
			                        <td>
			                            <input Required type="text" name="f_tax_inv_no" id="f_tax_inv_no" maxlength="100" value="" onKeyPress="if(event.keyCode==13){custEnterAction(this,'CUSTOMER2');}" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:200px" class="search_form">  
			                        </td>
			                        <th><bean:message key="Issue_Date"/></th>
			                        <td><!--
			                            --><input Required type="text" name="f_iss_dt" id="f_iss_dt" value="" class="search_form" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Post Date');checkPostDate();setPostDt();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!--
										--><button type="button" class="calendar" tabindex="-1" name="btnCal" id="btnCal" onclick="doDisplay('DATE3' ,frm1);" ></button>
			                        </td>
			                        <td></td>
								</tr>
								<tr>
									<th><bean:message key="Invoice_Title"/></th>
			                        <td>
										<input Required type="text" name="f_inv_title" id=f_inv_title maxlength="100" value="" >   
			                        </td>
			                        <td></td>
			                        <td></td>
			                        <td></td>
			                        <td></td>
								</tr>
								 <tr>
									<th><bean:message key="Tax_invoice_Type"/></th>
			                        <td>
			                            <select name="f_tax_inv_tp">
							            		<option value="N">Normal(普票)</option>
							            		<option value="S">Special(专票)</option>
							             </select>
			                        </td>								 
									<th><bean:message key="Tax_Ratio"/></th>
			                        <td><!--
			                            --><input type="text" name="f_tax_ratio" id="f_tax_ratio" value="0" class="search_form" maxlength="10"  onkeypress="onlyNumberCheck();" onBlur="fnSetTax();fnSumAmt();" dataformat="float" style="ime-mode:disabled;width:107px;text-align:right">
			                        </td>  
			                        <td></td>
								</tr>

						</tbody>
					</table>					
					
					

				</div>	
			</div>
		</div>
	</div>
	<!-- inquiry_area(E) -->
	<!-- grid_area(S) -->
	<div class="wrap_result" style="padding:1px 12px 12px 12px"> <!-- #3291 [PBS] Tax Invoice 수정사항 처리 -->
		<div class="opus_design_grid" id="mainTable">
			<div class="opus_design_btn"><!-- 
				-->
			</div>
			<script type="text/javascript">comSheetObject('sheet1');</script>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
		
		<!-- inquiry_area(S) -->
		
		<div class="opus_design_inquiry" style="width:100%">
			<div class="layout_vertical_2" style="width:600px">
					<table>	
						<colgroup>
					        <col width="80"></col>
					   </colgroup>
						 <tr>
	                          <th><bean:message key="Remark"/></th>
	                          <td>
				           		<textarea name="f_remark" id="f_remark" onblur="setLimitText(frm1.f_remark,200);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:527px;height:50px;"></textarea>
	                          </td>
						</tr>
					</table>		
			</div>
			<div class="layout_vertical_2" style="padding-left:8px;width: 420px">
				<table>	
						<colgroup>
							<col width="500px"></col>
			    			<col width="110px"></col>
			    			<col width="*"></col>
					   </colgroup>
					        <tbody>
								 <tr>
									<th><bean:message key="Freight_Amount"/></th>
			                        <td>
										<input type="text" name="f_fr_amt" id="f_fr_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
									</td>
								</tr>
								<tr>	
									<th><bean:message key="Tax_Amount"/></th>
			                        <td>
										<input type="text" name="f_tax_amt" id="f_tax_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
									</td>
								</tr>
								<tr>	
									<th><bean:message key="Total_Amount"/></th>
			                        <td>
										<input type="text" name="f_tot_amt" id="f_tot_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
									</td>
									<td></td>
								</tr>
						</tbody>
					</table>
				</div>

			</div>
			<!-- inquiry_area(E) -->
	</div>
	<!-- grid_area(E) -->
</div>	
	</form>
<script>
function setLimitText(obj, maxLength){
    if(obj.value.length > maxLength){
    	alert(getLabel2('FMS_COM_ALT030', new Array("200")));
        obj.value = obj.value.substring(0,maxLength);
        obj.focus();
        return;
     }
 }
 </script>	
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	