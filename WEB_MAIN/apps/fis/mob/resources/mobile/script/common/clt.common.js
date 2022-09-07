/**
 * @namespace clt
 */

/**
 * clt 공통 API
 * @namespace   comm
 * @memberof    clt
 */

// StringBuffer Start ------------------------
var StringBuffer = function() {
    this.buffer = new Array();
};

StringBuffer.prototype.append = function(obj) {
    this.buffer.push(obj);
};

StringBuffer.prototype.toString = function() {
    return this.buffer.join("");
};
// StringBuffer End ------------------------

var clt = clt || {};
var progressCount = 0;
var popBlurCheck = false;
(function() {
    (function(clt) {
        clt["comm"] = (function() {
            var cc = {},
                cu = {},
                groupSeparator = ",",
                decimalSeparator = ".",
                _useLog = true,
                __sesList__ = ["sesUserId",
                               "sesUserNm",
                               "sesComp",
                               "sesCompNm",
                               "sesManageLvl",
                               "sesUsergroup",
                               "sesLang",
                               "sesWhse",
                               "sesWhseNm"];

            return {
                /**
                 * module initialize
                 * @memberOf   clt.comm#
                 * @method     init
                 * @private
                 * @returns    {object}         clt.comm object
                 */
                init: function() {
                    cc = this;

                    // create module shotcut
                    if (typeof clt.util !== "undefined") {
                        cu = clt.util;
                    }

                    return this;
                },

                _intervals: [],

                /**
                 * util module include
                 * @memberOf   IBSheet
                 * @method     MethodName
                 * @public
                 * @param      {type}     name       desc
                 * @returns    {type}                desc
                 */
                _setUtilModule: function(obj) {
                    cu = obj;
                },

                /**
                 * ajax 기본 모듈
                 * @memberOf   clt.comm#
                 * @method     ajax
                 * @private
                 * @param      {object}     opt                     설정 옵션
                 * @param      {string}     [opt.type = 'POST']     서버 요청 방법
                 *
                 * | Enum | Description       |
                 * |------|-------------------|
                 * | GET  | GET 방식           |
                 * | POST | POST 방식          |
                 *
                 * @param      {boolean}    [opt.blockUI = true]    blockUI 사용여부
                 * @param      {boolean}    [opt.async = true]      비동기 요청 여부
                 * @param      {object}     [opt.data]              전달할 param 객체
                 * @param      {function}   [opt.callback]          callback function
                 */
                ajax: function(opt) {
                    var url = "/serviceEndpoint/json",
                        blockUI = true,
                        menucodeAuth = "",
                        data = {},
                        headers = {
                            // "Content-Type":"application/json; charset=UTF-8",
                            // "Accept":"application/json, text/javascript, */*; q=0.01"
                        };

                    // TODO : valid arguments
                    if (typeof opt === "undefined") {
                        opt = {};
                    }

                    data = opt.data;

                    if (typeof top.ibMenuTab === "object") {
                    	menucodeAuth = top.getMenuID();
                    }
                    data.menucodeAuth = menucodeAuth;

                    opt.async = ((typeof opt.async === "undefined") ? true : !!opt.async);      // async 옵션
                    blockUI = ((typeof opt.blockUI === "undefined") ? true : !!opt.blockUI);    // blockUI 사용 여부

                    $.ajax({
                        type: opt.type || 'POST',
                        async: opt.async,
                        processData: false,
                        dataType: 'json',
                        data: JSON.stringify(data),
                        url: url,
                        beforeSend: function() {
                            // blockUI : open
                            if (blockUI) {
                                cc.showBlockUI();
                            }
                        },
                        headers: headers,
                        success: function(response) {
                            var key = "",
                                header = "",
                                dataset = "",
                                resultCode = 0;

                            for (key in response) {
                                if (key == "header") {
                                    header = response[key];
                                } else {
                                    dataset = response[key];
                                }
                            }

                            resultCode = response.header.returnCode;

                            if (resultCode != 0) {
                                // TODO : display error message
                                //cc.alert("ERR !! resultCode : " + resultCode + " , errcode : " + response.header.messageCode);
                                cc.alert(response.header.messages[0]);
                            }

                            if (typeof opt.callback === "function") {
                                opt.callback(resultCode, header, dataset);
                            }
                        },
                        error: function(data, status, err) {
                            if (data.status == 901) {
                                window.location.href = "/eslwms/";
                            } else if (err === "Forbidden") {
                                cc.alert(status + " : " + [
                                    err,
                                    "로그인을 해야 합니다."
                                ].join(" : "));

                                var tops = top || window;
                                var url = location.href.split("/");
                                var afurl = "/eslwms/";

                                $.each(url, function(i,val)
                                {
                                	if(val.toUpperCase().substring(0,3) === "MOB")
                                	{
                                		afurl= "/eslwms/mobile/login.html";
                                		return false;
                                	}
                                });
                                tops.location.replace(afurl);

                            } else {
                                cc.alert(status + " : " + err);
                                if (typeof opt.callback === "function") {
                                    opt.callback(status);
                                }
                            }
                        },
                        complete: function() {
                            // blockUI : close
                            if (blockUI) {
                                cc.hideBlockUI();
                            }
                        }
                    });

                },

                /**
                 * IBSheet 를 생성 한다.
                 * @memberOf    clt.comm#
                 * @method      createGrid
                 * @public
                 * @param       {object}        opt                                             생성 옵션 객체
                 * @param       {string}        opt.id                                          IBSheet id
                 * @param       {string}        opt.renderTo                                    IBSheet 를 생성할 컨테이너 객체의 id
                 * @param       {string}        opt.width                                       IBSheet 의 width (px 또는 % 단위를 포함 하여야 한다.)
                 * @param       {string}        opt.height                                      IBSHeet 의 height (px 또는 % 단위를 포함 하여야 한다.)
                 * @param       {string}        opt.ref                                         조회 / 저장시 참조할 OMM property 명
                 * @param       {boolean}       opt.fitColWidth                                 셀의 resize 처리를 하지 않고자 할때 설정(default : true)
                 * @param       {object}        [opt.detail]                                    detail IBSheet 설정 객체
                 * @param       {object}        opt.detail.sheet                                detail IBSheet의 id
                 * @param       {array}         opt.detail.cols                                 detail 조회 조건이 되는 컬럼 SaveName 의 배열집합
                 * @param       {array}         opt.detail.linkCols                             master에 선택되하면 detail이 조회되는 SaveName 의 배열집합
                 * @param       {object}        opt.detail.header                               OMM 헤더 객체
                 * @param       {string}        opt.detail.header.application                   application 명
                 * @param       {string}        opt.detail.header.service                       service 명
                 * @param       {string}        opt.detail.header.operation                     operation 명
                 * @param       {string}        opt.detail.cond                                 cond 객체의 집합
                 * @param       {string}        opt.detail.reqOMM                               요청 OMM property 명
                 * @param       {object}        opt.init                                        IBSheet 초기화 정보를 담고있는 객체 배열 집합
                 * @param       {object}        opt.init.Cfg                                    IBSheet config 설정 정보 (세부 항목은 IBSheet 매뉴얼 참고)
                 * @param       {array-object}  opt.init.Cols                                   IBSheet 컬럼 설정 정보 (세부 항목은 IBSheet 매뉴얼 참고)
                 * @param       {object}        [opt.editPopup]                                 IBSheet 입력 팝업 설정 객체
                 * @param       {number}        [opt.editPopup.width = 500]                     팝업 다이얼로그 너비
                 * @param       {number}        [opt.editPopup.height = 500]                    팝업 다이얼로그 높이
                 * @param       {array-object}  opt.editPopup.fields                            필드 정보 객체
                 * @param       {object}        opt.editPopup.fields.title                      그룹 타이틀
                 * @param       {boolean}       [opt.editPopup.fields.collapsed = false]        생성시 그룹 필드 숨김 여부
                 * @param       {array}         opt.editPopup.fields.cols                       그룹에 포함할 컬럼명 배열집합
                 * @param       {function}      [opt.callback]                                  callback 함수
                 */
                createGrid: function(opt) {
                    var grid,
                        colsInfo = [],
                        popupInfo = [],
                        editPopInfo = {},
                        col = {},
                        i = 0,
                        len = 0,
                        lang = "",
                        baseCfg = {
                            AutoFitColWidth: "search",
                            ChildPage: 10,
                            UseHeaderActionMenu: 1,
                            CountFormat: "TOTALROWS rows",
                            CountPosition: 3,
                            ColPage: 50
                        };

                    lang = top.__GLOBAL_PARAM__.sesLang;
                    if (typeof lang === "undefined") {
                        lang = "";
                    }

                    // opt.locale 언어 넘어는 형식에 따라 구분 처리 필요, cn:중국어, jp:일본어, ko:한국어, en:영어
                    createIBSheet2(opt.renderTo, opt.id, opt.width, opt.height, lang);

                    grid = window[opt.id];

                    // number separator 설정
                    grid.Lang.Format.GroupSeparator = groupSeparator;
                    grid.Lang.Format.DecimalSeparator = decimalSeparator;

                    // initialize ibsheet before
                    opt.init.Cfg = opt.init.Cfg || {};
                    $.extend(true, baseCfg, opt.init.Cfg);
                    opt.init.Cfg = baseCfg;

                    colsInfo = opt.init.Cols;

                    // edit popup infomation collect && setup
                    if (typeof opt.editPopup !== "undefined") {
                        editPopInfo = opt.editPopup;

                        cc._triggerGridEditPopup(grid, $.extend(true, editPopInfo, {
                            title: opt.title,
                            cols: colsInfo,
                            grid: grid
                        }));
                    }

                    // column popup infomation collect && setup
                    for (i = 0, len = colsInfo.length; i < len; i++) {
                        col = colsInfo[i];

                        if (typeof col.PopupCond !== "undefined") {
                            popupInfo.push({
                                col: col.SaveName,
                                title: col.Header,
                                info: col.PopupCond
                            });
                        }

                        var exceptType = {
                        		"CheckBox": 1,
                        		"DelCheck": 1,
                        		"DummyCheck": 1
                        	};

                        if (exceptType[col.Type]) {
                        	col.Focus = 0;
                        }
                    }

                    cc._trigerGridColPopup(grid, popupInfo);

                    // initialize ibsheet
                    IBS_InitSheet(grid, opt.init);

                    // basic config
                    grid.searchRef = opt.ref;
                    grid.objectType = "ibsheet";


                    // basic setup
                    grid.InitComboNoMatchText(1, "");

                    if (typeof opt.callback === "function") {
                        opt.callback(grid);
                    }

                    // detail grid mapping
                    if (typeof opt.detail === "object") {

                        grid._detailSheets = opt.detail.sheet;

                        cc._triggerDetailGrid(grid, opt.detail);
                    }

                    if (typeof opt.fitColWidth === "undefined") {
                        opt.fitColWidth = true;
                    }

                    if (opt.fitColWidth) {
                        grid.FitColWidth();
                        grid.SetExtendLastCol(1);

                        cc._triggerResizeGrid(grid);
                    }

                    cc._triggerInputSpaceKey(grid);

                    return grid;
                },

                _triggerInputSpaceKey: function(grid) {
                	var userKeyUp = window[grid.id + "_OnKeyUp"];
                    window[grid.id + "_OnKeyUp"] = function(r, c, k, s) {
                        var exceptType = {
                        		"CheckBox": 1,
                        		"DelCheck": 1,
                        		"DummyCheck": 1
                        	},
                        	type = grid.GetCellProperty(r, c, "Type");

                    	if (k == 13 && exceptType[type]) {
                    		if (grid.LastRow() >= (r + 1)) {
                        		grid.SetSelectRow(r + 1);
                    		}
                    	}

                        if (typeof userKeyUp === "function") {
                        	userKeyUp(r, c, k, s);
                        }
                    };
                },

                /**
                 * IBMDITab 을 생성 한다.
                 * @memberOf    clt.comm#
                 * @method      creatTab
                 * @public
                 * @param       {object}        opt                       생성 옵션 객체
                 * @param       {string}        opt.id                    IBTab ID
                 * @param       {string}        opt.renderTo              IBTab 를 생성할 컨테이너 객체의 id
                 * @param       {string}        opt.width                 IBTab 의 width (px 또는 % 단위를 포함 하여야 한다.)
                 * @param       {string}        opt.height                IBTAB 의 height (px 또는 % 단위를 포함 하여야 한다.)
                 * @param       {string}        opt.theme                 IBTAB 의  (메뉴만 사용)
                 * @param       {function}      [opt.callback]            callback 함수
                 */
                createTab: function(opt) {
                    var tab,
                        theme,
                        i = 0,
                        len = 0,
                        strBtn = "";

                    if (!opt.theme) {
                        theme = "Main";
                    }

                    createIBMDITab2(opt.renderTo, opt.id, opt.width, opt.height, theme);

                    tab = window[opt.id];

                    window[opt.id + "_OnloadTab2Finish"] = function() {

                        if (opt.theme) {
                            tab.Init(1, true, true, 'gif', false, false, true);
                        } else {
                            tab.Init(1, false, false, 'gif', false, false, false);
                        }

                        tab.SetTabItemLayout(1);
                        tab.SetTabUserWidth(150);

                        // 사용자 정의 버튼
                        tab.SetUserDefine(90);
                        strBtn  = "<img class='allClose' title='" + esl.comm.getLangMsg("CLOSE_ALL_TABS") + "' id='allClose' src ='/eslwms/script/ibmditab/Main/btn_allClose.png' onclick='allTabClose()' />";
                        strBtn += "<img class='selClose' title='" + esl.comm.getLangMsg("CLOSE_OTHER_TABS") + "' id='selClose' src ='/eslwms/script/ibmditab/Main/btn_selClose.png' onclick='selTabClose()' />";
                        strBtn += "<img class='favorite' title='" + esl.comm.getLangMsg("SAVE_BOOKMARK") + "' id='favoriteDelete' src ='/eslwms/script/ibmditab/Main/btn_favorite.png' onclick='favoriteUpdate(\"favoriteSave\",\"favoriteDelete\")' />";
                        strBtn += "<img class='favorite d_none' title='" + esl.comm.getLangMsg("SAVE_BOOKMARK") + "' id='favoriteSave' src ='/eslwms/script/ibmditab/Main/btn_favorite_on.png' onclick='favoriteUpdate(\"favoriteDelete\",\"favoriteSave\")' />";
                        tab.SetUserDefineSource(strBtn);

                        if (opt.title) {
                            for (i = 0, len = opt.title.length; i < len; i++) {
                                tab.InsertItem2(opt.titleId[i], opt.title[i], opt.url[i]);
                            }

                            tab.SetSelectedIndex(0);
                        }

                        if (opt.popMenuYn === "Y") {
                        	$("#_" + opt.popMenuId).click();
                        	showContent("", opt.popMenuId, opt.popMenuNm, opt.popMenuUrl);
                        }
                    };
                },

                /**
                 * IBChart 를 생성 한다.
                 * @memberOf    clt.comm#
                 * @method      createChart
                 * @public
                 * @param       {object}        opt                                 생성 옵션 객체
                 * @param       {string}        opt.id                              IBSheet id
                 * @param       {string}        opt.renderTo                        IBSheet 를 생성할 컨테이너 객체의 id
                 * @param       {string}        opt.width                           IBSheet 의 width (px 또는 % 단위를 포함 하여야 한다.)
                 * @param       {string}        opt.height                          IBSHeet 의 height (px 또는 % 단위를 포함 하여야 한다.)
                 * @param       {string}        opt.ref                             조회 / 저장시 참조할 OMM property 명
                 * @param       {object}        opt.init                            초기화 설정 정보 객체
                 * @param       {function}      [opt.callback]                      callback 함수
                 */
                createChart: function(opt) {
                    var chart;

                    createIBChart2(opt.renderTo, opt.id, opt.width, opt.height);

                    chart = window[opt.id];

                    // initialize ibsheet before
                    chart.SetOptions(opt.init, 0);

                    if (typeof opt.callback === "function") {
                        opt.callback(chart);
                    }

                    return chart;
                },

                /**
                 * IBUpload 를 생성 한다.
                 * @memberOf    clt.comm#
                 * @method      createUpload
                 * @public
                 * @param       {object}        opt                                             생성 옵션 객체
                 * @param       {string}        opt.renderTo                                    IBUpload 를 생성할 컨테이너 객체의 id
                 * @param       {string}        opt.viewType                                    뷰어모드(default:icon, <icon, ibsheet>)
                 * @param       {string}        opt.iconMode                                    아이콘의 정렬 형태 ( icon, list, detail)
                 * @param       {string}        opt.theme                                       초기에 표시할 테마 설정
                 * @param       {string}        opt.autoUpload                                  파일 추가시 즉시 업로드를 수행할 지의 여부(default:true)
                 * @param       {string}        opt.limitFileCount                              한번에 전송할 파일 개수 제한
                 * @param       {string}        opt.limitFileSize                               한번에 전송할 개별 파일 사이즈 제한
                 * @param       {string}        opt.limitFileTotalSize                          한번에 전송할 전체 파일 사이즈 제한
                 * @param       {string}        opt.limitFileExt                                제약조건 파일 확장자(예: "jpg,jsp")
                 * @param       {string}        opt.limitFileExtMode                            limitFileExt 기술된 확장자를 허용(allow)/거부(deny)
                 * @param       {function}      [opt.callback]                                  callback 함수
                 * @example
                 * var opt = {
                 *     renderTo:"myUpload",
                 *     // viewType:"ibsheet", // sheet 연동시 사용
                 * };
                 *
                 * clt.comm.createUpload(opt);
                 */
                createUpload: function(opt) {
                    var target,
                        defaultOpt = {
                            iconMode           : "detail",
                            theme              : "Main",
                            autoUpload         : false,
                            limitFileCount     : -1,
                            limitFileSize      : -1,
                            limitFileTotalSize : 512000000,
                            limitFileExt       : "",
                            limitFileExtMode   : "deny",

                            onMessage: function (errNo, errMsg) {
                                if (errNo.substring(0, 3) == "ERR") {
                                    //alert(errMsg + "\n\n" + "error : " + errNo);
                                    cc.alert(errMsg);
                                }
                            },

                            onUploadFinish: function() {
                                 cc.alert(esl.comm.getLangMsg("INFO-002"));
                            }
                        };

                    // viewType
                    if (typeof opt.viewType === "undefined") {
                        opt.viewType = "icon";
                    }

                    $.extend(true, defaultOpt, opt);

                    target = $("#" + opt.renderTo).IBUpload(defaultOpt);

                    if (typeof opt.callback === "function") {
                        opt.callback(target);
                    }

                    return target;

                },

                /**
                 * 서버에 파일을 업로드 한다.
                 * @memberOf   clt.comm#
                 * @method     uploadFile
                 * @public
                 * @param      {object}     opt                             조회 옵션 객체
                 * @param      {object}     opt.header                      OMM 헤더 객체
                 * @param      {string}     opt.header.application          application 명
                 * @param      {string}     opt.header.service              service 명
                 * @param      {string}     opt.header.operation            operation 명
                 * @param      {string}     opt.reqOMM                      요청 OMM property 명
                 * @param      {string}     opt.fileTarget                  데이터 추출 대상 id
                 * @param      {array}      opt.cond                        조회 조건을 담고있는 form 객체의 id 또는 json 객체의 배열 집합
                 *
                 * @example
                 *
                 * $("#uploadFile").click(function() {
                 *     var opt = {
                 *         header: {
                 *             "application": "EslADM",
                 *             "service"    : "SvcSAMFileUpload01",
                 *             "operation"  : "testFile"
                 *         },
                 *         reqOMM: "ADMLanguageCondOMM",
                 *         fileTarget: "myUpload",
                 *         cond:{"test":"aaa"},
                 *
                 *         // 파일 추가한 내용 ( 서버응답문 )
                 *         onUploadData: function(serverResponeObject, serverResponeText) {
                 *             alert(serverResponeText);
                 *             alert(serverResponeObject.header.locale);
                 *         },
                 *
                 *         // 파일 추가한 내용 얻어보기
                 *         onAddFile: function (uploadFiles, browserFilesObject) {
                 *             alert(uploadFiles);
                 *         }
                 *     };
                 *     clt.comm.uploadFile(opt);
                 * });
                 */
                uploadFile: function(opt) {
                    var target = opt.fileTarget;

                    // input 항목 하나를 추가
                    $("#"+target).IBUpload("extendParamUpload", "bizData", JSON.stringify(opt));

                    // 서버로 업로드 처리 실행
                    $("#"+target).IBUpload("upload", opt);

                },

                /**
                 * 서버에 데이터를 요청 후 응답데이터를 target 객체에 로드 한다.
                 * @memberOf   clt.comm#
                 * @method     search
                 * @public
                 * @param      {object}     opt                             조회 옵션 객체
                 * @param      {object}     opt.header                      OMM 헤더 객체
                 * @param      {string}     opt.header.application          application 명
                 * @param      {string}     opt.header.service              service 명
                 * @param      {string}     opt.header.operation            operation 명
                 * @param      {string}     opt.reqOMM                      요청 OMM property 명
                 * @param      {array}      opt.target                      응답 데이터를 load 할 대상의 배열 집합
                 * @param      {function}   [opt.callback]                  callback 함수
                 *
                 * | Description          |
                 * |----------------------|
                 * | IBSheet 의 id 명     |
                 * | form 객체의 id 명    |
                 *
                 * @param      {array}     opt.cond                         조회 조건을 담고있는 form 객체의 id 또는 json 객체의 배열 집합
                 * @example
                 * ```
                 * // ibsheet 일반 조회
                 * clt.comm.search({
                 *     header: {
                 *         "application": "CltADM",
                 *         "service": "SvcADM0101",
                 *         "operation": "searchProgramManagement"
                 *     },
                 *     reqOMM: "ProgramCondOMM",
                 *     cond: ["condForm"],          // 조회조건을 담고있는 form 객체의 id
                 *     target: "mySheet"            // 로드 대상 IBSheet 의 id
                 * });
                 *
                 * // 단일 서비스로 두개의 ibsheet에 데이터 로드
                 * clt.comm.search({
                 *     header: {
                 *         "application": "CltADM",
                 *         "service": "SvcADM0101",
                 *         "operation": "searchProgramManagement"
                 *     },
                 *     reqOMM: "ProgramCondOMM",
                 *     cond: ["condForm"],                  // 조회조건을 담고있는 form 객체의 id
                 *     target: ["mySheet1", "mySheet2"]     // 로드 대상 IBSheet 의 id 의 배열 집합
                 * });
                 * ```
                 *
                 */
                search: function(opt) {
                    var data = {},
                        condObj = {},
                        dataTo = [],
                        targetObject = [],
                        chkObj = [],
                        formProp = "",
                        i = 0,
                        len = 0,
                        j = 0,
                        colsLen = 0,
                        sheetObj = "",
                        colObj = [],
                        targetSheets = [],
                        opts,
                        master,
                        target;

                    // valid arguments
                    opt = opt || {};

                    // target 설정
                    if (!cu.isArray(opt.target)) {
                        opt.target = [opt.target];
                    }

                    if (opt.cols) {
                        if (!cu.isArray(opt.cols)) {
                            opt.cols = [opt.cols];
                        }
                    }

                    for (i = 0, len = opt.target.length; i < len; i++) {
                        chkObj = cc._checkObject(opt.target[i]);
                        if (opt.cols) {
                            if (chkObj[0] === "select") {
                                dataTo.push(chkObj[0]);
                            } else {
                                dataTo.push("sheetcombo");
                            }

                            targetObject.push(opt.target[i]);

                            for (j = 0, colsLen = opt.cols.length; j < colsLen; j++) {
                                colObj.push(opt.cols[j]);
                            }
                        } else {
                            dataTo.push(chkObj[0]);
                            targetObject.push(chkObj[1]);
                        }
                    }

                    data.header = opt.header;
                    data[opt.reqOMM] = {};

                    if (typeof opt.cond === "function") {
                        opt.cond = opt.cond();
                    }

                    // set condition
                    if (!cu.isArray(opt.cond)) {
                        opt.cond = [opt.cond];
                    }

                    // condObj = opt.cond;
                    for (i = 0, len = opt.cond.length; i < len; i++) {
                        chkObj = cc._checkObject(opt.cond[i]);
                        if (chkObj[0] === "form") {
                            formProp = cc._getFormProperty(chkObj[1]);
                            $.extend(true, condObj, cc._formToJson(chkObj[1])[formProp]);
                        } else if (typeof chkObj[1] === "object") {
                            $.extend(true, condObj, opt.cond[i]);
                        }
                    }

                    // clear sheet
                    for (i = 0, len = dataTo.length; i < len; i++) {
                        if (dataTo[i] === "ibsheet") {
                            targetSheets.push(targetObject[i].id);
                            targetSheets = targetSheets.concat(cc._getTargetSheets(targetObject[i]));
                        }
                    }
                    for (i = 0, len = targetSheets.length; i < len; i++) {
                        if (typeof window[targetSheets[i]] !== "undefined") {
                            window[targetSheets[i]].RemoveAll();
                        }
                    }

                    // 조회 시작전 Grid 에 대한 focus 제어
                    if (Grids.Focused && typeof Grids.Focused.SetBlur === "function") {
                        Grids.Focused.SetBlur();
                    }

                    // condition log
                    /*
                    cc.log([
                        "search.condition",
                        condObj
                    ]);
                    */
                    data[opt.reqOMM] = condObj;

                    data =  cc._setLastSearchCond(dataTo , targetObject , data , opt);

                    cc.ajax({
                        data: data,
                        async: opt.async,
                        callback: function(res, head, dataset) {
                            if (res == 0) {
                                for (i = 0, len = dataTo.length; i < len; i++) {
                                    switch (dataTo[i]) {
                                        case "ibsheet":
                                        	//master = cc._findMasterSheet(targetObject[i]);
                                        	master = targetObject[i]._masterSheet;
                                        	target = targetObject[i];

                                        	if (typeof master === "string") {
                                        		master = window[master];
                                        	}

                                            // 조회 결과가 해당 Omms 가 없는 경우
                                            if( dataset[targetObject[i].searchRef] === undefined){
                                                targetObject[i].RemoveAll();    // 그리드에 데이타 행을 지운다
                                            } else {
                                                cc._loadIBSheet(targetObject[i], dataset[targetObject[i].searchRef], opt.reqOMM);
                                            }
                                            break;

                                        case "select":
                                            if (colObj.length > 1) {
                                                cc._loadSelectChainCombo(targetObject[i], dataset["selectCodeOmms"], colObj, opt.comboType, opt.callType);
                                            } else {
                                                cc._loadSelectCombo(targetObject[i], dataset["selectCodeOmms"], opt.comboType, opt.callType);
                                            }
                                            break;

                                        case "sheetcombo":
                                            if (colObj.length > 1) {
                                                cc._loadGridChainCombo(targetObject[i], dataset["selectCodeOmms"], colObj, opt.comboType);
                                            } else {
                                                cc._loadGridCombo(targetObject[i], dataset["selectCodeOmms"], colObj[i], opt.comboType, opt.emptyType);
                                            }
                                            break;

                                        case "form":
                                            cc._loadForm(targetObject[i], dataset[cc._getFormProperty(targetObject[i])]);
                                            break;

                                        default:
                                        	/*
                                            cc.log([
                                                "searchEnd-noTarget",
                                                res,
                                                dataset
                                            ]);
                                            */
                                            break;
                                    }
                                }

                            	if (master && typeof master.SetFocus === "function") {
                            		var i = 0,
                            			len = Grids.length,
                            			sel = master.GetSelectRow();
                            		if (!target._detailSheets && sel > 0) {

                            			master.SetSelectRow(sel);

                            			for (i = 0; i < len; i++) {
                            				if (Grids[i]) {
                            					Grids[i]._masterSheet = undefined;
                            				}
                            			}
                            		}
                            	}

                                // callback 함수 처리
                                if (typeof opt.callback === "function") {
                                    opt.callback(res, head, dataset);
                                }
                            }
                        }
                    });
                },

                /**
                 * 서버에 데이터를 요청 후 응답데이터를 target 객체에 로드 한다.
                 * @memberOf   clt.comm#
                 * @method     fileSearch
                 * @public
                 * @param      {object}     opt                             조회 옵션 객체
                 * @param      {object}     opt.header                      OMM 헤더 객체
                 * @param      {string}     opt.header.application          application 명
                 * @param      {string}     opt.header.service              service 명
                 * @param      {string}     opt.header.operation            operation 명
                 * @param      {string}     opt.reqOMM                      요청 OMM property 명
                 * @param      {string}     opt.ref                         조회시 참조할 OMM property 명
                 * @param      {array}      opt.target                      응답 데이터를 load 할 대상의 배열 집합
                 * @param      {array}      opt.cond                        조회 조건을 담고있는 form 객체의 id 또는 json 객체의 배열 집합
                 * @param      {function}   [opt.callback]                  callback 함수
                 * @example
                 * var opt = {
                 *     header: {
                 *         "application": "EslTMS",
                 *         "service": "SvcTMS068",
                 *         "operation": "searchPodFile"
                 *     },
                 *     reqOMM: "TMSPodCondOMM",
                 *     ref:"podFileOmms",
                 *     target: "myUpload",
                 *     cond:{"podId":"1000"},
                 *     callback: function(res, head, dataset) {
                 *     }
                 * };
                 *
                 * clt.comm.fileSearch(opt);
                 *
                 */
                fileSearch: function(opt) {
                    var data = {},
                        condObj = {},
                        chkObj = [],
                        formProp = "",
                        i = 0,
                        len = 0,
                        fileSearchRef,
                        fileName   = "",
                        fileSize   = "",
                        fileDate   = "",
                        fileKey    = "",
                        filGroupKey= "",
                        fileRefKey = "",
                        result = [],
                        arrUrl = {},
                        target = null;

                    // valid arguments
                    opt = opt || {};

                    // target 설정
                    target = opt.target;

                    // ref 설정
                    fileSearchRef = opt.ref;

                    data.header = opt.header;
                    data[opt.reqOMM] = {};

                    if (typeof opt.cond === "function") {
                        opt.cond = opt.cond();
                    }

                    // set condition
                    if (!cu.isArray(opt.cond)) {
                        opt.cond = [opt.cond];
                    }

                    // condObj = opt.cond;
                    for (i = 0, len = opt.cond.length; i < len; i++) {
                        chkObj = cc._checkObject(opt.cond[i]);
                        if (chkObj[0] === "form") {
                            formProp = cc._getFormProperty(chkObj[1]);
                            $.extend(true, condObj, cc._formToJson(chkObj[1])[formProp]);
                        } else if (typeof chkObj[1] === "object") {
                            $.extend(true, condObj, opt.cond[i]);
                        }
                    }

                    data[opt.reqOMM] = condObj;

                    cc.ajax({
                        data: data,
                        async: opt.async,
                        callback: function(res, head, dataset) {
                            if (res == 0) {
                                var arrData,
                                    strFormat,
                                    tDate,
                                    tHms,
                                    tYear,
                                    tMonth,
                                    tDay;

                                arrData = dataset[fileSearchRef];

                                strFormat = esl.comm.getSysConfig("DATE_FORMAT");
                                if (typeof strFormat === "undefined" || strFormat === "") {
                                    strFormat = "";
                                } else {
                                    strFormat = strFormat.replace(/\/|\-|\./g, "");
                                }

                                for (i = 0, len = arrData.length; i < len; i++) {
                                    fileName     = arrData[i].fileName;
                                    fileSize     = arrData[i].fileSize;
                                    fileDate     = arrData[i].fileDate;
                                    fileKey      = arrData[i].fileKey;
                                    fileGroupKey = arrData[i].fileGroupKey;
                                    fileRefKey   = arrData[i].fileReferenceKey;

                                    arrUrl = JSON.stringify({"fileKey":fileKey, "fileGroupKey":fileGroupKey, "fileReferenceKey":fileRefKey});

                                    // date 포멧에 따른 변경
                                    tDate = fileDate.substring(0, 10);
                                    tHms  = fileDate.substring(11);

                                    tYear  = tDate.substring(0, 4);
                                    tMonth = tDate.substring(5, 7);
                                    tDay   = tDate.substring(8, 10);

                                    if (strFormat === "ddMMyyyy") {
                                        fileDate = tDay + "." + tMonth + "." + tYear + " " + tHms;
                                    } else if (strFormat === "MMddyyyy") {
                                        fileDate = tMonth + "." + tDay + "." + tYear + " " + tHms;
                                    } else {
                                        fileDate = tYear + "." + tMonth + "." + tDay + " " + tHms;
                                    }

                                    result.push({
                                        "name" : fileName,
                                        "size":fileSize,
                                        "date":fileDate,
                                        "url":arrUrl
                                    });
                                }

                                $("#" + target).IBUpload("files", result);

                                // callback 함수 처리
                                if (typeof opt.callback === "function") {
                                    opt.callback(res, head, dataset);
                                }
                            }
                        }
                    });
                },

                /**
                 * 선택된 파일 목록의 url 정보를 가져온다.
                 * @memberOf    clt.comm#
                 * @method      getFileUrlInfo
                 * @public
                 * @param       {object}        opt                                           옵션 객체
                 * @param       {string}        opt.target                                    IBUpload 를 생성할 컨테이너 객체의 id
                 * @param       {boolean}       opt.sheetYn                                   sheet 연동 여부
                 * @example
                 * var opt = {
                 *     "target" : "myUpload",
                 *     //"sheetYn" : true // sheet 연동시 사용
                 * };
                 *
                 * clt.comm.getFileUrlInfo(opt);
                 */
                getFileUrlInfo : function(opt) {
                    var fileList = [],
                        selectYn,
                        i = 0,
                        len = 0,
                        tempUrl = {},
                        target = "",
                        sheetYn = false,
                        returnUrl = [];

                    if (typeof opt.sheetYn === "undefined") {
                        sheetYn = false;
                    } else {
                        sheetYn = true;
                    }

                    target = opt.target;

                    if (sheetYn) {
                        fileList = $("#" + target).IBUpload("fileList");
                        for (i = 0, len = fileList.length; i < len; i++) {
                            selectYn = window["ibupload_sheet"].GetCellValue(i + 1, 0);
                            if (selectYn === "Y") {
                                tempUrl = fileList[i].url;
                                if (tempUrl.indexOf("fileKey") > -1) {
                                    returnUrl.push(JSON.parse(tempUrl));
                                }
                            }
                        }
                    } else {
                        fileList = $("#" + target).IBUpload("fileList");
                        for (i = 0, len = fileList.length; i < len; i++) {
                            selectYn = $("#" + opt.target).IBUpload("selectedIndex", {index:i});
                            if (selectYn === true) {
                                tempUrl = fileList[i].url;
                                if (tempUrl.indexOf("fileKey") > -1) {
                                    returnUrl.push(JSON.parse(tempUrl));
                                }
                            }
                        }
                    }

                    return  returnUrl;
                },

                /**
                 * 선택된 파일 목록을 화면에서 삭제를 한다. ( 저장된 파일 목록인 경우 url 정보를 리턴해준다. )
                 * @memberOf    clt.comm#
                 * @method      deleteFileUrlInfo
                 * @public
                 * @param       {object}        opt                                           옵션 객체
                 * @param       {string}        opt.target                                    IBUpload 를 생성할 컨테이너 객체의 id
                 * @param       {boolean}       opt.sheetYn                                   sheet 연동 여부
                 * @example
                 * var opt = {
                 *     "target" : "myUpload",
                 *     //"sheetYn" : true // sheet 연동시 사용
                 * };
                 *
                 * clt.comm.deleteFileUrlInfo(opt);
                 */
                deleteFileUrlInfo : function(opt) {
                    var fileList = [],
                        selectYn,
                        grid,
                        i = 0,
                        target = "",
                        sheetYn = false,
                        returnUrl = [];

                    returnUrl = cc.getFileUrlInfo(opt);

                    if (typeof opt.sheetYn === "undefined") {
                        sheetYn = false;
                    } else {
                        sheetYn = true;
                    }

                    target = opt.target;

                    if (sheetYn) {
                        fileList = $("#" + target).IBUpload("fileList");
                        for (i = fileList.length-1; i >= 0;  i-- ) {
                            grid = window["ibupload_sheet"];
                            selectYn = grid.GetCellValue(i + 1, 0);
                            if (selectYn === "Y") {
                                grid.RowDelete(i + 1);
                            }
                        }
                    } else {
                        $("#" + target).IBUpload("delete");
                    }

                    return  returnUrl;
                },

                _getTargetSheets : function(grid) {
                    var target = grid,
                        res = [],
                        detail = [],
                        i = 0,
                        len = 0;

                    if (typeof grid === "string") {
                        target = window[grid];
                    }

                    if (typeof target === "undefined") {
                        return res;
                    }

                    detail = target._detailSheets;
                    if (typeof detail === "undefined") {
                        return res;
                    }

                    if (!cu.isArray(detail)) {
                        detail = [detail];
                    }

                    for (i = 0, len = detail.length; i < len; i++) {
                        res.push(detail[i]);
                        res = res.concat(cc._getTargetSheets(detail[i]));
                    }

                    return res;

                },

                /**
                 * 페이지 처리를 위해서 조회 조건을 저장한다.
                 * @memberOf    clt.comm#
                 * @method      _setLastSearchCond
                 * @private
                 * @param       {object}        dataTo                             data type object
                 * @param       {object}        targetObject                     target object
                 * @param       {object}        data                                search data
                 * @param       {opt}            opt                                  search opt
                 * @return       {object}         data                                search data
                 */
                _setLastSearchCond: function ( dataTo , targetObject , data , opt){
                    var i , len , condObj ;

                    for (i = 0, len = dataTo.length; i < len; i++) {
                        if (dataTo[i] === "ibsheet") {
                            if ($("#clickBtn_"+targetObject[i].id).val() === "N") {
                                condObj = data[opt.reqOMM];
                                $.extend(true, condObj,  {"pageSize" :$("#pageSize_"+targetObject[i].id).val() } );
                                $.extend(true, condObj,  { "currentPage": "1"} );

                                data[opt.reqOMM] = condObj;
                                targetObject[i].LastSearchCond = data;
                                targetObject[i].LastCallback = opt.callback ;
                            }
                        }
                    }

                    return data;
                },

                /**
                 * 서버에 데이터를 저장 한다.
                 * @memberOf   clt.comm#
                 * @method     save
                 * @public
                 * @param      {object}     opt                             저장 옵션 객체
                 * @param      {object}     opt.header                      OMM 헤더 객체
                 * @param      {string}     opt.header.application          application 명
                 * @param      {string}     opt.header.service              service 명
                 * @param      {string}     opt.header.operation            operation 명
                 * @param      {string}     opt.reqOMM                      저장 데이터를 담을  OMM property 명
                 * @param      {array}      opt.target                      데이터 추출 대상의 배열 집합
                 * @param      {array}      opt.allSave                     전체데이터 저장 여부 (true 인경우 전체데이터 저장)
                 * @param      {array}      [opt.checkAll = true]           모든 대상에서 저장할 데이터 체크 여부
                 * @param      {array}      [opt.confirm = true]            저장시 confirm 메시지 사용 여부
                 * @param      {boolean}    opt.blockUI = true              저장시 진행바 사용 여부
                 * @param      {function}   [opt.callback]                  callback 함수
                 * @param      {function}   [opt.failCallback]              실패 했을 때 사용되는 callback 함수
                 *
                 * | Description          |
                 * |----------------------|
                 * | IBSheet 의 id 명     |
                 * | form 객체의 id 명    |
                 *
                 */
                save: function(opt) {
                    var data = {},
                        dataTo = [],
                        targetObject = [],
                        chkObj = [],
                        condObj = {},
                        checkAll = true,
                        useConfirm = true,
                        blockUI = true,
                        i = 0,
                        len = 0,
                        targetSheet = 0,
                        saveSheet = 0,
                        saveForm = 0,
                        allSave = false,
                        validFail = 0,
                        saveData = {};

                    // valid arguments
                    opt = opt || {};

                    checkAll = (typeof opt.checkAll === "undefined") ? true : !!opt.checkAll;
                    useConfirm = (typeof opt.confirm === "undefined") ? true : !!opt.confirm;
                    blockUI = (typeof opt.blockUI === "undefined") ? true : !!opt.blockUI;

                    // 전체저장여부체크
                    allSave = opt.allSave;
                    if (typeof opt.allSave === "undefined") {
                        allSave = false;
                    }

                    // target 설정
                    if (cu.isArray(opt.target)) {
                        for (i = 0, len = opt.target.length; i < len; i++) {
                            chkObj = cc._checkObject(opt.target[i]);

                            dataTo.push(chkObj[0]);
                            targetObject.push(chkObj[1]);
                        }
                    } else {
                        chkObj = cc._checkObject(opt.target);

                        dataTo.push(chkObj[0]);
                        targetObject.push(chkObj[1]);
                    }

                    data.header = opt.header;
                    data[opt.reqOMM] = {};

                    // set condition
                    if (!clt.util.isArray(opt.cond)) {
                        opt.cond = [opt.cond];
                    }

                    for (i = 0, len = opt.cond.length; i < len; i++) {
                        $.extend(true, condObj, opt.cond[i]);
                    }

                    data[opt.reqOMM] = condObj;

                    // 저장 데이터 추출 ( target 기준 )
                    for (i = 0, len = dataTo.length; i < len; i++) {
                        switch (dataTo[i]) {
                            case "ibsheet":
                                targetSheet++;

                                if (targetObject[i].IsDataModified()) {
                                    saveSheet++;
                                    saveData = targetObject[i].GetSaveJson();
                                    if (typeof saveData.Code === "undefined") {
                                        data[opt.reqOMM][targetObject[i].searchRef] = saveData.data;
                                    } else {
                                        validFail = 1;
                                    }
                                } else {
                                    if (allSave) {
                                        saveSheet++;
                                        saveData = targetObject[i].GetSaveJson({AllSave:1});
                                        if (typeof saveData.Code === "undefined") {
                                            data[opt.reqOMM][targetObject[i].searchRef] = saveData.data;
                                        } else {
                                            validFail = 1;
                                        }
                                    }
                                }

                                break;

                            case "form":
                                saveForm++;
                                formProp = cc._getFormProperty(chkObj[1]);
                                // OMM : {ref : {"aaa":"1"} } ->  OMM : {ref : [{"aaa":"1"}] }
                                // 저장 data 배열 형식으로 바꿔서 처리, 나중에 data 형식이 싱글인경우 이부분만 수정
                                data[opt.reqOMM][cc._getFormProperty(targetObject[i])] = [cc._formToJson(chkObj[1])[formProp]];

                                break;
                        }

                        if (validFail) {
                            break;
                        }
                    }

                    if (validFail) {
                        return;
                    }

                    if (targetSheet > 0) {
                        if ((checkAll && targetSheet !== saveSheet) || saveSheet <= 0) {
                            cc.alert(esl.comm.getLangMsg("NO_DATA_TO_SAVE"));
                            return;
                        }
                    } else if (saveForm === 0) {
                        cc.alert(esl.comm.getLangMsg("NO_DATA_TO_SAVE"));
                        return;
                    }

                    if (useConfirm) {
                        if (!cc.confirm(esl.comm.getLangMsg("MSG_ce_alert_common_save"))) {
                            return;
                        }
                    }
                    cc.ajax({
                        data: data,
                        blockUI : blockUI,
                        callback: function(res, head, dataset) {
                            if (res == 0) {
                                for (i = 0, len = dataTo.length; i < len; i++) {
                                    switch (dataTo[i]) {
                                        case "ibsheet":
                                            targetObject[i].LoadSaveData({
                                                "Result": {
                                                    "Code": "0"
                                                }
                                            }, {
                                                "Wait": 0
                                            });
                                            break;

                                        default:
                                            cc.log([
                                                "saveEnd-noTarget",
                                                res,
                                                dataset
                                            ]);
                                            break;
                                    }
                                }

                                // callback 함수 처리
                                if (typeof opt.callback === "function") {
                                    opt.callback(res, head, dataset);
                                }
                            }
                            else {
                                if (typeof opt.failCallback === "function") {
                                    opt.failCallback(res, head, dataset);
                                }
                           	}
                        }
                    });
                },

                /**
                 * 메시지를 출력 한다. ( alert , confirm , 사용자 지정)
                 * @memberOf   clt.comm#
                 * @method     messageBox
                 * @public
                 * @param      {string}      code     메시지 코드
                 * @param      {array}      msg       코드에서 가져온 메시지에 치환할 메시지
                 * @param      {string}      type      ALERT[default] , CONFIRM , 사용자 지정
                 */
                messageBox: function(msg, code, type) {
                    var retMsg;

                    if (msgCode[code] === undefined) {
                        retMsg = msg;
                    } else {
                        retMsg = msgCode[code];

                        if (cu.isArray(msg)) {
                            for (i = 0, len = msg.length; i < len; i++) {
                                retMsg = retMsg.split('{' + i + '}').join(msg[i]);
                            }
                        } else {
                            retMsg = retMsg.split('{0}').join(msg);
                        }
                    }

                    if (type === undefined) type = "ALERT";

                    if (type === "MSGBOX") {

                    } else if (type === "CONFIRM") {
                        return this.confirm(retMsg);
                    } else {
                        this.alert(retMsg);
                    }
                },

                /**
                 * alert 메시지를 출력 한다. (system alert 을 그대로 사용 한다.)
                 * @memberOf   clt.comm#
                 * @method     alert
                 * @public
                 * @param      {string}     msg     출력할 메시지 문자열
                 */
                alert: function(msg) {
                    alert(msg);
                },

                /**
                 * alert 메시지를 출력 한다. (system confirm 을 그대로 사용 한다.)
                 * @memberOf   clt.comm#
                 * @method     confirm
                 * @public
                 * @param      {string}     msg     출력할 메시지 문자열
                 * @returns    {boolean}            confirm 반환 값
                 */
                confirm: function(msg) {
                    var res = false;
                    res = confirm(msg);

                    return res;
                },

                /**
                 * target 유형(ibsheet, form, select)을 체크 한다. (private method)
                 * @memberOf   clt.comm#
                 * @method     _checkObject
                 * @private
                 * @param      {string}     msg     출력할 메시지 문자열
                 * @returns    {boolean}            confirm 반환 값
                 */
                _checkObject: function(target) {
                    var resType = "",
                        resObj = null,
                        ibObj = null,
                        elemObj = null;

                    if (typeof target !== "undefined") {
                        // check ibsheet
                        if (typeof target === "string") {
                            ibObj = window[target];
                            elemObj = $("#" + target);
                        } else if (typeof target === "object") {
                            ibObj = target;
                            elemObj = target;
                        } else {
                            return [resType, target];
                        }

                        if (typeof ibObj === "object" && ibObj.objectType === "ibsheet") {
                            resType = "ibsheet";
                            resObj = ibObj;
                        } else if (elemObj.nodeName === "FORM" || elemObj.prop && elemObj.prop("nodeName") === "FORM") {
                            resType = "form";
                            resObj = elemObj;
                        } else if (elemObj.nodeName === "SELECT" || elemObj.prop && elemObj.prop("nodeName") === "SELECT") {
                            resType = "select";
                            resObj = elemObj;
                        }
                    }

                    return [resType, resObj];
                },

                /**
                 * form 의 프로퍼티(data-ref)의 정보를 가져 온다. (private method)
                 * @memberOf   clt.comm#
                 * @method     _getFormProperty
                 * @private
                 * @param      {object}     form     form id 또는 name
                 * @returns    {string}              프로퍼티 data-ref의 값(없을 경우 form의 id)을 반환한다.
                 */
                _getFormProperty: function(form) {
                    var prop = "";

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }

                    prop = form.attr("data-ref");

                    if (typeof prop === "undefined" || prop === "") {
                        prop = form.attr("id");
                    }

                    return prop;
                },

                /**
                 * form 데이터를 json 형태로 만들어 준다. (private method)
                 * @memberOf   clt.comm#
                 * @method     _formToJson
                 * @private
                 * @param      {object}     form     form id 또는 name
                 */
                _formToJson: function(form) {
                    var res = {},
                        resVal = {},
                        allElem,
                        strDataRef,
                        elemType = "",
                        elemId = "",
                        elemNm = "",
                        elemVal = "";

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }

                    formName = form.attr("name");
                    allElem = document[formName];
                    $.each(allElem, function(i) {

                        elemType = $(this).attr("type");
                        elemId = $(this).attr("id");
                        elemVal = $("#" + elemId).val();

                        switch (elemType) {
                            //case undefined:
                            case "button":
                            case "reset":
                            case "submit":
                                break;
                            case "select-one":
                                resVal[elemId] = elemVal;
                                break;
                            case "radio":
                                if ($("input[id="+elemId+"]").is(":checked") === true) {
                                	resVal[elemId] = "Y";
                                } else {
                                	resVal[elemId] = "N";
                                }
                                break;
                            case "checkbox":
                            	if ($("input[id="+elemId+"]").is(":checked") === true) {
                            		resVal[elemId] = "Y";
                            	} else {
                            		resVal[elemId] = "N";
                            	}
                                break;
                            default:
                                resVal[elemId] = $("#" + elemId).IBMaskEdit("value");
                                break;
                        }
                    });

                    strDataRef = cc._getFormProperty(form);
                    res[strDataRef] = resVal;

                    return res;
                },

                /**
                 * type 에 맞게 데이터를 셋팅 한다.  (private method)
                 * @memberOf   clt.comm#
                 * @method     _loadForm
                 * @private
                 * @param      {object}     form     form id 또는 name
                 * @param      {object}     data
                 */
                _loadForm: function(form, data) {
                    var formName = "",
                        prop = "",
                        elem = null,
                        elemType = "",
                        i = 0,
                        len = 0;

                    if (typeof form === "string") {
                        form = $("#" + form);
                    }

                    formName = form.attr("name");

                    // 단일 데이터가 아닌 경우에는 첫번째 객체로 로드 한다.
                    if (data.length > 0) {
                        data = data[0];
                    }

                    for (prop in data) {
                        elem = null;

                        try {
                            elem = document[formName][prop];
                            if (elem == null || typeof elem === "undefined") {
                                elem = document.getElementById(prop);
                            }

                            if (elem == null || typeof elem == "undefined") {
                                continue;
                            }
                        } catch (e) {
                            //alert(e.message);
                        }

                        elemType = (elem.type);

                        if (typeof elemType == "undefined" && elem.length > 0) {
                            elemType = elem[0].type;
                        }

                        switch (elemType) {
                            case undefined:
                            case "button":
                            case "reset":
                            case "submit":
                                break;
                            case "select-one":
                                elem.value = data[prop];
                                break;
                            case "radio":
                                if (data[prop] === "Y") {
                                    elem.checked = true;
                                    $(elem).parent().find("label").addClass("checked");
                                } else {
                                    elem.checked = false;
                                    $(elem).parent().find("label").removeClass("checked");
                                }

                                elem.value = data[prop];
                                break;
                            case "checkbox":
                                if (data[prop] === "Y") {
                                    elem.checked = true;
                                    $(elem).parent().find("label").addClass("checked");
                                } else {
                                    elem.checked = false;
                                    $(elem).parent().find("label").removeClass("checked");
                                }
                                elem.value = data[prop];
                                break;
                            default:
                                if (elem.length === 2) {
                                    $("#" + elem[0].getAttribute('id')).val(data[prop]);
                                } else {
                                    elem.value = data[prop];
                                }
                                break;
                        }
                    }
                },

                /**
                 * 대상 Grid의 특정행의 데이터를 대상 form 에 로드 한다.
                 * @memberOf   clt.comm#
                 * @method     setGridToForm
                 * @public
                 * @param      {object}    sheet        대상 IBSheet 객체
                 * @param      {number}    row          대상 행의 Index
                 * @param      {string}    form         대상 form의 id
                 */
                setGridToForm: function(sheet, row, form) {
                    var data,
                        opt;

                    if (row < 1) {
                        opt = {target:form};
                        cc.formReset(opt);
                    } else {
                        data = sheet.GetRowData(row);
                        cc._loadForm(form, data);
                    }
                },

                /**
                 * form 의 데이터를 대상 Grid의 특정 행에 로드 한다.
                 * @memberOf   clt.comm#
                 * @method     setFormToGrid
                 * @public
                 * @param      {object}    sheet        대상 IBSheet 객체
                 * @param      {number}    row          대상 행의 Index
                 * @param      {string}    form         대상 form id
                 */
                setFormToGrid: function(sheet, row, form) {

                    var obj, prop;

                    prop = cc._getFormProperty(form);
                    obj = cc._formToJson(form);

                    sheet.SetRowData(row, obj[prop]);

                },

                /**
                 *  form 의 단위데이터를 대상 Grid의 특정 행의 셀에 로드한다.
                 * @memberOf   clt.comm#
                 * @method     setElemToGridCell
                 * @public
                 * @param      {object}    ev
                 * @param      {object}    sheet        대상 IBSheet 객체
                 */
                setElemToGridCell: function(ev, sheet) {
                    var target = ev.target,
                        colName = $(target).prop("id"),
                        row = sheet.GetSelectRow(),
                        val = "",
                        elemType = $(target).prop("type");

                    switch (elemType) {
                        //case undefined:
                        case "button":
                        case "reset":
                        case "submit":
                            break;
                        case "select-one":
                        	val = $(target).val();
                            break;
                        case "radio":
                            if ($(target).is(":checked") === true) {
                                val = "Y";
                            } else {
                                val = "N";
                            }
                            break;
                        case "checkbox":
                            if ($(target).is(":checked") === true) {
                                val = "Y";
                            } else {
                                val = "N";
                            }
                            break;
                        default:
                            val = $(target).IBMaskEdit("value");
                            break;
                    }

                    sheet.SetCellValue(row, colName, val);
                },

                /**
                 * 멀티콤보를 생성한다.(form에서 사용)
                 * @memberOf   clt.comm#
                 * @method     setMultiCombo
                 *
                 * @param      {object}     opt                             객체
                 * @param      {string}     opt.target                      매핑 대상 target의 id
                 * @param      {string}     opt.type                        호출 type (default : text, popup, num:숫자, cal:달력, combo:select box)
                 * @param      {string}     opt.defaultValue                셋팅될 초기값
                 * @param      {string}     opt.fix                         default : N (disabled 처리 할 때 : Y)
                 * @example
                 *
                 * var opt = {
                 *         target : "test",
                 *         type : "num",
                 *         defaultValue : "LIKE",
                 *         fix : "N"
                 *     }
                 * clt.comm.setMultiCombo(opt);
                 */
                setMultiCombo: function(opt) {
                    var data = [],
                        fix = true,
                        target = null,
                        defaultValue = "=",
                        exactlySame = {code:'=',    name: esl.comm.getLangMsg("EXACTLY_SAME"), image:"="   }, // 완전일치
                        partlySame  = {code:'LIKE', name: esl.comm.getLangMsg("PARTLY_SAME"),  image:"LIKE"}, // 부분일치
                        more        = {code:'<',    name: esl.comm.getLangMsg("MORE"),         image:"<"   }, // 초과
                        sameOrMore  = {code:'<=',   name: esl.comm.getLangMsg("SAME_OR_MORE"), image:"<="  }, // 이상
                        less        = {code:'>',    name: esl.comm.getLangMsg("LESS"),         image:">"   }, // 미만
                        sameOrLess  = {code:'>=',   name: esl.comm.getLangMsg("SAME_OR_LESS"), image:">="  }, // 이하
                        different   = {code:'<>',   name: esl.comm.getLangMsg("DIFFERENT"),    image:"<>"  }, // 불일치
                        included    = {code:'IN',   name: esl.comm.getLangMsg("INCLUDED"),     image:"IN"  }, // 포함
                        nonUse      = {code:'NOT',  name: esl.comm.getLangMsg("NON_USE"),      image:"X"   }; // 비사용

                    target = opt.target;

                    defaultValue = opt.defaultValue;
                    if ((typeof defaultValue === "undefined") || (defaultValue === "")) {
                        defaultValue = "=";
                    }

                    if (opt.type === "num") {
                        data = [exactlySame, more, sameOrMore, less, sameOrLess, different, nonUse];
                    } else if (opt.type === "date") {
                        data = [exactlySame, more, sameOrMore, less, sameOrLess, nonUse];
                    } else if (opt.type === "combo") {
                        data = [exactlySame, more, sameOrMore, less, sameOrLess, nonUse];
                    } else {
                        data = [exactlySame, partlySame, more, sameOrMore, less, sameOrLess, different, included, nonUse];
                    }

                    $("#" + target).IBMultiCombo({
                        initCols:[
                            {type:"text", name:"image", align:"left", width:"35"},
                            {type:"text", name:"name",  align:"left", width:"150"}
                        ],
                        data: data,
                        multiSelect: false,
                        dropWidth: 160,
                        showButton: false,
                        filter: false,
                        keepOpen: false,
                        animate: "none"
                    });

                    setTimeout(function () {
                        $("#" + target).IBMultiCombo("selectedCode", defaultValue);
                        if(opt.fix === "Y") {
                            $("#" + target).IBMultiCombo("enable", false);
                        }
                    }, 100);

                },

                /**
                 * form 에 속한 value 값을 리셋
                 * @memberOf   clt.comm#
                 * @method     formReset
                 *
                 * @param      {object}     opt                             객체
                 * @param      {string}     opt.target                      form id 또는 name
                 * @param      {string}     opt.accepted                    넘어온 id 명 또는 name 값 초기화
                 * @param      {string}     opt.excepted                    넘어온 id 명 또는 name 값 제외하고 초기화
                 *
                 * @example
                 * $("#initForm").click(function() {
                 *     var opt = { target:"frm", excepted : ["id1", "id2", "id3"] };
                 *     clt.comm.formReset(opt);
                 * });
                 *
                 */
                formReset: function(opt) {
                    var form,
                        formName = "",
                        allElem = null,
                        aLen = 0,
                        elem = null,
                        elemType = "",
                        arrStr = {},
                        arrStrList = {},
                        sLen = 0,
                        i,
                        j;

                    form = opt.target;
                    if (typeof form === "string") {
                        form = $("#" + form);
                    }

                    formName = form.attr("name");

                    allElem = document[formName];

                    if (typeof opt.accepted !== "undefined") {

                        // 해당 id 또는 name 만 초기화
                        arrStr = opt.accepted;
                        for (i = 0, sLen = arrStr.length; i < sLen; i++) {
                            arrStrList[arrStr[i]] = true;
                        }

                        for (j = 0, aLen = allElem.length; j < aLen; j++) {
                            elem = allElem[j];
                            if (arrStrList[elem.id] || arrStrList[elem.name]) {
                                elemType = (elem.type);
                                switch (elemType) {
                                    case undefined:
                                    case "button":
                                    case "reset":
                                    case "submit":
                                        break;
                                    case "select-one":
                                        elem.selectedIndex = 0;
                                        break;
                                    case "radio":
                                        elem.checked = false;
                                        break;
                                    case "checkbox":
                                        elem.checked = false;
                                        break;
                                    default:
                                        elem.value = "";
                                        break;
                                }
                            }
                        }

                    } else if (typeof opt.excepted !== "undefined") {

                        // 해당 id 또는 name 제외하고 초기화
                        arrStr = opt.excepted;
                        for (i = 0, sLen = arrStr.length; i < sLen; i++) {
                            arrStrList[arrStr[i]] = true;
                        }

                        for (j = 0, aLen = allElem.length; j < aLen; j++) {
                            elem = allElem[j];
                            if (arrStrList[elem.id] || arrStrList[elem.name]) {
                                continue;
                            } else {
                                elemType = (elem.type);
                                switch (elemType) {
                                    case undefined:
                                    case "button":
                                    case "reset":
                                    case "submit":
                                        break;
                                    case "select-one":
                                        elem.selectedIndex = 0;
                                        break;
                                    case "radio":
                                        elem.checked = false;
                                        break;
                                    case "checkbox":
                                        elem.checked = false;
                                        break;
                                    default:
                                        elem.value = "";
                                        break;
                                }
                            }
                        }

                    } else {

                        // 전체 초기화
                        for (j = 0, aLen = allElem.length; j < aLen; j++) {
                            elem = allElem[j];
                            elemType = (elem.type);
                            switch (elemType) {
                                case undefined:
                                case "button":
                                case "reset":
                                case "submit":
                                    break;
                                case "select-one":
                                    elem.selectedIndex = 0;
                                    break;
                                case "radio":
                                    elem.checked = false;
                                    break;
                                case "checkbox":
                                    elem.checked = false;
                                    break;
                                default:
                                    elem.value = "";
                                    break;
                            }
                        }
                    }
                },

                /**
                 * grid에 속한 전체 SaveName 를 가져온다
                 * @memberOf   clt.comm#
                 * @method     getAllSaveName
                 *
                 * @param      {object}     sheet         sheet 명
                 * @returns    {string}                   saveName1|saveName2|saveName3
                 * @example
                 * var allSaveName = clt.comm.getAllSaveName(전체 SaveName 가져올 시트명);
                 */
                getAllSaveName : function(sheet) {
                    var i = 0,
                        len = 0,
                        str = "",
                        colSaveName = "",
                        chkType = "";

                    if (typeof sheet === "string") {
                        sheet = window[sheet];
                    }

                    for (i = 0, len = sheet.LastCol(); i <= len; i++) {
                        colSaveName = sheet.ColSaveName(i);
                        chkType = sheet.GetCellProperty(0, colSaveName, "Type");

                        if (chkType === "Seq" || chkType === "DelCheck") {
                            continue;
                        }

                        if (str == "") {
                            str += colSaveName;
                        } else {
                            str += "|" + colSaveName;
                        }
                    }
                    return str;
                },

                /**
                 * 서버에서 엑셀 다운로드 할 때 필요한 grid에 속한 SaveName 를 가져온다
                 * 제외되는 Head SaveName
                 * 1. Type 이 Seq, DelCheck, Button 인 경우
                 * 2. SaveName 이 procFlag 이고 Type 이 Status 인 경우
                 * 3. SaveName 이 selectChk 이고 Type 이 CheckBox, Radio 인 경우
                 * 4. 속성 중에 Hidden 인 경우
                 * @memberOf   clt.comm#
                 * @method     getAllSaveName
                 *
                 * @param      {object}     sheet         sheet 명
                 * @returns    {string}                   saveName1|saveName2|saveName3
                 * @example
                 * var allSaveName = clt.comm.getHeadSaveName(전체 SaveName 가져올 시트명);
                 */
                getHeadSaveName : function(sheet) {
                    var i = 0,
                        len = 0,
                        str = "",
                        colSaveName = "",
                        colHidden = 0,
                        chkType = "";

                    if (typeof sheet === "string") {
                        sheet = window[sheet];
                    }

                    for (i = 0, len = sheet.LastCol(); i <= len; i++) {
                        colSaveName = sheet.ColSaveName(i);
                        colHidden   = sheet.GetColHidden(colSaveName);
                        chkType     = sheet.GetCellProperty(0, colSaveName, "Type");

                        if ( chkType === "Seq" ||
                             chkType === "DelCheck" ||
                             chkType === "Button" ||
                             ((colSaveName === "procFlag") && (chkType === "Status")) ||
                             ((colSaveName === "selectChk") && (chkType === "CheckBox")) ||
                             ((colSaveName === "selectChk") && (chkType === "Radio")) ||
                             (colHidden)) {
                            continue;
                        }

                        if (str == "") {
                            str += colSaveName;
                        } else {
                            str += "|" + colSaveName;
                        }
                    }

                    return str;
                },

                _loadIBSheet : function(sheet, data , reqOMM) {
                    var total = 0,
                        opt = { "Wait": 0, "Sync": 1 };

                    if( data.length > 0 ){
                        total = data[0].dsTotalcount ;
                    }

                    data = { data: data };

                    if (typeof sheet === "string") {
                        sheet = window[sheet];
                    }

                    if( $("#firstBtn_"+sheet.id).attr('type') !== undefined ) {
                        cc._loadPageNavigation(total, sheet, reqOMM);
                    }

                    sheet.LoadSearchData(data, opt);
                },

                _triggerResizeGrid: function(grid) {
                	var userResize = window[grid.id + "_OnResize"];
                    window[grid.id + "_OnResize"] = function(w, h) {
                    	grid.SetExtendLastCol(0);
                    	grid.FitColWidth();
                    	grid.SetExtendLastCol(1);

                        if (typeof userResize === "function") {
                        	userResize(w, h);
                        }
                    };
                },

                /**
                 * master-detail 설정에 대한 detail Grid 설정 이벤트 처리
                 * @memberOf   clt.comm#
                 * @method     _triggerDetailGrid
                 * @private
                 * @param       {object}     master                       master Grid 객체
                 * @param       {object}     opt                          detail Grid 설정 객체
                 * @param       {object}     opt.sheet                    detail IBSheet의 id
                 * @param       {array}      opt.cols                     detail 조회 조건이 되는 컬럼 SaveName 의 배열집합
                 * @param       {array}      opt.linkCols                 master에 선택되하면 detail이 조회되는 SaveName 의 배열집합
                 * @param       {object}     opt.header                   OMM 헤더 객체
                 * @param       {string}     opt.header.application       application 명
                 * @param       {string}     opt.header.service           service 명
                 * @param       {string}     opt.header.operation         operation 명
                 * @param       {object}     opt.cond                     cond  객체
                 * @param       {string}     opt.reqOMM                   요청 OMM property 명
                 */
                _triggerDetailGrid: function(master, opt) {
                    var masterId = master.id,
                        condCol = opt.cols,
                        linkCol = opt.linkCols,
                        cond = opt.cond,
                        sheet = opt.sheet,
                        chkObj = null,
                        userSelectCell = window[masterId + "_OnSelectCell"],
                        userClick = window[masterId + "_OnClick"];

                    window[masterId + "_OnSelectCell"] = function(or, oc, r, c) {
                        var chkFlag = false, // 조회 여부 확인하는  flag
                            i,
                            len,
                            condData = {},
                            exceptType = {
                        		"CheckBox": 1,
                        		"DelCheck": 1,
                        		"DummyCheck": 1
                        	},
                        	type = "";

                        // 대상 컬럼이 Focus:0 속성이 설정되어 있는 경우 현재 선택된 컬럼으로 변경한다.
                        c = window[masterId].GetSelectCol();
                        type = window[masterId].GetCellProperty(r, c, "Type");

                        // 대상 컬럼이 checkbox 타입인 경우 detail 조회 하지 않기
                        if (exceptType[type]) {
                        	return;
                        }

                        if (window[masterId].GetRowStatus(r) === "I") {
                            if (!cu.isArray(sheet)) {
                                sheet = [sheet];
                            }

                            for (i = 0, len = sheet.length; i < len; i++) {
                                if (typeof sheet[i] === "string") {
                                    sheet[i] = window[sheet[i]];
                                }
                                chkObj = cc._checkObject(sheet[i]);

                                if (chkObj[0] === "ibsheet") {
                                    sheet[i].RemoveAll();

                                    // detail - detail sheet 체크하여 삭제
                                    if (typeof window[sheet[i]._detailSheets] !== "undefined") {
                                        window[sheet[i]._detailSheets].RemoveAll();
                                    }
                                }
                            }

                            if (typeof userSelectCell === "function") {
                                userSelectCell(or, oc, r, c);
                            }
                            return;

                        }

                        if (or == r) {
                            if (typeof userSelectCell === "function") {
                                userSelectCell(or, oc, r, c);
                            }
                            return;
                        }

                        if (linkCol === undefined) { // master에 link 컬럼이 존재하지 않는경우
                            chkFlag = true;
                        } else { // 링크 컬럼이 존재하는 경우
                            for (i = 0, len = linkCol.length; i < len; i++) {
                                if (window[masterId].ColSaveName(c) === linkCol[i]) {
                                    chkFlag = true;
                                    break;
                                }
                            }
                        }

                        if (!chkFlag) {
                            if (typeof userSelectCell === "function") {
                                userSelectCell(or, oc, r, c);
                            }
                            return;
                        }

                        var _optDetail = {
                                header: opt.header,
                                reqOMM: opt.reqOMM,
                                target: opt.sheet
                            },
                            condCols = {},
                            i = 0,
                            len = 0;

                        if (typeof cond === "function") {
                            condData = cond();
                        } else {
                            condData = cond;
                        }

                        // master sheet 찾기
                        var target = opt.sheet,
                        	mSheet = null;

                        if (!cu.isArray(target)) {
                        	target = [target];
                        }

                        for (i = 0, len = target.length; i < len; i++) {
                        	if (cc._checkObject(target[i])[0] === "ibsheet") {
                        		if (typeof target[i] === "string") {
                        		    mSheet = window[target[i]];
                        		} else {
                        		    mSheet = target[i];
                        		}

                        		mSheet._masterSheet = (window[masterId]._masterSheet || masterId);
                        	}
                        }

                        if (!cu.isArray(condData)) {
                            condData = [condData];
                        }

                        for (i = 0, len = condData.length; i < len; i++) {
                            chkObj = cc._checkObject(condData[i]);

                            if (typeof chkObj[1] === "object") {
                                $.extend(true, condCols, condData[i]);
                            }
                        }

                        // detail sheet 조회 옵션 설정
                        for (i = 0, len = condCol.length; i < len; i++) {
                            condCols[condCol[i]] = window[masterId].GetCellValue(r, condCol[i]);
                        }

                        _optDetail.cond = condCols;

                        clt.comm.search(_optDetail);

                        if (typeof userSelectCell === "function") {
                            userSelectCell(or, oc, r, c);
                        }

                    };

                    window[masterId + "_OnClick"] = function(r, c, v, x, y, w, h, t) {
                        var chkFlag = false, // 조회 여부 확인하는  flag
                            i,
                            len,
                            condData = {},
                            exceptType = {
                        		"CheckBox": 1,
                        		"DelCheck": 1,
                        		"DummyCheck": 1
                        	},
                        	type = window[masterId].GetCellProperty(r, c, "Type");



                        ///////////////////////////////////////////////////
                        // 편집이 가능하면 detail 조회를 하지 않는다.

                        // 편집불가 cell 을 클릭하는 경우에만 detail 조회 처리
//                        if (window[masterId].GetCellEditable(r, c)) {
//                        	return;
//                        }

                        // alt + click 인 경우에만 detail 조회 처리
                        if (!window.event.altKey) {
                        	return;
                        }

                        /////////////////////////////////////////////////////

                        // 대상 컬럼이 checkbox 타입인 경우 detail 조회 하지 않기
                        if (exceptType[type]) {
                        	return;
                        }

                        if (window[masterId].GetRowStatus(r) === "I") {
                            if (!cu.isArray(sheet)) {
                                sheet = [sheet];
                            }

                            for (i = 0, len = sheet.length; i < len; i++) {
                                if (typeof sheet[i] === "string") {
                                    sheet[i] = window[sheet[i]];
                                }
                                chkObj = cc._checkObject(sheet[i]);

                                if (chkObj[0] === "ibsheet") {
                                    sheet[i].RemoveAll();

                                    // detail - detail sheet 체크하여 삭제
                                    if (typeof window[sheet[i]._detailSheets] !== "undefined") {
                                        window[sheet[i]._detailSheets].RemoveAll();
                                    }
                                }
                            }

                            if (typeof userSelectCell === "function") {
                                userSelectCell(or, oc, r, c);
                            }
                            return;

                        }

                        if (linkCol === undefined) { // master에 link 컬럼이 존재하지 않는경우
                            chkFlag = true;
                        } else { // 링크 컬럼이 존재하는 경우
                            for (i = 0, len = linkCol.length; i < len; i++) {
                                if (window[masterId].ColSaveName(c) === linkCol[i]) {
                                    chkFlag = true;
                                    break;
                                }
                            }
                        }

                        if (!chkFlag) {
                            if (typeof userClick === "function") {
                                userClick(r, c, v, x, y, w, h, t);
                            }
                            return;
                        }

                        var _optDetail = {
                                header: opt.header,
                                reqOMM: opt.reqOMM,
                                target: opt.sheet
                            },
                            condCols = {},
                            i = 0,
                            len = 0;

                        if (typeof cond === "function") {
                            condData = cond();
                        } else {
                            condData = cond;
                        }

                        // master sheet 찾기
                        var target = opt.sheet,
                        	sheet = null;

                        if (!cu.isArray(target)) {
                        	target = [target];
                        }

                        for (i = 0, len = target.length; i < len; i++) {
                        	if (cc._checkObject(target[i])[0] === "ibsheet") {
                        		if (typeof target[i] === "string") {
                        			sheet = window[target[i]];
                        		} else {
                        			sheet = target[i];
                        		}

                        		sheet._masterSheet = (window[masterId]._masterSheet || masterId);
                        	}
                        }

                        if (!cu.isArray(condData)) {
                            condData = [condData];
                        }

                        for (i = 0, len = condData.length; i < len; i++) {
                            chkObj = cc._checkObject(condData[i]);

                            if (typeof chkObj[1] === "object") {
                                $.extend(true, condCols, condData[i]);
                            }
                        }

                        // detail sheet 조회 옵션 설정
                        for (i = 0, len = condCol.length; i < len; i++) {
                            condCols[condCol[i]] = window[masterId].GetCellValue(r, condCol[i]);
                        }

                        _optDetail.cond = condCols;

                        clt.comm.search(_optDetail);

                        if (typeof userClick === "function") {
                            userClick(r, c, v, x, y, w, h, t);
                        }

                    };
                },

                /**
                 * 팝업 타입의 버튼 클릭시 공통 코드 팝업 호출 이벤트 처리
                 * @memberOf   clt.comm#
                 * @method     _trigerGridColPopup
                 * @private
                 * @param       {object}     grid                         대상 Grid 객체
                 * @param       {object}     opt                          설정 옵션 객체
                 */
                _trigerGridColPopup: function(grid, opt) {
                    var gridId = grid.id,
                        cols = opt,
                        target = [],
                        userPopupClick = window[gridId + "_OnPopupClick"];

                    window[gridId + "_OnPopupClick"] = function(r, c) {
                        var targetInfo = opt,
                            col = grid.ColSaveName(c),
                            colName = "",
                            cond = {},
                            userParam = {};

                        function findCol(name) {
                            return $.grep(cols, function(col) {
                                return (col.col == name);
                            });
                        }

                        target = findCol(col);
                        if (target.length > 0) {
                            target = target[0];
                            cond = cu.cloneArray(target.info);

                            // colParam 처리
                            if (typeof cond.codeName !== "undefined") {
                            	colName = cond.codeName;
                            }
                            // colParam 처리
                            if (typeof cond.targetCode !== "undefined") {
                            	col = cond.targetCode;
                            }
                            // colParam 처리
                            if (typeof cond.colParam === "string") {
                            	cond.colParam = grid.GetCellValue(r, cond.colParam);
                            }

                            // userParam 처리
                            if (typeof cond !== "undefined" && typeof cond.userParam === "function") {
                                if (typeof cond.userParam === "function") {
                                    userParam = esl.comm.clone(cond.userParam());

                                    for( data in userParam)
                                    {
                                    	if(grid.GetCellValue(r, userParam[data]) !== -1){
                                    	    userParam[data] = grid.GetCellValue(r, userParam[data]);
                                    	}else{
                                    	    userParam[data] = userParam[data];
                                    	}
                                    }
                                }


                                $.extend(true, cond, userParam);
                                delete cond.userParam;
                            }

                            cc.showCommPopup({
                                title: target.title,
                                grid: grid,
                                target: {
                                    code: col,
                                    name: colName
                                },
                                cond: cond
                            });
                        }

                        if (typeof userPopupClick === "function") {
                            userPopupClick(r, c);
                        }
                    };
                },

                /**
                 * editPopup 설정에 대한 입력 팝업 호출 이벤트 처리
                 * @memberOf   clt.comm#
                 * @method     _triggerGridEditPopup
                 * @private
                 * @param       {object}     grid                         대상 Grid 객체
                 * @param       {object}     opt                          설정 옵션 객체
                 */
                _triggerGridEditPopup: function(grid, opt) {
                    var gridId = grid.id,
                        userDblClick = window[gridId + "_OnDblClick"];

                    window[gridId + "_OnDblClick"] = function(r, c, v, x, y, w, h) {
                        var i      = 0,
                            len    = 0,
                            cols   = opt.cols;

                        // userParam function scan
                        for (i = 0, len = cols.length; i < len; i++) {
                            if (cols[i].PopupCond && typeof cols[i].PopupCond.userParam === "function") {
                                cols[i].PopupCond.userParam = cols[i].PopupCond.userParam();
                            }
                        }

                        cc.showGridEditPopup($.extend(true, opt, {
                            row: r,
                            data: c
                        }));

                        if (typeof userDblClick === "function" && typeof r !== "string") {
                            userDblClick(r, c, v, x, y, w, h);
                        }
                    };
                },

                /**
                 * console에 log 출력 이벤트
                 * @memberOf   clt.comm#
                 * @method     log
                 * @private
                 * @param       {string}     log
                 */
                log: function(log) {
                    if (!cu.isArray(log)) {
                        log = [log];
                    }
                    if (_useLog) {
                        console.log(log.join(", "));
                    }
                },

                /**
                 * code, name 값을 받아 조회후 일치 하면 데이터를 셋팅 해주고 없는 경우 팝업을 호출한다.
                 * @memberOf   clt.comm#
                 * @method     log
                 * @public
                 * @param       {object}     opt                 조회 옵션 객체
                 * @param       {string}     opt.title           팝업 제목
                 * @param       {object}     opt.multi           팝업에서 선택 여러개 가능(default:false)
                 * @param       {array}      opt.target          셋팅 필드
                 * @param       {object}     opt.grid            호출 한 그리드(form 에서는 사용하지 않는다.)
                 * @param       {string}     opt.autoSearch      자동조회사용여부(default:N, option:Y)
                 * @param       {object}     opt.cond            cond 객체의 집합
                 */
                setCodeSearch: function(opt) {
                    var headerInfo = {},
                        data = {},
                        condObj = {},
                        row = 0,
                        target = null,
                        grid = null,
                        chkObj = null,
                        i = 0,
                        fieldClear = "N",
                        len = 0,
                        pOpt = {
                            title : opt.title,
                            grid : opt.grid,
                            multi : opt.multi,
                            target : opt.target,
                            autoSearch : opt.autoSearch,
                            cond : opt.cond,
                            fieldClear : esl.comm.nvl(opt.fieldClear,fieldClear)
                        };

                    // check blur
                    if (cc._getPopupBlurCheck()) {
                        return false;
                    }

                    grid = opt.grid;

                    if (typeof(grid) !== "undefined") {
                        chkObj = cc._checkObject(grid);
                        if (chkObj[0] === "ibsheet") {
                            row = grid.GetSelectRow();
                            target = opt.target;
                        } else {
                            target = opt.target;
                        }
                    } else {
                        target = opt.target;
                    }

                    if (opt.cond.sqlprop === "CODE") {
                        headerInfo = {
                            "application": "EslADM",
                            "service": "SvcCOMCode",
                            "operation": "searchCommonCode"
                        };
                    } else {
                        headerInfo = {
                            "application": "EslADM",
                            "service": "SvcCOMCode",
                            "operation": "searchQueriedCode"
                        };
                    }

                    opt.reqOMM = "CommonCodeCondOMM";

                    data.header = headerInfo;
                    data[opt.reqOMM] = {};

                    // set condition
                    if (!clt.util.isArray(opt.cond)) {
                        opt.cond = [opt.cond];
                    }

                    for (i = 0, len = opt.cond.length; i < len; i++) {
                        $.extend(true, condObj, opt.cond[i]);
                    }

                    data[opt.reqOMM] = condObj;

                    cc.ajax({
                        data: data,
                        async: false,
                        blockUI: false,
                        callback: function(res, head, dataset) {

                            if (res == 0) {

                            	var datas = dataset["selectCodeOmms"],
                            	conds = (!esl.comm.isNull(opt.cond)) ? !esl.comm.isNull(opt.cond.target) ? opt.cond.target: target : target,
                            	paramidx = 20;

                                if (datas.length == 1) {

                                    if (chkObj !== null && chkObj[0] === "ibsheet") {

                                        if (target.code) {
                                        	grid.SetCellValue(row, target.code, datas[0].code);
                                        }

                                        if (target.name) {
                                            grid.SetCellValue(row, target.name, datas[0].name);
                                        }

                                		for(var foridx = 1; foridx <= paramidx; foridx++)
                                		{
                                			if(!esl.comm.isNull(conds["param"+foridx]) && !esl.comm.isNull(datas[0]["param"+foridx]))
                                			    grid.SetCellValue(row, conds["param"+foridx], datas[0]["param"+foridx]);
                                		}

                                    } else {

                                        if (target.code) {
                                        	$("#" + target.code).val(datas[0].code);
                                        	$("#" + target.code).trigger("change");
                                        }

                                        if (target.name) {
                                            $("#" + target.name).val(datas[0].name);
                                            $("#" + target.name).trigger("change");
                                        }

                                		for(var foridx = 1; foridx <= paramidx; foridx++)
                                		{
                                		    if(!esl.comm.isNull(conds["param"+foridx]) && !esl.comm.isNull(datas[0]["param"+foridx]))
                    	                    {
                    	                    	$("#" + conds["param"+foridx]).val(datas[0]["param"+foridx]);
                    	                    	$("#" + conds["param"+foridx]).trigger("change");
                    	                    }
                                		}
                                    }

                                    // check blur
                                    popBlurCheck = false;


//                                    if ((datas[0].code == opt.cond[0].code)) {
//                                        if (chkObj !== null && chkObj[0] === "ibsheet") {
//
//                                            grid.SetCellValue(row, target.code, datas[0].code);
//
//                                            if (target.name) {
//                                                grid.SetCellValue(row, target.name, datas[0].name);
//                                            }
//
//                                    		for(var foridx = 1; foridx <= paramidx; foridx++)
//                                    		{
//                                    			if(!esl.comm.isNull(conds["param"+foridx]) && !esl.comm.isNull(datas[0]["param"+foridx]))
//                                    			    grid.SetCellValue(row, conds["param"+foridx], datas[0]["param"+foridx]);
//                                    		}
//
//                                        } else {
//
//                                            $("#" + target.code).val(datas[0].code);
//                                            $("#" + target.code).trigger("change");
//
//                                            if (target.name) {
//                                                $("#" + target.name).val(datas[0].name);
//                                                $("#" + target.name).trigger("change");
//                                            }
//
//                                    		for(var foridx = 1; foridx <= paramidx; foridx++)
//                                    		{
//                                    		    if(!esl.comm.isNull(conds["param"+foridx]) && !esl.comm.isNull(datas[0]["param"+foridx]))
//                        	                    {
//                        	                    	$("#" + conds["param"+foridx]).val(datas[0]["param"+foridx]);
//                        	                    	$("#" + conds["param"+foridx]).trigger("change");
//                        	                    }
//                                    		}
//                                        }
//
//                                        // check blur
//                                        popBlurCheck = false;
//
//                                    } else if ((datas[0].name == opt.cond[0].name)) {
//                                        if (chkObj !== null && chkObj[0] === "ibsheet") {
//
//                                            grid.SetCellValue(row, target.name, datas[0].name);
//
//                                            if (target.code) {
//                                                grid.SetCellValue(row, target.code, datas[0].code);
//                                            }
//
//                                    		for(var foridx = 1; foridx <= paramidx; foridx++)
//                                    		{
//                                    			if(!esl.comm.isNull(conds["param"+foridx])) grid.SetCellValue(row, conds["param"+foridx], datas[0]["param"+foridx]);
//                                    		}
//
//                                        } else {
//
//                                            $("#" + target.name).val(datas[0].name);
//                                            $("#" + target.name).trigger("change");
//
//                                            if (target.code) {
//                                                $("#" + target.code).val(datas[0].code);
//                                                $("#" + target.code).trigger("change");
//                                            }
//
//                                    		for(var foridx = 1; foridx <= paramidx; foridx++)
//                                    		{
//                        	                    if (!esl.comm.isNull(conds["param"+foridx]))
//                        	                    {
//                        	                    	$("#" + conds["param"+foridx]).val(data["param"+foridx]);
//                        	                    	$("#" + conds["param"+foridx]).trigger("change");
//                        	                    }
//                                    		}
//                                        }
//
//                                        // check blur
//                                        popBlurCheck = false;
//
//                                    }
//                                    else
//                                    {
//                                        cc.showCommPopup(pOpt);
//                                    }
                                }
                                else if (datas.length == 0)
                                {
                                	alert(esl.comm.getRepLangMsg("MSG_INVALID_DATA", esl.comm.getLangMsg(opt.title)));

                                    if (chkObj !== null && chkObj[0] === "ibsheet")
                                    {

                                        grid.SetCellValue(row, target.code, "");

                                        if (target.name) {
                                            grid.SetCellValue(row, target.name, "");
                                        }

                                		for(var foridx = 1; foridx <= paramidx; foridx++)
                                		{
                                			if(!esl.comm.isNull(conds["param"+foridx]))
                                			    grid.SetCellValue(row, conds["param"+foridx], "");
                                		}

                                    }
                                    else
                                    {

                                        $("#" + target.code).val("");
                                        $("#" + target.code).trigger("change");

                                        if (target.name) {
                                            $("#" + target.name).val("");
                                            $("#" + target.name).trigger("change");
                                        }

                                		for(var foridx = 1; foridx <= paramidx; foridx++)
                                		{
                                		    if(!esl.comm.isNull(conds["param"+foridx]))
                    	                    {
                    	                    	$("#" + conds["param"+foridx]).val("");
                    	                    	$("#" + conds["param"+foridx]).trigger("change");
                    	                    }
                                		}
                                    }

                                    // check blur
                                    popBlurCheck = false;

                                }
                                else
                                {
                                    cc.showCommPopup(pOpt);
                                }

                                // callback 함수 처리
                                if (typeof opt.callback === "function") {
                                    opt.callback(res, head, dataset);
                                }
                            }
                        }
                    });
                },

                /**
                 * CommPopup dialog 를 출력 한다.
                 * @memberOf   clt.comm#
                 * @method     showCommPopup
                 * @public
                 *
                 * @param      multi       조회시 만 사용(조회 조건에서 팝업으로 호출 했을 때 사용) - form - 여러개 선택 가능, grid - 한개만 선택
                 * @param      progress    진행바 표시 여부 (true(진행바 표시), false(default, 진행바 보이지 않게 설정))
                 */
                showCommPopup: function(opt) {
                    var modal = (typeof opt.modal === "undefined") ? true : opt.modal,
                        multi = (typeof opt.multi === "undefined") ? false : opt.multi,
                        pageSize = (typeof opt.pageSize === "undefined") ? "0" : opt.pageSize,
                        progress = (typeof opt.progress === "undefined") ? false : opt.progress,
                        row = 0,
                        target = null,
                        grid = null,
                        chkObj = null,
                        width = 500,
                        height = 550,
                        url = "/eslwms/template/codePopup.html";

                    $.extend(true, opt.cond, {
                        "multi": multi
                    });

                    if (pageSize === "") pageSize = "0";
                    $.extend(true, opt.cond, {
                        "pageCount": pageSize
                    });

                    grid = opt.grid;

                    if (typeof(grid) !== "undefined") {
                        chkObj = cc._checkObject(grid);
                        if (chkObj[0] === "ibsheet") {
                            row = grid.GetSelectRow();
                            target = opt.target;
                        }else {
                            target = opt.target;
                        }
                    } else {
                        target = opt.target;
                    }

                    if (typeof opt.width !== "undefined") {
                        width = opt.width;
                    }

                    if (typeof opt.height !== "undefined") {
                        height = opt.height;
                    }

                    if (typeof opt.cond !== "undefined")
                    {
                    	if (typeof opt.cond.url !== "undefined")
                    	{
                    		url = opt.cond.url;
                    	}
                    }

                    if (typeof opt.url !== "undefined") {
                    	url = opt.url;
                    }

                    var pOpt = {
                        modal: modal, // 옵션
                        title: opt.title,
                        width: width,
                        height: height,
                        target : target,
                        type: "common",
                        cond: opt.cond,
                        context: opt.context,
                        progress: progress,
                        url: url,
                        resFuncName: "getCheckedSheetData",
                        callback: function(data, target) {
                        	var nameCheck = "N", paramidx = 20;
                        	conds = (!esl.comm.isNull(opt.cond)) ? !esl.comm.isNull(opt.cond.target) ? opt.cond.target: target : target;

                            if (chkObj !== null && chkObj[0] === "ibsheet") {
                                // sheet

                            	grid.SetCellValue(row, target.code, data[0]);
                            	if(target.name)
                            	{
                            		grid.SetCellValue(row, target.name, data[1]);
                            		nameCheck = "N";
                            	}

                        		if(conds.name && nameCheck == "Y")  {grid.SetCellValue(row, conds.name, data[1]);}
                        		for(var foridx = 1; foridx <= paramidx; foridx++)
                        		{
                        			if(!esl.comm.isNull(conds["param"+foridx])) grid.SetCellValue(row, conds["param"+foridx], data[foridx + 1]);
                        		}

                            } else {
                                // form
                                $("#" + target.code).val(data[0]);
                                $("#" + target.code).trigger("change");
                                if (target.name)
                                {
                                	$("#" + target.name).val(data[1]);
                                	$("#" + target.name).trigger("change");
                                	nameCheck = "N";
                                }

                                if(conds.name && nameCheck == "Y")
                                {
                                	$("#" + conds.name).val(data[1]);
                                	$("#" + conds.name).trigger("change");
                                }
                        		for(var foridx = 1; foridx <= paramidx; foridx++)
                        		{
            	                    if (!esl.comm.isNull(conds["param"+foridx]))
            	                    {
            	                    	$("#" + conds["param"+foridx]).val(data[foridx + 1]);
            	                    	$("#" + conds["param"+foridx]).trigger("change");
            	                    }
                        		}
                            }

                            // 호출하는 부모창에 callback 함수가 있는 경우
                            if (typeof opt.callback === "function") {
                                opt.callback(data);
                            }
                        }
                    };

                    cc.showPopup(pOpt);
                },

                showGridEditPopup: function(opt) {
                    var pOpt = {},
                        targetRow = opt.row,
                        isNew = (targetRow === "new" || targetRow === "");

                    pOpt = {
                        type: "detail",
                        modal: true,
                        width: (opt.width || 500),
                        height: (opt.height || 500),
                        url: "/eslwms/template/detailPopup.html",
                        title: opt.title,
                        resFuncName: "getInputFormData",
                        cond: {
                            "cols": opt.cols,
                            "fields": opt.fields,
                            "grid": opt.grid.id,
                            "data": isNew ? opt.data : opt.grid.GetRowData(opt.row),
                            "targetRow": opt.row,
                            "isValid":opt.isValid
                        },
                        callback: function(data) {
                            if (isNew) {
                                targetRow = opt.grid.DataInsert(-1);
                            }
                            //clt.comm.log(["result", JSON.stringify(data)]);
                            opt.grid.SetRowData(targetRow, data);

                            // 호출하는 부모창에 callback 함수가 있는 경우
                            if (typeof opt.callback === "function") {
                                opt.callback(targetRow, data);
                            }
                        }
                    };

                    clt.comm.showPopup(pOpt);
                },

                /**
                 * popup dialog 를 출력 한다.
                 * @memberOf   clt.comm#
                 * @method     showPopup
                 * @public
                 * @param      {object}     opt                         설정 옵션 객체
                 * @param      {number}     [opt.width = 500]           팝업 다이얼로그 너비
                 * @param      {number}     [opt.height = 500]          팝업 다이얼로그 높이
                 * @param      {number}     [opt.title = ""]            헤더 타이틀
                 * @param      {number}     [opt.type = "default"]      팝업 다이얼로그 타입
                 * @param      {boolean}    [opt.btnDisplay = false]    팝업 버튼 제어(default:false, true:버튼이 보이지 않게 처리)
                 * @param      {function}   [opt.callback]              확인 버튼 클릭시 호출할 callback 함수
                 */
                showPopup: function(opt) {
                    var context = $(top.document),
                        type = opt.type || "default",
                        target = opt.target || null,
                        btnDisplaySize = (esl.comm.isNull(opt.btnDisplay) || opt.btnDisplay === false ? 0 : -49);/*버튼 안보임 일경우 버튼 영역 감소*/
                        ;
                    // check blur
                    if (cc._getPopupBlurCheck()) {
                        return false;
                    }

                    // check container
                    cc._createPopupContainer(opt.type, opt.btnDisplay);

                    // trigger callback
                    context.find("#" + type + "-popup-ok").unbind("click");
                    context.find("#" + type + "-popup-cancel").unbind("click");

                    context.find("#" + type + "-popup-ok").click(function() {
                        var res,
                            chkProgress = false;

                        // 진행바처리 시작
                        if(opt.progress && !(chkProgress)) {
                    		cc.showBlockUI();
                    		chkProgress = true;
                    	}

                        if (typeof opt.callback === "function") {
                            res = context.find("#" + type + "-popup-frame").get(0).contentWindow[opt.resFuncName]();

                            if (res === false) {
                                return false;
                            } else {
                                opt.callback(res, target);
                            }
                        }

                        // 진행바처리 종료
                        if(opt.progress && chkProgress) {
                            cc.hideBlockUI();
                        }

                        // check blur
                        popBlurCheck = false;

                        context.find("#" + type + "-popup-dialog").dialog("close");
                    });

                    context.find("#" + type + "-popup-cancel").click(function() {
                        if (typeof opt.callbackCancel === "function") {
                            opt.callbackCancel();
                        }

                        // check blur
                        popBlurCheck = false;

                        context.find("#" + type + "-popup-dialog").dialog("close");
                    });

                    context.find("#" + type + "-popup-dialog").dialog({
                        autoOpen: false,
                        resizable: false,
                        modal: opt.modal,
                        width: opt.width || 500,
                        height: (opt.height || 500) - btnDisplaySize,
                        title: opt.title || "",
                        position: {my: "center", at: "center", of: $(top.window)},
                        open: function(event, ui) {
                            var popContainer = context.find("#" + type + "-popup-dialog"),
                                popFrame = context.find("#" + type + "-popup-frame"),
                                height = popContainer.dialog("option", "height"),
                                width = popContainer.dialog("option", "width");

                            popFrame.attr("src", opt.url);
                            popFrame.css("height", height - 80 - btnDisplaySize);
                            popFrame.css("width", "100%");

                            popFrame.load(function() {
                                //cc.log("iframe - loaded", this);

                                // popup 에 cond 데이터 전달
                                if (typeof opt.cond !== "undefined") {
                                    this.contentWindow.postMessage(opt.cond, "*");
                                }
                            });
                        },
                        close: function(event, ui) {
                        	var res,
                        		popFrame = context.find("#" + type + "-popup-frame");

                            if (typeof opt.callbackClose === "function") {
                                res = context.find("#" + type + "-popup-frame").get(0).contentWindow[opt.resCloseFuncName]();

                                if (res === false) {
                                    return false;
                                } else {
                                    opt.callbackClose(res);
                                }
                            }

                            // check blur
                            popBlurCheck = false;

                            popFrame.unbind("load");
                            context.find("#" + type + "-popup-dialog").remove();

                        }
                    });

                    // check blur
                    popBlurCheck = true;

                    context.find("#" + type + "-popup-dialog").dialog("open");

                    return false;
                },

                /**
                 * popup dialog 의 컨테이너 객체를 생성 한다.
                 * @memberOf   clt.comm#
                 * @method     _createPopupContainer
                 * @private
                 * @param      {string}     type        팝업 종류
                 * @param      {boolean}    btnDisplay  팝업 버튼 제어(default:false, true:버튼이 보이지 않게 처리)
                 */
                _createPopupContainer: function(type, btnDisplay) {
                    var context = $(top.document),
                        container,
                        frame,
                        footer,
                        strHtml = [];

                    type = type || "default";

                    if (typeof btnDisplay === "undefined") {
                        btnDisplay = false;
                    }

                    if (context.find("#" + type + "-popup-").length <= 0) {
                        container = document.createElement("div");
                        container.id = type + "-popup-dialog";
                        container.style.cssText = "display:none;overflow:hidden;";

                        frame = document.createElement("iframe");
                        frame.id = type + "-popup-frame";
                        frame.style.cssText = "border:none;";

                        footer = document.createElement("div");
                        if (btnDisplay) {
                            footer.className = "btn_area bottom d_none";
                        } else {
                        	footer.className = "btn_area bottom";
                        }

                        strHtml.push("<p class='right'><button type='button' class='txt_btn' id=\"" + type + "-popup-ok\"><span>OK</span></button></p>");
                        strHtml.push("<button type='button' class='txt_btn' id=\"" + type + "-popup-cancel\"><span>Cancel</span></button>");

                        footer.innerHTML  = strHtml.join("");

                        container.appendChild(frame);
                        container.appendChild(footer);

                        context.find("body").append(container);
                    }
                },

                /**
                 * progress layer 관리 한다.
                 * @memberOf   clt.comm#
                 * @method     _progress
                 * @private
                 * @param      {boolean}     progress 출력 여부
                 */
                _progress: function(flag) {
                    // 프로그래스 이미지가 담긴 HTML구조 생성
                    var prgImg = '<span class="progress"><span><img src="/eslwms/css/images/waiting.gif"></span></span>';

                    if (flag == true) {
                        // 상위 Document 에 append
                        if ($(top.document.body).find(".progress").length == 0) {
                            $(top.document.body).append(prgImg);
                        }
                    } else {
                        // 로딩끝나면 지움
                        $(top.document.body).children('.progress').remove();
                    }
                },

                /**
                 * progress layer 활성화 한다 .
                 * @memberOf   clt.comm#
                 * @method     showBlockUI
                 * @public
                 */
                showBlockUI: function() {
                    progressCount++;
                    this._progress(true);
                },

                /**
                 * progress layer 비활성화 한다 .
                 * @memberOf   clt.comm#
                 * @method     hideBlockUI
                 * @public
                 */
                hideBlockUI: function() {
                    progressCount--;
                    if (progressCount == 0) {
                        setTimeout(function() {
                            clt.comm._progress(false);
                        }, 300);
                    }
                },

                /**
                 * 검색조건에서 팝업 호출시 blur 이벤트 체크
                 * @memberOf   clt.comm#
                 * @method     _getPopupBlurCheck
                 * @private
                 * @return       {boolean}     default : false
                 */
                _getPopupBlurCheck : function() {
                    return popBlurCheck;
                },

                /**
                 * 달력을 활성화 한다 .
                 * @memberOf   clt.comm#
                 * @method     showCalendar
                 * @public
                 * @param       {string)     달력 매핑 대상 target 명
                 * @param       {string)     달력 format (default : yyyyMMdd)
                 */
                showCalendar: function(target, format) {
//                    if (format === "ym") {
//                        format = "yyyy.MM";
//                    } else if (format === "ymdhm") {
//                        format = esl.comm.getSysConfig("DATE_FORMAT") + " HH:mm";
//                    } else if (format === "ymdhms") {
//                        format = esl.comm.getSysConfig("DATE_FORMAT") + " HH:mm:ss";
//                    } else {
//                        format = esl.comm.getSysConfig("DATE_FORMAT");
//                    }
                	var defformat = "yyyyMMdd";
                    if (format === "ym") {
                        format = "yyyyMM";
                    } else if (format === "ymdhm") {
                        format = defformat + "HHmm";
                    } else if (format === "ymdhms") {
                        format = defformat + "HHmmss";
                    } else {
                        format = defformat;
                    }

                    var obj = {
                        Format: format,
                        CalButtons: "Today|Close",
                        CalButtonAlign: "Right",
                        CallBackParam: target,
                        CallBack: clt.comm._callBackCalendar
                    };
                    var v = document.getElementById(target).value;
                    IBCalendar.Show(v, obj);
                },

                /**
                 * 달력을 선택하면 호출되는 callback 함수.
                 * 달력에 선택한 값을 해당 target에 설정해 주고 change 이벤트를 발생한다
                 * @memberOf   clt.comm#
                 * @method     _callBackCalendar
                 * @private
                 * @param {string} data 선택한 데이타
                 * @param {string} target 명
                 */
                _callBackCalendar: function(date, target) {
                    $("#" + target).val(date).change();
                },

                /**
                 * combo 를 시용자지정 코드를  가지고 동적으로 생성한다. .
                 * @memberOf   clt.comm#
                 * @method     setSelectCombo
                 * @public
                 * @param      {array)     opt.target    target
                 * @param      {array)     opt.cols      target 에 savename
                 * @param      {array}     opt.cond     조회 조건을 담고있는 form 객체의 id 또는 json 객체의 배열 집합
                 */
                setSelectCombo: function(opt) {
                    var sqlprop = opt.cond["sqlprop"],
                        operation;

                    if (sqlprop === "CODE") {
                        operation = "searchCommonCode";
                    } else {
                        operation = "searchQueriedCode";
                    }

                    var args = {
                        header: {
                            "application": "EslADM",
                            "service": "SvcCOMCode",
                            "operation": operation
                        },
                        reqOMM: "CommonCodeCondOMM",
                        cond: opt.cond,
                        target: opt.target,
                        async: opt.async,
                        cols: opt.cols,
                        comboType: opt.comboType,
                        callType: opt.callType,
                        callback: opt.callback,
                        emptyType: opt.emptyType
                    };
                    cc.search(args);
                },

                /**
                 * select combo 를 공통코드를 가지고 동적으로 생성한다. .
                 * @memberOf   clt.comm#
                 * @method     _loadSelectCombo
                 * @private
                 * @param      {object)     target      매핑 대상 target
                 * @param      {object}     data        조회 결과
                 * @param      {string}     comboType   콤보 type(기본 타입 : name, code, code(name))
                 * @param      {string}     callType    호출 type
                 */
                _loadSelectCombo: function(target, data, comboType, callType) {
                    target.find("option").remove();

                    if (comboType === "NAME" || comboType === "undefined") {
                        comboType = "";
                    }

                    if (!(target.attr("required")) && (typeof callType === "undefined")) {
                        data.unshift({
                            "code": "",
                            "name": esl.comm.getLangMsg("ALL")
                        });
                    }

                    cc._setMakeCombo(target, data, comboType);
                },

                _setMakeCombo: function(target, data, comboType) {

                    $.each(data, function(i, item) {
                        var text = item["name"];

                        if (comboType === "CDNM") {
                            text = item["code"] + "(" + item["name"] + ")";
                        } else if (comboType === "CODE") {
                            text = item["code"];
                        }

                        target.append("<option value=" + item["code"] + ">" + text + "</option>");
                    });
                },

                /**
                 * from chain-combo 를 설정 한다.
                 * @memberOf   clt.comm#
                 * @method     _loadSelectChainCombo
                 * @private
                 * @param       {string|object}     target      대상 Id 또는 객체(첫번째 select)
                 * @param       {array}             data        정보
                 * @param       {array}             cols        대상 Id
                 * @param       {string}            comboType   type
                 */
                _loadSelectChainCombo: function(target, data, cols, comboType, callType) {
                    var selectTarget = "",
                        firstTarget = "",
                        allArr = {},
                        i = 0,
                        len = 0;

                    if (typeof target === "string") {
                        target = window[target];
                    }

                    if (!cu.isArray(cols)) {
                        return;
                    }

                    firstTarget = $("#" + target.id);
                    firstTarget.find("option").remove();

                    if (comboType === "NAME" || comboType === "undefined") {
                        comboType = "";
                    }

                    if (!(firstTarget.attr("required")) && (typeof callType === "undefined")) {
                        for (i = 0, len = cols.length; i < len; i++) {
                            allArr["code"+i] = "";
                            allArr["name"+i] = esl.comm.getLangMsg("ALL");
                        }
                        data.unshift(allArr);
                    }

                    data = cc._getChainComboData(data, cols);

                    for (i = 0, len = cols.length; i < len; i++) {
                        selectTarget = $("#" + cols[i]);
                        cc._setMakeCombo(selectTarget, data[cols[i]], comboType);
                    }

                    target._chainComboMap = data;
                    target._chainComboCols = cols;
                    target.comboType = comboType;

                    cc._trigerChainCombo(target);
                },

                _getChainComboData: function(data, cols) {
                    var res         = {},
                    distinctMap     = {},
                    depth           = cols.length,
                    i               = 0,
                    j               = 0,
                    k               = 0,
                    len             = 0,
                    dataPrefix      = "",
                    dataPrefixValue = "",
                    isFirstData     = 1,
                    firstCode       = [],
                    firstCodeMap    = [];

                    for (i = 0, len = data.length; i < len; i++) {
                        dataPrefix = undefined;
                        dataPrefixValue = "";

                        // create first data map
                        if (i === 0) {
                            for (j = 0; j < depth; j++) {
                                firstCode[j] = data[i]["code" + j];
                                firstCodeMap[j] = firstCode.join("_$_");
                            }
                        }

                        for (j = 0; j < depth; j++) {
                            if (typeof dataPrefix !== "undefined") {
                                dataPrefix = dataPrefix + "_$_";
                                dataPrefixValue = dataPrefixValue + "_$_";
                            }

                            if (typeof res[dataPrefixValue + cols[j]] === "undefined") {
                                res[dataPrefixValue + cols[j]] = [];
                            }

                            if (typeof res[cols[j]] === "undefined") {
                                res[cols[j]] = [];
                            }

                            if (!distinctMap[dataPrefixValue + data[i]["code" + j]]) {
                                res[dataPrefixValue + cols[j]].push({
                                    code: data[i]["code" + j],
                                    name: data[i]["name" + j]
                                });

                                distinctMap[dataPrefixValue + data[i]["code" + j]] = 1;
                            }

                            // 컬럼별 최초 세팅할 데이터 구성
                            if (typeof dataPrefix !== "undefined" && !distinctMap[cols[j] + "_$_" + data[i]["code" + j]]) {
                                isFirstData = 1;
                                for (k = 0; k < j; k++) {
                                    if (firstCode[k] != data[i]["code" + k]) {
                                        isFirstData = 0;
                                    }
                                }
                                if (isFirstData) {
                                    res[cols[j]].push({
                                        code: data[i]["code" + j],
                                        name: data[i]["name" + j]
                                    });

                                    distinctMap[cols[j] + "_$_" + data[i]["code" + j]] = 1;
                                }
                            }

                            dataPrefix += data[i]["code" + j];
                            dataPrefixValue += data[i]["code" + j];

                        }
                    }

                    return res;
                },

                _trigerChainCombo: function(target) {
                    var chainCols = target._chainComboCols,
                        comboType = target.comboType,
                        i = 0,
                        len = 0,
                        chainId = "";

                    for (i = 0, len = chainCols.length; i < len; i++) {
                        chainId = $("#" + chainCols[i]);

                        chainId.change(function() {
                            var depth = 0,
                                j = 0,
                                colsLen = 0,
                                colsId = "",
                                comboData = [],
                                isTarget = 0,
                                isSet = 0,
                                propNames = [],
                                selectTarget = "";

                            for (j = 0, colsLen = chainCols.length; j < colsLen; j++) {
                                colsId = $("#" + chainCols[j]);
                                propNames.push(colsId.val());
                                depth++;

                                if (chainCols[j] === $(this).prop("id")) {
                                    isTarget = 1;
                                    break;
                                }
                            }

                            if (isTarget && depth < chainCols.length) {
                                propNames.push(chainCols[depth]);
                                isSet = 1;
                            }

                            if (isSet) {
                                selectTarget = $("#" + chainCols[depth]);
                                selectTarget.find("option").remove();

                                comboData = target._chainComboMap[propNames.join("_$_")];
                                cc._setMakeCombo(selectTarget, comboData, comboType);

                                selectTarget.val(comboData[0]["code"]);
                                selectTarget.change();
                            }
                        });
                    }
                },

                /**
                 * select combo 를 공통코드를 가지고 동적으로 생성한다. .
                 * @memberOf   clt.comm#
                 * @method     _loadGridCombo
                 * @private
                 * @param      {object)     target      target sheet
                 * @param      {object}     data        조회 결과
                 * @param      {object}     cols        target sheet 에 savename
                 * @param      {string}     comboType   콤보 type(기본 타입 : code(name), code, name)
                 */
                _loadGridCombo: function(target, data, cols, comboType, emptyType) {
                    var comboData = [],
                        code = "",
                        text = "";

                    // comboType에 따라서 Grid 에 설정할 데이터로 변환 처리
                    comboData = cc._getGridComboData(data, comboType, emptyType);
                    code = comboData[0];
                    text = comboData[1];

                    if (code.length > 0) {
                        target.SetColProperty(0, cols, {
                            "ComboText": text,
                            "ComboCode": code
                        });
                    }
                },

                /**
                 * data 와 comboType 으로 Grid 에 설정하는 구조로 변경하여 반환한다.
                 * @memberOf   clt.comm#
                 * @method     _getGridComboData
                 * @private
                 * @param      {object}     data        대상 데이터
                 * @param      {string}     comboType   콤보 type(기본 타입 : code(name), code, name)
                 * @param      {string}     emptyType   없는 데이터 삽입 type (기본 타입 : false, true)
                 * @returns    {array}                  [code, data] 형태의 배열 집합
                 */
                _getGridComboData: function(data, comboType, emptyType) {
                    var code = [],
                        text = [],
                        resCode = "",
                        resText = "",
                        textData = "";

                    if (comboType === "NAME" || typeof comboType === "undefined") {
                        comboType = "";
                    }

                    if (typeof emptyType === "undefined") {
                        emptyType = false;
                    }

                    $.each(data, function(i, item) {
                        switch (comboType) {
                            case "CODE":
                                textData = item["code"];
                                break;
                            case "CDNM":
                                textData = item["code"] + "(" + item["name"] +")";
                                break;
                            default:
                                textData = item["name"];
                                break;
                        }

                        code.push(item["code"]);
                        text.push(textData);
                    });

                    if (code.length > 0) {
                        resCode = code.join("|");
                        resText = text.join("|");
                    }

                    if (emptyType) {
                        resCode = "|"+resCode;
                        resText = "|"+resText;
                    }

                    return [resCode, resText];
                },

                _gridComboListToJson: function(text, code) {
                    var arText = [],
                        arCode = [],
                        res = [],
                        unit = {},
                        hasUnit = 0,
                        i = 0,
                        len = 0;

                    if (typeof text !== "undefined") {
                        arText = text.split("|");
                        len = arText.length;
                    }

                    if (typeof code !== "undefined") {
                        arCode = code.split("|");

                        if (len < arCode.length) {
                            len = arCode.length;
                        }
                    }

                    for (i = 0; i < len; i++) {
                        unit = {};
                        hasUnit = 0;

                        if (typeof arText[i] !== "undefined") {
                            unit["name"] = arText[i];
                            hasUnit = 1;
                        }

                        if (typeof arCode[i] !== "undefined") {
                            unit["code"] = arCode[i];
                            hasUnit = 1;
                        }

                        if (hasUnit) {
                            res.push(unit);
                        }
                    }

                    return res;
                },

                /**
                 * Grid chain-combo 를 설정 한다.
                 * @memberOf   clt.comm#
                 * @method     _loadGridChainCombo
                 * @public
                 * @param       {object}            opt             옵션 설정 정보
                 * @param       {string|object}     opt.target      대상 그리드의 Id 또는 객체
                 * @param       {array}             opt.cols        대상 그리드 객체
                 */
                _loadGridChainCombo: function(target, data, cols, comboType, emptyType) {

                    if (typeof target === "string") {
                        target = window[target];
                    }

                    if (!cu.isArray(cols)) {
                        return;
                    }

                    data = cc._getGridChainComboData(data, cols);

                    for (i = 0, len = cols.length; i < len; i++) {
                        cc._loadGridCombo(target, data[cols[i]], cols[i]);
                    }

                    target._chainComboMap = data;
                    target._chainComboCols = cols;

                    cc._trigerGridChainCombo(target);
                },

                /**
                 * Grid chain-combo 설정에 대한 chaining 처리
                 * @memberOf   clt.comm#
                 * @method     _trigerGridChainCombo
                 * @private
                 * @param       {object}     grid                         대상 Grid 객체
                 */
                _trigerGridChainCombo: function(grid) {
                    var gridId = grid.id,
                        userOnChange = window[gridId + "_OnChange"],
                        userOnRowSearchEnd = window[gridId + "_OnRowSearchEnd"];

                    window[gridId + "_OnChange"] = function(r, c, v, ov, f) {
                        var chainCols = grid._chainComboCols,
                            depth = 0,
                            i = 0,
                            len = 0,
                            comboData = [],
                            isTarget = 0,
                            isSet = 0,
                            propNames = [];

                        if (grid.GetCellProperty(1, c, "Type") === "Combo" && cu.isArray(chainCols)) {
                            for (i = 0, len = chainCols.length; i < len; i++) {
                                propNames.push(grid.GetCellValue(r, chainCols[i]));
                                depth++;

                                if (chainCols[i] === grid.ColSaveName(c)) {
                                    isTarget = 1;
                                    break;
                                }
                            }

                            if (isTarget && depth < chainCols.length) {
                                propNames.push(chainCols[depth]);
                                isSet = 1;
                            }

                            if (isSet) {
                                comboData = cc._getGridComboData(grid._chainComboMap[propNames.join("_$_")]);
                                grid.CellComboItem(r, chainCols[depth], {
                                    "ComboCode": comboData[0],
                                    "ComboText": comboData[1]
                                });

                                grid.SetCellValue(r, chainCols[depth], "");
                                grid.SetCellValue(r, chainCols[depth], comboData[0].split("|")[0]);
                            }
                        }

                        if (typeof userOnChange === "function") {
                            userOnChange(r, c, v, ov, f);
                        }
                    };

                    window[gridId + "_OnRowSearchEnd"] = function(r) {
                        var chainCols = grid._chainComboCols,
                            i         = 0,
                            len       = 0,
                            comboData = {},
                            propNames = [];

                        if (cu.isArray(chainCols)) {
	                        for (i = 0, len = chainCols.length; i < len; i++) {
	                        	propNames.push(chainCols[i]);
                                comboData = cc._getGridComboData(grid._chainComboMap[propNames.join("_$_")]);

                                grid.CellComboItem(r, chainCols[i], {
                                    "ComboCode": comboData[0],
                                    "ComboText": comboData[1]
                                });

                                propNames.pop();
                                propNames.push(grid.GetCellValue(r, chainCols[i]));
	                        }
                        }

                        if (typeof userOnRowSearchEnd === "function") {
                        	userOnRowSearchEnd(r);
                        }
                    };
                },

                /**
                 * 서버로 부터 전달받은 데이터를 Grid 에서 사용할 수 있는 구조로 변환 후 결과를 반환 한다.
                 * @memberOf   clt.comm#
                 * @method     _getGridChainComboData
                 * @private
                 * @param       {object}            data                서비스에서 전달 받은 JSON 형태의 데이터
                 * @param       {array}             cols                chain-combo 컬럼 정보의 배열 집합
                 * @returns     {array-object}                          Grid 에서 사용할 데이터 맵
                 */
                _getGridChainComboData: function(data, cols) {
                    var res      = {},
                    distinctMap  = {},
                    depth        = cols.length,
                    i            = 0,
                    j            = 0,
                    k            = 0,
                    len          = 0,
                    dataPrefix   = "",
                    isFirstData  = 1,
                    firstCode    = [],
                    firstCodeMap = [];

                    for (i = 0, len = data.length; i < len; i++) {
                        dataPrefix = "";

                        // create first data map
                        if (i === 0) {
                            for (j = 0; j < depth; j++) {
                                firstCode[j] = data[i]["code" + j];
                                firstCodeMap[j] = firstCode.join("_$_");
                            }
                        }

                        for (j = 0; j < depth; j++) {
                            if (dataPrefix) {
                                dataPrefix = dataPrefix + "_$_";
                            }

                            if (typeof res[dataPrefix + cols[j]] === "undefined") {
                                res[dataPrefix + cols[j]] = [];
                            }

		                    if (typeof res[cols[j]] === "undefined") {
		                        res[cols[j]] = [];
		                    }

		                    if (!distinctMap[dataPrefix + data[i]["code" + j]]) {
		                        res[dataPrefix + cols[j]].push({
		                            code: data[i]["code" + j],
		                            name: data[i]["name" + j]
		                        });

		                        distinctMap[dataPrefix + data[i]["code" + j]] = 1;
		                    }

		                    // 컬럼별 최초 세팅할 데이터 구성
		                    if (dataPrefix && !distinctMap[cols[j] + "_$_" + data[i]["code" + j]]) {
		                        isFirstData = 1;
		                        for (k = 0; k < j; k++) {
		                            if (firstCode[k] != data[i]["code" + k]) {
		                                isFirstData = 0;
		                            }
		                        }
		                        if (isFirstData) {
		                            res[cols[j]].push({
		                                code: data[i]["code" + j],
		                                name: data[i]["name" + j]
		                            });

		                            distinctMap[cols[j] + "_$_" + data[i]["code" + j]] = 1;
		                        }
                            }

                            dataPrefix += data[i]["code" + j];
                        }
                    }

                    return res;
                },

                setGridCombo: function(opt) {
                    var args = {
                        header: {
                            "application": "EslADM",
                            "service": "SvcCOMCode",
                            "operation": "searchCommonCode"
                        },
                        reqOMM: "CommonCodeCondOMM",
                        cond: opt.cond,
                        target: opt.target,
                        cols: opt.cols,
                        callback: opt.callback
                    };
                    cc.search(args);
                },

                /**
                 * Grid cell 값이 특정 값과 일치 하는 경우 블링크 이벤트 발생
                 * @memberOf   clt.comm#
                 * @method     setCellBlink
                 * @private
                 * @param       {string}     str                  특정 문자열
                 */
                setCellBlink: function(str) {
                    $(".GMCell").contents().filter(function() {
                        return ($(this).text() == str);
                    }).wrap("<i></i>");

                    (function blink() {
                        $("i").fadeOut(500).fadeIn(500, blink);
                    })();
                },

                /**
                 * page
                 * @memberOf   clt.comm#
                 * @method     _loadPageNavigation
                 * @private
                 * @param      {int)        total
                 * @param      {object}     sheet
                 * @param      {object}     reqOMM
                 */
                _loadPageNavigation : function(total, sheet, reqOMM) {
                    var tot = parseInt(total, 10),
                        id = sheet.id,
                        size = parseInt( $("#pageSize_"+id).val(), 10),
                        curr =  parseInt( $("#pageIndex_"+id).val(), 10),
                        totpage = Math.ceil(tot/size);

                    if( $("#clickBtn_"+id).val() === "N" ) {
                        curr = 1;
                        $("#pageIndex_"+id).val('1');
                    }

                   //$("#pageSize_"+id).val(size);           // 조회 완료후  페이지당 개수 설정
                    $("#currentPage_"+id).val(curr);        // 조회 완료후  페이지 설정
                    $("#clickBtn_"+id).val('N');            // 페이지 관련 버튼 클릭여부 초기화
                    $("#totalPage_"+id).text( totpage );

                    // 페이징 관련 버튼
                    cc._bindPageNaveButton("firstBtn_"+id,   sheet, 1,       reqOMM);
                    cc._bindPageNaveButton("previewBtn_"+id, sheet, curr -1, reqOMM);
                    cc._bindPageNaveButton("nextBtn_"+id,    sheet, curr +1, reqOMM);
                    cc._bindPageNaveButton("lastBtn_"+id,    sheet, totpage, reqOMM);
                    cc._bindPageNaveInput("pageSize_"+id,    sheet, 1,       reqOMM);
                    cc._bindPageNaveInput("currentPage_"+id, sheet, 1,       reqOMM);

                    if ( totpage <= 1 ) {
                        // 페이징 관련 버튼 disabled 처리 및 class 추가 및 제거
                        $("#firstBtn_"+id).prop("disabled", true);
                        $("#firstBtn_"+id).addClass("off");

                        $("#previewBtn_"+id).prop("disabled", true);
                        $("#previewBtn_"+id).addClass("off");

                        $("#nextBtn_"+id).prop("disabled", true);
                        $("#nextBtn_"+id).addClass("off");

                        $("#lastBtn_"+id).prop("disabled", true);
                        $("#lastBtn_"+id).addClass("off");

                    } else if ( curr === 1 ) {
                        // 페이징 관련 버튼 disabled 처리 및 class 추가 및 제거
                        $("#firstBtn_"+id).prop("disabled", true);
                        $("#firstBtn_"+id).addClass("off");

                        $("#previewBtn_"+id).prop("disabled", true);
                        $("#previewBtn_"+id).addClass("off");

                        $("#nextBtn_"+id).prop("disabled", false);
                        $("#nextBtn_"+id).removeClass("off");

                        $("#lastBtn_"+id).prop("disabled", false);
                        $("#lastBtn_"+id).removeClass("off");

                    } else if ( curr === totpage ){
                        // 페이징 관련 버튼 disabled 처리
                        $("#firstBtn_"+id).prop("disabled", false);
                        $("#firstBtn_"+id).removeClass("off");

                        $("#previewBtn_"+id).prop("disabled", false);
                        $("#previewBtn_"+id).removeClass("off");

                        $("#nextBtn_"+id).prop("disabled", true);
                        $("#nextBtn_"+id).addClass("off");

                        $("#lastBtn_"+id).prop("disabled", true);
                        $("#lastBtn_"+id).addClass("off");

                    } else {
                        // 페이징 관련 버튼 disabled 처리
                        $("#firstBtn_"+id).prop("disabled", false);
                        $("#firstBtn_"+id).removeClass("off");

                        $("#previewBtn_"+id).prop("disabled", false);
                        $("#previewBtn_"+id).removeClass("off");

                        $("#nextBtn_"+id).prop("disabled", false);
                        $("#nextBtn_"+id).removeClass("off");

                        $("#lastBtn_"+id).prop("disabled", false);
                        $("#lastBtn_"+id).removeClass("off");

                    }
                },

                setPageNavigation : function(sheet) {
                    var id ;

                    if (typeof sheet === "string") {
                        id= sheet;
                        sheetObj = window[sheet];
                    } else {
                       id = sheet.id;
                        sheetObj = sheet;
                    }

                    cc._makePageNavi(id);  // 페이징 그리기
                },

                _makePageNavi : function(id){
                    var sb= new StringBuffer();

                    sb.append("<div class='mySheet-navi'>");

                    // 페이지당  개수
                    sb.append("<span class='text'><label for='pageSize_"+id+"'>" + esl.comm.getLangMsg("PAGING_ROWS_PER_PAGE") + "</label></span>");
                    sb.append("<span class='numCtr_trigger'>");
                    sb.append("<input type='text' id='pageSize_"+id+"' name='pageSize_"+id+"' style='width:65px;' value='100' required />" );
                    sb.append("<button type='button' class='up' id='pageSizeUp_"+id+"'>증가</button>");
                    sb.append("<button type='button' class='down' id='pageSizeDn_"+id+"'>감소</button>");
                    sb.append("</span>");

                    // 현재페이지 및 전체페이지
                    sb.append("<span class='text marL20'><label for='currentPage_"+id+"'>" + esl.comm.getLangMsg("PAGING_CURRENT_PAGE") + " </label></span>");
                    sb.append("<span class='numCtr_trigger'>");
                    sb.append("<input type='text' id='currentPage_"+id+"' name='currentPage_"+id+"' style='width:65px;' value='1' required />" );
                    sb.append("<button type='button' class='up' id='currentPageUp_"+id+"'>증가</button>");
                    sb.append("<button type='button' class='down' id='currentPageDn_"+id+"'>감소</button>");
                    sb.append("</span>");
                    sb.append("<span class='text'> / </span>");
                    sb.append("<span id='totalPage_"+id+"'></span>");
                    sb.append("<span class='text'>" + esl.comm.getLangMsg("PAGE") + "</span>");

                    // 처음, 이전, 다음, 마지막
                    sb.append("<span class='ctr_btn'>");
                    sb.append("<button type='button' class='btn first' id='firstBtn_"+id+"' disabled ><span>" + esl.comm.getLangMsg("PAGING_FIRST_PAGE") + "</span></button>");
                    sb.append("<button type='button' class='btn prev' id='previewBtn_"+id+"' disabled ><span>" + esl.comm.getLangMsg("PAGING_PREVIOUS_PAGE") + "</span></button>");
                    sb.append("<button type='button' class='btn next' id='nextBtn_"+id+"' disabled ><span>" + esl.comm.getLangMsg("PAGING_NEXT_PAGE") + "</span></button>");
                    sb.append("<button type='button' class='btn last' id='lastBtn_"+id+"' disabled ><span>" + esl.comm.getLangMsg("PAGING_LAST_PAGE") + "</span></button>");
                    sb.append("</span>");

                    sb.append("<input type='hidden' id=clickBtn_"+id+"  name=clickBtn_"+id+"  value='N'>");
                    sb.append("<input type='hidden' id=pageIndex_"+id+"  name=pageIndex_"+id+"  value='1' >");

                    sb.append("</div>");

                    $("#"+id+"-navi").append(sb.toString());

                    $("#pageSize_"+id).IBMaskEdit('number', {min:1});
                    $("#currentPage_"+id).IBMaskEdit('number', {min:1});

                    // 페이지당 개수
                    $("#pageSize_"+id ).bind({
                        focusout : function() {
                            if ( this.value === "") {
                                this.value = 100;
                            }
                        }
                    });

                    // 페이지당 개수 위 버튼
                    $("#pageSizeUp_"+id ).bind({
                        click : function() {
                            $("#pageSize_"+id ).val(parseInt($("#pageSize_"+id ).val()) + 1);
                            $("#pageSize_"+id ).focus();
                        }
                    });

                    // 페이지당 개수 아래 버튼
                    $("#pageSizeDn_"+id ).bind({
                        click : function() {
                            if (parseInt($("#pageSize_"+id ).val()) > 1) {
                                $("#pageSize_"+id ).val(parseInt($("#pageSize_"+id ).val()) - 1);
                            }
                            $("#pageSize_"+id ).focus();
                        }
                    });

                    // 현재페이지
                    $("#currentPage_"+id ).bind({
                        focusout : function() {
                            if ( this.value === "") {
                                this.value = 1;
                            }
                        }
                    });

                    // 현재페이지 위 버튼
                    $("#currentPageUp_"+id ).bind({
                        click : function() {
                            if ((parseInt($("#totalPage_"+id ).text())) >= (parseInt($("#currentPage_"+id ).val()) + 1)) {
                                $("#currentPage_"+id ).val(parseInt($("#currentPage_"+id ).val()) + 1);
                            }
                            $("#currentPage_"+id ).focus();
                        }
                    });

                    // 현재페이지 아래 버튼
                    $("#currentPageDn_"+id ).bind({
                        click : function() {
                            if (parseInt($("#currentPage_"+id ).val()) > 1) {
                                $("#currentPage_"+id ).val(parseInt($("#currentPage_"+id ).val()) - 1);
                            }
                            $("#currentPage_"+id ).focus();
                        }
                    });
                },

                _bindPageNaveButton : function( id, sheet, pageIndex, reqOMM) {
                    var data = sheet.LastSearchCond,
                        condObj;

                    $("#"+id).unbind("click");

                    $("#"+id).bind({
                        click : function() {
                            cc._checkPageInput(data[reqOMM].pageSize, sheet.id);

                            condObj = data[reqOMM];
                            $.extend(true, condObj, {"currentPage" : pageIndex} );
                            data[reqOMM] = condObj;
                            $("#pageIndex_"+sheet.id).val(pageIndex);
                            $("#pageSize_"+sheet.id).val(data[reqOMM].pageSize);
                            $("#clickBtn_"+sheet.id).val('Y');

                            cc.ajax({
                                data : data,
                                callback : function(res, head, dataset) {
                                    if (res == 0) {
                                        if( dataset[sheet.searchRef] === undefined) {
                                            // 그리드에 데이타 행을 지운다
                                            sheet.RemoveAll();
                                        } else {
                                            cc._loadIBSheet(sheet, dataset[sheet.searchRef] , reqOMM);
                                        }
                                    }

                                    // callback 함수 처리
                                    if (typeof sheet.LastCallback === "function") {
                                        sheet.LastCallback(res, head, dataset);
                                    }
                                }
                            });
                        }
                    });  // end of bind
                }, /// end of _bindPageNaveButton

                _bindPageNaveInput : function(id, sheet, pageIndex, reqOMM) {
                     var data = sheet.LastSearchCond,
                         condObj;

                     $("#"+id).unbind("keyup");
                     $("#"+id).unbind("focusout");

                     $("#"+id).bind({
                         keyup : function(evt) {
                             var tot_count = $("#totalPage_"+sheet.id).text(),
                                 curr_page = $("#currentPage_"+sheet.id).val(),
                                 page_size = $("#pageSize_"+sheet.id).val();

                             if (evt.keyCode != 13) {
                                 return false;
                             }

                             if (cc._checkPageInput(data[reqOMM].pageSize , sheet.id) === false) {
                                 return false;
                             }

                             condObj = data[reqOMM];

                             if(id === "pageSize_"+sheet.id) {
                                 $.extend(true, condObj, {"currentPage" : "1", "pageSize" : page_size});
                                 $("#clickBtn_"+sheet.id).val('N');
                                 $("#pageIndex_"+sheet.id).val('1');
                             } else if ( id === "currentPage_"+sheet.id){
                                 $.extend(true, condObj,  {"currentPage" : curr_page } );
                                 $("#clickBtn_"+sheet.id).val('Y');
                                 $("#pageIndex_"+sheet.id).val(curr_page);
                             }

                             data[reqOMM] = condObj;

                             cc.ajax({
                                data: data,
                                callback: function(res, head, dataset) {
                                    if (res == 0) {
                                        if( dataset[sheet.searchRef] === undefined){
                                            // 그리드에 데이타 행을 지운다
                                            sheet.RemoveAll();
                                        } else {
                                            cc._loadIBSheet(sheet, dataset[sheet.searchRef], reqOMM);
                                        }
                                    }

                                    // callback 함수 처리
                                    if (typeof sheet.LastCallback === "function") {
                                        sheet.LastCallback(res, head, dataset);
                                    }
                                }
                            });  // end of ajax

                            return false;

                        } // end of keyup

                    });  // end of bind

                }, // end of _bindPageNave

                _checkPageInput : function(pageSize , id){
                    var tot_count =  $("#totalPage_"+id).text() ,
                        curr_page =  $("#currentPage_"+id).val(),
                        page_size =  $("#pageSize_"+id).val();

                    if(page_size === "" || curr_page === "" || parseInt(page_size, 10) < 1 || parseInt(tot_count,10) < parseInt(curr_page,10)) {
                        $("#pageSize_"+id).val(pageSize);
                        $("#currentPage_"+id).val($("#pageIndex_"+id).val());
                        return false;
                    }
                    return true;
                } , // end of _checkPageInput

                _bindIBCalender : function(selector) {
                    $(selector).on({
                        click: function() {
                            clt.comm.showCalendar(this.getAttribute("data-cal-id"), this.getAttribute("data-format"));
                        }
                    });
                },

                _bindIBMask : function(selector) {
                    $(selector).each(function() {
                        var target = $(this),
                            maskType = target.attr("data-mask-type"),
                            prefix = target.attr("data-mask-prefix"),
                            suffix = target.attr("data-mask-suffix"),
                            maskEtc = target.attr("data-mask-etc"),
                            max = target.attr("data-mask-max"),
                            min = target.attr("data-mask-min"),
                            format = target.attr("data-format"),
                            separator = target.attr("data-separator"),
                            readolny = target.attr("readonly"),
                            disabled = target.attr("disabled"),
                            decimalPoint = target.attr("data-float-point"),
                            floatPoint = esl.comm.getSysConfig("FLOAT_FORMAT");
                            targetVal = target.val().replace(/\/|\-|\./g, "");

                        if (!prefix) prefix = '';
                        if (!suffix) suffix = '';
                        if (!max) max = '';
                        if (!min) min = '';
                        if (!format) format = "ymd";
                        if (typeof(separator) === "undefined") separator = ".";

                        floatPoint = floatPoint.substring(floatPoint.indexOf(decimalSeparator) + 1).length;

                        if (separator === "") {
                            if (format === "ym") {
                                format = "yyyyMM";
                            } else if (format === "ymdhm") {
                                format = "yyyyMMddHHmm";
                            } else if (format === "ymdhms") {
                                format = "yyyyMMddHHmmss";
                            } else {
                                format = "yyyyMMdd";
                            }
                        } else {
                            if (format === "ym") {
                                format = "yyyy" + separator + "MM";
                            } else if (format === "ymdhm") {
                                format = esl.comm.getSysConfig("DATE_FORMAT") + " HH:mm";
                            } else if (format === "ymdhms") {
                                format = esl.comm.getSysConfig("DATE_FORMAT") + " HH:mm:ss";
                            } else {
                                format = esl.comm.getSysConfig("DATE_FORMAT");
                            }
                        }

                        switch (maskType) {
                            case "num":
                                target.IBMaskEdit('number', {
                                    prefix: prefix,
                                    suffix: suffix
                                });
                                break;

                            case "int":
                                target.IBMaskEdit('number', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    min: 0,
                                    groupChar: groupSeparator,
                                    autoGroup: true,
                                    allowPlus: false,
                                    allowMinus: false,
                                    decimalPoint: 0,
                                    defaultValue: "0"
                                });
                                break;

                            case "float":
                                target.IBMaskEdit('number', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    groupChar: groupSeparator,
                                    radixChar: decimalSeparator,
                                    autoGroup: true,
                                    allowPlus: false,
                                    decimalPoint: esl.comm.nvl(decimalPoint, floatPoint)
                                });
                                break;

                            case "date":
                                target.IBMaskEdit(format, {
                                    baseFormat:"yyyyMMdd",
                                    defaultValue: targetVal,
                                    prefix: prefix,
                                    suffix: suffix
                                });
                                break;

                            case "dateym":
                                target.IBMaskEdit(format, {
                                    baseFormat:"yyyyMM",
                                    defaultValue: targetVal,
                                    prefix: prefix,
                                    suffix: suffix
                                });
                                break;

                            case "engonly":
                                // 영어만
                                target.IBMaskEdit('l{*}', {
                                    prefix: prefix,
                                    suffix: suffix
                                });
                                break;

                            case "engnumonly":
                                // 영어, 숫자 만
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "a": {
                                            exp: "[A-Za-z0-9]"
                                        }
                                    }
                                });
                                break;

                            case "searchcodeupper":
                            	// 영어, 숫자 ,./-_ 공백 만, 대문자 치환
                            	target.IBMaskEdit('a{*}', {
                            		prefix: prefix,
                            		suffix: suffix,
                            		rules: {
                            			"a": {
                            				exp: "[A-Za-z0-9 ,._/-]",
                            				casing:"upper"
                            			}
                            		}
                            	});
                            	break;

                            case "engnumupper":
                                // 영어, 숫자 만, 대문자 치환
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "a": {
                                            exp: "[A-Za-z0-9]",
                                            casing:"upper"
                                        }
                                    }
                                });
                                break;

                            case "engnumlower":
                                // 영어, 숫자 만, 소문자 치환
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "a": {
                                            exp: "[A-Za-z0-9]",
                                            casing:"lower"
                                        }
                                    }
                                });
                                break;

                            case "enguponly":
                                // 영어 대문자만
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "a": {
                                            exp: "[A-Z]"
                                        }
                                    }
                                });
                                break;

                            case "engupper":
                                // 영어만 대문자로 치환
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "a": {
                                            exp: "[A-Za-z]",
                                            casing:"upper"
                                        }
                                    }
                                });
                                break;

                            case "englower":
                                // 영어만 소문자로 치환
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "a": {
                                            exp: "[A-Za-z]",
                                            casing:"lower"
                                        }
                                    }
                                });
                                break;

                            case "eng":
                                // 영어 대소문자, 콤마
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "a": {
                                            exp: "[A-Za-z, ]"
                                        }
                                    }
                                });
                                break;

                            case "engup":
                                // 영어 대문자, 콤마
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "a": {
                                            exp: "[A-Z, ]"
                                        }
                                    }
                                });
                                break;

                            case "gridAcceptMask":
                                // 그리드에서 클릭시 에디터 팝업 호출 했을 때 그리드 셀에 설정된 AcceptKeys 에 기타 값이 있는 경우
                                target.IBMaskEdit('a{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {"a" : JSON.parse(maskEtc)}
                                });
                                break;

                            case "exphan":
                                target.IBMaskEdit('#{*}', {
                                    prefix: prefix,
                                    suffix: suffix,
                                    rules: {
                                        "#": {
                                            exp: "[^가-힣ㄱ-ㅎㅏ-ㅣ]"
                                        }
                                    }
                                });
                                break;
                        }

                        if (readolny) {
                            target.prop('readonly', true);
                        }

                        if (disabled) {
                            target.prop('disabled', true);
                        }
                    });
                },

                setMainMenu : function() {
                    var opts = {
                        header: {
                            "application": "EslADM",
                            "service": "SvcCOMSysConfig",
                            "operation": "selectSearchCondition"
                        },
                        cond: {"sesLang" : __SELECT_LANG_CODE__},
                        reqOMM : "ESLObjectOMM",
                        async: false,
                        callback: function(res, head, dataset) {
                            $.each(__sesList__,function(idx,data){
                            	if(data === "sesLang") esl.comm.setGlobalParam(data,esl.comm.nvl(dataset[data],__SELECT_LANG_CODE__));
                            	else esl.comm.setGlobalParam(data,dataset[data]);
                            });
                            esl.comm.confChgOmmToJson(dataset.systemConfigOmms);
                            esl.comm.langChgOmmToJson();

                            cc._setFloatSeparator(esl.comm.getSysConfig("FLOAT_FORMAT"));

                            if (dataset.menuTreeOmms) {
                                cc._loadMainMenu(dataset.menuTreeOmms);
                            }
                        }
                    };
                    clt.comm.search(opts);
                },

                _loadMainMenu: function(data) {
                    var df = document.createDocumentFragment(),
                        unit,
                        li = null,
                        ul = null,
                        lastLi = null,
                        i = 0,
                        j = 0,
                        len = 0,
                        prevLevel = 0,
                        level = 0,
                        html = [],
                        clickEvent = "",
                        menuId = "",
                        gnbUrl = "",
                        gnbUrlEvent = "",
                        isFirst = true,
                        pa = null;

                    for (i = 0, len = data.length; i < len; i++) {
                        html = [];
                        level = data[i].level - 0;

                        if (typeof data[i].url === "string" && data[i].url.length > 0) {
                            clickEvent = "onclick = 'showContent(this, \"" + data[i].menucode + "\", \"" + data[i].menuname + "\", \"" + data[i].url + "\");'";
                            menuId = "id='_" + data[i].menucode + "'";

                            // 메뉴팝업
                            gnbUrlEvent = "onclick = 'popupMenu(\"" + data[i].menucode + "\", \"" + data[i].menuname + "\", \"" + data[i].url + "\");'";
                            gnbUrl = "<img class='gnbUrlIcon' src='/eslwms/images/com/gnbUrl.png' " + gnbUrlEvent + " />";
                        } else {
                            // level = 0 인 경우 (첫번째 메뉴) 클릭 시 해당 메뉴 첫번째 메뉴 선택 할 수 있는 기능
                            if (level === 0) {
                                clickEvent = "onclick = 'showContentFirst(this);'";
                            } else {
                                clickEvent = "";
                            }
                            menuId = "";
                            gnbUrl = "";
                        }

                        if (level === 0) {
                            if (typeof unit === "object") {
                                df.appendChild(unit);
                            }

                            unit = document.createDocumentFragment();
                            li = document.createElement("li");
                            li.className = "item";
                            unit.appendChild(li);

                            html.push("<a " + menuId + " href='#' " + clickEvent + " class='txt depth01'><span>" + data[i].menuname + "</span></a>");
                            li.innerHTML = html.join("");

                            if (isFirst) {
                                isFirst = false;
                            }

                            lastLi = li;
                            pa = li;
                        } else {
                            if (prevLevel < level) {
                                ul = document.createElement("ul");
                                ul.className = "menu type_sub";
                                lastLi.appendChild(ul);

                                pa = ul;
                            } else if (prevLevel > level) {
                                for (j = (prevLevel - level); j > 0; j--) {
                                    pa = pa.parentNode.parentNode;
                                }
                            }

                            li = document.createElement("li");
                            li.className = "item";
                            pa.appendChild(li);

                            html.push("<a " + menuId + " href='#' " + clickEvent +" class='txt'><span>" + data[i].menuname + "</span></a>"+gnbUrl);
                            li.innerHTML = html.join("");

                            lastLi = li;
                        }

                        prevLevel = level;
                    }

                    if (typeof unit === "object") {
                        df.appendChild(unit);
                    }

                    $(".menu").append(df);

                },

                _setFloatSeparator: function(formatString) {
                    if (formatString && formatString.length === 8) {
                        groupSeparator = formatString.charAt(1);
                        decimalSeparator = formatString.charAt(5);
                    }
                },

                /**
                 * 그리드에서 셀 선택 했을 때 지정된 메뉴로 이동한다.
                 * @memberOf    clt.comm#
                 * @method      linkMenuSelect
                 * @public
                 * @param       {object}        sheet                                  sheet id 명
                 * @param       {number}        row                                    선택된 행
                 * @param       {string}        menuId                                 이동할 메뉴 id
                 * @param       {string}        menuNm                                 이동할 메뉴 명
                 * @param       {string}        url                                    이동할 메뉴 url
                 */
                linkMenuSelect: function(sheet, row, menuId, menuNm, url) {
                    var getSearchData = {},
                        getRowdata = {},
                        dataObj = {},
                        data = "";

                    if (typeof sheet === "string") {
                        sheet = window[sheet];
                    }

                    // 선택 row 정보
                    getRowdata = sheet.GetRowData(row);
                    dataObj.selectRowdata = getRowdata;

                    // 검색조건
                    getSearchData = cc._getSearchData();
                    getSearchData = getSearchData.dsSearchcondition;
                    if (getSearchData.length > 0) {
                        if (!clt.util.isArray(getSearchData)) {
                            getSearchData = [getSearchData];
                        }
                        dataObj.searchData = getSearchData;
                    }

                    // 값 셋팅
                    data = JSON.stringify(dataObj);
                    $(top.document).find("#_linkMenuInfo").val(data);

                    // 메뉴 호출
                    top.showContent("",  menuId, menuNm, url);
                },

                _getSearchData : function() {
                    var searchCond = {},
                        val0,
                        val1,
                        val2;

                    searchCond["dsSearchcondition"] = [];
                    $("#div_search > div.form_list > ul > li").each(function(i, item) {
                        val0 = clt.util.replaceAll($("#_search_"+i).attr("name"), "_text" , "");     // dbcolumn
                        val1 = $("#_opr_"+i+"  input[name ^='_opr_"+i+"']")[0].value;                // operator
                        val2 = $("#_search_"+i).val();                                               // field value

                        if (!(val2 === null || val2 === "") && !(val1 === "NOT")) {
                            searchCond["dsSearchcondition"].push({"val0" : val0, "val1" : val1, "val2" : val2});
                        }
                    });
                    return searchCond;
                },

                /**
                 * 셀 선택하여 이동한 메뉴 정보를 얻는다.
                 * @memberOf    clt.comm#
                 * @method      getLinkMenuInfo
                 * @public
                 * @param       {boolean}       reuseYn                    정보 재사용 여부(default:false)
                 * @public
                 */
                getLinkMenuInfo: function(reuseYn) {
                    var menuInfo = "",
                        rtn = {};

                    menuInfo = $(top.document).find("#_linkMenuInfo").val();
                    if (typeof menuInfo !== "undefined" && menuInfo !== "") {
                        rtn = JSON.parse(menuInfo);
                        if (typeof rtn.selectRowdata !== "undefined") {
                            rtn = JSON.parse(menuInfo);

                            if (typeof reuseYn === "undefined") {
                                reuseYn = false;
                            }
                            if (!(reuseYn)) {
                                $(top.document).find("#_linkMenuInfo").val("");
                            }
                        } else {
                            $(top.document).find("#_linkMenuInfo").val("");
                            rtn = "";
                        }
                    } else {
                        rtn = "";
                    }
                    return rtn;
                },

                /**
                 * 서버에서 조회된 데이터를 엑셀 파일로 저장을 한다.
                 * @memberOf   clt.comm#
                 * @method     directDown2Excel
                 * @public
                 * @param      {object}     opt                             엑셀저장 옵션 객체
                 * @param      {array}      opt.targetGrid                  데이터 추출 대상의 배열 집합

                 */
                directDown2Excel: function(opt) {
                    var targetGrid = opt.targetGrid,
                        ref = "";

                    if (typeof targetGrid === "string") {
                        targetGrid = window[targetGrid];
                    }

                    ref = targetGrid.searchRef;

                    opt.callback = function(res, head, dataset) {
                        var jsonData = "",
                            param = {};

                        if (res == 0) {
                            jsonData = JSON.stringify(dataset[ref]);
                            param = {
                              URL: "/eslwms/template/excel/DirectDown2Excel.do",
                              ExtendParam: "Json=" + jsonData,
                              SheetDesign: 2
                            };

                            targetGrid.DirectDown2Excel(param);
                        } else {
                            // 실패 메시지
                        }
                    };
                    cc.search(opt);
                },

                /*
                 * [{col: "rowNo", value: "2"}, {col: "col1", value: "test"}]
                 */
                findRow: function(grid, opt) {
                	var i      = 0,
                		r      = 0,
                		len    = 0,
                		len2   = 0,
                		tmp    = [],
                		res    = -1,
                		matchedText = "";

                	if (!cu.isArray(opt)) {
                		opt =[opt];
                	}

                	for(i = 0, len2 = opt.length; i < len2; i++) {
                		tmp.push(opt[i].value);
                	}

                	matchedText = tmp.join("^%$");

                	if (typeof grid === "string") {
                		grid = window[grid];
                	}

                	for(r = 0, len = grid.RowCount(); r <= len; r++) {
                		tmp = [];
                    	for(i = 0, len2 = opt.length; i < len2; i++) {
                    		tmp.push(grid.GetCellValue(r, opt[i].col));
                    	}

                    	if (matchedText === tmp.join("^%$")) {
                    		res = r;
                    		break;
                    	}
                	}

                	return res;
                }
            };
        })().init();

        /**
         * clt 공통 MASK
         * ibmaskedit 로 input 제약성 추가
         *
         * | attr  | value | Description          |
         * |------|--------|-----------------------|
         * | data-mask-type(필수) | int | integer     |
         * |  | float | float    |
         * |  | num | , 가 없는 mumber     |
         * |  | date | date time  yyyymmdd    |
         * |  | engonlny |  영문   |
         * |  | eng | 영문 + 공백    |
         * |  | enguponly | 영문 대문자    |
         * |  | engup |  영문대문자 + 공백    |
         * |  | exphan |  한글제외      |
         * @namespace   mask
         * @memberof    clt
         */
        $(window).on('load', function(){
            clt.comm._setFloatSeparator(esl.comm.getSysConfig("FLOAT_FORMAT"));

            clt.comm._bindIBCalender("[data-cal-id]");
            clt.comm._bindIBMask("[data-mask-type]");

            var btnArea = $(".ui_panel_box.type02"),
                i   = 0,
                len = btnArea.length;

            btnArea.each(function(i) {
                (function(target) {
                    clt.comm._intervals.push(setInterval(function() {
                        var w = target.width(),
                            navWidth = target.children(".mySheet-navi").width(),
                            btnWidth = target.children(".btn_area").children(".right").width();

                        if (w < (navWidth + btnWidth)) {
                            target.addClass("type02_sm");
                        } else {
                            target.removeClass("type02_sm");
                        }
                    }, 200));
                })($(this));
            });
        });

        $(window).unload(function() {
            var i   = 0,
                len = clt.comm._intervals.length;

            for(i = 0; i < len; i++) {
                clearInterval(clt.comm._intervals[i]);
            }
        });
    })(clt);
})();
