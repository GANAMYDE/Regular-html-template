import React from 'react';
import styled from 'styled-components';

const NotificationCard = ({ name, fileName, time }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="container">
          <div className="left">
            <div className="status-ind" />
          </div>
          <div className="right">
            <div className="text-wrap">
              <p className="text-content">
                <a href="#" className="text-link">{name}</a> invited you to edit the
                <a href="#" className="text-link"> {fileName}</a> file.
              </p>
              <p className="time">{time}</p>
            </div>
            <div className="button-wrap">
              <button className="primary-cta">View file</button>
              <button className="secondary-cta">Mark as read</button>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Subtle Dark Mode Card CSS */
  .card {
    width: 100%;
    background-color: #2a2a2a;
    border-radius: 0.75em;
    cursor: pointer;
    transition: ease 0.2s;
    box-shadow:
      1em 1em 1em rgba(0, 0, 0, 0.2),
      -0.75em -0.75em 1em rgba(255, 255, 255, 0.05);
    border: 1.5px solid #3a3a3a;
  }

  .card:hover {
    background-color: #3a3a3a;
    border: 1.5px solid #5a5a5a;
  }

  .container {
    margin-top: 1.25em;
    margin-bottom: 1.375em;
    margin-left: 1.375em;
    margin-right: 2em;
    display: flex;
    flex-direction: row;
    gap: 0.75em;
  }

  .status-ind {
    width: 0.625em;
    height: 0.625em;
    background-color: #ff9933;
    margin: 0.375em 0;
    border-radius: 0.5em;
  }

  .text-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    color: #d1d1d1;
  }

  .time {
    font-size: 0.875em;
    color: #a0a0a0;
  }

  .text-link {
    font-weight: 500;
    text-decoration: none;
    color: #a0c0ff; /* Subtle blue for links */
  }

  .button-wrap {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
  }

  .secondary-cta {
    background-color: transparent;
    border: none;
    font-size: 15px;
    font-weight: 400;
    color: #b0b0b0;
    cursor: pointer;
    transition: all 0.2s;
  }

  .primary-cta {
    font-size: 15px;
    background-color: transparent;
    font-weight: 600;
    color: #5a8bff; /* Subtle blue for primary actions */
    border: none;
    border-radius: 1.5em;
    cursor: pointer;
    transition: all 0.2s;
  }

  button:hover {
    text-decoration: underline;
    color: #3a8bff; /* Blue color when hovered */
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 0.875em;
  }
`;

export default NotificationCard;
