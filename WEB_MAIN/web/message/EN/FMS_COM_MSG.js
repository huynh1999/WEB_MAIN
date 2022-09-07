//SYSTEM MESSAGE STRUCTURE & LEVELS (2012.08.20 - S.Y BAIK)
//SYSTEM MESSAGES ARE STRUCTURED AS FOLLOWS: [CATEGORY1 CODE + CATEGORY2 CODE + SEVERITY CODE + SEQUENCE OR MESSAGE TYPE] MESSAGE
//SEVERITY LEVELS: 1.ALERT*        : IMMEDIATE ACTION REQUIRE (ALT!, Validation/Human Error), 0.EMERGENCY: SYSTEM IS UNUSABLE (EMG.X)
//                 3.ERROR*        : ERROR CONDITION (ERR!, System Error! etc...)
//                 4.WARNING*      : WARNING CONDITION (WRG!, Closing this Window will cause losing any unsaved Data! etc...)
//                 5.CONFIRM*      : CONFIRM MESSAGE (CFM?, Do you want to Save? etc...)
//                 6.NOTIFICATION* : NORMAL BUT SIGNIFICANT CONDITION (NTY!, Complete Save! Save did not succeed! etc...)
//                 7.INFORMATIONAL*: INFORMATIONAL MESSAGE ONLY (INF., Red indicates required field. Passwords are case sensitive. etc...)   
//                 *MESSAGE SAMPLE : FMS_COM_ERR001 (SYSTEM COMMON ERROR SYSTEM 1 MESSAGE)
//                 *CALLING SAMPLE : alert("ARA_ACC_0030.430: " + getLabel('FMS_COM_ERR001') + err.message); //ARA_ACC_0030.js + 430row   
//                 *CALLING SAMPLE : alert("ARA_ACC_0030.366: " + getLabel('FMS_COM_ALT001') + getLabel('COM_COD_DATE')); //KOREAN or ENGLISH

//*** SAMPLE ***
//NOTIFY FOR COMPLETED SUCCESSFUL or QUESTION Case: alert(getLabel('FMS_COM_NTYCOM')), alert(getLabel('FMS_COM_CFMSAV'))  
//THE OTHERS (ERROR, ALERT, WARNING...) Case:
//alert(getLabel('FMS_COM_ERR001') + "\n\n: SAL_TPM_0010.352"); 
//alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: EDI_CSTM_0020.306");
//alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_CURR') + "\n\n: SAL_TFM_0010.213");
//alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_CSTS') + ", Row: " + getLabel2('FMS_COD_PARA', param) + "\n\n: ACC_0010.257");
//alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_MRNO') + "\n\n: SEE_BMD_0020.594");
//alert(getLabel('FMS_COM_NTYCOM'));
//alert(getLabel('FMS_COM_ALT002') + "\n\n: SEE_BMD_0020.594");
//alert(getLabel('FMS_COM_ALT001') + " - " + getLabel2('FMS_COD_PARA', param) + "\n\n: SEE_BMD_0020.594");

//checkSelectVal, checkInputVal
//var inLen     = 0;
//inLen = getStringLength(trim(frm1.bill_to_trdp_cd.value)) 
//if(inLen < 10 || inLen > 20)
//if(!checkInType(frm1.eta_dt_tm.value, "DD")){
//frm1.eta_dt_tm.focus();
//alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_ETA_') + "\n\n: SEI_BMD_0040.1602");
//if(inNumValid(frm1.cgo_meas_f.value, "N") == false){


//OPUS FORWARDING COMMON MESSAGE (FMS_COM): WHEN CALLING FROM MULTIPLE SOURCE (2012.11.26)
MSG_KEY['FMS_COM_ERR001'] = 'System Error! \n'; //+ err.message 
MSG_KEY['FMS_COM_ERR002'] = 'Unexpected Error occurred. Please Contact Help Desk!'; //+ err.message

