const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus.length>0){
    const formChange = document.querySelector("#form-change-status")
    const path = formChange.getAttribute("data-path")
    buttonChangeStatus.forEach(button =>{
        button.addEventListener('click',()=>{
            const status = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            const statusChange = status =="active" ? "inactive" : "active"

            const action = path+ `/${statusChange}/${id}?_method=PATCH`

            formChange.action=action
            formChange.submit()
        })
    })
}


const buttonDelete = document.querySelectorAll("[button-delete]")
if(buttonDelete.length>0){
    const formDelete = document.querySelector("#form-delete")
    const path = formDelete.getAttribute("data-path")
    buttonDelete.forEach(button =>{
        button.addEventListener('click',()=>{
            const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")
            if(confirmDelete){
                const id = button.getAttribute("data-id")
                const action = path+ `/${id}?_method=DELETE`
                formDelete.action=action
                formDelete.submit()
            }
        })
    })
}
