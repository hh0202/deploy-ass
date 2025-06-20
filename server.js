const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static('public'));

function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, '[]');
    }
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/monhoc', (req, res) => {
    const data = readData();
    res.json(data);
});

app.post('/api/monhoc', (req, res) => {
    const { ma, ten, diem } = req.body;
    if (!ma || !ten || typeof diem !== 'number' || diem < 0 || diem > 10) {
        return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });
    }

    const data = readData();
    data.push({ ma, ten, diem });
    writeData(data);

    res.json({ success: true });
});

app.delete('/api/monhoc', (req, res) => {
    writeData([]);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
