import { use, useEffect, useState } from "react";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [userEditingId, setUserEditingId] = useState(null);
    const [userEdited, setUserEdited] = useState({});

    const fetchUsers = async () => {
        try{
            const response = await fetch("http://localhost:8080/api/users");
            const data = await response.json();
            setUsers(data);
        }catch (error){
            console.error("erreur en recuperant les utilisateur", error);
        }
    };

    const deleteUser = async (id) => {
        try{
            await fetch(`http://localhost:8080/api/users/id/${id}`, {method: "DELETE",});
            setUsers(users.filter(user => user.id !== id));
        }catch(error){
            console.error("erreur en supprimant l'utilisateur", error);
        }
    }

    const startEditing = (user) => {
        setUserEditingId(user.id);
        setUserEdited({...user});
    }

    const saveUser = async () => {
        try{
            await fetch(`http://localhost:8080/api/users/id/${userEditingId}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userEdited)
            });

            setUsers(
                users.map( (u) =>
                    u.id == userEditingId ? userEdited : u
                )
            );

            setUserEditingId(null);
        }catch(error){
            console.error("erreur en modifiant l'utilisateur", error)
        }
    }

    const handleOnChange = (e) => {
        setUserEdited({
            ...userEdited,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>email</th>
                        <th>age</th>  
                        <th>city</th> 
                        <th>action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>

                            <td>{user.id}</td>

                            <td>{userEditingId == user.id ? (
                                <input 
                                    name="firstName"
                                    value={userEdited.firstName}
                                    onChange={handleOnChange}
                                />
                            ) : (
                                user.firstName
                            )}</td>

                            <td>{userEditingId == user.id ? (
                                <input 
                                    name="lastName"
                                    value={userEdited.lastName}
                                    onChange={handleOnChange}
                                />
                            ) : (
                                user.lastName
                            )}</td>

                            <td>{userEditingId == user.id ? (
                                <input 
                                    name="email"
                                    value={userEdited.email}
                                    onChange={handleOnChange}
                                />
                            ) : (
                                user.email
                            )}</td>

                            <td>{userEditingId == user.id ? (
                                <input 
                                    name="age"
                                    value={userEdited.age}
                                    onChange={handleOnChange}
                                />
                            ) : (
                                user.age
                            )}</td>

                            <td>{userEditingId == user.id ? (
                                <input 
                                    name="city"
                                    value={userEdited.city}
                                    onChange={handleOnChange}
                                />
                            ) : (
                                user.city
                            )}</td>
                            <td>
                                {userEditingId == user.id ? (
                                    <>
                                        <button onClick={saveUser}>
                                            Save
                                        </button>
                                        <button onClick={() => setUserEditingId(null)}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditing(user)}>
                                            Update
                                        </button>
                                        <button onClick={() => deleteUser(user.id)}>
                                            supprimer
                                        </button>
                                    </>
                                )}
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;