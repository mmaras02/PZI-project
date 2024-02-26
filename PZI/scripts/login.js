function ValidateLogin() {
    var email = document.getElementById("LoginEmail").value;
    var password = document.getElementById("LoginPassword").value;

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Check password length
    if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return false;
    }
    
    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
        alert("Password must contain at least one digit!");
        return false;
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        alert("Password must contain at least one uppercase letter!");
        return false;
    }

    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        alert("Password must contain at least one lowercase letter!");
        return false;
    }

    // Check if the password contains at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        alert("Password must contain at least one special character!");
        return false;
    }

    // Check email format
    if (!email.match(validRegex)) {
        alert("Invalid email address!");
        return false;
    }

    // All checks passed
    //alert("Valid email address and password!");
    window.location.href = "Home.html";
    return true;
}
