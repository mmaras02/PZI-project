function ValidateLogin() {
    var email = document.getElementById("LoginEmail").value;
    var password = document.getElementById("LoginPassword").value;

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return false;
    }
    
    if (!/\d/.test(password)) {
        alert("Password must contain at least one digit!");
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        alert("Password must contain at least one uppercase letter!");
        return false;
    }

    if (!/[a-z]/.test(password)) {
        alert("Password must contain at least one lowercase letter!");
        return false;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        alert("Password must contain at least one special character!");
        return false;
    }

    if (!email.match(validRegex)) {
        alert("Invalid email address!");
        return false;
    }
    window.location.href = "Home.html";
    return true;
}
