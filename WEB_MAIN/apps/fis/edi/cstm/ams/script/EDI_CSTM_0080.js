//=========================================================
//*@FileName   : EDI_CSTM_0080.jsp
//*@FileTitle  : 해운수출 미세관 AMS 화물적화목록 EDI 처리
//*@Description: 해운수출 미세관 AMS 화물적화목록 EDI 처리
//*@author     : Kang,Jung-Gu - Cyberlogitec
//*@version    : 1.0 - 07/23/2009
//*@since      : 07/23/2009
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/28
//*@since      : 2014/07/28
//=========================================================
/**
 * 화면로드 후 초기값 세팅
 */
var callBackFunc = "";
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(frm1.f_obdt_bgn_dt, frm1.f_obdt_end_dt);
}
function doWork(srcName){
	switch(srcName) {
		case "SEARCHLIST01":	//OB Date, 편명목록 조회
			//항목초기화
			resetEdiValue();
			docObjects[1].RemoveAll();
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("EDI_CSTM_0080GS.clt",   FormQueryString(frm1) );
		break;
		case "SEARCHLIST02":	//BL목록 조회
			frm1.f_cmd.value=SEARCHLIST02;
			docObjects[1].DoSearch("EDI_CSTM_0080_1GS.clt", FormQueryString(frm1) );
		break;
		case "SEARCHLIST03":	//최초 저장후 좌측 BL목록 조회시
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("EDI_CSTM_0080GS.clt",   FormQueryString(frm1) );
		break;
		case "COMMAND01":		//전송데이터 생성
			if(checkInpuVals()){
				//'전문 정보를 생성하시겠습니까?'
				if(confirm(getLabel('FMS_COM_CFMCRE'))){
					frm1.f_cmd.value=COMMAND01;
					docObjects[0].DoAllSave("EDI_CSTM_0080GS.clt",  FormQueryString(frm1)+'&'+docObjects[1].GetSaveString(true));
				}
			}
		break;
		case "COMMAND02":		//전송데이터 수정
			if(checkInpuVals()){
				//'전문 정보를 수정하시겠습니까?'
				if(confirm(getLabel('FMS_COM_CFMMOD'))){
						frm1.f_cmd.value=COMMAND02;
						docObjects[0].DoAllSave("EDI_CSTM_0080GS.clt", FormQueryString(frm1)+'&'+docObjects[1].GetSaveString(true));
				}
			}
		break;
		case "COMMAND03":		//전송데이터 삭제
			//'전문 정보를 삭제하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
				frm1.f_cmd.value=COMMAND03;
				var rtnMsg=docObjects[0].DoAllSave("EDI_CSTM_0080GS.clt", FormQueryString(frm1));
				alert(rtnMsg);
			}
		break;
		case "COMMAND04":		//EDI 전문 전송
			//'AMS EDI 전문을 KTNET으로 전송하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMSEN'))){
				frm1.f_cmd.value=COMMAND04;
				docObjects[0].DoAllSave("EDI_CSTM_0080GS.clt", FormQueryString(frm1));
			}
		break;
		case "COMMAND05":		//전송자료 재생성
			//'기존 전문을 바탕으로 EDI 전문정보를 생성하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMCRE'))){
				frm1.f_cmd.value=COMMAND05;
				docObjects[0].DoAllSave("EDI_CSTM_0080GS.clt", FormQueryString(frm1));
			}
		break;
		case "COMMAND06":		//EDI전문 재전송
			//'AMS EDI 전문을 KTNET으로 재전송하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMSEN'))){
				frm1.f_cmd.value=COMMAND04;
				docObjects[0].DoAllSave("EDI_CSTM_0080GS.clt", FormQueryString(frm1));
			}
		break;
		case "RESET":		//초기화
			resetEdiValue();
			docObjects[1].RemoveAll();
			doWork('SEARCHLIST01');
		break;
		case "CALLCT":
			window.open('http://www.ctradeworld.com');
		break;
		case "EDIPOPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
        	callBackFunc = "EDIPOPLIST";
        	modal_center_open('./EDI_CSTM_0081.clt', "", 756,407,"yes");
		break;
		case "VSL_POP"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="1";
   			rtnary[1]="";
 	        callBackFunc = "VSL_POP";
 	        modal_center_open('./CMM_POP_0140.clt', rtnary, 656,480,"yes");
        break;
	}
}

