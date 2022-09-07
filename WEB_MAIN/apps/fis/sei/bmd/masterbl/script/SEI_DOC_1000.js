var rtnary=new Array(1);
var callBackFunc = "";
var listIATAFirmEmpire='H448|V226|O305|D107|L778|L403|J633|R219|H867|V575|WAA2|HAB1|J781|O467|M377|T964|V096|R010|V419|U190|V956|V664|U161|H779|WAD6|J589|F057|C360|R321|U159|M784|I027|WAN2|SAD6|U147|Y302|K323|S806|Y874|H044|HAH0|W995|M761|J195|R036|J862'.split("|");//OFVFOUR-6995:[Binex-EDI] CFS EDI setup with Empire Warehouse
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        //formObj.submit();
		    submitForm();
	   break;
	   case "SEARCH":
		  if(formObj.s_ref_no.value == "" && formObj.s_mbl_no.value==""){
			  alert(getLabel('FMS_COM_ALT014'));
			  formObj.s_ref_no.focus();
			  return;
		  }
           formObj.f_cmd.value=SEARCH;
           //formObj.submit();
           submitForm();
       break;
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            sheetObj.DoSearch("./SEI_DOC_1000GS.clt", FormQueryString(formObj) );
       break;
       case "SEARCHLIST01":
           formObj.f_cmd.value=SEARCHLIST01;
           sheetObj2.DoSearch("./SEI_DOC_1000_1GS.clt", FormQueryString(formObj) );
      break;
       case "ROWADD":
      break;
       case "ADD":
    	   if (formObj.f_intg_bl_seq.value == "") {
    		  break; 
    	   }
    	   if(confirm(getLabel('FMS_COM_CFMSAV'))){
	    	   formObj.f_cmd.value=MODIFY;
	           //formObj.submit();  
	    	   submitForm();
    	   }
      break;
       case "PRINT":
        	formObj.file_name.value="Devanning_Segregation_01.mrd";
        	formObj.title.value="Devanning/Segregation";
			//Parameter Setting
        	var param='[' + formObj.f_intg_bl_seq.value + ']';	// [1]
        	param += '[' + formObj.f_remark.value + ']';			// [2]
			param += '[' + formObj.f_ofcLoclNm.value + ']';			// [3]
			param += '[' + formObj.f_email.value + ']';				// [4]
			param += '[' + formObj.f_cntr_info.value + ']';			// [5]
			param += '[' + formObj.f_usr_nm.value + ']';			// [6]
			param += '[' + formObj.mbl_to_cd.value + ']';			// [7]
			param += '[' + formObj.mbl_location_cd.value + ']';		// [8]
			param += '[' + formObj.f_ofc_cd.value + ']';			// [9]
			formObj.rd_param.value=param;
			formObj.rpt_biz_tp.value="OIM";
			formObj.rpt_biz_sub_tp.value="DS";
			formObj.rpt_trdp_cd.value=formObj.mbl_to_cd.value;
			popPOST(frm1, "RPT_RD_0010.clt", "popTest", 1025, 740);
	   break;
       case "DEVANING_REPORT":
       	formObj.file_name.value="Devanning_Segregation_02.mrd";
       	formObj.title.value="Devanning Report";
			//Parameter Setting
       	var param='[' + formObj.f_intg_bl_seq.value + ']';	// [1]
       	param += '[' + formObj.f_remark.value + ']';			// [2]
			param += '[' + formObj.f_ofcLoclNm.value + ']';			// [3]
			param += '[' + formObj.f_email.value + ']';				// [4]
			param += '[' + formObj.f_cntr_info.value + ']';			// [5]
			param += '[' + formObj.f_usr_nm.value + ']';			// [6]
			param += '[' + formObj.mbl_to_cd.value + ']';			// [7]
			param += '[' + formObj.mbl_location_cd.value + ']';		// [8]
			param += '[' + formObj.f_ofc_cd.value + ']';			// [9]
			formObj.rd_param.value=param;
			formObj.rpt_biz_tp.value="OIM";
			formObj.rpt_biz_sub_tp.value="DS";
			formObj.rpt_trdp_cd.value=formObj.mbl_to_cd.value;
			popPOST(frm1, "RPT_RD_0010.clt", "popTest", 1025, 740);
	   break;	   
		//CFS EDI 전송 
		case "SEND_EDI":
			if(frm1.cfs_firm_cd.value == "W199" || 
			   frm1.cfs_firm_cd.value == "E620" || 
			   frm1.cfs_firm_cd.value == "Z165" || 
			   frm1.cfs_firm_cd.value == "Y292" || 
			   frm1.cfs_firm_cd.value == "Z781" || 
			   frm1.cfs_firm_cd.value == "K980"	||
			   frm1.cfs_firm_cd.value == "H245"	||
			   // #6593 NEW JERSEY 신규 ST.GEORGE CFS LOCATION 추가
			   frm1.cfs_firm_cd.value == "F146" ||
			   frm1.cfs_firm_cd.value == "K737" ||//OFVFOUR-7379:[Binex] EDI setup with BARR Freight System
			   listIATAFirmEmpire.indexOf(frm1.cfs_firm_cd.value)>=0    //OFVFOUR-6995:[Binex-EDI] CFS EDI setup with Empire Warehouse
			) {
			
				var sht2=sheetObj2.GetSaveString(true);
				if(sheetObj.RowCount() == 0){
	       			alert("Please Check Data");
	       			return;
	       		}
			    formObj.f_cmd.value=COMMAND01;
			    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
			    	sheetObj.DoAllSave("./SEI_DOC_1000_1GS.clt", FormQueryString(formObj) +'&'+sht2, true);
			    }
			}
		break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
