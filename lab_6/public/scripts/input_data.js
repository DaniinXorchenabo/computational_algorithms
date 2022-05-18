
const corrected_number = (event) => {
    "use strict"; // для браузеров с поддержкой строгого режима
    const input_id = event.target.id;
    let val = document.getElementById(input_id).value.toString();
    const testing_num = /^[-]?[0-9]+(?:[.][0-9]+)?$/;
    const edit_num = /^[-]?[0-9]+(?:[.][0-9]+)?/;
    if (!testing_num.test(val)) {
        if (edit_num.test(val)) {
            // document.getElementById(input_id).value = edit_num.exec(val)[0];
            document.getElementById(input_id).classList.add("error")
        } else {
            document.getElementById(input_id).classList.add("error");

        }
        // } else {
        // 	document.getElementById(input_id).value = "";
        // }
    } else {
        document.getElementById(input_id).classList.remove("error");
        // draw_formula(event);
        // draw_formula(event);
    }
    document.getElementById('send_button').disabled = !!get_all_input_items(event).some(i => i.classList.contains("error"));
    // if (input_id === "sin_x" || input_id === "cos_x"){
    // 	val = parseFloat(document.getElementById(input_id).value);
    // 	if (val && (val < -1 || val > 1)) {
    // 		document.getElementById(input_id).value = bad_val;
    // 	}
    // }

}

const correcting_number = (event) => {
    "use strict"; // для браузеров с поддержкой строгого режима
    const input_id = event.target.id;
    let val = document.getElementById(input_id).value.toString();
    const testing_num = /^[0-9]+(?:[.][0-9]+)?$/;
    const edit_num = /^[0-9]+(?:[.][0-9]+)?/;
    if (!testing_num.test(val)) {
        if (edit_num.test(val)) {
            // document.getElementById(input_id).value = edit_num.exec(val)[0];
            document.getElementById(input_id).classList.add("error")
        } else {
            document.getElementById(input_id).classList.add("error");

        }
        // } else {
        // 	document.getElementById(input_id).value = "";
        // }
    } else {
        document.getElementById(input_id).classList.remove("error");
        // draw_formula(event);
        // draw_formula(event);
    }
    document.getElementById('send_button').disabled = !!get_all_input_items(event).some(i => i.classList.contains("error"));
}
