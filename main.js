$(document).ready(function () {
   // Initialize slick slider
   $('.food-slider').slick({
      autoplay: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: ".prev-btn",
      nextArrow: ".next-btn",
      responsive: [
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 1,
            }
         }
      ]
   });

   // Toggle class for navigation
   $('.nav-trigger').click(function () {
      $('.site-content-wrapper').toggleClass('scaled');
   });

   // Initialize i18next
   i18next
      .use(i18nextHttpBackend)
      .use(i18nextBrowserLanguageDetector)
      .init({
         fallbackLng: 'mr', // Default language
         debug: true,
         backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json' // Path to your JSON files
         }
      }, function (err, t) {
         if (err) return console.error(err);
         updateContent(); // Function to update content after language change
      });

   // Function to update content
   function updateContent() {
      document.querySelectorAll('[data-i18n]').forEach(function (element) {
         const key = element.getAttribute('data-i18n');
         element.innerHTML = i18next.t(key); // Update innerHTML with translated text
      });
   }

   // Function to change language
   function changeLanguage(lng) {
      i18next.changeLanguage(lng, function (err, t) {
         if (err) return console.error(err);
         updateContent(); // Update content when language changes
      });
   }

   // Event listener for language dropdown
   $('#languageSelector').change(function () {
      const selectedLanguage = $(this).val();
      changeLanguage(selectedLanguage);
   });
});
