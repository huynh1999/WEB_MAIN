
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : LoadPlanMgmt.jsp
*@FileTitle  : Loading Plan
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/07/16
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whoutloadplan/script/LoadPlanMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	
	String s_consol_no = "";
	
	try {
		s_consol_no = request.getParameter("s_consol_no")== null?"":request.getParameter("s_consol_no");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
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


<form id="form" name="form">
<input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>">
<input type="hidden" name="org_cd" id="org_cd"  value="<%=userInfo.getOfc_cd()%>">
<input type="hidden" name="bk_tp">
<input type="hidden" id="f_cmd" value="0"/> 
<input type="hidden" name="f_consol_no">
<input type="hidden" name="eq_tp_cd">
<input type="hidden" name="s_wh_cd" value = "">
<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<input type="hidden" name="pageurl" id="pageurl" value="LoadPlanMgmt.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Find_Create" id="btn_Find_Create" onClick="doWork('btn_Find_Create');" style="display:none;" btnAuth="FIND_CREATE"><bean:message key="Find/Create"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_New" id="btn_New" onClick="doWork('NEW');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Cancel" id="btn_Cancel" onClick="doWork('btn_Cancel');" style="display:none;" btnAuth="CANCEL"><bean:message key="Cancel"/></button><!-- 
		 --><button type="button" class="btn_normal" name="lnk_oc" id="lnk_oc" onClick="doWork('lnk_oc');" style="display:none;" btnAuth="OUTBOUND_COMPLETE_MANAGEMENT"><bean:message key="Outbound_Complete_Management"/></button>
 --%>	</div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span><%=LEV1_NM %></span> &gt;
			<span><%=LEV2_NM %></span> &gt;
			<span><%=LEV3_NM %></span>
		</div>
	<!-- page_location(E) -->
</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry ">
		<table>
			<colgroup>
              <col width="50" />
              <col width="*" />
            </colgroup>
            <tbody>
                <tr>
                    <th><bean:message key="Console_No"/></th>
                    <td>
                        <input name="consol_no" type="text" class="L_input" id="consol_no" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" value="<%=s_consol_no%>" required/><!-- 
					--></td>
			         <th></th>
			         <td></td>
		     </tr>
		    </tbody>
		</table>
	</div>
</div>
<div class="wrap_result">
	<div class="layout_wrap">
   		<div class="layout_vertical_2 pad_rgt_4" style = "width: 70%">
			<div class="opus_design_grid clear">
			<!-- opus_design_grid(S) -->
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
   		</div>
   		<div class="layout_vertical_2 sm" style = "width: 30%">
   			<div class="opus_design_grid clear">
   				<h3 class="title_design"><bean:message key="Total_Volume"/></h3>
   				<table class = "grid_2">
                    <colgroup>
                        <col width="50" />
                        <col width="50" />
                        <col width="10" />
                        <col width="50" />
                    </colgroup>
                    <tbody>
	                     <tr>
	                         <th><bean:message key="QTY"/></th>
	                         <td><input name="ttl_qty" type="text" class="L_input_R" id="ttl_qty" style="width:100%;text-align:right;" readonly/></td>
	                         <th><bean:message key="CBM"/></th>
	                         <td><input name="ttl_cbm" type="text" class="L_input_R" id="ttl_cbm" style="width:100%;text-align:right;" readonly/></td>
	                     </tr>
	                     <tr>
	                         <th><bean:message key="GWT"/></th>
	                         <td><input name="ttl_grs_kgs" type="text" class="L_input_R" id="ttl_grs_kgs" style="width:100%;text-align:right;" readonly/></td>
	                         <th><bean:message key="NWT"/></th>
	                         <td><input name="ttl_net_kgs" type="text" class="L_input_R" id="ttl_net_kgs" style="width:100%;text-align:right;" readonly/></td>
	                     </tr>
                    </tbody>
                </table>
    		</div>
    		
    		<div class="opus_design_grid clear">
   				<h3 class="title_design"><bean:message key="Selected_Volume"/></h3>
   				<table class = "grid_2">
                    <colgroup>
                        <col width="50" />
                        <col width="50" />
                        <col width="10" />
                        <col width="50" />
                    </colgroup>
                    <tbody>
	                    <tr>
	                        <th><bean:message key="QTY"/></th>
	                        <td><input name="sel_qty" type="text" class="L_input_R" id="sel_qty" style="width:100%;text-align:right;" readonly/></td>
	                        <th><bean:message key="CBM"/></th>
	                        <td><input name="sel_cbm" type="text" class="L_input_R" id="sel_cbm" style="width:100%;text-align:right;" readonly/></td>
	                    </tr>
	                    <tr>
	                        <th><bean:message key="GWT"/></th>
	                        <td><input name="sel_grs_kgs" type="text" class="L_input_R" id="sel_grs_kgs" style="width:100%;text-align:right;" readonly/></td>
	                        <th><bean:message key="NWT"/></th>
	                        <td><input name="sel_net_kgs" type="text" class="L_input_R" id="sel_net_kgs" style="width:100%;text-align:right;" readonly/></td>
	                    </tr>
                    </tbody>
                </table>
    		</div>
   		</div>
    </div>
	<div align="center">
	 <button  type="button" class="btn_down_list" id="btn_Down" name="btn_Down" onClick="doWork('btn_Down');"></button><!-- 
	 --><button type="button" class="btn_up_list" id="btn_Up" name="btn_Up" onClick="doWork('btn_Up');"></button>
	</div>
	<div class="opus_design_grid clear">
	<div class="grid_option_left">
    				<div class= "opus_design_inquiry">
					 	<table>
	                        <colgroup>
	                            <col width="50" />
	                            <col width="30" />
	                            <col width="150" />
	                            <col width="*" />
	                        </colgroup>
	                        <tbody>
		                        <tr>
		                            <th><bean:message key="CNTRTR_Type"/></th>
		                            <td><input name="lp_id" type="text" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getEq_tp_cd(this)" id="cntr_tp" maxlength="4" onChange="getEq_tp_cd(this)" onKeyDown="if(event.keyCode==13){getEq_tp_cd(this);}"/><!-- 
		                            	 --><button type="button" name="btn_cntr_tp" id="btn_cntr_tp" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_cntr_tp');"></button><!-- 
		                             --></td>
		                            <th><bean:message key="QTY"/></th>
		                            <td><input name="lp_id_cnt" type="text" class="L_input" dataformat="int" id="cntr_qty" style="width:100px;"/></td>
		                        </tr>
	                        </tbody>
	                    </table>
					</div>	
    			</div>
    			<!-- opus_design_btn(S) -->
				<div class="opus_design_btn pad_top_8">
				 	<button type="button" class="btn_normal" name="btn_Add" id="btn_Add" onClick="doWork('btn_Add');"><bean:message key="ADD"/></button><!-- 
				 --><button type="button" class="btn_normal" name="btn_Del" id="btn_Del" onClick="doWork('btn_Del');"><bean:message key="DEL"/></button><!-- 
				 --><button type="button" class="btn_normal" name="btn_App_Clp_no" id="btn_App_Clp_no" onClick="doWork('btn_App_Clp_no');"><bean:message key="APPLY_LP_NO"/></button>
				 </div>
			<!-- opus_design_btn(E) -->
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
</div>

</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>