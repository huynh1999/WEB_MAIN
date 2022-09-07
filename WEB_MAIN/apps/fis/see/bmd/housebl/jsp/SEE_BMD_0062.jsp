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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0062.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
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
	
	<bean:parameter name="s_intg_bl_seq" id="s_intg_bl_seq"/>
	<input type="hidden" name="intg_bl_seq"  value="<bean:write name="s_intg_bl_seq"/>">                     

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
	<input type="hidden" name="trdp_pic_nm" value='<bean:write name="hmOutParam" property="trdp_pic_nm"/>'>
	<input type="hidden" name="delivery_trdp_pic_nm" value="">
	<!-- ------------------------------------------------------------------------- -->

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><bean:message key="POD"/></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="ComClosePopup();window.close()"><bean:message key="Close"/></button>
	   </div>
	</div>
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry entry_pannel ">
	   		<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
	   		<table>
	   			<colgroup>
	   				<col width="150"></col>
	   				<col width="*"></col>
	   			</colgroup>
	   			<tbody>
	   				<tr>
                        <th><bean:message key="HBL_No"/><!-- M1234 --></th>
                        <td>
                        	<input name="hbl_no" type="text" value='<bean:write name="hmOutParam" property="hbl_no"/>' maxlength="50" style="width:100px;" class="search_form-disable" readOnly>
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="By"/><!-- M1234 --></th>
                        <td>
                        	<input name="by_user" type="text" value="<%=userInfo.getUser_name() %>" maxlength="50" style="width:100px;" class="search_form-disable" readOnly>
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Date"/><!-- M1234 --></th>
                        <td>
                        	<input name="to_date" type="text" value='<bean:write name="hmOutParam" property="to_date"/>' maxlength="50" style="width:100px;" class="search_form-disable" readOnly>
                        </td>
                    </tr>
                    <tr>
                         <th><bean:message key="Select_Title"/><!-- M1234 --></th>
                         <td>
                           	<bean:define id="selectTitleList" name="valMap" property="selectTitleList"/>
                           	<html:select name="hmOutParam" property="select_title_cd" styleClass="search_form" style="width:120px;">
                                <html:options collection="selectTitleList" property="cd_val" labelProperty="cd_nm"/>
                            </html:select>
                         </td> 
                     </tr>
                     <tr>
                        <th><bean:message key="To"/><!--M1234--></th>
                        <td>
							<input type="text" name="trdp_cd" value='<bean:write name="hmOutParam" property="trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="codeNameAction2('trdpcode_dest',this, 'onKeyDown')" onBlur="codeNameAction2('trdpcode_dest',this, 'onBlur')"><!--
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('TO_POPLIST', this)"></button><!--
							--><input type="text" name="trdp_nm" value='<bean:write name="hmOutParam" property="trdp_nm"/>' class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:234px;" onKeyPress="if(event.keyCode==13){doWork('TO_POPLIST', this);}">
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Address"/></th>
                        <td>
                            <textarea name="trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:325px;height:80px"><bean:write name="hmOutParam" property="trdp_addr"/></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Tel_Fax"/></th>
                        <td>
                            <input name="trdp_phn" value='<bean:write name="hmOutParam" property="trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:120px;" ><!--
							--><input name="trdp_fax" value='<bean:write name="hmOutParam" property="trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:120px;">
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Deliver_to"/><!--M1234--></th>
                          <td>
							<input type="text" name="delivery_trdp_cd" value='<bean:write name="hmOutParam" property="delivery_trdp_cd"/>' class="search_form" style="width:60px;text-transform:uppercase;"  onKeyDown="codeNameAction2('trdpcode_delivery',this, 'onKeyDown')" onBlur="codeNameAction2('trdpcode_delivery',this, 'onBlur')"><!--
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('DELIVERY_TO_POPLIST', this)"></button><!--
							--><input type="text" name="delivery_trdp_nm" value='<bean:write name="hmOutParam" property="delivery_trdp_nm"/>' class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:234px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){doWork('DELIVERY_TO_POPLIST', this);}" >
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Address"/></th>
                        <td>
                            <textarea name="delivery_trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:325px;height:80px"><bean:write name="hmOutParam" property="delivery_trdp_addr"/></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Tel_Fax"/></th>
                        <td>
                            <input name="delivery_trdp_phn" value='<bean:write name="hmOutParam" property="delivery_trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:120px;" ><!--
							--><input name="delivery_trdp_fax" value='<bean:write name="hmOutParam" property="delivery_trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:120px;">
                        </td>
                    </tr>
                    <tr>
                        <th><bean:message key="Delivered_on"/><!--M1234--></th>
                        <td>
							<input type="text" name="delivery_on" value='<bean:write name="hmOutParam" property="delivery_on"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:60px;">
                        </td>
                    </tr>
                    <tr>
                      <th><bean:message key="Signed_by"/><!--M1234--></th>
                       <td>
							<input type="text" name="singed_by" value='<bean:write name="hmOutParam" property="singed_by"/>' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:60px;">
                      </td>
                  	</tr>
                  	<tr>
                        <th><bean:message key="Remark"/></th>
                        <td>
                            <textarea name="remark" maxlength="500" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:325px;height:80px"><bean:write name="hmOutParam" property="remark"/></textarea>
                        </td>
                    </tr>
	   			</tbody>
	   		</table>
	   	</div>
	</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>



