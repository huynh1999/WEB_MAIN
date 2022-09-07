<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0030.jsp
*@FileTitle  : 게시판 내용확인 화면
*@Description: 게시판 내용확인합니다.
*@author     : Phi.Tran
*@version    : 20.6.2014



*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
 <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<bean:define id="ntcVO" name="EventResponse" property="objVal"/>
	<bean:define id="mapVO" name="EventResponse" property="mapVal"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage(){
			
		}
		function doWork(srcName){
			try {
				switch(srcName){
					case "SEARCHLIST":
						doShowProcess();
						fName.action = './NoticeList.clt';
						fName.submit();
					break;
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
	</script>
<form name="fName" method="POST" action="./NoticeRead.clt">
    <input type="hidden" name="f_cmd" value="">
    <input type="hidden" name="f_CurPage" value="">

	<html:hidden name="mapVO" property="f_CurPage"/>
	<html:hidden name="mapVO" property="f_brd_seq"/>
	<html:hidden name="mapVO" property="f_dp_bgn_dt"/>
	<html:hidden name="mapVO" property="f_dp_end_dt"/>
	<html:hidden name="mapVO" property="f_wrt_id"/>
	<html:hidden name="mapVO" property="f_wrt_nm"/>
	
    <!-- 타이틀, 네비게이션 -->
    <div class="layer_popup_title">
    <!-- page_title_area -->
	<div class="page_title_area clear">
	   <div class="page_title" id="pageTitleMain" style="
		    display:block!important;
		    overflow:visible;
		    position:relative;top:3px;
		    padding-right:26px;
			font-family:Verdana, '맑은고딕','Malgun Gothic', Arial, Geneva, Helvetica, sans-serif, 'Apple-Gothic','애플고딕',Droid Sans,'돋움',Dotum, sans-serif;    
		    font-size:16px;font-weight:400;
		    letter-spacing:.5px;
		    outline:none;
		    line-height:24px;
		    vertical-align: top;
        ">Notice Board Entry</div>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
	   
		  <!--  <button type="button" class="btn_accent"  onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button> 
		   <button type="button" class="btn_normal" id="btnClose" onclick="doWork('CLOSE');" style="cursor:hand; display:none;"><bean:message key="Close"/></button> -->
		   <logic:notEmpty name="mapVO" property="WRITER">
		   <button type="button" class="btn_normal" id="btnModify" onclick="doWork('MODIFY');"><bean:message key="Modify"/></button>
		   </logic:notEmpty>
		   <button type="button" class="btn_tmp1" id="btnList" onclick="doWork('SEARCHLIST');"><bean:message key="List"/></button>
		   
		     
	   </div>

	</div>
	</div>
	<div class="layer_popup_contents" style="padding:0px">
		<div class= "wrap_search">
		  <div class= "opus_design_inquiry" style="width:950px !important;">
		  	<table>
		  		<colgroup>
		  			<col width="150" />
		  			<col width="*" />
		  		</colgroup>
		  		<tbody>
		  			<tr>
						<th><bean:message key="Title"/></th>
						<td>
						   <input type="text" name="brd_tit"   value='<bean:write name="ntcVO" property="brd_tit"/>'class="search_form-disable" style="width:500;" readonly>
						</td>
					</tr>
		            <tr>
		                <th><bean:message key="Writer"/></th>
		                <td>
							<input type="text" name="disp_only" value='<bean:write name="ntcVO" property="modi_usrid"/>'      class="search_form-disable" style="width:67px;"  readonly><input type="text" name="disp_only" value='<bean:write name="ntcVO" property="modi_eng_usr_nm"/>' class="search_form-disable" style="width:120px;" readonly>
		                </td>
		            </tr>
				<logic:notEmpty name="ntcVO" property="file_url">
		            <tr>
		               <th width="80"><bean:message key="Attach_File"/> 1</th>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND01');"><b><bean:write name="ntcVO" property="file_url"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
				<logic:notEmpty name="ntcVO" property="file_url2">
		            <tr>
		               <th width="80"><bean:message key="Attach_File"/> 2</th>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND02');"><b><bean:write name="ntcVO" property="file_url2"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
				<logic:notEmpty name="ntcVO" property="file_url3">
		            <tr>
		               <th width="80"><bean:message key="Attach_File"/> 3</th>
		               <td class="table_search_body">
		                  <a href="javascript:doWork('COMMAND03');"><b><bean:write name="ntcVO" property="file_url3"/></b></a>
		               </td>
		           </tr>
		      	</logic:notEmpty>
		  		</tbody>
		  	</table>
		  	<table>
		  		<colgroup>
		  			<col width="150" />
		  			<col width="*" />
		  		</colgroup>
		  		<tbody>
		  			<tr>
		               <th><bean:message key="Contents"/></th>
		               <td>
		                  <textarea name="brd_ctnt" maxlength="1000" onkeypress="keyPress_maxLength(this);" style="width: 500px;" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" cols="160" rows="27" readonly><bean:write name="ntcVO" property="brd_ctnt"/></textarea>
		               </td>
		           </tr>
		  		</tbody>
		  	</table>
		  </div>
		 </div> 
	</div>
</form>
<form name="fName2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere"   value="fd"/>
    <input type="hidden" name="bcKey"     value="brdFileDown"/>
    <input type="hidden" name="f_brd_tp"  value="N"/>
    <input type="hidden" name="f_file_seq"   id="f_file_seq"  value="1"/>	
	<html:hidden name="mapVO" property="f_brd_seq"/>
</form>
<script>
	doHideProcess();
</script>
</body>
</html>