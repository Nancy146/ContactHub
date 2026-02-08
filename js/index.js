var fullName = document.getElementById("name");
var phoneNumber = document.getElementById("phoneNumber");
var Email = document.getElementById("Email");
var Address = document.getElementById("Address");
var group = document.getElementById("group");
var notes = document.getElementById("notes");
var searchInput = document.getElementById("search");
var imageInput = document.getElementById("inputFile");
var AddBtn = document.getElementById("AddBtn")
var UpdateBtn = document.getElementById("UpdateBtn")

var contactList = []

if (localStorage.getItem('contactContainer') !== null) {
    contactList = JSON.parse(localStorage.getItem('contactContainer'))
    display();
    updateFavoriteCount();
    updateFavoritesBox();

    updateEmergencyCount();
    updateEmergencyBox();

    updatetotal();
}


function getInitials(name) {
    var words = name.trim().split(" ");
    var initials = "";

    for (var i = 0; i < words.length && i < 2; i++) {
        if (words[i].length > 0) {
            initials += words[i][0].toUpperCase();
        }
    }

    return initials;
}


function saveContact() {
    if (validationName() && validationNumber() && validationEmail()) {
        var contacts = {
            name: fullName.value,
            phone: phoneNumber.value,
            Gmail: Email.value,
            location: Address.value,
            groups: group.value,
            Descripe: notes.value,
            image: imageInput.files[0] ? `Images/${imageInput.files[0].name}` : getInitials(fullName.value),
            isFavorite: false,
            isEmergency: false
        };

        contactList.push(contacts);
        localStorage.setItem('contactContainer', JSON.stringify(contactList));
        clearForm();
        display();
        updatetotal();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Added!",
            text: "Contact Added Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        closeForm();
    }

    else if (validationName() == false) {
        Swal.fire({
            icon: "error",
            title: "Invalid Name",
            text: "Please enter your name with the required instructions!",
        });
    }
    else if (validationNumber() == false) {
        Swal.fire({
            icon: "error",
            title: "Invalid Phone Number",
            text: "Please enter your phone number with the required instructions!",
        });
    }
    else if (validationEmail() == false) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Please enter your Email with the required instructions!",
        });
    }
}

function clearForm() {
    fullName.value = null
    phoneNumber.value = null
    Email.value = null
    Address.value = null
    group.value = null
    notes.value = null

    fullName.classList.remove('is-valid', 'is-invalid');
    phoneNumber.classList.remove('is-valid', 'is-invalid');
    Email.classList.remove('is-valid', 'is-invalid');

}

var groupStyles = {
    Family: { bg: "#DBEAFE", color: "#1D4ED8" },
    Friends: { bg: "#D1FAE5", color: "#047857" },
    Work: { bg: "#EDE9FE", color: "#6D28D9" },
    School: { bg: "#FEF3C7", color: "#B45309" }
};
function OptionsInput(contact) {
    var content = "";

    if (contact.groups && groupStyles[contact.groups]) {
        content += `
        <div class="d-flex align-items-center"
             style="padding:4px 8px;
                    font-size:11px;
                    font-weight:500;
                    border-radius:6px;
                    background:${groupStyles[contact.groups].bg};
                    color:${groupStyles[contact.groups].color};">
            ${contact.groups}
        </div>`;
    }

    if (contact.isEmergency) {
        content += `
        <div class="d-flex align-items-center text-danger"
             style="padding:4px 8px;
                    font-size:11px;
                    font-weight:500;
                    border-radius:6px;
                    background:#FFE4E6;">
            <i class="fa-solid fa-heart-pulse me-1"></i> Emergency
        </div>`;
    }

    if (content === "") return "";

    return `
    <div class="d-flex justify-content-start gap-2 align-items-center mt-2">
        ${content}
    </div>`;

    // ${OptionsInput(contactList[i])} //lma b3mlha call kda gwa el display msh msh btsht8l
}


