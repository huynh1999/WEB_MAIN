/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : EDI_CSTM_0020.jsp
*@FileTitle  : 항공수출 미세관 AMS 화물적화목록 EDI 처리
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
var selectRow=0;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(frm1.f_obdt_bgn_dt, frm1.f_obdt_end_dt);
}
function doWork(srcName){
	
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	
	switch(srcName) {
		case "SEARCHLIST01":	//OB Date, 편명목록 조회
			if(!chkSearchCmprPrd(false, frm1.f_obdt_bgn_dt, frm1.f_obdt_end_dt)){
				return;
			}
			//항목초기화
			resetEdiValue();
			dispEdiViewTb(false);
			docObjects[1].RemoveAll();
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("EDI_CSTM_0020GS.clt",   FormQueryString(frm1) );
		break;
		case "SEARCHLIST02":	//BL목록 조회
			frm1.f_cmd.value=SEARCHLIST02;
			docObjects[1].DoSearch("EDI_CSTM_0020_1GS.clt", FormQueryString(frm1) );
		break;
		case "SEARCHLIST03":	//최초 저장후 좌측 BL목록 조회시
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("EDI_CSTM_0020GS.clt",   FormQueryString(frm1) );
		break;
		case "COMMAND01":		//전송데이터 생성
			if(checkInpuVals()){
				//'전문 정보를 생성하시겠습니까?'
				if(confirm(getLabel('FMS_COM_CFMCRE'))){
					frm1.f_cmd.value=COMMAND01;
					docObjects[0].DoAllSave("EDI_CSTM_0020GS.clt",  FormQueryString(frm1)+'&'+docObjects[1].GetSaveString(true));
				}
			}
		break;
		case "COMMAND02":		//전송데이터 수정
			if(checkInpuVals()){
				//'전문 정보를 수정하시겠습니까?'
				if(confirm(getLabel('FMS_COM_CFMMOD'))){
					frm1.f_cmd.value=COMMAND02;
					docObjects[0].DoAllSave("EDI_CSTM_0020GS.clt", FormQueryString(frm1)+'&'+docObjects[1].GetSaveString(true));
				}
			}
		break;
		case "COMMAND03":		//전송데이터 삭제
			//'전문 정보를 삭제하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
				frm1.f_cmd.value=COMMAND03;
				docObjects[0].DoAllSave("EDI_CSTM_0020GS.clt", FormQueryString(frm1));
			}
		break;
		case "COMMAND04":		//EDI 전문 전송
			selectRow = sheetObj.GetSelectRow();
    		if (!ediValidation(sheetObj,selectRow)){
    			return false;
    		}
			//'AMS EDI 전문을 KTNET으로 전송하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMSEN'))){
				frm1.f_cmd.value=COMMAND04;
				docObjects[0].DoAllSave("EDI_CSTM_0020GS.clt", FormQueryString(frm1));
			}
		break;
		case "COMMAND05":		//전송자료 재생성
			//'기존 전문을 바탕으로 EDI 전문정보를 생성하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMCRE'))){
				frm1.f_cmd.value=COMMAND05;
				docObjects[0].DoAllSave("EDI_CSTM_0020GS.clt", FormQueryString(frm1));
			}
		break;
		case "COMMAND06":		//EDI전문 재전송
			selectRow = sheetObj.GetSelectRow();
    		if (!ediValidation(sheetObj,selectRow)){
    			return false;
    		}
			//'AMS EDI 전문을 KTNET으로 재전송하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMSEN'))){
				frm1.f_cmd.value=COMMAND04;
				docObjects[0].DoAllSave("EDI_CSTM_0020GS.clt", FormQueryString(frm1));
			}
		break;
		case "CALLCT":
			//window.open('http://www.ctradeworld.com');
			ajaxSendPost(getCtradeAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCtradeKey&AIR_SEA_CLSS_CD=A', './GateServlet.gsl');
		break;
		/*case "RESET":		//초기화
			resetEdiValue();
			docObjects[1].RemoveAll();
			doWork('SEARCHLIST01');
		break;
		case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(1);
			rtnary[0]="A";//airSeaTp
			rtnary[1]="O";//bndTp;
			callBackFunc = "MBL_POPLIST";
	  	    modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

		break;*/
	}
}

