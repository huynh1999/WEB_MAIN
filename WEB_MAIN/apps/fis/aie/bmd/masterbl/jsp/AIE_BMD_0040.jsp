<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0040.jsp
*@FileTitle  : MAWB등록 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/14
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21 자동완성 기능 추가 S -->	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21  자동완성 기능 추가 E -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/masterbl/script/AIE_BMD_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script>	
	var uod_flg ="<%= userInfo.getUod_flg()%>"
	var usrDept = "<%=userInfo.getDept_cd()%>";
	var usrId = "<%= userInfo.getUsrid() %>";
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var usrNm = "<%= userInfo.getUser_name() %>";
    //#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
    var edob_flg;
    var ref_ofc_cd;	
	var AUTOCOMPLETE_YN = 'N';
	//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
	var eblfn_flg;
	 
	<logic:notEmpty name="valMap" property="autocompleteYn">
    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>
	 
		function dispBizBtns(dispTp){
			//Freight버튼
			getObj("sdBtns").style.display    = dispTp;
			getObj("bcBtns").style.display    = dispTp;
			getObj("dcBtns").style.display    = dispTp;

			getBtnObj("finalModiObj").style.display = 'none';
            getObj("itmAdd").style.display = dispTp;
			getObj("loadPO").style.display = dispTp;			
		}
        function btnLoad(){

        	// post date 수정 권한
        	//if(user_role_cd=="ADM"){
        	//	frm1.post_dt.className = "search_form";
        	//	frm1.post_dt.readOnly = false;
        		
        		//2012.11.14 요청사항에 의해서 일단 숨김
        		//finalModiObj.style.display = 'inline';
        		
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
        		getBtnObj("mf").style.display = 'inline';
            }else{
            	getBtnObj("mf").style.display = 'none';
            }
        	
            if(frm1.bl_sts_cd.value=='NA'){

            	getBtnObj("btnAccounting").style.display = 'none';
            	
                frm1.bl_no.className = 'search_form';
                frm1.bl_no.readOnly  = false;

                //hblCallObj.style.display = 'inline';
        
                frm1.mrn_no.className = 'search_form';
                frm1.mrn_no.readOnly  = false;
                
                //frm1.lnr_bkg_no.className = 'search_form';
                //frm1.lnr_bkg_no.readOnly  = false;
		
            }else{
            	getBtnObj("btnAccounting").style.display = 'inline';
            	//getBtnObj("btnFileLabel").style.display = 'inline';
            	getBtnObj("btnPProfit").style.display  = 'inline';
				//btnAdd.style.display = 'none';
				 if(frm1.bl_sts_cd.value=='MC'){
				    frm1.mrn_no.className = 'search_form';
					frm1.mrn_no.readOnly  = false;
					
					getBtnObj("btnPrint").style.display = 'inline';
					getBtnObj("conPouch").style.display = 'inline';
					getBtnObj("btnDelete").style.display   = 'inline';
					getObj("fileUp").style.display  = 'inline';        
					getObj("sDoc").style.display  = 'inline';        
					getBtnObj("btnCopy").style.display = 'inline';
					getBtnObj("hblObj").style.display  = 'inline';
					// #48284 - [IMPEX] AIR EXPORT MASTER FUNCTION 버튼 ENTRY & LIST 동일하게
					getBtnObj("btnLabelPrint").style.display = 'inline';
					getBtnObj("btnTSA").style.display = 'inline';
					getObj("btnCargoManifest").style.display = 'inline';
					
					dispBizBtns('inline');
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
// 				}else if(frm1.bl_sts_cd.value=='HO'){
// 					getBtnObj("btnPrint").style.display = 'inline';
// 					getBtnObj("conPouch").style.display = 'inline';
					
// 					getBtnObj("btnSave").style.display  = 'none';
					
// 					getBtnObj("btnDelete").style.display   = 'none';
			
// 					getObj("fileUp").style.display  = 'inline';        
// 					getObj("sDoc").style.display  = 'inline';        
// 					getBtnObj("btnCopy").style.display = 'inline';
// 					getBtnObj("hblObj").style.display = 'inline';
// 					// #48284 - [IMPEX] AIR EXPORT MASTER FUNCTION 버튼 ENTRY & LIST 동일하게
// 					getBtnObj("btnLabelPrint").style.display = 'inline';
// 					getBtnObj("btnTSA").style.display = 'inline';
// 					getObj("btnCargoManifest").style.display = 'inline';

// 					dispBizBtns('none');
// 					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
// 					getObj("goWoObj").style.display = 'inline';
				}else if(frm1.bl_sts_cd.value=='HF'){
					getBtnObj("btnPrint").style.display = 'inline';
					getBtnObj("conPouch").style.display = 'inline';
					
					getBtnObj("btnSave").style.display  = 'none';
					getBtnObj("btnSaveX").style.display  = 'none';
					
					getBtnObj("btnDelete").style.display   = 'none';
			
					getObj("fileUp").style.display  = 'inline';        
					getObj("sDoc").style.display  = 'inline';        
					getBtnObj("btnCopy").style.display = 'inline';
					getBtnObj("hblObj").style.display = 'none';
					// #48284 - [IMPEX] AIR EXPORT MASTER FUNCTION 버튼 ENTRY & LIST 동일하게
					getBtnObj("btnLabelPrint").style.display = 'inline';
					getBtnObj("btnTSA").style.display = 'inline';
					getObj("btnCargoManifest").style.display = 'inline';

					dispBizBtns('none');
					//#27542 [BINEX] B/L Entry 에 Pickup & Delivery Order 연계 기능 추가
					getObj("goWoObj").style.display = 'inline';
					
					// #48835 - [CARGOIS] COPY 한 HBL 의 이상한 현상
		            // Block 된 B/L일 경우 Filing No 수정 못하도록 수정
		           	frm1.ref_no.className = 'search_form-disable';
		            frm1.ref_no.readOnly  = true;
				}else{
					getBtnObj("btnCopy").style.display = 'none';
					getBtnObj("hblObj").style.display = 'none';
				}
			}
			//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
			if (eblfn_flg != 'Y') {
				frm1.ref_no.disabled = true;
			}
            fnbtnCtl();
            
        }
		
		var shpAddr = '<bean:write name="hblVO" property="shpr_trdp_nm"/> O/B OF';
		var ref_ofc_eng_nm = '<bean:write name="hblVO" property="ref_ofc_eng_nm"/>';
		
		<!-- ###Office Info## -->
        <% boolean isBegin = false; %>
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
        var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
        var oth_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
        var air_body = "<bean:write name="ofcVO" property="air_body"/>";
        var ofc_post_dt = "<bean:write name="ofcVO" property="post_dt_exp"/>";
        var ofc_curr_cd = "<bean:write name="ofcVO" property="trf_cur_cd"/>";
        var ofc_locl_curr_cd = "<bean:write name="ofcVO" property="locl_curr_cd"/>"; //#138 Local Currency 추가
        var iata_cd = "<bean:write name="ofcVO" property="iata_cd"/>";
        
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
        
        <!-- Air Freight -->
		var UNITCD1_1 = '';
		var UNITCD1_2 = '';
        <logic:notEmpty name="valMap" property="airAplyUtCdCdList">
			<% isBegin = false; %>
            <bean:define id="airAplyUtCdCdList" name="valMap" property="airAplyUtCdCdList"/>
            <logic:iterate id="codeVO" name="airAplyUtCdCdList">
                <% if(isBegin){ %>
                	UNITCD1_1+= '|';
                	UNITCD1_2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   UNITCD1_1+= '<bean:write name="codeVO" property="cd_nm" filter="true"/>';
                   UNITCD1_2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Other Freight -->
		var UNITCD2_1 = '';
		var UNITCD2_2 = '';
        <logic:notEmpty name="valMap" property="othAplyUtCdCdList">
			<% isBegin = false; %>
            <bean:define id="othAplyUtCdCdList" name="valMap" property="othAplyUtCdCdList"/>
            <logic:iterate id="codeVO" name="othAplyUtCdCdList">
                <% if(isBegin){ %>
	                UNITCD2_1+= '|';
	                UNITCD2_2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   UNITCD2_1+= '<bean:write name="codeVO" property="cd_nm" filter="true"/>';
                   UNITCD2_2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Freight Term Code -->
		var TERMCD1 = '';
		var TERMCD2 = '';
        <logic:notEmpty name="valMap" property="frtCdList">
			<% isBegin = false; %>
            <bean:define id="frtCdList" name="valMap" property="frtCdList"/>
            <logic:iterate id="codeVO" name="frtCdList">
                <% if(isBegin){ %>
                	TERMCD1+= '|';
                	TERMCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   TERMCD1+= '<bean:write name="codeVO" property="cd_nm" filter="true"/>';
                   TERMCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Currency Code -->
		var CURRCD1 = '';
		var CURRCD2 = '';
        <logic:notEmpty name="valMap" property="currCdList">
			<% isBegin = false; %>
            <bean:define id="currCdList" name="valMap" property="currCdList"/>
            <logic:iterate id="codeVO" name="currCdList">
                <% if(isBegin){ %>
	                CURRCD1+= '|';
	                CURRCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   CURRCD1+= '<bean:write name="codeVO" property="cd_nm" filter="true"/>';
                   CURRCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Rate Class Code -->
		var RCLASSCD1 = '';
		var RCLASSCD2 = '';
        <logic:notEmpty name="valMap" property="rClassCdList">
			<% isBegin = false; %>
            <bean:define id="rClassCdList" name="valMap" property="rClassCdList"/>
            <logic:iterate id="codeVO" name="rClassCdList">
                <% if(isBegin){ %>
                	RCLASSCD1+= '|';
                	RCLASSCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   RCLASSCD1+= '<bean:write name="codeVO" property="cd_nm" filter="true"/>';
                   RCLASSCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- Freight Code -->
		var FRTCD1 = '';
		var FRTCD2 = '';
        <logic:notEmpty name="valMap" property="FREIGHT_CODE">
			<% isBegin = false; %>
            <bean:define id="FREIGHT_CODE" name="valMap" property="FREIGHT_CODE"/>
            <logic:iterate id="frtVO" name="FREIGHT_CODE">
                <% if(isBegin){ %>
	                FRTCD1+= '|';
	                FRTCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                   FRTCD1+= '<bean:write name="frtVO" property="frt_cd" filter="true"/>';
                   FRTCD2+= '<bean:write name="frtVO" property="frt_cd_nm" filter="true"/>';
            </logic:iterate>
        </logic:notEmpty>

        var usrid = '<%=userInfo.getUsrid()%>';
        var ofccd = '<%=userInfo.getOfc_cd()%>';
        var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";

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

		<!-- 요구사항 #25606 : [B/L Entry] B/L에서의 Freight Input 시 Currency 선택 옵션 변경 //-->
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

        var user_role_cd = "<%=userInfo.getRole_cd()%>";
        var user_lang_cd = "<%=userInfo.getUse_lang_cd()%>";
        var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
        function setupPage(){
        	setOfficeData();
        	loadPage();
        	btnLoad();
        	doHideProcess();
        	loadData();
        	
			//2016.04.21 C.W.Park Added
			//#52109 버튼 로딩 후 ofc별 blck_dt 셋업
			//setBlock_dt();
        	
		 }
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
        
		//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
		var vat_rt_dp_cnt = Number("<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>");
		var xch_rt_dp_cnt = Number("<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>");

		function fnbtnCtl(){
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L)
			//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
			eblfn_flg = "<%=userInfo.getEblfn_flg()%>";
			ref_ofc_cd =  formObj.h_ref_ofc_cd.value;
			//alert(edob_flg + " "+ofccd+" "+ref_ofc_cd);
			var btnflag = "Y";
			if (edob_flg == "N"){
				if (ofccd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (ref_ofc_cd == "") {  btnflag = "Y"; }
			if (btnflag == "Y"){
				//기존유지
				//$("#btnSave").show();
				//$("#closeModiObj").show();
				//$("#btnDelete").show(); 
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
<form name="frm1" method="POST" action="./AIE_BMD_0040.clt" class="filter">
    <input type="hidden" name="f_cmd">
    <html:hidden name="hblVO"  property="bl_sts_cd"/>   
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
    <html:hidden name="hblVO"  property="sr_no"/>
    <html:hidden name="valMap" property="f_intg_bl_seq"/>
    <input type="hidden" name="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
    <input type="hidden" name="h_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
    <input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	
	<!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"      value="">
    <input type="hidden" name="chk_fr_trdp_nm"      value="">
    <input type="hidden" name="chk_fr_inv_curr_cd"  value="">
    
    <!-- 조회된 Ref_no , ref 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="sel_ref_no"  value='<bean:write name="hblVO" property="ref_no"/>'> 
    <!-- 조회된 lnr_bkg_no , lnr_bkg_no 번호 변경시 비교를 위해서 -->
    <input type="hidden" name="org_lnr_bkg_no"  value='<bean:write name="hblVO" property="lnr_bkg_no"/>'> 
    <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 -->
    <input type="hidden" name="org_post_dt"  value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    
    <!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 Block page에서 post_dt 변경후 화면에서 아래 값들을 변경 체크 위해 유지 -->     
    <input type="hidden" name="org_etd_dt_tm"  id="org_etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    <input type="hidden" name="org_eta_dt_tm"  id="org_eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>'>
    
    
    <input type="hidden" name="h_aem_hand_info" value="<bean:write name='ofcVO' property='aem_hand_info' />" />
    
   	<!-- #47413 [IMPEX]B/L COPY 기능보완  --> 
    <input type="hidden" name="copy_bl_seq" 	value='<bean:write name="valMap" property="org_bl_seq"></bean:write>'/>
    
    <!--  jsjang 2013.8.29 #17604 : [BINEX] 1. Tab에 Save한 다음 Current Screen 에서 Refresh. -->
    <input type="hidden" name="f_isNumSep" 	value='<bean:write name="valMap" property="f_isNumSep"/>'>     
    
    <!-- #50048 - [IMPEX] B/L PRINT HISTORY 저장관련 ENTRY 화면에서 CODE FIELDS 저장시 업데이트 -->
    <input type="hidden" name="pre_flt_no"       value='<bean:write name="hblVO" property="flt_no"/>' />
	<input type="hidden" name="pre_lnr_trdp_nm"  value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' />
	<input type="hidden" name="pre_shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>' />
	<input type="hidden" name="pre_iss_trdp_nm"  value='<bean:write name="hblVO" property="iss_trdp_nm"/>' />
	    <!-- #52320 [COMMON] Transaction 변경처리시 Block Date 까지 Check 하도록 수정  --> 
    <input type="hidden" name="trx_modi_tms" value="" id="trx_modi_tms" />
    
    <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
    <input type="hidden" name="f_modify"   id="f_modify"   value="<bean:write name="valMap" property="f_modify"/>"> 
    
    <!--#6669 [Zencon] OPUS UPLOADED DOCUMENT SHOWS REGARDLESS OF MODULE  -->
	<input type="hidden" name="f_palt_mnu_cd"   id="f_palt_mnu_cd"   value="AEM">   
    
    <!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		    <span style="display:none;" btnAuth="FINAL"><button type="button" class="btn_normal" id="finalModiObj" style="display:none;" onClick="doWork('FINAL_MODIFY')"><bean:message key="Final"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')"><bean:message key="Search"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><button type="button" class="btn_normal" onClick="doWork('NEW')"><bean:message key="New"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><button type="button" class="btn_normal" id="btnSave" onClick="doWork('SAVE')"><bean:message key="Save"/></button></span>
			<button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
			<span style="display:none;" btnAuth="COPY"><button type="button" class="btn_normal" id="btnCopy" style="display:none;" onClick="doWork('COPY')"><bean:message key="Copy"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" id="btnPrint"  style="display:none;" onClick="doWork('PRINT')"><bean:message key="Print"/></button></span>
			<span style="display:none;" btnAuth="CON_POUCH"><button type="button" class="btn_normal" style="display:none;" id="conPouch" onclick="doWork('CON_POUCH')"><bean:message key="Consolidation_pouch"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onclick="doWork('AIR_LABEL')" id="btnLabelPrint" name="btnLabelPrint"><bean:message key="Label"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('CargoManifest');" id="btnCargoManifest" ><bean:message key="B.Manifest"/></button></span>
			<span style="display:none;" btnAuth="ACCOUNTING"><button style="display:none;" type="button" class="btn_normal" id="btnAccounting" onClick="doWork('GOTOACCT');"><bean:message key="Accounting"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" style="display:none;" onClick="doWork('TSA');" id="btnTSA" ><bean:message key="TSA"/></button></span>
			<span style="display:none;" btnAuth="P_REPORT"><button type="button" class="btn_normal" id="btnPProfit"  style="display:none;" onClick="doWork('PROFIT_REPORT')"><bean:message key="P_Report"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><button type="button" class="btn_normal" id="mf" style="display:none;" onClick="doWork('MFPRINT');"><bean:message key="M_F"/></button></span>
			<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>" ><button type="button" class="btn_normal" id="btnDelete" style="display:none;" onClick="doWork('REMOVE')"><bean:message key="Delete"/></button></span>
			<span style="display:none;" btnAuth="HAWB_CREATE"><button type="button" class="btn_normal" id="hblObj" style="display:none;" onClick="doWork('HBL_ENTRY')"><bean:message key="HAWB_Create"/></button></span>
			<span style="display:none;" btnAuth="FILE_LABEL"><button style="display:none;" type="button" class="btn_normal" onclick="doWork('FILE_LABEL')" name="btnFileLabel" id="btnFileLabel" ><bean:message key="FILE_LABEL"/></button></span> 
			 --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<div class="over_wrap" height="100%">
	<div class="wrap_search_tab">	
		<div class="opus_design_inquiry ">
			<table>
                <tr>
                	<th width="50px"><bean:message key="Ref_No"/></th>
                    <td width="180px"><!-- 
                     --><input name="f_ref_no" maxlength="20"  value="<bean:write name="valMap" property="f_ref_no"/>" type="text" class="search_form" dataformat="excepthan" style="width:130px;" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyDown="entSearch()"><!-- 
                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="srAirOpenPopUp('REF_POPLIST2', this, 'A', 'O')"></button><!-- 
                     --></td>
                    <th width="70px"><bean:message key="MAWB_No"/></th>
                    <td><!-- 
                     --><input name="f_bl_no"  maxlength="40"  value="<bean:write name="valMap" property="f_bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyDown="entSearch()"><!-- 
                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAieMasterPopUp('MBL_POPLIST',this)"></button><!-- 
                     --></td>
                </tr>
            </table>
		</div>
	</div>
    <div class="wrap_result_tab">
    	<div class="opus_design_grid" id="mainTable" style="display: none;">
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Master_AWB_Entry"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Mark_Desc"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="BL_Rate"/></span></a></li>
	        <!-- OFVFINS-398: [HESED INTERNATIONAL] NEW CUSTOMER SETUP (AWS3) -->
	        <li <%=userInfo.getUse_bl_freight_tab().equals("N")?"style=\"display:none\"":"" %>><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Freight"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('05');"><span><bean:message key="Work_Order"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('06');"><span><bean:message key="Shipping_Document"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('07');"><span><bean:message key="Status"/></span></a></li>
	    </ul>
	
		<!-- tabLayer1 (S) -->
		<div name="tabLayer" id="tabLayer" style="display: inline;">
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
				        	<col width="50">
				        	<col width="75">
				        	<col width="70">
				        	<col width="115">
				        	<col width="120">
				        	<col width="115">
				        	<col width="80">
				        	<col width="115">
				        	<col width="80">
				        	<col width="130">
							<col width="80">
				        	<col width="*">
				   </colgroup>
			       <tbody>
						<tr>
							<th><bean:message key="Ref_No"/></th>
		                    <td>
		                    	<input type="text" name="ref_no" maxlength="20" value='<bean:write name="hblVO" property="ref_no"/>' class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled;width:75px;text-transform:uppercase;" onblur="strToUpper(this)" onclick="if(frm1.ref_no.value=='AUTO'){frm1.ref_no.value=''}"><!-- 
		                     --><bean:define id="ofcList" name="valMap" property="ofcList"/><!-- 
		                     --><html:select name="hblVO" property="ref_ofc_cd" styleClass="search_form" style="width:55px;" onchange="ofcChDEta();setBlock_dt(true);">
		                     		<html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/>
		                     	</html:select>
		                     	<input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>">
		                    </td>
							<th><bean:message key="BL_Type"/></th>
							<td>
								<bean:define id="blTypeList" name="valMap" property="blTypeList"/> 
								 <html:select name="hblVO" property="hbl_tp_cd" styleClass="search_form" style="width:115px;" onchange="fnSalesChange()"> <!-- #1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L --> 
								 	<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/> 
								 </html:select> 
							 </td>
							<th><bean:message key="Post_Date"/></th>
		                    <td><input type="text" name="post_dt" value='<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form-disable" style="width:115px;" readonly></td>
							<th><bean:message key="BL_Date"/></th>
		                    <td>
		                        <input style="width:94px;" type="text" name="bl_dt_tm" id="bl_dt_tm" value='<wrt:write name="hblVO" property="bl_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);changeBLDate();" size='11' maxlength="10" class="search_form" onchange="changeBLDate();"><!-- 
		                     --><button type="button" class="calendar" tabindex="-1" id="bl_dt_tm_cal" onclick="doDisplay('DATE1', frm1.bl_dt_tm);"></button>
		                    </td>
		                    <th><bean:message key="ITN_No"/></th>
		                    <td colspan="3"><input type="text" name="itn_no" value="<bean:write name="hblVO" property="itn_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:129px;" onblur="strToUpper(this)" maxlength="20" ></td>		                    
						</tr>
						<tr>
							<th><bean:message key="MAWB_No"/></th>
							<td>
								<input type="text" name="bl_no" maxlength="40" value='<bean:write name="hblVO" property="bl_no"/>' onKeyDown="setCarrierCd(this)" class="search_form" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this);setCarrierCd(this)"><!-- 
							 --><button type="button" class="btn_etc" onClick="doWork('STOCK_POP')"><bean:message key="Stock"/></button>
							</td>
							<th><bean:message key="MRN"/></th>
							<td><input type="text" name="mrn_no" maxlength="20" value="<bean:write name="hblVO" property="mrn_no"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
							<th><bean:message key="Liner_Bkg_No"/></th>
							<td><input type="text" name="lnr_bkg_no" maxlength="20"  value="<bean:write name="hblVO" property="lnr_bkg_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this);"></td>
							<th><bean:message key="Customer_Ref_No"/></th>
							<td>
							    <input type="text" name="cust_ref_no"  value='<bean:write name="hblVO" property="cust_ref_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:125px;text-transform:uppercase;" onblur="strToUpper(this)">
							 </td>
							<th><bean:message key="Export_Reference_No"/></th>
							<td>
							    <input type="text" name="exp_ref_no"   value='<bean:write name="hblVO" property="exp_ref_no"/>'   class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:129px;text-transform:uppercase;"onblur="strToUpper(this)" />
							 </td>
							<th><bean:message key="Agent_Reference_No"/></th>
							<td>
						        <input type="text" name="prnr_ref_no"   value='<bean:write name="hblVO" property="prnr_ref_no"/>'   class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:129px;text-transform:uppercase;"onblur="strToUpper(this)" />
							</td>		                    
						</tr>
					</tbody>
				</table>
			</div>
			
			<div class="layout_wrap" id="mainArea">
				<div class="layout_vertical_3 sm" style="height:650px;" id="layoutVertical1">
				<div class="opus_design_inquiry">
					<h3 style="margin-bottom:0" class="title_design"><bean:message key="Customer"/></h3>
					<table>
						<colgroup>
				        	<col width="70">
				        	<col width="*">
					   </colgroup>
				       <tbody>
							<tr>
								<th><a href="javascript:clearBlPrnr('S01');"><bean:message key="Shipper"/></a></th>
								<td><!-- 
								 --><input type="text"   name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 75px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}"><!-- 
								 --><input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!-- 
								 --><button type="button" class="input_seach_btn" tabindex="-1" id="shipper"   onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button><!-- 
								 --><button type="button" id="shipper" class="btn_etc" onClick="openAieMasterPopUp('PIC_POP', this)"><bean:message key="PIC"/></button>
								</td>
							</tr>
							<tr>
								<td colspan="2"><textarea name="shpr_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off">
<bean:write name="hblVO" property="shpr_trdp_addr" filter="true"/></textarea></td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('C01');"><bean:message key="Consignee"/></a></th>
								<td>
									<input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="hblVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!-- 
								 --><input type="text"   name="cnee_trdp_nm"  value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);notifyKeyIn();"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}"><!-- 
								 --><button type="button" class="input_seach_btn" tabindex="-1" id="consignee" onClick="openAieMasterPopUp('LINER_POPLIST',this);notifyKeyIn();"></button>
								</td>
							</tr>
							<tr>
								<td colspan="2"><textarea name="cnee_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off">
<bean:write name="hblVO" property="cnee_trdp_addr" filter="true"/></textarea></td>
							</tr>
							<tr>
								<th><a href="javascript:clearBlPrnr('N01');"><bean:message key="Notify"/></a></th>
								<td>
									<input type="hidden" name="ntfy_trdp_cd"  value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_notify',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled;width:48px;"><!-- 
								 --><input type="text"   name="ntfy_trdp_nm"  value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' onblur="strToUpper(this);checkTrdpCode(this);notifyKeyIn();" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:calc(100% - 30px);text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('notify'), frm1.ntfy_trdp_nm.value);}"><!-- 
								 --><button type="button" class="input_seach_btn" tabindex="-1" id="notify" onClick="openAieMasterPopUp('LINER_POPLIST',this);notifyKeyIn();"></button>
								 </td>
							</tr>
							<tr>
								<td colspan="2">
									<img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('SAC', 'A', 'O', 'M')"><bean:message key="Same_As_Consignee"/></a>&nbsp;<!-- 
								 --><img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('CNEE', 'A', 'O', 'M')"><bean:message key="Copy"/></a>
								 </td>
							</tr>
							<tr>
								<td colspan="2"><textarea name="ntfy_trdp_addr" class="search_form autoenter_50" dataformat="excepthan" style="width:100%;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address');notifyKeyIn();" WRAP="off">
<bean:write name="hblVO" property="ntfy_trdp_addr" filter="true"/></textarea></td>
							</tr>
							<tr>
								<td colspan="2">&nbsp;&nbsp;&nbsp;<bean:message key="Display_NOTIFY_on_MAWB"/> <input type="checkBox" name="disp_ntfy_flg" value="<bean:write name="hblVO" property="disp_ntfy_flg"/>" onclick="flgChange(this);displayChange();" tabindex="16"></td>
							</tr>							
						</tbody>
					</table>
					<table>
						<tr>
							<th width="100px"><a href="javascript:clearBlPrnr('P03');"><bean:message key="Triangle_Agent"/></a></th>
							<td>
								<input type="text"   name="prnr_trdp_cd2" maxlength="20"  value='<bean:write name="hblVO" property="prnr_trdp_cd2"/>' onKeyDown="codeNameAction('trdpCode_partner2',this, 'onKeyDown','A','O','M')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner2',this, 'onBlur','A','O','M')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="partner2"  onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button><!-- 
							 --><input type="text"   name="prnr_trdp_nm2" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm2"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:calc(100% - 85px);" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('partner2'), frm1.prnr_trdp_nm2.value);}">
							 	<input type="hidden" name="prnr_trdp_addr2" value='<bean:write name="hblVO" property="prnr_trdp_addr2"/>'>
							 </td>
						</tr>
						<tr>
                            <th><a href="javascript:clearBlPrnr('A01');"><bean:message key="Forwarding_Agent"/></a></th>
                            <td>
                                <input type="hidden" name="agent_trdp_cd"  value='<bean:write name="hblVO" property="agent_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_agent',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_agent',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;resize:none; text-transform:uppercase;width:48px;"><!-- 
                             --><input type="text"   name="agent_trdp_nm"  value='<bean:write name="hblVO" property="agent_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:calc(100% - 30px);text-transform:uppercase;" onblur="strToUpper(this);checkTrdpCode(this);" maxlength="50" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('agent'), frm1.agent_trdp_nm.value);}"><!-- 
                             --><button type="button" name="agent" id="agent" class="input_seach_btn" tabindex="-1" onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button>
                            </td>
                        </tr>
                        <tr>
                        	<td colspan="2">
                            	<textarea name="agent_trdp_addr" class="search_form autoenter_50px" dataformat="excepthan" style="ime-mode:disabled;resize:none;resize:none;width:100%;height:80px;text-transform:uppercase;overflow:hidden;font-family:TAHOMA;" onblur="strToUpper(this);chkCmpAddr(this, 'Agent Address')" WRAP="off">
<bean:write name="hblVO" property="agent_trdp_addr" filter="true"/></textarea></td>
                        </tr>
					</table>
				</div>
				<div class="opus_design_inquiry" >
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
										<input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);frm1.ctrb_mgn.value = '';">
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
				
				<div class="layout_vertical_3 sm mar_left_4" style="height:650px;" id="layoutVertical2">
				<div class="opus_design_inquiry">
					<h3 style="margin-bottom:0" class="title_design"><bean:message key="Flight_Info"/></h3>
                    <table>
                    	<tr>
                            <th width="116px"><bean:message key="Airline"/></th>
                            <td>
                            	<input type="text"   name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_exp_air_carr',this, 'onKeyDown')" onblur="codeNameAction('trdpCode_exp_air_carr',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                             --><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="openAieMasterPopUp('LINER_POPLIST_AIR_M',this)"></button><!-- 
                             --><input type="text"   name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST_AIR_M', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}">
                             	<input type="hidden" name="obrd_dt_tm"  value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>' class="search_form" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" dataformat="excepthan" style="ime-mode:disabled;width:140px;">
                             </td>
                        </tr>
                        <tr>
                            <th><bean:message key="Flight_No"/></th>
                            <td><input type="text" name="flt_no"      value='<bean:write name="hblVO" property="flt_no"/>'   onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;text-transform:uppercase;" maxlength="20"></td>
                        </tr>
                    </table>
					<table>
						<tr>
							<th width="116px"><bean:message key="Flight_Date"/></th>
							<td width="98px"><!-- 
							 --><input required type="text" name="etd_dt_tm" id="etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Flight Date');"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" id="etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt_tm);"></button><!-- 
							 --></td>
							<th width="30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message key="Time"/></th>
							<td><input type="text" name="etd_tm" value='<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						</tr>
						<tr>
							<th><bean:message key="Arrival_Date"/></th>
							<td><!-- 
							 --><input type="text" name="eta_dt_tm" id="eta_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Arrival Date');"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" id="eta_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.eta_dt_tm);"></button><!-- 
							 --></td>
							<th><bean:message key="Time"/></th>
							<td><input type="text" name="eta_tm" value='<wrt:write name="hblVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						</tr>
					</table>
					<table>
                    	<tr>
                            <th width="116px"><a href="javascript:clearBlPrnr('I01');"><bean:message key="Issuing_Carrier"/></a></th>
                            <td>
								<input type="text" name="iss_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="iss_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_iss',this, 'onKeyDown');" onBlur="strToUpper(this);codeNameAction('trdpCode_iss',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                             --><button type="button" class="input_seach_btn" tabindex="-1" id="iss" onClick="openAieMasterPopUp('LINER_POPLIST',this);"></button><!-- 
                             --><input type="text"   name="iss_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="iss_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('iss'), frm1.iss_trdp_nm.value);}">
                             	<input type="hidden" name="iss_trdp_addr" value='<bean:write name="hblVO" property="iss_trdp_addr"/>'>
                             </td>
                        </tr>
						<tr>
							<th><bean:message key="Billing_Carrier"/></th>
							<td>
								<input type="text"   name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown');"  onblur="strToUpper(this); codeNameAction('trdpCode_carr',this, 'onKeyDown');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" maxlength="20;" onKeyPress="ComKeyOnlyAlphabet('uppernum');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="carr"  onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button><!-- 
							 --><input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}" maxlength="50">
							 	<input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>
							 </td>
						</tr>
					</table>
					<h3 style="margin-bottom:0" class="title_design mar_top_8"><bean:message key="Route"/></h3>
					<table>
						<tr>
							<th width="116px" nowrap class="table_search_head_r"><bean:message key="Departure"/></th>
							<td>
								<input required type="text"   name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="pol" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
							 --><input type="hidden" name="pol_nod_cd" value='<bean:write name="hblVO" property="pol_nod_cd"/>' ><!-- 
							 --><input required type="text" name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}">
							 </td>
						</tr>
						<tr>
							<th><bean:message key="First_To"/></th>
							<td>
								<input type="text" name="fst_to_cd" maxlength="5" value='<bean:write name="hblVO" property="fst_to_cd"/>' onKeyDown="codeNameAction('Location_fst',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_fst',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="fst" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
							 --><input type="text" name="fst_to_nm" maxlength="50" value='<bean:write name="hblVO" property="fst_to_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('fst'), frm1.fst_to_nm.value);}">
							 </td>
						</tr>
                        <tr>
                             <th><bean:message key="Trans_1"/></th>
                             <td>
                             	<input type="text" name="ts1_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts1_port_cd"/>' onKeyDown="codeNameAction('Location_ts1',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts1',this, 'onBlur','A');setDestination()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                              --><button type="button" class="input_seach_btn" tabindex="-1" id="ts1" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                              --><input type="text" name="ts1_flt_no"  value='<bean:write name="hblVO" property="ts1_flt_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('ts1'), frm1.ts1_flt_no.value);}">
                              </td>
                         </tr>
                         <tr>
                             <th><bean:message key="Trans_2"/></th>
                             <td>
                             	<input type="text" name="ts2_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts2_port_cd"/>' onKeyDown="codeNameAction('Location_ts2',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts2',this, 'onBlur','A');setDestination()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                              --><button type="button" class="input_seach_btn" tabindex="-1" id="ts2" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                              --><input type="text" name="ts2_flt_no"  value='<bean:write name="hblVO" property="ts2_flt_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('ts2'), frm1.ts2_flt_no.value);}">
                              </td>
                         </tr>
                         <tr>
                             <th><bean:message key="Trans_3"/></th>
                             <td>
                             	<input type="text" name="ts3_port_cd" maxlength="5" value='<bean:write name="hblVO" property="ts3_port_cd"/>' onKeyDown="codeNameAction('Location_ts3',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_ts3',this, 'onBlur','A');setDestination()" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                              --><button type="button" class="input_seach_btn" tabindex="-1" id="ts3" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                              --><input type="text" name="ts3_flt_no"  value='<bean:write name="hblVO" property="ts3_flt_no"/>'  class="search_form" style="width:130px;text-transform:uppercase;" maxlength="15" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('ts3'), frm1.ts3_flt_no.value);}">
                              </td>
                         </tr>
						<tr>
							<th><bean:message key="Destination"/></th>
							<td>
								<input required type="text" id="pod_cd" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' onKeyDown="codeNameAction('Location_air_des',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_air_des',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" class="search_form" ><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
							 --><input type="hidden" name="pod_nod_cd"     value='<bean:write name="hblVO" property="pod_nod_cd"/>'><!-- 
							 --><input required type="text"   name="pod_nm"   maxlength="50"   value='<bean:write name="hblVO" property="pod_nm"/>'     class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}">
							 </td>
						</tr>
						<tr id="trKrOnlyWh" style="display: none">
                            <th><bean:message key="Warehouse"/></th>
                            <td colspan="3"><!--
                           --><input type="hidden" name="cfs_nod_cd" maxlength="5" value='<bean:write name="hblVO" property="cfs_nod_cd"/>'  onKeyDown="codeNameAction('Nodecode_cfs',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Nodecode_cfs',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;"><!--
                           --><input type="text" name="cfs_loc_nm" value='<bean:write name="hblVO" property="cfs_loc_nm"/>' class="search_form-disable" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:234px;" readonly><!--
                           --><button type="button" class="input_seach_btn" tabindex="-1" id="cfs" onClick="getWhCd('A')"></button><!--
                           --><html:hidden name="hblVO" property="cfs_loc_cd"/></td>
                        </tr>
					</table>
					<table>
                    	<tr>
                            <th width="116px"><bean:message key="IATA_Code"/></th>
                            <td width="60px"><input type="text" name="iata_cd" maxlength="20" value='<bean:write name="hblVO" property="iata_cd"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"></td>
                            <th width="63px" nowrap class="table_search_head"><bean:message key="Acct_No"/></th>
                            <td><input type="text" name="mm_txt" maxlength="50" value='<bean:write name="hblVO" property="mm_txt"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:88px;"></td>
	                    </tr>
                    </table>
                                      
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <th width="116px"><bean:message key="Cargo_Type"/></th>
							<td> 
							 <bean:define id="cargoTpCdList" name="valMap" property="cargoTpCdList"/> 
							 <html:select name="hblVO" property="cargo_tp_cd" styleClass="search_form" style="width:233px;" onchange="cargoDesc();"> 
							 	<html:options collection="cargoTpCdList" property="cd_val" labelProperty="cd_nm"/> 
							 </html:select> 
							 </td>
                            </tr>
                            <tr>
                            	<th><bean:message key="Rate"/></th>
								<td> 
								 <bean:define id="rateClssCdList" name="valMap" property="rateClssCdList"/> 
								 <html:select name="hblVO" property="rt_clss_cd" styleClass="search_form" style="width:233px;"> 
								 	<option value=""></option> 
								     <html:options collection="rateClssCdList" property="cd_val" labelProperty="cd_nm"/> 
								 </html:select> 
								 </td>
                          </tr>
						  <tr>
                            	<th><bean:message key="Incoterms"/></th>
								<td> 
								 <bean:define id="incotermsList" name="valMap" property="incotermsList"/> 
								 <html:select name="hblVO" property="inco_cd" styleClass="search_form" style="width:233px;"> 
								 	<option value=""></option> 
								     <html:options collection="incotermsList" property="cd_val" labelProperty="cd_nm"/> 
								 </html:select> 
								 <input type="hidden" name="h_inco_cd" value="<bean:write name="hblVO" property="inco_cd"/>" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:155px;">
								 </td>
                          </tr>
                      </table>
                      <h3 style="margin-bottom:0" class="title_design mar_top_8"><bean:message key="Management"/></h3>
                      <table>
                          <tr>
                              <th width="116px"><bean:message key="Date_issued"/></th>
                              <td width="100px">
                                  <input type="text" name="bl_iss_dt" id="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>" class="search_form" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Date Issued');" dataformat="excepthan" style="ime-mode:disabled;width:70px;">
                                  <button type="button" class="calendar" tabindex="-1" id="bl_iss_dt_cal" onclick="doDisplay('DATE1' ,frm1.bl_iss_dt);"></button>
                              </td>
                              <th width="70px"><bean:message key="Issued_By"/></th>
                              <td>
                              	  <input type="text" name="opr_usrid"   value="<bean:write name="hblVO" property="issued_by"/>" class="search_form-disable" readOnly style="width:70px;"><!-- 
                               --><button type="button" class="input_seach_btn" tabindex="-1" id="oprBtn" onClick="openAieMasterPopUp('OPR_POPLIST',this)"></button><!-- 
                               --><input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>"><!-- 
                               --><input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>"><!-- 
                               --><input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>">
                               </td>
						  </tr>
						     <!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
							 <tr>
								<th><bean:message key="Team_cd"/></th>
								<td>
									<input type="text" name="team_cd" readOnly style="width:100px;">
								</td>
							</tr>
						   <tr>
						      <th width="116px"><bean:message key="Sales_OFC"/></th>
						      <td> 
						      	 <input type="text" name="sls_ofc_cd" value="<bean:write name="hblVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:70px;" readonly><!-- 
						       --><button type="button" class="input_seach_btn" tabindex="-1" onClick="openAieMasterPopUp('OFFICE_GRID_POPLIST',this)"></button><!-- 
						       --></td>
						   	   <th><bean:message key="Sales_PIC"/></th>
						       <td><!-- 
						       --><input type="text"   name="sls_usrid"  value="<bean:write name="hblVO" property="sls_usrid"/>"  class="search_form-disable" style="width:70px;" readOnly><!-- 
						       --><button type="button" class="input_seach_btn" tabindex="-1" id="salesperson" onClick="openAieMasterPopUp('USER_POPLIST',this)"></button><!-- 
						       --><input type="hidden" name="sls_usr_nm" value="<bean:write name="hblVO" property="sls_usr_nm"/>" class="search_form-disable" style="width:120px;" readOnly><!-- 
						       --><input type="hidden" name="sls_dept_cd" value="<bean:write name="hblVO" property="sls_dept_cd"/>"><!-- 
						       --></td>
						   </tr>
                     </table>
				</div>
				</div>
				
				<div class="layout_vertical_3 sm mar_left_4" style="height:650px; width:calc(34% - 8px)" id="layoutVertical3">
				<div class="opus_design_inquiry" >
					<h3 style="margin-bottom:0" class="title_design"><bean:message key="Account_Information"/></h3>
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <th width="93px"><bean:message key="Commodity"/></th>
                            <td><!-- 
                             --><input type="text" name="rep_cmdt_cd" maxlength="13" value="<bean:write name="hblVO" property="rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:62px;"><!-- 
                             --><button type="button" class="input_seach_btn" tabindex="-1" id="commodity" onClick="openAieMasterPopUp('COMMODITY_POPLIST',this)"></button><!-- 
                             --><input type="text" name="rep_cmdt_nm" value="<bean:write name="hblVO" property="rep_cmdt_nm"/>" maxlength="100" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:119px;" onchange="" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('COMMODITY_POPLIST', this);}">
                             </td>
                        </tr>
						<tr>
							<th><bean:message key="Package"/></th>
							<td> 
							 <input type="text" name="pck_qty" value="<bean:write name="hblVO" property="pck_qty"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right"><!--
							 --><bean:define id="pckList" name="valMap" property="pckCdList"/><!--
							 --><html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:125px;"> 
							 	<option value=""></option> 
							 	<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/> 
							 </html:select> 
							 </td>
						</tr>
					</table>
					<table width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<th width="145px"><bean:message key="GWeight"/></th>
							<td><!-- 
							 --><input type="text" name="grs_wgt" value="<bean:write name="hblVO" property="grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="grs_wgt_ut_cd" value="KG" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							 --><input type="text" name="grs_wgt1" value="<bean:write name="hblVO" property="grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							 --></td>
						</tr>
						<tr>
							<th><bean:message key="Chargeable_Weight"/></th>
							<td><!-- 
							 --><input type="text" name="chg_wgt" value="<bean:write name="hblVO" property="chg_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="chg_wgt_ut_cd" value="KG" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							 --><input type="text" name="chg_wgt1" value="<bean:write name="hblVO" property="chg_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="chg_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							 --></td>
						</tr>
						<tr>
							<th><bean:message key="BL_Gross_Weight"/></th>
							<td><!-- 
							 --><input type="text" name="bl_grs_wgt" value="<bean:write name="hblVO" property="bl_grs_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="bl_grs_wgt_ut_cd" value="KG" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							 --><input type="text" name="bl_grs_wgt1" value="<bean:write name="hblVO" property="bl_grs_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="bl_grs_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							 --></td>
						</tr>
						<tr>
							<th><bean:message key="BL_Chargeable_Weight"/></th>
							<td><!-- 
							 --><input type="text" name="bl_chg_wgt" value="<bean:write name="hblVO" property="bl_chg_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="bl_chg_wgt_ut_cd" value="KG" style="width:33px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							 --><input type="text" name="bl_chg_wgt1" value="<bean:write name="hblVO" property="bl_chg_wgt1"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;" onchange="weightChange();"><!-- 
							 --><input type="text" name="bl_chg_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							 --></td>
						</tr>
					</table>
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
							<th width="145px"><bean:message key="Volume_Weight"/></th>
							<td width="60px"><input type="text" name="vol_wgt" value="<bean:write name="hblVO" property="vol_wgt"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);weightChange(this);" maxlength="13" class="search_form" zero_remove dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"></td>
							<th width="30px" nowrap class="table_search_head"><bean:message key="CBM"/></th>
							<td><!-- 
							 --><input type="text" name="vol_meas" value="<bean:write name="hblVO" property="vol_meas"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,6);chkComma(this,8,6);weightChange(this);" maxlength="13" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-align:right;"><!-- 
							 --><input type="hidden" name="h_vol_meas" value="<bean:write name="hblVO" property="vol_meas"/>" maxlength="200" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:155px;"><!-- 
							 --><button type="button" class="btn_etc" onclick="sumHblValue();"><bean:message key="Sum"/></button><!-- 
							 --></td>
						</tr>
					</table>
					<table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                           <th width="145px"><bean:message key="Tariff_Currency_Code"/></th>
                           <td> 
                            <bean:define id="currCdList" name="valMap" property="currCdList"/> 
                            <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:65px;"> 
                            		<html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/> 
                            </html:select> 
                            <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>"> 
                            </td>
                         </tr>
                    </table>
                    <!-- opus_design_grid(S) -->
					<div class="opus_design_grid">
						<input type="hidden" name="size_ut_cd1" value="<bean:write name="hblVO" property="size_ut_cd"/>"/>
						<table>
							<tr>
							   <td width="50px"><input type="radio" name="size_ut_cd" id="size_ut_cd2" value="CM" onClick="javascript:chkSizeType();"><label for="size_ut_cd2"><bean:message key="Cm"/></label></td>
						   	   <td width="50px"><input type="radio" name="size_ut_cd" id="size_ut_cd3" value="INCH" onClick="javascript:chkSizeType();" checked><label for="size_ut_cd3"><bean:message key="Inch"/></label></td>
						   	   <td> 
						   	   		 <div class="opus_design_btn"> 
						   	   		    <button type="button" class="btn_accent" onClick="setSizeUp(docObjects[5], 350);document.getElementById('layoutVertical1').style.height = '850px';document.getElementById('layoutVertical2').style.height = '850px';document.getElementById('layoutVertical3').style.height = '850px' "><bean:message key="Plus"/></button> 
						   	   		    <button type="button" class="btn_accent" onClick="setSizeDown(docObjects[5], 150);;document.getElementById('layoutVertical1').style.height = '630px';document.getElementById('layoutVertical2').style.height = '630px';document.getElementById('layoutVertical3').style.height = '630px'"><bean:message key="Minus"/></button> 
							   	    	<button type="button" class="btn_accent" onClick="javascript:gridAdd(5);"><bean:message key="Add"/></button> 
							   	    </div>
						   	    </td>
							</tr>
						</table>
				   	    
						<script type="text/javascript">comSheetObject('sheet4');
						/* 속도개선  */
						comConfigSheet(docObjects[5], SYSTEM_FIS);
						initSheet(docObjects[5], (5+1) );
						comEndConfigSheet(docObjects[5]);							
						</script>
					</div>
                    <table border="0" cellpadding="0" cellspacing="0">
                    	<tr>
                    		<th width="113px"><bean:message key="Freight_Term"/></th>
                            <td width="100px"> 
                             <bean:define id="frtList" name="valMap" property="frtCdList"/> 
                             <html:select name="hblVO" property="frt_term_cd" styleClass="search_form" style="width:94px;" onchange="changeTermCd(this);"> 
                                 <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/> 
                             </html:select> 
                             </td>
                            <th width="90px"><bean:message key="Other_Charge"/></th>
                            <td> 
                             <bean:define id="frtList" name="valMap" property="frtCdList"/> 
                             <html:select name="hblVO" property="otr_chg_term_cd" styleClass="search_form" style="width:94px;" onchange="changeTermCd(this);"> 
                                 <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/> 
                             </html:select> 
                             </td>
                    	</tr>
                        <tr>
                            <th><bean:message key="DV_Carriage"/></th>
                            <td><input type="text" name="decl_crr_val" maxlength="50"  value='<bean:write name="hblVO" property="decl_crr_val"/>' class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:94px;"></td>
                            <th><bean:message key="DV_Customs"/></th>
                            <td><input type="text" name="decl_cstms_val" maxlength="50"  value='<bean:write name="hblVO" property="decl_cstms_val"/>' onBlur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:94px;"></td>
                         </tr>
                         <tr>
                             <th><bean:message key="Insurance"/></th>
                             <td colspan="2"><input type="text" name="amt_insur_val" maxlength="50" value='<bean:write name="hblVO" property="amt_insur_val"/>' class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:94px;"></td>
                         </tr>
                   </table>   
				   <table border="0" cellpadding="0" cellspacing="0">
					   <tr>
					      <th width="113px"><bean:message key="Carriers_Spot_No"/></th>
					      <td><input type="text" name="spot_no" maxlength="40" value='<bean:write name="hblVO" property="spot_no"/>' class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:94px;"></td>
					   </tr>
					   <tr>
                          <th><bean:message key="Sales_Type"/></th>
						  <td><bean:define id="slsList" name="valMap" property="slsCdList"/>
                                <html:select name="hblVO" property="nomi_flg" style="width:93px;" styleClass="input1" onchange="fnSalesChange()"> <!-- #1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L -->
                                    <html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/>
                               </html:select>
						  </td>  					   
					   </tr>
                       <tr>
                       		<th><bean:message key="Internal"/></th>
                       	<td><!--  
                       	--><input type="checkBox" name="inter_use_flag" id="inter_use_flag" value="<bean:write name="hblVO" property="inter_use_flag"/>" onclick="flgChange(this);"><!--
                      	--></td>
                       </tr>										   
					</table>
				</div>
				</div>
			</div>
			<h3 class="title_design mar_top_8" ><bean:message key="House_BL_List"/></h3>
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet2');
				/* 속도개선  */
				comConfigSheet(docObjects[1], SYSTEM_FIS);
				initSheet(docObjects[1], (1+1) );
				comEndConfigSheet(docObjects[1]);					
				</script>
			</div>
		</div>
		
		<div name="tabLayer" id="tabLayer" style="display: none;">
		<div class= "opus_design_inquiry sm">
			<div class="layout_wrap">
    			<div class="layout_vertical_2 sm"  style="width:519px">
					<table>
						<tr>
							<td><h3 class="title_design"><bean:message key="Handling_Information"/></h3></td>
							<td align="right">
								<span id="tdCertiHndlInfo" style="display:none;">
									<bean:define id="certiHndlInfoList" name="valMap" property="certiHndlInfoList"/>
	                                <html:select name="hblVO" property="certi_hndl_info" styleClass="search_form" style="width:200px;" onchange="setCertiHndlInfo();">
	                                    <option value=""></option>
	                                    <html:options collection="certiHndlInfoList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select>
	                                <input type="hidden" name="h_certi_hndl_info" value="<bean:write name="hblVO" property="certi_hndl_info"/>">
                                </span>
							</td>
						<tr>
					</table>
					<textarea name="hndl_info_txt" cols="80" rows="5" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width: 500px;"  WRAP="off">
