// 공통전역변수
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj) {
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	for(var i=0;i<docObjects.length;i++){
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i],SYSTEM_BLUE);
		initSheet(docObjects[i],i+1);
		//khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}
	//JobVisibility Detail을 조회한다.
	formObj=document.frm1;
	var sheetObj1=docObjects[1];
	formObj.intg_bl_seq_in.value=opener.document.frm1.intg_bl_seq_in.value;
	formObj.air_sea_clss_cd.value=opener.document.frm1.air_sea_clss_cd.value;
	formObj.bnd_clss_cd.value=opener.document.frm1.bnd_clss_cd.value;
	//통신을 한다.
	formObj.f_cmd.value=SEARCHLIST;
	sheetObj1.DoSearch("MGT_JOB_0030GS.clt", FormQueryString(formObj) );
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //sheet1 init
			with (sheetObj) {

            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

            var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('MGT_JOB_0030_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Seq",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"Seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"Bound",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"Task",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0, Width:110,  Align:"Center",  ColMerge:0,   SaveName:"Status",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"PlanDate",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"ActualDate",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"Operator",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"job_sts_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"curr_tm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"sts_color",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"category",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"template",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Date",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"recv_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"bkg_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"mbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
             
            InitColumns(cols);

            SetEditable(0);
            InitViewFormat(0, "recv_dt", 	"MM\\-dd\\-yyyy");//날짜 포맷을 월/일/년 으로 설정
            SetColProperty("PlanDate", {Format:"####-##-## ##:##"} );
            SetColProperty("ActualDate", {Format:"####-##-## ##:##"} );
            SetVisible(0);

			}                                                      
    	break;
		case 2:      //sheet1 init
			with (sheetObj) {

            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

            var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('MGT_JOB_0030_HDR2'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Seq",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"Seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"Bound",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"Task",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0, Width:110,  Align:"Center",  ColMerge:0,   SaveName:"Status",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"PlanDate",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"ActualDate",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"Operator",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"job_sts_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"curr_tm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"sts_color",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"category",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"template",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"recv_dt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"bkg_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"mbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"bl_sts_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"sr_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
             
            	InitColumns(cols);

                SetEditable(0);
            	SetImageList(0,APP_PATH+"/web/img/main/trash.gif");
            	SetSheetHeight(300);
			}                                                      
    	break;
	}
}
/***********************************************************************************************************************************/
//SUBMIT 통신을 한다.
/***********************************************************************************************************************************/
function doWork(srcName){
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];		
	var formObj=document.frm1;
	try {	
        switch(srcName) {
           case "CLOSE":
           		this.close();
           break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: MGT_JOB_0030.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: MGT_JOB_0030.002");
        }
    }
}
/****************************************************************************************************
그리드9에 대한 function JobVisibility
****************************************************************************************************/
function sheet1_OnSearchEnd(){
	 var sheetObj=docObjects[0];
	 sheetObj.SetImageList(0,APP_PATH+"/web/img/button/bt_red.gif");
	 sheetObj.SetImageList(1,APP_PATH+"/web/img/button/bt_green.gif");
	 sheetObj.SetImageList(2,APP_PATH+"/web/img/button/bt_blue.gif");
	for ( var i=1 ; i < sheetObj.LastRow() + 1 ; i++ ) {
		if ( sheetObj.GetCellValue(i, "sts_color") == "red" ) {
				sheetObj.SetCellImage(i, "Status",0);
		} else if ( sheetObj.GetCellValue(i, "sts_color") == "green" ) {
			sheetObj.SetCellImage(i, "Status",1);
		} else if ( sheetObj.GetCellValue(i, "sts_color") == "blue" ) {
			sheetObj.SetCellImage(i, "Status",2);
    	} 
    }
}
 //JobVisibility 조회 후
