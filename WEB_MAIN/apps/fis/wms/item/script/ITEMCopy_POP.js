function doWork(srcName){
    var formObj=document.form;
    switch(srcName){
        case "SAVE":
            btn_Save();
            break;
        case "CLOSE":
            ComClosePopup();
            break;
    }
}

function btn_ctrt(){
    var formObj=document.form;
    var sUrl="ContractRoutePopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;

    callBackFunc = "setCtrtNoInfo";
    modal_center_open(sUrl, callBackFunc, 1050, 580,"yes");
}

function setCtrtNoInfo(rtnVal){
    var formObj=document.form;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
        return;
    }else{
        var rtnValAry=rtnVal.split("|");
        formObj.ctrt_no.value=rtnValAry[0];//full_nm
        formObj.ctrt_nm.value=rtnValAry[1];//full_nm
    }
}

function searchTlCtrtInfo(){
    var formObj=document.form;
    if(formObj.ctrt_no.value != "" || formObj.ctrt_nm.value != "" ){
        ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+formObj.ctrt_no.value, './GateServlet.gsl');
    }
}

function resultCtrtInfo(reqVal){
    var formObj=document.form;
    var doc=getAjaxMsgXML(reqVal);
    formObj.ctrt_nm.value="";
    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            //???? ??? Parent? ???
            var rtnArr=doc[1].split('^@');
            if(rtnArr[0] != ""){
                formObj.ctrt_nm.value=rtnArr[0];
            }
        }
    }
}

function btn_Save(){
    var formObj=document.form;
    if(formObj.ctrt_no.value == ""){
        return alert("Please select a Contract No.!");
    }
    if(formObj.ctrt_no.value == parent.rtnary[0]){
        return alert("Please select another Contract No\n The same contract cannot be selected.");
    }

    var returnFunc = parent.callBackFunc
        , retArray = ["YES", formObj.ctrt_no.value]
        , onceTime = true;
    $(parent.document).find(".layer_popup,.layer_popup_bg").fadeOut(500, "swing", function(){
        if(returnFunc != null && returnFunc != undefined && returnFunc != "" && onceTime){
            onceTime = false;
            eval("parent."+returnFunc  + "(retArray);");
        }
    });
    $(parent.document).find(".focusElem").focus();
    $(parent.document).find(".focusElem").removeClass("focusElem");
}