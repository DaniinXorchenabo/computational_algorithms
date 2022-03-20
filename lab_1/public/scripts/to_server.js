const button_handler = (event) => {
    const dataframes = get_all_input_items(event);
    if (dataframes.some(i => i.classList.contains("error"))){
        alert('Некоторые поля заполнены не корректно');
        return
    } else {
        setTimeout(() => {
            const xhr = new XMLHttpRequest();
            const params_for_p = (name, item) => item.value.replaceAll(',', ' ').split(' ')
                .filter(i=> i && i !== "" && i !== " ")
                .map(v=> `${name}=${v}`)
                .reduce((last, i) => last + "&" + i, );
            let params = params_for_p('p1', dataframes[0]) + '&' + params_for_p('p2', dataframes[1]);
            params += `&p1_x=${dataframes[2].value}&p2_x=${dataframes[3].value}&sin_arg=${dataframes[4].value}`
            params += `&cos_arg=${dataframes[5].value}&exp_arg=${dataframes[6].value}`
            xhr.open(
                'GET',
                `${document.location.protocol}//${document.location.host}/calculate?${params}`,
                true);

            xhr.send();
            xhr.onreadystatechange = () => { // (3)
                if (xhr.readyState !== 4) return;

                // button.innerHTML = 'Готово!';

                if (xhr.status !== 200) {
                    console.log(xhr.status + ': ' + xhr.statusText);
                } else {
                    console.log(xhr.responseText);
                }

            }
        });
    }
};

[...document.querySelectorAll('button')].map(
    el => el.addEventListener('click', button_handler, {once: false}));