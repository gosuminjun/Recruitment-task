"use client";

import React, { useState } from "react";
import AddUserForm from "@/components/AddUserForm";
import { css } from "@emotion/react";
import { FormData } from "@/types/types";

const Home: React.FC = () => {
  const [forms, setForms] = useState<FormData>({});
  const [formOrder, setFormOrder] = useState<number>(1);
  const [confirmedForms, setConfirmedForms] = useState<
    { name: string; password: string }[]
  >([]);
  const [duplicateNames, setDuplicateNames] = useState<string[]>([]);

  const addUserForm = () => {
    const newKey = Date.now().toString();
    setForms((prevForms) => ({
      ...prevForms,
      [newKey]: { formOrder, name: "", password: "" },
    }));
    setFormOrder((prevOrder) => prevOrder + 1);
  };

  const deleteUserForm = (index: string) => {
    const { [index]: deletedForm, ...remainingForms } = forms;
    setForms(remainingForms);
    setDuplicateNames((prevNames) =>
      prevNames.filter((name) => name !== forms[index].name)
    );
  };

  const confirmForms = () => {
    const keys = Object.keys(forms);
    const confirmedData = keys.map((key) => forms[key]);
    setConfirmedForms(confirmedData);
  };

  const handleFormUpdate = (index: string, name: string, password: string) => {
    const isDuplicate = Object.values(forms).some(
      (form) => form.name === name && form.name !== forms[index].name
    );

    if (isDuplicate) {
      setDuplicateNames((prevNames) =>
        Array.from(new Set([...prevNames, name]))
      );
    } else {
      setDuplicateNames((prevNames) =>
        prevNames.filter((duplicateName) => duplicateName !== name)
      );
    }

    setForms((prevForms) => ({
      ...prevForms,
      [index]: { ...prevForms[index], name, password },
    }));
  };

  // Confirm Button의 유효성 검사
  // 이름이 중복이거나 3글자 미만인 경우, 비밀번호가 6자 미만인 경우 비활성화한다.
  const isConfirmButtonDisabled =
    duplicateNames.length > 0 ||
    Object.values(forms).some(
      (form) => form.name.length < 3 || form.password.length < 6
    );

  return (
    <div style={{ width: "400px" }}>
      {Object.keys(forms).map((key) => (
        <div key={key} css={borderCSS}>
          <AddUserForm
            index={key}
            formOrder={forms[key].formOrder}
            onFormUpdate={(name, password) =>
              handleFormUpdate(key, name, password)
            }
            onDeleteForm={deleteUserForm}
          />

          {/* <button onClick={() => deleteUserForm(key)}>폼 삭제</button> */}
          {duplicateNames.includes(forms[key].name) && (
            <div style={{ color: "red" }}>The name is duplicated</div>
          )}

          {forms[key].name.length < 3 && forms[key].name.length > 0 && (
            <div style={{ color: "red" }}>
              Name must be at least 3 charaters long.
            </div>
          )}

          {forms[key].password.length < 6 && forms[key].password.length > 0 && (
            <div style={{ color: "red" }}>
              Password must be at least 6 charaters long.
            </div>
          )}
        </div>
      ))}
      <div css={buttonCSS}>
        <button onClick={addUserForm}>Add User</button>
        <button onClick={confirmForms} disabled={isConfirmButtonDisabled}>
          Confirm
        </button>
      </div>

      {/* Confirm을 눌렀을 때 표시되는 유저 정보*/}
      {confirmedForms.map((data, index) => (
        <div key={index} css={confirmCSS}>
          <div>
            <span>Name:</span> {data.name}
          </div>
          <div>
            <span>Password:</span> {data.password}
          </div>
        </div>
      ))}
    </div>
  );
};

const borderCSS = css`
  width: auto;
  height: auto;

  border: 1px solid black;
  margin-bottom: 10px;
`;

const buttonCSS = css`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  button {
    width: 80px;
    padding: 10px;
    font-size: 0.8rem;
    border: 2px solid black;
  }
`;

const confirmCSS = css`
  background-color: #efeef1;
  padding: 20px;

  font-size: 0.8rem;

  div > span {
    font-weight: 800;
  }
`;

export default Home;
