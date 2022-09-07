/*
===============================================================================
프로그램  명 : IBSheet에서 제공하는 공통 Javascript
프로그램개요 : 공통적으로 사용되는 Javascript를 정의한다
작   성   자 : 이경희
작   성   일 : 2003-07-01
수   정   일 : 2006-12-21
최 종  버 전 : IBSheet 2.9.0.0
===============================================================================
FormQueryString       - Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 이때, 한글은 인코딩하지 않는다.
FormQueryStringEnc    - Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 이때, 한글은 인코딩한다.
IBS_ConcatSaveName    - SaveName을 구분자로 조합하여 반환한다.
IBS_GetEtcDataToForm     - Sheet에 존재하는 GetEtcData의 값을 폼의 객체에 채운다.
//지원안함[확인요망]HANJIN: IBS_GetDataSearchXml  - Sheet의 데이터를 조회XML로 구성하여 반환한다.
IBS_Sheet2SheetCheck  - 2개 Sheet에서 데이터 이동하기, 체크된 데이터만 이동하기
IBS_Sheet2SheetStatus - 2개 Sheet에서 데이터 이동하기, 특정 트랜잭션 상태만 이동하기
===============================================================================
*/
    /*------------------다음 코드는 JSDoc을 잘 만들기 위해서 추가된 코드임 ------------------*/
    /**
     * @fileoverview IBSheet에서 사용하는 공통 Javascript 함수를 정의한다.
     * @author (주)아이비리더스
     * @since 2003-07-01
     * @version 3.4.0.50
     */

    /**
     *
     * @class IBSheetInfo : IBSheet에서 사용하는 각종 자바스크립트 함수와 상수를 정의한다.
     */
    function IBSheetInfo() {
        this.FormQueryString        = FormQueryString       ;   //Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 이때, 한글은 인코딩하지 않는다.
        this.FormQueryStringEnc     = FormQueryStringEnc    ;   //Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 이때, 한글은 인코딩한다.
        this.FormQueryStringOrg     = FormQueryStringOrg    ;   //Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 이때, 한글은 인코딩하지 않는다.
        this.IBS_ConcatSaveName     = IBS_ConcatSaveName    ;   //SaveName을 구분자로 조합하여 반환한다.
        this.IBS_CopyFormToRow      = IBS_CopyFormToRow     ;   //Form의 각 컨트롤에 값을 Sheet의 특정행의 각 컬럼에 복사한다.
        this.IBS_CopyRowToForm      = IBS_CopyRowToForm     ;   //Sheet의 특정행의 값을 Form의 각 컨트롤에 값을 복사한다.
        this.IBS_EtcDataToForm      = IBS_EtcDataToForm     ;   //Sheet에 존재하는 EtcData의 값을 폼의 객체에 채운다.
        this.IBS_GetDataSearchXml   = IBS_GetDataSearchXml  ;   //Sheet의 데이터를 조회XML로 구성하여 반환한다.
        this.IBS_Sheet2SheetCheck   = IBS_Sheet2SheetCheck  ;   //2개 Sheet에서 데이터 이동하기, 체크된 데이터만 이동하기
        this.IBS_Sheet2SheetStatus  = IBS_Sheet2SheetStatus ;   //2개 Sheet에서 데이터 이동하기, 특정 트랜잭션 상태만 이동하기
        this.IBS_DoSearchSax        = IBS_DoSearchSax       ;
        this.ComGetComboText        = ComGetComboText       ;
        this.ComSetIBCombo          = ComSetIBCombo       	;
        this.IBS_SaveGridSetting	= IBS_SaveGridSetting	;
        this.IBS_RestoreGridSetting	= IBS_RestoreGridSetting;
        this.IBS_DelGridSetting		= IBS_DelGridSetting	;
        
    }

    /*------------------여기서 부터 공통자바스크립트 함수를 정의한다.     ------------------*/
