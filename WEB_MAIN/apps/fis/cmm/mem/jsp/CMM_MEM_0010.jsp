
<%--
=========================================================
*@FileName   : CMM_MEM.jsp
*@FileTitle  : Memo List
*@Description: 
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<script language="javascript" src="./apps/fis/cmm/mem/script/CMM_MEM_0010.js?ver=<%=CLT_JS_VER%>"></script>
<%
	
	//String intg_bl_seq = request.getParameter("intg_bl_seq");
%>
	
	<script language="javascript">
		loadMemo();      
	</script>
    <!-- 	<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq" /> -->
    	<input type="hidden" name="f_palt_mnu_cd" id="f_palt_mnu_cd" />
    	<input type="hidden" name="f_opr_no" id="f_opr_no" />
    	<%-- <input type="hidden" name="f_cmd" id="f_cmd" />
    	<input type="hidden" name="f_CurPage" id="f_CurPage" /> 
    	<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq" />
    	<input type="hidden" name="f_palt_mnu_cd" id="f_palt_mnu_cd" />
    	<input type="hidden" name="f_opr_no" id="f_opr_no" />
    	
    	<input type="hidden" name="file_name" id="file_name" />
    	<input type="hidden" name="title" id="title" />
    	<input type="hidden" name="user_id"  id="user_id"  value="<%=userInfo.getUsrid()%>" />
    	<input type="hidden" name="rd_param" id="rd_param" />
    	<input type="hidden" name="mailTitle" id="mailTitle" />
    	<input type="hidden" name="mailTo" id="mailTo" /> --%>
    	
		<!-- # Document List # - grid_area(E) -->	
		
			<h3 class="title_design"><bean:message key="Document_List" /></h3>
			<div class="opus_design_btn"> 
				<button id="btnSave" onClick="doWorkMemo('DELMEMO')" type="button" class="btn_normal"><bean:message key="Save"/></button>
				<button type="button" btnAuth="S_DOC" onClick="doWorkMemo('S_DOC');" class="btn_normal"><bean:message key="Print"/></button>
				<button type="button" class="btn_normal" id="fileUpObj" onClick="doWorkMemo('NEWMEMO')" ><bean:message key="Upload" /></button>
			</div>
			<script type="text/javascript">comSheetObject('msheet');</script>
		 
		<!-- grid_area(E) -->

	<!-- <form name="mfrm2" method="POST" action="./GateServlet.gsl">
		<input type="hidden" name="goWhere" value="fd"/>
	    <input type="hidden" name="bcKey"   value="blFileDown"/>
	    <input type="hidden" name="s_palt_doc_seq" value=""/>
	    <input type="hidden" name="docType" value=""/>
	</form> -->
	
	