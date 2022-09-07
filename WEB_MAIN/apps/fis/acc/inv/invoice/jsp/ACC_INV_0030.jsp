<%--
=========================================================
*@FileName   : ACC_INV_0030.jsp
*@FileTitle  : AP Invoice
*@Description: AP Invoice
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/11
*@since      : 2011/11/11

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
<%
	//WMS ACCOUNT LKH 2015.01.20
	String wmsUseFlag = (String)application.getAttribute("WMS_USE_FLAG");
	if(wmsUseFlag == null){wmsUseFlag = "N";}

	//LKH::2015-11-03 WMS4.O
	String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
	if(wmsUseVer == null){wmsUseVer = "";}

	//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
	String wmsRuPoint = (String)application.getAttribute("FRT_RATE_POINT_EIGHT_YN");
	if(wmsRuPoint == null){wmsRuPoint = "N";}
%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>

	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/acc/inv/invoice/script/ACC_INV_0030.js?ver=<%=CLT_JS_VER%>" ></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();

		//User Role
		String dp_flg 		= userInfo.getDp_flg();
		String fb_flg 		= userInfo.getFb_flg();
		String jo_flg 		= userInfo.getJo_flg();
		String oo_flg 		= userInfo.getOo_flg();
		String efc_flg 		= userInfo.getEfc_flg(); //EDIT AFTER CREATING INVOICES
		String sys_cd = (String)request.getParameter("sys_cd");
		String wms_no = "";
		//String arrfrt_seq[];
		//String wms_frt_seq = "";
		if("WMS".equals(sys_cd)){
			wmsUseFlag = "Y";
			wms_no = request.getParameter("wms_no") != null ? (String)request.getParameter("wms_no") : "";
			/*
			arrfrt_seq = request.getParameterValues("chk_fr_frt_seq");

			if(arrfrt_seq != null && arrfrt_seq.length > 0){

				for(int i = 0 ; i < arrfrt_seq.length; i++){
					wms_frt_seq += arrfrt_seq[i];

					if(i < arrfrt_seq.length - 1 ){
						wms_frt_seq += "|";
					}
				}
			}
			*/
		}
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
			
			if(formObj.f_curr_cd.value == ""){
				// #138 - #50179 - [BINEX MEXICO] DEFAULT B/L CURRENCY VS. ACCT REPORTS DEFAULT B/L CURRENCY|Enhanced AR invoi
				//formObj.f_curr_cd.value = '<bean:write name="blinfoVO" property="curr_cd"/>';
				//formObj.f_curr_cd.value = ofc_locl_curr_cd;
				<!-- WMS #1069 Closing other entry -->
				if('<%=wmsUseVer%>' == 'VER4.0' && formObj.f_wms_seq.value != ''){
					formObj.f_curr_cd.value = '<bean:write name="blinfoVO" property="curr_cd"/>';
				} else {
					formObj.f_curr_cd.value = ofc_locl_curr_cd;
				}
			}

			if(formObj.f_inv_seq.value == ""){
				formObj.f_inco_cd.value = '<bean:write name="blinfoVO" property="inco_cd"/>';
			}

			//#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
			if(formObj.f_inv_seq.value == "" ){
				if(formObj.f_loc_ex_rate.value == "" || formObj.f_loc_ex_rate.value == "0"){
					getLoclExRate();
				}				
			}			
			
			
			/*
			//TERM_CD 셋팅
			formObj.f_terms.value = '<bean:write name="blinfoVO" property="term_cd"/>';
			formObj.f_term_dt.value = '<bean:write name="blinfoVO" property="term_dt"/>';

			if(formObj.f_intg_bl_seq.value != "" || formObj.f_oth_seq.value != ""){
				if(formObj.f_terms[0].selected){
					//formObj.f_due_dt.value = f_inv_dt;
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
		<!-- AP Invoice Remark -->
		var remark ="";
		<logic:notEmpty name="valMap" property="remarkList">
	        	<bean:define id="remarkList" name="valMap" property="remarkList"/>
	        	<logic:iterate id="codeVO" name="remarkList">
	        		remark += '<bean:write name="codeVO" property="cd_nm"/>' + '\r\n';
	        	</logic:iterate>
    	</logic:notEmpty>

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
				<% boolean isBegin4 = false; %>
		        <bean:define id="unitList" name="valMap" property="UNITCD"/>
		        <logic:iterate id="codeVO" name="unitList">
		            <% if(isBegin4){ %>
		                UNITCD1+= '|';
		                UNITCD2+= '|';
		            <% }else{
		                  isBegin4 = true;
		               } %>
		            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
		            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
		        </logic:iterate>
	    	</logic:notEmpty>

	    	<logic:empty name="valMap" property="AIR_UNITCD">
			<%
				boolean isBegin4 = false;
				if(wms_no != ""){
			%>
		        <bean:define id="unitList" name="valMap" property="UNITCD"/>
		        <logic:iterate id="codeVO" name="unitList">
		            <% if(isBegin4){ %>
		                UNITCD1+= '|';
		                UNITCD2+= '|';
		            <% }else{
		                  isBegin4 = true;
		               } %>
		            UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
		            UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
		        </logic:iterate>
	        <%}%>
		</logic:empty>

	    	<!-- WMS #1069 Closing other entry -->
	    	<logic:notEmpty name="valMap" property="WMS_UNITCD">
				<%
					boolean isBegin4 = false;
				%>
			        <bean:define id="unitList" name="valMap" property="WMS_UNITCD"/>
			        <logic:iterate id="codeVO" name="unitList">
			            <% if(isBegin4){ %>
			                UNITCD1+= '|';
			                UNITCD2+= '|';
			            <% }else{
			                  isBegin4 = true;
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

        <!--  ###VAT Code List 항목### -->
        <!-- #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함 -->
		var VAT_CD = ' |';
		var VAT_VAL = ' |';
        <logic:notEmpty name="valMap" property="VAT_CD_LIST">
			<% boolean isBegin7 = false; %>
            <bean:define id="VatCdList" name="valMap" property="VAT_CD_LIST"/>
            <logic:iterate id="codeVO" name="VatCdList">
                <% if(isBegin7){ %>
                	VAT_CD+= '|';
                	VAT_VAL+= '|';
                <% }else{
                      isBegin7 = true;
                   } %>
                   	VAT_CD+= '<bean:write name="codeVO" property="vat_cd"/>';
                	/* VAT_VAL+= '<bean:write name="codeVO" property="vat_cd"/>' + "(" + ' <bean:write name="codeVO" property="tax_rate"/>' + "%)" ; */
                	VAT_VAL+= '<bean:write name="codeVO" property="vat_cd"/>';
            </logic:iterate>
        </logic:notEmpty>

        <!-- ###FRT_CD LIST 항목### -->
		var FRTCD1 = ' |';
		var FRTCD2 = ' |';
		var VAT_FRT_CD = '';
		// #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함
		var ARR_VAT_FRT_CD = new Array();
		var ARR_TAX_RATE = new Array();
		var WHLD_VAT_FRT_CD = '';
        <logic:notEmpty name="valMap" property="FRT_CD_LIST">
			<% boolean isBegin6 = false; %>
			<% int vatIndex = 0; %>
            <bean:define id="FRT_CD_LIST" name="valMap" property="FRT_CD_LIST"/>
	            <logic:iterate id="codeVO" name="FRT_CD_LIST">
		            <logic:match name="codeVO" property="FRT_CLSS_CD" value="VAT">
						VAT_FRT_CD = '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
						ARR_VAT_FRT_CD[<%=vatIndex%>] = '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
						ARR_TAX_RATE[<%=vatIndex%>] = '<bean:write name="codeVO" property="TAX_RATE" filter="false"/>';
						<% vatIndex++; %>
	        		</logic:match>
	        		<logic:match name="codeVO" property="FRT_CLSS_CD" value="WHD">
            			WHLD_VAT_FRT_CD = '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
        			</logic:match>
	                <% if(isBegin6){ %>
	                	FRTCD1+= '|';
	                	FRTCD2+= '|';
	                <% }else{
	                      isBegin6 = true;
	                   } %>
	                   FRTCD1+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
	                   FRTCD2+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>' + ": " + '<bean:write name="codeVO" property="FRT_CD_LOCL_NM" filter="false"/>';
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
      	//#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한
        var credit_limit = "<%= userInfo.getCredit_limit() %>";	
		//#3411 [JTC]Accounting & Performance 수정사항
		var AUTO_VAT_CALCULATING_AP = 'N';
		<logic:notEmpty name="valMap" property="AUTO_VAT_CALCULATING_AP">
			<bean:define id="AUTO_VAT_CALCULATING_AP" name="valMap" property="AUTO_VAT_CALCULATING_AP" />
			AUTO_VAT_CALCULATING_AP = '<bean:write name="AUTO_VAT_CALCULATING_AP" property="opt_val"/>';
		</logic:notEmpty>


		//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
        <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>

		var vat_rt_dp_cnt = Number("<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>");
		var xch_rt_dp_cnt = Number("<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>");

		//#138 Office Local Currency
		var ofc_locl_curr_cd = "<bean:write name="ofcVO" property="locl_curr_cd"/>";

	</script>
