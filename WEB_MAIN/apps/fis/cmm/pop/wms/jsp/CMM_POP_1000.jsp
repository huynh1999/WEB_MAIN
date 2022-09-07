<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_1000.jsp
*@FileTitle  : ?
*@author     : CLT
*@version    : 1.0
*@since      : 2018/08/23
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import = "java.net.URLDecoder" %>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<%
//String trsp_trdp_nm = URLDecoder.decode(request.getParameter("trsp_trdp_nm"),"UTF-8");
//String f_bnd_clss_cd = "";
//f_bnd_clss_cd = request.getParameter("air_sea_clss_cd") + request.getParameter("bnd_clss_cd");
//f_bnd_clss_cd.toUpperCase();
%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/wms/script/CMM_POP_1000.js?ver=<%=CLT_JS_VER%>"></script>
	<%-- <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script> --%>
	<SCRIPT TYPE="TEXT/JAVASCRIPT" SRC="<%=CLT_PATH%>/js/common/autocomplete_ui.js?VER=<%=CLT_JS_VER%>"></SCRIPT>
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>

	<script type="text/javascript">
			function setupPage(){
				//loadPage();
			}
	</script>
<style> body { border-top-width: 6px!important; } </style>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	
	<!-- 프린터용 -->
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="ofc_eng_nm" id="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="eml" id="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="user_name" id="user_name" value="<%=userInfo.getUser_name() %>">
	<input type="hidden" name="tel" id="tel" value="<%=userInfo.getPhn() %>">
	<input type="hidden" name="fax" id="fax" value="<%=userInfo.getFax() %>">
	<input type="hidden" name="ofc_cd" id="ofc_cd" value="<%=userInfo.getOfc_cd() %>">
	<input type="hidden" name="mailTitle" id="mailTitle" value=""/>		
	
	<bean:parameter name="trsp_trdp_cd" id="trsp_trdp_cd"  value=""/>
	<bean:parameter name="trsp_trdp_nm" id="trsp_trdp_nm" value=""/>
	<bean:parameter name="dest_rout_trdp_cd" id="dest_rout_trdp_cd" value=""/>
	<bean:parameter name="mrd_file_nm" id="mrd_file_nm" value=""/>
	 
	<input type="hidden" name="s_dest_rout_trdp_cd" id="s_dest_rout_trdp_cd" value="<bean:write name="dest_rout_trdp_cd"/>">
	<input type="hidden" name="mrd_file_nm" id="mrd_file_nm" value="<bean:write name="mrd_file_nm"/>">
	 
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd" /> 
	
	<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
	<input type="hidden" name="rpt_file_name_title"/>

	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<div class="layer_popup_title">
		 <div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><bean:message key="Delivery_Order"/></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
				   <button type="button" class="btn_accent" onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
				--><button type="button" class="btn_normal"  onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
				</div>
				<!-- opus_design_btn(E) -->
	    
	  			<!-- page_location(S) -->
				<div class="location">	
					 <span><%=LEV1_NM%></span>
				 	 <span><%=LEV2_NM%></span>
				  	 <span><%=LEV3_NM%></span>
			   		<a href="" class="ir">URL Copy</a>
				</div>
				<!-- page_location(E) -->
		</div>
	    <!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
		<!-- wrap search (S) -->
	 	<div class="wrap_search">
		    <!-- inquiry_area(S) -->	
			<div class="opus_design_inquiry ">
				<h3 class="title_design"><bean:message key="Search_Condition"/></h3>
			    <table>
			        <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
			        	 <tr>
	                        	<th><bean:message key="Order_No"/></th>
								<td>
								<!-- 	<bean:parameter name="f_bl_no" id="f_bl_no" value=""/>  -->
									<input type="text" name="cust_ord_no"  id="cust_ord_no"  value="<bean:write name="hmOutParam" property="cust_ord_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)">                  
									 <!-- button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('HBL_POPLIST',this)"></button--><!-- 
									 -->
									 
									 <!-- <button type="button" class="input_seach_btn" tabindex="-1"></button>-->
								     <%-- <input type="hidden" name="intg_bl_seq" id="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/> --%>
								     <input type="hidden" name="intg_bl_seq" id="intg_bl_seq" value=''/>
								     <!-- 
								  	 --><input type="hidden" name="wob_bk_no" id="wob_bk_no" value="<bean:write name="hmOutParam" property="wob_bk_no"/>"/>
								</td>
	                        </tr>
			        </tbody>
		        </table>
		        <h3 class="title_design"><bean:message key="Basic_Information"/></h3>
		            <table>
	                 	<colgroup>
				        	<col width="120" />
				        	<col width="*" />
			        	</colgroup>
			      		<tbody>
		                        <tr>
		                            <th><bean:message key="Trucking_Company"/><!--M1234--></th>
	                                <td>
										  <input type="text" value="<bean:write name="hmOutParam" property="trsp_trdp_cd"/>"  name="trsp_trdp_cd"  id="trsp_trdp_cd" value='' class="search_form" style="width:60px;"  onKeyDown="codeNameAction1('trdpCode_trn',this, 'onKeyDown')" onBlur="codeNameAction1('trdpCode_trn',this, 'onBlur')"><!-- 
	                                   --><button type="button" class="input_seach_btn" tabindex="-1" id="trn" onclick="doWork('PARTNER_POPLIST', this)"></button><!--
	                                   --><input type="text" value="<bean:write name="hmOutParam" property="trsp_trdp_nm"/>" name="trsp_trdp_nm" id="trsp_trdp_nm" class="search_form" style="width:234px;" value='' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, frm1.trsp_trdp_nm.value);}">
	                                </td>
		                       </tr>
		        		</tbody>
		        </table>
		        
		        <table style = "display:none;">
	           		 <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                          <tr>
	                              <th><bean:message key="Address"/></th>
	                              <td>
	                                  <textarea name="trsp_trdp_addr" maxlength="500" id="trsp_trdp_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:100px;display:none" WRAP="on"><%-- 
	                                   --%><bean:write name="hmOutParam" property="trsp_trdp_addr"/></textarea>
	                              </td>
	                          </tr>
	                 </tbody>
	           </table>
		        
		        <table>
			        <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
			        	 	 <tr>
	                              <th><bean:message key="Pickup"/></th>
	                              <td>
									  <input type="text" value="<bean:write name="hmOutParam" property="pck_trdp_cd"/>"  name="pickup_trdp_cd"  id="pickup_trdp_cd" value='' class="search_form" style="width:60px;"  onKeyDown="codeNameAction1('trdpCode_pickup',this, 'onKeyDown')" onBlur="codeNameAction1('trdpCode_pickup',this, 'onBlur')"><!-- 
	                                   --><button type="button" class="input_seach_btn" tabindex="-1" id="pck" onclick="doWork('PARTNER_POPLIST', this)"></button><!--
	                                   --><input type="text" value="<bean:write name="hmOutParam" property="pck_trdp_nm"/>" name="pickup_trdp_nm" id="pickup_trdp_nm" class="search_form" style="width:234px;" value='' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, frm1.pickup_trdp_nm.value);}">
	                              </td>
	                          </tr>
	                  </tbody>
	           </table>
	           <table>
	           		 <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                          <tr>
	                              <th><bean:message key="Address"/></th>
	                              <td>
	                                  <textarea name="pickup_addr" id="pickup_addr" maxlength="500" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:100px;" WRAP="on"><%-- 
	                                   --%><bean:write name="hmOutParam" property="pck_trdp_addr"/></textarea>
	                              </td>
	                          </tr>
	                 </tbody>
	           </table>
	           <table>
	           		<colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        	<col width="*" />
			        	<col width="*" />
			        	<col width="" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                         <tr>
	                             <th><bean:message key="PIC"/></th>
	                             <td>
	                                 <input name="pickup_pic" id="pickup_pic" maxlength="50" type="text" class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:100px;" value=''>
	                             </td>
	                             <th><bean:message key="Reference_No"/></th>
	                             <td>
	                                 <input name="pickup_ref" id="pickup_ref" maxlength="50" type="text" class="search_form" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" value=''>
	                             </td>
	                             <th><bean:message key="Date_Time"/></th>
	                             <td>
	                                 <input name="pickup_date" id="pickup_date" maxlength="50" type="text" class="search_form" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" value=''>
	                             </td>
	                             
	                        </tr>
			        </tbody>
		        </table>
		        <table>
			        <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
			        	  <tr>
	                            <th><bean:message key="Delivery"/></th>
	                            <td>
									<input type="text" value="<bean:write name="hmOutParam" property="buyer_cd"/>"  name="dest_rout_trdp_cd" id="dest_rout_trdp_cd" value='' class="search_form" style="width:60px;"  onKeyDown="codeNameAction1('trdpCode_del',this, 'onKeyDown')" onBlur="codeNameAction1('trdpCode_del',this, 'onBlur')"><!-- 
	                                 --><button type="button" class="input_seach_btn" tabindex="-1" id="del_1" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
	                                 --><input type="text"  value="<bean:write name="hmOutParam" property="buyer_nm"/>"  name="dest_rout_trdp_nm" id="dest_rout_trdp_nm" class="search_form" style="width:234px;" value='' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, frm1.dest_rout_trdp_nm.value);}">
	                            </td>
	                        </tr>
	                </tbody>
	             </table>
	             <table>
	             	 <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                        <tr>
	                            <th><bean:message key="Address"/></th>
	                            <td >
	                                <textarea name="dest_rout_addr" maxlength="500"  id="dest_rout_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:100px;" WRAP="on"><bean:write name="hmOutParam" property="buyer_addr1"/></textarea>
	                            </td>
	                        </tr>
	                  </tbody>
	              </table>
	              <table>
	           		<colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        	<col width="*" />
			        	<col width="*" />
			        	<col width="*" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                         <tr>
	                             <th><bean:message key="PIC"/></th>
	                             <td>
	                                 <input name="dest_rout_pic" id="dest_rout_pic" value='' maxlength="50" type="text" class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:100px;">
	                             </td>
	                             <th><bean:message key="Reference_No"/></th>
	                             <td>
	                                 <input name="dest_rout_ref" id="dest_rout_ref" value="<bean:write name="hmOutParam" property="ref_no"/>" maxlength="50" type="text" class="search_form" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" value=''>
	                             </td>
	                             <th><bean:message key="Date_Time"/></th>
	                             <td>
	                                 <input name="dest_rout_date" id="dest_rout_date" maxlength="50" type="text" class="search_form" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" value=''>
	                             </td>
	                        </tr>
			        </tbody>
		        </table>
		        <table>
			        <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
			        	  <tr>
	                            <th></th>
	                            <td>
									<input type="text"   name="bill_to_trdp_cd" id="bill_to_trdp_cd" value="<bean:write name="hmOutParam" property="bill_trdp_cd"/>" class="search_form" style="width:60px;"  onKeyDown="codeNameAction1('trdpCode_bil',this, 'onKeyDown')" onBlur="codeNameAction1('trdpCode_bil',this, 'onBlur')"><!-- 
	                                 --><button type="button" class="input_seach_btn" tabindex="-1" id="bill_to" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
	                                 --><input type="text"   name="bill_to_trdp_nm" id="bill_to_trdp_nm" class="search_form" style="width:234px;" value="<bean:write name="hmOutParam" property="bill_trdp_nm"/>" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, frm1.dest_rout_trdp_nm.value);}">
	                            </td>
	                        </tr>
	                </tbody>
	             </table>
		        <table>
	             	<colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                       <tr>
	                           <th><bean:message key="Bill_To"/></th>
	                           <td>
	                               <textarea name="bill_to_trdp_addr" id="bill_to_trdp_addr" maxlength="500" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:90px;" onblur="strToUpper(this);"><bean:write name="hmOutParam" property="bill_trdp_addr"/></textarea>
	                           </td>
	                       </tr>
			        </tbody>
		        </table>
	             <table>
	             	 <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                        <tr>
	                            <th><bean:message key="Special_Instructions"/></th>
	                            <td >
	                                <textarea name="special_ins" maxlength="500" id="special_ins" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:100px;" WRAP="on"></textarea>
	                            </td>
	                        </tr>
	                  </tbody>
	              </table>
	             <table>
	             	<colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                       <tr>
	                           <th><bean:message key="Remark"/></th>
	                           <td>
	                               <textarea name="do_rmk" id="do_rmk" maxlength="500" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:90px;" onblur="strToUpper(this);"><bean:write name="hmOutParam" property="out_do_rmk"/></textarea>
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





