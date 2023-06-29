const NewBlog = ({
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    newTitle,
    newAuthor,
    newUrl,
    addBlog
}) => {
    return(
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
              type="text"
              value={newTitle}
              name="Title"
              onChange={handleTitleChange}
            />
        </div>
        <div>
          Author
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={newUrl}
            name="URL"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">add Blog</button>
      </form>
    </div>      
    )
}

export default NewBlog