function display() {
    var content = ""

    if (contactList.length == 0) {
        document.getElementById("noContacts").style.display = "block";
        document.getElementById("rowContacts").innerHTML = "";
        return;
    } else {
        document.getElementById("noContacts").style.display = "none";
    }

    for (var i = 0; i < contactList.length; i++) {
        content += `<div class="col-md-6">
                                <div class="big-box shadow">
                                    <div style="border-bottom:2px solid #F3F4F6; padding: 16px;">
                                        <div class="d-flex justify-content-start gap-2 align-items-center mb-3">
                                            <div class="d-flex align-items-center justify-content-center text-white fw-Semibold"
                                                style="width:55px; height:55px; background: linear-gradient(135deg, #00AFE0 0%, #007FF3 100%); font-size: 18px; border-radius: 10px;">
                                                ${contactList[i].image}</div>
                                            <div>
                                                <h4 class="m-0" style="font-size: 16px; font-weight: 600;">${contactList[i].name}
                                                </h4>
                                                <div class="d-flex align-items-center justify-content-start gap-2"
                                                    style="margin-top: 4px;">
                                                    <div class="d-flex align-items-center justify-content-center"
                                                        style="background-color: #DBEAFE; color: #155DFC; width:25px; height: 25px; border-radius: 5px;">
                                                        <i class="fa-solid fa-phone" style="font-size: 10px;"></i>
                                                    </div>
                                                    <p class="small text-secondary m-0">${contactList[i].phone}</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div>
                                            <div class="d-flex justify-content-start gap-2 align-items-center mb-2">
                                                <div class="d-flex align-items-center justify-content-center"
                                                    style="width:30px; height:30px; background-color: #EDE9FE; border-radius: 5px;">
                                                    <i class="fa-solid fa-envelope"
                                                        style="color:#7F22FE; font-size: 12px;"></i>
                                                </div>
                                                <p class="small text-secondary m-0">${contactList[i].Gmail}</p>
                                            </div>
                                            <div class="d-flex justify-content-start gap-2 align-items-center mb-2">
                                                <div class="d-flex align-items-center justify-content-center"
                                                    style="width:30px; height:30px; background-color: #D0FAE5; border-radius: 5px;">
                                                    <i class="fa-solid fa-location-dot"
                                                        style="color:#009966; font-size: 12px;"></i>
                                                </div>
                                                <p class="small text-secondary m-0">${contactList[i].location}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex justify-content-start gap-2 align-items-center mt-3"
                                            style="background-color: #FFF1F2; border-radius: 5px; width:fit-content;">
                                            <div class="text-danger" style="padding:4px 8px; font-size: 11px; font-weight: 500;">
                                                ${contactList[i].groups}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center"
                                        style="padding:10px 16px;">
                                        <div class="d-flex align-items-center justify-content-start gap-2">
                                            <a href="tel:${contactList[i].phone}" class="text-decoration-none">
                                                <div class="d-flex align-items-center justify-content-center phone-hover"
                                                    style="width:35px; height:35px; background-color: #ECFDF5; border-radius: 5px;">
                                                    <i class="fa-solid fa-phone" style="color:#009966;"></i>
                                                </div>
                                            </a> 
                                            
                                            <a href="mailto:${contactList[i].Gmail}" class="text-decoration-none">    
                                                <div class="d-flex align-items-center justify-content-center email-hover"
                                                    style="width:35px; height:35px; background-color: #F5F3FF; border-radius: 5px;">
                                                    <i class="fa-solid fa-envelope" style="color:#7F22FE;"></i>
                                                </div>  
                                            </a>    
                                        </div>
                                        


                                        <div class="d-flex align-items-center justify-content-end gap-2">
                                            <button onclick="FavoriteBtn(${i})" class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: transparent; border:0;"><i
                                                    class="${contactList[i].isFavorite ? 'fa-solid fa-star text-warning' : 'fa-regular fa-star text-secondary'} star-hover"></i></button>

                                            <button onclick="EmergencyBtn(${i})" class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: transparent; border:0;"><i
                                                    class="${contactList[i].isEmergency ? 'fa-solid fa-heart-pulse text-danger' : 'fa-regular fa-heart text-secondary'} heart-hover"></i></button>

                                            <button onclick="updateContact(${i}); openForm()" class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: transparent; border:0;"><i
                                                    class="fa-solid fa-pen text-secondary pen-hover"></i></button>

                                            <button onclick="deleteContact(${i})" class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: transparent; border:0;"><i
                                                    class="fa-solid fa-trash text-secondary trash-hover"></i></button>


                                        </div>

                                    </div>
                                </div>


                            </div>`
    }

    document.getElementById('rowContacts').innerHTML = content
}

