<%--
=========================================================
*@FileName   : SEE_DOC_1030.jsp
*@FileTitle  : LOAD PLAN
*@Description: LOAD PLAN
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/12/12
*@since      : 2011/12/12

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/27
*@since      : 2014/06/27
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/masterbl/script/SEE_DOC_1030.js?ver=<%=CLT_JS_VER%>" ></script>
	
	<bean:define id="mblVO"   name="EventResponse" property="objVal"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	
	<script>
		function setSelect(){
			var formObj = document.frm1;
		}
		function setupPage(){
			loadPage();
			setSelect();
		}
		var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	</script>
<form name="frm1" method="POST" action="./SEE_DOC_1030.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_email" value="<%= email %>"/>
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input type="hidden" name="f_ofc_locl_nm" value="<%= ofcLoclNm %>"/>
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input type="hidden" name="f_intg_bl_seq" value = "<bean:write name="mblVO" property="intg_bl_seq"/>">
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- 
		   	<button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!-- 
			--><button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" 	class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
			--><button type="button" btnAuth="CLEAR" 	class="btn_normal" onclick="clearAll()"><bean:message key="Clear"/></button> 
			--%>
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
	<!-- Search option -->
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="60">
					<col width="180">
					<col width="70">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Ref_No"/></th>
						<td>
							<input name="s_ref_no" maxlength="20" value="<bean:write name="mblVO" property="ref_no"/>" type="text" class="search_form" style="width:130px;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
						--><button type="button" class="input_seach_btn" tabindex="-1" onclick="openPopUp('REF_POPLIST',this)"></button>
						</td>
						<th><bean:message key="MBL_No"/></th>
						<td>
							<input name="s_mbl_no"  maxlength="40" value="<bean:write name="mblVO" property="mbl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
						--><button type="button" class="input_seach_btn" tabindex="-1" onclick="openPopUp('MBL_POPLIST',this)"></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">	
	<div class="layout_vertical_3 sm" style="height:185px;width:370px;" id="layoutVertical1">
		<div class="opus_design_inquiry">
              <table>
              	<colgroup>
					<col width="110">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th valign="top"><bean:message key="Agent"/></th>
						<td><textarea name="f_agent" class="search_form autoenter_50px" dataformat="excepthan" style="width:250px;height:80px;"  WRAP="off" readOnly><bean:write name="mblVO" property="agent_addr"/></textarea>
						</td>
					</tr>
                    <tr>
                        <th valign="top"><bean:message key="Warehouse"/></th>
                        <td><textarea name="f_warehouse" class="search_form autoenter_50px" dataformat="excepthan" style="width:250px;height:80px;"  WRAP="off" readOnly><bean:write name="mblVO" property="warehouse_addr"/></textarea>
                        </td>
                    </tr>
                   </tbody>
              </table>
    	</div>
    </div>
    <div class="layout_vertical_3 sm mar_left_4" style="height:185px;width:380px;" id="layoutVertical2">
		<div class="opus_design_inquiry">
              <table>
              	<colgroup>
					<col width="110">
					<col width="*">
				</colgroup>
				<tbody>
                  <tr>
                      <th><bean:message key="Ref_No"/></th>
                      <td><input type="text" name="f_ref_no" maxlength="20" value="<bean:write name="mblVO" property="ref_no"/>" style="width:250px" class="search_form-disable" readOnly></td>
                  </tr>
                  <tr>
                       <th><bean:message key="Vessel_Voyage"/></th>
                       <td><!-- 
	            		 --><input type="text" name="f_vsl_voy_nm" value="<bean:write name="mblVO" property="trnk_vsl_nm"/>" style="width:150px" class="search_form-disable" readOnly><!--
	            		 --><input type="text" name="f_vsl_voy" value="<bean:write name="mblVO" property="trnk_voy"/>" style="width:97px" class="search_form-disable" readOnly>
                       </td>
                   </tr>
                   <tr>
                        <th><bean:message key="POL"/></th>
                        <td><input type="text" name="f_pol" value="<bean:write name="mblVO" property="pol_nm"/>" style="width:250px" class="search_form-disable" readOnly></td>
                    </tr>
                    <tr>
                        <th><bean:message key="POD"/></th>
                        <td><input type="text" name="f_pod" value="<bean:write name="mblVO" property="pod_nm"/>" style="width:250px" class="search_form-disable" readOnly></td>
                        
                    </tr>
                    <tr>
                        <th><bean:message key="F_Dest"/></th>
                        <td><input type="text" name="f_f_dest" value="<bean:write name="mblVO" property="fnl_dest_loc_nm"/>" style="width:250px" class="search_form-disable" readOnly></td>
                    </tr>
                   </tbody>
              </table>
    	</div>    
    </div>
    <div class="layout_vertical_3 sm mar_left_4" style="height:185px; width:calc(100% - 758px)" id="layoutVertical3">
		<div class="opus_design_inquiry">
              <table>
              	<colgroup>
					<col width="110">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
                      <th><bean:message key="Liner_Bkg_No"/></th>
                      <td><input type="text" name="f_bkg_no" value="<bean:write name="mblVO" property="bkg_no"/>" style="width:250px" class="search_form-disable" readOnly></td>					
					</tr>
                       <th><bean:message key="Air_Line"/></th>
                       <td><input type="text" name="f_carr_nm" value="<bean:write name="mblVO" property="carr_nm"/>" style="width:250px" class="search_form-disable" readOnly></td>
					<tr>
                        <th><bean:message key="ETD"/></th>
                        <td><!-- 
	            		 --><input type="text" name="f_etd" value="<bean:write name="mblVO" property="etd_dt_tm"/>" style="width:73px" class="search_form-disable" readOnly>
                        </td>					
					</tr>
					<tr>
                        <th><bean:message key="ETA"/></th>
                        <td><!-- 
	            		 --><input type="text" name="f_eta" value="<bean:write name="mblVO" property="eta_dt_tm"/>" style="width:73px" class="search_form-disable" readOnly>
                        </td>						
					</tr>
					<tr>
                        <th><bean:message key="Cntr_No"/></th>
                        <td><input type="text" name="f_cntr_no" value="" style="width:250px" class="search_form-disable" readOnly></td>					
					</tr>
					<tr>
                        <th><bean:message key="Seal_No_Container_Size"/></th>
                        <td><!--
				             --><input type="text" name="f_seal_no" value="" style="width:150px" class="search_form-disable" readOnly><!--
				             --><input type="text" name="f_tpsz_no" value="" style="width:97px" class="search_form-disable" readOnly>
                        </td>					
					</tr>
                   </tbody>
              </table>
    	</div>     
    </div>
        <table class="line_bluedot"><tr><td></td></tr></table>
	   	<div class="opus_design_grid">
	   		<script type="text/javascript">comSheetObject('sheet1');</script>
			<div class="opus_design_inquiry pad_top_8">
			   	<table>
			   		<colgroup>
						<col width="50">
						<col width="110">
						<col width="30">
						<col width="80">
						<col width="50">
						<col width="160">
						<col width="60">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Total"/></th>
				            <td><input type="text" name="f_total" value="" style="width:100px;text-align:right" class="search_form-disable" readOnly></td>
							<th><bean:message key="Q_ty"/></th>
				            <td><input type="text" name="f_qty_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly></td>
							<th><bean:message key="Weight"/></th>
				            <td><!-- 
								 --><input type="text" name="f_wgt_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly><!--
								 --><input type="text" name="f_wgt1_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly>
							</td>
							<th><bean:message key="Measure"/></th>
							<td><!-- 
								 --><input type="text" name="f_meas_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly><!--
								 --><input type="text" name="f_meas1_tot" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="line_bluedot"><tr><td></td></tr></table>
				<div>
					<h3 class="title_design mar_btm_8"><bean:message key="Remark_Special_Instruction"/></h3>
					<table>
		                <tr>
		                 	<td nowrap class="table_search_body">
		     				    <textarea name="f_remark" maxlength="788" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);if(!checkTxtAreaLn(this, 156, 5, 'Remark/Special Instruction'))this.focus();" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:960px;height:70px;"></textarea>
		                    </td>
		                </tr>
				  	</table>
				</div>
			  </div>
			<script type="text/javascript">comSheetObject('sheet2');</script>
	   	</div>
   </div>
</div>   
</form>
		
<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	

