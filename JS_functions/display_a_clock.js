function display_a_clock(canvas,date,first_call = false) {
      if (canvas.getContext) {
        var canvas_context = canvas.getContext("2d");
        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hours = date.getHours();
        var clock_diameter = canvas.width / 2 - canvas.width / 10;
        var clock_center_x = canvas.width / 2;
        var clock_center_y = canvas.height / 2;
        var second_marker_diameter = clock_diameter / 50;
        var numbers_size = clock_diameter / 2.5;

        function draw_clock_face(clock_diameter) {
          var clock_face_diameter = clock_diameter + (clock_diameter / 10);
          var seconds = 0
          while (seconds < 60) {
            draw_second_marker(seconds,clock_face_diameter);
            seconds = seconds + 5;
          }
        }

        function draw_second_marker(seconds,clock_diameter = (canvas.width / 2 - canvas.width / 10)) {
          var second_current_possition_x = Math.cos((seconds / 30) * Math.PI - Math.PI/2) * clock_diameter + clock_center_x;
          var second_current_possition_y = Math.sin((seconds / 30) * Math.PI - Math.PI/2) * clock_diameter + clock_center_y;
          canvas_context.beginPath();
          canvas_context.arc(second_current_possition_x, second_current_possition_y, second_marker_diameter, 0, 2 * Math.PI, false);
          canvas_context.fillStyle = 'red';
          canvas_context.fill();
        }

        canvas_context.fillStyle = 'rgb(200, 0, 0)';



        if (seconds == 0) { //This clears the second makers every new minute
          canvas_context.clearRect(0, 0, canvas.height,canvas.width);
          draw_clock_face(clock_diameter)
          draw_second_marker(seconds)
        } else { //This displays a new second marker
          if (first_call) {
            draw_clock_face(clock_diameter)
          }
          seconds_to_draw = seconds;
          while (seconds_to_draw >= 0) {
            draw_second_marker(seconds_to_draw);
            seconds_to_draw = seconds_to_draw - 1;
          }
        }

        canvas_context.font = numbers_size+'px Noto Sans';
        var two_letters_seconds = String(seconds).padStart(2, '0');
        var two_letters_minutes = String(minutes).padStart(2, '0')
        var hours_text = hours+":"+two_letters_minutes+":"+two_letters_seconds;
        var hours_text_dimensions = canvas_context.measureText(hours_text);
        var hours_text_width = hours_text_dimensions.width;
        var text_position_x = clock_center_x - hours_text_width / 2;
        var text_position_y = clock_center_y;
        canvas_context.clearRect(text_position_x, (text_position_y - (numbers_size / 1.9)),  hours_text_width, numbers_size);
        canvas_context.textBaseline = "middle";
        canvas_context.fillText(hours_text, text_position_x, text_position_y);
      }
      first_call = false;
      return first_call;
    }
