import React from 'react'
import axios from 'src/api/axios'

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path className="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
  </svg>
)

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path className="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
  </svg>
)

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo()
}
function redoChange() {
  this.quill.history.redo()
}

async function genarate_text() {
  try {
    const quill = this.quill
    const editorContent = quill.root.innerHTML
    const response = await axios.post(`/gpt`, {
      text: editorContent, // Mengambil teks dari state
    })

    quill.setContents(quill.clipboard.convert(response.data))
  } catch (error) {
    console.error('Error getting gpt data:', error)
  }
}

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      undo: undoChange,
      redo: redoChange,
      gpt_text: genarate_text,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
}

// Formats objects for setting up the Quill editor
export const formats = [
  'bold',
  'italic',
  'underline',
  'align',
  'list',
  'bullet',
  'indent',
  'code-block',
]

// Quill Toolbar component
export const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </span>

    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>

    <span className="ql-formats">
      <button className="ql-code-block" />
      <button className="ql-clean" />
    </span>
    <span className="ql-formats ">
      <button className="ql-undo">
        <CustomUndo />
      </button>
      <button className="ql-redo">
        <CustomRedo />
      </button>
    </span>

    <span className="ql-formats" style={{ float: 'right' }}>
      <button className="ql-gpt_text">Perbaiki Dengan AI</button>
    </span>
  </div>
)

export default QuillToolbar
