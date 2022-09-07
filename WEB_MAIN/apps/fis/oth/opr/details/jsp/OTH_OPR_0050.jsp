<%-- 
=========================================================
*@FileName   : OTH_OPR_0050.jsp
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
	<script language="javascript" src="./apps/fis/oth/opr/details/script/OTH_OPR_0050.js?ver=<%=CLT_JS_VER%>"></script>
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
	}
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>

<form name="frm1" method="POST" action="./OTH_OPR_0050.clt" enctype="multipart/form-data">
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" value=""/>
    <input type="hidden" name="po_sys_no"      	 value='<bean:write name="objVO" property="po_sys_no"/>'/>
    <input type="hidden" name="palt_doc_seq"     value='<bean:write name="objVO" property="palt_doc_seq"/>'/>
    <input type="hidden" name="img_nm" value="<bean:write name="objVO" property="po_doc_img_nm"/>"/>
    <input type="hidden" name="img_url" value="<bean:write name="objVO" property="po_doc_img_url"/>"/>
    <input type="hidden" name="pdf_nm" value="<bean:write name="objVO" property="po_doc_pdf_nm"/>"/>
    <input type="hidden" name="pdf_url" value="<bean:write name="objVO" property="po_doc_pdf_url"/>"/>
    <input type="hidden" name="po_ext_flg" value="<bean:write name="objVO" property="po_ext_flg"/>"/>
    
	<!-- page_title_area -->
	<div class="layer_popup_title">
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:message key="Shipping_Document_Registration"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
	   		<logic:empty name="objVO" property="palt_doc_seq">
	   			 <button type="button" id="btnAdd" class="btn_accent" onclick="doWork('ADD')"><bean:message key="Save"/></button>
		    </logic:empty> 
		 	<logic:notEmpty name="objVO" property="palt_doc_seq">
		 		<button type="button" id="btnModify" class="btn_accent" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
		 	</logic:notEmpty> 
		 <button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry ">
	   		 <table>
                 <tr>
                     <th width="120"><bean:message key="Document_Kind"/></th>
                     <td> 
                      <div id="div_subcode"> 
                       <input type="hidden" name="doc_tp_cd" value="<bean:write name="objVO" property="po_doc_tp_cd"/>" /> 
                        <logic:notEmpty name="EventResponse"> 
                          	<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/> 
                          	<bean:define id="selList1" name="tmpMap" property="PARAM1"/> 
                          	<select name="po_doc_tp_cd" OnChange="doWork('DOC_TP_CD');"> 
	                       		<logic:iterate id="lst1" name="selList1"> 
	                         			<option value='<bean:write name="lst1" property="cd_val"/>' ><bean:write name="lst1" property="cd_nm"/></option> 
	                        		</logic:iterate> 
                         	</select> 
                      </logic:notEmpty> 
                      <html:text name="objVO" property="po_doc_nm" styleClass="search_form" style="width:100;"/> 
                      </div></td>
                 </tr>
                 <tr>
                     <th><label for="ext_flg_chk"><bean:message key="External"/></label></th>
                     <td class="table_search_body"><input type="checkbox" name="ext_flg_chk" id="ext_flg_chk" onclick="externalCheck(this);"></td>
                 </tr>
                 <tr>
                     <th><bean:message key="Reference"/></th>
                     <td><html:text name="objVO" property="po_doc_no" styleClass="search_form" maxlength="20" style="width:238px;"/></td>
                 </tr>
                 <tr>
                     <th><bean:message key="File_Attach"/></th>
                     <td> 
                      <logic:notEmpty name="objVO" property="po_doc_img_nm"> 
                      <b><bean:message key="Original_File"/></b>: <a href="javascript:downloadFile('img');"><bean:write name="objVO" property="po_doc_img_nm"/></a> &nbsp;&nbsp;&nbsp;&nbsp;<br> 
                      <logic:notEmpty name="objVO" property="po_doc_pdf_nm"> 
                      <b>PDF</b>: <a href="javascript:downloadFile('pdf');"><bean:write name="objVO" property="po_doc_pdf_nm"/></a><br/> 
                      </logic:notEmpty> 
                      <input tabindex = "-1" type="file" name="po_doc_img_url" class="search_form" size="60"/> 
                      </logic:notEmpty> 
                      <logic:empty name="objVO" property="po_doc_img_nm"> 
                           <input type="file" name="po_doc_img_url" class="search_form" size="60"/> 
                      </logic:empty></td>
                 </tr>
                 <tr>
                     <th><bean:message key="Message"/></th>
                     <td><textarea name="po_doc_msg" class="search_form" style="width:560px;height:150px" maxlength="1000"><bean:write name="objVO" property="po_doc_msg" filter="false"/></textarea></td>
                 </tr>
                 <tr>
                     <th><bean:message key="Remark"/></th>
                     <td><textarea name="po_doc_rmk" class="search_form" style="width:560px;height:40px" maxlength="100"><bean:write name="objVO" property="po_doc_rmk" filter="false"/></textarea></td>
                 </tr>
             </table>
	   	</div>
	</div>
	</div>
</div>
</form>
<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value="<bean:write name="objVO" property="palt_doc_seq"/>"/>
    <input type="hidden" name="docType" value=""/>
</form>

<!--  Complete Image  -->
<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
	<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
</div>

	



