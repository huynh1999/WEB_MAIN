<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SYS_ROL_0010.jsp
*@FileTitle  : 롤 관리화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
		
	<script type="text/javascript" src="./apps/fis/sec/bmd/linerinfo/script/SEC_BMD_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
 
function setupPage(){
	loadPage();
	//setSelect();
}

</script>	
<form method="post" name="form" onSubmit="return false;">
	<input	type="hidden" name="f_cmd" id="f_cmd"> 
	<input type="hidden" name="role_cd" id="role_cd" value="<%=userInfo.getRole_cd() %>">
	<input type="hidden" name="f_h_mbl_no" id="f_h_mbl_no" value="">
	<input type="hidden" name="f_h_cntr_no" id="f_h_cntr_no" value="">
	
	<!-- #3764 [BINEX] CONTAINER MOVEMENT EVENT UPDATE TO SHOW 315 HISTORY -->
	<input type="hidden" name="f_h_lnr_bkg_no" id="f_h_lnr_bkg_no" value="">
	
	<input type="hidden" name="f_role_cd" id="f_role_cd" value="">

<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
		<%-- 
			<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="display:none" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button>
			<button type="button" class="btn_normal" onclick="doWork('ROWADD')" style="display:none" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="Add"/></button>
			<button type="button" class="btn_normal" onclick="doWork('ADD')" id = "btnAdd" style="display:none" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button>
			<button type="button" class="btn_normal" onclick="doWork('EXCEL')" style="display:none" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btn_DownExcel"><bean:message key="Excel"/></button>
			<button type="button" class="btn_normal" onclick="doWork('COPY')" style="display:none" btnAuth="COPY" name="btnCopy"><bean:message key="Copy"/></button>
			 --%>
		</div>
		
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
	</div>
    <!-- page_location(E) -->  
    
<div class="over_wrap" height="100%">
	<div class="wrap_search">	

		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="80"></col>
					<col width="190"></col>
					<col width="60"></col>
					<col width="150"></col>
					
					<!--#3764 [BINEX] CONTAINER MOVEMENT EVENT -->
            		<col width="100"></col>
            		<col width="150"></col>					
					
            		<col width="100"></col>
            		<col width="150"></col>
            		<col width="70"></col>
            		<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="VSL_VOY"/></th>
		                <td><!--
                           --><input type="hidden" name="f_trnk_vsl_cd" value='' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onblur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;" ><!--
                           --><input type="text" name="f_trnk_vsl_nm" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:172px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){vslPopup(form.f_trnk_vsl_nm.value.toUpperCase());}" ><!-- 
                           --><button type="button" name="trunkvessel" id="trunkvessel" class="input_seach_btn" tabindex="-1" onClick="vslPopup('')"></button><!-- 
                           --><input type="text" name="f_trnk_voy_no" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="10" onblur="strToUpper(this)" />
						</td>
						<th><bean:message key="POL"/></th>
                        <td><!-- 
                         	   --><input type="text" name="f_pol_cd"  id="pol" maxlength="5" value='' onKeyDown="codeNameAction2('location_pol',this, 'onKeyDown')" onBlur="codeNameAction2('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/><!--
                              --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('POL_LOCATION_POPLIST')" ></button><!--
                              --><input type="text" name="f_pol_nm" maxlength="50" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', form.f_pol_nm.value);}"/>
                        </td>

						<!--#3764 [BINEX] CONTAINER MOVEMENT EVENT -->					
						<th><bean:message key="Carrier_Bkg_No"/></th>
			            <td><!--
			            	--><input type="text" name="f_lnr_bkg_no" maxlength="40"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" />
			            </td>
						
                        <th><bean:message key="Cntr_No"/></th>
			            <td><!--
			            	--><input type="text" name="f_cntr_no" maxlength="40"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" />
			            </td>
						
						<th><bean:message key="MBL_No"/></th>
						<td>
							<input type="text" name="f_mbl_no" maxlength="20" value=""  onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" onBlur="strToUpper(this);">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
     <!-- Overwrite existing Event -->
    <!--div class="wrap_result sm" style="width: 43%; padding-left: 23px;">
           <table>
		 	<colgroup>
		 	        <col width="30" >
		        	<col width="100" >
		        	<col width="*">
		    </colgroup>
		    <tbody >
	            <tr valign="top">
                    <td style="font-weight: bold;">
                    	<input name="f_chk_o" type="checkbox" value="Y" ><bean:message key="Overwrite_Event"/> 
                    </td>
	            </tr>
	        </tbody>
	      </table>  
    </div-->
<div class="layout_wrap"> 	
    <div class="layout_vertical_2" style="width:600px;height:500px;">        	
		<div class="wrap_result">
			<!--h3 class="title_design"><bean:message key="Movement_Event"/></h3-->
           <table style="width:600px">
		 	<colgroup>
		 	        <col width="100" >
		        	<col width="100" >
		        	<col width="5" >
		    </colgroup>
		    <tbody >
	            <tr valign="top">
		            <td><h3 class="title_design"><bean:message key="Movement_Event"/></h3>
		            </td>
                    <td style="font-weight: bold; text-align:right" >
                    	<input name="f_chk_o" type="checkbox" value="Y" ><bean:message key="Overwrite_Event"/> 
                    </td>
                    <td></td>
	            </tr>
	        </tbody>
	      </table> 			 
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
	<div class="layout_vertical_2 mar_left_8" style="height:500px;width:calc(100% - 660px)">
		<div class="wrap_result">	
			<h3 class="title_design"><bean:message key="Show_Contr_List"/></h3>
			<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
	</div>	
</div>	
    <div class="wrap_result" >        	
    	<div class = "layout_wrap" id="sheet315_history">
    		<div class="opus_design_grid" style="width:1450px">
				<h3 class="title_design"><bean:message key="Movement_Event_His"/></h3>
				<div class="opus_design_btn" >
					<!-- Folding 기능 추가 -->
					<button type="button" class="btn_normal" id="btn_show" name="btn_show" onClick="btn_Folding('PLUS')" style="display:inline"><bean:message key="Plus"/></button>
					<button type="button" class="btn_normal" id="btn_hide" name="btn_show" onClick="btn_Folding('MINUS')" style="display:inline"><bean:message key="Minus"/></button>
	    		</div>				
				
				<script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
		</div>
	</div>	
</div>
</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	


