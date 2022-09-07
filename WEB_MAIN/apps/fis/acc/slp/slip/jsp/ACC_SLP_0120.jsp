<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0090.jsp
*@FileTitle  : G/L Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/17
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0120.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- #1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION -->	
	<script src="<%=CLT_PATH%>/js/common/jquery-3.2.1.min.js?ver=<%=CLT_JS_VER%>"></script>
	<script src="<%=CLT_PATH%>/js/common/multiple-select.js?ver=<%=CLT_JS_VER%>"></script>
	<link href="<%=CLT_PATH%>/js/common/multiple-select.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="accSlpCurr" name="valMap" property="accSlpCurr"/>
	<script>
	function setupPage(){
		loadPage();
	}
	accSlpJS = {
			proc_dt : '<bean:write name="accSlpCurr" property="proc_dt"/>',
			post_dt : '<bean:write name="accSlpCurr" property="post_dt"/>',
			ofcCd   : "<%=userInfo.getOfc_cd()%>",
			userId  : "<%=userInfo.getUsrid()%>",
			userNm  : "<%= userInfo.getUser_name() %>"
	}
	</script>

	<form name="frm1" method="POST" action="./PFM_MGT_0090.clt">
	<!--Command를 담는 공통 -->
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />
	<input type="hidden" name="file_name"/>
	<input type="hidden" name="rd_param"/>
	<input type="hidden" name="title"/>
	<div style="display:none;">
	<textarea name="rate_query"></textarea>
	</div>
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
				<div class="layout_flex_fixed" style="width:610px;float:left!important" >
				<div class="opus_design_inquiry sm" style="height:200px;">
						 <table>	
							<colgroup>
						        	<col width="150px">
						        	<col width="*">
						   </colgroup>
						        <tbody>   
						             <tr>
				                    	<th align="left"><bean:message key="Adjustment_Period"/></th>
				                    	 <td>
										</td>
		                        	</tr>
									<tr>
				                    	<th>&nbsp;</th>
				                    	<td>
				                    		<table>
		                        			<tr>
		                        				<td style="width:331px">
		                        					<table>
		                        						<tr>
		                        							<td width="150px"><bean:message key="Last_Processed_Month"/></td>
										            		<td>
										            			<input  type="text" name="s_lst_proc_mon" id="s_lst_proc_mon" dataformat="excepthan" style="width:75px;ime-mode:disabled;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" maxlength="10"  readOnly>
										            		</td>
		                        						</tr>
		                        						<tr>
		                        							<td><bean:message key="Processing_Month"/></td>
										            		<td>
										            			<input  type="text" name="s_proc_mon" id="s_proc_mon" dataformat="excepthan" style="width:75px;ime-mode:disabled;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="mkDateFormatType(this,event,true,1);firCalFlag=false;doWork('CURR_SEARCH');" maxlength="10" class="input1"><!--
										            			--><button type="button" class="calendar" tabindex="-1" id="f_dt_cal" onclick="doDisplay('DATE1', frm1.s_proc_mon);" ></button>
										            		</td>
		                        						</tr>
		                        						<tr>
		                        							<td><bean:message key="Branch"/></td>
										            		<td>
										            			<bean:define id="oficeList" name="valMap" property="ofcList"/>
										            			<select name="s_ofc_cd" id="s_ofc_cd" style="width:75px" onChange="changeOfc(this.value);">
																	<bean:size id="len" name="oficeList" />
										                            <logic:greaterThan name="len" value="1">
										                            	<option value=''></option>
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
				                   						<tr>
				                   							<td width="100px"><bean:message key="Currency"/></td>
				                   							<td>
																<select id="loc_curr_cd" name="loc_curr_cd" style="width:75px" disabled="disabled">
																	<bean:define id="paramCurrList"  name="valMap" property="currList"/> 
																	<option value=''></option>
																	<logic:iterate id="CurrVO" name="paramCurrList"> 
																		<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option> 
																	</logic:iterate> 
																</select>  
				                   							</td>
				                   						</tr>		                        							                        						
		                        					</table>
		                        				</td>
	                        				
		                        			</tr>
		                        		</table>
				                    	</td>
			                    	</tr>
							</tbody>
						</table>
				</div>
				<!-- div class="opus_design_inquiry sm">
					 <table>	
						<colgroup>
					        	<col width="150px">
					        	<col width="*">
					   </colgroup>
					        <tbody>   
					             <tr>
			                    	<th><bean:message key="Processing_Month"/></th>
			                    	<td>&nbsp;</td>
		                    	</tr>
		                    	<tr>
			                    	<th>&nbsp;</th>
			                    	<td>
			                    		<table>
		                        			<tr>
		                        				<td style="width:331px">
		                        					<table>
		                        						<tr>
		                        							<td width="150px"><input name="pfit_lss" id="pfit_lss1" value="E" type="radio" checked><label for="pfit_lss1"><bean:message key="Exchange_Profit_Loss"/></label></td>
		                        						</tr>
		                        						<tr>
		                        							<td width="150px"><input name="pfit_lss" id="pfit_lss2" value="M" type="radio" ><label for="pfit_lss2"><bean:message key="Miscellaneous_Profit_Loss"/></label></td>
		                        						</tr>
		                        					</table>
		                        				</td>
		                        			</tr>
	                        			</table>
		                    		</td>
		                    	</tr>
		                    </tbody>
		             </table>
		    	</div -->
				<div class="opus_design_inquiry sm" style="height:226px;">
					 <table>	
						<colgroup>
					        	<col width="150px">
					        	<col width="*">
					   </colgroup>
					        <tbody>   
					             <tr>
			                    	<th><bean:message key="Journal"/></th>
			                    	<td>&nbsp;</td>
		                    	</tr>
		                    	<tr>
			                    	<th>&nbsp;</th>
			                    	<td>
			                    		<table>
		                        			<tr>
												<td style="width:331px">
		                        					<table>
		                        						<tr>
		                        							<td width="150px"><bean:message key="Description"/></td>
										            		<td>
										            			<input class="search_form" type="text" name="desc" id="desc" value="<bean:write name="accSlpCurr" property="rmk"/>" onblur="strToUpper(this);" onKeyPress="ComKeyOnlyAlphabet('uppernum')"; dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" maxlength="20">									            			 
										            		</td>
		                        						</tr>
		                        						<tr>
		                        							<td><bean:message key="Voucher_No"/></td>
										            		<td>
										            			<input class="search_form" type="text" name="vchar_no" id="vchar_no" value="<bean:write name="accSlpCurr" property="vchr_no"/>" onblur="strToUpper(this);" onKeyPress="ComKeyOnlyAlphabet('uppernum')"; dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" maxlength="20">
										            		</td>
		                        						</tr>
		                        						<tr>
		                        							<td><bean:message key="Voucher_Type"/></td>
										            		<td>
											                	<bean:define id="vchrTpCdList" name="valMap" property="vchrTpCdList"/>
												                <html:select name="accSlpCurr" property="vchr_tp_cd" style="width:100px;">
												                    <option value=""></option>
												                    <html:options collection="vchrTpCdList" property="cd_val" labelProperty="cd_nm"/>
												                </html:select>			
										            		</td>
		                        						</tr>
		                        						<tr>
		                        							<td><bean:message key="Date"/></td>
										            		<td>
										            			<input  type="text" name="date_seq" id="date_seq" dataformat="excepthan" value="" style="width:75px;ime-mode:disabled;" onKeyPress="ComKeyOnlyNumber(this, '-')" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="mkDateFormatType(this,event,false,1);firCalFlag=false;" maxlength="10" class="input1"><!--
										            			--><button type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE1', frm1.date_seq);" ></button>
										            		</td>
		                        						</tr>
		                        					</table>
		                        				</td>
	                        				
		                        			</tr>
	                        			</table>
		                    		</td>
		                    	</tr>

		                    </tbody>
		             </table>
		    	</div>

				</div>
				<div style="padding-left:618px">
			    <div class="opus_design_inquiry sm" style="width:450px; ">
			    	<table>
			    		<colgroup>
				        	<col width="173">
				        	<col width="*">
				 		  </colgroup>
				        <tbody>
 	                        <tr>
 	                            <td><b><bean:message key="Exchange_Rate_Difference"/></b></td> 
 	                        </tr>
 	                        <tr>
                   			    <td style="width:331px">
                   					<table>
                   						<tr>
                   							<td width="100px"><bean:message key="To_Currency"/></td>
                   							<td>
												<select id="s_curr_cd" name="s_curr_cd" OnChange="doWork('CURR_SEARCH');" disabled="disabled" >
													<bean:define id="paramCurrList"  name="valMap" property="currList"/> 
													<option value=''></option>
													<logic:iterate id="CurrVO" name="paramCurrList"> 
														<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option> 
													</logic:iterate> 
												</select>  
                   							</td>
                   						</tr>
                   						
                   					</table>
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
</div>
	<!-- inquiry_area(E) -->	
</form>
