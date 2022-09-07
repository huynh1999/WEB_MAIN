<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   SEE_BMD_0100.jsp
*@FileTitle  : Document Package(Ocean Export MBL) 
*@author     : OJG - CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<style>
.scroll 
{
overflow:auto;max-height:500px;
}
</style>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/masterbl/script/SEE_BMD_0100.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="mblVO" name="EventResponse" property="objVal"/>
	<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript">
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var ofcLoclNm = "<%= userInfo.getOfc_locl_nm() %>";
		var roleCd = "<%= userInfo.getRole_cd() %>";
		var usrCntCd = "<%= userInfo.getOfc_cnt_cd() %>";
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
	<input type="hidden" name="s_ref_ofc_cnt_cd" value="<bean:write name="mblVO" property="ref_ofc_cnt_cd"/>"/>
	<input type="hidden" name="s_sea_body" value="<bean:write name="mblVO" property="sea_body"/>"/>
	<input type="hidden" name="s_cmc_inv_flg" value="<bean:write name="mblVO" property="cmc_inv_flg"/>"/>
	<input type="hidden" name="s_pck_inv_flg" value="<bean:write name="mblVO" property="pck_inv_flg"/>"/>
	<input type="hidden" name="s_cr_db_flg" value="<bean:write name="mblVO" property="cr_db_flg"/>"/>
	<input type="hidden" name="s_hbl_flg" value="<bean:write name="mblVO" property="hbl_flg"/>"/>
	
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
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	<!-- Office Remark -->
	<input type="hidden" name="rmk_cd" value="<bean:write name="mblVO" property="rmk_cd"/>"/>

	<!--  OE HBL Form -->
	<input	type="hidden" name="oe_hbl_form" value="<bean:write name="tmpMap" property="oe_hbl_form"/>"/>

	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP" >
			<%-- 
			<button style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" type="button" class="btn_accent" name="btn_retrieve" id="btn_retrieve" onclick="doWork('SEARCH')"><bean:message key="Search"/></button><!-- 
			--><button style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" type="button" class="btn_normal" name="btnPrint" id="btnPrint" onclick="doWork('Print')"><bean:message key="Print"/></button> 
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
	   	<!-- page_location(E) -->
    </div>
   	<!-- page_title_area(E) -->
	
	<!-- wrap_search (S) -->
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<!-- h3  class="title_design"><bean:message key="Search_Condition"/></h3-->
			<table>
				<colgroup>
					<col width="70">
					<col width="190">
					<col width="80">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Ref_No"/></th>
						<td><!-- 
						 --><input name="f_ref_no" maxlength="20" value="<bean:write name="mblVO" property="ref_no"/>" type="text"  dataformat="excepthan" style="width:130;" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="entSearch()"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('REF_POPLIST',this)"></button><!-- 
						 --></td>
						<th><bean:message key="MBL_No"/></th>
						<td><!-- 
						 --><input type="text" name="f_bl_no" maxlength="40" value="<bean:write name="mblVO" property="bl_no"/>"  dataformat="excepthan" style="ime-mode:disabled;width:145;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="entSearch()"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('MBL_POPLIST')"></button><!-- 
						 --></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- wrap_search(E) -->
	
	<div class="wrap_result" style="max-height:89vh;overflow:auto;">
		<div class="opus_design_inquiry">
			<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
            <table>
            	<colgroup>
            		<col width="160">
            		<col width="*">
            	</colgroup>
            	<tbody>
	           		<tr>
	                    <th width="150px"><bean:message key="Company_Name_on"/> <bean:message key="HBL"/></th>
	                    <td align="left"><input required name="s_ofc_locl_nm" type="text" value="<%= userInfo.getOfc_locl_nm() %>" class="search_form" onBlur="strToUpper(this);" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:300px;text-transform:uppercase;" maxlength="100"></td>
	                </tr>
	        	</tbody>
           	</table>
	        <table class="mar_top_8">
            	<colgroup>
            		<col width="160">
            		<col width="*">
            	</colgroup>
            	<tbody>       
	             	<tr>
	                	<th><bean:message key="Master_Agent"/><br></th>
	                    <td ><textarea required name="s_agt_desc" class="search_form" style="width:300px;height:120px" readonly><bean:write name="mblVO" property="agt_info"/></textarea></td>                        
	           		</tr>
	           	</tbody>
           	</table>
               
 			<table class="mar_top_8">
 				<colgroup>
            		<col width="160">
            		<col width="180">
            		<col width="180">
            		<col width="*">
            	</colgroup>
            	<tbody>
	         		<tr>
	                	<th><bean:message key="Show_BL_Type"/></th>
	                	<td>
	                		<input type="radio" name="s_bl_radio" id="s_bl_radio1" value="1" ><label for="s_bl_radio1"><bean:message key="Original"/></label></td>
	                	<td>
	                		<input type="radio" name="s_bl_radio" id="s_bl_radio2" value="2" ><label for="s_bl_radio2"><bean:message key="NonNegotiable"/></label></td>
	                	<td>
	                		<input type="radio" name="s_bl_radio" id="s_bl_radio3" value="3" ><label for="s_bl_radio3"><bean:message key="Draft"/></label></td>
	    			</tr>
	                <tr>
	                	<td></td>
	                	<td><input type="radio" name="s_bl_radio" id="s_bl_radio4" value="1" ><label for="s_bl_radio4"><bean:message key="Copy"/></label></td>
	                	<td><input type="radio" name="s_bl_radio" id="s_bl_radio5" value="2" ><label for="s_bl_radio5"><bean:message key="Telex_Release"/></label></td>
	                	<td><input type="radio" name="s_bl_radio" id="s_bl_radio6" value="3" checked><label for="s_bl_radio6"><bean:message key="None"/></label></td>
	            	</tr>  
	            </tbody>
             </table>
	         <table class="mar_top_8">
	         	<colgroup>
            		<col width="160">
            		<col width="180">
            		<col width="*">
            	</colgroup>
            	<tbody>
                  <tr>
                     <th><bean:message key="Agent_Type"/></th>
	                <td><input type="radio" name="s_agt_tp" id="s_agt_tp1" value="1" onclick="agtTpChange(this.value);" checked><label for="s_agt_tp1"><bean:message key="Master_Agent_Shipper"/></label></td>
	                <td><input type="radio" name="s_agt_tp" id="s_agt_tp2" value="3" onclick="agtTpChange(this.value);"><label for="s_agt_tp2"><bean:message key="House_Agent"/></label></td>
                  </tr>
                  <tr>
	                <td ></td>
	                <td colspan="2" >
	                <input type="radio" name="s_agt_tp" id="s_agt_tp3" value="2" onclick="agtTpChange(this.value);"><label for="s_agt_tp3"><bean:message key="Master_Agent_CoLoad"/></label></td>
	            </tr>
	           </tbody>
	        </table>
	            <table>
	            	<colgroup>
	            		<col width="160">
	            		<col width="*">
	            	</colgroup>
	            	<tbody>
		            	<tr>
	                    	<th width="150"></th>
	                        <td>
								<select name="s_hbl_agt" class="search_form" style="width:390px;" disabled> 
		                         	<option value=""></option> 
		                         </select> 
	                         </td>
				    	</tr>
			    	</tbody>
                </table>
                
                <table class="mar_top_8">
		         	<colgroup>
	            		<col width="160">
	            		<col width="180">
	            		<col width="*">
	            	</colgroup>
	            	<tbody>
	                  <tr>
	                     <th><bean:message key="Split"/></th>
		                <td><input type="radio" name="s_pck_rpt_opt" id="s_pck_rpt_opt1" value="1" checked><label for="s_pck_rpt_opt1"><bean:message key="By_BL"/></label></td>
		                <td><input type="radio" name="s_pck_rpt_opt" id="s_pck_rpt_opt2" value="2" ><label for="s_pck_rpt_opt2"><bean:message key="By_Container"/></label></td>
	                  </tr>
		           </tbody>
		        </table>
	            
				<table class="mar_top_8">
					<colgroup>
	            		<col width="160">
	            		<col width="180">
	            		<col width="180">
	            		<col width="*">
	            	</colgroup>
	            	<tbody>
						<tr>
							<th><label style="background-color:#d4f6ff;"><bean:message key="Select_Report_Type"/></label></th>
	                        <td>
		                        <input name="s_rpt_tp_1" id="s_rpt_tp_1" type="checkbox" value="Cargo Manifest" onclick="setPrintSort(this);" ><!-- 
		                     --><label for="s_rpt_tp_1">1.&nbsp;<bean:message key="Cargo_Manifest"/></label></td>
	                        <td><input name="s_rpt_tp_4" id="s_rpt_tp_4" type="checkbox" value="HB/L" onclick="setPrintSort(this);"><!-- 
	                         --><label for="s_rpt_tp_4">4. <bean:message key="HBL"/></label></td>
	                        <td>
	                           <button type="button" class="btn_etc" onclick="doWork('ALL')" ><bean:message key="All"/></button><!--
	                           --><button type="button" class="btn_etc" onclick="doWork('CLEAR')" ><bean:message key="Clear"/></button>
	                         </td>
						</tr>
						<tr>
							<th></th>
	                        <td><input name="s_rpt_tp_2" id="s_rpt_tp_2" type="checkbox" value="Master Set / MAWB" onclick="setPrintSort(this);"><!-- 
	                         --><label for="s_rpt_tp_2">2.&nbsp;<bean:message key="Master_Set_MAWB"/></label></td>
	                        <td><input name="s_rpt_tp_5" id="s_rpt_tp_5" type="checkbox" value="Commercial Invoice" onclick="setPrintSort(this);"><!-- 
	                         --><label for="s_rpt_tp_5">5.&nbsp;<bean:message key="Commercial_Invoice"/></label></td>
	                        <td><input name="s_rpt_tp_7" id="s_rpt_tp_7" type="checkbox" value="Shipping Advice" onclick="setPrintSort(this);"><!-- 
	                         --><label for="s_rpt_tp_7">7.&nbsp;<bean:message key="Shipping_Advice"/></label></td>
	                    </tr>
						<tr>
							<th></th>
	                        <td><input name="s_rpt_tp_3" id="s_rpt_tp_3" type="checkbox" value="Credit / Debit Note" onclick="setPrintSort(this);"><!-- 
	                         --><label for="s_rpt_tp_3">3.&nbsp;<bean:message key="Credit_Debit_Note"/></label></td>
	                        <td><input name="s_rpt_tp_6" id="s_rpt_tp_6" type="checkbox" value="Packing List" onclick="setPrintSort(this);"><!-- 
	                         --><label for="s_rpt_tp_6">6.&nbsp;<bean:message key="Packing_List"/></label></td>
	                        <td>
	                        <div id="de_div" style ="display:none;">
	                         <input name="s_rpt_tp_8" id="s_rpt_tp_8" type="checkbox" value="Ausfuhr." onclick="setPrintSort(this);"> 
	                         <label for="s_rpt_tp_8">8.&nbsp;<bean:message key="DE_S/A"/></label>
	                        </div>
	                        </td>
	                    </tr>
	                    <tr>
							<th><bean:message key="Print_Order"/></th>
		                    <td  colspan="9"> 
		                     <textarea name="prt_sort" style="width:300px;height:120px" readonly></textarea>
		                    </td>
		               </tr>
	                  </tbody>
    	        </table>
    	        
                <table class="mar_top_8">
                	<colgroup>
	            		<col width="160">
	            		<col width="*">
	            	</colgroup>
	            	<tbody>
	                  <tr>
	                    <th width="150" ><bean:message key="Remark"/></th>
			            <td >
			            	<textarea name="f_rmk" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:300px;height:50px"></textarea>
			            </td>
			          </tr>
			          </tbody>
	            </table>
	            
	            <table class="mar_top_8">
    	        	<colgroup>
	            		<col width="160">
	            		<col width="440">
	            		<col width="*">
	            	</colgroup>
	            	<tbody>
	            		<tr>
	            			<th width="150"><bean:message key="House_BL_List"/></th>
	            			<td>
	            				<div class="opus_design_grid">
				    	        	<script type="text/javascript">comSheetObject('sheet2');</script>
				    	        </div>
	            			</td>
	            			<td></td>
	            		</tr>
	            	</tbody>
    	        </table>
    	        
    	        <table>
					<tr>
						<td>
							<table width="600" id="mainTable" >
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
	
	</form>
		
<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	

<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>
