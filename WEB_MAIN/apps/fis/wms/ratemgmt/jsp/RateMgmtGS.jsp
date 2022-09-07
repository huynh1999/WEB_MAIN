<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
<%-- 조회 결과가 없는 경우 --%>
<logic:empty name="EventResponse" property="mapVal">
<RESULT>0</RESULT>
</logic:empty>
<%-- 조회 결과가 있는 경우 --%>
<logic:notEmpty name="EventResponse" property="mapVal">
<COMON>

<RESULT>1</RESULT>

<bean:define id="mapVal" name="EventResponse" property="mapVal"/>

<SHEET>
	<ETC-DATA> 
	    <ETC KEY="mess"><bean:write name="mapVal" property="strMess"/></ETC>
	    <ETC KEY="dupRow"><bean:write name="mapVal" property="dupRow"/></ETC>
	</ETC-DATA> 
</SHEET>

<%-- WareHosue Office Info --%>
<logic:notEmpty name="mapVal" property="whEtrVO">
<bean:define id="whEtrVO" name="mapVal" property="whEtrVO"/>
<INFO2>
	<WH_OFC_CD><bean:write name="whEtrVO" property="wh_ofc_cd"/></WH_OFC_CD>
	<WH_CURR_CD><bean:write name="whEtrVO" property="wh_curr_cd"/></WH_CURR_CD>
</INFO2>
</logic:notEmpty>

<%-- Contract Info --%>
<logic:notEmpty name="mapVal" property="contractInfo">

<bean:define id="contractInfo" name="mapVal" property="contractInfo"/>

<INFO>
<CTRT_NO><bean:write name="contractInfo" property="ctrt_no"/></CTRT_NO>
<CTRT_NM><bean:write name="contractInfo" property="ctrt_nm"/></CTRT_NM>
<SALES_OFC_CD><bean:write name="contractInfo" property="sales_ofc_cd"/></SALES_OFC_CD>
<SALES_OFC_NM><bean:write name="contractInfo" property="sales_ofc_nm"/></SALES_OFC_NM>
<SALES_PIC_ID><bean:write name="contractInfo" property="sales_pic_id"/></SALES_PIC_ID>
<SALES_PIC_NM><bean:write name="contractInfo" property="sales_pic_nm"/></SALES_PIC_NM>
<CTRT_CUST_CD><bean:write name="contractInfo" property="ctrt_cust_cd"/></CTRT_CUST_CD>
<RGST_SYS_DT><bean:write name="contractInfo" property="rgst_sys_dt"/></RGST_SYS_DT>
<MODI_SYS_DT><bean:write name="contractInfo" property="modi_sys_dt"/></MODI_SYS_DT>
<RGST_NM><bean:write name="contractInfo" property="rgst_nm"/></RGST_NM>
<MODI_NM><bean:write name="contractInfo" property="modi_nm"/></MODI_NM>
</INFO>

</logic:notEmpty>

<%-- Main Grid --%>

<logic:empty name="mapVal" property="mainRateList">
<SHEET1>
<SHEET>
<DATA TOTAL="0"></DATA>
</SHEET>
</SHEET1>
</logic:empty>

<logic:notEmpty name="mapVal" property="mainRateList">

