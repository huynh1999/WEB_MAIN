<%--
=========================================================
*@FileName   : MGT_JOB_0030.jsp
*@FileTitle  : Job Visibility Detail
*@Description: Job Visibility Detail
*@author     : Chung, Sung, Woog - Cyberlogitec
*@version    : 1.0 - 06/3/2009
*@since      : 06/3/2009

*@Change history:
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	    <title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/job/jobmgt/script/MGT_JOB_0030.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="bkg_no" />
	<input type="hidden" name="sr_no" />
	<input type="hidden" name="intg_bl_seq_in" />
	<input type="hidden" name="air_sea_clss_cd" />
	<input type="hidden" name="bnd_clss_cd" />
	<div class="layer_popup_title">
		<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><bean:message key="Operation_Visibility_Detail"/></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
				   <button type="button" class="btn_accent" name="btnSearch" id="btnSearch" onclick="doWork('CLOSE')"><bean:message key="Close"/></button> 
				</div>
				<!-- opus_design_btn(E) -->
		</div>
	    <!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
						<col width="80">
						<col width="100">
						<col width="70">
						<col width="100">
						<col width="70">
						<col width="100">
						<col width="70">
						<col width="*">
					</colgroup>
					<tbody>
					
                            <tr>
                                <th><bean:message key="Category"/></th>
                                <td>
									<input type="text" name="category" size="19" class="search_form-disable">
								</td>
                                <th><bean:message key="Template"/></th>
                                <td>
                                    <input type="text" name="template" size="19" class="search_form-disable">
                                </td>
                                <th><bean:message key="Recv_DT"/></th>
                                <td>
                                    <input type="text" name="recv_dt" size="19" class="search_form-disable">
                                </td>
                                <th><bean:message key="Operator"/></th>
                                <td>
                                    <input type="text" name="operator" size="11" class="search_form-disable">
                                </td>
                            </tr>
                            <tr>
                                <th><bean:message key="Booking_No"/></th>
                                <td>
									<input type="text" name="booking_no" size="19" class="search_form-disable">
								</td>
                                <th><bean:message key="HBL_No"/></th>
                                <td>
                                    <input type="text" name="hbl_no" size="19" class="search_form-disable">
                                </td>
                                <th><bean:message key="MBL_No"/></th>
                                <td>
                                    <input type="text" name="mbl_no" size="19" class="search_form-disable">
                                </td>
                                <th><bean:message key="Status"/></th>
                                <td>
                                    <input type="text" name="status" size="11" class="search_form-disable"/>
                                </td>
                            </tr>
                          </tbody>
                       </table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_grid">
				<h3 class="title_design"><bean:message key="Detail"/></h3>
				 <script language="javascript">comSheetObject('sheet1');</script>
				 <script language="javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
	</div>
</div>
</form>



