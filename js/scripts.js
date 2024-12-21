// js/scripts.js

// تغيير لون الخلفية عند النقر على زر

// التحقق من صحة نموذج الاتصال
function registerUser(name, email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // التحقق مما إذا كان البريد الإلكتروني مسجلاً بالفعل
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    alert("البريد الإلكتروني مستخدم بالفعل. يرجى استخدام بريد إلكتروني آخر.");
    return false;
  }

  // إضافة المستخدم الجديد إلى قائمة المستخدمين
  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("تم تسجيل حسابك بنجاح!");
  return true;
}

// تسجيل الدخول
function loginUser(email, password) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // البحث عن المستخدم بالبيانات المدخلة
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    // تخزين حالة تسجيل الدخول
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert(`مرحبًا، ${user.name}! تم تسجيل دخولك بنجاح.`);
    window.location.href = "index.html"; // إعادة التوجيه إلى الصفحة الرئيسية
    return true;
  } else {
    alert("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
    return false;
  }
}

// تسجيل الخروج
function logoutUser() {
  localStorage.removeItem("currentUser");
  alert("تم تسجيل خروجك بنجاح.");
  window.location.href = "index.html";
}

// تحديث شريط التنقل بناءً على حالة تسجيل الدخول
function updateNavbar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navLinks = document.querySelector(".navbar-nav");

  if (currentUser) {
    navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="index.html">الرئيسية</a></li>
            <li class="nav-item"><a class="nav-link" href="about.html">عن الموقع</a></li>
            <li class="nav-item"><a class="nav-link" href="products.html">المنتجات</a></li>
            <li class="nav-item"><a class="nav-link" href="blog.html">مدونة</a></li>
            <li class="nav-item"><a class="nav-link" href="gallery.html">معرض الصور</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">تواصل معنا</a></li>
            <li class="nav-item"><a class="nav-link" href="#" onclick="logoutUser()">تسجيل الخروج</a></li>
              <li class="nav-item"><a class="nav-link" href="cart.html">السلة</a></li>
        `;
  } else {
    navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link" href="index.html">الرئيسية</a></li>
            <li class="nav-item"><a class="nav-link" href="about.html">عن الموقع</a></li>
            <li class="nav-item"><a class="nav-link" href="products.html">المنتجات</a></li>
            <li class="nav-item"><a class="nav-link" href="blog.html">مدونة</a></li>
            <li class="nav-item"><a class="nav-link" href="gallery.html">معرض الصور</a></li>
            <li class="nav-item"><a class="nav-link" href="contact.html">تواصل معنا</a></li>
 <li class="nav-item"><a class="nav-link" href="faq.html">الأسئلة الشائعة</a></li>
     <li class="nav-item"><a class="nav-link" href="login.html">تسجيل الدخول</a></li>
              <li class="nav-item"><a class="nav-link" href="cart.html">السلة</a></li>
        `;
  }
}
// وظيفة التبديل بين الوضع الداكن والفاتح
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  // تغيير أيقونة الزر بناءً على الوضع
  const themeToggleBtn = document.getElementById("themeToggle");
  if (isDarkMode) {
    themeToggleBtn.innerHTML = `<i class="bi bi-sun-fill"></i> Light`;
  } else {
    themeToggleBtn.innerHTML = `<i class="bi bi-moon-fill"></i> Dark`;
  }
  // حفظ الوضع في localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// تطبيق الوضع المحفوظ عند تحميل الصفحة
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    const themeToggleBtn = document.getElementById("themeToggle");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = `<i class="bi bi-sun-fill"></i> Light`;
    }
  } else {
    document.body.classList.remove("dark-mode");
    const themeToggleBtn = document.getElementById("themeToggle");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = `<i class="bi bi-moon-fill"></i> Dark`;
    }
  }
}

// التحقق من صحة نموذج الاتصال
function validateContactForm() {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("يرجى ملء جميع الحقول.");
    return false;
  }

  // التحقق من صحة البريد الإلكتروني
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("يرجى إدخال بريد إلكتروني صحيح.");
    return false;
  }

  alert("تم إرسال رسالتك بنجاح!");
  return true;
}

// التحقق من نموذج تسجيل الدخول
function validateLoginForm(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  if (email === "" || password === "") {
    alert("يرجى ملء جميع الحقول.");
    return false;
  }
  loginUser(email, password);
}

