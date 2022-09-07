<%--
=========================================================
*@FileName   : 
*@FileTitle  : 
*@Description: 
*@author     : 
*@version    : 
*@since      : 

*@Change history:
*@author     : 
*@version    : 
*@since      : 
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/workorder/script/AIC_WOM_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  		name="EventResponse" property="mapVal"/>
	<!-- 
	 -->
	<script>
		
	</script>
	
	<script>
	
	
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edob_flg = "<%= userInfo.getEdob_flg() %>";
	
		function setupPage(){
			loadPage();
		}
	</script>
</head>
	<form name="frm1" method="POST" action="">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_eng_nm" value="<%=userInfo.getOfc_eng_nm() %>">
	<input type="hidden" name="user_ofc_cd" value="<%=userInfo.getOfc_cd() %>">
	<input type="hidden" name="ofc_locl_nm" value="<%=userInfo.getOfc_locl_nm() %>">
	<input type="hidden" name="eml" value="<%=userInfo.getEml() %>">
	<input type="hidden" name="user_name" value="<%=userInfo.getUser_name() %>">
	<input type="hidden" name="user_fax" value="<%=userInfo.getFax() %>">
	<input type="hidden" name="user_phn" value="<%=userInfo.getPhn() %>">
		
	<input type="hidden" name="pageurl" id="pageurl" value="AIC_WOM_0020.clt"/>
	
	<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq"value=""/>

	<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />
	<!-- #52472 [CLT] 안정성: Excel 다운로드 건수 제한 -->
	<input type="hidden" name="endMaxIdx" value = "10000" />	
		
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!-- Report  -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="mailTitle">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTo">
	<!-- //#6889 [NONGHAO] ADJUSTMENT ON HB/L OUTPUT -->
	<input type="hidden" name="rpt_file_name_title"/>	
	<input type="hidden" name="p_wo_no"/>
	<input type="hidden" name="p_intg_bl_seq"/>
	<input type="hidden" name="p_oth_seq"/>
	<input type="hidden" name="p_mbl_no"/>
	<input type="hidden" name="p_bl_no"/>
	<input type="hidden" name="p_biz_clss_cd"/>
	<input type="hidden" name="p_return_trdp_cd"/>
	<input type="hidden" name="p_air_sea_clss_cd"/>
	<input type="hidden" name="p_trucker_trdp_cd"/>
			
		
        <!-- 빅 타이틀, 네비게이션 -->
   <div class="page_title_area clear">
   	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%--
           <button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('NEW')"><bean:message key="New"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('PRINT')" id="btnPrint" ><bean:message key="Print"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('EXCEL')"><bean:message key="Excel"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="EXCEL_ALL"                   class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('EXCEL_ALL')"><bean:message key="Excel"/> (ALL)</button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="CLEAR"                       class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('CLEAR')"><bean:message key="Clear"/></button>
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
	
    <!-- 소타이틀, 대버튼 -->
    <!--빈공간 -->
