<%-- 
=========================================================
*@FileName   : SEE_BMD_0051.jsp
*@FileTitle  : Shipping Document
*@Description: Shipping Document 등록 수정한다.
*@author     : 이광훈 - sea =Export 
*@version    : 1.0 - 01/09/2009
*@since      : 01/09/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/see/bmd/shippingdoc/script/SEE_BMD_0051.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
	<bean:define id="objVO"  name="EventResponse" property="objVal"/>
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<logic:notEmpty name="tmpMap" property="shipDocExt">
				var shipDocExt = '<bean:write name="tmpMap" property="shipDocExt"/>';
		</logic:notEmpty>
		
		<logic:notEmpty name="tmpMap" property="SAVED">
			doDispDocList();
		</logic:notEmpty>
	</logic:notEmpty>
		
	function setupPage(){
	   loadPage();
	   doWork('SEARCHLIST');
	   frm1.palt_doc_no.focus();
	}
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>

<form name="frm1" method="POST" action="./SEE_BMD_0051.clt" enctype="multipart/form-data">
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" value=""/>
    <input type="hidden" name="intg_bl_seq"      value='<bean:write name="objVO" property="intg_bl_seq"/>'/>
    <input type="hidden" name="intg_bl_rgst_tms" value='<bean:write name="objVO" property="intg_bl_rgst_tms"/>'/>
    <input type="hidden" name="palt_doc_seq"     value='<bean:write name="objVO" property="palt_doc_seq"/>'/>
    <input type="hidden" name="palt_mnu_cd"     value='<bean:write name="objVO" property="palt_mnu_cd"/>'/>
    <input type="hidden" name="opr_no"     		value='<bean:write name="objVO" property="opr_no"/>'/>
    <input type="hidden" name="img_nm" value="<bean:write name="objVO" property="palt_doc_img_nm"/>"/>
    <input type="hidden" name="img_url" value="<bean:write name="objVO" property="palt_doc_img_url"/>"/>
    <input type="hidden" name="pdf_nm" value="<bean:write name="objVO" property="palt_doc_pdf_nm"/>"/>
    <input type="hidden" name="pdf_url" value="<bean:write name="objVO" property="palt_doc_pdf_url"/>"/>
    <input type="hidden" name="palt_ext_flg" value="<bean:write name="objVO" property="palt_ext_flg"/>"/>
    
    <input type="hidden" name="ofc_flg" value='<bean:write name="objVO" property="ofc_flg"/>'/>
	<!-- page_title_area -->
	<div class="layer_popup_title">
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:message key="Shipping_Document_Registration"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		   <logic:notEqual name="objVO" property="ofc_flg" value="D">
		   		<logic:empty name="objVO" property="palt_doc_seq">
		   			 <button type="button" id="btnAdd" class="btn_accent" onclick="doWork('ADD')"><bean:message key="Save"/></button>
			    </logic:empty><!-- 
			 --><logic:notEmpty name="objVO" property="palt_doc_seq"><!-- 
			 	--><button type="button" id="btnModify" class="btn_accent" onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
			 --></logic:notEmpty><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </logic:notEqual>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry ">
	   		<input name="palt_trdp_cd" type="hidden" value='<bean:write name="objVO" property="palt_trdp_cd"/>' class="search_form-disable" style="width:80;"/>
	   		
	   		 <table>
                 <tr>
                     <th width="120"><bean:message key="Document_Kind"/></th>
                     <td> 
                      <div id="div_subcode"> 
                       <input type="hidden" name="doc_tp_cd" value="<bean:write name="objVO" property="palt_doc_tp_cd"/>" /> 
                        <logic:notEmpty name="EventResponse"> 
                          	<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/> 
                          	<bean:define id="selList1" name="tmpMap" property="PARAM1"/> 
                          	<select name="palt_doc_tp_cd" OnChange="doWork('DOC_TP_CD');"> 
	                       		<logic:iterate id="lst1" name="selList1"> 
	                         			<option value='<bean:write name="lst1" property="cd_val"/>' ><bean:write name="lst1" property="cd_nm"/></option> 
	                        		</logic:iterate> 
                         	</select> 
                      </logic:notEmpty> 
                      <html:text name="objVO" property="palt_doc_nm" styleClass="search_form" style="width:100;"/> 
                      </div></td>
                 </tr>
                 <tr>
                     <th><label for="ext_flg_chk"><bean:message key="External"/></label></th>
                     <td class="table_search_body"><input type="checkbox" name="ext_flg_chk" id="ext_flg_chk" onclick="externalCheck(this);"></td>
                 </tr>
                 <tr>
                     <th><bean:message key="Reference_No"/></th>
                     <td><html:text name="objVO" property="palt_doc_no" styleClass="search_form" maxlength="50" style="width:238px;"/></td>
                 </tr>
                 <tr>
                     <th><bean:message key="File_Attach"/></th>
                     <td> 
                      <logic:notEmpty name="objVO" property="palt_doc_img_nm"> 
                      <b><bean:message key="Original_File"/></b>: <a href="javascript:downloadFile('img');"><bean:write name="objVO" property="palt_doc_img_nm"/></a> &nbsp;&nbsp;&nbsp;&nbsp;<br> 
                      <logic:notEmpty name="objVO" property="palt_doc_pdf_nm"> 
                      <b>PDF</b>: <a href="javascript:downloadFile('pdf');"><bean:write name="objVO" property="palt_doc_pdf_nm"/></a><br/> 
                      </logic:notEmpty> 
                      <input tabindex = "-1" type="file" name="palt_doc_img_url" class="search_form" size="60"/> 
                      </logic:notEmpty> 
                      <logic:empty name="objVO" property="palt_doc_img_nm"> 
                           <input type="file" name="palt_doc_img_url" class="search_form" size="60"/> 
                      </logic:empty></td>
                 </tr>
                 <tr>
                     <th><bean:message key="Message"/></th>
                     <td><textarea name="palt_doc_msg" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:560px;height:150px" maxlength="1000"><bean:write name="objVO" property="palt_doc_msg" filter="false"/></textarea></td>
                 </tr>
                 <tr>
                     <th><bean:message key="Remark"/></th>
                     <td><textarea name="palt_doc_rmk" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:560px;height:40px" maxlength="100"><bean:write name="objVO" property="palt_doc_rmk" filter="false"/></textarea></td>
                 </tr>
             </table>
	   	</div>
	</div>
	</div>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" id="goWhere" name="goWhere" value="fd"/>
    <input type="hidden" id="bcKey" name="bcKey" value="blFileDown"/>
    <input type="hidden" id="s_palt_doc_seq" name="s_palt_doc_seq" value="<bean:write name="objVO" property="palt_doc_seq"/>"/>
    <input type="hidden" id="intg_bl_seq" name="intg_bl_seq" value="<bean:write name="objVO" property="intg_bl_seq"/>"/>
    <input type="hidden" id="docType" name="docType" value=""/>
</form>
	

<!--  Complete Image  -->
<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
	<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
</div>

	


