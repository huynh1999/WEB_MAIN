<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0040.jsp
*@FileTitle  :  Sales Profit Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/11
=========================================================*/
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0040.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="acctFincCurrDflt"  name="valMap" property="acctFincCurrDflt"/>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrId		= userInfo.getUsrid();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		var glo_usr_nm = '<%=usrNm%>';
		var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";
	</script>
	
	<script>
		function setupPage()
		{
			
			loadPage();
			setSelect();
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
				getBtnObj("pdfDowns").style.display = 'inline';
			}
			setTimeout("document.frm1.s_prd_strdt.focus();", 1000);
		}
		function setSelect(){
			var formObj = document.frm1;
			
			
		}

		var usrNm = "<%= usrNm %>";
		var usrId = "<%= usrId %>";
		
	    //  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2  by thoa.dien 170828
		var ofc_curr_cd = "<bean:write name="ofcInfo" property="locl_curr_cd"/>";
		if (ofc_curr_cd == "" || ofc_curr_cd == "undefined"){
			ofc_curr_cd = "<bean:write name="ofcInfo" property="trf_cur_cd"/>";
		}
		
		var ofc_cd = "<%= ofc_cd %>";
		// #1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
		var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");

		//#3411 [JTC]Accounting & Performance 수정사항
		var ACCT_FINC_CURR_DFLT = '<bean:write name="acctFincCurrDflt" property="opt_val"/>';

	</script>
	
