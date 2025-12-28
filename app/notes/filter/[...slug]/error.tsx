"use client";

import css from "../../../../components/ErrorMessage/ErrorMessage.module.css";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2 className={css.text}>There was an error, please try again...</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default Error;
