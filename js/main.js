var gameObject = {}

$(document).ready(function() {

  var stairwayArray = [1,2,3,4]
  stairwayArray = _.shuffle(stairwayArray)

  var spiritArray = [1,2,3,4]
  spiritArray = _.shuffle(spiritArray)

  for(var i=1;i<5;i++) {
    var num = stairwayArray.pop()

    var el = $('<div class="drag-item"><img src="img/spirit' + num + '.png"><audio controls><source src="audio/spirit' + num +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile').append(el)

    el.dblclick(function() { 
      this.children[1].play()
    })

    var dropEl = $('<div class="drop">drop</div>')
    $('#drop').append(dropEl)

    jQuery.data(dropEl[0], 'number', i)
  }

  $('.drag-item').draggable({
    stack: '#pile div',
    // revert: true
  })

  for(var i=1;i<5;i++) {
    var num = spiritArray.pop()

    var el = $('<div class="drag-item"><img src="img/stairway' + num + '.png"><audio controls><source src="audio/stairway' + num +'.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>')    
    $('#pile').append(el)

    el.dblclick(function() { 
      this.children[1].play()
    })

  }

  $('.drag-item').draggable({
    stack: '#pile div',
    // revert: true
  })

  var dropEvent = function(event, ui) {
    var number = jQuery.data(this, 'number')
    ui.draggable.position( {of: $(this), my: 'left top', at: 'left top' })
    $(this).droppable('option', 'accept', ui.draggable);
    gameObject[number] = $(ui.draggable)
  }

  $('.drop').droppable({
    hoverClass: "drop-hover",
    drop: dropEvent,
    out: function(event, ui){
        $(this).droppable('option', 'accept', '.drag-item');
    }   
  });


// $('button').click(function() {

// })

// _.find($('.drag-item'), function(item) {
// return item.offsetLeft === 338
// }).children[1].play()

  // $('button').click(function() {
  //   for(var i=1; i<5; i++) {
  //     var audio = gameObject[i].children()[1]
  //     if(i < 4) {
  //       audio.addEventListener('ended', function() {
  //         debugger;
  //         gameObject[i+1].children()[1].play()         
  //       })      
  //     }
  //   }
  // })
  $('button').click(function() {
    var audio = gameObject[1].children()[1]
    audio.addEventListener('ended', function() {
      gameObject[2].children()[1].play()
    })

    var audio2 = gameObject[2].children()[1]
    audio2.addEventListener('ended', function() {
      gameObject[3].children()[1].play()
    })

    var audio3 = gameObject[3].children()[1]
    audio3.addEventListener('ended', function() {
      gameObject[4].children()[1].play()
    })
  })

})







