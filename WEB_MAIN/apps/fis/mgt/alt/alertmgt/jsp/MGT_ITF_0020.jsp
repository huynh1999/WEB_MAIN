<%--
=========================================================
*@FileName   : MGT_ALT_0010.jsp
*@FileTitle  :
*@Description: 
*@author     : 
*@version    :
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/alt/alertmgt/script/MGT_ITF_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<!-- OFC_CD -->
	var ofc_cd = "<%= userInfo.getOfc_cd() %>";
	var OFCCD = 'ALL|';
	<bean:define id="oficeList" name="valMap" property="ofcList"/> 
	<logic:notEmpty name="valMap" property="ofcList">
		<% boolean isBegin = false; %>
        <bean:define id="ofcList" name="valMap" property="ofcList"/>
        <logic:iterate id="ofcVO" name="ofcList">
            <% if(isBegin){ %>
                   OFCCD += '|';
            <% }else{
                   isBegin = true;
               } %>
            OFCCD+= '<bean:write name="ofcVO" property="ofc_cd"/>';
        </logic:iterate>
    </logic:notEmpty>
    
	<!-- Alert Entity Type -->
	var ETTCD = '|';
	var ETTVAL = '|';
	<% boolean isBegin = false; %>
    <bean:define id="alertEttList" name="valMap" property="alertEttList"/>
    <logic:iterate id="codeVO" name="alertEttList">
        <% if(isBegin){ %>
        ETTCD += '|';
        ETTVAL += '|';
        <% }else{
        	isBegin = true;
           } %>
        ETTCD+= '<bean:write name="codeVO" property="cd_nm"/>';
        ETTVAL+= '<bean:write name="codeVO" property="rmk"/>';
    </logic:iterate>

    <!-- Customer Type -->
	var CUST_CD = '';
	var CUST_VAL = '';
    <bean:define id="alertCustomerList" name="valMap" property="alertCustomerList"/>
    <logic:iterate id="codeVO" name="alertCustomerList">
        <% if(isBegin){ %>
        CUST_CD += '|';
        CUST_VAL += '|';
        <% }else{
        	isBegin = true;
           } %>
           CUST_CD+= '<bean:write name="codeVO" property="cd_val"/>';
           CUST_VAL+= '<bean:write name="codeVO" property="cd_nm"/>';
    </logic:iterate>
	
	function setupPage(){
       	loadPage();
    }
	
	</script>
