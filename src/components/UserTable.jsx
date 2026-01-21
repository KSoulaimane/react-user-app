import { useEffect, useState } from "react";
import { fetchUsers, deleteUser, updateUser, fetchColumnsName } from "../api/UserApi";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [userEditingId, setUserEditingId] = useState(null);
    const [userEdited, setUserEdited] = useState({});
    const [columns, setColumns] = useState([]);
    const [sortField, setSortField] = useState("id");
    const [direction, setDirection] = useState("asc");
    const navigate = useNavigate();

    const loadUsers = async () => {
        try{
            const data = await fetchUsers(sortField, direction);
            setUsers(data);
        }catch(error){
            console.log("Error gettinng data", error)
        }
    }

    const columnName = async () =>{
        try{
            const data = await fetchColumnsName();
            setColumns(data);
        }catch(error){
            console.log("Error gettinng column name data", error)
        }
    }

    const handleDeleteUser = async (id) => {
        try{
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        }catch(error){
            console.error("erreur en supprimant l'utilisateur", error);
        }
    }

    const startEditing = (user) => {
        setUserEditingId(user.id);
        setUserEdited({...user});
    }

    const handleUpdateUser = async () => {
        try{
            const updatedUser = await updateUser(userEditingId, userEdited);
            setUsers(
                users.map( (u) =>
                    u.id == userEditingId ? updatedUser : u
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

    const handleSortField = (e) => {
        setSortField(e.target.value);
    }

    useEffect(() => {
        loadUsers();
        columnName()
    }, [sortField, direction]);

    return (
        <div>
            <h2>Liste des utilisateurs</h2>
            <button onClick={() => navigate("/form")}>Ajouter</button>
            <select defaultValue={columns[0]} onChange={handleSortField}>
                {
                    columns.map( (c, index) => <option key={index} value={c}>{c}</option>)
                }
            </select>
            <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                <option value="ASC">Ascendant</option>
                <option value="DESC">Descendant</option>
            </select>
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
                                        <button onClick={handleUpdateUser}>
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
                                        <button onClick={() => handleDeleteUser(user.id)}>
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