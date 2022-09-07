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
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0061.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
<script type="text/javascript">
<!--

var package_label = "<bean:message key="Package_Label"/>";

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
	
	<bean:parameter name="s_intg_bl_seq" id="s_intg_bl_seq"/>
	<input type="hidden"  name="intg_bl_seq"  value="<bean:write name="s_intg_bl_seq"/>">                     
	<input type="hidden"  name="biz_clss_cd"  value="<%=request.getParameter("biz_clss_cd")%>"/> 
	<input type="hidden"  name="label_type"  value="<%=request.getParameter("label_type")%>"/> 
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
			<span id="span_title"></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('PRINT')" id="btnPrint"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry ">
	   		<table>
	   			<colgroup>
	   				<col width="150"></col>
	   				<col width="*"></col>
	   			</colgroup>
	   			<tbody>
	   				<tr>
	   					<td colspan="2"><h3  class="title_design"><bean:message key="Basic_Information"/></h3></td>
	   				</tr>
	   				<tr>
	   					<th><bean:message key="Total_Pieces"/><!-- M1234 --></th>
                        <td>
                        	<input name="pck_qty" type="text" value='<bean:write name="hmOutParam" property="pck_qty"/>' maxlength="50" style="width:100px;" class="search_form-disable" readOnly>
                        </td>
	   				</tr>
	   				<tr>
                        <th><bean:message key="Number"/><!-- M1234 --></th>
                        <td>
                        	<input name="pack_qty_no1" type="text" value='<bean:write name="hmOutParam" property="pack_qty_no1"/>' maxlength="50" style="width:100px;" class="search_form-disable" readOnly><!--
                        	-->-&nbsp;<!--
                        	--><input name="pack_qty_no2" type="text" value='<bean:write name="hmOutParam" property="pack_qty_no2"/>' maxlength="50" style="width:100px;" class="search_form-disable" readOnly>
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="MBL_No"/><!-- M1234 --></th>
                        <td>
                        	<input name="mbl_no" type="text" value='<bean:write name="hmOutParam" property="mbl_no"/>' maxlength="50" style="width:210px;" class="search_form-disable" readOnly>
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="HBL_No"/><!-- M1234 --></th>
                        <td>
                        	<input name="hbl_no" type="text" value='<bean:write name="hmOutParam" property="hbl_no"/>' maxlength="50" style="width:210px;" class="search_form-disable" readOnly>
                        </td>
                    </tr>
                    <tr>
                       <th><bean:message key="Destination"/></th>
                       <td>
                       		<input name="pod_nm" type="text" value='<bean:write name="hmOutParam" property="pod_nm"/>' maxlength="50" style="width:210px;" class="search_form-disable" readOnly>
                       </td>
                    </tr>
                   </tbody>
	   		</table>
            <div id="hbl_only" style="display:none">
		   		<table>
		   			<colgroup>
	   				<col width="150"></col>
	   				<col width="*"></col>
	   			</colgroup>
                   <tbody>
                     <tr>
                        <th><bean:message key="To"/><!--M1234--></th>
                        <td>
							<input type="text" name="trdp_cd" value='<bean:write name="hmOutParam" property="trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="getTrdpInfo(this, 'onKeyDown')" onBlur="getTrdpInfo(this, 'onBlur')"><!--
                        	--><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doWork('PARTNER_POPLIST', this)"></button><!--
                        	--><input type="text" name="trdp_nm" value='<bean:write name="hmOutParam" property="eng_nm"/>' class="search_form-disable" style="width:264px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, frm1.trdp_nm.value);}" >
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Address"/></th>
                        <td>
                            <textarea name="trdp_addr" class="search_form" style="width:355px;height:76px"><bean:write name="hmOutParam" property="lgl_addr"/></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="PIC_eMail"/></th>
                        <td>
                            <input name="trdp_pic_nm" value='<bean:write name="hmOutParam" property="pic_nm"/>' maxlength="50" type="text" class="search_form" style="width:160px;" ><!--
                        	--><input name="trdp_pic_eml" value='<bean:write name="hmOutParam" property="pic_eml"/>' maxlength="50" type="text" class="search_form" style="width:193px;" >
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Tel_Fax"/></th>
                        <td>
                            <input name="trdp_phn" value='<bean:write name="hmOutParam" property="pic_phn"/>' maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:108px;" ><!--
                        	--><input name="trdp_fax" value='<bean:write name="hmOutParam" property="pic_fax"/>' maxlength="30" type="text" class="search_form" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:138px;" >
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


