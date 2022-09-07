<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : AIE_BMD_0080.jsp
*@FileTitle  : MAWB Stock 등록 및 수정 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/08/14
=========================================================
--%> 
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/aie/bmd/stock/script/AIE_BMD_0080.js?ver=<%=CLT_JS_VER%>"></script>
	
<%
	String usrId = userInfo.getUsrid();
	String usrNm = userInfo.getUser_name();
%>
<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
<script>
	function setupPage(){
	 	loadPage();
	 	document.frm1.f_iata_cd.focus();
	}
</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	
	<input type="hidden" name="usrid" value="<%= usrId %>"/>
	<input type="hidden" name="usrnm" value="<%= usrNm %>"/>
	<input type="hidden" name="f_st_no"/>
	<input type="hidden" name="f_lst_no"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   	<button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST01')"><bean:message key="Search"/></button> 
		 	<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('NEW')"><bean:message key="New"/></button>
		 	<button type="button" class="btn_normal" id="btnAdd" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('ADD')"><bean:message key="Save"/></button>
	     	<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onClick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button>
	     	<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onClick="doWork('UPLOAD');" name="btn_UPLOAD"><bean:message key="Upload"/></button>
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
    <div style="display: none;" id="mainTable">
    	<script language="javascript">comSheetObject('sheet1');</script>
    </div>
