var winningObject = {
  1: "stairway1",
  2: "stairway2",
  3: "stairway3",
  4: "stairway4"
}

$(document).ready(function() {
  var difficulty;

  $('#easy').click(function() {
    $('.game-wrapper').css('display', 'block')
    difficulty = 'easy'
    createGame(difficulty)
  })

  $('#medium').click(function() {
    $('.game-wrapper').css('display', 'block')
    difficulty = 'medium'
    createGame(difficulty)
  })

  $('#hard').click(function() {
    $('.game-wrapper').css('display', 'block')
    $('#play').css('display', 'none')
    $('#listen').css('display', 'none')
    difficulty = 'hard'
    createGame(difficulty)
  })
})

var createGame = function(difficulty) {
  var measureArray = ['stairway1', 'stairway2', 'stairway3', 'stairway4', 'spirit1', 'spirit2', 'spirit3', 'spirit4']
  var measureArray = _.shuffle(measureArray)

  for(var i=1;i<5;i++) {
    var measure = measureArray.pop()

    var el = $('<div class="drag-item"><img src="img/' + measure + '.png"><audio controls><source src="audio/' + measure +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile .top-row').append(el)

    el.data('measure', measure)

    if(difficulty !='hard'){
      el.dblclick(function() { 
        this.children[1].play()
      })      
    }

    var dropEl = $('<div class="drop">Drop here</div>')
    dropEl.data('measure', 'stairway' + i)
    $('#drop').append(dropEl)

  }

  $('.drag-item').draggable({
    stack: '#pile div',
    revert: function(event, ui) {
      $(this).data('uiDraggable').originalPosition = {
        top: 0,
        left: 0
      }
      return !event;
    }
  })

  for(var i=1;i<5;i++) {
    var measure = measureArray.pop()

    var el = $('<div class="drag-item"><img src="img/' + measure + '.png"><audio controls><source src="audio/' + measure +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile .bottom-row').append(el)

    el.data('measure', measure)


    if(difficulty !='hard'){
      el.dblclick(function() { 
        this.children[1].play()
      })      
    }

  }

  $('.drag-item').draggable({
    stack: '#pile div',
    revert: function(event, ui) {
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
          var margin = parseInt(elem.css('margin'))
          var top = Math.round(elem.position().top) + margin
          var left = Math.round(elem.position().left) + margin
          return (top === Math.round($('.drop:eq(' + number + ')').position().top) && left === Math.round($('.drop:eq(' + number + ')').position().left))
      })
    } catch(e) {
      return undefined
    }
  }


  $('#play').click(function() {

    var audioEl = findAudioEl(0)
    var audioEl2 = findAudioEl(1)
    var audioEl3 = findAudioEl(2)
    var audioEl4 = findAudioEl(3)

    var cloneAudio = function(node) {
      var oldElement = node
      var newElement = oldElement.cloneNode(true)
      oldElement.parentNode.replaceChild(newElement, oldElement)
    }

    // var setAudioListener = function(elem, elem2) {
    //   var audio = $(elem).children()[1]
    //   audio.addEventListener('ended', function() {
    //     $(elem2).children()[1].play()
    //     cloneAudio($(elem)[0])
    //   })
    // }

    // setAudioListener(audioEl, audioEl2)
    // setAudioListener(audioEl2, audioEl3)
    // setAudioListener(audioEl3, audioEl4)

    var audio = $(audioEl).children()[1]
    audio.addEventListener('ended', function() {
      $(audioEl2).children()[1].play()
      cloneAudio($(audio)[0])
    })

    var audio2 = $(audioEl2).children()[1]
    if(audio2){
      audio2.addEventListener('ended', function() {
        $(audioEl3).children()[1].play()
        cloneAudio($(audio2)[0])
      })      
    }

    var audio3 = $(audioEl3).children()[1]
    if(audio3) {
      audio3.addEventListener('ended', function() {
        $(audioEl4).children()[1].play()
        cloneAudio($(audio3)[0])  
      })
    }

    var audio4 = $(audioEl4).children()[1]
    if(audio4) {
      audio4.addEventListener('ended', function() {
        cloneAudio($(audio4)[0])     
      })      
    }

    $(audioEl).children()[1].play()
  })

  $('#submit').click(function() {
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
      alert('You win!')
    } else {
      alert('You lose!')
    }
  })

  $('#answer').click(function() {

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
    $('.drag-item').animate({
      'left': $('.drag-item').data('left'),
      'top': $('.drag-item').data('top')
    })
    $('.drop').droppable('option', 'accept', '.drag-item')
  }

  $('#reset').click(function() {
    reset()
  })

  $('.drag-item').data('left', 0).data('top', 0)
}


  





