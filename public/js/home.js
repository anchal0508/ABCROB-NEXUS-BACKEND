const API_LINK = "http://localhost:3000/api/classes";



const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Form Login...');
    const { email, pass } = event.target;

     const loginData = {
        email: email.value,
        pass: pass.value
    };
     
    try {
        const result = await axios.post(`${API_LINK}/loginuser`, loginData);
        if(result.status === 200 && result.data.success)
            window.location.href = "/classes";
    } catch (error) {
        console.log('User not Found with this email:', error.message);
    }
}