<div class="over_wrap" height="100%">
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
               <tr>
                  <th width="80px"><bean:message key="IATA_CD"/></th>
                  <td width="70px"> 
                   <select name="f_iata_cd" id="f_iata_cd" style="width:70px"> 
                   <option value="">ALL</option> 
                   <bean:define id="tmpCdList" name="rtnMap" property="iataCdList"/> 
                   <logic:notEmpty name="tmpCdList"> 
                   	<logic:iterate id="iataCd" name="tmpCdList"> 
                   		<option value="<bean:write name="iataCd"/>"><bean:write name="iataCd"/></option> 
                   	</logic:iterate> 
                   </logic:notEmpty> 
                   </select> 
                   </td>
	
                 <th width="75px"><bean:message key="AWB_Type"/></th>
                 <td width="170px"> <!-- #5755 [Impex-Germany] Dublicate error message when creating MAWB stock -->
                  <input name="f_awb_type" id="f_awb_type1" type="radio" value="CL" checked><label for="f_awb_type1"><bean:message key="Neutral"/></label>&nbsp;<!-- 
                  --><input name="f_awb_type" id="f_awb_type2" type="radio" value="EX"><label for="f_awb_type2"><bean:message key="Express"/></label><!-- 
                  --></td>
                  <!-- #5755 [Impex-Germany] Dublicate error message when creating MAWB stock -->
                 <th width="75px"><bean:message key="View_Type"/></th>
                 <td> 
	                  <select name="f_delt_flg" id="f_delt_flg">
						<option value="N"></option>
						<option value="Y">Delete List</option>
					 </select>
                 </td>
              </tr>
            </table>
		</div>
	</div>
    <div class="wrap_result">
    	<div class="layout_wrap">
    		<div class="layout_vertical_2 pad_rgt_8" style="width:360px;">
    			<div class="opus_design_inquiry">
	    			<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
	    			<table>
	                    <tr>
	                    	<th width="80px"><label style="background-color:#d4f6ff;"><bean:message key="AWB_Type"/></label></th>
	                       	<td height="25px"><!-- 
	                       	 --><input name="s_awb_type" id="s_awb_type1" type="radio" value="CL" checked disabled><label for="s_awb_type1"><bean:message key="Neutral"/></label>&nbsp;<!-- 
	                       	 --><input name="s_awb_type" id="s_awb_type2" type="radio" value="EX" disabled><label for="s_awb_type2"><bean:message key="Express"/></label>&nbsp;<!-- 
	                       	 --><!-- #5755 [Impex-Germany] Dublicate error message when creating MAWB stock --><!-- 
	                       	 --><button type="button" id="sbtncreate" style="display: " class="btn_etc" onclick="doWork('CREATE')"><bean:message key="Create"/></button><!-- 
	                       	  --><button type="button" id="sbtnDelete" style="display: none" class="btn_etc" onclick="doWork('SUMMARY_DELETE')"><bean:message key="Summary"/> <bean:message key="Delete"/></button><!-- 
	                       	 -->
	                       	 </td>
	                    </tr>
	                    <tr>   	
	                        <th><bean:message key="Office"/></th>
	                        <td> 
	                         <select required name="s_aloc_area_cd" style="width:80px;" disabled> 
	                         	<option value=""></option> 
	                         	<bean:define id="tmpCdList" name="rtnMap" property="ofcCdList"/> 
	                         	<logic:notEmpty name="tmpCdList"> 
	                         		<logic:iterate id="ofcCd" name="tmpCdList"> 
	                         			<option value="<bean:write name="ofcCd"/>"><bean:write name="ofcCd"/></option> 
	                         		</logic:iterate> 
	                         	</logic:notEmpty> 
	                         </select>
	                        </td>
	                    </tr>
	                    <tr>
	                    	<th><bean:message key="IATA_CD"/></th>
	                        <td> 
	                         <select required name="s_iata_cd" style="width:80px" disabled> 
	                         	<bean:define id="tmpCdList" name="rtnMap" property="iataCdList"/> 
	                         			<logic:notEmpty name="tmpCdList"> 
	                         				<logic:iterate id="iataCd" name="tmpCdList"> 
	                         				<option value="<bean:write name="iataCd"/>"><bean:write name="iataCd"/></option> 
	                         		</logic:iterate> 
	                         	</logic:notEmpty> 
	                         </select> 
	                         </td>
	                    </tr>
	                    <tr>    
	                        <th><bean:message key="MAWB_No"/></th>
	                        <td><!-- 
	                         --><input required name="s_bl_st" type="text" class="search_form-disable" readOnly onkeypress="onlyNumberCheck();" dataformat="excepthan" style="width:80px;ime-mode:disabled" onKeyUp="moveFocus(this);" maxlength="7"><span class="dash">~</span><!-- 
	                         --><input required name="s_bl_lst" type="text" class="search_form-disable" readOnly onkeypress="onlyNumberCheck();" style="width:80px;" maxlength="7"><!-- 
	                         --></td>
	                    </tr>
	                    <tr>    
	                        <th><bean:message key="Receipt"/></th>
	                        <td><!-- 
	                         --><input required type="text" name="s_receipt_dt" class="search_form-disable" readOnly onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Receipt Date');" style="width:80px;text-align:left"><!-- 
	                         --><button type="button" class="calendar ir" onclick="doDisplay('DATE1',frm1.s_receipt_dt);"></button><!-- 
	                         --></td>
	                    </tr>
	                    <tr>    
	                        <th><bean:message key="Operator"/></th>
	                        <td><!-- 
	                         --><input name="s_oper_usrid" type="text" class="search_form-disable" style="width:80px;" value="<%= usrId %>" readOnly><!-- 
	                         --><input name="s_oper_usrnm" type="text" class="search_form-disable" style="width:120px;" value="<%= usrNm %>" readOnly><!-- 
	                         --></td>
	                    </tr>
	                    <!-- #5755 [Impex-Germany] Dublicate error message when creating MAWB stock  -->
	                    <tr>    
	                        <th> </th>
	                        <td>
	                        	 <input name="s_delt_flg" type="hidden" class="search_form-disable" style="width:20px;" readOnly>
	                         	  <input name="s_not_del_cnt" type="hidden" class="search_form-disable" style="width:50px;" readOnly>
	                     	</td>
	                     </tr>
	                </table>
    			</div>
    		</div>
    		<div class="layout_vertical_2" style="width:calc(100% - 360px);">
    			<h3 class="title_design"><bean:message key="Summary"/></h3>
    			<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet2');</script>
				</div>
    		</div>
    	</div>
    	<h3 class="title_design mar_top_8"><bean:message key="MAWB_Stock_List"/></h3>
    	<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet3');</script>
		</div>
    </div>
</div>
</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
<script>
    var pDoc = parent.document;
    hideProcess('WORKING', pDoc);   
</script>

