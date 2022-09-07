function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                sheetObj.DoSearch("ARI_DOC_1010GS.clt", FormQueryString(formObj) );
    	   break;    
       	   case "CLOSE":
       		   window.close();
       	   break;	   
       	   //2011/12/07 Chungrue 추가 Authority to make entry 인쇄물
	   	   case 'PRINT':
	   		   var intg_bl_seq="";
	   		   //var ref_ofc_cd="";
	   		   var chk_cnt=0;
	   		   var hblNos = "";
	   		   var v_bl_no = "";
	   		
	   		   for(var i=1;i<=sheetObj.LastRow();i++){
	   			   if(sheetObj.GetCellValue(i, "chk") == "1"){
	   				   
	   				   if(v_bl_no == sheetObj.GetCellValue(i, "bl_no")){
	   					   continue;
	   				   }
					
	   				   v_bl_no = sheetObj.GetCellValue(i, "bl_no");
	   				   
	   				   if(chk_cnt != 0){
	   					intg_bl_seq += "' ,'";
	   				   }
	   				   intg_bl_seq += sheetObj.GetCellValue(i, "intg_bl_seq");
	   				   //ref_ofc_cd=sheetObj.GetCellValue(i, "ref_ofc_cd");
	   				   hblNos += "," + sheetObj.GetCellValue(i, "bl_no");
	   				   chk_cnt += 1;
	   			   }
	   		   }
		   	   if(chk_cnt == 0){
//		   		   alert("Please, Select Row. ");
		   		   alert(getLabel('AIR_MSG_085'));
		   	 	   return;
		   	   }else{
		   		   formObj.file_name.value='authority_01.mrd';
			       formObj.title.value='AUTHORITY TO MAKE ENTRY';
			       formObj.mailTitle.value = "AUTHORITY TO MAKE ENTRY" + " [HAWB No : " + hblNos.substring(1, hblNos.length) + "]";
				   //Parameter Setting
			       var param='[' + usrEml + ']';							// USER EMAIL';	[1]
			       param += '[' + intg_bl_seq + ']';						// [2]
			       param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';	// CURR BRANCH [3]
			       //param += '[' + ref_ofc_cd + 'MAINCMP]';				// CURR BRANCH [3]
			       param += '[' + usrnm + ']';								// [4]
			       param += '[' + usrPhn + ']';								// [5]
		           param += '[' + usrFax + ']';								// [6]
		           param += '[' + formObj.f_tit_nm.value + ']';				// [7] Title Name
		           param += '[' + formObj.f_curr_nm.value + ']';			// [8] f_ref_ofc_cd + MAINCMP의 Office Name
				   formObj.rd_param.value=param;
				   formObj.rpt_biz_tp.value="AIM";
				   formObj.rpt_biz_sub_tp.value="AT";
				   formObj.rpt_pdf_file_nm.value=getPdfFileNm();
				   formObj.intg_bl_seq.value = formObj.f_intg_bl_seq.value;
				   formObj.h_intg_bl_seq.value = intg_bl_seq;
				   
					//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청	 
					var t_attachFileName = formObj.title.value + "_" + hblNos.substring(1, hblNos.length);
					t_attachFileName = t_attachFileName.replace(/\./g, "");
					t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
					formObj.rpt_file_name_title.value = t_attachFileName;
					
			       popPOST(formObj, 'RPT_RD_0010.clt', 'popUp', 1025, 740);
		   	   }
		   break;
	   	case 'EMAIL':			
			if(sheetObj.RowCount()> 0){
				var custCheckRow=sheetObj.CheckedRows(7);
				var brkCheckRow=sheetObj.CheckedRows(9);
				
				if(custCheckRow + brkCheckRow == 0){
					alert(getLabel('FMS_COM_ALT007') + "\n\n CM or BM");
					return;
				}	
				
				 var intg_bl_seq="";
		   		   //var ref_ofc_cd="";
		   		   var chk_cnt=0;
		   		   var hblNos = "";
		   		   var v_bl_no = "";
		   		
		   		   for(var i=1;i<=sheetObj.LastRow();i++){
		   			   if(sheetObj.GetCellValue(i, "chk") == "1"){
		   				   
		   				   if(v_bl_no == sheetObj.GetCellValue(i, "bl_no")){
		   					   continue;
		   				   }
						
		   				   v_bl_no = sheetObj.GetCellValue(i, "bl_no");
		   				   
		   				   if(chk_cnt != 0){
		   					intg_bl_seq += "' ,'";
		   				   }
		   				   intg_bl_seq += sheetObj.GetCellValue(i, "intg_bl_seq");
		   				   //ref_ofc_cd=sheetObj.GetCellValue(i, "ref_ofc_cd");
		   				   hblNos += "," + sheetObj.GetCellValue(i, "bl_no");
		   				   chk_cnt += 1;
		   			   }
		   		   }
			   	   if(chk_cnt == 0){
//			   		   alert("Please, Select Row. ");
			   		   alert(getLabel('AIR_MSG_085'));
			   	 	   return;
			   	   }
				
				formObj.file_name.value='authority_01.mrd';
				formObj.title.value='AUTHORITY TO MAKE ENTRY';
				
				// #266 - [BNX] EMAIL FUNCTION TO: AND CC: EMAIL from MBL List
				var v_intg_bl_seq = "";
				
				for(var i=1; i<=sheetObj.LastRow(); i++){
					
					if(v_intg_bl_seq.indexOf(sheetObj.GetCellValue(i, "intg_bl_seq")) != -1){
						continue;
					}
					
					var eml_addr = "";
					
					for(var j=1; j<=sheetObj.LastRow(); j++){
						if(sheetObj.GetCellValue(i, "intg_bl_seq") == sheetObj.GetCellValue(j, "intg_bl_seq")){
							if(sheetObj.GetCellValue(j, "cust_eml_flg") == "1"){
								if(eml_addr.indexOf(sheetObj.GetCellValue(j, "cust_eml")) == -1){
									eml_addr += sheetObj.GetCellValue(j, "cust_eml") + ";";
								}
							}
							if(sheetObj.GetCellValue(j, "brk_eml_flg") == "1"){
								if(eml_addr.indexOf(sheetObj.GetCellValue(j, "brk_eml")) == -1){
									eml_addr += sheetObj.GetCellValue(j, "brk_eml") + ";";
								}
							}
						}
					}
					
					sheetObj.SetCellValue(i, "eml_addr", eml_addr);
					
					v_intg_bl_seq += sheetObj.GetCellValue(i, "intg_bl_seq") + "&";
				}
				
				for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
					sheetObj.SetCellValue(i , "eml_tit_nm", "AUTHORITY TO MAKE ENTRY" + " [HAWB No : " + docObjects[0].GetCellValue(i, "bl_no") + "]");
					
					var tmp =  "AUTHORITY TO MAKE ENTRY_" +docObjects[0].GetCellValue(i, "bl_no");
					tmp = tmp.replace(/\./g, "");
					tmp = tmp.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
					sheetObj.SetCellValue(i , "eml_mrd_nm",  tmp);
					 
					//Email Title
					var usrEmlCon = formObj.h_usrEmlCon.value;
					var eml_ctnt = "";
					eml_ctnt += usrEmlCon;
					eml_ctnt += "\r\n";
					eml_ctnt += usrnm;
					eml_ctnt += "\r\n";
					eml_ctnt += usrEml;
					eml_ctnt += "\r\n";
					eml_ctnt += usrPhn;
					eml_ctnt += "\r\n";
					eml_ctnt += usrFax;
					eml_ctnt += "\r\n";
					sheetObj.SetCellValue(i , "eml_ctnt",eml_ctnt);
					
					//Parameter Setting
					var param='/rp ';
				    param += '[' + usrEml + ']';									// USER EMAIL  [1]
				    param += '[' + sheetObj.GetCellValue(i , "intg_bl_seq") + ']';	// [2]
				    param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';			// CURR BRANCH [3]
				    //param += '[' + ref_ofc_cd + 'MAINCMP]';						// CURR BRANCH [3]
				    param += '[' + usrnm + ']';										// [4]
				    param += '[' + usrPhn + ']';									// [5]
			        param += '[' + usrFax + ']';									// [6]
					
					sheetObj.SetCellValue(i , "rd_param", param);
				}
				formObj.f_cmd.value=COMMAND01;
				formObj.rpt_biz_tp.value="AIM_P"; 
				formObj.rpt_biz_sub_tp.value="AT";
				 
				//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청  
				/*사용안함 그리드 안 타이틀로 대신 생성 
				var t_attachFileName = formObj.title.value; 
				t_attachFileName = t_attachFileName.replace(/\./g, "");
				t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
				if (t_attachFileName != ""){
					formObj.rpt_file_name_title.value = t_attachFileName + "_" + hblNos.substring(1, hblNos.length)+".mrd";
				}
				*/
				
				if(confirm(getLabel('FMS_COM_CFMSENDEML'))){
					sheetObj.DoAllSave("./ARI_DOC_1010GS.clt", FormQueryString(formObj), true);
				}
			}
		break;
		case 'FAX':														
			if(sheetObj.RowCount()> 0){
				var custCheckRow=sheetObj.CheckedRows(6);
				var brkCheckRow=sheetObj.CheckedRows(8);
				
				if(custCheckRow + brkCheckRow == 0){
					alert(getLabel('FMS_COM_ALT007') + "\n\n CF or BF");
					return;
				}	
				
				formObj.file_name.value='authority_01.mrd';
				formObj.title.value='AUTHORITY TO MAKE ENTRY';
				
				for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
					
					sheetObj.SetCellValue(i , "eml_tit_nm", "AUTHORITY TO MAKE ENTRY" + " [HAWB No : " + docObjects[0].GetCellValue(i, "bl_no") + "]");
					
					//Parameter Setting
					var param = '/rp ';
					param += '[' + usrEml + ']';									// USER EMAIL  [1]
				    param += '[' + sheetObj.GetCellValue(i , "intg_bl_seq") + ']';	// [2]
				    param += '[' + formObj.f_ref_ofc_cd.value + 'MAINCMP]';			// CURR BRANCH [3]
				    //param += '[' + ref_ofc_cd + 'MAINCMP]';						// CURR BRANCH [3]
				    param += '[' + usrnm + ']';										// [4]
				    param += '[' + usrPhn + ']';									// [5]
			        param += '[' + usrFax + ']';									// [6]
					
					sheetObj.SetCellValue(i , "rd_param", param);
				}
				formObj.f_cmd.value=COMMAND02;
				formObj.rpt_biz_tp.value="AIM_P";
				formObj.rpt_biz_sub_tp.value="AT";
				if(confirm(getLabel('FMS_COM_CFMSENDFAX'))){
					sheetObj.DoAllSave("./ARI_DOC_1010GS.clt", FormQueryString(formObj), true);
				}
			}
		break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: ARI_DOC_1010.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: ARI_DOC_1010.002");
        }
	}
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
//	var arg=window.dialogArguments;
	var formObj=document.form;
