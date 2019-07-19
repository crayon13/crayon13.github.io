mss = window.mss || {};
mss.ui = window.mss.ui || {};

mss.ui.gnb = (function() {
    'use strict';

    var config = {
        service : 'musinsa',
        magazineHost : 'https://www.musinsa.com',
        storeHost : 'https://store.musinsa.com',
        wusinsaHost : 'https://wusinsa.musinsa.com',
        showHeaderGroupArea : false
    };

    var data = {
        extendBannerList : [],
        keywordRankList : [],
        campaignList :[]
    }

    // 기존 html상으로 존재하던 script를 내부에 등록한다.
    var func = {
        log : function(functionName, message) {
            var log = functionName +  (message ? ':' + message : '');
            console.log(log);
        },
        addSearchKeywordAreaMsg : function() {
            func.log('addSearchKeywordAreaMsg', 'start')
            $.ajax({
                type: "POST",
                url: func.getServiceHost() + "/app/svc/search_kwd",
                success: function(msg) {
                    $("#search_kwd").html(msg);
                }
            });
        }, closeLayer : function(obj){
            $('.layer-keyword-top').css('display','none');
            if (obj.length == 0){
                $('.layer-keyword-top').toggle();
                $('#recommend_kwd').toggle();
            }
        }, searchKeyword : function() {
            // 검색
            var ff = document.getElementById("search_form");
            var kwd_type = Suggestions.kwd_type;
            var kwd = ff.q.value;

            if (kwd_type == "url") {
                document.location.href = Suggestions.kwd_value;
                return false;
            } else {
                if ( kwd == "" ) {
                    if (ff.q.value == "" || ff.q.value == "검색단어입력") {
                        alert("검색어를 입력하세요.");
                        ff.q.focus();
                        return false;
                    }
                } else {
                    ff.q.value = kwd;
                }

                ff.submit();
            }
        }, getServiceHost : function() {
            if ( !config.serviceHost ) {
                config.serviceHost = ( config.service === 'musinsa' ) ? config.storeHost : config.wusinsaHost;
             }

            return config.serviceHost;
        }
    }

    // htmlFragment들이 등록될 Object 입니다.
    var htmlFragments = {};

    // htmlFragment 구조체 입니다. htmlFragment은 HtmlFragment의 인스턴스를 생성합니다.
    // htmlFragment : htmlFragment의 html태그 입니다.
    //  - string 과 function을 사용 할 수 있습니다.
    //      - function은 html string을 만들때 로직이 필요한 경우 사용합니다.
    //  - bindEvent : htmlFragment 출력 후 binding 할 Event를 정의합니다.
    //      - 개별로 호출하거나 render() 호출하면 함께 실행합니다.
    var HtmlFragment = function(htmlFragmentConfig) {
 
        function _getHtmlFragment() {
            if ( typeof htmlFragmentConfig.htmlFragment === 'function' ) {
                return htmlFragmentConfig.htmlFragment();
            }

            return htmlFragment;
        };

        function _bindEvent() {
            if ( typeof htmlFragmentConfig.bindEvent === 'function' ) {
                htmlFragmentConfig.bindEvent();
            }
        };

        function _render() {
            if ( typeof htmlFragmentConfig.render === 'function') {
                htmlFragmentConfig.render();
            } else {
                document.write( _getHtmlFragment() );
            }

            _bindEvent();
        };

        return {
            getHtmlFragment : _getHtmlFragment,
            bindEvent : _bindEvent,
            render : _render
        };
    };    

    // 상단 확장 배너
    htmlFragments.extendBanner = new HtmlFragment(
        {
            htmlFragment : function() {
                var htmlFragment = 
                    '<div class="extend_banner" style="text-align:center;display:none;">';

                if ( data.extendBannerList && data.extendBannerList.length > 0 ) {
                    var selectedIndex = Math.floor(Math.random() * (data.extendBannerList.length - 0)) + 0;

                    var banner = data.extendBannerList[selectedIndex];

                    if ( banner
                        && banner.title                            
                        && banner.linkUrl1
                        && banner.linkUrl2
                        && banner.imageUrl 
                        && banner.bgcolor        
                         ) {
                        htmlFragment +=
                            '<a href="' + config.storeHost + banner.linkUrl1 + '" target="_blank">' + 
                            '<span style="display:block;overflow:hidden; height:70px;background-color:#' + banner.bgcolor + '" href="' + banner.linkUrl2 + '">' +
                            '<img id="extend_banner_image" src="' + banner.imageUrl + '" alt="' + banner.title + '"></span></a>'
                    }
                }
                    
                htmlFragment +=
                    '   <div class="btn_banner_close">' + 
                    '       <a id="extend_banner_close" href="javascript:void(0)">' +  
                    '           <img src="' + config.storeHost + '/skin/musinsa/images/top_banner_close.png" alt="배너 닫기" /></a>' + 
                    '   </div>' + 
                    '</div>'; 

                    return htmlFragment;
            },
            bindEvent : function() {
                // html에 inline으로 선언 된 script를 bindEvent로 옮겼습니다.
                //      - html에 inline으로 선언 된 script를 삭제 해야 합니다.
                $('#extend_banner_close').on('click', 
                    function() {
                        $('.extend_banner').hide();
                        setCookie("musinsa_banner_close", "1", 1);
                    } 
                )
                // html에 inline으로 선언 된 script를 bindEvent로 옮겼습니다.
                //      - html에 inline으로 선언 된 script를 삭제 해야 합니다.
                $(function() {
                    var special_top_open_yn = getCookie("special_top_open_yn");
                    var musinsa_banner_close = getCookie("musinsa_banner_close");
                
                    if ( special_top_open_yn == 'Y' ) {
                        if ( musinsa_banner_close != "1" && $('#extend_banner_image').length > 0 ) {
                            $('.extend_banner').show();
                        }
                    }
                
                    if (getCookie("tvcf_close") != "done"){
                        $('#tvcf_close').show();
                    }
                });            
            }, 
            render : function() {
                // gnb.js가 <div class="top-column column"> 내부로 옮겨저서 extendBanner 를 top-column 위로 올리는 작업이 먼저 되어야 합니다.
                $(htmlFragments.extendBanner.getHtmlFragment()).insertBefore('.top-column');

                if ( $('#extend_banner_image').length > 0  ) {
                    $('.extend_banner').show();
                }
            }
        }
    );
    
    // 검색창
    htmlFragments.searchInput = new HtmlFragment(
        {
            htmlFragment : function() {
                return (
                    '				<!--검색창-->' +
                    '				<div class="fl searchInput-box box">' +
                    '					<form id="search_form" method="get" action="'+ func.getServiceHost() + '/app/product/search">' +
                    '						<input id="search_type" type="hidden" name="type" value="">' +
                    '						<input id="search_query" class="search head-search-inp" type="text" name="q" maxlength="30" autocomplete="off"/>' +
                    '						<span  id="search_button" class="search-btn btn ui-head-search-btn"><i class="ico ico-search">검색</i></span>' +
                    '						<!-- [D] 이미지 검색 버튼 -->' +
                    '						<span class="cam-btn btn ui-head-search-btn"><i class="ico ico-cam">이미지 검색</i></span>' +
                    '					</form>' +
                    '				</div>' +
                    '				<!--//검색창-->' 
                );
            }
            , bindEvent : function() {
                func.log('searchInput', 'bind');

                // html에 onclick으로 선언 된 script를 bindEvent로 옮겼습니다.         
                $('#search_query').on('click keydown keyup', 
                    function(event) {
                        func.log('searchInput', 'event : ' + event.type);

                        switch(event.type) {
                            case 'click' :
                                    if ($('#recommend_kwd').css('display') == 'none') {
                                        if ($('.layer-keyword-top').css("display") == "none") {
                                            if (($("#search_kwd div").length == 0)){
                                                func.addSearchKeywordAreaMsg();
                                                //search_kwd();
                                            }
                                            $('.layer-keyword-top').toggle();
                                        }
                                    }                             
                                break;       
                            case 'keydown' :
                                func.log('searchInput', 'keyup value : ' + this.value + ' : ' + event.keyCode );

                                if ( event.keyCode === 13 ) {
                                    func.searchKeyword();                    
                                    return false;
                                }

                                //Suggestions.Go();
                                break;                                             
                            case 'keyup' :
                                func.log('searchInput', 'keyup value :' + this.value);

                            //closeLayer(this.value);                            
                                func.closeLayer(this.value);
                                //Suggestions.Do(this.value,'search_layer','suggest_keyword','suggest_brand','suggest_items','suggest_goods');
                                break;
                        }

                    }
                );
                
                // html에 onclick으로 선언 된 script를 bindEvent로 옮겼습니다.
                $('#search_button').on('click', 
                    function() {
                        func.log('searchInput', 'search_button : ' + event.type);

                        //SearchKwd(); 
                        func.searchKeyword();                    
                        return false;
                    }
                );
            }
        }
    );   
    
    // 키워드 랭킹
    htmlFragments.keywordRanking = new HtmlFragment(
        {
            htmlFragment : function() {
                var htmlFragment = 
                    '				<!--검색어 랭킹-->' +
                    '				<div class="popularSearchWord-ranking-list-wrapper">' +
                    '					<!--롤링 랭킹-->' +
                    '					<div class="rollingRanking">' +
                    '						<dl class="bxSlider" id="hotkeyword">';

                    if ( data.keywordRankList ) {
                        data.keywordRankList.forEach(
                            function(keyword) {
                                var variation = keyword.variation.split(':');
                                var variattonStatus = variation[0];
                                var variattonStatusClass = (variattonStatus === 'even') ? variattonStatus : 'rank-variation-' + variattonStatus;
                                var variationText = variation[1];

                                htmlFragment += 
                                '	                        <dd class="listItem">' +
                                '								<a href="javascript:void(0)">' +
                                '									<span class="rank">' + keyword.rank + '&nbsp;:&nbsp;</span>' +
                                '									<span class="word">' + keyword.keyword + '</span>' +
                                '									<span class="rank-variation-even rank-variation"><em class="'+ variattonStatusClass + '">' + variationText + '</em></span>' +
                                '								</a>' +
                                '							</dd>';
                            }
                        )
                    }

                    htmlFragment +=
                    '						</dl>' +                
                    '					</div>' +
                    '					<!--//롤링 랭킹-->' +
                    '					<!--랭킹 팝업 : 개선 후 삭제-->' +
                    '										<!--//랭킹 팝업 : 개선 후 삭제-->' +
                    '				</div>' +
                    '				<!--//검색어 랭킹-->';

                return htmlFragment;
            }, 
            bindEvent : function() {
                // 인기 검색어 mouseenter
                // html에 inline으로 선언 된 script를 bindEvent로 옮겼습니다.
                //      - html에 inline으로 선언 된 script를 삭제 해야 합니다.            
                $('#hotkeyword').mouseenter(function() {
                    if ($('#recommend_kwd').css('display') === 'none'){
                        if (($("#search_kwd div").length == 0)){
                            //search_kwd();
                            // html에 inline으로 선언 된 search_kwd를 func내에 새로운 이름으로 추가 했습니다.
                            func.addSearchKeywordAreaMsg();
                        }

                        $('.layer-keyword-top').css('display', 'block');
                    }
                });

                // 인기 검색어 mouseleave
                // html에 inline으로 선언 된 script를 bindEvent로 옮겼습니다.
                //      - html에 inline으로 선언 된 script를 삭제 해야 합니다.                   
                $('.layer-keyword-top').mouseleave(function() {
                    $('.layer-keyword-top').css('display','none');
                });            
            }
        }
    );    

    // 캠페인
    htmlFragments.campaign = new HtmlFragment(
        {
            htmlFragment : function() {
                var htmlFragment = '';
                if ( data.campaignList ) {
                    data.campaignList.forEach(
                        function(campaign) {
                            htmlFragment += '<li><a href="' + campaign.linkUrl + '" style="color:' + campaign.color + '">'
                            + campaign.title + '</a></li>';
                        }
                    )
                }
                return htmlFragment;
            }
        }
    );

    htmlFragments.baseArea = new HtmlFragment(
        {
            htmlFragment : function() {
                var campaignHtmlFragment = htmlFragments.campaign.getHtmlFragment();
                var htmlFragment =
                    '<div class="main-wrapper wrapper">' +
                    '	<h1 class="title"><a href="/">MUSINSA STORE</a></h1>' +
                    '	<div class="search-wrapper wrapper clearfix">' +
                    htmlFragments.searchInput.getHtmlFragment() +
                    htmlFragments.keywordRanking.getHtmlFragment() + 
                    '	</div>' +
                    '	<!--오른쪽 상단 메뉴-->' +
                    '	<div class="gnb wrapper clearfix">' +
                    '		<ul class="gnb-list clearfix gnb-list-wrap">' +
                    htmlFragments.campaignHtmlFragment +
                    '			<!-- [D] 캠페인이 없을 경우 랭킹 li에 style="padding-left:10px" 추가 -->' + 
                    '';
                
                if ( htmlFragments.campaignHtmlFragment ) {
                    htmlFragment +=
                    '			<li class="hovering gnb-ranking-list">';
                } else {
                    htmlFragment +=
                    '			<li class="hovering gnb-ranking-list" style="padding-left:10px">';
                }
                
                htmlFragment +=
                    '				<a href="' + config.storeHost + '/app/contents/bestranking">랭킹</a>' +
                    '				<ul class="hoverTarget">' +
                    '					<li><a href="' + config.storeHost + '/app/contents/bestranking"><span>상품</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/usr/brand_rank"><span>브랜드</span></a></li>' +
                    '				</ul>' +
                    '			</li>' +
                    '			<li class="hovering">' +
                    '				<a href="' + config.storeHost + '/app/news/lists">신상품</a>' +
                    '				<ul class="hoverTarget">' +
                    '					<li><a href="' + config.storeHost + '/app/news/lists"><span>신상품</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/brand_event/lists"><span>신규 브랜드</span></a></li>' +
                    '				</ul>' +
                    '			</li>' +
                    '			<li class="hovering">' +
                    '				<a href="' + config.storeHost + '/app/contents/brandshop">브랜드</a>' +
                    '				<ul class="hoverTarget">' +
                    '					<li><a href="' + config.storeHost + '/app/contents/brandshop"><span>브랜드</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/designer/lists"><span>디자이너</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/select"><span>셀렉트숍</span></a></li>' +
                    '				</ul>' +
                    '			</li>' +
                    '			<li class="hovering gnb-style-list">' +
                    '				<a href="' + config.storeHost + '/app/styles/lists">코디</a>' +
                    '				<ul class="hoverTarget">' +
                    '					<li><a href="' + config.storeHost + '/app/styles/lists"><span>스타일링</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/staff/lists"><span>스태프 스냅</span></a></li>' +
                    '				</ul>' +
                    '			</li>' +
                    '			<li class="hovering gnb-special">' +
                    '				<a href="' + config.storeHost + '/app/showcase/lists">스페셜</a>' +
                    '				<ul class="hoverTarget">' +
                    '					<li><a href="' + config.storeHost + '/app/showcase/lists"><span>쇼케이스</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/specialissue/lists"><span>스페셜 이슈</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/exclusive/lists"><span>단독 상품</span></a></li>' +
                    '											</ul>' +
                    '			</li>' +
                    '			<li class="hovering gnb-contents">' +
                    '				<a href="' + config.storeHost + '/app/curating/lists">콘텐츠</a>' +
                    '				<ul class="hoverTarget">' +
                    '					<li><a href="' + config.storeHost + '/app/curating/lists"><span>큐레이팅</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/video/lists"><span>비디오</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/celebrity/lists"><span>셀러브리티</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/reviews/lists"><span>회원 후기</span></a></li>' +
                    '				</ul>' +
                    '			</li>' +
                    '			<li class="hovering gnb-onsale">' +
                    '				<a href="' + config.storeHost + '/app/contents/onsale">세일</a>' +
                    '				<ul class="hoverTarget">' +
                    '					<li><a href="' + config.storeHost + '/app/contents/onsale"><span>세일</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/contents/onsale?sale_yn=Y&sale_dt_yn=Y&chk_timesale=on"><span>타임세일</span></a></li>' +
                    '					<li class="list_clearance"><a href="' + config.storeHost + '/app/clearance/lists"><span>클리어런스</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/plan/lists"><span>기획전</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/contents/coupon_online"><span>쿠폰</span></a></li>' +
                    '					<li><a href="' + config.storeHost + '/app/contents/gift_list">사은품</a></li>' +
                    '				</ul>' +
                    '			</li>' +
                    '			<li class="hovering gnb-event">' +
                    '										<a href="' + config.storeHost + '/app/content/s/usr/membership">' +
                    '											이벤트' +
                    '				</a>' +
                    '				<ul class="hoverTarget">' +
                    '					<li><a href="' + config.storeHost + '/app/content/s/usr/membership"><span>천원 이벤트</span></a></li>' +
                    '					<li><a href="' + config.magazineHost + '/invitation/friend/"><span>친구 초대</span></a></li>' +
                    '				</ul>' +
                    '			</li>' +
                    '			<li class="emphasis-blue hovering magazine">' +
                    '				<a href="' + config.magazineHost + '">매거진</a>' +
                    '				<ul class="hoverTarget ">' +
                    '					<li><a href="' + config.magazineHost + '/?m=news"><span>뉴스</span></a></li>' +
                    '					<li><a href="' + config.magazineHost + '/?m=magazine"><span>매거진</span></a></li>' +
                    '					<li><a href="' + config.magazineHost + '/?m=lookbook"><span>룩북</span></a></li>' +
                    '					<li><a href="' + config.magazineHost + '/?m=street"><span>스트릿 스냅</span></a></li>' +
                    '					<li><a href="' + config.magazineHost + '/?m=gallery"><span>갤러리</span></a></li>' +
                    '					<li><a href="' + config.magazineHost + '/?m=market"><span>중고장터</span></a></li>' +
                    '					<li><a href="' + config.magazineHost + '/?m=forum"><span>커뮤니티</span></a></li>' +
                    '				</ul>' +
                    '			</li>' +
                    '		</ul>' +
                    '	</div>' +
                    '	<!--//오른쪽 상단 메뉴-->' +
                    '' +
                    '	<!-- 통합 검색폼 키워드 입력시 뜨는 추천검색어레이어-->' +
                    '	<div id="recommend_kwd" class="store-searchWord-box searchWord-box box clearfix ui-search-recommend-area ui-search-recommend-area-result search_layer">' +
                    '		<div class="left-column column">' +
                    '			<dl id="suggest_keyword" class="recommendSearchWord-list list store_list">' +
                    '				<dt class="title-listItem listItem clearfix">' +
                    '					<span class="title">추천 검색어</span>' +
                    '				</dt>' +
                    '			</dl>' +
                    '			<dl id="suggest_brand" class="recommendBrand-list list store_list">' +
                    '				<dt class="title-listItem listItem clearfix">' +
                    '					<span class="title">추천 브랜드</span>' +
                    '				</dt>' +
                    '			</dl>' +
                    '			<dl id="suggest_items" class="useCategory-list list store_list">' +
                    '				<dt class="title-listItem listItem clearfix">' +
                    '					<span class="title">용도 카테고리</span>' +
                    '				</dt>' +
                    '			</dl>' +
                    '		</div>' +
                    '		<div class="right-column column">' +
                    '			<dl class="recommendProduct-list list store_list">' +
                    '				<dt class="title-listItem listItem clearfix">' +
                    '					<span class="title">추천 상품</span>' +
                    '					<span id="suggest_goods_close" class="closeBtn btn">닫기</span>' +
                    '				</dt>' +
                    '				<div id="suggest_goods">' +
                    '				</div>' +
                    '			</dl>' +
                    '		</div>' +
                    '	</div>' +
                    '	<!-- //통합 검색폼 키워드 입력시 뜨는 추천검색어레이어  : 개선 후 삭제-->' +
                    '' +
                    '	<div id="search_kwd" class="store-searchWord-box searchWord-box box clearfix ui-search-recommend-area ui-search-recommend-area-result layer-keyword-top"></div>' +
                    '</div>' +
                    '		<!--<div class="layerbanner_repeat outerFsetival"><a href="' + config.storeHost + '/app/campaign/main/34">아우터</a></div>-->' +
                    '';

                if ( config.showHeaderGroupArea ) {
                    htmlFragment += 
                    '<!-- 성별 선택 부분 -->' +
                    '<div class="header_group_area">' +
                    '    <ul class="group_list">' +
                    '        <li><a href="'+ config.storeHost + '/app/" class="' + ( config.service === 'musinsa' ? 'selected' : '') + '">전체</a></li>' +
                    '        <li><a href="' + config.wusinsaHost + '/app/" class="' + ( config.service === 'wusinsa' ? 'selected' : '') + '">우신사(여성)</a></li>' +
                    '        <li><a href="'+ config.storeHost + '/app/standards/lists">스탠다드</a></li>' +
                    '    </ul>' +
                    '</div>' +
                    '<!--//성별 선택 부분-->';
                }

                htmlFragment +=
                    '<!--image search layer-->' +
                    '<form id="frm_image_search" method="POST" action="" enctype="multipart/form-data" style="display:none;">' +
                    '	<input id="image_file" name="image_file" type="file">' +
                    '	<input id="submit_image_search" type="submit">' +
                    '</form>' +
                    '<div class="wrap_image_search_form top" style="display:none;">' +
                    '	<div class="tab_menu">' +
                    '		<span class="t1 active">이미지 URL 붙여넣기</span>' +
                    '		<span class="t2">이미지 업로드</span>' +
                    '	</div>' +
                    '	<div class="content">' +
                    '		<div class="c1">' +
                    '			<input type="text" name="image_url" class="image_url">' +
                    '			<input type="button" class="image_url_btn" value="이미지로 검색">' +		
                    '       </div>' +
                    '		<div class="c2">' +
                    '			<span class="image_file_btn">파일 선택</span>' +
                    '			<span class="image_file_text">선택된 파일이 없습니다.</span>' +
                    '			<input type="file" class="image_file">' +
                    '		</div>' +
                    '	</div>' +
                    '</div>' +
                    '<div class="wrap_image_search_form_cover top">여기에 이미지를 드롭하세요.</div>' +
                    '<div class="wrap_image_search_form_mask"></div>' +
                    '<!--//image search layer--></div>';

                return htmlFragment;
            },
            bindEvent : function() {
                // searchInput 은 baseArea 에 포함되어 있기 때문에 baseArea 에서 searchInput의 bindEvent를 실행합니다.
                htmlFragments.searchInput.bindEvent();

                // html에 onclick으로 선언 된 script를 bindEvent로 옮겼습니다.
                $('#suggest_goods_close').on('click', 
                    function() {
                        Suggestions.Close('search_layer');
                        return false;
                    }
                )
            }
        }
    );    

    return {
        setExtendBannerList : function(extendBannerList) {
            data.extendBannerList = extendBannerList || data.extendBannerList;
        },
        setKeywordRankList : function(keywordRankList) {
            data.keywordRankList = keywordRankList || data.keywordRankList;
        },
        setCampaignList : function(campaignList) {
            data.campaignList = campaignList || data.campaignList;
        },
        render : function(configForCreator) {
            if ( configForCreator )  {
                $.each(configForCreator, 
                    function(key, value) {
                        config[key] = value;
                    }
                );
            }
    
            htmlFragments.extendBanner.render();
            htmlFragments.baseArea.render();
        },
        getConfig : function() {
            return config;
        }
    }
}());

