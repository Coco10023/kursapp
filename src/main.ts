import './style.css'
import { setupCounter } from './counter.ts'

interface CourseInfo {
  code: string; 
  name: string; 
  progression: "A" | "B" |"C";
  syllabus: string; 
}

const courseForm = document.getElementById("courseForm") as HTMLFormElement; 
const codeInput = document.getElementById("code") as HTMLInputElement; 
const nameInput = document.getElementById("name") as HTMLInputElement; 
const progressionInput = document.getElementById("progression") as HTMLSelectElement;
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement; 
const courseList = document.getElementById("courseList") as HTMLDivElement; 
const message = document.getElementById("message") as HTMLParagraphElement;

let courses: CourseInfo[] = []; 

function loadCourses(): void {
  const storedCourses: string | null = localStorage.getItem("courses");

  if (storedCourses) {
    courses = JSON.parse(storedCourses) as CourseInfo[];
  }
}


function saveCourses(); void {
  localStorage.setItem("courses", JSON.stringify(courses)); 
}


function renderCourses(): void {
  courseList.innerHTML = "";

  courses.forEach((course: CourseInfo) => {
    const courseCard: HTMLDivElement = document.createElement("div");
    courseCard.className = "course-card";

    courseCard.innerHTML = `
      <h3>${course.code} - ${course.name}</h3>
      <p><strong>Progression:</strong> ${course.progression}</p>
      <p>
        <strong>Kursplan:</strong>
        <a href="${course.syllabus}" target="_blank" rel="noopener noreferrer">
          ${course.syllabus}
        </a>
      </p>
    `;

    const deleteButton: HTMLButtonElement = document.createElement("button");
    deleteButton.textContent = "Radera";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", () => {
      deleteCourse(course.code);
    });

    courseCard.appendChild(deleteButton);
    courseList.appendChild(courseCard);
  });
}


function deleteCourse(code: string): void {
  courses = courses.filter((course: CourseInfo) => course.code !== code);
  saveCourses();
  renderCourses();
  showMessage("Kursen har raderats.", "green");
}


