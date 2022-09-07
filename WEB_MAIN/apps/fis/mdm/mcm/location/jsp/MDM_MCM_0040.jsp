<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0040.jsp
*@FileTitle  : Location Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
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
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/location/script/MDM_MCM_0040.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		var PARAM1_1 = '';
		var PARAM1_2 = '';
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
		<% boolean isBegin = false; %>
    	<!--Bound Class Code 코드조회-->
		<bean:define id="param1List"  name="rtnMap" property="locationType"/>
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
    	function setupPage(){
			loadPage();
		}
	</script>

	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 --><!-- 
	 --><input id="f_cmd" name="f_cmd" type="hidden" /><!--
	 --><input id="f_CurPage" name="f_CurPage" type="hidden" /><!--
	 --><input id="f_loc_tp_cd" name="f_loc_tp_cd" type="hidden" /><!--
	 --><input id="save_flg" name="save_flg" value="" type="hidden" />
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
		        	<col width="100">
		        	<col width="110">
		        	<col width="100">
		        	<col width="110">
		        	<col width="70">
		        	<col width="100">
		        	<col width="130">
		        	<col width="70">
		        	<col width="*">
		        </colgroup>
		        <tbody>
		        	<tr>
		        		<th><bean:message key="Location_Name"/></th>
				         <td>
                            	<bean:define id="paramMap" name="EventResponse" property="mapVal"/><!--  
                            	--><input name="s_loc_nm" type="text" maxlength="50" value='<bean:write name="paramMap" property="s_loc_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="fncLocationSearch()">
                         </td>
				        
			            <th><bean:message key="Location_Code"/></th>
			            <td>
                            	<bean:define id="paramMap" name="EventResponse" property="mapVal"/><!-- 
                            	 --><input name="s_loc_cd" type="text" maxlength="5" value='<bean:write name="paramMap" property="s_loc_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="ComKeyOnlyAlphabet('uppernum');fncLocationSearch()">
                        </td>
			             
			            <th><bean:message key="Country_Code"/></th>          
			             <td>
                            	<bean:define id="paramMap" name="EventResponse" property="mapVal"/><!-- 
                            	 --><input name="s_cnt_cd" type="text" maxlength="2" value='<bean:write name="paramMap" property="s_cnt_cd"/>' class="search_form" onKeyPress="ComKeyOnlyAlphabet('uppernum')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:30px;"><!--
                            	--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CURRENCY_POPLIST_1')"></button>
                         </td> 
			             <th><bean:message key="Location_Type"/></th>
			             <td>
                            	<logic:notEmpty name="EventResponse">
				             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
				             	<bean:define id="cdList" name="cdMap" property="locationType"/>
			             		<select name="s_loc_tp_cd" class="search_form">
			             				<option value=''></option>
	             					<logic:iterate id="codeVO" name="cdList">
		             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	             					</logic:iterate>
	             				</select>
		             		</logic:notEmpty>
                         </td>
                        <th><bean:message key="Use_YN"/></th>
			            <td><!-- 
                            	 --><input name="s_use_flg" id="s_use_flg1" type="radio" value="Y" checked><label for="s_use_flg1">Yes</label>&nbsp;&nbsp;<!-- 
                            	 --><input name="s_use_flg" id="s_use_flg2" type="radio" value="N"><label for="s_use_flg2">No</label>&nbsp;&nbsp;<!-- 
                            	 --><input name="s_use_flg" id="s_use_flg3" type="radio" value=""><label for="s_use_flg3">All</label>&nbsp;&nbsp;
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
	    <div class="layout_flex_fixed" style="width:620px;float:left!important">
	    	<h3 class="title_design"><bean:message key="Location_List"/></h3>
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid">
	            <script type="text/javascript">comSheetObject('sheet1');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
			
			
			<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <td width="60px">
                      	<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
                      	<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
                      	<paging:options name="pagingVal" defaultval="200"/>
                      </td>
                      <td align="center">
                          <table  border="0" width="100%">
                              <tr><td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
                              </tr>
                          </table>
                      </td>
                      <td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
                  </tr>
               </table>
        </div>
			
			
	    </div>
	    
	    <div style="padding-left: 628px;">
	       <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry sm">
		<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
		 <table >
		 	<colgroup>
		        	<col width="140">
		        	<col width="60">
		        	<col width="120">
		        	<col width="*">
		    </colgroup>
		    <tbody>
	            <tr>
	                <th><bean:message key="Location_Code"/></th>
                    <td>
                    	<input Required name="i_loc_cd" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" maxlength="5" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="javascript:this.value=this.value.toUpperCase();">
                    </td>
                    <th><bean:message key="User_Defined_IATA"/></th>
                    <td>
                    	<select name="i_loc_clss_cd" class="search_form" OnChange="fncUserIata(this.value)">
       						<option value='U'>User Defined</option>
       						<option value='I'>IATA</option>
       					</select>
                    </td>
	            </tr>
	        </tbody>
	      </table>      
	      <table>
	      	<colgroup>
		        	<col width="140" />
		        	<col width="250">
		        	<col width="67">
		        	<col width="*" />
		    </colgroup>
		 	<tbody>
	          <tr>
                     <th><bean:message key="Parent_Location_Code"/></th>
                     <td colspan="3"><!-- 
                     	 --><input name="i_prnt_loc_cd" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" maxlength="5" onKeyDown="codeNameAction('location',this, 'onKeyDown')" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="strToUpper(this);codeNameAction('location',this, 'onBlur')" disabled="true"><!--
                     	 --><button name="img_prnt_loc_cd" type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LOCATION_POPLIST')"></button>
                     </td>
                 </tr>
	             <tr>
                          <th><bean:message key="Country_Code"/></th>
                          <td colspan="3"><!--
                          	--><input name="i_cnt_cd" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" maxlength="2" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="strToUpper(this);codeNameAction('country',this, 'onBlur')"><!--
                          	--><button type="button" name="input_seach_btn" class="input_seach_btn" tabindex="-1" onclick="doWork('CURRENCY_POPLIST_2')"></button><!--
                          	--><input name="i_cnt_nm" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:160px;text-align:left" readOnly>
                          </td>
                 </tr>
               		<tr>
                      <th><bean:message key="State_Code"/></th>
                      <td><input name="i_state_cd" type="text" maxlength="2" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onKeyDown="codeNameAction('state',this, 'onKeyDown')" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onBlur="strToUpper(this);codeNameAction('state',this, 'onBlur')"><!--
                      	--><button type="button" name="input_seach_btn" class="input_seach_btn" tabindex="-1" onclick="doWork('STATE_POPLIST')"></button><!--
                      	--><input name="i_state_nm" maxlength="50" type="text" class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:160px;text-align:left" readOnly>
                      </td>
                      <th>
                      		<div style="display:none"><label for="i_use_flg"><bean:message key="Lane"/></label></div><!-- #3376 [JTC] Japan Trust  Lane 삭제-->
                      </th>
                      <td>
           					<input name="i_svc_lane_nm" type="hidden" maxlength="50" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:243px;" onBlur="javascript:this.value=this.value.toUpperCase();">           
                      </td>
                     </tr>
	                </tbody>
	         </table>
	         <table>
	         
	         <colgroup>
		        	<col width="140">
		        	<col width="250">
		        	<col width="50">
		        	<col width="*">
		    </colgroup>
		    <tbody>
	            <tr>
                        <th><bean:message key="Name" /></th>
                        <td><!-- 
                        	 --><input Required name="i_loc_nm" type="text" maxlength="50" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:243px;" onBlur="javascript:this.value=this.value.toUpperCase();">
                        </td>
                        <th><label for="i_use_flg"><bean:message key="Use_YN"/></label></th>
                        <td><!-- 
                        	 --><input name="i_use_flg" id="i_use_flg" type="checkbox" value="" onClick="useFlgChange();">
                       	</td>
	             </tbody>
	         </table>
	         
			<table>
			
			<colgroup>
		        	<col width="140" />
		        	<col width="*" />
		    </colgroup>
		    <tbody>
				<tr>
                        <th><bean:message key="Description" /><br></th>
                        <td>
                        	<textarea name="i_desc" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="width:500px;height:40px" ></textarea>
                        </td>
                    </tr>
				</tbody>
			</table>
			
			<table>
			
			<colgroup>
		        	<col width="140" />
		        	<col width="*" />
		    </colgroup>
		    <tbody>
				<tr>
                        <th><bean:message key="Address"/><br></th>
                        <td><textarea name="i_addr" class="search_form" dataformat="excepthan" style="width:500px;height:40px;" onBlur="javascript:this.value=this.value.toUpperCase();"></textarea>
                        </td>
                    </tr>
				</tbody>
			</table>

			<table>
				<colgroup>
			        	<col width="140" />
			        	<col width="*" />
			    </colgroup>
			    <tbody>
					<tr>
                        <th><bean:message key="Remark_for_DR"/></th>
                        <td><textarea name="dock_rcpt_rmk" class="search_form" style="width:500px;height:40px;" onBlur="javascript:this.value=this.value.toUpperCase();"></textarea>
                        </td>
                    </tr>
				</tbody>
			</table>
			
			<table>
			<colgroup>
		        	<col width="140">
		        	<col width="80">
		        	<col width="80">
		        	<col width="*">
		    </colgroup>
		    <tbody>
				<tr>
                      <th><bean:message key="ICAO"/></th>
                      <td>
                      	<input name="i_icao_cd_no" maxlength="20" type="text" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;">
                      </td>
                      <th><bean:message key="Time_Diff"/></th>
                      <td nowrap class="table_search_body">
                      	<input name="i_td_qty" type="text" class="search_form" style="width:80px;" maxlength="3" onChange="fncNumberScope()" onkeypress="fncNumberFormat(event.keyCode)">
                      </td>
	             </tr>
	              </tbody>    
	        	</table>    
	         <table>
	        
			<colgroup>
		        	<col width="140">
		        	<col width="80">
		        	<col width="80">
		        	<col width="80">
		        	<col width="110">
		        	<col width="*">
		    </colgroup>  
		    <tbody>
                   <tr>
                 	 <th><bean:message key="Customs_Code"/></th>
                  	 <td><input name="i_ams_loc_val" type="text" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" maxlength="10"></td>
                     <th><bean:message key="EDI_Code_K"/></th>
                     <td><input name="i_stn_no" type="text" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" maxlength="10"></td>
                     <th><bean:message key="UN_Location_Code"/></th>
                     <td><input name="i_un_loc_cd" type="text" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" maxlength="10"></td>
                   </tr>
                   <tr>
                 	 <th><bean:message key="CBSA_Code"/></th>
                  	 <td><input name="i_cbsa_loc_cd" type="text" class="search_form" onkeyPress="onlyNumberCheck();" style="ime-mode:disabled; width:80px;" maxlength="4"></td>
                   </tr>
				</tbody>
			</table>
			<table>
			
			<colgroup>
		        	<col width="140" />
		        	<col width="*" />
		    </colgroup>
		    <tbody>
		   		<tr>
                        <th><bean:message key="Location_Type"/></th>
                        <td>
	                    	<table>
	                    		<tr>
			                    <logic:notEmpty name="EventResponse">
								    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
								    <bean:define id="cdList" name="cdMap" property="locationType"/>
								    	<% int cnt = 0; %>
								    	<logic:iterate id="codeVO" name="cdList">
								    		<% cnt++; %>
					                        <td width="170px;"><input name="i_loc_tp_cd" id="i_loc_tp_cd<%= cnt %>" type="checkbox" onClick="fncLocTpCdClick()" value='<bean:write name="codeVO" property="cd_val"/>'><label for="i_loc_tp_cd<%= cnt %>"><bean:write name="codeVO" property="cd_nm"/></label></td>
											<% if ( ( cnt % 3 ) == 0 ) { %> <td></td></tr><tr> <% } %>
				                        </logic:iterate>
			                    </logic:notEmpty>
			                    </tr>
			                </table>
			            </td>
                  </tr>
				</tbody>
			</table>
			
			<table>
			
			<colgroup>
		        	<col width="125px" />
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
	     <div class="layout_vertical_2">
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid">
	           <script type="text/javascript">comSheetObject('sheet2');</script>
	        </div>
			</div>
	    </div>
	</div>
	<!-- layout_wrap(E) -->
</div>
	</form>
	
	
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>	