MSG_KEY['FMS_COM_ALT001'] = 'Please enter a Mandatory Value! (Red indicates required field)'; //+CODE
MSG_KEY['FMS_COM_ALT002'] = 'Please enter a Value correctly! '; //NO or WRONG DATA INPUT. +MSG, CODE
MSG_KEY['FMS_COM_ALT006'] = 'Please enter a Value first! '; //+MSG
MSG_KEY['FMS_COM_ALT014'] = 'Please enter Search Condition! '; //+MSG
MSG_KEY['FMS_COM_ALT003'] = 'Please select only one Data! '; 
MSG_KEY['FMS_COM_ALT004'] = 'Please select Data! '; 
MSG_KEY['FMS_COM_ALT005'] = 'Number is available only! ';
MSG_KEY['FMS_COM_ALT007'] = 'Please check Data! '; //SOMETHING WRONG FOR CALCULATION OR GIVEN DATA. +CODE, ROW
MSG_KEY['FMS_COM_ALT008'] = 'Duplicated Data! '; //+CODE, ROW
MSG_KEY['FMS_COM_ALT009'] = 'No data to save! ';
MSG_KEY['FMS_COM_ALT010'] = 'No Data found! '; //+CODE
MSG_KEY['FMS_COM_ALT011'] = 'Cannot delete! '; //+
MSG_KEY['FMS_COM_ALT012'] = 'Already completed! '; //+
MSG_KEY['FMS_COM_ALT013'] = 'Already exist Data! '; //+
MSG_KEY['FMS_COM_ALT015'] = 'Please Save first! '; //+
MSG_KEY['FMS_COM_ALT016'] = 'Please Issue first! '; //+
MSG_KEY['FMS_COM_ALT017'] = 'Deleted Data! '; //+
MSG_KEY['FMS_COM_ALT018'] = 'Modified Data! '; //+
MSG_KEY['FMS_COM_ALT019'] = 'Failed! '; //+
MSG_KEY['FMS_COM_ALT020'] = 'COD(Cash On Delivery) Case!'; //COD(Cash On Delivery) 입니다!
MSG_KEY['FMS_COM_ALT021'] = '[Warning] ETD or ETA is allowed within 6 months! '; //EDT 혹은 ETA는 6개월 이내로 입력해야 합니다! 
MSG_KEY['FMS_COM_ALT022'] = 'Cannot delete because Invoice was Issued! '; //Invoice가 Issue 상태이기 때문에 삭제할 수 없습니다!
MSG_KEY['FMS_COM_ALT023'] = 'Please change the Split Shipment flag to Yes! '; //분할선적 여부를 Yes로 변경해 주세요!
MSG_KEY['FMS_COM_ALT024'] = 'Cannot enter a Value when the Split Shipment flag is No! '; //분할선적 여부가 No이므로 입력할 수 없습니다!
MSG_KEY['FMS_COM_ALT025'] = 'Already used Data! '; //+
//MSG_KEY['FMS_COM_ALT026'] = 'Cannot delete the confirmed or closing Data! '; //+
MSG_KEY['FMS_COM_ALT026'] = 'Please delete the HB/L in advance.'; 
MSG_KEY['FMS_COM_ALT027'] = 'You cannot upload this file! Permitted file extensions are as follows: \n'; //파일을 업로드할 수 없습니다! 업로드 가능한 파일 확장자: 
MSG_KEY['FMS_COM_ALT028'] = 'No changed data! '; //+CODE
MSG_KEY['FMS_COM_ALT029'] = 'Please Retrieve first! '; 
MSG_KEY['FMS_COM_ALT030'] = "\n(The Max. Length of this field is @.)";
MSG_KEY['FMS_COM_ALT031'] = 'Please enter a Value more than 7 characters! '; //+CODE
MSG_KEY['FMS_COM_ALT032'] = "@Invoice already created."; 
MSG_KEY['FMS_COM_ALT033'] = "End date must be greater than start date"; 
MSG_KEY['FMS_COM_ALT034'] = "Accounting Closed. You can only edit following fields.\nShipper / Consignee / Notify Party / POL / POD / DEL / B/L Body.";
MSG_KEY['FMS_COM_ALT035'] = "There is no House B/L data! ";
MSG_KEY['FMS_COM_ALT036'] = 'Please save first! ';
MSG_KEY['FMS_COM_ALT037'] = 'Please enter a Search Value!';
MSG_KEY['FMS_COM_ALT038'] = 'No content to save.';
MSG_KEY['FMS_COM_ALT039'] = 'Please search first.';
MSG_KEY['FMS_COM_ALT040'] = 'Please check date format.';
MSG_KEY['FMS_COM_ALT041'] = 'Year must be greater than 1900.';
MSG_KEY['FMS_COM_ALT042'] = 'Input data must be greater than 0.';
MSG_KEY['FMS_COM_ALT043'] = "There is no Master B/L data! ";
MSG_KEY['FMS_COM_ALT044'] = "Payment can't be  0. ";
MSG_KEY['FMS_COM_ALT045'] = "Received can't be  0. ";
MSG_KEY['FMS_COM_ALT046'] = 'Please select a Container! '; //+Container
MSG_KEY['FMS_COM_ALT047'] = 'Please Enter MAWB No! '; //+MAWB No
MSG_KEY['FMS_COM_ALT048'] = "You don't have the role for the Linked Program"; //System > Admin > Role/Screen Mapping 
MSG_KEY['FMS_COM_ALT049'] = 'Please select a MBL No! '; //+MBL
MSG_KEY['FMS_COM_ALT050'] = 'Please select a MAWB No! '; //+MAWB
MSG_KEY['FMS_COM_ALT051'] = 'There is no (Master B/L or Container) data! ';
MSG_KEY['FMS_COM_ALT052'] = 'There is no MAWB data! ';
MSG_KEY['FMS_COM_ALT053'] = 'There is no Other Filling No data! ';
MSG_KEY['FMS_COM_ALT054'] = 'There is no D/C Entry data! ';
MSG_KEY['FMS_COM_ALT055'] = 'Please check Report By Info! ';
MSG_KEY['FMS_COM_ALT056'] = 'MAIL Send Success';
MSG_KEY['FMS_COM_ALT057'] = 'FAX Send Success';
MSG_KEY['FMS_COM_ALT058'] = 'There is no MBL data! ';
MSG_KEY['FMS_COM_ALT059'] = 'You cannot upload this file!';
MSG_KEY['FMS_COM_ALT060'] = 'You cannot add invoice!. The account has been closed! ';
MSG_KEY['FMS_COM_ALT061'] = 'Please check a For Infomation! '; 
MSG_KEY['FMS_COM_ALT062'] = 'CCN No. is already exist.\nDo you want to change it? '; 
MSG_KEY['FMS_COM_ALT063'] = '[warning] Duplicated CCN number found.'; 
MSG_KEY['FMS_COM_ALT064'] = 'Cannot create the invoice with prepaid item'; 
MSG_KEY['FMS_COM_ALT077'] = "\n(The Min. Length of this field is @.)";

