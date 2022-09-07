<%--
=========================================================
*@FileName   : SEE_AMS_0010.jsp
*@FileTitle  : SEE AMS Search 
*@Description: SEE AMS Search 
*@author     : Chungrue
*@version    : 
*@since      : 

*@Change history:
*@author2     : Tuan.Chau
*@version    : 2.0 - 2014/06/04
*@since      : 2014/06/04
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/see/bmd/ams/script/SEE_AMS_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm 	= userInfo.getOfc_eng_nm();
		String usrNm 		= userInfo.getUser_name();
		String phn 			= userInfo.getPhn();
		String fax 			= userInfo.getFax();
		String email 		= userInfo.getEml();
	%>
<script>
function setupPage(){
	initFinish();
	loadPage();
}
</script>
	<form name="frm1" method="POST" action="./SEE_AMS_0010.clt">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_CurPage"> 
    
	<!-- ------------------------------------------------------ -->
	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_phn" value="<%= phn %>"/>
	<input	type="hidden" name="f_fax" value="<%= fax %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- ------------------------------------------------------ -->
    
    <!-- Report Value -->
	<input type="hidden" name="title" value="">
	<input type="hidden" name="file_name" value="">
	<input type="hidden" name="rd_param" value="">
	
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<input type="hidden" name="intg_bl_seq" value="">
	<input type="hidden" name="rlt_intg_bl_seq" value="">
	<input type="hidden" name="s_intg_bl_seq" value="">
	<input type="hidden" name="master_bl_no"  value=""> 
	<input type="hidden" name="house_bl_no"   value=""> 
	
	<!--#3712 [JAPT]HBL 단위로 EDI Entry 연결-->
	<input type="hidden" name="chk_hbl_no"  />
	<input type="hidden" name="chk_flg"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_AMS_0010.clt"/>
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		   <button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="document.forms[0].f_CurPage.value='';doWork('SEARCHLIST')"><bean:message key="Search"/></button>
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
<div class="over_wrap" height="100%">
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
            <table>
            	<colgroup>
            		<col width="80"></col>
					<col width="190"></col>
					<col width="100"></col>
					<col width="150"></col>
            		<col width="80"></col>
            		<col width="240"></col>
            		<col width="150"></col>
            		<col width="*"></col>
            	</colgroup>
            	<tbody>
                 <tr>
                      <th><bean:message key="ETD"/></th>
                      <td><!-- 
                       --><input style="width: 70px;"  type="text" id="etd_strdt" name="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
						 --><span class="dash">~</span><!--
						 --><input style="width: 70px;" type="text" id="etd_enddt" name="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
						 --><button type="button" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button> 
					 </td>
					 <th><bean:message key="MBL_No"/></th>
                     <td><!-- 
                                 -->
                            <input type="text" name="f_mbl_no" maxlength="20" value=""  onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onBlur="strToUpper(this);" onkeydown="entSearch();">
                            <input type="hidden" maxlength="40" name="f_ams_no"  />
                     </td>
					 <th><bean:message key="VSL_VOY"/></th>
	                 <td><!--
                          --><input type="hidden" name="f_trnk_vsl_cd" value='' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;" readonly><!--
                          --><input type="text" name="f_trnk_vsl_nm" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:173px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){vslPopup(frm1.f_trnk_vsl_nm.value);}" ><!-- 
                          --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="vslPopup('')"></button><!-- 
                          --><input type="text" name="f_trnk_voy_no" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="10" onblur="strToUpper(this)" />
					 </td>
					 <th><bean:message key="Status"/></th>
		             <td>
							<select name="f_msg_sts_cd" class="search_form" style="width:120px;text-align:left" >
						       	<option value="">ALL</option>
	                   		<bean:define id="stsList"  name="valMap" property="stsList"/>
					    	<logic:iterate id="sts" name="stsList">
		                   		<option value='<bean:write name="sts" property="cd_val"/>'><bean:write name="sts" property="cd_nm"/></option>
		                   	</logic:iterate>
							</select>
		             </td>
                     </tr>
                     <tr>
                        <th><bean:message key="ETA"/></th>
				        <td><!--
							--><input style="width: 70px;" type="text" id="eta_strdt" name="eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.eta_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
							--><span class="dash">~</span><!--
							--><input style="width: 70px;" type="text" id="eta_enddt" name="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.eta_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
							--><button type="button" onclick="doDisplay('DATE21', frm1);" class="calendar" tabindex="-1"></button>
						</td>
						
						<th><bean:message key="HBL_No"/></th>
                        <td><!--
                               --><input type="text" name="f_hbl_no" maxlength="20" value=""  onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onBlur="strToUpper(this);" onkeydown="entSearch();">
                        </td>
                         
                     	<th><bean:message key="POD"/></th>
                        <td><!-- 
                         	   --><input type="text" name="f_pod_cd" id="pod" maxlength="5" value='' onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:60px;"/><!--
                              --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('POD_LOCATION_POPLIST')" ></button><!--
                              --><input type="text" name="f_pod_nm" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:173px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/>
                        </td>
                        <th><bean:message key="SHOW_US_POD_ONLY"/></th>
						<td> 
							<input type="checkbox" name="ams_flag" id="ams_flag" value="Y" checked>
						</td>	
					</tr>
				</tbody>
          </table>
	   </div>
	</div>
    <!-- 검색 -->
    <div class="wrap_result">
    	<h3 class="title_design"><bean:message key="AMS_EDI_List"/></h3>
    	<div class="opus_design_grid">
	    	<script type="text/javascript">comSheetObject('sheet1');</script>
	    </div>
	    
    	<h3 class="title_design"><bean:message key="AMS_EDI_Result"/></h3>
    	<div class="opus_design_grid">
	    	<script type="text/javascript">comSheetObject('sheet2');</script>
	    </div>
    </div>
</div>
    </form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
	    
<%@page import="java.net.URLEncoder"%>

