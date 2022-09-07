<%--
=========================================================
*@FileName   : AIE_BMD_0310GS.jsp
*@FileTitle  : Air Quotation Search 
*@Description: Air Quotation Search 조회한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/14/2009
*@since      : 01/14/2009

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
				<% int cnt = 0; %>
				<% boolean isBegin = true; %>
	            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="air_sea_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bnd_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qttn_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qttn_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qttn_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="opr_usr_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inco_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_pic_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agn_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="agn_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vty_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt_kg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt_lbs"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas_cft"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mode" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tt" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="carr_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fnl_dest_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fnl_dest_loc_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="del_nm" filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="state_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="state_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="state_cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="free_form_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="free_form_txt" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_addr" filter="false"/>]]></TD>
                            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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