function sheet2_OnSearchEnd(){
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	//그리드 배경색을 흰색으로 셋팅한다.
	for(var i=0; i<sheetObj1.LastCol(); i++){
    	sheetObj1.SetColBackColor(i,"#FFFFFF");
    }
	sheetObj1.SetImageList(0,APP_PATH+"/web/img/button/bt_red.gif");
	sheetObj1.SetImageList(1,APP_PATH+"/web/img/button/bt_green.gif");
	sheetObj1.SetImageList(2,APP_PATH+"/web/img/button/bt_blue.gif");
	
	for ( var i=1 ; i < sheetObj1.LastRow() + 1 ; i++ ) {
		if ( sheetObj1.GetCellValue(i, "sts_color") == "red" ) {
			sheetObj1.SetCellImage(i, "Status",0);
		} else if ( sheetObj1.GetCellValue(i, "sts_color") == "green" ) {
			sheetObj1.SetCellImage(i, "Status",1);
		} else if ( sheetObj1.GetCellValue(i, "sts_color") == "blue" ) {
			sheetObj1.SetCellImage(i, "Status",2);
    	} 
    }
	/** 
	sheetObj1.SetImageList(0,APP_PATH+"/web/img/button/bt_blue.gif");
	sheetObj1.SetImageList(1,APP_PATH+"/web/img/button/bt_green.gif");
	sheetObj1.SetImageList(2,APP_PATH+"/web/img/button/bt_red.gif");
    for(var i=1; i<=sheetObj1.LastRow(); i++){
if(sheetObj1.GetCellValue(i,"job_sts_cd") == "X"){
    		if( i == 1){
//conversion of function[check again]CLT     			sheetObj1.SetCellImage(i, "Status",0);
    			sheetObj1.SetCellValue(i, "sts_color","blue",0);
    		}else{
var prev_sts_cd=sheetObj1.GetCellValue(i-1,"job_sts_cd");
var prev_color=sheetObj1.GetCellValue(i-1,"sts_color");
    			if(prev_sts_cd == "X"){
//conversion of function[check again]CLT     				sheetObj1.SetCellImage(i, "Status",0);
    				sheetObj1.SetCellValue(i, "sts_color","blue",0);
    			}else{
    				if( prev_color == "green" ){
//conversion of function[check again]CLT     					sheetObj1.SetCellImage(i, "Status",1);
    					sheetObj1.SetCellValue(i, "sts_color","green",0);
    				}else if(prev_color == "red"){
//conversion of function[check again]CLT     					sheetObj1.SetCellImage(i, "Status",2);
    					sheetObj1.SetCellValue(i, "sts_color","red",0);
    				}
    			}
    		}
    	}else{
    		if( i == 1){
if(sheetObj1.GetCellValue(i,"Plan Date") < sheetObj1.GetCellValue(i,"curr_tm")){
    				for(var j=1;j<=sheetObj1.LastRow();j++){
//conversion of function[check again]CLT     					sheetObj1.SetCellImage(j, "Status",2);
    					sheetObj1.SetCellValue(j, "sts_color","red",0);
    				}
    				break;
    			}else{
    				for(var j=1;j<=sheetObj1.LastRow();j++){
//conversion of function[check again]CLT     					sheetObj1.SetCellImage(j, "Status",1);
    					sheetObj1.SetCellValue(j, "sts_color","green",0);
    				}
    				break;
    			}
    		}else{
if(sheetObj1.GetCellValue(i,"Plan Date") < sheetObj1.GetCellValue(i,"curr_tm")){
    				for(var j=i;j<=sheetObj1.LastRow();j++){
//conversion of function[check again]CLT     					sheetObj1.SetCellImage(j, "Status",2);
    					sheetObj1.SetCellValue(j, "sts_color","red",0);
    				}
    				break;
    			}else{
    				for(var j=i;j<=sheetObj1.LastRow();j++){
//conversion of function[check again]CLT     					sheetObj1.SetCellImage(j, "Status",1);
    					sheetObj1.SetCellValue(j, "sts_color","green",0);
    				}
    				break;
    			}
    		}
    	}
    }
    */
    //화면필드를 셋팅한다.
	formObj.category.value=sheetObj1.GetCellValue(1,"category");
	formObj.template.value=sheetObj1.GetCellValue(1,"template");
	formObj.recv_dt.value=sheetObj1.GetCellValue(1,"recv_dt");
	formObj.operator.value=sheetObj1.GetCellValue(1,"Operator");
	formObj.booking_no.value=sheetObj1.GetCellValue(1,"bkg_no");
	formObj.sr_no.value=sheetObj1.GetCellValue(1,"sr_no");
	formObj.hbl_no.value=sheetObj1.GetCellValue(1,"hbl_no");
	formObj.mbl_no.value=sheetObj1.GetCellValue(1,"mbl_no");
	if( sheetObj1.GetCellValue(sheetObj1.LastRow(), "sts_color") == "red" ){
			formObj.status.value="Exception";
	}else if( sheetObj1.GetCellValue(sheetObj1.LastRow(), "sts_color") == "green" ){
			formObj.status.value="Planed";
	}else{
		formObj.status.value="Excute";
	}
	formObj.intg_bl_seq_in.value=sheetObj1.GetCellValue(1,"intg_bl_seq");
}
function sheet2_OnDblClick(sheetObj1,Row,Col){	
	var openerformObj=opener.document.frm1;
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
switch (sheetObj1.GetCellValue(Row,"bl_sts_cd")) {
		//SEA Export
		case "SOBRE" :
			openerformObj.bkg_no.value=formObj.booking_no.value;	
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "SOBCO" :
			openerformObj.bkg_no.value=formObj.booking_no.value;	
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "SOSCR" :
			openerformObj.SRNo_in.value=formObj.sr_no.value;	
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEE_BMD_0030.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "SOHCR" :
			openerformObj.bkg_no.value=formObj.booking_no.value;	
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "SOMCR" :
			openerformObj.Sr_no_in.value=formObj.sr_no.value;	
			openerformObj.MasterBL_in.value=formObj.mbl_no.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEE_BMD_0040.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "SOMRA" :
		   	openerformObj.action="./SEE_FRT_0020.clt?f_master_bl_no="+formObj.mbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SOHBR" :
		   	openerformObj.action="./SEE_FRT_0010.clt?f_house_bl_no="+formObj.hbl_no.value+"&f_bkg_no="+formObj.booking_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SOHSR" :
		   	openerformObj.action="./SEE_FRT_0010.clt?f_house_bl_no="+formObj.hbl_no.value+"&f_bkg_no="+formObj.booking_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SODCR" :
		   	openerformObj.action="./ACC_INV_0030.clt?f_house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SOBLC" :
			openerformObj.bkg_no.value=formObj.booking_no.value;
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "SOBLI" :
			openerformObj.bkg_no.value=formObj.booking_no.value;
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		//SEA Import
		case "SIMCR" :
			openerformObj.Sr_no_in.value=formObj.sr_no.value;	
			openerformObj.MasterBL_in.value=formObj.mbl_no.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEI_DOC_0010.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "SIHCR" :
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEI_DOC_0020.clt?house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SIHCO" :
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEI_DOC_0020.clt?house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SIANI" :
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEI_DOC_0030.clt?s_house_bl_no="+formObj.hbl_no.value+"&s_intg_bl_seq="+formObj.intg_bl_seq_in.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SIDOI" :
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEI_DOC_0030.clt?s_house_bl_no="+formObj.hbl_no.value+"&s_intg_bl_seq="+formObj.intg_bl_seq_in.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SIMRA" :
		   	openerformObj.action="./SEI_FRT_0020.clt?f_master_bl_no="+formObj.mbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SIHBR" :
		   	openerformObj.action="./SEI_FRT_0010.clt?f_house_bl_no="+formObj.hbl_no.value+"&f_bkg_no="+formObj.booking_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SIHSR" :
		   	openerformObj.action="./SEI_FRT_0010.clt?f_house_bl_no="+formObj.hbl_no.value+"&f_bkg_no="+formObj.booking_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SIDCR" :
		   	openerformObj.action="./ACC_INV_0030.clt?f_house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "SIBLC" :
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./SEI_DOC_0020.clt?house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		//AIR Export
		case "AOBRE" :
			openerformObj.bkg_no.value=formObj.booking_no.value;	
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AIE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "AOBCO" :
			openerformObj.bkg_no.value=formObj.booking_no.value;	
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AIE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "AOSCR" :
			openerformObj.SRNo_in.value=formObj.sr_no.value;	
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AIE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "AOHCR" :
			openerformObj.bkg_no.value=formObj.booking_no.value;	
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AIE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "AOMCR" :
			openerformObj.Sr_no_in.value=formObj.sr_no.value;	
			openerformObj.MasterBL_in.value=formObj.mbl_no.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AIE_BMD_0030.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "AOCOC" :
			openerformObj.MasterBL_in.value=formObj.mbl_no.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AIE_BMD_0040.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "AOMRA" :
		   	openerformObj.action="./AIE_FRT_0020.clt?f_master_bl_no="+formObj.mbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AOHBR" :
		   	openerformObj.action="./AIE_FRT_0010.clt?f_house_bl_no="+formObj.hbl_no.value+"&f_bkg_no="+formObj.booking_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AOHSR" :
		   	openerformObj.action="./AIE_FRT_0010.clt?f_house_bl_no="+formObj.hbl_no.value+"&f_bkg_no="+formObj.booking_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AODCR" :
		   	openerformObj.action="./ACC_INV_0030.clt?f_house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AOBLC" :
			openerformObj.bkg_no.value=formObj.booking_no.value;	
			openerformObj.intg_bl_seq_in.value=formObj.intg_bl_seq_in.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AIE_BMD_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		//AIR Import
		case "AIMCR" :
			openerformObj.Sr_no_in.value=formObj.sr_no.value;	
			openerformObj.MasterBL_in.value=formObj.mbl_no.value;
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AII_DOC_0020.clt";
		    openerformObj.submit();
			this.close();
		break;
		case "AIHCR" :
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AII_DOC_0010.clt?house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AIMRA" :
		   	openerformObj.action="./AII_FRT_0020.clt?f_master_bl_no="+formObj.mbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AIHBR" :
		   	openerformObj.action="./AII_FRT_0010.clt?f_house_bl_no="+formObj.hbl_no.value+"&f_bkg_no="+formObj.booking_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AIHSR" :
		   	openerformObj.action="./AII_FRT_0010.clt?f_house_bl_no="+formObj.hbl_no.value+"&f_bkg_no="+formObj.booking_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AIDCR" :
		   	openerformObj.action="./ACC_INV_0030.clt?f_house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
		case "AIBLC" :
			openerformObj.f_cmd.value="";
		   	openerformObj.action="./AII_DOC_0010.clt?house_bl_no="+formObj.hbl_no.value+"";
		    openerformObj.submit();
			this.close();
		break;
	}
}
function openOrder(cF,type){
    var param="?openerForm=goals&openerType="+type+"&openerCodeField="+cF;
    window.open("/cupfmsWeb/cup/common/pop/COM_ORDER_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
}
function openLocation(cF,nF, type){
	var param="?openerForm=goals&openerType="+type+"&openerCodeField="+cF+"&openerNameField="+nF;
	window.open("/cupfmsWeb/cup/common/pop/COM_LOCATION_01.jsp"+param,"search","height=550,width=450,scrollbars=yes");  
}
function fncCategory() {
	var formObj=document.frm1;
	var category_code=formObj.s_Category.value;
	if ( category_code != "" ) {
		ajaxSendPost(dispCntAjaxReq1, 'reqVal', '&goWhere=aj&bcKey=searchTemplateCombo&category_code='+category_code, './GateServlet.gsl');
	}
}
function fncTempletList() {
	var formObj=document.frm1;
	var category_code=formObj.s_Category.value;
	var template_code=formObj.s_TemplateList.value;
	if ( category_code != "" && template_code != "" ) {
		ajaxSendPost(dispCntAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCurrentStepCombo&category_code='+category_code+'&template_code='+template_code, './GateServlet.gsl');
	}
}
