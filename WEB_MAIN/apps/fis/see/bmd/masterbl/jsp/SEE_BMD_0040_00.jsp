<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020.jsp
*@FileTitle  : HGBL등록
*@Description: HBL 등록 및 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/masterbl/script/SEE_BMD_0040.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script>	

		function dispBizBtns(dispTp){
			//Freight버튼
			getObj('sdBtns').style.display    = dispTp;
			getObj('bcBtns').style.display    = dispTp;
			getObj('dcBtns').style.display    = dispTp;

			getBtnObj('finalModiObj').style.display = 'none';
			
		}
		function btnLoad(){

			// post date 수정 권한
        	//if(user_role_cd=="ADM"){
        	//	frm1.post_dt.className = "search_form";
        	//	frm1.post_dt.readOnly = false;
        		
        		//2012.11.14 요청사항에 의해서 일단 숨김
        		//finalModiObj.style.display = 'block';
        	//}

			if(user_lang_cd == "KO"){
				getBtnObj('mfObj').style.display 		= 'block';
            }else{
            	getBtnObj('mfObj').style.display 		= 'none';
            } 
        	
			if(frm1.bl_sts_cd.value=='NA'){
				//frm1.mrn.className = 'search_form';
				//frm1.mrn.readOnly  = false;
				
				//frm1.lnr_bkg_no.className = 'search_form';
				//frm1.lnr_bkg_no.readOnly  = false;
				getBtnObj('btnAccounting').style.display = 'none';
			}else{
				 if(frm1.bl_sts_cd.value=='MC'){
					//frm1.mrn.className = 'search_form';
					//frm1.mrn.readOnly  = false;
					
					//frm1.lnr_bkg_no.className = 'search_form';
					//frm1.lnr_bkg_no.readOnly  = false;
					
					//frm1.bl_no.className = 'search_form';
					//frm1.bl_no.readOnly  = false;
					
					
					//modiObj.style.display = 'block';
					getBtnObj('btnDelete').style.display  = 'block';
					//emlSnd.style.display  = 'block';
					getObj('fileUp').style.display  = 'block';
					getBtnObj('btnCopy').style.display = 'block';
					getBtnObj('hblObj').style.display = 'block';

					dispBizBtns('block');
				 }else if(frm1.bl_sts_cd.value=='MF'){
					 //frm1.mrn.className = 'search_form-disable';
		             //frm1.mrn.readOnly  = true;
		                
		             //frm1.lnr_bkg_no.className = 'search_form-disable';
		             //frm1.lnr_bkg_no.readOnly  = true;
		        
		             //frm1.bl_no.className = 'search_form-disable';
		             //frm1.bl_no.readOnly  = true;
				
		             //modiObj.style.display = 'none';
		             getBtnObj('btnDelete').style.display  = 'none';
				     //emlSnd.style.display  = 'none';
		             getObj('fileUp').style.display  = 'none';	
		             getBtnObj('btnCopy').style.display = 'none';
		             getBtnObj('hblObj').style.display = 'none';

		             dispBizBtns('block');
				 }else if(frm1.bl_sts_cd.value=='HO'){
					 getBtnObj('btnSave').style.display 		= 'none';
					 getBtnObj('closeModiObj').style.display = 'block';
					 getBtnObj('btnDelete').style.display  		= 'none';
					 getBtnObj('btnCopy').style.display 		= 'block';
		             if(user_lang_cd == "KO"){
		            	 getBtnObj('mfObj').style.display 		= 'block';
		            }else{
		            	getBtnObj('mfObj').style.display 		= 'none';
		            } 
		             getBtnObj('btnPrint').style.display 		= 'block';
		             getBtnObj('hblObj').style.display		= 'block';

		             dispBizBtns('none');
				 }else if(frm1.bl_sts_cd.value=='HF'){
					 getBtnObj('btnSave').style.display 		= 'none';
					 getBtnObj('closeModiObj').style.display = 'block';
					 getBtnObj('btnDelete').style.display  		= 'none';
					 getBtnObj('btnCopy').style.display 		= 'block';
		             if(user_lang_cd == "KO"){
		            	 getBtnObj('mfObj').style.display 		= 'block';
		             }else{
		            	 getBtnObj('mfObj').style.display 		= 'none';
		             } 
		             getBtnObj('btnPrint').style.display 		= 'block';
		             getBtnObj('hblObj').style.display 		= 'none';

		             dispBizBtns('none');
				 }
			}
		}

		var TPCD1 = '';
        var TPCD2 = '';
        <% boolean isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
        <logic:iterate id="codeVO" name="tpszList">
            <% if(isBegin){ %>
                TPCD1+= '|';
                TPCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        </logic:iterate>
		
		<!-- ###Package 코드## -->
		var PCKCD1 = '|';
		var PCKCD2 = '|';
		<% isBegin = false; %>
        <bean:define id="pckList" name="valMap" property="pckCdList"/>
		<logic:iterate id="pckVO" name="pckList">
			<% if(isBegin){ %>
				PCKCD1+= '|';
				PCKCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PCKCD1+= '<bean:write name="pckVO" property="pck_nm"/>';
			PCKCD2+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
		</logic:iterate>

		<!-- ###Lease Term 코드## -->
        var LSTCD1 = '|';
        var LSTCD2 = '|';
        <% isBegin = false; %>
        <bean:define id="leaList" name="valMap" property="leaseCdList"/>
        <logic:iterate id="pckVO" name="leaList">
            <% if(isBegin){ %>
                LSTCD1+= '|';
                LSTCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            LSTCD1+= '<bean:write name="pckVO" property="cd_nm"/>';
            LSTCD2+= '<bean:write name="pckVO" property="cd_val"/>';
        </logic:iterate>		


        <!-- ###Freight 항목### -->
		var UNITCD1 = ' |';
		var UNITCD2 = ' |';
		<!-- Freight Unit 단위 -->
        <logic:notEmpty name="valMap" property="UNITCD">
			<% isBegin = false; %>
            <bean:define id="unitList" name="valMap" property="UNITCD"/>
            <logic:iterate id="codeVO" name="unitList">
                <% if(isBegin){ %>
                    UNITCD1+= '|';
                    UNITCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        <!-- ###FRT_CD LIST 항목 AR### -->
        var ARFRTCD1 = ' |';
		var ARFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="arFrtCdList" name="valMap" property="arFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="arFrtCdList">
			<% if(isBegin){ %>
				ARFRTCD1+= '|';
				ARFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   ARFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   ARFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>
        
        <!-- ###FRT_CD LIST 항목 AP### -->
        var APFRTCD1 = ' |';
		var APFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="apFrtCdList" name="valMap" property="apFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="apFrtCdList">
			<% if(isBegin){ %>
				APFRTCD1+= '|';
				APFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   APFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   APFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>
        
        <!-- ###FRT_CD LIST 항목 DC### -->
        var DCFRTCD1 = ' |';
		var DCFRTCD2 = ' |';
		<% isBegin = false; %>
        <bean:define id="dcFrtCdList" name="valMap" property="dcFrtCdList"/>
		<logic:iterate id="FrtCdVO" name="dcFrtCdList">
			<% if(isBegin){ %>
				DCFRTCD1+= '|';
				DCFRTCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   DCFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>';
			   DCFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="false"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="false"/>';
		</logic:iterate>

		<!-- Currency 조회 -->
		<%  String ofc_curr     = "";
		    String partner_curr = "";
		%>
        <logic:notEmpty name="valMap" property="OfcCurrency">
            <bean:define id="curMap" name="valMap" property="OfcCurrency"/>
            <%  HashMap tmpMap = (HashMap)curMap;
                ofc_curr     = (String)tmpMap.get("ofccurr_cd");
                partner_curr = (String)tmpMap.get("tocurr_cd");
            %>
        </logic:notEmpty>
        
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		
		<!-- ###Office Info## -->
        <% isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
        var oth_wgt_ut_cd = "";
        var oth_meas_ut_cd = "";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
        var sea_lcl_desc = "<bean:write name="ofcVO" property="sea_lcl_desc" filter="false"/>";
        var sea_fcl_desc = "<bean:write name="ofcVO" property="sea_fcl_desc" filter="false"/>";
        var sea_cob = "<bean:write name="ofcVO" property="sea_cob"/>";
        var sea_mei = "<bean:write name="ofcVO" property="sea_mei"/>";
        var sea_msco = "<bean:write name="ofcVO" property="sea_msco"/>";
        var vsl_show_flg = "<bean:write name="ofcVO" property="vsl_show_flg"/>";
        var load_port_show_flg = "<bean:write name="ofcVO" property="load_port_show_flg"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_exp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        
        var shpAddr = '<bean:write name="hblVO" property="shpr_trdp_nm"/> O/B OF';

        var user_role_cd = "<%=userInfo.getRole_cd()%>";
        var user_lang_cd = "<%=userInfo.getUse_lang_cd()%>";
   </script>
</head>
<body class="td" onload="setOfficeData();loadPage();btnLoad();doHideProcess();loadData();">
<form name="frm1" method="POST" action="./SEE_BMD_0040.clt">
	<input type="hidden" name="f_cmd">
	<html:hidden name="hblVO"  property="bl_sts_cd"/>	
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
	<html:hidden name="valMap" property="f_intg_bl_seq"/>
	<html:hidden name="valMap" property="f_hbl_intg_bl_seq"/>
	<input type="hidden" name="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" value="">
	<input type="hidden" name="rpt_biz_sub_tp" value="">
	<input type="hidden" name="rpt_tp" value="">
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	    
    <!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"      value="">  
    <input type="hidden" name="chk_fr_trdp_nm"      value=""> 
    <input type="hidden" name="chk_fr_inv_curr_cd"  value=""> 
    
    <!-- 조회된 Ref_no , ref 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="sel_ref_no"  value='<bean:write name="hblVO" property="ref_no"/>'> 
	
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap="nowrap" class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td>
			</td>
			<td align="right">
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
                        <td>
                            <table id="finalModiObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('FINAL_MODIFY')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Final"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td width="10"></td>
						<td onClick="doWork('SEARCHLIST')" style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>		
						</td>
						<td onClick="doWork('NEW')" style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
                        <td>
                            <table id="btnSave" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('SAVE')" style="display:block;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="closeModiObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('CLOSE_MODIFY')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="btnCopy" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('COPY')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Copy"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('PRINT')" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="btnAccounting" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('GOTOACCT')" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Accounting"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="mfObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('MFPRINT')" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="M_F"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="btnDelete" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('REMOVE')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Delete"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="hblObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('HBL_ENTRY')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="HBL"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
	<table width="1200" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td align="left" class="table_search_bg">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
                        <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="100" nowrap class="table_search_head"><bean:message key="Ref_No"/></td>
                        <td width="180" class="table_search_body">
                            <input name="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" type="text" class="search_form" dataformat="excepthan" style="width:130;" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="srOpenPopUp('REF_POPLIST',this)" style="cursor:hand" align="absmiddle">
                        </td>
                        <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="70" nowrap class="table_search_head"><bean:message key="MBL_No"/></td>
                        <td width="180" class="table_search_body">
                            <input name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="srOpenPopUp('MBL_POPLIST',this)" style="cursor:hand" align="absmiddle">
                        </td>
                        <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="110" nowrap class="table_search_head"><bean:message key="Liner_Bkg_No"/></td>
                        <td width="180" class="table_search_body">
                            <input name="f_lnr_bkg_no"  maxlength="20" value="<bean:write name="valMap" property="f_lnr_bkg_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)">
                            <!-- <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="srOpenPopUp('MBL_POPLIST',this)" style="cursor:hand" align="absmiddle"> -->
                        </td>
						<!-- 
						<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="60" nowrap class="table_search_head"><bean:message key="SR_No"/></td>
                        <td width="180" class="table_search_body">
                            <input name="f_sr_no" value="<bean:write name="valMap" property="f_sr_no"/>" type="text" class="search_form" dataformat="excepthan" style="width:130;" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="srOpenPopUp('SR_POPLIST',this)" style="cursor:hand" align="absmiddle">
                        </td>
                         -->
					</tr>
				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
		<tr>
			<td align="center">
				<table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<script language="javascript">comSheetObject('sheet1');</script>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
<!--            <td height="22" align="left" background="<%=CLT_PATH%>/web/img/main/tab_table_top.gif">-->
				<td height="22" align="left">
                <table height="22" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="tab_head-l"     id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Master_BL_Entry"/></span></td>
                        <td width="1"></td> 
                        <td class="tab_head_non-l" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Container"/></span></td>
                        <td width="1"></td> 
                        <td class="tab_head_non-l" id=Tab03 style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Mark_Desc"/></span></td>
                        <td width="1"></td> 
                        <td class="tab_head_non-l" id=Tab04 style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></td>
                        <td width="1"></td> 
                        <td class="tab_head_non-l" id=Tab05 style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Shipping_Document"/></span></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
<!--            <td align="center" valign="top" background="<%=CLT_PATH%>/web/img/main/tab_table_bg.gif">-->
				<td align="center" valign="top" class="table_search_bg">
                <table width="100%" border="0" cellspacing="10" cellpadding="0">
                    <tr>
                        <td valign="top">
				<div id="tabLayer" style="display:inline"><!--Shipping Request Main-->
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td valign="top" align="left">
                                        <table width="1130" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                            	<td width="100" nowrap class="table_search_head"><bean:message key="Ref_No"/></td>
                                                <td width="200" class="table_search_body">
                                                    <input type="text" name="ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:110;text-transform:uppercase;" onblur="strToUpper(this)" onclick="if(frm1.ref_no.value=='AUTO'){frm1.ref_no.value=''}">
                                                    <bean:define id="ofcList" name="valMap" property="ofcList"/>
													<html:select name="hblVO" property="ref_ofc_cd" styleClass="search_form" style="width=55;">
														<html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/>
													</html:select>
													<input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>">
                                                </td>
                                                <td width="2"></td>
                                                <td width="120"  nowrap class="table_search_head"><bean:message key="Liner_Bkg_No"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20">
                                                </td>
												<td width="2"></td>
                                                <td width="70" nowrap class="table_search_head"><bean:message key="MBL_No"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="bl_no" value='<bean:write name="hblVO" property="bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="40">
                                                </td>
                                                <td width="2"></td>
                                                <td width="130" nowrap class="table_search_head"><bean:message key="BL_Type"/></td>
												<td class="table_search_body">
													<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
													<html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width=100;">
														<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
													</html:select>
												</td>
												<td width="2"></td>
												<td width="50"  nowrap class="table_search_head"><bean:message key="MRN"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="mrn"  value="<bean:write name="hblVO" property="mrn"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td nowrap class="table_search_head"><bean:message key="Post_Date"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:110;text-transform:uppercase;" readonly>
													<!-- <img onclick="doDisplay('DATE1', frm1.post_dt);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/> -->
                                                </td>
                                                <td ></td>
                                                <td nowrap class="table_search_head"><bean:message key="Sub_MBL_No"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="sub_bl_no" value="<bean:write name="hblVO" property="sub_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20" style="ime-mode:disabled; text-transform:uppercase;" >
                                                </td>
                                                <td></td>
                                                <td nowrap class="table_search_head"><bean:message key="ITN_No"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="itn_no" value="<bean:write name="hblVO" property="itn_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120;" onblur="strToUpper(this)" maxlength="20" >
                                                </td>
                                                <td></td>
                                                <td nowrap class="table_search_head"><bean:message key="Service_Contract_No"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="sc_no"    value="<bean:write name="hblVO" property="sc_no"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20" style="ime-mode:disabled; text-transform:uppercase;" >
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <!-- 
                                                <td width="70" nowrap class="table_search_head"><bean:message key="SR_No"/></td>
                                                <td width="5px;"></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="sr_no" value="<bean:write name="hblVO" property="sr_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)">
                                                </td>
                                                 -->
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10px"></td>
                                </tr>
                                <tr>
                                    <td valign="top">
                                        <table width="113%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="left" valign="top" width="300">
                                        <!-- 왼쪽  -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Customer"/></td>
                                                            <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
															<td width="70" nowrap class="table_search_head"><bean:message key="Shipper"/></td>
                                                            <td nowrap class="table_search_body">
                                                                <input type="text"   name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:235;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}">
                                                                <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper"   onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
                                                                <input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_shipper',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;width:48;">
                                                            </td>
														<!--
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                            <td id="shipper" width="30" align="right" style="cursor:hand" onClick="openSeeMasterPopUp('PIC_POP', this)">
                                                               <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                   <tr>
                                                                       <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                       <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="PIC"/></td>
                                                                       <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                   </tr>
                                                               </table>
                                                           </td>
														-->
                                                        </tr>
                                                    </table>
                                                    <!--
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="70" class="table_search_head"><bean:message key="Rec_DOC"/></td>
                                                            <input name="cust_doc_seq" type="hidden" class="search_form" style="width:120;">
                                                            <td align="right" class="table_search_body"><input name="cust_no" type="text" class="search_form" style="width:120;"></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                            <td align="right" style="cursor:hand" onClick="openSeeMasterPopUp('CUSTBKG', this)">
                                                                 <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name" >Cust BKG</td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="290" class="table_search_body">
                                                                <textarea name="shpr_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="ime-mode:disabled;width:330;height:80px;text-transform:uppercase;overflow:hidden;font-family:TAHOMA;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="70" nowrap class="table_search_head"><bean:message key="Consignee"/></td>
                                                            <td nowrap class="table_search_body">
                                                                <input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_consignee',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48;">
                                                                <input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:235;text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}">
                                                                <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="consignee" onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
                                                            </td>
                                                            <!--
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                            <td id="consignee" align="right" style="cursor:hand" onClick="openSeeMasterPopUp('PIC_POP', this)">
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name" ><bean:message key="PIC"/></td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            -->
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="290" class="table_search_body">
                                                                <textarea name="cnee_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="ime-mode:disabled;width:330;height:80px;text-transform:uppercase;overflow:hidden;font-family:TAHOMA;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off"><bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="70" nowrap class="table_search_head"><bean:message key="Notify"/></td>
                                                            <td nowrap class="table_search_body">
                                                                <input type="hidden"   name="ntfy_trdp_cd" value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_notify',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48;">
                                                                <input type="text" name="ntfy_trdp_nm"   value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>'   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:235;text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}">
                                                                <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="notify" onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
                                                            </td>
                                                            <!--
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                            <td id="notify" align="right" style="cursor:hand" onClick="openSeeMasterPopUp('PIC_POP', this)">
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="PIC"/></td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            -->
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="table_search_body">
                                                                <img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('SAC', 'S', 'O', 'M');"><bean:message key="Same_As_Consignee"/></a>&nbsp;
                                                                <img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('CNEE', 'S', 'O', 'M');"><bean:message key="Copy"/></a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="290" class="table_search_body">
                                                                <textarea name="ntfy_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="ime-mode:disabled;width:330;height:80px;text-transform:uppercase;overflow:hidden;font-family:TAHOMA;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off"><bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    
                                                    <!-- 2011.10.27 Kim,Jin-Hyuk -->
                                                    <!-- 
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
														<tr>
															<td width="80" nowrap class="table_search_head"><bean:message key="Agent"/></td>
															<td nowrap class="table_search_body">
		                                                        <input type="text" name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_carr',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:50px;">
		                                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="carr" onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
		                                                        <input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" style="width:115px;text-transform:uppercase;">
																<input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>                                                        
															</td>
											            </tr>
													</table>
													<table width="100%" border="0" cellpadding="0" cellspacing="0">
														<tr>
															<td width="80" nowrap class="table_search_head"><bean:message key="Third_Party"/></td>
															<td nowrap class="table_search_body">
		                                                        <input type="text" name="third_trdp_cd" value='<bean:write name="hblVO" property="third_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_third',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_third',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:50px;">
		                                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="third" onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
		                                                        <input type="text"   name="third_trdp_nm" value='<bean:write name="hblVO" property="third_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" style="width:115px;text-transform:uppercase;">
																<input type="hidden" name="third_trdp_addr" value='<bean:write name="hblVO" property="third_trdp_addr"/>'>
															</td>
											            </tr>
													</table>
													 -->
                                                </td>
                                                <td width="5" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
                                                <td valign="top">
                                    <!-- ############ Right Begin ############ -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td align="left" valign="top" width="300">
                                                            	<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="100" nowrap class="table_search_head"><bean:message key="Triangle_Agent"/></td>
																		<td nowrap class="table_search_body">
					                                                        <input type="text" name="prnr_trdp_cd2" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;">
					                                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="partner2" onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
					                                                        <input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}" maxlength="50">
																			<input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'>                                                        
																		</td>
														            </tr>
														            <tr>
                                                                        <td height="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
																</table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Vessel"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="100" nowrap class="table_search_head"><bean:message key="Liner"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text"   name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_sea_liner',this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('trdpCode_sea_liner',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="liner" onClick="openSeeMasterPopUp('LINER_POPLIST_MS',this)" style="cursor:hand" align="absmiddle">
																			<input type="text"   name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST_MS', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}" maxlength="50">
																		</td>
																	</tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head"><bean:message key="VSL_VOY"/></td>
                                                                        <td nowrap class="table_search_body" colspan="4">
                                                                            <input type="hidden" name="trnk_vsl_cd" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;">
                                                                            <input type="text"   name="trnk_vsl_nm" value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trunkvessel" onClick="openSeeMasterPopUp('VESSEL_POPLIST',this)" style="cursor:hand;" align="absmiddle"> /
                                                                            <input type="text"   name="trnk_voy"    value='<bean:write name="hblVO" property="trnk_voy"/>'    class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:113px;text-transform:uppercase;" maxlength="8" onblur="strToUpper(this)">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head_r"><bean:message key="ETD"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
                                                                            <img id="etd_dt_tm_cal" onclick="doDisplay('DATE1',frm1.etd_dt_tm);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
                                                                        </td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="17"></td>
                                                                        <td width="45" nowrap class="table_search_head"><bean:message key="ETA"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
                                                                            <img id="eta_dt_tm_cal" onclick="doDisplay('DATE1',frm1.eta_dt_tm);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="100" nowrap class="table_search_head"><bean:message key="Billing_Carrier"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text"   name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown');"  onblur="strToUpper(this); codeNameAction('trdpCode_carr',this, 'onKeyDown');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" maxlength="20;" onKeyPress="ComKeyOnlyAlphabet('uppernum');">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="carr"  onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
																			<input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>
																			<input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}" maxlength="50">
																		</td>
																	</tr>
																</table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Route"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head"><bean:message key="POR"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown')" onBlur="codeNameAction('Location_por',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;disabled;width:70;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="por" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="por_nod_cd"/>
                                                                            <input type="text" name="por_nm" value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}" maxlength="50">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head"><bean:message key="POL"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown')" onBlur="codeNameAction('Location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="pol_nod_cd"/>
                                                                            <input type="text" name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head"><bean:message key="POD"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown')" onBlur="codeNameAction('Location_pod',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pod" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="pod_nod_cd"/>
                                                                            <input type="text" name="pod_nm" maxlength="50" value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head"><bean:message key="DEL"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown')" onBlur="codeNameAction('Location_del',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="del" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="del_nod_cd"/>
                                                                            <input type="text" name="del_nm" maxlength="50" value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="130" nowrap class="table_search_head"><bean:message key="Final_Destination"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown')" onBlur="codeNameAction('Location_dest',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="dest" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="fnl_dest_nod_cd"/>
                                                                            <input type="text" name="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('dest'), frm1.fnl_dest_loc_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="130" nowrap class="table_search_head"><bean:message key="Pier"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="rcv_wh_cd" value='<bean:write name="hblVO" property="rcv_wh_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_rcv',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_rcv',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60;" onblur="strToUpper(this);">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="rcv" onClick="openSeeMasterPopUp('LINER_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="fnl_dest_nod_cd"/>
                                                                            <input type="text" name="rcv_wh_nm" value='<bean:write name="hblVO" property="rcv_wh_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('rcv'), frm1.rcv_wh_nm.value);}" maxlength="50">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="130" nowrap class="table_search_head"><bean:message key="Container_Summary"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="cntr_info" value='<bean:write name="hblVO" property="cntr_info"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:218;" maxlength="500">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                
                                                                
                                                            </td>
                                                            <td width="30" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
                                                            <td align="left" valign="top" width="300">
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Shippment_and_Item"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                    	<td width="125" nowrap class="table_search_head"><bean:message key="Freight"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                                                            <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:80;">
                                                                                <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                            <input type="hidden" name="h_frt_term_cd" value="<bean:write name="hblVO" property="frt_term_cd"/>">
                                                                        </td>
                                                                     <tr>
                                                                 </table>
                                                                 <table border="0" cellpadding="0" cellspacing="0">    
                                                                     <tr>                                               
                                                                        <td width="125" nowrap class="table_search_head"><bean:message key="Ship_Mode"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <bean:define id="shipModeList" name="valMap" property="shipModeList"/>
                                                                            <html:select name="hblVO" property="shp_mod_cd" styleClass="search_form" style="width:80;">
                                                                                <html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="128" nowrap class="table_search_head"><bean:message key="SVC_Term"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <bean:define id="serviceList" name="valMap" property="serviceList"/>
                                                                            <html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form" style="width:80;" onchange="svcTermChange();">
                                                                                <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                                                            <html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form" style="width:80;">
                                                                                <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                    	<td width="125" nowrap class="table_search_head"><bean:message key="Tariff_Currency_Code"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <bean:define id="currCdList" name="valMap" property="currCdList"/>
                                                                            <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:80;">
                                                                                <html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                            <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>">
                                                                        </td>
                                                                    <tr>   
                                                                </table>                                               
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="125" nowrap class="table_search_head"><bean:message key="OBL_Type"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <bean:define id="oblCdList" name="valMap" property="oblCdList"/>
                                                                            <html:select name="hblVO" property="obl_tp_cd" styleClass="search_form" style="width:80;">
                                                                                <html:options collection="oblCdList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                            <input type="hidden" name="h_obl_tp_cd" value="<bean:write name="hblVO" property="obl_tp_cd"/>">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                	<tr>
																		<td width="125" nowrap class="table_search_head"><bean:message key="Brokerage_Rate"/></td>
					                                                    <td nowrap class="table_search_body">
					                                                        <input type="text" name="broker_rt" maxlength="5" value="<bean:write name="hblVO" property="broker_rt"/>" class="search_form zero_remove" onKeyPress="ComKeyOnlyNumber(this)" dataformat="excepthan" style="ime-mode:disabled;width:80;text-align:right">
					                                                        <input type="text" value="%" class="search_form" style="width:20;border:0;background-color:transparent;" tabindex="7">
					                                                    </td>
					                                                </tr>
					                                             <table border="0" cellpadding="0" cellspacing="0">					                       
					                                                 <tr>
					                                                    <td width="125" nowrap class="table_search_head"><bean:message key="Profit_Share"/></td>
					                                                    <td nowrap class="table_search_body">
					                                                        <input type="text" name="profit_share" maxlength="5" value="<bean:write name="hblVO" property="profit_share"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" dataformat="excepthan" style="ime-mode:disabled;width:80;text-align:right">
					                                                        <input type="text" value="%" class="search_form" style="width:20;border:0;background-color:transparent;" tabindex="8">
					                                                    </td>
                                                                	</tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="125" nowrap class="table_search_head"><bean:message key="Vessel_Cut_Off_Date"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="cut_off_dt" value="<wrt:write name="hblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" dataformat="excepthan" style="ime-mode:disabled;width:80px;" size='11' maxlength="10">
                                                                            <img id="cut_off_dt_cal" onclick="doDisplay('DATE1' ,frm1.cut_off_dt);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0">    
																	<tr>
																		<td width="128" nowrap class="table_search_head"><bean:message key="Package"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80;text-align:right"> 
																			<bean:define id="pckList" name="valMap" property="pckCdList"/>
																			<html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:133px;">
																				<option></option>
																				<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
																			</html:select> 
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="128" nowrap class="table_search_head"><bean:message key="GWeight"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80;text-align:right;">
																			<input type="text" name="grs_wgt_ut_cd" value="K" style="width:50;border:0;background-color:transparent;" readOnly tabindex="1">
																			<input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,2);chkComma(this,8,2);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80;text-align:right;">
																			<input type="text" name="grs_wgt_ut_cd1" value="L" style="width:30;border:0;background-color:transparent;" readOnly tabindex="2">
																			<!-- 
																			<bean:define id="weightunitList" name="valMap" property="weightunitList"/>
																			<html:select name="hblVO" property="grs_wgt_ut_cd" styleClass="search_form" style="width:60;">
																				<html:options collection="weightunitList" property="cd_val" labelProperty="cd_nm"/>
																			</html:select>
																			 -->
																		</td>
																	</tr>
																</table>
																<!-- 
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="100" nowrap class="table_search_head"><bean:message key="AWeight"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="act_wgt" value="<wrt:write name="hblVO" property="act_wgt" formatType="MONEY" format="#,###"/>" onkeyDown="onlyNumberCheck();" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right;" onChange="weightChange(this);">
																			<input type="text" name="act_wgt_ut_cd" value="K" style="width:30;border:0;background-color:transparent;" readOnly tabindex="3">
																			<input type="text" name="act_wgt1" value="<wrt:write name="hblVO" property="act_wgt1" formatType="MONEY" format="#,###"/>" onkeyDown="onlyNumberCheck();" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right;" onChange="weightChange(this);">
																			<input type="text" name="act_wgt_ut_cd1" value="L" style="width:30;border:0;background-color:transparent;" readOnly tabindex="4">
																			 -->
																			<!--
																			<input type="text" name="act_wgt" value="<wrt:write name="hblVO" property="grs_wgt" formatType="MONEY" format="#,##0.00"/>" onkeyDown="onlyNumberCheck();" onkeyup="numberCommaLen(this,8,2)" onblur="chkComma(this,8,2)" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right;"> 
																			<html:select name="hblVO" property="act_wgt_ut_cd" styleClass="search_form" style="width:100px;">
																				<html:options collection="weightunitList" property="cd_val" labelProperty="cd_nm"/>
																			</html:select>
																			 -->
																			 <!--
																		</td>
																	</tr>
																</table>
																 -->
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="128" nowrap class="table_search_head"><bean:message key="Measurement"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="meas" value="<bean:write name="hblVO" property="meas"/>" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80;text-align:right;">
																			<input type="text" name="meas_ut_cd" value="CBM" style="width:50;border:0;background-color:transparent;" readOnly tabindex="5">
																			<input type="text" name="meas1" value="<bean:write name="hblVO" property="meas1"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80;text-align:right;">
																			<input type="text" name="meas_ut_cd1" value="CFT" style="width:30;border:0;background-color:transparent;" readOnly tabindex="6">
																			<!-- 
																			<input type="text" name="meas"    value="<wrt:write name="hblVO" property="meas" formatType="MONEY" format="#,##0.0000"/>"  onkeyDown="onlyNumberCheck();" onkeyup="numberCommaLen(this,8,4)" onblur="chkComma(this,8,4)" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right;">
																			<bean:define id="measureList" name="valMap" property="measureList"/>
																			<html:select name="hblVO" property="meas_ut_cd" styleClass="search_form">
																				<html:options collection="measureList" property="cd_val" labelProperty="cd_nm"/>
																			</html:select>
																			 -->
																		</td>
																	</tr>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td onclick="sumHblValue();" style="cursor:hand;">
																			<table border="0" cellpadding="0" cellspacing="0">
																				<tr>
																					<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
												                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Sum"/></td>
												                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Management"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <!-- 
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="75" nowrap class="table_search_head"><bean:message key="Issued_At"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text"   name="iss_loc_cd" value="<bean:write name="hblVO" property="iss_loc_cd"/>" class="search_form" style="width:60;" onKeyDown="codeNameAction('Location_iss',this, 'onKeyDown')" onBlur="codeNameAction('Location_iss',this, 'onBlur')">
                                                                            <img id="iss" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)" src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand;" align="absmiddle">
                                                                            <input type="text"   name="iss_loc_nm" value="<bean:write name="hblVO" property="iss_loc_nm"/>" class="search_form" style="width:160;text-transform:uppercase;" onblur="strToUpper(this)"> 
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="78" nowrap class="table_search_head"><bean:message key="Payable_At"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text"   name="pay_loc_cd" value="<bean:write name="hblVO" property="pay_loc_cd"/>" class="search_form" style="width:60;" onKeyDown="codeNameAction('Location_pay',this, 'onKeyDown')" onBlur="codeNameAction('Location_pay',this, 'onBlur')">
                                                                            <img id="pay" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)" src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand;" align="absmiddle">
                                                                            <input type="text"   name="pay_loc_nm" value="<bean:write name="hblVO" property="pay_loc_nm"/>" class="search_form" style="width:160;text-transform:uppercase;" onblur="strToUpper(this)">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                 -->
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="128" nowrap class="table_search_head"><bean:message key="Issue_Date"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" dataformat="excepthan" style="ime-mode:disabled;width:80px;" size='11' maxlength="10">
                                                                            <img id="bl_iss_dt_cal" onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="128" nowrap class="table_search_head"><bean:message key="Issued_By"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="proc_usrid"/>" class="search_form-disable" readOnly style="width:80;">
                                                                            <input type="hidden" name="proc_usrnm" value="<bean:write name="hblVO" property="proc_usrnm"/>" class="search_form-disable" readOnly style="width:120;">
                                                                            <input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>">
																			<input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>">
																			<input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                    <!-- ############ right  end ############ -->
                                                </td>
                                                <td width="210"></td>
                                            </tr> 
                                        </table>
                                    </td>
                                </tr>
                                <tr>
									<td height="19px"></td>
								</tr>
								<tr>
									<td>
										<table width="100%" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="House_BL_List"/></td>
												<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
											</tr>
											<tr>
												<td height="5" colspan="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
											</tr>
											<tr>
												<td align="center" colspan="2">
													<table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
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
                </div>
                <div id="tabLayer" style="display:none">
                            <table width="100%" border="0" bordercolor="blue" cellspacing="10" cellpadding="0">                          
                                <tr>
                                    <td align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                        	<td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Container_List"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td align="right">
													<table id="cnrtAdd" onClick="cntrGridAdd(docObjects[2]);" style="cursor:hand;display:inline;" border="0" cellpadding="0" cellspacing="0">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name" ><bean:message key="Add"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td align="right" width="50">
													<table id="cnrtAdd" onClick="cntrGridCopy(docObjects[2]);" style="cursor:hand;display:inline;" border="0" cellpadding="0" cellspacing="0">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name" ><bean:message key="Copy"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
                                            </tr>
                                            <tr>
                                                <td valign="top" align="center" colspan="4"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                                        <tr>
			                                                <td id="td4sheet4">
