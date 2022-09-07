<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0070.jsp
*@FileTitle  : Trade Partner Management
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<SCRIPT type="text/javascript" SRC="<%=CLT_PATH%>/apps/fis/mdm/mcm/partner/script/MDM_MCM_0070.js?ver=<%=CLT_JS_VER%>" ></script>
	<script type="text/javascript">
	<!--
	function goTabSelect(isNumSep){
    	if(isNumSep == "01" ){
	        document.all.Tab01.className = "tab_head2";
	        document.all.Tab02.className = "tab_head_non2";
	        document.all.Tab03.className = "tab_head_non2";
    	}else if(isNumSep == "02"){
	        document.all.Tab01.className = "tab_head_non2";
	        document.all.Tab02.className = "tab_head2";
	        document.all.Tab03.className = "tab_head_non2";
    	}else if(isNumSep == "03"){
	        document.all.Tab01.className = "tab_head_non2";
	        document.all.Tab02.className = "tab_head_non2";
	        document.all.Tab03.className = "tab_head2";
    	}
		var tabObjs = document.getElementsByName('tabLayer');

	    if(isNumSep=='01'){
			tabObjs[0].style.display = 'inline';
	        tabObjs[1].style.display = 'none';
	        tabObjs[2].style.display = 'none';
	    }else if(isNumSep=='02'){
	        tabObjs[0].style.display = 'none';
	        tabObjs[1].style.display = 'inline';
	        tabObjs[2].style.display = 'none';
		}else{
	        tabObjs[0].style.display = 'none';
	        tabObjs[1].style.display = 'none';
	        tabObjs[2].style.display = 'inline';
    	}
  	}
	-->
