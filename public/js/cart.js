const inputQuantity = document.querySelectorAll('input[name="quantity"]');
if (inputQuantity.length > 0) {
    inputQuantity.forEach((input) => {
        input.addEventListener('change', () => {
            const itemId = input.getAttribute('item_id');
            const newQuantity = parseInt(input.value);
            window.location.href = `/cart/update/${itemId}/${newQuantity}`;
        });
    });

}