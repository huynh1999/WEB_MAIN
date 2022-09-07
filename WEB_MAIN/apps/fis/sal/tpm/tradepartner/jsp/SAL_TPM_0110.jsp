<%--
=========================================================
*@FileName   : SAL_TPM_0110.jsp
*@FileTitle  : Sales Daily Report List
*@Description: Sales Daily Report List
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 04/06/2012
*@since      : 04/06/2012

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0110.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		function setupPage(){
        	loadPage();
        }
	</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofcLoclNm %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TPM_0020.clt"/>
	
    <!-- 타이틀, 네비게이션 -->
    <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" btnAuth="<%= roleBtnVO.getAttr1() %>" style="display:none;"><bean:message key="Search"/></button> 
			<button type="button" class="btn_normal" onclick="doWork('NEW');" btnAuth="<%= roleBtnVO.getAttr2() %>" style="display:none;"><bean:message key="New"/></button>
			<button type="button" class="btn_normal" onclick="doWork('PRINT')" btnAuth="<%= roleBtnVO.getAttr5() %>" style="display:none;" id="btnPrint"><bean:message key="Print"/></button> 
			<button type="button" class="btn_normal" onclick="doWork('EXCEL')" btnAuth="<%= roleBtnVO.getAttr6() %>" style="display:none;" name="btn_DownExcel"><bean:message key="Excel"/></button>
 --%>	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- wrap_search (S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
           <table>
           	  <colgroup>
           	  	<col width="50">
           	  	<col width="270">
           	  	<col width="50">
           	  	<col width="*">
           	  </colgroup>
           	  <tbody>
	              <tr>
					<th><bean:message key="Customer"/></th>
					<td>
						<input type="text"   name="s_trdp_cd" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"  onKeyDown="codeNameAction('partner_pickup',this, 'onKeyDown')" onBlur="codeNameAction('partner_pickup',this, 'onBlur')"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
					 --><input type="text" maxlength="50"   name="s_trdp_nm" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:160px;" value='' id="pic" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}">
					 </td> 
		            <th><bean:message key="Date"/></th>
					<td><input required style="width:75px" type="text" name="s_fm_visit_tm_fm" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form"><!-- 
					 --><span class="dash">~</span><!-- 
					 --><input required style="width:75px" type="text" name="s_to_visit_tm_to" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form"><!-- 
					 --><button type="button" class="calendar ir" onclick="doDisplay('DATE1', frm1);"></button></td>
				 </tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- wrap_search (E) -->
	
	<!-- wrap_result(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>

    	<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
              <table>
                  <tr>
                      <td width="60px"><!--- 
                      Display option Begin 
                      ---><bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/><!-- 
                      --><bean:define id="pagingVal" name="tmpMapVal"     property="paging"/><!-- 
                      --><paging:options name="pagingVal" defaultval="200"/><!-- 
					  --></td>
                      <td align="center">
                          <table  border="0" width="100%">
                              <tr>
                                  <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
                              </tr>
                          </table>
                      </td>
                      <td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
                  </tr>
               </table>
        </div>
     </div>
     <!-- wrap_result(S) -->
</div>
	</form>
	<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>
	<form name="frm2" method="POST" action="./GateServlet.gsl">
		<input type="hidden" name="goWhere" value="fd"/>
	    <input type="hidden" name="bcKey"   value="paFileDown"/>
	    <input type="hidden" name="trdp_cd" value=""/>
	    <input type="hidden" name="cntc_seq" value=""/>
	</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	


