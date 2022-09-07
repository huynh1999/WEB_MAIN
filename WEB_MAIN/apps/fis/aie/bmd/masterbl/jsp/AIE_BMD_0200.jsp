<%--
=========================================================
*@FileName   : AIE_BMD_0200.jsp
*@FileTitle  : TSA Print option
*@Description: TSA Print option
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/masterbl/script/AIE_BMD_0200.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>	
	
	<script type="text/javascript">
	<!--
	function setupPage() {
		loadPage();
	}
	//-->
	</script> 

<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq"/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd"/>
	<input type="hidden" name="intg_bl_seq"  value="<bean:write name="intg_bl_seq"/>">                     
	<input type="hidden" name="biz_clss_cd"  value="<bean:write name="biz_clss_cd"/>">                     

	<!-- ------------------------------------------------------------------------- -->
	<!-- 프린터용 -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="user_name" value="<%=userInfo.getUser_name() %>">
	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
	<!-- ------------------------------------------------------------------------- -->
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="TSA"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
				<button type="button" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!--
			--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!--
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
			<div class="opus_design_inquiry entry_pannel ">
	            <table>
	            	<colgroup>
	            		<col width="70"></col>
	            		<col width="210"></col>
	            		<col width="*"></col>
	            	</colgroup>
	            	<tbody>
		              <tr>
		                	<td colspan="3"><h3 class="title_design"><bean:message key="Basic_Information"/></h3></td>
		              </tr>
		              <tr>
	                     	<th><bean:message key="MAWB_No"/><!-- M1234 --></th>
	                       <td colspan="2">
	                       	<input name="bl_no" type="text" value="<%=request.getParameter("bl_no")%>"  maxlength="40" style="width:210;" class="search_form-disable" readOnly>
	                       </td>
	                   </tr>
	                   <tr>
	                   	<td colspan="3">
                        	<input type="radio" name="display_option" id="display_option1" value="SE"><label for="display_option1">Known Shipper</label>
                        	<input type="radio" name="display_option" id="display_option2" value="UN" checked="checked"><label for="display_option2">Unknown Shipper</label>
                        </td>
	                   </tr>
		              <tr>
	                     	<th><bean:message key="Trucker"/></th>
	                       <td colspan="2"><!--
							--><input type="text" name="shpr_trdp_cd" id="shpr_trdp_cd" maxlength="20" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:86px;"><!--
							--><button type="button" width="50px" class="input_seach_btn" tabindex="-1" id="shipper" onclick="openAiiMasterPopUp('LINER_POPLIST',this)"></button><!--
							--><input type="text" name="shpr_trdp_nm" readOnly>
							<input type="hidden" name="shpr_trdp_addr">
							<input type="hidden" name="shpr_local_addr">
	                       </td>
	                   </tr>
	                   <tr>
	                        <th colspan="2">Name of Person Whom Shipment was Accepted</th>
	                        <td>
	                        	<input name="issued_by" id="issued_by" type="text" value="<%=request.getParameter("issued_by")%>"  maxlength="50" style="ime-mode:disabled; text-transform:uppercase;width:200px;" class="search_form" >
	                        </td>
	                        <td><input name="s_oe_dptm_flg" id="s_oe_dptm_flg" type="checkbox" value="Y"  style=" font:bold;" checked="checked" ><label for="s_oe_dptm_flg" >Signature</label></td>
	                    </tr>
	                    <tr>
	                        <th colspan="2">Items under 16 ounces (453.6 grams)</th>
	                        <td>
	                        	<input name="item_qty" type="text" value='0' maxlength="2" onkeyPress="onlyNumberCheck();" style="width:20;text-align:right" class="search_form">
	                        </td>
	                    </tr>
	            	</tbody>
	            </table>
			</div>
		</div>
	</div>
	<div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>     	
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>




