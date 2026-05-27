const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}

function closeAllSubMenus(){
  Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
    ul.classList.remove('show')
    ul.previousElementSibling.classList.remove('rotate')
  })
}

// =========================
// DARK MODE
// =========================

const body = document.body;

// cek mode tersimpan
let darkMode =
  localStorage.getItem("darkmode");

// aktifkan saat reload
if (darkMode == "active") {

  body.classList.add("dark");

}

// toggle dark mode
function toggleDarkMode() {

  body.classList.toggle("dark");

  // simpan status
  if (body.classList.contains("dark")) {

    localStorage.setItem(
      "darkmode",
      "active"
    );

  }

  else {

    localStorage.setItem(
      "darkmode",
      "inactive"
    );

  }

}