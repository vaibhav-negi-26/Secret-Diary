const pass = $('#userpassword')
const confirm_pass = $('#confirmpass')
const error_msg = $('#error_msg')

$('form').on('submit', (event) => {
    event.preventDefault()
    console.log(pass.val() + " : " + confirm_pass.val())
    if (pass.val() === confirm_pass.val()) {
        error_msg.hide('slow')
        console.log("correct")
    } else {
        error_msg.toggle('slow')
        pass.val('')
        confirm_pass.val('')
    }
})