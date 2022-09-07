<%--
/*=========================================================
*Copyright(c) 20px14 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_BMD_0040.jsp
*@FileTitle  : OEMBL Entry
*@author     : PhiTran
*@version    : 1.0
*@since      : 2014/06/23
=========================================================*/
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <!-- 2016-12-12 자동완성 기능 추가 S -->    
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
    <!-- 2016-12-12 자동완성 기능 추가 E -->
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/masterbl/script/SEE_BMD_0040.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script>    
    
    <bean:parameter name="f_cmd" id="f_cmd_chk" value= ""/>
    
/*     #3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가 */
    var bkg_to_bl_flag ="<%=request.getParameter("bkg_to_bl_flag")%>";
    var uod_flg ="<%= userInfo.getUod_flg()%>"
    var usrDept = "<%=userInfo.getDept_cd()%>";
    var usrId = "<%= userInfo.getUsrid() %>";
    var ofc_cd = "<%= userInfo.getOfc_cd() %>";
    var usrNm = "<%= userInfo.getUser_name() %>";
    //#1821 [PATENT] B/L 옵션 항목 - 기능 확인
    var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
     var INST_PROFIT = "N";
     var AUTOCOMPLETE_YN = 'N';
    //#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
    var edob_flg;
    var ref_ofc_cd;
    //OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
    var eblfn_flg;

         
     <logic:notEmpty name="valMap" property="autocompleteYn">
        AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
     </logic:notEmpty>
 
        function setupPage()
        {
            setOfficeData();
            loadPage();
            btnLoad();
            doHideProcess();
            loadData();
        
            setTimeout("document.frm1.f_ref_no.focus();", 1000);
            //2016.04.21 C.W.Park Added
            //#52109 버튼 로딩 후 ofc별 blck_dt 셋업
            //setBlock_dt();
            
            //#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
			// Carrier Booking에서 create mbl을 이미 만든 경우, CarrierBooking#를 clear시켜준다. 
			//bl_to_bkg_flag = Y이면 Carrier Booking 에서 MBL 만든 케이스다.
            
			
			//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
			/* 
			if(bkg_to_bl_flag=="Y"){
            	//frm1.intg_bl_seq.value의 값이 있는 경우는 이미 mbl create 한 적이 있는 케이스. 
            	if(frm1.intg_bl_seq.value !=""){
            		frm1.lnr_bkg_no.value = '';
  					//#3524 - 2
            		frm1.org_bkg_seq.value = '';
            	}
            }
            */
            	
        }
        function dispBizBtns(dispTp){
            //Freight버튼
            getObj("sdBtns").style.display    = dispTp;
            getObj("profitBtns").style.display = INST_PROFIT == "Y" ? dispTp : 'none';
            getObj("bcBtns").style.display    = dispTp;
            getObj("dcBtns").style.display    = dispTp;
            getBtnObj("finalModiObj").style.display = 'none';
            getObj("itmAdd").style.display = dispTp;
            getObj("loadPO").style.display = dispTp;
        }
        function btnLoad(){

            // post date 수정 권한
            //if(user_role_cd=="ADM"){
            //  frm1.post_dt.className = "search_form";
            //  frm1.post_dt.readOnly = false;
                
                //20px12.11.14 요청사항에 의해서 일단 숨김
                //getBtnObj("finalModiObj").style.display = 'inline';
            //}
            
            //frm1.ref_no.className = 'search_form';
            //frm1.ref_no.readOnly  = false;
            frm1.ref_no.className = 'search_form-disable';
            frm1.ref_no.readOnly  = true;
            
            /* #428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED */
            /* O04 롤코드가 있으면 수정가능 or 롤코드가 없을땐 인보이스가 없을때 수정가능  (ref_no) */
            //alert("html = " + frm1.f_modify.value);
            if(frm1.f_modify.value == 'UPDATE'){
                frm1.ref_no.className = 'search_form';
                frm1.ref_no.readOnly  = false;              
            }
            

            if(user_lang_cd == "KO"){
                getBtnObj("mfObj").style.display       = 'inline';
            }else{
                getBtnObj("mfObj").style.display       = 'none';
            } 
            
            if(frm1.bl_sts_cd.value=='NA'){
                //frm1.mrn.className = 'search_form';
                //frm1.mrn.readOnly  = false;
                
                //frm1.lnr_bkg_no.className = 'search_form';
                //frm1.lnr_bkg_no.readOnly  = false;
                getBtnObj("btnAccounting").style.display = 'none';
            }else{
                getBtnObj("btnAccounting").style.display = 'inline';
                //getBtnObj("btnFileLabel").style.display = 'inline';
                getBtnObj("btnPProfit").style.display  = 'inline'; 
                 if(frm1.bl_sts_cd.value=='MC'){
                    //frm1.mrn.className = 'search_form';
                    //frm1.mrn.readOnly  = false;
                    
                    //frm1.lnr_bkg_no.className = 'search_form';
                    //frm1.lnr_bkg_no.readOnly  = false;
                    
                    //frm1.bl_no.className = 'search_form';
                    //frm1.bl_no.readOnly  = false;
                    
                    
                    //modiObj").style.display = 'inline';
                    getBtnObj("btnDelete").style.display  = 'inline';
                    //emlSnd").style.display  = 'inline';
                    getObj("fileUp").style.display  = 'inline';
                    getObj("sDoc").style.display  = 'inline';
                    getBtnObj("btnBkgInfo").style.display  = 'inline';
                    getBtnObj("btnVgmEdi").style.display  = 'inline';
                    getBtnObj("btnCopy").style.display = 'inline';
                    getBtnObj("hblObj").style.display = 'inline';

                    dispBizBtns('inline');
                    //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
                    getObj("goWoObj").style.display = 'inline';
                    getBtnObj("btnPrint").style.display       = 'inline';//OFVFOUR-8306: [Bug Release V4.7.10] [ZEN CONTINETAL] MISSING SAVE BUTTON WHEN OPENING OEM B/L ENTRY SCREEN 
//               }else if(frm1.bl_sts_cd.value=='MF'){
//                   //frm1.mrn.className = 'search_form-disable';
//                   //frm1.mrn.readOnly  = true;
                        
//                   //frm1.lnr_bkg_no.className = 'search_form-disable';
//                   //frm1.lnr_bkg_no.readOnly  = true;
                
//                   //frm1.bl_no.className = 'search_form-disable';
//                   //frm1.bl_no.readOnly  = true;
                
//                   //modiObj").style.display = 'none';
//                   getBtnObj("btnDelete").style.display  = 'none';
//                   //emlSnd").style.display  = 'none';
//                   getObj("fileUp").style.display  = 'none';  
//                   getObj("sDoc").style.display  = 'none';    
//                   getBtnObj("btnCopy").style.display = 'none';
//                   getBtnObj("hblObj").style.display = 'none';

//                   dispBizBtns('inline');
//                   //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
//                   getObj("goWoObj").style.display = 'inline';
//               }else if(frm1.bl_sts_cd.value=='HO'){
//                   getBtnObj("btnSave").style.display        = 'none';
//                   getBtnObj("closeModiObj").style.display = 'inline';
//                   getBtnObj("btnDelete").style.display          = 'none';
//                   getBtnObj("btnCopy").style.display        = 'inline';
//                   if(user_lang_cd == "KO"){
//                       getBtnObj("mfObj").style.display      = 'inline';
//                  }else{
//                      getBtnObj("mfObj").style.display       = 'none';
//                  } 
//                   getBtnObj("btnPrint").style.display       = 'inline';
//                   getBtnObj("btnLabel").style.display       = 'inline';
//                   getBtnObj("btnLabel2").style.display      = 'inline';
//                   getBtnObj("hblObj").style.display     = 'inline';

//                   dispBizBtns('none');
                 }else if(frm1.bl_sts_cd.value=='HF'){
                     getBtnObj("btnSave").style.display        = 'none';
                     getBtnObj("btnSaveX").style.display       = 'none';
                     getBtnObj("closeModiObj").style.display = 'inline';
                     getBtnObj("btnDelete").style.display          = 'none';
                     getBtnObj("btnCopy").style.display        = 'inline';
                     if(user_lang_cd == "KO"){
                         getBtnObj("mfObj").style.display      = 'inline';
                     }else{
                         getBtnObj("mfObj").style.display      = 'none';
                     } 
                     getBtnObj("btnPrint").style.display       = 'inline';
                     getBtnObj("btnLabel").style.display       = 'inline';
                     getBtnObj("btnLabel2").style.display      = 'inline';
                     getBtnObj("hblObj").style.display         = 'none';

                     dispBizBtns('none');
                     //#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
                     getObj("goWoObj").style.display = 'inline';
                     
                     // #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
                     // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
                     frm1.ref_no.className = 'search_form-disable';
                     frm1.ref_no.readOnly  = true;
                 }
            }
            //OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
            if (eblfn_flg != 'Y') {
                frm1.ref_no.disabled = true;
            }
            fnbtnCtl();
        }

        var TPCD1 = '';
        var TPCD2 = '';
        var TPCD3 = '';
        <% boolean isBegin = false; %>
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
        //#3411 [JTC]Accounting & Performance 수정사항
        //Unit Code Blank 삭제
        var UNITCD1 = '';
        var UNITCD2 = '';
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


        <!-- temp code -->
        var TEMPCD1 = '';
        var TEMPCD2 = '';
        <% isBegin = false; %>
        <logic:notEmpty name="valMap" property="TEMPCD">
            <bean:define id="tempcdList" name="valMap" property="TEMPCD"/>
            <logic:iterate id="codeVO" name="tempcdList">
                <% if(isBegin){ %>
                    TEMPCD1+= '|';
                    TEMPCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   TEMPCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   TEMPCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
        <!-- vent code -->
        var VENTCD1 = '';
        var VENTCD2 = '';
        <% isBegin = false; %>
        <logic:notEmpty name="valMap" property="VENTCD">
            <bean:define id="ventcdList" name="valMap" property="VENTCD"/>
            <logic:iterate id="codeVO" name="ventcdList">
                <% if(isBegin){ %>
                    VENTCD1+= '|';
                    VENTCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   VENTCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   VENTCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        <!-- vgm관련 seal party code -->
        var SEALPTYCD1 = '|';
        var SEALPTYCD2 = '|';
        <% isBegin = false; %>
        <logic:notEmpty name="valMap" property="SEALPTYCD">
            <bean:define id="sealpartycdList" name="valMap" property="SEALPTYCD"/>
            <logic:iterate id="codeVO" name="sealpartycdList">
                <% if(isBegin){ %>
                    SEALPTYCD1+= '|';
                    SEALPTYCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   SEALPTYCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   SEALPTYCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
                
        var VGMWGTCD1 = '';
        var VGMWGTCD2 = '';
        <% isBegin = false; %>
        <logic:notEmpty name="valMap" property="VGMWGTCD">
            <bean:define id="vgmWgtCdList" name="valMap" property="VGMWGTCD"/>
            <logic:iterate id="codeVO" name="vgmWgtCdList">
                <% if(isBegin){ %>
                    VGMWGTCD1+= '|';
                    VGMWGTCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   VGMWGTCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   VGMWGTCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        var VGMMETHODCD1 = '';
        var VGMMETHODCD2 = '';
        <% isBegin = false; %>
        <logic:notEmpty name="valMap" property="VGMMETHODCD">
            <bean:define id="vgmMethodList" name="valMap" property="VGMMETHODCD"/>
            <logic:iterate id="codeVO" name="vgmMethodList">
                <% if(isBegin){ %>
                    VGMMETHODCD1+= '|';
                    VGMMETHODCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   VGMMETHODCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   VGMMETHODCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        var VGMCNTRTPCD1 = '';
        var VGMCNTRTPCD2 = '';
        <% isBegin = false; %>
        <logic:notEmpty name="valMap" property="VGMCNTRTPCD">
            <bean:define id="vgmCntrTpList" name="valMap" property="VGMCNTRTPCD"/>
            <logic:iterate id="codeVO" name="vgmCntrTpList">
                <% if(isBegin){ %>
                    VGMCNTRTPCD1+= '|';
                    VGMCNTRTPCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   VGMCNTRTPCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                   VGMCNTRTPCD2+= '<bean:write name="codeVO" property="cd_val"/>';
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
               ARFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>';
               ARFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="true"/>';
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
               APFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>';
               APFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="true"/>';
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
               DCFRTCD1+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>';
               DCFRTCD2+= '<bean:write name="FrtCdVO" property="frt_cd" filter="true"/>' + ": " + '<bean:write name="FrtCdVO" property="frt_cd_nm" filter="true"/>';
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
        
        var CNTCD1 = '';
        var CNTCD2 = '';
        <logic:notEmpty name="valMap" property="cntrNoLst">
            <% isBegin = false; %>
            <bean:define id="cntrLst"  name="valMap" property="cntrNoLst"/>
            <logic:iterate id="cntrNoVO" name="cntrLst">
                <% if(isBegin){ %>
                    CNTCD1+= '|';
                    CNTCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                CNTCD1+= '<bean:write name="cntrNoVO" property="cd_val"/>';
                CNTCD2+= '<bean:write name="cntrNoVO" property="cd_nm"/>';
            </logic:iterate>        
        </logic:notEmpty>

        <!-- ###JOB_STS LIST 항목 ### -->
        var JBCD1 = '';
        var JBCD2 = '';
        <% isBegin = false; %>
        <bean:define id="jobStsList" name="valMap" property="jobStsList"/>
        <logic:iterate id="JobStsVO" name="jobStsList">
            <% if(isBegin){ %>
                JBCD1+= '|';
                JBCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
               JBCD1+= '<bean:write name="JobStsVO" property="bse_tm_cd"/>';
               JBCD2+= '<bean:write name="JobStsVO" property="bse_tm_nm"/>';
        </logic:iterate>
        
        var ofc_cd = "<%= userInfo.getOfc_cd() %>";
        
      //#1258 [OEM B/L Entry] Show warning message when input valid data and focus out
		var OEH_SAID_DESC_PRT_QTY = "S";
		<logic:notEmpty name="valMap" property="OEH_SAID_DESC_PRT_QTY">
			<bean:define id="saidDescOpt" name="valMap" property="OEH_SAID_DESC_PRT_QTY"/>
			OEH_SAID_DESC_PRT_QTY = "<bean:write name='saidDescOpt' property='opt_val' />";
		</logic:notEmpty>
        
        <!-- ###Office Info## -->
        <% isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
        var oth_wgt_ut_cd = "";
        var oth_meas_ut_cd = "";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var sea_body = "<bean:write name="ofcVO" property="sea_body"/>";
        var sea_cob = "<bean:write name="ofcVO" property="sea_cob"/>";
        var sea_mei = "<bean:write name="ofcVO" property="sea_mei"/>";
        var sea_msco = "<bean:write name="ofcVO" property="sea_msco"/>";
        var vsl_show_flg = "<bean:write name="ofcVO" property="vsl_show_flg"/>";
        var load_port_show_flg = "<bean:write name="ofcVO" property="load_port_show_flg"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_exp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var ofc_locl_curr_cd = "<bean:write name="ofcVO" property="locl_curr_cd"/>"; //#138 Local Currency 추가
        var pps_use_flg = "<bean:write name="ofcVO" property="pps_use_flg"/>";
        
        var current_usrid = "<%=userInfo.getUsrid()%>";
        
        var shpAddr = '<bean:write name="hblVO" property="shpr_trdp_nm"/> O/B OF';

        var user_role_cd = "<%=userInfo.getRole_cd()%>";
        var user_lang_cd = "<%=userInfo.getUse_lang_cd()%>";

        var usrId = "<%= userInfo.getUsrid() %>";
        var usrPhn = "<%= userInfo.getPhn() %>";
        var usrFax = "<%= userInfo.getFax() %>";
        var usrNm = "<%= userInfo.getUser_name() %>";
        var usrEml = "<%= userInfo.getEml() %>";
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";  //[20141125 OJG] - Multi Currency 사용 여부
        var attr_extension = "<%= roleBtnVO.getAttr_extension() %>"; 
        
        //#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
        var vat_rt_dp_cnt = Number("<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>");
        var xch_rt_dp_cnt = Number("<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>");
        
        function fnbtnCtl(){
            
            // 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
            //권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
            //권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
            var formObj=document.frm1;
            //#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
            edob_flg        = "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L)
            //OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
            eblfn_flg = "<%=userInfo.getEblfn_flg()%>";
            ref_ofc_cd =  formObj.ref_ofc_cd.value;
            //alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
            var btnflag = "Y";
            if (edob_flg == "N"){
                if (ofc_cd != ref_ofc_cd){  
                    btnflag = "N";
                }
            }  
            if (ref_ofc_cd == "") {  btnflag = "Y"; }
            if (btnflag == "Y"){
                //기존유지
                //$("#btnSave").show();
                //$("#closeModiObj").show();
                //$("#btnDelete").show(); 
                //OFVFOUR-8306: [Bug Release V4.7.10] [ZEN CONTINETAL] MISSING SAVE BUTTON WHEN OPENING OEM B/L ENTRY SCREEN 
            	$("#btnSave").show();
                $("#btnSaveX").show();
            }else{
                $("#btnSave").hide();
                $("#btnSaveX").hide();
                //$("#closeModiObj").hide();
                $("#btnDelete").hide(); 
                $("#btnPrint").hide(); 
            }
 

            doBtnAuthority(attr_extension);  
        }
    
		//#3779 [CLT] v4.7.0 entry화면 new 버튼 클릭 시 tab 제목
        var pageName = "<%=LEV3_NM%>";
   </script>
<form name="frm1" method="POST" action="./SEE_BMD_0040.clt" class="filter">
	<input type="hidden" name="f_cmd_chk" id="f_cmd_chk"  value="<bean:write name="f_cmd_chk"/>"/>
    <input type="hidden" name="f_cmd" id="f_cmd" />
    <input type="hidden" name="linerBkgNoDupFlg" id="linerBkgNoDupFlg" />

    <input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" id="user_id" />

    <html:hidden name="hblVO"  property="bl_sts_cd"/>  
    <!-- #4037 [JAPT] keeping Sales PIC , Freight code. -->
    <html:hidden name="valMap"  property="bl_copy_sts"/>   
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
    <html:hidden name="valMap" property="f_intg_bl_seq"/>
    <html:hidden name="valMap" property="f_hbl_intg_bl_seq"/>

    <input type="hidden" name="mk_bl_no" value='<bean:write name="hblVO" property="bl_no"></bean:write>' id="mk_bl_no" />
    <input type="hidden" name="h_bl_no" value='<bean:write name="hblVO" property="bl_no"></bean:write>' id="h_bl_no" />
    <input type="hidden" name="file_name" id="file_name" />
    <input type="hidden" name="title" id="title" />
    <input type="hidden" name="rd_param" id="rd_param" />
    <input type="hidden" name="vgm_trdp_cd" id="vgm_trdp_cd" />

    <input type="hidden" name="mailTitle" value="" id="mailTitle" />
    <input type="hidden" name="mailTo" value="" id="mailTo" />

    <!--  Report ==> OutLook연동 파라미터 (S) -->
    <input type="hidden" name="rpt_biz_tp" value="" id="rpt_biz_tp" />
    <input type="hidden" name="rpt_biz_sub_tp" value="" id="rpt_biz_sub_tp" />
    <input type="hidden" name="rpt_tp" value="" id="rpt_tp" />
    <!--  Report ==> OutLook연동 파라미터 (E) -->
    
    <!-- GridSetting Value -->
    <input type="hidden" name="pageurl" id="pageurl" value="SEE_BMD_0040_2.clt"/>
    
    <!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd" value="" id="chk_fr_trdp_cd" />
    <input type="hidden" name="chk_fr_trdp_nm" value="" id="chk_fr_trdp_nm" />
    <input type="hidden" name="chk_fr_inv_curr_cd" value="" id="chk_fr_inv_curr_cd" />

    <input type="hidden" name="h_temp_val" value="" id="h_temp_val" />

    <!-- 조회된 Ref_no , ref 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="sel_ref_no" value="<bean:write name="hblVO" property="ref_no"></bean:write>" id="sel_ref_no" />
    <!-- 조회된 lnr_bkg_no , lnr_bkg_no 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="org_lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"></bean:write>" id="org_lnr_bkg_no" />
    <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 -->
    <input type="hidden" name="org_post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"></wrt:write>' id="org_post_dt" />
    
     <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 Block page에서 post_dt 변경후 화면에서 아래 값들을 변경 체크 위해 유지 -->     
    <input type="hidden" name="org_etd_dt_tm"  id="org_etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    <input type="hidden" name="org_eta_dt_tm"  id="org_eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>

    <!--  jsjang 20px13.8.29 #1760px4 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" value='<bean:write name="valMap" property="f_isNumSep"></bean:write>' id="f_isNumSep" />   
    
    <!-- #30284 [BINEX]OEH On-Board Date 동기화 --> 
    <input type="hidden" name="clean_on_board"  value=''> 

    <!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
    <input type="hidden" name="copy_bl_seq"     value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
    
    <!-- #52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정  --> 
    <input type="hidden" name="trx_modi_tms" value="" id="trx_modi_tms" />
    
    <!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
    <input type="hidden" name="rpt_file_name_title"/> 
    
    <input type="hidden" name="org_bkg_seq" id="org_bkg_seq" value='<bean:write name="hblVO" property="bkg_seq"/>' />   
    
    <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
    <input type="hidden" name="f_modify"   id="f_modify"   value="<bean:write name="valMap" property="f_modify"/>">
    
    <!--#1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발  -->
    <input type="hidden" name="c_bkg_seq"   id="c_bkg_seq"   value="">
    <input type="hidden" name="c_create"    id="c_create"    value=""/>
    
    <!-- #1804 [Split - 1] [PATENT] Payment Verification - 기능보완  -->
    <input type="hidden" name="verify_flag"    id="verify_flag"    value='<bean:write name="hblVO" property="verify_flag"/>' />
    <input type="hidden" name="jb_tmplt_nm" value='SEE DEFAULT'/>
    
    <!--#6669 [Zencon] OPUS UPLOADED DOCUMENT SHOWS REGARDLESS OF MODULE  -->
    <input type="hidden" name="f_palt_mnu_cd"   id="f_palt_mnu_cd"   value="OEM">
    <!--OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit  -->
    <input type="hidden" name="f_credit_flg"   id="f_credit_flg"   value="N">
   <!-- page_title_area(S) -->
    <div class="page_title_area clear ">
        <!-- page_title(S) -->
        <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
        <!-- page_title(E) -->
            
        <!-- opus_design_btn(S) -->
        <div class="opus_design_btn TOP" >
            <%-- 
            <span style="display: none;" btnAuth="FINAL"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('FINAL_MODIFY')" id="finalModiObj" name="finalModiObj"><bean:message key="Final"/></button></span>
            <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" ><bean:message key="Search"/></button></span>
            <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><button type="button" class="btn_normal" onClick="doWork('NEW')"><bean:message key="New"/></button></span>
            <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" onclick="doWork('SAVE');" name="btnSave" id="btnSave"><bean:message key="Save"/></button></span>
            <button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
            <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('CLOSE_MODIFY');" name="closeModiObj" id="closeModiObj"><bean:message key="Save"/></button></span>
            <span style="display: none;" btnAuth="COPY"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('COPY')" name="btnCopy" id="btnCopy" ><bean:message key="Copy"/></button></span>
            <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" onClick="doWork('PRINT')" name="btnPrint" id="btnPrint" ><bean:message key="Print"/></button></span>
            <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" onclick="doWork('PACKAGE_LABEL')" id="btnLabel" name="btnLabel"><bean:message key="Label"/></button></span>
            <span style="display: none;" btnAuth="LABEL2"><button type="button" class="btn_normal" onclick="doWork('PACKAGE_LABEL2')" id="btnLabel2" name="btnLabel2"><bean:message key="Label"/>2</button></span>
            <span style="display: none;" btnAuth="ACCOUNTING"><button style="display:none;" type="button" class="btn_normal" onclick="doWork('GOTOACCT')" name="btnAccounting" id="btnAccounting" ><bean:message key="Accounting"/></button></span>
            <span style="display: none;" btnAuth="P_REPORT"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('PROFIT_REPORT')" name="btnPProfit" id="btnPProfit" ><bean:message key="P_Report"/></button></span>
            <span style="display: none;" btnAuth="BOOKING_INFO"><button style="display:none;" type="button" class="btn_normal" onclick="doWork('BOOKING_INFO')" name="btnBkgInfo" id="btnBkgInfo" ><bean:message key="BOOKING_INFO"/></button></span>
            <span style="display: none;" btnAuth="SND_VGM_EDI"><button style="display:none;" type="button" class="btn_normal" onclick="doWork('SEND_VGM_EDI')" name="btnVgmEdi" id="btnVgmEdi" ><bean:message key="VGM"/> <bean:message key="EDI"/></button></span>
            <span style="display: none;" btnAuth="M_F"><button type="button" class="btn_normal" onclick="doWork('MFPRINT')" name="mfObj" id="mfObj" ><bean:message key="M_F"/></button></span>
            <span style="display: none;" btnAuth="<%= roleBtnVO.getAttr4() %>"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('REMOVE')" name="btnDelete" id="btnDelete" ><bean:message key="Delete"/></button></span>
            <span style="display: none;" btnAuth="HBL_CREATE"><button style="display: none;" type="button" class="btn_normal" onclick="doWork('HBL_ENTRY')" name="hblObj" id="hblObj" ><bean:message key="HBL_Create"/></button></span>
             <span style="display: none;" btnAuth="FILE_LABEL"><button style="display:none;" type="button" class="btn_normal" onclick="doWork('FILE_LABEL')" name="btnFileLabel" id="btnFileLabel" ><bean:message key="FILE_LABEL"/></button></span>
             --%>
        </div>
        <!-- opus_design_btn(E) --> 
            <!-- page_location(S) -->
        <div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
            <span><%=LEV1_NM%></span> &gt;
            <span><%=LEV2_NM%></span> &gt;
            <span><%=LEV3_NM%></span>
            <a href="" class="ir">URL Copy</a>
        </div>
    <!-- page_location(E) -->
</div>


<div class="over_wrap" height="100%">
<div class= "wrap_search_tab">
  <div class= "opus_design_inquiry wFit">
    <table>
        <colgroup>
            <col width="50" />
            <col width="170px" />
            <col width="70px" />
            <col width="170px" />
            <col width="110px" />
            <col width="*" />
        </colgroup>
        <tr>
            <th><bean:message key="Ref_No"/></th>
            <td>
                <input name="f_ref_no" maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" type="text" class="search_form"  dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyDown="entSearch()"><!-- 
                --><button type="button" name="btns_search1" id="btns_search1" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('REF_POPLIST_BLANK',this)"></button>
            </td>
            <th><bean:message key="MBL_No"/></th>
            <td>
                <input name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyDown="entSearch()"><!--  
                --><button type="button" name="btns_search1" id="btns_search1" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('MBL_POPLIST_BLANK',this)"></button>
            </td>
            <th><bean:message key="Liner_Bkg_No"/></th>
            <td>
                <input name="f_lnr_bkg_no"  maxlength="100" value="<bean:write name="valMap" property="f_lnr_bkg_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch()">
            </td>
        </tr>
    </table>
    </div>
</div>  
<!-- page_title_area(E) --> 
<div class="wrap_result_tab">
    <div class="opus_design_grid" style="display: none;">
        <script language="javascript">comSheetObject('sheet1');</script>
    </div>
    <ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Master_BL_Entry"/></span></a></li>
        <li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Container"/></span></a></li>
        <li id=Tab03><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Mark_Desc"/></span></a></li>
        <!-- OFVFINS-398: [HESED INTERNATIONAL] NEW CUSTOMER SETUP (AWS3) -->
        <li id=Tab04 <%=userInfo.getUse_bl_freight_tab().equals("N")?"style=\"display:none\"":"" %>><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></a></li>
        <li id=Tab05><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li>
        <li id=Tab06><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Shipping_Document"/></span></a></li>
        <li id=Tab07><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('07');"><span><bean:message key="Status"/></span></a></li>
    </ul>

         <!-- tab_player_ 1 (S) -->
        <div id="tabLayer" name="tabLayer" style="display:inline"><!--Booking&BL-->
            <div class= "opus_design_inquiry">
                <table>
                    <colgroup>
                        <col width="60">
                        <col width="180">
                        <col width="115">
                        <col width="140">
                        <col width="90">
                        <col width="150">
                        <col width="130">
                        <col width="140">
                        <col width="130">
                        <col width="140">
                        <col width="130">
                        <col width="*">
                    </colgroup>
                    <tbody>
                         <tr>
                                                <th><bean:message key="Ref_No"/></th>
                                                <td>
                                                    <input type="text" name="ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>' class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled;resize:none;width:110px;text-transform:uppercase;" onblur="strToUpper(this)" onclick="if(frm1.ref_no.value=='AUTO'){frm1.ref_no.value=''}"><!-- 
                                                    --><bean:define id="ofcList" name="valMap" property="ofcList"/><!-- 
                                                    --><html:select name="hblVO" property="ref_ofc_cd" styleClass="search_form" style="width:55px;" onchange="ofcChDEta();setBlock_dt(true);">
                                                        <html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/>
                                                    </html:select>
                                                    <input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>">
                                                </td>
                                                <th><bean:message key="Liner_Bkg_No"/></th>
                                                <td> <!-- #3543 [BINEX] OEM Entry 시 Carrier 부킹과 연결 -->
                                                    <input type="text" name="lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:100px;text-transform:uppercase;" onblur="strToUpper(this);" onchange="checkLnrBkgNo(this);" onKeyDown="fncLnrBkgSearch();" maxlength="100"><!-- 
                                                    --><button type="button" class="input_seach_btn" tabindex="-1" onClick="srOpenPopUp('LNRBKNO_POPLIST_BLANK',this)"></button> 
                                                    <input type="hidden" name="bkg_seq" value='<bean:write name="hblVO" property="bkg_seq"/>'>
                                                    <input type="hidden" name="bkg_no" value='<bean:write name="hblVO" property="bkg_no"/>'>
                                                </td>
                                                <th><bean:message key="MBL_No"/></th>
                                                <td>
                                                    <input type="text" name="bl_no" value='<bean:write name="hblVO" property="bl_no"/>' onKeyDown="setCarrierCd(this)" class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this);setCarrierCd(this);" maxlength="40">
                                                </td>
                                                <th><bean:message key="BL_Type"/></th>
                                                <td>
                                                    <bean:define id="blTypeList" name="valMap" property="blTypeList"/>
                                                    <html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:100px;" onchange="blTpChange(this.value); fnSalesChange()"> <!-- #1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L -->
                                                        <html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
                                                    </html:select>
                                                </td>
                                                <th><bean:message key="MRN"/></th>
                                                <td>
                                                    <input type="text" name="mrn_no"  value="<bean:write name="hblVO" property="mrn_no"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20">
                                                </td>
                                                <!--#1430 [PATENT] 0215_15 B/L TYPE DIVERSELY-->
                                                <%-- #1619 [CLT] Original B/L Type- 항목 정리
                                                <th><bean:message key="Release_Type"/></th>
                                                <td>
                                                    <bean:define id="RlTypeList" name="valMap" property="RlTypeList"/>
                                                    <html:select name="hblVO" property="bl_rlse_tp_cd" styleClass="search_form" style="width:100px;">
                                                        <option></option>
                                                        <html:options collection="RlTypeList" property="cd_val" labelProperty="cd_nm"/>
                                                    </html:select>
                                                </td>
                                                 --%>
                                                <th><bean:message key="Service_Contract_No"/></th>
                                                <td>
                                                    <input type="text" name="sc_no"    value='<bean:write name="hblVO" property="sc_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20" style="ime-mode:disabled;resize:none; text-transform:uppercase;" >
                                                </td>
                                                 
                                            </tr>
                                            <tr>
                                                <th><bean:message key="Post_Date"/></th>
                                                <td>
                                                    <input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:110px;text-transform:uppercase;" readonly>
                                                </td>
                                                <th><bean:message key="Sub_MBL_No"/></th>
                                                <td>
                                                    <input type="text" name="sub_bl_no" value='<bean:write name="hblVO" property="sub_bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20" style="ime-mode:disabled;resize:none; text-transform:uppercase;" >
                                                </td>
                                                <th><bean:message key="ITN_No"/></th>
                                                <td>
                                                    <input type="text" name="itn_no" value='<bean:write name="hblVO" property="itn_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:120px;" onblur="strToUpper(this)" maxlength="20" >
                                                </td>
                                                <th><bean:message key="Customer_Ref_No"/></th>
                                                <td>
                                                    <input type="text" name="cust_ref_no"  value='<bean:write name="hblVO" property="cust_ref_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:100px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20">
                                                </td>
                                                <th><bean:message key="Export_Reference_No"/></th>
                                                <td>
                                                    <input type="text" name="exp_ref_no"  value='<bean:write name="hblVO" property="exp_ref_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20">
                                                </td>
                                                <th><bean:message key="Agent_Reference_No"/></th>
                                                <td>
                                                    <input type="text" name="prnr_ref_no"  value='<bean:write name="hblVO" property="prnr_ref_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:120px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20">
                                                </td>
                                            </tr>
                        </tbody>
                    </table>
            </div>
            
            <div class="layout_wrap">
            
            <!-- layout_vertical_2 a(S) -->
                <div class="layout_vertical_3 sm"  style="height:700px;">
                     <h3 class="title_design" style="margin-bottom:0"><bean:message key="Customer"/></h3>
                        <div class="opus_design_inquiry">
                        <table>
                            <colgroup>
                                <col width="70px" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                                            <th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
                                                            <td>
                                                                <input type="text"   name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  id="shpr_trdp_nm_id"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this)" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!-- 
                                                             --><button type="button" name="shipper" id="shipper" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                                             --><input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown');fnSalesChange();<%-- #1948 --%>" onBlur="codeNameAction('trdpCode_shipper',this, 'onBlur');javascript:this.value=this.value.toUpperCase();fnSalesChange();<%-- #1948 --%>" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:48;">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <textarea name="shpr_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="true"/></textarea>
                                                            </td>
                                                        </tr>
                                                         <tr>
                                                            <th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
                                                            <td>
                                                                <input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_consignee',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:48px;"><!-- 
                                                             --><input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!-- 
                                                             --><button type="button" name="consignee" id="consignee" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <textarea name="cnee_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="true"/></textarea>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
                                                            <td>
                                                                <input type="hidden"   name="ntfy_trdp_cd" value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_notify',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:48;"><!-- 
                                                             --><input type="text" name="ntfy_trdp_nm"   value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>'   class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!-- 
                                                             --><button type="button" name="notify" id="notify" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <a href="javascript:copyValue('SAC', 'S', 'O', 'M');"><bean:message key="Same_As_Consignee"/></a>&nbsp;<!-- 
                                                             --><a href="javascript:copyValue('CNEE', 'S', 'O', 'M');"><bean:message key="Copy"/></a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <textarea name="ntfy_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="true"/></textarea>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
                                                            <td>
                                                                <input type="hidden" name="agent_trdp_cd"  value='<bean:write name="hblVO" property="agent_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_agent',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:48px;"><!-- 
                                                             --><input type="text"   name="agent_trdp_nm"  value='<bean:write name="hblVO" property="agent_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!-- 
                                                             --><button type="button" name="agent" id="agent" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="2">
                                                                <textarea name="agent_trdp_addr" maxlength="800" class="search_form autoenter_50px" dataformat="excepthan" style="ime-mode:disabled;resize:none;resize:none;width:100%;height:80px;text-transform:uppercase;overflow:hidden;font-family:TAHOMA;" onblur="strToUpper(this);chkCmpAddr(this, 'Agent Address')" WRAP="off">
<bean:write name="hblVO" property="agent_trdp_addr" filter="true"/></textarea>
                                                            </td>
                                                        </tr>
                                                        
                            </tbody>
                        </table>
                          <h3 class="title_design"><bean:message key="Contribution"/></h3>    
                        <table>
                            <colgroup>
                                <col width="137px" />
                                <col width="90px" />
                                <col width="100px" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><bean:message key="Contrib_Office"/></th>
                                     <td>
                                         <input type="text"   name="ctrb_ofc_cd" value='<bean:write name="hblVO" property="ctrb_ofc_cd"/>' class="search_form" onKeyDown="codeNameAction('officeCd_ctrbOfc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('officeCd_ctrbOfc',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                                            --><button type="button" name="ctrbOfc" id="ctrbOfc" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('OFFICE_GRID_POPLIST',this)"></button>
                                     </td>
                                    <th><bean:message key="Use_Ratio"/></th>
                                    <td>
                                        <input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);clickCtrbRatioYn();">
                                        <input type="text" name="ctrb_mgn" value="<bean:write name="hblVO" property="ctrb_mgn"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,20,2);chkComma(this,20,2);" onBlur="checkRatioValid();" maxlength="23" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;">
                                    </td>
                                </tr>
                                <tr>
                                    <th><bean:message key="Contrib_Dept"/></th>
                                    <td>
                                        <bean:define id="ctrbDeptList" name="valMap" property="ctrbDeptList"/>
                                        <html:select name="hblVO" property="ctrb_dept_cd" styleClass="search_form" style="width:100px;">
                                            <option value=""></option>
                                            <html:options collection="ctrbDeptList" property="cd_val" labelProperty="cd_nm"/>
                                        </html:select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                 </div>
                <!-- layout_vertical_2 a(E) -->
                <!-- layout_vertical_2 b(S) -->
                <div class="layout_vertical_3  sm mar_left_8" style="height:700px">
                    <div class="opus_design_inquiry" >
                        <table>
                            <colgroup>
                                <col width="115px" />
                                <col width="100px" />
                                <col width="50px" />
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th><a href="javascript:clearBlPrnr('S02');"><bean:message key="Customer"/></a></th>
                                    <td colspan="3"><input type="text" name="act_shpr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="act_shpr_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_ashipper',this, 'onKeyDown', 'S', 'O', 'M');checkTrdpCode(this);" onBlur="strToUpper(this);codeNameAction('trdpCode_ashipper',this, 'onBlur', 'S', 'O', 'M');checkTrdpCode(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!--
                                        --><button type="button" name="ashipper" id="ashipper" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!--
                                        --><input type="text" name="act_shpr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="act_shpr_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('ashipper'), frm1.act_shpr_trdp_nm.value);}"></td>
                                </tr>
                                <tr style="display:none">
                                    <td colspan="2"><textarea name="act_shp_info" class="search_form autoenter_50px" onblur="strToUpper(this);chkCmpAddr(this, 'Actual Shipper')" dataformat="excepthan" style="width:260px;height:60px;" WRAP="off">
<bean:write name="hblVO" property="act_shp_info" filter="true"/></textarea></td>
                                </tr>
                                <tr>
                                    <th><a href="javascript:clearBlPrnr('P03');"><bean:message key="Triangle_Agent"/></a></th>
                                    <td colspan="3">
                                           <input type="text" name="prnr_trdp_cd2" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown','S','O','M')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur','S','O','M')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="partner2" id="partner2" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}">
                                        <input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'>                                                        
                                    </td>
                                </tr>
                                <tr>
                                    <th><a href="javascript:clearBlPrnr('P01');"><bean:message key="Destination_Agent"/></a></th>
                                    <td colspan="3">
                                           <input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="if(this.readOnly==true){return};codeNameAction('trdpCode_partner',this, 'onKeyDown');fnSalesChange();<%-- #1948 --%>" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur');fnSalesChange();<%-- #1948 --%>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="partner" id="partner" class="input_seach_btn" tabindex="-1" onClick="if(frm1.prnr_trdp_cd.readOnly==true){return};openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="text"   name="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(this.readOnly==true){return};if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}">
                                            <input type="hidden" name="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'>                                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3"><h3 class="title_design mar_top_8" style="margin-bottom:0"><bean:message key="Vessel"/></h3>    </td>
                                </tr>
                                <tr>
                                    <th><bean:message key="Liner"/></th>
                                    <td colspan="3">
                                        <input type="text"   name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_sea_liner',this, 'onKeyDown');" onblur="strToUpper(this);codeNameAction('trdpCode_sea_liner',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="liner" id="liner" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST_MS',this)"></button><!-- 
                                        --><input type="text"   name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST_MS', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
                                    </td>
                                </tr>
                                <tr>
                                     <th><bean:message key="VSL_VOY"/></th>
                                     <td colspan="3">
                                     
                                         <input type="hidden" name="trnk_vsl_cd" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;">
                                         
                                         <!-- BLUE PRINT #521 [BNX JAPAN] OEM, Clean_on_board 수정 - cobChange() 추가-->
                                         <input type="text"   name="trnk_vsl_nm" value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:104px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}" onChange="cobChange();"><!-- 
                                        --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('VESSEL_POPLIST',this)"></button><!-- BLUE PRINT #521 [BNX JAPAN] OEM, Clean_on_board 수정 - cobChange() 추가--><!-- 
                                        --><input type="text"   name="trnk_voy"    value='<bean:write name="hblVO" property="trnk_voy"/>'    class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:128px;text-transform:uppercase;" maxlength="15" onblur="strToUpper(this)" onChange="cobChange();">
                                     </td>
                                 </tr>
                                 <tr>
                                       <th><bean:message key="ETD"/></th>
                                       <td>
                                       
                                           <!-- #30284 [BINEX]OEH On-Board Date 동기화 : cobChange()추가 -->
                                           <input required name="etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1);cobChange();" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETD');chgOnboard(this);" size='11' maxlength="10" class="search_form"><!-- 
                                        --><button required  type="button" class="calendar" tabindex="-1" name="etd_dt_tm_cal" id="etd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.etd_dt_tm);" ></button>
                                       </td>
                                       <th><bean:message key="ETA"/></th>
                                       <td>
                                           <input name="eta_dt_tm" id="eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETA');" size='11' maxlength="10" class="search_form"><!-- 
                                        --><button type="button" class="calendar" tabindex="-1" name="eta_dt_tm_cal" id="eta_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.eta_dt_tm);" ></button>
                                       </td>
                                   </tr>
                                    <tr>
                                    <th><bean:message key="On_Board"/></th>
                                    <td colspan="3"><input name="obrd_dt_tm" id="obrd_dt_tm" value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Onboard');cobChange();" dataformat="excepthan" style="ime-mode:disabled;width:75px;" maxlength="10"><!-- 
                                         --><button type="button" class="calendar" tabindex="-1" name="obrd_dt_tm_cal" id="obrd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.obrd_dt_tm);" ></button></td>
                                </tr>
                                   
                                   <tr>
                                       <th><bean:message key="ETD_Of_POR"/></th>
                                       <td colspan="3">
                                           <input name="etd_por_tm" id="etd_por_tm" value='<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETD of POR');" size='11' maxlength="10" class="search_form"><!-- 
                                        --><button type="button" class="calendar" tabindex="-1" name="etd_por_tm_cal" id="etd_por_tm_cal"  onclick="doDisplay('DATE1',frm1.etd_por_tm);" ></button>
                                       </td>
                                    </tr>
                                    <tr>
                                        <th><bean:message key="Billing_Carrier"/></th>
                                        <td  colspan="3">
                                            <input type="text"   name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown');"  onblur="strToUpper(this); codeNameAction('trdpCode_carr',this, 'onKeyDown');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" maxlength="20" onKeyPress="ComKeyOnlyAlphabet('uppernum');"><!-- 
                                        --><button type="button" name="carr" id="carr" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'><!-- 
                                        --><input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}" maxlength="50">
                                            </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                    <h3 class="title_design mar_top_8" style="margin-bottom:0"><bean:message key="Route"/></h3>
                                    </td>
                                </tr>
                                <tr>
                               	<td colspan="3"></td>
                                 <td colspan="2"><button type="button" class="btn_etc" name="btn_msnbonded" id="btn_msnbonded" onClick="doWork('TRANSSHIPPED')"><bean:message key="Transshipped"/></button>
                                    <!--
                                --><input type="hidden" name="pre_vsl_cd"  value='<bean:write name="hblVO" property="pre_vsl_cd"/>' ><!--
                                --><input type="hidden" name="pre_vsl_nm"  value='<bean:write name="hblVO" property="pre_vsl_nm"/>' ><!--
                                --><input type="hidden" name="pre_voy"  value='<bean:write name="hblVO" property="pre_voy"/>' ><!--
                                --><input type="hidden" name="ts1_port_cd"  value='<bean:write name="hblVO" property="ts1_port_cd" />' ><!--
                                --><input type="hidden" name="ts1_port_nm"  value='<bean:write name="hblVO" property="ts1_port_nm"/>' ><!--
                                --><input type="hidden"  name="ts1_etd_dt_tm" value='<wrt:write name="hblVO" property="ts1_etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'  ><!--
                                --><input type="hidden"  name="ts1_eta_dt_tm" value='<wrt:write name="hblVO" property="ts1_eta_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'   ><!-- 
                                --><input type="hidden" name="org_tp"  value='<bean:write name="hblVO" property="org_tp"/>' ><!--
                                --><input type="hidden" name="org_cd"  value='<bean:write name="hblVO" property="org_cd"/>' >
                                    </td>
                                </tr>
                                <tr> 
                                       <th><bean:message key="POR"/></th>
                                       <td colspan="3">
                                           <input type="text" name="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_por',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;disabled;width:75px;"><!-- 
                                         --><button type="button" name="por" id="por" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this,'','S')"></button><!-- 
                                         --><html:hidden name="hblVO" property="por_nod_cd"/><!-- 
                                         --><input type="text" name="por_nm" value='<bean:write name="hblVO" property="por_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}" maxlength="50">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th><bean:message key="POL"/></th>
                                       <td colspan="3">
                                           <input required  type="text" name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S','','','Y');" onBlur="codeNameAction('Location_pol',this, 'onBlur','S','','','Y');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" ><!-- 
                                        --><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this,'','Y')"></button><!-- 
                                        --><html:hidden name="hblVO" property="pol_nod_cd"/><!-- BLUE PRINT #521 [BNX JAPAN] OEM, Clean_on_board 수정 - cobChange() 추가--><!-- 
                                        --><input required  type="text" name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}" onChange="cobChange();">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th><bean:message key="POD"/></th>
                                       <td colspan="3">
                                           <input required  type="text" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_pod',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="pod_nod_cd"/><!-- 
                                        --><input required  type="text" name="pod_nm" maxlength="50" value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th><bean:message key="DEL"/></th>
                                       <td colspan="3">
                                           <input type="text" name="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_del',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="del" id="del" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="del_nod_cd"/><!-- 
                                        --><input type="text" name="del_nm" maxlength="50" value='<bean:write name="hblVO" property="del_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th><bean:message key="Final_Destination"/></th>
                                       <td colspan="3">
                                           <input name="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_dest',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!-- 
                                        --><button type="button" name="dest" id="dest" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="fnl_dest_nod_cd"/><!-- 
                                        --><input type="text" name="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('dest'), frm1.fnl_dest_loc_nm.value);}">
                                       </td>
                                   </tr>
                                    <tr>
                                       <th><bean:message key="Pier"/></th>
                                       <td colspan="3">
                                           <input name="rcv_wh_cd" value='<bean:write name="hblVO" property="rcv_wh_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_rcv',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_rcv',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onblur="strToUpper(this);"><!-- 
                                        --><button type="button" name="rcv" id="rcv" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="fnl_dest_nod_cd"/><!-- 
                                        --><input type="text" name="rcv_wh_nm" value='<bean:write name="hblVO" property="rcv_wh_nm"/>' class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('rcv'), frm1.rcv_wh_nm.value);}" maxlength="50">
                                       </td>
                                   </tr>
                                   <tr>
                                       <th><bean:message key="Container_Summary"/></th>
                                       <td colspan="3">
                                           <input type="text" name="cntr_info" value='<bean:write name="hblVO" property="cntr_info"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:265px;" maxlength="50" readOnly>
                                       </td>
                                   </tr>
                                   <tr>
                                       <th><bean:message key="Empty_Pickup"/></th>
                                       <td colspan="3">
                                            <input name="pu_trdp_cd" value='<bean:write name="hblVO" property="pu_trdp_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_pu',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_pu',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onblur="strToUpper(this);"><!-- 
                                        --><button type="button" name="pu" id="pu" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="text" name="pu_trdp_nm" value='<bean:write name="hblVO" property="pu_trdp_nm"/>' class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('pu'), frm1.pu_trdp_nm.value);}" maxlength="50">
                                       </td>
                                   </tr>   
                                                                   
                                    <tr style="display:none"> <!-- #3376 [JTC] Japan Trust  Lane 삭제 -->
                                        <th><bean:message key="Lane"/></th>
                                        <td colspan="3"><input type="text" name="svc_lane_nm" id="svc_lane_nm" maxlength="50" value="<bean:write name="hblVO" property="svc_lane_nm"/>" class="search_form" onKeyDown="" onblur="strToUpper(this)" style="ime-mode:disabled; text-transform:uppercase;width:265px;">
                                        </td>
                                    </tr> 
                                    <tr>
                                    	<th>Country of Origin</th>
                                    	<td colspan="3">
                                    	<input type="radio" name="ib_org_type" id="ib_org_type1" value="C" onClick="javascript:document.getElementById('ib_org_ste').style.display='none';document.getElementById('ib_org_cnt').style.display='';document.frm1.ib_org_ste_cd.value='';document.frm1.ib_org_ste_nm.value='';" checked><label for="ib_org_type1"><bean:message key="Country"/></label><!--
										 --><input type="radio" name="ib_org_type" id="ib_org_type2" value="S" onClick="javascript:document.getElementById('ib_org_cnt').style.display='none';document.getElementById('ib_org_ste').style.display='';document.frm1.ib_org_cnt_cd.value='';document.frm1.ib_org_cnt_nm.value='';"><label for="ib_org_type2"><bean:message key="State"/></label>
                                    	</td>
                                    </tr>    
                                    <tr id="ib_org_cnt">
                                    	<th/>
                                    	<td colspan="3">
											<input name="ib_org_cnt_cd" type="text" class="search_form" onKeyDown="codeNameAction2('org_country',this, 'onKeyDown')" onBlur="codeNameAction2('org_country',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onblur="strToUpper(this);"><!-- 
                                         --><button type="button" name="ibc" id="ibc" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('COUNTRY_POPLIST',this);"></button><!-- 
                                         --><input type="text" name="ib_org_cnt_nm" value='' readonly class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('pu'), frm1.pu_trdp_nm.value);}" maxlength="50">
                                    	</td>
                                    </tr>     
                                    <tr id="ib_org_ste" style="display:none;">
                                    	<th/>
                                    	<td colspan="3">
                                    		<input name="ib_org_ste_cd" type="text" class="search_form" onKeyDown="codeNameAction2('org_state',this, 'onKeyDown')" onBlur="codeNameAction2('org_state',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;" onblur="strToUpper(this);"><!-- 
                                         --><button type="button" name="ibc" id="ibc" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('STATE_POPLIST',this);"></button><!-- 
                                         --><input type="text" name="ib_org_ste_nm" value='' readonly class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;width:157px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('pu'), frm1.pu_trdp_nm.value);}" maxlength="50"><!--
                                         --><input name="state_cd" type="hidden""><input name="state_nm" type="hidden""><input name="state_cnt_cd" type="hidden"">
                                    	</td>
                                    </tr>                        
                            </tbody>
                        </table>
                    </div>
                 </div>  
                <!-- layout_vertical_2 b(E) -->
                <!-- layout_vertical_2 c(S) -->
                <div class="layout_vertical_3  mar_left_8 sm"  style="height:700px; width:calc(34% - 16px)">
                         <h3 class="title_design" style="margin-bottom:0"><bean:message key="Shippment_and_Item"/></h3>
                        <div class="opus_design_inquiry" >	
                        <table>
                            <colgroup>
                                <col width="110" />
                                <col width="90" />
                                <col width="60"/>
                                <col width="*" />
                            </colgroup>
                            <tbody>
                                                                    <!-- #1279 [UFF] Add Commodity field to OEM BL Entry -->
                                                                    <tr>
                                                                        <th><bean:message key="Commodity"/></th>
                                                                        <td colspan="3">
                                                                            <input type="text" name="rep_cmdt_cd" maxlength="13" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                                                                            --><button type="button" name="commodity" id="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button><!--
                                                                            --><input type="text" name="rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="100" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:157px;" onBlur="strToUpper(this);" onchange="textAdd(frm1.desc_txt, '', this.value, frm1.h_rep_cmdt_nm);" onKeyPress="if(event.keyCode==13){openPopUp('COMMODITY_POPLIST', this);}"><!--
                                                                            --><input type="hidden" name="h_rep_cmdt_nm" maxlength="50" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px;">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Freight"/></th>
                                                                        <td colspan="3">
                                                                            <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                                                            <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:80px;">
                                                                                <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select><!-- 
                                                                            --><input type="hidden" name="h_frt_term_cd" value="<bean:write name="hblVO" property="frt_term_cd"/>">
                                                                        </td>
                                                                     </tr>
                                                                     <tr>                                               
                                                                        <th><bean:message key="Ship_Mode"/></th>
                                                                        <td>
                                                                            <bean:define id="shipModeList" name="valMap" property="shipModeList"/>
                                                                            <html:select name="hblVO"  property="shp_mod_cd"  styleClass="search_form" style="background-color:#d4f6ff;;width:80px;" onchange="shipModeChangeDef(this);">
                                                                                <html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                        </td>
                                                                        <th><bean:message key="Sales_Type"/></th>
                                                                        <td><bean:define id="slsList" name="valMap" property="slsCdList"/>
                                                                            <html:select name="hblVO" property="nomi_flg" style="width:105px;" styleClass="input1" onchange="fnSalesChange()"> <!-- #1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L -->
                                                                                <html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="SVC_Term"/></th>
                                                                        <td colspan="3">
                                                                            <bean:define id="serviceList" name="valMap" property="serviceList"/>
                                                                            <html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form" style="width:80px;" onchange="svcTermChange();">
                                                                                <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select><span class="dash">~</span>
                                                                            <html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form" style="width:80px;">
                                                                                <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Tariff_Currency_Code"/></th>
                                                                        <td>
                                                                            <bean:define id="currCdList" name="valMap" property="currCdList"/>
                                                                            <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:80px;">
                                                                                <html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                            <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>">
                                                                        </td>
                                                                        <th><bean:message key="OBL_Type"/></th>
                                                                        <td>
                                                                            <bean:define id="oblCdList" name="valMap" property="oblCdList"/>
                                                                            <html:select name="hblVO" property="obl_tp_cd" styleClass="search_form" style="width:80px;">
                                                                                <html:options collection="oblCdList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                            <input type="hidden" name="h_obl_tp_cd" value="<bean:write name="hblVO" property="obl_tp_cd"/>">
                                                                        </td>
                                                                    <tr>  
                                                                    <tr>
                                                                        <th><bean:message key="Brokerage_Rate"/></th>
                                                                        <td>
                                                                            <input type="text" name="broker_rt" maxlength="5" value="<bean:write name="hblVO" property="broker_rt"/>" class="search_form zero_remove" onKeyPress="ComKeyOnlyNumber(this)" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"><!-- 
                                                                          --><input type="text" value="%" class="search_form" style="width:20px;border:0;background-color:transparent;" tabindex="7">
                                                                        </td>
                                                                        <th><bean:message key="Profit_Share"/></th>
                                                                        <td>
                                                                            <input type="text" name="profit_share" maxlength="5" value="<bean:write name="hblVO" property="profit_share"/>" class="search_form zero_remove" onKeyPress="onlyNumberCheck('.')" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"><!-- 
                                                                          --><input type="text" value="%" class="search_form" style="width:20px;border:0;background-color:transparent;" tabindex="8">
                                                                        </td>
                                                                    </tr>                                                                                                                                       
                                                                    <!-- #739   [Epsylog] Implement Requirement -->
                                                                    <tr>
                                                                        <th><bean:message key="Port_Open_Date"/></th>                                                                       
                                                                        <td>
                                                                            <input type="text" name="port_open_dt" id="port_open_dt" maxlength="10" value='<wrt:write name="hblVO" property="port_open_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Open Date');"><!-- 
                                                                        --><button type="button" class="calendar" tabindex="-1" name="port_open_dt_cal" id="port_open_dt_cal"  onclick="doDisplay('DATE1' ,frm1.port_open_dt);" ></button>
                                                                        </td>           
                                                                        <th><bean:message key="Time"/></th>
                                                                        <td>
                                                                            <input type="text" name="port_open_tm" value='<wrt:write name="hblVO" property="port_open_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Port_Cut_Off_Date"/></th>                                                                        
                                                                        <td>
                                                                            <input type="text" name="cut_off_dt" id="cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Cut-Off Date');"><!-- 
                                                                        --><button type="button" class="calendar" tabindex="-1" name="cut_off_dt_cal" id="cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.cut_off_dt);" ></button>
                                                                        </td>           
                                                                        <th><bean:message key="Time"/></th>
                                                                        <td>
                                                                            <input type="text" name="cut_off_tm" value='<wrt:write name="hblVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Rail_Cut_Off_Date"/></th>
                                                                        <td>
                                                                            <input type="text" name="rail_cut_off_dt" id="rail_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Rail Cut-Off Date');"><!-- 
                                                                             --><button type="button" class="calendar" tabindex="-1" name="rail_cut_off_dt_cal" id="rail_cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.rail_cut_off_dt);" ></button>
                                                                        </td>
                                                                        <th ><bean:message key="Time"/></th>
                                                                        <td>
                                                                            <input type="text" name="rail_cut_off_tm" value='<wrt:write name="hblVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                    <!-- #21014 : [GPL] OE House B/L Entry - Modify Requests, jsjang 20px13.10.10 -->
                                                                    <tr>
                                                                        <th><bean:message key="DOC_Cut_Off_Date"/></th>
                                                                        <td>
                                                                            <input type="text" name="doc_cut_off_dt" id="doc_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'DOC Cut-Off Date');"><!-- 
                                                                             --><button type="button" class="calendar" tabindex="-1" name="doc_cut_off_dt_cal" id="doc_cut_off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.doc_cut_off_dt);" ></button>
                                                                        </td>
                                                                        <th><bean:message key="Time"/></th>
                                                                        <td>
                                                                            <input type="text" name="doc_cut_off_tm" value='<wrt:write name="hblVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
                                                                        </td>
                                                                    </tr>
                                                                    
                                                                    <!-- #739   [Epsylog] Implement Requirement -->
                                                                    <tr>
                                                                        <th><bean:message key="VGM_Cut_Off_Date"/></th>                                                                     
                                                                        <td>
                                                                            <input type="text" name="vgm_cut_off_dt" id="vgm_cut_off_dt" maxlength="10" value='<wrt:write name="hblVO" property="vgm_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'VGM Cut-Off Date');"><!-- 
                                                                        --><button type="button" class="calendar" tabindex="-1" name="vgm_Cut_Off_dt_cal" id="vgm_Cut_Off_dt_cal"  onclick="doDisplay('DATE1' ,frm1.vgm_cut_off_dt);" ></button>
                                                                        </td>           
                                                                        <th><bean:message key="Time"/></th>
                                                                        <td>
                                                                            <input type="text" name="vgm_cut_off_tm" value='<wrt:write name="hblVO" property="vgm_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
                                                                        </td>
                                                                    </tr>                                                                   
                                                                    <tr>
                                                                       <th><bean:message key="Pickup"/>&nbsp;<bean:message key="Date"/></th>
                                                                       <td>
                                                                           <input name="pu_trdp_dt" id="pu_trdp_dt" type="text" value='<wrt:write name="hblVO" property="pu_trdp_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'PickUp Date');" size='11' maxlength="10" class="search_form"><!-- 
                                                                        --><button type="button" class="calendar" tabindex="-1" name="pu_trdp_dt_cal" id="pu_trdp_dt_cal"  onclick="doDisplay('DATE1',frm1.pu_trdp_dt);" ></button>                                        
                                                                       </td>
                                                                       <th><bean:message key="Time"/></th>
                                                                        <td>
                                                                            <input type="text" name="pu_trdp_tm" maxlength="4" value='<wrt:write name="hblVO" property="pu_trdp_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
                                                                        </td>
                                                                   </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Released"/></th>
                                                                        <td>
                                                                            <input type="checkBox" name="rlsd_flg" id="rlsd_flg" value="<bean:write name="hblVO" property="rlsd_flg"/>" onclick="flgChange(this);setToday(this);">
                                                                        </td>
                                                                        <th><bean:message key="Released_Date"/></th>
                                                                        <td><input type="text" name="rlsd_dt_tm" id="rlsd_dt_tm" value="<wrt:write name="hblVO" property="rlsd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Released Date');" dataformat="excepthan" style="ime-mode:disabled;width:75px;" size='11' maxlength="10"><!-- 
                                                                        --><button type="button" class="calendar" tabindex="-1" name="rlsd_dt_tm_cal" id="rlsd_dt_tm_cal"  onclick="doDisplay('DATE1' ,frm1.rlsd_dt_tm);" ></button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (S) (2017.07.04) -->
                                                                        <th><bean:message key="Internal"/></th>
                                                                        <td>
                                                                            <input type="checkBox" name="inter_use_flag" id="inter_use_flag" value="<bean:write name="hblVO" property="inter_use_flag"/>" onclick="flgChange(this);">
                                                                        </td>
                                                                        <!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (E) (2017.07.04) -->                                                                    
                                                                        <th><bean:message key="Released_by"/></th>
                                                                        <td>
                                                                            <input type="text"   name="rlsd_usrid" maxlength="12" value="<bean:write name="hblVO" property="rlsd_usrid"/>"  class="search_form-disable" style="width:75px;"><!-- 
                                                                                --><button type="button" name="rlsd_by" id="rlsd_by" class="input_seach_btn" tabindex="-1" onClick="openSeiPopUp('USER_POPLIST',this)"></button>
                                                                            <input type="hidden" name="rlsd_usr_nm" value="<bean:write name="hblVO" property="rlsd_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly>
                                                                            <input type="hidden" name="rlsd_dept_cd" value="<bean:write name="hblVO" property="rlsd_dept_cd"/>">
                                                                        </td>

                                                                    </tr>
                                                                    
                                                                    <tr>
                                                                        <th><bean:message key="Package"/></th>
                                                                        <td colspan="3">
                                                                            <input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" onblur="setPacQty();" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right"><!-- 
                                                                             --><bean:define id="pckList" name="valMap" property="pckCdList"/><!-- 
                                                                             --><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:133px;" onchange="setPacQty();">
                                                                                <option></option>
                                                                                <html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
                                                                            </html:select> 
                                                                        </td>
                                                                    </tr>                                                                   
                                                                    <tr>
                                                                        <th><bean:message key="GWeight"/></th>
                                                                        <td colspan="3">
                                                                            <input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
                                                                        --><input type="text" name="grs_wgt_ut_cd" value="KG" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
                                                                        --><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
                                                                        --><input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="2">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Measurement"/></th>
                                                                        <td colspan="3">
                                                                            <input type="text" name="meas" value="<bean:write name="hblVO" property="meas"/>" onKeyPress="onlyNumberCheck('.')" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--  
                                                                        --><input type="text" name="meas_ut_cd" value="CBM" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
                                                                        --><input type="text" name="meas1" value="<bean:write name="hblVO" property="meas1"/>" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);cbmChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--  
                                                                        --><input type="text" name="meas_ut_cd1" value="CFT" style="width:50px;border:0;background-color:transparent;" readOnly tabindex="6">
                                                                           <button type="button" class="btn_etc" onclick="sumHblValue();"><bean:message key="Sum"/></button>
                                                                        </td>
                                                                    </tr>
                                                                    <!-- tr>
                                                                        <td colspan="4">
                                                                            <button type="button" class="btn_etc" onclick="sumHblValue();"><bean:message key="Sum"/></button>
                                                                        </td>
                                                                    </tr-->
                                                                    <tr>
                                                                        <td colspan="4"> <h3 class="title_design mar_top_8" style="margin-bottom:0"><bean:message key="Management"/></h3>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Booked_By"/></th>
                                                                        <td>
                                                                            <input type="text" name="bk_usrid" value="<bean:write name="hblVO" property="bk_usrid"/>" class="search_form-disable" tabindex="-1" readOnly style="width:70px;"><!-- 
                                                                             -->  
                                                                        </td>
                                                                    
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Issue_Date"/></th>
                                                                        <td>
                                                                            <input type="text" name="bl_iss_dt" id="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:80px;" size='11' maxlength="10"><!-- 
                                                                        --><button type="button" class="calendar" tabindex="-1" name="bl_iss_dt_cal" id="bl_iss_dt_cal"  onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);" ></button>
                                                                        </td>                                                                    
                                                                        <th><bean:message key="Issued_By"/></th>
                                                                        <td>
                                                                            <input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" tabindex="-1" readOnly style="width:80px;"><!-- 
                                                                        --><button type="button" name="oprBtn" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('OPR_POPLIST',this)"></button>
                                                                            <input type="hidden" name="proc_usrnm" value="<bean:write name="hblVO" property="proc_usrnm"/>" class="search_form-disable" readOnly style="width:120px;">
                                                                            <input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>">
                                                                            <input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>">
                                                                            <input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>">
                                                                        </td>
                                                                    </tr>
                                                                    <!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
                                                                    <tr>
                                                                        <th><bean:message key="Team_cd"/></th>
                                                                        <td>
                                                                            <input type="text" name="team_cd" readOnly style="width:110px;">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th><bean:message key="Sales_OFC"/></th>
                                                                        <td>
                                                                            <input type="text" name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:80px;" readonly><!-- 
                                                                        --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('OFFICE_GRID_POPLIST',this)"></button>
                                                                        </td>
                                                                        <th><bean:message key="Sales_PIC"/></th>
                                                                        <td>
                                                                            <input type="text"   name="sls_usrid"  value='<bean:write name="hblVO" property="sls_usrid"/>'  class="search_form-disable" style="width:80px;" readOnly><!-- 
                                                                        --><button id="salesperson" name="salesperson" type="button" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('USER_POPLIST',this)"></button><!-- 
                                                                        --><input type="hidden" name="sls_usr_nm" value='<bean:write name="hblVO" property="sls_usr_nm"/>' class="search_form-disable" style="width:120px;" readOnly><!-- 
                                                                        --><input type="hidden" name="sls_dept_cd" value='<bean:write name="hblVO" property="sls_dept_cd"/>'>
                                                                        </td>
                                                                     </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                <h3 class="title_design"><bean:message key="House_BL_List"/></h3>
                <div class="opus_design_grid">
                    <script type="text/javascript">comSheetObject('sheet2');
                    /* 속도개선  */
                    comConfigSheet(docObjects[1], SYSTEM_FIS);
                    initSheet(docObjects[1], (1+1) );
                    comEndConfigSheet(docObjects[1]);                       
                    </script>
                </div>
                        
        </div>
        <!-- tab_player_1 (E) -->
        
        <!-- tab_player_2 (S) -->
        <div id="tabLayer" name="tabLayer" style="display:none"><!--Container-->
            <!-- <div class="opus_design_grid"> -->
            <ul id = "ulInnerTab" class="opus_design_tab">
                <li id=innerTab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goInnerTabSelect('01');"><span><bean:message key="Container_List"/></span></a></li>
                <li id=innerTab02><a href="#" style="cursor:hand;" onClick="javascript:goInnerTabSelect('02');"><span><bean:message key="VGM_Container_List"/></span></a></li>
            </ul>
            
            <div id="innerTabLayer" name="innerTabLayer">
                <div class="wrap_result">
                	<div class="opus_design_inquiry">
	                	<div class="opus_design_grid">
	           				<h3 class="title_design pad_btm_4"><bean:message key="Container_List"/></h3>
		                	<div class="opus_design_btn">
		                  		<table>
			                       <tr>
			                           <td style="width:50px"><button type="button" class="btn_normal" name="cnrtAdd" id="cnrtAdd" onClick="sheet4_onAddRow();"><bean:message key="Add"/></button></td>  
			                           <td style="width:60px"><input type="text" style="width:40px;text-align:right;" name="copy_cnt" value="1" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0);" maxlength="3" ></td>
			                           <td style="width:50px"><button type="button" class="btn_normal" name="cnrtAdd" id="cnrtAdd" onClick="cntrGridCopy(docObjects[2]);"><bean:message key="Copy"/></button></td>
			                           <th style="width:45px">|</th>
			                           <th style="width:66px"><bean:message key="Type_Size"/></th>
			                           <td style="width:70px">
			                               <select name="add_cntr_tpsz_cd" style="width:55px;" class="search_form">
			                                   <option value=""></option>
			                                       <logic:iterate id="codeVO" name="tpszList">
			                                               <option value="<bean:write name="codeVO" property="cntr_tpsz_cd"/>"><bean:write name="codeVO" property="cntr_tpsz_cd"/></option>
			                                       </logic:iterate>
			                               </select>
			                            </td>
			                            <td style="width:60px"><b><bean:message key="Q_ty"/></b></td>
			                            <td style="width:50px">
			                            <input type="text" name="cntr_q_ty" value="0" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" onblur="if(frm1.cntr_q_ty.value==''){frm1.cntr_q_ty.value='0'}" maxlength="7" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;text-align:right;">
			                            </td>
			                            <td><button type="button" class="btn_normal" name="qtyAdd" id="qtyAdd" onClick="cntrQtyGridAdd(docObjects[2]);cntrInfoSet(docObjects[2]);"><bean:message key="Q_ty_Add"/></button></td>
			                       </tr>
			                    </table>
		                    </div>		
		                  	<script type="text/javascript">comSheetObject('sheet4');</script>
						</div>
					</div>
				</div>
				<div class="wrap_result">
            		<div class="opus_design_inquiry">
            			<h3 class="title_design pad_btm_4"><bean:message key="Item"/></h3>
            		</div>
	                <div class="opus_design_grid">
	                    <div class="opus_design_btn">
	                        <button type="button" class="btn_accent" name="loadPO" id="loadPO"  onClick="cmdtLoadPO(); " style="cursor:hand;display:none;"><bean:message key="Load_PO"/></button>
	                        <button type="button" class="btn_accent" name="itmAdd" id="itmAdd"  onClick="cmdtRowAdd(); " style="cursor:hand;display:none;"><bean:message key="Add"/></button>
	                    </div>
	                    <script type="text/javascript">comSheetObject('sheet14');</script>
	                </div>
                </div>
            </div>

            <div id="innerTabLayer" name="innerTabLayer" style="display:none">
            	<div class="wrap_result"></div>
            	<div class="wrap_result">
            		<div class="opus_design_inquiry">
            			<h3 class="title_design pad_btm_4"><bean:message key="VGM_Container_List"/></h3>
            		</div>
	               	<div class="opus_design_grid">
						<script type="text/javascript">comSheetObject('sheet13');</script>
					</div>
				</div>
           </div>
        </div>
        <!-- tab_player_2 (E) -->
        
        
        <!-- tab_player_3 (S) -->
        <div id="tabLayer" name="tabLayer" style="display:none"><!--Mark Description-->
            <div class= "opus_design_inquiry sm">
                <div class= "opus_design_inquiry sm">
                    <table>
                        <colgroup>
                            <col width="684px" />
                            <col width="200px" />
                            <col width="*" />
                        </colgroup>
                        <tr>
                            <td><h3 class="title_design"><bean:message key="Said"/></h3></td>
                            <td  class="opus_design_btn">
                                <button type="button" class="btn_etc" name="sadAuto" id="sadAuto" onclick="mkSaidTxt(docObjects[2], frm1.sad_txt);" ><bean:message key="Auto"/></button>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="4">
                                <textarea name="sad_txt" rows="2" maxlength="200" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:877px;" onkeyup="keyUp_maxLength(this);">