var isRun = true;
function loadPage() {
    var formObj=document.frm1;
    fnSetAutocompleteCallBack('mbl_to_nm', 'TO_PARTNER_POPLIST', 'LINER_POPLIST'); //Customer	
    fnSetAutocompleteCallBack('mbl_location_nm', 'TO_PARTNER_POPLIST', 'LINER_POPLIST'); 
	for(var i=0;isRun && i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
        
        if(i == (docObjects.length - 1)){
        	isRun = false;
        }
    }
	if(formObj.s_mbl_no.value != ""){
		doWork("SEARCHLIST");
	}
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
             (34, 0, 0, true);

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1};
             var headers = [ { Text:getLabel('SEI_COC_1000_HDR1_1'), Align:"Center"},
                         { Text:getLabel('SEI_COC_1000_HDR1_2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"rep_cmdt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Int",       Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",           KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt1",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"meas",              KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:100,   Align:"Right",   ColMerge:1,   SaveName:"meas1",             KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"fnl_dest_loc_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"it_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pol_ams_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pol_iata_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pol_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pod_ams_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pod_iata_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pod_nm",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cnee_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cnee_trdp_addr",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"shpr_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ntfy_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cust_ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fdest_ams_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fdest_un_loc_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"seal_no1",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ams_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"pck_ut_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"eta_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"etd_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lnr_scac_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mk_txt",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"desc_txt",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 } ];
              
             InitColumns(cols);

             SetEditable(0);
             SetHeaderRowHeight(21);
             SetSheetHeight(200);
             resizeSheet();
           }                                                      
         break;
         case 2:      //IBSheet2 init
             with (sheetObj) {
             (5, 0, 0, true);

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('SEI_COC_1000_HDR2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cntr_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"seal_no1",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cntr_list_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"cntr_intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 } ];
              
             InitColumns(cols);

             SetEditable(0);
            }                                                      
            break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0],190);
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
	}

