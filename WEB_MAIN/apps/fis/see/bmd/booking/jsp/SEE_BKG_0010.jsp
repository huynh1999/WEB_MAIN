<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BKG_0010.jsp
*@FileTitle  : Consolidation Entry 
*@author     : CLT
*@version    : 1.0
*@since      : 2017/03/20
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/booking/script/SEE_BKG_0010.js?ver=<%=CLT_JS_VER%>"></script>
				
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript">
	
	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var edob_flg = "<%= userInfo.getEdob_flg() %>";		
	
	function setSelect(){
		var formObj = document.frm1;
	}
	
	function setupPage(){
		loadPage();
		setButton();
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

	<form name="frm1" method="POST" action="./SEE_BKG_0010.clt">
		<input type="hidden" name="f_cmd">
	    <input type="hidden" name="f_CurPage"> 
	    
		<!-- 세션 유저 정보  -->
		<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
		<input	type="hidden" name="f_phn" value="<%= phn %>"/>
		<input	type="hidden" name="f_fax" value="<%= fax %>"/>
		<input	type="hidden" name="f_email" value="<%= email %>"/>
		<input	type="hidden" name="u_ofc_cd" value="<%= ofc_cd %>"/>
		<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
		    					
		<!-- GridSetting Value -->
		<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
		<input type="hidden" name="pageurl" id="pageurl" value="SEE_BKG_0010.clt"/>
		
		<!-- 개인정보 관리화면 정렬순서 2016.03  -->
		<input type="hidden" name="f_orderByInfo"  value="" />
		
		<input type="hidden" name="lnr_bkg_no"  />
		<input type="hidden" name="f_sls_ofc_cd"  />
		<input type="hidden" name="f_sls_usrid"  />
		
		<input type="hidden" name="p_plan_no" value='<bean:write name="valMap" property="plan_no"/>' />
		<input type="hidden" name="p_bkg_seq" value='<bean:write name="valMap" property="bkg_seq"/>' />
		<input type="hidden" name="p_bkg_no" value='<bean:write name="valMap" property="bkg_no"/>' />
		
		<!-- #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직 -->
		<input type="hidden" name="f_bkg_new_hbl_no_flg" />
		
		<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP" >
				<%--
					<button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" name="btnSearch" id="btnSearch" onclick="document.frm1.f_CurPage.value='';doWork('SEARCH')"><bean:message key="Search"/></button><!-- 
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
			        	<col width="130">
			        	<col width="120">
			        	<col width="860">
			        	<col width="130">
			        	<col width="*">		
				   </colgroup>
				        <tbody>  
						<tr>
	                    	<th><bean:message key="Plan_No"/></th>
	                        <td><!-- 
	                        --><input type="text" name="plan_no" id="plan_no" value="" maxlength="50" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:100px;"/><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CONSOL_POPLIST')"></button>
							</td>	      
							<td></td>                      
		                    <th><bean:message key="Status"/></th>
		                    <td>
		                    	<select name="f_status_cd" style="width:100px;" class="search_form" disabled="true">
									<option value=""></option>
									<bean:define id="consolStsCdList"  name="valMap" property="consolStsCdList"/>
									<logic:iterate id="codeVO" name="consolStsCdList">
										<option value="<bean:write name="codeVO" property="cd_val"/>"><bean:write name="codeVO" property="cd_nm"/></option>
									</logic:iterate>
								</select>
							</td> 
	                    </tr>  		
                    </tbody>
				</table>
			</div>	
		</div>
		<!-- inquiry_area(E) -->
		
		<!-- result_area(S) -->	
		<div class="wrap_result">
			<div class="layout_wrap">
				<div style="float: left;" class="opus_design_inquiry">
					<table>
						<colgroup>
				        	<col width="130">
				        	<col width="100">
				        	<col width="130">
				        	<col width="120">
				        	<col width="130">
				        	<col width="100">
				        	<col width="130">
				        	<col width="*">	
					   	</colgroup>
                      	<tr>
                          <th><bean:message key="Plan_No"/></th>
                          <td>
                          	<input type="text" name="f_plan_no" id="f_plan_no" value="" maxlength="50" class="search_form-disable" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:100px;" disabled="disabled"/>
                          </td>
                          <th><bean:message key="System_Bkg_No"/></th>
                          <td>                          	
                          <!-- #2735 Acrowell incident---unknown reason "system error" popup -->
                          	<input required type="text" name="f_lnr_bkg_no" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:100px;text-transform:uppercase;" readonly onchange="if(frm1.f_lnr_bkg_no.value !=''){doWork('SEARCH01');}" maxlength="100"><!-- 
                          	--><button id="btn_lnr_bkg_no" type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('LNRBKNO_POPLIST')"></button> 
                            <input type="hidden" name="f_bkg_no" value="">
                            <input type="hidden" name="f_bkg_seq"  value="">
                          </td>
                          <th><a href="javascript:GOTOMBL(frm1.f_filling_no.value, '', 'S', 'O');" style="color:#0000FF"><bean:message key="Filling_No"/></a></th>
                          <td>
                          	<input type="text" name="f_filling_no" id="f_filling_no" maxlength="50" class="search_form-disable" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:100px;" disabled="disabled"/>
                          </td>
                          <th><bean:message key="MBL_No"/></th>
                          <td>
                          	<input type="text" name="f_mbl_no" id="f_mbl_no" maxlength="50" class="search_form-disable" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:100px;" disabled="disabled" />
                          </td>
                          <!-- <th><bean:message key="VSL_VOY"/></th>
                          <td><input type="hidden" name="f_trnk_vsl_cd" class="search_form-disable" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;">                                    
                              <input type="text"   name="f_trnk_vsl_nm" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:110px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}" disabled="disabled"> 
                              <input type="text"   name="f_trnk_voy"    class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:65px;text-transform:uppercase;" maxlength="15" onblur="strToUpper(this)" disabled="disabled">
                          </td> -->
                      </tr>
                  </table>				
			</div>
		</div>
		
		<div class="opus_design_inquiry" style="width: 1370px">
		    <div class="layout_vertical_2" style="width: 630px; height: 700px">
		    	<h3 class="title_design mar_btm_8"><bean:message key="Customer_Booking_List"/></h3>
		    	<table>
		    		<colgroup>
			        	<col width="130">
			        	<col width="430">
			        	<col width="*">	
				   	</colgroup>
		    		<tr>
                    	<th><bean:message key="POL"/> / <bean:message key="ETD"/></th>
                       	<td>
                          	<input type="text" name="f_pol_cd" maxlength="5" class="search_form-disable" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pol_oeh',this, 'onBlur','S');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" disabled="disabled"><!--
							--><input type="text" name="f_pol_nm" maxlength="50" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:145px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.f_pol_nm.value);}" disabled="disabled">| 
							   <input style="width:75px;" type="text" id="f_etd_dt_tm" name="f_etd_dt_tm" onKeyUp="mkDateFormatType(this, event, false, 1);" onBlur="mkDateFormatType(this, event, true, 1);" size='10' maxlength="10" class="search_form"><!-- 
							--><button type="button" id="f_etd_dt_tm_cal" name="f_etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.f_etd_dt_tm);" class="calendar" tabindex="-1"></button><!--
							--><!-- input type="checkbox" id="etd_search_flg" name="etd_search_flg" checked="checked" / -->
					  	</td>
					  	<td></td>
					</tr>
					<tr>
					  	<th><bean:message key="POD"/> / <bean:message key="ETA"/></th>
					  	<td><input type="text" name="f_pod_cd" maxlength="5" class="search_form-disable" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" disabled="disabled"><!--
							--><input type="text" name="f_pod_nm" maxlength="50" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}" disabled="disabled">|
							   <input style="width:75px;" type="text" id="f_eta_dt_tm" name="f_eta_dt_tm" onKeyUp="mkDateFormatType(this, event, false, 1);" onBlur="mkDateFormatType(this, event, true, 1);" size='10' maxlength="10" class="search_form"><!-- 
							--><button type="button" id="f_eta_dt_tm_cal" name="f_eta_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.f_eta_dt_tm);" class="calendar" tabindex="-1"></button><!--
							--><!-- input type="checkbox" id="eta_search_flg" name="eta_search_flg" checked="checked" / -->
					  	</td>
                     	<td>
						</td>
                 	</tr> 
                 	<!-- #2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 검색 조건 추가 -->
                 	<tr>
					  	<th><bean:message key="DEL"/></th>
					  	<td><input type="text" name="f_del_cd" maxlength="5" class="search_form-disable"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" disabled="disabled"><!--
							--><input type="text" name="f_del_nm" maxlength="50" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;" disabled="disabled">
					  	</td>
                     	<td>
						    <button type="button" class="btn_normal" id="btnbkgSearch" onclick="doWork('SEARCHLIST')"><bean:message key="Apply"/></button>
						</td>
                 	</tr>
		    	</table>
			    <div class="opus_design_grid">
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
			
			<div class="layout_vertical_2 pad_left_8" style="width: 740px;">
				<div class="opus_design_inquiry">
					<div class="layout_vertical_3 pad_rgt_8" style="width: 50px;">
						<div class="opus_design_inquiry" style="top: 160px">
							<table>				       		
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE1');">▷</button></td>
						        </tr>
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE2');">◁</button></td>
						        </tr>					        
				        	</table>
						</div>
					</div>
					<div class="layout_vertical_3" style="width: 630px;">
						<h3 class="title_design mar_btm_8"><bean:message key="Container_Load_Plan"/></h3>
						<table>
							<tbody>
								<colgroup>
									<col width="130" />
									<col width="130" />
									<col width="130" />
									<col width="*" />
								</colgroup>
								<tr>
									<th><bean:message key="Container_Summary"/></th>
                          			<td colspan="3">
                          				<input type="text" name="f_cntr_sum" id="f_cntr_sum" maxlength="50" class="search_form-disable" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:230px;" disabled="disabled"/>
                          			</td>
                          		</tr>
                          		<tr height="32px">
			   						<th><bean:message key="Container"></bean:message>&nbsp;01&nbsp;<bean:message key="TP/SZ"></bean:message></th>
			   						<td>   							
			   							<select name="i_cntr_01" id="i_cntr_01" style="width:100px;" onChange="getCntr01Info(this);">
			                           	</select>
			                           	<input type="hidden" name="org_cntr_01" id="org_cntr_01">
			                        </td>
			   						<th><bean:message key="Container_No"></bean:message>/<bean:message key="REF_No"></bean:message></th>
			   						<td>
			   							<input id="cntr_no_01" name="cntr_no_01" value="" style="width:100px;" class="search_form-disable" disabled="disabled" type="text" />|
			   							<input id="cntr_ref_no_01" name="cntr_ref_no_01" value="" style="width:100px;" class="search_form-disable" disabled="disabled" type="text" />
			   						</td>
			              		</tr>
							</tbody>
						</table>
						<div class="opus_design_grid">
							<script type="text/javascript">comSheetObject('sheet2');</script>
						</div>
					</div>
					<div class="layout_vertical_3 pad_left_8" style="width: 43px;">
						<div class="opus_design_inquiry" style="top: 160px">
							<table>				       		
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE7');">△</button></td>
						        </tr>
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE8');">▽</button></td>
						        </tr>					        
				        	</table>
						</div>
					</div>
				</div>
			</div>
			
			<div class="layout_vertical_2 pad_left_8" style="width: 740px;">	
				<div class="opus_design_inquiry">
					<div class="layout_vertical_3 pad_rgt_8" style="width: 50px;">
						<div class="opus_design_inquiry"></div>
					</div>
					<div class="layout_vertical_3" style="width: 630px;">
						<table>
							<tbody>
								<colgroup>
									<col width="130" />
									<col width="130" />
									<col width="50" />
									<col width="120" />
									<col width="50" />
									<col width="*" />
								</colgroup>
								<tr>
									<th><bean:message key="Booking"></bean:message> / <bean:message key="Package"></bean:message></th>
									<td>
										<input id="sheet2_total_cnt" name="sheet2_total_cnt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />|
										<input id="sheet2_pkg_cnt" name="sheet2_pkg_cnt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
									</td>
		      						<th><bean:message key="G_WGT"></bean:message></th>
		      						<td>
		      							<input id="sheet2_wgt1_cnt" name="sheet2_wgt1_cnt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
		      							<input id="sheet2_wgt2_cnt" name="sheet2_wgt2_cnt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
		      						</td>
		      						<th><bean:message key="Measure"></bean:message></th>
		      						<td>
		      							<input id="sheet2_mea1_amt" name="sheet2_mea1_amt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
		      							<input id="sheet2_mea2_amt" name="sheet2_mea2_amt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
		      						</td>
		                 		</tr>
		                 		<tr>
		                 			<th><bean:message key="Instruction"></bean:message></th>
		                 			<td colspan="7"><textarea name="f_cntr_instr_txt_01" class="search_form-disable" dataformat="excepthan" style="width:360px;height:60px;" onblur="setInstrTxt(this);"></textarea></td>
		                 		</tr>
							</tbody>
						</table>
					</div>
					<div class="layout_vertical_3 pad_left_8" style="width: 43px;">
						<div class="opus_design_inquiry" style="top: 20px">
							<table>				       		
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE6');">▽</button></td>
						        </tr>
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE5');">△</button></td>
						        </tr>
						        <!-- tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE11');">▼</button></td>
						        </tr-->					        
				        	</table>
						</div>
					</div>
				</div>
			</div>
			<div class="layout_vertical_2 pad_left_8" style="width: 740px;">	
				<div class="opus_design_inquiry"></div>
				<div class="opus_design_inquiry">
					<div class="layout_vertical_3 pad_rgt_8" style="width: 50px;">
						<div class="opus_design_inquiry" style="top: 110px">
							<table >				       		
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE3');">▷</button></td>
						        </tr>
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE4');">◁</button></td>
						        </tr>					        
				        	</table>
						</div>
					</div>
					<div class="layout_vertical_3" style="width: 630px;">
						<table>
							<tbody>
								<colgroup>
									<col width="130" />
									<col width="130" />
									<col width="130" />
									<col width="*" />
								</colgroup>
								<tr>
			   						<th><bean:message key="Container"></bean:message>&nbsp;02&nbsp;<bean:message key="TP/SZ"></bean:message></th>
			   						<td>	   							
			   							<select name="i_cntr_02" id="i_cntr_02" style="width:100px;" onChange="getCntr02Info(this);"> 	   							
			                           	</select>
			                           	<input type="hidden" name="org_cntr_02" id="org_cntr_02">
			                        </td>
			   						<th><bean:message key="Container_No"></bean:message>/<bean:message key="REF_No"></bean:message></th>
			   						<td>
			   							<input id="cntr_no_02" name="cntr_no_02" value="" style="width:100px;" class="search_form-disable" disabled="disabled" type="text" />|
			   							<input id="cntr_ref_no_02" name="cntr_ref_no_02" value="" style="width:100px;" class="search_form-disable" disabled="disabled" type="text" />
			   						</td>
			              		</tr>
							</tbody>
						</table>
						<div class="opus_design_grid">
							<script type="text/javascript">comSheetObject('sheet3');</script>
						</div>
					</div>
					<div class="layout_vertical_3 pad_left_8" style="width: 43px;">
						<!-- div class="opus_design_inquiry">
							<table>	
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE5');">△</button></td>
						        </tr>					        
				        	</table>
						</div-->
						<div class="opus_design_inquiry" style="top: 70px">
							<table >				       		
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE9');">△</button></td>
						        </tr>
						        <tr>
						        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('MOVE10');">▽</button></td>
						        </tr>					        
				        	</table>
						</div>
					</div>
				</div>
			</div>
				
			<div class="layout_vertical_2 pad_left_8" style="width: 740px; height: 93px">	
				<div class="opus_design_inquiry">
					<div class="layout_vertical_3 pad_rgt_8" style="width: 50px;">
						<div class="opus_design_inquiry"></div>
					</div>
					<div class="layout_vertical_3" style="width: 630px;">
						<table>
							<tbody>
								<colgroup>
									<col width="130" />
									<col width="120" />
									<col width="50" />
									<col width="120" />
									<col width="50" />
									<col width="*" />
								</colgroup>
								<tr>
									<th><bean:message key="Booking"></bean:message> / <bean:message key="Package"></bean:message></th>
									<td>
										<input id="sheet3_total_cnt" name="sheet3_total_cnt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />|
										<input id="sheet3_pkg_cnt" name="sheet3_pkg_cnt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
									</td>
		      						<th><bean:message key="G_WGT"></bean:message></th>
		      						<td>
		      							<input id="sheet3_wgt1_cnt" name="sheet3_wgt1_cnt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
		      							<input id="sheet3_wgt2_cnt" name="sheet3_wgt2_cnt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
		      						</td>
		      						<th><bean:message key="Measure"></bean:message></th>
		      						<td>
		      							<input id="sheet3_mea1_amt" name="sheet3_mea1_amt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
		      							<input id="sheet3_mea2_amt" name="sheet3_mea2_amt" value="" style="width:55px;text-align:right" class="search_form-disable" disabled="disabled" type="text" />
		      						</td>
		                 		</tr>
		                 		<tr>
		                 			<th><bean:message key="Instruction"></bean:message></th>
		                 			<td colspan="7"><textarea name="f_cntr_instr_txt_02" class="search_form" dataformat="excepthan" style="width:360px;height:60px;" onblur="setInstrTxt(this);"></textarea></td>
		                 		</tr>
							</tbody>
						</table>
					</div>
					<div class="layout_vertical_3 pad_left_8" style="width: 43px;">
						<div class="opus_design_inquiry"><script type="text/javascript">comSheetObject('sheet4');</script></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- result_area(E) -->	
	
</div>
    </form>
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>			

<%@page import="java.net.URLEncoder"%>