<bean:define id="rowSet" name="mapVal" property="mainRateList"/>
<SHEET1>
<SHEET>
<DATA TOTAL="<bean:write name="mapVal" property="mainRateTotal"/>">
<logic:iterate id="row" name="rowSet">
<tr>
<TD></TD>
<TD></TD>
<TD><bean:write name="row" property="ctrt_no"/></TD>
<TD><bean:write name="row" property="sb_cls_cd"/></TD>
<TD><bean:write name="row" property="rate_no"/></TD>
<TD><bean:write name="row" property="frt_mode"/></TD>
<TD><bean:write name="row" property="branch"/></TD>
<TD><bean:write name="row" property="eff_fr_dt"/></TD>
<TD><bean:write name="row" property="eff_to_dt"/></TD>
<TD><bean:write name="row" property="por"/></TD>
<TD><bean:write name="row" property="por_nm"/></TD>
<TD><bean:write name="row" property="pol"/></TD>
<TD><bean:write name="row" property="pol_nm"/></TD>
<TD><bean:write name="row" property="pod"/></TD>
<TD><bean:write name="row" property="pod_nm"/></TD>
<TD><bean:write name="row" property="del"/></TD>
<TD><bean:write name="row" property="del_nm"/></TD>
<TD><bean:write name="row" property="svcterm_fr_cd"/></TD>
<TD><bean:write name="row" property="svcterm_to_cd"/></TD>
<TD><bean:write name="row" property="nra_quote_no"/></TD>
<TD><bean:write name="row" property="file_org_nm"/></TD>
<TD></TD>
<TD><bean:write name="row" property="doc_no"/></TD>
<TD><bean:write name="row" property="file_path"/></TD>
<TD><bean:write name="row" property="file_sys_nm"/></TD>
<TD><bean:write name="row" property="pub_dt"/></TD>
<TD><bean:write name="row" property="pub_update_dt"/></TD>
<TD><bean:write name="row" property="pub_update_yn"/></TD>
<TD><bean:write name="row" property="departure_cd"/></TD>
<TD><bean:write name="row" property="departure_nm"/></TD>
<TD><bean:write name="row" property="arrival_cd"/></TD>
<TD><bean:write name="row" property="arrival_nm"/></TD>
<TD><bean:write name="row" property="origin_loc_cd"/></TD>
<TD><bean:write name="row" property="origin_loc_nm"/></TD>
<TD><bean:write name="row" property="dest_loc_cd"/></TD>
<TD><bean:write name="row" property="dest_loc_nm"/></TD>
<TD><bean:write name="row" property="loc_cd"/></TD>
<TD><bean:write name="row" property="commodity_desc"/></TD>
<TD></TD>
<TD>Y</TD>
<TD>Y</TD>
</tr>
</logic:iterate>
</DATA>
</SHEET>
</SHEET1>

</logic:notEmpty>

<%-- Details Grid --%>

<logic:empty name="mapVal" property="detailRateList">
<SHEET2>
<SHEET>
<DATA TOTAL="0"></DATA>
</SHEET>
</SHEET2>
</logic:empty>

<logic:notEmpty name="mapVal" property="detailRateList">

<bean:define id="rowSet" name="mapVal" property="detailRateList"/>
<SHEET2>
<SHEET>
<DATA TOTAL="<bean:write name="mapVal" property="detailRateTotal"/>">
<logic:iterate id="row" name="rowSet">
<tr>
<TD></TD>
<TD></TD>
<TD><bean:write name="row" property="ctrt_no"/></TD>
<TD><bean:write name="row" property="sb_cls_cd"/></TD>
<TD><bean:write name="row" property="cust_cd"/></TD>
<TD><bean:write name="row" property="cust_nm"/></TD>
<TD><bean:write name="row" property="rate_tp_cd"/></TD>
<TD><bean:write name="row" property="frt_cd"/></TD>
<TD><bean:write name="row" property="frt_nm"/></TD>
<TD><bean:write name="row" property="unit_cd"/></TD>
<TD><bean:write name="row" property="unit_cd2"/></TD>
<TD><bean:write name="row" property="curr_cd"/></TD>
<TD><bean:write name="row" property="unit_price"/></TD>
<TD><bean:write name="row" property="item_cd"/></TD>
<TD><bean:write name="row" property="eff_fr_dt"/></TD>
<TD><bean:write name="row" property="eff_to_dt"/></TD>
<TD><bean:write name="row" property="rmk"/></TD>

<TD><bean:write name="row" property="rate_no"/></TD>
<TD><bean:write name="row" property="rate_seq"/></TD>
<TD><bean:write name="row" property="ofc_cd"/></TD>
<TD><bean:write name="row" property="fix_rate_flg"/></TD>
<TD><bean:write name="row" property="frt_cd"/></TD>
<TD><bean:write name="row" property="frt_nm"/></TD>
<TD><bean:write name="row" property="cond_first"/></TD>
<TD><bean:write name="row" property="cond_second"/></TD>
<TD><bean:write name="row" property="ext_rate"/></TD>
<TD><bean:write name="row" property="int_rate"/></TD>
<TD><bean:write name="row" property="full_mon_rate"/></TD>
<TD><bean:write name="row" property="half_mon_rate"/></TD>
<TD><bean:write name="row" property="week_rate"/></TD>
<TD><bean:write name="row" property="day_opt"/></TD>
<TD><bean:write name="row" property="day_rate"/></TD>
<TD><bean:write name="row" property="frt_mode"/></TD>
</tr>
</logic:iterate>
</DATA>
</SHEET>
</SHEET2>
</logic:notEmpty>
</COMON>
</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
<ERROR>
<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
</ERROR>
</logic:notEmpty>
