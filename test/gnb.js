musinsa = window.musinsa || {};

musinsa.gnb = function(config, gnbData) {
    'use strict';

    var _config = config || {
        service : 'musinsa',
        serviceHost : 'http://store.musinsa.com',
        keywordRankList : []
    };

    var _gnbData = gnbData || {};

    function _log(message) {
        console.log(message);
    }

    var _HtmlFragment = function(htmlFragmentString, bindEvent) {
        var __htmlFragmentString = htmlFragmentString;
        var __bindEvent = bindEvent;

        function _getHtmlFragment() {
            if ( typeof __htmlFragmentString === 'function' ) {
                return __htmlFragmentString();
            }
            return __htmlFragmentString;
        }

        function _bindEvent() {
            if ( typeof __bindEvent === 'function' ) {
                __bindEvent();
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
    };    

    // gnb 전체 그리기
    function _render() {
        _log('start');
        _extendBanner.render();
        _topColum.render();
    }

    // 상단 확장 배너
    var _extendBanner = new _HtmlFragment(
        '<div class="extend_banner" style="text-align:center; ">' + 
        '   <div class="btn_banner_close" style="display:;">' + 
        '       <a id="extend_banner_close" href="javascript:void(0)">' +  
        '           <img src="' + _config.serviceHost + '/skin/musinsa/images/top_banner_close.png" alt="배너 닫기" /></a>' + 
        '   </div>' + 
        '</div>',
        function() {
            $('#extend_banner_close').on('click', 
                function(){
                    _log('_extendBanner.bindEvent');
                    $('.extend_banner').hide();
                    setCookie("musinsa_banner_close", "1", 1);
                } 
            )
        }
    );
    
    // 검색창
    var _searchInput = new _HtmlFragment(
        '				<!--검색창-->' +
        '				<div class="fl searchInput-box box">' +
        '					<form id="search_form" method="get" action="/app/product/search">' +
        '						<input id="search_type" type="hidden" name="type" value="">' +
        '						<input id="search_query" class="search head-search-inp" type="text" name="q" maxlength="30" autocomplete="off" onkeyup="closeLayer(this.value); Suggestions.Do(this.value,\'search_layer\',\'suggest_keyword\',\'suggest_brand\',\'suggest_items\',\'suggest_goods\');" onkeydown="Suggestions.Go();"/>' +
        '						<span class="search-btn btn ui-head-search-btn" onclick="SearchKwd(); return false;"><i class="ico ico-search">검색</i></span>' +
        '						<!-- [D] 이미지 검색 버튼 -->' +
        '						<span class="cam-btn btn ui-head-search-btn"><i class="ico ico-cam">이미지 검색</i></span>' +
        '					</form>' +
        '				</div>' +
        '				<!--//검색창-->' 
    )   
    
    var _keywordRanking = new _HtmlFragment(
        function() {
            var htmlFragmentString = 
                '				<!--검색어 랭킹-->' +
                '				<div class="popularSearchWord-ranking-list-wrapper">' +
                '					<!--롤링 랭킹-->' +
                '					<div class="rollingRanking">' +
                '						<dl class="bxSlider" id="hotkeyword">';

                if ( _config.keywordRankList ) {
                    for ( var index = 0; index < _config.keywordRankList.length; index++) {
                        var keyword = _config.keywordRankList[index];

                        htmlFragmentString +=
            
                        '	                        <dd class="listItem">' +
                        '								<a href="javascript:void(0)">' +
                        '									<span class="rank">' + keyword.rank + '&nbspl&nbsp;</span>' +
                        '									<span class="word">' + keyword.keyword + '</span>' +
                        '									<span class="rank-variation-even rank-variation"><em class="even">' + keyword.variation + '</em></span>' +
                        '								</a>' +
                        '							</dd>';
                    }
                }

                htmlFragmentString +=
                '						</dl>' +                
                '					</div>' +
                '					<!--//롤링 랭킹-->' +
                '					<!--랭킹 팝업 : 개선 후 삭제-->' +
                '										<!--//랭킹 팝업 : 개선 후 삭제-->' +
                '				</div>' +
                '				<!--//검색어 랭킹-->';
            return htmlFragmentString;
        }
)    

    var _topColum = new _HtmlFragment(
        '<div class="top-column column">' +
        '	<!--헤더 header start-->' +
        '	<div id="default_top" class="header store_header clearfix" >' +
        '		<div class="main-wrapper wrapper">' +
        '			<h1 class="title"><a href="/">MUSINSA STORE</a></h1>' +
        '			<div class="search-wrapper wrapper clearfix">' +
        _searchInput.getHtmlFragment() +
        _keywordRanking.getHtmlFragment() + 
        '			</div>' +
        '			<!--오른쪽 상단 메뉴-->' +
        '			<div class="gnb wrapper clearfix">' +
        '				<ul class="gnb-list clearfix gnb-list-wrap">' +
        '										<li><a href="/app/event/s/2019summersale/93" style="color:#ff0000">여름세일</a></li>' +
        '										<li><a href="https://store.musinsa.com/app/plan/views/6974" style="color:#1d67c3">역시즌</a></li>' +
        '					<!-- [D] 캠페인이 없을 경우 랭킹 li에 style="padding-left:10px" 추가 -->' +
        '					<li class="hovering gnb-ranking-list">' +
        '						<a href="/app/contents/bestranking">랭킹</a>' +
        '						<ul class="hoverTarget">' +
        '							<li><a href="/app/contents/bestranking"><span>상품</span></a></li>' +
        '							<li><a href="/app/usr/brand_rank"><span>브랜드</span></a></li>' +
        '						</ul>' +
        '					</li>' +
        '					<li class="hovering">' +
        '						<a href="/app/news/lists">신상품</a>' +
        '						<ul class="hoverTarget">' +
        '							<li><a href="/app/news/lists"><span>신상품</span></a></li>' +
        '							<li><a href="/app/brand_event/lists"><span>신규 브랜드</span></a></li>' +
        '						</ul>' +
        '					</li>' +
        '					<li class="hovering">' +
        '						<a href="/app/contents/brandshop">브랜드</a>' +
        '						<ul class="hoverTarget">' +
        '							<li><a href="/app/contents/brandshop"><span>브랜드</span></a></li>' +
        '							<li><a href="/app/designer/lists"><span>디자이너</span></a></li>' +
        '							<li><a href="/app/select"><span>셀렉트숍</span></a></li>' +
        '						</ul>' +
        '					</li>' +
        '					<li class="hovering gnb-style-list">' +
        '						<a href="/app/styles/lists">코디</a>' +
        '						<ul class="hoverTarget">' +
        '							<li><a href="/app/styles/lists"><span>스타일링</span></a></li>' +
        '							<li><a href="/app/staff/lists"><span>스태프 스냅</span></a></li>' +
        '						</ul>' +
        '					</li>' +
        '					<li class="hovering gnb-special">' +
        '						<a href="/app/showcase/lists">스페셜</a>' +
        '						<ul class="hoverTarget">' +
        '							<li><a href="/app/showcase/lists"><span>쇼케이스</span></a></li>' +
        '							<li><a href="/app/specialissue/lists"><span>스페셜 이슈</span></a></li>' +
        '							<li><a href="/app/exclusive/lists"><span>단독 상품</span></a></li>' +
        '													</ul>' +
        '					</li>' +
        '					<li class="hovering gnb-contents">' +
        '						<a href="/app/curating/lists">콘텐츠</a>' +
        '						<ul class="hoverTarget">' +
        '							<li><a href="/app/curating/lists"><span>큐레이팅</span></a></li>' +
        '							<li><a href="/app/video/lists"><span>비디오</span></a></li>' +
        '							<li><a href="/app/celebrity/lists"><span>셀러브리티</span></a></li>' +
        '							<li><a href="/app/reviews/lists"><span>회원 후기</span></a></li>' +
        '						</ul>' +
        '					</li>' +
        '					<li class="hovering gnb-onsale">' +
        '						<a href="/app/contents/onsale">세일</a>' +
        '						<ul class="hoverTarget">' +
        '							<li><a href="/app/contents/onsale"><span>세일</span></a></li>' +
        '							<li><a href="/app/contents/onsale?sale_yn=Y&sale_dt_yn=Y&chk_timesale=on"><span>타임세일</span></a></li>' +
        '							<li class="list_clearance"><a href="/app/clearance/lists"><span>클리어런스</span></a></li>' +
        '							<li><a href="/app/plan/lists"><span>기획전</span></a></li>' +
        '							<li><a href="/app/contents/coupon_online"><span>쿠폰</span></a></li>' +
        '							<li><a href="/app/contents/gift_list">사은품</a></li>' +
        '						</ul>' +
        '					</li>' +
        '					<li class="hovering gnb-event">' +
        '												<a href="/app/content/s/usr/membership">' +
        '													이벤트' +
        '						</a>' +
        '						<ul class="hoverTarget">' +
        '							<li><a href="/app/content/s/usr/membership"><span>천원 이벤트</span></a></li>' +
        '							<li><a href="https://www.musinsa.com/invitation/friend/"><span>친구 초대</span></a></li>' +
        '						</ul>' +
        '					</li>' +
        '					<li class="emphasis-blue hovering magazine">' +
        '						<a href="https://www.musinsa.com">매거진</a>' +
        '						<ul class="hoverTarget ">' +
        '							<li><a href="https://www.musinsa.com/?m=news"><span>뉴스</span></a></li>' +
        '							<li><a href="https://www.musinsa.com/?m=magazine"><span>매거진</span></a></li>' +
        '							<li><a href="https://www.musinsa.com/?m=lookbook"><span>룩북</span></a></li>' +
        '							<li><a href="https://www.musinsa.com/?m=street"><span>스트릿 스냅</span></a></li>' +
        '							<li><a href="https://www.musinsa.com/?m=gallery"><span>갤러리</span></a></li>' +
        '							<li><a href="https://www.musinsa.com/?m=market"><span>중고장터</span></a></li>' +
        '							<li><a href="https://www.musinsa.com/?m=forum"><span>커뮤니티</span></a></li>' +
        '						</ul>' +
        '					</li>' +
        '				</ul>' +
        '			</div>' +
        '			<!--//오른쪽 상단 메뉴-->' +
        '' +
        '			<!-- 통합 검색폼 키워드 입력시 뜨는 추천검색어레이어-->' +
        '			<div id="recommend_kwd" class="store-searchWord-box searchWord-box box clearfix ui-search-recommend-area ui-search-recommend-area-result search_layer">' +
        '				<div class="left-column column">' +
        '					<dl id="suggest_keyword" class="recommendSearchWord-list list store_list">' +
        '						<dt class="title-listItem listItem clearfix">' +
        '							<span class="title">추천 검색어</span>' +
        '						</dt>' +
        '					</dl>' +
        '					<dl id="suggest_brand" class="recommendBrand-list list store_list">' +
        '						<dt class="title-listItem listItem clearfix">' +
        '							<span class="title">추천 브랜드</span>' +
        '						</dt>' +
        '					</dl>' +
        '					<dl id="suggest_items" class="useCategory-list list store_list">' +
        '						<dt class="title-listItem listItem clearfix">' +
        '							<span class="title">용도 카테고리</span>' +
        '						</dt>' +
        '					</dl>' +
        '				</div>' +
        '				<div class="right-column column">' +
        '					<dl class="recommendProduct-list list store_list">' +
        '						<dt class="title-listItem listItem clearfix">' +
        '							<span class="title">추천 상품</span>' +
        '							<span class="closeBtn btn" onclick="Suggestions.Close(\'search_layer\'); return false;">닫기</span>' +
        '						</dt>' +
        '						<div id="suggest_goods">' +
        '						</div>' +
        '					</dl>' +
        '				</div>' +
        '			</div>' +
        '			<!-- //통합 검색폼 키워드 입력시 뜨는 추천검색어레이어  : 개선 후 삭제-->' +
        '' +
        '			<div id="search_kwd" class="store-searchWord-box searchWord-box box clearfix ui-search-recommend-area ui-search-recommend-area-result layer-keyword-top"></div>' +
        '		</div>' +
        '				<!--<div class="layerbanner_repeat outerFsetival"><a href="/app/campaign/main/34">아우터</a></div>-->' +
        '		' +
        '		<!-- 성별 선택 부분 -->' +
        '		<div class="header_group_area">' +
        '			<ul class="group_list">' +
        '				<li><a href="http://store.musinsa.com/app/"  class="selected">전체</a></li>' +
        '				<!--<li><a href="javascript:void(0)" onclick="setSexKind(\'2\'); return false;">남성</a></li>//-->' +
        '				<li><a href="http://wusinsa.musinsa.com/app/" >우신사(여성)</a></li>' +
        '				<li><a href="/app/standards/lists">스탠다드</a></li>' +
        '				<!--<li><a href="javascript:void(0)" onclick="setSexKind(\'8\'); return false;">키즈</a></li>//-->' +
        '				<!--<li><a href="javascript:void(0)" onclick="setSexKind(\'16\'); return false;">라이프</a></li>//-->' +
        '			</ul>' +
        '					</div>' +
        '		<!--//성별 선택 부분-->' +
        '' +
        '		<!--유저 로그인 메뉴 start-->' +
        '				<div class="userMenu-wrapper toggleBox">' +
        '			<ul class="userMenu-list-notLogin userMenu-list">' +
        '								<li class="listItem loginBtn" data-for="loginBox">' +
        '					<a href="https://www.musinsa.com/?mod=login&amp;referer=https%3A%2F%2Fstore.musinsa.com%2Fapp%2F">로그인</a>' +
        '				</li>' +
        '								<li class="listItem atonce">' +
        '					<span class="txt_direct_on">바로접속</span><span class="icon_on box_icon font-mss">ON</span>' +
        '					<!-- 바로접속 ON 마우스 오버 시 -->' +
        '					<div class="top_on_layer"  id="atLayer">' +
        '						<div class="on_contents">' +
        '							<strong>바로접속</strong> <span class="icon_on box_icon font-mss">ON</span> <strong>고객혜택</strong>' +
        '							<ol>' +
        '								<li>1. 100% 무료배송</li>' +
        '								<li>2. 회원 등급별 추가할인 / 추가 적립금</li>' +
        '								<li>3. 사은품 선택 가능</li>' +
        '								<li>4. 쿠폰 발급 / 쿠폰 사용 가능</li>' +
        '								<li>5. 후기 적립금 제공</li>' +
        '							</ol>' +
        '							<p><a href="/app/cs/notice_view/172?page=1">바로가기 안내</a></p>' +
        '						</div>' +
        '					</div>' +
        '					<!-- //바로접속 ON 마우스 오버 시 -->' +
        '				</li>' +
        '								<li class="listItem"><a href="javascript:void(0)" title="회원가입" onclick="window.open(\'https://www.musinsa.com/?r=home&mod=member_join\',\'\',\'statusbar=no,scrollbars=yes,toolbar=no\');"><span>회원가입</span></a></li>' +
        '				<li class="listItem"><a href="javascript:void(0)" title="비밀번호찾기" onclick="window.open(\'https://www.musinsa.com/?r=home&mod=idpass&page=idpwsearch&ftype=auth\',\'\',\'statusbar=no,scrollbars=yes,toolbar=no\');"><span>비밀번호찾기</span></a></li>' +
        '								<li class="listItem cart_list" id="cart"><!-- activityInfo activity_cart //-->' +
        '					<a href="/app/cart" class="activity_cart_area" title="장바구니">장바구니(<span class="cart-count">0</span>)</a>' +
        '					<!--2016년 2월 첫주까지 개선할 사항으로 우선은 주석 처리 - conship-->' +
        '					<div class="cart_out_line"><a href="/app/cart">장바구니(<span class="cart-count">0</span>)</a></div>' +
        '					<ul class="activityInfo-list infoLayout activity_cart_box cart_in_positon" style="display:none" id="mini_cart"></ul>' +
        '				</li>' +
        '								<li class="listItem"><a href="/app/mypage/order_list_opt">주문배송조회</a></li>' +
        '								<li class="listItem"><a href="/app/cs">고객센터</a></li>' +
        '								<!-- 신규가입 이벤트 문구 추가 -->' +
        '									<li class="listItem top-join-txt"><a href="/app/content/s/usr/membership">회원 가입 EVENT. 신규 가입 시, 15% 쿠폰 + 3,000원 적립금 지급 / 무신사 스탠다드 이벤트 상품 990원 구매 기회 제공</a></li>' +
        '								<!-- //신규가입 이벤트 문구 추가 -->' +
        '			</ul>' +
        '		</div>' +
        '		<!--유저 로그인 메뉴 end-->' +
        '<!-- 이벤트 광고--' +
        '' +
        '<script type="text/javascript">' +
        '$(document).on("click",".p_event_banner_title,.a_event_banner_title",function(){' +
        '	/* 배너영역 토글 */' +
        '	$(".event_banner").toggle(0);' +
        '	if($(".event_banner").hasClass(\'openContents\')) {' +
        '		$(".event_banner").removeClass(\'openContents\');' +
        '		$(".a_event_banner_title").html("닫기");' +
        '		setCookie("musinsa_store_pc", "0", 7);' +
        '	} else {' +
        '		$(".event_banner").addClass(\'openContents\');' +
        '		$(".a_event_banner_title").html("열기");' +
        '		setCookie("musinsa_store_pc", "1", 7);' +
        '	}' +
        '});' +
        '</script>' +
        '' +
        '		<div class="event_banner_title">' +
        '			<p class="p_event_banner_title">2017 아우터 페스티벌</p>' +
        '			<a href="javascript:void(0)" class="a_event_banner_title">열기</a>' +
        '		</div>' +
        '		<div class="event_banner openContents" style="background-color:#c1a8a3;display:none">' +
        '			<div class="inner">' +
        '				<a href="/app/campaign/main/34"><img src="//image.msscdn.net/skin/musinsa/images/outer_festival/ib_pc.jpg" alt="아우터페스티벌" /></a>' +
        '			</div>' +
        '		</div>' +
        '	<!-- //이벤트 광고-->' +
        '	</div>' +
        '	<!--헤더 header end-->' +
        '	<div id="short_top_special" class="header header-small store_header clearfix" style="display:none">' +
        '		<div class="main-wrapper wrapper">' +
        '			<h1 class="title"><a href="javascript:void(0)" onclick="showShortTopSpecial(); return false;">MUSINSA STORE 메뉴 열기</a></h1>' +
        '		</div>' +
        '	</div>' +
        '</div>' +
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
        '<!--//image search layer--></div>'
    );    
    
    return {
        render : _render
    }
}