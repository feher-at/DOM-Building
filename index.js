const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let albumDivEl;
let loadButtonEl;
let StrongEl;




function createPhotosList(photos) {

    const liEle = document.createElement('li');
    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        // creating paragraph
        const strongEl = document.createElement('strong');
        imgEl = document.createElement('img');
        imgEl.src = photo.thumbnailUrl;
        strongEl.textContent = photo.title;
        const pEl = document.createElement('p');
        const br = document.createElement('br');
        pEl.appendChild(strongEl);
        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);
        liEl.appendChild(br);
        liEl.appendChild(imgEl);
        liEle.appendChild(liEl);
    }

    return liEle;
}

function onPhotosReceived() {


    const text = this.responseText;
    const photos = JSON.parse(text);
    console.log(photos);
    const albumID = photos[0].albumId;
    const divEl = document.getElementById("photo" + albumID);
    console.log(divEl);
    divEl.appendChild(createPhotosList(photos));
}

function onLoadPhotos() {
    const el = this;
    const albumId = el.getAttribute('data-albums-userid');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPhotosReceived);
    xhr.open('GET', BASE_URL + '/photos?albumId=' + albumId);
    xhr.send();

}



function createAlbumsList(albums) {
    const ulEl = document.createElement('ul')

    for (let i = 0; i < albums.length; i++) {
        const album = albums[i];

        // creating paragraph
        const IdEL = document.createAttribute('data-albums-userid')
        IdEL.value = album.id;
        StrongEl = document.createElement('button');
        StrongEl.textContent = album.title;
        StrongEl.setAttributeNode(IdEL);
        const pEl = document.createElement('p');
        StrongEl.addEventListener('click', onLoadPhotos)
        pEl.appendChild(StrongEl);
       
        pEl.id = "photo" + album.id;
        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);
        ulEl.appendChild(liEl);


    }
    return ulEl;
}
function onAlbumsReceived() {
    albumDivEl.style.display = 'block';
    postsDivEl.style.display = 'none';
    const text = this.responseText;
    const albums = JSON.parse(text);
    const divEl = document.getElementById('albums-content');
   
    
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }

    divEl.appendChild(createAlbumsList(albums));
    
}
function onLoadAlbums() {
    const el = this;
    const userId = el.getAttribute('data-albumuser-id');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onAlbumsReceived);
    xhr.open('GET', BASE_URL + '/albums?userId=' + userId);
    xhr.send();


}

function createPostsList(posts) {
    const ulEl = document.createElement('ul')
    
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        // creating paragraph
        const IdEL = document.createAttribute('data-post-id')
        IdEL.value = post.id;
        StrongEl = document.createElement('button');
        StrongEl.textContent = post.title;
        StrongEl.setAttributeNode(IdEL);
        const pEl = document.createElement('p');
        StrongEl.addEventListener('click', onLoadComments)
        pEl.appendChild(StrongEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));
        pEl.id = "comment" + post.id;
        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);
        ulEl.appendChild(liEl);


    }
    return ulEl;
}

function onPostsReceived() {
    postsDivEl.style.display = 'block';
    albumDivEl.style.display = 'none';
    const text = this.responseText;
    const posts = JSON.parse(text);
    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }

    divEl.appendChild(createPostsList(posts));

}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();


}

function createCommentsList(comments) {

    const liEle = document.createElement('li');
    const hEl = document.createElement('h1');
   
    liEle.appendChild(hEl);
    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = comment.name;
        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${comment.body}`));
        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(pEl);
        liEle.appendChild(liEl);
    }

    return liEle;
}

function onLoadComments() {
    const el = this;
    const postId = el.getAttribute('data-post-id');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentsReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();

}

function onCommentsReceived() {
    

    const text = this.responseText;
    const comments = JSON.parse(text);
    console.log(comments);
    const postID = comments[0].postId;
    const divEl = document.getElementById("comment" + postID);
    divEl.appendChild(createCommentsList(comments));
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'id';
    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';
    const albumTdEl = document.createElement('td');
    albumTdEl.textContent = 'Album';
    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);
    trEl.appendChild(albumTdEl)
    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;
        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;
        const dataAlbumUserIdAttr = document.createAttribute('data-albumuser-id');
        dataAlbumUserIdAttr.value = user.id;
        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        const albumButtonEl = document.createElement('button');
        albumButtonEl.textContent = "Album";
        const albumTdEl = document.createElement('td');
        albumTdEl.setAttributeNode(dataAlbumUserIdAttr);
        albumTdEl.addEventListener('click', onLoadAlbums);
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);
        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);
        albumTdEl.appendChild(albumButtonEl);
        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);
        trEl.appendChild(albumTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();
    const text = this.responseText;
    const users = JSON.parse(text);
    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
    
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', () => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    albumDivEl = document.getElementById('albums');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
 
    
    
});


