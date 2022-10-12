const express = require('express');
const router = express.Router();
const { uploadMiddleware } = require('../utils/storage.handler');
const StorageService = require('../service/storage.service');
const service = new StorageService();

const PUBLIC_URL = 'http://localhost:3000';
router.post('/', uploadMiddleware.single('file'), async (req, res) => {
  try {
    let { body, file } = req;
    body = {
      ...body,
      filename: file.filename,
      path: file.path,
      name: file.originalname,
    };
    const data = await service.createDB(body);
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
      data: data,
    };
    res.send({
      success: true,
      message: `Archivo creado ${file['filename']}`,
      data: fileData,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = router;