<bean:write name="hblVO" property="sad_txt" filter="true"/></textarea>
                            </td>
                        </tr>
                    </table>
                    <table>
                        <colgroup>
                            <col width="90px" />
                            <col width="180px" />
                            <col width="90px" />
                            <col width="120px" />
                            <col width="140px" />
                            <col width="*" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <td colspan="6"><h3 class="title_design pad_btm_8" style="margin-top:20px;"><bean:message key="BL_DISPLAY_WEIGHT"/></h3></td>
                            </tr>
                            <tr>
                            <!-- #2287 [Webtrans] Cannot print OEH BL on Google Chrome -->
                            <!-- #2889 [Zimex, JC Freight] after v450, Decimal handling on weight -->
                                <th><bean:message key="GWeight"/></th>
                                <td>
                                    <input type="text" name="mk_grs_wgt" value='<bean:write name="hblVO" property="mk_grs_wgt"/>' onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);weightChange(this);" maxlength="11" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--  
                                --><input type="text" name="mk_grs_wgt_ut_cd" value="KG" style="width:21px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
                                --><input type="text" name="mk_grs_wgt1" value='<bean:write name="hblVO" property="mk_grs_wgt1"/>' onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);weightChange(this);" maxlength="11" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!--  
                                --><input type="text" name="mk_grs_wgt_ut_cd1" value="LB" style="width:20px;border:0;background-color:transparent;" readOnly tabindex="2">
                                </td>
                                <th><bean:message key="Measurement"/></th>
                                <td>
                                    <input type="text" name="mk_meas" value='<bean:write name="hblVO" property="mk_meas"/>' onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);cbmChange(this);" maxlength="11" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:79px;text-align:right;"><!--  
                                --><input type="text" name="mk_meas_ut_cd" value="CBM" style="width:32px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
                                --><input type="text" name="mk_meas1" value='<bean:write name="hblVO" property="mk_meas1"/>' onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,obl_decimal_len);chkComma(this,8,obl_decimal_len);cbmChange(this);" maxlength="11" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:79px;text-align:right;"><!--  
                                --><input type="text" name="mk_meas_ut_cd1" value="CFT" style="width:32px;border:0;background-color:transparent;" readOnly tabindex="6">
                                </td>
                                <th><bean:message key="Show_Weight_on_BL_as"/></th>
                                <td>
                                    <bean:define id="wgtDispCdList" name="valMap" property="wgtDispCdList"/>
                                    <html:select name="hblVO" property="wgt_disp_cd" styleClass="search_form" style="width:96px;">
                                        <html:options collection="wgtDispCdList" property="cd_val" labelProperty="cd_nm"/>
                                    </html:select>
                                    <input type="hidden" name="h_wgt_disp_cd" id="h_wgt_disp_cd" value='<bean:write name="hblVO" property="wgt_disp_cd"/>'>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            
            <!-- layout_wrap(S) -->
                <div class="layout_wrap">
                    <div class="layout_vertical_4 sm" style="width:445px;">
                             <h3 class="title_design pad_btm_8" style="margin-bottom:0;"><bean:message key="Mark"/></h3>
                             <textarea name="mk_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,document.getElementById('rider_ocean'));keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="physical" >
