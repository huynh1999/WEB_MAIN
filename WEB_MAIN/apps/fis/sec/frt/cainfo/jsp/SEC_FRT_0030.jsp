<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEC_FRT_0030.jsp
*@FileTitle  : Correction Advice
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>

	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/sec/frt/cainfo/script/SEC_FRT_0030.js?ver=<%=CLT_JS_VER%>"></script>

<%
	String usr_id = userInfo.getUsrid();
%>
<script>
	function setupPage(){
		loadPage();
		doHideProcess();
	}
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	
	var sts_issue = '<bean:message key="Issue"/>';
	var sts_confirm = '<bean:message key="Confirm"/>';
	var bnt_save = '<bean:message key="Save"/>';
	var bnt_confirm = '<bean:message key="Confirm"/>';
	var bnt_cancel = '<bean:message key="Cancel"/>';
</script>
<style>
<!--
.table_search_head_etc {

    font-family: "Tahoma", "Arial", "Verdana";
    font-size: 11px;
    font-weight: normal;
    vertical-align: middle;
    color: #2D5CAC;
    background-image: url(/opusfwd/web/img/main/star_icon2.gif);
    background-repeat: no-repeat;
    background-position: left center;
    text-indent: 6px;
}
-->
</style>
<bean:define id="objVO"  name="EventResponse" property="objVal"/>
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<form name="form" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="blFlg" value='<bean:write name="tmpMap" property="blFlg"/>'/>
	<input	type="hidden" name="s_intg_bl_seq" value='<bean:write name="objVO" property="s_intg_bl_seq"/>'/>
	<input	type="hidden" name="intg_bl_seq" value='<bean:write name="objVO" property="intg_bl_seq"/>'/>
	<input	type="hidden" name="bkg_no" value='<bean:write name="objVO" property="bkg_no"/>'/>
	<html:hidden name="objVO" property="ca_seq"/>
	<input	type="hidden" name="bnd_clss_cd" value='<bean:write name="objVO" property="bnd_clss_cd"/>'/>
	
	<!-- jsjang 2013.8.9 #19337 Correction Notice 저장값 이상 -->
	<input	type="hidden" name="air_sea_clss_cd" value='<bean:write name="tmpMap" property="air_sea_clss_cd"/>'/>
	<input	type="hidden" name="biz_clss_cd" value='<bean:write name="tmpMap" property="biz_clss_cd"/>'/>
	
	<input	type="hidden" name="ca_sts_cd" value='<bean:write name="objVO" property="ca_sts_cd"/>'/>

	<input	type="hidden" name="master_bl_seq" value='<bean:write name="tmpMap" property="master_bl_seq"/>'/>
	<input	type="hidden" name="master_ca_sts_cd" value='<bean:write name="tmpMap" property="master_ca_sts_cd"/>'/>

	<!-- bl close 여부 -->
	<input	type="hidden" name="cls_flg" value='<bean:write name="objVO" property="cls_flg"/>'/>
	<input  type="hidden" name="save_yn" value='<bean:write name="objVO" property="save_yn"/>'/>

	<!-- 화면 이동 정보 -->
	<input	type="hidden" name="s_house_bl_no" value='<bean:write name="objVO" property="s_house_bl_no"/>'/>
	<input	type="hidden" name="s_master_bl_no" value='<bean:write name="objVO" property="s_master_bl_no"/>'/>
	<input	type="hidden" name="s_trdp_cd" value='<bean:write name="objVO" property="s_trdp_cd"/>'/>
	<input	type="hidden" name="s_trdp_short_nm" value='<bean:write name="objVO" property="s_trdp_short_nm"/>'/>
	<input	type="hidden" name="s_trdp_full_nm" value='<bean:write name="objVO" property="s_trdp_full_nm"/>'/>
	<input	type="hidden" name="s_status" value='<bean:write name="objVO" property="s_status"/>'/>
	<input	type="hidden" name="s_rgst_strdt" value='<bean:write name="objVO" property="s_rgst_strdt"/>'/>
	<input	type="hidden" name="s_rgst_enddt" value='<bean:write name="objVO" property="s_rgst_enddt"/>'/>
	<input	type="hidden" name="s_ofc_cd" value='<bean:write name="objVO" property="s_ofc_cd"/>'/>
	


	<input	type="hidden" name="openMean" value="SEC"/>
	<input	type="hidden" name="call_val" value='<bean:write name="tmpMap" property="call_val"/>'/>

	<input	type="hidden" name="s_ca_no" value='<bean:write name="tmpMap" property="s_ca_no"/>'/>

	<!-- 로그인한 사용자 정보를 담는다 -->
	<input	type="hidden" name="usr_id" value='<%=usr_id%>'/>

	<!-- 로그인한 사용자 정보를 담는다 -->
	<input	type="hidden" name="rgst_usrid" value='<bean:write name="objVO" property="rgst_usrid"/>'/>
	<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<%-- 	   <button type="button" class="btn_normal" id="cnPrint" style="cursor:hand; display:none;" btnAuth="B_CN" onclick="doWork('CNPRINT');"><bean:message key="B.CN"/></button><!--
	   --><button type="button" class="btn_normal" id="crPrint" style="cursor:hand; display:none;" btnAuth="B_CR" onclick="doWork('CRPRINT');"><bean:message key="B.CR"/></button><!--
	   --><button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCH02');"><bean:message key="Search"/></button>
 --%>	   
 	   </div>
	   <!-- btn_div -->
	   <div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
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
					<col width="80" />
					<col width="800" />
					<col width="70" />
					<col width="*" />
				</colgroup>
				<tbody>
               <tr>
                 <th><bean:message key="CA_NO"/></th>
                 <td><input required name="ca_no" type="text" value='<bean:write name="objVO" property="ca_no"/>' class="search_form" maxlength="15" dataformat="excepthan" style="ime-mode:disabled;width:200px;text-transform:uppercase;" onblur="strToUpper(this)" ></td>
                 <th class="table_search_head_etc"><bean:message key="CA_Status"/>:</th>
                 <td> 
                 <span id="status"></span>
                  <!--<logic:equal name="objVO" property="ca_sts_cd" value="I"> 
                    <span class="style1"><bean:message key="Issue"/></span> 
                  </logic:equal> 
                  <logic:equal name="objVO" property="ca_sts_cd" value="C"> 
                   <span class="style1"><bean:message key="Confirm"/></span> 
                  </logic:equal>-->
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
					<col width="80" />
					<col width="200" />
					<col width="100" />
					<col width="128" />
					<col width="80" />
					<col width="210" />
					<col width="80" />
					<col width="*" />
				</colgroup>
				<tbody>
               <tr>
               		<th> 
               		 <logic:equal name="tmpMap" property="air_sea_clss_cd" value="S"> 
               		 	<bean:message key="HBL_No"/> 
               		 </logic:equal> 
               		 <logic:equal name="tmpMap" property="air_sea_clss_cd" value="A"> 
               		 	<bean:message key="HAWB_No"/> 
               		 </logic:equal> 
               		</th>
                   	<td> 
                       <logic:equal name="tmpMap" property="biz_clss_cd" value="H"><input required name="house_bl_no" readonly type="text" maxlength="40" value='<bean:write name="objVO" property="house_bl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:200px;"></logic:equal><!--
                    --><logic:equal name="tmpMap" property="biz_clss_cd" value="M"><input name="house_bl_no" readonly type="text" maxlength="40" value='<bean:write name="objVO" property="house_bl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:200px;"></logic:equal><!--
                    --><logic:equal name="tmpMap" property="biz_clss_cd" value="H"><button type="button" class="input_seach_btn" tabindex="-1" onclick="doPop('HBL_POPLIST')"></button></logic:equal> 
                    </td>
                   <th><logic:equal name="tmpMap" property="air_sea_clss_cd" value="S"> 
                    				<bean:message key="MBL_No"/> 
                    				</logic:equal><!-- 
	                 				--><logic:equal name="tmpMap" property="air_sea_clss_cd" value="A"> 
                    				<bean:message key="MAWB_No"/> 
                    				</logic:equal> 
                    </th>
                   <td>
                   <logic:equal name="tmpMap" property="biz_clss_cd" value="M"><input required name="master_bl_no" readonly type="text" maxlength="40" value='<bean:write name="objVO" property="master_bl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:128px;"></logic:equal><!--
                   --><logic:equal name="tmpMap" property="biz_clss_cd" value="H"><input name="master_bl_no" readonly type="text" maxlength="40" value='<bean:write name="objVO" property="master_bl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:128px;"></logic:equal><!--
                   --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doPop('MBL_POPLIST')"></button> 
                    </td>
                   <th><bean:message key="Issued_By"/></th>
                   <td> <!-- 
	                 --><input name="iss_usrid" readonly type="text" value='<bean:write name="objVO" property="iss_usrid"/>'  class="search_form-disable" style="width:100px;">at&nbsp;<!-- 
	                 --><input name="iss_ofc_cd" readonly type="text" value='<bean:write name="objVO" property="iss_ofc_cd"/>' class="search_form-disable" style="width:100px;"> 
                    </td>
                    <th><bean:message key="Tel_Fax"/></th>
               	  	<td> 
	                    <input name="ntc_trdp_pic_phn" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_pic_phn"/>' class="search_form-disable" style="width:100px;"><span class="dash">/</span><!-- 
	                 --><input name="ntc_trdp_pic_fax" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_pic_fax"/>' class="search_form-disable" style="width:100px;"> 
                    </td>
               </tr>
               <tr>
                   <th><bean:message key="Partner"/></th>
                   <td> 
                    <input name="ntc_trdp_cd" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_cd"/>' class="search_form-disable" style="width:48px;"><!-- 
                 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doPop('PARTNER_POPLIST')"></button><!-- 
                 --><input name="ntc_trdp_full_nm" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_full_nm"/>' class="search_form-disable" style="width:119px;"> 
                    </td>
                   <th><bean:message key="Contact_Person"/></th>
                   <td><input name="ntc_trdp_pic" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_pic"/>' class="search_form-disable" style="width:128px;"></td>
                   <th><bean:message key="Confirmed_By"/></th>
                   <td> <!-- 
                 --><input name="cfm_usrid" readonly type="text" value='<bean:write name="objVO" property="cfm_usrid"/>' class="search_form-disable" style="width:100px;">at <!-- 
                 --><input name="cfm_ofc_cd" readonly type="text" value='<bean:write name="objVO" property="cfm_ofc_cd"/>' class="search_form-disable" style="width:100px;"> 
                    </td>
                 	<th><bean:message key="Email"/></th>
                 	<td><input name="ntc_trdp_pic_eml" readonly type="text" value='<bean:write name="objVO" property="ntc_trdp_pic_eml"/>' class="search_form-disable" style="width:210px;"></td>
               </tr>
               </tbody>
           </table>
           <table class="line_bluedot"><tr><td></td></tr></table>
		</div>
		<div class="opus_design_btn" style="width: 80%;">
			<button type="button" class="btn_etc" id="btnSave" style="display: none" onclick="doWork('SAVE');"><bean:message key="Save"/></button>
			<button type="button" class="btn_etc" id="btnConfirm" style="display: none" onclick="doWork('CONFIRM');"><bean:message key="Confirm"/></button>
			<button type="button" class="btn_etc" id="btnCancel" style="display: none" onclick="doWork('CANCEL');"><bean:message key="Cancel"/></button>
			   		
		   <!--
		   <logic:notEqual name="objVO" property="ca_sts_cd" value="C">
		   		<button type="button" class="btn_etc" id="btnSave" onclick="doWork('SAVE');"><bean:message key="Save"/></button>
				<logic:equal name="objVO" property="ca_sts_cd" value="I">
			   		<button type="button" class="btn_etc" onclick="doWork('CONFIRM');"><bean:message key="Confirm"/></button>
			   		<button type="button" class="btn_etc" onclick="doWork('CANCEL');"><bean:message key="Cancel"/></button>
	            </logic:equal>
	        </logic:notEqual>
	        -->
	   </div>
	   <div class="opus_design_inquiry">
	   		<table>
	   		<colgroup>
					<col width="110" />
					<col width="110" />
					<col width="110" />
					<col width="110" />
					<col width="110" />
					<col width="*" />
				</colgroup>
				<tbody>
              	<tr>
	                <td width="110px"><input name="grs_wgt_flg" id="grs_wgt_flg" type="checkbox" value="N" <logic:equal name="objVO" property="grs_wgt_flg" value="Y">checked</logic:equal> >
	               <label for="grs_wgt_flg"><bean:message key="GWeight"/></label></td>
	                <td width="110px"><input name="cbm_flg" id="cbm_flg" type="checkbox" value="N" <logic:equal name="objVO" property="cbm_flg" value="Y">checked</logic:equal> >
	               <label for="cbm_flg"><bean:message key="CBM"/></label></td>
	                <td width="110px"><input name="mk_desc_flg" id="mk_desc_flg" type="checkbox" value="N" <logic:equal name="objVO" property="mk_desc_flg" value="Y">checked</logic:equal> >
	               <label for="mk_desc_flg"><bean:message key="Mark_Desc"/></label></td>
	                <td width="110px"><input name="vsl_flg" id="vsl_flg" type="checkbox" value="N" <logic:equal name="objVO" property="vsl_flg" value="Y">checked</logic:equal> >
	               <label for="vsl_flg"><bean:message key="Vessel"/></label></td>
	                <td width="110px"><input name="cntr_flg" id="cntr_flg" type="checkbox" value="N" <logic:equal name="objVO" property="cntr_flg" value="Y">checked</logic:equal> >
	               <label for="cntr_flg"><bean:message key="Qty"/>/<bean:message key="Container"/></label></td>
	                <td width="110px"><input name="frt_term_flg" id="frt_term_flg" type="checkbox" value="N" <logic:equal name="objVO" property="frt_term_flg" value="Y">checked</logic:equal> >
	               <label for="frt_term_flg"><bean:message key="Freight_Term"/></label></td>
              	</tr>
	              	<tr>
		                <td><input name="shpr_pty_flg" id="shpr_pty_flg" type="checkbox" value="N" <logic:equal name="objVO" property="shpr_pty_flg" value="Y">checked</logic:equal> >
		               <label for="shpr_pty_flg"><bean:message key="Shipper"/></label></td>
		                <td><input name="cnee_pty_flg" id="cnee_pty_flg" type="checkbox" value="N" <logic:equal name="objVO" property="cnee_pty_flg" value="Y">checked</logic:equal> >
		               <label for="cnee_pty_flg"><bean:message key="Consignee"/></label></td>
		                <td><input name="ntfy_pty_flg" id="ntfy_pty_flg" type="checkbox" value="N" <logic:equal name="objVO" property="ntfy_pty_flg" value="Y">checked</logic:equal> >
		               <label for="ntfy_pty_flg"><bean:message key="Notify"/></label></td>
		                <td><input name="cmdt_flg" id="cmdt_flg" type="checkbox" value="N" <logic:equal name="objVO" property="cmdt_flg" value="Y">checked</logic:equal> >
		               <label for="cmdt_flg"><bean:message key="Commodity"/></label></td>
		                <td><input name="rout_flg" id="rout_flg" type="checkbox" value="N" <logic:equal name="objVO" property="rout_flg" value="Y">checked</logic:equal> >
		               <label for="rout_flg"><bean:message key="Route"/></label></td>
		                <td><input name="trf_inv_amt_flg" id="trf_inv_amt_flg" type="checkbox" value="N" <logic:equal name="objVO" property="trf_inv_amt_flg" value="Y">checked</logic:equal> >
		               <label for="trf_inv_amt_flg"><bean:message key="Rate"/>/<bean:message key="Tariff"/></label></td>
		                <td><input name="otr_flg" id="otr_flg" type="checkbox" value="N" <logic:equal name="objVO" property="otr_flg" value="Y">checked</logic:equal> >
		               <label for="otr_flg"><bean:message key="Other"/></label></td>
	              	</tr>
	              	</tbody>
	            </table>
	   </div>
	   <div class="layout_wrap">
	   		<div style="width: 40%;float: left;" class="layout_vertical_2">
	   			<h3 class="title_design"><bean:message key="Current_Information"/></h3>
	   			<textarea name='pre_info_txt' cols="82" rows="22" maxlength="943" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" onChange="checkTxtAreaLn(this, 43, 22, this.value)" dataformat="excepthan" ><bean:write name="objVO" property="pre_info_txt" filter="false"/></textarea>
	   		</div>
	   		<div style="width: 40%;float: left;" class="layout_vertical_2 mar_left_8">
	   			<h3 class="title_design"><bean:message key="Corrected_Information"/></h3>
	   			<textarea name='corr_info_txt' cols="82" rows="22" maxlength="943" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);"  onChange="checkTxtAreaLn(this, 43, 22, this.value)" dataformat="excepthan" ><bean:write name="objVO" property="corr_info_txt" filter="false"/></textarea>
	   		</div>
	   </div>
    </div>
</div>
</form>

<script type="text/javascript">
doBtnAuthority(attr_extension);
</script>	