<bean:write name="hblVO" property="hndl_info_txt" filter="true"/></textarea>
    			</div>
    			<div class="layout_vertical_2 sm mar_left_8" style="width:530px">
					<h3 class="title_design" style="height: 20px"><bean:message key="Account_Info"/></h3>
					<textarea name="acctg_info_txt" cols="80" rows="5" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width: 500px;" WRAP="off">
<bean:write name="hblVO" property="acctg_info_txt" filter="true"/></textarea>
    			</div>
    		</div>
    		<div class="layout_wrap">
    			<div class="layout_vertical_2 sm mar_top_8" style="width:290px">
    				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Mark"/></h3>
    				<div class="opus_design_btn">
    					<button type="button" class="btn_etc" id="addAuto" onclick="addInst();" style="cursor:hand;display:none;"><bean:message key="Add_Instruction"/></button>
    				</div>
    				<textarea name="mk_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="off">
<bean:write name="hblVO" property="mk_txt" filter="true"/></textarea>
    			</div>
    			<div class="layout_vertical_2 sm mar_top_8 pad_left_8" style="width:447px">
    				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Nature_and_Quantity_of_Goods"/></h3>
    				<input tabindex="-1" type="hidden" name="rider_lbl" value="" style="text-align:right;width:90;border:0;background-color:transparent;"/>
    				<div class="opus_design_btn">
    					<button type="button" class="btn_etc" id="addAuto" onclick="addInst();" style="cursor:hand;display:none;"><bean:message key="Add_Instruction"/></button>
    				</div>
    				<textarea name="desc_txt" rows="16" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="rowCount(frm1,15,rider_ocean, 'A');keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:100%;" WRAP="off">
