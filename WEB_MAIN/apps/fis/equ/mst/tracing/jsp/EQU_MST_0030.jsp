<%--
=========================================================
*@FileName   : EQU_MST_0030.jsp
*@FileTitle  : Route Creation
*@Description: Route Creation
*@author     : Kang dae soo - Cyberlogitec
*@version    : 1.0 - 10/15/2009
*@since      : 10/15/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
    
	<!-- 일자 및 달력팝업 호출 -->
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EQU_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/equ/mst/tracing/script/EQU_MST_0030.js?ver=<%=CLT_JS_VER%>"></script>
</head>

<body class="TD" onload="javascript:loadPage();">
	<form name="frm1" method="POST">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="hid_cntr_no"/>
	<input type="hidden" name="h_mbl_seq"/>
	
	<input type="hidden" name="cmd_type"/>
	<input type="hidden" name="title"/>
	<input type="hidden" name="m_cntr_no"/>
    <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
	    <tr>
		    <td class="bigtitle"><%=LEV3_NM%></td>
		    <td align="right" nowrap="nowrap" class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
	    </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
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
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('NEW')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('ROUTE_POPLIST')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name">Route&nbsp;<bean:message key="Create"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('MODIFY')">
							<table id="btnModify" height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<!-- mail send 추가 (2009.12.2)-->
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('SUPPLY')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="EMail"/></td>
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
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="950" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left" class="table_search_bg"><!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="100%" align="left" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="30" nowrap="nowrap" class="table_search_head_r"><bean:message key="ETD"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="fm_etd_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="10"/>
								<img id="fm_etd_dt_cal" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE1', frm1);" align="absmiddle" style="cursor:pointer"/>
                                ~
                            	<input name="to_etd_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="10"/>
								<img id="to_etd_dt_cal" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE2', frm1);" align="absmiddle" style="cursor:pointer"/>
                            </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="80" nowrap="nowrap" class="table_search_head">Booking No</td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="bkg_no" maxlength="20" value="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:115;" onBlur="javascript:this.value=this.value.toUpperCase();">
							<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="doWork('BKNO_POPLIST')" style="cursor:hand" align="absmiddle"/>
                            </td>
                            <td width="10 "><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="MBL_No"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="mbl_no" maxlength="40" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:115;"/>
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="sr_no" onClick="doWork('MBL_POPLIST')" style="cursor:hand;" align="absmiddle"/>
                            </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="Vessel"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="trnk_vsl_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('srvessel',this, 'onKeyDown')" onBlur="codeNameAction('srvessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trnk_vsl_cd" onClick="doWork('VESSEL_POPLIST')" style="cursor:hand;" align="absmiddle"/>
								<input name="trnk_vsl_nm" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:80;" disabled="true">
                            </td>
                        </tr>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                             <td width="75" nowrap="nowrap" class="table_search_head"><bean:message key="A_Shipper"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="ship_trdp_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_a',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_a',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="ship_trdp_cd" onClick="doWork('SHIPPER_POPLIST')" style="cursor:hand;" align="absmiddle"/>
								<input name="ship_trdp_nm" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:80;" disabled="true">
                            </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="90" nowrap="nowrap" class="table_search_head"><bean:message key="IMP_Partner"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="trdp_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_p',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_p',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="lr_trdp_cd" onClick="doWork('IMPPARTNER_POPLIST')" style="cursor:hand;" align="absmiddle"/>
								<input name="trdp_nm" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:80;" disabled="true">
                            </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="Partner"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="lr_trdp_cd" maxlength="20" value='' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trdp_cd" onClick="doWork('PARTNER_POPLIST')" style="cursor:hand;" align="absmiddle"/>
								<input name="lr_trdp_nm" maxlength="50" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:80;" disabled="true">
                            </td>
                            <td width="10 "><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="60" nowrap="nowrap" class="table_search_head">Cntr No.</td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="cntr_no" value='' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;"/>
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="sr_no" onClick="doWork('CNTR_POPLIST')" style="cursor:hand;" align="absmiddle"/>
                            </td>
                        </tr>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="75" nowrap class="table_search_head"><bean:message key="Country"/></td>
	                            <td class="table_search_body"><input type="text" name="cnt_cd" value="" class="search_form" dataformat="excepthan" style="width:50;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onKeyDown="codeNameAction('country',this, 'onKeyDown')" onBlur="codeNameAction('country',this, 'onBlur')">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('COUNTRY_POPLIST')"/>
    	                        <input type="text" name="cnt_nm" value='' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:left" readOnly>
    	                    </td>
                            <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="POL"/></td>
                            <td nowrap="nowrap" class="table_search_body">
                            	<input name="pol_cd" maxlength="5" value='' type="text" class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;"/>
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="doWork('POL_POPLIST')" style="cursor:hand;" align="absmiddle"/>
								<input name="pol_nm" maxlength="50" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:110;" disabled="true"/>
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
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
				<!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                     <td nowrap="nowrap" width="120">
                    	<table border="0" cellpadding="0" cellspacing="0">
                    		<tr>
                    			<td nowrap="nowrap"  class="sub_title"  width="120">
                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Basic_Information"/>
                    			</td>
                    		</tr>
                    	</table>
                    </td>
                     <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                     <td align="right" style="cursor:hand" onclick="doWork('EXCEL')" width="50" id="excel" style="display:none">
                         <table height="21" border="0" cellpadding="0" cellspacing="0">
                             <tr>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
                                 <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Excel"/></td>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
                             </tr>
                         </table>            
                     </td>
                     <td align="right" style="cursor:hand" onclick="doWork('PRINT')" width="45" id="prn" style="display:none">
                         <table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0">
                             <tr>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
                                 <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
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
</html>