<form name="frm1" method="POST" action="./PFM_MGT_0040.clt">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />

	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />
	
	<!-- Batch Performance LKH 2015.01.28 -->
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	
	<input type="hidden" name="f_usr_id" value="<%= usrId %>"/>
	<input type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email"id="f_email" value="<%= email %>"/>
	<input type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_locl_nm" id="f_ofc_locl_nm" name="f_ofc_locl_nm" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input type="hidden" name="rpt_tp_opt" id="rpt_tp_opt /">
	<input type="hidden" name="rpt_sub_opt" id="rpt_sub_opt /">
	
	<input type="hidden" name="rpt_tp_opt_col">
	<input type="hidden" name="rpt_sub_opt_col">
	<input type="hidden" name="rpt_tp_opt_nm_col">
	<input type="hidden" name="rpt_sub_opt_nm_col">
	
	<input type="hidden" name="f_sys_ofc_cd" value="<bean:write name="valMap" property="sysOfcCd"/>"/>
	
	<input type="hidden" name="f_dptm_val" value=""/>
	<input type="hidden" name="in_air_sea_clss_cd" value=""/>
	<input type="hidden" name="in_bnd_clss_cd" value=""/>
	
	<!-- WMS ACCOUNT LKH 2015.01.20 -->
	<input type="hidden" name="s_wms_flg" value=""/>
	<input type="hidden" name="s_fms_flg" value=""/>
	<input type="hidden" name="s_fms_oth_flg" value=""/>
	<input type="hidden" name="s_uncheck_flg" value=""/>
	<input type="hidden" name="s_oth_flg" value=""/>
	
	<!--  #3593 [JTC]Profit Report & Performance Report 수정 사항 -->
	<input  type="hidden" name="locl_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	<input  type="hidden" name="gl_view_falg" value=""/>		
		
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
	       <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" style="display:none;" id = "pdfDowns" class="btn_accent" onclick="pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span>
		   <button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button> 
		   <button type="button" btnAuth="CLEAR" class="btn_normal" onclick="doWork('ALLCLEAR')"><bean:message key="Clear"/></button>
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
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel">
			<!-- layout_wrap(S) -->
			<div class="layout_wrap">
			    <div class="layout_vertical_2" style="width:400px !important;">
			    	<table>
			    		<colgroup>
			    			<col width="120" />
			    			<col width="100" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
			    			<tr>
			    				<tr><td colspan="2"><label style="background-color:#d4f6ff;"><b><bean:message key="Department_Type"/></b></label></td>
			    				<td><button type="button" class="btn_etc " onclick="doWork('ALL');doWork('CURR_SEARCH');"><bean:message key="All"/></button><button type="button" class="btn_etc" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button></td>
			    			</tr>
				    		<tr>
				                <td><input name="s_oi_dptm_flg" id="s_oi_dptm_flg" type="checkbox" value="SI" onClick="doWork('CURR_SEARCH');"><label for="s_oi_dptm_flg"><bean:message key="Ocean_Import"/></label></td>
				                <td><input name="s_ai_dptm_flg" id="s_ai_dptm_flg" type="checkbox" value="AI" onClick="doWork('CURR_SEARCH');"><label for="s_ai_dptm_flg"><bean:message key="Air_Import"/></label></td>
				                <!-- WMS ACCOUNT LKH 2015.01.20 -->
				                <td><input name="s_wm_dptm_flg" id="s_wm_dptm_flg" type="checkbox" value="W" onClick="doWork('CURR_SEARCH');" style="display:<%="Y".equals(wmsUseFlag)?"inline":"none"%>;"><label for="s_wm_dptm_flg" style="display:<%="Y".equals(wmsUseFlag)?"inline":"none"%>;"><bean:message key="Warehouse"/></label></td>
	                        </tr>
	                        <tr>
	                            <td><input name="s_oe_dptm_flg" id="s_oe_dptm_flg" type="checkbox" value="SO" onClick="doWork('CURR_SEARCH');"><label for="s_oe_dptm_flg"><bean:message key="Ocean_Export"/></label></td>
				                <td><input name="s_ae_dptm_flg" id="s_ae_dptm_flg" type="checkbox" value="AO" onClick="doWork('CURR_SEARCH');"><label for="s_ae_dptm_flg"><bean:message key="Air_Export"/></label></td>
				                <td><input name="s_on_dptm_flg" id="s_on_dptm_flg" type="checkbox" value="O" onClick="doWork('CURR_SEARCH');"><label for="s_on_dptm_flg"><bean:message key="Other_Operation"/></label></td>
	                        </tr>
	                        
	                        
	                        <!-- #52497 -->
		  					<tr><td>&nbsp;</td></tr>
		  					<tr> 
		  						<td colspan="3"><label style="background-color:#d4f6ff;"><b><bean:message key="Sales_Type"/></b></label></td> 
		  					</tr>
		  					<tr>
		  						<td  colspan="3">
		  							<input type="checkbox" name="s_sales_type_y" id="s_sales_type_y" value="Y" ><label for="s_sales_type_y"><bean:message key="NOMI"/></label>
                   				<input type="checkbox" name="s_sales_type_n" id="s_sales_type_n" value="N" ><label for="s_sales_type_n"><bean:message key="FREE"/></label>
                   				<input type="checkbox" name="s_sales_type_c" id="s_sales_type_c" value="C" ><label for="s_sales_type_c"><bean:message key="CO_LOAD"/></label></td>  
		  					</tr> 
		  					
			    		</tbody>
			    	</table>
			    </div>
			    <div class="layout_vertical_2" style="width:300px !important;">
			    	<table>
			    		<colgroup>
			    			<col width="100" />
			    			<col width="70" />
			    			<col width="100" />						
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
			    			<tr><td><b><bean:message key="Option"/></b></td><td colspan="2"></td></tr>
			    			<tr>
                   				<td><input type="radio" name="s_prn_opt" id="s_prn_opt1" value="S" checked ><label for="s_prn_opt1"><bean:message key="Summary"/></label></td>
<!--                   				<td><input type="radio" name="s_prn_opt" id="s_prn_opt2" value="D" ><label for="s_prn_opt2"><bean:message key="Detail"/></label></td>-->
                   				<td><input type="radio" name="s_prn_opt" id="s_prn_opt3" value="P" ><label for="s_prn_opt3"><bean:message key="Special"/></label></td>
