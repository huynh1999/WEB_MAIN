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
	<script type="text/javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0150.js?ver=<%=CLT_JS_VER%>"></script>
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
	<script>
	
	
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
    
	<!-- CURR_CD -->
	var CURR_CD = '';
	var CURR_NM = '';
    <logic:notEmpty name="valMap" property="CURR_CD">
		<% boolean isBegin4 = false; %>
        <bean:define id="curr_cd" name="valMap" property="CURR_CD"/>
        <logic:iterate id="codeVO" name="curr_cd">
	        <% if(isBegin4){ %>
	       		CURR_NM+= '|';
	            CURR_NM+= '|';
	        <% }else{
	              isBegin4 = true;
	           } %>
	           CURR_NM+= '<bean:write name="codeVO" property="cd_nm"/>';
	           CURR_CD+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>
    </logic:notEmpty>        	
	
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edoa_flg = "<%= userInfo.getEdoa_flg() %>";
	
		function setupPage(){
			loadPage();
		}
		  
		
	</script>
	<form name="frm1" method="POST" action="./ACC_INV_0150.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="f_tax_inv_seq" id="f_tax_inv_seq"/>
	
	<input type="hidden" name="file_name" id="file_name" value=""/>
	<input type="hidden" name="rd_param" id="rd_param"  value=""/>
	<input type="hidden" name="title" id="title"  value=""/>
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd" id="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id"  id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  id="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  id="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_INV_0150.clt"/>
	
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
		<div class="opus_design_inquiry ">
			<table>	
					<colgroup>
			        	<col width="100">
			        	<col width="100">
			        	<col width="100">
			        	<col width="100">
			        	<col width="100">
			        	<col width="100">
			        	<col width="100">
			        	<col width="100">
			        	<col width="100">			        	
			        	<col width="100">
			        	<col width="*">
				   </colgroup>
			        <tbody>
						<tr>
							<th><bean:message key="Filing_No"/></th>
							<td> 
	                            <input type="text" name="s_ref_no" id="s_ref_no" style="ime-mode:disabled; text-transform:uppercase;width:120px" class="search_form"> 
							</td>
							
							<th><bean:message key="Bill_To"/></th>
	                        <td><!--  
					            --><input  type="text" name="s_cust_cd" id="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="fn_codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="strToUpper(this);fn_codeNameAction('CUSTOMER',this, 'onBlur')" class="search_form"><!--
					            --><button type="button" class="input_seach_btn" tabindex="-1" id="customer1" onClick="doWork('CUSTOMER_POPLIST')"></button><!-- <!--
					            --><input  type="text" name="s_cust_nm" id="s_cust_nm" maxlength="100" value="" onKeyPress="if(event.keyCode==13){custEnterAction(this,'CUSTOMER_NAME');}" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:168px" class="search_form"> 
	                        </td>
							<th><bean:message key="Tax_invoice_no"/></th>
	                        <td><input type="text" name="s_tax_inv_no" id="s_tax_inv_no" style="ime-mode:disabled; text-transform:uppercase;width:120px" class="search_form">
	                        </td>
	                        
							<th><bean:message key="Currency"/></th>
	                        <td>
                                <bean:define id="curr_cd" name="valMap" property="CURR_CD"/>
                                <html:select name="valMap"  property="s_curr"  styleClass="search_form" style="background-color:#d4f6ff;;width:120px;">
                                	<option value="">ALL</option>
                                    <html:options collection="curr_cd" property="cd_val" labelProperty="cd_nm"/>
                                </html:select>	
	                        </td>
	                        <th><bean:message key="Department"/></th>
							<td>
                                <bean:define id="dept_cd" name="valMap" property="DEPT_CD"/>
                                <html:select name="valMap"  property="s_dept"  styleClass="search_form" style="background-color:#d4f6ff;;width:120px;">
                                	<option value="">ALL</option>
                                    <html:options collection="dept_cd" property="cd_val" labelProperty="cd_nm"/>
                                </html:select>		
	                        </td>   
	                        <td></td> 		                        
						</tr>
						<tr>
							<th><bean:message key="BL_No"/></th>
							<td> 
	                            <input type="text" name="s_bl_no" id="s_bl_no" style="ime-mode:disabled; text-transform:uppercase;width:120px" > 
							</td>						
							<th><bean:message key="Invoice_Title"/></th>
							<td> 
	                            <input type="text" name="s_inv_tit" id="s_inv_tit" style="ime-mode:disabled; text-transform:uppercase;width:271px" > 
							</td>						
							<th><bean:message key="Issuer"/></th>
							<td> 
	                            <input type="text" name="s_issuer" id="s_issuer" style="ime-mode:disabled; text-transform:uppercase;width:120px" > 
							</td>						
							<th><bean:message key="Invoice_Status"/></th>
							<td> 
                                <bean:define id="tax_inv_sts_cd" name="valMap" property="TAX_INV_STS_CD"/>
                                <html:select name="valMap"  property="s_inv_sts"  styleClass="search_form" style="background-color:#d4f6ff;;width:120px;">
                                    <html:options collection="tax_inv_sts_cd" property="cd_val" labelProperty="cd_nm"/>
                                </html:select>	 
							</td>						
							<th><bean:message key="Deposit_Status"/></th>
							<td> 
	                            <input type="text" name="s_deposit_sts" id="s_deposit_sts" style="ime-mode:disabled; text-transform:uppercase;width:120px" > 
							</td>
							<td></td>						
						</tr>
						<tr>
							<th><bean:message key="Issue_Date"/></th>
							<td colspan="3"><!-- 
	                            --><input type="text" name="s_iss_strdt" id="s_iss_strdt" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_iss_enddt);firCalFlag=false;" onFocus="select();" size='11' class="search_form"><span class="dash">~</span><!-- 
	                            --><input type="text" name="s_iss_enddt" id="s_iss_enddt" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_iss_strdt, this);firCalFlag=false;" onFocus="select();" size='11' class="search_form"><!-- 
								--><button type="button" class="calendar" tabindex="-1" name="s_iss_dt_cal" id="s_iss_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
							</td>
							<td colspan="6"></td>
						</tr>
					</tbody>
			</table>
			
			
			
		</div>	
	</div>
	<!-- inquiry_area(E) -->
	
	<!-- grid_area(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		
		<!-- paging 처리 
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
		-->	
	</div>
	<!-- grid_area(E) -->	  
</div>
	</form>
	

<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>
