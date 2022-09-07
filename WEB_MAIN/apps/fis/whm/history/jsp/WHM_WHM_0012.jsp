<%
/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WHM_WHM_0012.jsp
*@FileTitle  : Warehouse Closing
*@author     : Bao.Huynh
*@version    : 1.0
*@since      : 2015/10/06
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.component.util.JSPUtil"%></html>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../syscommon/header/CLTHeader.jsp"%>
	<script language="javascript" src="./apps/fis/whm/history/script/WHM_WHM_0012.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<title><bean:message key="system.title"/></title>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		
	%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="warehouse" name="cdMap" property="warehouse"/>
<script>
function setupPage(){
	var warehouseCode = "";
	var warehouseText = "";
    <logic:iterate id="WhVO" name="warehouse">
	    warehouseCode+= '<bean:write name="WhVO" property="wh_cd"/>' + '|';
	    warehouseText+= '<bean:write name="WhVO" property="wh_nm"/>' + '|';
    </logic:iterate>
	loadPage();
}
</script>
	<form name="frm1">
	<input type="hidden" name="f_cmd" id="f_cmd" value="0"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="pageurl" id="pageurl" value="WHM_WHM_0012.clt"/>
	
	<input type="hidden" name="str_date" id="str_date"/>
	<input type="hidden" name="end_date" id="end_date"/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- 
			 <button type="button"  class="btn_accent"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
			 <button type="button"  class="btn_normal"  onclick="doWork('PRINT')"><bean:message key="Print"/></button> 
			 <button type="button" btnType="EXCEL"  class="btn_normal" onclick="doWork('EXCEL');"><bean:message key="Excel"/></button>
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
	</div>
<!-- opus_design_inquiry(S) -->
<div class="over_wrap">	
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel ">
	<table>
		<colgroup>
			<col width="80">
			<col width="*">
		</colgroup>
		<tbody>
	        <tr>
				<th><bean:message key="Warehouse"/></th>
				<td><logic:notEmpty name="EventResponse">
						<select name="warehouse" id="warehouse" style="width: 160px;" required onchange="doWork('CHANGE');">
							<option value=""></option>
							<logic:iterate id="WhVO" name="warehouse">
								<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
							</logic:iterate>
						</select><!-- 
					 --></logic:notEmpty>
				</td>
	   		</tr>
        </tbody>
    </table>
</div>
</div>
<!-- opus_design_inquiry(E) -->
<!-- opus_design_result(S) -->
<div class="wrap_result">
	<div class="opus_design_inquiry">
		<div class="layout_wrap">
			<div class="layout_flex_flex" style="padding-right: 858px;padding-top: 10px;">
			<h3 class="title_design">Customer List</h3>
				<div class= "opus_design_grid">
						<script language="javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
			
			<div class="layout_flex_fixed" style="width:850px; float: right;">
				<div class="layout_wrap">
					<div class="layout_vertical_2" style="width:135px;padding-right:8px;padding-top: 50px;" >
						<div class= "opus_design_inquiry sm">
						<table>
							<colgroup>
			            		<col width="10"></col>
			            		<col width="*"></col>
			            	</colgroup>
			            	<tr>
							<th></th>
				            <td><bean:message key="Closing_Date"/></td>
				            </tr>
			            	<tr>
							<th></th>
				            <td><input type="text"  name="date" id="date" value = "" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true,1);checkdate()"  style="width:75px;text-align:center;"><!-- 
				            	 --><button type="button" id="f_dt" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
				            </td>
				            </tr>
			            	<tr>
							<th></th>
				            <td><bean:message key="Rate"/></td>
				            </tr>
			            	<tr>
							<th></th>
				            <td><input type="text"  name="rate" id="rate" value="0.00000000" style="width:110px;text-align:right;" onkeypress="onlyNumberCheck();" onchange="checkNumFormat(this, '999.00000000');chkComma(this,3,8);"></td>
				            </tr>
			            	<tr>
							<th></th>
				            <td><button type="button" id="close" onclick="doWork('CLOSING');" class="btn_etc"><bean:message key="Closing"/></button></td>
				            </tr>
				        </table>
						</div>
					</div>

					<div class="layout_vertical_2" style="width:700px" >
						<div class= "opus_design_grid">
						<h3 class="title_design">Closing History</h3>
						<div class="opus_design_btn">
							<button type="button" class="btn_normal"  name="btn_del" id="btn_del" onclick="doWork('DEL')"><bean:message key="Delete"/></button>
						</div>
							<script language="javascript">comSheetObject('sheet2');</script>
						</div>
						<table>
							<tr>
								<td width="55px">
									<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
									 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
									 <paging:options name="pagingVal" defaultval="200"/> 
								</td>
								<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
							</tr>   
						</table>	
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>
</div>
<!-- opus_design_result(E) -->
</form>

