/**
 * @namespace esl
 */

/**
 * esl mobile API
 * @namespace   mobile
 * @memberof    esl
 */

var _mouseDownY = 0;
var _mouseUpY   = 0;
var _mouseDownX = 0;
var _mouseUpX   = 0;
var _swipeRange = 10;
var _menuList;
var __RowHeight__ = 40;

var _minDate = new Date(2000, 0, 1);
var _maxDate = new Date(2099, 12, 31);
var _yearRange = [2000, 2099];

$(document).ready(function($){
	// maxlength attribute 처리
	$().maxlength();

	// 엔터키 입력시 다음포커스로 이동
	$('input').keydown( function(e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if(key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq( inputs.index(this)+ 1 ).focus();
        }
    });
});

var esl = esl || {};
(function() {
    (function(esl) {
    	esl["mobile"] = (function() {
    		var em      = {},
            __sesList__ = ["sesUserId",
                           "sesUserNm",
                           "sesComp",
                           "sesManageLvl",
                           "sesUsergroup",
                           "sesLang",
                           "sesWhse",
                           "sesWhseNm",
                           "sesPlatform"];

            return {
                /**
                 * module initialize
                 * @memberOf   esl.mobile#
                 * @method     init
                 * @private
                 * @returns    {object}         esl.mobile object
                 */
                init : function() {
                    em = this;

                    // create module shotcut
                    if (typeof clt.util !== "undefined") {
                        cu = clt.util;
                    }
                    // create module shotcut
                    if (typeof clt.comm !== "undefined") {
                    	cc = clt.comm;
                    }

                    return this;
                },

                isSwipeIBSheet: function() {
                	if(Math.abs(_mouseUpY - _mouseDownY) > _swipeRange || Math.abs(_mouseUpX - _mouseDownX) > _swipeRange)
                		return false;
                	else
                		return true;
                },

                createMenuDiv: function(opt) {
                    var context = $(top.document),
                        title = opt.title || "program",
                        container,
                        frame,
                        width = "100%",
                        height = window.innerHeight || root.clientHeight || body.clientHeight - 3;

                    if(context.find("#" + title + "-menu").length > 0) {
                    	context.find("#" + title + "-menu").remove();
                    }

                    container = document.createElement("div");
                    container.id = title + "-menu";

                    frame = document.createElement("iframe");
                    frame.id = title + "-menu-frame";
                    frame.style.cssText = "border:none;";

                    container.appendChild(frame);
                    context.find("body").append(container);

                    var menuContainer = context.find("#" + container.id);
                    var menuFrame= context.find("#" + frame.id);

                    clt.comm.showBlockUI();

                    menuContainer.css("height", height);
                    menuContainer.css("width", width);

                    menuFrame.attr("src", opt.url);
                    menuFrame.css("height", height);
                    menuFrame.css("width", width);
                    menuFrame.addClass("iframe_default");

                    menuFrame.unbind("load");
                    menuFrame.load(function() {
                    	menuFrame.contents().find("#page_title").html(opt.menuNm);
                    	$.mobile.changePage("#" + title + "-menu", { reloadPage : false });
                    	clt.comm.hideBlockUI();
            		});
                },

                setMainMenu : function() {

	                var opts = {
	                    header: {
	                        "application": "EslADM",
	                        "service": "SvcCOMSysConfig",
	                        "operation": "selectSearchCondition"
	                    },
	                    cond: {"sesLang" : __SELECT_LANG_CODE__, "sesPlatform" : "MO", "sesWhse" : __SELECT_WH_CODE__},
	                    reqOMM : "ESLObjectOMM",
	                    async: false,
	                    blockUI: false,
	                    callback: function(res, head, dataset) {
	                        if(dataset.multiLangguageOmms) {
	                            $.each(__sesList__,function(idx, data){

                                	if(data === "sesLang") esl.comm.setGlobalParam(data,esl.comm.nvl(__SELECT_LANG_CODE__, dataset[data]));
                                	else if(data === "sesWhse") esl.comm.setGlobalParam(data,esl.comm.nvl(__SELECT_WH_CODE__, dataset[data]));
                                	else if(data === "sesWhseNm") esl.comm.setGlobalParam(data,esl.comm.nvl(__SELECT_WH_NAME__, dataset[data]));
                                	else esl.comm.setGlobalParam(data,dataset[data]);
                                });

	                            esl.comm.langChgOmmToJson();
	                            esl.comm.confChgOmmToJson(dataset.systemConfigOmms);

                                cc._setFloatSeparator(esl.comm.getSysConfig("FLOAT_FORMAT"));
	                        }

	                        if (dataset.menuTreeOmms) {
	                        	_menuList = dataset.menuTreeOmms;
	                            em._loadMainMenu(dataset.menuTreeOmms);
	                        }

	                    	// clt.comm.hideBlockUI();
	                    }
	                };

	                clt.comm.search(opts);
	            },

                _loadMainMenu: function(data) {
                    var dfHeader = document.createDocumentFragment(),
                        dfDetail = document.createDocumentFragment(),
                        unit,
                        li = null,
                        i = 0,
                        clickEvent = "",
                        menuId = "",
                    	icon = "";

                    for (i = 0; i < data.length; i++) {

                    	/*
    					<li class="item ico_set01"><a href="#"><span>Variable Cost<br>Calculate</span></a></li>
    					<li class="item ico_set02"><a href="#"><span>Space<br>Utilization</span></a></li>
    					<li class="item ico_set03"><a href="#"><span>Wave Classification</span></a></li>
    					<li class="item ico_set04"><a href="#"><span>WH Attribute</span></a></li>
    					<li class="item ico_set05"><a href="#"><span>Alloc Cancel by<br>Order Detail</span></a></li>
    					<li class="item ico_set06"><a href="#"><span>WH<br>Management</span></a></li>
    					<li class="item ico_set07"><a href="#"><span>WO Picking</span></a></li>
    					<li class="item ico_set08"><a href="#"><span>Transhipment<br>Receiving</span></a></li>
    					<li class="item ico_set09"><a href="#"><span>Transhipment<br>Shipping</span></a></li>

    					<li class="item"><a href="#"><span>입고관리</span></a></li>
						<li class="item"><a href="#"><span>출고관리</span></a></li>
						<li class="item"><a href="#"><span>재고관리</span></a></li>
						<li class="item"><a href="#"><span>현황조회</span></a></li>
						<li class="item"><a href="#"><span>TASK</span></a></li>
						<li class="item"><a href="#"><span>부가서비스</span></a></li>
    					*/

                    	var href = '#';

                        html = [];
                        level = Number(data[i].level);

                        if(level === 0) continue;

                        clickEvent = "onclick = 'showContent(" + level + ", \"" + data[i].menucode + "\", \"" + data[i].menuname + "\", \"" + data[i].url + "\");'";

                        unit = document.createDocumentFragment();
                        li = document.createElement("li");

                        if(data[i].icon !== null) {
                        	// mainmenu icon : ico_set01 - ico_set09
                        	icon = "item ico_set " + data[i].icon;
                        }
                        else {
                        	icon = "item";
                        }

                        li.className = icon + (level === 1 ? "" : " menuDetail " + data[i].supermenucode);
                        li.setAttribute("parent", data[i].supermenucode);

                        html.push("<a " + menuId + " href='" + href + "' " + clickEvent + "><span>" + data[i].menuname + "</span></a>");
                        li.innerHTML = html.join("");

                        unit.appendChild(li);

                        if (level === 1) {
                           	dfHeader.appendChild(unit);
                        }
                        else {
                        	dfDetail.appendChild(unit);
                        }
                    }

                    $("#ulHeader").append(dfHeader);
                    $("#ulDetail").append(dfDetail);
                },

                /**
                 * alert 메시지를 출력 한다. (system alert 을 그대로 사용 한다.)
                 * @memberOf   esl.mobile#
                 * @method     alert
                 * @public
                 * @param      {string}     msg     출력할 메시지 문자열
                 */
                alert: function(msg) {
                    alert(msg);
                },

                /**
                 * confirm 메시지를 출력 한다. (system confirm 을 그대로 사용 한다.)
                 * @memberOf   esl.mobile#
                 * @method     confirm
                 * @public
                 * @param      {string}     msg     출력할 메시지 문자열
                 */
                confirm: function(msg) {
                	return confirm(msg);
                },

                /**
                 * IBSheet Mobile Style 적용
                 * @memberOf   esl.mobile#
                 * @method     mobileIBSheetInit
                 * @public
                 * @param      {object}    obj      대상 sheet
                 */
                setMobileSytleSheet: function(obj) {

                	obj.SetTheme(obj.GetTheme(), "mobile");
                	obj.SetClipPasteMode(-1);
                	obj.SetEditable(false);
                	obj.SetCountPosition(0);        		// Rowcount 표시여부
                	obj.SetHeaderRowHeight(__RowHeight__); 	// 헤더 Row 높이
                	obj.SetDataRowHeight(__RowHeight__);    // Data Row 높이
                	obj.SetSelectionMode(1);        		// 행 단위 선택
                	obj.SetHeaderEventMode(0);
                	obj.SetEditableColorDiff(0);    		// 편집이 불가능한 셀을 색상으로 구분하여 표시할지 여부를 확인하거나 설정한다.
                	obj.SetHeaderMode({ "ColMode" : 0, "ColResize": 0, "Sort" : 0 });
                },

                // Sheet Data => Mobile Detail form bind
                bindFormData: function(sheet, frm, row) {
                	em.bindFormDataOption(sheet, frm, row, true);
                },

                bindFormDataOption: function(sheet, frm, row, makeHidden) {
                	$.each(sheet.Cols, function(idx, item)
        			{
        				var target = $('#' + frm).find('#' + item.SaveName);

        				if(target.length > 0)
        				{
        					target.val(sheet.GetCellValue(row, item.SaveName));
        				}
        				else
        				{
        					if(makeHidden) {
	        		            var valueChild = document.createElement("input");
	        		            valueChild.type = "hidden";
	        		            valueChild.id = item.SaveName;
	        		            valueChild.value = sheet.GetCellValue(row, item.SaveName);
	        		            $('#' + frm).append(valueChild);
        					}
        				}
        			});

                },

                /**html 언어교환 */
            	htmlRename : function(){
            		var items = [],
                        tops = top || window,
            		    rename = tops.__htmlsRename__;

            	   	items = document.querySelectorAll('['+rename+']');
            	   	if (items.length == 0) return;
            	   	var id;
            	   	var type;
            	   	for(var i=0; i < items.length; i++)
            	   	{
            	   		id = items[i].id;
            	   		type = $("#"+id).attr("type");
            	   		if(type == "button") {
            	   			$("#"+id).prev().children().text(esl.comm.getLangMsg($("#"+id).attr(rename)));
            	   		}
            	   		else {
            	   			$("#"+id).text(esl.comm.getLangMsg($("#"+id).attr(rename)));
            	   		}
            	   	}
            	},

                callSettingPage: function() {
            		var opt ={
           				 title: "setting",
           				 url : "mobSetting.do",
           				 menuId : "mobSetting",
           				 menuNm : "MENU_USERPROFILE"
           				};

            		em.createMenuDiv(opt);
                },

                getTextLength: function(str) {
                    var len = 0;
                    for (var i = 0; i < str.length; i++) {
                        if (escape(str.charAt(i)).length == 6) {
                            len++;
                        }
                        len++;
                    }
                    return len;
                }
            };
        })().init();
    })(esl);
})();


Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

;(function ($) {
	$.fn.maxlength = function(){
		// $("textarea[maxlength], input[maxlength]").keypress(function(event){
		$("textarea[maxlength]").keypress(function(event){
			var key = event.which;

			//all keys including return.
			if(key >= 33 || key == 13 || key == 32) {
				var maxLength = $(this).attr("maxlength");
				var length = this.value.length;
				if(length >= maxLength) {
					event.preventDefault();
				}
			}
		});
	};
})(jQuery);

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

function inputNumberChange(obj)
{
	if(obj.value == '') return;

	obj.value = parseInt(obj.value);

	if(parseInt(obj.value) < parseInt(obj.min)) {
		obj.value = obj.min;
	}
	else if(parseInt(obj.value) > parseInt(obj.max)) {
		obj.value = obj.max;
	}
}

function mainSheet_OnMouseDown(Button, Shift, X, Y) {
	_mouseDownY = Y;
	_mouseDownX = X;
}

function mainSheet_OnMouseUp(Button, Shift, X, Y) {
	_mouseUpY = Y;
	_mouseUpX = X;
}
