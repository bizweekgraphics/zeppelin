$(document).ready(function() {
  for(var i=1;i<5;i++) {
    var r = Math.floor(255 * Math.random())
    var g = Math.floor(255 * Math.random())
    var b = Math.floor(255 * Math.random())

    var el = $('<div class="drag-bar"><audio controls><source src="audio/spirit' + i +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile').append(el)

    el.css('background', "rgb(" + r + ',' + g + ',' + b + ')')

    jQuery.data(el[0], 'number', i)

    el.dblclick(function() { 
      this.children[0].play()
    })

    var dropEl = $('<div class="drop">drop</div>')
    $('#drop').append(dropEl)
  }

  $('.drag-bar').draggable({
    stack: '#pile div',
    // revert: true
  })

  for(var i=1;i<5;i++) {
    var r = Math.floor(255 * Math.random())
    var g = Math.floor(255 * Math.random())
    var b = Math.floor(255 * Math.random())

    var el = $('<div class="drag-bar"><audio controls><source src="audio/stairway' + i +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile').append(el)

    el.css('background', "rgb(" + r + ',' + g + ',' + b + ')')

    jQuery.data(el[0], 'number', i)

    el.dblclick(function() { 
      this.children[0].play()
    })

    var dropEl = $('<div class="drop">drop</div>')
    $('#drop').append(dropEl)
  }

  $('.drag-bar').draggable({
    stack: '#pile div',
    // revert: true
  })

  var dropEvent = function(event, ui) {
    console.log('test')
    ui.draggable.position( {of: $(this), my: 'left top', at: 'left top' })
  }

  $('.drop').droppable({
    hoverClass: "drop-hover",
    drop: dropEvent
  })





})

