<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RateMgmt.jsp
*@FileTitle  : Rate Management
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
=========================================================--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>

<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/ratemgmt/script/RateMgmt.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>

<!--    <bean:define id="valMap"  name="EventResponse" property="mapVal"/> -->
<%-- <%@taglib uri="http://www.springframework.org/tags" prefix="s"%>                                                                                                                                                                                                                                             --%>
<%
    //  UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");

//  String CLT_PATH = ".";
    String ctrt_no = "";
    String ctrt_nm = "";
    String sb_cls_nm = "";
    String rate_no = "";

    String link_doc_no      = "";
	
    String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
	String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
	
    try {
        ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
        ctrt_nm = request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
        sb_cls_nm = request.getParameter("sb_cls_nm")== null?"":request.getParameter("sb_cls_nm");
        rate_no = request.getParameter("rate_no")== null?"":request.getParameter("rate_no");

        link_doc_no     = request.getParameter("link_doc_no")== null?"":request.getParameter("link_doc_no");

        if(link_doc_no != null && !"".equals(link_doc_no)){
            ctrt_no = link_doc_no;
        }else{
        	if("".equals(ctrt_no)){
            	ctrt_no = DEF_WH_CTRT_NO;
            }
    		if("".equals(ctrt_nm)){
    			ctrt_nm = DEF_WH_CTRT_NM;
            }
        }
    }catch(Exception e) {
        out.println(e.toString());
    }
%>

<logic:notEmpty name="EventResponse">
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
    <bean:define id="ftr_mod" name="valMap" property="ftr_mod"/>
    <bean:define id="rate_filer" name="valMap" property="rate_filer"/>
    <bean:define id="rate_tp_cd" name="valMap" property="rate_tp_cd"/>
    <bean:define id="cond_first_in" name="valMap" property="cond_first_in"/>
    <bean:define id="cond_first_out" name="valMap" property="cond_first_out"/>
    <bean:define id="cond_first_str" name="valMap" property="cond_first_str"/>
    <bean:define id="cond_second_in_out" name="valMap" property="cond_second_in_out"/>
    <bean:define id="cond_second_str" name="valMap" property="cond_second_str"/>
    <bean:define id="day_opt" name="valMap" property="day_opt"/>
</logic:notEmpty>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>

<script language="javascript">
    var UserLangCd = '<%=userInfo.getUse_lang_cd()%>';
    var UserOfcCd  = '<%=userInfo.getOfc_cd()%>';
    var APP_PATH = '<%=CLT_PATH%>';
    var ofcFlg = "<%=userInfo.getOfc_flg()%>";
    var Def_wh_ctrt_no = "<%=userInfo.getDef_wh_ctrt_no()%>";
    var Def_wh_ctrt_nm = "<%=userInfo.getDef_wh_ctrt_nm()%>";
    var Def_wh_cd = "<%=userInfo.getDef_wh_cd()%>";
    var Def_wh_nm = "<%=userInfo.getDef_wh_nm()%>";
</script>