MSG_KEY['FMS_COM_CFMCON'] = 'Are you sure you want to Continue? ';  
MSG_KEY['FMS_COM_CFMDEL'] = 'Are you sure you want to Delete? '; 
MSG_KEY['FMS_COM_CFMCAN'] = 'Are you sure you want to Cancel? ';
MSG_KEY['FMS_COM_CFMNEW'] = 'Do you want to start a New? ';
MSG_KEY['FMS_COM_CFMCRE'] = 'Do you want to Create? ';
MSG_KEY['FMS_COM_CFMCFM'] = 'Do you want to Confirm? ';
MSG_KEY['FMS_COM_CFMISS'] = 'Do you want to Issue? ';
MSG_KEY['FMS_COM_CFMSAV'] = 'Do you want to Save? '; 
MSG_KEY['FMS_COM_CFMMOD'] = 'Do you want to Modify? '; 
MSG_KEY['FMS_COM_CFMCPY'] = 'Do you want to Copy? ';
MSG_KEY['FMS_COM_CFMSEN'] = 'Do you want to Send? ';
MSG_KEY['FMS_COM_CFMSENDEML'] = 'Do you want to send Email? ';
MSG_KEY['FMS_COM_CFMSENDFAX'] = 'Do you want to Send Fax? ';
MSG_KEY['FMS_COM_CFMSENDEDI'] = 'Do you want to Send EDI? ';
MSG_KEY['FMS_COM_CFMRCV'] = 'Do you want to Receive? ';
MSG_KEY['FMS_COM_CFMCLS'] = 'Do you want to Close? ';

MSG_KEY['FMS_COM_NTYCOM'] = 'Completed! '; //Saved Successfully
MSG_KEY['FMS_COM_NTYSAV'] = 'Save completed! '; //Saved Successfully
MSG_KEY['FMS_COM_NTYDEL'] = 'Delete completed! '; //Saved Successfully

MSG_KEY['FMS_COM_000000'] = 'Refine This Message!!! ';

