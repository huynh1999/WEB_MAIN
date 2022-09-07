<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0380.jsp
*@FileTitle  : trade partner mapping pop
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>
	<% String callTp = "";%>
    <logic:notEmpty name="EventResponse">
        <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	    
		<logic:notEmpty name="cdMap" property="callTp">
			<bean:define id="tmpTp"  name="cdMap" property="callTp"/>
			<% callTp = (String)tmpTp; %>
		</logic:notEmpty>
    </logic:notEmpty>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/mcm/partner/script/CMM_POP_0380.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
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

		//화면로드시 조회할 Client의 Type를 선택
		function selectCustTp(searchTp){
			if(searchTp!=''){
				/* 팝업을 띄울 때 Client Type에 관계없이 Trade Partner Type의 기본으로 ALL 로 선택되어 있어야 함. 2012.02.17 PJK.
				var optionVal = form.s_trdp_tp_cd02.options;

				//Sal인경우
				if(div_sal.style.display=="block"){
					optionVal = form.s_trdp_tp_cd01.options;
				}
		
				for(var i = 0; i < optionVal.length; i++){
					if(optionVal[i].value==searchTp){
						optionVal[i].selected = true;
						break;
					}
				}
				*/
				doWork('SEARCHLIST');		
			}else{
				doWork('SEARCHLIST');	
			}
		}
	</script>
	<script type="text/javascript" FOR="document" EVENT="onkeyup">
		//PERSONAL_INFOHTML.usr
		//enterKey 처리
		try {
			var srcName=window.event.srcElement.getAttribute("name");
			
			with(document.form){
				switch(srcName){
					case "s_tp_name":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "s_eng_name":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "s_short_name":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					default:
					break;
				}
			}
		}catch(e) {
		}
	</script>
	<script type="text/javascript">
			function setupPage(){
				loadPage();
				selectCustTp('<%=callTp%>');
			}
	</script>
	<form name="form" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="openMean" id="openMean" />
	<input type="hidden" name="comboSel" id="comboSel" />
	<input type="hidden" name="f_mp_val" id="f_mp_val" />
	<input type="hidden" name="f_mp_tp" value="TRDP" id="f_mp_tp" />
	<input type="hidden" name="f_mp_cd" id="f_mp_cd" />
	<input type="hidden" name="f_eng_nm" id="f_eng_nm" />
	<input type="hidden" name="f_edi_tp"/>
	
	<!-- #5083 [CLA] BL EDI Improvement Requests -->
	<input type="hidden" name="f_edi_trdp_nm"/>
	<input type="hidden" name="f_edi_trdp_addr"/>
	<input type="hidden" name="f_edi_trdp_cnt_cd"/>
	
	<div class="layer_popup_title">
		 <div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><bean:message key="Trade_Partner_Mapping"/></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
				   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal"  onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
				--><button type="button" class="btn_normal"  onclick="doWork('EDIT')"><bean:message key="Edit"/></button><!-- 
				--><button type="button" class="btn_normal"  onclick="doWork('MAPPING')"><bean:message key="Mapping"/></button><!-- 
				--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
				</div>
				<!-- opus_design_btn(E) -->
		</div>
	    <!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">		
		<!-- wrap search (S) -->
	 	<div class="wrap_search">
		    <!-- inquiry_area(S) -->	
			<div class="opus_design_inquiry entry_pannel ">
			    <table>
			        <colgroup>
			        	<col width="90">
			        	<col width="*">
			        </colgroup>
			        <tbody>
						<tr>
							<th><bean:message key="Name_On_AMS"/></th>
							<td>
								<input type="text" name="s_name_on_ams" id="s_name_on_ams" class="search_form-disable" value="" style="width:660px"  readOnly />
							</td>
						</tr>
			        </tbody>
		        </table>
		        <table>
			       <colgroup>
			        	<col width="90">
			        	<col width="80">
			        	<col width="110">
			        	<col width="80">
			        	<col width="70">
			        	<col width="100">
			        	<col width="*">
			        </colgroup>
			        <tbody>
						<tr>
							<th><bean:message key="Name_Eng"/></th>
							<td>
								<input type="text" name="s_eng_name" id="s_eng_name" class="search_form" maxlength="100" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85px" onkeypress="if(event.keyCode==13){searchList();}"/>
							</td>
							<th><bean:message key="Name_Local"/></th>
							<td>
								<input type="text" name="s_tp_name" id="s_tp_name" class="search_form" maxlength="100" value="" style="ime-mode:disabled; text-transform:uppercase;width:85px" onkeypress="if(event.keyCode==13){searchList();}"/>
							</td>
							<th><bean:message key="Alias"/></th>
							<td>
								<input type="text" name="s_short_name" id="s_short_name" class="search_form" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px" onkeypress="if(event.keyCode==13){searchList();}"/>
							</td>
							<td>
			                    <div id = "div_sal" style="display:none">
			                        <span><strong><bean:message key="TP_Type"/></strong></span>
			                        <span>
				                       	<logic:notEmpty name="cdMap">
							             	<bean:define id="cdList" name="cdMap" property="PARAM1"/>
				                        	<select name="s_trdp_tp_cd01" style="height:25px" id="s_trdp_tp_cd01" class="search_form">
	                                            <option value="">ALL</option>
				                        		<!-- <option value="">nonRegistration</option> -->
				                        		<logic:iterate id="codeVO" name="cdList">
				                        			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
				                     			</logic:iterate>
				                        	</select>
				                        </logic:notEmpty>
			                        </span>
								</div>
								<div id="div_etc" style="display:none">
									<span><strong><bean:message key="TP_Type"/></strong></span>
			                        <span>
				                       	<logic:notEmpty name="EventResponse">
							             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
							             	<bean:define id="cdList" name="cdMap" property="PARAM1"/>
				                        	<select name="s_trdp_tp_cd02" id="s_trdp_tp_cd02" style="height:25px" class="search_form">
												<option value="">ALL</option>
				                        		<logic:iterate id="codeVO" name="cdList">
				                        			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
				                        		</logic:iterate>
				                        	</select>
				                        </logic:notEmpty>
			                        </span>
								</div>
							</td>
						</tr>
			        </tbody>
		        </table>
			</div>
		     <!-- inquiry_area(S) -->	
		</div>
		<!-- wrap search (E) -->	
		
		<div class="wrap_result">
			<div class="opus_design_grid" id="mainTable">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<!-------------------- Display option Begin -------------------->
								<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
								<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
								<paging:options name="pagingVal" defaultval="200"/>
			<!-------------------- Display option End -------------------->					
			<div id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></div>
			<div  style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
				<input type="checkbox" name="f_add_mapping" id="f_add_mapping" value="" />
				<b><label for="f_add_mapping"><bean:message key="Add_to_History_of_Trade_Partner_Name"/></label></b>
			</div>
		</div>
		<!-- grid_area(E) -->	
	</div>  
</form>


