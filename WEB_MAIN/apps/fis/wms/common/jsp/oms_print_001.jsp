<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : oms_print_001.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2015/03/31
=========================================================*/
%>


<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="java.util.*"%>
 <%@ page import="com.clt.business.oms.system.code.util.JSPUtil"%>
<%--<%@ page import="com.hanjin.framework.support.view.signon.SignOnUserAccount"%>
<%@ page import="com.hanjin.framework.support.controller.html.CommonWebKeys"%> --%>

<%

    int type = 2;
    String clp_no_com = "";
	String routDestYdCd = "";
	String strUsr_nm = "";

	//String strOfc_cd ="";
	//SignOnUserAccount account=(SignOnUserAccount)session.getAttribute(CommonWebKeys.SIGN_ON_USER_ACCOUNT);
	//strOfc_cd  = account.getOfc_cd();
	//strUsr_nm  = account.getUsr_nm();

    clp_no_com =  request.getParameter("clp_no");

    String mrd_path_com = "";
    mrd_path_com	= request.getParameter("mrd_path");

    //String mrd_param = "/rp ["+dmstBkgNo+"] ["+strUsr_nm+"]";
    String mrd_param_com = "";
    mrd_param_com = request.getParameter("mrd_param");
%>

<script type="text/javascript" src="./web/script/rd/rdviewer50.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
    function setupPage(){

        loadPage();     
    }
</script>

<form name="form" style="margin:0">
	<input type="hidden" name="mrd" value="<%=mrd_path_com%>" id="mrd" />
	<input type="hidden" name="param" value="<%=mrd_param_com%>" id="param" />	
	<div class="wrap_result" style ="height: 100%">		
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span>Print Popup</span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_close" id="btn_close">Close</button>		
		</div>
		<!-- opus_design_btn(E) -->		
	</div>
	<!-- page_title_area(E) -->	
		<div class="opus_design_RD">
			<script type="text/javascript">comRdObject('domRd');</script>
		</div>			
	</div>
</form>