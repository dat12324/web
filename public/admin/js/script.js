const buttonStatus = document.querySelectorAll('[button-status]');
if(buttonStatus.length>0){
    let url = new URL(window.location.href);
    buttonStatus.forEach(button=>{ 
        button.addEventListener('click', ()=>{
            const status = button.getAttribute('button-status');
            console.log(status);
            if(status){
                url.searchParams.set('status',status);
            }
            else{
                url.searchParams.delete('status');
            }
            window.location.href = url.href;

            
    })
})
}

const fromSearch = document.querySelector('#from-search');
if(fromSearch){
    let url = new URL(window.location.href);
 fromSearch.addEventListener('submit', (e)=>{
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if(keyword){
        url.searchParams.set('keyword',keyword);
    }
    else{
        url.searchParams.delete('keyword');
    
    }
    window.location.href = url.href;
})

}

const buttonPagination = document.querySelectorAll('[button-pagination]');
let url = new URL(window.location.href);
buttonPagination.forEach(button=>{
    button.addEventListener('click', ()=>{
        const page = button.getAttribute('button-pagination');
        if(page){
            url.searchParams.set('page',page);
        }
        else{
            url.searchParams.delete('page');
        }
        window.location.href = url.href;
    })
})

const checkAll = document.querySelector('[checkbox-multi]');
if(checkAll){
    const inputCheckAll = checkAll.querySelector('input[name="checkall"]');
    console.log(inputCheckAll);
    const inpuIds = document.querySelectorAll('input[name="id"]');
    console.log(inpuIds);
    inputCheckAll.addEventListener('change', ()=>{
        const isChecked = inputCheckAll.checked;
        inpuIds.forEach(inputId=>{
            inputId.checked = isChecked;
        })
    })
    inpuIds.forEach(inputId=>{
        inputId.addEventListener('change', ()=>{
            const allChecked = Array.from(inpuIds).every(i=>i.checked);
            inputCheckAll.checked = allChecked;
        })
    })
}   

const formChangeMulti = document.querySelector('[form-change-multi]');
if(formChangeMulti){
    formChangeMulti.addEventListener('submit', (e)=>{
    e.preventDefault();
    const checkboxMulti = document.querySelector('[checkbox-multi]');
    const inputIsChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked');
    console.log(inputIsChecked);

    const typeAction = e.target.elements.type.value;
    console.log(typeAction);
    if(typeAction =="delete-all"){
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa các sản phẩm đã chọn không?")
        if(!confirmDelete){
            return
        }
    }
    if(inputIsChecked.length >0){
        ids =[]
        const inputIds = formChangeMulti.querySelector('input[name="ids"]');
        inputIsChecked.forEach(input=>{
            const id = input.value;
            if(typeAction =="change-position"){
                const positionInput = input.closest('tr').querySelector('input[name="position"]');
                if(positionInput) {
                    const position = positionInput.value;
                    console.log(position);
                    ids.push(`${id}-${position}`);
                }
            }
            else{
            ids.push(id);
            }

        })
        inputIds.value = ids.join(',');
        formChangeMulti.submit();
    }
    else{
        alert('Vui lòng chọn mục để thay đổi trạng thái');
        return;
    }
    
})
}

const showAlert = document.querySelector('[show-alert]');
if(showAlert){
    const time = parseInt(showAlert.getAttribute('data-time'));
    setTimeout(()=>{
        showAlert.classList.add('d-none');
    }, time);
}


const uploadImage = document.querySelectorAll('[upload-image]');
if(uploadImage.length>0){
    const uploadImageInput = document.querySelector('[upload-image-input]');
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener('change', (e)=>{
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })

}

const sort = document.querySelector('[sort]');
if(sort){
    const sortSelect = sort.querySelector('[sort-select]');
    const clearButton = sort.querySelector('[sort-clear]');

    sortSelect.addEventListener('change', ()=>{
        const value = sortSelect.value;
        console.log(value);
        let [sortKey, sortValue] = value.split('-');
        console.log(sortKey, sortValue);
        let url = new URL(window.location.href);
        url.searchParams.set('sortKey', sortKey);
        url.searchParams.set('sortValue', sortValue);
        window.location.href = url.href;
    })

    clearButton.addEventListener('click', ()=>{
        let url = new URL(window.location.href);
        url.searchParams.delete('sortKey');
        url.searchParams.delete('sortValue');
        window.location.href = url.href;
    })

    const sortKey = url.searchParams.get('sortKey');
    const sortValue = url.searchParams.get('sortValue');
    if(sortKey && sortValue){
        sortSelect.value = `${sortKey}-${sortValue}`;
        const option = sortSelect.querySelector(`option[value="${sortKey}-${sortValue}"]`);
        option.selected = true;
    }

}