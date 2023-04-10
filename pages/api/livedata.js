import dbConnect from "../../config/connect";
import { createResponse } from "@/utils/response";

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;

    switch (method) {
        case 'POST': {
            try {
                const { sensorId } = req.body;
                const liveData = [30, 28, 20, 10, 15, 30, 3, 2, 6, 26, 8, 40];
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
