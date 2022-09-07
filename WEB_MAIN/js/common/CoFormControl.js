/*--==============================================================================
'주  시 스 템 : 
'서브  시스템 : 자바스크립트
'프로그램 ID  : CoFormControl.js
'프로그램 명  : 폼컨트롤관련 스크립트
'프로그램개요 : 폼컨트롤관련 스크립트
'작   성   자 : 
'작   성   일 : 
==================================================================================
'수정자/수정일 :
'수정사유/내역 :
==============================================================================--*/
/* for Firefox */
if( navigator.userAgent.indexOf('Firefox') >= 0 ) {
	var eventNames = ["mousedown", "mouseover", "mouseout", "keyup",
	                            "mousemove", "mousedrag", "click", "dblclick",
	                            "keydown", "keypress", "keyup", "change" ]; 

	for( var i = 0 ; i < eventNames.length; i++ ) {
		window.addEventListener( eventNames[i], function(e) {
			window.event = e;
		}, true );
	}
}

/** sourceIndex 
 * @target  FireFox, Safari, Chrome
 */
if(typeof document.documentElement.sourceIndex == "undefined")
    HTMLElement.prototype.__defineGetter__("sourceIndex", (function(indexOf){
        return function sourceIndex(){
            return indexOf.call(this.ownerDocument.getElementsByTagName("*"), this);
        };
    })(Array.prototype.indexOf));
;
	/** Application명 **/
	/*	
	var values = location.pathname.split("/");
    var contextRoot =  values[1];
	var APP_PATH = "/"+contextRoot; */
	
    /** Date 구분자 **/
    var DATE_SEPERATOR="-";
    /** 대표번호 구분자 **/
    var NO_SEPERATOR="-";
    /** FOMR CONTROL - INIT */
    var INIT=0;
    /** FOMR CONTROL - ADD */
    var ADD=1;
    /** FOMR CONTROL - SEARCH */
    var SEARCH=2;
    /** FOMR CONTROL - SEARCH LIST */
    var SEARCHLIST=3;
    /** FOMR CONTROL - MODIFY */
    var MODIFY=4;
    /** FOMR CONTROL - REMOVE */
    var REMOVE=5;
    /** FOMR CONTROL - REMOVE LIST */
    var REMOVELIST=6;
    /** FOMR CONTROL - MULTI */
    var MULTI=7;
    /** FOMR CONTROL - PRINT */
    var PRINT=8;
    /** FOMR CONTROL - REPLY */
    var REPLY=9;
    /** FOMR CONTROL - DEFAULT COMMAND 01 ~ 20 */
    var COMMAND01=11;
    var COMMAND02=12;
    var COMMAND03=13;
    var COMMAND04=14;
    var COMMAND05=15;
    var COMMAND06=16;
    var COMMAND07=17;
    var COMMAND08=18;
    var COMMAND09=19;
    var COMMAND10=20;
    var COMMAND11=21;
    var COMMAND12=22;
    var COMMAND13=23;
    var COMMAND14=24;
    var COMMAND15=25;
    var COMMAND16=26;
    var COMMAND17=27;
    var COMMAND18=28;
    var COMMAND19=29;
    var COMMAND20=30;
    var COMMAND21=31;
    var COMMAND22=32;
    var COMMAND23=33;
    var COMMAND24=34;
    var COMMAND25=35;
    var COMMAND26=36;
    var COMMAND27=37;
    var COMMAND28=38;
    var COMMAND29=39;
    var COMMAND30=40;
    var COMMAND31=41;
    var COMMAND32=42;
    var COMMAND33=43;
    var COMMAND34=44;
    var COMMAND35=45;
    var COMMAND36=46;
    var COMMAND37=47;
    var COMMAND38=48;
    var COMMAND39=49;
    var COMMAND40=50;
    /*================================
     * 설계자의 요청에 의한 상수 추가 
     * SEARCH01 ~ 20
     * MODIFY01~20
     * REMOVE01~20
     * MULTI01~20
     * 상수의 int 값으로는 101 ~ 180 까지 사용하기로 함
     =================================*/
    var SEARCH01=101;
    var SEARCH02=102;
    var SEARCH03=103;
    var SEARCH04=104;
    var SEARCH05=105;
    var SEARCH06=106;
    var SEARCH07=107;
    var SEARCH08=108;
    var SEARCH09=109;
    var SEARCH10=110;
    var SEARCH11=111;
    var SEARCH12=112;
    var SEARCH13=113;
    var SEARCH14=114;
    var SEARCH15=115;
    var SEARCH16=116;
    var SEARCH17=117;
    var SEARCH18=118;
    var SEARCH19=119;
    var SEARCH20=120;
    var SEARCHLIST01=121;
    var SEARCHLIST02=122;
    var SEARCHLIST03=123;
    var SEARCHLIST04=124;
    var SEARCHLIST05=125;
    var SEARCHLIST06=126;
    var SEARCHLIST07=127;
    var SEARCHLIST08=128;
    var SEARCHLIST09=129;
    var SEARCHLIST10=130;
    var SEARCHLIST11=131;
    var SEARCHLIST12=132;
    var SEARCHLIST13=133;
    var SEARCHLIST14=134;
    var SEARCHLIST15=135;
    var SEARCHLIST16=136;
    var SEARCHLIST17=137;
    var SEARCHLIST18=138;
    var SEARCHLIST19=139;
    var SEARCHLIST20=140;
    var MODIFY01=141;
    var MODIFY02=142;
    var MODIFY03=143;
    var MODIFY04=144;
    var MODIFY05=145;
    var MODIFY06=146;
    var MODIFY07=147;
    var MODIFY08=148;
    var MODIFY09=149;
    var MODIFY10=150;
    var MODIFY11=151;
    var MODIFY12=152;
    var MODIFY13=153;
    var MODIFY14=154;
    var MODIFY15=155;
    var MODIFY16=156;
    var MODIFY17=157;
    var MODIFY18=158;
    var MODIFY19=159;
    var MODIFY20=160;
    var REMOVE01=161;
    var REMOVE02=162;
    var REMOVE03=163;
    var REMOVE04=164;
    var REMOVE05=165;
    var REMOVE06=166;
    var REMOVE07=167;
    var REMOVE08=168;
    var REMOVE09=169;
    var REMOVE10=170;
    var REMOVE11=171;
    var REMOVE12=172;
    var REMOVE13=173;
    var REMOVE14=174;
    var REMOVE15=175;
    var REMOVE16=176;
    var REMOVE17=177;
    var REMOVE18=178;
    var REMOVE19=179;
    var REMOVE20=180;
    var MULTI01=181;
    var MULTI02=182;
    var MULTI03=183;
    var MULTI04=184;
    var MULTI05=185;
    var MULTI06=186;
    var MULTI07=187;
    var MULTI08=188;
    var MULTI09=189;
    var MULTI10=190;
    var MULTI11=191;
    var MULTI12=192;
    var MULTI13=193;
    var MULTI14=194;
    var MULTI15=195;
    var MULTI16=196;
    var MULTI17=197;
    var MULTI18=198;
    var MULTI19=199;
    var MULTI20=200;
    /** AJAX COMMON 전역변수 */
    var CODETYPE="";
/**
 * 스타일정의를 시스템별로 구분하기 위한 시스템코드 상수
 * 작성자 : 김성욱
 * 작성일 : 2006.06.16
 */
var SYSTEM_DEFAULT=0;  //기본 스타일을 위한 용도
var SYSTEM_FIS=2;    //OPUS Forwarding
    // 리턴팝업에서 사용하는 전역변수
    var rtnPopValue=new Array(20);
    /*=COMMON CONTROL ===========================================================
        1. 일반적으로 obj tag와 관계없이 사용되는 기능.
        2. Function List
            - openWindow(theURL, winName, features)
            : 새창 열기
            - alertConfirm(message)
            : 사용자의 의사결정을 포함하는 메세지박스 표시
            - alertFocus(element, message)
            : 메세지를 알리는 메세지박스 표시 후 Element에 지정된 obj tag 로 focus
            - showErrMessage(message)
            : 서버 프로그램에서 생긴 ERROR 를 보여주는 MESSAGEBOX alert
            - manyElementsSameFuction( ...)
            : 여러개의 object들을 같은 함수로 동시에 처리하고 싶을때 쓴다.
    ============================================================================*/
    /**
      * 새창열기
      *  window.open 에서 사용되는 방식으로 features 설정
      * @param theURL    새창의 Url
      * @param winName   새창의 name
      * @param features  새창의 세부 설정
      * @return
     */
    function openWindow(theURL,winName,features) {
        window.open(theURL,winName,features);
    }
    /**
      * 사용자의 의사결정을 포함하는 메세지박스 표시
      * @param message   메세지박스에 보여질 메세지
      * @return 1 : 확인,  0 : 취소
     */
    function alertConfirm(message) {
        if(confirm(message)==1) {
            return 1;
        } else {
            return 0;
        } // end if
    }
    /**
      * 메세지를 알리는 메세지박스 표시 후 Element에 지정된 obj tag 로 focus
      * @param obj   focus 를 가질 Object
      * @param message   메세지박스에 보여질 메세지
      * @return
     */
    function alertFocus(obj, message) {
       if ( message != '') alert( message );
       obj.focus();
       if (obj.type == 'text' && obj.value.length >=1 ) obj.select();
       return ;
    }
    /**
      * 서버 프로그램에서 생긴 ERROR 를 보여주는 MESSAGEBOX alert
      * @param message   메세지박스에 보여질 메세지
      * @return
     */
    function showErrMessage(message)
    {
        var iLen=message.length;
        var showMessage;
        if (iLen >= 1)
        {
            showMessage=replaceStr(message,"<||>","\n");
            alert(showMessage);
        } // end if
    }
    /**
     * 여러개의 input과 같은 object들을 같은 이벤트로 동시에 처리하고 싶을때 쓴다.
     * 가령 그 필드에 focus가 들어갈시 한글로 시작하게하는 onLoadHangul을 쓰고 싶을때면
     * 다음처럼 이벤트명과 오브젝트를 호출한다.
     *
     * manyElementsSameFuction( ... )
     *
     * 호출예 : manyElementsSameFuction("onLoadHangul",frm.CONT_NAME,frm.ISD_NAME);
     * @param strEventName 공통으로 적용되어야할 함수명 , EventArgument1 오브젝트 , ...
     * @return
     */
    function manyElementsSameFuction() {
        var obj_receiver,sEvent;
        obj_receiver=manyElementsSameFuction.arguments;
        for(i=1; i< obj_receiver.length; i++) {
            sEvent=obj_receiver[0];
            if (obj_receiver[i] != "") {
                sEvent += "(" +  "obj_receiver[" + i + "]" + ");";
                eval(sEvent) ;
            } // end if
        } // end for
    }
    /*=FORM CONTROL =============================================================
        1. 폼 관련 기본 기능을 처리.
        2. Function List
            - chkLen(Object, Int)
            : 입력 받은 폼태그(Object)의 문자열의 길이가 특정 길이(Int)와 같은지 여부 체크
            - chkLenMoveFocus(Object, Int, Object)
            : 입력 받은 폼태그(Object)의 문자열의 길이가 특정 길이(Int) 이면
              다른 객체(Object)로 포커스를 이동
            - setFocus(Object)
            : 입력 받은 객체로 포커스 이동
            - chkLenByByte(Object, int)
            : 입력 필드의 문자 크기를 한정시킬때.. (한글까지 고려하여 계산됨)
            - getLenByByte(String)
            : 입력 필드의 문자 크기를 얻는다.. (한글까지 고려하여 계산됨)
            - disableObject(Object)
            : 대상 Object를 disable 시킨다.
            - enableObject(Object)
            : 대상 Object를 enable 시킨다.
            - disableManyObjects( ... )
            : 입력되어진 변수의 수만큼 disableObject function 수행, 개수는 상관없음
            - enableManyObjects( ... )
            : 입력되어진 변수의 수만큼 enableObject function 수행, 개수는 상관없음
            - hideElement(Object)
            : 입력되어진 Object 들을 display="none" 시킨다.
            - showElement(Object)
            : 입력되어진 Object 들을 display="" 시킨다.
            - manyElementsHide( ... )
            : 입력되어진 Object 들을 모두  display="none" 시킨다, 개수는 상관없음
            - manyElementsShow( ... )
            : 입력되어진 Object 들을 모두  display="" 시킨다, 개수는 상관없음
            - clearObject(Object)
            : 대상 Object의 value값을 초기화 시킨다.
            - clearManyObjects( ... )
            : 입력되어진 변수의 수만큼 clearObject function 수행, 개수는 상관없음
            - setupEnterKeyNextFocus(FORM)
            : Enter Key를 눌렀을때 다음 엘리먼트로 넘어가는 tab과 같은 역할을 하기위한 사전작업
            - enterKeyNextFocus()
            : Enter Key를 눌렀을때 다음 엘리먼트로 넘어가는 tab과 같은 역할을 하는 함수
            - enterKeyMaxLengthNextFocus()
            : Enter Key를 눌렀을때 다음 엘리먼트로 넘어가는 tab과 같은 역할을 하는 함수, maxlength로 다음 오브젝트로 자동 전송
            - onLoadHangu(Object)
            : linput tag가 최초로 focus를 받았을때 한글 입력모드가 되게함
    ============================================================================*/
    /**
      * 입력 받은 폼태그(Object)의 문자열의 길이가 특정 길이(Int)와 같은지 여부 체크
      * @param obj   대상 폼태그(Object)
      * @param len   비교할 길이
      * @return  true : 길이가 같음, false : 길이가 다름
     */
    function chkLen(obj, len) {
        if (obj.value.length == len) return true;
        return false;
    }
    /**
      * 입력 받은 폼태그(Object)의 문자열의 길이가 특정 길이(Int) 이면
      * 다른 객체(Object)로 포커스를 이동
      * @param obj   대상 폼태그(Object)
      * @param len   비교할 길이
      * @param dest  포커스를 이동할 폼태그(Object)
      * @return
     */
    function chkLenMoveFocus(obj, len, dest) {
        if (obj.value.length == len)
        setFocus(dest);
    }
    /**
      * 입력 받은 객체로 포커스 이동
      * @param obj   포커스를 이동할 폼태그(Object)
      * @return
     */
    function setFocus(obj) {
        obj.focus();
    }
    /**
      * 입력 필드의 문자 크기를 한정시킬때.. (한글까지 고려하여 계산됨)
      * @param obj   대상 폼태그(Object)
      * @param len   비교할 길이
      * @return true : 길이가 작음, false : 길이가 큼
     */
    function chkLenByByte(obj, len)
    {
        var src=obj.value;
        var srcLen=getLenByByte(src);
        if (srcLen <= len) return true;
        var delLen=srcLen - len;
        obj.focus();
        return false;
    }
    /**
      * 입력 필드의 문자 크기를 얻는다.. (한글까지 고려하여 계산됨)
      * @param String   문자열
      * @return int 문자열의 길이
     */
    function getLenByByte(value)
    {
        var byteLength=0;
        for (var inx=0; inx < value.length; inx++) {
            var oneChar=escape(value.charAt(inx));
            if ( oneChar.length == 1 ) {
                byteLength ++;
            } else if (oneChar.indexOf("%u") != -1) {
                byteLength += 2;
            } else if (oneChar.indexOf("%") != -1) {
                byteLength += oneChar.length/3;
            }
        } // end for
        return byteLength;
    }
    /**
      * 대상 Object를 disable 시킨다.
      * @param  obj   대상 폼태그(Object)
      * @return
     */
    function disableObject(obj)
    {
        switch( obj.type ) {
            case "button" :
		    case "select-one" :
		    case "textarea" :
		    case "radio" :
		    case "option" :
		    case "checkbox" :
                 obj.disabled=true;
                 break;
            case "password" :
            case "text" :
                 obj.readOnly=true;
                 obj.style.backgroundColor="#E9F8F2";
                 obj.style.color="#555555";
                 break;
            default:
        } // end switch
    }
    /**
      * 대상 Object를 enable 시킨다.
      * @param obj   대상 폼태그(Object)
      * @return
     */
    function enableObject(obj)
    {
        switch( obj.type ) {
            case "button" :
		    case "select-one" :
		    case "textarea" :
		    case "radio" :
		    case "option" :
            case "checkbox" :
                 obj.disabled=false;
                 break;
            case "password" :
            case "text" :
                 obj.readOnly=false;
                 obj.style.backgroundColor="#ffffff";
                 obj.style.color="#000000";
                 break;
            default:
        } // end switch
    }
    /**
     * 입력되어진 변수의 수만큼 disableObject function 수행.
     * 입력되어진 Object 들을 모두 disable 시킨다.
     * 호출예 : disableManyObjects(haengwon_no, name, center_section_code);
     * @param obj   대상 폼태그(Object)
     * @param obj   대상 폼태그(Object)
     *  :
     */
    function disableManyObjects() {
        var obj_receiver;
        obj_receiver=disableManyObjects.arguments;
        for(i=0; i< obj_receiver.length; i++) {
            if (obj_receiver[i] != "") {
                disableObject(obj_receiver[i]);
            }
        } // end for
    }
    /**
     * 입력되어진 변수의 수만큼 enableObject function 수행.
     * 입력되어진 Object 들을 모두 enable 시킨다.
     * 호출예 : enableManyObjects(haengwon_no, name, center_section_code);
     * @param obj   대상 폼태그(Object)
     * @param obj   대상 폼태그(Object)
     *  :
     */
    function enableManyObjects() {
        var obj_receiver;
        obj_receiver=enableManyObjects.arguments;
        for(i=0; i< obj_receiver.length; i++) {
            if (obj_receiver[i] != "") {
                enableObject(obj_receiver[i]);
            }
        } // end for
    }
    /**
     * 입력되어진 Object 들을 display = "none" 시킨다.
     * 호출예 : hideElement(systemCode);
     * @param obj   대상 폼태그(Object)
     *  :
     */
    function hideElement(obj) {
       obj.style.display="none";
    }
    /**
     * 입력되어진 Object 들을 display = "" 시킨다.
     * 호출예 : showElement(systemCode);
     * @param obj   대상 폼태그(Object)
     *  :
     */
    function showElement(obj) {
       obj.style.display="";
    }
    /**
     * 입력되어진 변수의 수만큼 manyElementsHide function 수행.
     * 입력되어진 Object 들을 모두 display = "none" 시킨다.
     * 호출예 : manyElementsHide(haengwon_no, name, center_section_code);
     * @param obj   대상 폼태그(Object)
     * @param obj   대상 폼태그(Object)
     *  :
     */
    function manyElementsHide() {
    	var obj_receiver;
     	obj_receiver=manyElementsHide.arguments;
    	for(i=0; i< obj_receiver.length; i++) {
    		if (obj_receiver[i] != "") {
    			hideElement(obj_receiver[i]);
    		}
    	} // end for
    }
    /**
     * 입력되어진 변수의 수만큼 manyElementsShow function 수행.
     * 입력되어진 Object 들을 모두 display = "" 시킨다.
     * 호출예 : manyElementsHide(haengwon_no, name, center_section_code);
     * @param obj   대상 폼태그(Object)
     * @param obj   대상 폼태그(Object)
     *  :
     */
    function manyElementsShow() {
    	var obj_receiver;
     	obj_receiver=manyElementsShow.arguments;
    	for(i=0; i< obj_receiver.length; i++) {
    		if (obj_receiver[i] != "") {
    			showElement(obj_receiver[i]);
    		} // end if
    	} // end for
    }
    /**
      * 대상 Object의 value값을 초기화 시킨다.
      * @param obj   대상 폼태그(Object)
      * @return
     */
    function clearObject(obj)
    {
        switch( obj.type ) {
            case "select-one" :
                 obj.selectedIndex='0';
            case "radio" :
		    case "checkbox" :
                 obj.checked=false;
                 break;
            case "text" :
            case "password" :
                 obj.readOnly=false;
                 obj.value="";
                 break;
            default:
        } // end switch
    }
    /**
     * 입력되어진 변수의 수만큼 clearObject function 수행.
     * 입력되어진 Object 들을 모두 clear 시킨다.
     * 호출예 : clearManyObjects(haengwon_no, name, center_section_code);
     * @param obj   대상 폼태그(Object)
     * @param obj   대상 폼태그(Object)
     * @return
     */
    function clearManyObjects() {
        var obj_receiver;
        obj_receiver=clearManyObjects.arguments;
        for(i=0; i< obj_receiver.length; i++) {
            if (obj_receiver[i] != "") {
                clearObject(obj_receiver[i]);
            } // end if
        } // end for
    }
    /**
     * Enter Key를 눌렀을때 다음 엘리먼트로 넘어가는 tab과 같은 역할을 하기위한 사전작업
     * 호출예 : setupEnterKeyNextFocus(document.form);
     * @param FORM 해당 form 오브젝트
     * @return
     */
    function setupEnterKeyNextFocus(frm)
    {
        //alert("setNextFocus 시작");
        var i, x=1;
        for(i=0; i< frm.elements.length; i++) {
            if((frm.elements[i].type=="button")||(frm.elements[i].disabled)||(frm.elements[i].readOnly)) {
                frm.elements[i].tabIndex=-1;
            } // end if
            frm.elements[i].tabIndex=x++;
        } // end for
    }
    /**
     * Enter Key를 눌렀을때 다음 엘리먼트로 넘어가는 tab과 같은 역할을 하는 함수
     * 이를 실행시키기 위해서는 페이지를 초기화할때 setEnterNextFocus(frm);를 호출해야한다.
     * 사용예>
     *  <SCRIPT LANGUAGE="javascript" FOR="document" EVENT="onkeydown">
     *  <!--
     *      enterKeyNextFocus();
     *  //-->
     *  </SCRIPT>
     *  ....
     *  <body .... onload="setEnterNextFocus(frm);" >
     * @param
     * @return
     */
    function enterKeyNextFocus()
    {
        var keyCode=ComGetEvent("keycode") ? ComGetEvent("keycode") :
                      event.which ? event.which : event.charCode;
        // 엔터키(13)이면
        if (keyCode == 13) {
            ComGetEvent("keycode")=9;
        } // end if
    }
    /**
     * maxlength만큼 글자를 입력하면 다음 엘레멘트로 넘어가는 Tab과 같은 역할을 하는 함수
     *
     * 이를 실행시키기 위해서는 페이지를 초기화할때 setEnterNextFocus(frm);를 호출해야 하며
     * input tag 에 maxlength가 정의가 되어져 있어야 한다.
     * 사용예>
     *  <SCRIPT LANGUAGE="javascript" FOR="document" EVENT="onkeydown">
     *  <!--
     *      enterKeyMaxLengthNextFocus();
     *  //-->
     *  </SCRIPT>
     *  ....
     *  <body .... onload="setEnterNextFocus(frm);" >
     *  ....
     *  <input type="text" .... maxlength="4" .... >
     * @param
     * @return
     */
    function enterKeyMaxLengthNextFocus()
    {
        var keyCode=ComGetEvent("keycode") ? ComGetEvent("keycode") : event.which ? event.which : event.charCode;
        var srcMaxLength=window.event.srcElement.getAttribute("maxlength");
        var srcValue=window.event.srcElement.getAttribute("value");
        if(srcValue!=null){
            var srcValueLength=srcValue.length;
            //Keycode가 37(왼쪽커서키)나 39(오른쪽커서키), 8(backspace)이나 46(delete) 이 아니면
            //Tab Keycode로 바꾸어 다음 오브젝트로 포커스를 이동시켜야 한다.
            if(srcMaxLength==srcValueLength){
                if(!((keyCode==37)||(keyCode==39)||(keyCode==46)||(keyCode==8))){
                    ComGetEvent("keycode")=9;
                    return;
                } // end if
            } // end if
            // 엔터키(13)이면
            if (keyCode == 13) {
                ComGetEvent("keycode")=9;
            } // end if
        } // end if
    }
    /**
     * input tag가 최초로 focus를 받았을때 한글 입력모드가 되게함
     * 호출예 : onLoadHangul(Object);
     * @param Object
     * @return
     */
    function onLoadHangul(element) {
        element.style.imeMode="active";
    }
    /*=CHECKBOX/RADIO CONTROL ===========================================================
        1. CHECKBOX/RADIO 관련 기본 기능을 처리.
        2. Function List
- togleCheckAll(Object, Object)
            : checkbox들을 반복하여 선택하거나 해지한다.
            - setAllCheckboxCancel(Object)
            : checkbox를 모두 해지한다.
            - setAllCheckboxCheck(Object)
            : checkbox를 모두 선택 표시한다.
            - isChecked(Object)
            : 리스트에서 하나이상의 체크박스가 선택되었는지 확인한다.
            - isCheckedOnlyOne(Object)
            : 리스트에서 하나의 체크박스만 선택되었는지 확인한다.
            - getRadioValue(oRadio)
            : 선택된 하나의 Radio Object Value를 반환
    ============================================================================*/
    /**
      * 처음 obj가 선택되어진 경우 전체 checkObj를 선택하고
      * 해지되어진 경우 모두 해지한다.
      * @param obj   전체를 control하는 CHECKBOX 의 OBJECT
      * @param checkObj 해당 CHECKBOX
      * @return
     */
