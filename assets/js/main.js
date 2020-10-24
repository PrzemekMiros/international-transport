/*****************************************************************************
  ____                                  _____ _
 / ___|___  ___ _ __ ___   ___  ___    |_   _| |__   ___ _ __ ___   ___  ___
| |   / _ \/ __| '_ ` _ \ / _ \/ __|_____| | | '_ \ / _ \ '_ ` _ \ / _ \/ __|
| |__| (_) \__ \ | | | | | (_) \__ \_____| | | | | |  __/ | | | | |  __/\__ \
 \____\___/|___/_| |_| |_|\___/|___/     |_| |_| |_|\___|_| |_| |_|\___||___/
******************************************************************************/

/************ Site Main Js **************************************
    Template Name: Kurt - Ajax Portfolio Template
    Author: cosmos-themes
    Envato Profile: https://themeforest.net/user/cosmos-themes
    version: 1.0
    Copyright: 2020
****************************************************************/

/*======== Window Load Function ========*/
$(window).on('load', function() {
    var tl = new TimelineMax();
    var timer = setInterval(function() {
        if(window.preloadFinished) {
            tl
                .to('.loader-wrap', .3, {y: 100, autoAlpha: 0, ease:Back.easeIn})
                .to('.preloader', .5, { y: '100%', ease: Power4.easeInOut })
                .addLabel('preloaded')
                .fromTo('.item-cat', .3, { y: '-50px', autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 'preloaded')
                .fromTo('.item-title', .3, { autoAlpha: 0 }, { autoAlpha: 1 }, 'preloaded')
                .fromTo('.item-link', .3, { y: "50px", autoAlpha: 0 }, { y:0, autoAlpha: 1 }, 'preloaded')
                .fromTo('.project-subtitle', .3, { y: "-50px", autoAlpha: 0 }, { y:0, autoAlpha: 1 }, 'preloaded')
                .fromTo('.project-title', .3, { y: "50px", autoAlpha: 0 }, { y:0, autoAlpha: 1 }, 'preloaded');

            clearInterval(timer);
        }
    }, 10);
});


/*======== Document Ready Function ========*/
$(document).ready(function() {
    "use strict";
    ajaxSetup();
    pageLoad();
    preloaderSetup();

});

/*======== Load Via Ajax Function ========*/
function loadViaAjax(){
    pageLoad();
}


/*======== Page Load Function ========*/
function pageLoad() {
    basicSetup();
    scrollMagicSetup();
    textAnimateSetup();
    menuBurgerSetup();
    contactFormSetup();
    initMap();
}

/*======== Preloader Setup ========*/
function preloaderSetup() {

    var width = 100,
        perfData = window.performance.timing,
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = ((EstimatedTime / 1000) % 60) * 50

    // Percentage Increment Animation
    var PercentageID =$('#percent'),
        start = 0,
        end = 100,
        durataion = time;

    animateValue(PercentageID, start, end, durataion);

    function animateValue(id, start, end, duration) {

        var range = end - start,
            current = start,
            increment = end > start? 1 : -1,
            stepTime = Math.abs(Math.floor(duration / range)),
            obj = $(id);

        window.preloadFinished = false;

        var timer = setInterval(function() {
            current += increment;
            //obj.innerHTML = current;
            $('.loader-percent').css('width', current + '%');
            $(obj).text(current + "%");
            if (current == end) {
                clearInterval(timer);
                window.preloadFinished = true;
            }
        }, stepTime);

    }

}


/*======== Site Common Setup Function ========*/
function basicSetup() {

    /*==== Pixi Slider Setup ====*/
    if($('#pixi-slider').length > 0) {
        initCanvasSlideshow = new CanvasSlideshow({
            container: '#pixi-slider',
            images: '.slide-item__image'
        });
    }

    /*==== Scroll buttons Setup ====*/
    $('#scroll-down').on('click', function() {
        var height = $(".project-hero").height();
        if ($("body").hasClass("smooth-scroll")) {
            TweenMax.to(window.scrollbar, 1.5, {scrollTop:height, ease:Power4.easeInOut});
        } else {
            $("html,body").animate({scrollTop: height}, 800);
        }
    });
    $('#scroll-top').on('click', function() {
        if ($("body").hasClass("smooth-scroll")) {
            TweenMax.to(window.scrollbar, 1.5, {scrollTop:0, ease:Power4.easeInOut});
        } else {
            $("html,body").animate({scrollTop: 0}, 800);
        }
    });

    /*==== Smooth Scrollbar Setup ====*/
    if($('body').hasClass('smooth-scroll')) {
        var scrollContent = $('#scroll-content');
        window.scrollbar = Scrollbar.init(scrollContent[0],
            {
                renderByPixels: true,
                damping:0.07
            });
    }

    /*==== Owl Carousel Setup ====*/
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:30,
        autoHeight:false,
        navSpeed: 600,
        responsive:{
            0:{
                items:1
            },
            1024:{
                items:2
            }
        }
    });

    /*==== Magnific Popup Setup ====*/
    $('.link-popup .image-link').magnificPopup({
        type: 'image',
        zoom: { enabled: true,  duration: 250 }
    });

}