<bean:write name="hblVO" property="desc_txt" filter="true"/></textarea>
    			</div>
    			<div style="float: left;">
    				<img src="<%=CLT_PATH%>/web/img/main/overlimit.gif" style="display:none"width="29" height="29" border="0" id="rider_ocean" valign="top">
    			</div>
    		</div>
	    		<table border="0" cellpadding="0" cellspacing="0">
					<colgroup>
						<col width="145px" />
						<col width="145px" />
						<col width="210px" />
						<col width="*" />
					</colgroup>
					<tr>
						<th width="120px" style="padding-top:18px">
							<bean:message key="Show_Dimension_on"/>
						</th>
			      		<td style="padding-top:21px"><!-- 
			      		 --><button type="button" class="btn_etc" name="mk_dim" onClick="searchDim('MK_DIM', this)"><bean:message key="Mark"/></button><!-- 
			      		 --><button type="button" class="btn_etc" name="desc_dim" onClick="searchDim('DESC_DIM', this)"><bean:message key="Description"/></button><!-- 
			      		 -->
			      		 </td>
			      		 <td rowspan="3">
						    <div class="layout_vertical_4 sm pad_left_8" style="width:220px">
						    	<h3 class="title_design"><bean:message key="PO_No"/></h3>
			    				<textarea name="po_no" cols="182" rows="5" maxlength="300"  onchange="textdescAdd(frm1.desc_txt, 'PO NO. : ', this.value, frm1.h_po_no);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;overflow:hidden;width:210px;height:93px;resize:none;"><bean:write name="hblVO" property="po_no" filter="true"/></textarea>
			    				<input type="hidden" name="h_po_no" id="h_po_no" value='<bean:write name="hblVO" property="po_no"/>'>
						    </div>
						    </td>
						    <td rowspan="3">
						    <div class="layout_vertical_4 sm pad_left_8" style="width:210px">
						    	<h3 class="title_design"><bean:message key="Item_No"/></h3>
			    				<textarea name="item_no" cols="182" rows="5" maxlength="300" style="ime-mode:disabled; text-transform:uppercase;font-family:TAHOMA;font-size:12px;overflow:hidden;width:210px;height:93px;resize:none;"></textarea>
			    				<input type="hidden" name="h_po_no" id="h_po_no" value=''>
						    </div>				      		 
			      		 </td>
					</tr>
					<tr>
					<td></td>
					<td>
						<button type="button" class="btn_etc" onclick="addItemInfo(docObjects[11]);" style="width:137px"><bean:message key="Item_Information"/></button>
			      	</td>
			      	</tr>
					<tr>
						<th width="140px"><bean:message key="Show_Weight_on_BL_as"/></th>
			      		<td> 
			      		 <bean:define id="wgtDispCdList" name="valMap" property="wgtDispCdList"/> 
			      		 <html:select name="hblVO" property="wgt_disp_cd" styleClass="search_form" style="width:138px;"> 
			      		 	<html:options collection="wgtDispCdList" property="cd_val" labelProperty="cd_nm"/> 
			      		 </html:select> 
			      		 <input type="hidden" name="h_wgt_disp_cd" value="<bean:write name="hblVO" property="wgt_disp_cd"/>">
			      		 </td>
					</tr>
				</table>
		</div>

		<div class="opus_design_grid">
			<h3 class="title_design pad_btm_8"><bean:message key="Item"/></h3>
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="loadPO" id="loadPO"  onClick="cmdtLoadPO(); " style="cursor:hand;display:none;"><bean:message key="Load_PO"/></button>
				<button type="button" class="btn_accent" name="itmAdd" id="itmAdd"  onClick="cmdtRowAdd(); " style="cursor:hand;display:none;"><bean:message key="Add"/></button>
			</div>
			<script type="text/javascript">comSheetObject('sheet13');</script>
		</div>
				
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="MAWB_Printed_Rate_Air_Freight"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" onClick="setFrtAdd();"><bean:message key="Default"/></button><!-- 
				 --><button type="button" class="btn_normal" onClick="doWork('AIR_FRT_ADD');"><bean:message key="Add"/></button>		
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet5');</script>
			</div>
			<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="MAWB_Printed_Rate_Other_Charge"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_normal" onClick="doWork('OTH_FRT_ADD');"><bean:message key="Add"/></button>		
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet6');</script>
				
				<!-- #983 [STAR CLUSTER ATL/MIA] AEM AWB ENTRY TO HAVE TOTAL AMOUNT ON B/L RATE TAB -->
				<div class="opus_design_inquiry pad_top_8">
			   	<table>
			   		<colgroup>
						<col width="*">
						<col width="100">
						<col width="200">
					</colgroup>
					<tbody>
						<tr>
							<td>&nbsp;</td>
							<th><bean:message key="Total_Prepaid"/></th>
				            <td><input type="text" name="f_total_prepaid" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>							
						</tr>
						<tr>
							<td>&nbsp;</td>
							<th><bean:message key="Total_Collect"/></th>
				            <td><input type="text" name="f_total_collect" value="" style="width:200px;text-align:right" class="search_form-disable" readOnly></td>							
						</tr>
					</tbody>
				</table>				
			  </div>
			</div>
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
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
    		<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Account_Receivable"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn" >
				    <div class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[6], 'frtTableS')"><bean:message key="Plus"/></button>
				 		<button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[6], 'frtTableS')"><bean:message key="Minus"/></button>
				   	</div>
				    <div id="sdBtns"  class="grid_option_left" style="display:none;"><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoice(docObjects[6], 'LOCAL')"><bean:message key="Create_NewAR"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoiceModify('LOCAL')"><bean:message key="ViewEdit_Invoice"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="setDfltFrt('', 'A', 'O', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
				 	--><button type="button" class="btn_normal" onclick="frtRowAdd('ROWADD', docObjects[6], 'A', 'O', 'M');afterRowAdd('AR');"><bean:message key="Add"/></button><!--
				 	--><button type="button" class="btn_normal"  onclick="frtRowCopy('AR', docObjects[6], docObjects[8],'', 'A', 'O', 'M');" > <bean:message key="Copy_toAgent"/></button><!--
					 #2504 [PATENT]Debit Note & AP for billing code based invoices
					 --><span id="spanARprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[6],'AR');" ><bean:message key="Debit_Print"/></button></span>
	 			
					</div>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet7');</script>
			</div>
    		<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Debit_Credit"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<div class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[8], 'frtTableDC')"><bean:message key="Plus"/></button> 
						<button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[8], 'frtTableDC')"><bean:message key="Minus"/></button>
				    </div>
				 	<div id="dcBtns" class="grid_option_left" style="display:none;"><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoice(docObjects[8], 'DC')"><bean:message key="Create_NewDC"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoiceModify('DC')"><bean:message key="ViewEdit_Invoice"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="setDfltFrt('dc_', 'A', 'O', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
				 	--><button type="button" class="btn_normal" onclick="frtRowAdd('DCROWADD', docObjects[8], 'A', 'O', 'M');afterRowAdd('DC');"><bean:message key="Add"/></button><!--
				 	--><button type="button" class="btn_normal"  onclick="frtRowCopy('DC', docObjects[8], docObjects[6], docObjects[7], 'A', 'O', 'M');" > <bean:message key="Copy_toLocal"/></button>		
					</div>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet9');</script>
			</div>
    		<div class="opus_design_grid">
				<h3 style="margin-bottom:0" class="title_design"><bean:message key="Account_Payable"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<div class="grid_option_left">
						<button type="button" class="btn_accent" onClick="setFrtSizeUp(docObjects[7], 'frtTableB')"><bean:message key="Plus"/></button>
				 		<button type="button" class="btn_normal" onClick="setFrtSizeDown(docObjects[7], 'frtTableB')"><bean:message key="Minus"/></button>
				 	</div>
				 	<div class="grid_option_left" id="bcBtns" style="display:none;"><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoice(docObjects[7], 'AP')"><bean:message key="Create_AP"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="goToInvoiceModify('AP')"><bean:message key="ViewEdit_Invoice"/></button><!-- 
				 	--><button type="button" class="btn_normal" onClick="setDfltFrt('b_', 'A', 'O', 'M')"><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
				 	--><button type="button" class="btn_normal" onclick="frtRowAdd('BCROWADD', docObjects[7], 'A', 'O', 'M');afterRowAdd('AP');"><bean:message key="Add"/></button><!--
				 	--><button type="button" class="btn_normal"  onclick="frtRowCopy('AP', docObjects[7], docObjects[8],'', 'A', 'O', 'M');" > <bean:message key="Copy_toAgent"/></button><!--
					#2504 [PATENT]Debit Note & AP for billing code based invoices 
					--><span id="spanAPprint" style="display:none;"><button type="button" class="btn_normal"  onClick="goToCmbPrint(docObjects[7],'AP');" ><bean:message key="AP_Print"/></button></span>
				 			
					</div>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet8');</script>
			</div>
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<div class="opus_design_grid">
				<h3 class="title_design mar_btm_8"><bean:message key="Work_Order_List"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" id="goWoObj" onClick="doWork('WORKORDER')"  style="display:none;"><bean:message key="WorkOrder"/></button>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet12');</script>
			</div>
		</div>
		<div name="tabLayer" id="tabLayer" style="display: none;">
			<div class="opus_design_grid">
				<h3 class="title_design"><bean:message key="Shipping_Document"/></h3>
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" id="emlSnd" onClick="doWork('SNDEML')" style="display:none;"><bean:message key="Email"/></button><!-- 
				 --><button type="button" class="btn_normal" id="sDoc" btnAuth="S_DOC" onClick="doWork('S_DOC');" style="display:none;"><bean:message key="Print"/></button><!-- 
				 --><button type="button" class="btn_normal" id="fileUp" onClick="doWork('DOCFILE')" style="display:inline;"><bean:message key="Upload"/></button>
				</div>
				<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
		</div>
		<!-- tab_player_7 (E) -->
		
		<div name="tabLayer" id="tabLayer">
			<h3 class="title_design mar_btm_8"><bean:message key="History_Search"/></h3>
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet11');</script>
			</div>
		</div>
	</div>
</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="intg_bl_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>

<script type="text/javascript">
fnbtnCtl();
</script>	