function VSL_POP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_vsl_cd.value=rtnValAry[0];
		frm1.org_vsl_cd.value=rtnValAry[0];
		frm1.f_vsl_nm.value=rtnValAry[1];
	}
}

function EDIPOPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.disp_workday.value=rtnValAry[0]; 
		frm1.disp_vsl_nm.value=rtnValAry[1];
		frm1.disp_vsl_cd.value=rtnValAry[2];
		frm1.disp_flt_no.value=rtnValAry[3];
		frm1.disp_pol_nm.value=rtnValAry[4];
		frm1.disp_pol_cd.value=rtnValAry[5];
		frm1.disp_bl_seq.value=rtnValAry[6];
	}
}

/**
 * EDI 전송전문 내용보기
 */
function showEdiMsg(){
	var param='f_edi_cre_seq=';
	param+= frm1.f_edi_cre_seq.value;
	param+= '&f_edi_msg_no=';
	param+= frm1.sndKeyList.value;
	
	callBackFunc = "EDI_CSTM_0090";
	modal_center_open('./EDI_CSTM_0090.clt'+param, '', 756,460,"yes");
}
function EDI_CSTM_0090(rtnVal){
	
}
function checkInpuVals(){
	var isOk=true;
	if(checkSelectVal(frm1.disp_ams_msg_snd_tp.value, '전송유형')!='O'){
		isOk=false;
	}else if(checkInputVal(frm1.disp_trsp_co_scac.value, 4, 4, "T", '선사SCAC 코드')!='O'){
		frm1.disp_trsp_co_scac.focus();
		isOk=false;
	}else if(checkInputVal(frm1.disp_mrn.value, 3, 11, "T", 'MRN')!='O'){
		frm1.disp_mrn.focus();
		isOk=false;
	}else if(checkInputVal(frm1.disp_kcs_cd.value, 4, 4, "T", 'KCS코드')!='O'){
		frm1.disp_kcs_cd.focus();
		isOk=false;
	}else{
		var objLen=docObjects[1].rows;
		if(objLen<2){
			//alert('처리할 BL이 존재하지 않습니다!\r\nEDI전문을 생성할 수 없습니다!');
			alert(getLabel('FMS_COM_ALT010') + "\n\n: EDI_CSTM_0080.133");
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
	var ediObj2=getObj('ediView2');
	if(isView){
		ediObj.style.display='inline';	
		ediObj2.style.display='inline';	
	}else{
		ediObj.style.display='none';
		ediObj2.style.display='none';
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
	if(frm1.disp_vsl_cd.value!=''){
		//'전문 정보를 생성하시겠습니까?'
		if(confirm(getLabel('FMS_COM_CFMCRE'))){
			var paramVal='&disp_vsl_cd=';
			paramVal+= frm1.disp_vsl_cd.value;
			paramVal+= '&disp_workday=';
			paramVal+= frm1.disp_workday.value;
			paramVal+= '&disp_flt_no=';
			paramVal+= frm1.disp_flt_no.value;
			paramVal+= '&disp_pol_cd=';
			paramVal+= frm1.disp_pol_cd.value;
			paramVal+= '&disp_bl_seq=';
			paramVal+= frm1.disp_bl_seq.value;
			paramVal+= '&f_edi_msg_tp=ASO';
			ajaxSendPost(dispMblInfos, 'reqVal', '&goWhere=aj&bcKey=mkAmsSeaEdi'+paramVal, './GateServlet.gsl');
		}
	}else{
		//alert('[해운 AMS생성] 팝업을 호출하여 생성할 HBL을 선택하여 주십시오!');
		alert(getLabel('FMS_COM_ALT004') + "\n\n: EDI_CSTM_0080.133");
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
				frm1.disp_workday.value=cdVals[0];
				frm1.f_edi_cre_seq.value=cdVals[1];
				frm1.disp_cnt_cd.value=cdVals[2];
				frm1.disp_vsl_cmp_cd.value=cdVals[3];
				frm1.disp_edi_sts.value='미작성';
				frm1.cur_edi_sts.value='T';
				//작성 버튼 숨기기
				getObj('mblAdd').style.display='none';
				//좌측 목록을 조회함
				doWork('SEARCHLIST03');
				//HBL목록 재조회
				doWork('SEARCHLIST02');
				//dispEdiViewTb(false);
				getObj('btn1').style.display='block';
			}else{ 
				//alert('본 MBL은 이미 AMS전문으로 등록되어있습니다!');
				alert(getLabel('FMS_COM_ALT012') + "\n\n: EDI_CSTM_0080.133");
			}
		}else{
			//Error Errupt!	
			alert(getLabel('FMS_COM_ERR001') + "\n\n: EDI_CSTM_0080.236");		
		}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: EDI_CSTM_0080.240");
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
			alert(getLabel('FMS_COM_ERR001') + "\n\n: EDI_CSTM_0080.281");		
		}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message + "\n\n: EDI_CSTM_0080.285");
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
		      var headers = [ { Text:getLabel('EDI_CSTM_0080_HDR1'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
		             {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"workday" },
		             {Type:"Text",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"vsl_nm" },
		             {Type:"Text",     Hidden:0,  Width:50,   Align:"Left",    ColMerge:1,   SaveName:"flt_no" },
		             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"edi_sts" },
		             {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"smt_dt" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_cre_seq" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"edi_msg_seq" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"vsl_cd" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"cnt_cd" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"vsl_cmp_nm" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"mrn" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"pol_cd" },
		             {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"pol_nm" },
		             {Type:"Text",     Hidden:0,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"fwrd_scac_cd" },
		             {Type:"Text",     Hidden:0,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"trsp_co_scac_cd" },
		             {Type:"Text",     Hidden:0,  Width:0,    Align:"Left",    ColMerge:1,   SaveName:"ams_msg_snd_tp" } ];
	       
			      InitColumns(cols);
			      SetEditable(0);
			      SetColProperty(4, {ComboText:"미작성|작성|전송완료|재전송|재작성", ComboCode:"T|C|S|R|N"} );
			      SetSheetHeight(378);
			}
		break;
		case 2:      //House B/L Information
			with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('EDI_CSTM_0080_HDR2'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Left",    ColMerge:1,   SaveName:"ibflag" },
	               {Type:"Text",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"mbl_no" },
	               {Type:"Text",     Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"hbl_no" },
	               {Type:"Text",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"pod" },
	               {Type:"Text",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty" },
	               {Type:"Text",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"grs_wgt" },
	               {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"shp_co_nm" },
	               {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"cnee_co_nm" },
	               {Type:"Text",     Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"noti_co_nm" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"hbl_seq" } ];
	         
		        InitColumns(cols);
		        SetEditable(0);
		        SetSheetHeight(235);
			}
		break;
	}
}
function sheet1_OnSaveEnd(errObj){
	var curSts='';
	var selecRow=-1;
	for(var i=1; i <= docObjects[0].rows; i++){
		if(docObjects[0].GetCellValue(i, 'edi_cre_seq')==frm1.f_edi_cre_seq.value&&docObjects[0].GetCellValue(i, 'edi_msg_seq')==frm1.f_edi_msg_seq.value){
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
			sheet1_OnClick(docObjects[0], selecRow, 1);			
		}
	}
}
function sheet1_OnClick(sheetObj, row, col){
	//기존값 초기화
	resetEdiValue();
	//작성 버튼 숨기기
	getObj('mblAdd').style.display='none';
	//AMS추가
	//EDI처리내역 상세에 값을 Setting함
	frm1.disp_flt_no.value=sheetObj.GetCellValue(row, 'flt_no');
	frm1.disp_workday.value=sheetObj.GetCellValue(row, 'workday');
	frm1.disp_pol_nm.value=sheetObj.GetCellValue(row, 'pol_nm');
	frm1.disp_pol_cd.value=sheetObj.GetCellValue(row, 'pol_cd');
	frm1.disp_vsl_cmp_cd.value=sheetObj.GetCellValue(row, 'vsl_cmp_nm');
	frm1.disp_cnt_cd.value=sheetObj.GetCellValue(row, 'cnt_cd');
	frm1.disp_mrn.value=sheetObj.GetCellValue(row, 'mrn');
	//frm1.disp_trsp_co_scac.value = '';
	//frm1.disp_flt_cnt_cd.value = '';
	frm1.disp_vsl_nm.value=sheetObj.GetCellValue(row, 'vsl_nm');
	frm1.disp_vsl_cd.value=sheetObj.GetCellValue(row, 'vls_cd');
	frm1.disp_edi_sts.value=sheetObj.GetCellText(row, 'edi_sts');
	frm1.cur_edi_sts.value=sheetObj.GetCellValue(row, 'edi_sts');
	frm1.disp_smt_dt.value=sheetObj.GetCellValue(row, 'smt_dt');
	frm1.f_edi_sts.value=sheetObj.GetCellValue(row, 'edi_sts');
	frm1.f_edi_cre_seq.value=sheetObj.GetCellValue(row, 'edi_cre_seq');
	frm1.f_edi_msg_seq.value=sheetObj.GetCellValue(row, 'edi_msg_seq');
	frm1.disp_trsp_co_scac.value=sheetObj.GetCellValue(row, "trsp_co_scac_cd");
	frm1.disp_kcs_cd.value=sheetObj.GetCellValue(row, "fwrd_scac_cd");
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
	if(frm1.f_edi_sts.value=='T'){
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
	var callParam='?f_bl_seq='+sheetObj.GetCellValue(row, 'hbl_seq');
	callParam+= '&f_edi_cre_seq=';
	callParam+= frm1.f_edi_cre_seq.value;
	callParam+= '&f_edi_msg_seq=';
	callParam+= frm1.f_edi_msg_seq.value;
	popGET('EDI_CSTM_0082.clt'+callParam, '', 550, 410);
}
function resetEdiValue(){
	frm1.f_cmd.value='';
	getObj('btn1').style.display='none';
	getObj('btn2').style.display='none';
	getObj('btn3').style.display='none';
	getObj('ediView').style.display='none';
	getObj('ediView2').style.display='none';
//	ediView.style.display='none';
	getObj('mblAdd').style.display='block';
	//AMS추가
	frm1.disp_pol_nm.value='';
	frm1.disp_pol_cd.value='';
	frm1.disp_trsp_co_scac.value='';
	frm1.disp_vsl_nm.value='';
	frm1.disp_vsl_cd.value='';
	frm1.disp_kcs_cd.value='';
	frm1.disp_edi_sts.value='';
	frm1.cur_edi_sts.value='';
	frm1.disp_flt_no.value='';
	frm1.disp_workday.value='';
	frm1.disp_smt_dt.value='';
	frm1.f_edi_cre_seq.value='';
	frm1.f_edi_msg_no.value='';
	frm1.f_edi_msg_seq.value='';
	frm1.disp_vsl_cmp_cd.value='';
	frm1.disp_cnt_cd.value='';
	frm1.disp_mrn.value='';
	//frm1.disp_ams_msg_snd_tp.value = '';
}

function doEnter(){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		doWork("SEARCHLIST01");
	}
}

/**
 * Vessel Label초기화
 */
function clearOrgVsl(){
	if(frm1.f_vsl_cd.value!=frm1.org_vsl_cd.value){
		frm1.org_vsl_cd.value='';
		frm1.f_vsl_nm.value='';
	}
}