/* 페이지의 파일명을 제외한 기본 위치 url
 * 예를 들어 http://211.41.15.40:7001/Sample_IBSheet/sheet/me.html이 현재페이지 이면
 * page_path 값은 "/Sample_IBSheet/sheet/" 이다
**/
var page_path=location.pathname;
page_path=page_path.substr(0,page_path.lastIndexOf("/")+1);
//모달로 열었을때는 처음에 "/"로 시작하지 않을수 있음
if (page_path.charAt(0) != "/") page_path="/" + page_path;
/* MergeSheet 속성에 설정 값 */
msNone=0;      // 머지 없음
msAll=1;      // 전부 머지 가능
msPrevColumnMerge=2;      // 앞 컬럼이 머지 된 경우 해당 행 안에서 머지 가능
msHeaderOnly=5;      // 해더만 머지
/* InitDataProperty 함수에 DataType 인자에 설정 하는 값 */
dtNull=-1;     // 없음
dtData=0;      // 일반 데이터
dtStatus=1;      // 트랜잭션 상태
dtDelCheck=2;      // 삭제 체크 박스
dtDelCheckEx=3;      // 삭제 체크 박스 + 실제 지움
dtCheckBox=4;      // 선택 체크 박스
dtHidden=5;      // 숨겨진 데이터
dtCombo=6;      // 콤보 형 데이터
dtComboEdit=7;      // 콤보 형 데이터 + Edit가능
dtPopup=8;      // 팝업 버튼 형 데이터 + OnPopup 이벤트 발생 + 값에 대한 포멧기능무시
dtPopupEdit=9;      // 팝업 버튼 형 데이터 + OnPopup 이벤트 발생 + Edit 가능 + 값에 대한 포멧기능무시
dtFileUp=10;     // 파일 업로드 형 데이터
dtResult=11;     // 트랜잭션 결과
dtAutoSum=12;     // 자동 계산 컬럼
dtAutoSumEx=13;     // 자동 계산 + 삭제된 행 계산 제외
dtAutoAvg=14;     // 자동 평균 컬럼
dtAutoAvgEx=15;     // 자동 평균 + 삭제된 행 계산 제외
dtImage=16;     // 이미지 형
dtSeq=17;     // 시퀀스
dtPassword=18;     // 패스워드
dtHiddenStatus=19;     // dtStatus + 숨겨짐
dtImageText=20;     // 이미지 + 텍스트
dtDataSeq=21;     // 데이터 순번
dtPopupFormat=22;     // 팝업 버튼 형 데이터 + OnPopup 이벤트 발생 + 값에대한포멧기능사용
dtPopupEditFormat=23;     // 팝업 버튼 형 데이터 + OnPopup 이벤트 발생 + Edit 가능  + 값에 대한 포멧기능사용
dtDummyCheck=24;     // Dummy 체크박스
dtRadioCheck=25;     // Dummy 체크박스
/* InitDataProperty 함수에 DataAlign 인자에 설정 하는 값 */
daNull=-1;     // 없음
daLeft=0;      // 좌측 가운데 정렬
daCenter=1;      // 가운데 가운데 정렬
daRight=2;      // 우측 가운데 정렬
daLeftTop=3;      // 좌측 상단 정렬
daLeftBottom=4;      // 좌측 하단 정렬
daCenterTop=5;      // 가운데 상단 정렬
daCenterBottom=6;      // 가운데 바닥 정렬
daRightTop=7;      // 우측 상단 정렬
daRightBottom=8;      // 우측 바닥 정렬
/*InitDataProperty 함수에 DataFormat 인자에 설정 하는 값 */
dfNull=-1;     // 없음
dfNone=0;      // 포멧 없음
dfDateYmd=1;      // 날짜-년월일 YYYY.MM.DD
dfDateYm=2;      // 날짜-년월 YYYY.MM
dfDateMd=3;      // 날짜-월일 MM.DD
dfTimeHms=4;      // 시간-시분초 HH:MM:SS
dfTimeHm=5;      // 시간-시분 HH:MM
dfIdNo=6;      // 주민등록번호
dfSaupNo=7;      // 사업자 번호
dfCardNo=8;      // 카드 번호
dfPostNo=9;      // 우편번호
dfInteger=10;     // 정수(Default 0)
dfFloat=11;     // 실수(Default 0.0)
dfNullInteger=12;     // 정수(Default null)
dfNullFloat=13;     // 실수(Default null)
dfNumber=14;     // 숫자
dfHanKey=15;     // 한글 입력 모드
dfEngKey=16;     // 영문 입력 모드
dfEngUpKey=17;     // 영문 대문자 입력 모드
dfEngDnKey=18;     // 영문 소문자 입력 모드
dfUserFormat=19;     // 사용자 설정형 포멧
dfUserFormat2=20;     // 사용자 설정형 포멧, 마스크 구분자가 2개인 경우
dfFloatOrg=21;     // AM3107 FloatOrg 추가함 (합계시 소실 없음)
dfNullFloatOrg=22;     // AM3107 NullFloatOrg 추가함 (합계시 소실 없음)
/*GetDataProperty 함수에서 DataPropertyChoice 인자에 설정 하는 값 */
dpDataType=0;      // 데이터 타입
dpDataAlign=1;      // 데이터 정렬
dpDataFormat=2;      // 데이터 포멧
dpSaveName=3;      // 저장 변수명
dpKeyField=4;      // 필수 입력 여부
dpCalcuLogic=5;      // 계산 공식
dpPointCount=6;      // 소숫점 이하 자리 개수
dpUpdateEdit=7;      // 수정 가능 여부
dpInsertEdit=8;      // 입력 가능 여부
dpEditLen=9;      // 입력 길이
dpFullInput=10;     // 전체 입력 여부
dpColumnSort=11;     // 소트 가능 여부
dpVisAllCheck=12;     // 전체 CheckBox 여부
dpSaveStatus=13;     // 저장 상태 코드
dpFormatFix=14;     // 포멧 고정 여부
dpValidType=15;     // Validation Type
dpValidChar=16;     // Validation Char
poDefault=0;      // 페이지에 설정된 값 그대로
poPortrait=1;      // 세로 페이지
poLandscape=2;      // 가로 페이지
/* GetSelectionMode()속성에 설정하는 값 */
smSelectionFree=0;      // 자유 선택 모드
smSelectionRow=1;      // 행단위 선택 모드
smSelectionCol=2;      // 컬럼단위 선택 모드
smSelectionList=3;      // 행단위 랜덤 선택 모드
/* GetBasicImeMode()속성에 설정하는 값 */
imeAuto=0;      // 마지막 상태를 그대로 사용
imeHan=1;      // 기본 상태를 한글 입력 상태로 함
imeEng=2;      // 기본 상태를 영문 입력 상태로 함
//지원안함[공통처리]HANJIN: /* GridLine 속성에 설정하는 값 */
glNone=0;      // 선없음
glFlat=1;      // 기본선
glFlatHorz=4;      // 평면가로선만 있고, 세로선은 없음
glFlatVert=8;      // 평면세로선만 있고, 가로선은 없음
//지원안함[확인요망]HANJIN: /* InitDataValid 함수에서 ValidType 인자에 설정하는 값 - 2.4.0.0 */
vtNone=0;      // 자동으로 처리
vtCharOnly=1;      // ValidChart에 설정된 글자만 처리
vtNumericOnly=2;      // 숫자만 입력
vtEngOnly=3;      // 영문만 입력
vtHanOnly=4;      // 한글만 입력
vtNumericOther=5;      // 숫자+기타글자
vtEngOther=6;      // 영문+기타글자
vtHanOther=7;      // 한글+기타글자
vtExceptChar=8;      // ValidChart에 설정된 글자만 빼고 모두 입력
vtEngUpOnly=9;      // 영문대문자만 입력, 키보드 입력시 소문자를 입력해도 자동 대문자로 표시
vtEngDnOnly=10;     // 영문소문자만 입력, 키보드 입력시 대문자로 입력해도 자동 소문자로 표시
vtEngUpOther=11;     // 영문대문자+기타글자, 키보드 입력시 소문자를 입력해도 자동 대문자로 표시
vtEngDnOther=12;     // 영문소문자+기타글자, 키보드 입력시 대문자로 입력해도 자동 소문자로 표시
/* FocusStyle 속성에 설정하는 값 - 2.4.0.0 */
    fsNone            = 0;      // 모양 없음
    fsLight           = 1;      // 점선 모양 (기본모양)
    fsHeavy           = 2;      // 굵은 회색 테두리 모양
    fsSolid           = 3;      // SelectBackColor 색상의 실선
    fsRaised          = 4;      // 입체적으로 나온 모양
    fsInset           = 5;      // 안으로 들어간 모양
