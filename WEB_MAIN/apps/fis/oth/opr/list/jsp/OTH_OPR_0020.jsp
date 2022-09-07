<%--
=========================================================
*@FileName   : OTH_OPR_0020.jsp
*@FileTitle  : Other Sales List
*@Description: Other Sales List
*@author     : Jung,Byung-Chul - Cyberlogitec
*@version    : 1.0 - 10/20/2011
*@since      : 10/20/2011

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 24/06/2014
*@since      : 24/06/2014
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./apps/fis/oth/opr/list/script/OTH_OPR_0020.js?ver=<%=CLT_JS_VER%>"></script>

	
	<bean:define id="valMap"  		name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  		name="valMap" property="ofcInfo"/>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		//#6837 : [JAPT] B/L Type column add request on BL List
		<% boolean isBegin = false; %>
        <bean:define id="othTypeList"  name="valMap" property="othTypeList"/>
        <logic:iterate id="othtypeVO" name="othTypeList">
            <% if (isBegin) { %>
            	COMBOOTHTypeTEXT+= '|';
            	COMBOOTHTypeCODE+= '|';
            <% } else {
                  isBegin = true;
               } %>
               COMBOOTHTypeTEXT+= '<bean:write name="othtypeVO" property="oth_tp"  filter="false"/>';
               COMBOOTHTypeCODE+= '<bean:write name="othtypeVO" property="oth_tp" filter="false"/>';
        </logic:iterate>

	</script>
	
	<script>
	
	
		// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
		var ofc_cd = "<%= userInfo.getOfc_cd() %>";
		var edob_flg = "<%= userInfo.getEdob_flg() %>";
		var uod_flg ="<%= userInfo.getUod_flg()%>"
		var usrId = "<%= userInfo.getUsrid() %>";
		function setupPage(){
			loadPage();
		}
	</script>
