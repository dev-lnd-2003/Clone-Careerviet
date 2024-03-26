    var token = localStorage.getItem("token");
async function loadInforCompany(){
    var urlAccount = 'http://localhost:8080/api/company/partner/my-company';
    const res = await fetch(urlAccount, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    });
    var obj = await res.json();
    document.getElementById("idcom").value= obj.company.id
    document.getElementById("name").value= obj.company.name
    document.getElementById("diachi").value= obj.company.address
    document.getElementById("sdt").value= obj.company.phone
    document.getElementById("hoatdong").value= obj.company.typeOfActivity
    document.getElementById("website").value= obj.company.website
    document.getElementById("imgpreview").src= obj.company.image
    linkImage= obj.company.image
    tinyMCE.get('editor').setContent(obj.company.description)
}
var linkImage = ''

async function capNhatThongTin() {
    document.getElementById("loading").style.display = 'block'
    const filePath = document.getElementById('imagebanner')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/public/upload-file';
    const res = await fetch(urlUpload, { 
             method: 'POST', 
              headers: new Headers({
             }),
             body: formData
           });
    if(res.status < 300){
        linkImage = await res.text();
    }

    var url = 'http://localhost:8080/api/company/partner/update';
    var id = document.getElementById("idcom").value
    var name = document.getElementById("name").value
    var diachi = document.getElementById("diachi").value
    var sdt = document.getElementById("sdt").value
    var hoatdong = document.getElementById("hoatdong").value
    var website = document.getElementById("website").value
    var description = tinyMCE.get('editor').getContent()

    var company = {
        "id":id,
        "name":name,
        "address":diachi,
        "phone":sdt,
        "typeOfActivity":hoatdong,
        "website":website,
        "image":linkImage,
        "description":description,
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(company)
    });
    if (response.status < 300) {
        swal({
            title: "Thông báo", 
            text: "cập nhật thông tin thành công!", 
            type: "success"
          },
        function(){ 
            window.location.reload();
        });
    }
    else {
        swal({
            title: "Thông báo", 
            text: "cập nhật thông tin thất bại", 
            type: "error"
          },
        function(){ document.getElementById("loading").style.display = 'none' });
    }
    document.getElementById("loading").style.display = 'none'
}