﻿﻿/**
===============================================================================
프로그램  명  : UI관련 공통 함수 정의 Script
프로그램개요  :
작   성   자  :
작   성   일  :
===============================================================================
수정자/수정일 : 2006년 11월 03일 ( 10월 19일 초기적용)
수정사유/내역 : IBSheet Object의 OnSearchEnd(), OnSaveEnd() 이벤트발생 시 showErrMessage() 처리 추가
===============================================================================
*/
//각 페이지의 Sheet 이벤트 처리 함수를 실행하는 전역 변수
/**
 * 스타일정의를 시스템별로 구분하기 위한 시스템코드 상수
 * 작성자 : 김성욱
 * 작성일 : 2006.06.16
 */
var SYSTEM_DEFAULT=0;  //기본 스타일을 위한 용도
var SYSTEM_GREEN=1;  //OPUS Forwarding
var SYSTEM_BLUE=2;  //OPUS Forwarding
var SYSTEM_YELLOW=3;  //OPUS Forwarding
var SYSTEM_ROW_HEIGHT = 21;	//Default Data Row Height (IBSheet 기본 설정값은 21픽셀이다)
var func;
/**
 * IBSheet 의 EditableColor, UnEditableColor 의 rgb색상값을 가지고 있는 변수
*/
var IBSheetEditColor ;
var IBSheetUnEditColor ;
/**
 * IBSheet 의 컬럼간의 HeaderColor 를 구별하기 위해 추가한 헤더 rgb색상값을 가지고 있는 변수
*/
var SubHeaderColor ;
// IBSheetInfo.js 에서 이동 //
/* IBSheet Action */
IBSEARCH=0;  // 조회
IBSEARCHAPPEND=1;  // 페이징 조회
IBSAVE=2;  // 저장
IBINSERT=3;  // 삽입
IBCLEAR=4;  // 초기화
IBDOWNEXCEL=5;  // 엑셀 다운로드
IBLOADEXCEL=6;  // 엑셀 업로드
IBCOPYROW=7;  // 행복사
IBDELETE=8;  // 삭제
RDPRINT=9;  // RD 연결
IBROWSEARCH=10; // Row 조회
IBCREATE=11; // Create
IBRESET=12; // Reset
IBBATCH=13; // Batch
	/* Async  IBSheet Action */
	IBSEARCH_ASYNC01=901;
	IBSEARCH_ASYNC02=902;
	IBSEARCH_ASYNC03=903;
	IBSEARCH_ASYNC04=904;
	IBSEARCH_ASYNC05=905;
	IBSEARCH_ASYNC06=906;
	IBSEARCH_ASYNC07=907;
	IBSEARCH_ASYNC08=908;
	IBSEARCH_ASYNC09=909;
	IBSEARCH_ASYNC10=910;
	IBSEARCH_ASYNC11=911;
	IBSEARCH_ASYNC12=912;
	IBSEARCH_ASYNC13=913;
	IBSEARCH_ASYNC14=914;
	IBSEARCH_ASYNC15=915;
	IBSEARCH_ASYNC16=916;
	IBSEARCH_ASYNC17=917;
	IBSEARCH_ASYNC18=918;
	IBSEARCH_ASYNC19=919;
	IBSEARCH_ASYNC20=920;
/**
 * Sheet의 기본 디자인을 설정한다. 이 함수는 반드시 Sheet 초기화 전에 호출한다.
 * param : sheet_obj IBSheet Object ID
 * return : 없음
 */
