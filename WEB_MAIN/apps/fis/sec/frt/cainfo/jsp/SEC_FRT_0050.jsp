<%--
=========================================================
*@FileName   : SEE_FRT_0030.jsp
*@FileTitle  : Correction Advice
*@Description: Correction Advice 등록 수정한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/22/2009
*@since      : 01/22/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>    
	<title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sec/frt/cainfo/script/SEC_FRT_0050.js?ver=<%=CLT_JS_VER%>"></script>
</head>
<%  String usr_id = userInfo.getUsrid();  %>
<bean:define id="objVO"  name="EventResponse" property="objVal"/>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" class="td">
<form name="form" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	
	<input	type="hidden" name="s_intg_bl_seq" value='<bean:write name="objVO" property="s_intg_bl_seq"/>'/> 
	<input	type="hidden" name="intg_bl_seq" value='<bean:write name="objVO" property="intg_bl_seq"/>'/> 
	<input	type="hidden" name="bkg_no" value='<bean:write name="objVO" property="bkg_no"/>'/>
	<html:hidden name="objVO" property="ca_seq"/>
	<input	type="hidden" name="bnd_clss_cd" value='<bean:write name="objVO" property="bnd_clss_cd"/>'/> 	
	<input	type="hidden" name="ca_sts_cd" value='<bean:write name="objVO" property="ca_sts_cd"/>'/>
	
	<input	type="hidden" name="master_bl_seq" value='<bean:write name="objVO" property="master_bl_seq"/>'/>
	<input	type="hidden" name="master_ca_sts_cd" value='<bean:write name="objVO" property="master_ca_sts_cd"/>'/>
	
	<!-- bl close 여부 -->
	<input	type="hidden" name="cls_flg" value='<bean:write name="objVO" property="cls_flg"/>'/>
	
	<!-- 화면 이동 정보 -->
	<input	type="hidden" name="s_house_bl_no" value='<bean:write name="objVO" property="s_house_bl_no"/>'/>
	<input	type="hidden" name="s_master_bl_no" value='<bean:write name="objVO" property="s_master_bl_no"/>'/>
	<input	type="hidden" name="s_trdp_cd" value='<bean:write name="objVO" property="s_trdp_cd"/>'/>
	<input	type="hidden" name="s_trdp_short_nm" value='<bean:write name="objVO" property="s_trdp_short_nm"/>'/>
	<input	type="hidden" name="s_trdp_full_nm" value='<bean:write name="objVO" property="s_trdp_full_nm"/>'/>
	<input	type="hidden" name="s_status" value='<bean:write name="objVO" property="s_status"/>'/>
	<input	type="hidden" name="s_rgst_strdt" value='<bean:write name="objVO" property="s_rgst_strdt"/>'/>
	<input	type="hidden" name="s_rgst_enddt" value='<bean:write name="objVO" property="s_rgst_enddt"/>'/>
	<input	type="hidden" name="s_ofc_cd" value='<bean:write name="objVO" property="s_ofc_cd"/>'/>
	
	<input	type="hidden" name="openMean" value="SEC"/>
	
	<!-- 로그인한 사용자 정보를 담는다 -->
	<input	type="hidden" name="usr_id" value='<%=usr_id%>'/> 
	
	<!-- 로그인한 사용자 정보를 담는다 -->
	<input	type="hidden" name="rgst_usrid" value='<bean:write name="objVO" property="rgst_usrid"/>'/> 
	
    <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
		<logic:equal name="objVO" property="bnd_clss_cd" value="O">
			<td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> <bean:message key="Export"/> > <span class="navi_b"><%=LEV3_NM%></span></td>
		</logic:equal>
		<logic:equal name="objVO" property="bnd_clss_cd" value="I">
			<td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> <bean:message key="Import"/> > <span class="navi_b"><%=LEV3_NM%></span></td>
		</logic:equal>
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
                        <td style="cursor:hand" onclick="doWork('SEARCH02');">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td style="cursor:hand" onclick="doPop('HOUSEBL');">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="HBL"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>
				<logic:equal name="objVO" property="ca_sts_cd" value="C">
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td style="cursor:hand" onclick="doWork('PRINT');">
                            <table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>
				</logic:equal>
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
	                	<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              	</tr>
            	</table>
          <!-- 간격 -->
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              	<tr>
	                	<td align="left" valign="top">
	                		<table width="100%" border="0" cellpadding="0" cellspacing="0">
	                      		<tr>
		                      		<td width="55" nowrap class="table_search_head_r"><bean:message key="CA_NO"/></td>
		                        	<td nowrap class="table_search_body">
		                        		<input name="ca_no" type="text" value='<bean:write name="objVO" property="ca_no"/>' class="search_form" style="width:120px;">
		                        	</td>
		                        	<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
		                        	<td width="150" nowrap class="table_search_head_etc"><bean:message key="CA_Status"/>: 
	                   	<logic:equal name="objVO" property="ca_sts_cd" value="I"> 
	                        <span class="style1"><bean:message key="Issue"/></span>
	                    </logic:equal>
	                    	<logic:equal name="objVO" property="ca_sts_cd" value="C"> 
	                        <span class="style1"><bean:message key="Confirm"/></span>
	                    </logic:equal>
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
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
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
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  	<tr>
                    	<td align="left" valign="top">
	                        <table border="0" cellpadding="0" cellspacing="0">
	                            <tr>
	                                <td width="80" class="table_search_head_r"><bean:message key="HBL_No"/></td>
	                                <td nowrap class="table_search_body">
	                                	<input name="house_bl_no" readonly type="text" maxlength="40"  value='<bean:write name="objVO" property="house_bl_no"/>' class="search_form-disable" style="width:130;">
	                                 	<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doPop('HBL_POPLIST')"/>
	                                </td>
	                                <td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	                                <td width="80" class="table_search_head"><bean:message key="MBL_No"/></td>
	                                <td nowrap class="table_search_body">
		                                <input name="master_bl_no" type="text" maxlength="40" value='<bean:write name="objVO" property="master_bl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130;">
	                                </td>
									<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Issue"/></td>
                                    <td nowrap class="table_search_body"> &nbsp; <bean:message key="By"/>
                                        <input name="iss_usrid" type="text" value='<bean:write name="objVO" property="iss_usrid"/>'  class="search_form-disable" style="width:100;"> at
                                        <input name="iss_ofc_cd" type="text" value='<bean:write name="objVO" property="iss_ofc_cd"/>' class="search_form-disable" style="width:100;">
                                    </td>
	                            </tr>
	                            <tr>
	                                <td class="table_search_head"><bean:message key="Partner"/></td>
	                                <td nowrap class="table_search_body">
	                                	<input name="ntc_trdp_cd" type="text" value='<bean:write name="objVO" property="ntc_trdp_cd"/>' class="search_form-disable" style="width:48;">
	                                    <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doPop('PARTNER_POPLIST')"/>
	                                    <input name="ntc_trdp_short_nm" type="text" value='<bean:write name="objVO" property="ntc_trdp_short_nm"/>' class="search_form-disable" style="width:37;">
	                                    <input name="ntc_trdp_full_nm" type="text" value='<bean:write name="objVO" property="ntc_trdp_full_nm"/>' class="search_form-disable" style="width:130;">
	                               </td>
									<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td nowrap class="table_search_head"><bean:message key="PIC"/></td>
                                    <td align="right" class="table_search_body">
                                         <input name="ntc_trdp_pic" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_pic"/>' class="search_form-disable" style="width:100;">
                                    </td>
									<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td nowrap class="table_search_head"><bean:message key="Confirmed"/></td>
                                    <td nowrap class="table_search_body"> &nbsp; <bean:message key="By"/>
                                      <input name="cfm_usrid" type="text" value='<bean:write name="objVO" property="cfm_usrid"/>' class="search_form-disable" style="width:100;"> at
                                      <input name="cfm_ofc_cd" type="text" value='<bean:write name="objVO" property="cfm_ofc_cd"/>' class="search_form-disable" style="width:100;">
                                    </td>
	                            </tr>
	                            <tr>
	                              	<td nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
	                              	<td align="right" nowrap class="table_search_body">
	                              		<input name="ntc_trdp_pic_phn" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_pic_phn"/>' class="search_form-disable" style="width:100;">/
	                              		<input name="ntc_trdp_pic_fax" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_pic_fax"/>' class="search_form-disable" style="width:100;">
	                              	</td>
	                              	<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	                              	<td nowrap class="table_search_head"><bean:message key="EMail"/></td>
	                              	<td align="right" class="table_search_body">
	                              		<input name="ntc_trdp_pic_eml" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_pic_eml"/>' class="search_form-disable" style="width:100;">
	                              	</td>
	                            </tr>
	                        </table>
						</td>
						<td></td>
					</tr>
	            </table>
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  	</tr>
                </table>
                <!-- 간격 -->
                <!-- 간격 -->
                	<table width="100%" border="0" cellspacing="0" cellpadding="0">
                  		<tr>
                    		<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
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
	        	<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	      	</tr>
	    </table>
		<table width="950" border="0" cellspacing="0" cellpadding="0">
	      	<tr>
	        	<td align="right">
	        		<table border="0" cellspacing="0" cellpadding="0">
	            		<tr>
		              		<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
					<logic:notEqual name="objVO" property="ca_sts_cd" value="C">
	              			<td style="cursor:hand" onclick="doWork('ISSUE');">
			              		<table height="21" border="0" cellpadding="0" cellspacing="0">
			                  		<tr>
			                    		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
			                    		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name" ><bean:message key="Issue"/></td>
			                    		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
			                  		</tr>
			              		</table>
			              	</td>
						<logic:equal name="objVO" property="ca_sts_cd" value="I">
                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                            <td style="cursor:hand" onclick="doWork('CONFIRM');">
                                <table height="21" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name" id="confirm"><bean:message key="Confirm"/></td>
                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                    </tr>
                                </table>
                            </td>
                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td> 
                            <td style="cursor:hand" onclick="doWork('CANCEL');">
                                <table height="21" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Cancel"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                    </tr>
                                </table>
                            </td>
			            </logic:equal>	 
			        </logic:notEqual>	  	 	
	            		</tr>
	        		</table>
	        	</td>
	      	</tr>
    	</table>
    <!--빈공간 -->
    <!-- 검색 -->
	    <table width="100%" border="0" cellspacing="0" cellpadding="0">
	    	<tr>
	            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	        </tr>
	    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="950" border="0" cellpadding="0" cellspacing="0">
      	<tr>
        	<td align="left" class="table_search_bg"><!-- 간격 -->
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              	<tr>
	                	<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              </tr>
	            </table>
	            <table border="0" cellpadding="0" cellspacing="0">
	              	<tr>
		                <td width="110" valign="top" class="table_search_body"><input name="grs_wgt_flg" id="grs_wgt_flg" type="checkbox" value="N" <logic:equal name="objVO" property="grs_wgt_flg" value="Y">checked</logic:equal> >
		               <label for="grs_wgt_flg"><bean:message key="G_Weight"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="cbm_flg" id="cbm_flg" type="checkbox" value="N" <logic:equal name="objVO" property="cbm_flg" value="Y">checked</logic:equal> >
		               <label for="cbm_flg"><bean:message key="CBM"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="mk_desc_flg" id="mk_desc_flg" type="checkbox" value="N" <logic:equal name="objVO" property="mk_desc_flg" value="Y">checked</logic:equal> >
		               <label for="mk_desc_flg"><bean:message key="Mark_Desc"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="vsl_flg" id="vsl_flg" type="checkbox" value="N" <logic:equal name="objVO" property="vsl_flg" value="Y">checked</logic:equal> >
		               <label for="vsl_flg"><bean:message key="Vessel"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="cntr_flg" id="cntr_flg" type="checkbox" value="N" <logic:equal name="objVO" property="cntr_flg" value="Y">checked</logic:equal> >
		               <label for="cntr_flg"><bean:message key="Qty"/></label> &<bean:message key="Container"/></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="frt_term_flg" id="frt_term_flg" type="checkbox" value="N" <logic:equal name="objVO" property="frt_term_flg" value="Y">checked</logic:equal> >
		               <label for="frt_term_flg"><bean:message key="Freight_Term"/></label></td>
	              	</tr>
	            </table>  
	            <table border="0" cellpadding="0" cellspacing="0">
	              	<tr>
		                <td width="110" valign="top" class="table_search_body"><input name="shpr_pty_flg" id="shpr_pty_flg" type="checkbox" value="N" <logic:equal name="objVO" property="shpr_pty_flg" value="Y">checked</logic:equal> >
		               <label for="shpr_pty_flg"><bean:message key="Shipper"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="cnee_pty_flg" id="cnee_pty_flg" type="checkbox" value="N" <logic:equal name="objVO" property="cnee_pty_flg" value="Y">checked</logic:equal> >
		               <label for="cnee_pty_flg"><bean:message key="Consignee"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="ntfy_pty_flg" id="ntfy_pty_flg" type="checkbox" value="N" <logic:equal name="objVO" property="ntfy_pty_flg" value="Y">checked</logic:equal> >
		               <label for="ntfy_pty_flg"><bean:message key="Notify"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="cmdt_flg" id="cmdt_flg" type="checkbox" value="N" <logic:equal name="objVO" property="cmdt_flg" value="Y">checked</logic:equal> >
		               <label for="cmdt_flg"><bean:message key="Commodity"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="rout_flg" id="rout_flg" type="checkbox" value="N" <logic:equal name="objVO" property="rout_flg" value="Y">checked</logic:equal> >
		               <label for="rout_flg"><bean:message key="Route"/></label></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="trf_inv_amt_flg" id="trf_inv_amt_flg" type="checkbox" value="N" <logic:equal name="objVO" property="trf_inv_amt_flg" value="Y">checked</logic:equal> >
		               <label for="trf_inv_amt_flg"><bean:message key="Rate"/></label> &<bean:message key="Tariff"/></td>
		                <td width="10" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                <td width="110" valign="top" class="table_search_body"><input name="otr_flg" id="otr_flg" type="checkbox" value="N" <logic:equal name="objVO" property="otr_flg" value="Y">checked</logic:equal> >
		               <label for="otr_flg"><bean:message key="Other"/></label></td>
	              	</tr>
	            </table>
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              	<tr>
	                	<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              	</tr>
	            </table>
            	<table width="100%" border="0" cellspacing="0" cellpadding="0">
	              	<tr>
	                	<td align="left" valign="top" width="400">
	                		<table width="400" height="100%" border="0" cellpadding="0" cellspacing="0">
		                    	<tr>
			                      	<td>
				                      	<table width="100%" border="0" cellpadding="0" cellspacing="0">
				                          <tr>
				                            <td nowrap class="sub_title" width="145"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Current_Information"/></td>
				                            <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				                          </tr>
				                        </table>
				                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
				                            <tr>
				                              <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				                            </tr>
				                        </table>
			                        </td>
		                    	</tr>
	                    		<tr>
		                      		<td valign="top"> 
										<textarea name='pre_info_txt' cols="82" rows="25"><bean:write name="objVO" property="pre_info_txt" filter="false"/></textarea>
			                      	</td>
			                    </tr>
                			</table>
             			</td>
                		<td align="left" valign="top" width="400">
                  			<table width="400" height="100%" border="0" cellpadding="0" cellspacing="0">
                    			<tr>
                      				<td>
                      					<table width="100%" border="0" cellpadding="0" cellspacing="0">
				                          	<tr>
				                            	<td nowrap class="sub_title" width="145"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Corrected_Information"/></td>
				                            	<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				                          	</tr>
				                        </table>
				                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
				                            <tr>
				                              	<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				                            </tr>
				                        </table>
				                    </td>
                    			</tr>
                    			<tr>
									<td valign="top">
										<textarea name='corr_info_txt' cols="82" rows="25"><bean:write name="objVO" property="corr_info_txt" filter="false"/></textarea>
									</td>
                    			</tr>
                  			</table>
                		</td>
              		</tr>
            	</table>
            <!-- 간격 -->
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
<script>
	loadPage();
	doHideProcess();	
</script>