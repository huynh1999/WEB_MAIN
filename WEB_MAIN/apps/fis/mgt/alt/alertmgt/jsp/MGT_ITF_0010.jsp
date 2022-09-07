<%--
=========================================================
*@FileName   : MGT_ALT_0010.jsp
*@FileTitle  :
*@Description: 
*@author     : 
*@version    :
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/alt/alertmgt/script/MGT_ITF_0010.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<!-- OFC_CD -->
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var OFCCD = 'ALL|';
	<bean:define id="oficeList" name="valMap" property="ofcList"/> 
	<logic:notEmpty name="valMap" property="ofcList">
		<% boolean isBegin = false; %>
        <bean:define id="ofcList" name="valMap" property="ofcList"/>
        <logic:iterate id="ofcVO" name="ofcList">
            <% if(isBegin){ %>
                   OFCCD += '|';
            <% }else{
                   isBegin = true;
               } %>
            OFCCD+= '<bean:write name="ofcVO" property="ofc_cd"/>';
        </logic:iterate>
    </logic:notEmpty>
    
	<!-- Alert Entity Type -->
	var ETTCD = '|';
	var ETTVAL = '|';
	<% boolean isBegin = false; %>
    <bean:define id="alertEttList" name="valMap" property="alertEttList"/>
    <logic:iterate id="codeVO" name="alertEttList">
        <% if(isBegin){ %>
        ETTCD += '|';
        ETTVAL += '|';
        <% }else{
        	isBegin = true;
           } %>
        ETTCD+= '<bean:write name="codeVO" property="cd_nm"/>';
        ETTVAL+= '<bean:write name="codeVO" property="rmk"/>';
    </logic:iterate>

    <!-- Customer Type -->
	var CUST_CD = '';
	var CUST_VAL = '';
    <bean:define id="alertCustomerList" name="valMap" property="alertCustomerList"/>
    <logic:iterate id="codeVO" name="alertCustomerList">
        <% if(isBegin){ %>
        CUST_CD += '|';
        CUST_VAL += '|';
        <% }else{
        	isBegin = true;
           } %>
           CUST_CD+= '<bean:write name="codeVO" property="cd_val"/>';
           CUST_VAL+= '<bean:write name="codeVO" property="cd_nm"/>';
    </logic:iterate>
	
	<!--  Currency 선택 옵션 변경 //-->
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
	
	//Agent EDI Spec 추가 사항 2018.12.10
	<!-- ###Ship mode 항목### -->
	var SHIPMODCD1 = '|';
	var SHIPMODCD2 = '|';
	<!-- Ship mode 단위 -->
    <logic:notEmpty name="valMap" property="shipModeList">
		<% isBegin = false; %>
        <bean:define id="shipModeList" name="valMap" property="shipModeList"/>
        <logic:iterate id="codeVO" name="shipModeList">
            <% if(isBegin){ %>
            	SHIPMODCD1+= '|';
            	SHIPMODCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            SHIPMODCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
            SHIPMODCD2+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
    </logic:notEmpty>
    
	//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
	var vat_rt_dp_cnt = Number("<bean:write name="ofcVO" property="vat_rt_dp_cnt"/>");
	var xch_rt_dp_cnt = Number("<bean:write name="ofcVO" property="xch_rt_dp_cnt"/>");

	
	function setupPage(){
       	loadPage();
    }
	</script>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<form name="frm1" method="POST" action="./MGT_ITF_0010.clt" >
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="MGT_ITF_0010.clt"/>
	<input type="hidden" name="bl_no" id="bl_no" value=""/>
	<input type="hidden" name="bl_seq" id="bl_seq" value=""/>
	<input type="hidden" name="f_edi_tp" id="f_edi_tp" value=""/>
	<div class="page_title_area clear">
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<div class="opus_design_btn TOP">
			<%-- 
			<button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
			<button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> id="btnSave" onclick="doWork('SAVE')"><bean:message key="Save"/></button>
			<button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('DOWNLOAD')"><bean:message key="Download"/></button>
			 --%>
		</div>
		<div class="location">
			<span><%=LEV1_NM%></span> &gt;
			<span><%=LEV2_NM%></span> &gt;
			<span><%=LEV3_NM%></span>
			<a href="" class="ir">URL Copy</a>
		</div>
	</div>
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
            <table>
            	<colgroup>
            		<col width="60">
            		<col width="240">
            		<col width="70">
            		<col width="225">
            		<col width="60">
            		<col width="240">
            		<col width="70">
            		<col width="240">
            		<col width="70">
            		<col width="*">
            	</colgroup>
            	<tbody>
                    <tr>
                        <th><bean:message key="MBL_No"/></th> 
                        <td>
                            <input type="text" name="f_mbl_no" id="f_mbl_no" maxlength="50" value='<bean:write name="valMap" property="f_mbl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:198px;"/>
                        </td>
                        
                        <!-- #5083 [CLA] BL EDI Improvement Requests-->
                        <th><bean:message key="HBL_No"/></th> 
                        <td>
                            <input type="text" name="f_hbl_no" id="f_hbl_no" maxlength="50" value='<bean:write name="valMap" property="f_mbl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:198px;"/>
                        </td>
                        
                        <th><bean:message key="ETD"/></th>
                        <td><!-- 
                        --><input style="width: 77px;"  type="text" id="etd_strdt" name="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
						--><span class="dash">~</span><!--
						--><input style="width: 77px;" type="text" id="etd_enddt" name="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
						--><button type="button" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button> 
					    </td>
			            <th><bean:message key="ETA"/></th>
			            <td><!--
						--><input style="width: 77px;" type="text" id="eta_strdt" name="eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.eta_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
						--><span class="dash">~</span><!--
						--><input style="width: 77px;" type="text" id="eta_enddt" name="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.eta_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
						--><button type="button" onclick="doDisplay('DATE12', frm1);" class="calendar" tabindex="-1"></button>
					    </td>
					    <!-- #5083 [CLA] BL EDI Improvement Requests -->
						<th><bean:message key="Ref_No"/></th>
		                <td>
		                	<input type="text" name="f_ref_no" maxlength="40" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"  onkeydown="entSearch();"/>
		                </td>
                        
					</tr>
					<tr>
                        <th><bean:message key="POR"/></th>
                        <td><!-- 
                        --><input type="text"   name="f_por_cd" id="f_por_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_por',this, 'onKeyDown')" onBlur="codeNameAction('location_por',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('POR_LOCATION_POPLIST')"></button><!--
                        --><input type="text"   name="f_por_nm" id="f_por_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POR_LOCATION_POPLIST', frm1.f_por_nm.value);}"/></td>
                        </td>
			            <th><bean:message key="POL"/></th>
                        <td><!-- 
                        --><input type="text"   name="f_pol_cd" id="f_pol_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
                        --><input type="text"   name="f_pol_nm" id="f_pol_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/></td>
                        </td>
                        <th><bean:message key="POD"/></th>
                        <td><!-- 
                        --><input type="text"   name="f_pod_cd" id="f_pod_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                        --><input type="text"   name="f_pod_nm" id="f_pod_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/></td>
                        </td>
                        <th><bean:message key="DEL"/></th>
                        <td><!-- 
                        --><input type="text"   name="f_del_cd" id="f_del_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_del',this, 'onKeyDown')" onBlur="codeNameAction('location_del',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('DEL_LOCATION_POPLIST')"></button><!--
                        --><input type="text"   name="f_del_nm" id="f_del_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('DEL_LOCATION_POPLIST', frm1.f_del_nm.value);}"/></td>
                        </td>
                        
                        <!-- /* #1309-[BINEX] OI AMS LIST TO HAVE "AGENT ID" SEARCH FIELD */ -->
	                 	<th><bean:message key="Agent_ID"/></th>
	                 	<td>
	                 		<input type="text" id="f_agt_id" name="f_agt_id" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"onblur="strToUpper(this)"  onkeydown="entSearch();" />
	                 	</td>
                 	
					</tr>
					
					<!-- #5083 [CLA] BL EDI Improvement Requests -->                        
					<tr>
					<th><bean:message key="Container"/></th>
                    <td>
                            <input type="text" name="f_cntr_no" maxlength="14" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:199px;" />
                    </td>
					<th><bean:message key="Shipper"/></th>
	                <td>
	                	<input type="text" id="f_shpr_nm" name="f_shpr_nm" value='' onblur="strToUpper(this)" style="width:199px;text-transform:uppercase;" onkeydown="entSearch();" >
	                </td>
	                
	                <th><bean:message key="Consignee"/></th>
	                <td>
	                	<input type="text" id="f_cnee_nm" name="f_cnee_nm" value='' onblur="strToUpper(this)" style="width:199px;text-transform:uppercase;"  onkeydown="entSearch();">
	                </td>
					
					<th><bean:message key="Vessel_Voyage"/></th>
                 	<td>
                 		<input type="text" id="f_trnk_vsl" name="f_trnk_vsl" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;"onblur="strToUpper(this)"  onkeydown="entSearch();" />
                 		<input type="text" id="f_trnk_voy" name="f_trnk_voy" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" onblur="strToUpper(this)"  onkeydown="entSearch();" />
                 	</td>
                 	
                 	<th><bean:message key="Status"/></th>
                    <td>
                    <select name="f_sts_cd" id="f_sts_cd">
                   		<option value="">ALL</option>
                   		<option value="D" selected>Download</option>
                   		<option value="C">B/L Created</option>
                   	</select>
                    </td>
					
					</tr>
					<!-- Agent EDI Spec 추가 사항 2018.12.10 -->
					<tr>
						<th><bean:message key="Receiver"/> <bean:message key="Office"/></th>
	                    <td>
	                    	<div id="div_subcode"><!--
                            	--><input  type="hidden" name="f_sndr_brnc_ofc_cd" value=""/><!--
                            	--><input  type="text" name="f_rcvr_brnc_ofc_cd" value="" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"/>
                            </div>
	                    </td>
		                <th><bean:message key="dl_date"/></th>
                        <td><!-- 
                        --><input style="width: 77px;"  type="text" id="dl_strdt" name="dl_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.dl_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
						--><span class="dash">~</span><!--
						--><input style="width: 77px;" type="text" id="dl_enddt" name="dl_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.dl_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
						--><button type="button" onclick="doDisplay('DATE13', frm1);" class="calendar" tabindex="-1"></button> 
					    </td>
		                <th></th>
		                <td></td>
						<th></th>
		                <td></td>
	                 	<th></th>
		                <td></td>
					</tr>
				</tbody>
            </table>
	    </div>
	 </div>
	 <div class="wrap_result">
	    <div class="opus_design_grid">
	    	<table class = "sm">
		 		<tr height="20" >
               	 	<th width="300" class="table_search_head">
                       <bean:message key="Current_Status_BG_Color"/>
                    </th>
                     
                    <th bgcolor="#8BBDFF" width="200" class="table_search_head">
                       <bean:message key="Download"/>
                    </th>
                    <th bgcolor="#FAED7D" width="200" class="table_search_head">
                       <bean:message key="BL_Created"/>
                    </th>
                    <%-- <th bgcolor="#FFA7A7" width="200" class="table_search_head">
                       <bean:message key="Error"/>
                    </th> --%>
                    <th bgcolor="#FFFFFF" class="table_search_head"></th>                    
            	</tr>
            </table>  
            
			<script language="javascript">comSheetObject('sheet1');</script>
	   	</div>
	</div>
	 <div class="wrap_result">
	    <div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet2');</script>
	   	</div>
	</div>
</div>
</form>

<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>


<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>	

