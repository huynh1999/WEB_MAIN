//OFVFOUR-7286 [BNX] Button control by role on Trade Partner Search - Modified by ThuongHuynh

var trdp_pop_flg;
function doWork(srcName){
	/*
	if(!btnGetVisible(srcName)){
		return;
	}
	*/
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
//       	            docObjects[1].RemoveAll();
                	sheetObj.RemoveAll();
       	            sheetObj.DoSearch("CMM_POP_0010GS.clt",FormQueryString(formObj) );
                    
                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                }
    	   break;    
    	   case "btn_new":
    	            sheetObject.RemoveAll();
    	            formObject.reset();
    	            docObjects[1].RemoveAll();
       	   break;
    	   
    	   case "EDIT":
    		   var trdp_cd = sheetObj.GetCellValue(sheetObj.GetSelectRow(),"trdp_cd");
    		   
    		   if(trdp_cd == null || trdp_cd < 0 || trdp_cd == undefined){    			   
    			   alert('Please search the data in advance!'); 
    			   return false;
    		   }
    		   else{    		   
    			   var paramStr="./SAL_TPM_0010.clt?f_cmd=3&s_trdp_cd="+trdp_cd;
    			   //#6426 : [IMPEX-LA] NOT ABLE TO CREATE NEW TRUCKER INFO FROM D/O SCREEN
    			  // parent.mkNewFrame('Trade Partner Entry', paramStr, "SAL_TPM_0010_SHEET_" + trdp_cd);
    			   opener = parent.parent;
    			   if (opener.opener == null) {
    	       			opener.mkNewFrame('Trade Partner Entry', paramStr, "SAL_TPM_0010_SHEET_" + trdp_cd);
    				} else {
    					opener.opener.parent.mkNewFrame('Trade Partner Entry', paramStr, "SAL_TPM_0010_SHEET_" + trdp_cd);
    				}
    		   }
    	   break;
    		   
       	    case "btn_ok":       	    	
   	             var opener=parent.document.sheet1 ;  // opener sheet1 이름은받아오세요
   	             
   	             var rows=sheetObject.LastRow()+1 ;
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
   	          //$(parent.document).find(".layer_popup,.layer_popup_bg").fadeOut(100);
   	          ComClosePopup();
                 //window.close();
        	break;
       	    case "CLOSE":
       	    	ComClosePopup();
       	    	//$(parent.document).find(".layer_popup,.layer_popup_bg").fadeOut(100);
   	             // window.close();
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
 	            var rtnary=new Array(1);
 	            var s_trdp_cd=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trdp_cd");
 		  		rtnary[0]="I";
 				rtnary[1]=s_trdp_cd;
 		 	    var rtnVal=window.showModalDialog('./SAL_TPM_0011.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:480px;dialogHeight:360px");
 		 	    if (rtnVal == "true") {
 		 	    	//setTimeout("gridSearch('1')", 50);
 		 	    	//doWork("SEARCHLIST");
 		 	    	gridSearch("1");
 					return;
 				}
 			}
 		break;
       	case "NEW":
//       	var rowCnt = sheetObj.LastRow() + 1;
//			var row = sheetObj.DataInsert(rowCnt);
//       		var opener = parent.opener;
//       		if (opener == null){
       		//C.W Park 
       		//Bug 386 Favorite 통해서 화면 호출시 opener 잡아주지 못하는 버그
       			opener = parent.parent;
//       		}
       		
       		//opener.mkNewFrame('Trade Partner Entry','./SAL_TPM_0010.clt?callId=NEW');
       			if (opener.opener == null) {
           			opener.mkNewFrame('Trade Partner Entry','./SAL_TPM_0010.clt?callId=NEW');
    			} else {
    				opener.opener.parent.mkNewFrame('Trade Partner Entry','./SAL_TPM_0010.clt?callId=NEW');
    			}
       		
			ComClosePopup();       		
       		//$(parent.document).find(".layer_popup,.layer_popup_bg").fadeOut(100);
       		//window.close();
   		break;
       	case "MODIFY":
       		var modiMsg="Do you want to save?";//좌측 목록에서 선택후 수정한 경우
       		if(saveValid(sheetObj)){
	       		if ( confirm(modiMsg) ) {
					formObj.f_cmd.value=MODIFY;
					sheetObj.DoSave("CMM_POP_0010GS.clt", FormQueryString(formObj),"ibflag1",false);
		        }
       		}
       	break;
       	case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		var rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]=formObj.s_cnt_cd.value;
	   		callBackFunc = "STATE_POPLIST";
  	        modal_center_open('./CMM_POP_0310.clt', rtnary, 610,450,"yes");
  	    break;
        case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
          	var rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "USER_POPLIST";
  	        modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
   	    break;
   	    //#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.13
        case "APPLY":
        	selectMultiRow();
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

