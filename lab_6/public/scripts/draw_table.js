const draw_table = (data, table_id) => {
    document.getElementById(table_id).innerHTML = `
                <caption>История нахождения значения</caption>
                <thead>
                <tr>
                    <th>dx</th>
                    <th>Sum</th>
                </tr>
                </thead>
                <tbody>
                ${[...Object.entries(data)].reduce(
                    (str, [key, val]) =>
                        str + "<tr><td>" + key + "</td><td>" + val + "</td></tr>\n", "")}
                </tbody>`;
}