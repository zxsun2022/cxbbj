jQuery(document).ready(function() {
	// Open/Close left menu elements
    jQuery('article aside i.ddexp').on('click', function() {
    	console.log($(this))
        $( this ).toggleClass("fa-chevron-right fa-chevron-down") ;
        $( this ).parent().children('ul').toggle() ;
        return false;
    });

    // Execute actions on images generated from Markdown pages

    var images = $("article section.page img");
    // Change styles, depending on parameters set to the image
    images.each(function (index) {
        var image = $(this);
        var o = getUrlParameter(image[0].src);
        if (typeof o !== "undefined") {
            var h = o["height"];
            var w = o["width"];
            var c = o["classes"];
            image.css({
                width: function () {
                    if (typeof w !== "undefined") {
                        return w;
                    }
                },
                height: function () {
                    if (typeof h !== "undefined") {
                        return h;
                    }
                }
            });
            if (typeof c !== "undefined") {
                var classes = c.split(',');
                $.each(classes, function(i) {
                    image.addClass(classes[i]);
                });
            }
        }
    });

    headingsCache = document.querySelectorAll('.TableOfContents li');

});

var headingsCache;


function clearActiveStatesInTableOfContents() {
    headingsCache.forEach((section) => {
      section.classList.remove('active');
  });
}

//---------------------
window.addEventListener('DOMContentLoaded', () => {



  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          const id = entry.target.getAttribute('id');
          if (entry.intersectionRatio > 0) {
              clearActiveStatesInTableOfContents();
              document.querySelector(`.TableOfContents li > a[href="#${id}"]`).parentElement.classList.add('active');
          } 
          //else {
          //    document.querySelector(`.TableOfContents li > a[href="#${id}"]`).parentElement.classList.remove('active');
          //}
      });
  });

  // Track all sections that have an `id` applied
  document.querySelectorAll('article section.page div.content a[id]').forEach((section) => {
      observer.observe(section);
  });
  
});


// Get Parameters from some url
var getUrlParameter = function getUrlParameter(sPageURL) {
    var url = sPageURL.split('?');
    var obj = {};
    if (url.length == 2) {
        var sURLVariables = url[1].split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            obj[sParameterName[0]] = sParameterName[1];
        }
        return obj;
    } else {
        return undefined;
    }
};