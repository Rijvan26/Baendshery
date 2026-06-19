import "../message.scss"


const MessagePage = () => {
  return (
    <div className="message-page">
      <div className="message-page__container">
        <div className="message-page__circle">
          <div className="message-page__circle-inner"></div>
        </div>

        <h1 className="message-page__title">
          Messages
        </h1>

        <p className="message-page__description">
          Private messaging is currently under development.
          Soon you'll be able to send messages, share photos,
          and chat with other users in real time.
        </p>

        <div className="message-page__card">
          <h2>Development Status</h2>

          <div className="progress-item">
            <div className="progress-info">
              <span>UI Design</span>
              <span>100%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill progress-fill--full"></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-info">
              <span>Backend Setup</span>
              <span>60%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill progress-fill--medium"></div>
            </div>
          </div>

          <div className="progress-item">
            <div className="progress-info">
              <span>Real-time Messaging</span>
              <span>20%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill progress-fill--small"></div>
            </div>
          </div>
        </div>

        <p className="message-page__footer">
          Available in a future update.
        </p>
      </div>
    </div>
  );
};

export default MessagePage;