<!--
                                                                <script language="javascript">comSheetObject('sheet4');</script>
-->
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                            </table>
              	</div>
              	<div id="tabLayer" style="display:none">
              	
              				<!-- Said -->
						    <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">
								<tr>
									<td>
										<table width="900" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">
											<tr>
												<td width="160" align="left">
													<table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
														<tr>
															<td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Said"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
														</tr>
													</table>
												</td>
												<td align="right">
													<table id="sadAuto" onclick="mkSaidTxt(docObjects[2], frm1.sad_txt);" style="cursor:hand;display:inline;" height="21" border="0" cellpadding="0" cellspacing="0">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Auto"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
											</tr>
											<tr>
												<td colspan="3">
													<input type="text" name="sad_txt" value="<bean:write name="hblVO" property="sad_txt" filter="false"/>" maxlength="200" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:900;height:30;" onblur="strToUpper(this)">
												</td>
											</tr>
										</table>
									</td>
								</tr>			
							</table>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>
                            <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="400" align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                        	<td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Mark"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                            </tr>
                                            <tr>
                                                <td valign="top" colspan="2"> 
                                                    <textarea name="mk_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;overflow:hidden;width:380;white-space: pre-wrap;" WRAP="on" onkeyup="rowCount(frm1,15,frm1.rider_lbl);"><bean:write name="hblVO" property="mk_txt" filter="false"/></textarea>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="4" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                    <td width="400" align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Description"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
                                                            <td>
                                                            	<input tabindex="-1" type="text" name="rider_lbl" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;text-align:right;width:267;border:0;background-color:transparent;"/>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                            </tr>
                                            <tr>
                                                <td valign="top" colspan="2"> 
                                                    <textarea name="desc_txt" rows="16"  maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;overflow:hidden;width:380;white-space: pre-wrap;" WRAP="on" onkeyup="rowCount(frm1,15,frm1.rider_lbl);"><bean:write name="hblVO" property="desc_txt" filter="false"/></textarea>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="290" align="left" valign="top"></td>
                                </tr>
                                <tr>
                                	<td>
			                            <table border="0" bordercolor="blue" cellspacing="0" cellpadding="0">
											<tr>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
												<td onClick="addCntrInfo(docObjects[2], 'M', 'OE');" style="cursor:hand" background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Add_Container_Info"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
												<td width="7"></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
												<td onClick="copyFromHBL();" style="cursor:hand" background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Copy_from_HBL"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
											</tr>
										</table>
                                	</td>
                                </tr>
                            </table>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>                            
                            <table border="0" bordercolor="blue" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="160" align="left">
                                        <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                            	 <td nowrap="nowrap" width="160">
							                    	<table border="0" cellpadding="0" cellspacing="0">
							                    		<tr>
							                    			<td nowrap="nowrap"  class="sub_title"  width="160">
							                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Remark"/>
							                    			</td>
							                    		</tr>
							                    	</table>
							                    </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <textarea name="rmk" cols="175" rows="2" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;white-space: pre-wrap;" WRAP="on"><bean:write name="hblVO" property="rmk" filter="false"/></textarea>
                                    </td>
                                </tr>   
                            </table>
                </div>
                
                <div id="tabLayer" style="display:none">
