/*=========================================================
*Copyright(c) 2017 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0300_NEW.jsp
*@FileTitle  : GL Code
*@author     : Thoa.Dien
*@version    : 1.0
*@since      : 2017/12/28
=========================================================*/

var docObjects=new Array();
var sheetCnt=0;
var checkGlcdRow=0;
var checkGlcdCol=0;
var row_Sibling = 0;

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
   // doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}

//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
var Row = -1;
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
             with(sheetObj){
                 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, FrozenCol:6 } );
                 var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
                 var headers = [ { Text:getLabel('MDM_MCM_0300_NEW_HDR2'), Align:"Center"} ];
                 InitHeaders(headers, info);
                 var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
		                     {Type:"DelCheck",  Hidden:1,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"del_flg",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                     {Type:"Seq",       Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"seq",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"gl_cd",      	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
		                     {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"gl_nm",      	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:50, TreeCol:1 ,  LevelSaveName:"level"},
		                     {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"prnt_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		                     {Type:"Int",       Hidden:1,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"gl_lvl",   		KeyField:0,   CalcLogic:"",   Format:"Integer",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0},
		                     {Type:"CheckBox",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"use_flg",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N"  },
		                     {Type:"CheckBox",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"dps_flg",     	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
		                     {Type:"CheckBox",  Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"pay_flg",    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N" },
		                     {Type:"CheckBox",  Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"gen_jnr_flg", 	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, TrueValue:"Y" ,FalseValue:"N"  },
		                     {Type:"Combo",     Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"role_lvl", 		KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
		                     {Type:"Combo",     Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"for_opr_flg",  	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:1 },
		                     {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"acct_gl_cd",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
		                     {Type:"Combo",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"gl_tp_cd",     	KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
		                     {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"gl_pty_tp_cd",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
		                     {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"delt_flg",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1  },
		                     {Type:"Text",      Hidden:1,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"rgst_ofc_cd",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0  },
		                     {Type:"Texxt",     Hidden:1,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"rgst_usrid",  	KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0  },
		                     {Type:"Date",      Hidden:1,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",  	KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0  },
		                     {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"modi_ofc_cd",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0  },
		                     {Type:"Text",      Hidden:1,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"modi_usrid",  	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0  },
		                     {Type:"Date",      Hidden:1,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",  	KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0  }
	                     ];
                 InitColumns(cols);
                 SetEditable(1);
                 sheetObj.SetColProperty("gl_tp_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
                 sheetObj.SetColProperty("role_lvl", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
                 sheetObj.SetColProperty("gl_pty_tp_cd", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
                 sheetObj.SetColProperty("for_opr_flg", {ComboText:"Y|N", ComboCode:"Y|N"} );
                 SetColProperty(0, "gl_cd", vtEngUpOther, "1234567890 _#-.");
                 SetSheetHeight(500);
                // resizeSheet();
             }                           
         break;
         case 2:      //IBSheet2 init
             with(sheetObj){
                 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
                 var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
                 var headers = [ { Text:getLabel('MDM_MCM_0300_NEW_HDR3'), Align:"Center"} ];
                 InitHeaders(headers, info);
                 var cols = [ {Type:"Status",   Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lcl_ibflag" },
                             {Type:"Seq",       Hidden:0,  Width:50,  Align:"Center",  ColMerge:1,   SaveName:"lcl_lclSeq",      KeyField:0,   CalcLogic:"",   Format:"",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                             {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lcl_co_ofc_cd",   KeyField:1,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:0,   InsertEdit:1 },
		                     {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"lcl_ref_cd",      KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:300,  Align:"Left",    ColMerge:1,   SaveName:"lcl_nm",          KeyField:1,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                     {Type:"Text",      Hidden:1, Width:300,  Align:"Left",    ColMerge:1,   SaveName:"use_flg",         KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                     {Type:"Text",      Hidden:1, Width:300,  Align:"Left",    ColMerge:1,   SaveName:"blk_flg",         KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                     {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lcl_cd_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"lcl_rgst_ofc_cd", KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:1, Width:250,  Align:"Left",    ColMerge:1,   SaveName:"lcl_rgst_usrid",  KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Date",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lcl_rgst_tms",    KeyField:0,   CalcLogic:"",   Format:"Ymd",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:1, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"lcl_modi_usrid",  KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"lcl_modi_usrid",  KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Date",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"lcl_modi_tms",    KeyField:0,   CalcLogic:"",   Format:"Ymd",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
		                    ];
                 InitColumns(cols);
                 SetEditable(1);
                 SetSheetHeight(420);
                 SetColProperty(0, "lcl_co_ofc_cd", vtEngUpOther, "1234567890 _#-.");
                // resizeSheet();
             }                           
         break;
         case 3:      //IBSheet1 init
             with(sheetObj){
                 SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
                 var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
                 var headers = [ { Text:getLabel('MDM_MCM_0300_NEW_HDR5'), Align:"Center"},
   	  		                     { Text:getLabel('MDM_MCM_0300_NEW_HDR6'), Align:"Center"} ];
                 InitHeaders(headers, info);
                 var cols = [{Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"his_seq",    	 	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                             {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"his_modi_seq",    	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"his_type",    		KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_cd",      	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:150,  Align:"Left",    ColMerge:1,   SaveName:"his_gl_nm",      	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Combo",     Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"his_gl_prnt_cd",     KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_lvl",   		KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_use_flg",     KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0,  TrueValue:"Y" ,FalseValue:"N" },
		                     {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_dps_flg",     KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0,  TrueValue:"Y" ,FalseValue:"N" },
		                     {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_pay_flg",    	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0,  TrueValue:"Y" ,FalseValue:"N" },
		                     {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_gen_jnr_flg", KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0,  TrueValue:"Y" ,FalseValue:"N" },
		                     {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"his_gl_for_opr_flg", KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"his_gl_role_lvl",  	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"his_gl_pty_tp_cd", 	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"his_gl_act_gl_cd",  	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",  	Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_del_flg",  	KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_rgst_ofc_cd", KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"his_gl_rgst_usrid",  KeyField:0,   CalcLogic:"",   Format:"",  		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Date",      Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"his_gl_rgst_tms",    KeyField:0,   CalcLogic:"",   Format:"YmdHm",   PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"his_gl_modi_ofc_cd", KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Text",      Hidden:0, Width:120,  Align:"Center",  ColMerge:1,   SaveName:"his_gl_modi_usrid",  KeyField:0,   CalcLogic:"",   Format:"",    	PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
		                     {Type:"Date",      Hidden:0, Width:150,  Align:"Center",  ColMerge:1,   SaveName:"hi_gl_modi_tms",    	KeyField:0,   CalcLogic:"",   Format:"YmdHm",   PointCount:1,   UpdateEdit:0,   InsertEdit:0 }
		                 ];
                 InitColumns(cols);
                 SetEditable(1);
                 SetSheetHeight(300);
                 sheetObj.SetColProperty("his_type", {ComboText:"Create|Update|Delete", ComboCode:"C|U|D"} );
                 sheetObj.SetColProperty("his_gl_tp_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
                 sheetObj.SetColProperty("his_gl_role_lvl", {ComboText:PARAM2_1, ComboCode:PARAM2_2} );
                 sheetObj.SetColProperty("his_gl_pty_tp_cd", {ComboText:PARAM3_1, ComboCode:PARAM3_2} );
                 resizeSheet();
                 sheetObj.SetFocusAfterProcess(0);
             }                           
         break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}


function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var formObj=document.frm1;
    try {
    	switch(srcName) {
	        case "SEARCHLIST":   // Search G/L Master Code
	             formObj.f_cmd.value=SEARCHLIST;
	             sheetObj.DoSearch("MDM_MCM_0300_NEWGS.clt", FormQueryString(formObj) );
	        break;
	        case "SEARCHLIST01": // Search Local Name
	            formObj.f_cmd.value=SEARCHLIST01;
	            sheetObj2.DoSearch("MDM_MCM_0300_NEW_LOCALGS.clt", FormQueryString(formObj) );
	        break;
	        case "SEARCHLIST02": // Search G/L Code History
	           formObj.f_cmd.value=SEARCHLIST02;
	           sheetObj3.DoSearch("MDM_MCM_0300_NEW_HISGS.clt", FormQueryString(formObj) );
	       break;
	       case "ADD_SIBLING":
	    	   row_Sibling = sheetObj.GetSelectRow();
	    	   if(sheetObj.GetCellValue(row_Sibling,"gl_lvl") == 0 ){
	    		   rtnary=new Array(2);
		 	   		callBackFunc = "CMM_POP_0261_NEW";
		 	   		modal_center_open('./CMM_POP_0261_NEW.clt', rtnary, 420,440,"yes");
	    	   }else{
	    		   // Add sibling for the children
	    		   sheetObj.DataInsert();
	    		   var row = sheetObj.GetSelectRow();
	     	   	   sheetObj.SetCellValue(row, "prnt_cd", sheetObj.GetCellValue(row_Sibling,"prnt_cd"));
	     	   	   sheetObj.SetCellValue(row, "gl_lvl", sheetObj.GetCellValue(row_Sibling,"gl_lvl"));
	    	   }
	     	   
	        break;
	        case "ADD_CHILD":
	     	   if(sheetObj.RowCount() > 0){
	     		   var rowPrnt = sheetObj.GetSelectRow();
	         	   sheetObj.DataInsert();
	         	   var row = sheetObj.GetSelectRow();
	     	   	    sheetObj.SetCellValue(row, "prnt_cd", sheetObj.GetCellValue(rowPrnt,"gl_cd"));
	     	   	    sheetObj.SetCellValue(row, "gl_lvl", parseInt(sheetObj.GetCellValue(rowPrnt,"gl_lvl")) + 1);
	     	   	   
	     	   }else{
	     		   // G/L root must be created first!
	     		   ComShowMessage(getLabel('FMS_COM_ALT139')); 
	     	   }
	     	   
	        break;
	        case "SAVE": // Save G.L Master 
	     	   formObj.f_cmd.value=MODIFY;
				if(fncGLMastercheck(sheetObj)){
					
					if(!checkDupLocalNm(sheetObj)) return; 
					 
					if(confirm(getLabel('FMS_COM_CFMSAV'))){
		                doProcess=true;
		                sheetObj.DoSave("MDM_MCM_0300_NEWGS.clt", FormQueryString(formObj),"ibflag",true);
		            }
				}
	        break;
	        case "LCLADD":
	     	   if(sheetObj.RowCount() <= 0){
	     		   //There is no G/L Code. Please add G/L first!
	     		   ComShowMessage(getLabel('FMS_COM_ALT140'));
	     		   return;
	     	   }
	 	   	    rtnary=new Array(2);
	 	   		rtnary[0]="1";
	 	        callBackFunc = "GET_LOCAL_NAME";
	 			modal_center_open('./CMM_POP_0150.clt', rtnary, 556,600,"yes");
	        break;
	        
	        case "LCLDELETE": // Delete Local Name Info.
	     	   doProcess=true;
	     	   deleteLocalName(sheetObj2);
	        break;
	        case "LCLSAVE": // Save Local Name Info.
	            formObj.f_cmd.value=COMMAND01;
	           if(fncLocalNmcheck(sheetObj2)){
	         	  
	         	  if(!checkDupLocalNm(sheetObj2)) return; 
	         	  
	         	  if(confirm(getLabel('FMS_COM_CFMSAV'))){
	                   doProcess=true;
	                   sheetObj2.DoSave("MDM_MCM_0300_NEW_LOCALGS.clt", FormQueryString(formObj),"lcl_ibflag",false);
	               }
	           }
	        break;
	     }
    } catch (e) {
        if (e == "[object Error]") {
            //Unexpected Error occurred. Please contact Help Desk!
            alert(getLabel('FMS_COM_ERR002'));
        }
        else {
            //System Error! + MSG
            alert(getLabel('FMS_COM_ERR001'));
        }
    }
}

//--------------------------------------------------------------------------------------------------------------
// Local Name Info.
//--------------------------------------------------------------------------------------------------------------

// Add Locacl Name - by Office / Company popup
function GET_LOCAL_NAME(rtnVal){
    var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{   	
		var rtnValAry=rtnVal.split("|");
		if(rtnValAry[0] !=""){
			docObjects[1].DataInsert(docObjects[1].RowCount()+1);
			var cur_row = docObjects[1].GetSelectRow();
			
			docObjects[1].SetCellValue(cur_row, "lcl_co_ofc_cd",rtnValAry[0]);
			docObjects[1].SetCellValue(cur_row, "lcl_nm",rtnValAry[2]);
			docObjects[1].SetCellValue(cur_row, "lcl_ref_cd", formObj.i_gl_cd.value);
		}
	}
}

// Check Local Name - Data input
function fncLocalNmcheck(sheetObj){
	var insertUpdateRow_List = new Array();
	var chkArrLcl = sheetObj.FindStatusRow("I|U").split(";");
	if(chkArrLcl!="") {
		for(var i=0; i<chkArrLcl.length; i++){
			if(sheetObj.GetCellValue(chkArrLcl[i], "lcl_ref_cd") =="" || sheetObj.GetCellValue(chkArrLcl[i], "lcl_gl_nm")){
				ComShowMessage(getLabel2("FMS_COM_ALT138",new Array(getLabel("FMS_COM_LCL01"))));
				//ComShowMessage(getLabel("FMS_COM_ALT138")); //'Company / Office Code / Local Name is missing. Please check again!'
				return false;
			}
			// Check duplicate data on grid
			if(sheetObj.ColValueDup("lcl_co_ofc_cd|lcl_ref_cd|lcl_cd_tp_cd") > 0){
				ComShowMessage(getLabel("FMS_COM_ALT008"));
				sheetObj.SetSelectRow(chkArrLcl[i]);
				return false;
			}
		}
	}
	return true;
}

// Check duplicate data on DB -  If during user is updating data but there is another saving transaction before then system will notify
var dupValue = "NO";
function checkDupLocalNm(sheetObj){
	var insertRow_List = new Array();
	insertRow_List = sheetObj.FindStatusRow("I").split(";");
	if (insertRow_List.length > 0){
		for(var i = 0; i < insertRow_List.length; i++){
			dupValue = "NO";
			ajaxSendPost(chkLocalNmInfo, 'reqVal', '&goWhere=aj&bcKey=chkLocalNmInfo&f_lcl_co_ofc_cd='+ sheetObj.GetCellValue(insertRow_List[i], "lcl_co_ofc_cd") + '&f_lcl_ref_cd='+ sheetObj.GetCellValue(insertRow_List[i], "lcl_ref_cd"), './GateServlet.gsl');
			if(dupValue == 'DP'){
				ComShowMessage(getLabel('FMS_COM_ALT008'));
				sheetObj.SetSelectRow(insertRow_List[i]);
				return false;
			}
		}
	}
	return true;
}
// Dup. Result
function chkLocalNmInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			delResult = doc[1];
		}
	}else{
		
	}
}

// Absolute Delete - TB_LCL_ACCT 
function deleteLocalName(sheetObj){
	if(sheetObj.RowCount() <= 0){
		ComShowMessage(getLabel('FMS_COM_ALT140'));
		return;
	} 
	if(confirm(getLabel('FMS_COM_CFMDEL'))){
		var rowDel = sheetObj.GetSelectRow();
		if(sheetObj.GetCellValue(rowDel, "lcl_ibflag") == "I"){
			sheetObj.RowDelete(rowDel);
		}else{
			ajaxSendPost(delNewLocalName, 'reqVal', '&goWhere=aj&bcKey=deleteNewLocalName&s_lcl_co_ofc_cd='+ sheetObj.GetCellValue(rowDel, "lcl_co_ofc_cd") + '&s_lcl_ref_cd='+ sheetObj.GetCellValue(rowDel, "lcl_ref_cd"), './GateServlet.gsl');
			if(delResult == 'NON'){
				ComShowMessage(getLabel('FMS_COM_ALT011'));
				sheetObj.SetSelectRow(rowDel);
			}else if(delResult == 'SUCCESS'){
				doWork('SEARCHLIST01');
				showCompleteProcess();
			}
		}
	}
}
// Delete result
var delResult = "NON";
function delNewLocalName(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			delResult = doc[1];
		}
	}else{
		
	}
}

//--------------------------------------------------------------------------------------------------------------
// G/L Master
//--------------------------------------------------------------------------------------------------------------

// Add Sibling - by G/L Code popup
function CMM_POP_0261_NEW(rtnVal){
	var sheetObj=docObjects[0];
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		sheetObj.DataInsert(sheetObj.RowCount()+1);
		var cur_row = sheetObj.GetSelectRow();
		
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_row, "gl_cd",rtnValAry[0],0);//ggl_cd
		sheetObj.SetCellValue(cur_row, "gl_nm",rtnValAry[1],0);//ggl_nm
	}
}

//Check G/L Master- Data input
function fncGLMastercheck(sheetObj){
	var insertUpdateRow_List = new Array();
	var chkArr = sheetObj.FindStatusRow("I|U").split(";");
	if(chkArr!="") {
		for(var i=0; i<chkArr.length; i++){
			if(sheetObj.GetCellValue(chkArr[i], "gl_cd") =="" || sheetObj.GetCellValue(chkArr[i], "gl_nm") ==""){
				ComShowMessage(getLabel2("FMS_COM_ALT138",new Array(getLabel("FMS_COM_GL01")))); //'Code or Name is missing. Please check again!'
				return false;
			}
			// Check duplicate data on grid
			if(sheetObj.ColValueDup("gl_cd") > 0){
				ComShowMessage(getLabel("FMS_COM_ALT008"));
				sheetObj.SetSelectRow(chkArr[i]);
				return false;
			}
		}
	}
	return true;
}


//Check duplicate data on DB -  If during user is updating data but there is another saving transaction before then system will notify
var dupValue = "NO";
function checkDupGLMaster(sheetObj){
	var insertRow_List = new Array();
	insertRow_List = sheetObj.FindStatusRow("I").split(";");
	if (insertRow_List.length > 0){
		for(var i = 0; i < insertRow_List.length; i++){
			dupValue = "NO";
			ajaxSendPost(checkDupGLMaster, 'reqVal', '&goWhere=aj&bcKey=checkDupGLMaster&f_gl_cd='+ sheetObj.GetCellValue(insertRow_List[i], "gl_cd"), './GateServlet.gsl');
			if(dupValue == 'DP'){
				ComShowMessage(getLabel('FMS_COM_ALT008'));
				sheetObj.SetSelectRow(insertRow_List[i]);
				return false;
			}
		}
	}
	return true;
}

//Dup. Result
function checkDupGLMaster(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			delResult = doc[1];
		}
	}else{
		
	}
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	if(sheetObj.RowCount() >  0){
		setDefautGLTree(sheetObj);
	}
}

// do not allow editing G/L parent(s)
function setDefautGLTree(sheetObj){
	 var info = {Type: "Text"};
	    for(var j=sheetObj.HeaderRows(); j < sheetObj.LastRow(); j++) {
	    	var myLevel = sheetObj.GetCellValue(j,"gl_lvl");
	    	var nextLevel = sheetObj.GetCellValue(j+1,"gl_lvl");
	    	
	    	if(myLevel < nextLevel){
	    		sheetObj.InitCellProperty(j,"use_flg", info); // Active
	    		sheetObj.SetCellValue(j,"use_flg", "");	
	    		
	    		sheetObj.InitCellProperty(j,"dps_flg", info); // Deposit
	    		sheetObj.SetCellValue(j,"dps_flg", "");	  
	    		
	    		sheetObj.InitCellProperty(j,"pay_flg", info); // Payment
	    		sheetObj.SetCellValue(j,"pay_flg", "");	  
	    		
	    		sheetObj.InitCellProperty(j,"gen_jnr_flg", info); // General Journal
	    		sheetObj.SetCellValue(j,"gen_jnr_flg", "");	
	    		
	    		sheetObj.InitCellProperty(j,"role_lvl", info); // Role Level
	    		sheetObj.SetCellValue(j,"role_lvl", "");	
	    		
	    		sheetObj.InitCellProperty(j,"for_opr_flg", info); // IS FOR OPERATION
	    		sheetObj.SetCellValue(j,"for_opr_flg", "");	  
	    		
	    		sheetObj.InitCellProperty(j,"gl_tp_cd", info); // G/L Type
	    		sheetObj.SetCellValue(j,"gl_tp_cd", "");	
	    		
	    		sheetObj.InitCellProperty(j,"gl_pty_tp_cd", info); // Party Type
	    		sheetObj.SetCellValue(j,"gl_pty_tp_cd", "");
	    		
	    		sheetObj.SetRowEditable(j, 0);
	    		sheetObj.SetCellValue(j, "ibflag", "R");
	    	}
	    }
}

//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Save success!
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		if(sheetObj.RowCount() >  0){
			setDefautGLTree(sheetObj);
		}
		showCompleteProcess();
	}
	
}
//데이터 수정 이벤트
function sheet1_OnChange(sheetObj, Row, Col){
	var colNm=sheetObj.ColSaveName(Col);
	switch(colNm){
		case "gl_cd" :
			break;
	}
}
//데이터 수정 이벤트
function sheet1_OnClick(sheetObj, Row, Col){
	
}

function sheet1_OnDblClick(sheetObj,Row,Col){
	if(sheetObj.ColSaveName(Col) == "gl_cd"){
		if(sheetObj.GetCellValue(Row, "ibflag") != 'I'){
		    var formObj = document.frm1;
		    formObj.i_gl_cd.value = docObjects[0].GetCellValue(Row, "gl_cd");
		    formObj.i_gl_nm.value = docObjects[0].GetCellValue(Row, "gl_nm");
		    doWork('SEARCHLIST01');
		    doWork('SEARCHLIST02');
		}
	}
}
function fncSearch() {
	var formObj=document.frm1;
	if ( event.keyCode == 13 ) {
		doWork('SEARCHLIST');
	}
}