function comConfigSheet(sheet_obj, system_id){
	
	//sheet_obj.SetSelectionMode(1); //선택된 Cell 에서 마우스 드래그시  AS-IS 와 같이 Row 단위  Background CSS 적용 //[OJG 20141003] 
	
	/*
	switch(system_id){
    case SYSTEM_GREEN:
        with (sheet_obj)
        {
                      //SheetBackColor		  = "#F2F2F2";
            //지원안함[공통처리]HANJIN: SheetBackColor="#F3F2F8";
            SetHeaderBackColor("#C0EBA3");//해더행 배경색
            SetDataBackColor("#FFFFFF"
            SetDataAlternateBackColor("#FFFFFF"
            //지원안함[공통처리]HANJIN: SelectBackColor="#F9F9F9";  //선택행 배경색
            SetSubSumBackColor("#F7E7EC");//소계행 배경색
            SetCumulateBackColor("#E8FFC6");//누계행 배경색
            SetSumBackColor("#ECE7F7");//합계행 배경색
            SubHeaderColor="#AEEBB3";  //헤더컬럼 구분 배경색
            SetHeaderFontBold(1);//해더글자를 볼드사용여부
            SetSumFontBold(1);//합계행 볼드여부
            SetHeaderFontColor("#005374");//해더행 글자색
            // DataFontColor         = "#555555";     //데이터행 글자색
            // SumFontColor          = "#CD6464";  //합계행 글자색
            SetSheetFontName("Tahoma");//글자체, Default:굴림체 //*Airal
            SetHeaderRowHeight(20);//해더 행 높이, Default:26
            SetSheetFontSize(9);//글자크기, Default:9 //*8
            SetDataRowHeight(20);//데이터 행 높이, Default:20
//            InLineColor           = "#E0E0E0";  //안쪽선색
            //지원안함[공통처리]HANJIN: InLineColor="#ACC8BF";  //안쪽선색
            //지원안함[공통처리]HANJIN: OutLineColor="#5A8A9E";  //바깥쪽선색
            SetEditableColorDiff(1);//Default:false, Edit
            IBSheetEditColor="#FFFFFF";
            //IBSheetUnEditColor      = "#EFEBEF";
            IBSheetUnEditColor="#FFFFFF";
            GetEditableColor()=IBSheetEditColor  ;    "#FFFFFF";t:255,255,255, 흰색 Edit 가능 데이터 배경색
            //지원안함[확인요망]HANJIN: UnEditableColor=IBSheetUnEditColor ;   //Default:239,235,239, 회색 Edit 불가능 데이터 배경색
            //EditableColor         = "#FFFF00";    //Default:255,255,255, 흰색 Edit 가능 데이터 배경색
            //UnEditableColor       = "#C0C05C";   //Default:239,235,239, 회색 Edit 불가능 데이터 배경색
            //SelectHighLight       = false;                  //Default:true, 하일라이트 여부
            //지원안함[공통처리]HANJIN: SelectFontBold=true;                   //Default:false, 선택행 볼드여부
            //지원안함[확인요망]HANJIN: MultiSelection=true;                   //Default:false, 다중 선택 여부
            SetCountPosition(2);//건수위치,0:없음,1:좌상,2:우상,3:좌하,4:우하
            //FocusAfterProcess     = false;                  //Default:true, 조회후 포커스 뺏기여부
            //지원안함[공통처리]HANJIN: CountFontBold=false;                  //Default:true, 건수글자볼드여부
            //지원안함[공통처리]HANJIN: DateFormatChar="-";                    //Default:., 날짜구분자,(-/.)
            //지원안함[확인요망]HANJIN: ScrollTrack=true;                   //Default:false, 스크롤과 데이타 같이이동
            SetWaitTimeOut(3600);//Default:60초, 응답대기시간,초단위
            SetShowSortArrow(1);//Default:false, 소트 화살표 표시여부
            SetShowButtonImage(1);//Default:0(Focus 있을때 팝업 이미지 표시), 3(Edit 가능시 팝업/콤보이미지 표시), 데이터 타입이 dtPopup, dtPopupEdit, dtCombo, dtComboEdit 일때 이미지 표시종류
SetEditEnterBehavior("down"                  //Default:tab, 편집중 Enter행동자
            SetEnterBehavior("tab");//Default:Edit, Enter행동자
            //지원안함[공통처리]HANJIN: HeadFlat=true;                   //Default:3D 해더평면여부
            SetWaitImageVisible(1);//Default:true, 대기이미지 표시여부
            SetDataAutoTrim(0);//Default:true, 데이타 양쪽공백 트림여부
            //지원안함[확인요망]HANJIN: MultiLineText=true;                   //Default:true, Shift+Enter 또는 Ctrl+Enter 이용 다중라인 입력가능여부
            SetClipPasteMode(1);// 클립보드에 복사된 내용을 Sheet로 붙일 때 방식을 확인하거나 설정한다.
            SetCountFormat("[SELECTDATAROW / ROWCOUNT]");// 데이타 Count format [선택한포커스행/전체건수] 로 적용
            //FocusEditMode = 2;		// Edit 가능한 셀에 포커스가 들어갔을 때 Edit를 시작할지 여부를 확인하거나 설정한다.
        //지원안함[확인요망]HANJIN: 	KoreaLanguageUse=false ;
            //지원안함[확인요망]HANJIN: PopupImage=APP_PATH+"/web/img/ibsheet/btns_search.gif";     //팝업 버튼 이미지
            SetKeyFieldImage(APP_PATH+"/web/img/ibsheet/ess1.gif");//필수 입력 이미지
            SetSearchingImage(APP_PATH+"/web/img/ibsheet/processing.gif");
            SetSavingImage(APP_PATH+"/web/img/ibsheet/processing.gif");
            SetWaitImage(APP_PATH+"/web/img/ibsheet/processing.gif");
            //지원안함[확인요망]HANJIN: DownLoadImage=APP_PATH+"/web/img/ibsheet/processing.gif";
            SetUploadingImage(APP_PATH+"/web/img/ibsheet/processing.gif");
            //지원안함[공통처리]HANJIN: MessageText("ConfirmTitle")="Confirmation";
            //지원안함[공통처리]HANJIN: MessageText("WarningTitle")="Warning";
            //지원안함[공통처리]HANJIN: MessageText("NoData")="There is no data to search" ;
            //지원안함[공통처리]HANJIN: MessageText("Avg")="Average" ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg00")="It's not appropriate date format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg01")="It's not appropriate Year/Month format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg02")="It's not appropriate Month/Day format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg03")="It's not appropriate Number format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg04")="It's not appropriate [Hour:Minute:Second] format.";
            //지원안함[공통처리]HANJIN: MessageText("UserMsg05")="It's not appropriate [Hour:Minute] format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg23")="The pasted data is not appropriate format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg24")="It's not editable area." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg11")="As there is no result retrieved, it's impossible to download in the [EXCEL] format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg16")=" is mandatory item." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg29")="Do you want to save?";
            //지원안함[공통처리]HANJIN: MessageText("Sum")="TOTAL";
            //지원안함[공통처리]HANJIN: MessageText("RequestProcess")="Processing";
            // 2007.10.23 추가 (3.4.0.12버젼)
            //지원안함[확인요망]HANJIN: AllowTabKeyOnDropDownList=true;
            /*-------------------------------------------------------------------------------
            SetSavingImage("image/grid_save.gif");//저장중 대기 이미지
            SetSearchingImage("image/grid_search.gif");//조회중 대기 이미지
            //지원안함[확인요망]HANJIN: PopupImage="image/ic_popup.gif";     //팝업 버튼 이미지
            SetKeyFieldImage("image/ess2.gif");//필수 입력 이미지
            SetUploadingImage("image/upload.gif");//업로드 대기 이미지
            //지원안함[확인요망]HANJIN: DownLoadImage="image/download.gif";          //다운로드 대기 이미지
            //지원안함[공통처리]HANJIN: MessageText("ConfirmTitle")="IBSheet 확인";
            //지원안함[공통처리]HANJIN: MessageText("WarningTitle")="IBSheet 경고";
            //지원안함[공통처리]HANJIN: MessageText("WarningImage")="!";            //default:!, 경고이미지
            //지원안함[공통처리]HANJIN: MessageText("MessageShowLevel")="UEDX";     //default:UEDX, 메시지표시레벨(User,개발자,Down,Xml)
            //지원안함[공통처리]HANJIN: MessageText("UserMsg00")="날짜형식에 맞지 않습니다.";                             //DataFormat 이 dfDateYmd
            //지원안함[공통처리]HANJIN: MessageText("UserMsg01")="년월형식에 맞지 않습니다";                              //DataFormat 이 dfDateYm
            //지원안함[공통처리]HANJIN: MessageText("UserMsg02")="월일형식에 맞지 않습니다.";                             //DataFormat 이 dfDateMd
            //지원안함[공통처리]HANJIN: MessageText("UserMsg03")="숫자형식에 맞지 않습니다.";                             //DataType 이 dtInteger, dtFloat, dtNullInteger, dtNullFloat, dtNumber
            //지원안함[공통처리]HANJIN: MessageText("UserMsg04")="시분초형식에 맞지 않습니다.";                           //DataFormat 이 dfTimeHms
            //지원안함[공통처리]HANJIN: MessageText("UserMsg05")="시분형식에 맞지 않습니다.";                             //DataFormat 이 dfTimeHm
            //지원안함[공통처리]HANJIN: MessageText("UserMsg06")="부모 상태가 삭제이므로 자식레벨로 입력할 수 없습니다."; //트리형태에서 발생
            //지원안함[공통처리]HANJIN: MessageText("UserMsg07")="자식 레벨이 있는 경우 복사할 수 없습니다.";             //트리형태에서 발생
            //지원안함[공통처리]HANJIN: MessageText("UserMsg08")="부모 상태가 삭제이므로 자식레벨은 복사할 수 없습니다."; //트리형태에서 발생
            //지원안함[공통처리]HANJIN: MessageText("UserMsg09")="자식 레벨이 있는 경우 삭제할 수 없습니다.";             //트리형태에서 발생
            //지원안함[공통처리]HANJIN: MessageText("UserMsg10")="부모 레벨이 삭제 상태이면 삭제 취소할 수 없습니다.";    //트리형태에서 발생
    //지원안함[공통처리]HANJIN: MessageText("UserMsg11")="조회한 내역이 없어 엑셀로 내려 받을 내용이 없습니다.";  //Down2Excel함수 또는 Down2Excel함수 이용시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg12")="해당 엑셀파일에 읽어올 내용이 없습니다.";               //LoadExcel 함수 이용시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg13")="저장할 내역이 없습니다.";                               //DoSave함수 또는 DoAllSave함수 이용시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg14")="조회된 데이터가 없습니다.";                             //좌측에 타이틀이 있으면서 조회된 내역이 없는 경우
            //지원안함[공통처리]HANJIN: MessageText("UserMsg15")="번째 WorkSheet는 존재하지 않습니다.";                   //LoadExcel 함수를 이용시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg16")="는(은) 필수 입력 항목입니다.";                          //InitDataProperty 에서 KeyField=true 인 항목
            //지원안함[공통처리]HANJIN: MessageText("UserMsg17")="을(를)  모두 입력하십시오.";                            //InitDataProperty 에서 FullInput=true 인 항목
            //지원안함[공통처리]HANJIN: MessageText("UserMsg18")="정말로 삭제 하시겠습니까?";                             //DataType 이 dtDelCheckEx 인 항목의 CheckBox 선택시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg19")="정말로 전체 삭제 하시겠습니까?";                        //DataType 이 dtDelCheckEx 인 항목의 전체 CheckBox 선택시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg20")="다음 경로에 해당하는 파일이 존재하지 않습니다.";        //이미지나 Xml 이 존재하지 않을 때
//지원안함[공통처리]HANJIN: MessageText("UserMsg21")="네트웍이 불안정하여 서버와 연결 시간을 초과하였습니다.";//일정 시간 초과하여 GetWaitTimeOut()에 걸린경우
            -----------------------------------------------------------------------------------
        }
        break;
    case SYSTEM_BLUE :
        with (sheet_obj)
        {
        	XmlHttpVer=2;			//이미지 Over방지
            //SheetBackColor		  = "#F2F2F2";
            //지원안함[공통처리]HANJIN: SheetBackColor="#EEEFF1";
//            HeadBackColor         = "#E3E6F0";  //해더행 배경색
//            HeadBackColor         = "#D5DCE8"
SetHeaderBackColor("#CEE3E9"
SetDataBackColor("#FFFFFF"
//            DataAltanateBackColor = "#FFFFFF"
SetDataAlternateBackColor("#F8F8EB"
            //지원안함[공통처리]HANJIN: SelectBackColor="#F0FFFE";  //선택행 배경색
            SetSubSumBackColor("#F7E7EC");//소계행 배경색
            SetCumulateBackColor("#E8FFC6");//누계행 배경색
            SetSumBackColor("#ECE7F7");//합계행 배경색
            SetHeaderFontBold(1);//해더글자를 볼드사용여부
            SetSumFontBold(1);//합계행 볼드여부
//            HeadFontColor         = "#405121";     //해더행 글자색
            SetHeaderFontColor("#2D255D");//해더행 글자색
            SetDataFontColor("#2A3848");//데이터행 글자색
            // SumFontColor          = "#CD6464";  //합계행 글자색
            SetSheetFontName("Arial");//글자체, Default:굴림체 //*Arial
            SetHeaderRowHeight(20);//해더 행 높이, Default:26
            SetSheetFontSize(8);//글자크기, Default:9
            SetDataRowHeight(20);//데이터 행 높이, Default:20
            //지원안함[공통처리]HANJIN: InLineColor="#BCC4CE";  //안쪽선색
            //지원안함[공통처리]HANJIN: OutLineColor="#677A90";  //바깥쪽선색
            //홀수, 짝수  배경색 지정된 색으로 보이도록 설정 변경 2012.11.09 LHK 변경
            //            EditableColorDiff     = true;                   //Default:false, Edit
            SetEditableColorDiff(0);
            IBSheetEditColor="#FFFFFF";
            //IBSheetUnEditColor      = "#EFEBEF";
            IBSheetUnEditColor="#FFFFFF";
            GetEditableColor()=IBSheetEditColor  ;    //Default:255,255,255, 흰색 Edit 가능 데이터 배경색
            //지원안함[확인요망]HANJIN: UnEditableColor=IBSheetUnEditColor ;   //Default:239,235,239, 회색 Edit 불가능 데이터 배경색
            //EditableColor         = "#FFFF00";    //Default:255,255,255, 흰색 Edit 가능 데이터 배경색
            //UnEditableColor       = "#C0C05C";   //Default:239,235,239, 회색 Edit 불가능 데이터 배경색
            //SelectHighLight       = false;                  //Default:true, 하일라이트 여부
            //지원안함[공통처리]HANJIN: SelectFontBold=true;                   //Default:false, 선택행 볼드여부
            //지원안함[확인요망]HANJIN: MultiSelection=true;                   //Default:false, 다중 선택 여부
            SetCountPosition(3);//건수위치,0:없음,1:좌상,2:우상,3:좌하,4:우하
            //조회후 클릭시점 포커스 유지하도록 설정 변경 2012.11.09 LHK 변경
            SetFocusAfterProcess(0);//Default:true, 조회후 포커스 뺏기여부
            //지원안함[공통처리]HANJIN: CountFontBold=false;                  //Default:true, 건수글자볼드여부
            //지원안함[공통처리]HANJIN: DateFormatChar="-";                    //Default:., 날짜구분자,(-/.)
            //지원안함[확인요망]HANJIN: ScrollTrack=true;                   //Default:false, 스크롤과 데이타 같이이동
            SetWaitTimeOut(60);//Default:60초, 응답대기시간,초단위
            SetShowSortArrow(1);//Default:false, 소트 화살표 표시여부
            SetShowButtonImage(1);//Default:0(Focus 있을때 팝업 이미지 표시), 3(Edit 가능시 팝업/콤보이미지 표시), 데이터 타입이 dtPopup, dtPopupEdit, dtCombo, dtComboEdit 일때 이미지 표시종류
SetEditEnterBehavior("down"                  //Default:tab, 편집중 Enter행동자
            SetEnterBehavior("tab");//Default:Edit, Enter행동자
            //지원안함[공통처리]HANJIN: HeadFlat=true;                   //Default:3D 해더평면여부
            SetWaitImageVisible(1);//Default:true, 대기이미지 표시여부
            SetDataAutoTrim(0);//Default:true, 데이타 양쪽공백 트림여부
            //지원안함[확인요망]HANJIN: MultiLineText=true;                   //Default:true, Shift+Enter 또는 Ctrl+Enter 이용 다중라인 입력가능여부
            //FocusEditMode = 2;		// Edit 가능한 셀에 포커스가 들어갔을 때 Edit를 시작할지 여부를 확인하거나 설정한다.
        //지원안함[확인요망]HANJIN: 	KoreaLanguageUse=false ;
            SetClipPasteMode(1);// 클립보드에 복사된 내용을 Sheet로 붙일 때 방식을 확인하거나 설정한다.
            //전체셀 선택 모드로 변경 2012.11.09 LHK 추가
            SetSelectionMode(smSelectionRow);
            //지원안함[확인요망]HANJIN: PopupImage=APP_PATH+"/web/img/ibsheet/btns_search.gif";     //팝업 버튼 이미지
            SetKeyFieldImage(APP_PATH+"/web/img/ibsheet/ess1.gif");//필수 입력 이미지
            SetSearchingImage(APP_PATH+"/web/img/ibsheet/processing.gif");
            SetSavingImage(APP_PATH+"/web/img/ibsheet/processing.gif");
            SetWaitImage(APP_PATH+"/web/img/ibsheet/processing.gif");
            //지원안함[확인요망]HANJIN: DownLoadImage=APP_PATH+"/web/img/ibsheet/processing.gif";
            SetUploadingImage(APP_PATH+"/web/img/ibsheet/processing.gif");
            //지원안함[공통처리]HANJIN: MessageText("ConfirmTitle")="Confirmation";
            //지원안함[공통처리]HANJIN: MessageText("WarningTitle")="Warning";
            //지원안함[공통처리]HANJIN: MessageText("NoData")="There is no data to search" ;
            //지원안함[공통처리]HANJIN: MessageText("Avg")="Average" ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg00")="It's not appropriate date format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg01")="It's not appropriate Year/Month format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg02")="It's not appropriate Month/Day format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg03")="It's not appropriate Number format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg04")="It's not appropriate [Hour:Minute:Second] format.";
            //지원안함[공통처리]HANJIN: MessageText("UserMsg05")="It's not appropriate [Hour:Minute] format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg23")="The pasted data is not appropriate format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg24")="It's not editable area." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg11")="As there is no result retrieved, it's impossible to download in the [EXCEL] format."  ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg16")=" is mandatory item." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg29")="Do you want to save?";
            //지원안함[공통처리]HANJIN: MessageText("Sum")="TOTAL";
            //지원안함[공통처리]HANJIN: MessageText("RequestProcess")="Processing";
            // 2007.10.23 추가 (3.4.0.12버젼)
            //지원안함[확인요망]HANJIN: AllowTabKeyOnDropDownList=true;
            /*-------------------------------------------------------------------------------
            SetSavingImage("image/grid_save.gif");//저장중 대기 이미지
            SetSearchingImage("image/grid_search.gif");//조회중 대기 이미지
            //지원안함[확인요망]HANJIN: PopupImage="image/ic_popup.gif";     //팝업 버튼 이미지
            SetKeyFieldImage("image/ess2.gif");//필수 입력 이미지
            SetUploadingImage("image/upload.gif");//업로드 대기 이미지
            //지원안함[확인요망]HANJIN: DownLoadImage="image/download.gif";          //다운로드 대기 이미지
            //지원안함[공통처리]HANJIN: MessageText("ConfirmTitle")="IBSheet 확인";
            //지원안함[공통처리]HANJIN: MessageText("WarningTitle")="IBSheet 경고";
            //지원안함[공통처리]HANJIN: MessageText("WarningImage")="!";            //default:!, 경고이미지
            //지원안함[공통처리]HANJIN: MessageText("MessageShowLevel")="UEDX";     //default:UEDX, 메시지표시레벨(User,개발자,Down,Xml)
            //지원안함[공통처리]HANJIN: MessageText("UserMsg00")="날짜형식에 맞지 않습니다.";                             //DataFormat 이 dfDateYmd
            //지원안함[공통처리]HANJIN: MessageText("UserMsg01")="년월형식에 맞지 않습니다";                              //DataFormat 이 dfDateYm
            //지원안함[공통처리]HANJIN: MessageText("UserMsg02")="월일형식에 맞지 않습니다.";                             //DataFormat 이 dfDateMd
            //지원안함[공통처리]HANJIN: MessageText("UserMsg03")="숫자형식에 맞지 않습니다.";                             //DataType 이 dtInteger, dtFloat, dtNullInteger, dtNullFloat, dtNumber
            //지원안함[공통처리]HANJIN: MessageText("UserMsg04")="시분초형식에 맞지 않습니다.";                           //DataFormat 이 dfTimeHms
            //지원안함[공통처리]HANJIN: MessageText("UserMsg05")="시분형식에 맞지 않습니다.";                             //DataFormat 이 dfTimeHm
            //지원안함[공통처리]HANJIN: MessageText("UserMsg06")="부모 상태가 삭제이므로 자식레벨로 입력할 수 없습니다."; //트리형태에서 발생
            //지원안함[공통처리]HANJIN: MessageText("UserMsg07")="자식 레벨이 있는 경우 복사할 수 없습니다.";             //트리형태에서 발생
            //지원안함[공통처리]HANJIN: MessageText("UserMsg08")="부모 상태가 삭제이므로 자식레벨은 복사할 수 없습니다."; //트리형태에서 발생
            //지원안함[공통처리]HANJIN: MessageText("UserMsg09")="자식 레벨이 있는 경우 삭제할 수 없습니다.";             //트리형태에서 발생
            //지원안함[공통처리]HANJIN: MessageText("UserMsg10")="부모 레벨이 삭제 상태이면 삭제 취소할 수 없습니다.";    //트리형태에서 발생
    //지원안함[공통처리]HANJIN: MessageText("UserMsg11")="조회한 내역이 없어 엑셀로 내려 받을 내용이 없습니다.";  //Down2Excel함수 또는 Down2Excel함수 이용시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg12")="해당 엑셀파일에 읽어올 내용이 없습니다.";               //LoadExcel 함수 이용시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg13")="저장할 내역이 없습니다.";                               //DoSave함수 또는 DoAllSave함수 이용시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg14")="조회된 데이터가 없습니다.";                             //좌측에 타이틀이 있으면서 조회된 내역이 없는 경우
            //지원안함[공통처리]HANJIN: MessageText("UserMsg15")="번째 WorkSheet는 존재하지 않습니다.";                   //LoadExcel 함수를 이용시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg16")="는(은) 필수 입력 항목입니다.";                          //InitDataProperty 에서 KeyField=true 인 항목
            //지원안함[공통처리]HANJIN: MessageText("UserMsg17")="을(를)  모두 입력하십시오.";                            //InitDataProperty 에서 FullInput=true 인 항목
            //지원안함[공통처리]HANJIN: MessageText("UserMsg18")="정말로 삭제 하시겠습니까?";                             //DataType 이 dtDelCheckEx 인 항목의 CheckBox 선택시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg19")="정말로 전체 삭제 하시겠습니까?";                        //DataType 이 dtDelCheckEx 인 항목의 전체 CheckBox 선택시
            //지원안함[공통처리]HANJIN: MessageText("UserMsg20")="다음 경로에 해당하는 파일이 존재하지 않습니다.";        //이미지나 Xml 이 존재하지 않을 때
//지원안함[공통처리]HANJIN: MessageText("UserMsg21")="네트웍이 불안정하여 서버와 연결 시간을 초과하였습니다.";//일정 시간 초과하여 GetWaitTimeOut()에 걸린경우
            -----------------------------------------------------------------------------------
        }
   break;
    case SYSTEM_YELLOW :
        with (sheet_obj)
        {
                      //SheetBackColor		  = "#F2F2F2";
           //지원안함[공통처리]HANJIN: SheetBackColor="#F8F6F3";
            SetHeaderBackColor("#EDDDC6");//해더행 배경색
SetDataBackColor("#FFFFFF"
SetDataAlternateBackColor("#F0F0F0"
            //지원안함[공통처리]HANJIN: SelectBackColor="#FCFFE9";  //선택행 배경색
            SetSubSumBackColor("#F7E7EC");//소계행 배경색
            SetCumulateBackColor("#E8FFC6");//누계행 배경색
            SetSumBackColor("#ECE7F7");//합계행 배경색
            SetHeaderFontBold(1);//해더글자를 볼드사용여부
            SetSumFontBold(1);//합계행 볼드여부
            SetHeaderFontColor("#592E00");//해더행 글자색
            // DataFontColor         = "#555555";     //데이터행 글자색
            // SumFontColor          = "#CD6464";  //합계행 글자색
            SetSheetFontName("Arial");//글자체, Default:굴림체 //*Arial, Arial Unicode MS
            SetHeaderRowHeight(20);//해더 행 높이, Default:26
            SetSheetFontSize(8);//글자크기, Default:9
            SetDataRowHeight(20);//데이터 행 높이, Default:20
            //지원안함[공통처리]HANJIN: InLineColor="#D4CEC1";  //안쪽선색
            //지원안함[공통처리]HANJIN: OutLineColor="#81684F";  //바깥쪽선색
            SetEditableColorDiff(1);//Default:false, Edit
            IBSheetEditColor="#FFFFFF";
            //IBSheetUnEditColor      = "#EFEBEF";
            IBSheetUnEditColor="#FFFFFF";
            GetEditableColor()=IBSheetEditColor  ;    //Default:255,255,255, 흰색 Edit 가능 데이터 배경색
            //지원안함[확인요망]HANJIN: UnEditableColor=IBSheetUnEditColor ;   //Default:239,235,239, 회색 Edit 불가능 데이터 배경색
            //EditableColor         = "#FFFF00";    //Default:255,255,255, 흰색 Edit 가능 데이터 배경색
            //UnEditableColor       = "#C0C05C";   //Default:239,235,239, 회색 Edit 불가능 데이터 배경색
            //SelectHighLight       = false;                  //Default:true, 하일라이트 여부
            //지원안함[공통처리]HANJIN: SelectFontBold=true;                   //Default:false, 선택행 볼드여부
            //지원안함[확인요망]HANJIN: MultiSelection=true;                   //Default:false, 다중 선택 여부
            SetCountPosition(2);//건수위치,0:없음,1:좌상,2:우상,3:좌하,4:우하
            //FocusAfterProcess     = false;                  //Default:true, 조회후 포커스 뺏기여부
            //지원안함[공통처리]HANJIN: CountFontBold=false;                  //Default:true, 건수글자볼드여부
            //지원안함[공통처리]HANJIN: DateFormatChar="-";                    //Default:., 날짜구분자,(-/.)
            //지원안함[확인요망]HANJIN: ScrollTrack=true;                   //Default:false, 스크롤과 데이타 같이이동
            SetWaitTimeOut(60);//Default:60초, 응답대기시간,초단위
            SetShowSortArrow(1);//Default:false, 소트 화살표 표시여부
            SetShowButtonImage(1);//Default:0(Focus 있을때 팝업 이미지 표시), 3(Edit 가능시 팝업/콤보이미지 표시), 데이터 타입이 dtPopup, dtPopupEdit, dtCombo, dtComboEdit 일때 이미지 표시종류
SetEditEnterBehavior("down"                  //Default:tab, 편집중 Enter행동자
            SetEnterBehavior("tab");//Default:Edit, Enter행동자
            //지원안함[공통처리]HANJIN: HeadFlat=true;                   //Default:3D 해더평면여부
            SetWaitImageVisible(1);//Default:true, 대기이미지 표시여부
            SetDataAutoTrim(0);//Default:true, 데이타 양쪽공백 트림여부
            //지원안함[확인요망]HANJIN: MultiLineText=true;                   //Default:true, Shift+Enter 또는 Ctrl+Enter 이용 다중라인 입력가능여부
            //FocusEditMode = 2;		// Edit 가능한 셀에 포커스가 들어갔을 때 Edit를 시작할지 여부를 확인하거나 설정한다.
        //지원안함[확인요망]HANJIN: 	KoreaLanguageUse=false ;
            //지원안함[확인요망]HANJIN: PopupImage=APP_PATH+"/web/img/ibsheet/btns_search.gif";     //팝업 버튼 이미지
            SetKeyFieldImage(APP_PATH+"/web/img/ibsheet/ess1.gif");//필수 입력 이미지
            SetClipPasteMode(1);// 클립보드에 복사된 내용을 Sheet로 붙일 때 방식을 확인하거나 설정한다.
            //지원안함[공통처리]HANJIN: MessageText("ConfirmTitle")="Confirmation";
            //지원안함[공통처리]HANJIN: MessageText("WarningTitle")="Warning";
            //지원안함[공통처리]HANJIN: MessageText("NoData")="There is no data to search" ;
            //지원안함[공통처리]HANJIN: MessageText("Avg")="Average" ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg00")="It's not appropriate date format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg01")="It's not appropriate Year/Month format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg02")="It's not appropriate Month/Day format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg03")="It's not appropriate Number format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg04")="It's not appropriate [Hour:Minute:Second] format.";
            //지원안함[공통처리]HANJIN: MessageText("UserMsg05")="It's not appropriate [Hour:Minute] format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg23")="The pasted data is not appropriate format." ;
            //지원안함[공통처리]HANJIN: MessageText("UserMsg24")="It's not editable area.";
            //지원안함[공통처리]HANJIN: MessageText("UserMsg11")="As there is no result retrieved, it's impossible to download in the [EXCEL] format.";
            //지원안함[공통처리]HANJIN: MessageText("UserMsg16")=" is mandatory item.";
            //지원안함[공통처리]HANJIN: MessageText("UserMsg29")="Do you want to save?";
            //지원안함[공통처리]HANJIN: MessageText("Sum")="TOTAL";
            //지원안함[공통처리]HANJIN: MessageText("RequestProcess")="Processing";
            // 2007.10.23 추가 (3.4.0.12버젼)
            //지원안함[확인요망]HANJIN: AllowTabKeyOnDropDownList=true;
        }
        break;
    }*/
}
/**
 * Sheet의 기본 디자인을 마무리한다. 이 함수는 반드시 Sheet 초기화 후에 호출한다.
 * param : sheet_obj IBSheet Object ID
 * return : 없음
 */