/**
 * Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 이때, 한글은 인코딩하지 않는다.
 * @param : form      - Form 오브젝트
 * @return : Form오브젝트 안에 Control을 QueryString으로 구성한 문자열
 * @version : 1.0.0.0
 * @sample
 *  var sCondParam=FormQueryString(document.frmSearch); //결과:"txtname=이경희&rdoYn=1&sltMoney=원화";
 */
function FormQueryString(form) {
  if (typeof form != "object" || form.tagName != "FORM") {
            IBS_ShowErrMsg("FormQueryString 함수의 인자는 FORM 태그가 아닙니다.");
    return "";
  }
	var name=new Array(form.elements.length);
	var value=new Array(form.elements.length);
	var j=0;
	var plain_text="";
	//사용가능한 컨트롤을 배열로 생성한다.
	len=form.elements.length;
	for (i=0; i < len; i++) {
            var prev_j = j;
            switch (form.elements[i].type) {
                case undefined:
  	    case "button":
  	    case "reset":
  	    case "submit":
  	      break;
  	    case "radio":
  	    case "checkbox":
    				if (form.elements[i].checked == true) {
                        		name[j] = IBS_getName(form.elements[i]);
    					value[j]=form.elements[i].value;
    					j++;
    				}
    				break;
    		case "select-one":
                    			name[j] = IBS_getName(form.elements[i]);
  					var ind=form.elements[i].selectedIndex;
  					if(ind >= 0) {
                        			value[j] = form.elements[i].options[ind].value;
  					} else {
  						value[j]="";
  					}
  					j++;
  					break;
  			case "select-multiple":
                    name[j] = IBS_getName(form.elements[i]);
  					var llen=form.elements[i].length;
  					var increased=0;
  					for( k=0; k < llen; k++) {
  						if (form.elements[i].options[k].selected) {
                            name[j] = IBS_getName(form.elements[i]);
                            value[j] = form.elements[i].options[k].value;

  							j++;
  							increased++;
  						}
  					}
  					if(increased > 0) {
  						j--;
  					} else {
  						value[j]="";
  					}
  					j++;
  					break;
  				default :
                    name[j] = IBS_getName(form.elements[i]);
  					value[j]=form.elements[i].value;
    				j++;
  		}

  	}

        for (i=0; i < j; i++) {
            // if (name[i] != '') plain_text += name[i]+ "=" + value[i] + "&";
        	//mig-name은 제외하고 value만 인코딩한다. IE와 crom에서 동일하게 사용할수 있다.
            if (name[i] != '') plain_text += name[i]+ "=" + encodeURIComponent(value[i]) + "&";
    	}

  //마지막에 &를 없애기 위함
  if (plain_text != "")
    plain_text=plain_text.substr(0, plain_text.length -1);
	return plain_text;
}
/**
 * Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 이때, 한글은 인코딩한다.
 * @param : form      - Form 오브젝트
 * @param : toSheet   - 이동 대상 Sheet의 Object id
 * @return : Form오브젝트 안에 Control을 QueryString으로 구성한 문자열
 * @version : 1.0.0.0
 * @sample
 *  var sCondParam=FormQueryStringEnc(document.frmSearch, mySheet1);
*   원본:"txtname=이경희&rdoYn=1&sltMoney=원화";
 *  결과:"txtname=%C0%CC%B0%E6%C8%F1&rdoYn=1&sltMoney=%BF%F8%C8%AD";                //UTF16인 경우
 *  결과:"txtname=%EC%9D%B4%EA%B2%BD%ED%9D%AC&rdoYn=1&sltMoney=%EC%9B%90%ED%99%94"; //UTF8인 경우
 */
