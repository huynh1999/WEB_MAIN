

function doWork(srcName){
	if(!btnVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.form;
    var sheetObj = docObjects[0];
    
	try {
		switch(srcName) {
			
			case "SEARCH":
                formObj.f_cmd.value = SEARCH;
	       		formObj.action = "./ACC_INV_0021.clt";     		
			    formObj.submit();
    	   	break;
			
    	   	case "SEARCHLIST":
                   //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));

			    if(validateForm(formObj, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value = SEARCHLIST;
			    	sheetObj.DoSearch4Post("./ACC_INV_0021GS.clt", FormQueryString(formObj));
			    }
			    			    
    	   	break;
    	   	
    	   	case "ADD":
    	        formObj.f_cmd.value = ADD;
    	        
    	        var Rows = sheetObj.Rows;
    	        
    	        //alert("Rows===>"+Rows);
    	        
    	        var i_locl_ttl_amt = 0;
    	        var inv_no_amount = sheetObj.CellValue(1, "inv_no_amount");
    	        var i_perf_ttl_amt;
    	        
    	        for(var i = 1; i < Rows; i++){
					var row_col_amount = sheetObj.CellValue(i, "col_amount");					
					i_locl_ttl_amt = eval(i_locl_ttl_amt)+eval(row_col_amount);					
				} 
				
				//alert("col_amount===>"+col_amount);
				
				if(eval(i_locl_ttl_amt) == eval(inv_no_amount)){
					formObj.i_inv_sts_cd.value="IE";
					//alert("==i_inv_sts_cd=======>"+formObj.i_inv_sts_cd.value);
				}else{
					i_perf_ttl_amt = eval(inv_no_amount)-eval(i_locl_ttl_amt);	
					formObj.i_locl_ttl_amt.value = i_locl_ttl_amt;
					formObj.i_perf_ttl_amt.value = i_perf_ttl_amt;
				}

                if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    doProcess = true;
                    //sheetObj.ShowDebugMsg = true;

                    sheetObj.DoSave("./ACC_INV_0021GS.clt", FormQueryString(formObj),"ibflag",false);

                    //sheetObj.ShowDebugMsg = false;

                }
                
                formObj.f_cmd.value = SEARCH;
	       		formObj.action = "./ACC_INV_0021.clt";     		
			    formObj.submit();
			    
  	       break;
  	       
  	       case "ROWADD":
    	             	         
				var Rows = sheetObj.Rows;
				// alert("seq111"+sheetObj.CellValue(Rows-1, "inv_fm_dt"));
				var ibflag;
				var col_amount;
				for(var i = 1; i < Rows; i++){

					ibflag = sheetObj.CellValue(i, "ibflag");
					
					if(ibflag=="U"){
						alert(getLabel('ACC_INV_0021_MSG1'));	
						break;
					}		
					
					col_amount = sheetObj.CellValue(i, "col_amount")
					
					if(col_amount == 0){
						alert(getLabel('ACC_INV_0021_MSG2'));	
						break;
					}
				}
				if(ibflag=="U"){
					break;
				}
				if(col_amount == 0){
					break;
				}
				
				if ( sheetObj.CellValue(Rows-1, "inv_dtl_seq") != "" ) {
		       		//var intInsertRow = sheetObj1.DataInsert(intRow);
		       		
		       		sheetObj.DataInsert(Rows);
		       		
		       		sheetObj.CellValue(Rows,"inv_no_amount") ="0";
		       		sheetObj.CellValue(Rows,"inv_fm_dt") =  sheetObj.CellValue(1,"inv_fm_dt");		       		
		       		sheetObj.CellValue(Rows,"inv_seq") =  sheetObj.CellValue(1,"inv_seq");
				 	sheetObj.CellValue(Rows,"inv_no") = sheetObj.CellValue(1,"inv_no");
				 	sheetObj.CellValue(Rows,"frt_ask_clss_cd") = sheetObj.CellValue(1,"frt_ask_clss_cd");
				 	sheetObj.CellValue(Rows,"inv_iss_flg") = sheetObj.CellValue(1,"inv_iss_flg");
				 	sheetObj.CellValue(Rows,"inv_sts_cd") = sheetObj.CellValue(1,"inv_sts_cd");
				 	sheetObj.CellValue(Rows,"cmpl_sts_flg") = sheetObj.CellValue(1,"cmpl_sts_flg");
		       	} else {
		       		alert(getLabel('ACC_INV_0021_MSG3'));
		       	}
		       	
		       	//추가된건만 입력할수 있게 나머지 건은 disable시킨다.
		       	for(var i = 1; i < Rows; i++){
					sheetObj.RowEditable(i)  = false;
				}
				 
  	       break;
  	       
  	       case "CLOSE":
    	         window.close();
  	       break;
  	      
        
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: ACC_INV_0021.137.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: ACC_INV_0021.137.002");
        }         
	}
}


//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects = new Array();
var sheetCnt = 0;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {

	var arg=window.dialogArguments;
	
	var formObj  = document.form;
	
	//alert("arg[0]==="+arg[0]);
	
	formObj.s_inv_seq.value = arg[0];
	formObj.s_inv_no.value = arg[1];

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);

        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    if(formObj.i_sell_buy_tp_cd.value ==""){
    	doWork('SEARCH');
    }else if (formObj.i_sell_buy_tp_cd.value !=""){
    	doWork('SEARCHLIST');
    }
    
    
}