function togleCheckAll(obj, checkObj) {
        if (!obj.checked) {
            setAllCheckboxCancel(checkObj);
        } else {
            setAllCheckboxCheck(checkObj);
        } // end if
    }
    /**
      * CHECKBOX를 모두 해지한다.
      * @param obj   해당 CHECKBOX 의 OBJECT
      * @return
     */
    function setAllCheckboxCancel(obj){
        var count=obj.length;
        if(count > 1){
            for(var i=0;i<count;i++){
                obj[i].checked=false;
            } // end for
         }else {
            obj.checked=false;
         } // end if
         return;
    }
    /**
      * CHECKBOX를 모두 선택 표시한다.
      * @param obj   해당 CHECKBOX 의 OBJECT
      * @return
     */
    function setAllCheckboxCheck(obj){
        var count=obj.length;
        if(count > 1){
            for(var i=0;i<count;i++){
                obj[i].checked=true;
            } // end for
         } else {
            obj.checked=true;
         } // end if
         return;
    }
    /**
      * 리스트에서 하나이상의 체크박스가 선택되었는지 확인한다.
      * @param obj   해당 CHECKBOX 의 OBJECT
      * @return
     */
    function isChecked(obj){
        var count=obj.length;
        var iChecked=0;
        if(count > 1){
            for(var i=0;i<count;i++){
                if (obj[i].checked) iChecked++;
            } // end for
        } else {
            if (obj.checked) iChecked++;
        } // end if
        if (iChecked == 0) {
            return false;
        } // end if
        return true;
    }
    /**
      * 리스트에서 하나의 체크박스만 선택되었는지 확인
      * @param obj   해당 CHECKBOX 의 OBJECT
      * @return true : 하나만 선택시, false : 하나 이상 혹은 채크 된게 없을 시
     */
    function isCheckedOnlyOne(obj){
        var count=obj.length;
        if(count > 1){
            var iChecked=0;
            for(var i=0;i<count;i++){
                if (obj[i].checked) iChecked++;
            } // end for
            if (iChecked > 1) {
                return false;
            } else if (iChecked == 0) {
                return false;
            }// end if
         } // end if
         return true;
    }
    /*
     * 선택된 하나의 Radio Object Value를 반환
     * @param     oRadio : object Radio
     * @return    String
     */
    function getRadioValue(oRadio) {
        if (oRadio == null) return "";
        if (oRadio.length != null)
        {
            for(i=0; i<oRadio.length; i++)
            {
                if (oRadio[i].checked) return oRadio[i].value;
            } // end for
        } else  {
            if (oRadio.checked) return oRadio.value;
        } // end if
        return "";
    }
    /*=TEXT INPUT VALUE CONTROL ====================================
        1. 문자열 관련 기본 기능을 처리.
        2. Function List
            - isNull(Object)
            : 입력값이 NULL인지 체크
            - isNull2(String)
            : 입력값이 NULL인지 체크
            - isEmpty(Object)
            : 입력값이 공백인지 확인하여 리턴
            - isEmpty2(String)
            : 입력값이 공백인지 확인하여 리턴
            - removeSpaces(Value)
            : 입력값에 포함된 모든 스페이스 문자를 제거 후 리턴
            - replaceStr(str, find, replace)
            : 문자열에 포함된 모든 변환대상 패턴을 변경하여 리턴
            - containsChars(Object)
            : 입력값에 특정 문자(chars)가 있는지 체크. 특정 문자를 허용하지 않으려 할 때 사용
            - containsCharsOnly(Object)
            : 입력값이 특정 문자(chars)만으로 되어있는지 체크
            - isKorean(Object)
            : 입력값이 한글인지 체크
            - isAlphabet(Object)
            : 입력값이 알파벳인지 체크
            - isUpperCase(Object)
            : 입력값이 알파벳 대문자인지 체크
            - isLowerCase(Object)
            : 입력값이 알파벳 소문자인지 체크
            - isNumber(Object)
            : 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴
            - isNumber2(String)
            : 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴
            - isAlphaNum(Object)
            : 입력값이 알파벳,숫자로 되어있는지 체크
            - isNumDash(Object)
            : 입력값이 숫자,대시(-)로 되어있는지 체크
            - isNumDash2(String)
            : 입력값이 숫자,대시(-)로 되어있는지 체크
            - isNumComma(Object)
            : 입력값이 숫자,콤마(,)로 되어있는지 체크
            - isNumPeriod(Object)
            : 입력값이 숫자,날짜 구분자(.)로 되어있는지 체크
            - isNumSlash(Object)
            : 입력값이 숫자,슬래쉬(/)로 되어있는지 체크
            - isNumSlash2(String)
            : 입력값이 숫자,슬래쉬(/)로 되어있는지 체크
            - isMoney(Object)
            : 입력값이 숫자,소숫점(.),숫자구분자(,)로 되어있는지 체크
            - isEmailAddr(Object)
            : 입력값이 이메일을 구성할 수 있는 문자들로 구성되어 있는지 단순체크
            - isNumberMessage(Object)
            : 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴,오류가 있을 경우 메세지를 표시하고 focus 이동
    ============================================================================*/
    /**
     * 입력값이 NULL인지 체크
     * @param obj   Object
     * @return true : Null 또는 공백
     */
    function isNull(obj) {
        return isNull2(obj.value);
    }
    /**
     * 입력값이 NULL인지 체크
     * @param val   String
     * @return true : Null 또는 공백
     */
    function isNull2(val) {
        if (val == null || val == "") {
            return true;
        } // end if
        return false;
    }
    /**
     * 입력값에 스페이스 이외의 의미있는 값이 있는지 체크
     * @param obj   Object
     * @return true : 공백
     */
    function isEmpty(obj) {
        return isEmpty2(obj.value);
    }
    /**
     * 입력값에 스페이스 이외의 의미있는 값이 있는지 체크
     * @param val   String
     * @return true : 공백
     */
    function isEmpty2(val) {
        if (val == null || val.replace(/ /gi,"") == "") {
            return true;
        } // end if
        return false;
    }
    /**
     * 입력값에 포함된 모든 스페이스 문자를 제거 후 리턴
     * @param str   Value
     * @return ret  스페이스가 제거된 문자열
     */
    function removeSpaces(str) {
        var ret="";
        if (str.length == 0) return ret;
        for (var i=0; i<str.length; i++) {
            if (str.charAt(i) != " ") ret += str.charAt(i);
        } // end if
        return ret;
    }
    /**
     * 문자열에 포함된 모든 변환대상 패턴을 변경하여 리턴
     * @param str   문자열
     * @return ret  변경된 문자열
     */
    function replaceStr(str, find, replace)
    {
        var pos=0;
        pos=str.indexOf(find);
        while(pos != -1)
        {
            pre_str=str.substring(0, pos);
            post_str=str.substring(pos + find.length, str.length);
            str=pre_str + replace + post_str;
            pos=str.indexOf(find);
        } // end while
        return str;
    }
    /**
     * 입력값에 특정 문자(chars)가 포함되지 않았는지 체크
     * 특정 문자를 허용하지 않으려 할 때 사용
     * ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
     *         alert("이름 필드에는 특수 문자를 사용할 수 없습니다.");
     *     }
     * @param obj   Object
     * @return true 특정 문자가 없을 경우
     */
    function containsChars(obj,chars) {
        for (var inx=0; inx < obj.value.length; inx++) {
           if (chars.indexOf(obj.value.charAt(inx)) != -1) {
               return true;
           } // end if
        } // end for
        return false;
    }
    /**
     * 입력값이 특정 문자(chars)만으로 되어있는지 체크
     * 특정 문자만 허용하려 할 때 사용
     * ex) if (!containsCharsOnly(form.blood,"ABO")) {
     *         alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
     *     }
     * @param obj   Object
     * @return true 특정 문자가 있을 경우
     */
    function containsCharsOnly(obj,chars) {
        for (var inx=0; inx < obj.value.length; inx++) {
           if (chars.indexOf(obj.value.charAt(inx)) == -1) {
               return false;
           } // end if
        } // end for
        return true;
    }
    /**
     * 입력값이 특정 문자(chars)만으로 되어있는지 체크
     * 특정 문자만 허용하려 할 때 사용
     * ex) if (!containsCharsOnly2("ABOCCCC","ABO")) {
     *         alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
     *     }
     * @param val   String
     * @return true 특정 문자가 있을 경우
     */
    function containsCharsOnly2(val,chars) {
        for (var inx=0; inx < val.length; inx++) {
           if (chars.indexOf(val.charAt(inx)) == -1) {
               return false;
           } // end if
        } // end for
        return true;
    }
    /**
     * 입력값이 한글인지 체크
     * @param obj   Object
     * @return true 한글인 경우
     */
    function isKorean(obj)
    {
        if ((obj.value.length*2) == getLenByByte(obj.value)) return true;
        return false;
    }
    /**
     * 입력값이 알파벳인지 체크
     * @param obj   Object
     * @return true 알파벳일 경우
     */
    function isAlphabet(obj) {
        var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return containsCharsOnly(obj,chars);
    }
    /**
     * 입력값이 알파벳 대문자인지 체크
     * @param obj   Object
     * @return true 알파벳 대문자인 경우
     */
    function isUpperCase(obj) {
        var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        return containsCharsOnly(obj,chars);
    }
    /**
     * 입력값이 알파벳 소문자인지 체크
     * @param obj   Object
     * @return true 알파벳 소문자인 경우
     */
    function isLowerCase(obj) {
        var chars="abcdefghijklmnopqrstuvwxyz";
        return containsCharsOnly(obj,chars);
    }
    /**
      * 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴
      * @param obj   Object
      * @return true - 숫자만을 포함하고 있는 경우
     */
    function isNumber(obj) {
        var chars="0123456789";
        return containsCharsOnly(obj,chars);
    }
    /**
      * 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴
      * @param val   String
      * @return true - 숫자만을 포함하고 있는 경우
     */
    function isNumber2(val) {
        var chars="0123456789";
        return containsCharsOnly2(val,chars);
    }
    /**
     * 입력값이 알파벳,숫자로 되어있는지 체크
     * @param obj   Object
     * @return true 알파벳,숫자로 되어있는 경우
     */
    function isAlphaNum(obj) {
        var chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return containsCharsOnly(obj,chars);
    }
    /**
     * 입력값이 숫자,대시(-)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,대시(-)로 되어있는 경우
     */
    function isNumDash(obj) {
        var chars="-0123456789";
        return containsCharsOnly(obj,chars);
    }
    /**
     * 입력값이 숫자,대시(-)로 되어있는지 체크
     * @param val   String
     * @return true 숫자,대시(-)로 되어있는 경우
     */
    function isNumDash2(val) {
        var chars="-0123456789";
        return containsCharsOnly2(val,chars);
    }
    /**
     * 입력값이 숫자,콤마(,)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,콤마(,)로 되어있는 경우
     */
    function isNumComma(obj) {
        var chars=",0123456789";
        return containsCharsOnly(obj,chars);
    }
    /**
     * 입력값이 숫자,날짜 구분자(.)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,날짜 구분자(.)로 되어있는 경우
     */
    function isNumPeriod(obj) {
        var chars=".0123456789";
        return containsCharsOnly(obj,chars);
    }
    /**
     * 입력값이 숫자,슬래쉬(/)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,대시(/)로 되어있는 경우
     */
    function isNumSlash(obj) {
        var chars="/0123456789";
        return containsCharsOnly(obj,chars);
    }
    /**
     * 입력값이 숫자,슬래쉬(/)로 되어있는지 체크
     * @param val   String
     * @return true 숫자,대시(/)로 되어있는 경우
     */
    function isNumSlash2(val) {
        var chars="/0123456789";
        return containsCharsOnly2(val,chars);
    }
    /**
     * 입력값이 숫자,소숫점(.),숫자구분자(,)로 되어있는지 체크
     * @param obj   Object
     * @return true 숫자,날짜 구분자(.)로 되어있는 경우
     */
    function isMoney(obj) {
        var chars="-.,0123456789";
        return containsCharsOnly(obj,chars);
    }
    /**
     * 입력값이 이메일을 구성할 수 있는 문자들로 구성되어 있는지 체크
     * 단순한 이메일 입력포맷을 확인한다.
     * @param obj   Object
     * @return true 이메일 구성이 가능한 문자들로 구성되어 있을 경우
     */
    function isEmailAddr(obj) {
        var format=/((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
        return isValidFormat(obj, format);
    }
    /**
      * 입력된 문자열이 숫자 만을 포함하고 있는지 여부 리턴
      * 오류가 있을 경우 메세지를 표시하고 focus 이동
      * @param obj   Object
      * @return true - 숫자만을 포함하고 있는 경우
     */
    function isNumberMessage(obj) {
        if (!isNumber(obj)) {
            alertFocus(obj, '숫자만 입력하십시오');
            return false;
        }
        return true;
    }
    /*=NUMBER CONTROL ===========================================================
        1. 숫자 관련 기본 기능을 처리.
        2. Function List
            - addComma(Object)
            : 입력값을 콤마가 포함된 문자열로 변환하여 리턴
              12345 를 입력하면 12,345 로 변환하여 리턴
            - removeComma(String)
            : 입력값에서 콤마를 없앤다.
            - removeDash(String)
            : 입력값에서 구분자(-)를 없앤다.
            - removeSlash(String)
            : 입력값에서 슬래쉬(/)를 없앤다.
            - removePeriod(String)
            : 입력값에서 날짜 구분자(.) 를 없앤다.
            - parseInt2(str)
            : 문자열을 정수로 변환하여 리턴
            - removeSeparator(Object)
            : 문자열에서 / - , . ; : 등을 제거하고 value 에 값넣어줌
    ============================================================================*/
    /**
      * 입력값을 콤마가 포함된 문자열로 변환하여 리턴
      * @param obj   숫자
      * @return ret  콤마를 추가한 숫자
     */
    function addComma(obj) {
        var ret;
        if (!isMoney(obj)) {
        	obj.value='';
        	alert("You can input [Numeric values] only!");
        	return;
        } // end if
        var numstr=obj.value;
        numstr=removeComma(numstr);
        var rxSplit=new RegExp('([0-9])([0-9][0-9][0-9][,.])');
        var arrNumber=numstr.split('.');
        arrNumber[0] += '.';
        do {
            arrNumber[0]=arrNumber[0].replace(rxSplit, '$1,$2');
        }
        while (rxSplit.test(arrNumber[0]));
        if (arrNumber.length > 1) {
            ret=arrNumber.join('');
        } else {
            ret=arrNumber[0].split('.')[0];
        } // end if
        obj.value=ret;
    }
    /**
     * 입력값에서 콤마를 없앤다.
     * @param str   문자열
     * @return 변경된 문자열
     */
    function removeComma(str) {
        return str.replace(/,/gi,"");
    }
    /**
     * 입력값에서 구분자(-)를 없앤다.
     * @param str   문자열
     * @return 변경된 문자열
     */
    function removeDash(str) {
        return str.replace(/-/gi,"");
    }
    /**
     * 입력값에서 점 구분자(.)를 없앤다.
     * @param str   문자열
     * @return 변경된 문자열
     */
    function removePeriod(str) {
        return replaceStr(str, '.', '');
    }
    /**
     * 입력값에서 슬래쉬(/)를 없앤다.
     * @param str   문자열
     * @return 변경된 문자열
     */
    function removeSlash(str) {
        return replaceStr(str, '/', '');
    }
    /**
      * 문자열을 10진수로 변환하여 리턴
      * @param str   문자열
      * @return 정수
     */
    function parseInt2(str) {
        return parseInt(str, 10);
    }
    /**
     * 입력값에서 구분자(-)를 없앤다.
     * @param str   문자열
     * @return 변경된 문자열
     */
    function removeSeparator(obj) {
        var objvalue=obj.value;
        objvalue=objvalue.replace(/\/|\-|\.|\,|\;|\:/g,"");
        obj.value=objvalue;
    }
    /*=DATETIME CONTROL ===========================================================
        1. 일자와 시간 관련 기본 기능을 처리.
        2. Function List
            - isDate(Object)
            : 입력값을 일자 Format 인지 확인
            - isValidYYYYMM(Object)
            : 입력된 문자열이 일자 Format YYYYMM이 맞는지를 확인
            - isValidYYMMDD(Object)
            : 입력된 문자열이 일자 Format YYMMDD이 맞는지를 확인
            - isMonth(month)
            : 입력된 문자열이 일자의 월로 변환가능한지 확인
            - isDay(year, month, day)
            : 입력된 문자열이 일자의 일로 변환가능한지 확인
            - isDay2(day)
            : 입력된 문자열이 일자의 일로 변환가능한지 확인 (월에 관계없음)
            - getEndDay(year, month)
            : 해당 년, 월의 마지막 일자를 가져온다
            - addDateSeperator(Object)
            : 입력값에 일자 형식에 맞추어 DATE_SEPERATOR 를 추가한다.
            - getDaysBetween(fromObj, toObj)
            : 처음 Object와 두번째 Object 사이의 일자를 반환한다.이경우에 두번째 Object가 처음 Object 보다 나중 일자이다.
            - getDaysBetween2(String, String)
            : 처음 Object와 두번째 Object 사이의 일자를 반환한다.이경우에 두번째 Object가 처음 Object 보다 나중 일자이다.
            - getDaysToToday(Object)
            : 오늘까지 남은 일수를 반환한다. 오늘 이후의 일자에 대해서는 음수값을 반환한다.
            - isAfterToday(Object)
            : 입력된 일자가 오늘 이후의 일자인지 확인한다.
            - getAddDate(dateValue, day)
            : 첫번째인자의 날짜에 두번째일자수를 더한 날짜를 yyyyMMdd 형식으로 리턴한다.
    ============================================================================*/
    /**
      * 입력된 문자열이 일자 Format 확인 - (/, -, .) 제거되고 비교
      * @param str   문자열
      * @return true 일자 , false
     */
    function isDate(obj) {
        str=obj.value.replace(/\/|\-|\./g,"");
        if (!isNumSlash(obj) && !isNumPeriod(obj) && !isNumDash(obj)) {
            return false;
        }
        if (str.length != 8) {
            return false;
        }
        var year=str.substring(4,8);
        var month=str.substring(0,2);
        var day=str.substring(2,4);
        if ( parseInt2( year ) >= 1900  && isMonth( month ) && isDay( year,month ,day) )
            return true;
        else {
            return false;
        }
    }
    /**
      * 입력된 문자열이 일자 Format YYYYMM이 맞는지를 확인 - (/, -, .) 제거되고 비교
      * @param str   문자열
      * @return true 일자 , false
     */
    function isValidYYYYMM ( obj ) {
        str=obj.value.replace(/\/|\-|\./g,"");
        if (!isNumSlash(obj) && !isNumPeriod(obj) && !isNumDash(obj)) {
            return false;
        }
        if (str.length != 6) {
            return false;
        }
        var year=str.substring(0,4);
        var month=str.substring(4,6);
        if ( parseInt2( year ) >= 1900  && isMonth( month ))
            return true;
        else {
            return false;
        }
    }
    /**
      * 입력된 문자열이 6자리 일자 Format 확인 - (/, -, .) 제거되고 비교
      * @param str   문자열
      * @return true 일자 , false
     */
    function isValidYYMMDD ( obj )
    {
        str=obj.value.replace(/\/|\-|\./g,"");
        if (!isNumSlash(obj) && !isNumPeriod(obj) && !isNumDash(obj)) {
            return false;
        }
        if (str.length != 6) {
            return false;
        }
        var year=str.substring(0,2);
        var month=str.substring(2,4);
        var day=str.substring(4);
        if ( isMonth(month) && isDay2(day) )
            return true;
        else {
            return false;
        }
    }
    /**
      * 입력된 문자열이 일자의 월로 변환가능한지 확인
      * @param month   문자열
      * @return true : 가능할 경우
     */
    function isMonth(month) {
        if (month.length > 2) return false;
        month=parseInt(month,10);
        if ((month <= 0) || (month > 12)) return false;
        return true;
    }
    /**
      * 입력된 문자열이 일자의 일로 변환가능한지 확인
      * @param year   년
      * @param month  월
      * @param day    일
      * @return true : 가능할 경우
     */
    function isDay(year, month, day) {
        if (day.length > 2) return false;
        year=parseInt(year, 10);
        month=parseInt(month, 10);
        day=parseInt(day, 10);
        if ((day <= 0) || (day > getEndDay(year, month))) return false;
        return true;
    }
    /**
      * 입력된 문자열이 일자의 일로 변환가능한지 확인 (월에 관계없음)
      * @param day 문자열
      * @return true : 가능할 경우
     */
    function isDay2(day) {
        if (day.length > 2) return false;
        day=parseInt(day, 10);
        if ((day <= 0) || (day > 31)) return false;
        return true;
    }
    /**
      * 해당 년, 월의 마지막 일자를 가져온다
      * @param year   년
      * @param month  월
      * @return 마지막 일자
     */
    function getEndDay(year,month) {
        if (!isMonth(month)) return 0;
        if ((month==1)||(month==3)||(month==5)||(month==7)||(month==8)||(month==10)||(month==12)) {
            return 31;
        } else {
            if(month==2) {
                if ((year%4==0) && ((year/4)%200!=0))   return 29;
                else    return 28;
            } else {
                return 30;
            } // end if
        } // end if
    }
    /**
     * 입력값이 유효한 일자인지 확인하고
     * 일자 형식에 맞추어 DATE_SEPERATOR 를 추가한다.
     * @param obj   Object
     * @return 구분자가 추가된 일자 형식의 문자열
     */
    function addDateSeperator(obj) {
        if (isEmpty(obj)) return false;
        var numstr=obj.value.replace(/\/|\-|\./g,"");
        if (numstr.length < 6) {
            obj.value='';
            alertFocus(obj, "날짜는 YYYYMM이나 YYYYMMDD의 형식으로 입력해주십시오.");
            return false;
        } // end if
        if (numstr.length == 6){
            if (!isValidYYYYMM(obj)) return false;
            var rxSplit=new RegExp('([0-9][0-9][0-9][0-9])([0-9][0-9])');
            numstr=numstr.replace(rxSplit, '$1'+DATE_SEPERATOR+'$2');
        } else {
            if (!isDate(obj)) return false;
            var rxSplit=new RegExp('([0-9][0-9][0-9][0-9])([0-9][0-9])([0-9][0-9])');
            numstr=numstr.replace(rxSplit, '$1'+DATE_SEPERATOR+'$2'+DATE_SEPERATOR+'$3');
        } // end if
        obj.value=numstr;
        return true;
    }
    /**
     * 처음 Object와 두번째 Object 사이의 일자를 반환한다.
     * 이경우에 두번째 Object가 처음 Object 보다 나중 일자이다.
     * @param fromObj   Object
     * @param toObj     Object
     * @return int 두 Object 사이의 일자
     */
    function getDaysBetween(fromObj, toObj, format) {
    
        var numstr1=fromObj.value.replace(/\/|\-|\./g,"");
    	var numstr2=toObj.value.replace(/\/|\-|\./g,"");
    	var user_day1="";
    	var user_day2="";
    	if(format == "MM-dd-yyyy"){
    		user_day1=new Date(numstr1.substr(4), parseInt2(numstr1.substr(0,2))-1, parseInt2(numstr1.substr(2,2)));
            user_day2=new Date(numstr2.substr(4), parseInt2(numstr2.substr(0,2))-1, parseInt2(numstr2.substr(2,2)));
    	}else{    	
    		 user_day1=new Date(numstr1.substr(0,4), parseInt2(numstr1.substr(4,2))-1, parseInt2(numstr1.substr(6)));
             user_day2=new Date(numstr2.substr(0,4), parseInt2(numstr2.substr(4,2))-1, parseInt2(numstr2.substr(6)));
    	}
        user_day1=user_day1.getTime();
        user_day2=user_day2.getTime();
        var day_gab=Math.floor( (user_day2 - user_day1) / (60*60*24*1000) );
        return day_gab;
    }
    /**
     * 처음 String과 두번째 String 사이의 일자를 반환한다.
     * 처음 String와 두번째 String사이의 일자를 반환한다.이경우에 두번째 String가 처음 String보다 나중 일자이다.
     * @param fromObj   String
     * @param toObj     String
     * @return int 두 Object 사이의 일자
     */
    function getDaysBetween2(fromVal, toVal, dataFormat) {
        var numstr1=fromVal.replace(/\/|\-|\./g,"");
        var user_day1= null;
       
        if(dataFormat && dataFormat == 'ymd'){
        	user_day1=new Date(numstr1.substr(0,4), parseInt2(numstr1.substr(4,2))-1, parseInt2(numstr1.substr(6)));
        }else{//default MM-DD-yyyy
        	user_day1=new Date(numstr1.substr(4,4), parseInt2(numstr1.substr(0,2))-1, parseInt2(numstr1.substr(2,2)));
        }
        var numstr2=toVal.replace(/\/|\-|\./g,"");
        
        var user_day2=null;
        if(dataFormat && dataFormat == 'ymd'){
        	user_day2=new Date(numstr2.substr(0,4), parseInt2(numstr2.substr(4,2))-1, parseInt2(numstr2.substr(6)));
        }else{//default MM-DD-yyyy
        	user_day2=new Date(numstr2.substr(4,4), parseInt2(numstr2.substr(0,2))-1, parseInt2(numstr2.substr(2,2)));
        }
        
        user_day1=user_day1.getTime();
        user_day2=user_day2.getTime();
        var day_gab=Math.floor( (user_day2 - user_day1) / (60*60*24*1000) );
        return day_gab;
    }
    /**
     * 오늘까지 지난 일수를 반환한다. 오늘 이후의 일자에 대해서는 음수값을 반환한다.
     * @param obj   Object
     * @return int 자난 일수
     */
    function getDaysToToday(obj) {
        var numstr=obj.value.replace(/\/|\-|\./g,"");
        var user_day=new Date(numstr.substr(0,4), parseInt2(numstr.substr(4,2))-1, parseInt2(numstr.substr(6)));
        user_day=user_day.getTime();
        var today=new Date();
        today=today.getTime();
        var day_gab=Math.floor( (today - user_day) / (60*60*24*1000) );
        return day_gab;
    }
    /**
     * 입력된 일자가 오늘 이후의 일자인지 확인한다.
     * @param obj   Object
     * @return true : 오늘 이후의 일자일 경우, false
     */
    function isAfterToday(obj) {
        if (isEmpty(obj)) return false;
        if (!isDate(obj)) {
            return false;
        } // end if
        var day_gab=getDaysToToday(obj);
        if( day_gab > 0) {
            return false;
        } // end if
        return true;
    }
    /**
     * 첫번째인자의 날짜에 두번째일자수를 더한 날짜를
     * yyyyMMdd 형식으로 리턴한다.
     * @param dateValue yyyyMMdd 또는 yyyy-MM-dd 형식의 날짜포맷
     * @param daya 가감일수
     * @return 가감된 일자(yyyy-MM-dd)
     */
    function getAddDate(dateValue, day) {
        var numstr=dateValue.replace(/\/|\-|\./g,"");
        if ((day < 0 ) || (numstr.length != 8)) {
            return dateValue;
        }
    	//기준일
    	var basic=new Date(0);
        var user_day=new Date(numstr.substr(0,4), parseInt2(numstr.substr(4,2))-1, parseInt2(numstr.substr(6)));
        var rtn_day=new Date((1000*60*60*24*(day+((user_day-basic)/(1000*60*60*24)))));
        var year=rtn_day.getYear();
        var month=rtn_day.getMonth() + 1 ;
        var day=rtn_day.getDate();
        if (month < 10) {
            month="0" + month;
        }
        if (day < 10) {
            day="0" + day;
        }
        var rtn_date=year + "-" + month + "-" + day;
        return rtn_date;
    }
    /*=TEXT INPUT VALUE VALIDATION CHECK ==========================================
        1. TEXT 입력 값의 유효성을  확인한다.
        2. Function List
            - isValidJumin(obj)
            : 문자열이 올바른 주민등록번호인지 확인하여 리턴
            - isValidSaupja(obj)
            : 문자열이 올바른 사업자등록번호인지 확인하여 리턴
    ============================================================================*/
    /**
      * 문자열이 올바른 주민등록번호인지 확인하여 리턴
      * @param obj   Object
      * @return true : 바른 주민등록번호일 경우
     */
    function isValidJumin(oResNo) {
        if(isEmpty(oResNo)) return false;
        var sResNo=removeDash(oResNo.value);
        if(sResNo.length != 13) {
            return false;
        }
        var a=new Array(6)
        var b=new Array(7)
        var tot=0
        var c=0
        var sJumin0=sResNo.substring(0,6);
        if (!isMonth(sJumin0.substring(2,4)))
            return false;
        else if (!isDay2(sJumin0.substring(4,6)))
            return false;
        var sJumin1=sResNo.substring(6,13);
        for(var i=1;i<7;i++)
        {
            a[i]=sJumin0.substring(i-1,i);
            b[i]=sJumin1.substring(i-1,i);
            if(i<3)
                c=Number(b[i])*(i+7);
            else
                c=Number(b[i])*((i+9)%10);
            tot=tot + Number(a[i])*(i+1) + c;
        } // end for
        b[7]=sJumin1.substring(6,7);
        if(Number(b[7]) != ((11-(tot%11))%10)) {
            return false;
        } else {
            return true;
        }
    }
    /**
     * 문자열이 올바른 사업자등록번호인지 확인하여 리턴
     * @param obj   Object
     * @return true : 바른 사업자등록번호일 경우
     */
    function isValidSaupja(oCorpNo)
    {
        if (isEmpty(oCorpNo)) return false;
        var sCorpNo=removeDash(oCorpNo.value);
        if(sCorpNo.length != 10) {
            return false;
        } // end if
        var chkRule="137137135";
        var step1, step2, step3, step4, step5, step6, step7;
        step1=0;
        for (var i=0; i<7; i++)
        {
            step1=step1 + (sCorpNo.substring(i, i+1) * chkRule.substring(i, i+1));
        } // end for
        step2=step1 % 10;
        step3=(sCorpNo.substring(7, 8) * chkRule.substring(7, 8)) % 10;
        step4=sCorpNo.substring(8, 9) * chkRule.substring(8, 9);
        step5=Math.round(step4 / 10 - 0.5);
        step6=step4 - (step5 * 10);
        step7=(10 - ((step2 + step3 + step5 + step6) % 10)) % 10;
        if (sCorpNo.substring(9, 10) != step7) {
            return false;
        } else {
            return true;
        } // end if
    }
    /*=TEXT INPUT VALUE FORMAT CONTROL ============================================
        1. TEXT 입력 값의 기준 포맷을 따라 변경한다
        2. Function List
            - addSeperatorToJuminNo(Object)
            : 13자리의 주민등록번호를 입력받아 자동으로 '-'를 더하여 리턴(ex)123456-7890123
            - addSeperatorToSaupjaNo(Object)
            : 10자리의 사업자번호를 입력받아 자동으로 '-'를 더하여 리턴(ex)123-45-67890
            - addSeperatorToSilmyungNo(Object)
            : 10자리의 사업자번호, 13자리의 주민번호를 입력받아 자동으로 '-'를 더하여 리턴
    ============================================================================*/
    /**
      * 13자리의 주민등록번호를 입력받아 자동으로 '-'를 더하여 리턴
      * @param obj   Object
      * @return acct 주민등록번호
      */
    function addSeperatorToJuminNo(obj)
    {
        if (isEmpty(obj)) return;
        if (!isNumDash(obj)) {
            obj.value='';
            return false;
        } // end if
        if (!isValidJumin(obj)) {
            obj.value='';
            return false;
        } // end if
        var numstr=removeDash(obj.value);
        var rxSplit=new RegExp('([0-9][0-9][0-9][0-9][0-9][0-9])([0-9][0-9][0-9][0-9][0-9][0-9][0-9])');
        numstr=numstr.replace(rxSplit, '$1-$2');
        obj.value=numstr;
    }
    /**
     * 10자리의 사업자번호를 입력받아 자동으로 '-'를 더하여 리턴
     * @param obj   Object
     * @return acct 사업자번호
     */
    function addSeperatorToSaupjaNo(obj)
    {
        if (isEmpty(obj)) return;
        if (!isNumDash(obj)) {
            obj.value='';
            return false;
        } // end if
        if (!isValidSaupja(obj)) {
            obj.value='';
            return false;
        } // end if
        var numstr=removeDash(obj.value);
        var rxSplit=new RegExp('([0-9][0-9][0-9])([0-9][0-9])([0-9][0-9][0-9][0-9][0-9])');
        numstr=numstr.replace(rxSplit, '$1-$2-$3');
        obj.value=numstr;
    }
    /**
     * 10자리 혹은 13자리의 사업자번호,주민번호를 입력받아 자동으로 '-'를 더하여 리턴
     * @param obj   Object
     * @return acct 사업자번호, 주민번호
     */
    function addSeperatorToSilmyungNo(obj)
    {
        if (isEmpty(obj)) return;
        var numstr=removeDash(obj.value);
        if (numstr.length == 10) {
            addSeperatorToSaupjaNo(obj);
        } else if (numstr.length == 13){
            addSeperatorToJuminNo(obj);
        } else {
            return false;
        } // end if
    }
    //---------------------------------------------------------------------
    // 그외 추가적인 support function 
    //---------------------------------------------------------------------    
	/**
	* @param     : obj	=> 객체
	* sample	: <input type ="text" name ="date" onblur="convert_Date(this)" onfocus="delete_Char(this,'-')">
	* @return 	: 
	* 설명		: 날짜를 검사 하여 보여주기 
	**/
	function convert_Date(obj)
	{
		obj.value=delete_Char(obj.value,'-');
		switch(obj.value.length)
		{
			case 0 :
					return;
					break;
			case 6 :
					if (parseInt(obj.value.substring(0,2),10)  > 80 )
					{
						obj.value="19"+obj.value;
					}
					else
					{
						obj.value="20"+obj.value;
					}
					break;
			case 8 :
					break;
			default :
					obj.focus();
					return;
					break;
		}
		var realDate=chk_Date(obj.value);
		if (!realDate)
		{
			obj.focus();
			return;
		}
		str=obj.value;
		str=str.substring(0,4) + "-" + str.substring(4,6) + "-" + str.substring(6);
		obj.value=str;
	}
	/**
	* @param     : obj	=> 객체
	* sample	: <input type ="text" name ="date" onblur="convert_Yymm(this)" onfocus="delete_Char(this,'-')">
	* @return 	: 
	* 설명		: 년월(YYYY-MM)을 검사 하여 보여주기 
	**/
	function convert_Yymm(obj)
	{
		obj.value=delete_Char(obj.value,'-');
		switch(obj.value.length)
		{
			case 0 :
					return;
					break;
			case 4 :
					if (parseInt(obj.value.substring(0,2),10)  > 80 )
					{
						obj.value="19"+obj.value;
					}
					else
					{
						obj.value="20"+obj.value;
					}
					break;
			case 6 :
					break;
			default :
					obj.focus();
					return;
					break;
		}
		var realDate=chk_Date(obj.value + "01");
		if (!realDate)
		{
			obj.focus();
			return;
		}
		str=obj.value;
		str=str.substring(0,4) + "-" + str.substring(4,6);
		obj.value=str;
	}
	/**
	* @param     : obj	=> 객체
	* sample	: <input type ="text" name ="time0" onblur="convert_Time(this)" onfocus="delete_Char(this,':')">
	* @return 	: 
	* 설명		: 날짜를 검사 하여 보여주기 
	**/
	function convert_Time(obj)
	{
		obj.value=delete_Char(obj.value,':');
		str=obj.value ;
		switch(obj.value.length)
		{
			case 0 :
					return;
					break;
			case 4 :
					str=str +"01";
					break;
			case 6 :
					break;
			default :
					obj.focus();
					return;
					break;
		}
		var realDate=chk_Time(str);
		if (!realDate)
		{
			obj.focus();
			return;
		}
		if (obj.value.length == 4)
		{
			str=str.substring(0,2) + ":" + str.substring(2,4);
		}
		else if (obj.value.length == 6)
		{
			str=str.substring(0,2) + ":" + str.substring(2,4) + ":" + str.substring(4);
		}
		obj.value=str;
	}
	/**
	* @param     : str	=> 날짜 
	* sample	: chk_Date("2003-01-01");
	* @return 	: true/false
	* 설명		: 날짜가 유효한지 검사
	**/
	function chk_Date(str)
	{
		str=delete_Char(str,'-');
		str=trim(str);
		if (!chk_Number(str)) return (false);
		if (str.length != 8)       return (false);
		if (!chk_Year(str))     return (false);
		if (!chk_Month(str))    return (false);
		if (!chk_Day(str))      return (false);
		return (true);
	}
	/**
	* @param     : str	=> 시간 
	* sample	: chk_Time("12:12:12");chk_Time("12:12");
	* @return 	: true/false
	* 설명		: 시간이 유효한지 검사
	**/
	function chk_Time(str)
	{
		str=delete_Char(str,':');
		str=trim(str);
		if (!chk_Number(str)) return (false);
		if (str.length != 6)    return (false);
		hh=str.substring(0,2);
		mm=str.substring(2,4);
		ss=str.substring(4);
		if (!chk_Between(hh,"00","23")) return (false);
		if (!chk_Between(mm,"00","59")) return (false);
		if (!chk_Between(ss,"00","59")) return (false);
		return (true);
	}
	/**
	* @param     : str	=> 날짜 
	* sample	: chk_Year("2003-01-01");
	* @return 	: true/false
	* 설명		: 년도가 유효한지 검사
	**/
	function chk_Year(str)
	{
		var year;
		var to;
		today=new Date();
		to=today.getYear() + 100;
		to    += "";
		if (to.length == 2) to=(parseInt(to, 10) + 1900) + "";
		str=trim(str);
		year=get_Year(str);
		return (chk_Between(year, "1901", to));
	}
	/**
	* @param     : str	=> 날짜 
	* sample	: chk_Month("2003-01-01");
	* @return 	: true/false
	* 설명		: 월이 유효한지 검사
	**/
	function chk_Month(str)
	{
	  var month;
	  str=trim(str);
	  month=get_Month(str);
	  return (chk_Between(month, "01", "12"));
	}
	/**
	* @param     : str	=> 날짜 
	* sample	: chk_Day("2003-01-01");
	* @return 	: true/false
	* 설명		: 날이 유효한지 검사
	**/
	function chk_Day(str)
	{
	  var day;
	  str=trim(str);
	  last_day=get_LastDay(str);
	  day=get_Day(str);
	  return (chk_Between(day, "01", last_day));
	}
	/**
	* @param     : str	=> String
	* sample	: chk_Number("12126761");
	* @return 	: true/false
	* 설명		: 숫자만으로 구성되어 있는지 검사
	**/
	function chk_Number(str)
	{
	  RefString="-1234567890";
	  DecimalPoints=0;
	  for (var i=0; i<str.length; i++)
	  {
		  TempChar=str.substring(i, i+1);
		  if (RefString.indexOf(TempChar,0) == -1) { return false; }
	  }
	  return true;
	}
	/**
	* @param     : str	=> String
	* sample	: chk_AlphaNumber("121267asvx61");
	* @return 	: true/false
	* 설명		: 숫자와 영문으로만  구성되어 있는지 검사
	**/
	function chk_AlphaNumber(str)
	{
		var success=true;
		var valid="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		str=str.toUpperCase();
		if (chk_Blank(str)) return (false);
		str=trim(str);
		for (var i=0; i < str.length; i++)
		{
			var number=(valid.indexOf(str.substring(i, i+1)) != -1);
			if (!(number))
			{
				success=false;
				break;
			}
		}
		return (success);
	}
	/**
	* @param     : str	=> String
	* sample	: chk_Blank("");
	* @return 	: true/false
	* 설명		: 공백인지 검사
	**/
	function chk_Blank(str)
	{
	  var rV=false;
	  if ((str == "") || (str == null) || (str == "null")) rV=true;
	  return rV;
	}
	/**
	* @param     : str	=> String
	* sample	: rtrim("121323    ");
	* @return 	: String
	* 설명		: str의 오른쪽 Blank를 소거한다.
	**/
	function rtrim(str)
	{
	  var index;
	  var ch=" ";
	  if (chk_Blank(str)) return (str);
	  for (index=str.length - 1; index >= 0; index--)
	    if (str.charAt(index) != ch) break;
	  return (str.substring(0, index + 1));
	}
	/**
	* @param     : str	=> String
	* sample	: rtrim("   121323");
	* @return 	: String
	* 설명		: str의 왼쪽 Blank를 소거한다.
	**/
	function ltrim(str)
	{
	  var index;
	  var len;
	  var ch=" ";
	  if (chk_Blank(str)) return (str);
	  len=str.length;
	  for (index=0; index < str.length; index++, len--)
	    if (str.charAt(index) != ch) break;
	  return (str.substring(index, index + len));
	}
	/**
	* @param     : str	=> String
	* sample	: trim("   121323   ");
	* @return 	: String
	* 설명		: str의 양쪽 Blank를 소거한다.
	**/
	function trim(str)
	{
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
	/**
	* @param     : str	=> 날짜
	* sample	: get_Year("2003-01-01"); get_Year("20030101");
	* @return 	: 년도
	* 설명		: str에서 연도를 구함
	**/
	function get_Year(str)
	{
		str=delete_Char(str,'-');
		str=trim(str);
		return (str.substr(0, 4));
	}
	/**
	* @param     : str	=> 날짜
	* sample	: get_Month("2003-01-01"); get_Month("20030101");
	* @return 	: 월
	* 설명		: str에서 월을 구함
	**/
	function get_Month(str)
	{
		str=delete_Char(str,'-');
		str=trim(str);
		return (str.substr(4, 2));
	}
	/**
	* @param     : str	=> 날짜
	* sample	: get_Day(("2003-01-01"); get_Day(("20030101");
	* @return 	: 날짜
	* 설명		: str에서 날짜를 구함
	**/
	function get_Day(str)
	{
		str=delete_Char(str,'-');
		str=trim(str);
		return (str.substr(6, 2));
	}
	/**
	* @param     : str	=> String 
	*		: from  => 시작
	*		: to   => 끝
	* sample	: chk_Between("1999","1900","2003");
	* @return 	: true/false
	* 설명		: 2문자 사이에 속하는 값인지 검사
	**/
	function chk_Between(str, from, to)
	{
	  if ((str < from) || (str > to)) return (false);
	  return (true);
	}
	/**
	* @param     : str	=> 날짜
	* sample	: get_LastDay(("2003-01-01"); get_LastDay(("20030101");
	* @return 	: 일자
	* 설명		: 달의 마지막 일자를 구함
	**/
	function get_LastDay(str)
	{
	  var maxday=new Array("31", "28", "31", "30", "31", "30",
	                         "31", "31", "30", "31", "30", "31");
	  var month=get_Month(str);
	  var day=maxday[parseInt(month, 10) - 1];
	  if (chk_LeapYear(str))
	    if (month == "02") day="29";
	  return (day);
	}
	/**
	* @param     : str	=> 날짜
	* sample	: chk_LeapYear(("2003-01-01"); chk_LeapYear(("20030101");
	* @return 	: true/false
	* 설명		: 윤년인지 아닌지 check
	**/
	function chk_LeapYear(str)
	{
	  var year;
	  str=trim(str);
	  year=parseInt(get_Year(str), 10);
	  if ( (year%4   == 0) &&
	      ((year%100 != 0) || (year%400 == 0)) ) return (true);
	  return (false);
	}
	/**
	* @param : 
	* sample	: get_NowDate('-');get_NowDate('/');
	* @return 	: 현재 날짜
	* 설명		: 현재 날짜 가지고 오기
	**/
	function get_NowDate()
	{
		var delimiter="";
		if (arguments[0] == null)
		{
			delimiter="-" ;
		}
		else
		{
			delimiter=arguments[0] ;
		}
		year1=get_NowYear();
		month2=get_NowMonth();
		day2=get_NowDay();
		return year1+delimiter+fullZero(month2,2)+delimiter+fullZero(day2,2);
	}
	/**
	* @param : 
	* sample	: get_NowYymm('-');get_Yymm('/');
	* @return 	: 현재 년월(YYYY-MM)
	* 설명		: 현재 년월 가지고 오기
	**/
	function get_NowYymm()
	{
		var delimiter="";
		if (arguments[0] == null)
		{
			delimiter="-" ;
		}
		else
		{
			delimiter=arguments[0] ;
		}
		year1=get_NowYear();
		month2=get_NowMonth();
		return year1+delimiter+fullZero(month2,2);
	}
	/**
	* @param : 
	* sample	: get_NowYear();
	* @return 	: 현재 년도
	* 설명		: 현재 년도 가지고 오기
	**/
	function get_NowYear()
	{
		today=new Date()
		return 	""+today.getFullYear();
	}
	/**
	* @param : 
	* sample	: get_NowMonth();
	* @return 	: 현재 월
	* 설명		: 현재 월 가지고 오기
	**/
	function get_NowMonth()
	{
		today=new Date()
		month1=today.getMonth()+1;
		return 	month1.toString();
	}
	/**
	* @param : 
	* sample	: get_NowDay();
	* @return 	: 현재 일자
	* 설명		: 현재 일자 가지고 오기
	**/
	function get_NowDay()
	{
		today=new Date()
		day1=today.getDate();
		return 	day1.toString();
	}
	/**
	* @param : 
	* sample	: get_NowTime(':');get_NowTime("-");
	* @return 	: 현재 시간
	* 설명		: 현재 시간 가지고 오기
	**/
	function get_NowTime()
	{
		var delimiter="";
		if (arguments[0] == null)
		{
			delimiter=":" ;
		}
		else
		{
			delimiter=arguments[0] ;
		}
		today=new Date()
		H=today.getHours().toString();
		M=today.getMinutes().toString();
		S=today.getSeconds().toString();
		return fullZero(H,2)+delimiter+fullZero(M,2)+delimiter+fullZero(S,2);
	}
	/**
	* @param     : str => String
	*		: icount => 전체 문자 갯수
	* sample	: fullZero("123",5);
	* @return 	: String
	* 설명		: 전체 문자 만큼 앞에 0을 채워준다
	**/
	function fullZero(str,icount)
	{
		var slength=(""+str).length;
		var s="";
		for (i=0 ; i < icount - slength ; i++)
		{
			s=s + "0";
		}
		return s + str;
	}
	/**
	* @param     : str => String
	* sample	: chk_Hangle("가나다라마바사");
	* @return 	: true/false
	* 설명		: 한글인지 아닌지 를 검사
	**/
	function chk_Hangle(str)
	{
	  var rV=false;
	  if (chk_Blank(str)) return (rV);
	  str=trim(str);
	  for (var i=0; i < str.length; i++)
	  {
	    if (str.charCodeAt(i) >= 123)
	    {
	      rV=true;
	      break;
	    }
	  }  
	  return (rV);
	}
	/**
	* @param     : str => String
	* sample	: get_ByteLength("가나다라마바사");
	* @return 	: byte 길이
	* 설명		: 한글을 2byte 로 해서 나온 byte 길이
	**/
	function get_ByteLength(str)
	{
	  var byteLength=0;
	  for (inx=0; inx < str.length; inx++)
	  {
	    var oneChar=escape(str.charAt(inx));
		if      (oneChar.length == 1)           { byteLength ++; }
	    else if (oneChar.indexOf("%u") != -1)   { byteLength += 2; }
	    else if (oneChar.indexOf("%") != -1)    { byteLength += oneChar.length/3; }
	  }
	  return byteLength;
	}
	/**
	* @param     : obj => 객체
	* sample	: <input type ="text" name ="money" onblur="convert_Money(this);" onfocus="delete_Char(this,',')" >
	* @return 	: 
	* 설명		: 숫자인지를 검사 하여 금액으로 보여주기 
	**/
	function convert_Money(obj)
	{
		var flag=false;
		if(obj.value.substring(0,1) == "-")
		{
			minus="-";
			obj.value=delete_Char(obj.value,'-');
			flag=true;
		}
		if (!chk_Number(obj.value))
		{
			obj.focus();
			return;
		}
		str=obj.value;
		s_str=display_Money(str);
		if(flag == true)
		{
			obj.value=minus +s_str;
		}
		else
		{
			obj.value=s_str ;
		}
		flag=false;
	}
	/**
	* @param     : str => String 
	* sample	: <input type ="text" name ="money" onblur="display_Money(this.value);" onfocus="delete_Char(this,',')"
	* @return 	:
	* 설명		: 금액 3자리 마다 콤마(,)를 찍어주는 함수 ex) 1000 => 1,000
	**/
	function display_Money(str)
	{
		var minus="";
		if(str.charAt(0) == "-")
		{
		   minus=str.charAt(0); 
		   str=delete_Char(str,'-');
		}
		var div=str.length % 3;
		var s_str="";
		if (div == 0 ) {
			count=(str.length/3)-1;
		}else{
			count=(str.length-div) /3;
		}
		for (i=1;i<=count;i++){
			s_str=str.substr(str.length-3,3)+s_str;
			str=str.substr(0,str.length-3);
			if (str.length>0){
			s_str=","+s_str;
			}
		}
		s_str=str + s_str;
		return minus+s_str;
	}
	/**
	* @param     : obj => 객체(img)
	*		: state => image상태
	* sample	: <img src="1tab910000.gif" name="img" border="0" class="button" >
	*		: <input type="button" onclick= "set_ButtonImageVisiable(img,!(img.disabled))" value="">
	* @return 	: 
	* 설명		: 이미지를 활성화/비활성화 시킨다
	**/
  function set_ButtonImageVisiable(obj,state)
  {
    var objSrc=obj.src;
    var objSrc1=objSrc.substr(0,objSrc.lastIndexOf("."));
    var objSrc2=objSrc.substring(objSrc.lastIndexOf("."),objSrc.length);
    var injStr="_off";
    if (state)  //활성화시킨다
    {
      if(objSrc1.lastIndexOf(injStr)>-1){
        obj.src=objSrc1.substr(0,objSrc1.lastIndexOf(injStr))+objSrc2;
      }else{
        obj.src=objSrc1+objSrc2;
      }
    }
    else  //비활성화시킨다
    {
      obj.src=objSrc1+injStr+objSrc2;
    }
    obj.disabled=!state;
  }
	/**
	* @param     : obj => 객체
	*		: state => 객체상태
	* sample	: <input type ="text" name ="han"   >
	*		: <input type="button" onclick= "set_ImeModeHangle(han,true)" value="한글">
	*		: <input type="button" onclick= "set_ImeModeHangle(han,false)" value="영문">
	* @return 	: 
	* 설명		: 한글,숫자만 입력가능/영문,숫자만 입력가능
	**/
	function set_ImeModeHangle(obj,state)
	{
		if (state)
		{	//한글+숫자
			obj.style.imeMode="active" ;
		}
		else
		{	//영문+숫자
			obj.style.imeMode="disabled" ;
		}
	}
	/**
	* @param     : obj => 다음 focus가 가야할 객체
	*		        : maxlength => 지금객체의 maxlength
	* sample	    : <input type ="text" name ="auto_tab0" onkeyup="nextFocus(this,auto_tab1, 2)" maxlength="2">
	* @return 	    : 
	* 설명		    : maxlength가 됐을 다음 포커스 로 자동 이동하게 함
	**/
	function nextFocus(myobj, obj, maxlength)
	{ 
		if (maxlength =="" || maxlength == null || maxlength =="undefined") 
		{
	       	var keyCode=ComGetEvent("keycode");
			var filter=[0,8,9,16,17,18,,33,34,35,36,37,38,39,40,46];
			if (chk_Defined(obj)) 
			{
				obj.focus();
				if (obj.type == "text"     || 
					obj.type == "password" || 
					obj.type == "textarea")
				{
					obj.select();
				}
			}
	    }
	    else
	    {
		var keyCode=ComGetEvent("keycode");
		var filter=[0,8,9,16,17,18,,33,34,35,36,37,38,39,40,46];
		if (myobj.value.length >= maxlength && 
			!containsElement(filter, keyCode)) 
		{
			if (chk_Defined(obj)) 
			{
				obj.focus();
				if (obj.type == "text"     || 
					obj.type == "password" || 
					obj.type == "textarea")
				{
					obj.select();
				}
			}
		}
	}
		/*[] ------------------------------------------------------------------ []*/
		/*| Usage           : 직접적인사용은 하지마시요.                         |*/
		/*[] ------------------------------------------------------------------ []*/
		function containsElement(arr, ele) 
		{
			var found=false;
			var index=0;
			while (!found && index < arr.length)
			{
				if (arr[index] == ele)
				found=true;
				else
				index++;
			}   
			return (found);
		}
	}
	/**
	* @param     : arg => 인자값
	* sample	: chk_Defined(arguments[0]);
	* @return 	: true/false
	* 설명		: 인자값이 있나 없나 검사
	**/
	function chk_Defined(arg)
	{
	  return (arg != null);
	}
	/**
	* @param     : str=> 만으로 나이 계산
	* sample	: calc_Age("1974-01-01");
	* @return 	: 만나이
	* 설명		: 만으로 나이계산
	**/
	function calc_Age(str)
	{
		str=delete_Char(str,'-');		
	    if(str.length != 8)
	    {
	       	return;
	    }
	    var mm=str.substring(4,6);
	    var day=eval(str.substring(6,8));
	    var year=eval(str.substring(0,4));
		yy2=get_NowYear();
		mm2=eval(get_NowMonth());
		dd2=eval(get_NowDay());
		yourage=yy2 - year; 
		if (mm2 < mm) yourage--; 
		if ((mm2 == mm) && (dd2 < day)) yourage--; 
		return yourage;
	}
	/**
	* @param     : str=> 기준일자
	*		: thedate => N일수 
	*		: flag => true/false (+/-)일수
	* sample	: calc_Date("1974-01-01","5",true); calc_Date("1974-01-01","5",false);
	* @return 	: +일수 /-일수 
	* 설명		: 기준일자의 이후/이전 날짜
	**/
	function calc_Date(str,thedate,flag) 
	{	
		arg=delete_Char(str,'-');
		if(arg.length != 8) 
		{
			return 
		}
		var mm=arg.substring(4,6);
	    var day=arg.substring(6,8);
	    var year=arg.substring(0,4);
		plann=eval(thedate);         //+ 몇일
		var dayStr=mm+"-"+day+"-"+year;
		var Meet=new Date(dayStr);
		if(flag == true)
		{
			//annitime = Meet.getTime()+plann*1000*3600*24-1	
			annitime=Meet.getTime()+plann*1000*3600*24;
		}
		else 
		{
			//annitime = Meet.getTime()-plann*1000*3600*24-1
			annitime=Meet.getTime()-plann*1000*3600*24;
		}
		var anniday=new Date();
		anniday.setTime(annitime);
		var plusmonth=anniday.getMonth()+1;
		var plusyear=(anniday.getYear()<100)?"19"+anniday.getYear():anniday.getYear();
		var plusday=anniday.getDate();
		return plusyear+"-"+FullZero(plusmonth,2)+"-"+FullZero(plusday,2) ;
	}
	/**
	* @param     : fromtime=> 시작일자
	*		: totime => 끝일자
	* sample	: get_IntervalDay("1974-01-01", "2003-01-01");
	* @return 	: 날짜 차이
	* 설명		: 시작일자와 끝일자 사이의 날짜 차이
	**/
	function get_IntervalDay(fromtime, totime)
	{
		fromtime=delete_Char(fromtime,'-');
		totime=delete_Char(totime,'-');
		if ( fromtime.length != 8 || totime.length != 8 )
		{
			return false;
		}
		var year=fromtime.substring(0,4);
		var month=fromtime.substring(4,6);
		var day=fromtime.substring(6,8);
		var year2=totime.substring(0,4);
		var month2=totime.substring(4,6);
		var day2=totime.substring(6,8);
		if(isNaN(year) || isNaN(month) || isNaN(day))
			return false;
		if(isNaN(year2) || isNaN(month2) || isNaN(day2))
			return false;
		if((year <= 0) || (year2 <= 0))
			return false;
		if((month <= 0  || month > 12) || (month2 <= 0  || month2 > 12))
			return false;
		var from_time=new Date(year,month-1,day);
		var to_time=new Date(year2,month2-1,day2);
		var fmillsec=from_time.getTime();
		var tmillsec=to_time.getTime();
		var resultday=(tmillsec - fmillsec)/(1000*60*60*24);
		return resultday;
	}
	/**
	* @param     : msg1=> 메시지
	* sample	: CONFIRM("정말 삭제 하시겠습니까?");
	* @return 	: true/false
	* 설명		: confirm 함수에 앞뒤에 말 붙인거
	**/
	function CONFIRM(msg1)
	{
		msg1="확인하십시오!!\n" +
		       "────────────────────────────────     \n\n" +
		       "" + msg1 + "\n" +
		       "\n────────────────────────────────     \n" +
		       "아래의 [취소]버튼을 누르시면 이 작업은 취소됩니다.";
		return confirm(msg1);
	}
	/**
	* @param     : obj => window
	* sample	: <input type ="text" name ="number" style="ime-mode:disabled"  onkeydown="onlyNumber(window)"  >
	* @return 	: 
	* 설명		: 리얼타임으로 숫자만 입력할때
	**/
	function onlyNumber(obj)
	{
		key=obj.ComGetEvent("keycode");
		//alert('key  '+key);
		if ( key == 13  || key == 9 )
		{   // 엔터,TAB
			return true;
		}
		if(obj.event.shiftKey == true){ 
			obj.event.returnValue=false;
			return true;
	    } 
		if (key == 91 || key == 92 || key == 93 || key == 229 || key == 21 || key == 25 || key == 19 ) return true;
		if (key >= 112 && key <= 123) {       // function key
			obj.event.returnValue=true;
			return true;
		}
		if ((key == 40) || (key == 38 )) {    // 위, 아래 화살표
			obj.event.returnValue=true;
			return true;
		}
		if (( key > 95) && ( key < 106 )) {   // 우측 키패드 숫자 key
			obj.event.returnValue=true;
			return true;
		}
		if (( key > 47) && ( key < 58 )) {    // 키보드 상단 숫자 key
			obj.event.returnValue=true;
			return true;
		}
		if (( key == 37)||( key == 39 )||( key == 46)||( key == 8 ) ) {  // 좌,우 화살표,DEL,BACKS,-
			obj.event.returnValue=true;
			return true;
		}
		if (obj.event.altKey || obj.event.shiftKey || obj.event.ctrlKey) 
		{ 
			obj.event.returnValue=true;
			return true;
		}
		if (( key > 36) && ( key < 41 )) 
		{    // 좌,상,우,하 화살표
			obj.event.returnValue=true;
			return true;
		}
		if (( key > 32) && ( key < 37 )) 
		{    // Page-Up, Page-Down, End, Home
			obj.event.returnValue=true;
			return true;
		}
		if (( key == 45) || ( key == 46 ) || ( key == 144 )) 
		{    // Insert,Delete,NumLock
			obj.event.returnValue=true;
			return true;
		}
		if (( key == 46)||( key == 8 )||( key == 17)||( key == 18 )||( key == 20)||( key == 27 )) 
		{  // DEL,BACKS,Ctrl,Alt,CapsLock,Esc
			obj.event.returnValue=true;
			return true;
		}
		obj.event.returnValue=false;
		//alert('숫자만 입력 가능합니다.');
		return false;
	}
	/**
	* @param     : obj => window
	* sample	: <input type ="text" name ="number" style="ime-mode:disabled"  onkeydown="onlyNumber(window)"  >
	* @return 	: 
	* 설명		: 리얼타임으로 숫자와 '-'만 입력할때
	**/
	function onlyNumberMinus(obj)
	{
		key=ComGetEvent("keycode");
		//alert('key  '+key);
		if ( key == 13  || key == 9 )
		{   // 엔터,TAB
			return true;
		}
		if(window.event.shiftKey == true){ 
			window.event.returnValue=false;
			return true;
	    } 
		if (key == 91 || key == 92 || key == 93 || key == 229 || key == 21 || key == 25 || key == 19 ) return true;
		if (key >= 112 && key <= 123) {       // function key
			window.event.returnValue=true;
			return true;
		}
		if ((key == 40) || (key == 38 )) {    // 위, 아래 화살표
			window.event.returnValue=true;
			return true;
		}
		if (( key > 95) && ( key < 106 )) {   // 우측 키패드 숫자 key
			window.event.returnValue=true;
			return true;
		}
		if (( key > 47) && ( key < 58 )) {    // 키보드 상단 숫자 key
			window.event.returnValue=true;
			return true;
		}
		if( key == 189)   // - 처리 
		{   
			var str=obj.value;
			//alert(str.charAt(0));
			if(str.charAt(0) == "-" )
			{    window.event.returnValue=false;return false;}
			else
			{	 window.event.returnValue=true;return true;   }
	    }
		if (( key == 37)||( key == 39 )||( key == 46)||( key == 8 )  ) {  // 좌,우 화살표,DEL,BACKS,-
			window.event.returnValue=true;
			return true;
		}
		if (window.event.altKey || window.event.shiftKey || window.event.ctrlKey) 
		{ 
			window.event.returnValue=true;
			return true;
		}
		if (( key > 36) && ( key < 41 )) 
		{    // 좌,상,우,하 화살표
			window.event.returnValue=true;
			return true;
		}
		if (( key > 32) && ( key < 37 )) 
		{    // Page-Up, Page-Down, End, Home
			window.event.returnValue=true;
			return true;
		}
		if (( key == 45) || ( key == 46 ) || ( key == 144 )) 
		{    // Insert,Delete,NumLock
			window.event.returnValue=true;
			return true;
		}
		if (( key == 46)||( key == 8 )||( key == 17)||( key == 18 )||( key == 20)||( key == 27 )) 
		{  // DEL,BACKS,Ctrl,Alt,CapsLock,Esc
			window.event.returnValue=true;
			return true;
		}
		window.event.returnValue=false;
		//alert('숫자만 입력 가능합니다.');
		return false;	
	}
	/**
	* @param     : obj => window
	* sample	: <input type ="text" name ="number" style="ime-mode:disabled"  onkeydown="onlyNumberComma2(window)"  >
	* @return 	: 
	* 설명		: 리얼타임으로 숫자와 '.'만 입력할때 2009.04.13 kwang hoon Lee
	**/
function onlyNumberComma2(obj)
	{
		key=ComGetEvent("keycode");
		//alert('key  '+key);
		if ( key == 13  || key == 9 )
		{   // 엔터,TAB
			return true;
		}
		if(window.event.shiftKey == true){ 
			window.event.returnValue=false;
			return true;
	    } 
		if (key == 91 || key == 92 || key == 93 || key == 229 || key == 21 || key == 25 || key == 19 ) return true;
		if (key >= 112 && key <= 123) {       // function key
			window.event.returnValue=true;
			return true;
		}
		if ((key == 40) || (key == 38 )) {    // 위, 아래 화살표
			window.event.returnValue=true;
			return true;
		}
		if (( key > 95) && ( key < 106 )) {   // 우측 키패드 숫자 key
			window.event.returnValue=true;
			return true;
		}
		if (( key > 47) && ( key < 58 )) {    // 키보드 상단 숫자 key
			window.event.returnValue=true;
			return true;
		}
		if( key == 189)   // - 처리 
		{   
			var str=obj.value;
			//alert(str.charAt(0));
			if(str.charAt(0) == "-" )
			{    window.event.returnValue=false;return false;}
			else
			{	 window.event.returnValue=true;return true;   }
	    }
	    if( ( key == 110) || ( key == 190)  )  // . 처리 
		{   
			var str=obj.value;
			//alert(str.charAt(0));
			if(str.charAt(0) == "." )
			{    window.event.returnValue=false;return false;}
			else
			{	 window.event.returnValue=true;return true;   }
	    }
		if (( key == 37)||( key == 39 )||( key == 46)||( key == 8 )  ) {  // 좌,우 화살표,DEL,BACKS,-
			window.event.returnValue=true;
			return true;
		}
		if (window.event.altKey || window.event.shiftKey || window.event.ctrlKey) 
		{ 
			window.event.returnValue=true;
			return true;
		}
		if (( key > 36) && ( key < 41 )) 
		{    // 좌,상,우,하 화살표
			window.event.returnValue=true;
			return true;
		}
		if (( key > 32) && ( key < 37 )) 
		{    // Page-Up, Page-Down, End, Home
			window.event.returnValue=true;
			return true;
		}
		if (( key == 45) || ( key == 46 ) || ( key == 144 )) 
		{    // Insert,Delete,NumLock
			window.event.returnValue=true;
			return true;
		}
		if (( key == 46)||( key == 8 )||( key == 17)||( key == 18 )||( key == 20)||( key == 27 )) 
		{  // DEL,BACKS,Ctrl,Alt,CapsLock,Esc
			window.event.returnValue=true;
			return true;
		}
		window.event.returnValue=false;
		//alert('숫자만 입력 가능합니다.');
		return false;	
	}
	/**
	* @param     : obj => obj
	* sample	: <input type ="text" name ="number" style="ime-mode:disabled"  onkeyup="numberCommaLen(obj, firstLen, secondLen)"  >
	* @return 	: 
	* 설명		: 리얼타임으로 숫자와 '.'만 입력할때 
	*  firstLen = 정수자리길이, secondLen 소수 자리 길이  
	**/
	function numberCommaLen(obj, firstLen, secondLen){
		key=ComGetEvent("keycode");
		if(key==9){
			window.event.returnValue=false;
		}else if(((key>=65)&&(key<=90))||key==32){
			window.event.returnValue=false;
		}else if((key==37)||(key==39)||(key==46)||(key==8)) {  // 좌,우 화살표,DEL,BACKS,-
			window.event.returnValue=false;
		}else{
			var intoVal=obj.value;
			intoVal=rmMoneyFmt(intoVal);
			var zeroIdx=intoVal.indexOf('00');
			if(zeroIdx==0){
				obj.value=0;
			}else{
				var bgnNum='';
				var curLen=intoVal.indexOf('.');
				if(secondLen==0&&curLen>0){
					intoVal=intoVal.substring(0, curLen);
					//alert('소수점 '+secondLen+'까지 입력하실 수 있습니다!');
				}else{
					if(curLen>0){
						bgnNum=intoVal.substring(0, curLen);
						if(bgnNum.length>firstLen){
							intoVal=intoVal.substring(0, firstLen);
							//alert(firstLen+'까지 입력하실 수 있습니다!');
						}	
						curLen++;
						if(curLen<intoVal.length){
							var unZero=intoVal.substring(curLen);
							if(unZero.length>secondLen){
								intoVal=intoVal.substring(0, curLen+secondLen);
								//alert('소수점 '+secondLen+'까지 입력하실 수 있습니다!');
							}
						}
					}else{
						if(intoVal.length>firstLen){
							intoVal=intoVal.substring(0, firstLen);
							//alert(firstLen+'까지 입력하실 수 있습니다!');
						}
					}
				}				
				//#1300 [License Plate Unit Type] The error message arisen incase saving special character
				if(isNaN(intoVal)){
					intoVal = '0';
				}
				obj.value=doMoneyFmt(intoVal);
			}
		}
	}
	/**
	 * 소수점 이하 값을 체크함
	 */
	function chkComma(obj, firstLen, secondLen){
		var intoVal=obj.value;
		if(intoVal.substring(0,1) == '.'){
			intoVal='0' + intoVal;
		}
		if(intoVal==''){
			return;
		}else{
			intoVal=rmMoneyFmt(intoVal);
			var bgnNum='';
			var totLen=intoVal.length;
			var curLen=intoVal.indexOf('.');
			var lftLen=0;
			if(curLen==-1){
				lftLen=secondLen;
				intoVal=intoVal+'.';
			}else{
				lftLen=(totLen-curLen)-1;
				lftLen=secondLen-lftLen;
			}
			for(var i=0; i < lftLen; i++){
				intoVal=intoVal+'0';
			}
			obj.value=doMoneyFmt(intoVal);
		}
	}
	/**
	* @param     : obj => obj
	* sample	: <input type ="text" name ="number" style="ime-mode:disabled"  onkeyup="numberCommaLen(this)"  >
	* @return 	: 
	* 설명		: 리얼타임으로 숫자와 '.'만 입력할때 소수점 4자리까지 나머지 버림. 2009.04.13 kwang hoon Lee
	**/
	function numberCommaLen4(obj){
		var rtnVal;
		var intoVal=obj.value;
	    var comma_point=intoVal.indexOf(".");
	    var cgo_comma_pre=intoVal.substring(0, comma_point); 
	    var cgo_comma_next=intoVal.substring(comma_point, intoVal.length); 
	    if(cgo_comma_next.length > 5){
	    	obj.value=cgo_comma_pre+cgo_comma_next.substring(0, 5);	    
	    }else{
	    	obj.value=intoVal;
	    }
	}
	/**
	* @param     : obj => 객체
	*		: state => 객체상태
	* sample	: <input name="readonly1" type="text" />
	*		: <input type="button" onclick="javascript:set_TextReadonly(readonly1,!(readonly1.readOnly))" value=""/>
	* @return 	: 
	* 설명		: 객체를 readonly만들고  배경색 바꿈
	**/
	function set_TextReadonly(obj,state)
	{
		if (state)
		{
			obj.style.background='#EEEEEE';
		}
		else
		{
			obj.style.background='#FFFFFF';
		}
		obj.readOnly=state ;
	}
	/**
	* @param     : obj => 객체
	* sample	: <input name="up" type="text" onblur="upper(this)"  />
	* @return 	: 
	* 설명		: 대문자로 만들기
	**/
	function upper(obj)
	{
		str=obj.value;
		str=str.toUpperCase();
		obj.value=str;
	}
	/**
	* @param    : str => string
	*	@param    : type => 날짜타입 
	*	@param    : msg => 오류발생할 때 출력할 메세지
	* sample	  : format_Date2(20030101,'YYYY-MM-DD',getMsg('COM12179'))  => 2003-01-01
	* @return 	: 
	* 설명		: 날짜포맷
	**/
	function format_Date2(str,type, msg){
	  if (msg==null)
	    msg=getMsg("COM12179");
	  var formatDate=format_Date(str,type);
	  if (formatDate.length==0){
	    showErrMessage(msg);
	  }
	  return formatDate;
	}
	/**
	* @param    : str => string
	*	@param    : type => 날짜타입 
	* sample	  : format_Date(20030101,'YYYY-MM-DD')  => 2003-01-01
	* @return 	: 
	* 설명		: 날짜포맷
	**/
	function format_Date(str,type){
	  if(type == null)
	    type="YYYY-MM-DD";
		delimeter=DATE_SEPERATOR;
		str=delete_Char(str,delimeter);
		if(!isNumber2(str))
		 return "";
		switch(type)
		{
			case "YYYY-MM-DD" :
					if ( str.length == 8 )
					{
					  try{
					    onAfterFormatDate();
					  }catch(e){}
						return str.substring(0,4) + delimeter + str.substring(4,6)+ delimeter + str.substring(6);
					}
					else if ( str.length == 6 )
					{
						if ( str.substring(0,2) > 80 )
						{
							str="19" + str ;
						}
						else
						{
							str="20" + str ;
						}
					  try{
					    onAfterFormatDate();
					  }catch(e){}
						return str.substring(0,4) + delimeter + str.substring(4,6)+ delimeter + str.substring(6);
					}
					else
					{
						return "";
					}
					break;
			case "YY-MM-DD" :
					if ( str.length == 6 )
					{
					  try{
					    onAfterFormatDate();
					  }catch(e){}
						return str.substring(0,2) + delimeter + str.substring(2,4)+ delimeter + str.substring(4);
					}
					else if ( str.length == 8 )
					{
					  try{
					    onAfterFormatDate();
					  }catch(e){}
						return str.substring(2,4) + delimeter + str.substring(4,6)+ delimeter + str.substring(6);
					}
					else
					{
						return "";
					}
					break;
			default	:
				return "";
		}
	}
	/**
	* @param     : str => string
	*		: type => 시간타입 
	* sample	: format_Date(121314,'hh:nn:ss')  => 12:13:14
	* @return 	: 
	* 설명		: 시간포맷
	**/
	function format_Time(str,type)
	{
		str=delete_Char(str,':');
		delimeter=":";
		switch(type)
		{
			case "hh:nn:ss" :
						if (str.length != 6)
							return "";
						return str.substring(0,2) + delimeter + str.substring(2,4)+ delimeter + str.substring(4);
					break;
			case "hh:nn" :
						if (!(str.length == 4||str.length == 6))
							return "";
						return str.substring(0,2) + delimeter + str.substring(2,4);
					break;
			default	:
		}
	}
	/**
	* @param     : str => string
	*		: type => 숫자타입 
	* sample	: format(121314,'#,###.00')  => 1,213.14
	* @return 	: 
	* 설명		: 숫자 포맷 
	**/
	function format(str,type)
	{
		str=delete_Char(str,',');
		switch(type)
		{
			case "#,###" :
					return display_Money(str);
					break;
			case "#,###.0" :
					p=str.split(".");
					p[0]=display_Money(p[0]);
					if (p.length == 1 )
					{
						return p[0]+"."+"0";
					}
					else if (p.length ==2 )
					{
						return p[0]+"."+p[1];
					}
					else
					{
						return "";
					}
			case "#,###.00" :
			        p=str.split(".");
					p[0]=display_Money(p[0]);
					if (p.length == 1 )
					{
						return p[0]+"."+"00";
					}
					else if (p.length ==2 )
					{
						return p[0]+"."+p[1];
					}
					else
					{
						return "";
					}
					break;
		}
	}
	/**
	* @param     : source => string 또는 obj 둘다 지원
	*		: char => 없애고 싶은 단어나 문장
	* sample	: delete_Char(this,',')   => this.value 가 3,3,3, 일때 이함수를 이용하면 333으로 나옴
	* @return 	: 
	* 설명		: 문자를 없앨때 쓰는 함수 
	**/
	function delete_Char(source,char1)
	{
		if (typeof(source) == "string")
		{
			return replaceStr(source,char1,'');
		}
		else if (typeof(source) == "object")
		{
			source.value=replaceStr(source.value,char1,'');
		}
		else 
		{
			alert("지원하지 않는 형태입니다.");
		}
	}
	/**
	* @param     : element
	*               : flag       f => field (text,textarea)     
	*                            t => <td>등의 테이블데이터성일때 사용  
	* sample	    : 
	* @return 	    : 
	* 설명		    : 풍선 도움말로 안보이는 부분의 내용을 보여줌.
	**/
	function showTip(element, flag)
	{
	  if(flag == 't')
	  {
	      element.title=element.innerText;
	  }  
	  else
	  {
	  	element.title=element.value;
	  }
	}
	/**
	* @param     : obj  => object
	*                : css  => 바꿔주고자 하는 css의 Class명 
	*               : css2 => 클릭시 선택된 row를 보여줄때 사용
	* sample	    : CSS 를 적용시킬 Object, Css의 Class명, 선택된 row Css의 Class명
	*                  (ex) changeCss(this, 'css','css2');
	* @return 	    : 
	* 설명		    : onMouseOver or Out Event를 발생시킬때 자동으로 Css를 바꾼다.
	*                  css2, 추가사항-> 해당 row를 클릭하여 현재 선택된 row를 보여주고 싶을때 사용한다.
	**/
	function changeCss(obj, css, css2)
	{
	  if (!((css2 =='') || (css2 == null)))
	  {
	  	changeCss_clear(obj,css);
	    obj.className=css2;
	  }
	  else
	  {
	  	if (obj.className != 'tr3')
	      obj.className=css;
	  }
	}
	/***************
	* 해당 table내의 모든 row를 해당 class로 바꾼다.
	***************/
	function changeCss_clear(obj,chClass)
	{
	  var pobj=document.all ? obj.parentElement : obj.parentNode;
	  //var pobj = obj.parentNode;
	  for(var i=0;i<pobj.rows.length;i++)
	  {
	  	pobj.childNodes[i].className=chClass;
	  }
	}
	/**
	* @param     : obj  => object
	* sample	    : clear_Combo(test38)
	* @return 	    : 
	* 설명		    : 콤보안에 값을 모두 없앤다. 초기화 
	**/
	function clear_Combo(obj)
	{
	    if (obj == null) 
	    {
	        return;
	    }
	    else
	    {
		    for (var index=obj.length-1; index >= 0; index--) 
		    {
		        obj.options[index]=null;
		    }
	    }
	}
	/**
	* @param     : obj  => object
	* sample	    : add_Combo(test39,"가나다라","10")
	* @return 	    : 
	* 설명		    : 콤보안에 값을 더한다. 
	**/
	function add_Combo(obj, text, value)
	{
	    if (obj == null) 
	    {
	        return;
	    }
	    else
	    {
		    var len=obj.length;
	        if (len == 0) 
	        {
	            option1=new Option(text, value, true);
	        }
	        else
	        {
	            option1=new Option(text, value);
	        }
	        obj.options[len]=option1;
	   }
	}
	/**
	* @param     : obj  => object
	*                 str  => 선택할 콤보값의 text
	* sample	    : select_Combo_value(obj, str)
	* @return 	    : 
	* 설명		    : combobox에 str값의 아이템을 선택한다.
	**/
	function sel_Combo(obj, str)
	{
	    var otype;  //OBJECT TYPE명을 가지는 변수 
	    if (obj == null)  return ;
	    if (chk_Blank(str)) return ;
	    otype=(obj.type).substring(0,6);
	    if (otype != "select") return ;
	    for (var index=0; index < obj.length; index++) 
	    {
	        if (obj.options[index].value != '')
	        {
	            if (trim(obj.options[index].value) == trim(str)) 
	            {
	                obj.options[index].selected=true;
	            }
	        }
	        else
	        {
	            if (trim(obj.options[index].text) == trim(str)) 
	            {
	                obj.options[index].selected=true;
	            }
	        }
	    }
	}
	/**
	* @param     : obj  => object
	*                 text_only  => 가져올 콤보값의 text
	* sample	    : f_get_combo_value(obj, text_only)
	* @return 	    : string
	* 설명		    : combobox에 str값의 선택된값을 구함
	**/
	function get_Combo(obj)
	{
	  var rV;
	  var len=obj.length;
	  var otype="";
	  if (obj == null) return;
	  otype=(obj.type).substring(0, 6);
	  if (otype != "select") return;
	    for (var index=0; index < len; index++) 
	    {
	      if (obj.options[index].selected) 
	      {
	        rV=trim(obj.options[index].text);
	      }
	    }
	  return (rV);
	}
	/**
	* @param     : obj => 객체
	*		: state => 객체상태
	* sample	: <input name="readonly1" type="text" />
	*		    : <input type="button" onclick="javascript:set_TextReadonly(readonly1,!(readonly1.readOnly))" value=""/>
	* @return 	: 
	* 설명		: 객체를 disabled 만들고  배경색 바꿈
	**/
	function set_TextDisabled(obj,state)
	{
		if (state)
		{
			obj.style.background='#EEEEEE';
		}
		else
		{
			obj.style.background='#FFFFFF';
		}
		obj.disabled=state ;
	}
	/**
	* @param     : obj => 객체
	*		: showhidestatus => 객체상태
	* 		: disabled_status => 보여주고 싶은 상태
	* sample	: <input name="readonly1" type="text" />
	*		    : <input type="button" onclick="javascript:set_TextReadonly(readonly1,!(readonly1.readOnly))" value=""/>
	* @return 	: 
	* 설명		: 마우스 액션에서 btn을 바꿔주는 함수 
	**/
	function btn_change(obj, showhidestatus, disabled_status)
	{
		if(disabled_status == true)
		{
		    if(obj.className.length > 9)
		    {
		    	obj.className=obj.className.substring(0,9);
		    }
		    obj.className=obj.className+"_alp";
		    obj.disabled=disabled_status;
		}
		else
		{
		    obj.disabled=disabled_status;
		    obj.className="button_"+fullZero(obj.value.length.toString() , 2 );
		}
		if(	showhidestatus == "s" )
		{
			 obj.style.display="";
		}
		else
		{
		    obj.style.display="none";
		}
	}
	/**
	* @param     : str => String 
	* sample	: 
	* @return 	:
	* 설명		: 날짜를 찍어주는 함수 
	**/
	function convertDate(obj) 
	{		
	if (!chk_Number(obj.value)) return false;	
		str=obj.value;
		len=obj.value.length;  
	    switch(len)  {
			case 4:
				str=str + "-";
				obj.value=str;
				break;
	       	case 7:
	       	    if ( obj.maxLength != null && obj.maxLength !=7 ) {
					str=str + "-";
					obj.value=str;
			    }
				break;
		}
	}
	/**
	* @param     :  
	* sample	    : 
	* @return 	    :
	* 설명		    : 마스터에서 자릿수 체크하여 오토마스크해줌 
	**/
	function convert_mask(obj)
	{
		if(obj.value.length == 10 )
		{
			convert_Saup_No(obj);
		}
		else if(obj.value.length == 13)
		{
			convert_Jumin_No(obj);
		}
	}
    /////////////////////////  KEY UTIL AREA /////////////////////////////
    /**
	* @param     :  
	* sample	    : 
	* @return 	    :
	* 설명		    : 화면단 단축키 추가
	**/
	function makeShortcut(shortcut,callback,opt) {
		//Provide a set of default options
		var default_options={
			'type':'keydown',
			'propagate':false,
			'target':document
		}
		if(!opt) opt=default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo]=default_options[dfo];
			}
		}
		var ele=opt.target
		if(typeof opt.target == 'string') ele=document.getElementById(opt.target);
		var ths=this;
		//The function to be called at keypress
		var func=function(e) {
			e=e || window.event;
			//Find Which key is pressed
			if (e.keyCode) code=e.keyCode;
			else if (e.which) code=e.which;
			var character=String.fromCharCode(code).toLowerCase();
			var keys=shortcut.toLowerCase().split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp=0;
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums={
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys={
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				'pause':19,
				'break':19,
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				'pageup':33,
				'page_up':33,
				'pu':33,
				'pagedown':34,
				'page_down':34,
				'pd':34,
				'left':37,
				'up':38,
				'right':39,
				'down':40,
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					if(e.ctrlKey) kp++;
				} else if(k ==  'shift') {
					if(e.shiftKey) kp++;
				} else if(k == 'alt') {
						if(e.altKey) kp++;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character=shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			//alert('kp : ' + kp)
			//alert('keys : ' + keys.length)		
			if(kp == keys.length) {
				callback(e);
				if(!opt['propagate']) { //Stop the event
					//e.cancelBubble is supported by IE - this will kill the bubbling process.
					e.cancelBubble=true;
					e.returnValue=false;
					//e.stopPropagation works only in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		//Attach the function with the event	
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']]=func;
	}
	 /////////////////////////  KEY UTIL AREA /////////////////////////////
	 /**
     * 화면 폼입력값에 대한 유효성검증 프로세스 처리
     */
    function validateForm( sheetObj, formObj, sAction, statusIdx){
    	var validYn=true;
        //조회
        if(sAction==SEARCHLIST){
        }else{
            var msg='';
            var diableMsg='';
            var testCd='';
            if(sAction==ADD){ //저장        
                msg='There is no data to insert!';
                testCd='I';
            }else if(sAction==MODIFY){ //수정
                msg='There is no data to update!';
                testCd='U';            
            }else if(sAction==REMOVE){ //삭제
                msg='There is no data to delete!';
                testCd='D';
            }else if(sAction==MULTI){ //일괄처리
            	msg=multiMsg;
            }
            //전체 CellRow의 갯수
            var cnt=sheetObj.RowCount();
            cnt++;
            var totCheck=0;
            var invalidInput=0;
            for(var i=1; i < cnt; i++){
            	if(testCd==sheetObj.GetCellValue(i,statusIdx)){
                    totCheck++;
            	}else if('R'!=sheetObj.GetCellValue(i,statusIdx)){
                    invalidInput++;
                    sheetObj.SetCellValue(i,1,'R');
                }
            }
            if(totCheck==0){
                validYn=false;
                alert(msg);
            }else{
                if(invalidInput>0){
                    if(invalidInput==1){
                        alert(invalidInput+' data invalid!\n\n The data will not be affected this operation!');
                    }else{
                        alert(invalidInput+' data invalid!\n\n These data will not be affected this operation!');
                    }
                }
            }
         }
        return validYn;
    }
	 /**
    * 화면 폼입력값에 대한 유효성검증 프로세스 처리
    */
   function validateFormCd( sheetObj, formObj, sAction, statusIdx){
	   var validYn=true;
       //조회
       if(sAction==SEARCHLIST){
       }else{
           var diableMsg='';
           var testCd='';
           if(sAction==ADD){ //저장        
               testCd='I';
           }else if(sAction==MODIFY){ //수정
               testCd='U';            
           }else if(sAction==REMOVE){ //삭제
               testCd='D';
           }else if(sAction==MULTI){ //일괄처리
           }
           //전체 CellRow의 갯수
           var cnt=sheetObj.RowCount();
           cnt++;
           var totCheck=0;
           var invalidInput=0;
           for(var i=1; i < cnt; i++){
        	   if(testCd==sheetObj.GetCellValue(i,statusIdx)){
                   totCheck++;
        	   }else if('R'!=sheetObj.GetCellValue(i,statusIdx)){
                   invalidInput++;
                   sheetObj.SetCellValue(i,1,'R');
               }
           }
           if(totCheck==0){
               validYn=false;
           }else{
               if(invalidInput>0){
                   if(invalidInput==1){
                       alert(invalidInput+' data invalid!\n\n The data will not be affected this operation!');
                   }else{
                       alert(invalidInput+' data invalid!\n\n These data will not be affected this operation!');
                   }
               }
           }
        }
       return validYn;

   }
	/**
	* @param     : str => String
	*		: icount => 전체 문자 갯수
	* sample	: fullZero("123",5);
	* @return 	: String
	* 설명		: 전체 문자 만큼 앞에 0을 채워준다
	**/
	function fullZero(str,icount)
	{
		var slength=(""+str).length;
		var s="";
		for (i=0 ; i < icount - slength ; i++)
		{
			s=s + "0";
		}
		return s + str;
	}

	/**
	 * 모달창을 화면의 중앙에 활성화 한다.
	 */
	function modal_center_open(sURL,parmObj,sWidth,sHeight, scroll) {

//		if( typeof($(document.activeElement).attr('class')) == "undefined"
//				|| $(document.activeElement).attr('class') == "search_form"){	//Input Box
			//$(parent.document.activeElement).attr('class', 'current_input');
		$(document.activeElement).addClass('focusElem');
//		}else{	// Button
//			$(parent.document.activeElement).attr('class', 'current_btn');
//		}
		
	    // preSet
	    parmObj['FORM'] = document.form;
	    
	    var height = screen.height;
	    var width = screen.width;
	    var leftpos = width/2 - sWidth/2;
	    var toppos = height/2 - sHeight/2;
	    
	    if(scroll == undefined) scroll = 'no'

	    if(leftpos<0) leftpos=0;

	    if(toppos<0) toppos=0;

	    var sFeatures = new Array();

	    // 상단의 닫기 영역에 해당하는 픽셀
	    sHeight += 31;
	    
	    sFeatures[0] = (sWidth > 0)? "dialogWidth:"+sWidth+"px":"dialgWidth:300px";
	    sFeatures[1] = (sHeight > 0)? "dialogHeight:"+sHeight+"px":"dialogHeight:300px";
	    sFeatures[2] = (toppos > 0)? "dialogTop:"+toppos+"px":"";
	    sFeatures[3] = (leftpos > 0)? "dialogLeft:"+leftpos+"px":"";
	    sFeatures[4] = "status:no";
		sFeatures[5] = (!toppos && !leftpos)? "center:yes":"center:no";
	    sFeatures[6] = "resizable:no";
	    sFeatures[7] = "help:no";
	    sFeatures[8] = "scroll:"+scroll;

		sFeatures = sFeatures.join(";");
		

		//window.showModalDialog(sURL,parmObj,sFeatures);
		_CallPopUp(sURL, parmObj, sFeatures);
	}

	function _CallPopUp(pUrl, parmObj, sFeatures) {
    	var sWidth, sHeight, sScroll;
    	var aTmp = sFeatures.split(";");
    	for (var i=0; i<aTmp.length; i++) {
    		var aConfig = aTmp[i].split(":");
    		if(aConfig[0]=="dialogWidth") {
    			sWidth = aConfig[1];
    		}
    		if(aConfig[0]=="dialogHeight") {
    			sHeight = aConfig[1];
    		}
    		if(aConfig[0]=="scroll") {
    			sScroll = "yes";
    		}
    	}
    	$(".layer_popup_bg").remove();
    	$("body").prepend("<div class='layer_popup_bg'></div>");

    	var ifr = document.getElementById("popiframe");
    	var divIfr = document.getElementById("divpopiframe");

	    if (ifr){
			$(ifr).remove();
			$(divIfr).remove();
			$('<div id="divpopiframe" class="layer_popup"><script src="js/common/jquery-ui/jquery-ui.min.js"></script><!-- 이파일 로드 --><script>$(".layer_popup").draggable({handle:".layer_popup_drag", iframeFix: true, containment: "document", scroll:false}); $("div, p").enableSelection();</script><span class="layer_popup_drag" style="width:'+ (parseInt(sWidth.replace("px",""))- 45) +'px"></span> </div>').appendTo("body");
	    	$('<IFRAME id="popiframe" name="popiframe" src="'+pUrl+ '"scrolling="' + sScroll + '" width="'+sWidth + '" height="' + sHeight + '"></IFRAME>').appendTo(".layer_popup");
	    } else {
	    	//$('<div class="layer_popup"><script></script> </div>').appendTo("body");
			$('<div id="divpopiframe" class="layer_popup"><script src="js/common/jquery-ui/jquery-ui.min.js"></script><!-- 이파일 로드 --><script>$(".layer_popup").draggable({handle:".layer_popup_drag", iframeFix: true, containment: "document", scroll:false}); $("div, p").enableSelection();</script><span class="layer_popup_drag" style="width:'+ (parseInt(sWidth.replace("px",""))- 45) +'px"></span> </div>').appendTo("body");
	    	$('<IFRAME id="popiframe" name="popiframe" src="'+pUrl+ '"scrolling="' + sScroll + '" width="'+sWidth + '" height="' + sHeight + '"></IFRAME>').appendTo(".layer_popup");
//    	    	$('<div class="orign_layer_popup" style="display:none"> </div>').appendTo("body");
//    	    	$('<IFRAME id="orign_popiframe" name="orign_popiframe" frameBorder="0" src="'+pUrl+ '"scrolling="' + sScroll + '" width="'+0 + '" height="' + 0 + '"></IFRAME>').appendTo(".orign_layer_popup");
	    }
    	    
    	// Modal에 Modal을 호출할 경우, 위치 조절
		var calMarginTop = 0;
		var calMarginLeft = 0;
		var iMarginTop = parseInt(sHeight.replace("px",""));
		var wMarginTop = parseInt(sWidth.replace("px",""));
		var w_layerPopupGap = 0;
		var h_layerPopupGap = 0;
		
		// 윈도우 팝업창이 존재하며, 큰 팝업에서 작은 팝업 오픈
		if ($(parent.document).find(".pop_html").width() != null && 
				($(parent.document).find(".pop_html").width() - $(parent.document).find("#popiframe").width()) > 0
				&& ($(parent.document).find(".pop_html").height() - $(parent.document).find("#popiframe").height() > 0) // Window Popup => Modal Popup (단, Window Popup > Modal Popup) => 상관없음
			) {
			calMarginTop = iMarginTop;
			calMarginLeft = wMarginTop;
			
			//레이어 팝업 세로/가로 가운데 위치
			$(".layer_popup").css({
				marginTop : "-"+(calMarginTop/2) + "px",
				marginLeft : "-"+(calMarginLeft/2) + "px"
			});
		} else { 
			// 1. 첫번째 Popup (Window, Modal)
			// 2. Window Popup => Modal Popup (단, Window Popup < Modal Popup) 
			// 3. Modal Popup => Modal Popup
			if ($("body").css("background-color") == "rgb(255, 255, 255)") { // 2, 3번 경우
		    	var ifr2 = document.getElementById("orign_popiframe");
		    	
	    	 	if (ifr2){
	    	 		$(ifr2).remove();
	    	 		$('<IFRAME id="orign_popiframe" name="orign_popiframe" frameBorder="0" width="'+0 + '" height="' + 0 + '"></IFRAME>').appendTo(".orign_layer_popup");
	    	 	} else {
	    	 		$('<div class="orign_layer_popup" style="display:none"></div>').appendTo("body");
	    	 		$('<IFRAME id="orign_popiframe" name="orign_popiframe" frameBorder="0" width="'+0 + '" height="' + 0 + '"></IFRAME>').appendTo(".orign_layer_popup");
	    	 	}
  
    	    	// Window popup이 layer popup보다 작은경우의 처리를 위해 분기화.
	    		if ($(parent.document).find(".pop_html").width() != null && (($(parent.document).find(".pop_html").width() - $(parent.document).find("#popiframe").width() < 0)
	    				|| ($(parent.document).find(".pop_html").height() - $(parent.document).find("#popiframe").height() < 0))) { // 2번 경우
	    			$(parent.document).find("#orign_popiframe").attr("height",$(document).find(".pop_html").height());
	    			$(parent.document).find("#orign_popiframe").attr("width", $(document).find(".pop_html").width());
	    			
	    	        var windowW = $(document).find("#popiframe").width() + 200;  // 창의 가로 길이
	    	        var windowH = $(document).find("#popiframe").height() + 200;  // 창의 세로 길이
	    	        var left = Math.ceil((window.screen.width - windowW)/2);
	    	        var top = Math.ceil((window.screen.height - windowH)/2);
	    			
	    			window.resizeTo($(document).find("#popiframe").width() + 200, $(document).find("#popiframe").height() + 200); 
						 
					// 센터 정렬
					var windowX = (screen.width - ($(document).find("#popiframe").width() + 200))/2;
					var windowY = (screen.height - ($(document).find("#popiframe").height() + 200))/2 - 20;
					window.moveTo(windowX,windowY);
	    			
	    		// Layer Popup에서 Layer Popup호출시
	    		} else { // 3번 경우
		    		w_layerPopupGap = Math.abs($(document).find("#popiframe").width() - $(parent.document).find("#popiframe").width());
		    		h_layerPopupGap = Math.abs($(document).find("#popiframe").height() - $(parent.document).find("#popiframe").height());
		    		
		    		$(document).find("#orign_popiframe").attr("width", $(parent.document).find("#popiframe").width());
		    		$(document).find("#orign_popiframe").attr("height", $(parent.document).find("#popiframe").height());
		    		
		    		if (Math.abs(w_layerPopupGap) < 200){
		    			w_layerPopupGap = 200;
		    		}
		    		
		    		if (Math.abs(h_layerPopupGap) < 200){
		    			h_layerPopupGap = 200;
		    		}
					
					calMarginLeft = wMarginTop + w_layerPopupGap / 2;
					calMarginTop = iMarginTop + h_layerPopupGap / 2;
					
					if ($(parent.document).find("#popiframe").width() - $(document).find("#popiframe").width() >= 200) {
						calMarginLeft = $(parent.document).find("#popiframe").width();
					}
					
					if ($(parent.document).find("#popiframe").height() - $(document).find("#popiframe").height() >= 200) {
						calMarginTop = $(parent.document).find("#popiframe").height();
					}
					
					$(parent.document).find("#popiframe").attr("width", calMarginLeft);
					$(parent.document).find("#popiframe").attr("height", calMarginTop);
					
					$(".layer_popup").css({
						marginTop : "-"+(iMarginTop/2) + "px",
						marginLeft : "-"+(wMarginTop/2) + "px"
					});
					
					//레이어 팝업 세로/가로 가운데 위치
					$(parent.document).find(".layer_popup").css({
						marginTop : "-"+(calMarginTop/2) + "px",
						marginLeft : "-"+(calMarginLeft/2) + "px"
					});
	    		}
	    	} else { // 1. 첫번째 Popup (원래 지정한 사이즈로 열림) => 상관없음
				// 부모팝업창 사이즈
				$(parent.document).find("#orign_popiframe").attr("height",iMarginTop);
				$(parent.document).find("#orign_popiframe").attr("width", wMarginTop);
				
				calMarginTop = iMarginTop;
				calMarginLeft = wMarginTop;
				
				//레이어 팝업 세로/가로 가운데 위치
				$(".layer_popup").css({
					marginTop : "-"+(calMarginTop/2) + "px",
					marginLeft : "-"+(calMarginLeft/2) + "px"
				});
	    	}
		}
		
		$(".layer_black_bg,.layer_popup").fadeIn(200);

	    //return window.showModalDialog("obj/sheet/jsp/CoPopup.jsp?" + pUrl.replace("?", "!"), window, sFeatures);
    	
    }	
	 

	
	/**
 * event가 발생한 object 또는 ojbect의 다양한 속성을 가져온다. IE/Chrome/FireFox 경우 처리<br>
 * <br><b>Example :</b>
 * <pre>
 *     ComGetEvent();
 *     ComGetEvent("name");
 *     ComGetEvent("keycode");
 *     ComGetEvent("value");
 *     ComGetEvent("dataformat");
 *     ComGetEvent("maxlength");
 * </pre>
 * @return 없음
 */
function ComGetEvent(sArgName){
	if(event == null || event == undefined || event == "undefined") return;
	var obj = event.target || event.srcElement;
	if (sArgName==undefined || sArgName == null) return obj;
	
	switch(sArgName){
		case "name":
			return obj.name || obj.id;
		case "keycode":
			return event.keyCode || event.which || event.charCode;
		case "value":
			return obj.value;
		default: //ex) "dataformat", "maxlength"
			var argVal = obj.getAttribute(sArgName);
			if (argVal==null) return;
			return argVal;
	}
	return;
}    	



/**
 * 하나의 컨트롤의 Validation을 확인한다. <br>
 * 각 하나의 컨트롤이 아닌 Form안에 있는 전체를 체크하고자 한다면 {@link #ComChkValid} 함수를 이용한다. <br>
 * Validation을 확인하기 위해서는 maxlength 속성과 사용자 정의 속성인 required, caption, minlength, dataformat, fullfill, cofield, maxnum, minnum속성을 설정해주어야 한다. 다음과 같이 설정한다. <br>
 *     &lt;input type="text" name="txtDate" <font color="red">caption="입사일" maxlength="10" dataformat="ymd" required  fullfill maxnum="100" minnum="0" cofield="" </font>&gt; <br>
 * 위와 같은 속성을 설정함으로써 이 함수는 다음과 같은 처리를 한다. <br>
 * (1) maxlength  : 입력 최대 길이 확인, UTF-8기준으로 길이를 체크하므로, 한글은 3Byte로 된다.<br>
 * (2) minlength  : 입력 최소 길이 확인, 값이 있다면 최소 길이만큼 입력해야 한다. <br>
 * (3) dataformat : 데이타 포멧으로 Validation 확인<br>
 * <pre>
 *  - "ymd"      : yyyy-mm-dd
 *  - "ym"       : yyyy-mm
 *  - "hms"      : hh:mm:ss
 *  - "hm"       : hh:mm
 *  - "ymdhms"   : yyyy-mm-dd hh:mm:ss
 *  - "ymdhm"    : yyyy-mm-dd hh:mm
 *  - "saupja"   : ###-##-#####
 *  - "jumin"    : ######-#######
 *  - "num"      : ####
 *  - "int"      : #,###
 *  - "float"    : #,###.###
 *  - "eng"      : 영문만
 *  - "engup"    : 영문 대문자만
 *  - "engdn"    : 영문 소문자만
 * </pre>
 * (4) required  : 필수입력 여부 확인, 값이 ""이면 에러 메시지 표시<br>
 * (5) caption   : EndUser를 위한 메시지 처리를 위한 컨트롤 표시 title<br>
 * (6) fullfill  : maxlength속성 만큼 글자를 모두 입력해야 하는 경우, 값이 ""이면 체크 안함<br>
 * (7) pointcount: dataformat="float" 인 경우 소숫점 아랫자리 수<br>
 * (8) maxnum    : 숫자인 경우 최대값<br>
 * (9) minnum    : 숫자인 경우 최소값<br>
 * (10) cofield  : 기간인 경우 시작일과 종료일 html태그에 이 속성을 설정해야 하며, 시작일은 종료일 name을 종료일은 시작일 name을 설정한다. <br>
 * <br>
 * &lt;input type="radio"&gt;의 경우 같은 name으로 여러개를 만든다면 첫번째 태그에만 위 속성을 설정해준다. 예를 들어 다음과 같다. <br>
 *     &lt;input type="radio" name="rdoCity" value="01" required caption="도시"&gt;서울<br>
 *     &lt;input type="radio" name="rdoCity" value="02"&gt;대전<br>
 *     &lt;input type="radio" name="rdoCity" value="03"&gt;대구<br>
 * dataformat="float"인 경우 maxLength와 pointcount를 설정한다. DB에 number(5,2)로 설정되었다면 maxLength="6"으로 소숫점을 포함하여 설정하고, pointcount="2"로 DB와 동일하게 설정한다.<br>
 * 위 속성은 필요한것만 골라서 사용한다. 굳이 모든 속성을 다 설정할 필요는 없다. 그러나 속성을 하나라도 추가 한다면 caption속성은 설정해야 메시지 처리에 가독성을 높일수 있다.<br>
 * <br><b>Example :</b>
 * <pre>
 *     if(!ComChkObjValid(frmMaster.txtName)) return;   //frmMaster폼안의 txtName 오브젝트의 Validation을 확인한다.
 * </pre>
 * @param {object} obj          필수,대상 HTML태그(Object)
 * @param {bool}   bMsg         선택,각종메시지 표시 여부, default=true
 * @param {bool}   bTrim        선택,데이터 Trim후 확인할지 여부, default=true
 * @param {bool}   bMasked      선택,Validation이 정확하면 Format에 맞게 Masking한값을 obj.value에 설정하지 여부, default=true
 * @returns bool <br>
 *          false - Validation이 정확하지 않은 경우<br>
 *          true  - Validation이 정확한 경우
 * @see #ComChkValid
 */
function ComChkObjValid(obj, bMsg, bTrim, bMasked){

    try {
        var sTitle  = "";
        var sMsg    = "";
        //다음 배열은 순서가 중요함
        var props   = new Array("required", "dataformat", "maxLength", "minlength", "fullfill", "maxnum", "minnum", "pointcount", "cofield");

        if (bMsg==undefined || bMsg==null)            bMsg = true;
        if (bTrim==undefined || bTrim==null)          bTrim = true;
        if (bMasked==undefined || bMasked==null)      bMasked = true;

        var sFormat     = "";
        var sVal        = "";
        var maskValue   = "";
        var iMaxLen=0, iMaxVal=null, iMinVal=null;

        sVal = ComGetObjValue(obj)
        if (obj.type=="radio") {
            if (obj.name == null || obj.name=="") return true;
            //radio의 경우 radio의 첫번째 요소를 Object로 설정한다.
            var eRadio = document.all[obj.name];
            obj=eRadio[0];
        }else if(obj.type == undefined && obj.length != undefined && obj[0].type == "radio") {
            //radio의 경우 radio의 첫번째 요소를 Object로 설정한다.
            obj = obj[0];
        }

        sTitle = (obj.getAttribute("caption")==null)?obj.name:obj.getAttribute("caption");


        if(bTrim) sVal = ComTrim(sVal);
        maskValue = sVal;

        //체크할 속성 확인하기
        for(var j=0; j<props.length; j++){

            var attriVal = obj.getAttribute(props[j]);
             
            if (attriVal == null) continue;

            switch(props[j]) {
                case "required":    //필수 입력 확인
                    if(sVal==""){
                    	sMsg = "'" + sTitle + "' " +Msg_Required;
                    	j = 99;
                    }
                    break;
                case "dataformat":  //포멧 확인
                    sFormat = attriVal;
	                //루프를 돌다가 "dataformat"을 지나게 되면 그때부터는 마스크구분자 없는 값으로 다른 Validation(길이,min,max 등)을 확인한다.
	                if (sFormat!="") sVal = ComGetUnMaskedValue(sVal, sFormat);

                    if (sVal== "") continue;

                    //마스크값도 가져오지만 포멧Validation도 ComGetMaskedValue 함수에서 체크한다.
                    maskValue = ComGetMaskedValue(obj, sFormat);

                    if (sVal != maskValue && sFormat.indexOf("eng")>=0) obj.value = maskValue;
 
                        if (maskValue!= "") continue;
                    switch(sFormat) {
                        case "ymd":     //yyyy-mm-dd
                            sMsg = ComGetMsg('COM12134', sTitle);
                    		j=99;
                            break;   
                        case "ymdhms":     //yyyy-mm-dd hh:mm:ss
                            sMsg = ComGetMsg('COM12187', 'yyyy-mm-dd hh:mm:ss');
                     		j=99;
                            break;   
                        case "ymdhm":     //yyyy-mm-dd hh:mm
                            sMsg = ComGetMsg('COM12187', 'yyyy-mm-dd hh:mm');
                     		j=99;
                            break;   
                        case "mdy":     //mm-dd-yyyy
                            sMsg = ComGetMsg('COM12187', 'mm-dd-yyyy');
                     		j=99;
                            break;   
                        case "ym":      //yyyy-mm
                            sMsg = ComGetMsg('COM12134', sTitle);
                            sMsg = sMsg.substring(0, sMsg.length-3);
                    		j=99;
                           break;
                        case "yw":      //yyyy-ww
                            sMsg = "'" + sTitle + "' is not valid. Please enter a correct date.\n\n Format : YYYY-WW";
                        	j=99;
                            break;
                        case "yyyy":      //yyyy
                            sMsg = "'" + sTitle + "' is not valid. Please enter a correct date.\n\n Format : YYYY";
                			j=99;
                            break;
                        case "hms":     //hh:mm:ss
                            sMsg = "'" + sTitle + "' is not valid. Please enter a correct time.\n\n Format : HH:MM:SS";
                        	j=99;
                            break;
                        case "hm":      //hh:mm
                            sMsg = "'" + sTitle + "' is not valid. Please enter a correct time.\n\n Format : HH:MM";
                        	j=99;
                        	break;
                        case "int":     //정수
                            sMsg = "'" + sTitle + "' is not valid. Please enter an correct integer format.";
                        	j=99;    
                        	break;
                        case "float":   //실수
                            sMsg = "'" + sTitle + "' is not valid. Please enter a correct float(real type) format.";
                        	j=99;    
                        	break; 
                        case "jumin":   //######-#######
                            sMsg = "'" + sTitle + "' is not valid. Please enter correct a identification no.\n\n Format : ######-#######";
                        	j=99;
                        	break;
                        case "saupja":  //###-##-#####
                            sMsg = "'" + sTitle + "' is not valid. Please enter correct a saupja no.\n\n Format : ###-##-#####";
                        	j=99;
                        	break;
                    }
                    break;
                case "maxLength":   //입력최대길이 확인
                    if (sVal== "") continue;
                    iMaxLen = attriVal;
                    if(ComGetLenByByte(sVal) > iMaxLen){
                    	sMsg = ComGetMsg('COM12142', sTitle, attriVal);
                    	j=99;
                    }
                    break;
                case "minlength":   //입력최소길이 확인
                case "minLength":   //입력최소길이 확인
                    if (sVal== "") continue;
                    if(ComGetLenByByte(sVal) < attriVal) {
                    	sMsg = ComGetMsg('COM12143', sTitle, attriVal);
                    	j=99;
                    }
                    break;
                case "fullfill":    //전체입력 확인
                    if (sVal== "") continue;
                    if(ComGetLenByByte(sVal) != iMaxLen) {
                    	sMsg = ComGetMsg('COM12174', sTitle, iMaxLen);
                    	j=99;
                    }
                    break;
                case "maxnum":      //최대값 확인
                	iMaxVal = attriVal;
                    if (sVal== "") continue;
                    if (!ComIsMoneyNumber(sVal, true, true, true)) {
                        sMsg = ComGetMsg('COM12178');
                    	j=99;
                    } else if(!ComIsMoneyNumber(attriVal, true, false, false)) {
                        sMsg = "is not valid. Please enter an correct number format. maxnum=" + attriVal;
                    	j=99;
                    } else if (parseFloat(sVal) > parseFloat(attriVal)) {
                        sMsg = "'" + sTitle + "' have to be less than " + attriVal;
                    	j=99;
                    }
                    break;
                case "minnum":      //최소값 확인
                	iMinVal = attriVal;
                    if (sVal== "") continue;
                    if (!ComIsMoneyNumber(sVal, true, true, true)) {
                        sMsg = ComGetMsg('COM12178');
                    	j=99;
                    } else if(!ComIsMoneyNumber(attriVal, true, false, false)) {
                        sMsg = "is not valid. Please enter an correct number format. minnum=" + attriVal;
                    	j=99;
                   } else if (parseFloat(sVal) < parseFloat(attriVal)) {
                        sMsg = "'" + sTitle + "' have to be greater than " + attriVal;
                    	j=99;
                    }
                    break;
                case "pointcount":	//소숫점 아랫자리수 확인
                    if (sVal== "") continue;

                    if (!ComIsMoneyNumber(sVal, true, true, true)) {
                        sMsg = ComGetMsg('COM12178');
                    	j=99;
                    } else if(!ComIsMoneyNumber(attriVal, false, false, false)) {
                        sMsg = "is not valid. Please enter an correct number format. pointcount=" + attriVal;
                    	j=99;
                    } else {
                        var iLeftLen = iMaxLen-attriVal-1;
                    	var iNum = sVal;
                        var iPointNum = 0;
                        
                    	if(sVal.indexOf(".") >= 0) {
                        	iNum = sVal.split(".")[0];		//소숫점 윗자리값
	                        iPointNum = sVal.split(".")[1];	//소숫점 아랫자리값
                    	}
                    	
                    	if (iPointNum.length > attriVal) {
                    		//소숫점 아래 자리수가 너무 많은 경우
                            sMsg = "'" + sTitle + "' is not valid decimal point. Please enter a maximum " + attriVal + " decimal point";
                        	j=99;
                        } else if (iMaxLen<100 && iLeftLen>0) {
                        	//"iMaxLen<100" 이조건 반드시 필요함. 
                        	//maxLength속성을 설정하지 않으면 기본적으로 2147483647로 설정되므로 너무 커서 메모리 오류 발생함

                        	//iMaxVal은 "maxnum"속성을 읽어서 미리 설정된 값이고, iMinVal은 "minnum"속성을 읽어서 미리 설정된 값임
                        	//만약 두개 속성중 하나라도 없었다면 다음 코드를 통해서 체크한다.
                        	if (iMaxVal==null) iMaxVal = eval(ComLpad("9",iLeftLen,"9") + "." + ComLpad("9",attriVal,"9"));
                        	if (iMinVal==null) iMinVal = eval("-" + ComLpad("9",iLeftLen,"9") + "." + ComLpad("9",attriVal,"9"));
                    		//소숫점 윗 자리수가 너무 많거나 작은 경우 & 사용자정의속성인 maxnum과 minnum이 없는 경우
                        	if (parseFloat(iNum) > parseFloat(iMaxVal)) {
                                sMsg = "'" + sTitle + "' have to be less than " +iMaxVal;
                            	j=99;
                        	} else if(parseFloat(iNum) < parseFloat(iMinVal)) {
                                sMsg = "'" + sTitle + "' have to be greater than " +iMinVal;
                            	j=99;
	                        }
                        }
                    }
                	break;
                case "cofield":      //기간확인
                    switch(sFormat) {
                        case "ymd":     //yyyy-mm-dd
                        case "ymdhms":     //yyyy-mm-dd
                        case "ymdhm":     //yyyy-mm-dd
                        case "mdy":     //mm-dd-yyyy
                        case "ym":      //yyyy-mm
                        case "yw":      //yyyy-ww
                        case "yyyy":      //yyyy   
                        case "hms":     //hh:mm:ss
                        case "hm":      //hh:mm
                            var coObj = eval("document.all." + attriVal);
                            var coVal =  ComGetObjValue(coObj);
                            if (coVal != "" && sVal == "")          //현재Obj는 값이 없고, CoObj만 값이 있는 경우
                                obj.value = coVal;
                            else if (coVal == "" && sVal != "")     //현재Obj는 값이 있고, CoObj만 값이 없는 경우
                                coObj.value = maskValue;
                            else {  //둘다 있는 경우
                                var startDate, endDate;
                                //sourceIndex속성은 obj의 document.all의 순번임, 
                                //따라서 sourceIndex속성값이 작으면 시작일이고, 크면 종료일이다.
                                if (obj.sourceIndex < coObj.sourceIndex) {
                                	startDate=maskValue;
                                	endDate = coVal;
                                } else {
                                	startDate=coVal;
                                	endDate = maskValue;
                                }
                                
                                //기간체크
                                if (Date(startDate) > Date(endDate) && !CofieldFlag) {
                                	if (obj.sourceIndex < coObj.sourceIndex){
	                                	CofieldFlag = true;
	                                	sTitle2 = (coObj.getAttribute("caption")==null)?"end date":coObj.getAttribute("caption");
                                		sMsg=ComGetMsg("COM12133", "'" + sTitle+ "'", "'" + sTitle2 + "'", "earlier");
                                	} else {
	                                	CofieldFlag = false;
	                                	sTitle2 = (coObj.getAttribute("caption")==null)?"start date":coObj.getAttribute("caption");
                            			sMsg=ComGetMsg("COM12133", "'" + sTitle+ "'", "'" + sTitle2 + "'", "later");
                                	}
                                	j=99;
                                }else
                                	CofieldFlag = false;
                            }
                            break;
                    }
                    break;
            }

            if (sMsg!="") {
            	if(event == null){
            		if (bMsg) ComShowMessage(sMsg);
	                obj.focus(); 
	                obj.select(); 
            	}else{
            	//포커스 나갈수 있는 경우 : 이벤트를 통해서 함수가 호출되고, 값이 공백이거나 readonly인 경우
                	var canFocusOut = (ComGetEvent() == obj && (sVal=="" || obj.getAttribute("readOnly")==true));
                	
                    if (bMsg && !canFocusOut) ComShowMessage(sMsg);

                    //컨트롤이 숨겨져 있을수도 있으므로 에러 감싼다.
                    try{                     	
                    	if(!canFocusOut) {
                			//값이 정확할때 까지 포커스가 나가지 않아야 하는 경우
                			ComJsEventStop();
	                    	obj.focus(); 
	                    	obj.select(); 
	                    }

                    } catch(ee) {;}
                }
                return false;
            }
        }

        if (bMasked && sFormat != "") {
            obj.value = ComGetMaskedValue(obj, sFormat);
        }
    } catch(err) { ComFuncErrMsg(err.message); }
    
    return true;
}

function ComGetLenByByte(obj)
{
    try {
        //첫번째 인자가 문자열 또는 HTML태그(Object)인 경우 처리
        var sValue = obj;

        var byteLength = 0;
        for (var inx = 0; inx < sValue.length; inx++) {
            var oneChar = escape(sValue.charAt(inx));
            if      ( oneChar.length == 1 )         { byteLength ++;  }
            else if (oneChar.indexOf("%u") != -1)   { byteLength += 3;} //utf-8 기준으로 한글은 3Byte 처리함
            else if (oneChar.indexOf("%") != -1)    { byteLength += oneChar.length/3; }
        } // end for
        return byteLength;
    } catch(err) { ComFuncErrMsg(err.message); }
}

function ComJsEventStop(){ 
	var pE = (window.event)?window.event:arguments[0];
	
	if (pE.cancelBubble) pE.cancelBubble = true;
	if (pE.stopPropagation) pE.stopPropagation();
	if (pE.preventDefault) pE.preventDefault();
	if (pE.returnValue) pE.returnValue = false;
	if (pE.cancel != null) pE.cancel = true;		
    return false;
}

/*이 함수는 CoFormControl.js에서만 사용하려고 만들었음. 편집시 사용가능한 키 인자 여부를 반환한다.*/
//참고:http://cdmanii.tistory.com/153
function isForEditKey(keyValue){
	if (keyValue==32) return false	//공백은 허용 안함
  if ((keyValue>=8   && keyValue<=40)  ||  //BackSpace~아래방향키키
          (keyValue>=45  && keyValue<=46)  ||  //Insert,Delete키
          (keyValue>=91  && keyValue<=93)  ||  //기능키
          (keyValue>=112 && keyValue<=123) ||  //F1~F12키
          (keyValue>=144 && keyValue<=145) ) {//NumLock,ScrollLock
  	return true;
  }
	return false;
}

function getFormatDelim(sFormat, sDelim){
    try {
        if (sDelim==undefined || sDelim==null || sDelim=="") {
            switch(sFormat) {
                case "ymd":
                case "ymdhms":
                case "ymdhm":
                case "ym":
                case "yw":
                case "mdy":
                    sDelim=DATE_SEPARATOR;
                    break;
                case "hms":     //hh:mm:ss
                case "hm":      //hh:mm
                    sDelim=":";     break;
                case "jumin":
                case "saupja":
                    sDelim="-";     break;
                case "int":
                case "float":
                case "singledfloat":
                    sDelim=",";     break;
                case "han": //다음5가지는 마스크구분자가 없으므로 임의로 다음을 설정한다.
                case "eng":
                case "engup": 
                case "engdn":
                case "yyyy":
                    sDelim="|!|";     break;
            }
        }

        return sDelim;
    } catch(err) { ComFuncErrMsg(err.message); }
}

/*
 * 이 함수는 axon_event.addListenerFormat('keyup', 'ComEditFormating', formObj); 방식으로 호출하여 사용해야 한다.
 * <input style="ime-mode:disabled">와 같이 ime-mode를 반드시 설정할것을 권장한다. IE와 FireFox는 처리되나 Chrome와 Safari는 ime-mode가 처리되지 않지만 설정할것을 권장한다.
 * <input dataformat="">와 같이 dataformat이 있는 유형들에 편집시 자동 포멧을 지원한다.
 */
function ComEditFormating(){
    try {
        //편집에 허용된 키(방향키, Backspace키 등)인 경우 포멧을 처리하지 않는다.
		if(isForEditKey(ComGetEvent("keycode"))) return true;
		
    	var obj = ComGetEvent();
		var sFormat = ComGetEvent("dataformat");
		var sOther  = ComGetEvent("otherchar");
		if (sFormat=="") return true;
		var srcValue = obj.value;
		var retValue = srcValue;
		var iMaxLen = -1;
		var bSign = false; 
		var sFormat2 ="";
		
		//alert(MULTI_LANGUAGE);
		
		if (MULTI_LANGUAGE == "Y"){ // 영어의 외의 문자입력여부  2016.01 CEJ 
			sFormat2="";
		}else{
			sFormat2="multiLanguage";
		} 
		
		if (sFormat == "multiLanguage"){ 
			obj.style.imeMode = (sFormat2=="")?"auto":"disabled" ;
		}	 
		
		
		
		if (sOther==undefined) sOther = "";			

		switch(sFormat){
	        case "engup":   //영문대문자 + 숫자
	        	re = new RegExp("[^a-z0-9" + sOther + "]", "gi");
	        	retValue=srcValue.replace(re, '').toUpperCase();
	        	break;
	        	
	        case "engdn":	//영소문자 + 숫자
	        	re = new RegExp("[^a-z0-9" + sOther + "]", "gi");
	        	retValue=srcValue.replace(re, '').toLowerCase();
	        	break;
	        	
	        case "eng":		//영문 + 숫자
	        	re = new RegExp("[^a-z0-9" + sOther + "]", "gi");
	        	retValue=srcValue.replace(re, '');
	        	break;
	        	
	        case "enguponly":   //영문대문자만 (숫자제외)
	        	re = new RegExp("[^a-z" + sOther + "]", "gi");
	        	retValue=srcValue.replace(re, '').toUpperCase();
	        	break;
	        	
	        case "excepthan":  //한글만 제외하고 모두 입력
	        	try { 
		       	    //#4862 [Binex] Filing No. 에 & 들어가면 발생하는 문제
	        		//re = new RegExp("[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]", "gi");
	        		re = new RegExp("[ㄱ-ㅎ|ㅏ-ㅣ|가-힝" + sOther + "]", "gi");
        			retValue=srcValue.replace(re, '');
	        	 
	        	} catch(err){
	        		retValue=srcValue;
	        	}
	        	
	        	break;

	        /*
	         * BL_CODE_UTIL 에서 적용되는 Biz 로직 고려
	         * : dataformat 에 따라 TP 정보를 가져오는 로직을 분기처리하여 사용하고 있음.
             *   multiLanguage 사용시에는 Local Name, Address 를 excepthan 은 Eng Name, Address 정보를 처리함. 
	         */	
	        case "multiLanguage":  //한글만 제외하고 모두 입력  신규생성
	        
	        	try {
	        		if (MULTI_LANGUAGE == "Y"){ // 영어의 외의 문자입력여부  2016.01 CEJ 
	        		}else{
	        		    //#4862 [Binex] Filing No. 에 & 들어가면 발생하는 문제 
		        		//re = new RegExp("[ㄱ-ㅎ|ㅏ-ㅣ|가-힝]", "gi");
	        			re = new RegExp("[ㄱ-ㅎ|ㅏ-ㅣ|가-힝" + sOther + "]", "gi");
	        			retValue=srcValue.replace(re, '');
	        		}
	        	} catch(err){
	        		retValue=srcValue;
	        	}  
	        	 
	        	break;         	
	        	
			case "ymd":		//yyyy-mm-dd 10
				iMaxLen = 10;
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<4) retValue = srcValue;
				if (iLen>=4) retValue = srcValue.substring(0,4) + "-";
				if (iLen<6) retValue += srcValue.substring(4);
				if (iLen>=6) retValue += srcValue.substring(4,6) + "-";
				if (iLen>6) retValue += srcValue.substring(6);
				break;    	            
            case "ym":		//yyyy-mm 7
            	iMaxLen = 7; 
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<4) retValue = srcValue;
				if (iLen>=4) retValue = srcValue.substring(0,4) + "-";
				if (iLen>4) retValue += srcValue.substring(4);
				break;    	            
			case "mdy":		//mm-dd-yyyy 10
				iMaxLen = 10;
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<2) retValue = srcValue;
				if (iLen>=2) retValue = srcValue.substring(0,2) + "-";
				if (iLen<4) retValue += srcValue.substring(2);
				if (iLen>=4) retValue += srcValue.substring(2,4) + "-";
				if (iLen>4) retValue += srcValue.substring(4);
				break;    	            
            case "yyyy":     //yyyy 4
            	iMaxLen = 4; 
				retValue=srcValue.replace(/[^0-9]/gi,'');
				break;
            case "hms":     //hh:mm:ss 8
            	iMaxLen = 8; 
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<2) retValue = srcValue;
				if (iLen>=2) retValue = srcValue.substring(0,2) + ":";
				if (iLen<4) retValue += srcValue.substring(2);
				if (iLen>=4) retValue += srcValue.substring(2,4) + ":";
				if (iLen>4) retValue += srcValue.substring(4);
				break;    	            
            case "hm":      //hh:mm 5
            	iMaxLen = 5; 
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<2) retValue = srcValue;
				if (iLen>=2) retValue = srcValue.substring(0,2) + ":";
				if (iLen>2) retValue += srcValue.substring(2);
				break;
            case "ymdhms":     //yyyy-mm-dd hh:mm:ss 19
            	iMaxLen = 19; 
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<4) retValue = srcValue;
				if (iLen>=4) retValue = srcValue.substring(0,4) + "-";
				if (iLen<6) retValue += srcValue.substring(4);
				if (iLen>=6) retValue += srcValue.substring(4,6) + "-";
				if (iLen<8) retValue += srcValue.substring(6);
				if (iLen>=8) retValue += srcValue.substring(6,8) + " ";
				if (iLen<10) retValue += srcValue.substring(8);
				if (iLen>=10) retValue += srcValue.substring(8,10) + ":";
				if (iLen<12) retValue += srcValue.substring(10);
				if (iLen>=12) retValue += srcValue.substring(10,12) + ":";				
				if (iLen>12) retValue += srcValue.substring(12);
				break;    	            
            case "ymdhm":     //yyyy-mm-dd hh:mm 16
            	iMaxLen = 16; 
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<4) retValue = srcValue;
				if (iLen>=4) retValue = srcValue.substring(0,4) + "-";
				if (iLen<6) retValue += srcValue.substring(4);
				if (iLen>=6) retValue += srcValue.substring(4,6) + "-";
				if (iLen<8) retValue += srcValue.substring(6);
				if (iLen>=8) retValue += srcValue.substring(6,8) + " ";
				if (iLen<10) retValue += srcValue.substring(8);
				if (iLen>=10) retValue += srcValue.substring(8,10) + ":";
				if (iLen>10) retValue += srcValue.substring(10);
				break;
				
            case "jumin":   //######-####### 14
            	iMaxLen = 14; 
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<6) retValue = srcValue;
				if (iLen>=6) retValue = srcValue.substring(0,6) + "-";
				if (iLen>6) retValue += srcValue.substring(6);
				break;
            case "saupja":  //###-##-##### 12
            	iMaxLen = 12; 
				srcValue=srcValue.replace(/[^0-9]/gi,'');
				iLen = srcValue.length;
				if (iLen<3) retValue = srcValue;
				if (iLen>=3) retValue = srcValue.substring(0,3) + "-";
				if (iLen<5) retValue += srcValue.substring(3);
				if (iLen>=5) retValue += srcValue.substring(3,5) + "-";
				if (iLen>5) retValue += srcValue.substring(5);
				break;    	            

            case "num":	//only number
	        	re = new RegExp("[^0-9" + sOther + "]", "gi");
	        	retValue=srcValue.replace(re, '');
            	break;
            	
            case "int":     //#,###            	
				retValue=srcValue.replace(/[^0-9.]/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            	if(retValue.indexOf(".") >= 0) {
            		//소숫점 아랫자리가 있는경우 없애기
            		retValue = retValue.split(".")[0];
            	}
				break;
				
            case "singledfloat":  //숫자+".-"	for Bkg
            	if (retValue.length > 1 && retValue.substring(0,1)=="-") {
            		bSign=true;
            		retValue = retValue.substring(1);
            	}
            	//여기에 break를 넣지않고 float의 기능을 그대로 사용한다.
            case "float":   //#,###.###
            	var pointCnt = ComGetEvent("pointcount");
            	if (pointCnt== undefined) pointCnt = 0;
            	pointCnt = parseInt(pointCnt,10);
            	if(retValue.indexOf(".") < 0) {
                	retValue=retValue.replace(/[^0-9]/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                	//소숫점 윗자리 길이 처리
	            	var iMaxLength = obj.getAttribute("maxLength");
	            	if(iMaxLength != null){
	            		iMaxLength -= pointCnt;
	            		if (retValue.length > iMaxLength) {
	            			retValue = retValue.substring(0, iMaxLength);
	            		}	            		
	            	}
            		
            	} else{
            		var arr = retValue.split(".");
        			arr[0] = arr[0].replace(/[^0-9]/gi,'').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            		arr[1] = arr[1].replace(/[^0-9]/gi,'');
            		
            		//소숫점이 2개이상 나오는 경우
                	if (retValue.indexOf(".") != retValue.lastIndexOf(".")) {
                		for(idx=2; idx<arr.length; idx++){
                			arr[1] += arr[idx].replace(/[^0-9]/gi,'');
                		}
                	}

                	//소숫점 윗자리 길이 처리
	            	var iMaxLength = obj.getAttribute("maxLength");
	            	if(iMaxLength != null){
	            		iMaxLength -= pointCnt;
	            		if (arr[0].length > iMaxLength) {
	            			arr[0] = arr[0].substring(0, iMaxLength);
	            		}	            		
	            	}

	            	//소숫점 아랫자리값  길이 처리
                    if (pointCnt > 0 && arr[1].length > pointCnt) {
                    	arr[1] = arr[1].substring(0, pointCnt)
                    }
                                        
                	retValue = arr[0] + "." + arr[1];
            	}
            	
            	retValue = ((bSign)?"-":"") + retValue;
            	
            	break;

		}

		
		if (iMaxLen > 0) {
			if (obj.getAttribute("maxLength")<iMaxLen) obj.setAttribute("maxLength",iMaxLen);
			if (ComGetLenByByte(retValue) > iMaxLen) retValue = retValue.substring(0, iMaxLen);
		}
		
		if (obj.value!=retValue)  obj.value=retValue;
		if(obj.getAttribute("maxLength") == null) return true;
		//validation check
		if (retValue.length >= obj.getAttribute("maxLength")){
			//float인 경우 "1234."인 상태로 체크할때 문자게 발생할 수 있으므로 제외함
			if (!(sFormat=="float" && retValue.substring(retValue.length-1)==".")) {
				//if (ComChkObjValid(obj, true, false, false)) ComSetNextFocus();
			}
		}

    } catch(err) { ComFuncErrMsg(err.message); }

    return true;
}