/**
 * Ctrade 화면
 **/
function getCtradeAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split(',');
			var myform=document.forms[0];
			myform.insertBefore(createHidden("ctwId",masterVals[0]));
			myform.insertBefore(createHidden("ctwPass",masterVals[1]));
			myform.insertBefore(createHidden("returnUrl","http://www.ctradeworld.com/logis/logis.jsp?topmenu=mfcs"));
			myform.action="http://www.ctradeworld.com/ctwpass/autoLoginChk.jsp";
			myform.method="post";
			myform.target="winName";
			window.open("about:blank","winName","toolbar=no,scrollbars=no,resizable=yes, left=100, width=900, height=600");
			myform.submit();
		}
	}
}

var rtnary=new Array(1);
var callBackFunc = "";
/**
 * EDI 전송전문 내용보기
 */
function showEdiMsg(){
	var param='f_edi_cre_seq=';
	param+= frm1.f_edi_cre_seq.value;
	param+= '&f_edi_msg_no=';
	param+= frm1.sndKeyList.value;
	
	modal_center_open('./EDI_CSTM_0090.clt?'+param, '', 756,460,"yes");
}

function checkInpuVals(){
	var isOk=true;
	if(checkInputVal(frm1.disp_trsp_co_scac_cd.value, 2, 2, "T", '항공사 코드')!='O'){
		frm1.disp_trsp_co_scac_cd.focus();
		isOk=false;
	}else if(checkInputVal(frm1.disp_fwrd_scac_cd.value, 4, 4, "T", '포워더 코드')!='O'){
		frm1.disp_fwrd_scac_cd.focus();
		isOk=false;
	}else if(checkInputVal(frm1.disp_pol.value, 3, 3, "T", '출발지 공항 코드')!='O'){
		frm1.disp_pol.focus();
		isOk=false;
	}else if(checkInputVal(frm1.disp_pod.value, 3, 3, "T", '출발지 공항 코드')!='O'){
		frm1.disp_pod.focus();
		isOk=false;
	}else if(checkSelectVal(frm1.disp_ams_msg_snd_tp.value, '전송유형')!='O'){
		isOk=false;
	}else{
		var objLen=docObjects[1].rows;
		for(var i=2; i < objLen; i++){
			if(docObjects[1].GetCellValue(i, 'pol')==''){
				//alert('HAWB에 해당 정보를 입력해주십시오!');
				alert(getLabel('FMS_COM_ALT007') + " \n- " + getLabel('FMS_COD_POLC'));
				isOk=false;		
				break;
			}
		}
	}
	return isOk;
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
        	var cal=new ComCalendarFromTo();
            cal.select(formObj.f_obdt_bgn_dt, formObj.f_obdt_end_dt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * 조회팝업여부
 */
function dispEdiViewTb(isView){
	var ediObj=getObj('ediView');
	if(isView){
		ediObj.style.display='block';	
	}else{
		ediObj.style.display='none';
		var pSelect=frm1.sndKeyList;	
		var optVal=pSelect.options;
		var sLen=optVal.length;
		for(var p=sLen; p >=0; p--){
			optVal.remove(p);
		}
	}
}
/**
 * MAWB로 등록여부 확인 및 기초정보 표시
 */
function checkMblInfos(){
	var tmpMblNo=frm1.disp_mawb_no.value;
	if(tmpMblNo!=''){
		//'전문 정보를 생성하시겠습니까?'
		if(confirm(getLabel('FMS_COM_CFMCRE'))){
			ajaxSendPost(dispMblInfos, 'reqVal', '&goWhere=aj&bcKey=searchEdiMblInfo&f_edi_msg_tp=AA&f_mbl_no='+frm1.disp_mawb_no.value + '&disp_ams_msg_snd_tp=' + frm1.disp_ams_msg_snd_tp.value , './GateServlet.gsl');
		}
	}else{
		//alert('MAWB를 입력하세요!');
		alert(getLabel('FMS_COM_ALT001'));
		frm1.disp_mawb_no.focus();
	}
}
//코드표시 Ajax
function dispMblInfos(reqVal){
	try{
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			if(rtnArr[0]=='O'){
				var cdVals=rtnArr[1].split(',');
				frm1.disp_flt_no.value=cdVals[0];
				frm1.disp_workday.value=cdVals[1];
				frm1.disp_pol.value=cdVals[2];
				frm1.disp_pod.value=cdVals[3];
				if(cdVals[4] != "null"){
					frm1.disp_pck_qty.value=cdVals[4];
				}
				if(cdVals[5] != "null"){
					frm1.disp_grs_wgt.value=cdVals[5];
				}
				frm1.f_edi_cre_seq.value=cdVals[6];
				frm1.disp_trsp_co_scac_cd.value=cdVals[7];
				frm1.disp_fwrd_scac_cd.value=cdVals[8];
				frm1.disp_edi_sts.value='미작성';
				frm1.cur_edi_sts.value='T';
				//작성 버튼 숨기기
				//mblAdd.style.display='none';
				//좌측 목록을 조회함
				doWork('SEARCHLIST03');
				//HBL목록 재조회
				doWork('SEARCHLIST02');
				//dispEdiViewTb(false);
				getObj('btn1').style.display='block';
			}else if(rtnArr[0]=='U'){
			}else{
				//alert('본 MBL은 이미 AMS전문으로 등록되어있습니다!');
				alert(getLabel('FMS_COM_ALT012'));
			}
		}else{
			//Error Errupt!	
			alert(getLabel('FMS_COM_ERR001'));		
		}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message);
	}
}
/**
 * 작성된 전문 목록을 조회함
 */