<bean:write name="hblVO" property="mk_txt" filter="true" /></textarea>
                             <img tabindex="-1" src="<%=CLT_PATH%>/web/img/main/Rider_Icon.gif" style="display:none;"width="45" height="42" border="0" id="rider_ocean" valign="top">
                    </div>
                    <div class="layout_vertical_4 sm pad_left_8" style="width:444px;">
                         <h3 class="title_design pad_btm_8" style="margin-bottom:0;"><bean:message key="Description"/></h3>
                         <input tabindex="-1" type="hidden" name="rider_lbl" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;text-align:right;width:267;border:0;background-color:transparent;"/>
                          <textarea name="desc_txt" rows="16"  maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,document.getElementById('rider_ocean'));keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="virtual" >
<bean:write name="hblVO" property="desc_txt" filter="true"/></textarea>
                    </div>
                </div>
                <div class="opus_design_btn sm" style="text-align: left;">
                    <button tabindex="-1" type="button" class="btn_etc" onclick="addCntrInfo(docObjects[2], 'M', 'OE');" ><bean:message key="Add_Container_Info"/></button><!-- 
                     --><button tabindex="-1" type="button" class="btn_etc" onclick="copyFromHBL();" ><bean:message key="Copy_from_HBL"/></button><!-- 
                     --><button type="button" class="btn_etc" onclick="addItemInfo(docObjects[11]);" ><bean:message key="Item_Information"/></button>
                </div>
            <div class="layout_wrap">   
                <div class= "layout_vertical_4 sm" style="width:445px;">
                    <h3 class="title_design"><bean:message key="Remark"/></h3>
                    <textarea name="rmk" cols="175" 
                                          rows="5" maxlength="400" onkeypress="keyPress_maxLength(this);" 
                                          onkeyup="keyUp_maxLength(this);" onblur="urlRemark(this);keyUp_maxLength(this);" 
                                          style="ime-mode:auto;width: 433px;height:93px;text-transform:none;" >
