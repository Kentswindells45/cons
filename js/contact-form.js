(function ($) {
  "use strict";

  // Configure toastr options
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  // Validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Handle Contact Form (contact.html page)
  function setupContactForm() {
    if ($("#contactForm").length === 0) return;

    $("#contactForm").on("submit", function (e) {
      // Get form values
      const name = $("#name").val().trim();
      const email = $("#email").val().trim();
      const subject = $("#subject").val().trim();
      const message = $("#message").val().trim();

      // Validate all fields are filled
      if (!name || !email || !subject || !message) {
        e.preventDefault();
        toastr.error("Please fill in all required fields", "Validation Error");
        return false;
      }

      // Validate email format
      if (!validateEmail(email)) {
        e.preventDefault();
        toastr.error("Please enter a valid email address", "Invalid Email");
        return false;
      }

      // Show success message
      toastr.success(
        "Message sent successfully! We will get back to you soon.",
        "Success",
      );
      // Form will submit naturally to FormSubmit
    });
  }

  // Handle Quote Form (modal in index.html)
  function setupQuoteForm() {
    if ($("#quoteForm").length === 0) return;

    $("#quoteForm").on("submit", function (e) {
      // Get form values
      const firstName = $("#quote_first_name").val().trim();
      const lastName = $("#quote_last_name").val().trim();
      const email = $("#quote_email").val().trim();
      const phone = $("#quote_phone").val().trim();
      const service = $("#quote_service").val().trim();
      const message = $("#quote_message").val().trim();

      // Validate all fields are filled
      if (!firstName || !lastName || !email || !phone || !service || !message) {
        e.preventDefault();
        toastr.error("Please fill in all required fields", "Validation Error");
        return false;
      }

      // Validate email format
      if (!validateEmail(email)) {
        e.preventDefault();
        toastr.error("Please enter a valid email address", "Invalid Email");
        return false;
      }

      // Show success message
      toastr.success(
        "Quote request sent successfully! We will contact you soon.",
        "Success",
      );
      // Form will submit naturally to FormSubmit
    });
  }

  // Initialize on document ready
  $(document).ready(function () {

  });
})(jQuery);