function setEdiSndKeyList(){
	ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchEdiMsgKey&edi_cre_seq='+frm1.f_edi_cre_seq.value+'&edi_msg_seq='+frm1.f_edi_msg_seq.value, './GateServlet.gsl');
}
//코드표시 Ajax
function dispAjaxReq(reqVal){
	try{
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			//Perent의 <Select>의 options를 제거한다.
			//Perent의 <Select>의 options를 제거한다.
			var pSelect=frm1.sndKeyList;	
			var optVal=pSelect.options;
			var sLen=optVal.length;
			for(var p=sLen; p >=0; p--){
				optVal.remove(p);
			}
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			for(var i=0; i<rtnArr.length; i++){
				var cdVals=rtnArr[i].split(',');
				if(typeof(cdVals[1])!='undefined'){
					var oOption=document.createElement("OPTION");
					optVal.add(oOption);
					oOption.innerText=cdVals[1];
					oOption.value=cdVals[0];
				}
			}
		}else{
			//Error Errupt!	
			alert(getLabel('FMS_COM_ERR001'));		
		}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message);
	}
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var headerRowCnt=2;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
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
		case 1:      //House B/L Information
			with (sheetObj) {
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			    var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			    var headers = [ { Text:getLabel('EDI_CSTM_0020_HDR1'), Align:"Center"} ];
			    InitHeaders(headers, info);
			    var cols = [ {Type:"Status",   Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"ibflag"			},
				             {Type:"Text",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"mawb_no" 		},
				             {Type:"Text",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"flt_no" 			},
				             {Type:"Combo",    Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"ams_msg_snd_tp" 	},
				             {Type:"Combo",    Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"edi_sts" 		},
				             {Type:"Text",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"cre_dt" 			},
				             {Type:"Text",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"workday" 		},
				             {Type:"Text",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"pol_cd" 			},
				             {Type:"Text",     Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:"pod_cd" 			},
				             {Type:"Text",     Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"smt_dt" 			},
				             {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_cre_seq" 	},
				             {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_msg_seq" 	},
				             {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"trsp_co_scac_cd" },
				             {Type:"Text",     Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"fwrd_scac_cd" 	},
				             {Type:"Text",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"mbl_pck_qty" 	},
				             {Type:"Text",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"mbl_grs_wgt" 	},
				             {Type:"Text",     Hidden:1,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"intg_bl_seq" 	} ];
			    InitColumns(cols);
			    SetEditable(0);
			    SetColProperty("ams_msg_snd_tp", {ComboText:AMS_SEND_TP_NM, ComboCode:AMS_SEND_TP_CD} );
			    SetColProperty("edi_sts", {ComboText:EDI_STS_NM, ComboCode:EDI_STS_CD} );
			    //SetColProperty(3, {ComboText:"원본전송|수정", ComboCode:"O|U"} );
			    //SetColProperty(4, {ComboText:"미작성|작성|전송완료|재전송|재작성", ComboCode:"|C|S|R|N"} );
			    SetSheetHeight(370);
			}
		break;
		case 2:      //House B/L Information
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('EDI_CSTM_0020_HDR2_1'), Align:"Center"},
		                        { Text:getLabel('EDI_CSTM_0020_HDR2_2'), Align:"Center"} ];
		        InitHeaders(headers, info);
		        var cols = [ {Type:"Status",   Hidden:1,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"ibflag" 		},
				             {Type:"Text",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"hbl_no" 		},
				             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"pol" 		},
				             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"pod" 		},
				             {Type:"Int",      Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",    KeyField:0,   CalcLogic:"",   Format:"NullInteger", PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Float",    Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt",    KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
				             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"itm_nm1" 	},
				             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"itm_nm2" 	},
				             {Type:"Text",     Hidden:1,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"cre_dt" 		},
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"shp_co_nm" 	},
				             {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"shp_cnt_cd" 	},
				             {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"shp_ste" 	},
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"shp_plc" 	},
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"shp_st" 		},
				             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"shp_zip_cd" 	},
				             {Type:"Text",     Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"shp_phn_no" 	},
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cnee_co_nm" 	},
				             {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"cnee_cnt_cd" },
				             {Type:"Text",     Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"cnee_ste" 	},
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cnee_plc" 	},
				             {Type:"Text",     Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cnee_st" 	},
				             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cnee_zip_cd" },
				             {Type:"Text",     Hidden:1,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"cnee_phn_no" },
				             {Type:"Text",     Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"hbl_seq" 	},
				             {Type:"Text",     Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"mbl_seq" 	},
				             {Type:"Text",     Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"mbl_no"  	} ];
		        InitColumns(cols);
		        SetEditable(0);
		        SetSheetHeight(235);
		        sheetObj.SetFocusAfterProcess(0);
			}
		break;
	}
}
function sheet1_OnSaveEnd(errObj){
	var curSts='';
	var selecRow=-1;
	for(var i=1; i <= docObjects[0].RowCount(); i++){
		if(docObjects[0].GetCellValue(i, 'intg_bl_seq') == frm1.f_intg_bl_seq.value){
			curSts=docObjects[0].GetCellValue(i, 'edi_sts');
			selecRow=i;
			break;
		}
	}
	//삭제된 경우
	if(curSts==''){
		resetEdiValue();
		docObjects[1].RemoveAll();
	}else{
		//등록/수정 인 경우
		if(curSts=='C'||curSts=='S'||curSts=='N'){
			docObjects[0].SetSelectRow(selecRow, 0);
			sheet1_OnClick(docObjects[0], selecRow, 1);			
		}
	}
}
function sheet1_OnClick(sheetObj, row, col){
	//기존값 초기화
	resetEdiValue();
	//작성 버튼 숨기기
	//mblAdd.style.display='none';
	//frm1.disp_mawb_no.style.class = 'search_form-disable';
	frm1.disp_mawb_no.readOnly=true;
	//AMS추가
	frm1.disp_mawb_no.value=sheetObj.GetCellValue(row, 'mawb_no');
	frm1.disp_fwrd_scac_cd.value=sheetObj.GetCellValue(row, 'fwrd_scac_cd');
	frm1.disp_trsp_co_scac_cd.value=sheetObj.GetCellValue(row, 'trsp_co_scac_cd');
	frm1.disp_pol.value=sheetObj.GetCellValue(row, 'pol_cd');
	frm1.disp_pod.value=sheetObj.GetCellValue(row, 'pod_cd');
	//frm1.disp_pck_qty.value=sheetObj.GetCellValue(row, 'mbl_pck_qty');
	//frm1.disp_grs_wgt.value=sheetObj.GetCellValue(row, 'mbl_grs_wgt');
	frm1.disp_cre_dt.value=sheetObj.GetCellValue(row, 'cre_dt');
	//EDI처리내역 상세에 값을 Setting함
	frm1.disp_flt_no.value=sheetObj.GetCellValue(row, 'flt_no');
	frm1.disp_workday.value=sheetObj.GetCellValue(row, 'workday');
	frm1.disp_edi_sts.value=sheetObj.GetCellText(row, 'edi_sts');
	frm1.cur_edi_sts.value=sheetObj.GetCellValue(row, 'edi_sts');
	frm1.disp_smt_dt.value=sheetObj.GetCellValue(row, 'smt_dt');
	frm1.f_edi_sts.value=sheetObj.GetCellValue(row, 'edi_sts');
	frm1.f_edi_msg_no.value=sheetObj.GetCellValue(row, 'edi_msg_no');
	frm1.f_edi_cre_seq.value=sheetObj.GetCellValue(row, 'edi_cre_seq');
	frm1.f_edi_msg_seq.value=sheetObj.GetCellValue(row, 'edi_msg_seq');
	frm1.f_intg_bl_seq.value=sheetObj.GetCellValue(row, 'intg_bl_seq');
	var sndTp=sheetObj.GetCellValue(row, 'ams_msg_snd_tp');
	var opts=frm1.disp_ams_msg_snd_tp.options;
	for(var i=1; i < opts.length; i++){
		if(opts[i].value==sndTp){
			opts[i].selected=true;
			break;
		}
	}
	//frm1.disp_ams_msg_snd_tp.value = sheetObj.CellValue(row, 'edi_sts');	
	//작성전
	if(frm1.f_edi_cre_seq.value==''){
		dispEdiViewTb(false);
		getObj('btn1').style.display='block';
	//저장후
	}else{
		//저장이후
		if(frm1.f_edi_sts.value=='C'||frm1.f_edi_sts.value=='N'){
			dispEdiViewTb(false);
			getObj('btn2').style.display='block';
		}else if(frm1.f_edi_sts.value=='S'){
			if(frm1.f_edi_sts.value=='S'){
				dispEdiViewTb(true);
				setEdiSndKeyList();
			}
			getObj('btn3').style.display='block';
		}
	}
	doWork('SEARCHLIST02');
}
/**
 * BL 입력팝업 호출
 */