<script>

	function isWMS(){
		return '<%= sys_cd%>' == 'WMS';
	}

	function setupPage(){
		loadPage();
		setSelect();

		//LKH::2015-11-03 WMS4.O
    	if('<%=wmsUseVer%>' == 'VER4.0'){
    		gJsWmsVer = 'VER4.0';
    		//WMS4.0 RATE 자리수 소수점 8자리 까지 늘림
    		gJsWmsRuPoint = '<%=wmsRuPoint%>';
    		wmsDocCheck('ALL');
    	}
		//setTimeout(function(){
		//	if('<%= sys_cd%>' == 'WMS'){
	    //		onLoadWarehouse();
	    //	}
		//},100);
	}
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";

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
			//alert(args + " "+efc_flg);
		var btnflag = "Y";

		//f_inv_seq가 Edit 일 경우에만  아래 조건 수행하도록 수정..( Create 일 경우에는 기존로직 유지 )
		//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
		edoa_flg 		= "<%=userInfo.getEdoa_flg()%>"; //Enable Editing Other Office (ACCT)
		ofc_cd = "<%=ofc_cd%>";
		ref_ofc_cd =  	formObj.f_ref_no_dtl.value;
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
			}
 

			if (btnflag == "Y"){
				//Enable Editing Other Office (ACCT)

				//alert(edoa_flg + " "+ofc_cd+" "+ref_ofc_cd);
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
				}
			}
		}// End.   if(formObj.f_inv_seq.value.length > 0)
	}