<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0024.jsp
*@FileTitle  : HGBL등록 > Freight
*@Description: Freight 등록화면
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
<script>
	var dfPerfCurr = 'KRW';
</script>
<%
	boolean sdIns = true;
	boolean sdInsDisp = true;
	boolean bcIns = true;
	boolean bcInsDisp = true;
	String to_rt_ut = "";
	String trf_cur_cd = "";   //Invoice Currency
%>
<!--Selling/Debit-->
<logic:notEmpty name="valMap" property="SFRT">
    <bean:define id="sellCnfCk" name="valMap" property="SFRT"/>
    <logic:equal name="sellCnfCk" property="flg" value="Y">
        <% sdIns = false; %>
    </logic:equal>

    <logic:equal name="sellCnfCk" property="invflg" value="Y">
        <% sdInsDisp = false; %>
    </logic:equal>
</logic:notEmpty>

<!--Buying/Crebit-->
<logic:notEmpty name="valMap" property="BFRT">
    <bean:define id="buyCnfCk" name="valMap" property="BFRT"/>
    <logic:equal name="buyCnfCk" property="flg" value="Y">
        <% bcIns = false; %>
    </logic:equal>
    
    <logic:equal name="buyCnfCk" property="invflg" value="Y">
        <% bcInsDisp = false; %>
    </logic:equal>
