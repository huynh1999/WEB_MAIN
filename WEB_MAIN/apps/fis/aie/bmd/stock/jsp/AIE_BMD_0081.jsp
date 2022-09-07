<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0081.jsp
*@FileTitle  : MAWB Stock 등록 및 수정 
*@author     : CLT
*@version    : 1.0
*@since      : 2016/04/04
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/aie/bmd/stock/script/AIE_BMD_0081.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
		function setupPage(){
			loadPage();
		}
	</script>
	
<%
	String awbType = (String)request.getAttribute("awbtype");
%>

<logic:notEmpty name="EventResponse" property="mapVal">
    <bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<script>
			var rtnmsg  = '<bean:write name="tmpMap" property="RTNMSG"/>';
			var rtncode = '<bean:write name="tmpMap" property="RTNCODE"/>';
			var rtncnt  = '<bean:write name="tmpMap" property="RNTCNT"/>';
			var iatacd  = '<bean:write name="tmpMap" property="IATACD"/>';
			var awbtype = '<bean:write name="tmpMap" property="AWBTYPE"/>';

			if(rtncode == "Y"){
				alert(rtncnt + " 건의 CNA정보가 " + rtnmsg);

				//parent.opener.frm1.s_iata_cd.value = iatacd;
				//if(awbtype == "CL"){
					//parent.opener.frm1.s_awbtype[0].checked = true;
				//}else{
					//parent.opener.frm1.s_awbtype[1].checked = true;
				//}
				
	       		window.opener.doWork("SEARCHLIST01");
	       		//window.close();

	       		//2016.04.15 C.W.Park Modified
				//parent.opener.searchSheet1Child();
				
				//window.close();
			}else {
				if(rtnmsg != ""){
					alert(rtnmsg);
					//2016.04.15 C.W.Park Modified
		       		window.opener.doWork("SEARCHLIST01");
		       		//window.close();
				}
			}
			
		</script>
</logic:notEmpty>


<style> body { border-top-width: 6px!important; } </style>
</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>

<form name="frm1" method="POST" action="./AIE_BMD_0081.clt" enctype="multipart/form-data">
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd"/> 
    <input type="hidden" name="awbType_in" value="<%=awbType%>"/> 
    	
	<div class="layer_popup_title">
    	<div class="page_title_area clear">
	
			<!-- page_title(S) -->
			<h2 class="page_title"><span><bean:message key="Xml_Upload"/></span></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn (S) -->
			<div class="opus_design_btn">
				<button class="btn_accent" id="btnUpload" type="button" onclick="doWork('UPLOAD')"><bean:message key="Upload"/></button><!--
				--><button class="btn_normal"  type="button" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
				</div>
			<!-- opus_design_btn (E) -->
		
			<!-- page_location(S) -->
			<div class="location">	
				
			</div>
			<!-- page_location(E) -->
		</div>
	</div>

	<div class="layer_popup_contents">
		<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
	    <div class="wrap_search">
			<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry ">
				<table>
					<tbody>
					<tr>
						<th><bean:message key="File_Attach"/></th>
						<td>
							<input tabindex = "-1" type="file" name="cna_url" class="search_form" size="60"/>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- opus_design_inquiry(E) -->
	</div>

    <div class="wrap_result">
		<!-- opus_design_grid(S) -->
		<div class="opus_design_grid" id="mainTable">
			<script type="text/javascript">comSheetObject('sheet1');</script>		
		</div>
	<!-- opus_design_grid(E) -->
	</div>
</div>
</form>

<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="andoFileDown"/>
    <input type="hidden" name="docType" value=""/>    
</form>




