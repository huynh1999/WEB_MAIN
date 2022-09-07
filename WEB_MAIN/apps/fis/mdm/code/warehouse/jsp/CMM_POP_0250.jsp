<%--
=========================================================
*@FileName   : CMM_POP_0250.jsp
*@FileTitle  : CMM
*@Description: package search pop
*@author     : 이광훈 - package search pop
*@version    : 1.0 - 01/05/2009
*@since      : 01/05/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/17
*@since      : 2014/07/17
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/code/warehouse/script/CMM_POP_0250.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
    <base target="_self"/>
<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
</script>
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input type="hidden" name="f_cmd"/>
		<input type="hidden" name="f_CurPage"/>
		<input type="hidden" name="openMean"/>
		<input type="hidden" name="use_flg" value='Y'/>
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Warehouse_Search"/></span></h2>
			<div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" >Search</button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
						<col width="70"></col>
						<col width="100"></col>
						<col width="40"></col>
						<col width="100"></col>
						<col width="40"></col>
						<col width="100"></col>
						<col width="70"></col>
						<col width="100"></col>
					</colgroup>
					<tbody>
						<tr>
	                        <th><bean:message key="Sea_Air"/></th>
	                        <td>
	                            <select name="air_sea_clss_cd">
	                                <option value=''>ALL</option>
	                                <option value='S'>Sea</option>
	                                <option value='A'>Air</option>
	                            </select>
	                        </td>
	                        <th><bean:message key="Code"/></th>
	                        <td>
	                            <input name="wh_cd" type="text" value="" class="search_form" style="width:100px;text-transform:uppercase" maxlength="20" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyPress="fncTpCodeSearch()" />
	                        </td>
	                        <th><bean:message key="Name"/></th>
	                        <td>
	                            <input name="wh_nm" type="text" value="" class="search_form" style="width:100px;" maxlength="100" onKeyPress="fncTpCodeSearch()"/>
	                        </td>
	                        <th>Edi Code</th>
	                        <td>
	                            <input name="edi_cd" type="text" value="" class="search_form" style="width:50px;" maxlength="12" onKeyPress="fncTpCodeSearch()"/>
	                        </td>
	                    </tr>
					</tbody>
				</table>
			</div>
		</div>
	
		<div class="wrap_result">
			<div class="opus_design_grid" id="mainTable">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
			<div>
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	            <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
	            <paging:options name="pagingVal" defaultval="200"/>
			</div>
			<div id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></div>
		</div>
	</div>
</form>