function FormQueryStringEnc(form, sheet) {
  if (typeof form != "object" || form.tagName != "FORM") {
    	        IBS_ShowErrMsg("FormQueryStringEnc 함수의 form 인자는 FORM 태그가 아닙니다.");
    return "";
  }


    	  

	var name=new Array(form.elements.length);
	var value=new Array(form.elements.length);
	var j=0;
	var plain_text="";
	//사용가능한 컨트롤을 배열로 생성한다.
	len=form.elements.length;
	for (i=0; i < len; i++) {
    	        var prev_j = j;
  	  switch (form.elements[i].type) {
  	    case "button":
  	    case "reset":
  	    case "submit":
  	      break;
  	    case "radio":
  	    case "checkbox":
    				if (form.elements[i].checked == true) {
    	                    name[j] = IBS_getName(form.elements[i]);
    					value[j]=form.elements[i].value;
    					j++;
    				}
    				break;
    		case "select-one":
    	                name[j] = IBS_getName(form.elements[i]);
  					var ind=form.elements[i].selectedIndex;
  					if(ind >= 0) {

    	                    value[j] = form.elements[i].options[ind].value;

  					} else {
  						value[j]="";
  					}
  					j++;
  					break;
  			case "select-multiple":
    	                name[j] = IBS_getName(form.elements[i]);
  					var llen=form.elements[i].length;
  					var increased=0;
  					for( k=0; k < llen; k++) {
  						if (form.elements[i].options[k].selected) {
    	                        name[j] = IBS_getName(form.elements[i]);

    	                        value[j] = form.elements[i].options[k].value;

  							j++;
  							increased++;
  						}
  					}
  					if(increased > 0) {
  						j--;
  					} else {
  						value[j]="";
  					}
  					j++;
  					break;
  				default :
    	                name[j] = IBS_getName(form.elements[i]);
  					value[j]=form.elements[i].value;
    				j++;
    	        }
    	    }
	    for (i = 0; i < j; i++) {
	        if (name[i] != '') plain_text += encodeURIComponent(name[i]) + "=" + encodeURIComponent(value[i]) + "&";
	    }

	    //마지막에 &를 없애기 위함
	    if (plain_text != "") plain_text = plain_text.substr(0, plain_text.length - 1);

	    return plain_text;
    }

    /**
     * Form오브젝트 안에 있는 컨트롤을 QueryString으로 구성한다. 이때, 한글은 인코딩하지 않는다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     var sCondParam=FormQueryStringOrg(document.frmSearch); //결과:"txtname=이경희&rdoYn=1&sltMoney=원화";
     * </pre>
     * @param {form} form Form 오브젝트
     * @return string
     * @version 1.0.0.0
     * @see #FormQueryStringEnc
     */
	function FormQueryStringOrg(form) {
		if (typeof form != "object" || form.tagName != "FORM") {
	        IBS_ShowErrMsg("FormQueryString 함수의 인자는 FORM 태그가 아닙니다.");
	        return "";
	    }

	   

	    var name = new Array(form.elements.length);
	    var value = new Array(form.elements.length);
	    var j = 0;
	    var plain_text = "";

	    //사용가능한 컨트롤을 배열로 생성한다.
	    len = form.elements.length;
	    for (i = 0; i < len; i++) {
	        var prev_j = j;
	        switch (form.elements[i].type) {
	            case undefined:
	            case "button":
	            case "reset":
	            case "submit":
	                break;
	            case "radio":
	            case "checkbox":
	                if (form.elements[i].checked == true) {
	                    name[j] = IBS_getName(form.elements[i]);
	                    value[j] = form.elements[i].value;
	                    j++;
	                }
	                break;
	            case "select-one":
	                name[j] = IBS_getName(form.elements[i]);
	                var ind = form.elements[i].selectedIndex;
	                if (ind >= 0) {

	                    value[j] = form.elements[i].options[ind].value;

	                } else {
	                    value[j] = "";
	                }
	                j++;
	                break;
	            case "select-multiple":
	                name[j] = IBS_getName(form.elements[i]);
	                var llen = form.elements[i].length;
	                var increased = 0;
	                for (k = 0; k < llen; k++) {
	                    if (form.elements[i].options[k].selected) {
	                        name[j] = IBS_getName(form.elements[i]);
	                        value[j] = form.elements[i].options[k].value;

	                        j++;
	                        increased++;
	                    }
	                }
	                if (increased > 0) {
	                    j--;
	                } else {
	                    value[j] = "";
	                }
	                j++;
	                break;
	            default:
	                name[j] = IBS_getName(form.elements[i]);
	                value[j] = form.elements[i].value;
	                j++;
	        }


	    }
	    //QueryString을 조합한다.
	    for (i = 0; i < j; i++) {
	        if (name[i] != '') plain_text += name[i] + "=" + value[i] + "&";
	    }

	    //마지막에 &를 없애기 위함
	    if (plain_text != "") plain_text = plain_text.substr(0, plain_text.length - 1);

	    return plain_text;
}

	function IBS_getName(obj) {
	    if (obj.name != "") {
	        return obj.name;
	    } else if (obj.id != "") {
	        return obj.id;
	    } else {
	        return "";
	    }
	}
/**
 * 2개 Sheet에서 데이터 이동하기 - 체크된 데이터만 이동하기
 * @param : fromSheet - 이동 원본 Sheet의 Object id
 * @param : toSheet   - 이동 대상 Sheet의 Object id
 * @param : chkCol    - 체크박스 컬럼의 인덱스
 * @return : 없음
 * @version : 2.4.0.0
 * @sample
 *  IBS_Sheet2SheetCheck(mySheet1, mySheet2, 2);
 */
function IBS_Sheet2SheetCheck(fromSheet, toSheet, chkCol)  {
  //함수 인자 유효성 확인
		  if ((!fromSheet) || (!fromSheet.IBSheetVersion)) 
		    return alert("IBS_Sheet2SheetCheck 함수의 fromSheet 인자는 IBSheet가 아닙니다.");
		  else if ((!toSheet) || (!toSheet.IBSheetVersion))
		    return alert("IBS_Sheet2SheetCheck 함수의 toSheet 인자는 IBSheet가 아닙니다.");
		  else if (chkCol < 0 || chkCol > fromSheet.LastCol())
		    return alert("IBS_Sheet2SheetCheck 함수의 chkCol 인자는 컬럼 영역 이내가 아닙니다.");
		  //데이터 행의 개수 확인
		  var toRow = toSheet.RowCount();

		    fromSheet.RenderSheet(0);
			toSheet.RenderSheet(0);
		  //원본에서 역순으로 Check 된 데이터를 확인하여 이동
		  for (ir = fromSheet.LastRow(); ir>= fromSheet.HeaderRows(); ir--) {
		    //Check 되지 않은 경우 건너뜀
		    if (fromSheet.GetCellValue(ir, chkCol) == '0') continue;
		    //데이터 행 추가
		    toRow = toSheet.DataInsert(toRow);
		    //데이터 옮기기
		    for (ic = 0; ic<=fromSheet.LastCol(); ic++) {
		      //체크 컬럼은 빼고 옮김
		      if (ic == chkCol) continue;
		      toSheet.SetCellValue(toRow,ic,fromSheet.GetCellValue(ir,ic));
		    }
		    //원본에서 지움
		    fromSheet.RowDelete(ir, false);
		    toRow--;
		  }
			toSheet.RenderSheet(1);
		    fromSheet.RenderSheet(1);
		}
	
