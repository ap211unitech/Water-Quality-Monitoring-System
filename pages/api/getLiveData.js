import LiveData from '@/models/LiveData';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST': {
            const data = req.body;
            // console.log('Received sensor data:', data);
            if (data['tds'] && data['tdsId']) {
                const sensorId = data['tdsId'];
                const capturedData = data['tds'];
                const newData = new LiveData({
                    sensorId,
                    data: capturedData
                })
                await newData.save();
            }
            if (data['temp'] && data['tempId']) {
                const sensorId = data['tempId'];
                const capturedData = data['temp'];
                const newData = new LiveData({
                    sensorId,
                    data: capturedData
                })
                await newData.save();
            }
            if (data['ph'] && data['phId']) {
                const sensorId = data['phId'];
                const capturedData = data['ph'];
                const newData = new LiveData({
                    sensorId,
                    data: capturedData
                })
                await newData.save();
            }
        }
        default:
            res.status(400).json({ success: false })
            break
    }
}
