mss.ui.timesale = (function() {
    'use strict';

    var _config = mss.ui.config.get(),
        _settings = {
            sharpTimeCheckIntervalSec : 600,
            cookieKey : 'is_ad_time_sale',
            remainShapTimeSec : 1,
            jsonpUrl : _config.storeHost + '/app/svc/get_ad_time_sale_list/'
        },
        _fn = {
            isViewTimeSale : function() {
                if ( getCookie(_settings.cookieKey) ) {
                    return true;
                }

                return false;
            },
            countDownAdTimeSale : function (goodsNo, remainTimeSec) {
                remainTimeSec = parseInt(remainTimeSec,10) - 1;
                var day = Math.floor(remainTimeSec / (3600 * 24)),
                    modForHour = remainTimeSec % (3600 * 24),
                    hrs = Math.floor(modForHour / 3600),
                    modForSec = modForHour % 3600,
                    min = Math.floor(modForSec / 60),
                    sec = modForSec % 60;

                hrs = (hrs > 9) ? hrs.toString() : '0' + hrs.toString();
                min = (min > 9) ? min.toString() : '0' + min.toString();
                sec = (sec > 9) ? sec.toString() : '0' + sec.toString();

                $('#ad_time_sale_day_' + goodsNo).text("D-" + day);
                $('#ad_time_sale_time_' + goodsNo).text(hrs + ":" + min + ":" + sec);

                if(remainTimeSec > 0) {
                    setTimeout(function(){_fn.countDownAdTimeSale(goodsNo, remainTimeSec);},1000);
                }
            },
            countDownSharpTime : function() {
                _settings.remainShapTimeSec = parseInt(_settings.remainShapTimeSec, 10) - 1;

                if(_settings.sharpTimeCheckIntervalSec === 0) {
                    return false;
                }

                if(_settings.remainShapTimeSec > 0) {
                    setTimeout(function(){
                        _fn.countDownSharpTime();
                    }, 1000);
                    _settings.sharpTimeCheckIntervalSec--;
                } else {
                    _fn.getAdTimeSale();
                }
            }, getAdTimeSale : function() {
                $.ajax({
                    type: 'GET',
                    dataType: 'jsonp',
                    url : _settings.jsonpUrl,
                    success: function(json) {
                        if( json.length ) {
                            var contents = '';
                            for(var i=0; i<json.length; i++) {
                                /* 20180405 타임세일 레이어 디자인 개선 START */
                                contents += '' +
                                    '<a href="' + _config.storeHost + '/app/product/detail/'+ json[i].goods_no + '/' + json[i].goods_sub + '" class="box_link">' +
                                    '<span class="box_time font-mss">' +
                                    '   <span id="ad_time_sale_day_' + json[i].goods_no + '"></span>' +
                                    '   <span id="ad_time_sale_time_' + json[i].goods_no + '"></span>' +
                                    '</span>' +
                                    '<span class="img">' +
                                    '   <img src="//image.msscdn.net/images/goods_img/'
                                    + json[i].reg_dm + '/' + json[i].goods_no + '/' + json[i].goods_no + '_' + json[i].img_idx + '_100.' + json[i].img_ext + '" alt="" /></span>' +
                                    '<em class="brand">' + json[i].brand_nm + '</em>' +
                                    '<span class="goods">' + json[i].goods_nm + '</span>' +
                                    '<span class="price"><strong>' + Comma(json[i].price) + '</strong><span class="unit">원</span>';

                                if(json[i].normal_price > json[i].price) {
                                    contents += '<del class="del">' + Comma(json[i].normal_price) + '원</del>';
                                }

                                contents += '' +
                                    '</span>' +
                                    '</a>';
                                /* 20180405 타임세일 레이어 디자인 개선 END */
                            }

                            $('#ad_time_sale').html(contents).promise().done(function() {
                                // 오픈시에 아래 주석 제거 필요
                                $('#layer_timesale').show(200);
                                if( json.length ) {
                                    for(var i=0; i<json.length; i++) {
                                        var goods_no = json[i].goods_no;
                                        var remainTimeSec = json[i].time_diffs.diff_time;
                                        _fn.countDownAdTimeSale(goods_no, remainTimeSec);
                                    }
                                }

                                $('#ad_time_sale').cycle({
                                    fx : 'none',
                                    speed : 500,
                                    timeout: 0,
                                    next : '#ad_time_sale_next',
                                    prev : '#ad_time_sale_prev'
                                });

                                if( !getCookie(_settings.cookieKey) ) {
                                    setCookie(_settings.cookieKey, 1, 1);
                                }
                            });
                        }
                    }
                });
            }
        }

    // footer는 gnb에 비해 단순하여 복잡한 HtmlFragment Object를 구현하지 않습니다.
    function _getHtmlFragment() {
        var htmlFragment = '' +
            '<div class="layer_salebox" id="layer_timesale" style="display:none">' +
            '	<strong class="box_tit">타임 세일</strong>' +
            '	<div id="ad_time_sale" style="width:100%"></div>' +
            '	<button class="btn nav-btn prev" id="ad_time_sale_prev">이전 상품 보기</button>' +
            '	<button class="btn nav-btn next" id="ad_time_sale_next">다음 상품 보기</button>' +
            '	<div class="box_btn">' +
            '		<a href="javascript:void(0)" class="close">닫기</a>' +
            '		<a href="' + _config.storeHost + '/app/contents/onsale?sale_yn=Y&sale_dt_yn=Y&chk_timesale=on" class="all">전체 보기</a>' +
            '	</div>' +
            '</div>';

        return htmlFragment;
    }

    function _bindEvent() {
        $('#layer_timesale .close').on('click',
            function() {
                $('#layer_timesale').hide(200);
                delCookie('is_ad_time_sale');

                return false;
            }
        );

        $(document).ready(function() {
            if( _fn.isViewTimeSale() ) {
                _fn.getAdTimeSale();
            } else {
                _fn.countDownSharpTime();
            }
        });
    }

    return {
        render : function(timeSaleSettings) {
            mss.ui.config.replaceObjectValue(_settings, timeSaleSettings);
            document.write(_getHtmlFragment());
            _bindEvent();
        }
    };
}());
