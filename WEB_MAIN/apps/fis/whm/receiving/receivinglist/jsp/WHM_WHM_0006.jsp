<%
/*=========================================================
*Copyright(c) 2014 DOU Networks. All Rights Reserved.
*@FileName   : WWHM_WHM_0006.jsp
*@FileTitle  : Receving List
*@author     : Thoa.Dien
*@version    : 1.0
*@since      : 2014/12/26
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.component.util.JSPUtil"%></html>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<title><bean:message key="system.title"/></title>
	<script language="javascript" src="./apps/fis/whm/receiving/receivinglist/script/WHM_WHM_0006.js?ver=<%=CLT_JS_VER%>"></script>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= userInfo.getEml() %>";
	</script>
   <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    
<script>
function setupPage(){
	loadPage();
	//setSelect();
// 	doWork('SEARCHLIST');
}
</script>
  <body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="post" action="./WHM_WHM_0006.clt" style="margin:0px">
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="pageurl" id="pageurl" value="WHM_WHM_0006.clt"/>
	<!-- #738 [CONTINENT] WMS 3.0 RECEIPT, PICKING SLIP 리포트 개선 및 COLUMN 조정 기능 반영 -->
	<!-- GridSetting Value -->
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	
	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	
	<input type="hidden" name="file_name" id="file_name">
	<input type="hidden" name="title" id="title">
	<input type="hidden" name="rd_param" id="rd_param">
	
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
			 <button type="button"  class="btn_accent" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCH')"><bean:message key="Search"/></button> 
			 <button type="button"  class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')"><bean:message key="New"/></button> 
			 <button type="button" btnType="CLEAR" class="btn_normal" onclick="doWork('btn_Clear');"><bean:message key="Clear"/></button>
	         <button type="button" name="btn_receipt" style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" id="btn_receipt"  class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Receipt"/></button> 
			 <button type="button" btnType="EXCEL" style="display: none;" btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" onclick="doWork('EXCEL');"><bean:message key="Excel"/></button>
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
		   <col width="190">
		   <col width="70">
		   <col width="220">
		   <col width="70">
		   <col width="200">
		   <col width="70">
		   <col width="100">
		   <col width="40">
		   <col width="*">
		</colgroup>
		<tbody>
			
	        <tr>
				<th><bean:message key="Warehouse"/></th>
				<td nowrap><bean:define id="warehouseCdList" name="valMap" property="whCdList"/>
					<select name="wh_cd" id="wh_cd" style="width:170px;">
					<option value=''></option>
					 <bean:size id="len" name="warehouseCdList" />
					 
<%-- 						<logic:greaterThan name="len" value="1"> --%>
<!-- 					        		<option value='A'>ALL</option> -->
<%-- 					    </logic:greaterThan> --%>
			        	<logic:iterate id="InventoryVO" name="warehouseCdList">
			        		<option value='<bean:write name="InventoryVO" property="wh_cd"/>'><bean:write name="InventoryVO" property="wh_nm"/></option>
			        	</logic:iterate>
		        	</select>
					</td>
				<td></td>
	        	<td><select name="tp_date" id="tp_date" style="width:120px;">
	        			<option value="ERD">E.Recieving Date</option>
	        			<option value="RD">Received Date</option>
	        		</select><!-- 
	        	 --><input style="width: 76px;" type="text" id="etd_strdt" name="etd_strdt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.etd_enddt);firCalFlag=false;" size="11" maxlength="10"><!-- 
					 --><span class="dash">~</span><!--
					 --><input style="width: 76px;" type="text" id="etd_enddt" name="etd_enddt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.etd_strdt, this);firCalFlag=false;" size="11" maxlength="10"><!--
					 --><button type="button" id="btn_cal" name="btn_cal" class="calendar ir" onclick="doDisplay('DATE11', form);"  tabindex="-1"></button> 
					 
                 </td>
                <td></td>
	        	<td><select name="tp_nm_ld" id="tp_nm_ld" style="width:150px;" onchange="document.frm1.txt_nm.value='';">
	        			<option value="FILLING_NO">Receiving No.</option>
	        			<option value="CUST_REF_NO">Customer Ref. No.</option>
						<option value="PO_NO">P/O No.</option>
						<option value="ITM_CD">Item Code</optiom>
						<option value="PALLET">Pallet</optiom>
						<option value="CNTR_NO">Container No.</optiom>
						<option value="MBL_NO">MB/L No.</optiom>
						<option value="HBL_NO">HB/L No.</optiom>
	        		</select><!-- onkeypress="if(document.frm1.tp_nm_ld.value=='P'){onlyNumberCheck();}"
	        	 --><input type="text" name="txt_nm" id="txt_nm" value="" class="search" maxlength="20"   onKeyDown="codeNameAction('TP_COM_NO',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('TP_COM_NO',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:166px" >
	        	</td>
	        	<th><bean:message key="Received"/></th>
	        	<td><select name="rcv_tp" id="rcv_tp" style="width:100px;">
	        			<option value="All">All</option>
	        			<option value="Y">Y</option>
	        			<option value="N">N</option>
	        	</select></td>
	        	<th><bean:message key="Office"/></th>
	        	<td>
	        		<bean:define id="oficeList" name="valMap" property="ofcList"/>
                   	<input  type="hidden" name="s_ofc_cd" id="s_ofc_cd" value="<%= userInfo.getOfc_cd()%>"/> 
                   	<select name="ofc_cd" id="ofc_cd" style="width:138px">
				         <bean:size id="len" name="oficeList" />
				         <logic:greaterThan name="len" value="1">
				        		 <option value='' selected="selected">ALL</option>
				         </logic:greaterThan>
		                <logic:iterate id="ofcVO" name="oficeList">
		                   		  <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                </logic:iterate>
                   	</select>
	        	</td>
	   		</tr>
	   		<tr>
           		<th><bean:message key="Contract_No"/></th>
				<td>
					<input name="ctrt_no" id="ctrt_no" type="text" class="search" style="width:60px;ime-mode:disabled;text-transform:uppercase;"  dataformat="excepthan" maxlength="10" onChange="getCtrtInfo(this)"  onblur="strToUpper(this);getCtrtInfo(this)"/><!-- 
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onclick="doWork('btn_ctrt_no')" class="input_seach_btn" tabindex="-1"></button><!-- 						
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:77px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('btn_ctrt_no_name');}" readonly />
				</td>
	   			<th><bean:message key="Customer"/></th>
           		<td ><input type="text" name="cust_cd" id="cust_cd" value="" class="search" maxlength="20" onKeyDown="codeNameAction('CUSTUMER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTUMER',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px" ><!-- 
           		 --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('btn_Search_Cust')"></button><!-- 
           		 --><input type="text" name="cust_nm" id="cust_nm" value="" style="width:197px;" class="search" readOnly>
           		</td>
	   			<th><bean:message key="Supplier"/></th>
	   			<td><input type="text" name="splr_rcvr_cd" id="splr_rcvr_cd" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" maxlength="20" onKeyDown="codeNameAction('SUPPLIER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('SUPPLIER',this, 'onBlur')" ><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('SU_POPLIST')"></button><!-- 
				    --><input type="text" name="splr_rcvr_nm" id="splr_rcvr_nm" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:197px;text-align:left" readOnly></td>
                    </td>
				<th><bean:message key="Trucker"/></th>
                <td colspan="3"><input type="text" name="trkr_cd" id="trkr_cd" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" maxlength="20" onKeyDown="codeNameAction('TRUCKER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('TRUCKER',this, 'onBlur')"><!-- 
			    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('TR_POPLIST')"></button><!-- 
			    --><input type="text" name="trkr_nm" id="trkr_nm" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:151px;text-align:left" readOnly></td>
             </tr>
        </tbody>
    </table>
</div>
<!-- opus_design_inquiry(E) -->
</div>

<!-- opus_design_result(S) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
    	<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
     		<button type="button"  class="btn_normal" name="btn_del" id="btn_del" onclick="doWork('DELETE')"><bean:message key="Delete"/></button>
     	</div>
     	<!-- opus_design_btn(E) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
   	</div>
   	<!-- opus_design_grid(E) -->	

</div>
<!-- opus_design_result(E) -->
</div>
</form>
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
