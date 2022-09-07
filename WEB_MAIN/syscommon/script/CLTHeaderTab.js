//#2899 [LBS]KG to LB, CBM to CFT 변환 상수처리
//#5665 [BINEX-LA] Cargo Manifest weight & measurement values : 2.20462262186 => 2.20462262185
var CNVT_CNST_KG_LB = 2.20462262185;

var CNVT_CNST_CBM_CFT = 35.3165;

//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
//- Forwarding에서 사용하는 환산값 (35.3165) 보다 아래 환산값 (34.3147) 비교적 정확수치임.
//- Forwarding에서 사용하는 값을 바꾸기에는 영향도가 있으므로 일단 별도 관리키로 함
var WMS_CNVT_CNST_CBM_CFT = 35.3147;
//- INCH to CM
var WMS_CNVT_CNST_INCH_CM = 2.54;
//- CBM, CBF 의 자리수는 기본적으로 소수점 3자리이지만 TB_SYS_PROP의 "WMS_CBM_POINT_COUNT" 에 정의한 값을 사용키로 함.
var WMS_CBM_POINT_COUNT = parent.WMS_CBM_POINT_COUNT == "" ? "3" : parent.WMS_CBM_POINT_COUNT;
//- Weight 의 자리수도 공통관리하기 위함.
var WMS_WGT_POINT_COUNT = "3";
//- Length 의 자리수도 공통관리하기 위함.
var WMS_LEN_POINT_COUNT = "2";
//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)

document.onkeydown=document_onkeydown;
function document_onkeydown(){
    try{
        if(ComGetEvent("keycode")==27){
            window.event.returnValue = false;
            return;
        }

        if(ComGetEvent("keycode")!=8) return true;
        var se = ComGetEvent();
        if(se.readOnly!=null && !se.readOnly) return true;
        if (se.isTextEdit!=null && se.isTextEdit) return true;
        if (se.isContentEditable!=null && se.isContentEditable) return true;
        ComJsEventStop();
        return false;
    }catch(err) {
        return false;
    }
}

function moveCaretToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function doBtnAuthority(type) {
    var all = document.all;
    for (var i=0; i<all.length; i++) {
        if (all[i].getAttribute("btnAuth") != null) {
            var tmpBtnAuth = all[i].getAttribute("btnAuth");
                if (tmpBtnAuth == "Y") {
                    all[i].style.display = "";
            }
        }
    }

    var tmpType = type.split(",");
    for (var j=0; j<all.length; j++) {
        if (all[j].getAttribute("btnAuth") != null) {
            var tmpBtnAuth1 = all[j].getAttribute("btnAuth");
            for (var k=0; k<type.length; k++) {
                if (tmpBtnAuth1 == tmpType[k]) {
                    all[j].style.display = "";
                }
            }
        }
    }
}

//LHK, 20141029 #44986 [BINEX]Office - All Option
function setOfficeAllOption(obj){
    var $selObj = $(obj);
    var $optArray = $selObj.find('option');

    obj.value = UserOfcCd;

    if ($optArray && $optArray.length > 1 && ofcFlg == 'Y') {
        obj.value = '';
    }

    $optArray.each(function() {
         var tempValue = $(this).val();
         if (tempValue == obj.value) {
             $(this).selected;
         }
     });
}

//#1624 - [Split - 1] #36226 - [JC2] OPUS Forwarding [Save] Changes
var saveCloseBtnYn = "N";
var btnClickFlag = false;
var saveConfirmMsg = "FMS_COM_CFMSAV";
var saveCloseConfirmMsg = "FMS_COM_CFMSAVCLS";
var saveMsg = saveConfirmMsg;
//#1251 [Sales Report Entry] Don't auto close UI after save
var saveCloseFlag = "N";
//#5878 [BNX-JAPAN] BNX C/S 요구사항
var saveCloseUid = "";//

function saveCloseBtnClick(){
    btnClickFlag = true;
    saveCloseFlag = "Y";
    saveMsg = saveCloseConfirmMsg;
    //#5878 [BNX-JAPAN] BNX C/S 요구사항
    var prTab = parent.window[_MTAB];
    saveCloseUid = prTab.aTabItemList[prTab.GetSelectedIndex()].uid;

    doWork('SAVE');
    doWork('ADD');
    doWork('MODIFY');
    doWork('CLOSE_MODIFY');

    saveCloseBtnYn = "Y";
    btnClickFlag = false;
}

function setSaveConfirmMsg(srcName){
    if(!(srcName == "SAVE" || srcName == "ADD" || srcName == "MODIFY" || srcName == "CLOSE_MODIFY")) return;

    if(btnClickFlag == false){
        saveMsg = saveConfirmMsg;
        saveCloseBtnYn = "N";
    }
}

function setTabTitle(docNo){
    var title = document.title;
    var arrTitle = title.split(" - ");

    if(arrTitle.length > 1){
        if(docNo != ""){
            // document.title = docNo + " - " + arrTitle[1];
            document.title = docNo;
        } else {
            document.title = arrTitle[1];
        }
    } else {
        if(docNo != ""){
            // document.title = docNo + " - " + document.title;
            document.title = docNo;
        } else {
            document.title = document.title;
        }
    }

    var prTab = parent.window[_MTAB];
    // prTab.SetTabTitle(prTab.aTabItemList.length - 1, document.title);
    prTab.SetTabTitle(prTab.GetSelectedIndex(), document.title);
    //var itmIdx = prTab.aTabItemList.findIndex(findTabByUrl, "./" + window.location.toString().split('/').pop());
    //prTab.SetTabTitle(itmIdx, document.title);
}