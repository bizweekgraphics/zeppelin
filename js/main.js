var winningObject = {
  1: "stairway1",
  2: "stairway2",
  3: "stairway3",
  4: "stairway4"
}

function fbShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + 'http://www.businessweek.com/articles/2014-05-15/the-stairway-to-heaven-game-did-led-zeppelin-steal-the-greatest-song-opening-in-rock-history' + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}

$(document).ready(function() {

  $('#win a').jqSocialSharer()

  $('body').smoothScroll({
    preventDefault: false
  })

  var difficulty;
  $('#easy').mouseover(function() {
    $('#arrow').css('left', '388px')
    $('#arrow').show()
  })

  $('#medium').mouseover(function() {
    $('#arrow').css('left', '469px')
    $('#arrow').show()
  })

  $('#hard').mouseover(function() {
    $('#arrow').css('left', '569px')
    $('#arrow').show()
  })

  $('#easy').click(function(event) {
    $('.difficulty-wrapper a').unbind('mouseover')
    $('.difficulty-wrapper a').unbind('mouseleave')
    $('#arrow').css('left', '388px')
    $('#arrow').show()
    $('.difficulty-wrapper a').css('color', 'white')
    $(this).css('color', 'red')
    difficulty = 'easy'
    newGame()
    createGame(difficulty)
    $('.game-wrapper').fadeIn('slow')
  })

  $('#medium').click(function(event) {
    $('.difficulty-wrapper a').unbind('mouseover')
    $('.difficulty-wrapper a').unbind('mouseleave')
    $('#arrow').css('left', '469px')
    $('#arrow').show()
    $('.difficulty-wrapper a').css('color', 'white')
    $(this).css('color', 'red')
    newGame()
    $('.game-wrapper').fadeIn('slow')
    difficulty = 'medium'
    createGame(difficulty)
  })

  $('#hard').click(function(event) {
    $('.difficulty-wrapper a').unbind('mouseover')
    $('.difficulty-wrapper a').unbind('mouseleave')
    $('#arrow').css('left', '569px')
    $('.difficulty-wrapper a').css('color', 'white')
    $(this).css('color', 'red')
    newGame()
    $('.game-wrapper').fadeIn('slow')
    $('#play').css('display', 'none')
    difficulty = 'hard'
    createGame(difficulty)
  })

    var init = function() {
      $('.difficulty-wrapper a').unbind('mouseover')
      $('.difficulty-wrapper a').unbind('mouseleave')
      $('#arrow').css('left', '388px')
      $('.difficulty-wrapper a').css('color', 'white')
      $('#easy').css('color', 'red')
      difficulty = 'easy'
      newGame()
      createGame(difficulty)
      $('.game-wrapper').fadeIn('slow')
    }

    init()
})