/*======== Text Animation Setup Function ========*/
function textAnimateSetup() {

    var delay = .4;
    TweenMax.fromTo('.page-changed .hero-subtitle', .3,
        {
            y: "50px",
            autoAlpha: 0
        },
        {
            y: 0,
            autoAlpha: 1,
            delay: delay
        });
    TweenMax.fromTo('.page-changed .project-subtitle', .3,
        {
            y: "-50px",
            autoAlpha: 0
        },
        {
            y: 0,
            autoAlpha: 1,
            delay: delay
        });
    TweenMax.fromTo('.page-changed .hero-title, .page-changed .project-title', .3,
        {
            y: "50px",
            autoAlpha: 0
        },
        {
            y: 0,
            autoAlpha: 1,
            delay: delay
        });
    TweenMax.fromTo('.page-changed .item-cat', .3,
        {
            y: "-50px",
            autoAlpha: 0
        },
        {
            y: 0,
            autoAlpha: 1,
            delay: delay
        });
    TweenMax.fromTo('.page-changed .item-link', .3,
        {
            y: "50px",
            autoAlpha: 0},
        {
            y: 0,
            autoAlpha: 1,
            delay:delay
        });
    TweenMax.fromTo('.page-changed .item-title', .3,
        {
            autoAlpha: 0
        },
        {
            autoAlpha: 1,
            delay: delay
        });

    var controller = new ScrollMagic.Controller();

    $('.text-animate').attr('data-splitting', 'words');

    Splitting();

    $('.text-animate').each(function() {
        var $this = $(this);

        var scene = new ScrollMagic.Scene({
            triggerElement : $this[0],
        })
            .setClassToggle($this[0], 'is-active')
            .reverse(false)
            .addTo(controller);

        scene.triggerHook(.9);
        if ($("body").hasClass("smooth-scroll")) {
            window.scrollbar.addListener(() => {
                scene.refresh()
            });
        }
    });
}


/*=======Scroll Magic Related Setup Function ========*/
function scrollMagicSetup() {
    var controller = new ScrollMagic.Controller();

    $('.bg-parallax').each(function() {
        var $this = $(this);
        var $thisHeight = $(this).height();
        var bg = $this.find("img");

        var parallax = TweenMax.fromTo(bg, 1, {
            y: '-20%',
            scale: 1
        }, {
            y: '10%',
            scale: 1.12,
            ease: Linear.easeNone
        });
        var parallaxScene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 1,
            duration: '200%'
        })
            .setTween(parallax)
            .addTo(controller);

        if ($("body").hasClass("smooth-scroll")) {
            window.scrollbar.addListener(() => {
                parallaxScene.refresh()
            });
        }

    });


    var heroparallax = TweenMax.to('.hero-bg-image', 1, {
        top: "20%",
        scale: 1.12
    });

    var heroScene = new ScrollMagic.Scene({
        triggerElement: '.project-hero',
        triggerHook: 0,
        duration: '200%'
    })
        .setTween(heroparallax)
        .addTo(controller);

    if ($("body").hasClass("smooth-scroll")) {
        window.scrollbar.addListener(() => {
            heroScene.refresh()
        });
    }

    $('.fade-up').each(function() {
        var $this = $(this);
        var elemHeight = $(this).height();
        var scene = new ScrollMagic.Scene({
            triggerElement: $this[0],
            duration: elemHeight
        })
            .addTo(controller);
        scene.triggerHook(1)
        scene.on('enter', function() {
            $this.delay($this.attr('data-delay')).queue(function() {
                TweenMax.to($this, 0.6, {
                    force3D: true,
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    delay: 0.1,
                    ease: Power2.easeOut
                });
            });
        });

        if ($("body").hasClass("smooth-scroll")) {
            window.scrollbar.addListener(() => {
                scene.refresh()
            });
        }
    });
}


