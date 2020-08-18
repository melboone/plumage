!function ($) {
  $(function(){

    // Activate Bootstrap's tooltips
    $('[data-toggle="tooltip"]').tooltip()

    // Fix navigation to the top on scroll.
    var $win = $(window)
      , $nav = $('.navbar')
      , $brand = $('.navbar-brand')
      , navTop = $('.navbar').length && $('.navbar').offset().top
      , isFixed = 0
    processScroll()
    $win.on('scroll', processScroll)
    function processScroll() {
      var i, scrollTop = $win.scrollTop()
      if (scrollTop >= navTop && !isFixed) {
        isFixed = 1
        $nav.addClass('fixed-top').removeClass('rounded')
        $navbrand.removeClass('d-none')
      } else if (scrollTop <= navTop && isFixed) {
        isFixed = 0
        $nav.removeClass('fixed-top').addClass('rounded')
        $navbrand.addClass('d-none')
      }
    };

    // TODO: this should be done server side with a Jinja or Markdown
    // extension.
    // Add bootstrap table style to table elements.
    $("#content table").addClass('table table-hover');
    $("#content table thead th").addattr('scope', 'col');

    // Make images responsive in article content.
    $("#content img").addClass('img-fluid border rounded shadow');
    $("#content .card img").removeClass('img-fluid border rounded shadow');

    // Style blockquote in the way Bootstrap does.
    $("blockquote").addClass('blockquote');

    // Allow videos to take the full width of a page
    $(".container").fitVids();

    // YouTube URL parser. Source: https://stackoverflow.com/questions/2964678/jquery-youtube-url-validation-with-regex/10315969#10315969
    function parse_youtube_url(url) {
      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
      return (url.match(p)) ? RegExp.$1 : false;
    };

    // Activate zoom on content images in the main column and add an icon overlay (but ignore link icons from the footer produced by Jinja macros)
    $("#content img:not(.link-icon)").each(function(){
      // Until we properly generate thumbnails and their links on Pelican's side, we just link an image to itself.
      if ($(this).parents('a').length == 0) {
        $(this).wrap(
          $('<a/>').attr('href', $(this).attr('src'))
        );
      };
      // Add a special class for images linking to videos
      var link_tag = $(this).closest('a');
      if (parse_youtube_url(link_tag.attr('href')) != false) {
        link_tag.addClass("video");
        return;
      }
      // No zoom popup for class noZoom
      if ($(this).hasClass( "noZoom" )) {
        return;
      }

      // Activate zoom popup
      link_tag.magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        midClick: true,
        mainClass: 'mfp-with-zoom',
        zoom: {
          enabled: true,
          duration: 300,
          easing: 'ease-in-out',
        },
      });

      // Add overlay zoom icon
      $(this).mglass({opacity: 1,});
    });

  });
}(window.jQuery);
