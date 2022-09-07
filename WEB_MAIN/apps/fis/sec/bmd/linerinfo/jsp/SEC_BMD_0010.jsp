<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEC_BMD_0010.jsp
*@FileTitle  : Liner Schedule
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/09
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
	<script language="javascript" src="./apps/fis/sec/bmd/linerinfo/script/SEC_BMD_0010.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!--ajax 사용시 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>	

	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
</head>
	<script>	
	 function setupPage(){
     	loadPage();
     	doWork('SEARCHLIST');
     }
   </script>

	<form name="form" method="POST" action="./SEC_BMD_0010.clt">
		<!--Command를 담는 공통		 --><!-- 
		 --><input id="f_cmd" name="f_cmd" type="hidden" /><!-- 
		 --><input id="f_CurPage" name="f_CurPage" type="hidden" />
		
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><bean:message key="Shipping_Schedule"/></button></h2>
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
		        	<col width="240">
		        	<col width="60">
		        	<col width="350">
		        	<col width="55">
		        	<col width="*">
		   </colgroup>
		        <tbody>
					<tr>
						<th><bean:message key="ETD"/></th>
						<td><!--
						--><input type="text" name="etd_strdt" id="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.etd_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
						-->~ <!--
						--><input type="text" name="etd_enddt" id="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
						--><button type="button" class="calendar" tabindex="-1" name="etd_dt_cal" id="etd_dt_cal" onclick="doDisplay('DATE11', form);"></button>
						</td>
						<th><bean:message key="Liner"/></th>
						<td><!-- 
							 --><input type="text"   name="s_liner_code" class="search_form" maxlength="20" value="" onKeyDown="codeNameAction('partner_text',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_text',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;"><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LINER_POPLIST')" ></button><!-- 
		                    --><input type="text"   name="s_liner_name" class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150;" readonly><!-- 
		                     --><input type="hidden" name="s_liner_abbr" class="search_form-disable" style="width:50;"  readonly>
						</td>
		                <th><bean:message key="Office"/></th>
						<td>
							<div id="div_subcode">
		            		<logic:notEmpty name="EventResponse">
				             	<bean:define id="ofcMap"  name="EventResponse" property="mapVal"/>
				             	<bean:define id="oficeList" name="ofcMap" property="ofcList"/>
				             	<bean:define id="ofc_cd" name="ofcMap" property="ofc_cd"/><!-- 
				             	 --><input	type="hidden" name="s_ofc_cd" value='<bean:write name="ofcMap" property="ofc_cd"/>'/><!--
				             	 --><select required name="ofc_cd">
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
			<tr>
				<th><bean:message key="ETA"/></th>
				<td><!--
				--><input type="text" name="eta_strdt" id="eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.eta_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
				-->~ <!--
				--><input type="text" name="eta_enddt" id="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.eta_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!--
				--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE12', form);"></button>
				</td>
				<th><bean:message key="Port"/></th>
				<td><!--
					  --><input type="text" name="s_port_code" maxlength="5" class="search_form" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50" onKeyDown="codeNameAction('location_text',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('location_text',this, 'onBlur')"><!--
                      --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('Port_POPLIST')" ></button><!--
                      --><input name="s_port_name" type="text" class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150;" readonly>
				</td>
			</tr>
		</table>
	</div>	
	</div>
	<!-- inquiry_area(E) -->
	
	<!-- opus_design_btn(S) -->
	
			<!-- opus_design_btn(E) -->
	
	<!-- grid_area(S) -->
	<div class="wrap_result">
		<div class="opus_design_inquiry">
			<div class="opus_design_grid">
				<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent"  onclick="doWork('EXCEL')" name="btn_DownExcel">Excel</button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('LOADEXCEL')">Upload</button><!--
				--><button type="button" class="btn_normal"  onclick="doWork('ROWADD')">Add</button>
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


