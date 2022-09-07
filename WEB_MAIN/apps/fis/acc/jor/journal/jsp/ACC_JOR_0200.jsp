<%--
=========================================================
*@FileName   : ACC_JOR_0200.jsp
*@FileTitle  : Tax Bill Deposit Journal
*@Description: Tax Bill Deposit Journal
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/01/17
*@since      : 2012/01/17

*@Change history:
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
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0200.js?ver=<%=CLT_JS_VER%>" />
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO"  name="valMap" property="ofcInfo"/>
	
	<bean:define id="jnr_no"  name="valMap" property="jnr_no"/>
	<bean:define id="cust_cd" name="valMap" property="cust_cd"/>
	<bean:define id="inv_no"  name="valMap" property="inv_no"/>
	
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>

	
	<script>
		function setSelection(){
			
			frm1.f_curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';

			frm1.t_jnr_no.value  = '<bean:write name="jnr_no"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
		}
		
		
		function searchSelection(){
			
			frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';

			frm1.t_jnr_no.value  = '<bean:write name="jnr_no"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
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
        
	</script>
	
</head>
<body class="td" onload="javascript:setSelection();loadPage();">
	<form name="frm1" method="POST" action="./ACC_JOR_0200.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="f_intg_bl_seq" 		value=""/>
	<input type="hidden" name="f_bl_no" 			value=""/>
	<input type="hidden" name="f_air_sea_clss_cd" 	value=""/>
	<input type="hidden" name="f_biz_clss_cd" 		value=""/>
	<input type="hidden" name="f_bnd_clss_cd" 		value=""/>
	
	<input type="hidden" name="f_inv_seq" 			value=""/>
	<input type="hidden" name="f_inv_no" 			value=""/>
	<input type="hidden" name="f_print_type" 		value=""/>
	
	<input type="hidden" name="f_oth_seq" 			value=""/>
	<input type="hidden" name="f_jnr_no" 			value=""/>
	<input type="hidden" name="s_jnr_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_jnr_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="old_void_chk" 		value=""/>
	
	<input type="hidden" name="t_cust_cd" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_inv_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	
	<input type="hidden" name ="slip_post" 			value="<bean:write name="slip_post"/>"/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name ="old_post_dt" 		value=""/>
	
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	
	
    <!-- 타이틀, 네비게이션 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
	    <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    	<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('SEARCHLIST')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>

						<td id="saveBtn1"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td id="saveBtn2"style="cursor:hand" onclick="doWork('MODIFY')">
							<table id="btnModify" height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						
						<!--  
                        <td id="deleteBtn1" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td id="deleteBtn2" style="display:none;cursor:hand" onclick="doWork('DELETE')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Delete"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
						-->
						<!--  
						<td id="copyBtn01" style="display:none"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td id="copyBtn02" style="display:none;cursor:hand" onclick="Copy()">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Copy"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						-->
						
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="clearAll()">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Clear"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    
    
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
	<table width="1200" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td align="left" class="table_search_bg">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
				
				<table border="0" width="900" cellpadding="0" cellspacing="0">
					<tr>
						<td width="90" nowrap class="table_search_head"><bean:message key="Customer"/></td>
                        <td width="280" class="table_search_body">
				            <input type="text" name="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="codeNameAction('CUSTOMER',this, 'onBlur')" class="search_form">
				            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="customer" onClick="doWork('CUSTOMER_POPLIST')" style="cursor:hand" align="absmiddle">
				            <input type="text" name="s_cust_nm" value="" onKeyDown="custEnterAction(this,'CUSTOMER')" style="width:130px" class="search_form">
                        </td>
                        
						<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="110" class="table_search_head"><bean:message key="Received_From"/></td>
                        <td width="150" class="table_search_body">
                            <input type="text" name="f_rcv_from" value="" onKeyDown="custEnterAction(this,'CUSTOMER2')" style="width:150px" class="search_form">
                        </td>
                        <td width="30"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="300" class="text_check_title">
                        	<label for="dept_chk1"><bean:message key="Local"/></label> <input type="checkbox" name="dept_chk1" id="dept_chk1" value="1" checked>&nbsp;
                        	<label for="dept_chk2"><bean:message key="CR_DB"/></label> <input type="checkbox" name="dept_chk2" id="dept_chk2" value="2" checked>&nbsp;
                        	<label for="dept_chk3"><bean:message key="AP"/></label>   <input type="checkbox" name="dept_chk3" id="dept_chk3" value="3" checked>
                        </td>
                        
                        <td width="40"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    
					</tr>
					
					
					<tr>
						<td width="90" nowrap class="table_search_head"><bean:message key="Invoice_No"/></td>
                        <td width="250" class="table_search_body">
				            <input type="text" name="s_inv_no" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:225px" class="search_form">
                        </td>
                        <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        
                        <td width="120" nowrap class="table_search_head"><bean:message key="Vendor_Invoice_No"/></td>
                        <td width="250" class="table_search_body">
				            <input type="text" name="s_v_inv_no" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" class="search_form">
                        </td>
					</tr>
					
				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
			</td>
		</tr>
		
		<tr>
			<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
		
		<tr>
			<td align="left" class="table_search_bg">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
				
				<table border="0" width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="70" nowrap class="table_search_head"><bean:message key="Currency"/></td>
                        <td width="100" class="table_search_body">
				            <select name="f_curr_cd" style="width:70px;">
                           		<bean:define id="paramCurrList"  name="valMap" property="currList"/>
								<logic:iterate id="CurrVO" name="paramCurrList">
                           			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
                           		</logic:iterate>
                            </select>
                        </td>
                        
						<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="70" class="table_search_head"><bean:message key="Check_No"/></td>
                        <td width="80" class="table_search_body">
                            <input type="text" name="f_chk_no" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" class="search_form">
                        </td>
                        
                        
						<td width="25"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						
						<td width="70" class="text_check_title"><label for="deposit_chk"><bean:message key="Deposit"/></label> <input type="checkbox" name="deposit_chk" id="deposit_chk" onClick="setDepositDate();"></td>
						<td width="100" class="table_search_head"><bean:message key="Deposit_Date"/></td>
                        <td width="100" class="table_search_body">
                            <input type="text" name="f_deposit_dt" value="" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);checkDeposit();" dataformat="excepthan" style="ime-mode:disabled;width:70px;">
							<img id="f_deposit_dt_cal" onclick="doDisplay('DATE1' ,frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
                        </td>
                        
                        
                        <td width="35"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="50" class="text_check_title">Void <input type="checkbox" name="void_chk" id="void_chk" onClick="setVoidDate();" disabled></td>
                        
                        <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="80" class="table_search_head"><label for="vofor_chk"><bean:message key="Void_Date"/></label></td>
                        <td width="100" class="table_search_body">
                            <input type="text" name="f_void_dt" value="" class="search_form-disable" onKeyUp="mkDateFormatType(this, event, false,1)" maxlength="10" onBlur="mkDateFormatType(this, event, true,1)" dataformat="excepthan" style="ime-mode:disabled;width:70px;" readOnly>
							<img id="f_void_dt_cal" onclick="doDisplay('DATE2' ,frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
                        </td>
                        
                        <td width="255"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    
					</tr>
				</table>
				
				<table border="0" width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td width="120" nowrap class="table_search_head"><bean:message key="Received_Amount"/></td>
                        <td width="200" class="table_search_body">
				            <input type="text" name="f_rcv_amt" value="" style="width:120px;text-align:right" class="search_form-disable" readOnly>
                        </td>
                        
                        
                        <td width="37"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="80" class="table_search_head_r"><bean:message key="Billing_Date"/></td>
                        <td width="120" class="table_search_body">
                            <input type="text" name="f_post_dt" value="" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" maxlength="10" onBlur="mkDateFormatType(this, event, true,1);checkPostDate();" dataformat="excepthan" style="ime-mode:disabled;width:70px;">
							<img id="=_cal" onclick="doDisplay('DATE3' ,frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
                        </td>
                        
                        
                        
                        <td width="96"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="100" class="table_search_head"><bean:message key="Deposit_Bank"/></td>
                        <td width="120" class="table_search_body">
                            <select name="f_bank_cd" style="width:150px;">
                           		<bean:define id="paramBankList"  name="valMap" property="bankList"/>
								<logic:iterate id="BankVO" name="paramBankList">
                           			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
                           		</logic:iterate>
                           	</select>
                        </td>
                        
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    
					</tr>
				</table>
				
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
				
			</td>
		</tr>
		
		
	</table>
	
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    
    
    <!-- 소타이틀, 대버튼 
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    	<td height="21"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    	<td id="addBtn01"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td id="addBtn02" style="cursor:hand" onclick="doWork('ROWADD')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Add"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    -->
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    
	<table width="1200" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
				<!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <!-- 간격 -->
				<table border="0" width="100%">
					<tr>
						<td>
							<table border="0" width="100%" id="mainTable">
								<tr>
									<td>
										<script language="javascript">comSheetObject('sheet1');</script>
										<script language="javascript">comSheetObject('sheet2');</script>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				
				
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
				
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td align="right">
							<table width="650" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td width="90" nowrap class="text_body_title">Invoice Amount</td>
			                        <td nowrap class="table_search_body">
										<input type="text" name="f_inv_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
									</td>
									
									<td width="95" nowrap class="text_body_title"><bean:message key="Balance_Amount"/></td>
			                        <td nowrap class="table_search_body">
										<input type="text" name="f_bal_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
									</td>
									
									<td width="75" nowrap class="text_body_title"><bean:message key="Pay_Amount"/></td>
			                        <td nowrap class="table_search_body">
										<input type="text" name="f_pay_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
									</td>
								</tr>
							</table>
						</td>
						
					</tr>
				</table>
				
				
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
			</td>
		</tr>
	</table>
	
	<!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td align="left" class="table_search_bg">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
		              	<td colspan="5">
		              		<table border="0" cellpadding="0" cellspacing="0">
		              			<tr>
						            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						        </tr>
		                        <tr>
		                            <td width="105" nowrap class="table_search_head"><bean:message key="Remark"/></td>
		                            <td nowrap class="table_search_body">
							           <textarea name="f_remark" maxlength="500" dataformat="excepthan" style="width:470;height:50px;"></textarea>
		                            </td>
		                        </tr>
		                        <tr>
						            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						        </tr>
		                    </table>
		              	</td>
		              </tr>
				</table>
			</td>
		</tr>
			
	</table>
	</form>
</body>
</html>