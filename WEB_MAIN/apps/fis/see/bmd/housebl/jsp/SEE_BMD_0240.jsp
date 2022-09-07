<%--
=========================================================
*@FileName   : SEE_BMD_0240.jsp
*@FileTitle  : DOCK RECEIPT #52445
*@Description: DOCK RECEIPT [CBM] HOUSE BL LEVEL에서도 DOC RECEIPT 내용 수정 후 PRINT 가능하도록
*@author     : CYBERLOGITEC
*@version    : 1.0 - 2013/02/27
*@since      : 2016

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/housebl/script/SEE_BMD_0240.js?ver=<%=CLT_JS_VER%>"></script>
    
	<bean:define id="valMap" name="EventResponse" 	property="mapVal"/>
	<bean:define id="coVO"   name="valMap" 			property="coInfo"/>
	<bean:parameter name="air_sea_clss_cd" 	id="air_sea_clss_cd" 	value= ""/>
	<bean:parameter name="bnd_clss_cd" 		id="bnd_clss_cd" 		value =""/>
	<bean:parameter name="biz_clss_cd" 		id="biz_clss_cd" 		value=""/>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String phn = userInfo.getPhn();
		String fax = userInfo.getFax();
		String cnt_cd = userInfo.getOfc_cnt_cd();
	%>

	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		function setupPage(){
	    	loadPage();
	    }
	</script>

