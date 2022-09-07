<%--
=========================================================
*@FileName   : SEI_DOC_0031.jsp
*@FileTitle  : AN등록및 수정
*@Description: AN등록및 수정 등록 수정한다.
*@author     : 이광훈 - sei =Export 
*@version    : 1.0 -  2009/02/02
*@since      : 2009/04/07

*@Change history: 
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <!-- 공통 Header -->
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>

	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sei/bmd/arrivalnotice/script/SEI_DOC_0031.js?ver=<%=CLT_JS_VER%>"></script>
	<% boolean isSaved = false; 
	   boolean isIssued= false;
	   boolean isReload= false;
	%>		
	<bean:define id="objVO"  name="EventResponse" property="objVal"/>
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<logic:notEmpty name="tmpMap" property="shipDocExt">
			<script>
				var shipDocExt = '<bean:write name="tmpMap" property="shipDocExt"/>';
			</script>
		</logic:notEmpty>
		
		<logic:notEmpty name="tmpMap" property="isReload"><!--저장 이 후 화면 Reload인 경우-->
			<% isReload = true;%>
		</logic:notEmpty>		
		
		<logic:notEmpty name="objVO" property="palt_doc_seq">
			<% isSaved = true; %>
			<logic:notEmpty name="objVO" property="palt_doc_no"><!--Issue가 된경우경우-->
				<% isIssued= true; %>
			</logic:notEmpty>
		</logic:notEmpty>
	</logic:notEmpty>
	<script>
		var isIssued = <%=isIssued%>;
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>
<base target="_self"/>
<body class="td" onload="<% if(isReload) {%>parent.opener.doWork('SEARCHLIST');<% } %>;this.focus();">
<form name="frm1" method="POST" action="./SEI_DOC_0031.clt" enctype="multipart/form-data">
    <input type="hidden" name="f_cmd" value=""/> 
    <input type="hidden" name="s_intg_bl_seq" value=""/> 
    <input type="hidden" name="intg_bl_seq"      value='<bean:write name="objVO" property="intg_bl_seq"/>'/> 
    <input type="hidden" name="intg_bl_rgst_tms" value='<bean:write name="objVO" property="intg_bl_rgst_tms"/>'/> 
    <input type="hidden" name="palt_doc_seq"     value='<bean:write name="objVO" property="palt_doc_seq"/>'/> 
    <input type="hidden" name="tmplt_seq"        value='<bean:write name="objVO" property="tmplt_seq"/>'/> 
    <input type="hidden" name="palt_doc_tp_cd"   value='<bean:write name="objVO" property="palt_doc_tp_cd"/>'/> 
    <input type="hidden" name="palt_doc_no"      value='<bean:write name="objVO" property="palt_doc_no"/>'/> 
    
    <!-- 타이틀, 네비게이션 -->
    <table width="750" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
		<tr>
    		<td class="bigtitle"><bean:message key="Arrival_Notice"/></td>
  		</tr>
    </table>
    <table width="750" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <table width="750" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <!-- 간격 -->
                <!-- 검색창 -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                     <tr>
                         <td width="80" class="table_search_head"><bean:message key="MBL_No"/></td>
                         <td width="150" class="table_search_body">
                             <input type="text" name="mbl_no" class="search_form-disable" maxlength="40" value='<bean:write name="objVO" property="master_bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120;"/>
                         </td>
                         <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
                         <td width="80" class="table_search_head"><bean:message key="Partner"/></td>
                         <td class="table_search_body">
                             <input type="text" name="palt_trdp_cd" class="search_form-disable" value='<bean:write name="objVO" property="palt_trdp_cd"/>' maxlength='20' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80;"/>
                             <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif"/ width="19" height="18" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('PARTNER_POPLIST')"/>
                             <input name="s_trdp_short_nm" type="text" class="search_form-disable" value='<bean:write name="objVO" property="shrt_nm"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60;"/>
                             <input name="s_trdp_full_nm" type="text" class="search_form-disable" maxlength="50" value='<bean:write name="objVO" property="full_nm"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:107;"/>
                         </td>
                     </tr>
           		</table>
                <table width="100%"  border="0" cellpadding="0" cellspacing="0">
                     <tr>
                         <td width="80" class="table_search_head_r"><bean:message key="HBL_No"/></td>
                         <td width="150" class="table_search_body">
                             <input name="hbl_no" type="text" class="search_form-disable" maxlength="40" value='<bean:write name="objVO" property="house_bl_no"/>' dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120;"/>
                         </td>
                         <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
                         <td width="80" class="table_search_head"><bean:message key="PIC"/></td>
                         <td class="table_search_body">
                             <input name="palt_trdp_pic_nm" type="text" class="search_form-disable"  value='<bean:write name="objVO" property="palt_trdp_pic_nm"/>' style="width:100;"/>
                         </td>
                         <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
                         <td width="80" class="table_search_head"><bean:message key="Tel_Fax"/> </td>
                         <td class="table_search_body">
                             <input name="palt_trdp_pic_phn" type="text" class="search_form-disable"  value='<bean:write name="objVO" property="palt_trdp_pic_phn"/>' style="width:100;"/>/
                             <input name="palt_trdp_pic_fax" type="text" class="search_form-disable"  value='<bean:write name="objVO" property="palt_trdp_pic_fax"/>' style="width:100;"/>
                         </td>
                     </tr>
               	</table>
                <!-- 검색창 -->
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <!-- 간격 -->
            </td>
        </tr>
    </table>
    <!--빈공간 -->
    <table width="750" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="750" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg"><!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="100%" rowspan="2" align="left" valign="top"> 
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="120" class="table_search_head_r"><bean:message key="Title"/></td>
                                    <td width="215" class="table_search_body">
                                        <input type="text" name="palt_doc_nm" value='<bean:write name="objVO" property="palt_doc_nm"/>' class="search_form" style="width:210;" maxlength="100" />
                                    </td>
                                    <td>
                                        <% if(!isIssued){ %>
                                                <table border="0" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td class="table_search_body">
                                                            <select name="s_tmplt_tit" onChange="doWork('TITLESEARCH')">
                                                            </select>
                                                        </td>
                                                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
                                                        <td valign="middle">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td align="right" style="cursor:hand" onclick="doWork('TEMPOPEN')">
                                                                        <table border="0" cellpadding="0" cellspacing="0">
                                                                            <tr>
                                                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"/></td>
                                                                                <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"/><bean:message key="New"/> <bean:message key="Template"/></td>
                                                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"/></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                        <% } %>
                                    </td>
                                </tr>
                            </table> 
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="120" class="table_search_head"><bean:message key="Issue_Date"/></td>
                                    <td width="170" class="table_search_body">
                                        <input type="text" name="iss_dt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" size='11' maxlength="10" value='<wrt:write name="objVO" property="iss_dt"  formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>' class="search_form">
                                <% if(!isIssued){ %>                                              
                                        <img id="iss_dt_cal" onclick="doDisplay('DATE1', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                                <% } %>
                                    </td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
                                    <td width="100" class="table_search_head"><bean:message key="Last_Free_Date"/></td>
                                    <td width="170" class="table_search_body">
                                        <input type="text" name="ft_dt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" size='11' maxlength="10" value='<wrt:write name="objVO" property="ft_dt"  formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>' class="search_form">
                                <% if(!isIssued){ %>
                                        <img id="ft_dt_cal" onclick="doDisplay('DATE2', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                                <% } %>
                                    </td>
                                    <td></td>
                                </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="120" class="table_search_head"><bean:message key="File_Attach"/></td>
                                    <td class="table_search_body">
							<logic:notEmpty name="objVO" property="palt_doc_img_url">
								 <span id="span1">
										<b><bean:message key="Original_File"/></b>: <a href="javascript:downloadFile('img');"><bean:write name="objVO" property="palt_doc_img_nm"/></a><br>
								<logic:notEmpty name="objVO" property="palt_doc_pdf_url">
										<b>PDF</b>: <a href="javascript:downloadFile('pdf');"><bean:write name="objVO" property="palt_doc_pdf_nm"/></a><br/>
                                </logic:notEmpty>
                                </span>
							</logic:notEmpty>
								<% if(!isIssued){ %><!--ISSUE가 되지 않은 경우-->
										<input type="file" name="palt_doc_img_url" class="search_form" size="60"/>
								<% } %>
                                    </td>
                                </tr>
                          	</table>
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="120" class="table_search_head_r"><bean:message key="Message"/></td>
                                    <td class="table_search_body">
                                        <textarea name="palt_doc_msg" class="search_form" style="width:560;height:200px" maxlength="400" value=''><bean:write name="objVO" property="palt_doc_msg" filter="false"/></textarea>
                                    </td>
                                </tr>
                          	</table>
                        </td>                        
                    </tr>
                </table>
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <!-- 간격 -->
            </td>
        </tr>
    </table>
	<!-- 검색 -->
	 <!-- 간격 -->
    <table width="750" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!-- 간격 -->
	<!-- 소타이틀, 대버튼 -->
<logic:notEqual name="objVO" property="ofc_flg" value="D">
    <table width="750" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
			<% if(!isIssued){ 
					if(isSaved){ %><!--ISSUE가 되지 않은 경우-->
                        <td style="cursor:hand" onclick="doWork('ISSUE')">
							<table height="21" border="0" cellpadding="0" cellspacing="0" >
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Issue"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
						</td>
					<% } %>	
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"/></td>
				<logic:empty name="objVO" property="palt_doc_seq">
                        <td style="cursor:hand" onclick="doWork('ADD')">
                        	<table id="btnAdd" height="21" border="0" cellpadding="0" cellspacing="0">
				</logic:empty>
				<logic:notEmpty name="objVO" property="palt_doc_seq">
                        <td style="cursor:hand" onclick="doWork('MODIFY')">
                        	<table id="btnModify" height="21" border="0" cellpadding="0" cellspacing="0">
				</logic:notEmpty>
                                <tr>
                                    <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
                                </tr>
                            </table>
                        </td>
					<% if(isSaved){ %>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"/></td>
                        <td style="cursor:hand" onclick="doWork('REMOVE')">
                            <table id="btnDelete" height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Delete"/></td>
                                    <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
                                </tr>
                            </table>
                        </td>
					<% } %>
			<% } %>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
						<td style="cursor:hand" onclick="doWork('CLOSE')">
							<table height="21" border="0" cellpadding="0" cellspacing="0" >
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
						</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</logic:notEqual>
								
	<div id="tpObj" style="display:none;width:300;LEFT:expression((document.body.clientWidth/2)-220); TOP:105px; POSITION:absolute;">
		<table width="370" border="0" cellspacing="1" cellpadding="0" bgcolor="#c2c9d0">
			<tr>
				<td bgcolor="#FFFFFF" align="center">
					<table width="352" border="0" cellspacing="0" cellpadding="0">
						<tr>
                            <td height="4"></td>
                        </tr>       
						<tr>
							<td class="bigtitle"><bean:message key="New"/> <bean:message key="Template"/></td>
						</tr>
						<tr>
							<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						</tr>
					</table>
					<table width="300" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td align="left" class="table_search_bg"><!-- 간격 -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
									</tr>
								</table>
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td>
											<table border="0" cellpadding="0" cellspacing="0">
												<tr>
													<td width="90" class="table_search_head"><bean:message key="Title"/></td>
													<td class="table_search_body">
														<input type="text" name="mk_tmplt_tit" value='<bean:write name="objVO" property="tmplt_tit"/>' class="search_form" style="width:260;" maxlength="100" />
													</td>
												</tr>
												<tr>
													<td class="table_search_head"><bean:message key="Message"/></td>
													<td class="table_search_body">
														<textarea name="mk_tmplt_msg" class="search_form" style="width:260;height:100px" maxlength="400" value=''><bean:write name="objVO" property="palt_doc_msg" filter="false"/></textarea>
													</td>
												</tr>
											</table>
										</td>                        
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						</tr>
						<tr>
							<td align="right">
								<table height="21" border="0" cellpadding="0" cellspacing="0">
									<tr>
										<td style="cursor:hand" onclick="doWork('TEMPSAVE')">
											<table height="21" border="0" cellpadding="0" cellspacing="0" >
												<tr>
													<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
													<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
													<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
												</tr>
											</table>
										</td>
										<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
										<td style="cursor:hand" onclick="doWork('TEMPCLOSE')">
											<table height="21" border="0" cellpadding="0" cellspacing="0" >
												<tr>
													<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
													<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
													<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
                            <td height="7"></td>
                        </tr>					
					</table>
				</td>
			</tr>
		</table>									
	</div>
</form>
<script>
	javascript:loadPage();
</script>
<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="andoFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value="<bean:write name="objVO" property="palt_doc_seq"/>"/>
    <input type="hidden" name="s_palt_doc_tp_cd" value="<bean:write name="objVO" property="palt_doc_tp_cd"/>"/>
    <input type="hidden" name="docType" value=""/>
</form>
</body>
</html>


