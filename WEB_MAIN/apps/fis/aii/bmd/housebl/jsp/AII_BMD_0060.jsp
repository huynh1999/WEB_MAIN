<%--
=========================================================
*@FileName   : AII_BMD_0060.jsp
*@FileTitle  : HAWB Search  
*@Description: HWAB 목록 조회
*@author     : Kang,Jung-Gu 
*@version    :
*@since      :

*@Change history:
*@author     : Tuan.Chau 
*@version    : 2.0
*@since      : 2014-06-17
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/aii/bmd/housebl/script/AII_BMD_0060.js?ver=<%=CLT_JS_VER%>"></script>

	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		String phon			= userInfo.getPhn();
		String fax			= userInfo.getFax();
	%>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <script language="javascript">
        var isMng = <bean:write name="valMap" property="isMng"/>;
        var ofcCd = "<%= ofc_cd %>";
        
        <!-- ###Office Info## -->
	    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
	    <bean:define id="ofcVO" name="officeInfo"/>
	    var ai_cgor_pic_info = "<bean:write name="ofcVO" property="ai_cgor_pic_info"/>";
	    
    </script>
    <script>
    
	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var edob_flg = "<%= userInfo.getEdob_flg() %>";
	var uod_flg ="<%= userInfo.getUod_flg()%>"
	var usrDept = "<%=userInfo.getDept_cd()%>";
	var usrId = "<%= userInfo.getUsrid() %>";
	var usrNm = "<%= userInfo.getUser_name() %>";
	function setupPage(){
		initFinish();
		loadPage();
	}
	</script>
<form name="frm1" method="POST" action="./AII_BMD_0060.clt">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_CurPage"> 
	<input type="hidden" name="intg_bl_seq" value="">
	<input type="hidden" name="rlt_intg_bl_seq" value="">
	
	<input type="hidden" name="s_intg_bl_seq" value="">
	<input type="hidden" name="master_bl_no"  value=""> 
	<input type="hidden" name="house_bl_no"   value="">
	
	<!--  PRINT용 2011/12/07 Chungrue 추가 -->
	<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq" />
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input	type="hidden" name="f_phon" value="<%= phon %>"/>
	<input	type="hidden" name="f_fax" value="<%= fax %>"/>
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="AII_BMD_0060.clt"/>
	
	<!--  Document List ==> Common Memo 연동 파라미터 (S) -->
    <input type="hidden" name="palt_mnu_cd" id="palt_mnu_cd" />
    <input type="hidden" name="opr_no" id="opr_no" />
	<!--  Document List ==> Common Memo 연동 파라미터 (E) -->
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />	
	<input type="hidden" name="rpt_pdf_file_nm"/>
	
	<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />
				<!--#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청 -->
	<input type="hidden" name="rpt_file_name_title"/>
	
	<input id="linkFlag" name="linkFlag"  value="<bean:write name="valMap" property="linkFlag"/>" type="hidden" />
	
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>

			   <!-- btn_div -->
			   <div class="opus_design_btn TOP">
			   		<%-- 
				    <button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button>
					<button type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" class="btn_normal" onclick="doWork('NEW')"><bean:message key="New"/></button>
					<button type="button" btnAuth="CLEAR" class="btn_normal" onclick="clearAll();"><bean:message key="Clear"/></button>
					<button type="button" btnAuth="COPY" class="btn_normal" id="btnCopy" onclick="doWork('HAWB_COPY');"><bean:message key="Copy"/></button>
					<button type="button" btnAuth="ACCOUNTING" class="btn_normal" id="btnAccounting"  onclick="doWork('GOTOACCT');"><bean:message key="Accounting"/></button>
					<button type="button" btnAuth="B_AN" class="btn_normal" onclick="doWork('ArrivalNotice');"><bean:message key="B.AN"/></button>
					<button type="button" btnAuth="P_CL" class="btn_normal" onClick="doWork('PreliminaryClaim');"><bean:message key="P.CL"/></button>
					<button type="button" btnAuth="CCN" class="btn_normal" onclick="doWork('CCN');"><bean:message key="CCN"/> <bean:message key="Print"/></button>
					<button type="button" style="cursor:hand; display:none;" btnAuth="B_DO" 	class="btn_normal" onclick="doWork('DELIVERY_ORDER');"><bean:message key="B.DO"/></button>
					<button type="button" btnAuth="REL_ORDER" class="btn_normal" onclick="doWork('RELEASE_ORDER');"><bean:message key="REL_Order"/></button>
					<button type="button" btnAuth="B_IT_TE" class="btn_normal" onclick="doWork('ITNTE');"><bean:message key="B.IT_TE"/></button>
					<button type="button" btnAuth="POD" class="btn_normal" onclick="doWork('P_O_D');"><bean:message key="POD"/></button>
					<button type="button" btnAuth="C_CERTIFICATE" class="btn_normal" onclick="doWork('CERTIFICATE');"><bean:message key="C.Certificate"/></button>
					<button type="button" btnAuth="B_AUTHORITY" class="btn_normal" onclick="doWork('AUTHORITY');"><bean:message key="B.Authority"/></button>
					<button type="button" btnAuth="P_REPORT" class="btn_normal" onclick="doWork('PROFIT_REPORT');"><bean:message key="P_Report"/></button>
					<button type="button" btnAuth="LOG" class="btn_normal" onclick="doWork('LOG');"><bean:message key="LOG"/></button>
					<button type="button" btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" onclick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button>
					<button id="btnDelete" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" 	class="btn_normal" onclick="doWork('DELETE');"><bean:message key="Delete"/></button>
					<button type="button" btnAuth="PU_DI" class="btn_normal" onclick="doWork('WORK_ORDER');"><bean:message key="PU_DI"/></button>
			   		<button type="button" class="btn_normal" onClick="doWork('CARGO_TRACKING');"><bean:message key="Tracking"/></button>
					 --%>
			   </div>

	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<!-- Search option -->
