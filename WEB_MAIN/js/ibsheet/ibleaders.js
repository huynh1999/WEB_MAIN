/*
 * http://www.ibleaders.co.kr
 * Call (02)2621-2288~9
 *  2017-10-16 OPUS Logistics LIVE
 *  Copyright 2015 IB LEADERS CO. LTD.
 */
var ibleaders;
ibleaders = ibleaders || {};

ibleaders = {
    /**
     * licenseType
     *
     * enum [ "file", "value" ] default 'value'
     *
     * file로 사용할 경우 licenseType 을 명시하고 해당 프로퍼티 value로 "file" 을 설정한다.
     *
     */

    /**
     * license
     *
     * licenseType이 "value" 일 경우 라이선스 값을 기입한다.
     * licenseType이 "file" 일 경우 라이선스 파일 명을 기입한다.
     */
    // license: "license",
    license: "W2FtSztPKCFwbjY6YTJxbn8RakI6Ri1pOTJ8JHIhay1eShhcO0QBJTpkMT1hNGUhYw==" // 운영 라이선스
    
    // 아래는 SSL 라이선스
	//license: "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"
};