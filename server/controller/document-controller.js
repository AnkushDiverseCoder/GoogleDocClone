import Document from "../schema/documentSchema.js";

export const getDocument = async (id) => {
    if (id == null) {
        return res.status(400).json({ message: 'No document id found' });
    }
    const document = await Document.findById(id);
    if (document) return document;

    return await Document.create({ _id: id, data: '' });
}

export const saveDocument = async (id, data) => {
    return await Document.findByIdAndUpdate(id, { data })
}