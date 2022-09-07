<%
/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0004.jsp
*@FileTitle  : Item List
*@author     : Tin Luong
*@version    : 1.0
*@since      : 2014/12/15
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.component.util.JSPUtil"%></html>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<script language="javascript" src="./apps/fis/whm/item/itemlist/script/WHM_WHM_0004.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<title><bean:message key="system.title"/></title>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
     <logic:notEmpty name="valMap" property="UNITCD">
     	<bean:define id="unitList" name="valMap" property="UNITCD"/>
	   <script>
		var UNITCD1 = '';
		var UNITCD2 = '';
		<!-- Freight Unit 단위 -->
			<% boolean isBegin = false; %>
            //<bean:define id="unitList" name="valMap" property="UNITCD"/>
            <logic:iterate id="codeVO" name="unitList">
                <% if(isBegin){ %>
                    UNITCD1+= '|';
                    UNITCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                UNITCD1+= '<bean:write name="codeVO" property="pck_ut_cd"/>';
                UNITCD2+= '<bean:write name="codeVO" property="pck_nm"/>';
            </logic:iterate>
 		</script>  
    </logic:notEmpty>
    <script>
    function setSelect(){
		   var formObj = document.frm1;
		   if('CM' == '<bean:write name="hmOutParam" property="len_ut_cd"/>') {
				formObj.f_len_ut_cd[0].checked = "Y";
			}else{
				formObj.f_len_ut_cd[1].checked = "Y";
			}
	   }
    </script>
<script>
function setupPage(){
	loadPage();
	setSelect();
}
</script>

<body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="post" action="./WHM_WHM_0004.clt" style="margin:0px">
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_save_sts_flg" id="f_save_sts_flg"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title"><button type="button">Item List</button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			 <button type="button" btnType="SEARCH" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button><!--
			--><button type="button"  class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="document.frm1.f_CurPage.value='';doWork('NEW')">New</button><!-- 
			 --><button type="button" btnType="CLEAR" class="btn_normal" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button><!-- 
			 --><button type="button" btnType="EXCEL" style="display: none;" btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" onclick="doWork('EXCEL')"><bean:message key="Excel"/></button>
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
<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
	<table>
		<colgroup>
			<col width="50">
			<col width="150">
			<col width="80">
			<col width="150">
			<col width="50">
			<col width="*">
		</colgroup>
			<tbody>
       			 <tr>
       			 <th><bean:message key="Customer"/></th>
           	 	 <td><input type="text" name="cust_cd" id="cust_cd" maxlength="20" 
           	 	 			style="width:150px;text-transform:uppercase;" class="search" 
           				 	onKeyDown="codeNameAction('CUSTUMER',this, 'onKeyDown')" 
           					onBlur="strToUpper(this);codeNameAction('CUSTUMER',this, 'onBlur')"><!-- 
           		 --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('WH_POPLIST')"></button><!-- 
           		 --><input type="text" name="cust_nm" id="cust_nm" value="" style="width:200px;text-transform:uppercase;" class="search" readonly></td>
       			 <th><bean:message key="Supplier"/></th>
           	 	 <td><input type="text" name="splr_cd" id="splr_cd" value="" style="width:150px;text-transform:uppercase;" class="search" maxlength="20" 
           				 	onKeyDown="codeNameAction('SUPPLIER',this, 'onKeyDown')" 
           					onBlur="strToUpper(this);codeNameAction('SUPPLIER',this, 'onBlur')"><!-- 
           		 --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('WH_POPLIST1')"></button><!-- 
           		 --><input type="text" name="supplier_nm" id="supplier_nm" value="" style="width:200px;text-transform:uppercase;" class="search" readonly ></td>
           		 <th><bean:message key="Use"/></th>
           		 <td><select name="use_flg" id="use_flg" style="width:50px;">
					<option value="HRP" selected>Y</option>
					<option value="TRP">N</option>
					</select></td>
        		</tr>
        	</tbody>
    </table>
    <table>
		<colgroup>
			<col width="150">
			<col width="*">
		</colgroup>
			<tbody>
       			 <tr>
       			 	<td><select name="select_opt" id="select_opt" style="width:150px;" onchange="select_option()">
					<option value="CD" selected>Customer Item Code</option>
					<option value="ID">Internal Code</option>
					<option value="NM">Name</option>
					</select><!-- 
           			 --><input type="text" name="item_select_cd" id="item_select_cd" value="" style="width:289px;text-transform:uppercase;" class="search" onkeydown="entSearch();"><!-- 
           			 --><input type="text" name="item_select_id" id="item_select_id" value="" style="width:289px;display: none;text-transform:uppercase;" class="search" ><!-- 
           			 --><input type="text" name="item_select_nm" id="item_select_nm" value="" style="width:289px;display: none;text-transform:uppercase;" class="search" >
           			</td>
       			 </tr>
   			</tbody>
	</table>
    </div>
</div>
<!-- opus_design_inquiry(E) -->
<!-- opus_design_result(S) -->
<div class="wrap_result">
 <!-- opus_design_grid(S) -->
	<div class="opus_design_data pad_btm_8">
	<div>
	<table>
		<colgroup>
			<col width="150">
			<col width="*">
		</colgroup>
			<tbody>
			<tr>
				<td><input type="radio" name="f_len_ut_cd" id="f_len_ut_cd1" value="CM" onClick="javascript:chkSizeType();"><label for="f_len_ut_cd1"><bean:message key="Cm"/></label><!-- 
				--><input type="radio" name="f_len_ut_cd" id="f_len_ut_cd2" value="INCH" onClick="javascript:chkSizeType();"><label for="f_len_ut_cd2"><bean:message key="Inch"/></label>
				</td>
			</tr>
		</tbody>
	</table>
	</div>
	</div>
	<div class=“opus_design_grid”>
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
 <!-- opus_design_grid(E) -->
</div>
</form>
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
