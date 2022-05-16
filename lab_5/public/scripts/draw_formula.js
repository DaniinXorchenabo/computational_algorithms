const draw_formula = ( data) => {
    const create_P = [...data]
        .map((i, index) => `${i}x^${index}`)
        .reverse().reduce((last, i) => `${last}+${i}`, "");

    document.getElementById('Lagrangian_formula').innerText =
        `$$${create_P}$$`;

    MathJax.typeset();
}
