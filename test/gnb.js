musinsa = window.musinsa || {};

musinsa.gnb = function(config, gnbData) {
    'use strict';

    var _config = config;
    var _gnbData = gnbData;

    // gnb 전체 그리기
    var _render = function() {

    }

    var _extendBanner = {
        htmlFragment : 
        (
            '<div class="extend_banner" style="text-align:center; ">' 
            + '<div class="btn_banner_close" style="display:none;">'
            + '<a id="extend_banner_close" href="javascript:void(0)" onclick="banner_close(); return false;">' 
            + '<img src="/skin/musinsa/images/top_banner_close.png" alt="배너 닫기" /></a>'
            + '</div>'
            + '</div>'
        ),
        bindEvent : function() {
            $('#extend_banner_close').on('click', 
                function(){
                    $('.extend_banner').hide();
                    setCookie("musinsa_banner_close", "1", 1);
                } 
            )
        }, 
        render : function() {
            document.write(this.htmlFragment);
            this.bindEvent();
        }
        
    }

    _render();
}



// musinsa.gnb = {
//     config : {},
//     gnbData : {}
//     render : function(config, gnbData) {
//         this.config = config;
//         this.gnbData = gnbData;
//         //dsfajdaskfjdaskl
//         var _gnbHtml = '<div id="gnbWrapper">';

//         var _logoClass = 'logo_w';
//         if ( this.config.site != "musinsa") {
//             _logoClass = 'logo_m';
//         } 
//         _gnbHtml += '<div class="' + _logoClass + '"></div>';
//         _gnbHtml += '<div><input type="text"  id="keyword"/></div>';
//         _gnbHtml += '<div id="keywordRank"></div>';
//         _gnbHtml += '</div>';
        
//         document.write(_gnbHtml);

//         this.doPostProcess();
//     },
//     doPostProcess : function() {
//         // 실시간 검색어를 넣자!!
//         this.renderKeyword();
//         //this.a();
//         this.bindEventForKeyword();
    
//     },
//     renderKeyword : function() {
//         _this.gnbData를 활용
        
//     }, 
//     bindEventForKeyword : function() {
//         _this.gnbData
//     }
// };