<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0200.js?ver=<%=CLT_JS_VER%>"></script>
	
<%
	String ofcCd = userInfo.getOfc_cd();
	String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String ofcEngNm 	= userInfo.getOfc_eng_nm();
	String usrId		= userInfo.getUsrid();
	String usrPhn		= userInfo.getPhn();
	String usrFax		= userInfo.getFax();
	String email 		= userInfo.getEml();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
%>
	
	<bean:parameter name="ref_no" id="ref_no" value=""/>
	<bean:parameter name="hbl_no" id="hbl_no" value=""/>
	<bean:parameter name="mbl_no" id="mbl_no" value=""/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd" value=""/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd" value=""/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd" value=""/>
	
	<bean:define id="valMap"  	name="EventResponse" property="mapVal"/>
	<bean:define id="profitVO"  name="EventResponse" property="objVal"/>
	<bean:define id="ofcInfo"   name="valMap" property="ofcInfo"/>
	
	<script>	
	<!-- ###Profit Curr 항목### -->
	function setupPage(){
     	loadPage();
     }
	var PROFITCURR = '';
	<logic:notEmpty name="valMap" property="profitCurrList">
	<% boolean isBegin = false; %>
	<bean:define id="paramProfitCurrList"  name="valMap" property="profitCurrList"/>
    <logic:iterate id="CurrVO" name="paramProfitCurrList">
	<% if(isBegin){ %>
    	 PROFITCURR+= '|';
    <% }else{
    	 isBegin = true;
       } %>
    	PROFITCURR+= '<bean:write name="CurrVO" property="curr_cd"/>';
	</logic:iterate>
	</logic:notEmpty>
	
	var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
	// #1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
	var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");
	</script>	
	
	<style> 
		body { border-top-width: 6px!important;}	
			
		td.tbinput_title {padding:0px 0px 0px 3px; height:26px; background-color:#f7f7f7; border:1px solid #e1e1e1; font-weight:bold; font-size:14px; color:#000000; text-align:left; word-wrap:break-word;}
		td.tbinput_th {padding:0px 5px 0px 0px; height:26px; background-color:#f7f7f7; border:1px solid #e1e1e1; font-weight:bold; color:#006a9c; text-align:right; word-wrap:break-word;}
		
		td.tbinput_td {
		padding:0px 0px 0px 5px !important; 
		width:!important;
		background-color:#fff; 
		border:1px solid #e1e1e1; 
		text-align:left;
		white-space: pre-wrap;      /* CSS3 */   
		white-space: -moz-pre-wrap; /* Firefox */    
		white-space: -pre-wrap;     /* Opera <7 */   
		white-space: -o-pre-wrap;   /* Opera 7 */    
		word-wrap: break-word; }
	</style>

<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 100;display: none;" valign="middle" align="center">     
     <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 40%;left: 40%;"></iframe>
</div>
<!--  Complete Image  -->
<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
	<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
</div>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd" id="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type" id="cmd_type"/>
	<input	type="hidden" name="file_name" id="file_name"/>
	<input	type="hidden" name="rd_param" id="rd_param"/>
	<input	type="hidden" name="title" id="title"/>
	
	<input	type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/>
	
	<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828  -->
	<logic:notEmpty name="ofcInfo" property="locl_curr_cd">
		<input  type="hidden" name="h_curr_cd" id="h_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="ofcInfo" property="locl_curr_cd">
		<input type="hidden" name="h_curr_cd" id="h_curr_cd" value="<bean:write name="ofcInfo" property="trf_cur_cd"/>"/>
	</logic:empty>
	
	<!--  #3593 [JTC]Profit Report & Performance Report 수정 사항 -->
	<input  type="hidden" name="locl_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	<input  type="hidden" name="gl_view_falg" value=""/>	
	
	<!-- Report Value -->
	<input	type="hidden" name="intg_bl_seq" id="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input	type="hidden" name="air_sea_clss_cd" id="air_sea_clss_cd" value='<bean:write name="air_sea_clss_cd"/>'/>
	<input	type="hidden" name="bnd_clss_cd" id="bnd_clss_cd" value='<bean:write name="bnd_clss_cd"/>'/>
	<input	type="hidden" name="biz_clss_cd" id="biz_clss_cd" value='<bean:write name="biz_clss_cd"/>'/>
	
	<input	type="hidden" name="one_curr_rate_sql" id="one_curr_rate_sql" value=''/>
	
	<input	type="hidden" name="mbl_no" id="mbl_no" value='<bean:write name="mbl_no"/>'/>
	
	<!-- Report Value -->
	<input	type="hidden" name="f_usrId" id="f_usrId"  value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" id="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" id="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  id="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input	type="hidden" name="mailTitle" id="mailTitle" value=""/>
	<input	type="hidden" name="mailTo" id="mailTo" value=""/>
	<input  type="hidden" name="f_inv_seq" id="f_inv_seq" value=""/>
	<input  type="hidden" name="intg_bl_seq_tmp" id="intg_bl_seq_tmp" />
	<input	type="hidden" name="f_ofc_loc_nm" id="f_ofc_loc_nm" value="<%= ofcLoclNm %>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp"/>
	
	<!--  Report ==> OutLook연동 파라미터 (E) -->	
	<div class="layer_popup_title">
		<!-- 소타이틀, 대버튼 -->
		<div class="page_title_area clear">
			<span id="bl_title_y" style="display:none"><h2 class="page_title"><bean:message key="Shipment_Summary"/></h2></span>
			<span id="bl_title_n" style="display:none"><h2 class="page_title"><bean:message key="Profit_Report_by_HBL"/></h2></span>
			   <!-- btn_div -->
			   <div class="opus_design_btn">
				   <button id="btnPrint" type="button" class="btn_accent" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
				    --><button type="button" class="btn_normal" style="display:inline;" id="btnBlock" btnAuth="BLOCK" onClick="doWork('BLOCK')"><bean:message key="Block"/></button><!--
				    --><button type="button" class="btn_normal" onclick="doWork('Print');"><bean:message key="Print"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('MINIMIZE');" name="btn_minimize" id="btn_minimize"><bean:message key="Minimize"/></button><!-- 
				    --><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
			   </div>
			   <!-- btn_div -->
			    <div class="location">	
				</div>
		</div>
    </div>
    <div class="layer_popup_contents">
	   <div class= "wrap_result">
	   
	   	<!--  B/L Info 영역 -->
			<div id="div_bl_info" class="opus_design_inquiry" style="display:none;">
     			<!-- //#1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청 -->
				<table style="width: 150px"><tr><td ><h3 class="title_design"><bean:message key="Job_Information"/></h3></td></tr></table>
				
				<table>
					<colgroup>
						<col width="140">
						<col width="2">
						<col width="140">
						<col width="10">
						<col width="140">
						<col width="2">
						<col width="140">
						<col width="10">
						<col width="140">
						<col width="2">
						<col width="140">
						<col width="10">
						<col width="140">
						<col width="2">
						<col width="140">
						<col width="*">
					</colgroup>
					<tr>
						<td class="tbinput_th"><bean:message key="Job_No"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_no"/></td> 
            			<td></td>
						<td class="tbinput_th"><bean:message key="Sales_Type"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_sales_type"/></td>             			
            			<td></td>
						<td class="tbinput_th"><bean:message key="Sales_OFC"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_sls_ofc_cd"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Sales_PIC"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_sls_pic"/></td>  
            			<td></td>          			            			 
					</tr>
					<tr height="2px"></tr>
					<tr>
						<td class="tbinput_th"><bean:message key="Customer"/></td>
						<td></td>
            			<td class="tbinput_td" colspan="5"><bean:write name="profitVO" property="job_cust_nm"/></td>
           			
            			<td></td>
						<td class="tbinput_th"><bean:message key="BL_Type"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_bl_type"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Freight_Term"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_frt_term"/></td>  
            			<td></td>          			            			 
					</tr>
					<tr height="2px"></tr>
					<tr>
						<td class="tbinput_th"><bean:message key="Billing_Carrier"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="carr_trdp_nm"/></td>             			
						<td></td>
						<td class="tbinput_th"><bean:message key="Booked_At"/></td>
            			<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_iss_dt"/>  </td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Issued_Office"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_iss_ofc"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Issued_By"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_iss_usrid"/></td>  
            			<td></td>          			            			 
					</tr>
					<tr height="2px"></tr>
					<tr>
						<td class="tbinput_th"><bean:message key="Service_Contract_No"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_lnr_ctrt_no"/></td>             			
						<td></td>
						<td class="tbinput_th"><bean:message key="Ship_Mode"/></td>
            			<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_shp_mod_cd"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Truck_Customs"/></td>
						<td></td>
            			<td style="border: 1px solid #e1e1e1;text-align:center">
            				<input type="checkbox"  value="<bean:write name="profitVO" property="job_trkg_svc_flg"/>" disabled="disabled"  <logic:equal name="profitVO" property="job_trkg_svc_flg" value="Y">checked</logic:equal> />&nbsp;
            				/&nbsp;&nbsp;<input type="checkbox"  value="<bean:write name="profitVO" property="job_cstms_svc_flg"/>"  disabled="disabled" <logic:equal name="profitVO" property="job_cstms_svc_flg" value="Y">checked</logic:equal> />
            			</td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Customs_Type"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_cstms_tp_cd"/></td>  
            			<td></td>          			            			 
					</tr>
					<tr height="2px"></tr>
					<tr>
						<td class="tbinput_th"><bean:message key="Cargo_Type"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="job_cargo_tp"/></td>             			
						<td></td>
						<td class="tbinput_th"><bean:message key="Container_Summary"/></td>
            			<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="carr_cntr_info"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Remark"/></td>
						<td></td>
						<td class="tbinput_td" colspan="5"><bean:write name="profitVO" property="job_rmk"/></td>
            			<td></td>          			            			 
					</tr>
				</table>
				
				<br>
				<table style="width: 150px"><tr><td ><h3 class="title_design"><bean:message key="Shipping_Information"/></h3></td></tr></table>
				
				<table>
					<colgroup>
						<col width="140">
						<col width="2">
						<col width="140">
						<col width="10">
						<col width="140">
						<col width="2">
						<col width="140">
						<col width="10">
						<col width="140">
						<col width="2">
						<col width="140">
						<col width="10">
						<col width="140">
						<col width="2">
						<col width="140">
						<col width="*">
					</colgroup>
					<tr>
						<td class="tbinput_th"><bean:message key="MBL_No"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="mbl_no"/></td> 
            			<td></td>
						<td class="tbinput_th"><bean:message key="Ref_No"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="ref_no"/></td>             			
            			<td></td>
						<td class="tbinput_th"><bean:message key="Carrier"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="lnr_trdp_nm"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Liner_Bkg"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="lnr_bkg_no"/></td>  
            			<td></td>          			            			 
					</tr>
					<tr height="2px"></tr>
					<tr>
						<td class="tbinput_th"><bean:message key="VSL_VOY"/></td>
						<td></td>
            			<td class="tbinput_td" colspan="5"><bean:write name="profitVO" property="trnk_vsl_nm"/>&nbsp;/&nbsp;<bean:write name="profitVO" property="trnk_voy"/></td>
           			
            			<td></td>
						<td class="tbinput_th"><bean:message key="Lane"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="svc_lane_nm"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="On_Board"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="obrd_dt_tm"/></td>  
            			<td></td>          			            			 
					</tr>
					<tr height="2px"></tr>
					<tr>
						<td class="tbinput_th"><bean:message key="POL"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="pol_nm"/></td>             			
						<td></td>
						<td class="tbinput_th"><bean:message key="ETD_of_POL"/></td>
            			<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="etd_dt_tm"/>  </td> 
            			<td></td>
						<td class="tbinput_th"><bean:message key="POR"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="por_nm"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="ETD_Of_POR"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="etd_por_tm"/></td>  
            			<td></td>          			            			 
					</tr>
					<tr height="2px"></tr>
					<tr>
						<td class="tbinput_th"><bean:message key="POD"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="pod_nm"/></td>             			
						<td></td>
						<td class="tbinput_th"><bean:message key="ETA_of_POD"/></td>
            			<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="eta_dt_tm"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="DEL"/></td>
						<td></td>
						<td class="tbinput_td"><bean:write name="profitVO" property="del_nm"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="ETA_of_DEL"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="d_eta_dt_tm"/></td>  
            			<td></td>          			            			 
					</tr>
					<tr height="2px"></tr>
					<tr>
						<td class="tbinput_th"><bean:message key="Port_Cut_Off_Date"/></td>
						<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="cut_off_dt"/></td>             			
						<td></td>
						<td class="tbinput_th"><bean:message key="VGM_Cut_Off_Date"/></td>
            			<td></td>
            			<td class="tbinput_td"><bean:write name="profitVO" property="vgm_cut_off_dt"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="OBL_Type"/></td>
						<td></td>
						<td class="tbinput_td"><bean:write name="profitVO" property="obl_tp_nm"/></td>
            			<td></td>
						<td class="tbinput_th"><bean:message key="Freight_Term"/></td>
						<td></td>
						<td class="tbinput_td"><bean:write name="profitVO" property="frt_term_nm"/></td>
            			<td></td>          			            			 
					</tr>
				</table>				
				
				<table><tr height="10px"></tr></table>
			    
			    <div id="div_cntr_list" style="display: none">			    	
				    <table style="width: 150px"><tr><td ><h3 class="title_design"><bean:message key="Container_Information"/></h3></td></tr></table>			    
				    <div class="opus_design_grid" id="mainTable" style="width:1200px;">
						<script language="javascript">comSheetObject('sheet4');</script>
					</div>					
				</div>
				
				<!-- #1906 [PATENT] SHIPMENT DETAIL 화면 수정 요청 -->
			    <div id="div_pay_list" style="display: none">
			    	<table><tr height="10px"></tr></table>
				    <table style="width: 150px"><tr><td ><h3 class="title_design"><bean:message key="Payment_Verification"/></h3></td></tr></table>
				    <div class="opus_design_grid" id="mainTable">
						<script ss="javascript">comSheetObject('sheet5');</script>
					</div>					
				</div>	
				<table><tr height="10px"></tr></table>	
			    
			</div>	
			
			<div class="opus_design_inquiry" style="width: 1080px;">
		   		<table style="width: 150px"><tr><td ><h3 class="title_design"><bean:message key="Profit_Information"/></h3></td></tr></table>
		   		<table><tr height="5px"></tr></table>
		   		<div id="div_ref_info" style="display: none">
		   			<table>
						<colgroup>
							<col width="20">
							<col width="*">
						</colgroup>
						<tr>
							<td></td>
							<td>
								<table>
									<colgroup>
										<col width="90">
										<col width="190">
										<col width="90">
										<col width="*">
									</colgroup>
							        <tr>
						   				<th style="text-align: left"><bean:message key="Ref_No"/></th>
						   				<td><input name="f_ref_no" type="text" class="search_form-disable" value="<bean:write name="ref_no"/>" class="search_form" readOnly></td>
						   				<th style="text-align: left">
						   					<span id = "hbl" style="display:none"><bean:message key="HBL_No"/></span>
											<span id = "hawb" style="display:none"><bean:message key="HAWB_No"/></span>
						   				</th>
						   				<td>
				            				<input name="f_bl_no" type="text" class="search_form-disable" value="<bean:write name="hbl_no"/>" style="width:130px;" class="search_form" readOnly></td>
				            			 </tr>
							    </table>
							</td>
						</tr>
					</table>
		   		</div>
		   	</div>
<div id="mainForm" class="opus_design_inquiry">
	   			<div class="layout_wrap">
		   			<div class="layout_vertical_2" style="width:450px;">
			            <table><tr height="10px"></tr></table>
			            <table>
			            	<colgroup>
								<col width="*">
							</colgroup>
			           		<tr> 
				                <th style="text-align:left;height: 20px;" colspan="2"><bean:message key="Currency"/></th>
					        </tr>  
					        <tr>     
				                <td><input type="radio" name="f_curr_opt" id="f_curr_multi" value="M" checked/><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label></td>
				                <td></td>
				            </tr>   
				           <tr> 
				               <td width="90px"><input type="radio" name="f_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.f_curr_cd.value != ''){doWork('CURR_SEARCH');}"/><label for="f_curr_one"><bean:message key="One_Currency_to"/></label>				          	   
				          	   	   <bean:define id="paramCurrList"  name="valMap" property="currList"/>
						            <select name="f_curr_cd" OnChange="doWork('CURR_SEARCH');">
										<logic:iterate id="CurrVO" name="paramCurrList">
	                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
	                            		</logic:iterate>
	                            	</select></td>
				          		<td>
				          			<bean:message key="Base_on"/>&nbsp;
				          			<bean:define id="Exange_Rate_Type" name="valMap" property="Exange_Rate_Type"/>
									<select id="ex_rate_type" name="ex_rate_type" OnChange="doWork('CURR_SEARCH');">								
										<logic:iterate id="comVO" name="Exange_Rate_Type">
											<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
										</logic:iterate>
									</select> 
				          	   </td>		               
				            </tr> 
			            </table>		   				
					</div>
					<div class="layout_vertical_2">			   			
			   			<div class="opus_design_grid" id="mainTable" style="width: 320px;">
							<script language="javascript">comSheetObject('sheet1');</script>
						</div>
					</div>
					<table><tr height="5px"></tr></table>
				</div>
	   		</div>
	   	</div>
	   	<div class="wrap_result" >
		   	<table>
	 			<colgroup>
					<col width="20">
					<col width="1100">
					<col width="*">
				</colgroup>
				<tr height="330px" style="vertical-align: top">
					<td></td>
					<td colspan="2">
						<div class="opus_design_grid" id="mainTable2" style="width:1075px;">
							<script language="javascript">comSheetObject('sheet2');</script>
						</div>
					</td>
				</tr>
				<tr>
					<td></td>
					<td style="text-align: left">
						<div class="layout_vertical" style="width:100% !important; text-align:right;display:none;" id="blockDiv_D" >
				   			<select name="f_block" id="f_block_d" OnChange="doWork('BLOCK_SEARCH_D',this.value);">
				   			</select>
				   			<b><bean:message key="Blocked_By"/></b>
				   			<input name="f_block_name_d" type="text" class="search_form-disable" value="" style="width:120px;" readOnly>
				   			<b><bean:message key="at"/></b> 
							<input name="f_block_tms_d" type="text" class="search_form-disable" value="" style="width:80px;" readOnly>
					   	</div>
					</td>
					<td></td>
				</tr>
			</table>
	   	</div>
	</div>
</form>


<form name="frm2" method="POST" action="">

	<input type="hidden" name="inv_seq" value=""/>
	<input type="hidden" name="inv_no" value=""/>
	<input type="hidden" name="search_opt" value=""/>
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="s_block_satus" value=""/>
    <div class="opus_design_grid" id="" style="display:none">
		<script language="javascript">comSheetObject('sheet3');</script>
	</div>
</form>