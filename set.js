const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0dTcEJWYWtkSm15Nzd5WnJEL1dMRnU3dlpFNCt3cXdCRTcwQm1VYW9FOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicFlZbWZxMEl0SUtVUFJuOHZSYTRyb080U1UvVEFhc09md2U0YUs5ZlV3dz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRitFYmY0Tlo3Y1djRURYamF3QW00aFF3T09rRlhXNndhMHJYR3NvSGtNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrZFJVaUlXTElZRmtNMGNqREkzRDVGZVppQlhLUVNoMm5vZHE3MGtLalhnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1BUXF3TmVqOGdsaVRocm9zMDVYWUtTc0Q2c0V5R04zV2p2dUM3T3doMkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkV3YjIwWjdRdXdjdDRFcVFMQjNQa2RGK3BJOEhQbFcwOEQwNEFWNHZSUWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0FGd2pGUENWQzB5eHZQT3dWaHhQWWhYRGlNYXZzMGtJQXF2RmxDQjBYVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3lrcE4waldJVk54S2p0UFRSd3RQd1o2MjhZZTRqa1YyQWpSdHZKS093Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJKNmpNWEpWYkFqS29BTVZZWE5ibFlUYXNwamFNYWFjb0psUTVyZXVVclkydWpzTmV3QmxDK1dVeE0zU2pSc3pyVHpNZFBHTWRYNjR1eDNmVkkvbWpRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU0LCJhZHZTZWNyZXRLZXkiOiJMYXdWZHVLSWVOeldwcm1LZnlJckJVYWJReUZsbTdWc21vTkF5R2FJSjg4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHRk9VOFJha1RxdVBnTW84SzlzM1NRIiwicGhvbmVJZCI6IjY0ZjNmMTEzLTM1OTEtNGYxNS1iMTQ4LTk1YmYxMGI1MDQwNSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTU3BuSndVOVdhR04wdEdxYStXUTlkYkpXdXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXozaGRlVmNPcEhLcTNSTnBYa2g3Q294M1VZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkQ3RjJZS0ZBIiwibWUiOnsiaWQiOiIyMzMyMDc0MTU0Njk6NDVAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tDUzBlVU5FTFdodGJnR0dCb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjNRS1B6OEFZRkZHUGtWWXVLamJpTC9vd0Y2TzJ3Uy9yY1hIVHZteFZ5ekk9IiwiYWNjb3VudFNpZ25hdHVyZSI6InE2SVA1UUFycXlySDl2K1U5Wm12N0hTSGtZVEdzOXliR2Rhb080RlpkWC9TMWlFMy9vc094K3BqbWZrbUVZaUIvZG5La1JKemlXWXpza2p6NGZZN0FBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJWZnBOSTYxdCswajBOYmhMVmN5Q1poYk54SG43eHNWQ09BVHp1REhYY2JkeFkraDFjTUFJVWl2ZEhpVjRLdTd6RWp0WGFkQjhpL0FWcHFmSVc1UWVpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzIwNzQxNTQ2OTo0NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkMENqOC9BR0JSUmo1RldMaW8yNGkvNk1CZWp0c0V2NjNGeDA3NXNWY3N5In19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjg5MjU4OTAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTGsrIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
