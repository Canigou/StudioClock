function update_supervision_info_about_an_azuracast_radio (radio_live_infos,on_air_light_HTML_element,live_light_HTML_element,listener_counter_element) {
    radio_live_infos = JSON.parse(radio_live_infos.data);
    if (radio_live_infos.is_online == true) {
      on_air_light_HTML_element.classList.add('light_on');
      on_air_light_HTML_element.classList.remove('light_off')
    } else {
      on_air_light_HTML_element.classList.add('light_off');
      on_air_light_HTML_element.classList.remove('light_on')
    }

    if (radio_live_infos.live.is_live == true) {
      live_light_HTML_element.classList.add('light_on');
      live_light_HTML_element.classList.remove('light_off')
    } else {
      live_light_HTML_element.classList.add('light_off');
      live_light_HTML_element.classList.remove('light_on')
    }
    listener_counter_element.innerHTML = radio_live_infos.listeners.unique;
}
