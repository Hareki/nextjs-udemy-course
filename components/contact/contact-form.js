import { useEffect, useState } from 'react';
import Notification from '../ui/notification';
import css from './contact-form.module.css';

async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(contactDetails),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Something went wrong!');
  }
}

const ContactForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); //pending, success, error
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    let timer;
    if (requestStatus !== 'pending') {
      timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage
      });
      setRequestStatus('success');
      setEnteredEmail('');
      setEnteredMessage('');
      setEnteredName('');
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notificationData;

  if (requestStatus === 'pending') {
    notificationData = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    };
  }

  if (requestStatus === 'success') {
    notificationData = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully'
    };
  }

  if (requestStatus === 'error') {
    notificationData = {
      status: 'error',
      title: 'Failed!',
      message: requestError
    };
  }

  return (
    <section className={css.contact}>
      <h1>How can I help you?</h1>
      <form className={css.form} onSubmit={sendMessageHandler}>
        <div className={css.controls}>
          <div className={css.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={enteredEmail}
              onChange={(event) =>
                setEnteredEmail(event.target.value)
              }
            />
          </div>

          <div className={css.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              value={enteredName}
              required
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>

        <div className={css.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            id='message'
            rows='5'
            required
            value={enteredMessage}
            onChange={(event) =>
              setEnteredMessage(event.target.value)
            }
          />
        </div>

        <div className={css.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificationData && <Notification {...notificationData} />}
    </section>
  );
};

export default ContactForm;
