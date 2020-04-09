import { dataCourses } from './dataCourses.js';
import { Student } from './students.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
    filterByCredits(dataCourses);
};
function filterByCredits(courses) {
    var val = parseInt(slider.value);
    val = (val == null) ? 6 : val;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(val, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(valueKey, courses) {
    var suma = 0;
    var listFiltrada = [];
    for (var index = 0; index < courses.length; index++) {
        var cre = courses[index].credits;
        if (suma + cre <= valueKey)
            listFiltrada.push(courses[index]);
        suma += cre;
    }
    return listFiltrada;
}
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
createStudent(new Student(201414158, 1010235214, "22 años", 3124468728));
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function createStudent(student) {
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>" + student.codigo + "</td>\n                           <td>" + student.cedula + "</td>\n                           <td>" + student.edad + "</td>\n                           <td>" + student.telefono + "</td>";
    studentTbody.appendChild(trElement);
}
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
