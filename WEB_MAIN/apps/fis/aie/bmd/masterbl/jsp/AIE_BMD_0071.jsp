<%--
=========================================================
*@FileName   : CMM_POP_0240.jsp
*@FileTitle  : CMM
*@Description: 
*@author     : Tuan.Chau
*@version    : 2.0 - 28/07/2014
*@since      : 28/07/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/masterbl/script/AIE_BMD_0071.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>

	<base target="_self"/>
	
	<script language="javascript">
	var usrid = "<%=userInfo.getUsrid()%>";
	var ofc_cnt_cd1 = "<%=userInfo.getOfc_cnt_cd()%>";
	
	function setupPage() {
		loadPage();
	}
	</script>
		
<form name="form" method="POST" action="./">
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="f_CurPage"/>
		<input	type="hidden" name="file_name"/>
		<input	type="hidden" name="rd_param"/>
		<input	type="hidden" name="title"/>
		<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
	<div class="layer_popup_title">
		<!-- page_title_area(S) -->
		<div class="page_title_area">
		   <h2 class="page_title"><span><bean:message key="HAWB_List"/></span></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('PRINT')" id="btnPrint"><bean:message key="Print"/></button><!-- 
        	--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!--    				   
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>	
	</div>	
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_inquiry wFit">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
			<table>
		        <tr>
		            <td id="rule1">
		            	<input type="checkBox" name="clause_rule" id="clause_rule" onclick="flgChange(this);" value=""><label for="clause_rule">Show Rule Clause</label>
		            </td>
		        </tr>
		    </table>
		    
		    <table id="tblForCA">
		    	<colgroup>
					<col width="130"></col>
					<col width="130"></col>
					<col width="130"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
			        <tr>
			            <th style="text-align:left"><bean:message key="For"/></th>
			        </tr>
			        <tr>
			        	<td>
			                <input type="checkbox" name="bl_for_s" id="bl_for_s" value="Y" checked><label for="bl_for_s"><bean:message key="Shipper"/></label>
			            </td>
			        	<td>
			                <input type="checkbox" name="bl_for_i" id="bl_for_i" value="Y" ><label for="bl_for_i"><bean:message key="Issuing_Carrier"/></label>
			            </td>			            		            
			            <td>
			                <input type="checkbox" name="bl_for_c" id="bl_for_c" value="Y" checked><label for="bl_for_c"><bean:message key="Consignee"/></label>
			            </td>
			        	<td >
			                <input type="checkbox" name="bl_for_d" id="bl_for_d" value="Y" ><label for="bl_for_d"><bean:message key="Delivery_Receipt"/></label>
			            </td>	
			        </tr>		
		        </tbody>				        
		    </table>
		    
		    <table>
		    	<colgroup>
					<col width="130"></col>
					<col width="130"></col>
					<col width="130"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
			        <tr>
			            <th style="text-align:left"><bean:message key="Original_Copy"/></th>
			        </tr>
			        <tr>
			        	<td><input type="radio" name="bl_type" id="bl_type1" value="1"><label for="bl_type1"><bean:message key="Original"/></label></td>
			            <td><input type="radio" name="bl_type" id="bl_type2" value="2" checked><label for="bl_type2"><bean:message key="Copy"/></label></td>
			            <td><input type="checkBox" name="show_org" id="show_org" onclick="flgChange(this);" checked><label for="show_org">Show 'Original On'</label></td>
			            <td></td>
			        </tr>
			        <tr>
			        	<th style="text-align:left"><bean:message key="SCI"/></th>
			        	<td></td>
			        	<td></td>
			        	<td></td>
			        </tr>
			        <tr>
			        	<td colspan="3"><input type="text" name="sci" style="width:280px;" value="X"></td>
			        	<td></td>
			        </tr>
		            <tr>
		              	<th style="text-align:left"><bean:message key="Freight_Arrange"/></th>
		              	<td></td>
		              	<td></td>
		              	<td></td>
		          	</tr>
		          <tr>
		             <td><input name="frt_flg" id="frt_flg1" type="radio" value="Y" checked><label for="frt_flg1">YES</label></td>
			         <td><input name="frt_flg" id="frt_flg2" type="radio" value="N"><label for="frt_flg2">NO</label></td>
		             <td></td>
		             <td></td>
		          </tr>
		          <tr>
		             <th ><bean:message key="Display_Description"/></th>
		             <td></td>
		             <td></td>
		             <td></td>
		         </tr>
		          <tr>
		            <td><input type="checkBox" name="desc_flg" id="desc_flg" onclick="flgChange(this);"><label for="desc_flg"><bean:message key="Shipper"/></label></td>
		            <td><input type="checkBox" name="desc_flg" id="desc_flg2" onclick="flgChange(this);"><label for="desc_flg2"><bean:message key="Issuing_Carrier"/></label></td>
		            <td><input type="checkBox" name="desc_flg" id="desc_flg3" onclick="flgChange(this);"><label for="desc_flg3"><bean:message key="Consignee"/></label></td>
		            <td><input type="checkBox" name="desc_flg" id="desc_flg4" onclick="flgChange(this);"><label for="desc_flg4"><bean:message key="Delivery_Receipt"/></label></td>						            
		          </tr>	              	
		          <tr>
		             <th style="text-align:left"><bean:message key="Display_Charge"/></th>
		             <td></td>
		             <td></td>
		             <td></td>
		         </tr>
		          <tr>
		             <td><input type="checkBox" name="charge_flg" id="charge_flg" onclick="flgChange(this);"><label for="charge_flg"><bean:message key="Shipper"/></label></td>
			         <td><input type="checkBox" name="charge_flg" id="charge_flg2" onclick="flgChange(this);"><label for="charge_flg2"><bean:message key="Issuing_Carrier"/></label></td>
			         <td><input type="checkBox" name="charge_flg" id="charge_flg3" onclick="flgChange(this);"><label for="charge_flg3"><bean:message key="Consignee"/></label></td>
			         <td><input type="checkBox" name="charge_flg" id="charge_flg4" onclick="flgChange(this);"><label for="charge_flg4"><bean:message key="Delivery_Receipt"/></label></td>						            
		          </tr>
	          </tbody>	              	
	        </table>
			</div>
		</div>
		<div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>   			
	</div>
</form>
