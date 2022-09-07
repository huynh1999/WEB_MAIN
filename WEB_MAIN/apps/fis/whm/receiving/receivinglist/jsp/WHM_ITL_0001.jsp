<%--
=========================================================
*@FileName   : WHM_ITL_0001.jsp
*@FileTitle  : 
*@Description: Item Popup
*@author     : Vinh.Vo
*@version    : 1.0 - 2015/1/9
*@since      : 2015/1/9

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>


    

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/whm/receiving/receivinglist/script/WHM_ITL_0001.js?ver=<%=CLT_JS_VER%>"></script>
	
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
	
	<script language="javascript">

		
		
	</script>

	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./WHM_ITL_0001.clt" enctype="multipart/form-data">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	
	
	 <div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Customer_Item"/></span></h2>
			<!-- btn_div -->
			   <div class="opus_design_btn"><!--
			   --><button type="button" class="btn_accent" onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!--
			   --><button type="button" class="btn_accent" onclick="doWork('NEW')"><bean:message key="New"/></button><!--
			   --><button type="button" class="btn_normal" onClick="doWork('CLOSE')"><bean:message key="Close"/></button>
				</div>
			   <!-- btn_div -->			
		</div>
	</div>
	
	<div class="layer_popup_contents">
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>											
					<tr>
						<th width="60"><bean:message key="Customer"/></th>
						<td>
							<input type="text" name="cust_cd" id="cust_cd" value="" class="search" 
	           				required onKeyDown="codeNameAction('CUSTUMER',this, 'onKeyDown');" 
	           				onBlur="strToUpper(this);codeNameAction('CUSTUMER',this, 'onBlur');" 
	           				dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" ><!-- 
	           				 --><button type="button" class="input_seach_btn" tabindex="-1" name="billto" id="billto" onclick="doWork('CUST_ITM_POP')"></button><!-- 
           		 			 --><input type="text" name="cust_nm" id="cust_nm" value="" style="width:200px;" class="search" >
						</td>										
					</tr>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>		
	</div>
	
	</form>
	
