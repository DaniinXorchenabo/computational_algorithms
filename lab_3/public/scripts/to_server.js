const button_handler = (event) => {
    const dataframes = get_all_input_items(event);
    if (dataframes.some(i => i.classList.contains("error"))) {
        alert('Некоторые поля заполнены не корректно');
        return
    } else {
        setTimeout(() => {
            const xhr = new XMLHttpRequest();
            const params_for_p = (name, item) => item.value.replaceAll(',', ' ').split(' ')
                .filter(i => i && i !== "" && i !== " ")
                .map(v => `${name}=${v}`)
                .reduce((last, i) => last + "&" + i,);
            let params = params_for_p('p1', dataframes[0]) + '&' + params_for_p('p2', dataframes[1]);
            params += `&p1_x=${dataframes[2].value}&p2_x=${dataframes[3].value}&sin_arg=${dataframes[4].value}`
            params += `&cos_arg=${dataframes[5].value}&exp_arg=${dataframes[6].value}`
            xhr.open('GET', `${document.location.protocol}//${document.location.host}/calculate?${params}`, true);

            xhr.send();
            xhr.onreadystatechange = () => { // (3)
                if (xhr.readyState !== 4) return;

                // button.innerHTML = 'Готово!';

                if (xhr.status !== 200) {
                    console.log(xhr.status + ': ' + xhr.statusText);
                } else {
                    console.log(xhr.responseText);
                    draw_formula(null, xhr.responseText);

                }

            }
        });
    }
};

[...document.querySelectorAll('.send_to_server')].map(el => el.addEventListener('click.send_to_server', button_handler, {once: false}));


setTimeout(() => {


       const create_table = (table_name, raw_data) =>  `<table id="result_table">
                <caption></caption>
                <thead>
                <tr>
                    
                    ${[...raw_data]
           .map((i, index) => "<th>" + index + "</th>")
           .reduce((i, last) => i + last)}
                    <th>Ответ</th>
                </tr>
                </thead>
                <tbody>
                ${[...raw_data]
           .map((i, index) => "<tr>" + [...i]
               .map(j => "<td>" + j + "</td>")
               .reduce((j, j_last) =>  j + j_last
               ) + "</tr>")
           .reduce((i, last) => i + last )}
                
                </tbody></table>`;


    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${document.location.protocol}//${document.location.host}/calculate?n=${10}&min_=${-10}&max_=${10}`, true);

    xhr.send();
    xhr.onreadystatechange = () => { // (3)
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            console.log(xhr.responseText);
            document.getElementById('matrix_content')
                .innerHTML = [...Object.entries(JSON.parse(xhr.responseText))]
                .map(([key, val], index) => `<div class="array_box">
            <input class="toggle-box" id="identifier-${index}" type="checkbox">
            <label class="iteration_name" for="identifier-${index}">${key}</label>
            <div> ${create_table(key, val)} </div></div>`).reduce((last, i) => last + "\n" + i);
        }
    }
});