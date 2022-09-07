<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0220.jsp
*@FileTitle  : Booking And House B/L Search 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/16
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mgt/skd/mod/script/MGT_SKD_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>    
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
</head>
<form name="frm1" method="POST" action="./MGT_SKD_0010.clt">
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="MGT_SKD_0010.clt"/>
		
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP"> 
				<%-- 
				<button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')" name="btnSearch"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onClick="doWork('MODIFY');"><bean:message key="Save"/></button>
				--%>
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
    <!-- page_title_area(E) -->
		
	<!-- inquiry_area(S) -->	
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
		<table>	
				<colgroup>
			        	<col width="65px">
			        	<col width="70px">
			        	<col width="50px">
			        	<col width="70px">
			        	<col width="50px">
			        	<col width="*">
			   </colgroup>
			        <tbody>
						<tr>
							<th><bean:message key="VSL_VOY"/></th> 
							<td>
								<input type="hidden" name="trnk_vsl_cd" value='' class="search_form" dataformat="excepthan"><!-- 
								 --><input type="text" name="trnk_vsl_nm" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:173px;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}"><!--
								 --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openPopUp('VESSEL_POPLIST_BLANK',this)"></button><!-- 
								 --><input type="text" name="trnk_voy" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)">
	                        </td>
							<th><bean:message key="POL"/></th>
							<td>
								<input type="text"   name="f_pol_cd" id="f_pol_cd" maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!-- 
								 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!-- 
								 --><input type="text"   name="f_pol_nm" id="f_pol_nm"  maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value, frm1.f_pol_nm.value);}"/>
							</td>
							<th><bean:message key="ETD"/></th>
							
							<td>
								<input style="width:75px;" type="text" id="etd_strdt" name="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!-- 
								 --><input style="width:75px;" type="text" id="etd_enddt" name="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!-- 
								 --><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
							</td>
	                    </tr>
				</tbody>
			</table>
		</div>	
	</div>
	<div class="wrap_result">
		<div class="opus_design_inquiry">			
			<table>	
				<colgroup>
			        	<col width="65px">
			        	<col width="10px">
			        	<col width="20px">
			        	<col width="10px">
			        	<col width="*">
			   </colgroup>
			        <tbody>
						<tr>
							<th><bean:message key="ATD"/></th>
	                        <td>
	                        	<input required type="text" name="f_etd_dt_tm" id="f_etd_dt_tm"  onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='10' maxlength="10" class="search_form" style="width:77px;"><!-- 
								 --><button type="button" class="calendar" tabindex="-1" name="etd_dt_tm_cal" id="etd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.f_etd_dt_tm);" ></button>
	                        </td>
	                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	                        <th><bean:message key="ATA"/></th>
	                        <td>
	                            <input type="text" name="f_eta_dt_tm" id="f_eta_dt_tm"  onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_eta_dt_tm, this);mkDateFormatType(this, event, true, 1)" size='10' maxlength="10" class="search_form" style="width:77px;"><!-- 
								 --><button type="button" class="calendar" tabindex="-1" name="eta_dt_tm_cal" id="eta_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.f_eta_dt_tm);" ></button>
	                        </td>
                           </tr>
				</tbody>
			</table>
		</div>	
	</div>
	<table class="line_bluedot"><tr><td></td></tr></table>
	<!-- inquiry_area(E) -->
		
	<!-- grid_area(S) -->
	<div class="wrap_result">
		<!-- grid_area1(S) -->	
		<h3 class="title_design"><bean:message key="MBL_List"/></h3>
		<div class="opus_design_inquiry">
			<div class="opus_design_grid" id="mainTable">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div> 
<%--               	<table>
	              	<tr>
						<td width="100">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>
						<td align="center" width="900">
							<table width="900">
								<tr>
									<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>		
						</td>
						<td width="100"></td>
					</tr>
              </table> --%>
     	</div>
	</div>
	<!-- grid_area(E) -->	
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>
</body>	
<%@page import="java.net.URLEncoder"%>

