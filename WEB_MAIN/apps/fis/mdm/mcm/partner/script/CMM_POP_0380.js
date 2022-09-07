/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0380.js
*@FileTitle  : trade partner mapping pop
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

//Agent EDI Spec 추가 사항 2018.12.10
var autoMappingYn ="N";
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("CMM_POP_0380GS.clt", FormQueryString(formObj) );
                    var intRow=sheetObj.LastRow();
                    for ( var i=1 ; i <= intRow ; i++ ) {
						sheetObj.SetRowHeight(i,20);
					}
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
   	             var rows=sheetObject.RowCount() ;
   	             for ( i=0 ; i < rows ; i++ )
   	             {
   	            	 if ( sheetObject.GetCellValue( i, "chk" ) == 1 ) {
   	                    var iRow=opener.DataInsert(-1);
   	                    for( var j=0 ; j < sheetObject.LastCol(); j ++)
   	                    {
   	                        if ( sheetObject.ColSaveName(j) != "" ) {   // 현재 SaveName이 없는것들을 걸러내기위한조건
        	                         for(var k=0 ; k < opener.LastCol(); k ++)
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
//       	    case "ADD":
//       	    	var param = 'f_intg_bl_seq=' + '1';
//		   		   param += '&air_sea_clss_cd=S'; 
//		   		   param += '&bnd_clss_cd=O';
//		   		   param += '&biz_clss_cd=H';
//	       
//		   		var paramStr = "./AIC_WOM_0010.clt?f_cmd="+SEARCH01+"&s_type=B&"+param;
//		   		
//       	    	opener.parent.mkNewFrame('Work Order', paramStr);
//       	    	self.close();
//       	    break;
//       	    case "MODIFY":
//       	    break;
       	 case "ROWADD1":
       		 if ( docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trdp_cd") != "" ) {
       			 form.s_trdp_cd.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trdp_cd");
 	            rtnary=new Array(1);
 	            var s_trdp_cd=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trdp_cd");
 		  		rtnary[0]="I";
 				rtnary[1]=s_trdp_cd;
 				callBackFunc = "ROWADD1";
 			   	modal_center_open('./SAL_TPM_0011.clt', rtnary, 480,360,"yes");
 			}
 		break;
       	case "NEW":
//       	var rowCnt = sheetObj.Rows;
//			var row = sheetObj.DataInsert(rowCnt);
       		
       		//#5083
       		var edi_trdp_info = "";
       			edi_trdp_info += "&edi_trdp_nm=" + formObj.f_edi_trdp_nm.value;
       			edi_trdp_info += "&edi_trdp_addr=" + formObj.f_edi_trdp_addr.value;
       			edi_trdp_info += "&edi_trdp_cnt_cd=" + formObj.f_edi_trdp_cnt_cd.value;
       		openerObj.parent.mkNewFrame('Trade Partner Entry','./SAL_TPM_0010.clt?callId=NEW'+ edi_trdp_info);
       		ComClosePopup(); 
		   break;
		   
		case "EDIT":
		   var trdp_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(),"trdp_cd");
		   
		   if(trdp_cd == null || trdp_cd < 0 || trdp_cd == undefined){    			   
			   alert('Please search the data in advance!'); 
			   return false;
		   }
		   else{    		   
			   var paramStr="./SAL_TPM_0010.clt?f_cmd=3&s_trdp_cd="+trdp_cd;
			   parent.mkNewFrame('TradePartner Entry', paramStr, "SAL_TPM_0010_SHEET_" + trdp_cd);
		   }
			break;		   
       	case "MAPPING":
       		var modiMsg="Do you want to proceed with selected code mapping?";//좌측 목록에서 선택후 수정한 경우
       		if(sheetObj.RowCount()> 0 ){
       			formObj.f_cmd.value=COMMAND01;	
       			for(var i=1; i<=sheetObj.RowCount()+1; i++){
       				if(sheetObj.GetCellValue(i, sheetObj.SaveNameCol("chk")) == 1){
       					formObj.f_mp_val.value=formObj.s_name_on_ams.value;
       					formObj.f_mp_cd.value=sheetObj.GetCellValue(i, sheetObj.SaveNameCol("trdp_cd"));
       					formObj.f_eng_nm.value=sheetObj.GetCellValue(i, sheetObj.SaveNameCol("eng_nm"));
	   					break;
       				}
       			}
       			//Agent EDI Spec 추가 사항 2018.12.10
   				if(formObj.s_name_on_ams.value != '' && formObj.f_add_mapping.checked && confirm(modiMsg)){
   					sheetObj.DoSave("CMM_POP_0380GS.clt", FormQueryString(formObj),"ibflag1",false);
   				}
   				/*else{
   					sheet1_OnSaveEnd();
   				}*/
       		}
       	break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0010.002");
        }
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
//opener 의 window Object
var openerObj="";
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var arg=parent.rtnary;
	var formObj=document.form;
	formObj.openMean.value=arg[0];
	// 2011.12.27 value parameter
	formObj.s_eng_name.value=arg[1];
	//항공사를 선택한다. 2009.03.11 정성욱 추가
	if(arg[1] == "AC"){
		if(arg[0] == "SAL"){
			div_sal.style.display="block";
			getObj('div_etc').style.display="none";
			formObj.s_trdp_tp_cd01.value=arg[1];
			formObj.s_trdp_tp_cd01.disabled=true;
		}else{
			div_sal.style.display="none";
			getObj('div_etc').style.display="block";
			formObj.s_trdp_tp_cd02.value=arg[1];
			formObj.s_trdp_tp_cd02.disabled=true;
		}
	}
	if(arg[0] == "SAL"){
		div_sal.style.display="block";
		getObj('div_etc').style.display="none";
	}else{
		div_sal.style.display="none";
		getObj('div_etc').style.display="block";
	}
	//New 처리시 parent 를 핸들링하기 위해 window 객체를 받아온다.
	if(arg[2]!=undefined){
		openerObj=arg[2];
	}
	if(arg[3]!=undefined){
		formObj.s_name_on_ams.value=arg[3];
	}
	if(arg[4]!=undefined){
		formObj.f_edi_tp.value=arg[4];
	}

	// #5083
	if(arg[5]!=undefined){
		formObj.f_edi_trdp_nm.value=arg[5];
	}
	if(arg[6]!=undefined){
		formObj.f_edi_trdp_addr.value=arg[6];
	}
	if(arg[7]!=undefined){
		formObj.f_edi_trdp_cnt_cd.value=arg[7];
	}
	
	//Agent EDI Spec 추가 사항 2018.12.10
	//Add to History of trade Partner Name Check = Y
	if(arg[8]!=undefined){
		if(arg[8]=="Y"){
			document.getElementById("f_add_mapping").checked = true;
		}
	}
	if(arg[9]!=undefined){
		if(arg[9]=="Y"){
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
        	 SetColProperty("trdp_tp_cd", {ComboText:tp_nm, ComboCode:tp_cd} );
        	 var cnt=0;
          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          var headers = [ { Text:getLabel('CMM_POP_0380_HDR'), Align:"Center"} ];
          InitHeaders(headers, info);
          var cols = [ {Type:"Radio",     Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		              {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
		              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"eng_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:50 },
		              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"locl_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:100 },
		              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"shrt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:50 },
		              {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"acct_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
		              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"lgl_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:400 },
		              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"tax_iss_addr",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:400 },
		              {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cnt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"eng_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pic_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:50 },
		              {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pic_phn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:30 },
		              {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pic_fax",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:30 },
		              {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pic_eml",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:100 },
		              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pic_desc",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:200 },
		              {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cmp_rmk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Combo",     Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trdp_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:6 },
		              {Type:"Popup",     Hidden:0, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cnt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"rep_zip",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"sls_gp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"crd_lmt_amt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cur_lmt_amt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cr_term_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cr_term_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"city_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"state_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"prefix",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"iata_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"biz_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cmdt_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cmdt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"mp_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		              {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag1" },
		              {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
          InitColumns(cols);
          SetEditable(1);
		  SetColProperty("trdp_tp_cd", {ComboText:tp_nm, ComboCode:tp_cd} );
          SetHeaderRowHeight(20 );
          sheetObj.SetFocusAfterProcess(1);
          SetSheetHeight(300);
           }                                                      
           break;
    }
}
function sheet1_OnSaveEnd(){
	var sheetObj=docObjects[0];
    var formObj=document.form;
    var openMean=formObj.openMean.value ; 
 	var retArray="";	
	retArray += formObj.f_mp_cd.value;
	retArray += "|";
	retArray += formObj.f_eng_nm.value;
	retArray += "|";
	retArray += formObj.f_eng_nm.value;
	ComClosePopup(retArray); 
}
//OnDblClick(Row,Col) 
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
		//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "trdp_cd"));
		//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "shrt_nm"));
		//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "full_nm"));
		retArray += sheetObj.GetCellValue(Row, "trdp_cd");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "locl_nm");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "eng_nm");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "pic_nm");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "pic_phn");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "pic_fax");		//5
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "pic_eml");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "eng_addr");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "trdp_tp_cd");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "cmp_rmk");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "locl_nm");		//10
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "rep_zip");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "cnt_cd");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "sls_gp_cd");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "crd_lmt_amt");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "cur_lmt_amt");	//15
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "lgl_addr");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "cr_term_cd");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "cr_term_dt");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "city_nm");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "state_cd");	//20
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "prefix");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "iata_cd");
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "biz_no");	//23
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "cmdt_cd");	//24
		retArray += "|";
		retArray += sheetObj.GetCellValue(Row, "cmdt_nm");	//25
		ComClosePopup(retArray); 
	}
}
function sheet1_OnMouseMove(Button, Shift, X, Y) {
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
    var Row=sheetObj.MouseRow();
    var Col=sheetObj.MouseCol();
    //no support[check again]CLT sheetObj.MouseToolTipText="";
    //window.status = "OnMouseMove Row=" + Row + ", Col=" + Col + ", Text=" + sText;
  	if(Col == 5){
  		var sText=sheetObj.GetCellText(Row,Col);
  		//풍선도움말 만들기]
  		if(sText.length > 20  ){
  //no support[check again]CLT 			sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#EBFFFF;forecolor:#333333;title:상세내용";  
//no support[check again]CLT 		    sheetObj.MouseToolTipText=sText;
		    sheetObj.SetMousePointer("Default");
		    window.status=sheetObj.GetMousePointer;
  		}
  	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
//	document.getElementById('f_wo_no').focus();
}
var cur_row;
function sheet1_OnPopupClick(sheetObj, row, col) {
	cur_row = row;
	var colName=sheetObj.ColSaveName(col);
	switch(colName){
		case "cnt_cd":
			rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";//대륙코드
			callBackFunc = "sheet1_OnPopupClick_cnt_cd";
			modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
			
		break;
	}
}
function saveValid(sheetObj){
	var rows=sheetObj.RowCount();
	var cnt=0;
	for(var i=1 ; i < rows ; i++){
		if(sheetObj.GetCellValue(i, "ibflag1") == "I"||sheetObj.GetCellValue(i, "ibflag1") == "U"){
			if(sheetObj.GetCellValue(i, "cnt_cd") == ""){
				//alert("[Country] is mandatory field!");
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: CMM_POP_0010.467");	
				return false;
			}
			cnt++;
		}
	}
	if(cnt == 0){
		//alert("No data to save!");
		return false;
	}else{
		return true;
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
 /*
// 2011.12.27 KeyDown
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
if(keyCode==13 && sheetObj.GetCellValue(row, "ibflag1") != "I"){
		sheet1_OnDblClick(sheetObj, row, col);
	}
}
*/
//2012.12.21 KeyUp, sheet1_OnKeyDown 시 enter  인식이 안됨
//function sheet1_OnKeyUp(sheetObj, row, col, keyCode){
//if(keyCode==13 && sheetObj.GetCellValue(row, "ibflag1") != "I"){
//		sheet1_OnDblClick(sheetObj, row, col);
//	}
//}
function gridSearch(gridNum) {
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
    var formObj=document.form;
    if ( docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trpd_cd") != "" ) {
    	formObj.f_cmd.value=SEARCHLIST;
	    if(gridNum=="ALL"||gridNum== "1"){
	    	sheetObj2.DoSearch("SAL_TPM_0011GS.clt", FormQueryString(formObj) );
		}
	}
}
function sheet1_OnClick(sheetObj, Row, Col){
	switch(sheetObj.ColSaveName(Col)){
		case "trdp_cd":
			if(sheetObj.GetCellValue(Row, "ibflag1") != "I"){
				//form.s_trdp_cd.value = sheetObj.CellValue(Row, "trdp_cd");
				//gridSearch(1);
			}
		break;
	}
}
function sheet1_OnChange(sheetObj, Row, Col){
	switch(sheetObj.ColSaveName(Col)){
		case "eng_nm":
			if(sheetObj.GetCellValue(Row, "eng_nm") != ""){
				if(sheetObj.GetCellValue(Row, "locl_nm") == ""){
					sheetObj.SetCellValue(Row, "locl_nm",sheetObj.GetCellValue(Row, "eng_nm"),0);
				}
					if(sheetObj.GetCellValue(Row, "shrt_nm") == ""){
						sheetObj.SetCellValue(Row, "shrt_nm",sheetObj.GetCellValue(Row, "eng_nm"),0);
				}
			}
		break;
	}
}
function sheet3_OnClick(sheetObj, Row, Col){
	switch(sheetObj.ColSaveName(Col)){
		case "sls_his_tit":
			form.s_s3_sls_his_ctnt.value=sheetObj.GetCellValue(Row, "sls_his_ctnt");
		break;
	}
}

function ROWADD1(rtnVal){
   	 if (rtnVal == "true") {
	    	//setTimeout("gridSearch('1')", 50);
	    	//doWork("SEARCHLIST");
	    	//gridSearch("1");
			return;
		}
   	}

function sheet1_OnPopupClick_cnt_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, col,rtnValAry[0]);//cnt_cd
	}
}