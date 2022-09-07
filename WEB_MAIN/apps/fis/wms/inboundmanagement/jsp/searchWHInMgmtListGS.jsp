<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
 
=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : DOU
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
				
				<logic:notEmpty name="rowSet" property="sheet1">
 					<bean:define id="rowSetSheet1" name="rowSet" property="sheet1"/>
 					
 					<bean:size id="sheet1_size" name="rowSetSheet1"/>
 					
					<SHEET1>
						<DATA TOTAL="<bean:write name="sheet1_size" />">
						<logic:iterate id="rowSheet1" name="rowSetSheet1">
							<tr>
								<TD></TD>         		
								<TD></TD>        	
								<TD></TD>        	
								<TD></TD>    		
								<TD><![CDATA[<bean:write name="rowSheet1" property="wh_cd"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="cust_ord_no"/>]]></TD>    	
								<TD><![CDATA[<bean:write name="rowSheet1" property="ord_tp_cd"/>]]></TD>        
								<TD><![CDATA[<bean:write name="rowSheet1" property="est_in_dt"/>]]></TD>        
								<TD><![CDATA[<bean:write name="rowSheet1" property="bk_sts_cd"/>]]></TD>  
								<TD><![CDATA[<bean:write name="rowSheet1" property="bk_sts_cd"/>]]></TD>        
								<TD><![CDATA[<bean:write name="rowSheet1" property="ctrt_no"/>]]></TD>         
								<TD><![CDATA[<bean:write name="rowSheet1" property="ctrt_nm"/>]]></TD>         
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_dt"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_hm"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_pl_qty"/>]]></TD>   
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_bx_qty"/>]]></TD>   
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_ea_qty"/>]]></TD>   
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_sqft"/>]]></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_cbm"/>]]></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_grs_kgs"/>]]></TD>  
								<TD><![CDATA[<bean:write name="rowSheet1" property="inbound_net_kgs"/>]]></TD>  
								<TD><![CDATA[<bean:write name="rowSheet1" property="eq_tpsz_cd"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="eq_no"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="seal_no"/>]]></TD>         
								<TD><![CDATA[<bean:write name="rowSheet1" property="dlv_ord_no" filter="true"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="load_tp_cd"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="trade_tp_cd"/>]]></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="fwd_tp_cd"/>]]></TD>        
								<TD><![CDATA[<bean:write name="rowSheet1" property="mbl_no"/>]]></TD>         	
								<TD><![CDATA[<bean:write name="rowSheet1" property="hbl_no"/>]]></TD>         	
								<TD><![CDATA[<bean:write name="rowSheet1" property="wib_bk_no"/>]]></TD>        
								<TD><![CDATA[<bean:write name="rowSheet1" property="bk_date"/>]]></TD>         
								<TD><![CDATA[<bean:write name="rowSheet1" property="ref_no"/>]]></TD>         	
								<TD><![CDATA[<bean:write name="rowSheet1" property="commc_inv_no"/>]]></TD>     
								<TD><![CDATA[<bean:write name="rowSheet1" property="rmk"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="owner_cd"/>]]></TD>         
								<TD><![CDATA[<bean:write name="rowSheet1" property="owner_addr1"/>]]></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="owner_addr2"/>]]></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="supp_cd"/>]]></TD>         
								<TD><![CDATA[<bean:write name="rowSheet1" property="supp_addr1"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="vsl_cd"/>]]></TD>         	
								<TD><![CDATA[<bean:write name="rowSheet1" property="vsl_nm" filter="false"/>]]></TD>         	
								<TD><![CDATA[<bean:write name="rowSheet1" property="voy"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="carrier_cd"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="carrier_nm"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="pol"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="pol_nm"/>]]></TD>         	
								<TD><![CDATA[<bean:write name="rowSheet1" property="pod"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="pod_nm"/>]]></TD>         	
								<TD><![CDATA[<bean:write name="rowSheet1" property="del"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="del_nm"/>]]></TD>         	
								<TD><![CDATA[<bean:write name="rowSheet1" property="etd"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="eta"/>]]></TD>         		
								<TD><![CDATA[<bean:write name="rowSheet1" property="ibflag"/>]]></TD>
								<TD><![CDATA[<bean:write name="rowSheet1" property="unload_sht_yn"/>]]></TD>    
								<TD><![CDATA[<bean:write name="rowSheet1" property="rtp_no"/>]]></TD>           
								<TD><![CDATA[<bean:write name="rowSheet1" property="eq_tp_cd"/>]]></TD>         
								<TD><![CDATA[<bean:write name="rowSheet1" property="owner_addr3"/>]]></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="owner_addr4"/>]]></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="owner_addr5"/>]]></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="supp_addr2"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="supp_addr3"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="supp_addr4"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="supp_addr5"/>]]></TD>       
								<TD></TD>        
								<TD></TD>      
								<TD><![CDATA[<bean:write name="rowSheet1" property="wh_nm"/>]]></TD>           
								<TD><![CDATA[<bean:write name="rowSheet1" property="label_unit"/>]]></TD>       
								<TD><![CDATA[<bean:write name="rowSheet1" property="sum_bx_label_qty"/>]]></TD> 
								<TD><![CDATA[<bean:write name="rowSheet1" property="rcv_cnt"/>]]></TD> 

				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET1>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet6">
 					<bean:define id="rowSetSheet6" name="rowSet" property="sheet6"/>
 					
 					<bean:size id="sheet6_size" name="rowSetSheet6"/>
					<SHEET6>
						<DATA TOTAL="<bean:write name="sheet6_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet6">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet" property="rate_tp_cd"/></TD>
								<TD><bean:write name="rowSheet" property="frt_cd"/></TD>
								<TD><bean:write name="rowSheet" property="frt_nm"/></TD>
								<TD><bean:write name="rowSheet" property="unit_cd"/></TD>
								<TD><bean:write name="rowSheet" property="unit_cd2"/></TD>
								<TD><bean:write name="rowSheet" property="curr_cd"/></TD>
								<TD><bean:write name="rowSheet" property="unit_price"/></TD>
								<TD><bean:write name="rowSheet" property="qty"/></TD>
								<TD><bean:write name="rowSheet" property="inv_amt"/></TD>
								<TD><bean:write name="rowSheet" property="item_cd"/></TD>
								<!-- #3388-[BINEX WMS4.0] RATE IN & OUT MINIMUM CHARGE - Vien.Cao -->
								<TD><bean:write name="rowSheet" property="rmk"/></TD>	
								<TD><bean:write name="rowSheet" property="cls_no"/></TD>
								<TD><bean:write name="rowSheet" property="cls_dt"/></TD>
								<TD><bean:write name="rowSheet" property="inv_no"/></TD>
								<TD><bean:write name="rowSheet" property="wh_cd"/></TD>
								<TD><bean:write name="rowSheet" property="wib_bk_no"/></TD>
								<TD><bean:write name="rowSheet" property="cust_ord_no"/></TD>
								<TD><bean:write name="rowSheet" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet" property="ofc_cd"/></TD>
								<TD><bean:write name="rowSheet" property="inv_ttl_amt"/></TD>
								<TD><bean:write name="rowSheet" property="sell_buy_tp_cd"/></TD>
								<TD><bean:write name="rowSheet" property="frt_seq"/></TD>
								<TD><bean:write name="rowSheet" property="cust_cd"/></TD>
								<TD><bean:write name="rowSheet" property="wib_bk_frt_seq"/></TD>
								<TD><bean:write name="rowSheet" property="rating_flg"/></TD>
								<TD><bean:write name="rowSheet" property="sts_cd"/></TD>
								<TD><bean:write name="rowSheet" property="inv_seq"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET6>
				</logic:notEmpty>
				<!-- #2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차 -->
				<logic:notEmpty name="rowSet" property="sheet7">
 					<bean:define id="rowSetSheet7" name="rowSet" property="sheet7"/>
 					
 					<bean:size id="sheet7_size" name="rowSetSheet7"/>
					<SHEET7>
						<DATA TOTAL="<bean:write name="sheet7_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet7">
							<tr>
								<TD></TD>  <!-- row_add -->		
								<TD></TD>  <!-- row_add_qty -->  
								<TD></TD>  <!-- row_del -->         
								<TD><bean:write name="rowSheet" property="item_cd"/></TD>  <!-- item_cd -->         
								<TD><bean:write name="rowSheet" property="item_nm"/></TD>  <!-- item_nm -->         
								<TD><bean:write name="rowSheet" property="pkg_info"/></TD>  <!-- pkg_info -->        
								<TD><bean:write name="rowSheet" property="item_pkgunit"/></TD>  <!-- item_pkgunit -->    
								<TD><bean:write name="rowSheet" property="item_pkgqty"/></TD>  <!-- item_pkgqty -->     
								<TD></TD>  <!-- item_ea_qty -->   
								<TD><bean:write name="rowSheet" property="lot_no"/></TD>  <!-- item_pkgqty -->          
								<TD><bean:write name="rowSheet" property="inbound_dt"/></TD>  <!-- inbound_dt -->      
								<TD></TD>  <!-- in_item_ea_qty -->   
								<TD></TD>  <!-- os_item_ea_qty -->   
								<TD></TD>  <!-- in_item_pe_qty -->   
								<TD><bean:write name="rowSheet" property="exp_dt"/></TD>  <!-- exp_dt -->
								<TD><bean:write name="rowSheet" property="lot_04"/></TD>  <!-- lot_04 -->
								<TD><bean:write name="rowSheet" property="lot_05"/></TD>  <!-- lot_05 -->   
								<TD><bean:write name="rowSheet" property="rcv_sts_cd"/></TD>  <!-- rcv_sts_cd -->   
								<TD></TD>  <!-- chk_rcv_qty_copy -->   
								<TD></TD>  <!-- snd_pkgunit -->   
								<TD><bean:write name="rowSheet" property="item_rcv_pkgqty"/></TD>  <!-- rcv_pkgqty -->
								<TD></TD>  <!-- snd_ea_qty -->
								<TD><bean:write name="rowSheet" property="inbound_loc_nm"/></TD>  <!-- inbound_loc_nm -->  
								<TD><bean:write name="rowSheet" property="eq_tpsz_cd"/></TD>  <!-- eq_tpsz_cd -->
								<TD><bean:write name="rowSheet" property="eq_no"/></TD>  <!-- eq_no -->
								<TD><bean:write name="rowSheet" property="seal_no"/></TD>  <!-- seal_no -->
								<TD></TD>  <!-- seal_img -->
								<TD><bean:write name="rowSheet" property="eq_tp_cd"/></TD>  <!-- eq_tp_cd -->
								<TD></TD>  <!-- dmg_pkgunit -->
								<TD></TD>  <!-- dmg_pkgqty -->
								<TD></TD>  <!-- dmg_ea_qty -->
								<TD></TD>  <!-- dmg_loc_nm -->
								<TD><bean:write name="rowSheet" property="item_ser_no"/></TD>  <!-- item_ser_no -->
								<TD><bean:write name="rowSheet" property="lic_plat_no"/></TD>  <!-- lic_plat_no -->
								<TD></TD>  <!-- bx_label_qty -->
								<TD></TD>  <!-- hbl_no -->
								<TD><bean:write name="rowSheet" property="po_no"/></TD>  <!-- po_no -->
								<TD></TD>  <!-- lot_id -->
								<TD></TD>  <!-- item_cbm -->        
								<TD></TD>  <!-- item_cbf -->        
								<TD></TD>  <!-- item_grs_kgs -->    
								<TD></TD>  <!-- item_grs_lbs -->    
								<TD></TD>  <!-- item_net_kgs -->
								<TD></TD>  <!-- item_net_lbs -->
								<TD><bean:write name="rowSheet" property="curr_cd"/></TD>  <!-- curr_cd -->
								<TD><bean:write name="rowSheet" property="unit_price"/></TD>  <!-- unit_price -->
								<TD>I</TD>  <!-- ibflag -->
								<TD><bean:write name="rowSheet" property="def_loc_cd"/></TD>  <!-- inbound_loc_cd -->
								<TD></TD>  <!-- dmg_loc_cd -->
								<TD><bean:write name="rowSheet" property="item_sys_no"/></TD>  <!-- item_sys_no -->
	 							<TD></TD>  <!-- item_seq -->
								<TD><bean:write name="rowSheet" property="ctrt_no"/></TD>  <!-- ctrt_no -->   	
								<TD></TD>  <!-- ctrt_nm -->	
								<TD><bean:write name="rowSheet" property="wh_cd"/></TD>  <!-- wh_cd -->   		
								<TD></TD>  <!-- wh_nm -->
								<TD></TD>  <!-- invalid_yn -->
								<TD></TD>  <!-- su_valid_yn -->
								<TD></TD>  <!-- org_item_sys_no -->
								<TD></TD>  <!-- item_cd_dummy -->
								<TD></TD>  <!-- wib_bk_no -->
								<TD></TD>  <!-- po_sys_no -->
								<TD></TD>  <!-- wib_in_no -->
								<TD><bean:write name="rowSheet" property="fix_loc_cd"/></TD>  <!-- fix_loc_cd -->   
								<TD><bean:write name="rowSheet" property="fix_loc_nm"/></TD>  <!-- fix_loc_cd_nm -->
								<TD></TD>  <!-- mbl_no -->
								<TD></TD>  <!-- cntr_ref_no -->
								<TD></TD>  <!-- custms_ref_no -->
								<TD></TD>  <!-- unload_gate_no -->
								<TD></TD>  <!-- bk_sts_cd -->
								<TD><bean:write name="rowSheet" property="pkg_lv1_qty"/></TD>  <!-- pkg_lv1_qty -->   
								<TD><bean:write name="rowSheet" property="pkg_lv1_unit_cd"/></TD>  <!-- pkg_lv1_unit_cd --> 
								<TD><bean:write name="rowSheet" property="pkg_lv2_qty"/></TD>  <!-- pkg_lv2_qty -->   
								<TD><bean:write name="rowSheet" property="pkg_lv2_unit_cd"/></TD>  <!-- pkg_lv2_unit_cd --> 
								<TD><bean:write name="rowSheet" property="pkg_lv3_qty"/></TD>  <!-- pkg_lv3_qty -->   
								<TD><bean:write name="rowSheet" property="pkg_lv3_unit_cd"/></TD>  <!-- pkg_lv3_unit_cd --> 
								<TD></TD>  <!-- pkg_lv4_qty -->
								<TD></TD>  <!-- pkg_lv4_unit_cd -->
								<TD><bean:write name="rowSheet" property="lv1_cbm"/></TD>  <!-- lv1_cbm -->   	
								<TD><bean:write name="rowSheet" property="lv1_cbf"/></TD>  <!-- lv1_cbf -->   	
								<TD><bean:write name="rowSheet" property="lv1_grs_kgs"/></TD>  <!-- lv1_grs_kgs -->   
								<TD><bean:write name="rowSheet" property="lv1_grs_lbs"/></TD>  <!-- lv1_grs_lbs -->   
								<TD><bean:write name="rowSheet" property="lv1_net_kgs"/></TD>  <!-- lv1_net_kgs -->   
								<TD><bean:write name="rowSheet" property="lv1_net_lbs"/></TD>  <!-- lv1_net_lbs -->  
								<TD></TD>  <!-- label_unit -->
								<TD></TD>  <!-- bx_label_qty_org -->
								<TD><bean:write name="rowSheet" property="unit_curr_cd"/></TD>  <!-- item_unit_price -->
								<TD></TD>  <!-- snd_item_cbm -->
								<TD></TD>  <!-- snd_item_cbf -->
								<TD></TD>  <!-- snd_item_grs_kgs -->
								<TD></TD>  <!-- snd_item_grs_lbs -->
								<TD></TD>  <!-- snd_item_net_kgs -->
								<TD></TD>  <!-- snd_item_net_lbs -->
								<TD></TD>  <!-- dmg_item_cbm -->
								<TD></TD>  <!-- dmg_item_cbf -->
								<TD></TD>  <!-- dmg_item_grs_kgs -->
								<TD></TD>  <!-- dmg_item_grs_lbs -->
								<TD></TD>  <!-- dmg_item_net_kgs -->
								<TD></TD>  <!-- dmg_item_net_lbs -->
								<TD><bean:write name="rowSheet" property="sku_unit_cd"/>  <!-- cbmUnitCd -->
								<TD><bean:write name="rowSheet" property="sku_unit_nm"/>  <!-- cbmUnitNm -->
								<TD><bean:write name="rowSheet" property="item_lot4"/></TD>     <!-- lot_04_cbm_cd -->
								<TD><bean:write name="rowSheet" property="item_lot5"/></TD>     <!-- lot_05_cbm_cd -->
								<!-- #2333 [WMS4.0] MOBILE VALIDATION OF SERIAL # (NO DUPLICATE) -->
								<TD><bean:write name="rowSheet" property="use_serial_flag"/></TD>     <!-- use_serial_flag -->
								<TD><bean:write name="rowSheet" property="serial_req_flag"/></TD>     <!-- serial_req_flag -->
								<TD><bean:write name="rowSheet" property="serial_uniq_flag"/></TD>    <!-- serial_uniq_flag -->
								
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET7>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet7_backup">
 					<bean:define id="rowSetSheet7_backup" name="rowSet" property="sheet7_backup"/>
 					
 					<bean:size id="sheet7_backup_size_" name="rowSetSheet7_backup"/>
					<SHEET7>
						<DATA TOTAL="<bean:write name="sheet7_backup_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet7_backup">
							<tr>
								<TD><bean:write name="rowSheet" property="xls_no"/></TD>         
								<TD><bean:write name="rowSheet" property="wh_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="ctrt_no"/></TD>         
								<TD><bean:write name="rowSheet" property="cust_ord_no"/></TD>         
								<TD><bean:write name="rowSheet" property="ord_tp_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="est_in_dt"/></TD>         
								<TD><bean:write name="rowSheet" property="inbound_pl_qty"/></TD>         
								<TD><bean:write name="rowSheet" property="inbound_bx_qty"/></TD>         
								<TD><bean:write name="rowSheet" property="inbound_ea_qty"/></TD>         
								<TD><bean:write name="rowSheet" property="inbound_sqft"/></TD>         
								<TD><bean:write name="rowSheet" property="inbound_cbm"/></TD>         
								<TD><bean:write name="rowSheet" property="trade_tp_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="fwd_tp_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="item_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="lot_no"/></TD>         
								<TD><bean:write name="rowSheet" property="item_pkgunit"/></TD>         
								<TD><bean:write name="rowSheet" property="item_pkgqty"/></TD>         
								<TD><bean:write name="rowSheet" property="item_rcv_pkgqty"/></TD>         
								<TD><bean:write name="rowSheet" property="inbound_loc_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="inbound_loc_nm"/></TD>         
								<TD><bean:write name="rowSheet" property="inbound_dt"/></TD>         
								<TD><bean:write name="rowSheet" property="eq_tpsz_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="eq_no"/></TD>         
								<TD><bean:write name="rowSheet" property="seal_no"/></TD>         
								<TD><bean:write name="rowSheet" property="curr_cd"/></TD>         
								<TD><bean:write name="rowSheet" property="unit_price"/></TD>         
								<TD><bean:write name="rowSheet" property="lot_04"/></TD>         
								<TD><bean:write name="rowSheet" property="lot_05"/></TD>         
								<TD><bean:write name="rowSheet" property="exp_dt"/></TD>         
								<TD><bean:write name="rowSheet" property="po_no"/></TD>         
								<TD><bean:write name="rowSheet" property="lic_plat_no"/></TD>         
								<TD><bean:write name="rowSheet" property="item_ser_no"/></TD>         
								<TD><bean:write name="rowSheet" property="if_rslt"/></TD>   
								<!-- #2446 [LOA WMS4.0] CANNOT UPLOAD INBOUND BY EXCEL UPLOAD 3차 -->
								<TD><bean:write name="rowSheet" property="pkg_lv1_unit_cd"/></TD>
								<TD><bean:write name="rowSheet" property="pkg_lv1_qty"/></TD>     
								<TD><bean:write name="rowSheet" property="pkg_lv1_unit_nm"/></TD>   
								<TD><bean:write name="rowSheet" property="pkg_lv2_unit_cd"/></TD>
								<TD><bean:write name="rowSheet" property="pkg_lv2_qty"/></TD>     
								<TD><bean:write name="rowSheet" property="pkg_lv2_unit_nm"/></TD>   
								<TD><bean:write name="rowSheet" property="pkg_lv3_unit_cd"/></TD>
								<TD><bean:write name="rowSheet" property="pkg_lv3_qty"/></TD>     
								<TD><bean:write name="rowSheet" property="pkg_lv3_unit_nm"/></TD>
								<TD><bean:write name="rowSheet" property="lv1_cbm"/></TD>
								<TD><bean:write name="rowSheet" property="lv1_cbf"/></TD>
								<TD><bean:write name="rowSheet" property="lv1_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet" property="lv1_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet" property="lv1_net_kgs"/></TD>
								<TD><bean:write name="rowSheet" property="lv1_net_lbs"/></TD>   
								<TD><bean:write name="rowSheet" property="sku_unit_cd"/></TD>   
								<TD><bean:write name="rowSheet" property="sku_unit_nm"/></TD>
								<TD><bean:write name="rowSheet" property="item_sys_no"/></TD>      
								<TD><bean:write name="rowSheet" property="item_lot4"/></TD>
								<TD><bean:write name="rowSheet" property="item_lot5"/></TD>
								<TD><bean:write name="rowSheet" property="pkg_info"/></TD>
								<TD><bean:write name="rowSheet" property="unit_curr_cd"/></TD>
								<TD><bean:write name="rowSheet" property="fix_loc_cd"/></TD>
								<TD><bean:write name="rowSheet" property="fix_loc_nm"/></TD>
								<TD><bean:write name="rowSheet" property="def_loc_cd"/></TD>
								<TD><bean:write name="rowSheet" property="def_loc_nm"/></TD>
								<TD><bean:write name="rowSheet" property="item_nm"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET7>
				</logic:notEmpty>
		</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
