const weatherForm = document.querySelector('form')     //reference of the form
const inputBox = document.querySelector('input')        //reference of the textbox
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
e.preventDefault()      //prevent form to submit

messageOne.textContent = 'loading'
var location = inputBox.value;
inputBox.value = ''
var queryStringg = 'http://localhost:3000/weather?address='+location

fetch(queryStringg).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        messageOne.textContent = data.error
        messageTwo.textContent = ''
    }
        else
        {
            messageOne.textContent = data.place
            messageTwo.textContent = data.forecast
        }
    })
    })

})