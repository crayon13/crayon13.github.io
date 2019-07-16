musinsa = window.musinsa || {};

musinsa.Pagiantion = function(paginationId, formId, goPage) {
    'use strict';

    var config = {
        paginationId : 'pagination',
        formId : 'searchForm',
        goPage : function (page, $pageObj) {
            var $searchForm = $('#' + config.formId);
            console.log(config.formId);
            if ($searchForm.size()) {
                $searchForm.find('[name=page]').val(page);
    
                console.log(logHeader + 'formId : ' + config.formId + '\n' + $searchForm.serialize());
                // location.href = '?' + $searchForm.serialize();
            } else {
                console.log(logHeader + $pageObj.attr('href'));
                // location.href = $pageObj.attr('href');
            }
        }
    };

    config.paginationId = paginationId || config.paginationId;
    config.formId = formId || config.formId;
    config.goPage = goPage || config.goPage;

    var logHeader = 'paginationId : ' + config.paginationId + '\n';

    var _init = function() {
        $(document).ready(function () {
            $('#' +config.paginationId + ' .page').click(function (event) {
                console.log($(this).html()) 
                event.preventDefault();
                var $this = $(this);
        
                config.goPage($this.attr('page'), $this); // 추후 Html 5기반이 된다면 data-pageNo 속성으로 변경해야 할듯...
            });
        });
    }

    return {
        init : _init
    }
}
