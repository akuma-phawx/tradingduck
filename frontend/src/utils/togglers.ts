// Get references to DOM elements
const body = document.body;
const className = 'g-sidenav-pinned';
const sidenav = document.getElementById('sidenav-main');
const sidenavShow = document.querySelector('.g-sidenav-show');
const toggleNavbarMinimize = document.getElementById('navbarMinimize') as HTMLInputElement | null;

// Function to hide the sidebar
export function hideSidebar() {
  // Remove the pinned class from the body
  body.classList.remove(className);

  // Delayed action to remove background color
  setTimeout(() => sidenav?.classList.remove('bg-white'), 100);

  // Remove transparent background
  sidenav?.classList.remove('bg-transparent');
}

// Function to toggle the sidebar visibility
export function toggleIconSide() {
  // Toggle the pinned class on the body
  if (body.classList.toggle(className)) {
    // If the sidebar is opened, remove background color with a delay
    setTimeout(() => sidenav?.classList.remove('bg-white'), 100);
  }

  // Remove transparent background
  sidenav?.classList.remove('bg-transparent');
}

// Function to toggle the sidebar visibility based on a specific class
export function toggleSidebar() {
  if (sidenavShow) {
    // Toggle the visibility class of the sidebar
    const isHidden = sidenavShow.classList.toggle('g-sidenav-hidden');
    sidenavShow.classList.toggle('g-sidenav-pinned');

    // Toggle the "checked" attribute for the toggleNavbarMinimize element
    if (toggleNavbarMinimize) {
      toggleNavbarMinimize.click();
      toggleNavbarMinimize.checked = !isHidden;
    }
  }
}
