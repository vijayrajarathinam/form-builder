// import { SubmissionError } from "redux-form";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { register } from "../../api/userApi";
// import { auth } from "../../firebase";

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// export default (values) => {
//   return sleep(1000).then(() => {
//     if (!values.email)
//       throw new SubmissionError({ email: "This Field cannot be empty", _error: "This Field cannot be empty" });
//     else {
//       // console.log(values);

//       // setStatus("loading");
//       const password = "Admin@12345";
//       const username = values.email;
//       createUserWithEmailAndPassword(auth, username, password).then(async ({ user }) => {
//         // register(values, user.uid)
//         //   .then(() => setStatus("success"))
//         //   .catch(() => setStatus("failure"));
//       });
//     }
//   });
// };
