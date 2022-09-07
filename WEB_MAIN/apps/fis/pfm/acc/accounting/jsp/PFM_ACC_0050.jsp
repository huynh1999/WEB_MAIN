<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_ACC_0050.jsp
*@FileTitle  : Income Statement
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/pfm/acc/accounting/script/PFM_ACC_0050.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- #1438 [PATENT] 0215_24 ACCOUNTING REPORT - MULTI OFFICE SELECTION -->	
	<%-- <script src="<%=CLT_PATH%>/js/common/jquery-3.2.1.min.js?ver=<%=CLT_JS_VER%>"></script> --%>
	<script src="<%=CLT_PATH%>/js/common/multiple-select.js?ver=<%=CLT_JS_VER%>"></script>
	<link href="<%=CLT_PATH%>/js/common/multiple-select.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">	
	<script>
        $(function() {
            $('#f_ofc_cd').multipleSelect({
            	 width: '100%',
                 placeholder: "ALL",
                 selectAll: false
            });
        });
    </script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="sysOfcVO"  name="valMap" property="sysOfcInfo"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<%
		//GL View Table Data Create LKH 2015.02.25
		String usrId		= userInfo.getUsrid();
	%>
	<script type="text/javascript">		
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var ofc_nm = "<%=userInfo.getOfc_locl_nm()%>";
		var ofcCntArr = new Array();
		ofcCntArr.push("");
		function setupPage(){
			loadPage();
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
				getBtnObj("pdfDowns").style.display = 'inline';
			}
	 	}
		// #1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
		var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");
	</script>
