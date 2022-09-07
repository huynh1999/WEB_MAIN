<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0310.jsp
*@FileTitle  : State Code
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/location/script/MDM_MCM_0310.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<script type="text/javascript">
			function setupPage(){
				loadPage();
			}
		var PARAM1_1 = '';
		var PARAM1_2 = '';
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
		<% boolean isBegin = false; %>
		<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
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
	
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input id="f_cmd" name="f_cmd" type="hidden" /><!-- 
--><input id="f_CurPage" name="f_CurPage" type="hidden" />
    <!-- 소타이틀, 대버튼 -->
    
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
		        	<col width="80px" />
		        	<col width="100px" />
		        	<col width="80px" />
		        	<col width="100px" />
		        	<col width="80px" />
		        	<col width="100px" />
		        	<col width="80px" />
		        	<col width="*" />
		        </colgroup>
		        <tbody>
		        	<tr>
		        		<th><bean:message key="Country_Name"/></th>
				        <td><!--
				        	--><input name="s_cnt_nm" type="text" maxlength="50" value='' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
				        </td>
				        
			            <th><bean:message key="State_Code"/></th>
			            <td><!--
			            	--><input name="s_state_cd" type="text" maxlength="5" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="javascript:this.value=this.value.toUpperCase();">
			            </td>
			             
			            <th><bean:message key="State_Name"/></th>          
			             <td><!--
			                 --><input name="s_state_nm" type="text" maxlength="50" value='' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
			             </td>  
			             <th><bean:message key="Use"/></th>
			             <td><!--
			             	 --><input name="s_use_flg" id="s_use_flg1" type="radio" value="Y" checked><label for="s_use_flg1">Yes</lable>&nbsp;&nbsp;<!--
			             	 --><input name="s_use_flg" id="s_use_flg2" type="radio" value="N" ><label for="s_use_flg2">No</lable>&nbsp;&nbsp;<!--
			             	 --><input name="s_use_flg" id="s_use_flg3" type="radio" value=""  ><label for="s_use_flg3">All</lable>&nbsp;&nbsp;
			             </td>
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
	    <div class="layout_vertical_2">
	    	<div class="opus_design_inquiry">
	    	<h3 class="title_design"><bean:message key="State_List"/></h3>
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid">
	            <script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
	        <table>
	        	<tr>
	        		<td>
						<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
	        		</td>
	        		<td>
						<span id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'> </span>
	        		</td>
	        	</tr>
	        </table>
	        </div>
	    </div>
	    
	    <div class="layout_vertical_2 pad_left_8">
	       <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry sm">
		<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
		 <table >
		 	<colgroup>
		        	<col width="90px" />
		        	<col width="*" />
		    </colgroup>
		    <tbody>
	            <tr>
	                <th><bean:message key="State_Code"/></th>
	                <td>
	                	<input Required name="i_state_cd" type="text" maxlength="5" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="javascript:this.value=this.value.toUpperCase();">
	                </td>
	            </tr>
	          <tr>
	              <th><bean:message key="Country_Code"/></th>
	              <td>
	              	<input Required name="i_cnt_cd" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" maxlength="2" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('country',this, 'onBlur')"><!-- 
	              --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('COUNTRY_POPLIST_2')" ></button><!-- 
	              --><input name="i_cnt_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:180px;text-align:left" readOnly>
	              </td>
	          </tr>
	          </tbody>
	      </table>
	      
	       <table>
	       	<colgroup>
		        	<col width="90px" />
		        	<col width="150px" />
		        	<col width="80px" />
		        	<col width="*" />
		    </colgroup>
		    <tbody>
	             <tr>
	                 <th><bean:message key="Name_Local"/></th>
	                 <td><input name="i_state_locl_nm" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" maxlength="100" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
	                 <td><label for="i_use_flg"><bean:message key="Use_YN"/></label></td>
	                 <td><input name="i_use_flg" id="i_use_flg" type="checkbox" value="" onClick="useFlgChange();"></td>
	             </tr>
	             </tbody>
	         </table>
	         
	         <table>
	         	<colgroup>
		        	<col width="90px" />
		        	<col width="*" />
		    </colgroup>
		    <tbody>
	                <tr>
	                    <th><bean:message key="Name_Eng"/></th>
	                    <td><input Required name="i_state_eng_nm" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" maxlength="100" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
	                </tr>
	             <tr>
	                 <th><bean:message key="Description"/><br></th>
	                 <td><textarea name="i_desc" class="search_form" dataformat="excepthan" style="width:300px;height:120px" onBlur="javascript:this.value=this.value.toUpperCase();"></textarea>
	                 </td>
	             </tr>
	             </tbody>
	         </table>
	         
			<table>
			<colgroup>
		        	<col width="75px" />
		        	<col width="*" />
		    </colgroup>
		    <tbody>
				<tr>
					<th><bean:message key="Created_By"/></th>
					<td>
						<input name="i_rgst_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly><bean:message key="at"/><!-- 
						-->&nbsp;<input name="i_rgst_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" readOnly>
					</td>
				</tr>
				<tr>
					<th><bean:message key="Modified_By"/></th>
					<td>
						<input name="i_modi_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly><bean:message key="at"/><!-- 
						-->&nbsp;<input name="i_modi_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" readOnly>
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
</script>


<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>	