//WORD, TERM (ORDER BY ALPHABET)
MSG_KEY['FMS_COD_PARA'] = '@'; //FMS에서는 #param1#가 아닌 @로 정의 (CoBizCommon.js)
MSG_KEY['FMS_COD_NULL'] = '   '; //임시
MSG_KEY['FMS_COD_ACCT'] = 'Account ';
MSG_KEY['FMS_COD_ADDR'] = 'Address ';
MSG_KEY['FMS_COD_AMT']  = 'Amount ';
MSG_KEY['FMS_COD_ARRV'] = 'Arrival ';
MSG_KEY['FMS_COD_AGNT'] = 'Agent ';
MSG_KEY['FMS_COD_AIRL'] = 'Airline ';
MSG_KEY['FMS_COD_ASHP'] = 'AShipper ';
MSG_KEY['FMS_COD_BILL'] = 'Billing ';
MSG_KEY['FMS_COD_CBKNO'] = 'Carrier BKG No. ';
MSG_KEY['FMS_COD_BLNO'] = 'B/L No. ';
MSG_KEY['FMS_COD_BLTO'] = 'Bill To ';
MSG_KEY['FMS_COD_BOND'] = 'Bond ';
MSG_KEY['FMS_COD_BUCR'] = 'Buying/Credit ';
MSG_KEY['FMS_COD_CARR'] = 'Carrier ';
MSG_KEY['FMS_COD_CMDT'] = 'Commodity ';
MSG_KEY['FMS_COD_CNEE'] = 'Cinsignee ';
MSG_KEY['FMS_COD_CNTR'] = 'Container ';
MSG_KEY['FMS_COD_CNTRCD'] = 'Container Code';
MSG_KEY['FMS_COD_CONT'] = 'Continent ';
MSG_KEY['FMS_COD_CNTY'] = 'Country ';
MSG_KEY['FMS_COD_CODE'] = 'Code ';
MSG_KEY['FMS_COD_CONS'] = 'Console ';
MSG_KEY['FMS_COD_CRDB'] = 'CR/DB ';
MSG_KEY['FMS_COD_CUST'] = 'Customer ';
MSG_KEY['FMS_COD_CURR'] = 'Currency ';
MSG_KEY['FMS_COD_DATE'] = 'Date ';
MSG_KEY['FMS_COD_DATM'] = 'Date & Time ';
MSG_KEY['FMS_COD_DEBK'] = 'Deposit Bank ';
MSG_KEY['FMS_COD_DEL_ETA_'] = 'DELIVERY ETA ';
MSG_KEY['FMS_COD_DETP'] = 'Department Type ';
MSG_KEY['FMS_COD_DESC'] = 'Description ';
MSG_KEY['FMS_COD_ENGN'] = 'English Name ';
MSG_KEY['FMS_COD_MAIL'] = 'EMail Address ';
MSG_KEY['FMS_COD_ETA_'] = 'ETA ';
MSG_KEY['FMS_COD_ETD_'] = 'ETD ';
MSG_KEY['FMS_COD_EXRT'] = 'Exchange Rate ';
MSG_KEY['FMS_COD_FINO'] = 'Filing No. ';
MSG_KEY['FMS_COD_FLIT'] = 'Flight ';
MSG_KEY['FMS_COD_FRET'] = 'Freight ';
MSG_KEY['FMS_COD_GLNO'] = 'G/L No. ';
MSG_KEY['FMS_COD_GWGT'] = 'Gross Weight ';
MSG_KEY['FMS_COD_HAWB'] = 'HAWB ';
MSG_KEY['FMS_COD_HANO'] = 'HAWB No. ';
MSG_KEY['FMS_COD_HBL_'] = 'HB/L ';
MSG_KEY['FMS_COD_HBNO'] = 'HB/L No. ';
MSG_KEY['FMS_COD_HSN_'] = 'HSN (HB/L Sequence No.) ';
MSG_KEY['FMS_COD_IATA'] = 'IATA ';
MSG_KEY['FMS_COD_IDTP'] = 'ID TYPE ';
MSG_KEY['FMS_COD_IEXR'] = 'Invoice Exchange Rate ';
MSG_KEY['FMS_COD_IVNO'] = 'Invoice No. ';
MSG_KEY['FMS_COD_LINE'] = 'Liner ';
MSG_KEY['FMS_COD_LOCN'] = 'Local Name ';
MSG_KEY['FMS_COD_LOCA'] = 'Location ';
MSG_KEY['FMS_COD_MAWB'] = 'MAWB ';
MSG_KEY['FMS_COD_MBLN'] = 'MB/L No. ';
MSG_KEY['FMS_COD_MEAS'] = 'Measurement ';
MSG_KEY['FMS_COD_MRNO'] = 'MRN (Manifest Reference No.) ';
MSG_KEY['FMS_COD_MSNO'] = 'MSN (MB/L Sequence No.) ';
MSG_KEY['FMS_COD_NAME'] = 'Name ';
MSG_KEY['FMS_COD_NUM_'] = 'No. ';
MSG_KEY['FMS_COD_NTFY'] = 'Notify ';
MSG_KEY['FMS_COD_OCUR'] = 'One Currency ';
MSG_KEY['FMS_COD_OFCE'] = 'Office ';
MSG_KEY['FMS_COD_PKGE'] = 'Package ';
MSG_KEY['FMS_COD_PKGECD'] = 'Package Code ';
MSG_KEY['FMS_COD_PEXR'] = 'Performance Exchange Rate ';
MSG_KEY['FMS_COD_POST'] = 'Post ';
MSG_KEY['FMS_COD_RATE'] = 'Rate ';
MSG_KEY['FMS_COD_REFN'] = 'Filing No. ';
MSG_KEY['FMS_COD_RECP'] = 'W/H Receipt No.';
MSG_KEY['FMS_COD_RMK'] = 'Remark ';
MSG_KEY['FMS_COD_RPTT'] = 'Report Type ';
MSG_KEY['FMS_COD_RPLT'] = 'Report List ';
MSG_KEY['FMS_COD_SEDE'] = 'Selling/Debit ';
MSG_KEY['FMS_COD_SHIP'] = 'Shipper';
MSG_KEY['FMS_COD_SHTO'] = 'Ship To ';
MSG_KEY['FMS_COD_SZUN'] = 'Size Unit ';
MSG_KEY['FMS_COD_SAGT'] = 'Sub Agent ';
MSG_KEY['FMS_COD_SUBC'] = 'Sub-Continent ';
MSG_KEY['FMS_COD_TRPT'] = 'Trade Partner ';
MSG_KEY['FMS_COD_TCUR'] = 'To Currency ';
MSG_KEY['FMS_COD_TYPE'] = 'Type ';
MSG_KEY['FMS_COD_TPSZ'] = 'Type/Size ';
MSG_KEY['FMS_COD_VESL'] = 'Vessel ';
MSG_KEY['FMS_COD_VOLM'] = 'Volume ';
MSG_KEY['FMS_COD_VOYA'] = 'Voyage ';
MSG_KEY['FMS_COD_UNTP'] = 'Unit Type ';
MSG_KEY['FMS_COD_USPP'] = 'USPPI Phone No. ';
MSG_KEY['FMS_COM_CFMGRS'] = 'The Gross Weight is Zero.\n Process Anyway?'; 
MSG_KEY['FMS_COM_CFMMEAS'] = 'The Measurement is Zero.\n Process Anyway?'; 
MSG_KEY['FMS_COM_CFMPRO'] = 'Do you want to proceed?'; 
MSG_KEY['FMS_COD_WONO'] = 'W/O No. ';
MSG_KEY['FMS_COD_BILLREV'] = 'Revenue Code ';
MSG_KEY['FMS_COD_BILLCRDB'] = 'CR/DB Code ';
MSG_KEY['FMS_COD_BILLCOST'] = 'Cost Code ';
MSG_KEY['FMS_COD_POSTING'] = 'Posting Date ';
MSG_KEY['FMS_COD_INVOICEDT'] = 'Invoice Date ';
MSG_KEY['FMS_COD_DUEDT'] = 'Due Date ';
MSG_KEY['FMS_COD_BLCURRENCY'] = 'B/L Currency ';
MSG_KEY['FMS_COD_QTY'] = 'QTY';
MSG_KEY['FMS_COD_AGENTNM'] = 'Agent Name';
MSG_KEY['FMS_COD_PSHARE'] = 'Profit Share';
MSG_KEY['FMS_COD_VENDOR'] = 'Vendor';
MSG_KEY['FMS_COD_POSTDT'] = 'Post Date';
MSG_KEY['FMS_COD_BILLINGINFO'] = 'Billing Information';
MSG_KEY['FMS_COD_BILLINGCODE'] = 'Billing Code';
MSG_KEY['FMS_COD_GL'] = 'G/L Code';
MSG_KEY['FMS_COD_CMDTCD'] = 'Commodity Code';
MSG_KEY['FMS_COD_BANKNM'] = 'Bank Name';
MSG_KEY['FMS_COD_MISCFILNO'] = 'MISC. Filing No.';
MSG_KEY['FMS_COD_SINO'] = 'S/I No.';
MSG_KEY['FMS_COD_TO'] = 'To';
MSG_KEY['FMS_COD_SENDDT'] = 'Send Date';
MSG_KEY['FMS_COD_DOCTO'] = 'Document To';
MSG_KEY['FMS_COD_EDNDT'] = 'Ending Date';
MSG_KEY['FMS_COD_PERDT'] = 'Period Date';
MSG_KEY['FMS_COD_PROCEDT'] = 'Processing Date';
MSG_KEY['FMS_COD_BATTYPE'] = 'Batch Type';
MSG_KEY['FMS_COD_RECEIVED'] = 'Received';
MSG_KEY['FMS_COD_CAGWEIG'] = 'Cargo Weight';
MSG_KEY['FMS_COD_CAGMEAS'] = 'Cargo Measurement';

