// Get modal elements
const projectModal = document.getElementById("projectModal");
const createBtn = document.querySelector(".create-btn");
const cancelBtn = document.getElementById("cancelBtn");
const projectForm = document.getElementById("projectForm");

// Open modal when clicking "Criar Projeto" button
createBtn.addEventListener("click", () => {
  projectModal.classList.add("active");
});

// Close modal when clicking "Cancelar" button
cancelBtn.addEventListener("click", () => {
  projectModal.classList.remove("active");
});

// Close modal when clicking outside (on the overlay)
projectModal.addEventListener("click", (e) => {
  if (e.target === projectModal) {
    projectModal.classList.remove("active");
  }
});

// Handle form submission
projectForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const projectName = document.getElementById("projectName").value;
  const projectDescription =
    document.getElementById("projectDescription").value;

  // TODO: Replace this with your actual API call
  console.log("Project Created:", {
    projectName,
    projectDescription,
    timestamp: new Date().toISOString(),
  });

  // Example API call (uncomment and modify for your backend):
  // fetch('/api/projects', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     name: projectName,
  //     description: projectDescription
  //   })
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  //   // Reset form
  //   projectForm.reset();
  //   // Close modal
  //   projectModal.classList.remove('active');
  //   // Show success message or add new project to list
  // })
  // .catch(error => console.error('Error:', error));

  // Reset form
  projectForm.reset();

  // Close modal
  projectModal.classList.remove("active");

  // Show success message
  showSuccessMessage(`Projeto "${projectName}" criado com sucesso!`);
});

// Helper function to show success message
function showSuccessMessage(message) {
  // You can replace this with a toast notification library
  // For now, using a simple alert
  alert(message);

  // Alternative: Create a custom toast notification
  // const toast = document.createElement('div');
  // toast.className = 'toast success';
  // toast.textContent = message;
  // document.body.appendChild(toast);
  // setTimeout(() => toast.remove(), 3000);
}

// Prevent form submission with Enter key while focusing input
document.getElementById("projectName").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("projectDescription").focus();
  }
});
