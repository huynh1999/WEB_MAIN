<%--
=========================================================
*@FileName   : CMM_POP_0310.jsp
*@FileTitle  : CMM
*@Description: State Code Popup
*@author     : Kim,Jin-Hyuk
*@version    : 1.0 - 2011/10/17
*@since      : 2011/10/17

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/02
*@since      : 2014/07/02
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0220.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript">
		var usrNm = "<%= userInfo.getUser_name() %>";
		var ofcLoclNm = "<%= userInfo.getOfc_locl_nm() %>";
		
		function setupPage(){
			
		}
	</script>
	
<style> body { border-top-width: 6px!important; } </style>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" class="td">
<form name="frm1" method="POST" action="./">
	<!-- Report Value -->
	<input	type="hidden" name="f_cmd"/> 
	
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="title"/>
	
	<div class="layer_popup_title">
		<!-- Button -->
		<div class="page_title_area clear">
		   <h2 class="page_title"><span><bean:message key="Sales_Daily_Report"/></span></h2>
		   
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button id="btnPrint" type="button" class="btn_accent" onclick="doWork('Print')"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
			<div class="opus_design_inquiry ">
		    	<table width="340" border="0" cellspacing="0" cellpadding="0">
			        <tr>
			            <td width="70px" nowrap class="table_search_head_r"><bean:message key="Date"/></td>
			            <td nowrap class="table_search_body">
			            	<input required type="text" id="s_visit_tm_fm" name="s_visit_tm_fm" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10"><!-- 
			            --><button id="s_visit_tm_cal" type="button" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"/>
			            </td>           
			        </tr>
			    </table>
		    </div>
	    </div>
	</div>
</div>
</form>
</body>
</html>