//항목명
MSG_KEY['ITM_FRT_CD']      = 'Freight Code';
MSG_KEY['ITM_FRT_TO']      = 'Freight To';
MSG_KEY['ITM_TRDP_CD']     = 'Customer Code';
MSG_KEY['ITM_TARIFF_CURR'] = 'Rate Currency';
MSG_KEY['ITM_UNIT']        = 'Unit';
MSG_KEY['ITM_VOL']         = 'Volume';
MSG_KEY['ITM_RATE']        = 'Rate';
MSG_KEY['ITM_VAT']         = 'Vat';
MSG_KEY['ITM_VAT_RATE']    = 'Vat Rate';
MSG_KEY['ITM_XCRT_DT']     = 'Invoice Exchange Date';
MSG_KEY['ITM_PAYMENT']     = 'Payment';
MSG_KEY['ITM_PERIOD']     = 'Period';
MSG_KEY['ITM_BANK']       = 'Bank';
MSG_KEY['ITM_PAYAMOUNT']     = 'Payment Amount';
MSG_KEY['ITM_DEPARTMEMT']     = 'Department';

MSG_KEY['ITM_INV_CURR']    = 'Invoice Currency';
MSG_KEY['ITM_INV_EXRT']    = 'Invoice Exchange Rate';
MSG_KEY['ITM_INV_AMT']     = 'Invoice Amt';
MSG_KEY['ITM_INV_VAT_AMT'] = 'Invoice Vat Amt';

