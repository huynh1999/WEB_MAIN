<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_ISF_0010.jsp
*@FileTitle  : ISF EDI (Ocean)
*@Description: ISF EDI (Ocean) 저장 및 전송
*@author     : 
*@version    : 
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.clt.apps.fis.edi.isf.sei.dto.EdiIsfVO"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <bean:define id="ediIsfHdrVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

<%
	ediIsfHdrVO = (EdiIsfVO) ediIsfHdrVO;
	
%>
   <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<!--
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script> 
	
	script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script
	-->
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/isf/sei/script/EDI_ISF_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script>	
		var BL_TP_CD = '';
	    var BL_TP_NM = '';
	    var ENTT_CD = '';
	    var ENTT_NM = '';
	    var ENTT_ID_QUAL_CD = ' ';
	    var ENTT_ID_QUAL_NM = ' ';
	    var SND_ENTT_CD = ' ';
	    var SND_ENTT_NM = ' ';
	    
	    
	    <bean:define id="BL_TP_LIST"  name="valMap" property="BL_TP"/>
	    <logic:iterate id="CODE_VO" name="BL_TP_LIST">
	           BL_TP_CD += ( '|' + '<bean:write name="CODE_VO" property="cd_val"/>'); // + " : " + '<bean:write name="CODE_VO" property="cd_nm"/>';
	           BL_TP_NM += ( '|' + '<bean:write name="CODE_VO" property="cd_nm"/>');
	    </logic:iterate>
	    
	    <bean:define id="ENTT_CD_LIST"  name="valMap" property="ENTT_CD"/>
	    <logic:iterate id="CODE_VO" name="ENTT_CD_LIST">
	           ENTT_CD += ( '|' + '<bean:write name="CODE_VO" property="cd_val"/>'); // + " : " + '<bean:write name="CODE_VO" property="cd_nm"/>';
	           ENTT_NM += ( '|' + '<bean:write name="CODE_VO" property="cd_nm"/>');
	    </logic:iterate>
	    
	    <bean:define id="ENTT_ID_QUAL_LIST"  name="valMap" property="ENTT_ID_QUAL"/>
	    <logic:iterate id="CODE_VO" name="ENTT_ID_QUAL_LIST">
	           ENTT_ID_QUAL_CD += ( '|' + '<bean:write name="CODE_VO" property="cd_val"/>'); // + " : " + '<bean:write name="CODE_VO" property="cd_nm"/>';
	           ENTT_ID_QUAL_NM += ( '|' + '<bean:write name="CODE_VO" property="cd_nm"/>');
	    </logic:iterate>
	    
	    <bean:define id="SND_ENTT_CD_LIST"  name="valMap" property="SND_ENTT_CD"/>
	    <logic:iterate id="CODE_VO" name="SND_ENTT_CD_LIST">
	           SND_ENTT_CD += ( '|' + '<bean:write name="CODE_VO" property="cd_val"/>'); // + " : " + '<bean:write name="CODE_VO" property="cd_nm"/>';
	           SND_ENTT_NM += ( '|' + '<bean:write name="CODE_VO" property="cd_nm"/>');
	    </logic:iterate>
	    
	    function setupPage(){
	    	loadPage();
	    	doHideProcess();
	    	loadData();
	    }
		//var attr_extension = "";
   </script>
