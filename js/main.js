var winningObject = {
  1: "stairway1",
  2: "stairway2",
  3: "stairway3",
  4: "stairway4"
}

$(document).ready(function() {
  $('html').smoothScroll(300)

  var difficulty;
  $('#easy').mouseover(function() {
    $('#arrow').css('left', '396px')
    $('#arrow').show()
  })

  $('#medium').mouseover(function() {
    $('#arrow').css('left', '477px')
    $('#arrow').show()
  })

  $('#hard').mouseover(function() {
    $('#arrow').css('left', '577px')
    $('#arrow').show()
  })

  $('.difficulty-wrapper a').mouseleave(function() {
    $('#arrow').css('display', 'none')
  })

  $('#easy').click(function(event) {
    $('.difficulty-wrapper a').unbind('mouseover')
    $('.difficulty-wrapper a').unbind('mouseleave')
    $('#arrow').css('left', '396px')
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
    $('#arrow').css('left', '477px')
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
    $('#arrow').css('left', '577px')
    $('#arrow').show()
    $('.difficulty-wrapper a').css('color', 'white')
    $(this).css('color', 'red')
    newGame()
    $('.game-wrapper').fadeIn('slow')
    $('#play').css('display', 'none')
    difficulty = 'hard'
    createGame(difficulty)
  })
})

var createGame = function(difficulty) {
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

    if(difficulty !='hard'){
      el.dblclick(function() {
      $('audio').each(function(index,audio) {
        audio.pause()
        audio.currentTime = 0
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
      var source = $(this).data('measure')
      $(this).children().first().attr('src', 'img/white/' + source + '.png')
    },
    stop: function(event, ui) {
    },
    revert: function(event, ui) {
      var source = $(this).data('measure')
        $(this).children().first().attr('src', 'img/' + source + '.png') 
      $(this).data('uiDraggable').originalPosition = {
        top: 0,
        left: 0
      }
      return !event;
    }
  })

  var dropEvent = function(event, ui) {
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
      },
      drop: dropEvent,
      out: function(event, ui){
        $(this).droppable('option', 'accept', '.drag-item');
        if(ui.draggable.data('measure') === $(this).data('measure')) {
          $(this).removeClass('drop-hover-easy')
        } else {
          $(this).removeClass('drop-hover')
        }
      }   
    });    
  } else {
    $('.drop').droppable({
      drop: dropEvent,
      hoverClass: 'hover',
      out: function(event, ui){
        $(this).droppable('option', 'accept', '.drag-item');
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


  $('#play').click(function(event) {
    event.preventDefault()

    var audioEl = findAudioEl(0)
    var audioEl2 = findAudioEl(1)
    var audioEl3 = findAudioEl(2)
    var audioEl4 = findAudioEl(3)

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
      // alert('You win!')
      $('#win img').attr('src', 'img/win.png')
    } else {
      $('#win img').attr('src', 'img/lose.png')
    }
    $('#win').show();
    $('#win').animate({
      left: '270px',
      top: '1200px',
      width: '400px',
      height: '125px',
      opacity: 1
    })
    setTimeout(function() {
      $(window).one('click', function() {
        $('#win').css('display', 'none')
      })
    }, 1000)
  })

  $('#answer').click(function(event) {
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
  }

  $('#reset').click(function(event) {
    event.preventDefault()
    reset()
  })

  $('.drag-item').data('left', 0).data('top', 0)

  $('#newgame').click(function(event) {
    event.preventDefault()
    newGame()
    createGame(difficulty)
    $('.game-wrapper').fadeIn('slow')

})
}

var clearGame = function() {
  $('.text-wrapper p').hide()
  $('.game-wrapper').remove()
}

var newGame = function() {
  clearGame()
  // $('.difficulty').css('display', 'inline')

var template="";
template += "    <div class=\"game-wrapper\">";
template += "    <div id=\"win\"><img src=\"img\/win.png\"><\/div>";
template += "      <div class=\"text-wrapper\">";
template += "        <p id=\"easy-text\">Find the four measures from <em>Stairway to Heaven<\/em> and assemble them in order below. The other four measures come from Spirit’s <em>Taurus<\/em>. Double-click each bar to hear the piper lead us to reason. Everything still turns to gold when each measure is in the correct spot.<\/p>";
template += "        <p id=\"medium-text\">Your stairway lies on the whispering wind. Find the four measures from Led Zeppelin’s song and assemble them in order below. Double-click on each bar—if you listen very hard, the tune will come to you at last. No hints from the answer field.<\/p>";
template += "        <p id=\"hard-text\">To be a rock and not to roll. That means no music to help you this time and no hints from the answer field, guitar hero. Find the four measures from <em>Stairway to Heaven<\/em> by reading the notes and assemble them in order below.<\/p>";
template += "      <\/div>";
template += "      <div id=\"pile\">";
template += "        <div class=\"measure-row top-row\"><\/div>";
template += "        <div class=\"measure-row bottom-row\"><\/div>";
template += "      <\/div>";
template += "      <div class=\"drop-wrapper\">";
template += "        <div id=\"drop\" class=\"two-thirds column content\"><\/div>";
template += "      <\/div>";
template += "      <div class=\"game-button one-third column\">";
template += "        <a href=\"#\" id=\"submit\"><img src=\"img\/submit.png\"><\/a>";
template += "        <a href=\"#\" id=\"play\"><img src=\"img\/play.png\"><\/a>";
template += "        <a href=\"#\" id=\"answer\"><img src=\"img\/reveal.png\"><\/a>";
template += "        <a href=\"#\" id=\"reset\"><img src=\"img\/reset.png\"><\/a>";
template += "        <a href=\"#\" id=\"newgame\"><img src=\"img\/newgame.png\"><\/a>";
template += "      <\/div>";
template += "    <\/div>";




  $('body').append(template)
}



  





