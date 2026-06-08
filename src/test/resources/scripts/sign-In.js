// ALERT
function showAlert(msg, type="error"){
    const alertEl = document.getElementById("customAlert");
    alertEl.textContent = msg;
    alertEl.className = "alert " + type;
    alertEl.style.display = "block";
    setTimeout(()=>{ alertEl.style.display="none"; },6000);
}
// Show / Hide Password
document.querySelectorAll(".toggle-password")
    .forEach(icon => {

        icon.addEventListener("click", () => {

            const input =
                document.getElementById(
                    icon.dataset.target
                );

            if(input.type === "password"){

                input.type = "text";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

            }else{

                input.type = "password";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            }
        });

    });

document.addEventListener("DOMContentLoaded", () => {

    const loginForm =
        document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email =
            document.getElementById("loginEmail")
                .value.trim()
                .toLowerCase();

        const password =
            document.getElementById("loginPassword")
                .value;

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const hashedPassword =
            await hashPassword(password);

        const user = users.find(u =>
            u.email === email &&
            u.password === hashedPassword
        );

        if(!user){
            showAlert(
                "Invalid email or password",
                "error"
            );
            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        showAlert(
            "Login Successful!",
            "success"
        );
            redirectToDashboard(
                user.role
            );

    });

});

async function hashPassword(password){

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    return hashArray
        .map(b =>
            b.toString(16)
            .padStart(2, "0")
        )
        .join("");
}

function redirectToDashboard(role){

    switch(role){

        case "ADMIN":
            window.location.href =
                "dashboard/admin-dashboard.html";
            break;

        case "MANAGER":
            window.location.href =
                "dashboard/manager-dashboard.html";
            break;

        case "STAFF":
            window.location.href =
                "dashboard/staff-dashboard.html";
            break;

        default:
            window.location.href =
                "signIn.html";
    }
}