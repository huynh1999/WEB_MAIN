<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RPT_PRN_0090.jsp
*@FileTitle  : B/L Print
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	 <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0090.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript"">
		//memo 를 핸들링 하는 부분
		function setupPage()
		{}
		function chkText(){
			if(document.frm1.bl_type[0].checked) {
				document.frm1.bl_memo.value = "";
				document.frm1.bl_memo.disabled = true;
				document.frm1.stamp_type.disabled = false;
			}else if(document.frm1.bl_type[1].checked){
				document.frm1.bl_memo.value = "";
				document.frm1.bl_memo.disabled = true;
				document.frm1.stamp_type.disabled = true;
			}else{
				document.frm1.bl_memo.disabled = false;
				document.frm1.stamp_type.disabled = false;
			}
		}
	</script>
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input	type="hidden" name="intg_bl_seq" id="intg_bl_seq" value="<bean:write name="tmpMap" property="intg_bl_seq"/>"/>
	<!-- Report Value -->
	<input type="hidden" name="cmd_type" id="cmd_type" />
	<input type="hidden" name="title" value="B/L Print" id="title" />
	<input type="hidden" name="stamp" id="stamp" />
	<input type="hidden" name="all" id="all" />
		<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title"><bean:message key="BL_Print"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" onclick="doWork('PRINT')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- 
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
			            <th><bean:message key="BL_Number"/></th>
			            <td><input name="master_bl_no" id="master_bl_no" type="text" value='<bean:write name="tmpMap" property="master_bl_no"/>' class="search_form" readOnly></td>           
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
		                <td colspan="2"><b><bean:message key="BL_Type"/></b></td>
		            </tr>
	              	<tr>
		                <td colspan="2"><input type="radio" name="bl_type" id="bl_type" value="1" onclick="javascript:chkText();" checked><label for="bl_type">GENERAL</label></td>
		            </tr>  
		            <tr>  
		                <td colspan="2"><input type="radio" name="bl_type" id="bl_type2" value="2" onclick="javascript:chkText();"><label for="bl_type2"><bean:message key="Original"/> Sets</label></td>
		            </tr>
		            <tr>  
		                <td colspan="2"><input type="radio" name="bl_type" id="bl_type3" value="3" onclick="javascript:chkText();"><label for="bl_type3">CHECK B/L</label></td>
		            </tr>
        			<tr>
		                <td colspan="2"><b><bean:message key="Stamp"/></b></td>
		            </tr>
		            <tr>
		            	<td colspan="2">
			            	<select id="stamp_type">
			            		<option value="NON">NO SELECT</option>
			            		<option value="ORG">ORIGINAL</option>
			            		<option value="DUP">DUPLICATE</option>
			            		<option value="TRI">TRIPLICATE</option>
			            		<option value="BAN">BANKER'S KEEPING</option>
			            		<option value="SUR">SURRENDERED</option>
			            		<option value="REV">REVISED</option>
			            		<option value="COP">COPY NON-NEGOTIABLE</option>
			            		<option value="DRA">DRAFT</option>
			            	</select>
		            	</td>
		            </tr>
	            
	              	<tr>
		                <td colspan="2"><b><bean:message key="Freight_Arrange"/></b></td>
		            </tr>
	              	<tr>
		                <td><input name="frt_flg" id="frt_flg" type="radio" value="Y" checked="checked"><label for="frt_flg">YES</label></td>
		                <td><input name="frt_flg" id="frt_flg2" type="radio" value="N"><label for="frt_flg2">NO</label></td>
	              	</tr>	              	
			        <tr>
			            <td colspan="2"><b><bean:message key="Number_of_Original_BL"/></b></td>
			        </tr>
			        <tr>
			            <td colspan="2"><input type="text" name="bl_cnt" id="bl_cnt" style="width:300px;" maxlength="50" value='THREE/3' class="search_form"></td>
			        </tr>
	            	<tr>
		                <td colspan="2"><b><bean:message key="BL_Memo"/></b></td>
		            </tr>
		            <tr>
		            	<td colspan="2"><textarea name="bl_memo" id="bl_memo" class="search_form" style="width:300px;height:50px"></textarea></td>
		            </tr>
				</tbody>	
			</table>
		</div>
	</div>	
</div>
</form>	
<script>
	document.frm1.bl_memo.disabled = true;
</script>




