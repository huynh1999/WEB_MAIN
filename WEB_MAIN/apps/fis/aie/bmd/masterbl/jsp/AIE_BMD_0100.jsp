<%--
=========================================================
*@FileName   : AIE_BMD_0100.jsp
*@FileTitle  : Document Package(Air Export MBL)
*@Description: Document Package(Air Export MBL)
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 12/01/2011
*@since      : 12/01/2011

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/aie/bmd/masterbl/script/AIE_BMD_0100.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="mblVO" name="EventResponse" property="objVal"/>
	<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>

	<script type="text/javascript">
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var ofcLoclNm = "<%= userInfo.getOfc_locl_nm() %>";
		var roleCd = "<%= userInfo.getRole_cd() %>";
		
		// #45955 - [IMPEX] 독일 지점 요구사항 3가지, (AEM Entry 화면 디멘젼 길이 디폴트 옵션, Document Package Weight Option, AEM Entry에서 "SUM" 버튼 로직)
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		// #999 [SHINE] B/L 회사명 변경 옵션
		var ref_ofc_eng_nm = '<bean:write name="mblVO" property="ref_ofc_eng_nm"/>';
		
		var agtTrdpCdArr = new Array();
		var agtTrdpNmArr = new Array();
		var blFlgArr = new Array();
		<logic:notEmpty name="EventResponse" property="listVal">
	    	<logic:iterate id="agtList" name="EventResponse" property="listVal">
	    		agtTrdpCdArr.push("<bean:write name="agtList" property="trdp_cd"/>");
	    		agtTrdpNmArr.push("<bean:write name="agtList" property="trdp_nm"/>");
	    		blFlgArr.push("<bean:write name="agtList" property="bl_flg"/>");
	        </logic:iterate>
	    </logic:notEmpty>
	    
	    function setupPage(){
	    	loadPage();
	    }
	    var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	</script>