var createGame = function(difficulty) {
  $('#newgame').hide()
  $('#' + difficulty + '-text').css('display', 'block')

  var measureArray = ['stairway1', 'stairway2', 'stairway3', 'stairway4', 'spirit1', 'spirit2', 'spirit3', 'spirit4']
  var measureArray = _.shuffle(measureArray)

  for(var i=1;i<9;i++) {
    var measure = measureArray.pop()
    if(i<5){
      var appendEl = $('#pile .top-row')
    } else {
      var appendEl = $('#pile .bottom-row')
    }

    var el = $('<div class="drag-item"><img src="img/' + measure + '.png"><audio controls><source src="audio/' + measure +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $(appendEl).append(el)

    el.data('measure', measure)
    el.data('dragLock', 'false')

    if(difficulty !='hard'){
      el.dblclick(function() {
      $('audio').each(function(index,audio) {
        audio.pause()
        audio.currentTime = 0
        var audio = cloneAudio(audio)
      })
        this.children[1].play()
      })      
    }
  }

  for(var i=1; i < 5; i++){
    var dropEl = $('<div class="drop"></div>')
    dropEl.data('measure', 'stairway' + i)
    $('#drop').append(dropEl)    
  }


  $('.drag-item').draggable({
    stack: '#pile div',
    start: function(event, ui) {
      $(this).data('dragLock', 'false')
      var source = $(this).data('measure')
      $(this).children().first().attr('src', 'img/white/' + source + '.png')
    },
    stop: function(event, ui) {
      if($(this).data('dragLock') === 'false') {
      var source = $(this).data('measure')
      $(this).children().first().attr('src', 'img/' + source + '.png')
      }
    },
    revert: function(event, ui) {
      var source = $(this).data('measure')
      if($(this).data('dragLock') === 'false') {
        $(this).children().first().attr('src', 'img/' + source + '.png')
      }
      $(this).data('uiDraggable').originalPosition = {
        top: 0,
        left: 0
      }
      return !event;
    },
    drag: function(event, ui) {
        var audioEl = findAudioEl(0)
        var audioEl2 = findAudioEl(1)
        var audioEl3 = findAudioEl(2)
        var audioEl4 = findAudioEl(3)

        if(audioEl) {
          $('.drop:eq(0)').droppable('disable')
        } else {
          $('.drop:eq(0)').droppable('enable')
        }
        if(audioEl2) {
          $('.drop:eq(1)').droppable('disable')
        } else {
          $('.drop:eq(1)').droppable('enable')
        }
        if(audioEl3) {
          $('.drop:eq(2)').droppable('disable')
        } else {
          $('.drop:eq(2)').droppable('enable')
        }
        if(audioEl4) {
          $('.drop:eq(3)').droppable('disable')
        } else {
          $('.drop:eq(3)').droppable('enable')
        }
    }
  })

  var dropEvent = function(event, ui) {
    ui.draggable.data('dragLock', 'true')
    ui.draggable.position( {of: $(this), my: 'left top', at: 'left top' })
    $(this).droppable('option', 'accept', ui.draggable);
    var source = ui.draggable.data('measure')
    ui.draggable.children().first().attr('src', 'img/white/' + source + '.png')
  }

  if(difficulty === 'easy') {
    $('.drop').droppable({
      over: function(event, ui) {
        if(ui.draggable.data('measure') ===$(this).data('measure')) {
          $(this).addClass('drop-hover-easy')
        } else {
          $(this).addClass('drop-hover')
        }
        var source = ui.draggable.data('measure')
        $(this).data('dragLock', 'false')
        ui.draggable.children().first().attr('src', 'img/' + source + '.png')
      },
      drop: dropEvent,
      out: function(event, ui){
        $(this).droppable('option', 'accept', '.drag-item');
        if(ui.draggable.data('measure') === $(this).data('measure')) {
          $(this).removeClass('drop-hover-easy')
        } else {
          $(this).removeClass('drop-hover')
        }
        var source = ui.draggable.data('measure')
        $(this).data('dragLock', 'false')
        ui.draggable.children().first().attr('src', 'img/' + source + '.png')
      },
    });    
  } else {
    $('.drop').droppable({
      drop: dropEvent,
      hoverClass: 'hover',
      out: function(event, ui){
        $(this).droppable('option', 'accept', '.drag-item');
        $(this).data('dragLock', 'false')
        var source = ui.draggable.data('measure')
        ui.draggable.children().first().attr('src', 'img/' + source + '.png')
      }   
    })
  }

  var findAudioEl = function(number) {
    try {
      return _.find($('.drag-item'), function(elem) {
          var elem = $(elem)
          var marginLeft = parseInt(elem.css('margin-left'))
          var marginTop = parseInt(elem.css('margin-top'))
          var top = Math.round(elem.position().top) + marginTop
          var left = Math.round(elem.position().left) + marginLeft
          return (top === Math.round($('.drop:eq(' + number + ')').position().top) && left === Math.round($('.drop:eq(' + number + ')').position().left))
      })
    } catch(e) {
      return undefined
    }
  }

    var cloneAudio = function(node) {
      var oldElement = node
      var newElement = oldElement.cloneNode(true)
      oldElement.parentNode.replaceChild(newElement, oldElement)
    }

  $('#play').click(function(event) {
    event.preventDefault()

    var audioEl = findAudioEl(0)
    var audioEl2 = findAudioEl(1)
    var audioEl3 = findAudioEl(2)
    var audioEl4 = findAudioEl(3)

    var setAudioListener = function(elem, elem2) {
      var audio = $(elem).children()[1]
      audio.addEventListener('ended', function() {
        $(elem2).children()[1].play()
        cloneAudio($(audio)[0])
      })
    }

    if(audioEl && audioEl2) {
      setAudioListener(audioEl, audioEl2)
    }

    if(audioEl2 && audioEl3) {
      setAudioListener(audioEl2, audioEl3)
    }

    if(audioEl3 && audioEl4) {
      setAudioListener(audioEl3, audioEl4)
    }

    $(audioEl).children()[1].play()
  })

  $('#submit').click(function(event) {
    event.preventDefault()
    var audioEl = findAudioEl(0)
    var audioEl2 = findAudioEl(1)
    var audioEl3 = findAudioEl(2)
    var audioEl4 = findAudioEl(3)

    checkObject = {
      1: $(audioEl).data('measure'),
      2: $(audioEl2).data('measure'),
      3: $(audioEl3).data('measure'),
      4: $(audioEl4).data('measure')
    }
    if (JSON.stringify(checkObject) === JSON.stringify(winningObject)) {
      $('#win img').first().attr('src', 'img/win.png')
        $('#facebook').click(function() {
          fbShare(document.URL, 'Fb Share', 'Facebook share popup', document.URL, 520, 350)
      })
    } else {
      $('#win img').first().attr('src', 'img/lose.png')
        $('#facebook').click(function() {
    fbShare(document.URL, 'Fb Share', 'Facebook share popup', document.URL, 520, 350)
  })


    }
    $('#win').show();

        $('#twitter').click(function(event) {
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = 'http://www.twitter.com/share?url=http://www.businessweek.com/articles/2014-05-15/the-stairway-to-heaven-game-did-led-zeppelin-steal-the-greatest-song-opening-in-rock-history',
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;

    window.open(url, 'twitte', opts);

    return false;
  });
    $('#win').animate({
      left: '235px',
      top: '1200px',
      width: '450px',
      height: '175px',
      opacity: 1
    })
    setTimeout(function() {
      $(window).on('click', function(event) {
        if(event.target != $('#facebook')[0] && event.target !=$('#twitter')[0]){
        $('#win').css('display', 'none')
        $(window).off('click')
      }
      })
    }, 1000)

    if(difficulty === 'hard') {
          var cloneAudio = function(node) {
      var oldElement = node
      var newElement = oldElement.cloneNode(true)
      oldElement.parentNode.replaceChild(newElement, oldElement)
    }

    var setAudioListener = function(elem, elem2) {
      var audio = $(elem).children()[1]
      audio.addEventListener('ended', function() {
        $(elem2).children()[1].play()
        cloneAudio($(audio)[0])
      })
    }

    if(audioEl && audioEl2) {
      setAudioListener(audioEl, audioEl2)
    }

    if(audioEl2 && audioEl3) {
      setAudioListener(audioEl2, audioEl3)
    }

    if(audioEl3 && audioEl4) {
      setAudioListener(audioEl3, audioEl4)
    }

    $(audioEl).children()[1].play()
    }
  })

  $('#answer').click(function(event) {
    $('.drop').droppable('disable')
    event.preventDefault()
    reset()

    var findElem = function(number) {
      return _.find($('.drag-item'), function(elem) {
        var elem = $(elem)
        return elem.data('measure') === winningObject[number]
      })
    }

    var first = findElem(1)
    var second = findElem(2)
    var third = findElem(3)
    var fourth = findElem(4)

    var elemArray = [first, second, third, fourth]

    elemArray.forEach(function(elem, index) {
      var source = $(elem).data('measure')
      $(elem).children().first().attr('src', 'img/white/' + source + '.png')
      $(elem).position({
        of: $('.drop:eq(' + index + ')'), 
        my: 'left top', 
        at: 'left top', 
        using: function(css, calc) {
        $(elem).animate(css, 200, 'linear')
        }
      })      
    })
  })

  $('.drop').data('left', $('.drop').position().left).data('top', $('.drop').position().top)

  var reset = function() {
    if(difficulty === 'easy') {
      $('.drop').removeClass('drop-hover-easy')
      $('.drop').removeClass('drop-hover')
    }
    $('.drag-item').animate({
      'left': $('.drag-item').data('left'),
      'top': $('.drag-item').data('top')
    })
    $('.drop').droppable('option', 'accept', '.drag-item')

    $('.drag-item').each(function(index, item) {
      var source = $(item).data('measure')
      $(item).children().first().attr('src', 'img/' + source + '.png')
    })
  }

  $('#reset').click(function(event) {
    $('.drop').droppable('enable')
    event.preventDefault()
    reset()
  })

  $('.drag-item').data('left', 0).data('top', 0)

  // $('#newgame').click(function(event) {
  //   event.preventDefault()
  //   newGame()
  //   createGame(difficulty)
  //   $('.game-wrapper').fadeIn('slow')
  // })
}

var clearGame = function() {
  $('.text-wrapper p').hide()
  $('.game-wrapper').remove()
}

var newGame = function() {
  var url = window.URL

  clearGame()
  // $('.difficulty').css('display', 'inline')

var template = '<div class="game-wrapper"><div id="win"><img id="win-img" src="img/win.png">'

template+= '<img id="facebook" class="share" src="img/facebook.png"></a><a href="#">'

template += "<a href='#'><img class='share' id='twitter' src=\"img\/twitter.png\"><\/a>"


template += '<img class="share" id="share-text" src="img/share.png"></div><div class="text-wrapper"><p id="easy-text">Find the four measures from <em>Stairway to Heaven</em> and assemble them in order below. The other four measures come from Spirit’s <em>Taurus</em>. Double-click each bar to hear the piper lead us to reason. Everything still turns to gold when each measure is in the correct spot.</p><p id="medium-text">Find the four measures from Led Zeppelin’s song and assemble them in order below. Double-click on each bar—if you listen very hard, the tune will come to you at last. No hints from the answer field.</p><p id="hard-text">To be a rock and not to roll. This time there is no music to help and no hints from the answer field, guitar hero. Find the four measures from <em>Stairway to Heaven</em> by reading the notes and assemble them in order below.</p></div><div id="pile"><div class="measure-row top-row"></div><div class="measure-row bottom-row"></div></div><div class="drop-wrapper"><div id="drop" class="two-thirds column content"></div></div><div class="game-button one-third column"><a href="#" id="submit"><img src="img/submit.png"></a><a href="#" id="play"><img src="img/play.png"></a><a href="#" id="answer"><img src="img/reveal.png"></a><a href="#" id="reset"><img src="img/reset.png"></a><a href="#" id="newgame"><img src="img/newgame.png"></a></div></div>'




  $('.container').append(template)
}







