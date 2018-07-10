(function($) {
  'use strict'; // Start of use strict

  // Smooth scrolling using jQuery easing
  $("a.js-scroll-trigger[href*='#']:not([href='#'])").click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, 'easeInOutExpo');
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#main-nav',
    offset: 54
  });

  // Collapse navbar
  var navbarCollapse = function() {
    if ($('#main-nav').offset().top > 100) {
      $('#main-nav').addClass('navbar-shrink');
    } else {
      $('#main-nav').removeClass('navbar-shrink');
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Represents map on page
  mapboxgl.accessToken = 'pk.eyJ1IjoicG9seWdsb3RsYSIsImEiOiJjamk4MWpieGwwaGdyM2twZm4xNGp0NjdrIn0.6UQU_aGjycoB5P3V3T_CdQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    zoom:12.7,
    center: [-118.25594,34.05744]
  });

  map.on('load', function () {
    //  An image is loaded and added to the map
    map.loadImage('https://i.imgur.com/MK4NUzI.png', function(error, image) {
      if (error) throw error;
      map.addImage('custom-marker', image);
      // A style layer ties together the source and image and specifies how they are displayed on the map.
      map.addLayer({
        id: 'markers',
        type: 'symbol',
        // A data source specifies the geographic coordinate where the image marker gets placed
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features:[{'type':'Feature','geometry':{'type':'Point','coordinates':['-118.25412','34.05617']}}]}
        },
        layout: {
          'icon-image': 'custom-marker',
        }
      });
    });
  });

  // Disables scrolling
  map.scrollZoom.disable();

  $.ajax({
    dataType: 'jsonp',
    method: 'get',
    url: 'https://api.meetup.com/polyglotLA/events?photo-host=public&page=20&sig_id=192436838&sig=9b69280b1e55d1d73c0fbfa2ad3c50489f77748d',
    success: function(result) {
      var event = result.data[0];
      if (event) {
        var name = event.name;
        var month = event.local_date.split('-')[1].toString();
        var day = event.local_date.split('-')[2].toString();
        var year = event.local_date.split('-')[0].toString();
        var link = event.link;
        var customHtml = 'Join us for our next meetup, ' + name + ', on ' + month + '/' + day + '/' + year + '.';
        $('#next-meetup').text(customHtml);
        $('#meetup-link').attr('href', link);
      }}});
})(jQuery);
