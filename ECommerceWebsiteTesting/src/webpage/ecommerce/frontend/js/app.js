const API = "http://localhost:3000/api";

async function api(path, method="GET", data=null){
    const res = await fetch(API + path, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: data ? JSON.stringify(data) : null
    });

    return res.json().catch(() => ({}));
}