<form name="frm1" method="POST" action="./">

	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="s_intg_bl_seq" value="<bean:write name="mblVO" property="intg_bl_seq"/>"/>
	<input type="hidden" name="s_ref_ofc_cd" value="<bean:write name="mblVO" property="ref_ofc_cd"/>"/>
	<input type="hidden" name="s_ref_ofc_eng_nm" value="<bean:write name="mblVO" property="ref_ofc_eng_nm"/>"/>
	<input type="hidden" name="s_ref_ofc_cnt_cd" value="<bean:write name="mblVO" property="ref_ofc_cnt_cd"/>"/>
	<input type="hidden" name="s_cmc_inv_flg" value="<bean:write name="mblVO" property="cmc_inv_flg"/>"/>
	<input type="hidden" name="s_pck_inv_flg" value="<bean:write name="mblVO" property="pck_inv_flg"/>"/>
	<input type="hidden" name="s_cr_db_flg" value="<bean:write name="mblVO" property="cr_db_flg"/>"/>
	<input type="hidden" name="s_hbl_flg" value="<bean:write name="mblVO" property="hbl_flg"/>"/>
	
	<!-- #4693 [BNX GE] AEM Doc package , HAWB Print 시 일부 칼럼 값 틀리게 출력되는 issue -->
	<input type="hidden" name="s_iss_trdp_nm" value="<bean:write name="mblVO" property="iss_trdp_nm"/>"/>
	<input type="hidden" name="s_flt_no" value="<bean:write name="mblVO" property="flt_no"/>"/>
	<input type="hidden" name="s_hbl_tp_cd" value="<bean:write name="mblVO" property="hbl_tp_cd"/>"/>
	<input type="hidden" name="s_thr_trdp_nm" value="<bean:write name="mblVO" property="thr_trdp_nm"/>"/>
	<input type="hidden" name="s_shpr_trdp_nm" value="<bean:write name="mblVO" property="shpr_trdp_nm"/>"/>
	<input type="hidden" name="s_lnr_trdp_nm" value="<bean:write name="mblVO" property="lnr_trdp_nm"/>"/>
	
	<!-- #4694 [IMPEX] AIR Document Package -->
	<input type="hidden" name="s_ofc_rep_nm" value="<bean:write name="mblVO" property="ofc_rep_nm"/>"/>	
	
	<input type="hidden" name="mbl_agt_tedp_cd" value="<bean:write name="mblVO" property="agt_trdp_cd"/>"/>

	<!-- Report Value -->
	<input type="hidden" name="file_name"/>
	<input type="hidden" name="rd_param"/>
	<input type="hidden" name="title"/>

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="intg_bl_seq" value="<bean:write name="mblVO" property="intg_bl_seq"/>"/>
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<input type="hidden" name=f_wgt_opt value=""/>
	
	<!--  AE HBL Form -->
	<input	type="hidden" name="ae_hbl_form" value="<bean:write name="tmpMap" property="ae_hbl_form"/>"/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- <button type="button" class="btn_accent" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" id="btnPrint" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('Print')"><bean:message key="Print"/></button> --%>
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
		<div class="opus_design_inquiry entry_pannel">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
			<table>
               <tr>
                    <th width="60px"><bean:message key="MAWB_No"/></th>
					<td><!-- 
					 --><input required type="text" name="f_bl_no" maxlength="40" value="<bean:write name="mblVO" property="bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:145;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="entSearch()"><!-- 
					 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('MBL_POPLIST')"></button><!-- 
					 --></td>
                  </tr>
                </table>
		</div>
	</div>
	<!-- wrap_result(S) -->
	<div class="wrap_result">
		<div class="opus_design_inquiry">
			<h3  class="title_design"><bean:message key="Basic_Information"/></h3>
            <table>
               <tr>
                   <th width="170px"><bean:message key="Company_Name_on"/> <bean:message key="Report"/></th>
                   <td><input required name="s_ofc_locl_nm" type="text" value="" class="search_form" dataformat="excepthan" style="width:300px;text-transform:uppercase;ime-mode:disabled;" maxlength="100"></td>
               </tr>
               <tr>
                 <th><bean:message key="Master_Agent"/></th>
                 <td><textarea name="s_agt_desc" required style="width:300px;height:120px" readonly><bean:write name="mblVO" property="agt_info"/></textarea></td>                        
               </tr>
           </table>
            <table>
                    <tr>
                        <th width="170px"><bean:message key="Show_BL_Type"/></th>
		                <td width="180px"><input type="radio" name="s_bl_radio" id="s_bl_radio1" value="1" ><label for="s_bl_radio1"><bean:message key="Original"/></label></td>
		                <td width="170px"><input type="radio" name="s_bl_radio" id="s_bl_radio2" value="2" ><label for="s_bl_radio2"><bean:message key="NonNegotiable"/></label></td>
		                <td><input type="radio" name="s_bl_radio" id="s_bl_radio3" value="3" ><label for="s_bl_radio3"><bean:message key="Draft"/></label></td>
                    </tr>
                    <tr>
		                <td></td>
		                <td><input type="radio" name="s_bl_radio" id="s_bl_radio4" value="1" ><label for="s_bl_radio4"><bean:message key="Copy"/></label></td>
		                <td><input type="radio" name="s_bl_radio" id="s_bl_radio5" value="2" ><label for="s_bl_radio5"><bean:message key="Telex_Release"/></label></td>
		                <td><input type="radio" name="s_bl_radio" id="s_bl_radio6" value="3" checked><label for="s_bl_radio6"><bean:message key="None"/></label></td>
		            </tr>  
                </table>
			  <table>
                    <tr>
                        <th width="170px"><bean:message key="Agent_Type"/></th>
		                <td width="180px"><input type="radio" name="s_agt_tp" id="s_agt_tp1" value="1" onclick="agtTpChange(this.value);" checked><label for="s_agt_tp1"><bean:message key="Master_Agent_Shipper"/></label></td>
		                <td><input type="radio" name="s_agt_tp" id="s_agt_tp2" value="3" onclick="agtTpChange(this.value);"><label for="s_agt_tp2"><bean:message key="House_Agent"/></label></td>
                    </tr>
                    <tr>
		                <td></td>
		                <td><input type="radio" name="s_agt_tp" id="s_agt_tp3" value="2" onclick="agtTpChange(this.value);"><label for="s_agt_tp3"><bean:message key="Master_Agent_CoLoad"/></label></td>
		                <td><input type="radio" name="s_agt_tp" id="s_agt_tp4" value="4" onclick="agtTpChange(this.value);"><label for="s_agt_tp4"><bean:message key="AirLine2"/></label></td>
		            </tr>
		        </table>
		        <table>
	            	<tr>
                    	<td width="170px"></td>
                        <td><!-- 
                         --><select name="s_hbl_agt" class="search_form" style="width:435px;" disabled><!-- 
                         -->	<option value=""></option><!-- 
                         --></select><!-- 
                         --></td>
			    	</tr>
                </table>
                <table>
					<tr>
						<th width="170px"><bean:message key="Select_Report_Type"/></th>
                        <td width="20px"><input name="s_rpt_tp_1" id="s_rpt_tp_1" type="checkbox" value="Cargo Manifest" onclick="setPrintSort(this);"></td>
                        <td width="130px"><label for="s_rpt_tp_1">1. <bean:message key="Cargo_Manifest"/></label></td>
                        <td width="20px"><input name="s_rpt_tp_4" id="s_rpt_tp_4" type="checkbox" value="HB/L" onclick="setPrintSort(this);"></td>
                        <td width="130px"><label for="s_rpt_tp_4">4. <bean:message key="HBL"/></label></td>
						<td colspan="4"><!-- 
	                     --><div class="opus_design_btn" style="width: 120px;"><!-- 
	                     --><button type="button" class="btn_etc" onclick="doWork('ALL')" ><bean:message key="All"/></button><!--
	                     --><button type="button" class="btn_etc" onclick="doWork('CLEAR')" ><bean:message key="Clear"/></button><!-- 
	                     --></div><!-- 
	                     --></td>
					</tr>
					<tr>
						<td></td>
                        <td><input name="s_rpt_tp_2" id="s_rpt_tp_2" type="checkbox" value="Master Set / MAWB" onclick="setPrintSort(this);"></td>
                        <td><label for="s_rpt_tp_2">2. <bean:message key="Master_Set_MAWB"/></label></td>
                        <td><input name="s_rpt_tp_5" id="s_rpt_tp_5" type="checkbox" value="Commercial Invoice" onclick="setPrintSort(this);"></td>
                        <td><label for="s_rpt_tp_5">5. <bean:message key="Commercial_Invoice"/></label></td>
                        <td width="20px"><input name="s_rpt_tp_7" id="s_rpt_tp_7" type="checkbox" value="Shipping Advice" onclick="setPrintSort(this);"></td>
                        <td width="130px"><label for="s_rpt_tp_7">7. <bean:message key="Shipping_Advice"/></label></td>
                        <td width="150px">
                        	<div id="de_div" style ="display:none;">
	                        <input name="s_rpt_tp_9" id="s_rpt_tp_9" type="checkbox" value="Ausfuhr." onclick="setPrintSort(this);">
	                        <label for="s_rpt_tp_9">9. <bean:message key="DE_S/A"/></label>
	                       </div> 
                        </td>
                        <td></td>
                    </tr>
					<tr>
						<td></td>
                        <td><input name="s_rpt_tp_3" id="s_rpt_tp_3" type="checkbox" value="Credit / Debit Note" onclick="setPrintSort(this);"></td>
                        <td><label for="s_rpt_tp_3">3. <bean:message key="Credit_Debit_Note"/></label></td>
                        <td><input name="s_rpt_tp_6" id="s_rpt_tp_6" type="checkbox" value="Packing List" onclick="setPrintSort(this);"></td>
                        <td><label for="s_rpt_tp_6">6. <bean:message key="Packing_List"/></label></td>
                        <td><input name="s_rpt_tp_8" id="s_rpt_tp_8" type="checkbox" value="Third Party B/L" onclick="setPrintSort(this);"></td>
                        <td><label for="s_rpt_tp_8">8. <bean:message key="Third_Party_BL"/></label></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
                    </tr>
                    <tr>
						<th><bean:message key="Print_Order"/></th>
	                    <td  colspan="9"> 
	                     <textarea name="prt_sort" style="width:300px;height:120px" readonly></textarea>
	                    </td>
	               </tr>
    	        </table>
    	        <table>
                  <tr>
                    <th width="170px"><bean:message key="Send_To"/></th>
	                <td width="160px"><input type="checkbox" name="s_send_to1" id="s_send_to1" value="" ><label for="s_send_to1"><bean:message key="Shipper"/></label></td>
	                <td><input type="checkbox" name="s_send_to2" id="s_send_to2" value="" checked><label for="s_send_to2"><bean:message key="Consignee"/></label></td>
                  </tr>
              	</table>
    	        <table>
    	        	<tr>
						<th width="170px"><bean:message key="Option"/></th>
                        <td width="20px"><input name="s_hbl_opt" id="s_hbl_opt" type="checkbox"></td>
                        <td><label for="s_hbl_opt"><bean:message key="Show_User_Signature_on_HAWB"/></label></td>
                	</tr>
                </table>
     	        <table>
    	        	<tr>
						<th width="170px"><bean:message key="Weight_Option"/><br> &nbsp; (If Master Agent)</th>
		                <td width="120px"><input type="radio" name="f_wgt_opt_radio" id="f_wgt_opt_radio1" value="1" checked><label for="f_wgt_opt_radio1"><bean:message key="Chargeable"/></label></td>
		                <td><input type="radio" name="f_wgt_opt_radio" id="f_wgt_opt_radio2" value="2" ><label for="f_wgt_opt_radio2"><bean:message key="Gross"/></label></td>
                	</tr>
                </table>
                 
                <table>
                  <tr>
                    <th width="170px"><bean:message key="Remark"/></th>
		            <td><textarea name="f_rmk" class="search_form" style="width:300px;height:50px"></textarea></td>
		          </tr>
	            </table>
	             <table width="100%">
					<tr>
						<td>
							<table width="600" id="mainTable">
								<tr>
									<td>
										<script language="javascript">comSheetObject('sheet1');</script>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
		</div>
	</div>
</div>
</form>

<script type="text/javascript">
	doBtnAuthority(attr_extension);

	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>
