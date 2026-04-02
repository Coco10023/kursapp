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


function showMessage(text: string, color: string): void {
  message.textContent = text;
  message.style.color = color;
}

function validateCourse(course: CourseInfo): boolean {
  if (
    course.code.trim() === "" ||
    course.name.trim() === "" ||
    course.syllabus.trim() === ""
  ) {
    showMessage("Alla fält måste fyllas i.", "red");
    return false;
  }

  if (!["A", "B", "C"].includes(course.progression)) {
    showMessage("Progression måste vara A, B eller C.", "red");
    return false;
  }

  const codeExists: boolean = courses.some(
    (existingCourse: CourseInfo) =>
      existingCourse.code.toLowerCase() === course.code.toLowerCase()
  );

  if (codeExists) {
    showMessage("Kurskoden måste vara unik.", "red");
    return false;
  }

  return true;
}

function addCourse(course: CourseInfo): void {
  if (!validateCourse(course)) {
    return;
  }

  courses.push(course);
  saveCourses();
  renderCourses();
  courseForm.reset();
  showMessage("Kursen har lagts till.", "green");
}

courseForm.addEventListener("submit", (event: SubmitEvent): void => {
  event.preventDefault();

  const newCourse: CourseInfo = {
    code: codeInput.value,
    name: nameInput.value,
    progression: progressionInput.value as "A" | "B" | "C",
    syllabus: syllabusInput.value,
  };

  addCourse(newCourse);
});

loadCourses();
renderCourses();