/*
 * for BULK
 * 이 함수는 axon_event.addListenerPreset('keyup', 'ComPresetFormating', formObj); 방식으로 호출하여 사용해야 한다.
 * <input preset="date1">, <input preset="num-10,4">와 같이 preset이 있는 유형들에 편집시 자동 포멧을 지원한다.
 */
function ComPresetFormating(){
    try {
		if(isForEditKey(ComGetEvent("keycode"))) return true;//편집에 허용된 키

		if (ComGetEvent("dataformat") != undefined) {
			ComEditFormating();
			return true;
		}
		
		var obj = ComGetEvent();
		var sPreset = ComGetEvent("preset");
		var sFormat = "";
		var iMaxLen = -1;
		var iPointCount = 0;
		if (sPreset=="") return true;

		switch(sPreset){
			case "date1":
			case "date2":
			case "date3":
				sFormat = "ymd";
				break;
			case "month":
				sFormat = "ym";
				break;
			case "year":
				sFormat = "yyyy";
				break;
			case "time1":
				sFormat = "hm";
				break;
			case "date1time1":
				sFormat = "ymdhm";
				break;
			default:
				if (sPreset.indexOf("-") != -1) {
	    			var preVal = sPreset.split('-')[0];
	    			var numVal = sPreset.split('-')[1];

	    			iMaxLen 	= parseInt(numVal.split(',')[0],10);
	    			iPointCount = parseInt(numVal.split(',')[1],10);
	    			
	    			sFormat = (iPointCount==0)?"int":"float";
	    			iMaxLen +=((iMaxLen-iPointCount) / 3 - 1);
	    			iMaxLen +=(iPointCount==0)?0:1;
				}
		}
		
		if (sFormat != "") {
			if (sFormat != ComGetEvent("dataformat")){
				obj.setAttribute("dataformat",sFormat);
				if (iMaxLen > 0) obj.setAttribute("maxLength",iMaxLen);
				if (iPointCount >0) obj.setAttribute("pointcount",iPointCount);
			}
			ComEditFormating();
		}
		
    } catch(err) { ComFuncErrMsg(err.message); }

    return true;

}

