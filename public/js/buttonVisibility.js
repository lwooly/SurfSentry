export const buttonVisibility = (button) => {
    if (Notification.permission !== "default") {
      button.style.display = "none";
    } else {
      button.style.display = "block";
    }
  };