// التحقق من نموذج التسجيل
function validateRegisterForm(event) {
  event.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const confirmPassword = document
    .getElementById("registerConfirmPassword")
    .value.trim();

  if (
    name === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    alert("يرجى ملء جميع الحقول.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("كلمة المرور وتأكيدها غير متطابقتين.");
    return false;
  }

  // التحقق من صحة البريد الإلكتروني
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("يرجى إدخال بريد إلكتروني صحيح.");
    return false;
  }

  // تسجيل المستخدم
  const success = registerUser(name, email, password);
  if (success) {
    window.location.href = "login.html"; // إعادة التوجيه إلى صفحة تسجيل الدخول
  }
}

// إضافة مستمع للأحداث عند تحميل المحتوى
document.addEventListener("DOMContentLoaded", () => {
  // تحديث شريط التنقل بناءً على حالة تسجيل الدخول
  updateNavbar();

  // إضافة مستمع لنموذج الاتصال
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      if (!validateContactForm()) {
        event.preventDefault();
      }
    });
  }

  // إضافة مستمع لنموذج تسجيل الدخول
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", validateLoginForm);
  }

  // إضافة مستمع لنموذج التسجيل
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", validateRegisterForm);
  }

  // إضافة مستمع لتحديث إجمالي السلة وإزالة العناصر
  const cartForm = document.getElementById("cartForm");
  if (cartForm) {
  }
  const themeToggleBtn = document.getElementById("themeToggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme);
  }
});
// التحقق من نموذج الدفع
function validateCheckoutForm() {
  const name = document.getElementById("shippingName").value.trim();
  const address = document.getElementById("shippingAddress").value.trim();
  const phone = document.getElementById("shippingPhone").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;

  if (name === "" || address === "" || phone === "" || paymentMethod === "") {
    alert("يرجى ملء جميع الحقول.");
    return false;
  }

  // يمكن إضافة المزيد من التحقق هنا

  alert("تم إتمام عملية الشراء بنجاح!");
  return true;
}

// تحديث إجمالي السلة
function updateTotal() {
  let total = 0;
  const rows = document.querySelectorAll("tbody tr");
  rows.forEach((row) => {
    const price = parseFloat(row.cells[2].innerText.replace("ريال", ""));
    const quantity = parseInt(row.querySelector(".quantity").value);
    total += price * quantity;
    row.cells[4].innerText = `${price * quantity} ريال`;
  });
  document.getElementById("totalPrice").innerText = `${total} ريال`;
}

// إزالة عنصر من السلة
function removeItem(button) {
  const row = button.parentElement.parentElement;
  row.remove();
  updateTotal();
}

// إضافة مستمع للأحداث عند تحميل المحتوى
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      if (!validateContactForm()) {
        event.preventDefault();
      }
    });
  }

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      if (!validateLoginForm()) {
        event.preventDefault();
      }
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      if (!validateRegisterForm()) {
        event.preventDefault();
      }
    });
  }

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (event) {
      if (!validateCheckoutForm()) {
        event.preventDefault();
      }
    });
  }
});
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  // تغيير أيقونة الزر بناءً على الوضع
  const themeToggleBtn = document.getElementById("themeToggle");
  if (isDarkMode) {
    themeToggleBtn.innerHTML = `<i class="bi bi-sun-fill"></i> Light`;
  } else {
    themeToggleBtn.innerHTML = `<i class="bi bi-moon-fill"></i> Dark`;
  }
  // حفظ الوضع في localStorage
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// تطبيق الوضع المحفوظ عند تحميل الصفحة
function applySavedTheme() {
  const savedTheme = localStorage.getItem("theme");
  const themeToggleBtn = document.getElementById("themeToggle");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = `<i class="bi bi-sun-fill"></i> Light`;
    }
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = `<i class="bi bi-moon-fill"></i> Dark`;
    }
  }
}

// تغيير الثيم وحفظه
function toggleTheme() {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  const themeToggleBtn = document.getElementById("themeToggle");

  if (isDarkMode) {
    localStorage.setItem("theme", "dark");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = `<i class="bi bi-sun-fill"></i> Light`;
    }
  } else {
    localStorage.setItem("theme", "light");
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = `<i class="bi bi-moon-fill"></i> Dark`;
    }
  }
}

// استدعاء الدالة عند تحميل الصفحة
window.onload = applySavedTheme;