/**
 * 2개 Sheet에서 데이터 이동하기 - 특정 트랜잭션 상태만 이동하기
 * @param : fromSheet - 이동 원본 Sheet의 Object id
 * @param : toSheet   - 이동 대상 Sheet의 Object id
 * @param : sStatus   - 트랜잭션 상태를 "|"로 연결할것, 예) sStatus = "U|D"
 * @return : 없음
 * @version : 2.4.0.0
 * @sample
 *  IBS_Sheet2SheetStatus(mySheet1, mySheet2, "U");
 *  IBS_Sheet2SheetStatus(mySheet1, mySheet2, "U|D");
 */
	function IBS_Sheet2SheetStatus(fromSheet, toSheet, sStatus)  {
		  //함수 인자 유효성 확인
		  if ((!fromSheet) || (!fromSheet.IBSheetVersion))
		    return alert("IBS_Sheet2SheetStatus 함수의 fromSheet 인자는 IBSheet가 아닙니다.");
		  else if ((!toSheet) || (!toSheet.IBSheetVersion))
		    return alert("IBS_Sheet2SheetStatus 함수의 toSheet 인자는 IBSheet가 아닙니다.");
		  //데이터 행의 개수 확인
		  var fromRow = 0;
		  var sRow = fromSheet.FindStatusRow(sStatus);
		  if ( sRow == "" ) return;
		  var arrRow = sRow.split(";");
		  var rowXml = "";
		  alert(arrRow.length);
		  var allXml="<?xml version='1.0'  ?><SHEET>  <DATA>";
		  //원본에서 역순으로 특정 상태의 행을 이동한다.
		  for (ir=0; ir < arrRow.length; ir++) {
		    fromRow = arrRow[ir];
		    //옮길 데이터를 xml로 구성한다.
		    rowXml="<TR>";
		    for (ic = 0; ic<=fromSheet.LastCol(); ic++) {
		      rowXml += "<TD>" + fromSheet.GetCellValue(fromRow,ic) + "</TD>";
		    }
		    rowXml += "</TR>";
		    allXml += rowXml;
		  }
		  //원본에서 역순으로 특정 상태의 행을 이동한다.
		  for (ir = arrRow.length-1; ir >=0 ; ir--) {
		    fromRow = arrRow[ir];
		    //원본에서 지움
		    fromSheet.RowDelete(fromRow, false);
		  }
		  allXml += "</DATA></SHEET>";
		//파라메타변경[확인요망]:   
			toSheet.LoadSearchData(allXml, true);
		}
/**
 * Sheet의 데이터를 조회XML로 구성하여 반환한다.
 * @param : sheet_obj - IBSheet Object ID
 * @return : Sheet의 데이터를 조회XML로 구성한 문자열
 * @version : 2.4.0.0
 * @sample
 *  var sXml = IBS_GetDataSearchXml(mySheet);
 */
	function IBS_GetDataSearchXml(sheet_obj)  {
		  //함수 인자 유효성 확인
		  if ((!sheet_obj) || (!sheet_obj.IBSheetVersion)){
		    alert("IBS_GetDataSearchXml 함수의 sheet_obj 인자는 IBSheet가 아닙니다.");
		    return "";
		  }
		  var rowXml = "";
		  var allXml="<?xml version='1.0'  ?>\n<SHEET>\n  <DATA TOTAL='"+ sheet_obj.TotalRows +"'>\n";
  for (ir=sheet_obj.HeaderRows(); ir <= sheet_obj.LastRow(); ir++) {
    rowXml="    <TR>";
    for (ic=0; ic<= sheet_obj.LastCol(); ic++) {
      //셀의 값을 변수에 저장한다.
var sValue=String(sheet_obj.GetCellValue(ir,ic));
      //특수문자(&, <, >)가 포함된 경우만 CDATA로 감싼다
      if (sValue.indexOf("&") > -1 || sValue.indexOf("<") > -1 || sValue.indexOf(">") > -1) {
        sValue="<![CDATA[" + sValue + "]]>";
      }
      //XML을 만든다.
      rowXml += "<TD>" + sValue + "</TD>";
    }
    rowXml += "</TR>\n";
    allXml += rowXml;
  }
  allXml += "  </DATA>\n</SHEET>";
  return allXml;
}
/**
 * SaveName을 구분자로 조합하여 반환한다.
 * @param : sheet - IBSheet Object ID
 * @param : delim - 구분자, Default="|"
 * @return : SaveName을 구분자로 조합된 문자열
 * @version : 2.4.0.0
 * @sample
 *  var sParam = IBS_ConcatSaveName(mySheet);
 *  var sParam = IBS_ConcatSaveName(mySheet, ",");
 */
    function IBS_ConcatSaveName(sheet, delim)
    {
      if (delim == null) delim = "|";
      
      //한진해운공통 - 맨 마지막에 "|"가 하나 더 붙는 문제를 해결하기 위해 아래 소스를 모두 수정함
      /*
      var savenames = "";
      for ( var n = 0; n <= sheet.LastCol; n++ )
      {
        savenames += sheet.ReadDataProperty(0, n, dpSaveName) + delim;
      }
      return savenames;
      */
      
      var savenames = new Array();
      for ( var n = 0; n <= sheet.LastCol(); n++ )
      {
        savenames[n] = sheet.GetCellProperty(0, n, "SaveName");
      }
      return savenames.join(delim);
    }
