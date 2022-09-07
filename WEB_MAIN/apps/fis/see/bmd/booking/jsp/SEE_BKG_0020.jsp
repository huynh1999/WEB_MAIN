<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BKG_0020.jsp
*@FileTitle  : Consolidation List 
*@author     : CLT
*@version    : 1.0
*@since      : 2017/03/14
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
	<script type="text/javascript" src="./apps/fis/see/bmd/booking/script/SEE_BKG_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<script type="text/javascript">
	
	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var edob_flg = "<%= userInfo.getEdob_flg() %>";		
	
	function setupPage(){
		loadPage(); 
	}
	
	function formValidation(){
		if(!chkSearchCmprPrd(false, frm1.etd_strdt, frm1.etd_enddt)){
			return false;
		}
		if(!chkSearchCmprPrd(false, frm1.eta_strdt, frm1.eta_enddt)){
			return false;
		}
		return true;
	}
	
	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	
	</script>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm	= userInfo.getOfc_eng_nm();
		String usrNm 		= userInfo.getUser_name();
		String phn 			= userInfo.getPhn();
		String fax 			= userInfo.getFax();
		String email 		= userInfo.getEml();
	%>

	<form name="frm1" method="POST" action="./SEE_BKG_0020.clt">
		<input type="hidden" name="f_cmd">
	    <input type="hidden" name="f_CurPage"> 
	    
		<!-- 세션 유저 정보  -->
		<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
		<input	type="hidden" name="f_phn" value="<%= phn %>"/>
		<input	type="hidden" name="f_fax" value="<%= fax %>"/>
		<input	type="hidden" name="f_email" value="<%= email %>"/>
		<input	type="hidden" name="u_ofc_cd" value="<%= ofc_cd %>"/>
		<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	
	    <!-- Combo Value -->
		<input type="hidden" name="f_carrier_bkg_no" />
		<input type="hidden" name="f_customer_bkg_no" />
		<input type="hidden" name="f_filling_no" />
		<input type="hidden" name="f_master_bl_no" />
		<input type="hidden" name="f_container_no" />
		<input type="hidden" name="f_ref_no" />
					
		<!-- GridSetting Value -->
		<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
		<input type="hidden" name="pageurl" id="pageurl" value="SEE_BKG_0020.clt"/>
		
		<!-- 개인정보 관리화면 정렬순서 2016.03  -->
		<input type="hidden" name="f_orderByInfo"  value="" />
		
		<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP" >
				<%--
					<button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" name="btnSearch" id="btnSearch" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" name="btnNew" id="btnNew" onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
				--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" onClick="clearAll();"><bean:message key="Clear"/></button><!-- 				 
				--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 				
			    --><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btnDelete" id="btnDelete" onClick="doWork('DELETE');"><bean:message key="Delete"/></button>
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
			        	<col width="80px">
			        	<col width="100px">
			        	<col width="80px">
			        	<col width="100px">
			        	<col width="140px">
			        	<col width="100px">			        	
			        	<col width="80px">
			        	<col width="*">
				   </colgroup>
				        <tbody>
							<tr>
	                            <th><bean:message key="Plan_No"/></th>
                                <td><!-- 
                                    --><input type="text" name="f_plan_no" id="f_plan_no" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;"/><!-- 
									--><button type="button" class="input_seach_btn" tabindex="-1" onclick="srOpenPopUp('CONSOL_POPLIST',this)"></button>
								</td>
	                            <th><bean:message key="POL"/></th>
                                <td>
                                    <input type="text" name="pol_cd" maxlength="5" class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pol_oeh',this, 'onBlur','S');cobChange();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this);"></button><!--
								--><input type="text" name="pol_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:145px;text-transform:uppercase;" onblur="strToUpper(this);cobChange();" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.f_pol_nm.value);}" onchange="cobChange();">
                                </td>
	                            <th><bean:message key="ETD"/></th>
	                            <td><!-- 
								    --><input style="width:75px;" type="text" id="etd_strdt" name="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!--
									--><input style="width:75px;" type="text" id="etd_enddt" name="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
									--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
								</td>	                            
	                            <th>&nbsp;</th>
	                            <td>&nbsp;</td> 
                            </tr>  
							<tr>
                               	<th>
                               		<select name="f_biz_clss_cd" onChange="searchValueClear(this);" style="width: 100px; font-weight: bold;"> 
							        <option value='M'><bean:message key="Carrier_Booking"/></option>
									<option value='H'><bean:message key="Customer_Booking"/></option>
							    	</select> 
							    </th>
                                <td><!-- 
                                    --><input type="text" name="f_bkg_nm" id="f_bkg_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;" /><!-- 
									-->
								</td>
                                <th><bean:message key="POD"/></th>
                                <td>
                                	<input type="text" name="pod_cd" maxlength="5" class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
								--><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!--
								--><input type="text" name="pod_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;" onchange="cobChange();" onblur="strToUpper(this);cobChange();" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}">
								</td> 
                                <th><bean:message key="ETA"/></th>
	                            <td><!-- 
		                            --><input style="width:75px;" type="text" id="eta_strdt" name="eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.eta_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!--
								    --><input style="width:75px;" type="text" name="eta_enddt" id="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.eta_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
								    --><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE12', frm1);"></button>
								</td>                                
                            </tr>  
                            <tr>
                               	<th>
                               		<select name="f_bl_no" onChange="searchValueClear(this);" style="width: 100px; font-weight: bold;"> 
							        <option value='REF_No'><bean:message key="Ref_No"/></option>
									<option value='MBL_No'><bean:message key="MBL_No"/></option>
							    	</select> 
							    </th>
                                <td><!-- 
                                    --><input type="text" name="f_bl_nm" id="f_bl_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:105px;" /><!-- 
									-->
								</td>
                                <th><bean:message key="VSL_VOY"/></th>
                                <td>
                                	<input type="hidden" name="trnk_vsl_cd" class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;">                                    
                                    <input type="text"   name="trnk_vsl_nm" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}" onChange="cobChange();"><!-- 
                                    --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('VESSEL_POPLIST',this)"></button><!-- BLUE PRINT #521 [BNX JAPAN] OEM, Clean_on_board 수정 - cobChange() 추가--><!-- 
                                    --><input type="text"   name="trnk_voy"    class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:65px;text-transform:uppercase;" maxlength="15" onblur="strToUpper(this)" onChange="cobChange();">
								</td> 
                                <th>
                               		<select name="f_cntr_no" onChange="searchValueClear(this);" style="width: 100px; font-weight: bold;"> 
							        <option value='CNTR_No'><bean:message key="Container_No"/></option>
									<option value='REF_No'><bean:message key="REF_No"/></option>
							    	</select> 
							    </th>
                                <td><!-- 
                                    --><input type="text" name="f_cntr_nm" id="f_cntr_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:165px;" /><!-- 
									-->
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
				<h3 class="title_design mar_btm_8"><bean:message key="Consolidation_List"/></h3>	
				<div class="opus_design_grid" id="mainTable">
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
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>			

<%@page import="java.net.URLEncoder"%>

