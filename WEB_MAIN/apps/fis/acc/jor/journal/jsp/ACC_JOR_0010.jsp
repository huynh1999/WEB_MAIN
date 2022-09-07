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
	<script type="text/javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>  <!-- #2111 [PATENT] DEPOSIT/PAYMENT ENTRY FOR CN 화면 CUSTOMER 항목 명칭 변경 및 추천 항목 표시 -->
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
			setSelection();
			loadPage();
			 }
	</script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO"  name="valMap" property="ofcInfo"/>
	<bean:define id="jnr_no"  name="valMap" property="jnr_no"/>
	<bean:define id="cust_cd" name="valMap" property="cust_cd"/>
	<bean:define id="inv_no"  name="valMap" property="inv_no"/>
	<bean:define id="inv_tp"  name="valMap" property="inv_tp"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="bankCurr"  name="valMap" property="bankCurr"/>
	<!--  #1155 [CARGOZONE] Deposit and Payment Copy from List screens -->
	<bean:define id="list_copy_flag"  name="valMap" property="list_copy_flag"/>
	<script>
	
		//#3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
		var ofc_locl_curr_cd = "<bean:write name="ofcVO" property="locl_curr_cd"/>";
	
		var xch_rt_dp_cnt 	= Number('<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>');
	
		function setSelection(){
			//frm1.f_curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			//LHK, 20131218 QnA #22627 [BINEX]Deposit/Payment 시 이종 Currency 처리 문제
			//1)Bank 의 Currency 를 보여준다.
			frm1.f_curr_cd.value = '<bean:write name="bankCurr"/>';
			//Japan에서는 선택없음			
			//if(frm1.f_cnt.value != "JP"){
				frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			//}
			//frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			frm1.t_jnr_no.value  = '<bean:write name="jnr_no"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
			frm1.t_inv_tp.value  = '<bean:write name="inv_tp"/>';  
			
			frm1.gl_ex_profit.value  = '<bean:write name="ofcVO" property="gl_ex_profit"/>';  
			frm1.gl_ex_loss.value  = '<bean:write name="ofcVO" property="gl_ex_loss"/>';  
			frm1.gl_misc_profit.value  = '<bean:write name="ofcVO" property="gl_misc_profit"/>';  
			frm1.gl_misc_loss.value  = '<bean:write name="ofcVO" property="gl_misc_loss"/>';  
		}
		function setSelection2(){
			//Japan에서는 선택없음
			//if(frm1.f_cnt.value != "JP"){
				frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			//}
			frm1.f_curr_cd.value = '<bean:write name="bankCurr"/>';
			//frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';
			frm1.t_jnr_no.value  = '<bean:write name="jnr_no"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
			frm1.t_inv_tp.value  = '<bean:write name="inv_tp"/>';  
		}
		<!-- OFC_CD -->
		var OFCCD = '';
        <logic:notEmpty name="valMap" property="ofcList">
			<% boolean isBegin = false; %>
            <bean:define id="ofcList" name="valMap" property="ofcList"/>
            <logic:iterate id="ofcVO" name="ofcList">
                <% if(isBegin){ %>
                       OFCCD += '|';
                <% }else{
                       isBegin = true;
                   } %>
                OFCCD+= '<bean:write name="ofcVO" property="ofc_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        var CURRCD = '';
        <logic:notEmpty name="valMap" property="currList">
			<% boolean isBegin2 = false; %>
	        <bean:define id="currList" name="valMap" property="currList"/>
	        <logic:iterate id="currVO" name="currList">
	            <% if(isBegin2){ %>
	                   CURRCD += '|';
	            <% }else{
	                   isBegin2 = true;
	               } %>
	            CURRCD+= '<bean:write name="currVO"/>';
	        </logic:iterate>
    	</logic:notEmpty>
    	
    	var GLCD = '';
        <logic:notEmpty name="valMap" property="glList">
			<% boolean isBegin3 = false; %>
	        <bean:define id="glList" name="valMap" property="glList"/>
	        <logic:iterate id="glVO" name="glList">
	            <% if(isBegin3){ %>
	            	   GLCD += '|';
	            <% }else{
	                   isBegin3 = true;
	               } %>
	            GLCD+= '<bean:write name="glVO" property="gl_cd"/>';
	        </logic:iterate>
    	</logic:notEmpty>

    	var BK_CURR_CD = '';
        <logic:notEmpty name="valMap" property="bankList">
			<% boolean isBegin4 = false; %>
	        <bean:define id="bankList" name="valMap" property="bankList"/>
	        <logic:iterate id="bankCurrVO" name="bankList">
	            <% if(isBegin4){ %>
	            	BK_CURR_CD += '|';
	            <% }else{
	            	isBegin4 = true;
	               } %>
	               BK_CURR_CD+= '<bean:write name="bankCurrVO" property="bank_seq"/>' + '-' + '<bean:write name="bankCurrVO" property="curr_cd"/>';
	        </logic:iterate>
    	</logic:notEmpty>

		//#5030 [SENWA] DEPOSIT ENTRY 화면에서 Check No 메세지 수정 요청
		var ARR_BNK_INFO = [];
		var bnkObj;
		<logic:notEmpty name="valMap" property="bankList">
			<bean:define id="bankList" name="valMap" property="bankList"/>
			<logic:iterate id="bankCurrVO" name="bankList">
				bnkObj = {
					bank_seq : '<bean:write name="bankCurrVO" property="bank_seq"/>'
				  , chk_no_use_flg : '<bean:write name="bankCurrVO" property="chk_no_use_flg"/>'
				}
				ARR_BNK_INFO.push(bnkObj);
			</logic:iterate>
		</logic:notEmpty>
		bnkObj = '';

		function fnbtnCtl(){ 

			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
 				//Enable Editing Other Office (ACCT) 
				var edoa_flg 		= "<%=userInfo.getEdoa_flg()%>"; //Enable Editing Other Office (ACCT) 
				var ofc_cd = "<%=userInfo.getOfc_cd()%>";
				var ref_ofc_cd =  	formObj.f_ofc_cd.value;
				//alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);

				var btnflag = "Y";
				if (edoa_flg == "N"){
					if (ofc_cd != ref_ofc_cd){  
						btnflag = "N";
					}
				}  
				//alert(btnflag);
				if (ref_ofc_cd == "") { btnflag = "Y"; }
				if (btnflag == "Y"){
					//기존유지
					//$("#btnModify").show(); 
				}else{
					$("#btnModify").hide();
					$("#btnSaveX").hide();
					$("#btnModifyBlock").hide(); 
					$("#btnPrint").hide(); 
				}  
		} 
		
    	//<!-- #2111 [PATENT] DEPOSIT/PAYMENT ENTRY FOR CN 화면 CUSTOMER 항목 명칭 변경 및 추천 항목 표시 -->
		var AUTOCOMPLETE_YN = 'N';
		<logic:notEmpty name="valMap" property="autocompleteYn">
			AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
		</logic:notEmpty>		
		
	</script>
	<form name="frm1" method="POST" action="./ACC_JOR_0010.clt">
	<!--Command를 담는 공통 -->
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />

	<input id="f_intg_bl_seq" name="f_intg_bl_seq" value="" type="hidden" />
	<input id="f_bl_no" name="f_bl_no" value="" type="hidden" />
	<input id="f_air_sea_clss_cd" name="f_air_sea_clss_cd" value="" type="hidden" />
	<input id="f_biz_clss_cd" name="f_biz_clss_cd" value="" type="hidden" />
	<input id="f_bnd_clss_cd" name="f_bnd_clss_cd" value="" type="hidden" />

	<input id="f_inv_seq" name="f_inv_seq" value="" type="hidden" />
	<input id="f_inv_no" name="f_inv_no" value="" type="hidden" />
	<input id="f_print_type" name="f_print_type" value="" type="hidden" />

	<input id="f_oth_seq" name="f_oth_seq" value="" type="hidden" />
	<input id="f_jnr_no" name="f_jnr_no" value="" type="hidden" />
	<input id="s_jnr_no" name="s_jnr_no" value="" type="hidden" />
	<input id="t_jnr_no" name="t_jnr_no" value="" type="hidden" />

	<input id="old_void_chk" name="old_void_chk" value="" type="hidden" />
	<input id="old_void_dt" name="old_void_dt" value="" type="hidden" />

	<input id="t_cust_cd" name="t_cust_cd" value="" type="hidden" />
	<input id="t_inv_no" name="t_inv_no" value="" type="hidden" />
	<input id="t_inv_tp" name="t_inv_tp" value="" type="hidden" />
	
	<input type="hidden" name ="slip_post" id ="slip_post" 			value="<bean:write name="slip_post"/>"/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name ="old_post_dt" id="old_post_dt" 		value=""/>
	
	<input type="hidden" name="f_cnt" id="f_cnt" value="<%=cnt_cd%>"/>
	<input type="hidden" name="role_cd" id="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	
	<!-- #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 -->
	<input	type="hidden" name="fb_flg" id="fb_flg" value="<%= fb_flg %>"/>
	
	<!-- LHK, 20130116, #25248, Void 권한 제어 -->
	<input	type="hidden" name="vc_flg" id="vc_flg" value="<%= vc_flg %>"/>
	
	<!-- #50559 - [ALL GREEN] Payment/Deposit Search 후 Other Branch Access 관련 -->
	<input type="hidden" name="s_ofc_cd" id="s_ofc_cd"  value="" />
	<input type="hidden" name="oa_flg" id="oa_flg" value="<%= oa_flg %>"/>
	
	<input type="hidden" name="file_name" 			value=""/>
	<input type="hidden" name="rd_param"  			value=""/>
	<input type="hidden" name="title"    			value=""/>
	
	<!-- #51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가 -->
	<!-- input id="f_ofc_cd" name="f_ofc_cd" value="" type="hidden" / -->
	
	<input id="gl_ex_profit" 		name="gl_ex_profit" 		type="hidden" value="" />
	<input id="gl_ex_loss" 			name="gl_ex_loss" 			type="hidden" value="" />
	<input id="gl_misc_profit" 		name="gl_misc_profit" 		type="hidden" value="" />
	<input id="gl_misc_loss" 		name="gl_misc_loss" 		type="hidden" value="" />
	<input id="gl_ex_profit_nm" 	name="gl_ex_profit_nm" 		type="hidden" value="" />
	<input id="gl_ex_loss_nm" 		name="gl_ex_loss_nm" 		type="hidden" value="" />
	<input id="gl_misc_profit_nm" 	name="gl_misc_profit_nm" 	type="hidden" value="" />
	<input id="gl_misc_loss_nm" 	name="gl_misc_loss_nm" 		type="hidden" value="" />
	
	<!-- #965 - [SHINE] Deposit Entry - Save 시 Invoice Block (System Option) -->
	<input id="save_lock_yn" name="save_lock_yn" type="hidden" value="" />
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pst_dt_flg"  id="pst_dt_flg" value="<%= userInfo.getPst_dt_flg() %>"/> <!--    #6734 [Zencon] POST DATE CHANGE BLOCK ROLE OPTION (Zen#3023) -->
	
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_JOR_0010.clt" />
	
	<!-- #1248 - Issued Office 수정 권한 (CHANGE OFFICE CODE OF DEPOST/PAYMENT) -->
	<input type="hidden" name="codp_flg" id="codp_flg" value="<%= codp_flg %>"/>
	
	<!-- #1155 [CARGOZONE] Deposit and Payment Copy from List screens -->
	<input type="hidden" name="list_copy_flag" id="list_copy_flag" value="<bean:write name='list_copy_flag'/>"/>
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
				<%-- 
				<span id="saveBtn2" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_accent"  id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button></span>
				<button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
				<span style="display:none;" btnAuth="SAVE_BLOCK"><button type="button" class="btn_normal"  id="btnModifyBlock" onclick="doWork('MODIFY_BLOCK')"><bean:message key="Save_L"/></button></span>
				<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button id="btnPrint" type="button" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button></span>
				<span style="display:none;" btnAuth="COPY" id="copyBtn02" ><button type="button" class="btn_normal" style="display:none;" id="btnCopy" onclick="Copy()"><bean:message key="Copy"/></button></span> 
 				<span style="display:none;" btnAuth="CLEAR"><button type="button" class="btn_normal" onclick="doWork('CLEAR')"><bean:message key="New"/></button></span>
				<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button></span>
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
	   		 <div class="layout_vertical_2" style="width:370px">
				<div class="opus_design_inquiry entry_pannel" style="height:185px;">
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
									<button type="button" class="btn_etc" style="cursor:hand;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
								</span>
							</td>
						</tr>
						</tbody>
					</table>
					<table>	
							<colgroup>
						        	<col width="80">
						        	<col width="*">
						   </colgroup>
					        <tbody>
								<tr>
									<th><bean:message key="Customer"/></th>
			                        <td><!--  
							            --><input Required type="text" name="s_cust_cd" id="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTOMER',this, 'onBlur')" onchange="rcvfromcheck=false;" class="search_form"><!--
							            --><button type="button" class="input_seach_btn" tabindex="-1" id="customer1" onClick="doWork('CUSTOMER_POPLIST')"></button><!-- <!--
							            --><input Required type="text" name="s_cust_nm" id="s_cust_nm" maxlength="100" value="" onKeyPress="if(event.keyCode==13){custEnterAction(this,'CUSTOMER_NAME');}" onblur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:168px" class="search_form"> <!-- #2111 [PATENT] DEPOSIT/PAYMENT ENTRY FOR CN 화면 CUSTOMER 항목 명칭 변경 및 추천 항목 표시 -->
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Invoice_No"/></th>
			                        <td><!--
							            --><input type="text" name="s_inv_no" id="s_inv_no" maxlength="50" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:241px" class="search_form" onKeyDown="enterInvoiceNo();"><!--
							            --><button type="button" class="input_seach_btn" tabindex="-1" id="imgInvget" onClick="searchInvList('INVGET')"></button>
			                        </td>
								</tr>
						</tbody>
					</table>
					
					<table>	
						<colgroup>
					        	<col width="95">
					        	<col width="136">
					        	<col width="*">
					   </colgroup>
					        <tbody>
								<tr>
									 <td style="text-align: right;"><!--
			                        	--><label for="dept_chk1"><bean:message key="AR"/></label> <input type="checkbox" name="dept_chk1" id="dept_chk1" value="1" checked>&nbsp;&nbsp;<!--
			                        	--><label for="dept_chk2"><bean:message key="B.DC"/></label>
									 </td>
									 <td><!--
			                        	--><input type="checkbox" name="dept_chk2" id="dept_chk2" value="2" checked>&nbsp;&nbsp;<!--
			                        	--><label for="dept_chk3"><bean:message key="AP"/></label>   <input type="checkbox" name="dept_chk3" id="dept_chk3" value="3" checked>
			                        </td>
			                        <td><!--
									 	--><input type="radio" name="his_chk" id="his_chk1" value="A"><label for="his_chk1"><bean:message key="All"/></label> &nbsp;<!--
			                        	--><input type="radio" name="his_chk" id="his_chk2" value="O" checked><label for="his_chk2"><bean:message key="Open"/></label> &nbsp;
			                        </td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			
			<div class="layout_vertical_2" style="padding-left:8px;width:calc(100% - 378px)">
				<div class="opus_design_inquiry sm" style="height:185px;">
					<table>
						<tr>
							<td><h3 class="title_design mar_top_4"><bean:message key="Check_Information"/></h3></td>
						</tr>
					</table>
					<table>	
						<colgroup>
					        	<col width="100">
					        	<col width="230">
					        	<col width="84">
					        	<col width="100">
					        	<col width="126">
					        	<col width="100">
					        	<col width="90">
					        	<col width="100"><!-- #3505-->
					        	<col width="90"><!-- #3505-->
					        	<col width="*">
					   </colgroup>
					        <tbody>
								<tr>
										<th><bean:message key="Received_From"/></th>
				                        <td >
				                        	<input required type="text" name="f_rcv_from_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;margin:auto" onKeyDown="codeNameAction('CUSTOMER2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTOMER2',this, 'onBlur')" >
				                        	<button type="button" style= "margin:auto"class="input_seach_btn" tabindex="-1" id="customer" onClick="doWork('CUSTOMER_POPLIST2')"></button>
				                            <input Required type="text" name="f_rcv_from" id="f_rcv_from" maxlength="100" value="" onKeyPress="if(event.keyCode==13){custEnterAction(this,'CUSTOMER2');}" onblur="strToUpper(this);" onchange="rcvfromcheck=true;" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:130px" class="search_form">  <!-- #2111 [PATENT] DEPOSIT/PAYMENT ENTRY FOR CN 화면 CUSTOMER 항목 명칭 변경 및 추천 항목 표시 -->
				                        </td>
				                        <th><bean:message key="Post_Date"/></th>
				                        <td><!--
				                            --><input Required type="text" name="f_post_dt" id="f_post_dt" value="" class="search_form" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Post Date');checkPostDate();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- #1617 [CLT] Depsosit/Payment Entry - Ex.Rate Date 정의 기준변경 (setPostDt() 제거) -->
											<!-- OFVFOUR-8033 [BINEX] Abnormal deposit date input -->
											<% if (!"".equals(jnr_no)) {%>
											    <button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_post_dt_cal" onclick="doDisplay('DATE3' ,frm1);" style="display:none"></button>
											    <%} else if ("Y".equals(userInfo.getPst_dt_flg())){%>
											        <button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_post_dt_cal" onclick="doDisplay('DATE3' ,frm1);" style="display:none"></button>
											        <%}else {%>
											            <button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_post_dt_cal" onclick="doDisplay('DATE3' ,frm1);" style="display:inline"></button>
											            <%}%>
				                        </td>
										<th><bean:message key="Received_Amount"/></th>
				                        <td>
				                        	<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
								            <input type="text" name="f_rcv_amt" id="f_rcv_amt" value="" style="ime-mode:disabled;width:120px;text-align:right" class="search_form-disable" readOnly onKeyPress="onlyNumberCheck('.-')" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);" maxlength="13" dataformat="excepthan" onblur="fnsetLocalAmt();">
				                        </td>
				                        <th><bean:message key="Issued_Office"/></th>
				                        <td>
				                            <bean:define id="oficeList" name="valMap" property="ofcList"/>
				                            <select required name="f_ofc_cd" id="f_ofc_cd" style="width:80px;" disabled="disabled" onChange="changeIssuedOffice(this);">
					                            <bean:size id="len" name="oficeList" />
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
								</tr>
								<tr>
									<th><bean:message key="Deposit_Bank"/></th>
			                        <td>
			                            <select Required name="f_bank_cd" id="f_bank_cd" style="width:213px;" onChange="chageBankCurrCd(this);">
			                            	<option value=""></option>
			                           			<bean:define id="paramBankList"  name="valMap" property="bankList"/>
												<logic:iterate id="BankVO" name="paramBankList">
			                           				<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
			                           			</logic:iterate>
			                           	</select>
			                        </td>
			                        <th><bean:message key="Currency"/></th>
			                        <td>
			                            <input type="text" name="f_curr_cd" id="f_curr_cd" value="" style="width:40px;text-align:center" class="search_form-disable" readOnly>
			                        </td>
			                        <th><bean:message key="Check_No"/></th>
			                        <td>
			                            <input type="text" name="f_chk_no" id="f_chk_no" maxlength="20" value="" onblur="strToUpper(this);chkNoChg();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px" class="search_form">
			                        </td>
			                        
			                        <!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 -->
			                        <th id="th_ex_rate" style="visibility:hidden;"><bean:message key="Local_Ex_Rate"/></th>
			                        <td id="td_ex_rate" style="visibility:hidden;"><input type="text" name="f_ex_rate" id="f_ex_rate" maxlength="20" value=""onblur="fnsetLocalAmt();" dataformat="float" style="ime-mode:disabled; text-transform:uppercase;width:80px" class="search_form"></td>
			                        <!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 -->
			                        <th id="th_loc_amt" style="visibility:hidden;"><bean:message key="Local_Amt"/></th>
			                        <td id="td_loc_amt" style="visibility:hidden;"><input type="text" name="f_locl_rcv_amt" id="f_locl_rcv_amt" maxlength="20" value="" dataformat="float" style="ime-mode:disabled; text-transform:uppercase;width:80px" class="search_form" readonly="readonly"></td>
							</tr>
						</tbody>
					</table>
					
					<!-- 2016.04.18 C.W.Park Modified -->
					<table>	
						<colgroup>
					        	<col width="100">
					        	<col width="53">
					        	<col width="36">
					        	<col width="84">
					        	<col width="96">
					        	<col width="118">
					        	<col width="95">
					        	<col width="*">
					   </colgroup>
					        <tbody>
								<tr>
			                      	<th><label for="deposit_chk"><bean:message key="Deposit"/></label></th>
			                      	<td>
			                      		<input type="checkbox" name="deposit_chk" id="deposit_chk" onClick="setDepositDate();depositClick();">
			                      	</td>
									<th><bean:message key="Deposit_Date"/></th>
			                        <td><!--
			                            --><input type="text" name="f_deposit_dt" id="f_deposit_dt" value="" class="search_form" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Deposit Date');chkDate(this, frm1.deposit_chk);checkDeposit();" dataformat="excepthan" style="ime-mode:disabled;width:70px;"><!--
										--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_deposit_dt_cal" onclick="doDisplay('DATE1' ,frm1);"></button>
			                        </td>  
									<th style="width:40px;text-align: left;"><label for="void_chk">Void</label> <input type="checkbox" name="void_chk" id="void_chk" onClick="setVoidDate();voidClick();">
									<th><bean:message key="Void_Date"/>&nbsp;<input type="text" name="f_void_dt" id="f_void_dt" value="" class="search_form" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1);" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Void Date');chkDate(this, frm1.void_chk);checkVoid();" dataformat="excepthan" style="ime-mode:disabled;width:70px;"><!----><button type="button" class="calendar" tabindex="-1" id="f_void_dt_cal" onclick="doDisplay('DATE2' ,frm1);"></button>
			                        </th>
			                        <td></td>
			                        <td></td>
							</tr>
							<tr>
	                          <th><bean:message key="Remark"/></th>
	                          <td colspan=10>
				           		<textarea name="f_remark" id="f_remark" onblur="setLimitText(frm1.f_remark,200);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:527px;height:50px;"></textarea>
	                          </td>
							</tr>
						</tbody>
					</table>
				</div>	
			</div>
		</div>
	</div>
	<!-- inquiry_area(E) -->
	<!-- grid_area(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable">
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_normal" id="addBtn02" style="cursor:hand" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
				--><button type="button" class="btn_normal" id="invBtn02" style="cursor:hand" onclick="searchInvList('INVADD')" onKeyDown="if(event.keyCode==9){frm1.f_remark.focus();};"><bean:message key="Invoice_Add"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet1');</script>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
		
		<!-- inquiry_area(S) -->
		
		<div class="opus_design_inquiry" style="width:100%">
			<table>	
					<colgroup>
						<col width="500px"></col>
		    			<col width="110px"></col>
		    			<col width="110px"></col>
		    			<col width="110px"></col>
		    			<col width="110px"></col>
		    			<col width="110px"></col>
		    			<col width="110px"></col><!-- #3505 -->
		    			<col width="110px"></col><!-- #3505 -->
		    			<col width="*"></col>
				   </colgroup>
				        <tbody>
							 <tr>
							 	<td></td>
								<th>Invoice Amount</th>
		                        <td>
									<input type="text" name="f_inv_amt" id="f_inv_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
								</td>
								<th><bean:message key="Balance_Amount"/></th>
		                        <td>
									<input type="text" name="f_bal_amt" id="f_bal_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
								</td>
								<th><bean:message key="Pay_Amount"/></th>
		                        <td>
									<input type="text" name="f_pay_amt" id="f_pay_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
								</td>
								<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 -->
								<th id="th_loc_pay_amt" style="visibility:hidden;"><bean:message key="Local_Pay_Amt"/></th>
								<td id="td_loc_pay_amt" style="visibility:hidden;"><input type="text" name="f_loc_pay_amt" id="f_loc_pay_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
							</tr>
					</tbody>
				</table>
				<table>	
					<colgroup>
				        <col width="80"></col>
				   </colgroup>
					 <tr>
					</tr>
				</table>
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