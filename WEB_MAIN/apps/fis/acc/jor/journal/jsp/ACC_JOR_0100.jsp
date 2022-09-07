<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  ACC_JOR_0100.jsp
*@FileTitle  : Bank Outstanding Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/18
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/acc/jor/journal/script/ACC_JOR_0100.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		
	%>
	<script type="text/javascript">
	function setupPage(){
		loadPage();
	 	}
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	</script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<form name="frm1" id="frm1" method="POST" action="./">
	<!-- Report Value -->
	<input id="file_name" name="file_name" type="hidden" />
	<input id="title" name="title" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />
	
	<input type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email" id="f_email" value="<%= email %>"/>
	<input type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_nm" id="f_ofc_nm" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input type="hidden" name="f_bank_seq" id="f_bank_seq">
	<input type="hidden" name="f_bank_nm" id="f_bank_nm">
	
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/> 
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	
	 <div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP">
					<%-- 
					<button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"/><bean:message key="Search"/></button> 
					<button id="btnPrint" type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"/><bean:message key="Print"/></button> 
					<button id="detailBtn2" type="button" class="btn_normal" style="cursor:hand; display:none;"  onclick="doWork('DetailPrint')"/><bean:message key="Detail_Print"/></button>
					 --%>
				</div>
				<!-- opus_design_btn(E) -->
	    
	  			<!-- page_location(S) -->
				<div class="location">	
					 <span><%=LEV1_NM%></span> &gt;
				 	 <span><%=LEV2_NM%></span> &gt;
				  	 <span><%=LEV3_NM%></span>
			   		<a href="" class="ir">URL Copy</a>
				</div>
				<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->   
	
	<!-- inquiry_area(S) -->	
<div class="over_wrap" height="100%">
		<div class="wrap_search">
			<div class="opus_design_inquiry entry_pannel ">
				<table>
						<colgroup>
				        	<col width="97">
				        	<col width="120">
				        	<col width="70">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
									<th><bean:message key="As_of"/></th>
									<td>
										<input type="text" name="f_deposit_dt" id="f_deposit_dt" value="" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" dataformat="excepthan" style="ime-mode:disabled;width:80px;"><!-- 
									 --><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_deposit_dt_cal" onclick="doDisplay('DATE1' ,frm1);"></button>
									</td>
									<th><bean:message key="Branch"/></th>
			                        <td>
			                            <bean:define id="oficeList" name="valMap" property="ofcList"/>
			                            <select name="s_ofc_cd" style="width:150px;" OnChange="changeOffice(this);" required/>
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
			                            </select><!-- 
			                            -->&nbsp;<input type="checkbox" name="f_grp_by_ofc" id="f_grp_by_ofc" value="G"> <b><label for="f_grp_by_ofc"><bean:message key="Group_by_Office"/></label></b>
			                        </td>
	                    	 </tr>
				 		</tbody>
				</table>
				
			</div>
	</div>
	<!-- inquiry_area(E) -->    
	
	<!-- grid_area(S) -->
		<div class="wrap_result">
				<div class="opus_design_grid clear" id="mainTable">
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
		</div>
	<!-- grid_area(E) -->	
</div>
	</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>

