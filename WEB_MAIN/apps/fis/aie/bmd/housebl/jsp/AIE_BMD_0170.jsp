<%--
=========================================================
*@FileName   : 
*@FileTitle  : 
*@Description: 
*@author     : Tuan.Chau
*@version    : 2.0 - 28/07/2014
*@since      : 28/07/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>

	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/aie/bmd/housebl/script/AIE_BMD_0170.js?ver=<%=CLT_JS_VER%>"></script>
		
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value=""/>
	
	<script type="text/javascript">
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var userNm = "<%= userInfo.getUser_name() %>";
		var userTel = "<%= userInfo.getPhn() %>";
		var userFax = "<%= userInfo.getFax() %>";
		var eml     = "<%= userInfo.getEml() %>";
		
		function setupPage(){		
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="rd_param"/>
	
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">
	
	<input	type="hidden" name="master_bl_no"/>
	<input	type="hidden" name="s_intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- <button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button> --%>
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
			<table>
                <tr>
                  	<th width="50"><bean:message key="HAWB_No"/></th>
                    <td><!--
                    --><input name="house_bl_no" type="text" maxlength="40" value='<bean:write name="valMap" property="house_bl_no"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:128px;" onKeyPress="if(event.keyCode==13){doPop('HBL_POPLIST',this);}"><!--
                    --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doPop('HBL_POPLIST',this)"></button>
                    </td>
				</tr>
           </table>
		</div>
	</div>
	<div class="wrap_result">
    	<div class="opus_design_inquiry">
       		<table>
       			<colgroup>
       				<col width="100px"></col>
       				<col width="200px"></col>
       				<col width="*"></col>
       			</colgroup>		                        
	            <tr>	
	              	<td colspan="2">
	              		<input type="radio" name="s_ship_to" id="s_ship_to1" value="A" onClick="fRadio(this.value);" checked ><label for="s_ship_to1"><bean:message key="Agent"/></label>&nbsp;&nbsp;
	                	<input type="radio" name="s_ship_to" id="s_ship_to2" value="S" onClick="fRadio(this.value);"><label for="s_ship_to2"><bean:message key="Shipper"/></label>&nbsp;&nbsp;
	                	<input type="radio" name="s_ship_to" id="s_ship_to3" value="C" onClick="fRadio(this.value);"><label for="s_ship_to3"><bean:message key="Consignee"/></label>&nbsp;&nbsp;
	                	<input type="radio" name="s_ship_to" id="s_ship_to4" value="N" onClick="fRadio(this.value);"><label for="s_ship_to4"><bean:message key="Notify"/></label>
	          		</td>
	          		<td></td>
	            </tr>
	            <tr>
	          		<td>
	                	<input type="radio" name="s_ship_to" id="s_ship_to5" value="O" onClick="fRadio(this.value);"><label for="s_ship_to5"><bean:message key="Other_Company"/></label>
	                </td>
	                <td><!--
                    --><input name="ntc_trdp_cd" readonly type="text" maxlength="20" value='' class="search_form-disable" onblur="strToUpper(this);codeNameAction('partner_ntc_delivery',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;" onkeydown="codeNameAction('partner_ntc_delivery',this, 'onKeyDown')"><!--
                    --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doPop('PARTNER_POPLIST',this)"></button><!--
                    --><input name="ntc_trdp_full_nm" readonly type="text" maxlength="50" value='' class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:134px;" onKeyPress="if(event.keyCode==13){doPop('PARTNER_POPLIST',this);}">
	                </td>  
	            </tr>
	            <tr>
	          		<th><bean:message key="AWB_Return_to_Other"/></th>		                          
	                <td><!--
                    --><input name="oth_trdp_cd" type="text" maxlength="20" value='' class="search_form" onblur="strToUpper(this);codeNameAction('partner_delivery',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;" onkeydown="codeNameAction('partner_delivery',this, 'onKeyDown')"><!--
                    --><button type="button" class="input_seach_btn" tabindex="-1" id="pod" onclick="doPop('OTH_PARTNER_POPLIST',this)"></button><!--
                    --><input name="oth_trdp_full_nm" type="text" maxlength="50" value='' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:134px;" onKeyPress="if(event.keyCode==13){doPop('OTH_PARTNER_POPLIST',this);}">
	                </td>
	            </tr>
          </table>
          <table class="line_bluedot"><tr><td></td></tr></table>
          <table>
          	 <colgroup>
          	 	<col width="110"></col>
          	 	<col width="110"></col>
          	 	<col width="110"></col>
          	 	<col width="110"></col>
          	 	<col width="*"></col>
          	 </colgroup>		                        
             <tr>	
               	<td><h3  class="title_design" style="margin-bottom: 0;"><bean:message key="Options"/></h3></td>
             </tr>
          	 <tr>
		        <td><input name="iv_atc_flg" id="iv_atc_flg" type="checkbox" value="N" ><label for="iv_atc_flg"><bean:message key="IV_Attach"/></label></td>
		        <td><input name="insr_flg" id="insr_flg" type="checkbox" value="N" ><label for="insr_flg"><bean:message key="Insurance"/></label></td>
		        <td><input name="pickup_flg" id="pickup_flg" type="checkbox" value="N" ><label for="pickup_flg"><bean:message key="Pick_Up"/></label></td>
		        <td><input name="lc_flg" id="lc_flg" type="checkbox" value="N" ><label for="lc_flg"><bean:message key="LC"/></label></td>
		        <td></td>
     		</tr>
	     	<tr>
		        <td><input name="shpr_ctc_flg" id="shpr_ctc_flg" type="checkbox" value="N" ><label for="shpr_ctc_flg"><bean:message key="Shipper_Contact"/></label></td>
		        <td><input name="impt_flg" id="impt_flg" type="checkbox" value="N" ><label for="impt_flg"><bean:message key="Importer"/></label></td>
		        <td><input name="final_flg" id="final_flg" type="checkbox" value="N" ><label for="final_flg"><bean:message key="Final"/></label></td>
		        <td><input name="sft_doc_flg" id="sft_doc_flg" type="checkbox" value="N" ><label for="sft_doc_flg"><bean:message key="Safety_Doc"/></label></td>
		        <td></td>
	     	</tr>
	     	<tr>
		        <td><input name="dt_entr_flg" id="dt_entr_flg" type="checkbox" value="N" ><label for="dt_entr_flg"><bean:message key="Data_Entry"/></label></td>
		        <td><input name="sa_flg" id="sa_flg" type="checkbox" value="N" ><label for="sa_flg"><bean:message key="B.SA"/></label></td>
		        <td><input name="call_agt_flg" id="call_agt_flg" type="checkbox" value="N" ><label for="call_agt_flg"><bean:message key="Call_Agent"/></label></td>
		        <td><input name="rtn_doc_flg" id="rtn_doc_flg" type="checkbox" value="N" ><label for="rtn_doc_flg"><bean:message key="Return_Doc"/></label></td>
		        <td></td>
	     	</tr>	                        
           </table>
    	</div>
    </div>
</div>
</form>