/**
 * Sheet에 존재하는 EtcData의 값을 폼의 객체에 채운다. 주로 조회 함수 사용후 이 함수를 사용한다.
 * @param : form      - Form 오브젝트
 * @param : sheet     - IBSheet Object ID
 * @return : 없음
 * @version : 2.5.0.0
 * @sample
 *  IBS_EtcDataToForm(document.frmData, mySheet);
 */
    function IBS_EtcDataToForm(form,ibsheet){
  if (typeof form != "object" || form.tagName != "FORM") {
    return alert("IBS_GetEtcDataToForm 함수의 form인자는 FORM 태그가 아닙니다.");
    	  }  else if ((!ibsheet) || (!ibsheet.IBSheetVersion)) {
    return alert("IBS_GetEtcDataToForm 함수의 ibsheet 인자는 IBSheet 태그가 아닙니다.");
  }
  //form을 리셋한다.
  form.reset();
  var j=0;
  //사용가능한 컨트롤을 배열로 생성한다.
  len=form.elements.length;
  for (i=0; i < len; i++) {
      var xvalue=ibsheet.GetEtcData(form.elements[i].name);
      if ( xvalue == undefined)  continue;
      switch (form.elements[i].type) {
        case "button":
        case "reset":
        case "submit":
          break;
        case "radio":
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
          form.elements[i].checked=xvalue;
          break;
        case "select-one":
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
             form.elements[i].value=xvalue;
        }//switch
  }//for
}
/**
 * 이 함수는 대량의 데이터를 조회시 조회속도를 개선하기 위해서 Sax를 이용한 조회 함수임
 * @param   : sheetobj  - IBSheet Object ID
 * @param   : PageUrl   - 조회 처리할 페이지 파일 이름
 * @param   : CondParam - 조회조건 QueryString
 * @param   : PageParam - 페이지 조건 QueryString
 * @param   : IsAppend  - 조회된 내용을 이어서 쓸지 여부
 * @param   : AppendRow - IsAppend 인자가 true인 경우 이어쓸 행의 Row Index
 * @return  : Boolean, 조회 완료 여부
 * @version : 3.1.0.0
 * @sample
 *  IBS_DoSearchSax(mySheet,"EES_EQR_060.xml",FormQueryString(formObj));
 */
    function IBS_DoSearchSax(sheetobj, PageUrl, CondParam, PageParam, UsePost, IsAppend, AppendRow) 
    {
      //함수의 인자 유효성 확인
      if  ((!sheetobj) || (!sheetobj.IBSheetVersion)){
        return alert("IBS_SpeedDoSearch 함수의 sheetobj 인자는 IBSheet 태그가 아닙니다.");
      }
      
      if (CondParam == "undefined") CondParam = "";
      if (PageParam == "undefined") PageParam = "";
      if (UsePost   == "undefined") UsePost = false;
      if (IsAppend == "undefined")  IsAppend = false;
      if (AppendRow == "undefined") AppendRow = -1;
      //MassOfSearch=1인 경우 Sax를 사용하지 않고, DoSearch를 그대로 이용한다.
      //if (sheetobj.MassOfSearch==1) {
        //지원안함[확인요망]: if (UsePost){
    //파라메타변경[확인요망]:       return sheetobj.DoSearch("PageUrl","CondParam&PageParam",{Append:IsAppend} );
        //}else{
    //함수변경[확인요망]:       
    		return sheetobj.DoSearch(PageUrl ,CondParam+"&"+PageParam,{Append:IsAppend} );
        //}
      //}
      //1. 서버를 연결하여 조회결과를 XML로 가져온다.
    //지원안함[확인요망]: //파라메타변경[확인요망]:   var s_Xml = sheetobj.GetSearchData(PageUrl, CondParam, PageParam, UsePost);
      //2. 가져온 조회XML에서 SAX가 파싱할수 없는 특수문자를 제거한다.
      //s_Xml = s_Xml.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDB7F\uDB80-\uDBFF\uDC00-\uDFFF\uFFFE\uFFFF]/g, " ");
      //3. 특수문자가 걸러진 XML을 파싱하여 Sheet로 로드한다.
      //지원안함[확인요망]: return sheetobj.LoadSearchXml4Sax(s_Xml, IsAppend, AppendRow);  
    } 
