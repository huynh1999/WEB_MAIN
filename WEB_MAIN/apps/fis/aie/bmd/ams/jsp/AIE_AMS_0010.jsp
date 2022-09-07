<%--
=========================================================
*@FileName   : AIE_AMS_0010.jsp
*@FileTitle  : AIR AMS Search 
*@Description: AIR AMS Search 
*@author     : Chungrue
*@version    : 
*@since      : 

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0
*@since      : 2014/07/25 
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/aie/bmd/ams/script/AIE_AMS_0010.js?ver=<%=CLT_JS_VER%>"></script>

</head>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm 	= userInfo.getOfc_eng_nm();
		String usrNm 		= userInfo.getUser_name();
		String phn 			= userInfo.getPhn();
		String fax 			= userInfo.getFax();
		String email 		= userInfo.getEml();
	%>

<script type="text/javascript">
<!--
function setupPage() {
	initFinish();loadPage();
}
//-->
</script>
<form name="frm1" method="POST" action="./AIE_AMS_0010.clt">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_CurPage"> 
    
	<!-- ------------------------------------------------------ -->
	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_phn" value="<%= phn %>"/>
	<input	type="hidden" name="f_fax" value="<%= fax %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- ------------------------------------------------------ -->
    
    <!-- Report Value -->
	<input type="hidden" name="title" value="">
	<input type="hidden" name="file_name" value="">
	<input type="hidden" name="rd_param" value="">
	
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<input type="hidden" name="intg_bl_seq" value="">
	<input type="hidden" name="rlt_intg_bl_seq" value="">
	<input type="hidden" name="s_intg_bl_seq" value="">
	<input type="hidden" name="master_bl_no"  value=""> 
	<input type="hidden" name="house_bl_no"   value=""> 
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="AIE_AMS_0010.clt"/>
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- Search option -->
<div class="over_wrap" height="100%">
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
                <tr>
                    <th width="70"><bean:message key="Departure"/></th>
                    <td width="250"><!--
                    --><input type="text" name="dept_strdt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10"><!--
                    -->~ <!--
                    --><input type="text" name="dept_enddt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10"><!--
                    --><button type="button" id="dept_dt_cal" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button>
					</td>
                    <th width="85"><bean:message key="MBL_No"/>.</th>
                    <td width="250">
                       <input type="text" name="f_hbl_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:168px;"/>
                    </td>
                    <th width="85"><bean:message key="Transmit"/></th>
                    <td width="250"><!--
                    --><select name="f_snd_type" style="width:120"><!--
                    --><option value="">ALL</option><!--
                    --><option value="Y">YES</option><!--
                    --><option value="N">NO</option><!--
                    --></select>
                       </td>
                </tr>
            </table>
		</div>
	</div>
	<div class="wrap_result">
    	<div class="opus_design_grid">
	    	<h3 class="title_design"><bean:message key="AMS_Send_List"/></h3>
	    	<script language="javascript">comSheetObject('sheet1');</script>
	    </div>
	</div>
</div>
</form>

<%@page import="java.net.URLEncoder"%></html>