function comEndConfigSheet (sheet_obj)
{
    sheet_obj.SetExtendLastCol(1);
    sheet_obj.SetShowButtonImage(0);
    sheet_obj.SetDown2ExcelConfig({CheckBoxOnValue:"Y", CheckBoxOffValue:"N" });
    
    if (parent.boldYn == "Y"){
    	for (var col = 0; col <= sheet_obj.LastCol(); col++) {
    		sheet_obj.SetColFontBold(col, 1);
    	}
    }
    
    //sheet_obj.SetVisible(1);
}
/**
 * Sheet개체를 생성한다.
 * param : id - Sheet의 ID를 문자열로 설정한다.
 * return : 없음
 * example : <script language="javascript">comSheetObject('sheet1');</script>
 */
function comSheetObject(id,tabindex){
	try {

		// mig-IBSheet7부터는 obj_이벤트함수() 방식으로 처리되므로 아래 코드는 필요하지 않음
		// var sEventTag = ComGetSheetEventTag(sheetid);
		// document.write(sEventTag);

		var sTag = ComGetSheetObjectTag(id);
		document.write(sTag);

		////////////////////////////////////////////////////////////////
		/* GetCellValue 를 AS-IS 와 같이 Return 값 String 처리 시작 */
	    var sheetObj = eval(id);
	    // GetCellValue 원형 함수를 다른 속성에 저장
	    sheetObj._dummyGetCellValue = sheetObj.GetCellValue;
	      
	    // GetCellValue 함수 재정의 : 원형 함수의 리턴값을 문자열로 변환하여 리턴 처리
	    sheetObj.GetCellValue = function(a, b) {
	        return this._dummyGetCellValue(a, b) + "";
	    }
	    /* GetCellValue 를 AS-IS 와 같이 Return 값 String 처리 끝 */
	     
	    ///////////////////////////////////////////////////////////////
	    // SetCellValue 함수 재정의 : Float, NullFloat 형태의 Data Type 에 대해 PointCount 에 따라 반올림 처리  (AcitveX 버전 과 같이 동작하도록 수정)   
	    sheetObj._dummySetCellValue = sheetObj.SetCellValue;  
	    sheetObj.SetCellValue = function(a, b, c, d) { //c : value
	    	var type = sheetObj.GetCellProperty(a,b, "Type");
	    	var pointCount = sheetObj.GetCellProperty(a,b, "PointCount");
	    	 
	    	if((type == "Float" || type == "NullFloat") 
	    			&& (c != "" && (c+"").indexOf(".") != -1)
	    			/*&& ((c+"").length >= 18)*/ ){		//Float Type 데이터 중 소수점 이하 이며, 소수점을 포함한 데이터가 18자리(Overflow 발생)인 데이터만 처리  114.05000000000001  , 114.07499999999999
	    			var arrFloatStringValue = (c + "").split(".");
	    			var pointLeftValue = arrFloatStringValue[0];
	    			var pointRightValue = arrFloatStringValue[1];
	    			
	    			if(pointRightValue.length > pointCount){		//Sheet에 정의된 PointCount 를 넘는 경우 반올림 처리
	    				var temp =Math.round( c*Math.pow(10, pointCount+5))/Math.pow(10, pointCount+5);
	    				c = Math.round( temp*Math.pow(10, pointCount))/Math.pow(10, pointCount);
	    			}
	    			
	    	}
	        return this._dummySetCellValue(a, b, c, d);
	    }
	    //////////////////////////////////////////////////////////////////
	     
	    // DoSearch 재정의 - Sort된 정보를 삭제하기 위하여 
	    sheetObj._dummyDoSearch = sheetObj.DoSearch;  
	    sheetObj.DoSearch = function(a, b) { //a : Target b : formObj	
	    	this.RemoveAll();
	        return this._dummyDoSearch(a, b);
	    }
	    
		// mig-저장XML과 에러XML일때 IBSheet7에 맞는 구조로 바꾸기 위한 처리
		_addOnLoadEvent(OnLoadData, id);

		// setSheetObject 함수는 각 업무페이지 js 파일에 정의되어 있음
		if (ComFuncCheck("setDocumentObject"))
			setDocumentObject(eval(id));
	} catch (err) {
		ComFuncErrMsg(err.message);
	}
}
/**
 * 이벤트적용없는 Sheet개체를 생성한다. 2007.01.11 추가
 * param : id - Sheet의 ID를 문자열로 설정한다.
 * return : sTag - HTML태그
 * example : <script language="javascript">SheetObjectTag('sheet1');</script>
 */
