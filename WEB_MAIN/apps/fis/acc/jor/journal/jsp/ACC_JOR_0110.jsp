<%--
=========================================================
*@FileName   : ACC_JOR_0110.jsp
*@FileTitle  : Outstanding House B/L(Ocean Import)
*@Description: Outstanding House B/L(Ocean Import)
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 12/23/2011
*@since      : 12/23/2011

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/acc/jor/journal/script/ACC_JOR_0110.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript">
		var sysOfcCd = "<bean:write name="valMap" property="sysOfcCd"/>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		function setupPage(){
		    loadPage();
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
			    getBtnObj("pdfDowns").style.display = 'inline';
			}
		}
	</script>
<form name="frm1" method="POST" action="./">
	<!-- Report Value -->
	<input type="hidden" name="file_name"/>
	<input type="hidden" name="rd_param"/>
	<input type="hidden" name="title"/>
	
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" class="btn_accent" id = "pdfDowns"  style="display:none;" onclick="pdfDown('Print')"><bean:message key="PDF_download"/></span>
		   <button type="button" class="btn_accent" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('Print')"><bean:message key="Print"/></button>
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
               		<col width="157">
               		<col width="135">
               		<col width="*">
               	</colgroup>
               	<tbody>
				 	<tr>
						<th><bean:message key="Mode"/></th>
						<td> 
							<select name="s_biz_clss_cd" style="width:115px;"> 
						 		<option value="">All</option>
						 		<option value="M">OIM</option>
						 		<option value="H">OIH</option>
						 	</select>
						 </td>
					</tr>
	              	<tr>
	                	<th><bean:message key="Select_Customer"/><br/>or <bean:message key="Final_Warehouse"/></th>
	                	<td><input type="radio" name="f_cust_fwh_radio" id="f_cust_fwh_radio1" class="radio_select" onclick="custFwhChange('cust');" checked><label for="f_cust_fwh_radio1"><bean:message key="Customer"/></label></td>
	                	<td><input type="radio" name="f_cust_fwh_radio" id="f_cust_fwh_radio2" class="radio_select" onclick="custFwhChange('fwh');"><label for="f_cust_fwh_radio2"><bean:message key="Final_Warehouse"/></label></td>
	              	</tr>
	             </tbody>
            </table>
			<table>
				<colgroup>
               		<col width="157">
               		<col width="*">
               	</colgroup>
               	<tbody>
					<tr><td colspan="2"></td></tr>	
	                <tr>
	                  <th width="150px">Select <span id="cust_fwh_span"><bean:message key="Customer"/></span><br/>&nbsp;&nbsp;&nbsp;&nbsp;(<bean:message key="Blank_for_All"/>)</th>
			          <td>
			          	  <input type="text" name="s_cust_trdp_cd" maxlength="20" value="" onKeyDown="codeNameAction('cust_trdpcode',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('cust_trdpcode',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" class="search_form"><!-- 
			           --><button type="button" class="input_seach_btn ir" onClick="doWork('CUST_TRDP_POPLIST')"></button><!-- 
			           --><input type="text" name="s_cust_trdp_nm" maxlength="100" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:147px" onKeyPress="if(event.keyCode==13){doWork('CUST_TRDP_POPLIST_NAME');}" class="search_form-disable" readonly>
					  </td>
	               </tr>
	               <tr><td colspan="2"></td></tr>
	               <tr>
	                   	<th><bean:message key="Agent_Name"/><br/>&nbsp;&nbsp;&nbsp;&nbsp;(<bean:message key="Blank_for_All"/>)</th>
	             		<td>
							<input type="text" name="s_agt_trdp_cd" maxlength="20" value="" onKeyDown="codeNameAction('agt_trdpcode',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('agt_trdpcode',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" class="search_form"><!-- 
	             		 --><button type="button" class="input_seach_btn ir" onClick="doWork('AGT_TRDP_POPLIST')"></button><!-- 
	             		 --><input type="text" name="s_agt_trdp_nm" maxlength="50" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:147px" onKeyPress="if(event.keyCode==13){doWork('AGT_TRDP_POPLIST_NAME');}" class="search_form-disable" readonly>
						</td>
	               </tr>
	                <tr><td colspan="2"></td></tr>
					<tr>
							<th><bean:message key="Branch"/></th>
							<td> 
							 <select name="s_ofc_cd" style="width:115px;"> 
							 <bean:define id="officeList" name="valMap" property="officeList"/> 
							 <bean:size id="len" name="officeList" /> 
							 <logic:greaterThan name="len" value="1"> 
							 	<option value=''>ALL</option> 
							 </logic:greaterThan> 
							 <logic:iterate id="ofcVO" name="officeList"> 
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
							<th><bean:message key="Move_Type"/></th>
							<td> 
							 <select name="s_fm_svc_term_cd" style="width:115px;" onchange="svcTermChange();"> 
							 <option value="">All</option> 
							 <bean:define id="serviceList" name="valMap" property="serviceList"/> 
							    <logic:iterate id="serviceVO" name="serviceList"> 
							    	<option value='<bean:write name="serviceVO" property="cd_val"/>'><bean:write name="serviceVO" property="cd_nm"/></option> 
							    </logic:iterate> 
							 </select><!-- 
							 --><span class="dash">~</span><!-- 
							 --><select name="s_to_svc_term_cd" style="width:115px;"> 
							 <option value="">All</option> 
							 <bean:define id="serviceList" name="valMap" property="serviceList"/> 
							    <logic:iterate id="serviceVO" name="serviceList"> 
							    	<option value='<bean:write name="serviceVO" property="cd_val"/>'><bean:write name="serviceVO" property="cd_nm"/></option> 
							    </logic:iterate> 
							 </select> 
							 </td>
						</tr>
					</tbody>
				</table>
				<table>
					<colgroup>
                		<col width="150">
                		<col width="170">
                		<col width="*">
                	</colgroup>
                	<tbody>
						<tr>
							<th><bean:message key="Period"/></th>
							<td><bean:message key="Post_Date"/> From&nbsp;&nbsp;&nbsp;<input required type="text" name="per_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.per_enddt);firCalFlag=false;" style="width:70px;" maxlength="10" class="search_form"></td>
							<td><!-- 
							 -->To&nbsp;&nbsp;&nbsp;<input required type="text" name="per_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.per_strdt, this);firCalFlag=false;" style="width:70px;" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar ir" id="per_dt_cal" onclick="doDisplay('DATE11', frm1);"></button><!-- 
							 --></td>
						</tr>
					</tbody>
				</table>
				<table>
					<colgroup>
                		<col width="150">
                		<col width="135">
                		<col width="135">
                		<col width="135">
                		<col width="*">
                	</colgroup>
                	<tbody>
						<tr>
							<td></td>
							<td><input type="radio" name="f_per_radio" id="f_per_radio1" value="POST" class="radio_select" checked><label for="f_per_radio1"><bean:message key="Posting_Date"/></label></td>
							<td><input type="radio" name="f_per_radio" id="f_per_radio2" value="ETD" class="radio_select"><label for="f_per_radio2"><bean:message key="ETD"/></label></td>
							<td><input type="radio" name="f_per_radio" id="f_per_radio3" value="ETA" class="radio_select"><label for="f_per_radio3"><bean:message key="ETA"/></label></td>
							<td><input type="radio" name="f_per_radio" id="f_per_radio4" value="FETA" class="radio_select"><label for="f_per_radio4"><bean:message key="F_ETA"/></label></td>
						</tr>
						<tr>
							<th><bean:message key="Report_Type"/></th>
	                        <td><input name="f_rpt_tp_1" id="f_rpt_tp_1" type="checkbox" value="O" class="radio_select"><label for="f_rpt_tp_1"><bean:message key="Original_BL"/></label></td>
	                        <td><input name="f_rpt_tp_2" id="f_rpt_tp_2" type="checkbox" value="R" class="radio_select"><label for="f_rpt_tp_2"><bean:message key="Release"/></label></td>
	                        <td><input name="f_rpt_tp_3" id="f_rpt_tp_3" type="checkbox" value="P" class="radio_select"><label for="f_rpt_tp_3"><bean:message key="Payment"/></label></td>
	                        <td>
	                        	<button type="button" class="btn_etc" onclick="doWork('ALL')"><bean:message key="All"/></button><!-- 
	                        --><button type="button" class="btn_etc" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button>
	                        </td>
						</tr>
					</tbody>
				</table>
		</div>
	</div>
<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
</div>
</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>


