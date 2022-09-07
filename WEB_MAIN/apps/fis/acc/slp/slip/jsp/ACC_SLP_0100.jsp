<%--
=========================================================
*@FileName   : ACC_SLP_0100.jsp
*@FileTitle  : Block History
*@Description: Block History
*@author     : Lee Hae-Kyoung - Cyberlogitec
*@version    : 1.0 - 11/14/2014
*@since      : 11/14/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0100.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		var PARAM1_1 = ' |';
		var PARAM1_2 = ' |';
		
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
	    <!-- Block Type Code 코드조회-->
		<bean:define id="blockTpCdList"  name="rtnMap" property="blockTpCdList"/>
		<logic:iterate id="codeVO" name="blockTpCdList">
			<% if(isBegin){ %>
				PARAM1_1+= '|';
				PARAM1_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>

			   PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
			   if('<bean:write name="codeVO" property="cd_val"/>' == 'B' || '<bean:write name="codeVO" property="cd_val"/>' == 'U'){
				   PARAM1_1+= 'Accounting Block';
			   }else{
				   PARAM1_1+= 'Block Maintenance';
			   }		
		        
	    </logic:iterate>
	    
		var PARAM2_1 = ' |';
		var PARAM2_2 = ' |';
		
		<% isBegin = false; %>
	    <!-- GL Group Code 코드조회-->
		<bean:define id="blockTpCdList2"  name="rtnMap" property="blockTpCdList"/>
		<logic:iterate id="codeVO" name="blockTpCdList2">
			<% if(isBegin){ %>
				PARAM2_1+= '|';
				PARAM2_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM2_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>

	    function setupPage(){
	     	loadPage();
	     }
	</script>
</head>
<body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	
	<!-- 타이틀, 네비게이션 -->
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
    	<!-- 타이틀, 네비게이션 -->
    
    	<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
		<%-- 
			<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button>
			 --%>
		</div>
		<!-- opus_design_btn(E) -->
		
		<!-- page_location(S) -->
		<div class="location">	
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
		<!-- page_location(E) -->
			
	</div>
	<!-- page_title_area(E) -->
		
	<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="60">
					<col width="110">
					<col width="90">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Exec_Date"></bean:message></th>
						<td>
							<input type="text" name="s_prd_strdt" required onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_prd_enddt);firCalFlag=false;" style="width:70px"  size='11' maxlength="10" class="search_form"><!-- 
							--><span class="dash">~</span><!-- 
							--><input type="text" name="s_prd_enddt" required onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_prd_strdt, this);firCalFlag=false;" style="width:70px" size='11' maxlength="10" class="search_form"><!-- 
							--><button type="button" onclick="doDisplay('DATE11', frm1);" id="s_prd_dt_cal" name="s_prd_dt_cal" class="calendar" tabindex="-1"></button>
						</td>
						<th><bean:message key="Program"></bean:message></th>	
						<td>
							<input type="radio" name="s_block_opt" id="s_block_opt1" value="" onClick="setPage('1');" checked><label for="s_block_opt1"><bean:message key="All"/></label>
               				<input type="radio" name="s_block_opt" id="s_block_opt2" value="A" onClick="setPage('1');"><label for="s_block_opt2"><bean:message key="Acct_Block"/></label>
                			<input type="radio" name="s_block_opt" id="s_block_opt3" value="M" onClick="setPage('1');"><label for="s_block_opt3"><bean:message key="Block_Mntnc"/></label>
                			<input type="radio" name="s_block_opt" id="s_block_opt4" value="V" onClick="setPage('1');"><label for="s_block_opt4"><bean:message key="Month_Closing_for_VAT_Declaration"/></label>
						</td>
						
						<td></td>	
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
    
    <!-- opus_design_grid(S) -->
	<div class="wrap_result">
		<div class="opus_design_grid "id="mainTable">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<table>
		   <tr>
		    <td width="55px">
		     <!--- Display option Begin --->
		      <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
					<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
					<paging:options name="pagingVal" defaultval="200"/>
		     <!--- Display option End --->                 
		    </td>
		     <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;' width="840px">
		    </td>
		   </tr>
	      </table>
	</div>
	<!-- opus_design_grid(E) --> 
	
	
</div>
	</form>

<script type="text/javascript">
		doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
		<%-- doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
 --%>
</script>

