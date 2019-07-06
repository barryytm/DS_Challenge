$(document).ready(() => {
    $.ajax({
        url: "https://blooming-escarpment-38201.herokuapp.com/schoolList"
    }).done(data => {
        rows = JSON.parse(data);
        console.log(rows);
        for (let i = 0; i < rows.length; i++) {
            var school = document.createElement('li');
            var schoolLink = document.createElement('a');
            schoolLink.href = "./school" + "?name=" + rows[i].name;
            schoolLink.innerHTML = rows[i].name;
            school.append(schoolLink)
            $('#schoolList').append(school);
        }
    });
});