/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++] = sheet_obj;
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
		        // 높이 설정
		        style.height = 200;
		        
		        //전체 너비 설정
		        SheetWidth = mainTable.clientWidth;
		        // SheetWidth = 400;
		
		        //Host정보 설정[필수][HostIp, Port, PagePath]
		        if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
		
		        //전체Merge 종류 [선택, Default msNone]
		        MergeSheet = msHeaderOnly;
		
		       //전체Edit 허용 여부 [선택, Default false]
		        Editable = true;
		
		        //행정보설정[필수][HEADROWS,DATAROWS,VIEWROWS,ONEPAGEROWS=100]
		        InitRowInfo( 1, 1, 9, 100);
		
		        //컬럼정보설정[필수][COLS,FROZENCOL,LEFTHEADCOLS=0,FROZENMOVE=false]
		        InitColumnInfo(15, 0, 0, true);
		
		        // 해더에서 처리할 수 있는 각종 기능을 설정한다
		        InitHeadMode(true, true, true, true, false,false) ;

		        //해더행정보[필수][ROW,HEADTEXT,ROWMERGE=false, HIDDEN=false]
		        InitHeadRow(0, getLabel('ACC_INV_0021_HDR'), true);
		        
		        //데이터속성    [ROW,   COL,   DATATYPE,       WIDTH, DATAALIGN, COLMERGE, SAVENAME,    KEYFIELD, CALCULOGIC, DATAFORMAT, POINTCOUNT, UPDATEEDIT, INSERTEDIT, EDITLEN, FULLINPUT, SORTENABLE, TOOLTIP, ALLCHECK, SAVESTATUS, FORMATFIX]
		        InitDataProperty(0, 0,  dtDelCheck,     30,   daCenter,  true, 	  "Del",        	false,      "",       dfNone,    0,     true,       true,   2,     false,    false,   "",  false);
		        InitDataProperty(0, 1,  dtHiddenStatus, 30,   daCenter,  true,    "ibflag");
		        InitDataProperty(0, 2,  dtData,         30,   daCenter,  true,    "seq",   			false,      "",       dfNone,      0,     false,      false);
				InitDataProperty(0, 3,  dtData,        120,   daLeft,    true,    "inv_no",   		false,      "",       dfNone,      0,     false,      false);
				InitDataProperty(0, 4,  dtData,        100,   daCenter,  true,    "inv_dtl_seq",    false,      "",       dfNone,  	0,     false,      false);
				InitDataProperty(0, 5,  dtData,        120,   daRight,   true,    "inv_no_amount",  false,      "",       dfFloat,      2,     false,       false);
		        InitDataProperty(0, 6,  dtData,        120,   daRight,   true,    "col_amount",    	false,      "",       dfFloat,      2,     true,       true);
		        InitDataProperty(0, 7,  dtData,        120,   daRight,   true,    "bal_amount",   	false,      "",       dfFloat,      2,     false,       false);
		        InitDataProperty(0, 8,  dtData,         80,   daCenter,  true,    "eng_usr_nm",    	false,      "",       dfNone,      0,     false,       false);
		        InitDataProperty(0, 9,  dtData,         80,   daCenter,  true,    "inv_fm_dt",    	false,      "",       dfNone,      0,     false,       false);
		        InitDataProperty(0, 10,  dtHidden,      80,   daRight,   true,    "frt_ask_clss_cd", false,      "",      dfNone,      0,     true,       true);
		        InitDataProperty(0, 11,  dtHidden,      80,   daRight,   true,    "inv_iss_flg",   	false,      "",       dfNone,      0,     true,       true);
		        InitDataProperty(0, 12,  dtHidden,      80,   daCenter,  true,    "inv_sts_cd",    	false,      "",       dfNone,      0,     true,       true);
		        InitDataProperty(0, 13,  dtHidden,      80,   daCenter,  true,    "cmpl_sts_flg",   false,      "",       dfNone,      0,     true,       true);
		        InitDataProperty(0, 14,  dtHidden,      80,   daCenter,  true,    "inv_seq",    	false,      "",       dfNone,      0,     true,       true);
		        		        
		        //a.frt_ask_clss_cd,  a.inv_iss_flg,  	a.inv_sts_cd, 	a.cmpl_sts_flg,
				
				//HeadRowHeight = 20 ;
		   }                                                      
		break;
		
    }
}

