// script
tutorSessionSection = `
    <label for="dates[]">Date</label>
    <input type="date" name="dates[]" required>

    <div class="hours-container">
        <label>
            <label>Prep Hours</label>
            <input type="number" name="prepHours[]" min="0" step="0.25" value="0" required>
        </label>

        <label>
            <label>Travel Hours</label>
            <input type="number" name="travelHours[]" min="0" step="0.25" value="0" required>
        </label>

        <label>
            <label>Tutoring Hours</label>
            <input type="number" name="tutoringHours[]" min="0" step="0.25" value="0" required>
        </label>
    </div>

    <label>Lesson Details</label>
    <textarea name="lessonDetails[]"></textarea>

    <button class="removeBtn" type="button">Remove Tutoring Session</button>
`;

let container = document.getElementById("entriesContainer");
let newEntry = document.createElement("div");
newEntry.className = "entry";
newEntry.innerHTML = tutorSessionSection;
container.appendChild(newEntry);

function updateAsterisks() {
  const requiredElements = document.querySelectorAll("#dynamicForm :required");
  requiredElements.forEach(function(element) {
    const label = element.previousElementSibling;
    if (label) {
      label.classList.add("required");
    }
  });
}

document.getElementById("addBtn").addEventListener("click", function() {
  let container = document.getElementById("entriesContainer");
  let newEntry = document.createElement("div");
  newEntry.className = "entry";
  newEntry.innerHTML = tutorSessionSection;
  container.appendChild(newEntry);
  updateAsterisks();
});

document.getElementById("dynamicForm").addEventListener("click", function(e) {
  if (e.target && e.target.matches(".removeBtn")) {
    if (!confirm("Are you sure you want to remove this entry?")) return;
    e.target.parentNode.remove();
  }
});

document.getElementById("submitButton").addEventListener("click", function(e) {
  let inputs = document.querySelectorAll("input");
  let unfilled = [];
  let firstUnfilled;

  let fieldNames = {
    studentName: "Student Name",
    tutorName: "Tutor Name",
    start_time: "Session Start Time",
    end_time: "Session End Time",
    books_used: "Books Used",
  };

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].required && !inputs[i].value) {
      if (!firstUnfilled) firstUnfilled = inputs[i];
      // Use the mapped name if it exists, otherwise use the original name.
      let fieldName = fieldNames[inputs[i].name] || inputs[i].name;
      if (inputs[i].name === "dates[]") {
        fieldName = "Tutoring Sessions";
      }
      unfilled.push(fieldName);
    }
  }

  if (unfilled.length > 0) {
    e.preventDefault();
    alert(
      "Please fill out the following required fields: " + unfilled.join(", ")
    );
    firstUnfilled.scrollIntoView({ behavior: "smooth", block: "center" });
    inputs.forEach((element) => {
      setTimeout(() => {
        element.classList.add("flash-border");
      }, 1000);
    });
    // Add a red border to the first unfilled field.
    // Function to flash border color
    // Function to flash border color
    return false;
  }
});

document.querySelector("form").addEventListener("submit", function(e) {
  const tutorSessions = document.querySelectorAll(".entry");
  if (tutorSessions.length === 0) {
    e.preventDefault();
    alert("You must have at least one tutoring session.");
    return;
  }

  if (!confirm("Are you sure you want to submit this form?")) {
    e.preventDefault();
    return;
  }
});

function toggleTextInput(dropdown) {
  let textInput = document.getElementById("site_location_other");
  let textInputLabel = document.querySelector(
    'label[for="site_location_other"]'
  );

  if (dropdown.value === "other") {
    textInput.style.display = "block";
    textInputLabel.style.display = "block";
    textInput.setAttribute("required", true);
  } else {
    textInput.style.display = "none";
    textInputLabel.style.display = "none";
    textInput.removeAttribute("required");
  }
  updateAsterisks();
}

const checkboxes = document.querySelectorAll(".this_month_checkbox");
console.log(checkboxes);

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener("change", function(event) {
    console.log(event.target.checked);
    const nextTextInput = checkbox.parentElement.nextElementSibling;
    console.log(nextTextInput);
    if (nextTextInput) {
      nextTextInput.required = event.target.checked;
    }
  });
});

