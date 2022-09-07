<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0250.jsp
*@FileTitle  : Trade Partner ManagementList
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/mcm/partner/script/MDM_MCM_0260.js?ver=<%=CLT_JS_VER%>" /></script>
	



	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		var PARAM1_1 = '';
		var PARAM1_2 = '';

		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
	    <!-- Item Detail Code Set 공통 코드조회-->
		<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
		<logic:iterate id="codeVO" name="param1List">
			<% if(isBegin){ %>
				PARAM1_1+= '|';
				PARAM1_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>

	</script>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>

	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			<!-- page_location(S) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
			<%--!
			   <button type="button" class="btn_accent" name="btnSearch" id="btnSearch"   onclick="doWork('SEARCHLIST')" >Search</button><!--
			--><button type="button" class="btn_normal" id="btnNew" name="btnNew"  onclick="doWork('ROWADD')">Add</button><!--
			--><button type="button" class="btn_normal"  id="btnSave" name="btnSave" onclick="doWork('SAVE')">Save</button>
			--%>

			</div>
			<!-- opus_design_btn(E) -->
			<div class="location">
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
<form name="form" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->
		<div class="opus_design_inquiry ">
		    <table>
		       <colgroup>
		        	<col width="80">
		        	<col width="80">
		        	<col width="80">
		        	<col width="*">
		        </colgroup>
		        <tbody>
		        	 <tr>
                        <th><bean:message key="Contract_No"/></th>
                        <td><input required="true" msg="<bean:message key="Contract_No"/>" name="f_ctrt_no" type="text" class="input1" id="f_ctrt_no" value="" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" OnKeyDown="if(event.keyCode==13){searchTlCtrtInfo();}" maxlength="10"/><!--
					     --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1" onclick="btn_ctrt()"></button><!--
					     --><input name="f_ctrt_nm" type="text" class="input1" id="f_ctrt_nm" value="" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){btn_ctrt(form.f_ctrt_nm.value);}" maxlength="100"/><!--
					     --></td>
                        <th><bean:message key="Item_Code"/></th>
                        <td><input required="true" msg="<bean:message key="Item_Code"/>" name="f_item_no" type="text" class="input1" id="f_item_no" value="" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchItemCodeInfo();" OnKeyDown="if(event.keyCode==13){searchItemCodeInfo();}" maxlength="10"/><!--
					     --><button type="button" name="btn_item_no" id="btn_item_no"class="input_seach_btn" tabindex="-1" onclick="btn_ctrt_item()"></button><!--
					     --><input name="f_item_nm" type="text" class="input1" id="f_item_nm" value="" style="width:130px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){btn_ctrt_item(form.f_item_nm.value);}" maxlength="100"/>
					     <input type="hidden" id="f_item_sys_no"><!--

					     --></td>
                    </tr>
		        </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->
	</div>
	<!-- wrap search (E) -->

	<div class="wrap_result">
			<!-- #2827 [BINEX]Fresh Cargo C/I & P/L 기능 수정 -->
			<div class="opus_design_inquiry sm" style="width:700px;display: none">
			    <table>
			       <colgroup>
			        	<col width="80">
			        	<col width="80">
			        	<col width="80">
			        	<col width="*">
			        </colgroup>
			        <tbody>
			        	 <tr>
	                        <th><bean:message key="Contract_No"/></th>
	                        <td><input name="h_ctrt_no" type="text" class="input1" id="h_ctrt_no" value="" style="width:80px;ime-mode:disabled;text-transform:uppercase;" readonly="readonly"/><!--
						     --><input name="h_ctrt_nm" type="text" class="input1" id="h_ctrt_nm" value="" style="width:130px;ime-mode:disabled;text-transform:uppercase;" readonly="readonly"/><!--
						     --></td>
	                        <th><bean:message key="Item_Code"/></th>
	                        <td><input name="h_item_no" type="text" class="input1" id="h_item_no" value="" style="width:80px;ime-mode:disabled;text-transform:uppercase;" readonly="readonly"/><!--
						     --><input name="h_item_nm" type="text" class="input1" id="h_item_nm" value="" style="width:130px;ime-mode:disabled;text-transform:uppercase;" readonly="readonly"/>
						     <input type="hidden" id="h_item_sys_no"><!--
						     --></td>
	                    </tr>
			        </tbody>
		        </table>
			</div>	
	
			<div class="opus_design_grid" id="mainTable1">
				<table>
			        <colgroup>
			        	<col width="700">
			        	<col width="*">
			        </colgroup>
			        <tbody>
					<tr>
						<td>
						<h3 class="title_design"><bean:message key="Item_Detail_Code_Set"/></h3>
							<div class="opus_design_btn">
								<button type="button" onClick="doWork('ROWADD1');" class="btn_normal" id="btnAdd1" ><bean:message key="Add"/></button>
								<button type="button" onClick="doWork('SAVE1')" class="btn_normal" id="btnSave1" ><bean:message key="Save"/></button>
							</div>
						</td>
						<td></td>
					</tr>
					<tr>
						<td><script type="text/javascript">comSheetObject('sheet1');</script></td>
						<td></td>
					</tr>
					</tbody>
				</table>
			</div>
			<!-- #2827 : [BINEX]Fresh Cargo C/I & P/L 기능 수정  -->
			<h3 class="title_design"><bean:message key="Item_Attribute"/></h3>
			<div class="opus_design_grid"  id="mainTable2">
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
			<div>
				<span id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'> </span>
			</div>

	</div>
</div>
</form>
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>
