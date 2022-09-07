<%--
=========================================================
*@FileName   : OTH_OPR_0010.jsp
*@FileTitle  : Other Sales Details
*@Description: Other Sales Details
*@author     : Jung,Byung-Chul - Cyberlogitec
*@version    : 1.0 - 10/20/2011
*@since      : 10/20/2011

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/11
*@since      : 2014/06/11
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/oth/opr/details/script/OTH_OPR_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21 자동완성 기능 추가 S -->	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- 2016-12-21  자동완성 기능 추가 E -->	
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String ofcEngNm 	= userInfo.getOfc_eng_nm();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>

	<bean:define id="valMap"  		name="EventResponse" property="mapVal"/>
	<bean:define id="othDetailsVO" 	name="EventResponse" property="objVal"/>
	<bean:define id="ofcVO" 		name="valMap" property="ofcInfo"/>
	<bean:define id="ofcInfo"  		name="valMap" property="ofcInfo"/>
		
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	
	
	<script>
	var uod_flg ="<%= userInfo.getUod_flg()%>"
	var usrId = "<%= userInfo.getUsrid() %>";
	var AUTOCOMPLETE_YN = 'N';
	//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
	var edob_flg;
	var ref_ofc_cd;
	//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
	var eblfn_flg;



	 <logic:notEmpty name="valMap" property="autocompleteYn">
    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
	 </logic:notEmpty>
	 
		function setSelection(){
			frm1.ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
			frm1.curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			
			
			if(frm1.h_ofc_cd.value != ""){
				frm1.ofc_cd.value = frm1.h_ofc_cd.value;
			}

			if(frm1.h_curr_cd.value != ""){
				frm1.curr_cd.value = frm1.h_curr_cd.value;
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
               } 
            %>
            TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        </logic:iterate>

        var h_ref_no = '<bean:write name="othDetailsVO" property="ref_no"/>';

        //button control
        function btnLoad(){
	        if(h_ref_no==''){
	        	getBtnObj('btnSave').style.display = "none";
	        	//getObj('sndEmlObj').style.display = "none";
	        	//getObj('s_docObj').style.display = "none";
	        	getObj('fileUpObj').style.display = "none";

	        	/* #20552 : [ADVC] Other Operation 에 Copy 기능 추가, jsjang 2013.10.24 */
	        	getBtnObj('btnCopy').style.display  = 'none';
	        	//getBtnObj('btnFileLabel').style.display  = 'none';
	        	getBtnObj('btnAccounting').style.display  = 'none';
	        }else{
	        	getBtnObj('btnSave').style.display = 'inline';
	        	//getObj('sndEmlObj').style.display = 'inline';
	        	//getObj('s_docObj').style.display = 'inline';
	        	//getObj('fileUpObj').style.display = 'inline';

	        	/* #20552 : [ADVC] Other Operation 에 Copy 기능 추가, jsjang 2013.10.24 */
	        	getBtnObj('btnCopy').style.display  = 'inline';
	        	getBtnObj('btnAccounting').style.display  = 'inline';
	        	//getBtnObj('btnFileLabel').style.display  = 'inline';
	        }
	        
	     	/* #428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED */
	     	/* O04 롤코드가 있으면 수정가능 or 롤코드가 없을땐 인보이스가 없을때 수정가능  (ref_no) */
		    if(frm1.f_modify.value == 'UPDATE'){
				frm1.ref_no.className = 'search_form';
			    frm1.ref_no.readOnly  = false;		    	
		    }else{
				frm1.ref_no.className = 'search_form-disable';
			    frm1.ref_no.readOnly  = true;	  
		    }
			//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
			if (eblfn_flg != 'Y') {
				frm1.ref_no.disabled = true;
			}

	        fnbtnCtl();
        }
        
		function fnbtnCtl(){
			 
			var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
			doBtnAuthority(attr_extension);
			 
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
			//권한이 있는 경우(Check) 현재 있는 Role 권한이 그대로 처리되도록 함
			//권한이 없는 경우(unCheck) 된 경우 User 의 Office 와 동일한 DATA가 아닌 경우 Save 버튼을 Hidden 시킨다.
			var formObj=document.frm1;
			//#4092 [Zen] Role Control Option to add "Create or Edit Other Office Data"
			edob_flg 		= "<%=userInfo.getEdob_flg()%>"; //ENABLE EDITING OTHER OFFICE (B/L)
			//OFVFOUR-7862: [ZEN] Add Role "Edit B/L Filing No."
			eblfn_flg = "<%=userInfo.getEblfn_flg()%>";
			ofc_cd 		= "<%=userInfo.getOfc_cd()%>";  
			var ref_ofc_cd =  formObj.h_ofc_cd.value;
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
				//$("#btnModify").show();
				//$("#btnDelete").show();
				//$("#closeModiObj").show(); 
			}else{
				$("#btnSave").hide();
				$("#btnModify").hide();
				$("#btnSaveX").hide();
				$("#btnDelete").hide();				
				//$("#closeModiObj").hide(); 
			}
			
			//alert("btnflag " +btnflag);

		}
		//#3779 [CLT] v4.7.0 entry화면 new 버튼 클릭 시 tab 제목
        var pageName = "<%=LEV3_NM%>";		
	</script>

