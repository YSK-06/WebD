document.addEventListener('DOMContentLoaded', function () {
  let studentCount = 1;

  const addStudentButton = document.getElementById('add-student-btn');
  const submitButton = document.getElementById('submit-btn');
  const table = document.getElementById('myTable');

  const popupContainer = document.getElementById('popup-container');
  const popupStudentName = document.getElementById('popup-student-name');
  const popupInfo = document.getElementById('popup-info');
  const updateButton = document.getElementById('update-btn');
  const cancelButton = document.getElementById('cancel-btn');

  // Make sure popup is hidden initially
  popupContainer.style.display = 'none';

  // Add New Student Functionality
  addStudentButton.addEventListener('click', () => {
      studentCount++;
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td><input type="checkbox" class="select-row" /><br /><br /><img src="down.png" class="toggle-details" width="25px" /></td>
          <td>Student ${studentCount}</td>
          <td>Teacher ${studentCount}</td>
          <td>Approved</td>
          <td>Fall</td>
          <td>TA</td>
          <td>${studentCount * 10000}</td>
          <td>100%</td>
          <td></td>
          <td></td>
      `;

      const newDetailsRow = document.createElement('tr');
      newDetailsRow.classList.add('dropDownTextArea', 'hidden');
      newDetailsRow.innerHTML = `
          <td colspan="10">
              Advisor:<br /><br />
              Award Details<br />
              Summer 1-2014 (TA)<br />
              Budget Number:<br />
              Tuition Number:<br />
              Comments:<br /><br />
              Award Status:<br /><br />
          </td>
      `;
      
      table.appendChild(newRow);
      table.appendChild(newDetailsRow);

      attachRowEvents(newRow, newDetailsRow);

      alert(`Student ${studentCount} record added successfully.`);
  });

  function attachRowEvents(row, detailsRow) {
      const checkbox = row.querySelector('.select-row');
      const detailsToggle = row.querySelector('.toggle-details');

      checkbox.addEventListener('change', () => {
          const rowElement = checkbox.closest('tr');
          if (checkbox.checked) {
              rowElement.style.backgroundColor = 'yellow';
              submitButton.classList.add('active');
              submitButton.disabled = false;
              addActionButtons(rowElement);
          } else {
              rowElement.style.backgroundColor = '';
              if (!document.querySelector('.select-row:checked')) {
                  submitButton.classList.remove('active');
                  submitButton.disabled = true;
              }
              removeActionButtons(rowElement);
          }
      });

      detailsToggle.addEventListener('click', () => {
          detailsRow.classList.toggle('hidden');
      });
  }

  function addActionButtons(row) {
      const deleteCell = row.querySelector('td:nth-last-child(2)');
      const editCell = row.querySelector('td:last-child');

      deleteCell.innerHTML = '<button class="delete-btn">Delete</button>';
      editCell.innerHTML = '<button class="edit-btn">Edit</button>';

      deleteCell.querySelector('.delete-btn').addEventListener('click', () => {
          const detailsRow = row.nextElementSibling;
          row.remove();
          if (detailsRow && detailsRow.classList.contains('dropDownTextArea')) {
              detailsRow.remove();
          }
          alert(`${row.cells[1].innerText} record deleted successfully.`);
      });

      editCell.querySelector('.edit-btn').addEventListener('click', () => {
          popupStudentName.textContent = row.cells[1].innerText;
          popupInfo.innerHTML = `
              Advisor: ${row.cells[2].innerText}<br>
              Award Status: ${row.cells[3].innerText}<br>
              Semester: ${row.cells[4].innerText}<br>
              Type: ${row.cells[5].innerText}<br>
              Budget: ${row.cells[6].innerText}<br>
              Percentage: ${row.cells[7].innerText}
          `;
          popupContainer.style.display = 'flex';
      });
  }

  function removeActionButtons(row) {
      row.querySelector('td:nth-last-child(2)').innerHTML = '';
      row.querySelector('td:last-child').innerHTML = '';
  }

  cancelButton.addEventListener('click', () => {
      popupContainer.style.display = 'none';
  });

  updateButton.addEventListener('click', () => {
      alert(`${popupStudentName.textContent} data updated successfully.`);
      popupContainer.style.display = 'none';
  });

  // Attach Events to Initial Rows
  document.querySelectorAll('#myTable tr').forEach((row, index) => {
      if (index !== 0 && row.nextElementSibling && row.nextElementSibling.classList.contains('dropDownTextArea')) {
          attachRowEvents(row, row.nextElementSibling);
      }
  });
});
