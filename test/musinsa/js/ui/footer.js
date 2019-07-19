mss = window.mss || {};
mss.ui = window.mss.ui || {};

mss.ui.footer = (function() {
    var config = (mss.ui.gnb ? mss.ui.gnb.getConfig() : {}) || {};
    
    // footer는 gnb에 비해 단순하여 복잡한 HtmlFragment Object를 구현하지 않습니다.
    function getHtmlFragment() {
        var HtmlFragment =
            '<footer id="bot" class="clear">' +
            '	<div class="footer">' +
            '		<div class="snb snb_store">' +
            '		<ul class="clearfix_store">' +
            '			<li class="division"><a href="' + config.magazineHost + '/company/" target="_blank">회사소개</a></li>' +
            '			<li class="division"><a href="' + config.magazineHost + '/?m=forum&bid=event_notice">공지사항</a></li>' +
            '			<li class="division"><a href="' + config.storeHost + '/app/cs/notice_list">스토어공지</a></li>' +
            '			<li class="division"><a href="' + config.storeHost + '/app/company/partner">입점/제휴 문의</a></li>' +
            '			<li class="division"><a href="' + config.magazineHost + '/?mod=private"><strong>개인정보처리방침</strong></a></li>' +
            '			<li >' +
            '			<a href="' + config.magazineHost + '/?mod=agreement">이용약관</a>' +
            '			</li>' +
            '				</ul>' +
            '		</div>' +
            '		<div class="row1 row">' +
            '		<div class="addressBox-wrapper clearfix">' +
            '			<div class="editing-addressBox addressBox">' +
            '			<p class="title">무신사 편집팀</p>' +
            '			<p class="address">서울특별시 강남구 신사동 640-2<br />로빈명품관 지하1층, 무신사 편집팀</p>' +
            '			<p class="notice">(무신사 스토어 반송지 아님, 해당주소 반송불가)</p>' +
            '			</div>' +
            '			<div class="store-addressBox addressBox">' +
            '			<p class="title">무신사 스토어</p>' +
            '			<p class="address">(17759) 경기도 평택시 신장로 55 CJ대한통운 평택합정집배점 내 무신사 물류센터</p>' +
            '			<p class="notice">(무신사 스토어 자체 배송 상품 물류센터)</p>' +
            '			<p class="notice">(배송센터 직접 물건 수령 불가)</p>' +
            '			</div>' +
            '			<div class="cs-addressBox addressBox">' +
            '			<p class="title">고객센터' +
            '				<span class="brackets">' +
            '				[ <a href="/app/cs/faq" class="division"><span>FAQ</span></a>' +
            '				<a href="/app/cs/counsel" class="division"><span>1:1질문하기</span></a>' +
            '				<a href="mailto:cs@musinsa.com"><span>이메일문의</span></a> ]' +
            '				</span>' +
            '			</p>' +
            '			<div class="phoneNumberBox">' +
            '				<p class="phoneNumber">' +
            '				<span class="tel_number">대표전화</span>' +
            '				<span class="number font-mss">1544-7199</span>' +
            '				<span class="phoneNumber_click"><a href="/app/cs/faq">전화문의 전 <strong>CLICK</strong></a></span>' +
            '				</p>' +
            '				<p class="description">1번 : 배송 / 교환 / 환불관련</p>' +
            '				<p class="description">2번 : 결제 / 회원 관련</p>' +
            '				<p class="subDescription">ㄴ상품 문의 > 각 상품 Q&A 이용</p>' +
            '			</div>' +
            '			<p class="notice">오전9시-오후6시(토,일, 공휴일 휴무)</p>' +
            '			</div>' +
            '		</div>' +
            '		<span class="global-notice store_footer_notice">각 브랜드마다 물류센터가 다릅니다. 교환/환불 시 주문 조회 메뉴를 통해 해당 제품이 출고된 곳으로 반송하셔야 합니다.</span>' +
            '		</div>' +
            '		<div class="row2 row">' +
            '		<div class="copyright-box box">' +
            '			<div class="footer_social">' +
            '			<a href="https://youtube.com/musinsatv" target="_blank" class="youtube">youtube</a>' +
            '			<a href="https://instagram.com/musinsacom/" target="_blank" class="instagram">INSTAGRAM</a>' +
            '			<a href="https://www.facebook.com/musinsa" target="_blank" class="facebook">FACEBOOK</a>' +
            '			<a href="https://twitter.com/musinsacom" target="_blank" class="twitter">TWITTER</a>' +
            '			<a href="https://post.naver.com/musinsa_store" target="_blank" class="post">NAVER POST</a>' +
            '			<a href="https://www.musinsastudio.com/" target="_blank" class="studio">musinsa studio</a>' +
            '			<a href="http://tv.musinsa.com/" target="_blank" class="tv">MUSINSA TV</a>' +
            '			</div>' +
            '			<div class="title font-mss"><p>COPYRIGHT (C) MUSINSA ALL RIGHTS RESERVED.</p></div>' +
            '			<div class="description">' +
            '			<p>' +
            '			무신사닷컴 내 매거진, 스트리트스냅, 스토어 등 무신사 자체 생성 콘텐츠는 무신사닷컴 및 무신사 계약업체에 저작권이 있습니다.' +
            '			</p>' +
            '			<p>' +
            '				이러한 콘텐츠는 출처를 밝히고(무신사닷컴 표기 및 www.musinsa.com 링크 포함 필수) 비상업적인 용도에서만 활용하실 수 있습니다.' +
            '			<a href="' + config.magazineHost + '/?m=forum&bid=event_notice&p=3&mod=view&uid=15974">자세히보기</a>' +
            '			</p>' +
            '			<p class="last">' +
            '				커뮤니티 및 중고장터, 댓글 등 무신사 회원이 올린 이미지가 저작권에 위배될 경우' +
            '				<a id="footer_notify" href="javascript:void(0)">신고</a>' +
            '				하시면 검토 후 삭제하겠습니다.' +
            '			</p>' +
            '			</div>' +
            '			<a href="#top" class="bottom_top_btn"><span class="txt_scroll_footer font-mss">Top</span> <span class="txt_arrow_footer">▲</span></a>' +
            '		</div>' +
            '		<div class="authentication-box box clearfix">' +
            '			<p class="authentication font-mss">100% AUTHENTIC</p>' +
            '			<p class="description">무신사스토어에서 판매되는 모든 브랜드 제품은 정식제조, 정식수입원을 통해 유통되는 100% 정품임을 보증합니다.</p>' +
            '			<p class="address">주식회사 무신사 (MUSINSA Co., Ltd.) | 서울특별시 강남구 신사동 640-2 로빈명품관 지하1층 | 사업자등록번호 : 211-88-79575 |<br>통신판매업 : 2012-서울강남-01897 | 대표 : 조만호 | 개인정보관리책임자 : 심준섭(<a href="mailto:help@musinsa.com">help@musinsa.com</a>) ｜ 호스팅사업자 : ㈜이호스트ICT</p>' +
            '			<div class="imageBox">' +
            '			<a id="footer_kcp_escrow" href="javascript:void(0)"><img src="//image.msscdn.net/skin/musinsa/images/footer/escrow.gif" alt="kcp에스크로확인"></a>' +
            '			<a id="footer_ftc" href="javascript:void(0)"><img src="//image.msscdn.net/skin/musinsa/images/footer/ftc.gif" class="last" alt="사업자정보확인"></a>' +
            '			</div>' +
            '		</div>' +
            '		</div>' +
            '		<div class="row3 row">' +
            '		<p class="title font-mss">FASHION WEB MAGAZINE / LIFE STYLE SELECT SHOP <span>WWW.MUSINSA.COM</span></p>' +
            '		</div>' +
            '	</div>' +
            '</footer>';    
            
            return HtmlFragment;
    }

    function bindEvent() {
        $('#footer_notify').on('click', 
            function() {
                window.open(config.magazineHost + '/?m=bbs&bid=suggest','','left=0,top=0,width=600px,height=700px,statusbar=no,scrollbars=yes,toolbar=no');
            }
        );

        $('#footer_kcp_escrow').on('click', 
            function() {
                window.open('http://admin.kcp.co.kr/Modules/escrow/kcp_pop.jsp?site_cd=N5624','escro','top=10.left=10,width=500,height=450');
            }
        );

        $('#footer_kcp_escrow').on('click', 
            function() {
                window.open('http://www.ftc.go.kr/info/bizinfo/communicationViewPopup.jsp?wrkr_no=2118879575','communicationViewPopup','top=10.left=10,width=750,height=700');
            }
        );        
    }

    return {
        render : function() {
            document.write(getHtmlFragment());
            bindEvent();
        }
    };
}());