// 만약 gnb.js를 gnb.php로 구현 한다면
// 다음처럼 데이터를 mss.gnb 내로 주입 할 수 있을 듯 합니다.

// 확장 배너 데이터 주입
mss.ui.gnb.setExtendBannerList(
    [
        {
            title : '무신사 역시즌 캠페인',
            linkUrl1 : '/app/banner/check/16MAIN_UP_2_1/1',
            linkUrl2 : 'https://store.musinsa.com/app/plan/views/6974',
            imageUrl : '//image.musinsa.com/images/banner/2019071614003800000091806.jpg',
            bgcolor : '#8b7c62'
        },
        {
            title : '무신사 여름 세일',
            linkUrl1 : '/app/banner/check/16MAIN_UP_1_2/1',
            linkUrl2 : 'https://store.musinsa.com/app/event/s/2019summersale/93',
            imageUrl : '//image.musinsa.com/images/banner/2019071611005800000081191.jpg',
            bgcolor : '#e2e2ea'
        }
    ]
);

// 키워드 순위 데이터 주입
mss.ui.gnb.setKeywordRankList(
    [
        {"rank" : "1등","keyword" : "반팔","variation" : "even:-"},
        {"rank" : "2등","keyword" : "반바지","variation" : "even:-"},
        {"rank" : "3등","keyword" : "커버낫","variation" : "up:▲ 1"},
        {"rank" : "4등","keyword" : "디스이즈네버댓","variation" : "down:▼ 1"},
        {"rank" : "5등","keyword" : "87mm","variation" : "up:▲ 32"},
        {"rank" : "6등","keyword" : "무신사 스탠다드","variation" : "up:▲ 11"},
        {"rank" : "7등","keyword" : "로맨틱 크라운","variation" : "even:-"},
        {"rank" : "8등","keyword" : "나이키","variation" : "up:▲ 3"},
        {"rank" : "9등","keyword" : "칼하트","variation" : "up:▲ 3"},
        {"rank" : "10등","keyword" : "반팔티","variation" : "even:-"},
        {"rank" : "11등","keyword" : "셔츠","variation" : "up:▲ 3"},
        {"rank" : "12등","keyword" : "아디다스","variation" : "up:▲ 9"},
        {"rank" : "13등","keyword" : "샌들","variation" : "up:▲ 21"},
        {"rank" : "14등","keyword" : "백팩","variation" : "down:▼ 6"},
        {"rank" : "15등","keyword" : "조거팬츠","variation" : "down:▼ 2"},
        {"rank" : "16등","keyword" : "비바스튜디오","variation" : "up:▲ 16"},
        {"rank" : "17등","keyword" : "마크곤잘레스","variation" : "down:▼ 12"},
        {"rank" : "18등","keyword" : "슬랙스","variation" : "up:▲ 7"},
        {"rank" : "19등","keyword" : "에드","variation" : "down:▼ 13"},
        {"rank" : "20등","keyword" : "Lmc","variation" : "up:▲ 13"},
        {"rank" : "21등","keyword" : "버켄스탁","variation" : "up:▲ 42"},
        {"rank" : "22등","keyword" : "모자","variation" : "up:▲ 19"},
        {"rank" : "23등","keyword" : "에코백","variation" : "down:▼ 4"},
        {"rank" : "24등","keyword" : "앤더슨벨","variation" : "up:▲ 2"},
        {"rank" : "25등","keyword" : "슬리퍼","variation" : "down:▼ 9"},
        {"rank" : "26등","keyword" : "오픈카라셔츠","variation" : "down:▼ 11"},
        {"rank" : "27등","keyword" : "래쉬가드","variation" : "up:▲ 31"},
        {"rank" : "28등","keyword" : "반스","variation" : "up:▲ 20"},
        {"rank" : "29등","keyword" : "힙색","variation" : "up:▲ 30"},
        {"rank" : "30등","keyword" : "타이다이","variation" : "down:▼ 2"},
        {"rank" : "31등","keyword" : "청바지","variation" : "down:▼ 8"},
        {"rank" : "32등","keyword" : "린넨 셔츠","variation" : "up:▲ 18"},
        {"rank" : "33등","keyword" : "디스이즈 네버댓","variation" : "up:▲ 7"},
        {"rank" : "34등","keyword" : "카라티","variation" : "down:▼ 4"},
        {"rank" : "35등","keyword" : "컨버스","variation" : "up:▲ 12"},
        {"rank" : "36등","keyword" : "키르시","variation" : "down:▼ 1"},
        {"rank" : "37등","keyword" : "유니폼브릿지","variation" : "down:▼ 17"},
        {"rank" : "38등","keyword" : "마하그리드","variation" : "up:▲ 5"},
        {"rank" : "39등","keyword" : "와이드팬츠","variation" : "down:▼ 12"},
        {"rank" : "40등","keyword" : "피스워커","variation" : "up:▲ 57"},
        {"rank" : "41등","keyword" : "페이탈리즘","variation" : "up:▲ 79"},
        {"rank" : "42등","keyword" : "스컬프터","variation" : "down:▼ 4"},
        {"rank" : "43등","keyword" : "양말","variation" : "up:▲ 23"},
        {"rank" : "44등","keyword" : "맨투맨","variation" : "down:▼ 35"},
        {"rank" : "45등","keyword" : "canebros","variation" : "down:▼ 21"},
        {"rank" : "46등","keyword" : "가방","variation" : "down:▼ 10"},
        {"rank" : "47등","keyword" : "드로우핏","variation" : "up:▲ 39"},
        {"rank" : "48등","keyword" : "오버핏 반팔","variation" : "up:▲ 13"},
        {"rank" : "49등","keyword" : "네스티킥","variation" : "up:▲ 16"},
        {"rank" : "50등","keyword" : "메신저백","variation" : "up:▲ 2"},
        {"rank" : "51등","keyword" : "원피스","variation" : "up:▲ 5"},
        {"rank" : "52등","keyword" : "닥터마틴","variation" : "up:▲ 18"},
        {"rank" : "53등","keyword" : "모드나인","variation" : "down:▼ 9"},
        {"rank" : "54등","keyword" : "벨트","variation" : "up:▲ 3"},
        {"rank" : "55등","keyword" : "어글리슈즈","variation" : "down:▼ 13"},
        {"rank" : "56등","keyword" : "크로스백","variation" : "up:▲ 38"},
        {"rank" : "57등","keyword" : "슬링백","variation" : "up:▲ 38"},
        {"rank" : "58등","keyword" : "신발","variation" : "down:▼ 5"},
        {"rank" : "59등","keyword" : "티셔츠","variation" : "up:▲ 52"},
        {"rank" : "60등","keyword" : "하와이안 셔츠","variation" : "up:▲ 39"}
    ]   
);

// 캠페인 데이터 주입
mss.ui.gnb.setCampaignList(
    [
        {"linkUrl" : "https://store.musinsa.com/app/event/s/2019summersale/93", "color" : "#ff0000", "title" : "여름세일"},
        {"linkUrl" : "https://store.musinsa.com/app/plan/views/6974", "color" : "#1d67c3", "title" : "역시즌"}
    ]
);
