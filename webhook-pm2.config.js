module.exports = {
    apps: [
        {
            name: "webhook-build-frontend",
            script: "node ./webhook.js",
            exec_mode: "fork",
        },
    ],
};