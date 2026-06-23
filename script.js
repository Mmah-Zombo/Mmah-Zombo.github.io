const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector(".site-nav");

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const certificateModal = document.querySelector("#certificate-modal");
const certificateButtons = document.querySelectorAll(".cert-view-btn");
const certificateTitle = document.querySelector("#certificate-modal-title");
const certificateDescription = document.querySelector("#certificate-modal-description");
const certificateImage = document.querySelector("#certificate-modal-image");
const certificatePdf = document.querySelector("#certificate-modal-pdf");
const certificateFrame = document.querySelector("#certificate-modal-frame");

if (
  certificateModal &&
  certificateButtons.length > 0 &&
  certificateTitle &&
  certificateDescription &&
  certificateImage &&
  certificatePdf &&
  certificateFrame
) {
  certificateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.dataset.certificateTitle || "Certificate preview";
      const description = button.dataset.certificateDescription || "";
      const source = button.dataset.certificateImage || "";
      const isPdf = source.toLowerCase().endsWith(".pdf");

      certificateTitle.textContent = title;
      certificateDescription.textContent = description;
      certificateFrame.classList.toggle("is-pdf", isPdf);

      if (isPdf) {
        certificateImage.removeAttribute("src");
        certificateImage.removeAttribute("alt");
        certificatePdf.src = source;
        certificatePdf.title = `${title} credential preview`;
      } else {
        certificatePdf.removeAttribute("src");
        certificatePdf.removeAttribute("title");
        certificateImage.src = source;
        certificateImage.alt = `${title} credential preview`;
      }

      if (typeof certificateModal.showModal === "function") {
        certificateModal.showModal();
      } else {
        certificateModal.setAttribute("open", "true");
      }
    });
  });

  certificateModal.addEventListener("click", (event) => {
    const shell = certificateModal.querySelector(".certificate-modal-shell");
    if (shell && !shell.contains(event.target)) {
      certificateModal.close();
    }
  });
}
