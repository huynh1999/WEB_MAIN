<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0250.js?ver=<%=CLT_JS_VER%>"></script>	                     
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- bean:define id="hmOutParam"  name="EventResponse" property="objVal"/-->
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
<script type="text/javascript">

$(document).ready(function(){
    $('#hd_tit').on('change', function() {
        if(this.value == "BKF"){
        	$('input[type=checkbox]').prop("checked",true);
        	$('#seaway_bill_yn').val("Y");
        }else{
        	$('input[type=checkbox]').prop("checked",false);
        	$('#seaway_bill_yn').val("");
        }        
        
    });
    
    $('#seaway_bill_yn').on('change', function() {
    	if($('input[type=checkbox]').prop("checked")){
    		$('#seaway_bill_yn').val("Y");
    	}else{
    		$('#seaway_bill_yn').val("");
    	}
    });
});

function setupPage(){
	loadPage();
}
	
//-->
</script>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="intg_bl_seq" value="<%= request.getParameter("intg_bl_seq") %>"/>
	<input	type="hidden" name="usrPhn" value="<%= request.getParameter("usrPhn") %>"/>
	<input	type="hidden" name="usrFax" value="<%= request.getParameter("usrFax") %>"/>
	<input	type="hidden" name="usrEml" value="<%= request.getParameter("usrEml") %>"/>	
	<input	type="hidden" name="bl_no"  value="<%= request.getParameter("bl_no") %>"/>	
	<input	type="hidden" id="check_seaway_bill_yn" name="check_seaway_bill_yn"  value=""/>
	<input	type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>"/>
	
	<input id="file_name" name="file_name" type="hidden" />
	<input id="title" name="title" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />

	<input id="mailTitle" name="mailTitle" value="" type="hidden" />
	<input id="mailTo" name="mailTo" value="" type="hidden" />

	<input id="master_bl_no" name="master_bl_no" type="hidden" />
	<input id="house_bl_no" name="house_bl_no" type="hidden" />
	
	<!--  Document List ==> Common Memo 연동 파라미터 (S) -->
    <input type="hidden" name="palt_mnu_cd" id="palt_mnu_cd" />
    <input type="hidden" name="opr_no" id="opr_no" />
	<!--  Document List ==> Common Memo 연동 파라미터 (E) -->

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input id="rpt_biz_tp" name="rpt_biz_tp" type="hidden" />
	<input id="rpt_biz_sub_tp" name="rpt_biz_sub_tp" type="hidden" />
	<input id="rpt_tp/" name="rpt_tp/" type="hidden" />
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<!-- GridSetting Value -->
	<input id="user_id" name="user_id" value="<%=userInfo.getUsrid()%>" type="hidden" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_BMD_0070.clt"/>
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<input id="rpt_intg_bl_seq" name="rpt_intg_bl_seq" type="hidden" />
	
	<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
	<input type="hidden" name="rpt_file_name_title"/>
	
	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
	<!-- ------------------------------------------------------------------------- -->
	<div class="layer_popup_title">
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span id="span_title"><bean:message key="Ocean_Export_SR"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('PRINT')" id="btnPrint"><bean:message key="Print"/></button><!-- 
		--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
		--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry ">
	   		<table>
	   			<colgroup>
	   				<col width="150"></col>
	   				<col width="*"></col>
	   			</colgroup>
	   			<tbody>
	   				<tr>
	   					<td colspan="2"><h3  class="title_design"><bean:message key="Basic_Information"/></h3></td>
	   				</tr>
	   				<tr height="9px"/>
	   				<tr>
   						<th><bean:message key="Select_Title"/></th>
	                    <td>
							<bean:define id="HeaderTitleList" name="valMap" property="HeaderTitleList"/>
							<select id="hd_tit" name="hd_tit" style= "width:150px;">								
								<logic:iterate id="comVO" name="HeaderTitleList">
									<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
								</logic:iterate>
							</select>
					    </td>
					</tr>	    
	   				<!--tr>
	   					<th><bean:message key="Header_Title"/></th>
	   					<td>
	   								<select id="hd_tit" name="hd_tit" style= "width:210px;">									
									<option value='Master Bill of Lading'>Master Bill of Lading</option>
									<option value='Booking Form'>Booking Form</option>									
									<option value='Shipping Request'>Shipping Request</option>
									<option value='Shipping Instruction'>Shipping Instruction</option>
								</select>
						</td>		
	   				</tr-->
	   				<tr height="9px"/>
	   				<tr>
                        <th><input type="checkbox" name="seaway_bill_yn" id="seaway_bill_yn" value="" ></th>
                        <td><label for="f_pck_rpt_opt1"><bean:message key="Seaway_Bill_Watermark"/></label></td>
                    </tr>             
                    <tr height="9px"/>       
                   </tbody>
	   		</table>            
	   	</div>
	</div>
    <div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
	</div>
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>



