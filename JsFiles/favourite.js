function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function sendOTP() {
    var mobileNumber = document.getElementById("mobile-number").value;
    if (mobileNumber) {
        alert("OTP has been sent to " + mobileNumber);
        // Yaha aap real OTP sending functionality implement kar sakte hain
    } else {
        alert("Please enter a valid mobile number");
    }
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function(event) {
    var modal = document.getElementById("modal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
