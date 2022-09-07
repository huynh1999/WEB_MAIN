<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ITEMGroup.jsp
*@FileTitle  : Item Group
*@author     : DOU Network
*@version    : 1.0
*@since      : 2015/03/17
=========================================================--%>
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
    <script type="text/javascript" src="./apps/fis/wms/item/script/ITEMGroup.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String in_ctrt_no = "";
	String in_ctrt_nm = "";
	String in_item_no = "";
	
	try {
		 in_ctrt_no   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
		 in_ctrt_nm   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
		in_item_no = request.getParameter("item_cd") == null ? "" : request.getParameter("item_cd");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>

<form id="form" name="form">

<input type="hidden" id="f_cmd" value="0"/> 
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="search_flg" value = "N" id="search_flg"></input>
<input type="hidden" name="supp_cd_old" id="supp_cd_old"></input>
<input type="hidden" name="supp_nm_old" id="supp_nm_old"></input>
<input type="hidden" name="buyer_cd_old" id="buyer_cd_old"></input>
<input type="hidden" name="buyer_nm_old" id="buyer_nm_old"></input>
<input type="hidden" name="rcv_loc_cd_old" id="rcv_loc_cd_old"></input>
<input type="hidden" name="rcv_loc_nm_old" id="rcv_loc_nm_old"></input>
<input type="hidden" name="por_old" id="por_old"></input>
<input type="hidden" name="por_nm_old" id="por_nm_old"></input>
<input type="hidden" name="pol_old" id="pol_old"></input>
<input type="hidden" name="pol_nm_old" id="pol_nm_old"></input>
<input type="hidden" name="pod_old" id="pod_old"></input>
<input type="hidden" name="pod_nm_old" id="pod_nm_old"></input>
<input type="hidden" name="del_old" id="del_old"></input>
<input type="hidden" name="del_nm_old" id="del_nm_old"></input>
<input type="hidden" name="sales_ofc_cd_old" id="sales_ofc_cd_old"></input>
<input type="hidden" name="bk_stff_ofc_cd_old" id="bk_stff_ofc_cd_old"></input>

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		
		<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button>
		<!-- <button type="button" class="btn_normal" name="btn_New" id="btn_New" onClick="doWork('NEW');">New</button> -->
		<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button>
		
 --%> 	</div>
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
<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel ">
	<table>
    	<colgroup>
		<col width="80" />
		<col width="180" />
		<col width="80" />
		<col width="220" />
		<col width="120" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
			<tr>
  				<th><bean:message key="Group_Code"/></th>
				<td>
					<input name="in_grp_cd" otherchar="-_" type="text" class="L_input" id="in_grp_cd" value="" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="10"/>
				</td>				
      			<th><bean:message key="Group_Name"/></th>
				<td>
					<input name="in_grp_nm" type="text" class="L_input" id="in_grp_nm"  style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="400"/>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="in_ctrt_no" type="text" required class="L_input" id="ctrt_no" value="<%=in_ctrt_no %>" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);searchCtrtInfo();" OnKeyDown="if(event.keyCode==13){searchCtrtInfo();}" onChange="searchCtrtInfo();" maxlength="10"/><!--
				--><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1" onclick="btn_ctrt()"></button><!--  
			     --><input name="in_ctrt_nm" type="text" required class="L_input" id="in_ctrt_nm" value="<%=in_ctrt_nm %>" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){searchCtrtPop();}" maxlength="100"/> 
				     
				</td>
			</tr>
			<tr>
				<th><bean:message key="Item_Code"/></th>
				<td>
					<input name="in_item_cd" type="text" class="L_input" id="in_item_cd" value="" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);" maxlength="400"/>
				</td>
				<th><bean:message key="Item_Name"/></th>
				<td>
					<input name="in_item_nm" type="text" class="L_input" id="in_item_nm"  dataformat="etc" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="400"/>
				</td>
				<th><bean:message key="Use"/></th>
				<td><select name="in_use_sel" id="use_sel" style="width:104px;">
						<option value=""><bean:message key="All"/></option>
						<option value="Y" selected><bean:message key="Yes"/></option>
						<option value="N"><bean:message key="no"/></option>
					</select></td>
			</tr>
		</tbody>
	</table>
</div>
</div>
<!-- opus_design_inquiry(E) -->
<!-- layout_wrap(S) -->
<div class="wrap_result">
<div class="layout_wrap">
    <div class="layout_vertical_2">
        <!-- opus_design_grid(S) -->
        
        <div class="opus_design_grid">
        <h3 class="title_design"><bean:message key="Group_Code_List"/></h3>
					<div class="opus_design_btn">
					 	<button type="button" class="btn_normal" name="row_add" id="row_add" onClick="doWork('row_add');"><bean:message key="Add"/></button><!-- 
					 --><button type="button" class="btn_normal" name="row_del" id="row_del" onClick="doWork('row_del');"><bean:message key="Del"/></button><!-- 
					 --><button type="button" class="btn_normal" name="btn_add_df_kit_set" id="btn_add_df_kit_set" onClick="doWork('ADDKITSET');"><bean:message key="Default_Kit_Set"/></button><!--
					--></div>
				<!-- opus_design_btn(E) -->
            <script type="text/javascript">comSheetObject('sheet1');</script>
        </div>
        <!-- opus_design_grid(E) -->
    </div>
    <div class="layout_vertical_2 pad_left_4">
        <!-- opus_design_grid(S) -->
        
        <div class="opus_design_grid">
        <h3 class="title_design"><bean:message key="Sub_Item_of_Group_Code"/></h3>
					<div class="opus_design_btn">
						<button type="button" class="btn_normal" name="row_add" id="btn_no_use" style = "visibility : hidden">No Use</button>
					</div>
				<!-- opus_design_btn(E) -->
            <script type="text/javascript">comSheetObject('sheet2');</script>
        </div>
        <div class="opus_design_grid" style ="display:none">
    		<script type="text/javascript">comSheetObject('sheet3');</script>
        </div>
        <!-- opus_design_grid(E) -->
    </div>
</div>
<!-- layout_wrap(E) -->
</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>

