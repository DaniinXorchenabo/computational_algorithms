const get_formula = (data) => {
    // console.log(data)
    const loc_func_data = [...data].map(i => i);
    // const d = []
    const f = (x) => [...loc_func_data]
        .map((i, ind) => {
            // d.push([i * (x ** ind), i, x, ind, x**ind]);
            return i * (ind === 0?1:(ind === 1?x:x*x))
        })
        .reduce((last, i) => last + i, 0);
    // console.log(d);
    return f;
};

const get_data_for_graph = data => {
    const func = get_formula(data);
    data = {}
    for (let i = -10; i < 20; i += 0.1) { // выведет 0, затем 1, затем 2
        data[i] = func(i);
    }
    draw_graph([data], "graph_task1");
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