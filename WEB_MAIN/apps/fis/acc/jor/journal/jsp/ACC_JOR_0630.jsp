<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : ACC_JOR_0630.jsp
*@FileTitle  : Late Billing Monitoring
*@Description: Late Billing Monitoring
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	

    	
	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0630.js?ver=<%=CLT_JS_VER%>" ></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<script>
	
		var v_ofc_cd = "<%= userInfo.getOfc_cd()%>";
		function setupPage(){
		 	loadPage();
		}
		
	<bean:define id="ofcList" name="valMap" property="ofcList"/>
	<bean:define id="ofcVO" name="ofcList"/>
	<bean:define id="oficeList" name="valMap" property="ofcList"/>
	
	<bean:define id="saleTypeList" name="valMap" property="saleTypeList"/>
	<bean:define id="ComCdDtlVO" name="saleTypeList"/>
	<bean:define id="saleCodeList" name="valMap" property="saleTypeList"/>
	
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	</script>
<form method="post" name="form" onSubmit="return false;">
	<input type="hidden" name="f_cmd"> 
	<input type="hidden" name="f_CurPage">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
			<button type="button" class="btn_accent" onClick="doWork('SEARCHLIST');" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button>
			<button type="button" class="btn_accent" onClick="doWork('CLEAR')" style="display: none;" btnAuth="CLEAR"><bean:message key="Clear"/></button>
			<button type="button" class="btn_accent" onClick="doWork('EXCEL')" style="display: none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Excel"/></button>
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
	
	<!-- wrap_search(S) -->
	<!-- #535: [SBS] 다국어 처리 V1.0 2차 -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<h3 class="title_design"></h3>
		<div class="opus_design_inquiry ">
			<table border="1">
				<colgroup>
	        	<col width="80">
	        	<col width="135">
	        	<col width="100">
	        	<col width="200">
	        	<col width="80">
	        	<col width="100">
	        	<col width="80">
	        	<col width="100">
	        	<col width="80">
	        	<col width="100">
				<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Department"/></th>
						<td>
							<select name="f_detp_cd" style="width:110px;" class="search_form">
								<option value="SO" selected>Ocean Export</option>
								<option value="SI">Ocean Import</option>
								<option value="AO">Air Export</option>
								<option value="AI">Air Import</option>

							</select>	
						</td>
						<th>
							<select name="f_date_type" style="font-weight:bold; width:90px;" class="search_form">
								<option value="POST" selected>Post Date</option>
								<option value="ETD">ETD</option>
								<option value="ETA">ETA</option>

							</select>							
						</th>
						<td><!-- 
							--><input style="width:75px" type="text" name="f_strdt" id="f_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.f_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!-- 
							--><input style="width:75px" type="text" name="f_enddt" id="f_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.f_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE11', form);"></button>
						
						</td>
						<th><bean:message key="BL_Type"/>  </th>
						<td>
							<select name="f_bl_type" id="f_bl_type" style="width:100px;" class="search_form">
                                <bean:size id="len" name="saleCodeList" />
                                <logic:greaterThan name="len" value="1">
                                <option value=''>ALL</option>
                                </logic:greaterThan>
                               	<logic:iterate id="ComCdDtlVO" name="saleCodeList">
                                <option value='<bean:write name="ComCdDtlVO" property="cd_val"/>'><bean:write name="ComCdDtlVO" property="cd_nm"/></option>
                                </logic:iterate>
							</select>							
						</td>
						<th><bean:message key="Sales_Type"/> </th>
						<td>
                                    <select name="f_sales_cd" id="f_sales_cd" style="width:105px" class="search_form">
										<option value="" selected>All</option>
										<option value="N">Free cargo</option>
										<option value="Y">Nomi</option>
										<option value="C">Co-load</option>
                                    </select>							
						</td>
						<th><bean:message key="Office"/></th> 
						<td>
									
                                    <select name="f_ofc_cd" id="f_ofc_cd" style="width:105px" class="search_form">
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
						</td>
						<td>
						</td>
					</tr>
					<tr height="40px">
						<th colspan="10" ><bean:message key="The_Gap_of"/>
							<input type="text" id="f_gap" name= "f_gap" onKeyPress="onlyNumberCheck('-')" onkeyup="numberCommaLen(this,7,0)" value="" style="ime-mode:disabled;width:30px;text-align:right" class="search_form zero_remove" dataformat="excepthan" > <bean:message key="Days"/>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
		
              <table>
              	<tr>
						<td width="100">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>
						<td align="center" width="900">
							<table width="900">
								<tr>
									<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>		
						</td>
						<td width="100"></td>
					</tr>
              </table>		

	</div>
</div>
</form>
<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	
