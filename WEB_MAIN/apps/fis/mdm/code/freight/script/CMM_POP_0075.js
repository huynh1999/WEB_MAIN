//Agent EDI Spec 추가 사항 2018.12.10
var autoMappingYn ="N";
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("./CMM_POP_0075GS.clt", FormQueryString(formObj) );
                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                }
    	   break;   
    	   case "btn_new":
    	            sheetObject.RemoveAll();
    	            formObject.reset();
       	   break;
       	    case "btn_ok":
   	             var opener=window.dialogArguments.document.sheet1 ;  // opener sheet1 이름은받아오세요
   	             var rows=sheetObject.LastRow() + 1 ;
   	             for ( i=0 ; i < rows ; i++ )
   	             {
   	            	 if ( sheetObject.GetCellValue( i, "chk" ) == 1 ) {
   	                    var iRow=opener.DataInsert(-1);
   	                    for( j=0 ; j < sheetObject.LastCol(); j ++)
   	                    {
   	                        if ( sheetObject.ColSaveName(j) != "" ) {   // 현재 SaveName이 없는것들을 걸러내기위한조건
        	                         for(k=0 ; k < opener.LastCol(); k ++)
       	                        {
   	                                if ( opener.ColSaveName(k) == sheetObject.ColSaveName(j))
   	                                	opener.SetCellValue( iRow, opener.ColSaveName(k),sheetObject.GetCellValue( i , sheetObject.ColSaveName(j)) ,0);
     	                            }
      	                       }
   	                    }
   	               }
   	             }
   	          ComClosePopup();
        	break;
       	    case "CLOSE":
       	    	ComClosePopup();
       	    break;	  
           	case "MAPPING":
           		var modiMsg="Do you want to proceed with selected code mapping?";// 
           		if(sheetObj.RowCount()> 0 ){
           			formObj.f_cmd.value=COMMAND01;	
           			for(var i=1; i<=sheetObj.RowCount()+1; i++){
           				if(sheetObj.GetCellValue(i, sheetObj.SaveNameCol("chk")) == 1){
           					formObj.f_mp_val.value=formObj.s_edi_frt_cd_nm.value;  // edi에서 넘어온 값
           					formObj.f_mp_cd.value=sheetObj.GetCellValue(i, sheetObj.SaveNameCol("frt_cd")); //팝업에서 찾은 자기 자신의 frt cd
    	   					break;
           				}
           			}
//       				if(formObj.s_edi_frt_cd_nm.value != '' && formObj.f_add_mapping.checked && confirm(modiMsg)){
       				if(formObj.s_edi_frt_cd_nm.value != '' && confirm(modiMsg)){
       					sheetObj.DoSave("CMM_POP_0075GS.clt", FormQueryString(formObj),"ibflag1",false);
       				}
//       				else{
//       					sheet1_OnSaveEnd();
//       				}
           		}
           	break;       	    
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0070.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0070.002");
        }
	}
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var arg= parent.rtnary;
//	alert("arg===>["+arg[7]+"]");
	var formObj=document.form;
	formObj.openMean.value=arg[0];
	formObj.air_sea_clss_cd.value=arg[1];
	formObj.bnd_clss_cd.value=arg[2];
	formObj.biz_clss_cd.value=arg[3];
	formObj.f_frt_list_seq.value=arg[4];
	formObj.f_bl_no.value=arg[5];
	formObj.f_bl_seq.value = arg[6];
	formObj.s_edi_frt_cd_nm.value = arg[7];
	formObj.f_edi_tp.value = arg[8];
//	if(arg[6] == "Y"){
//		formObj.gnr_flg.value=arg[6];
//	}else{
//		formObj.gnr_flg.value="N";
//	}
	
	//Agent EDI Spec 추가 사항 2018.12.10
	//New 처리시 parent 를 핸들링하기 위해 window 객체를 받아온다.
	if(arg[9]!=undefined){
		openerObj=arg[9];
	}
	
	if(arg[10]!=undefined){
		formObj.ie_flg.value=arg[10];
	}
	
	//Add to History of trade Partner Name Check = Y
	if(arg[11]!=undefined){
		if(arg[11]=="Y"){
			document.getElementById("f_add_mapping").checked = true;
		}
	}
	if(arg[12]!=undefined){
		if(arg[12]=="Y"){
			autoMappingYn = "Y";
		}
	}
	
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
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('CMM_POP_0075_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ 
                 {Type:"Radio",     Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
                 {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"frt_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"frt_cd_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1, Width:200,  Align:"Left",    ColMerge:0,   SaveName:"tax_rate",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                 {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag1" },];
              
             InitColumns(cols);

             SetEditable(1);
             SetSheetHeight(350);
           }                                                      
           break;
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheetObj.GetCellValue(Row, "ibflag1") == "I"){
		return;
	}
	//Agent EDI Spec 추가 사항 2018.12.10
	if(autoMappingYn == "Y"){
		sheetObj.SetCellValue(Row, "chk",1,0);
		doWork("MAPPING");
	}else{
		var formObj=document.form;
		var openMean=formObj.openMean.value ; 
		var retArray="";	
		//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "vsl_cd"));
		//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "vsl_nm"));
		retArray += sheetObj.GetCellValue(Row, "frt_cd");
	//	retArray += "|";
	//	retArray += sheetObj.GetCellValue(Row, "frt_cd_nm");
	//	retArray += "|";
	//	retArray += sheetObj.GetCellValue(Row, "tax_rate");
		ComClosePopup(retArray);
	}
}

function sheet1_OnSaveEnd(){
	var sheetObj=docObjects[0];
    var formObj=document.form;
    var openMean=formObj.openMean.value ; 
 	var retArray="";	
	retArray += formObj.f_mp_cd.value;
//	retArray += "|";
//	retArray += formObj.f_eng_nm.value;
//	retArray += "|";
//	retArray += formObj.f_eng_nm.value;
	ComClosePopup(retArray); 
}