MSG_KEY['ITM_PERF_CURR']   = 'Performance Currency';
MSG_KEY['ITM_PERF_EXRT']   = 'Performance Exchange Rate';
MSG_KEY['ITM_PERF_AMT']    = 'Performance Amt';
MSG_KEY['ITM_PERF_VAT_AMT']= 'Performance Vat Amt';

//항목명
MSG_KEY['ITM_FRT_CD']      = 'Freight Code';
MSG_KEY['ITM_TRDP_CD']     = 'Customer Code';
MSG_KEY['ITM_TARIFF_CURR'] = 'Rate Currency';
MSG_KEY['ITM_UNIT']        = 'Unit';
MSG_KEY['ITM_VOL']         = 'Volume';
MSG_KEY['ITM_RATE']        = 'Rate';
MSG_KEY['ITM_VAT']         = 'Vat';
MSG_KEY['ITM_VAT_RATE']    = 'Vat Rate';
MSG_KEY['ITM_XCRT_DT']     = 'Invoice Exchange Date';

MSG_KEY['ITM_INV_CURR']    = 'Invoice Currency';
MSG_KEY['ITM_INV_EXRT']    = 'Invoice Exchange Rate';
MSG_KEY['ITM_INV_AMT']     = 'Invoice Amt';
MSG_KEY['ITM_INV_VAT_AMT'] = 'Invoice Vat Amt';

MSG_KEY['ITM_PERF_CURR']   = 'Performance Currency';
MSG_KEY['ITM_PERF_EXRT']   = 'Performance Exchange Rate';
MSG_KEY['ITM_PERF_AMT']    = 'Performance Amt';
MSG_KEY['ITM_PERF_VAT_AMT']= 'Performance Vat Amt';

//항목명
MSG_KEY['ITM_FRT_CD']      = 'Freight Code';
MSG_KEY['ITM_TRDP_CD']     = 'Customer Code';
MSG_KEY['ITM_Rate_CURR']   = 'Rate Currency';
MSG_KEY['ITM_UNIT']        = 'Unit';
MSG_KEY['ITM_VOL']         = 'Volume';
MSG_KEY['ITM_RATE']        = 'Rate';
MSG_KEY['ITM_VAT']         = 'Vat';
MSG_KEY['ITM_VAT_RATE']    = 'Vat Rate';
MSG_KEY['ITM_XCRT_DT']     = 'Invoice Exchange Date';

MSG_KEY['ITM_INV_CURR']    = 'Invoice Currency';
MSG_KEY['ITM_INV_EXRT']    = 'Invoice Exchange Rate';
MSG_KEY['ITM_INV_AMT']     = 'Invoice Amt';
MSG_KEY['ITM_INV_VAT_AMT'] = 'Invoice Vat Amt';

MSG_KEY['ITM_PERF_CURR']   = 'Performance Currency';
MSG_KEY['ITM_PERF_EXRT']   = 'Performance Exchange Rate';
MSG_KEY['ITM_PERF_AMT']    = 'Performance Amt';
MSG_KEY['ITM_PERF_VAT_AMT']= 'Performance Vat Amt';

//항목명
MSG_KEY['ITM_FRT_CD']      = 'Freight Code';
MSG_KEY['ITM_TRDP_CD']     = 'Customer Code';
MSG_KEY['ITM_TARIFF_CURR'] = 'Rate Currency';
MSG_KEY['ITM_UNIT']        = 'Unit';
MSG_KEY['ITM_VOL']         = 'Volume';
MSG_KEY['ITM_RATE']        = 'Rate';
MSG_KEY['ITM_VAT']         = 'Vat';
MSG_KEY['ITM_VAT_RATE']    = 'Vat Rate';
MSG_KEY['ITM_XCRT_DT']     = 'Invoice Exchange Date';
MSG_KEY['ITM_AGING_TP']    = 'Aging Report Type';

MSG_KEY['ITM_INV_CURR']    = 'Invoice Currency';
MSG_KEY['ITM_INV_EXRT']    = 'Invoice Exchange Rate';
MSG_KEY['ITM_INV_AMT']     = 'Invoice Amt';
MSG_KEY['ITM_INV_VAT_AMT'] = 'Invoice Vat Amt';

MSG_KEY['ITM_PERF_CURR']   = 'Performance Currency';
MSG_KEY['ITM_PERF_EXRT']   = 'Performance Exchange Rate';
MSG_KEY['ITM_PERF_AMT']    = 'Performance Amt';
MSG_KEY['ITM_PERF_VAT_AMT']= 'Performance Vat Amt';

//항목명	
MSG_KEY['TRDP_CD']  		= 'Customer Code';
MSG_KEY['FM_CURR_CD']  		= 'From Currency';
MSG_KEY['TO_CURR_CD']  		= 'To Currency';
MSG_KEY['XCH_RT_UT']  		= 'Exchange Rate';
MSG_KEY['TMP_NAME']				= "Template List Name";
MSG_KEY['TMP_LIST']				= "Template List";
MSG_KEY['DESC']					= "Description";
MSG_KEY['DUR_HOUR'] = 'Duration(Hour)';
MSG_KEY['MAC_MSG51'] = 'To_Date';
MSG_KEY['MAC_MSG52'] = 'From_Date';
MSG_KEY['DAY_MONTH'] = 'Day/Month Type';
MSG_KEY['APPLY_SCOPE'] = 'Apply Scope';
MSG_KEY['APPLY_DATE'] = 'Apply Date';


