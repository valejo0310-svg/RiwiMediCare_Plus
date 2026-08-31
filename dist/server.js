"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { app } = require('./app');
const dotenv = require('dotenv');
dotenv.config();
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map