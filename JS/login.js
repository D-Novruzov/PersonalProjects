"use strict";
import { storageManager } from "./helpers.js";
function login(event) {
  event.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users);
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please enter both username and password");
    return;
  }

  // Check if the user exists
  const userExists = users.some((user) => {
    return user.username === username && user.password === password;
  });

  if (userExists) {
    // Set the active user true/false based on matching credentials
    users = users.map((user) => {
      if (user.username === username && user.password === password) {
        user.userActive = true;
      } else {
        user.userActive = false;
      }
      return user;
    });

    // Save the updated users array
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to main page
    window.location.href = "./script.html";
  } else {
    alert("Please create an account first.");
    window.location.href = "./signup.html"; // Optional: redirect to signup
  }
}

// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");

  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  // Attach the submit event
  loginForm.addEventListener("submit", login);
});

export { login };
