mss = window.mss || {};
mss.my = window.mss.my || {};

mss.my.ajax = (function () {
    'use strict';

    var mask = '<div id="mask" style="position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;"></div>';

    var loadingImg = '' +
        '<div id="loadingImg" style="position:fixed; left:50%; top:40%; display:none; z-index:10000;">' +
        '<img src="/member/static/img/loading.gif"/>' +
        '</div>';

    var fn = {
        showLoadingBar: function () {
            var maskHeight = $(document).height();
            var maskWidth = window.document.body.clientWidth;

            $('body').append(mask).append(loadingImg);

            $('#mask')
                .css({'width': maskWidth, 'height': maskHeight, 'opacity': '0.3'})
                .show();
            $('#loadingImg').show();
        },
        hideLoadingBar: function () {
            $('#mask, #loadingImg')
                .hide()
                .remove();
        }
    }

    return {
        call: function (jQueryAjaxSettings, isUseLoading) {
            if(isUseLoading) {
                jQueryAjaxSettings.beforeSend = function () {
                    fn.showLoadingBar();
                }

                jQueryAjaxSettings.complete =  function () {
                    fn.hideLoadingBar();
                }
            }

            $.ajax(jQueryAjaxSettings);
        }
    }
}());