</script>
<form name="frm1" method="POST" action="./ACC_INV_0030.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="old_trdp_cd"/>
	<input type="hidden" name="f_intg_bl_seq" 		value="<bean:write name="blinfoVO" property="intg_bl_seq"/>"/>
	<input type="hidden" name="f_oth_seq" 			value="<bean:write name="blinfoVO" property="oth_seq"/>"/>

	<input type="hidden" name="s_inv_flg" value="AP"/><!-- #1165 -->
	<!-- WMS ACCOUNT LKH 2015.01.20 -->
	<input type="hidden" name="f_wms_seq" 			value="<bean:write name="blinfoVO" property="wms_seq"/>"/>
	<input type="hidden" name="temp_wms_no" 			value="<bean:write name="blinfoVO" property="wms_no"/>"/>
	<input type="hidden" name="f_wms_cntr_info" 	value="<bean:write name="blinfoVO" property="wms_cntr_info"/>"/> <!-- #1069 Closing other entry  -->

    <!-- <input type="hidden" name="f_frt_seq" 			value="<//%= wms_frt_seq %>"/> -->

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

	<input type="hidden" name = "f_old_sum_amt">

	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<input type="hidden" name="rpt_pdf_file_nm"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->


	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>

	<!--  User Role Accounting 관련 -->
	<input	type="hidden" name="dp_flg" value="<%= dp_flg %>"/>
	<input	type="hidden" name="fb_flg" value="<%= fb_flg %>"/>
	<input	type="hidden" name="jo_flg" value="<%= jo_flg %>"/>
	<input	type="hidden" name="oo_flg" value="<%= oo_flg %>"/>
	<!--마감된 invoice에 대하여 수정권한이 있는 사람이 수정을 했을 경우 frt.post_dts는  form의 post_dt가 아님-->
	<input type="hidden" name = "f_edit_post_dt" value=""/>

	<!-- 마감 FLAG -->
	<input type="hidden" name = "f_clt_cmpl_flg">
	<input type="hidden" name = "f_today_dt">

	<input type="hidden" name = "old_post_dt" value="<bean:write name="blinfoVO" property="post_dt"/>"/>
	<input type="hidden" name = "slip_post"   value="<bean:write name="blinfoVO" property="slip_post"/>"/>
	<input type="hidden" name = "block_post"  value="<bean:write name="blinfoVO" property="block_post"/>"/>
	<input type="hidden" name = "max_jnr_dt"  value="<bean:write name="valMap" property="max_jnr_dt"/>"/>

	<input type="hidden" name = "post_dt_inv"  value="<bean:write name="blinfoVO" property="post_dt_inv"/>"/>

	<!-- check freight -->
    <input type="hidden" name="chk_fr_trdp_cd"      value="<bean:write name="blinfoVO" property="chk_fr_trdp_cd"/>"/>
    <input type="hidden" name="chk_fr_inv_curr_cd"  value="<bean:write name="blinfoVO" property="chk_fr_inv_curr_cd"/>"/>
    <input type="hidden" name="chk_fr_frt_seq"  	value="<bean:write name="blinfoVO" property="chk_fr_frt_seq"/>"/>

	<input type="hidden" name="f_agent_chg_wgt" 		value="<bean:write name="blinfoVO" property="agent_chg_wgt"/>"/>
    <input type="hidden" name="f_agent_grs_wgt" 		value="<bean:write name="blinfoVO" property="agent_grs_wgt"/>"/>
    <!-- #1773 [PATENT] Freight Default Unit Option -->
    <input type="hidden" name="f_shp_mod_cd" 		value="<bean:write name="blinfoVO" property="shp_mod_cd"/>"/>

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

		<!--  Invoice 정보 변경여부 확인 -->
	<input type="hidden" name="f_modi_tms" value="">

	<input type="hidden" name="m_intg_bl_seq" value="<bean:write name="blinfoVO" property="m_intg_bl_seq"/>">

	<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
	<input type="hidden" name="locl_ttl_amt" value="">	
	<!-- #3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
	<input type="hidden" name="f_ofc_locl_curr_cd" value="">
	<!-- 	#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한 -->
	<input type="hidden" name="f_cust_cd" value="<bean:write name="blinfoVO" property="act_shpr_trdp_cd"/>">
	<input type="hidden" name="f_shp_cd" value="<bean:write name="blinfoVO" property="shpr_trdp_cd"/>">
	<input type="hidden" name="f_cnee_cd" value="<bean:write name="blinfoVO" property="cnee_trdp_cd"/>">
	
	<!-- [OFVFOUR-6997] - [Binex-LA] Balance mismatch issue: check freight has invoice -->
	<input type="hidden" name="f_frt_modi_tms" value="">

	<!-- OFVFOUR-7746: [SENKO USA] Add HB/L no. to Title field on emails for D/N and C/N -->
	<input type="hidden" name="chkMailAr" value="<bean:write name="valMap" property="chkMailAR"/>"/>
	<input type="hidden" name="chkMailAp" value="<bean:write name="valMap" property="chkMailAP"/>"/>
	<input type="hidden" name="chkMailDc" value="<bean:write name="valMap" property="chkMailDC"/>"/>
	
	<!-- OFVFOUR-8205 [AZ Cargo] Display the file name when sending invoice emails -->
	<input	type="hidden" name="attachFileName" value=""/>

