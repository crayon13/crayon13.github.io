musinsa = window.musinsa || {};

musinsa.gnb = {
    config : {
        service : 'musinsa',
        serviceHost : 'http://store.musinsa.com'
    },
    data : {
        keywordRankList : []
    }, 
    fn : {

    },
    htmlFragment : {
        template : function(htmlFragmentString, bindEvent) {
            var _htmlFragmentString = htmlFragmentString;
            var _bindEvent = bindEvent;
    
            function _getHtmlFragment() {
                if ( typeof _htmlFragmentString === 'function' ) {
                    return _htmlFragmentString();
                }
                return _htmlFragmentString;
            }
    
            function _bindEvent() {
                if ( typeof _bindEvent === 'function' ) {
                    _bindEvent();
                }
            }
    
            function _render() {
                document.write( _getHtmlFragment() );
                _bindEvent();
            }
    
            return {
                getHtmlFragment : _getHtmlFragment,
                render : _render
            }
        }

    },
    render : function() {

    }, init : function(config) {
        this.config = config || this.config;
    }, setKeywordRankList : function(keywordRankList) {
        this.data.keywordRankList = keywordRankList;
    }
}