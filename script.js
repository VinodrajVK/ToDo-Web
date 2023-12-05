function save() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("desc").value;
    let title_str = title.toString();
    let description_str = description.toString();
    if (title_str == "" || description_str == "") {
        alert("Please fill in all fields!");
    } else { 
       update_list(title_str, description_str);
    }
}

function update_list(title, description) {
    if (localStorage.length == 0) {
        let jsonItem = [];
        jsonItem.push([title, description]);
        localStorage.setItem('jsonItem', JSON.stringify(jsonItem));
        jsonItem = JSON.parse(localStorage.getItem('jsonItem'));
        update_list_view(jsonItem);
    }
    else {
        let jsonItem = JSON.parse(localStorage.getItem('jsonItem'));
        jsonItem.push([title, description]);
        localStorage.setItem('jsonItem', JSON.stringify(jsonItem));
        jsonItem = JSON.parse(localStorage.getItem('jsonItem'));
        update_list_view(jsonItem);
    }
    
}

function update_list_view(jsonItem) {
    let str = '';
    jsonItem.forEach((element, index) => {
        str += `<tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button type="submit" class="btn btn-small btn-primary" onclick="delete_item(${index})">Delete</button></td>
            </tr>`
        
    });
    document.getElementById("task-list").innerHTML = str;
}

function delete_item(index) {
    let jsonItem = JSON.parse(localStorage.getItem('jsonItem'));
    jsonItem.pop(index);
    localStorage.setItem('jsonItem', JSON.stringify(jsonItem));
    jsonItem = JSON.parse(localStorage.getItem('jsonItem'));
    update_list_view(jsonItem);
}

function clear_list() {
    if (confirm("Are you sure you want to clear the list?")) {
        localStorage.clear();
        update_list_view([]);
    }
}