$.fn.setCursorPosition = function(pos) {
	   this.each(function(index, elem) {
	     if (elem.setSelectionRange) {
	       elem.setSelectionRange(pos, pos);
	     } else if (elem.createTextRange) {
	       var range = elem.createTextRange();
	       range.collapse(true);
	       range.moveEnd('character', pos);
	       range.moveStart('character', pos);
	       range.select();
	     }
	   });
	   return this;
	 };
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
	formObj.openMean.value=(arg[0] == undefined || arg[0] == 'undefined') ? '' : arg[0];
	// 2011.12.27 value parameter
	formObj.s_eng_name.value=(arg[1] == undefined || arg[1] == 'undefined') ? '' : arg[1];
	//OFVFOUR-7286 [BNX] Button control by role on Trade Partner Search - Modified by ThuongHuynh
	if(formObj.trdp_pop_flg.value == "Y" || formObj.trdp_pop_flg.value == "N" )
	{
	trdp_pop_flg= formObj.trdp_pop_flg.value;
	}
	
	$('#s_eng_name').setCursorPosition(0);
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
	//Local name parameter setting
	if(arg[3]!=undefined){
		//formObj.s_tp_name.value = arg[3];
		formObj.s_eng_name.value=arg[3];
	}
	//DEFAULT MAINCMP Y/N parameter setting
	if(arg[4]!=undefined){
		formObj.s_default_maincmp_yn.value=arg[4];
	}
	//#784 [G&A Payment Entry] Cannot open empty popup
	if(arg[5]!=undefined){
		formObj.s_tp_code.value=arg[5];
	}
	//#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.13
	if(arg[6]!=undefined){
		formObj.f_MultiSelect.value = arg[6];		
	}
	if(arg[6] == "Y"){
		getObj("btnApply").style.display = "inline";
	}
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
  //OFVFOUR-7286 [BNX] Button control by role on Trade Partner Search - Modified by ThuongHuynh
    if(trdp_pop_flg != "Y"){
    	getObj('btn_new').style.display="none";
		getObj('btn_edit').style.display="none";
		getObj('btn_modify').style.display="none";
    }
    //사용자가 저장한 Header 정보를 읽어온다.
	var formObj=document.form;
	docObjects[0].SetHeaderRowHeight(20);
	
	IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), docObjects[0]); //#4406 [Great Luck] SYS_InvalidColumnMove 현상제거를 위해 삽입
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false,"RestoreGrid");
}

