////SUPPORT (SUP) COMMON IBSHEET GRID TITLE
//OTHER OPERATION, WAREHOUSE RECEIPT
MSG_KEY["OTH_OPR_0010_HDR1"]    = "ref_no|type|mbl_no|hbl_no|customer|post_dt|oth_seq|ibflag";
MSG_KEY["OTH_OPR_0010_HDR2"]    = "DEL|Container No.|Size|Seal No.|Pkgs|cntr_seq|oth_seq|ref_no|ibflag";
MSG_KEY["OTH_OPR_0010_HDR3"]    = "doc_ibflag|DEL|CHK|palt_doc_seq|Doc. Type|File Name|Reference No.|File|PDF|Remark|Message|Creation DT|intg_bl_seq";

MSG_KEY["OTH_OPR_0020_HDR1"]    = "DEL|No.|Block|Other Filing No.|Post Date|Office|MB/L No.|HB/L No.|Vessel/Flight|cust_cd|Customer|Shipper|Consignee|Customer Ref. No.|AR|AP|DC|Issued by|oth_seq|ibflag";

MSG_KEY["OTH_WHR_0010_HDR1_1"]  = "ibflag|DEL|wh_recp_no|Item Seq|Length|Width|Height|PCS|Unit|DIM Weight|DIM Weight|CBM|Actual WT(KG)|Actual WT(LBS)|Shipped|Date|B/L No.";
MSG_KEY["OTH_WHR_0010_HDR1_2"]  = "ibflag|DEL|wh_recp_no|Item Seq|Length|Width|Height|PCS|Unit|KGS|LBS|CBM|Actual WT(KG)|Actual WT(LBS)|Shipped|Date|B/L No.";
MSG_KEY["OTH_WHR_0020_HDR1"]    = "ibflag|CHK|Receipt No.|W/H Location|Office|Received|Status|Truck B/L No.|P/O No.|B/L No.|Maker|Shipper|Consignee|Issued by";
MSG_KEY["OTH_WHR_0010_HDR1"]    = "WH_RECP_NO|ibflag2";
MSG_KEY["WHR_POP_0010_HDR1"]    = "W/H Receipt No.|W/H Location|Received Date|Maker|Shipper|Consignee|PO No.|PCS|Weight|Weight|CBM";
MSG_KEY["WHR_POP_0010_HDR2"]    = "W/H Receipt No.|W/H Location|Received Date|Maker|Shipper|Consignee|PO No.|PCS|KGS|LBS|CBM";

MSG_KEY["OTH_VSI_0010_HDR1"]    = "ibflag|CHK.|Documents|dcmt_cd";
MSG_KEY["OTH_VSI_0020_HDR1"]    = "To|Freight To|Po No.|Send Date|Estimate Shipping Date|Status|From" ;

//EXCHANGE RATE, FINANCE EXCHANGE RATE
MSG_KEY["MGT_CUR_0010_HDR_1"]   = "DEL|No.|ibflag|Apply\nScope|Customer|Customer|From|From|To|To|Exchange\nRate|Day/Month\nType|Apply Date|Apply Date|Issued by|finc_xcrt_seq|Indexing" ;
MSG_KEY["MGT_CUR_0010_HDR_2"]   = "DEL|No.|ibflag|Apply\nScope|Code|Name|Currency|Rate Unit|Currency|Rate Unit|Exchange\nRate|Day/Month\nType|From|To|Issued by|finc_xcrt_seq|Indexing" ;
MSG_KEY["MGT_CUR_0020_HDR_1"]   = "DEL|No.|ibflag|From|From|To|To|Exchange\nRate|Day/Month\nType|Apply Date|Apply Date|Issued by|finc_xcrt_seq|Indexing";
MSG_KEY["MGT_CUR_0020_HDR_2"]   = "DEL|No.|ibflag|Currency|Rate Unit|Currency|Rate Unit|Exchange\nRate|Day/Month\nType|From|To|Issued by|finc_xcrt_seq|Indexing";

//BANK SETUP
MSG_KEY["MDM_MCM_0320_HDR_1"]    = "ibflag|bank_seq|Bank Name|G/L No.|Check Form|Initial Amount|Currency|Current No.|End No.|Revenue\nDefault|Cost\nDefault|Inactive Date|Use Y/N|Excel Column Order|Excel Column Order|Excel Column Order";
MSG_KEY["MDM_MCM_0320_HDR_2"]    = "ibflag|bank_seq|Bank Name|G/L No.|Check Form|Initial Amount|Currency|Current No.|End No.|Revenue\nDefault|Cost\nDefault|Inactive Date|Use Y/N|Clear Date|Check No.|Amount";

//VESSEL SCHEDULE
MSG_KEY["SEC_BMD_0010_HDR_1"]   = "DEL|ibflag|No.|Carrier|Carrier|Port|Port|Port|Vessel|Vessel|Voyage|ETD|ETA|Remark|Created by|Creation dt|Modified by|Modified dt|Office|liner_Code|Indexing";
MSG_KEY["SEC_BMD_0010_HDR_2"]   = "DEL|ibflag|No.|Code|Name|Code|Node_Code|Name|Code|Name|Voyage|ETD|ETA|Remark|Created by|Creation dt|Modified by|Modified dt|Office|liner_Code|Indexing";

