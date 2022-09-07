<%--
=========================================================
*@FileName   : PFM_MGT_0030.jsp
*@FileTitle  : Profit Report
*@Description: Profit Report
*@author     : HaeKyoung, Lee - Cyberlogitec
*@version    : 1.0 - 2012/01/10
*@since      : 2012/01/10

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<%
	//WMS ACCOUNT LKH 2015.01.20
	String wmsUseFlag = (String)application.getAttribute("WMS_USE_FLAG");
	if(wmsUseFlag == null){wmsUseFlag = "N";} 
%>			
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- #2396 [BINEX] Volume and Profit Report: +-를 기능 점검 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0160.js?ver=<%=CLT_JS_VER%>" ></script>
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="ofcCurr"  name="valMap" property="ofcInfo"/>		
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		
		String dept_cd		= userInfo.getDept_cd();
		//Batch Performance LKH 2015.01.28
		String usrId		= userInfo.getUsrid();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	<script>
		function setSelect(){
			var formObj = document.frm1;
		}

		var usrNm = "<%= usrNm %>";
		function setupPage()
        {
			loadPage();
			setSelect();
        }
		// #1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
		var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");
	</script>
<form name="frm1" method="POST" action="./PFM_MGT_0160.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<!-- Batch Performance LKH 2015.01.28 --> 
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email" value="<%= email %>"/>
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_locl_nm" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input type="hidden" name="f_dept_cd" value="<%= dept_cd %>"/>
	
	<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828-->
	<logic:notEmpty name="ofcCurr" property="locl_curr_cd">
		<input type="hidden" name="f_curr_cd" value="<bean:write name="ofcCurr" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="ofcCurr" property="locl_curr_cd">
		<input type="hidden" name="f_curr_cd" value="<bean:write name="ofcCurr" property="trf_cur_cd"/>"/>
	</logic:empty>
	
	<input type="hidden" name="f_sys_ofc_cd" value="<bean:write name="valMap" property="sysOfcCd"/>"/>
	
	<input type="hidden" name="one_curr_rate_sql">
	<input type="hidden" name="voColHdr">
	<input type="hidden" name="voColOpt">
	<input type="hidden" name="sqlOpt">
	<input type="hidden" name="sqlOpt1">
	<input type="hidden" name="sqlOpt2">
	
	<input type="hidden" name="s_tmp_dt">
	<!-- WMS ACCOUNT LKH 2015.01.20 -->
	<input type="hidden" name="s_sys_flg" value=""/>
	
	<input type="hidden" name="report_sql" value="">
	
	<!-- Contribution Margin Check Y/N -->
	<input type="hidden" name="s_ctrb_mgn_yn" value="">
	
	<!-- Team/Operator Check Y/N -->
	<input type="hidden" name="s_team_opr_yn" value="">
	
	<!-- #3376 [JTC] Japan Trust 용 Profit Report 개발 -->
	<input type="hidden" name="s_subsum_yn" value="N">
	
	<!--#3509 [JPT] Container Type Size 변경건 개발 -->
	<input type="hidden" name="profit_cntr_type_chg" 	value="<bean:write name="valMap" property="profit_cntr_type_chg"/>"/>

	<!--  #3593 [JTC]Profit Report & Performance Report 수정 사항 -->
	<input  type="hidden" name="locl_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	<input  type="hidden" name="gl_view_falg" value=""/>	
		
	
	<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
		<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
	</div>
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		    <button type="button" class="btn_accent" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
			<button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button>
			<button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button> 
		<!--<button type="button" class="btn_normal" onClick="doWork('MINIMIZE')" style="display:none;" btnAuth="MINIMIZE"><bean:message key="Minimize"/></button>-->
		 --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