function ComClosePopup(retArray){
	var returnFunc = parent.callBackFunc;
	if(returnFunc != null && returnFunc != undefined && returnFunc != ""){
		eval("parent."+returnFunc  + "(retArray);");
	}
	
	var layerMargin = 0;
	var winpopMargin = 0;
	
	var browser = navigator.userAgent;
	// IE인 경우
	if (browser.indexOf('MSIE') >=0)
	{
		winpopMargin = 60;
	} else {
		winpopMargin = 70;
		layerMargin = 4;
	}
	
	// Print의 mail팝업때문에 고려
	try {
		if ( $(parent.parent.document).find("#orign_popiframe").width() > 0 || $(parent.document).find("#orign_popiframe").width() > 0 ) {
			$(parent.document).find(".layer_popup,.layer_popup_bg").css("display", "none");
			
			// layer modal에서 layer modal호출한 경우, 사이즈를 원래대로 되돌리기 위해
			var gapWidth = $(parent.parent.document).find("#orign_popiframe").width();
			var gapHeight = $(parent.parent.document).find("#orign_popiframe").height() ;
		
			if ($(parent.parent.parent.document).find(".pop_html").width() != null &&
					($(parent.parent.document).find(".pop_html").width() > 0 && $(parent.parent.document).find("#orign_popiframe").width() > 0)
				) { // Window Popup = > Modal Popup
		    	
				// 센터 정렬
				var windowX = (screen.width - gapWidth)/2;
				var windowY = (screen.height - (gapHeight + winpopMargin))/2 - 20;
				parent.window.moveTo(windowX,windowY);
				
				// Winpopup에 layer popup잔상이 남아서 setTimeout설정
				setTimeout(
						function resizeToWinPop() {
							parent.window.resizeTo(gapWidth, gapHeight + winpopMargin); 
							parent.window.focus();  
						},100);
	 
			} else {
				//MODI
				if ($(parent.parent.parent.document).find(".pop_html").width() != null ||
						($(parent.parent.document).find(".pop_html").width() > 0 || $(parent.parent.document).find("#orign_popiframe").width() > 0)
					) { 
					
					return;
		 
				}else{
					$(parent.parent.document).find("#popiframe").attr("width",$(parent.document).find("#orign_popiframe").width());
					$(parent.parent.document).find("#popiframe").attr("height",$(parent.document).find("#orign_popiframe").height());
					
					//레이어 팝업 세로/가로 가운데 위치
					$(parent.parent.document).find(".layer_popup").css({
						marginTop : "-"+(($(parent.document).find("#orign_popiframe").height() + 4)/2) + "px",
						marginLeft : "-"+(($(parent.document).find("#orign_popiframe").width() + 4)/2) + "px"
					});
				}
			}
		}
	} catch(e) {}
	
	$(parent.document).find(".layer_popup,.layer_popup_bg").fadeOut(500);
	
	/* Focus Return*/
//	$(parent.document).find(".current_btn").focus();
//	$(parent.document).find(".current_input").focus();
//	/* className Rollback*/
//	$(parent.document).find(".current_btn").attr("class", "input_seach_btn");
//	$(parent.document).find(".current_input").attr("class", "")
    
	//$(parent.document).find(".focusElem").focus().removeClass("focusElem");
    
    $(parent.document).find(".focusElem").focus();
    //Ocean Import > Master B/L > OIM B/L Entry의 Shipper (Code, Name구조) 에서 팝업을 닫는 순간 Name 값이 사라지는 문제로 우선 주석 처리함.
    //var val =  $(parent.document).find(".focusElem").val();
    //$(parent.document).find(".focusElem").val(val);
    $(parent.document).find(".focusElem").removeClass("focusElem");
    
}

