<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/template/script/TMP_POP_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript">
		//date text 활성화/비활성화
		function chkText(val){
			var formObj = document.frm1;
			
			if(val==1){
				if(formObj.date_type1(0).checked){
					formObj.x1.disabled = false;
					formObj.y1.disabled = false;
				}else{
					formObj.x1.value = "";
					formObj.x1.disabled = true;
					formObj.y1.value = "";
					formObj.y1.disabled = true;
				}
			}else if(val==2){
				if(formObj.date_type2(0).checked){
					formObj.x2.disabled = false;
					formObj.y2.disabled = false;
				}else{
					formObj.x2.value = "";
					formObj.x2.disabled = true;
					formObj.y2.value = "";
					formObj.y2.disabled = true;
				}
			}else if(val==3){
				if(formObj.date_type3(0).checked){
					formObj.x3.disabled = false;
					formObj.y3.disabled = false;
				}else{
					formObj.x3.value = "";
					formObj.x3.disabled = true;
					formObj.y3.value = "";
					formObj.y3.disabled = true;
				}
			}
		}
	</script>
	<base target="_self">
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" class="td" onload="javascript:loadPage();">
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Date Value -->
	
	<input	type="hidden" name="screen_id"/>
	<input	type="hidden" name="screen_value"/>
	<input	type="hidden" name="date_cnt"/>
	<input	type="hidden" name="fm_date_name1"/>
	<input	type="hidden" name="to_date_name1"/>
	<input	type="hidden" name="fm_date_name2"/>
	<input	type="hidden" name="to_date_name2"/>
	<input	type="hidden" name="fm_date_name3"/>
	<input	type="hidden" name="to_date_name3"/>
	
	<!-- 소타이틀, 대버튼 -->
    <table width="340" border="0" cellspacing="0" cellpadding="0">
    	<!-------------------- title begin -------------------->
		<tr>
			<td width="100%" class="bigtitle" align="left"><bean:message key="Date_Type_Definition"/></td>
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
                    	<td style="cursor:hand" onclick="doWork('Save')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
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
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
	<!-- 간격 -->
    <table width="340" border="0" cellpadding="0" cellspacing="0">
      	<tr>
        	<td align="left" class="table_search_bg">
        		<table border="0" cellpadding="0" cellspacing="0">
        			<tr>
		                <td width="300" class="table_search_head" colspan="3"><bean:message key="Date_Type1"/></td>
		            </tr>
	              	<tr>
		                <td width="300" valign="top" class="table_search_body">
		                <input type="radio" name="date_type1" id="date_type11" value="A" onclick="javascript:chkText(1);" checked><label for="date_type11">오늘 - x1 ~ 오늘 + y1</label></td>
		            </tr>  
		            <tr>  
		                <td width="300" valign="top" class="table_search_body">
		                <input type="radio" name="date_type1" id="date_type12" value="B" onclick="javascript:chkText(1);"><label for="date_type12">올해초 ~ 오늘</label></td>
		            </tr>
		            <tr>  
		                <td width="300" valign="top" class="table_search_body">
		                <input type="radio" name="date_type1" id="date_type13" value="C" onclick="javascript:chkText(1);"><label for="date_type13">월초 ~ 월말</label></td>
		            </tr>
		            <tr>
		            	<td width="300" valign="top" class="table_search_body">
		            	x1 : <input type="text" name="x1" style="width:50"/>  y1 : <input type="text" name="y1" style="width:50"/> 
		            	</td>
		            </tr>
	            </table>
	            
	            <table border="0" cellpadding="0" cellspacing="0">
        			<tr>
		                <td width="300" class="table_search_head" colspan="3"><bean:message key="Date_Type2"/></td>
		            </tr>
	              	<tr>
		                <td width="300" valign="top" class="table_search_body">
		                <input type="radio" name="date_type2" id="date_type21" value="A" onclick="javascript:chkText(2);"><label for="date_type21">오늘 - x2 ~ 오늘 + y2</label></td>
		            </tr>  
		            <tr>  
		                <td width="300" valign="top" class="table_search_body">
		                <input type="radio" name="date_type2" id="date_type22" value="B" onclick="javascript:chkText(2);"><label for="date_type22">올해초 ~ 오늘</label></td>
		            </tr>
		            <tr>  
		                <td width="300" valign="top" class="table_search_body">
		                <input type="radio" name="date_type2" id="date_type23" value="C" onclick="javascript:chkText(2);"><label for="date_type23">월초 ~ 월말</label></td>
		            </tr>
		            <tr>
		            	<td width="300" valign="top" class="table_search_body">
		            	x2 : <input type="text" name="x2" style="width:50"/>  y2 : <input type="text" name="y2" style="width:50"/> 
		            	</td>
		            </tr>
	            </table>
	            
	            <table border="0" cellpadding="0" cellspacing="0">
        			<tr>
		                <td width="300" class="table_search_head" colspan="3"><bean:message key="Date_Type3"/></td>
		            </tr>
	              	<tr>
		                <td width="300" valign="top" class="table_search_body" style="">
		                <input type="radio" name="date_type3" id="date_type31" value="A" onclick="javascript:chkText(3);"><label for="date_type31">오늘 - x3 ~ 오늘 + y3</label></td>
		            </tr>  
		            <tr>  
		                <td width="300" valign="top" class="table_search_body">
		                <input type="radio" name="date_type3" id="date_type32" value="B" onclick="javascript:chkText(3);"><label for="date_type32">올해초 ~ 오늘</label></td>
		            </tr>
		            <tr>  
		                <td width="300" valign="top" class="table_search_body">
		                <input type="radio" name="date_type3" id="date_type33" value="C" onclick="javascript:chkText(3);"><label for="date_type33">월초 ~ 월말</label></td>
		            </tr>
		            <tr>
		            	<td width="300" valign="top" class="table_search_body">
		            	x3 : <input type="text" name="x3" style="width:50"/>  y3 : <input type="text" name="y3" style="width:50"/> 
		            	</td>
		            </tr>
	            </table>
			    
        	</td>
      	</tr>
    </table>
</form>
</body>
</html>