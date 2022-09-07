<%--
=========================================================
*@FileName   : EDI_CSTM_0040.jsp
*@FileTitle  : 항공수입 인도승락서 국내세관 EDI 관리
*@Description: 항공수입 인도승락서 국내세관 EDI 관리
*@author     : Shin,Beom-Chul - Cyberlogitec
*@version    : 1.0 - 07/24/2009
*@since      : 07/24/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/krcstm/script/EDI_CSTM_0040.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
<!--
function setupPage() {
	initFinish();loadPage();doWork('SEARCHLIST01');
}
//-->
		<logic:notEmpty name="EventResponse" property="mapVal">
			<bean:define id="mapObj" name="EventResponse" property="mapVal"/>
			
			<!-- ###처리상태 코드## -->
			var TRMS_STS_CD = '';
	        var TRMS_STS_NM = '';
	        <% boolean isBegin = false; %>
			<logic:notEmpty name="mapObj" property="trmsStsList">
				<% isBegin = false; %>
				<bean:define id="trmsStsList"  name="mapObj" property="trmsStsList"/>
				<logic:iterate id="trmsStsVO" name="trmsStsList">
					<% if(isBegin){ %>
						TRMS_STS_CD+= '|';
						TRMS_STS_NM+= '|';
					<% }else{
						  isBegin = true;
					   } %>
					   TRMS_STS_CD+= '<bean:write name="trmsStsVO" property="cd_val"/>';
					   TRMS_STS_NM+= '<bean:write name="trmsStsVO" property="cd_nm"/>';
				</logic:iterate>		
			</logic:notEmpty>
		</logic:notEmpty>
</script>
<form name="frm1" method="POST" action="./">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd"/> 
    <input type="hidden" name="f_CurPage"/>
    <input type="hidden" name="f_edi_cre_seq">
    <input type="hidden" name="f_edi_msg_seq">
    <input type="hidden" name="f_edi_msg_no">
	<input type="hidden" name="f_edi_snd_seq">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="EDI_CSTM_0040.clt"/>
    
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
			<%-- 	   
	   		<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')" id="btnSearch" name="btnSearch"><bean:message key="Search"/></button>
	   		<button type="button" btnAuth="CTRADEWORLD" class="btn_normal" onclick="doWork('CALLCT')" id="btnCTradeWorld" name="btnCTradeWorld"><bean:message key="CTradeWorld"/></button>
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
            		<col width="100"></col>
            		<col width="200"></col>
            		<col width="80"></col>
            		<col width="140"></col>
            		<col width="90"></col>
            		<col width="100"></col>
            		<col width="*"></col>
            	</colgroup>
            	<tbody>
	           		<tr>
	           			<td><!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 --></td>
	           		</tr>
		            <tr>
						<th><bean:message key="Arrival_Date"/></th>
						<td><!--
						--><input type="text" name="f_arr_str_dt" id="f_arr_str_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_arr_end_dt);firCalFlag=false;"/>~ <!--
						--><input type="text" name="f_arr_end_dt" id="f_arr_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_arr_str_dt, this);firCalFlag=false;"/><!--
						--><button type="button" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
						</td>
		                <th><bean:message key="Flight_No"/></th>
		                <td>
		                    <input type="text" name="f_flt_no" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;">
		                </td>
		                <th><bean:message key="tit.trmsStatus"/></th>
		                <td>
		                	<bean:define id="trmsStsList" name="mapObj" property="trmsStsList"/>
							<select name="f_trms_sts" style= "width:80px;">
								<option value=''>전체</option>
								<logic:iterate id="trmsStsVO" name="trmsStsList">
									<option value='<bean:write name="trmsStsVO" property="cd_val"/>'><bean:write name="trmsStsVO" property="cd_nm"/></option>
								</logic:iterate>
							</select>
		                </td>
		                <td></td>
		            </tr>
            	</tbody>
            </table>
        </div>
    </div>
    <div class="wrap_result">
    	<div class="opus_design_grid">
	    	<h3 class="title_design"><bean:message key="Processe_Information"/></h3>
    		<div class="opus_design_btn">
		   		<button type="button" class="btn_accent" onclick="doWork('COMMAND01')"><bean:message key="EDI_Send"/></button>
		   	</div>
		   	<script language="javascript">comSheetObject('sheet1');</script>
	    </div>
	    <div id="disp_val_msg" style="width:80%;float:left!important;">
			<div class="layout_flex_fixed" style="width:770px;float:left!important">
		   		<h3 class="title_design"><bean:message key="Validation_Message"/></h3>
			</div>
			<table>
	 			<tr>
	 				<td>
	 					<textarea name="val_msg" cols="200" rows="7"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
	 				</td>
	 				<!-- td valign="top"" style="padding: 5px;">
	 					<button onClick="disp_val_msg.style.display='none';" style="cursor:hand" type="button" class="btn_normal"><bean:message key="Close"/></button>		
	 				</td -->
	 			</tr>
	 		</table>
		</div>
	</div>
</div>
</form>
<script type="text/javascript">
<%-- doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>"); --%>
</script>	
<script>
    var pDoc = parent.parent.document;
    hideProcess('WORKING', pDoc);
</script>

