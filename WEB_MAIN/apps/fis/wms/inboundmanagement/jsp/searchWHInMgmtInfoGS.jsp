<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

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
				
				<logic:notEmpty name="rowSet" property="listCnt">
					<CHECK>
						<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
					</CHECK>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="header">
 					<bean:define id="rowSetField" name="rowSet" property="header"/>
					<FIELD>
						<DATA TOTAL="1">
							<logic:iterate id="rowField" name="rowSetField">
								<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
								<wib_bk_no><![CDATA[<bean:write name="rowField" property="wib_bk_no"/>]]></wib_bk_no>
								<so_no><![CDATA[<bean:write name="rowField" property="so_no"/>]]></so_no>
								<ctrt_no><![CDATA[<bean:write name="rowField" property="ctrt_no"/>]]></ctrt_no>
								<ctrt_nm><![CDATA[<bean:write name="rowField" property="ctrt_nm" filter="false"/>]]></ctrt_nm>
								<%--<eff_fr_dt><![CDATA[<bean:write name="rowField" property="eff_fr_dt"/>]]></eff_fr_dt>
								<eff_to_dt><![CDATA[<bean:write name="rowField" property="eff_to_dt"/>]]></eff_to_dt>
								<ctrt_cust_cd><![CDATA[<bean:write name="rowField" property="ctrt_cust_cd"/>]]></ctrt_cust_cd>
								<ctrt_cust_nm><![CDATA[<bean:write name="rowField" property="ctrt_cust_nm"/>]]></ctrt_cust_nm>
								<sales_ofc_cd><![CDATA[<bean:write name="rowField" property="sales_ofc_cd"/>]]></sales_ofc_cd>
								<sales_ofc_nm><![CDATA[<bean:write name="rowField" property="sales_ofc_nm"/>]]></sales_ofc_nm>
								<sales_pic_id><![CDATA[<bean:write name="rowField" property="sales_pic_id"/>]]></sales_pic_id>
								<sales_pic_nm><![CDATA[<bean:write name="rowField" property="sales_pic_nm"/>]]></sales_pic_nm>--%>
								<rtp_no><![CDATA[<bean:write name="rowField" property="rtp_no"/>]]></rtp_no>
								<wh_cd><![CDATA[<bean:write name="rowField" property="wh_cd"/>]]></wh_cd>
								<wh_nm><![CDATA[<bean:write name="rowField" property="wh_nm" filter="false"/>]]></wh_nm>
								<bk_date><![CDATA[<bean:write name="rowField" property="bk_date"/>]]></bk_date>
								<ord_tp_cd><![CDATA[<bean:write name="rowField" property="ord_tp_cd"/>]]></ord_tp_cd>
								<bk_sts_cd><![CDATA[<bean:write name="rowField" property="bk_sts_cd"/>]]></bk_sts_cd>
								<bk_sts_nm><![CDATA[<bean:write name="rowField" property="bk_sts_nm"/>]]></bk_sts_nm>
								<est_in_dt><![CDATA[<bean:write name="rowField" property="est_in_dt"/>]]></est_in_dt>
								<load_tp_cd><![CDATA[<bean:write name="rowField" property="load_tp_cd"/>]]></load_tp_cd>
								<%--<fwd_dir><![CDATA[<bean:write name="rowField" property="fwd_dir"/>]]></fwd_dir>
								<order_rel><![CDATA[<bean:write name="rowField" property="order_rel"/>]]></order_rel>
								<main_svc_type><![CDATA[<bean:write name="rowField" property="main_svc_type"/>]]></main_svc_type>
								<main_svc_nm><![CDATA[<bean:write name="rowField" property="main_svc_nm"/>]]></main_svc_nm>
								<ctrt_ord_tp_nm><![CDATA[<bean:write name="rowField" property="ctrt_ord_tp_nm"/>]]></ctrt_ord_tp_nm>--%>
								<owner_cd><![CDATA[<bean:write name="rowField" property="owner_cd"/>]]></owner_cd>
								<owner_nm><![CDATA[<bean:write name="rowField" property="owner_nm" filter="false"/>]]></owner_nm>
								<owner_addr1><![CDATA[<bean:write name="rowField" property="owner_addr1" filter="false"/>]]></owner_addr1>
								<owner_addr2><![CDATA[<bean:write name="rowField" property="owner_addr2" filter="false"/>]]></owner_addr2>
								<owner_addr3><![CDATA[<bean:write name="rowField" property="owner_addr3" filter="false"/>]]></owner_addr3>
								<owner_addr4><![CDATA[<bean:write name="rowField" property="owner_addr4" filter="false"/>]]></owner_addr4>
								<owner_addr5><![CDATA[<bean:write name="rowField" property="owner_addr5" filter="false"/>]]></owner_addr5>
								<supp_cd><![CDATA[<bean:write name="rowField" property="supp_cd"/>]]></supp_cd>
								<supp_nm><![CDATA[<bean:write name="rowField" property="supp_nm" filter="false"/>]]></supp_nm>
								<supp_addr1><![CDATA[<bean:write name="rowField" property="supp_addr1" filter="false"/>]]></supp_addr1>
								<supp_addr2><![CDATA[<bean:write name="rowField" property="supp_addr2" filter="false"/>]]></supp_addr2>
								<supp_addr3><![CDATA[<bean:write name="rowField" property="supp_addr3" filter="false"/>]]></supp_addr3>
								<supp_addr4><![CDATA[<bean:write name="rowField" property="supp_addr4" filter="false"/>]]></supp_addr4>
								<supp_addr5><![CDATA[<bean:write name="rowField" property="supp_addr5" filter="false"/>]]></supp_addr5>
								<%--<supp_type><![CDATA[<bean:write name="rowField" property="supp_type"/>]]></supp_type>
								<buyer_cd><![CDATA[<bean:write name="rowField" property="buyer_cd"/>]]></buyer_cd>
								<buyer_nm><![CDATA[<bean:write name="rowField" property="buyer_nm"/>]]></buyer_nm>
								<buyer_addr1><![CDATA[<bean:write name="rowField" property="buyer_addr1"/>]]></buyer_addr1>
								<buyer_addr2><![CDATA[<bean:write name="rowField" property="buyer_addr2"/>]]></buyer_addr2>
								<buyer_addr3><![CDATA[<bean:write name="rowField" property="buyer_addr3"/>]]></buyer_addr3>
								<buyer_addr4><![CDATA[<bean:write name="rowField" property="buyer_addr4"/>]]></buyer_addr4>
								<buyer_addr5><![CDATA[<bean:write name="rowField" property="buyer_addr5"/>]]></buyer_addr5>
								<buyer_type><![CDATA[<bean:write name="rowField" property="buyer_type"/>]]></buyer_type>--%>
								<cust_ord_no><![CDATA[<bean:write name="rowField" property="cust_ord_no"/>]]></cust_ord_no>
								<commc_inv_no><![CDATA[<bean:write name="rowField" property="commc_inv_no"/>]]></commc_inv_no>
								<dlv_ord_no><![CDATA[<bean:write name="rowField" property="dlv_ord_no" filter="false"/>]]></dlv_ord_no>
								<%--<job_no><![CDATA[<bean:write name="rowField" property="job_no"/>]]></job_no>--%>
								<rmk><![CDATA[<bean:write name="rowField" property="rmk" filter="false"/>]]></rmk>
								<vsl_cd><![CDATA[<bean:write name="rowField" property="vsl_cd"/> ]]></vsl_cd>
								<vsl_nm><![CDATA[<bean:write name="rowField" property="vsl_nm" filter="false"/>]]></vsl_nm>
								<voy><![CDATA[<bean:write name="rowField" property="voy"/>]]></voy>
								<hbl_no><![CDATA[<bean:write name="rowField" property="hbl_no"/>]]></hbl_no>
								<mbl_no><![CDATA[<bean:write name="rowField" property="mbl_no"/>]]></mbl_no>
								<carrier_cd><![CDATA[<bean:write name="rowField" property="carrier_cd"/>]]></carrier_cd>
								<carrier_nm><![CDATA[<bean:write name="rowField" property="carrier_nm" filter="false"/>]]></carrier_nm>
								<pol><![CDATA[<bean:write name="rowField" property="pol"/>]]></pol>
								<pol_nm><![CDATA[<bean:write name="rowField" property="pol_nm" filter="false"/>]]></pol_nm>
								<etd><![CDATA[<bean:write name="rowField" property="etd"/>]]></etd>
								<pod><![CDATA[<bean:write name="rowField" property="pod"/>]]></pod>
								<pod_nm><![CDATA[<bean:write name="rowField" property="pod_nm" filter="false"/>]]></pod_nm>
								<eta><![CDATA[<bean:write name="rowField" property="eta"/>]]></eta>
								<del><![CDATA[<bean:write name="rowField" property="del"/>]]></del>
								<inbound_pl_qty><![CDATA[<bean:write name="rowField" property="inbound_pl_qty"/>]]></inbound_pl_qty>
								<inbound_bx_qty><![CDATA[<bean:write name="rowField" property="inbound_bx_qty"/>]]></inbound_bx_qty>
								<inbound_ea_qty><![CDATA[<bean:write name="rowField" property="inbound_ea_qty"/>]]></inbound_ea_qty>
								<inbound_sqft><![CDATA[<bean:write name="rowField" property="inbound_sqft"/>]]></inbound_sqft>
								<inbound_cbm><![CDATA[<bean:write name="rowField" property="inbound_cbm"/>]]></inbound_cbm>
								<inbound_grs_kgs><![CDATA[<bean:write name="rowField" property="inbound_grs_kgs"/>]]></inbound_grs_kgs>
								<inbound_net_kgs><![CDATA[<bean:write name="rowField" property="inbound_net_kgs"/>]]></inbound_net_kgs>
								<eq_tpsz_cd><![CDATA[<bean:write name="rowField" property="eq_tpsz_cd"/>]]></eq_tpsz_cd>
								<eq_no><![CDATA[<bean:write name="rowField" property="eq_no"/>]]></eq_no>
								<eq_tp_cd><![CDATA[<bean:write name="rowField" property="eq_tp_cd"/>]]></eq_tp_cd>
								<seal_no><![CDATA[<bean:write name="rowField" property="seal_no"/>]]></seal_no>
								<inbound_dt><![CDATA[<bean:write name="rowField" property="inbound_dt"/>]]></inbound_dt>
								<est_in_hm><![CDATA[<bean:write name="rowField" property="est_in_hm"/>]]></est_in_hm>
								<inbound_hm><![CDATA[<bean:write name="rowField" property="est_in_hm"/>]]></inbound_hm>
								<unload_sht_yn><![CDATA[<bean:write name="rowField" property="unload_sht_yn"/>]]></unload_sht_yn>
								<trucker_cd><![CDATA[<bean:write name="rowField" property="trucker_cd"/>]]></trucker_cd>
								<trucker_nm><![CDATA[<bean:write name="rowField" property="trucker_nm" filter="false"/>]]></trucker_nm>
								
								<del_nm><![CDATA[<bean:write name="rowField" property="del_nm" filter="false"/>]]></del_nm>
								<%--<del_dt><![CDATA[<bean:write name="rowField" property="del_dt"/>]]></del_dt>
								<est_cmpl_dt><![CDATA[<bean:write name="rowField" property="est_cmpl_dt"/>]]></est_cmpl_dt>
								<src_cd><![CDATA[<bean:write name="rowField" property="src_cd"/>]]></src_cd>
								<in_sts_cd><![CDATA[<bean:write name="rowField" property="in_sts_cd"/>]]></in_sts_cd>
								<unload_sht_cnt><![CDATA[<bean:write name="rowField" property="unload_sht_cnt"/>]]></unload_sht_cnt>
								<src_tp_cd><![CDATA[<bean:write name="rowField" property="src_tp_cd"/>]]></src_tp_cd>--%>
								<ref_no><![CDATA[<bean:write name="rowField" property="ref_no"/>]]></ref_no>
								<%--<ic_cnt><![CDATA[<bean:write name="rowField" property="ic_cnt"/>]]></ic_cnt>--%>
								<%--<user_id><![CDATA[<bean:write name="rowField" property="user_id"/>]]></user_id>
								<wo_no><![CDATA[<bean:write name="rowField" property="wo_no"/>]]></wo_no>
								<org_cd><![CDATA[<bean:write name="rowField" property="org_cd"/>]]></org_cd>--%>
								<putawy_sts_nm><![CDATA[<bean:write name="rowField" property="putawy_sts_nm"/>]]></putawy_sts_nm> <!-- //#1881 [BINEX WMS4.0] PUTAWAY LOCATION COLUMN ADD TO INBOUND LIST -->
							</logic:iterate>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet2">
 					<bean:define id="rowSetSheet2" name="rowSet" property="sheet2"/>
 					
 					<bean:size id="sheet2_size" name="rowSetSheet2"/>
					<SHEET2>
						<DATA TOTAL="<bean:write name="sheet2_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet2">
							<tr>
								<TD></TD>		
								<TD></TD>  
								<TD></TD>         
								<TD><bean:write name="rowSheet" property="item_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="item_nm"/></TD>         
								<TD><bean:write name="rowSheet" property="pkg_info"/></TD>        
								<TD><bean:write name="rowSheet" property="item_pkgunit"/></TD>    
								<TD><bean:write name="rowSheet" property="item_pkgqty"/></TD>     
								<TD><bean:write name="rowSheet" property="item_ea_qty"/></TD>     
								<TD><bean:write name="rowSheet" property="lot_no"/></TD>          
								<TD><bean:write name="rowSheet" property="inbound_dt"/></TD>      
								<TD><bean:write name="rowSheet" property="in_item_ea_qty"/></TD>  
								<TD><bean:write name="rowSheet" property="os_item_ea_qty"/></TD>  
								<TD><bean:write name="rowSheet" property="in_item_pe_qty"/></TD>  
								<TD><bean:write name="rowSheet" property="exp_dt"/></TD>          
								<TD><bean:write name="rowSheet" property="lot_04"/></TD>          
								<TD><bean:write name="rowSheet" property="lot_05"/></TD>          
								<TD><bean:write name="rowSheet" property="rcv_sts_cd"/></TD>          
								<TD></TD>          
								<TD><bean:write name="rowSheet" property="snd_pkgunit"/></TD>     
								<TD><bean:write name="rowSheet" property="rcv_pkgqty"/></TD>      
								<TD><bean:write name="rowSheet" property="snd_ea_qty"/></TD>   
								<TD><bean:write name="rowSheet" property="inbound_loc_nm"/></TD>  
								
								<TD><bean:write name="rowSheet" property="eq_tpsz_cd"/></TD>  
								<TD><bean:write name="rowSheet" property="eq_no"/></TD>  
								<TD><bean:write name="rowSheet" property="seal_no"/></TD>  
								<TD></TD>  
								<TD><bean:write name="rowSheet" property="eq_tp_cd"/></TD>  
								
								<TD><bean:write name="rowSheet" property="dmg_pkgunit"/></TD>     
								<TD><bean:write name="rowSheet" property="dmg_pkgqty"/></TD>      
								<TD><bean:write name="rowSheet" property="dmg_ea_qty"/></TD>        
								<TD><bean:write name="rowSheet" property="dmg_loc_nm"/></TD>      
								<TD><bean:write name="rowSheet" property="item_ser_no"/></TD>      
								<TD><bean:write name="rowSheet" property="lic_plat_no"/></TD>      
								<TD><bean:write name="rowSheet" property="bx_label_qty"/></TD>    
								<TD><bean:write name="rowSheet" property="hbl_no"/></TD>          
								<TD><bean:write name="rowSheet" property="po_no"/></TD>           
								<TD><bean:write name="rowSheet" property="lot_id"/></TD>          
								<TD><bean:write name="rowSheet" property="item_cbm"/></TD>        
								<TD><bean:write name="rowSheet" property="item_cbf"/></TD>        
								<TD><bean:write name="rowSheet" property="item_grs_kgs"/></TD>    
								<TD><bean:write name="rowSheet" property="item_grs_lbs"/></TD>    
								<TD><bean:write name="rowSheet" property="item_net_kgs"/></TD>    
								<TD><bean:write name="rowSheet" property="item_net_lbs"/></TD>    
								<TD><bean:write name="rowSheet" property="curr_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="unit_price"/></TD>      
								<TD><bean:write name="rowSheet" property="ibflag"/></TD>
								<TD><bean:write name="rowSheet" property="inbound_loc_cd"/></TD>  
								<TD><bean:write name="rowSheet" property="dmg_loc_cd"/></TD>   
								<TD><bean:write name="rowSheet" property="item_sys_no"/></TD>   
								<TD><bean:write name="rowSheet" property="item_seq"/></TD>   	
								<TD><bean:write name="rowSheet" property="ctrt_no"/></TD>   	
								<TD><bean:write name="rowSheet" property="ctrt_nm"/></TD>   	
								<TD><bean:write name="rowSheet" property="wh_cd"/></TD>   		
								<TD><bean:write name="rowSheet" property="wh_nm"/></TD>   		
								<TD><bean:write name="rowSheet" property="invalid_yn"/></TD>   
								<TD><bean:write name="rowSheet" property="su_valid_yn"/></TD>   
								<TD><bean:write name="rowSheet" property="org_item_sys_no"/></TD> 
								<TD></TD>   
								<TD><bean:write name="rowSheet" property="wib_bk_no"/></TD>   	
								<TD><bean:write name="rowSheet" property="po_sys_no"/></TD>   	
								<TD><bean:write name="rowSheet" property="wib_in_no"/></TD>   	
								<TD><bean:write name="rowSheet" property="fix_loc_cd"/></TD>   
								<TD><bean:write name="rowSheet" property="fix_loc_cd_nm"/></TD>   
								<TD><bean:write name="rowSheet" property="mbl_no"/></TD>   	
								<TD><bean:write name="rowSheet" property="cntr_ref_no"/></TD>   
								<TD><bean:write name="rowSheet" property="custms_ref_no"/></TD>   
								<TD><bean:write name="rowSheet" property="unload_gate_no"/></TD>  
								<TD><bean:write name="rowSheet" property="bk_sts_cd"/></TD>   	
								<TD><bean:write name="rowSheet" property="pkg_lv1_qty"/></TD>   
								<TD><bean:write name="rowSheet" property="pkg_lv1_unit_cd"/></TD> 
								<TD><bean:write name="rowSheet" property="pkg_lv2_qty"/></TD>   
								<TD><bean:write name="rowSheet" property="pkg_lv2_unit_cd"/></TD> 
								<TD><bean:write name="rowSheet" property="pkg_lv3_qty"/></TD>   
								<TD><bean:write name="rowSheet" property="pkg_lv3_unit_cd"/></TD> 
								<TD><bean:write name="rowSheet" property="pkg_lv4_qty"/></TD>   
								<TD><bean:write name="rowSheet" property="pkg_lv4_unit_cd"/></TD> 
								<TD><bean:write name="rowSheet" property="lv1_cbm"/></TD>   	
								<TD><bean:write name="rowSheet" property="lv1_cbf"/></TD>   	
								<TD><bean:write name="rowSheet" property="lv1_grs_kgs"/></TD>   
								<TD><bean:write name="rowSheet" property="lv1_grs_lbs"/></TD>   
								<TD><bean:write name="rowSheet" property="lv1_net_kgs"/></TD>   
								<TD><bean:write name="rowSheet" property="lv1_net_lbs"/></TD>   
								<TD><bean:write name="rowSheet" property="label_unit"/></TD>   
								<TD><bean:write name="rowSheet" property="bx_label_qty_org"/></TD> 
								<TD><bean:write name="rowSheet" property="item_unit_price"/></TD> 
								<TD><bean:write name="rowSheet" property="snd_item_cbm"/></TD>      
								<TD><bean:write name="rowSheet" property="snd_item_cbf"/></TD>      
								<TD><bean:write name="rowSheet" property="snd_item_grs_kgs"/></TD>  
								<TD><bean:write name="rowSheet" property="snd_item_grs_lbs"/></TD>  
								<TD><bean:write name="rowSheet" property="snd_item_net_kgs"/></TD>  
								<TD><bean:write name="rowSheet" property="snd_item_net_lbs"/></TD>  
								<TD><bean:write name="rowSheet" property="dmg_item_cbm"/></TD>      
								<TD><bean:write name="rowSheet" property="dmg_item_cbf"/></TD>      
								<TD><bean:write name="rowSheet" property="dmg_item_grs_kgs"/></TD>  
								<TD><bean:write name="rowSheet" property="dmg_item_grs_lbs"/></TD>  
								<TD><bean:write name="rowSheet" property="dmg_item_net_kgs"/></TD>  
								<TD><bean:write name="rowSheet" property="dmg_item_net_lbs"/></TD>  
								<TD><bean:write name="rowSheet" property="cbmUnitCd"/></TD>  
								<TD><bean:write name="rowSheet" property="cbmUnitNm"/></TD>  
								<TD><bean:write name="rowSheet" property="lot_04_cbm_cd"/></TD>  
								<TD><bean:write name="rowSheet" property="lot_05_cbm_cd"/></TD>  
								<!-- #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (S) -->
								<TD><bean:write name="rowSheet" property="use_serial_flag"/></TD>
								<TD><bean:write name="rowSheet" property="serial_req_flag"/></TD>
								<TD><bean:write name="rowSheet" property="serial_uniq_flag"/></TD>
								<!-- #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) (E) -->
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET2>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet3">
 					<bean:define id="rowSetSheet3" name="rowSet" property="sheet3"/>
 					
 					<bean:size id="sheet3_size" name="rowSetSheet3"/>
					<SHEET3>
						<DATA TOTAL="<bean:write name="sheet3_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet3">
							<tr>
								<TD></TD>
								<TD><bean:write name="rowSheet" property="field_name"/></TD>
								<TD><bean:write name="rowSheet" property="field_val"/></TD>
								<TD><bean:write name="rowSheet" property="doc_type"/></TD>
								
								<!-- #3890 [BNX WMS] MOBILE REQUIREMENTS -->
								<TD><bean:write name="rowSheet" property="rgst_id"/></TD>
								<TD><bean:write name="rowSheet" property="rgst_loc_dt"/></TD>
								<TD><bean:write name="rowSheet" property="rgst_sys_dt"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET3>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="booking">
 					<bean:define id="rowSetSheet3" name="rowSet" property="booking"/>
 					
 					<bean:size id="sheet3_size" name="rowSetSheet3"/>
 					
					<SHEET3>
						<DATA TOTAL="<bean:write name="sheet3_size" />">
						<logic:iterate id="rowSheet3" name="rowSetSheet3">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="item_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="item_nm"/></TD>
								<TD><bean:write name="rowSheet3" property="lot_no"/></TD>
								<TD><bean:write name="rowSheet3" property="item_pkgunit"/></TD>
								<TD><bean:write name="rowSheet3" property="item_pkgqty"/></TD>
								<TD><bean:write name="rowSheet3" property="pkg_info"/></TD>
								<TD><bean:write name="rowSheet3" property="item_ea_qty"/></TD>
								<TD><bean:write name="rowSheet3" property="item_cbm"/></TD>
								<TD><bean:write name="rowSheet3" property="item_cbf"/></TD>
								<TD><bean:write name="rowSheet3" property="item_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet3" property="item_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet3" property="item_net_kgs"/></TD>
								<TD><bean:write name="rowSheet3" property="item_net_lbs"/></TD>
								<TD><bean:write name="rowSheet3" property="po_no"/></TD>
								<TD><bean:write name="rowSheet3" property="eq_tpsz_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="eq_no"/></TD>
								<TD><bean:write name="rowSheet3" property="seal_no"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="inbound_dt"/></TD>
								<TD><bean:write name="rowSheet3" property="exp_dt"/></TD>
								<TD><bean:write name="rowSheet3" property="lot_04"/></TD>
								<TD><bean:write name="rowSheet3" property="lot_05"/></TD>
								<TD><bean:write name="rowSheet3" property="fix_lot_id"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="cntr_ref_no"/></TD>
								<TD><bean:write name="rowSheet3" property="hbl_no"/></TD>
								<TD><bean:write name="rowSheet3" property="mbl_no"/></TD>
								<TD><bean:write name="rowSheet3" property="pol"/></TD>
								<TD><bean:write name="rowSheet3" property="etd"/></TD>
								<TD><bean:write name="rowSheet3" property="pod"/></TD>
								<TD><bean:write name="rowSheet3" property="eta"/></TD>
								<TD><bean:write name="rowSheet3" property="del"/></TD>
								<TD><bean:write name="rowSheet3" property="carrier_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="carrier_nm"/></TD>
								<TD><bean:write name="rowSheet3" property="vsl_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="vsl_nm"/></TD>
								<TD><bean:write name="rowSheet3" property="voy"/></TD>
								<TD><bean:write name="rowSheet3" property="curr_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="unit_price"/></TD>
								<TD><bean:write name="rowSheet3" property="po_sys_no"/></TD>
								<TD><bean:write name="rowSheet3" property="item_sys_no"/></TD>
								<TD></TD>
								<TD></TD>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="item_seq"/></TD>
								<TD><bean:write name="rowSheet3" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet3" property="eq_tp_cd"/></TD>
								<TD><bean:write name="rowSheet3" property="pkg_lv1_qty"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="pkg_lv2_qty"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="pkg_lv3_qty"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="pkg_lv4_qty"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet3" property="lv1_cbm"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_cbf"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_net_kgs"/></TD>
								<TD><bean:write name="rowSheet3" property="lv1_net_lbs"/></TD>
								<TD><bean:write name="rowSheet3" property="invalid_yn"/></TD>
								<TD><bean:write name="rowSheet3" property="su_valid_yn"/></TD>
								<TD><bean:write name="rowSheet3" property="org_item_sys_no"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET3>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet4">
 					<bean:define id="rowSetSheet4" name="rowSet" property="sheet4"/>
 					
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
								<TD><bean:write name="rowSheet6" property="wib_bk_no"/></TD>
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
