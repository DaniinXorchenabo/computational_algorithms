let count = 2;
const draw_formula = (event) => {
    const create_P = (input_id) => document.getElementById(input_id).value.toString().split(",")
        .map((i, index) => `${i.replaceAll(' ', '')}x^${index}`)
        .reverse().reduce((last, i) => `${last}+${i}`, "");

    document.getElementById('main_formula').innerText =
        `$$\\frac{${create_P('P1_data')}}{${create_P('P2_data')}}$$`;
    MathJax.typeset();
    count++;
}


const corrected_number = (event) => {
	"use strict"; // для браузеров с поддержкой строгого режима
    const input_id = event.target.id;
	let val = document.getElementById(input_id).value.toString();
	const testing_num = /^(?:\s*[-]?[0-9]+(?:[.][0-9]+)?\s*[,]?\s*)+$/;
	const edit_num = /^(?:\s*[-]?[0-9]+(?:[.][0-9]+)?\s*[,]?\s*)+/;
	if (!testing_num.test(val)){
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
         draw_formula(event);
    }
	// if (input_id === "sin_x" || input_id === "cos_x"){
	// 	val = parseFloat(document.getElementById(input_id).value);
	// 	if (val && (val < -1 || val > 1)) {
	// 		document.getElementById(input_id).value = bad_val;
	// 	}
	// }

}

const correcting_number = (event) => {
	"use strict"; // для браузеров с поддержкой строгого режима

	// var val = document.getElementById(input_id).value.toString();
	// var testing_num = new RegExp("^(?:\s*[-]?[0-9]+(?:[.][0-9]+)\s*,?\s*)?([-]?[0-9]+([.][0-9]*)?|[-]?[0-9]+[.]?|[-]?)$");
	// var edit_num = new RegExp("^([-]?[0-9]{1,}([.][0-9]*)?|[-]?[0-9]{1,}[.]?|[-]?)");
	// if (!testing_num.test(val)){
	// 	if (edit_num.test(val)){
	// 		document.getElementById(input_id).value = edit_num.exec(val)[0];
	// 	} else {
	// 		document.getElementById(input_id).value = "";
	// 	}
	// }
}
