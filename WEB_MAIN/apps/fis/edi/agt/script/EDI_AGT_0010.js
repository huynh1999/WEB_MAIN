function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            
            //Agent EDI Spec 추가 사항 2018.12.10
            formObj.f_rcvr_brnc_ofc_cd.value = ''
            	
            sheetObj.DoSearch("./EDI_AGT_0010GS.clt", FormQueryString(formObj) );
       break;
		//EDI 전송 
		case "SEND_EDI":
			var chks=sheetObj.FindCheckedRow('chk');
			if(chks == ''){
				alert(getLabel('FMS_COM_ALT007'));
				return false;
			}
			
			//Agent EDI Spec 추가 사항 2018.12.10
			//if(formObj.f_rcvr_brnc_ofc_cd.value == ''){
			//	alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_RECEIVER') + " " + getLabel('FMS_COD_OFCE'));
			//	return false;
			//}
			
			formObj.f_rcvr_brnc_ofc_cd.value = formObj.f_rcvr_brnc_ofc_cd.value.toUpperCase();
			
			var agentCodeChk ="";
			var destAgentChk = "";
			for(var i=1;i<sheetObj.LastRow() + 1;i++){
				if(sheetObj.GetCellValue(i, "chk")=="1"){
					//#5757 [Binex-LA] Agent EDI 로직 확인 요청 - Duc Nguyen (S)
					if(destAgentChk ==''){
						destAgentChk = sheetObj.GetCellValue(i, "agt_nm");
					}
					if(destAgentChk !='' && destAgentChk != sheetObj.GetCellValue(i, "agt_nm")){
						alert(getLabel('FMS_COM_ALT164') + '[ row : ' + i + ']');
						return;
					}
					//#5757 [Binex-LA] Agent EDI 로직 확인 요청 - Duc Nguyen (E)
					if(agentCodeChk ==''){
						agentCodeChk = sheetObj.GetCellValue(i, "agt_edi_cd");
					}
					if(agentCodeChk !='' && agentCodeChk != sheetObj.GetCellValue(i, "agt_edi_cd")){
						alert(getLabel('FMS_COM_ALT158') + '[ row : ' + i + ']');
						return;
					}
				}
				if(sheetObj.GetCellValue(i, "chk")=="1" && sheetObj.GetCellValue(i, "mbl_no")==""){
					alert(getLabel('FMS_COM_ALT043') + '[ row : ' + i + ']');
					return;
				}
				if(sheetObj.GetCellValue(i, "chk")=="1" && sheetObj.GetCellValue(i, "hbl_no")==""){
					alert(getLabel('FMS_COM_ALT035') + '[ row : ' + i + ']');
					return;
				}
				
			}
			
		    formObj.f_cmd.value=COMMAND01;
		    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
		    	sheetObj.DoAllSave("./EDI_AGT_0010GS.clt", FormQueryString(formObj) +'', true);
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
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	
	//Agent EDI Spec 추가 사항 2018.12.10
	formObj.f_sndr_brnc_ofc_cd.value = ofc_cd;
	
	doWork("SEARCHLIST");
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

             SetConfig( { SearchMode:2, MergeSheet:1, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('EDI_AGT_0010_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"chk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"agt_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"snd_flg",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"mbl_intg_bl_seq" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"agt_edi_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"agt_edi_msg_tp_cd" }
                    
                    ];
              
             InitColumns(cols);

             SetEditable(1);
             SetSheetHeight(230);
             
           }                                                      
         break;
     }
}

function sheet1_OnSearchEnd(sheetObj, errMsg){
//	mergeCell(1);
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doWork('SEARCHLIST', '');
}

function sheet1_OnClick(sheetObj, Row, Col){
	
	var formObj=document.frm1;
    var colStr=sheetObj.ColSaveName(Col);
    if(colStr == "chk"){
    	if(sheetObj.GetCellValue(Row, "chk") == "0"){     	 
    		for(var i=1; i<=sheetObj.RowCount(); i++){
    			if(sheetObj.GetCellValue(Row, "mbl_no") == sheetObj.GetCellValue(i, "mbl_no")){
    				if(Row != i){
    					sheetObj.SetCellValue(i, "chk", "1", 0);
    				}
    			}
	    	}
    	}else{
    	    for(var i=1; i<=sheetObj.RowCount(); i++){
    			if(sheetObj.GetCellValue(Row, "mbl_no") == sheetObj.GetCellValue(i, "mbl_no")){
    				if(Row != i){
    					sheetObj.SetCellValue(i, "chk", "0", 0);
    				}
    			}
	    	}   
    	}
    	 
    }
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

var totalRowMerge = 0;
var startRow = 0;
var mbl_no_ori = "";
var mbl_no = "";

function mergeCell(Row){
	var sheetObj=docObjects[0];
	totalRowMerge = 0;
	startRow = 0;
	for(var i = Row ; i <= sheetObj.RowCount() + 1 ; i++){
		if(i == Row){
			getDataOri(i);
			i++;
		}
		checkDataMerge(i);
	}
}

function checkDataMerge(i){
	
	var sheetObj=docObjects[0];
	
	getData(i);
	if(mbl_no == mbl_no_ori){
		if(startRow == 0){
			startRow = i;
			totalRowMerge = 1;
		}
		totalRowMerge++;
	}
	else{
		if(totalRowMerge == 1){
			totalRowMerge++;
		}
		startRow = startRow - 1;
		setMergeCell(startRow, totalRowMerge);
		
		getDataOri(i);
		
		startRow = 0;
		totalRowMerge = 0;
	}
	
	if(i == sheetObj.RowCount() + 1){
		if(startRow != 0){
			if(totalRowMerge == 1){
				totalRowMerge++;
			}
			startRow = startRow - 1;
			setMergeCell(startRow, totalRowMerge);
			startRow = 0;
			totalRowMerge = 0;
		}
	}
}
function getDataOri(i){
	var sheetObj=docObjects[0];
	mbl_no_ori = sheetObj.GetCellValue(i, "mbl_no");
}
function getData(i){
	var sheetObj=docObjects[0];
	mbl_no = sheetObj.GetCellValue(i, "mbl_no");
}
function setMergeCell(startRow, totalRowMerge){
	var sheetObj=docObjects[0];
	sheetObj.SetMergeCell(startRow, 0, totalRowMerge, 1);
}

function sendChange(){
	doWork('SEARCHLIST');
}