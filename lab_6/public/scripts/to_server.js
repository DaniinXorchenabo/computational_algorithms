const get_all_input_items = (event) => {
    const esp = document.getElementById('input_eps');

    return [esp];
};

const button_handler = (event) => {
    const dataframes = get_all_input_items(event);
    if (dataframes.some(i => i.classList.contains("error"))) {
        alert('Некоторые поля заполнены не корректно');
        return
    } else {
        setTimeout(
            () => {
                const input_eps = document.getElementById('input_eps').value;

                const xhr = new XMLHttpRequest();
                xhr.open('GET', `${document.location.protocol}//${document.location.host}/calculate?eps=${input_eps}`, true);

                xhr.send();
                xhr.onreadystatechange = () => { // (3)
                    if (xhr.readyState !== 4) return;
                    if (xhr.status !== 200) {
                        console.log(xhr.status + ': ' + xhr.statusText);
                    } else {
                        console.log(xhr.responseText);
                        const data = JSON.parse(xhr.responseText);
                        console.log(data);
                        document.getElementById("task1_result").innerText = data["rectangle"]["sum"];
                        document.getElementById("task2_result").innerText = data["trapezoid"]["sum"];
                        document.getElementById("task3_result").innerText = data["simson"]["sum"];
                        draw_table(data["rectangle"]["history"], "task1_table");
                        draw_table(data["trapezoid"]["history"], "task2_table");
                        draw_table(data["simson"]["history"], "task3_table");
                    }
                }
            }
        );
    }
};


[...document.querySelectorAll('button')].map(
    el => el.addEventListener('click', button_handler, {once: false}));
