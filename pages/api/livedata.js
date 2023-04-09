import dbConnect from "../../config/connect";
import { createResponse } from "@/utils/response";

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;

    switch (method) {
        case 'POST': {
            try {
                const { sensorId } = req.body;
                const liveData = [15, 2, 3, 4, 5, 4, 3, 2, 6, 7, 8, 9];
                res.status(200).json(createResponse(liveData, 200, true));
            }
            catch (error) {
                res.status(400).json(createResponse(error.message, 400, false));
            }
            break
        }
        default:
            res.status(400).json({ success: false })
            break
    }
}
