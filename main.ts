
import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';
import { Student} from './students.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

var slider: HTMLElement = document.getElementById("myRange")!;
var output: HTMLElement = document.getElementById("demo")!;
output.innerHTML = (<HTMLInputElement>slider).value;

slider.oninput = function () {
    output.innerHTML = (<HTMLInputElement>this).value;
    filterByCredits(dataCourses);
}

function filterByCredits(courses: Course[]): void {
  var val = parseInt((<HTMLInputElement>slider).value);
  val = (val == null) ? 6 : val;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(val, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(valueKey: number, courses: Course[]){
    let suma = 0;
    let listFiltrada = [];
    for (let index = 0; index < courses.length; index++){  
      var cre = courses[index].credits;
      if(suma+cre <= valueKey)
        listFiltrada.push(courses[index]);
        suma+=cre;  
  }
  return listFiltrada;
}

btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);
createStudent(new Student(201414158, 1010235214, "22 años", 3124468728));

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`



function createStudent(student: Student): void{
  let trElement = document.createElement("tr");
  trElement.innerHTML = `<td>${student.codigo}</td>
                           <td>${student.cedula}</td>
                           <td>${student.edad}</td>
                           <td>${student.telefono}</td>`;
    studentTbody.appendChild(trElement);
}


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}