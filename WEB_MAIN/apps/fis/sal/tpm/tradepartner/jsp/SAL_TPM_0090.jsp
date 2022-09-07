<%--
=========================================================
*@FileName   : SAL_TPM_0090.jsp
*@FileTitle  : Trade Partner Merge
*@Description: Trade Partner Merge
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 03/23/2012
*@since      : 03/23/2012

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0090.js?ver=<%=CLT_JS_VER%>"></script>
	
<script>
	function setupPage(){
       	loadPage();
    }
</script>

<form name="frm1" method="POST" action="./">
	
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="f_h_merge_chk_1"/>
	<input type="hidden" name="f_h_merge_chk_2"/>
	<input type="hidden" name="f_h_merge_chk_3"/>
	
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="CHANGE" onclick="doWork('CHANGE');"><bean:message key="B.Change"/></button>
		    --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- wrap_search (S) -->
	<div class="wrap_result">	
		<div class="opus_design_inquiry wFit">
			<table>
               <tr>
                  <th width="80px"><bean:message key="From"/></th>
               	  <td><!-- 
               	   --><input required type="text" name="f_fm_trdp_cd" maxlength="20" value="" onKeyDown="codeNameAction('fm_trdpcode',this, 'onKeyDown')" onBlur="codeNameAction('fm_trdpcode',this, 'onBlur')" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px" class="search_form"><!-- 
               	   --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('FM_TRDP_POPLIST')"></button><!-- 
               	   --><input type="text" name="f_fm_trdp_nm" maxlength="50" value="" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:250px" onKeyPress="if(event.keyCode==13){doWork('FM_TRDP_POPLIST', this.value);}" class="search_form"><!-- 
               	   --></td>
                </tr>
                <tr>
                  <th><bean:message key="To"/></th>
               	  <td><!-- 
               	   --><input required type="text" name="f_to_trdp_cd" maxlength="20" value="" onKeyDown="codeNameAction('to_trdpcode',this, 'onKeyDown')" onBlur="codeNameAction('to_trdpcode',this, 'onBlur')" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:80px" class="search_form"><!-- 
               	   --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('TO_TRDP_POPLIST')"></button><!-- 
               	   --><input type="text" name="f_to_trdp_nm" maxlength="50" value="" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:250px" onKeyPress="if(event.keyCode==13){doWork('TO_TRDP_POPLIST', this.value);}" class="search_form"><!-- 
               	   --></td>
                </tr>
              </table>
              <table>
				<tr>
					<th width="195px"><label for="f_merge_chk_1"><bean:message key="Inactivate_Trade_Partner"/></label></th>
					<td><input name="f_merge_chk_1" id="f_merge_chk_1" type="checkbox" class="radio_select" checked></td>
				</tr>
				<tr>
					<th><label for="f_merge_chk_2"><bean:message key="Contact_Person_Information"/></label></th>
					<td><input name="f_merge_chk_2" id="f_merge_chk_2" type="checkbox" class="radio_select" checked></td>
				</tr>
				<tr>
					<th><label for="f_merge_chk_3"><bean:message key="Tariff_Info"/></label></th>
					<td><input name="f_merge_chk_3" id="f_merge_chk_3" type="checkbox" class="radio_select" checked></td>
				</tr>
			</table>
		</div>
	</div>
	</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
			
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>