<script>

    var ftr_modText = "";
    var ftr_modCode = "";

    <logic:notEmpty name="ftr_mod">
    <logic:iterate id="item" name="ftr_mod">
    ftr_modCode+="|"+'<bean:write name="item" property="code"/>';
    ftr_modText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    ftr_modCode = ftr_modCode.substring(1);
    ftr_modText = ftr_modText.substring(1);
    </logic:notEmpty>

    var rate_tp_cdText = "";
    var rate_tp_cdCode = "";

    <logic:notEmpty name="rate_tp_cd">
    <logic:iterate id="item" name="rate_tp_cd">
		/* #4445 [JH Logistics] WMS Rate In & Out input (v461.13) - IN&OUT Combo 제거 */
    	//if( 'IAO' != '<bean:write name="item" property="code"/>' ){
			rate_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
		    rate_tp_cdText+="|"+'<bean:write name="item" property="name"/>';	
		//}
    </logic:iterate>

    rate_tp_cdCode = rate_tp_cdCode.substring(1);
    rate_tp_cdText = rate_tp_cdText.substring(1);
    </logic:notEmpty>

    var cond_first_inText = "";
    var cond_first_inCode = "";

    <logic:notEmpty name="cond_first_in">
    <logic:iterate id="item" name="cond_first_in">
    cond_first_inCode+="|"+'<bean:write name="item" property="code"/>';
    cond_first_inText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    cond_first_inCode = cond_first_inCode.substring(1);
    cond_first_inText = cond_first_inText.substring(1);
    </logic:notEmpty>

    var cond_first_outText = "";
    var cond_first_outCode = "";

    <logic:notEmpty name="cond_first_out">
    <logic:iterate id="item" name="cond_first_out">
    cond_first_outCode+="|"+'<bean:write name="item" property="code"/>';
    cond_first_outText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    cond_first_outCode = cond_first_outCode.substring(1);
    cond_first_outText = cond_first_outText.substring(1);
    </logic:notEmpty>

    var cond_first_strText = "";
    var cond_first_strCode = "";

    <logic:notEmpty name="cond_first_str">
    <logic:iterate id="item" name="cond_first_str">
    cond_first_strCode+="|"+'<bean:write name="item" property="code"/>';
    cond_first_strText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    cond_first_strCode = cond_first_strCode.substring(1);
    cond_first_strText = cond_first_strText.substring(1);
    </logic:notEmpty>

    var cond_second_in_outText = "";
    var cond_second_in_outCode = "";

    <logic:notEmpty name="cond_second_in_out">
    <logic:iterate id="item" name="cond_second_in_out">
    cond_second_in_outCode+="|"+'<bean:write name="item" property="code"/>';
    cond_second_in_outText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    cond_second_in_outCode = cond_second_in_outCode.substring(1);
    cond_second_in_outText = cond_second_in_outText.substring(1);
    </logic:notEmpty>

    var cond_second_strText = "";
    var cond_second_strCode = "";

    <logic:notEmpty name="cond_second_str">
    <logic:iterate id="item" name="cond_second_str">
    cond_second_strCode+="|"+'<bean:write name="item" property="code"/>';
    cond_second_strText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    cond_second_strCode = cond_second_strCode.substring(1);
    cond_second_strText = cond_second_strText.substring(1);
    </logic:notEmpty>

    var rate_filerCode = "";
    var rate_filerText = "";

    <logic:notEmpty name="rate_filer">
    <logic:iterate id="item" name="rate_filer">
    rate_filerCode+="|"+'<bean:write name="item" property="code"/>';
    rate_filerText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    rate_filerCode = rate_filerCode.substring(1);
    rate_filerText = rate_filerText.substring(1);
    </logic:notEmpty>

    var day_optText = "";
    var day_optCode = "";

    <logic:notEmpty name="day_opt">
    <logic:iterate id="item" name="day_opt">
    day_optCode+="|"+'<bean:write name="item" property="code"/>';
    day_optText+="|"+'<bean:write name="item" property="name"/>';
    </logic:iterate>

    day_optCode = day_optCode.substring(1);
    day_optText = day_optText.substring(1);
    </logic:notEmpty>

    <% boolean isBegin = false; %>
    /*Freight code  */
    var FreightText = ' |';
    var FreightCode = ' |';
    <%boolean isBegin_Freight = false; %>
    <bean:define id="FrtList" name="cdMap" property="Freight"/>
    <logic:iterate id="FrtVO" name="FrtList">
    <% if(isBegin_Freight){ %>
    FreightCode+= '|';
    FreightText+= '|';
    <% }else{
          isBegin_Freight = true;
       } %>
    FreightCode+= '<bean:write name="FrtVO" property="frt_cd" filter="false"/>';
    FreightText+= '<bean:write name="FrtVO" property="frt_cd" filter="false"/>'+': '+'<bean:write name="FrtVO" property="frt_cd_nm" filter="false"/>';
    </logic:iterate>
    <!-- 요구사항 #2560px6 : [B/L Entry] B/L에서의 Freight Input 시 Currency 선택 옵션 변경 //-->
    var CURRCD = '';
    <% isBegin = false; %>
    <bean:define id="currCdList" name="valMap" property="currCdList"/>
    <logic:iterate id="codeVO" name="currCdList">
    <% if(isBegin){ %>
    CURRCD += '|';
    <% }else{
        isBegin = true;
       } %>
    CURRCD+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>

    var WH_CD = '';
    var WH_TEXT = '';
    <% isBegin = false; %>
    <bean:define id="warehouse" name="valMap" property="warehouse"/>
    <logic:iterate id="WHVO" name="warehouse">
    <% if(isBegin){ %>
    WH_CD+= '|';
    WH_TEXT+= '|';
    <% }else{
          isBegin = true;
       } %>
    WH_CD+= '<bean:write name="WHVO" property="wh_cd"/>';
    WH_TEXT+= '<bean:write name="WHVO" property="wh_nm"/>';
    </logic:iterate>
    
	// License Plate No
    var LIC_PLATE_CD = '';
    var LIC_PLATE_TEXT = '';
    <% isBegin = false; %>
    <bean:define id="lic_plat_ut_list" name="valMap" property="lic_plat_ut_list"/>
    <logic:iterate id="LICVO" name="lic_plat_ut_list">
    <% if(isBegin){ %>
	    LIC_PLATE_CD+= '|';
	    LIC_PLATE_TEXT+= '|';
    <% }else{
          isBegin = true;
       } %>
       LIC_PLATE_CD+= '<bean:write name="LICVO" property="lic_plat_ut_cd"/>';
       LIC_PLATE_TEXT+= '<bean:write name="LICVO" property="lic_plat_ut_cd"/>';
    </logic:iterate>
    
	var TPCD1 = '';
    var TPCD2 = '';
    var TPCD3 = '';
    <% isBegin = false; %>
    <!--Role 코드조회-->
    <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
    <logic:iterate id="codeVO" name="tpszList">
        <% if(isBegin){ %>
            TPCD1+= '|';
            TPCD2+= '|';
            TPCD3+= '|';
        <% }else{
              isBegin = true;
           } %>
        TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD3+= '<bean:write name="codeVO" property="cntr_grp_cd"/>';
    </logic:iterate>
    
	// Truck Code List
    var TRUCK_CD = '';
    var TRUCK_TEXT = '';
    <% isBegin = false; %>
    <bean:define id="trkTpszList" name="valMap" property="trkTpszList"/>
    <logic:iterate id="TRKVO" name="trkTpszList">
    <% if(isBegin){ %>
	    TRUCK_CD+= '|';
	    TRUCK_TEXT+= '|';
    <% }else{
          isBegin = true;
       } %>
       TRUCK_CD+= '<bean:write name="TRKVO" property="trk_tp_ct"/>';
       TRUCK_TEXT+= '<bean:write name="TRKVO" property="descr"/>';
    </logic:iterate>
