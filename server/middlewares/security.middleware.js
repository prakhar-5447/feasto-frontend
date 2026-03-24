const helmet = require("helmet");
const cors = require("cors");

exports.securityMiddleware = [

    helmet({
        contentSecurityPolicy: false
    }),
    
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    })

];