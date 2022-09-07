<%--
=========================================================
*@FileName   : MGT_JOB_0020.jsp
*@FileTitle  : Job Visibility Summary
*@Description: Job Visibility Summary
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 02/11/2009
*@since      : 02/11/2009

*@Change history:
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/job/jobmgt/script/MGT_JOB_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage()
        {
			initFinish();
			loadPage();
        }
	</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="bkg_no" />
	<input type="hidden" name="SRNo_in" />
	<input type="hidden" name="Sr_no_in" />
	<input type="hidden" name="MasterBL_in" />
	<input type="hidden" name="intg_bl_seq_in"/>
	<input type="hidden" name="air_sea_clss_cd"/>
	<input type="hidden" name="bnd_clss_cd"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%-- 
		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onClick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
		   <button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onClick="doWork('NEW')"><bean:message key="New"/></button>
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
			<table>
				<colgroup>
					<col width="60">
					<col width="190">
					<col width="90">
					<col width="160">
					<col width="100">
					<col width="*">
				</colgroup>
				<tbody>
	              <tr>
	                  <th><bean:message key="Category"/></th>
	                  <td>
						<select required name="s_Category" style="width:154px;" onChange="fncCategory()">
							<option value="SO">Ocean Export</option>					
							<option value="SI">Ocean Import</option>				
							<option value="AO">Air Export</option>				
							<option value="AI">Air Import</option>	
						</select>
					  </td>
	                  <th><bean:message key="Template_List"/></th>
	                  <td>
	                      <select name="s_TemplateList" style="width:160px;" onChange="fncTempletList()">
	                          <option value=""></option>
	                      </select>
	                  </td>
					  <th><bean:message key="Current_Step"/></th>
	                  <td>
	                      <select name="s_CurrentStep" style="width:229px;">
	                          <option value=""></option>
	                      </select>
	                  </td>
	              </tr>
	            </tbody>
          </table>
          <table>
          		<colgroup>
          			<col width="60">
          			<col width="198">
          			<col width="80">
          			<col width="75">
          			<col width="80">
          			<col width="75">
          			<col width="50">
          			<col width="*">
          		</colgroup>
          		<tbody>
               <tr>
                   <th><bean:message key="Recv_DT"/></th>
                   <td><!-- 
                    --><input required name="s_recvDt_fm" id="s_recvDt_fm" type="text" class="search_form" maxlength="10" dataformat="excepthan" style="width:70px;ime-mode:disabled" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
                    --><span class="dash">~</span><!-- 
                    --><input required name="s_recvDt_to" id="s_recvDt_to" type="text" class="search_form" maxlength="10" dataformat="excepthan" style="width:70px;ime-mode:disabled" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"><!-- 
                    --><button type="button" class="calendar" tabindex="-1" id="s_recvDt_cal" onclick="doDisplay('DATE11', frm1);"></button><!-- 
                    --></td>
                   <th><label style="background-color:#d4f6ff;"><bean:message key="Job_Status"/></label></th>
                   <td><!-- 
                    --><input type="radio"  name="s_job_status" id="s_job_status1" value="" checked><label for="s_job_status1">All</lable> <input type="radio" name="s_job_status" id="s_job_status2" value="Delay"><label for="s_job_status2"><bean:message key="Delay"/></label><!-- 
                    --><input type="hidden" name="s_job_status_in">	<!-- 
                    --></td>
                   <th><label style="background-color:#d4f6ff;"><bean:message key="BL_Status"/></label></th>
                   <td><!-- 
                    --><input type="radio" name="s_bl_status" id="s_bl_status1" value="" checked><label for="s_bl_status1"><bean:message key="All"/></label> <input type="radio" name="s_bl_status" id="s_bl_status2" value="Processing"><label for="s_bl_status2"><bean:message key="Processing"/></label><!-- 
                    --><input type="hidden" name="s_bl_status_in"/><!-- 
                    --></td>
                   <th><bean:message key="Office"/></th>
                   <td> 
                    <logic:notEmpty name="EventResponse"> 
                    <bean:define id="ofcMap"  name="EventResponse" property="mapVal"/> 
                    <bean:define id="oficeList" name="ofcMap" property="ofcList"/>
                    <select name="ofc_cd_in" required style="width:130px"> 
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
                    </logic:notEmpty> 
                    </td>
                    </tr>
                  </tbody>
                </table>
		</div>
	</div>
	<!-- wrap_result(S) -->
	<div class="wrap_result">
		<h3 class="title_design"><bean:message key="Summary"/></h3>
		<div class="opus_design_inquiry">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
	
<script language="javascript">
	var CNF_MSG1 = '<bean:message key="Do_you_want_to_run"/>';
	var PARAM1_1 = '';
	var PARAM1_2 = '';
	var c_category = 1;
	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

    <!--Bound Class Code 코드조회-->
	<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	<logic:iterate id="codeVO" name="param1List">
		//document.frm1.s_Category.options[c_category++] = new Option('<bean:write name="codeVO" property="cd_nm"/>', '<bean:write name="codeVO" property="cd_val"/>');
    </logic:iterate>
</script>

