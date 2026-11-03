document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");

    if (form) {

        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            let name = document.getElementById("name").value.trim();
            let regno = document.getElementById("regno").value.trim();
            let department = document.getElementById("department").value;
            let year = document.getElementById("year").value;
            let eventName = document.getElementById("event").value;
            let phone = document.getElementById("phone").value.trim();
            let email = document.getElementById("email").value.trim();

            if (
                name === "" ||
                regno === "" ||
                department === "" ||
                year === "" ||
                eventName === "" ||
                phone === "" ||
                email === ""
            ) {
                alert("Please fill all the fields.");
                return;
            }

            let phonePattern = /^[0-9]{10}$/;

            if (!phonePattern.test(phone)) {
                alert("Phone number must contain exactly 10 digits.");
                return;
            }

            let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Enter a valid email address.");
                return;
            }

            const data = {
                name: name,
                regno: regno,
                department: department,
                year: year,
                event: eventName,
                phone: phone,
                email: email
            };

            try {

                const response = await fetch("https://college-event-management-cnov.onrender.com/register", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)

                });

                const result = await response.json();

                if (result.success) {

                    alert("Registration Successful!");

                    window.location.href = "thankyou.html";

                } else {

                    alert("Registration Failed!");

                }

            } catch (error) {

                console.log(error);
                alert("Server Error!");

            }

        });

    }

});
