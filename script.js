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
`

let container = document.getElementById('entriesContainer');
let newEntry = document.createElement('div');
newEntry.className = 'entry';
newEntry.innerHTML = tutorSessionSection;
container.appendChild(newEntry);

function updateAsterisks() {
    const requiredElements = document.querySelectorAll("#dynamicForm :required");
    requiredElements.forEach(function (element) {
        const label = element.previousElementSibling;
        if (label) {
            label.classList.add('required');
        }
    });
}

document.getElementById('addBtn').addEventListener('click', function () {
    let container = document.getElementById('entriesContainer');
    let newEntry = document.createElement('div');
    newEntry.className = 'entry';
    newEntry.innerHTML = tutorSessionSection;
    container.appendChild(newEntry);
    updateAsterisks();
});

document.getElementById('dynamicForm').addEventListener('click', function (e) {
    if (e.target && e.target.matches('.removeBtn')) {
        if (!confirm('Are you sure you want to remove this entry?')) return;
        e.target.parentNode.remove();
    }
});

document.querySelector('form').addEventListener('submit', function (e) {
    const tutorSessions = document.querySelectorAll(".entry");
    if (tutorSessions.length === 0) {
        e.preventDefault();
        alert('You must have at least one tutoring session.');
        return;
    }

    if (!confirm('Are you sure you want to submit this form?')) {
        e.preventDefault();
        return;
    }
});

function toggleTextInput(dropdown) {
    let textInput = document.getElementById('site_location_other');
    let textInputLabel = document.querySelector('label[for="site_location_other"]');
    
    if (dropdown.value === 'other') {
      textInput.style.display = 'block';
      textInputLabel.style.display = 'block';
      textInput.setAttribute('required', true);
    } else {
      textInput.style.display = 'none';
      textInputLabel.style.display = 'none';
      textInput.removeAttribute('required');
    }
    updateAsterisks();
  }

const checkboxes = document.querySelectorAll("input[type='checkbox']");
console.log(checkboxes);

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", function (event) {
        console.log(event.target.checked);
        const nextTextInput = checkbox.parentElement.nextElementSibling;
        console.log(nextTextInput);
        if (nextTextInput) {
            nextTextInput.required = event.target.checked;
        }
    });
});

updateAsterisks();