<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
*@FileName   : searchWHOutMgmtInfoGS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Khoa.Nguyen
*@version    : 1.0
*@since      : 2016/05/04

*@Change history: 
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				
				<logic:notEmpty name="rowSet" property="contractInfo">
					<bean:define id="contractInfo" name="rowSet" property="contractInfo"/>
					<INFO>
						<CTRT_CUST_CD><bean:write name="contractInfo" property="ctrt_cust_cd"/></CTRT_CUST_CD>
					</INFO>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="whEtrVO">
					<bean:define id="whEtrVO" name="rowSet" property="whEtrVO"/>
					<INFO>
						<WH_OFC_CD><bean:write name="whEtrVO" property="wh_ofc_cd"/></WH_OFC_CD>
						<WH_CURR_CD><bean:write name="whEtrVO" property="wh_curr_cd"/></WH_CURR_CD>
					</INFO>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="listCnt">
					<CHECK>
						<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
					</CHECK>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="form">
 					<bean:define id="rowSetField" name="rowSet" property="form"/>
					<FIELD>
						<DATA TOTAL="1">
							<logic:iterate id="rowField" name="rowSetField">
								<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
								<wh_cd><![CDATA[<bean:write name="rowField" property="wh_cd"/>]]></wh_cd>
								<wh_nm><![CDATA[<bean:write name="rowField" property="wh_nm" filter="false"/>]]></wh_nm>
								<ctrt_no><![CDATA[<bean:write name="rowField" property="ctrt_no"/>]]></ctrt_no>
								<ctrt_nm><![CDATA[<bean:write name="rowField" property="ctrt_nm"/>]]></ctrt_nm>
								<rtp_no><![CDATA[<bean:write name="rowField" property="rtp_no"/>]]></rtp_no>
								<owner_cd><![CDATA[<bean:write name="rowField" property="owner_cd"/>]]></owner_cd>
								<owner_addr1><![CDATA[<bean:write name="rowField" property="owner_addr1" filter="false"/>]]></owner_addr1>
								<cust_ord_no><![CDATA[<bean:write name="rowField" property="cust_ord_no"/>]]></cust_ord_no>
								<wob_bk_no><![CDATA[<bean:write name="rowField" property="wob_bk_no"/>]]></wob_bk_no>
								<bk_sts_cd><![CDATA[<bean:write name="rowField" property="bk_sts_cd"/>]]></bk_sts_cd>
								<bk_sts_nm><![CDATA[<bean:write name="rowField" property="bk_sts_nm"/>]]></bk_sts_nm>
								<ord_tp_cd><![CDATA[<bean:write name="rowField" property="ord_tp_cd"/>]]></ord_tp_cd>
								<bk_date><![CDATA[<bean:write name="rowField" property="bk_date"/>]]></bk_date>
								<load_tp_cd><![CDATA[<bean:write name="rowField" property="load_tp_cd"/>]]></load_tp_cd>
								<est_out_dt><![CDATA[<bean:write name="rowField" property="est_out_dt"/>]]></est_out_dt>
								<est_out_hm><![CDATA[<bean:write name="rowField" property="est_out_hm"/>]]></est_out_hm>
								<trade_tp_cd><![CDATA[<bean:write name="rowField" property="trade_tp_cd"/>]]></trade_tp_cd>
								<fwd_tp_cd><![CDATA[<bean:write name="rowField" property="fwd_tp_cd"/>]]></fwd_tp_cd>
								<trucker_cd><![CDATA[<bean:write name="rowField" property="trucker_cd"/>]]></trucker_cd>
								<trucker_nm><![CDATA[<bean:write name="rowField" property="trucker_nm" filter="false"/>]]></trucker_nm>
								<eq_tpsz_cd><![CDATA[<bean:write name="rowField" property="eq_tpsz_cd"/>]]></eq_tpsz_cd>
								<eq_no><![CDATA[<bean:write name="rowField" property="eq_no" filter="false"/>]]></eq_no>
								<eq_tp_cd><![CDATA[<bean:write name="rowField" property="eq_tp_cd"/>]]></eq_tp_cd>
								<seal_no><![CDATA[<bean:write name="rowField" property="seal_no" filter="false"/>]]></seal_no>
								<dlv_ord_no><![CDATA[<bean:write name="rowField" property="dlv_ord_no" filter="false"/>]]></dlv_ord_no>
								<buyer_cd><![CDATA[<bean:write name="rowField" property="buyer_cd"/>]]></buyer_cd>
								<buyer_addr1><![CDATA[<bean:write name="rowField" property="buyer_addr1" filter="false"/>]]></buyer_addr1>
								<ref_no><![CDATA[<bean:write name="rowField" property="ref_no" filter="false"/>]]></ref_no>
								<commc_inv_no><![CDATA[<bean:write name="rowField" property="commc_inv_no" filter="false"/>]]></commc_inv_no>
								<mbl_no><![CDATA[<bean:write name="rowField" property="mbl_no" filter="false"/>]]></mbl_no>
								<hbl_no><![CDATA[<bean:write name="rowField" property="hbl_no" filter="false"/>]]></hbl_no>
								<vsl_cd><![CDATA[<bean:write name="rowField" property="vsl_cd"/>]]></vsl_cd>
								<vsl_nm><![CDATA[<bean:write name="rowField" property="vsl_nm" filter="false"/>]]></vsl_nm>
								<voy><![CDATA[<bean:write name="rowField" property="voy" filter="false"/>]]></voy>
								<carrier_cd><![CDATA[<bean:write name="rowField" property="carrier_cd"/>]]></carrier_cd>
								<carrier_nm><![CDATA[<bean:write name="rowField" property="carrier_nm" filter="false"/>]]></carrier_nm>
								<pol><![CDATA[<bean:write name="rowField" property="pol"/>]]></pol>
								<pol_nm><![CDATA[<bean:write name="rowField" property="pol_nm" filter="false"/>]]></pol_nm>
								<pod><![CDATA[<bean:write name="rowField" property="pod"/>]]></pod>
								<pod_nm><![CDATA[<bean:write name="rowField" property="pod_nm" filter="false"/>]]></pod_nm>
								<del><![CDATA[<bean:write name="rowField" property="del"/>]]></del>
								<del_nm><![CDATA[<bean:write name="rowField" property="del_nm" filter="false"/>]]></del_nm>
								<etd><![CDATA[<bean:write name="rowField" property="etd"/>]]></etd>
								<eta><![CDATA[<bean:write name="rowField" property="eta"/>]]></eta>
								<work_sht_yn><![CDATA[<bean:write name="rowField" property="work_sht_yn"/>]]></work_sht_yn>
								<rmk><![CDATA[<bean:write name="rowField" property="rmk" filter="false"/>]]></rmk>
								<wave_no><![CDATA[<bean:write name="rowField" property="wave_no"/>]]></wave_no>
								<smp_wave_flg><![CDATA[<bean:write name="rowField" property="smp_wave_flg"/>]]></smp_wave_flg>
								<owner_nm><![CDATA[<bean:write name="rowField" property="owner_nm" filter="false"/>]]></owner_nm>
								<buyer_nm><![CDATA[<bean:write name="rowField" property="buyer_nm" filter="false"/>]]></buyer_nm>
								<outbound_dt><![CDATA[<bean:write name="rowField" property="outbound_dt"/>]]></outbound_dt>
								<%-- #4562 [Korex] WMS Outbound Delivery Status (v461.14) --%>
								<dlvr_flg><![CDATA[<bean:write name="rowField" property="dlvr_flg"/>]]></dlvr_flg>
								<dlvr_dt><![CDATA[<bean:write name="rowField" property="dlvr_dt"/>]]></dlvr_dt>
							</logic:iterate>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="item">
 					<bean:define id="rowSetSheet2" name="rowSet" property="item"/>
 					
 					<bean:size id="sheet2_size" name="rowSetSheet2"/>
 					
					<SHEET2>
						<DATA TOTAL="<bean:write name="sheet2_size" />">
						<logic:iterate id="rowSheet2" name="rowSetSheet2">
							<tr>
								<TD><bean:write name="rowSheet2" property="row_add"/></TD>
								<TD><bean:write name="rowSheet2" property="row_add_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="row_del"/></TD>
								<TD><bean:write name="rowSheet2" property="item_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="item_nm"/></TD>
								<TD><bean:write name="rowSheet2" property="item_pkgunit"/></TD>
								<TD><bean:write name="rowSheet2" property="item_pkgqty"/></TD>
								<TD><bean:write name="rowSheet2" property="item_ea_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="stock_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="lot_no"/></TD>
								<TD><bean:write name="rowSheet2" property="lot_04"/></TD>
								<TD><bean:write name="rowSheet2" property="lot_05"/></TD>
								<TD><bean:write name="rowSheet2" property="fix_lot_id"/></TD>
								<TD><!-- popup open lodid popup --></TD>
								<TD><bean:write name="rowSheet2" property="inbound_dt"/></TD>
								<TD><bean:write name="rowSheet2" property="exp_dt"/></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv1_unit_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="wh_loc_cd_nm"/></TD>
								<TD><bean:write name="rowSheet2" property="ship_item_ea_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="inr_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="eq_tpsz_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="eq_no"/></TD>
								<TD><bean:write name="rowSheet2" property="seal_no"/></TD>
								<TD><!-- popup open seal no --></TD>
								<TD><bean:write name="rowSheet2" property="item_ser_no"/></TD>
								<TD><bean:write name="rowSheet2" property="lic_plat_no"/></TD>
								<TD><bean:write name="rowSheet2" property="po_no"/></TD>
								<TD><bean:write name="rowSheet2" property="item_cbm"/></TD>
								<TD><bean:write name="rowSheet2" property="item_cbf"/></TD>
								<TD><bean:write name="rowSheet2" property="item_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet2" property="item_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet2" property="item_net_kgs"/></TD>
								<TD><bean:write name="rowSheet2" property="item_net_lbs"/></TD>
								<TD><bean:write name="rowSheet2" property="curr_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="unit_price"/></TD>
								
								<TD><bean:write name="rowSheet2" property="pkg_info"/></TD>
								<TD><bean:write name="rowSheet2" property="fix_loc_nm"/></TD>
								<TD><bean:write name="rowSheet2" property="wave_no"/></TD>
								<TD><bean:write name="rowSheet2" property="sao_no"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet2" property="fix_loc_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="item_sys_no"/></TD>
								<TD><bean:write name="rowSheet2" property="item_seq"/></TD>
								<TD><bean:write name="rowSheet2" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet2" property="ctrt_nm"/></TD>
								<TD><bean:write name="rowSheet2" property="wh_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="wh_nm"/></TD>
								<TD><bean:write name="rowSheet2" property="invalid_yn"/></TD>
								<TD><bean:write name="rowSheet2" property="su_valid_yn"/></TD>
								<TD><bean:write name="rowSheet2" property="wob_bk_no"/></TD>
								<TD><bean:write name="rowSheet2" property="sao_sys_no"/></TD>
								<TD><bean:write name="rowSheet2" property="bk_sts_cd"/></TD>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv1_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv1_unit_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv2_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv2_unit_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv3_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv3_unit_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv4_qty"/></TD>
								<TD><bean:write name="rowSheet2" property="pkg_lv4_unit_cd"/></TD>
								<TD><bean:write name="rowSheet2" property="lv1_cbm"/></TD>
								<TD><bean:write name="rowSheet2" property="lv1_cbf"/></TD>
								<TD><bean:write name="rowSheet2" property="lv1_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet2" property="lv1_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet2" property="lv1_net_kgs"/></TD>
								<TD><bean:write name="rowSheet2" property="lv1_net_lbs"/></TD>
								<TD><bean:write name="rowSheet2" property="smp_wave_flg"/></TD>
								<TD><bean:write name="rowSheet2" property="item_unit_price"/></TD>
								<TD><bean:write name="rowSheet2" property="cbmUnitCd"/></TD>  
								<TD><bean:write name="rowSheet2" property="cbmUnitNm"/></TD>  
								<TD><bean:write name="rowSheet2" property="lot_04_cbm_cd"/></TD>  
								<TD><bean:write name="rowSheet2" property="lot_05_cbm_cd"/></TD>  
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET2>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="doc">
 					<bean:define id="rowSetSheet3" name="rowSet" property="doc"/>
 					
 					<bean:size id="sheet3_size" name="rowSetSheet3"/>
 					
					<SHEET3>
						<DATA TOTAL="<bean:write name="sheet3_size" />">
						<logic:iterate id="rowSheet3" name="rowSetSheet3">
							<tr>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="field_name"/></TD>
								<TD><bean:write name="rowSheet3" property="field_val"/></TD>
								<TD><bean:write name="rowSheet3" property="doc_type"/></TD>
								
								<!-- #3890 [BNX WMS] MOBILE REQUIREMENTS -->
								<TD><bean:write name="rowSheet3" property="rgst_id"/></TD>
								<TD><bean:write name="rowSheet3" property="rgst_loc_dt"/></TD>
								<TD><bean:write name="rowSheet3" property="rgst_sys_dt"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET3>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="file">
 					<bean:define id="rowSetSheet4" name="rowSet" property="file"/>
 					
 					<bean:size id="sheet4_size" name="rowSetSheet4"/>
 					
					<SHEET4>
						<DATA TOTAL="<bean:write name="sheet4_size" />">
						<logic:iterate id="rowSheet4" name="rowSetSheet4">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet4" property="file_org_nm"/></TD>
								<TD><bean:write name="rowSheet4" property="upload_date"/></TD>
								<TD><bean:write name="rowSheet4" property="file_size"/></TD>
								<TD><bean:write name="rowSheet4" property="doc_no"/></TD>
								<TD><bean:write name="rowSheet4" property="file_path"/></TD>
								<TD><bean:write name="rowSheet4" property="file_sys_nm"/></TD>
								<TD><bean:write name="rowSheet4" property="svc_tp_cd"/></TD>
								<TD><bean:write name="rowSheet4" property="doc_ref_tp_cd"/></TD>
								<TD><bean:write name="rowSheet4" property="doc_tp_cd"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET4>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet6">
 					<bean:define id="rowSetSheet6" name="rowSet" property="sheet6"/>
 					
 					<bean:size id="sheet6_size" name="rowSetSheet6"/>
 					
					<SHEET6>
						<DATA TOTAL="<bean:write name="sheet6_size" />">
						<logic:iterate id="rowSheet6" name="rowSetSheet6">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet6" property="rate_tp_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="frt_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="frt_nm"/></TD>
								<TD><bean:write name="rowSheet6" property="unit_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="unit_cd2"/></TD>
								<TD><bean:write name="rowSheet6" property="curr_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="unit_price"/></TD>
								<TD><bean:write name="rowSheet6" property="qty"/></TD>
								<TD><bean:write name="rowSheet6" property="inv_amt"/></TD>
								<TD><bean:write name="rowSheet6" property="item_cd"/></TD>
								<!-- #3388-[BINEX WMS4.0] RATE IN & OUT MINIMUM CHARGE - Vien.Cao -->
								<TD><bean:write name="rowSheet6" property="rmk"/></TD>
								<TD><bean:write name="rowSheet6" property="cls_no"/></TD>
								<TD><bean:write name="rowSheet6" property="cls_dt"/></TD>
								<TD><bean:write name="rowSheet6" property="inv_no"/></TD>
								<TD><bean:write name="rowSheet6" property="wh_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="wob_bk_no"/></TD>
								<TD><bean:write name="rowSheet6" property="cust_ord_no"/></TD>
								<TD><bean:write name="rowSheet6" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet6" property="ofc_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="inv_ttl_amt"/></TD>
								<TD><bean:write name="rowSheet6" property="sell_buy_tp_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="frt_seq"/></TD>
								<TD><bean:write name="rowSheet6" property="cust_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="wib_bk_frt_seq"/></TD>
								<TD><bean:write name="rowSheet6" property="rating_flg"/></TD>
								<TD><bean:write name="rowSheet6" property="sts_cd"/></TD>
								<TD><bean:write name="rowSheet6" property="inv_seq"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET6>
				</logic:notEmpty>
				
				
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
