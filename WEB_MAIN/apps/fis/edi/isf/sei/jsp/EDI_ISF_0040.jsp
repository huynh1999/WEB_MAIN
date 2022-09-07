<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_ISF_0040.jsp
*@FileTitle  : ISF (Ocean) List 
*@Description: ISF (Ocean) List(Smartlink 에서 내려준 데이터)
*@author     : 
*@version    : 
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<!-- #6545 - [BNX-LA] OI ISF EDI 화면- desposition 검색 조건 추가 관련 - Fixing: Wrong path -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/isf/sei/script/EDI_ISF_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script>	
	 function setupPage(){
     	loadPage();
     }
	 /* #6557 [BNX] ISF CREATE DATE */
	 var ofc_cd = "<%= userInfo.getOfc_cd() %>";
   </script>
<form name="frm1" method="POST" action="./EDI_ISF_0040.clt">
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="EDI_ISF_0040.clt"/>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
    
    <div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		   	<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button> 
			<button type="button" class="btn_normal" onclick="doWork('PRINT')"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><bean:message key="Print"/></button>
			<button type="button" class="btn_normal" onclick="doWork('HISTORY_PRINT')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>">History <bean:message key="Print"/></button> 
			<button type="button" class="btn_normal" onClick="doWork('EXCEL')" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btn_DownExcel"><bean:message key="Excel"/></button>
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
		<div class="opus_design_inquiry ">
             <table>
             	<colgroup>
             		<col width="100">
             		<col width="260">
             		<col width="60">
             		<col width="170">
             		<col width="90">
             		<col width="170">
             		<col width="110">
             		<col width="*">
             	</colgroup>
             	<tbody>
                   <tr>
                       <th><bean:message key="Created_Date"/></th>
                       <td><!-- 
							 --><input type="text" name="f_created_dtm_strdt" id="f_created_dtm_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_created_dtm_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
							 --><span class="dash">~</span><!--
							 --><input type="text" name="f_created_dtm_enddt" id="f_created_dtm_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_created_dtm_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
							 --><button type="button" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button>
						</td>
                   	   <th><bean:message key="ISF_No"/></th>
                       <td><!-- 
                            --><input name="f_isf_trac_no" maxlength="20" value="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();" >
                       </td>
                   	   <th><bean:message key="HBL_No"/></th>
                       <td><!-- 
                            --><input name="f_bl_no"  maxlength="20" value="" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();" >
                       </td>
                       
                       <th><bean:message key="HTS_Code"/></th>
                       <td><!-- 
                            --><input type="text" name="f_hts_cd"  maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();" >
                       </td>
				  </tr>
						
					<tr>
                        <th><bean:message key="ETD"/></th>
                        <td><!-- 
							 --><input type="text" name="f_isf_etd_strdt" id="f_isf_etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_isf_etd_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
							 --><span class="dash">~</span><!--
							 --><input type="text" name="f_isf_etd_enddt" id="f_isf_etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_isf_etd_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!--
							 --><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE12', frm1);"></button>
						</td>
                    	<th><bean:message key="Status"/></th>
                    	<td>
                    		<select name="f_msg_sts" class="search_form" style="width:150px;">
                       			   <option value="">ALL</option>
                                   <option value="A">Accepted</option>
                                   <option value="C"><bean:message key="Created"/></option>
                                   <option value="R">Rejected</option>
                                   <option value="S">Sent</option>
                              </select>
                      	</td>
                      	<th><bean:message key="Importer_No"/></th>
                        <td>
                        	<input type="text" name="f_isf_imp_no"  maxlength="20" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();" >
                        </td>
                        
                      	<th><bean:message key="Importer_Name"/></th>
                        <td>
                        	<input type="text" name="f_isf_imp_nm"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onkeydown="entSearch();" >
                        </td>
					</tr>
						
					<tr>
                    	<th><bean:message key="Customer_Ref_No"/></th>
                        <td>
                        	<input type="text" name="f_isf_cust_ref_no" maxlength="30" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:195px;"  onkeydown="entSearch();"/>
                        </td>
                        <!-- #6545 - [BNX-LA] OI ISF EDI 화면- desposition 검색 조건 추가 관련 - Fixing -->
                        <th><bean:message key="isf_disposition_cd"/></th>
                        <td>
                        	<bean:define id="isfDispositionCdList" name="valMap" property="ISF_DISPOSITION_CD"/>
                            <select name="f_isf_disposition_cd" id="f_isf_disposition_cd" class="search_form" style="width:150px;">
                                <option value="">ALL</option>
                                <logic:iterate id="isfDispositionCdVO" name="isfDispositionCdList">
                                    <option value='<bean:write name="isfDispositionCdVO" property="cd_val"/>'><bean:write name="isfDispositionCdVO"  property="cd_nm"/></option>
                                </logic:iterate>
                            </select>
                        </td>
					</tr>
				</tbody>		
	          </table>
	   		</div>
	   </div>
    
    <div class="wrap_result">
   		<h3 class="title_design">ISF LIST</h3>
    	<div class="opus_design_grid">
    		<script type="text/javascript">comSheetObject('sheet1');</script>
    	</div>
    </div>
</div>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
	  
</body>
</html>
