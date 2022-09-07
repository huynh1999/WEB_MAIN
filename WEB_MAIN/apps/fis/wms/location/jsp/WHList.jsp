<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHList.jsp
*@FileTitle  : 
*@author     : Khanh.Nguyen
*@version    : 1.0
*@since      : 2015/03/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/location/script/WHList.js?ver=<%=CLT_JS_VER%>"></script>

<%

// 	String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
// 	String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

	String DEF_WH_CD = "KRACYW01";
	String DEF_WH_NM = "ANSAN US LOGISTICS WAREHOUSE";
	
%>

<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>


<form id="form" name="form">
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />

<div class="page_title_area clear">

	<h2 class="page_title">
			<button type="button"><span id="title">Warehouse Search</span></button>
	</h2>
	
	<div class="opus_design_btn">
			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_search" id="btn_search">Search</button>
	</div>

	<div class="location">
			<span id='navigation'></span>
	</div>
</div>

<div class= "wrap_search">
<div class="opus_design_inquiry sm">
	<table>
		<colgroup>
	                    <col width="120" />
                        <col width="150" />
                        <col width="100" />
                        <col width="150" />
                        <col width="100" />
                        <col width="150" />
                        <col width="120" />
	                    <col width="*"/>
	    </colgroup>
	     
		<tr>
						<th>Warehouse</th>
						<td><input name="wh_cd" type="text" class="" id="wh_cd" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocInfo(this);" OnKeyDown="if(event.keyCode==13){getLocInfo(this);}" onChange="getLocInfo(this)"/><!-- 
							 --><button type="button" id="btn_wh_cd" name="btn_wh_cd" class="input_seach_btn"></button><!-- 						
							 --><input name="wh_nm" type="text" class="" id="wh_nm" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){locationPopup();}"/>
						 </td>
						<th>City</th>
						<td>
						    <input name="sub_loc_cd" type="text" class="" id="sub_loc_cd" maxlength="5" style="width:130px"/>
                        </td>
                        <th>Office</th>
						<td><input name="sales_ofc_cd" type="text" class="" id="sales_ofc_cd" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getSalesOffice(this);" OnKeyDown="if(event.keyCode==13){getSalesOffice(this);}" maxlength="7"  onChange="getSalesOffice(this);"/><!-- 
                             --><button type="button" id="btn_sales_ofc_cd" name="btn_sales_ofc_cd" class="input_seach_btn"></button><!-- 
                             --><input name="sales_ofc_nm" type="text" class="" id="sales_ofc_nm" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readOnly tabindex="-1"/>
                        </td>
						<th>USE</th>
						<td>
							<select name="use_yn" id="use_yn" style="width:80px">
								<option value="">All</option>
                            	<option value="Y" selected >Y</option>
                                <option value="N">N</option>
                            </select>
						</td>
		</tr>
	</table>
</div>
</div>

<div class="wrap_result">
	<h3 class="title_design">Warehouse Search</h3>
	<div class="opus_design_grid clear" >
				<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	
	<div class="opus_design_grid clear" >
				<h3 class="title_design">Contract List</h3>
				<div class="opus_design_btn">
					<button type="button" class="btn_normal" id="btn_ESop" name="btn_ESop">E-SOP Details</button>
				</div>
				<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>