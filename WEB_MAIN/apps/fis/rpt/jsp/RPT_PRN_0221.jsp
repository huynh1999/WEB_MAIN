<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0221.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>	
	<script language="javascript">
		//memo 를 핸들링 하는 부분
		function chkText(){
			/*
			if(document.frm1.bl_type[0].checked) {
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

		var usrid = "<%=userInfo.getUsrid()%>";
		var ofc_cnt_cd1 = "<%=userInfo.getOfc_cnt_cd()%>";
		var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
    <bean:define id="objVO"   name="EventResponse" property="objVal"/>
	<%
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String email = userInfo.getEml();
		
		/* #20887 : [GPL] Export Print Major Forms 변경 - bkg confirmation 헤더정보 jsjang 2013.9.17 */
		String phone = userInfo.getPhn();
		String fax = userInfo.getFax();
		String ofc_cd = userInfo.getOfc_cd();
	%>    
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" class="td" onload="loadPage();">
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<input	type="hidden" name="intg_bl_seq" value="<bean:write name="objVO" property="intg_bl_seq"/>"/>

	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="title" value="Booking Confirmation"/>
	<input	type="hidden" name="stamp"/>
	<input	type="hidden" name="all"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="rd_param"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	
	<!-- #20887 : [GPL] Export Print Major Forms 변경 - bkg confirmation 헤더정보 jsjang 2013.9.17 -->
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_phone" value="<%= phone %>"/>
	<input	type="hidden" name="f_fax" value="<%= fax %>"/>	
	
	<input	type="hidden" name="act_shpr_trdp_cd" value=""/>
	<input	type="hidden" name="act_shpr_trdp_nm" value=""/>
	<input	type="hidden" name="act_shp_info" value=""/>

		<!-- 소타이틀, 대버튼 -->
    <table width="430" border="0" cellspacing="0" cellpadding="0">
    	<!-------------------- title begin -------------------->
		<tr>
			<td width="100%" class="bigtitle" align="left"><bean:message key="Booking_Confirmation"/></td>
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
    <!-- 검색 -->
    <table width="430" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg"><!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="100%" align="left" valign="top">
        
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td class="table_search_head_top" rowspan=2 width="90" align="center" ><bean:message key="Cargo_Pick_Up"/></td>
                                    <td class="table_search_body"  >
                                         <input type="text" name="shpr_trdp_cd" value='<bean:write name="objVO" property="b_shpr_trdp_cd"/>' readonly class="search_form" onKeyDown="codeNameAction('trdpCode_shipper', this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_shipper', this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;width:100;">
										 <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper"   onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
                                         <input type="text"   name="shpr_trdp_nm" maxlength="50" value='<bean:write name="objVO" property="b_shpr_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:165px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}">
                                    </td>
                                </tr>

                                <tr>
                                    <td class="table_search_body">

                                        <textarea name="shpr_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:300;height:110px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="objVO" property="b_shpr_trdp_addr" filter="false"/></textarea>
                                    </td>
                                </tr>
                          	</table>
<!--                          	
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td width="90" class="table_search_head_top" align="center" ><bean:message key="Remark"/></td>
                                    <td class="table_search_body">
                                        <textarea name="i_ooh_bkg_rmk" class="search_form" style="width:300;height:110px" maxlength="1000"><bean:write name="objVO" property="i_ooh_bkg_rmk" filter="false"/></textarea>
                                    </td>
                                </tr>
                          	</table>                          	
-->
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
            </td>
        </tr>
    </table>
</form>
</body>
</html>



