<%--
=========================================================
*@FileName   : ACC_BMD_0010.jsp
*@FileTitle  : Invoice Read
*@Description: Invoice 내용을 확인 하거나 작서/수정함
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 02/16/2010
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0080.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="accVO" name="EventResponse" property="objVal"/>
	<script>
		function btnLoad(){
            if(frm1.inv_sts_cd.value=='NA'){
            	getObj('frtAdd').style.display = 'inline';
		
			}else{
				if(frm1.inv_sts_cd.value=='IS'){
					getBtnObj('btnAdd').style.display  = 'none';
					getObj('frtAdd').style.display  = 'inline';
					getBtnObj('btnModify').style.display = 'inline';
					getBtnObj('btnDelete').style.display  = 'inline';
					getObj('invIsuObj').style.display= 'inline';
		
					frm1.inv_dt.className = 'search_form';
				    frm1.inv_dt.readOnly  = false;
		
					frm1.clt_due_dt.className = 'search_form';
					frm1.clt_due_dt.readOnly  = false;

				}else if(frm1.inv_sts_cd.value=='IC'){
					frm1.sts_label.value      = 'INVOICE CONFIRM';
		
					getObj('frtAdd').style.display      = 'none';
					getBtnObj('btnModify').style.display     = 'none';
					getObj('invIsuObj').style.display   = 'none';
					getBtnObj('btnDelete').style.display      = 'none';
		
					var calObj = getObj('inv_dt _cal');
					calObj.style.display = 'none';
					
					//invCancelObj.style.display= 'inline';

                    frm1.inv_dt.className = 'search_form-disable';
                    frm1.inv_dt.readOnly  = true;
		
                    frm1.clt_due_dt.className = 'search_form-disable';
                    frm1.clt_due_dt.readOnly  = true;
		
				}else{
					getObj('frtAdd').style.display   = 'none';
					getBtnObj('btnModify').style.display  = 'none';
					getObj('invIsuObj').style.display= 'none';
					getObj('invCancelObj').style.display= 'none';
				}
			}
		}
		function setupPage(){
			loadPage();btnLoad();
		}
		//loadSum();
	</script>
	
