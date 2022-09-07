<%--
=========================================================
*@FileName   : PFM_MGT_0031.jsp
*@FileTitle  : Profit Report
*@Description: Profit Report
*@author     : HaeKyoung, Lee - Cyberlogitec
*@version    : 1.0 - 2012/01/10
*@since      : 2012/01/10

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/pfm/mgt/management/script/PFM_MGT_0031.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	<bean:define id="acctFincCurrDflt"  name="valMap" property="acctFincCurrDflt"/>

	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrId 		= userInfo.getUsrid();
		String usrNm 		= userInfo.getUser_name();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
		String dept_cd		= userInfo.getDept_cd();
	%>

<script>

	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);

	var usrNm = "<%= usrNm %>";
	
	 //  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828
	var ofc_curr_cd = "<bean:write name="ofcInfo" property="locl_curr_cd"/>";
	if (ofc_curr_cd == "" || ofc_curr_cd == "undefined"){
		ofc_curr_cd = "<bean:write name="ofcInfo" property="trf_cur_cd"/>";
	}

	function setSelect(){
		var formObj = document.frm1;
		doWork("ALL");
	}
	function setupPage(){
		loadPage();setSelect();
	}
	// #1299 [BNX] One Currency 옵션 - Office Code화면 Accounting Decimal Point 적용 보완
	var xch_rt_dp_cnt = Number("<bean:write name="ofcInfo" property="xch_rt_dp_cnt"/>");

	//#3411 [JTC]Accounting & Performance 수정사항
	var ACCT_FINC_CURR_DFLT = '<bean:write name="acctFincCurrDflt" property="opt_val"/>';

</script>