</script>

<script type="text/javascript">
    function setupPage(){
        var errMessage = "";
        if (errMessage.length >= 1) {
            ComShowMessage(errMessage);
        } // end if

        loadPage(true);
        btnLoad();
//      loadPage();
    }
    function btnLoad(){

    }
</script>
<form id="form" name="form">
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" id="user_id" />
    <input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" id="user_nm" />
    <input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" id="org_cd" />
    <input type="hidden" name="wh_ofc_cd" id="wh_ofc_cd" value="" />
    <input type="hidden" name="wh_curr_cd" id="wh_curr_cd" value="" />
    <input type="hidden" name="org_nm" value="<%=userInfo.getOfc_eng_nm()%>" id="org_nm" />
    <input type="hidden" name="auth_lvl" value="FA" id="auth_lvl" />
    <input type="hidden" name="tel" value="<%=userInfo.getPhn()%>" id="tel" />
    <input type="hidden" name="fax" value="<%=userInfo.getFax()%>" id="fax" />
    <input type="hidden" name="email" value="<%=userInfo.getEml()%>" id="email" />
    <input type="hidden" name="order" id="order" />
	<input type="hidden" name="pol" id="pol" />
    <input type="hidden" name="form_mode" value="NEW" id="form_mode" />
    <input type="hidden" name="in_sb_cls_cd" value="S" id="in_sb_cls_cd" />

    <input type="hidden" name="pop_sb_cls_nm" value="<%=sb_cls_nm%>" id="pop_sb_cls_nm" />
    <input type="hidden" name="pop_rate_no" value="<%=rate_no%>" id="pop_rate_no" />
    <input type="hidden" name="rtn_commodity_desc" value="" id="rtn_commodity_desc" />
    <input type="hidden" name="rtn_type" value="" id="rtn_type" />
    <input type="hidden" name="ctrt_cust_cd" value="" id="ctrt_cust_cd" />
    <input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
	<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />

    <div class="page_title_area clear">
        <!-- page_title(S) -->
        <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
        <!-- page_title(E) -->
        <!-- opus_design_btn(S) -->
        <div class="opus_design_btn TOP">
  <%--          
           <button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" name="btn_search" id="btn_search" onclick="doWork('SEARCH')"><bean:message key="Search"/></button>
           <button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" class="btn_normal" name="btn_New" id="btn_New" onclick="doWork('NEW')"><bean:message key="New"/></button>
	       <button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" id="lnk_Execl_DL" name="lnk_Execl_DL" onclick="doWork('lnk_Execl_DL')"><bean:message key="Excel_DL"/></button>
	       <button type="button" btnAuth="HISTORY" class="btn_normal" id="lnk_History" name="lnk_History" onclick="doWork('lnk_History')"><bean:message key="History"/></button>
	       <!-- <button type="button" btnAuth="TEMPLATE_DL" class="btn_normal"  id="lnk_Temp_DL" name="lnk_Temp_DL" onclick="doWork('lnk_Temp_DL')"><bean:message key="Template_DL"/></button>
	       <button type="button" btnAuth="EXCEL_UL" class="btn_normal" id="lnk_Execl_UL" name="lnk_Execl_UL" onclick="doWork('lnk_Execl_UL')"><bean:message key="Excel_UL"/></button>
	        -->
 --%>        </div>
        <!-- opus_design_btn(E) -->
        <!-- page_location(S) -->
        <div class="location">
            <span><%=LEV1_NM%></span> &gt;
            <span><%=LEV2_NM%></span> &gt;
            <span><%=LEV3_NM%></span>
        </div>
        <!-- page_location(E) -->
    </div>