function SheetObjectTag(id) {
	var sTag = ComGetSheetObjectTag(id);
	document.write(sTag);
}
/**
 * 이벤트적용없는 Sheet개체를 생성후 필요시 추가로 이벤트만 별도 생성한다. 2013.04.12 추가
 * param : id - Sheet의 ID를 문자열로 설정한다.
 * return : sEventTag - HTML태그
 * example : <script language="javascript">SheetEventTag('sheet1');</script>
 */
function SheetEventTag(id) {
	try {


		// mig-저장XML과 에러XML일때 IBSheet7에 맞는 구조로 바꾸기 위한 처리
		_addOnLoadEvent(OnLoadData, id);

		// setSheetObject 함수는 각 업무페이지 js 파일에 정의되어 있음
		if (ComFuncCheck("setSheetObject"))
			setSheetObject(eval(id));
	} catch (err) {
		ComFuncErrMsg(err.message);
	}
}
/**
 * Tab개체를 생성한다.
 * param : id      - Tab의 ID를 문자열로 설정한다.
 * param : system_id - Tab의 색상을 시스템별루 관리한다.
 * param : sBaseColor - Tab의 Base 색상을 설정한다 . 미설정시 흰색으로 한다.
 * param : iWidth  - Tab의 넓이를 설정한다. 미설정시 "100%"를 기본으로 한다.
 * param : iHeight - Tab의 높이를 설정한다. 미설정시  25픽셀을 기본으로 한다.
  * return : 없음
 * example :
 *      <script language="javascript">comTabObject('tab1');</script>
 *      <script language="javascript">comTabObject('tab1', 200, 30);</script>
 */
