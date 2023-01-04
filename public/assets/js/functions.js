/*============= Preloader JS==============*/
$(window).on('load', function () {
    $('.preloader').fadeOut(1000);


    /*=======================
    buyer & seller filter js
    ===========================*/
    $(function () {


        var $filtersSelect1 = $('.buyer-seller-select');


        // init Isotope
        var $grid = $('.seller-wrapper').isotope({
            itemSelector: '.seller-item',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 15,
            },
            filter: $filtersSelect1.val(),
        });

        // bind filter on select change
        $filtersSelect1.on('change', function () {
            // get filter value from option value
            $grid.isotope({
                filter: this.value
            });
        });


        //-----------days select
        var $filtersSelect2 = $('.days-select');
        // init Isotope
        var $grid = $('.seller-wrapper').isotope({
            itemSelector: '.seller-item',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 20,
            },
            filter: $filtersSelect2.val(),
        });

        // bind filter on select change
        $filtersSelect2.on('change', function () {
            // get filter value from option value
            $grid.isotope({
                filter: this.value
            });
        });
    });


})
$(window).on('load', function () {
    /*==============================================
           Featured assets filer js
           ================================================*/
    $(function () {
        // init Isotope
        var $grid = $('.assets-holder').isotope({
            itemSelector: '.nft-item',
            layoutMode: 'fitRows',
            fitRows: {
                gutter: 20,
            },
        });
        // filter functions
        var filterFns = {

            // show if name ends with -ium
            ium: function () {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };

        // bind filter button click
        $('.asset-filter-list').on('click', 'li', function () {
            var filterValue5254 = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue5254 = filterFns[filterValue5254] || filterValue5254;
            $grid.isotope({
                filter: filterValue5254
            });
        });
        // change is-checked class on buttons
        $('.asset-filter-list').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'li', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });
    });
})

