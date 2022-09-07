<%--
=========================================================
*@FileName   : CMM_POP_0370.jsp
*@FileTitle  : customized report pop
*@Description: customized report pop
*@author     : PJK
*@version    : 1.0 - 03/30/2012
*@since      : 03/30/2012

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 22/07/2014
*@since      : 22/07/2014
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>
	<% String callTp = "";%>
    <logic:notEmpty name="EventResponse">
        <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	    
		<logic:notEmpty name="cdMap" property="callTp">
			<bean:define id="tmpTp"  name="cdMap" property="callTp"/>
			<% callTp = (String)tmpTp; %>
		</logic:notEmpty>
    </logic:notEmpty>
    
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/pfm/mgt/management/script/CMM_POP_0370.js?ver=<%=CLT_JS_VER%>"></script>
		
	<script type="text/javascript" FOR="document" EVENT="onkeyup">
		//PERSONAL_INFOHTML.usr
		//enterKey 처리
		try {
			var srcName=window.event.srcElement.getAttribute("name");
			
			with(document.form){
				switch(srcName){
					case "f_param_1":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "f_param_2":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "f_param_3":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "f_param_4":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "f_param_5":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "f_param_6":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "f_param_7":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;		
					case "f_param_8":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;		
					case "f_param_9":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;		
					case "f_param_10":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;					
					default:
					break;
				}
			}
		}catch(e) {
		}
	</script>
<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
</script>
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="comboSel"/>
	
	<input	type="hidden" name="f_rpt_seq"/>
	<input	type="hidden" name="f_qry_txt"/>
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Run_Query"/></span></h2>
			<div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Apply"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('EXCEL_ALL')" name="btn_DownExcel"><bean:message key="ExcelAll"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
			<div class="opus_design_inquiry entry_pannel ">
				<table>
					<colgroup>
						<col width="175"></col>
						<col width="115"></col>
						<col width="175"></col>
						<col width="115"></col>
						<col width="175"></col>
						<col width="115"></col>
						<col width="*"></col>
					</colgroup>
					<tbody>
						<tr>
							<th>Title :</th>
							<td id="td_rpt_title"></td>
						</tr>
						<tr>
							<th id="td_desc_1"></th>
							<td>
								<input type="text" name="f_param_1" id="f_param_1" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/>
							</td>
							<th id="td_desc_2"></th>
							<td><input type="text" name="f_param_2" id="f_param_2" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/></td>
							<th id="td_desc_3"></th>
							<td><input type="text" name="f_param_3" id="f_param_3" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/></td>
							<td></td>
						</tr>
						<tr>
							<th id="td_desc_4"></th>
							<td>
								<input type="text" name="f_param_4" id="f_param_4" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/>
							</td>
							<th id="td_desc_5"></th>
							<td>
								<input type="text" name="f_param_5" id="f_param_5" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/>
							</td>
							<th id="td_desc_6"></th>
							<td><input type="text" name="f_param_6" id="f_param_6" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/></td>
							<td></td>
						</tr>
						
						<tr>
							<th id="td_desc_7"></th>
							<td>
								<input type="text" name="f_param_7" id="f_param_7" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/>
							</td>
							<th id="td_desc_8"></th>
							<td>
								<input type="text" name="f_param_8" id="f_param_8" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/>
							</td>
							<th id="td_desc_9"></th>
							<td><input type="text" name="f_param_9" id="f_param_9" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/></td>
							<td></td>
						</tr>
						
						<tr>
							<th id="td_desc_10"></th>
							<td>
								<input type="text" name="f_param_10" id="f_param_10" value="" style="width:100px" onkeypress="if(event.keyCode==13){return false;}"/>
							</td>
							<th></th>
							<td></td>
							<th></th>
							<td></td>
							<td></td>
						</tr>						
						
						<tr>
							<th id="rmk" colspan="7"></th>  
						</tr>						
					</tbody>
				</table>
			</div>
		</div>
		<div class="wrap_result">
	    	<div class="opus_design_grid">
	    		<script type="text/javascript">comSheetObject('sheet1');</script>
	    	</div>
	    	<div id="mainTable">
	    		<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
				<paging:options name="pagingVal" defaultval="200"/>
				<div id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></div>
	    	</div>
	    </div>
	 </div>
</form>