function sheet2_OnSort(sheetObj, col, sortArrow) {
	 sheetObj.SetSelectRow(sheetObj.HeaderRows());
	}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var rowCnt=0;
	var qtyTot=0;
	var wgtTot=0;
	var wgtTot1=0;
	var measTot=0;
	var measTot1=0;
	for(var i=2; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(2,"intg_bl_seq") != "" && sheetObj.GetCellValue(2,"intg_bl_seq") != undefined){
			qtyTot   += Number(sheetObj.GetCellValue(i, "pck_qty"));
			wgtTot   += Number(sheetObj.GetCellValue(i, "grs_wgt"));
			wgtTot1  += Number(sheetObj.GetCellValue(i, "grs_wgt1"));
			measTot  += Number(sheetObj.GetCellValue(i, "meas"));
			measTot1 += Number(sheetObj.GetCellValue(i, "meas1"));
			rowCnt   += 1;
		}
	}
	formObj.f_total.value=rowCnt+" record[s]";
	formObj.f_qty_tot.value=doMoneyFmt(qtyTot);
	formObj.f_wgt_tot.value=doMoneyFmt(roundXL(wgtTot,2));
	formObj.f_wgt1_tot.value=doMoneyFmt(roundXL(wgtTot1,2));
	formObj.f_meas_tot.value=doMoneyFmt(roundXL(measTot,4));
	formObj.f_meas1_tot.value=doMoneyFmt(roundXL(measTot1,4));
	formObj.f_mbl_pck_qty.value=qtyTot;	//sum of HBL qty=MBL qty
	formObj.f_mbl_grs_wgt.value=roundXL(wgtTot,1);	//sum of HBL wgt=MBL wgt
	formObj.f_mbl_meas.value=roundXL(measTot,4);	//sum of HBL meas=MBL meas
	doWork("SEARCHLIST01");
} 
function sheet2_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj2=docObjects[1];
	var cntr_no="";
	var seal_no="";
	var cntr_sz="";
	var cntr_cnt=1;
	for(var i=1;i<=sheetObj2.LastRow();i++){
		if(sheetObj2.GetCellValue(i, "cntr_no") != "" && sheetObj2.GetCellValue(i, "cntr_no") != undefined){
			cntr_no += sheetObj2.GetCellValue(i, "cntr_no");
			if(cntr_cnt < sheetObj2.LastRow()){
				cntr_no += ","
			}
		}
		if(sheetObj2.GetCellValue(i, "seal_no1") != "" && sheetObj2.GetCellValue(i, "seal_no1") != undefined){
			seal_no += sheetObj2.GetCellValue(i, "seal_no1");
			if(cntr_cnt < sheetObj2.LastRow()){
				seal_no += ","
			}
		}
		if(sheetObj2.GetCellValue(i, "cntr_tpsz_cd") != "" && sheetObj2.GetCellValue(i, "cntr_tpsz_cd") != undefined){
			cntr_sz += sheetObj2.GetCellValue(i, "cntr_tpsz_cd");
			if(cntr_cnt < sheetObj2.LastRow()){
				cntr_sz += ","
			}
		}
		cntr_cnt += 1;
	}
	formObj.f_cntr_no.value=cntr_no;
	formObj.f_seal_no.value=seal_no;
	formObj.f_tpsz_no.value=cntr_sz;
}
function openPopUp(popName, curObj){
	var formObj=document.frm1;
	try {
		switch(popName) {
			case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
	   			rtnary[0]="S"; //S=해운에서 오픈, A=항공에서 오픈
	   			rtnary[1]="I"; //I: In-bound, O: Out-bound
	   			callBackFunc = "MBL_POPLIST";
		  	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
	        	
			break;			
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
	      		rtnary=new Array(1);
	      		rtnary[0]="S";
	   			rtnary[1]="I";
	   			callBackFunc = "REF_POPLIST";
		  	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
		  	    
	        break;
			case "TO_PARTNER_POPLIST":
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
//		   		rtnary[1]=formObj.mbl_to_nm.value;
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		
		   		callBackFunc = "TO_PARTNER_POPLIST";
		  	    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		  	    
	         break;
			case "TO_PARTNER_POPLIST_NAME":
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.mbl_to_nm.value;
		   		rtnary[2]=window;
		   		
		   		callBackFunc = "TO_PARTNER_POPLIST";
		  	    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		  	    
	         break;
			case "LOC_PARTNER_POPLIST":
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
//		   		rtnary[1]=formObj.mbl_location_nm.value;
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		
		   		callBackFunc = "LOC_PARTNER_POPLIST";
		  	    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		  	    
	         break;
			case "LOC_PARTNER_POPLIST_NAME":
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]=formObj.mbl_location_nm.value;
		   		rtnary[2]=window;
		   		
		   		callBackFunc = "LOC_PARTNER_POPLIST";
		  	    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
		  	    
	         break; 
		}
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e ); 
        }
	}
}
//화면 클리어
function clearAll(){
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
	frm1.f_remark.value="";
	sheetObj.RemoveAll();
}
//필수항목체크
function checkVal(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	return true;
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}
	var s_type="";
	
	if ( tmp == "onKeyDown" ) {
		if (event.keyCode == 13){
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+s_code, './GateServlet.gsl');
		}
	} else if ( tmp == "onBlur" ) {
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+s_code, './GateServlet.gsl');
	}else if ( tmp == "onChange" ) {
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode&s_code='+s_code, './GateServlet.gsl');
	}
	
	var formObj=document.frm1;
	
	if(s_code == ""){
		if(str == "toCd"){
			formObj.mbl_to_cd.value = "";
			formObj.mbl_to_nm.value = "";
			formObj.cfs_firm_cd.value = "";
			formObj.cfs_trdp_nm.value = "";
			formObj.cfs_lgl_addr.value = "";
			formObj.cfs_city_nm.value = "";
			formObj.cfs_zip_cd.value = "";
			formObj.cfs_state_cd.value = "";
		}else if(str == "locCd"){
			formObj.mbl_location_cd.value = "";
			formObj.mbl_location_nm.value = "";
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if (CODETYPE == "toCd") {
				formObj.mbl_to_cd.value=masterVals[0]; 
				formObj.mbl_to_nm.value=masterVals[3];//loc_nm
				formObj.mailTo.value=masterVals[19];//pic_eml
				formObj.cfs_firm_cd.value=masterVals[17];//FIRMS CODE
			}else if(CODETYPE == "locCd"){
				formObj.mbl_location_cd.value=masterVals[0]; 
				formObj.mbl_location_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if (CODETYPE == "toCd") {
				formObj.mbl_to_cd.value=""; 
				formObj.mbl_to_nm.value="";//loc_nm
				formObj.mailTo.value="";//pic_eml
				formObj.cfs_firm_cd.value="";//FIRMS CODE
			}else if(CODETYPE == "locCd"){
				formObj.mbl_location_cd.value=""; 
				formObj.mbl_location_nm.value="";//loc_nm				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function MBL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_mbl_no.value=rtnValAry[0];//house_bl_no
		formObj.s_ref_no.value=rtnValAry[2];
		if(formObj.s_mbl_no.value != ""){
			doWork('SEARCH');	
		}
	}
}

function REF_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_mbl_no.value=rtnValAry[0];//house_bl_no
		formObj.s_ref_no.value=rtnValAry[2];		
		if(formObj.s_ref_no.value != ""){
			doWork('SEARCH');	
		}
	}
}