function deleteContact(i) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-secondary"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${contactList[i].name}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {
            contactList.splice(i, 1);
            localStorage.setItem('contactContainer', JSON.stringify(contactList));
            display();
            updatetotal();

            swalWithBootstrapButtons.fire(
                "Deleted!",
                "Contact has been deleted.",
                "success"
            );
        } 
        else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelled",
                "Contact is safe",
                "info"
            );
        }

    });
}


function searchContact() {
    var term = searchInput.value.toLowerCase();

    var content = ""

    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].name.toLowerCase().includes(term) || contactList[i].Gmail.toLowerCase().includes(term) || contactList[i].phone.toLowerCase().includes(term)) {
            content += `<div class="col-md-6">
                                <div class="big-box shadow">
                                    <div style="border-bottom:2px solid #F3F4F6; padding: 16px;">
                                        <div class="d-flex justify-content-start gap-2 align-items-center mb-3">
                                            <div class="d-flex align-items-center justify-content-center text-white fw-Semibold"
                                                style="width:55px; height:55px; background: linear-gradient(135deg, #00AFE0 0%, #007FF3 100%); font-size: 18px; border-radius: 10px;">
                                                ${contactList[i].image}</div>
                                            <div>
                                                <h4 class="m-0" style="font-size: 16px; font-weight: 600;">${contactList[i].name}
                                                </h4>
                                                <div class="d-flex align-items-center justify-content-start gap-2"
                                                    style="margin-top: 4px;">
                                                    <div class="d-flex align-items-center justify-content-center"
                                                        style="background-color: #DBEAFE; color: #155DFC; width:25px; height: 25px; border-radius: 5px;">
                                                        <i class="fa-solid fa-phone" style="font-size: 10px;"></i>
                                                    </div>
                                                    <p class="small text-secondary m-0">${contactList[i].phone}</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div>
                                            <div class="d-flex justify-content-start gap-2 align-items-center mb-2">
                                                <div class="d-flex align-items-center justify-content-center"
                                                    style="width:30px; height:30px; background-color: #EDE9FE; border-radius: 5px;">
                                                    <i class="fa-solid fa-envelope"
                                                        style="color:#7F22FE; font-size: 12px;"></i>
                                                </div>
                                                <p class="small text-secondary m-0">${contactList[i].Gmail}</p>
                                            </div>
                                            <div class="d-flex justify-content-start gap-2 align-items-center mb-2">
                                                <div class="d-flex align-items-center justify-content-center"
                                                    style="width:30px; height:30px; background-color: #D0FAE5; border-radius: 5px;">
                                                    <i class="fa-solid fa-location-dot"
                                                        style="color:#009966; font-size: 12px;"></i>
                                                </div>
                                                <p class="small text-secondary m-0">${contactList[i].location}</p>
                                            </div>
                                        </div>

                                        <div class="d-flex justify-content-start gap-2 align-items-center mt-3"
                                            style="background-color: #FFF1F2; border-radius: 5px; width:fit-content;">
                                            <div class="text-danger"
                                                style="padding:4px 8px; font-size: 11px; font-weight: 500;"><i
                                                    class="fa-solid fa-heart-pulse" style="font-size: 12px;"></i>
                                                ${contactList[i].groups}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-between align-items-center"
                                        style="padding:10px 16px;">
                                        <div class="d-flex align-items-center justify-content-start gap-2">
                                            <div class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: #D0FAE5; border-radius: 5px;">
                                                <i class="fa-solid fa-phone" style="color:#009966;"></i>
                                            </div>
                                            <div class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: #EDE9FE; border-radius: 5px;">
                                                <i class="fa-solid fa-envelope" style="color:#7F22FE;"></i>
                                            </div>
                                        </div>


                                        <div class="d-flex align-items-center justify-content-end gap-2">
                                            <button class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: transparent; border:0;"><i
                                                    class="fa-regular fa-star text-secondary"></i></button>
                                            <button class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: transparent; border:0;"><i
                                                    class="fa-regular fa-heart text-secondary"></i></button>

                                            <button class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: transparent; border:0;"><i
                                                    class="fa-solid fa-pen text-secondary"></i></button>

                                            <button onclick="deleteContact(${i})" class="d-flex align-items-center justify-content-center"
                                                style="width:35px; height:35px; background-color: transparent; border:0;"><i
                                                    class="fa-solid fa-trash text-secondary"></i></button>


                                        </div>

                                    </div>
                                </div>


                            </div>`
        }
    }

    document.getElementById('rowContacts').innerHTML = content



}

