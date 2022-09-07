<%--
=========================================================
*@FileName   : SEE_AMS_0020.jsp
*@FileTitle  : AMS SEND(sea)
*@Description: AMS SEND(sea)
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

*@Change history: 
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<script language="javascript" src="./apps/fis/see/bmd/ams/script/SEE_AMS_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<%-- 	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/SAL_TFM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/MDM_MCM_MSG.js?ver=<%=CLT_JS_VER%>"></script> --%>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<%   	
	String chk_hbl_no = request.getParameter("chk_hbl_no");
	String chk_flg = request.getParameter("chk_flg");
	String ams_file_no = request.getParameter("ams_file_no") == null? "" : request.getParameter("ams_file_no");
	%>
	
	<script language="JavaScript">
	function goTabSelect(isNumSep) {
		var tabObjs = document.getElementsByName('tabLayer');

	    if(isNumSep=='01') {
			tabObjs[0].style.display = 'inline';
	        tabObjs[1].style.display = 'none';
	    }else if(isNumSep=='02') {
			tabObjs[0].style.display = 'none';
	        tabObjs[1].style.display = 'inline';
	    }else if (isNumSep=='03') {
	        tabObjs[0].style.display = 'none';
	        tabObjs[1].style.display = 'none';
		}
  	}
	
  	var user_ofc_cd = "<%=userInfo.getOfc_cd()%>";
  	
  	function setupPage(){
    	loadPage();
    }
  	
  	<% boolean isBegin = false; %>
  	<!-- ###Package 코드## -->
	var PCK_UT_CD = '|';
	var PCK_UT_NM = '|';
	<logic:notEmpty name="valMap" property="pckCdList">
		<% isBegin = false; %>
        <bean:define id="pckList" name="valMap" property="pckCdList"/>
		<logic:iterate id="pckVO" name="pckList">
			<% if(isBegin){ %>
			PCK_UT_CD+= '|';
			PCK_UT_NM+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PCK_UT_CD+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
			PCK_UT_NM+= '<bean:write name="pckVO" property="pck_nm"/>';
		</logic:iterate>
	</logic:notEmpty>
	
	var MSG_STS_CD = '';
    var MSG_STS_NM = '';
    <% isBegin = false; %>
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
	
	</script>
	
	<bean:define id="amsVO" name="EventResponse" property="objVal"/>
	
	<form name="frm1" method="POST" action="./SEE_AMS_0020.clt">
		<input type="hidden" name="f_cmd"/> 
		<input type="hidden" name="f_CurPage"/>
		<input type="hidden" name="t_sls_ofc_cd" value="<%= userInfo.getOfc_cd() %>"/>
		<input type="hidden" name="t_sls_ofc_nm" value="<%= userInfo.getOfc_eng_nm() %>"/>
		<input type="hidden" name="t_sls_usrid" value="<%= userInfo.getUsrid() %>"/>
		<input type="hidden" name="t_sls_usrnm" value="<%= userInfo.getUser_name() %>"/>
		
		<input type="hidden" name="f_intg_bl_seq" value="<bean:write name="amsVO" property="intg_bl_seq"/>"/>
		<input type="hidden" name="f_mbl_no" value="<bean:write name="amsVO" property="mbl_no"/>"/>
		<input type="hidden" name="f_etd_dt_tm" value="<bean:write name="amsVO" property="etd_dt_tm"/>"/>
		<input type="hidden" name="f_eta_dt_tm" value="<bean:write name="amsVO" property="eta_dt_tm"/>"/>
		
		<!-- #3685 [JAPT] AMS EDI - Transshipment AMS 전송 기능 보완 -->
		<input type="hidden" name="trnk_vsl_nm_bl" value="<bean:write name="amsVO" property="trnk_vsl_nm_bl"/>"/>
		<input type="hidden" name="pre_vsl_nm_shp" value="<bean:write name="amsVO" property="pre_vsl_nm_shp"/>"/>
		<input type="hidden" name="trnk_voy_bl" value="<bean:write name="amsVO" property="trnk_voy_bl"/>"/>
		<input type="hidden" name="pre_voy_shp" value="<bean:write name="amsVO" property="pre_voy_shp"/>"/>
		<input type="hidden" name="ams_file_no" value="<%=ams_file_no%>"/> 
		<input type="hidden" name="chk_hbl_no" value="<%=chk_hbl_no%>"/> 
		<input type="hidden" name="chk_flg" value="<%=chk_flg%>"/> 
		
		
		<input type="hidden" name="f_cntr_list_seq" value=""/>
		
		<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
		<input type="hidden" name="pageurl" id="pageurl" value="SEE_AMS_0020.clt"/>
	 <!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent"  onclick="doWork('SEARCHLIST01')"><bean:message key="Search"/></button><!--
	   --><!--  button type="button" class="btn_normal" style="display:none;" btnAuth="LIST" onclick="doWork('LIST')"><bean:message key="List"/></button--><!--
	   --><button type="button" class="btn_normal"  onclick="doWork('SEND')"><bean:message key="EDI_Send"/></button>
	   </div>
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
		<div class="opus_design_inquiry ">
			<h3 class="title_design"><bean:message key="Vessel_Information"/></h3>
			<table>
				<colgroup>
					<col width="70">
					<col width="220">
					<col width="80">
					<col width="150">
					<col width="130">
					<col width="80">
					<col width="40">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Liner"/></th>
						<td>
							 <input type="text"   name="lnr_trdp_cd" maxlength="20" value= "<bean:write name="amsVO" property="lnr_trdp_cd"/>" onKeyDown="codeNameAction('trdpCode_sea_liner',this, 'onKeyDown');"  class="search_form" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" ><!-- 
                         --><input type="text"   name="lnr_trdp_nm" maxlength="50" value="<bean:write name="amsVO" property="lnr_trdp_nm"/>" onblur="strToUpper(this);" class="search_form"  readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;"  >
						</td>
						<th><bean:message key="VSL_VOY"/></th>
	                    <td><!-- 
	                     --><input type="text" name="f_vsl_nm"  value="<bean:write name="amsVO" property="trnk_vsl_nm"/>" style="ime-mode:disabled;text-transform:uppercase;width:180px" class="search_form-disable" tabindex="-1" readOnly/><!--
	                     --><input type="text" name="f_voy_cd"  value="<bean:write name="amsVO" property="trnk_voy"/>" style="ime-mode:disabled;text-transform:uppercase;width:60px" class="search_form-disable" tabindex="-1" readOnly  />
	                        <input type="hidden" name="f_snd_voy_cd"   style="ime-mode:disabled;text-transform:uppercase;width:60px" class="search_form-disable" tabindex="-1" readOnly  />
	                     	<input type="hidden" name="f_vsl_cd"  value="<bean:write name="amsVO" property="vsl_cd"/>" /></td>
						<th><bean:message key="Vessel"/> <bean:message key="Nationality"/></th>
	                    <td><input type="text" name="f_cnt_cd" value="<bean:write name="amsVO" property="cnt_cd"/>"  dataformat="excepthan" style="ime-mode:disabled;width:30px;text-transform:uppercase;" class="search_form"  required onBlur="strToUpper(this);" tabindex="-1"  maxlength="2"><!--
	                    --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openAmsEdiPopUp('VESSEL_POPLIST',this)"></button>
	                    </td>
<%-- 						<th><bean:message key="POL"/></th>
	                    <td><!-- 
	                     --><input type="text" name="f_ams_pol_cd"  maxlength="5" value="<bean:write name="amsVO" property="ams_pol_cd"/>"  class="search_form-disable" tabindex="-1" readOnly style="ime-mode:disabled; text-transform:uppercase;width:60px;" /><!-- 
	                     --><input type="text" name="f_pol_nm"  value="<bean:write name="amsVO" property="pol_nm"/>" style="ime-mode:disabled;text-transform:uppercase;width:170px" class="search_form-disable" tabindex="-1" readOnly/><!-- 
	                     --><input type="hidden" name="f_pol_cd"  value="<bean:write name="amsVO" property="pol_cd"/>" ></td> --%>
						<th><bean:message key="POD"/></th>
	                    <td><!-- 
	                     --><input type="text" name="f_ams_pod_cd" maxlength="5" value="<bean:write name="amsVO" property="ams_pod_cd"/>"  class="search_form-disable" tabindex="-1" readOnly style="ime-mode:disabled; text-transform:uppercase;width:60px;"  ><!-- 
	                     --><input type="text" name="f_pod_nm" maxlength="50"  value="<bean:write name="amsVO" property="pod_nm"/>" class="search_form-disable" tabindex="-1" readOnly style="ime-mode:disabled;text-transform:uppercase;width:170px"><!-- 
	                     --><input type="hidden" name="f_pod_cd"  value="<bean:write name="amsVO" property="pod_cd"/>" ></td>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Carrier"/> <bean:message key="SCAC"/></th>
	                    <td><input type="text" name="f_snp_cd" value="<bean:write name="amsVO" property="snp_cd"/>" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-transform:uppercase;" class="search_form"  tabindex="-1" readOnly onBlur="strToUpper(this);setSnpCd(this.value)" maxlength="4"></td>
						<th><bean:message key="Action_Type"/></th>
                        <td colspan="7">
                        	<select name="f_ams_snd" style="width:150px" onChange="setAmsSnd(this.value)"><!-- 
	                         --><option value='' selected><bean:message key="Auto"/></option><!-- 
	                         --><option value='A'><bean:message key="Add"/></option><!-- 
	                         --><option value='B'><bean:message key="Amendment"/></option><!-- 
	                         --><option value='D'><bean:message key="Delete"/></option><!-- 
	                         -->
	                         </select>
	                    </td>
					</tr>
					</tbody>
				</table>
		</div>
	</div>	
	<!-- wrap_search (E) -->
    <!-- wrap_result(S) -->
	<div class="wrap_result_tab">
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="HBL_Information"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="AMS_Send_Reuslt"/></span></a></li>
	    </ul>
	
		<!-- tabLayer1 (S) -->
		<div name="tabLayer" id="tabLayer" style="display:inline">
			<div class="opus_design_inquiry">
				<div class="opus_design_grid">
				<h3 class="title_design"><bean:message key="HBL_List"/></h3>
					<div class="opus_design_btn">
						 <button type="button" class="btn_accent" onClick="doWork('EDI_BL_SAVE')"><bean:message key="Save"/></button>
					</div>		
				</div>
				<div class="opus_design_gird">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
		
			<div class="opus_design_inquiry sm" style="display:none">
				<h3 class="title_design mar_btm_8"><bean:message key="IT_Assign_Information"/></h3>
				<table>
					<colgroup>
						<col width="100">
						<col width="240">
						<col width="100">
						<col width="230">
						<col width="85">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="IT_No"/></th>
		                    <td><input type="text" name="f_it_no"  maxlength="11" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px"  class="search_form" onBlur="strToUpper(this);setItNo(this.value)"></td>
							<th><bean:message key="IT_Type"/></th>
		                    <td><!-- 
		                     --><select name="f_it_tp" style="width:220px" onChange="setItTp(this.value)"><!-- 
			                     --><option value=''></option><!-- 
			                     --><option value='61'>61:Immediate Transportation (IT)</option><!-- 
			                     --><option value='62'>62:Transportation & Exportation (T&E)</option><!-- 
			                     --><option value='63'>63:Immediate Exportation (IE)</option><!-- 
		                     --></select></td>
							<th><bean:message key="Bond_No"/></th>
		                    <td><input type="text" name="f_bond_id" maxlength="12" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" class="search_form" onBlur="strToUpper(this);setBondNo(this.value)"></td>
						</tr>
						<tr>
							<th><bean:message key="Hub_AMS_Port"/></th>
		                    <td><input type="text" name="f_hub_cd"  value="" style="width:60px" class="search_form" onKeyDown="codeNameAction('location_hub_cd',this, 'onKeyDown')" onBlur="codeNameAction('location_hub_cd',this, 'onBlur');setHubCd(this.value, frm1.f_hub_nm.value)" onChange="setHubCd(this.value, frm1.f_hub_nm.value)"><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('HUB_LOCATION_POPLIST')"></button><!-- 
		                     --><input type="text" name="f_hub_nm"  value="" style="width:128px" class="search_form" onKeyPress="if(event.keyCode==13){doWork('HUB_LOCATION_POPLIST', frm1.f_hub_nm.value);}"></td>
							<th><bean:message key="Last_USA_Port"/></th>
		                    <td colspan="3"><input type="text" name="f_usa_cd"  value="" style="width:60px" class="search_form" onKeyDown="codeNameAction('location_usa_cd',this, 'onKeyDown')" onBlur="codeNameAction('location_usa_cd',this, 'onBlur');setUsaCd(this.value, frm1.f_usa_nm.value)" onChange="setUsaCd(this.value, frm1.f_usa_nm.value)"><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('USA_LOCATION_POPLIST')"></button><!-- 
		                     --><input type="text" name="f_usa_nm"  value="" style="width:128px" class="search_form" onKeyPress="if(event.keyCode==13){doWork('USA_LOCATION_POPLIST', frm1.f_usa_nm.value);}"></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- layout_wrap(S) -->
			<div class="layout_wrap">
			    <div class="layout_vertical_2" style="width:38%">
			        <!-- opus_design_grid(S) -->
			        <div class="opus_design_grid" style="margin-right: 10px;">
			        	<h3 class="title_design pad_btm_8"><bean:message key="Container_List"/></h3>
			            <script type="text/javascript">comSheetObject('sheet2');</script>
			        </div>
			        <!-- opus_design_grid(E) -->
			    </div>
			    
				<div class="layout_vertical_2" style="width:62%">
			        <div class="opus_design_grid">
			        	<h3 class="title_design pad_btm_8"><bean:message key="Item_Information"/></h3>
						<div class="opus_design_btn">
							<button type="button" class="btn_accent" onClick="doWork('CMDT_NEW')"><bean:message key="Add"/></button><!-- 
							 --><button type="button" class="btn_accent" onClick="doWork('CMDT_SAVE')"><bean:message key="Save"/></button><!-- 
							 --><button type="button" class="btn_accent" onClick="doWork('CMDT_NEW_ALL')"><bean:message key="Add_All"/></button>
						</div>	
			            <script type="text/javascript">comSheetObject('sheet3');</script>
			        </div>
				</div>
			</div>
			<!-- layout_wrap(E) -->
		</div>
		<!-- tabLayer1 (E) -->
		<!-- tabLayer2 (S) -->
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<h3 class="title_design"><bean:message key="AMS_EDI_Result"/></h3>
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet4');</script>
			</div>
			<h3 class="title_design mar_top_8"><bean:message key="AMS_Send_History"/></h3>
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet5');</script>
			</div>
		</div>
		<!-- tabLayer2 (E) -->
		
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
	<!-- wrap_result(E) -->
</div>
    </form>
 <%
 /*
 %>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>
<%
*/
%>

