//In-page search query anchoring function
$(document).ready(function(){
  // Parse URL to check if page is result of a search
  if(location.search != ''){
    // Retrieve search term from URL and strip it down
    var term = location.search.substr(3);
    if(term.match(/%20|\+|-|\*/) != null){
      term = term.replace(/%20/g,' ');
      term = term.replace(/%20|\+|-|\*/g,'');
    }
    var re = new RegExp(term, "gi");
    // Use jQuery to isolate only the searchable HTML tags
    // var body = $('.col-main__content > h1,h2,h3,h4,h5,p,a,ol,ul,li');
    var body = $(document);
    // Iterate through HTML, perform regex to find matches, add anchor class to matching HTML tags
    for(i=0;i<body.length;i++){
      if(body[i].innerHTML.match(re)){
        $(body[i]).addClass('term_anchor');
      }
    }

    //In-page Search Term Highlighter
    //Parse the anchored html tag for the search query and highlight it
    $('.term_anchor').each(function(){
      //Skip any match that is nested in the href of an anchor tag
      if(this.innerHTML.match(/<(a|\/a).*?>/gi)){
        return;
      }
      //Obtain the match to maintain upper/lower case
      var match = $(this).text().match(re)[0];
      //Replace html with highlighted tern
      this.innerHTML = this.innerHTML.replace(re,'<span style="background-color: #D6F5DE">'+match+'</span>');
    });

    //In-page Search Term Anchorer
    setTimeout(function(){
      // Locate the term and automically scroll window around it
      var autoscroll = document.getElementsByClassName('term_anchor');
      var anchor = autoscroll[0];
      var offset = parseInt($(anchor).offset().top);
      var target = offset - 190;

      $('html, body').animate({
        scrollTop: target
      }, 500, 'easeOutExpo');
    },100);
  }

});
