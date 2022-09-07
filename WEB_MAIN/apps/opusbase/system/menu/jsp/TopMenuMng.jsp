<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : TOPMENU.jsp
*@FileTitle  : 최상위 메뉴 표시
*@Description: 최상위 메뉴의 관리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 2008.12.03
*@since      : 2008.12.03

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/opusbase/system/menu/script/TopMenuMng.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
		var ln_lang_tp = "<%=userInfo.getUse_lang_cd()%>";
		function setupPage(){
		 	loadPage();
		}
		
	</script>
<form method="post" name="form" onSubmit="return false;">
	<input type="hidden" name="f_cmd"> 
	<input type="hidden" name="f_CurPage">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <!-- 
		    <button type="button" class="btn_accent" onclick="searchList();"><bean:message key="Search"/></button> 
			<button type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button> 
			<button type="button" class="btn_normal" id="btnAdd" onclick="doWork('ADD')"><bean:message key="Save"/></button> 
			<button type="button" class="btn_normal" id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Modify"/></button> 
			<button type="button" class="btn_normal" id="btnDelete" onclick="doWork('REMOVE')"><bean:message key="Delete"/></button> 
			<button type="button" class="btn_normal" id="btnDelete" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
			 -->
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<div class="over_wrap" height="100%">	
	<!-- wrap_search(S) -->
	<!-- #535: [SBS] 다국어 처리 V1.0 2차 -->
	<div class="wrap_search">
		<h3 class="title_design"><bean:message key="MENU_CSS"/></h3>
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
				<col width="40" />
				<col width="80" />
				<col width="110" />
				<col width="80" />
				<col width="110" />
				<col width="80" />
				<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Language"/></th>
						<td>
							<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
							<bean:define id="PARAM1"  name="rtnMap" property="PARAM1"/>
	                        <select name="f_lang_cd" class="search_form" style="width:100px;" onchange="fn_langChang(this)">
	                            <!-- <option value="">ALL</option> -->
	                            <logic:iterate id="codeVO" name="PARAM1">
	                                <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	                            </logic:iterate>
	                        </select>
						</td>
						<th><bean:message key="MENU_FONT_SIZE"/>&nbsp;</th>
						<td>
							<input tabindex="text" maxlength="2" value="" name="f_font_size" id="f_font_size" style="width: 50px;" onKeyPress="ComKeyOnlyNumber(this, '.'); fncMenuCssSave();">px
						</td>
						<th><bean:message key="MENU_MIN_WIDTH"/>&nbsp;</th>
						<td>
							<input tabindex="text" maxlength="3" value="" name="f_min_width" id="f_min_width" style="width: 50px;" onKeyPress="ComKeyOnlyNumber(this, '.'); fncMenuCssSave();">px
						</td>
						<td>
							<button type="button" class="btn_etc" onclick="doWork('CSS_SAVE')"><bean:message key="Save"/></button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
          <table>
              <tr>
                  <td width="60px"></td>
                  <td align="center">
                      <table>
                          <tr><td id="pagingTb" class="paging" height="10" valign="bottom"></td></tr>
                      </table>
                  </td>
                  <td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
              </tr>
           </table>
    </div>
	</div>
</div>	
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>
</bod>
</html>