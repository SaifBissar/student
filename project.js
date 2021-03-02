let addBtn = document.querySelector('#addBtn')
let showBtn = document.querySelector('#showBtn')
let form = document.querySelector('#form')
let table = document.querySelector('#table')
let headers = ['id', 'name', 'class', 'age', 'degree', 'grade', 'actions']
let students = [
    { name: 'momen', age: 15, class: 0, degree: 0, grade: 'a' }
]
let actions = [
    { name: 'delete', classes: 'btn m-2 btn-danger' },
    { name: 'editDegree', classes: 'btn m-2 btn-warning' }
]
showBtn.addEventListener('click', function (e) {
    this.innerText == "Show Form" ? this.innerText = "Hide Form" : this.innerText = "Show Form";
    form.classList.toggle('d-none')
})
let createNewElement = (eleType, parent, txt = '', classes = '') => {
    let element = document.createElement(eleType)
    if (txt != '') element.innerText = txt
    if (classes != '') element.classList = classes
    parent.appendChild(element)
    return element
}
let showAll = () => {
    table.innerText = ''
    students.forEach((student, i) => {
        tr = createNewElement('tr', table)
        headers.forEach(header => {
            if (header == 'id') txt = i + 1
            else if (header == 'actions') txt = ''
            else if (header == 'grade') txt = grade(student.degree)
            else txt = student[header]
            td = createNewElement('td', tr, txt)
        })
        actions.forEach(action => {
            btn = createNewElement('button', td, action.name, action.classes)
            btn.addEventListener('click', function (e) {
                if (action.name == 'delete') deleteStudent(i)
                else if (action.name == 'editDegree') edit(i)
            })
        })
    })
}
let deleteStudent = (i) => {
    students.splice(i, 1)
    showAll()
}
let edit = (i) => {
    let newDeg = prompt('Enter new degree')
    students[i].degree = newDeg
    showAll()
}
let grade = (d = 0) => {
    let g = ''
    if (d >= 90) g = 'A'
    else if (d >= 80 && d < 90) g = 'B'
    else if (d >= 70 && d < 80) g = 'C'
    else if (d >= 60 && d < 70) g = 'D'
    else g = 'F'
    return g
}
form.addEventListener('submit', function (e) {
    e.preventDefault()
    let student = {
        name: this.elements.name.value,
        age: this.elements.age.value,
        class: this.elements.class.value,
        degree: this.elements.degree.value
    }
    students.push(student)
    this.reset()
    this.classList.toggle('d-none')
    showBtn.innerText = 'Show Form'
    showAll()
})
showAll()
