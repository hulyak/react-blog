import React, {useState} from 'react';

const AddCommentForm = ({ articleName, setArticleInfo}) => {

  const [username, setUserName] = useState("");

  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comment`, {
      method: "POST",
      body: JSON.stringify({username :username, text : commentText}),  
      headers: {
        'Content-Type' : 'application/json',
      }
    });
      const body = await result.json();
      setArticleInfo(body);
      // reset the form inputs
      setUserName("");
      setCommentText("");
  }

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name: 
        <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} />
      </label>
    
    <label>
      Comment:
      <textarea rows="4" cols="50"  value={commentText} onChange={(e) => setCommentText(e.target.value)} />
    </label>
      
      <button onClick={() => addComment()}>Add Comment</button>
      </div>
  )
}

export default AddCommentForm;