// Header 정보 저장/조회 시, 결과 메시지 출력 여부
var IBS_bMsgOut=true;
function IBS_getUserDataObject() {
	var userData=document.all.ibs_udataGrid;
	if(!userData) {	
		//userData = document.createElement("<span id='udataGrid' style='behavior:url(#default#userData);'>");
		userData=document.createElement("<span id='ibs_udataGrid' style='behavior:url(#default#download);'>");
		document.body.appendChild(userData);
	}
	return userData;
}
function sendIBHeaderRequest(mode, usr_id, scrn_id, sh_id, hdr_desc, callFunc) {
	var userIframe=document.all.ibs_udataIframe;
	var userFrm=document.all.ibs_udataFrm;
	var userInputMode=document.all.ibs_udataMode;
	var userInputUsrId=document.all.ibs_udataUsrId;
	var userInputScrnId=document.all.ibs_udataScrnId;
	var userInputShId=document.all.ibs_udataShId;
	var userInputHdrDesc=document.all.ibs_udataHdrDesc;
	var userInputMsgOut=document.all.ibs_udataMsgOut;
	
/*	var aIframe = document.createElement("iframe");

	aIframe.setAttribute("id","id값");
	aIframe.setAttribute("name","name값");

	aIframe.style.width = "200px";
	aIframe.style.height = "100px";
	aIframe.src = "블러올페이지";

	document.getElementByTagName("body")[0].appendChild(aIframe);
	
	// form
var form = document.createElement("form");     
form.setAttribute("method","post");                    
form.setAttribute("action","/etc/cs/view");        
document.body.appendChild(form);                        
 
//input
var input_id = document.createElement("input");  
input_id.setAttribute("type", "hidden");                 
input_id.setAttribute("name", "id");                        
input_id.setAttribute("value", id);                          
form.appendChild(input_id);
	
	*/
	
	if(!userIframe) {
		//userIframe=document.createElement("<iframe name='ibs_udataIframe' id='ibs_udataIframe' style='display:none'></iframe>");
		userIframe=document.createElement("iframe");
		userIframe.setAttribute("id","ibs_udataIframe");
		userIframe.setAttribute("name","ibs_udataIframe");
		userIframe.style.display = "none";
		
		userFrm=document.createElement("form");
		userFrm.setAttribute("method", "post");
		userFrm.setAttribute("id","ibs_udataFrm");
		
		userInputMode = document.createElement("input");		userInputMode.setAttribute("type", "hidden");		userInputMode.setAttribute("name", "ibs_udataMode");		userFrm.appendChild(userInputMode);		
		userInputUsrId = document.createElement("input");		userInputUsrId.setAttribute("type", "hidden");		userInputUsrId.setAttribute("name", "ibs_udataUsrId");		userFrm.appendChild(userInputUsrId);		
		userInputScrnId = document.createElement("input");		userInputScrnId.setAttribute("type", "hidden");		userInputScrnId.setAttribute("name", "ibs_udataScrnId");		userFrm.appendChild(userInputScrnId);		
		userInputShId = document.createElement("input");		userInputShId.setAttribute("type", "hidden");		userInputShId.setAttribute("name", "ibs_udataShId");		userFrm.appendChild(userInputShId);		
		userInputHdrDesc = document.createElement("input");		userInputHdrDesc.setAttribute("type", "hidden");		userInputHdrDesc.setAttribute("name", "ibs_udataHdrDesc");		userFrm.appendChild(userInputHdrDesc);
		userInputMsgOut = document.createElement("input");		userInputMsgOut.setAttribute("type", "hidden");		userInputMsgOut.setAttribute("name", "ibs_udataMsgOut");		userFrm.appendChild(userInputMsgOut);
		

		document.body.appendChild(userIframe);
		document.body.appendChild(userFrm);
	} 
	userInputMode.value=mode;
	userInputUsrId.value=usr_id;
	userInputScrnId.value=scrn_id;
	userInputShId.value=sh_id;
	userInputHdrDesc.value=hdr_desc;
	userInputMsgOut.value=IBS_bMsgOut;
	userFrm.target="ibs_udataIframe";
	
	var values = location.pathname.split("/");
    var contextRoot =  values[1];
    
	userFrm.action = "/"+contextRoot+"/syscommon/ibsheet/IBS_common.jsp?callBackFunc=" +callFunc ;
	userFrm.submit();
}
/*
 * function명 : IBS_SaveGridSetting()
 * 기능
 *  - Sheet 세팅 저장 (Cookie, DB)
 *    : Column 배열순서, Column 정렬 옵션(ASC/DESC), Column Size
 *    : Cookie => UserData => DB 방식으로 변경
 *    : Hidden IBSheet / IFrame 방식 / Ajax / behavior:url(#default#download) 중 택일
 *      (표준에 맞는가, 속도는 어떤 방식이 제일 빠른가) => behavior를 이용하는 것이 무난할 것으로 보임
 *    : Framework을 타게 할 것인가? (.do / .screen) => 속도면에서는 떨어짐
 */
//function IBS_SaveGridSetting(userId, pageId, sheetObj) {
//	
//	var userData = IBS_getUserDataObject();
//	
//	//var saveKey = userId + "||" + pageId + "||" + sheetObj.id;
//	
//	//var saveKey = "ud_" + userId + pageId + sheetObj.id;
//	var saveKey = "ud_" + pageId + sheetObj.id;
//	var colSeq = "";
//	var colSize = "";
//	var colOrder = "";
//	
//	// 1. Column 배열 순서
//	with(sheetObj) {
//		for(var i=0; i<=LastCol; i++) {
//			if(i == 0)
//				colSeq += ColSaveName(i);
//			else
//				colSeq += "|" + ColSaveName(i);
//		}
//	}
//	
//	// 2. Column Size
//	with(sheetObj) {
//		for(var i=0; i<=LastCol; i++) {
//			if(i == 0)
//				colSize += ColWidth(i);
//			else
//				colSize += "|" + ColWidth(i);
//		}
//	}
//	
//	userData.setAttribute(saveKey, colSeq + "||" + colSize);
//	userData.save('xmlGridSetting');
//	
//	//IBS_DelGridSetting(userId, pageId, sheetObj);
//	//IBS_SetCookie(saveKey, colSeq + "||" + colSize, expire);
//}
function IBS_SaveGridSetting(usr_id, scrn_id, sheetObj, bMsgOut) {
	try {
		if(bMsgOut != null && !bMsgOut) {
			IBS_bMsgOut=bMsgOut;
		} else {
			IBS_bMsgOut=true;
		}
		var sh_id=sheetObj.id;
		var hdr_desc="";
		//var userFrm = IBS_getUserDataObject();
		//var url = "/js/common/ibsheet/IBS_common.jsp";
		var colSeq="";
		var colSize="";
		var colOrder="";
		// 1. Column 배열 순서
		with(sheetObj) {
			for(var i=0; i<=LastCol(); i++) {
				if(i == 0)
					colSeq += ColSaveName(i);
				else
					colSeq += "|" + ColSaveName(i);
			}
		}
		// 2. Column Size
		with(sheetObj) {
			for(var i=0; i<=LastCol(); i++) {
				if(i == 0)
					colSize += GetColWidth(i);
				else
					colSize += "|" + GetColWidth(i);
			}
		}
		hdr_desc=colSeq + "||" + colSize
		//url = url + "?mode=SAVE&usr_id="+usr_id+"&scrn_id="+scrn_id+"&sh_id="+sh_id+"&hdr_desc="+encodeURIComponent(hdr_desc);
		sendIBHeaderRequest("SAVE", usr_id, scrn_id, sh_id, hdr_desc)		
		//userData.startDownload(url, IBS_onSaveResult);
	} catch(e) {
	}
}
function IBS_onSaveResult(sRtn) {
	if(trim(sRtn) == "SUCCESS") {
		if(IBS_bMsgOut)
			showErrMessage(getMsg("COM12185", "Save"));
	}
}
/*
 * function명 : IBS_RestoreGridSetting()
 * 기능
 *  - Cookie/DB에 저장된 IBSheet 세팅 적용
 *    : Column 배열순서, Column 정렬 옵션(ASC/DESC), Column Size
 *    : Cookie => UserData => DB 방식으로 변경
 */
