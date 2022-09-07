<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : EDI_CSTM_0010.jsp
*@FileTitle  : 항공수출 국내세관 화물적화목록 EDI 처리
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/krcstm/script/EDI_CSTM_0010.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
		function setupPage(){
			initFinish();
			loadPage();
			doWork('SEARCHLIST01');
		}
		
		var cstmCd = ''; 
		var cstmNm = '';
		var cstmDptCd = ''; 
		var cstmDptNm = '';
	
		<logic:notEmpty name="EventResponse" property="mapVal">
			<bean:define id="mapObj" name="EventResponse" property="mapVal"/>
			
			<logic:notEmpty name="mapObj" property="cstm_cd">
				<bean:define id="cstmObj" name="mapObj" property="cstm_cd"/>
				cstmCd = '<bean:write name="cstmObj" property="cd_val"/>';
				cstmNm = '<bean:write name="cstmObj" property="cd_lbl"/>';

				<logic:notEmpty name="mapObj" property="cstm_dpt_cd">	
					<bean:define id="cstmDptObj" name="mapObj" property="cstm_dpt_cd"/>
					cstmDptCd = '<bean:write name="cstmDptObj" property="cd_val" />';
					cstmDptNm = '<bean:write name="cstmDptObj" property="cd_lbl"/>';
				</logic:notEmpty>	
			</logic:notEmpty>
			
			var EDI_STS_CD = '';
	        var EDI_STS_NM = '';
	        <% boolean isBegin = false; %>
			<logic:notEmpty name="mapObj" property="ediStatusList">
				<% isBegin = false; %>
				<bean:define id="ediStatusList"  name="mapObj" property="ediStatusList"/>
				<logic:iterate id="ediStatusVO" name="ediStatusList">
					<% if(isBegin){ %>
						EDI_STS_CD+= '|';
						EDI_STS_NM+= '|';
					<% }else{
						  isBegin = true;
					   } %>
					   EDI_STS_CD+= '<bean:write name="ediStatusVO" property="cd_val"/>';
					   EDI_STS_NM+= '<bean:write name="ediStatusVO" property="cd_nm"/>';
				</logic:iterate>		
			</logic:notEmpty>
		</logic:notEmpty>
		
	</script>