function comTabObject(id, system_id , sBaseColor, iWidth, iHeight)
{
  var sTag="";
  var sEventTag="";
  if (iWidth == null) iWidth="100%";
  if (iHeight == null) iHeight="25";
  if (sBaseColor == null) sBaseColor="white";
    switch(system_id){
    case SYSTEM_FIS:
                sTag += '<OBJECT ID="'+id+'" width="'+ iWidth +'" height="'+ iHeight +'" \n';
        sTag += '        CLASSID="CLSID:B4019746-931F-4116-912C-8A11406BDE80" \n';
        sTag += '        CODEBASE="'+APP_PATH+'/web/sheet/IBTab.CAB#version=1,1,4,11"> \n';
        sTag += '    <PARAM name="TabMouseOverEffect" value="false"> \n' ;
        sTag += '    <PARAM name="BackColor" value="206,220,246"> \n' ;
        sTag += '    <PARAM name="BaseColor" value="'+sBaseColor+'">  \n' ;
        //지원안함[공통처리]HANJIN: sTag += '    <PARAM name="SelectBackColor" value="131,133,217"> \n' ;
        sTag += '    <PARAM name="FontColor" value="54,55,114"> \n' ;
        sTag += '    <PARAM name="SelectFontColor" value="54,55,114"> \n' ;
        sTag += '</OBJECT> \n';
        document.write(sTag);
        setTabObject(eval("document.all."+id));
        sEventTag += '<script language="javascript" for="'+id+'" event="OnBlur()">if (funccheck(id+"_OnBlur")==false) return; func(this);</script>';
        sEventTag += '<script language="javascript" for="'+id+'" event="OnChange(tabindex)">if (funccheck(id+"_OnChange")==false) return;  this.focus(); func(this,tabindex);</script>';
        sEventTag += '<script language="javascript" for="'+id+'" event="OnClear()">if (funccheck(id+"_OnClear")==false) return; func(this);</script>';
        sEventTag += '<script language="javascript" for="'+id+'" event="OnClick(tabindex)">if (funccheck(id+"_OnClick")==false) return; func(this,tabindex);</script>';
        sEventTag += '<script language="javascript" for="'+id+'" event="OnFocus()">if (funccheck(id+"_OnFocus")==false) return; func(this);</script>';
        sEventTag += '<script language="javascript" for="'+id+'" event="OnKeyDown(keycode,shift)">if (funccheck(id+"_OnKeyDown")==false) return; func(this,keycode,shift);</script>';
        //지원안함[확인요망]HANJIN: sEventTag += '<script language="javascript" for="'+id+'" event="OnLoadFinish()">if (funccheck(id+"_OnLoadFinish")==false) return; func(this);</script>';
        document.write(sEventTag);
    break;
    }
}
/**
 * Combo개체를 생성한다.
 * param : id        - Combo의 ID를 문자열로 설정한다.
 * param : iWidth    - Combo의 넓이를 설정한다. 미설정시 150 픽셀을 기본으로 한다.
 * param : bRequired - Combo가 필수 입력항목(Not Null)인 경우 true로 설정한다.
 * param : sCaption  - bRequired인자가 true인 경우 제목을 문자열로 설정한다.
 * return : 없음
 * example :
 *     <script language="javascript">comComboObject('mcbo1', colcnt ,100);</script>
 *     <script language="javascript">comComboObject('mcbo1', colcnt , 150, true, '직급');</script>
 */
