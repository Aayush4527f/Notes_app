let notes = [];

function getContent() {
    document.getElementById(`save_note_txtarea`).value = document.getElementById(`save_note_div`).innerText
}
function growDiv(){
    let div_style = document.getElementById('save_note_div').style
    
    if(div_style.width != '80vw'){
        div_style.width = '80vw'
        div_style.height = '60vh'
    }else{
        div_style.width = '35vw'
        div_style.height = '20vh'
    }
}

function fetchApi() {
    fetch('/api').then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            notes.push(data[i].Note)
        }
        console.log(notes)
    });
}
fetchApi();

function createNotes() {


    for(let i = 0; i < notes.length; i++){
        let notes_div = document.getElementById('notes_div')
        let note = document.createElement('div')
        note.id = `note${i}`
        note.className = "note"
        notes_div.appendChild(note)
    }
    for(let i = 0; i< notes.length; i++){
        let note = document.getElementById(`note${i}`)
        let notePara = document.createElement('p')
        notePara.id = `notePara${i}`
        notePara.className = "notePara"
        note.appendChild(notePara)
        
        let noteParaTwo = document.createElement('div')
        noteParaTwo.id = `noteParaTwo${i}`
        noteParaTwo.contentEditable = true
        noteParaTwo.className = "noteParaTwo"
        note.appendChild(noteParaTwo)
    }
    for(let i = 0; i<notes.length; i++){
        let note = document.getElementById(`note${i}`)
        let FormDiv = document.createElement("div")
        FormDiv.className = "FormDiv"
        note.appendChild(FormDiv) 
    }
    for(let i = 0; i<notes.length; i++){
        let form = document.createElement('form')
        let note = document.getElementsByClassName("FormDiv")
        form.method = "post"
        form.action = "/update"
        form.className = "updateForm"
        note[i].appendChild(form)
        let deleteForm = document.createElement('form')
        deleteForm.method = "post"
        deleteForm.action = "/delete"
        deleteForm.className = "deleteForm"
        note[i].appendChild(deleteForm)
    }
    for(let i = 0; i<notes.length; i++){
        let form = document.getElementsByClassName('updateForm')
        let txt2 = document.createElement('textarea')
        txt2.name = `updateNote`
        txt2.id = `updateNote${i}`
        txt2.className = "updateNote"
        form[i].appendChild(txt2)
        let input = document.createElement('input')
        input.type = "submit"
        input.value = "Edit"
        input.className = "Input"
        form[i].appendChild(input)
        let txt1 = document.createElement('textarea')
        txt1.name = `prevNote`
        txt1.id = `prevNote${i}`
        txt1.className = "prevNote"
        form[i].appendChild(txt1)
    }
    for(let i = 0; i<notes.length; i++){
        let input = document.createElement("input")
        let form = document.getElementsByClassName("deleteForm")
        input.type = "submit"
        input.value = "Delete"
        input.className = "Input"
        form[i].appendChild(input)

        let txt1 = document.createElement("textarea")
        txt1.className = "DeleteTxt"
        txt1.id = `deleteNote${i}`
        txt1.name = "prevNote"
        txt1.style.display = "none"
        form[i].appendChild(txt1)

    }
}

function getNotes(){
    for(let i = 0; i<notes.length; i++){
        document.getElementById(`notePara${i}`).innerText += notes[i]
    }
}

function getTxtData(i) {
    let notePara = document.getElementById(`notePara${i}`)
    let noteParaTwo = document.getElementById(`noteParaTwo${i}`)
    let prevNote = document.getElementById(`prevNote${i}`)
    let updateNote = document.getElementById(`updateNote${i}`)
    let deleteNote = document.getElementById(`deleteNote${i}`)

    prevNote.value = notePara.innerText 
    deleteNote.value = notePara.innerText
    updateNote.value = noteParaTwo.innerText 
}

setTimeout(() => {
    createNotes();
}, 100);

setTimeout(() => {
    getNotes();
}, 200);
setTimeout(() => {
    setInterval(() => {
        for(let i = 0; i < notes.length; i++){
            getTxtData(i)
        }
    }, 10);
}, 500);