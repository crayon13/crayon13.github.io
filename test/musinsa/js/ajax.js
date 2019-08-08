mss = window.mss || {};
mss.my = window.mss.my || {};

mss.my.ajax = (function () {
    'use strict';

    var _config = mss.ui.config.get(),
        _mask = '<div id="mask" style="position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;"></div>',
        _loadingImg = '' +
            '<div id="loadingImg" class="n-loading-page">' +
            '<img src="' + _config.storeHost + '/skin/musinsa/images/loading.png" class="loading" alt=""/>' +
            '</div>',
        _fn = {
            showLoadingBar: function () {
                var maskHeight = $(document).height(),
                    maskWidth = window.document.body.clientWidth;

                $('body').append(_mask).append(_loadingImg);

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
                    _fn.showLoadingBar();
                }

                jQueryAjaxSettings.complete =  function () {
                    _fn.hideLoadingBar();
                }
            }

            var doneFunction = function() {},
                failFunction = function() {};   

            if ( jQueryAjaxSettings.done || jQueryAjaxSettings.success ) {
                doneFunction = jQueryAjaxSettings.done || jQueryAjaxSettings.success;

                jQueryAjaxSettings.done = jQueryAjaxSettings.success = '';
            }

            if ( jQueryAjaxSettings.fail || jQueryAjaxSettings.error ) {
                failFunction = jQueryAjaxSettings.fail || jQueryAjaxSettings.error;

                jQueryAjaxSettings.fail = jQueryAjaxSettings.error = '';
            }

            $.ajax(jQueryAjaxSettings)
                .done(doneFunction)
                .fail(failFunction);

        }
    }
}());
