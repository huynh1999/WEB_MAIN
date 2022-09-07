<%--
=========================================================
*@FileName   : OTH_WHR_0020.jsp
*@FileTitle  : Other Sales List
*@Description: Other Sales List
*@author     : Jung,Byung-Chul - Cyberlogitec
*@version    : 1.0 - 10/20/2011
*@since      : 10/20/2011

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/18
*@since      : 2014/06/18
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/oth/whr/list/script/OTH_WHR_0020.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="oficeList" name="valMap" property="ofcList"/>
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
    
    </script>
	<%
		String ofc_cd	= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
	%>
<script>
function setupPage(){
	loadPage();
}
</script>
<form name="frm1" method="POST" action="./OTH_WHR_0020GS.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="s_wh_recp_no"/>
	
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="OTH_WHR_0020.clt"/>
	
	<!-- ------------------------------------------------------ -->
	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- ------------------------------------------------------ -->
	
	<!-- ------------------------------------------------------ -->
	<!-- 프린트용    -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<!-- ------------------------------------------------------ -->
	
	<input type="hidden" name="f_intg_bl_seq" 		value=""/>
	<input type="hidden" name="f_air_sea_clss_cd" 	value=""/>
	<input type="hidden" name="f_biz_clss_cd" 		value=""/>
	<input type="hidden" name="f_bnd_clss_cd" 		value=""/>
	
<!-- Button -->
<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
<%-- 	   <button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')" style="display:none;"><bean:message key="Search"/></button><!-- 
	--><button type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" 	class="btn_normal" onclick="doWork('NEW')" style="display:none;"><bean:message key="New"/></button><!-- 
	--><button id="btnDelete" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" 	class="btn_normal" onclick="doWork('DELETE')" style="display:none;"><bean:message key="Delete"/></button><!-- 
	--><button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" 	class="btn_normal" onclick="doWork('PRINT')" style="display:none;"><bean:message key="Print"/></button>
 --%>   </div>
   <!-- btn_div -->
   <div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
