<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0321.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/housebl/script/CMM_POP_0321.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>

	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />

	<!-- ------------------------------------------------------------------------- -->
	<!-- 프린터용 -->
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="ofc_eng_nm" id="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="eml" id="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="user_name" id="user_name" value="<%=userInfo.getUser_name() %>">
	<!-- ------------------------------------------------------------------------- -->
	<div class="layer_popup_title">
		<div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><bean:message key="Delivery_Order"/></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
				   <button type="button" class="btn_accent" name="btnSearch" id="btnSearch" onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" id="btnPrint" id="btnPrint"  onclick="doWork('PRINT')"><bean:message key="Print"/></button> 
				</div>
				<!-- opus_design_btn(E) -->
		</div>
	    <!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
		 <!-- wrap search (S) -->
	 	<div class="wrap_search">
		    <!-- inquiry_area(S) -->	
			<div class="opus_design_inquiry entry_pannel ">
				<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->	
			    <table>
			        <colgroup>
			        	<col width="60">
			        	<col width="*">
			        </colgroup>
			        <tbody>
						  <tr>
	                        	<th><bean:message key="HBL_No"/></th>
								<td>
								     <bean:parameter name="f_bl_no" id="f_bl_no" value=""/><!-- 
									  --><input type="text" name="f_bl_no" id="f_bl_no" maxlength="40" value="<bean:write name="f_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"><!--              
									  --><button type="button" class="input_seach_btn" tabindex="-1" id="del"  onClick="openPopUp('HBL_POPLIST',this)"></button><!-- 
								      --><input type="hidden" name="intg_bl_seq" id="intg_bl_seq"/><!-- 
								      --><input type="hidden" name="f_bkg_no" id="f_bkg_no"/>
								</td>
	                        </tr>
					 </tbody>
		        </table>
		        <h3 class="title_design"><bean:message key="Basic_Information"/></h3>	
		        <table>
			        <colgroup>
			        	<col width="60">
			        	<col width="*">
			        </colgroup>
			        <tbody>
						<tr>
		                    <th><bean:message key="Ref_No"/></th>
		                    <td>
		                    	<input name="ref_no" id="ref_no" maxlength="20" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value='<bean:write name="hmOutParam" property="ref_no"/>'>
		                    </td>
		                </tr>
		                <tr>
		                    <th><bean:message key="HBL_No"/></th>
		                    <td>
		                    	<input name="bl_no" id="bl_no" maxlength="40" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value='<bean:write name="hmOutParam" property="bl_no"/>'>
		                    </td>
		                </tr>
		                <tr>
		                	 <th><bean:message key="Prepaid_Collect"/></th>
		                    <td>
	                          	<bean:define id="prepaidCollectList" name="valMap" property="prepaidCollectList"/>
	                             	<html:select name="hmOutParam" property="prepaid_collect" styleClass="search_form" style="width:120px;">
	                                  <html:options collection="prepaidCollectList" property="cd_val" labelProperty="cd_nm"/>
	                               </html:select> 
		                    </td>
		                 </tr>
		                 <tr>
		                    <th>
		                    	<bean:message key="Value_to_Show"/>&nbsp;<bean:message key="on_Carrier_Field"/>
							</th>
		                    <td>
		                       	<bean:define id="valueToShowList" name="valMap" property="valueToShowList"/>
		                          	<html:select name="hmOutParam" property="value_to_show" styleClass="search_form" style="width:120px;">
		                               <html:options collection="valueToShowList" property="cd_val" labelProperty="cd_nm"/>
		                           </html:select> 
		                    </td>
		                </tr>
		                <tr>
		                    <th>Trucking Co.</th>
		                        <td>
									<input type="text"   name="trsp_trdp_cd" id="trsp_trdp_cd" value='<bean:write name="hmOutParam" property="trsp_trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="codeNameAction('Location_org',this, 'onKeyDown')" onBlur="codeNameAction('Location_org',this, 'onBlur')"><!-- 
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="trn" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
		                            --><input type="text"   name="trsp_trdp_nm" id="trsp_trdp_nm" class="search_form-disable" readOnly style="width:234px;" value='`'><!-- 
		                        	--><input type="hidden" name="trsp_trdp_addr" id="trsp_trdp_addr"/><!-- 
		                        	--><input type="hidden" name="trsp_trdp_pic" id="trsp_trdp_pic"/><!-- 
		                        	--><input type="hidden" name="trsp_trdp_phn" id="trsp_trdp_phn"/><!-- 
		                        	--><input type="hidden" name="trsp_trdp_fax" id="trsp_trdp_fax"/>
		                        </td>
		              	  </tr>
		                  <tr>
		                      <th>Delivery</th>
		                      <td>
									<input type="text"   name="dest_rout_trdp_cd" id="dest_rout_trdp_cd" value='<bean:write name="hmOutParam" property="dest_rout_trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="codeNameAction('Location_org',this, 'onKeyDown')" onBlur="codeNameAction('Location_org',this, 'onBlur')"><!-- 
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="del"  onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
		                            --><input type="text"   name="dest_rout_trdp_nm" id="dest_rout_trdp_nm" class="search_form-disable" readOnly style="width:234px;" value='<bean:write name="hmOutParam" property="dest_rout_trdp_nm"/>'>
		                      </td>
		                  </tr>
		                  <tr>
		                      <th><bean:message key="Address"/></th>
		                      <td>
		                          <textarea name="dest_rout_addr" id="dest_rout_addr" class="search_form" style="width:325px;height:80px"><bean:write name="hmOutParam" property="dest_rout_addr"/></textarea>
		                      </td>
		                  </tr>
		                  <tr>
		                      <th><bean:message key="PIC"/></th>
		                      <td>
		                          <input name="dest_rout_pic" id="dest_rout_pic" maxlength="50" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" value='<bean:write name="hmOutParam" property="dest_rout_pic"/>'>
		                      </td>
		                  </tr>
		                  <tr>
		                      <th><bean:message key="Tel_Fax"/></th>
		                      <td>
		                          <input name="dest_rout_pic_phn" id="dest_rout_pic_phn" maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:120px;" value='<bean:write name="hmOutParam" property="dest_rout_pic_phn"/>'><!-- 
		                           --><input name="dest_rout_pic_fax" id="dest_rout_pic_fax" maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:120px;" value='<bean:write name="hmOutParam" property="dest_rout_pic_fax"/>'>
		                      </td>
		                  </tr>
		                  <tr>
		                      <th><bean:message key="Remark"/></th>
		                      <td>
		                          <textarea name="rmk"  id="rmk" maxlength="500" class="search_form" style="width:320px;height:37px"><bean:write name="hmOutParam" property="rmk"/></textarea>
		                      </td>
		                  </tr>
		                  <tr>
		                      <th><bean:message key="Additional"/>Remark</th>
		                      <td>
		                          <textarea name="do_rmk" id="do_rmk" maxlength="500" class="search_form" style="width:320px;height:37px"><bean:write name="hmOutParam" property="do_rmk"/></textarea>
		                      </td>
		                  </tr>
					 </tbody>
		       </table>
			</div>
		     <!-- inquiry_area(S) -->	
		</div>
		<!-- wrap search (E) -->
	</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>


