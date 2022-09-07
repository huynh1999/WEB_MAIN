<%--
=========================================================
*@FileName   : CMM_POP_0010.jsp
*@FileTitle  : CMM
*@Description: trade partner pop
*@author     : 이광훈 - trade partner pop
*@version    : 1.0 - 12/29/2008
*@since      : 12/29/2008

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>
	<% String callTp = "";%>
	<% String iata_cd = "";%>
    <logic:notEmpty name="EventResponse">
        <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	    
		<logic:notEmpty name="cdMap" property="callTp">
			<bean:define id="tmpTp"  name="cdMap" property="callTp"/>
			<% callTp = (String)tmpTp; %>
		</logic:notEmpty>
		
		<logic:notEmpty name="cdMap" property="iata_cd">
			<bean:define id="tmpIata"  name="cdMap" property="iata_cd"/>
			<% iata_cd = (String)tmpIata; %>
		</logic:notEmpty>	
		
		
    </logic:notEmpty>
    

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/mcm/partner/script/CMM_POP_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript">

		var tp_cd = '';
		var tp_nm = '';
		
		<bean:define id="cdMap" name="EventResponse" property="mapVal"/>
	
		<% boolean isBegin = false; %>
	    <!-- GL Code 코드조회-->
		<bean:define id="cdList"  name="cdMap" property="PARAM1"/>
		<logic:iterate id="codeVO" name="cdList">
			<% if(isBegin){ %>
			tp_cd+= '|';
			tp_nm+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   tp_cd+= '<bean:write name="codeVO" property="cd_val"/>';
			   tp_nm+= '<bean:write name="codeVO" property="cd_nm"/>';
	    </logic:iterate>
	    
		var tp_grp_cd = '';
		var tp_grp_nm = '';
	    <!-- TP ZONE 코드조회-->
	    <logic:notEmpty name="cdMap" property="tpZone">
		<bean:define id="cdList"  name="cdMap" property="tpZone"/>
		<logic:iterate id="codeVO" name="cdList">
			<% if(isBegin){ %>
			tp_grp_cd+= '|';
			tp_grp_nm+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   tp_grp_cd+= '<bean:write name="codeVO" property="cd_val"/>';
			   tp_grp_nm+= '<bean:write name="codeVO" property="cd_nm"/>';
	    </logic:iterate>
	    </logic:notEmpty>
	</script>
	
	<script type="text/javascript">
		function setupPage(){
			loadPage();
			form.s_tp_code.focus();
		}
	</script>
	<form name="form" method="POST" action="./CMM_POP_0010.clt" enctype="multipart/form-data">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="comboSel"/>
	<input	type="hidden" name="s_trdp_cd"/>
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="trdp_pop_flg"  id="trdp_pop_flg" value="<%= userInfo.getTrdp_pop_flg() %>"/> <!--    OFVFOUR-7286 [BNX] Button control by role on Trade Partner Search - Modified by ThuongHuynh
 -->
	<input type="hidden" name="pageurl" id="pageurl" value="CMM_POP_0010.clt"/>
	<!-- jsjang 2013.8.6 #18801 trade partner 조회조건 변경  -->
	
	<!-- jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit : Related Partner Form Start -->
	<input type="hidden" name="f_TrdDiv" 	value='<bean:write name="cdMap" property="trdDiv"/>'>
	<input type="hidden" name="t_city_nm" 	value="">
	
	<input type="hidden" name="t_eng_nm" 	value="">
	<input type="hidden" name="t_lgl_addr" 	value="">
	<input type="hidden" name="t_state_cd" 	value="">
	<input type="hidden" name="t_rep_zip" 	value="">
	<input type="hidden" name="t_cnt_nm" 	value="">
	<input type="hidden" name="t_eng_addr" 	value=""><!-- bl address -->
	<bean:define id="sale_flg" value="<%= userInfo.getSale_flg() %>"/>
	<input type="hidden" name="tpSelRow" 	value="">
	<!-- jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit : Related Partner Form End -->
	
	<!-- yjw 2014.10.20 #45003 : [Common] DEFAULT, MAINCMP 거래처 코드가 삭제 안되도록 수정 -->
	<input type="hidden" name="s_default_maincmp_yn" 	value="">
	<input type="hidden" name="s_s3_sls_his_ctnt" />
	<!--#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.13)  -->
	<input type="hidden" name="f_MultiSelect" />
	 <div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Trade_Partner_Search"/></span></h2>
			<div class="opus_design_btn">
			<button type="button" style="display:none" id="btnApply" class="btn_normal" onclick="doWork('APPLY')" ><bean:message key="Apply"/></button><!-- 
			--><button type="button"  class="btn_accent" onclick="form.f_CurPage.value=1;doWork('SEARCHLIST')" ><bean:message key="Search"/></button><!--
			<!--    OFVFOUR-7286 [BNX] Button control by role on Trade Partner Search - Modified by ThuongHuynh
 --
			--><button type="button" id="btn_new" class="btn_normal"   onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
			--><button type="button" id="btn_edit" class="btn_normal"  onclick="doWork('EDIT')"><bean:message key="Edit"/></button><!-- 
			--><button type="button" id="btn_modify" class="btn_normal" onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>							
					<colgroup>
						<col width="60px"></col>
						<col width="55px"></col>
						<col width="90px"></col>
						<col width="130px"></col>
						<col width="90px"></col>
						<col width="130px"></col>
						<col width="80px"></col>
						<col width="45px"></col>
						<col width="80px"></col>
						<col width="60px"></col>
						<col width="80px"></col>				
						<col width="*"></col>
					</colgroup>				
					<tr>
					<!-- #308 [Impex] T/P CODE SEARCH -->
						<th><bean:message key="Code"/></th>
						<td>
							<input type="text" id="s_tp_code" name="s_tp_code" class="search_form" maxlength="100" value="" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:85px" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/>
						</td>
					
						<th><bean:message key="Alias"/>/<bean:message key="Name"/></th>
						<td>
							<input type="text" id="s_eng_name" name="s_eng_name" class="search_form" maxlength="100" value="" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:85px" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/>
						</td>
						<th><bean:message key="TP_Type"/></th>
						<td>
			              <div id="div_sal" style="display:none">
			                 <table>
								<tr>
			                        <td>
			                       	<logic:notEmpty name="cdMap">
						             	<bean:define id="cdList" name="cdMap" property="PARAM1"/>
			                        	<select name="s_trdp_tp_cd01" class="search_form" style="width:120px">
			                                <option value="">ALL</option>
			                        		<!-- <option value="">nonRegistration</option> -->
				                        	<logic:iterate id="codeVO" name="cdList">
				                        	<option value='<bean:write name="codeVO" property="cd_val"/>' <logic:equal name="codeVO" property="cd_val" value="<%= callTp %>">selected</logic:equal>><bean:write name="codeVO" property="cd_nm"/></option>
				                        	</logic:iterate>
			                        	</select>
			                        </logic:notEmpty>
			                        </td>
			                	</tr>
							</table>
						</div>
						<div id="div_etc" style="display:none">
							<table>
								<tr>
			                        <td>
			                       	<logic:notEmpty name="EventResponse">
						             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						             	<bean:define id="cdList" name="cdMap" property="PARAM1"/>
			                        	<select name="s_trdp_tp_cd02" class="search_form" style="width:120px">
											<option value="">ALL</option>
				                        	<logic:iterate id="codeVO" name="cdList">
				                        	<option value='<bean:write name="codeVO" property="cd_val"/>' <logic:equal name="codeVO" property="cd_val" value="<%= callTp %>">selected</logic:equal>><bean:write name="codeVO" property="cd_nm"/></option>
				                        	</logic:iterate>
			                        	</select>
			                        </logic:notEmpty>
			                        </td>
								</tr>
							</table>
						</div>
						</td>
						
						<th><bean:message key="Phone_Cell"/></th>
						<td><input name="s_pic_phn" type="text"  dataformat="excepthan" style="ime-mode:disabled; width:174px;" maxlength="20" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"></td>
						
						<!-- jsjang 2013.8.6 #18801 trade partner 조회조건 변경  -->
						<th><bean:message key="Firm_Code"/></th>
						<td>
	                   		<input type="checkBox" name="s_iata_cd" value="Y"  <% if(!"".equals(iata_cd)){ %>checked<% } %>>
						</td>		
						
						<td> 
			                 <table>
			                 	
			                 	<!-- LSY #51932 [ZEN] Trade partner group 컬럼 추가로 인한 수정 
			                 	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
								<logic:notEmpty name="cdMap" property="tpZone">
								<tr>
			                        <th width="65"><bean:message key="Group"/></th>
			                        <td>
			                       	<logic:notEmpty name="cdMap">
						             	<bean:define id="cdList" name="cdMap" property="tpZone"/>
			                        	<select name="s_tp_grp" class="search_form" width="120px">
			                                <option value="">ALL</option>
				                        	<logic:iterate id="codeVO" name="cdList">
				                        	<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
				                        	</logic:iterate>
			                        	</select>
			                        </logic:notEmpty>
			                        </td>
			                	</tr>
			                	</logic:notEmpty>
			                	 -->
			                	<%--  LSY #51932 [ZEN] Trade partner group 컬럼 추가로 인한 수정 --%>
		                        <tr>
			                        <th width="65"><bean:message key="Group"/></th>
									<td>	                        
										<input type="text" name="s_tp_grp" value='' style="width: 120px; text-transform:uppercase; ime-mode:disabled;" dataformat="excepthan" maxlength="100" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/> 
									</td>
								</tr>
									 
								<logic:empty name="cdMap" property="tpZone">
									<input type="hidden" name="s_tp_grp" value='' /> 
								</logic:empty>	
							</table> 
						</td>											
					</tr>
					<tr>
						<th><bean:message key="City"/></th>
						<td><input type="text" name="s_city_nm" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85px;text-align:left;" onBlur="strToUpper(this);" maxlength="50" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"></td>
						<!-- jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit  Start -->
						<th><bean:message key="IATA_Firm"/></th>	
						<td>
							<input type="text" name="s_iata_nm" class="search_form" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85px" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/>
						</td>																								
						<!-- jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit End  -->
						
						<th><bean:message key="State"/></th>
						<td><input name="s_state_cd" type="text" dataformat="excepthan" style="width:91px;text-align:left;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('state', this, 'onKeyUp')" onBlur="strToUpper(this);codeNameAction('state', this, 'onBlur');"><!-- 
							--><button id="state" type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('STATE_POPLIST')""></button>
							<input name="s_cnt_cd" type="hidden" value="" >
						</td>
						<!-- #5126 [Best Ocean] #4709 Sales PIC field hide system option to be managed by Role Control Option -->
						<logic:equal name="sale_flg" value="Y">
						<th id="sales_person_lb"><bean:message key="Sales_Person"/></th>
						<td id ="sales_person">
							<input type="text" name="s_sls_usrid" dataformat="excepthan" style="width:60px;ime-mode:disabled;" maxlength="12" onKeyDown="codeNameAction('user', this, 'onKeyUp')" onBlur="codeNameAction('user', this, 'onBlur')"><!--
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('USER_POPLIST')"></button><!--
							--><input type="text" name="s_sls_usrnm" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:left">
						</td>
						</logic:equal>
					</tr>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
			<div class="opus_design_inquiry">				
				<table border="0" width="1100">
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
			<h3><bean:message key="Contact_Person_Information"/></h3>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet2');</script>
			</div>
			<h3><bean:message key="Contact_Info"/> <bean:message key="List"/></h3>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet3');</script>
			</div>
			<h3><bean:message key="Customs_Broker"/></h3>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet6');</script>
			</div>
			<h3><bean:message key="Trade_Partner_Name_Address_List"/></h3>	
			<div class="opus_design_grid">	
				<div class="opus_design_btn">
					<button type="button" class="btn_normal" onclick="trdpAddrAdd()" ><bean:message key="Add"/></button><!-- 
					 --><button type="button" class="btn_normal" onclick="trdpAddrModify()" ><bean:message key="Modify"/></button>
				</div>
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet7');</script>
				</div>	
			</div>	
		</div>		
	</div>
	</form>
	<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="paFileDown"/>
    <input type="hidden" name="trdp_cd" value=""/>
    <input type="hidden" name="cntc_seq" value=""/>
	</form>
	<input type="hidden" value="" id="returnFunc" />


