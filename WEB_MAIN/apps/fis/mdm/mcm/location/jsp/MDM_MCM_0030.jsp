<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0030.jsp
*@FileTitle  : Sub Continent Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/location/script/MDM_MCM_0030.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	
        <!-- 타이틀, 네비게이션 -->
        
     <div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
			 <%-- 
				<button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="searchList()" id="btnSearch" name="btnSearch"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %> onclick="doWork('NEW')" id="btnNew" name="btnNew"><bean:message key="New"/></button> 
				<button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('SAVE')" id="btnSave" name="btnSave"><bean:message key="Save"/></button>
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
	
	<!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
		    <table>
		        <colgroup>
		        	<col width="100">
		        	<col width="110">
		        	<col width="100">
		        	<col width="110">
		        	<col width="120">
		        	<col width="100">
		        	<col width="150">
		        	<col width="100">
		        	<col width="60">
		        	<col width="10">
		        	<col width="40">
		        	<col width="40">
		        	<col width="*">
		        </colgroup>
		        </colgroup>
		        <tbody>
		        	<tr>
                        <th><bean:message key="Country_Code"/></th>
                        <td>
                        	<bean:define id="paramMap" name="EventResponse" property="mapVal"/>
                        	<input name="s_cnt_cd" id="s_cnt_cd" type="text" maxlength="50"  value='<bean:write name="paramMap" property="s_cnt_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
                        </td>
                        <th><bean:message key="Country_Name"/></th>
                        <td>
                        	<bean:define id="paramMap" name="EventResponse" property="mapVal"/>
                        	<input name="s_cnt_locl_nm" id="s_cnt_locl_nm" type="text" maxlength="50"  value='<bean:write name="paramMap" property="s_cnt_locl_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
                        </td>
                        <th><bean:message key="Continent_Code"/></th>
                        <td>
                        	<select name="s_prnt_conti_cd" id="s_prnt_conti_cd" style="width:100px;" OnChange="doSContiAction()" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
                        		<bean:define id="paramContiList"  name="paramMap" property="contiList"/>
									<logic:iterate id="ContiVO" name="paramContiList">
                        			<option value='<bean:write name="ContiVO" property="conti_cd"/>'><bean:write name="ContiVO" property="eng_nm"/></option>
                        		</logic:iterate>
                        	</select>
                        </td>
                        <th><bean:message key="Sub_Continent_Code"/></th>
                        <td>
                        	<select name="s_conti_cd" id="s_conti_cd" style="width:150px;" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
								<option selected="true" value=""></option>
                        	</select>
                        </td>
                        <th><bean:message key="Use_YN"/></th>
                        <td></td>
                        <td><input name="s_use_flg" id="s_use_flg" type="radio" value="Y" <logic:equal name="paramMap" property="s_use_flg" value="Y">checked</logic:equal>><label for="s_use_flg">Yes</label></td>
                      	<td><input name="s_use_flg" id="s_use_flg2" type="radio" value="N" <logic:equal name="paramMap" property="s_use_flg" value="N">checked</logic:equal>><label for="s_use_flg2">No</label></td>
                      	<td><input name="s_use_flg" id="s_use_flg3" type="radio" value=""  <logic:equal name="paramMap" property="s_use_flg" value="">checked</logic:equal>><label for="s_use_flg3">All</label></td>
                    </tr>
		        </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->
	
	<div class="wrap_result">     
	<!-- layout_wrap(S) -->
	<div class="layout_wrap">
	    <div class="layout_vertical_2" style="width:40%;">
	    	<h3 class="title_design"><bean:message key="Country_List"/></h3>
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid" id="mainTable">
	            <script type="text/javascript">comSheetObject('sheet1');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
	        <div>
	        <!-------------------- Display option Begin -------------------->
										<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
										<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
										<paging:options name="pagingVal" defaultval="200"/>
			<!-------------------- Display option End -------------------->					
			<span id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'> </span>
			</div>
			
	    </div>
	    <div class="layout_vertical_2 pad_left_8">
	       <!-- inquiry_area(S) -->	
			<div class="opus_design_inquiry sm">
				<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
				 <table >
				 	<colgroup>
				        	<col width="133">
				        	<col width="*">
				    </colgroup>
				    <tbody>
			            <tr>
		                    <th><bean:message key="Country_Code"/></th>
		                    <td>
		                    	<input Required name="i_cnt_cd" id="i_cnt_cd" type="text" class="search_form" dataformat="excepthan" style="width:50px;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onBlur="javascript:this.value=this.value.toUpperCase();">
		                    </td>
		                </tr>
			        </tbody>
			      </table>
			      
			      <table>
			      <colgroup>
				        	<col width="133">
				        	<col width="*">
				    </colgroup>
				    <tbody>
			         	 <tr>
		                      <th><bean:message key="Continent_Code"/></th>
		                      <td>
		                      	<select Required name="i_prnt_conti_cd" id="i_prnt_conti_cd" style="width:150px;" OnChange="doIContiAction()">
		                      		<bean:define id="paramContiList"  name="paramMap" property="contiList"/>
									<logic:iterate id="ContiVO" name="paramContiList">
		                      			<option value='<bean:write name="ContiVO" property="conti_cd"/>'><bean:write name="ContiVO" property="eng_nm"/></option>
		                      		</logic:iterate>
		                      	</select>
		                      </td>
		                  </tr>
			          </tbody>
			      </table>
			      
			       <table>
				       	<colgroup>
				        	<col width="133">
				        	<col width="*">
				   		 </colgroup>
					    	<tbody>
				             <tr>
			                       <th><bean:message key="Sub_Continent_Code"/></th>
			                       <td>
				                       	<select Required name="i_conti_cd" id="i_conti_cd" style="width:150px;">
				                      		<option value="" selectd="true"></option>
				                      	</select>
			                       </td>
			                   </tr>
				         </tbody>
			     </table>
			         
			         <table>
			         	<colgroup>
				        	<col width="133">
				        	<col width="150">
				        	<col width="70">
				        	<col width="*">
				    	</colgroup>
				    	<tbody>
			                <tr>
		                        <th><bean:message key="Name_Local"/></th>
		                        <td><input Required name="i_cnt_locl_nm" type="text" class="search_form" dataformat="excepthan" style="width:180px;text-transform:uppercase;ime-mode:inactive;" maxlength="100" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
		                        <th><label for="i_use_flg"><bean:message key="Use_YN"/></label></th>
		                        <td><input name="i_use_flg" id="i_use_flg" type="checkbox" value="" onClick="useFlgChange();"></td>
		                    </tr>
			            </tbody>
			       </table>
			         
			       <table>
				        <colgroup>
				        	<col width="133">
				        	<col width="*">
				   		 </colgroup>
				    	<tbody>
				             <tr>
		                        <th><bean:message key="Name_Eng"/></th>
		                        <td><input Required name="i_cnt_eng_nm" id="i_cnt_eng_nm" type="text" class="search_form" dataformat="excepthan" style="width:180px;text-transform:uppercase;ime-mode:disabled;" maxlength="100" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
			                 </tr>
			             </tbody>
			      </table>
			         
				  <table>
						<colgroup>
				        	<col width="133">
				        	<col width="*">
				   		 </colgroup>
				   		 <tbody>
						 	<tr>
		                        <th><bean:message key="Description"/></th>
		                        <td><textarea name="i_desc" class="search_form" style="width:400px;height:70px;"></textarea></td>
		                    </tr>
						</tbody>
				  </table>
				<!-- #3355 [JTC]Dock Receipt 수정 -->
				  <table>
						<colgroup>
				        	<col width="133">
				        	<col width="*">
				   		 </colgroup>
				   		 <tbody>
						 	<tr>
		                        <th><bean:message key="Remark_for_DR"/></th>
		                        <td><textarea name="dock_rcpt_rmk" class="search_form" onblur="urlRemark(this)" style="width:400px;height:70px;text-transform:none;"></textarea></td>
		                    </tr>
						</tbody>
				  </table>
					
				  <table>
						<colgroup>
				        	<col width="133">
				        	<col width="*">
				   		 </colgroup>
				   		<tbody>
							<tr>
		                        <th><bean:message key="Currency"/></th>
		                        <td>
		                        	<input name="i_curr_cd" id="i_curr_cd" type="text" class="search_form" dataformat="excepthan" style="width:50px;ime-mode:disabled;text-transform:uppercase;" maxlength="3" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur')"><!-- 
		                        	 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CURRENCY_POPLIST')"></button>
		                        </td>
			                 </tr>
						</tbody>
					</table>
					<table>
						<colgroup>
				        	<col width="133">
				        	<col width="*">
				   		 </colgroup>
				   		<tbody>
							<tr>
								<th><bean:message key="Created_By"/></th>
								<td>
									<input name="i_rgst_usrid" id="i_rgst_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly><bean:message key="at"/> <!-- 
									 --><input name="i_rgst_tms" id="i_rgst_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" readOnly>
								</td>
							</tr>
						</tbody>
					</table>
					<table>
						<colgroup>
				        	<col width="133">
				        	<col width="*">
				   		 </colgroup>
				   		<tbody>
							<tr>
								<th><bean:message key="Modified_By"/></th>
								<td>
									<input name="i_modi_usrid" id="i_modi_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly><bean:message key="at"/> <!-- 
									 --><input name="i_modi_tms" id="i_modi_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" readOnly>
								</td>
							</tr>
						</tbody>
				   </table>
			</div>
			<!-- inquiry_area(E) -->
		</div>
	</div>
	<!-- layout_wrap(E) -->
</div>
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	document.frm1.s_prnt_conti_cd.value = '<bean:write name="paramMap" property="s_prnt_conti_cd"/>';
	document.frm1.s_conti_cd.value = '<bean:write name="paramMap" property="s_conti_cd"/>';
</script>

