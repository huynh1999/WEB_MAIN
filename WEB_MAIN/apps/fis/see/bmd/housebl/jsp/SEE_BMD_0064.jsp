<%--
=========================================================
*@FileName   : MDM_MCM_0030.jsp
*@FileTitle  : Sub Continent Code
*@Description: Sub Continent Code
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/09/2009
*@since      : 01/09/2009

*@Change history:
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0064.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
    
    <script type="text/javascript">
		
		function setupPage(){
	    	loadPage();
	    }
	</script>
	



<style> body { border-top-width: 6px!important; } </style>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<bean:parameter name="s_intg_bl_seq" id="s_intg_bl_seq"/>
	<input type="hidden" name="intg_bl_seq"  value="<bean:write name="s_intg_bl_seq"/>">                     
	
	<input type="hidden" name="cne_trdp_cd" value="<%=request.getParameter("cne_trdp_cd")%>"/> 
	<input type="hidden" name="ntfy_trdp_cd" value="<%=request.getParameter("ntfy_trdp_cd")%>"/> 
	<input type="hidden" name="cust_trdp_cd" value="<%=request.getParameter("cust_trdp_cd")%>"/> 

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<input type="hidden" name="rpt_cc_trdp_cd"/>
	<input type="hidden" name="rpt_pdf_file_nm"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<!-- ------------------------------------------------------------------------- -->
	<!-- 프린터용 -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="ofc_locl_nm" value="<%=userInfo.getOfc_locl_nm() %>">
	<input type="hidden" name="ofc_phn" value="<%=userInfo.getPhn() %>">
	<input type="hidden" name="ofc_fax" value="<%=userInfo.getFax() %>">
	<input type="hidden" name="user_name" value="<%=userInfo.getUser_name() %>">
	<input type="hidden" name="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="mailTitle" value=""/>
	
	<!--#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청 -->
	<input type="hidden" name="rpt_file_name_title"/>	
	<!-- ------------------------------------------------------------------------- -->
	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><bean:message key="USDA_Hold_Notice"/></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="window.close()"><bean:message key="Close"/></button>
	   </div>
	</div>
	
   <div class="wrap_search" >	
		<div class="opus_design_inquiry entry_pannel ">
			<h3  class="title_design"><bean:message key="Basic_Information"/></h3>
			<table>
					<colgroup>
						<col width="150">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="HBL_No"/><!-- M1234 --></th>
	                            <td><input name="hbl_no" type="text" value='<bean:write name="hmOutParam" property="hbl_no"/>' maxlength="50" style="width:100;" class="search_form-disable" readOnly></td>
						</tr>
						<tr>
	                            <th><bean:message key="By_Date"/><!-- M1234 --></th>
	                            <td>
	                            	<input name="by_user" type="text" value="<%=userInfo.getUser_name() %>" maxlength="50" style="width:100;" class="search_form-disable" readOnly><!-- 
		                    	 	--><input name="to_date" type="text" value='<bean:write name="hmOutParam" property="to_date"/>' maxlength="50" style="width:80px;" class="search_form-disable" readOnly>
	                            </td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Title"/><!-- M1234 --></th>
	                            <td>
									<input type="text" name="f_title" value="USDA HOLD NOTICE" class="search_form" style="width:325px;">
                                </td> 
                            </tr>
                            <tr>
                                <td colspan="2"><b>According to the steamship company, your shipment is on</b></td>
	                        </tr>
	                        <tr>
	                        	<th></th>
                                <td><input type="text" name="f_sub_title" value="USDA HOLD NOTICE" class="search_form" style="width:325px;"></td>
	                        </tr>
                        </tbody>
	                   	</table>
	                   	
	                   	 <table>
	                        <tr>
	                            <td width="300" nowrap class="table_search_head"><b><bean:message key="Commercial_Invoce_please_fax_to"/><!-- M1234 --></b></td>
	                        </tr>
	                   	</table>
	                    <table>
	                        <tr>
	                            <td width="150" nowrap class=""></td>
	                            <td>
									<input type="text" name="commercial" value='<bean:write name="hmOutParam" property="commercial"/>' class="search_form" style="width:325px;">
                                </td> 
	                        </tr>
	                   	</table>
	                    <table>
	                        <tr>
	                            <td width="300" nowrap class="table_search_head"><b><bean:message key="Fumigation_Certificate_please_fax_to"/><!-- M1234 --></b></td>
	                        </tr>
	                   	</table>
	                    <table>
	                        <tr>
	                            <td width="150" nowrap class=""></td>
	                            <td>
									<input type="text" name="fumigation" value='<bean:write name="hmOutParam" property="fumigation"/>' class="search_form" style="width:325px;">
                                </td> 
	                        </tr>
	                   	</table>
	                    <table>
	                        <tr>
	                            <td width="300" nowrap class="table_search_head"><b><bean:message key="The_guarantee_for_inspection_charges_to"/></b><!-- M1234 --></td>
	                        </tr>
	                   	</table>
	                    <table>
	                        <tr>
	                            <td width="150" nowrap class=""></td>
	                            <td>
									<input type="text" name="guarantee" value='<bean:write name="hmOutParam" property="guarantee"/>' class="search_form" style="width:325px;">
                                </td> 
	                        </tr>
	                   	</table>
	                   	<table border="0" cellpadding="0" cellspacing="0">
	                        <tr>
	                            <td width="300" nowrap class="table_search_head"><b><bean:message key="Container"/>/<bean:message key="Type"/>/<bean:message key="Serial"/></b></td>
	                        </tr>
	                   	</table>
	                    <table>
                                <tr>
                                    <td width="150" nowrap class=""></td>
                                    <td class="table_search_body">
                                        <textarea name="cntr_info" maxlength="500" class="search_form" style="width:325px;height:80px"><bean:write name="hmOutParam" property="cntr_info"/></textarea>
                                    </td>
                                </tr>
	                   	</table>
	                    <table>
	                        <tr>
	                            <td width="300" nowrap class="table_search_head"><b><bean:message key="Remark"/></b></td>
	                        </tr>
	                   	</table>
	                    <table>
                                <tr>
                                    <td width="150" nowrap class=""></td>
                                    <td class="table_search_body">
                                        <textarea name="remark" maxlength="500" class="search_form" style="width:325px;height:80px"><bean:write name="hmOutParam" property="remark"/></textarea>
                                    </td>
                                </tr>
	                   	</table>
					
   
	</form>

<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>



