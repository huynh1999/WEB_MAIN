<%--
=========================================================
*@FileName   : EDI_CSTM_0050.jsp
*@FileTitle  : 해운수출 국내세관 화물적화목록 EDI 처리
*@Description: 해운수출 국내세관 화물적화목록 EDI 처리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 07/23/2009
*@since      : 07/23/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 28/07/2014
*@since      : 28/07/2014
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/krcstm/script/EDI_CSTM_0050.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript">
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
					cstmDptCd = '<bean:write name="cstmDptObj" property="cd_val"/>';
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
<script type="text/javascript">
<!--
function setupPage() {
	initFinish();
	loadPage();
	doWork('SEARCHLIST01');
}
//-->
</script>
<form name="frm1" method="POST" action="./">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd">
	<input type="hidden" name="f_edi_sts">
    <input type="hidden" name="f_edi_cre_seq">
	<input type="hidden" name="f_edi_msg_seq">
    <input type="hidden" name="f_edi_msg_no">
    <input type="hidden" name="f_mbl_no">
    <input type="hidden" name="f_intg_bl_seq">
	<input type="hidden" name="obdt_fltno">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
	   		<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')" id="btnSearch" name="btnSearch"><bean:message key="Search"/></button>
	   		<button type="button" class="btn_normal" onclick="doWork('CALLCT')"><bean:message key="CTradeWorld"/></button>
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
		<div class="opus_design_inquiry entry_pannel ">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
			<table>
				<colgroup>
					<col width="90"></col>
					<col width="190"></col>
					<col width="70"></col>
					<col width="220"></col>
					<col width="50"></col>
					<col width="120"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Onboard_Date"/></th>
						<td><!--
						--><input type="text" name="f_obdt_str_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_obdt_end_dt);firCalFlag=false;"/>~ <!--
						--><input type="text" name="f_obdt_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_obdt_str_dt, this);firCalFlag=false;"/><!--
						--><button type="button" id="f_obdt_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
						</td>
		                <th><bean:message key="선박코드"/></th>
		                <td><!--
						--><input type="text"   name="f_vsl_cd"    value='' onblur="vslCdSearch(this);" class="search_form" style="width:60px;"><!--
						--><input type="hidden" name="org_vsl_cd"  value=''><!--
						--><button type="button" class="input_seach_btn" tabindex="-1" id="trunkvessel" onClick="doWork('VSL_POP')"></button><!--
						--><input type="text" name="f_vsl_nm"  value='' class="search_form-disable" style="width:120px;" readonly>
		                </td>
		                <th><bean:message key="항차"/></th>
		                <td>
		                    <input type="text" name="f_flt_no" value='' class="search_form" style="width:120px;">
		                </td>
		                <td></td>
		              </tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
    	<div class="opus_design_grid"  style="width:1280px !important;" >
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
    	<div class="layout_wrap">
	    	<div class="layout_vertical_2" style="width:600px">
		    	<div class="opus_design_inquiry wFit">
		    		<h3 class="title_design"><bean:message key="EDI_Result_Detail"/></h3>
					<table>
						<colgroup>
							<col width="90"></col>
							<col width="170"></col>
							<col width="90"></col>
							<col width="*"></col>
						</colgroup>
						<tbody>
							<tr>
		                        <th><bean:message key="EDI_Number"/></th>
								<td>
									<div id="ediView">
								<!--
								--><select name="sndKeyList" style="width:125px;"></select><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onClick="showEdiMsg();"></button><!--
								--><input type="hidden" name="disp_edi_msg_no" style="width:120px" class="search_form-disable" readonly>
									</div>
								</td>
		                        <th><bean:message key="상태"/></th>
		                        <td>
		                            <input type="text"   name="disp_edi_sts" style="width:90px" class="search_form-disable" readonly>
									<input type="hidden" name="cur_edi_sts">
		                        </td>
		                    </tr>
		                    <tr>
		                        <th><bean:message key="OB_Date"/></th>
		                        <td>
		                            <input type="text" name="disp_workday" style="width:120px" class="search_form-disable" readonly>
		                        </td>
		                        <th><bean:message key="전송일자"/></th>
		                        <td>
		                            <input type="text" name="disp_smt_dt" style="width:125px" class="search_form-disable" readonly>
		                        </td>
		                    </tr>
		                    <tr>
		                        <th><bean:message key="선명"/></th>
		                        <td>
		                            <input type="text" name="disp_vsl_nm" style="width:120px" class="search_form-disable" readonly>
									<input type="hidden" name="disp_vsl_cd">	
		                        </td>
		                        <th><bean:message key="세관"/></th>
		                        <td><!--
								--><input type="text" name="disp_cstm_cd" style="width:50px"  class="search_form" maxlength="3"  onKeyDown="if(window.event.keyCode==13){codeNameAction('OFC_CD',this, 'onKeyDown');}" onblur="codeNameAction('OFC_CD',this, 'onBlur')"><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onClick="getCode(this, true);"></button><!--
								--><input type="text" name="disp_cstm_nm" style="width:100px" class="search_form-disable" readonly>
		                        </td>
		                    </tr>
							<tr>
		                         <th><bean:message key="항차"/></th>
		                         <td>
		                             <input type="text" name="disp_flt_no" style="width:120px" class="search_form-disable" readonly>
		                         </td>
		                         <th><bean:message key="세관부서"/></th>
		                         <td><!--
								--><input type="text" name="disp_cstm_dept_cd" style="width:50px"  class="search_form"  maxlength="3" onKeyDown="if(window.event.keyCode==13){codeNameAction('SUB_OFC_CD',this, 'onKeyDown');}" onblur="codeNameAction('SUB_OFC_CD',this, 'onBlur')"><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onClick="getCode(this, false);"></button><!--
								--><input type="text" name="disp_cstm_dept_nm" style="width:100px" class="search_form-disable" readonly>
		                         </td>
		                     </tr>
		                     <tr>
		                         <th><bean:message key="선사코드"/>/<bean:message key="선사"/></th>
		                         <td><!--
								--><input type="text" name="disp_lnr_cstm_cd"  style="width:50px"  class="search_form" maxlength="4">/<!--
								--><input type="text" name="disp_lnr_nm"       style="width:100px" class="search_form-disable" readonly>
		                         </td>
		                         <th><bean:message key="MRN"/></th>
		                         <td>
		                             <input type="text" name="disp_mrn" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:125px"  class="search_form"  maxlength="11"  >
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
			 					<textarea name="val_msg" cols="200" rows="10"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
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
				<span id="btn1"><button type="button" class="btn_normal" onclick="doWork('COMMAND01')"><bean:message key="전송자료_생성"/></button></span>
				<span id="btn2" style="display:none;"><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND02')"><bean:message key="전송자료_생성"/></button><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND03')"><bean:message key="Delete"/></button><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND04')"><bean:message key="EDI_Send"/></button>
				</span>
				<span id="btn3" style="display:none;">
						<button type="button" class="btn_normal" onclick="doWork('COMMAND02')"><bean:message key="전송자료_생성"/></button>
						<!-- 2016.04.14 C.W.Park Modified -->
						<button type="button" class="btn_normal" onclick="doWork('COMMAND06')"><bean:message key="EDI_Resend"/></button>
				</span>
			</div>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
    </div>
</div>
</form>
  
<script type="text/javascript">
<%-- doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>"); --%>
</script>	
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
</script>

