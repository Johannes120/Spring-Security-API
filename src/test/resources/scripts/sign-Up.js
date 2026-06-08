// ALERT
function showAlert(msg, type="error"){

    const alertEl =
        document.getElementById("customAlert");

    alertEl.textContent = msg;

    alertEl.className = "alert " + type;

    console.log(alertEl.className);

    alertEl.style.display = "block";

    setTimeout(()=>{
        alertEl.style.display="none";
    },12000);
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
    
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Password Match Validation
    if(password !== confirmPassword){
        showAlert("Passwords do not match.","error");
        return;
    }

    // Password Length
    if(password.length < 8){
        showAlert("Password must be at least 8 characters.","error");
        return;
    }

    let role = "";

    // Admin Validation
    if(department === "Admin"){

        if(!email.endsWith(".adm@sentenium.com")){
            showAlert(
                "Invalid Admin Account.","error"
            );
            return;
        }

        role = "ADMIN";
    }

    // Manager Validation
    else if(department === "Management"){

        if(!email.endsWith(".mng@sentenium.com")){
           showAlert(
             "Invalid Management Account."
            ,"error");
            return;
        }

        role = "MANAGER";
    }

    // Staff Validation
    else if(department === "Staff/Borrower"){

        role = "STAFF";
    }

    // Check Existing User
    const existingUsers =
        JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = existingUsers.find(
        user => user.email === email
    );

    if(emailExists){
        showAlert("Account already exists.","error");
        return;
    }

    // Hash Password
    const hashedPassword = await hashPassword(password);

    const user = {

        id: Date.now(),

        fullName,

        department,

        email,

        password: hashedPassword,

        role,

        createdAt: new Date().toISOString()
    };

    existingUsers.push(user);

    localStorage.setItem(
    "users",
    JSON.stringify(existingUsers)
    );

    // Save active session
     localStorage.setItem(
        "currentUser",
        JSON.stringify({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role
        })
    );
    
    showAlert(
    "Registration Successful!",
    "success"
);

    signupForm.reset();

    setTimeout(() => {
    window.location.href = "signIn.html";
    }, 6000);

    });

//Password hash code
async function hashPassword(password){

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer =
        await crypto.subtle.digest("SHA-256", data);

    const hashArray =
        Array.from(new Uint8Array(hashBuffer));

    const hashHex =
        hashArray
            .map(b => b.toString(16).padStart(2, "0"))
            .join("");

    return hashHex;
}
