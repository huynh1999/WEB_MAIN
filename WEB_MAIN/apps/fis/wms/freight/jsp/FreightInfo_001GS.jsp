
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
					<DATA TOTAL="0"></DATA>
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
						<logic:iterate id="row" name="rowSet">
                            <doc_no><![CDATA[<bean:write name="row" property="doc_no"/>]]></doc_no>
                            <ctrt_no><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></ctrt_no>
							<ctrt_nm><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></ctrt_nm>
							<sales_ofc_cd><![CDATA[<bean:write name="row" property="sales_ofc_cd"/>]]></sales_ofc_cd>
							<sales_pic_nm><![CDATA[<bean:write name="row" property="sales_pic_nm"/>]]></sales_pic_nm>
							<pnl_svc_tp_nm><![CDATA[<bean:write name="row" property="pnl_svc_tp_nm"/>]]></pnl_svc_tp_nm>
                            <ctrt_ord_tp_nm><![CDATA[<bean:write name="row" property="ctrt_ord_tp_nm"/>]]></ctrt_ord_tp_nm>
                            
                            <ship_cd><![CDATA[<bean:write name="row" property="ship_cd"/>]]></ship_cd>
                            <ship_nm><![CDATA[<bean:write name="row" property="ship_nm"/>]]></ship_nm>
                            <cne_cd><![CDATA[<bean:write name="row" property="cne_cd"/>]]></cne_cd>
							<cne_nm><![CDATA[<bean:write name="row" property="cne_nm"/>]]></cne_nm>
                            <wo_cust_cd><![CDATA[<bean:write name="row" property="wo_cust_cd"/>]]></wo_cust_cd>
                            <wo_cust_nm><![CDATA[<bean:write name="row" property="wo_cust_nm"/>]]></wo_cust_nm>
                            <sprov_cd><![CDATA[<bean:write name="row" property="sprov_cd"/>]]></sprov_cd>
                            
                            <sprov_nm><![CDATA[<bean:write name="row" property="sprov_nm"/>]]></sprov_nm>
                            <tot_qty><![CDATA[<bean:write name="row" property="tot_qty"/>]]></tot_qty>
						    <tot_pkgqty><![CDATA[<bean:write name="row" property="tot_pkgqty"/>]]></tot_pkgqty>							
                            <tot_pkgunit><![CDATA[<bean:write name="row" property="tot_pkgunit"/>]]></tot_pkgunit>
                            <tot_cbm><![CDATA[<bean:write name="row" property="tot_cbm"/>]]></tot_cbm>
                            <tot_kgs><![CDATA[<bean:write name="row" property="tot_kgs"/>]]></tot_kgs>
                            <cntr_type1><![CDATA[<bean:write name="row" property="cntr_type1"/>]]></cntr_type1>
                            
                            <cntr_type2><![CDATA[<bean:write name="row" property="cntr_type2"/>]]></cntr_type2>
                            <cntr_type3><![CDATA[<bean:write name="row" property="cntr_type3"/>]]></cntr_type3>
						    <cntr_type4><![CDATA[<bean:write name="row" property="cntr_type4"/>]]></cntr_type4>							
                            <cntr_type5><![CDATA[<bean:write name="row" property="cntr_type5"/>]]></cntr_type5>
                            <cntr_cnt1><![CDATA[<bean:write name="row" property="cntr_cnt1"/>]]></cntr_cnt1>
                            <cntr_cnt2><![CDATA[<bean:write name="row" property="cntr_cnt2"/>]]></cntr_cnt2>
                            <cntr_cnt3><![CDATA[<bean:write name="row" property="cntr_cnt3"/>]]></cntr_cnt3>
                            
                            <cntr_cnt4><![CDATA[<bean:write name="row" property="cntr_cnt4"/>]]></cntr_cnt4>
                            <cntr_cnt5><![CDATA[<bean:write name="row" property="cntr_cnt5"/>]]></cntr_cnt5>
						    <etd><![CDATA[<bean:write name="row" property="etd"/>]]></etd>							
                            <eta><![CDATA[<bean:write name="row" property="eta"/>]]></eta>
                            <est_cmpl_dt><![CDATA[<bean:write name="row" property="est_cmpl_dt"/>]]></est_cmpl_dt>
                            <upd_dt><![CDATA[<bean:write name="row" property="upd_dt"/>]]></upd_dt>
                            <upd_user_nm><![CDATA[<bean:write name="row" property="upd_user_nm"/>]]></upd_user_nm>
                            
                            <upd_org_nm><![CDATA[<bean:write name="row" property="upd_org_nm"/>]]></upd_org_nm>
                            <op_ofc_cd><![CDATA[<bean:write name="row" property="op_ofc_cd"/>]]></op_ofc_cd>
						    <so_no><![CDATA[<bean:write name="row" property="so_no"/>]]></so_no>							
                            <wo_ord_tp_cd><![CDATA[<bean:write name="row" property="wo_ord_tp_cd"/>]]></wo_ord_tp_cd>
                            <ori_br_cd><![CDATA[<bean:write name="row" property="ori_br_cd"/>]]></ori_br_cd>
                            <dest_br_cd><![CDATA[<bean:write name="row" property="dest_br_cd"/>]]></dest_br_cd>
                            <tri_br_cd><![CDATA[<bean:write name="row" property="tri_br_cd"/>]]></tri_br_cd>
                            
                            <ctrt_cust_cd><![CDATA[<bean:write name="row" property="ctrt_cust_cd"/>]]></ctrt_cust_cd>
                            <ctrt_cust_nm><![CDATA[<bean:write name="row" property="ctrt_cust_nm" filter="false"/>]]></ctrt_cust_nm>
                            
                            <loc_job_flg><![CDATA[<bean:write name="row" property="loc_job_flg"/>]]></loc_job_flg>
                            <loc_job_flg_nm><![CDATA[<bean:write name="row" property="loc_job_flg_nm"/>]]></loc_job_flg_nm>
						    <loc_job_close_dt><![CDATA[<bean:write name="row" property="loc_job_close_dt"/>]]></loc_job_close_dt>							
                            <loc_job_close_dt_hm><![CDATA[<bean:write name="row" property="loc_job_close_dt_hm"/>]]></loc_job_close_dt_hm>
                            <frt_closing_dt><![CDATA[<bean:write name="row" property="frt_closing_dt"/>]]></frt_closing_dt>
                            <frt_closing_flg_nm><![CDATA[<bean:write name="row" property="frt_closing_flg_nm"/>]]></frt_closing_flg_nm>
                            <ord_tp_lvl2_cd><![CDATA[<bean:write name="row" property="upd_user_nm"/>]]></ord_tp_lvl2_cd>
                            
                            <ex_in_cd><![CDATA[<bean:write name="row" property="ex_in_cd"/>]]></ex_in_cd>
					</logic:iterate>
					</DATA>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
