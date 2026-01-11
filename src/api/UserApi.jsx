const BASE_URL = "http://localhost:8080/api/users";

export const fetchUsers = async () => {
    const response = await fetch(BASE_URL);
    if(!response.ok){
        throw new Error("Erreur lors du chargement des utilisateurs");
    }
    return response.json();
};

export const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {method: "DELETE",});
    if(!response.ok){
        throw new Error("Erreur lors de la suppression de l'utilisateur");
    }

    return true;
}

export const updateUser = async (id, user) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(user)
    });

    if(!response.ok){
        throw new Error("Erreur lors de la modification de l'utilisateur");
    }

    return response.json();

}