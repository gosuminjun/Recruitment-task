import React, { useState, ChangeEvent } from "react";
import { css } from "@emotion/react";
import { AddUserFormProps } from "@/types/types";

const AddUserForm: React.FC<AddUserFormProps> = ({
  index,
  formOrder,
  onFormUpdate,
  onDeleteForm,
}) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    onFormUpdate(e.target.value, password);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    onFormUpdate(name, e.target.value);
  };

  return (
    <div css={UserFormBorderCSS}>
      <div css={titleCSS}>
        <div>User-{formOrder}</div>

        <div>
          <svg
            onClick={() => onDeleteForm(index)}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div css={contentCSS}>
        <div>Name</div>
        <input
          style={{ width: "100%" }}
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <div>Password</div>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
    </div>
  );
};

const UserFormBorderCSS = css`
  padding: 15px;
`;

const titleCSS = css`
  display: flex;

  div:nth-child(1) {
    font-size: 1.4rem;
    font-weight: 700;

    margin-bottom: 10px;
  }

  div:nth-child(2) {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
`;

const contentCSS = css`
  div {
    font-size: 0.9rem;
    font-wieght: 600;
  }
  input {
    width: 100%;
  }
`;

export default AddUserForm;
