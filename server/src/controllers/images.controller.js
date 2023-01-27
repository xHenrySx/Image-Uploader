const { getImage, insertImage } = require("../database/database.js");


async function getImageById(req, res) {
    const id = req.params.id;
    const image = await getImage(id);
    if (image) {
        const UTFImage = image.toString('utf-8');
        const base64Image = UTFImage.replace(/^data:image\/(png|jpg);base64,/, "");
        const imageFile = Buffer.from(base64Image, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageFile.length
        });
        res.end(imageFile);

    }
    else {
        return res.status(500).json({ error: "Something went wrong" });
    }
}

async function uploadImage(req, res) {
    const image = req.body.image;
    const id = await insertImage(image);
    if (id) {
       return res.status(200).json({ id });
    }
    else {
        return res.status(500).json({ error: "Something went wrong" });
    }
}

// Export the functions

module.exports = {
    getImageById,
    uploadImage
}

