<%--
=========================================================
*@FileName   : AIE_AMS_0020.jsp
*@FileTitle  : AMS SEND(AIR)
*@Description: AMS SEND(AIR)
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

*@Change history: 
*@author     : Tuan.Chau
*@version    : 2.0
*@since      : 2014/07/25
==========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/aie/bmd/ams/script/AIE_AMS_0020.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="JavaScript">
	function goTabSelect(isNumSep) {
    
	    if( isNumSep == "01" ) {
	    	document.all.Tab01.className = "tab_head-l";
	        document.all.Tab02.className = "tab_head_non-l";
	      
	    } else if( isNumSep == "02" ) {
	    	document.all.Tab01.className = "tab_head_non-l";
	        document.all.Tab02.className = "tab_head-l";
	        
	    }
		var tabObjs = document.getElementsByName('tabLayer');
	
	    if(isNumSep=='01') {
			tabObjs[0].style.display = 'inline';
	        tabObjs[1].style.display = 'none';
	    }else if(isNumSep=='02') {
			tabObjs[0].style.display = 'none';
	        tabObjs[1].style.display = 'inline';
	    }
  	}

  	function openOrder(cF,type){
	    var param = "?openerForm=goals&openerType="+type+"&openerCodeField="+cF;
	    window.open("/cupfmsWeb/cup/common/pop/COM_ORDER_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
  	}

  	function openLocation(cF,nF, type){
	    var param = "?openerForm=goals&openerType="+type+"&openerCodeField="+cF+"&openerNameField="+nF;
	    window.open("/cupfmsWeb/cup/common/pop/COM_LOCATION_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
  	}
	
  	var user_ofc_cd = "<%=userInfo.getOfc_cd()%>";
	</script>
	
	
	<bean:define id="amsVO" name="EventResponse" property="objVal"/>

<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
</script>	
<form name="frm1" method="POST" action="./AIE_AMS_0020.clt">
		<input type="hidden" name="f_cmd"/> 
		<input type="hidden" name="f_CurPage"/>
		<input type="hidden" name="t_sls_ofc_cd" value="<%= userInfo.getOfc_cd() %>"/>
		<input type="hidden" name="t_sls_ofc_nm" value="<%= userInfo.getOfc_eng_nm() %>"/>
		<input type="hidden" name="t_sls_usrid" value="<%= userInfo.getUsrid() %>"/>
		<input type="hidden" name="t_sls_usrnm" value="<%= userInfo.getUser_name() %>"/>
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')"><bean:message key="Search"/></button><!--
	   --><button type="button" class="btn_normal" onclick="doWork('LIST')"><bean:message key="List"/></button><!--
	   --><button type="button" class="btn_normal" id="btnSave"><bean:message key="Save"/></button><!--
	   --><button type="button" class="btn_normal"><bean:message key="AMS_Send"/></button>
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
			<table height="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <th width="90"><bean:message key="MBL_No"/></th>
                    <td width="160">
                    	<input name="f_mbl_no" type="text" value="<bean:write name="amsVO" property="mbl_no"/>"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160px;" maxlength="40" onKeyPress="fncTpCodeSearch()">
                    </td>
                    <td></td>
                </tr>
            </table>
		</div>
	</div>
	
	<div class="wrap_result_tab">
	    <ul id="ulTab" class="opus_design_tab">
	    	<li class="nowTab"><a href="#" id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Header"/></span></a></li>
	        <li><a href="#" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="AMS_Send_Status"/></span></a></li>
	    </ul>
	    
	    <div id="tabLayer" name="tabLayer" style="display:inline;">
    		<div class="opus_design_inquiry wFit">
	    		<table id="mainTable">
	    			<colgroup>
	    				<col width="80"></col>
	    				<col width="180"></col>
	    				<col width="90"></col>
	    				<col width="300"></col>
	    				<col width="100"></col>
	    				<col width="300"></col>
	    				<col width="*"></col>
	    			</colgroup>
	    			<tbody>
	    				<tr>
	    					<td colspan="6"><h3 class="title_design"><bean:message key="Master_AWB_Consignment_Detail"/></h3></td>
	    				</tr>
	    				<tr>
							<th><bean:message key="Origin"/></th>
	                        <td><!--
	                        --><input type="text" name="f_org_cd"  value="<bean:write name="amsVO" property="pol_cd"/>" style="width:90px" ><!--
	                        --><input type="text" name="f_org_nm"  value="<bean:write name="amsVO" property="pol_nm"/>" style="width:180px" >
	                        </td>
	                        
							<th><bean:message key="Destination"/></th>
	                        <td><!--
	                        --><input type="text" name="f_dest_cd" maxlength="5" value="<bean:write name="amsVO" property="pod_cd"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px" ><!--
	                        --><input type="text" name="f_dest_nm" maxlength="50" value="<bean:write name="amsVO" property="pod_nm"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px" >
	                        </td>
						</tr>
						<tr>
							<th><bean:message key="Quantity"/></th>
	                        <td>
					            <input type="text" name="f_qty"  value="<bean:write name="amsVO" property="qty"/>" style="width:90px;text-align:right" >
	                        </td>
	                        
							<th><bean:message key="Weight"/></th>
	                        <td>
	                            <input type="text" name="f_wgt" value="<bean:write name="amsVO" property="wgt"/>" style="width:90px;text-align:right" >
	                        </td>
						</tr>
						<tr>
							<td colspan="6"><h3 class="title_design"><bean:message key="House_AWB_Infomation"/></h3></td>
						</tr>
						<tr>
							<td colspan="6">
								<div class="opus_design_grid" id="mainTable">
									 <script language="javascript">comSheetObject('sheet1');</script>
						             <script language="javascript">comSheetObject('sheet2');</script>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				
				<div class="opus_design_inquiry wFit">
    				<div class="layout_vertical_2" style="width:50%">
						<table>
			    			<colgroup>
			    				<col width="80"></col>
			    				<col width="180"></col>
			    				<col width="90"></col>
			    				<col width="300"></col>
			    				<col width="*"></col>
			    			</colgroup>
			    			<tbody>
								<tr>
			                        <td colspan="4"><h3 class="title_design"><bean:message key="Shipper_Name_and_Address"/></h3></td>
			                    </tr>
			                    <tr>
									<th><bean:message key="Code"/></th>
			                        <td><!--
			                        --><input type="text" name="f_shp_cd"  value="<bean:write name="amsVO" property="shp_cd"/>" style="width:90px;" ><!--
			                        --><button type="button" class="input_seach_btn" tabindex="-1" id="shipper" onClick="doWork('LINER_POPLIST')"></button>
			                        </td>
									<th><bean:message key="Zip_Code"/></th>
			                        <td>
			                            <input type="text" name="f_shp_zip" maxlength="20" value="<bean:write name="amsVO" property="shp_zip"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" >
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Name"/></th>
			                        <td colspan="3">
							            <input type="text" name="f_shp_nm"  value="<bean:write name="amsVO" property="shp_nm"/>" maxlength="35" style="width:354px;" >
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Street_Addr"/></th>
			                        <td colspan="3">
							            <input type="text" name="f_shp_addr"  value="<bean:write name="amsVO" property="shp_addr"/>" maxlength="35" style="width:354px;" >
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Place"/></th>
			                        <td colspan="3">
							            <input type="text" name="f_shp_plc"  value="" maxlength="35" style="width:354px;" >
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="State"/></th>
			                        <td>
							            <input type="text" name="f_shp_ste"  maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" >
			                        </td>
									<th><bean:message key="Country"/></th>
			                        <td>
			                            <input type="text" name="f_shp_cnt" value="<bean:write name="amsVO" property="shp_cnt"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" >
			                        </td>
								</tr>
								
								 <tr>
			                        <td colspan="4"><h3 class="title_design"><bean:message key="Consignee_Name_and_Address"/></h3></td>
			                    </tr>
			                    <tr>
									<th><bean:message key="Code"/></th>
			                        <td><!--
			                        --><input type="text" name="f_cne_cd"  value="<bean:write name="amsVO" property="cne_cd"/>" style="width:90px;" ><!--
			                        --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('LINER_POPLIST2')"></button>
			                        </td>
									<th><bean:message key="Zip_Code"/></th>
			                        <td>
			                            <input type="text" name="f_cne_zip" maxlength="20" value="<bean:write name="amsVO" property="cne_zip"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" >
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Name"/></th>
			                        <td colspan="3">
							            <input type="text" name="f_cne_nm"  value="<bean:write name="amsVO" property="cne_nm"/>" maxlength="35" style="width:354px;" >
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Street_Addr"/></th>
			                        <td colspan="3">
							            <input type="text" name="f_cne_addr"  value="<bean:write name="amsVO" property="cne_addr"/>" maxlength="35" style="width:354px;" >
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="Place"/></th>
			                        <td colspan="3">
							            <input type="text" name="f_cne_plc"  value="" maxlength="35" style="width:354px;" >
			                        </td>
								</tr>
								<tr>
									<th><bean:message key="State"/></th>
			                        <td>
							            <input type="text" name="f_cne_ste" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" >
			                        </td>
									
									<th><bean:message key="Country"/></th>
			                        <td>
			                            <input type="text" name="f_cne_cnt" value="<bean:write name="amsVO" property="cne_cnt"/>" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" >
			                        </td>
								</tr>
			    			</tbody>
			    		</table>
		    		</div>
		    		
    				<div class="layout_vertical_2" style="width:50%">
						<table>
			    			<colgroup>
			    				<col width="80"></col>
			    				<col width="180"></col>
			    				<col width="*"></col>
			    			</colgroup>
			    			<tbody>
			    				<tr>
			    					<td colspan="2"><h3 class="title_design"><bean:message key="House_Waybill_Summary_Details"/></h3></td>
			    				</tr>
			    				<tr>
			    					<th><bean:message key="Departure"/></th>
			                        <td><!--
			                        --><input type="text" name="f_hbl_dept_cd"  value="" style="width:90px" class="search_form-disable" readOnly><!--
			                        --><input type="text" name="f_hbl_dept_nm"  value="" style="width:180px" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
			    				<tr>
			    					<th><bean:message key="Destination"/></th>
			                        <td><!--
			                        --><input type="text" name="f_hbl_dest_cd"  value="" style="width:90px" class="search_form-disable" readOnly><!--
			                        --><input type="text" name="f_hbl_dest_nm"  value="" style="width:180px" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
			    				<tr>
			    					<th><bean:message key="PCS_Weight"/></th>
			                        <td><!--
			                        --><input type="text" name="f_hbl_qty"  value="" style="width:90px;text-align:right" class="search_form-disable" readOnly><!--
			                        --><input type="text" name="f_hbl_wgt"  value="" style="width:90px;text-align:right" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
			    				<tr>
			    					<th><bean:message key="Goods"/></th>
			                        <td>
							            <input type="text" name="f_hbl_goods"  value="" style="width:150px" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
			    				<tr><td height="20px"></td></tr>
			    				<tr>
			    					<td colspan="2"><h3 class="title_design"><bean:message key="Charge_Declarations"/></h3></td>
			    				</tr>
			    				<tr>
				    				<th><bean:message key="Currency"/></th>
			                        <td>
							            <input type="text" name="f_curr"  value="<bean:write name="amsVO" property="curr_cd"/>" style="width:90px" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
			    				<tr>
			                        <th><bean:message key="Freight"/></th>
			                        <td>
							            <input type="text" name="f_frt_term_cd"  value="<bean:write name="amsVO" property="frt_term_cd"/>" style="width:90px" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
			    				<tr>
			                        <th><bean:message key="Carriage"/></th>
			                        <td>
							            <input type="text" name="f_carg"  value="" style="width:90px" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
			    				<tr>
			                        <th>Customs</th>
			                        <td>
							            <input type="text" name="f_cus"  value="" style="width:90px" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
			    				<tr>
			                        <th><bean:message key="Insurance"/></th>
			                        <td>
							            <input type="text" name="f_ins"  value="" style="width:90px" class="search_form-disable" readOnly>
			                        </td>
			    				</tr>
				    		</tbody>
				    	</table>
		    		</div>
		    	</div>
		    </div>
	    </div>
	    
	    <div id="tabLayer" name="tabLayer"  style="display:none;"><!--Mark Description-->
				<h3 class="title_design"><bean:message key="Send_File_Info"/></h3>
			<div class="opus_design_inquiry">
				<table>
					<tr>
						<td style="width: 50%;">
							<div class="opus_design_grid">
								<script language="javascript">comSheetObject('sheet3');</script>
							</div>
						</td>
						<td><textarea name="f_remark"  style="width:750px;height:450px;"></textarea></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</div>
</form>