function TO_PARTNER_POPLIST(rtnVal){
   	var formObj=document.frm1;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.mbl_to_cd.value=rtnValAry[0];//trdp_cd
		formObj.mbl_to_nm.value=rtnValAry[2];//eng_nm
		formObj.mailTo.value=rtnValAry[6];//pic_eml
		formObj.cfs_firm_cd.value=rtnValAry[22];//FIRMS CODE
	}
   }

function LOC_PARTNER_POPLIST(rtnVal){
   	var formObj=document.frm1;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.mbl_location_cd.value=rtnValAry[0];//trdp_cd
		formObj.mbl_location_nm.value=rtnValAry[2];//eng_nm
	}
   }

function submitForm(){
	var formObj=document.frm1;
	doShowProcess();
	$.ajax({
		   type: "POST",
		   url: "./SEI_DOC_1000AJ.clt",
		   dataType: 'xml',
		   data: $("form" ).serialize(),
		   success: function(data){
			   setFieldValue( formObj.f_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.f_cntr_info, $('cntr_info',data).text());
			   setFieldValue( formObj.intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.mailTo, $('pic_eml',data).text());
			   setFieldValue( formObj.s_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.s_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.s_mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.s_intg_bl_seq, $('intg_bl_seq',data).text());
			   setFieldValue( formObj.mbl_to_cd, $('cfs_trdp_cd',data).text());
			   setFieldValue( formObj.mbl_to_nm, $('cfs_trdp_nm',data).text());
			   setFieldValue( formObj.cfs_firm_cd, $('cfs_firm_cd',data).text());
			   setFieldValue( formObj.cfs_trdp_nm, $('cfs_trdp_nm',data).text());
			   setFieldValue( formObj.cfs_lgl_addr, $('cfs_lgl_addr',data).text());
			   setFieldValue( formObj.cfs_city_nm, $('cfs_city_nm',data).text());
			   setFieldValue( formObj.cfs_zip_cd, $('cfs_zip_cd',data).text());
			   setFieldValue( formObj.cfs_state_cd, $('cfs_state_cd',data).text());
			   setFieldValue( formObj.mbl_ref_no, $('ref_no',data).text());
			   setFieldValue( formObj.mbl_location_cd, $('cy_trdp_cd',data).text());
			   setFieldValue( formObj.mbl_location_nm, $('cy_trdp_nm',data).text());
			   setFieldValue( formObj.mbl_vsl, $('trnk_vsl_nm',data).text());
			   setFieldValue( formObj.mbl_voy, $('trnk_voy',data).text());
			   setFieldValue( formObj.mbl_no, $('mbl_no',data).text());
			   setFieldValue( formObj.mbl_it_no, $('mbl_it_no',data).text());
			   setFieldValue( formObj.f_remark, $('rmk_dev',data).text());
			   
			   if(formObj.f_cmd.value == MODIFY){
				   showCompleteProcess();
			   }
			   doBtnAuthority(attr_extension);
			   loadPage();
		       setSelect();
			   
			   doHideProcess();
		   },
		   error: function(){
			   doHideProcess();
			   alert("System Error!");
		   }
		 });
}