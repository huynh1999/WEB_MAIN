<%--
=========================================================
*@FileName   : AIE_STK_0010.jsp
*@FileTitle  : MBL STOCK POPUP 
*@Description: MBL STOCK POPUP 
*@author     : Chungrue - Customer Contact Person
*@version    : 1.0 - 2009/08/20
*@since      : 2009/08/20

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
			
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="./apps/fis/aie/bmd/housebl/script/AIE_STK_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
<script type="text/javascript">
	function setupPage(){
		loadPage();
	}
</script>
<form name="frm1" method="POST" action="./">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="allc_dt_in"/>
	<input	type="hidden" name="stk_tp_cd_in"/>
    <input  type="hidden" name="trdp_cd_in"/>
     <div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span>MAWB STOCK</span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" onclick="doWork('SEARCH')" ><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
						<col width="63">
						<col width="*">
					</colgroup>							
					<tr>
						<th><bean:message key="Office"/></th>
						<td>
							<div id="div_subcode">
				             	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
								<bean:define id="oficeList" name="valMap" property="ofcList"/> 
				             	<select required name="branch_in" style="width:100;"/>
				             		<logic:iterate id="ofcVO" name="oficeList">
					             			<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				             		</logic:iterate>
			             		</select>
			            	</div>
						</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
	</div>		
</div>
</form>

