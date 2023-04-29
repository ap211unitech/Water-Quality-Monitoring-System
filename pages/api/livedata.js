import dbConnect from "../../config/connect";
import { createResponse } from "@/utils/response";
import LiveData from '@/models/LiveData';

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;

    switch (method) {
        case 'POST': {
            try {
                const { sensorId } = req.body;
                const liveCapturedData = await LiveData.find({ sensorId }).sort({ createdAt: -1 }).limit(10);
                const liveData = liveCapturedData.map(d => d.data);
                const datesAtWhichDataCaptured = liveCapturedData.map(d => d.createdAt);
                res.status(200).json(createResponse({ liveData, dates: datesAtWhichDataCaptured }, 200, true));
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