<bean:write name="hblVO" property="rmk" filter="true"/></textarea>
                </div>
                <!-- #1056 [OEM Entry]PO# 항목 추가 및 연계 -->
                <div class="layout_vertical_4 sm pad_left_8" style="width:220px">
                    <h3 class="title_design"><bean:message key="PO_No"/></h3>
                    <textarea name="po_no" cols="182" rows="5" maxlength="300" onchange="textdescAdd(frm1.desc_txt, 'PO NO. : ', this.value, frm1.h_po_no);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;width:210px;height:93px;resize:none;"><bean:write name="hblVO" property="po_no" filter="true"/></textarea>
                    <input type="hidden" name="h_po_no" id="h_po_no" value='<bean:write name="hblVO" property="po_no"/>'>
                </div>
                <div class="layout_vertical_4 sm pad_left_8" style="width:210px">
                    <h3 class="title_design"><bean:message key="Item_No"/></h3>
                    <textarea name="item_no" cols="182" rows="5" maxlength="300" style="ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;overflow:hidden;width:210px;height:93px;resize:none;"></textarea>
                    <input type="hidden" name="h_po_no" id="h_po_no" value=''>
                </div>
            </div>
        </div>
        </div>
        <!-- tab_player_3 (E) -->
        
         
        <!-- tab_player_4 (S) -->
        <div id="tabLayer" name="tabLayer" style="display:none"><!--Freight-->
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
    
        <input type="hidden" name="f_ofc_cnt_cd" id="f_ofc_cnt_cd"   value="">
        <input type="hidden" name="hid_act_cnt_cd" id=hid_act_cnt_cd"" value="">
        
        <input type="hidden" name="ppdOrgCurr" id="ppdOrgCurr"     value="">
        <input type="hidden" name="ofc_curr"  id="ofc_curr"       value="<%=ofc_curr%>">
        <input type="hidden" name="trf_cur_cd" id="trf_cur_cd"     value="<%=trf_cur_cd%>">
        <input type="hidden" name="xcrtDt"     id="xcrtDt"        value="<bean:write name="hblVO" property="obrd_dt_tm"/>">
    
        <input type="hidden" name="cctOrgCurr"  id="cctOrgCurr"    value="">
        <input type="hidden" name="objPfx"   id="objPfx"        value="">
        <input type="hidden" name="curRow2"   id="curRow2"        value="">
    
        <input type="hidden" name="ppdToCurrency" id="ppdToCurrency" value="<%=partner_curr%>">
        <input type="hidden" name="ppdOrgCurr"  id="ppdOrgCurr"    value="<%=partner_curr%>">
    
        <!--Invoice추가-->    
        <input type="hidden" name="tax_bil_flg"  id="tax_bil_flg"  value="">  
        <input type="hidden" name="inv_dt"     id="inv_dt"     value="">
        <input type="hidden" name="inv_due_dt" id="inv_due_dt"   value="">  
        <input type="hidden" name="inv_rmk"   id="inv_rmk"      value="">  
        <input type="hidden" name="buy_inv_no"  id="buy_inv_no"   value="">  
        
        <div id="frtTableS">
            <div class="opus_design_grid" id="mainTable">
                <h3 class="title_design"><bean:message key="Account_Receivable"/></h3>
                    <div class="opus_design_btn">
                    
                        <div class="grid_option_left" style="margin-right: 50px; display:none;" id="profitBtns">
                            <b><span style="float: left; margin-right: 10px; padding-top: 5px;"><bean:message key="Profit"/></span></b>
                            <input type="text" name="profit" size='11' class="search_form-disable" style="float:left;ime-mode:disabled;resize:none;width:110;text-align:right;" readonly>
                        </div>
                    
                        <div class="grid_option_left">
                            <button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[4], 'frtTableS')"><bean:message key="Plus"/></button><!--
                            --><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[4], 'frtTableS')"><bean:message key="Minus"/></button>  
                            <span style="display:none;" id="sdBtns" >
                            <button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[4], 'LOCAL')" ><bean:message key="Create_NewAR"/></button><!--
                            --><button type="button" class="btn_normal"  onClick="goToInvoiceModify('LOCAL')" ><bean:message key="ViewEdit_Invoice"/></button><!--
                            --><button type="button" class="btn_normal"  onClick="setDfltFrt('', 'S', 'O', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
                            --><button type="button" class="btn_normal"  onclick="frtRowAdd('ROWADD', docObjects[4], 'S', 'O', 'M');afterRowAdd('AR');" ><bean:message key="Add"/></button><!--
                            --><button type="button" class="btn_normal"  onclick="frtRowCopy('AR', docObjects[4], docObjects[6],'', 'S', 'O', 'M');" > <bean:message key="Copy_toAgent"/></button><!--
                             #2504 [PATENT]Debit Note & AP for billing code based invoices
                             --><span id="spanARprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[4],'AR');" ><bean:message key="Debit_Print"/></button></span>
                            </span> 
                        </div>
                    </div>
                <script type="text/javascript">comSheetObject('sheet7');</script>
                </div>
            </div>
            <div class="opus_design_grid" id="mainTable">
                <h3 class="title_design"><bean:message key="Debit_Credit"/></h3>
                    <div class="opus_design_btn">
                        <div class="grid_option_left">
                            <button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[6], 'frtTableDC')"><bean:message key="Plus"/></button><!--
                            --><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[6], 'frtTableDC')"><bean:message key="Minus"/></button>
                            <span style="display:none;" id="dcBtns" >
                            <button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[6], 'DC')" ><bean:message key="Create_NewDC"/></button><!--
                            --><button type="button" class="btn_normal"  onClick="goToInvoiceModify('DC')" ><bean:message key="ViewEdit_Invoice"/></button><!--
                            --><button type="button" class="btn_normal"  onClick="setDfltFrt('dc_', 'S', 'O', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!--
                            --><button type="button" class="btn_normal"  onclick="frtRowAdd('DCROWADD', docObjects[6], 'S', 'O', 'M');afterRowAdd('DC');" ><bean:message key="Add"/></button><!--
                            --><button type="button" class="btn_normal"  onclick="frtRowCopy('DC', docObjects[6], docObjects[4], docObjects[5], 'S', 'O', 'M');" > <bean:message key="Copy_toLocal"/></button>
                            </span> 
                        </div>
                    </div>
                <script type="text/javascript">comSheetObject('sheet9');</script>
            </div>
            <div class="opus_design_grid" id="mainTable">
                <h3 class="title_design"><bean:message key="Account_Payable"/></h3>
                    <div class="opus_design_btn">
                        <div class="grid_option_left">
                            <button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[5], 'frtTableB')"><bean:message key="Plus"/></button><!-- 
                        --><button type="button" class="btn_normal"  onClick="setFrtSizeDown(docObjects[5], 'frtTableB')"><bean:message key="Minus"/></button>
                        <span style="display:none;" id="bcBtns" ><!-- 
                        --><button type="button" class="btn_normal"  onClick="goToInvoice(docObjects[5], 'AP')" ><bean:message key="Create_AP"/></button><!-- 
                        --><button type="button" class="btn_normal"  onClick="goToInvoiceModify('AP')" ><bean:message key="ViewEdit_Invoice"/></button><!-- 
                        --><span id="btnPierpass"><button type="button" class="btn_normal"  onClick="addPierPassFrt(frm1.intg_bl_seq.value, 'M', frm1.shp_mod_cd.value, 'O', 'B')" ><bean:message key="PIERPASS"/></button></span><!-- 
                        --><button type="button" class="btn_normal"  onClick="setDfltFrt('b_', 'S', 'O', 'M')" ><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
                        --><button type="button" class="btn_normal"  onclick="frtRowAdd('BCROWADD', docObjects[5], 'S', 'O', 'M');afterRowAdd('AP');" ><bean:message key="Add"/></button><!--
                            --><button type="button" class="btn_normal"  onclick="frtRowCopy('AP', docObjects[5], docObjects[6],'', 'S', 'O', 'M');" > <bean:message key="Copy_toAgent"/></button><!--
                        #2504 [PATENT]Debit Note & AP for billing code based invoices 
                        --><span id="spanAPprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[5],'AP');" ><bean:message key="AP_Print"/></button></span>
                        </span> 
                        </div>
                    </div>
                <script type="text/javascript">comSheetObject('sheet8');</script>
            </div>
        
        </div>
        <!-- tab_player_4 (E) -->
        
        
        <!-- tab_player_5 (S) -->
        <div id="tabLayer" name="tabLayer" style="display:none"><!--WorkOrder-->
            <div class="opus_design_grid" id="mainTable">
                    <h3 class="title_design pad_btm_8"><bean:message key="Work_Order_List"/></h3>
                    <div class="opus_design_btn">
                    <button style="display:none" type="button" class="btn_accent" name="goWoObj" id="goWoObj" onClick="doWork('WORKORDER')" style="display:none;margin-left:9px;cursor:hand"> <bean:message key="WorkOrder"/></button>
                    </div>
                    <script type="text/javascript">comSheetObject('sheet12');</script>
            </div>
        </div>
        <!-- tab_player_5 (E) -->
        
        
        <!-- tab_player_6 (S) -->
        <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
            <div class="opus_design_grid">
                <h3 class="title_design"><bean:message key="Shipping_Document"/></h3>
                    <div class="opus_design_btn">
                        <button type="button" class="btn_accent" id="sDoc" btnAuth="S_DOC"  name="sDoc" btnAuth="S_DOC" onClick="doWork('S_DOC');" style="display:none;"><bean:message key="Print"/></button><!-- 
                    --><button type="button" class="btn_normal" name="emlSnd"  id="emlSnd" onClick="doWork('SNDEML')" style="display:none;margin-left:5px;cursor:hand"><bean:message key="Email"/></button><!-- 
                    --><button type="button" class="btn_normal" name="fileUp" id="fileUp" onClick="doWork('DOCFILE')" style="display:inline;margin-left:5px;cursor:hand"><bean:message key="Upload"/></button>
                        </div>
                        
                        <script type="text/javascript">comSheetObject('sheet3');</script>
                        <script type="text/javascript">comSheetObject('sheet10');</script>
                        
            </div>
        </div>
        <!-- tab_player_6 (E) -->
        <!-- tab_player_7 (S) -->
        <div id="tabLayer" name="tabLayer" style="display:none"><!--Status-->
        
<div class="layout_wrap opus_design_inquiry">
    <div class="layout_vertical_2">
        <!-- opus_design_grid(S) -->
        
        <div class="opus_design_grid pad_rgt_8">
            <h3 class="title_design"><bean:message key="Job_Visibility"/></h3>
            <div class="opus_design_btn">
            <button type="button" class="btn_accent" onclick="gridAdd(12);"><bean:message key="Add"/></button>
            </div>
            <script type="text/javascript">comSheetObject('sheet15');</script>
        </div>
        <!-- opus_design_grid(E) -->
    </div>
    <div class="layout_vertical_2">
        <!-- opus_design_grid(S) -->
        <div style="padding-top:10px;"><h3 class="title_design"><bean:message key="History_Search"/></h3></div>
        <div class="opus_design_grid">
            <script type="text/javascript">comSheetObject('sheet11');</script>
            <!-- opus_design_grid(E) -->
        </div>
    </div>
</div>
        <!-- tab_player_7 (E) -->
</div>
   
</div>   

</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="intg_bl_seq" value=""  />
    <input type="hidden" name="docType" value=""/>
</form>
        
<script type="text/javascript">  

fnbtnCtl();

</script>   
        
</body>
</html>