/* [20140709 OJG] - Callback 함수가 많을 경우 사용하기위한 함수.
function ComClosePopup(retArray){
	var returnFunc = parent.callBackFunc;
	var popupId = parent.popupId;
	
	if(returnFunc != null && returnFunc != undefined && returnFunc != ""){
		if(popupId != null && popupId != undefined && popupId != ""){
			eval("parent."+returnFunc  + "(parent.popupId,  retArray);");
		}else{
			eval("parent."+returnFunc  + "(retArray);");
		}
	}
	$(parent.document).find(".layer_popup,.layer_popup_bg").fadeOut(100);
}
*/
/**
 * 인자로 받은 HTML태그(Object) 오브젝트,IBMultiCombo의 value를 리턴한다. <br>
 * &lt;input type="radio"&gt;의 경우 같은이름의 여러개 Radio컨트롤 중 선택(체크)된 하나의 Radio컨트롤의 value를 반환한다. <br>
 * &lt;input type="checkbox"&gt;의 경우 체크되었을때 컨트롤의 value를 반환한다. <br>
 * &lt;select&gt;의 경우 선택된 Item의 value를 반환한다. <br>
 * &lt;select multiple&gt;의 경우 여러개 선택된 Item의 value를 "|"로 연결하여 반환한다. <br>
 * 그외의 경우 value를 반환한다. <br>
 * <br><b>Example :</b>
 * <pre>
 *     ret = ComGetObjValue(txtName)         //결과 : "한진해운"
 *     ret = ComGetObjValue(sltCity)         //결과 : "04"
 *     ret = ComGetObjValue(rdoCity)         //결과 : "01"
 *     ret = ComGetObjValue(chkYn)           //결과 : "Y"
 *     ret = ComGetObjValue(sltCityMulti)    //결과 : "01|02|04" 3개 Item이 선택된 경우
 * </pre>
 * @param {object} obj    필수,HTML태그(Object) 오브젝트
 * @return string,HTML태그(Object) 오브젝트의 value
 * @see #ComGetObjText
 * @see #ComSetObjValue
 */
