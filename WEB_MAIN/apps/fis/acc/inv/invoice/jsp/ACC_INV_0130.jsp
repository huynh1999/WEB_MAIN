<%--
=========================================================
*@FileName   : ACC_INV_0040.jsp
*@FileTitle  : Invoice List
*@Description: Invoice List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/09
*@since      : 2011/11/09

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<% 
	//WMS ACCOUNT LKH 2015.01.20
	String wmsUseFlag = (String)application.getAttribute("WMS_USE_FLAG");
	if(wmsUseFlag == null){wmsUseFlag = "N";} 
	
	//WMS3.0/4.0 버전 구분 WMS 고도화
	String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
	if(wmsUseVer == null){wmsUseVer = "";} 
%>		
	<link href="<%=CLT_PATH%>/style/css/theme_default.css" rel="stylesheet" type="text/css" />
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0130.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		//WMS ACCOUNT LKH 2015.01.20
		var wmsUseFlag = "<%=wmsUseFlag%>";
	</script>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String ofcEngNm 	= userInfo.getOfc_eng_nm();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();		
		String jo_flg 		= userInfo.getJo_flg();
		String efc_flg 		= userInfo.getEfc_flg(); //EDIT AFTER CREATING INVOICES
	%>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="btnRole"  name="valMap" property="btnRole"/>
	
	<script>
	
		var p_ref_no 	  	= '<bean:write name="valMap" property="p_ref_no"/>';
		var p_hbl_no 	  	= '<bean:write name="valMap" property="p_hbl_no"/>';
		var p_date 			= '<bean:write name="valMap" property="p_date"/>';
		var p_bnd_clss_cd	= '<bean:write name="valMap" property="p_bnd_clss_cd"/>';
		var p_biz_clss_cd	= '<bean:write name="valMap" property="p_biz_clss_cd"/>';
		
		function setupPage(){
			loadPage();
		}
		
		<!-- ###Package 코드## -->
		var PCKCD1 = '|';
		var PCKCD2 = '|';
		<% boolean isBegin = false; %>
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
		
	</script>
	
	<form name="frm1" method="POST" action="./ACC_INV_0130.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_INV_0130.clt"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<input type="hidden" name="rpt_pdf_file_nm"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<input type="hidden" id="file_name" name="file_name" 	/>
	<input type="hidden" id="title" 	name="title" 		/>
	<input type="hidden" id="rd_param" 	name="rd_param" 	/>
	
	<input type="hidden" name="s_intg_bl_seq"/>
	<input type="hidden" name="s_biz_clss_cd"/>
	
<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span>&gt;
		   <span><%=LEV2_NM%></span>&gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
            <!-- //page_title_area -->

	
<div class="over_wrap" height="100%">
	<div class="wrap_search">
	    <div class="opus_design_inquiry entry_pannel" >
						
						<table>
							<tbody>
								<colgroup>
									<col width="40">
									<col width="240">
									<col width="40">
									<col width="120">
									<col width="60">
									<col width="120">
									<col width="100">
									<col width="*">
								</colgroup>
							</tbody>
							<tr>
								<th><bean:message key="Verified_at"/></th>
								<td>
									<input style="width:75px;" required type="text" name="s_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(ComGetEvent('keycode')==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!-- 
								 --><span class="dash">~</span><!-- 
								 --><input style="width:75px;" required type="text" name="s_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(ComGetEvent('keycode')==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"><!-- 
								 --><button type="button" class="calendar ir" name="s_dt_cal" id="s_dt_cal"  onclick="doDisplay('DATE1', frm1);"></button>
								</td>
								
								<th>
									<select name="s_type" style="width:100px; font-weight: bold;" class="search_form">
										<option value="REF_NO" selected><bean:message key="Ref_No"/></option>
										<option value="MBL_NO"><bean:message key="MBL_No"/></option>
										<option value="HBL_NO"><bean:message key="HBL_No"/></option>
									</select>		
								</th>
								<td>
									<input class="input_search" required type="text" name="s_type_no" style="ime-mode:disabled; text-transform:uppercase;width:90px"  dataformat="excepthan" class="search_form">
								</td>
								
								<th><bean:message key="Mode"/></th>
								<td>
									<select name="s_mode" style="width:100px;" class="search_form">
										<option value="OE" selected><bean:message key="Ocean_Export"/></option>
										<option value="OI"><bean:message key="Ocean_Import"/></option>
									</select>		
								</td>
								<th><bean:message key="Billing_Carrier"/></th>
								<td><!--  
							    	--><input type="text" name="s_carr_trdp_cd" id="s_carr_trdp_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('CUSTOMER',this, 'onBlur')" class="search_form"><!--
							        --><button type="button" class="input_seach_btn" tabindex="-1" id="customer1" onClick="doWork('CUSTOMER_POPLIST')"></button><!-- <!--
							        --><input type="text" name="s_carr_trdp_nm" id="s_carr_trdp_nm" maxlength="100" value="" onKeyDown="custEnterAction(this)" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px" class="search_form">
			                    </td>
							</tr>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<div style="padding-top:10px;padding-bottom:30px;"><h3 class="title_design"><bean:message key="BL_LIST"/></h3></div>
			<script language="javascript">comSheetObject('sheet1');</script>			
		</div>
		<table>
	        <tr>
	            <td width="55">
	                <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	                <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
	                <paging:options name="pagingVal" defaultval="200"/>
	            </td>                               
	            <td align="center">
	                <table>
	                    <tr>
	                        <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
	                        </td>
	                    </tr>
	                </table>        
	            </td>
	            <td width="55"></td>
	        </tr>
	    </table>
		<div class="layout_wrap">
		    <div class="layout_vertical_2">
					<!-- opus_design_grid(S) -->
					<div class="opus_design_grid"  id="mainTable">
				        <div style="padding-top:10px;padding-bottom:20px;"><h3 class="title_design"><bean:message key="Invoice_List"/></h3></div>
				        <div class="opus_design_grid">
					        <script type="text/javascript">comSheetObject('sheet2');</script>
					        <!-- opus_design_grid(E) -->
					    </div>
					</div>
					<!-- opus_design_grid(E) -->
		    </div>
		    <div class="layout_vertical_2 pad_left_8">
					<!-- opus_design_grid(S) -->
					<div class="opus_design_grid"  id="mainTable">
					        <div style="padding-top:10px;padding-bottom:20px;"><h3 class="title_design"><bean:message key="Show_Contr_List"/></h3></div>
					        <div class="opus_design_grid">
					            <script type="text/javascript">comSheetObject('sheet3');</script>
					        </div>
					</div>
					<!-- opus_design_grid(E) -->
		    </div>
		</div>  
        
     </div>
</div>
	</form>
	
<script type="text/javascript">
</script>	
<input type="hidden" id="returnFunc" />		


