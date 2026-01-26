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

  // Check URL parameters for success messages
  function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === '1') {
      toastr.success("Thank you! Your message has been sent successfully. We'll get back to you soon.", "Message Sent");
    } else if (urlParams.get('quote') === '1') {
      toastr.success("Thank you! Your quote request has been sent successfully. We'll get back to you soon.", "Quote Request Sent");
    }
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

      // Show success message immediately (form will submit normally)
      toastr.success("Sending your message... You will be redirected to a confirmation page.", "Message Sent");
      // Form will submit normally to FormSubmit
    });
  }

  // Handle Quote Form (modal forms across all pages)
  function setupQuoteForm() {
    // Handle all quote forms with class .appointment-form
    $(".appointment-form").on("submit", function (e) {
      const $form = $(this);

      // Get form values - try different possible field names
      const firstName = $form.find('input[name="first_name"], input[placeholder*="First"]').val().trim();
      const lastName = $form.find('input[name="last_name"], input[placeholder*="Last"]').val().trim();
      const email = $form.find('input[name="email"], input[type="email"]').val().trim();
      const phone = $form.find('input[name="phone"], input[placeholder*="Phone"]').val().trim();
      const service = $form.find('select[name="service"]').val();
      const message = $form.find('textarea[name="message"]').val().trim();

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

      // Show success message (form will submit normally)
      toastr.success("Sending your quote request... You will be redirected to a confirmation page.", "Request Sent");

      // Close modal immediately
      if ($form.closest('.modal').length > 0) {
        $form.closest('.modal').modal('hide');
      }

      // Form will submit normally to FormSubmit
    });
  }

  // Initialize on document ready
  $(document).ready(function () {
    setupContactForm();
    setupQuoteForm();
    checkUrlParameters();
  });
})(jQuery);