function ComGetObjValue(obj){
    try {
        //아래는 HTML오브젝트

        var sType = obj.type;
        //type을 읽을수 있다는것은 Radio전체가 아니라 radio[0]... 임
        if (sType=="radio") {
            if (obj.name == null || obj.name=="") {
                if (obj.checked) return obj.value;
                else return "";
            }
            obj = document.all[obj.name];
        //Radio전체로는 obj.type으로 알수 없음.  radio[0].. 등 만 알수 있음
        }else if(obj.type == undefined && obj.length != undefined && obj[0].type == "radio") {
            sType = "radio";
        }

        switch (sType) {
            case "radio":
                if (obj.length != null) {
                    for(var i=0; i<obj.length; i++) {
                        if (obj[i].checked) return obj[i].value;
                    }
                } else {
                    if (obj.checked) return obj.value;
                }
                break;
            case "checkbox":
                if (obj.checked) return obj.value;
                break;
            case "select-one":
                if(obj.selectedIndex >= 0)  return obj[obj.selectedIndex].value;
                break;
            case "select-multiple":
                var sRet = "";
                for(var idx= 0; idx<obj.length; idx++) {
                    //선택된 모든 Item의 value를 "|"로 연결한다.
                    if (obj.options[idx].selected) sRet += "|" + obj.options[idx].value;
                }
                if (sRet == "") return "";
                return sRet.substr(1);  //맨앞의 "|"를 제거
            default:
                if (obj.value != undefined) return obj.value;
        }

        if(obj !=null && obj.Version && obj.Version()!=""){
        	return obj.GetSelectCode();
        }

    } catch(err) { ComFuncErrMsg(err.message); }

    return "";
}