<form name="frm1" method="POST" action="./ACC_INV_0080.clt">
	<input type="hidden" name="f_cmd" value="">
	<html:hidden name="accVO" property="inv_sts_cd"/>
	<html:hidden name="accVO" property="cmb_inv_seq"/>

	<html:hidden name="accVO" property="air_sea_clss_cd"/>
	<html:hidden name="accVO" property="bnd_clss_cd"/>
		
    <html:hidden name="accVO" property="org_amt"/>
    <html:hidden name="accVO" property="org_vat_amt"/>
    <html:hidden name="accVO" property="org_sum_amt"/>

	<!--Hidden Value-->	
	<input type='hidden' name='in_inv_amt'      value='<bean:write name="accVO" property="inv_amt"/>'>
	<input type='hidden' name='in_inv_vat_amt'  value='<bean:write name="accVO" property="inv_vat_amt"/>'>
	<input type='hidden' name='in_inv_sum_amt'  value='<bean:write name="accVO" property="inv_sum_amt"/>'>
	<input type='hidden' name='in_inv_krw_amt'  value='<bean:write name="accVO" property="inv_krw_amt"/>'>
		
    <input type='hidden' name='in_frgn_curr_cd' value='<bean:write name="accVO" property="frgn_curr_cd"/>'>
	<input type='hidden' name='in_frgn_amt'     value='<bean:write name="accVO" property="frgn_amt"/>'>
	<input type='hidden' name='in_frgn_vat_amt' value='<bean:write name="accVO" property="frgn_vat_amt"/>'>
	<input type='hidden' name='in_frgn_sum_amt' value='<bean:write name="accVO" property="frgn_sum_amt"/>'>
	
	<input type="hidden" name='slip_post' value='<bean:write name="accVO" property="slip_post"/>'>
	<!-- page_title_area(S)  -->
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent" onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!-- 
				--><button type="button" class="btn_normal"onclick="doWork('NEW')"><bean:message key="New"/></button><!-- 
				--><button type="button" class="btn_normal"onclick="doWork('FRTADD')" id="frtAdd" style="display: none;"><bean:message key="Invoice_Add"/></button><!-- 
				--><button type="button" class="btn_normal"onclick="doWork('ADD')" id="btnAdd" style="display: none;"><bean:message key="Save"/></button><!-- 
				--><button type="button" class="btn_normal"onclick="doWork('MODIFY')" id="btnModify" style="display: none;"><bean:message key="Save"/></button><!-- 
				--><button type="button" class="btn_normal"onclick="doWork('REMOVE')" id="btnDelete" style="display: none;"><bean:message key="Delete"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('COMMAND01')" id="invIsuObj" style="display: none;"><bean:message key="Confirm"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="doWork('COMMAND02')" id="invCancelObj" style="display: none;"><bean:message key="Confirm_Cancel"/></button>
			</div>
			<!-- opus_design_btn(E) -->
    
  			<!-- page_location(S) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="75">
					<col width="200">
					<col width="600">
					<col width="*">
				</colgroup>
				<tbody>
                   <tr>
					<th><bean:message key="Invoice_No"/></th>
                    <td>
						<input type="text" name="f_inv_no"  maxlength="50" value='<bean:write name="accVO" property="inv_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"><!-- 
					--><button type="button" class="input_seach_btn" tabindex="-1" id="trdp_cd"  onclick="doWork('INV_POPLIST')"></button>
                   </td>
					<td>&nbsp;</td>
					<td>
						<bean:message key="Status"/> :&nbsp;<input type="text" name="sts_label" value="<bean:write name="accVO" property="inv_sts_nm"/>" class="search_form" style="width:130;border:0;background-color:#f7f9fc;padding-top:5;color:#B60500" readOnly>
                   </td>
               </tr>
               </tbody>
           </table>
		</div>
	</div>	
	<div class="wrap_result">
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="75">
					<col width="140">
					<col width="65">
					<col width="200">
					<col width="65">
					<col width="120">
					<col width="100">
					<col width="120">
					<col width="65">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Invoice_No"/></th>
						<td>
							<input required type="text"   name="inv_no"  maxlength="50" value='<bean:write name="accVO" property="inv_no"/>' class="search_form-disable" style="width:140px;" readonly>
						</td>
	                    <th><bean:message key="Company"/></th>       
                        <td class="table_search_body">
                            <input type="text" required  name="trdp_cd"  value='<bean:write name="accVO" property="trdp_cd"/>' class="search_form-disable" style="width:55px;"  readonly><!-- 
                         --><input type="text"  required name="trdp_nm"  value='<bean:write name="accVO" property="trdp_nm"/>' class="search_form-disable" style="width:173px;" readonly>
                        </td>       
	                    <th><bean:message key="Billing"/></th>
                        <td>
                            <select required name="tax_bil_flg">
                                <option value="Y" <logic:equal name="accVO" property="tax_bil_flg" value="Y">selected</logic:equal>>Yes</option>
                                <option value="N" <logic:equal name="accVO" property="tax_bil_flg" value="N">selected</logic:equal>>No</option>
                            </select>
                        </td>
	                    <th><bean:message key="Billing_Date"/></th>
                        <td>
                            <input required type="text"   name="inv_dt"  value='<wrt:write name="accVO" property="inv_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, false,1);getDueDate();checkPostDate();" size='11' maxlength="10" class="search_form-disable" style="width:120px;" readonly><!-- 
                      	 --><button type="button" class="calendar ir" id="inv_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
                        </td>
	                    <th><bean:message key="Due_Date"/></th>
                        <td>
                            <input type="text" name="clt_due_dt" value='<wrt:write name="accVO" property="clt_due_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>' class="search_form-disable" dataformat="excepthan" style="width:77px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, false,1)" readonly>
                        </td>
					</tr>
				</tbody>
			</table>
			<table>
				<colgroup>
					<col width="75">
					<col width="140">
					<col width="65">
					<col width="55">
					<col width="100">
					<col width="70">
					<col width="65">
					<col width="*">
				</colgroup>
				<tbody>
                 <tr>
                     <th><bean:message key="Sell_Buy"/></th>
                     <td>
                         <input type="text" required  name="sell_buy_tp_nm" value='<bean:write name="accVO" property="sell_buy_tp_nm"/>'   class="search_form-disable" style="width:140px;" readonly><!-- 
                      --><input type="hidden" name="sell_buy_tp_cd" value='<bean:write name="accVO" property="sell_buy_tp_cd"/>'>
                     </td>
                     <th><bean:message key="Currency"/></th>
                     <td>
                         <input type="text" required  name="inv_aply_curr_cd" value='<bean:write name="accVO" property="inv_aply_curr_cd"/>' class="search_form-disable" style="width:55px;" readonly>
                     </td>
                     <th><bean:message key="Ex_Rate"/></th>
                     <td>
                         <input type="text"   name="inv_aply_xcrt"    value='<bean:write name="accVO" property="inv_aply_xcrt"/>' class="search_form-disable" style="width:70px;align:right;" readonly>
                     </td>
                     <th><bean:message key="Ref_No"/></th>
                     <td>
                         <input type="text"   name="buy_inv_no"  value='<bean:write name="accVO" property="buy_inv_no"/>' class="search_form" style="width:120px;" maxlength="20">
                     </td>
                 </tr>
                 <tr>
                 	<th><bean:message key="Remark"/></th>
                 	<td colspan="7"><input type="text"   name="inv_rmk"  value='<bean:write name="accVO" property="inv_rmk"/>' class="search_form" style="width:410px;" maxlength="200"></td>
                 </tr>
                </tbody>
             </table>
             <script language="javascript">comSheetObject('sheet1');</script>
             <script language="javascript">comSheetObject('sheet2');</script>
             <script language="javascript">comSheetObject('sheet3');</script>
		</div>
	</div>
</div>
</form>



