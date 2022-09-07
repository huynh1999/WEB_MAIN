<%--
=========================================================
*@FileName   : CMM_POP_0240.jsp
*@FileTitle  : CMM
*@Description: invoice search pop
*@author     : 최길주 - invoice search pop
*@version    : 1.0 - 03/09/2009
*@since      : 03/09/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/cmm/pop/inv/script/CMM_POP_0240.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>
	<script>
	function setupPage(){
		loadPage();initFinish();doWork('SEARCHLIST');
	}
</script>
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="f_CurPage"/> 	
	<div class="layer_popup_title">
		<!-- page_title_area(S) -->
		<div class="page_title_area">
		   <h2 class="page_title"><span><bean:message key="Invoice_Number_Search"/></span></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- wrap search(S) -->
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="61">
						<col width="275">
						<col width="80">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
		                    <th><bean:message key="Customer"/></th>
		                    <td>
								<input name="s_trdp_cd" type="text" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('PARTNER_POPLIST')"></button><!-- 
							 --><input name="s_trdp_nm" type="text" maxlength="50" class="search_form" style="width:180;" disabled="true">
		                    </td>
		                    <th><bean:message key="Invoice_No"/></th>
		                    <td>
								<input name="s_inv_no" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" maxlength="50">
		                    </td>
						</tr>
						<tr>
		                    <th><bean:message key="Date"/></th>
							<td>
								<input type="text" name="sel_strdt" id="sel_strdt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" size='11' maxlength="10"  class="search_form"><!-- 
							-->~&nbsp;<!-- 
							--><input type="text" name="sel_enddt" id="sel_enddt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" size='11' maxlength="10"  class="search_form"><!-- 
							--><button type="button" class="calendar ir" id="sel_dt_cal" onclick="doDisplay('DATE1', form);"></button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
				<table id="mainTable">								
					<tr>
						<td width="50">
	<!-------------------- Display option Begin -------------------->
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
	<!-------------------- Display option End -------------------->					
						</td>								
						<td align="center">
							<table>
								<tr>
									<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>		
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</form>
<script>
	var formObj = document.form;
	
	// 오늘 날짜 가져오기
	var now 	= new Date(); 				// 현재시간 가져오기
	var year	= now.getYear(); 			// 년도 가져오기
	var month	= now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date	= now.getDate(); 			// 날짜 가져오기
	
	var fromDate = new Date();

	var tempDate = now.getTime() - ( 7*24*60*60*1000);
	fromDate.setTime(tempDate);
   
	var iyear = fromDate.getYear();
	var imonth = fromDate.getMonth() +1;
	var iday = fromDate.getDate();

	if(imonth < 10){
		imonth = "0"+(imonth);
	}
	if(iday < 10){
		iday = "0"+iday;
	}

	if(month < 10){
		month = "0"+(month);
	}
	if(date < 10){
		date = "0"+date;
	}

	var searchDay1 = iyear + "-" + imonth + "-" + iday;
	today = year +"-"+ month +"-"+ date +"";

	formObj.sel_strdt.value = searchDay1;
	formObj.sel_enddt.value = today;
</script>

