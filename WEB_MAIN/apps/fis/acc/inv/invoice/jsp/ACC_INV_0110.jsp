<%--
=========================================================
*@FileName   : ACC_INV_0110.jsp
*@FileTitle  : Invoice History List
*@Description: Invoice History
*@author     : 
*@version    :
*@since      :

*@Change history:
=========================================================
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0110.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="invInfo"  	 name="EventResponse" property="objVal"/>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);	
		
		function setupPage(){
			loadPage();
	    }
	</script>
<style> body { border-top-width: 6px!important; } </style>	
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./ACC_INV_0110.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="inv_seq" 	value="<%=request.getParameter("inv_seq")%>"/>
	<input type="hidden" name="modi_seq" 	value="<bean:write name="invInfo" property="delt_flg"/>"/>
	<input type="hidden" name="delt_flg" 	value=""/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_INV_0110.clt"/>
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="Invoice_History"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
		   		<table border="0" width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<th width="100px"><bean:message key="Invoice_No"/></th>
						<td width="300px"><!-- 
						 --><input type="hidden" name="s_inv_seq"><!-- 
						 --><input type="text" name="inv_no" value="<bean:write name="invInfo" property="inv_no"/>" class="search_form" readonly="readonly"><!-- 
						 --></td>
						<th width="100px"><bean:message key="Post_Date"/></th>
						<td width="150px"><input type="text" name="inv_post_dt" value="<bean:write name="invInfo" property="inv_post_dt"/>"  class="search_form" readonly="readonly"></td>						
						<th width="100px"><bean:message key="Currency"/></th>
						<td><input type="text" name="curr" value="<bean:write name="invInfo" property="inv_aply_curr_cd"/>" class="search_form" readonly="readonly"></td>						
					</tr>
					<tr>
						<th><bean:message key="Invoice_Type"/></th>
						<td><input type="text" name="inv_tp" value="<bean:write name="invInfo" property="inv_tp"/>" class="search_form" readonly="readonly"></td>						
						<th><bean:message key="Invoice_Date"/></th>
						<td><input type="text" name="inv_dt" value="<bean:write name="invInfo" property="inv_dt"/>" class="search_form" readonly="readonly"></td>						
						<th><bean:message key="Amount_Due"/></th>
						<td><input type="text" name="amt_due" value="<bean:write name="invInfo" property="inv_sum_amt"/>" class="search_form" readonly="readonly"></td>						
					</tr>
					<tr>
						<th><bean:message key="Bill_To_Pay_To"/></th>
						<td><input type="text" style="width:300px"  name="bill" value="<bean:write name="invInfo" property="trdp_nm"/>" class="search_form" readonly="readonly"></td>						
						<th><bean:message key="Due_Date"/></th>
						<td><input type="text" name="inv_due_dt" value="<bean:write name="invInfo" property="inv_due_dt"/>" class="search_form" readonly="readonly"></td>						
						<th><bean:message key="Paid_Amount"/></th>
						<td><input type="text" name="pd_amt" value="<bean:write name="invInfo" property="pay_amt"/>" class="search_form" readonly="readonly"></td>
					</tr>
				</table>
		   	</div>
		</div>
	    <!-- wrap_result (S) -->
	    <div class="wrap_result">
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet1');</script>
				<!--- Paging(공통) --->
	                <table width="100%" border="0" cellspacing="0" cellpadding="0">
	                    <tr>
	                        <td width="60px"></td>
	                        <td align="center"><!-- 
	                         --><table  border="0" width="100%"><!-- 
	                         -->    <tr><!-- 
	                         -->        <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td><!-- 
	                         -->        <td width="60px"></td><!-- 
	                         -->    </tr><!-- 
	                         --></table>
	                        </td>
	                    </tr>
	                </table>
	           		<!--- Paging(공통) --->
			</div>
			<h3 style="margin-bottom:0" class="title_design"><bean:message key="Detail"/></h3>
			<div class="opus_design_grid" id="dtl_sheet1">
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
			<div class="opus_design_grid" id="dtl_sheet2" style="display: none;">
				<script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
			<!--- Paging(공통) --->
	         <table width="100%" border="0" cellspacing="0" cellpadding="0">
	             <tr>
	                 <td width="60px"></td>
	                 <td align="center"><!-- 
	                  --><table  border="0" width="100%"><!-- 
	                  -->    <tr><!-- 
	                  -->        <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td><!-- 
	                  -->        <td width="60px"></td><!-- 
	                  -->    </tr><!-- 
	                  --></table><!-- 
	                  --></td>
	             </tr>
	         </table>
		</div>
	</div>
</div>
</form>




