<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0150.jsp
*@FileTitle  : Master_Arrival_Notice
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/19
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>

<%
	String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
	String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
%>	
    
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/menu/script/MenuMngSub_popup.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>

	<script type="text/javascript">
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var ofcLoclNm = "<%= userInfo.getOfc_locl_nm() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var usrid = "<%= userInfo.getUsrid() %>";
		var usrnm = "<%= userInfo.getUser_name() %>";
		var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
		var prn_login_usr = "<%=(String)application.getAttribute("PRNT_LOGIN_USR")%>";
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
   	 	function setupPage(){
	    	loadPage();
	    }
	</script>
	<!-- 2016.12.14 추가  시작
	<bean:parameter id="mnu_seq" name="mnu_seq" value=""/>
	<bean:parameter id="prnt_mnu_seq" name="prnt_mnu_seq" value=""/>
	<bean:parameter id="cur_mnu_seq" name="cur_mnu_seq" value=""/>
	-->
	<!-- 2016.12.14 추가  끝-->
	<bean:parameter name="ref_no" id="ref_no" value=""/>
	<bean:parameter name="mbl_no" id="mbl_no" value=""/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	<bean:parameter name="cgor_pic_info" id="cgor_pic_info" value=""/>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="f_file_name"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="mailTo"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="mailTitle"/>
	<!-- #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴 -->
	<input	type="hidden" name="attachFileName"/>
	<input	type="hidden" name="stamp"/>
	<input	type="hidden" name="all"/>
	<input	type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input  type="hidden" name="h_usrEmlCon" value="<%= userInfo.getEml_con() %>" />
	
	<input	type="hidden" name="f_intg_bl_seq"  value='<bean:write name="intg_bl_seq"/>'/>
	<input	type="hidden" name="f_rpt_biz_tp"  value=''/>
	<input type="hidden" name="h_intg_bl_seq" value=""/>
	<input type="hidden" name="f_air_sea_tp" value=""/>

	<!-- 2016.12.14 추가 시작 -->
	<input type="hidden" name="f_mnu_seq" value='<bean:write name="mnu_seq"/>'/>
	<input type="hidden" name="f_prnt_mnu_seq" value='<bean:write name="prnt_mnu_seq"/>'/>
	<input type="hidden" name="f_cur_mnu_seq" value='<bean:write name="cur_mnu_seq"/>'/>	
	
	<!-- 2016.12.14 추가 끝  -->
		<!--#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청 -->
	<input type="hidden" name="rpt_file_name_title"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_pdf_file_nm"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title"><bean:message key="TOP_Menu_List"/></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			  <button type="button" class="btn_accent" onclick="doWork('SAVE')"><bean:message key="Save"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
		
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_inquiry">

			  <h3 class="title_design"><bean:message key="Select_List"/></h3>
			  <div class="opus_design_grid" style="height:200px">
				<script language="javascript">comSheetObject('sheet1');</script>
			  </div>
		    </div>
	    </div>
	</div>
</form>
