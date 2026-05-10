// ==================== MODAL MANAGER ====================
// Centralized modal handling system

class ModalManager {
  constructor(modalId, formId) {
    this.modal = document.getElementById(modalId);
    this.form = document.getElementById(formId);
    this.modalId = modalId;
    this.formId = formId;
    this.currentAction = null;
    this.currentProjectId = null;

    this.init();
  }

  init() {
    // Find cancel button within this modal
    const cancelBtn = this.modal.querySelector('[id="cancelBtn"]');
    if (cancelBtn) {
      cancelBtn.addEventListener("click", () => this.close());
    }

    // Close modal when clicking outside
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Handle form submission
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  open(action = "create", projectId = null) {
    this.currentAction = action;
    this.currentProjectId = projectId;
    this.modal.classList.add("active");
  }

  close() {
    this.modal.classList.remove("active");
    this.form.reset();
    this.currentAction = null;
    this.currentProjectId = null;
  }

  handleSubmit(e) {
    e.preventDefault();

    // Get form values
    const projectName = this.form.querySelector('[name="projectName"]').value;
    const projectDescription = this.form.querySelector(
      '[name="projectDescription"]',
    ).value;

    // Prepare data
    const projectData = {
      name: projectName,
      description: projectDescription,
      timestamp: new Date().toISOString(),
    };

    // Add ID if updating
    if (this.currentAction === "update" && this.currentProjectId) {
      projectData.id = this.currentProjectId;
    }

    // Log to console (replace with actual API call)
    console.log(
      `${this.currentAction === "create" ? "Creating" : "Updating"} project:`,
      projectData,
    );

    // TODO: Replace with your actual API call
    if (this.currentAction === "create") {
      this.submitCreate(projectData);
    } else if (this.currentAction === "update") {
      this.submitUpdate(projectData);
    }
  }

  submitCreate(projectData) {
    // Example API call for creating a project
    // Uncomment and modify for your backend:
    /*
    fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Project created successfully:', data);
      this.close();
      showSuccessMessage(`Projeto "${projectData.name}" criado com sucesso!`);
      // Add new project to list or refresh
    })
    .catch(error => console.error('Error creating project:', error));
    */

    // Temporary success for demo
    this.close();
    showSuccessMessage(`Projeto "${projectData.name}" criado com sucesso!`);
  }

  submitUpdate(projectData) {
    // Example API call for updating a project
    // Uncomment and modify for your backend:
    /*
    fetch(`/api/projects/${projectData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Project updated successfully:', data);
      this.close();
      showSuccessMessage(`Projeto "${projectData.name}" atualizado com sucesso!`);
      // Update project in list or refresh
    })
    .catch(error => console.error('Error updating project:', error));
    */

    // Temporary success for demo
    this.close();
    showSuccessMessage(`Projeto "${projectData.name}" atualizado com sucesso!`);
  }
}

// ==================== INITIALIZE MODALS ====================

// Create modal instances
const createProjectModal = new ModalManager("projectModal", "projectForm");
const updateProjectModal = new ModalManager(
  "updateProjectModal",
  "updateProjectForm",
);

// ==================== EVENT LISTENERS ====================

// Open create modal
const createBtn = document.querySelector(".create-btn");
if (createBtn) {
  createBtn.addEventListener("click", () => {
    createProjectModal.open("create");
  });
}

// Handle project card navigation and actions
document.addEventListener("click", (e) => {
  // Don't navigate if clicking action buttons
  if (e.target.closest(".edit-btn") || e.target.closest(".delete-btn")) {
    e.stopPropagation();

    // Edit button clicked
    if (e.target.closest(".edit-btn")) {
      const projectCard = e.target.closest(".project-card");
      const projectId = projectCard.dataset.projectId;
      const projectTitle =
        projectCard.querySelector(".project-title").textContent;
      const projectDesc = projectCard.querySelector(
        ".project-description",
      ).textContent;

      // Populate update modal with current project data
      updateProjectModal.form.querySelector('[name="projectName"]').value =
        projectTitle;
      updateProjectModal.form.querySelector(
        '[name="projectDescription"]',
      ).value = projectDesc;

      // Open update modal
      updateProjectModal.open("update", projectId);
    }

    // Delete button clicked
    if (e.target.closest(".delete-btn")) {
      const projectCard = e.target.closest(".project-card");
      const projectId = projectCard.dataset.projectId;
      const projectTitle =
        projectCard.querySelector(".project-title").textContent;

      handleDeleteProject(projectId, projectTitle, projectCard);
    }

    return;
  }

  // Navigate to project details if clicking on project card
  const projectCard = e.target.closest(".project-card");
  if (projectCard) {
    const projectId = projectCard.dataset.projectId;
    const projectTitle =
      projectCard.querySelector(".project-title").textContent;

    // Navigate with query parameters
    window.location.href = `project-details.html?id=${projectId}&title=${encodeURIComponent(projectTitle)}`;
  }
});

// ==================== PROJECT ACTIONS ====================

function handleDeleteProject(projectId, projectTitle, projectElement) {
  const confirmed = confirm(
    `Tem certeza que deseja deletar "${projectTitle}"?`,
  );

  if (confirmed) {
    // TODO: Replace with your actual API call
    console.log(`Deleting project:`, { id: projectId, title: projectTitle });

    /*
    fetch(`/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Project deleted successfully:', data);
      projectElement.remove();
      showSuccessMessage(`Projeto "${projectTitle}" deletado com sucesso!`);
    })
    .catch(error => console.error('Error deleting project:', error));
    */

    // Demo: Remove from DOM
    projectElement.style.opacity = "0";
    projectElement.style.transform = "translateX(-100%)";
    projectElement.style.transition = "all 0.3s ease";

    setTimeout(() => {
      projectElement.remove();
      showSuccessMessage(`Projeto "${projectTitle}" deletado com sucesso!`);
    }, 300);
  }
}

// ==================== UTILITY FUNCTIONS ====================

function showSuccessMessage(message) {
  // You can replace this with a toast notification library
  // For now, using a simple alert
  alert(message);

  // Alternative: Create a custom toast notification
  /*
  const toast = document.createElement('div');
  toast.className = 'toast success';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
  */
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    createProjectModal.close();
    updateProjectModal.close();
  }
});

// Prevent form submission with Enter key in input (but allow in textarea)
document.querySelectorAll('input[name="projectName"]').forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      input.closest("form").querySelector("textarea").focus();
    }
  });
});

console.log("Modal manager initialized successfully");
