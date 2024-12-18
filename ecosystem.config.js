module.exports = {
    apps: [
        {
            name: "frontend-out",
            script: "serve -l 3000 out",
            exec_mode: "fork",
        },
    ],
};