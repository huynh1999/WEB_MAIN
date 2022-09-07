<%--
=========================================================
*@FileName   : MDM_MCM_0030.jsp
*@FileTitle  : Sub Continent Code
*@Description: Sub Continent Code
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/09/2009
*@since      : 01/09/2009

*@Change history:
*@author     : tuan.Chau
*@version    : 2.0 - 2014/08/12
*@since      : 2014/08/12
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0170.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:parameter name="air_sea_tp" id="air_sea_tp" />
	<bean:parameter name="hbl_no" id="hbl_no"/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq"/>
	<bean:parameter name="f_ofc_cd" id="f_ofc_cd"/>
		
	<script type="text/javascript">
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		
		function setupPage(){
		}
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="f_intg_bl_seq" value="<bean:write name="intg_bl_seq"/>"/>
	<input	type="hidden" name="air_sea_tp" value="<bean:write name="air_sea_tp"/>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<div class="layer_popup_title">
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="ITNTE"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint"><bean:message key="Print"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
				<table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <th width="110"><bean:message key="HBL_HAWB_No"/></td>
			            <td>
			            	<input name="f_bl_no" type="text" value="<bean:write name="hbl_no"/>" class="search_form" readOnly></td>           
			        </tr>
			    </table>
			</div>
		</div>
	</div>
</div>
</form>