function sheet2_OnDblClick(sheetObj, row, col){
	/*var callParam='?f_bl_seq='+sheetObj.GetCellValue(row, 'hbl_seq');
	callParam+= '&f_edi_cre_seq=';
	callParam+= frm1.f_edi_cre_seq.value;
	callParam+= '&f_edi_msg_seq=';
	callParam+= frm1.f_edi_msg_seq.value;
	popGET('EDI_CSTM_0021.clt'+callParam, '', 450, 610);*/
}
function resetEdiValue(){
	frm1.f_cmd.value='';
	frm1.obdt_fltno.value='';
	getObj('btn1').style.display='none';
	getObj('btn2').style.display='none';
	getObj('btn3').style.display='none';
	//mblAdd.style.display='block';
	frm1.disp_mawb_no.readOnly=false;
	//AMS추가
	frm1.disp_mawb_no.value='';
	frm1.disp_fwrd_scac_cd.value='';
	frm1.disp_trsp_co_scac_cd.value='';
	frm1.disp_pol.value='';
	frm1.disp_pod.value='';
	frm1.disp_pck_qty.value='';
	frm1.disp_grs_wgt.value='';
	frm1.disp_edi_sts.value='';
	frm1.cur_edi_sts.value='';
	frm1.disp_flt_no.value='';
	frm1.disp_workday.value='';
	frm1.disp_smt_dt.value='';
	frm1.f_edi_msg_no.value='';
	frm1.f_edi_msg_seq.value='';
	frm1.disp_bl_cnt.value='';
	frm1.disp_cre_dt.value='';
	frm1.disp_ams_msg_snd_tp.value='';
	frm1.val_msg.value = '';
	
}
function sheet2_OnSearchEnd(obj){
	var formObj=document.frm1;
	//frm1.disp_bl_cnt.value=obj.rows-2;
	frm1.disp_bl_cnt.value=obj.RowCount();
	var mbl_pck_qty=0;
	var mbl_grs_wgt=0;
	for(var i=2; i<=docObjects[1].RowCount()+1;i++){
		mbl_pck_qty += parseInt(eval(docObjects[1].GetCellValue(i, "pck_qty")).toFixed(0));
		mbl_grs_wgt += parseFloat(eval(docObjects[1].GetCellValue(i, "grs_wgt")).toFixed(2));
	}
	formObj.disp_pck_qty.value=mbl_pck_qty;
	formObj.disp_grs_wgt.value=mbl_grs_wgt;
	var f_mbl_no=formObj.disp_mawb_no.value;
	/*
	alert("mbl_pck_qty :"+mbl_pck_qty);
	alert("mbl_grs_wgt :"+mbl_grs_wgt);
	alert("f_mbl_no :"+f_mbl_no);
	alert("edi_cre_seq :"+frm1.f_edi_cre_seq.value);
	*/
	//MBL총수량,총중량을 수정한다.
	/*if(frm1.f_edi_cre_seq.value != ""){
		ajaxSendPost(dispMblInfos, 'reqVal', '&goWhere=aj&bcKey=updateEdiMblInfo&edi_cre_seq='+frm1.f_edi_cre_seq.value+'&mbl_pck_qty='+mbl_pck_qty+'&mbl_grs_wgt='+mbl_grs_wgt+'&f_mbl_no='+f_mbl_no, './GateServlet.gsl');
	}*/
}
function doEnter(){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		doWork("SEARCHLIST01");
	}
}

function MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
  	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.disp_mawb_no.value=rtnValAry[0];
	}
}

function ediValidation(sheetObj, curRow) {
	
	var formObj=document.frm1;
	
	//SI EDI Validation check
	
	var valMsgArr = new Array();
	var hblSheet = docObjects[1];
	
	// 1. 허용된 선사인가? Com_Cd로 조회 > E001
	/*var lnrList = new Array();
	var existLnrList = false;
	if (trim(LNRCD) != "") {
		lnrList = LNRCD.split("|");
		if ( lnrList.length > 0){
			var lnr_cd = sheetObj.GetCellValue(row, "lnr_trdp_cd");
			
			for (var i=0;i<lnrList.length;i++) {
				if (lnrList[i] == lnr_cd) {
					existLnrList = true;
					break;
				}
			}
			
			if (!existLnrList) {
				valMsgArr.push(getLabel('EDI_COM_ALT009'));
			}
		}
	}*/
		
	// 2. VSL VVD Check 
	/*var formObj=document.frm1;
	var vmlNm = formObj.vsl_nm.value();
	var voy   = formObj.voy.value();
	
	if (vmlNm == "" || voy == ""){
    	alert(getLabel('FMS_COM_ALT007') + "\n - "+ "Vessel/Voyage");
    	return false;
	}*/
	
	// 3. 이외 항목 check 
	for(var i=2; i<hblSheet.LastRow() + 1; i++){
		
		var mbl_no 		= hblSheet.GetCellValue(i,"mbl_no");
		var pck_qty 	= hblSheet.GetCellValue(i,"pck_qty");
		var grs_wgt 	= hblSheet.GetCellValue(i,"grs_wgt");
		var itm_nm1 	= hblSheet.GetCellValue(i,"itm_nm1");
		var shp_co_nm 	= hblSheet.GetCellValue(i,"shp_co_nm");
		var shp_cnt_cd 	= hblSheet.GetCellValue(i,"shp_cnt_cd");
		var shp_ste 	= hblSheet.GetCellValue(i,"shp_ste");
		var shp_plc 	= hblSheet.GetCellValue(i,"shp_plc");
		var shp_st	 	= hblSheet.GetCellValue(i,"shp_st");
		var shp_zip_cd	= hblSheet.GetCellValue(i,"shp_zip_cd");
		var cnee_co_nm 	= hblSheet.GetCellValue(i,"cnee_co_nm");
		var cnee_cnt_cd = hblSheet.GetCellValue(i,"cnee_cnt_cd");
		var cnee_ste 	= hblSheet.GetCellValue(i,"cnee_ste");
		var cnee_plc 	= hblSheet.GetCellValue(i,"cnee_plc");
		var cnee_st	 	= hblSheet.GetCellValue(i,"cnee_st");
		var cnee_zip_cd	= hblSheet.GetCellValue(i,"cnee_zip_cd");
		
		var row = i - 1;
		
		// Master B/L 번호 Check
		if(trim(mbl_no) == ""){
			valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT055'));
		}
		
		// 포장개수 Check 
		if (trim(pck_qty) == "" || trim(pck_qty)=="0") {
			valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT056'));
		}
		
		// 중량 Check
		if (trim(grs_wgt) == "" || trim(grs_wgt)=="0") {
			valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT058'));
		}
		
		// 품명 Check 
		if (trim(itm_nm1) == "") {
			valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT060'));
		}
		
		// 송하인 상호 또는 성명 Check 
		if (trim(shp_co_nm) == "") {
			valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT061'));
		}
		
		// 송하인 주소 Check 
		if ((trim(shp_cnt_cd) == "") || (trim(shp_plc) == "") || (trim(shp_st) == "")) {
			valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT062'));
		}
		
		// 수하인 상호 또는 성명 Check 
		if (trim(cnee_co_nm) == "") {
			valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT063'));
		}
		
		// 수하인 주소 Check 
		if ((trim(cnee_cnt_cd) == "") || (trim(cnee_plc) == "") || (trim(cnee_st) == "")) {
			valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT069'));
		}
		
		// 도착지가 미국이나 캐나다인 경우 STATE, ZIP CODE 필수 Check
		if(cnee_cnt_cd == "US" || cnee_cnt_cd == "CA"){
			if(cnee_ste == ""){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT072'));
			}
			if(cnee_zip_cd == ""){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT073'));
			}
		}
		
		// 도착지가 멕시코나 브라질인 경우 STATE 필수 Check
		if(cnee_cnt_cd == "MX" || cnee_cnt_cd == "BR"){
			if(cnee_ste == ""){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT072'));
			}
		}
	}
    
    if(valMsgArr.length > 0){
    	formObj.val_msg.value = "";
    	for(var i=0; i<valMsgArr.length; i++){
    		formObj.val_msg.value += ((i+1) + ". " + valMsgArr[i] + "\n");
	    }
    	disp_val_msg.style.display='inline';
    	return false;
    }
    return true;
}