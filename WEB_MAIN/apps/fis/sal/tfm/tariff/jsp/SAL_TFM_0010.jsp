<%--
=========================================================
*@FileName   : SAL_TFM_0010.jsp
*@FileTitle  : Sea Tariff
*@Description: Sea Tariff
*@author     : Kang dae soo - Cyberlogitec
*@version    : 1.0 - 10/15/2009
*@since      : 10/15/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.component.util.JSPUtil"%></html>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sal/tfm/tariff/script/SAL_TFM_0010.js?ver=<%=CLT_JS_VER%>"></script>

</head>
<script language="javascript">
	<!-- 처리시 메시지 -->
	var PARAM1_1 = '';
	var PARAM1_2 = '';
	var PARAM2_1 = '';
	var PARAM2_2 = '';
	var PARAM3_1 = '';
	var PARAM3_2 = '';
	var PARAM4_1 = '';
	var PARAM4_2 = '';
	var PARAM5_1 = '';
	var PARAM5_2 = '';
	var typeSize_1 = '';
	var typeSize_2 = '';
	
	
	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

	<% boolean isBegin = false; %>
    <!-- Bound Class Code 코드조회-->
	<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	<logic:iterate id="codeVO" name="param1List">
		<% if(isBegin){ %>
			PARAM1_1+= '|';
			PARAM1_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
        PARAM1_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
    </logic:iterate>
    <!-- Sell Buy Type Code 코드조회-->
	<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
	<logic:iterate id="codeVO" name="param2List">
		<% if(isBegin){ %>
			PARAM2_1+= '|';
			PARAM2_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
        PARAM2_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
    </logic:iterate>    
    <!-- Unit CNTR Code 코드조회-->
	<bean:define id="param3List"  name="rtnMap" property="PARAM3"/>
	<logic:iterate id="codeVO" name="param3List">
		<% if(isBegin){ %>
			PARAM3_1+= '|';
			PARAM3_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM3_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
        PARAM3_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
    </logic:iterate>

    <!-- Customer Type Code 코드조회-->
	<bean:define id="param4List"  name="rtnMap" property="PARAM4"/>
	<logic:iterate id="codeVO" name="param4List">
		<% if(isBegin){ %>
			PARAM4_1+= '|';
			PARAM4_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM4_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
        PARAM4_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
    </logic:iterate>

    <!-- Currency Code 코드조회-->
	<bean:define id="param5List"  name="rtnMap" property="PARAM5"/>
	<logic:iterate id="codeVO" name="param5List">
		<% if(isBegin){ %>
			PARAM5_1+= '|';
			PARAM5_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM5_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
        PARAM5_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
    </logic:iterate>
    
   	<!--typeSize 코드조회-->
	var typeSize= '<bean:write name="rtnMap" property="typeSize" filter="false"/>';
	typeSize_2 += "A" + typeSize.substring(0, typeSize.indexOf(";"));
	typeSize_1 += typeSize.substring(typeSize.indexOf(";")+1, typeSize.length);


</script>
<body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="hid_trf_ctrt_no"/>
	<input type="hidden" name="h_trf_tp_cd" value="S"/>
	<input type="hidden" name="ofc_curr_cd" value="<bean:write name="rtnMap" property="trf_cur_cd" filter="false"/>"/>
	<!-- Report Value -->
	<input type="hidden" name="tariff_no"/>
	<input type="hidden" name="s_trdp_cd"/>
	<input type="hidden" name="s_trdp_nm"/>
	<input type="hidden" name="quotation_no"/>
	<input type="hidden" name="air_sea_clss_cd" value="S"/>
	<input type="hidden" name="sell_buy_cd" value="<%=JSPUtil.getParameter(request, "sell_buy_tp_cd", "") %>"/>
	
    <!-- 타이틀, 네비게이션 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
	    <tr>
		    <td class="bigtitle"><%=LEV3_NM%></td>
		    <td align="right" nowrap="nowrap" class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
	    </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td style="cursor:hand" onclick="doWork('SEARCHLIST')">
							<table height="21" border="0" cellpadding="0" cellspacing="0" >
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
						<td style="cursor:hand" onclick="doWork('NEW')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
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
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left" class="table_search_bg"><!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="120" align="left" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                        	<!-- 
                            <td nowrap="nowrap" class="table_search_head_r" width="10%"><bean:message key="Sell_Buy"/></td>
	                      	<td nowrap="nowrap" class="table_search_body" width="30%">
	                      	<input type="radio" name="sell_buy_tp_cd" id="radio4" value="S" checked="true"/>
                            Sell
                            <input type="radio" name="sell_buy_tp_cd" id="radio5" value="B" />
		                    Buy                    
	                      	</td>
	                      	<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
	                      	 -->
                            <td width="30" nowrap="nowrap" class="table_search_head"><bean:message key="POL"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="pol_cd" maxlength="5"  value='<%=JSPUtil.getParameter(request, "pol_cd", "") %>' type="text" class="search_form" onKeyDown="codeNameAction('Location_pol', this, 'onKeyDown')" onBlur="codeNameAction('Location_pol', this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="doWork('POL_POPLIST')" style="cursor:hand;" align="absmiddle">
                            </td>
                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
                            <td width="30" nowrap="nowrap" class="table_search_head"><bean:message key="POD"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="pod_cd" maxlength="5" value='<%=JSPUtil.getParameter(request, "pod_cd", "") %>' type="text" class="search_form" onKeyDown="codeNameAction('Location_pod', this, 'onKeyDown')" onBlur="codeNameAction('Location_pod', this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="doWork('POD_POPLIST')" style="cursor:hand;" align="absmiddle">
                            </td>
                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="Customer"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="trdp_cd" maxlength="20" value='<%=JSPUtil.getParameter(request, "trdp_cd", "") %>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trdp_cd" onClick="doWork('CUSTOMER_POPLIST')" style="cursor:hand;" align="absmiddle">
								<input name="trdp_nm" maxlength="50" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:150;" disabled="true">
                            </td>
                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
                            <td width="80" nowrap="nowrap" class="table_search_head"><bean:message key="Apply_Date"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="trf_term_dt" type="text" value='' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form" style="width:72px;" maxlength="10"/><img src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE1', frm1);" align="absmiddle" style="cursor:pointer"/>
							</td>
                        </tr>
                    </table>
                </td>
                <td width="600"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
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
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
				<!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" height="21">
                  <tr>
                    <td nowrap="nowrap" width="120">
                    	<table border="0" cellpadding="0" cellspacing="0">
                    		<tr>
                    			<td nowrap="nowrap"  class="sub_title"  width="120">
                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="CONTRACT"/>
                    			</td>
                    		</tr>
                    	</table>
                    </td>
                     <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                     <td align="right" width="50">
						<table height="21" border="0" cellpadding="0" cellspacing="0" onclick="doWork('ROWADD')" style="cursor:hand" >
							<tr>
								<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
								<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Add"/></td>
								<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
							</tr>
						</table>
					</td>
					<!-- 
					<td align="right" width="50" >
						<table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0" onclick="doWork('PRINT')" style="cursor:hand" >
							<tr>
								<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
								<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
								<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
							</tr>
						</table>
					</td>
					 -->
					<td align="right" width="50">
						<table height="21" border="0" cellpadding="0" cellspacing="0" onclick="doWork('MODIFYHEADER')" style="cursor:hand" >
							<tr>
								<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
								<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
								<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
							</tr>
						</table>
					</td>
					<!-- 
					<td align="right" width="55" >
						<table height="21" border="0" cellpadding="0" cellspacing="0" onclick="doWork('REMOVEALL')" style="cursor:hand" >
							<tr>
								<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
								<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Delete"/></td>
								<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
							</tr>
						</table>
					</td>
					 -->
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                </table>
                <!-- 간격 -->
				<table border="0" width="100%">
					<tr>
						<td>
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
			</td>
		</tr>
	</table>
	<!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
				<!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" height="20">
                  <tr>
                    <td nowrap="nowrap" width="120">
                    	<table border="0" cellpadding="0" cellspacing="0">
                    		<tr>
                    			<td nowrap="nowrap"  class="sub_title"  width="120">
                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Tariff"/>
                    			</td>
                    		</tr>
                    	</table>
                    </td>
                    <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    <td align="right" onclick="doWork('ROWADD2')" width="50" id="rowAdd" style="display:none">
						<table height="21" border="0" cellpadding="0" cellspacing="0" style="cursor:hand">
							<tr>
								<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
								<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Add"/></td>
								<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
							</tr>
						</table>
					</td>
					<td align="right" onclick="doWork('MODIFYALL')" width="50" id="rowAdd2" style="display:none">
						<table height="21" border="0" cellpadding="0" cellspacing="0" style="cursor:hand" >
							<tr>
								<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
								<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
								<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
							</tr>
						</table>
					</td>
					<!-- 
					<td align="right" onclick="doWork('REMOVE')" width="55" id="rowAdd3" style="display:none">
						<table height="21" border="0" cellpadding="0" cellspacing="0" style="cursor:hand" >
							<tr>
								<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
								<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Delete"/></td>
								<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
							</tr>
						</table>
					</td>
					 -->
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                </table>
                <!-- 간격 -->
				<table border="0" width="100%">
					<tr>
						<td>
							<table border="0" width="100%" id="mainTable">
								<tr>
									<td>
										<script language="javascript">comSheetObject('sheet2');</script>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
      </tr>
    </table>
	</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>
</body>