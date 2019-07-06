$(document).ready(() => {
    function readURL(files) {
      if (files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('#preview').attr('src', e.target.result);
          }

          reader.readAsDataURL(files[0]);
      }
  }
  $('#file-input').change(e => {
    const files = e.target.files;
    readURL(files);
  });
});
