<%
/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0003.jsp
*@FileTitle  : Item Entry
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
	<script language="javascript" src="./apps/fis/whm/item/itementry/script/WHM_WHM_0003.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<title><bean:message key="system.title"/></title>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String param = request.getParameter("f_cust_itm_cd");
		
		
	%>
	
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
     <logic:notEmpty name="valMap" property="UNITCD">
     	<bean:define id="unitList" name="valMap" property="UNITCD"/>
	   <script>
	  	var parr = "<%=param%>";
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
function setupPage(){
	loadPage();
	if(parr != "null"){
		document.frm1.f_save_sts_flg.value = "U";
		doWork('SEARCHLIST');
		
	}else{
		document.frm1.cust_itm_id.value = "";
		document.frm1.f_save_sts_flg.value = "I";
	}
	
}
</script>

  <body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="post" action="./WHM_WHM_0003.clt" style="margin:0px">
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_save_sts_flg" id="f_save_sts_flg"/>
	<input type="hidden" name="f_cust_itm_id" id="f_cust_itm_id"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title">
			<button type="button"><span id="title">Item Entry</span></button>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button"  class="btn_accent" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" style='display:none' onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')">Search</button><!-- 
			 --><button type="button" btnType="NEW" class="btn_normal"  onclick="doWork('CLEAR')"><bean:message key="New"/></button><!-- 
			 --><button type="button" btnType="SAVE" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
			</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span><bean:message key="Item_Entry_Path"/></span>
		</div>
	</div>
<!-- opus_design_inquiry(S) -->	
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel ">
	<table>
		<colgroup>
			<col width="150">
			<col width="*">
		</colgroup>
		<tbody>
        <tr>
			<th><bean:message key="Internal_Code"/></th> 
           	<td><input name="cust_itm_id" id="cust_itm_id" value = "<%=param%>" maxlength="20"
           			   type="text" class="search_form" dataformat="excepthan" 
           		  	   style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onKeyPress="ComKeyOnlyAlphabet('uppernum','45|95')" onchange="validCode(this)"></td>
   		</tr>
        </tbody>
    </table>
