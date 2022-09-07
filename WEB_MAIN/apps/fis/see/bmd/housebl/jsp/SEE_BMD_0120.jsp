<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0120.jsp
*@FileTitle  : A.E.S 등록
*@Description: A.E.S 등록 및 조회
*@author     : PJK
*@version    : 1.0 - 11/14/2011
*@since      :

*@Change history:
=========================================================
--%>
<%@page import="com.clt.apps.fis.mdm.mcm.office.dto.OfcVO"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <% boolean isBegin = false; %>
    
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>

    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>

    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0120.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript">

		var v_usrDept = "<%=userInfo.getDept_cd()%>";
		var v_usrId   = "<%= userInfo.getUsrid() %>";
		var v_ofc_cd  = "<%= userInfo.getOfc_cd() %>";
		var v_usrNm   = "<%= userInfo.getUser_name() %>";		
		var v_eml     = "<%= userInfo.getEml() %>";
		var v_serPhn  = "<%= userInfo.getPhn()%>";
	
		//<bean:message key="License_Type"/>의 내용을 배열에 저장
		var licenseTpArr = new Array();
		<logic:iterate id="licenseTp" name="valMap" property="licenseTpList">
			licenseTpArr.push("<bean:write name="licenseTp" property="cd_nm"/>");
		</logic:iterate>

		//DDTC USML Category의 내용을 배열에 저장
		var ddtcUsmlCdArr = new Array();
		ddtcUsmlCdArr.push("");//비어있는 Option 이 있기때문에 index를 맞추기 위함
		<logic:iterate id="ddtcUsmlCd" name="valMap" property="ddtcUsmlCdList">
		ddtcUsmlCdArr.push("<bean:write name="ddtcUsmlCd" property="cd_nm"/>");
		</logic:iterate>

		//DDTC Unit의 내용을 배열에 저장
		var ddtcUnitCdArr = new Array();
		<logic:iterate id="ddtcUtCd" name="valMap" property="ddtcUtCdList">
		ddtcUnitCdArr.push("<bean:write name="ddtcUtCd" property="cd_nm"/>");
		</logic:iterate>

		//Origin Type Code
        var orgTpCd = '';
        var orgTpNm = '';
        <% isBegin = false; %>
        <logic:iterate id="orgTp" name="valMap" property="orgTpList">
            <% if(isBegin){ %>
            	orgTpCd += '|';
            	orgTpNm += '|';
            <% }else{
                  isBegin = true;
               } %>
               orgTpCd += '<bean:write name="orgTp" property="cd_val"/>';
               orgTpNm += '<bean:write name="orgTp" property="cd_nm"/>';
        </logic:iterate>

		//Vehicle ID Type
        var vhcIdTpCd = '';
        var vhcIdTpNm = '';
        <% isBegin = false; %>
        <logic:iterate id="vhcIdTp" name="valMap" property="vhcIdTpList">
            <% if(isBegin){ %>
            	vhcIdTpCd += '|';
            	vhcIdTpNm += '|';
            <% }else{
                  isBegin = true;
               } %>
               vhcIdTpCd += '<bean:write name="vhcIdTp" property="cd_val"/>';
               vhcIdTpNm += '<bean:write name="vhcIdTp" property="cd_nm"/>';
        </logic:iterate>

		function titBlStyle(isDisable){
			var styleStr = 'table_search_head';
			if(isDisable){
				styleStr = 'table_search_head_r';
			}
		
			blShpObj.className = styleStr;
			blConObj.className = styleStr;
		
			blIsDtObj.className = styleStr;
		}
		
		function dispBizBtns(dispTp){
			//bkgCntrObj.style.display = 'none';
		
			//Mark&Decription
			getObj('sadAuto').style.display  = dispTp;
			getObj('addAuto').style.display  = dispTp;
			getObj('mkSayAuto').style.display= dispTp;
			//ediAdd.style.display   = dispTp;

			//Container 탭
			//cnrtPopAdd.style.display = dispTp;
			getObj('cnrtAdd').style.display = dispTp;
			getObj('itmAdd').style.display = dispTp;

			//Freight버튼
			getObj('sdBtns').style.display    = dispTp;
			getObj('bcBtns').style.display    = dispTp;
		}
		
	   </script>
