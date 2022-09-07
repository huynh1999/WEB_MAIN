<%
/*=========================================================
*Copyright(c) 2013 CyberLogitec
*@FileName : RateExcelTemplatePopup.jsp
*@FileTitle : 
*Open Issues :
*Change history :
*@LastModifyDate : 2013.5.16
*@LastModifier : 김영철
*@LastVersion : 1.0
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging" prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/common/js/RateExcelTemplatePopup.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<form id="form" name="form" action="" method="post">
<input type="hidden" name="downloadLocation" />
<input type="hidden" name="downloadFileName" />
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
	
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="RATE_Excel_Template_D/L"/></span></h2>
		<!-- page_title(E) -->
					
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
		<div class="Btn_T">
			 <button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
			</div>
		</div>
		<!-- opus_design_btn(E) -->	
	
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation"></span>
		</div>
		<!-- page_location(E) -->
		
	</div>
	<!-- page_title_area(E) -->
</div>
<div class="layer_popup_contents">

		<div class="wrap_search">
			<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry entry_pannel">
				<table>
					<colgroup>
						<col width="80" />
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
		                    <th><bean:message key="Rate_Type"/></th>
		                    <td>
								<input type="radio" id="rate_type1" name="rate_type" value="S" checked></input><label for ="rate_type1"><bean:message key="Selling"/></label>
							    <input type="radio" name="rate_type" id="rate_type2" value="B"></input><label for = "rate_type2"><bean:message key="Buying"/></label>                 
		                    </td>
               			</tr>
                		<tr>
		                    <th><bean:message key="Freight_Mode"/></th>
		                    <td>
								<input type="radio" name="frt_mode" id="frt_mode1" value="S" checked></input><label for="frt_mode1"><bean:message key="Sea"/></label>
							    <input type="radio" name="frt_mode" id="frt_mode2"value="A"></input><label for="frt_mode2"><bean:message key="Air"/></label>    
							    <input type="radio" name="frt_mode" id="frt_mode3"value="D"></input><label for="frt_mode3"><bean:message key="Domestic"/></label>              
		                    </td>
                		</tr>
					</tbody>
				</table>
			</div>
			<!-- opus_design_inquiry(E) -->
		</div>
	</div>
<%-- <div id="PopUp">
	<div id="Pop_Contents">
		<h1 class="Pop_title">RATE Excel Template D/L</h1>
		<!----- Btn_T S ----->
        <!----- TB_List S ----->
        <div class="Search">
            <table>
                <colgroup>
					<col width="10%" />
					<col width=""/>
                </colgroup>
                <tr>
                    <th>Rate Type</th>
                    <td>
						<input type="radio" name="rate_type" value="S" checked></input>&nbsp;Selling
					    <input type="radio" name="rate_type" value="B"></input>&nbsp;Buying&nbsp;                  
                    </td>
                </tr>
                <tr>
                    <th>Freight Mode</th>
                    <td>
						<input type="radio" name="frt_mode" value="S" checked></input>&nbsp;Sea
					    <input type="radio" name="frt_mode" value="A"></input>&nbsp;Air&nbsp;    
					    <input type="radio" name="frt_mode" value="D"></input>&nbsp;Domestic&nbsp;              
                    </td>
                </tr>
            </table>
        </div>
        
        <!-----// TB_List E ----->
        <!----- Btn_T S ----->
        <div class="Btn_Pop">
            <a class="Btn_Common" href="javascript:btn_OK()"><span>OK</span></a>
            <a class="Btn_Common" href="javascript:window.close();" ><span>Close</span></a>
        </div>
        <!-----// Btn_T E ----->
	</div>
</div> --%>
</form>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>
