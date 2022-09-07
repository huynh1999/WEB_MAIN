<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MbrdMngRead.jsp
*@FileTitle  : 게시판 등록화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/25
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@ page import="com.clt.apps.opusbase.main.dto.NaviVo,com.clt.apps.opusbase.utils.NaviInfo"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@ taglib uri="struts-bean"  prefix="bean"%>
<%@ taglib uri="struts-html"  prefix="html"%>
<%@ taglib uri="struts-logic" prefix="logic"%>
<%@ taglib uri="clt-rowset"   prefix="clt"%>
<%@ taglib uri="clt-writer"   prefix="wrt"%>
<%
	String CLT_PATH = "/opusfwd";  
	String CLT_MSG_PATH = "EN"; 
	String LEV1_NM = "";
	String LEV2_NM = "";
	String LEV3_NM = "";
%>

<%  
	NaviVo naviVo = null; 

	String pageUrl = (String)request.getAttribute("requestURL");	
	pageUrl = (String)request.getAttribute("requestURL");
	if(pageUrl != null){
		if (pageUrl.lastIndexOf("/") > 0 && pageUrl.length() > pageUrl.lastIndexOf("/")+1) {
			pageUrl = pageUrl.substring( pageUrl.lastIndexOf("/")+1 );
		}
	}
	System.out.println("<--JSP_pageUrl--:::"+pageUrl);
	try{
		// #535: [SBS] 다국어 처리 V1.0
		naviVo = NaviInfo.getNaviInfo(pageUrl, CLT_MSG_PATH);
		if(naviVo != null){
			LEV1_NM = 	naviVo.getLev1_nm();
			LEV2_NM = 	naviVo.getLev2_nm();
			LEV3_NM = 	naviVo.getLev3_nm();
		}		
	}catch(Exception exc){
	}
%>

<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<bean:define id="mapVO" name="EventResponse" property="mapVal"/>
	<bean:define id="mbrdVO" name="EventResponse" property="objVal"/>
	
    <script language="javascript" src="./apps/opusbase/service/mbrd/script/MbrdMngRead.js?ver=<%=CLT_JS_VER%>"></script>	
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/message.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/shortcut.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
	    <logic:notEmpty name="mapVO" property="noticeDocExt">
	            var noticeDocExt = '<bean:write name="mapVO" property="noticeDocExt"/>';        
	    </logic:notEmpty>
	    function setupPage()
	    {
	    	setDfDate();
	    	loadPage();
	    }
	</script>