function RestoreGrid(){ 
	//ZOOT::TODO
	if(form.s_eng_name.value == ""){
		//#784 [G&A Payment Entry] Cannot open empty popup
		if(form.s_tp_code.value == ""){
			return;
		}
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
				//IBSheet version update 이후 ColPage Option에서 오류가 발생하므로 사용하지 않음.
				//SetConfig( { SearchMode:2, MergeSheet:5, Page:50, FrozenCol:2, ColPage:10 } );
				SetConfig( { SearchMode:2, MergeSheet:5, Page:50, FrozenCol:2 } );

				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('CMM_POP_0010_HDR1'), Align:"Center"} ];
				InitHeaders(headers, info);
				var formObj=document.form;
				var cols = [ 
		                  // #342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.13
		                  {Type:"CheckBox",  Hidden: formObj.f_MultiSelect.value == "Y" ? 0 : 1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
		                  
		                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20, FontColor:"#FF0000" },
		                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"eng_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 , MultiLineText:1},
		                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"locl_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 , MultiLineText:1},
		                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"shrt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 , MultiLineText:1},
		                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"lgl_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400, MultiLineText:1 },
		                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"city_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"state_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"rep_zip",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pic_phn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:30 },
		                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pic_mphn",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:30 },
		                  {Type:"Combo",     Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trdp_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:6 , MultiLineText:1},
		                  // LSY #51932 [ZEN] Trade partner group 컬럼 추가로 인한 수정 (Combo에서 Text로 수정)
		                  {Type:"Text",      Hidden:0, Width:100,  Align:"Left",    ColMerge:0,   SaveName:"tp_grp",    	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:6 , MultiLineText:1},
		                  {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"iata_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 , MultiLineText:1},
		                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"acct_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 , MultiLineText:1},
		                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"tax_iss_addr",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 , MultiLineText:1},
		                  {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cnt_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"eng_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:400 , MultiLineText:1},
		                  {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"pic_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:50 },
		                  {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"pic_fax",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:30 },
		                  {Type:"Text",      Hidden:0, Width:150,   Align:"Center",  ColMerge:0,   SaveName:"pic_eml",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:100 },
		                  {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"pic_desc",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:200 },
		                  {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cmp_rmk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cnt_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
		                  {Type:"Text",      Hidden:0,  Width:120,   Align:"left",  ColMerge:0,   SaveName:"sls_usrnm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:2 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"h_rep_zip",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"sls_gp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"profit_share",   KeyField:0,   CalcLogic:"",   Format:"float",            PointCount:2,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"crd_lmt_amt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cur_lmt_amt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cr_term_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cr_term_dt",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"h_city_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"h_state_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"prefix",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"biz_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cmdt_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"cmdt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trdp_addr" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trdp_addr2" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"tax_type" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"reserve_field09" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"over_due" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"over_limit" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grand_total" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"an_bond_no" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"an_bond_exp_dt" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ctrt_no" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dflt_addr" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ofc_fm_hr" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ofc_to_hr" },
						  //OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
						  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"overdue_total" },
		                  {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag1" },
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" }
		                  ];
		            
		           InitColumns(cols);
		           		
		           SetEditable(1);
		           SetColProperty("trdp_tp_cd", {ComboText:tp_nm, ComboCode:tp_cd} );
		           SetColProperty("tp_grp", {ComboText:tp_grp_nm, ComboCode:tp_grp_cd} );
		           SetSheetHeight(300);
		           SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
		           SetHeaderRowHeight(20);
		           SetAutoRowHeight(0);		           
		           // 3-2-2015 2:11PM khanh.nguyen
		           //SetDataRowHeight(20);
		           SetDataRowHeight(18);
		           
		           sheetObj.SetFocusAfterProcess(1);
		           sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }

                                                  
           break;
         case 2:      //sheet1 init
        	    with(sheetObj){

		           SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
		           var arrTrdDiv=document.form.f_TrdDiv.value.split(";");
		           var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
		           var headers = [ { Text:getLabel("CMM_POP_0010_HDR1_1"), Align:"Center"} ];
		           InitHeaders(headers, info);
		
		           var cols = [ {Type:"Text",      Hidden:1,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"del_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                  {Type:"Status",    Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ibflag4",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		                  {Type:"CheckBox",  Hidden:0, TrueValue:"Y", FalseValue:"N"  , Width:50,   Align:"Center",  ColMerge:0,   SaveName:"rep_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1, HeaderCheck:0},
		                  {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"pic_eml_flg",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"pic_nm",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
		                  {Type:"Combo",     Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,   SaveName:"trd_div_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"pic_phn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
		                  {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"pic_mphn",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
		                  {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"pic_fax",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
		                  {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"pic_eml",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		                  {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"pic_desc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
		                  {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"sheet4",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"cntc_pson_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
		                  {Type:"Text",      Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"trd_div_nm" }  ];
		                 if (arrTrdDiv.length > 0) {
		           sheetObj.InitDataCombo(0, "trd_div_cd", " |"+arrTrdDiv[1], " |"+arrTrdDiv[0]);
		           }
		      
		           InitColumns(cols);
		
		           SetEditable(1);
		           SetSheetHeight(160);
		           SetColProperty("trd_div_cd", {ComboText:"|"+arrTrdDiv[1], ComboCode:"|"+arrTrdDiv[0]} );
		            
		           SetHeaderRowHeight(20 );
		           sheetObj.SetFocusAfterProcess(0);
		           sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }


		break; 		
		/* jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit : Related Partner end */           
         case 3:      //sheet1 init
        	    with(sheetObj){

           SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('CMM_POP_0010_HDR2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",                  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag2" },
                        {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"cntc_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"sls_pson_pic",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"sls_his_tit",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Image",      Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_popup",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Date",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHms",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"sls_his_ctnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet1",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_his_flat_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                        {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"sls_his_flat_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
            
           InitColumns(cols);

           SetEditable(1);
           SetImageList(0,APP_PATH + "/web/img/button/bt_file.gif");
           sheetObj.SetDataLinkMouse('sls_popup',1);
           sheetObj.SetFocusAfterProcess(0);
           SetSheetHeight(160); 
           sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
         }
 		break;
 		
 		/* jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit : Related Partner Start */
 		case 4:      //sheet 2 init
 		    with(sheetObj){
 	      var i=0;

 	      SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
 	     var strRltPrnrTpCd="";
	      var strRltPrnrTpCdVal="";
	      var arrRltPrnrTpCd=strRltPrnrTpCd.split(';');
 	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
 	      var headers = [ { Text:getLabel('CMM_POP_0010_HDR6_1'), Align:"Center"},
 	                  { Text:getLabel('CMM_POP_0010_HDR6_2'), Align:"Center"} ];
 	      InitHeaders(headers, info);

 	      var cols = [ {Type:"Text",      Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
 	             {Type:"Status",    Hidden:1,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag6" },
 	             {Type:"Text",      Hidden:1,  Width:130,  Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
 	             {Type:"Text",      Hidden:1,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"cb_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"cb_dest",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
 	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cb_trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
 	             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"cb_trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
 	             {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"rlt_prnr_tp_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:2 },
 	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"rgst_usrid",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:12 },
 	             {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"rgst_tms",        KeyField:0,   CalcLogic:"",   Format:"YmdHms",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"modi_usrid",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	             {Type:"Date",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"modi_tms",        KeyField:0,   CalcLogic:"",   Format:"YmdHms",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
 	             {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sheet6",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }  ];
 	            if ( arrRltPrnrTpCd.length > 0 ) {
 	      strRltPrnrTpCd = arrRltPrnrTpCd[0];
 	      strRltPrnrTpCdVal = arrRltPrnrTpCd[1];
 	      sheetObj.InitDataCombo(0, "rlt_prnr_tp_cd", strRltPrnrTpCdVal, strRltPrnrTpCd);
 	      }
 	 
 	      InitColumns(cols);

 	      SetEditable(1);
	      SetSheetHeight(160);
 	      SetColProperty("rlt_prnr_tp_cd", {ComboText:strRltPrnrTpCdVal, ComboCode:strRltPrnrTpCd} );
 	      //InitViewFormat(0, "rgst_tms", "MM/dd/yyyy");//날짜 포맷을 월/일/년 으로 설정
 	      //InitViewFormat(0, "modi_tms", "MM/dd/yyyy");//날짜 포맷을 월/일/년 으로 설정
 	      //지원안함[확인요망]HANJIN: 			EditDateFormat="MDY";//날짜 입력을 월/일/년 으로 설정
 	     sheetObj.SetFocusAfterProcess(0);
 	    sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
 	      }


 		break;
 		
 		case 5:   
 	   		 with(sheetObj){

 		      SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );

 		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
 		      var headers = [ { Text:getLabel('SAL_TPM_0010_HDR9'), Align:"Center"} ];
 		      InitHeaders(headers, info);

			var cols = [ {Type : "DelCheck",Hidden : 0,Width : 60,Align : "Center",ColMerge : 1,SaveName : "",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1}, 
				{Type : "seq",Hidden : 1,Width : 50,Align : "Center",ColMerge : 1,SaveName : "seq",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1,EditLen : 3},
				{Type : "Text",Hidden : 0,Width : 300,Align : "Left",ColMerge : 1,SaveName : "trdp_nm",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1,EditLen : 200},
				{Type : "Combo",Hidden : 0,Width : 150,	Align : "Center",ColMerge : 1,SaveName : "trdp_addr_tp",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,	UpdateEdit : 1,InsertEdit : 1},
				{Type : "Text",Hidden : 0,Width : 700,Align : "Left",ColMerge : 1,SaveName : "trdp_add_addr",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 0,InsertEdit : 0,EditLen : 400},
				{Type : "Image",Hidden : 0,Width : 30,Align : "Center",ColMerge : 0,SaveName : "trdp_addr_img",KeyField : 0,CalcLogic : "",Format : "",	PointCount : 0,	UpdateEdit : 0,InsertEdit : 0},
				{Type : "Text",Hidden : 0,Width : 400,Align : "Left",ColMerge : 1,SaveName : "rmk",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1,EditLen : 400},
				{Type : "Text",Hidden : 1,Width : 80,Align : "Center",ColMerge : 1,SaveName : "sheet9",KeyField : 0,CalcLogic : "",Format : "",PointCount : 0,UpdateEdit : 1,InsertEdit : 1},
				{Type : "Status",Hidden : 1,Width : 40,Align : "Center",ColMerge : 1,SaveName : "ibflag9"} ];
 		       
 		      InitColumns(cols);
 		      SetColProperty("trdp_addr_tp", {ComboText:"Local Address|B/L Address|Billing Address", ComboCode:"lcl|bl|blg"} );
 		      SetEditable(0);
 	          SetSheetHeight(200);
 	          //SetSheetWidth(1081);
 		      }		
 			break;
 		
        
    }
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet2_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet3_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet4_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function sheet3_OnSearchEnd(sheetObj, col, sortArrow) {
	for(var i = 1; i < sheetObj.LastRow() + 1; i++){
		if(sheetObj.GetCellValue(i,"sls_his_flat_url") != ""){
			sheetObj.SetCellImage(i,"sls_popup",0);
		}
	}
	
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
	if(sheet1.ColSaveName(Col) == "chk"){
		return;
	}
	
	var formObj=document.form;
	var openMean=formObj.openMean.value ; 
	var retArray="";	
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "trdp_cd"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "shrt_nm"));
	//alert("sheetObj.value===>"+sheetObj.CellValue(Row, "full_nm"));
	retArray += sheetObj.GetCellValue(Row, "trdp_cd");
	retArray += "|";
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
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_addr");	//26
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_addr2");	//27
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "tax_type");	//28
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "over_due");	//29
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "over_limit");	//30
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "grand_total");	//31
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "reserve_field09");	//32
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "profit_share");	//33
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "an_bond_no");	//34
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "an_bond_exp_dt");	//35
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ctrt_no");	//36
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "dflt_addr");	//37
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ofc_fm_hr");	//38
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "ofc_to_hr");	//39
	retArray += "|";
	//#4209 BUYER_ADDR 관련 추가
	retArray += sheetObj.GetCellValue(Row, "cnt_nm");	//40 
	//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "overdue_total");	//41
	/*
	switch(sheetObj.ColSaveName(Col)){
		case "trdp_cd":
if(sheetObj.GetCellValue(Row, "ibflag1") != "I"){
				window.returnValue=retArray;
				window.close();
			}
		break;
	}
	*/
	
	ComClosePopup(retArray);
	/*
	$(parent.document).find(".layer_popup,.layer_popup_bg").fadeOut(100);*/
	//parent.GetPop0010Value(retArray);
	//window.returnValue=retArray;
	//window.close();	
}

function sheet7_OnDblClick(sheetObj,Row,Col){
	var sheet1Row = sheet1.GetSelectRow();
	if(sheet1.GetCellValue(sheet1Row, "ibflag1") == "I"){
		return;
	}	
/*	if(sheet1.ColSaveName(Col) == "chk"){
		return;
	}
	*/
	
	var formObj=document.form;
	var openMean=formObj.openMean.value ; 
	var retArray="";	

	retArray += sheet1.GetCellValue(sheet1Row, "trdp_cd");
	retArray += "|";
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_nm"); //eng namd --> Additional Trade Partner Name
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "pic_nm");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "pic_phn");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "pic_fax");		//5
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "pic_eml");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_add_addr");//eng addr --> Additional Trade Partner Address
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "trdp_tp_cd");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "cmp_rmk");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_nm");		//10 // local name --> Additional Trade Partner Name
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "rep_zip");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "cnt_cd");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "sls_gp_cd");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "crd_lmt_amt");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "cur_lmt_amt");	//15
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_add_addr"); //local addr --> Additional Trade Partner Address
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "cr_term_cd");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "cr_term_dt");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "city_nm");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "state_cd");	//20
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "prefix");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "iata_cd");
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "biz_no");	//23
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "cmdt_cd");	//24
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "cmdt_nm");	//25
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_add_addr");	//26
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_add_addr");	//27
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "tax_type");	//28
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "over_due");	//29
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "over_limit");	//30
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "grand_total");	//31
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "reserve_field09");	//32
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "profit_share");	//33
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "an_bond_no");	//34
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "an_bond_exp_dt");	//35
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "ctrt_no");	//36
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "trdp_add_addr");	//37
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "ofc_fm_hr");	//38
	retArray += "|";
	retArray += sheet1.GetCellValue(sheet1Row, "ofc_to_hr");	//39
	//#4209 BUYER_ADDR 관련 추가
	retArray += sheet1.GetCellValue(Row, "cnt_nm");	//40 

	ComClosePopup(retArray);

}
/* #342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS 
 * 2. addition [CHK)] multi-selection 
 * By Duc.Nguyen 2017.09.13
*/
function selectMultiRow(){
	var sheetObj=docObjects[0];
	var retArray="";
	for(i=1; i <= sheetObj.RowCount(); i++){
		if(sheetObj.GetCellValue(i, "chk") == "1"){		
			retArray += sheetObj.GetCellValue(i, "trdp_cd");
			retArray += "|";
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "eng_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pic_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pic_phn");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pic_fax");		//5
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "pic_eml");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "eng_addr");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "trdp_tp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cmp_rmk");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "locl_nm");		//10
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "rep_zip");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cnt_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "sls_gp_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "crd_lmt_amt");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cur_lmt_amt");	//15
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "lgl_addr");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cr_term_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cr_term_dt");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "city_nm");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "state_cd");	//20
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "prefix");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "iata_cd");
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "biz_no");	//23
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cmdt_cd");	//24
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "cmdt_nm");	//25
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "trdp_addr");	//26
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "trdp_addr2");	//27
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "tax_type");	//28
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "over_due");	//29
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "over_limit");	//30
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "grand_total");	//31
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "reserve_field09");	//32
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "profit_share");	//33
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "an_bond_no");	//34
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "an_bond_exp_dt");	//35
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ctrt_no");	//36
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "dflt_addr");	//37
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ofc_fm_hr");	//38
			retArray += "|";
			retArray += sheetObj.GetCellValue(i, "ofc_to_hr");	//39
			retArray += ";";
		}
	}	
	if(retArray != ""){
		ComClosePopup(retArray);
	}else{
		ComShowMessage(getLabel('FMS_COM_ALT004'));	
	}	
}

