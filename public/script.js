async function capNhatBang() {
    try {
        const response = await fetch('/api/monhoc');
        const danhSachMon = await response.json();

        const tbody = document.getElementById("bangMonHoc");
        tbody.innerHTML = "";

        danhSachMon.forEach(mon => {
            const row = `
                <tr>
                    <td>${mon.ma}</td>
                    <td>${mon.ten}</td>
                    <td>${mon.diem}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (err) {
        alert("Không thể lấy dữ liệu từ server.");
    }
}

async function themMon() {
    const ma = document.getElementById("maMon").value;
    const ten = document.getElementById("tenMon").value;
    const diem = parseFloat(document.getElementById("diemMon").value);

    if (!ma || !ten || isNaN(diem) || diem < 0 || diem > 10) {
        alert("Vui lòng nhập đúng thông tin");
        return;
    }

    try {
        const res = await fetch('/api/monhoc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ma, ten, diem })
        });

        if (res.ok) {
            document.getElementById("maMon").value = '';
            document.getElementById("tenMon").value = '';
            document.getElementById("diemMon").value = '';
            capNhatBang();
        } else {
            alert("Lỗi khi thêm môn học");
        }
    } catch (err) {
        alert("Không thể gửi dữ liệu đến server.");
    }
}

async function xoaTatCa() {
    try {
        const res = await fetch('/api/monhoc', {
            method: 'DELETE'
        });

        if (res.ok) {
            capNhatBang();
        } else {
            alert("Lỗi khi xoá dữ liệu");
        }
    } catch (err) {
        alert("Không thể xoá dữ liệu.");
    }
}

async function taiFile() {
    try {
        const response = await fetch('/api/monhoc');
        const data = await response.json();

        const text = JSON.stringify(data, null, 2);
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "danh_sach_mon.txt";
        a.click();

        URL.revokeObjectURL(url);
    } catch (err) {
        alert("Không thể tải file.");
    }
}

window.onload = capNhatBang;
