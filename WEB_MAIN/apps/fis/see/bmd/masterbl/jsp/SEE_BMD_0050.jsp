<%--
=========================================================
*@FileName   : SEE_BMD_0050.jsp
*@FileTitle  : BL번호 수정 팝업
*@Description: HBL 또는 MBL의 BL번호를 변경한다.
*@author     : Kang,Jung-Gu
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		
		function doWork(srcName){
			try{
				switch(srcName) {
					case "MODIFY":
						if(frm1.to_bl_no.value==''){
							alert('Please input B/L No!');
						}else if(frm1.to_bl_no.value==frm1.bl_no.value){
							alert('Nothing is changed! Please check the B/L No!');
						}else{
							ajaxSendPost(getMblCheck, 'reqVal', '&goWhere=aj&bcKey=getBlCheck&f_air_sea='+frm1.air_sea_clss_cd.value+'&f_biz_clss_cd=M&f_bl_no='+frm1.to_bl_no.value, './GateServlet.gsl');   
						}
		
					break;
					case "CLOSE":
						window.close();
                    break;
				}
			}catch(e){
				showErrMessage(e);
			}	
		}
		
		/**
		 * HBL 중복 여부를 확인함
		 */
		function getMblCheck(reqVal){
			var doc = getAjaxMsgXML(reqVal);
			if(doc[0]=='OK'){
				if(typeof(doc[1])!='undefined'){
					if(doc[1]=='DP'){
						alert('동일한 BL번호가 사용되었습니다! 다시 입력하여 주십시오!');
		
					//}else if(doc[1]=='RV'){
					//  alert('입력이 불가능한 HBL번호 입니다! 다시 입력하여 주십시오!');
		
					}else{
					   if(confirm('Do you want to change B/L Number?')){
						   ajaxSendPost(getBlNoChg, 'reqVal', '&goWhere=aj&bcKey=getBlNoChg&f_air_sea='+frm1.air_sea_clss_cd.value+'&biz_clss_cd=M&bl_no='+frm1.to_bl_no.value+'&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');   
					   }            
					}
				}
			}else{
				//alert(getLabel('SEE_BMD_MSG43'));       
			}
		}

        /**
         * BL번호를 업데이트함
         */
        function getBlNoChg(reqVal){
            var doc = getAjaxMsgXML(reqVal);
            if(doc[0]=='OK'){
                if(typeof(doc[1])!='undefined'&&doc[1]=='OK'){
					alert('B/L Number is change!');
					window.returnValue = frm1.to_bl_no.value;
					window.close();
                }
            }else{
                //alert(getLabel('SEE_BMD_MSG43'));       
            }
        }
	</script>
	<base target="_self"/>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/>
	<html:hidden name="valMap" property="intg_bl_seq"/>
	
	<html:hidden name="valMap" property="biz_clss_cd"/>
	<html:hidden name="valMap" property="bl_no"/>
	<html:hidden name="valMap" property="air_sea_clss_cd"/>
	
	<table width="300" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
					<tr>
						<td width="100%" class="bigtitle">
                           Changing B/L Number
						</td>
					</tr>
			        <tr>
			            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
					<tr>
						<td class="table_search_bg">
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td height="10px"></td>
								</tr>
								<tr>
									<td class="table_search_head">
										<input type="text" name="to_bl_no" value="<bean:write name="valMap" property="bl_no"/>" class="search_form"  style="width:230px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="40">
									</td>
								</tr>
                                <tr>
                                    <td height="10px"></td>
                                </tr>
							</table>
						</td>
					</tr>
                    <tr>
                        <td height="7"></td>
                    </tr>
                    <tr>
                        <td height="10" align="right">
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td style="cursor:hand" onclick="doWork('MODIFY')">
                                        <table height="21" border="0" cellpadding="0" cellspacing="0" >
                                            <tr>
                                                <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Modify"/></td>
                                                <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="3">&nbsp;</td>
                                    <td style="cursor:hand" onclick="doWork('CLOSE')">
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
			</td>
		</tr>
	</table>		
	</form>
</body>
</html>