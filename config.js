
module.exports = {

        // Package
        libpath: __dirname + '/../lib',
        cmdpath: __dirname + '/../lib/commands',
        liftTimeout: 5000, // 5 seconds
        hookTimeout: 120000, // 2mins

        // Base
        cmd_shcut: '[!?]',

        msbf: {
                enabled: true,
                local_alias: "Aster",
                api_port: 3978,
                api_endpoint: "/api/messages",
                api_key_file: '/etc/letsencrypt/live/aster-dev.poeticlabs.com/privkey.pem',
                api_cert_file: '/etc/letsencrypt/live/aster-dev.poeticlabs.com/cert.pem',
                app_id: "22541317-fa60-4729-ba9f-cfb078461567",
                app_password: '_Y1vV-ZI}vX9n_/@',
                crossover_prefix: "[Skype] ",
                message_delimiter: " : ",
                color: "blue"
        }

};