<form name="frm1" method="POST" action="./">
    <input type="hidden" name="f_cmd" />
	<input type="hidden" name="f_edi_sts" id="f_edi_sts" />
    <input type="hidden" name="f_edi_cre_seq" id="f_edi_cre_seq" />
	<input type="hidden" name="f_edi_msg_seq" id="f_edi_msg_seq" />
    <input type="hidden" name="f_edi_msg_no" id="f_edi_msg_no" />
    <input type="hidden" name="f_mbl_no" id="f_mbl_no" />
    <input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq" />
	<input type="hidden" name="obdt_fltno" id="obdt_fltno" />
	
	 <div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
			   <%-- 
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')"><bean:message key="Search"/></button> 
			   <button type="button" class="btn_normal"  onclick="doWork('CALLCT')"><bean:message key="CTradeWorld"/></button>
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
	
	<!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->	
		    <table>
		        <colgroup>
		        	<col width="90">
		        	<col width="90">
		        	<col width="90">
		        	<col width="*">
		        </colgroup>
		        <tbody>
					<tr>
						<th><bean:message key="Onboard_Date"/></th>
						<td>
		                    <input type="text" name="f_obdt_str_dt" id="f_obdt_str_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_obdt_end_dt);firCalFlag=false;"/>~ <!--  
		                     --><input type="text" name="f_obdt_end_dt"  id="f_obdt_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_obdt_str_dt, this);firCalFlag=false;"/><!-- 
		                     --><button type="button" class="calendar" tabindex="-1" name="f_obdt_dt_cal" id="f_obdt_dt_cal"  onclick="doDisplay('DATE1', frm1);"></button>
						</td>
		                <th><bean:message key="Flight_No"/></th>
		                <td>
		                    <input type="text" name="f_flt_no" id="f_flt_no" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;">
		                </td>
             		 </tr>
		        </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->	
	
	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable" style="width:1280px !important;">
			 <script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="layout_wrap">
	    	<div class="layout_vertical_2" style="width:600px">
				<div class="opus_design_inquiry wFit">
					<h3 class="title_design"><bean:message key="EDI_Result_Detail"/></h3>
					<table>
					<!-- 2016.04.12 C.W.Park Modified -->
				        <colgroup>
				        	<col width="90">
				        	<col width="170">
				        	<col width="90">
				        	<col width="*">
				        </colgroup>
				        <tbody>
							<tr>
		                         <th><bean:message key="EDI_Number"/></th>
		                         <td>
									<div id="ediView">
										<select name="sndKeyList" id="sndKeyList" style="width:125px;"></select><!-- 
										 --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="showEdiMsg();"></button><!-- 
										 --><input type="hidden" name="disp_edi_msg_no" id="disp_edi_msg_no" style="width:120px" class="search_form-disable">
									</div>
		                         </td>
		                         <th><bean:message key="상태"/></th>
		                         <td>
		                             <input type="text"   name="disp_edi_sts"  id="disp_edi_sts" style="width:125px" class="search_form-disable" readonly><!-- 
									  --><input type="hidden" name="cur_edi_sts" id="cur_edi_sts">
		                         </td>
		                     </tr>
		               </tbody>
		        	</table>
		        	<table>
		        	    <colgroup>
				        	<col width="90">
				        	<col width="170">
				        	<col width="90">
				        	<col width="*">
				        </colgroup>
				        <tbody>
		                     <tr>
		                         <th><bean:message key="OB_Date"/></th>
		                         <td>
		                             <input type="text" name="disp_workday" id="disp_workday" style="width:120px" class="search_form-disable" readonly>
		                         </td>
		                         <th><bean:message key="전송일자"/></th>
		                         <td>
		                             <input type="text" name="disp_smt_dt" id="disp_smt_dt" style="width:125px" class="search_form-disable" readonly>
		                         </td>
		                     </tr>
		               </tbody>
		         	</table>
		         	<table>
		         		<colgroup>
				        	<col width="90">
				        	<col width="170">
				        	<col width="90">
				        	<col width="*">
				        </colgroup>
				        <tbody>
		                     <tr>
		                         <th><bean:message key="편명"/></th>
		                         <td>
		                             <input type="text" name="disp_flt_no" id="disp_flt_no" style="width:120px" class="search_form-disable" readonly>
		                         </td>
		                         <th><bean:message key="세관"/></th>
		                         <td>
		                             <input type="text" name="disp_cstm_cd" id="disp_cstm_cd" style="width:50px"  class="search_form" maxlength="3"  onKeyDown="if(window.event.keyCode==13){codeNameAction('OFC_CD',this, 'onKeyDown');}" onblur="codeNameAction('OFC_CD',this, 'onBlur')"><!-- 
		                              --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="getCode(this, true);"></button><!-- 
		                              --><input type="text" name="disp_cstm_nm"  id="disp_cstm_nm" style="width:100px" class="search_form-disable" readonly>
		                         </td>
		                     </tr>
		                </tbody>
		          	</table>
		          	<table>
		          		<colgroup>
				        	<col width="90">
				        	<col width="170">
				        	<col width="90">
				        	<col width="*">
				        </colgroup>
				        <tbody>
		                     <tr>
		                         <th><bean:message key="Deconsol"/></th>
		                         <td>
		                             <input type="text" name="disp_decnsl_cmp_cd" id="disp_decnsl_cmp_cd" style="width:120px" class="search_form-disable" maxlength="4" readonly>
		                         </td>
		                         <th><bean:message key="세관부서"/></th>
		                         <td>
		                             <input type="text" name="disp_cstm_dept_cd" id="disp_cstm_dept_cd" style="width:50px"  class="search_form"  maxlength="3" onKeyDown="if(window.event.keyCode==13){codeNameAction('SUB_OFC_CD',this, 'onKeyDown');}" onblur="codeNameAction('SUB_OFC_CD',this, 'onBlur')"><!-- 
		                          --><button type="button" class="input_seach_btn" tabindex="-1" onclick="getCode(this, false);"></button><!-- 
		                          --><input type="text" name="disp_cstm_dept_nm" id="disp_cstm_dept_nm" style="width:100px" class="search_form-disable" readonly>
		                         </td>
		                     </tr>
						</tbody>
					</table>             
				</div>
			</div>	
			<div class="layout_vertical_2" style="padding-left:8px;width:calc(100% - 608px)">
		    	<div id="disp_val_msg" style="width:665px;float:left!important;">
					<div class="layout_flex_fixed" style="width:770px;float:left!important">
				   		<h3 class="title_design"><bean:message key="Validation_Message"/></h3>
					</div>
					<table>
			 			<tr>
			 				<td>
			 					<textarea name="val_msg" cols="200" rows="8"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
			 				</td>
			 				<!-- td valign="top"" style="padding: 5px;">
			 					<button onClick="disp_val_msg.style.display='none';" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Close"/></button>		
			 				</td -->
			 			</tr>
			 		</table>
				</div>
			</div>
		</div>
		<div class="opus_design_grid" id="mainTable" style="width:1280px !important;">
			<div class="opus_design_btn">
				<button class="btn_normal" type="button" onclick="doWork('COMMAND01')" id="btn1" style="display:none;"><bean:message key="전송자료_생성"/></button>
				<span id="btn2" style="display:none;">
					<button class="btn_normal" type="button"  onclick="doWork('COMMAND02')"><bean:message key="전송자료_생성"/></button><!-- 
					 --><button class="btn_normal" type="button"  onclick="doWork('COMMAND03')"><bean:message key="Delete"/></button><!-- 
					 --><button class="btn_normal" type="button"   onclick="doWork('COMMAND04')"><bean:message key="EDI_Send"/></button>
				</span>
				<span  id="btn3" style="display:none;">
					<button class="btn_normal" type="button"  onclick="doWork('COMMAND02')"><bean:message key="전송자료_생성"/></button><!-- 
					--><button class="btn_normal" type="button"  onclick="doWork('COMMAND06')"><bean:message key="EDI_Resend"/></button>
				</span>
			</div>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
	<!-- grid_area(E) -->	  
</div>
</form>
<script type="text/javascript">
<%-- 	doBtnAuthority("<%=roleBtnVO.getAttr_extension()%>"); --%>
</script>	
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
</script>

