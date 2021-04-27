function trigger_every_second (trigger_objects) {

  // var interval = setInterval(function(a) {
  //
  //   if (interrupt_second_trigger == true) {
  //     clearInterval(interval);
  //   } else {
  //     console.log ("Miliseconds :"+Date.now());
  //     for (trigger_object of trigger_objects) {
  //       if (trigger_object.active_trigger == true) {
  //         trigger_object.function_to_trigger_at_every_interval()
  //       }
  //     }
  //   }
  //
  // }, 1000);

  date = new Date (Date.now());
  var timeout = 1000 - date.getMilliseconds()

  var interval = setTimeout(function run() {
    if (interrupt_second_trigger == false) {
      for (trigger_object of trigger_objects) {
        if (trigger_object.active_trigger == true) {
          trigger_object.function_to_trigger_at_every_interval()
        }
      }
      date = new Date (Date.now());
      var new_timeout = 1000 - date.getMilliseconds()
      setTimeout(run, new_timeout);
    }

}, timeout);
}