</logic:notEmpty>

<!-- Currency 조회 -->
<logic:notEmpty name="valMap" property="OfcCurrency">
	<bean:define id="curMap" name="valMap" property="OfcCurrency"/>
	<%  HashMap tmpMap = (HashMap)curMap;
		ofc_curr   = (String)tmpMap.get("ofccurr_cd");
		trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
		to_rt_ut   = (String)tmpMap.get("to_rt_ut");
	%>
</logic:notEmpty>
	<script>
		var obdtCur = '<%=to_rt_ut%>';
	</script>

	<input type="hidden" name="f_ofc_cnt_cd"   value="">
	<input type="hidden" name="hid_act_cnt_cd" value="">
	
	<input type="hidden" name="ppdOrgCurr"     value="">
	<input type="hidden" name="ofc_curr"       value="<%=ofc_curr%>">
    <input type="hidden" name="trf_cur_cd"     value="<%=trf_cur_cd%>">
    <input type="hidden" name="xcrtDt"         value="<bean:write name="hblVO" property="obrd_dt_tm"/>">

	<input type="hidden" name="cctOrgCurr"     value="">
	<input type="hidden" name="objPfx"         value="">
	<input type="hidden" name="curRow2"        value="">

	<input type="hidden" name="ppdToCurrency" value="<%=partner_curr%>">
	<input type="hidden" name="ppdOrgCurr"    value="<%=partner_curr%>">

    <!--Invoice추가-->    
    <input type="hidden" name="tax_bil_flg"  value="">  
    <input type="hidden" name="inv_dt"       value="">
    <input type="hidden" name="inv_due_dt"   value="">  
    <input type="hidden" name="inv_rmk"      value="">  
    <input type="hidden" name="buy_inv_no"   value="">  
    <table width="100%" border="0" bordercolor="red" cellspacing="0" cellpadding="0">
        <tr>
            <td valign="top">
                <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="160" align="left">
                                        <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                            	<td nowrap="nowrap" width="160">
							                    	<table border="0" cellpadding="0" cellspacing="0">
							                    		<tr>
							                    			<td nowrap="nowrap"  class="sub_title"  width="160">
							                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Account_Receivable"/>
							                    			</td>
							                    		</tr>
							                    	</table>
							                    </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="right" nowrap>
										<table border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td align="right">
													<table id="sdBtns" border="0" cellspacing="0" cellpadding="0" style="display:none;">
														<tr>
															<td>
																<table onClick="setFrtSizeUp(docObjects[4], 'frtTableS')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Plus"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																	</tr>
																</table>
															</td>
															<td>
																<table onClick="setFrtSizeDown(docObjects[4], 'frtTableS')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Minus"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																	</tr>
																</table>
															</td>
															<td>
																<table onClick="goToInvoice(docObjects[4], 'LOCAL')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="B.AR"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																	</tr>
																</table>
															</td>
															<td>
																<table onClick="goToInvoiceModify('LOCAL')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Invoice"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																	</tr>
																</table>
															</td>
															<td>
																<table onClick="setDfltFrt('', 'S', 'O', 'M')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Default"/> <bean:message key="New"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																	</tr>
																</table>
															</td>
															<td>
																<table onclick="frtRowAdd('ROWADD', docObjects[4], 'S', 'O', 'M');" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Add"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																	</tr>
																</table>
															</td>
														</tr>
													</table> 
                                                </td>
											</tr>
										</table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td id="frtTableS">
                                        <table border="0" width="100%" id="mainTable">
                                            <tr>
                                                <td id="td4sheet7">