$(document).ready(function () {
    "use strict"; // start of use strict

    /*==============================
    Menu
    ==============================*/
    $('.header__btn').on('click', function () {
        $(this).toggleClass('header__btn--active');
        $('.header__menu').toggleClass('header__menu--active');
    });

    $('.header__search .close, .header__action--search button').on('click', function () {
        $('.header__search').toggleClass('header__search--active');
    });

    //--*Fixed header on scroll
    var fixed_top = $(".header");
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            fixed_top.addClass("header-fixed fadeInUp");
        } else {
            fixed_top.removeClass("header-fixed fadeInUp");
        }
    });


    /*====================
    button Hover effect
    =======================*/

    document.querySelectorAll('.button').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');


    /*=========================
    Countdown js initialize
    ===========================*/
    document.addEventListener('readystatechange', event => {
        if (event.target.readyState === "complete") {
            var clockdiv = document.getElementsByClassName("count-down");
            var countDownDate = new Array();
            for (var i = 0; i < clockdiv.length; i++) {
                countDownDate[i] = new Array();
                countDownDate[i]['el'] = clockdiv[i];
                countDownDate[i]['time'] = new Date(clockdiv[i].getAttribute('data-date')).getTime();
                countDownDate[i]['days'] = 0;
                countDownDate[i]['hours'] = 0;
                countDownDate[i]['seconds'] = 0;
                countDownDate[i]['minutes'] = 0;
            }

            var countdownfunction = setInterval(function () {
                for (var i = 0; i < countDownDate.length; i++) {
                    var now = new Date().getTime();
                    var distance = countDownDate[i]['time'] - now;
                    countDownDate[i]['days'] = Math.floor(distance / (1000 * 60 * 60 * 24));
                    countDownDate[i]['hours'] = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    countDownDate[i]['minutes'] = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    countDownDate[i]['seconds'] = Math.floor((distance % (1000 * 60)) / 1000);

                    if (distance < 0) {
                        countDownDate[i]['el'].querySelector('.days').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.hours').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.minutes').innerHTML = 0;
                        countDownDate[i]['el'].querySelector('.seconds').innerHTML = 0;
                    } else {
                        countDownDate[i]['el'].querySelector('.days').innerHTML = countDownDate[i]['days'];
                        countDownDate[i]['el'].querySelector('.hours').innerHTML = countDownDate[i]['hours'];
                        countDownDate[i]['el'].querySelector('.minutes').innerHTML = countDownDate[i]['minutes'];
                        countDownDate[i]['el'].querySelector('.seconds').innerHTML = countDownDate[i]['seconds'];
                    }
                }
            }, 1000);
        }
    });


    //initialize lightcase pop up
    // lightcase 
    $('a[data-rel^=lightcase]').lightcase();

    /*====================================
    All slider
    =======================================*/

    //banner slider
    var swiper = new Swiper(".banner-item-slider", {
        effect: "cube",
        grabCursor: true,
        cubeEffect: {
            shadow: false,
            slideShadows: false,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        pagination: {
            el: ".swiper-pagination",
        },
        loop: true,
        autoplay: true,
    });

    //banner slider-home-4
    var swiper5 = new Swiper(".banner-item-slider-2", {
        effect: "cards",
        grabCursor: true,
        autoplay: true,
        loop: true,
    });

    //auction slider 
    var swiper = new Swiper('.auction-holder', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: true,
        // },
        navigation: {
            nextEl: '.auction-next',
            prevEl: '.auction-prev'
        },
        breakpoints: {
            576: {
                spaceBetween: 20,
                slidesPerView: 2,
            },
            992: {
                spaceBetween: 20,
                slidesPerView: 3,
            },
            1200: {
                spaceBetween: 20,
                slidesPerView: 4,
            }
        }
    });


    //hot slider 
    var swiper = new Swiper('.hot-holder', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: true,
        // },
        navigation: {
            nextEl: '.hot-next',
            prevEl: '.hot-prev'
        },
        breakpoints: {
            576: {
                spaceBetween: 20,
                slidesPerView: 2,
            },
            992: {
                spaceBetween: 20,
                slidesPerView: 3,
            },
            1200: {
                spaceBetween: 20,
                slidesPerView: 4,
            }
        }
    });

    // blog slider start here
    var swiper = new Swiper('.blog-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1200,
        navigation: {
            nextEl: '.blog-slider-next',
            prevEl: '.blog-slider-prev',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true
    });

    //nft-category thumb slider
    var swiper = new Swiper('.nft-cat-thumb', {
        slidesPerView: 3,
        spaceBetween: 10,
        speed: 2000,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true
    });


    /*========================
    follow button js
    =============================*/
    $('.btn-follow').on('click', function (e) {
        var element = $(this).parent('.follow-part');
        if (element.hasClass('activefollow')) {
            element.removeClass('activefollow');
            element.find('.follow-part').removeClass('activefollow');
        } else {
            element.addClass('activefollow');
            element.siblings('.follow-part').removeClass('activefollow');
            element.siblings('.follow-part').find('.follow-part').removeClass('activefollow');
        }
    });




    /*============ Scroll to Top button js ============*/
    $(function () {
        //Check to see if the window is top if not then display button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.scrollToTop').css({
                    'bottom': '2%',
                    'opacity': '1',
                    'transition': 'all .5s ease'
                });
            } else {
                $('.scrollToTop').css({
                    'bottom': '-30%',
                    'opacity': '0',
                    'transition': 'all .5s ease'
                })
            }
        });
        //Click event to scroll to top
        $('.scrollToTop').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
    });

    //==========Create NFT Category select active js
    $(".item-cat-btn").on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

});

/*===========================
  *Crypto Wallet copying js
  ============================*/
// functionality to copy text from inviteCode to clipboard

// trigger copy event on click
$('#cryptoCopy').on('click', function (event) {
    console.log(event);
    copyToClipboard(event);
});

// event handler
function copyToClipboard(e) {
    // alert('this function was triggered');
    // find target element
    var
        t = e.target,
        c = t.dataset.copytarget,
        inp = (c ? document.querySelector(c) : null);
    console.log(inp);
    // check if input element exist and if it's selectable
    if (inp && inp.select) {
        // select text
        inp.select();
        try {
            // copy text
            document.execCommand('copy');
            inp.blur();

            // copied animation
            t.classList.add('copied');
            setTimeout(function () {
                t.classList.remove('copied');
            }, 1500);
        } catch (err) {
            //fallback in case exexCommand doesnt work
            alert('please press Ctrl/Cmd+C to copy');
        }

    }

}


//-------------- tool tips

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})