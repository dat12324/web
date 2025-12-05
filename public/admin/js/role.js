const tablePermission = document.querySelector("[permission-table]");
if (tablePermission) {
  const buttonSubmit = document.querySelector("[button-submit]");
  console.log(buttonSubmit);
  buttonSubmit.addEventListener("click", () => {
    let permissions = [];
    const rows = tablePermission.querySelectorAll("[data-name]");
    console.log(rows);
    rows.forEach((row) => {
      const inputs = row.querySelectorAll("input");
      const name = row.getAttribute("data-name");
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissions.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input,index) => {
          const isChecked = input.checked;
          if (isChecked){
            permissions[index].permissions.push(name)

          }
        })
      }
    });
    console.log(permissions); 
    if(permissions.length >0){
      const formChangePermission = document.querySelector("#form-chage-permission");
      const inputPermissions = formChangePermission.querySelector("input[name='permissions']");
      inputPermissions.value = JSON.stringify(permissions);
      formChangePermission.submit();

    }
  });
}

const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute("data-records"));
  const tableBody = document.querySelector("[permission-table]");
  
  records.forEach((record,index) => {
    const permissions = record.permissions
    permissions.forEach((permission) => {
      const row = tableBody.querySelector(`[data-name='${permission}']`);
      const input = row.querySelectorAll("input")[index];
      input.checked = true;
    })
  })
}