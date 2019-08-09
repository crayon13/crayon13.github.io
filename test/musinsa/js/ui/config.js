mss = window.mss || {};
mss.ui = window.mss.ui || {};

mss.ui.config = (function() {
    var  _config = {
        service : 'musinsa',
        magazineHost : 'https://www.musinsa.com',
        storeHost : 'https://store.musinsa.com',
        wusinsaHost : 'https://wusinsa.musinsa.com',
        serviceHost :''
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
        get : function get() {
            return _config;
        },
        set : function set(uiConfig) {
            _replaceObjectValue(_config, uiConfig);
        },
        replaceObjectValue : _replaceObjectValue,
        getServiceHost : function getServiceHost() {
            if ( !_config.serviceHost ) {
                _config.serviceHost = ( _config.service === 'musinsa' ) ? _config.storeHost : _config.wusinsaHost;
            }

            return _config.serviceHost;
        }
    }
}());