<div class="over_wrap" height="100%">
	<div class="wrap_search" id="mainForm">	
		<div class="opus_design_inquiry entry_pannel">
			<div class="layout_wrap">
		              <div class="layout_vertical_2" style="width:800px !important"> <!-- OFVFOUR-7743 [Matrix] Adding new features on Volume and Profit Report -->
		              	<div class="layout_vertical_2"><!-- #2396 [BINEX] Volume and Profit Report: +-를 기능 점검 -->
		              		<table width="250px" border="0" cellpadding="0" cellspacing="0">
		                    	<tr>
			                    	<td class="pad_top_8" colspan="3"><b><bean:message key="Department_Type"/></b></td>
		                    	</tr>
		                        <!-- WMS ACCOUNT LKH 2015.01.20 -->
		                        <tr>
					                <td><input name="s_air_sea_opt" id="s_sea_opt"  type="radio" value="S" checked onClick="setAirSeaClick();doWork('CURR_SEARCH');"><label for="s_sea_opt"><bean:message key="Sea"/></label></td>
					                <td><input name="s_air_sea_opt" id="s_air_opt"  type="radio" value="A" onClick="setAirSeaClick();doWork('CURR_SEARCH');"><label for="s_air_opt"><bean:message key="Air"/></label></td>
					                <td><input name="s_air_sea_opt" id="s_air_sea_opt3"  type="radio" value="O" onClick="setAirSeaClick();doWork('CURR_SEARCH');"><label for="s_air_sea_opt3"><bean:message key="Other"/></label></td> 
					                <td><input name="s_air_sea_opt" id="s_air_sea_opt4"  type="radio" value="W" onClick="setAirSeaClick();doWork('CURR_SEARCH');" style="display:<%="Y".equals(wmsUseFlag)?"inline":"none"%>"><label for="s_air_sea_opt4" style="display:<%="Y".equals(wmsUseFlag)?"inline":"none"%>"><bean:message key="Warehouse"/></label></td>
		                        </tr>
		                        <tr>
					                <td><input name="s_exp_bound_flg" id="s_exp_bound_flg" type="checkbox" value="O" checked onClick="doWork('CURR_SEARCH');"><label for="s_exp_bound_flg"><bean:message key="Export"/></label></td>
					                <td colspan="3"><input name="s_imp_bound_flg" id="s_imp_bound_flg" type="checkbox" value="I" checked onClick="doWork('CURR_SEARCH');"><label for="s_imp_bound_flg"><bean:message key="Import"/></label></td>
		                        </tr>
		                    </table>
		              	</div>
		              	<div class="layout_vertical_2"><!-- #2396 [BINEX] Volume and Profit Report: +-를 기능 점검 -->
		              		<table  width="480px"  border="0" cellpadding="0" cellspacing="0">
                          			<tr>
	                          			<th width="80px"><bean:message key="Option"/></th>
                          				<td width="90px"><input type="radio" name="s_grd_opt" id="s_grd_opt1" value="S" checked ><label for="s_grd_opt1"><bean:message key="Summary"/></label></td>
                          				<td width="90px"><input type="radio" name="s_grd_opt" id="s_grd_opt2" value="W" ><label for="s_grd_opt2"><bean:message key="Week"/></label></td>
                          				<!-- OFVFOUR-7743 [Matrix] Adding new features on Volume and Profit Report -->
                          				<td width="90px"><input type="radio" name="s_grd_opt" id="s_grd_opt3" value="M" ><label for="s_grd_opt3"><bean:message key="Month"/></label></td>
                          				<td><input type="radio" name="s_grd_opt" id="s_grd_opt4" value="SP" ><label for="s_grd_opt4"><bean:message key="Simple"/></label></td>
                          			</tr>
                          			<tr>
			                        	<th><bean:message key="Ship_Mode"/></th>
			                        	<!-- // #342  - [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - item 5 by Thoa Dien 20170921  -->
			                        	<td><input name="s_ship_mode_fcl" id="s_ship_mode_fcl" type="checkbox" value="F" checked  onchange="fncHiddenColumn('FCL');"><label for="s_ship_mode_fcl"><bean:message key="FCL"/></label></td>
			                        	<td><input name="s_ship_mode_lcl" id="s_ship_mode_lcl" type="checkbox" value="F" checked  onchange="fncHiddenColumn('LCL');"><label for="s_ship_mode_lcl"><bean:message key="LCL"/></label></td>
			                        	<td width="100px"><input name="s_ship_mode_fak" id="s_ship_mode_fak" type="checkbox" value="F" checked onchange="fncHiddenColumn('FAK');"><label for="s_ship_mode_fak"><bean:message key="FAK"/></label></td>
			                        	<td><input name="s_ship_mode_blk" id="s_ship_mode_blk" type="checkbox" value="F" checked onchange="fncHiddenColumn('BULK');"><label for="s_ship_mode_blk"><bean:message key="BULK"/></label></td>
			                        </tr>
			                        <tr>
			                        	<th><bean:message key="Profit"/></th>
			                        	<td><input name="s_prf_ar" id="s_prf_ar" type="checkbox" value="F" checked><label for="s_prf_ar"><bean:message key="AR"/></label></td>
			                        	<td><input name="s_prf_ap" id="s_prf_ap" type="checkbox" value="F" checked><label for="s_prf_ap"><bean:message key="AP"/></label></td>
			                        	<td><input name="s_prf_dc" id="s_prf_dc" type="checkbox" value="F" checked><label for="s_prf_dc"><bean:message key="Debit_Credit"/></label></td>
			                        </tr>
			                        <tr>
			                        	<td></td>
			                        	<td ><input name="s_prf_vat" id="s_prf_vat" type="checkbox" value="F" checked><label for="s_prf_vat"><bean:message key="Include_VAT"/></label></td>
			                        	<td colspan="3"><input name="s_prf_tax" id="s_prf_tax" type="checkbox" value="F" ><label for="s_prf_tax"><bean:message key="Include_Duty_Tax"/></label></td>
			                        </tr>
                          	</table>
		              	</div>
		              </div>
				<div class="layout_vertical_2" style="width:400px !important">
				<!-- #1651 [Split - 1] [PATENT] 0215_02 Report Exchange Rate - Financial/Operational Option -->
				<table>
					<colgroup>
						<col width="70">
						<col width="60">
						<col width="60">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="To_Currency"/></th>
							<td>
								<select name=s_curr_cd OnChange="doWork('CURR_SEARCH');">
			            			<bean:define id="paramCurrList"  name="valMap" property="currList"/>
									<logic:iterate id="CurrVO" name="paramCurrList">
			            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
			            			</logic:iterate>
			           			</select>							
							</td>
							<th><bean:message key="Base_on"/></th>
							<td>
                            	<bean:define id="Exange_Rate_Type" name="valMap" property="Exange_Rate_Type"/>
								<select id="ex_rate_type" name="ex_rate_type" OnChange="doWork('CURR_SEARCH');" style="width:130px">								
									<logic:iterate id="comVO" name="Exange_Rate_Type">
									<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
									</logic:iterate>
								</select>  						
							</td>
						</tr>
					</tbody>
				</table>
					

	                 <div class="opus_design_grid" style="width: 325px;">
	                 	<script language="javascript">comSheetObject('sheet1');</script>
	                 </div>
				</div>
			</div>
			<table class="line_bluedot"><tr><td></td></tr></table>
			<div class="layout_wrap"> <!-- #2396 [BINEX] Volume and Profit Report: +-를 기능 점검 -->
					<table>
						<colgroup>
							<col width="50">
							<col width="170">
							<col width="170">
							<col width="60">
							<col width="*">
						</colgroup>
						<tbody>
			            	<tr>
			                	<th><bean:message key="Period"/></th>
			                    <td> 
			                     <select required name="s_dt_clss_cd" OnChange="doWork('CURR_SEARCH');"> 
			                     <!-- 2016.04.15 C.W.Park Modified -->
			                     	<option value="PDT" selected><bean:message key="BL_Post_Date"/></option> 
			                     	<option value="IDT"><bean:message key="Invoice_Post_Date"/></option> 
			                         <option value="ETD"><bean:message key="Port_of_Loading_ETD"/></option> 
			                         <option value="ETA"><bean:message key="Port_of_Discharging_ETA"/></option> 
			                         <option value="MBL"><bean:message key="MBL_Create_Date"/></option> 
			                      </select> 
			                     </td>
			                    <td><!-- 
			                     --><input type="text" style="width: 70px;" name="s_prd_strdt" required onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_prd_enddt);firCalFlag=false;doWork('CURR_SEARCH');"   size='11' maxlength="10" class="search_form"><!-- 
			                     --><span class="dash">~</span><!-- 
			                     --><input type="text" style="width: 70px;" name="s_prd_enddt" required onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_prd_strdt, this);firCalFlag=false;doWork('CURR_SEARCH');" size='11' maxlength="10" class="search_form"><!-- 
			                     --><button type="button" class="calendar ir" id="s_prd_dt_cal" onclick="doDisplay('DATE11', frm1);"></button><!-- 
			                     --></td>
						        <th><bean:message key="Branch"/></th>
						        <td> 
						              	<bean:define id="oficeList" name="valMap" property="ofcList"/> 
						                <select name="s_ofc_cd" style="width:90px;" OnChange="doWork('CURR_SEARCH');"/> 
						         		    <bean:size id="len" name="oficeList" /> 
						                    <logic:greaterThan name="len" value="1"> 
						                     	<option value=''>ALL</option> 
						                    </logic:greaterThan> 
						                	<logic:iterate id="ofcVO" name="oficeList"> 
						                    	<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
					                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
					                         	</logic:equal>
					                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
					                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
					                         	</logic:notEqual>
						                	</logic:iterate> 
						                 </select> 
						         </td>
			                </tr>
			              </tbody>
		              </table>
			<div class="layout_vertical_2" style="width:600px !important">
					<table>
						<colgroup>
							<col width="110">
							<col width="90">
							<col width="80">
							<col width="80">
							<col width="*">
						</colgroup>
						<tbody>
               			<tr>
               				<td colspan="5"><b><bean:message key="Report_Type"/></b></td>
               			</tr>
               			<tr>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt1" value="1" onClick="fn_rptOt(this);resetFilter('<bean:message key="HBL_HAWB_No"/>');"><label for="s_rpt_tp_opt1"><bean:message key="HBL_HAWB_No"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt2" value="2" onClick="fn_rptOt(this);resetFilter('<bean:message key="Filing_No"/>');"><label for="s_rpt_tp_opt2"><bean:message key="Filing_No"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt3" value="3" onClick="fn_rptOt(this);resetFilter('<bean:message key="Agent"/>');"><label for="s_rpt_tp_opt3"><bean:message key="Agent"/></label></td>
               				<td colspan="2"><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt4" value="4" onClick="fn_rptOt(this);resetFilter('<bean:message key="Account_Group_ID"/>');"><label for="s_rpt_tp_opt4"><bean:message key="Account_Group_ID"/></label></td>

               			</tr>
               			<tr>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt5" value="5" onClick="fn_rptOt(this);resetFilter('<bean:message key="Shipper"/>');"><label for="s_rpt_tp_opt5"><bean:message key="Shipper"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt6" value="6" onClick="fn_rptOt(this);resetFilter('<bean:message key="Consignee"/>');"><label for="s_rpt_tp_opt6"><bean:message key="Consignee"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt7" value="7" onClick="fn_rptOt(this);resetFilter('<bean:message key="Customer"/>');"><label for="s_rpt_tp_opt7"><bean:message key="Customer"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt8" value="8" onClick="fn_rptOt(this);resetFilter('<bean:message key="POL"/>');"><label for="s_rpt_tp_opt8"><bean:message key="POL"/></label></td>
            				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt9" value="9" onClick="fn_rptOt(this);resetFilter('<bean:message key="POD"/>');"><label for="s_rpt_tp_opt9"><bean:message key="POD"/></label></td>
               			</tr>
               			<tr>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt10" value="10" onClick="fn_rptOt(this);resetFilter('<bean:message key="DEL"/>');"><label for="s_rpt_tp_opt10"><bean:message key="DEL"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt11" value="11" onClick="fn_rptOt(this);resetFilter('<bean:message key="F_Dest"/>');"><label for="s_rpt_tp_opt11"><bean:message key="F_Dest"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt12" value="12" onClick="fn_rptOt(this);resetFilter('<bean:message key="Carrier"/>');"><label for="s_rpt_tp_opt12"><bean:message key="Carrier"/></label></td>
               				<!-- 
               					<td style="visibility:hidden;"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                          		<td class="table_search_body" style="visibility:hidden;"><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt13" value="13" onClick="resetFilter('<bean:message key="Lane"/>');"><bean:message key="Lane"/></td>
                          	-->	
                          	<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt14" value="14" onClick="fn_rptOt(this);resetFilter('<bean:message key="Sales_Person"/>');"><label for="s_rpt_tp_opt14"><bean:message key="Sales_Person"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt15" value="15" onClick="fn_rptOt(this);resetFilter('<bean:message key="Operator"/>');"><label for="s_rpt_tp_opt15"><bean:message key="Operator"/></label></td>
               			</tr>
               			<tr>
                            <!-- OFVFOUR-7175: [Webtrans] Volume& Profit Report got error: "The error has arisen when you search data !" -->
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt16" value="24" onClick="fn_rptOt(this);resetFilter('<bean:message key="Contribution"/>');"><label for="s_rpt_tp_opt16"><bean:message key="Contribution"/></label></td>
               				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt17" value="25" onClick="fn_rptOt(this);resetFilter('<bean:message key="Team"/>/<bean:message key="Operator"/>');"><label for="s_rpt_tp_opt17"><bean:message key="Team"/>/<bean:message key="Operator"/></label></td>
               				<td colspan="3"><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt13" value="13" onClick="fn_rptOt(this);resetFilter('<bean:message key="Lane"/>');"><label for="s_rpt_tp_opt13"><bean:message key="Lane"/></label></td>
               			</tr>
               			<tr>
               				<td colspan="5"></td>
               			</tr>
               			<!-- 
               			<tr>
               				<td colspan="5"><b><bean:message key="Option"/></b> <input type="checkbox" name="s_sel_opt" id="s_sel_opt0"  value="1" ><label for="s_sel_opt0"><bean:message key="Subtotal_By_Report_Type"/></label></td>
               			</tr>
               			-->
               			</tbody>
               		</table>
               		<br/>
               		<div class="opus_design_grid" style="width: 420px;">
               			<table  border="0" cellpadding="0" cellspacing="0">
                          	<tr height="33px">
				               <td width="90px"><b><bean:message key="Filter_By"/></b></td>
				               <td width="350px"><input name="f_acc_group_id" value="" type="text" class="search_form" style="width:200px;display:none;" onblur="strToUpper(this);" onkeydown="if(event.keyCode == 13) doWork('FILTER_POP');"></td>
				               <td><!-- 
				                --><div class="opus_design_btn"><!-- 
				                -->	<button type="button" class="btn_normal" id="tbAddBtn" onClick="doWork('FILTER_POP');"> <bean:message key="Add"/></button><!-- 
				                --></div><!-- 
				                --></td>
                          	</tr>
                         </table>
						<!-- opus_design_btn(E) -->
						<script language="javascript">comSheetObject('sheet3');</script>
					</div>               		
            </div>
            <div class="layout_vertical_2">
					<table>
						<colgroup>
							<col width="80">
							<col width="105">
							<col width="100">
							<col width="90">
							<col width="70">
							<col width="*">
						</colgroup>
						<tbody>
                          			<tr>
                          				<td colspan="6"><b><bean:message key="Output_By"/></b></td>
                          			</tr>
                          			<tr>
	                          			<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt0"  value="0" ><label for="s_otpt_by_opt0"><bean:message key="Branch"/></label></td>
	                          			<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt3"  value="3" ><label for="s_otpt_by_opt3"><bean:message key="Agent"/></label></td>
	                          			<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt5"  value="5" ><label for="s_otpt_by_opt5"><bean:message key="Shipper"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt6"  value="6" ><label for="s_otpt_by_opt6"><bean:message key="Consignee"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt7"  value="7" ><label for="s_otpt_by_opt7"><bean:message key="Customer"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt4"  value="4" ><label for="s_otpt_by_opt4"><bean:message key="Account_Group_ID"/></label></td>
                          			</tr>
                          			<tr>
	                          			<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt12" value="12"><label for="s_otpt_by_opt12"><bean:message key="Carrier"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt16" value="16"><label for="s_otpt_by_opt16"><bean:message key="Vessel_Flight"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt8"  value="8"><label for="s_otpt_by_opt8"><bean:message key="POL"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt9"  value="9"><label for="s_otpt_by_opt9"><bean:message key="POD"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt10" value="10"><label for="s_otpt_by_opt10"><bean:message key="DEL"/></label></td>
										<td></td>
									</tr>
									<tr>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt17" value="17"><label for="s_otpt_by_opt17"><bean:message key="ETD"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt18" value="18"><label for="s_otpt_by_opt18"><bean:message key="ETA"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt11" value="11"><label for="s_otpt_by_opt11"><bean:message key="F_Dest"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt13" value="13"><label for="s_otpt_by_opt13"><bean:message key="Lane"/></label></td>
										<td></td>
										<td></td>
                          			</tr>
                          			<tr>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt19" value="19"><label for="s_otpt_by_opt19"><bean:message key="Incoterms"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt20" value="20"><label for="s_otpt_by_opt20"><bean:message key="Commodity"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt21" value="21"><label for="s_otpt_by_opt21"><bean:message key="Cargo_Type"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt14" value="14"><label for="s_otpt_by_opt14"><bean:message key="Sales_Person"/></label></td>
                          				<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt15" value="15"><label for="s_otpt_by_opt15"><bean:message key="Operator"/></label></td>
                          				<td></td>
                          			</tr>
                          			<tr>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt2"  value="2" ><label for="s_otpt_by_opt2"><bean:message key="Filing_No"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt22" value="22"><label for="s_otpt_by_opt22"><bean:message key="MBL_MAWB_No"/></label></td>
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt1"  value="1" ><label for="s_otpt_by_opt1"><bean:message key="HBL_HAWB_No"/></label></td>
										<!-- #4128 [JAPT] New request - OEH TRI#, TLI# -->
										<td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt23"  value="23" ><label for="s_otpt_by_opt23"><bean:message key="TLI_NO"/></label></td>
                          				<td></td>
                          				<td></td>
                          			</tr>
                                    <!-- [OFVFOUR-7204] - [BNX-LA] Post date option as Output by on Volume and Profit Report -->
                                    <tr>
                                        <td><input type="checkbox" onClick="fn_OutputBy(this);" name="s_otpt_by_opt" id="s_otpt_by_opt26"  value="26" ><label for="s_otpt_by_opt26"><bean:message key="Post_Date"/></label></td>
                                    </tr>
                          		</tbody>
                          		</table>
                          		
               		<div class="opus_design_grid" style="width: 420px;">
               			<table  border="0" cellpadding="0" cellspacing="0">
                          	<tr height="33px">
				               <td><!-- 
				                --><div class="opus_design_btn"><!-- 
				                -->	<button type="button" class="btn_normal" id="tbClearBtn" onClick="doWork('OUTPUT_CLEAR');"> <bean:message key="Clear"/></button><!-- 
				                --></div><!-- 
				                --></td>
                          	</tr>
                         </table>
						<!-- opus_design_btn(E) -->
						<script language="javascript">comSheetObject('sheet4');</script>
					</div>                              		
				</div>
			

</div>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
		    <!-- #2396 [BINEX] Volume and Profit Report: +-를 기능 점검 -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onClick="fn_setSizeParam('700'); setSizeUp(docObjects[2], '700')"><bean:message key="Plus"/></button>
				<button type="button" class="btn_normal"  onClick="fn_setSizeParam('330'); setSizeDown(docObjects[2], '330')"><bean:message key="Minus"/></button>
			</div>		
		
			<script language="javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
</div>
  </form>
  <form name="frm2">
  	<input type="hidden" name="f2_curr_cd" value="<bean:write name="ofcCurr" property="trf_cur_cd"/>"/>
	<input type="hidden" name="f2_sys_ofc_cd" value="<bean:write name="valMap" property="sysOfcCd"/>"/>
  </form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
