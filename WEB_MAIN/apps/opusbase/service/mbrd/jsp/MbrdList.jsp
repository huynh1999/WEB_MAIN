<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MbrdList.jsp
*@FileTitle  : 게시판 목록 화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/25
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@ taglib uri="struts-bean"  prefix="bean"%>
<%@ taglib uri="struts-html"  prefix="html"%>
<%@ taglib uri="struts-logic" prefix="logic"%>
<%@ taglib uri="clt-rowset"   prefix="clt"%>
<%@ taglib uri="clt-writer"   prefix="wrt"%>
<%
	String CLT_PATH = "/opusfwd";  
	String CLT_MSG_PATH = "EN"; 
%>

	<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <!-- 일자 및 달력팝업 호출 -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/message.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/shortcut.js?ver=<%=CLT_JS_VER%>"></script>
		
		<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
		<script src="<%=CLT_PATH%>/js/common/jquery-3.2.1.min.js?ver=<%=CLT_JS_VER%>" type="text/javascript"></script>
	
	<script language="javascript" src="./apps/opusbase/service/mbrd/script/MbrdList.js?ver=<%=CLT_JS_VER%>"></script>	

	<script>
		<!--IBSheet-->
		var sTag = '<OBJECT ID="mySheet"  width="0" height="0" ';
		sTag += ' CLASSID="CLSID:DAB66ACA-49CD-41F2-89A0-8593DBB0C36C" ';
		sTag += ' CODEBASE="<%=CLT_PATH%>/web/sheet/IBSheet3N.CAB#version=3,4,0,369"> ';
		sTag += ' <param name="Visible" value="false"> ';
		sTag += ' <param name="UseUTF8" value="true"> ';
		sTag += ' <param name="AutoSizeMode" value="true"> ';
		sTag += '</OBJECT> ';
		document.write(sTag);
		function setupPage(){
			loadPage();
			initFinish();
			doWork('SEARCHLIST');
		}
	</script>
<form name="fName" method="POST">
    <input type="hidden" name="f_cmd"     value="">
    <input type="hidden" name="f_CurPage" value="">
    <input type="hidden" name="f_brd_seq" value="">
    
    <input type="hidden" name="pgm_seq" value="<bean:write name="tmpMapVal" property="f_pgm_id"/>">
    <input type="hidden" name="pgm_nm" value="<bean:write name="tmpMapVal" property="f_pgm_nm"/>">
    <input type="hidden" name="loc_url" value="<bean:write name="tmpMapVal" property="loc_url"/>">
    <input type="hidden" name="pgm_url" value="<bean:write name="tmpMapVal" property="pgm_url"/>">
	
    <input type="hidden" name="usrid" value="<bean:write name="tmpMapVal" property="usrid"/>">
    <input type="hidden" name="locl_usr_nm" value="<bean:write name="tmpMapVal" property="f_modi_eng_usr_nm"/>">
    
    <input type="hidden" name="s_kind" value="<bean:write name="tmpMapVal" property="s_kind"/>">	
    <div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><bean:message key="Project_Helpdesk"/></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" onclick="doWork('NEW');"><bean:message key="New"/></button><!-- 
		 --><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span>Home</span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- wrap_search (S) -->
	<div class="wrap_search">	
		<div class="opus_design_inquiry wFit ">
			<table>
				<colgroup>
					<col width="80"/>
					<col width="200"/>
					<col width="80"/>
					<col width="280"/>
					<col width="80"/>
					<col width="*"/>
				</colgroup>
				<tbody>
			        <tr>
					    <th><bean:message key="Kind"/></th>
					    <td><!-- 
					     --><bean:define id="paramKindList" name="tmpMapVal" property="kindList"/><!-- 
					     --><html:select name="tmpMapVal" property="f_kind" styleClass="search_form"  style="width:230px;text-align:left"><!-- 
					     	--><option value="">All</option><!-- 
					     --><html:options collection="paramKindList" property="cd_val" labelProperty="cd_nm"/>
						</html:select></td>  
			            <th><bean:message key="Reg_Date"/></th>
			            <td><!--
			            --><input type="text" name="f_dp_bgn_dt" id="f_dp_bgn_dt" value='<bean:write name="tmpMapVal" property="f_dp_bgn_dt"/>' dataformat="excepthan" style="width:100px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form">~ <!--
			            --><input type="text" name="f_dp_end_dt" id="f_dp_end_dt" value='<bean:write name="tmpMapVal" property="f_dp_end_dt"/>' dataformat="excepthan" style="width:100px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form"><!--
			            --><button type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE1', fName);"></button></td>
						<th><bean:message key="Due_Date"/></th>
			            <td><!--
			            --><input type="text" name="f_due_bgn_dt" id="f_due_bgn_dt" value='<bean:write name="tmpMapVal" property="f_due_bgn_dt"/>' dataformat="excepthan" style="width:100px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form">~ <!--
			            --><input type="text" name="f_due_end_dt" id="f_due_end_dt" value='<bean:write name="tmpMapVal" property="f_due_end_dt"/>' dataformat="excepthan" style="width:100px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form"><!--
			            --><button type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE2', fName);"></button></td>
			         </tr>
			         <tr>  
						<th><bean:message key="Program_Id"/></th>
						<td><!-- 
						 --><input type="text" name="f_pgm_id" maxlength="20" value='<bean:write name="tmpMapVal" property="f_pgm_id"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" onblur="pgmCodeAction('f_pgm_id', 'f_pgm_nm');"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('PROGRAM_POPLIST', 'I')"></button><!--  
						 --><input type="text"   name="f_pgm_nm" maxlength="50" value='<bean:write name="tmpMapVal" property="f_pgm_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:128px;">
						</td>	                            
	                     <th><bean:message key="User"/></th>
	                     <td><!-- 
	                      --><input type="text" name="f_modi_usrid" onkeypress="isAlphaNum();" maxlength="30" value='<bean:write name="tmpMapVal" property="f_modi_usrid"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;"><!-- 
	                      --><input type="text" name="f_modi_eng_usr_nm" onkeypress="isAlphaNum();" maxlength="50"  value='<bean:write name="tmpMapVal" property="f_modi_eng_usr_nm"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;"><!-- 
	                      --></td>
					  </tr>
				</tbody>
		   </table>
		</div>
	</div>
   <div class="wrap_result" style="width: 1200px;">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
          <table>
              <tr>
                  <td width="60px"><!--- 
                  Display option Begin 
                  ---><bean:define id="pagingVal" name="tmpMapVal"     property="paging"/><!-- 
                  --><paging:options name="pagingVal" defaultval="50"/></td>
                  <td align="center">
                      <table  border="0" width="100%">
                          <tr><td id="pagingTb" class="paging" height="10" valign="bottom"></td></tr>
                      </table>
                  </td>
                  <td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
              </tr>
           </table>
    </div>
	</div>
</form>
<form name="frm2" method="POST" >
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="mbrdFileDown"/>
    <input type="hidden" name="s_brd_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>
</body>
</html>