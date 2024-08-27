import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { imageBase64, filename } = req.body;

      const imageBuffer = Buffer.from(imageBase64, 'base64');
      const filePath = path.join(process.cwd(), 'public', filename);

      fs.writeFileSync(filePath, imageBuffer);

      const formData = new FormData();
      formData.append("size", "auto");
      formData.append("image_file", fs.createReadStream(filePath));

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: { "X-Api-Key": process.env.BG_REMOVE },
        body: formData,
      });

      if (response.ok) {
        const resultBuffer = await response.arrayBuffer();
        const outputFilePath = path.join(process.cwd(), 'public', 'no-bg.png');
        fs.writeFileSync(outputFilePath, Buffer.from(resultBuffer));

        res.status(200).json({ success: true, filePath: '/no-bg.png' });
      } else {
        res.status(response.status).json({ error: response.statusText });
      }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