<form name="frm1" method="POST" action="./PFM_MGT_0031.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
   		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
  		 <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button style="display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" id="btnPrint" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button> 
		   <button style="display:none;" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_normal" onclick="doWork('ALLCLEAR')"><bean:message key="Clear"/></button>
		    --%>
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
	<!-- wrap_search(S) -->
	<div class="wrap_search">
		<!-- layout_wrap(S) -->
		<div class="opus_design_inquiry entry_pannel">
			<div class="layout_wrap">
		    	<div class="layout_flex_fixed" style="width:400px;float:left!important" >
		    		<table>
		    			<colgroup>
		    				<col width="120">
		    				<col width="*">
		    			</colgroup>
		    			<tbody>
							<tr>
								<th>Office</th>
								<td>
									<bean:define id="oficeList" name="valMap" property="ofcList"/>
									<select required name="s_ofc_cd" style="width:150px;"/>
										<bean:size id="len" name="oficeList" />
										<logic:greaterThan name="len" value="1">
											<option value=''>ALL</option>
										</logic:greaterThan>
										
										<logic:iterate id="ofcVO" name="oficeList">
											<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:equal>
				                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
				                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
				                         	</logic:notEqual>
										</logic:iterate>
									</select>
								</td>	
							</tr>
						</tbody>
					</table>
                    <table>
                    	<colgroup>
		    				<col width="120">
		    				<col width="155">
		    				<col width="*">
		    			</colgroup>
		    			<tbody>
	                        <tr>
	                            <th><label style="background-color:#d4f6ff;"><bean:message key="Department_Type"/></label></th>
	                            <td>
	                            	<div class="opus_design_btn">
	                            		<button type="button" class="btn_etc" onclick="doWork('ALL')"><bean:message key="All"/></button><!-- 
	                            	--><button type="button" class="btn_etc" onclick="doWork('CLEAR')"><bean:message key="Clear"/></button>
	                            	</div>
	                            </td>
	                            <td>
	                            	&nbsp;
	                            </td>
	                        </tr>
	                      </tbody>
                    </table>
                    <table>
                    	<colgroup>
		    				<col width="90">
		    				<col width="70">
		    				<col width="*">
		    			</colgroup>
		    			<tbody>
	                        <tr>
				                <td><input name="s_oi_dptm_flg" id="s_oi_dptm_flg" type="checkbox" value="SI" ><label for="s_oi_dptm_flg"><bean:message key="Ocean_Import"/></label></td>
				                <td><input name="s_ai_dptm_flg" id="s_ai_dptm_flg" type="checkbox" value="AI" ><label for="s_ai_dptm_flg"><bean:message key="Air_Import"/></label></td>
				                <td>&nbsp;</td>
	                        </tr>
	                        <tr>
	                            <td><input name="s_oe_dptm_flg" id="s_oe_dptm_flg" type="checkbox" value="SO" ><label for="s_oe_dptm_flg"><bean:message key="Ocean_Export"/></label></td>
				                <td><input name="s_ae_dptm_flg" id="s_ae_dptm_flg" type="checkbox" value="AO" ><label for="s_ae_dptm_flg"><bean:message key="Air_Export"/></label></td>
				                <td><input name="s_on_dptm_flg" id="s_on_dptm_flg" type="checkbox" value="ON" ><label for="s_on_dptm_flg"><bean:message key="Other_Operation"/></label></td>
	                        </tr>
	                     </tbody>
                    </table>
					<table>
						<colgroup>
		    				<col width="85">
		    				<col width="*">
		    			</colgroup>
		    			<tbody>
							<tr>
								<th><bean:message key="Post_Date"/></th>
								<td >
								    <input required type="text" name="s_prd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_prd_enddt);firCalFlag=false;"   size='10' maxlength="10" class="search_form">~ <!-- 
								 --><input required type="text" name="s_prd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_prd_strdt, this);firCalFlag=false;"   size='10' maxlength="10" class="search_form"><!-- 
								 --><button type="button" id="s_prd_dt_cal" class="calendar ir" onclick="doDisplay('DATE11', frm1);"></button>
								</td>
							</tr>
						</tbody>
					</table>
                    <table>
                    	<colgroup>
		    				<col width="85">
		    				<col width="80">
		    				<col width="*">
		    			</colgroup>
		    			<tbody>
	                        <tr>
	                        	<th><label style="background-color:#d4f6ff;"><bean:message key="Print"/>&nbsp;<bean:message key="Option"/></label></th>
	              				<td><input type="radio" name="s_prn_opt" id="s_prn_opt1" value="S" checked ><label for="s_prn_opt1"><bean:message key="Summary"/></label></td>
	              				<td><input type="radio" name="s_prn_opt" id="s_prn_opt2" value="D" ><label for="s_prn_opt2"><bean:message key="Detail"/></label></td>
	                        </tr>
                        </tbody>
                    </table>
                    <table>
                    	<colgroup>
		    				<col width="85">
		    				<col width="*">
		    			</colgroup>
		    			<tbody>
	                    	<tr>
	                    		<th><bean:message key="Operator"/></th>
	                            <td>
	                            	<input type="text" name="s_opr_usrid" value="<%=usrId %>" class="search_form" style="width:130px;" ><!-- 
	                            --><button type="button" id="oprBtn" class="input_seach_btn" tabindex="-1" onClick="openPopUp('USER_POPLIST',this)"></button>
					            	<input type="hidden" name="s_opr_usrnm"   value="">
	                    		</td>
	                    	</tr>
	                    </tbody>
                	</table>
		    	</div>
		    </div>
		    <div class="layout_flex_flex" style="padding-left: 400px;">
		        <div class="layout_wrap">
		            <table>
		            	<colgroup>
		    				<col width="50px">
		    				<col width="50px">
		    				<col width="*">
		    			</colgroup>
		    			<tbody>
	                        <tr>
	                            <td><b><bean:message key="Currency"/></b></td>
	                        </tr>
	                        <tr>
	                        	<td>
	                         		<input type="radio" name="s_curr_opt" id="f_curr_multi" value="M" checked/><label for="f_curr_multi"><bean:message key="Multi_Currency"/></label>
			              		</td>
	                    	</tr>
	                    	<tr>
			                	<td>
	                       			<input type="radio" name="s_curr_opt" id="f_curr_one" value="O" onClick="javascript:if(frm1.s_curr_cd.value != ''){doWork('CURR_SEARCH');}"/><label for="f_curr_one"><bean:message key="One_Currency"/></label>
			               		</td>		               
                           		<th><bean:message key="To_Currency"/></th>
                           		<td>
				            		<select name="s_curr_cd" OnChange="doWork('CURR_SEARCH');" >
					            		<option value=""></option>
                            			<bean:define id="paramCurrList"  name="valMap" property="currList"/>
										<logic:iterate id="CurrVO" name="paramCurrList">
                            			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
                            			</logic:iterate>
                           			</select>                            	
                           		</td>
	                    	</tr>
	                    	<tr>
	                    		<td colspan="3">
	                    			<div class="opus_design_grid" style="width: 325px;">
	                    				<script language="javascript">comSheetObject('sheet1');</script>
	                    			</div>
								</td>
	                    	</tr>
	                    </tbody>
                    </table>
		            
		        </div>
		    </div>
		</div>
		<!-- layout_wrap(E) -->
	</div>
	<!-- wrap_search(E) -->
</div>
</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	

