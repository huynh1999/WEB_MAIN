<%--
=========================================================
*@FileName   : ACC_INV_0020.jsp
*@FileTitle  : DB/CR
*@Description: DB/CR
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/14
*@since      : 2011/11/14

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/19
*@since      : 2014/06/19
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>

	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
  	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0020.js?ver=<%=CLT_JS_VER%>" ></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String ofcEngNm 	= userInfo.getOfc_eng_nm();
		String ofcCurrCd 	= userInfo.getOfc_curr_cd();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		String efc_flg 		= userInfo.getEfc_flg(); //EDIT AFTER CREATING INVOICES
		//User Role
		String dp_flg 		= userInfo.getDp_flg();
		String fb_flg 		= userInfo.getFb_flg();
		String jo_flg 		= userInfo.getJo_flg();
		String oo_flg 		= userInfo.getOo_flg();
	%>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
		var edoa_flg;
		var ref_ofc_cd;		
		var ofc_cd;		
	</script>
	<bean:define id="blinfoVO"   name="EventResponse" property="objVal"/>
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<script>

	
	//#3973 [JAPT]Invoice Date & Ex.Rate
	var BL_FRT_YN = 'N';
	<logic:notEmpty name="valMap" property="BL_FRT_YN">
		BL_FRT_YN = '<bean:write name="valMap" property="BL_FRT_YN"/>';
	</logic:notEmpty>		
	
		function setSelect(){
			var formObj = document.frm1;
			
			//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
			formObj.f_ofc_locl_curr_cd.value = ofc_locl_curr_cd;	
			
			var invoCd = '<bean:write name="blinfoVO" property="inco_cd"/>';

			if(formObj.f_curr_cd.value == ""){
				formObj.f_curr_cd.value = '<bean:write name="blinfoVO" property="curr_cd"/>';
			}
			if(formObj.f_inv_seq.value == ""){
				if(invoCd != ""){
					formObj.f_inco_cd.value = '<bean:write name="blinfoVO" property="inco_cd"/>';
				}
			}
			
			//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
			if(formObj.f_inv_seq.value == "" ){
				if(formObj.f_loc_ex_rate.value == "" || formObj.f_loc_ex_rate.value == "0"){
					getLoclExRate();
				}				
			}			
			
			/*
			//TERM_CD 셋팅
			formObj.f_terms.value   = '<bean:write name="blinfoVO" property="term_cd"/>';
			formObj.f_term_dt.value = '<bean:write name="blinfoVO" property="term_dt"/>';
			
			if(formObj.f_intg_bl_seq.value != "" || formObj.f_oth_seq.value != ""){
				if(formObj.f_terms[0].selected){
					//formObj.f_due_dt.value = formObj.f_inv_dt.value;
				}else{

					if(formObj.f_inv_seq.value != ""){
						formObj.f_terms[0].selected = true;
					}else{
						calcCreateTerms();
					}

				}
			}
			*/
			fnbtnCtl(2);// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		}
		<!-- Freight SEA_Unit 단위 -->
	    var UNITCD1 = '';
		var UNITCD2 = '';

		if('<bean:write name="blinfoVO" property="air_sea_clss_cd"/>' == "S"){
			<logic:notEmpty name="valMap" property="SEA_UNITCD">
				<% boolean isBegin = false; %>
	            <bean:define id="unitList" name="valMap" property="SEA_UNITCD"/>
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
		}else if ('<bean:write name="blinfoVO" property="air_sea_clss_cd"/>' == "A"){
			<logic:notEmpty name="valMap" property="AIR_UNITCD">
				<% boolean isBegin2 = false; %>
		        <bean:define id="unitList" name="valMap" property="AIR_UNITCD"/>
		        <logic:iterate id="codeVO" name="unitList">
		            <% if(isBegin2){ %>
		                UNITCD1+= '|';
		                UNITCD2+= '|';
		            <% }else{
		                  isBegin2 = true;
		               } %>
		            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
		            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
		        </logic:iterate>
		    </logic:notEmpty>
		}else{

			<logic:notEmpty name="valMap" property="AIR_UNITCD">
				<% boolean isBegin5 = false; %>
		        <bean:define id="unitList" name="valMap" property="UNITCD"/>
		        <logic:iterate id="codeVO" name="unitList">
		            <% if(isBegin5){ %>
		                UNITCD1+= '|';
		                UNITCD2+= '|';
		            <% }else{
		                  isBegin5 = true;
		               } %>
		            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
		            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
		        </logic:iterate>
	    	</logic:notEmpty>
		}


        <!-- ###CONTAINER T<bean:message key="Profit_Share"/>Z 항목### -->
		var TPSZ1 = ' |';
		var TPSZ2 = ' |';
        <logic:notEmpty name="valMap" property="cntrTpszList">
			<% boolean isBegin3 = false; %>
            <bean:define id="TpszList" name="valMap" property="cntrTpszList"/>
            <logic:iterate id="codeVO" name="TpszList">
                <% if(isBegin3){ %>
                	TPSZ1+= '|';
                	TPSZ2+= '|';
                <% }else{
                      isBegin3 = true;
                   } %>
                TPSZ1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
                TPSZ2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            </logic:iterate>
        </logic:notEmpty>



        var BL_NO = '';
        var INTG_BL_SEQ2 = '';

        if('<bean:write name="blinfoVO" property="intg_bl_seq"/>' != ""){
        	<logic:notEmpty name="valMap" property="BL_LIST">
				<% boolean isBegin4 = false; %>
	            <bean:define id="blList" name="valMap" property="BL_LIST"/>
	            <logic:iterate id="codeVO" name="blList">
	                <% if(isBegin4){ %>
		                  BL_NO+= '|';
		                  INTG_BL_SEQ2+= '|';
	                <% }else{
	                      isBegin4 = true;
	                   } %>
	                   if('<bean:write name="codeVO" property="BL_NO"/>' == ""){
	                	   BL_NO		+= ' ';
	                   }else{
	                	   BL_NO		+= '<bean:write name="codeVO" property="BL_NO"/>';
	                   }

	                   INTG_BL_SEQ2	+= '<bean:write name="codeVO" property="INTG_BL_SEQ"/>';
	            </logic:iterate>
	        </logic:notEmpty>
        }


        <!-- ###FRT_CD LIST 항목### -->
		var FRTCD1 = ' |';
		var FRTCD2 = ' |';
        <logic:notEmpty name="valMap" property="FRT_CD_LIST">
			<% boolean isBegin6 = false; %>
            <bean:define id="FRT_CD_LIST" name="valMap" property="FRT_CD_LIST"/>
            <logic:iterate id="codeVO" name="FRT_CD_LIST">
                <% if(isBegin6){ %>
                	FRTCD1+= '|';
                	FRTCD2+= '|';
                <% }else{
                      isBegin6 = true;
                   } %>
                   FRTCD1+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
                   FRTCD2+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>' + ": " + '<bean:write name="codeVO" property="FRT_CD_NM" filter="false"/>';
            </logic:iterate>
        </logic:notEmpty>
		
        var CURRCD = '';
		<% boolean isBegin = false; %>
        <bean:define id="currCdList" name="valMap" property="currCdList"/>
        <logic:iterate id="codeVO" name="currCdList">
            <% if(isBegin){ %>
                   CURRCD += '|';
            <% }else{
            	isBegin = true;
               } %>
            CURRCD+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
        
        var MULTI_CURR_FLAG = "<%="Y".equals((String)application.getAttribute("MULTI_CURR_FLAG")) ? "Y" : "N" %>";	//[20141125 OJG] - Multi Currency 사용 여부
        
		//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
		
		var vat_rt_dp_cnt = Number("<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>");
		var xch_rt_dp_cnt = Number("<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>");
		
		//#138 Office Local Currency 
		var ofc_locl_curr_cd = "<bean:write name="ofcVO" property="locl_curr_cd"/>";
        
     	// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
    	function fnbtnCtl(args){
    		if(args == 1){
    			doBtnAuthority(attr_extension);  
    		}
    		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
    		//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
    		//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
    		var formObj=document.frm1;
    		var efc_flg 		= "<%=efc_flg%>"; //EDIT AFTER CREATING INVOICES 
    		//	alert(args + " "+efc_flg);
    		var btnflag = "Y"; 
    		
    		
    		//f_inv_seq가 Edit 일 경우에만  아래 조건 수행하도록 수정..( Create 일 경우에는 기존로직 유지 )			


			//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
			edoa_flg 		= "<%=userInfo.getEdoa_flg()%>"; //Enable Editing Other Office (ACCT)
			ref_ofc_cd =  	formObj.f_ref_no_dtl.value;
			ofc_cd = "<%=ofc_cd%>";
			    		
			if(formObj.f_inv_seq.value.length > 0){
	    		if (efc_flg == "N"){  
	    			btnflag = "N";
	    		}
	      		 
	    		if (btnflag == "Y"){
	    			//기존유지
					//$("#btnModify").show(); 
	    		}else{
	    			$("#btnModify").hide(); 
	    			$("#btnSaveX").hide();
	    			//$("#btnPrint").hide(); 
	    		} 
	    		
	    		if (btnflag == "Y"){
		    		//Enable Editing Other Office (ACCT) 
		    		var btnflag = "Y";
		    		if (edoa_flg == "N"){
		    			if (ofc_cd != ref_ofc_cd){  
		    				btnflag = "N";
		    			}
		    		}  
		    		if (ref_ofc_cd == "") { btnflag = "Y"; }
		    		if (btnflag == "Y"){
		    			//기존유지
						//$("#btnModify").show(); 
		    		}else{
		    			$("#btnModify").hide(); 
		    			$("#btnSaveX").hide();
		    			//$("#btnPrint").hide(); 
		    		} 
	    		}
			}// End.   if(formObj.f_inv_seq.value.length > 0)	
    	}
        
    	var AUTOCOMPLETE_YN = 'N';
    	<logic:notEmpty name="valMap" property="autocompleteYn">
           AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
        </logic:notEmpty>
         
	</script>
<script>
function setupPage(){
	loadPage();
	setSelect();
}
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
</script>
<script type="text/javascript">
<!--
	function goSearchInv() {
		var frmObject = document.frm1;
		if (frmObject.s_bl_no.value  != '') {
			enterBlCmmInfo('Y');
		} else if (frmObject.s_ref_no.value != '') {
			enterRefInfo('Y');
		} else if (frmObject.s_oth_no.value != '') {
			enterOtherInfo('Y');
		} else if (frmObject.s_inv_no.value != '') {
			enterInvInfo('Y');
		} 
	}
-->
</script>
<form name="frm1" method="POST" action="./ACC_INV_0020.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="old_trdp_cd"         value="<bean:write name="blinfoVO" property="prnr_trdp_cd"/>"/>
	<input type="hidden" name="f_intg_bl_seq" 		value="<bean:write name="blinfoVO" property="intg_bl_seq"/>"/>
	<input type="hidden" name="f_oth_seq" 			value="<bean:write name="blinfoVO" property="oth_seq"/>"/>
	<input type="hidden" name="f_bl_no" 			value=""/>
	<input type="hidden" name="f_air_sea_clss_cd" 	value="<bean:write name="blinfoVO" property="air_sea_clss_cd"/>"/>
	<input type="hidden" name="f_biz_clss_cd" 		value="<bean:write name="blinfoVO" property="biz_clss_cd"/>"/>
	<input type="hidden" name="f_bnd_clss_cd" 		value="<bean:write name="blinfoVO" property="bnd_clss_cd"/>"/>
	<input type="hidden" name="f_inv_seq"	 		value="<bean:write name="blinfoVO" property="inv_seq"/>"/>
	<input type="hidden" name="f_bl_cnt_cd"	 		value="<bean:write name="blinfoVO" property="bl_cnt_cd"/>"/>
	<input type="hidden" name="f_ref_ofc_cd" 		value="<bean:write name="blinfoVO" property="ref_ofc_cd"/>"/>

	<input type="hidden" name = "f_frgn_curr_cd">
	<input type="hidden" name = "f_frgn_amt">
	<input type="hidden" name = "f_frgn_vat_amt">
	<input type="hidden" name = "f_frgn_sum_amt">
	<input type="hidden" name = "f_curRow">

	<input type="hidden" name = "temp_bl_no" value="<bean:write name="blinfoVO" property="bl_no"/>"/>
	<input type="hidden" name = "temp_ref_no" value="<bean:write name="blinfoVO" property="ref_no"/>"/>
	<input type="hidden" name = "temp_oth_no" value="<bean:write name="blinfoVO" property="oth_no"/>"/>
	<input type="hidden" name = "temp_inv_no" value="<bean:write name="blinfoVO" property="inv_no"/>"/>

	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd" value='<bean:write name="blinfoVO" property="prnr_trdp_cd"/>'/>
	<input type="hidden" name="rpt_pdf_file_nm"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_loc_nm" value="<%= ofcLoclNm %>"/>
	<input	type="hidden" name="f_ofc_eng_nm" value="<%= ofcEngNm %>"/>
	<input	type="hidden" name="f_ofc_curr_cd" value="<%= ofcCurrCd %>"/>
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
		
	<!--  User Role Accounting 관련 -->
	<input	type="hidden" name="dp_flg" value="<%= dp_flg %>"/>
	<input	type="hidden" name="fb_flg" value="<%= fb_flg %>"/>
	<input	type="hidden" name="jo_flg" value="<%= jo_flg %>"/>
	<input	type="hidden" name="oo_flg" value="<%= oo_flg %>"/>
	
	<input type="hidden" name = "f_old_sum_amt">
	<input type="hidden" name = "f_old_inv_tp">
	<input type="hidden" name = "f_inv_chg_flg">

	<input type="hidden" name = "agent_ps_code" value="<bean:write name="blinfoVO" property="agent_ps_code"/>"/>


	<input type="hidden" name = "old_post_dt" value="<bean:write name="blinfoVO" property="post_dt"/>"/>
	<input type="hidden" name = "slip_post"   value="<bean:write name="blinfoVO" property="slip_post"/>"/>
	<input type="hidden" name = "block_post"  value="<bean:write name="blinfoVO" property="block_post"/>"/>
	<input type="hidden" name = "max_jnr_dt"  value="<bean:write name="valMap" property="max_jnr_dt"/>"/>

	<input type="hidden" name = "post_dt_inv"  value="<bean:write name="blinfoVO" property="post_dt_inv"/>"/>

	<input type="hidden" name="main_trdp">
	
	<!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"      value="<bean:write name="blinfoVO" property="chk_fr_trdp_cd"/>"/>
    <input type="hidden" name="chk_fr_inv_curr_cd"  value="<bean:write name="blinfoVO" property="chk_fr_inv_curr_cd"/>"/>
    <input type="hidden" name="chk_fr_frt_seq"  	value="<bean:write name="blinfoVO" property="chk_fr_frt_seq"/>"/>
	
	<input type="hidden" name="f_agent_chg_wgt" 		value="<bean:write name="blinfoVO" property="agent_chg_wgt"/>"/>
    <input type="hidden" name="f_agent_grs_wgt" 		value="<bean:write name="blinfoVO" property="agent_grs_wgt"/>"/>
    <!-- #1773 [PATENT] Freight Default Unit Option -->
    <input type="hidden" name="f_shp_mod_cd" 		value="<bean:write name="blinfoVO" property="shp_mod_cd"/>"/>    
    <!-- office logo -->
    <input type="hidden" name="logo1" 		value="<bean:write name="blinfoVO" property="logo1"/>"/>
   
    <!--마감된 invoice에 대하여 수정권한이 있는 사람이 수정을 했을 경우 frt.post_dts는  form의 post_dt가 아님-->
	<input type="hidden" name = "f_edit_post_dt" value=""/>
    

	<!-- 환율일자. -->
	<input type="hidden" name="xcrtDt" value="<bean:write name="blinfoVO" property="inv_dt"/>">
	<input type="hidden" name="intg_bl_seq" value="<bean:write name="blinfoVO" property="intg_bl_seq"/>"/>
	
	<!-- Default New 기능으로 추가된 항목 -->
	<input type="hidden" name="chg_wgt" value="<bean:write name="blinfoVO" property="chg_wgt"/>">
	<input type="hidden" name="chg_wgt1" value="<bean:write name="blinfoVO" property="chg_wgt1"/>">
	<input type="hidden" name="agent_chg_wgt" value="<bean:write name="blinfoVO" property="agent_chg_wgt"/>">
	<input type="hidden" name="agent_chg_wgt1" value="<bean:write name="blinfoVO" property="agent_chg_wgt1"/>">
	<!--  아래두개 추가됨 2013.10.29 정원영 -->
	<input type="hidden" name="agent_grs_wgt" value="<bean:write name="blinfoVO" property="agent_grs_wgt"/>">
	<input type="hidden" name="agent_grs_wgt1" value="<bean:write name="blinfoVO" property="agent_grs_wgt1"/>">
	<input type="hidden" name="customer_unit_chk" value="<bean:write name="blinfoVO" property="customer_unit_chk"/>">
	<input type="hidden" name="agent_unit_chk" value="<bean:write name="blinfoVO" property="agent_unit_chk"/>">
	
	<!-- 추가된 컬럼(vo에 있음) -->
	<input type="hidden" name="grs_wgt" value="<bean:write name="blinfoVO" property="grs_wgt"/>">
	<input type="hidden" name="grs_wgt1" value="<bean:write name="blinfoVO" property="grs_wgt1"/>">
	<input type="hidden" name="meas" value="<bean:write name="blinfoVO" property="meas"/>">
	
	<input type="hidden" name="prnr_trdp_cd" value="<bean:write name="blinfoVO" property="prnr_trdp_cd"/>">
	<input type="hidden" name="prnr_trdp_nm" value="<bean:write name="blinfoVO" property="prnr_trdp_nm"/>">
	
	
	<!-- 추가된 컬럼(vo에 없음) -->
	<input type="hidden" name="cust_rt" value="<bean:write name="blinfoVO" property="cust_rt"/>">
	<input type="hidden" name="prnr_trdp_cd2" value="<bean:write name="blinfoVO" property="prnr_trdp_cd2"/>">
	<input type="hidden" name="agent_rt" value="<bean:write name="blinfoVO" property="agent_rt"/>">
	<input type="hidden" name="agent_amt" value="<bean:write name="blinfoVO" property="agent_amt"/>">
	<input type="hidden" name="shp_mod_cd" value="<bean:write name="blinfoVO" property="shp_mod_cd"/>">
	<input type="hidden" name="cust_amt" value="<bean:write name="blinfoVO" property="cust_amt"/>">
	
	<!--  Invoice 정보 변경여부 확인 -->
	<input type="hidden" name="f_modi_tms" value="">
	
	<input type="hidden" name="m_intg_bl_seq" value="<bean:write name="blinfoVO" property="m_intg_bl_seq"/>">
			
	<!-- #52036 Credit_Restriction_Applied --> 
    <input type="hidden" name="credit_flg" value="<%= userInfo.getCredit_flg() %>"/>
	
	<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
	<input type="hidden" name="locl_ttl_amt" value="">	
	<!-- #3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
	<input type="hidden" name="f_ofc_locl_curr_cd" value="">
	
	<!-- [OFVFOUR-6997] - [Binex-LA] Balance mismatch issue: check freight has invoice -->
	<input type="hidden" name="f_frt_modi_tms" value="">
	
	<!-- OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails -->
	<input	type="hidden" name="attachFileName" value=""/>

	<!-- OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N -->
	<input type="hidden" name="chkMailAr" value="<bean:write name="valMap" property="chkMailAR"/>"/>
	<input type="hidden" name="chkMailAp" value="<bean:write name="valMap" property="chkMailAP"/>"/>
	<input type="hidden" name="chkMailDc" value="<bean:write name="valMap" property="chkMailDC"/>"/>

    <!-- Button -->
<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
   		<%-- 
		<button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" onclick="goSearchInv();" style="display:none;"><bean:message key="Search"/></button> 
		<span id="saveBtn2"><button id="btnModify" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" 	class="btn_normal" onclick="doWork('MODIFY')" style="display:none;"><bean:message key="Save"/></button></span>
		<button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
		<!-- <span id="deleteBtn2"><button id="btnDelete" type="button" class="btn_normal" onclick="doWork('DELETE')" style="display:none;"><bean:message key="Delete"/></button></span> -->
		<button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_normal" onclick="doWork('PRINT')" style="display:none;"><bean:message key="Print"/></button>
		<button id="btnPrintBlock" type="button" btnAuth="PRINT_BLOCK" class="btn_normal" onclick="doWork('PRINT_BLOCK')" style="cursor:hand; display:none"><bean:message key="Print_L"/></button>
		<button id="btnPrint" type="button" btnAuth="CLEAR" class="btn_normal" onclick="clearAll()" style="display:none;"><bean:message key="Clear"/></button>
		<button type="button" btnAuth="P_REPORT" class="btn_normal" onclick="doWork('PROFIT_REPORT');" style="display:none;"><bean:message key="P_Report"/></button>
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
<!-- Search option -->
<div class="over_wrap" height="100%">
<div class="wrap_search">	
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="60"/>
				<col width="140"/>
				<col width="100"/>
				<col width="140"/>
				<col width="70"/>
				<col width="140"/>
				<col width="80"/>
				<col width="*" />				
			</colgroup>
			<tbody>
			<tr>
				<th><bean:message key="BL_No"/></th>
				<td><input type="text" name="s_bl_no"  maxlength="40" value=""  dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onBlur="strToUpper(this);" onKeyDown="enterBlCmmInfo();"></td>
				<th><bean:message key="Ref_No"/></th>
				<td><input type="text" name="s_ref_no"  maxlength="20" value=""  dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onBlur="strToUpper(this);" onKeyDown="enterRefInfo();"></td>
				<th><bean:message key="Other_No"/></th>
				<td><input type="text" name="s_oth_no"  maxlength="20" value=""  dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onBlur="strToUpper(this);" onKeyDown="enterOtherInfo();"></td>
				<th><bean:message key="Invoice_No"/></th>
				<td><input type="text" name="s_inv_no"  maxlength="50" value=""  dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onblur="strToUpper(this);setInvInfo();" onKeyDown="enterInvInfo();"></td>
			</tr>
			</tbody> 
		</table>
	</div>
</div>
<!-- Search option -->
<div class="wrap_result">	
	<div class="layout_wrap">
		<div class="layout_vertical_4" style="width: 320px">
			<div class="opus_design_inquiry">
				<table>
					<tr>
		                 <th><bean:message key="Ref_No"/></th>
		                 <td>
		                 	<input type="text" name="f_ref_no" maxlength="20" value="<bean:write name="blinfoVO" property="ref_no"/>" style="width:116px" class="search_form-disable" readOnly>	
		                 	<input type="text" name="f_ref_no_dtl" value="<bean:write name="blinfoVO" property="ref_ofc_cd"/>" style="width:67px" class="search_form-disable" readOnly></td>
                 	</tr>
                 	<tr>
                 		<th><bean:message key="MBL_No"/></th>
                 		<td><input type="text" name="f_mbl_no" value="<bean:write name="blinfoVO" property="mbl_no"/>" style="width:190px" class="search_form-disable" readOnly></td>
                 	</tr>
					<tr>
						<th><bean:message key="HBL_No"/></th>
		                <td>	
		                 	<logic:equal name="blinfoVO" property="biz_clss_cd" value="M">	
		                 	<input type="text" name="f_hbl_no" value="<bean:write name="blinfoVO" property="hbl_no"/>" style="width:190px" >	
		                 	</logic:equal>	
		                 	<logic:notEqual name="blinfoVO" property="biz_clss_cd" value="M">	
		                 	<input type="text" name="f_hbl_no" value="<bean:write name="blinfoVO" property="hbl_no"/>" style="width:190px" class="search_form-disable" readOnly>	
		                 	</logic:notEqual></td>
					</tr>
					<tr>
						<th><bean:message key="Carrier_Bkg_No"/></th>
               			<td><input type="text" name="f_lnr_bkg_no" value="<bean:write name="blinfoVO" property="lnr_bkg_no"/>" style="width:190px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Vessel_Flight_No"/></th>
               			<td><input type="text" name="f_vsl_flt" value="<bean:write name="blinfoVO" property="vsl_flt"/>" style="width:190px" class="search_form-disable" readOnly></td>
					</tr>
				</table>
			</div>						
		</div>
		<div class="layout_vertical_4" style="width: 280px">
			<div class="opus_design_inquiry">
				<table>
					<tr>
						<th><bean:message key="Shipper"/></th>
                 		<td><input type="text" name="f_shpr_nm" value="<bean:write name="blinfoVO" property="shpr_trdp_nm"/>" style="width:184px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Consignee"/></th>
                 		<td><input type="text" name="f_cnee_nm" value="<bean:write name="blinfoVO" property="cnee_trdp_nm"/>" style="width:184px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Notify"/></th>
		               	<td>
		                 	<input type="text" name="f_ntfy_trdp_nm" value="<bean:write name="blinfoVO" property="ntfy_trdp_nm"/>" style="width:185px" class="search_form-disable" readOnly>
					</tr>
					<tr>
						<th><bean:message key="POL_ETD"/></th>
		                 <td>
		                 	<input type="text" name="f_pol_nm" value="<bean:write name="blinfoVO" property="pol_nm"/>" style="width:110px" class="search_form-disable" readOnly>
		                 	<input type="text" name="f_etd_dt"  value="<bean:write name="blinfoVO" property="etd_dt_tm"/>" style="width:67px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="POD_ETA"/></th>
		               	<td>
		                 	<input type="text" name="f_pod_nm" value="<bean:write name="blinfoVO" property="pod_nm"/>" style="width:110px" class="search_form-disable" readOnly>
		                 	<input type="text" name="f_eta_dt"  value="<bean:write name="blinfoVO" property="eta_dt_tm"/>" style="width:67px" class="search_form-disable" readOnly></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="layout_vertical_4" style="width: 310px">
			<div class="opus_design_inquiry">
				<table>
					<tr>
						<th><bean:message key="POR"/></th>
                 		<td><input type="text" name="f_por_nm" value="<bean:write name="blinfoVO" property="por_nm"/>" style="width:184px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="DEL"/></th>
                 		<td><input type="text" name="f_del_nm" value="<bean:write name="blinfoVO" property="del_nm"/>" style="width:184px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="F_Dest_ETA"/></th>
		                 <td>
		                 	<input type="text" name="f_fnl_dest_loc_nm" value="<bean:write name="blinfoVO" property="fnl_dest_loc_nm"/>" style="width:110px" class="search_form-disable" readOnly>	
		                 	<input type="text" name="f_feta_dt" value="<bean:write name="blinfoVO" property="f_eta_dt_tm"/>" style="width:67px" class="search_form-disable" readOnly></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="layout_vertical_4" >
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="100"/>
						<col width="90"/>
						<col width="41"/>
						<col width="90"/>
						<col width="*" />				
					</colgroup>
					<tr>
						<th><bean:message key="Commodity"/></th>
                 		<td colspan="4"><input type="text" name="f_cmdt_nm" value="<bean:write name="blinfoVO" property="rep_cmdt_nm"/>" style="width:228px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Package"/></th>
		                 <td colspan="4">
		                 	<input type="text" name="f_pck_qty" value="<bean:write name="blinfoVO" property="pck_qty"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly><!--
		                 --><input type="text" name="f_pck_nm"  value="<bean:write name="blinfoVO" property="pck_ut_nm"/>" style="width:134px" class="search_form-disable" readOnly></td>
					</tr>
					<th><bean:message key="G_WGT"/></th>
					<td>
						<input type="text" name="f_grs_wgt" value="<bean:write name="blinfoVO" property="grs_wgt"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
					</td>
					<td>KG</td>
					<td>
					 	<input type="text" name="f_grs_wgt1" value="<bean:write name="blinfoVO" property="grs_wgt1"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
					</td>
					<td>LB</td>
					</tr>
					<logic:equal name="blinfoVO" property="air_sea_clss_cd" value="A">
					<tr>
					 <th><bean:message key="Weight_C"/></th>
					 <td>
						<input type="text" name="f_chg_wgt" value="<bean:write name="blinfoVO" property="chg_wgt"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
					</td>
					<td>KG</td>
					<td>
					 	<input type="text" name="f_chg_wgt1" value="<bean:write name="blinfoVO" property="chg_wgt1"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
					</td>
					<td>LB</td>
	                 </tr>
	                 </logic:equal>
	                 <logic:notEqual name="blinfoVO" property="air_sea_clss_cd" value="A">
		               	<input type="hidden" name="f_chg_wgt" />
		               	<input type="hidden" name="f_chg_wgt1" />
		             </logic:notEqual>
	                 <tr>
	                 	<th>
		               <logic:notEqual name="blinfoVO" property="air_sea_clss_cd" value="A">
		               	<bean:message key="Measure"/>
		               </logic:notEqual>
		               <logic:equal name="blinfoVO" property="air_sea_clss_cd" value="A">
		               	<bean:message key="Volume"/>
		               </logic:equal>
		               </th>
		               <logic:notEqual name="blinfoVO" property="air_sea_clss_cd" value="A">
						<td>
							<input type="text" name="f_meas"  value="<bean:write name="blinfoVO" property="meas"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
						</td>
						<td>
							<bean:message key="CBM"/>
						</td>
						<td>
							<input type="text" name="f_meas1" value="<bean:write name="blinfoVO" property="meas1"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
						</td>
						<td>
							<bean:message key="CFT"/>
						</td>
						</logic:notEqual>
						<logic:equal name="blinfoVO" property="air_sea_clss_cd" value="A">
						<td>
							<input type="text" name="f_meas"  value="<bean:write name="blinfoVO" property="vol_wgt"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
						</td>
						<td>
						</td>
						<td>
							<input type="text" name="f_meas1" value="<bean:write name="blinfoVO" property="vol_meas"/>" style="width:90px;text-align:right" class="search_form-disable" readOnly>
						</td>
						<td>
							<bean:message key="CBM"/>
						</td>	
						</logic:equal>  
	                 </tr>
	             </table>
				</div>
			</div>
		</div>
		<table class="line_bluedot"><tr><td></td></tr></table>
          <div class="opus_design_inquiry">
          <table>
         	<colgroup>
         		<col width="100"></col>
         		<col width="190"></col>
         		<col width="101"></col>
         		<col width="200"></col>
         		<col width="90"></col>
         		<col width="150"></col>
         		<col width="85"></col>
         		<col width="*"></col>
         	</colgroup>
         	<tbody>
	           <tr>
	           		<td colspan="2"><h3 class="title_design mar_btm_4 mar_top_8"><bean:message key="Billing_Information"/></h3></td>
	           </tr>
           
	           <tr>
		             <th><bean:message key="Agent_Name"/></th>
		             <td><!--
	                 --><input type="text"  required name="f_agent_cd" maxlength="20" value="<bean:write name="blinfoVO" property="prnr_trdp_cd"/>" onKeyDown="codeNameAction('AGENT',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('AGENT',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px" ><!--
	                 --><button type="button" class="input_seach_btn" tabindex="-1" id="agent_btn" onclick="doWork('CUSTOMER_POPLIST')"></button><!--
	                 --><input type="text" required name="f_agent_nm" maxlength="100" value="<bean:write name="blinfoVO" property="prnr_trdp_nm"/>" onKeyPress="if(event.keyCode==13){custEnterAction(this,'CUSTOMER_NAME');}" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:95px" ></td> <!-- #2111 [PATENT] DEPOSIT/PAYMENT ENTRY FOR CN 화면 CUSTOMER 항목 명칭 변경 및 추천 항목 표시 -->
	                 
	                 <th><bean:message key="DC_No"/></th>
	                 <td><input type="text" name="f_inv_no" onBlur="checkInvNoDup();strToUpper(this);" value="<bean:write name="blinfoVO" property="inv_no"/>" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase;width:180px"  maxlength="20" ></td>
	                 <th><bean:message key="Due_Date"/></th>
	                 <td><!--
	                 --><input  type="text" required id="f_due_dt" name="f_due_dt" value="" style="width:105px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Due Date');" maxlength="10" ><!--
	                 --><button type="button" id="f_due_dt_cal" onclick="doDisplay('DATE3', frm1);" class="calendar" tabindex="-1"></button></td>
	                 <th><bean:message key="Last_CK_No"/></th>
	                 <td><input type="text" name="f_last_ck" value="" style="width:140px" class="search_form-disable" readOnly></td>
	           </tr>
	           <tr>
	               <th><bean:message key="Agent_Ref_No"/></th>
	               <td><input type="text" name="f_agent_ref_no" maxlength="40" value="<bean:write name="blinfoVO" property="imp_ref_no"/>" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:188px" ></td>
	               <th><bean:message key="Posting_Date"/></th>
	               <td><input  type="text" name="f_post_dt" value="<bean:write name="blinfoVO" property="post_dt"/>" style="width:105px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);checkPostDate(this);" maxlength="10" class="search_form-disable" readOnly></td>
	               <th><bean:message key="Tariff_Currency_Code"/></th>
	               <td class="table_search_head"><!-- #3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
	                 --><select  name="f_curr_cd" id="f_curr_cd"  required style="width:105px;" onChange="setCurrency();getLoclExRate();"><!--
	                 --><option value=""></option><!--
	                 --><bean:define id="paramCurrList"  name="valMap" property="currList"/><!--
	                 --><logic:iterate id="CurrVO" name="paramCurrList"><!--
	                 --><option value='<bean:write name="CurrVO" property="cd_val"/>'><bean:write name="CurrVO" property="cd_val"/></option><!--
	                 --></logic:iterate><!--
	                 --></select></td>
	               <th><bean:message key="Last_Paid_Date"/></th>
	               <td><!--
	                 --><input type="text" id="f_last_paid_dt_cal" name="f_last_paid_dt_cal" style="width:105px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Last Paid Date');" maxlength="10" ><!--
	                 --><button type="button" id="dateImg4" onclick="doDisplay('DATE4', frm1);" class="calendar" tabindex="-1"></button></td>
	           </tr>
	           <tr>
		           <th><bean:message key="Profit_Share_P"/></th>
		           <td nowrap><input type="text" name="f_profit_share" onkeyPress="onlyNumberCheck();" onchange="onlyNumberCheckModified(this);" maxlength ="5" value="<bean:write name="blinfoVO" property="profit_share"/>" style="width:160px;text-align:right" > %</td>
		           <th><bean:message key="Invoice_Date"/></th>
	               <td nowrap><!--
	                 --><input  type="text" required id="f_inv_dt" name="f_inv_dt" value="<bean:write name="blinfoVO" property="inv_dt"/>" style="width:105px" onKeyUp="mkDateFormatType(this, event, false,1);enterInvDt();" onBlur="mkDateFormatType(this, event, true,1);changeInvDt();" maxlength="10" ><!--
	                 --><button type="button" id="f_inv_dt_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1"></button>
	                 <input type="hidden" name="pre_inv_dt" value="<bean:write name="blinfoVO" property="inv_dt"/>" /></td>
			 		 <!-- #3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 -->
					<th><div id="th_ex_rate" style="display:none;"><bean:message key="Local_Ex_Rate"/></div></th>
					<td>
						<div id="td_ex_rate" style="display:none;">
						<input type="text" name="f_loc_ex_rate" id="f_loc_ex_rate" maxlength="20" value=""  dataformat="float" style="ime-mode:disabled; text-transform:uppercase;width:70px;text-align:right" class="search_form">
						</div>
					</td>	
	               <th><bean:message key="Incoterms"/></th>
	               <td><!--
	                 --><select name="f_inco_cd" id="f_inco_cd" style="width:105px;"><!--
	                 --><option value=""></option><!--
	                 --><bean:define id="incotermsList"  name="valMap" property="incotermsList"/><!--
	                 --><logic:iterate id="IncotermsVO" name="incotermsList"><!--
	                 --><option value='<bean:write name="IncotermsVO" property="cd_val"/>'><bean:write name="IncotermsVO" property="cd_nm"/></option><!--
	                 --></logic:iterate><!--
	                 --></select></td>
	          </tr>
	          <tr>
	          	  <td></td>
	          	  <td></td>
	              <th><bean:message key="Terms"/></th>
	              <td><!--
	                 --><select name="f_terms" id="f_terms"  dataformat="excepthan" style="ime-mode:disabled;width:120px;text-align:left" onchange="javascript:calcCreateTerms();"><!--
	                 --><option value=""></option><!--
	                 --><bean:define id="paramTermsList"  name="valMap" property="termsList"/><!--
	                 --><logic:iterate id="TermsVO" name="paramTermsList"><!--
	                 --><option value='<bean:write name="TermsVO" property="cd_val"/>'><bean:write name="TermsVO" property="cd_nm"/></option><!--
	                 --></logic:iterate><!--
	                 --></select><!--
	                 --><input type="text" name="f_term_dt" value="" onKeyDown="enterCalcCreateTerms();" onKeyPress="onlyNumberCheck();" onBlur="calcCreateTerms();"  dataformat="excepthan" style="ime-mode:disabled;width:57px;text-align:left">
	              </td>
	               <th><bean:message key="Amount_Due"/></th>
	               <td><input type="text" name="f_amt_due" value="" style="width:105px;text-align:right" class="search_form-disable" readOnly></td>
	               
	          	<!-- #5333 [STAR CLUSTER MEXICO] TAX INVOICE NO FIELD ADD TO D/C ENTRY -->
		      	<th><bean:message key="Tax"/>&nbsp;<bean:message key="Invoice_No"/></th>
				<td>
					<input type="text" name="f_tax_no" value="" style="ime-mode:disabled; text-transform:uppercase;width:105px" dataformat="excepthan" maxlength="20" onBlur="strToUpper(this);" >
				</td>         

	              <th style="display:none" <!-- #3181 -->><label for="f_tax_bill"><bean:message key="Tax_Bill"/></label></th>
	              <td style="display:none" <!-- #3181 --><input type="checkbox" name="f_tax_bill" id="f_tax_bill" value="Y"></td>
	          </tr>
	          <tr>
	             <th rowspan="3"><bean:message key="Memo"/></th><!--#320 Remark in AR/AP Entry screen connected Memo in invoice document-->
	             <td rowspan="3" colspan="3"><textarea name="f_remark" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);"  dataformat="excepthan" style="width:477px;height:50px;"></textarea></td>
	         </tr>
	         <!-- #1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form] -->
	         <tr style="top:0px">
              <th><bean:message key="Paid_Amount"/></th>
              <td><input type="text" name="f_paid_amt" value="" style="width:105px;text-align:right" class="search_form-disable" readOnly></td>
              <th><bean:message key="Voucher_Type"/></th>
	          	<td>
	          		<bean:define id="vchrTpCdList" name="valMap" property="vchrTpCdList"/>
	                <html:select name="valMap" property="f_vchr_tp_cd" style="width:105px;">
	                    <option value=""></option>
	                    <html:options collection="vchrTpCdList" property="cd_val" labelProperty="cd_nm"/>
	                </html:select>
	          	</td>
	         	
	         </tr>
	         <tr>
	         	<td></td>
	         	<td></td>
	         	<th><bean:message key="Voucher_No"/></th>
	      	 	<td>
	      	 		<input type="text" name="f_vchr_no" maxlength="20" onBlur="strToUpper(this);" onclick="if(this.value=='AUTO'){this.value=''}" style="ime-mode:disabled; text-transform:uppercase;width:105px" dataformat="excepthan" >
	      	 	</td>
	         </tr>
	         </tbody>
       </table>
    </div>