function comComboObject(comboid, iColCnt, iWidth, iStyle)
{
	try {
		var div_str = "";

		if (iWidth == undefined || iWidth == null)
			iWidth = "150";
		if (iColCnt == undefined || iColCnt == null || iColCnt < 1)
			iColCnt = 1;
		
		height = "100%";
		createIBMultiCombo(comboid, iWidth + "px", "100%", iColCnt);

	} catch (err) {
		ComFuncErrMsg(err.message);
	}
}
/**
 * Chart개체를 생성한다.
 * param : id        - Chart의 ID를 문자열로 설정한다.
 * return : 없음
 * example :
 *     <script language="javascript">comChartObject('chart1',355);</script>
 */
function comChartObject(id, iWidth , iHeight )
{
  var sTag="";
  var sEventTag="";
  if (iWidth == null) iWidth="755";
  if (iHeight == null) iHeight="355";
  sTag += '<object classid="clsid:5220cb21-c88d-11cf-b347-00aa00a28331">  \n';
  sTag += ' <param name="LPKPath" value="/TMS/sheet/ibchart.lpk"> \n';
  sTag += ' </object> \n';
  sTag += ' <object id="'+id+'" width='+ iWidth +'" height="'+ iHeight +'" classid="clsid:9cd77d36-9a9f-4cf8-86c5-18ae5b8ca118" codebase="/TMS/sheet/ibchart.cab#version=1,0,0,24">  \n';
  sTag += '</OBJECT> \n';
  document.write(sTag);
  setChartObject(eval("document.all."+id));
  sEventTag += '<script language="javascript" for="'+id+'" event="Click()">if (funccheck(id+"_Click")==false) return; func(this);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="DblClick()">if (funccheck(id+"_DblClick")==false) return; func(this);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="DoneFetchXml()">if (funccheck(id+"_DoneFetchXml")==false) return; func(this);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="FailFetchXml()">if (funccheck(id+"_FailFetchXml")==false) return; func(this);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="KeyDown(keycode,shitf)">if (funccheck(id+"_KeyDown")==false) return; func(this,keycode,shitf);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="KeyUp(keycode,shitf)">if (funccheck(id+"_KeyUp")==false) return; func(this,keycode,shitf);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="KeyPress(keyascii)">if (funccheck(id+"_KeyPress")==false) return; func(this,keyascii);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="MouseDown(button, shift, x, y)">if (funccheck(id+"_MouseDown")==false) return; func(this,button, shift, x, y);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="MouseUp(button, shift, x, y)">if (funccheck(id+"_MouseUp")==false) return; func(this,button, shift, x, y);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="MouseMove(button, shift, x, y)">if (funccheck(id+"_MouseMove")==false) return; func(this,button, shift, x, y);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="PointClick(chartid, seriesindex, pointindex)">if (funccheck(id+"_PointClick")==false) return; func(this,chartid, seriesindex, pointindex);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="PointDblClick(chartid, seriesindex, pointindex)">if (funccheck(id+"_PointDblClick")==false) return; func(this,chartid, seriesindex, pointindex);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="Repaint(hdc, left, top, width, height)">if (funccheck(id+"_Repaint")==false) return; func(this,hdc, left, top, width, height);</script>';
  sEventTag += '<script language="javascript" for="'+id+'" event="Resize(height, width)">if (funccheck(id+"_Resize")==false) return; func(this ,height, width);</script>';
  document.write(sEventTag);
}
/**
 * 폼 개체 안에 컨트롤의 필수 입력 여부를 확인한다.
 * param : frm - 폼 오브젝트 이름
 * return : boolean, 필수입력 항목에 값이 없는 경우 false 리턴, 모두 입력된 경우 true 리턴
 * example : if(!comCheckRequiredField(document.frmMaster)) return;
 *         : <input type="text" name="bmk_cd" required caption="비목코드">
 */
//var Msg_Required = "은(는) 필수입력사항 입니다.";
var Msg_Required=" is mandatory item." ;
function comCheckRequiredField(frm) {
    var elems=frm.elements;
    var l=elems.length;
    for(var i=0; i < l; i++) {
        var elem=elems[i];
        if(elem.getAttribute("required") != null && !elem.getAttribute("disabled")) {
        	  //클래스 아이디로 제품을 구분함-아래는 HTMl제품
        	  if(elem.classid==undefined){
                switch(elem.type) {
                    case "text":
                    case "password":
                    case "textarea":
                    case "file":
                        if(_Trim(elem.value) == "") {
                            alert("'" + elem.getAttribute("caption") + "' " + Msg_Required);
                            elem.focus();
                            return false;
                        }
                        break;
                    case "radio":
                        var check=false;
                        var eRadio=document.all[elem.name];
                        var rdo=null;
                        if(eRadio.length > 1) {
                            for(var j=0; j < eRadio.length; j++) {
                                check=check || eRadio[j].checked;
                            }
                            rdo=eRadio[0];
                        } else {
                            check=eRadio.checked;
                            rdo=eRadio;
                        }
                        if(!check) {
                            alert("'" + elem.getAttribute("caption") + "' " + Msg_Required);
                            rdo.focus();
                            return false;
                        }
                        break;
                    case "select-one":
                    case "select-multiple":
                        if(elem.options != null && elem.options.length > 0) {
                            var v=elem.options[elem.selectedIndex].value;
                            if(v == null || _Trim(v) == "") {
                                alert("'" + elem.getAttribute("caption") + "' " + Msg_Required);
                                elem.focus();
                                return false;
                            }
                        }
                        break;
                } //end of switch
            //IB에서 제공하는 컨트롤의 값을 조합한다.
            } 
        } // end of if(required)
    } // end of for(i)
    return true;
}
/**
 * 앞뒤 공백을 제거한다.
 * param : sVal
 * return : String
 */
function _Trim(sVal)
{
  return(_LTrim(_RTrim(sVal)));
}
/**
 * 앞 공백을 제거한다.
 * param : sVal
 * return : String
 */
function _LTrim(sVal)
{
  var i;
  i=0;
  while (sVal.substring(i,i+1) == ' ')
  {
    i++;
  }
  return sVal.substring(i);
}
/**
 * 뒤 공백을 제거한다.
 * param : sVal
 * return : String
 */
function _RTrim(sVal)
{
  var i=sVal.length - 1;
  while (i >= 0 && sVal.substring(i,i+1) == ' ')
  {
    i--;
  }
  return sVal.substring(0,i+1);
}
/**
 * Sheet의 공통 이벤트 처리 함수에서 이벤트 처리 함수 명의 존재 여부를 확인한다.
 */
function funccheck(funcname) {
  try{
    func=eval(funcname);
  }catch(e){
    return(false);
  }
  return(true);
}
// IBSheetInfo.js 에서 이동 //
/**
 * Sheet에 존재하는 EtcData의 값을 폼의 객체에 채운다. 주로 조회 함수 사용후 이 함수를 사용한다.
 * @param : form      - Form 오브젝트
 * @param : sheet     - IBSheet Object ID
 * @return : 없음
 * @version : 2.4.0.0
 * @sample
 *  IBS_EtcDataToForm(document.frmData, mySheet);
 */