<script>
function setupPage(){
	loadPage();
	setSelection();
	doWork('SEARCHLIST03');
	//btnLoad();
	
	//2016.04.21 C.W.Park Added
	//#52109 버튼 로딩 후 ofc별 blck_dt 셋업
	setBlock_dt();
	if(document.frm1.SHOW_COMPLETE.value == "Y"){
		showCompleteProcess();
	}
}
</script>
<style>
<!--
.required {
	background-color: #d4f6ff;
}
-->
</style>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="save_sts_flg"/>
	<input type="hidden" name="oth_seq" value="<bean:write name="othDetailsVO" property="oth_seq"/>"/>
	<input type="hidden" name="old_ref_no" value="<bean:write name="othDetailsVO" property="ref_no"/>"/>
	<input type="hidden" name="f_sts_cd" value="<bean:write name="othDetailsVO" property="sts_cd"/>"/>
	<input type="hidden" name="trx_modi_tms" value=""/>
	<input type="hidden" name="f_ibflag"/>
	
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_usr_id" value="<%= usrId %>"/>
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email"  value="<%= email %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<!-- MMISC. No 번호 Format 설정 가져오기 -->
	<input	type="hidden" name="misc_no_format" value="<%="N".equals((String)application.getAttribute("MISC_NO_FORMAT")) ? "N" : "Y" %>"/>   
		
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	
	<!-- GridSetting Value -->
	<input type="hidden" name="pageurl" id="pageurl" value="OTH_OPR_0011.clt"/>
	
	<!-- 업데이트 시에 변경된 값과 비교해 보기 위해서 -->
    <input type="hidden" name="org_post_dt"  value='<bean:write  name="othDetailsVO" property="post_dt" />'> 
	<input type="hidden" name="SHOW_COMPLETE" value='<bean:write name="valMap" property="SHOW_COMPLETE"/>'>
	
    <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
    <input type="hidden" name="f_modify"   id="f_modify"   value="<bean:write name="valMap" property="f_modify"/>">
    
    <!-- #553 EDIT BL WITH OVERLIMITED TP -->
    <input type="hidden" name="credit_flg" value="<%= userInfo.getCredit_flg() %>"/>
    	
    <input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq"value=""/>

	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	<!--OFVFOUR-7707[Matrix] Restriction to block creating HBL in case the credit of customer exceeds credit limit  -->
	<input type="hidden" name="f_credit_flg"   id="f_credit_flg"   value="N">
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <div class="opus_design_btn TOP">
<%-- 		   <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
		--><button type="button" class="btn_normal" style="display:none;  btnAuth="COPY" id="btnCopy" onclick="doWork('COPY')"><bean:message key="Copy"/></button><!-- 
		--><button id="btnModify" type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
		<button type="button" id="btnSaveX" class="btn_normal"  style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="saveCloseBtnClick()"><bean:message key="Save_X"/></button>
		--><button id="btnDelete" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" style="cursor:hand; display:none;" class="btn_normal" onclick="doWork('REMOVE')"><bean:message key="Delete"/></button><!--
	    --><button id="btnAccounting" style="cursor:hand; display:none;" type="button" btnAuth="ACCOUNTING" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('GOTOACCT')"><bean:message key="Accounting"/></button>
	    --><button type="button" class="btn_normal" style="display:none;  btnAuth="FILE_LABEL" id="btnFileLabel" onclick="doWork('FILE_LABEL')"><bean:message key="FILE_LABEL"/></button>
 --%>	   </div>
	 <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<div class="over_wrap" height="100%">	
	<div class="wrap_result">
		<div class="opus_design_inquiry wFit">
			<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
			<div class="layout_vertical_3 sm" style="width: 410px;height: 700px;">
		    	<table>
					<tr>
	      				<th width="120px" ><bean:message key="Misc_Reference_No"/></th>
	           			<td class="table_search_head"> 
	           				 <input type="text" name="ref_no" onBlur="strToUpper(this);checkRefNo();" value="<bean:write name="othDetailsVO" property="ref_no"/>" dataformat="excepthan" otherchar = "<%=FWD_OTHER_CHAR%>" style="ime-mode:disabled; text-transform:uppercase;width:150px;" maxlength="20" onclick="strAuto(this);" /><!-- 
	           			--><bean:define id="oficeList" name="valMap" property="ofcList"/><!-- 
	           			 --><select name="ofc_cd" style="width:67px;" onChange="setBlock_dt();">
	                        <logic:iterate id="ofcVO" name="oficeList">
	                                <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                        </logic:iterate>
	                            </select>
	                            <input type="hidden" name="h_ofc_cd" value="<bean:write name="othDetailsVO" property="ofc_cd"/>">
	           			</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="Type"/></th>
		            	<td><bean:define id="typeList" name="valMap" property="typeList"/>
							 <html:select name="othDetailsVO" property="type" styleClass="required" style="width:150px">
								 <html:options collection="typeList" property="oth_tp" labelProperty="oth_tp"/>
							 </html:select>
		            	</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="MBL_No"/></th>
		            	<td>
		            		<input type="text" name="mbl_no" maxlength="20" value="<bean:write name="othDetailsVO" property="mbl_no"/>"  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
	           			</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="HBL_No"/></th>
		           	 	<td>	
		           	 		<input type="text" name="hbl_no" maxlength="20" value="<bean:write name="othDetailsVO" property="hbl_no"/>"  onBlur="strToUpper(this);"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
		            	</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="Vessel_Flight"/></th>
		            	<td>
		            		<input type="text" name="vsl_flt" maxlength="25" value="<bean:write name="othDetailsVO" property="vsl_flt"/>"  onBlur="strToUpper(this);"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
		            	</td>
	       			</tr>	
	       			<tr>
						<th ><bean:message key="Customer"/></th>
		            	<td>
		            		<input required type="text" name="cust_cd" maxlength="20" value="<bean:write name="othDetailsVO" property="cust_cd"/>" onKeyDown="codeNameAction('trdpCode_cs',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_cs',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;"><!-- 
		            	--><button type="button" class="input_seach_btn" tabindex="-1" id="cust" onclick="doWork('CUSTOMER_POPLIST')"></button><!-- 
		            	 --><input required name="cust_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="cust_nm"/>" type="text" onKeyPress="custEnterAction(this,'CUSTOMER')" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:117px;">
		            	</td>
	       			</tr>
	       			<tr>
						<th ><bean:message key="Customer_Ref_No"/></th>
		            	<td>
		            		<input type="text" name="cust_ref_no" maxlength="20" value="<bean:write name="othDetailsVO" property="cust_ref_no"/>"  onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
		            	</td>
		        	</tr>
		        	<tr>
		        		<th ><bean:message key="Shipper"/></th>
		            	<td>
		            		<!-- input type="text" name="shpr_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="shpr_nm"/>"  onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:220px;"/ -->
		            		<input type="text" name="shpr_trdp_cd" maxlength="20" value="<bean:write name="othDetailsVO" property="shpr_trdp_cd"/>" onKeyDown="codeNameAction('trdpCode_sh',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_sh',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;"><!-- 
		            	--><button type="button" class="input_seach_btn" tabindex="-1" id="shi" onclick="doWork('SHIPPER_POPLIST')"></button><!-- 
		            	 --><input type="text" name="shpr_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="shpr_nm"/>" onKeyPress="custEnterAction(this,'SHIPPER')" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:117px;">
		            		
		           	 	</td>
		           	</tr>
	       			<tr>
						<th ><bean:message key="Consignee"/></th>
		            	<td>
		            		<!-- input type="text" name="cnee_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="cnee_nm"/>"  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:220px;"/ -->
		            		<input type="text" name="cnee_trdp_cd" maxlength="20" value="<bean:write name="othDetailsVO" property="cnee_trdp_cd"/>" onKeyDown="codeNameAction('trdpCode_co',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_co',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px;"><!-- 
		            	--><button type="button" class="input_seach_btn" tabindex="-1" id="shi" onclick="doWork('CONSIGNEE_POPLIST')"></button><!-- 
		            	 --><input type="text" name="cnee_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="cnee_nm"/>" onKeyPress="custEnterAction(this,'CONSIGNEE')" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:117px;">
		            		
		            	</td>
		        	</tr>
		        	<tr>
						<th ><bean:message key="Commodity"/></th>
		            	<td>
		            		<input type="text" name="cmdt_cd" maxlength="13" value="<bean:write name="othDetailsVO" property="cmdt_cd"/>"  onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
		            	--><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('COMMODITY_POPLIST')"></button><!-- 
		            	 --><input name="cmdt_nm" maxlength="100" value="<bean:write name="othDetailsVO" property="cmdt_nm"/>" type="text" onKeyDown="custEnterAction(this,'COMMODITY_NAME')"  onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:117px;">
		            	</td>
		        	</tr>
		        	<tr>
						<th ><bean:message key="Location"/></th>
		            	<td>
		            		<input type="text" name="loc_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="loc_nm"/>"  onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:220px;"/>
		            	</td>
		        	</tr>
		        	<tr>
						<th ><bean:message key="Container"/><br><bean:message key="Information"/></th>
		            	<td>
		            		<textarea name="cntr_info" rows="10"   onblur="strToUpper(this);" dataformat="excepthan" style="width:220px;height:45px;"  WRAP="off"><bean:write name="othDetailsVO" property="cntr_info"/></textarea>
		            	</td>
		        	</tr>     	
		        	<tr>
		        		<td>&nbsp;
		        		</td>
		        		<td>&nbsp;
		        		</td>
		        	</tr>
		        	<tr>
		        		<td>&nbsp;
		        		</td>
		        		<td>&nbsp;
		        		</td>
		        	</tr>
		        	<tr>
		        		<td>&nbsp;
		        		</td>
		        		<td>&nbsp;
		        		</td>
		        	</tr>
				</table>
				<div class="opus_design_grid" >
					<div class="opus_design_btn">
		    			<button type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
		    		</div>
		    		<script language="javascript">comSheetObject('sheet1');</script>
					<script language="javascript">comSheetObject('sheet2');</script>
				</div>
		    </div>
			<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
		    <div class="layout_vertical_3 mar_left_8 sm" style="width: 430px;height: 700px;">
	    	<table>
					<tr>
			        	<th width="125px" ><bean:message key="POL"/></th>
			            <td>
			            	<input type="text" name="pol_cd" maxlength="5" value="<bean:write name="othDetailsVO" property="pol_cd"/>" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:75px;"><!-- 
			            --><button type="button" class="input_seach_btn" tabindex="-1" id="pol" onclick="openPopUp('POL_POPLIST',this)"></button><!-- 
			             --><input type="text" name="pol_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="pol_nm"/>"  onKeyPress="custEnterAction(this,'LOC_POL')" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:150px;">
				            <input type="hidden" name="pol_nod_cd" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:120px;" readonly>
			            </td>
				     </tr>
				     <tr>
				     	<th ><bean:message key="POD"/></th>
			            <td>	
			            	<input type="text" name="pod_cd" maxlength="5" value="<bean:write name="othDetailsVO" property="pod_cd"/>" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Location_pod',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:75px;"><!-- 
			            --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="openPopUp('LOCATION_POPLIST',this)"></button><!-- 
			             --><input type="text" name="pod_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="pod_nm"/>"  onKeyPress="custEnterAction(this,'LOC_POD')" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:150px;">
			                <input type="hidden" name="pod_nod_cd" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:120px;" readonly>
			            </td>
				    </tr>
				    <tr>
				     	<th ><bean:message key="F_Dest"/></th>
			            <td>
			            	<input type="text" name="fnl_dest_loc_cd" maxlength="5" value="<bean:write name="othDetailsVO" property="fnl_dest_loc_cd"/>"   onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Location_dest',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:75px;"><!-- 
			            --><button type="button" class="input_seach_btn" tabindex="-1" id="salesofc" id="f_dest" onclick="openPopUp('F_DEST_DATE',this)"></button><!-- 
			             --><input type="text" name="fnl_dest_loc_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="fnl_dest_loc_nm"/>" onKeyPress="custEnterAction(this,'LOC_DEST')"  onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:150px;">
			   	            <input type="hidden" name="fnl_dest_nod_cd" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:120px;" readonly>
			            </td>
				    </tr>
				    
				    <tr>
				     	<th ><bean:message key="Pickup"/></th>
			            <td>
			            	<input type="text" name="pu_loc_cd" maxlength="12" value="<bean:write name="othDetailsVO" property="pu_loc_cd"/>"   onKeyDown="codeNameAction('trdpCode_pu',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_pu',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:75px;"><!-- 
			            --><button type="button" class="input_seach_btn" tabindex="-1" id="f_pickup" onclick="doWork('PICKUP_LOC_POPLIST',this)"></button><!-- 
			             --><input type="text" name="pu_loc_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="pu_loc_nm"/>" onKeyPress="custEnterAction(this,'LOC_PICKUP')"  onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:150px;">
						</td>
				    </tr>
				    
				    <tr>
						<th ><bean:message key="Package"/></th>
						<td>
							<input type="text" name="pck_qty" value="<bean:write name="othDetailsVO" property="pck_qty"/>"  onKeyPress="ComKeyOnlyNumber(this)" dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right" maxlength="7"/><!-- 
						--><bean:define id="pckCdList" name="valMap" property="pckCdList"/><!-- 
						 --><html:select name="othDetailsVO" property="pck_ut_cd" styleClass="search_form" style="width:179px;">
								<option value=""></option>
								<html:options collection="pckCdList" property="pck_ut_cd" labelProperty="pck_nm"/>
							</html:select>
						</td>
			        </tr>
			        <tr>
            			<th ><bean:message key="Weight"/></th>
						<td> 
							<input type="text" name="grs_wgt_k" value="<wrt:write name="othDetailsVO" property="grs_wgt_k" formatType="MONEY" format="#,###.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="weightChange(this);" maxlength="13"  dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
						--><input type="text" name="grs_wgt_ut_cd" value="KG" style="width:35px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
						--><input type="text" name="grs_wgt_l" value="<wrt:write name="othDetailsVO" property="grs_wgt_l" formatType="MONEY" format="#,###.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="weightChange(this);" maxlength="13"  dataformat="excepthan" style="ime-mode:disabled;width:110px;text-align:right;"><!-- 
						--><input type="text" name="grs_wgt_ut_cd1" value="LB" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="2">
						</td>
			        </tr>
			        <tr>
            			<th ><bean:message key="Measurement"/></th>
						<td> 
							<input type="text" name="meas_m" value="<wrt:write name="othDetailsVO" property="meas_m" formatType="MONEY" format="#,###.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" maxlength="13"  dataformat="excepthan" style="ime-mode:disabled;width:75px;text-align:right;"><!-- 
						--><input type="text" name="meas_ut_cd" value="CBM" style="width:35px;border:0;background-color:transparent;" readOnly tabindex="5"><!-- 
						--><input type="text" name="meas_f" value="<wrt:write name="othDetailsVO" property="meas_f" formatType="MONEY" format="#,###.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);cbmChange(this);" maxlength="13"  dataformat="excepthan" style="ime-mode:disabled;width:110px;text-align:right;"><!-- 
						--><input type="text" name="meas_ut_cd1" value="CFT" style="width:30px;border:0;background-color:transparent;" readOnly tabindex="6">
						</td>
			        </tr>
			        <tr>
			            <th ><bean:message key="Post_Date"/></th>
			        	<td> 
				            <input required type="text" name="post_dt" id="post_dt" value="<bean:write  name="othDetailsVO" property="post_dt" />" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Post Date');checkPostDate(this);" size='11' maxlength="10"  dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
				         --><button type="button" id="post_dt_cal" onclick="doDisplay('DATE_POST', frm1); setCtrbMgn(frm1.cust_cd.value);" class="calendar" tabindex="-1"></button>
				        </td>
			        </tr>
			        <tr>
				        <th ><bean:message key="Mark"/></th>
			            <td>
			            	<textarea name="int_memo" rows="10"   onblur="strToUpper(this);" dataformat="multiLanguage" style="width:245px;height:100px;" WRAP="off"><bean:write name="othDetailsVO" property="int_memo"/></textarea>
			            </td>
			        </tr>
			        <tr>
		        		<td>&nbsp;
		        		</td>
		        		<td>&nbsp;
		        		</td>
		        	</tr>
		        	<tr>
		        		<td>&nbsp;
		        		</td>
		        		<td>&nbsp;
		        		</td>
		        	</tr>
		        	<tr>
		        		<td>&nbsp;
		        		</td>
		        		<td>&nbsp;
		        		</td>
		        	</tr>
				</table>
				<div class="opus_design_grid"  style="padding-top: 33px;"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>
		    </div>
			<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
		    <div class="layout_vertical_3 mar_left_8 sm" style="width: 400px;height: 700px;">
			    	<table>
			    			<tr>
						        <th ><bean:message key="Load_date"/></th>
						       	<td>
						       		<input type="text" name="lod_dt_tm" id="lod_dt_tm" maxlength="10" value="<bean:write name="othDetailsVO" property="lod_dt_tm"/>"  onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Load Date');" dataformat="excepthan" style="ime-mode:disabled;	width:75px;"><!-- 
						       	--><button type="button" id="lod_dt_tm_cal" onclick="doDisplay('DATE_LOAD', frm1);" class="calendar" tabindex="-1"></button><!--
						       	--><input type="text" value="Time" style="width:35px;border:0;background-color:transparent;font-weight:bold;" readOnly tabindex="5"><!--
								--><input type="text" name="lod_tm" maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();" value="<bean:write name="othDetailsVO" property="lod_tm"/>">
						        </td>
						    </tr>
							<tr>
						        <th width="100px" ><bean:message key="ETD"/></th>
						        <td> 
						            <input type="text" name="etd_dt_tm" id="etd_dt_tm" maxlength="10" value="<bean:write name="othDetailsVO" property="etd_dt_tm"/>"  onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETD');" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
						         --><button type="button" id="etd_dt_tm_cal" onclick="doDisplay('DATE_ETD', frm1);" class="calendar" tabindex="-1"></button>
						        </td>
						     </tr>
						     <tr>
						        <th ><bean:message key="ETA"/></th>
						        <td> 
						            <input type="text" name="eta_dt_tm" id="eta_dt_tm" maxlength="10" value="<bean:write name="othDetailsVO" property="eta_dt_tm"/>"   onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true,1);dateRangeValid(this, 'ETA');" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!-- 
						         --><button type="button" id="eta_dt_tm_cal" onclick="doDisplay('DATE_ETA', frm1);" class="calendar" tabindex="-1"></button>
						        </td>
						    </tr>
						    <tr>
						    <!-- #873 [STARWAY] LOAD DATE, DATE OF RECEIPT FIELDS TO BE ADDED -->
						        <th ><bean:message key="F_ETA"/></th>
						       	<td>
						       		<input type="text" name="feta_dt_tm" id="feta_dt_tm" maxlength="10" value="<bean:write name="othDetailsVO" property="feta_dt_tm"/>"  onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1);"  onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Final ETA');" dataformat="excepthan" style="ime-mode:disabled;	width:75px;"><!-- 
						       	--><button type="button" id="feta_dt_tm_cal" onclick="doDisplay('DATE_FETA', frm1);" class="calendar" tabindex="-1"></button><!--
						       	--><input type="text" value="Time" style="width:35px;border:0;background-color:transparent;font-weight:bold;" readOnly tabindex="5"><!--
								--><input type="text" name="feta_tm" maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();" value="<bean:write name="othDetailsVO" property="feta_tm"/>">
						        </td>
						    </tr>
						    <tr>
						        <th ><bean:message key="Delivery"/></th>
				            	<td>
				            		<input type="text" name="door_loc_cd" maxlength="20" value="<bean:write name="othDetailsVO" property="door_loc_cd"/>"  onKeyDown="codeNameAction('trdpCode_door',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_door',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:75px;"><!-- 
				            	--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('DOOR_POPLIST')"></button><!-- 
				            	 --><input name="door_loc_nm" maxlength="50" value="<bean:write name="othDetailsVO" property="door_loc_nm"/>" type="text" onKeyPress="custEnterAction(this,'LOC_DOOR')"  onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:150px;">
				            	</td>
						    </tr>
						    
						    <tr>
								<th ><bean:message key="Currency"/></th>
								<td> 
									<select name="curr_cd" style="width:75px;">
		                           		<bean:define id="currCdList"  name="valMap" property="currCdList"/>
										<logic:iterate id="CurrVO" name="currCdList">
		                           			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
		                           		</logic:iterate>
		                             </select>
									 <input type="hidden" name="h_curr_cd" value="<bean:write name="othDetailsVO" property="curr_cd"/>">
								</td>
					        </tr>
					        <tr>
								<th ><bean:message key="Sales_Type"/></th>
				            	<td><bean:define id="slsList" name="valMap" property="slsCdList"/>
									 <html:select name="othDetailsVO" property="nomi_flg" styleClass="required" style="width:150px">
										 <html:options collection="slsList" property="cd_val" labelProperty="cd_nm"/>
									 </html:select>
				            	</td>
	       					</tr>
					        <tr>
								<th ><bean:message key="Sales_PIC"/></th>
					            <td>
						           	<input type="text" name="sls_usrid" value="<bean:write name="othDetailsVO" property="sls_usrid"/>" class="search_form-disable" style="width:130px;" readOnly><!-- 
						         --><button type="button" class="input_seach_btn" tabindex="-1" id="salesperson" onClick="openPopUp('USER_POPLIST',this)"></button>
						        </td>
					        </tr>
					        <tr>
								<th ><bean:message key="Sales_OFC"/></th>
					            <td width="200"> 
						            <input type="text" name="sls_ofc_cd" value="<bean:write name="othDetailsVO" property="sls_ofc_cd"/>" class="search_form-disable" style="width:130px;" readOnly><!-- 
						         --><button type="button" class="input_seach_btn" tabindex="-1" id="salesofc" onclick="openPopUp('OFFICE_GRID_POPLIST',this)"></button>
						       </td>
					        </tr>
					        <tr>
					            <th ><bean:message key="Issued_By"/></th>
					            <td>
						            <input type="text" name="opr_usrid" value="<bean:write name="othDetailsVO" property="opr_usrid"/>" class="search_form-disable" style="width:130px;" readOnly><!-- 
						          --><button type="button" class="input_seach_btn" tabindex="-1" id="operator" onClick="openPopUp('USER_POPLIST2',this)"></button>
								</td>
					        </tr>
							<!-- OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN -->
							<tr>
								<th><bean:message key="Team_cd"/></th>
								<td>
									<input type="text" name="team_cd" readOnly style="width:130px;">
								</td>	
							</tr>
					        <tr>
					            <th ><bean:message key="Description"/></th>
					            <td>
					            	<textarea name="ext_memo" rows="10"   onblur="strToUpper(this);" dataformat="multiLanguage" style="width:245px;height:100px;"  WRAP="off"><bean:write name="othDetailsVO" property="ext_memo"/></textarea>
					            </td>
					        </tr>
					        <tr>					        	
					            <th ><bean:message key="Contrib_Office"/></th>
					            <td>
						             <input type="text"   name="ctrb_ofc_cd" value='<bean:write name="othDetailsVO" property="ctrb_ofc_cd"/>' class="search_form" onKeyDown="codeNameAction('officeCd_ctrbOfc',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('officeCd_ctrbOfc',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;"><!-- 
                                    --><button type="button" name="ctrbOfc" id="ctrbOfc" class="input_seach_btn" tabindex="-1" onClick="openPopUp('OFFICE_GRID_POPLIST',this)"></button>
								</td>
					            					        
					        </tr>
					        <tr>
					        	<th><bean:message key="Use_Ratio"/></th>
								<td>
									<input type="checkBox" name="ctrb_ratio_yn" id="ctrb_ratio_yn" value="<bean:write name="othDetailsVO" property="ctrb_ratio_yn"/>" onclick="flgChange(this);clickCtrbRatioYn();">
									<input type="text" name="ctrb_mgn" value="<bean:write name="othDetailsVO" property="ctrb_mgn"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,20,2);chkComma(this,20,2);checkRatioValid();" maxlength="23" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:85px;text-align:right;">
								</td>					
					        </tr>
					        <tr>
					        	<th><bean:message key="Contrib_Dept"/></th>
								<td>
									<bean:define id="ctrbDeptList" name="valMap" property="ctrbDeptList"/>
	                                <html:select name="othDetailsVO" property="ctrb_dept_cd" styleClass="search_form" style="width:150px;">
	                                    <option value=""></option>
	                                    <html:options collection="ctrbDeptList" property="cd_val" labelProperty="cd_nm"/>
	                                </html:select>
								</td>
					        </tr>
					        <tr>
					        	<th><bean:message key="Internal"/></th>
					        	<td>
					        		<input type="checkBox" name="inter_use_flag" id="inter_use_flag" value="<bean:write name="othDetailsVO" property="inter_use_flag"/>" onclick="flgChange(this);">
					        	</td>
					        </tr>
					        <tr>
					        	<td style="padding-top: 5px;" colspan="2"><textarea id="memo_txt" style="width:270px;" rows="10" align="center"><bean:write name="othDetailsVO" property="memo_txt"/></textarea></td>
					        </tr>
					        
						</table> 
		    </div>
		</div>
	</div>
</div>
</form>
  
<script type="text/javascript">
fnbtnCtl();
</script>	

