<%--
=========================================================
*@FileName   : EDI_AWB_0010.jsp
*@FileTitle  : AWB EDI 처리
*@Description: AWB EDI 처리
 *@author  : Wonki Eo - CyberLogitec
 *@version : 1.0 - 10/23/2018
 *@since   : 10/23/2018 (Wonki Eo - CyberLogitec)

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/awb/script/EDI_AWB_0010.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<%-- <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script> --%>
    <script language="javascript">
		var cstmCd = ''; 
		var cstmNm = '';
		var cstmDptCd = ''; 
		var cstmDptNm = '';
		
		var MSG_STS_CD = '';
        var MSG_STS_NM = '';
        <% boolean isBegin = false; %>
		<logic:notEmpty name="valMap" property="stsList">
			<% isBegin = false; %>
			<bean:define id="msgStsLst"  name="valMap" property="stsList"/>
			<logic:iterate id="msgStsVO" name="msgStsLst">
				<% if(isBegin){ %>
					MSG_STS_CD+= '|';
					MSG_STS_NM+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				MSG_STS_CD+= '<bean:write name="msgStsVO" property="cd_val"/>';
				MSG_STS_NM+= '<bean:write name="msgStsVO" property="cd_nm"/>';
			</logic:iterate>		
		</logic:notEmpty>
		
		<!-- ###Package 코드## -->
		var PCKCD1 = '|';
		var PCKCD2 = '|';
		<logic:notEmpty name="valMap" property="pckCdList">
			<% isBegin = false; %>
	        <bean:define id="pckList" name="valMap" property="pckCdList"/>
			<logic:iterate id="pckVO" name="pckList">
				<% if(isBegin){ %>
					PCKCD1+= '|';
					PCKCD2+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				PCKCD1+= '<bean:write name="pckVO" property="pck_nm"/>';
				PCKCD2+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
			</logic:iterate>
		</logic:notEmpty>
		
		<!-- Currency Code -->
		var CURRCD1 = '';
		var CURRCD2 = '';
        <logic:notEmpty name="valMap" property="currCdList">
			<% isBegin = false; %>
            <bean:define id="currCdList" name="valMap" property="currCdList"/>
            <logic:iterate id="codeVO" name="currCdList">
                <% if(isBegin){ %>
	                CURRCD1+= '|';
	                CURRCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   CURRCD1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   CURRCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Freight Term Code -->
		var TERMCD1 = '';
		var TERMCD2 = '';
        <logic:notEmpty name="valMap" property="frtCdList">
			<% isBegin = false; %>
            <bean:define id="frtCdList" name="valMap" property="frtCdList"/>
            <logic:iterate id="codeVO" name="frtCdList">
                <% if(isBegin){ %>
                	TERMCD1+= '|';
                	TERMCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   TERMCD1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   TERMCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        <!-- Freight Term Code -->
		var DESICD1 = '';
		var DESICD2 = '';
        <logic:notEmpty name="valMap" property="ofdCdList">
			<% isBegin = false; %>
            <bean:define id="ofdCdList" name="valMap" property="ofdCdList"/>
            <logic:iterate id="codeVO" name="ofdCdList">
                <% if(isBegin){ %>
                	DESICD1+= '|';
                	DESICD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   DESICD1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   DESICD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Freight Term Code -->
		var RATECD1 = '';
		var RATECD2 = '';
        <logic:notEmpty name="valMap" property="rateClssCdList">
			<% isBegin = false; %>
            <bean:define id="rateClssCdList" name="valMap" property="rateClssCdList"/>
            <logic:iterate id="codeVO" name="rateClssCdList">
                <% if(isBegin){ %>
                	RATECD1+= '|';
                	RATECD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   RATECD1+= '<bean:write name="codeVO" property="cd_nm" filter="false"/>';
                   RATECD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
        
	</script>
<script type="text/javascript">
<!--
function setupPage() {
	initFinish();
	loadPage();
	doWork('SEARCHLIST01');
}
//-->
</script>
<form name="frm1" method="POST" action="./">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd">
	<input type="hidden" name="cntr_cnt">
	<input type="hidden" name="dpt" id="dpt">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%-- Button Setup  --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
<div class="over_wrap" height="100%">
	<div class="wrap_search_tab">	
		<div class="opus_design_inquiry wFit">
				<table>	
					<colgroup>
				        <col width="100">
			        	<col width="100">
			        	<col width="100">
			        	<col width="150">
			        	<col width="100">
			        	<col width="200">
			        	<col width="100">
			        	<col width="200">
			        	<col width="80">
			        	<col width="*">
			        </colgroup>	       
					<tbody>
						<tr>
                            <th style="text-align:right"><bean:message key="Ref_No"/></th>
                            <td>
                           	    <input type="text" id="f_ref_no" name="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
                            </td>
                            
                            <th><bean:message key="MAWB_No"/></th>
                            <td>
                           	    <input type="text" id="f_mbl_no" name="f_mbl_no" maxlength="20" value="<bean:write name="valMap" property="f_mbl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:170px;" onkeydown="entSearch();"/>
                            </td>
                            
                            <th><bean:message key="HAWB_No"/></th>
                            <td>
                           	    <input type="text" id="f_hbl_no" name="f_hbl_no" maxlength="20" value="<bean:write name="valMap" property="f_hbl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:170px;" onkeydown="entSearch();"/>
                            </td>
                            
                            <th><bean:message key="Liner_Bkg_No"/></th>
                            <td >
                            	<input type="text" id="f_lnr_bkg_no" name="f_lnr_bkg_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:165px;" onkeydown="entSearch();"/>
                            </td>
                            
                            <th><bean:message key="Office"/></th>
			                <td>
	                            <div id="div_subcode">
	                                <bean:define id="oficeList" name="valMap" property="ofcList"/><!--  
	                                --><input  type="hidden" name="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/><!--  
	                                --><select name="f_ofc_cd" style= "width:80px;">
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
	                             </div>
	                          </td>
						</tr>
						
						<tr>
                            <th style="text-align:right"><bean:message key="Flight_No"/></th>
                             	<td><!--
                              		 --><input type="text" name="f_flt_no" id="f_flt_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
                             	</td>
                            <th><bean:message key="Departure"/></th>
                                <td><!-- 
                               		 --><input type="text"   name="f_pol_cd" id="f_pol_cd"  maxlength="5"    value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/><!-- 
                                     --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
                                     --><input type="text"   name="f_pol_nm"  id="f_pol_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:87px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
                                </td>
                            <th><bean:message key="Destination"/></th>
                                <td><!-- 
                               		--><input type="text"   name="f_pod_cd" id="f_pod_cd"   maxlength="5"   value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/><!-- 
                                    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                                    --><input type="text"   name="f_pod_nm" id="f_pod_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:87px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                                </td>
                            <th>
                            	<select name="f_date_type" id="f_date_type"  style="width:80px; font-weight: bold;" onChange="searchValueClear(this);">
									<option value='ETA' checked><bean:message key="ETA"/></option>
									<option value='ETD'><bean:message key="ETD"/></option>
									<option value='PDT'><bean:message key="Post_Date"/></option>
									<option value='BLD'><bean:message key="BL_Date"/></option>
								</select>
                            </th>    
			     		    <td>
							   <input type="text" id="f_strdt" name="f_strdt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_enddt);mkDateFormatType(this,event,true,1);" onFocus="select();"><span class="dash">~</span><!--
							--><input type="text" id="f_enddt" name="f_enddt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_strdt, this);mkDateFormatType(this,event,true,1);" onFocus="select();"><!--
							--><button type="button" class="calendar" tabindex="-1" name="f_strdt_cal" id="f_strdt_cal" onclick="doDisplay('DATE1', frm1);"></button>
							</td>

							<th><bean:message key="Status"/></th>
			              	<td>
								<select name="f_msg_sts_cd" class="search_form" style="width:80px;text-align:left" >
							       	<option value="">ALL</option>
		                   		<bean:define id="stsList"  name="valMap" property="stsList"/>
						    	<logic:iterate id="sts" name="stsList">
			                   		<option value='<bean:write name="sts" property="cd_val"/>'><bean:write name="sts" property="cd_nm"/></option>
			                   	</logic:iterate>
								</select>
			                </td>
		     			</tr>
					</tbody>
				</table>
			</div>
		</div>  
	
		<div class="wrap_result_tab">
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="MAWB_List"/></span></a></li>
	        <li><a href="#" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="HAWB_List"/></span></a></li>
	    </ul>
	
		<div id="tabLayer" name="tabLayer"style="display:inline;">
			<div class="layout_wrap">
			    <div >
					<h3 class="title_design"> <bean:message key="MAWB_List"/></h3>
			        <div class="opus_design_grid">
						<script language="javascript">comSheetObject('sheet1');</script>
					</div>
				</div>
			
			</div>
		</div>
	
	<div id="tabLayer" name="tabLayer"style="display:none;">
		<div class="layout_wrap">
		    <div>
				<h3 class="title_design"> <bean:message key="HAWB_List"/></h3>
		        <div class="opus_design_grid">
						<script language="javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
		</div>
	</div>
	
	<!-- <div class="wrap_result">
    	<div class="opus_design_grid">
   			<h3 class="title_design"><bean:message key="HBL_List"/></h3>
				<div class="opus_design_btn">
					 <button type="button" class="btn_accent" onClick="doWork('EDI_BL_SAVE')"><bean:message key="Save"/></button>
				</div>
		</div>
    </div> -->
    	
    	<div id="disp_val_msg" style="width:100%;;float:left!important;">
			<div class="layout_flex_fixed" style="width:1200px;float:left!important">
		   		<h3 class="title_design"><bean:message key="Validation_Message"/></h3>
			</div>
		
			<table>
	 			<tr>
	 				<td>
	 					<textarea name="val_msg" cols="200" rows="7"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
	 				</td>
	 				<td valign="top"" style="padding: 5px;">
	 					<button onClick="disp_val_msg.style.display='none';" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Close"/></button>		
	 				</td>
	 			</tr>
	 		</table>
		</div>
			
    </div>
</div>
</form>
  
<script type="text/javascript">
<%-- doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>"); --%>
</script>	
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
    doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

