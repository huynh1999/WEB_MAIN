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
            formObj.f_cmd.value=SEARCHLIST; 
            sheetObj.DoSearch("SAL_TFM_0080GS.clt", FormQueryString(formObj) );            
            break;
            
       case "SEARCHLIST01":
           formObj.f_cmd.value=SEARCHLIST01;
           sheetObj2.DoSearch("SAL_TFM_0080_1GS.clt", FormQueryString(formObj) );
           break;
       
       case "ROWADD":
    	   	var intRows=sheetObj.LastRow() + 1;
            sheetObj.DataInsert(intRows);  
            sheetObj.SetCellEditable(intRows, 'chk',0);
            break;  
            
       case "MODIFY":      		
            formObj.f_cmd.value=MODIFY;
            if(confirm(getLabel('FMS_COM_CFMSAV'))){            	            	
                doProcess=true;
                sheetObj.DoSave("SAL_TFM_0080GS.clt", FormQueryString(formObj),"ibflag",false);               	            
            }
            break;
            
       case "CONFIRM":    	   
			if (checkValue()) {
				if(confirm(getLabel('FMS_COM_CFMCFM'))){
					formObj.f_cmd.value=COMMAND01;		   	
			    	//doProcess=true;					
			    	docObjects[0].SetCellValue(docObjects[0].GetSelectRow(), 'rt_sts_cd', 'CF');
			        sheetObj.DoSave("SAL_TFM_0080GS.clt", FormQueryString(formObj),"ibflag",false);
				}
			}else{
				alert(getLabel('FMS_COM_ALT007')); 
			}	
    	   break;    	   
    	   
       case "EXCEL":
    	   if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
    	   break;
    	   
       case "UPLOAD":
    	   sheetObj.LoadExcel({Mode : "HeaderMatch", WorkSheetNo : "1"});

	   break;
    	   
       case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
      		rtnary=new Array(5);
     		rtnary[0]="S";
	   		rtnary[1]="BL";	   		
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}
	   		else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";
	   		rtnary[4]=document.getElementById('pod');
	   		callBackFunc = "POD_LOCATION_POPLIST";
  	        modal_center_open('./CMM_POP_0030.clt', rtnary, 810,480,"yes");
	        break;       
    }
}
function checkValue(){
	var sheetObj=docObjects[0];
	var values_temp = 0;
	var return_value = true;
	for( var i = 2; i <= sheetObj.LastRow(); i++) {
	    var chk_valer = sheetObj.GetCellValue(i, "chk");
	    values_temp = values_temp + Number(chk_valer);
    }
	if(values_temp == 0){
		return_value = false;
	}else{                  
		return_value = true;
	}
	return return_value;
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

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
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

           var HDR1_1 = "SAL_TFM_0080_HDR1_1";    
           var HDR1_2 = "SAL_TFM_0080_HDR1_2";
          
           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel(HDR1_1), Align:"Center"},
                           { Text:getLabel(HDR1_2), Align:"Center"} ];
           
           InitHeaders(headers, info);

           var cols = [ 
                  {Type:"DelCheck",  Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"del_chk",         	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                  {Type:"CheckBox",  Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"chk",         	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1 },
                  {Type:"Status",    Hidden:1, Width:40,   	Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                  {Type:"Text",      Hidden:0, Width:80,    Align:"Center",  ColMerge:1,   SaveName:"rt_no",            KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"PopupEdit", Hidden:0, Width:50,  	Align:"Center",  ColMerge:1,   SaveName:"pol_cd",          	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                  {Type:"Text",      Hidden:0, Width:120,  	Align:"Left",    ColMerge:1,   SaveName:"pol_nm",       	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"PopupEdit", Hidden:0, Width:50,  	Align:"Center",  ColMerge:1,   SaveName:"pod_cd",  			KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                  {Type:"Text",      Hidden:0, Width:120,   Align:"Left",  	 ColMerge:1,   SaveName:"pod_nm",        	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Date",  	 Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"etd_dt",        	KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Date",      Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"eta_dt",         	KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },                
                  {Type:"Date", 	 Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"vld_fm_dt",       	KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Date",      Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"vld_to_dt",      	KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text", 	 Hidden:0, Width:100,   Align:"Left",  	 ColMerge:1,   SaveName:"ref_no",      		KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
                  {Type:"Text",      Hidden:0, Width:100,  	Align:"Left",    ColMerge:1,   SaveName:"cntr_no",     		KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:14 },
                  {Type:"Combo", 	 Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Float",     Hidden:0, Width:60,  	Align:"Right",   ColMerge:1,   SaveName:"cntr_ttl_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
                  {Type:"Float", 	 Hidden:0, Width:60,   	Align:"Right",   ColMerge:1,   SaveName:"cntr_usd_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float", 	 Hidden:0, Width:60,   	Align:"Right",   ColMerge:1,   SaveName:"cntr_remain_qty",  KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"CheckBox",  Hidden:0, Width:60,  	Align:"Center",  ColMerge:1,   SaveName:"ext_flg",    		KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1, TrueValue:"Y", FalseValue:"N" },
                  {Type:"Combo",     Hidden:0, Width:70,   	Align:"Center",  ColMerge:1,   SaveName:"mod_cd",          	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },                  
                  {Type:"Text",      Hidden:0, Width:100,  	Align:"Left",    ColMerge:1,   SaveName:"svc_lane_nm",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Combo",     Hidden:0, Width:70,   	Align:"Center",  ColMerge:1,   SaveName:"rt_sts_cd",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Float",  	 Hidden:0, Width:70,   	Align:"Right",   ColMerge:1,   SaveName:"buy_rt",         	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Combo",     Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"buy_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Combo",     Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"buy_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Float",     Hidden:0, Width:70,   	Align:"Right",   ColMerge:1,   SaveName:"sell_rt",         	KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Combo",     Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"sell_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Combo",     Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"sell_term_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"PopupEdit", Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"ts_port_cd",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
                  {Type:"Text",      Hidden:0, Width:120,  	Align:"Left",    ColMerge:1,   SaveName:"ts_port_nm",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"PopupEdit", Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"cmdt_cd",         	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:12 },
                  {Type:"Text",      Hidden:0, Width:120,  	Align:"Left",    ColMerge:1,   SaveName:"cmdt_nm",         	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Combo",     Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"rt_ut_cd",         KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Combo",     Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"rt_tp_cd",     	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Combo",     Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"cgo_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"PopupEdit", Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"crr_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                  {Type:"Text",      Hidden:0, Width:120,  	Align:"Left",    ColMerge:1,   SaveName:"crr_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"PopupEdit", Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"bil_crr_trdp_cd",	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:00 },
                  {Type:"Text",      Hidden:0, Width:120,  	Align:"Left",    ColMerge:1,   SaveName:"bil_crr_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"PopupEdit", Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"sls_ofc_cd",      	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },	
		          {Type:"PopupEdit", Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"sls_usr_id",   	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		          {Type:"PopupEdit", Hidden:0, Width:50,  	Align:"Center",  ColMerge:1,   SaveName:"trkr_trdp_cd",    	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		          {Type:"Text",      Hidden:0, Width:120,  	Align:"Left",    ColMerge:1,   SaveName:"trkr_trdp_nm",    	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		          {Type:"Combo",     Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"fm_svc_term_cd",   KeyField:0,   CalcLogic:"",   Format:"",     	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },
		          {Type:"Combo",     Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"to_svc_term_cd",   KeyField:0,   CalcLogic:"",   Format:"",     	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 },		          
		          {Type:"Text",      Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",    	KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },		          
		          {Type:"Text",      Hidden:0, Width:120,  	Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",     	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		          {Type:"Text",      Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"modi_usrid",    	KeyField:0,   CalcLogic:"",   Format:"",   		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },		          
		          {Type:"Text",      Hidden:0, Width:120,  	Align:"Center",  ColMerge:1,   SaveName:"modi_tms",   		KeyField:0,   CalcLogic:"",   Format:"",   		PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
		          {Type:"Text",      Hidden:0, Width:200,  	Align:"Left",    ColMerge:1,   SaveName:"rt_rmk",    		KeyField:0,   CalcLogic:"",   Format:"",     	PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2000 },
		          {Type:"Text",      Hidden:1, Width:0,    	Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
          
           InitColumns(cols);
           
           SetEditable(1);         
           
           SetColProperty('mod_cd', {ComboText:"Ocean", ComboCode:"O"} );      
           SetColProperty('rt_sts_cd', {ComboText:"Created|Confirmed", ComboCode:"CR|CF"} );    
           SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
           SetColProperty('buy_curr_cd', {ComboText:'|'+CURRCD1, ComboCode:'|'+CURRCD2} );
           SetColProperty('buy_term_cd', {ComboText:'|'+TERMCD1, ComboCode:'|'+TERMCD2} );
           SetColProperty('sell_curr_cd', {ComboText:'|'+CURRCD1, ComboCode:'|'+CURRCD2} );
           SetColProperty('sell_term_cd', {ComboText:'|'+TERMCD1, ComboCode:'|'+TERMCD2} );           
           SetColProperty('fm_svc_term_cd', {ComboText:'|'+SVCCD1, ComboCode:'|'+SVCCD2} );
           SetColProperty('to_svc_term_cd', {ComboText:'|'+SVCCD1, ComboCode:'|'+SVCCD2} );
           SetColProperty('rt_ut_cd', {ComboText:'|'+UNITCD1, ComboCode:'|'+UNITCD2} );  
           SetColProperty('rt_tp_cd', {ComboText:"Normal", ComboCode:"N"} );
           SetColProperty('cgo_tp_cd', {ComboText:'|'+CARGOCD1, ComboCode:'|'+CARGOCD2} );
		   SetSheetHeight(460);
           resizeSheet();
           }
           break;
         case 2:      //IBSheet1 init
             with(sheetObj){
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var HDR2 = "SAL_TFM_0080_HDR2";             
             var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
             var headers = [ { Text:getLabel(HDR2), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [    
					{Type:"Text",  	   Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"rt_no",         	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Text",      Hidden:0, Width:30,   	Align:"Center",  ColMerge:1,   SaveName:"seq",              KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },					
					{Type:"Text",      Hidden:0, Width:120,  	Align:"Left",    ColMerge:1,   SaveName:"pol_nm",       	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },					
					{Type:"Text",      Hidden:0, Width:120,     Align:"Left",  	 ColMerge:1,   SaveName:"pod_nm",        	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Date",  	   Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"etd_dt",        	KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Date",      Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"eta_dt",         	KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },                
					{Type:"Date", 	   Hidden:0, Width:80,   	Align:"Center",  ColMerge:1,   SaveName:"vld_fm_dt",       	KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Date",      Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"vld_to_dt",      	KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Text", 	   Hidden:0, Width:100,     Align:"Left",  	 ColMerge:1,   SaveName:"ref_no",      		KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Text",      Hidden:0, Width:100,  	Align:"Left",    ColMerge:1,   SaveName:"cntr_no",     		KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo", 	   Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"cntr_tpsz_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Float",     Hidden:0, Width:60,  	Align:"Right",   ColMerge:1,   SaveName:"cntr_ttl_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Float", 	   Hidden:0, Width:60,   	Align:"Right",   ColMerge:1,   SaveName:"cntr_usd_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Float", 	   Hidden:0, Width:60,   	Align:"Right",   ColMerge:1,   SaveName:"cntr_remain_qty",  KeyField:0,   CalcLogic:"",   Format:"Float",   PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Text",      Hidden:0, Width:60,  	Align:"Center",  ColMerge:1,   SaveName:"ext_flg",    		KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:70,   	Align:"Center",  ColMerge:1,   SaveName:"mod_cd",          	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },					
					{Type:"Text",      Hidden:0, Width:100,   	Align:"Left",    ColMerge:1,   SaveName:"svc_lane_nm",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:70,   	Align:"Center",  ColMerge:1,   SaveName:"rt_sts_cd",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Float",     Hidden:0, Width:70,   	Align:"Right",   ColMerge:1,   SaveName:"buy_rt",         	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"buy_curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"buy_term_cd",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Float",     Hidden:0, Width:70,   	Align:"Right",   ColMerge:1,   SaveName:"sell_rt",         	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"sell_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:50,   	Align:"Center",  ColMerge:1,   SaveName:"sell_term_cd",     KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },					
					{Type:"Text",      Hidden:0, Width:120,   	Align:"Center",  ColMerge:1,   SaveName:"ts_port_nm",       KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },					
					{Type:"Text",      Hidden:0, Width:120,   	Align:"Center",  ColMerge:1,   SaveName:"cmdt_nm",         	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:60,   	Align:"Center",  ColMerge:1,   SaveName:"rt_ut_cd",         KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:60,   	Align:"Center",  ColMerge:1,   SaveName:"rt_tp_cd",     	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:60,  	Align:"Center",  ColMerge:1,   SaveName:"cgo_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },					
					{Type:"Text",      Hidden:0, Width:120,   	Align:"Center",  ColMerge:1,   SaveName:"crr_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },					
					{Type:"Text",      Hidden:0, Width:120,   	Align:"Center",  ColMerge:1,   SaveName:"bil_crr_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Text",      Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"sls_ofc_cd",      	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },	
					{Type:"Text",      Hidden:0, Width:80,  	Align:"Left",    ColMerge:1,   SaveName:"sls_usr_id",   	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },					
					{Type:"Text",      Hidden:0, Width:120,  	Align:"Left",    ColMerge:1,   SaveName:"trkr_trdp_nm",    	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:60,  	Align:"Left",    ColMerge:1,   SaveName:"fm_svc_term_cd",   KeyField:0,   CalcLogic:"",   Format:"",     	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
					{Type:"Combo",     Hidden:0, Width:60,  	Align:"Left",    ColMerge:1,   SaveName:"to_svc_term_cd",   KeyField:0,   CalcLogic:"",   Format:"",     	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },		          
					{Type:"Text",      Hidden:0, Width:80,  	Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",    	KeyField:0,   CalcLogic:"",   Format:"",		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },		          
					{Type:"Text",      Hidden:0, Width:150,   	Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",     	KeyField:0,   CalcLogic:"",   Format:"",        PointCount:0,   UpdateEdit:0,   InsertEdit:0 }, 
					{Type:"Text",      Hidden:0, Width:200,  	Align:"Left",    ColMerge:1,   SaveName:"rt_rmk",    		KeyField:0,   CalcLogic:"",   Format:"",     	PointCount:0,   UpdateEdit:0,   InsertEdit:0 }];
              
             InitColumns(cols);             
             SetEditable(0);
             SetColProperty('mod_cd', {ComboText:"Ocean", ComboCode:"O"} );        
             SetColProperty('rt_sts_cd', {ComboText:"Created|Confirmed", ComboCode:"CR|CF"} );    
             SetColProperty('cntr_tpsz_cd', {ComboText:'|'+TPCD1, ComboCode:'|'+TPCD2} );
             SetColProperty('buy_curr_cd', {ComboText:'|'+CURRCD1, ComboCode:'|'+CURRCD2} );
             SetColProperty('buy_term_cd', {ComboText:'|'+TERMCD1, ComboCode:'|'+TERMCD2} );
             SetColProperty('sell_curr_cd', {ComboText:'|'+CURRCD1, ComboCode:'|'+CURRCD2} );
             SetColProperty('sell_term_cd', {ComboText:'|'+TERMCD1, ComboCode:'|'+TERMCD2} );           
             SetColProperty('fm_svc_term_cd', {ComboText:'|'+SVCCD1, ComboCode:'|'+SVCCD2} );
             SetColProperty('to_svc_term_cd', {ComboText:'|'+SVCCD1, ComboCode:'|'+SVCCD2} );
             SetColProperty('rt_ut_cd', {ComboText:'|'+UNITCD1, ComboCode:'|'+UNITCD2} );  
             SetColProperty('rt_tp_cd', {ComboText:"Normal", ComboCode:"N"} );
             SetColProperty('cgo_tp_cd', {ComboText:'|'+CARGOCD1, ComboCode:'|'+CARGOCD2} );
               			             
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
		if(docObjects[0].GetCellValue(i, "rt_sts_cd") == 'CF'){
			for(var j=1; j<=docObjects[0].ColCount ; j++ ){
				docObjects[0].SetCellEditable(i,j,0);
			}
		}
	}
	docObjects[1].RemoveAll();
} 
function sheet2_OnSearchEnd(){
	for(var i=2; i<docObjects[1].RowCount()+2 ; i++ ){
	}
} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		showCompleteProcess();
		doWork('SEARCHLIST');
	}
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheetObj.ColSaveName(Col) == "rt_no"){
		if(sheetObj.GetCellValue(Row, "ibflag") != 'I'){
		    var formObj = document.frm1;
		    formObj.rt_no.value = docObjects[0].GetCellValue(Row, "rt_no");
		    doWork('SEARCHLIST01');
		}
	}
}
var cur_row;
var cur_col;
var rtnary=new Array(1);
var callBackFunc = "";
function sheet1_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.frm1;
	switch (sheetObj.ColSaveName(col)) {
		case "pol_cd" :
		    rtnary=new Array(1);
		    rtnary[0]="SEA";
			rtnary[1]="BL";
			rtnary[2]="";
			callBackFunc = "sheet1_OnPopupClick_pol_cd";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		break;
		case "pod_cd" :
		    rtnary=new Array(1);
		    rtnary[0]="SEA";
			rtnary[1]="BL";
			rtnary[2]="";
			callBackFunc = "sheet1_OnPopupClick_pod_cd";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		break;		
		case "ts_port_cd" :
		    rtnary=new Array(1);
		    rtnary[0]="SEA";
			rtnary[1]="BL";
			rtnary[2]="";
			callBackFunc = "sheet1_OnPopupClick_ts_port_cd";
			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		break;
		case "cmdt_cd" :
			rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]="";	//Commodity code	   		
	   		callBackFunc = "sheet1_OnPopupClick_cmdt_cd";	   		
			modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
		break;
		case "crr_trdp_cd" :
			var opt_key_sec = "BL_SAME_AS_CNEE01";
		        ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
		    var cstmTpCd = "LN";
		    var iata_val = "";
	   		rtnary=new Array(2);
	   		rtnary[0]="1";	   		
	   		rtnary[2]=window;
	   		callBackFunc = "sheet1_OnPopupClick_crr_trdp_cd";
			modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
		break;
		case "bil_crr_trdp_cd" :
			var opt_key_sec = "BL_SAME_AS_CNEE01";
	        ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
		    var cstmTpCd = "LN";
		    var iata_val = "";
	   		rtnary=new Array(2);
	   		rtnary[0]="1";	   		
	   		rtnary[2]=window;
	   		callBackFunc = "sheet1_OnPopupClick_bil_crr_trdp_cd";
			modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
		break;	
		case "trkr_trdp_cd" :
			var opt_key_sec = "BL_SAME_AS_CNEE01";
	        ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
		    var cstmTpCd = "";
		    var iata_val = "";
	   		rtnary=new Array(2);
	   		rtnary[0]="1";	   		
	   		rtnary[2]=window;
	   		callBackFunc = "sheet1_OnPopupClick_trkr_trdp_cd";
			modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
		break;
		case "sls_ofc_cd" :
			rtnary=new Array(2);
	   		rtnary[0]="1";
	        callBackFunc = "sheet1_OnPopupClick_sls_ofc_cd";
			modal_center_open('./CMM_POP_0150.clt', rtnary, 556,600,"yes");
		break;
		case "sls_usr_id" :
			rtnary=new Array(1);
	   		rtnary[0]="1";	   		
	   		callBackFunc = "sheet1_OnPopupClick_sls_usr_id";
			modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		break;
	}	
}

function sheet1_OnPopupClick_pol_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "pol_cd",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "pol_nm",rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_pod_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "pod_cd",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "pod_nm",rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_ts_port_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "ts_port_cd",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "ts_port_nm",rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_cmdt_cd(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "cmdt_cd",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "cmdt_nm",rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_crr_trdp_cd(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "crr_trdp_cd",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "crr_trdp_nm",rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_bil_crr_trdp_cd(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "bil_crr_trdp_cd",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "bil_crr_trdp_nm",rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_trkr_trdp_cd(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "trkr_trdp_cd",rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, "trkr_trdp_nm",rtnValAry[2]);
	}
}

function sheet1_OnPopupClick_sls_ofc_cd(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "sls_ofc_cd",rtnValAry[0]);
	}
}

function sheet1_OnPopupClick_sls_usr_id(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, "sls_usr_id",rtnValAry[0]);
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

function doDisplay(doWhat, formObj) {	
	switch (doWhat) {
	case 'DATE11': // 달력 조회 From ~ To 팝업 호출
		cal=new ComCalendarFromTo();
		cal.displayType = "date";
		cal.select(formObj.etd_strdt, formObj.etd_enddt, 'MM-dd-yyyy');
		break;		
	}
}

function POD_LOCATION_POPLIST(rtnVal){
	formObj = document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
}
