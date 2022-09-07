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
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sei/bmd/arrivalnotice/script/SEI_DOC_1080.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
    <script language="javascript">
   	 	function setupPage(){
	    	loadPage();
	    }
	</script>

<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<bean:parameter name="s_intg_bl_seq" id="s_intg_bl_seq" value= ""/>
	<input type="hidden" name="intg_bl_seq"  value="<bean:write name="s_intg_bl_seq"/>">                     

	<!-- ------------------------------------------------------------------------- -->
	<!-- 프린터용 -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="ofc_cnt_cd" id="ofc_cnt_cd" value="<%=userInfo.getOfc_cnt_cd() %>">	
	<input type="hidden" name="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="user_name" value="<%=userInfo.getUser_name() %>">
	<input type="hidden" name="tel" value="<%=userInfo.getPhn() %>">
	<input type="hidden" name="fax" value="<%=userInfo.getFax() %>">
	<input type="hidden" name="mailTitle" value=""/>
	
	<input type="hidden" name="trdp_eml" value='<bean:write name="hmOutParam" property="trdp_eml"/>'>
	<input type="hidden" name="trdp_pic_nm" value='<bean:write name="hmOutParam" property="trdp_pic_nm"/>'>
	<input type="hidden" name="brk_trdp_cd" value='<bean:write name="hmOutParam" property="brk_trdp_cd"/>'>
	<input type="hidden" name="ntfy_trdp_cd" value='<bean:write name="hmOutParam" property="ntfy_trdp_cd"/>'>
	
		<!--#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청 -->
	<input type="hidden" name="rpt_file_name_title"/>
	
	
	<!-- ------------------------------------------------------------------------- -->

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<input type="hidden" name="rpt_cc_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!-- Realsed set (S)-->
	<input type="hidden" name="send_type" value=""/>
	<!-- Realsed set (E)-->
	
	<!-- page_title_area -->
	<div class="layer_popup_title">
	<div class="page_title_area clear">
	   <h2 class="page_title"><bean:message key="Release_OrderTurnover"/></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry ">
	   		<h3 style="margin-bottom:0" class="title_design"><bean:message key="Basic_Information"/></h3>
	   		<table>
                <tr>
                    <th width="150px"><bean:message key="HBL_No"/><!-- M1234 --></th>
                    <td><input name="f_hbl_no" type="text" value='<bean:write name="hmOutParam" property="hbl_no"/>' maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" class="search_form-disable" readOnly></td>
                </tr>
                <tr>
                    <th><bean:message key="By"/><!-- M1234 --></th>
                    <td><input name="f_user_name" type="text" value='<%=userInfo.getUser_name() %>' maxlength="50" style="width:100px;" class="search_form-disable" readOnly></td>
                </tr>
                <tr>
                    <th><bean:message key="Date"/><!-- M1234 --></th>
                    <td><input name="f_to_date" type="text" value="" maxlength="50" style="width:120px;" class="search_form-disable" readOnly></td>
                </tr>
                <tr>
                    <th><bean:message key="Send_To"/><!--M1234--></th>
                    <td><!-- 
                     --><input type="text" name="cfs_trdp_cd" value='<bean:write name="hmOutParam" property="cfs_trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="codeNameAction2('trdpcode_send',this, 'onKeyDown')" onBlur="codeNameAction2('trdpcode_send',this, 'onBlur')"><!-- 
                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('SEND_POPLIST', this)"></button><!-- 
                     --><input type="text" name="cfs_trdp_nm" value='<bean:write name="hmOutParam" property="cfs_trdp_nm"/>' class="search_form"  style="width:234px;" onKeyPress="if(event.keyCode==13){doWork('SEND_POPLIST', this);}"><!-- 
                     -->
                     <input type="hidden" name="cfs_trdp_addr" value='<bean:write name="hmOutParam" property="cfs_trdp_addr"/>'>
                     <input type="hidden" name="cfs_trdp_phn" value='<bean:write name="hmOutParam" property="cfs_trdp_phn"/>'>
                     <input type="hidden" name="cfs_trdp_fax" value='<bean:write name="hmOutParam" property="cfs_trdp_fax"/>'>
                     <input type="hidden" name="cfs_trdp_pic_nm" value='<bean:write name="hmOutParam" property="cfs_trdp_pic_nm"/>'>
                     <input type="hidden" name="cfs_trdp_eml" value='<bean:write name="hmOutParam" property="cfs_trdp_eml"/>'>
			    	</td>
                </tr>
                <tr>
                    <th><bean:message key="Release_to"/><!--M1234--></th>
                    <td><!-- 
                     --><input type="text" name="trdp_cd" value='<bean:write name="hmOutParam" property="trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="codeNameAction2('trdpcode_dest',this, 'onKeyDown')" onBlur="codeNameAction2('trdpcode_dest',this, 'onBlur')"><!-- 
                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
                     --><input type="text" name="trdp_nm" value='<bean:write name="hmOutParam" property="trdp_nm"/>' class="search_form"  style="width:234px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this);}"><!-- 
                     --></td>
                </tr>
                <tr>
                    <th><bean:message key="Address"/></th>
                    <td><textarea name="trdp_addr" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="width:325px;height:80px;"><bean:write name="hmOutParam" property="trdp_addr"/></textarea></td>
                </tr>
                <tr>
                    <th><bean:message key="Tel_Fax"/></th>
                    <td><!-- 
                     --><input name="trdp_phn" value='<bean:write name="hmOutParam" property="trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:120px;" ><!-- 
                     --><input name="trdp_fax" value='<bean:write name="hmOutParam" property="trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:120px;"><!-- 
                     --></td>
                </tr>
                <tr>
                    <th><bean:message key="Special_Instructions"/><!--M1234--></th>
                    <td><textarea name="special_instructions" class="search_form" onblur="strToUpper(this)" dataformat="excepthan" style="width:325px;height:80px;"></textarea></td>
                </tr>
                <tr>
                    <th><bean:message key="Select_Title"/><!--M1234--></th>
                    <td>
                    <!-- #5288 - [KING FREIGHT] OIH RELEASE ORDER TITLE ADD OPTIONS -->
                    	 <select name="select_title" id="select_title" style="width: 200px">
                   			<bean:define id="byTitleList" name="valMap" property="byTitleList"/>
                       		<logic:iterate id="currVO" name="byTitleList">
                       			<option value='<bean:write name="currVO" property="cd_val"/>'><bean:write name="currVO" property="cd_nm"/></option>
                      		 </logic:iterate>
                   		</select>
                     </td>
                </tr>
	        </table>
	   	</div>
	</div>
	</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>


