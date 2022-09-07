<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0270.jsp
*@FileTitle  : DISCLAIMER / GUARANTEE OF CHARGES
*@author     : CLT
*@version    : 1.0
*@since      : 2017/07/20
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<%
	String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
	String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
%>	
    
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0270.js?ver=<%=CLT_JS_VER%>"></script> 
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
	    }
   	 	
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="cntr" name="valMap" property="cntr"/>
        <bean:define id="ofcVO" name="officeInfo"/>
	</script>
	<bean:parameter name="ref_no" id="ref_no" value=""/>
	<bean:parameter name="hbl_no" id="hbl_no" value=""/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="intg_bl_seq" value="<bean:write name="intg_bl_seq"/>" />
	
	<!-- Report Value -->
	<input type="hidden" name="title"/>
	<input type="hidden" name="cmd_type"/>
	<input type="hidden" name="f_file_name"/>
	<input type="hidden" name="file_name"/>
	<input type="hidden" name="rd_param"/>
	<input type="hidden" name="mailTo"/>
	
	<input type="hidden" name="cntr" value="<bean:write name="cntr"/>"/>

	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="DISCLAIMER_GUARANTEE_OF_CHARGES"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn"><!--
			--><button type="button" class="btn_normal" onclick="doWork('Print');"><bean:message key="Print"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
		   		<table>
			        <tr>
			            <th width="70px"><bean:message key="Ref_No"/></th>
			            <td width="130px"><input name="f_ref_no" type="text" style="width:130px;" value="<bean:write name="ref_no"/>" class="search_form" readOnly></td>
			            <th width="100px"><bean:message key="HBL_No"/></th>
			            <td><input name="f_bl_no" type="text" value="<bean:write name="hbl_no"/>" style="width:130px;" class="search_form" readOnly></td>           
			        </tr>
			    </table>
		   	</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<table>
		            <tr>
	                	<th colspan="2" style="text-align:left !important;"><bean:message key="Disclaimer_Remark"/></th>
		            </tr>
		            <tr>
	                	<td nowrap class="table_search_body" colspan="2">
	                		<textarea name="dsclm_rmk" dataformat="excepthan" style="text-transform:none;width:682px;height:290px;" class="search_form"><bean:write name="ofcVO" property="dsclm_rmk"/></textarea>
	                	</td>
		            </tr>
	            </table>
			</div>
		</div>
	</div>
</div>
</form>




