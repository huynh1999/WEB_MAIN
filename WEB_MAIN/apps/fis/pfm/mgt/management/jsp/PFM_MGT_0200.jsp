<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0200.jsp
*@FileTitle  : Tax Report
*@author     : CLT
*@version    : 1.0
*@since      : 2017/03/09
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>"  rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0200.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	
	<%
		String GA_AR_YN = "N";
		String GA_AP_YN = "N"; 
		
		HttpSession httpSession = request.getSession();
		CommonEventResponse commonEventResponse = (CommonEventResponse) httpSession.getAttribute("menuResponse");
		Map<String, ArrayList<MenuTreeVO>> menuMap = commonEventResponse.getMapVal();

		ArrayList<MenuTreeVO> pgmMenuList = menuMap.get("PGMMENU");
		
		for (MenuTreeVO pgmMenuTreeVO : pgmMenuList) {
			String pgm_url = pgmMenuTreeVO.getPgmURL();
			
			if (pgm_url.indexOf(".clt") > -1){
				pgm_url = pgm_url.substring(2, pgm_url.indexOf(".clt"));
				
				if (pgm_url.equals("ACC_INV_0035")){ // A/R ENTRY(G&A)
					GA_AR_YN = "Y";
				}
				if (pgm_url.equals("ACC_INV_0031")){ // A/P Entry(G&A)
					GA_AP_YN = "Y";
				}
			}
		}
	%>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_nm 		= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId 		= userInfo.getUsrid();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		String usrphn 		= userInfo.getPhn();
	%>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	<script>
	function setupPage(){
		loadPage();
		setSelect();
		var agent = navigator.userAgent.toLowerCase(); 
		if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
		}else{
			getBtnObj("pdfDowns").style.display = 'inline';
		}
	 }
		function setSelect(){
			var formObj = document.frm1;
		}
		
	//  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828
		var ofc_curr_cd = "<bean:write name="ofcInfo" property="locl_curr_cd"/>";
		if (ofc_curr_cd == "" || ofc_curr_cd == "undefined"){
			ofc_curr_cd = "<bean:write name="ofcInfo" property="trf_cur_cd"/>";
		}
		
		var usrNm = "<%= usrNm %>";
		
		var GA_AR_YN = "<%=GA_AR_YN%>";
		var GA_AP_YN = "<%=GA_AP_YN%>";
		// #1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
		var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");
	</script>
	<form name="frm1" method="POST" action="./PFM_MGT_0200.clt">
	<!--Command를 담는 공통 -->
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />
	<input id="file_name" name="file_name" type="hidden" />
	<input id="title" name="title" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />
	<input id="f_usr_id" name="f_usr_id" value="<%= usrId %>" type="hidden" />
	<input id="f_usr_nm" name="f_usr_nm" value="<%= usrNm %>" type="hidden" />
	<input id="f_email" name="f_email" value="<%= email %>" type="hidden" />
	<input id="f_usrphn" name="f_usrphn" value="<%= usrphn %>" type="hidden" />
	<input id="f_ofc_cd" name="f_ofc_cd" value="<%= ofc_cd %>" type="hidden" />
	<input id="f_ofc_nm" name="f_ofc_nm" value="<%= ofc_nm %>" type="hidden" />
	<input id="f_cnt_cd" name="f_cnt_cd" value="<%= cnt_cd %>" type="hidden" />
	<input type="hidden" name="tmp_range_fr" id="tmp_range_fr" value="<bean:write name="valMap" property="MIN_GL"/>">
	<input type="hidden" name="tmp_range_to" id="tmp_range_to" value="<bean:write name="valMap" property="MAX_GL"/>">
	<input type="hidden" name="all_range_fr" id="all_range_fr" value="<bean:write name="valMap" property="MIN_GL_ALL"/>">
	<input type="hidden" name="all_range_to" id="all_range_to" value="<bean:write name="valMap" property="MAX_GL_ALL"/>">
	
	<!-- GL View Table Data Create LKH 2015.02.25 -->
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP">
					<%--	 
					<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" class="btn_accent"  style="cursor:hand; display:none;" id = "pdfDowns" onclick="setTorVal('');pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span>
					<button type="button" class="btn_accent"  id="btnPrint" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="setTorVal('');doWork('PRINT')"><bean:message key="Print"/></button>
		    		<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_TOR_PRINT" onclick="setTorVal('Y');doWork('PRINT')" id="torPrint">TOR <bean:message key="Print"/></button>
					<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onclick="doWork('ALLCLEAR')"><bean:message key="Clear"/></button>
					--%> 
				</div>
				<!-- opus_design_btn(E) -->
	    
	  			<!-- page_location(S) -->
				<div class="location">	
					 <span><%=LEV1_NM%></span> &gt;
				 	 <span><%=LEV2_NM%></span> &gt;
				  	 <span><%=LEV3_NM%></span>
			   		<a href="" class="ir">URL Copy</a>
				</div>
				<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">	
	<!-- inquiry_area(S) -->	
		<div class="wrap_result">
			<div class="layout_wrap">
				<div class="layout_flex_fixed"  style="width:610px;float:left!important;">
			<div class="opus_design_inquiry sm">
					 <table>	
						<colgroup>
					        	<col width="90px">
					        	<!-- col width="70px">
					        	<col width="70px">
					        	<col width="140px"-->
					        	<col width="*">
					   </colgroup>
					        <tbody>   
					             <tr>
			                    	<th align="left"><bean:message key="Branch"/></th>
			                    	<td align="left">
					                  	<bean:define id="oficeList" name="valMap" property="ofcList"/>
					                   	<select name="s_ofc_cd" id="s_ofc_cd" OnChange="doWork('CURR_SEARCH');selOficeDisplay(this);">
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
			                    	<!-- #26335 [BINEX]Branch "전체"로 리포트를 뽑을 때 Branch 별로도 볼수 가 있어야함 - 24664 -->
		               				<!-- td>
		                				<input id="sort_by_td11" type="radio" name="sort_by_rd" value="" checked  onClick="">
		                				<span id="sort_by_td12" ><bean:message key="Total"/></span>
				            		</td>
				            		<td>
	                      				<input id="sort_by_td21" type="radio" name="sort_by_rd" value="" onClick="">
	                      				<span id="sort_by_td22"><bean:message key="Sort_By_Office"/></span>
				            		</td>
				            		<td>
	                      				<input id="sort_by_td31" type="radio" name="sort_by_rd" value="" onClick="">
	                      				<span id="sort_by_td32"><bean:message key="Sort_By_GL"/></span>
				            		</td-->
	                        	</tr>
						</tbody>
					</table>
			</div>
				<div class="opus_design_inquiry sm">
					 <table>	
						<colgroup>
					        	<col width="90px">
					        	<col width="90px">
					        	<col width="*">
					   </colgroup>
					        <tbody>   
					             <tr>
			                    	<th><bean:message key="Period"/></th>
			                    	<td></td>
		                    	</tr>
					             <tr>
			                    	<th>&nbsp;</th>
			                    	<td>
			                    		<bean:message key="From"/>&nbsp;<!-- 
						            --><input  type="text" name="f_fr_dt" id="f_fr_dt" dataformat="excepthan" style="width:75px;ime-mode:disabled;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="mkDateFormatType(this,event,false,1);chkCmprPrd(firCalFlag, false, this, this, frm1.f_to_dt);firCalFlag=false;doWork('CURR_SEARCH');" maxlength="10" class="input1"><!-- 
						            --><button type="button" class="calendar" tabindex="-1" id="f_fr_dt_cal" onclick="doDisplay('DATE1', frm1);"></button><!-- 
						            --><bean:message key="To"/>&nbsp;<!-- 
						            --><input type="text"name="f_to_dt"  id="f_to_dt" dataformat="excepthan" style="width:75px;ime-mode:disabled;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="mkDateFormatType(this,event,false,1);chkCmprPrd(firCalFlag, false, this, frm1.f_fr_dt, this);firCalFlag=false;doWork('CURR_SEARCH');" maxlength="10" class="input1"><!-- 
						            --><button type="button" class="calendar" tabindex="-1" id="f_dt_cal" onclick="doDisplay('DATE2', frm1);" ></button>
			                    	</td>
			                    	<td>
										<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio" class="radio_select" checked><label for="f_dt_tp_radio"><bean:message key="Post_Date"/></label>
										<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio2" class="radio_select"><label for="f_dt_tp_radio2"><bean:message key="Invoice_Date"/></label>
									</td>
		                    	</tr>
		                    </tbody>
		             </table>
		    	</div>
				<div class="opus_design_inquiry sm">
					 <table>	
						<colgroup>
					        	<col width="90px">					        	
					        	<col width="*">
					   </colgroup>
					        <tbody>   
					             <tr>
			                    	<th><bean:message key="Report_Option"/></th>
			                    	<td></td>
		                    	</tr>
					             <tr>
			                    	<th>&nbsp;</th>
			                    	<td>
				                    	<table>
										        <tbody>
													 <tr>
					                       				<td style="width:153px">
					                        				<input type="radio" name="f_ro_tp_radio" id="f_ro_tp_radio" value="" checked><label for="f_ro_tp_radio"><bean:message key="ALL"/></label>
									            		</td>
									            		<td>
									            			<input type="radio" name="f_ro_tp_radio" id="f_ro_tp_radio1" value="" ><label for="f_ro_tp_radio1"><bean:message key="NON_TAXABLE"/></label>
									            		</td>
									            		<td>
									            			<input type="radio" name="f_ro_tp_radio" id="f_ro_tp_radio2" value="" ><label for="f_ro_tp_radio2"><bean:message key="TAXABLE"/></label>
									            		</td>
						                        	</tr>						                        					                        	
											</tbody>
										</table>
			                    		<!-- input type="radio" name="f_ro_tp_radio" id="f_ro_tp_radio" class="radio_select" checked><label for="f_ro_tp_radio"><bean:message key="ALL"/></label>
										<input type="radio" name="f_ro_tp_radio" id="f_ro_tp_radio1" class="radio_select" checked><label for="f_ro_tp_radio1"><bean:message key="NON_TAXABLE"/></label>
										<input type="radio" name="f_ro_tp_radio" id="f_ro_tp_radio2" class="radio_select"><label for="f_ro_tp_radio2"><bean:message key="TAXABLE"/></label-->
									</td>
		                    	</tr>
		                    </tbody>
		             </table>
		    	</div>   	
		        <div class="opus_design_inquiry sm">
					 <table>	
						<colgroup>
					        	<col width="90px">
					        	<col width="*">
					   </colgroup>
					        <tbody>   
		                    	<tr>
			                    	<th><bean:message key="Report_Type"/></th>
			                    	<td>
			                    		<div class="opus_design_btn" style="padding-right: 75px;"><!--
											--><button  onclick="doWork('RPTCHECK')" type="button" class="btn_etc"><bean:message key="All"/></button><!-- 
											--><button  onclick="doWork('RPTCLEAR')" type="button"  class="btn_etc"><bean:message key="Clear"/></button>
										</div>
			                    	</td>
		                    	</tr>
		                    	<tr>
			                    	<th>&nbsp;</th>
			                    	<td>
			                    		<table>
									        <tbody>
												 <tr>
				                       				<td style="width:153px">
				                        				<input type="checkbox" name="rpt_tp" id="rpt_tp" value="" checked><label for="rpt_tp"><bean:message key="AR"/></label>
								            		</td>
								            		<td style="width:153px">
								            			<input type="checkbox" name="exp_ar_ck" id="exp_ar_ck" value="" checked><label for="exp_ar_ck"><bean:message key="AR_GnA"/></label>
								            		</td>
								            		<!-- #3030 [BNX JAPAN]Tax Report DC 데이터 추가요청 -->
								            		<td>
								            			<input type="checkbox" name="debit_ck" id="debit_ck" value="" checked><label for="debit_ck"><bean:message key="Debit"/></label>
								            		</td>
					                        	</tr>
					                        	<tr>
				                       				<td>
				                        				<input type="checkbox" name="rpt_tp" id="rpt_tp1" value="" checked><label for="rpt_tp1"><bean:message key="Account_Payable"/></label>
								            		</td>
								            		<td>
								            			<input type="checkbox" name="exp_ap_ck" id="exp_ap_ck" value="" checked><label for="exp_ap_ck"><bean:message key="AP_GnA"/></label>
								            		</td>
								            		<!-- #3030 [BNX JAPAN]Tax Report DC 데이터 추가요청 -->
								            		<td>
								            			<input type="checkbox" name="credit_ck" id="credit_ck" value="" checked><label for="credit_ck"><bean:message key="Credit"/></label>
								            		</td>
					                        	</tr>					                        	
										</tbody>
									</table>
			                    	</td>
			                    </tr>
			         	</tbody>
		             </table>
		    	</div>

				</div>
				<div  style="padding-left:618px">
			    <div class="opus_design_inquiry sm" style="width:450px; height: 255px">
			    	<table>
			    		<colgroup>
				        	<col width="173">
				        	<col width="80">
				        	<col width="*">
				 		  </colgroup>
				        <tbody>
 	                        <tr>
 	                            <td colspan="3"><b><bean:message key="Currency"/></b></td> 
 	                        </tr>
 	                        <tr>
 	                        	<td colspan="3">
 	                         		<input type="radio" name="s_curr_opt" id="f_curr_multi" value="M" checked/><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label> 
 			              		</td>
 	                    	</tr>
 	                    	<tr>
 			                	<td>
 	                       			<input type="radio" name="s_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.s_curr_cd.value != ''){doWork('CURR_SEARCH');}"/><label for="f_curr_one"><bean:message key="One_Currency"/></label> 
 			               		</td>	 
 			               		<td>
 			               			<h3 class="title_design"><bean:message key="To_Currency"/></h3> 
 			               		</td>
 			               		<td>
 			               			<select name="s_curr_cd" OnChange="doWork('CURR_SEARCH');" >
                             			<bean:define id="paramCurrList"  name="valMap" property="currList"/> 
 										<logic:iterate id="CurrVO" name="paramCurrList"> 
                             			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option> 
                             			</logic:iterate> 
                            			</select>    
 			               		</td>	                
 	                    	</tr>
                    	</tbody>
                    </table>
                    <div class="opus_design_grid clear" id="mainTable" style="width: 360px;">
						<script type="text/javascript">comSheetObject('sheet1');</script>
					</div>
			    </div>
			   </div>
			</div>
	</div>
	<!-- inquiry_area(E) -->	
	<!-- grid_area(S) -->
		<div class="wrap_result">
				<div class="opus_design_grid clear" id="mainTable">
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
		</div>
	<!-- grid_area(E) -->
<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
