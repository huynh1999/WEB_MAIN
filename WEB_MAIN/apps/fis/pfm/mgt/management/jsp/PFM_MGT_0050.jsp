<%-- 
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :PFM_MGT_0050.jsp
*@FileTitle  : Sales Volume Report
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 --> 
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0050.js?ver=<%=CLT_JS_VER%>" />
	
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId 		= userInfo.getUsrid();
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
		var usrId = "<%=usrId%>";
	</script>
<form name="frm1" method="POST" action="./PFM_MGT_0050.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />

	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />
	
	<!-- Batch Performance LKH 2015.01.28 -->
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/> 

	<input type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>" />
	<input type="hidden" name="f_email" id="f_email" value="<%= email %>" />
	<input type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= ofc_cd %>" />
	<input type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>" />

	<input type="hidden" name="rpt_tp_opt" id="rpt_tp_opt" />
	<input type="hidden" name="rpt_sub_opt" id="rpt_sub_opt" />
	
	<input type="hidden" name="rpt_tp_opt_col">
	<input type="hidden" name="rpt_sub_opt_col">
	<input type="hidden" name="rpt_tp_opt_nm_col">
	<input type="hidden" name="rpt_sub_opt_nm_col">
	
	<input type="hidden" name="f_dptm_val">

	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
	       <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button style="cursor:hand; display:none;" type="button" id = "pdfDowns" class="btn_accent" onclick="pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span>
	       <button id="btnPrint" style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button>
		   <button type="button" style="cursor:hand; display:none;" btnAuth="CLEAR" class="btn_normal" onclick="doWork('ALLCLEAR')"><bean:message key="Clear"/></button>
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
			    <div class="layout_vertical_2" style="width:600px !important;">
			    	<table>
			    		<colgroup>
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
			    			<tr>
			    				<tr><td colspan="3"><label style="background-color:#d4f6ff;"><b><bean:message key="Department_Type"/></b></label></td>
			    				<td style="align:right"><button type="button" class="btn_etc " onclick="doWork('ALL')"><bean:message key="All"/></button><button type="button" class="btn_etc" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button></td>
			    			</tr>
			    			<tr>
				                <td><input name="s_oi_dptm_flg" id="s_oi_dptm_flg" type="checkbox" value="SI" ><label for="s_oi_dptm_flg"><bean:message key="Ocean_Import"/></label></td>
				                <td><input name="s_oe_dptm_flg" id="s_oe_dptm_flg" type="checkbox" value="SO" ><label for="s_oe_dptm_flg"><bean:message key="Ocean_Export"/></label></td>
				                <td><input name="s_ai_dptm_flg" id="s_ai_dptm_flg" type="checkbox" value="AI" ><label for="s_ai_dptm_flg"><bean:message key="Air_Import"/></label></td>
				                <td><input name="s_ae_dptm_flg" id="s_ae_dptm_flg" type="checkbox" value="AO" ><label for="s_ae_dptm_flg"><bean:message key="Air_Export"/></label></td>
	                        </tr>
	                        <!-- #52497 -->
	                        <tr>
			    				<tr><td colspan="3"><label style="background-color:#d4f6ff;"><b><bean:message key="Sales_Type"/></b></label></td>
			    				<td></td>
			    			</tr> 		  					
			    			<tr> 
                   				<td><input type="checkbox" name="s_sales_type_y" id="s_sales_type_y" value="Y" ><label for="s_sales_type_y"><bean:message key="NOMI"/></label></td>
                   				<td><input type="checkbox" name="s_sales_type_n" id="s_sales_type_n" value="N" ><label for="s_sales_type_n"><bean:message key="FREE"/></label></td>
                   				<td><input type="checkbox" name="s_sales_type_c" id="s_sales_type_c" value="C" ><label for="s_sales_type_c"><bean:message key="CO_LOAD"/></label></td> 
                   				<td></td>
			    			</tr>
	                        
			    		</tbody>
			    	</table>
			    </div>
			    <div class="layout_vertical_2">
			    	<table>
			    		<colgroup>
			    			<col width="80" />
			    			<col width="80" />
			    			<col width="80" />
			    			<col width="80" />
			    			<col width="80" />						
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
			    			<tr>
			    				<th><bean:message key="Option"/></th>
			    				<td><input type="radio" name="s_prn_opt" id="s_prn_opt1" value="S" checked="checked" ><label for="s_prn_opt1"><bean:message key="Summary"/></label></td>
                   				<td><input type="radio" name="s_prn_opt" id="s_prn_opt2" value="D" ><label for="s_prn_opt2"><bean:message key="Detail"/></label></td>
                   				<td colspan="3"><input type="radio" name="s_prn_opt" id="s_prn_opt3" value="M" ><label for="s_prn_opt3"><bean:message key="Month"/></label></td>
			    			</tr>
			    			<tr>
			    				<th><bean:message key="Sort_By"/></th>
			    				<td><input type="radio" name="s_sort_opt" id="s_sort_opt1" value="1" checked="checked" ><label for="s_sort_opt1"><bean:message key="Report_Type"/></label></td>
                   				<td><input type="radio" name="s_sort_opt" id="s_sort_opt2" value="2" ><label for="s_sort_opt2"><bean:message key="TEU"/></label></td>
                   				<td><input type="radio" name="s_sort_opt" id="s_sort_opt3" value="3" ><label for="s_sort_opt3"><bean:message key="CBM"/></label></td>
                   				<td><input type="radio" name="s_sort_opt" id="s_sort_opt5" value="5" ><label for="s_sort_opt5"><bean:message key="G_Weight"/></label></td>
                   				<td><input type="radio" name="s_sort_opt" id="s_sort_opt6" value="6" ><label for="s_sort_opt6"><bean:message key="Chargeable_Weight"/></label></td>
			    			</tr> 	    			
			    		</tbody>
			    	</table>	
			    </div>
			</div>
			<table class="line_bluedot"><tr><td></td></tr></table>
			<!-- layout_wrap(E) -->
			<div class="layout_wrap">
			    <div class="layout_vertical_2" style="width:600px !important;">
			    	<table>
			    		<colgroup>
			    			<col width="50" />
			    			<col width="130" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
			    			<tr>
			    				<th style="text-align: left;"><bean:message key="Period"/></th>
	                            <td>
	                            	<select name="s_dt_clss_cd">
		                                <option value="PDT"><bean:message key="Posting_Date"/></option>
		                                <option value="ETD">Port of Loading ETD</option>
		                                <option value="ETA">Port of Discharging ETA</option>
		                                <option value="MBL">MBL Create Date</option>
	                               </select>
	                            </td>
	                            <td><!-- 
									 --><input type="text" name="s_prd_strdt" dataformat="excepthan" style="ime-mode:disabled;width: 70px;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form"><!-- 
										--><span class="dash">~</span><!-- 
									 --><input type="text"  name="s_prd_enddt" dataformat="excepthan" style="ime-mode:disabled;width: 70px;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form"><!-- 
									 --><button type="button" id="s_prd_dt_cal" name="s_prd_dt_cal" class="calendar ir"  onclick="doDisplay('DATE11', frm1);"></button><!-- 
								--></td>
			    			</tr>
			    		</tbody>
			    	</table>
			    	<table class="mar_top_8">
			    		<colgroup>
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
				    		<tr>
						    			<th style="text-align: left;"><bean:message key="Report_Type"/></th>
						    			<td colspan="3"></td>
				    		</tr>
			    			<tr>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt1" value="1" checked="checked" ><label for="s_rpt_tp_opt1"><bean:message key="Ref_No"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt3" value="3" ><label for="s_rpt_tp_opt3"><bean:message key="HBL_HAWB_No"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt5" value="5" ><label for="s_rpt_tp_opt5"><bean:message key="Agent"/></label>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt13" value="13" ><label for="s_rpt_tp_opt13"><bean:message key="Account_Group_ID"/></label></td>
                          			</tr>
                          			<tr>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt6" value="6" ><label for="s_rpt_tp_opt6"><bean:message key="Shipper"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt8" value="8" ><label for="s_rpt_tp_opt8"><bean:message key="Consignee"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt10" value="10" ><label for="s_rpt_tp_opt10"><bean:message key="Customer"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt7" value="7" ><label for="s_rpt_tp_opt7"><bean:message key="Carrier"/></label></td>
                          			</tr>
                          			<tr>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt9" value="9" ><label for="s_rpt_tp_opt9"><bean:message key="POL"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt11" value="11" ><label for="s_rpt_tp_opt11"><bean:message key="POD"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt14" value="14" ><label for="s_rpt_tp_opt14"><bean:message key="DEL"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt2" value="2" ><label for="s_rpt_tp_opt2"><bean:message key="F_Dest"/></label></td> 
                          			</tr>
                          			<tr>
                          			    <td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt4" value="4" ><label for="s_rpt_tp_opt4"><bean:message key="Sales_Person"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt12" value="12" ><label for="s_rpt_tp_opt12"><bean:message key="Operator"/></label></td>
                          				<td><input type="radio" name="s_rpt_tp_opt" id="s_rpt_tp_opt17" value="17" ><label for="s_rpt_tp_opt17"><bean:message key="Team"/>/<bean:message key="Operator"/></label></td>
                          				<td></td>             				
                          			</tr>
                          		</tbody>
                          	</table>
                          	<table class="mar_top_8">
                          		<colgroup>
                          			<col width="50">
                          			<col width="165">
                          			<col width="*">
                          		</colgroup>
                          		<tbody>
			                        <tr>
			                            <th style="text-align: left;"><bean:message key="Select"/></th>
			                            <td colspan="2"><input name="s_sel_val"  id="s_sel_val" type="text" class="search_form" dataformat="excepthan" style="ime-mode: isabled;text-transform:uppercase;width:285px;" value=''/></td>
			                        </tr>
			                        <tr>
			                            <th style="text-align: left;"><bean:message key="Office"/></th>
			                            <td>
			                            	<bean:define id="oficeList" name="valMap" property="ofcList"/>
				                            <select name="s_ofc_cd" style="width:155px;"/>
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
			                            <td><input name="s_grp_by_ofc_flg" id="s_grp_by_ofc_flg" type="checkbox" value=""><label for="s_grp_by_ofc_flg"><bean:message key="Group_by_Office"/></label></td>	
			                        </tr>
			                      </tbody>
			    	</table>
			    </div>
			    <div class="layout_vertical_2">
			    	<table>
			    		<colgroup>
			    			<col width="70" />
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="120" />
			    			<col width="*" />
			    		</colgroup>
			    		<tbody>
			    					<tr>
			    						<td colspan="4"></td>
						    			<td>
						    			<button type="button" class="btn_etc" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
						    			</td>
						    		</tr>
			    					<tr>
                          				<th style="text-align: left;"><bean:message key="Option"/></th>
                          				<td colpan="4"></td>
                          			</tr>
                          			<tr>
                          			    <!--2012.02.03순서 변경됨-->
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt0" value="" onClick="fRadio(this.value);" checked="checked" ><label for="s_rpt_sub_opt0">N/A</label></td>
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
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt14" value="2" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt14"><bean:message key="DEL"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt2" value="2" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt2"><bean:message key="F_Dest"/></label></td>
                          			</tr>
                          			<tr>	
                          				<td></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt4" value="4" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt4"><bean:message key="Sales_Person"/></label></td>
                          				<td><input type="radio" name="s_rpt_sub_opt" id="s_rpt_sub_opt12" value="12" onClick="fRadio(this.value);"><label for="s_rpt_sub_opt12"><bean:message key="Operator"/></label></td>
                          				<td></td>
                          				<td></td>
                          			</tr>
                          		</tbody>
                          	</table>
                          	<table class="mar_top_8">
                          		<colgroup>
                          			<col width="50">
                          			<col width="*">
                          		</colgroup>
                          		<tbody>
	                         		<tr>
			                            <th style="text-align: left;"><bean:message key="Select"/></th>
			                            <td><input name="s_sel_sub_val" id="s_sel_sub_val" readonly type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:275px;" value=''/></td>
			                        </tr>
			                    </tbody>
			    			</table>	
			    </div>
			</div>
			
			<div class="layout_wrap">
			    <div class="layout_vertical_2" style="width:575px !important;">
			        <!-- opus_design_grid(S) -->
			        <div class="opus_design_grid">
			            <script type="text/javascript">comSheetObject('sheet1');</script>
			        </div>
			        <!-- opus_design_grid(E) -->
			    </div>
			    <div class="layout_vertical_2" style="width:50px; text-align: center;">
			        	<button type="button" class="btn_right" onclick="doWork('ADD')" ></button>
			    </div>
			    <div class="layout_vertical_2" style="width:575px !important;">
			        <!-- opus_design_grid(S) -->
			        <div class="opus_design_grid">
			            <script type="text/javascript">comSheetObject('sheet2');</script>
			        </div>
			        <!-- opus_design_grid(E) -->
			    </div>
			</div>
			<!-- layout_wrap(E) -->
		</div>
	</div>
	
<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
</div>
</form>	

 <script type="text/javascript">
    doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
	</script>		


