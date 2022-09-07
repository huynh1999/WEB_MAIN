<%--
=========================================================
*@FileName   : CMM_POP_0010.jsp
*@FileTitle  : CMM
*@Description: trade partner pop
*@author     : 이광훈 - trade partner pop
*@version    : 1.0 - 12/29/2008
*@since      : 12/29/2008

*@Change history:
=========================================================
--%>

<%@page import="java.util.ArrayList"%>
<%@page import="com.clt.apps.opusbase.system.role.dto.PgmBtnVO"%>
<%@page import="java.util.List"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/opusbase/system/role/script/RoleBtnAssignPop.js?ver=<%=CLT_JS_VER%>"></script>

	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./CMM_POP_0010.clt">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
	<input  type="hidden" name="pgm_seq"/>
	<input  type="hidden" name="role_cd"/>
	<input  type="hidden" name="attr_extension"/>
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="user_cd"  value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="RoleBtnAssignPop.clt"/>
	
	 <div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Button_Pop"/></span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_normal"  onclick="doWork('APPLY')"><bean:message key="Apply"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<!-- layout_wrap(S) -->
			<div class="layout_wrap">
			   <!-- layout_flex_fixed(S) -->
			   <div class="layout_flex_fixed" style="width:310px"> <!-- setting : FIXED width(300px) -->
			       <!-- opus_design_inquiry(S) -->
			       <div class="opus_design_inquiry">
			           <table>
				           	<tr>
					     		<td>
					     			<select name="dfltBtn" id="dfltBtn"  multiple style="width:300px; height:362px; padding-left: 10px;" onclick="setBtnCodeVal(dfltBtn.options[dfltBtn.selectedIndex].value, dfltBtn.options[dfltBtn.selectedIndex].text);" ONDBLCLICK="moveList('DFLT', frm1.dfltBtn, frm1.usrSetBtn)"></select>
					     		</td>
					     	</tr>
						</table>		           
			       </div>
			       <!-- opus_design_inquiry(E) -->		       
			   </div>
			   <!-- layout_flex_fixed(E) -->
			   <!-- layout_flex_fixed(S) -->
			   <div class="pad_left_8 layout_flex_fixed" style="width:40px; padding-top:100px;"> <!-- setting : FIXED width(300px) -->
			     <!-- opus_design_inquiry(S) -->
			       <div class="opus_design_inquiry">
			       		<table >
				       		<tr>
					            <td><button type="button" class="btn_etc" name="btn_right0" id="btn_right0" style="width:35px;" onclick="moveList('DFLT_ALL', frm1.dfltBtn, frm1.usrSetBtn);">&gt;&gt;</button></td>
					        </tr>
					        <tr>
					        	<td><button type="button" class="btn_etc" name="btn_right" id="btn_right" style="width:35px;" onclick="moveList('DFLT', frm1.dfltBtn, frm1.usrSetBtn);">&gt;</button></td>
					        </tr>
					        <tr>
					        	<td><button type="button" class="btn_etc" name="btn_left" id="btn_left" style="width:35px;" onclick="moveList('USRD', frm1.usrSetBtn, frm1.dfltBtn);">&lt;</button></td>
					        </tr>
					        <tr>
					        	<td><button type="button" class="btn_etc" name="btn_left0" id="btn_left0" style="width:35px;" onclick="moveList('USRD_ALL', frm1.usrSetBtn, frm1.dfltBtn);">&lt;&lt;</button></td>
					        </tr>
			          </table>
			       </div>
			       <!-- opus_design_inquiry(E) -->
			   </div>
			   <!-- layout_flex_fixed(E) -->
			   <!-- layout_flex_flex(S) -->
			   <div class="layout_flex_flex" style="padding-left:368px"> <!-- (fixed Width) + (padding 8px) = 608 -->
			       <!-- opus_design_inquiry(S) -->
			       <div class="opus_design_inquiry">
			           <table>
							<tbody>
								<tr>
							        <td>
							        	<select name="usrSetBtn" id="usrSetBtn" multiple style="width:345px; height:362px; padding-left: 10px;" onclick="setBtnCodeVal(usrSetBtn.options[usrSetBtn.selectedIndex].value, usrSetBtn.options[usrSetBtn.selectedIndex].text);" ONDBLCLICK="moveList('USRD', frm1.usrSetBtn, frm1.dfltBtn)"></select>
							        </td>
							    </tr>
							</tbody>
						</table>
			       </div>
			       <!-- opus_design_inquiry(E) -->
			   </div>
			   <!-- layout_flex_flex(E) -->
			</div>
			<div id="btnEditer">
				<div style="width:420px">
					<table>
						<colgroup>
			    			<col width="90px" />
			    			<col width="*" />
			    			<col width="90px" />
			    			<col width="*" />
			    		</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Button_Code" /></th>
						        <td><input type="text" id="btn_tp_cd" name="btn_tp_cd" maxlength="50" class="search_form" dataformat="excepthan" style="resize:none;ime-mode:disabled; text-transform:uppercase; width:100px;"></td>
						        <th><bean:message key="Button_Name" /></th>
						        <td><input type="text" id="btn_nm" name="btn_nm" maxlength="50" class="search_form" dataformat="excepthan" style="resize:none; ime-mode:disabled; width:100%;"></td>
						    </tr>
						</tbody>
					</table>
				</div>
				<div class="opus_design_btn" style="width:100%; margin:-30px 0px;">
					<button type="button" class="btn_normal"  onclick="doWork('CLEAR')"><bean:message key="Clear"/></button><!--
					--><button type="button" class="btn_normal"  onclick="doWork('SAVE')"><bean:message key="Save"/></button><!-- 
					--><button type="button" class="btn_normal"  onclick="doWork('DELETE')"><bean:message key="Delete"/></button>
				</div>
			</div>
			<!-- layout_wrap(E) -->		
		</div>		
	</div>
</form>
