$(document).ready(function() {

  var stairwayArray = [1,2,3,4]
  stairwayArray = _.shuffle(stairwayArray)

  var spiritArray = [1,2,3,4]
  spiritArray = _.shuffle(spiritArray)

  for(var i=1;i<5;i++) {
    var num = stairwayArray.pop()

    var r = Math.floor(255 * Math.random())
    var g = Math.floor(255 * Math.random())
    var b = Math.floor(255 * Math.random())

    var el = $('<div class="drag-item"><img src="img/spirit' + num + '.png"><audio controls><source src="audio/spirit' + num +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile').append(el)

    el.css('background', "rgb(" + r + ',' + g + ',' + b + ')')

    el.dblclick(function() { 
      this.children[1].play()
    })

    var dropEl = $('<div class="drop">drop</div>')
    $('#drop').append(dropEl)
  }

  $('.drag-item').draggable({
    stack: '#pile div',
    // revert: true
  })

  for(var i=1;i<5;i++) {
    var num = spiritArray.pop()


    var r = Math.floor(255 * Math.random())
    var g = Math.floor(255 * Math.random())
    var b = Math.floor(255 * Math.random())

    var el = $('<div class="drag-item"><img src="img/stairway' + num + '.png"><audio controls><source src="audio/stairway' + num +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile').append(el)

    el.css('background', "rgb(" + r + ',' + g + ',' + b + ')')

    el.dblclick(function() { 
      this.children[1].play()
    })

  }

  $('.drag-item').draggable({
    stack: '#pile div',
    // revert: true
  })

  var dropEvent = function(event, ui) {
    console.log('test')
    ui.draggable.position( {of: $(this), my: 'left top', at: 'left top' })
    $(this).droppable('option', 'accept', ui.draggable);
  }

  $('.drop').droppable({
    hoverClass: "drop-hover",
    drop: dropEvent,
    out: function(event, ui){
        $(this).droppable('option', 'accept', '.drag-item');
    }   
  });





})

