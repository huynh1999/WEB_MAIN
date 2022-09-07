function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
       		//sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            
            //<!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	              			
        	if (OFC_FRT_YN == "Y"){ 
        		//Office select 보임 처리
        		getObj("table_ofc_frt").style.display = 'inline';        		
        		
        	    if (formObj.f_ofc_cd.value == ""){ //Office가 All인 경우 컬럼 보이지 않도록 처리   
//        	    	docObjects[0].SetColHidden("ofc_frt_cd_nm",1);
//        	    	docObjects[0].SetColHidden("ofc_local_nm",1);
//        	    	docObjects[0].SetColHidden("ofc_tax_flg",1);
//        	    	docObjects[0].SetColHidden("ofc_tax_rate",1);
//        	    	docObjects[0].SetColHidden("ofc_wtax_rate",1);
//        	    	docObjects[0].SetColHidden("ofc_dflt_flg",1);
              	   //#1773 [PATENT] Freight Default Unit Option
        	    	docObjects[0].SetColHidden("fcl_dflt_aply_ut_cd", 1);
        	    	docObjects[0].SetColHidden("lcl_dflt_aply_ut_cd", 1);
        	    	docObjects[0].SetColHidden("air_dflt_aply_ut_cd", 1);
        	    	//#1774 [Split - 1] [PATENT] Freight Default Unit Option
        	    	docObjects[0].SetColHidden("sell_rat_amt", 1);
					docObjects[0].SetColHidden("buy_rat_amt", 1);
					
					//OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
					docObjects[0].SetColHidden("dc_rat_amt", 1);
        	    	
        	    	formObj.f_sea_dflt_aply_ut_cd.value = "";
        	    	formObj.f_air_dflt_aply_ut_cd.value = "";
        	    	
            		getObj("s_frt_unit").style.display = 'none';
            		getObj("s_frt_unit_sel").style.display = 'none';	
            		getObj("a_frt_unit").style.display = 'none';
            		getObj("a_frt_unit_sel").style.display = 'none';	
              	   
        	     }else{			    				//Office가 All이 아닌 경우 컬럼 보이도록 처리   
//        	        docObjects[0].SetColHidden("ofc_frt_cd_nm",0);
//        	       	docObjects[0].SetColHidden("ofc_local_nm",0);
//        	        docObjects[0].SetColHidden("ofc_tax_flg",0);
//        	        docObjects[0].SetColHidden("ofc_tax_rate",0);
//        	        docObjects[0].SetColHidden("ofc_wtax_rate",0);
//        	        docObjects[0].SetColHidden("ofc_dflt_flg",0);  
        	      //#1773 [PATENT] Freight Default Unit Option
        	    	docObjects[0].SetColHidden("fcl_dflt_aply_ut_cd", 0);
        	    	docObjects[0].SetColHidden("lcl_dflt_aply_ut_cd", 0);
        	    	docObjects[0].SetColHidden("air_dflt_aply_ut_cd", 0);
        	    	//#1774 [Split - 1] [PATENT] Freight Default Unit Option
        	    	docObjects[0].SetColHidden("sell_rat_amt", 0);
					docObjects[0].SetColHidden("buy_rat_amt", 0);
					
					//OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
					docObjects[0].SetColHidden("dc_rat_amt", 0);
        	    	
            		getObj("s_frt_unit").style.display = 'inline';
            		getObj("s_frt_unit_sel").style.display = 'inline';	
            		getObj("a_frt_unit").style.display = 'inline';
            		getObj("a_frt_unit_sel").style.display = 'inline';	
        	        
        	        //#1098 [BNX] INDIA 오피스 - 요구사항 항목
        	        if(tax_opt == 3){
        	        	docObjects[0].SetColHidden("ofc_tax_rate1",0);
        	        	docObjects[0].SetColHidden("ofc_tax_rate2",0);
        	        }else if(tax_opt == 2){
        	        	docObjects[0].SetColHidden("ofc_tax_rate1",0);
        	        	docObjects[0].SetColHidden("ofc_tax_rate2",1);
        	        }else{
        	        	docObjects[0].SetColHidden("ofc_tax_rate1",1);
        	        	docObjects[0].SetColHidden("ofc_tax_rate2",1);
        	        }
        	     }
              }else{
            	  formObj.f_ofc_cd.value ="";
              }
   	
            //검증로직
            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
             	sheetObj.DoSearch("MDM_MCM_0160GS.clt", FormQueryString(formObj) );
            }
            var intRows=sheetObj.LastRow() + 1;
            for ( var i=1 ; i < intRows ; i++ ) {
            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
            		sheetObj.SetCellEditable(i, "frt_cd",0);
            	} else {
            		sheetObj.SetCellEditable(i, "frt_cd",1);
            	}
            }
            //sheetObj.ShowDebugMsg = false;
       break;
       case "SEARCHLIST01":
           formObj.f_cmd.value=SEARCHLIST01;
           sheetObj2.DoSearch("MDM_MCM_0161GS.clt", FormQueryString(formObj) );
      break;
       
       case "NEW":
       break;
       case "ROWADD":
    	   	var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);
            sheetObj.SetCellValue(intRows, "use_flg","1");
            sheetObj.SetCellEditable(intRows, "seq",0);
            //sheetObj.CellImage(intRows, "frt_clss_cd") = 0;
       break;
       case "MODIFY":
       		if ( !fncGridCheck() ) return false;
            formObj.f_cmd.value=MODIFY;
            
            //#476 [unico] Billing Code selection either GNR or Operation Department Validation
            //Billing Code Validation 
            var valResult = billingCodeValidation(sheetObj);

            //#476 [unico] Billing Code selection either GNR or Operation Department Validation
            //Validation Logic에 해당하는 BillingCode가 있으면 Save 처리하지 않는다.
            if(valResult) {
            	break;
            }
            
            if(confirm(getLabel('FMS_COM_CFMSAV'))){
            	
            	var intRows=sheetObj.LastRow() + 1;
            	
            	if(GROSS_METHOD_IN_DC == "N"){
            		for(var i = 1; i < intRows; i++){
            			if(sheetObj.GetCellValue(i,"ibflag") == "I" || sheetObj.GetCellValue(i,"ibflag") == "U"){
            				sheetObj.SetCellValue(i,"gl_cd_prnr2",sheetObj.GetCellValue(i,"gl_cd_prnr"))
            			}
            		}
            	}
            	
                doProcess=true;
                sheetObj.DoSave("MDM_MCM_0160GS.clt", FormQueryString(formObj),"ibflag",false);
                
	            for ( var i=1 ; i < intRows ; i++ ) {
	            	if ( sheetObj.GetCellValue(i, "db_value") == "Y" ) {
	            		sheetObj.SetCellEditable(i, "frt_cd",0);
	            	} else {
	            		sheetObj.SetCellEditable(i, "frt_cd",1);
	            	}
	            }
            }
       break;
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
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
function loadPage() {

	var opt_key = "GROSS_METHOD_IN_DC";
	ajaxSendPost(setGrossMethodInDcReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl"); 
	//<!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
	var opt_key = "OFC_FRT_YN";
	ajaxSendPost(setOfcFrtynReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl"); 
	
	//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
	ajaxSendPost(setVat_rt_dp_cnt, "reqVal", "&goWhere=aj&bcKey=getVat_rt_dp_cnt&s_ofc_cd="+ofc_cd, "./GateServlet.gsl");

	//#1098 [BNX] INDIA 오피스 - 요구사항 항목
	ajaxSendPost(setTaxOpt, "reqVal", "&goWhere=aj&bcKey=getTaxOpt&s_ofc_cd="+ofc_cd, "./GateServlet.gsl");

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    //#1098 [BNX] INDIA 오피스 - 요구사항 항목
    if(tax_opt == 3){
    	docObjects[0].SetColHidden("tax_rate1",0);
    	docObjects[0].SetColHidden("tax_rate2",0);
    }else if(tax_opt == 2){
    	docObjects[0].SetColHidden("tax_rate1",0);
    	docObjects[0].SetColHidden("tax_rate2",1);
    }else{
    	docObjects[0].SetColHidden("tax_rate1",1);
    	docObjects[0].SetColHidden("tax_rate2",1);
    }
    doWork('SEARCHLIST');
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
           with(sheetObj){

           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

           var HDR1_1 = "MDM_MCM_0160_HDR1_1";
           
          // <!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
           if((GROSS_METHOD_IN_DC == "Y")&&(OFC_FRT_YN == "N")){
        	   HDR1_1 = "MDM_MCM_0160_HDR1_3";
           }
           if((GROSS_METHOD_IN_DC == "N")&&(OFC_FRT_YN == "Y")){
        	   HDR1_1 = "MDM_MCM_0160_HDR1_4";
           }
           if((GROSS_METHOD_IN_DC == "Y")&&(OFC_FRT_YN == "Y")){
        	   HDR1_1 = "MDM_MCM_0160_HDR1_5";
           }
           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel(HDR1_1), Align:"Center"},
                       { Text:getLabel('MDM_MCM_0160_HDR1_2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ 
                  {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_chk",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                  {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                  {Type:"Text",      Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:10 },
                  {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
                  {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_locl_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
                  {Type:"Combo",     Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"frt_curr",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pfmc_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"tax_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                //#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//                  {Type:"Int",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
                  {Type:"Float",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate",        KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
                  
                  //#1098 [BNX] INDIA 오피스 - 요구사항 항목
                  {Type:"Float",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate1",        KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
                  {Type:"Float",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate2",        KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
                  
//                  {Type:"Int",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"whld_tax_rate",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
                  {Type:"Float",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"whld_tax_rate",   KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
                  
                  {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_rev",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_rev",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:500 },
                  {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_cost",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_cost",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:500 },
                  {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_prnr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_prnr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                  {Type:"PopupEdit", Hidden:1, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_prnr2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_prnr2",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ar_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ap_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dc_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gnr_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oim_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oih_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aim_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aih_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oem_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oeh_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aem_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aeh_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"wms_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"frt_clss_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:30,  Align:"Center",  ColMerge:1,   SaveName:"srt_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
                  {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"dflt_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"Combo",     Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"frt_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		          // <!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
		          {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ofc_frt_cd_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		          {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ofc_local_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		          {Type:"Combo",     Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fcl_dflt_aply_ut_cd",    KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		          {Type:"Combo",     Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"lcl_dflt_aply_ut_cd",    KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		          {Type:"Combo",     Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"air_dflt_aply_ut_cd",    KeyField:0,   CalcLogic:"",   Format:"",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		          //<!--#1774 [Split - 1] [PATENT] Freight Default Unit Option  -->
		          {Type:"Float",     Hidden:1, Width:70,  Align:"Right",   ColMerge:1,   SaveName:"sell_rat_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",      PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		          {Type:"Float",     Hidden:1, Width:70,  Align:"Right",   ColMerge:1,   SaveName:"buy_rat_amt",     KeyField:0,   CalcLogic:"",   Format:"Float",      PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		          {Type:"Combo",     Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ofc_tax_flg",     KeyField:0,   CalcLogic:"",   Format:"",           PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		          {Type:"Float",     Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_tax_rate",    KeyField:0,   CalcLogic:"",   Format:"Float",      PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
		          {Type:"Float",     Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_tax_rate1",   KeyField:0,   CalcLogic:"",   Format:"Float",      PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
		          {Type:"Float",     Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_tax_rate2",   KeyField:0,   CalcLogic:"",   Format:"Float",      PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
		          {Type:"Float",     Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_wtax_rate",   KeyField:0,   CalcLogic:"",   Format:"Float",      PointCount:vat_rt_dp_cnt,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
		          {Type:"CheckBox",  Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"ofc_dflt_flg",    KeyField:0,   CalcLogic:"",   Format:"",           PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 }, 
				  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
				  
		   //OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
		   cols.push({Type:"Float",     Hidden:1, Width:70,  Align:"Right",   ColMerge:1,   SaveName:"dc_rat_amt",    KeyField:0,   CalcLogic:"",   Format:"Float",      PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },)
           //OFVFOUR-7745: [BNX-LA] Adding option to display order for Freight code in AR/AP Entry
		   cols.push({Type:"Int",     Hidden:0, Width:70,  Align:"Right",   ColMerge:1,   SaveName:"order_seq",    KeyField:0,   CalcLogic:"",   Format:"",    UpdateEdit:1,   InsertEdit:1,   EditLen:100 },)
           InitColumns(cols);
           
           SetEditable(1);
           sheetObj.SetDataLinkMouse("frt_clss_cd",1);
           sheetObj.SetColProperty("frt_clss_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
           sheetObj.SetColProperty("frt_curr", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
           sheetObj.SetColProperty("tax_flg", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
           sheetObj.SetColProperty("gl_cd_rev", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
           sheetObj.SetColProperty("gl_cd_cost", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
           sheetObj.SetColProperty("gl_cd_prnr", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
           sheetObj.SetColProperty("gl_cd_prnr2", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
           sheetObj.SetColProperty("frt_grp_cd", {ComboText:PARAM5_2, ComboCode:PARAM5_2} );
           
           sheetObj.SetColProperty("fcl_dflt_aply_ut_cd", {ComboText:PARAM6_1, ComboCode:PARAM6_2} );
           sheetObj.SetColProperty("lcl_dflt_aply_ut_cd", {ComboText:PARAM6_1, ComboCode:PARAM6_2} );
           sheetObj.SetColProperty("air_dflt_aply_ut_cd", {ComboText:PARAM7_1, ComboCode:PARAM7_2} );
            
			
            SetColProperty(0 ,"frt_cd" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
            SetColProperty(0 ,"frt_cd_nm" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
            
            if (MULTI_LANGUAGE == "N"){
            	SetColProperty(0 ,"frt_cd_locl_nm" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
            }
            SetColProperty(0 ,"gl_cd_rev" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
            SetColProperty(0 ,"gl_cd_cost" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
            SetColProperty(0 ,"gl_cd_prnr" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
            SetColProperty(0 ,"gl_cd_prnr2" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
            SetColProperty(0 ,"srt_seq" , {AcceptKeys:"N"});
            SetColProperty(0 ,"ofc_frt_cd_nm" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
            sheetObj.SetColProperty("ofc_tax_flg", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
            
            if(GROSS_METHOD_IN_DC == "Y"){
         	   SetColHidden("gl_cd_prnr2", 0);
         	   SetColHidden("gl_rmk_prnr2", 0);
            }
            
            //<!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
            if(OFC_FRT_YN == "Y"){
//           	    SetColHidden("ofc_frt_cd_nm",0);
//           	    SetColHidden("ofc_local_nm", 0);
//           	    SetColHidden("ofc_tax_flg", 	0);
//         	    SetColHidden("ofc_tax_rate", 0);
//         	    SetColHidden("ofc_tax_rate1", 0);
//         	    SetColHidden("ofc_tax_rate2", 0);
//         	    SetColHidden("ofc_wtax_rate",0);
//         	    SetColHidden("ofc_dflt_flg", 0);
         	    //#1773 [PATENT] Freight Default Unit Option
         	    SetColHidden("fcl_dflt_aply_ut_cd", 0);
         	    SetColHidden("lcl_dflt_aply_ut_cd", 0);
         	    SetColHidden("air_dflt_aply_ut_cd", 0);
         	    //#1774 [Split - 1] [PATENT] Freight Default Unit Option
         	    SetColHidden("sell_rat_amt", 0);
				SetColHidden("buy_rat_amt", 0);
				//OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
				SetColHidden("dc_rat_amt", 0);
          	  
            }
		   SetSheetHeight(460);
           resizeSheet();
           }
           break;
         case 2:      //IBSheet1 init
             with(sheetObj){
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var HDR2_1 = "MDM_MCM_0160_HDR2_1";
             
             if(GROSS_METHOD_IN_DC == "Y"){
            	 HDR2_1 = "MDM_MCM_0160_HDR2_3";
             }
             var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
             var headers = [ { Text:getLabel(HDR2_1), Align:"Center"},
                             { Text:getLabel('MDM_MCM_0160_HDR2_2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [    
                    {Type:"Date",      Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",        KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                    {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
                    {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"his_type",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
                         
                    {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                    {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
                    {Type:"Text",      Hidden:0, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"frt_cd_locl_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
                    {Type:"Combo",     Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"frt_curr",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"pfmc_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    
                    
                    {Type:"Combo",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"tax_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    //#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
//                    {Type:"Int",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
                    {Type:"Float",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate",        KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:vat_rt_dp_cnt,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
                    
                    //#1098 [BNX] INDIA 오피스 - 요구사항 항목
                    {Type:"Float",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate1",        KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:vat_rt_dp_cnt,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
                    {Type:"Float",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"tax_rate2",        KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:vat_rt_dp_cnt,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
                    
//                    {Type:"Int",       Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"whld_tax_rate",   KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                    {Type:"Float",       Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"whld_tax_rate",   KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:vat_rt_dp_cnt,   UpdateEdit:0,   InsertEdit:0,   EditLen:5 },
                    
                    {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_rev",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                    {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_rev",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:500 },
                    {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_cost",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                    {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_cost",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:500 },
                    {Type:"PopupEdit", Hidden:0, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_prnr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                    {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_prnr",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
                    {Type:"PopupEdit", Hidden:1, Width:65,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd_prnr2",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_rmk_prnr2",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ar_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"ap_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"dc_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gnr_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oim_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oih_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aim_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aih_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oem_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"oeh_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aem_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"aeh_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"wms_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"Combo",     Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"frt_clss_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"srt_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                    {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"CheckBox",  Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"dflt_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:0 },
                    {Type:"Combo",     Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"frt_grp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             InitColumns(cols);
             
             SetEditable(0);
             sheetObj.SetDataLinkMouse("frt_clss_cd",1);
             sheetObj.SetColProperty("frt_clss_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
             sheetObj.SetColProperty("frt_curr", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
             sheetObj.SetColProperty("tax_flg", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
             sheetObj.SetColProperty("gl_cd_rev", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
             sheetObj.SetColProperty("gl_cd_cost", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
             sheetObj.SetColProperty("gl_cd_prnr", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
             sheetObj.SetColProperty("gl_cd_prnr2", {ComboText:PARAM4_1, ComboCode:PARAM4_2} );
             sheetObj.SetColProperty("frt_grp_cd", {ComboText:PARAM5_2, ComboCode:PARAM5_2} );
              
  			
             SetColProperty(0 ,"frt_cd" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
             SetColProperty(0 ,"frt_cd_nm" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
              
             if (MULTI_LANGUAGE == "N"){
                 SetColProperty(0 ,"frt_cd_locl_nm" , {AcceptKeys:"E|N|[, .-~!@#$%^*()_+;:/?[]{}|\=<>&]" , InputCaseSensitive:1});
             }
             SetColProperty(0 ,"gl_cd_rev" ,  {AcceptKeys:"E|N" , InputCaseSensitive:1});
             SetColProperty(0 ,"gl_cd_cost" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
             SetColProperty(0 ,"gl_cd_prnr" , {AcceptKeys:"E|N" , InputCaseSensitive:1});
             SetColProperty(0 ,"gl_cd_prnr2", {AcceptKeys:"E|N" , InputCaseSensitive:1});
             SetColProperty(0 ,"srt_seq",     {AcceptKeys:"N"});
             if(GROSS_METHOD_IN_DC == "Y"){
           	     SetColHidden("gl_cd_prnr2", 0);
           	     SetColHidden("gl_rmk_prnr2", 0);
             }
  		     SetSheetHeight(200);
                 resizeSheet2();
             }
             sheetObj.SetFocusAfterProcess(0);
             break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}
function resizeSheet2() {
	ComResizeSheet(docObjects[1]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj = document.frm1;
    doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	for(var i=2; i<docObjects[0].RowCount()+2 ; i++ ){
		if(docObjects[0].GetCellValue(i, "tax_flg") == 'N'){
			docObjects[0].SetCellEditable(i, "tax_rate",0);
			docObjects[0].SetCellEditable(i, "whld_tax_rate",0);
			//sheetObj.SetCellValue(i, "pfmc_flg","0");
		}
		//<!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
		if(docObjects[0].GetCellValue(i, "ofc_tax_flg") == 'N'){
			docObjects[0].SetCellEditable(i, "ofc_tax_rate",0);
			docObjects[0].SetCellEditable(i, "ofc_wtax_rate",0);
			//sheetObj.SetCellValue(i, "pfmc_flg","0");
		}
		
		if(docObjects[0].GetCellValue(i, "gnr_flg")=='1'){
			docObjects[0].SetCellValue(i,"oim_flg",0 );
			docObjects[0].SetCellValue(i,"oih_flg",0 );
			docObjects[0].SetCellValue(i,"aim_flg",0 );
			docObjects[0].SetCellValue(i,"aih_flg",0 );
			docObjects[0].SetCellValue(i,"oem_flg",0 );
			docObjects[0].SetCellValue(i,"oeh_flg",0 );
			docObjects[0].SetCellValue(i,"aem_flg",0 );
			docObjects[0].SetCellValue(i,"aeh_flg",0 );
			docObjects[0].SetCellValue(i,"wms_flg",0 );

			docObjects[0].SetCellEditable(i,"oim_flg",0 );
			docObjects[0].SetCellEditable(i,"oih_flg",0 );
			docObjects[0].SetCellEditable(i,"aim_flg",0 );
			docObjects[0].SetCellEditable(i,"aih_flg",0 );
			docObjects[0].SetCellEditable(i,"oem_flg",0 );
			docObjects[0].SetCellEditable(i,"oeh_flg",0 );
			docObjects[0].SetCellEditable(i,"aem_flg",0 );
			docObjects[0].SetCellEditable(i,"aeh_flg",0 );
			docObjects[0].SetCellEditable(i,"wms_flg",0 );
		}
		//5603 [Ocean Blue] Billing code Prmc check validation
		if(docObjects[0].GetCellValue(i, "use_flg")=='0'){
			for(var j=0; j<docObjects[0].LastCol(); j++){
				if(docObjects[0].ColSaveName(j) != "use_flg" && docObjects[0].GetColHidden(j) == 0){
					docObjects[0].SetCellEditable(i, j, 0);
				}
			}				
		}
		
	}
	docObjects[1].RemoveAll();
	/*var as = docObjects[0].GetCellValue(2, "frt_cd");
	if(as != ''){
		formObj.frt_cd_s.value = docObjects[0].GetCellValue(2, "frt_cd");
		doWork('SEARCHLIST01');
	}*/
} 
function sheet2_OnSearchEnd(){
	for(var i=2; i<docObjects[1].RowCount()+2 ; i++ ){
	}
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		var formObj = document.frm1;
	    doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
		for(var i=2; i<docObjects[0].RowCount()+2 ; i++ ){
			if(docObjects[0].GetCellValue(i, "tax_flg") == 'N'){
				docObjects[0].SetCellEditable(i, "tax_rate",0);
				docObjects[0].SetCellEditable(i, "whld_tax_rate",0);
				//sheetObj.SetCellValue(i, "pfmc_flg","0");
			}
			//<!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
			if(docObjects[0].GetCellValue(i, "ofc_tax_flg") == 'N'){
				docObjects[0].SetCellEditable(i, "ofc_tax_rate",0);
				docObjects[0].SetCellEditable(i, "ofc_wtax_rate",0);
				//sheetObj.SetCellValue(i, "pfmc_flg","0");
			}
			
			if(docObjects[0].GetCellValue(i, "gnr_flg")=='1'){
				docObjects[0].SetCellValue(i,"oim_flg",0 );
				docObjects[0].SetCellValue(i,"oih_flg",0 );
				docObjects[0].SetCellValue(i,"aim_flg",0 );
				docObjects[0].SetCellValue(i,"aih_flg",0 );
				docObjects[0].SetCellValue(i,"oem_flg",0 );
				docObjects[0].SetCellValue(i,"oeh_flg",0 );
				docObjects[0].SetCellValue(i,"aem_flg",0 );
				docObjects[0].SetCellValue(i,"aeh_flg",0 );
				docObjects[0].SetCellValue(i,"wms_flg",0 );

				docObjects[0].SetCellEditable(i,"oim_flg",0 );
				docObjects[0].SetCellEditable(i,"oih_flg",0 );
				docObjects[0].SetCellEditable(i,"aim_flg",0 );
				docObjects[0].SetCellEditable(i,"aih_flg",0 );
				docObjects[0].SetCellEditable(i,"oem_flg",0 );
				docObjects[0].SetCellEditable(i,"oeh_flg",0 );
				docObjects[0].SetCellEditable(i,"aem_flg",0 );
				docObjects[0].SetCellEditable(i,"aeh_flg",0 );
				docObjects[0].SetCellEditable(i,"wms_flg",0 );
			}
			//5603 [Ocean Blue] Billing code Prmc check validation
			if(docObjects[0].GetCellValue(i, "use_flg")=='0'){
				for(var j=0; j<docObjects[0].LastCol(); j++){
					if(docObjects[0].ColSaveName(j) != "use_flg" && docObjects[0].GetColHidden(j) == 0){
						docObjects[0].SetCellEditable(i, j, 0);
					}
				}				
			}
			
		}
		docObjects[1].RemoveAll();
		showCompleteProcess();
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheetObj.ColSaveName(Col) == "frt_cd"){
		if(sheetObj.GetCellValue(Row, "ibflag") != 'I'){
		    var formObj = document.frm1;
		    formObj.frt_cd_s.value = docObjects[0].GetCellValue(Row, "frt_cd");
		    doWork('SEARCHLIST01');
		}
	}
}
var cur_row;
var cur_col;
var rtnary=new Array(1);
var callBackFunc = "";
function sheet1_OnPopupClick(sheetObj, row, col){
	//GLCODE POPUP을 호출한다.
	rtnary=new Array(4);
	rtnary[0]="1";
	rtnary[1]="";
	rtnary[2]="";
	rtnary[3]="Y";
	cur_row = row;
	cur_col = col;
	callBackFunc = "CMM_POP_0260";
	modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
}

function CMM_POP_0260(rtnVal){
	var sheetObj = docObjects[0];
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_row, sheetObj.ColSaveName(cur_col).replaceAll("_rmk_", "_cd_"), rtnValAry[0], 0);
		sheetObj.SetCellValue(cur_row, sheetObj.ColSaveName(cur_col).replaceAll("_cd_", "_rmk_"), rtnValAry[1], 0);
	}
	sheetObj.SelectCell(cur_row, cur_col+1, 0);
}

function sheet1_OnKeyDown(sheetObj, Row, Col, KeyCode){
	cur_row = Row;
	cur_col = Col;
	var colStr=sheetObj.ColSaveName(Col);
	if(KeyCode==13 && (colStr == "gl_cd_rev" || colStr == "gl_rmk_rev" || colStr == "gl_cd_cost" || colStr == "gl_rmk_cost" || colStr == "gl_cd_prnr" || colStr == "gl_rmk_prnr" || colStr == "gl_cd_prnr2" || colStr == "gl_rmk_prnr2")){
		sheetObj.SelectCell(Row, Col);
		rtnary=new Array(2);
		rtnary[0]="GLRMK";
		rtnary[1]=sheetObj.GetCellValue(Row, colStr.replaceAll("_cd_", "_rmk_"));
		rtnary[2]="";
		rtnary[3]="Y";
		callBackFunc = "CMM_POP_0260_2";
   		modal_center_open('./CMM_POP_0260.clt', rtnary, 658,450,"yes");
	}
}

function CMM_POP_0260_2(rtnVal){
	var sheetObj = docObjects[0];
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_row, sheetObj.ColSaveName(cur_col).replaceAll("_rmk_", "_cd_"),rtnValAry[0], 0);
		sheetObj.SetCellValue(cur_row, sheetObj.ColSaveName(cur_col).replaceAll("_cd_", "_rmk_"), rtnValAry[1], 0);
	}
	sheetObj.SelectCell(cur_row, cur_col+1, 0);
}

/**
 * 콤보 조회
 */
function doAction(frt_cd){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchFreightKeyCode&s_frt_cd='+frt_cd, './GateServlet.gsl');
}
//확인 Ajax
function dispAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//[Freight Code] is duplicated!
			alert(getLabel('FMS_COM_ALT008') + "\n - " + getLabel('FMS_COD_FRET') + getLabel('FMS_COD_CODE') + ": " + doc[1]);
			var sheetObj=docObjects[0];
			var intRow=sheetObj.LastRow();
			sheetObj.SetCellValue(intRow, "frt_cd","");
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));
	}
}
function sheet1_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(Col)) {

		//#476 [unico] Billing Code selection either GNR or Operation Department Validation
		case "gnr_flg" :
			if(Value == 1 ) {
				sheetObj.SetCellValue(Row,"oim_flg",0 );
				sheetObj.SetCellValue(Row,"oih_flg",0 );
				sheetObj.SetCellValue(Row,"aim_flg",0 );
				sheetObj.SetCellValue(Row,"aih_flg",0 );
				sheetObj.SetCellValue(Row,"oem_flg",0 );
				sheetObj.SetCellValue(Row,"oeh_flg",0 );
				sheetObj.SetCellValue(Row,"aem_flg",0 );
				sheetObj.SetCellValue(Row,"aeh_flg",0 );
				sheetObj.SetCellValue(Row,"wms_flg",0 );

				sheetObj.SetCellEditable(Row,"oim_flg",0 );
				sheetObj.SetCellEditable(Row,"oih_flg",0 );
				sheetObj.SetCellEditable(Row,"aim_flg",0 );
				sheetObj.SetCellEditable(Row,"aih_flg",0 );
				sheetObj.SetCellEditable(Row,"oem_flg",0 );
				sheetObj.SetCellEditable(Row,"oeh_flg",0 );
				sheetObj.SetCellEditable(Row,"aem_flg",0 );
				sheetObj.SetCellEditable(Row,"aeh_flg",0 );
				sheetObj.SetCellEditable(Row,"wms_flg",0 );
			} else if(Value == 0 ) {
				sheetObj.SetCellEditable(Row,"oim_flg",1 );
				sheetObj.SetCellEditable(Row,"oih_flg",1 );
				sheetObj.SetCellEditable(Row,"aim_flg",1 );
				sheetObj.SetCellEditable(Row,"aih_flg",1 );
				sheetObj.SetCellEditable(Row,"oem_flg",1 );
				sheetObj.SetCellEditable(Row,"oeh_flg",1 );
				sheetObj.SetCellEditable(Row,"aem_flg",1 );
				sheetObj.SetCellEditable(Row,"aeh_flg",1 );
				sheetObj.SetCellEditable(Row,"wms_flg",1 );
			}
		break;
			
		case "frt_cd" :
			var strCd=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strCd.toUpperCase());
			doAction(sheetObj.GetCellValue(Row, Col));
		break;
		case "frt_cd_nm" :
			var strPckNm=sheetObj.GetCellValue(Row, Col);
			sheetObj.SetCellValue(Row, Col,strPckNm.toUpperCase());
		break;
		case "tax_flg" :
			var taxFlg=sheetObj.GetCellValue(Row, Col);
			if(taxFlg == 'Y'){
				sheetObj.SetCellEditable(Row, "tax_rate",1);
				sheetObj.SetCellEditable(Row, "whld_tax_rate",1);
			}else{
				sheetObj.SetCellValue(Row, "tax_rate",0);
				sheetObj.SetCellValue(Row, "whld_tax_rate",0);
				sheetObj.SetCellEditable(Row, "tax_rate",0);
				sheetObj.SetCellEditable(Row, "whld_tax_rate",0);
			}
		break;
		case "tax_rate" :
			var taxRate=sheetObj.GetCellValue(Row, Col);
			if(taxRate < 0){
				alert(getLabel('FMS_COM_ALT042'));
				sheetObj.SetCellValue(Row, "tax_rate", 0, 0);
			}
		break;
		case "whld_tax_rate" :
			var whldTaxRate=sheetObj.GetCellValue(Row, Col);
			if(whldTaxRate > 0){
				alert(getLabel('FMS_COM_ALT081'));
				sheetObj.SetCellValue(Row, "whld_tax_rate", 0, 0);
			}
		break;
		//<!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
		case "ofc_tax_flg" :
			var ofctaxFlg=sheetObj.GetCellValue(Row, Col);
			if(ofctaxFlg == 'Y'){
				sheetObj.SetCellEditable(Row, "ofc_tax_rate",1);
				sheetObj.SetCellEditable(Row, "ofc_wtax_rate",1);
			}else{
				sheetObj.SetCellValue(Row, "ofc_tax_rate",0);
				sheetObj.SetCellValue(Row, "ofc_wtax_rate",0);
				sheetObj.SetCellEditable(Row, "ofc_tax_rate",0);
				sheetObj.SetCellEditable(Row, "ofc_wtax_rate",0);
			}
		break;
		case "ofc_tax_rate" :
			var ofctaxRate=sheetObj.GetCellValue(Row, Col);
			if(ofctaxRate < 0){
				alert(getLabel('FMS_COM_ALT042'));
				sheetObj.SetCellValue(Row, "ofc_tax_rate", 0, 0);
			}
		break;
		case "ofc_wtax_rate" :
			var ofcwhldTaxRate=sheetObj.GetCellValue(Row, Col);
			if(ofcwhldTaxRate > 0){
				alert(getLabel('FMS_COM_ALT081'));
				sheetObj.SetCellValue(Row, "ofc_wtax_rate", 0, 0);
			}
		break;
		case "gl_cd_rev" :
		case "gl_cd_cost" :
		case "gl_cd_prnr" :
		case "gl_cd_prnr2" :
			SELECTROW=Row;
			// GL NO에 매핑되어있는 BANK 정보를 가져온다.
			ajaxSendPost(searchGlBankInfo, sheetObj.ColSaveName(Col), '&goWhere=aj&bcKey=searchGlBankInfo&gl_no='+Value+'&gl_rmk='+sheetObj.GetCellValue(Row, Col+1)+'&block_all_yn=Y', './GateServlet.gsl');
		break;
		case "del_chk":
			if (sheetObj.GetCellValue(Row, "del_chk") == 1) {
				alert(getLabel('FMS_COM_ALT162'));
				sheetObj.SetCellValue(Row, "del_chk", 0);
		}
		break;		
		//#5603 [Ocean Blue] Billing code Prmc check validation
		case "use_flg":		
			if(Value==0){
				for(var j=0; j<sheetObj.LastCol(); j++){
					if(sheetObj.ColSaveName(j) != "use_flg" && sheetObj.GetColHidden(j) == 0){
						sheetObj.SetCellEditable(Row, j, 0);
					}
				}				
			}else{
				for(var j=0; j<sheetObj.LastCol(); j++){
					if(sheetObj.GetColHidden(j) == 0 && sheetObj.GetCellProperty(Row,j, 'UpdateEdit') == 1 ){
						sheetObj.SetCellEditable(Row, j, 1);
					}
					//ofc_tax_flg
					var ofctaxFlg=sheetObj.GetCellValue(Row, 'ofc_tax_flg');
					if(Value == 0 ){
						sheetObj.SetCellEditable(Row, "ofc_tax_rate",0);
						sheetObj.SetCellEditable(Row, "ofc_wtax_rate",0);
					}
					//taxFlg
					var taxFlg=sheetObj.GetCellValue(Row, "tax_flg");
					if(Value == 0){
						sheetObj.SetCellEditable(Row, "tax_rate",0);
						sheetObj.SetCellEditable(Row, "whld_tax_rate",0);
					}
					//gnr_flg
					var gnr_flg=sheetObj.GetCellValue(Row, "gnr_flg");
					if(gnr_flg == 1 ) {					
						sheetObj.SetCellEditable(Row,"oim_flg",0 );
						sheetObj.SetCellEditable(Row,"oih_flg",0 );
						sheetObj.SetCellEditable(Row,"aim_flg",0 );
						sheetObj.SetCellEditable(Row,"aih_flg",0 );
						sheetObj.SetCellEditable(Row,"oem_flg",0 );
						sheetObj.SetCellEditable(Row,"oeh_flg",0 );
						sheetObj.SetCellEditable(Row,"aem_flg",0 );
						sheetObj.SetCellEditable(Row,"aeh_flg",0 );
						sheetObj.SetCellEditable(Row,"wms_flg",0 );
					}
				}
			}
		break;
	}
}
function searchGlBankInfo(reqVal, colSaveName) {
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	if (doc[0] == "OK") {
		if (typeof(doc[1]) != "undefined") {
			//조회해온 결과를 setting
			var rtnArr=doc[1].split('^@');
			sheetObj.SetCellValue(SELECTROW, colSaveName,rtnArr[2],0);
			sheetObj.SetCellValue(SELECTROW, colSaveName.replaceAll("_cd_", "_rmk_"),rtnArr[3],0);
		} else {
			sheetObj.SetCellValue(SELECTROW, colSaveName,"",0);
			sheetObj.SetCellValue(SELECTROW, colSaveName.replaceAll("_cd_", "_rmk_"),"",0);
		}
	} else {
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.LastRow() + 1;
	for( var i=1 ; i < intRow ; i++ ) {
        if( trim(sheetObj.GetCellValue(i, "frt_cd")) == "" || sheetObj.GetCellValue(i, "frt_cd") == null){
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_BILL') + getLabel('FMS_COD_CODE'));
			return false;
		}
	}
	var dupRow=sheetObj.ColValueDup("frt_cd");
	if(dupRow > 0){
		alert(getLabel('MDM_COM_ALT004'));
		return false;
	}
	return true;
}
function fncSearch(sFlag,keyCode) {
	if (sFlag != "" && sFlag != "undefined" && sFlag != undefined) {
	 	ComKeyOnlyAlphabet(sFlag,keyCode);
	}
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}

var GROSS_METHOD_IN_DC = "N";
var OFC_FRT_YN = "N";

// #50476 - [BNX] Agent Credit 계정 분리
function setGrossMethodInDcReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="Y") {
			GROSS_METHOD_IN_DC = "Y";
		}
	}
}

//<!--#828 [EH] Office 별 Billing Code Name, VAT, Default New -->	
function setOfcFrtynReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1]=="Y") {
			OFC_FRT_YN = "Y";
		}
	}
}
function setVat_rt_dp_cnt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		var spValue = doc[1].split("^@@^");
		vat_rt_dp_cnt = spValue[0];
		xch_rt_dp_cnt = spValue[1];
	}
}


function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="dflt_flg"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}

var tax_opt = 0;
function setTaxOpt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		tax_opt = doc[1];
	}
}


/**
 * @param sheetObj
 * @returns
 * #476 [unico] Billing Code selection either GNR or Operation Department Validation
 */
function billingCodeValidation(sheetObj){
    // Update : Warning message - MDM_COM_CFMSAVEFRT
    var msgFlg = false;
    var ttlRow=sheetObj.LastRow() + 1;
    
    var msgVal = '';
    var msgValFlg = false;
  
    var frtCdRevenue = [];
    var frtCdCost = [];
    var frtCdCRDB = [];
    var frtCdDebit = [];
    var frtCdCredit = [];
    
    for(var i = 1; i < ttlRow; i++){
    	//#5603 [Ocean Blue] Billing code 화면 Pfmc check 시 validation 문제
    	if(sheetObj.GetCellValue(i,"use_flg") == 0){
    		continue;
    	}
    	//변경된 항목 있나 체크해 Save 전에 batch Process 관련 alert message 발생
    	if(sheetObj.GetCellValue(i,"ibflag") == "U" || sheetObj.GetCellValue(i,"ibflag") == "D"){
    		msgFlg = true;
    	}
		
    	//AR 체크 되어 있고 revenue GL 없는 Billing codes 
    	if(sheetObj.GetCellValue(i,"ibflag") != "D") {
    		if(sheetObj.GetCellValue(i,"ar_flg") == 1 
    				&& (sheetObj.GetCellValue(i,"gl_cd_rev")==""||sheetObj.GetCellValue(i,"gl_rmk_rev")=="")){
    			frtCdRevenue[frtCdRevenue.length] = sheetObj.GetCellValue(i,"frt_cd");
    			msgValFlg = true;
    		}
    	}
		
		
    	//AP 체크 되어 있고 cost GL 없는 Billing codes 
    	if(sheetObj.GetCellValue(i,"ibflag") != "D"){
    		if(sheetObj.GetCellValue(i,"ap_flg") == 1 
    				&& (sheetObj.GetCellValue(i,"gl_cd_cost")==""||sheetObj.GetCellValue(i,"gl_rmk_cost")=="")){
    			frtCdCost[frtCdCost.length] = sheetObj.GetCellValue(i,"frt_cd");
    			msgValFlg = true;
    		}
    	}
		
		
    	//D/C 체크 되어 있고 debit GL 없는 Billing codes 
    	if(sheetObj.GetCellValue(i,"ibflag") != "D"){
    		if(sheetObj.GetCellValue(i,"dc_flg") == 1 
    				&& (sheetObj.GetCellValue(i,"gl_cd_prnr")==""||sheetObj.GetCellValue(i,"gl_rmk_prnr")=="")){
    			frtCdDebit[frtCdDebit.length] = sheetObj.GetCellValue(i,"frt_cd");
    			msgValFlg = true;
    		}
    	}
		
    	//D/C 체크 되어 있고, Credit 계정 분리된 경우 
    	if(sheetObj.GetCellValue(i,"ibflag") != "D"){
        	if(GROSS_METHOD_IN_DC == 'Y') {
        		if(sheetObj.GetCellValue(i,"dc_flg") == 1 
        				&& (sheetObj.GetCellValue(i,"gl_cd_prnr2")==""||sheetObj.GetCellValue(i,"gl_rmk_prnr2")=="")){
        			frtCdCredit[frtCdCredit.length] = sheetObj.GetCellValue(i,"frt_cd");
        			msgValFlg = true;
        		}
    		}
    	}
    }
    

    if(msgValFlg){
    	//AR 체크 되어 있고 revenue GL 없는 Billing codes 
    	if (frtCdRevenue.length > 0) {
    		var frtCdRevenueList = '\n';
    			frtCdRevenue.forEach(function(value, index, arr) {
    				frtCdRevenueList = frtCdRevenueList + value + '\n';
    			});
    		msgVal = msgVal + getLabel('FMS_COM_ALT121') + frtCdRevenue.length + getLabel('FMS_COM_ALT120') 
    		+ frtCdRevenueList + '\n';
    	}
    	
    	//AP 체크 되어 있고 cost GL 없는 Billing codes 	        	
    	if (frtCdCost.length > 0) {
    		var frtCdCostList = '\n';    	
    		frtCdCost.forEach(function(value, index, arr) {
    			frtCdCostList = frtCdCostList + value + '\n';
			});
    		msgVal = msgVal + getLabel('FMS_COM_ALT122') + frtCdCost.length + getLabel('FMS_COM_ALT120') 
    		+ frtCdCostList + '\n';
    	}
    	//D/C 체크 되어 있고 debit GL 없는 Billing codes	        	
    	if(frtCdDebit.length > 0) {
    		var frtCdDebitList = '\n'; 
    		frtCdDebit.forEach(function(value, index, arr) {
    			frtCdDebitList = frtCdDebitList + value + '\n';
			});
        	if(GROSS_METHOD_IN_DC == 'Y') {
        		msgVal = msgVal + getLabel('FMS_COM_ALT123') + frtCdDebit.length + getLabel('FMS_COM_ALT120') 
        		+ frtCdDebitList + '\n';
        	} else if(GROSS_METHOD_IN_DC == 'N'){
        		msgVal = msgVal + getLabel('FMS_COM_ALT124') + frtCdDebit.length + getLabel('FMS_COM_ALT120') 
        		+ frtCdDebitList + '\n';
        	}
    	}
    	//D/C 체크 되어 있고, Credit 계정 분리된 경우
    	if (frtCdCredit.length > 0) {
    		var frtCdCreditList = '\n'; 
    		frtCdCredit.forEach(function(value, index, arr) {
    			frtCdCreditList = frtCdCreditList + value + '\n';
			});
    		msgVal = msgVal + getLabel('FMS_COM_ALT125') + frtCdCredit.length + getLabel('FMS_COM_ALT120') 
    		+ frtCdCreditList  + '\n';
    	}
    	
    	//Validation Logic에 해당하는 Billing Codes List를 보여줌.
    	alert(trim(msgVal));


    } else if(msgFlg){
       	//변경된 항목 있을 경우, batch Process 관련 alert message 발생
    	alert(getLabel('MDM_COM_CFMSAVEFRT'));
    }
    return msgValFlg;
}