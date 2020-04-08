class UI{
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.statusInput = document.querySelector('#status');
        this.modeInput = document.querySelector('#mode');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmitInput = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    // Show all posts
    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.title}</h4>
                    <h5 class="card-text">${post.status}</h5>
                    <p class="card-text">${post.mode}</p>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a><a href="#" class="delete card-link" data-id="${post.id}">
                    <i class="fa fa-remove"></i>
                </a>
                </div>
            </div>
            `;
        });

        this.post.innerHTML = output;
    }

    // Show alert message
    showAlert(message, className) {
        this.clearAlert();

        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.postsContainer');
        // Get post
        const posts = document.querySelector('#posts');
        // Insert alert div
        container.insertBefore(div, posts);

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    // Clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if(currentAlert) {
            currentAlert.remove();
        }
    }
    // Clear all field
    clearFields() {
        this.titleInput.value = '';
        this.statusInput.value = '';
        this.modeInput.value = '';
        this.bodyInput.value = '';
    }

    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.statusInput.value = data.status;
        this.modeInput.value = data.mode;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }


    // Clear ID hidden input
    clearIdInput() {
        this.idInput.value = '';
    }


    //Change form state
    changeFormState(type) {
        if(type === 'edit') {
            this.postSubmitInput.textContent = 'Update Post';
            this.postSubmitInput.className = 'post-submit btn btn-warning btn-block';

            // Create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            // Get parent
            const cardForm = document.querySelector('.card-form');
            // Get the elements to insert before
            const formEnd = document.querySelector('.form-end');
            // Insert before Cancel Button
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmitInput.textContent = 'Post it';
            this.postSubmitInput.className = 'post-submit btn btn-primary btn-block';
            // Remove cancel button if it's there
            if(document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }

            // Clear ID form hidden field
            this.clearIdInput();
            // Clear Text
            this.clearFields();
        }
    }
}

export const ui = new UI();