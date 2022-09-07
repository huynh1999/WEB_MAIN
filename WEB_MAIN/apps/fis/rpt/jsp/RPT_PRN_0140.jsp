<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PN_0140.jsp
*@FileTitle  : Arrival Notice
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0140.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:parameter id="air_sea_tp" name="air_sea_tp" value=""/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	<bean:parameter name="hbl_no" id="hbl_no" value=""/>
	<bean:parameter name="filing_no" id="filing_no" value=""/>
	<bean:parameter name="mbl_no" id="mbl_no" value=""/>
	<bean:parameter name="cgor_pic_info" id="cgor_pic_info" value=""/>
	
	<script type="text/javascript">
		function setupPage()
		{
			loadPage();
		}
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var usrid = "<%= userInfo.getUsrid() %>";
		var usrnm = "<%= userInfo.getUser_name() %>";		
		var airSeaTp = "<%= air_sea_tp %>";

		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
		var prn_login_usr = "<%=(String)application.getAttribute("PRNT_LOGIN_USR")%>";
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<!-- Report Value -->
	<input type="hidden" name="cmd_type" id="cmd_type" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="f_intg_bl_seq" value="<bean:write name="intg_bl_seq"></bean:write>" id="f_intg_bl_seq" />
	<input type="hidden" name="intg_bl_seq" value="<bean:write name="intg_bl_seq"></bean:write>" id="intg_bl_seq" />
	<input	type="hidden" name="mailTitle" id="mailTitle" value='<bean:write name="tmpMap" property="mailTitle"/>'/>
	<input	type="hidden" name="mailTitleTmp" id="mailTitleTmp" value='<bean:write name="tmpMap" property="mailTitle"/>'/>
	<input	type="hidden" name="mailTo" id="mailTo" value='<bean:write name="tmpMap" property="mailTo"/>'/>
	<!--#45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴 -->
	<input type="hidden" name="attachFileName"/>
	<!--  Mail Title을 위한 변수들 -->
	<input type="hidden" name="filing_no" value="<bean:write name="filing_no"></bean:write>"  id="filing_no"/>
	<input type="hidden" name="mbl_no" value="<bean:write name="mbl_no"></bean:write>"  id="mbl_no"/>	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_pdf_file_nm"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	
	<!--#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청 -->
	<input type="hidden" name="rpt_file_name_title"/>
	
	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
	<!-- #6632 [JAPT] Arrival Notice - Additional modification request [ DEPLOY TARGET : ] -->
	<input type="hidden" id="trdp_tel" name="trdp_tel" value=""/>

	<!--  Logo Yn Form -->
	<input	type="hidden" name="logoYn" id="logoYn" value="<bean:write name="tmpMap" property="logoYn"/>"/>		
	<div class="layer_popup_title">
		<!-- page_title_area(S) -->
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><span id="title"><bean:message key="Arrival_Notice"/></span></h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
				 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>		
			<!-- opus_design_btn(E) -->
			</div>
			<!-- page_location(S) -->
			<div class="location">	
				<span id="navigation">
				<%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span>
				</span>
			</div>
			<!-- page_location(E) -->
		</div>
		<!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class= "wrap_search">
	  		<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry entry_pannel ">
				<table>
					<tbody>
						<colgroup>
							<col width="125" />
							<col width="*" />
						</colgroup>
						<tr>
				            <th><bean:message key="HBL_HAWB_No"/></th>
				            <td><input name="f_bl_no" id="f_bl_no" type="text" value="<bean:write name="hbl_no"/>" style="width:180px;" class="search_form" readOnly></td>           
				        </tr>
					</tbody>	
				</table>
			</div>
			<!-- opus_design_inquiry(E) -->
			<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry wFit">
				<table>
					<tbody>
						<colgroup>
							<col width="125" />
							<col width="*" />
						</colgroup>
						<tr>
			                <th><bean:message key="Customer_Ref_No"/></th>
			            	<td><input name="f_cust_ref_no" id="f_cust_ref_no" type="text" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;" maxlength="40" ></td>
			            </tr>
			            <tr>
			                <th><bean:message key="Select_Title"/></th>
			                <td></td>
			            </tr>
			             <tr>
			                <th><input type="radio" name="f_sel_radio" id="f_sel_radio" class="radio_select" onclick="changeSel()" checked></th>
			                <td>
	                            <select name="f_sel_title" id="f_sel_title" style="width:290px;" onchange="changeSel()">
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
				            	</select>
				            </td>
			            </tr>
			            <tr>
			                <th><input type="radio" name="f_sel_radio" id="f_sel_radio" class="radio_select" onclick="changeSel()"></th>
			                <td><input type="text" name="f_txt_title" id="f_txt_title" value="" style="width:290px"  maxlength="100" dataformat="excepthan" class="search_form"></td>
			            </tr>
			            <tr>
			            	<td colspan="2">
			            		<table>
			            			<colgroup>
										<col width="125" />
										<col width="80" />
										<col width="125" />
										<col width="*" />
									</colgroup>
			            			<tr>
			            				<th><bean:message key="Show_Freight"/></th>
						            	<td>
						            		<input name="f_show_frt" id="f_show_frt" type="checkbox" class="radio_select" checked>
						            	</td>
						            	<th><span style="display:<%="A".equals(air_sea_tp)?"inline":"none"%>"><bean:message key="Show_Freight_Term"/></span></th>
						            	<td>
						            		<span style="display:<%="A".equals(air_sea_tp)?"inline":"none"%>">
						            		<input name="f_show_frt_term" id="f_show_frt_term" type="checkbox" class="radio_select" checked>
						            		</span>
						            	</td>
			            			</tr>
			            		</table>
			            	</td>
			            </tr>
			            <tr>
			            	<th><bean:message key="Cargo_Release"/></th>
		                	<td>
		                		<input name="f_cgor_pic_info" type="text" maxlength="200"  onblur="strToUpper(this);" dataformat="excepthan" value="<bean:write name="cgor_pic_info"/>" style="ime-mode:disabled; text-transform:uppercase;ime-mode:disabled;width:290px;text-align:left" >
		                	</td>
		            	</tr>
		            	<!-- #6632 [JAPT] Arrival Notice - Additional modification request [ DEPLOY TARGET : ] -->
		            	<tr id="showDOIssOpt_tr" name="showDOIssOpt_tr" style="display: none;">
							<th>D/O Issue Place</th>
							<td>
								<input type="text" name="trdp_local_name" id ="trdp_local_name" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:258px;" readOnly> 
                               	<button type="button" tabindex="-1" name="partner" id="partner" class="partner input_seach_btn" onClick="doWork('PARTNER_POPLIST',this)"></button> 
							</td>
				          	
				          </tr>
					</tbody>	
				</table>
			</div>
			<!-- opus_design_inquiry(E) -->
		</div>	
	</div>
    <div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
</div>
</form>




