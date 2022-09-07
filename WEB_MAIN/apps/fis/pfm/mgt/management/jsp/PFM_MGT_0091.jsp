<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0091.jsp
*@FileTitle  : G/L Report 2
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0091.js?ver=<%=CLT_JS_VER%>" />
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_nm 		= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	<script>
		function setupPage()
		{
			javascript:loadPage();setSelect();
		}
		function setSelect(){
			var formObj = document.frm1;
			
			
		}

		var usrNm = "<%= usrNm %>";
	</script>
	<form name="frm1" method="POST" action="./PFM_MGT_0091.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />

	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />

	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>" id="f_usr_nm" />
	<input type="hidden" name="f_email" value="<%= email %>" id="f_email" />
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>" id="f_ofc_cd" />
	<input type="hidden" name="f_ofc_nm" value="<%= ofc_nm %>" id="f_ofc_nm" />
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>" id="f_cnt_cd" />

	<input type="hidden" name="tmp_range_fr" id="tmp_range_fr" value="<bean:write name="valMap" property="MIN_GL"/>">
	<input type="hidden" name="tmp_range_to" id="tmp_range_to" value="<bean:write name="valMap" property="MAX_GL"/>">
	
	<input type="hidden" name="all_range_fr" id="all_range_fr" value="<bean:write name="valMap" property="MIN_GL_ALL"/>">
	<input type="hidden" name="all_range_to" id="all_range_to" value="<bean:write name="valMap" property="MAX_GL_ALL"/>">
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><span id="title"><bean:message key="GL_Report"/></span></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" onclick="doWork('PRINT')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('ALLCLEAR')"><bean:message key="Clear"/></button>		
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
<div class="over_wrap" height="100%">
  	<div class= "wrap_search">
  		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<tbody>
					<colgroup>
						<col width="100" />
						<col width="100" />
						<col width="50" />
						<col width="*" />
					</colgroup>
						<tr>
                            <td colspan="4"><b><bean:message key="Period"/></b></td>
                        </tr>
                        <tr>
              				<th><bean:message key="From"/></th>
              				<td><!-- 
               				 	--><input type="text" name="f_fr_dt"  id="f_fr_dt" value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form"><!-- 
		            			--><button type="button" id="f_fr_dt_cal" name="f_fr_dt_cal" class="calendar ir" onclick="doDisplay('DATE1', frm1);"></button>
	            			</td>
		            		<th><bean:message key="To"/></th>
                   			<td><!-- 
                 				 --><input type="text" name="f_to_dt" id="f_to_dt" value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form"><!-- 
		            			 --><button type="button" id="f_dt_cal" name="f_dt_cal" class="calendar ir" onclick="doDisplay('DATE2', frm1);"></button>
		            		</td>
                        </tr>
				</tbody>
			</table>
			<table>
				<tbody>
					<colgroup>
						<col width="100" />
						<col width="150" />
						<col width="150" />
						<col width="*" />
					</colgroup>
							<tr>
	                            <td colspan="2"><b><bean:message key="Report_Type"/></b></td>
	                            <td>
	                            	<div class="opus_design_btn">
		                            	<button type="button" class="btn_etc" onclick="doWork('RPTCHECK')">ALL</button><!-- 
		                            	 --><button type="button" class="btn_etc" onclick="doWork('RPTCLEAR')"><bean:message key="Clear"/></button>
	                            	 </div>
	                            </td>
	                            <td></td>
	                        </tr>
                        	<tr>
								<td></td>
                   				<td><input type="checkbox" name="rpt_tp" id="rpt_tp" value="" checked><label for="rpt_tp"><bean:message key="Local_Invoice"/></label></td>
			            		<td><input type="checkbox" name="rpt_tp" id="rpt_tp2" value="" checked><label for="rpt_tp2"><bean:message key="Check"/></label></td>
	                            <td></td>
                     		</tr>
                     		<tr>
								<td></td>
                     			<td><input type="checkbox" name="rpt_tp" id="rpt_tp3" value="" checked><label for="rpt_tp3"><bean:message key="CRDR"/></label></td>
			            		<td><input type="checkbox" name="rpt_tp" id="rpt_tp4" value="" checked><label for="rpt_tp4"><bean:message key="Deposit"/></label></td>
	                            <td></td>
                     		</tr>
                     		<tr>
								<td></td>
                     			<td><input type="checkbox" name="rpt_tp" id="rpt_tp5" value="" checked><label for="rpt_tp5"><bean:message key="Account_Payable"/></label></td>
		            			<td><input type="checkbox" name="rpt_tp" value="" id="rpt_tp6" checked><label for="rpt_tp6"><bean:message key="Journal"/></label></td>
	                            <td></td>
                   			</tr>
                   			<tr>
								<td></td>
                    			<td><input type="checkbox" name="rpt_tp" id="rpt_tp7" value="" onClick="obexpenseChk();"><label for="rpt_tp7"><bean:message key="OB_Expense"/></label></td>
			            		<td colspan="2">
			            		</td>
                     		</tr>
                       		<tr>
								<td></td>
                   				<td id="exp_view_layer" style="display:none"><input type="checkbox" name="exp_ck" id="exp_ck" value="" onClick="expenseChk();"><label for="exp_ck"><bean:message key="AP_Expense"/></label></td>
                   				<td id="exp_none_layer">&nbsp;</td>
	                            <td></td>
                       		</tr>
                       			
                       		
				</tbody>
			</table>
			<table>
				<tbody>
					<colgroup>
						<col width="100" />
						<col width="220" />
						<col width="*" />
					</colgroup>
						<tr>
                            <td colspan="3"><b><bean:message key="GL_No"/></b></td>
                        </tr>
                        <tr>
	                        <th><bean:message key="Range"/></th>
	                        <td>
	                        	<input class="search_form" type="text" name="range_fr" value="<bean:write name="valMap" property="MIN_GL"/>" style="width:100px" >~ <!-- 
								 --><input class="search_form" type="text" name="range_to" value="<bean:write name="valMap" property="MAX_GL"/>" style="width:100px">
	                        </td>
	                        <td><input type="checkbox" name="gl_tp" id="gl_tp" value="" onClick="doRptTypeDisable();"><label for="gl_tp">By Billing Code</label></td>
                        </tr>
                        <tr>
             				<th><bean:message key="SubGroup"/></th>
			         		<td><input class="search_form" type="text" name="sub_grp" value="" style="width:100px" ></td>
			         		<td><input type="checkbox" name="gl_tp" id="gl_tp2" value="" onClick="swichChk();"><label for="gl_tp2">Other Operation Only</label></td>
             			</tr>
             			<tr>
             				<td colspan="2" ></td>
             				<td><input type="checkbox" name="gl_tp" id="gl_tp3" value="" onClick="swichChk2();"><label for="gl_tp3">Operation Only</label></td>
             			</tr>
            	</tbody>       
          </table>
          <table>
				<tbody>
					<colgroup>
						<col width="100" />
						<col width="100" />
						<col width="*" />
					</colgroup>
						<tr>
                            <td colspan="3"><b><bean:message key="SummaryDetail"/></b></td>
                        </tr>
                        <tr>
                        	<td></td>
                        	<td><input type="radio" name="sum_dtl" id="sum_dtl1" value="" checked><label for="sum_dtl1">Summary</label></td>
					        <td><input type="radio" name="sum_dtl" id="sum_dtl2" value=""><label for="sum_dtl2">Detail(Portrait)</label></td>
                        </tr>
                </tbody>        
         </table>      
	</div>
	<!-- opus_design_inquiry(E) -->
 	</div>
 	
</div>
</form>
             			
                