<div class="over_wrap" height="100%">
    <div class="wrap_search">	
		<div class="opus_design_inquiry  src_pannel">
			<table>
				<colgroup>
			        <col width="100">
		        	<col width="110">
		        	<col width="120">
		        	<col width="100">
		        	<col width="140">
		        	<col width="60">
		        	<col width="105">
		        	<col width="*">
			    </colgroup>
			    <tbody>	    			
                 <tr>
                     <th><bean:message key="Ref_No"/></th>
                     <td>
                         <input type="text" name="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onkeydown="entSearch();"/>
                     </td>   
                     <th><bean:message key="MAWB_No"/></th>
                     <td>
                         <input type="text" name="f_mbl_no" maxlength="40" value='<bean:write name="valMap" property="f_mbl_no"/>'   dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onkeydown="entSearch();"/>
                     </td>                                   
                     <th><bean:message key="HAWB_No"/></th>
                     <td>
                         <input type="text" name="f_hbl_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onkeydown="entSearch();"/>
                     </td>
                	 <th><bean:message key="Office"/></th>
                     <td class="table_search_body"><!--
                      --><div id="div_subcode"><!--
                      --><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
                      --><input  type="hidden" name="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/><!--
                      --><select name="f_ofc_cd"  style="width:140px;"/><!--
                      --><bean:size id="len" name="oficeList" /><!--
                      --><logic:greaterThan name="len" value="1"><!--
                      --><option value=''>ALL</option><!--
                      --></logic:greaterThan><!--
                      --><logic:iterate id="ofcVO" name="oficeList"><!--
                      --><logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" ><!--
                      --><option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option><!--
                      --></logic:equal><!--
                      --><logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" ><!--
                      --><option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option><!--
                      --></logic:notEqual><!--
                      --></logic:iterate><!--
                      --></select><!--
                      --></div>
                     </td>     
                 </tr>
					</tbody>
				</table>
				<span class="buttonset fr">
					<button type="button" class="de-search" id="logDetailSearch">Detailed Search</button>
				</span>
             </div>
        <div class="opus_design_inquiry tbl_pannel">
				<table>	
				<colgroup>
			        <col width="105">
		        	<col width="100">
		        	<col width="90">
		        	<col width="190">
		        	<col width="180">
		        	<!-- OFVFOUR-7264 [SOUTH EAST WORLD WIDE] ADDING PO NO. SEARCH OPTION IN OIH B/L LIST -->
		        	<col width="70">
		        	<col width="100">
		        	<col width="200">
					<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
					<col width="110">
		        	<col width="*">	
		        </colgroup>	       
		        	 <tbody>
                 <tr>
                     <th><bean:message key="Consignee"/></th>
                     <td class="table_search_body"><!--
                      --><input type="text" name="f_cnee_trdp_nm" id="f_cnee_trdp_nm" maxlength="50"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('CNEE_TRDP_POPLIST', frm1.f_cnee_trdp_nm.value);}"/><!--
                      --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CNEE_TRDP_POPLIST')"></button>
                     </td>     
                     <th><bean:message key="Customer"/></th>
                     <td class="table_search_body"><!--
                      --><input type="text" name="f_ahpr_trdp_nm" maxlength="50"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('ACNEE_TRDP_POPLIST', frm1.f_ahpr_trdp_nm.value);}"/><!--
                      --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('ACNEE_TRDP_POPLIST')"></button>
                     </td>
                     <td align="right"><!-- 
                          --><select name="f_tp_type" id="f_tp_type"  style="width:135px; font-weight: bold;" onChange="searchValueClear(this);"><!--
						    --><option selected='selected'value='SHP'><bean:message key="Shipper"/></option><!--
						    --><option value='PRNR'><bean:message key="Partner"/></option><!--
						    --><option value='NOT'><bean:message key="Notify"/></option><!--
						--></select><!--
				  	        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('PRNR2_TRDP_POPLIST')"></button><!--
				  	        --><input type="text" name="f_trdp_nm" id="f_trdp_nm" maxlength="50"  class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){doWork('PRNR2_TRDP_POPLIST', frm1.f_trdp_nm.value);}"/>
                     </td>
                     <!-- OFVFOUR-7264 [SOUTH EAST WORLD WIDE] ADDING PO NO. SEARCH OPTION IN OIH B/L LIST -->
	                 <th><bean:message key="PO_No"/></th>
		             <td>
		                 <input type="text" id="f_po_no" name="f_po_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
		             </td> 
                     <td>
						<select name="f_date_type" id="f_date_type"  style="width:130px; font-weight: bold;" onChange="searchValueClear(this);">
							<option value='ETA' checked><bean:message key="ETA"/></option>
							<option value='FEA'><bean:message key="F_ETA"/></option>
							<option value='ETD'><bean:message key="ETD"/></option>
							<option value='PDT'><bean:message key="Post_Date"/></option>
						</select><!--
						--><input type="text" id="f_strdt" name="f_strdt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_enddt);mkDateFormatType(this,event,true,1);" onFocus="select();"><span class="dash">~</span><!--
						--><input type="text" id="f_enddt" name="f_enddt" style="width:75px;" size='10' maxlength="10" class="search_form" dataformat="mdy" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_strdt, this);mkDateFormatType(this,event,true,1);" onFocus="select();">
					</td>
					<td><button type="button" class="calendar" tabindex="-1" name="f_strdt_cal" id="f_strdt_cal" onclick="doDisplay('DATE11', frm1);"></button></td>
					 <!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
					 <th style="text-align:center; width:80px;"><bean:message key="Commodity"/></th>
					 <td>
						 <input type="text" id="f_cmdt_nm" name="f_cmdt_nm" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
						 <button type="button" name="commodity" id="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button>
						 <input type="hidden" id="f_cmdt_cd" name="f_cmdt_cd" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
					 </td>
				 	</tr>
					</tbody>
				</table>
				
               </div>       
            <div class="opus_design_inquiry tbl_pannel">
			<table id="searchMore" style="display: none;">	
				<colgroup>
			        <col width="105">
		        	<col width="160">
		        	<col width="93">
		        	<col width="160">
		        	<col width="93">
		        	<col width="160">
		        	<col width="85">
		        	<col width="160">
		        	<col width="85">
		        	<col width="*">
			   </colgroup>
			     <tbody>								
				 
                 <tr>
					<th><bean:message key="Incoterms"/></th>
						<td><bean:define id="incotermsList" name="valMap" property="incotermsList"/>
							<select name="f_inco_cd" style="width:52px">
								<option value=''>ALL</option>
								<logic:iterate id="comVO" name="incotermsList">
								<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>
								</logic:iterate>
							</select>
						</td>
                    <td align="right"><!-- 
                        --><select name="f_search_no_tp" id="f_search_no_tp"  style="width:135px; font-weight: bold;" onChange="frm1.f_search_no.value=''"> 
									  <option value="LC"><bean:message key="LC_No"/></option>
                                      <option value="INV"><bean:message key="Invoice_No"/></option>
                                      <option value="LNR_BKG_NO"><bean:message key="Liner_Bkg"/></option>
                                      <option value="EXP_REF_NO"><bean:message key="Export_Reference_No"/></option>
						   </select><!-- 
                                   --><input id="f_lc_no" name="f_lc_no" value="" type="hidden" /><!-- 
                                    --><input id="f_inv_no" name="f_inv_no" value="" type="hidden" /><!-- 
                                    --><input id="f_lnr_bkg_no" name="f_lnr_bkg_no" value="" type="hidden" /><!-- 
                                    --><input id="f_exp_ref_no" name="f_exp_ref_no" value="" type="hidden" />
						
					</td>
                     <td>
                         <input type="text" name="f_search_no" id="f_search_no" maxlength="50"  class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" onkeydown="entSearch();"> 
                     </td>		
              	     <th><bean:message key="CCN"/></th>
                     <td><input type="text" name="f_ccn_no" maxlength="30" value=''  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/></td>
					 <th><bean:message key="BL_Type"/></th>
                     <td class="table_search_body"><!--
                      --><bean:define id="blTypeList" name="valMap" property="blTypeList"/><!--
                      --><select name="f_hbl_tp_cd"  style="width:125px;"><!--
                      --><option value="">ALL</option><!--
                      --><logic:iterate id="bltypeVO" name="blTypeList"><!--
                      --><option value='<bean:write name="bltypeVO" property="cd_val"/>'><bean:write name="bltypeVO" property="cd_nm"/></option><!--
                      --></logic:iterate><!--
                      --></select>
                     </td>         
                	 <!-- th><bean:message key="Issued_By"/></th-->
					 <td align="right"><!-- 
                       --><select name="f_isb_pic_sel_cd" id="f_isb_pic_sel_cd"  style="width:100px; font-weight: bold;" onChange="searchValueClear(this);"><!--
					    --><option value='OR'><bean:message key="Issued_By"/> Or <bean:message key="Sales_PIC"/></option><!--
					    --><option value='ISB'><bean:message key="Issued_By"/></option><!--
					    --><option value='PIC'><bean:message key="Sales_PIC"/></option><!--
					     --></select>
					 </td>                	 
				     <td>
					     <input type="text" name="opr_usrid" style="width:110px;"><!-- 
						  --><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="doWork('OPR_POPLIST')"></button>
					 </td>
                 </tr>
                 <tr>
                 	 <th><bean:message key="PCS"/></th>
                     <td class="table_search_body"><!--
                      --><input type="text" name="fm_pck_qty"  onKeyPress="ComKeyOnlyNumber(this)" dataformat="excepthan" style="ime-mode isabled;width:55px;" onchange="copyPckQty();"/><span class="dash">~</span><!--
                      --><input type="text" name="to_pck_qty"  onKeyPress="ComKeyOnlyNumber(this)" dataformat="excepthan" style="ime-mode isabled;width:55px;"/>
                     </td>
                     <td align="right"><!-- 
						--><select name="f_grs_wgt_sel_cd" id="f_grs_wgt_sel_cd"  style="font-weight: bold;" onChange="searchValueClear(this);"><!--
						--><option value='KG'><bean:message key="GWeight_K"/></option><!--
						--><option value='LG'><bean:message key="GWeight_L"/></option><!--
						--></select>
						</td>
                     <td class="table_search_body"><!--
                      --><input type="text" name="fm_grs_wgt"  onKeyPress="ComKeyOnlyNumber(this, '.')" dataformat="excepthan" style="ime-mode isabled;width:55px;" onchange="copyGrsWgt();"/><span class="dash">~</span><!--
                      --><input type="text" name="to_grs_wgt"  onKeyPress="ComKeyOnlyNumber(this, '.')" dataformat="excepthan" style="ime-mode isabled;width:55px;"/>
                     </td>  
                     <th><bean:message key="CBM"/></th>
                     <td class="table_search_body" colspan=20><!--
                      --><input type="text" name="fm_meas"  onKeyPress="ComKeyOnlyNumber(this, '.')" dataformat="excepthan" style="ime-mode isabled;width:55px;" onchange="copyMeas();"/><span class="dash">~</span><!--
                      --><input type="text" name="to_meas"  onKeyPress="ComKeyOnlyNumber(this, '.')" dataformat="excepthan" style="ime-mode isabled;width:55px;"/>
                     </td> 
                     <td></td><td></td>                           
                 </tr>
                 <tr>
              		 <th><bean:message key="Flight_No"/></th>
                     <td>
                         <input type="text" name="f_flt_no" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeydown="entSearch();"/>
                     </td>
                     <th><bean:message key="Departure"/></th>
                     <td class="table_search_body"><!--
                      --><input type="text"   name="f_pol_cd"  maxlength="5"   value=''  onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/><!--
                      --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
                      --><input type="text"   name="f_pol_nm" maxlength="50"   dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:127px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
                     </td>                     
                     <th><bean:message key="Destination"/></th>
                     <td class="table_search_body"><!--
                      --><input type="text"   name="f_pod_cd"  maxlength="5"   value=''  onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/><!--
                      --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                      --><input type="text"   name="f_pod_nm" maxlength="50"   style="width:127px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                     </td>
                     <th><bean:message key="F_Dest"/></th>
                     <td class="table_search_body"><!--
                      --><input type="text" name="fnl_dest_loc_cd" maxlength="5" value=''  onKeyDown="codeNameAction('location_dest',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('location_dest',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                      --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('FNL_LOCATION_POPLIST')"></button><!--
                      --><input type="text" name="fnl_dest_loc_nm" maxlength="50"   style="width:127px;" onKeyPress="if(event.keyCode==13){doWork('FNL_LOCATION_POPLIST', frm1.fnl_dest_loc_nm.value);}"/>
                         <input type="hidden" name="proc_usrnm" class="search_form-disable" readOnly style="width:120px;">
                         <input type="hidden" name="opr_usrnm">
						 <input type="hidden" name="opr_ofc_cd">
						 <input type="hidden" name="opr_dept_cd">
						 <input type="hidden" name="sls_tp_cd">
                      </td>
						<td></td><td></td>
                </tr>
                                           
					 <!--th><bean:message key="Notify"/></th>
                     <td class="table_search_body">
                      <input type="text" name="f_ntfy_trdp_nm" maxlength="50"  dataformat="multiLanguage" style="<%--=MULTI_IMEMODE--%>text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('NTFY_TRDP_POPLIST', frm1.f_ntfy_trdp_nm.value);}"/>
                      <button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('NTFY_TRDP_POPLIST')"></button>
                     </td>
                     <th><bean:message key="Post_Date"/></th>
                     <td>  
					    <input style="width:75px" type="text" name="post_strdt" id="post_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.post_enddt);firCalFlag=false;" size='10' maxlength="10" class="search_form"><span class="dash">~</span> 
					    <input style="width:75px" type="text" name="post_enddt" id="post_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.post_strdt, this);firCalFlag=false;" size='10' maxlength="10" class="search_form"> 
					    <button type="button" class="calendar" tabindex="-1" name="post_dt_cal" id="post_dt_cal" onclick="doDisplay('DATE14', frm1);"></button>
					 </td>

                     <th><bean:message key="ETA"/></th>
                     <td class="table_search_body">
                     	<input type="text" name="eta_strdt" id="eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.eta_enddt);firCalFlag=false;" size='10' maxlength="10" style="width:75px;" ><span class="dash">~</span> 
                        <input type="text" name="eta_enddt" id="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.eta_strdt, this);firCalFlag=false;" size='10' maxlength="10" style="width:75px;" > 
                        <button id="eta_dt_cal" type="button" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button>
                     </td>
					
                     <th><bean:message key="Partner"/></th>
                     <td class="table_search_body">
                         <input type="text" name="f_prnr_trdp_nm" maxlength="50"  dataformat="multiLanguage" style="<%--=MULTI_IMEMODE--%>text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('PRNR_TRDP_POPLIST', frm1.f_prnr_trdp_nm.value);}"/> 
                         <button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('PRNR_TRDP_POPLIST')"></button></td>

                     <th><bean:message key="F_ETA"/></th>
                     <td class="table_search_body"> 
                         <input type="text" name="f_eta_strdt" id="f_eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_eta_enddt);firCalFlag=false;" size='10' maxlength="10" style="width:75px;"><span class="dash">~</span>
                         <input type="text" name="f_eta_enddt" id="f_eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_eta_strdt, this);firCalFlag=false;" size='10' maxlength="10" style="width:75px;">
                         <button id="f_eta_dt_cal" type="button" onclick="doDisplay('DATE12', frm1);" class="calendar" tabindex="-1"></button>
                     </td>
                     <th><bean:message key="Shipper"/></th>
                     <td class="table_search_body">
                         <input type="text" name="f_shpr_trdp_nm" maxlength="50"  dataformat="multiLanguage" style="<%--=MULTI_IMEMODE--%>text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('SHIP_TRDP_POPLIST', frm1.f_shpr_trdp_nm.value);}"/> 
                         <button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('SHIP_TRDP_POPLIST')"></button>
                     </td>
                     <th><bean:message key="Customs_Broker"/></th>
                     <td class="table_search_body">
                         <input type="text" name="f_cust_trdp_nm" maxlength="50"  dataformat="multiLanguage" style="<%--=MULTI_IMEMODE--%>text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('CUST_TRDP_POPLIST', frm1.f_cust_trdp_nm.value);}"/> 
                         <button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CUST_TRDP_POPLIST')"></button>
                     </td>

                     <th><bean:message key="ETD"/></th>
	                 <td class="table_search_body"> 
	                     <input type="text" name="etd_strdt" id="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='10' maxlength="10" style="width:75px;" ><span class="dash">~</span> 
	                     <input type="text" name="etd_enddt" id="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" style="width:75px;" > 
	                     <button type="button" id="etd_dt_cal" onclick="doDisplay('DATE13', frm1);" class="calendar" tabindex="-1"></button>
	                 </td>

                     <td></td>
                	 <td></td-->
                </tbody>
             </table>
		</div>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_inquiry">	
	    	<div class="opus_design_grid">
	    		<h3 class="title_design"><bean:message key="HAWB_List"/></h3>
			   <!-- btn_div -->	    		
				<div class="opus_design_btn"> 
					<button  onClick="setHblSizeUp(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Plus"/></button>
					<button onClick="setHblSizeDown(docObjects[0])" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Minus"/></button></td>
				</div>
		    	<script language="javascript">comSheetObject('sheet1');</script>
		    </div>
	    	<table>
                  <tr>
                      <td width="60px"><!--
                    --><bean:define id="pagingVal" name="valMap"     property="paging"/><!--
                    --><paging:options name="pagingVal" defaultval="200"/></td>
                      <td align="center"><!--
                    --><table  border="0" width="100%"><!--
                    --><tr><!--
                    --><td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td><!--
                    --></tr><!--
                    --></table></td>
                  </tr>
              </table>
	    </div>
    	<h3 class="title_design mar_top_8"><bean:message key="MAWB_List"/></h3>
		<div class="opus_design_grid">
	    	<script language="javascript">comSheetObject('sheet2');</script>
	    </div>
    	
    	<div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>
    	
	</div>
</div>
</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		

