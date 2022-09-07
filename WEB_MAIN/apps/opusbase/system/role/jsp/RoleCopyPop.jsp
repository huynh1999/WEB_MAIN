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
	<script language="javascript" src="./apps/opusbase/system/role/script/RoleCopyPop.js?ver=<%=CLT_JS_VER%>"></script>

	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
		$(document).ready(function() {
			dataObj = parent.docObjects[0];
			$("#copyFrom").html("<B>" + dataObj.Rows[dataObj.GetSelectRow()].C4 + "</B> ");
			var rowCnt = dataObj.RowCount();
			$.each(parent.docObjects[0].Rows,function(index, item){
				if(index <= rowCnt){
					dataArr.push(item.C3);
				}
			});
			checkData = {roleCode : {id:'role_cd', name:'Role Code',check:'default',testData:'Mstr1'},
				roleName : {id:'role_nm',name:'Role Name',check:'default',testData:'Master1 Role Name'},
				description : {id:'role_desc',name:'Description',check:'default',testData:'Master1 Description'}
			};

		});
	</script>
	<form name="frm1" method="POST" action="./RoleCopyPop.clt">
	
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Role_Copy_Popup"/></span></h2>
			<div class="opus_design_btn">
				<button type="button" class="btn_normal"  onclick="doWork('COPY')"><bean:message key="Copy"/></button><!-- 
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<!-- layout_wrap(S) -->
			<div id="btnEditer">
				<div style="width:700px">
					<table>
						<colgroup>
			    			<col width="90px" />
			    			<col width="*" />
			    			<col width="90px" />
			    			<col width="*" />
			    			<col width="90px" />
			    			<col width="*" />
			    		</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Role_Code" /></th>
								<!--//#4220 [PQC Bug] Additional bug - DB Column Size와 maxlength 통일 -->
						        <td><input type="text" id="role_cd" name="role_cd" maxlength="6" class="search_form" dataformat="excepthan" style="width:100px;"></td>
						        <th><bean:message key="Role_Name" /></th>
						        <td><input type="text" id="role_nm" name="role_nm" maxlength="50" class="search_form" dataformat="excepthan" style="width:100px;"></td>
						        <th><bean:message key="Description" /></th>
						        <td><input type="text" id="role_desc" name="role_desc" maxlength="200" class="search_form" dataformat="excepthan" style="width:200px;"></td>
						    </tr>
						</tbody>
					</table>
				</div>
				<div style="width:90%;padding: 18px 0px 0px 15px;">
					▶ <span id="copyFrom"></span><bean:message key="Role_Copy_Message"/><span id="copyTo"></span>
				</div>
			</div>
			<!-- layout_wrap(E) -->		
		</div>		
	</div>
</form>
