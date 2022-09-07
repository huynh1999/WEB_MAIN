/**
 * clt 공통 API
 * @namespace   util
 * @memberof    clt
 */
var clt = clt || {};
var date_separator = ".";
(function() {
    (function(clt) {
        clt["util"] = (function() {
            return {
                init: function() {
                    if (typeof clt.comm === "object" && typeof clt.comm.util === "undefined") {
                        clt.comm.util = this;
                    }

                    return this;
                },

                /**
                 * form에 필수입력을 체크한다.
                 *  필수 입력인 경우 required , 필수 입력 메시지 타이틀은 data-req-title
                 * @memberOf   clt.util#
                 * @method     isValidate
                 * @public
                 * @param      {object}     form object
                 * @returns    {string}     true or false
                 */
                isValidate: function(form) {
                    var i = 0,
                        len = 0,
                        type,
                        frmchild = null,
                        value = "",
                        idx = 0,
                        max = 0,
                        title,
                        msg = "";

                    if (typeof form != "object" || form.tagName != "FORM") {
                        return false;
                    }
                    for (i = 0, len = form.elements.length; i < len; i++) {

                        if (form.elements[i].getAttribute("required") !== null) {
                            type = form.elements[i].type;
                            frmchild = null;
                            value = "";
                            switch (type) {
                                case "radio":
                                case "checkbox":
                                    frmchild = form[IBS_getName(form.elements[i])];
                                    for (idx = 0, max = frmchild.length; idx < max; idx++) {
                                        if (frmchild[idx].checked) {
                                            value = "on";
                                            break;
                                        }
                                    }
                                    break;
                                default:
                                    value = form.elements[i].value;
                                    break;
                            }
                            if (value === "") {
                                title = form.elements[i].getAttribute("data-req-title");
                                msg = esl.comm.getRepLangMsg(esl.comm.getLangMsg("MSG_REQUIRED_FIELD_REP"), title);
                                clt.comm.alert(msg);
                                form.elements[i].focus();
                                return false;
                            }
                        }
                    }
                    return true;
                },

                /**
                 * 입력값이 null 인지 체크, msg 가 있으면 null 일때 메시지 처리
                 * @memberOf   clt.util#
                 * @method     isNull
                 * @public
                 * @param {object} input
                 * @param {string} msg
                 * @return {boolean) null 이면 true
                 * @example isNull(input , "테스트")
                 */
                isNull: function(input, msg) {

                	var val = this.getValue(input);

                    if (val === null || this.trim(val) === "") {
                        if (msg) {
                            clt.comm.alert(msg + "을(를) 입력하세요.");
                        }

                        if (input !== null) {
                            if (typeof input.prop !== "function") {
                                input = $(input);
                            }

                            if ( input.prop("nodeType") === 1) {
                            	input.val("");
                                input.focus();
                            }

                        }
                        return true;
                    }
                    return false;
                },

                /**
                 * 자릿수만큼 입력값을 자르고 '...'붙여서
                 * @memberOf   clt.util#
                 * @method     isClipToString
                 * @public
                 * @param {object} input
                 * @param {number} cipher 자리수
                 * @return {string} 자릿수로 짜른 입력값 + ...
                 * @example
                 * '''
                 * clt.util.isClipToString(input,3)
                 * '''
                 */
                isClipToString: function(input, cipher) {
                    var retValue = this.getValue(input);
                    if (retValue === "") return "";
                    if (retValue.length <= cipher) return retValue;
                    return retValue.substring(0, cipher) + "...";
                },

                /**
                 * 입력값에 스페이스 이외의 의미있는 값이 있는지 체크 , msg 존재시 alert
                 * @memberOf   clt.util#
                 * @method     isEmpty
                 * @public
                 * @param {object} input
                 * @param {string} msg
                 * @return {boolean} empty 이면 true
                 */
                isEmpty: function(input, msg) {
                    var val = this.getValue(input);

                    if (val === null || this.trim(val) === '') {
                        if (msg) {
                            clt.comm.alert(msg + "을(를) 입력하세요.");
                        }

                        if (input !== null) {
                            if (typeof input.prop !== "function") {
                                input = $(input);
                            }

                            if ( input.prop("nodeType") === 1) {
                                input.focus();
                            }
                        }

                        return true;
                    }
                    return false;
                },

                /**
                 * 입력값에 특정 문자(chars)가 있는지 체크 특정 문자를 허용하지 않으려 할 때 사용
                 * @memberOf   clt.util#
                 * @method     isContainsChars
                 * @public
                 * @param {object} input
                 * @param {string} chars
                 * @return {boolean} true or false
                 */
                isContainsChars: function(input, chars) {
                    var retValue = this.getValue(input),
                        i = 0,
                        len = 0;
                    for (i = 0, len = retValue.length; i < len; i++) {
                        if (chars.indexOf(retValue.charAt(i)) != -1)
                            return true;
                    }
                    return false;
                },

                /**
                 * 입력값이 특정 문자(chars)만으로 되어있는지 체크 특정 문자만 허용하려 할 때 사용
                 * @memberOf   clt.util#
                 * @method     isContainsCharsOnly
                 * @public
                 * @param {object} input
                 * @param {string} chars
                 * @return {boolean} true or false
                 */
                isContainsCharsOnly: function(input, chars) {
                    var retValue = this.getValue(input),
                        i = 0,
                        len = 0;
                    for (i = 0, len = retValue.length; i < len; i++) {
                        if (chars.indexOf(retValue.charAt(i)) == -1)
                            return false;
                    }
                    return true;
                },

                /**
                 * 입력값이 알파벳 + 공백 인지 체크한다
                 * @memberOf   clt.util#
                 * @method     isAlphabet
                 * @public
                 * @param {object} input
                 * @param {string} msg
                 * @return {boolean }
                 */
                isAlphabet: function(input, msg) {
                    var retValue = this.getValue(input);
                    if (/^[a-zA-Z ]+$/.test(retValue)) {
                        return true;
                    } else {
                        if (msg) {
                            clt.comm.alert(msg + "은(는) 영문으로 입력하세요.");
                            /*if (input.jquery == undefined) {
                                input.value = "";
                            } else {
                                input.val("");
                            }*/
                            input.focus();
                        }
                        return false;
                    }
                },
                /**
                 * 입력값이 알파벳 대문자 +  공백 인지 체크
                 * @memberOf   clt.util#
                 * @method     isUpperCase
                 * @public
                 * @param {object} input
                 * @return {boolean}  대문자 true
                 */
                isUpperCase: function(input) {
                    var retValue = this.getValue(input);
                    return /^[A-Z ]+$/.test(retValue);
                },

                /**
                 * 입력값이 알파벳 소문자 + 공백 인지 체크
                 * @memberOf   clt.util#
                 * @method     isLowerCase
                 * @public
                 * @param {object} input
                 * @return {boolean}
                 */
                isLowerCase: function(input) {
                    var retValue = this.getValue(input);
                    return /^[a-z ]+$/.test(retValue);
                },

                /**
                 * 입력값이 숫자 인지 체크
                 * @memberOf   clt.util#
                 * @method     isNumber
                 * @public
                 * @param {object} input
                 * @return {boolean}
                 */
                isNumber: function(input) {
                    var retValue = this.getValue(input);
                    return /^[0-9]+$/.test(retValue);
                },


                /**
                 * 입력값이 알파벳,숫자로 되어있는지 체크
                 * @memberOf   clt.util#
                 * @method     isAlphaNum
                 * @public
                 * @param {object} input
                 * @param {string} msg
                 * @return {boolean}
                 */
                isAlphaNum: function(input, msg) {
                    var retValue = this.getValue(input);
                    if (/^[0-9a-zA-Z ]+$/.test(retValue)) {
                        return true;
                    } else {
                        if (msg) {
                            clt.comm.alert(msg + "은(는) 영문 또는 숫자로 입력하세요.");
                            /*if (input.jquery == undefined) {
                                input.value = "";
                            } else {
                                input.val("");
                            }*/
                            input.focus();
                        }
                        return false;
                    }
                },

                /**
                 * 입력값이 사용자가 정의한 포맷 형식인지 체크 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
                 * @memberOf   clt.util#
                 * @method     isValidFormat
                 * @private
                 * @param {object} input
                 * @return {boolean}
                 */
                isValidFormat: function(input, format) {
                    if (input.val().search(format) != -1) {
                        return true; // 올바른 포맷 형식
                    }
                    return false;
                },

                /**
                 * 입력값이 이메일 형식인지 체크 자세한 format 형식은 자바스크립트의 'regular expression'을 참조
                 * @memberOf   clt.util#
                 * @method     isEmail
                 * @public
                 * @param {object} input
                 * @param {boolean} alert 활성 여부
                 * @param {string} msg msg 출력
                 * @return {boolean}
                 * @example if (!isEmail(form.email)) { alert("올바른 이메일 주소가 아닙니다."); }
                 */
                isEmail: function(input, alert, msg) {
                    if (alert) {
                        if (this.isEmpty(input, 'e-mail')) {
                            return false;
                        }
                    }
                    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
                    if (this.isValidFormat(input, format)) {
                        return true;
                    } else {
                        if (alert) {
                            if (msg) {
                                clt.comm.alert(msg + "은(는)  email이 형식에 맞지 않습니다.");
                            } else {
                                clt.comm.alert("유효한 e-mail주소가 아닙니다.");
                            }
                        }
                        input.focus();
                        return false;
                    }
                },



                /**
                 * 문자열 길이 check
                 * @memberOf   clt.util#
                 * @method     isMaxByte
                 * @public
                 * @param {object} obj
                 * @param {number} maxLen 최대길이
                 * @param {string} msg 메시지
                 * @return {boolean}  true or false
                 */
                isMaxByte: function(obj, maxLen, msg) {
                    var len = this.checkLengthUtf8(obj); // 문자열의 실제길이 구함
                    // 길이 확인
                    if (typeof(maxLen) == "string")
                        maxLen = parseInt(maxLen, 10);
                    if (maxLen < len) {
                        if (msg) {
                            clt.comm.alert(msg + "최대 길이 " + maxLen + "초과");
                        }
                        return false;
                    }
                    return true;
                },

                /**
                 * 유효한(존재하는) 일(日)인지 체크
                 * @memberOf   clt.util#
                 * @method     isMaxByte
                 * @private
                 * @param {string} yyyy 년
                 * @param {string} mm 월
                 * @param {string} dd 일
                 * @return {boolean} 유효일 true
                 */
                isValidDate: function(yyyy, mm, dd) {
                    var m = parseInt(mm, 10) - 1;
                    var d = parseInt(dd, 10);

                    var end = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
                    if ((yyyy % 4 === 0 && yyyy % 100 !== 0) || yyyy % 400 === 0) {
                        end[1] = 29;
                    }
                    return (d >= 1 && d <= end[m]);
                },

                /**
                 * 문자열이 날짜형식에 맞는지 체크한후 유효하지 않은 날짜이면 alert창 띄움
                 * @memberOf   clt.util#
                 * @method     isDate
                 * @public
                 * @param {object} obj
                 * @param {boolean}  alert활성여부
                 * @return {boolean} 유효날 true
                 */
                isDate: function(obj, alertYn) {
                    var dat,
                        year,
                        month,
                        day;
                    if (!this.isEmpty(obj)) {
                        dat = this.getValue(obj);
                        // alert(dat);
                        dat = dat.replace(/\/|\-|\./g, ""); // 특수문자 제거

                        if (this.isNumber(dat) === false) {
                            if (alertYn) {
                                clt.comm.alert("유효한 날짜가 아닙니다.");
                            }
                            if (typeof(obj) == "object") {
                                obj.focus();
                            }
                            return false; // 특수문자 제거된 문자열이 숫자만으로 구성되어 있어야함
                        }

                        if (this.checkLengthUtf8(dat) != 8) {
                            if (alertYn) {
                                clt.comm.alert("유효한 날짜가 아닙니다.");
                            }
                            if (typeof(obj) == "object") {
                                obj.focus();
                            }
                            return false;
                        }
                        year = dat.substring(0, 4);
                        month = dat.substring(4, 6);
                        day = dat.substring(6, 8);

                        if (!this.isValidDate(year, month, day)) {
                            if (alertYn) {
                                clt.comm.alert("유효한 날짜가 아닙니다.");
                            }
                            if (typeof(obj) == "object") {
                                obj.focus();
                            }
                            return false;
                        }
                    }
                    return true;
                },

                /**
                 * 날자 비교 ( fromdate , todate 의 적합성은 체크하지 않음 )
                 * @memberOf   clt.util#
                 * @method     isDateDiff
                 * @public
                 * @param {formDate} 시작일자
                 * @param {toDate} 종료일자
                 * @return {boolean} 시작일자 <= 종료일자 true 아니면 false
                 */
                isDateDiff: function(fromdate, todate) {
                    var fdate = this.getValue(fromdate),
                        tdate = this.getValue(todate);

                    fdate = fdate.replace(/\/|\-|\./g, ""); // 특수문자 제거
                    tdate = tdate.replace(/\/|\-|\./g, ""); // 특수문자 제거

                    if (fdate > tdate) {
                        return false;
                    } else {
                        return true;
                    }
                },

                /**
                 * Time 스트링을 자바스크립트 Date 객체로 변환
                 * @memberOf   clt.util#
                 * @method     toTimeObject
                 * @public
                 * @param {string} Time 형식의 String
                 * @return {object} date Object
                 */
                toTimeObject: function(time) { // parseTime(time)
                    var year = time.substr(0, 4),
                        month = time.substr(4, 2) - 1, // 1월=0,12월=11
                        day = time.substr(6, 2),
                        hour = time.substr(8, 2),
                        min = time.substr(10, 2);

                    return new Date(year, month, day, hour, min);
                },

                /**
                 * 선택된 날짜를 더하거나 빼는 함수
                 * @memberOf   clt.util#
                 * @method     getDateAdd
                 * @public
                 *
                 * @param  {string} todate     Time 형식의 date
                 * @param  {string} num        더하거나 빼기 숫자
                 * @param  {string} type       default(DD)<년월일>, option:YY(년)<년>, MM(월)<년월>
                 * @return {string} date
                 */
                getDateAdd: function(todate, num, type) {
                    var tDate,
                        returnDate,
                        _getYear,
                        _getMonth,
                        _getDate;

                    tDate = this.getValue(todate);
                    tDate = this.toTimeObject(tDate.replace(/\/|\-|\./g, ""));
                    returnDate = new Date(tDate);

                    if (typeof num === "string") {
                        if (num === "") {
                            num = 0;
                        }
                        num = parseInt(num, 10);
                    }

                    _getYear = returnDate.getFullYear();

                    if (type === "YY") {
                        if (num !== "") {
                            returnDate.setFullYear(_getYear + num);
                        }
                    } else if (type === "MM") {
                        _getMonth = returnDate.getMonth();
                        if (num !== "") {
                            returnDate.setFullYear(_getYear, _getMonth + num);
                        }
                    } else {
                        _getDate = returnDate.getDate();
                        if (num !== "") {
                            returnDate.setDate(_getDate + num);
                        }
                    }

                    return returnDate;
                },

                /**
                 * 두 Time이 몇 개월 차이나는지 구함
                 * @memberOf   clt.util#
                 * @method     getMonthInterval
                 * @public
                 * @param {object | string} time1
                 * @param {object | string} time2
                 * @return {number} time1이 time2보다 크면(미래면) minus(-)
                 */
                getMonthInterval: function(time1, time2) {
                    var date1,
                        date2,
                        years,
                        months,
                        days;
                    time1 = this.getValue(time1);
                    time2 = this.getValue(time2);

                    date1 = this.toTimeObject(time1.replace(/\/|\-|\./g, ""));
                    date2 = this.toTimeObject(time2.replace(/\/|\-|\./g, ""));

                    years = date2.getFullYear() - date1.getFullYear();
                    months = date2.getMonth() - date1.getMonth();
                    days = date2.getDate() - date1.getDate();

                    return (years * 12 + months + (days >= 0 ? 0 : -1));
                },

                /**
                 * 두 Time이 몇일 차이나는지 구함
                 * @memberOf   clt.util#
                 * @method     getDayInterval
                 * @public
                 * @param {object | string} time1
                 * @param {object | string} time2
                 * @return {number} time1이 time2보다 크면(미래면) minus(-)
                 */
                getDayInterval: function(time1, time2) {
                    var date1,
                        date2,
                        day;
                    time1 = this.getValue(time1);
                    time2 = this.getValue(time2);

                    date1 = this.toTimeObject(time1.replace(/\/|\-|\./g, ""));
                    date2 = this.toTimeObject(time2.replace(/\/|\-|\./g, ""));
                    day = 1000 * 3600 * 24; // 24시간

                    return parseInt((date2 - date1) / day, 10);
                },

                /**
                 * 현재 시각을 Time 형식으로 리턴
                 * @memberOf   clt.util#
                 * @method     getCurrentTime
                 * @public
                 * @param
                 * @return time
                 */
                getCurrentTime: function() {
                    return this.toTimeString(new Date());
                },

                /**
                 * 자바스크립트 Date 객체를 Time 스트링으로 변환
                 * @memberOf   clt.util#
                 * @method     toTimeString
                 * @public
                 * @param {object} date Object
                 * @teturn {string} tiem 형식의 string , format 이 있는 경우 해당 format
                 */
                toTimeString: function(date) { // formatTime(date)
                    var year = date.getFullYear(),
                        month = date.getMonth() + 1, // 1월=0,12월=11이므로 1 더함
                        day = date.getDate(),
                        hour = date.getHours(),
                        min = date.getMinutes();

                    if (("" + month).length == 1) {
                        month = "0" + month;
                    }
                    if (("" + day).length == 1) {
                        day = "0" + day;
                    }
                    if (("" + hour).length == 1) {
                        hour = "0" + hour;
                    }
                    if (("" + min).length == 1) {
                        min = "0" + min;
                    }

                    return ("" + year + month + day + hour + min);

                },

                /**
                 * 현재 年을 YYYY형식으로 리턴
                 * @memberOf   clt.util#
                 * @method     getYear
                 * @public
                 * @param
                 * @return {string} year
                 */
                getYear: function() {
                    return this.getCurrentTime().substr(0, 4);
                },

                /**
                 * 현재 月을 MM형식으로 리턴
                 * @memberOf   clt.util#
                 * @method     getMonth
                 * @public
                 * @param
                 * @return {string} month
                 */
                getMonth: function() {
                    return this.getCurrentTime().substr(4, 2);
                },

                /**
                 * 현재 日을 DD형식으로 리턴
                 * @memberOf   clt.util#
                 * @method     getDay
                 * @public
                 * @param
                 * @return {string} day
                 */
                getDay: function() {
                    return this.getCurrentTime().substr(6, 2);
                },

                /**
                 * 현재 年月日을 separator 로 구분하여 리턴
                 * @memberOf   clt.util#
                 * @method     getToday
                 * @public
                 * @param {string} format (default : ymd ,  option : ymd , ym , md)
                 * @param {string} separator (default - )
                 * @return {string} yyyy-mm-dd
                 */
                getToday: function(format, separator) {

                    if (format === undefined || format === 'undefined') format = "ymd";
                    if (separator === undefined || separator === 'undefined')
                        separator = date_separator;
                    if (format == "ym") {
                        return this.getYear() + separator + this.getMonth();
                    } else if (format == "md") {
                        return this.getMonth() + separator + this.getDay();
                    } else {
                        return this.getYear() + separator + this.getMonth() + separator + this.getDay();
                    }

                },

                /**
                 * 현재 年月日을 separator 로 구분하여 리턴
                 * @memberOf   clt.util#
                 * @method     getToday
                 * @public
                 * @param {string} format (default : ymd ,  option : ymd , ym , md)
                 * @param {string} separator (default - )
                 * @return {string} yyyy-mm-dd
                 */
                getSearchCondToday: function(format) {

                	if (format === undefined || format === 'undefined') format = "ymd";
                	if (format == "ym") {
                		return this.getYear() + this.getMonth();
                	} else if (format == "md") {
                		return this.getMonth() + this.getDay();
                	} else {
                		return this.getYear() + this.getMonth() + this.getDay();
                	}

                },

                /**
                 * 선택된 날짜를 separator 로 구분하여 리턴
                 * @memberOf   clt.util#
                 * @method     getToday
                 * @public
                 * @param  {string} format (default : DD ,  option : YY , MM)
                 * @param  {string} separator (default / )
                 * @return {string} yyyy/mm/dd
                 */
                getSearchcondSeparatorDate: function(_date, format) {
                	var _getYear,
                	_getMonth,
                	_getDate;

                	if (format === undefined || format === 'undefined') format = "DD";

                	_getYear = _date.getFullYear();

                	if (format == "YY") {
                		return _getYear;
                	} else if (format == "MM") {
                		_getMonth = _date.getMonth() + 1;
                		if (("" + _getMonth).length == 1) {
                			_getMonth = "0" + _getMonth;
                		}
                		return _getYear + _getMonth;
                	} else {
                		_getMonth = _date.getMonth() + 1;
                		_getDate = _date.getDate();
                		if (("" + _getMonth).length == 1) {
                			_getMonth = "0" + _getMonth;
                		}
                		if (("" + _getDate).length == 1) {
                			_getDate = "0" + _getDate;
                		}
                		return _getYear + _getMonth + _getDate;
                	}
                },
                /**
                 * 선택된 날짜를 separator 로 구분하여 리턴
                 * @memberOf   clt.util#
                 * @method     getToday
                 * @public
                 * @param  {string} format (default : DD ,  option : YY , MM)
                 * @param  {string} separator (default / )
                 * @return {string} yyyy/mm/dd
                 */
                getSeparatorDate: function(_date, format, separator) {
                    var _getYear,
                        _getMonth,
                        _getDate;

                    if (format === undefined || format === 'undefined') format = "DD";
                    if (separator === undefined || separator === 'undefined')
                        separator = date_separator;

                    _getYear = _date.getFullYear();

                    if (format == "YY") {
                        return _getYear;
                    } else if (format == "MM") {
                        _getMonth = _date.getMonth() + 1;
                        if (("" + _getMonth).length == 1) {
                            _getMonth = "0" + _getMonth;
                        }
                        return _getYear + separator + _getMonth;
                    } else {
                        _getMonth = _date.getMonth() + 1;
                        _getDate = _date.getDate();
                        if (("" + _getMonth).length == 1) {
                            _getMonth = "0" + _getMonth;
                        }
                        if (("" + _getDate).length == 1) {
                            _getDate = "0" + _getDate;
                        }
                        return _getYear + separator + _getMonth + separator + _getDate;
                    }
                },

                /**
                 * 문자열에 있는 특정문자패턴을 다른 문자패턴으로 바꾸는 함수.
                 * @memberOf   clt.util#
                 * @method     replace
                 * @public
                 * @param {string} target String
                 * @param {string} search String
                 * @param {string} relace String
                 * @return {string) change String
                 */
                replace: function(targetStr, searchStr, replaceStr) {
                    var len, i, tmpstr = "";

                    for (i = 0, len = targetStr.length; i < len; i++) {
                        if (targetStr.charAt(i) != searchStr) {
                            tmpstr = tmpstr + targetStr.charAt(i);
                        } else {
                            tmpstr = tmpstr + replaceStr;
                        }
                    }
                    return tmpstr;
                },


                /**
                 * 전체 문자열에 있는 특정문자패턴을 다른 문자패턴으로 바꾸는 함수.
                 * @memberOf   clt.util#
                 * @method     replaceAll
                 * @public
                 * @param {string} target String
                 * @param {string} search String
                 * @param {string} relace String
                 * @return {string) change String
                 */
                replaceAll: function(targetStr, searchStr, replaceStr) {
                    if (targetStr === "undefined" || targetStr === undefined) {
                        return;
                    }
                    return  targetStr.split(searchStr).join(replaceStr);
                },


                /**
                 * 문자열에서 ch 문자를 제거한다. 예) , - 등등
                 * @memberOf   clt.util#
                 * @method     removeChar
                 * @public
                 * @param {string} val 문자열
                 * @param {string} ch 패턴문자
                 * @return {string} patten delete string
                 */
                removeChar: function(val, ch) {
                    var len,
                        ret = "",
                        i = 0;
                    if (val === undefined || val === 'undefined' || ch === undefined || ch === 'undefined')
                        return val;

                    for (i = 0, len = val.length; i < len; ++i) {
                        if (val.substring(i, i + 1) != ch)
                            ret = ret + val.substring(i, i + 1);
                    }
                    return ret;
                },


                /**
                 * 문자열에서 좌우 공백제거
                 * @memberOf   clt.util#
                 * @method     trim
                 * @public
                 * @param {string}  val
                 * @return {string} 좌우 trim string
                 */
                trim: function(val) {

                    if (typeof(val) == 'undefined')
                        return "";

                    val = this.getValue(val);
                    val = val.replace(/^\s+/g, '').replace(/\s+$/g, '');

                    return val;
                },

                /**
                 *입력이 object 이면 object 에 value 를 리턴하고 그 외에는 해당 입력값을 리턴한다
                 * @memberOf   clt.util#
                 * @method     getValue
                 * @public
                 * @param      {object}     object
                 * @returns    {string}     object value
                 */
                getValue: function(obj) {
                    if (obj === null || obj === 'null') return "";

                    if (typeof(obj) == "object") {
                        if (obj.jquery === undefined || obj.jquery === 'undefined') {
                            return obj.value;
                        }
                        return obj.val();
                    } else {
                        if (typeof(obj) == "number") {
                            return obj.toString();
                        } else {
                            return obj;
                        }
                    }
                },

                /**
                 * 해당하는 객체에 값을 가져옴
                 * @memberOf   clt.util#
                 * @method     getMaskValue
                 * @public
                 * @param {object} jquery object
                 * @return
                 * text : 일반 값
                 * text : 금액의 경우 return value가 100,000->100000으로 변환되어서 return;
                 * combobox : 현재 선택된 option 객체의 값이 return;
                 * radio, checkbox : 체크된 객체의 값을 return ; 아무것도 체크되지 않으면 "" 를 return; checkbox의 경우
                 * 다중선택인 경우 "01|02" 형태로 return;
                 */
                getMaskValue: function(obj) {
                    var retVal, name,
                        type = obj.attr("type") === undefined ? "" : obj.attr("type");
                    if (type.toLowerCase() == "radio" || type.toLowerCase() == "checkbox") {
                        retVal = "";
                        name = obj.attr("name");

                        $('[name="' + name + '"]').each(function() {
                            if ($(this).prop('checked') === true || $(this).prop('checked') === 'true') {
                                retVal += "|" + $(this).val();
                            }
                        });
                        if (retVal === "")
                            return "";
                        return retVal.substring(1);
                    } else {
                        return obj.IBMaskEdit('value');
                    }
                },

                /**
                 * array 여부를 확인 한다.
                 * @memberOf   clt.util#
                 * @method     isArray
                 * @public
                 * @param      {object}     target      대상 객체
                 * @returns    {boolean}                array 여부
                 */
                isArray: function(target) {
                    var res = false;

                    if (Array.isArray) {
                        res = Array.isArray(target);
                    } else {
                        res = Object.prototype.toString.call(target) === "[object Array]";
                    }

                    return res;
                },


                /**
                 * 오른쪽에 ch문자로 채우기
                 * @memberOf   clt.util#
                 * @method     rpad
                 * @public
                 * @param {string} newValue 문자열
                 * @param {string} len 전체길이
                 * @param {string} ch 대체문자
                 * @return {string} right pad string
                 */
                rpad: function(newValue, len, ch) {
                    if (arguments.length < 3)
                        ch = ' ';

                    var strlen = this.trim(newValue).length;
                    var ret = "";
                    var alen = len - strlen;
                    var astr = "";

                    // 부족한 숫자만큼 len 크기로 ch 문자로 채우기
                    for (i = 0, len = alen; i < len; ++i) {
                        astr = astr + ch;
                    }
                    ret = this.trim(newValue) + astr; // 뒤에서 채우기
                    return ret;
                },

                /**
                 * 왼쪽에 ch 문자 채우기
                 * @memberOf   clt.util#
                 * @method     lpad
                 * @public
                 * @param {string} newValue 문자열
                 * @param {string} len 전체길이
                 * @param {string} ch 대체문자
                 * @return left pad string
                 */
                lpad: function(newValue, len, ch) {
                    if (arguments.length < 3)
                        ch = ' ';

                    var strlen = this.trim(newValue).length;
                    var ret = "";
                    var alen = len - strlen;
                    var astr = "";

                    // 부족한 숫자만큼 len 크기로 ch 문자로 채우기
                    for (i = 0, len = alen; i < len; ++i) {
                        astr = astr + ch;
                    }

                    // 앞에서 채우기
                    ret = astr + this.trim(newValue);
                    return ret;
                },

                /**
                 * null 일 경우, 값 대체
                 * @memberOf   clt.util#
                 * @method     nvl
                 * @public
                 * @param {string} value 문자열
                 * @param {string} replacer 대체문자열
                 * @return {string} string
                 */
                nvl: function(value, replacer) {
                    if (value === null || value === "null" || value === undefined) {
                        return replacer;
                    } else {
                        return value;
                    }
                },

                /**
                 * 문자열에서 모든 공백제거
                 * @memberOf   clt.util#
                 * @method     trimAll
                 * @public
                 * @param {string} str
                 * @return {string} 모든 공백제거 string
                 */
                trimAll: function(str) {
                    return this.replace(str, " ", "");
                },


                /**
                 * 문자열 왼쪽에 존재하는 화이트스페이스 제거
                 * @memberOf   clt.util#
                 * @method     ltrim
                 * @public
                 * @param {string} 문자열
                 * @return {string} left trim string
                 */
                ltrim: function(str) {
                    var i;
                    i = 0;
                    while (str.substring(i, i + 1) == ' ' || str.substring(i, i + 1) == '　')
                        i = i + 1;
                    return str.substring(i);
                },

                /**
                 * 문자열 오른쪽에 존재하는 화이트스페이스 제거
                 * @memberOf   clt.util#
                 * @method     rtrim
                 * @public
                 * @param {string} str 문자열
                 * @return {string} right trim string
                 */
                rtrim: function(str) {
                    var i = str.length - 1;
                    while (i >= 0 && (str.substring(i, i + 1) == ' ' || str.substring(i, i + 1) == '　'))
                        i = i - 1;
                    return str.substring(0, i + 1);
                },

                /**
                 * 폼의 문자길이를 체크한다. 값이 없는경우 리턴 최소, 최대길이보단 큰 경우 false리턴 정상일경우 true리턴
                 * @memberOf   clt.util#
                 * @method     isValidSize
                 * @public
                 * @param {object} form element object
                 * @param {integer} min value
                 * @param {integer} max value
                 * @param {string} msg
                 * @return {boolean} true or false
                 */
                isValidSize: function(obj, min, max, msg) {
                    var str = this.trim(this.getValue(obj));

                    if (!(this.checkLengthUtf8(str) >= min && this.checkLengthUtf8(str) <= max)) {
                        if (msg) {
                            if (min == max)
                                clt.comm.alert(msg + "은(는) " + min + "자 이내로 입력하세요.");
                            else
                                clt.comm.alert(msg + "은(는) " + min + "자 최대 " + max + " 자로 입력하세요.");

                            /*  if (obj.jquery == undefined) {
                                  obj.value = "";
                              } else {
                                  obj.val("");
                              }*/
                        } else {
                            if (min == max)
                                clt.comm.alert("최소 길이는 " + min + " 입니다.");
                            else
                                clt.comm.alert("최대 길이는 " + max + " 입니다.");
                        }
                        this.setObjectFocus(obj);

                        return false;
                    }

                    return true;
                },

                /**
                 * Object 인 경우 포커스를 보낸다
                 * @memberOf   clt.util#
                 * @method     setObjectFocus
                 * @private
                 * @param {object} form element object
                 */
                setObjectFocus: function(obj) {
                    if (typeof(obj) == "object") {
                        obj.focus();
                    }
                },


                /**
                 * 영문과 숫자의 조합 여부 체크
                 * @memberOf   clt.util#
                 * @method     isNumString
                 * @public
                 * @param {object} input
                 * @return {boolean} 혼합일경우 true, 아닌경우 false
                 */
                isNumString: function(obj) {
                    var val = this.getValue(obj);

                    if (val === "") {
                        return true;
                    }
                    val = this.trimAll(val);

                    if (this.isNumber(val) === true) {
                        clt.comm.alert("문자와 조합이 되어야 합니다");
                        obj.focus();
                        return false;
                    } else {
                        return true;
                    }
                },

                /**
                 * array 를 json 형태로 바꾼다
                 * @memberOf   clt.util#
                 * @method     arrayToJson
                 * @private
                 * @param {object}  array object
                 * @return {object}  json object
                 */
                arrayToJson: function(array) {
                    var i, len, jsonObj = {};
                    if (!this.isArray(array)) return jsonObj;
                    for (i = 0, len = array.length; i < len; i++) {
                        jsonObj[array[i]] = true;
                    }
                    return jsonObj;
                },

                /**
                    배열 또는 객체를 Clone 한다.
                    @memberOf   clt.util#
                    @method     cloneArray
                    @public
                    @param      {object}    target      대상 객체
                    @returns    {object}                Clone 객체
                */
                cloneArray : function(target) {
                    var newObj = (this.isArray(target)) ? [] : {};

                    for (var i in target) {
                        if (target[i] && typeof target[i] == "object") {
                            newObj[i] = this.cloneArray(target[i]);
                        } else {
                            newObj[i] = target[i];
                        }
                    }

                    return newObj;
                },

                /**
                 * utf8 형식 기준으로 문자열 길이를 체크한다.
                 * @memberOf   clt.util#
                 * @method     checkLengthUtf8
                 * @public
                 * @param      {object}    target      대상 객체
                 * @returns    {object}                문자열 길이
                */
                checkLengthUtf8 : function(target) {
                    var res  = 0,
                        i    = 0,
                        max  = 0,
                        code = 0,
                        _val = this.getValue(target);

                    for (i = 0, max = _val.length; i < max; i++) {
                        code = _val.charCodeAt(i);

                        if (code <= 0x7f) {
                            res += 1;
                        } else if (code <= 0x7ff) {
                            res += 2;
                        } else if (code >= 0xd800 && code <= 0xdfff) {
                            res += 4;
                            i++;
                        } else if (code < 0xffff) {
                            res += 3;
                        } else {
                            res += 4;
                        }
                    }
                    return res;
                },

                encodeTextUnicode : function(strText) {
                    var i = 0,
                        len = 0,
                        code = "",
                        str = "";

                    if (typeof strText !== "string") {
                        strText = strText.toString();
                    }

                    for (i = 0, len = strText.length; i < len; i++) {
                        str = strText.charCodeAt(i);
                        if (code == "") {
                            code += str;
                        } else {
                            code += "|" + str;
                        }
                    }

                    return code;
                },

                decodeTextUnicode : function(strText) {
                    var i = 0,
                        len = 0,
                        code = "",
                        str = "",
                        arrText = [];

                    if (typeof strText !== "string") {
                        strText = strText.toString();
                    }

                    arrText = strText.split("|");

                    for (i = 0, len = arrText.length; i < len; i++) {
                        str = String.fromCharCode(arrText[i]);

                        code += str;
                    }

                    return code;
                },

            };
        })().init();
    })(clt);
})();