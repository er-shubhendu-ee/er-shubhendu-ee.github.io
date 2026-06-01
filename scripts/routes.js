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
            gridInverter: "grid-inverter.html"
        },
        clients: {
            clientOne: "client-one",
            clientTwo: "client-two",
            clientThree: "client-three",
            clientFour: "client-four",
            clientFive: "client-five",
            clientSix: "client-six"
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
            return withHash(this.page("clientele"), paths.clients[key]);
        },
        paths
    };
}());