<!--
													<script language="javascript">comSheetObject('sheet7');</script>
-->
                                                 </td>
                                            </tr>
                                        </table>    
									</td>									
								</tr>
							</table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr>
            <td valign="top">
                <table width="100%" cellpadding="1" cellspacing="0">
                    <tr>
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="160" align="left">
                                        <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                            	<td nowrap="nowrap" width="160">
							                    	<table border="0" cellpadding="0" cellspacing="0">
							                    		<tr>
							                    			<td nowrap="nowrap"  class="sub_title"  width="160">
							                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Debit_Credit"/>
							                    			</td>
							                    		</tr>
							                    	</table>
							                    </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="right">
										<table id="dcBtns" border="0" cellspacing="0" cellpadding="0" style="display:none;">
											<tr>
												<td>
													<table onClick="setFrtSizeUp(docObjects[6], 'frtTableDC')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Plus"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onClick="setFrtSizeDown(docObjects[6], 'frtTableDC')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Minus"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onClick="goToInvoice(docObjects[6], 'DC')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="B.DC"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onClick="goToInvoiceModify('DC')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Invoice"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onClick="setDfltFrt('dc_', 'S', 'O', 'M')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Default"/> <bean:message key="New"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onclick="frtRowAdd('DCROWADD', docObjects[6], 'S', 'O', 'M');" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Add"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
											</tr>
										</table> 
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table border="0" width="100%" id="mainTable">
                                <tr>
                                    <td id="td4sheet9">