</div>
</div>
<!-- opus_design_inquiry(E) -->
<!-- opus_design_result(S) -->
<div class="wrap_result">
<div class="opus_design_inquiry wFit">
<!-- layout_wrap(S) -->
<div class="layout_wrap">
    <div class="layout_vertical_2">
	<table>
		<colgroup>
			<col width="150">
			<col width="*">
		</colgroup>
		<tbody>
        <tr>
			<th><bean:message key="Customer"/></th>
           	<td ><input type="text" name="cust_cd" id="cust_cd" value="" class="search" 
           				required onKeyDown="codeNameAction('CUSTUMER',this, 'onKeyDown');GetRegisterOfficeCd()" 
           				onBlur="strToUpper(this);codeNameAction('CUSTUMER',this, 'onBlur');GetRegisterOfficeCd()" 
           				dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" ><!-- 
           		 --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('WH_POPLIST')"></button><!-- 
           		 --><input type="text" name="cust_nm" id="cust_nm" value="" style="width:200px;" class="search" readonly><!-- 
           		 --><input type="text" name="rgst_ofc_cd_1" id="rgst_ofc_cd_1" value="" style="width:200px;display: none" class="search" >
           	</td>
   		</tr>
   		</tbody>
   		</table>
   		<table>
		<colgroup>
			<col width="150">
			<col width="100">
			<col width="53">
			<col width="*">
		</colgroup>
		<tbody>
   		<tr>
   			<th><bean:message key="Internal_Code"/></th>
           	<td><input type="text" maxlength="20" name="cust_itm_id_1" id="cust_itm_id_1" value="" class="search" style="ime-mode:disabled;resize:none;width:180px;text-transform:uppercase;" required onKeyPress="ComKeyOnlyAlphabet('uppernum','45|95')" onchange="validCode(this)"> 
           	<th>Use</th>
           	<td><select name="use_flg" id="use_flg" style="width:50px;">
					<option value="Y" selected>Y</option>
					<option value="N">N</option>
				</select>
           	</td>
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
			<th><bean:message key="Code_used_by_Customer"/></th>
           	<td ><input type="text" name="itm_cd" id="itm_cd" value="" maxlength="20" style="width:180px;text-transform:uppercase;" class="search" required onKeyPress="ComKeyOnlyAlphabet('uppernum','45|95')" onchange="validCode(this)"></td>
   		</tr>
   		 <tr>
			<th><bean:message key="Item_Name"/></th>
           	<td ><input type="text" name="itm_nm" id="itm_nm" value="" style="width:290px;text-transform:uppercase;" class="search" required maxlength="100"></td>
   		</tr>
   		 <tr>
			<th><bean:message key="HTS_Code"/></th>
           	<td><input type="text" name="itm_hts_cd" id="itm_hts_cd" value=""  class="search" dataformat="excepthan" 
           				style="ime-mode:disabled; text-transform:uppercase;width:150px;" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" 
           				onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')"><!-- 
           		 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('COMMODITY_POPLIST')"></button><!-- 
           		 --><input type="text" name="itm_hts_nm" id="itm_hts_nm" value="" style="width:200px;" class="search" disabled>
           	</td>
   		</tr>
   		</tbody>
   		</table>
   		<table>
		<colgroup>
			<col width="150">
			<col width="179">
			<col width="100">
			<col width="*">
		</colgroup>
		<tbody>
   		 <tr>
			<th><bean:message key="Unit"/></th>
           	<td nowrap><select required name="itm_ut_cd" id="itm_ut_cd" style="width:100px;">
	        	<option value=""></option>
	        	
	        	<logic:notEmpty name="valMap" property="UNITCD">
			     	<bean:define id="unitList" name="valMap" property="UNITCD"/>
		            <logic:iterate id="codeVO" name="unitList">
		                <option value='<bean:write name="codeVO" property="pck_ut_cd"/>'>
        				   <bean:write name="codeVO" property="pck_nm"/>
        				</option>
		            </logic:iterate>
			    </logic:notEmpty>
	        	</select></td>
			<th>Inner Qty</th>
           	<td><input type="text" name="itm_inr_qty" id="itm_inr_qty" value="" onkeyPress="ComKeyOnlyNumber();"  onblur="validateNumber(this,'INT');"
           			style="width:105px;text-align:right" class="search" required maxlength="7" dataformat="excepthan"></td>
   		</tr>
        </tbody>
    </table>
    </div>
    <div class="layout_vertical_2">
    <table>
		<colgroup>
			<col width="50">
			<col width="150">
			<col width="50">
			<col width="*">
		</colgroup>
		<tbody>
        <tr>
			<th>Weight</th>
           	<td><input type="text" name="itm_wgt" id="itm_wgt" value="0.00"  class="search" onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this);" maxlength="12" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>KGS</label></td>
			<th></th>
           	<td><input type="text" name="itm_wgt_lbs" id="itm_wgt_lbs" value="0.00" class="search"  onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="12" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>LBS</label></td>
   		</tr>
        <tr>
			<th>Measurement</th>
           	<td><input type="text" name="itm_vol" id="itm_vol" value="0.000" class="search" onfocus="this.value=ComReplaceStr(this,',','')"
           				onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="13" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>CBM</label></td>
			<th></th>
           	<td><input type="text" name="itm_vol_cft" id="itm_vol_cft" value="0.000" class="search"   onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="13" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>CFT</label></td>
   		</tr>
        <tr>
			<th>Width</th>
           	<td><input type="text" name="itm_wdt" id="itm_wdt" value="0.00" class="search"  onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="12" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>CM</label></td>
			<th></th>
           	<td><input type="text" name="itm_wdt_inch" id="itm_wdt_inch" value="0.00" class="search"  onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="12" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>Inch</label></td>
   		</tr>
        <tr>
			<th>Height</th>
           	<td><input type="text" name="itm_hgt" id="itm_hgt" value="0.00" class="search" onfocus="this.value=ComReplaceStr(this,',','')" 
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="12" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>CM</label></td>
			<th></th>
           	<td><input type="text" name="itm_hgt_inch" id="itm_hgt_inch" value="0.00" class="search" onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="12" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>Inch</label></td>
   		</tr>
        <tr>
			<th>Length</th>
           	<td><input type="text" name="itm_len" id="itm_len" value="0.00" class="search" onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="12" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>CM</label></td>
			<th></th>
           	<td><input type="text" name="itm_len_inch" id="itm_len_inch" value="0.00" class="search" onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="12" 
           			   dataformat="excepthan" style="ime-mode:disabled;width:200px;text-align:right"><label>Inch</label></td>
   		</tr>
        <tr>
			<th>Price</th>
            <td><input type="text" name="itm_prc_amt" id="itm_prc_amt" value="0.00" style="width:200px;text-align:right" class="search"  onfocus="this.value=ComReplaceStr(this,',','')"
           			   onblur="validateNumber(this,'FLT');checkMaxValue(this)" maxlength="14"><!-- 
           	 --><select name="itm_curr_cd" id="itm_curr_cd" style="width:65px;">
				    <bean:define id="paramCurrList"  name="valMap" property="currList"/>
				    <logic:iterate id="CurrVO" name="paramCurrList">
				    <option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
				    </logic:iterate>
				    </select>
			</td>
			<td></td>
   		</tr>
   		</tbody>
   	</table>
    </div>
</div>
</div>	
  <!-- opus_design_grid(S) -->
      	<div class="opus_design_grid">
      	 <h3 class="title_design">Supplier</h3>
         	<div class="opus_design_btn">
         	<button type="button"  class="btn_normal" onclick="doWork('Add')">Add</button>
			</div>
		<script type="text/javascript">comSheetObject('sheet1');</script>
		<script type="text/javascript">comSheetObject('sheet2');</script>
    	</div>
    	<!-- opus_design_grid(E) -->	
</div>
<!-- opus_design_result(E) -->
</form>
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
