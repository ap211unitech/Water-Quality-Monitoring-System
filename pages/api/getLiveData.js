export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'POST': {
            const data = req.body;
            console.log('Received sensor data:', data);
        }
        default:
            res.status(400).json({ success: false })
            break
    }
}
