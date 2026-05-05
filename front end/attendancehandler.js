let verifiedStudent = null;

async function findStudent() {
    const pin = document.getElementById("login_id").value.trim();
    const first = document.getElementById("student_firstname").value.trim();
    const last = document.getElementById("student_lastname").value.trim();

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Verify pin + student
    const res = await fetch("http://localhost:3000/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin })
    });

    const data = await res.json();

    if (!data.success) {
        resultDiv.textContent = "Invalid PIN.";
        return;
    }

    // Match name
    const fullName = `${first} ${last}`.toLowerCase();

    if (data.student.StudentName.toLowerCase() !== fullName) {
        resultDiv.textContent = "Invalid Student Name.";
        return;
    }

    verifiedStudent = data.student;

    // Show Info
    const statusText = document.createElement("p");
    statusText.textContent =
        `${verifiedStudent.StudentName} - ${verifiedStudent.AttendanceStatus}`;

    // Make button
    const btn = document.createElement("button");
    btn.textContent =
        verifiedStudent.AttendanceStatus === "Checked In"
            ? "Check Out"
            : "Check In";

    btn.onclick = async () => {
        const res = await fetch("http://localhost:3000/toggle-attendance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                StudentID: verifiedStudent.StudentID,
                AttendanceStatus: verifiedStudent.AttendanceStatus
            })
        });

        const result = await res.json();

        verifiedStudent.AttendanceStatus = result.newStatus;

        findStudent(); // refresh display
    };

    resultDiv.appendChild(statusText);
    resultDiv.appendChild(btn);
}