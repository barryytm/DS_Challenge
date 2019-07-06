$(document).ready(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let name = urlParams.get('name');
    $('.form-group').hide();
    $('#oName').hide();
    $.ajax({
        url: "https://blooming-escarpment-38201.herokuapp.com/schoolList"
    }).done(data => {
        rows = JSON.parse(data);
        let school = rows.find(row => {
            return row.name == name;
        });
        if (school.image != "undefined") {
            $('#image').attr('src', `https://dreamschoolsstorage.s3.us-east-2.amazonaws.com/${school.image}`);
        }
        $('#name').text(name);
        $('#about').text(school.about);
        $('#school').text(school.school);
        $('#location').text(school.location);
        $('#edit').click(() => {
            $('.form-group').show();
        });
        $('#info').submit(event => {
            $('#oName').val(name);
        });
    });
});
