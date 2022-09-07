<%--
=========================================================
*@FileName   : SEE_AMS_0030GS.jsp
*@FileTitle  : SEE AMS 
*@Description: SEE AMS 
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>

<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr >	
							<TD><![CDATA[<bean:write name="row" property="vsl_fullname"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsl_voyage"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="refnbr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="filling_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="blnbr"/>]]></TD>
							<%-- #25561 AMS List 에 Tracking 기능 추가  --%>
 							<logic:greaterThan name="row" property="cntr_cnt" value="0" >
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/> + <bean:write name="row" property="cntr_cnt"/>]]></TD>
							</logic:greaterThan>
							<logic:equal name="row" property="cntr_cnt" value="0" > 
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					 		</logic:equal> 
							<logic:equal name="row" property="cntr_cnt" value="-1" > 
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					 		</logic:equal> 

							<TD><![CDATA[<bean:write name="row" property="chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="blck_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dl_sts_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="msg_date"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="type"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="err_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_sts"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pol_ams"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="h_pol_etd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pod_ams"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pod_eta"/>]]></TD>
		                    <TD><bean:write name="row" property="por_fullname"/></TD>
		                    <TD><![CDATA[<bean:write name="row" property="del_ams"/>]]></TD>
		                    <TD><bean:write name="row" property="carr_nm"/></TD>
		                    <TD><bean:write name="row" property="agt_nm"/></TD>
		                    <TD><bean:write name="row" property="shpr_nm"/></TD>
		                    <TD><bean:write name="row" property="cnee_nm"/></TD>
		                    <TD><bean:write name="row" property="ntfy_nm"/></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cntr_qty"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="blpkg"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="blpkgu"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="blkg"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="bllbs"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="blvol"/>]]></TD>
		                    <!-- OFVFOUR-7405 Making AMS EDI Connection in OPUS Demo Site  -->
		                    <TD><![CDATA[<bean:write name="row" property="dnld_date"/>]]></TD>
		                   <!--  <TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>  -->
		                    <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="vsl_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="lnr_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="lnr_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="shpr_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cnee_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ntfy_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="agt_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="blwgt"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="blwgtu"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="msg_no"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="shpr_add"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cnee_add"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ntfy_add"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="scac"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="disp_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="carr_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="mblpkg"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="mbl_no_flg"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cntr_cnt"/>]]></TD>
		                    <TD></TD>
	            		</tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
