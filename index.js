console.log("index.js");

// var client  = mqtt.connect({ host:'test.mosquitto.org', port: 8081})
// or


// var client  = mqtt.connect({ host:'mqtt.eclipse.org/mqtt', port: 443})
// or
// var client  = mqtt.connect('wss://mqtt.eclipse.org:443/mqtt')

// client.on('connect', function () {
//     console.log('connected')
//   client.subscribe('junrey/messages', function (err) {
//     if (!err) {
//       client.publish('junrey/messages', 'Hello mqtt')
//     }
//   })
// })

var lecture = document.getElementById('topic-input').value;
var message = document.getElementById('payload-input').value;

$(document).ready(function () {
  var add = $('#address').val()
  var client = mqtt.connect(add)
  $('#connect').on('click', function () {
    $('#input').val('Connecting...');
    client.on('connect', function () {
      $('#input').val('Connected Successfully').css('color', 'green');
    })
    client.on('message', function (lecture, message) {
      $('#tableMsg tbody').prepend('<tr><td>' + lecture + '</td><td>' + message + '</td><td>' + d.toUTCString() + '</td></tr>')
    })


    var d = new Date();
    var pubTopic = $('#topic-input');
    var Payload = $('#payload-input');
    var subTopic = $('#subtopic-input');

    $('#pub-button').on('click', function () {
      if (pubTopic.val() != '' && Payload.val() != '') {
        $('#blanks').hide()
        client.publish(pubTopic.val(), Payload.val());
        $('.table1 tbody').prepend('<tr><td>' + pubTopic.val() + '</td><td>' + Payload.val() + '</td><td>' + d.toUTCString() + '</td></tr>')
      } else {
        $('#blanks').show().fadeOut(2000).css('color', 'red')
      }

    })

    $('#sub-button').on('click', function () {
      if (subTopic.val() != '') {
        $('#sub-blank').hide();
        client.subscribe(subTopic.val());
        $('#Table2 tbody').prepend('<tr><td>' + subTopic.val() + '</td><td>' + d.toUTCString() + '</td></tr>')
      } else {
        $('#sub-blank').show().fadeOut(2000).css('color', 'red')
      }

    })
    $('#unsubscribe').on('click',function(){
      client.subscribe('');
    })

  })
  $('#disconnect').on('click', function () {
    $('#input').val('Disconnected').css('color', 'red');
    client = '';
   
  })

})