<form name="fName" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="f_cmd"     value="">
    <input type="hidden" name="save_yn" value="<bean:write name="mbrdVO" property="save_yn"/>">
    
    <input type="hidden" name="rply_cnt" value="<bean:write name="mbrdVO" property="rply_cnt"/>">
    
    
    <input type="hidden" name="brd_seq" value="<bean:write name="mbrdVO" property="brd_seq"/>">
    <input type="hidden" name="brd_pre_seq" value="<bean:write name="mbrdVO" property="brd_pre_seq"/>">
    <input type="hidden" name="pgm_url" value="<bean:write name="mbrdVO" property="pgm_url"/>">
    <input type="hidden" name="locl_usr_nm" value="<bean:write name="mbrdVO" property="modi_usr_nm"/>">
    

	<html:hidden name="mapVO" property="f_CurPage"/>
    <html:hidden name="mapVO" property="f_dp_bgn_dt"/>
    <html:hidden name="mapVO" property="f_dp_end_dt"/>
    <html:hidden name="mapVO" property="f_wrt_id"/>
    <html:hidden name="mapVO" property="f_wrt_nm"/>
    
    <html:hidden name="mapVO" property="f_brd_seq"/>
    <input type="hidden" name="f_brd_file" value="<bean:write name="mbrdVO" property="file_url"/>">
    <html:hidden name="mapVO" property="f_brd_pre_seq"/>
    <html:hidden name="mapVO" property="f_pgm_url"/>
    <html:hidden name="mapVO" property="f_locl_usr_nm"/>
    <html:hidden name="mapVO" property="f_usrid"/>
    <html:hidden name="mapVO" property="f_rtn_cmd"/>
    
    <html:hidden name="mapVO" property="f_kind"/>
    
    <html:hidden name="mapVO" property="f_due_bgn_dt"/>
    <html:hidden name="mapVO" property="f_due_end_dt"/>
    <html:hidden name="mapVO" property="f_pgm_id"/>
    <html:hidden name="mapVO" property="f_pgm_nm"/>
    <html:hidden name="mapVO" property="f_modi_usrid"/>
    <html:hidden name="mapVO" property="f_modi_eng_usr_nm"/>
	<div class="page_title_area">
	   		<h2 class="page_title"><span id='bigtitle'><bean:message key="Project_Helpdesk"/></span></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <logic:empty name="mbrdVO" property="brd_seq"><!--최초 등록시-->
			   		<button type="button" class="btn_accent" id="btnAdd" onclick="doWork('ADD');"><bean:message key="Save"/></button><!-- 
			   	--><button type="button" class="btn_normal" onclick="doWork('NEW');"><bean:message key="New"/></button><!-- 
			   	--><button type="button" class="btn_normal" onclick="doWork('SEARCHLIST');"><bean:message key="List"/></button><!-- 
			   	--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
			   	--></logic:empty><!-- 
			   	--><logic:notEmpty name="mbrdVO" property="brd_seq"><!--수정록시--><!-- 
			   	--><logic:equal name="mapVO" property="f_reply_btn" value="ON"><!-- 
			   	--><button type="button" class="btn_normal" id="btnReply" onclick="doWork('GO_REPLY');">Reply</button><!-- 
			   	--></logic:equal><!-- 
			   	--><button type="button" class="btn_accent" id="btnModify" onclick="doWork('MODIFY');"><bean:message key="Save"/></button><!-- 
			   	--><button type="button" class="btn_normal" onclick="doWork('NEW');"><bean:message key="New"/></button><!-- 
			   	--><button type="button" class="btn_normal" onclick="doWork('REMOVE');"><bean:message key="Delete"/></button><!-- 
			   	--><button type="button" class="btn_normal" onclick="doWork('SEARCHLIST');"><bean:message key="List"/></button>
        		</logic:notEmpty>
		   </div>
		 	 <div class="location">	
			</div>	
	</div>
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="100">
				<col width="*">
			</colgroup>
                 <tr>
                     <th><bean:message key="Title"/></th>
                     <td><input required type="text" name="brd_tit" value="<bean:write name="mbrdVO" property="brd_tit"/>" maxlength="100" class="search_form" style="width:1000px;"></td>
                 </tr>
		</table>
		<table>
			<colgroup>
				<col width="100">
				<col width="208">
				<col width="90">
				<col width="*">
			</colgroup>
                <tr>
                    <th>Kind</th>
                    <td>
					<bean:define id="paramKindList" name="mapVO" property="kindList"/>
					<html:select name="mbrdVO" property="brd_knd" styleClass="search_form"  style="width:208px;text-align:left">
					<html:options collection="paramKindList" property="cd_val" labelProperty="cd_nm"/>
					</html:select>
                    </td>
                    <th>Menu</th>
                    <td><logic:empty name="mbrdVO" property="brd_pre_seq"><!-- 
                     --><input type="text" name="lev1_nm" value="<%=LEV1_NM%>" maxlength="100" class="search_form" style="width:200px;"><!-- 
                     -->>&nbsp;<!-- 
                     --><input type="text" name="lev2_nm" value="<%=LEV2_NM%>" maxlength="100" class="search_form" style="width:200px;"><!-- 
                     -->>&nbsp;<!-- 
                     --><input type="text" name="lev3_nm" value="<%=LEV3_NM%>" maxlength="100" class="search_form" style="width:200px;"><!-- 
                     --></logic:empty><!-- 
                     --><logic:notEmpty name="mbrdVO" property="brd_pre_seq"><!-- 
                     --><input type="text" name="lev1_nm" value="<bean:write name="mbrdVO" property="lev1_nm"/>" maxlength="100" class="search_form-disable" style="width:200px;"><!-- 
                     -->>&nbsp;<!-- 
                     --><input type="text" name="lev2_nm" value="<bean:write name="mbrdVO" property="lev2_nm"/>" maxlength="100" class="search_form-disable" style="width:200px;"><!-- 
                     -->>&nbsp;<!-- 
                     --><input type="text" name="lev3_nm" value="<bean:write name="mbrdVO" property="lev3_nm"/>" maxlength="100" class="search_form-disable" style="width:200px;">
                     </logic:notEmpty>
                   </td>
                </tr>
		</table>
		<table>
			<colgroup>
				<col width="100">
				<col width="208">
				<col width="90">
				<col width="105">
				<col width="100">
				<col width="*">
			</colgroup>
              <tr>
                  <th>User ID</th>
                  <td>
                     <input type="text" name="rgst_usrid" value="<bean:write name="mbrdVO" property="modi_usrid"/>" maxlength="100" class="search_form-disable" style="width:208px;" readOnly ><!-- 
                     --><input type="hidden" name="proc_usrid" value="<bean:write name="mbrdVO" property="modi_usrid"/>" maxlength="100">
                  </td>
                  <th>Due Date</th>
                  <td>
                  	<logic:empty name="mbrdVO" property="brd_pre_seq">
                   	<input required type="text" name="due_dt" id="due_dt" value="<wrt:write name="mbrdVO" property="due_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>" style="width:75px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form"><!-- 
                   --><button type="button" class="calendar" tabindex="-1" id="due_dt_cal" onclick="doDisplay('DATE1', fName);"></button>
				</logic:empty>   
                  	<logic:notEmpty name="mbrdVO" property="brd_pre_seq">
                   	<input required type="text" name="due_dt" id="due_dt" value="<wrt:write name="mbrdVO" property="due_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>" style="width:75px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form-disable"><!-- 
                   	--><button type="button" class="calendar" tabindex="-1" id="due_dt_cal" onclick="doDisplay('DATE1', fName);"></button>
                  	</logic:notEmpty>
				</td>
                  <th>TEL</th>
                  <td>
                   	<logic:empty name="mbrdVO" property="brd_pre_seq">
                      	<input type="text" name="usr_phn" onkeyPress="onlyNumberCheck(' -./()[]<>');"  value="<bean:write name="mbrdVO" property="usr_phn"/>" maxlength="100" class="search_form" style="width:170px;">
                   	</logic:empty>   
                   	<logic:notEmpty name="mbrdVO" property="brd_pre_seq">
                   	<input type="text" name="usr_phn" onkeyPress="onlyNumberCheck(' -./()[]<>');"  value="<bean:write name="mbrdVO" property="usr_phn"/>" maxlength="100" class="search_form-disable" style="width:170px;" readOnly >
                   	</logic:notEmpty>
                 </td>
              </tr>
              <tr>
                  <th>Office</th>
                  <td>
                     <input type="text" name="rgst_ofc_cd" value="<bean:write name="mbrdVO" property="modi_ofc_cd"/>" maxlength="100" class="search_form-disable" style="width:208px;" readOnly >
                     <input type="hidden" name="proc_ofccd" value="<bean:write name="mbrdVO" property="modi_ofc_cd"/>" maxlength="100" class="search_form-disable" style="width:200px;" readOnly >
                  </td>
                  <th>Reg. Date</th>
                  <td><input type="text" name="rgst_tms" value="<bean:write name="mbrdVO" property="rgst_tms"/>" maxlength="100" class="search_form-disable" style="width:105px;"></td>
                  <th>E-Mail</th>
                  <td>
                  	<logic:empty name="mbrdVO" property="brd_pre_seq">
                     	<input type="text" name="usr_eml" value="<bean:write name="mbrdVO" property="usr_eml"/>" maxlength="100" class="search_form" style="width:170px;">
                  	</logic:empty>   
                  	<logic:notEmpty name="mbrdVO" property="brd_pre_seq">
                  		<input type="text" name="usr_eml" value="<bean:write name="mbrdVO" property="usr_eml"/>" maxlength="100" class="search_form-disable" style="width:170px;" readOnly>
                  	</logic:notEmpty>
                  </td>
              </tr>
              <tr>
                  <th>Program Id</th>
                  <td>
                  	<logic:empty name="mbrdVO" property="brd_pre_seq">
                     	<input type="text" name="pgm_seq" onkeyPress="onlyNumberCheck();"  value="<bean:write name="mbrdVO" property="pgm_seq"/>" maxlength="100" class="search_form" style="width:50px;"><!-- 
                    --><button type="button" class="input_seach_btn" tabindex="-1" id="shipto" onClick="doWork('PGM_POPUP')"></button><!-- 
                    --><input type="text" name="pgm_nm" value="<bean:write name="mbrdVO" property="pgm_nm"/>" maxlength="100" class="search_form" style="width:125px;">
                  	</logic:empty>   
                  	<logic:notEmpty name="mbrdVO" property="brd_pre_seq">
                  		<input type="text" name="pgm_seq" onkeyPress="onlyNumberCheck();"  value="<bean:write name="mbrdVO" property="pgm_seq"/>" maxlength="100" class="search_form-disable" style="width:50px;"><!-- 
                    --><button type="button" class="input_seach_btn" tabindex="-1" id="shipto"></button><!-- 
                    --><input type="text" name="pgm_nm" value="<bean:write name="mbrdVO" property="pgm_nm"/>" maxlength="100" class="search_form-disable" style="width:125px;">
                  	</logic:notEmpty>
                  </td>
                  <th>Location URL</th>
                  <td colspan="3">
                   	<logic:empty name="mbrdVO" property="brd_pre_seq">
                      	<input type="text" name="loc_url" value="<bean:write name="mbrdVO" property="loc_url"/>" class="search_form" style="width:700px;">
                    </logic:empty>   
                   	<logic:notEmpty name="mbrdVO" property="brd_pre_seq">
                   	<input type="text" name="loc_url" value="<bean:write name="mbrdVO" property="loc_url"/>" class="search_form-disable" style="width:700px;">
                   	</logic:notEmpty>
                  </td>
              </tr>
		</table>
		<table>
			<colgroup>
				<col width="100">
				<col width="220">
				<col width="*">
			</colgroup>
			<tr>
                  <th><bean:message key="Attach_File"/></th>
                  <td>
                       <logic:notEmpty name="mbrdVO" property="file_url">
                          <a href="javascript:doWork('COMMAND03');"><b><bean:write name="mbrdVO" property="file_url"/></b></a>&nbsp;&nbsp;<!-- 
                           --><img onclick="doWork('REMOVE01');" src="<%=CLT_PATH%>/web/img/main/trash.gif" border="0" style="cursor:hand;" align="absmiddle"><br>
                       </logic:notEmpty>
                       <input type="file" name="brd_file" class="search_form" style="width:420px;">
                  </td>
                  <td>  Limit Size : 10 M</td>
               </tr>
	    </table>
	    <table border="0" cellpadding="0" cellspacing="0">
	    	<colgroup>
				<col width="100">
				<col width="*">
			</colgroup>
                <tr>
                    <th><bean:message key="Contents"/></th>
                    <td>
                       <textarea name="brd_desc" maxlength="2000" cols="160" rows="22" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);" style="width:1000px;"><bean:write name="mbrdVO" property="brd_desc"/></textarea>
                    </td>
                </tr>
            </table>
	</div>
</form>

<form name="fName2" method="POST" >
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="mbrdFileDown"/>
    <input type="hidden" name="s_brd_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>

<script>
	loadPage();
</script>