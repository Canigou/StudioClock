var interrupt_second_trigger = false;

window.onload = function() {
  var parameters = JSON.parse(document.getElementById('parameters').innerHTML);
  var date = new Date (Date.now());
  var canvas = document.getElementById('clock_canvas')
  var first_call = true;
  var window_ratio = window.innerWidth / window.innerHeight

  if (parameters.activate_supervision_tools == true) {
    if (window_ratio <= 4/3) {
      if (window.innerHeight >= window.innerWidth) {
        canvas.height = window.innerWidth * 0.8;
        canvas.width = window.innerWidth * 0.8;
      } else {
        canvas.height = window.innerHeight * 0.8;
        canvas.width = window.innerHeight * 0.8;
      }
    } else {
      canvas.height = window.innerHeight;
      canvas.width = window.innerHeight;
    }
  } else {
    if (window.innerHeight >= window.innerWidth) {
      canvas.height = window.innerWidth;
      canvas.width = window.innerWidth;
    } else {
      canvas.height = window.innerHeight;
      canvas.width = window.innerHeight;
    }
  }

  var second_trigger = new Trigger (
    true,
    function(){
      date = new Date (Date.now());
      first_call = display_a_clock(canvas,date,first_call);
    }
  )
  var trigger_objects = [second_trigger];
  trigger_every_second (trigger_objects);

  if (parameters.activate_supervision_tools == true) {

    var suppervision_tools_element = document.getElementById('suppervision_tools');
    suppervision_tools_element.style = "display: block;"
    var audio_player_container_element = document.getElementById('audio_player_container');
    load_an_audio_stream_hidden_player (audio_player_container_element,parameters.stream_URL);
    var audio_player_element = document.getElementById('audio_player');
    var peak_meter_element = document.getElementById('peak-meter');
    display_a_vu_meter (audio_player_element,peak_meter_element)
    var radio_live_API_event_source = new EventSource(parameters.live_API_URL);
    on_air_light_HTML_element = document.getElementById('on_air_light');
    live_light_HTML_element = document.getElementById('live_light');
    listener_counter_element = document.getElementById('listener_counter');
    error_container_element = document.getElementById('error_container');
    radio_live_API_event_source.onerror = function (error) {display_error (error, error_container_element)};
    radio_live_API_event_source.onmessage = function (radio_live_infos) {update_supervision_info_about_an_azuracast_radio (radio_live_infos,on_air_light_HTML_element,live_light_HTML_element,listener_counter_element)};

  }

};
