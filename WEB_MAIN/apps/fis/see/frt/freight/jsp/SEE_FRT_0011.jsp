<%-- 
=========================================================
*@FileName   : SEE_FRT_0011.jsp
*@FileTitle  : Invoice Confirm 화면
*@Description: Invoice Confirm 화면
*@author     : Kang,Jung-Gu 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <!-- 공통 Header -->
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		
		function doWork(){
			if(frm1.bil_dt.value==''){
				alert('Please insert [Billing Date]!');
				frm1.bil_dt.focus();

            }else if(frm1.due_dt.value==''){
                alert('Please insert [Due Date]!');
                frm1.due_dt.focus();
		
			}else{
				var rntStr = frm1.bil_dt.value;
		    		rntStr+= '|';
					if(frm1.bilFlg[0].checked){
						rntStr+= frm1.bilFlg[0].value;
					}else{
						rntStr+= frm1.bilFlg[1].value;
					}
					rntStr+= '|';
                    rntStr+= frm1.due_dt.value;
                    rntStr+= '|';
                    rntStr+= frm1.inv_rmk.value;
                    rntStr+= '|';
                    rntStr+= frm1.buy_inv_no.value;
			    window.returnValue = rntStr;
				window.close();
			}
		}
		
		function doDisplay(doWhat, formObj){
			switch(doWhat){
				case 'DATE11': 
					var cal = new calendarPopup();
					cal.displayType = "date";
					cal.select(frm1.bil_dt, 'bil_dt', 'yyyy-MM-dd');
				break;
                case 'DATE12': 
                    var cal = new calendarPopup();
                    cal.displayType = "date";
                    cal.select(frm1.due_dt, 'due_dt', 'yyyy-MM-dd');
                break;
		
			}
		}
		
		function loadPage() {
			var arg = window.dialogArguments;
			//Debit/Credit인경우
			if(arg[0]=='D'||arg[0]=='C'){
				frm1.bilFlg[1].checked = true;
				frm1.bilFlg[0].disabled = true;
			}
			trdpCd = arg[1];
			frm1.total_amt.value = arg[2];
		}
		
		var trdpCd = '';
		function getDueDate(){
			if(frm1.bil_dt.value.length==10){
				ajaxSendPost(setDueDate, 'reqVal', '&goWhere=aj&bcKey=getDueDate&callId=O&trdp_cd='+trdpCd+'&fm_dt='+frm1.bil_dt.value, './GateServlet.gsl');		
			}
		}
    
		function setDueDate(reqVal){
			var doc = getAjaxMsgXML(reqVal);
			if(doc[0]=='OK'){
				if(typeof(doc[1])!='undefined'){
					var rtnArr = doc[1].split('^@');
					frm1.due_dt.value = rtnArr[1];
		
					frm1.due_dt.className = 'search_form';
					frm1.due_dt.readOnly  = false;
				}
			}else{
				alert(getLabel('ACC_INV_0010_MSG16'));      
			}
		}
				
		
		
	</script>
</head>
<body class="td" onload="loadPage()">
<form name="frm1" method="POST">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle">Invoice Creation</td>
        </tr>
    </table>
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td height="10px"></td>
		</tr>
        <tr>
            <td align="left" class="table_search_bg">
                <table width="650"  border="0" cellpadding="0" cellspacing="0">
					 <tr>
						 <td height="5" colspan="2"></td>
					 </tr>
                     <tr>
                         <td width="85" class="table_search_head_r"><bean:message key="Billing_Date"/></td>
                         <td width="100" class="table_search_body">
							 <input type="text" name="bil_dt" class="search_form" dataformat="excepthan" style="width:77px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true);getDueDate()">
							 <img id="bil_dt_cal" onclick="doDisplay('DATE11', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                         </td>
						 <td width="10"></td>
                         <td width="100" class="table_search_head"><bean:message key="Invoice_Reference_No"/></td>
                         <td class="table_search_body" >
                             <input type="text" name="buy_inv_no" class="search_form" style="width:120px;" maxlength="20">
                         </td>
                     </tr>
                     <tr>
                         <td width="85" class="table_search_head_r"><bean:message key="Due_Date"/></td>
                         <td width="100" class="table_search_body">
                             <input type="text" name="due_dt" class="search_form-disable" dataformat="excepthan" style="width:77px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" readonly>
                             <!--<img id="due_dt_cal" onclick="doDisplay('DATE12', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>-->
                         </td>
                         <td width="10"></td>
                         <td width="100" class="table_search_head"><bean:message key="Total_Amount"/></td>
                         <td class="table_search_body">
                             <input type="text" name="total_amt" class="search_form-disable" style="width:120px;text-align:right" maxlength="20" readonly>
                         </td>
                     </tr>
                     <tr>
                         <td width="85" class="table_search_head_r"><bean:message key="Tax_Bill"/>ing</td>
                         <td class="table_search_body" colspan="4">
							 <input type="radio" name="bilFlg" value="Y" checked>Yes&nbsp;<input type="radio" name="bilFlg" value="N">No
                         </td>
                     </tr>
				</table>
                <table width="650"  border="0" cellpadding="0" cellspacing="0">
                     <tr>
						 <td width="85" class="table_search_head"><bean:message key="Remark"/></td>
						 <td>
							 <textarea name="inv_rmk"  class="search_form" style="width:530;height:50px"></textarea>
						 </td>
                     </tr>
                     <tr>
                         <td height="5" colspan="2"></td>
                     </tr>
                </table>
            </td>
        </tr>
		<tr>
			<td height="10"></td>
		</tr>
    </table>
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="right">
                <table border="0"cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="cursor:hand" onclick="doWork()">
                             <table height="21" border="0" cellpadding="0" cellspacing="0">
                                 <tr>
                                     <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
                                     <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Apply"/></td>
                                     <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
                                 </tr>
                             </table>
                        </td>
						<td width="5"></td>
                        <td style="cursor:hand" onclick="window.close();">
                             <table height="21" border="0" cellpadding="0" cellspacing="0">
                                 <tr>
                                     <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
                                     <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
                                     <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
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

