const form = document.getElementById('form');
const nameF = document.getElementById('name');
const emailF = document.getElementById('email');
const passwordF = document.getElementById('password');


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameF.value;
    const email = emailF.value;
    const password = passwordF.value;

    try {
        await axios.post('http://localhost:5000/api/users/register', {
            name, email, password
        })
        nameF.value = "";
        emailF.value = "";
        passwordF.value = "";

        swal("Good job!", "You succesfully signed up! Please check you spam if you cant find email.", "success");
    } catch (err) {
        swal("Oops!", "Something went wrong. Please try again!", "error");
    }
})