document.getElementById("calculateBtn").addEventListener("click", function () {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month");
  const yearInput = document.getElementById("year");

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  // Reset pesan error, border, dan label
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  [dayInput, monthInput, yearInput].forEach((input) => {
    input.style.border = ""; // Reset border merah
    getLabel(input).style.color = ""; // Reset warna label
  });

  let isValid = true;

  // Validasi input day
  if (!dayInput.value) {
    showError(dayInput, "This field is required");
    isValid = false;
  } else if (day < 1 || day > 31) {
    showError(dayInput, "Must be a valid day");
    isValid = false;
  }

  // Validasi input month
  if (!monthInput.value) {
    showError(monthInput, "This field is required");
    isValid = false;
  } else if (month < 1 || month > 12) {
    showError(monthInput, "Must be a valid month");
    isValid = false;
  }

  // Validasi input year
  const currentYear = new Date().getFullYear();
  if (!yearInput.value) {
    showError(yearInput, "This field is required");
    isValid = false;
  } else if (year > currentYear) {
    showError(yearInput, "Must be in the past");
    isValid = false;
  }

  // Validasi tanggal sesuai bulan dan tahun
  if (isValid && !isValidDate(day, month, year)) {
    showError(dayInput, "Must be a valid date");
    isValid = false;
  }

  // Jika input tidak valid, hentikan eksekusi
  if (!isValid) return;

  // Hitung umur
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  document.getElementById("years").textContent = ageYears;
  document.getElementById("months").textContent = ageMonths;
  document.getElementById("days").textContent = ageDays;
});

// Fungsi untuk memeriksa apakah tanggal valid
function isValidDate(day, month, year) {
  if (month < 1 || month > 12) return false; // Bulan harus 1-12
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

// Fungsi untuk menampilkan pesan error, border merah, dan label merah
function showError(inputElement, message) {
  const errorMessage = document.createElement("div");
  errorMessage.textContent = message;
  errorMessage.classList.add("error-message");
  errorMessage.style.color = "red";
  errorMessage.style.fontSize = "12px";
  inputElement.insertAdjacentElement("afterend", errorMessage);

  // Tambahkan border merah pada input
  inputElement.style.border = "1px solid red";

  // Ubah warna label menjadi merah
  const label = getLabel(inputElement);
  if (label) label.style.color = "red";
}

// Fungsi untuk mendapatkan label terkait input
function getLabel(inputElement) {
  return document.querySelector(`label[for="${inputElement.id}"]`);
}