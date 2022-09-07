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
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

<%
	String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
	String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
%>	
    
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0150.js?ver=<%=CLT_JS_VER%>"></script>
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
	<bean:parameter name="mbl_no" id="mbl_no" value=""/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	<bean:parameter name="cgor_pic_info" id="cgor_pic_info" value=""/>
<style> body { border-top-width: 6px!important; } </style>
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
	
	<input	type="hidden" name="f_air_sea_tp" value='<bean:write name="air_sea_tp"/>'/>
	<input	type="hidden" name="f_intg_bl_seq"  value='<bean:write name="intg_bl_seq"/>'/>
	<input	type="hidden" name="f_rpt_biz_tp"  value=''/>
	<input type="hidden" name="h_intg_bl_seq" value=""/>
	
		<!--#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청 -->
	<input type="hidden" name="rpt_file_name_title"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_pdf_file_nm"/>

	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title"><bean:message key="Master_Arrival_Notice"/></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
		   		<% 
					if("Y".equals(autoFaxFlag)){
				%>
					 <button type="button" class="btn_accent" onclick="doWork('FAX')"><bean:message key="Fax"/></button><!-- 
				--><%
					}
					if("Y".equals(autoEmailFlag)){
				%><!-- 
				 --><button type="button" class="btn_normal" onclick="doWork('EMAIL')"><bean:message key="Email"/></button><!-- 
				 --><%
					}
				%><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('Print')"><bean:message key="Print"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
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
			            <th width="100px"><bean:message key="MBL_MAWB_No"/></th>
			            <td><input name="f_bl_no" type="text" value="<bean:write name="mbl_no"/>" style="width:130px;" class="search_form" readOnly></td>           
			        </tr>
			    </table>
		   	</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<table>
	            	<tr>
		                <th width="60px"><bean:message key="Select_Title"/></th>
		                <td width="20px"><input type="radio" name="f_sel_radio" class="radio_select" onclick="changeSel()" checked></td>
		                <td colspan="5"> 
		                 <select id="f_sel_title" style="width:250px;" onchange="changeSel()"> 
		                 	<option value="ARRIVAL CONFIRMATION NOTICE">ARRIVAL CONFIRMATION NOTICE</option> 
		                 	<option value="ARRIVAL NOTICE">ARRIVAL NOTICE</option> 
		                 	<option value="ARRIVAL NOTICE / FREIGHT INVOICE" selected>ARRIVAL NOTICE / FREIGHT INVOICE</option> 
		                 	<option value="EXAM HOLD RELEASE NOTICE">EXAM HOLD RELEASE NOTICE</option> 
		                 	<option value="FINAL ARRIVAL NOTICE">FINAL ARRIVAL NOTICE</option> <!-- #20419 ARRIVAL NOTICE TITLE ADD JSJANG 2013.9.26 --> 
		                 	<option value="FINAL CARGO LOCATION">FINAL CARGO LOCATION</option> 
		                 	<option value="GENERAL ORDER NOTICE">GENERAL ORDER NOTICE</option> 
		                 	<option value="I.T. NO. & DATE ADDED">I.T. NO. & DATE ADDED</option> 
		                 	<option value="I.T. NOTIFICATION">I.T. NOTIFICATION</option> 
		                 	<option value="I.T. NOTIFICATION / FREIGHT INVOICE">I.T. NOTIFICATION / FREIGHT INVOICE</option> 
		                 	<option value="PRE-ALERTS NOTICE">PRE-ALERTS NOTICE</option> 
		                 	<option value="PRE-ARRIVAL NOTICE">PRE-ARRIVAL NOTICE</option> 
		                 	<option value="REVISED ARRIVAL NOTICE">REVISED ARRIVAL NOTICE</option> 
		                 	<option value="REVISED ARRIVAL NOTICE / FREIGHT INVOICE">REVISED ARRIVAL NOTICE / FREIGHT INVOICE</option> 
		                 	<option value="SHIPPING ADVICE">SHIPPING ADVICE</option> 
		                 	<option value="X-RAY EXAM HOLD NOTICE">X-RAY EXAM HOLD NOTICE</option> 
		                 </select></td>
		            </tr>
	            	<tr>
		                <td></td>
		                <td><input type="radio" name="f_sel_radio" class="radio_select" onclick="changeSel()"></td>
		                <td width="250px;"><input type="text" name="f_txt_title" value="" style="width:250px" maxlength="100" dataformat="excepthan" class="search_form"></td>
	                    <th width="100px"><bean:message key="Show_Freight"/></th>
		                <td width="80px;"><input name="f_show_frt" type="checkbox" class="radio_select" checked></td>
		                <th width="120px;"><span style="display:<%="A".equals(air_sea_tp)?"inline":"none"%>"><bean:message key="Show_Freight_Term"/></span></th>
		            	<td>
		            		<span style="display:<%="A".equals(air_sea_tp)?"inline":"none"%>">
		            		<input name="f_show_frt_term" id="f_show_frt_term" type="checkbox" class="radio_select" checked>
		            		</span>
		            	</td>
		            </tr>
	            </table>
			</div>
			<h3 class="title_design"><bean:message key="Select_List"/></h3>
			<div class="opus_design_grid" style="height:290px">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
			<div class="opus_design_inquiry">
				<h3><bean:message key="Public_Memo"/></h3>
				<table>
	                <tr>
	                	<td nowrap class="table_search_body"><textarea name="f_rmk" dataformat="excepthan" style="width:520px;height:50px;" class="search_form"  onblur="strToUpper(this)" ></textarea></td>
	                </tr>
	           </table>
	           <h3><bean:message key="Cargo_Release"/></h3>
	           <table>
	           		<tr>
		                <td><input name="f_cgor_pic_info" type="text" maxlength="200"  onblur="strToUpper(this);" dataformat="excepthan" value="<bean:write name="cgor_pic_info"/>" style="ime-mode:disabled; text-transform:uppercase;ime-mode:disabled;width:520px;text-align:left" ></td>
		            </tr>
	           </table>
			</div>
		</div>
	</div>
    <div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
</div>
</form>




