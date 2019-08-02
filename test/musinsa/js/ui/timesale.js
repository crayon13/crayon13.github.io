mss.ui.timesale = (function() {
    'use strict';

    var config = mss.ui.config.get();

    var settings = {
        sharpTimeCheckIntervalSec : 600,
        cookieKey : 'is_ad_time_sale',
        remainShapTimeSec : 0
    };

    var fn = {
        isViewTimeSale : function() {
            if ( getCookie(settings.cookieKey) ) {
                return true;
            }

            return false;
        }, 
        countDownAdTimeSale : function (goodsNo, remainTimeSec) {
            remainTimeSec = parseInt(remainTimeSec,10) - 1;
            day = Math.floor(remainTimeSec / (3600 * 24)); mod = remainTimeSec % (3600 * 24);
            hrs = Math.floor(mod / 3600); mod = mod % 3600;
            min = Math.floor(mod / 60);
            sec = mod % 60;
            hrs = (hrs > 9) ? hrs.toString() : '0' + hrs.toString();
            min = (min > 9) ? min.toString() : '0' + min.toString();
            sec = (sec > 9) ? sec.toString() : '0' + sec.toString();
            $('#ad_time_sale_day_' + goodsNo).text("D-" + day);
            $('#ad_time_sale_time_' + goodsNo).text(hrs + ":" + min + ":" + sec);
        
            if(remainTimeSec > 0) {
                setTimeout(function(){countDownAdTimeSale(goodsNo, remainTimeSec);},1000);
            }
        }, 
        countDownSharpTime : function() {
            settings.remainShapTimeSec = parseInt(settings.remainShapTimeSec, 10) - 1;
  
            if(settings.sharpTimeCheckIntervalSec === 0) {
              return false;
            }
          
            if(settings.remainShapTimeSec > 0) {
              setTimeout(function(){
                fn.countDownSharpTime();
              }, 1000);
              settings.sharpTimeCheckIntervalSec--;
            } else {
                fn.getAdTimeSale();
            }            
        }, getAdTimeSale : function() {
            $.ajax({
                type: 'GET',
                dataType: 'jsonp',
                //jsonpCallback: 'getAdTimeSaleCallback',
                url: config.storeHost + '/app/svc/get_ad_time_sale_list/',
                success: function(json) {
                    if(json.length > 0) {
                        var contents = '';
                        for(var i=0; i<json.length; i++) {
                            /* 20180405 타임세일 레이어 디자인 개선 START */
                            contents += '' + 
                                '<a href="' + config.storeHost + '/app/product/detail/'+ json[i].goods_no + '/' + json[i].goods_sub + '" class="box_link">' +
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

                            contents += + '' + 
                                '</span>' + 
                                '</a>';
                            /* 20180405 타임세일 레이어 디자인 개선 END */
                        }

                        $('#ad_time_sale').html(contents).promise().done(function() {
                            // 오픈시에 아래 주석 제거 필요
                            $('#layer_timesale').show(200);
                            if(json.length > 0) {
                                for(var i=0; i<json.length; i++) {
                                    var goods_no = json[i].goods_no;
                                    var remainTimeSec = json[i].time_diffs.diff_time;
                                    fn.countDownAdTimeSale(goods_no, remainTimeSec);
                                }
                            }
    
                            $('#ad_time_sale').cycle({
                                fx : 'none',
                                speed : 500,
                                timeout: 0,
                                next : '#ad_time_sale_next',
                                prev : '#ad_time_sale_prev'
                            });
    
                            if(getCookie(settings.cookieKey) === '') {
                                setCookie(settings.cookieKey, 1, 1);
                            }
                        });
                    }
                }
            });
        }

    }
    
    // footer는 gnb에 비해 단순하여 복잡한 HtmlFragment Object를 구현하지 않습니다.
    function getHtmlFragment() {
        var htmlFragment = '' +
            '<div class="layer_salebox" id="layer_timesale" style="display:">' + 
            '	<strong class="box_tit">타임 세일</strong>' + 
            '	<div id="ad_time_sale" style="width:100%"></div>' + 
            '	<button class="btn nav-btn prev" id="ad_time_sale_prev">이전 상품 보기</button>' + 
            '	<button class="btn nav-btn next" id="ad_time_sale_next">다음 상품 보기</button>' + 
            '	<div class="box_btn">' + 
            '		<a href="javascript:void(0)" class="close">닫기</a>' + 
            '		<a href="' + config.storeHost + '/app/contents/onsale?sale_yn=Y&sale_dt_yn=Y&chk_timesale=on" class="all">전체 보기</a>' + 
            '	</div>' + 
            '</div>';

        return htmlFragment;
    }

    function bindEvent() {
        $('.close', '#layer_timesale').on('click', 
            function() {
                $('#layer_timesale').hide(200);
                delCookie('is_ad_time_sale');

                return false;
            }
        );

        $(document).ready(function() {
            if( fn.isViewTimeSale() ) {
                fn.getAdTimeSale();
            } else {
                fn.countDownSharpTime();
            }
        });
    }

    return {
        render : function(timeSaleSettings) {
            mss.ui.config.replaceObjectValue(settings, timeSaleSettings);
            document.write(getHtmlFragment());
            bindEvent();
        }
    };
}());