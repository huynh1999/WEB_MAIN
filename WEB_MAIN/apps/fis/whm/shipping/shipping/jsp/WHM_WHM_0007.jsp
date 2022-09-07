<%--
=========================================================
*@FileName   : WHM_WHM_0007.jsp
*@FileTitle  : Warehouse Shipping
*@Description: Warehouse Shipping
*@author     : Cuong.Le - DOU Networks
*@version    : 1.0 - 2014-12-25
*@since      : 2011/11/03
=========================================================
--%>
<%@page import="java.util.HashMap"%>
<%@page import="com.clt.framework.core.layer.event.EventResponse"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	    
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="./apps/fis/whm/shipping/shipping/script/WHM_WHM_0007.js?ver=<%=CLT_JS_VER%>"></script>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm   = userInfo.getOfc_eng_nm();
		String usrNm        = userInfo.getUser_name();
		String usrId        = userInfo.getUsrid();
		String email        = userInfo.getEml();
		String file_no 		= request.getParameter("file_no");
		String rgst_ofc_cd  = request.getParameter("rgst_ofc_cd");
		Boolean str = false;
		if("".equals(file_no) || file_no==null){
			file_no = "";
		}
		
		if("".equals(rgst_ofc_cd) || rgst_ofc_cd==null){
			rgst_ofc_cd = ofc_cd;
		}
	%>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var rgst_ofc_cd = "<%= rgst_ofc_cd %>";
		var ofc_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
		var h_ut_tp_cd = "";
		if(typeof(ofc_size_ut_cd)!='undefined'){
			h_ut_tp_cd = ofc_size_ut_cd;
		}
	</script>
    
