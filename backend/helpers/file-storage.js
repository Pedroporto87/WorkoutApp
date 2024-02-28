const multer = require("multer");
const path = require("path");

// Configuração do armazenamento
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img');
    },
    filename: (req, file, cb) => {
        // Geração de um nome de arquivo único para evitar sobreposições e ataques
        cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);
    }
});

// Filtro de arquivo para validar se é uma imagem
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Não é uma imagem! Por favor, faça upload apenas de imagens.'), false);
    }
};

// Configuração do multer
const upload = multer({
    storage: diskStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 3 // 3MB
    }
});

module.exports = upload;