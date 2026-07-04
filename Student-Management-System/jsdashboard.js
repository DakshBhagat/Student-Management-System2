// ===============================
// Smart Student Management System
// dashboard.js
// ===============================

// ---------- Authentication ----------
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// ---------- Logout ----------
const logoutBtn = document.getElementById("logout");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("loggedIn");
            window.location.href = "index.html";

        }

    });
}

// ---------- Dark Mode ----------
const themeBtn = document.getElementById("themeBtn");

let theme = localStorage.getItem("theme");

if (theme === "dark") {

    document.body.classList.add("dark");
    themeBtn.innerHTML = "☀";

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = "☀";

    } else {

        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = "🌙";

    }

});

// ---------- Default Data ----------

let students =
JSON.parse(localStorage.getItem("students")) || [

{
id:101,
name:"Daksh",
course:"B.Tech AI",
semester:2,
attendance:96,
marks:88
},

{
id:102,
name:"John",
course:"BCA",
semester:4,
attendance:82,
marks:71
},

{
id:103,
name:"Emma",
course:"BBA",
semester:6,
attendance:91,
marks:93
},

{
id:104,
name:"Alex",
course:"B.Tech CSE",
semester:3,
attendance:78,
marks:81
}

];

localStorage.setItem("students", JSON.stringify(students));

// ---------- Dashboard Cards ----------

const totalStudent = document.getElementById("students");
const present = document.getElementById("present");

const total = students.length;

const presentCount =
students.filter(student => student.attendance >= 75).length;

animateCounter(totalStudent, total);
animateCounter(present, presentCount);

// ---------- Counter Animation ----------

function animateCounter(element, target){

let count = 0;

const speed = Math.max(10, Math.floor(1000 / target));

const counter = setInterval(()=>{

count++;

element.innerHTML = count;

if(count >= target){

clearInterval(counter);

}

},speed);

}

// ---------- Student Table ----------

const table = document.getElementById("studentTable");

table.innerHTML="";

students.forEach(student=>{

table.innerHTML +=

`

<tr>

<td>${student.id}</td>

<td>${student.name}</td>

<td>${student.course}</td>

<td>${student.semester}</td>

</tr>

`;

});

// ---------- Attendance Pie Chart ----------

const pieCtx = document.getElementById("pieChart");

new Chart(pieCtx,{

type:"pie",

data:{

labels:[
"Present",
"Absent"
],

datasets:[{

data:[
presentCount,
total-presentCount
],

backgroundColor:[
"#10b981",
"#ef4444"
]

}]

},

options:{

responsive:true,

plugins:{

legend:{
position:"bottom"
}

}

}

});

// ---------- Marks Bar Chart ----------

const barCtx = document.getElementById("barChart");

new Chart(barCtx,{

type:"bar",

data:{

labels:
students.map(student=>student.name),

datasets:[{

label:"Marks",

data:
students.map(student=>student.marks),

backgroundColor:"#2563eb"

}]

},

options:{

responsive:true,

scales:{

y:{

beginAtZero:true,

max:100

}

}

}

});

// ---------- Dashboard Stats ----------

const avgMarks = students.reduce((sum, student)=>{

return sum + student.marks;

},0) / total;

const avgAttendance = students.reduce((sum, student)=>{

return sum + student.attendance;

},0) / total;

console.log("Average Marks:",avgMarks.toFixed(1));

console.log("Average Attendance:",avgAttendance.toFixed(1));

// ---------- Greeting ----------

const hour = new Date().getHours();

let greeting = "";

if(hour<12){

greeting="Good Morning";

}

else if(hour<17){

greeting="Good Afternoon";

}

else{

greeting="Good Evening";

}

console.log(greeting);

// ---------- Auto Refresh ----------

setInterval(()=>{

console.log("Dashboard Updated");

},30000);

// ---------- Search Helper ----------

function searchStudent(keyword){

return students.filter(student=>

student.name.toLowerCase().includes(keyword.toLowerCase())

);

}

// ---------- Export Functions ----------

function exportStudents(){

console.log(students);

}

// ---------- Future Modules ----------

// students.html

// attendance.html

// marks.html

// reports.html

// certificate.html

// settings.html