</head>
	<form name="frm1" method="POST" action="./OTH_OPR_0020GS.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="ref_no"/>
	<input type="hidden" name="oth_seq"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="OTH_OPR_0020.clt"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">

	<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq"value=""/>
	
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!-- 개인정보 관리화면 정렬순서 2016.03  -->
	<input type="hidden" name="f_orderByInfo"  value="" />
	
	<!-- #52472 [CLT] 안정성: Excel 다운로드 건수 제한 -->
	<input type="hidden" name="endMaxIdx" value = "10000" />	
        <!-- 빅 타이틀, 네비게이션 -->
   <div class="page_title_area clear">
   	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 		   <button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="document.frm1.f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" style="display:none;" btnAuth="CLEAR" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('NEW')"><bean:message key="New"/></button><!-- 
		--><button id="btnDelete" style="cursor:hand; display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr4() %>" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('REMOVE')"><bean:message key="Delete"/></button><!-- 
		--><button id="btnCopy" style="cursor:hand; display:none;" type="button" btnAuth="COPY" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('COPY')"><bean:message key="Copy"/></button><!-- 
		--><button id="btnAccounting" style="cursor:hand; display:none;" type="button" btnAuth="ACCOUNTING" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('GOTOACCT')"><bean:message key="Accounting"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="PICKUP_DELIVERY_INSTRUCTION" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('INSTRUCTION')"><bean:message key="Pickup_Delivery_Instruction"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="DELIVERY_ORDER" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('ORDER')"><bean:message key="Delivery_Order"/></button><!-- 
		--><button style="cursor:hand; display:none;" type="button" btnAuth="PROFIT_REPORT" class="btn_normal" onclick="document.frm1.f_CurPage.value='';doWork('PROFIT_REPORT')"><bean:message key="Profit_Report"/></button><!-- 
		--><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button><!--
	   	--><button type="button" btnAuth="EXCEL_ALL" 	class="btn_normal" onclick="doWork('EXCEL_ALL')" style="display:none;" name="btn_DownExcel"><bean:message key="Excel"/> (ALL)</button><!--
	   	--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="FILE_LABEL" onClick="doWork('FILE_LABEL');"><bean:message key="FILE_LABEL"/></button>
 --%>	   </div>
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
		<div class="opus_design_inquiry entry_pannel">
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
              		<col width="70">
              		<col width="100">
					<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
					<col width="110">
              		<col width="*">
              	</colgroup>
              	<tbody>
                	<tr>
		                <th><bean:message key="Post_Date"/></th>
			        	<td><!--
			        		--><input type="text" name="post_frmdt" id="post_frmdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.post_todt);firCalFlag=false;" size='11' maxlength="10" class="search_form" style="width:75px;" ><!--
							--><span class="dash">~</span><!--
							--><input type="text" name="post_todt" id="post_todt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.post_frmdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form" style="width:75px;" ><!--
							--><button type="button" onclick="doDisplay('POST_DATE', frm1);" class="calendar" tabindex="-1"></button>
				        </td>
				        <th><bean:message key="Customer"/></th>
			            <td>
			            	<!-- 
                            --><input type="text" name="cust_nm" id="cust_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:151px;" onKeyPress="if(event.keyCode==13){doWork('CUST_TRDP_POPLIST', frm1.cust_nm.value);}"/><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CUST_TRDP_POPLIST')"></button>
						</td>
			            <th><bean:message key="Shipper"/></th>
		                <td>
		                	<!-- 
                            --><input type="text" name="shpr_nm" id="shpr_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:151px;" onKeyPress="if(event.keyCode==13){doWork('SHIP_TRDP_POPLIST', frm1.shpr_nm.value);}"/><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('SHIP_TRDP_POPLIST')"></button>
		           	 	</td>
	                 	
						<th><bean:message key="Consignee"/></th>
		                <td>
		                	<!-- 
	                        --><input type="text" name="cnee_nm" id="cnee_nm" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:151px;" onKeyPress="if(event.keyCode==13){doWork('CNEE_TRDP_POPLIST', frm1.cnee_nm.value);}"/><!--
							--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CNEE_TRDP_POPLIST')"></button>
		            	</td>
				        <th><bean:message key="Office"/></th>
						<td><!--
							--><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
                            --><select name="f_ofc_cd" style="width:115px;"><!--
                            	--><bean:size id="len" name="oficeList" /><!--
                            	--><logic:greaterThan name="len" value="1"><!--
                            		--><option value=''>ALL</option><!--
                            	--></logic:greaterThan><!--
                        		--><logic:iterate id="ofcVO" name="oficeList"><!--
                                	--><logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
			                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
			                         	</logic:equal>
			                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
			                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
			                         	</logic:notEqual><!--
                        		--></logic:iterate><!--
                            --></select>
						</td>
						<td>
							<select name="f_isb_pic_sel_cd" style="width:100px;; font-weight: bold;" onChange="searchValueClear();">
							  <option value='OR'><bean:message key="Issued_By"/> Or <bean:message key="Sales_PIC"/></option>
							  <option value='ISB'><bean:message key="Issued_By"/></option>
							  <option value='PIC'><bean:message key="Sales_PIC"/></option>
							</select>
						</td>
						<td><input type="text" name="f_opr_usrid" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; ;width:80px;" onKeyPress="" onkeydown="entSearch();"><!-- 
						    --><button type="button" class="input_seach_btn" tabindex="-1" id="oprBtn" id="oprBtn" onClick="doWork('USER_POPLIST')"></button>
						</td>			
			        </tr>
			        <tr>
			            <th><bean:message key="HBL_No"/></th>
			            <td><!--
			            	--><input type="text" name="hbl_no" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:164px;" onkeydown="entSearch();"/>
			            </td>
			            <th><bean:message key="MBL_No"/></th>
			            <td><!-- OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
			            	--><input type="text" name="mbl_no" maxlength="40" value="<bean:write name="valMap" property="f_mbl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px;" onkeydown="entSearch();"/>
			            </td>
			            <th><bean:message key="Other_Reference_No"/></th>
			            <td><!-- OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
			            	--><input type="text" name="f_ref_no" maxlength="40" value="<bean:write name="valMap" property="f_ref_no"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onkeydown="entSearch();"/>
			            </td>	
			            <th><bean:message key="Cntr_No"/></th>
			            <td><!--
			            	--><input type="text" name="f_cntr_no" maxlength="40"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onkeydown="entSearch();"/>
			            </td>		
			            <th><bean:message key="Vessel_Flight"/></th>
	                    <td><input type="text" name="f_vsl_flt" id="f_vsl_flt" maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;" onkeydown="entSearch();"/></td>
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
                        <th><bean:message key="POL"/></th>
                        <td><!-- 
                        --><input type="text"   name="f_pol_cd" id="f_pol_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:45px;"/><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POL_LOCATION_POPLIST')"></button><!-- 
                        --><input type="text"   name="f_pol_nm" id="f_pol_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/>
                        </td>
                        <th><bean:message key="POD"/></th>
                        <td><!-- 
                        --><input type="text"   name="f_pod_cd" id="f_pod_cd"  maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:45px;"/><!-- 
                        --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('POD_LOCATION_POPLIST')"></button><!-- 
                        --><input type="text"   name="f_pod_nm" id="f_pod_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                        </td>
						<!-- OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen -->
						<th style="text-align:right; width:80px;"><bean:message key="Commodity"/></th>
						<td>
							<input type="text" id="f_cmdt_nm" name="f_cmdt_nm" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
							<button type="button" name="commodity" id="commodity" class="input_seach_btn" tabindex="-1" onClick="openPopUp('COMMODITY_POPLIST',this)"></button>
							<input type="hidden" id="f_cmdt_cd" name="f_cmdt_cd" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onkeydown="entSearch();"/>
						</td>
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
				<!--- Display option Begin --->
						<bean:define id="pagingVal" name="valMap"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
				<!--- Display option End --->                 
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
	
	
	<!-- ############################################### COMMON MEMO 1-4 ##################################################### -->
		
	<!-- ############################################### COMMON MEMO 1-4 ##################################################### -->
	
	
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
</body>
</html>
