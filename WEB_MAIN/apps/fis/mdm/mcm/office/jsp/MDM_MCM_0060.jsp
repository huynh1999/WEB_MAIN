<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0060.jsp
*@FileTitle  : Node Code
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>    
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/office/script/MDM_MCM_0060.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		var PARAM1_1 = '';
		var PARAM1_2 = '';

		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
    	<!--Bound Class Code 코드조회-->
		<bean:define id="param1List"  name="rtnMap" property="nodeType"/>
		<logic:iterate id="codeVO" name="param1List">
			<% if(isBegin){ %>
				PARAM1_1+= '|';
				PARAM1_2+= '|';
			<% }else{
			  	isBegin = true;
		   	} %>
			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        	PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
    	</logic:iterate>
	</script>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="f_nod_tp_cd" id="f_nod_tp_cd" />
	<input type="hidden" name="i_nod_cd" id="i_nod_cd" />
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			<!-- page_location(S) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" name="btnSearch" id="btnSearch"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnNew" name="btnNew"  onclick="displayClear()"><bean:message key="New"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnSave" name="btnSave"  onclick="doWork('SEARCH')"><bean:message key="Save"/></button> 
			</div>
			<!-- opus_design_btn(E) -->
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
		<div class="opus_design_inquiry">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
		    <table>
		       <colgroup>
		        	<col width="80">
		        	<col width="140">
		        	<col width="120">
		        	<col width="100">
		        	<col width="120">
		        	<col width="100">
		        	<col width="90">
		        	<col width="10">
		        	<col width="40">
		        	<col width="40">
		        	<col width="*">
		        </colgroup>
		        <tbody>
		        	 <tr>
                            <th><bean:message key="Node_Name"/></th>
                            <td>
                            	<bean:define id="paramMap" name="EventResponse" property="mapVal"/><!-- 
                            	 --><input name="s_nod_eng_nm" id="s_nod_eng_nm" type="text" value='<bean:write name="paramMap" property="s_nod_eng_nm"/>' class="search_form" style="width:100px;" onKeyPress="fncNodeSearch()">
                            </td>
                            <th><bean:message key="Location_Code"/></th>
                            <td>
                            	<bean:define id="paramMap" name="EventResponse" property="mapVal"/><!--
                            	 --><input name="s_loc_cd"  id="s_loc_cd" type="text" maxlength="5" value='<bean:write name="paramMap" property="s_loc_cd"/>' class="search_form" dataformat="excepthan" style="width:50px;text-transform:uppercase;ime-mode:disabled;"><!--
                            	 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LOCATION_POPLIST', 'S')"></button>
                            </td>
                            <th><bean:message key="Node_Type"/></th>
                            <td>
                            	<logic:notEmpty name="EventResponse">
					             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
					             	<bean:define id="cdList" name="cdMap" property="nodeType"/>
				             		<select name="s_nod_tp_cd" id="s_nod_tp_cd" class="search_form">
				             				<option value=''>ALL</option>
		             					<logic:iterate id="codeVO" name="cdList">
			             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
		             					</logic:iterate>
		             				</select>
		             			</logic:notEmpty>
                            </td>
                            <th><bean:message key="USE"/></th>
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
	    <div class="layout_vertical_2" style="width:40%;margin-right:20px">
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
	    <div class="layout_vertical_2">
	       <!-- inquiry_area(S) -->	
			<div class="opus_design_inquiry">
				<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
				 <table >
				 	<colgroup>
				        	<col width="120">
				        	<col width="*">
				    </colgroup>
				    <tbody>
			            <tr>
		                    <th><bean:message key="Location_Code"/></th>
		                    <td>
                                <input required name="i_loc_cd" id="i_loc_cd" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" maxlength="5" onKeyDown="codeNameAction('location',this, 'onKeyDown')" onBlur="codeNameAction('location',this, 'onBlur')"><!-- 
                                 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LOCATION_POPLIST', 'I')"></button><!-- 
                                 --><input name="i_loc_nm" id="i_loc_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" readOnly>
                           </td>
		                </tr>
			        </tbody>
			      </table>
			      <table>
			        <colgroup>
				        	<col width="120">
				        	<col width="*">
				    </colgroup>
				    <tbody>
			         	 <tr>
			                    <th><bean:message key="Node_Code"/></th>
	                            <td>
	                            	<input required name="s_nod_cd"  id="s_nod_cd" value="" type="text" class="search_form" dataformat="excepthan" style="text-transform:uppercase;ime-mode:disabled;width:90px;text-align:left" maxlength="10" onBlur="javascript:this.value=this.value.toUpperCase();" >
	                            </td>
		                  </tr>
			          </tbody>
			      </table>
			       <table>
				       	<colgroup>
				        	<col width="120">
				        	<col width="120">
				        	<col width="80">
				        	<col width="*">
				   		 </colgroup>
					    	<tbody>
				             <tr>
			                        <th><bean:message key="Name_Local"/></th>
			                        <td><input required name="i_nod_eng_nm" id="i_nod_eng_nm" type="text" class="search_form" style="width:180px;text-transform:uppercase;" maxlength="100" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
			                        <th><label for="i_use_flg"><bean:message key="Use_YN"/></label></th>
			                        <td><input name="i_use_flg" id="i_use_flg" type="checkbox" value=""></td>
			                   </tr>
				         </tbody>
			     </table>
		         <table>
		         	<colgroup>
			        	<col width="120">
			        	<col width="*">
			    	</colgroup>
			    	<tbody>
		                <tr>
	                        <th><bean:message key="Description"/></th>
                        	<td><textarea name="i_nod_tp_desc"  id="i_nod_tp_desc" class="search_form" style="width:300px;height:40px" maxlength="200"></textarea></td>
	                    </tr>
		            </tbody>
		       </table>
		       <table>
			        <colgroup>
			        	<col width="120">
			        	<col width="*">
			   		 </colgroup>
			    	<tbody>
			             <tr>
	                        <th><bean:message key="Address"/></th>
                            <td><textarea required name="i_nod_addr" id="i_nod_tp_desc"  class="search_form" style="width:300px;height:40px;" maxlength="400" onBlur="javascript:this.value=this.value.toUpperCase();"></textarea></td>
		                 </tr>
		             </tbody>
		      </table>
			  <table>
					<colgroup>
			        	<col width="120">
			        	<col width="*">
			   		 </colgroup>
			   		 <tbody>
					 		<tr>
	                            <th><bean:message key="PIC"/></th>
	                            <td><input type="text" name="i_pic_nm" id="i_pic_nm" class="search_form" style="width:100px;" maxlength="50"></td>
	                        </tr>
                            <tr>
                                <th><bean:message key="PIC"/><bean:message key="Phone_FAX"/></th>
                                <td>
                                    <input type="text" name="i_pic_phn" id="i_pic_phn" class="search_form" dataformat="excepthan" style="width:100px;ime-mode:disabled;" maxlength="50">/ <!-- 
									 --><input type="text" name="i_pic_fax" id="i_pic_fax" class="search_form" dataformat="excepthan" style="width:100px;ime-mode:disabled;" maxlength="50">
                                </td>
                            </tr>
					</tbody>
			  </table>
			  <table>
			  		<colgroup>
			        	<col width="110">
			        	<col width="*">
			   		 </colgroup>	
			   		<tbody>
						<tr>
	                        <th><bean:message key="Node_Type"/></th>
	                        <td>
		                        <logic:notEmpty name="EventResponse">
		   							<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
		  								<bean:define id="cdList" name="cdMap" property="nodeType"/>
		   									<% int cnt = 0; %>
		   								<logic:iterate id="codeVO" name="cdList">
			   								<% cnt++; %>
			                   					<input name="i_nod_tp_cd" id="i_nod_tp_cd<%= cnt %>" style="margin-left:10px;margin-right:50px" type="checkbox" onClick="fncLocTpCdClick()" value='<bean:write name="codeVO" property="cd_val"/>'><span style="width:50px"><label for="i_nod_tp_cd<%= cnt %>"><bean:write name="codeVO" property="cd_nm"/></label></span>
			                   					<span style="width:20px"></span>
											<% if ( ( cnt % 2 ) == 0 ) { %></br><% } %>
		                   				</logic:iterate>
	                   			 </logic:notEmpty>
	                   		<td>
           						
	                     <tr>
	                </tbody>
	          </table>
              
				<table>
					<colgroup>
			        	<col width="110">
			        	<col width="*">
			   		 </colgroup>
			   		<tbody>
						<tr>
							<th><bean:message key="Created"/></th>
							<td><bean:message key="By"/>
								<input name="i_rgst_usrid" id="i_rgst_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly><bean:message key="at"/>
								<input name="i_rgst_tms" id="i_rgst_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly>
							</td>
						</tr>
					</tbody>
				</table>
				<table>
					<colgroup>
			        	<col width="110">
			        	<col width="*">
			   		 </colgroup>
			   		<tbody>
						<tr>
							<th><bean:message key="Modified"/></th>
							<td><bean:message key="By"/>
								<input name="i_modi_usrid" id="i_modi_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly><bean:message key="at"/>
								<input name="i_modi_tms" id="i_modi_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly>
							</td>
						</tr>
					</tbody>
			   </table>
			</div>
			<!-- inquiry_area(E) -->	
			<!-- opus_design_grid(S) -->
	        <div class="opus_design_grid" id="mainTable">
	            <script type="text/javascript">comSheetObject('sheet2');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
		</div>
	</div>
	<!-- layout_wrap(E) -->
</div>
</div>
</form>
