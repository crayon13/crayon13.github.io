mss = window.mss || {};
mss.ui = window.mss.ui || {};

mss.ui.config = (function() {
    var _this = {
        service : 'musinsa',
        magazineHost : 'https://www.musinsa.com',
        storeHost : 'https://store.musinsa.com',
        wusinsaHost : 'https://wusinsa.musinsa.com',
        setshowHeaderGroupArea : false
    };

    return {
        get : function() {
            return _this;
        },
        set : function (configForConstructor) {
            if ( configForConstructor )  {
                $.each(configForConstructor,
                    function(key, value) {
                        if ( typeof _this[key] !== 'undefined' ) {
                            _this[key] = value;
                        }
                    }
                );
            }
    
        }
    }
}());