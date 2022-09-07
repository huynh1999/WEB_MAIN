<%--
=========================================================
*@FileName   : EDI_CSTM_0080.jsp
*@FileTitle  : 해운수출 미세관 AMS 화물적화목록 EDI 처리
*@Description: 해운수출 미세관 AMS 화물적화목록 EDI 처리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 07/23/2009
*@since      : 07/23/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/28
*@since      : 2014/07/28
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/ams/script/EDI_CSTM_0080.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
<!--
function setupPage() {
	initFinish();loadPage();doWork('SEARCHLIST01');
}
//-->
</script>
<form name="frm1" method="POST" action="./">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd">
	<input type="hidden" name="f_edi_sts">
    <input type="hidden" name="f_edi_cre_seq">
	<input type="hidden" name="f_edi_msg_seq">
    <input type="hidden" name="f_edi_msg_no">
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 		   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST01')"><bean:message key="Search"/></button><!--
		   --><button type="button" class="btn_normal" onclick="doWork('CALLCT')"><bean:message key="CTradeWorld"/></button>
 --%>	   </div>
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
				<colgroup>
					<col width="100"></col>
					<col width="200"></col>
					<col width="70"></col>
					<col width="220"></col>
					<col width="80"></col>
					<col width="150"></col>
				</colgroup>
				<tbody>
					<tr>
						<td colspan="6"><!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 --></td>
					</tr>
					<tr>
						<th>출항일자</th>
 						<td>
						<input type="text" name="f_obdt_bgn_dt" id="f_obdt_bgn_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)"/>~ 
						<input type="text" name="f_obdt_end_dt" id="f_obdt_end_dt" value='' class="search_form" dataformat="excepthan" style="width:74px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onKeyPress="doEnter();" onBlur="mkDateFormatType(this, event, true, 1)"/>
						<button type="button" id="f_obdt__dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
						</td>
		                <th>선박코드</th>
		                <td><!--
						--><input type="text"   name="f_vsl_cd"    value='' onblur="clearOrgVsl();" class="search_form" style="width:60px;"><!--
						--><input type="hidden" name="org_vsl_cd"  value=''><!--
						--><button type="button" class="input_seach_btn" tabindex="-1" id="trunkvessel" onClick="doWork('VSL_POP')"></button><!--
						--><input type="text" name="f_vsl_nm"  value='' class="search_form-disable" style="width:120px;" readonly>
		                </td>
		                <th>항차</th>
		                <td>
		                    <input type="text" name="f_flt_no" value='' class="search_form" style="width:120px;">
		                </td>
		              </tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_inquiry">
			<div class="layout_wrap">
    			<div class="layout_vertical_2" style="width: 30%;">
			    	<div class="opus_design_grid">
			    		<script language="javascript">comSheetObject('sheet1');</script>
			    	</div>
			    </div>
			    <div class="layout_vertical_2" style="width:70%; padding-left:10px;">
		    		<h3 class="title_design"><bean:message key="EDI_Result_Detail"/></h3>
		    		<div class="opus_design_btn">
		    			<span id="btn1" style="display:none;"><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND02')">전송자료 생성</button><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND03')">삭제</button><!--
						--><button type="button" class="btn_normal" onclick="doWork('RESET')">초기화</button>
		    			</span>
		    			<span id="btn2" style="display:none;"><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND02')">전송자료 생성</button><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND03')">삭제</button><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND04')"><bean:message key="EDI_Send"/></button><!--
						--><button type="button" class="btn_normal" onclick="doWork('RESET')">초기화</button>
		    			</span>
		    			<span id="btn3" style="display:none;"><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND02')">전송자료 생성</button><!--
						--><button type="button" class="btn_normal" onclick="doWork('COMMAND06')"><bean:message key="EDI_Send"/></button><!--
						--><button type="button" class="btn_normal" onclick="doWork('RESET')">초기화</button>
		    			</span>
		    		</div>
					<table>
						<colgroup>
							<col width="53"></col>
							<col width="120"></col>
							<col width="53"></col>
							<col width="120"></col>
							<col width="53"></col>
							<col width="120"></col>
							<col width="53"></col>
							<col width="120"></col>
							<col width="*"></col>
						</colgroup>
						<tbody>
							 <tr>
                                <th>출항일</th>
                                <td>
                                    <input type="text" name="disp_workday" style="width:115px" class="search_form-disable" readonly>
                                    <input type="hidden" name="disp_bl_seq">
                                </td>
								<th>선박</th>
								<td>
									<input type="text" name="disp_vsl_nm" style="width:115px" class="search_form-disable" readonly>
									<input type="hidden" name="disp_vsl_cd">
								</td>
								<th>항차</th>
								<td>
									<input type="text" name="disp_flt_no" style="width:115px" class="search_form-disable" readonly>
								</td>
								<th>선적항</th>
								<td>
									<input type="text"   name="disp_pol_nm" style="width:115px" class="search_form-disable" readonly>
									<input type="hidden" name="disp_pol_cd">
								</td>
								<td>
									<span id="mblAdd"><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="trunkvessel" onClick="doWork('EDIPOPLIST')"></button><!--
									--><button type="button" class="btn_etc" onclick="checkMblInfos();">등록</button>
									</span>
								</td>
							</tr>
							
							<tr>
								<th>상태</th>
								<td>
									<input type="text"   name="disp_edi_sts" style="width:115px" class="search_form-disable" readonly>
									<input type="hidden" name="cur_edi_sts">
								</td>
								<th>전송유형</th>
								<td>
									<select name="disp_ams_msg_snd_tp" style="width:115px;">
										<option value="MI" selected>원본전송</option>
									</select>
								</td>
								<th></th>
								<td></td>
								<th id="ediView" style="display: none;">전문번호</th>
								<td id="ediView2" style="display: none;">
									<select name="sndKeyList" style="width:115px;"></select><!--
									--><button type="button" class="input_seach_btn" tabindex="-1" id="trunkvessel" onClick="showEdiMsg();"></button><!--
									--><input type="hidden" name="disp_edi_msg_no" style="width:120px" class="search_form-disable" readonly>
								</td>
								<td></td>
							</tr>
							
							<tr>
                                <th><bean:message key="MRN"/></th>
                                <td>
                                    <input type="text" name="disp_mrn" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px" class="search_form" maxlength="20">
                                </td>
                                <th>선사</th>
                                <td>
                                    <input type="text" name="disp_vsl_cmp_cd" style="width:115px" class="search_form-disable" readonly>
                                </td>
                                <th>선박국적</th>
                                <td>
									<input type="text" name="disp_cnt_cd" style="width:115px;align:right;" class="search_form" maxlength="2">
                                </td>
                                <th></th>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <th>포워더SCAC</th>
                                <td>
									<input type="text" name="disp_trsp_co_scac" style="width:115px" class="search_form" maxlength="4">
                                </td>
                                <th>포워더KCS코드</th>
                                <td>
                                    <input type="text" name="disp_kcs_cd"    style="width:115px" class="search_form" maxlength="4">
                                </td>
                                <th>전송일자</th>
                                <td>
                                    <input type="text" name="disp_smt_dt" style="width:115px" class="search_form-disable" readonly>
                                </td>
                                <th></th>
                                <td></td>
                                <td></td>
                            </tr>
						</tbody>
					</table>
					<div class="opus_design_inquiry"><script language="javascript">comSheetObject('sheet2');</script></div>
			    </div>
			</div>
	    </div>
    </div>
</div>
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
</script>