//AIRLINE SCHEDULE
MSG_KEY["AIC_BMD_0010_HDR_1"]   = "DEL|STS|No.|Carrier|Carrier|Flight|Depature|Destination|Weekly SKD|Weekly SKD|Weekly SKD|Weekly SKD|Weekly SKD|Weekly SKD|Weekly SKD|ETD|ETA|Day|TS1|TS1|TS1|TS1|TS1|TS2|TS2|TS2|TS2|TS2|Remark|AIR_SKD_SEQ|PRD_DT|TRDP_CD1|TRDP_CD2";
MSG_KEY["AIC_BMD_0010_HDR_2"]   = "DEL|STS|No.|Code|Name|Flight|Depature|Destination|MO|TU|WE|TH|FR|SA|SU|ETD|ETA|Day|Port|Days|Time|Carrier|FLT|Port|Days|Time|Carrier|FLT|Remark|AIR_SKD_SEQ|PRD_DT|TRDP_CD1|TRDP_CD2";

//WORKFLOW
MSG_KEY["MGT_JOB_0010_HDR"]     = " |ibflag|jb_tmplt_seq|Step|Sequence|Duration(Hour)|Use CHK" ;

MSG_KEY["MGT_JOB_0020_HDR"]     = "Category|Templet Name|Total\nDuration|No.|Booking No.|House B/L|Master B/L|Receive\nDate|Plan\nClosing Date|Actual\nClosing Date|Current\nStep|To Do Task|Job\nStatus|Sales|Job";
MSG_KEY["MGT_JOB_0020_HDR1"]    = "Category|Templet Name|Total\nDuration|No.|Booking No.|House B/L|Master B/L|Receive\nDate|Plan\nClosing Date|Actual\nClosing Date|Current\nStep|To Do Task|Job\nStatus|Sales|Job";
MSG_KEY["MGT_JOB_0030_HDR1"]    = "No.|Bound|Task|Status|Plan Date|Actual Date|Issued by|intg_bl_seq|job_sts_cd|curr_tm|sts_color";
MSG_KEY["MGT_JOB_0030_HDR2"]    = "No.|Bound|Task|Status|Plan Date|Actual Date|Issued by|intg_bl_seq|job_sts_cd|curr_tm|sts_color";
MSG_KEY["MGT_JOB_0040_HDR1_1"]  = "Category|Template|Description|Duration|Created|Created|Updated|Updated|Office";
MSG_KEY["MGT_JOB_0040_HDR1_2"]  = "Category|Template|Description|Duration|By|At|By|At|Office";

//NOTICE LIST
MSG_KEY["NTC_LIST_HDR1"]= "No.|Title|User ID|User Name|Reg. Date|Exp. Date|Paging|Board Key";

//NOTICE LIST
MSG_KEY["MBRD_LIST_HDR1"]= "No.|Title|Program|Kind|User ID|User Name|Reg. Date|Due Date|Count|Attach File";

//E-MAIL LOG, FAX LOG (REFINE FUNCTION)
MSG_KEY["MGT_LOG_0010_HDR1"]   = "No.|Title|Contents|Recipient|Sender|Type|Status|Register Date|";
MSG_KEY["MGT_LOG_0020_HDR1"]   = "No.|Title|Sender|Recipient Company|Recipient|Fax No.|Status|Register Date|fax_cre_no|fax_seq|ibflag";


////SUPPORT (SUP) COMMON MESSAGE (2012.11.26) //OTH*.js
MSG_KEY["SUP_COM_ALT001"] = "Please enter a Value correctly! The last Day of the month is "; //
MSG_KEY["SUP_COM_ALT002"] = "Please select an upload file!"; //업로드할 파일을 선택해 주세요!
MSG_KEY["SUP_COM_ALT003"] = "Input Carrier!"; //업로드할 파일을 선택해 주세요!
MSG_KEY["SUP_COM_ALT003"] = "Please Input to grid's add row!"; //ADD Row 입력!
MSG_KEY["SUP_COM_ALT004"] = "There is no data to save.";
MSG_KEY["SUP_COM_ALT005"] = "W/H Location.";
MSG_KEY["SUP_COM_ALT006"] = "Last Check No. should be equal or greater than Current Check NO.";
MSG_KEY["SUP_COM_ALT007"] = "The Post Date must be later than the block date (@)";

