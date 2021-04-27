function load_an_audio_stream_hidden_player (audio_player_container_element,stream_URL) {

  var audio_player = document.createElement("audio");
  audio_player.setAttribute("crossorigin","anonymous");
  audio_player.id = "audio_player";
  audio_player.preload = "metadata";

  var audio_source = document.createElement("source");
  audio_source.src = stream_URL;
  audio_source.id = "audio-source";
  audio_source.type = "audio/mpeg";

  audio_player.appendChild(audio_source);
  audio_player_container_element.appendChild(audio_player);
}
