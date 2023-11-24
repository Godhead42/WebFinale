const commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const commentText = document.getElementById('comment').value;
    
    const newComment = document.createElement('div');
    newComment.innerHTML = `<strong>${name}:</strong> ${commentText}`;
    
    const commentsContainer = document.getElementById('comments-container');
    commentsContainer.appendChild(newComment);
    
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
});
