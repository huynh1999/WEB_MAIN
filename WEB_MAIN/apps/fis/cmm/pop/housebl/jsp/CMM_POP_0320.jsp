<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0320.jsp
*@FileTitle  : ?
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/24
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import = "java.net.URLDecoder" %>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<%
String trsp_trdp_nm = URLDecoder.decode(request.getParameter("trsp_trdp_nm"),"UTF-8");
String f_bnd_clss_cd = "";
f_bnd_clss_cd = request.getParameter("air_sea_clss_cd") + request.getParameter("bnd_clss_cd");
f_bnd_clss_cd.toUpperCase();
%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/housebl/script/CMM_POP_0320.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<SCRIPT TYPE="TEXT/JAVASCRIPT" SRC="<%=CLT_PATH%>/js/common/autocomplete_ui.js?VER=<%=CLT_JS_VER%>"></SCRIPT>
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>

	<script type="text/javascript">
			function setupPage(){
				loadPage();
			}
	</script>
<style> body { border-top-width: 6px!important; } </style>
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
	<input type="hidden" name="tel" id="tel" value="<%=userInfo.getPhn() %>">
	<input type="hidden" name="fax" id="fax" value="<%=userInfo.getFax() %>">
	<input type="hidden" name="mailTitle" id="mailTitle" value=""/>
	
	
	<!-- ------------------------------------------------------------------------- -->
	
	<bean:parameter name="liner_trdp_nm" id="liner_trdp_nm" value=""/>
	<bean:parameter name="trsp_trdp_cd" id="trsp_trdp_cd"  value=""/>
	<%-- <bean:parameter name="trsp_trdp_nm" id="trsp_trdp_nm" value=""/> --%>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	<bean:parameter name="air_sea_clss_cd" id="air_sea_clss_cd" value=""/>
	<bean:parameter name="biz_clss_cd" id="biz_clss_cd" value=""/>
	<bean:parameter name="bnd_clss_cd" id="bnd_clss_cd" value=""/>
	<bean:parameter name="dest_rout_trdp_cd" id="dest_rout_trdp_cd" value=""/>
	<bean:parameter name="mrd_file_nm" id="mrd_file_nm" value=""/>
	<!--[OFVFOUR-7877] [KING FREIGHT NYC] ADD CNTR # IN SUBJECT LINE WHEN SENDING D/O
		// Modified by Thinh Nguyen -->
	<bean:parameter name="f_cntr_no" id="f_cntr_no" value=""/>
	 
	<input type="hidden" name="liner_trdp_nm" id="liner_trdp_nm" value="<bean:write name="liner_trdp_nm"/>">
	<input type="hidden" name="air_sea_clss_cd" id="air_sea_clss_cd" value="<bean:write name="air_sea_clss_cd"/>">
	<input type="hidden" name="biz_clss_cd" id="biz_clss_cd" value="<bean:write name="biz_clss_cd"/>">
	<input type="hidden" name="bnd_clss_cd" id="bnd_clss_cd" value="<bean:write name="bnd_clss_cd"/>">
	<input type="hidden" name="s_dest_rout_trdp_cd" id="s_dest_rout_trdp_cd" value="<bean:write name="dest_rout_trdp_cd"/>">
	<input type="hidden" name="mrd_file_nm" id="mrd_file_nm" value="<bean:write name="mrd_file_nm"/>">
	<!--[OFVFOUR-7877] [KING FREIGHT NYC] ADD CNTR # IN SUBJECT LINE WHEN SENDING D/O
		// Modified by Thinh Nguyen -->	
	<input type="hidden" name="f_cntr_no" id="f_cntr_no" value="<bean:write name="f_cntr_no"/>">
	 
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
				<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
			    <table>
			        <colgroup>
			        	<col width="120" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
			        	 <tr>
	                        	<th><bean:message key="HBL_No"/></th>
								<td>
									<bean:parameter name="f_bl_no" id="f_bl_no" value=""/>
									<input type="text" name="f_bl_no"  id="f_bl_no"  value="<bean:write name="f_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)"><!--                   
									 --><!-- button type="button" class="input_seach_btn" tabindex="-1" onClick="openPopUp('HBL_POPLIST',this)"></button--><!-- 
									 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="var temp_bnd_clss_cd = '<%=f_bnd_clss_cd%>'; 
									    switch (temp_bnd_clss_cd) { case 'SI' : openSeiPopUp('HBL_POPLIST',this); break;
									                                case 'AI' : openAiiPopUp('HBL_POPLIST',this); break; 
									                                default  : openPopUp('HBL_POPLIST',this); break;  };"></button><!--									 
								     --><input type="hidden" name="intg_bl_seq" id="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/><!-- 
								  	 --><input type="hidden" name="f_bkg_no" id="f_bkg_no"/>
								</td>
	                        </tr>
			        </tbody>
		        </table>
		        <h3 class="title_design"><bean:message key="Basic_Information"/></h3>
		        <table>
			        <colgroup>
			        	<col width="120" />
			        	<col width="100" />
			        	<col width="185" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
			        	 <tr>
		                            <th><bean:message key="Ref_No"/></th>
		                            <td>
		                            	<input name="ref_no" id="ref_no" maxlength="20" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" value='<bean:write name="hmOutParam" property="ref_no"/>'>
		                            </td>
		                            <th><bean:message key="HBL_No"/></th>
		                            <td>
		                            	<input name="bl_no" id="bl_no" maxlength="40" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" value='<bean:write name="hmOutParam" property="bl_no"/>'>
		                            </td>
		                 </tr>
		             </tbody>
		          </table>
		          <table>
			          	<colgroup>
			        	<col width="120">
			        	<col width="100">
			        	<col width="185">
			        	<col width="*">
			        </colgroup>
				        <tbody>
		                        <tr>
		                            <!-- <th><bean:message key="Prepaid_Collect"/></th> -->
		                            <th>Freight Term</th>
		                            <td>
		                               	<bean:define id="prepaidCollectList" name="valMap" property="prepaidCollectList"/>
	                                   	<html:select name="hmOutParam" property="prepaid_collect" styleClass="search_form" style="width:120px;">
	                                        <html:options collection="prepaidCollectList" property="cd_val" labelProperty="cd_nm"/>
	                                    </html:select> 	                            
									</td>
		                            <th><bean:message key="Value_to_Show_on_Carrier_Field"/></th>
			                        <td>
		                               	<bean:define id="valueToShowList" name="valMap" property="valueToShowList"/>
	                                   	<html:select name="hmOutParam" property="value_to_show" styleClass="search_form" style="width:120px;">
	                                        <html:options collection="valueToShowList" property="cd_val" labelProperty="cd_nm"/>
	                                    </html:select> 
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
		                            <th><bean:message key="Trucking_Company"/><!--M1234--></th>
	                                <td>  
										<input type="text"   name="trsp_trdp_cd" id="trsp_trdp_cd" maxlength="20" value='<bean:write name="trsp_trdp_cd" />' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;"  onKeyDown="codeNameAction1('trdpCode_trn',this, 'onKeyDown')" onBlur="codeNameAction1('trdpCode_trn',this, 'onBlur')"><!-- 
	                                     --><button type="button" class="input_seach_btn" tabindex="-1" id="trn" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
	                                     --><input type="text"   name="trsp_trdp_nm" id="trn" class="search_form" dataformat="multiLanguage" style="width:234px;" value='<%=trsp_trdp_nm%>' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, frm1.trsp_trdp_nm.value);}"><!-- 
	                                 	 --><input type="hidden" name="trsp_trdp_addr" id="trsp_trdp_addr"/><!-- 
	                                 	 --><input type="hidden" name="trsp_trdp_pic" id="trsp_trdp_pic"/><!-- 
	                                 	 --><input type="hidden" name="trsp_trdp_phn" id="trsp_trdp_phn"/><!-- 
	                                 	 --><input type="hidden" name="trsp_trdp_fax" id="trsp_trdp_fax"/>
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
									  <input type="text"   name="pickup_trdp_cd"  id="pickup_trdp_cd" value='<bean:write name="hmOutParam" property="pickup_trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="codeNameAction1('trdpCode_pickup',this, 'onKeyDown')" onBlur="codeNameAction1('trdpCode_pickup',this, 'onBlur')"><!-- 
	                                   --><button type="button" class="input_seach_btn" tabindex="-1" id="pck" onclick="doWork('PARTNER_POPLIST', this)"></button><!--
	                                   --><input type="text" name="pickup_trdp_nm" id="pck" class="search_form" style="width:234px;" value='<bean:write name="hmOutParam" property="pickup_trdp_nm"/>' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, frm1.pickup_trdp_nm.value);}">
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
	                                  <textarea name="pickup_addr" id="pickup_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:100px;" WRAP="on"><bean:write name="hmOutParam" property="pickup_addr"/></textarea>
	                              </td>
	                          </tr>
	                 </tbody>
	           </table>
	           <table>
	           		<colgroup>
			        	<col width="120" />
			        	<col width="100" />
			        	<col width="110" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                         <tr>
	                             <th><bean:message key="PIC"/></th>
	                             <td>
	                                 <input name="pickup_pic" id="pickup_pic" maxlength="50" type="text" class="search_form"  dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:100px;" value='<bean:write name="hmOutParam" property="pickup_pic"/>'>
	                             </td>
	                             <th><bean:message key="Tel_Fax"/></th>
	                             <td>
	                                 <input name="pickup_pic_phn" id="pickup_pic_phn" maxlength="30" type="text" class="search_form" style="width:120px;" value='<bean:write name="hmOutParam" property="pickup_pic_phn"/>'><!-- 
	                                  --><input name="pickup_fax" id="pickup_fax" maxlength="30" type="text" class="search_form" style="width:120px;" value='<bean:write name="hmOutParam" property="pickup_fax"/>'>
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
									<input type="text"   name="dest_rout_trdp_cd" id="dest_rout_trdp_cd" value='<bean:write name="hmOutParam" property="delivery_trdp_cd"/>' class="search_form" style="width:60px;"  onKeyDown="codeNameAction1('trdpCode_del',this, 'onKeyDown')" onBlur="codeNameAction1('trdpCode_del',this, 'onBlur')"><!-- 
	                                 --><button type="button" class="input_seach_btn" tabindex="-1" id="del" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
	                                 --><input type="text"   name="dest_rout_trdp_nm" id="del" class="search_form" style="width:234px;" value='<bean:write name="hmOutParam" property="delivery_trdp_nm"/>' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this, frm1.dest_rout_trdp_nm.value);}">
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
	                                <textarea name="dest_rout_addr" id="dest_rout_addr" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:100px;" WRAP="on"><bean:write name="hmOutParam" property="delivery_trdp_addr"/></textarea>
	                            </td>
	                        </tr>
	                  </tbody>
	              </table>
	              <table>
	              		<colgroup>
			        	<col width="120" />
			        	<col width="100" />
			        	<col width="110" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
	                        <tr>
	                            <th><bean:message key="PIC"/></th>
	                            <td>
	                                <input name="dest_rout_pic" id="dest_rout_pic" maxlength="50" type="text" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:100px;" value='<bean:write name="hmOutParam" property="dest_rout_pic"/>'>
	                            </td>
	                            <th><bean:message key="Tel_Fax"/></th>
	                            <td>
	                                <input name="dest_rout_pic_phn" id="dest_rout_pic_phn" maxlength="30" type="text" class="search_form" style="width:120px;" value='<bean:write name="hmOutParam" property="dest_rout_pic_phn"/>'><!-- 
	                                 --><input name="dest_rout_pic_fax" id="dest_rout_pic_fax" maxlength="30" type="text" class="search_form" style="width:120px;" value='<bean:write name="hmOutParam" property="dest_rout_pic_fax"/>'>
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
	                           <th><bean:message key="Route"/></th>
	                           <td>
	                               <textarea name="do_route" id="do_route" maxlength="500" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:90px;" onblur="strToUpper(this);"></textarea>
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
	                           <th><bean:message key="Description"/></th>
	                           <td>
	                               <textarea name="rmk" id="rmk" maxlength="500" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:100px;" WRAP="on" onblur="strToUpper(this);"><bean:write name="hmOutParam" property="rmk"/></textarea>
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
	                               <textarea name="do_rmk" id="do_rmk" maxlength="500" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:500px;height:90px;" onblur="strToUpper(this);"><bean:write name="hmOutParam" property="do_rmk"/></textarea>
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
	
	var AUTOCOMPLETE_YN = 'N';
	
	<logic:notEmpty name="valMap" property="autocompleteYn">
    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
</script>




