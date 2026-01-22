const BASE_URL = "http://localhost:8080/api/users";

export const fetchUsers = async (search, sortField, direction) => {
    const url = `${BASE_URL}?search=${search}&sortField=${sortField}&direction=${direction}`;
    console.log("FETCH URL =>", url);  
    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Erreur lors du chargement des utilisateurs");
    }
    return response.json();
};

export const fetchColumnsName = async () => {
    const response = await fetch(`${BASE_URL}/columns`);
    if(!response.ok){
        throw new Error("Erreur lors du chargement des colonnes");
    }
    return response.json();
}

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

export const createUser = async (user) => {
    const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if(!response.ok){
        throw new Error("Erreur de creation de user")
    }

    return response.json();
}