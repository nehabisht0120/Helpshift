function refreshPage() {
    location.reload();
}


function update_box() {
    
    var birthday_json = document.getElementById("input_birthday").value;
    var year = document.getElementById("input_year").value;

    $('.child-box').remove();

    var new_list = [];
    var day_box_obj = { "Monday": [], "Tuesday": [], "Wednesday": [], "Thursday": [], "Friday": [], "Saturday": [] , "Sunday": [] };

    var birthday_json = JSON.parse(birthday_json);

    for (var i = 0; i < birthday_json.length; i++) {
        var nameArr = birthday_json[i].name.split(" ");
        var initials = nameArr[0].charAt(0).toUpperCase() + nameArr[1].charAt(0).toUpperCase();
        var day_of_year = getDay(birthday_json[i].birthday, year)
        var age = myAge(birthday_json[i].birthday)

        new_list.push({ "initials": initials, "day": day_of_year, "age": age });
    }

    for (var i = 0; i < new_list.length; i++) {

        day_box_obj[new_list[i].day].push({ "age": new_list[i].age, "id": new_list[i].initials });
        sortByKey(day_box_obj[new_list[i].day], "age");
    }

    console.log(day_box_obj["Monday"]);

    making_box(day_box_obj["Monday"], "Monday");
    making_box(day_box_obj["Tuesday"], "Tuesday");
    making_box(day_box_obj["Wednesday"], "Wednesday");
    making_box(day_box_obj["Thursday"], "Thursday");
    making_box(day_box_obj["Friday"], "Friday");
    making_box(day_box_obj["Saturday"], "Saturday");
    making_box(day_box_obj["Sunday"], "Sunday");

}

function making_box(array, id) {
    if (array.length > 0) {
		var dimension = CalcSize(array.length);
		var dimension = dimension/3 + "%";
        for (var i = 0; i < array.length; i++) {

            var div = document.createElement('div');
            div.className = 'child-box';
            div.innerHTML = array[i].id;
            document.getElementById(id).appendChild(div);
            div.style.width = dimension;
            div.style.height = dimension;
            div.style.textAlign = "center";
        }
    }
}

function CalcSize (num){
    var number = num;
    var width = 300;
    var height = 300;
    var area = height * width;
    var elementArea = parseInt(area / number);
    console.log(elementArea);
    var sideLength = parseInt(Math.sqrt(elementArea));
    console.log(sideLength);
    var numX = Math.ceil(width/sideLength);
    sideLength = width/numX;
    console.log(sideLength);
    return sideLength;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function myAge(date) {

    var dateArray = date.split('/');

    var birth_day = dateArray[1];
    var birth_month = dateArray[0];
    var birth_year = dateArray[2];

    var today_date = new Date();
    var today_year = today_date.getFullYear();
    var today_month = today_date.getMonth();
    var today_day = today_date.getDate();
    var age = today_year - birth_year;

    if (today_month < (birth_month - 1)) {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day)) {
        age--;
    }
    return age;
}

function getDay(bday, input_year) {

    var bdayArray = bday.split('/');
    bdayArray[2] = input_year;

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var currentTime = new Date(
        parseInt(bdayArray[1]),
        parseInt(bdayArray[0]) - 1, //month starts from 0
        parseInt(bdayArray[2])
    );

    var currentDay = currentTime.getDay();
    var currentDayName = days[currentDay];

    console.log(currentDayName);

    return currentDayName;
}