//항목명
MSG_KEY['ITM_OFFICE_CD'] = 'Office Code';
MSG_KEY['ITM_OFFICE_NM'] = 'Office Name';
MSG_KEY['ITM_COUNTRY'] = 'Country';
MSG_KEY['ITM_ADDR'] = 'Address';

//용어 (별도 작업)
MSG_KEY['CONTI_CD']  			= "Continent Code";
MSG_KEY['SUB_CONTI_CD'] 		= "Sub Continent Code";
MSG_KEY['LOCAL_NM']  			= "Local Name";
MSG_KEY['ENG_NM']  				= "Name(Eng.)";
MSG_KEY['DESC']		  			= "Description";
MSG_KEY['CNT_CD']	  			= "Country Code";
MSG_KEY['CNT']	  				= "Country";
MSG_KEY['CURR']		  			= "Currency";
MSG_KEY['LOC_CD']				= "Location Code";
MSG_KEY['NOD_CD']				= "Node Code";
MSG_KEY['ADDR']		  			= "Address";
MSG_KEY['ICAO']		  			= "ICAO";
MSG_KEY['PRNT_LOC_CD']			= "Parent Location Code";
MSG_KEY['TIME_TIFF']		  	= "Time Tiff";
MSG_KEY['AMS_CD']		  		= "AMS Code";
MSG_KEY['OFC_CD']				= "Office Code";
MSG_KEY['PRNT_OFC']				= "Parent Office";
MSG_KEY['SAL_OFC']				= "Sales Office";
MSG_KEY['FINC_OFC']				= "Finnance Office";
MSG_KEY['PTNR']					= "Partner";
MSG_KEY['ZIP_CD']				= "Zip Code";
MSG_KEY['TEL']					= "Phone";
MSG_KEY['FAX']					= "Fax";
MSG_KEY['NAME']					= "Name";
MSG_KEY['PIC']					= "PIC";
MSG_KEY['LGL_ADDR']				= "Legal Address";
MSG_KEY['LOCAL_ADDR']			= "Local Address";
MSG_KEY['ENG_ADDR']				= "Eng. Address";
MSG_KEY['SHT_NM']				= "Alias";
MSG_KEY['FULL_NM']				= "Full Name";
MSG_KEY['SAL_BRN']				= "Sales Office";
MSG_KEY['SAL_PRN']				= "Sales Person";
MSG_KEY['CEO']					= "CEO";
MSG_KEY['URL']					= "URL";
MSG_KEY['BIZ_TYPE']				= "Biz. Type";
MSG_KEY['ITEM']					= "Item";
MSG_KEY['EMAIL']				= "EMail";
MSG_KEY['RMK']					= "Remark";
MSG_KEY['TIT']					= "Title";
MSG_KEY['CONT']					= "Content";
MSG_KEY['SELECT']				= "Select";

MSG_KEY['ACC_NO']				= "Account No.";
MSG_KEY['HOL']					= "Holder";
MSG_KEY['DIV']					= "Division";

//항목명
//MSG_KEY['ITM_EXP_DATE'] = 'Expire date';
//MSG_KEY['ITM_TIT']      = 'Title';
//MSG_KEY['ITM_CONTENTS'] = 'Contents';
//MSG_KEY['ITM_MNU']      = 'Menu';
MSG_KEY['ITM_PGM']      = 'Program';
MSG_KEY['ITM_ORD']      = 'Order';
MSG_KEY['ITM_DESC']     = 'Description';

MSG_KEY['ITM_ROLECD']     = 'Role Code';
MSG_KEY['ITM_ROLENM']     = 'Role Name';

MSG_KEY['ITM_CD']    = 'Code';
MSG_KEY['ITM_CDNM']  = 'Code Name';
MSG_KEY['ITM_CDORD'] = 'Code Order';
MSG_KEY['ITM_RMK']   = 'Remark';

MSG_KEY['ITM_PRNTCD']   = 'Parent Code';
MSG_KEY['ITM_CDLEN']   = 'Code Length';

MSG_KEY['ITM_EXPDT']   = 'Expire date'; 
MSG_KEY['ITM_SKD']    = 'Schedule';

MSG_KEY['ITM_USRNMENG'] = 'Name(Eng.)'
MSG_KEY['ITM_USRNMLOCAL']= 'Local Name'
MSG_KEY['ITM_PHN'] = 'Phone';
MSG_KEY['ITM_ADDR'] = 'Address';
MSG_KEY['ITM_EML']  = 'EMail';