//조회 후 페이지징 표시 OnChange(Row, Col, Value) 
function sheet1_OnChange(sheetObj, row, col){

	var colStr = sheetObj.ColSaveName(col);
	switch (colStr) {
        case "col_amount" :
        
        	var Rows = sheetObj.Rows;
        	
        	//alert("row====>"+row);
        	
        	//sheetObj.RowEditable(i)  = false;
        	
        	var inv_amount = sheetObj.CellValue(row, "inv_no_amount");
        	
        	if(row=="1"){
	            var inv_no_amount = sheetObj.CellValue(row, "inv_no_amount");
				var col_amount = sheetObj.CellValue(row, "col_amount");
				var bal_amount = eval(inv_no_amount)-eval(col_amount); 
				
				//alert(bal_amount);
				
				sheetObj.CellValue(row, "bal_amount") = bal_amount;
				
			}else {
				var inv_no_amount = sheetObj.CellValue(row-1, "bal_amount");
				var col_amount = sheetObj.CellValue(row, "col_amount");
				var bal_amount = eval(inv_no_amount)-eval(col_amount); 
				
				sheetObj.CellValue(row, "bal_amount") = bal_amount;
			}
			
			var total_col_amount = 0;
			var inv_no_amount = sheetObj.CellValue(1, "inv_no_amount");
				        
			for(var i = 1; i < Rows; i++){
				var row_col_amount = sheetObj.CellValue(i, "col_amount");					
				total_col_amount = eval(total_col_amount)+eval(row_col_amount);					
			} 
			
			if(eval(total_col_amount) > eval(inv_no_amount)){
				alert(getLabel('ACC_INV_0021_MSG4'));
				sheetObj.CellValue(row, "col_amount")= 0;
				sheetObj.CellValue(row, "bal_amount")= 0;
				
				sheetObj.SelectCell(row,"col_amount");
				
				break;
			}
			
        break;
        
    }
    
} 

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){

} 