<!-- Button -->
<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%--
		   <button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="goSearchInv();" style="display:none;"><bean:message key="Search"/></button>
		   <span id="saveBtn2" style="display:none" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')"><button id="btnModify" type="button" class="btn_normal"><bean:message key="Save"/></button></span>
		   <button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
		   <!-- <span id="deleteBtn2" onclick="doWork('DELETE')"><button id="btnDelete" type="button" class="btn_normal" style="display:none;" ><bean:message key="Delete"/></button></span> -->
		   <span style="display:none" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('PRINT')"><button id="btnPrint" type="button" class="btn_normal"><bean:message key="Print"/></button></span>
		   <button id="btnPrintBlock" type="button" btnAuth="PRINT_BLOCK" class="btn_normal" onclick="doWork('PRINT_BLOCK')" style="cursor:hand; display:none"><bean:message key="Print_L"/></button>
		   <button style="display:none" type="button"  btnAuth="CLEAR" class="btn_normal" onclick="clearAll()"><bean:message key="Clear"/></button>
		   <button style="display:none" id="btnPrint" type="button"  btnAuth="P_REPORT" class="btn_normal" onclick="doWork('PROFIT_REPORT');"><bean:message key="P_Report"/></button>
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
<script language='javascript'>

	function goSearchInv() {
		var frmObject = document.frm1;
		//WMS ACCOUNT LKH 2015.01.20
		if (frmObject.s_bl_no.value  != '') {
			enterBlCmmInfo('Y');
		} else if (frmObject.s_ref_no.value != '') {
			enterRefInfo('Y');
		} else if (frmObject.s_oth_no.value != '') {
			enterOtherInfo('Y');
		} else if (frmObject.s_wms_no.value != '') {
			enterWarehouseInfo('Y');
		}
	}


	var AUTOCOMPLETE_YN = 'N';
	<logic:notEmpty name="valMap" property="autocompleteYn">
		AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	</logic:notEmpty>

</script>
<!-- Search option -->
<div class="over_wrap" height="100%">
<div class="wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<tr>
				<th width="60px"><bean:message key="BL_No"/></th>
				<td width="140px"><input type="text" name="s_bl_no"  maxlength="40" value=""  dataformat="excepthan"  style="ime-mode:disabled;width:115px;text-transform:uppercase;" onBlur="strToUpper(this);" onKeyDown="enterBlCmmInfo();"></td>
				<th width="100px"><bean:message key="Ref_No"/></th>
				<td width="140px"><input type="text" name="s_ref_no"  maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onBlur="strToUpper(this);" onKeyDown="enterRefInfo();"></td>
				<th width="70px"><bean:message key="Other_No"/></th>
				<td width="140px"><input type="text" name="s_oth_no"  maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled;width:115px;text-transform:uppercase;" onBlur="strToUpper(this);" onKeyDown="enterOtherInfo();"></td>
				<!-- WMS ACCOUNT LKH 2015.01.20 -->
				<th width="70px"><%if("Y".equals(wmsUseFlag)){%><bean:message key="WMS_No"/><%}%></th>
				<td width="140px"><input type="text" name="s_wms_no"  maxlength="20" value="<%= wms_no %>" dataformat="excepthan" style="display:<%="Y".equals(wmsUseFlag)?"inline":"none"%>;ime-mode:disabled;width:115px;text-transform:uppercase;" onBlur="strToUpper(this);" onKeyDown="enterWarehouseInfo();"></td>
				<td></td>
			</tr>
		</table>
	</div>
