<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0070.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript">
		//memo 를 핸들링 하는 부분
		function chkText(){
			/*
			if(document.frm1.bl_type[0].checked){
				document.frm1.bl_memo.value = "";
				document.frm1.bl_memo.disabled = true;
				document.frm1.stamp_type.disabled = false;
			}else if(document.frm1.bl_type[1].checked){
				document.frm1.bl_memo.value = "";
				document.frm1.bl_memo.disabled = true;
				document.frm1.stamp_type.disabled = true;
			}else{
				document.frm1.bl_memo.disabled = false;
				document.frm1.stamp_type.disabled = false;
			}
			*/
		}
	</script>
</head>
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" class="td" onload="javascript:loadPage();">
<form name="frm1" method="POST">
	<input	type="hidden" name="f_cmd"/> 
	<input	type="hidden" name="intg_bl_seq" value="<bean:write name="tmpMap" property="intg_bl_seq"/>"/>
	<!-- 소타이틀, 대버튼 -->
    <table width="300" border="0" cellspacing="0" cellpadding="0">
    	<!-------------------- title begin -------------------->
		<tr>
			<td width="100%" class="bigtitle" align="left"><bean:message key="Deposit_Slip_option"/></td>
		</tr>
		<!-------------------- title end -------------------->
		<!--space -->
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
	    <!--space -->
		<!-------------------- button begin -------------------->
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    	<td style="cursor:hand" onclick="doWork('Print')">
							<table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
						</td>
						<td width="3">&nbsp;</td>
                        <td style="cursor:hand" onclick="doWork('CLOSE');">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 간격 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!-- 간격 -->
    <table width="300" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="left" class="table_search_bg">
                <table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <td width="130" nowrap class="table_search_head"><bean:message key="Invoice_No"/></td>
			            <td nowrap class="table_search_body">
			            	<input name="inv_no" type="text" value='<bean:write name="tmpMap" property="inv_no"/>' style="width:110px;" class="search_form" readOnly></td>           
			        </tr>
			        <tr>
						<td width="130" nowrap class="table_search_head_r">Received Date</td>
						<td class="table_search_body" align="left">
							<input type="text" name="rcv_dt" value="" class="search_form" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" dataformat="excepthan" style="ime-mode:disabled;width:70px;text-align:left" maxlength="10">
							<img id="rcv_dt_cal" onclick="doDisplay('DATE1' ,frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="middle" style="cursor:hand;">
						</td>
					</tr>
			    </table>
            </td>
        </tr>
    </table>
</form>
</body>
</html>