<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<form name="frm1" method="POST" action="./MGT_ITF_0020.clt" >
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<div class="page_title_area clear">
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<div class="opus_design_btn"><!--
		--><button type="button" class="btn_accent"   <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!--
		--><button type="button" class="btn_normal"  <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('DOWNLOAD')"><bean:message key="Download"/></button>
		</div>
		<div class="location">
			<span><%=LEV1_NM%></span> &gt;
			<span><%=LEV2_NM%></span> &gt;
			<span><%=LEV3_NM%></span>
			<a href="" class="ir">URL Copy</a>
		</div>
	</div>
	
	<!-- inquiry_area(S) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry ">
            <table>
            	<colgroup>
            		<col width="60">
            		<col width="240">
            		<col width="70">
            		<col width="225">
            		<col width="60">
            		<col width="240">
            		<col width="70">
            		<col width="*">
            	</colgroup>
            	<tbody>
                    <tr>
                    	<th><bean:message key="Department_Type"/></th>
						<td> 
							<bean:define id="deptList" name="valMap" property="deptList"/><!-- 
							--><html:select name="valMap" property="f_dept_cd" styleClass="search_form" style="width:198px;" onchange="fnInitParam();">
								<html:options collection="deptList" property="cd_val" labelProperty="cd_nm"/>
							</html:select>
							<input type="hidden" name="f_air_sea_clss_cd">
						</td>
                    	<th><bean:message key="Ref_No"/></th>
						<td>
						    <input type="text" name="f_ref_no" maxlength="20" value='<bean:write name="valMap" property="f_ref_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:110px;text-transform:uppercase;" onKeyPress="if(event.keyCode==13){doWork('REF_POPLIST', this);}"/><!-- 
							--><bean:define id="ofcList" name="valMap" property="ofcList"/><!-- 
							--><html:select name="valMap" property="ref_ofc_cd" styleClass="search_form" style="width:55px;">
								<html:options collection="ofcList" property="ofc_cd" labelProperty="ofc_cd"/>
							</html:select><!--
							--><button type="button" name="btn_searchRefNo" id="btn_searchRefNo" class="input_seach_btn" onClick="doWork('REF_POPLIST', this)"></button>
							<input type="hidden" name="intg_bl_seq" value=""/>
						</td>
                        <th><bean:message key="MBL_No"/></th> 
                        <td>
                            <input type="text" name="f_bl_no" id="f_bl_no" maxlength="50" value='<bean:write name="valMap" property="f_bl_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:169px;" onKeyPress="if(event.keyCode==13){doWork('MBL_POPLIST', this);}"/><!--
                        	--><button type="button" name="btn_searchMblNo" id="btn_searchMblNo" class="input_seach_btn" onClick="doWork('MBL_POPLIST', this)"></button>
                        </td>
                        <th><bean:message key="ETD"/></th>
                        <td><!-- 
                        --><input style="width: 77px;"  type="text" id="etd_strdt" name="etd_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.etd_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
						--><span class="dash">~</span><!--
						--><input style="width: 77px;" type="text" id="etd_enddt" name="etd_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.etd_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
						--><button type="button" onclick="doDisplay('DATE11', frm1);" class="calendar" tabindex="-1"></button> 
					    </td>
					</tr>
					<tr>     
						<th><bean:message key="ETA"/></th>
			            <td><!--
						--><input style="width: 77px;" type="text" id="eta_strdt" name="eta_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.eta_enddt);firCalFlag=false;" size='11' maxlength="10" ><!-- 
						--><span class="dash">~</span><!--
						--><input style="width: 77px;" type="text" id="eta_enddt" name="eta_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.eta_strdt, this);firCalFlag=false;" size='11' maxlength="10" ><!--
						--><button type="button" onclick="doDisplay('DATE12', frm1);" class="calendar" tabindex="-1"></button>
					    </td>
                        <th><bean:message key="Container"/></th>
                        <td>
                            <input type="text" name="f_cntr_no" maxlength="14" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:198px;" />
                        </td>                   
			            <th><bean:message key="POL"/></th>
                        <td><!-- 
                        --><input type="text"   name="f_pol_cd" id="f_pol_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('POL_LOCATION_POPLIST')"></button><!--
                        --><input type="text"   name="f_pol_nm" id="f_pol_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POL_LOCATION_POPLIST', frm1.f_pol_nm.value);}"/></td>
                        </td>
                        <th><bean:message key="POD"/></th>
                        <td><!-- 
                        --><input type="text"   name="f_pod_cd" id="f_pod_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:55px;"/><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('POD_LOCATION_POPLIST')"></button><!--
                        --><input type="text"   name="f_pod_nm" id="f_pod_nm" maxlength="50"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onKeyPress="if(event.keyCode==13){doWork('POD_LOCATION_POPLIST', frm1.f_pod_nm.value);}"/></td>
                        </td>
					</tr>
				</tbody>
            </table>
	    </div>
	 </div>
	 <!-- inquiry_area(E) -->
	 
	 <!-- grid_area(S) -->
	 <div class="wrap_result">
	 	<!-- grid_area1(S) -->	
	 	<div class="opus_design_inquiry">
		    <div class="opus_design_grid" id="mainTable">
	 			<h3 class="title_design"><bean:message key="Master_BL_List"/></h3>
				<script language="javascript">comSheetObject('sheet1');</script>
		   	</div>
		   	<div></br></br></div>
			<table>
             	<tr>
					<td width="100">
						<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
					</td>
					<td align="center" width="900">
						<table width="900">
							<tr>
								<td width="900" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
								</td>
							</tr>
						</table>		
					</td>
					<td width="100"></td>
				</tr>
             </table>
         </div>
         <!-- grid_area1(E) -->	
	</div>
	<!-- grid_area(E) -->
</div>
</form>

<iframe name="ifrm1" src="" frameborder="0" scrolling="no" width="0" height="0"></iframe>


<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>	