</div>
<!-- Search option -->
<div class="over_wrap" height="100%">
<div class="wrap_search">	
	<div class="opus_design_inquiry entry_pannel">
		<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
		<table>
			<colgroup>
				<col width="95">
				<col width="210">
				<col width="90">
				<col width="240">
				<col width="90">
				<col width="240">
				<col width="60">
				<col width="100">
				<col width="80">
				<col width="*">
			</colgroup>
			<tbody>
           	<tr>
		        <th><bean:message key="Received_Date"/></th>
	        	<td><!--
	        	--><input required type="text" name="f_rept_fmdt" id="f_rept_fmdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_rept_todt);firCalFlag=false;" size='11' maxlength="10" style="width:75px;"><!--
	        	-->~ <!--
	        	--><input required type="text" name="f_rept_todt" id="f_rept_todt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_rept_fmdt, this);firCalFlag=false;" size='11' maxlength="10" style="width:75px;"><!--
	        	--><button type="button" id="f_reptdt_cal" onclick="doDisplay('REPT_DATE', frm1);" class="calendar" tabindex="-1"></button></td>
	        	
		        <th><bean:message key="W/H_Location"/></th>
	            <td><!--
	        	--><input name="f_wh_cd" maxlength="20" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('trdpCode_warehouse',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_warehouse',this, 'onBlur')"><!--
	        	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doDisplay('WH_POPLIST')"></button><!--
	        	--><input name="f_wh_nm" maxlength="50" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){doDisplay('WH_POPLIST_NAME', frm1.f_wh_nm.value);}"></td>
	            <th><bean:message key="Shipper"/></th>
	            <td><!--
	        	--><input name="f_shpr_cd" maxlength="20" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')"><!--
	        	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doDisplay('SHIPPER_POPLIST')"></button><!--
	        	--><input name="f_shpr_nm" maxlength="50" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px;"  onKeyPress="if(event.keyCode==13){doDisplay('SHIPPER_POPLIST_NAME', frm1.f_shpr_nm.value);}"></td>
		        <th><bean:message key="Branch"/></th>
				<td><!--
	        	--><div id="div_subcode"><!--
	        	--><select name="f_rgst_ofc_cd" style="width:100px;"/><!--
	        	--><bean:size id="len" name="oficeList" /><!--
	        	--><logic:greaterThan name="len" value="1"><!--
	        		--><option value=''>ALL</option><!--
	        	--></logic:greaterThan><!--
	        	--><logic:iterate id="ofcVO" name="oficeList"><!--
		        	--><logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" ><!--
		        	--><option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option><!--
		        	--></logic:equal><!--
		        	--><logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" ><!--
		        	--><option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option><!--
		        	--></logic:notEqual><!--
	        	--></logic:iterate><!--
	        	--></select><!--
	        	--></div></td>
	        	 <th><bean:message key="Operator"/></th>
	            <td><!--
	        	--><input name="f_op_useid" maxlength="20" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('usergs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('usergs',this, 'onBlur')"><!--
	        	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doDisplay('USER_POPLIST')"></button><!--
	        	--><input name="f_op_usenm" maxlength="50" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px;"  onKeyPress="if(event.keyCode==13){doDisplay('USER_POPLIST_NAME', frm1.f_op_usenm.value);}"></td>
	        </tr>
	        <tr>
	        	<th ><bean:message key="Receipt_No"/></th>
	        	<td><input type="text" maxlength="20"  name="f_wh_recp_no"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:165px;" onkeydown="entSearch();"/></td>
	            <th ><bean:message key="Maker"/></th>
	            <td><!--
	        	--><input name="f_maker_cd" maxlength="10" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('trdpCode_maker',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_maker',this, 'onBlur')"><!--
	        	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doDisplay('MAKER_POPLIST')"></button><!--
	        	--><input name="f_maker_nm" maxlength="50" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){doDisplay('MAKER_POPLIST_NAME', frm1.f_maker_nm.value);}"></td>
	            <th ><bean:message key="Consignee"/></th>
	            <td><!--
	        	--><input name="f_cnee_cd" maxlength="20" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;" onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_consignee',this, 'onBlur')"><!--
	        	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doDisplay('CONSIGNEE_POPLIST')"></button><!--
	        	--><input name="f_cnee_nm" value='' type="text"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){doDisplay('CONSIGNEE_POPLIST_NAME', frm1.f_cnee_nm.value);}"></td>
	            <th ><bean:message key="Status"/></th>
				<td nowrap><!--
	        	--><select name="f_status" style="width:100px;"/><!--
	        	--><option value="">ALL</option><!--
	        	--><logic:iterate id="codeVO" name="whStatusList"><!--
	        	--><option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option><!--
	        	--></logic:iterate><!--
	        	--></select></td>
	        	<th ><bean:message key="Remark"/></th>
	        	<td><input type="text" maxlength="20"  name="f_rmk"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:233px;" onkeydown="entSearch();"/></td>
			</tr>
			</tbody>
		</table>
	</div>
</div>
<div class="wrap_result">
   	<div class="opus_design_grid">
   		<script language="javascript">comSheetObject('sheet1');</script>
   	</div>
   	<!-- OFVFOUR-7351 [UTS CARGO] ADDING COLUMN AND TOTAL TO WH RECEIPT ENTRY AND LIST SCREEN -->
   	<div class="opus_design_inquiry" style="width:100%">
	   		<table>
	   			<colgroup>
	   				<col width="24%"></col>
	   				<col width="30px"></col>
	   				<col width="140px"></col>
	   				<col width="140px"></col>
	   				<col width="140px"></col>
	   				<col width="140px"></col>
	   				<col width="250"></col>
	   				<col width="24%"></col>
	   			</colgroup>
				<tr>
					<th>Total</th>
					<th></th>
                    <td><input type="text" name="f_pck_qty_tot" value="" style="width:45px;text-align:right" class="search_form-disable" readOnly> PCS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td><input type="text" name="f_wgt_k_tot" value="" style="width:90px;text-align:right" class="search_form-disable" readOnly> KG&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td><input type="text" name="f_wgt_l_tot" value="" style="width:90px;text-align:right" class="search_form-disable" readOnly> LB&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td><input type="text" name="f_meas_tot" value="" style="width:90px;text-align:right" class="search_form-disable" readOnly> CBM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                    <td>&nbsp;&nbsp;&nbsp;Total Actual Weight(KG) <input type="text" name="f_act_wgt_tot" value="" style="width:95px;text-align:right" class="search_form-disable" readOnly></td>
					<td></td>
				</tr>
			</table>
	   </div>
</div>
</div>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
</body>
</html>
