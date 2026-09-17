const STORE = "smartHostelDemo";

function read() {
  const defaults = {
    complaints: [],
    notices: [],
    accounts: [],
    attendance: []
  };

  return {
    ...defaults,
    ...JSON.parse(localStorage.getItem(STORE) || "{}")
  };
}

function save(data) {
  localStorage.setItem(STORE, JSON.stringify(data));
}

function show(message) {
  const box = document.querySelector("#message");

  if (box) {
    box.textContent = message;
    box.hidden = false;
  }
}

function submitComplaint(event) {
  event.preventDefault();

  const data = read();
  const form = new FormData(event.target);

  data.complaints.unshift({
    name: "Aarav Sharma",
    type: form.get("type"),
    detail: form.get("detail"),
    status: "Pending"
  });

  save(data);
  event.target.reset();
  show("Complaint saved in this browser.");
}

function addNotice(event) {
  event.preventDefault();

  const data = read();
  const form = new FormData(event.target);

  data.notices.unshift({
    title: form.get("title"),
    body: form.get("body"),
    date: new Date().toLocaleDateString()
  });

  save(data);
  event.target.reset();
  show("Announcement saved in this browser.");
}

function renderNotices(target) {
  const element = document.querySelector(target);

  if (!element) return;

  const notices = read().notices;

  element.innerHTML = notices.length
    ? notices.map(notice => `
        <article class="notice">
          <small>${notice.date}</small>
          <h3>${notice.title}</h3>
          <p>${notice.body}</p>
        </article>
      `).join("")
    : "<p>No new announcements have been published.</p>";
}

function login(event) {
  event.preventDefault();

  const role = document.querySelector("[name=role]").value;

  location.href = role === "warden"
    ? "admin/dashboard.html"
    : "student/dashboard.html";
}

function submitAccount(event) {
  event.preventDefault();

  const data = read();
  const form = new FormData(event.target);

  data.accounts.unshift({
    name: form.get("name"),
    email: form.get("email"),
    id: form.get("id"),
    role: "Student"
  });

  save(data);
  event.target.reset();

  show(
    "Demo account created in this browser. " +
    "A real system would securely issue a temporary password."
  );
}

function attendanceList() {
  const data = read();

  if (data.attendance.length) {
    return data.attendance;
  }

  return [
    {
      name: "Aarav Sharma",
      id: "SH2026001",
      parent: "98765 43210",
      status: "Not marked"
    },
    {
      name: "Rohan Verma",
      id: "SH2026002",
      parent: "98765 43211",
      status: "Not marked"
    },
    {
      name: "Priya Nair",
      id: "SH2026003",
      parent: "98765 43212",
      status: "Not marked"
    }
  ];
}

function renderAttendance(target) {
  const element = document.querySelector(target);

  if (!element) return;

  element.innerHTML = attendanceList().map((student, index) => `
    <tr>
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.status}</td>
      <td>
        <button onclick="markAttendance(${index}, 'Present')">Present</button>
        <button onclick="markAttendance(${index}, 'Absent')">Absent</button>
      </td>
      <td>
        ${student.status === "Absent"
          ? `<button onclick="parentAlert(${index})">Prepare alert</button>`
          : "—"}
      </td>
    </tr>
  `).join("");
}

function markAttendance(index, status) {
  const data = read();
  const students = attendanceList();

  students[index].status = status;
  data.attendance = students;

  save(data);
  renderAttendance("#attendanceRows");
}

function parentAlert(index) {
  const student = attendanceList()[index];

  show(
    `Demo alert prepared for parent contact ${student.parent}: ` +
    `${student.name} was marked absent today. ` +
    `No real SMS or WhatsApp message was sent.`
  );
}