/**
 * 인자로 받은 HTML태그(Object)의 다음 HTML태그(Object)로 포커스를 이동한다.<br>
 * 인자를 설정하지 않으면 event.srcElement를 Object로 처리한다. <br>
 * <br><b>Example :</b>
 * <pre>
 *     ComSetNextFocus(form.txtDate1); 	//form.txtDate1의 다음 Object인 form.txtDate2로 포커스를 이동한다.
 * </pre>
 * @param {object} obj     필수,HTML태그(Object)
 * @see #ComAlertFocus
 * @see #ComSetFocus
 * @see #ComKeyEnter
 */
function ComSetNextFocus(obj) 
{
    try {
    	if (obj==null || obj==undefined) obj = ComGetEvent();
    	if (obj==null) return;
        
		var objs   = document.all;

		//sourceIndex속성은 obj의 document.all의 순번임
		for (var i=obj.sourceIndex+1; i<objs.length; i++) {
    		try { 
    			//Name=null or Type=null인 것들은 거의 Editable인것이 아님
    			if (objs[i].getAttribute("name") == null || objs[i].getAttribute("type") == null) continue;

    			//disabled이거나 readOnly일때 그 다음 컨트롤 찾기
    			if (objs[i].getAttribute("readOnly") || objs[i].getAttribute("isDisabled")) continue;
    			
    			//button일때 다음 컴트롤 찾기
    			if (objs[i].tagName.toLowerCase()=="button") continue;

    			objs[i].focus(); 
                break;
    		} catch(error) {;}
		}
	
    } catch(err) { ComFuncErrMsg(err.message); }
    return true;
}

