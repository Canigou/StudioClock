function Trigger (
  active_trigger = true,
  function_to_trigger = function(){}
) {
  this.active_trigger = active_trigger;
  this.function_to_trigger_at_every_interval = function () {
    function_to_trigger();
  }
}
