// tiny interactions: mobile nav toggle and year
document.addEventListener("DOMContentLoaded", function(){
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.getAttribute("aria-hidden") === "false";
    nav.setAttribute("aria-hidden", String(!isOpen));
    nav.style.display = isOpen ? "none" : "flex";
  });

  // footer year
  document.getElementById("year").textContent = new Date().getFullYear();
});
