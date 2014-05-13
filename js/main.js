var audioObject = {}

var imageObject = {}

var winningObject = {
  1: "img/stairway1.png",
  2: "img/stairway2.png",
  3: "img/stairway3.png",
  4: "img/stairway4.png"
}

$(document).ready(function() {
  var stairwayArray = [1,2,3,4]
  stairwayArray = _.shuffle(stairwayArray)

  var spiritArray = [1,2,3,4]
  spiritArray = _.shuffle(spiritArray)

  for(var i=1;i<5;i++) {
    var num = stairwayArray.pop()

    var el = $('<div class="drag-item"><img src="img/spirit' + num + '.png"><audio controls><source src="audio/spirit' + num +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
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
    var num = spiritArray.pop()

    var el = $('<div class="drag-item"><img src="img/stairway' + num + '.png"><audio controls><source src="audio/stairway' + num +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
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

    var audioEl = _.find($('.drag-item'), function(elem) {
      var elem = $(elem)
      var margin = parseInt(elem.css('margin'))
      var top = elem.position().top + margin
      var left = elem.position().left + margin
      return (top === $('.drop:eq(0)').position().top && left === $('.drop:eq(0)').position().left)
    })


    var audioEl2 = _.find($('.drag-item'), function(elem) {
      var elem = $(elem)
      var margin = parseInt(elem.css('margin'))
      var top = elem.position().top + margin
      var left = elem.position().left + 15.5
      return (top === $('.drop:eq(1)').position().top && left === $('.drop:eq(1)').position().left)
    })

    var audioEl3 = _.find($('.drag-item'), function(elem) {
      var elem = $(elem)
      var margin = parseInt(elem.css('margin'))
      var top = elem.position().top + margin
      var left = elem.position().left + margin
      return (top === $('.drop:eq(2)').position().top && left === $('.drop:eq(2)').position().left)
    })

    var audioEl4 = _.find($('.drag-item'), function(elem) {
      var elem = $(elem)
      var margin = parseInt(elem.css('margin'))
      var top = elem.position().top + margin
      var left = elem.position().left + 15.5
      return (top === $('.drop:eq(3)').position().top && left === $('.drop:eq(3)').position().left)
    })


    var audio = $(audioEl).children()[1]
    audio.addEventListener('ended', function() {
      $(audioEl2).children()[1].play()
      audio.removeEventListener('click', listener, false);
    })

    var audio2 = $(audioEl2).children()[1]
    audio2.addEventListener('ended', function() {
      $(audioEl3).children()[1].play()
    })

    var audio3 = $(audioEl3).children()[1]
    audio3.addEventListener('ended', function() {
      $(audioEl4).children()[1].play()
    })

    audio.play()


    // var audio = audioObject[1].children()[1]
    // audio.addEventListener('ended', function() {
    //   audioObject[2].children()[1].play()
    // })

    // var audio2 = audioObject[2].children()[1]
    // audio2.addEventListener('ended', function() {
    //   audioObject[3].children()[1].play()
    // })

    // var audio3 = audioObject[3].children()[1]
    // audio3.addEventListener('ended', function() {
    //   audioObject[4].children()[1].play()
    // })

    // var audio4 = audioObject[4].children()[1]
    // audio4.addEventListener('ended', function() {
    //   if (JSON.stringify(imageObject) ===JSON.stringify(winningObject)) {
    //     $('body').append('<span>YOU WIN</span>')
    //   } else {
    //     $('body').append('<span>YOU LOSE</span>')
    //   }
    // })
  })

  $('#answer').click(function() {
    var first = _.find($('.drag-item'), function(elem) {
      var elem = $(elem)
      return $(elem.children()[0]).attr('src') === winningObject[1]
    })
    var second = _.find($('.drag-item'), function(elem) {
      var elem = $(elem)
      return $(elem.children()[0]).attr('src') === winningObject[2]
    })
    var third = _.find($('.drag-item'), function(elem) {
      var elem = $(elem)
      return $(elem.children()[0]).attr('src') === winningObject[3]
    })
    var fourth = _.find($('.drag-item'), function(elem) {
      var elem = $(elem)
      return $(elem.children()[0]).attr('src') === winningObject[4]
    })

    $(first).position( {
      of: $('.drop:eq(0)'), 
      my: 'left top', 
      at: 'left top', 
      using: function(css, calc) {
        $(first).animate(css, 200, 'linear')
      } 
    })

    $(second).position( {
      of: $('.drop:eq(1)'), 
      my: 'left top', 
      at: 'left top', 
      using: function(css, calc) {
        $(second).animate(css, 200, 'linear')
      } 
    })

    $(third).position( {
      of: $('.drop:eq(2)'), 
      my: 'left top', 
      at: 'left top', 
      using: function(css, calc) {
        $(third).animate(css, 200, 'linear')
      } 
    })

    $(fourth).position( {
      of: $('.drop:eq(3)'), 
      my: 'left top', 
      at: 'left top', 
      using: function(css, calc) {
        $(fourth).animate(css, 200, 'linear')
      } 
    })
  })

  $('.drop').data('left', $('.drop').position().left).data('top', $('.drop').position().top)

  $('#reset').click(function() {
    $('.drag-item').animate({
      'left': $('.drag-item').data('left'),
      'top': $('.drag-item').data('top')
    })
  })

  $('.drag-item').data('left', 0).data('top', 0)

})





