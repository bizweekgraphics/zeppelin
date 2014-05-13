var audioObject = {}

var imageObject = {}

var winningObject = {
  1: "img/stairway1.png",
  2: "img/stairway2.png",
  3: "img/stairway3.png",
  4: "img/stairway4.png"
}

$(document).ready(function() {
  var measureArray = ['stairway1', 'stairway2', 'stairway3', 'stairway4', 'spirit1', 'spirit2', 'spirit3', 'spirit4']
  var measureArray = _.shuffle(measureArray)

  for(var i=1;i<5;i++) {
    var measure = measureArray.pop()

    var el = $('<div class="drag-item"><img src="img/' + measure + '.png"><audio controls><source src="audio/' + measure +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile .top-row').append(el)

    el.dblclick(function() { 
      this.children[1].play()
    })

    var dropEl = $('<div class="drop">drop</div>')
    $('#drop').append(dropEl)

    jQuery.data(dropEl[0], 'number', i)
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

    el.dblclick(function() { 
      this.children[1].play()
    })

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
    var number = jQuery.data(this, 'number')
    ui.draggable.position( {of: $(this), my: 'left top', at: 'left top' })
    $(this).droppable('option', 'accept', ui.draggable);
    audioObject[number] = $(ui.draggable)
    imageObject[number] = $($(ui.draggable).first().children()[0]).attr('src')
  }

  $('.drop').droppable({
    hoverClass: "drop-hover",
    drop: dropEvent,
    out: function(event, ui){
        $(this).droppable('option', 'accept', '.drag-item');
    }   
  });


  $('#submit').click(function() {

    var findAudioEl = function(number) {
      return _.find($('.drag-item'), function(elem) {
          var elem = $(elem)
          var margin = parseInt(elem.css('margin'))
          var top = Math.round(elem.position().top) + margin
          var left = Math.round(elem.position().left) + margin
          return (top === Math.round($('.drop:eq(' + number + ')').position().top) && left === Math.round($('.drop:eq(' + number + ')').position().left))
      })
    }

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
    audio2.addEventListener('ended', function() {
      $(audioEl3).children()[1].play()
      cloneAudio($(audio2)[0])
    })

    var audio3 = $(audioEl3).children()[1]
    audio3.addEventListener('ended', function() {
      $(audioEl4).children()[1].play()
      cloneAudio($(audio3)[0])  
    })

    var audio4 = $(audioEl4).children()[1]
    audio4.addEventListener('ended', function() {
      checkObject = {
        1: $(audioEl).children().attr('src'),
        2: $(audioEl2).children().attr('src'),
        3: $(audioEl3).children().attr('src'),
        4: $(audioEl4).children().attr('src')
      }
      if (JSON.stringify(checkObject) === JSON.stringify(winningObject)) {
        alert('You win!')
      } else {
        alert('You lose!')
      }
      cloneAudio($(audio4)[0])     
    })

    $(audioEl).children()[1].play()
  })

  $('#answer').click(function() {

    var findElem = function(number) {
      return _.find($('.drag-item'), function(elem) {
        var elem = $(elem)
        return $(elem.children()[0]).attr('src') === winningObject[number]
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

  $('#reset').click(function() {
    $('.drag-item').animate({
      'left': $('.drag-item').data('left'),
      'top': $('.drag-item').data('top')
    })
    $('.drop').droppable('option', 'accept', '.drag-item')
  })

  $('.drag-item').data('left', 0).data('top', 0)

})





