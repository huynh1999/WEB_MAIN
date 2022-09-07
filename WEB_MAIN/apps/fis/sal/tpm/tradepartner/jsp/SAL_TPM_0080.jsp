<%--
=========================================================
*@FileName   : SEE_DOC_1030.jsp
*@FileTitle  : LOAD PLAN
*@Description: LOAD PLAN
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/12/12
*@since      : 2011/12/12

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/14
*@since      : 2014/06/14
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0080.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	
	
<script type="text/javascript">
	var user_ofc_cd = "<%=userInfo.getOfc_cd()%>";
	var ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	var user_eml = "<%=userInfo.getEml()%>";
	var user_phn = "<%=userInfo.getPhn()%>";
	var user_fax = "<%=userInfo.getFax()%>";
	var usrid = "<%=userInfo.getUsrid()%>";
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>"
</script>
<script>
function setupPage(){
	loadPage();	
}
</script>
<form name="frm1" method="POST" action="./SAL_TPM_0080.clt">
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param" />
	<input type="hidden" name="mailTitle" /> 
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TPM_0080.clt"/>
	
	<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
	<input type="hidden" name="rpt_file_name_title"/>
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	  <%-- 
		  <button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
		  <button type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" 	class="btn_normal" onclick="doWork('NEW')"><bean:message key="New"/></button>
		  <button type="button" btnAuth="PRINT" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button>
		  <button type="button" btnAuth="COPY" class="btn_normal" onclick="doWork('COPY')"><bean:message key="Copy"/></button>
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
					<col width="105">
					<col width="190">
					<col width="105">
					<col width="170">
					<col width="90">
					<col width="200">
					<col width="110">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Work_Order_No"/></th>
						<td><input type="text" name="f_wo_no" maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px"></td>
						<th><bean:message key="Requested_By"/></th>
						<td><input type="text" name="iss_usrid" value='' maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onkeydown="entSearch();"></td>
						<th><bean:message key="Office"/></th>
                        <td>
                             <div id="div_subcode"> 
                                <bean:define id="oficeList" name="valMap" property="ofcList"/>
                                <input  type="hidden" name="s_ofc_cd" id="s_ofc_cd" od="s_ofc_cd" value="<bean:write name="valMap" property="ofc_cd"/>"/> 
                                <select name="f_ofc_cd" id="f_ofc_cd" >
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
                            </div> 
                        </td>
					</tr>
					<tr>
						<th><bean:message key="To_Trucking_Co"/></th>
						<td><!-- 
							 --><input type="text" name="trsp_trdp_cd" maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;" value='' onKeyDown="codeNameAction('trdpCode_trsp',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_trsp',this, 'onBlur')"><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="trn" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
							 --><input type="text" name="trsp_trdp_nm" maxlength="50" value='' class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('trn'), frm1.trsp_trdp_nm.value);}">
							 
						</td>
						<th><bean:message key="Pick_Up_At"/></th>
						<td><!-- 
							 --><input type="text"   name="org_rout_trdp_cd" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"  onKeyDown="codeNameAction('trdpCode_pickup',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_pickup',this, 'onBlur')"><!--
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="pic" onclick="doWork('PARTNER_POPLIST', this)"></button><!--
							 --><input type="text"   name="org_rout_trdp_nm" class="search_form" maxlength="50" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:120px;" value='' onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', document.getElementById('pic'), frm1.org_rout_trdp_nm.value);}">
							 
						</td>
						<th><bean:message key="Package_Qty"/></th>
						<td class="table_search_body"><!--
						--><input type="text" name="fm_pck_qty" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyPress="ComKeyOnlyNumber(this)" onchange="copyPckQty();" onkeydown="entSearch();" maxlength="7"/><span class="dash">~</span><!--
						--><input type="text" name="to_pck_qty" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onKeyPress="ComKeyOnlyNumber(this)" onkeydown="entSearch();" maxlength="7"/>
	                    </td>
						<th><bean:message key="GWeight_K"/></th>
						<td><!--
						--><input type="text" name="fm_grs_wgt" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onchange="copyGrsWgt();" onkeydown="entSearch();" maxlength="11" onKeyPress="onlyNumberCheck('.')"/><span class="dash">~</span><!--
						--><input type="text" name="to_grs_wgt" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:80px;" onkeydown="entSearch();" onKeyPress="onlyNumberCheck('.')" maxlength="11"/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
    	<h3 class="title_design mar_btm_8"><bean:message key="Pickup_Delivery_List"/></h3>
    	<div class="opus_design_grid">
	    	<script language="javascript">comSheetObject('sheet1');</script>
	    </div>
		<table>
			<tr>
				<td width="40px"><!-- 
					 --><bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/><!--
					 --><bean:define id="pagingVal" name="tmpMapVal"     property="paging"/><!--
					 --><paging:options name="pagingVal" defaultval="200"/>
				</td>
				<td align="center"><!-- 
					 --><table><!--
						 --><tr><!--
							 --><td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'><!--
							 --></td><!--
						 --></tr><!--
					 --></table>
				</td>
				<td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
			</tr>
		</table>
	</div>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
			
</div>
</form>
</body>
</html>

