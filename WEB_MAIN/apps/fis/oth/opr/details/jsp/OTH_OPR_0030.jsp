<%--
/*=========================================================
*Copyright(c) 20px14 CyberLogitec. All Rights Reserved.
*@FileName   : OTH_OPR_0030.jsp
*@FileTitle  : Purchase Order Entry 등록
*@author     : PhiTran
*@version    : 1.0
*@since      : 20px14/06/23
=========================================================*/
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="poVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
   <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-12 자동완성 기능 추가 S -->	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-12 자동완성 기능 추가 E -->
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/oth/opr/details/script/OTH_OPR_0030.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>	
	var AUTOCOMPLETE_YN = 'N';
	 
	<logic:notEmpty name="valMap" property="autocompleteYn">
    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
	 
		function setupPage()
		{
			setOfficeData();
			loadPage();
			btnLoad();
			doHideProcess();
			loadData();
		}
		
		function btnLoad(){
			
			if (frm1.po_sys_no.value == "") {
				getObj("fileUp").style.display  = 'none';
				getBtnObj("btnCopy").style.display = 'none';
				getBtnObj("btnDelete").style.display = 'none';
				frm1.ord_sts_cd.disabled = true;
			} else {
				getObj("fileUp").style.display  = 'inline';
				getBtnObj("btnCopy").style.display = 'inline';
				getBtnObj("btnDelete").style.display = 'inline';
				frm1.ord_sts_cd.disabled = false;
			}
			
			if (frm1.ord_sts_cd.value == "E") { // Completed일 경우 수정 불가
				getBtnObj("btnSave").style.display  = 'none';
				getBtnObj("btnSaveX").style.display  = 'none';
				getBtnObj("btnDelete").style.display = 'none';
				frm1.ord_sts_cd.disabled = true;
			} else {
				getBtnObj("btnSave").style.display  = 'inline';
				getBtnObj("btnSaveX").style.display  = 'inline';
				getBtnObj("btnDelete").style.display = 'inline';
			}
			
			getObj("sDoc").style.display  = 'inline';
		}

		<% boolean isBegin = false; %>
		
		<!-- ###Package 코드## -->
		var PCKCD1 = '|';
		var PCKCD2 = '|';
		<% isBegin = false; %>
        <bean:define id="pckList" name="valMap" property="pckCdList"/>
		<logic:iterate id="pckVO" name="pckList">
			<% if(isBegin){ %>
				PCKCD1+= '|';
				PCKCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PCKCD1+= '<bean:write name="pckVO" property="pck_nm"/>';
			PCKCD2+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
		</logic:iterate>
		
		<!-- ###User Define Field 코드## -->
		var UDFCD1 = '|';
		var UDFCD2 = '|';
		<% isBegin = false; %>
        <bean:define id="udfCdList" name="valMap" property="udfCdList"/>
		<logic:iterate id="codeVO" name="udfCdList">
			<% if(isBegin){ %>
				UDFCD1+= '|';
				UDFCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   UDFCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
			   UDFCD2+= '<bean:write name="codeVO" property="cd_val"/>';
		</logic:iterate>
		
		<!-- ###Office Info## -->
        <% isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
        
        var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
		
   </script>
<form name="frm1" method="POST" action="./OTH_OPR_0030.clt" class="filter">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" id="user_id" />
	<input type="hidden" name="save_sts_flg"/>
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />

	<input type="hidden" name="mailTitle" value="" id="mailTitle" />
	<input type="hidden" name="mailTo" value="" id="mailTo" />

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" value="" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" value="" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_tp" value="" id="rpt_tp" />
	<!--  Report ==> OutLook연동 파라미터 (E) -->

    <!-- 조회된 Buyer PO No 변경시 비교를 위해서 -->
    <input type="hidden" name="org_cust_po_no" value="<bean:write name="poVO" property="cust_po_no"></bean:write>" id="org_cust_po_no" />
    
    <input type="hidden" name="org_ord_sts_cd" value="<bean:write name="poVO" property="ord_sts_cd"></bean:write>" id="org_ord_sts_cd" />
    
    <!--  jsjang 20px13.8.29 #1760px4 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" value='<bean:write name="valMap" property="f_isNumSep"></bean:write>' id="f_isNumSep" /> 
    
    <input type="hidden" name="org_po_sys_no" value='<bean:write name="valMap" property="org_po_sys_no"></bean:write>' id="org_po_sys_no" /> 
    
   <!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP" >
			<%-- 
			<span style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button></span>
			<span style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><button type="button" class="btn_normal" onClick="doWork('NEW')"><bean:message key="New"/></button></span>
			<span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" onclick="doWork('SAVE');" name="btnSave" id="btnSave"><bean:message key="Save"/></button></span>
			<button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
			<span style="display: none;" btnAuth="COPY"><button type="button" class="btn_normal" style="display: none" onclick="doWork('COPY')" name="btnCopy" id="btnCopy"><bean:message key="Copy"/></button></span>
			<span style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button type="button" class="btn_normal" style="display: none" onclick="doWork('REMOVE')" name="btnDelete" id="btnDelete"><bean:message key="Delete"/></button></span>
			--%>
		</div>
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
    <!-- page_location(E) -->
</div>
<div class="over_wrap" height="100%">
<div class= "wrap_search_tab">
  <div class= "opus_design_inquiry wFit">
  	<table>
  		<colgroup>
  			<col width="50" />
  			<col width="170px" />
  			<col width="70px" />
  			<col width="*" />
  		</colgroup>
  		<tr>
            <th><bean:message key="Customer_PO_No"/></th>
            <td>
                <input name="f_cust_po_no" maxlength="20" value="<bean:write name="valMap" property="f_cust_po_no"/>" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)">
            </td>
            <th><bean:message key="PO_Sys_No"/></th>
            <td>
                <input name="f_po_sys_no"  maxlength="40" value="<bean:write name="valMap" property="f_po_sys_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)">
            </td>
		</tr>
  	</table>
	</div>
