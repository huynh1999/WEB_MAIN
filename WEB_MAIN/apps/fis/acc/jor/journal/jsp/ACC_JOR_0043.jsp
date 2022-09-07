<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0043.jsp
*@FileTitle  : Check Batch Print
*@author     : CLT
*@version    : 1.0
*@since      : 2017/09/05
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/acc/jor/journal/script/ACC_JOR_0043.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage(){
			loadPage();
		}
	</script>
	
<%
	String ofc_cd		= userInfo.getOfc_cd();
	String ofcLoclNm 	= userInfo.getOfc_locl_nm();
	String usrNm 		= userInfo.getUser_name();
	String ofcEngNm 	= userInfo.getOfc_eng_nm();
	String usrId		= userInfo.getUsrid();
	String usrPhn		= userInfo.getPhn();
	String usrFax		= userInfo.getFax();
	String email 		= userInfo.getEml();
	String cnt_cd 		= userInfo.getOfc_cnt_cd();
	String oa_flg 		= userInfo.getOa_flg();
%>

<form name="form" method="POST" action="./">
	<!-- Report Value -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="arr_jnr_no">
	
	<input type="hidden" name="cmd_type" id="cmd_type" />

	
	<!-- 소타이틀, 대버튼 -->
	<div class="layer_popup_title">
    	<div class="page_title_area clear">
	
			<!-- page_title(S) -->
			<h2 class="page_title"><span><bean:message key="Check_Batch_Print"/></span></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn (S) -->
			<div class="opus_design_btn">
				<button class="btn_accent" id="btnPrint" type="button" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!--
				--><button class="btn_normal"  type="button" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
				</div>
			<!-- opus_design_btn (E) -->
		
			<!-- page_location(S) -->
			<div class="location">	
				
			</div>
			<!-- page_location(E) -->
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- page_title_area(E) -->
	    <div class="wrap_result">
		    <div class="" >
				<!-- opus_design_inquiry(S) -->
				<div class="opus_design_inquiry wFit">
				<div style="height: 20px"></div>
					<table>
						<colgroup>
							<col width="95" />				
							<col width="*" />				
					   </colgroup> 
					   <tbody>
						   <tr height="55px">
								<th><bean:message key="Post_Date"/></th>
								<td><!-- 
									 --><input style="width:105px;" type="text" id="f_strdt" name="f_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.f_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form" >~&nbsp;<!-- 
									 --><input style="width:105px;" type="text" id="f_enddt" name="f_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.f_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form" ><!-- 
									 --><button type="button" class="calendar" tabindex="-1" name="f_strdt_cal" id="f_strdt_cal" onclick="doDisplay('DATE1', form);"></button>
								</td>						   
						   </tr>
					   		<tr height="55px">
					   			<th><bean:message key="Check_No"/>&nbsp;</th>
					   			<td>
					            	<input name="f_check_no" type="text" maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:105px"><!-- 
					            	 -->~&nbsp;<!-- 
					             --><input name="t_check_no" type="text" maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:105px">
					            </td>      
					   		</tr>
					   		<tr height="55px">
					   			<th><bean:message key="Rider_Print"/>&nbsp;</th>
					   			<td>
		                    		<input type="checkbox" name="f_rider_yn" id="f_rider_yn" value="">
		                    	</td> 
					   		</tr>
					   	</tbody>
					</table>
				</div>
				
				
				<!-- opus_design_grid(S) -->
				<div class="opus_design_grid" id="mainTable" style="display:none">
					<script type="text/javascript">comSheetObject('sheet1');</script>		
				</div>
				<!-- opus_design_grid(E) -->
			</div>
		</div>
	    
	</div>
</form>