</div>

<div class="wrap_result">
	<div class="layout_wrap">
		<div class="layout_vertical_4 pad_left_4" style="width: 280px">
			<div class="opus_design_inquiry">
				<table>
				         <colgroup>
  							<col width="103px;" />
  							<col width="*" />
  					   	</colgroup>
  					<tbody>
					<tr>
						<th><bean:message key="Ref_No"/></th>
		               <td><!--
		               --><input type="text" name="f_ref_no" value="<bean:write name="blinfoVO" property="ref_no"/>" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:130px" class="search_form-disable" readOnly><!--
		               --><input type="text" name="f_ref_no_dtl" value="<bean:write name="blinfoVO" property="ref_ofc_cd"/>" style="width:58px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="MBL_No"/></th>
               			<td><input type="text" name="f_mbl_no" value="<bean:write name="blinfoVO" property="mbl_no"/>" style="width:192px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="HBL_No"/></th>
			            <td><!--
			               --><logic:equal name="blinfoVO" property="biz_clss_cd" value="M"><!--
			               --><input type="text" name="f_hbl_no" value="<bean:write name="blinfoVO" property="hbl_no"/>" style="width:192px" ><!--
			               --></logic:equal><!--
			               --><logic:notEqual name="blinfoVO" property="biz_clss_cd" value="M"><!--
			               --><input type="text" name="f_hbl_no" value="<bean:write name="blinfoVO" property="hbl_no"/>" style="width:192px" class="search_form-disable" readOnly><!--
			               --></logic:notEqual></td>
					</tr>
					<tr>
						<th><bean:message key="Carrier_Bkg_No"/></th>
               			<td><input type="text" name="f_lnr_bkg_no" value="<bean:write name="blinfoVO" property="lnr_bkg_no"/>" style="width:190px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Agent"/></th>
              			<td><input type="text" name="f_agent" value="<bean:write name="blinfoVO" property="agent_trdp_nm"/>" style="width:192px" class="search_form-disable" readOnly></td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
		<div class="layout_vertical_4 pad_left_4" style="width: 320px">
			<div class="opus_design_inquiry">
				<table>
				<colgroup>
  							<col width="180px;" />
  							<col width="*" />
  			   </colgroup>
  			   <tbody>
					<tr>
						<th><bean:message key="Shipper"/></th>
	           			<td><input type="text" name="f_shpr_nm" value="<bean:write name="blinfoVO" property="shpr_trdp_nm"/>" style="width:160px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Consignee"/></th>
	           			<td><input type="text" name="f_cnee_nm" value="<bean:write name="blinfoVO" property="cnee_trdp_nm"/>" style="width:160px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="Notify"/></th>
		               	<td>
		                 	<input type="text" name="f_ntfy_trdp_nm" value="<bean:write name="blinfoVO" property="ntfy_trdp_nm"/>" style="width:160px" class="search_form-disable" readOnly>
					</tr>
					<tr>
						<th><bean:message key="Vessel_Flight_No"/></th>
	        			<td><input type="text" name="f_vsl_flt" value="<bean:write name="blinfoVO" property="vsl_flt"/>" style="width:160px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="POR"/></th>
	          			<td><input type="text" name="f_por_nm" value="<bean:write name="blinfoVO" property="por_nm"/>" style="width:160px" class="search_form-disable" readOnly></td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
		<div class="layout_vertical_4 pad_left_4" style="width: 320px">
			<div class="opus_design_inquiry">
				<table>
				<colgroup>
  							<col width="180px;" />
  							<col width="*" />
  			   </colgroup>
  			   <tbody>
					<tr>
						<th><bean:message key="POL_ETD"/></th>
		               <td><!--
		               --><input type="text" name="f_pol_nm" value="<bean:write name="blinfoVO" property="pol_nm"/>" style="width:120px" class="search_form-disable" readOnly><!--
		               --><input type="text" name="f_etd_dt"  value="<bean:write name="blinfoVO" property="etd_dt_tm"/>" style="width:70px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="POD_ETA"/></th>
		               <td><!--
		               --><input type="text" name="f_pod_nm" value="<bean:write name="blinfoVO" property="pod_nm"/>" style="width:120px" class="search_form-disable" readOnly><!--
		               --><input type="text" name="f_eta_dt"  value="<bean:write name="blinfoVO" property="eta_dt_tm"/>" style="width:70px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="DEL"/></th>
	        			<td><input type="text" name="f_del_nm" value="<bean:write name="blinfoVO" property="del_nm"/>" style="width:193px" class="search_form-disable" readOnly></td>
					</tr>
					<tr>
						<th><bean:message key="F_Dest_ETA"/></th>
		              <td><!--
		               --><input type="text" name="f_fnl_dest_loc_nm" value="<bean:write name="blinfoVO" property="fnl_dest_loc_nm"/>" style="width:120px" class="search_form-disable" readOnly><!--
		               --><input type="text" name="f_feta_dt" value="<bean:write name="blinfoVO" property="f_eta_dt_tm"/>" style="width:70px" class="search_form-disable" readOnly></td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
		<div class="layout_vertical_4 pad_left_4">
			<div class="opus_design_inquiry">
				<table>
				<colgroup>
  					<col width="100"/>
					<col width="90"/>
					<col width="41"/>
					<col width="90"/>
					<col width="*" />
  			   </colgroup>
  			   <tbody>
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
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<table class="line_bluedot"><tr><td></td></tr></table>
        <div class="opus_design_inquiry">
         <table>
	    	<colgroup>
	    		<col width="120px"></col>
	    		<col width="200px"></col>
	    		<col width="110px"></col>
	    		<col width="200px"></col>
	    		<col width="90px"></col>
	    		<col width="100px"></col>
	    		<col width="85px"></col>
	    		<!-- #2189 [BNX][INDIA] AP Actual Shipper & CNEE 추가 // 1 Master 3 House -->
	    		<col width="120px"></col>
	    		<col width="140px"></col>
	    		<col width="*"></col>
	    	</colgroup>
	    	<tbody>
	          <tr>
	          	<td colspan="2"><h3 class="title_design mar_btm_4 mar_top_8"><bean:message key="Billing_Information"/></h3></td>
	          </tr>
	          <tr>
              <th><bean:message key="Vendor"/></th>
              <td><!--
               --><input required type="text" name="f_vendor_cd" maxlength="20" value="<bean:write name="blinfoVO" property="prnr_trdp_cd"/>" onKeyDown="codeNameAction('VENDOR',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('VENDOR',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" ><!--
               --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('CUSTOMER_POPLIST')"></button><!--
               --><input required type="text" name="f_vendor_nm" maxlength="100" value="<bean:write name="blinfoVO" property="prnr_trdp_nm"/>" onKeyPress="if(event.keyCode==13){custEnterAction(this,'CUSTOMER_NAME');}" onblur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:109px" ></td> <!-- #2111 [PATENT] DEPOSIT/PAYMENT ENTRY FOR CN 화면 CUSTOMER 항목 명칭 변경 및 추천 항목 표시 -->

               <th><bean:message key="Posting_Date"/></th>
	           <td><input type="text" name="f_post_dt" value="<bean:write name="blinfoVO" property="post_dt"/>" style="width:75px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);checkPostDate(this);" maxlength="10" class="search_form-disable" readOnly></td>

	           <th><bean:message key="Currency"/></th>
			   <td><!--#3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영
               --><select required name="f_curr_cd" style="width:70px;" onChange="setCurrency();getLoclExRate();"><!--
               --><option value=""></option><!--
               --><bean:define id="paramCurrList"  name="valMap" property="currList"/><!--
               --><logic:iterate id="CurrVO" name="paramCurrList"><!--
               --><option value='<bean:write name="CurrVO" property="cd_val"/>'><bean:write name="CurrVO" property="cd_val"/></option><!--
               --></logic:iterate><!--
               --></select></td>

               <th><bean:message key="Last_CK_No"/></th>
			   <td><input type="text" name="f_last_ck" value="" style="width:140px" class="search_form-disable" readOnly></td>

			   <!-- #2189 [BNX][INDIA] AP Actual Shipper & CNEE 추가 // 1 Master 3 House -->
			   <th><bean:message key="A_Shipper"/></th>
               <td><!--
               --><input type="text" name="f_act_shpr_trdp_nm" maxlength="50" value="<bean:write name="blinfoVO" property="act_shpr_trdp_nm"/>" onKeyPress="if(event.keyCode==13){doWork('ASHIP_TRDP_POPLIST_NAME');}" onblur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:109px" ><!--
               --><button type="button" class="input_seach_btn" tabindex="-1" id="" onclick="doWork('ASHIP_TRDP_POPLIST')"></button></td> <!-- id 중복 버그 -->
          </tr>
          <tr>
              <th><bean:message key="Vendor_Invoice_No"/></th>
              <td><input type="text" name="f_inv_no" maxlength="50" value="<bean:write name="blinfoVO" property="inv_no"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:192px"  onBlur="strToUpper(this);chkInvRcv(this);"></td>

              <th><bean:message key="Invoice_Date"/></th>
              <td><!--
               --><input required type="text" id="f_inv_dt" name="f_inv_dt" value="<bean:write name="blinfoVO" property="inv_dt"/>" style="width:75px" onKeyUp="mkDateFormatType(this, event, false,1);enterInvDt();" onBlur="mkDateFormatType(this, event, true,1);changeInvDt();" maxlength="10" ><!--
               --><button type="button" id="f_inv_dt_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1"></button>
               	<input type="hidden" name="pre_inv_dt" value="<bean:write name="blinfoVO" property="inv_dt"/>" />
               </td>

		 		 <!-- #3505_ [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 -->
				<th><div id="th_ex_rate" style="display:none;"><bean:message key="Local_Ex_Rate"/></div></th>
				<td>
					<div id="td_ex_rate" style="display:none;">
					<input type="text" name="f_loc_ex_rate" id="f_loc_ex_rate" maxlength="15" value=""  dataformat="float" style="ime-mode:disabled; text-transform:uppercase;width:70px;text-align:right" class="search_form">
					</div>
				</td>
			   <th><bean:message key="Last_Paid_Date"/></th>
               <td nowrap><!--
               --><input type="text" id="f_last_paid_dt_cal" name="f_last_paid_dt_cal" style="width:105px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Last Paid Date');" maxlength="10" ><!--
               --><button type="button" id="dateImg4" onclick="doDisplay('DATE4', frm1);" class="calendar" tabindex="-1"></button></td>

               <!-- #2189 [BNX][INDIA] AP Actual Shipper & CNEE 추가 // 1 Master 3 House -->
               <th><bean:message key="Actual_Consignee"/></th>
               <td><!--
               --><input type="text" name="f_act_cnee_trdp_nm" maxlength="50" value="<bean:write name="blinfoVO" property="act_cnee_trdp_nm"/>" onKeyDown="custEnterAction(this,'A_CONSIGNEE_NAME')" onblur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:109px" ><!--
               --><button type="button" class="input_seach_btn" tabindex="-1" id="" onclick="doWork('ACON_TRDP_POPLIST')"></button></td>  <!-- id 중복 버그 -->
          </tr>
	      <tr>
              <th><label for="f_buy_inv_rcv"><bean:message key="Invoice_Received"/></label></th>
              <td><input type="checkbox" name="f_buy_inv_rcv" id="f_buy_inv_rcv" value="Y"></td>

              <th><bean:message key="Terms"/></th>
              <td><!--
               --><select name="f_terms"  dataformat="excepthan" style="ime-mode:disabled;width:125px;text-align:left" onchange="javascript:calcCreateTerms();"><!--
               --><option value=""></option><!--
               --><bean:define id="paramTermsList"  name="valMap" property="termsList"/><!--
               --><logic:iterate id="TermsVO" name="paramTermsList"><!--
               --><option value='<bean:write name="TermsVO" property="cd_val"/>'><bean:write name="TermsVO" property="cd_nm"/></option><!--
               --></logic:iterate><!--
               --></select><!--
               --><input type="text" name="f_term_dt" value="" onKeyDown="enterCalcCreateTerms();" onKeyPress="onlyNumberCheck();" onBlur="calcCreateTerms();"  dataformat="excepthan" style="ime-mode:disabled;width:30px;text-align:left"></td>
               <th><bean:message key="Amount_Due"/></th>
			   <td><input type="text" name="f_amt_due" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly></td>
			   <th><bean:message key="Incoterms"/></th>
               <td><!--
               --><select name="f_inco_cd" style="width:105px;"><!--
               --><option value=""></option><!--
               --><bean:define id="incotermsList"  name="valMap" property="incotermsList"/><!--
               --><logic:iterate id="IncotermsVO" name="incotermsList"><!--
               --><option value='<bean:write name="IncotermsVO" property="cd_val"/>'><bean:write name="IncotermsVO" property="cd_nm"/></option><!--
               --></logic:iterate><!--
               --></select></td>
               
          	<th><bean:message key="Voucher_Type"/></th>
          	<td>
          		<bean:define id="vchrTpCdList" name="valMap" property="vchrTpCdList"/>
                <html:select name="valMap" property="f_vchr_tp_cd" style="width:100px;">
                    <option value=""></option>
                    <html:options collection="vchrTpCdList" property="cd_val" labelProperty="cd_nm"/>
                </html:select>
          	</td>               
          </tr>
          <tr>
         	<% if("IN".equals(cnt_cd)){ %>
          	<th><bean:message key="Inv_No"/></th>
            <td><input type="text" name="o_inv_no" maxlength="50" value="<bean:write name="blinfoVO" property="o_inv_no" />" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:192px" readOnly onBlur="strToUpper(this);chkInvRcv(this);"></td>
          	<%}else{%>
          	<td></td>
          	<td></td>
          	<%}%>
          	<th><bean:message key="Due_Date"/></th>
            <td><!--
               --><input required type="text" id="f_due_dt" name="f_due_dt" value="" style="width:75px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Due Date');" maxlength="10" ><!--
               --><button type="button" id="f_due_dt_cal" onclick="doDisplay('DATE3', frm1);" class="calendar" tabindex="-1"></button></td>
          	<!-- #1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form] -->
               <th><bean:message key="Paid_Amount"/></th>
			   <td nowrap><input type="text" name="f_paid_amt" value="" style="width:70px;text-align:right" class="search_form-disable" readOnly></td>
			   
          	<th style="display:none" <!-- #3181 -->><label for="f_tax_bill"><bean:message key="Tax_Bill"/></label></th>
		    <td style="display:none" <!-- #3181 -->><input type="checkbox" name="f_tax_bill" id="f_tax_bill" value="Y"></td>
		    <!-- #6307 [Starcluster-MEX] Add tax Inv No in aging, local and agent statement (Zen#2159) -->
			<th><bean:message key="Tax"/>&nbsp;<bean:message key="Invoice_No"/></th>
            <td>
                <input type="text" name="f_tax_no" value="" style="ime-mode:disabled; text-transform:uppercase;width:105px" dataformat="excepthan" maxlength="20" onBlur="strToUpper(this);" >
                <div style="display:none"> <!-- #3181 [LBS] Tax Bill Flag 제거 -->
                	<label for="exID01"><b><bean:message key="Tax_Bill"/></b></label>
                	<input type="checkbox" name="f_tax_bill" value="Y" id="exID01">
                </div>
            </td>
      	 	<th><bean:message key="Voucher_No"/></th>
      	 	<td>
      	 		<input type="text" name="f_vchr_no" maxlength="20" onBlur="strToUpper(this);" onclick="if(this.value=='AUTO'){this.value=''}" style="ime-mode:disabled; text-transform:uppercase;width:100px" dataformat="excepthan" >
      	 	</td>
      	 			    
          </tr>
          <tr>
            <th rowspan="3"><bean:message key="Remark"/></th>
            <td rowspan="3" colspan="3"><textarea name="f_remark" maxlength="500" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);"  dataformat="multiLanguage" style="width:470px;height:50px;"></textarea></td>

      	 </tr>

      	 <tr>
      	 	<th>&nbsp;</th>
      	 	<td>&nbsp;</td>
      	 </tr>
      	 </tbody>
      </table>
      </div>
      <table class="line_bluedot"><tr><td></td></tr></table>
