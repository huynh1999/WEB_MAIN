<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHR_POP_0010.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/15
=========================================================*/
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/oth/whr/list/script/WHR_POP_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- #5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청 -->
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="whStatusList" name="valMap" property="whStatus"/>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		
		var WHCD1 = '';
	    var WHCD2 = '';
	   
	    <% boolean isBegin = false; %>
	    <!--whStatus 코드조회-->
	    <logic:iterate id="codeVO" name="whStatusList">
	        <% if(isBegin){ %>
	            WHCD1+= '|';
	            WHCD2+= '|';
	        <% }else{
	              isBegin = true;
	           } %>
	        WHCD1+= '<bean:write name="codeVO" property="cd_val"/>';
	        WHCD2+= '<bean:write name="codeVO" property="cd_nm"/>';
	    </logic:iterate>
	    
		function  setupPage()
		{
			loadPage();
		}
	</script>
	<%
		String ofc_cd	= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
	%>
	
	<form name="frm1" method="POST" action="./WHR_POP_0010GS.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/> 
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="s_wh_recp_no" id="s_wh_recp_no"/>
	
	<input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" id="pageurl" value="WHR_POP_0010.clt"/>
	
	<!-- ------------------------------------------------------ -->
	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" id="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm"  id="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- ------------------------------------------------------ -->
	
	<!-- ------------------------------------------------------ -->
	<!-- 프린트용    -->
	<input type="hidden" name="file_name" id="file_name">
	<input type="hidden" name="title" id="title">
	<input type="hidden" name="rd_param" id="rd_param">
	<!-- ------------------------------------------------------ -->
	<!-- OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533) -->
	<input type="hidden" name="wh_recp_no_exists" id="wh_recp_no_exists" value='<bean:write name="valMap" property="wh_recp_no_exists"/>'>
	<div class="layer_popup_title">
		<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title"><bean:message key="Warehouse_Receipt_List"/></span></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" btnAuth="<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %>"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_accent" id="btn_apply"  onclick="doWork('APPLY')"><bean:message key="Apply"/></button>
			 <button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>		
		<!-- opus_design_btn(E) -->
		</div>
	</div>
	<!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
	<div class= "wrap_search">
  		<div class= "opus_design_inquiry entry_pannel">
  			<table>
  				<colgroup>
  					<col width="90" />
  					<col width="" />
  					<col width="90" />
  					<col width="" />
  					<col width="60" />
  					<col width="*" />
  					<col width="50" />
  					<col width="*" />
  				</colgroup>
  				<tbody>
  					<tr>
                		<!-- 조회 조건 -->
			            <th><bean:message key="W/H_Receipt_No"/></th>
			        	<td>
			        		<input type="text" maxlength="20"  name="f_wh_recp_no" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:105px;"/>
				        </td>
				        <th><bean:message key="W/H_Location"/></th>
			            <td><!-- 
			            	 --><input name="f_wh_cd" maxlength="20" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('trdpCode_wh',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_wh',this, 'onBlur')"><!--
			            	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" name="cust" onClick="doDisplay('WH_POPLIST')"></button><!--
			            	--><input name="f_wh_nm" maxlength="50" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doDisplay('WH_TRDP_POPLIST', frm1.f_wh_nm.value);}">
			            </td>
		                <th><bean:message key="Received_Date"/></th>
			        	<td><!--
			        		--><input type="text" name="f_rept_fmdt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form" style="width:70px;"><!--
							-->~&nbsp;<!--
							--><input type="text" name="f_rept_todt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form" style="width:70px;"><!--
							--><button type="button" class="calendar ir" id="f_reptdt_cal" name="f_reptdt_cal" onclick="doDisplay('REPT_DATE', frm1);"></button>
				        </td>
				        <th><bean:message key="Vendor"/></th>
			            <td><!--
			            	--><input name="f_maker_cd" maxlength="10" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('trdpCode_maker',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_maker',this, 'onBlur')"><!--
			            	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" name="cust" onClick="doDisplay('MAKER_POPLIST')" ></button><!--
			            	--><input name="f_maker_nm" maxlength="50" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doDisplay('MAKER_TRDP_POPLIST', frm1.f_maker_nm.value);}">
			            </td>
			        </tr>
			        <tr>
			            <th><bean:message key="Shipper"/></th>
			            <td><!--
			            	--><input name="f_shpr_cd" maxlength="20" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')"><!--
			            	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" name="cust" onClick="doDisplay('SHIPPER_POPLIST')" ></button><!--
			            	--><input name="f_shpr_nm" maxlength="50" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100px;"  onKeyPress="if(event.keyCode==13){doDisplay('SHIP_TRDP_POPLIST', frm1.f_shpr_nm.value);}">
			            </td>
			            <th><bean:message key="Consignee"/></th>
			            <td><!--
			            	--><input name="f_cnee_cd" maxlength="20" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur')"><!--
			            	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" name="cust" onClick="doDisplay('CONSIGNEE_POPLIST')" ></button><!--
			            	--><input name="f_cnee_nm" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){doDisplay('CNEE_TRDP_POPLIST', frm1.f_cnee_nm.value);}">
			            </td>
			            <th><bean:message key="PO_No"/><!--M1234--></th>
			        	<td>
			        		<input type="text" maxlength="20"  name="f_po_no" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:105px;"/>
				        </td>
				        
				        <th><label for="chkShpd"><bean:message key="Shipped"/></label></th>
				        <td><input type="checkbox" name="chkShpd" id="chkShpd"/><input type="hidden" name = "f_shpd" id = "f_shpd" value = "0" /></td>
					</tr>
  				</tbody>
  			</table>
  		</div>
	</div>
	<div class="wrap_result">
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid"  id="mainTable">
	            <script type="text/javascript">comSheetObject('sheet1');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
	</div>
	</div>
	</form>
<script type="text/javascript">
var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
doBtnAuthority(attr_extension);
</script>


