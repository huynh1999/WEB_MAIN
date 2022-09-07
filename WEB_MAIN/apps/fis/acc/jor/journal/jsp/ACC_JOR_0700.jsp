<%--
=========================================================
*@FileName   : ACC_JOR_0700.jsp
*@FileTitle  : Journal History List
*@Description: Journal History
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0700.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);	
		function setupPage(){
			loadPage();
		 }
	</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./ACC_JOR_0700.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="jnr_no" 	value="<%=request.getParameter("jnr_no")%>"/>
	<input type="hidden" name="jnr_tp" 	value="<%=request.getParameter("jnr_tp")%>"/>
	<input type="hidden" name="modi_seq" value=""/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_JOR_0700.clt"/>
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">
				<span id="payment_title" style="display:none"><bean:message key="Payment"/> <bean:message key="History"/></span>
				<span id="deposit_title" style="display:none"><bean:message key="Deposit"/> <bean:message key="History"/></span>
			</h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn" id="btnPrint">
				<button type="button" class="btn_accent" onclick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
			</div>
			<!-- opus_design_btn(E) -->
	   
	 			<!-- page_location(S) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
		</div>
	</div>
	<div class="layer_popup_contents">
	    <div class="wrap_result">
	    	<div class="opus_design_grid">
	    		<script language="javascript">comSheetObject('sheet1');</script>
	    		<table>
	                 <tr>
	                     <td width="60px"></td>
	                     <td align="center">
	                         <table>
	                             <tr>
	                                 <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
	                                 <td width="60"></td>
	                             </tr>
	                         </table>
	                     </td>
	                 </tr>
	             </table>
	             <h3><bean:message key="Detail"/></h3>
	             <script language="javascript">comSheetObject('sheet2');</script>
	             <!--- Paging(공통) --->
	                <table>
	                    <tr>
	                        <td width="60">
	            
	                        </td>
	                        <td align="center">
	                            <table>
	                                <tr>
	                                    <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
	                                    <td width="60"></td>
	                                </tr>
	                            </table>
	                        </td>
	                    </tr>
	                </table>
	    	</div>
	    </div>
	</div>
</form>