</script>
	<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
	<bean:define id="trdpVO" name="tmpMap" property="key"/>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./MDM_MCM_0070.clt">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
    <input type="hidden" name="sv_trdp_tp_cd" value="<bean:write name="trdpVO" ></bean:write>" id="sv_trdp_tp_cd" />
		
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			<!-- page_location(S) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" name="btnSearch" id="btnSearch"   onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnNew" name="btnNew"  onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnAdd" name="btnAdd" onclick="doWork('ADD')"><bean:message key="Save"/></button> 
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
		<div class="opus_design_inquiry entry_pannel ">
			<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
		    <table>
		       <colgroup>
		        	<col width="80">
		        	<col width="*">
		        </colgroup>
		        <tbody>
		        	 <tr>
                        <th><bean:message key="Partner"/>Code</th>
                        <td>
							<input name="s_trdp_cd" id="s_trdp_cd" type="text" value="<bean:write name="trdpVO" property="trdp_cd"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" maxlength="20" onKeyPress="fncTpCodeSearch()"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('LINER_POPLIST')"></button>
                        </td>
                    </tr>
		        </tbody>
	        </table>
	   </div>
	   <!-- inquiry_area(E) -->	
	   <!-- layout_wrap(S) -->
	   <div class="layout_wrap">
		    <!-- layout_vertical_2(S) -->
	     	<div class="layout_vertical_2" style="width: 360px">
			  	<div class="opus_design_inquiry wFit"> 
			        <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	  <tr>
		                        <th><bean:message key="Partner"/>Code</th>
		                        <td>
									<logic:empty name="trdpVO" property="trdp_cd">
				                        <input name="i_trdp_cd" id="i_trdp_cd" type="text" value="" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="20" readonly><!-- 
										 --><input type="checkbox" name="doKeyIn" id="doKeyIn" onclick="doKeyInCheck(this);"><label for="doKeyIn"><bean:message key="Key_In"/></label>
									</logic:empty>
		               			    <logic:notEmpty name="trdpVO" property="trdp_cd">
		                            	 <input name="i_trdp_cd" id="i_trdp_cd" type="text" value="<bean:write name="trdpVO" property="trdp_cd"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;text-align:left" maxlength="20" disabled="true">
		               				</logic:notEmpty>
		                        </td>
		                    </tr>
				        </tbody>
			        </table>
			        
			         <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	   <tr>
		                            <th><bean:message key="Name_Local"/></th>
		                            <td><input name="locl_nm" id="locl_nm" type="text" value="<bean:write name="trdpVO" property="locl_nm"/>" class="search_form" style="width:197px;" maxlength="100"></td>
		                        </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	   <tr>
		                            <th><bean:message key="Name_Eng"/></th>
		                            <td>
		                                <input name="eng_nm" id="eng_nm" type="text" value="<bean:write name="trdpVO" property="eng_nm"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:197px;" maxlength="100">
		                            </td>
		                        </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	   <tr>
		                            <th><bean:message key="Legal_Address"/></th>
		                            <td><textarea name="lgl_addr"  id="lgl_addr" class="search_form" dataformat="excepthan" style="width:197px;height:50px" maxlength="200" ><bean:write name="trdpVO" property="lgl_addr"/></textarea></td>
		                        </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	   <tr>
		                            <th><bean:message key="Address_Eng"/></th>
		                            <td><textarea name="eng_addr" id="eng_addr" class="search_form" cols="35" rows="5" dataformat="excepthan" style="width:197px;height:50px;" maxlength="200" onkeydown="blockKey(this);" onKeyPress="fixRowTextArea(this);return ( this.value.length <= 200 );" onpaste="return fnPaste(this);" onBlur="javascript:this.value=this.value.toUpperCase();"><bean:write name="trdpVO" property="eng_addr"/></textarea></td>
		                        </tr>
				        </tbody>
			        </table>
			        
			         <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	   <tr>
		                            <th><bean:message key="CEO"/></th>
		                            <td><input name="ceo_nm" id="ceo_nm" type="text" value="<bean:write name="trdpVO" property="ceo_nm"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:197px;" maxlength="50"></td>
		                        </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	    <tr>
		                             <th><bean:message key="URL"/></th>
		                             <td><input name="url" id="url" type="text" value="<bean:write name="trdpVO" property="url"/>" class="search_form" style="width:197px;" maxlength="100"></td>
		                         </tr>
				        </tbody>
			        </table>
			        
			         <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	    <tr>
		                              <th><bean:message key="Country"/></th>
		                              <td>
		                             	   <input name="cnt_cd" id="cnt_cd" type="text" value="<bean:write name="trdpVO" property="cnt_cd"/>" class="search_form" dataformat="excepthan" style="width:40px;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="codeNameAction('country',this, 'onBlur')"><!-- 
										    --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('COUNTRY_POPLIST')"></button><!--
		                                    --><input name="cnt_nm" id="cnt_nm" type="text" value='<bean:write name="trdpVO" property="cnt_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:124px;text-align:left" readOnly>
		                              </td>
		                          </tr>
				        </tbody>
			        </table>
			        
			         <table>
				       <colgroup>
				        	<col width="80">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	    <tr>
		                            <th><bean:message key="Currency"/></th>
		                            <td>
		                            	<input name="curr_cd" id="curr_cd" type="text" value="<bean:write name="trdpVO" property="curr_cd"/>" class="search_form" dataformat="excepthan" style="width:40px;text-transform:uppercase;ime-mode:disabled;" maxlength="3" onKeyDown="codeNameAction('currency',this, 'onKeyDown')" onBlur="codeNameAction('currency',this, 'onBlur')"><!--
		                            	--><button type="button" class="input_seach_btn" tabindex="-1"   onclick="doWork('CURRENCY_POPLIST')"></button><!--
		                            	--><input name="curr_nm" id="curr_nm" type="text" value='<bean:write name="trdpVO" property="curr_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:124px;text-align:left" readOnly>
		                            </td>
		                        </tr>
				        </tbody>
			        </table>
			   </div>
		</div>
		<!-- layout_vertical_2(E) -->
		<!-- layout_vertical_2(S) -->
	    <div class="layout_vertical_2">
			 <div class="opus_design_inquiry wFit">      
			        <table>
				       <colgroup>
				        	<col width="100">
				        	<col width="80">
				        	<col width="255">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	    <tr>
		                            <th><bean:message key="Reg_Type"/></th>
		                            <td>
		                                <input type="radio" name="rgst_tp_cd" id="rgst_tp_cd" value="C" <logic:equal name="trdpVO" property="rgst_tp_cd" value="C">checked</logic:equal>><label for="rgst_tp_cd"><bean:message key="Corporation"/></label>&nbsp;&nbsp;
		                                <input type="radio" name="rgst_tp_cd" id="rgst_tp_cd2" value="I" <logic:equal name="trdpVO" property="rgst_tp_cd" value="I">checked</logic:equal>><label for="rgst_tp_cd2"><bean:message key="Individual"/></label>
		                            </td>
		                            <th><bean:message key="Short_Name"/></th>
				                    <td><input name="shrt_nm"  id="shrt_nm" type="text" value="<bean:write name="trdpVO" property="shrt_nm"/>" class="search_form" style="width:75px;text-transform:uppercase;" maxlength="20"></td>
		                        </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="100">
				        	<col width="80">
				        	<col width="320">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	    <tr>
	                                <th><bean:message key="Biz_Reg_No"/></th>
	                                <td><input name="biz_no" id="biz_no" type="text" value="<bean:write name="trdpVO" property="biz_no"/>" class="search_form" style="width:90px;" maxlength="20"></td>    
	                       			<th><bean:message key="Full_Name"/></th>
			                        <td><input name="full_nm" id="full_nm" type="text" value="<bean:write name="trdpVO" property="full_nm"/>" class="search_form" style="width:120px;text-transform:uppercase;" maxlength="50"></td>
		                       	</tr>
				        </tbody>
			        </table>
			        
			        <table>
				      <colgroup>
				        	<col width="100">
				        	<col width="80">
				        	<col width="320">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	     <tr>
		                              <th><bean:message key="Biz_ID"/></th>
		                              <td>
		                              	<logic:notEmpty name="EventResponse">
			             					<bean:define id="cdList2" name="tmpMap" property="PARAM2"/>
		                    			  	<select name="grp_id_cd" class="search_form" style="width:90px;">
											<option value=""></option>
		                     			  	<logic:iterate id="codeVO" name="cdList2">
		                     				  	<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
		                      			 	</logic:iterate>
		                      				</select>
		                     				 </logic:notEmpty>
		                              </td>
		                              <th><bean:message key="Trade_Partner_Type"/></th>
			                          <td>
										<logic:notEmpty name="EventResponse">
											<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
							             	<bean:define id="cdList" name="cdMap" property="tpType"/>
						             		<select name="trdp_tp_cd" id="trdp_tp_cd" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-align:left">
													<option value=""></option>
			             							<logic:iterate id="codeVO" name="cdList">
				             							<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
			             							</logic:iterate>
				             				</select>
					             		</logic:notEmpty>
			                          </td>
		                          </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="100">
				        	<col width="100">
				        	<col width="50">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	    <tr>
		                            <th><bean:message key="Biz_Type"/></th>
		                            <td><input name="bztp_val" id="bztp_val" type="text" value="<bean:write name="trdpVO" property="bztp_val"/>" class="search_form" style="width:90px;" maxlength="50"></td>
		                            <th><bean:message key="Item"/></th>
		                            <td><input name="biz_itm_val" id="biz_itm_val" type="text" value="<bean:write name="trdpVO" property="biz_itm_val"/>" class="search_form" style="width:72px;" maxlength="50"></td>
		                        </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="100">
				        	<col width="100">
				        	<col width="50">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	    <tr>
		                            <th><bean:message key="Tel"/></th>
		                            <td><input name="rep_phn" id="rep_phn" type="text" value="<bean:write name="trdpVO" property="rep_phn"/>" class="search_form" style="width:90px;" maxlength="30"></td>
		                            <th><bean:message key="Fax"/></th>
		                            <td><input name="rep_fax" id="rep_fax" type="text" value="<bean:write name="trdpVO" property="rep_fax"/>" class="search_form" style="width:72px;" maxlength="30"></td>
		                        </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="100">
				        	<col width="100">
				        	<col width="50">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	    <tr>
		                           <th><bean:message key="Zip_Code"/></th>
		                           <td><input name="rep_zip" id="rep_zip" type="text" maxlength="20" value="<bean:write name="trdpVO" property="rep_zip"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"></td>
		                           <th><bean:message key="EMail"/></th>
		                           <td><input name="rep_eml" id="rep_eml" type="text" value="<bean:write name="trdpVO" property="rep_eml"/>" class="search_form" style="width:72px;" maxlength="100"></td>
		                       </tr>
				        </tbody>
			        </table>
			        
			        <table>
				       <colgroup>
				        	<col width="100">
				        	<col width="*">
				        </colgroup>
				        <tbody>
				        	   <tr>
		                           <th><bean:message key="Remark"/></th>
		                           <td><textarea name="rmk" id="rmk" value="" class="search_form" style="width:222px;height:60px" maxlength="50"><bean:write name="trdpVO" property="rmk"/></textarea></td>
		                       </tr>
				        </tbody>
			        </table>
			   </div>
		</div>
	</div>
</div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="paFileDown" id="bcKey" />
    <input type="hidden" name="trdp_cd" value="" id="trdp_cd" />
    <input type="hidden" name="cntc_seq" value="" id="cntc_seq" />
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	document.frm1.trdp_tp_cd.value = '<bean:write name="trdpVO" property="trdp_tp_cd"/>';
	document.frm1.grp_id_cd.value = '<bean:write name="trdpVO" property="grp_id_cd"/>';
</script>

