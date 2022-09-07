<%--
=========================================================
*@FileName   : RPT_RD_0030.jsp
*@FileTitle  : RPT
*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 10/06/2014
*@since      : 10/06/2014
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->

	<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>
   	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_RD_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:parameter id="fileName" name="file_name"/>
	<bean:parameter id="rdParam" name="rd_param"/>
	<bean:parameter id="title" name="title"/>
	
	<bean:parameter id="mailTitle" name="mailTitle" value=""/>
	<bean:parameter id="mailTo" name="mailTo" value=""/>
	<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value=""/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<bean:parameter id="rpt_biz_tp" name="rpt_biz_tp" value=""/>
	<bean:parameter id="rpt_biz_sub_tp" name="rpt_biz_sub_tp" value=""/>
	<bean:parameter id="rpt_tp" name="rpt_tp" value=""/>
	<bean:parameter id="rpt_trdp_cd" name="rpt_trdp_cd" value=""/>
	
	<bean:parameter id="f_inv_seq" name="f_inv_seq" value=""/>
	<bean:parameter id="rpt_intg_bl_seq" name="rpt_intg_bl_seq" value=""/>		
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<script language="javascript">
	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	var user_id = "<%=userInfo.getUsrid()%>";
	var user_eml = "<%=userInfo.getEml()%>";
	var user_phn = "<%=userInfo.getPhn()%>";
	var user_fax = "<%=userInfo.getFax()%>";
	var rpt_file_path = "<%=userInfo.getRpt_file_path().replaceAll("\\\\","\\\\\\\\")%>";
	</script>
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<script language="javascript" for="wo_rePort" event="PrintFinished()">
		registRptPrintHistory();
	</script>	
<script>
function setupPage(){
	loadPage();
}
</script>	

<form method="post" name="frm1" action="RPT_FAX_0010.clt" onSubmit="return false;">
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="fileName" value="<bean:write name="fileName"/>"/>
	<input type="hidden" name="rdParam" value="<bean:write name="rdParam"/>"/>
	<input type="hidden" name="f_title" value="<bean:write name="title"/>"/>

	<input type="hidden" name="mailTitle" value='<bean:write name="mailTitle"/>'/>
	<input type="hidden" name="mailTo" value='<bean:write name="mailTo"/>'/>
	<input type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
		
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" value='<bean:write name="rpt_biz_tp"/>'/>
	<input type="hidden" name="rpt_biz_sub_tp" value='<bean:write name="rpt_biz_sub_tp"/>'/>
	<input type="hidden" name="rpt_tp" value='<bean:write name="rpt_tp"/>'/>
	<input type="hidden" name="rpt_trdp_cd" value='<bean:write name="rpt_trdp_cd"/>'/>
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<input type="hidden" name="f_inv_seq" value='<bean:write name="f_inv_seq"/>'/>
	<input type="hidden" name="rpt_intg_bl_seq" value='<bean:write name="rpt_intg_bl_seq"/>'/>	
	<input type="hidden" name="usr_fax_no" value="<%=userInfo.getFax()%>"/>
	<input type="hidden" name="fax_no" value=''/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:write name="title"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('Fax')"><bean:message key="Fax"/></button><!--
			   --><button type="button" class="btn_normal" onclick="doWork('Mail')"><bean:message key="Email"/></button><!--
			   --><button type="button" class="btn_normal" onclick="doWork('Print')"><bean:message key="Print"/></button><!--
			   --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="layout_wrap" >
	     	<div id="mainTable" >
	     		<script language="javascript">comRdObject('wo_rePort');</script>
		   </div>
		</div>
	</div>
     <iframe name="ifr_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
</form>
</html>