import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);

// Listen for delete
document.querySelector('#posts').addEventListener('click',deletePost);

// Listen for for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

// Listen for Cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

// Get Posts
function getPosts() {
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPosts(data))
  .catch(err => console.log(err));
}

// Submit Post
function submitPost() {
  const title = document.querySelector('#title').value;
  const status = document.querySelector('#status').value;
  const mode = document.querySelector('#mode').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    // title: title <--- samething
    title,
    status,
    mode,
    body
  }

  // Validate input
  if(title === '' || status === '' || mode === '' || body === '') {
    ui.showAlert('Please add fill in all fields', 'alert alert-danger');
  } else {
    // Check for id
    if(id === '') {
      // Create post
      http.post('http://localhost:3000/posts', data)
    .then(data => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err))
    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
    .then(data => {
      ui.showAlert('Post updated', 'alert alert-success');
      ui.changeFormState('add');
      getPosts();
    })
    .catch(err => console.log(err))
    }

  
    
  }


  
}

// Delete Post
function deletePost(e) {
  e.preventDefault();


  if(e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post Removed', 'alert alert-success');
        getPosts();
      })
      .catch(err => console.log(err))
    }
  }

}

// Enable Edit State
function enableEdit(e) {
  if(e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;

    const title = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

    const status = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

    const mode = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

    const body = e.target.parentElement.previousElementSibling.textContent;
    

    const data = {
      id,
      title,
      status,
      mode,
      body
    }

    // Fill the form with curren post
    ui.fillForm(data);

  }
  

  e.preventDefault();
}

function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}
 




