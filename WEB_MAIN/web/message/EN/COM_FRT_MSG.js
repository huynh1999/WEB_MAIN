////COMMON FREIGHT (COM_FRT) FUNCTION IBSHEET GRID TITLE
//Sea Export Freight
MSG_KEY['SEE_FRT_0010_HDR1']   = "TP/SZ|Qty";
 MSG_KEY['SEE_FRT_0010_HDR2_1'] = "DEL||CHK|Selling/\nDebit|Freight\nCode|Freight\nCode|Customer Code|Customer Code|Rate\nCurr.|Unit|TP/SZ|Vol.|Inc.|P/C|Rate|Qty|Vat|Vat|Amount(Invoice)|Amount(Invoice)|Amount(Invoice)|Amount(Invoice)|Amount(Invoice)|Amount(Invoice)|Amount(Performance)|Amount(Performance)|Amount(Performance)|Amount(Performance)|Invoice No.|Status Code|Status|Dept.|Issued by|Auto Rate FLAG|Rate No.|Item No.|IBFlag";
MSG_KEY['SEE_FRT_0010_HDR2_2'] = "DEL||CHK|Selling/\nDebit|Freight\nCode|Name|Code|Name|Rate\nCurr.|Unit|TP/SZ|Vol.|Inc.|P/C|Rate|Qty|%|Rate|Curr.|Ex. Rate|Ex. Date|Amount|Vat|Total Amount|Curr.|Ex. Rate|Amount|Vat|Invoice No.|Status Code|Status|Dept.|Issued by|Auto Rate FLAG|Rate No.|Item No..|IBFlag";
MSG_KEY['SEE_FRT_0010_HDR3']   = "Rate Curr.|Ex. Rate|Amount|Inv. Amount|";
MSG_KEY['SEE_FRT_0010_HDR4_1'] = "DEL||CHK|Buying/\nCredit|Freight\nCode|Freight\nCode|Customer Code|Customer Code|Rate\nCurr.|Unit|TP/SZ|Vol.|Inc.|P/C|Rate|Qty|Vat|Vat|Amount(Invoice)|Amount(Invoice)|Amount(Invoice)|Amount(Invoice)|Amount(Invoice)|Amount(Invoice)|Amount(Performance)|Amount(Performance)|Amount(Performance)|Amount(Performance)|Invoice No.|Status Code|Status|Dept.|Issued by|Auto Rate FLAG|Rate No.|Item No.|IBFlag";
MSG_KEY['SEE_FRT_0010_HDR4_2'] = "DEL||CHK|Buying/\nCredit|Freight\nCode|Name|Code|Name|Rate\nCurr.|Unit|TP/SZ|Vol.|Inc.|P/C|Rate|Qty|%|Rate|Curr.|Ex. Rate|Ex. Date|Amount|Vat|Total Amount|Curr.|Ex. Rate|Amount|Vat|Invoice No.|Status Code|Status|Dept.|Issued by|Auto Rate FLAG|Rate No.|Item No.|IBFlag";
MSG_KEY['SEE_FRT_0010_HDR5_1'] = "No.|HB/L No.|Shipper|Consignee|Partner|POR|POL|POD|DEL|Weight|Measure|Amount(Performance)|Amount(Performance)|" ;
MSG_KEY['SEE_FRT_0010_HDR5_2'] = "No.|HB/L No.|Shipper|Consignee|Partner|POR|POL|POD|DEL|Weight|Measure|Selling|Buying|" ;


////FREIGHT 관련 공통적으로 사용하는 FUNCTION 모음: BL_CDOE_UTIL.js, BL_FRT.js, FRT_CMM_UTIL.js
////COMMON FREIGHT (COM_FRT) FUNCTION MESSAGE (2012.11.26) 
MSG_KEY['COM_FRT_ALT001'] = 'COD(Cash On Delivery) Case!'; //COD(Cash On Delivery) 입니다!
MSG_KEY['COM_FRT_ALT002'] = 'Please enter a Value Correctly! - Hour: Between 0 ~ 23'; //시간을 정확히 입력해 주세요!
MSG_KEY['COM_FRT_ALT003'] = 'Please enter a Value Correctly! - Minute: Between 0 ~ 59'; //분을 정확히 입력해 주세요!
MSG_KEY['COM_FRT_ALT004'] = 'You have to create S/R or MAWB first!';
MSG_KEY['COM_FRT_ALT005'] = 'Currency is different. Please check Invoice Exchange Rate!';
MSG_KEY['COM_FRT_ALT006'] = 'It it possible to use only Two Currencies. Please check Rate Currency!';
MSG_KEY['COM_FRT_ALT007'] = 'You can only select the same Selling and Buying!';
MSG_KEY['COM_FRT_ALT008'] = 'You can only select the same Trade Partner!';
MSG_KEY['COM_FRT_ALT009'] = 'Selected Type/Size is already in use. Please select another Type/Size!';
MSG_KEY['COM_FRT_ALT010'] = 'Does not match the Quantity!';
MSG_KEY['COM_FRT_ALT011'] = 'Invoice Currency is KRW. Please round off or down!';
MSG_KEY['COM_FRT_ALT011'] = 'Invoice Currency is KRW. Please round off or down!';
MSG_KEY['COM_FRT_ALT012'] = 'You can only select Container Unit!';
MSG_KEY['COM_FRT_ALT013'] = 'You can only select the same Currency.!';

MSG_KEY['COM_FRT_CFM001'] = 'Cannot modify Data after Confirm! Do you want to Continue?';
MSG_KEY['COM_FRT_CFM002'] = 'Former Data will be deleted! Do you want to Auto-Generate Freight?';
MSG_KEY['COM_FRT_CFM003'] = 'You can check after [SAVE].';
MSG_KEY['COM_FRT_CFM004'] = "The amount of some items is 0. Delete these items?";
MSG_KEY['COM_FRT_CFM005'] = "Credit Hold is on this Trade Partner. Do you want to proceed?";
MSG_KEY['COM_FRT_CFM006'] = "Over Credit Limit, Current Credit Limit $@. \nExceed Amount $@. \nDo you want to proceed?";
MSG_KEY['COM_FRT_CFM007'] = "Over Due, Current Balance Amount $@. \nDo you want to proceed?";
MSG_KEY['COM_FRT_CFM008'] = "Over Due & Over Credit Limit, Current Credit Limit $@. \nExceed Amount $@. \nDo you want to proceed?";

//BL 공통 Warehouse 
MSG_KEY['COM_WHR_CFM004']	= 'The B/L Information already exists. \nClick YES to overwrite current Shipper, Consignee, Vendor, Actual Shipper, P/O No. \nor Click CANCEL to update Shipment Items Count and Measurement.';
MSG_KEY["WHM_WHM_0005_HDR1"]    = "|DEL|Item|Item|Unit|Inner Qty.|Ctn.|EA|Total Qty|Location|Item Description|P/O No.|L|W|H|Dim Weight|Dim Weight|Actual Weight|Actual Weight|Volume|Volume";
MSG_KEY["WHM_WHM_0005_HDR2"]    = "|DEL|Item|Item|Unit|Inner Qty.|Ctn.|EA|Total Qty|Location|Item Description|P/O No.|L|W|H|KGS|LBS|KGS|LBS|CBM|CFT";