<!--
                                        <script language="javascript">comSheetObject('sheet9');</script>
-->
                                     </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
				</table>            
            </td>
        </tr>
        
        <tr>
            <td valign="top">
                <table width="100%" cellpadding="1" cellspacing="0">
                    <tr>
                        <td>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="160" align="left">
                                        <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                            	<td nowrap="nowrap" width="160">
							                    	<table border="0" cellpadding="0" cellspacing="0">
							                    		<tr>
							                    			<td nowrap="nowrap"  class="sub_title"  width="160">
							                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Account_Payable"/>
							                    			</td>
							                    		</tr>
							                    	</table>
							                    </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="right">
										<table id="bcBtns" border="0" cellspacing="0" cellpadding="0" style="display:none;">
											<tr>
												<td>
													<table onClick="setFrtSizeUp(docObjects[5], 'frtTableB')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Plus"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onClick="setFrtSizeDown(docObjects[5], 'frtTableB')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Minus"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onClick="goToInvoice(docObjects[5], 'AP')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="B.AP"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onClick="goToInvoiceModify('AP')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Invoice"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onClick="setDfltFrt('b_', 'S', 'O', 'M')" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Default"/> <bean:message key="New"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
												<td>
													<table onclick="frtRowAdd('BCROWADD', docObjects[5], 'S', 'O', 'M');" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;margin-left:5px;">
														<tr>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name"><bean:message key="Add"/></td>
															<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
														</tr>
													</table>
												</td>
											</tr>
										</table> 
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <table border="0" width="100%" id="mainTable">
                                <tr>
                                    <td id="td4sheet8">
