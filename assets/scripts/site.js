$('.js-nav-link').first().addClass('js-current');
$('.js-parent').first().addClass('js-open');

function setCurrentNav(s) {
  var scrollVal = $(document).scrollTop();
  if (scrollVal > $('#phase-intro-text').position().top) {
    $('header.phase-nav').removeClass('opacity-0');
  } else {
    $('header.phase-nav').addClass('opacity-0');
  }
  $(".js-category").each(function() {
    var offset = ($(this).position().top) - 50;
    var id = $(this).attr("id");
    var title = $(this).children('.category-title').html();
    if(scrollVal >= offset) {
      if (s == true) {
        $('.js-parent').removeClass('js-open');
        $("a[href='#" + id + "']").parent('li').parent('ul').addClass('js-open');
      }
      $('.js-nav-link').removeClass('js-current');
      $("a[href='#" + id + "']").addClass('js-current');
      $(".js-nav-category").html(title);
    }
  });
  $(".js-section").each(function() {
    var offset = ($(this).position().top) - 50;
    var title = $(this).children('.item-title').children('span').html();
    if(scrollVal >= offset) {
      if (title !== undefined) {
        $(".js-nav-section").html(": " + title);
      } else {
        $(".js-nav-section").html("");
      }
    }
  });
}

$(document).scroll(function() {
  setCurrentNav(false);
  clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        setCurrentNav(true);
    }, 50));
});

var mobileNavOpen = false;

$(function() {
  $(".js-mobile-nav").click(function() {
    $(this).toggleClass('js-open');
    mobileNavHide = anime({
      targets: '.sidebar-nav',
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      easing: 'easeInOutQuad',
      duration: 200,
      autoplay: false
    });

    mobileNavShow = anime({
      targets: '.sidebar-nav',
      height: '100%',
      opacity: 1,
      overflow: 'visible',
      easing: 'easeInOutQuad',
      duration: 200,
      autoplay: false
    });

    if (!mobileNavOpen) {
      mobileNavShow.play();
      mobileNavOpen = true;
    } else {
      mobileNavHide.play();
      mobileNavOpen = false;
    }
  });

  $(".js-parent .js-nav-link").click(function(e) {
    e.preventDefault();
    $('.js-parent').removeClass('js-open');
    $(this).addClass('js-open');
  });

var clipboardLinks = new ClipboardJS('.js-copy-link');
var clipboardHex = new ClipboardJS('.js-copy-hex');

clipboardLinks.on('success', function(e) {
    e.clearSelection();
    showClipboardCopy("Link copied!");
});

clipboardHex.on('success', function(e) {
    e.clearSelection();
    showClipboardCopy("Hex value copied!");
});

function showClipboardCopy(content) {
  $('.js-tooltip').remove();
  $('body').append('<div class="js-tooltip">' + content + '</div>');
  var animate = anime.timeline({
    easing: 'easeOutBack',
    autoplay: true,
  });

  animate
  .add({
    targets: '.js-tooltip',
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 300,
    easing: 'easeOutBack'
  })
  .add({
    targets: '.js-tooltip',
    opacity: [1, 0],
    translateY: [0, 40],
    duration: 300,
    delay: 1000,
    easing: 'easeOutBack'
  });
}
