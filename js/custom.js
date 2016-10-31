/*------------------------------------------------------------------
Project:        CONCEPT - Minimal Portfolio Template
Version:        1.1
Last update:    21/03/2015
Author:         FLPDesign
URL:            http://francescolepere.com
-------------------------------------------------------------------*/

$(function () {
	'use strict';

/*--------------------------------------------------
    Stellar Parallax Animation
---------------------------------------------------*/

  $(window).stellar({
    responsive: true,
    horizontalOffset: 0,
    horizontalScrolling: false
  });


/*--------------------------------------------------
    WOW Effects Animation
---------------------------------------------------*/

  var wow = new WOW({
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       100,          // distance to the element when triggering the animation (default is 0)
    mobile:       false        // trigger animations on mobile devices (true is default)
  });
  wow.init();


/*--------------------------------------------------
    Preloader Page 
---------------------------------------------------*/

  $(window).load(function () {
    $("#preloader").delay(600).fadeOut("slow");
  });


/*--------------------------------------------------
    Menu Features 
---------------------------------------------------*/

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').on('click', function () {
    $('.navbar-toggle:visible').trigger('click');
  });


/*--------------------------------------------------
    Page Scroll Features 
---------------------------------------------------*/

  smoothScroll.init({
    speed: 1000,
    updateURL: false,
    offset: 70
  });
  

  /*--------------------------------------------------
    Slides Fullscreen
---------------------------------------------------*/

  $(function() {
    $('#slides').superslides({
      animation: "fade",
      play: 10000,
      slide_easing: 'easeInOutCubic',
      slide_speed: 800,
      pagination: true,
      hashchange: false,
      scrollable: true
    });
  });


  // Touch Swipe Slides for Mobile
  $('#slides').swipe({
    swipeLeft: function () {
      $(this).superslides('animate', 'next');
    },
    swipeRight: function () {
      $(this).superslides('animate', 'prev');
    }
  });


  // Slides Navigation Fade Out
  $(window).scroll(function () {
    if ($(this).scrollTop() === 0) {
      $(".slides-navigation a:hidden").fadeIn(800);
    } else {
      $(".slides-navigation a:visible").fadeOut(800);
    }
  });
  

/*--------------------------------------------------
    Owl Carousel Testimonials 
---------------------------------------------------*/

  $("#owl-testimonials").owlCarousel({
    autoPlay: 3000,
    navigation: false, // Show next and prev buttons
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true
  });

/*--------------------------------------------------
    Owl Carousel Clients 
---------------------------------------------------*/

  $("#owl-clients").owlCarousel({
    autoPlay: 2000,
    pagination: false,
    items: 4, //4 items above 1000px browser width
    itemsDesktop: [1000,4], //4 items between 1000px and 901px
    itemsDesktopSmall: [900,3], // 3 items betweem 900px and 601px
    itemsTablet: [600,2], //2 items between 600 and 0;
    itemsMobile: [320,1] // itemsMobile disabled - inherit from itemsTablet option
  });


/*--------------------------------------------------
    Owl Carousel Service 
---------------------------------------------------*/

  $(window).load(function () {
    var sync1 = $("#sync1");
    var sync2 = $("#sync2");

    sync1.owlCarousel({
      singleItem: true,
      slideSpeed: 1000,
      pagination: false,
      afterAction: syncPosition,
      responsiveRefreshRate: 200,
    });

    sync2.owlCarousel({
      items : 4,
      itemsDesktop: [1199,4],
      itemsDesktopSmall: [979,4],
      itemsTablet: [768,4],
      itemsMobile: [479,2],
      pagination: false,
      responsiveRefreshRate: 100,
      afterInit: function(el){
        el.find(".owl-item").eq(0).addClass("synced");
      }
    });

    function syncPosition(el){
      var current = this.currentItem;
      $("#sync2")
        .find(".owl-item")
        .removeClass("synced")
        .eq(current)
        .addClass("synced")
      if($("#sync2").data("owlCarousel") !== undefined){
        center(current)
      }
    }

    $("#sync2").on("click", ".owl-item", function(e){
      e.preventDefault();
      var number = $(this).data("owlItem");
      sync1.trigger("owl.goTo",number);
    });

    function center(number){
      var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
      var num = number;
      var found = false;
      for(var i in sync2visible){
        if(num === sync2visible[i]){
          var found = true;
        }
      }

      if(found===false){
        if(num>sync2visible[sync2visible.length-1]){
          sync2.trigger("owl.goTo", num - sync2visible.length+2)
        }else{
          if(num - 1 === -1){
            num = 0;
          }
          sync2.trigger("owl.goTo", num);
        }
      } else if(num === sync2visible[sync2visible.length-1]){
        sync2.trigger("owl.goTo", sync2visible[1])
      } else if(num === sync2visible[0]){
        sync2.trigger("owl.goTo", num-1)
      }

    }
  });
  
  
/*--------------------------------------------------
    CountTo Facts 
---------------------------------------------------*/

  $('.countup').appear(function() {
    var count_element =  $(this);
        count_element.countTo({
          from: 0,
          to: parseInt( count_element.text() , 10 ) ,
          speed: 3000
        });
  });


/*--------------------------------------------------
    Google Map 
---------------------------------------------------*/

  jQuery(document).ready(function($){
      //set your google maps parameters
      var latitude = 40.7033127,
          longitude = -73.979681,
          map_zoom = 14;

      //google map custom marker icon - .png fallback for IE11
      var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
      var marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg';

      //define the basic color of your map, plus a value for saturation and brightness
      var	main_color = '#000000',
          saturation_value= -80,
          brightness_value= 5;

      //we define here the style of the map
      var style= [ 
          {
              //set saturation for the labels on the map
              elementType: "labels",
              stylers: [
                  {saturation: saturation_value}
              ]
          },  
          {	//poi stands for point of interest - don't show these lables on the map 
              featureType: "poi",
              elementType: "labels",
              stylers: [
                  {visibility: "off"}
              ]
          },
          {
              //don't show highways lables on the map
              featureType: 'road.highway',
              elementType: 'labels',
              stylers: [
                  {visibility: "off"}
              ]
          }, 
          { 	
              //don't show local road lables on the map
              featureType: "road.local", 
              elementType: "labels.icon", 
              stylers: [
                  {visibility: "off"} 
              ] 
          },
          { 
              //don't show arterial road lables on the map
              featureType: "road.arterial", 
              elementType: "labels.icon", 
              stylers: [
                  {visibility: "off"}
              ] 
          },
          {
              //don't show road lables on the map
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [
                  {visibility: "off"}
              ]
          }, 
          //style different elements on the map
          { 
              featureType: "transit", 
              elementType: "geometry.fill", 
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          }, 
          {
              featureType: "poi",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          },
          {
              featureType: "poi.government",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          },
          {
              featureType: "poi.sport_complex",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          },
          {
              featureType: "poi.attraction",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          },
          {
              featureType: "poi.business",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          },
          {
              featureType: "transit",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          },
          {
              featureType: "transit.station",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          },
          {
              featureType: "landscape",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]

          },
          {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          },
          {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          }, 
          {
              featureType: "water",
              elementType: "geometry",
              stylers: [
                  { hue: main_color },
                  { visibility: "on" }, 
                  { lightness: brightness_value }, 
                  { saturation: saturation_value }
              ]
          }
      ];
  });


});