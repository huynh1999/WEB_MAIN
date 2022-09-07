
<%--
/*=========================================================
*@FileName   : MDM_MCM_0150_NW.jsp 
*@FileTitle  : 
*@author     : diem.huynh
*@version    : 1.0 - 01/11/2018
*@since      : 01/11/2018
=========================================================*/
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/office/script/MDM_MCM_0150_NW.js?ver=<%=CLT_JS_VER%>"></script>

	<script>
	<bean:define id="objVO"  name="EventResponse" property="objVal"/>
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<logic:notEmpty name="tmpMap" property="SAVED">
			doDispRmkList();
		</logic:notEmpty>
	</logic:notEmpty>
	</script>
	<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
	    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
	</div>
	<script>
	function setupPage()
	{
		loadPage();
	}
	</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="" >
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" id="f_cmd" value=""/>
    <input type="hidden" name="rmk_id" id="rmk_id"      value='<bean:write name="objVO" property="rmk_id"/>'/>
    <input type="hidden" name="ofc_cd" id="ofc_cd"/>
    <input type="hidden" name="modi_flg" id="modi_flg" value='<bean:write name="objVO" property="modi_flg"/>'/>
    <input type="hidden" name="f_co_cd" value="dummyData"/>
    <input type="hidden" name="font_sz" id="font_sz"/>
	<div class="layer_popup_title">
     <!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title"><bean:message key="Remark"/></span></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" btnAuth="<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %>" onclick="doWork('MODIFY')" id="btnModify" name="btnModify"><bean:message key="Save"/></button>
			<button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button><!-- 
		<!-- opus_design_btn(E) -->
		</div>
		<div class="location">	
			<span id="navigation">
			</span>
		</div>
	<!-- page_title_area(E) -->
	</div>	
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
  		<div class= "opus_design_inquiry" >
  			<table>
  				<colgroup>
  					<col width="200" />
  					<col width="*" />
  				</colgroup>			
  								<tr>
                                    <th><bean:message key="Remark_Type"/></th>
                                    <td>
										<input name="rmk_nm" type="text" value='<bean:write name="objVO" property="rmk_nm"/>' readonly class="search_form" maxlength="100" style="width:460;"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th><bean:message key="Remark"/></th>
                                    <td>
                                        <textarea name="rmk_txt" class="search_form" style="width:560px;height:150px" maxlength="4000"><bean:write name="objVO" property="rmk_txt" filter="false"/></textarea>
                                    </td>
                                </tr>
                               
  			</table>
  		</div>
	</div>
	</div>
</div>
</form>
<script type="text/javascript">
var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
doBtnAuthority(attr_extension);
</script>