MSG_KEY['WHOCList_HDR1'] = 'Seq|Complete (LP) No|Complete Date|Status|Booking Date|Booking No|Cust Order No|Order Type|Item|Item Name|Order|Order|Order|Allocated Qty (EA)|Allocated Qty (EA)|Allocated Qty (EA)|Inbound Date|Item Lot No|Location|CBM|CBM|GWT|GWT|NWT|NWT|Consignee|Consignee|Contract|Contract|Type|CNTR/TR No|Seal No|Gate-In|Gate-Out|Remark|Remark|Attach|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information|Warehouse|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|WHOC_FLAG';
MSG_KEY['WHOCList_HDR2'] = "Seq|Complete (LP) No|Complete Date|Status|Booking Date|Booking No|Cust Order No|Order Type|Item|Item Name|Unit|Unit Qty|EA Qty|Allocated|Planned|Shipped|Inbound Date|Item Lot No|Location|CBM |CFT|KGS|LBS|KGS|LBS|Code|Name|No|Name|Type|CNTR/TR No|Seal No|Gate-In|Gate-Out|Remark|Remark|Attach|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|PO No|Warehouse|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|WHOC_FLAG";

MSG_KEY['WHOCUpdate_HDR1'] = "SEQ|wob_out_no|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Order Qty|Order Qty|Order Qty|rn|Allocated Qty(EA)|Allocated Qty(EA)|Allocated Qty(EA)|Inbound Date|Item Lot No|Location|CBM|CBM|GWT|GWT|NWT|NWT|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Remark|Attach|Attach|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information"
    + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|cust_item_cd|walc_no|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|FILE_SIZE|attach_add|attach_del|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|Booking No|Booking Date";
MSG_KEY['WHOCUpdate_HDR2'] = "SEQ|wob_out_no|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Unit|Unit Qty|EA Qty|rn|Allocated|Shipped|Gap|Inbound Date|Item Lot No|Location|CBM |CFT|KGS|LBS|KGS|LBS|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Remark|Add|Del|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|Po No"
    + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|cust_item_cd|walc_no|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|FILE_SIZE|attach_add|attach_del|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|Booking No|Booking Date";

MSG_KEY['WHOCUpdate_HDR3'] = "SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Order Qty|Order Qty|Order Qty|rn|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|Inbound Date|Item Lot No|Location|CBM |CBM |GWT|GWT|NWT|NWT|Remark|Attach|Attach|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information"
    + "|status|LP_NO|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|FILE_SIZE|attach_add|attach_del|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|load_item_ea_qty_org";
MSG_KEY['WHOCUpdate_HDR4'] = "SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Unit|Unit Qty|EA Qty|rn|Allocated|Loading|Shipped|Gap|Inbound Date|Item Lot No|Location|CBM|CFT|KGS|LBS|KGS|LBS|Remark|Add|Del|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|Po No"
    + "|status|LP_NO|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|FILE_SEQ|FILE_PATH|FILE_SYS_NM|FILE_ORG_NM|FILE_SIZE|attach_add|attach_del|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|load_item_ea_qty_org";

MSG_KEY['WHOCMgmt_HDR1'] = "|SEQ|Booking No|Order Type|Booking Date|Estimated Date|TTL EA QTY|Consignee|Consignee|Contract|Contract|W/H Code|walc_no";

MSG_KEY['WHOCMgmt_HDR2'] = "SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Order Qty|Order Qty|Order Qty|rn|Allocated Qty(EA)|Allocated Qty(EA)|Allocated Qty(EA)||CBM|CBM|GWT|GWT|NWT|NWT|Inbound Date|Item Lot No|Location|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information"
    + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|cust_item_cd|walc_no|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
MSG_KEY['WHOCMgmt_HDR3'] = "SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Unit|Unit Qty|EA Qty|rn|Allocated|Shipped|Gap||CBM|CFT|KGS|LBS|KGS|LBS|Inbound Date|Item Lot No|Location|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|Po No"
    + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|cust_item_cd|walc_no|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";

MSG_KEY['WHOCMgmt_HDR4'] = "|SEQ|Booking No|Order Type|Booking Date|Estimated Date|Load Plan No|Console No|LP Date|TTL EA QTY|Consignee|Consignee|Contract|Contract|W/H Code";

MSG_KEY['WHOCMgmt_HDR5'] = "SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Order Qty|Order Qty|Order Qty|rn|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|Loading Qty(EA)|chk|CBM|CBM|GWT|GWT|NWT|NWT|Inbound Date|Item Lot No|Location|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Additional Lot Property|Additional Lot Property|Additional Lot Property|Lot ID|Wave Key|So No|Inbound Information|Inbound Information"
    + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";
MSG_KEY['WHOCMgmt_HDR6'] = "SEQ|Booking No|sao_sys_no|item_sys_no|item_seq|Item|Item Name|Unit|Unit Qty|EA Qty|rn|Allocated|Loading|Load Plan No|Shipped|Gap|chk|CBM|CFT|KGS|LBS|KGS|LBS|Inbound Date|Item Lot No|Location|Type|CNTR/TR NO|Seal No|Gate-In|Gate-Out|Expiration Date|Lot 04|Lot 05|Lot ID|Wave Key|So No|Booking No|Po No"
    + "|status|wh_loc_cd|po_sys_no|eq_tp_cd|wh_cd|sao_no|pkg_lv1_qty|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs";

    
    
    