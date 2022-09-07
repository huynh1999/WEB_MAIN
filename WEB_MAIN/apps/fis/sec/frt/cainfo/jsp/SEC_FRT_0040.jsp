<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_FRT_0040.jsp
*@FileTitle  : Correction Advice
*@Description: Correction Advice list search
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sec/frt/cainfo/script/SEC_FRT_0040.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage(){
			initFinish();
			loadPage();
			doWork('SEARCHLIST');
			setTimeout("document.form.s_bl_no.focus();", 1000);
		}
	</script>
<bean:define id="objVO"  name="EventResponse" property="objVal"/>

<form name="form" method="POST" action="./">
	<!-- Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/> 
	<input	type="hidden" name="s_ca_no"/> 
	<input	type="hidden" name="s_intg_bl_seq"/> 
	<input	type="hidden" name="s_biz_clss_cd"/>

	<!-- 화면이동 변수 처리-->
	<input	type="hidden" name="pre_ofc_cd" value='<bean:write name="objVO" property="s_ofc_cd"/>'/>	
	<input	type="hidden" name="openMean" value='<bean:write name="objVO" property="openMean"/>'/>
	
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEC_FRT_0040.clt"/>
	<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
	<input type="hidden" name="bnd_clss_cd" value='<bean:write name="tmpMap" property="bnd_clss_cd"/>'/>
	<input type="hidden" name="air_sea_clss_cd" value='<bean:write name="tmpMap" property="air_sea_clss_cd"/>'/>
	<input type="hidden" name="biz_clss_cd" value='<bean:write name="tmpMap" property="biz_clss_cd"/>'/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 	   <!--
	   --><button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')"><bean:message key="New"/></button>
 --%>	   </div>
	   <!-- btn_div -->
	   <div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
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
               <tr>
                 <th width="45px"><bean:message key="BL_No"/></th>
                 <td width="200px"><input name="s_bl_no" type="text" maxlength="40" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:233px;" onblur="strToUpper(this)" value='<bean:write name="objVO" property="s_house_bl_no"/>'/></td>
                 <th width="100px"><bean:message key="Date_issued"/></th>
                 <td width="200px"><!--
                 --><input required type="text" name="s_rgst_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, form.s_rgst_enddt);firCalFlag=false;" style="width:72px;" maxlength="10" value='<bean:write name="objVO" property="s_rgst_strdt"/>'><!--
                 --><span class="dash">~</span><!--
                 --><input required type="text" name="s_rgst_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, form.s_rgst_strdt, this);firCalFlag=false;" style="width:72px;" maxlength="10" value='<bean:write name="objVO" property="s_rgst_enddt"/>'><!--
                 --><button type="button" id="s_rgst_dt_cal" name="s_rgst_dt_cal" class="calendar ir" onclick="doDisplay('DATE11', form);" tabindex="-1" ></button><!--
                 --></td>
                  <th width="70px"><label style="background-color:#d4f6ff;"><bean:message key="Status"/></label></th>
                  <td><!--
                 --><input type="radio" name="s_status" id="s_status1" value="N" <logic:equal name="objVO" property="s_status" value="N"> checked</logic:equal> ><label for="s_status1"><bean:message key="All"/></label> &nbsp;<!--
                 --><input type="radio" name="s_status" id="s_status2" value="I" <logic:equal name="objVO" property="s_status" value="I"> checked</logic:equal> ><label for="s_status2"><bean:message key="Issued"/></label> &nbsp;<!--
                 --><input type="radio" name="s_status" id="s_status3" value="C" <logic:equal name="objVO" property="s_status" value="C"> checked</logic:equal> ><label for="s_status3"><bean:message key="Confirmed"/></label> &nbsp;<!--
                 --></td>
               </tr>
	           <tr>
                    <th><bean:message key="Partner"/></th>
                    <td><!--
                    --><input name="s_trdp_cd" maxlength="20" type="text" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" value='<bean:write name="objVO" property="s_trdp_cd"/>' onKeyPress="codeNameAction('partner_trsp',this, 'onKeyDown')" onKeyDown="codeNameAction('partner_trsp',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('partner_trsp',this, 'onBlur')"><!--
                    --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('PARTNER_POPLIST')"></button><!--
                    --><input name="s_trdp_full_nm" maxlength="50" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" value='<bean:write name="objVO" property="s_trdp_full_nm"/>' readOnly><!--
                    --></td>
                    <th><bean:message key="Office"/></th>
					<td colspan="3"><!--
					--><logic:notEmpty name="EventResponse"><!--
					--><bean:define id="tmpMap"  name="EventResponse" property="mapVal"/><!--
					--><bean:define id="oficeList" name="tmpMap" property="ofcList"/><!--
					--><bean:define id="ofc_cd" name="tmpMap" property="ofc_cd"/><!--
					--><input	type="hidden" name="s_ofc_cd" value='<bean:write name="tmpMap" property="ofc_cd"/>'/><!--
					--><select required name="f_ofc_cd" style="width:158px;"/><!--
					--><bean:size id="len" name="oficeList" /><!--
					--><logic:greaterThan name="len" value="1"><!--
					--><option value=''>ALL</option><!--
					--></logic:greaterThan><!--
					--><logic:iterate id="ofcVO" name="oficeList"><!--
					--><option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option><!--
					--></logic:iterate><!--
					--></select><!--
					--></logic:notEmpty><!--
					--></td>
                </tr>
            </table>
		</div>
	</div>
    <div class="wrap_result">
    	<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
    </div>
</div>
</form>
		
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	