function IBS_RestoreGridSetting(usr_id, scrn_id, sheetObj, bMsgOut, callFunc) {
	try {
		// 결과 Message 출력 여부 세팅
		if(bMsgOut != null && !bMsgOut) {
			IBS_bMsgOut=bMsgOut;
		} else {
			IBS_bMsgOut=true;
		}
		var sh_id=sheetObj.id;
		sendIBHeaderRequest("SEARCH", usr_id, scrn_id, sh_id,"",callFunc);
	} catch(e) {
	} 
}
function IBS_onSearchResult(sRtn) {
	try {
		var colSeq="";
		var colSize="";
		if(sRtn == null || sRtn == "") {
			//alert("You did not save column order.");
			return;
		}
		var arrVal=sRtn.split("::");
		if(arrVal.length != 2) {
			return;
		}
		var sh_id=arrVal[0];
		var saveVal=arrVal[1];
		var sheetObj=document.all[sh_id];
		arrVal=saveVal.split("||");
		if(arrVal.length != 2) {
			return;
		}
		colSeq=arrVal[0];
		colSize=arrVal[1];
		// 1. Column 배열 순서
		var arrValSeq=colSeq.split("|");
		if(sheetObj.LastCol()+ 1 != arrValSeq.length) {
			//alert("The saved data dismatch with sheet object");
			return;	
		}
		for(var i=0; i<arrValSeq.length; i++) {	
			sheetObj.MoveColumnPos(arrValSeq[i], i);
		}
		// 2. Column size
		arrValSize=colSize.split("|");
		if(sheetObj.LastCol()+ 1 != arrValSize.length) {
			//alert("The saved data dismatch with sheet object");
			return;	
		}	
		for(var i=0; i<arrValSize.length; i++) {	
			sheetObj.SetColWidth(i,arrValSize[i]);
		}
		if(IBS_bMsgOut)
			showErrMessage(getMsg("COM12185", "Reset"));
	} catch(e) {		
	}
}
/*
 * function명 : IBS_DelGridSetting()
 * 기능
 *  - Cookie/DB에 저장된 IBSheet 세팅 삭제
 *    : Column 배열순서, Column 정렬 옵션(ASC/DESC), Column Size
 */
function IBS_DelGridSetting(usr_id, scrn_id, sheetObj, bMsgOut) {
	try {
		// 결과 Message 출력 여부 세팅
		if(bMsgOut != null && !bMsgOut) {
			IBS_bMsgOut=bMsgOut;
		} else {
			IBS_bMsgOut=true;
		}
		var sh_id=sheetObj.id;
		sendIBHeaderRequest("DEL", usr_id, scrn_id, sh_id)
		//var userData = IBS_getUserDataObject();
		//var url = "/js/common/ibsheet/IBS_common.jsp";
		//url = url + "?ibs_udataMode=DEL&ibs_udataUsrId="+usr_id+"&ibs_udataScrnId="+scrn_id+"&ibs_udataShId="+sh_id
		//userData.startDownload(url, IBS_onDelResult);
	} catch(e) {
	}
}
function IBS_onDelResult(sRtn) {
	if(trim(sRtn) == "SUCCESS") {
		if(IBS_bMsgOut)
			showErrMessage(getMsg("COM12185", "Delete"));
	}
}
/*
 * function명 : getCookie()
 * 기능
 *  - Cookie 정보 가져오기 메소드
 */
function IBS_GetCookie(saveKey){
	var flag=document.cookie.indexOf(saveKey+'=');
	if(flag != -1){
		flag += saveKey.length + 1
		end=document.cookie.indexOf(';', flag)
		if (end == -1) end=document.cookie.length;
		return unescape(document.cookie.substring(flag, end))
	}else{
		return '';
	}
}
/*
 * function명 : getCookie()
 * 기능
 *  - Cookie 정보 가져오기 메소드
 */
function IBS_SetCookie(name, value, expire){
	document.cookie=name + "=" + escape("123") + ((expire) ? "; expires=" + expire.toGMTString() : "")+ "; path=/"
}
/**
  * 쿠키 삭제
  * @param cookieName 삭제할 쿠키명
  */
function IBS_DelCookie(saveKey) {
	var expireDate=new Date();
	//어제 날짜를 쿠키 소멸 날짜로 설정한다.
	expireDate.setDate( expireDate.getDate() - 1 );
	document.cookie=saveKey + "=" + "; expires=" + expireDate.toGMTString() + "; path=/";
}
Array.prototype.contains = function (element) {
	   for (var i = 0; i <this.length; i++) {
		   if (this[i] == element) {
			   return true;
		   }
	   }
	   return false;
	}
function makeHiddenSkipCol(sobj){
    var lc = sobj.LastCol();
    var colsArr = new Array();
    for(var i=0;i<=lc;i++){
    	if(1==sobj.GetColHidden(i) || sobj.GetCellProperty(0,i,"Type") == "DummyCheck" || sobj.GetCellProperty(0,i,"Type") == "Status" 
    		||  sobj.GetCellProperty(0,i,"Type") =="DelCheck"){
           colsArr.push(i);
    	}
    }
    var rtnStr = "";
    for(var i=0;i<=lc;i++){
           if(!colsArr.contains(i)){
        	   rtnStr += "|"+ i;
           }
    }
    return rtnStr.substring(1);
}

//0927 2011806 Customized Report 에서 Excel All 일 경우 No. 컬럼  제외
function makeHiddenSkipCol2(sobj){
    var lc = sobj.LastCol();
    var colsArr = new Array();

    var rtnStr = "";
    for(var j=1;j<lc;j++){
    		/*#6029 [Miragrown] Report request - Customized Report 신규 생성*/
    	   if(0==sobj.GetColHidden(j) && !colsArr.contains(j)){
        	   rtnStr += "|"+ j;
           }
    }
    return rtnStr.substring(1);
}