/*
function sheet1_OnMouseMove(Button, Shift, X, Y) {
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
    var Row=sheetObj.MouseRow();
    var Col=sheetObj.MouseCol();
    //지원안함[확인요망]HANJIN: sheetObj.MouseToolTipText="";
    //window.status = "OnMouseMove Row=" + Row + ", Col=" + Col + ", Text=" + sText;
  	if(Col == 5){
  		var sText=sheetObj.GetCellText(Row,Col);
  		//풍선도움말 만들기]
  		if(sText.length > 20  ){
  //지원안함[확인요망]HANJIN: 			sheetObj.ToolTipOption="balloon:true;width:320;backcolor:#EBFFFF;forecolor:#333333;title:Address";  
//지원안함[확인요망]HANJIN: 		    sheetObj.MouseToolTipText=sText;
		    sheetObj.MousePointer("Default");
		    window.status(sheetObj.MousePointer);
  		}
  	}
}
*/

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	var sheetObj=docObjects[0];
//	for(i=1;i<=sheetObj.RowCount();i++){
//		if(sheetObj.GetCellValue(i, "trdp_cd") !=""){
//			//sheetObj.RowBackColor(i) = "#C0C0C0";
//			//sheetObj.ColBackColor(i) = "#EFEBEF";
//			//sheetObj.SetCellFontColor(i, "trdp_cd","#FF0000");
//		}
//	}	
}
function sheet1_OnPopupClick(sheetObj, row, col) {
	var colName=sheetObj.ColSaveName(col);
	switch(colName){
		case "cnt_cd":
			var rtnary=new Array(1);
			rtnary[0]="1";
			rtnary[1]="";//대륙코드
			var rtnVal=window.showModalDialog('./CMM_POP_0020.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:560px;dialogHeight:480px");
	 	    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(row, col,rtnValAry[0],0);//cnt_cd
			}
		break;
	}
}
function saveValid(sheetObj){
	var rows=sheetObj.LastRow()+1;
	var cnt=0;
	for(var i=1 ; i < rows ; i++){
if(sheetObj.GetCellValue(i, "ibflag1") == "I"||sheetObj.GetCellValue(i, "ibflag1") == "U"){
if(sheetObj.GetCellValue(i, "cnt_cd") == ""){
				//alert("[Country] is mandatory field!");
				alert(getLabel('FMS_COM_ALT001'));	
				return false;
			}
			cnt++;
		}
	}
	if(cnt == 0){
		//alert("No data to save!");
		alert(getLabel('FMS_COM_ALT028'));	
		return false;
	}else{
		return true;
	}
}
function sheet1_OnSaveEnd(){
	doWork('SEARCHLIST');
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
function sheet1_OnKeyUp(sheetObj, row, col, keyCode, Shift){
	if(keyCode==13 && sheetObj.GetCellValue(row, "ibflag1") != "I"){
		if(Shift == false) {
			sheet1_OnDblClick(sheetObj, row, col);
		}
	}
}
function gridSearch(gridNum) {
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	/* jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit : Related Partner Start */
	var sheetObj3=docObjects[2];
	var sheetObj6=docObjects[3];
	var sheetObj7=docObjects[4];
    var formObj=document.form;
if ( docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "trpd_cd") != "" ) {
    	formObj.f_cmd.value=SEARCHLIST02;
	    if(gridNum=="ALL"||gridNum== "1"){
	    	/* jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit : Related Partner Start */
	    	sheetObj2.DoSearch("SAL_TPM_0014GS.clt",FormQueryString(formObj) );
	    	formObj.f_cmd.value=SEARCHLIST;
	    	sheetObj3.DoSearch("SAL_TPM_0011GS.clt",FormQueryString(formObj) );
	    	sheetObj6.DoSearch("SAL_TPM_0016GS.clt",FormQueryString(formObj) );
	    	sheetObj7.DoSearch("SAL_TPM_0019GS.clt",FormQueryString(formObj) );
		}
	}
}
function sheet1_OnClick(sheetObj, Row, Col){
	switch(sheetObj.ColSaveName(Col)){
		case "trdp_cd":
			if(sheetObj.GetCellValue(Row, "ibflag1") != "I"){
				form.s_trdp_cd.value=sheetObj.GetCellValue(Row, "trdp_cd");
								/* jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit : Related Partner Form Start */
				form.t_city_nm.value=sheetObj.GetCellValue(Row, "city_nm");
				form.t_eng_nm.value=sheetObj.GetCellValue(Row, "eng_nm");
				form.t_lgl_addr.value=sheetObj.GetCellValue(Row, "lgl_addr");
				form.t_state_cd.value=sheetObj.GetCellValue(Row, "state_cd");
				form.t_rep_zip.value=sheetObj.GetCellValue(Row, "rep_zip");
				form.t_cnt_nm.value=sheetObj.GetCellValue(Row, "cnt_nm");
				form.tpSelRow.value=Row;
				/* jsjang 2013.9.4 #17606 : [BINEX] TP Popup, Available Edit : Related Partner Form Start */
				gridSearch(1);
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
function sheet2_OnClick(sheetObj,Row,Col){
	switch (sheetObj.ColSaveName(Col)) {
		/*case "rep_flg" :
			sheetObj.CheckAll("rep_flg", 0, 0);
		break;*/
	}
}
function sheet2_OnChange(sheetObj, Row, Col, Value){
	switch (sheetObj.ColSaveName(Col)) {
		case "rep_flg" :
			if(sheetObj.GetCellValue(Row, "rep_flg") == "1"){
				for(var i = 1; i < sheetObj.LastRow()+1; i++){
					if(i != Row){
						sheetObj.SetCellValue(i, "rep_flg", "0", "0");
					}
				}
			}
			bl_addr_chg();
		break;
	}
}
function sheet3_OnClick(sheetObj, Row, Col){
	switch(sheetObj.ColSaveName(Col)){
		case "sls_popup" :	//파일다운로드
if(sheetObj.GetCellValue(Row, "sls_his_flat_nm")!=''){
		    	document.frm2.trdp_cd.value=form.s_trdp_cd.value;
document.frm2.cntc_seq.value=sheetObj.GetCellValue(Row, "cntc_seq");
		    	frm2.target="fdiframe";
				frm2.submit();
			}
		break;
		case "sls_his_tit":
form.s_s3_sls_his_ctnt.value=sheetObj.GetCellValue(Row, "sls_his_ctnt");
		break;
	}
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.form;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col = sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
//				alert("You can't Hidden this column.");
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col,1);
			sheetObj.SetColWidth(col,1);
		break;
	 }
}
function bl_addr_chg(){
	var formObj=document.form;
	var sheetObj1=docObjects[0];	
	var loclAddr="";
	var addStr=formObj.t_city_nm.value;
	if(formObj.t_lgl_addr.value != ""){
		if(formObj.t_eng_nm.value != ""){
			loclAddr=formObj.t_eng_nm.value + "\r\n" +formObj.t_lgl_addr.value;
		}else{
			loclAddr=formObj.t_lgl_addr.value;
		}
	}
	if(formObj.t_state_cd.value != ""){
		addStr=addStr != "" ? addStr + ", " + formObj.t_state_cd.value : formObj.t_state_cd.value;
	}
	if(formObj.t_rep_zip.value != "" ){
		if(formObj.t_state_cd.value != ""){
			addStr=addStr + " " + formObj.t_rep_zip.value;
		}else{
			addStr=addStr != "" ? addStr + ", " + formObj.t_rep_zip.value : formObj.t_rep_zip.value;
		}
	}
	
	// #48740 - [IMPEX] TRADE PARTNER'S COUNTRY INFO TO SHOW ON BL ADDRESSES
	if(formObj.t_cnt_nm.value != "" ){
		addStr=addStr != "" ? addStr + " " + formObj.t_cnt_nm.value : formObj.t_cnt_nm.value;
	}
	
	var opt_key = "BL_ADDR_ATTN";
	ajaxSendPost(setBlAddrAttnReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//LHK 2013.07.11 BL Adress 에 Pic 정보 추가 
	var sheetObj=docObjects[1];	
	var totRow=sheetObj.LastRow()+1;
	var picInfoStr="";
	var selRow=form.tpSelRow.value;
	for(var i=1; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'rep_flg')=='1'){
			if (bl_addr_attn != "N"){
				if(sheetObj.GetCellValue(i, 'pic_nm') != "" || sheetObj.GetCellValue(i, 'pic_eml') != ""){
					picInfoStr="ATTN:";
				}
				picInfoStr=picInfoStr + sheetObj.GetCellValue(i, 'pic_nm');
				if(sheetObj.GetCellValue(i, 'pic_eml') != ""){
					if(sheetObj.GetCellValue(i, 'pic_nm') == ""){
						picInfoStr=picInfoStr + sheetObj.GetCellValue(i, 'pic_eml');
					}else{
						picInfoStr=picInfoStr + " (" + sheetObj.GetCellValue(i, 'pic_eml') + ")";
					}
				}
			}
			if(sheetObj.GetCellValue(i, 'pic_phn') != ""){
				if(picInfoStr == ""){
					picInfoStr="TEL:" + sheetObj.GetCellValue(i, 'pic_phn');
				}else{
					picInfoStr=picInfoStr + "\r\n" + "TEL:" + sheetObj.GetCellValue(i, 'pic_phn');
				}
			}
			if(sheetObj.GetCellValue(i, 'pic_fax') != ""){
				if(picInfoStr == ""){
					picInfoStr="Fax:" + sheetObj.GetCellValue(i, 'pic_fax');
				}else{
					picInfoStr=picInfoStr + " Fax:" + sheetObj.GetCellValue(i, 'pic_fax');
				}
			}	
			sheetObj1.SetCellValue(selRow, "pic_nm",sheetObj.GetCellValue(i, 'pic_nm'),0);
			sheetObj1.SetCellValue(selRow, "pic_phn",sheetObj.GetCellValue(i, 'pic_phn'),0);
			sheetObj1.SetCellValue(selRow, "pic_fax",sheetObj.GetCellValue(i, 'pic_fax'),0);
		}
	}
	if(addStr != ""){
		addStr=addStr + "\r\n" + picInfoStr;
	}else{
		addStr=picInfoStr;
	}
	if(loclAddr != ""){
		if(addStr != ""){
			formObj.t_eng_addr.value=loclAddr + "\r\n" + addStr;
		}else{
			formObj.t_eng_addr.value=loclAddr;
		}
	}else{
		formObj.t_eng_addr.value=addStr;
	}
	if(!checkTxtAreaLn(formObj.t_eng_addr, 62, 6, 'Name on B/L')){
		//formObj.t_eng_addr.focus();
	}
	//alert(formObj.t_eng_addr.value);
	//var sheetObj1 = docObjects[0];	
	//var selRow = form.tpSelRow.value;
	sheetObj1.SetCellValue(selRow, "eng_addr",formObj.t_eng_addr.value,0);
}