<script>
	var fllNo = "<%=file_no%>";
	var UNITCD1 = '';
	var UNITCD2 = '';
	function setSelect(){
		var formObj = document.frm1;
		
		<!-- Freight Unit 단위 -->
        <logic:notEmpty name="valMap" property="UNITCD">
			<% boolean isBegin = false; %>
            <bean:define id="unitList" name="valMap" property="UNITCD"/>
            <logic:iterate id="codeVO" name="unitList">
                <% if(isBegin){ %>
                    UNITCD1+= '|';
                    UNITCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                UNITCD1+= '<bean:write name="codeVO" property="pck_nm"/>';
                UNITCD2+= '<bean:write name="codeVO" property="pck_ut_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
	}
</script>
<script>
    function setSelectCm(){
		   var formObj = document.frm1;
		   if('CM' == '<bean:write name="hmOutParam" property="len_ut_cd"/>') {
				formObj.f_len_ut_cd[0].checked = "Y";
			}else{
				formObj.f_len_ut_cd[1].checked = "Y";
			}
	   }
    </script>
<script>
function setupPage(){
	setSelectCm();
	setSelect();
	loadPage();
	if(""!=fllNo){
		doWork('SEARCH');
	}else{
		document.frm1.file_no.value = "";
	}
}
</script>
	<form name="frm1" method="POST" action="./WHM_WHM_0007.clt">

	<input type="hidden" name="modifyFlg"/>
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_save_sts_flg"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="f_intg_bl_seq" 		/>
	<input type="hidden" name="f_oth_seq" 			/>
	<!--  input type="hidden" name="f_bl_no" 			value=""/ -->
	<input type="hidden" name="f_air_sea_clss_cd" 	/>
	<input type="hidden" name="f_biz_clss_cd" 		/>
	<input type="hidden" name="f_bnd_clss_cd" 		/>
	<input type="hidden" name="f_inv_seq"	 		/>
	<input type="hidden" name="rcv_shp_tp_cd"	value ="SHP" 		/>
	
	<input type="hidden" name = "f_frgn_curr_cd">
	<input type="hidden" name = "f_frgn_amt">
	<input type="hidden" name = "f_frgn_vat_amt">
	<input type="hidden" name = "f_frgn_sum_amt">
	<input type="hidden" name = "f_curRow">
	
	<input type="hidden" name = "temp_bl_no" />
	<input type="hidden" name = "temp_oth_no" />
	<input type="hidden" name = "temp_inv_no" />
	
	<input type="hidden" name = "f_old_sum_amt">

	<!-- ------------------------------------------------------ -->
	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_usr_id" value="<%= usrId %>"/>
	<input	type="hidden" name="f_email" value="<%=email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- ------------------------------------------------------ -->
	
	<!-- ------------------------------------------------------ -->
	<!-- 프린트용    -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	
	<input type="hidden" name="t_wh_recp_no"  >

	<input type="hidden" name="old_recp_no" />
	
	<!-- ------------------------------------------------------ -->
	
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
	   		<button type="button" class="btn_accent" name="btn_Retrieve" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" id="btn_Retrieve" btnType="SEARCH"  onclick="doWork('SEARCH')">Search</button> 
	   		<button type="button" class="btn_normal" name="btn_Print" style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" id="btn_Print" btnType="PRINT" onclick="doWork('PRINT')">Picking Slip</button> 
			<button type="button" class="btn_normal" name="btn_New" id="btn_New" btnType="BTN_NEW"  onclick="clearData()">New</button>
			<button type="button" class="btn_normal" name="btn_Save" style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>" id="btn_Save" btnType="BTN_SAVE" onclick="doWork('SAVE')">Save</button>
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
	<div class="over_wrap">
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
            	<colgroup>
            		<col width="130"></col>
            		<col width="*"></col>
            	</colgroup>
            	<tbody>
					<tr>
						<th><bean:message key="Shipping_No"/></th>
						<td>
							<input type="text" name="file_no" id="file_no" maxlength="20" onKeyPress="ComKeyOnlyAlphabet('num','45')" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled;width:190px;text-transform:uppercase;" value="<%=file_no%>"><!-- 
						    --><bean:define id="oficeList" name="valMap" property="ofcList"/>
		                   <input  type="hidden" name="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/>
		                   <select name="ofc_cd_list" id="ofc_cd_list" >
						         <bean:size id="len" name="oficeList" />
						         <logic:greaterThan name="len" value="1">
						         </logic:greaterThan>
				                <logic:iterate id="ofcVO" name="oficeList">
				                  	<logic:equal name="ofcVO" property="ofc_cd" value="<%=rgst_ofc_cd%>" >
				                   		  <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                	</logic:equal>
				                	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= rgst_ofc_cd%>" >
				                   		  <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                	</logic:notEqual>
				                </logic:iterate>
		                   </select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="wrap_result">	
		<div class="opus_design_inquiry">
            <table>
            	<colgroup>
            		<col width="130"></col>
            		<col width="350"></col>
            		<col width="130"></col>
            		<col width="*"></col>
            	</colgroup>
            	<tr>
                  <th><bean:message key="Shipping_No"/></th>
                  <td nowrap>
                  <input type="text" name="cre_file_no" id="cre_file_no" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:190px;text-transform:uppercase;" onblur="strToUpper(this);checkDupInsertFileNo();" onclick="if(frm1.cre_file_no.value=='AUTO'){frm1.cre_file_no.value=''}"><!-- 
				    --><bean:define id="oficeList" name="valMap" property="ofcList"/>
                   <input  type="hidden" name="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/>
                   <select name="cre_ofc_cd_list" id="cre_ofc_cd_list" >
				         <bean:size id="len" name="oficeList" />
				         <logic:greaterThan name="len" value="1">
				         </logic:greaterThan>
		                <logic:iterate id="ofcVO" name="oficeList">
		                  	<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
		                   		  <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                	</logic:equal>
		                	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
		                   		  <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                	</logic:notEqual>
		                </logic:iterate>
                   </select></td>
                  <th><bean:message key="Shipped"/></th>
                  <td>
                  		<input name="rcv_shp_flg" id="rcv_shp_flg" type="checkbox" value="Y" onchange="checkRollback()" >
                  </td>
              	</tr>
              	<tr>
                    <th><bean:message key="Warehouse"/></th>
                    <td nowrap><bean:define id="warehouseCdList" name="valMap" property="whCdList"/>
					<select name="wh_cd" id="wh_cd" style="width:270px;" required onchange="searchLocId()">
					<option value=''></option>
					 <bean:size id="len" name="warehouseCdList" />
						<logic:greaterThan name="len" value="1">
					    </logic:greaterThan>
			        	<logic:iterate id="wh" name="warehouseCdList">
			        		<option value='<bean:write name="wh" property="wh_cd"/>'><bean:write name="wh" property="wh_nm"/></option>
			        	</logic:iterate>
		        	</select>
					</td>
                    <th><bean:message key="Operator"/></th>
                    <td><!-- 
				    --><input type="text" name="opr_cd" id="opr_cd" value="" class="search" 
           				onBlur="GetRegisterOfficeCd('OPERATOR');checkOprCd()" 
           				dataformat="excepthan" style="ime-mode:disabled; width:100px" ><!-- 
				    --><button name="btn_rcv" id="btn_rcv" type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('RECP_USER_POPLIST')"></button><!-- GetUserInfo
				    --><input type="text" name="opr_nm" id="opr_nm" dataformat="excepthan" style="ime-mode:disabled; width:137px;text-align:left" readonly><!-- 
           		 --><input type="text" name="ofc_cd_opr" id="ofc_cd_opr" value="" style="width:200px;display: none" class="search" ></td>
                </tr>
                
                 <tr>
                	<th><bean:message key="Contract_No"/></th>
					<td>
						<input name="s_ctrt_no" id="s_ctrt_no" type="text" class="L_input" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);getCtrtInfo(this);" maxlength="10" onChange="getCtrtInfo(this)" required/><!-- 
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onclick="doWork('btn_ctrt_no')" class="input_seach_btn" tabindex="-1"></button><!-- 						
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:137px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('btn_ctrt_no_name');}" readonly />
					</td>
					 <th><bean:message key="Estimated_Shipping_Date"/></th>
                    <td ><input type="text"  name="estm_rcv_dt" id="estm_rcv_dt" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Booking Date');"  style="width:75px;text-align:center;"><button type="button" id="f_recp_dt_cal" onclick="doDisplay('DATE2', frm1);" class="calendar" tabindex="-1"></button></td>
                </tr>
                
                <tr>
                    <th><bean:message key="Customer"/></th>
                   <td><!-- 
				    --><input type="text" name="cust_cd" id="cust_cd" value="" class="search"  readOnly
           					 onKeyDown="codeNameAction('CUSTUMER',this, 'onKeyDown');GetRegisterOfficeCd('CUSTOMER')" 
           				onBlur="strToUpper(this);codeNameAction('CUSTUMER',this, 'onBlur');GetRegisterOfficeCd('CUSTOMER')" 
           				dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px" disabled="disabled"><!-- 
				    --><!--button type="button" name="btn_cust" id="btn_cust" class="input_seach_btn" tabindex="-1" onclick="doWork('CT_POPLIST')" disabled="disabled"></button--	><!-- 
				    --><input type="text" name="cust_nm" id="cust_nm" value="" style="width:166px;" class="search" readonly ><!-- 
           		 --><input type="text" name="ofc_cd_cust" id="ofc_cd_cust" value="" style="width:200px;display: none" class="search" ></td>
                    
                     <th><bean:message key="Shipped_Date"/></th>
                   <td><!-- 
				    --><input type="text"  name="rcv_shp_dt" id="rcv_shp_dt" maxlength="10" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false,1)" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Shipping Date');"  style="width:75px;text-align:center;"><!-- 
				    --><button type="button" id="rcv_dt_cal" name="rcv_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button><!-- 
				    --><input type="text"  name="rcv_shp_tm" id="rcv_shp_tm" maxlength="4"   style="width:50px;text-align:center;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
                
                    
                     </tr>
                <tr>
                   <th><bean:message key="Delivery_To"/></th>
                   <td><!-- 
				    --><input type="text" name="splr_rcvr_cd" id="splr_rcvr_cd" 
				    	 onKeyDown="codeNameAction('SUPPLIER',this, 'onKeyDown');GetRegisterOfficeCd('SUPPLIER')" 
           				onBlur="strToUpper(this);codeNameAction('SUPPLIER',this, 'onBlur');GetRegisterOfficeCd('SUPPLIER')" 
           				dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px"><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('SU_POPLIST')"></button><!-- 
				    --><input type="text" name="splr_rcvr_nm" id="splr_rcvr_nm" dataformat="excepthan" style="ime-mode:disabled; width:137px;text-align:left" onKeyDown="if(event.keyCode==13){doWork('SU_POPLIST_NAME');}" readonly><!-- 
           		 --><input type="text" name="ofc_cd_splr" id="ofc_cd_splr" value="" style="width:200px;display: none" class="search" ></td>
                 <th><bean:message key="Pallet"/></th>
                  <td><input type="text" maxlength="19" name="plt_no" id="plt_no" dataformat="excepthan" onkeyPress="onlyNumberCheck();" onKeyUp="onlyNumberCheck();"  onchange="validNumber(this);" style="ime-mode:disabled; width:137px;text-align:left"></td>
               </tr>
               <tr>
                   <th><bean:message key="Trucker"/></th>
                   <td><!-- 
				    --><input type="text" name="trkr_cd" id="trkr_cd" 
				    	 onKeyDown="codeNameAction('TRUCKER',this, 'onKeyDown');GetRegisterOfficeCd('TRUCKER')" 
           				onBlur="strToUpper(this);codeNameAction('TRUCKER',this, 'onBlur');GetRegisterOfficeCd('TRUCKER')" 
           				dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px"><!-- 
				    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('TR_POPLIST')"></button><!-- 
				    --><input type="text" name="trkr_nm" id="trkr_nm" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:137px;text-align:left" onKeyDown="if(event.keyCode==13){doWork('TR_POPLIST_NAME');}" readonly><!-- 
           		 --><input type="text" name="ofc_cd_trkr" id="ofc_cd_trkr" value="" style="width:200px;display: none" class="search" ></td>
                  <th><bean:message key="Cntr_No"/></th>
                  <td><input type="text" maxlength="20" name="cntr_no" id="cntr_no" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:137px;text-align:left"></td>
             
               </tr>
               <tr>
                  <th><bean:message key="Customer_Ref_No"/></th>
                  <td><input type="text" name="cust_ref_no" id="cust_ref_no" maxlength="20" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:137px;text-align:left"></td>
                     <th><bean:message key="MBL_No"/></th>
	                  		<td><input type="text" maxlength="20" name="mst_bl_no" id="mst_bl_no" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:137px;text-align:left"></td></tr>
                  	
              <tr>
                  <th rowspan="2"><bean:message key="Internal_Remark"/><!--M1234--></th>
                  <td rowspan="2"><textarea name="inter_rmk" id="inter_rmk" maxlength="3999"  onBlur="strToUpper(this);onBlurTextCounter(this, 3999);" dataformat="excepthan" rows="4" style="width:270px;" ></textarea></td>
           		  <th><bean:message key="HBL_No"/></th>
           		  <td><input type="text" maxlength="20" name="hus_bl_no" id="hus_bl_no" dataformat="excepthan" style="ime-mode:disabled;  text-transform:uppercase;width:137px;text-align:left"></td>
              </tr>
              <tr>
              	  <th><bean:message key="Issued_At"/></th>
                  <td><input name="cre_dt" id="cre_dt" type="text" class="search_form" readOnly dataformat="excepthan" style="ime-mode:disabled;width:137px;"   class="search_form"></td>
              	  <th></th>
                  <td></td>	
              </tr>
              <tr>
                  <th><bean:message key="External_Remark"/></th>
                  <td><textarea name="xter_rmk" id="xter_rmk" maxlength="3999"  onBlur="strToUpper(this);onBlurTextCounter(this, 3999);" dataformat="excepthan" rows="4" style="width:270px;" ></textarea></td>
              	  <th></th>
                  <td></td>	
              </tr>
          </table>
   </div>
   <div class="opus_design_grid">
	   		<table>
		<colgroup>
			<col width ="70"/>
			<col width ="500"/>
			<col width ="*"/>
		</colgroup>
		<tbody>
			<tr>
				<td><input type="hidden" name="size_ut_cd1" /><!-- 
	 				--><h3 class="title_design mar_btm_4"><bean:message key="Item"/>&nbsp;(<span id="sh_ut_tp_cd"></span>)</h3></td>
  				<td style="display:none;">
  				<bean:define id="lenCdList" name="valMap" property="UNITCD2"/>
  				<bean:size id="len" name="lenCdList" />
		         <logic:greaterThan name="len" value="1">
		         </logic:greaterThan>
                <logic:iterate id="lenVO" name="lenCdList">
                   		  <input type="radio" name="f_len_ut_cd" value=<bean:write name="lenVO" property="cd_val"/> onClick="javascript:chkSizeType();" checked><label><b><bean:write name="lenVO" property="cd_nm"/></label></b>
                </logic:iterate>
  				</td>
  			
				<td>
					<div class="opus_design_btn">
						<button style="cursor:hand" type="button" class="btn_normal"  onClick="setGrdSizeStup(docObjects[0], 20)" ><bean:message key="Plus"/></button>
						<button style="cursor:hand" type="button" class="btn_normal" onClick="setGrdSizeStup(docObjects[0], 12)"><bean:message key="Minus"/></button>	
   						<button type="button" class="btn_normal"  name="btn_invt_add" id="btn_invt_add" onclick="doWork('INVT_ADD')"><bean:message key="Stock_selection"/></button>
   						<button style='display:none' type="button" class="btn_normal"  name="btn_add" id="btn_add" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
   					</div>
   				</td>
			</tr>
		</tbody>
	</table>
	   		<script type="text/javascript">comSheetObject("sheet1");</script>
	   		<script type="text/javascript">comSheetObject("sheet2");</script>
   		</div>
</div>
</div>
</form>
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
