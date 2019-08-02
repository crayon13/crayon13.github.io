mss = window.mss || {};
mss.ui = window.mss.ui || {};

mss.ui.config = (function() {
    var  _config = {
        service : 'musinsa',
        magazineHost : 'https://www.musinsa.com',
        storeHost : 'https://store.musinsa.com',
        wusinsaHost : 'https://wusinsa.musinsa.com'
    };

    function _replaceObjectValue(targetObject, sourceObject) {
        if ( sourceObject )  {
            $.each(sourceObject,
                function(key, value) {
                    if ( typeof targetObject[key] !== 'undefined' ) {
                        targetObject[key] = value;
                    }
                }
            );
        }
    }

    return {
        get : function() {
            return _config;
        },
        set : function (uiConfig) {
            _replaceObjectValue(_config, uiConfig);
        },
        replaceObjectValue : _replaceObjectValue
    }
}());