function IBS_GetEtcDataToForm2(form,ibsheet){
  if (typeof form != "object" || form.tagName != "FORM") {
    alert("FORM 태그가 아닙니다.");
    return "";
  }
 //form을 리셋한다.
 //form.reset();
 var j=0;
 //사용가능한 컨트롤을 배열로 생성한다.
 len=form.elements.length;
 for (i=0; i < len; i++) {
  if(form.elements[i].classid == undefined){
   var xvalue=ibsheet.GetEtcData(form.elements[i].name);
      if ( xvalue == undefined)  continue;
      switch (form.elements[i].type) {
        case "button":
        case "reset":
        case "submit":
         break;
      case "radio":
                //if ( xvalue == undefined)
                  //  break;
        var eRadio=document.all[form.elements[i].name];
           var idx=0;
           for(var k=0; k < eRadio.length; k++) {
           if (eRadio[k].value == xvalue) {
            idx=k;
              break;
              }
           }
           eRadio[idx].checked=true;
           break;
      case "checkbox":
                //if ( xvalue == undefined)
                  //  break;
         form.elements[i].checked=xvalue;
        break;
      case "select-one":
                //if ( xvalue == undefined)
                  //  break;
      var eOpt=form.elements[i].options;
               var idx=0;
               if(eOpt != null && eOpt.length != null && eOpt.length >= 1) {
                var opt_len=eOpt.length;
                  for(var k=0; k < opt_len; k++) {
                      if(eOpt[k].value == xvalue) {
                       idx=k;
                          break;
                      }
                  }
               }
               form.elements[i].selectedIndex=idx;
               break;
    case "select-multiple":  //선택될 값이 '|' 를 구분자로 입력되어있다고 가정한다.
            //if ( xvalue == undefined)
              //  break;
    var eOpt=form.elements[i].options;
             var idx=0;
           if(eOpt != null && eOpt.length != null && eOpt.length >= 1) {
            var opt_len=eOpt.length;
            var tvalue=xvalue.split("|");
            var tval_len=tvalue.length;
                for(var k=0; k < opt_len; k++) {
                    for(var m=0; m < tval_len;m++){
                     if(eOpt[k].value==tvalue[m])  eOpt[k].selected=true;
                    }
                }
             }
             break;
     default :
        if ( xvalue != undefined)
             form.elements[i].value=xvalue;
    }//switch
  }
 }//for
}
/**
 *  여러개의 그리드를 Save 시 사용
 */
function getSaveString(params){
	var saveString=null;
	if(params == null){
		saveString="";
	}else{
		saveString=params.join("&");
	}
	return saveString;
}
/**
 * Sheet 의 Date + Time format 의 validation Check 함수
 * 2006.01.03
 * 2007.01.09 -> 함수명 중복으로 인해 함수명에 IB 붙힘
 */
 function IBisDateTime(sheetObj,sDateTime)
            {
              var sDateTime1=sDateTime.replace(" ", "");
              if ( sDateTime1.length != 12) {
//                alert('12자리 모두 입력하심시오 (YYYY-MM-DD HH:MM)');
                showErrMessage(getMsg("COM12183"));
                return false;
              }
              var sDate=sDateTime.substr(0,8);
              var sTime=sDateTime.substr(8);
//              alert(sDateTime +"/" + sDate + "/" + sTime);
              if (IBisDateYMD(sheetObj,sDate)==false) return false;
              if (IBisTime(sheetObj,sTime) == false) return false;
              return true
            }
/**
 * 날짜 여부를 확인한다.(년월일)
 * param : sYmd 입력스트링(YYYYMMDD)
 * return : Boolean true이면 날짜 범위임
 */
function IBisDateYMD(sheetObj,sYmd)
{
  if(sYmd.length != 8)
  {
//    alert('일자를 모두 입력하십시오');
    //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg00'));
    return false;
  }
  // 숫자 확인
  if(!IBisNumber(sYmd))
  {
//    alert('날짜는 숫자만 입력하십시오');
      showErrMessage(getMsg("COM12122","Date"));
    return false;
  }
  var iYear=parseInt(sYmd.substring(0,4));  // 년도 입력(YYYY)
  var iMonth=parseInt(IBtrimZero(sYmd.substring(4,6)));   //월입력(MM)
  var iDay=parseInt(IBtrimZero(sYmd.substring(6,8)));     //일자입력(DD)
  if((iYear <= 0))
  {
    //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg01'));   //년월형식에 맞지 않습니다
	return false;
  }
  if((iMonth < 1) ||(iMonth >12))
  {
//    alert(iMonth+'월의 입력이 잘못 되었습니다.');
    //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg01'));   //년월형식에 맞지 않습니다
	return false;
  }
  //각 달의 총 날수를 구한다
  var iLastDay=IBlastDay(sheetObj,sYmd.substring(0,6));  // 해당월의 마지말날 계산
  if((iDay < 1) || (iDay > iLastDay))
  {
//    alert(iMonth+'월의 일자는 1 - '+ iLastDay +'까지입니다.');
      //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg02'));   //월일형식에 맞지 않습니다
    return false;
  }
  return true;
}
/**
 * 입력값이 숫자인지를 확인한다
 * param : sVal 입력스트링
 * return : Boolean True이면 숫자값
 */
function IBisNumber(sVal)
{
  if(sVal.length < 1)
  {
    return false;
  }
  for(i=0; i<sVal.length; i++)
  {
    iBit=parseInt(sVal.substring(i,i+1));     //문자(Char)를 숫자로 변경
    if(('0' < iBit) || ('9' > iBit))
    {
      //alert(i+':'+iBit+':'+'Mun');
    }
    else
    {
      //alert((i+1)+'번째 문자는 숫자가 아닙니다.');
      return false;
    }
  }
  return true;
}
/**
 * 첫번째 Zero 값을 자른다.
 * param : sVal 입력스트링
 * return : String  Zero값을 자른 값
 */
function IBtrimZero(sVal)
{
  if(sVal.charAt(0) == '0')
  {
    return sVal.substring(1,sVal.length);
  }
  else
  {
    return sVal;
  }
}
/**
 * 년월을 입력받아 마지막 일를 반환한다(년월)
 * param : sYM 입력스트링(YYYYMM)
 * return : String 해당월의 마지막날
 */
function IBlastDay(sheetObj,sYM)
{
  if(sYM.length != 6)
  {
//    alert("정확한 년월을 입력하십시요.");
    //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg01'));   //년월형식에 맞지 않습니다
    return;
  }
  if(!IBisDateYM(sheetObj,sYM))
  {
     return;
  }
  daysArray=new makeArray(12);    // 배열을 생성한다.
  for (i=1; i<8; i++)
  {
    daysArray[i]=30 + (i%2);
  }
  for (i=8; i<13; i++)
  {
    daysArray[i]=31 - (i%2);
  }
  var sYear=sYM.substring(0, 4) * 1;
  var sMonth=sYM.substring(4, 6) * 1;
  if (((sYear % 4 == 0) && (sYear % 100 != 0)) || (sYear % 400 == 0))
  {
		daysArray[2]=29;
  }
  else
  {
		daysArray[2]=28;
  }
  return daysArray[sMonth].toString();
}
/**
 * 날짜 여부를 확인한다.(년월)
 * param : sYM 입력스트링(YYYYMM)
 * return : Boolean true이면 날짜 범위임
 */
function IBisDateYM(sheetObj,sYM)
{
  // 숫자 확인
  if(!IBisNumber(sYM))
  {
//    alert('날짜는 숫자만 입력하십시오');
      showErrMessage(getMsg("COM12122","Date"));
    return false;
  }
  // 길이 확인
  if(sYM.length != 6)
  {
//    alert('일자를 모두 입력하십시오');
    //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg01'));   //년월형식에 맞지 않습니다
    return false;
  }
  var iYear=parseInt(sYM.substring(0,4)); //년도값 숫자로
  var iMonth=parseInt(IBtrimZero(sYM.substring(4,6)));  //월을 숫자로
  if((iMonth < 1) ||(iMonth >12))
  {
//    alert(iMonth+'월의 입력이 잘못 되었습니다.');
    //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg01'));   //년월형식에 맞지 않습니다
    return false;
  }
  return true;
}
/**
 * 시간 값을 확인한다.
 * param : sHm 입력스트링(HHMM)
 * return : Boolean true이면 시간 범위내
 */
function IBisTime(sheetObj,sHm)
{
  // 숫자 확인
  if(!IBisNumber(sHm))
  {
//    alert('숫자만 입력하십시오');
      showErrMessage(getMsg("COM12122","Time"));
    return false;
  }
  // 길이 확인
  if(sHm.length != 4)
  {
//    alert('4자리를 모두 입력하십시오(HHMM)');
      //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg05'));   //시분형식에 맞지 않습니다
    return false;
  }
  var iHH=parseInt(IBtrimZero(sHm.substring(0,2))); //시간을 숫자로
  var iMM=parseInt(IBtrimZero(sHm.substring(2,4))); //분을 숫자로
  if((iHH < 0) ||(iHH >23))
  {
//    alert('시간 입력이 잘못 되었습니다.');
      //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg05'));   //시분형식에 맞지 않습니다
    return false;
  }
  if((iMM < 0) ||(iMM >59))
  {
//    alert('분 입력이 잘못 되습니다.');
      //지원안함[공통처리]HANJIN: alert(sheetObj.MessageText('UserMsg05'));   //시분형식에 맞지 않습니다
    return false;
  }
  return true;
}
/**
 * 숫자 0으로 초기화 된 1차원 배열을 생성한다.
 * param : iSize 배열 크기
 * return : this 배열
 */
