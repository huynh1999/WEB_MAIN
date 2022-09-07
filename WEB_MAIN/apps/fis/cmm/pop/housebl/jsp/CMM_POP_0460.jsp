<!-- 
//=========================================================
//*@FileName   : CMM_POP_0460.jsp
//*@FileTitle  : 
//*@Change history:
//*@author     : 
//*@version    : 04/03/2017
//*@since      : 04/03/2017
//=========================================================
 -->
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script language="javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/housebl/script/CMM_POP_0460.js?ver=<%=CLT_JS_VER%>"></script>

<%
	String f_plan_no = "";
	String f_bkg_seq = "";
	f_plan_no = request.getParameter("f_plan_no");
	f_bkg_seq = request.getParameter("f_bkg_seq");
%>

<script>
function setupPage(){
	//loadPage();
}
</script>	

<style> body { border-top-width: 6px!important; } </style>
<form name=frm1 method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
		
	<input	type="hidden" name="rd_param"/>
		
	<!--  Logo Yn Form -->
	<input	type="hidden" name="logoYn" />	
	
	<input	type="hidden" name="bkg_seq" value="<%= f_bkg_seq %>"/>
	<input	type="hidden" name="ofc_cd" value="<%= userInfo.getOfc_cd() %>"/>
	
	<div class="layer_popup_title">
		<!-- Button -->
		<div class="page_title_area clear">
	   	   <h2 class="page_title" align="left"><bean:message key="Load_Plan"/>&nbsp;<bean:message key="Print"/></h2>
		   <!-- btn_div -->
			   <div class="opus_design_btn">
				   <button type="button" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
	    	<div class="opus_design_grid" style="width:420px">
	    		<table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <th width="125px" scope="row" nowrap class="table_search_head" align="right"><bean:message key="Plan_No"/></th>
			            <td colspan="4" width="130px" class="table_search_body">&nbsp;&nbsp;<!-- 
			            	 --><input type="text" name="plan_no" style="width:120px;" value="<%= f_plan_no %>" readonly>
			            </td>       
			        </tr>
			        <tr height="3px"/>			        
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="CFS_Location"/></th>
						<td colspan="4" class="table_search_body">
						    &nbsp;&nbsp;<input type="text" name="trk_trdp_cd" maxlength="20"  onKeyDown="codeNameAction('trdpCode_trk',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_trk',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!--
                            --><button type="button" name="trk" id="trk" class="input_seach_btn" tabindex="-1" onClick="doWork('CFS_POPLIST',this)"></button><!--
                            --><input type="text"   name="trk_trdp_nm" maxlength="50" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:163px;" ><!--
							-->
						</td>
			        </tr>
			        <tr height="3px"/>
			        <tr>
	              		<th>&nbsp;</th>
	              		<td colspan="3">&nbsp;&nbsp;<textarea id="trk_trdp_addr" name="trk_trdp_addr" class="search_form autoenter_50px" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:270px;height:100px;" WRAP="off"></textarea>
	              	    </td>
	              	</tr>		
	              	<tr height="3px"/>	        
			        <tr>
			        	<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Attention"/></th>
			        	<td class="table_search_body">
			        		<!-- #2677 [PATENT] Bugs were reported when doing internal testing for Consolication -->
			        		<!-- &nbsp;&nbsp;<input type="text" name="trk_trdp_attention" maxlength="30" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:104px;" > -->
			        		&nbsp;&nbsp;<input type="text" name="trk_trdp_attention" maxlength="30" dataformat="multiLanguage" style="ime-mode:disabled;width:104px;" >
			        	</td>
			        	<th>&nbsp;</th>
			        	<td>&nbsp;</td>
			        </tr>
			        <tr height="3px"/>
			        <tr>
			        	<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Phone"/></th>
			        	<td class="table_search_body">
			        		<!-- #2677 [PATENT] Bugs were reported when doing internal testing for Consolication -->
			        		<!-- &nbsp;&nbsp;<input type="text" name="trk_trdp_phn" maxlength="30" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:104px;" > -->
			        		&nbsp;&nbsp;<input type="text" name="trk_trdp_phn" maxlength="30" dataformat="multiLanguage" style="ime-mode:disabled;width:104px;" >
			        	</td>
			        	<th scope="row" nowrap class="table_search_head" align="right" style="width: 47px"><bean:message key="Fax"/></th>
			        	<td class="table_search_body">
			        		<!-- #2677 [PATENT] Bugs were reported when doing internal testing for Consolication -->
			        		<!-- &nbsp;&nbsp;<input type="text" name="trk_trdp_fax" maxlength="30" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:104px;" > -->
			        		&nbsp;&nbsp;<input type="text" name="trk_trdp_fax" maxlength="30" dataformat="multiLanguage" style="ime-mode:disabled;width:104px;" >
			        	</td>
			        </tr>
			    </table>
			</div>
	    </div>
	</div>
</form>