function sheet1_OnBeforeEdit(sheetObj,Row, Col){
	if(sheet1.ColSaveName(Col) == 'lgl_addr' || sheet1.ColSaveName(Col) == 'tax_iss_addr' || sheet1.ColSaveName(Col) == 'eng_addr'){
		sheet1.SetRowHeight(Row, 100);
	} else {
		sheet1.SetRowHeight(Row, 26);
	}
}
function sheet1_OnAfterEdit(sheetObj,Row, Col){
	if(sheet1.ColSaveName(Col) == 'lgl_addr' || sheet1.ColSaveName(Col) == 'tax_iss_addr' || sheet1.ColSaveName(Col) == 'eng_addr'){
		var cellStr = sheet1.GetCellValue(Row,Col);		
		var rowVal = (cellStr.match(/\n/g) == null ? 1 : cellStr.match(/\n/g).length +1) * 20;
		sheet1.SetRowHeight(Row, rowVal);
	}
}

var bl_addr_attn;

function setBlAddrAttnReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		bl_addr_attn=doc[1];
	} else {
		bl_addr_attn="";
	}
}

function codeNameAction(str, obj, tmp){
	ctlKind=obj;
	if ( obj.value != "" ) {
		if ( tmp == "onKeyUp" ) {
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else{
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="user"){
				formObj.s_sls_usrid.value=masterVals[0];
				formObj.s_sls_usrnm.value=masterVals[4];
			}else if(CODETYPE =="state"){
				formObj.s_state_cd.value=masterVals[0];
			}
		}else{
			if(CODETYPE =="user"){
				formObj.s_sls_usrid.value="";
				formObj.s_sls_usrnm.value="";
			}else if(CODETYPE =="state"){
				formObj.s_state_cd.value="";
			}
		}
	}else{
		//Error Errupt!	
		//alert(getLabel('FMS_COM_ERR001'));		
	}
}

