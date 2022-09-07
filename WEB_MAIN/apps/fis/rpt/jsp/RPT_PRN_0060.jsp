<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0060.jsp
*@FileTitle  : Sea Tariff Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
--%>


<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	 <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0060.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript">
		function setupPage()
		{
			
		}
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd"  id="f_cmd"/>
	<input type="hidden" name="trdp_cd" id="trdp_cd" value="<bean:write name="tmpMap" property="trdp_cd"/>">
	<input type="hidden" name="air_sea_clss_cd" id="air_sea_clss_cd" value="<bean:write name="tmpMap" property="air_sea_clss_cd"/>">
	<input type="hidden" name="tariff_no" id="tariff_no" value="<bean:write name="tmpMap" property="tariff_no"/>">
	<!-- Report Value -->
	<input type="hidden" name="cmd_type" id="cmd_type"/>
	<input type="hidden" name="title" id="title" value="Freight Quotation"/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title"><bean:message key="Tariff_Print"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>		
		<!-- opus_design_btn(E) -->
		</div>
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation">
			<%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span>
			</span>
		</div>
		<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
  	<div class= "wrap_search">
  		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<tbody>
					<colgroup>
						<col width="110" />
						<col width="*" />
					</colgroup>
					<tr>
			            <th><bean:message key="Quotation_No"/></th>
			            <td><input type="text" name="quotation_no" id="quotation_no" dataformat="excepthan" style="ime-mode:inactive;width:210px;" value='<bean:write name="tmpMap" property="quotation_no"/>' class="search_form" readOnly></td>           
			        </tr>
				</tbody>	
			</table>
		</div>
		<div class="opus_design_inquiry wFit">
			<table>
				<tbody>
					<colgroup>
						<col width="110" />
						<col width="*" />
					</colgroup>
        			<tr>
		                <th>CUSTOMER</th>
		                <td><input type="text" name="trdp_nm" dataformat="excepthan" style="ime-mode:inactive;width:210px;" maxlength="50" value="<bean:write name="tmpMap" property="trdp_nm"/>" class="search_form"></td>
		            </tr>
        			<tr>
		                <th><bean:message key="Attention"/></th>
		                <td><input type="text" name="attn" dataformat="excepthan" style="ime-mode:active;width:210px;" maxlength="50" value="" class="search_form"></td>
		            </tr>
        			<tr>
		                <th><bean:message key="From"/></th>
		                <td><input type="text" name="name" dataformat="excepthan" style="ime-mode:inactive;width:210px;" maxlength="50" value="<bean:write name="tmpMap" property="name"/>" class="search_form"></td>
		            </tr>
        			<tr>
		                <th>TEL</th>
		                <td><input type="text" name="phn" dataformat="excepthan" style="ime-mode:inactive;width:210px;" maxlength="50" value="<bean:write name="tmpMap" property="phn"/>" class="search_form"></td>
		            </tr>
        			<tr>
		                <th>FAX</th>
		                <td><input type="text" name="fax" dataformat="excepthan" style="ime-mode:inactive;width:210px;" maxlength="50" value="<bean:write name="tmpMap" property="fax"/>" class="search_form"></td>
		            </tr>
        			<tr>
		                <th><bean:message key="EMail"/></th>
		                <td><input type="text" name="eml" dataformat="excepthan" style="ime-mode:inactive;width:210px;" maxlength="50" value="<bean:write name="tmpMap" property="eml"/>" class="search_form"></td>
		            </tr>
					<tr>
						<th><bean:message key="Remark"/></th>
						<td><textarea name="rmk" class="search_form" dataformat="excepthan" style="width:210px;height:130px;" maxlength="400"></textarea></td>
					</tr>
				</tbody>	
			</table>
		</div>
	</div>				
</div>
</form>	