MSG_KEY['ITM_USRID']  = 'User ID';
MSG_KEY['ITM_EXTEML']  = 'External EMail';
MSG_KEY['ITM_EXTPWD']  = 'External EMail Passwords';

//MSG_KEY['ITM_OFC']  = 'Please select an office!';

//항목명
MSG_KEY['POR_FUL_NM']      = 'POR Full Name';
MSG_KEY['ITM_MSG_TP']      = 'Message Type';
MSG_KEY['ITM_LNR_SCAC']    = 'Carrier SCAC';
MSG_KEY['ITM_POR_FL_NM']   = 'POR Full Name';
MSG_KEY['ITM_SNP']         = 'SNP';
MSG_KEY['ITM_IT_NO']       = 'IT No.';

MSG_KEY['MESSAGE']  	= 'Message';
MSG_KEY['REMARK']  		= 'Remark';
MSG_KEY['ITM_PRNR']  	= 'Partner';
MSG_KEY['ITM_SUBJECT']  = 'Subject';

//항목명
MSG_KEY['POR_FUL_NM']      = 'POR Full Name';
MSG_KEY['ITM_MSG_TP']      = 'Message Type';
MSG_KEY['ITM_LNR_SCAC']    = 'Carrier SCAC';
MSG_KEY['ITM_POR_FL_NM']   = 'POR Full Name';
MSG_KEY['ITM_SNP']         = 'SNP';
MSG_KEY['ITM_IT_NO']       = 'IT No.';
MSG_KEY['TRANS_REF_NO']    = 'Trans. Ref. No.';


//MSG_KEY['FMS_COM_ALT001'] = 'Please enter a Mandatory Value! (Red indicates required field) '; //+CODE
//MSG_KEY['FMS_COM_ALT002'] = 'Please enter a Value correctly! '; //NO or WRONG DATA INPUT. +MSG, CODE
//MSG_KEY['FMS_COM_ALT006'] = 'Please enter a Value First! '; //+MSG
//MSG_KEY['FMS_COM_ALT014'] = 'Please enter more than one Search Condition! '; //+MSG
//MSG_KEY['FMS_COM_ALT003'] = 'Please select only one Data! '; 
//MSG_KEY['FMS_COM_ALT004'] = 'Please select Data! '; 
//MSG_KEY['FMS_COM_ALT009'] = 'Please select an Image! ';
//MSG_KEY['FMS_COM_ALT005'] = 'Number is available only! ';
//MSG_KEY['FMS_COM_ALT007'] = 'Please check Data! '; //SOMETHING WRONG FOR CALCULATION OR GIVEN DATA. +CODE, ROW
//MSG_KEY['FMS_COM_ALT008'] = 'Duplicate Data! '; //+CODE, ROW
//MSG_KEY['FMS_COM_ALT010'] = 'No Data found! '; //+CODE
//MSG_KEY['FMS_COM_ALT011'] = 'Cannot delete! '; //+
//MSG_KEY['FMS_COM_ALT012'] = 'Already completed! '; //+
//MSG_KEY['FMS_COM_ALT013'] = 'Already exist Data! '; //+
//
//MSG_KEY['FMS_COM_ALT101'] = '\n(Title & content must be greater than 10 characters & less than 100 characters) ';
//MSG_KEY['FMS_COM_ALT102'] = 'Please change the name of selected File! \nFile Name cannot exceed 40 characters including the Extension. ';
//MSG_KEY['FMS_COM_ALT103'] = 'Cannot upload unauthorized File! \n- Authorized File Extension: ';
//MSG_KEY['FMS_COM_ALT104'] = 'Destination IP Address is invalid! '; //Check back
//MSG_KEY['FMS_COM_ALT105'] = 'Email Address is invalid! '; //Check back
//MSG_KEY['FMS_COM_ALT106'] = 'User Name is invalid! '; //Check back
//MSG_KEY['FMS_COM_ALT107'] = 'Domain Name is invalid! '; //Check back
//MSG_KEY['FMS_COM_ALT108'] = 'Available Period is max 60-days! ';
//MSG_KEY['FMS_COM_ALT109'] = 'Max Characters: ';
//MSG_KEY['FMS_COM_ALT110'] = 'Value is too long! ';
//
//MSG_KEY['FMS_COM_CFMCON'] = 'Are you sure you want to Continue? ';  //CTN_CDP
//MSG_KEY['FMS_COM_CFMSAV'] = 'Do you want to Save? '; 
//MSG_KEY['FMS_COM_CFMDEL'] = 'Are you sure you want to Delete? ';
//MSG_KEY['FMS_COM_CFMCAN'] = 'Are you sure you want to Cancel? ';
//MSG_KEY['FMS_COM_CFMMOD'] = 'Do you want to Modify? ';
//MSG_KEY['FMS_COM_CFMNEW'] = 'Do you want to start a New? ';
//
//MSG_KEY['FMS_COM_NTYCOM'] = 'Completed! '*/;