/*======== Burger Menu Button Setup Function ========*/
function menuBurgerSetup() {
    var textTl = new TimelineMax();
    var textClose = $('.burger-text .text-close'),
        textMenu = $('.burger-text .text-menu'),
        textOpen = $('.burger-text .text-open');

    $('.menu-burger .burger-wrap').on('mouseenter', function() {

        textTl.clear();

        if($('.menu-burger').hasClass('is-active')) {

            textTl
                .to(textMenu, .2, { y: '-50%', autoAlpha: 0 })
                .fromTo(textClose, .2, { y: '50%', autoAlpha: 0}, { y: '0%', autoAlpha: 1 });
        } else {
            textTl
                .to(textMenu, .2, { y: '-50%', autoAlpha: 0 })
                .fromTo(textOpen, .2, { y: '50%', autoAlpha: 0}, { y: '0%', autoAlpha: 1 });
        }

    });

    $('.menu-burger').on('click', function() {
        textTl.clear();
        textTl
            .to(textMenu, .2, { y: '-50%', autoAlpha: 0 });

        $('#menu-overlay').toggleClass('active');
        $(this).toggleClass('is-active')

        if($(this).hasClass('is-active')) {
            textTl
                .to(textOpen, .2, { y: '-50%', autoAlpha: 0 })
                .fromTo(textClose, .2, { y: '50%', autoAlpha: 0}, { y: '0%', autoAlpha: 1 });
        } else {
            textTl
                .to(textClose, .2, { y: '-50%', autoAlpha: 0 })
                .fromTo(textOpen, .2, { y: '50%', autoAlpha: 0}, { y: '0%', autoAlpha: 1 });
        }

    });

    $('.menu-burger .burger-wrap').on('mouseleave', function() {
        textTl.clear();
        if($('.menu-burger').hasClass('is-active')) {
            textTl
                .to(textClose, .2, { y: '50%', autoAlpha: 0})
                .to(textMenu, .2, { y: '0%', autoAlpha: 1 });

        } else {
            textTl
                .to(textOpen, .2, { y: '50%', autoAlpha: 0})
                .to(textMenu, .2, { y: '0%', autoAlpha: 1 });

        }

    });
}


/*======= Contact Form Setup Function ========*/
function contactFormSetup() {

     $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var name = $('#cf-name').val(),
            email = $('#cf-email').val(),
            message = $('#cf-message').val(),
            $messageBox = $('#contact-form .message'),
            required = 0;
        $('.cf-validate', this).each(function() {
            if ($(this).val() == '') {
                $(this).addClass('cf-error');
                required += 1;
            } else {
                if ($(this).hasClass('cf-error')) {
                    $(this).removeClass('cf-error');
                    if (required > 0) {
                        required -= 1;
                    }
                }
            }
        });
        if (required === 0) {
            $.ajax({
                type: 'POST',
                url: 'mail.php',
                data: {
                    cf_name: name,
                    cf_email: email,
                    cf_message: message
                },
                success: function(data) {
                    data = JSON.parse(data);
                    $("#contact-form .input__field").val("");
                    showAlertBox(data.status, data.message);
                },
                error: function(data) {
                    data = JSON.parse(data);
                    showAlertBox(data.status, data.message);
                }
            });
        }
    });

    function showAlertBox(response, message) {
        var $alertBox = $('<div class="alert"></div>'),
            $alContainer = $('#contact-form .alert-container');
        if (response == 200) {
            $alertBox.addClass('alert-success').html(message);
            $alContainer.html($alertBox);
        } else {
            $alertBox.addClass('alert-danger').html(message);
            $alContainer.html($alertBox);
        }
        $alContainer.fadeIn(300).delay(2000).fadeOut(400);
    }

}


/*======== Google Map Setup Function ========*/
function initMap() {
    if($("#map").length) {
        var latitude = $("#map").data('latitude'),
            longitude = $("#map").data('longitude'),
            zoom = $("#map").data('zoom'),
            cordinates = new google.maps.LatLng(latitude, longitude);

        var styles = [ { "stylers": [ { "hue": "#ff1a00" }, { "invert_lightness": true }, { "saturation": -100 }, { "lightness": 33 }, { "gamma": 0.5 } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#1e1e1e" } ] } ];

        var mapOptions = {
            zoom: zoom,
            center: cordinates,
            mapTypeControl: false,
            disableDefaultUI: true,
            zoomControl: true,
            scrollwheel: false,
            styles: styles
        };
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var marker = new google.maps.Marker({
            position: cordinates,
            map: map,
            title: "We are here!"
        });

    }
}