<%--
=========================================================
*@FileName   : ACC_JOR_0800.jsp
*@FileTitle  : Deposit/Payment for China (Entry)
*@Description: Deposit/Payment for China (Entry)
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/23
*@since      : 2011/11/23

*@Change history:
*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/10
*@since      : 2014/07/10
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0800.js?ver=<%=CLT_JS_VER%>" ></script>
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm 	 = userInfo.getUser_name();
		String email 	 = userInfo.getEml();
		String userId 	 = userInfo.getUsrid();
		String cnt_cd 	 = userInfo.getOfc_cnt_cd();
		
		/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
		// EDIT INVOICES AFTER FILE BLOCK
		String fb_flg 		= userInfo.getFb_flg();	
		/* LHK, 20130116, #25248, Void 권한 제어 */
		// VOID CHECK
		String vc_flg		= userInfo.getVc_flg();
		/* LHK, 20140421, #27585, Print 권한 제어 */
		// EDIT PAYMENT AFTER CHECK PRINT
		String prn_flg		= userInfo.getPrn_flg();
		// OTHER OFFICE ACCESS (ACCT)
		String oa_flg 		= userInfo.getOa_flg();
		/* #1248 - Issued Office 수정 권한 (CHANGE OFFICE CODE OF DEPOSIT/PAYMENT) */
		String codp_flg 	= userInfo.getCodp_flg();
		
		
		
		//#2115 [PATENT] Deposit/Payment for CN (ENTRY) 기능 보완
		String copyFlag = request.getParameter("copyFlag");
		String c_cust_cd = request.getParameter("c_cust_cd");
		String c_cust_nm = request.getParameter("c_cust_nm");
		String c_inv_no = request.getParameter("c_inv_no");
		String c_dept_chk1 = request.getParameter("c_dept_chk1");
		String c_dept_chk2 = request.getParameter("c_dept_chk2");
		String c_dept_chk3 = request.getParameter("c_dept_chk3");
		String c_his_chk1 = request.getParameter("c_his_chk1");
		String c_his_chk2 = request.getParameter("c_his_chk2");
		String c_type = request.getParameter("c_type");
		String c_type_no = request.getParameter("c_type_no");
		
		/*
		System.out.println("copyFlag#############  :  " + copyFlag);
		System.out.println("c_cust_cd#############  :  " + c_cust_cd);
		System.out.println("c_cust_nm############   :  " + c_cust_nm);
		System.out.println("c_inv_no############   :  " + c_inv_no);
		System.out.println("c_dept_chk1############   :  " + c_dept_chk1);
		System.out.println("c_dept_chk2############   :  " + c_dept_chk2);
		System.out.println("c_dept_chk3############   :  " + c_dept_chk3);
		System.out.println("c_his_chk1############   :  " + c_his_chk1);
		System.out.println("c_his_chk2############   :  " + c_his_chk2);
		System.out.println("c_type############   :  " + c_type);
		System.out.println("c_type_no############   :  " + c_type_no);
		*/
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO" name="valMap" property="ofcInfo"/>
	
	<bean:define id="grp_slip_no"   name="valMap" property="grp_slip_no"/>
	<bean:define id="jnrNo"   name="valMap" property="jnr_no"/>
	<bean:define id="cust_cd" name="valMap" property="cust_cd"/>
	<bean:define id="inv_no"  name="valMap" property="inv_no"/>
	<bean:define id="inv_tp"  name="valMap" property="inv_tp"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>
	
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="bankCurr"  name="valMap" property="bankCurr"/>
	
	
	<script>
	
		//#2115 [PATENT] Deposit/Payment for CN (ENTRY) 기능 보완
		var copyFlag     = "<%=copyFlag%>";
		var c_cust_cd    = "<%=c_cust_cd%>";
		var c_cust_nm    = "<%=c_cust_nm%>";
		var c_inv_no     = "<%=c_inv_no%>";
		var c_dept_chk1  = "<%=c_dept_chk1%>";
		var c_dept_chk2  = "<%=c_dept_chk2%>";
		var c_dept_chk3  = "<%=c_dept_chk3%>";
		var c_his_chk1   = "<%=c_his_chk1%>";
		var c_his_chk2   = "<%=c_his_chk2%>";
		var c_type       = "<%=c_type%>";
		var c_type_no    = "<%=c_type_no%>";	
	
		var xch_rt_dp_cnt 	= Number('<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>');
	
		function setSelection(){
			frm1.t_grp_slip_no.value  = '<bean:write name="grp_slip_no"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
			frm1.t_inv_tp.value  = '<bean:write name="inv_tp"/>';  
			
			frm1.gl_ex_profit.value  = '<bean:write name="ofcVO" property="gl_ex_profit"/>';  
			frm1.gl_ex_loss.value  = '<bean:write name="ofcVO" property="gl_ex_loss"/>';  
			frm1.gl_misc_profit.value  = '<bean:write name="ofcVO" property="gl_misc_profit"/>';  
			frm1.gl_misc_loss.value  = '<bean:write name="ofcVO" property="gl_misc_loss"/>';  
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
        
        var CURRCD = '|';
        <logic:notEmpty name="valMap" property="chinaCurrList">
			<% boolean isBegin2 = false; %>
	        <bean:define id="currList" name="valMap" property="chinaCurrList"/>
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
        <logic:notEmpty name="valMap" property="chinaBankList">
			<% boolean isBegin4 = false; %>
	        <bean:define id="bankList" name="valMap" property="chinaBankList"/>
	        <logic:iterate id="bankCurrVO" name="bankList">
	            <% if(isBegin4){ %>
	            	BK_CURR_CD += '|';
	            <% }else{
	            	isBegin4 = true;
	               } %>
	               BK_CURR_CD += '<bean:write name="bankCurrVO" property="curr_cd"/>' + '-'
	               			   + '<bean:write name="bankCurrVO" property="bank_seq"/>' + '-' 
	               			   + '<bean:write name="bankCurrVO" property="bank_nm"/>'+ '-' 
	               			   + '<bean:write name="bankCurrVO" property="cur_chk_no"/>' + '-' 
	               			   + '<bean:write name="bankCurrVO" property="lst_chk_no"/>';
	        </logic:iterate>
    	</logic:notEmpty>
    	
    	
    	var BANK_SEQ = '|';
    	var BANK_NM = '|';
    	<logic:notEmpty name="valMap" property="chinaBankList">
			<% boolean isBegin4 = false; %>
	        <bean:define id="paramBankList" name="valMap" property="chinaBankList"/>
	        <logic:iterate id="BankVO" name="paramBankList">
	            <% if(isBegin4){ %>
	            	BANK_SEQ += '|';
	           	 	BANK_NM += '|';
	            <% }else{
	            	isBegin4 = true;
	               } %>
	               BANK_SEQ+= '<bean:write name="BankVO" property="bank_seq"/>';
	               BANK_NM+= '<bean:write name="BankVO" property="bank_nm"/>';
	        </logic:iterate>
 		</logic:notEmpty>
 		
 		var AUTOCOMPLETE_YN = 'N';
 		 
 		<logic:notEmpty name="valMap" property="autocompleteYn">
 	    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
 		</logic:notEmpty>
    	
		function fnbtnCtl(){ 
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			 
			//Enable Editing Other Office (ACCT) 
			var edoa_flg = "<%=userInfo.getEdoa_flg()%>"; //Enable Editing Other Office (ACCT) 
			var ofc_cd = "<%=userInfo.getOfc_cd()%>";
			var ref_ofc_cd = formObj.f_ofc_cd.value;
			
			var btnflag = "Y";
			if (edoa_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") { btnflag = "Y"; }
			if (btnflag == "Y"){
				//기존유지
				//$("#btnModify").show(); 
			}else{
				$("#btnModify").hide(); 
				$("#btnSaveX").hide(); 
				$("#btnModifyBlock").hide();
			} 

		}
    	
    	function setupPage() {
    		setSelection();
    		loadPage();
    	}
	</script>
<form name="frm1" method="POST" action="./ACC_JOR_0800.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="f_grp_slip_no" 		value=""/>
	<input type="hidden" name="s_grp_slip_no" 		value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_grp_slip_no" 		value=""/> <!-- LIST에서 이동시 사용 -->
	
	<input type="hidden" name="f_jnr_no" 			value=""/>
	<input type="hidden" name="file_name" 			value=""/>
	<input type="hidden" name="rd_param"  			value=""/>
	<input type="hidden" name="title"    			value=""/>
	<input type="hidden" name="proc_userid" 		value="<%=userId%>"/>
	
	<input type="hidden" name="t_cust_cd" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_inv_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_inv_tp" 			value=""/> <!-- LIST에서 이동시 사용 -->
	
	<input type="hidden" name ="slip_post" 			value="<bean:write name="slip_post"/>"/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name ="old_post_dt" 		value=""/>
	
	<input type="hidden" name="f_cnt" 				value="<%=cnt_cd%>"/>
	<input type="hidden" name="role_cd"  			value="<%=userInfo.getRole_cd()%>" />
	
	<input type="hidden" name ="print_auto_save" 	value=""/>
	
	<input type="hidden" name="f_chk_form" 			value=""/>
	
	<input type="hidden" name="f_cur_chk_no" 		value=""/>
	<input type="hidden" name="f_lst_chk_no" 		value=""/>
	
	<!-- #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 -->
	<input	type="hidden" name="fb_flg" value="<%= fb_flg %>"/>		
	
	<!-- LHK, 20130116, #25248, Void 권한 제어 -->
	<input	type="hidden" name="vc_flg" value="<%= vc_flg %>"/>
	
	<!-- LHK, 20140422, #27585, Print 권한 제어  -->
	<input	type="hidden" name="prn_flg" value="<%= prn_flg %>"/>
	
	<!-- #50559 - [ALL GREEN] Payment/Deposit Search 후 Other Branch Access 관련 -->
	<input type="hidden" name="s_ofc_cd" id="s_ofc_cd"  value="" />
	<input type="hidden" name="oa_flg" id="oa_flg" value="<%= oa_flg %>"/>
	

	<!-- #51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가 -->
	<input id="f_ofc_cd" name="f_ofc_cd" value="" type="hidden" />
	
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
	
	<!-- #1248 - Issued Office 수정 권한 (CHANGE OFFICE CODE OF DEPOST/PAYMENT) -->
	<input type="hidden" name="codp_flg" id="codp_flg" value="<%= codp_flg %>"/>
	
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%-- 
		   <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button id="btnModify" type="button" class="btn_accent" onclick="doWork('MODIFY')"><bean:message key="Save"/></button></span>
		   <button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
		   <span style="display:none;" btnAuth="SAVE_BLOCK"><button type="button" class="btn_normal"  id="btnModifyBlock" onclick="doWork('MODIFY_BLOCK')"><bean:message key="Save_L"/></button></span>
		   <span style="display:none;" btnAuth="COPY"><button id="btnCopy" type="button" class="btn_normal" onclick="doWork('COPY')"><bean:message key="Copy"/></button></span>
		   <span style="display:none;" btnAuth="CLEAR"><button type="button" class="btn_normal" onclick="doWork('CLEAR')"><bean:message key="New"/></button></span>
		   <span style="display:none;" btnAuth="P_REPORT"><button type="button" class="btn_normal" onclick="doWork('PROFIT_REPORT')"><bean:message key="P.Report"/></button></span>
		   <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button></span>
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
	<div class="wrap_result">
	<!-- layout_wrap (S) -->
	<div class="layout_wrap" style="width: 100%;">
	    <div class="layout_vertical_2"  style="width:370px">
				<div class="opus_design_inquiry sm" style="height:243px;">
					<table>
						<tr>
							<td width="287px" id="searchInfo"><h3 class="title_design mar_top_4"><bean:message key="Invoice_Search"/></h3></td>
							<td align="right"><span id="btnSearch"><button type="button" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_etc" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button></span></td>
						</tr>
					</table>
			    	<table>
			    		<colgroup>
			    			<col width="100px"></col>
			    			<col width="*"></col>
			    		</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Bill_to/Remit_to"/></th> <!-- #2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성 -->
		                        <td><!--
		                        --><input type="text" name="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="codeNameAction('CUSTOMER',this, 'onBlur')" required ><!--
		                        --><button type="button" class="input_seach_btn" tabindex="-1" id="customer1" onclick="doWork('CUSTOMER_POPLIST')"></button><!--
		                        --><input type="text" name="s_cust_nm" maxlength="50" value="" onKeyPress="if(event.keyCode==13){custEnterAction(this,'CUSTOMER_NAME');}" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:134px" required></td>
							</tr>
							
							<tr>
		                        <th><bean:message key="Invoice_No"/></th>
		                        <td><!--
		                        --><input type="text" name="s_inv_no" maxlength="50" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:208px" onKeyDown="enterInvoiceNo();"><!--
		                        --><button type="button" class="input_seach_btn" tabindex="-1" id="imgInvget" onClick="searchInvList('INVGET')"></button>
		                        </td>
							</tr>
						</tbody>
					</table>
					<table>
			    		<colgroup>
			    			<col width="100"></col>
			    			<col width="40"></col>
			    			<col width="40"></col>
			    			<col width="100"></col>
			    			<col width="*"></col>
			    		</colgroup>
						<tbody>
							<tr>
								<th><label for="dept_chk1"><bean:message key="AR"/></label> <input type="checkbox" name="dept_chk1" id="dept_chk1" value="1" checked></th>
								<th><label for="dept_chk2"><bean:message key="B.DC"/></label> <input type="checkbox" name="dept_chk2" id="dept_chk2" value="2" checked></th>
								<th><label for="dept_chk3"><bean:message key="AP"/></label> <input type="checkbox" name="dept_chk3" id="dept_chk3" value="3" checked></th>
								<th><input type="radio" name="his_chk" id="his_chk1" value="A"><label for="his_chk1"><bean:message key="All"/></label></th>
								<th style="text-align: left;padding-left: 5px;"><input type="radio" name="his_chk" id="his_chk2" value="O" checked><label for="his_chk2"><bean:message key="Open"/></label></th>
							</tr>
						</tbody>
					</table>
					<table>
			    		<colgroup>
			    			<col width="100"></col>
			    			<col width="*"></col>
			    		</colgroup>
						<tbody>
							<tr height="37px" valign="bottom">
								<th>
									<select name="s_type" style="width:83px; font-weight: bold;" class="search_form">
										<option value="REF_NO" selected><bean:message key="Ref_No"/></option>
										<option value="MBL_NO"><bean:message key="MBL_No"/></option>
										<option value="HBL_NO"><bean:message key="HBL_No"/></option>
									</select>		
								</th>
								<td>
									<input type="text" name="s_type_no" maxlength="40" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:208px">
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="layout_vertical_2" style="padding-left:8px;width:calc(100% - 370px)">
				<div class="opus_design_inquiry sm" style="height:243px;">
					<table>
						<colgroup>
		            		<col width="90">
		            		<col width="120">
		            		<col width="110">
		            		<col width="110">
		            		<col width="90">
		            		<col width="120">
		            		<col width="110">
				        	<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Slip_No"/></th>
		                        <td><input type="text" name="i_grp_slip_no" id="i_grp_slip_no" onclick="if(this.value=='AUTO'){this.value=''}" maxlength="20" value=""  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px" ></td>
		                        <th><bean:message key="Voucher_Type"/></th>
		                        <td>
		                        	<bean:define id="vchrTpCdList" name="valMap" property="vchrTpCdList"/>
		                             <html:select name="valMap" property="i_vchr_tp_cd" style="width:90px;">
		                                 <html:options collection="vchrTpCdList" property="cd_val" labelProperty="cd_nm"/>
		                             </html:select>
		                        </td>
		                        <th><bean:message key="Voucher_No"/></th>
		                        <td><input type="text" name="i_vchr_no" id="i_vchr_no" maxlength="20" value=""  onclick="if(this.value=='AUTO'){this.value=''}" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px" ></td>
		                        <th><bean:message key="Receive_Type"/></th>
		                        <td>
		                        	<bean:define id="rcvTpCdList" name="valMap" property="rcvTpCdList"/>
		                             <html:select name="valMap" property="i_rcv_tp_cd" style="width:90px;">
		                                 <option value=""></option>
		                                 <html:options collection="rcvTpCdList" property="cd_val" labelProperty="cd_nm"/>
		                             </html:select>
		                        </td>
							</tr>
						</tbody>
					</table>
					<div class="opus_design_grid">
		    			<script language="javascript">comSheetObject('sheet1');</script>
		    		</div>
				</div>
			</div>
		</div>
	</div>

    <div class="wrap_result">
    	<div class="opus_design_grid" id="mainTable">
    		 <div class="opus_design_btn"><!--
		       --><button type="button" class="btn_accent" id="addBtn02" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!--
		       --><button type="button" class="btn_normal" id="invBtn02" onclick="searchInvList('INVADD')"><bean:message key="Invoice_Add"/></button>
		     </div>
			<script language="javascript">comSheetObject('sheet2');</script>
			<script language="javascript">comSheetObject('sheet3');</script>
    	</div>
    	
		<div class="opus_design_inquiry" style="width:100%">
			<table>	
				<colgroup>
			        <col width="20"></col>
			        <col width="*"></col>
			   </colgroup>
				 <tr>
					<th><bean:message key="Remark"/></th>
					    <td>
						<textarea name="f_remark" id="f_remark" onblur="setLimitText(frm1.f_remark,200);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:527px;height:70px;"></textarea>
						</td>
				</tr>
			</table>
		</div>
		<!-- inquiry_area(E) -->    	
    	
	</div>
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