//	formObj.f_intg_bl_seq.value = arg[0];
//	formObj.f_ref_no.value 		= arg[1];
//	formObj.f_mawb_no.value 	= arg[2];
//	formObj.f_ref_ofc_cd.value 	= arg[3];
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    if(formObj.f_intg_bl_seq.value != ""){
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
    	    with(sheetObj){
        	 	SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0 } );
        	 	var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
        	 	var headers = [ { Text:getLabel('ARI_DOC_1010_HDR1'), Align:"Center"} ];
        	 	InitHeaders(headers, info);

           var cols = [ 
    	               {Type:"Text",      Hidden:0,  Width:143,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cust_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"cust_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"brk_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"brk_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1 },
    	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cust_fax_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
    	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cust_eml_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
    	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"brk_fax_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
    	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"brk_eml_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cust_fax",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cust_eml",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"brk_fax",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"brk_eml",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cust_pic_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"brk_pic_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },    	               
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sndr_eml",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sndr_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"to_eml_ctnt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cc_eml_ctnt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_tit_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_ctnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rd_param",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_mrd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"eml_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 }];
            
           InitColumns(cols);
           SetSheetHeight(230);
           SetEditable(1);
           }
                                      
           break;
    }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if(sheetObj.DataRows == 1){
		sheetObj.SetCellValue(1, "chk",1);
	}
	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i , "cust_eml") == "" ){
			sheetObj.SetCellEditable(i , "cust_eml_flg",0);
		}
		if(sheetObj.GetCellValue(i , "cust_fax") == "" ){
			sheetObj.SetCellEditable(i , "cust_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_fax") == "" ){
			sheetObj.SetCellEditable(i , "brk_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_eml") == "" ){
			sheetObj.SetCellEditable(i , "brk_eml_flg",0);
		}
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.form;
	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i , "cust_eml") == "" ){
			sheetObj.SetCellEditable(i , "cust_eml_flg",0);
		}
		if(sheetObj.GetCellValue(i , "cust_fax") == "" ){
			sheetObj.SetCellEditable(i , "cust_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_fax") == "" ){
			sheetObj.SetCellEditable(i , "brk_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_eml") == "" ){
			sheetObj.SetCellEditable(i , "brk_eml_flg",0);
		}
		// #266 - [BNX] EMAIL FUNCTION TO: AND CC: EMAIL from MBL List
		sheetObj.SetCellValue(i , "eml_addr", "");
	}
	if(errMsg == ""){
		if(formObj.f_cmd.value == COMMAND01){
			alert(getLabel('FMS_COM_ALT056'));
		}else if(formObj.f_cmd.value == COMMAND02){
			alert(getLabel('FMS_COM_ALT057'));
		}
	}	
}

function getPdfFileNm(){
	var formObj=document.form;
	var pdfFileNm = "";
	var ref_no = formObj.f_ref_no.value;
	
	if (ref_no == "" || ref_no == "undefined" || ref_no == undefined) {
		return "";
	}
	pdfFileNm = "AUTH_FilingNo_"+ref_no;	
	return pdfFileNm;
}

function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
        case "chk" :
    		for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
    			if(sheetObj.GetCellValue(Row,"bl_no") == sheetObj.GetCellValue(i,"bl_no")){
    				sheetObj.SetCellValue(i, "chk", sheetObj.GetCellValue(Row,"chk"));
    			}
    		}
    }
}