<script>
function setupPage(){
	loadPage();
	doHideProcess();
}
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
</script>
<form name="frm1" method="POST" action="./SEE_BMD_0120.clt">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_save_flg" value="<bean:write name="valMap" property="saveFlg"/>">
    <input type="hidden" name="s_rep_cmdt_cd" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>">
    <input type="hidden" name="s_rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>">
    <input type="hidden" name="s_cmdt_ut1" value="<bean:write name="hblVO" property="cmdt_ut1"/>">
    <input type="hidden" name="s_cmdt_ut2" value="<bean:write name="hblVO" property="cmdt_ut2"/>">
    <input type="hidden" name="s_pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>">
    <input type="hidden" name="s_wgt" value="<bean:write name="hblVO" property="wgt"/>">
    <input type="hidden" name="s_cntr_add_flg" value="<bean:write name="hblVO" property="cntr_add_flg"/>">
    <input	type="hidden" name="file_name" id="file_name"/>
    <input	type="hidden" name="rd_param" id="rd_param"/>
    <input	type="hidden" name="title" id="title"/>
    
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- <!--
	   --><button type="button" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!--
	   --><button type="button" style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>" class="btn_normal" onclick="doWork('MODIFY')" id="btnModify"><bean:message key="Save"/></button><!--
	   --><button type="button" style="display: inline;" class="btn_report" onclick="doWork('PRINT')"  id="btnPrint"><bean:message key="Print"/></button><!--
	   --><button type="button" style="display: none;" btnAuth="SEND" class="btn_normal" onclick="doWork('SEND_FORM')"><bean:message key="Send"/></button> --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
    
    <!-- Search option -->
<div class="over_wrap" height="100%">
    <div class="wrap_search_tab">	
		<div class="opus_design_inquiry wFit">
			<table>
				<tr>
					<th width="60px"><bean:message key="HBL_No"/></th>
					<td width="140px"><!-- 
						 --><input required type="text" name="f_bl_no"  maxlength="40" value="<bean:write name="hblVO" property="hbl_no"/>" dataformat="excepthan" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('AES_HBL_POPLIST',this);}"><!--
						 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="openPopUp('AES_HBL_POPLIST',this)"></button>
					</td>
					<td width="400px"></td>
					<%-- 
					<td width="50px"><img src="<%=CLT_PATH%>/web/img/main/aesdirect_01.jpg" width="80px" height="28px" border="0" align="absmiddle"></td>
					<td><!-- 
					 --><table cellpadding="0" cellspacing="0"><!-- 
						 --><tr><!-- 
						 	--><td><a tabindex="-1" href="http://aesdirect.census.gov" target="blank"><span class="body_pop" ><bean:message key="AESDirect_Hompage"/></span></a></td><!-- 
						 --></tr><!-- 
						 --><tr><!-- 
						 	--><td><a tabindex="-1" href="http://aesdirect.census.gov/support/login_help.html" target="blank" ><span class="body_pop"><bean:message key="AESWebLink_Login_Help"/></span></a></td><!-- 
						 --></tr><!-- 
					 --></table></td>--%>				
					<td width="50px"><img src="<%=CLT_PATH%>/web/img/main/ace.png" width="80px" height="48px" border="0" align="absmiddle"></td>
					<td><!-- 
					 --><table cellpadding="0" cellspacing="0"><!-- 
						 --><tr><!-- 
						 	--><td><a tabindex="-1" href="http://www.census.gov/foreign-trade/aes/aesdirect/AESDirect-User-Guide.pdf" target="blank"><span class="body_pop" ><bean:message key="AESDirect_Hompage"/></span></a></td><!-- 
						 --></tr><!-- 
						 --><tr><!-- 
						 	--><td><a id = "ace_login_url" tabindex="-1" href="https://ace.cbp.dhs.gov/" target="blank" ><button type="button" class="body_pop" disabled ><bean:message key="AESWebLink_Login_Help"/></button></a></td><!-- 
						 --></tr><!-- 
					 --></table></td>
				</tr>
			</table>
		</div>
	</div>
    <div class="wrap_result_tab">
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="General_Information"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Party_Information"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Export_LicInformation"/></span></a></li>
	    </ul>
	    <div id="tabLayer" name="tabLayer" style="display:inline">
		   <%@ include file = "./SEE_BMD_0121.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none">
			   <%@ include file = "./SEE_BMD_0122.jsp"%>
		</div>
		<div id="tabLayer" name="tabLayer" style="display:none">
			   <%@ include file = "./SEE_BMD_0123.jsp"%>
		</div>
	</div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>
		
<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	
	
<div id="sndLayer" style="display:none"><!--Send Form-->
	<%@ include file = "./SEE_BMD_0124.jsp"%>
</div>

