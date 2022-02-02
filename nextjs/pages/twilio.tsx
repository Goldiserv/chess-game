// import Link from "next/link";
import Layout from "../components/Layout";
import React, { useState, BaseSyntheticEvent } from "react";
import sendMessage from "./api/sendMessage";

const TwilioPage = () => {
  var title = "Twilio";

  const [phone, setPhone] = useState("+6512341234");
  const [message, setMessage] = useState("test");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendMessage = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    const res = await fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone, message: message }),
    });
    const apiResponse = await res.json();
    console.log({ apiResponse });

    if (apiResponse.success) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const handleClick = async (e) => {
    sendMessage(e);
  };

  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <p>Twilio should not be normally called client-side (key exposure). Below for testing only.</p>
      <div className="block">
        <div>
          Send to phone number:
          <input
            type="text"
            value={phone}
            onChange={(v) => setPhone(v.target.value)}
            className="border-2 m-2 w-32"
            id="ph-input"
            name="ph-input"
          />
        </div>
        <div>
          Message:
          <input
            type="text"
            value={message}
            onChange={(v) => setMessage(v.target.value)}
            className="border-2 m-2 w-32"
            id="msg-input"
            name="msg-input"
          />
        </div>
        <div>
          <button
            onClick={handleClick}
            className="text-white bg-blue-600 hover:bg-blue-700 p-2 m-2 rounded"
          >
            Send sms
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default TwilioPage;
