<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0230.jsp
*@FileTitle  : Coload B/L Search 
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/housebl/script/SEE_BMD_0230.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<script type="text/javascript">
	
	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var edob_flg = "<%= userInfo.getEdob_flg() %>";		
	
	function setupPage(){
		loadPage(); 
	}
	
	 
	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
       <bean:define id="ofcVO" name="officeInfo"/>
	var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
	</script>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String phn = userInfo.getPhn();
		String fax = userInfo.getFax();
		String email = userInfo.getEml();
	%>

	<form name="frm1" method="POST" action="./SEE_BMD_0060.clt">
		<input type="hidden" name="f_cmd">
	    <input type="hidden" name="f_CurPage"> 
	    
		<!-- 세션 유저 정보  -->
		<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
		<input	type="hidden" name="f_phn" value="<%= phn %>"/>
		<input	type="hidden" name="f_fax" value="<%= fax %>"/>
		<input	type="hidden" name="f_email" value="<%= email %>"/>
		<input	type="hidden" name="u_ofc_cd" value="<%= ofc_cd %>"/>
		<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	
	    <!-- Report Value -->
		<input type="hidden" name="title" value="">
		<input type="hidden" name="file_name" value="">
		<input type="hidden" name="rd_param" value="">
		<input type="hidden" name="mailTitle" value="">
		<input type="hidden" name="mailTo" value="">
		<input type="hidden" name="intg_bl_seq" value="">
		<input type="hidden" name="rlt_intg_bl_seq" value="">
		<input type="hidden" name="s_intg_bl_seq" value="">
		<input type="hidden" name="master_bl_no" value=""> 
		<input type="hidden" name="house_bl_no" value=""> 
		
		<!--  Document List ==> Common Memo 연동 파라미터 (S) -->
	    <input type="hidden" name="palt_mnu_cd" id="palt_mnu_cd" />
	    <input type="hidden" name="opr_no" id="opr_no" />
		<!--  Document List ==> Common Memo 연동 파라미터 (E) -->
		
		<!--  Report ==> OutLook연동 파라미터 (S) -->
		<input type="hidden" name="rpt_biz_tp"/>
		<input type="hidden" name="rpt_biz_sub_tp"/>
		<!--  Report ==> OutLook연동 파라미터 (E) -->
		
		<!--  select 조건 추가 combo로 적용 -->
		<input type="hidden" name="f_cntr_no"/>
		<input type="hidden" name="f_po_no"/>
		<input type="hidden" name="f_lc_no"/>
		<input type="hidden" name="f_inv_no"/>
		<input type="hidden" name="f_lnr_bkg_no"/>
		
		<input type="hidden" name="f_pol_cd"/>
		<input type="hidden" name="f_pol_nm"/>
		<input type="hidden" name="f_por_cd"/>
		<input type="hidden" name="f_por_nm"/>
		<input type="hidden" name="f_pod_cd"/>
		<input type="hidden" name="f_pod_nm"/>
		<input type="hidden" name="f_del_cd"/>
		<input type="hidden" name="f_del_nm"/>
	
		<!-- GridSetting Value -->
		<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
		<input type="hidden" name="pageurl" id="pageurl" value="SEE_BMD_0060.clt"/>
		
		<!-- 개인정보 관리화면 정렬순서 2016.03  -->
		<input type="hidden" name="f_orderByInfo"  value="" />
		
		<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP">
					<%-- <!-- 
					--><button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')" name="btnSearch"><bean:message key="Search"/></button><!-- 
					--><button type="button" class="btn_normal" style="cursor:hand;" onClick="clearAll();"><bean:message key="Clear"/></button><!--
					--><button style="cursor:hand; display:none;" type="button" class="btn_normal" btnAuth="<%= roleBtnVO.getAttr2() %>" onClick="doWork('NEW')"><bean:message key="New"/></button><!--
					--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button> --%>
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
<div class="over_wrap" height="100%">		
		<!-- inquiry_area(S) -->	
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>	
					<colgroup>
			        	<col width="80px">
			        	<col width="100px">
			        	<col width="80px">
			        	<col width="100px">
			        	<col width="80px">
			        	<col width="100px">
			        	<col width="80px">
			        	<col width="100px">
			        	<col width="80px">
			        	<col width="100px">
			        	<col width="80px">
			        	<col width="*">
				   </colgroup>
				        <tbody>
							<tr>
	                            <th><bean:message key="HBL_No"/></th>
	                            <td>
	                                <input type="text" name="f_hbl_no" id="f_hbl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:135px;" onkeydown="entSearch();"/>
	                            </td>
	                            <th><bean:message key="CO_LOAD_BL_NO"/></th>
                                <td>
                                    <input type="text" name="f_bl_no"  id="f_bl_no" maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:144px;" onkeydown="entSearch();"/>
                                </td>
	                            <th><bean:message key="ETD"/></th>
	                            <td><!-- 
								    --><input type="text" name="etd_strdt" id="etd_strdt"  onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form" style="width:77px;"><span class="dash">~</span><!--
								    --><input type="text" name="etd_enddt" id="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form" style="width:77px;"><!--
									--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
								</td>
	                            <th><bean:message key="Partner"/></th>
	                            <td><!-- 
	                                --><input type="text" name="f_prnr_trdp_nm" id="f_prnr_trdp_nm"  maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;" onKeyPress="if(event.keyCode==13){doWork('PRNR_TRDP_POPLIST', frm1.f_prnr_trdp_nm.value);}"/><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('PRNR_TRDP_POPLIST')"></button>
								</td>
	                            <th><bean:message key="Consignee"/></th>
	                            <td><!-- 
	                                --><input type="text" name="f_cnee_trdp_nm" id="f_cnee_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:115px;" onKeyPress="if(event.keyCode==13){doWork('CNEE_TRDP_POPLIST', frm1.f_cnee_trdp_nm.value);}"/><!--
								    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CNEE_TRDP_POPLIST')"></button>
	                            </td>
	                            <th>&nbsp;</th>
	                            <td>&nbsp;</td> 
                            </tr>  
							<tr>
                               <th><bean:message key="Shipper"/></th>
                                <td><!-- 
                                    --><input type="text" name="f_shpr_trdp_nm" id="f_shpr_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;" onKeyPress="if(event.keyCode==13){doWork('SHIP_TRDP_POPLIST', frm1.f_shpr_trdp_nm.value);}"/><!-- 
									--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('SHIP_TRDP_POPLIST')"></button>
								</td>
                                <th><bean:message key="Notify"/></th>
                                <td><!-- 
                                    --><input type="text" name="f_ntfy_trdp_nm" id="f_ntfy_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:115px;" onKeyPress="if(event.keyCode==13){doWork('NTFY_TRDP_POPLIST', frm1.f_ntfy_trdp_nm.value);}"/><!-- 
									--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('NTFY_TRDP_POPLIST')"></button>
								</td> 
                                <th><bean:message key="Office"/></th>
                                <td><bean:define id="oficeList" name="valMap" property="ofcList"/>
                                    <input  type="hidden" name="s_ofc_cd" id="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/> 
                                    <select name="f_ofc_cd" id="f_ofc_cd" style="width:105px">
	                                    <bean:size id="len" name="oficeList" />
	                                    <logic:greaterThan name="len" value="1">
	                                    <option value=''>ALL</option>
	                                    </logic:greaterThan>
	                                   	<logic:iterate id="ofcVO" name="oficeList">
	                                        <%-- <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option> --%>
	                                    <logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                                    <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                                   	</logic:equal>
	                                   	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                                    <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                                   	</logic:notEqual>
	                                    </logic:iterate>
                                    </select>
                                </td>
                                <th><bean:message key="Customer"/></th>
                                <td><!--
                                    --><input type="text" name="f_ahpr_trdp_nm" id="f_ahpr_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;" onKeyPress="if(event.keyCode==13){doWork('ASHIP_TRDP_POPLIST', frm1.f_ahpr_trdp_nm.value);}"/><!--
								    --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('ASHIP_TRDP_POPLIST')"></button>
								</td>
                                <th><bean:message key="Vessel_Name"/></th>
                                <td>
                                    <input type="text" name="f_trnk_vsl_nm" id="f_trnk_vsl_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:144px;" onkeydown="entSearch();"/>
                                </td>
                            </tr>                                                                   
					   </tbody>
				</table>
			</div>	
		</div>
		<!-- inquiry_area(E) -->
		
		<!-- grid_area(S) -->
		<div class="wrap_result">
				<!-- grid_area1(S) -->	
			<div class="opus_design_inquiry">
				<div class="opus_design_grid" id="mainTable">
					<h3 class="title_design"><bean:message key="COLOAD_List"/></h3>
					<div class="opus_design_btn"> 
						<button  onClick="setHblSizeUp(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Plus"/></button>
						<button onClick="setHblSizeDown(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Minus"/></button></td>
					</div>
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div> 
              <table>
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
              </table>
	     	</div>
				 
				 
		   </div>
		   <!-- grid_area(E) -->	
	</div>		   
    </form>
    <form name="frm2" method="POST" action="./GateServlet.gsl">
	    <input id="goWhere" name="goWhere" value="fd" type="hidden" />
	    <input id="bcKey" name="bcKey" value="blFileDown" type="hidden" />
	    <input id="s_palt_doc_seq" name="s_palt_doc_seq" value="" type="hidden" />
	    <input id="intg_bl_seq" name="intg_bl_seq" value="" type="hidden" />
	    <input id="docType" name="docType" value="" type="hidden" />
	</form>
		
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
<%@page import="java.net.URLEncoder"%>