var index = 0;
function updateContact(i) {
    index = i;
    fullName.value = contactList[i].name;
    phoneNumber.value = contactList[i].phone;
    Email.value = contactList[i].Gmail;
    Address.value = contactList[i].location;
    group.value = contactList[i].groups;
    notes.value = contactList[i].Descripe;

    AddBtn.classList.add('d-none')
    UpdateBtn.classList.remove('d-none')

}

function resetContact() {
    if (validationNumber() && validationName()) {
        var contacts = {
            name: fullName.value,
            phone: phoneNumber.value,
            Gmail: Email.value,
            location: Address.value,
            groups: group.value,
            Descripe: notes.value,
            image: imageInput.files[0] ? `Images/${imageInput.files[0].name}` : getInitials(fullName.value),
            isFavorite: contactList[index].isFavorite,
            isEmergency: contactList[index].isEmergency
        };

        contactList.splice(index, 1, contacts)
        localStorage.setItem('contactContainer', JSON.stringify(contactList))
        clearForm()
        display()

        AddBtn.classList.remove('d-none')
        UpdateBtn.classList.add('d-none')

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Updated!",
            text: "Contact Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        closeForm();
    }


}

var formSection = document.getElementById("formSection");

function openForm() {
    formSection.classList.remove("d-none");
}

function closeForm() {
    formSection.classList.add("d-none");
}


function updatetotal() {
    var count = 0;

    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i] != 0) {
            count++;
        }
    }
    document.getElementById("total").innerHTML = count;
}


function FavoriteBtn(i) {
    contactList[i].isFavorite = !contactList[i].isFavorite;

    localStorage.setItem('contactContainer', JSON.stringify(contactList));

    updateFavoriteCount();
    updateFavoritesBox();
    display();
}

function updateFavoriteCount() {
    var count = 0;
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].isFavorite == true) {
            count++;
        }
    }
    document.getElementById("favCount").innerHTML = count;

}
function updateFavoritesBox() {
    var box = document.getElementById("favoritesBox");
    var content = "";
    var hasFav = false;

    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].isFavorite == true) {
            hasFav = true;
            content += `
            
    <div class="first-left-box d-flex justify-content-between align-items-center mb-2"
        style="padding:10px; border-radius: 10px; background: #F9FAFB;">
        <div class="d-flex justify-content-start gap-2 align-items-center">
            <div class="d-flex align-items-center justify-content-center text-white fw-Semibold"
                style="width:40px; height:40px; background: linear-gradient(135deg, #00AFE0 0%, #007FF3 100%); font-size: 14px; font-weight: 600; border-radius: 10px;">
                ${contactList[i].image}</div>
            <div>
                <h6 class="m-0" style="font-size: 14px; font-weight: 500;">${contactList[i].name}
                </h6>
                <div>
                    <p class="text-secondary m-0" style="font-size: 12px; font-weight: 400;">${contactList[i].phone}</p>
                </div>
            </div>

        </div>

        <a href="tel:${contactList[i].phone}" class="text-decoration-none">
            <div class="call d-flex align-items-center justify-content-center"
                style="width: 30px; height: 30px; background-color: #D0FAE5; color: #009966; border-radius: 5px;">
                <i class="fa-solid fa-phone" style="font-size: 12px;"></i>
            </div>
        </a>


    </div>

            `
        }
    }

    box.innerHTML = hasFav ? content : `<p class="text-center text-secondary small"  style="padding: 32px 0px;">No favorites yet</p>`;


}