function STATE_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_state_cd.value=rtnValAry[0];//cd_val
		formObj.s_cnt_cd.value=rtnValAry[4];//cnt_cd
  }
}

function USER_POPLIST(rtnVal){
	var formObj=document.form;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_sls_usrid.value=rtnValAry[0];
		formObj.s_sls_usrnm.value=rtnValAry[4];
	}
}

function trdpAddrAdd(){
  	var formObj = document.form;

	rtnary=new Array();
	rtnary[0]= formObj.s_trdp_cd.value;
	rtnary[1]= "";
	rtnary[2]= "add";

  	if(!formObj.s_trdp_cd.value){
  		//TRDP_CD가 없는경우. TRDP를 선택한 상태에서 ADD를 해야한다.
	}else {
		callBackFunc = "trdpAddr_callBackFunc";
		modal_center_open('./CMM_POP_0011.clt', rtnary, 600,500,"yes");			
	}
  }

  function trdpAddrModify(){
  	var formObj = document.form;
  	var sheetObj7=docObjects[4];
	

	rtnary=new Array();
	rtnary[0]= formObj.s_trdp_cd.value;
	rtnary[1]= sheetObj7.GetCellValue(sheetObj7.GetSelectRow(),"seq");
	rtnary[2]= "modify";

  	if(!formObj.s_trdp_cd.value){
  		//TRDP_CD가 없는경우. TRDP를 선택한 상태에서 ADD를 해야한다.
	}else {
		callBackFunc = "trdpAddr_callBackFunc";
		modal_center_open('./CMM_POP_0011.clt?trdp_seq='+rtnary[1], rtnary, 600,500,"yes");			
	}
  }

function trdpAddr_callBackFunc(rtnVal){
	var sheetObj7=docObjects[4];
    var formObj=document.form;	
    formObj.f_cmd.value=SEARCHLIST;
	sheetObj7.DoSearch("SAL_TPM_0019GS.clt",FormQueryString(formObj) );
}