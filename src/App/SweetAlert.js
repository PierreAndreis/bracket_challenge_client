import swal from 'sweetalert2'

import API from "../api";

const gatherDetails = async () => {
  swal.setDefaults({
    input: 'text',
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    allowOutsideClick: false,
    showLoaderOnConfirm: true,
    progressSteps: ['1', '2']
  })

  const steps = [
    {
      title: 'IGN',
      text: 'Please provide your in-game name',
      preConfirm(ign) {
        return new Promise(async (resolve) => {
          try {
            if (!ign) swal.showValidationError('Please provide an IGN');
            const res = await API.checkIgn(ign);
            if (res === 1) swal.showValidationError('This IGN is already taken.');
            if (res === -1) swal.showValidationError('Internal Server Error. Try again later. 009');
            resolve();
          } catch(e) {
            swal.showValidationError('Internal server error 006');
          }
        });
      }
    },
    {
      title: 'E-mail',
      text: 'Please provide your account e-mail. This email will be used to award the prize',
      input: 'email',
      preConfirm(email) {
        return new Promise(async (resolve) => {
          try {
            if (!email) swal.showValidationError('Please provide an e-mail');
            const res = await API.checkEmail(email);
            if (res === 1) swal.showValidationError('This e-mail is already taken.');
            if (res === -1) swal.showValidationError('Internal Server Error. Try again later. 008');
            resolve();
          } catch(e) {
            swal.showValidationError('Internal server error 007');
          }
        });
      }
    },
  ]
  try {
    const result = await swal.queue(steps);
    const ign   = result.value[0];
    const email = result.value[1];

    return {ign, email};
  }catch(e) {
    swal.resetDefaults();
    // swal({
    //   type: "error",
    //   title: "Internal server error!",
    //   text: "Code 001. Something happened, please try again."
    // })
  }

}

export default gatherDetails;