<div class="over_wrap" height="100%">
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
              <table>
              	<colgroup>
              		<col width="70">
              		<col width="210">
              		<col width="80">
              		<col width="230">
              		<col width="80">
              		<col width="200">
              		<col width="70">
              		<col width="200">
              		<col width="70">
              		<col width="*">
              	</colgroup>
              	<tbody>
                	<tr>
		                <th><bean:message key="Ref_No"/></th>
			        	<td><input type="text" name="ref_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:164px;" onkeydown="entSearch();"/>
				        </td>
				        <th><bean:message key="HBL_No"/></th>
			            <td>
			            	<!-- 
                            --><input type="text" name="hbl_no" id="hbl_no" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:164px;" onKeyPress="if(event.keyCode==13){doWork('CUST_TRDP_POPLIST', frm1.cust_nm.value);}"/><!-- 
							-->
						</td>
			            <th><bean:message key="Trucker"/></th>
		                <td> 
                            <input type="text"  tabindex="45"  name="trucker_trdp_cd" maxlength="20" value='' class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_trucker',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trucker',this, 'onBlur')"> 
                            <button type="button" class="input_seach_btn" tabindex="-1" id="trk" onclick="doWork('PARTNER_POPLIST', this)"></button> 
                            <input type="text" tabindex="46"  maxlength="50"  name="trucker_trdp_nm" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:134px;" value='' id="trk" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}">
		           	 	</td>
	                 	
				        <th><bean:message key="Office"/></th>
						<td>
							<bean:define id="oficeList" name="valMap" property="ofcList"/>
                            <select name="ofc_cd" style="width:120px;">
                            	<bean:size id="len" name="oficeList" />
                            	<logic:greaterThan name="len" value="1">
                            		<option value=''>ALL</option>
                            	</logic:greaterThan>
                        		<logic:iterate id="ofcVO" name="oficeList">
                                	<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
			                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
			                         	</logic:equal>
			                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
			                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
			                         	</logic:notEqual>
                        		</logic:iterate>
                            </select>						
						</td>			
						<!-- th><bean:message key="EDI"/> <bean:message key="Status"/></th>
		                <td>
		                	<select name="edi_status" style="width:120px;">
		                		<option value=''>ALL</option>
		                		<option value='SEND'>SEND</option>
		                	</select>
		            	</td-->
			        </tr>
			        <tr>
			            <th><bean:message key="Work_Order_No"/></th>
			            <td><!--
			            	--><input type="text" name="wo_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:164px;" onkeydown="entSearch();"/>
			            </td>
			            <th><bean:message key="MBL_No"/></th>
			            <td><!--
			            	--><input type="text" name="mbl_no" maxlength="40"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:164px;" onkeydown="entSearch();"/>
			            </td>
			            <th><bean:message key="Deliver_to"/></th>
			            <td> 
                            <input tabindex="16" type="text"   name="delivery_trdp_cd" maxlength="20" value='' class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:80px;"  onKeyDown="codeNameAction('partner_delivery',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_delivery',this, 'onBlur')"> 
                            <button type="button" class="input_seach_btn" tabindex="-1" id="del" onclick="doWork('PARTNER_POPLIST', this)"></button>
                            <input tabindex="17" type="text"   name="delivery_trdp_nm" maxlength="50" class="search_form" dataformat="multiLanguage" style="ime-mode:disabled;text-transform:uppercase;width:134px;" onBlur="strToUpper(this);" value='' id="del" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', this);}"> 
			            </td>	
			            <th><bean:message key="Type"/></th>
			            <td>
							<bean:define id="wotypeList" name="valMap" property="wotypeList"/>
                            <select name="type" style="width:120px;">
                            	<bean:size id="len" name="wotypeList" />
                            	<logic:greaterThan name="len" value="1">
                            		<option value=''>ALL</option>
                            	</logic:greaterThan>
                        		<logic:iterate id="wotypeVO" name="wotypeList">
		                            <option value='<bean:write name="wotypeVO" property="cd_val"/>'><bean:write name="wotypeVO" property="cd_nm"/></option>
                        		</logic:iterate>
                            </select>				            
			            </td>		
			            <th></th>
	                    <td></td>
					</tr>
					<tr>
			        	<th><bean:message key="ETD"/></th>
                        <td><!-- 
                        --><input type="text" name="etd_strdt" id="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='10' maxlength="10" style="width:75px;"><span class="dash">~</span><!-- 
						--><input type="text" name="etd_enddt" id="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='10' maxlength="10" style="width:75px;"><!-- 
						--><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="etd_dt_cal" onclick="doDisplay('DATE13', frm1);"></button>
                        </td>
						<th><bean:message key="ETA"/></th>
                        <td><!-- 
				        --><input type="text" name="eta_strdt" id="eta_strdt"  onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.eta_enddt);firCalFlag=false;" style="width:75px;" size='10' maxlength="10" class="search_form"><span class="dash">~</span><!-- 
			 	        --><input type="text" name="eta_enddt" id="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.eta_strdt, this);firCalFlag=false;" style="width:75px;" size='10' maxlength="10" class="search_form"><!-- 
				        --><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="eta_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
			        	</td>
                        <th><bean:message key="Issued_By"/></th>
                        <td>
						    <input type="text" name="opr_usrid" value="" class="search_form" style="width:130px;" > 
						    <button type="button" class="input_seach_btn" tabindex="-1" id="salesofc" id="operator" onClick="openPopUp('USER_POPLIST',this)"></button>                        
                        </td>
                        <th></th>
                        <td></td>
					</tr>
				</tbody>
   			</table>
    	</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
    	<div class="opus_design_inquiry">
			<!--- Paging(공통) --->
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td width="60">
				<!--- Display option Begin 
			 Display option End --->                 
						<bean:define id="pagingVal" name="valMap"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
					</td>
					<td align="center">
						<table>
							<tr>
								<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		 </div>
		 <div class="opus_design_grid" style="width:57%"><%@include file="/apps/fis/cmm/mem/jsp/CMM_MEM_0010.jsp"%></div>
     </div>
</div>
</form>
	
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
</body>
</html>

