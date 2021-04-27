function display_a_vu_meter (audio_player,myMeterElement) {
  var audioCtx = new window.AudioContext();
  var sourceNode = audioCtx.createMediaElementSource(audio_player);
  sourceNode.connect(audioCtx.destination);
  var meterNode = webAudioPeakMeter.createMeterNode(sourceNode, audioCtx);
  webAudioPeakMeter.createMeter(myMeterElement, meterNode, {});
  myMeterElement.addEventListener('mousedown', function(){
    audioCtx.resume();
    audio_player.play();
  })
  window.addEventListener('keydown', function() {
    audioCtx.resume();
    audio_player.play();
  });
}
