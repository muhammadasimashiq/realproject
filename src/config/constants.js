const constants = {
  title: "Super Admin Panel",
  log_in: "Log In",
  sign_up: "Sign Up",
  subjects: [
    { name: "Physics", id: "physics" },
    { name: "Chemistry", id: "chemistry" },
    { name: "Biology", id: "biology" },
    { name: "Mathematics", id: "mathematics" },
  ],
};

export const tinnyMceConst ={
  tinnyMceApiKey:'26azjdd4giibo4udrnfbfdxaw17rfz06aytkko3iqyi8zf0j',
  imgType:'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',
  filePikerType:'file image media',
  plugins:'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount ',
  toolBar: 'undo redo | formatselect | fullpage' +
  'bold italic backcolor | alignleft aligncenter | ' + '| fontfamily fontsize blocks |' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat | help | image ',
  contentDefaultStyle:'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
}
// ONLY USE THIS TO ADJUST NUMBER
export const LIMIT_IN_BYTES = 300000;

const BYTE_TO_KILO_BYTE = (byteLength) => byteLength / 1000;

export const SIZE_OF_TEXT_EDITOR_INCREASED_ERROR = `Content Size limit reached! Please add content under ${BYTE_TO_KILO_BYTE(
  LIMIT_IN_BYTES
)}KB. Hint: Reduce images/videos or compress them`;

export default constants;
