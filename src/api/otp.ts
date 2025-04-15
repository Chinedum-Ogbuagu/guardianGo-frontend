import axios from "axios";

export const sendOtp = async (data: {
  phone_number: string;
  purpose: string;
}) => {
  return axios.post("/otp/send", data);
};

export const verifyOtp = async (phone: string, code: string) => {
  const res = await axios.post("/otp/verify", {
    phone_number: phone,
    code,
  });
  return res.data?.success === true;
};