</div>	
<!-- page_title_area(E) -->	
<div class="wrap_result_tab">
	<div class="opus_design_grid" style="display: none;">
		<script language="javascript">comSheetObject('sheet1');</script>
	</div>
    <ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Purchase_Order"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Item"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="User_Define_Field"/></span></a></li>
        <li id=Tab04><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Document_List"/></span></a></li>
    </ul>
		<!-- tab_player_ 1 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:inline"><!-- Purchase_Order -->
			<div class= "opus_design_inquiry">
				<table>
					<colgroup>
						<col width="70">
						<col width="300">
						<col width="70">
						<col width="300">
						<col width="70">
						<col width="*">
					</colgroup>
					<tbody>
					<tr>
                    	<th><bean:message key="Customer_PO_No"/></th>
                        <td>
                        	<input required type="text" name="cust_po_no" maxlength="20" value='<bean:write name="poVO" property="cust_po_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:150px;text-transform:uppercase;" onblur="strToUpper(this);">
                            
                            <bean:define id="ofcList" name="valMap" property="ofcList"/> 
                            <html:select name="poVO" property="ref_ofc_cd" styleClass="search_form" style="width:55px;">
							<html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/>
							</html:select>
							<input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="poVO" property="ref_ofc_cd"/>">
                        </td>
                        <th><bean:message key="PO_Sys_No"/></th>
                        <td>
                        	<input type="text" name="po_sys_no" value="<bean:write name="poVO" property="po_sys_no"/>" class="search_form-disable" tabindex="-1" readOnly style="width:150px;" >
                       	</td>
                        <th><bean:message key="PO_Status"/></th>
						<td>
							<bean:define id="ordStsCdList" name="valMap" property="ordStsCdList"/>
                           	<html:select name="poVO" property="ord_sts_cd" styleClass="search_form" style="width:100px;">
                            	<html:options collection="ordStsCdList" property="cd_val" labelProperty="cd_nm"/>
                            </html:select>
	                      	<input type="hidden" name="h_ord_sts_cd" value="<bean:write name="poVO" property="ord_sts_cd"/>">
						</td>
					</tr>
					</tbody>
				</table>
			</div>
			
			<div class="layout_wrap">
			<!-- layout_vertical_2 a(S) -->
			    <div class="layout_vertical_3" style="width:415px;">
			     
			    	<div class="opus_design_inquiry sm" style="height:580px">
			    	
				    	<table>
				    		<colgroup>
				    			<col width="90px" />
				    			<col width="200px" />
				    			<col width="90px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
				    			<tr>
				                	<th><bean:message key="Contract_No"/></th>
									<td colspan="3">
										<input name="ctrt_no" id="ctrt_no" type="text" value='<bean:write name="poVO" property="ctrt_no"/>'  class="search_form" style="width:95px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" maxlength="10" onChange="getCtrtInfo(this)" required  onblur="getCtrtInfo(this)"/>
										<button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onclick="doWork('btn_ctrt_no')" class="input_seach_btn" tabindex="-1"></button>						
										<input name="ctrt_nm" id="ctrt_nm" type="text" value='<bean:write name="poVO" property="ctrt_nm"/>'  class="search_form" style="width:calc(100% - 135px);ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" readonly />
									</td>
				                </tr>
				    			<tr>
									<th><bean:message key="Customer"/></th>
                                    <td colspan="3">
                                    	<input type="text" name="cust_trdp_cd" value='<bean:write name="poVO" property="cust_trdp_cd"/>'  class="search_form" maxlength="20" onKeyDown="codeNameAction('CUST',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUST',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:95px;" readonly>
                                        <!-- <button type="button" name="cust" id="cust" class="input_seach_btn" tabindex="-1" onClick="doWork('CUST_POPLIST')"></button> -->
                                        <input type="text"   name="cust_trdp_nm" value='<bean:write name="poVO" property="cust_trdp_nm"/>'  id="cust_trdp_nm"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 103px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){doWork('CUST_POPLIST');}" readonly>
                                 	</td>
                                </tr>
                                <tr>
                                	<th><bean:message key="Address"/></th>
                                	<td colspan="3">
                                    	<textarea name="cust_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;;height:80px;" 
                                    	onblur="strToUpper(this);chkCmpAddr(this, 'Buyer Address')" WRAP="off"><bean:write name="poVO" property="cust_trdp_addr" filter="false"/></textarea>
                             		</td>
                             	</tr>
                             	<tr>
                             		<th><bean:message key="PIC"/></th>
                             		<td>
                             			<input type="text" name="cust_trdp_pic" value='<bean:write name="poVO" property="cust_trdp_pic"/>'  class="search_form" maxlength="50" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             		<th><bean:message key="EMail"/></th>
                             		<td>
                             			<input type="text" name="cust_trdp_eml" value='<bean:write name="poVO" property="cust_trdp_eml"/>'  class="search_form" maxlength="100" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             	</tr>
                             	<tr>
                             		<th><bean:message key="Tel"/></th>
                             		<td>
                             			<input type="text" name="cust_trdp_phn" value='<bean:write name="poVO" property="cust_trdp_phn"/>'  class="search_form" maxlength="30"  dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             		<th><bean:message key="Fax"/></th>
                             		<td>
                             			<input type="text" name="cust_trdp_fax" value='<bean:write name="poVO" property="cust_trdp_fax"/>'  class="search_form" maxlength="30"   dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             	</tr>
                             	<!-- 
                             	
                                 -->
                                <tr>
                                	<th><a href="javascript:clearPoPrnr('V');"><bean:message key="Vendor"/></a></th>
                                    <td colspan="3">
                                    	<input required type="text" name="vndr_trdp_cd" value='<bean:write name="poVO" property="vndr_trdp_cd"/>'  class="search_form" maxlength="20" onKeyDown="codeNameAction('VENDOR',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('VENDOR',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:95px;">
                                        <button type="button" name="buyr" id="buyr" class="input_seach_btn" tabindex="-1" onClick="doWork('VENDOR_POPLIST')"></button>
                                        <input required type="text"   name="vndr_trdp_nm" value='<bean:write name="poVO" property="vndr_trdp_nm"/>'  id="vndr_trdp_nm"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 135px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){doWork('VENDOR_POPLIST_NAME');}">
                                 	</td>
                              	</tr>
                                <tr>
                                	<th><bean:message key="Address"/></th>
                                	<td colspan="3">
                                    	<textarea name="vndr_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;" 
                                    	onblur="strToUpper(this);chkCmpAddr(this, 'Vendor Address')" WRAP="off"><bean:write name="poVO" property="vndr_trdp_addr" filter="false"/></textarea>
                                    </td>
                               	</tr>
                               	<tr>
                             		<th><bean:message key="PIC"/></th>
                             		<td>
                             			<input type="text" name="vndr_trdp_pic" value='<bean:write name="poVO" property="vndr_trdp_pic"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" maxlength="50" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             		<th><bean:message key="EMail"/></th>
                             		<td>
                             			<input type="text" name="vndr_trdp_eml" value='<bean:write name="poVO" property="vndr_trdp_eml"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" maxlength="100" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             	</tr>
                             	<tr>
                             		<th><bean:message key="Tel"/></th>
                             		<td>
                             			<input type="text" name="vndr_trdp_phn" value='<bean:write name="poVO" property="vndr_trdp_phn"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" maxlength="30"  dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             		<th><bean:message key="Fax"/></th>
                             		<td>
                             			<input type="text" name="vndr_trdp_fax" value='<bean:write name="poVO" property="vndr_trdp_fax"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" maxlength="30"  dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             	</tr>
                             	<tr>
	                            	<th><bean:message key="Order_Date"/></th>
	                               	<td colspan=3>
	                                	<input required name="ord_dt" id="ord_dt" value='<wrt:write name="poVO" property="ord_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1);" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Order Date');" size='11' maxlength="10" class="search_form">
	                                    <button required  type="button" class="calendar" tabindex="-1" name="ord_dt_cal" id="ord_dt_cal"  onclick="doDisplay('DATE1',frm1.ord_dt);" ></button>
	                               	</td>
                           		</tr>
                             	<tr>
	                            	<th><bean:message key="Week"/></th>
	                               	<td colspan=3>
	                            		<input type="hidden" name="ord_wk_h" id="ord_wk_h" value='<bean:write name="poVO" property="ord_wk"/>'/>
	                                	<input  name="ord_yr" id="ord_yr" value='<bean:write name="poVO" property="ord_yr"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" disabled="disabled" />
	                                	<select name="ord_wk" id="ord_wk" class="search_form" style="width:50px;">
	                            			<option value =""></option>
	                            			<option value ="1">1</option>
	                            			<option value ="2">2</option>
	                            			<option value ="3">3</option>
	                            			<option value ="4">4</option>
	                            			<option value ="5">5</option>
	                            			<option value ="6">6</option>
	                            			<option value ="7">7</option>
	                            			<option value ="8">8</option>
	                            			<option value ="9">9</option>
	                            			<option value ="10">10</option>
	                            			<option value ="11">11</option>
	                            			<option value ="12">12</option>
	                            			<option value ="13">13</option>
	                            			<option value ="14">14</option>
	                            			<option value ="15">15</option>
	                            			<option value ="16">16</option>
	                            			<option value ="17">17</option>
	                            			<option value ="18">18</option>
	                            			<option value ="19">19</option>
	                            			<option value ="20">20</option>
	                            			<option value ="21">21</option>
	                            			<option value ="22">22</option>
	                            			<option value ="23">23</option>
	                            			<option value ="24">24</option>
	                            			<option value ="25">25</option>
	                            			<option value ="26">26</option>
	                            			<option value ="27">27</option>
	                            			<option value ="28">28</option>
	                            			<option value ="29">29</option>
	                            			<option value ="30">30</option>
	                            			<option value ="31">31</option>
	                            			<option value ="32">32</option>
	                            			<option value ="33">33</option>
	                            			<option value ="34">34</option>
	                            			<option value ="35">35</option>
	                            			<option value ="36">36</option>
	                            			<option value ="37">37</option>
	                            			<option value ="38">38</option>
	                            			<option value ="39">39</option>
	                            			<option value ="40">40</option>
	                            			<option value ="41">41</option>
	                            			<option value ="42">42</option>
	                            			<option value ="43">43</option>
	                            			<option value ="44">44</option>
	                            			<option value ="45">45</option>
	                            			<option value ="46">46</option>
	                            			<option value ="47">47</option>
	                            			<option value ="48">48</option>
	                            			<option value ="49">49</option>
	                            			<option value ="50">50</option>
	                            			<option value ="51">51</option>
	                            			<option value ="52">52</option>
	                            			<option value ="53">53</option>
	                            		</select>
	                                    <button type="button" class="calendar"  name="ord_dt_cal1" id="ord_dt_cal1"  onclick="doDisplay('DATE3',frm1.ord_yr);" ></button>
	                               	</td>
                           		</tr>
                           	
                            
	                            <tr>
		                            <th><bean:message key="Department"/></th>
									<td colspan=3>		
										<input  type="text"  id="dept_cd" name="dept_cd" maxlength="10" value='<bean:write name="poVO" property="dept_cd"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"/> 
									</td> 
								</tr>
                             	
				    		</tbody>
				    	</table>
					</div>
				</div>
				<div style="display:none">
					<table>
						 <tr>
						 		<th><bean:message key="Buyer"/></th>
                                    <td colspan="3">
                                    	<input required type="text" name="buyr_trdp_cd" value='<bean:write name="poVO" property="buyr_trdp_cd"/>'  class="search_form" maxlength="20" onKeyDown="codeNameAction('BUYER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('BUYER',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:95px;">
                                        <button type="button" name="buyr" id="buyr" class="input_seach_btn" tabindex="-1" onClick="doWork('BUYER_POPLIST')"></button>
                                        <input required type="text"   name="buyr_trdp_nm" value='<bean:write name="poVO" property="buyr_trdp_nm"/>'  id="buyr_trdp_nm"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 140px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){doWork('BUYER_POPLIST');}">
                                 	</td>
                               	<th><a href="javascript:clearPoPrnr('F');"><bean:message key="Factory"/></a></th>
                                    <td colspan="3">
                                    	<input type="text" name="fctry_trdp_cd" value='<bean:write name="poVO" property="fctry_trdp_cd"/>'  class="search_form" maxlength="20" onKeyDown="codeNameAction('FACTORY',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('FACTORY',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:95px;">
                                        <button type="button" name="buyr" id="buyr" class="input_seach_btn" tabindex="-1" onClick="doWork('FACTORY_POPLIST')"></button>
                                        <input type="text"   name="fctry_trdp_nm" value='<bean:write name="poVO" property="fctry_trdp_nm"/>'  id="fctry_trdp_nm"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 140px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){doWork('FACTORY_POPLIST');}">
                                 	</td>
                               	</tr>
                                <tr>
                                	<th><bean:message key="Address"/></th>
                                    <td colspan="3">
                                    	<textarea name="fctry_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;"
                                    	 onblur="strToUpper(this);chkCmpAddr(this, 'Factory Address')" WRAP="off"><bean:write name="poVO" property="fctry_trdp_addr" filter="false"/></textarea>
                                    </td>
                               	</tr>
                               	<tr>
                             		<th><bean:message key="PIC"/></th>
                             		<td>
                             			<input type="text" name="fctry_trdp_pic" value='<bean:write name="poVO" property="fctry_trdp_pic"/>'  class="search_form" maxlength="50" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             		<th><bean:message key="EMail"/></th>
                             		<td>
                             			<input type="text" name="fctry_trdp_eml" value='<bean:write name="poVO" property="fctry_trdp_eml"/>'  class="search_form" maxlength="100" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             	</tr>
                             	<tr>
                             		<th><bean:message key="Tel"/></th>
                             		<td>
                             			<input type="text" name="fctry_trdp_phn" value='<bean:write name="poVO" property="fctry_trdp_phn"/>'  class="search_form" maxlength="30"   dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             		<th><bean:message key="Fax"/></th>
                             		<td>
                             			<input type="text" name="fctry_trdp_fax" value='<bean:write name="poVO" property="fctry_trdp_fax"/>'  class="search_form" maxlength="30"   dataformat="excepthan" style="ime-mode:disabled;resize:none;width:140px;">
                             		</td>
                             	</tr>
                     	</table>
				</div>
				<!-- layout_vertical_2 a(E) -->
				<!-- layout_vertical_2 b(S) -->
				<div class="layout_vertical_3 pad_left_8" style="width:435px;">
			    	<div class="opus_design_inquiry sm" style="height:580px">
				    	<table>
				    		<colgroup>
				    			<col width="90x" />
				    			<col width="160px" />
				    			<col width="85px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
				    		<tr>
                               	<th><a href="javascript:clearPoPrnr('S');"><bean:message key="Ship_to"/></a></th>
                                    <td colspan="3">
                                    	<input type="text" name="shpto_trdp_cd" value='<bean:write name="poVO" property="shpto_trdp_cd"/>'  class="search_form" maxlength="20" onKeyDown="codeNameAction('SHPTO',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('SHPTO',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:95px;">
                                        <button type="button" name="shpto" id="buyr" class="input_seach_btn" tabindex="-1" onClick="doWork('SHPTO_POPLIST')"></button>
                                        <input type="text"   name="shpto_trdp_nm" value='<bean:write name="poVO" property="shpto_trdp_nm"/>'  id="shpto_trdp_nm"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 140px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){doWork('SHPTO_POPLIST_NAME');}">
                                 	</td>
                               	</tr>
                                <tr>
                                	<th><bean:message key="Address"/></th>
                                    <td colspan="3">
                                    	<textarea name="shpto_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;" 
                                    	onblur="strToUpper(this);chkCmpAddr(this, 'Shpto Address')" WRAP="off"><bean:write name="poVO" property="shpto_trdp_addr" filter="false"/></textarea>
                                    </td>
                               	</tr>
                               	<tr>
                             		<th><bean:message key="PIC"/></th>
                             		<td >
                             			<input type="text" name="shpto_trdp_pic" value='<bean:write name="poVO" property="shpto_trdp_pic"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" maxlength="50" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;">
                             		</td>
                             		<th><bean:message key="EMail"/></th>
                             		<td>
                             			<input type="text" name="shpto_trdp_eml" value='<bean:write name="poVO" property="shpto_trdp_eml"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" maxlength="100" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;">
                             		</td>
                             	</tr>
                             	<tr>
                             		<th><bean:message key="Tel"/></th>
                             		<td>
                             			<input type="text" name="shpto_trdp_phn" value='<bean:write name="poVO" property="shpto_trdp_phn"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" maxlength="30" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;">
                             		</td>
                             		<th><bean:message key="Fax"/></th>
                             		<td>
                             			<input type="text" name="shpto_trdp_fax" value='<bean:write name="poVO" property="shpto_trdp_fax"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" maxlength="30"   dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;">
                             		</td>
                             	</tr>
                           	<tr>
                               	<th><bean:message key="Arrival_Date"/></th>
                               	<td colspan="3">
                                	<input name="arr_dt" id="arr_dt" value='<wrt:write name="poVO" property="arr_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Arrival Date');" size='11' maxlength="10" class="search_form">
                                	<button type="button" class="calendar" tabindex="-1" name="arr_dt_cal" id="eta_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.arr_dt);" ></button>
                               	</td>
                            </tr>
                            <tr>
                            	<th><bean:message key="Ship_Window"/></th>
                            	<td colspan="3">
	                            	<input required style="width:75px;" type="text" name="shpwin_fr_dt" value='<wrt:write name="poVO" property="shpwin_fr_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.shpwin_to_dt);firCalFlag=false;dateRangeValid(this, 'Ship Window');" size='10' maxlength="10" class="search_form"><span class="dash">~</span>
								 	<input required style="width:75px;" type="text" name="shpwin_to_dt" value='<wrt:write name="poVO" property="shpwin_to_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.shpwin_fr_dt, this);firCalFlag=false;dateRangeValid(this, 'Ship Window');" size='10' maxlength="10" class="search_form">
								 	<button type="button" class="calendar" tabindex="-1" name="shpwin_dt_cal" id="shpwin_dt_cal" onclick="doDisplay('DATE2', frm1);"></button>
								 	<input type="checkBox" name="shpwin_alert_yn" id="shpwin_alert_yn"  value="<bean:write name="poVO" property="shpwin_alert_yn"/>" onclick="flgChange(this);">
								 	<label for="shpwin_alert_yn"><bean:message key="Alert"/></label>
                            	</td>
                            </tr>
                            <tr>                                               
                                <th><bean:message key="Trans_Mode"/></th>
                                <td colspan="3">
                                	<select name="air_sea_clss_cd" class="search_form" style="width:100px;">
                                		<option value=""></option>
	                                	<option value="S"><bean:message key="Sea"/></option>
		                            	<option value="A"><bean:message key="Air"/></option>
	                            	</select>
	                            	<input type="hidden" name="h_air_sea_clss_cd" value="<bean:write name="poVO" property="air_sea_clss_cd"/>">
                              	</td>
                           	</tr>
                           	<tr>
                            	<th><bean:message key="Freight_Type"/></th>
                                <td>
                                	<bean:define id="frtList" name="valMap" property="frtCdList"/>
                                    <html:select name="poVO" property="frt_term_cd" styleClass="search_form" style="width:100px;">
                                    	<option value=""></option>
                                    	<html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                   	</html:select>
                                    <input type="hidden" name="h_frt_term_cd" value="<bean:write name="poVO" property="frt_term_cd"/>">
                              	</td>
                                <th><bean:message key="Incoterms"/></th>
								<td>
									<bean:define id="incotermsList" name="valMap" property="incotermsList"/>
                                    <html:select name="poVO" property="inco_cd" styleClass="search_form" style="width:100px;">
                                    	<option value=""></option>
                                    	<html:options collection="incotermsList" property="cd_val" labelProperty="cd_nm"/>
                                   	</html:select>
                                    <input type="hidden" name="h_inco_cd" value="<bean:write name="poVO" property="inco_cd"/>">
								</td>
                          	</tr>
                          	<tr>
		    					<th><bean:message key="Origin"/></th>
                               	<td colspan="3">
                                	<input  type="text"  id="org_loc_cd" name="org_loc_cd"  maxlength="5"  value='<bean:write name="poVO" property="org_loc_cd"/>'    class="search_form" onKeyDown="codeNameAction('ORGIN', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('ORGIN', this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"/>
			                        <button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('ORGIN_LOCATION_POPLIST')"></button>
			                        <input  type="text"  id="org_loc_nm" name="org_loc_nm" maxlength="50" value='<bean:write name="poVO" property="org_loc_nm"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){doWork('ORGIN_LOCATION_POPLIST_NAME');}"/>
                               	</td>
                           	</tr>
                           	<tr>
                           		<th><bean:message key="Destination"/></th>
                               	<td colspan="3">
                                	<input  type="text"    id="dest_loc_cd"  name="dest_loc_cd"  maxlength="5" value='<bean:write name="poVO" property="dest_loc_cd"/>'   class="search_form" onKeyDown="codeNameAction('DEST', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('DEST', this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"/>
			                   		<button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('DEST_LOCATION_POPLIST')"></button>
			                   		<input  type="text"  id="dest_loc_nm" name="dest_loc_nm" maxlength="50" value='<bean:write name="poVO" property="dest_loc_nm"/>' onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){doWork('DEST_LOCATION_POPLIST_NAME');}"/>
                               	</td>
                           	</tr>
                            
				    		</tbody>
				    	</table>
				    </div>
				 </div>  
				<!-- layout_vertical_2 b(E) -->
				<!-- layout_vertical_2 c(S) -->
				<div class="layout_vertical_3 mar_left_8 sm" style="height:580px ; width:calc(100% - 860px);">				
			    	<div class="opus_design_inquiry">
				    	<table>
				    		<colgroup>
				    			<col width="90px" />
				    			<col width="*" />
				    		</colgroup>
				    		<tbody>
				    		<tr>
                               	<th><bean:message key="Cargo_Ready_Date"/></th>
                               	<td>
                                	<input name="cgo_rdy_dt" id="cgo_rdy_dt" value='<wrt:write name="poVO" property="cgo_rdy_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Cargo Ready Date');" size='11' maxlength="10" class="search_form">
                                	<button type="button" class="calendar" tabindex="-1" name="cgo_rdy_dt_cal" id="cgo_rdy_dt_cal"  onclick="doDisplay('DATE1',frm1.cgo_rdy_dt);" ></button>
                               	</td>
                            </tr> 
                            <tr>
								<th><bean:message key="Container_Qty"/></th>
								<td>									
									<bean:define id="cntr_tpsz_List" name="valMap" property="cntr_tpsz_List"/>
                                    <html:select name="poVO" property="cntr_tpsz_cd" styleClass="search_form" style="width:80px;">
                                    	<option value=""></option>
                                    	<html:options collection="cntr_tpsz_List" property="cntr_tpsz_cd" labelProperty="cntr_tpsz_cd"/>
                                   	</html:select>
                        
                                    <input type="hidden" name="h_cntr_tpsz_cd" value="<bean:write name="poVO" property="cntr_tpsz_cd"/>">
									<input type="text" name="cntr_qty" value="<bean:write name="poVO" property="cntr_qty"/>" onkeypress="keyPress_maxLength(this);onlyNumberCheck();" onkeyup="keyUp_maxLength(this);" onchange="onlyNumberCheckModified(this);" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:right"> 
								</td>
							</tr>
				    		<tr>
                            	<th><bean:message key="Customer_Instruction"/></th>
                                <td colspan="3">
                               		<textarea name="cust_instr_txt" class="search_form" dataformat="excepthan" maxlength="1000" style="width:240px;height:80px;" 
                               		onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" WRAP="off"><bean:write name="poVO" property="cust_instr_txt" filter="false"/></textarea>
                           		</td>
                          	</tr>
                          	<tr>
                            	<th><bean:message key="Remark"/></th>
                                <td colspan="3">
                               		<textarea name="po_rmk" class="search_form" dataformat="excepthan" maxlength="2000" style="width:240px;height:140px;" 
                               		onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);"><bean:write name="poVO" property="po_rmk" filter="false"/></textarea>
                           		</td>
                          	</tr>
                            
							<tr>
								<td>&nbsp;
								</td>
								<td colspan="3">
									<div id="po_notification" style="display:none;">
										<input type="checkBox" name="noti_send_yn" id="noti_send_yn"  value="<bean:write name="poVO" property="noti_send_yn"/>" disabled>
									 	<label for="noti_send_yn"><bean:message key="Notification_Sent"/></label>
								 	</div>
								</td>
									
							</tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr>
                            	<th><bean:message key="Created_By"/></th>
                                <td colspan="3">
                                	<input type="text"   name="rgst_usrid" value="<bean:write name="poVO" property="rgst_usrid"/>" class="search_form-disable" tabindex="-1" readOnly style="width:230px;"> 
                            	</td>
                            </tr>  
                            <tr>
                            	<th><bean:message key="Created_At"/></th>
                            	<td colspan="3">
                                	
                                	<input name="rgst_tms" id="rgst_tms" value='<wrt:write name="poVO" property="rgst_tms" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" readOnly dataformat="excepthan" style="ime-mode:disabled;width:230px;"  maxlength="10" class="search_form">
                                	
                            	</td>
                            </tr> 
                            <tr>
                            	<th><bean:message key="Modified_By"/></th>
                                <td colspan="3">
                                	<input type="text"   name="modi_usrid" value="<bean:write name="poVO" property="modi_usrid"/>" class="search_form-disable" tabindex="-1" readOnly style="width:230px;"> 
                            	</td>
                            </tr>  
                            <tr>
                            	<th><bean:message key="Modified_At"/></th>
                            	<td colspan="3">
                            		<input name="modi_tms" id="modi_tms" value='<wrt:write name="poVO" property="modi_tms" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" readOnly dataformat="excepthan" style="ime-mode:disabled;width:230px;"  maxlength="10" class="search_form">
                                	 
                            	</td>
                            </tr> 
				    		</tbody>
				    	</table>
				    </div>
				</div>
			</div>
		</div>
		<!-- tab_player_1 (E) -->
		
		<!-- tab_player_2 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--Item-->
			<div class="opus_design_grid">
				<h3 class="title_design pad_btm_4"><bean:message key="Item"/></h3>
				<div class="opus_design_btn">
					<table>
						<tr>
							<td><button type="button" class="btn_accent" name="itemAdd" id="itemAdd" onClick="doWork('ITEM_ROWADD');"><bean:message key="Add"/></button></td>
						</tr>
					</table>	
				</div>
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
		<!-- tab_player_2 (E) -->
		
		<!-- tab_player_3 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--User Define Field-->
	    	<div class="opus_design_grid">
				<h3 class="title_design pad_btm_4"><bean:message key="User_Define_Field"/></h3>
				<div class="opus_design_btn">
					<table>
						<tr>
							<td><button type="button" class="btn_accent" name="udfAdd" id="udfAdd" onClick="doWork('UDF_ROWADD');"><bean:message key="Add"/></button></td>
						</tr>
					</table>	
				</div>
				<script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
		</div>
		<!-- tab_player_3 (E) -->
		
		<!-- tab_player_4 (S) -->
	    <div id="tabLayer" name="tabLayer" style="display:none"><!--WorkOrder-->
			<div class="opus_design_grid">
				<h3 class="title_design"><bean:message key="Document_List"/></h3>
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" id="sDoc" name="sDoc" btnAuth="S_DOC" onClick="doWork('S_DOC');" style="display:none;"><bean:message key="Print"/></button>
					<button type="button" class="btn_normal" id="fileUp" name="fileUp" onClick="doWork('DOCFILE')" style="display:none;margin-left:5px;cursor:hand"><bean:message key="Upload"/></button>
				</div>
				<script type="text/javascript">comSheetObject('sheet4');</script>
			</div>
		</div>
		<!-- tab_player_4 (E) -->
	</div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="poFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="po_sys_no" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>
		
<script type="text/javascript">
	doBtnAuthority(attr_extension);
</script>	
		
</body>
</html>

