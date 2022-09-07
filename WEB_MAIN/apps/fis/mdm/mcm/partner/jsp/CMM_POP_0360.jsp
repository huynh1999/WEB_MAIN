<%--
=========================================================
*@FileName   : CMM_POP_0360.jsp
*@FileTitle  : CMM
*@Description: contact person pop
*@author     : PJK - contact person pop
*@version    : 1.0 - 03/27/2012
*@since      : 03/27/2012

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 18/07/2014
*@since      : 18/07/2014
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/mcm/partner/script/CMM_POP_0360.js?ver=<%=CLT_JS_VER%>"></script>
		
	<script language="javascript">

		var tp_cd = '';
		var tp_nm = '';
		
		<bean:define id="cdMap" name="EventResponse" property="mapVal"/>
	
		<% boolean isBegin = false; %>
	    <!-- GL Code 코드조회-->
		<bean:define id="cdList"  name="cdMap" property="PARAM1"/>
		<logic:iterate id="codeVO" name="cdList">
			<% if(isBegin){ %>
			tp_cd+= '|';
			tp_nm+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   tp_cd+= '<bean:write name="codeVO" property="cd_val"/>';
			   tp_nm+= '<bean:write name="codeVO" property="cd_nm"/>';
	    </logic:iterate>

		
		//화면로드시 조회할 Client의 Type를 선택
		function selectCustTp(searchTp){
			if(searchTp!=''){
				/* 팝업을 띄울 때 Client Type에 관계없이 Trade Partner Type의 기본으로 ALL 로 선택되어 있어야 함. 2012.02.17 PJK.
				var optionVal = form.s_trdp_tp_cd02.options;

				//Sal인경우
				if(div_sal.style.display=="block"){
					optionVal = form.s_trdp_tp_cd01.options;
				}
		
				for(var i = 0; i < optionVal.length; i++){
					if(optionVal[i].value==searchTp){
						optionVal[i].selected = true;
						break;
					}
				}
				*/
				doWork('SEARCHLIST');
			}else{
				doWork('SEARCHLIST');	
			}
		}
	</script>
	
	<script language="javascript" FOR="document" EVENT="onkeyup">
		//PERSONAL_INFOHTML.usr
		//enterKey 처리
		try {
			var srcName=window.event.srcElement.getAttribute("name");
			
			with(document.form){
				switch(srcName){
					case "s_pic_name":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "s_eng_name":
						if (event.keyCode==13) {
							doWork('SEARCHLIST');
						}
					break;
					case "s_short_name":
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
	loadPage();selectCustTp('<%=callTp%>');
}
//-->
</script>
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="comboSel"/>
	
	<input	type="hidden" name="s_trdp_cd"/>
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title"><span><bean:message key="Contact_Person_Search"/></span></h2>
			<div class="opus_design_btn"><!--
			--><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" >Search</button><!--
			--><button type="button" class="btn_normal" onclick="doWork('SELECT')" ><bean:message key="Select"/></button><!--
			--><button type="button" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	
	<div class="layer_popup_contents">
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>											
					<tr>
						<th width="80">Name(Eng)</th>
						<td width="95"><input type="text" name="s_eng_name"  value="" dataformat="excepthan" style="ime-mode:inactive;text-transform:uppercase;width:85px" onkeypress="if(event.keyCode==13){return false;}"/></td>
						<th width="60"><bean:message key="Alias"/></th>
						<td width="95"><input type="text" name="s_short_name"  value="" dataformat="excepthan" style="ime-mode:inactive;text-transform:uppercase;width:90px" onkeypress="if(event.keyCode==13){return false;}"/></td>
						<th width="60"><bean:message key="Name"/></th>
						<td><input type="text" name="s_pic_name"  value="" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:90px" onkeypress="if(event.keyCode==13){return false;}"/></td>
					</tr>
				</table>
			</div>
		</div>
		
		<div class="wrap_result">
			<div class="opus_design_inquiry">
			<div class="opus_design_grid" id="mainTable">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
			<table border="0" width="1100">
					<tr>
						<td width="100">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>
						<td align="center" width="900">
							<table width="900">
								<tr>
									<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
									</td>
								</tr>
							</table>		
						</td>
						<td width="100"></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</form>


