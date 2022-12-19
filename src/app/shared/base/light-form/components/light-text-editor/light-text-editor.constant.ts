export const FORMATS = [
  // 'background',
  'bold',
  'color',
  // 'font',
  // 'code',
  'italic',
  'link',
  // 'size',
  // 'strike',
  // 'script',
  'underline',
  'blockquote',
  'header',
  // 'indent',
  'list',
  'align',
  // 'direction',
  // 'code-block',
  // 'formula',
  // 'image',
  // 'video'
];

export const EDITOR_CONFIG = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['link', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ 'align': [] }],
    [{ 'color': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ]
  // [
  //   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //   ['blockquote', 'code-block'],

  //   [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //   [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //   [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  //   [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  //   [{ 'direction': 'rtl' }],                         // text direction

  //   [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //   [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //   [{ 'font': [] }],
  //   [{ 'align': [] }],

  //   ['clean'],                                         // remove formatting button

  //   ['link', 'image', 'video']                         // link and image, video
  // ]
}