function EmergencyBtn(i) {
    contactList[i].isEmergency = !contactList[i].isEmergency;

    localStorage.setItem('contactContainer', JSON.stringify(contactList));

    updateEmergencyCount();
    updateEmergencyBox();
    display();
}

function updateEmergencyCount() {
    var count = 0;
    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].isEmergency == true) {
            count++;
        }
    }
    document.getElementById("EmergencyCount").innerHTML = count;

}
function updateEmergencyBox() {
    var box = document.getElementById("EmergencyBox");
    var content = "";
    hasEmergency = false;

    for (var i = 0; i < contactList.length; i++) {
        if (contactList[i].isEmergency == true) {
            hasEmergency = true;
            content += `
    <div class="second-left-box d-flex justify-content-between align-items-center mb-2"
        style="padding:10px; border-radius: 10px; background: #F9FAFB;">
        <div class="d-flex justify-content-start gap-2 align-items-center">
            <div class="d-flex align-items-center justify-content-center text-white fw-Semibold"
                style="width:40px; height:40px; background: linear-gradient(135deg, #00AFE0 0%, #007FF3 100%); font-size: 14px; font-weight: 600; border-radius: 10px;">
                ${contactList[i].image}</div>
            <div>
                <h6 class="m-0" style="font-size: 14px; font-weight: 500;">${contactList[i].name}
                </h6>
                <div>
                    <p class="text-secondary m-0" style="font-size: 12px; font-weight: 400;">${contactList[i].phone}</p>
                </div>
            </div>

        </div>

        <a href="tel:${contactList[i].phone}" class="text-decoration-none">
            <div class="call-red d-flex align-items-center justify-content-center"
                style="width: 30px; height: 30px; background-color: #FFE4E6; color: #EE0845; border-radius: 5px;">
                <i class="fa-solid fa-phone" style="font-size: 12px;"></i>
            </div>
        </a>


    </div>
            `
        }
    }

    box.innerHTML = hasEmergency ? content : `<p class="text-center text-secondary small" style="padding: 32px 0px;">No emergency contacts</p>`

}



function validationName() {
    var text = fullName.value;
    var regex = /^[A-Za-z ]{2,50}$/;
    var msgName = document.getElementById('msg')

    if (regex.test(text) == true) {
        fullName.classList.add('is-valid')
        fullName.classList.remove('is-invalid')
        msgName.classList.add('d-none')
        return true;
    }
    else {
        fullName.classList.add('is-invalid')
        fullName.classList.remove('is-valid')
        msgName.classList.remove('d-none')
        return false;
    }

}

function validationNumber() {
    var text = phoneNumber.value;
    var regex = /^(010|012|015)\d{8}$/
    var msgg = document.getElementById('msgphone')

    if (regex.test(text) == true) {
        phoneNumber.classList.add('is-valid')
        phoneNumber.classList.remove('is-invalid')
        msgg.classList.add('d-none')
        return true;
    }
    else {
        phoneNumber.classList.add('is-invalid')
        phoneNumber.classList.remove('is-valid')
        msgg.classList.remove('d-none')
        return false;
    }

}

function validationEmail() {
    var text = Email.value;
    var regex = /^[^\s@]+@gmail\.com$/i
    var msg = document.getElementById('msgEmail')

    if (regex.test(text) == true) {
        Email.classList.add('is-valid')
        Email.classList.remove('is-invalid')
        msg.classList.add('d-none')
        return true;
    }
    else {
        Email.classList.add('is-invalid')
        Email.classList.remove('is-valid')
        msg.classList.remove('d-none')
        return false;
    }

}


console.log(3 > 2 > 1)