<script>
function goSetDfltFrt() {
	var formObj = document.frm1;
	var vf_air_sea_clss_cd = formObj.f_air_sea_clss_cd.value;
	var vf_bnd_clss_cd =  formObj.f_bnd_clss_cd.value;
	var vf_biz_clss_cd =  formObj.f_biz_clss_cd.value;

	setDfltFrtInvB('', vf_air_sea_clss_cd, vf_bnd_clss_cd, vf_biz_clss_cd);
}

</script>
   	<div class="opus_design_grid">
   		<div class="opus_design_btn">
   			<span style="display:none" btnAuth="VAT_CAL" onclick="doWork('VAT_CAL')"><button id="vatBtn" type="button" class="btn_normal"><bean:message key="VAT_Cal"/></button></span>
 			<button id="rowAddBtn4" type="button" class="btn_accent" onclick="goSetDfltFrt();"><bean:message key="Default"/> <bean:message key="New"/></button><!--
		--><button id="rowAddBtn2" type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
 		</div>
 		<span class = "clear"></span>
   		<script language="javascript">comSheetObject('sheet1');</script>
		<script language="javascript">comSheetObject('sheet2');</script>
		<script language="javascript">comSheetObject('sheet3');</script>
   	</div>
	<div class="opus_design_inquiry">
		<table>
			<tr>
				<th width="50px" style="display:none"><bean:message key="Amount"/></th>
                <td width="120px" style="display:none" nowrap><input type="text" name="f_amt_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>

				<th style="display:none" width="70"><bean:message key="Vat_Amount"/></th>
                <td style="display:none" nowrap><input type="text" name="f_vatamt_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
				<th width="80px"><bean:message key="Total_Amount"/>&nbsp;
                <input type="text" name="f_totamt_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></th>
			</tr>
		</table>
	</div>
</div>
</div>
</form>

<script type="text/javascript">
fnbtnCtl(1);// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가

</script>


