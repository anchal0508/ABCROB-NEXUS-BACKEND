const API_LINK = `${CURRENT_HOST}/api/classes`;
const handleFormSignup = async (event) => {
    event.preventDefault();
    console.log('Form signUp...');
    const { name, email, role, pass } = event.target;
    const newUser = {
        name: name.value,
        email: email.value,
        role: role.value,
        pass: pass.value
    }
    try {
        const result = await axios.post(`${API_LINK}/addUser`, newUser);
        console.log("-----------",result);
    } catch (error) {
        console.log(  error.message);
    }
}