<!--
                                        <script language="javascript">comSheetObject('sheet8');</script>
-->
                                     </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- 
					<tr>
						<td align="right" valign="top">
							<table width="680" height="10" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="130" nowrap class="table_search_head"><bean:message key="Invoice_Total"/>($) :</td>
									<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Buying"/></td>
									<td class="table_search_body">
										<input type="text" name="b_inv_sell"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
									</td>
									<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Credit"/></td>
									<td class="table_search_body">
										<input type="text" name="b_inv_debit"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
									</td>
									<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Total"/></td>
									<td class="table_search_body">
										<input type="text" name="b_inv_total"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
									</td>
								</tr>
                                <tr>
                                    <td class="table_search_body">
                                        <input type="hidden" name="b_pef_sell"    value='0'>
                                        <input type="hidden" name="b_pef_debit"   value='0'>
                                        <input type="hidden" name="b_pef_total"   value='0'>
                                    </td>
                                </tr>
							</table>
						</td>
					</tr>
					 -->
				</table>            
            </td>
        </tr>
        
		<!-- 
		<tr>
			<td height="1px" bgcolor="#FF0000"></td>
		</tr>
		<tr>
			<td>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="70" nowrap class="table_search_head">KRW/USD</td>
                        <td align="left" class="table_search_body" style="text-valing:middle">
                            <input type="text" name="dispCur"    value='<%=to_rt_ut%>'  class="search_form"  style="text-align:right;width:90px;" readonly>
                        </td>
                        <td width="170">&nbsp;</td>
                        <td width="115" nowrap class="table_search_head">Selling-Buying($):</td>
                        <td align="left" class="table_search_body" style="text-valing:middle">
                            <input type="text" name="sb_usd"    value=''  class="search_form"  style="text-align:right;width:90px;" readonly>
                        </td>
                        <td width="10">&nbsp;</td>
                        <td width="102" nowrap class="table_search_head">Debit-Credit($):</td>
                        <td align="left" class="table_search_body">
                            <input type="text" name="dc_usd"    value=''  class="search_form"  style="text-align:right;width:90px;" readonly>
                        </td>
                        <td width="10">&nbsp;</td>
                        <td width="65" nowrap class="table_search_head"><bean:message key="Profit"/>($):</td>
                        <td align="left" class="table_search_body">
                            <input type="text" name="profit"    value=''  class="search_form"  style="text-align:right;width:100px;" readonly>
                        </td>
                    </tr>
                </table>
			</td>
		</tr>
		 -->
    </table>
                </div>
                
                <div id="tabLayer" style="display:none">
                            <table width="100%" border="0" bordercolor="blue" cellspacing="10" cellpadding="0">                          
                                <tr>
                                    <td align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                        	<td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Shipping_Document"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td align="right">
                                                    <table  border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <table id="emlSnd" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('SNDEML')" style="display:none;margin-left:5px;cursor:hand">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Email"/></td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                    </tr>
                                                                </table>        
                                                            </td>
                                                            <td width="3"></td>
                                                            <td>
                                                                <table id="fileUp" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('DOCFILE')" style="display:none;margin-left:5px;cursor:hand">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Upload"/></td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                    </tr>
                                                                </table>        
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>               
                                            </tr>
                                            <tr>
                                                <td valign="top" align="left" colspan="3"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td id="td4sheet3">
<!--
                                                                <script language="javascript">comSheetObject('sheet3');</script>
-->
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" align="left" colspan="3"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td id="td4sheet10">
<!--
                                                                <script language="javascript">comSheetObject('sheet10');</script>
-->
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                            </table>
              </div>
                                                    
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
<!--        <tr>-->
<!--            <td width="1200" height="1" background="<%=CLT_PATH%>/web/img/main/tab_table_bottomg.gif"></td>-->
<!--        </tr>-->
    </table>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>
</body>
</html>
