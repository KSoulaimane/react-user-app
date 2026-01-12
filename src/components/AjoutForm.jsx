import { createUser } from "../api/UserApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const AjoutForm = () => {

    const [userForm, setUserForm] = useState({});
    const [emailError, setEmailError] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(emailError){
            alert("Email invalide!");
            return;
        }
        try{
            await createUser(userForm);
            navigate("/");
        }catch(error){
            console.log("erreur en creation de l'utilisateur", error);
        }
    }
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === "email"){
            const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
            if(!emailRegex.test(value)){
                setEmailError("Email invalide");
            }else{
                setEmailError("");
            }
        }
        setUserForm({
            ...userForm,
            [name]: value
        });
    };
    
    return (
        <>
            <h2>Ajouter formulaire</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">FirstName: </label>
                <input type="text" name="firstName" placeholder="firstName" onChange={handleChange}/><br />
                <label htmlFor="">LastName: </label>
                <input type="text" name="lastName" placeholder="lastName" onChange={handleChange}/><br />
                <label htmlFor=""> Email: </label>
                <input type="text" name="email" placeholder="email" onChange={handleChange}/>
                {emailError && <p style={{ color: "red" }}> {emailError}</p>}
                <br />
                <label htmlFor="">Age: </label>
                <input type="text" name="age" placeholder="age" onChange={handleChange}/><br />
                <label htmlFor="">City: </label>
                <input type="text" name="city" placeholder="city" onChange={handleChange}/><br />
                <button type="submit">
                    submit
                </button>
                <button type="reset">
                    reset
                </button>
            </form>
        </>
    );
}

export default AjoutForm;