function getAllFormInputs() {
    var forms = document.forms;
    let inputs = {};
    var formInputs = forms[0].querySelectorAll('input[type=text], input[type=textarea]')
    for (var j = 0; j < formInputs.length; j++) {
        var input = formInputs[j];
        if (input.name) {
            inputs[input.name] = input.value;
        } else if (input.id) {
            inputs[input.id] = input.value;
        }
    }
    return inputs;
}

function saveTutoringSessions() {
  var parentDiv = document.querySelector('#entriesContainer')
  let data = []
  Array.from(parentDiv.children).forEach(function(child) {
          if (child.tagName === 'DIV') {
              var inputs = child.querySelectorAll('input');
              var obj = {};
              inputs.forEach(function(input) {
                  var key = input.name ? input.name : input.id;
                  if (input.type === 'checkbox') {
                      obj[key] = input.checked;
                  } else {
                      obj[key] = input.value;
                  }
              });
              obj["lessonDetails[]"] = child.querySelector("textarea").value
              data.push(obj);
          }
      });
  return data
}

function loadTutoringSessions(savedSessions) {
  var entries = document.querySelectorAll('div.entry');

  entries.forEach(function(entry) {
      entry.remove();
  });

  savedSessions.forEach(element => {
    let container = document.getElementById("entriesContainer");
    let newEntry = document.createElement("div");
    newEntry.className = "entry";
    newEntry.innerHTML = tutorSessionSection;
    container.appendChild(newEntry);

    console.log(element)

    let date = newEntry.querySelector('input[type=date]');
    date.value = element["dates[]"] 

    let prepHours = newEntry.querySelector('[name="prepHours[]"]');
    prepHours.value = element["prepHours[]"] 

    let travelHours = newEntry.querySelector('[name="travelHours[]"]');
    travelHours.value = element["travelHours[]"] 

    let tutorHours = newEntry.querySelector('[name="tutoringHours[]"]');
    tutorHours.value = element["tutoringHours[]"] 

    let moreInfo = newEntry.querySelector('[name="lessonDetails[]"]');
    moreInfo.value = element["lessonDetails[]"] 
    updateAsterisks();
  });


}

function saveFormInputs() {
    var formInputs = document.querySelectorAll('input[type=text], textarea, input[type=checkbox], select, input[type=time]');
    var inputs = {};
    for (var i = 0; i < formInputs.length; i++) {
        var input = formInputs[i];
        var key = input.name ? input.name : input.id;
        if (input.type === 'checkbox') {
            inputs[key] = input.checked;
        } else {
            inputs[key] = input.value;
        }
    }
    return inputs;
}

function loadFormInputs(savedInputs) {
    var formInputs = document.querySelectorAll('input[type=text], textarea, input[type=checkbox], select, input[type=time]');
    for (var i = 0; i < formInputs.length; i++) {
        var input = formInputs[i];
        var key = input.name ? input.name : input.id;
        if (key in savedInputs) {
            if (input.type === 'checkbox') {
                input.checked = savedInputs[key];
            } else {
                input.value = savedInputs[key];
            }
        }
    }
  container.appendChild(newEntry);
}




document.getElementById("saveBtn").addEventListener("click", function() {
  localStorage.setItem('formData', JSON.stringify(saveFormInputs()));
  localStorage.setItem('tutoringSessions', JSON.stringify(saveTutoringSessions()));
  alert("Form Data Saved")
});

// load saved form data from local browser storage
document.getElementById("loadBtn").addEventListener("click", function() {
  let data = localStorage.getItem('formData')
  let tutorData = localStorage.getItem('tutoringSessions')
  
  console.log(data)
  console.log(tutorData)


  // fill required data into the form, or alert user if there is no saved data
  if (!data && !tutorData) {
    alert("No saved form data found")
    return
  }
  if (data) {
    let jsonData = JSON.parse(data)
    loadFormInputs(jsonData)
  }
  if (tutorData) {
    let jsonTutorData = JSON.parse(tutorData)
    loadTutoringSessions(jsonTutorData)
  }
  alert("Successfully Loaded Form Data")

});

document.getElementById("clearBtn").addEventListener("click", function () {
  if (!confirm("Are you sure you want to clear your form progress?")) return;
  localStorage.clear()
});


updateAsterisks();
