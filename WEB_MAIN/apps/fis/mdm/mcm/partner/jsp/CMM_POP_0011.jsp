<%--
=========================================================
*@FileName   : CMM_POP_0010.jsp
*@FileTitle  : CMM
*@Description: trade partner pop
*@author     : 이광훈 - trade partner pop
*@version    : 1.0 - 12/29/2008
*@since      : 12/29/2008

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>
	<% String callTp = "";%>
	<% String iata_cd = "";%>
    <logic:notEmpty name="EventResponse">
        <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	    
		<logic:notEmpty name="cdMap" property="callTp">
			<bean:define id="tmpTp"  name="cdMap" property="callTp"/>
			<% callTp = (String)tmpTp; %>
		</logic:notEmpty>
		
		<logic:notEmpty name="cdMap" property="iata_cd">
			<bean:define id="tmpIata"  name="cdMap" property="iata_cd"/>
			<% iata_cd = (String)tmpIata; %>
		</logic:notEmpty>	
		
		
    </logic:notEmpty>
    

	<!-- 해당 Action별 js -->
	<script language="javascript" src="./apps/fis/mdm/mcm/partner/script/CMM_POP_0011.js?ver=<%=CLT_JS_VER%>"></script>


	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>

	<div>
		<h2 class="page_title"><span style="margin: 10px"><bean:message key="Additional_Information"/></span></h2>
	</div>
		<div class="opus_design_btn">
			<button type="button" name="btnSave" id="btnSave" class="btn_normal" onclick="doWork('save')" ><bean:message key="Save"/></button><!-- 
			 --><button type="button" name="btnDelete" id="btnDelete" class="btn_normal" onclick='addrDelete()' ><bean:message key="Delete"/></button><!-- 
			--><button type="button" name = "btnClose" id="btnClose" class="btn_normal" onclick="ComClosePopup();" ><bean:message key="Close"/></button>
		</div>
	</div>
	<form name="form" method="POST" action="./CMM_POP_0011.clt" enctype="multipart/form-data">
		<!--Command를 담는 공통 -->
		<input	type="hidden" name="f_cmd"/>
		<input  type="hidden" name="f_CurPage"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="comboSel"/>
		<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
		<input type="hidden" name="user_ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />

		<input	type="hidden" name="trdp_cd"/>
		<input	type="hidden" name="trdp_seq"/>
		<input	type="hidden" name="trdp_sts"/>
		<!-- OFVFOUR-7902 [Lever Logistics] Trade Partner Entry - Additional Name & Address -->
		<input	type="hidden" name="trdp_nm_hidden" value=""/>
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="100"></col>
				<col width="*"></col>
			</colgroup>
			<tr>
				<th><bean:message key="Name"/></th>
				<td><input type="text" name="trdp_nm" id="trdp_nm"/></td>
			</tr>
			<tr>
				<th><bean:message key="Address_Type"/></th>
				<td>
					<select name="trdp_addr_tp" id="trdp_addr_tp">
						<option value="lcl">Local Address</option>
						<option value="bl">B/L Address</option>
						<option value="blg">Billing Address</option>
					</select>
				</td>
			</tr>
			<tr>
				<th><bean:message key="Address"/></th>
				<td><textarea name ="trdp_add_addr" id ="trdp_add_addr" style="height:150px" onblur='chkCmpAddr(this,"Address")'></textarea></td>
			</tr>
			<tr>
				<th><bean:message key="Remark"/></th>
				<td><textarea name="rmk" id="rmk" style="height:150px"></textarea></td>
			</tr>						
		</table>
	</div>

	<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
	    <iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>	
	</form>