function setFieldValue(obj, value){
	if($(obj).is("select")){
		if(value != ""){
			$(obj).val(value);
		}
	}else if($(obj).is("input:radio")){
		$('form').find("input:radio[name='" + $(obj).attr("name") + "']").each(function(){
			if(value != ""){
				if($(this).val() == value){
					$(this).prop('checked', true);
				}
			}
		});
	} else {
		$(obj).val(value);
	}
}


function getParam(url, paramName){
	var result = "";
	if (url != null && url != undefined) {
		if(url.indexOf(paramName + "=") > 0){
			result = url.substring(url.indexOf(paramName + "=") + paramName.length + 1, url.length);
			if(result.indexOf("&") > 0){
				result = result.substring(0, result.indexOf("&"));
			}
		}
	}
	return result;
}

function htmlDecode(value){
	return (typeof value === 'undefined') ? '' : $('<div/>').html(value).text();
}
/**
 * TinLuong DOU Modification for WMS 20150710
 * 인자로 받은 HTML태그(Object)의 사용 가능/불가능 상태를 변경한다. <br>
 * &lt;input type="text"&gt;와 &lt;input type="password"&gt;의 경우 readOnly속성과 backgroundColor,color를 변경하고,  <br>
 * &lt;img&gt;의 경우 disable속성과  cursor,filter를 변경한다. <br>
 * 그외 HTML태그(Object) disable속성을 변경한다. <br>
 * <br><b>Example :</b>
 * <pre>
 *     ComEnableObject(txtName,  true);   // 결과 : &lt;input type="text" name="txtName"&gt;을 enable 상태로 설정한다.
 *     ComEnableObject(txtName,  false);  // 결과 : &lt;input type="text" name="txtName"&gt;을 disable 상태로 설정한다.
 *     ComEnableObject(btn_save, true);   // 결과 : &lt;img name="btn_save"&gt;을 enable 상태로 설정한다.
 *     ComEnableObject(btn_save, false);  // 결과 : &lt;img name="btn_save"&gt;을 disable 상태로 설정한다.
 * </pre>
 * @param {object} obj     필수,대상 HTML태그(Object)
 * @param {bool}   bEnable 필수,사용 가능/불가능 여부를 true/false로 설정한다.
 * @return 없음
 * @see #ComEnableManyObjects
 */
function ComEnableObject(obj, bEnable)
{
    try {
    	//OFVFOUR-8041 [PQC][Putaway Entry] The system shows error when clicking the IB Complete No. hyperlink
    	if(!obj){
    		return;
    	}
    	//disabled나 readOnly 설정하기
        switch( obj.type ) {
            case "password" :
            case "text" :
            	obj.readOnly = !bEnable;
                break;
            default:
                obj.disabled = !bEnable;
        }

		//설정에 따라 css 처리하기
        switch( obj.type ) {
            case "select-one" :
            case "text" :
                if (bEnable){
                    //if (obj.className=="input2_1"){	//회색바탕 - 필수입력 빨강색
                	if (obj.className=="input2"){	//회색바탕 - 필수입력 빨강색
                    	obj.className = "input2";	//흰색바탕 - 필수입력 빨강색
                    } else {
                    	obj.className = "input";    //흰색바탕
                    }
                } else {
                    if (obj.className=="input2"){	//희색바탕 - 필수입력 빨강색
                    	//obj.className = "input2_1";	//회색바탕 - 필수입력 빨강색
                    	obj.className = "input2";	//회색바탕 - 필수입력 빨강색
                    } else {
                    	obj.className = "input2";   //회색바탕
                    }
                }
                break;

            case "textarea":
                if (bEnable){
                	obj.className = "textarea";
                } else {
                	obj.className = "textarea2";
                }
                break;

			default :
                if (obj.tagName=="IMG") {
                    if (bEnable){
                        obj.style.cursor = "hand";
                        obj.style.filter="";
                    } else {
                        obj.style.cursor = "default";
                        obj.style.filter="progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)";
                    }
                }
        }

    } catch(err) { ComFuncErrMsg(err.message); }
}

function ComBtnEnable(name) {
 	var obj = ComGetObject(name);
	ComEnableObject(obj, true);
 }

function ComBtnDisable(name){
	var obj = ComGetObject(name);
	ComEnableObject(obj, false);
 }

//chrome, FireFox모두 처리되기 위함
function ComGetObject(sName){
	if (document.getElementById(sName)!=null) return document.getElementById(sName);
	if (document.all(sName)!=undefined) return document.all(sName);
	return $("#"+sName);
}
