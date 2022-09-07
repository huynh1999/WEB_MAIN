<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0070.jsp
 *@FileTitle : Accounting Block / Unblock
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0070.js?ver=<%=CLT_JS_VER%>" />
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
	%>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		function setupPage(){
			loadPage();
			doWork('SEARCHLIST');
		}
	</script>
	
</head>
<base target="_self"/>
<form name="frm1" method="POST" action="./ACC_SLP_0070.clt">
<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd"/>
<input type="hidden" name="f_CurPage" id="f_CurPage"/>
<input type="hidden" name="f_range_flg" id="f_range_flg"/>

<input type="hidden" name="s_chk_block" id="s_chk_block"/>
<input type="hidden" name="action" id="action"/>
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
	   		<button type="button" onclick="doWork('COMMAND01')"  class="btn_etc"><bean:message key="Apply"/></button>
			--%>
	   </div>   
   <div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
	
</div>
<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
	<!-- wrap_search(S) -->
	<div class="wrap_result">
	<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry wFit">
			<div  style="width:305px">
				<table>
					<colgroup>
						<col width="50" />
						<col width="50" />
						<col width="*" />
					</colgroup>
					<tr>
					<td colspan="3">
					<h2 class="title_design"><bean:message key="Office_Option"/></h2>
					</tr>
					<tr>
						<th style="text-align:left">
							<bean:message key="Office"/>
						</th>
						<td colspan="2">
							<bean:define id="oficeList" name="valMap" property="ofcList"/>
							<select name="s_ofc_cd" id="s_ofc_cd" style="width:130px;" onchange="getLastBlockDt();">
							<bean:size id="len" name="oficeList" />
							<logic:greaterThan name="len" value="1">
								<option selected="selected" value=''>ALL</option>
							</logic:greaterThan>
							<logic:iterate id="ofcVO" name="oficeList">
								<!-- <logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                         <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                      	</logic:equal>
				                      	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                         <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                      	</logic:notEqual> -->
				                      	<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
							</logic:iterate>
							</select>		
						<input type="hidden" id="last_block_dt" >
						<input type="hidden" id="last_ye_dt" value="">									
						</td>
					</tr>
				</table>	
				<br>
				<table>
				<colgroup>
					<col width="50" />
					<col width="50" />
					<col width="*" />
				</colgroup>
				<tr>
					<td colspan="3">
						<h2 class="title_design"><bean:message key="Block_Option"/></h2>
					</td>
				</tr>
				<tr>
					<td><input type="radio" name="blk_chk" id="blk_chk1" onClick="chkBlock()" checked><label for="blk_chk1"><bean:message key="Block"/></label></td>
					<td colspan="2"><input type="radio" name="blk_chk" id="blk_chk2" onClick="chkBlock()"><label for="blk_chk2"><bean:message key="Unblock"/></label></td>
				</tr>
		
				<tr>
					<th colspan="2" style="line-height: 40px; text-align: left; width:100px;" id="blk_title"><bean:message key="Block_ALL_Data_Until"/></th>
					<th colspan="2" style="line-height: 40px; text-align: left; width:100px;display:none;" id="unblk_title"><bean:message key="Unblock_ALL_Data_After"/></th>
					<td><input type="text" name="s_block_dt" id="s_block_dt" required value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form"><button type="button" onclick="doDisplay('DATE1', frm1);" id="s_blockdt_cal" name="s_blockdt_cal" class="calendar" tabindex="-1"></button></td>		
				</tr>
			</table>
		<!-- opus_design_inquiry(E) -->
			</div>
		</div>
		<br>
		<!-- wrap_search(E) -->
		
		<!-- wrap_result(S) -->
		<div>
			<h2 class="title_design"><bean:message key="Block_History"/></h2>
			<div class="wrap_result">
				<div class="opus_design_grid" style="width:305px;">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
			<!-- opus_design_grid(E) -->
			</div>
		<!-- wrap_result(E) -->	
		
		</div>
	</div>
</div>			
	<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
	</script>	
</form>