const express = require('/usr/local/lib/node_modules/express');
// const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 9000;
// const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// if (!WEBHOOK_SECRET) {
//     console.error('WEBHOOK_SECRET environment variable is required');
//     process.exit(1);
// }

app.use(express.json());

// 驗證 webhook 請求的中間件
const validateWebhook = (req, res, next) => {
    return next();
    // const signature = req.headers['x-webhook-signature'];

    // if (!signature) {
    //     return res.status(401).json({ error: 'No signature provided' });
    // }

    // const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    // const digest = hmac.update(JSON.stringify(req.body)).digest('hex');

    // if (signature !== digest) {
    //     return res.status(401).json({ error: 'Invalid signature' });
    // }

    // next();
};

// Webhook endpoint
app.post('/rebuild', validateWebhook, async (req, res) => {
    console.log('Received rebuild request:', new Date().toISOString());

    try {
        // 執行重建命令
        exec('docker-compose up frontend --build -d', {
            shell: true
        }, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing rebuild:', error);
                return res.status(500).json({ error: 'Rebuild failed', details: error.message });
            }

            console.log('Rebuild output:', stdout);
            if (stderr) {
                console.warn('Rebuild warnings:', stderr);
            }

            res.json({
                success: true,
                message: 'Rebuild triggered successfully',
                timestamp: new Date().toISOString()
            });
        });
    } catch (error) {
        console.error('Error in rebuild process:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy' });
});

app.listen(PORT, () => {
    console.log(`Webhook service listening on port ${PORT}`);
}); 