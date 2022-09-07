<%--
=========================================================
*@FileName   : RPT_PRN_0210.jsp
*@FileTitle  : CMM
*@Description: package search pop
*@author     : 
*@version    : 
*@since      : 

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/17
*@since      : 2014/07/17
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_FAX_0020.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
	setGrid();
}
//-->
</script>	
<form name="frm1" method="POST" action="./" enctype="multipart/form-data">
	<input	type="hidden" name="f_cmd" id="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type" id="cmd_type"/>
	<input	type="hidden" name="stamp" id="stamp"/>
	<input	type="hidden" name="all" id="all"/>
	
	<!-- Fax 전송 관련 --> 
	<input type="hidden" name="m_id" id="m_id" value="">
	<input type="hidden" name="m_pw" id="m_pw" value="">
	<input type="hidden" name="m_corpfrcode" id="m_corpfrcode" value="">
	<input type="hidden" name="m_fax" id="m_fax" value="">
	<input type="hidden" name="faxNumbersFile" id="faxNumbersFile" value="">
	<input type="hidden" name="etc1" id="etc1" value="<%= CLT_PATH %>">
	
	<input	type="hidden" name="f_intg_bl_seq" value=""/>
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Fax"/></span></h2>
			<div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" onclick="doWork('FAX_TO_POPLIST')" ><bean:message key="Add"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('MANUAL_ADD')"><bean:message key="Manual_Add"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('SEND')"><bean:message key="Send"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_grid" id="mainTable">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>
