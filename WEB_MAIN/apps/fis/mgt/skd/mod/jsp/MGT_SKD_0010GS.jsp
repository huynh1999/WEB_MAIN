<%--
=========================================================
*@FileName   : AIE_BMD_0220GS.jsp
*@FileTitle  : ATD/ATA for Modify Master B/L Search 
*@Description: ATD/ATA 일괄 변경을 위해 Master B/L Search 조회한다.
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
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
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"  filter="false"/>]]></TD>
							<TD>
								<logic:equal name="row" property="bl_sts_cd" value="MC">0</logic:equal>
								<logic:equal name="row" property="bl_sts_cd" value="HO">0</logic:equal>
							</TD>
							<TD><![CDATA[<bean:write name="row" property="shp_mod_cd"/>]]></TD>
							 
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no"  filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="hbl_cnt"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="atd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ata_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cntr_no" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm2" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="carr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="carr_trdp_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm"  filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
							<TD>1</TD>                         

							<TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pol_nm"  filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="ar_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ap_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dc_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="memo" filter="false"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="proc_usrnm" filter="false"/>]]></TD>
                            
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD>
							<TD></TD>      
                            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
				
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>