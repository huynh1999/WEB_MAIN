
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ITList.jsp
*@FileTitle  : Item List
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/item/script/ITEMList.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
		 	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	 	
	 	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
<%
	String in_ctrt_no = "";
	String in_ctrt_nm = "";
	String in_item_no = "";
	String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
	String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
	String USER_ID   = userInfo.getUsrid();
	
	try {
		/* in_ctrt_no = request.getParameter("ctrt_no") == null ? userInfo.getDef_wh_ctrt_no() : request.getParameter("ctrt_no");
		in_ctrt_nm = request.getParameter("ctrt_nm") == null ? userInfo.getDef_wh_ctrt_nm() : request.getParameter("ctrt_nm"); */
		in_ctrt_no = "";
		in_ctrt_nm = ""; 
		in_item_no = request.getParameter("item_cd") == null ? "" : request.getParameter("item_cd");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>
<script type="text/javascript">
	function setupPage(){
		loadPage(true);
	}
</script>
<form id="form" name="form">
<input type="hidden" name="f_CurPage"/>
<input type="hidden" id="f_cmd" value="0" /><%-- 
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" id="user_id" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" id="org_cd" /> --%>

<input type="hidden" name="search_flg" value="N" id="search_flg" />
<input type="hidden" name="supp_cd_old" id="supp_cd_old" />
<input type="hidden" name="supp_nm_old" id="supp_nm_old" />
<input type="hidden" name="buyer_cd_old" id="buyer_cd_old" />
<input type="hidden" name="buyer_nm_old" id="buyer_nm_old" />
<input type="hidden" name="rcv_loc_cd_old" id="rcv_loc_cd_old" />
<input type="hidden" name="rcv_loc_nm_old" id="rcv_loc_nm_old" />
<input type="hidden" name="por_old" id="por_old" />
<input type="hidden" name="por_nm_old" id="por_nm_old" />
<input type="hidden" name="pol_old" id="pol_old" />
<input type="hidden" name="pol_nm_old" id="pol_nm_old" />
<input type="hidden" name="pod_old" id="pod_old" />
<input type="hidden" name="pod_nm_old" id="pod_nm_old" />
<input type="hidden" name="del_old" id="del_old" />
<input type="hidden" name="del_nm_old" id="del_nm_old" />
<input type="hidden" name="sales_ofc_cd_old" id="sales_ofc_cd_old" />
<input type="hidden" name="bk_stff_ofc_cd_old" id="bk_stff_ofc_cd_old" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="user_id" id="user_id" value="<%=USER_ID%>" />
<!-- #738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영 -->
<!-- GridSetting Value -->
<input type="hidden" name="pageurl" id="pageurl" value="ITList.clt"/>


<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP"><!-- LKH::2015-09-27 WMS3.O 긴급수정3 -->
<%-- 		
		<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button>
		
		<!-- 주석 <button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>" name="btn_Copy" id="btn_Copy" onclick="doWork('COPY')"><bean:message key="Copy_To"/></button> -->
		
		<button type="button" class="btn_normal" name="create_item" id="create_item" onClick="doWork('CREATE_ITEM');" style="display:none;" btnAuth="CREATE_ITEM"><bean:message key="Create_Item"/></button>
		<button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>" name="btn_New" id="btn_New" btnType="BTN_NEW" onclick="doWork('NEW')"><bean:message key="New"/></button>
		<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button>
	
 --%>	 </div>
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
		<col width="250" />
		<col width="110" />
		<col width="200" />
		<col width="110" />
		<col width="110" />
		<col width="110" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
			<tr>
  				<th><bean:message key="Contract_No"/></th>
				<td><input name="ctrt_no" type="text" class="input1" id="ctrt_no" value="<%=in_ctrt_no %>" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10"/><!--
				     --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1" onclick="btn_ctrt()"></button><!--
				     --><input name="ctrt_nm" type="text" class="input1" id="in_ctrt_nm" value="<%=in_ctrt_nm %>" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){searchCtrtPop(this);}" maxlength="100"/><!--
				     --></td>
      			<th><bean:message key="Item_Code"/></th>
				<td><input name="cust_item_no" type="text" class="L_input" id="cust_item_no" value="<%=in_item_no %>" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>"  style="width:243px;ime-mode:disabled;text-transform:uppercase;"  maxlength="80"/></td>
				<th><bean:message key="Item_Name"/></th>
				<td><input name="cust_item_nm" type="text" class="L_input" id="cust_item_nm"  dataformat="excepthan" style="width:243px;ime-mode:disabled;text-transform:uppercase;"  maxlength="400"/></td>
				<!-- OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS -->
				<th><label hidden="hidden" id="barcode_label" name="barcode_label"><bean:message key="Barcode_No"/></label></th>
				<td><input name="barcode_no" type="text" id="barcode_no"  dataformat="excepthan" style="width:243px;ime-mode:disabled;text-transform:uppercase; display:none"  maxlength="400"/></td>
			</tr>
			<tr>
				<th><bean:message key="Group_Code"/></th>
				<td><input name="grp_cd" type="text" class="L_input" id="grp_cd" value="" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getItemGroup(this);" maxlength="10"/><!-- 
				     --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1" onclick="btn_grp_cd()"></button>
				</td>
				<th><bean:message key="Supplier"/></th>
				<td><input name="supp_cd" type="text" class="L_input" id="supp_cd" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('CUSTUMER',form.supp_cd,'onBlur');" maxlength="20" OnKeyPress="if(event.keyCode==13){codeNameAction('CUSTUMER',form.supp_cd,'onKeyDown');}"/><!-- 
					 --><button type="button" name="btn_supp_cd" id="btn_supp_cd"class="input_seach_btn" tabindex="-1" onclick="btn_supp()"></button><!--				
					 --><input name="supp_nm" type="text" class="L_input" id="supp_nm" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){btn_supp_nm()}"/><!-- 
					 --></td>
				<th><bean:message key="Use"/></th>
				<td><select name="use_sel" id="use_sel" style="width:127px;">
						<option value="">All</option>
						<option value="Y" selected>Yes</option>
						<option value="N">No</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</div>
<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
	<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <td width="60">
                  <!--- Display option Begin --->
                          <bean:define id="pagingVal" name="valMap"     property="paging"/>
                          <paging:options name="pagingVal" defaultval="200"/>
                  <!--- Display option End --->                 
                      </td>
                      <td align="center">
                          <table  border="0" width="100%">
                              <tr>
                                  <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
                                  <td width="60"></td>
                              </tr>
                          </table>
                      </td>
                  </tr>
               </table>
     </div>
</div>        
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
