const clienteleGrid = document.getElementById("clienteleGrid");

if (clienteleGrid && window.ROUTES) {
    window.ROUTES.clients().forEach(client => {
        const card = document.createElement("a");
        const logo = document.createElement("span");
        const name = document.createElement("span");

        card.id = client.id;
        card.className = "clientele-card";
        card.href = window.ROUTES.client(client.key);
        logo.className = "clientele-logo";
        name.className = "clientele-name";
        name.textContent = client.name;

        if (client.logo) {
            const logoImage = document.createElement("img");

            logoImage.src = client.logo;
            logoImage.alt = "";
            logoImage.loading = "lazy";
            logo.appendChild(logoImage);
        } else {
            logo.textContent = client.name.slice(0, 2).toUpperCase();
        }

        card.append(logo, name);
        clienteleGrid.appendChild(card);
    });
}
