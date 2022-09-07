<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0030.jsp
*@FileTitle  : 게시판 내용확인 화면
*@Description: 게시판 내용확인합니다.
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
<bean:define id="ntcVO" name="EventResponse" property="objVal"/>
<bean:define id="mapVO" name="EventResponse" property="mapVal"/>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function doWork(srcName){
			try {
				switch(srcName){
	                case "COMMAND01":
	                	fName2.f_file_seq.value = '1';
						fName2.target = '_self';
	                    fName2.submit();
	                break;
	                case "COMMAND02":
	                	fName2.f_file_seq.value = '2';
						fName2.target = '_self';
	                    fName2.submit();
	                break;
	                case "COMMAND03":
	                	fName2.f_file_seq.value = '3';
						fName2.target = '_self';
	                    fName2.submit();
	                break;
        <logic:notEmpty name="mapVO" property="WRITER">
                    case "MODIFY":
			            doShowProcess();
						fName.f_cmd.value = MODIFY;
                        fName.target = '_self';
                        fName.submit();
                    break;
        </logic:notEmpty>
 			    }
			}catch(e) {
				if( e == "[object Error]") {
					showErrMessage(getMsg('COM12111'));
				}else{
					showErrMessage(e);
				}
			}
		}
		function setupPage(){
	    }
	</script>
<form name="fName" method="POST" action="./NoticePopRead.clt">
	<div class="layer_popup_title">
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:message key="Notice_Read"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_normal" onclick="window.close();"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry wFit ">
	   		<table border="0" cellpadding="0" cellspacing="0">
		    	<tr>
					<th width="80px"><bean:message key="Title"/></th>
					<td><input type="text" name="brd_tit"   value='<bean:write name="ntcVO" property="brd_tit"/>'class="search_form" style="width:500px;" readonly></td>
				</tr>
                <tr>
                    <th><bean:message key="Writer"/></th>
                    <td><!-- 
                     --><input type="text" name="disp_only" value='<bean:write name="ntcVO" property="modi_usrid"/>'      class="search_form" style="width:67px;"  readonly><!-- 
                     --><input type="text" name="disp_only" value='<bean:write name="ntcVO" property="modi_eng_usr_nm"/>' class="search_form" style="width:120px;" readonly><!-- 
                     --></td>
                </tr>
				<logic:notEmpty name="ntcVO" property="file_url">
		            <tr>
		               <td width="80"><bean:message key="Attach_File"/> 1</td>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND01');"><b><bean:write name="ntcVO" property="file_url"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
				<logic:notEmpty name="ntcVO" property="file_url2">
		            <tr>
		               <td width="80"><bean:message key="Attach_File"/> 2</td>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND02');"><b><bean:write name="ntcVO" property="file_url2"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
				<logic:notEmpty name="ntcVO" property="file_url3">
		            <tr>
		               <td width="80"><bean:message key="Attach_File"/> 3</td>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND03');"><b><bean:write name="ntcVO" property="file_url3"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
        		<tr>
                     <th><bean:message key="Contents"/></th>
                     <td><textarea name="brd_ctnt" maxlength="1000" style="width: 500px;" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);" cols="97" rows="13" readonly><bean:write name="ntcVO" property="brd_ctnt"/></textarea></td>
                 </tr>
		    </table>
	   	</div>
	</div>
	</div>
</form>
<form name="fName2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere"   value="fd"/>
    <input type="hidden" name="bcKey"     value="brdFileDown"/>
    <input type="hidden" name="f_brd_tp"  value="N"/>	
    <input type="hidden" name="f_file_seq"   id="f_file_seq"  value=""/>	
	<html:hidden name="mapVO" property="f_brd_seq"/>
</form>
</body>
</html>