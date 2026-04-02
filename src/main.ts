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



setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
