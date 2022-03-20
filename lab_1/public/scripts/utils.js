const get_all_input_items = (event) => {
    const p1 = document.getElementById('P1_data');
    const p2 = document.getElementById('P2_data');
    const p1_arg = document.getElementById('P1_arg');
    const p2_arg = document.getElementById('P1_arg');

    const sin_ = document.getElementById('sin_data');
    const cos_ = document.getElementById('cos_data');
    const exp = document.getElementById('exp_data');

    return [p1, p2, p1_arg, p2_arg, sin_, cos_, exp];
};
