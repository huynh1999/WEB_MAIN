<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
     <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/sal/tpm/tradepartner/script/SAL_TPM_0130.js?ver=<%=CLT_JS_VER%>"></script>
<script>
	function setupPage(){
	 	loadPage();
	}
</script>

<form name="frm1" method="POST" action="./SAL_TPM_0130.clt">
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SAL_TPM_0130.clt"/>
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>">Search</button>
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
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="70">
					<col width="140">
					<col width="70">
					<col width="200">
					<col width="100">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="From"/></th>
						<td><!-- 
						 --><input type="text" name="f_fm_trdp_cd" id="f_fm_trdp_cd" maxlength="20" onKeyDown="codeNameAction('partner_pickup_delete', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_pickup_delete',this, 'onBlur')" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:70px;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('PARTNER_POPLIST',this)" disabled="disabled"></button><!-- 
						 --><input type="text"   name="f_fm_trdp_nm" maxlength="50" onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:300px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST_NAME', document.getElementById('partner'), frm1.f_fm_trdp_nm.value);}"></td>
						<th><bean:message key="Merged_By"/></th>
						<td colspan="3"><input type="text"   name="rgst_usrid" value="" class="search_form-disable" style="width:75px;">
					</tr>
					<tr>
						<th><bean:message key="To"/></th>
						<td><!-- 
						 --><input type="text" name="f_to_trdp_cd" id="f_to_trdp_cd" maxlength="20" onKeyDown="codeNameAction2('partner_pickup', this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction2('partner_pickup',this, 'onBlur')" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:70px;"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('PARTNER_POPLIST2',this)"></button><!-- 
						 --><input type="text"   name="f_to_trdp_nm" maxlength="50" onblur="strToUpper(this)" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:300px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST2_NAME', document.getElementById('partner'), frm1.f_to_trdp_nm.value);}"></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>	
	<div class="wrap_result">
		<h3 class="title_design mar_btm_8"><bean:message key="Trade_Partner_Merge_History"/></h3>
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>

    	<div class="opus_design_inquiry">
		<!--- Paging(공통) --->
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <td width="60px"><!--- 
                      Display option Begin 
                      ---><bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
                      <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
                      <paging:options name="pagingVal" defaultval="200"/> 
					  </td>
                      <td align="center">
                          <table  border="0" width="100%">
                              <tr><td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
                              </tr>
                          </table>
                      </td>
                      <td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
                  </tr>
               </table>
        </div>
     </div>
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
			
</div>
</form>

