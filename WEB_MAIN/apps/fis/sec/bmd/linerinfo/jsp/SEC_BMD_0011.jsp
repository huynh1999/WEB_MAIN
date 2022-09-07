<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEC_BMD_0011.jsp
*@FileTitle  : MBL Vessel Schedule
*@author     : CLT
*@version    : 1.0
*@since      : 
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sec/bmd/linerinfo/script/SEC_BMD_0011.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!--ajax 사용시 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>	

	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
</head>
	<script>	
	 function setupPage(){
     	loadPage();
     	//doWork('SEARCHLIST');
     }
   </script>

	<form name="form" method="POST" action="./SEC_BMD_0011.clt">
		<!--Command를 담는 공통		 --><!-- 
		 --><input id="f_cmd" name="f_cmd" type="hidden" /><!-- 
		 --><input id="f_CurPage" name="f_CurPage" type="hidden" />
		
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
				<%-- 
			    <button type="button" class="btn_accent" style="cursor:hand; display:none;"  btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST');"  id="btnSearch" name="btnSearch"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('ADD')" id="btnAdd" name="btnAdd"><bean:message key="Save"/></button>
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
			        	<col width="40">
			        	<col width="220">
			        	<col width="60">
			        	<col width="240">
			        	<col width="60">
			        	<col width="240">
			        	<col width="60">
			        	<col width="150">
			        	<col width="55">
			        	<col width="*">
			   </colgroup>
			        <tbody>
						<tr>
							<th><bean:message key="VSL_VOY"/></th>						
	                        <td > 
	                            	<input type="hidden" name="f_vsl_cd" maxlength="50"  class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('srVessel',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;">
	                                <input required type="text" name="f_vsl_nm"    onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" maxlength="50"  onKeyPress="if(event.keyCode==13){cmmOpenPopUp('VESSEL_POPLIST', document.getElementById('f_vsl'), form.f_vsl_nm.value);}">
	                                <button type="button" class="input_seach_btn" name="f_vsl" id="f_vsl" tabindex="-1" onClick="cmmOpenPopUp('VESSEL_POPLIST',this);"></button>
	                                <input required type="text" name="f_voy"     onblur="strToUpper(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:65px;text-transform:uppercase;" maxlength="15">
	                                 
							</td>
							<th><bean:message key="POL"/></th>
							<td>
							 <input   required type="text" name="f_pol_cd" maxlength="5"   class="search_form" onKeyDown="codeNameAction('Location_fpol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_fpol',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;"><!-- 
							--><button type="button" name="por" id="por" class="input_seach_btn" tabindex="-1" onClick="cmmOpenPopUp('LOCATION_POPLIST',this);"></button><!-- 
							--><input  required  type="text" name="f_pol_nm" maxlength="50" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){cmmOpenPopUp('LOCATION_POPLIST', document.getElementById('por'),form.f_pol_nm.value);}">
							</td>
							<th><bean:message key="ETD"/></th>
							<td><!--
							--><input type="text" name="f_etd_strdt" id="f_etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.f_etd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
							-->~ <!--
							--><input type="text" name="f_etd_enddt" id="f_etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.f_etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal" onclick="doDisplay('DATE11', form);"></button>
							</td>
							<th><bean:message key="Ref_No"/></th>
							<td>
				               	<input type="text" id="f_ref_no" name="f_ref_no" maxlength="20"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" />
				            </td>
			                <th><bean:message key="Office"/></th>
							<td>
								<div id="div_subcode">
			            		<logic:notEmpty name="EventResponse">
					             	<bean:define id="ofcMap"  name="EventResponse" property="mapVal"/>
					             	<bean:define id="oficeList" name="ofcMap" property="ofcList"/>
					             	<bean:define id="ofc_cd" name="ofcMap" property="ofc_cd"/><!-- 
					             	 --><input	type="hidden" name="f_ofc_cd" value='<bean:write name="ofcMap" property="ofc_cd"/>'/><!--
					             	 --><select  name="ofc_cd">
			                           <bean:size id="len" name="oficeList" />
			                           <logic:greaterThan name="len" value="1">
			                           		<option value=''>ALL</option>
			                           </logic:greaterThan>
			             			   <logic:iterate id="ofcVO" name="oficeList">
				             		   		<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:equal>
				                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:notEqual>
			             				</logic:iterate>
			             			</select>
			             		</logic:notEmpty>
				            	</div>
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
	    			<col width="40">
		        	<col width="220">
		        	<col width="60">
		        	<col width="240">
		        	<col width="60">
		        	<col width="240">
		        	<col width="60">
		        	<col width="150">
		        	<col width="55">
		        	<col width="*">
	    		</colgroup>
	    		<tbody>
					<tr>
						<th><bean:message key="VSL_VOY"/></th>
                            <td>
                                <input type="hidden" name="i_vsl_cd"  class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="codeNameAction('srVessel',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:40px;"><!-- 
                                --><input type="text" name="i_vsl_nm"    onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){cmmOpenPopUp('VESSEL_POPLIST', document.getElementById('vsl'), form.i_vsl_nm.value);}"><!-- 
                                --><button type="button" name="vsl" id="vsl" class="input_seach_btn" tabindex="-1" onClick="cmmOpenPopUp('VESSEL_POPLIST',this);"></button><span class="dash">/</span><!-- 
                                --><input type="text" name="i_voy"         onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-transform:uppercase;" maxlength="15">
                            </td>
							<th><bean:message key="POL"/></th>
							<td>
								<input   type="text" name="i_pol_cd" maxlength="5"   class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;"><!-- 
							--><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="cmmOpenPopUp('LOCATION_POPLIST',this);"></button><!-- 
							--><input   type="text" name="i_pol_nm" maxlength="50" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){cmmOpenPopUp('LOCATION_POPLIST', document.getElementById('pol') , form.i_pol_nm.value);}">
							</td>
								<th><bean:message key="POD"/></th>
							<td>
								<input   type="text" name="i_pod_cd" maxlength="5" class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur','S')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:51px;"><!-- 
							--><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="cmmOpenPopUp('LOCATION_POPLIST',this);"></button><!-- 
							--><input   type="text" name="i_pod_nm" maxlength="50"   class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:103px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){cmmOpenPopUp('LOCATION_POPLIST', document.getElementById('pod'), form.i_pod_nm.value);}">
							</td>
							<th><bean:message key="ETD"/></th>
							<td>
								<input   type="text" name="i_etd_dt_tm" id="i_etd_dt_tm" maxlength="10"  onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='10'><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="etd_dt_tm_cal" id="etd_dt_tm_cal"  onclick="doDisplay('DATE1', form.i_etd_dt_tm);" ></button>
							</td>
							<th><bean:message key="ETA"/></th>
							<td>
								<input   type="text" name="i_eta_dt_tm" id="i_eta_dt_tm" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" size='10'><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="eta_dt_tm_cal" id="eta_dt_tm_cal"  onclick="doDisplay('DATE1', form.i_eta_dt_tm);" ></button>
							</td>
						</tr>
				</tbody>
			</table>
	    </div>		
	</div>
	<!-- inquiry_area(E) -->	
	<!-- opus_design_btn(S) -->	
	<!-- opus_design_btn(E) -->	
	<!-- grid_area(S) -->
	<table class="line_bluedot"><tr><td></td></tr></table>
	<div class="wrap_result">
		<h3 class="title_design"><bean:message key="MBL_List"/></h3>
		<div class="opus_design_inquiry">
			<div class="opus_design_grid">				
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>			 
			<table>
				<tr>
					<td width="100">
						<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
					</td>
					<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
					</td>
				</tr>
			</table>
      	</div>
	</div>
	<!-- grid_area(E) -->	
</div>
	</form>
	<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
	</script>	


