<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0230.jsp
*@FileTitle  : Preliminary_Claim
*@author     : CLT
*@version    : 1.0
*@since      : 2015/07/10
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

<%
	String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
	String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
%>	
    
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0230.js?ver=<%=CLT_JS_VER%>"></script> 
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>

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
	<bean:parameter id="air_sea_tp" name="air_sea_tp" value=""/>
	<bean:parameter name="ref_no" id="ref_no" value=""/>
	<bean:parameter name="hbl_no" id="hbl_no" value=""/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	<bean:parameter name="cgor_pic_info" id="cgor_pic_info" value=""/>
	<bean:parameter name="cstm_trdp_nm" id="cstm_trdp_nm" value=""/>
	<bean:parameter name="cstm_trdp_addr" id="cstm_trdp_addr" value=""/>
	<bean:parameter name="rgst_ofc_cd" id="rgst_ofc_cd" value=""/>
	
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="intg_bl_seq" value="<bean:write name="intg_bl_seq"/>" />
	<input type="hidden" name="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" /> 
	<input type="hidden" name="air_sea_tp" value="<bean:write name="air_sea_tp"/>" />
	
	<input type="hidden" name="cstm_trdp_nm" value="<bean:write name="param" property="cstm_trdp_nm" />" />
	<input type="hidden" name="cstm_trdp_addr" value="<bean:write name="param" property="cstm_trdp_addr" />" />
	
	<!-- Report Value -->
	<input type="hidden" name="title"/>
	<input type="hidden" name="cmd_type"/>
	<input type="hidden" name="f_file_name"/>
	<input type="hidden" name="file_name"/>
	<input type="hidden" name="rd_param"/>
	<input type="hidden" name="mailTo"/>

	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>

	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="Preliminary_Claim"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" onclick="doWork('Print');"><bean:message key="Print"/></button><!-- 
			--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
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
		                <th width="60px"><bean:message key="Operator"/></th>
		                <td colspan="3">
		                	<input type="text" name="f_ofc_cd" style="width:300px" class="search_form" value="<bean:write name="param" property="rgst_ofc_cd" />" />
		                </td>	 
		            </tr>
	            	<tr>
	                	<th width="60px"><bean:message key="To"/></th>
	                	<td colspan="3">
	                		<input type="radio" name="f_to_radio" class="radio_select" value="<bean:message key="Customer"/>" checked /> <bean:message key="Customer"/>
	                		<input type="radio" name="f_to_radio" class="radio_select" style="margin-left:30px !important;" value="<bean:message key="Vendor"/>" /> <bean:message key="Vendor"/> 
		                </td>
		            </tr>
		            <tr>
	                	<th style="width:60px;"><bean:message key="Notice_To"/></th>
	                	<td nowrap class="table_search_body">
	                		<input name="f_nm" dataformat="excepthan" style="width:520px;height:30px;" class="search_form" value="<bean:write name="param" property="cstm_trdp_nm" />" />
	                	</td>
		            </tr>
		            <tr>
	                	<th></th>
	                	<td nowrap class="table_search_body">
	                		<textarea name="f_addr" dataformat="excepthan" style="width:520px;height:150px;" class="search_form" ><bean:write name="param" property="cstm_trdp_addr" /></textarea>
	                	</td>
		            </tr>
		            <tr>
	                	<th colspan="2" style="text-align:left !important;">Shortage/Damage</th>
		            </tr>
		            <tr>
	                	<td nowrap class="table_search_body" colspan="2">
	                		<textarea name="f_rmk" dataformat="excepthan" style="width:582px;height:150px;" class="search_form" value="" ></textarea>
	                	</td>
		            </tr>
	            </table>
			</div>
		</div>
	</div>
    <div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
</div>
</form>
