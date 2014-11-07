"use strict";

function validateForm(form) {
    var valid = true;
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var requiredField;

    if (form.elements['occupation'].value == 'other') {
       requiredFields.push('occupationOther');
    }

    for (idx = 0; idx < requiredFields.length; ++idx) {
        requiredField = form.elements[requiredFields[idx]];
        if (0 == requiredField.value.trim().length) {
            requiredField.className = 'form-control invalid-field';
            valid = false;
        } else {
            requiredField.className = 'form-control';
        }
        if (requiredField.name == 'zip') {
            var zipRegExp = new RegExp('^\\d{5}$');
            if (zipRegExp.test(requiredField.value)) {
                requiredField.className = 'form-control';
            }
            else {
                requiredField.className = 'form-control invalid-field';
                valid = false;
            }
        }
        if (requiredField.name == 'birthdate') {
            var curDate = moment();
            var birthdate = moment(requiredField.value);
            var err = document.getElementById('birthdateMessage');
            requiredField.className = 'form-control';
            err.style.display = 'none';
            if (!birthdate.isValid() || curDate.diff(birthdate, 'years') < 13) {
                err.innerHTML = 'You must be older than 13 years';
                err.style.display = 'inline-block';
                requiredField.className = 'form-control invalid-field';
                valid = false;
            }
        }
    }
    return valid;
}

function onSubmit(evt) {
    var valid = false;
    try {
       valid = validateForm(this);
    }
    catch (err) {
        valid = false;
    }
    if (!valid) {
        evt.preventDefault();
        evt.returnValue = false;
    }
}

function populateState() {
    var stateSelect = document.getElementById('signup').elements['state'];
    var idx;
    var stateOption;
    var usState;
    for (idx = 0; idx < usStates.length; idx++) {
        stateOption = document.createElement('option');
        usState = usStates[idx];
        stateOption.value = usState.code;
        stateOption.innerHTML = usState.name;
        stateSelect.appendChild(stateOption);
    }
}

function onOccupationChange() {
    console.log(this.value);
    var occupationOther = document.getElementById('signup').elements['occupationOther'];
    if (this.value == 'other') {
        occupationOther.style.display = 'block';
    } else {
        occupationOther.style.display = 'none';
    }
}

function onNoThanks() {
    var noThanks = confirm("Are you sure you want to leave? Press a button!\nEither OK or Cancel.");
    if (noThanks == true) {
        location.replace("http://google.com");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    populateState();
    var occupationSelect = document.getElementById('signup').elements['occupation'];
    occupationSelect.addEventListener('change', onOccupationChange);
    var noThanks = document.getElementById('cancelButton');
    noThanks.addEventListener('click', onNoThanks);
    var signupForm = document.getElementById('signup');
    signupForm.addEventListener('submit', onSubmit);

});