<form name="frm1" method="POST" action="./EDI_ISF_0010.clt">
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="f_hbl_no" value='<bean:write name="ediIsfHdrVO" property="hbl_no"/>' >
    
    <input type="hidden" name="f_cnee_trdp_cd" value='<bean:write name="ediIsfHdrVO" property="cnee_trdp_cd"/>' >
    <input type="hidden" name="f_cnee_eng_nm" value='<bean:write name="ediIsfHdrVO" property="cnee_eng_nm"/>' >
    <input type="hidden" name="f_cnee_lgl_addr" value='<bean:write name="ediIsfHdrVO" property="cnee_lgl_addr"/>' >
    <input type="hidden" name="f_cnee_biz_no" value='<bean:write name="ediIsfHdrVO" property="cnee_biz_no"/>' >
    <input type="hidden" name="f_cnee_tax_type" value='<bean:write name="ediIsfHdrVO" property="cnee_tax_type"/>' >
    <input type="hidden" name="f_cnee_state_cd" value='<bean:write name="ediIsfHdrVO" property="cnee_state_cd"/>' >
    <input type="hidden" name="f_cnee_city_nm" value='<bean:write name="ediIsfHdrVO" property="cnee_city_nm"/>' >
    <input type="hidden" name="f_cnee_rep_zip" value='<bean:write name="ediIsfHdrVO" property="cnee_rep_zip"/>' >
    <input type="hidden" name="f_cnee_cnt_cd" value='<bean:write name="ediIsfHdrVO" property="cnee_cnt_cd"/>' >
    <input type="hidden" name="f_cnee_cnt_nm" value='<bean:write name="ediIsfHdrVO" property="cnee_cnt_nm"/>' >    
    
    <input type="hidden" name="f_hbl_tp_cd" value='<bean:write name="ediIsfHdrVO" property="hbl_tp_cd"/>' >
    
    <input type="hidden" name="f_snd_seq">
    <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 	   <!--
	   --><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" onClick="doWork('NEW')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button><!--
	   --><button type="button" class="btn_normal" id="btnSave" onClick="doWork('SAVE')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button><!--
	   --><button type="button" class="btn_normal" onClick="doWork('TRANSMIT')" style="cursor:hand; display:none;" btnAuth="TRANSMIT"><bean:message key="Transmit"/></button><!--
	   --><button type="button" class="btn_normal" onClick="doWork('DELETE')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><bean:message key="Delete"/></button>
 --%>	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- wrap_search (S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search_tab">	
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="70">
					<col width="*">
				</colgroup>
				<tbody>
                 <tr>
                     <th><bean:message key="ISF_No"/></th>
                     <td><input name="f_isf_no_ret" maxlength="20"  value="<bean:write name="ediIsfHdrVO" property="isf_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
                 </tr>
                </tbody>
             </table>
		</div>
	</div>
	<!-- wrap_search (E) -->
	<!-- wrap_result(S) -->
	<div class="wrap_result_tab">
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Header"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Party_Detail"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Status"/></span></a></li>
	    </ul>
	
		<!-- tabLayer1 (S) -->
		<div name="tabLayer" id="tabLayer" style="display: inline;">
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="70">
						<col width="80">
						<col width="70">
						<col width="130">
						<col width="60">
						<col width="*">
					</colgroup>
                  <tr>
                      <th><bean:message key="ISF_Type"/></th>
                      <td> 
                       <select name="f_isf_tp" class="search_form" style="width:80px;" onChange="fieldChange('ISF_TP');" > 
	                       <bean:define id="ISF_TP_LIST"  name="valMap" property="ISF_TP"/> 
	                       <logic:iterate id="CODE_VO" name="ISF_TP_LIST"> 
		                       <logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_tp()%>" > 
		                       	<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
		                       </logic:equal> 
		                       <logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_tp()%>" > 
		                       	<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
		                       </logic:notEqual> 
	                       </logic:iterate> 
                        </select>
                       </td>
                      <th><bean:message key="ISF_No"/></th>
                      <td><input name="f_isf_no" maxlength="20"  value="<bean:write name="ediIsfHdrVO" property="isf_no"/>" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" readOnly ></td>
                      <th><bean:message key="Status"/></th>
                  	  <td> 
                  	   <select name="f_msg_sts" class="search_form" style="width:110px;" disabled > 
	                  	   	<option value=""></option> 
	                  	   	<bean:define id="MSG_STS_LIST"  name="valMap" property="MSG_STS"/> 
	                  	   <logic:iterate id="CODE_VO" name="MSG_STS_LIST"> 
	                  	   			<logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getMsg_sts()%>" > 
	                  	   	<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
	                  	   </logic:equal> 
	                  	   <logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getMsg_sts()%>" > 
	                  	   	<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
	                  	   </logic:notEqual> 
	                  	   		</logic:iterate> 
                  	     </select> 
                  	   </td>
                  </tr>
                </table>
                
                <table class="line_bluedot"><tbody><tr><td></td></tr></tbody></table>
                
                <div class="sm">
	                <h3 style="margin-bottom:0" class="title_design"><bean:message key="Transaction_Status"/></h3>
		                <table>
		                	<colgroup>
		                		<col width="110">
		                		<col width="150">
		                		<col width="80">
		                		<col width="140">
		                		<col width="100">
		                		<col width="250">
		                		<col width="100">
		                		<col width="*">
		                	</colgroup>
		                	<tbody>
			                    <tr>
			                    	<th><bean:message key="Transaction_No"/></th>
			                        <td><input name="f_isf_trac_no" maxlength="15"  value="<bean:write name="ediIsfHdrVO" property="isf_trac_no"/>" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
			                        <th><bean:message key="Action_Type"/></th>
			                        <td> 
			                         <select required name="f_isf_act_cd" class="search_form" style="width:120px;"  onChange="fieldChange('ISF_ACT_CD');" > 
			                         	<bean:define id="ACT_CD_LIST"  name="valMap" property="ACT_CD"/> 
			                         	<logic:iterate id="CODE_VO" name="ACT_CD_LIST"> 
			                         		<logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_act_cd()%>" > 
			                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
			                         		</logic:equal> 
			                         		<logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_act_cd()%>" > 
			                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
			                         		</logic:notEqual> 
			                         	</logic:iterate> 
			                           </select> 
			                         </td>
			                         <!-- 
			                        <th><bean:message key="Action_Reason"/></th>
			                        <td colspan="3"> 
			                         <select required name="f_isf_act_reason" class="search_form" style="width:240px;"> 
			                         	<bean:define id="ACT_REASON_LIST"  name="valMap" property="ACT_REASON"/> 
			                         	<logic:iterate id="CODE_VO" name="ACT_REASON_LIST"> 
			                         		<logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_act_reason()%>" > 
			                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
			                         		</logic:equal> 
			                         		<logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_act_reason()%>" > 
			                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
			                         		</logic:notEqual> 
			                         	</logic:iterate> 
			                           </select> 
			                         </td>
			                          -->
			                    </tr>
			                    <tr>
			                      	<th><bean:message key="Date_issued"/></th>
			                        <td><input name="f_rgst_tms"  value="<bean:write name="ediIsfHdrVO" property="rgst_tms"/>" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
			                      	<th><bean:message key="Issued_By"/></th>
			                        <td><input name="f_rgst_usrid"  value="<bean:write name="ediIsfHdrVO" property="rgst_usrid"/>" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
			                        <th><bean:message key="Date_modified"/></th>
			                        <td><input name="f_modi_usrid"  value="<bean:write name="ediIsfHdrVO" property="modi_tms"/>" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
			                      	<th><bean:message key="Modified_by"/></th>
			                        <td><input name="f_modi_tms"  value="<bean:write name="ediIsfHdrVO" property="modi_usrid"/>" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
			                    </tr>
			                 </tbody>
					    </table>
				    </div>
             	</div>
             
             <table class="line_bluedot"><tbody><tr><td></td></tr></tbody></table>
             <div class="layout_wrap">
             	<div class="layout_vertical_2"  style="width:400px">
             		
             		<div class="opus_design_grid">
				    	<h3 style="margin-bottom:0" class="title_design"><bean:message key="Bills_of_Lading"/></h3>
				    	<!--  
				    	<div class="opus_design_btn">
							 <button type="button" class="btn_normal" onClick="doWork('BL_ADD')"><bean:message key="Add"/></button>
						</div>
						-->
					 	<script type="text/javascript">comSheetObject('sheet1');</script>
				 	</div>
				 	
             	</div>
             	<div class="layout_vertical_2" style="padding-left:8px;width:calc(100% - 400px)">
             		<div class="opus_design_inquiry sm" style="height: 150px;">
	             		<table>
	             		<tr>
	             			<td width="180px" valign="top">
	             				<table>
	             					<colgroup>
	             						<col width="80">
	             						<col width="*">
	             					</colgroup>
	             					<tbody>
										<tr>
											<th><bean:message key="MBL_No"/></th>
											<td><input type="text" name="f_mbl_no" value='<bean:write name="ediIsfHdrVO" property="mbl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:115px;" ondblclick="goToBlPage('view_mbl', this.value)" readOnly ></td>
										</tr>
										<tr>
											<th><bean:message key="ETD"/></th>
											<td><input type="text" name="f_isf_etd" value='<wrt:write name="ediIsfHdrVO" property="isf_etd" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" tabindex="37" readOnly ></td>
										</tr>
										<tr>
											<th> <bean:message key="ETA"/></th>
											<td><input type="text" name="f_isf_eta" value='<wrt:write name="ediIsfHdrVO" property="isf_eta" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" tabindex="38" readOnly ></td>
										</tr>
										<tr>
											<th><bean:message key="Carrier"/></th>
											<td><input type="text" name="f_isf_scac" maxLength="4" value='<bean:write name="ediIsfHdrVO" property="isf_scac"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:115px;" ></td>
										</tr>
									</tbody>
								</table>
	             			</td>
	             			<td width="370px" valign="top">
	             				<table>
	             					<colgroup>
	             						<col width="140">
	             						<col width="*">
	             					</colgroup>
	             					<tbody>
				      					<tr>
				          					<th><bean:message key="VSL_VOY"/></th>
				          					<td><!-- 
				          					 --><input type="text"   name="f_isf_vessel" value='<bean:write name="ediIsfHdrVO" property="isf_vessel"/>' onblur="strToUpper(this)" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:123px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openPopUp('VESSEL_POPLIST', document.getElementById('prevesel'), frm1.pre_vsl_nm.value);}" tabindex="21" readOnly ><!-- 
				          					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('VESSEL_POPLIST',this)"></button><!--  
				          					 --><input type="text" name="f_isf_voyage"    value='<bean:write name="ediIsfHdrVO" property="isf_voyage"/>'      onblur="strToUpper(this)" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="8"  tabindex="22" readOnly /><!--  
				          					 --></td>
				      					</tr>
										<tr>
											<th><bean:message key="Shipment_Type"/></th>
											<td> 
											 <select name="f_isf_ship_tp" class="search_form" style="width:215px;" onChange="setInformal(this.value)"> 
											 	   	<bean:define id="SHIP_TP_LIST"  name="valMap" property="SHIP_TP"/> 
											 	<logic:iterate id="CODE_VO" name="SHIP_TP_LIST"> 
											 		<logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_ship_tp()%>" > 
											 			<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
											 		</logic:equal> 
											 		<logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_ship_tp()%>" > 
											 			<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
											 		</logic:notEqual> 
											 	</logic:iterate> 
											 		</select> 
											 </td>
										</tr>
										<tr>
											<th><bean:message key="Carnet_Country_No"/></th>
											<td><input type="text" name="f_ref_no_6c" maxLength="50" value='<bean:write name="ediIsfHdrVO" property="ref_no_6c"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
										</tr>
										<tr>
											<th><bean:message key="Transportation_Type"/></th>
											<td> 
											 <select name="f_isf_trans_mode" class="search_form" style="width:150px;"> 
											 	   	<bean:define id="TRANS_MODE_LIST"  name="valMap" property="TRANS_MODE"/> 
											 <logic:iterate id="CODE_VO" name="TRANS_MODE_LIST"> 
											 		<logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_trans_mode()%>" > 
											 		<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
											 	</logic:equal> 
											 	<logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_trans_mode()%>" > 
											 		<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
											 	</logic:notEqual> 
											 	</logic:iterate> 
											 		</select> 
											 </td>
										</tr>
									</tbody>
								</table>
	             			</td>
	             			<td valign="top">
	             				<table>
	             					<colgroup>
	             						<col width=90>
	             						<col width="*">
	             					</colgroup>
	             					<tbody>
									<tr>
										<th><bean:message key="POL"/></th>
										<td><!-- 
										 --><input type="text" name="f_isf_pol_cd" value='<bean:write name="ediIsfHdrVO" property="isf_pol_cd"/>' class="search_form-disable" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('Location_pol',this, 'onBlur');cobChange();" dataformat="excepthan" style="ime-mode:disabled;width:50px;" tabindex="27" readOnly ><!-- 
										 --><input type="text" name="f_isf_pol_name" value='<bean:write name="ediIsfHdrVO" property="isf_pol_name"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:169px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_name.value);}" onchange="cobChange();" tabindex="28" readOnly ><!-- 
										 --><input type="hidden" name="pol_cnt_cd" value=""><!-- 
										 --></td>
										</tr>
										<tr>
											<th><bean:message key="POD"/></th>
											<td><!-- 
											 --><input type="text" name="f_isf_pod_cd" value='<bean:write name="ediIsfHdrVO" property="isf_pod_cd"/>' class="search_form-disable" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('Location_pod',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:50px;" tabindex="29" readOnly ><!-- 
											 --><input type="text" name="f_isf_pod_name" value='<bean:write name="ediIsfHdrVO" property="isf_pod_name"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:169px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_name.value);}" tabindex="30" readOnly ><!-- 
											 --></td>
										</tr>
										<tr>
											<th id="td_del"><span id="del_mandatory" style="display:none">* </span><bean:message key="DEL"/></th>
											<td><!-- 
											 --><input type="text" name="f_del" maxLength="15" value='<bean:write name="ediIsfHdrVO" property="del"/>' class="search_form-disable" onKeyDown="codeNameAction('location_del',this, 'onKeyDown')" onBlur="codeNameAction('Location_del',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:50px;" tabindex="31" readOnly ><!-- 
											 --><input type="text" name="f_isf_del_nm" value='<bean:write name="ediIsfHdrVO" property="isf_del_name"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:169px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}" tabindex="32" readOnly ><!-- 
											 --></td>
										</tr>
										<tr>
											<th id="td_fpod"><span id="fpod_mandatory" style="display:none">* </span><bean:message key="Foreign_POD"/></th>
											<td><!-- 
											 --><input type="text" name="f_fpod" id="fpod" maxlength="5" value='<bean:write name="ediIsfHdrVO" property="fpod"/>' class="search_form" onKeyDown="codeNameAction('location_fpod',this, 'onKeyDown')" onBlur="codeNameAction('Location_fpod',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:50px;text-transform:uppercase;" tabindex="33"><!-- 
											 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LOCATION_POPLIST',this)"></button><!-- 
											 --><input type="text" name="f_fpod_name" maxlength="50" value='<bean:write name="ediIsfHdrVO" property="isf_fpod_name"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('fpod'), this.value);}" tabindex="34"><!-- 
											 --></td>
										</tr>
									</tbody>
								</table> 
	             			</td>
	             		</tr>
	             	</table>
	             </div>
             	</div>
             </div>
             
             <table class="line_bluedot"><tbody><tr><td></td></tr></tbody></table>
             <div class="opus_design_inquiry">
             	<div class="sm">
	             	<!-- <h3 style="margin-bottom:0" class="title_design"><bean:message key="Importer"/></h3> -->
	             	<table>
	             		<colgroup>
	             			<col width="100">
	             			<col width="140">
	             			<col width="100">
	             			<col width="150">
	             			<col width="90">
	             			<col width="*">
	             		</colgroup>
	             		<tbody>
	                    <!--  
	                    <tr>
	                    	<th><bean:message key="Party_Code"/></th>
	                        <td>
	                         <input name="f_isf_imp_cd" maxlength="20"  value="<bean:write name="ediIsfHdrVO" property="isf_imp_cd"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
	                         <button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('IMPORTER')"></button></td>
	                      	<th><bean:message key="Party_Name"/></th>
	                        <td><input name="f_isf_imp_name" maxlength="50"  value="<bean:write name="ediIsfHdrVO" property="isf_imp_name"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
	                        <th> <bean:message key="ID_Qualifier"/></th>
	                        <td> 
	                         <select required name="f_isf_imp_qual" class="search_form" style="width:240px;" onChange="chkImporterIdQual(this.value);copyImporterToParty()"> 
	                         	<option value="">= select =</option> 
	                         	<bean:define id="IMP_QUAL_LIST"  name="valMap" property="IMP_QUAL"/> 
	                         	<logic:iterate id="CODE_VO" name="IMP_QUAL_LIST"> 
	                         		<logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_imp_qual()%>" > 
	                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
	                         		</logic:equal> 
	                         		<logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_imp_qual()%>" > 
	                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
	                         		</logic:notEqual> 
	                         	</logic:iterate> 
	                          </select> 
	                         </td>
	                    </tr>
	                    
	                    <tr>
	                      	<th><bean:message key="Importer_No"/></th>
	                        <td>
	                            <input required name="f_isf_imp_no"  maxLength="15" value="<bean:write name="ediIsfHdrVO" property="isf_imp_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;" onblur="strToUpper(this);copyImporterToBond();copyImporterToParty()" onChange="formatMask('ISF_IMP_NO',this);" title ="valid format&#13;EI : NN-NNNNNNNXX&#13;ANI : YYDDPP-NNNNN&#13;34 : NNN-NN-NNNN&#13;AEF : XXXXXXXXXXXXXXX"/><!-- 
	                        	</td>
	                      	<th><bean:message key="Issued_Country"/></th>
	                        <td><input name="f_isf_cntry_cd"  maxLength="2" value="<bean:write name="ediIsfHdrVO" property="isf_cntry_cd"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
	                      	<th><bean:message key="Date_of_Birth"/></th>
	                        <td> 
	                         	<input name="f_isf_imp_dob" id="f_isf_imp_dob" value='<wrt:write name="ediIsfHdrVO" property="isf_imp_dob" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);" dataformat="excepthan" style="ime-mode:disabled;width:70px;" maxlength="10"/><!-- 
	                         	<button type="button" class="calendar" tabindex="-1" onclick="doDisplay('DATE1',frm1.f_isf_imp_dob);"></button></td>
	                    </tr>
	                    
	                   </tbody>
				    </table>
				  </div>
			    -->
				
				<div class="sm">
	             	<h3 style="margin-bottom:0" class="title_design"><bean:message key="Bond"/></h3>
	             	 <table>
	             	 	<colgroup>
	             			<col width="100">
	             			<col width="140">
	             			<col width="100">
	             			<col width="150">
	             			<col width="90">
	             			<col width="150">
	             			<col width="100">
	             			<col width="*">
	             		</colgroup>
	             		<tbody>
	                    <tr>
	                    	<th><bean:message key="Party_Code"/></th>
	                        <td><!-- 
	                         --><input name="f_isf_bond_cd"  maxlength="20" value="<bean:write name="ediIsfHdrVO" property="isf_bond_cd"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
	                         --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('BOND')"></button></td>
	                      	<th><bean:message key="Party_Name"/></th>
	                        <td><input name="f_isf_bond_name"  maxlength="50" value="<bean:write name="ediIsfHdrVO" property="isf_bond_name"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
	                      	<th><span id="isf_bond_holder_mandatory" style="display:none">* </span><bean:message key="Bond_Holder"/></th>
	                        <td><!-- 
	                         --><input name="f_isf_bond_holder"  maxLength="15" value="<bean:write name="ediIsfHdrVO" property="isf_bond_holder"/>"  type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" onChange="formatMask('ISF_BOND_HOLDER',this);" title = "* Valid format&#13;EI : NN-NNNNNNNXX&#13;ANI : YYDDPP-NNNNN&#13;34 : NNN-NN-NNNN"><!-- 
	                         --></td>
	                        <th><span id="isf_bond_act_cd_mandatory" style="display:none">* </span><bean:message key="Bond_Activity"/></th>
	                        <td> 
	                         <select name="f_isf_bond_act_cd" class="search_form" style="width:200px;" onChange="setIsfBondTp();fieldChange('ISF_ACT_CD');"> 
	                         	<bean:define id="BOND_ACT_CD_LIST"  name="valMap" property="BOND_ACT_CD"/> 
	                         	<logic:iterate id="CODE_VO" name="BOND_ACT_CD_LIST"> 
	                         		<logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_bond_act_cd()%>" > 
	                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
	                         		</logic:equal> 
	                         		<logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_bond_act_cd()%>" > 
	                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
	                         		</logic:notEqual> 
	                         	</logic:iterate> 
	                         </select></td>
	                    </tr>
	                    <tr>
	                      	<th><span id="isf_bond_tp_mandatory" style="display:none">* </span><bean:message key="Bond_Type"/></th>
	                        <td> 
	                         <select name="f_isf_bond_tp" class="search_form" style="width:108px;"> 
	                         	<bean:define id="BOND_TP_LIST"  name="valMap" property="BOND_TP"/> 
	                         	<logic:iterate id="CODE_VO" name="BOND_TP_LIST"> 
	                         		<logic:equal name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_bond_tp()%>" > 
	                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>' selected ><bean:write name="CODE_VO" property="cd_nm"/></option> 
	                         		</logic:equal> 
	                         		<logic:notEqual name="CODE_VO" property="cd_val" value="<%=((EdiIsfVO)ediIsfHdrVO).getIsf_bond_tp()%>" > 
	                         			<option value='<bean:write name="CODE_VO" property="cd_val"/>'><bean:write name="CODE_VO" property="cd_nm"/></option> 
	                         		</logic:notEqual> 
	                         	</logic:iterate> 
	                         </select></td>
	                      	<th><bean:message key="Surety_Code"/></th>
	                        <td><input name="f_ref_no_v1" maxLength="50"  value="<bean:write name="ediIsfHdrVO" property="ref_no_v1"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
	                      	<th><bean:message key="Bond_Reference_No"/></th>
	                        <td colspan="3">
	                            <input name="f_ref_no_sbn" maxLength="50"  value="<bean:write name="ediIsfHdrVO" property="ref_no_sbn"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)">
	                        </td>
	                    </tr>
	                   </tbody>
				    </table>
				  </div>
             </div>
             
             <div class="opus_design_inquiry" style="display: none;" id='informal'>
             	<h3 style="margin-bottom:0" class="title_design">Informal</h3>
             	<table>
                    <tr>
                    	<th width="100px">No Packages</th>
                        <td width="120px"><input name="f_infm_est_quan"  maxlength="20" value="<bean:write name="ediIsfHdrVO" property="infm_est_quan"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
                      	<th width="80px">Pkg Type</th>
                        <td width="150px"><input name="f_infm_unit_mea"  maxlength="50" value="<bean:write name="ediIsfHdrVO" property="infm_unit_mea"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
                      	<th width="130px">Value (USD):</th>
                        <td width="150px"><input name="f_infm_est_value"  maxlength="50" value="<bean:write name="ediIsfHdrVO" property="infm_est_value"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
                        <th width="110px">Weight (KG):</th>
                        <td><!-- 
                         --><input name="f_infm_est_wgt"  maxlength="20" value="<bean:write name="ediIsfHdrVO" property="infm_est_wgt"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
                         --><input name="f_infm_wgt_qual" type="hidden" value="K"><!-- 
                         --><input name="f_infm_sub_type" type="hidden" value="01"></td>
                    </tr>
			    </table>
             </div>
		</div>
	<div name="tabLayer" id="tabLayer" style="display: none;width: 1000px;" >
		<div class="opus_design_grid">
			<h3 class="title_design"><bean:message key="Party_Detail"/></h3>
			<div class="opus_design_btn">
				 <button type="button" class="btn_normal" onclick="doWork('PARTY_ADD')"><bean:message key="Add"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
		
		<div class="opus_design_grid mar_top_8" style="width: 600px;">
			<h3 class="title_design"><bean:message key="HTS_Detail"/></h3>
			<div class="opus_design_btn">
				 <button type="button" class="btn_normal" onclick="doWork('HTS_ADD')"><bean:message key="Add"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet3');</script>
		</div>
	</div>
	<div name="tabLayer" id="tabLayer" style="display: none;">
		<div class="layout_wrap">
		    <div class="layout_vertical_2">
		        <!-- opus_design_grid(S) -->
		        <h3 class="title_design"><bean:message key="Send_File_Info"/></h3>
		        <div class="opus_design_grid">
					<script type="text/javascript">comSheetObject('sheet4');</script>
		        </div>
		        <!-- opus_design_grid(E) -->
		    </div>
		    <div class="layout_vertical_2 pad_left_8">
		        <!-- opus_design_grid(S) -->
		        <h3 class="title_design"><bean:message key="Detail_List"/></h3>
		        <div class="opus_design_grid">
					<script type="text/javascript">comSheetObject('sheet5');</script>
		        </div>
		        <div class="opus_design_grid" style="display: none;">
		        	<h3 class="title_design"><bean:message key="Send_Information"/></h3>
		        	<table>
		        		<colgroup>
		        			<col width="80">
		        			<col width="100">
		        			<col width="100">
		        			<col width="*">
		        		</colgroup>
		        		<tr>
	                    	<th><bean:message key="File_Name"/></th>
	                        <td><input name="f_file_nm" maxlength="50"  value="<bean:write name="valMap" property="f_party_cd"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
	                      	<th><bean:message key="Ref_No"/></th>
	                        <td><input name="f_ref_no"  maxlength="20" value="<bean:write name="valMap" property="f_party_cd"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
	                    </tr>
	                    <tr>
	                      	<th><bean:message key="CR_No"/></th>
	                        <td colspan="3"><input name="f_cr_no" maxlength="40"  value="<bean:write name="valMap" property="f_party_cd"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
	                    </tr>
		        	</table>
		        	<h3 class="title_design"><bean:message key="Detail_List"/></h3>
		        	<br/>
		        	<textarea name="msg_desc" class="search_form" dataformat="excepthan" style="width:550px;height:300px;" onblur="strToUpper(this);" WRAP="off"><bean:write name="valMap" property="desc"/></textarea>
		        </div>
		        <!-- opus_design_grid(E) -->
		    </div>
		</div>
	</div>
	<div id="disp_val_msg" style="width:80%;;float:left!important;">
		<div class="layout_flex_fixed" style="width:770px;float:left!important">
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

<form name="frm2" method="POST" action="./EDI_ISF_0010.clt">
    <input type="hidden" name="f_sht1_str" value='' >
    <input type="hidden" name="f_sht2_str" value='' >
    <input type="hidden" name="f_sht3_str" value='' >
    <input type="hidden" name="f_frm1_str" value='' >
</form>
  
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
    doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>