<form name="frm1" method="POST" action="./">
	<!-- Report Value -->
	<input id="file_name" name="file_name" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />
	<input id="title" name="title" type="hidden" />
	
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/> 
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	
	<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - by thoa.dien 170828-->
	<logic:notEmpty name="ofcInfo" property="locl_curr_cd">
		<input  type="hidden" name="h_curr_cd" id="h_curr_cd" value="<bean:write name="ofcInfo" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="ofcInfo" property="locl_curr_cd">
		<input type="hidden" name="h_curr_cd" id="h_curr_cd" value="<bean:write name="ofcInfo" property="trf_cur_cd"/>"/>
	</logic:empty>
	
	<input type="hidden" name="f_sys_ofc_cd" id="f_sys_ofc_cd" value="<bean:write name="sysOfcVO" property="ofc_cd"/>"/>
	<input type="hidden" name="f_sys_ofc_trf_cur_cd" id="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="trf_cur_cd"/>"/>
	<input type="hidden" name="f_rpt_tp_str" id="f_rpt_tp_str" value=""/>
	<input type="hidden" name="f_sel_ofc" id="f_sel_ofc" value=""/>
	
	<!-- GL View Table Data Create LKH 2015.02.25 -->
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	
	<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP">
				<%-- 
					<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" class="btn_accent" style="cursor:hand; display:none;" id = "pdfDowns" onclick="setTorVal('');pdfDown('Print');"><bean:message key="PDF_download"/></button></span>
					<button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="setTorVal('');doWork('Print');"><bean:message key="Print"/></button>
		    		<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="B_TOR_PRINT" onclick="setTorVal('Y');doWork('Print')" id="torPrint">TOR <bean:message key="Print"/></button>
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
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
			<div class="opus_design_inquiry entry_pannel ">
				<div class="layout_wrap" style="height:265px;width:1064px;">
				<div class="layout_vertical_2">
				<table>
						<colgroup>
				        	<col width="80">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
								<th><bean:message key="Branch"/></th>
								<%-- 
								<td>
									<select name="f_ofc_cd" id="f_ofc_cd" style="width:164px;" onChange="curr_search()">
									<bean:define id="officeList" name="valMap" property="officeList"/>
										<bean:size id="len" name="officeList" />
										<logic:greaterThan name="len" value="1">
											<option value=''>ALL</option>
										</logic:greaterThan>
									   	<logic:iterate id="ofcVO" name="officeList">
										<script type="text/javascript">
											ofcCntArr.push("<bean:write name="ofcVO" property="cnt_cd"/>");
										</script>
											<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:equal>
				                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:notEqual>
									   	</logic:iterate>
									</select>
								</td>
								--%>
								<td>
					              <div style="max-width:164px;">
					                   	<bean:define id="oficeList" name="valMap" property="officeList"/>
					                   	<select name="f_ofc_cd" id = "f_ofc_cd"  class="form-control" multiple="multiple" onChange="curr_search()">
											<logic:iterate id="ofcVO" name="oficeList">
											<script type="text/javascript">
											ofcCntArr.push("<bean:write name="ofcVO" property="cnt_cd"/>");
											</script>
							                    <logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
							                    	<option selected="selected"  value="<bean:write name="ofcVO" property="ofc_cd"/>"><bean:write name="ofcVO" property="ofc_cd"/></option>
							                    </logic:equal>
							                    <logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
							                    	<option value="<bean:write name="ofcVO" property="ofc_cd"/>"><bean:write name="ofcVO" property="ofc_cd"/></option>
							                    </logic:notEqual>
						                	</logic:iterate>
						                </select>

					              </div>
					            </td>								
							</tr>
				 		</tbody>
				</table>

				<table>
						<colgroup>
				        	<col width="80">
				        	<col width="80">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
								<th><bean:message key="Period"/></th>
								<td><!-- 
									 --><input Required type="text" name="per_strdt" id="per_strdt"  onKeyPress="onlyNumberCheck();mkDateFormatType(this,event,false,1);" onKeyUp="onlyNumberCheck();mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.per_enddt);firCalFlag=false;onlyNumberCheck();mkDateFormatType(this,event,false,1);" dataformat="excepthan" style="width:75px;ime-mode:disabled;" maxlength="10" class="search_form" onChange="curr_search()"><span class="dash">~</span><!-- 
									 --><input required type="text" name="per_enddt" id="per_enddt" onKeyPress="onlyNumberCheck();mkDateFormatType(this,event,false,1);" onKeyUp="onlyNumberCheck();mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.per_strdt, this);firCalFlag=false;onlyNumberCheck();mkDateFormatType(this,event,false,1);" dataformat="excepthan" style="width:75px;ime-mode:disabled;" maxlength="10" class="search_form" onChange="curr_search()"><!--
								    --><button type="button" class="calendar" tabindex="-1" name="per_dt_cal" id="per_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
								</td>
								<td>
									<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio" class="radio_select" checked><label for="f_dt_tp_radio"><bean:message key="Post_Date"/></label>
									<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio2" class="radio_select"><label for="f_dt_tp_radio2"><bean:message key="Invoice_Date"/></label>
								</td>
							</tr>
				 		</tbody>
				</table>
				
				<table>
						<colgroup>
				        	<col width="80">
				        	<col width="150px">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
									<th><bean:message key="Report_Type"/></th>
									<td>
										<input type="radio" name="f_rpt_tp" id="f_rpt_tp" class="radio_select" checked><label for="f_rpt_tp"><bean:message key="Standard"/></label>
									</td>
									<td>
										<input type="radio" name="f_rpt_tp" id="f_rpt_tp2" class="radio_select"><label for="f_rpt_tp2"><bean:message key="Previous_Year_Comparison"/></label>
									</td>
							</tr>
							<tr>
									<td></td>
									<td>
										<input type="radio" name="f_rpt_tp" id="f_rpt_tp3" class="radio_select"><label for="f_rpt_tp3"><bean:message key="YTD"/></label>
									</td>
									<td>
										<input type="radio" name="f_rpt_tp" id="f_rpt_tp4" class="radio_select"><label for="f_rpt_tp4"><bean:message key="Yearly_Comparison"/></label>
									</td>
							</tr>
						</tbody>
				</table>
				</div>
				<div class="layout_vertical_2">
				<table>
						<colgroup>
				        	<col width="80">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
								<th><bean:message key="Currency"/></th>
								<td>
									<input type="radio" name="f_curr_tp" id="f_curr_tp" class="radio_select" checked><label for="f_curr_tp"><bean:message key="Multi_Currency"/></label>
								</td>
							</tr>
				 		</tbody>
				</table>
				
				<table>
						<colgroup>
				        	<col width="80">
				        	<col width="210">
				        	<col width="100">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
								<td></td>
								<td>
									<input type="radio" name="f_curr_tp" id="f_curr_tp2" class="radio_select" onClick="doWork('SEARCHLIST');"><label for="f_curr_tp2"><bean:message key="One_Currency"/></label>
								</td>
	                    		<td><h3 class="title_design"><bean:message key="To_Currency"/></h3></td>
                           		<td>
	                           		<select name="f_curr_cd" id="f_curr_cd" style="width:90px;" onChange="doWork('SEARCHLIST');">
	                           			 <bean:define id="currencyList" name="valMap" property="currencyList"/>
	                              		 <logic:iterate id="currVO" name="currencyList">
	                              	 		<option value='<bean:write name="currVO" property="cd_val"/>'><bean:write name="currVO" property="cd_nm"/></option>
	                             		  </logic:iterate>
	                           		</select>
	                           	</td>
							</tr>
				 	</tbody>
			</table>
			<div class="opus_design_grid clear" id="mainTable" style="width: 400px; padding-left: 80px;">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			</div>
			</div>
		</div>
	</div>
	<!-- inquiry_area(E) -->	
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