<script>
function goSetDfltFrt() {
	var formObj = document.frm1;
	var vf_air_sea_clss_cd = formObj.f_air_sea_clss_cd.value;
	var vf_bnd_clss_cd =  formObj.f_bnd_clss_cd.value;
	var vf_biz_clss_cd =  formObj.f_biz_clss_cd.value;
	
	setDfltFrtInvDC('dc_', vf_air_sea_clss_cd, vf_bnd_clss_cd, vf_biz_clss_cd);
}

</script>
<table class="line_bluedot"><tr><td></td></tr></table>
   	<div class="opus_design_grid">
		<div class="opus_design_grid">
	 		<div class="opus_design_btn"><!-- 
			--><button id="rowAddBtn4" type="button" class="btn_accent" onclick="goSetDfltFrt();"><bean:message key="Default"/> <bean:message key="New"/></button><!-- 
			--><button id="rowAddBtn2" type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
			--><button id="autoBtn2" type="button" class="btn_normal" onclick="doWork('AUTO')"><bean:message key="Auto"/></button><!-- 
			--><button id="autoBtn4" type="button" class="btn_normal" onclick="doWork('AUTOOF')"><bean:message key="Auto(O/F)"/></button><!-- 
			--><button id="pscalBtn2" type="button" class="btn_normal" onclick="doWork('PSCAL')"><bean:message key="PS_Cal"/></button>
	 		</div>
		</div>
   		<script type="text/javascript">comSheetObject('sheet1');</script>
		<script type="text/javascript">comSheetObject('sheet2');</script>
		<script type="text/javascript">comSheetObject('sheet3');</script>
		<script type="text/javascript">comSheetObject('sheet4');</script>
		<script type="text/javascript">comSheetObject('sheet5');</script>
   	</div>
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="600"/>
				<col width="100"/>
				<col width="120"/>
				<col width="100"/>
				<col width="120"/>
				<col width="100"/>
				<col width="*" />				
			</colgroup> 
			<tr>
				<td></td>
				<th><bean:message key="Debit_Amount"/></th>
                <td><input type="text" name="f_debit_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
				<th><bean:message key="Credit_Amount"/></th>
                <td><input type="text" name="f_credit_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
				<th><bean:message key="Total_Amount"/></th>
                <td><!--
                --><input type="hidden" name="f_amt_tot" value="" style="width:100px;text-align:right" class="search_form-disable" readOnly><!--
                --><input type="hidden" name="f_vatamt_tot" value="" style="width:100px;text-align:right" class="search_form-disable" readOnly><!--
                --><input type="text" name="f_totamt_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
			</tr>
		</table>
	</div>
</div>
</div>
</form>

<script type="text/javascript">
fnbtnCtl(1);// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
</script>	


