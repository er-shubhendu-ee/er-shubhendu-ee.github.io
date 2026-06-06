(function () {
    const paths = {
        projectPagesDir: "project-pages",
        pages: {
            home: "index.html",
            about: "who-am-i.html",
            work: "what-do-i-do.html",
            clientele: "clientele.html",
            contact: "where-am-i.html"
        },
        projects: {
            usbCdcUvc: "usb-cdc-uvc.html",
            bleStreaming: "ble-streaming.html",
            gridInverter: "grid-inverter.html",
            modbusRs485: "modbus-rs485.html"

        },
        clients: {
            trafitek: {
                id: "trafitek",
                name: "Trafitek Solutions Pvt. Ltd.",
                logo: "res/trafitek.png"
            },
            liveline: {
                id: "liveline",
                name: "Liveline Electronics",
                logo: "res/liveline.png"
            },
            adben: {
                id: "adben",
                name: "Adben Industries Pvt. Ltd.",
                logo: "res/adben.jpg"
            },
            abe: {
                id: "abe",
                name: "A. B. Engineers",
                logo: "res/abe.png"
            },
            rnr: {
                id: "rnr",
                name: "RNR Industries",
                logo: "res/rnr.png"
            },
            electroserv: {
                id: "electroserv",
                name: "Electroserv Engineering",
                logo: "res/electroserv.png"
            }
        }
    };

    const isProjectPage = window.location.pathname.replace(/\\/g, "/").includes(`/${paths.projectPagesDir}/`);
    const rootPrefix = isProjectPage ? "../" : "";
    const fromRoot = path => `${rootPrefix}${path}`;
    const withHash = (path, id) => `${path}#${id}`;
    const fileStem = filename => filename.replace(/\.html$/i, "");

    window.ROUTES = {
        page(key) {
            return fromRoot(paths.pages[key]);
        },
        project(key) {
            return fromRoot(`${paths.projectPagesDir}/${paths.projects[key]}`);
        },
        workSection(key) {
            return withHash(this.page("work"), fileStem(paths.projects[key]));
        },
        client(key) {
            return withHash(this.page("clientele"), paths.clients[key].id);
        },
        clients() {
            return Object.entries(paths.clients).map(([key, client]) => ({
                key,
                ...client,
                logo: client.logo ? fromRoot(client.logo) : ""
            }));
        },
        paths
    };
}());
