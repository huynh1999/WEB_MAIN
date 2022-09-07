<%--
=========================================================
*@FileName   : ACC_SLP_0040.jsp
*@FileTitle  : Accounting Interface
*@Description: Accounting Interface
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/02/08
*@since      : 2012/02/08

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0040.js?ver=<%=CLT_JS_VER%>" />
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	
	<script>
		function setSelection(){
			//frm1.s_ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
		}
		
    	
	</script>
	
</head>
<body class="td" onload="javascript:loadPage();setSelection();">
	<form name="frm1" method="POST" action="./ACC_SLP_0040.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	
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
						
						
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('INTERFACE')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Interface"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                        
                        
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('EXCEL')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Excel"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                        
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('CLEAR')">
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
				
				<table border="0" width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<table border="0" width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td width="100" nowrap class="table_search_head_r"><bean:message key="Acct_Company"/></td>
									<td width="153" class="table_search_body">
										<select name="s_cust_cd" style="width:153px;">
			                        		<bean:define id="paramAcctList"  name="valMap" property="acctList"/>
											<logic:iterate id="AcctVO" name="paramAcctList">
			                        			<option value='<bean:write name="AcctVO" property="ACCT_IF_CMP"/>'><bean:write name="AcctVO" property="ACCT_IF_CMP"/></option>
			                        		</logic:iterate>
			                        	</select>
									</td>
									
									<td width="40"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td width="70" nowrap class="table_search_head_r"><bean:message key="Currency"/></td>
			                        <td nowrap class="table_search_body">
				            			<select name="s_curr_cd" style="width:70px;">
				            				<option value=""></option>
			                        		<bean:define id="paramCurrList"  name="valMap" property="currList"/>
											<logic:iterate id="CurrVO" name="paramCurrList">
			                        			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
			                        		</logic:iterate>
			                        	</select>
			                        </td>
			                        <td width="50"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td width="100" nowrap class="table_search_head_r"><bean:message key="Invoice_Date"/></td>
			                        <td nowrap class="table_search_body">
								        <input type="text" name="s_inv_strdt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form">
										~
										<input type="text" name="s_inv_enddt" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form">
										<img id="s_inv_dt_cal" onclick="doDisplay('DATE2', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
			                        </td>
			                        
			                        <td width="30"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
			                        <td width="100" nowrap class="table_search_head"><bean:message key="Last_IF_Date"/></td>
			                        <td nowrap class="table_search_body">
								        <input type="text" name="f_inter_dt" value="" style="width:70px" class="search_form-disable" readOnly>
			                        </td>
			                        
			                        <td width="250"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								</tr>
							</table>
						</td>
						
                                    
					</tr>
					
					
					<tr>
						<td>
							<table border="0" width="100%" cellpadding="0" cellspacing="0">
								<tr>
									<td width="99" nowrap class="table_search_head"><bean:message key="Exchange_Rate"/></td>
			                        <td width="170" nowrap class="table_search_body">
				            			<select name="f_curr_cd" style="width:70px;">
				            				<option value=""></option>
			                        		<bean:define id="paramCurrList"  name="valMap" property="currList"/>
											<logic:iterate id="CurrVO" name="paramCurrList">
			                        			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
			                        		</logic:iterate>
			                        	</select>
			                        	<input type="text" name="f_xcrt" value="" style="width:80px;text-align:right" class="search_form">
			                        </td>
			                        
			                        <td width="200" class="text_check_title">
										<input type="radio" name="roundChk" id="roundChk1" value="1" Checked><label for="roundChk1"><bean:message key="Round"/></label>
										<input type="radio" name="roundChk" id="roundChk2" value="2"><label for="roundChk2"><bean:message key="Round_Down"/></label>
									</td>
									
			                        <td style="cursor:hand" onclick="doWork('APPLY')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Apply"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
											</tr>
										</table>
									</td>
									
									<td width="500"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									
									
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
			                        <td style="cursor:hand" onclick="doWork('VERIFY')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Verify"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
											</tr>
										</table>
									</td>
									
									<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
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
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
	
	<table width="300" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td id="blank1">&nbsp;</td>
			<td id="blank2">&nbsp;</td>
			<td id="progress1" width="60"  style="display:none" class="table_td_title"><bean:message key="Status"/>:</td>
			<td id="progress2" width="240" style="display:none"><font size="3" color="red"><b><blink><bean:message key="Processing_Wait_Please"/></blink></b></font></td>
			<td id="success1"  width="60"  style="display:none" class="table_td_title"><bean:message key="Status"/>:</td>
			<td id="success2"  width="240" style="display:none"><font size="3" color="blue"><b><bean:message key="Success"/></b></font></td>
		</tr>
	</table>
	
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
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
	</form>
</body>
</html>