<!--                   				<td><input type="radio" name="s_prn_opt" id="s_prn_opt4" value="M" ><label for="s_prn_opt4"><bean:message key="Month"/></label></td>-->
                   			</tr>
                   			<tr><td><b><bean:message key="Sort_By"/></b></td><td colspan="2"></td></tr>
                   			<tr>
                  				<td><input type="radio" name="s_sort_opt" id="s_sort_opt1" value="1" checked ><label for="s_sort_opt1"><bean:message key="Report_Type"/></label></td>
                  				<td><input type="radio" name="s_sort_opt" id="s_sort_opt2" value="2" ><label for="s_sort_opt2"><bean:message key="Profit"/></label></td>
                  				<td colspan="2"><input name="s_loss_only_flg" id="s_loss_only_flg" type="checkbox" value="N" ><label for="s_loss_only_flg"><bean:message key="Loss_Only"/></label></td>
                  			</tr>
                  			
		  					                 			
			    		</tbody>
			    	</table>	
			    </div>
			    <div class="layout_vertical_2" style="width:400px !important;">
			    	<table>
			    		<colgroup>
			    			<col width="100" />
			    			<col width="100" />
			    			<col width="100" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
			    			<tr><td><b><bean:message key="Currency"/></b></td><td colspan="2"></td></tr>
			    			<tr><td colspan="3"><input type="radio" name="s_curr_opt" id="f_curr_multi" value="M" checked/><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label></td></tr>
			    			<tr>
			    				<td><input type="radio" name="s_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.s_curr_cd.value != ''){doWork('CURR_SEARCH');}"/><label for="f_curr_one"><bean:message key="One_Currency"/></label></td>
			    				<th><bean:message key="To_Currency"/></th>
			    				<td><select name=s_curr_cd OnChange="doWork('CURR_SEARCH');" onKeyDown="if(event.keyCode==9){frm1.s_dt_clss_cd.focus();};">
						            		<option value=""></option>
	                            			<bean:define id="paramCurrList"  name="valMap" property="currList"/>
											<logic:iterate id="CurrVO" name="paramCurrList">
	                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
	                            			</logic:iterate>
                            			</select>      
                            	</td>
                            	<!-- #1651 [Split - 1] [PATENT] 0215_02 Report Exchange Rate - Financial/Operational Option -->
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
			    	<div class="opus_design_grid" id="mainTable" style="width: 420px;">
						<script type="text/javascript">comSheetObject('sheet1');</script>
					</div>
			    </div>
			</div>
			<!-- layout_wrap(E) -->
		<table class="line_bluedot"><tr><td></td></tr></table>
			<!-- layout_wrap(S) -->
			<div class="layout_wrap">
			    <div class="layout_vertical_2" style="width:600px !important;">
			    	<table>
			    		<colgroup>
			    			<col width="120" />
			    			<col width="130" />
			    			<col width="*" />
			    		</colgroup>
			    		<tr>
			    			<th><bean:message key="Period"/></th>
                            <td>
                                <select  name="s_dt_clss_cd"  required>
                                <!-- 2016.04.14 C.W.Park Modified -->
                            		<option value="PDT"><bean:message key="BL_Post_Date"/></option>
			                    	<option value="IDT"><bean:message key="Invoice_Post_Date"/></option>
                                </select>
                            </td>
                            <td><!-- 
								 --><input type="text" required  name="s_prd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_prd_enddt);firCalFlag=false;" style="width:70px;" size='11' maxlength="10" class="search_form"><!-- 
								  --><span class="dash">~</span><!-- 
								 --><input type="text" required  name="s_prd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_prd_strdt, this);firCalFlag=false;" style="width:70px;" size='11' maxlength="10" class="search_form"><!-- 
								 --><button type="button" id="s_prd_dt_cal" name="s_prd_dt_cal" class="calendar ir"  onclick="doDisplay('DATE11', frm1);"></button><!-- 
							 --></td>
			    		</tr>
			    	</table>
			    	<table>
			    		<colgroup>
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="*" />
			    		</colgroup>
			    					<tr>
			    						<th style="text-align: left;"><bean:message key="Report_Type"/></th>
                          				<td colspan = "3"></td>
                          			</tr>
                          			<tr>
                          			    <!--2012.02.03순서 변경됨-->
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt1" value="1" checked ><label for="s_rpt_tp_opt1"><bean:message key="Ref_No"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt3" value="3"><label for="s_rpt_tp_opt3"><bean:message key="HBL_HAWB_No"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt5" value="5"><label for="s_rpt_tp_opt5"><bean:message key="Agent"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt13" value="13"><label for="s_rpt_tp_opt13"><bean:message key="Account_Group_ID"/></label></td>
                          			</tr>
                          			<tr>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt6" value="6"><label for="s_rpt_tp_opt6"><bean:message key="Shipper"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt8" value="8"><label for="s_rpt_tp_opt8"><bean:message key="Consignee"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt10" value="10"><label for="s_rpt_tp_opt10"><bean:message key="Customer"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt7" value="7"><label for="s_rpt_tp_opt7"><bean:message key="Carrier"/></label></td>
                          			</tr>
                          			<tr>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt9" value="9"><label for="s_rpt_tp_opt9"><bean:message key="POL"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt11" value="11"><label for="s_rpt_tp_opt11"><bean:message key="POD"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt14" value="7"><label for="s_rpt_tp_opt14"><bean:message key="DEL"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt4" value="4"><label for="s_rpt_tp_opt4"><bean:message key="Sales_Person"/></label></td>
                          			</tr>
                          			<tr>
                          				<td>
                          					<input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt17" value="17"><label for="s_rpt_tp_opt17"><bean:message key="Team"/>/<bean:message key="Operator"/></label>
                          				</td>
                          				<td></td>
                          				<td></td>
                          				<td></td>
                          			</tr>
		                          	<tr>
			                            <th><bean:message key="Select"/></th>
			                            <td colspan="3"><input name="s_sel_val" type="text" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:275;" value=''/></td>
			                        </tr>
			                        <tr>
			                            <th>Office</th>
			                            <td colspan="3"><bean:define id="oficeList" name="valMap" property="ofcList"/>
				                            <select name="s_ofc_cd" id="s_ofc_cd" style="width:275px;"/>
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
			    	</table>
			    </div>
			    <div class="layout_vertical_2" style="width:600px !important;" >
			    	<table>
			    		<colgroup>
			    			<col width="70" />
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="120" />
			    		</colgroup>
						    		<tr>
						    			<td colspan="5">
						    			<div class="opus_design_btn">
						    			<button type="button" class="btn_etc" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
						    			</div>
						    			</td>
						    		</tr>
						    		<tr>
                          				<th style="text-align: left;"><bean:message key="Option"/></th>
                          				<td colspan="4"></td>
                          			</tr>
                          			<tr>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt0" value="" onClick="fRadio(this.value);" checked ><label for="s_rpt_sub_opt0">N/A</label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt1" value="1" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt1"><bean:message key="Ref_No"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt3" value="3" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt3"><bean:message key="HBL_HAWB_No"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt5" value="5" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt5"><bean:message key="Agent"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt13" value="13" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt13"><bean:message key="Account_Group_ID"/></label></td>
                          			</tr>
                          			<tr>
                          				<td></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt6" value="6" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt6"><bean:message key="Shipper"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt8" value="8" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt8"><bean:message key="Consignee"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt10" value="10" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt10"><bean:message key="Customer"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt7" value="7" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt7"><bean:message key="Carrier"/></label></td>
                          			
                          			</tr>
                          			<tr>
                          				<td></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt9" value="9" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt9"><bean:message key="POL"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt11" value="11" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt11"><bean:message key="POD"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt14" value="14" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt14"><bean:message key="DEL"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt4" value="4" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt4"><bean:message key="Sales_Person"/></label></td>
                          			</tr>
                          			<tr>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt12" value="12" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt12"><bean:message key="Operator"/></label></td>
                          				<td></td>
                          				<td></td>
                          				<td></td>
                          			</tr>
                          			<tr>
			                            <th><bean:message key="Select"/></th>
			                            <td colspan="4"><input name="s_sel_sub_val" readonly type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode: isabled;text-transform:uppercase;width:275;" value=''/> </td>
			                        </tr>
			    	</table>	
			    </div>
			</div>
			<!-- layout_wrap(E) -->
		<!-- layout_wrap(S) -->
	
		<div class="layout_wrap">
		    <div class="layout_vertical_2" style="width:575px !important;">
		        <!-- opus_design_grid(S) -->
		        <div class="opus_design_grid">
		            <script type="text/javascript">comSheetObject('sheet2');</script>
		        </div>
		        <!-- opus_design_grid(E) -->
		    </div>
		    <div class="layout_vertical_2" style="width:50px; text-align: center;">
		        	<button type="button" class="btn_right" onclick="doWork('ADD')" ></button>
		    </div>
		    <div class="layout_vertical_2" style="width:575px !important;">
		        <!-- opus_design_grid(S) -->
		        <div class="opus_design_grid">
		            <script type="text/javascript">comSheetObject('sheet3');</script>
		            <script type="text/javascript">comSheetObject('sheet4');</script>
		        </div>
		        <!-- opus_design_grid(E) -->
		    </div>
		</div>
		<!-- layout_wrap(E) -->
	</div>					
    </div>
    <script type="text/javascript">
    doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
	</script>		
<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
</div>
</form>