<div class="over_wrap" height="100%">   
    <!-- opus_design_inquiry(S) -->
    <div class= "wrap_search">
        <div class="opus_design_inquiry entry_pannel ">
            <table>
                <colgroup>
                    <col width="80" />
                    <col width="*" />
                </colgroup>
                <tbody>
                <tr>
                    <th><bean:message key="Contract_No"/></th>
                    <td><input name="in_ctrt_no"  type="text" class="L_input" id="in_ctrt_no"  value="<%=ctrt_no%>"  style="width:85px;ime-mode:disabled;text-transform:uppercase;" maxlength="10" dataformat="engup" onBlur="strToUpper(this);searchTlCtrtInfo(form, this.value, 'ctrt_no');" required/><!--
                         --><button type="button" name="btn_in_ctrt_no" id="btn_in_ctrt_no"class="input_seach_btn" tabindex="-1" onclick="doWork('btn_in_ctrt_no')"></button><!--
                          --><input name="in_ctrt_nm"  type="text" class="L_input" id="in_ctrt_nm" value="<%=ctrt_nm%>" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" required onkeydown="if(event.keyCode==13){doWork(CtrtPopup('paramctr'));}"/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- <div class= "wrap_search_tab"> -->
    <div class='wrap_result'>
        <div class="opus_design_inquiry">
            <table>
                <colgroup>
                    <col width="168" />
                    <col width="281" />
                    <col width="200" />
                    <col width="*" />
                </colgroup>
                <tbody>
                <tr>
                    <th><a style="color:#0000FF" href="javascript:ctrt_link();" id="ctrt_link"><span class="point_B"><bean:message key="Contract_No"/></span></a></th>
                    <td><input name="ctrt_no" dataformat="engup" otherchar="-_" type="text" class="L_input_R" id="ctrt_no" style="width:80px;" readonly></td>
                    <th><bean:message key="Contract_Name"/></th>
                    <td><input name="ctrt_nm" type="text" class="L_input_R" id="ctrt_nm" dataformat="engup" otherchar = " ()-_" style="width:273px;" readonly/></td>
                </tr>

                <tr>
                    <th><bean:message key="Sales_Office"/></th>
                    <td><input name="sales_ofc_cd" type="text" dataformat="engup" class="L_input_R" id="sales_ofc_cd" style="width:80px;" readonly/><!--
                     --><input name="sales_ofc_nm" type="text" style="text-transform: uppercase; width: 190px;" class="L_input_R" id="sales_ofc_nm" readonly/>
                    </td>
                    <th><bean:message key="Sales_PIC"/></th>
                    <td><input name="sales_pic_id" type="text" dataformat="engup" class="L_input_R" id="sales_pic_id" style="width:80px;" readonly/><!--
                  --><input name="sales_pic_nm" type="text"  style="text-transform: uppercase; width: 190px;" class="L_input_R" id="sales_pic_nm" readonly/>
                    </td>
                </tr>

                <tr>
                    <th><bean:message key="Rate_Created_Date_User"/></th>
                    <td><input name="rgst_sys_dt" type="text" class="L_input_R" id="rgst_sys_dt" style="width:80px;" readonly readonly/><input name="rgst_nm" type="text" class="L_input_R" id="rgst_id" style="width:190px;" readonly  readonly/> </td>
                    <th><bean:message key="Rate_Updated-Date_User"/></th>
                    <td><input name="modi_sys_dt" type="text" class="L_input_R" id="modi_sys_dt" style="width:80px;" readonly/><input name="modi_nm" type="text" class="L_input_R" id="modi_id" style="width:190px;" readonly/></td>
                </tr>
                </tbody>
            </table>
        </div>
        <p class="line_bluedot"></p>
        <!--    <ul id="ulTab" class="opus_design_tab"> -->
        <!--        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span>Sell</span></a></li> -->
        <!--         <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span>Buy</span></a></li> -->
        <!--    </ul> -->
        <!--        <! -----// T_Tab E ----- > -->
        <!--    <div id="tabLayer" name="tabLayer" style="display:inline">   -->
        <div class="opus_design_grid clear" style="width: 922px">
            <div class="grid_option_left" style="display: none" >
                <div class= "opus_design_inquiry">
                    <table>
                        <colgroup>
                            <col width="100">
                            <col width="150">
                            <col width="100">
                            <col width="*">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th><bean:message key="Branch_Filter"/></th>
                            <td>
                                <select name="sell_br_filer" class="search_form" id="sell_br_filer" style="width:100px;" onchange="sell_br_filer_OnChange()">
                                    <option value="ALL">ALL</option>
                                </select>
                            </td>
                            <th><bean:message key="Publish_YN"/></th>
                            <td>
                                <select name="sell_pub_filer" class="search_form" id="sell_pub_filer" style="width:50px;" onchange="sell_br_filer_OnChange()">
                                    <option value="ALL">ALL</option>
                                    <option value="Y">Y</option>
                                    <option value="N">N</option>
                                </select>
                            </td>
                            <th></th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- opus_design_btn(S) -->
            <h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Rate"/> <bean:message key="Basic_Information"/></h3>
            <div class="opus_design_btn pad_top_8">
                <button type="button" class="btn_normal" name="btn_Sell_Main_Add" id="btn_Sell_Main_Add" onclick="doWork('btn_Sell_Main_Add')"><bean:message key="Add"/></button><!--
                 --><button type="button" class="btn_normal" name="btn_Sell_Main_Del" id="btn_Sell_Main_Del" onclick="doWork('btn_Sell_Main_Del')"><bean:message key="Del"/></button><!--
                 --><button type="button" class="btn_normal" name="btn_Sell_Main_Copy" id="btn_Sell_Main_Copy" onclick="doWork('btn_Sell_Main_Copy')"><bean:message key="Copy"/></button><!--
                 --><button type="button" class="btn_normal" name="btn_Sell_Main_Copy_All" id="btn_Sell_Main_Copy_All" onclick="doWork('btn_Sell_Main_Copy_All')"><bean:message key="Copy_All"/></button><!--
                 --><button type="button" class="btn_normal" name="btn_Sell_Main_Save" id="btn_Sell_Main_Save" onclick="doWork('btn_Sell_Main_Save')"><bean:message key="Save"/></button><!--
                 --></div>
            <!-- opus_design_btn(E) -->
            <script type="text/javascript">comSheetObject('sheet1');</script>
        </div>
        <div class="opus_design_grid clear">
            <div class="grid_option_left" style="display: none">
                <div class= "opus_design_inquiry">
                    <table>
                        <colgroup>
                            <col width="80">
                            <col width="*">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th><bean:message key="Rate_Filter"/></th>
                            <td>
                                <!--                                 <script type="text/javascript">ComComboObject('sell_filer', 1, 120, 1);</script> -->
                                <select name="sell_filer" class="search_form" id="sell_filer" style="width:100px;" onchange="sell_filer_OnChange()" disabled="disabled">
                                    <!--                                    <option value="ALL">ALL</option> -->
                                    <%--                                    <bean:define id="paramTermsList"  name="valMap" property="ord_tp_cd"/> --%>
                                    <%--                                    <logic:iterate id="TermsVO" name="paramTermsList"> --%>
                                    <%--                                        <option value='<bean:write name="TermsVO" property="cd_val"/>'><bean:write name="TermsVO" property="cd_nm"/></option> --%>
                                    <%--                                    </logic:iterate> --%>
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- opus_design_btn(S) -->
            <h3 class="title_design" style="margin-bottom: 0px;"><bean:message key="Rate"/> <bean:message key="Detail_Information"/></h3>
            <div class="opus_design_btn pad_top_8">
                <button type="button" class="btn_normal" name="btn_Sell_Detail_Add" id="btn_Sell_Detail_Add" onclick="doWork('btn_Sell_Detail_Add')"><bean:message key="Add"/></button><!--
                 --><button type="button" class="btn_normal" name="btn_Sell_Detail_Del" id="btn_Sell_Detail_Del" onclick="doWork('btn_Sell_Detail_Del')"><bean:message key="Del"/></button><!--
                 --><button type="button" class="btn_normal" name="btn_Sell_Detail_Copy" id="btn_Sell_Detail_Copy" onclick="doWork('btn_Sell_Detail_Copy')"><bean:message key="Copy"/></button><!--
                 --><button type="button" class="btn_normal" name="btn_Sell_Detail_Save" id="btn_Sell_Detail_Save" onclick="doWork('btn_Sell_Detail_Save')"><bean:message key="Save"/></button><!--
                 --></div>
            <!-- opus_design_btn(E) -->
            <script type="text/javascript">comSheetObject('sheet2');</script>
        </div>
    </div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>
    <input type="hidden" name="docType" value="" id="docType" />
</form>
<script type="text/javascript">
    var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
    doBtnAuthority(attr_extension);
</script>

