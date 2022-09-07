<%--
=========================================================
*@FileName   : CMM_POP_0230.jsp
*@FileTitle  : Performance Exchange Rate Search
*@Description: 재무환률 조회 팝업
*@author     : Kang,Jung Gu - Cyberlogitec
*@version    : 1.0 - 01/21/2009
*@since      : 01/19/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="./apps/fis/cmm/pop/exchangemgt/script/CMM_POP_0230.js?ver=<%=CLT_JS_VER%>"></script>
    
</head>
<body class="td" onload="javascript:loadPage();setToday();doWork('SEARCHLIST');">
<form name="frm1" method="POST" action="./">
		
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="openMean"/>

<%  String currFrm  = "";
	String currPerf = "";
%>
	<bean:define id="hMap"    name="EventResponse" property="mapVal"/>
	<bean:define id="tmpFrm"  name="hMap" property="f_fm_curr_cd"/>
	<bean:define id="tmpPerf" name="hMap" property="STDCURR"/>
<%  currFrm  = tmpFrm.toString();
	currPerf = tmpPerf.toString();
%>


    <!-- 타이틀, 네비게이션 -->
    <table width="665" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><bean:message key="Performance_Exchange_Rate_Search"/></td>
            <td align="right" nowrap class="navi"></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="665" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="665" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td onclick="doWork('SEARCHLIST')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                         </td>
                         <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                         <td onclick="window.close();" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                          </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
    <!--빈공간 -->
    <table width="665" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="665" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left" class="table_search_bg"><!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="left" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="100" nowrap class="table_search_head"><bean:message key="From_To_Curr"/></td>
                                <td class="table_search_body">
                                    <input name="f_fm_curr_cd"   type="text" value="<%=currFrm%>"  class="search_form" style="width:50;" readOnly>
                                    /
                                    <input name="f_perf_curr_cd" type="text" value="<%=currPerf%>" class="search_form" style="width:50;" readOnly>
                                </td>
                                <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                <td class="table_search_body">
                                    <input type="radio" name="f_dt_clss_cd" id="f_dt_clss_cd1" value="D" onclick="chgDisp(1)" checked><label for="f_dt_clss_cd1"><bean:message key="Day"/></label> 
                                    <input type="radio" name="f_dt_clss_cd" id="f_dt_clss_cd2" value="M" onclick="chgDisp(2)"><label for="f_dt_clss_cd2"><bean:message key="Month"/></label>                         
                                </td>
                                <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                <td class="table_search_body">
									<div id="dayVal" style="display:block;">
										<input type="text" name="etd_strdt" value="<wrt:write name="hMap" property="f_dft_dt" formatType="DATE" fromFormat="yyyymmdd" format="yyyy-MM-dd"/>" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" size='11' maxlength="10" class="search_form">
										<img id="etd_dt_cal" onclick="doDisplay('DATE01', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
									</div>
                                    <div id="monthVal" style="display:none;">
										<select name="f_etd_year">
										</select>
										/
										<select name="f_etd_month">
											<option value="01">1</option><option value="02">2</option><option value="03">3</option>
											<option value="04">4</option><option value="05">5</option><option value="06">6</option>
											<option value="07">7</option><option value="08">8</option><option value="09">9</option>
											<option value="10">10</option><option value="11">11</option><option value="12">12</option>
										</select>
                                    </div>									
                                </td>
                            </tr>
                        </table>
                      </td>
                    </tr>
                </table>
                <!-- 간격 -->
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
              <!-- 간격 -->
            </td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <!--빈공간 -->
    <table width="665" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="665" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
                            <table border="0" width="100%" id="mainTable">
                                <tr>
                                    <td>
                                        <script language="javascript">comSheetObject('sheet1');</script>
                                     </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</form>
</body>
</html>