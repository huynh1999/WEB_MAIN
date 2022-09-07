<!-- 
//=========================================================
//*@FileName   : RPT_PRN_0022.jsp
//*@FileTitle  :   CO Load Entry print
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 10/06/2014
//*@since      : 10/06/2014
//=========================================================
 -->
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0022.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript">
		//memo 를 핸들링 하는 부분
		function chkText(){
			/*
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
			*/
		}

		var usrid = "<%=userInfo.getUsrid()%>";
		var ofc_cnt_cd1 = "<%=userInfo.getOfc_cnt_cd()%>";
	</script>
<script>
function setupPage(){
	loadPage();
}
</script>	
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<input	type="hidden" name="bl_no" value="<bean:write name="tmpMap" property="bl_no"/>"/>
	<input	type="hidden" name="intg_bl_seq" value="<bean:write name="tmpMap" property="intg_bl_seq"/>"/>
	<input	type="hidden" name="xtra_bl_seq" value="<bean:write name="tmpMap" property="xtra_bl_seq"/>"/>

	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="title" value="B/L Print"/>
	<input	type="hidden" name="stamp"/>
	<input	type="hidden" name="all"/>
	<input	type="hidden" name="rider_flg" value="<bean:write name="tmpMap" property="rider_flg"/>"/>
	<input	type="hidden" name="h_agent_text" value="<bean:write name="tmpMap" property="agent_text"/>"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="mailTitle" value="<bean:write name="tmpMap" property="mailTitle"/>"/>
	<input	type="hidden" name="mailTo" value="<bean:write name="tmpMap" property="mailTo"/>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!--  OE HBL Form -->
	<input	type="hidden" name="oe_hbl_form" value="<bean:write name="tmpMap" property="oe_hbl_form"/>"/>
	
	<!--  Logo Yn Form -->
	<input	type="hidden" name="logoYn" value="<bean:write name="tmpMap" property="logoYn"/>"/>	
	<div class="layer_popup_title">
		<!-- Button -->
		<div class="page_title_area clear">
	   	   <h2 class="page_title" align="left"><bean:message key="BL_Print"/></h2>
		   <div class="opus_design_btn">
			   <button id="btnPrint" type="button" class="btn_accent" onclick="doWork('Print')"><bean:message key="Print"/></button><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
	    	<div class="opus_design_grid">
	    		<table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <th width="130px" scope="row" nowrap class="table_search_head" align="left"><bean:message key="BL_Number"/></th>
			            <td width="90px" class="table_search_body"><!-- 
			            	 --><input name="house_bl_no" type="text" value='<bean:write name="tmpMap" property="house_bl_no"/>' class="search_form" style="width:100px;border:0;background-color:transparent;" readOnly></td>
	<!-- 		            <td style="width: 200px;"></td> -->
			            <td id="rule1" scope="row" nowrap class="table_search_head"><!-- 
			            	 --><input type="checkBox" name="clause_rule" id="clause_rule" onclick="flgChange(this);"><label for="clause_rule"><bean:message key="Show_Rule_Clause"/></label>
			            </td>           
			        </tr>
			        <tr height="3px"/>
			        <tr>
			            <th scope="row" nowrap class="table_search_head" colspan="4" align="left"><bean:message key="BL_Print_Option"/></th>
			        </tr>
			        <tr height="3px"/>
			        <tr>
			        	<td class="table_search_body">
			                <input type="radio" name="bl_type" id="bl_type1" value="1" onclick="javascript:chkText();" checked><label for="bl_type1"><bean:message key="Original"/></label>
			            </td>
			            <td class="table_search_body">
			                <input type="radio" name="bl_type" id="bl_type2" value="2" onclick="javascript:chkText();" checked><label for="bl_type2"><bean:message key="Copy"/></label>
			            </td>
	<!-- 		             <td style="width: 200px;"></td> -->
			            <td class="table_search_body">
			                <input type="text" name="page_count" style="text-align:center;width:50px;" value='<bean:write name="tmpMap" property="printCnt"/>'> <bean:message key="BLs"/>
		                </td>
			        </tr>
			        
			        <tr height="5px"/>
			        <tr>
			        	<td class="table_search_body" colspan="3">
			                <input type="text" name="agent_text" style="text-align:center;width:400px;" value="">
			            </td>
			        </tr>
			        
			        
			        
			        <tr height="3px"/>
			        <tr>
		                <th scope="row" nowrap class="table_search_head" colspan="3" align="left"><bean:message key="Show_BL_Type"/></th>
		            </tr>
		            <tr height="3px"/>
	              	<tr>
		                <td class="table_search_body"><!-- 
			                 --><input name="show_bl_type" id="show_bl_type1" type="radio" value="1" onclick="javascript:chkText();"><label for="show_bl_type1"><bean:message key="Original"/></label>
			            </td>
			            <td class="table_search_body"><!-- 
			                 --><input name="show_bl_type" id="show_bl_type2" type="radio" value="2" onclick="javascript:chkText();"><label for="show_bl_type2"><bean:message key="NonNegotiable"/></label>
			            </td>
			            <td class="table_search_body"><!-- 
			                 --><input name="show_bl_type" id="show_bl_type3" type="radio" value="3" onclick="javascript:chkText();"><label for="show_bl_type3"><bean:message key="Draft"/></label>
		                </td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
		                <td class="table_search_body"><!-- 
			                 --><input name="show_bl_type" id="show_bl_type4" type="radio" value="4" onclick="javascript:chkText();"><label for="show_bl_type4"><bean:message key="Copy"/></label>
			            </td>
			            <td class="table_search_body"><!-- 
			                 --><input name="show_bl_type" id="show_bl_type5" type="radio" value="5" onclick="javascript:chkText();"><label for="show_bl_type5"><bean:message key="Telex_Release"/></label>
			            </td>
			            <td class="table_search_body"><!-- 
			                 --><input name="show_bl_type" id="show_bl_type6" type="radio" value="6" onclick="javascript:chkText();" checked="checked"><label for="show_bl_type6"><bean:message key="None"/></label>
		                </td>
	              	</tr>	
	              	<tr height="3px"/>
	              	<tr>
		                <th scope="row" nowrap class="table_search_head" colspan="2" align="left"><bean:message key="Freight_Arrange"/></th>
		            </tr>
		            <tr height="3px"/>
	              	<tr>
		                <td class="table_search_body">
			                <input name="frt_flg" id="frt_flg1" type="radio" value="Y" checked="checked"><label for="frt_flg1">YES</label>
			            </td>
			            <td class="table_search_body">
			                <input name="frt_flg" id="frt_flg2" type="radio" value="N"><label for="frt_flg2">NO</label>
		                </td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
		                <th scope="row" nowrap class="table_search_head" colspan="2" align="left"><bean:message key="Title_Name"/></th>
		            </tr>
		            <tr height="3px"/>
	              	<tr>
		                <td class="table_search_body" colspan="2"><!-- 
			                 --><input name="title_name" id="title_id1" type="radio" value="1" onclick="initSetting(1);" checked><label for="title_id1"><bean:message key="Bill_of_Lading"/></label>
			            </td>
	              	</tr>
	              	<tr height="3px"/>	 
	              	<tr>
			            <td class="table_search_body" colspan="2"><!-- 
			                 --><input name="title_name" id="title_id2" type="radio" value="2" onclick="initSetting(2);"><label for="title_id2"><bean:message key="Forwarder_Cargo_Receipt"/></label>
		                </td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
	              		<th scope="row" nowrap class="table_search_head" align="left"><bean:message key="Received_By"/> :</th>
	              		<td class="table_search_body"><!-- 
		              		 --><select name="rcvd_by" styleClass="search_form" style="width:150px;" readonly><!-- 
								 --><option value="1"><%=userInfo.getOfc_locl_nm()%></option><!-- 
							 --></select>
	              		</td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
	              		<th scope="row" nowrap class="table_search_head" align="left"><bean:message key="Received_Date_Time"/> :</th>
	              		<td class="table_search_body"><!-- 
		              		 --><input type="text" name="rcvd_dt_tm" style="width:150px;" readonly>
	              		</td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
	              		<th scope="row" nowrap class="table_search_head" align="left"><bean:message key="Received_Person"/> :</th>
	              		<td class="table_search_body"><!-- 
		              		 --><input type="text" name="rcvd_pic" style="width:150px;" readonly>
	              		</td>
	              	</tr>
	              	<tr height="3px"/>
	              	<tr>
		                <th scope="row" nowrap class="table_search_head" colspan="2" align="left"><bean:message key="Remark"/></th>
		            </tr>
		            <tr height="3px"/>
	              	<tr>
		                <td class="table_search_body" colspan="2">
	                         <div id="div_subcode"><!-- 
					             --><logic:notEmpty name="EventResponse"><!--
							             	--><bean:define id="selList1" name="tmpMap" property="PARAM1"/><!--
							             	--><select name="rmk_cd" ><!--
					             		--><logic:iterate id="lst1" name="selList1"><!--
						             			--><option value='<bean:write name="lst1" property="cd_val"/>' ><bean:write name="lst1" property="cd_nm" filter="false"/></option><!--
					             		--></logic:iterate><!--
						             		--></select><!--
						         --></logic:notEmpty><!--
						     --></div>
			            </td>
	              	</tr>		    
			    </table>
	    	</div>
	    </div>
	</div>
</form>