function makeArray(iSize)
{
  this.length=iSize;
  for (i=1; i <= iSize; i++)
  {
    this[i]=0;
  }
  return this;
}


/**
 * IBSheet의 Object태그를 문자열로 반환하며 Event Catch 태그는 문자열에서 제외한다. <br>
 * {@link #ComSheetObject}함수와 달리 Object를 생성하지 않고, 단순히 문자열만을 반환한다. <br>
 * <br>
 * <b>Example :</b>
 * 
 * <pre>
 * sObjTag = ComGetSheetObjectTag(&quot;sheet1&quot;);
 * </pre>
 * 
 * @param {string}
 *            sheetid 필수,IBSheet Object ID 문자열
 * @return string,IBSheet의 Object태그 문자열
 * @see #ComSheetObject
 */
function ComGetSheetObjectTag(sheetid, locale) {
	try {
		var div_str = "";

		if (!locale)
			locale = "";

		Grids.Locale = locale;

		div_str += "<div id='DIV_" + sheetid
				+ "' name='SheetName_" + sheetid
				+ "' style='width:100%;height:300px'>";
		div_str += "<script> IBSheet('<ibsheet Sync=\"1\" Data_Sync=\"0\"> </ibsheet>',\"DIV_"
				+ sheetid + "\", \"" + sheetid + "\"); </script>"
		div_str += "</div>\n";

		return div_str;

	} catch (err) {
		ComFuncErrMsg(err.message);
	}
}


/** ********************** [START] *************************** */
/**
 * 저장 , 에러시 ActiveX xml을 그리드에 Load 전에 IBSheet7 xml로 변환
 */

function _addOnLoadEvent(func, param) {
	var oldonload = window.onload;

	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			if (oldonload) {
				oldonload();
			}
			func(param);
		}
	}
}

// 시트의 OnLoadData를 독점한다.
function OnLoadData(sheetid) {
	
	window[sheetid + "_OnLoadData"] = function(sheetObj, dataStr) {
		// alert("OnLoadData ::" + dataStr);
		// console.log(JSON.parse(dataStr));
		if (dataStr.search(/^[^\<\{]*\{/) >= 0) {
		    return dataStr;
		} 

		var xml = dataStr;//convert2ibsheet7(dataStr);   [20140820 OJG] - 대량 데이터 조회시 에러발생됨 (Maximum call stack size exceeded)
		// console.log(xml);
		// alert("conver::" + xml);
		if (xml.indexOf("<MESSAGE>")>=0)  showErrorMsg(dataStr);
		return xml;
	}
}

// 문자열이 json 형식인지 확인
function IsJsonString(jsonString) {
	try {
		json = eval("{" + jsonString + "}");
	} catch (exception) {
		json = null;
	}
	if (json) {
		return true;
	}
	return false;
}
// xml객체를 string으로 변환
function xml2string(XXML) {
	if (window.XMLSerializer) {
		return (new XMLSerializer()).serializeToString(XXML[0]);
	} else {
		return XXML[0].xml;
	}
};
// IBSheet ActiveX용 저장 XML을 IBSheet7용 XML 형식으로 변환
function convert2ibsheet7(str) {
	if (str == "" || str == null || str == "null") {
		return false;
	}
	if (IsJsonString(str)) {
		return false;
	}
	if (str.indexOf("?>") > 0) {
		str = str.substring(str.indexOf("?>") + 2);
	}

	var rtnXml = "<SHEET>";
	xml = str, xmlDoc = $.parseXML(xml), $xml = $(xmlDoc);
	if (($xml.find("*").eq(0)[0].nodeName).toUpperCase() == "RESULT") {
		var $etc = $xml.find("ETC-DATA").children().length > 0 ? $xml
				.find("ETC-DATA") : $xml.find("etc-data");
		if ($etc.length > 0)
			rtnXml += xml2string($etc);

		var $msg = $xml.find("MESSAGE").length > 0 ? $xml.find("MESSAGE")
				: $xml.find("message");
		if ($msg.length > 0)
			rtnXml += xml2string($msg);

		if ($xml.find("TR-ALL").text() != ""
				|| $xml.find("tr-all").text() != "") {
			var $trall = $xml.find("TR-ALL").text() ? $xml.find("TR-ALL")
					: $xml.find("tr-all");
			if ($trall.text() == "OK" || $trall.text() == "ok") {
				rtnXml += "<Result Code='0' />";
			} else {
				rtnXml += "<Result Code='-1' />";
			}
		} else if ($xml.find("TR").children().length > 0
				|| $xml.find("tr").children().length > 0) {
			var $tr = $xml.find("TR").children().length > 0 ? $xml.find("TR")
					: $xml.find("tr");
			rtnXml += xml2string($tr);
		}
		var $sdata = $xml.find("DATA").children().length > 0 ? $xml
				.find("DATA") : $xml.find("data");
		if ($sdata.length > 0)
			rtnXml += xml2string($sdata);

		/*if ($xml.find("DATA").children().length > 0
				|| $xml.find("data").children().length > 0) {
			alert("저장 XML 안에 테그가 감지되었습니다.\n\nIBSheet7은 저장 XML에 테그를 허용하지 않습니다.");
			return false;
		}
		if ($xml.find("TR-DATA").children().length > 0
				|| $xml.find("tr-data").children().length > 0) {
			alert("저장 XML 안에 테그가 감지되었습니다.\n\nIBSheet7은 저장 XML에 테그를 허용하지 않습니다.");
			return false;
		}*/

		return rtnXml + "</SHEET>";
	} else if (($xml.find("*").eq(0)[0].nodeName).toUpperCase() == "ERROR") {
		var $etc = $xml.find("ETC-DATA").children().length > 0 ? $xml
				.find("ETC-DATA") : $xml.find("etc-data");
		if ($etc.length > 0)
			rtnXml += xml2string($etc);

		var $msg = $xml.find("MESSAGE").length > 0 ? $xml.find("MESSAGE")
				: $xml.find("message");
		if ($msg.length > 0)
			rtnXml += xml2string($msg);

		rtnXml += "<RESULT CODE=\"-1\"></RESULT>";
		return rtnXml + "</SHEET>";
	} else {
		return "";
	}
}

function showErrorMsg(str ){
	xml = str, xmlDoc = $.parseXML(xml), $xml = $(xmlDoc);
	var $msg = $xml.find("MESSAGE").length > 0 ? $xml.find("MESSAGE")
				: $xml.find("message");

		if ($msg.length > 0){
			alert($msg.text()) ;
		}
}


/** ********************** [END] *************************** */

function ComFuncCheck(funcname) {
    try{
      ComFunc = eval(funcname);
    }catch(e){
      return false;
    }
    return true;
}
 
function ComResizeSheet(sheetObj, iBottomMargin){
	return false;		//[20141127 OJG] Sheet Resize 기능 제거
	
	try {
		if ((!sheetObj) || (!sheetObj.IBSheetVersion)) {
			//console.log("ComResizeSheet 함수의 첫번째 인자가 IBSheet가 아닙니다. 함수 사용법을 다시 확인하세요");
			return;
		}
		
		var itop = AnchorPosition_getPageOffsetTop(sheetObj);
		var iHeight = $(window).height();
	    var iRowH = sheetObj.GetDataRowHeight();
		var iCntHeight = (sheetObj.GetCountPosition()==0)?0:iRowH;
		var iHeadHeight = 0;
		//해더글자중에 줄바꿈이 있으면 행의 높이가 26이 아니라 30이 될수 있음
		for (var ir=0; ir<sheetObj.HeaderRows(); ir++){	
			iHeadHeight += sheetObj.GetRowHeight(ir);
		}
		var iMinHeight = iHeadHeight + iCntHeight + (2*iRowH) + 2;
		
		if (iBottomMargin==undefined) iBottomMargin =  70;	//기본bottom-margin은 30임
		iHeight -= (itop + iBottomMargin + iCntHeight+iHeadHeight);
		var iDataHeight = iHeight; // - (iHeight) % iRowH;	
		iHeight = iCntHeight + iHeadHeight + iDataHeight + 3;
		if (iHeight<=iMinHeight) iHeight = iMinHeight;	//minimum
	
		//console.log("sheetObj.id=" + sheetObj.id +  ", iHeight=" + iHeight + ", iMinHeight=" + iMinHeight);
	    sheetObj.SetSheetHeight(iHeight, 1);
	} catch (err) {
		//ComFuncErrMsg(err.message);
	}
}
