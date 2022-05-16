const get_formula = (data) => {
    console.log(data)
    const f = (x) => [...data]
        .map((i, ind) => i * x ** ind)
        .reduce((last, i) => last + i, 0);
    return f;
};

const get_data_for_graph = data => {
    const func = get_formula(data);
    data = {}
    for (let i = -10; i < 20; i += 0.1) { // выведет 0, затем 1, затем 2
        data[i] = func(i);
    }
    draw_graph(data);
};


const draw_table = (data) => {
    document.getElementById("result_table").innerHTML = `
                <caption>Уплотнённая таблица</caption>
                <thead>
                <tr>
                    <th>x</th>
                    <th>y</th>
                </tr>
                </thead>
                <tbody>
                ${[...Object.entries(data)].reduce(
                    (str, [key, val]) =>
                        str + "<tr><td>" + key + "</td><td>" + val + "</td></tr>\n", "")}
                </tbody>`;
}