<form name="frm1" method="POST" action="./SEE_BMD_0180.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="rpt_biz_tp">
	<input type="hidden" name="rpt_biz_sub_tp">
	<input type="hidden" name="f_ref_no">
	
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	<input	type="hidden" name="f_phn"    value="<%= phn %>"/>
	<input	type="hidden" name="f_fax"    value="<%= fax %>"/>
	
	<input type="hidden" name="air_sea_clss_cd"  value="<bean:write name="air_sea_clss_cd"/>">
	<input type="hidden" name="bnd_clss_cd"  	 value="<bean:write name="bnd_clss_cd"/>">
	<input type="hidden" name="biz_clss_cd"  	 value="<bean:write name="biz_clss_cd"/>">
	<input type="hidden" name="intg_bl_seq"      value="<bean:write name="coVO" property="intg_bl_seq"/>"/>
    <input type="hidden" name="f_wrk_tp" 		 value="<bean:write name="coVO" property="wrk_tp"/>">
	<input type="hidden" name="save_yn"	  	     value='<bean:write name="coVO" property="save_yn"/>'/>
	<input type="hidden"   name="f_inland_trdp_cd" maxlength="20" value='<bean:write name="coVO" property="inland_trdp_cd"/>'/>
	
	
	<input name="f_inland_pic_nm" maxlength="50" type="hidden"    value='<bean:write name="coVO" property="inland_pic_nm"/>'>
	<input name="f_inland_pic_phn" maxlength="30" type="hidden"   value='<bean:write name="coVO" property="inland_pic_phn"/>'/>
	<input name="f_inland_pic_fax" maxlength="30" type="hidden"   value='<bean:write name="coVO" property="inland_pic_fax"/>'/>
	<input name="f_cnt_origin" maxlength="30" type="hidden"   value='<bean:write name="coVO" property="cnt_origin"/>'/>
	
	 
		                       	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 		   <button type="button" class="btn_accent"   onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal"   id="btnModify"  onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
		--><button type="button" class="btn_normal"  id="btnPrint"  onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_normal"  onclick="clearAll()"><bean:message key="Clear"/></button>
 --%>	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
		
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
					<colgroup> 
						<col width="80">
						<col width="*">
					</colgroup>
					<tbody> 
						<tr>
                        <th><bean:message key="HBL_No"/></th>
                        <td>
                            <input name="f_bl_no"  maxlength="40" value="<bean:write name="coVO" property="bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)"><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="initBlSeq();doWork('HBL_POPLIST')"></button>
                        </td>
                        </tr>
					</tbody>
			</table>
		</div>
	</div>
   <div class="wrap_result">
   		<div class="layout_wrap opus_design_inquiry">
   	 		<div class="layout_vertical_2 pad_right_8" style="width: 415px;">
   				<table>
                    	<colgroup>
                    		<col width="110">
                    		<col width="*">
                    	</colgroup>
                    	<tbody>
	                        <tr>
	                            <th><bean:message key="Shipper_Exporter"/></th>
	                            <td>
						            <textarea name="f_seller" class="search_form" dataformat="excepthan" style="width:300px;height:80px;" onblur="strToUpper(this);"><bean:write name="coVO" property="seller_addr"/></textarea>
	                            </td>
		                     </tr>
	                        <tr>
	                            <th><bean:message key="Consignee"/></th>
	                            <td>
						            <textarea name="f_consignee" class="search_form" dataformat="excepthan" style="width:300px;height:80px;" onblur="strToUpper(this);"><bean:write name="coVO" property="cnee_addr"/></textarea>
	                            </td>
	                        </tr>
	                        <tr>
	                            <th><bean:message key="Notify_Party"/></th>
	                            <td>
						            <textarea name="f_notify" class="search_form" dataformat="excepthan" style="width:300px;height:80px;" onblur="strToUpper(this);"><bean:write name="coVO" property="notify_addr"/></textarea>
	                            </td>
	                        </tr>
	                        
	                         
                        </tbody>
                    </table>
   			</div>
   			<div class="layout_vertical_2">
   				<table>
   					<colgroup>
   						<col width="120">
   						<col width="*">
   					</colgroup>
   					<tbody>
                        <tr>
                            <th><bean:message key="Carrier_Bkg_No"/></th>
                            <td>
					            <input type="text" name="f_bkg_no" maxlength="40" value="<bean:write name="coVO" property="bkg_no"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:330px" class="search_form" onblur="strToUpper(this);">
                            </td>
                        </tr>
						<tr>
                        	<th><bean:message key="Liner"/></th>
                            <td>
								<input type="text" name="f_carr_trdp_nm"  maxlength="100" value='<bean:write name="coVO" property="carr_trdp_nm"/>' class="search_form" onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="width:330px;ime-mode:auto;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('liner'));}" >
                            </td>
                        </tr>
                        <tr>
                            <th><bean:message key="VSL_VOY"/></th>
                            <td>
					            <input type="text" name="f_vslflt" maxlength="35" value="<bean:write name="coVO" property="vsl_flt"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:330px" class="search_form" onblur="strToUpper(this)">
                            </td>
                        </tr> 
                        <tr>
                            <th><bean:message key="POR"/></th>
                            <td>
					            <input type="text" name="f_por_nm" maxlength="50" value="<bean:write name="coVO" property="por_nm"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:330px" class="search_form" onblur="strToUpper(this);">
                            </td>
                        </tr>
                        <tr>
                            <th><bean:message key="POL"/></th>
                            <td>
					            <input type="text" name="f_pol_nm" maxlength="50" value="<bean:write name="coVO" property="pol_nm"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:330px" class="search_form" onblur="strToUpper(this);">
                            </td>
                        </tr>
                        <tr>
                            <th><bean:message key="POD"/></th>
                            <td>
					            <input type="text" name="f_pod_nm" maxlength="50" value="<bean:write name="coVO" property="pod_nm"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:330px" class="search_form" onblur="strToUpper(this);">
                            </td>
                        </tr>
                      	<tr>
	                      	<th><bean:message key="DEL"/></th>
                            <td> <input type="text"  maxlength="50"  name="f_del_nm" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:auto; text-transform:uppercase;width:330px;" value='<bean:write name="coVO" property="del_nm"/>' id="trd">
                            </td>
                        </tr>  
	 	                   <tr>
		                       <th><bean:message key="Port_Cut_Off_Date"/></th>
		                       <td>
		                       	<input type="text" name="cut_off_dt" id="cut_off_dt" maxlength="10" value='<wrt:write name="coVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Cut-Off Date');"><!-- 
										--><button type="button" class="calendar" tabindex="-1" name="cut_off_dt_cal" id="cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.cut_off_dt);" ></button>
								<bean:message key="Time"/>
								<input type="text" name="cut_off_tm" value='<wrt:write name="coVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">	
	                            </td>
	                        </tr>
	                        <tr>
		                       <th><bean:message key="Rail_Cut_Off_Date"/></th>
		                       <td>
		                       			<input type="text" name="rail_cut_off_dt" id="rail_cut_off_dt" maxlength="10" value='<wrt:write name="coVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Rail Cut-Off Date');"><!-- 
													 --><button type="button" class="calendar" tabindex="-1" name="rail_cut_off_dt_cal" id="rail_cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.rail_cut_off_dt);" ></button>
								<bean:message key="Time"/>
								<input type="text" name="rail_cut_off_tm" value='<wrt:write name="coVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">	
	                            </td>
	                        </tr>
	                        
	                         <tr>
		                       <th><bean:message key="DOC_Cut_Off_Date"/></th>
		                       <td>
		                      <input type="text" name="doc_cut_off_dt" id="doc_cut_off_dt" maxlength="10" value='<wrt:write name="coVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'DOC Cut-Off Date');"><!-- 
																			 --><button type="button" class="calendar" tabindex="-1" name="doc_cut_off_dt_cal" id="doc_cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.doc_cut_off_dt);" ></button>
																		<bean:message key="Time"/>
										<input type="text" name="doc_cut_off_tm" value='<wrt:write name="coVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
														     </td>
	                        </tr>
	                        
	                        <tr>
		                       <th><bean:message key="W/H_Cut_Off_Date"/></th>
		                       <td>
		                      <input type="text" name="wh_cut_off_dt" id="wh_cut_off_dt" maxlength="10" value='<wrt:write name="coVO" property="wh_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'W/H Cut-Off Date');"><!-- 
																			 --><button type="button" class="calendar" tabindex="-1" name="wh_cut_off_dt_cal" id="wh_cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.wh_cut_off_dt);" ></button>
																		<bean:message key="Time"/>
										<input type="text" name="wh_cut_off_tm" value='<wrt:write name="coVO" property="wh_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
														     </td>
	                        </tr>
	                        
	                        
                        </tbody>
                    </table>
   			</div>
   		</div>
   		<div class="opus_design_inquiry" style="width: 970px;">
   			<table class="grid2">
   				<colgroup>
   					<col width="220">
   					<col width="250">
   					<col width="250">
   					<col width="100">
   					<col width="150">
   				</colgroup>
   				<tbody>
             		<tr>
              			<th style="text-align: center;"><b><bean:message key="Marks_and_Numbers"/></b></th>
              			<th style="text-align: center;"><b>Q'TY</b></th>
              			<th style="text-align: center;"><b><bean:message key="Description_of_Packages_and_Goods"/></b></th>
              			<th style="text-align: center;"><b><bean:message key="GWeight"/></b></th>	
              			<th style="text-align: center;"><b><bean:message key="Measure"/></b></th>
              		</tr>
              		<tr>
              			<td>
              				<textarea name="f_mark_num" class="search_form" dataformat="excepthan" style="width:220px;height:250px;" onblur="strToUpper(this);"><bean:write name="coVO" property="mk_txt"/></textarea>
              			</td>
              			<td>
              				<textarea name="f_qty" class="search_form" dataformat="excepthan" style="width:170px;height:250px;text-align:right" onblur="strToUpper(this);"><bean:write name="coVO" property="qty"/></textarea>
              			</td>
              			<td>
              				<textarea name="f_desc_good" class="search_form" dataformat="excepthan" style="width:250px;height:250px;" onblur="strToUpper(this);"><bean:write name="coVO" property="desc_txt"/></textarea>
              			</td>
              			<td>
              				<textarea name="f_grs_wgt" class="search_form" dataformat="excepthan" style="width:100px;height:250px;text-align:right;" onblur="strToUpper(this);"><bean:write name="coVO" property="grs_wgt"/></textarea>
              			</td>
              			<td>
              				<textarea name="f_meas" class="search_form" dataformat="excepthan" style="width:150px;height:250px;text-align:right;" onblur="strToUpper(this);"><bean:write name="coVO" property="meas"/></textarea>
              			</td>
              		</tr>
	              </tbody>
              </table>
   		</div>
	</div>
	</form>

