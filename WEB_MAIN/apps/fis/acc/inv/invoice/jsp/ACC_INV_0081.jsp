<%--
=========================================================
*@FileName   : ACC_INV_0011.jsp
*@FileTitle  : Freight ADD 조회팝업
*@Description: 
*@author     : Kang,Jung-Gu
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/acc/inv/invoice/script/ACC_INV_0081.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<script>
		function setupPage(){
			loadPage();initFinish();doWork('SEARCHLIST');
		}
	</script>
<form name="frm1" method="POST" action="./">
		<input	type="hidden" name="f_cmd"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><span><bean:message key="Invoice_Selection"/></span></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" onclick="doWork('USEHBL')"><bean:message key="Apply"/></button><!--
		 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	<!-- wrap search(S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="93">
					<col width="100">
					<col width="50">
					<col width="172">
					<col width="67">
					<col width="118">
					<col width="70">
					<col width="*">
				</colgroup>
				<tbody>										
					<tr>
                        <th><bean:message key="Sea_Air"/></th>
                        <td>
                            <select required name="f_air_sea_clss_cd" Style="width:80;">
                                <option value="S">SEA</option>
                                <option value="A">AIR</option>
                            </select>
                        </td>
                        <th><bean:message key="Bound"/></th>
                        <td>
                            <select required name="f_bnd_clss_cd" Style="width:80px;">
                            	<!-- <option value="">All</option> -->
                                <option value="O">Outbound</option>
                                <option value="I">Inbound</option>
                            </select>
                        </td>
                        <th><bean:message key="Sell_Buy"/></th>
                        <td>
                            <select required name="f_sell_buy_tp_cd" Style="width:80px;">
                                <option value="S">Sell</option>
                                <option value="B">Buy</option>
                                <option value="D">Debit</option>
                                <option value="C"><bean:message key="Credit"/></option>
                            </select>
                        </td>
                        <th><bean:message key="Office"/></th>
                        <td>
                              <bean:define id="oficeList" name="valMap" property="ofcList"/>
		                        <select required name="s_ofc_cd" style="width:115px;"/>
		                            <bean:size id="len" name="oficeList" />
		                            <logic:greaterThan name="len" value="1">
		                            <option value=''>ALL</option>
		                            </logic:greaterThan>
		                        <logic:iterate id="ofcVO" name="oficeList">
		                                <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
		                        </logic:iterate>
		                        </select>
                         </td>
					</tr>
					</tbody>
				</table>
				<table>	
					<colgroup>
						<col width="93">
						<col width="200">
						<col width="153">
						<col width="*">
					</colgroup>
					<tbody>		
						<tr>
							<th><bean:message key="Invoice_Date"/></th>
							<td>
    							<input required type="text" name="f_inv_strdt" onKeyUp="mkDateFormatType(this,event,false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form" Style="width:80;">
								~
								<input required type="text" name="f_inv_enddt" onKeyUp="mkDateFormatType(this,event,false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form" Style="width:80;">
								<button type="button" class="calendar ir" id="f_inv_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
                            </td>
                            <th><bean:message key="BL_No"/></th>
                            <td>
								<input type="text" name="f_bl_no" maxlength="40" style="width:115" class="search_form"> 
                            </td>
						</tr>
					</tbody>
                </table>
                <table>
                	<colgroup>
						<col width="93">
						<col width="320">
						<col width="70">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
                           <th><bean:message key="Customer"/></th>
                           <td>
							 <input type="text" name="f_trdp_cd" maxlength="20" value='' class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:60;">
							 <button type="button" class="input_seach_btn" tabindex="-1" id="trdp_cd"  onclick="doWork('CUSTOMER_POPLIST')"></button>
							 <input type="text" name="f_trdp_nm" value='' class="search_form-disable" style="width:150" readonly>                                                                
                           </td>
                           <th><bean:message key="Operator"/></th>
                           <td>
                                <input type="text" name="f_pic_id" value='<bean:write name="valMap" property="curPic"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:115px;">
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
					<col width="93">
					<col width="110">
					<col width="120">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Customer"/></th>
                        <td width="115">
							<input type="text" required  name="cur_trdp_cd" value="" class="search_form-disable" style="width:110px;" readonly>
                        </td>
						<th><bean:message key="Invoice_Currency"/></th>
                        <td>
							<input type="text" required  name="inv_curr_cd" value="" class="search_form-disable" style="width:100px;" readonly>
                        </td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="opus_design_grid">
			<h3 class="title_design">Invoice List</h3>
			<script language="javascript">comSheetObject('sheet1');</script>
			<table>
				<tr>
					<td align="center">
						<img onclick="hblToSrList()" src="<%=CLT_PATH%>/web/img/main/arrow_b.gif" style="cursor:pointer;">
						<img onclick="srListToHbl()" src="<%=CLT_PATH%>/web/img/main/arrow_t.gif" style="cursor:pointer;">
					</td>
				</tr>
			</table>
			<bean:message key="Invoice_List_in_Combined_Invoice"/>
			<script language="javascript">comSheetObject('sheet2');</script>
		</div>	
	</div>	
</div>
</form>
