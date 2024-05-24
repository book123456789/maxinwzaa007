const postForm = document.getElementById('postForm');
const postsContainer = document.getElementById('posts');
let posts = [];

// Handle form submission
postForm.onsubmit = (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const newPost = { title, content, comments: [] };
    posts.push(newPost);

    renderPosts();
    postForm.reset();
};

// Render posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, postIndex) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const postTitle = document.createElement('h3');
        postTitle.innerText = post.title;

        const postContent = document.createElement('p');
        postContent.innerText = post.content;

        const deletePostButton = document.createElement('button');
        deletePostButton.classList.add('delete-button');
        deletePostButton.innerText = 'Delete Post';
        deletePostButton.onclick = () => {
            posts.splice(postIndex, 1);
            renderPosts();
        };

        postDiv.appendChild(postTitle);
        postDiv.appendChild(postContent);
        postDiv.appendChild(deletePostButton);

        // Render comments
        const commentsContainer = document.createElement('div');
        post.comments.forEach((comment, commentIndex) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerText = "Comment: " + comment; // กำกับว่าเป็นคอมเมนต์

            const deleteCommentButton = document.createElement('button');
            deleteCommentButton.classList.add('delete-button');
            deleteCommentButton.innerText = 'Delete Comment';
            deleteCommentButton.onclick = () => {
                posts[postIndex].comments.splice(commentIndex, 1);
                renderPosts();
            };

            commentDiv.appendChild(deleteCommentButton);
            commentsContainer.appendChild(commentDiv);
        });
        postDiv.appendChild(commentsContainer);

        // Comment form
        const commentForm = document.createElement('form');
        commentForm.classList.add('comment-form');
        commentForm.innerHTML = `
            <input type="text" placeholder="Write a comment" required>
            <button type="submit">Comment</button>
        `;

        commentForm.onsubmit = (e) => {
            e.preventDefault();
            const commentInput = commentForm.querySelector('input');
            const commentText = commentInput.value;
            posts[postIndex].comments.push(commentText);

            renderPosts();
        };

        postDiv.appendChild(commentForm);
        postsContainer.appendChild(postDiv);
    });
}
